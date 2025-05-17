// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2BuildingConstruction.ts

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

// ✅ Joinery Level 2 Building Construction Principles Questions
const questions = [
  {
    id: 'joinery-l2-building-construction1',
    question: "What is the main purpose of a damp-proof course in a wall?",
    options: ["To reduce fire spread", "To improve insulation", "To stop rising moisture", "To support masonry units"],
    correctAnswer: "To stop rising moisture",
    explanation: "A DPC prevents moisture from travelling upward through brick or blockwork by capillary action."
  },
  {
    id: 'joinery-l2-building-construction2',
    question: "Which type of wall has two leaves with a space between them?",
    options: ["Solid wall", "Dry wall", "Cavity wall", "Stud wall"],
    correctAnswer: "Cavity wall",
    explanation: "Cavity walls consist of two skins with a gap that improves insulation and moisture control."
  },
  {
    id: 'joinery-l2-building-construction3',
    question: "Which material is most commonly used for roof trusses in UK homes?",
    options: ["Steel sections", "PVC struts", "Timber frames", "Concrete beams"],
    correctAnswer: "Timber frames",
    explanation: "Timber trusses are standard for domestic roofs due to strength, cost, and ease of handling."
  },
  {
    id: 'joinery-l2-building-construction4',
    question: "What is the standard plasterboard thickness used on internal walls?",
    options: ["6mm", "18mm", "25mm", "12.5mm"],
    correctAnswer: "12.5mm",
    explanation: "12.5mm plasterboard is the most common thickness for lining internal partitions."
  },
  {
    id: 'joinery-l2-building-construction5',
    question: "What does a wall plate do in roof construction?",
    options: ["Improves insulation", "Spreads roof loads", "Stops wind uplift", "Provides wall finish"],
    correctAnswer: "Spreads roof loads",
    explanation: "Wall plates distribute roof loads evenly onto the supporting masonry walls."
  },
  {
    id: 'joinery-l2-building-construction6',
    question: "Why are noggins fitted between floor joists?",
    options: ["Add acoustic control", "Reduce floor bounce", "Stop joist twisting", "Support floorboards"],
    correctAnswer: "Stop joist twisting",
    explanation: "Noggins provide lateral support to prevent joists from rotating under load."
  },
  {
    id: 'joinery-l2-building-construction7',
    question: "What is the minimum headroom over a staircase?",
    options: ["1.6m", "1.9m", "2.0m", "2.2m"],
    correctAnswer: "2.0m",
    explanation: "Building Regulations require a minimum 2.0m headroom to allow safe use of stairs."
  },
  {
    id: 'joinery-l2-building-construction8',
    question: "Which component supports the load above a window opening?",
    options: ["Tie bar", "Lintel", "Joist", "Plinth"],
    correctAnswer: "Lintel",
    explanation: "Lintels span over openings and transfer loads to the walls either side."
  },
  {
    id: 'joinery-l2-building-construction9',
    question: "What is the vertical part of a step called?",
    options: ["Riser", "Tread", "Going", "Nosing"],
    correctAnswer: "Riser",
    explanation: "The riser is the vertical section between two steps on a staircase."
  },
  {
    id: 'joinery-l2-building-construction10',
    question: "What is a purlin used for in roof construction?",
    options: ["Support rafters", "Support ceiling", "Support wall ties", "Support insulation"],
    correctAnswer: "Support rafters",
    explanation: "Purlins are horizontal members that provide intermediate support to rafters."
  },
  {
    id: 'joinery-l2-building-construction11',
    question: "What is the role of a breather membrane in timber frame walls?",
    options: ["Stop all air", "Reflect heat", "Allow vapour out", "Act as finish layer"],
    correctAnswer: "Allow vapour out",
    explanation: "Breather membranes allow internal moisture to escape but block external water."
  },
  {
    id: 'joinery-l2-building-construction12',
    question: "What is the minimum width of a staircase in a house?",
    options: ["600mm", "750mm", "850mm", "1000mm"],
    correctAnswer: "850mm",
    explanation: "Domestic stairs should be at least 850mm wide to meet Building Regulations."
  },
  {
    id: 'joinery-l2-building-construction13',
    question: "What are standard stud spacings in timber partitions?",
    options: ["200mm", "400mm", "900mm", "1200mm"],
    correctAnswer: "400mm",
    explanation: "Studs are commonly spaced at 400mm to suit plasterboard and provide support."
  },
  {
    id: 'joinery-l2-building-construction14',
    question: "What is used to join cavity wall leaves together?",
    options: ["Damp trays", "Wall ties", "Bonding blocks", "Air bricks"],
    correctAnswer: "Wall ties",
    explanation: "Wall ties link the two leaves of cavity walls while keeping them structurally independent."
  },
  {
    id: 'joinery-l2-building-construction15',
    question: "What is the sole plate in timber wall framing?",
    options: ["Top support", "Middle noggin", "Base timber", "Roof beam"],
    correctAnswer: "Base timber",
    explanation: "The sole plate is the horizontal timber at the base of a stud wall to which studs are fixed."
  },
  {
    id: 'joinery-l2-building-construction16',
    question: "Which element channels rainwater from inside a cavity back outside?",
    options: ["Drip edge", "Wall tie", "Cavity tray", "Sill unit"],
    correctAnswer: "Cavity tray",
    explanation: "Cavity trays collect moisture and allow it to exit via weep holes above openings."
  },
  {
    id: 'joinery-l2-building-construction17',
    question: "What is the U-value a measure of?",
    options: ["Moisture rate", "Fire spread", "Heat loss", "Vapour flow"],
    correctAnswer: "Heat loss",
    explanation: "U-values measure how much heat passes through materials — lower is better."
  },
  {
    id: 'joinery-l2-building-construction18',
    question: "What is the horizontal part of a stair step called?",
    options: ["Going", "Riser", "Pitch", "String"],
    correctAnswer: "Going",
    explanation: "The going is the depth of each step, measured from nosing to nosing."
  },
  {
    id: 'joinery-l2-building-construction19',
    question: "What does a trimmer joist do?",
    options: ["Add depth", "Reinforce ceiling", "Surround openings", "Support outer wall"],
    correctAnswer: "Surround openings",
    explanation: "Trimmers are fitted around stairwells or hatches to support shortened joists."
  },
  {
    id: 'joinery-l2-building-construction20',
    question: "What thickness are standard mortar joints in brickwork?",
    options: ["5mm", "8mm", "10mm", "15mm"],
    correctAnswer: "10mm",
    explanation: "Mortar joints are normally 10mm thick to give standard course heights."
  },
  {
    id: 'joinery-l2-building-construction21',
    question: "What is the typical depth of domestic foundations in stable UK soil?",
    options: ["150mm", "300mm", "450mm", "900mm"],
    correctAnswer: "900mm",
    explanation: "A minimum depth of 900mm is required to reach below frost and ensure stability."
  },
  {
    id: 'joinery-l2-building-construction22',
    question: "What does a screed layer do on a floor?",
    options: ["Insulate base", "Add structure", "Level surface", "Block vapour"],
    correctAnswer: "Level surface",
    explanation: "Screeds provide a smooth, level surface for applying floor finishes."
  },
  {
    id: 'joinery-l2-building-construction23',
    question: "What is the main benefit of I-joists over solid joists?",
    options: ["Lower weight", "Higher cost", "Shorter spans", "Less deflection"],
    correctAnswer: "Less deflection",
    explanation: "I-joists span greater distances without sagging compared to solid timber joists."
  },
  {
    id: 'joinery-l2-building-construction24',
    question: "What is the function of a gable ladder in roof construction?",
    options: ["Insulate loft", "Support tiles", "Extend rafters", "Support gable wall"],
    correctAnswer: "Extend rafters",
    explanation: "Gable ladders support the roof overhang at gable ends and extend rafter lines."
  },
  {
    id: 'joinery-l2-building-construction25',
    question: "What is a damp-proof membrane used for in floors?",
    options: ["Resist fire", "Stop moisture", "Improve strength", "Create slope"],
    correctAnswer: "Stop moisture",
    explanation: "DPMs prevent ground moisture rising into concrete floor slabs."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-building-construction', 'items', q.id), {
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

// Execute the upload function
uploadQuestions();
