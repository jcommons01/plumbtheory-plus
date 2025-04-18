// src/pages/subscription/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { updateUserIsPro } from '@/lib/firebase';

export default function SubscriptionSuccess() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const activatePro = async () => {
      if (user) {
        try {
          await updateUserIsPro(user.uid, true);
          console.log('✅ User upgraded to Pro!');
        } catch (error) {
          console.error('❌ Failed to update Pro status:', error);
        }
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push('/topics');
      }, 1500);
    };

    activatePro();
  }, [user, router]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Subscription Successful!</h1>
        <p className="text-gray-700 text-lg">Redirecting you to your topics...</p>
      </div>
    </Layout>
  );
}
