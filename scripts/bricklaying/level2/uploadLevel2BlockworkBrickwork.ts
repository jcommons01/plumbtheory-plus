// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BlockworkBrickwork.ts

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

// ✅ Bricklaying Level 2 – Blockwork, Brickwork & Cavity Walls (Balanced Answers)
const questions = [
  {
    id: 'bricklaying-l2-blockwork-cavity1',
    question: "What is the main reason for using cavity wall construction?",
    options: ["To enhance looks", "To use fewer bricks", "To resist damp and heat loss", "To lay bricks faster"],
    correctAnswer: "To resist damp and heat loss",
    explanation: "Cavity walls reduce heat loss and stop moisture reaching the inner leaf."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity2',
    question: "What do wall ties do in a cavity wall?",
    options: ["Fix boards", "Join leaves", "Seal joints", "Hold panels"],
    correctAnswer: "Join leaves",
    explanation: "Wall ties connect both leaves while allowing the cavity to function correctly."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity3',
    question: "What is the standard minimum width for a wall cavity?",
    options: ["25mm", "35mm", "50mm", "75mm"],
    correctAnswer: "50mm",
    explanation: "50mm is the standard minimum to prevent moisture bridging and allow insulation."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity4',
    question: "What does a cold bridge allow?",
    options: ["Heat loss", "Moisture in", "Brick cracks", "Tie failure"],
    correctAnswer: "Heat loss",
    explanation: "Cold bridges allow heat to bypass insulation, reducing energy efficiency."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity5',
    question: "What are weep holes for?",
    options: ["Air flow", "Fixing ties", "Water escape", "Extra light"],
    correctAnswer: "Water escape",
    explanation: "Weep holes drain water from the cavity to prevent internal damp."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity6',
    question: "Where should vertical DPC be placed?",
    options: ["Above lintel", "On wall face", "Behind frame", "Near glass"],
    correctAnswer: "Behind frame",
    explanation: "Placing the DPC 25mm behind prevents water tracking toward the inner wall."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity7',
    question: "What is the typical spacing for wall ties?",
    options: ["225×150mm", "450×150mm", "600×300mm", "900×450mm"],
    correctAnswer: "900×450mm",
    explanation: "Wall ties are spaced at 900mm horizontally and 450mm vertically in a staggered pattern."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity8',
    question: "What is the most common inner leaf material?",
    options: ["Clay bricks", "Limestone", "Concrete blocks", "Glass tiles"],
    correctAnswer: "Concrete blocks",
    explanation: "Concrete blocks are cost-effective, fast to lay, and offer good thermal performance."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity9',
    question: "What is a cavity barrier used for?",
    options: ["Fire stop", "Tie hold", "Joint seal", "Brick spacer"],
    correctAnswer: "Fire stop",
    explanation: "Cavity barriers stop the spread of fire and smoke inside cavities."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity10',
    question: "What is the function of a cavity tray?",
    options: ["Hold ties", "Keep air in", "Drain water", "Stop heat loss"],
    correctAnswer: "Drain water",
    explanation: "Cavity trays redirect moisture out through weep holes above openings."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity11',
    question: "Which bond has only stretchers in each course?",
    options: ["Header", "English", "Stretcher", "Flemish"],
    correctAnswer: "Stretcher",
    explanation: "Stretcher bond uses only the long face of each brick in every course."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity12',
    question: "Which bond is common for outer walls?",
    options: ["Stack", "Stretcher", "Flemish", "English"],
    correctAnswer: "Stretcher",
    explanation: "Stretcher bond is simple, cost-effective, and ideal for cavity walls."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity13',
    question: "What is a snap header used for?",
    options: ["Seal ties", "Fix DPC", "Bond corners", "Add design"],
    correctAnswer: "Bond corners",
    explanation: "Snap headers (half bricks) help maintain the bond at corners and returns."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity14',
    question: "What is a perpend joint?",
    options: ["Top joint", "Side joint", "Sloped joint", "Vertical joint"],
    correctAnswer: "Vertical joint",
    explanation: "Perpend joints are the vertical mortar joints between bricks in the same course."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity15',
    question: "What is a brick slip?",
    options: ["Thin brick", "Strong brick", "Shaped brick", "Joint tool"],
    correctAnswer: "Thin brick",
    explanation: "A brick slip is a thin brick piece used to create a brick look on concrete or block surfaces."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity16',
    question: "Why use blocks for the inner wall?",
    options: ["They're faster", "They're stronger", "They look better", "They need less mortar"],
    correctAnswer: "They're faster",
    explanation: "Blocks are large, making inner leaf construction faster and more economical."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity17',
    question: "How should DPC be finished?",
    options: ["Folded out", "Turned in", "Cut flat", "Taped up"],
    correctAnswer: "Turned in",
    explanation: "Turning the DPC into the cavity helps stop moisture reaching the inner wall."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity18',
    question: "How should cavity walls be built?",
    options: ["Outer first", "Inner first", "Both together", "In dry runs"],
    correctAnswer: "Both together",
    explanation: "Both leaves should rise together to ensure proper wall tie placement and stability."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity19',
    question: "What does a cavity closer do?",
    options: ["Seal gaps", "Hold ties", "Block rain", "Join bricks"],
    correctAnswer: "Seal gaps",
    explanation: "Cavity closers insulate and seal gaps at windows and door openings."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity20',
    question: "Why avoid mortar in cavities?",
    options: ["It stains", "It blocks air", "It traps heat", "It bridges damp"],
    correctAnswer: "It bridges damp",
    explanation: "Mortar build-up can allow water to cross the cavity and cause damp."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity21',
    question: "Which block is used below DPC?",
    options: ["Dense concrete", "Lightweight foam", "Aerated clay", "Pressed brick"],
    correctAnswer: "Dense concrete",
    explanation: "Dense concrete blocks are strong and resist moisture below the DPC line."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity22',
    question: "What is the required lap for vertical DPCs?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "100mm",
    explanation: "A 100mm lap ensures proper overlap and water tightness at openings."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity23',
    question: "What is the UK standard block size?",
    options: ["300x200x100", "600x300x150", "440x215x100", "215x102x65"],
    correctAnswer: "440x215x100",
    explanation: "440 × 215 × 100mm is the common block size for UK wall construction."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity24',
    question: "What is toothing?",
    options: ["Joint shape", "Air brick type", "Stepped end", "Movement gap"],
    correctAnswer: "Stepped end",
    explanation: "Toothing creates a staggered end so future brickwork can tie in."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity25',
    question: "What is a bell-cast detail for?",
    options: ["Support ties", "Hold cladding", "Shed water", "Block fire"],
    correctAnswer: "Shed water",
    explanation: "Bell-cast or mastiek pointing sheds water away from foundations to stop damp."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-blockwork-cavity', 'items', q.id), {
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
