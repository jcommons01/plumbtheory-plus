// webhook.ts - debug trigger redeploy

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

let serviceAccount: any;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
} catch (error) {
  console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.error('❌ Firebase Admin init error:', err);
  }
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature']!;
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log('✅ Webhook signature verified:', event.type);
  } catch (err: any) {
    console.error('❌ Stripe signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription;

    console.log('📦 Checkout completed for userId:', userId);
    console.log('📄 Subscription ID:', subscriptionId);

    if (!userId || !subscriptionId) {
      console.error('❌ Missing userId or subscriptionId in session.');
      return res.status(400).json({ error: 'Missing data in webhook session.' });
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

      console.log(`✅ Updated Firestore for user ${userId}`);
    } catch (err) {
      console.error('❌ Failed to update Firestore:', err);
      return res.status(500).send('Firestore update error');
    }
  }

  return res.status(200).json({ received: true });
}
