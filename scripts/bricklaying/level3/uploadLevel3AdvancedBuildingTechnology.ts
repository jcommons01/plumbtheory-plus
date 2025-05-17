import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// ✅ Edited Bricklaying Level 3 Advanced Building Technology Questions (First 25 only)
const questions = [
  {
    id: 'bricklaying-l3-topic4-1',
    question: "What does the U-value represent in building construction?",
    options: ["UV resistance rating", "Material unit price", "Heat transfer rate (W/m²K)", "Load-bearing capacity"],
    correctAnswer: "Heat transfer rate (W/m²K)",
    explanation: "The U-value measures how quickly heat transfers through a structure. Lower values mean better insulation."
  },
  {
    id: 'bricklaying-l3-topic4-2',
    question: "What is a thermal bridge?",
    options: ["Heating element", "Easier heat path", "Heat-conducting brick", "Insulation gap"],
    correctAnswer: "Easier heat path",
    explanation: "A thermal bridge is an area of higher heat flow, often at junctions or penetrations in the insulation."
  },
  {
    id: 'bricklaying-l3-topic4-3',
    question: "What is the role of a vapor barrier in walls?",
    options: ["Block rain", "Block air movement", "Control water vapour", "Add insulation"],
    correctAnswer: "Control water vapour",
    explanation: "Vapor barriers prevent moisture from condensing inside wall layers by limiting vapour movement."
  },
  {
    id: 'bricklaying-l3-topic4-4',
    question: "What are helical ties used for?",
    options: ["Wall decoration", "Masonry reinforcement", "Fixing shelves", "Thermal expansion"],
    correctAnswer: "Masonry reinforcement",
    explanation: "Helical ties strengthen masonry by bridging cracks or connecting brick leaves."
  },
  {
    id: 'bricklaying-l3-topic4-5',
    question: "What defines rainscreen cladding?",
    options: ["Brick coating", "Ventilated wall system", "Rain-harvesting roof", "Water-repelling glass"],
    correctAnswer: "Ventilated wall system",
    explanation: "Rainscreen cladding uses an outer skin with a ventilated cavity to manage moisture."
  },
  {
    id: 'bricklaying-l3-topic4-6',
    question: "What is a super-insulated cavity wall?",
    options: ["Exotic materials", "Wider cavity wall", "Sub-zero wall", "Foam-filled wall"],
    correctAnswer: "Wider cavity wall",
    explanation: "A super-insulated wall uses a wider cavity for thicker insulation and improved thermal performance."
  },
  {
    id: 'bricklaying-l3-topic4-7',
    question: "What is offsite construction for masonry?",
    options: ["Wall built near site", "Factory-made masonry panels", "Remote wall design", "Material storage"],
    correctAnswer: "Factory-made masonry panels",
    explanation: "Masonry panels built in factories allow faster, more controlled on-site installation."
  },
  {
    id: 'bricklaying-l3-topic4-8',
    question: "What is cross-laminated timber (CLT)?",
    options: ["Timber finish for brick", "Timber in brick walls", "Structural wood for cladding", "Masonry alternative"],
    correctAnswer: "Structural wood for cladding",
    explanation: "CLT panels serve as structural walls with brick cladding applied externally."
  },
  {
    id: 'bricklaying-l3-topic4-9',
    question: "What is thin-joint masonry?",
    options: ["Thin bricks", "2–3mm mortar joints", "Decorative jointing", "Thin veneers"],
    correctAnswer: "2–3mm mortar joints",
    explanation: "This technique uses narrow joints and adhesive mortar for quicker builds and better insulation."
  },
  {
    id: 'bricklaying-l3-topic4-10',
    question: "What is the key benefit of AAC blocks?",
    options: ["Nice appearance", "High insulation, low weight", "Fire resistance", "Low cost"],
    correctAnswer: "High insulation, low weight",
    explanation: "AAC blocks are lightweight and provide excellent thermal performance."
  },
  {
    id: 'bricklaying-l3-topic4-11',
    question: "What is Building Information Modelling (BIM)?",
    options: ["Info bricks", "Digital building model", "Material testing", "Compliance system"],
    correctAnswer: "Digital building model",
    explanation: "BIM models buildings digitally to improve design coordination and construction planning."
  },
  {
    id: 'bricklaying-l3-topic4-12',
    question: "What is a pressure-equalised rainscreen?",
    options: ["Mortar control", "Balanced cavity air pressure", "Brick testing", "Even wall pressure"],
    correctAnswer: "Balanced cavity air pressure",
    explanation: "This system matches cavity air pressure to external pressure to reduce water ingress."
  },
  {
    id: 'bricklaying-l3-topic4-13',
    question: "What does thermal mass refer to?",
    options: ["Wall weight", "Stored heat energy", "Wall surface temp", "Energy use"],
    correctAnswer: "Stored heat energy",
    explanation: "Thermal mass helps regulate indoor temperature by absorbing and releasing heat slowly."
  },
  {
    id: 'bricklaying-l3-topic4-14',
    question: "What is vacuum insulation?",
    options: ["Air removal", "Moisture removal", "Ultra-thin high insulation", "Vacuumed mortar joints"],
    correctAnswer: "Ultra-thin high insulation",
    explanation: "Vacuum panels provide very high thermal resistance in minimal thickness for tight spaces."
  },
  {
    id: 'bricklaying-l3-topic4-15',
    question: "What is a phase change material (PCM)?",
    options: ["Brick-to-stone material", "Latent heat storage material", "Colour-changing mortar", "Shape-shifting wall"],
    correctAnswer: "Latent heat storage material",
    explanation: "PCMs store and release heat by changing phase, helping to stabilise indoor temperature."
  },
  {
    id: 'bricklaying-l3-topic4-16',
    question: "What does psi-value measure?",
    options: ["Cold bridge strength", "Heat loss at junctions", "Wall freezing rate", "Ice risk"],
    correctAnswer: "Heat loss at junctions",
    explanation: "Psi-values quantify heat loss through thermal bridges in W/mK."
  },
  {
    id: 'bricklaying-l3-topic4-17',
    question: "What are hygroscopic materials?",
    options: ["Water-repellent", "Vapour-absorbing", "Moisture degrading", "Strengthened by moisture"],
    correctAnswer: "Vapour-absorbing",
    explanation: "Hygroscopic materials absorb and release moisture to help manage internal humidity."
  },
  {
    id: 'bricklaying-l3-topic4-18',
    question: "What is hygrothermal assessment?",
    options: ["Comfort check", "Heating efficiency", "Heat and moisture analysis", "Ventilation check"],
    correctAnswer: "Heat and moisture analysis",
    explanation: "It evaluates how heat and moisture move through wall assemblies to avoid condensation risks."
  },
  {
    id: 'bricklaying-l3-topic4-19',
    question: "What is the Passivhaus standard?",
    options: ["Sun-following house", "Passive cooling design", "Low-energy airtight building", "Fire-safe house"],
    correctAnswer: "Low-energy airtight building",
    explanation: "Passivhaus is a strict low-energy standard with high insulation and air-tightness levels."
  },
  {
    id: 'bricklaying-l3-topic4-20',
    question: "What is dynamic insulation?",
    options: ["Self-changing insulation", "Heat-recovering airflow", "Seasonal adjuster", "Moving insulation"],
    correctAnswer: "Heat-recovering airflow",
    explanation: "Dynamic insulation recovers heat from outgoing air that passes through the insulation layer."
  },
  {
    id: 'bricklaying-l3-topic4-21',
    question: "What does breathability mean in masonry?",
    options: ["Air flow", "Vapour permeability", "Wall expansion", "Oxygen supply"],
    correctAnswer: "Vapour permeability",
    explanation: "Breathable walls allow water vapour to pass through, helping avoid trapped moisture."
  },
  {
    id: 'bricklaying-l3-topic4-22',
    question: "What is a SIP panel?",
    options: ["Anti-static panel", "Interior wall only", "Insulated board with brick cladding", "Cavity insulation"],
    correctAnswer: "Insulated board with brick cladding",
    explanation: "Structural insulated panels provide strength and insulation with optional brick cladding."
  },
  {
    id: 'bricklaying-l3-topic4-23',
    question: "What is Building Performance Evaluation (BPE)?",
    options: ["Brick testing", "Wall strength check", "Post-build performance check", "Aesthetic rating"],
    correctAnswer: "Post-build performance check",
    explanation: "BPE checks how buildings perform after construction against design goals and user needs."
  },
  {
    id: 'bricklaying-l3-topic4-24',
    question: "What is embodied carbon?",
    options: ["Visible carbon", "Stored carbon", "Total emissions from material lifecycle", "Carbon credits"],
    correctAnswer: "Total emissions from material lifecycle",
    explanation: "Embodied carbon includes emissions from manufacturing, transport, and installation."
  },
  {
    id: 'bricklaying-l3-topic4-25',
    question: "What is a life cycle assessment (LCA)?",
    options: ["Durability test", "Maintenance planner", "Environmental impact over life", "Aging test"],
    correctAnswer: "Environmental impact over life",
    explanation: "LCA tracks environmental impact from material production to disposal or recycling."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-building-tech', 'items', q.id), {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      });
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

uploadQuestions();
