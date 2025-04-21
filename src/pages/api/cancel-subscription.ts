import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import { adminDB } from '@/lib/firebase-admin'; // ✅ Match the actual export

// ✅ Match your Stripe TypeScript version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userRef = adminDB.collection('users').doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userSnap.data();
    const subscriptionId = userData?.stripeSubscriptionId;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'No subscription ID found' });
    }

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('❌ Cancel subscription error:', error.message);
    return res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}
