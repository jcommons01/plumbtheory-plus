// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2HealthSafety.ts

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

// ✅ Rewritten Questions: Bricklaying L2 – Health & Safety
const questions = [
  {
    id: 'bricklaying-l2-health-safety1',
    question: "What is the main aim of CDM 2015?",
    options: ["To plan site layouts", "To manage safety during construction", "To approve brick types", "To design floor plans"],
    correctAnswer: "To manage safety during construction",
    explanation: "CDM 2015 ensures safety is considered at all stages of a construction project."
  },
  {
    id: 'bricklaying-l2-health-safety2',
    question: "What is a 'near miss' on site?",
    options: ["A minor injury", "An unsafe act with no harm", "A tool left behind", "A false fire alarm"],
    correctAnswer: "An unsafe act with no harm",
    explanation: "A near miss is a warning sign that an incident almost happened and must be reported."
  },
  {
    id: 'bricklaying-l2-health-safety3',
    question: "Why do we carry out risk assessments?",
    options: ["To plan holidays", "To reduce costs", "To identify and control hazards", "To record attendance"],
    correctAnswer: "To identify and control hazards",
    explanation: "Risk assessments help prevent harm by managing risks on site."
  },
  {
    id: 'bricklaying-l2-health-safety4',
    question: "What does PPE stand for?",
    options: ["Private Property Entry", "Personal Protective Equipment", "Public Protection Effort", "Practical Planning Exercise"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE includes gear like gloves, goggles and boots to reduce site injuries."
  },
  {
    id: 'bricklaying-l2-health-safety5',
    question: "What health risk comes from cutting bricks?",
    options: ["Skin rash", "Silica dust", "Back pain", "Hearing loss"],
    correctAnswer: "Silica dust",
    explanation: "Silica dust is harmful when inhaled and can cause lung disease."
  },
  {
    id: 'bricklaying-l2-health-safety6',
    question: "What is the purpose of a method statement?",
    options: ["To price the job", "To detail safe working steps", "To list tool sizes", "To order materials"],
    correctAnswer: "To detail safe working steps",
    explanation: "Method statements explain how a task will be carried out safely."
  },
  {
    id: 'bricklaying-l2-health-safety7',
    question: "What is the max lift weight for adult males under ideal conditions?",
    options: ["15kg", "20kg", "25kg", "30kg"],
    correctAnswer: "25kg",
    explanation: "25kg is the upper guideline for safe lifting by adult males."
  },
  {
    id: 'bricklaying-l2-health-safety8',
    question: "What should you do with faulty equipment?",
    options: ["Use it slowly", "Tag and report it", "Give it to someone else", "Leave it in storage"],
    correctAnswer: "Tag and report it",
    explanation: "Faulty tools should be removed from use and reported immediately."
  },
  {
    id: 'bricklaying-l2-health-safety9',
    question: "Which symptom may suggest HAVS?",
    options: ["Cold fingers", "Blurred vision", "Sore knees", "Headaches"],
    correctAnswer: "Cold fingers",
    explanation: "HAVS causes poor blood flow and tingling in hands or fingers."
  },
  {
    id: 'bricklaying-l2-health-safety10',
    question: "What is the purpose of a toolbox talk?",
    options: ["To change site rules", "To hand out tools", "To share safety advice", "To record clock-in times"],
    correctAnswer: "To share safety advice",
    explanation: "Toolbox talks give quick safety updates or task-specific guidance."
  },
  {
    id: 'bricklaying-l2-health-safety11',
    question: "What’s the first step after a serious accident?",
    options: ["Write a report", "Call for help", "Take a photo", "Finish the task"],
    correctAnswer: "Call for help",
    explanation: "Call emergency services and make the area safe."
  },
  {
    id: 'bricklaying-l2-health-safety12',
    question: "What must you check before using a chemical?",
    options: ["The cost", "The expiry date", "The safety data sheet", "The smell"],
    correctAnswer: "The safety data sheet",
    explanation: "The data sheet and COSHH assessment show how to use chemicals safely."
  },
  {
    id: 'bricklaying-l2-health-safety13',
    question: "Why is an accident book important?",
    options: ["To plan pay rises", "To record site tasks", "To legally log injuries", "To track holidays"],
    correctAnswer: "To legally log injuries",
    explanation: "The accident book provides a record and helps prevent future harm."
  },
  {
    id: 'bricklaying-l2-health-safety14',
    question: "What does HAVS stand for?",
    options: ["Hazard and Vibration Signal", "Hand-Arm Vibration Syndrome", "Health and Vitality Standard", "High Area Ventilation System"],
    correctAnswer: "Hand-Arm Vibration Syndrome",
    explanation: "HAVS is a condition caused by regular use of vibrating tools."
  },
  {
    id: 'bricklaying-l2-health-safety15',
    question: "What does NOT help prevent heat stress?",
    options: ["Shaded breaks", "Loose clothing", "Water intake", "Energy drinks"],
    correctAnswer: "Energy drinks",
    explanation: "Water prevents dehydration. Energy drinks can make it worse."
  },
  {
    id: 'bricklaying-l2-health-safety16',
    question: "Which extinguisher is safe for electrical fires?",
    options: ["Water", "CO2", "Foam", "Wet chemical"],
    correctAnswer: "CO2",
    explanation: "CO2 doesn’t conduct electricity and is used for electrical fires."
  },
  {
    id: 'bricklaying-l2-health-safety17',
    question: "Why wear a harness at height?",
    options: ["To lift materials", "To stop a fall", "To store tools", "To stay warm"],
    correctAnswer: "To stop a fall",
    explanation: "A harness connects to an anchor and prevents a fall from height."
  },
  {
    id: 'bricklaying-l2-health-safety18',
    question: "When must a broken arm be reported under RIDDOR?",
    options: ["Within 3 days", "Within 7 days", "Within 24 hours", "Immediately"],
    correctAnswer: "Immediately",
    explanation: "Serious injuries like fractures must be reported straight away."
  },
  {
    id: 'bricklaying-l2-health-safety19',
    question: "What risk comes from wet cement?",
    options: ["Shock", "Skin burns", "Hearing loss", "Trips"],
    correctAnswer: "Skin burns",
    explanation: "Wet cement is alkaline and can cause skin irritation or burns."
  },
  {
    id: 'bricklaying-l2-health-safety20',
    question: "Why use a permit-to-work system?",
    options: ["To hire labour", "To control risky jobs", "To book training", "To order PPE"],
    correctAnswer: "To control risky jobs",
    explanation: "Permits ensure high-risk tasks are properly planned and approved."
  },
  {
    id: 'bricklaying-l2-health-safety21',
    question: "What is NOT a legal duty of workers?",
    options: ["Wearing PPE", "Reporting hazards", "Following training", "Buying PPE"],
    correctAnswer: "Buying PPE",
    explanation: "Employers must provide PPE. Workers must use it responsibly."
  },
  {
    id: 'bricklaying-l2-health-safety22',
    question: "What should you check before using a ladder?",
    options: ["Height", "Colour", "Stability and angle", "Brand"],
    correctAnswer: "Stability and angle",
    explanation: "Ladders must be secure, undamaged and set at a 75° angle."
  },
  {
    id: 'bricklaying-l2-health-safety23',
    question: "What is the point of a site induction?",
    options: ["To meet the team", "To learn about hazards and rules", "To choose PPE colours", "To find parking spots"],
    correctAnswer: "To learn about hazards and rules",
    explanation: "Inductions cover key safety rules, risks and emergency procedures."
  },
  {
    id: 'bricklaying-l2-health-safety24',
    question: "What should you do if asbestos is found?",
    options: ["Ignore it", "Spray it", "Stop and report", "Cover it with bricks"],
    correctAnswer: "Stop and report",
    explanation: "Asbestos is dangerous. Work must stop and be reported immediately."
  },
  {
    id: 'bricklaying-l2-health-safety25',
    question: "What is the role of the Construction Phase Plan?",
    options: ["To manage deliveries", "To list wages", "To control site safety", "To order bricks"],
    correctAnswer: "To control site safety",
    explanation: "The CPP shows how safety will be managed during construction."
  }
];

// ✅ Upload to Firestore
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-health-safety', 'items', q.id), {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      });
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

uploadQuestions();
