import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestPressuresReference() {
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
      <h1 className="text-3xl font-bold mb-8 text-center">Standard Test Pressures</h1>

      {/* Information Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold">System</th>
              <th className="py-3 px-4 font-semibold">Test Pressure</th>
              <th className="py-3 px-4 font-semibold">Duration</th>
              <th className="py-3 px-4 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                system: 'Water Pipework',
                pressure: '1.5 × working pressure (typically ~6 bar)',
                duration: 'Minimum 1 hour',
                notes: 'No visible leaks or pressure drop allowed.',
              },
              {
                system: 'Domestic Gas Tightness Test',
                pressure: '20 mbar (standing pressure)',
                duration: '2 minutes (for pipework volume < 0.01m³)',
                notes: 'No pressure drop permitted.',
              },
              {
                system: 'Gas Strength Test',
                pressure: '1.5 × working pressure (typically ~40 mbar)',
                duration: 'Minimum 1 minute',
                notes: 'Required after new gas pipe installation.',
              },
              {
                system: 'Unvented Hot Water Systems',
                pressure: 'Test at 1.5 × system pressure (6 bar)',
                duration: 'At least 30 minutes',
                notes: 'Observe pressure stability and check safety devices.',
              },
            ].map((row) => (
              <tr key={row.system} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-4">{row.system}</td>
                <td className="py-3 px-4">{row.pressure}</td>
                <td className="py-3 px-4">{row.duration}</td>
                <td className="py-3 px-4">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
