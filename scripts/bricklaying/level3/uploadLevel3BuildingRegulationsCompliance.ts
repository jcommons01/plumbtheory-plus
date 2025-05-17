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
    id: 'bricklaying-l3-building-regs-1',
    question: "What is the purpose of Building Regulations?",
    options: [
      "To guide construction aesthetics",
      "To ensure safety and performance",
      "To promote modern materials",
      "To control housing supply"
    ],
    correctAnswer: "To ensure safety and performance",
    explanation: "They set minimum standards for design, safety, and health."
  },
  {
    id: 'bricklaying-l3-building-regs-2',
    question: "Which law allows the UK government to create Building Regulations?",
    options: [
      "Town Planning Act",
      "Building Act 1984",
      "Construction Act 2006",
      "Safety at Work Act"
    ],
    correctAnswer: "Building Act 1984",
    explanation: "The Building Act 1984 enables regulation powers."
  },
  {
    id: 'bricklaying-l3-building-regs-3',
    question: "What does an Approved Document provide?",
    options: [
      "Enforcement guidance",
      "Design templates",
      "Planning permission",
      "Ways to comply"
    ],
    correctAnswer: "Ways to comply",
    explanation: "Approved Documents offer practical compliance advice."
  },
  {
    id: 'bricklaying-l3-building-regs-4',
    question: "Which part of the regulations covers fire safety?",
    options: ["Part A", "Part C", "Part B", "Part M"],
    correctAnswer: "Part B",
    explanation: "Part B relates to fire protection and escape."
  },
  {
    id: 'bricklaying-l3-building-regs-5',
    question: "What is a Building Regulation submission?",
    options: [
      "A tax form",
      "A site notice",
      "An application for building approval",
      "A tender proposal"
    ],
    correctAnswer: "An application for building approval",
    explanation: "It's required before starting notifiable work."
  },
  {
    id: 'bricklaying-l3-building-regs-6',
    question: "What does a Building Control Body do?",
    options: [
      "Designs buildings",
      "Oversees site safety",
      "Checks regulatory compliance",
      "Approves planning"
    ],
    correctAnswer: "Checks regulatory compliance",
    explanation: "They review plans and inspect construction."
  },
  {
    id: 'bricklaying-l3-building-regs-7',
    question: "What is meant by a 'functional requirement'?",
    options: [
      "A design checklist",
      "A list of approved contractors",
      "A performance standard",
      "A material specification"
    ],
    correctAnswer: "A performance standard",
    explanation: "It describes what the building must achieve."
  },
  {
    id: 'bricklaying-l3-building-regs-8',
    question: "Which part addresses radon gas protection?",
    options: ["Part C", "Part L", "Part D", "Part E"],
    correctAnswer: "Part C",
    explanation: "Part C covers contaminants including radon."
  },
  {
    id: 'bricklaying-l3-building-regs-9',
    question: "What is a completion certificate?",
    options: [
      "A guarantee of quality",
      "A record of materials used",
      "A sign-off for compliance",
      "A planning certificate"
    ],
    correctAnswer: "A sign-off for compliance",
    explanation: "It's issued when work meets regulations."
  },
  {
    id: 'bricklaying-l3-building-regs-10',
    question: "What is the U-value limit for new walls?",
    options: ["0.18", "0.35", "0.28", "0.45"],
    correctAnswer: "0.18",
    explanation: "Part L sets a 0.18 W/m²K limit for walls."
  },
  {
    id: 'bricklaying-l3-building-regs-11',
    question: "What triggers a material change of use?",
    options: [
      "Redecorating a flat",
      "Changing a wall colour",
      "Converting a shop to a flat",
      "Replacing a roof tile"
    ],
    correctAnswer: "Converting a shop to a flat",
    explanation: "New use may require upgraded compliance."
  },
  {
    id: 'bricklaying-l3-building-regs-12',
    question: "What does Regulation 7 require?",
    options: [
      "Use of UK materials",
      "Environmental checks",
      "Workmanlike quality and suitable materials",
      "Fire risk assessments"
    ],
    correctAnswer: "Workmanlike quality and suitable materials",
    explanation: "It ensures proper materials and workmanship."
  },
  {
    id: 'bricklaying-l3-building-regs-13',
    question: "What is a Full Plans application?",
    options: [
      "Outline project summary",
      "Planning application",
      "Submission of detailed drawings",
      "Health and safety check"
    ],
    correctAnswer: "Submission of detailed drawings",
    explanation: "Used to confirm compliance before building starts."
  },
  {
    id: 'bricklaying-l3-building-regs-14',
    question: "What is a Building Notice?",
    options: [
      "An enforcement warning",
      "A quick-start approval route",
      "A refusal of permission",
      "A tender form"
    ],
    correctAnswer: "A quick-start approval route",
    explanation: "It allows starting without full drawings."
  },
  {
    id: 'bricklaying-l3-building-regs-15',
    question: "Minimum DPC height above ground level?",
    options: ["75mm", "100mm", "150mm", "200mm"],
    correctAnswer: "150mm",
    explanation: "This prevents rising damp into walls."
  },
  {
    id: 'bricklaying-l3-building-regs-16',
    question: "What is a thermal bridge?",
    options: [
      "A fire seal",
      "A drainage gap",
      "A cold spot where heat escapes",
      "A ventilation route"
    ],
    correctAnswer: "A cold spot where heat escapes",
    explanation: "Occurs at junctions with poor insulation."
  },
  {
    id: 'bricklaying-l3-building-regs-17',
    question: "Part M of the regulations ensures:",
    options: [
      "Noise control",
      "Moisture protection",
      "Safe electrical systems",
      "Access for all users"
    ],
    correctAnswer: "Access for all users",
    explanation: "It covers usability and accessibility."
  },
  {
    id: 'bricklaying-l3-building-regs-18',
    question: "Which part deals with security of dwellings?",
    options: ["Part Q", "Part P", "Part B", "Part D"],
    correctAnswer: "Part Q",
    explanation: "Part Q focuses on secure windows and doors."
  },
  {
    id: 'bricklaying-l3-building-regs-19',
    question: "What is a cavity barrier used for?",
    options: [
      "Improving ventilation",
      "Fire resistance in cavities",
      "Insulating pipes",
      "Moisture protection"
    ],
    correctAnswer: "Fire resistance in cavities",
    explanation: "It limits fire spread within wall voids."
  },
  {
    id: 'bricklaying-l3-building-regs-20',
    question: "When must notifiable work be reported?",
    options: [
      "After completion",
      "Once started",
      "Before starting",
      "After payment"
    ],
    correctAnswer: "Before starting",
    explanation: "It ensures proper inspections are arranged."
  },
  {
    id: 'bricklaying-l3-building-regs-21',
    question: "Who are Approved Inspectors?",
    options: [
      "Planners",
      "Private building control professionals",
      "Fire officers",
      "Project managers"
    ],
    correctAnswer: "Private building control professionals",
    explanation: "They inspect work instead of the local authority."
  },
  {
    id: 'bricklaying-l3-building-regs-22',
    question: "What does Part C aim to prevent?",
    options: [
      "Poor lighting",
      "Noise issues",
      "Damp and ground gases",
      "Structural collapse"
    ],
    correctAnswer: "Damp and ground gases",
    explanation: "It covers site moisture and contamination."
  },
  {
    id: 'bricklaying-l3-building-regs-23',
    question: "What does Part L focus on?",
    options: [
      "Electrical safety",
      "Heating system types",
      "Energy efficiency",
      "Drainage layouts"
    ],
    correctAnswer: "Energy efficiency",
    explanation: "It sets thermal performance standards."
  },
  {
    id: 'bricklaying-l3-building-regs-24',
    question: "What is a Robust Detail?",
    options: [
      "A fire-safe wall",
      "A pre-tested acoustic detail",
      "A cavity wall drawing",
      "A structural certificate"
    ],
    correctAnswer: "A pre-tested acoustic detail",
    explanation: "It avoids the need for sound testing."
  },
  {
    id: 'bricklaying-l3-building-regs-25',
    question: "What is a material alteration?",
    options: [
      "A change that reduces compliance",
      "Installing new plaster",
      "Changing insulation type",
      "Upgrading windows"
    ],
    correctAnswer: "A change that reduces compliance",
    explanation: "It triggers the need to meet regulations."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(
        doc(db, 'questions', 'bricklaying-l3-building-regs', 'items', q.id),
        {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }
      );
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

uploadQuestions();
