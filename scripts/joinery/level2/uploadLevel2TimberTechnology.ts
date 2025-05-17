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

// ✅ Joinery Level 2 Timber Technology Questions (balanced correct answers)
const questions = [
  {
    id: 'joinery-l2-timber-technology1',
    question: "What is the difference between softwood and hardwood?",
    options: [
      "Softwoods come from evergreen trees",
      "Hardwoods are more expensive",
      "Softwoods are lighter in colour",
      "Hardwoods are thicker"
    ],
    correctAnswer: "Softwoods come from evergreen trees",
    explanation: "Softwoods come from coniferous trees, while hardwoods come from broad-leaved trees."
  },
  {
    id: 'joinery-l2-timber-technology2',
    question: "What does 'moisture content' mean in timber?",
    options: [
      "Water weight compared to dry timber",
      "The sap content inside the timber",
      "The moisture level of the air around the timber",
      "The amount of water removed during drying"
    ],
    correctAnswer: "Water weight compared to dry timber",
    explanation: "Moisture content is the percentage of water present in timber compared to its dry weight."
  },
  {
    id: 'joinery-l2-timber-technology3',
    question: "What is meant by 'quarter-sawn' timber?",
    options: [
      "Sawn perpendicular to the growth rings",
      "Timber cut in four pieces",
      "Timber with straight grain",
      "Timber with irregular grain patterns"
    ],
    correctAnswer: "Sawn perpendicular to the growth rings",
    explanation: "Quarter-sawn timber is cut perpendicular to the grain, improving stability and appearance."
  },
  {
    id: 'joinery-l2-timber-technology4',
    question: "Why is timber kiln dried?",
    options: [
      "To remove excess moisture",
      "To enhance its colour",
      "To make it lighter",
      "To prevent insect infestations"
    ],
    correctAnswer: "To remove excess moisture",
    explanation: "Kiln drying reduces moisture content, preventing distortion and ensuring stability."
  },
  {
    id: 'joinery-l2-timber-technology5',
    question: "Which is NOT a natural timber defect?",
    options: [
      "Knots",
      "Splits",
      "Shakes",
      "Lamination"
    ],
    correctAnswer: "Lamination",
    explanation: "Lamination is a process used to bond layers of timber, not a natural defect."
  },
  {
    id: 'joinery-l2-timber-technology6',
    question: "Why is timber graded?",
    options: [
      "To assess strength and appearance",
      "To track the tree's age",
      "To reduce cost",
      "To measure moisture content"
    ],
    correctAnswer: "To assess strength and appearance",
    explanation: "Grading ensures timber meets necessary strength and aesthetic standards for construction."
  },
  {
    id: 'joinery-l2-timber-technology7',
    question: "How does MDF differ from plywood?",
    options: [
      "MDF uses compressed fibres, plywood uses veneers",
      "MDF is denser, plywood is lighter",
      "Plywood is cheaper than MDF",
      "MDF is stronger than plywood"
    ],
    correctAnswer: "MDF uses compressed fibres, plywood uses veneers",
    explanation: "MDF is made from pressed wood fibres, while plywood consists of multiple layers of thin wood veneers."
  },
  {
    id: 'joinery-l2-timber-technology8',
    question: "Why season timber?",
    options: [
      "To reduce moisture content for stability",
      "To improve the appearance",
      "To make it stronger",
      "To increase its resistance to fire"
    ],
    correctAnswer: "To reduce moisture content for stability",
    explanation: "Seasoning removes excess moisture, reducing the risk of distortion and ensuring stability."
  },
  {
    id: 'joinery-l2-timber-technology9',
    question: "What does FSC certification show?",
    options: [
      "The timber is treated for insects",
      "The timber is sourced from responsibly managed forests",
      "The timber has been waterproofed",
      "The timber is resistant to decay"
    ],
    correctAnswer: "The timber is sourced from responsibly managed forests",
    explanation: "FSC certification ensures that timber comes from forests managed in an environmentally responsible way."
  },
  {
    id: 'joinery-l2-timber-technology10',
    question: "What is 'shrinkage and swelling'?",
    options: [
      "Timber movement caused by changes in moisture content",
      "The increase in size of timber due to heat",
      "Timber deformation from improper seasoning",
      "Timber's natural expansion due to climate change"
    ],
    correctAnswer: "Timber movement caused by changes in moisture content",
    explanation: "Shrinking and swelling occur when timber absorbs or loses moisture, causing it to expand or contract."
  },
  {
    id: 'joinery-l2-timber-technology11',
    question: "What is 'heartwood'?",
    options: [
      "The central core of the tree",
      "The outer layers of the tree",
      "The bark of the tree",
      "The part of the tree that conducts water"
    ],
    correctAnswer: "The central core of the tree",
    explanation: "Heartwood is the non-living central part of a tree, typically darker and denser than sapwood."
  },
  {
    id: 'joinery-l2-timber-technology12',
    question: "Which wood suits external UK joinery?",
    options: [
      "Beech",
      "Oak",
      "Pine",
      "Maple"
    ],
    correctAnswer: "Oak",
    explanation: "Oak is naturally durable and resistant to decay, making it ideal for outdoor joinery in the UK."
  },
  {
    id: 'joinery-l2-timber-technology13',
    question: "Why use preservative treatments?",
    options: [
      "To prevent fungal and insect damage",
      "To increase the timber's strength",
      "To enhance its colour",
      "To make it easier to cut"
    ],
    correctAnswer: "To prevent fungal and insect damage",
    explanation: "Preservative treatments protect timber from decay, fungal growth, and insect infestations."
  },
  {
    id: 'joinery-l2-timber-technology14',
    question: "Why use glulam over solid timber?",
    options: [
      "It has fewer defects and can span longer distances",
      "It is cheaper than solid timber",
      "It requires no finishing",
      "It is lighter than solid timber"
    ],
    correctAnswer: "It has fewer defects and can span longer distances",
    explanation: "Glulam is engineered to offer strength, flexibility, and fewer defects compared to solid timber."
  },
  {
    id: 'joinery-l2-timber-technology15',
    question: "Best sawing method for stable timber?",
    options: [
      "Quarter sawing",
      "Plain sawing",
      "Boxed heart sawing",
      "Tangential sawing"
    ],
    correctAnswer: "Quarter sawing",
    explanation: "Quarter sawing minimizes distortion and provides better dimensional stability and aesthetic appearance."
  },
  {
    id: 'joinery-l2-timber-technology16',
    question: "What is 'book matching'?",
    options: [
      "A pattern created by joining pairs of veneer leaves",
      "A method of treating timber",
      "A technique for timber grading",
      "A way to store timber samples"
    ],
    correctAnswer: "A pattern created by joining pairs of veneer leaves",
    explanation: "Book matching is a technique where veneer leaves are joined in pairs to create a symmetrical pattern."
  },
  {
    id: 'joinery-l2-timber-technology17',
    question: "Why use frame-and-panel doors?",
    options: [
      "To manage wood movement",
      "To reduce weight",
      "For aesthetic appeal",
      "To improve strength"
    ],
    correctAnswer: "To manage wood movement",
    explanation: "Frame-and-panel doors allow for wood expansion and contraction without distortion."
  },
  {
    id: 'joinery-l2-timber-technology18',
    question: "Main benefit of cross-laminated timber?",
    options: [
      "It is fire-resistant",
      "It is strong in all directions",
      "It requires no finishing",
      "It is always cheaper"
    ],
    correctAnswer: "It is strong in all directions",
    explanation: "Cross-laminated timber has layers arranged in alternating directions for strength and stability in all directions."
  },
  {
    id: 'joinery-l2-timber-technology19',
    question: "What is 'figured timber'?",
    options: [
      "Timber with unique grain patterns",
      "Timber with specific moisture content",
      "Timber with irregular growth patterns",
      "Timber with high strength"
    ],
    correctAnswer: "Timber with unique grain patterns",
    explanation: "Figured timber is prized for its distinctive, decorative grain patterns like bird’s eye or curly grain."
  },
  {
    id: 'joinery-l2-timber-technology20',
    question: "How are hardwoods typically identified?",
    options: [
      "They have broad leaves instead of needles",
      "They grow faster",
      "They are usually imported",
      "They are more expensive"
    ],
    correctAnswer: "They have broad leaves instead of needles",
    explanation: "Hardwoods come from broadleaf trees, while softwoods come from conifers with needles."
  },
  {
    id: 'joinery-l2-timber-technology21',
    question: "Why condition timber before use?",
    options: [
      "To clean the surface",
      "To improve colour",
      "To reach moisture balance for the environment",
      "To make it more resistant to fire"
    ],
    correctAnswer: "To reach moisture balance for the environment",
    explanation: "Conditioning ensures timber reaches the moisture content appropriate for its intended environment."
  },
  {
    id: 'joinery-l2-timber-technology22',
    question: "Which product is best for timber flooring?",
    options: [
      "Hardwood wear-layer flooring",
      "MDF panels",
      "OSB boards",
      "Laminated veneer"
    ],
    correctAnswer: "Hardwood wear-layer flooring",
    explanation: "Hardwood wear-layer flooring offers durability and aesthetic appeal, making it ideal for floors."
  },
  {
    id: 'joinery-l2-timber-technology23',
    question: "What affects timber's outdoor durability most?",
    options: [
      "Timber age",
      "Natural decay resistance",
      "Timber density",
      "Timber colour"
    ],
    correctAnswer: "Natural decay resistance",
    explanation: "The timber's resistance to decay or the treatment applied significantly affects its durability outdoors."
  },
  {
    id: 'joinery-l2-timber-technology24',
    question: "Why seal timber end grain?",
    options: [
      "To prevent moisture loss and splitting",
      "To improve appearance",
      "To make glue easier",
      "To strengthen it"
    ],
    correctAnswer: "To prevent moisture loss and splitting",
    explanation: "Sealing end grain prevents rapid moisture loss and reduces the risk of cracking."
  },
  {
    id: 'joinery-l2-timber-technology25',
    question: "What is 'stress grading'?",
    options: [
      "Classifying timber by strength for structural use",
      "A visual inspection process for timber",
      "A method to calculate timber's load-bearing capacity",
      "A technique for testing timber durability"
    ],
    correctAnswer: "Classifying timber by strength for structural use",
    explanation: "Stress grading classifies timber based on its strength, ensuring suitability for structural purposes."
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
