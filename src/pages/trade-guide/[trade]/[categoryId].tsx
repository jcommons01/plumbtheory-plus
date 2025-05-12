import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthProvider";
import { tradeGuideData } from "@/data/tradeGuideData"; // ✅ Correct named import

import plumbingContent from "@/data/plumbingContent";
import gasContent from "@/data/gasContent";
import electricalContent from "@/data/electricalContent";
import hvacContent from "@/data/hvacContent";
import joineryContent from "@/data/joineryContent";
import bricklayingContent from "@/data/bricklayingContent";

type TableContent = {
  title: string;
  table: {
    headers: string[];
    rows: string[][];
  };
};

type SectionContent = {
  title: string;
  sections: {
    heading: string;
    content: string[];
  }[];
};

type ContentType = TableContent | SectionContent;

const contentMap = {
  plumbing: plumbingContent,
  gas: gasContent,
  electrical: electricalContent,
  hvac: hvacContent,
  joinery: joineryContent,
  bricklaying: bricklayingContent,
};

const TradeGuideCategoryPage = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const { trade, categoryId } = router.query;

  let content: ContentType | null = null;

  if (typeof trade === "string" && typeof categoryId === "string") {
    const tradeContent = contentMap[trade as keyof typeof contentMap];
    if (tradeContent) {
      content = tradeContent[categoryId as keyof typeof tradeContent] as ContentType;
    }

    // ✅ Correct type on 'c'
    const guideCategory = tradeGuideData[trade as keyof typeof tradeGuideData]?.categories.find(
      (c: { id: string; isPro?: boolean }) => c.id === categoryId
    );

    if (guideCategory?.isPro && !userData?.isPro) {
      return (
        <Layout title="Upgrade Required">
          <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <p className="text-xl text-center max-w-md">
              This Trade Guide topic is for Pro users only.{" "}
              <a href="/subscribe" className="text-blue-400 underline">
                Upgrade to Pro
              </a>{" "}
              to unlock all guides.
            </p>
          </div>
        </Layout>
      );
    }
  }

  if (!content) {
    return (
      <Layout title="Category Not Found">
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <p className="text-xl">Category not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${content.title} | PlumbTheory+`}>
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{content.title}</h1>

          {"table" in content ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-slate-800 rounded-lg">
                <thead>
                  <tr>
                    {content.table.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-slate-200 border-b border-slate-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map((row, rowIndex) => {
                    if (row[0] === "DIVIDER") {
                      return (
                        <tr key={rowIndex} className="bg-slate-700">
                          <td
                            colSpan={content.table.headers.length}
                            className="px-4 py-2 font-bold text-blue-400"
                          >
                            {row[1]}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={rowIndex} className="border-b border-slate-700">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            content.sections.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {section.heading}
                </h2>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {section.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TradeGuideCategoryPage;
