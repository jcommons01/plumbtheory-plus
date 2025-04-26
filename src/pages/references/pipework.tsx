// ✅ src/pages/references/pipework.tsx
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion'; // ✅ Add framer-motion animations

export default function PipeworkReference() {
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
      <h1 className="text-3xl font-bold mb-8 text-center">Pipework Reference</h1>

      {/* Copper Pipes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Copper Pipe Sizes & Clipping</h2>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Pipe Size</th>
                <th className="py-3 px-4 font-semibold">Horizontal Clipping</th>
                <th className="py-3 px-4 font-semibold">Vertical Clipping</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: '8mm', horizontal: '1.0m', vertical: '1.5m' },
                { size: '10mm', horizontal: '1.0m', vertical: '1.5m' },
                { size: '15mm', horizontal: '1.2m', vertical: '1.8m' },
                { size: '22mm', horizontal: '1.8m', vertical: '2.4m' },
                { size: '28mm', horizontal: '2.0m', vertical: '2.4m' },
                { size: '35mm', horizontal: '2.4m', vertical: '3.0m' },
                { size: '42mm', horizontal: '2.4m', vertical: '3.0m' },
                { size: '54mm', horizontal: '2.4m', vertical: '3.0m' },
              ].map((pipe) => (
                <tr key={pipe.size} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{pipe.size}</td>
                  <td className="py-3 px-4">{pipe.horizontal}</td>
                  <td className="py-3 px-4">{pipe.vertical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plastic Pipes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Plastic Pipe Sizes & Clipping</h2>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Pipe Size</th>
                <th className="py-3 px-4 font-semibold">Horizontal Clipping</th>
                <th className="py-3 px-4 font-semibold">Vertical Clipping</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: '10mm', horizontal: '0.6m', vertical: '1.0m' },
                { size: '15mm', horizontal: '0.8m', vertical: '1.2m' },
                { size: '22mm', horizontal: '1.0m', vertical: '1.5m' },
                { size: '28mm', horizontal: '1.2m', vertical: '1.8m' },
              ].map((pipe) => (
                <tr key={pipe.size} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{pipe.size}</td>
                  <td className="py-3 px-4">{pipe.horizontal}</td>
                  <td className="py-3 px-4">{pipe.vertical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Steel / LCS Pipes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Steel / LCS Pipe Sizes & Clipping</h2>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Pipe Size</th>
                <th className="py-3 px-4 font-semibold">Horizontal Clipping</th>
                <th className="py-3 px-4 font-semibold">Vertical Clipping</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: '15mm', horizontal: '1.5m', vertical: '2.0m' },
                { size: '20mm', horizontal: '1.8m', vertical: '2.4m' },
                { size: '25mm', horizontal: '2.0m', vertical: '2.7m' },
                { size: '32mm', horizontal: '2.4m', vertical: '3.0m' },
                { size: '40mm', horizontal: '2.4m', vertical: '3.0m' },
                { size: '50mm', horizontal: '2.4m', vertical: '3.0m' },
              ].map((pipe) => (
                <tr key={pipe.size} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{pipe.size}</td>
                  <td className="py-3 px-4">{pipe.horizontal}</td>
                  <td className="py-3 px-4">{pipe.vertical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
