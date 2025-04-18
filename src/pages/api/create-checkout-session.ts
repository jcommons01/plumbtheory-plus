import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Create Stripe instance using secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil', // Use your locked version; change only if needed
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.warn('❌ Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, userEmail } = req.body;

    console.log('📨 Received checkout session request:');
    console.log('   👤 userId:', userId);
    console.log('   📧 userEmail:', userEmail);
    console.log('   💸 STRIPE_PRICE_ID:', process.env.STRIPE_PRICE_ID);
    console.log('   🌍 NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);

    // Validate required fields
    if (!userId || !userEmail) {
      console.warn('⚠️ Missing userId or userEmail in request body.');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 3,
        metadata: {
          userId: userId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
      client_reference_id: userId,
      customer_email: userEmail,
    });

    console.log('✅ Stripe checkout session created successfully:', session.id);

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe session error:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
}
