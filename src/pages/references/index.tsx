import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import UpgradeModal from '@/components/UpgradeModal';

interface Category {
  id: string;
  title: string;
  description: string;
  isPro: boolean;
}

export default function ReferenceIndex() {
  const router = useRouter();
  const { userData } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const refSnapshot = await getDocs(collection(db, 'references'));
      const catData: Category[] = [];

      for (const docSnap of refSnapshot.docs) {
        // fallback to default formatting if custom metadata isn't stored
        const id = docSnap.id;
        const formatted = id.replace(/-/g, ' ');
        catData.push({
          id,
          title: toTitleCase(formatted),
          description: 'Click to view reference content.',
          isPro: true, // fallback; set to false for free ones below
        });
      }

      // Mark free categories explicitly
      const freeIds = ['pipework', 'heating-systems', 'pipe-falls'];
      const withAccess = catData.map((cat) => ({
        ...cat,
        isPro: !freeIds.includes(cat.id),
      }));

      // Sort free first
      withAccess.sort((a, b) => Number(a.isPro) - Number(b.isPro));
      setCategories(withAccess);
    };

    fetchCategories();
  }, []);

  const handleClick = (categoryId: string, isPro: boolean) => {
    if (isPro && !userData?.isPro) {
      setIsUpgradeModalOpen(true);
    } else {
      router.push(`/references/${categoryId}`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <h1 className="text-3xl font-bold text-center mb-10">Reference Library</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const locked = cat.isPro && !userData?.isPro;
            return (
              <div
                key={cat.id}
                onClick={() => handleClick(cat.id, cat.isPro)}
                className={`p-6 rounded-2xl shadow-md transition ${
                  locked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black cursor-pointer hover:shadow-lg'
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
                <p className="text-sm">{cat.description}</p>
                {locked && <p className="text-xs text-red-500 mt-2">Pro Access Required</p>}
              </div>
            );
          })}
        </div>
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => router.push('/subscribe')}
      />
    </Layout>
  );
}

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/-/g, ' ');
}
