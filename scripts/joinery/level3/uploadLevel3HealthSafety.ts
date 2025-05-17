// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3HealthSafety.ts

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

// ✅ Joinery Level 3 Health & Safety Questions
const questions = [
  {
    id: 'joinery-l3-health-safety1',
    question: "What is the first step in the risk assessment process?",
    options: ["Review previous incidents", "Evaluate residual risk", "Identify potential hazards", "Record all findings"],
    correctAnswer: "Identify potential hazards",
    explanation: "The risk assessment process begins by identifying anything that may cause harm, forming the basis for evaluating and controlling risks."
  },
  {
    id: 'joinery-l3-health-safety2',
    question: "What does a COSHH assessment primarily cover?",
    options: ["Lone working rules", "Working at height", "Hazardous substances", "Noise exposure"],
    correctAnswer: "Hazardous substances",
    explanation: "COSHH assessments focus on identifying and controlling exposure to harmful substances used or produced at work."
  },
  {
    id: 'joinery-l3-health-safety3',
    question: "Which regulation governs the use of work equipment?",
    options: ["CDM", "PUWER", "RIDDOR", "DSEAR"],
    correctAnswer: "PUWER",
    explanation: "PUWER requires that all work equipment is suitable, safe, and used by trained individuals."
  },
  {
    id: 'joinery-l3-health-safety4',
    question: "What type of fire extinguisher is safe for electrical fires?",
    options: ["Foam", "Water", "CO2", "Wet chemical"],
    correctAnswer: "CO2",
    explanation: "CO2 extinguishers are non-conductive and leave no residue, making them safe for use on electrical fires."
  },
  {
    id: 'joinery-l3-health-safety5',
    question: "What is the purpose of a safety data sheet?",
    options: ["To track equipment use", "To report incidents", "To provide substance details", "To list toolbox talks"],
    correctAnswer: "To provide substance details",
    explanation: "Safety data sheets give vital health, handling, storage, and disposal information for hazardous products."
  },
  {
    id: 'joinery-l3-health-safety6',
    question: "Which item is classified as personal protective equipment?",
    options: ["Hard hat", "First aid kit", "Dust extractor", "Signage"],
    correctAnswer: "Hard hat",
    explanation: "PPE includes equipment worn to minimise exposure to hazards, such as hard hats for head protection."
  },
  {
    id: 'joinery-l3-health-safety7',
    question: "How often should LEV systems be examined?",
    options: ["Every 14 months", "Every 5 years", "Monthly", "When broken"],
    correctAnswer: "Every 14 months",
    explanation: "Local Exhaust Ventilation systems must be thoroughly examined and tested at least once every 14 months."
  },
  {
    id: 'joinery-l3-health-safety8',
    question: "Who is responsible for reporting dangerous occurrences under RIDDOR?",
    options: ["Any employee", "Site manager", "The employer", "The cleaner"],
    correctAnswer: "The employer",
    explanation: "It is the employer’s duty to report incidents to the HSE under the RIDDOR regulations."
  },
  {
    id: 'joinery-l3-health-safety9',
    question: "Which of these is a collective protection method?",
    options: ["Safety harness", "Warning signs", "Guardrails", "Dust masks"],
    correctAnswer: "Guardrails",
    explanation: "Guardrails protect multiple workers at once, making them a form of collective safety."
  },
  {
    id: 'joinery-l3-health-safety10',
    question: "What must employers provide regarding first aid?",
    options: ["Training for all staff", "A full-time medic", "Basic food supplies", "Suitable facilities"],
    correctAnswer: "Suitable facilities",
    explanation: "Employers must ensure suitable equipment, trained staff, and facilities are in place for first aid."
  },
  {
    id: 'joinery-l3-health-safety11',
    question: "When must a Construction Phase Plan be created?",
    options: ["After project completion", "When over £1 million", "Before work begins", "During planning approval"],
    correctAnswer: "Before work begins",
    explanation: "The plan must be prepared before site work starts and detail health and safety arrangements."
  },
  {
    id: 'joinery-l3-health-safety12',
    question: "Which item is a fire hazard in joinery workshops?",
    options: ["Spare screws", "Hand saws", "Wood dust", "Aluminium sheeting"],
    correctAnswer: "Wood dust",
    explanation: "Fine wood dust is highly flammable and can cause explosions in confined spaces."
  },
  {
    id: 'joinery-l3-health-safety13',
    question: "What is a key duty under CDM 2015 for contractors?",
    options: ["File accounts", "Complete design work", "Plan their tasks", "Install electrics"],
    correctAnswer: "Plan their tasks",
    explanation: "Contractors must plan, manage, and monitor their work to ensure safety on site."
  },
  {
    id: 'joinery-l3-health-safety14',
    question: "What is the function of a method statement?",
    options: ["It lists materials", "It manages wages", "It describes safe work steps", "It orders PPE"],
    correctAnswer: "It describes safe work steps",
    explanation: "A method statement outlines how to carry out tasks safely and effectively."
  },
  {
    id: 'joinery-l3-health-safety15',
    question: "Which regulation covers noise exposure limits?",
    options: ["LOLER", "PUWER", "Noise at Work", "DSEAR"],
    correctAnswer: "Noise at Work",
    explanation: "The Control of Noise at Work Regulations sets legal limits and actions for exposure levels."
  },
  {
    id: 'joinery-l3-health-safety16',
    question: "Which document records workplace incidents?",
    options: ["Tool list", "Job sheet", "Accident book", "Cleaning log"],
    correctAnswer: "Accident book",
    explanation: "Accident books are used to log injuries and incidents and help identify recurring risks."
  },
  {
    id: 'joinery-l3-health-safety17',
    question: "Why must work at height be avoided if possible?",
    options: ["It delays jobs", "It's expensive", "It's high risk", "It blocks exits"],
    correctAnswer: "It's high risk",
    explanation: "Working at height has a high accident rate, so it should be avoided where reasonably practicable."
  },
  {
    id: 'joinery-l3-health-safety18',
    question: "Which of these is a hazardous substance in joinery?",
    options: ["Treated timber", "Masonry nails", "Steel hinges", "Paper labels"],
    correctAnswer: "Treated timber",
    explanation: "Treated timber can release harmful chemicals or dust during cutting or sanding."
  },
  {
    id: 'joinery-l3-health-safety19',
    question: "Who must carry out a thorough LEV examination?",
    options: ["Workshop cleaner", "Any employee", "Competent person", "The manager"],
    correctAnswer: "Competent person",
    explanation: "A competent person with suitable training must perform LEV system inspections and testing."
  },
  {
    id: 'joinery-l3-health-safety20',
    question: "Which regulation covers reporting of work-related injuries?",
    options: ["CDM", "PUWER", "RIDDOR", "COSHH"],
    correctAnswer: "RIDDOR",
    explanation: "RIDDOR sets out what workplace injuries, illnesses, and dangerous events must be reported to the HSE."
  },
  {
    id: 'joinery-l3-health-safety21',
    question: "What must be done with expired PPE?",
    options: ["Repaired", "Cleaned", "Replaced", "Recycled"],
    correctAnswer: "Replaced",
    explanation: "Once PPE no longer offers full protection or is damaged, it must be removed from use and replaced."
  },
  {
    id: 'joinery-l3-health-safety22',
    question: "What should be used to clean up fine wood dust?",
    options: ["Brush", "Vacuum", "Rag", "Water hose"],
    correctAnswer: "Vacuum",
    explanation: "Vacuum systems fitted with HEPA filters are safest for removing airborne wood dust."
  },
  {
    id: 'joinery-l3-health-safety23',
    question: "What does a toolbox talk aim to do?",
    options: ["Distribute wages", "Check licences", "Raise safety awareness", "Test fire alarms"],
    correctAnswer: "Raise safety awareness",
    explanation: "Toolbox talks are short briefings that focus attention on specific safety topics or site risks."
  },
  {
    id: 'joinery-l3-health-safety24',
    question: "What must employers provide before allowing machinery use?",
    options: ["Lockers", "Time sheets", "Training", "Tea break"],
    correctAnswer: "Training",
    explanation: "Only trained and authorised workers should operate machinery to reduce risk and comply with PUWER."
  },
  {
    id: 'joinery-l3-health-safety25',
    question: "Why should noise be controlled in joinery workshops?",
    options: ["To save power", "To avoid fines", "To protect hearing", "To please visitors"],
    correctAnswer: "To protect hearing",
    explanation: "Uncontrolled noise can cause permanent hearing damage, making control measures essential under the Noise Regulations."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-health-safety', 'items', q.id), {
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
