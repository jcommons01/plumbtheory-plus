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

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
    console.error('❌ Error verifying webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle subscription success
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription;

    console.log('📦 Stripe event received: checkout.session.completed');
    console.log('👤 userId from metadata:', userId);
    console.log('📄 subscriptionId:', subscriptionId);

    if (userId && subscriptionId) {
      try {
        await db.collection('users').doc(userId).set({
          isPro: true,
          stripeSubscriptionId: subscriptionId,
          subscribedAt: new Date().toISOString(),
        }, { merge: true });

        console.log(`✅ Updated user ${userId} with Pro access.`);
      } catch (err) {
        console.error('❌ Failed to update Firestore:', err);
        return res.status(500).end('Firestore error');
      }
    }
  }

  res.status(200).json({ received: true });
}
