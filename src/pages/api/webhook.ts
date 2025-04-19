// ✅ src/pages/api/webhook.ts
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.metadata?.userId;
    const subscriptionId = session.subscription?.toString();

    if (uid && subscriptionId) {
      try {
        await setDoc(
          doc(db, 'users', uid),
          {
            isPro: true,
            stripeSubscriptionId: subscriptionId,
            subscribedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        console.log(`✅ Pro access granted to user ${uid}`);
      } catch (err) {
        console.error('❌ Firestore update error:', err);
      }
    } else {
      console.warn('⚠️ Missing uid or subscriptionId in metadata');
    }
  }

  res.status(200).json({ received: true });
}
