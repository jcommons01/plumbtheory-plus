// ✅ src/pages/admin/reports.tsx
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const ADMIN_EMAIL = 'jordoncommons@gmail.com';

export default function AdminReportsPage() {
  const { userData, loading } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!userData || userData.email !== ADMIN_EMAIL)) {
      router.push('/');
    }
  }, [loading, userData, router]);

  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await getDocs(collection(db, 'questionReports'));
      const reportData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReports(reportData);
    };

    if (userData?.email === ADMIN_EMAIL) {
      fetchReports();
    }
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

  if (!userData || userData.email !== ADMIN_EMAIL) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-xl font-bold text-red-500">Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reported Questions</h1>
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white p-4 rounded shadow border">
                <h3 className="font-semibold text-blue-700 mb-1">Question:</h3>
                <p className="mb-2 text-gray-800">{report.questionText}</p>

                <h4 className="font-semibold text-blue-700 mb-1">Options:</h4>
                <ul className="list-disc pl-5 text-gray-700 mb-2">
                  {report.options?.map((opt: string, idx: number) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>

                <p className="mb-2">
                  <span className="font-semibold text-blue-700">Correct Answer:</span>{' '}
                  <span className="text-green-700">{report.correctAnswer}</span>
                </p>

                <h4 className="font-semibold text-red-700 mb-1">User Report:</h4>
                <p className="text-gray-700">{report.reportText}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
