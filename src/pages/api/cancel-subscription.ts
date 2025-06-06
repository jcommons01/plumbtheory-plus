// src/pages/api/cancel-subscription.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin if needed
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { uid } = req.body;

  if (!uid) return res.status(400).json({ error: 'Missing UID' });

  try {
    const userRef = db.collection('users').doc(uid);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    const subscriptionId = userData?.stripeSubscriptionId;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'No subscription ID found' });
    }

    // ✅ Cancel the Stripe subscription
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    await userRef.update({
      isPro: false,
      stripeSubscriptionId: null,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('❌ Cancel error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
