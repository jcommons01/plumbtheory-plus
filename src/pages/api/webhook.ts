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
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}


const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription as string;

    console.log('🔄 Checkout session received');
    console.log('🧠 Metadata userId:', userId);
    console.log('💳 Subscription ID:', subscriptionId);

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
        },
        { merge: true }
      );
      console.log(`✅ Firestore updated for user ${userId}`);
    } catch (err) {
      console.error('❌ Firestore update failed:', err);
      return res.status(500).send('Firestore error');
    }
  }

  res.status(200).json({ received: true });
}
