// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2HealthSafety.ts

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

// ✅ Joinery Level 2 Health & Safety in Construction Questions
const questions = [
  {
    id: 'joinery-l2-health-safety1',
    question: "Who is legally responsible for health and safety on site?",
    options: ["Everyone including the employer and workers", "Only the health and safety officer", "Only the site manager", "Just the subcontractors"],
    correctAnswer: "Everyone including the employer and workers",
    explanation: "Employers hold overall responsibility, but workers must also follow safety rules."
  },
  {
    id: 'joinery-l2-health-safety2',
    question: "What is the aim of a risk assessment?",
    options: ["To minimise hazards through control measures", "To select which staff are at fault", "To plan the job layout", "To price the job more accurately"],
    correctAnswer: "To minimise hazards through control measures",
    explanation: "Risk assessments identify hazards and outline how to reduce associated risks."
  },
  {
    id: 'joinery-l2-health-safety3',
    question: "What does PPE stand for?",
    options: ["Personal Protective Equipment", "Planned Project Evaluation", "Pressure Powered Extractor", "Permanent Positioning Element"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE includes protective clothing and equipment to reduce exposure to hazards."
  },
  {
    id: 'joinery-l2-health-safety4',
    question: "Which colour sign indicates a prohibition action?",
    options: ["Red with a diagonal line", "Blue with a white symbol", "Green with a tick", "Yellow with black text"],
    correctAnswer: "Red with a diagonal line",
    explanation: "Red signs with diagonal lines signal actions that are forbidden on site."
  },
  {
    id: 'joinery-l2-health-safety5',
    question: "Which control best reduces wood dust exposure?",
    options: ["Local extraction system", "Keeping the windows open", "Wearing sandals", "Using larger machines"],
    correctAnswer: "Local extraction system",
    explanation: "Dust extraction systems remove harmful particles at the source of creation."
  },
  {
    id: 'joinery-l2-health-safety6',
    question: "What does COSHH regulate?",
    options: ["Hazardous substances", "Timber grades", "Employee taxes", "Shift lengths"],
    correctAnswer: "Hazardous substances",
    explanation: "COSHH ensures chemicals and dusts are used safely in the workplace."
  },
  {
    id: 'joinery-l2-health-safety7',
    question: "What should be done with damaged equipment?",
    options: ["Remove it from use and report it", "Use it until parts arrive", "Ignore the damage", "Pass it to the next worker"],
    correctAnswer: "Remove it from use and report it",
    explanation: "Defective tools must be taken out of service to prevent harm."
  },
  {
    id: 'joinery-l2-health-safety8',
    question: "What does RIDDOR require?",
    options: ["Reporting dangerous incidents", "Checking time sheets", "Recycling old plans", "Recording weather conditions"],
    correctAnswer: "Reporting dangerous incidents",
    explanation: "RIDDOR ensures accidents and near misses are properly recorded."
  },
  {
    id: 'joinery-l2-health-safety9',
    question: "What is the main fire risk in a joinery shop?",
    options: ["Accumulated wood dust", "Fresh paint on walls", "Loud noise from tools", "Open doors in cold weather"],
    correctAnswer: "Accumulated wood dust",
    explanation: "Fine wood dust is flammable and must be managed safely."
  },
  {
    id: 'joinery-l2-health-safety10',
    question: "Which mask provides the best protection from fine dust?",
    options: ["FFP3 disposable mask", "Paper towel wrap", "Surgical face mask", "Cotton scarf"],
    correctAnswer: "FFP3 disposable mask",
    explanation: "FFP3 masks offer high filtration, ideal for hazardous dust."
  },
  {
    id: 'joinery-l2-health-safety11',
    question: "What sign is used to indicate a trip hazard?",
    options: ["Yellow triangle with exclamation mark", "Red square with arrow", "Blue circle with flame", "Green square with footpath"],
    correctAnswer: "Yellow triangle with exclamation mark",
    explanation: "Warning signs use yellow triangles to alert to hazards like trips."
  },
  {
    id: 'joinery-l2-health-safety12',
    question: "What is the preferred top-level safety control?",
    options: ["Elimination of the hazard", "Using PPE", "Job rotation", "Working in silence"],
    correctAnswer: "Elimination of the hazard",
    explanation: "The most effective safety control is removing the hazard entirely."
  },
  {
    id: 'joinery-l2-health-safety13',
    question: "What is required before lifting heavy items?",
    options: ["Risk assessment", "Back massage", "Company logo on boots", "Fancy gloves"],
    correctAnswer: "Risk assessment",
    explanation: "Manual handling tasks require proper assessment to avoid injury."
  },
  {
    id: 'joinery-l2-health-safety14',
    question: "What is a safe approach to repetitive tasks?",
    options: ["Rotate duties and take breaks", "Work nonstop until finished", "Ask a friend to finish", "Take painkillers"],
    correctAnswer: "Rotate duties and take breaks",
    explanation: "Breaks and variety help reduce physical stress on the body."
  },
  {
    id: 'joinery-l2-health-safety15',
    question: "What’s the safe action when unsure how to use a tool?",
    options: ["Ask for training first", "Guess and try it", "Watch someone else", "Look for a shortcut"],
    correctAnswer: "Ask for training first",
    explanation: "Training ensures the tool is used safely and correctly."
  },
  {
    id: 'joinery-l2-health-safety16',
    question: "When must hearing protection be worn?",
    options: ["Over 85 decibels", "At lunchtime", "If it feels too quiet", "In bright sunlight"],
    correctAnswer: "Over 85 decibels",
    explanation: "UK law requires hearing protection where noise exceeds 85dB."
  },
  {
    id: 'joinery-l2-health-safety17',
    question: "What is the best way to prevent electrocution?",
    options: ["Check tools before use", "Use wet hands", "Wear metal gloves", "Leave leads tangled"],
    correctAnswer: "Check tools before use",
    explanation: "Inspections help identify faulty equipment before use."
  },
  {
    id: 'joinery-l2-health-safety18',
    question: "Why are COSHH data sheets important?",
    options: ["They explain handling and risks", "They help you get promoted", "They reduce product costs", "They replace PPE"],
    correctAnswer: "They explain handling and risks",
    explanation: "Data sheets inform safe use of chemicals and substances."
  },
  {
    id: 'joinery-l2-health-safety19',
    question: "What makes a fire door effective?",
    options: ["Correct installation and fire rating", "Being made from metal", "Painting it red", "Positioning it at the rear exit"],
    correctAnswer: "Correct installation and fire rating",
    explanation: "Fire doors must meet standards and be installed properly."
  },
  {
    id: 'joinery-l2-health-safety20',
    question: "What is a Method Statement?",
    options: ["Safe step-by-step procedure", "Wood cutting diagram", "Tool hire contract", "Project invoice"],
    correctAnswer: "Safe step-by-step procedure",
    explanation: "Method Statements explain how work will be done safely."
  },
  {
    id: 'joinery-l2-health-safety21',
    question: "Why should defective ladders be removed?",
    options: ["To prevent falls or injury", "To save time", "So others can fix them", "To use later when quiet"],
    correctAnswer: "To prevent falls or injury",
    explanation: "Damaged ladders pose serious risks and must not be used."
  },
  {
    id: 'joinery-l2-health-safety22',
    question: "What does a CSCS card confirm?",
    options: ["You are qualified for your role", "You own a vehicle", "You work late often", "You have loud tools"],
    correctAnswer: "You are qualified for your role",
    explanation: "CSCS cards show that you are trained and competent for site work."
  },
  {
    id: 'joinery-l2-health-safety23',
    question: "What causes most chisel injuries?",
    options: ["Cutting towards the body", "Using rubber gloves", "Marking timber too lightly", "Sharpening too often"],
    correctAnswer: "Cutting towards the body",
    explanation: "Always cut away from yourself to avoid serious injury."
  },
  {
    id: 'joinery-l2-health-safety24',
    question: "What is a 'competent person' under safety rules?",
    options: ["Trained, skilled and experienced", "Physically strong", "Wearing a helmet", "Friendly and helpful"],
    correctAnswer: "Trained, skilled and experienced",
    explanation: "Competence means having the right training and understanding to carry out a task safely."
  },
  {
    id: 'joinery-l2-health-safety25',
    question: "What must be done before working at height?",
    options: ["Carry out a full risk assessment", "Wait for a sunny day", "Close all nearby windows", "Check your emails"],
    correctAnswer: "Carry out a full risk assessment",
    explanation: "Assessing risks ensures the correct access equipment and controls are used."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-health-safety', 'items', q.id), {
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
