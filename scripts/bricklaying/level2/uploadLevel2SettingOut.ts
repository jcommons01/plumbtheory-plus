// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2SettingOut.ts

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
    id: 'bricklaying-l2-setting-out1',
    question: "What is the main goal of setting out a building?",
    options: ["To mark out site boundaries", "To plan delivery access", "To set correct positions and levels", "To estimate costs"],
    correctAnswer: "To set correct positions and levels",
    explanation: "Setting out ensures that walls and structural elements are built in the correct positions, with accurate dimensions and levels."
  },
  {
    id: 'bricklaying-l2-setting-out2',
    question: "What is the 3-4-5 method used for?",
    options: ["Testing concrete mix", "Measuring depth", "Creating a 90° angle", "Aligning scaffold boards"],
    correctAnswer: "Creating a 90° angle",
    explanation: "The 3-4-5 triangle method helps bricklayers check or set out right angles on site."
  },
  {
    id: 'bricklaying-l2-setting-out3',
    question: "Which tool is best for checking vertical alignment?",
    options: ["Tape measure", "Laser level", "Spirit level", "Steel square"],
    correctAnswer: "Spirit level",
    explanation: "A spirit level is commonly used to check that walls are plumb during setting out and construction."
  },
  {
    id: 'bricklaying-l2-setting-out4',
    question: "What is a datum point?",
    options: ["A storage area", "A job start time", "A fixed reference level", "A brick type"],
    correctAnswer: "A fixed reference level",
    explanation: "A datum provides a known reference height from which all vertical measurements are made."
  },
  {
    id: 'bricklaying-l2-setting-out5',
    question: "What does 'establishing the footprint' mean?",
    options: ["Setting budget limits", "Marking the wall outline", "Choosing a build method", "Digging the trench"],
    correctAnswer: "Marking the wall outline",
    explanation: "The footprint is the exact position of the building marked on the ground."
  },
  {
    id: 'bricklaying-l2-setting-out6',
    question: "Why are profile boards used?",
    options: ["To store bricks", "To display site plans", "To support scaffold", "To hold string lines"],
    correctAnswer: "To hold string lines",
    explanation: "Profile boards are set up at corners to support lines marking the wall positions."
  },
  {
    id: 'bricklaying-l2-setting-out7',
    question: "Which of the following is NOT part of setting out?",
    options: ["Checking levels", "Mixing mortar", "Marking corners", "Measuring diagonals"],
    correctAnswer: "Mixing mortar",
    explanation: "Setting out focuses on accurate measurements and layout, not material preparation."
  },
  {
    id: 'bricklaying-l2-setting-out8',
    question: "Why are diagonals measured during setting out?",
    options: ["To check levels", "To check alignment", "To check square corners", "To measure wall height"],
    correctAnswer: "To check square corners",
    explanation: "Equal diagonals confirm that corners are at 90 degrees."
  },
  {
    id: 'bricklaying-l2-setting-out9',
    question: "What does 'gauging' mean in brickwork?",
    options: ["Mixing mortar", "Spacing vertical joints", "Setting brick heights", "Cutting bricks"],
    correctAnswer: "Setting brick heights",
    explanation: "Gauging ensures even spacing of courses using a gauge rod."
  },
  {
    id: 'bricklaying-l2-setting-out10',
    question: "How many courses are in a 2.4m wall using 65mm bricks and 10mm joints?",
    options: ["30", "32", "34", "36"],
    correctAnswer: "32",
    explanation: "Each course is 75mm high, so 2400 ÷ 75 = 32 courses."
  },
  {
    id: 'bricklaying-l2-setting-out11',
    question: "What is a gauge rod used for?",
    options: ["Checking levels", "Marking vertical course heights", "Measuring wall width", "Cutting bricks"],
    correctAnswer: "Marking vertical course heights",
    explanation: "A gauge rod shows the height of each course for consistent brickwork."
  },
  {
    id: 'bricklaying-l2-setting-out12',
    question: "What is the minimum overlap between bricks in consecutive courses?",
    options: ["Quarter brick", "Half brick", "Full brick", "No overlap"],
    correctAnswer: "Quarter brick",
    explanation: "At least a quarter brick overlap ensures strength and proper bonding."
  },
  {
    id: 'bricklaying-l2-setting-out13',
    question: "Which tool is used to transfer levels across a site?",
    options: ["Gauge rod", "Laser level", "Tape measure", "Spirit level"],
    correctAnswer: "Laser level",
    explanation: "Laser levels project a straight horizontal line to transfer levels easily."
  },
  {
    id: 'bricklaying-l2-setting-out14',
    question: "What is a perpend?",
    options: ["Horizontal joint", "Brick face", "Vertical joint", "Support bracket"],
    correctAnswer: "Vertical joint",
    explanation: "Perpends are vertical joints between bricks in a course."
  },
  {
    id: 'bricklaying-l2-setting-out15',
    question: "How many bricks fit in a 7.5m wall using 215mm bricks with 10mm joints?",
    options: ["25", "35", "50", "70"],
    correctAnswer: "35",
    explanation: "Each brick plus joint is 225mm. 7500 ÷ 225 = 33.3, rounded to 35."
  },
  {
    id: 'bricklaying-l2-setting-out16',
    question: "What is a story rod used for?",
    options: ["Checking foundation depth", "Setting scaffold height", "Marking openings and features", "Mixing mortar"],
    correctAnswer: "Marking openings and features",
    explanation: "A story rod marks where features like windows and DPCs align with courses."
  },
  {
    id: 'bricklaying-l2-setting-out17',
    question: "What does 'breaking bond' mean?",
    options: ["Cracking defective bricks", "Changing mortar mix", "Offsetting vertical joints", "Stopping work"],
    correctAnswer: "Offsetting vertical joints",
    explanation: "Breaking bond means staggering bricks so vertical joints do not align."
  },
  {
    id: 'bricklaying-l2-setting-out18',
    question: "What is the typical cavity width in UK homes?",
    options: ["50mm", "75mm", "100mm", "125mm"],
    correctAnswer: "100mm",
    explanation: "100mm cavities are common to allow insulation and moisture control."
  },
  {
    id: 'bricklaying-l2-setting-out19',
    question: "What does 'plumbing the corners' ensure?",
    options: ["Pipes are installed", "Corners are watertight", "Corners are vertical", "Corners are wide enough"],
    correctAnswer: "Corners are vertical",
    explanation: "Plumbing ensures the corners are built plumb and square as reference points."
  },
  {
    id: 'bricklaying-l2-setting-out20',
    question: "What foundation method is used on sloping ground?",
    options: ["Slab foundation", "Piled foundation", "Raft foundation", "Stepped foundation"],
    correctAnswer: "Stepped foundation",
    explanation: "Stepped foundations follow the slope while keeping the wall base level."
  },
  {
    id: 'bricklaying-l2-setting-out21',
    question: "What does 'setting out to a face' mean?",
    options: ["Choosing a wall colour", "Working from the visible wall face", "Aligning with ground level", "Placing the first course"],
    correctAnswer: "Working from the visible wall face",
    explanation: "This method ensures the most visible face of the wall is straight and neat."
  },
  {
    id: 'bricklaying-l2-setting-out22',
    question: "What is 'setting the line'?",
    options: ["Digging a trench", "Laying the first course to a string line", "Pouring the concrete", "Placing scaffolding"],
    correctAnswer: "Laying the first course to a string line",
    explanation: "The first course is laid to the line, ensuring correct wall position."
  },
  {
    id: 'bricklaying-l2-setting-out23',
    question: "What opening is allowed for a standard UK door?",
    options: ["726mm", "826mm", "926mm", "1026mm"],
    correctAnswer: "926mm",
    explanation: "926mm allows for a standard door plus frame and fitting clearance."
  },
  {
    id: 'bricklaying-l2-setting-out24',
    question: "What does 'working to the line' mean?",
    options: ["Following a wall plan", "Laying bricks to a string line", "Marking the site boundary", "Aligning with the DPC"],
    correctAnswer: "Laying bricks to a string line",
    explanation: "This technique ensures each course is straight and level."
  },
  {
    id: 'bricklaying-l2-setting-out25',
    question: "Which tool is used to mark a semi-circular arch?",
    options: ["Steel square", "Trammel", "Spirit level", "Gauge rod"],
    correctAnswer: "Trammel",
    explanation: "A trammel marks accurate curves by swinging from a fixed centre point."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-setting-out', 'items', q.id), {
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
