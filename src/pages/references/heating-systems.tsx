import Layout from '@/components/Layout';

export default function HeatingSystemsReference() {
  return (
    <Layout title="Heating System Types | PlumbTheory+">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Summary of Heating Systems</h1>

        {/* Summary Table */}
        <table className="w-full table-auto border border-gray-300 text-sm mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">System</th>
              <th className="border px-3 py-2">Valve Setup</th>
              <th className="border px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['S-Plan', 'Two 2-port valves', 'Heating and hot water controlled independently.'],
              ['S-Plan Plus', 'Three or more 2-port valves', 'Multiple heating zones and hot water.'],
              ['Y-Plan', 'Single 3-port mid-position valve', 'Heating, hot water, or both. Common in older systems.'],
              ['W-Plan', 'Single 3-port diverter valve', 'Switches between heating or hot water only.'],
            ].map(([system, valves, notes]) => (
              <tr key={system}>
                <td className="border px-3 py-2 font-semibold">{system}</td>
                <td className="border px-3 py-2">{valves}</td>
                <td className="border px-3 py-2">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Detailed Summaries */}
        {[
          {
            title: 'S-Plan',
            text: `Uses two separate 2-port motorised valves to control heating and hot water independently. Common in modern systems.`,
            pros: 'Simple, reliable, easy to zone.',
            cons: 'More pipework and wiring than Y-Plan.',
          },
          {
            title: 'S-Plan Plus',
            text: `Same principle as S-Plan, but with three or more 2-port valves for multi-zone control.`,
            pros: 'Highly flexible zoning, energy efficient.',
            cons: 'More complex wiring and controls.',
          },
          {
            title: 'Y-Plan',
            text: `Uses a single 3-port mid-position valve. Can supply hot water only, heating only, or both.`,
            pros: 'Fewer valves and wiring needed.',
            cons: 'Valve failure affects both systems.',
          },
          {
            title: 'W-Plan',
            text: `Uses a diverter valve with two positions: heating or hot water only.`,
            pros: 'Simple and easy to control.',
            cons: 'Cannot supply both at once.',
          },
        ].map(({ title, text, pros, cons }) => (
          <div key={title} className="mb-6">
            <h2 className="text-xl font-semibold mb-1">{title}</h2>
            <p className="text-sm text-gray-700 mb-1">{text}</p>
            <p className="text-sm text-green-600"><strong>Pros:</strong> {pros}</p>
            <p className="text-sm text-red-500"><strong>Cons:</strong> {cons}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
