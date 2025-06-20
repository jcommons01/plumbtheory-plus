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
        Free vs Pro
      </h2>
      {/* Mobile Card Layout */}
      <div className="md:hidden p-4 space-y-6 flex flex-col items-center justify-center">
        {TRADE_ORDER.map((trade, i) => {
          const data = TRADE_DATA.find((t) => t.trade === trade);
          return (
            <div key={trade} className="bg-gray-800 rounded-xl shadow p-4 flex flex-col gap-2 border border-[#232c3b] w-full max-w-md items-center text-center mx-auto">
              <div className="text-lg font-bold text-white mb-2 flex items-center gap-2 justify-center w-full">
                {trade}
              </div>
              {data?.levels && (
                <div className="flex flex-col gap-2 w-full items-center">
                  <div className="flex flex-col gap-1 w-full items-center">
                    <span className="text-sm text-gray-300 font-semibold text-center w-full">Level 2</span>
                    <div className="flex gap-2 flex-wrap items-center justify-center w-full">
                      {data.levels[2].free > 0 ? badge(data.levels[2].free, 'Free') : null}
                      {data.levels[2].pro > 0 ? badge(data.levels[2].pro, 'Pro') : null}
                      {data.levels[2].free === 0 && data.levels[2].pro === 0 ? <span className="text-gray-500">—</span> : null}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full items-center">
                    <span className="text-sm text-gray-300 font-semibold text-center w-full">Level 3</span>
                    <div className="flex gap-2 flex-wrap items-center justify-center w-full">
                      {data.levels[3].free > 0 ? badge(data.levels[3].free, 'Free') : null}
                      {data.levels[3].pro > 0 ? badge(data.levels[3].pro, 'Pro') : null}
                      {data.levels[3].free === 0 && data.levels[3].pro === 0 ? <span className="text-gray-500">—</span> : null}
                    </div>
                  </div>
                </div>
              )}
              {data?.single && (
                <div className="flex flex-col gap-1 w-full items-center">
                  <span className="text-sm text-gray-300 font-semibold text-center w-full">Other</span>
                  <div className="flex gap-2 flex-wrap items-center justify-center w-full">
                    {data.single.free > 0 ? badge(data.single.free, 'Free') : null}
                    {data.single.pro > 0 ? badge(data.single.pro, 'Pro') : null}
                    {data.single.free === 0 && data.single.pro === 0 ? <span className="text-gray-500">—</span> : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Desktop Table Layout */}
      <div className="overflow-x-auto hidden md:flex md:justify-center">
        <table className="min-w-[500px] w-full max-w-3xl bg-[#181f2a] md:table text-xs sm:text-sm mx-auto text-center">
          <thead className="md:table-header-group">
            <tr className="md:table-row">
              <th className="py-2 px-2 sm:px-4 border-b border-[#232c3b] text-center text-white font-semibold md:table-cell whitespace-nowrap">Trade</th>
              <th className="py-2 px-2 sm:px-4 border-b border-[#232c3b] text-center text-white font-semibold md:table-cell whitespace-nowrap">Level 2</th>
              <th className="py-2 px-2 sm:px-4 border-b border-[#232c3b] text-center text-white font-semibold md:table-cell whitespace-nowrap">Level 3</th>
              <th className="py-2 px-2 sm:px-4 border-b border-[#232c3b] text-center text-white font-semibold md:table-cell whitespace-nowrap">Other</th>
            </tr>
          </thead>
          <tbody className="md:table-row-group">
            {TRADE_ORDER.map((trade, i) => {
              const data = TRADE_DATA.find((t) => t.trade === trade);
              const rowBg = i % 2 === 0 ? "bg-gray-800" : "bg-gray-700";
              return (
                <tr key={trade} className={`md:table-row ${rowBg} text-center`}>
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center text-white font-semibold md:table-cell">{trade}</td>
                  {/* Level 2 */}
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center md:table-cell">
                    <div className="flex flex-col gap-1 items-center justify-center">
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
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center md:table-cell">
                    <div className="flex flex-col gap-1 items-center justify-center">
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
                  <td className="py-2 px-4 border-b border-[#232c3b] text-center md:table-cell">
                    <div className="flex flex-col gap-1 items-center justify-center">
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