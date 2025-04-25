// ✅ POLISHED: src/pages/references.tsx (style matched to topics page)
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

export default function References() {
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'references'));
      const cats = snapshot.docs.map((doc) => doc.id);
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const icons: Record<string, string> = {
    'pipe-sizes': '📏',
    'clipping-distances': '🧷',
    'system-types': '💡',
    'fitting-types': '🔩',
    'boiler-fault-codes': '🔥',
    'water-regulations': '🚰',
    'pipe-labelling': '🏷️',
    'conversion-tables': '🔁'
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Reference Toolkit</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => router.push(`/references/${cat}`)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-2xl">{icons[cat] || '📘'}</span>
                <h3 className="text-lg font-semibold capitalize">
                  {cat.replace(/-/g, ' ')}
                </h3>
              </div>
              <div className="h-3 bg-gray-200 rounded-full mt-2 mb-1 w-full"></div>
              <p className="text-sm text-gray-500">Tap to view all entries</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
