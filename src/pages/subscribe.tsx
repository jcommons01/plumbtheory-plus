import { useState } from 'react';
import Layout from '@/components/Layout';

const Subscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = () => {
    // Redirect to the new Stripe payment link
    window.location.href = "https://buy.stripe.com/test_aEU02bcz4bCReIwcMN"; // Updated Stripe payment link
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Upgrade to PlumbTheory+ Pro</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Pro Subscription</h2>
            <p className="text-4xl font-bold mt-4">£7 <span className="text-xl font-normal">/month</span></p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Benefits of Pro:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start"><span className="mr-2 text-green-500">✔</span> Access all Pro topics</li>
              <li className="flex items-start"><span className="mr-2 text-green-500">✔</span> Detailed explanations</li>
              <li className="flex items-start"><span className="mr-2 text-green-500">✔</span> Full progress tracking</li>
              <li className="flex items-start"><span className="mr-2 text-green-500">✔</span> New content monthly</li>
              <li className="flex items-start"><span className="mr-2 text-green-500">✔</span> Cancel anytime</li>
            </ul>

            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

            <button
              onClick={handleSubscribe} // On click, redirect to the updated Stripe payment link
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-md text-white font-semibold transition ${
                isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Processing...' : 'Subscribe with Stripe'}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Secure payment via Stripe. Your card is never stored.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/topics'} // "Back to Topics" button
            className="text-blue-500 hover:underline"
          >
            Back to Topics
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Subscribe;
