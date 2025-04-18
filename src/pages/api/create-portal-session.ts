// ✅ src/pages/api/create-portal-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: process.env.STRIPE_CUSTOMER_ID!,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    });
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
}
