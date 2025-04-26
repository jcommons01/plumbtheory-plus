import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ElectricalZonesReference() {
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
      <h1 className="text-3xl font-bold mb-8 text-center">Electrical Zones in Bathrooms</h1>

      {/* Information Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold">Zone</th>
              <th className="py-3 px-4 font-semibold">Definition</th>
              <th className="py-3 px-4 font-semibold">Minimum IP Rating</th>
              <th className="py-3 px-4 font-semibold">Examples</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                zone: 'Zone 0',
                definition: 'Inside the bath or shower tray itself.',
                ipRating: 'IPX7 (Immersion protection)',
                examples: 'Low-voltage (SELV) luminaires, totally waterproof fittings only.',
              },
              {
                zone: 'Zone 1',
                definition: 'Above the bath or shower up to 2.25m height.',
                ipRating: 'IPX4 (Splash-proof)',
                examples: 'Shower lighting, extract fans rated for Zone 1 use.',
              },
              {
                zone: 'Zone 2',
                definition: '0.6m horizontally outside Zone 1 and up to 2.25m height.',
                ipRating: 'IPX4 (Splash-proof)',
                examples: 'Shaver sockets (with RCD), lighting outside bath/shower.',
              },
              {
                zone: 'Outside Zones',
                definition: 'Beyond Zones 0, 1, and 2.',
                ipRating: 'No specific IP rating required unless subject to splashing.',
                examples: 'General lighting, switches (preferably outside bathroom).',
              },
            ].map((row) => (
              <tr key={row.zone} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-4">{row.zone}</td>
                <td className="py-3 px-4">{row.definition}</td>
                <td className="py-3 px-4">{row.ipRating}</td>
                <td className="py-3 px-4">{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
