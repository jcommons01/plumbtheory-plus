// src/pages/subscription/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import { updateUserIsPro } from '@/lib/firebase';

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
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Thanks for subscribing!</h1>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
