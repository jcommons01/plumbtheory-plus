import React from "react";

// Define the Topic type for use in topics.ts
export type Topic = {
  id: string;
  title: string;
  icon: string;
  isPro: boolean;
  level: number;
  totalQuestions: number;
  trade: string;
  whatYoullLearn?: string[]; // New field for What You'll Learn
};

type Props = {
  topics: Topic[];
  trade: string;
};

// The order and names of trades as in the image
const TRADE_ORDER = [
  "Plumbing",
  "Bricklaying",
  "Electrical",
  "HVAC",
  "Joinery",
  "Gas",
  "Building Regulations",
  "CSCS",
];

const TRADE_DATA = [
  { trade: "Plumbing", levels: { 2: { free: 3, pro: 7 }, 3: { free: 1, pro: 8 } } },
  { trade: "Bricklaying", levels: { 2: { free: 1, pro: 9 }, 3: { free: 0, pro: 10 } } },
  { trade: "Electrical", levels: { 2: { free: 0, pro: 9 }, 3: { free: 0, pro: 13 } } },
  { trade: "HVAC", levels: { 2: { free: 0, pro: 6 }, 3: { free: 0, pro: 7 } } },
  { trade: "Joinery", levels: { 2: { free: 0, pro: 7 }, 3: { free: 0, pro: 9 } } },
  { trade: "Gas", single: { free: 0, pro: 10 } },
  { trade: "Building Regulations", single: { free: 0, pro: 15 } },
  { trade: "CSCS", single: { free: 1, pro: 9 } },
];

const badge = (count: number, type: 'Free' | 'Pro') => {
  const color = type === 'Free' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white';
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${color}`}>{count} {type} Topics</span>
  );
};

export default function ComparisonTable({ topics, trade }: Props) {
  return (
    <div className="max-w-3xl mx-auto my-10 rounded-2xl shadow-lg overflow-hidden bg-[#181f2a] border border-[#232c3b]">
      <h2 className="text-2xl font-bold text-center py-6 bg-blue-600 text-white rounded-t-2xl">
        Free vs <span className="inline-flex items-center gap-1"><span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">Pro Topics</span></span> by Trade & Level
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#181f2a] block md:table">
          <thead className="block md:table-header-group">
            <tr className="block md:table-row">
              <th className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold block md:table-cell">Trade</th>
              <th className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold block md:table-cell">Level 2 <span className="ml-1" role="img" aria-label="free">🆓</span></th>
              <th className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold block md:table-cell">Level 3 <span className="ml-1" role="img" aria-label="graduate">🎓</span></th>
              <th className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold block md:table-cell">Other</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {TRADE_ORDER.map((trade, i) => {
              const data = TRADE_DATA.find((t) => t.trade === trade);
              const rowBg = i % 2 === 0 ? "bg-gray-800" : "bg-gray-700";
              return (
                <tr key={trade} className={`block md:table-row ${rowBg}`}>
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold block md:table-cell">{trade}</td>
                  {/* Level 2 */}
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center block md:table-cell">
                    <div className="flex flex-col gap-1 items-center">
                      {data?.levels && data.levels[2] && (
                        <>
                          {data.levels[2].free > 0 ? badge(data.levels[2].free, 'Free') : null}
                          {data.levels[2].pro > 0 ? badge(data.levels[2].pro, 'Pro') : null}
                          {data.levels[2].free === 0 && data.levels[2].pro === 0 ? <span className="text-gray-500">—</span> : null}
                        </>
                      )}
                      {!data?.levels || !data.levels[2] ? <span className="text-gray-500">—</span> : null}
                    </div>
                  </td>
                  {/* Level 3 */}
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center block md:table-cell">
                    <div className="flex flex-col gap-1 items-center">
                      {data?.levels && data.levels[3] && (
                        <>
                          {data.levels[3].free > 0 ? badge(data.levels[3].free, 'Free') : null}
                          {data.levels[3].pro > 0 ? badge(data.levels[3].pro, 'Pro') : null}
                          {data.levels[3].free === 0 && data.levels[3].pro === 0 ? <span className="text-gray-500">—</span> : null}
                        </>
                      )}
                      {!data?.levels || !data.levels[3] ? <span className="text-gray-500">—</span> : null}
                    </div>
                  </td>
                  {/* Other (for trades without levels) */}
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center block md:table-cell">
                    <div className="flex flex-col gap-1 items-center">
                      {data?.single && (
                        <>
                          {data.single.free > 0 ? badge(data.single.free, 'Free') : null}
                          {data.single.pro > 0 ? badge(data.single.pro, 'Pro') : null}
                          {data.single.free === 0 && data.single.pro === 0 ? <span className="text-gray-500">—</span> : null}
                        </>
                      )}
                      {!data?.single ? <span className="text-gray-500">—</span> : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}