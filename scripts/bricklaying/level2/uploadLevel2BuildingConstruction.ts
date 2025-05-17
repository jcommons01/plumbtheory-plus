// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BuildingConstruction.ts

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// ✅ Firebase Configuration
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

// ✅ Rewritten with balanced options – Building Construction Principles
const questions = [
  {
    id: 'bricklaying-l2-building-construction1',
    question: "What is the main purpose of a building foundation?",
    options: ["Distributes wall load", "Supports internal floors", "Protects wall finish", "Prevents rising damp"],
    correctAnswer: "Distributes wall load",
    explanation: "Foundations spread the weight of the building safely into the ground to prevent settlement.",
  },
  {
    id: 'bricklaying-l2-building-construction2',
    question: "What best describes a strip foundation?",
    options: ["Shallow trench of concrete", "Timber joist support", "Row of paving stones", "Wall cavity fill"],
    correctAnswer: "Shallow trench of concrete",
    explanation: "Strip foundations are concrete trenches placed under load-bearing walls.",
  },
  {
    id: 'bricklaying-l2-building-construction3',
    question: "What is the role of a cavity in walls?",
    options: ["Blocks heat & damp", "Adds wall strength", "Supports roof load", "Allows room airflow"],
    correctAnswer: "Blocks heat & damp",
    explanation: "Cavities help insulation and prevent rain from reaching the inner leaf.",
  },
  {
    id: 'bricklaying-l2-building-construction4',
    question: "Minimum cavity width in UK housing?",
    options: ["50mm", "25mm", "10mm", "75mm"],
    correctAnswer: "50mm",
    explanation: "Modern cavities are at least 50mm to avoid moisture bridging.",
  },
  {
    id: 'bricklaying-l2-building-construction5',
    question: "What does a DPC prevent?",
    options: ["Rising damp", "Wall cracks", "Window leaks", "Condensation"],
    correctAnswer: "Rising damp",
    explanation: "DPC blocks moisture from the ground soaking into walls.",
  },
  {
    id: 'bricklaying-l2-building-construction6',
    question: "Why use wall ties in cavity walls?",
    options: ["Join wall leaves", "Fix insulation", "Hold joists", "Stop windows moving"],
    correctAnswer: "Join wall leaves",
    explanation: "Wall ties link the inner and outer leaves while allowing some movement.",
  },
  {
    id: 'bricklaying-l2-building-construction7',
    question: "Standard vertical spacing for wall ties?",
    options: ["450mm", "150mm", "225mm", "75mm"],
    correctAnswer: "450mm",
    explanation: "Wall ties are spaced 450mm vertically and 900mm horizontally.",
  },
  {
    id: 'bricklaying-l2-building-construction8',
    question: "What is a thermal bridge?",
    options: ["Heat loss path", "Wall feature", "Cold air duct", "Pipe insulation"],
    correctAnswer: "Heat loss path",
    explanation: "Thermal bridges bypass insulation and waste energy.",
  },
  {
    id: 'bricklaying-l2-building-construction9',
    question: "Purpose of a lintel above openings?",
    options: ["Support masonry", "Fix windows", "Add light", "Hold insulation"],
    correctAnswer: "Support masonry",
    explanation: "Lintels carry the load above doors and windows.",
  },
  {
    id: 'bricklaying-l2-building-construction10',
    question: "Standard steel lintel bearing?",
    options: ["150mm", "100mm", "200mm", "120mm"],
    correctAnswer: "150mm",
    explanation: "Lintels must rest 150mm on each side to bear the load safely.",
  },
  {
    id: 'bricklaying-l2-building-construction11',
    question: "Use of honeycomb brickwork?",
    options: ["Airflow", "Decoration", "Insulation", "Load-bearing"],
    correctAnswer: "Airflow",
    explanation: "Honeycomb openings allow ventilation in floor voids.",
  },
  {
    id: 'bricklaying-l2-building-construction12',
    question: "What is a soldier course?",
    options: ["Bricks on end", "Row of headers", "Stacked bond", "Upright stretchers"],
    correctAnswer: "Bricks on end",
    explanation: "Soldier course bricks stand vertically for decoration.",
  },
  {
    id: 'bricklaying-l2-building-construction13',
    question: "What is a perpend in bonding?",
    options: ["Vertical joint", "Cavity gap", "Mortar face", "Tray junction"],
    correctAnswer: "Vertical joint",
    explanation: "Perpends are vertical mortar joints between bricks.",
  },
  {
    id: 'bricklaying-l2-building-construction14',
    question: "Why are expansion joints needed?",
    options: ["Prevent cracks", "Bond corners", "Fix pipes", "Hold insulation"],
    correctAnswer: "Prevent cracks",
    explanation: "They allow movement from temperature change or shrinkage.",
  },
  {
    id: 'bricklaying-l2-building-construction15',
    question: "Expansion joints spacing?",
    options: ["9–12m", "6–8m", "15–18m", "20–25m"],
    correctAnswer: "9–12m",
    explanation: "Spacing limits cracking in long masonry runs.",
  },
  {
    id: 'bricklaying-l2-building-construction16',
    question: "What is a sleeper wall?",
    options: ["Supports joists", "Holds windows", "Stops damp", "Cavity seal"],
    correctAnswer: "Supports joists",
    explanation: "Sleeper walls hold suspended floors.",
  },
  {
    id: 'bricklaying-l2-building-construction17',
    question: "What does 'curing' concrete mean?",
    options: ["Keeps it moist", "Adds paint", "Removes air", "Levels surface"],
    correctAnswer: "Keeps it moist",
    explanation: "Curing helps concrete gain full strength.",
  },
  {
    id: 'bricklaying-l2-building-construction18',
    question: "Purpose of a wall plate?",
    options: ["Hold roof timbers", "Carry lights", "Seal windows", "Top trim"],
    correctAnswer: "Hold roof timbers",
    explanation: "Wall plates fix rafters or trusses to the wall top.",
  },
  {
    id: 'bricklaying-l2-building-construction19',
    question: "Why use weep holes?",
    options: ["Drain cavity", "Fix scaffold", "Add airflow", "Seal windows"],
    correctAnswer: "Drain cavity",
    explanation: "They let moisture escape to prevent damp.",
  },
  {
    id: 'bricklaying-l2-building-construction20',
    question: "What is a corbel?",
    options: ["Stepped brick ledge", "Brick with holes", "Lintel bracket", "Angled mortar"],
    correctAnswer: "Stepped brick ledge",
    explanation: "Corbelling steps bricks out for decoration or support.",
  },
  {
    id: 'bricklaying-l2-building-construction21',
    question: "What is a reveal?",
    options: ["Side of a frame", "Top trim", "Roof corner", "Wall bracket"],
    correctAnswer: "Side of a frame",
    explanation: "Reveals are between the window/door frame and outer wall.",
  },
  {
    id: 'bricklaying-l2-building-construction22',
    question: "What is efflorescence?",
    options: ["Salt on surface", "Cleaning product", "Damp barrier", "Cracked brick"],
    correctAnswer: "Salt on surface",
    explanation: "It’s white salts left by moisture on bricks.",
  },
  {
    id: 'bricklaying-l2-building-construction23',
    question: "What is a quoin?",
    options: ["Outer wall corner", "Window sill", "Expansion gap", "Joint detail"],
    correctAnswer: "Outer wall corner",
    explanation: "A quoin is the external corner of a building.",
  },
  {
    id: 'bricklaying-l2-building-construction24',
    question: "Role of brick ties in veneer walls?",
    options: ["Fix face to frame", "Support trusses", "Bond insulation", "Hold scaffold"],
    correctAnswer: "Fix face to frame",
    explanation: "Brick ties anchor facing bricks to the backing wall.",
  },
  {
    id: 'bricklaying-l2-building-construction25',
    question: "What does an airbrick provide?",
    options: ["Ventilation", "DPC seal", "Lintel hold", "Decor detail"],
    correctAnswer: "Ventilation",
    explanation: "Airbricks let air circulate under floors or in cavities.",
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-building-construction', 'items', q.id), {
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

// 🚀 Run the upload
uploadQuestions();
