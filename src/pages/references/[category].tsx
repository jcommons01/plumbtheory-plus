// ✅ POLISHED: src/pages/references/[category].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

export default function ReferenceCategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [entries, setEntries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!category || Array.isArray(category)) return;
    const fetchEntries = async () => {
      const snapshot = await getDocs(collection(db, 'references', category, 'items'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    };
    fetchEntries();
  }, [category]);

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {typeof category === 'string' ? category.replace(/-/g, ' ') : ''}
        </h1>

        <input
          type="text"
          placeholder="Search reference items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />

        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-lg font-semibold mb-1">{entry.title}</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/references')}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to all reference categories
          </button>
        </div>
      </div>
    </Layout>
  );
}