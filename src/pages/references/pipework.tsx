import Layout from '@/components/Layout';

export default function PipeworkReference() {
  return (
    <Layout title="Pipework Reference | PlumbTheory+">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Pipe Clipping Distances</h1>

        {/* Copper Table */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Copper Pipe Sizes & Clipping</h2>
        <table className="w-full table-auto border border-gray-300 text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Pipe Size</th>
              <th className="border px-3 py-2">Horizontal Clipping</th>
              <th className="border px-3 py-2">Vertical Clipping</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['8mm', '1.0m', '1.5m'],
              ['10mm', '1.0m', '1.5m'],
              ['15mm', '1.2m', '1.8m'],
              ['22mm', '1.8m', '2.4m'],
              ['28mm', '2.0m', '2.4m'],
              ['35mm', '2.4m', '3.0m'],
              ['42mm', '2.4m', '3.0m'],
              ['54mm', '2.4m', '3.0m'],
            ].map(([size, hor, vert]) => (
              <tr key={size}>
                <td className="border px-3 py-2">{size}</td>
                <td className="border px-3 py-2">{hor}</td>
                <td className="border px-3 py-2">{vert}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Plastic Table */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Plastic Pipe Sizes & Clipping</h2>
        <table className="w-full table-auto border border-gray-300 text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Pipe Size</th>
              <th className="border px-3 py-2">Horizontal Clipping</th>
              <th className="border px-3 py-2">Vertical Clipping</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['10mm', '0.6m', '1.0m'],
              ['15mm', '0.8m', '1.2m'],
              ['22mm', '1.0m', '1.5m'],
              ['28mm', '1.2m', '1.8m'],
            ].map(([size, hor, vert]) => (
              <tr key={size}>
                <td className="border px-3 py-2">{size}</td>
                <td className="border px-3 py-2">{hor}</td>
                <td className="border px-3 py-2">{vert}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Steel Table */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Steel / LCS Pipe Sizes & Clipping</h2>
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Pipe Size</th>
              <th className="border px-3 py-2">Horizontal Clipping</th>
              <th className="border px-3 py-2">Vertical Clipping</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['15mm', '1.5m', '2.0m'],
              ['20mm', '1.8m', '2.4m'],
              ['25mm', '2.0m', '2.7m'],
              ['32mm', '2.4m', '3.0m'],
              ['40mm', '2.4m', '3.0m'],
              ['50mm', '2.4m', '3.0m'],
            ].map(([size, hor, vert]) => (
              <tr key={size}>
                <td className="border px-3 py-2">{size}</td>
                <td className="border px-3 py-2">{hor}</td>
                <td className="border px-3 py-2">{vert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
