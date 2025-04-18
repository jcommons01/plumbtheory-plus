import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { adminDB } from '@/lib/firebase-admin'; // ✅ Make sure this file exists

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
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    console.log('📥 Incoming Stripe Webhook');
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;

      if (userId) {
        console.log('✅ Checkout completed for user:', userId);
        try {
          await adminDB.collection('users').doc(userId).set(
            {
              isPro: true,
              subscribedAt: new Date().toISOString(),
            },
            { merge: true }
          );
          console.log('🔥 Firestore updated: isPro = true');
        } catch (firestoreError) {
          console.error('❌ Failed to update Firestore:', firestoreError);
        }
      } else {
        console.warn('⚠️ Missing userId in session');
      }
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
