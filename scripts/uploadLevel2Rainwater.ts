// ✅ COMPLETE: scripts/uploadLevel2Rainwater.ts with 25 Level 2 questions
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

const questions = [
  {
    id: 'level2rain1',
    topic: 'level2-rainwater',
    question: "What is the main purpose of a rainwater system on a building?",
    options: ["Supply drinking water", "Drain surface water", "Control pressure", "Ventilate the loft"],
    correctAnswer: "Drain surface water",
    explanation: "Rainwater systems collect and direct surface water safely away from the building."
  },
  {
    id: 'level2rain2',
    topic: 'level2-rainwater',
    question: "Which component collects rainwater from the roof?",
    options: ["Downpipe", "Gutter", "Drain", "Shoe"],
    correctAnswer: "Gutter",
    explanation: "Gutters collect rainwater from roof edges and direct it to downpipes."
  },
  {
    id: 'level2rain3',
    topic: 'level2-rainwater',
    question: "What is the standard minimum diameter of a downpipe?",
    options: ["50mm", "63mm", "68mm", "75mm"],
    correctAnswer: "68mm",
    explanation: "68mm is a common minimum diameter for residential downpipes in the UK."
  },
  {
    id: 'level2rain4',
    topic: 'level2-rainwater',
    question: "Which fitting is used at the base of a downpipe to direct water away?",
    options: ["Branch", "Shoes", "Clips", "Tee"],
    correctAnswer: "Shoes",
    explanation: "A downpipe shoe diverts water from the pipe base to the surface drain."
  },
  {
    id: 'level2rain5',
    topic: 'level2-rainwater',
    question: "What is the recommended minimum fall for gutters?",
    options: ["1:100", "1:200", "1:600", "1:40"],
    correctAnswer: "1:600",
    explanation: "The minimum recommended fall is 1:600 to ensure self-cleansing flow."
  },
  {
    id: 'level2rain6',
    topic: 'level2-rainwater',
    question: "Which material is NOT commonly used for domestic rainwater gutters?",
    options: ["PVC", "Aluminium", "Cast iron", "Lead"],
    correctAnswer: "Lead",
    explanation: "Lead is not typically used for gutters due to cost and weight."
  },
  {
    id: 'level2rain7',
    topic: 'level2-rainwater',
    question: "What causes rainwater to overflow from a gutter?",
    options: ["Too much fall", "Incorrect paint", "Blockage or poor fall", "Ventilation"],
    correctAnswer: "Blockage or poor fall",
    explanation: "Leaves, debris, or poor gradient can stop water flow and cause overflow."
  },
  {
    id: 'level2rain8',
    topic: 'level2-rainwater',
    question: "Which regulation covers rainwater drainage in buildings?",
    options: ["Part G", "Part H", "Part L", "Part M"],
    correctAnswer: "Part H",
    explanation: "Part H of Building Regulations covers drainage including rainwater."
  },
  {
    id: 'level2rain9',
    topic: 'level2-rainwater',
    question: "What tool is used to check gutter level during installation?",
    options: ["Pipe cutter", "Laser level", "Spirit level", "Pressure gauge"],
    correctAnswer: "Spirit level",
    explanation: "Spirit levels help ensure proper fall when fitting rainwater gutters."
  },
  {
    id: 'level2rain10',
    topic: 'level2-rainwater',
    question: "Where should the gutter outlet be located?",
    options: ["At the high end", "In the middle", "At the low end", "Anywhere"],
    correctAnswer: "At the low end",
    explanation: "Water flows toward the outlet, which should be at the lowest point."
  },
  {
    id: 'level2rain11',
    topic: 'level2-rainwater',
    question: "How are gutters usually joined together?",
    options: ["Glue", "Rubber couplings", "Clips and seals", "Screws"],
    correctAnswer: "Clips and seals",
    explanation: "Most modern gutters use clip fittings with rubber seals to prevent leaks."
  },
  {
    id: 'level2rain12',
    topic: 'level2-rainwater',
    question: "What is the minimum distance between gutter brackets?",
    options: ["1000mm", "800mm", "600mm", "400mm"],
    correctAnswer: "800mm",
    explanation: "Gutter brackets are commonly spaced at 800mm intervals to support loads."
  },
  {
    id: 'level2rain13',
    topic: 'level2-rainwater',
    question: "Which type of joint allows for gutter expansion and contraction?",
    options: ["Butt joint", "Socket joint", "Expansion joint", "Union joint"],
    correctAnswer: "Expansion joint",
    explanation: "Expansion joints accommodate thermal movement in long gutter runs."
  },
  {
    id: 'level2rain14',
    topic: 'level2-rainwater',
    question: "What is the risk if rainwater is not properly drained from a roof?",
    options: ["Reduced heating", "Mould and structural damage", "Airlock", "Noise issues"],
    correctAnswer: "Mould and structural damage",
    explanation: "Poor drainage can cause damp, leaks, and structural deterioration."
  },
  {
    id: 'level2rain15',
    topic: 'level2-rainwater',
    question: "Which fitting is used to collect water at roof valleys?",
    options: ["Union", "Gutter hopper", "Rain cap", "Branch"],
    correctAnswer: "Gutter hopper",
    explanation: "Hoppers collect water from multiple sources and direct it into the downpipe."
  },
  {
    id: 'level2rain16',
    topic: 'level2-rainwater',
    question: "What is the main purpose of a leaf guard in gutters?",
    options: ["Trap water", "Stop birds nesting", "Prevent blockages", "Divert overflow"],
    correctAnswer: "Prevent blockages",
    explanation: "Leaf guards stop leaves and debris from clogging the system."
  },
  {
    id: 'level2rain17',
    topic: 'level2-rainwater',
    question: "Which tool would you use to cut plastic guttering?",
    options: ["Pipe cutter", "Junior hacksaw", "Bolt croppers", "Angle grinder"],
    correctAnswer: "Junior hacksaw",
    explanation: "A junior hacksaw is ideal for clean, accurate cuts on plastic gutters."
  },
  {
    id: 'level2rain18',
    topic: 'level2-rainwater',
    question: "Which surface water fitting is typically connected to the downpipe?",
    options: ["Rodding eye", "Inspection chamber", "Gully trap", "Air admittance valve"],
    correctAnswer: "Gully trap",
    explanation: "Gullies collect and direct rainwater from downpipes into drains."
  },
  {
    id: 'level2rain19',
    topic: 'level2-rainwater',
    question: "What colour are standard PVCu rainwater fittings?",
    options: ["White only", "Black, white, or grey", "Red", "Copper"],
    correctAnswer: "Black, white, or grey",
    explanation: "Rainwater systems are available in various neutral colours for aesthetics."
  },
  {
    id: 'level2rain20',
    topic: 'level2-rainwater',
    question: "Which part connects a half-round gutter to a square downpipe?",
    options: ["Adapter", "Elbow", "Boss", "Shoe"],
    correctAnswer: "Adapter",
    explanation: "Adapters are used to transition between different profiles or sizes."
  },
  {
    id: 'level2rain21',
    topic: 'level2-rainwater',
    question: "What should be checked before fixing a gutter to fascia board?",
    options: ["Humidity", "Sun direction", "Bracket spacing and alignment", "Paint thickness"],
    correctAnswer: "Bracket spacing and alignment",
    explanation: "Correct bracket spacing ensures support and correct fall of the gutter."
  },
  {
    id: 'level2rain22',
    topic: 'level2-rainwater',
    question: "Why is regular inspection of rainwater systems important?",
    options: ["Check colours", "Ensure thermal expansion", "Prevent blockage and leaks", "Polish surfaces"],
    correctAnswer: "Prevent blockage and leaks",
    explanation: "Regular checks ensure flow is maintained and damage is caught early."
  },
  {
    id: 'level2rain23',
    topic: 'level2-rainwater',
    question: "Where should the first gutter bracket be installed?",
    options: ["In the centre", "At the outlet point", "On the hip", "Next to the soffit"],
    correctAnswer: "At the outlet point",
    explanation: "Starting at the outlet ensures the fall is built correctly from the lowest point."
  },
  {
    id: 'level2rain24',
    topic: 'level2-rainwater',
    question: "What does a union bracket do?",
    options: ["Seal pipe end", "Support hopper", "Join gutter sections", "Secure brackets"],
    correctAnswer: "Join gutter sections",
    explanation: "Union brackets securely connect two sections of guttering."
  },
  {
    id: 'level2rain25',
    topic: 'level2-rainwater',
    question: "How can ice damage be reduced in gutters during winter?",
    options: ["Paint them black", "Use wider gutters", "Clear debris and ensure slope", "Install foam"],
    correctAnswer: "Clear debris and ensure slope",
    explanation: "Proper cleaning and slope reduce standing water that can freeze and cause damage."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-rainwater', 'items', q.id), {
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
