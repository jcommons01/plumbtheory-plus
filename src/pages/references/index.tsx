// ✅ src/pages/references/index.tsx
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const categories = [
  { id: 'pipework', title: 'Pipework', description: 'Pipe sizes, clipping distances, and fitting methods.' },
  { id: 'heating-systems', title: 'Heating Systems', description: 'S-Plan, S-Plan Plus, Y-Plan, W-Plan comparisons.' },
  { id: 'electrical-zones', title: 'Electrical Zones in Bathrooms', description: 'Zones 0–2 and IP rating requirements.' },
  { id: 'testing-pressures', title: 'Standard Test Pressures', description: 'Water and gas system testing pressures.' },
  { id: 'pipe-falls', title: 'Minimum Pipe Falls', description: 'Correct falls for waste and soil pipe installations.' },
  { id: 'backflow-protection', title: 'Backflow Protection Types', description: 'Type AA, AB, DC, and more explained.' },
];

export default function ReferenceIndex() {
  const router = useRouter();

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
              onClick={() => router.push(`/references/${cat.id}`)}
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
    </Layout>
  );
}
