import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PipeFallsReference() {
  const router = useRouter();

  return (
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
      <h1 className="text-3xl font-bold mb-8 text-center">Minimum Pipe Falls (Waste & Soil)</h1>

      {/* Information Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold">Pipe Type</th>
              <th className="py-3 px-4 font-semibold">Typical Pipe Size</th>
              <th className="py-3 px-4 font-semibold">Recommended Fall</th>
              <th className="py-3 px-4 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                type: 'Basin Waste',
                size: '32mm',
                fall: '18-22mm per metre (1:40 - 1:50)',
                notes: 'Minimum 18mm/m to prevent blockages.',
              },
              {
                type: 'Sink, Bath, Shower Waste',
                size: '40mm',
                fall: '8-12mm per metre (1:80 - 1:100)',
                notes: 'Smoother flow due to larger diameter.',
              },
              {
                type: 'Large Appliances / Rainwater',
                size: '50mm',
                fall: '8-12mm per metre (1:80 - 1:100)',
                notes: 'Used for larger flows (washing machines etc).',
              },
              {
                type: 'Soil Pipes (WC Discharge)',
                size: '110mm',
                fall: '18mm per metre (1:40)',
                notes: 'Standard fall for soil stacks and foul waste.',
              },
            ].map((row) => (
              <tr key={row.type} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-4">{row.type}</td>
                <td className="py-3 px-4">{row.size}</td>
                <td className="py-3 px-4">{row.fall}</td>
                <td className="py-3 px-4">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
