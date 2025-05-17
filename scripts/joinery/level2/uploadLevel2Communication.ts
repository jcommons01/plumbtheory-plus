// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2Communication.ts

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

// ✅ Joinery Level 2 Communication & Documentation Questions
const questions = [
  {
    id: 'joinery-l2-communication1',
    question: "What is typically included in a drawing title block?",
    options: ["Drawing title, date, scale and drafter", "Client details, tool list and waste method", "Workshop layout, fire exit plan and deadlines", "Material weight, moisture content and speed"],
    correctAnswer: "Drawing title, date, scale and drafter",
    explanation: "Title blocks provide essential reference information for managing technical drawings."
  },
  {
    id: 'joinery-l2-communication2',
    question: "What does a scale of 1:20 mean on a drawing?",
    options: ["Each metre equals 20 pixels", "The object is 20 times bigger than drawn", "One unit on the page equals 20 units real size", "It refers to temperature range for finishes"],
    correctAnswer: "One unit on the page equals 20 units real size",
    explanation: "A 1:20 scale means that every unit on the drawing represents 20 of the same unit in real life."
  },
  {
    id: 'joinery-l2-communication3',
    question: "What does NTS mean on a construction drawing?",
    options: ["No Technical Standard", "Not To Scale", "Nominal Timber Spacing", "Needs Technical Sketch"],
    correctAnswer: "Not To Scale",
    explanation: "NTS indicates that the drawing cannot be measured using a physical scale."
  },
  {
    id: 'joinery-l2-communication4',
    question: "What is the main purpose of a Method Statement?",
    options: ["Describe how work will be safely carried out", "List prices for joinery components", "Record quality inspection results", "Summarise material usage data"],
    correctAnswer: "Describe how work will be safely carried out",
    explanation: "Method Statements provide safe, step-by-step instructions for completing specific tasks."
  },
  {
    id: 'joinery-l2-communication5',
    question: "What is recorded in a site diary?",
    options: ["Employee payroll details", "Tool purchase receipts", "Daily events and site activity", "Material delivery costs"],
    correctAnswer: "Daily events and site activity",
    explanation: "Site diaries log events, issues and decisions as a formal daily record."
  },
  {
    id: 'joinery-l2-communication6',
    question: "What does a transmittal form confirm?",
    options: ["That a document or sample has been sent", "That a tool has been inspected", "That an invoice has been paid", "That a material has been approved"],
    correctAnswer: "That a document or sample has been sent",
    explanation: "Transmittals create a formal record of items issued, including date and recipient."
  },
  {
    id: 'joinery-l2-communication7',
    question: "What is the purpose of a job card in a joinery workshop?",
    options: ["Track deliveries of goods", "Control access to power tools", "Monitor worker attendance", "Record job details and progress"],
    correctAnswer: "Record job details and progress",
    explanation: "Job cards contain essential information about the work being done and its status."
  },
  {
    id: 'joinery-l2-communication8',
    question: "Which drawing type shows a vertical face of a building?",
    options: ["Plan", "Elevation", "Perspective", "Section"],
    correctAnswer: "Elevation",
    explanation: "Elevations display flat views of building faces, typically from the front or side."
  },
  {
    id: 'joinery-l2-communication9',
    question: "What is a snagging list used for?",
    options: ["List safety equipment", "Record incomplete or faulty work", "Schedule staff holidays", "Track timber deliveries"],
    correctAnswer: "Record incomplete or faulty work",
    explanation: "Snagging lists identify final issues needing correction before sign-off."
  },
  {
    id: 'joinery-l2-communication10',
    question: "What is a 'schedule' in joinery documentation?",
    options: ["A list of planned staff breaks", "A delivery tracking system", "A table showing item specifications", "A tax return summary"],
    correctAnswer: "A table showing item specifications",
    explanation: "Schedules are structured lists detailing components, locations and requirements."
  },
  {
    id: 'joinery-l2-communication11',
    question: "What does an RFI stand for in construction?",
    options: ["Ready for Installation", "Request for Information", "Refused for Inspection", "Required Finishing Instruction"],
    correctAnswer: "Request for Information",
    explanation: "An RFI seeks clarification when project details are unclear or incomplete."
  },
  {
    id: 'joinery-l2-communication12',
    question: "What should a sample label include?",
    options: ["Joiner’s address and pay", "Material spec, date and finish", "Tool sizes and battery levels", "Estimated total project value"],
    correctAnswer: "Material spec, date and finish",
    explanation: "Labels should clearly identify the content and purpose of any submitted sample."
  },
  {
    id: 'joinery-l2-communication13',
    question: "What does 'as-built' mean on a drawing?",
    options: ["Based on an older project", "Drawn from client imagination", "Shows how it was actually built", "Used only during design stage"],
    correctAnswer: "Shows how it was actually built",
    explanation: "As-built drawings reflect the completed work with all final changes included."
  },
  {
    id: 'joinery-l2-communication14',
    question: "What is shown in a plan view drawing?",
    options: ["Top-down view", "Side elevation", "Cut section", "Electrical diagram"],
    correctAnswer: "Top-down view",
    explanation: "Plans show the layout as viewed from above, often including measurements."
  },
  {
    id: 'joinery-l2-communication15',
    question: "Which document defines joinery material standards and installation methods?",
    options: ["Invoice", "Specification", "Tender", "Quotation"],
    correctAnswer: "Specification",
    explanation: "Specifications outline the required materials, finishes and construction standards."
  },
  {
    id: 'joinery-l2-communication16',
    question: "Why is version control important in drawings?",
    options: ["Shows who completed each task", "Protects designs from theft", "Tracks changes to drawings", "Manages file storage"],
    correctAnswer: "Tracks changes to drawings",
    explanation: "Version control ensures everyone uses the most recent and approved drawings."
  },
  {
    id: 'joinery-l2-communication17',
    question: "What does a dotted line on a drawing typically represent?",
    options: ["Fire exit", "Hidden object", "Ceiling light", "Waste pipe"],
    correctAnswer: "Hidden object",
    explanation: "Dashed or dotted lines usually indicate elements not visible in the current view."
  },
  {
    id: 'joinery-l2-communication18',
    question: "What is the purpose of a handover file?",
    options: ["Request payment", "List missed work", "Transfer project records", "Schedule overtime"],
    correctAnswer: "Transfer project records",
    explanation: "Handover files include warranties, instructions and relevant construction documents."
  },
  {
    id: 'joinery-l2-communication19',
    question: "What is a shop drawing used for?",
    options: ["Final pricing", "Manufacturing guidance", "Marketing brochure", "Design sketch"],
    correctAnswer: "Manufacturing guidance",
    explanation: "Shop drawings provide exact construction details for fabrication and assembly."
  },
  {
    id: 'joinery-l2-communication20',
    question: "What should be done if a major safety issue is found on site?",
    options: ["Ignore it if the job is urgent", "Write a note and review later", "Report it immediately", "Only tell a friend"],
    correctAnswer: "Report it immediately",
    explanation: "All safety issues must be reported straight away to prevent harm or legal issues."
  },
  {
    id: 'joinery-l2-communication21',
    question: "What is a tender document?",
    options: ["Invoice for payment", "Work permit request", "Contractor’s bid offer", "Site risk report"],
    correctAnswer: "Contractor’s bid offer",
    explanation: "Tender documents include pricing and proposals submitted in response to a project invitation."
  },
  {
    id: 'joinery-l2-communication22',
    question: "What should be included in a technical submittal?",
    options: ["Holiday rota", "Waste register", "Product data", "Petty cash log"],
    correctAnswer: "Product data",
    explanation: "Technical submittals provide product specifications for client or designer approval."
  },
  {
    id: 'joinery-l2-communication23',
    question: "When should a pre-start meeting take place?",
    options: ["After completion", "Before installation begins", "At lunch break", "During client sign-off"],
    correctAnswer: "Before installation begins",
    explanation: "Pre-start meetings align everyone on tasks, roles, and responsibilities from the outset."
  },
  {
    id: 'joinery-l2-communication24',
    question: "What is the main purpose of a drawing legend?",
    options: ["Record drawing history", "Explain symbols", "List contractors", "Show contract price"],
    correctAnswer: "Explain symbols",
    explanation: "Legends define all symbols, patterns and abbreviations used in the drawing."
  },
  {
    id: 'joinery-l2-communication25',
    question: "What is a variation order used for?",
    options: ["Describe tool safety", "Explain missed targets", "Confirm change to scope", "Request more fuel"],
    correctAnswer: "Confirm change to scope",
    explanation: "Variation orders formally document approved changes to the original plan or contract."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-communication', 'items', q.id), {
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
