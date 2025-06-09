// src/pages/api/webhook.ts
import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const log = (...args: any[]) => console.log('📡 Webhook:', ...args);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (!userId || !subscriptionId) {
        console.error('❌ Missing userId or subscriptionId in session.');
        return res.status(400).json({ error: 'Missing userId or subscriptionId' });
      }

      try {
        await db.collection('users').doc(userId).set(
          {
            isPro: true,
            stripeSubscriptionId: subscriptionId,
            subscribedAt: new Date().toISOString(),
            cancelAtPeriodEnd: false,
            subscriptionEndDate: null,
          },
          { merge: true }
        );
        log(`✅ Pro access granted to user ${userId}`);
      } catch (err) {
        console.error('❌ Firestore update failed:', err);
        return res.status(500).send('Firestore error');
      }
      break;
    }

        case 'customer.subscription.updated': {
      const subscription = event.data.object as unknown as Stripe.Subscription & { current_period_end: number };
      const cancelAtPeriodEnd = subscription.cancel_at_period_end;
      const currentPeriodEnd = subscription.current_period_end * 1000;

      try {
        const users = await db
          .collection('users')
          .where('stripeSubscriptionId', '==', subscription.id)
          .get();

        if (users.empty) {
          console.warn('⚠️ No user found for updated subscription.');
          break;
        }

        const userRef = users.docs[0].ref;

        await userRef.update({
          cancelAtPeriodEnd,
          subscriptionEndDate: cancelAtPeriodEnd ? currentPeriodEnd : null,
        });

        console.log(`🔁 Updated cancellation status for ${userRef.id}`);
      } catch (err) {
        console.error('❌ Failed to update cancel info:', err);
      }

      break;
    }



    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      if (subscription.cancel_at_period_end) {
        // Let access end naturally (don't remove Pro yet)
        log(`🕓 Subscription ended naturally, handled by end date`);
        break;
      }

      // Immediate cancel — revoke Pro access
      try {
        const users = await db
          .collection('users')
          .where('stripeSubscriptionId', '==', subscription.id)
          .get();

        if (users.empty) {
          console.warn('⚠️ No user found for deleted subscription.');
          break;
        }

        const userRef = users.docs[0].ref;

        await userRef.update({
          isPro: false,
          stripeSubscriptionId: null,
          cancelAtPeriodEnd: false,
          subscriptionEndDate: null,
        });

        log(`❌ Pro access revoked for ${userRef.id}`);
      } catch (err) {
        console.error('❌ Failed to revoke access on cancel:', err);
      }

      break;
    }

    default:
      log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
