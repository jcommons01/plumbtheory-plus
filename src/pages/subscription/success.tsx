// ✅ src/pages/subscription/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const markUserAsPro = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          isPro: true,
          subscribedAt: new Date().toISOString(),
        });
        router.push('/topics');
      }
    };

    const timeout = setTimeout(() => {
      markUserAsPro();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Thanks for subscribing! Redirecting...</p>
    </div>
  );
}
