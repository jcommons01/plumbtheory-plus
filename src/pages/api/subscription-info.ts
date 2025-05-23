import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15' as any,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { subscriptionId } = req.body;

  try {
    const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);

    const nextBillingDate = subscription.current_period_end
      ? subscription.current_period_end * 1000
      : null;

    res.status(200).json({ nextBillingDate });
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: 'Failed to retrieve billing info.' });
  }
}
