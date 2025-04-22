// src/pages/api/webhook.ts
import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil' as any, // Cast to any to avoid TS error
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.warn('❌ Method not allowed:', req.method);
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    return res.status(400).send('Missing Stripe signature');
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log('✅ Webhook verified:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription;

    if (!userId || !subscriptionId) {
      console.error('❌ Missing userId or subscriptionId in session metadata');
      return res.status(400).json({ error: 'Missing user metadata' });
    }

    try {
      await db.collection('users').doc(userId).set({
        isPro: true,
        stripeSubscriptionId: subscriptionId,
        subscribedAt: new Date().toISOString(),
      }, { merge: true });

      console.log(`✅ Firestore updated for user ${userId}`);
    } catch (err) {
      console.error('❌ Firestore update failed:', err);
      return res.status(500).send('Error writing to Firestore');
    }
  }

  return res.status(200).json({ received: true });
}
