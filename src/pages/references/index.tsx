import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider';
import UpgradeModal from '@/components/UpgradeModal';
import { useState } from 'react';
import { referenceCategories as categories } from '@/data/referenceData';

export default function ReferenceIndex() {
  const router = useRouter();
  const { userData } = useAuth();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const handleCategoryClick = (cat: { id: string; isPro: boolean }) => {
    if (cat.isPro && !userData?.isPro) {
      setUpgradeOpen(true);
    } else {
      router.push(`/references/${cat.id}`);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => Number(a.isPro) - Number(b.isPro));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <h1 className="text-3xl font-bold text-center mb-10">Reference Library</h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {sortedCategories.map((cat) => {
            const locked = cat.isPro && !userData?.isPro;
            return (
              <motion.div
                key={cat.id}
                whileHover={!locked ? { scale: 1.03 } : {}}
                whileTap={!locked ? { scale: 0.98 } : {}}
                onClick={() => handleCategoryClick(cat)}
                className={`p-6 rounded-2xl shadow-md transition ${
                  locked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black cursor-pointer hover:shadow-lg'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
                <p className="text-sm">{cat.description}</p>
                {locked && <p className="text-xs text-red-500 mt-2">Pro Access Required</p>}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 🔒 Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onUpgrade={() => router.push('/subscribe')}
      />
    </Layout>
  );
}
