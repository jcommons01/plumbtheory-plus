// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3TechnicalCommunication.ts

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

// ✅ Joinery Level 3 Technical Communication – 25 Regenerated Questions (Balanced Answers)
const questions = [
  {
    id: 'joinery-l3-techcomm-1',
    question: "What does a title block typically include?",
    options: ["Page number", "Drawing details", "Door type", "Nail size"],
    correctAnswer: "Drawing details",
    explanation: "A title block provides key information such as drawing title, date, author, and revision status."
  },
  {
    id: 'joinery-l3-techcomm-2',
    question: "What is the use of a section view?",
    options: ["Show outer finish", "Hide extra notes", "Reveal internal parts", "Display colours used"],
    correctAnswer: "Reveal internal parts",
    explanation: "Section views cut through objects to show details hidden in other projections."
  },
  {
    id: 'joinery-l3-techcomm-3',
    question: "What is an exploded view used for?",
    options: ["Add colour", "Measure height", "Show assembly steps", "Mark labels"],
    correctAnswer: "Show assembly steps",
    explanation: "Exploded views show parts spaced out to clarify how components fit together."
  },
  {
    id: 'joinery-l3-techcomm-4',
    question: "What does 'NTS' mean on a drawing?",
    options: ["No timber shown", "Not To Scale", "New tool sheet", "Nominal thickness stated"],
    correctAnswer: "Not To Scale",
    explanation: "NTS indicates the drawing should not be measured directly due to scale issues."
  },
  {
    id: 'joinery-l3-techcomm-5',
    question: "Which line type shows hidden details?",
    options: ["Dotted", "Dashed", "Solid", "Double"],
    correctAnswer: "Dashed",
    explanation: "Dashed lines represent edges not visible from the current view."
  },
  {
    id: 'joinery-l3-techcomm-6',
    question: "Why are tolerances specified?",
    options: ["Show price", "Limit errors", "Track waste", "Mark joints"],
    correctAnswer: "Limit errors",
    explanation: "Tolerances define acceptable measurement variation in manufacturing."
  },
  {
    id: 'joinery-l3-techcomm-7',
    question: "What is a datum point used for?",
    options: ["Start measuring", "Fix panels", "Mark defects", "Track weight"],
    correctAnswer: "Start measuring",
    explanation: "Datum points act as the reference for all dimensions on a drawing."
  },
  {
    id: 'joinery-l3-techcomm-8',
    question: "What is a cutting list?",
    options: ["Delivery log", "Waste log", "Part sizes", "Fixing guide"],
    correctAnswer: "Part sizes",
    explanation: "A cutting list provides dimensions and quantities of each joinery part."
  },
  {
    id: 'joinery-l3-techcomm-9',
    question: "What does a centreline indicate?",
    options: ["Top face", "Middle point", "Edge line", "Hidden area"],
    correctAnswer: "Middle point",
    explanation: "Centrelines locate symmetry or hole positions on components."
  },
  {
    id: 'joinery-l3-techcomm-10',
    question: "What does scale 1:2 mean?",
    options: ["Half size", "Double height", "Twice width", "Quarter scale"],
    correctAnswer: "Half size",
    explanation: "A 1:2 scale means 1 unit on paper equals 2 units in reality."
  },
  {
    id: 'joinery-l3-techcomm-11',
    question: "What is a general arrangement drawing?",
    options: ["Cost sheet", "Project timeline", "Layout plan", "Site map"],
    correctAnswer: "Layout plan",
    explanation: "GA drawings show component positions in relation to each other."
  },
  {
    id: 'joinery-l3-techcomm-12',
    question: "What is a revision cloud for?",
    options: ["Group symbols", "Show changes", "Add labels", "Hide defects"],
    correctAnswer: "Show changes",
    explanation: "Revision clouds highlight altered areas between drawing versions."
  },
  {
    id: 'joinery-l3-techcomm-13',
    question: "What is the role of a legend?",
    options: ["Add notes", "Mark title", "Explain symbols", "List prices"],
    correctAnswer: "Explain symbols",
    explanation: "Legends decode abbreviations and symbols used in the drawing."
  },
  {
    id: 'joinery-l3-techcomm-14',
    question: "Why are isometric views useful?",
    options: ["Show 3D shape", "Speed up printing", "Save space", "Avoid detail"],
    correctAnswer: "Show 3D shape",
    explanation: "Isometric views show depth and layout without distortion."
  },
  {
    id: 'joinery-l3-techcomm-15',
    question: "What is a method statement?",
    options: ["Risk plan", "Work steps", "Tool guide", "Cutting list"],
    correctAnswer: "Work steps",
    explanation: "Method statements outline the safe and proper way to do tasks."
  },
  {
    id: 'joinery-l3-techcomm-16',
    question: "What does BS 8888 relate to?",
    options: ["UK drawings", "Timber code", "Tool types", "Frame weight"],
    correctAnswer: "UK drawings",
    explanation: "BS 8888 sets standards for UK technical drawings and notes."
  },
  {
    id: 'joinery-l3-techcomm-17',
    question: "What is a submittal used for?",
    options: ["Log defects", "Approve details", "Print schedules", "Check wages"],
    correctAnswer: "Approve details",
    explanation: "Submittals present materials or drawings for approval before work."
  },
  {
    id: 'joinery-l3-techcomm-18',
    question: "What does TBC mean?",
    options: ["Timber block cut", "To Be Confirmed", "Top base cover", "Template bolt code"],
    correctAnswer: "To Be Confirmed",
    explanation: "TBC indicates information is not final and will be updated later."
  },
  {
    id: 'joinery-l3-techcomm-19',
    question: "What is a door schedule?",
    options: ["Layout plan", "Price chart", "Door data", "Key list"],
    correctAnswer: "Door data",
    explanation: "A door schedule lists size, type, finish, and hardware needed."
  },
  {
    id: 'joinery-l3-techcomm-20',
    question: "What does CAD stand for?",
    options: ["Cut And Draw", "Computer-Aided Design", "Construction Area Diagram", "Clean And Dry"],
    correctAnswer: "Computer-Aided Design",
    explanation: "CAD refers to software used to create detailed digital drawings."
  },
  {
    id: 'joinery-l3-techcomm-21',
    question: "What does a schedule provide?",
    options: ["List of rooms", "Start date", "Item table", "Site plan"],
    correctAnswer: "Item table",
    explanation: "Schedules are tables that organise repeated drawing elements."
  },
  {
    id: 'joinery-l3-techcomm-22',
    question: "What is a legend in a drawing?",
    options: ["Glossary", "Symbol key", "Design rule", "Price list"],
    correctAnswer: "Symbol key",
    explanation: "A legend acts as a guide to the symbols used in the drawing."
  },
  {
    id: 'joinery-l3-techcomm-23',
    question: "What is a transmittal for?",
    options: ["Send info", "Update tools", "Mark holes", "Count labour"],
    correctAnswer: "Send info",
    explanation: "A transmittal records what information was sent and to whom."
  },
  {
    id: 'joinery-l3-techcomm-24',
    question: "What is a quality checklist for?",
    options: ["Fix costs", "Check items", "Track orders", "Save drawings"],
    correctAnswer: "Check items",
    explanation: "Checklists ensure each item meets required standards."
  },
  {
    id: 'joinery-l3-techcomm-25',
    question: "What does EQ. mean on drawings?",
    options: ["Equal parts", "Earthquake zone", "Edge quality", "Edge quote"],
    correctAnswer: "Equal parts",
    explanation: "EQ. means a space or object should be divided evenly."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-technical-communication', 'items', q.id), {
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
