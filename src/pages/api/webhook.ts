// src/pages/api/webhook.ts
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { adminDB } from '@/lib/firebase-admin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription as string;

  if (userId && subscriptionId) {
    await adminDB.collection('users').doc(userId).set({
      isPro: true,
      subscribedAt: new Date().toISOString(),
      stripeSubscriptionId: subscriptionId,
    }, { merge: true });
  }
  break;
}

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const subscriptionId = subscription.id;

      const userQuery = await adminDB
        .collection('users')
        .where('stripeSubscriptionId', '==', subscriptionId)
        .get();

      if (!userQuery.empty) {
        const userDoc = userQuery.docs[0];
        await userDoc.ref.update({ isPro: false });
        console.log('🚫 Subscription cancelled. isPro set to false.');
      }
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
