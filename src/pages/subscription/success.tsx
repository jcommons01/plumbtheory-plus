// src/pages/subscription/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import { updateUserProStatus } from '@/lib/firebase';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      updateUserProStatus(user.uid, true); // Set isPro to true
    }

    const timeout = setTimeout(() => {
      router.push('/topics');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Subscription Successful</h1>
        <p className="text-gray-700">Redirecting you to your topics...</p>
      </div>
    </div>
  );
}
