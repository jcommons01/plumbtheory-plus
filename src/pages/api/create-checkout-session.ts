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

    console.log('📨 Checkout request from:', { userId, userEmail });

    // Ensure the required environment variables are set
    if (!process.env.STRIPE_PRICE_ID) {
      console.error('⚠️ STRIPE_PRICE_ID is missing!');
      return res.status(500).json({ error: 'Missing Stripe Price ID in environment variables' });
    }

    // Create the Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 3, // Keep the 3-day trial, or modify/remove it as needed
        metadata: {
          userId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
      customer_email: userEmail,
      client_reference_id: userId,
    });

    console.log('✅ Stripe session created:', session.id);
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe session error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
