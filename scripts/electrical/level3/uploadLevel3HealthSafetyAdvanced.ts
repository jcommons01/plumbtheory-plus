// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3HealthSafetyAdvanced.ts

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
    id: 'healthsafetyadv01',
    question: "Which legislation requires employers to assess and manage risks in the workplace?",
    options: [
      "Health and Safety at Work etc. Act 1974",
      "Electricity at Work Regulations 1989",
      "Provision and Use of Work Equipment Regulations 1998",
      "Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: "Management of Health and Safety at Work Regulations 1999",
    explanation: "These regulations require employers to carry out risk assessments and take appropriate steps to manage risks."
  },
  {
    id: 'healthsafetyadv02',
    question: "Which type of fire extinguisher is suitable for use on electrical fires?",
    options: ["Water", "Foam", "CO₂", "Wet chemical"],
    correctAnswer: "CO₂",
    explanation: "CO₂ extinguishers are non-conductive and safe for use on live electrical equipment."
  },
  {
    id: 'healthsafetyadv03',
    question: "What colour is a 110V centre-tapped transformer socket used on UK construction sites?",
    options: ["Blue", "Red", "Yellow", "Black"],
    correctAnswer: "Yellow",
    explanation: "Yellow sockets indicate 110V equipment, commonly used for safety on construction sites."
  },
  {
    id: 'healthsafetyadv04',
    question: "What is the purpose of a Permit to Work system?",
    options: [
      "To restrict access to high-risk areas",
      "To provide insurance documentation",
      "To allow workers to enter site",
      "To formally control hazardous work"
    ],
    correctAnswer: "To formally control hazardous work",
    explanation: "Permits to Work are formal documents used to authorise high-risk activities like live working or confined space entry."
  },
  {
    id: 'healthsafetyadv05',
    question: "Which document should be reviewed before carrying out a non-routine electrical task?",
    options: ["PAT register", "Health surveillance form", "Safe system of work", "Asset register"],
    correctAnswer: "Safe system of work",
    explanation: "A safe system of work outlines procedures and precautions for completing tasks safely."
  },
  {
    id: 'healthsafetyadv06',
    question: "What class of RCD protection is required for personal protection against electric shock?",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctAnswer: "30mA",
    explanation: "30mA RCDs disconnect supply quickly enough to protect against fatal shock from indirect contact."
  },
  {
    id: 'healthsafetyadv07',
    question: "What is the maximum voltage allowed for handheld tools used outdoors in construction?",
    options: ["240V", "415V", "110V", "12V"],
    correctAnswer: "110V",
    explanation: "110V centre-tapped systems reduce shock risk and are the UK standard for site safety."
  },
  {
    id: 'healthsafetyadv08',
    question: "What is the role of the Health and Safety Executive (HSE)?",
    options: [
      "To fund employer training",
      "To prosecute non-compliance",
      "To run job centres",
      "To design electrical systems"
    ],
    correctAnswer: "To prosecute non-compliance",
    explanation: "The HSE enforces health and safety law and can issue notices or prosecute employers and individuals."
  },
  {
    id: 'healthsafetyadv09',
    question: "What is the recommended action if asbestos is suspected on site?",
    options: [
      "Continue work with caution",
      "Use a dust mask",
      "Stop work and report it",
      "Spray the area with water"
    ],
    correctAnswer: "Stop work and report it",
    explanation: "Disturbing asbestos can release dangerous fibres. All work should cease until specialists assess the situation."
  },
  {
    id: 'healthsafetyadv10',
    question: "Which regulation requires electrical systems to be constructed and maintained to prevent danger?",
    options: [
      "PUWER 1998",
      "Electricity at Work Regulations 1989",
      "Control of Substances Hazardous to Health 2002",
      "Work at Height Regulations 2005"
    ],
    correctAnswer: "Electricity at Work Regulations 1989",
    explanation: "These regulations specifically address electrical safety in the workplace."
  },
  {
    id: 'healthsafetyadv11',
    question: "How often should residual current devices (RCDs) be tested using the test button?",
    options: ["Daily", "Weekly", "Monthly", "Annually"],
    correctAnswer: "Monthly",
    explanation: "RCDs should be tested monthly to verify they disconnect the circuit under fault conditions."
  },
  {
    id: 'healthsafetyadv12',
    question: "What must be done before re-energising a circuit after repairs?",
    options: [
      "Apply PAT labels",
      "Check circuit breakers",
      "Complete live working form",
      "Test and confirm safety"
    ],
    correctAnswer: "Test and confirm safety",
    explanation: "Testing ensures the circuit is safe and compliant with regulations before power is restored."
  },
  {
    id: 'healthsafetyadv13',
    question: "Which of the following PPE is mandatory on most construction sites?",
    options: ["Hearing protection", "Welding visor", "High-visibility clothing", "Latex gloves"],
    correctAnswer: "High-visibility clothing",
    explanation: "High-visibility clothing is a basic site requirement to ensure workers are seen."
  },
  {
    id: 'healthsafetyadv14',
    question: "What is a common symptom of carbon monoxide poisoning?",
    options: ["Skin rash", "Coughing", "Dizziness", "Muscle cramps"],
    correctAnswer: "Dizziness",
    explanation: "Carbon monoxide exposure causes dizziness, nausea, and headaches. It is colourless and odourless."
  },
  {
    id: 'healthsafetyadv15',
    question: "What does a red fire extinguisher contain in the UK?",
    options: ["CO₂", "Foam", "Water", "Powder"],
    correctAnswer: "Water",
    explanation: "Red extinguishers in the UK typically contain water and are unsuitable for electrical fires."
  },
  {
    id: 'healthsafetyadv16',
    question: "When must a risk assessment be written down?",
    options: [
      "When work is indoors",
      "When requested by a client",
      "When employing five or more people",
      "When working for local authorities"
    ],
    correctAnswer: "When employing five or more people",
    explanation: "Employers with five or more staff must record their risk assessments by law."
  },
  {
    id: 'healthsafetyadv17',
    question: "Which hazard is most associated with trailing cables on a job site?",
    options: ["Electric shock", "Trip hazard", "Radiation", "Manual handling"],
    correctAnswer: "Trip hazard",
    explanation: "Trailing cables create a significant risk of tripping, especially in busy or confined work areas."
  },
  {
    id: 'healthsafetyadv18',
    question: "Which colour hard hat is typically worn by site supervisors in the UK?",
    options: ["White", "Blue", "Orange", "Green"],
    correctAnswer: "White",
    explanation: "White helmets are used by managers and supervisors to distinguish roles on site."
  },
  {
    id: 'healthsafetyadv19',
    question: "What is the first action to take in the event of an electrical fire?",
    options: [
      "Throw water over it",
      "Unplug the equipment if safe",
      "Sound the fire alarm",
      "Open windows"
    ],
    correctAnswer: "Unplug the equipment if safe",
    explanation: "If safe, isolate the power source before tackling the fire with a CO₂ extinguisher."
  },
  {
    id: 'healthsafetyadv20',
    question: "What document outlines emergency procedures on site?",
    options: ["Construction Phase Plan", "Risk assessment", "Safe work method statement", "HSE bulletin"],
    correctAnswer: "Construction Phase Plan",
    explanation: "The Construction Phase Plan includes site-specific emergency and safety arrangements."
  },
  {
    id: 'healthsafetyadv21',
    question: "Which symbol represents mandatory PPE on a site safety sign?",
    options: ["Yellow triangle", "Red circle with a line", "Blue circle", "Green square"],
    correctAnswer: "Blue circle",
    explanation: "Blue circular signs indicate mandatory actions, such as wearing PPE."
  },
  {
    id: 'healthsafetyadv22',
    question: "Which regulation covers the use of access equipment like scaffolds and ladders?",
    options: [
      "Manual Handling Regulations 1992",
      "Provision and Use of Work Equipment Regulations 1998",
      "Work at Height Regulations 2005",
      "Construction Design and Management Regulations 2015"
    ],
    correctAnswer: "Work at Height Regulations 2005",
    explanation: "These regulations control planning, supervision, and safety of work at height."
  },
  {
    id: 'healthsafetyadv23',
    question: "What is the minimum depth at which buried electrical cables should be installed?",
    options: ["150mm", "300mm", "450mm", "600mm"],
    correctAnswer: "600mm",
    explanation: "Underground cables must be buried at a minimum of 600mm in roadways to avoid accidental damage."
  },
  {
    id: 'healthsafetyadv24',
    question: "Who is legally responsible for health and safety on a worksite?",
    options: ["Site foreman", "Main contractor", "Each employer", "HSE inspector"],
    correctAnswer: "Each employer",
    explanation: "Each employer has legal duties to protect their own workers under the Health and Safety at Work Act."
  },
  {
    id: 'healthsafetyadv25',
    question: "What does the term 'hierarchy of control' refer to in risk assessment?",
    options: [
      "Fire control zones",
      "Order of evacuation",
      "Levels of supervision",
      "Steps to eliminate or reduce risk"
    ],
    correctAnswer: "Steps to eliminate or reduce risk",
    explanation: "The hierarchy of control prioritises removing risks entirely, followed by safer methods and PPE as a last resort."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-health-safety-advanced', 'items', q.id), {
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
