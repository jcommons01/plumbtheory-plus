// ✅ src/pages/references/index.tsx
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider'; // ✅ Import auth
import UpgradeModal from '@/components/UpgradeModal'; // ✅ Import Upgrade Modal
import { useState } from 'react'; // ✅ For modal open state

const categories = [
  { id: 'pipework', title: 'Pipework', description: 'Pipe sizes, clipping distances, and fitting methods.', isPro: false },
  { id: 'heating-systems', title: 'Heating Systems', description: 'S-Plan, S-Plan Plus, Y-Plan, W-Plan comparisons.', isPro: true },
  { id: 'electrical-zones', title: 'Electrical Zones in Bathrooms', description: 'Zones 0–2 and IP rating requirements.', isPro: true },
  { id: 'testing-pressures', title: 'Standard Test Pressures', description: 'Water and gas system testing pressures.', isPro: true },
  { id: 'pipe-falls', title: 'Minimum Pipe Falls', description: 'Correct falls for waste and soil pipe installations.', isPro: true },
  { id: 'backflow-protection', title: 'Backflow Protection Types', description: 'Type AA, AB, DC, and more explained.', isPro: true },
];

export default function ReferenceIndex() {
  const router = useRouter();
  const { userData } = useAuth(); // ✅ Get userData
  const [upgradeOpen, setUpgradeOpen] = useState(false); // ✅ Modal open/close state

  const handleCategoryClick = (cat: { id: string; isPro: boolean }) => {
    if (cat.isPro && !userData?.isPro) {
      setUpgradeOpen(true); // 🔒 Show upgrade modal
    } else {
      router.push(`/references/${cat.id}`);
    }
  };

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
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCategoryClick(cat)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
              <p className="text-gray-600">{cat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 🔒 Upgrade Modal */}
      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} onUpgrade={() => router.push('/subscribe')} />
    </Layout>
  );
}
