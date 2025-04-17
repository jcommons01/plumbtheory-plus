// src/pages/api/create-customer-portal-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // no apiVersion

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { stripeCustomerId } = req.body;

    if (!stripeCustomerId) {
      return res.status(400).json({ error: 'Missing Stripe customer ID' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('❌ Error creating billing portal session:', err);
    res.status(500).json({ error: 'Failed to create billing portal session' });
  }
}
