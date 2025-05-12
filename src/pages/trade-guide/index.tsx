import Link from "next/link";
import { tradeGuideData } from "@/data/tradeGuideData";
import Layout from "@/components/Layout";

export default function TradeGuideHome() {
  const tradeOrder = ["plumbing", "gas", "electrical", "hvac", "joinery", "bricklaying"];

  return (
    <Layout title="Trade Guide | PlumbTheory+">
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Trade Guide</h1>
          <p className="text-center text-slate-300 text-lg mb-10">
            Select a trade to explore essential technical info, diagrams, and regulations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tradeOrder.map((tradeId) => {
              const trade = tradeGuideData[tradeId as keyof typeof tradeGuideData];
              if (!trade) return null;
              return (
                <Link key={tradeId} href={`/trade-guide/${tradeId}`}>
                  <div className="bg-white hover:shadow-lg transition-all duration-200 p-6 rounded-xl cursor-pointer shadow flex flex-col justify-between h-full">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-2">{trade.label}</h2>
                      <p className="text-slate-600 text-sm">{trade.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
