// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3AdvancedTimber.ts

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

// ✅ Joinery Level 3 – Advanced Timber Technology (25 Revised Questions)
const questions = [
  {
    id: 'joinery-l3-advanced-timber-001',
    question: "Which part of the tree does sapwood refer to?",
    options: ["Inner core", "Outer living layer", "Bark layer", "Heart centre"],
    correctAnswer: "Outer living layer",
    explanation: "Sapwood conducts water and nutrients; it's the younger, outer section of the tree."
  },
  {
    id: 'joinery-l3-advanced-timber-002',
    question: "What effect does kiln drying have on timber?",
    options: ["Increases shrinkage", "Reduces durability", "Improves stability", "Makes wood waterproof"],
    correctAnswer: "Improves stability",
    explanation: "Kiln drying controls moisture content, reducing movement in service."
  },
  {
    id: 'joinery-l3-advanced-timber-003',
    question: "Which timber is best known for its resistance to rot in outdoor settings?",
    options: ["Ash", "Spruce", "Iroko", "Beech"],
    correctAnswer: "Iroko",
    explanation: "Iroko is a naturally durable hardwood suitable for external use without treatment."
  },
  {
    id: 'joinery-l3-advanced-timber-004',
    question: "What is the main purpose of pressure treatment in softwoods?",
    options: ["Change grain colour", "Increase fire resistance", "Improve moisture movement", "Enhance decay resistance"],
    correctAnswer: "Enhance decay resistance",
    explanation: "Preservatives are forced into the wood to protect against fungal and insect attack."
  },
  {
    id: 'joinery-l3-advanced-timber-005',
    question: "Why is equilibrium moisture content (EMC) important?",
    options: ["Prevents fungal infection", "Ensures consistent density", "Reduces machining waste", "Helps minimise movement"],
    correctAnswer: "Helps minimise movement",
    explanation: "When EMC is matched to service conditions, dimensional change is minimised."
  },
  {
    id: 'joinery-l3-advanced-timber-006',
    question: "What does the durability class of timber indicate?",
    options: ["Workability", "Flexibility", "Resistance to decay", "Colour stability"],
    correctAnswer: "Resistance to decay",
    explanation: "Durability classes range from 1 (very durable) to 5 (not durable)."
  },
  {
    id: 'joinery-l3-advanced-timber-007',
    question: "What causes case hardening during drying?",
    options: ["Excessive planing", "Poor gluing", "Uneven heating", "Rapid surface drying"],
    correctAnswer: "Rapid surface drying",
    explanation: "If the surface dries too fast, internal stresses cause warping or splitting."
  },
  {
    id: 'joinery-l3-advanced-timber-008',
    question: "Which engineered product is commonly used for stair strings?",
    options: ["Chipboard", "LVL", "Blockboard", "Hardboard"],
    correctAnswer: "LVL",
    explanation: "Laminated Veneer Lumber offers high strength and dimensional stability."
  },
  {
    id: 'joinery-l3-advanced-timber-009',
    question: "Which feature is found in quarter-sawn timber?",
    options: ["Wavy grain", "Open knots", "Straight grain", "Irregular texture"],
    correctAnswer: "Straight grain",
    explanation: "Quarter-sawing cuts across the rings to reduce movement and give a uniform appearance."
  },
  {
    id: 'joinery-l3-advanced-timber-010',
    question: "Which species is commonly used for fine interior joinery?",
    options: ["Pine", "Oak", "Larch", "Mahogany"],
    correctAnswer: "Mahogany",
    explanation: "Mahogany is valued for its colour, workability, and smooth finish."
  },
  {
    id: 'joinery-l3-advanced-timber-011',
    question: "What does finger jointing achieve?",
    options: ["Adds texture", "Prevents warping", "Joins short lengths", "Reduces weight"],
    correctAnswer: "Joins short lengths",
    explanation: "It allows offcuts to be bonded into longer, usable timber lengths."
  },
  {
    id: 'joinery-l3-advanced-timber-012',
    question: "What is the role of lignin in timber structure?",
    options: ["Controls colour", "Adds flexibility", "Holds fibres together", "Reduces moisture"],
    correctAnswer: "Holds fibres together",
    explanation: "Lignin binds cellulose, providing strength and rigidity."
  },
  {
    id: 'joinery-l3-advanced-timber-013',
    question: "Which hardwood is known for its high tannin content?",
    options: ["Maple", "Oak", "Ash", "Sycamore"],
    correctAnswer: "Oak",
    explanation: "Tannins in oak react with metal, and aid in preservation and durability."
  },
  {
    id: 'joinery-l3-advanced-timber-014',
    question: "What is the primary benefit of thermal modification?",
    options: ["Faster drying", "Improved colouring", "Increased hardness", "Enhanced durability"],
    correctAnswer: "Enhanced durability",
    explanation: "High heat alters timber chemistry, making it more stable and rot-resistant."
  },
  {
    id: 'joinery-l3-advanced-timber-015',
    question: "Which tool is best for checking timber moisture content?",
    options: ["Spirit level", "Caliper", "Moisture meter", "Plumb line"],
    correctAnswer: "Moisture meter",
    explanation: "Joiners use moisture meters to ensure timber is dry enough for use."
  },
  {
    id: 'joinery-l3-advanced-timber-016',
    question: "Which movement class applies to beech?",
    options: ["Low", "Medium", "High", "Minimal"],
    correctAnswer: "High",
    explanation: "Beech moves significantly with humidity changes and needs careful selection."
  },
  {
    id: 'joinery-l3-advanced-timber-017',
    question: "What does the term 'reaction wood' mean?",
    options: ["Heavily treated wood", "Wood from a fast-grown tree", "Wood formed under stress", "Wood with no knots"],
    correctAnswer: "Wood formed under stress",
    explanation: "Reaction wood is formed in leaning or stressed trees and may distort in use."
  },
  {
    id: 'joinery-l3-advanced-timber-018',
    question: "What causes honeycomb checks in timber?",
    options: ["Machine error", "Insect attack", "Improper storage", "Rapid internal drying"],
    correctAnswer: "Rapid internal drying",
    explanation: "When the core dries too quickly, internal cracks develop that affect strength."
  },
  {
    id: 'joinery-l3-advanced-timber-019',
    question: "Which characteristic best describes ash timber?",
    options: ["Soft and dark", "Dense and oily", "Light and elastic", "Grainless and brittle"],
    correctAnswer: "Light and elastic",
    explanation: "Ash has good flexibility and is often used in curved or shock-absorbing items."
  },
  {
    id: 'joinery-l3-advanced-timber-020',
    question: "Which engineered product uses compressed wood fibres?",
    options: ["MDF", "Plywood", "Blockboard", "OSB"],
    correctAnswer: "MDF",
    explanation: "Medium Density Fibreboard is smooth, uniform, and ideal for painted finishes."
  },
  {
    id: 'joinery-l3-advanced-timber-021',
    question: "What is the benefit of rift-sawn timber?",
    options: ["Increased movement", "Cheaper cost", "Uniform grain", "Shorter lengths"],
    correctAnswer: "Uniform grain",
    explanation: "Rift-sawn timber has vertical grain lines that reduce distortion and give a clean look."
  },
  {
    id: 'joinery-l3-advanced-timber-022',
    question: "What causes blue stain in timber?",
    options: ["Heat exposure", "UV radiation", "Fungal growth", "Iron content"],
    correctAnswer: "Fungal growth",
    explanation: "Blue stain is a fungal discolouration that affects appearance but not strength."
  },
  {
    id: 'joinery-l3-advanced-timber-023',
    question: "Why is European redwood widely used in joinery?",
    options: ["Cheap and durable", "Hard and knot-free", "Stable and work-friendly", "Bright and oily"],
    correctAnswer: "Stable and work-friendly",
    explanation: "European redwood machines well and accepts preservatives, making it versatile."
  },
  {
    id: 'joinery-l3-advanced-timber-024',
    question: "Which test measures timber stiffness?",
    options: ["Modulus of rupture", "Torsion test", "Elasticity modulus", "Load spread"],
    correctAnswer: "Elasticity modulus",
    explanation: "The modulus of elasticity indicates resistance to deflection under load."
  },
  {
    id: 'joinery-l3-advanced-timber-025',
    question: "What is the purpose of EN 942?",
    options: ["Fire rating", "Moisture content", "Appearance grading", "Acoustic rating"],
    correctAnswer: "Appearance grading",
    explanation: "EN 942 specifies appearance requirements for timber in non-structural joinery."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-advanced-timber', 'items', q.id), {
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
