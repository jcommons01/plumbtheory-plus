// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BuildingRegs.ts

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

// ✅ Rewritten Questions: Bricklaying Level 2 – Building Regulations
const questions = [
  {
    id: 'bricklaying-l2-building-regs1',
    question: "What is the main purpose of the Building Regulations?",
    options: ["To improve design", "To speed up work", "To ensure safety", "To decorate homes"],
    correctAnswer: "To ensure safety",
    explanation: "Building Regulations ensure construction meets safety, health, and energy standards."
  },
  {
    id: 'bricklaying-l2-building-regs2',
    question: "How high must a DPC be above ground?",
    options: ["75mm", "100mm", "150mm", "200mm"],
    correctAnswer: "150mm",
    explanation: "The DPC must sit at least 150mm above ground to block rising damp."
  },
  {
    id: 'bricklaying-l2-building-regs3',
    question: "Which part covers moisture control?",
    options: ["Part B", "Part C", "Part D", "Part E"],
    correctAnswer: "Part C",
    explanation: "Part C deals with moisture resistance and ground preparation."
  },
  {
    id: 'bricklaying-l2-building-regs4',
    question: "Why is a DPC used?",
    options: ["To block damp", "To hold bricks", "To fix insulation", "To aid airflow"],
    correctAnswer: "To block damp",
    explanation: "DPC stops water from rising through the wall by capillary action."
  },
  {
    id: 'bricklaying-l2-building-regs5',
    question: "What does a cavity tray do?",
    options: ["Blocks heat loss", "Supports ties", "Catches water", "Holds bricks"],
    correctAnswer: "Catches water",
    explanation: "Cavity trays collect water and redirect it through weep holes."
  },
  {
    id: 'bricklaying-l2-building-regs6',
    question: "Minimum width of a new cavity wall?",
    options: ["25mm", "40mm", "50mm", "75mm"],
    correctAnswer: "50mm",
    explanation: "A 50mm cavity avoids moisture bridging and allows insulation."
  },
  {
    id: 'bricklaying-l2-building-regs7',
    question: "What is a cold bridge?",
    options: ["Gap in plaster", "Loose wall tie", "Heat escape path", "Window gap"],
    correctAnswer: "Heat escape path",
    explanation: "Cold bridges let heat bypass insulation and reduce efficiency."
  },
  {
    id: 'bricklaying-l2-building-regs8',
    question: "What does Part A cover?",
    options: ["Fire safety", "Wall insulation", "Drainage", "Structure"],
    correctAnswer: "Structure",
    explanation: "Part A ensures the structure can support loads safely."
  },
  {
    id: 'bricklaying-l2-building-regs9',
    question: "Why install weep holes?",
    options: ["Support ties", "Block pests", "Drain water", "Improve sound"],
    correctAnswer: "Drain water",
    explanation: "Weep holes let water escape from the cavity."
  },
  {
    id: 'bricklaying-l2-building-regs10',
    question: "Good DPC material?",
    options: ["Lime mortar", "Brick slips", "Bitumen sheet", "Insulation board"],
    correctAnswer: "Bitumen sheet",
    explanation: "Bitumen polymer is waterproof and flexible for DPC use."
  },
  {
    id: 'bricklaying-l2-building-regs11',
    question: "Part E is about?",
    options: ["Sound", "Gas", "Fire", "Damp"],
    correctAnswer: "Sound",
    explanation: "Part E ensures noise insulation between rooms and homes."
  },
  {
    id: 'bricklaying-l2-building-regs12',
    question: "Which DPC is used around windows?",
    options: ["None", "Vertical only", "Horizontal only", "Both types"],
    correctAnswer: "Both types",
    explanation: "Use both horizontal and vertical DPCs around openings."
  },
  {
    id: 'bricklaying-l2-building-regs13',
    question: "Fire safety is covered in?",
    options: ["Part A", "Part B", "Part C", "Part D"],
    correctAnswer: "Part B",
    explanation: "Part B includes fire resistance, exits, and stopping."
  },
  {
    id: 'bricklaying-l2-building-regs14',
    question: "Where are cavity barriers needed?",
    options: ["At openings", "Under floors", "Beside lintels", "Above ceilings"],
    correctAnswer: "At openings",
    explanation: "Barriers prevent fire spread at openings and edges."
  },
  {
    id: 'bricklaying-l2-building-regs15',
    question: "Strongest mortar mix below DPC?",
    options: ["(v)", "(iv)", "(iii)", "(i)"],
    correctAnswer: "(i)",
    explanation: "Designation (i) is a 1:3 mix, ideal for below-DPC conditions."
  },
  {
    id: 'bricklaying-l2-building-regs16',
    question: "Why install trays over lintels?",
    options: ["Add insulation", "Catch rainwater", "Support bricks", "Seal windows"],
    correctAnswer: "Catch rainwater",
    explanation: "Cavity trays redirect rainwater from over openings."
  },
  {
    id: 'bricklaying-l2-building-regs17',
    question: "What reduces cold bridging in ties?",
    options: ["Extra mortar", "Plastic coat", "Steel type", "Wider gap"],
    correctAnswer: "Steel type",
    explanation: "Stainless steel ties conduct less heat than galvanised."
  },
  {
    id: 'bricklaying-l2-building-regs18',
    question: "What is rising damp?",
    options: ["Rain leaks", "Steam indoors", "Water moving upward", "Condensation"],
    correctAnswer: "Water moving upward",
    explanation: "Moisture from the ground rises through brickwork without DPC."
  },
  {
    id: 'bricklaying-l2-building-regs19',
    question: "What is Part K about?",
    options: ["Falls", "Damp", "Gas", "Noise"],
    correctAnswer: "Falls",
    explanation: "Part K protects against falling or impact near openings and stairs."
  },
  {
    id: 'bricklaying-l2-building-regs20',
    question: "Tanking is used for?",
    options: ["Basements", "Pitched roofs", "Timber decks", "Lofts"],
    correctAnswer: "Basements",
    explanation: "Tanking provides full waterproofing below ground."
  },
  {
    id: 'bricklaying-l2-building-regs21',
    question: "How should DPC meet DPM?",
    options: ["Gap by 150mm", "Overlap", "Separate", "Lap halfway"],
    correctAnswer: "Overlap",
    explanation: "They should overlap to form a continuous barrier."
  },
  {
    id: 'bricklaying-l2-building-regs22',
    question: "Why use cavity closers?",
    options: ["Hold bricks", "Insulate reveals", "Fix trays", "Vent cavities"],
    correctAnswer: "Insulate reveals",
    explanation: "Closers block air and damp around openings."
  },
  {
    id: 'bricklaying-l2-building-regs23',
    question: "Minimum cavity wall thickness for two-storey home?",
    options: ["150mm", "200mm", "250mm", "300mm"],
    correctAnswer: "250mm",
    explanation: "250mm allows for both leaves and a minimum 50mm cavity."
  },
  {
    id: 'bricklaying-l2-building-regs24',
    question: "What does a weep vent allow?",
    options: ["Fix bricks", "Support trays", "Let water out", "Seal gaps"],
    correctAnswer: "Let water out",
    explanation: "Weep vents let water escape and allow airflow."
  },
  {
    id: 'bricklaying-l2-building-regs25',
    question: "Fire resistance for walls between homes?",
    options: ["20 mins", "30 mins", "60 mins", "90 mins"],
    correctAnswer: "60 mins",
    explanation: "Compartment walls need at least 60 minutes of fire resistance."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-building-regs', 'items', q.id), {
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
