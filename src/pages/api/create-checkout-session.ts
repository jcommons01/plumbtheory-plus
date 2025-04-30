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
    const { userId, userEmail, referral } = req.body;

    if (!userId || !userEmail) {
      console.warn('❌ Missing userId or userEmail in request body');
      return res.status(400).json({ error: 'Missing user info' });
    }

    console.log('✅ Creating checkout session for:', { userId, userEmail, referral });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: userEmail,
      client_reference_id: referral || userId, // ✅ Give Rewardful first priority
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        ...(referral && { referral }),
      },
      subscription_data: {
        metadata: {
          userId,
          ...(referral && { referral }),
        },
      },
      expand: ['subscription'],
    });

    console.log('✅ Stripe session created:', session.id);
    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
