import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { referenceCategories } from '@/data/referenceData';
import UpgradeModal from '@/components/UpgradeModal';

export default function References() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  const sortedCategories = [...referenceCategories].sort((a, b) => Number(a.isPro) - Number(b.isPro));

  const openReference = (categoryId: string, isPro: boolean) => {
    if (isPro && !userData?.isPro) {
      setIsUpgradeModalOpen(true);
    } else {
      router.push(`/references/${categoryId}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Reference Toolkit</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => openReference(category.id, category.isPro)}
              className={`rounded-lg border shadow-md p-6 cursor-pointer transition ${
                category.isPro && !userData?.isPro
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-black hover:shadow-lg'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">
                  📚
                </span>
                <h3 className="text-lg font-semibold capitalize">{category.title}</h3>
              </div>
              <p className="text-sm">{category.description}</p>
              {category.isPro && !userData?.isPro && (
                <p className="text-xs text-red-500 mt-3">Pro Access Required</p>
              )}
            </div>
          ))}
        </div>

        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          onUpgrade={() => router.push('/subscribe')}
        />
      </div>
    </Layout>
  );
}
