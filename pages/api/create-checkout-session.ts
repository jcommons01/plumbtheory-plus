// src/pages/api/create-checkout-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, userEmail } = req.body;

    if (!userId || !userEmail) {
      return res.status(400).json({ error: 'Missing user info' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: userEmail,
      client_reference_id: userId, // Optional but useful
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        userId, // ✅ This is what your webhook reads
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
