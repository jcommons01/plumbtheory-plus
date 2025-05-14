// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2TimberTechnology.ts

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

// ✅ Joinery Level 2 Timber Technology Questions (edited)
const questions = [
  {
    id: 'joinery-l2-timber-technology1',
    question: "What is the difference between softwood and hardwood?",
    options: ["Softwoods are always softer", "Softwoods are lighter in colour", "Softwoods come from evergreen trees", "Softwoods are always cheaper"],
    correctAnswer: "Softwoods come from evergreen trees",
    explanation: "Softwoods are from conifers; hardwoods from deciduous trees. Not based on actual hardness."
  },
  {
    id: 'joinery-l2-timber-technology2',
    question: "What does 'moisture content' mean in timber?",
    options: ["Water used in processing", "Weight of sap inside timber", "Humidity of storage area", "Water weight versus dry weight"],
    correctAnswer: "Water weight versus dry weight",
    explanation: "Moisture content is water weight divided by dry timber weight, expressed as a percentage."
  },
  {
    id: 'joinery-l2-timber-technology3',
    question: "What is meant by 'quarter-sawn' timber?",
    options: ["Cut into four pieces", "Sawn perpendicular to growth rings", "Dried a quarter of time", "Costs a quarter of price"],
    correctAnswer: "Sawn perpendicular to growth rings",
    explanation: "Quarter-sawn timber has rings nearly 90° to the face. Improves stability and appearance."
  },
  {
    id: 'joinery-l2-timber-technology4',
    question: "Why is timber kiln dried?",
    options: ["Make timber lighter", "Control insect issues", "Improve natural colour", "Reduce moisture under control"],
    correctAnswer: "Reduce moisture under control",
    explanation: "Kiln drying ensures consistent and controlled reduction of timber moisture content."
  },
  {
    id: 'joinery-l2-timber-technology5',
    question: "Which is NOT a natural timber defect?",
    options: ["Splits", "Shakes", "Knots", "Lamination"],
    correctAnswer: "Lamination",
    explanation: "Lamination is a manufactured product, not a natural defect found in timber."
  },
  {
    id: 'joinery-l2-timber-technology6',
    question: "Why is timber graded?",
    options: ["To sort by colour", "To know tree age", "To assess strength and appearance", "To track forest source"],
    correctAnswer: "To assess strength and appearance",
    explanation: "Grading ensures timber meets strength and aesthetic requirements for construction."
  },
  {
    id: 'joinery-l2-timber-technology7',
    question: "How does MDF differ from plywood?",
    options: ["MDF is waterproof", "Same material, different names", "Plywood is imported", "MDF uses fibres, plywood uses veneers"],
    correctAnswer: "MDF uses fibres, plywood uses veneers",
    explanation: "Plywood is layered veneer sheets. MDF is pressed wood fibres with resin."
  },
  {
    id: 'joinery-l2-timber-technology8',
    question: "Why season timber?",
    options: ["To enhance flavour", "Change timber colour", "Reduce moisture for stability", "Fire resistance"],
    correctAnswer: "Reduce moisture for stability",
    explanation: "Seasoning reduces moisture to limit movement after manufacturing."
  },
  {
    id: 'joinery-l2-timber-technology9',
    question: "What does FSC certification show?",
    options: ["Prevents warping", "Waterproofed timber", "Insect treated", "Responsibly sourced forests"],
    correctAnswer: "Responsibly sourced forests",
    explanation: "FSC ensures timber is from environmentally and socially responsible forests."
  },
  {
    id: 'joinery-l2-timber-technology10',
    question: "What is 'shrinkage and swelling'?",
    options: ["Expansion joints", "Warping over time", "Moisture-driven grain movement", "Seasonal timber change"],
    correctAnswer: "Moisture-driven grain movement",
    explanation: "Moisture changes cause timber to expand or shrink across the grain."
  },
  {
    id: 'joinery-l2-timber-technology11',
    question: "What is 'heartwood'?",
    options: ["Old central wood", "Grain with heart shape", "Expensive timber section", "Outer trunk layers"],
    correctAnswer: "Old central wood",
    explanation: "Heartwood is the non-living, central core of mature trees."
  },
  {
    id: 'joinery-l2-timber-technology12',
    question: "Which wood suits external UK joinery?",
    options: ["Maple", "Pine", "Beech", "Oak"],
    correctAnswer: "Oak",
    explanation: "Oak is durable and ideal for outdoor applications in the UK climate."
  },
  {
    id: 'joinery-l2-timber-technology13',
    question: "Why use preservative treatments?",
    options: ["To colour timber", "To lighten timber", "To increase strength", "To prevent fungal and insect damage"],
    correctAnswer: "To prevent fungal and insect damage",
    explanation: "Treatments help timber resist decay and infestation."
  },
  {
    id: 'joinery-l2-timber-technology14',
    question: "Why use glulam over solid timber?",
    options: ["Never needs finish", "Waterproof material", "Long spans with fewer defects", "Always cheaper"],
    correctAnswer: "Long spans with fewer defects",
    explanation: "Glulam offers strength, shape flexibility, and fewer natural flaws."
  },
  {
    id: 'joinery-l2-timber-technology15',
    question: "Best sawing method for stable timber?",
    options: ["Tangential", "Boxed heart", "Plain sawing", "Quarter sawing"],
    correctAnswer: "Quarter sawing",
    explanation: "Quarter sawing improves timber stability and visual appeal."
  },
  {
    id: 'joinery-l2-timber-technology16',
    question: "What is 'book matching'?",
    options: ["Timber grading system", "Storing timber samples", "Pattern created from veneer pairs", "Reading about timber"],
    correctAnswer: "Pattern created from veneer pairs",
    explanation: "Veneer leaves are mirrored to create a repeating pattern."
  },
  {
    id: 'joinery-l2-timber-technology17',
    question: "Why use frame-and-panel doors?",
    options: ["For decoration", "To use less timber", "To reduce weight", "To manage wood movement"],
    correctAnswer: "To manage wood movement",
    explanation: "Frame-and-panel builds allow timber to move without distortion."
  },
  {
    id: 'joinery-l2-timber-technology18',
    question: "Main benefit of cross-laminated timber?",
    options: ["Fireproof", "No finish needed", "Strong in all directions", "Always cheaper"],
    correctAnswer: "Strong in all directions",
    explanation: "CLT layers alternate grain direction for strength and stability."
  },
  {
    id: 'joinery-l2-timber-technology19',
    question: "What is 'figured timber'?",
    options: ["Has unique grain pattern", "Accurately measured timber", "Mathematically calculated", "Carved or sculpted timber"],
    correctAnswer: "Has unique grain pattern",
    explanation: "Figured timber has decorative grain patterns like curly or bird's eye."
  },
  {
    id: 'joinery-l2-timber-technology20',
    question: "How are hardwoods typically identified?",
    options: ["Cost more", "Grow faster", "Imported only", "Broad leaves instead of needles"],
    correctAnswer: "Broad leaves instead of needles",
    explanation: "Hardwoods come from broadleaf trees. Softwoods have needles."
  },
  {
    id: 'joinery-l2-timber-technology21',
    question: "Why condition timber before use?",
    options: ["To clean surface", "Fire protection", "Change colour", "Reach moisture balance for location"],
    correctAnswer: "Reach moisture balance for location",
    explanation: "Conditioning lets timber match its installation environment."
  },
  {
    id: 'joinery-l2-timber-technology22',
    question: "Which product is best for timber flooring?",
    options: ["OSB boards", "Hardwood wear-layer flooring", "Laminated veneer", "MDF panels"],
    correctAnswer: "Hardwood wear-layer flooring",
    explanation: "Engineered flooring offers durability and wood appearance."
  },
  {
    id: 'joinery-l2-timber-technology23',
    question: "What affects timber's outdoor durability most?",
    options: ["Timber age", "Natural decay resistance", "Timber colour", "Timber density"],
    correctAnswer: "Natural decay resistance",
    explanation: "Natural durability or treatment determines exterior performance."
  },
  {
    id: 'joinery-l2-timber-technology24',
    question: "Why seal timber end grain?",
    options: ["Strengthen it", "Improve appearance", "Make glue easier", "Prevent moisture loss and splitting"],
    correctAnswer: "Prevent moisture loss and splitting",
    explanation: "End grain sealer slows moisture loss to stop cracking."
  },
  {
    id: 'joinery-l2-timber-technology25',
    question: "What is 'stress grading'?",
    options: ["Visual timber inspection", "Physical timber break test", "Classify by strength for structure", "Stress from using poor timber"],
    correctAnswer: "Classify by strength for structure",
    explanation: "Stress grading ensures timber is suitable for load-bearing use."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-timber-technology', 'items', q.id), {
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
