import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { tradeGuideData } from "@/data/tradeGuideData";

export default function TradeCategoryPage() {
  const router = useRouter();
  const { trade } = router.query;

  const tradeInfo = tradeGuideData[trade as keyof typeof tradeGuideData];

  if (!tradeInfo) {
    return (
      <Layout title="Trade Guide">
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <p className="text-xl">Trade not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${tradeInfo.label} Guide | PlumbTheory+`}>
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">{tradeInfo.label} Guide</h1>
          <p className="text-center text-slate-300 text-lg mb-10">
            Choose a category to view key information, specs, and regulations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tradeInfo.categories.map((category) => (
              <Link
                key={category.id}
                href={`/trade-guide/${trade}/${category.id}`}
              >
                <div className="bg-white hover:shadow-lg transition-all duration-200 p-6 rounded-xl shadow cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">{category.title}</h2>
                    <p className="text-slate-600 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
