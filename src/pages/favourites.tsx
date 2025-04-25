import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { getBookmarkedQuestions } from '@/lib/bookmark';
import { getQuizQuestions } from '@/lib/firebase';

export default function Favourites() {
  const { user, loading } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) return;
      try {
        const ids: string[] = await getBookmarkedQuestions(user.uid);

        const allQuestions = await Promise.all(
          ids.map(async (id: string) => {
            const topic = id.split('-')[0];
            const allInTopic = await getQuizQuestions(topic, '50');
            return allInTopic.find((q: any) => String(q.id) === id);
          })
        );

        setQuestions(allQuestions.filter(Boolean));
      } catch (err) {
        console.error('❌ Failed to load favourites:', err);
        setError('Failed to load bookmarked questions.');
      }
    };

    fetchFavourites();
  }, [user]);

  if (loading) return <Layout><div className="p-6 text-center">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">⭐ Bookmarked Questions</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {questions.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q, i) => (
              <li key={i} className="bg-white shadow p-4 rounded-md">
                <h2 className="font-semibold mb-2">{q.question}</h2>
                <ul className="list-disc ml-5 text-sm">
                  {q.options.map((opt: string, idx: number) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-green-600 font-medium">
                  ✅ Correct Answer: {q.correctAnswer}
                </p>
                <p className="text-xs text-gray-600 mt-1 italic">
                  {q.explanation}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
