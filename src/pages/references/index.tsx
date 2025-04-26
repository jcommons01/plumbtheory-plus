import { useState } from 'react';
import { referenceCategories } from '@/data/referenceData';

export default function ReferenceLibrary() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Reference Library</h1>
      <div className="space-y-4">
        {referenceCategories.map((category) => (
          <div
            key={category.id}
            className="border rounded-2xl shadow p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{category.title}</h2>
              <span className="text-2xl">{openCategory === category.id ? '−' : '+'}</span>
            </div>
            {openCategory === category.id && (
              <div className="mt-4 space-y-2">
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.stats.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-inner">
                      <p className="font-bold">{stat.label}</p>
                      <p>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
