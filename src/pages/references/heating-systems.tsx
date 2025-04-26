import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeatingSystemsReference() {
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
      <h1 className="text-3xl font-bold mb-8 text-center">Heating Systems Reference</h1>

      {/* Heating Systems Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Summary of Heating Systems</h2>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">System</th>
                <th className="py-3 px-4 font-semibold">Valve Setup</th>
                <th className="py-3 px-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { system: 'S-Plan', valve: 'Two 2-port valves', notes: 'Heating and hot water controlled independently. Modern and flexible.' },
                { system: 'S-Plan Plus', valve: 'Three or more 2-port valves', notes: 'Used for multiple heating zones and hot water. Very flexible zoning.' },
                { system: 'Y-Plan', valve: 'Single 3-port mid-position valve', notes: 'Can supply heating only, hot water only, or both simultaneously.' },
                { system: 'W-Plan', valve: 'Single 3-port diverter valve', notes: 'Switches fully between heating or hot water — no simultaneous supply.' },
              ].map((item) => (
                <tr key={item.system} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-800">{item.system}</td>
                  <td className="py-3 px-4">{item.valve}</td>
                  <td className="py-3 px-4">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Cards */}
      <div className="grid gap-8">
        {/* S-Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2 text-blue-600">S-Plan</h3>
          <p>Uses two separate 2-port motorised valves to control heating and hot water independently. Common in modern systems. Offers flexible control.</p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            <li><strong>Pros:</strong> Simple, reliable, easy to zone.</li>
            <li><strong>Cons:</strong> More pipework and wiring than Y-Plan.</li>
          </ul>
        </motion.div>

        {/* S-Plan Plus */}
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2 text-blue-600">S-Plan Plus</h3>
          <p>Same principle as S-Plan, but with three or more 2-port valves to create multiple heating zones (e.g., upstairs, downstairs, hot water).</p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            <li><strong>Pros:</strong> Highly flexible zoning, energy efficient.</li>
            <li><strong>Cons:</strong> More complex wiring and controls.</li>
          </ul>
        </motion.div>

        {/* Y-Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2 text-blue-600">Y-Plan</h3>
          <p>Uses a single 3-port mid-position valve that can provide hot water only, heating only, or both at the same time. Common in older systems.</p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            <li><strong>Pros:</strong> Fewer valves and wiring needed.</li>
            <li><strong>Cons:</strong> Valve failure can affect both heating and hot water simultaneously.</li>
          </ul>
        </motion.div>

        {/* W-Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2 text-blue-600">W-Plan</h3>
          <p>Uses a 3-port diverter valve with two positions: heating only or hot water only. It does not allow simultaneous heating and hot water delivery.</p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            <li><strong>Pros:</strong> Simple and easy to control.</li>
            <li><strong>Cons:</strong> Cannot supply heating and hot water at the same time.</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
