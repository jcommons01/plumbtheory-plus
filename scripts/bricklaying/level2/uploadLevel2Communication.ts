// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Communication.ts

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

// ✅ Bricklaying Level 2 – Communication & Information (Balanced Set)
const questions = [
  {
    id: 'bricklaying-l2-communication1',
    question: "Why are construction drawings important?",
    options: ["To show design details", "To find site hazards", "To list materials", "To record costs"],
    correctAnswer: "To show design details",
    explanation: "Drawings explain what to build, where, and how."
  },
  {
    id: 'bricklaying-l2-communication2',
    question: "What does 1:50 scale mean?",
    options: ["1 unit = 50 real units", "50 units = 1 on paper", "50mm = 1m", "1mm = 50m"],
    correctAnswer: "1 unit = 50 real units",
    explanation: "Each unit on the drawing equals 50 in real life."
  },
  {
    id: 'bricklaying-l2-communication3',
    question: "What does a site plan show?",
    options: ["Layout and access", "Wall layers", "Joist sizes", "Service runs"],
    correctAnswer: "Layout and access",
    explanation: "It shows building position, boundaries and entry."
  },
  {
    id: 'bricklaying-l2-communication4',
    question: "What does a section drawing show?",
    options: ["Wall layers", "Brick bonds", "Roof slope", "Pipe runs"],
    correctAnswer: "Wall layers",
    explanation: "Sections cut through to show internal build-up."
  },
  {
    id: 'bricklaying-l2-communication5',
    question: "What is shown in elevation drawings?",
    options: ["Building face", "Ground levels", "Site roads", "Drainage pipes"],
    correctAnswer: "Building face",
    explanation: "Elevations show external views of walls."
  },
  {
    id: 'bricklaying-l2-communication6',
    question: "What is in a specification?",
    options: ["Materials and methods", "Job roles", "Scaffold type", "Plot size"],
    correctAnswer: "Materials and methods",
    explanation: "Specs list what to use and how to build."
  },
  {
    id: 'bricklaying-l2-communication7',
    question: "Why use an RFI?",
    options: ["To clarify drawings", "To order tools", "To request pay", "To log breaks"],
    correctAnswer: "To clarify drawings",
    explanation: "RFIs are used to ask formal technical questions."
  },
  {
    id: 'bricklaying-l2-communication8',
    question: "What is a site diary for?",
    options: ["To log site events", "To note holidays", "To plan shopping", "To track mileage"],
    correctAnswer: "To log site events",
    explanation: "Diaries record daily progress and conditions."
  },
  {
    id: 'bricklaying-l2-communication9',
    question: "What should be recorded when bricks arrive?",
    options: ["Type and condition", "Driver’s name", "Bricklayer’s tools", "Cement mix ratio"],
    correctAnswer: "Type and condition",
    explanation: "Delivery records prevent defects and disputes."
  },
  {
    id: 'bricklaying-l2-communication10',
    question: "What is a construction schedule?",
    options: ["Item list with details", "Job contract", "Tool register", "Break plan"],
    correctAnswer: "Item list with details",
    explanation: "Schedules list repeated items like doors or bricks."
  },
  {
    id: 'bricklaying-l2-communication11',
    question: "What does 'NTS' mean?",
    options: ["Not To Scale", "New Timber Spec", "Next To Scaffold", "Narrow Tie Spacing"],
    correctAnswer: "Not To Scale",
    explanation: "Do not measure from NTS drawings."
  },
  {
    id: 'bricklaying-l2-communication12',
    question: "What does 'setting out' mean?",
    options: ["Marking wall lines", "Cleaning tools", "Taking lunch", "Painting bricks"],
    correctAnswer: "Marking wall lines",
    explanation: "It defines where and how walls will be built."
  },
  {
    id: 'bricklaying-l2-communication13',
    question: "What to do if drawings clash?",
    options: ["Raise an RFI", "Ignore the issue", "Choose one", "Ask a labourer"],
    correctAnswer: "Raise an RFI",
    explanation: "Conflicts must be resolved before work starts."
  },
  {
    id: 'bricklaying-l2-communication14',
    question: "Why use standard terms on site?",
    options: ["To avoid confusion", "To save time", "To please clients", "To impress others"],
    correctAnswer: "To avoid confusion",
    explanation: "Common terms help trades understand each other."
  },
  {
    id: 'bricklaying-l2-communication15',
    question: "What is a variation order?",
    options: ["Change to original work", "Brick delivery note", "Work rota", "Tool request form"],
    correctAnswer: "Change to original work",
    explanation: "It confirms changes to agreed scope or spec."
  },
  {
    id: 'bricklaying-l2-communication16',
    question: "What should you include in site measurements?",
    options: ["Date and method", "Just size", "Voice notes", "Estimated guess"],
    correctAnswer: "Date and method",
    explanation: "Details ensure accurate records are kept."
  },
  {
    id: 'bricklaying-l2-communication17',
    question: "Where is the brick bond shown?",
    options: ["In elevation drawings", "In window notes", "On tool labels", "On concrete bags"],
    correctAnswer: "In elevation drawings",
    explanation: "Bond patterns are shown in wall elevations."
  },
  {
    id: 'bricklaying-l2-communication18',
    question: "What does 'TBC' mean?",
    options: ["To Be Confirmed", "Top Brick Course", "Toolbox Check", "Test Batch Cement"],
    correctAnswer: "To Be Confirmed",
    explanation: "TBC means info is not final yet."
  },
  {
    id: 'bricklaying-l2-communication19',
    question: "What is a snag list?",
    options: ["List of small faults", "Timetable", "Payment record", "Toolbox log"],
    correctAnswer: "List of small faults",
    explanation: "Snagging checks for minor defects to fix."
  },
  {
    id: 'bricklaying-l2-communication20',
    question: "Why hold toolbox talks?",
    options: ["Give safety updates", "Request tools", "Check invoices", "Order skips"],
    correctAnswer: "Give safety updates",
    explanation: "They brief staff on safe work practices."
  },
  {
    id: 'bricklaying-l2-communication21',
    question: "Why avoid jargon with clients?",
    options: ["To aid understanding", "To hide errors", "To sound smarter", "To delay work"],
    correctAnswer: "To aid understanding",
    explanation: "Clear words help clients follow info."
  },
  {
    id: 'bricklaying-l2-communication22',
    question: "What’s in a handover pack?",
    options: ["Care info and records", "Staff timesheets", "Planning notes", "Wage breakdown"],
    correctAnswer: "Care info and records",
    explanation: "It includes warranties and product details."
  },
  {
    id: 'bricklaying-l2-communication23',
    question: "What happens at a pre-start meeting?",
    options: ["Work plans are agreed", "Wages are paid", "Lunch is sorted", "Bricks are delivered"],
    correctAnswer: "Work plans are agreed",
    explanation: "All teams review the job before starting."
  },
  {
    id: 'bricklaying-l2-communication24',
    question: "What are 'as-built' drawings?",
    options: ["Record of final layout", "Original plans", "Planning sketches", "3D renderings"],
    correctAnswer: "Record of final layout",
    explanation: "They show how the work was actually done."
  },
  {
    id: 'bricklaying-l2-communication25',
    question: "Why report drawing issues early?",
    options: ["To avoid errors", "To stop rain", "To reduce pay", "To order skips"],
    correctAnswer: "To avoid errors",
    explanation: "Delays and mistakes are avoided with early reports."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-communication', 'items', q.id), {
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
