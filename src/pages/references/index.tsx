// ✅ src/pages/references/index.tsx
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Layout from '@/components/Layout';
import { app } from '@/lib/firebase';
import Link from 'next/link';

const db = getFirestore(app);

export default function ReferencesPage() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'references'));
      const cats = snap.docs.map((doc) => doc.id);
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Reference Library 📚</h1>

        <div className="grid gap-4">
          {categories.length === 0 && (
            <p className="text-gray-600">No reference categories available yet.</p>
          )}
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/references/${cat}`}
              className="block bg-white shadow hover:shadow-md rounded p-4 transition"
            >
              <h2 className="font-semibold text-lg capitalize">
                {cat.replace(/-/g, ' ')}
              </h2>
              <p className="text-sm text-gray-500">View reference entries</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
