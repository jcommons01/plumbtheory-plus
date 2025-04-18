import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// ✅ Fix: Removed apiVersion to avoid type conflict
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, userEmail } = req.body;

    console.log('📨 Checkout request from:', { userId, userEmail });
    console.log('🔑 STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY?.length);
    console.log('💸 STRIPE_PRICE_ID:', process.env.STRIPE_PRICE_ID);
    console.log('🌍 NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);

    if (!userId || !userEmail) {
      console.warn('⚠️ Missing userId or userEmail in body');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

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
