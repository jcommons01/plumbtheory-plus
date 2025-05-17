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

// ✅ Bricklaying Level 3 Planning & Organising Work Questions
const questions = [
  {
    id: 'bricklaying-l3-planning-1',
    question: "What does a Gantt chart display in project planning?",
    options: ["Cost estimates", "Material sources", "Task timelines", "Worker breaks"],
    correctAnswer: "Task timelines",
    explanation: "Gantt charts are used to visualise task durations and sequences over time, helping plan and monitor construction progress."
  },
  {
    id: 'bricklaying-l3-planning-2',
    question: "What is the main function of a method statement?",
    options: ["Track material usage", "Outline safe work methods", "Show shift schedules", "Detail weather reports"],
    correctAnswer: "Outline safe work methods",
    explanation: "Method statements explain how tasks will be carried out safely, identifying hazards, control measures, and procedural steps."
  },
  {
    id: 'bricklaying-l3-planning-3',
    question: "What does 'float' represent in a project schedule?",
    options: ["Worker lunch time", "Free parking period", "Activity flexibility", "Brick soaking time"],
    correctAnswer: "Activity flexibility",
    explanation: "Float refers to how long an activity can be delayed without affecting the project's end date, offering scheduling flexibility."
  },
  {
    id: 'bricklaying-l3-planning-4',
    question: "Why is buildability reviewed during planning?",
    options: ["To reduce paperwork", "To ease site access", "To improve construction ease", "To hire new staff"],
    correctAnswer: "To improve construction ease",
    explanation: "Assessing buildability helps identify practical issues and ensures that designs can be executed efficiently and safely."
  },
  {
    id: 'bricklaying-l3-planning-5',
    question: "What is the goal of resource levelling?",
    options: ["Lower wages", "Delay orders", "Balance usage", "Speed up tasks"],
    correctAnswer: "Balance usage",
    explanation: "Resource levelling adjusts task timing to avoid peaks and troughs in resource demands while maintaining efficient progress."
  },
  {
    id: 'bricklaying-l3-planning-6',
    question: "What should a site layout plan show?",
    options: ["Payroll details", "Waste zones", "Material positions", "Meeting minutes"],
    correctAnswer: "Material positions",
    explanation: "Site layout plans indicate the locations of materials, equipment, and site access to ensure a safe and efficient workflow."
  },
  {
    id: 'bricklaying-l3-planning-7',
    question: "Which document outlines health and safety for the construction phase?",
    options: ["Site diary", "Design brief", "Phase plan", "Planning form"],
    correctAnswer: "Phase plan",
    explanation: "The construction phase plan outlines how health and safety will be managed for all on-site activities during the build."
  },
  {
    id: 'bricklaying-l3-planning-8',
    question: "Why are look-ahead schedules useful?",
    options: ["Lower insurance", "Control noise", "Manage short-term tasks", "Avoid overtime"],
    correctAnswer: "Manage short-term tasks",
    explanation: "Look-ahead schedules focus on upcoming activities in detail, allowing for better coordination and resource planning."
  },
  {
    id: 'bricklaying-l3-planning-9',
    question: "What does a labour histogram show?",
    options: ["Brick types", "Time sheets", "Worker numbers", "Tool hire"],
    correctAnswer: "Worker numbers",
    explanation: "A labour histogram visualises workforce levels across a project's duration to highlight demand and assist planning."
  },
  {
    id: 'bricklaying-l3-planning-10',
    question: "What is the critical path in scheduling?",
    options: ["Shortest road", "Longest task", "Sequence with zero float", "Safety process"],
    correctAnswer: "Sequence with zero float",
    explanation: "The critical path consists of tasks that directly affect project duration and must not be delayed without impacting deadlines."
  },
  {
    id: 'bricklaying-l3-planning-11',
    question: "What is a milestone in a project plan?",
    options: ["Time for lunch", "Design review", "Key event", "Wall template"],
    correctAnswer: "Key event",
    explanation: "Milestones are key events marking the completion of significant stages or deliverables within a project timeline."
  },
  {
    id: 'bricklaying-l3-planning-12',
    question: "What is included in a trade package?",
    options: ["Travel plan", "Payment list", "Scope of work", "Job advert"],
    correctAnswer: "Scope of work",
    explanation: "A trade package details the responsibilities, materials, and standards required for a specific subcontracted trade."
  },
  {
    id: 'bricklaying-l3-planning-13',
    question: "What is a procurement schedule used for?",
    options: ["Hire staff", "Book holidays", "Order materials", "Check mail"],
    correctAnswer: "Order materials",
    explanation: "The procurement schedule ensures that materials and equipment are ordered and delivered in line with project needs."
  },
  {
    id: 'bricklaying-l3-planning-14',
    question: "What is front-loading in scheduling?",
    options: ["Placing bricks in front", "Delaying work", "Starting more tasks early", "Moving tools forward"],
    correctAnswer: "Starting more tasks early",
    explanation: "Front-loading means scheduling early progress on key tasks to build buffer time and reduce overall project risk."
  },
  {
    id: 'bricklaying-l3-planning-15',
    question: "What is fast-tracking in project delivery?",
    options: ["Buying tools fast", "Skipping health checks", "Overlapping tasks", "Building on weekends"],
    correctAnswer: "Overlapping tasks",
    explanation: "Fast-tracking involves executing tasks in parallel that are usually done in sequence, to accelerate project completion."
  },
  {
    id: 'bricklaying-l3-planning-16',
    question: "Why are method statements important?",
    options: ["Replace drawings", "Track delays", "Ensure safe practice", "Buy equipment"],
    correctAnswer: "Ensure safe practice",
    explanation: "Method statements promote safety and consistency by clearly detailing how a task will be carried out under control measures."
  },
  {
    id: 'bricklaying-l3-planning-17',
    question: "What is the aim of value engineering?",
    options: ["Cut wages", "Boost profit", "Improve value", "Delay spending"],
    correctAnswer: "Improve value",
    explanation: "Value engineering assesses function and cost to optimise materials, design, and methods without compromising quality."
  },
  {
    id: 'bricklaying-l3-planning-18',
    question: "What does a snag list record?",
    options: ["Tool losses", "Design issues", "Work defects", "Staff breaks"],
    correctAnswer: "Work defects",
    explanation: "Snag lists identify incomplete or defective work that must be resolved before final project handover to the client."
  },
  {
    id: 'bricklaying-l3-planning-19',
    question: "What is a work breakdown structure?",
    options: ["Wall design", "Site address", "Project scope split", "Brick code"],
    correctAnswer: "Project scope split",
    explanation: "A work breakdown structure breaks the project into smaller tasks to aid planning, costing, and monitoring progress."
  },
  {
    id: 'bricklaying-l3-planning-20',
    question: "Why are pre-start meetings held?",
    options: ["Plan lunch", "Brief workers", "Inspect tools", "Test cement"],
    correctAnswer: "Brief workers",
    explanation: "Pre-start meetings clarify site rules, work expectations, and safety measures before construction begins."
  },
  {
    id: 'bricklaying-l3-planning-21',
    question: "What is a variation order?",
    options: ["New design", "Change request", "Cost summary", "Holiday note"],
    correctAnswer: "Change request",
    explanation: "Variation orders formally record agreed changes to the work, often affecting cost or duration."
  },
  {
    id: 'bricklaying-l3-planning-22',
    question: "What does earned value analysis compare?",
    options: ["Shift times", "Designs", "Progress vs cost", "Wall height"],
    correctAnswer: "Progress vs cost",
    explanation: "Earned value analysis tracks actual performance against planned cost and schedule to measure progress objectively."
  },
  {
    id: 'bricklaying-l3-planning-23',
    question: "What is a holding point?",
    options: ["Worker pause", "Site fence", "Inspection stage", "Office desk"],
    correctAnswer: "Inspection stage",
    explanation: "Holding points are checkpoints where work pauses until inspections are passed to maintain quality control."
  },
  {
    id: 'bricklaying-l3-planning-24',
    question: "What is meant by interfaces in construction?",
    options: ["Data screens", "Join points", "Transport apps", "Wall finishes"],
    correctAnswer: "Join points",
    explanation: "Interfaces are where different trades or work packages meet, requiring coordination to avoid clashes and delays."
  },
  {
    id: 'bricklaying-l3-planning-25',
    question: "Why track productivity in bricklaying?",
    options: ["Cut wages", "Fire staff", "Improve output", "Sell bricks"],
    correctAnswer: "Improve output",
    explanation: "Tracking productivity helps identify inefficiencies, set realistic targets, and improve planning for future jobs."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-planning', 'items', q.id), {
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
