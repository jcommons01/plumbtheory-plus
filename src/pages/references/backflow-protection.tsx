// ✅ src/pages/references/backflow-protection.tsx
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const backflowProtections = [
  { type: 'Type AA', description: 'Air gap with no risk of contamination; highest protection (e.g., storage cisterns).' },
  { type: 'Type AB', description: 'Air gap with weir overflow; protects against Fluid Category 5 (very high risk).' },
  { type: 'Type DC', description: 'Double check valve for low-risk applications (NOT suitable for Category 5 fluids).' },
  { type: 'Type CA', description: 'Verifiable reduced pressure zone device (RPZ valve); protects against higher risk contamination.' },
];

export default function BackflowProtection() {
  const router = useRouter();

  return (
    <Layout>
      <motion.div
        className="max-w-4xl mx-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/references')}
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Library
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-center">Backflow Protection Types</h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Type</th>
                <th className="py-3 px-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {backflowProtections.map((item) => (
                <tr key={item.type} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{item.type}</td>
                  <td className="py-3 px-4">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </Layout>
  );
}
