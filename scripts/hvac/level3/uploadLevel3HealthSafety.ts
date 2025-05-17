// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3HealthSafety.ts

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

// ✅ HVAC Level 3 Health & Safety – 25 UK-Compliant Questions
const questions = [
  {
    id: 'hvac-l3-health-safety-1',
    question: "Which regulation requires employers to assess risks and implement safety measures in the workplace?",
    options: ["PUWER", "RIDDOR", "CDM", "Management of Health and Safety at Work Regulations"],
    correctAnswer: "Management of Health and Safety at Work Regulations",
    explanation: "This regulation requires employers to assess workplace risks and implement suitable controls to ensure safety for staff and others affected by work activities."
  },
  {
    id: 'hvac-l3-health-safety-2',
    question: "What is the minimum safe clearance distance for working near overhead power lines in the UK?",
    options: ["1 metre", "3 metres", "5 metres", "10 metres"],
    correctAnswer: "3 metres",
    explanation: "The HSE recommends maintaining a minimum distance of 3 metres from overhead power lines up to 33kV to reduce the risk of electric shock or arc flash."
  },
  {
    id: 'hvac-l3-health-safety-3',
    question: "Under RIDDOR, what must be reported by an HVAC employer?",
    options: ["Minor bruises", "Verbal warnings", "Dangerous occurrences", "Workplace disputes"],
    correctAnswer: "Dangerous occurrences",
    explanation: "RIDDOR requires the reporting of specified injuries, illnesses, and dangerous occurrences such as electrical explosions or gas incidents."
  },
  {
    id: 'hvac-l3-health-safety-4',
    question: "Which document details how a task should be carried out safely on site?",
    options: ["Invoice", "Permit", "Method Statement", "Site Plan"],
    correctAnswer: "Method Statement",
    explanation: "A Method Statement outlines the safe system of work, equipment required, and the procedures to be followed for specific tasks."
  },
  {
    id: 'hvac-l3-health-safety-5',
    question: "What is the main purpose of a COSHH assessment?",
    options: ["To increase production speed", "To improve staff punctuality", "To manage hazardous substance risks", "To monitor staff breaks"],
    correctAnswer: "To manage hazardous substance risks",
    explanation: "COSHH assessments help control exposure to hazardous substances like refrigerants, cleaners, and adhesives used in HVAC work."
  },
  {
    id: 'hvac-l3-health-safety-6',
    question: "Which of the following best prevents falls during rooftop HVAC servicing?",
    options: ["Signage", "Guardrails", "Tool belts", "Painted markers"],
    correctAnswer: "Guardrails",
    explanation: "Guardrails are a collective protection method that physically prevents workers from falling, making them a preferred safety measure."
  },
  {
    id: 'hvac-l3-health-safety-7',
    question: "What is the legal minimum temperature for a UK indoor workplace doing physical tasks?",
    options: ["11°C", "13°C", "15°C", "17°C"],
    correctAnswer: "13°C",
    explanation: "The Workplace (Health, Safety and Welfare) Regulations suggest 13°C as the minimum for environments with physical labour."
  },
  {
    id: 'hvac-l3-health-safety-8',
    question: "Which regulation requires proper selection, maintenance, and inspection of work equipment?",
    options: ["DSEAR", "PUWER", "COSHH", "CDM"],
    correctAnswer: "PUWER",
    explanation: "PUWER (Provision and Use of Work Equipment Regulations) ensures that tools and equipment are safe to use and properly maintained."
  },
  {
    id: 'hvac-l3-health-safety-9',
    question: "What must be used when carrying out hot works like brazing indoors?",
    options: ["Dust sheets", "Manual extinguisher", "Hot Work Permit", "Extra lighting"],
    correctAnswer: "Hot Work Permit",
    explanation: "A Hot Work Permit ensures fire precautions are in place before, during, and after activities like welding, soldering, or brazing."
  },
  {
    id: 'hvac-l3-health-safety-10',
    question: "Which hazard is most likely to be found in a neglected cooling tower?",
    options: ["Rodents", "Legionella", "Asbestos", "Lead paint"],
    correctAnswer: "Legionella",
    explanation: "Legionella bacteria can thrive in stagnant warm water, making poorly maintained cooling towers a significant health risk."
  },
  {
    id: 'hvac-l3-health-safety-11',
    question: "Which of the following must be done before using a ladder on site?",
    options: ["Get planning approval", "Apply a risk assessment", "Paint the ladder ends", "Notify the HSE"],
    correctAnswer: "Apply a risk assessment",
    explanation: "Using ladders is permitted only after a site-specific risk assessment confirms it's the safest practical method for the task."
  },
  {
    id: 'hvac-l3-health-safety-12',
    question: "What is required by law when employees are exposed to noise above 85 dB(A)?",
    options: ["Noise signage only", "Earplugs must be available", "Hearing protection must be worn", "Work must stop"],
    correctAnswer: "Hearing protection must be worn",
    explanation: "Above 85 dB(A), employers must ensure hearing protection is worn and noise-reduction measures are in place."
  },
  {
    id: 'hvac-l3-health-safety-13',
    question: "What is the correct first action if asbestos is suspected during ductwork removal?",
    options: ["Spray with water", "Continue carefully", "Seal and stop work", "Call a colleague"],
    correctAnswer: "Seal and stop work",
    explanation: "If asbestos is suspected, work must stop immediately, the area secured, and a competent person consulted."
  },
  {
    id: 'hvac-l3-health-safety-14',
    question: "What does STEL stand for in exposure limits?",
    options: ["Safe Testing Every Level", "Short-Term Exposure Limit", "Systematic Training for Equipment Limits", "Standard Tooling Exposure List"],
    correctAnswer: "Short-Term Exposure Limit",
    explanation: "STEL refers to the maximum exposure level for hazardous substances over a short period (usually 15 minutes)."
  },
  {
    id: 'hvac-l3-health-safety-15',
    question: "What document should list emergency procedures for confined space entry?",
    options: ["Invoice", "Risk Assessment", "COSHH file", "Work Schedule"],
    correctAnswer: "Risk Assessment",
    explanation: "Risk assessments for confined spaces must include emergency procedures, equipment needs, and rescue plans."
  },
  {
    id: 'hvac-l3-health-safety-16',
    question: "How often must Local Exhaust Ventilation (LEV) systems be tested by law?",
    options: ["Every 6 months", "Every 9 months", "Every 14 months", "Every 2 years"],
    correctAnswer: "Every 14 months",
    explanation: "LEV systems must be thoroughly examined at least every 14 months to ensure continued effective control of airborne hazards."
  },
  {
    id: 'hvac-l3-health-safety-17',
    question: "Which of these would be classed as a 'near miss' in health and safety?",
    options: ["A dropped spanner injuring a foot", "A tool falling but missing people", "A completed risk assessment", "Using PPE on site"],
    correctAnswer: "A tool falling but missing people",
    explanation: "A 'near miss' is an incident that had the potential to cause harm but did not, often prompting review of controls."
  },
  {
    id: 'hvac-l3-health-safety-18',
    question: "What is the correct method of electrical isolation for HVAC servicing?",
    options: ["Turn off the main switch", "Use a fuse box key", "Lock off and verify with test equipment", "Flip all breakers off"],
    correctAnswer: "Lock off and verify with test equipment",
    explanation: "Safe isolation requires switching off the supply, locking the circuit, and verifying it is dead using appropriate meters."
  },
  {
    id: 'hvac-l3-health-safety-19',
    question: "What is the recommended monitoring time after completing hot works?",
    options: ["10 minutes", "30 minutes", "60 minutes", "90 minutes"],
    correctAnswer: "60 minutes",
    explanation: "A fire watch of at least 60 minutes is recommended after hot works to catch any delayed ignition in nearby materials."
  },
  {
    id: 'hvac-l3-health-safety-20',
    question: "Who is legally responsible for maintaining safe plant room conditions?",
    options: ["The HSE", "The cleaner", "The responsible person", "The HVAC technician"],
    correctAnswer: "The responsible person",
    explanation: "Under the Fire Safety Order, the 'responsible person' (usually the employer or duty holder) must ensure safe plant room conditions."
  },
  {
    id: 'hvac-l3-health-safety-21',
    question: "Which law governs the use of refrigerants that can displace oxygen in enclosed rooms?",
    options: ["CDM Regulations", "COSHH Regulations", "Gas Safety Regulations", "Noise at Work Regulations"],
    correctAnswer: "COSHH Regulations",
    explanation: "COSHH governs exposure to harmful substances, including refrigerants that can displace oxygen and pose asphyxiation risks."
  },
  {
    id: 'hvac-l3-health-safety-22',
    question: "What is the preferred order of control under the hierarchy of risk control?",
    options: ["PPE, training, signage", "Substitution, elimination, PPE", "Elimination, substitution, engineering controls", "Reporting, PPE, signage"],
    correctAnswer: "Elimination, substitution, engineering controls",
    explanation: "The hierarchy prioritises removing the risk entirely, then substituting, then isolating via engineering controls before using PPE."
  },
  {
    id: 'hvac-l3-health-safety-23',
    question: "Which regulation places duties on those controlling construction projects, including HVAC installs?",
    options: ["PUWER", "LOLER", "CDM Regulations", "Noise at Work Regulations"],
    correctAnswer: "CDM Regulations",
    explanation: "The Construction (Design and Management) Regulations place legal duties on duty holders in construction, including HVAC installers."
  },
  {
    id: 'hvac-l3-health-safety-24',
    question: "What must be done if a refrigerant leak is suspected in a plant room?",
    options: ["Check later", "Ventilate and test gas levels", "Cover vents", "Call the client"],
    correctAnswer: "Ventilate and test gas levels",
    explanation: "Before entry, the area must be ventilated and gas levels checked to avoid risks from refrigerants displacing oxygen."
  },
  {
    id: 'hvac-l3-health-safety-25',
    question: "Which of the following requires a Permit to Work before starting?",
    options: ["Connecting an extension lead", "Changing batteries in a tool", "Working in a confined space", "Replacing an air filter"],
    correctAnswer: "Working in a confined space",
    explanation: "Confined space work is high-risk and legally requires a Permit to Work outlining controls and rescue measures."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-health-safety', 'items', q.id), {
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
