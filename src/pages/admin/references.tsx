// ✅ src/pages/admin/references.tsx
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
} from 'firebase/firestore';
import Layout from '@/components/Layout';
import { app } from '@/lib/firebase';

const db = getFirestore(app);
const auth = getAuth(app);
const ADMIN_EMAIL = 'jordoncommons@gmail.com';

export default function AdminReferencesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [entries, setEntries] = useState<any[]>([]);
  const [form, setForm] = useState({ id: '', title: '', content: '' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'references'));
      const cats = snap.docs.map((doc) => doc.id);
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!selectedCategory) return;
      const snap = await getDocs(collection(db, 'references', selectedCategory, 'items'));
      setEntries(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchEntries();
  }, [selectedCategory]);

  const handleSave = async () => {
    if (!selectedCategory || !form.id || !form.title || !form.content) return;
    await setDoc(doc(db, 'references', selectedCategory, 'items', form.id), {
      title: form.title,
      content: form.content,
      category: selectedCategory,
    });
    setForm({ id: '', title: '', content: '' });
    const snap = await getDocs(collection(db, 'references', selectedCategory, 'items'));
    setEntries(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await deleteDoc(doc(db, 'references', selectedCategory, 'items', id));
    setEntries(entries.filter((e) => e.id !== id));
  };

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold">Admin Access Only</h1>
          <p className="text-gray-600 mt-2">You must be logged in as the admin to access this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Manage Reference Content</h1>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            <option value="">-- Choose a category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <>
            <div className="border p-4 rounded mb-6 bg-gray-50">
              <h2 className="text-lg font-semibold mb-2">Add / Update Entry</h2>
              <input
                type="text"
                placeholder="ID (no spaces)"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-3"
              />
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-3"
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                className="border px-3 py-2 rounded w-full mb-3"
              />
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Entry
              </button>
            </div>

            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white shadow rounded p-4 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{entry.title}</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
