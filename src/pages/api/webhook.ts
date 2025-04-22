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
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
    ),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature']!;
  const buf = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Stripe webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription;

    if (!userId || !subscriptionId) {
      console.error('❌ Missing userId or subscriptionId');
      return res.status(400).json({ error: 'Missing data in session' });
    }

    await db.collection('users').doc(userId).set({
      isPro: true,
      stripeSubscriptionId: subscriptionId,
      subscribedAt: new Date().toISOString(),
    }, { merge: true });

    console.log(`✅ Pro access granted to ${userId}`);
  }

  return res.status(200).json({ received: true });
}
