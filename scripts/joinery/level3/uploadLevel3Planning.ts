// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Planning.ts

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
    id: 'joinery-l3-planning1',
    question: "Which chart is commonly used to show task durations in joinery planning?",
    options: ["Pie chart", "Flowchart", "Gantt chart", "Bar chart"],
    correctAnswer: "Gantt chart",
    explanation: "Gantt charts display task timelines and sequencing, helping track progress and dependencies."
  },
  {
    id: 'joinery-l3-planning2',
    question: "What is the main purpose of a site survey before joinery work begins?",
    options: ["Check weather", "Meet the client", "Assess access and space", "Inspect paintwork"],
    correctAnswer: "Assess access and space",
    explanation: "A site survey confirms measurements, access routes, and restrictions that could affect installation."
  },
  {
    id: 'joinery-l3-planning3',
    question: "Which document outlines the tasks, timeline, and resources for a project?",
    options: ["Design brief", "Risk register", "Project plan", "Timesheet"],
    correctAnswer: "Project plan",
    explanation: "A project plan defines the scope, schedule, resources, and key milestones to guide the team."
  },
  {
    id: 'joinery-l3-planning4',
    question: "What is a float in project scheduling?",
    options: ["Buffer time", "Glue type", "Cost margin", "Waste allowance"],
    correctAnswer: "Buffer time",
    explanation: "Float is unused time within a task’s duration before it affects the project timeline."
  },
  {
    id: 'joinery-l3-planning5',
    question: "What does a work breakdown structure help define?",
    options: ["Holiday dates", "Work roles", "Project tasks", "Site rules"],
    correctAnswer: "Project tasks",
    explanation: "It splits the full job into manageable units to improve planning and tracking."
  },
  {
    id: 'joinery-l3-planning6',
    question: "Which meeting clarifies specifications before work begins?",
    options: ["Handover", "Site briefing", "Pre-contract", "Inspection"],
    correctAnswer: "Pre-contract",
    explanation: "Pre-contract meetings confirm scope, drawings, and terms before starting on site."
  },
  {
    id: 'joinery-l3-planning7',
    question: "What should be listed in a material take-off?",
    options: ["Labour costs", "Client details", "Material types", "Site photos"],
    correctAnswer: "Material types",
    explanation: "It details quantities and types of materials needed for ordering and costing."
  },
  {
    id: 'joinery-l3-planning8',
    question: "What is the key benefit of a resource plan?",
    options: ["Reduces staff", "Lowers taxes", "Avoids delays", "Buys tools"],
    correctAnswer: "Avoids delays",
    explanation: "It ensures people, tools, and materials are available when needed."
  },
  {
    id: 'joinery-l3-planning9',
    question: "Which task is part of project close-out?",
    options: ["Design revision", "Handover", "Invoice query", "Tender submission"],
    correctAnswer: "Handover",
    explanation: "Handover confirms completion and passes documentation and control to the client."
  },
  {
    id: 'joinery-l3-planning10',
    question: "What is the purpose of risk assessment?",
    options: ["List suppliers", "Raise costs", "Prevent hazards", "Control stock"],
    correctAnswer: "Prevent hazards",
    explanation: "Risk assessments help identify and reduce site and workshop dangers."
  },
  {
    id: 'joinery-l3-planning11',
    question: "Why are contingency budgets used?",
    options: ["To cover fines", "For staff gifts", "Handle unknowns", "Buy more vans"],
    correctAnswer: "Handle unknowns",
    explanation: "They provide a buffer for unexpected events, delays, or price rises."
  },
  {
    id: 'joinery-l3-planning12',
    question: "Which role checks joinery work meets standards?",
    options: ["Architect", "Clerk of works", "Electrician", "Planner"],
    correctAnswer: "Clerk of works",
    explanation: "The clerk of works inspects site work and ensures quality compliance."
  },
  {
    id: 'joinery-l3-planning13',
    question: "What must be verified before final installation?",
    options: ["Room paint", "Tea supply", "Site readiness", "Wi-Fi strength"],
    correctAnswer: "Site readiness",
    explanation: "Installation must wait for dry, safe, and prepared conditions."
  },
  {
    id: 'joinery-l3-planning14',
    question: "What is value engineering used for?",
    options: ["Raising prices", "Adding features", "Lowering cost", "Reducing staff"],
    correctAnswer: "Lowering cost",
    explanation: "It finds better-value solutions without compromising performance."
  },
  {
    id: 'joinery-l3-planning15',
    question: "What does a progress meeting track?",
    options: ["Fuel bills", "Paint brands", "Work updates", "Customer ratings"],
    correctAnswer: "Work updates",
    explanation: "Progress meetings monitor work completed and plan the next stage."
  },
  {
    id: 'joinery-l3-planning16',
    question: "What is used to record project delays or changes?",
    options: ["Paint chart", "Meeting notes", "Site diary", "CAD file"],
    correctAnswer: "Site diary",
    explanation: "The site diary logs events, delays, and issues for accountability."
  },
  {
    id: 'joinery-l3-planning17',
    question: "What is a method statement for?",
    options: ["Labour payment", "Storage costs", "Safe work steps", "Office layout"],
    correctAnswer: "Safe work steps",
    explanation: "It explains how tasks will be completed safely and correctly."
  },
  {
    id: 'joinery-l3-planning18',
    question: "What is a snag list?",
    options: ["Site menu", "Work defects", "Supplier names", "Holiday planner"],
    correctAnswer: "Work defects",
    explanation: "Snag lists record outstanding items or defects to fix before handover."
  },
  {
    id: 'joinery-l3-planning19',
    question: "What document details who does what in a project?",
    options: ["Phone list", "Role chart", "Responsibility matrix", "Access permit"],
    correctAnswer: "Responsibility matrix",
    explanation: "It allocates tasks and accountability to avoid confusion."
  },
  {
    id: 'joinery-l3-planning20',
    question: "Which software helps track joinery project tasks?",
    options: ["Design Pro", "Cut Sheet", "MS Project", "Sketch Up"],
    correctAnswer: "MS Project",
    explanation: "It helps schedule, track, and report on job progress efficiently."
  },
  {
    id: 'joinery-l3-planning21',
    question: "Why is a logistics plan important?",
    options: ["List meetings", "Save photos", "Manage deliveries", "Track payments"],
    correctAnswer: "Manage deliveries",
    explanation: "It schedules transport, storage, and unloading to avoid disruption."
  },
  {
    id: 'joinery-l3-planning22',
    question: "What is earned value used to assess?",
    options: ["Wages", "Progress", "Safety", "Overtime"],
    correctAnswer: "Progress",
    explanation: "It compares planned vs actual work and cost to monitor performance."
  },
  {
    id: 'joinery-l3-planning23',
    question: "What is a milestone in a schedule?",
    options: ["Key event", "Job title", "Large stone", "Cost plan"],
    correctAnswer: "Key event",
    explanation: "Milestones highlight critical dates or phase completions."
  },
  {
    id: 'joinery-l3-planning24',
    question: "Why should tasks be sequenced logically?",
    options: ["Save tea breaks", "Avoid delays", "Cut corners", "Lower cost"],
    correctAnswer: "Avoid delays",
    explanation: "Task order affects access, efficiency, and handover timelines."
  },
  {
    id: 'joinery-l3-planning25',
    question: "What must be confirmed before ordering bespoke joinery?",
    options: ["Lunch menu", "Wall colour", "Final dimensions", "Brand of glue"],
    correctAnswer: "Final dimensions",
    explanation: "Correct sizes prevent manufacturing errors and wasted time."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-planning', 'items', q.id), {
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
