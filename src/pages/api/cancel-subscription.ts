import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// ✅ Use supported API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscriptionId' });
  }

  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('❌ Error cancelling subscription:', error.message);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}
