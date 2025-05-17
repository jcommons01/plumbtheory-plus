// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Scaffolding.ts

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

// ✅ Bricklaying Level 2: Scaffolding Safety & Access Equipment (REVISED)
const questions = [
  {
    id: 'bricklaying-l2-scaffolding1',
    question: "Who is legally allowed to erect or alter scaffolding?",
    options: ["Any trained worker", "Site supervisor", "Qualified scaffolder", "Bricklayer on site"],
    correctAnswer: "Qualified scaffolder",
    explanation: "Only qualified scaffolders are legally permitted to erect or alter scaffolding, typically with CISRS certification."
  },
  {
    id: 'bricklaying-l2-scaffolding2',
    question: "What must bricklayers check before using a scaffold?",
    options: ["Tag and guardrails", "Paint colour", "Previous user name", "Plank length"],
    correctAnswer: "Tag and guardrails",
    explanation: "Users must check the inspection tag, guardrails, access, and general condition before use."
  },
  {
    id: 'bricklaying-l2-scaffolding3',
    question: "What does a toe board prevent?",
    options: ["Trips", "Falling items", "Water ingress", "Platform gaps"],
    correctAnswer: "Falling items",
    explanation: "Toe boards help prevent tools or materials falling from the platform edge."
  },
  {
    id: 'bricklaying-l2-scaffolding4',
    question: "What does SWL stand for?",
    options: ["Steel Weight Limit", "Safe Working Load", "Standard Weight Limit", "Site Work Limit"],
    correctAnswer: "Safe Working Load",
    explanation: "SWL is the maximum safe load a scaffold or component can carry."
  },
  {
    id: 'bricklaying-l2-scaffolding5',
    question: "How often must scaffolds be inspected?",
    options: ["Every 7 days", "Once a month", "Daily", "Every 14 days"],
    correctAnswer: "Every 7 days",
    explanation: "Scaffolds must be inspected every 7 days or after alterations or bad weather."
  },
  {
    id: 'bricklaying-l2-scaffolding6',
    question: "Minimum width for a bricklaying platform?",
    options: ["450mm", "600mm", "813mm", "1000mm"],
    correctAnswer: "813mm",
    explanation: "Platforms for bricklaying must be at least 813mm wide to allow safe working and storage."
  },
  {
    id: 'bricklaying-l2-scaffolding7',
    question: "What is a gin wheel used for?",
    options: ["Lifting tools", "Bracing boards", "Level checking", "Cleaning scaffold"],
    correctAnswer: "Lifting tools",
    explanation: "Gin wheels are simple pulleys used for lifting light loads safely to height."
  },
  {
    id: 'bricklaying-l2-scaffolding8',
    question: "Purpose of scaffold ties?",
    options: ["Stop ladders moving", "Support toe boards", "Fix to building", "Hold planks together"],
    correctAnswer: "Fix to building",
    explanation: "Ties anchor the scaffold to the structure to prevent tipping or collapse."
  },
  {
    id: 'bricklaying-l2-scaffolding9',
    question: "What is a hop-up platform?",
    options: ["Material bin", "Extra height stand", "Safety guard", "Step ladder"],
    correctAnswer: "Extra height stand",
    explanation: "Hop-ups provide extra height for bricklaying at upper levels."
  },
  {
    id: 'bricklaying-l2-scaffolding10',
    question: "When is ladder work acceptable?",
    options: ["Any height", "Short, light tasks", "Heavy lifting", "Night shifts"],
    correctAnswer: "Short, light tasks",
    explanation: "Ladders are for short-duration light work only, with 3-point contact."
  },
  {
    id: 'bricklaying-l2-scaffolding11',
    question: "What does a red scaffold tag mean?",
    options: ["Inspection due", "Not safe to use", "Light duty only", "Recently altered"],
    correctAnswer: "Not safe to use",
    explanation: "A red tag means the scaffold is incomplete or unsafe."
  },
  {
    id: 'bricklaying-l2-scaffolding12',
    question: "Minimum guardrail height?",
    options: ["450mm", "950mm", "1200mm", "800mm"],
    correctAnswer: "950mm",
    explanation: "Regulations require guardrails to be at least 950mm above the platform."
  },
  {
    id: 'bricklaying-l2-scaffolding13',
    question: "What is PASMA training for?",
    options: ["Step ladders", "Fixed scaffolds", "Mobile towers", "Roof ladders"],
    correctAnswer: "Mobile towers",
    explanation: "PASMA certification is for safe use of mobile access towers."
  },
  {
    id: 'bricklaying-l2-scaffolding14',
    question: "What is the 3T method?",
    options: ["Tie, Test, Train", "Tag, Tension, Time", "Through, Tie, Tension", "Track, Test, Transfer"],
    correctAnswer: "Through, Tie, Tension",
    explanation: "3T describes key scaffold tie methods to ensure stability."
  },
  {
    id: 'bricklaying-l2-scaffolding15',
    question: "Correct ladder angle?",
    options: ["45°", "60°", "75°", "90°"],
    correctAnswer: "75°",
    explanation: "Ladders should be at a 75° angle – 1 out for every 4 up."
  },
  {
    id: 'bricklaying-l2-scaffolding16',
    question: "Who completes scaffold inspection reports?",
    options: ["Any worker", "Site manager", "Competent person", "Supervisor"],
    correctAnswer: "Competent person",
    explanation: "Inspections must be done by someone trained and experienced in scaffold safety."
  },
  {
    id: 'bricklaying-l2-scaffolding17',
    question: "What is a scaffold loading bay?",
    options: ["Storage gap", "Lift zone", "Strengthened area", "Stair area"],
    correctAnswer: "Strengthened area",
    explanation: "Loading bays are reinforced to hold heavier materials safely."
  },
  {
    id: 'bricklaying-l2-scaffolding18',
    question: "First step in fall prevention?",
    options: ["Wear a harness", "Use netting", "Avoid working at height", "Install railings"],
    correctAnswer: "Avoid working at height",
    explanation: "The first step is to avoid work at height altogether, if possible."
  },
  {
    id: 'bricklaying-l2-scaffolding19',
    question: "Purpose of sole plates?",
    options: ["Drain water", "Secure boards", "Spread load", "Stop sinking"],
    correctAnswer: "Spread load",
    explanation: "Sole plates help distribute scaffold load on soft or uneven ground."
  },
  {
    id: 'bricklaying-l2-scaffolding20',
    question: "Why use brick guards?",
    options: ["Keep rain off", "Prevent falls", "Stop debris drop", "Mark brick types"],
    correctAnswer: "Stop debris drop",
    explanation: "Brick guards prevent bricks and tools falling through platform gaps."
  },
  {
    id: 'bricklaying-l2-scaffolding21',
    question: "What is a putlog scaffold?",
    options: ["Mobile scaffold", "Timber structure", "Supported by the wall", "Double platform"],
    correctAnswer: "Supported by the wall",
    explanation: "Putlog scaffolds use the wall to support inner transoms instead of standards."
  },
  {
    id: 'bricklaying-l2-scaffolding22',
    question: "What does TG20 refer to?",
    options: ["Load tag", "Tie type", "Scaffold guide", "Ladder spec"],
    correctAnswer: "Scaffold guide",
    explanation: "TG20 is UK industry guidance for safe tube-and-fitting scaffold design."
  },
  {
    id: 'bricklaying-l2-scaffolding23',
    question: "What is a transom?",
    options: ["Vertical post", "Diagonal brace", "Working board", "Horizontal cross tube"],
    correctAnswer: "Horizontal cross tube",
    explanation: "Transoms run across the scaffold width and support boards."
  },
  {
    id: 'bricklaying-l2-scaffolding24',
    question: "What is an exclusion zone?",
    options: ["Marked off limit area", "Smoking zone", "Tool storage zone", "Load bay"],
    correctAnswer: "Marked off limit area",
    explanation: "Exclusion zones restrict access around scaffold during high-risk work."
  },
  {
    id: 'bricklaying-l2-scaffolding25',
    question: "Key safety check for gin wheels?",
    options: ["Use gloves", "Limit height", "Secure and don’t overload", "Check pulley colour"],
    correctAnswer: "Secure and don’t overload",
    explanation: "Ensure gin wheels are firmly fixed and loads stay within SWL."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-scaffolding', 'items', q.id), {
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
