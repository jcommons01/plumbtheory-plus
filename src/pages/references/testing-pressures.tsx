import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const testingPressures = [
  {
    test: 'Water Pipework Testing',
    description: 'Test at 1.5 × working pressure. Typically 6 bar for 1 hour with no pressure drop.',
  },
  {
    test: 'Gas Tightness Test',
    description: 'Hold 20 mbar for 2 minutes with no pressure drop (domestic gas systems).',
  },
  {
    test: 'Gas Strength Test',
    description: 'Apply 1.5 × working pressure (e.g., 40 mbar) for 1 minute, no loss permitted.',
  },
  {
    test: 'Unvented Cylinder Discharge Testing',
    description: 'Confirm tundish allows full discharge without overflow. Fall must be 1:200 minimum.',
  },
  {
    test: 'Trap Seal Testing',
    description: 'Fill appliance traps and check water seal retention after use. Prevents loss of seal by siphonage or backpressure.',
  },
  {
    test: 'Waste Pipe Air Pressure Testing',
    description: 'Apply 38mm water gauge (approx. 3.7 mbar) for 3 minutes with no pressure drop (BS EN 12056-2).',
  },
];

export default function TestingPressures() {
  const router = useRouter();

  return (
    <Layout>
      <motion.div
        className="max-w-4xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <button
          onClick={() => router.push('/references')}
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all reference categories
        </button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-center">Testing Pressures</h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4 font-semibold">Test</th>
                <th className="py-3 px-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {testingPressures.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{item.test}</td>
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
