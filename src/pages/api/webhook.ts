import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import admin from 'firebase-admin';

// ✅ Use correct Stripe API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// ✅ Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminDB = admin.firestore();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('❌ Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // ✅ Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription as string;

    if (userId && subscriptionId) {
      try {
        await adminDB.collection('users').doc(userId).set(
          {
            isPro: true,
            stripeSubscriptionId: subscriptionId,
            subscribedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        
        console.log(`✅ Updated user ${userId} with Pro access.`);
      } catch (error) {
        console.error('❌ Failed to update Firestore:', error);
        return res.status(500).json({ error: 'Firestore update failed' });
      }
    }
  }

  res.status(200).json({ received: true });
}
