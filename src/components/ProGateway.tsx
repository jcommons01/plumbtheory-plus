// src/components/ProGateway.tsx
import { FC } from 'react';
import { useRouter } from 'next/router';

const ProGateway: FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-4">Pro Content</h2>
        <p className="text-gray-600 mb-6">
          This content is only available to Pro subscribers. Upgrade to access all premium topics and features.
        </p>
        <button
          onClick={() => router.push('/subscribe')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Upgrade to Pro
        </button>
        <button
          onClick={() => router.push('/topics')}
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Topics
        </button>
      </div>
    </div>
  );
};

export default ProGateway;
