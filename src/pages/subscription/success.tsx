// src/pages/subscription/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import { updateUserIsPro } from '@/lib/firebase';
import Head from 'next/head';

export default function SuccessPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const activatePro = async () => {
      if (user) {
        try {
          await updateUserIsPro(user.uid, true);
        } catch (err) {
          console.error('Failed to update Pro status:', err);
        }
      }

      setTimeout(() => {
        router.push('/topics');
      }, 2000);
    };

    activatePro();
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Subscription Successful</title>
        {/* Google Ads Conversion Tracking Snippet */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                'send_to': 'AW-17021468689/HCUWC16B_roaEJGAvLQ_',
                'value': 1.0,
                'currency': 'GBP'
              });
            `,
          }}
        />
      </Head>

      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Thanks for subscribing!</h1>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    </>
  );
}
