// ✅ FILE: src/pages/overview.tsx
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function Overview() {
  const { userData, loading } = useAuth();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    if (!userData?.quizProgress) return;

    const topics = Object.entries(userData.quizProgress).map(([topic, data]: any) => ({
      topic,
      bestScore: data.bestScore || 0,
      lastCorrect: data.lastCorrect || 0,
      lastTotal: data.lastTotal || 0,
      seen: data.seenIds?.length || 0,
    }));

    setStats(topics);
  }, [userData]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">📊 Your Progress Overview</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Best Scores by Topic</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="topic" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="bestScore" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((s) => (
            <div
              key={s.topic}
              className="bg-white p-4 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2 capitalize">{s.topic.replace(/-/g, ' ')}</h3>
              <p>🎯 Best Score: {s.bestScore}%</p>
              <p>🧠 Last Attempt: {s.lastCorrect}/{s.lastTotal}</p>
              <p>👀 Questions Seen: {s.seen}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/favourites"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            ⭐ Go to Bookmarked Questions
          </Link>
        </div>
      </div>
    </Layout>
  );
}
