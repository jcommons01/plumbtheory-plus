// ✅ FILE: src/pages/progress.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { getUserData } from '@/lib/firebase';
import Layout from '@/components/Layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function ProgressPage() {
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect(() => {
    if (!user) return;

    async function fetchHistory() {
        if (!user?.uid) return;
      
        const userData = await getUserData(user.uid);
        const quizProgress = userData?.quizProgress || {};
      
        const availableTopics = Object.keys(quizProgress);
        setTopics(availableTopics);
      
        if (availableTopics.length === 0) return;
      
        const defaultTopic = availableTopics[0];
        setSelectedTopic(defaultTopic);
      
        const history = quizProgress[defaultTopic]?.history || [];
        setHistoryData(
          history.map((entry: any, index: number) => ({
            name: `Attempt ${index + 1}`,
            score: Math.round((entry.score / entry.total) * 100),
            date: new Date(entry.timestamp).toLocaleDateString(),
          }))
        );
      }
      

    fetchHistory();
  }, [user]);

  const handleTopicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = e.target.value;
    setSelectedTopic(topic);

    if (!user) return;

    const userData = await getUserData(user.uid);
    const quizProgress = userData?.quizProgress || {};
    const history = quizProgress[topic]?.history || [];
    setHistoryData(
      history.map((entry: any, index: number) => ({
        name: `Attempt ${index + 1}`,
        score: Math.round((entry.score / entry.total) * 100),
        date: new Date(entry.timestamp).toLocaleDateString(),
      }))
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Progress Charts</h1>

        {topics.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <label className="mr-3 font-medium">Select Topic:</label>
              <select
                value={selectedTopic}
                onChange={handleTopicChange}
                className="border rounded px-3 py-1"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p className="text-center text-gray-500">No quiz history yet. Start a quiz to begin tracking progress!</p>
        )}
      </div>
    </Layout>
  );
}
