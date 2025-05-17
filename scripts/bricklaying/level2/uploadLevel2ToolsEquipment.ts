// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2ToolsEquipment.ts

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
    id: 'bricklaying-l2-tools-equipment1',
    question: "What is the main use of a brick trowel?",
    options: ["Cutting bricks", "Applying mortar", "Finishing joints", "Checking levels"],
    correctAnswer: "Applying mortar",
    explanation: "A brick trowel is used to pick up, spread, and shape mortar for laying bricks."
  },
  {
    id: 'bricklaying-l2-tools-equipment2',
    question: "Which tool is used to cut bricks on site?",
    options: ["Spirit level", "Bolster and hammer", "Builder's line", "Jointing tool"],
    correctAnswer: "Bolster and hammer",
    explanation: "A bolster chisel and hammer are used together to score and split bricks cleanly."
  },
  {
    id: 'bricklaying-l2-tools-equipment3',
    question: "What does a spirit level check?",
    options: ["Brick width", "Wall height", "Level and plumb", "Cavity width"],
    correctAnswer: "Level and plumb",
    explanation: "Spirit levels are used to ensure brickwork is straight, flat, and vertical."
  },
  {
    id: 'bricklaying-l2-tools-equipment4',
    question: "What is a gauge rod used for?",
    options: ["Mixing mortar", "Cleaning bricks", "Measuring course heights", "Cutting bricks"],
    correctAnswer: "Measuring course heights",
    explanation: "A gauge rod shows the height of each brick course to keep spacing consistent."
  },
  {
    id: 'bricklaying-l2-tools-equipment5',
    question: "What is a builder's line used for?",
    options: ["Cutting straight lines", "Aligning bricks", "Measuring mortar", "Checking joint width"],
    correctAnswer: "Aligning bricks",
    explanation: "A builder’s line is stretched across the wall to guide straight laying of bricks."
  },
  {
    id: 'bricklaying-l2-tools-equipment6',
    question: "What is the function of a pointing trowel?",
    options: ["Spreading mortar", "Cutting bricks", "Finishing joints", "Measuring bricks"],
    correctAnswer: "Finishing joints",
    explanation: "Pointing trowels are used to fill and finish small mortar joints neatly."
  },
  {
    id: 'bricklaying-l2-tools-equipment7',
    question: "What is a jointer used for?",
    options: ["Laying bricks", "Creating expansion joints", "Shaping mortar joints", "Cutting blocks"],
    correctAnswer: "Shaping mortar joints",
    explanation: "A jointer is run along fresh mortar to create a clean, consistent joint profile."
  },
  {
    id: 'bricklaying-l2-tools-equipment8',
    question: "What is the main purpose of a brick hammer?",
    options: ["Driving nails", "Mixing mortar", "Cutting and adjusting bricks", "Breaking concrete"],
    correctAnswer: "Cutting and adjusting bricks",
    explanation: "Brick hammers are used to trim bricks and tap them into position during laying."
  },
  {
    id: 'bricklaying-l2-tools-equipment9',
    question: "What is a spot board used for?",
    options: ["Marking wall positions", "Storing bricks", "Holding mortar", "Measuring angles"],
    correctAnswer: "Holding mortar",
    explanation: "A spot board is a raised surface for keeping mortar within easy reach while working."
  },
  {
    id: 'bricklaying-l2-tools-equipment10',
    question: "What do line pins do?",
    options: ["Mark vertical joints", "Hold the string line in place", "Support bricks", "Secure scaffold"],
    correctAnswer: "Hold the string line in place",
    explanation: "Line pins anchor the string line in mortar joints to guide straight brickwork."
  },
  {
    id: 'bricklaying-l2-tools-equipment11',
    question: "What is a brick joint raker used for?",
    options: ["Cutting bricks", "Marking lines", "Cleaning old mortar joints", "Setting wall height"],
    correctAnswer: "Cleaning old mortar joints",
    explanation: "A joint raker removes old mortar before repointing can take place."
  },
  {
    id: 'bricklaying-l2-tools-equipment12',
    question: "What PPE is essential when cutting bricks?",
    options: ["Hi-vis jacket", "Eye protection, gloves, dust mask", "Steel boots only", "Hard hat only"],
    correctAnswer: "Eye protection, gloves, dust mask",
    explanation: "Cutting bricks creates dust and debris, requiring gloves, eye protection, and a dust mask."
  },
  {
    id: 'bricklaying-l2-tools-equipment13',
    question: "What is a masonry saw used for?",
    options: ["Sawing wood", "Cutting insulation", "Cutting bricks and blocks", "Cutting scaffold tubes"],
    correctAnswer: "Cutting bricks and blocks",
    explanation: "Masonry saws are powered tools for accurate cuts in bricks and blocks."
  },
  {
    id: 'bricklaying-l2-tools-equipment14',
    question: "What is a builder's square used for?",
    options: ["Checking joint width", "Measuring cavity gaps", "Marking 90° angles", "Leveling mortar"],
    correctAnswer: "Marking 90° angles",
    explanation: "Builder’s squares help check and mark right angles on walls and foundations."
  },
  {
    id: 'bricklaying-l2-tools-equipment15',
    question: "What are profile boards used for?",
    options: ["Decorating brick faces", "Supporting scaffolds", "Holding string lines", "Storing tools"],
    correctAnswer: "Holding string lines",
    explanation: "Profile boards are set up at corners to hold lines marking the wall position."
  },
  {
    id: 'bricklaying-l2-tools-equipment16',
    question: "What is the purpose of a bolster chisel?",
    options: ["Striking bricks", "Lifting bricks", "Cutting bricks", "Cleaning walls"],
    correctAnswer: "Cutting bricks",
    explanation: "A bolster is struck with a hammer to cleanly split bricks on site."
  },
  {
    id: 'bricklaying-l2-tools-equipment17',
    question: "What mixes large amounts of mortar on site?",
    options: ["Shovel", "Hand trowel", "Mechanical mixer", "Bucket and spade"],
    correctAnswer: "Mechanical mixer",
    explanation: "Drum or pan mixers are used on site to mix mortar in large batches quickly."
  },
  {
    id: 'bricklaying-l2-tools-equipment18',
    question: "What is a gauge lath?",
    options: ["Mortar guide", "Cavity spacer", "Course height marker", "Trowel type"],
    correctAnswer: "Course height marker",
    explanation: "A gauge lath shows the height of each brick course including mortar joints."
  },
  {
    id: 'bricklaying-l2-tools-equipment19',
    question: "What is a frenchman used for?",
    options: ["Cutting blocks", "Cleaning tight joints", "Spreading mortar", "Leveling bricks"],
    correctAnswer: "Cleaning tight joints",
    explanation: "A frenchman is used to scrape and clean excess mortar from corners and faces."
  },
  {
    id: 'bricklaying-l2-tools-equipment20',
    question: "What does a brick conveyor do?",
    options: ["Lays bricks", "Cleans bricks", "Lifts bricks to height", "Mixes mortar"],
    correctAnswer: "Lifts bricks to height",
    explanation: "A brick conveyor helps lift materials to higher levels safely and efficiently."
  },
  {
    id: 'bricklaying-l2-tools-equipment21',
    question: "What tool ensures even mortar joint thickness?",
    options: ["Spirit level", "Joint spacer", "Builder's line", "Tingle plate"],
    correctAnswer: "Joint spacer",
    explanation: "Joint spacers are placed between bricks to maintain uniform joint thickness."
  },
  {
    id: 'bricklaying-l2-tools-equipment22',
    question: "What is a cavity batten used for?",
    options: ["Cutting bricks", "Supporting lintels", "Spacing cavity walls", "Leveling mortar"],
    correctAnswer: "Spacing cavity walls",
    explanation: "Cavity battens help keep a consistent gap between wall leaves during construction."
  },
  {
    id: 'bricklaying-l2-tools-equipment23',
    question: "What does a scutch chisel do?",
    options: ["Smooths concrete", "Removes old mortar", "Cuts insulation", "Fixes damp-proof courses"],
    correctAnswer: "Removes old mortar",
    explanation: "A scutch is used to clean old mortar off reclaimed bricks without damage."
  },
  {
    id: 'bricklaying-l2-tools-equipment24',
    question: "What is a corner block used for?",
    options: ["Fixing wall ties", "Holding a line at corners", "Joining bricks", "Leveling bricks"],
    correctAnswer: "Holding a line at corners",
    explanation: "Corner blocks are fixed at wall ends to hold builder’s line securely."
  },
  {
    id: 'bricklaying-l2-tools-equipment25',
    question: "What PPE is needed when mixing mortar?",
    options: ["Safety boots only", "Gloves, goggles, boots", "High-vis jacket", "Ear protection only"],
    correctAnswer: "Gloves, goggles, boots",
    explanation: "Cement can burn skin and eyes—PPE like gloves, goggles, and boots are essential."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-tools-equipment', 'items', q.id), {
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
