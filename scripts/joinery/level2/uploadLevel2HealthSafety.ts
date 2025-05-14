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
    question: "According to the Health and Safety at Work Act, who is primarily responsible for ensuring health and safety on a construction site?",
    options: ["Only the site manager", "Only the health and safety officer", "Only individual workers", "Employers and employees, with the employer having the main responsibility"],
    correctAnswer: "Employers and employees, with the employer having the main responsibility",
    explanation: "Employers hold primary responsibility while employees must cooperate with safe working practices."
  },
  {
    id: 'joinery-l2-health-safety2',
    question: "What is the purpose of a risk assessment in joinery work?",
    options: ["To identify hazards and determine appropriate control measures", "To calculate insurance premiums", "To assign blame after an accident occurs", "To determine how fast work can be completed"],
    correctAnswer: "To identify hazards and determine appropriate control measures",
    explanation: "Risk assessments identify potential hazards and establish appropriate controls to minimize risks."
  },
  {
    id: 'joinery-l2-health-safety3',
    question: "What does PPE stand for in construction health and safety?",
    options: ["Preventative Project Evaluation", "Powered Processing Equipment", "Personal Protective Equipment", "Personal Protection Equipment"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE includes safety items like gloves, eyewear and masks that protect workers from hazards."
  },
  {
    id: 'joinery-l2-health-safety4',
    question: "What colour is a prohibition safety sign (e.g., 'No Entry') according to UK regulations?",
    options: ["Blue circle with white symbol", "Red circle with diagonal line and black symbol on white background", "Green circle with white symbol", "Yellow triangle with black border and symbol"],
    correctAnswer: "Red circle with diagonal line and black symbol on white background",
    explanation: "Prohibition signs use red circles with diagonal lines to indicate forbidden actions."
  },
  {
    id: 'joinery-l2-health-safety5',
    question: "Which of these is a critical control measure for managing wood dust exposure?",
    options: ["Working faster to reduce exposure time", "Using water on electrical tools", "Using louder machinery to drown out noise concerns", "Using local exhaust ventilation (dust extraction)"],
    correctAnswer: "Using local exhaust ventilation (dust extraction)",
    explanation: "Local exhaust ventilation captures harmful wood dust at source before it can be inhaled."
  },
  {
    id: 'joinery-l2-health-safety6',
    question: "What is the recommended maximum weight for a male to lift at waist height according to HSE manual handling guidelines?",
    options: ["10kg", "5kg", "25kg", "20kg"],
    correctAnswer: "20kg",
    explanation: "HSE guidelines recommend 20kg maximum at waist height for men in ideal conditions."
  },
  {
    id: 'joinery-l2-health-safety7',
    question: "What document must be consulted before using a hazardous substance such as a wood treatment chemical?",
    options: ["COSHH safety data sheet", "Building regulations", "Tool manufacturer's warranty", "Invoice for the materials"],
    correctAnswer: "COSHH safety data sheet",
    explanation: "COSHH safety data sheets provide essential information about handling hazardous substances safely."
  },
  {
    id: 'joinery-l2-health-safety8',
    question: "What does RIDDOR stand for?",
    options: ["Risk Identification and Danger Detection on Request", "Regional Inspection of Directives and Daily Operational Reviews", "Regulation of Internal Development and Directional Operational Requirements", "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations"],
    correctAnswer: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
    explanation: "RIDDOR requires reporting of specific workplace accidents, diseases and dangerous incidents."
  },
  {
    id: 'joinery-l2-health-safety9',
    question: "What is the primary purpose of a Method Statement in joinery work?",
    options: ["To calculate project costs", "To advertise services to potential clients", "To detail how a task will be carried out safely", "To record employee working hours"],
    correctAnswer: "To detail how a task will be carried out safely",
    explanation: "Method Statements provide step-by-step instructions for completing tasks safely and effectively."
  },
  {
    id: 'joinery-l2-health-safety10',
    question: "Which of these is a common cause of fires in joinery workshops?",
    options: ["Excessive ventilation", "Using hand tools", "Storing timber in vertical racks", "Wood dust accumulation near electrical equipment"],
    correctAnswer: "Wood dust accumulation near electrical equipment",
    explanation: "Wood dust is highly combustible and can ignite from electrical equipment heat or sparks."
  },
  {
    id: 'joinery-l2-health-safety11',
    question: "What is the minimum first aid provision required for a small joinery workshop with 10 employees?",
    options: ["A trained doctor on site", "No provision is legally required", "An appointed person and a basic first aid kit", "A fully equipped medical room"],
    correctAnswer: "An appointed person and a basic first aid kit",
    explanation: "Small workshops require an appointed person and basic first aid kit as minimum provision."
  },
  {
    id: 'joinery-l2-health-safety12',
    question: "What document outlines the main health and safety requirements for a construction project with multiple contractors?",
    options: ["Construction Phase Plan", "Building regulations approval", "Planning permission", "Architect's specification"],
    correctAnswer: "Construction Phase Plan",
    explanation: "The Construction Phase Plan documents safety arrangements for multi-contractor projects under CDM regulations."
  },
  {
    id: 'joinery-l2-health-safety13',
    question: "What is the main hazard associated with using a circular saw in joinery work?",
    options: ["Excessive noise only", "Electrocution from water contact", "Contact with the moving blade", "Overheating of the motor"],
    correctAnswer: "Contact with the moving blade",
    explanation: "Blade contact can cause severe cuts and requires proper guarding and safe working techniques."
  },
  {
    id: 'joinery-l2-health-safety14',
    question: "Which of the following is NOT a typical requirement when working at height as a joiner?",
    options: ["Ensuring adequate edge protection where there is a risk of falling", "Working alone without supervision whenever possible", "Using appropriate access equipment such as ladders or platforms", "Conducting a risk assessment before starting work"],
    correctAnswer: "Working alone without supervision whenever possible",
    explanation: "Working alone at height is discouraged; proper supervision is essential for high-risk activities."
  },
  {
    id: 'joinery-l2-health-safety15',
    question: "What should you do if you discover damaged electrical equipment in a joinery workshop?",
    options: ["Try to fix it yourself immediately", "Remove it from use, label it as defective, and report it to your supervisor", "Continue using it but with extra caution", "Ignore it as long as it still functions"],
    correctAnswer: "Remove it from use, label it as defective, and report it to your supervisor",
    explanation: "Damaged equipment must be removed from use immediately and reported to prevent accidents."
  },
  {
    id: 'joinery-l2-health-safety16',
    question: "Which type of dust mask is appropriate for protection against wood dust during machine sanding?",
    options: ["A simple cloth face covering", "FFP1 disposable mask", "Any dust mask is sufficient", "FFP3 disposable mask"],
    correctAnswer: "FFP3 disposable mask",
    explanation: "FFP3 masks filter at least 99% of airborne particles, suitable for carcinogenic wood dust."
  },
  {
    id: 'joinery-l2-health-safety17',
    question: "What is the purpose of a CSCS (Construction Skills Certification Scheme) card in the UK construction industry?",
    options: ["To track working hours on construction projects", "To provide vehicle parking permissions on construction sites", "To prove the holder has the training and qualifications required for their job", "To prove identity when collecting materials from suppliers"],
    correctAnswer: "To prove the holder has the training and qualifications required for their job",
    explanation: "CSCS cards verify holders have the necessary training and qualifications for their construction role."
  },
  {
    id: 'joinery-l2-health-safety18',
    question: "What is the most appropriate action when a job requires working in an awkward position that might cause back strain?",
    options: ["Use painkillers before starting work", "Take regular breaks and rotate tasks", "Complete the job quickly to minimize exposure time", "Ignore any discomfort as it's part of the job"],
    correctAnswer: "Take regular breaks and rotate tasks",
    explanation: "Regular breaks and task rotation prevent musculoskeletal injuries from awkward working positions."
  },
  {
    id: 'joinery-l2-health-safety19',
    question: "Under UK regulations, what is the maximum sound level above which hearing protection must be worn?",
    options: ["75 decibels", "85 decibels", "80 decibels", "70 decibels"],
    correctAnswer: "85 decibels",
    explanation: "Hearing protection is mandatory at or above 85 decibels under Noise at Work Regulations."
  },
  {
    id: 'joinery-l2-health-safety20',
    question: "What information should be included on a safety sign indicating the presence of a trip hazard?",
    options: ["Just a verbal warning is sufficient", "Only the company logo", "Only written text explaining the hazard", "A warning symbol (black exclamation mark in a yellow triangle) plus text if necessary"],
    correctAnswer: "A warning symbol (black exclamation mark in a yellow triangle) plus text if necessary",
    explanation: "Warning signs require a yellow triangle with black symbol and optional clarifying text."
  },
  {
    id: 'joinery-l2-health-safety21',
    question: "When installing a fire door, what is the primary safety consideration?",
    options: ["Making sure it matches other doors in the building", "Ensuring it meets fire resistance specifications and is properly fitted", "The appearance of the door", "The cost of materials"],
    correctAnswer: "Ensuring it meets fire resistance specifications and is properly fitted",
    explanation: "Fire doors must meet specific resistance ratings and be correctly installed to save lives."
  },
  {
    id: 'joinery-l2-health-safety22',
    question: "What should a joiner do before operating an unfamiliar power tool on a construction site?",
    options: ["Make adjustments to suit personal preferences", "Test it briefly without supervision", "Receive proper training and read the manufacturer's instructions", "Ask a colleague to demonstrate while watching from a distance"],
    correctAnswer: "Receive proper training and read the manufacturer's instructions",
    explanation: "Proper training and reading instructions are essential before using unfamiliar power tools."
  },
  {
    id: 'joinery-l2-health-safety23',
    question: "What type of accident is most likely to occur when using a chisel incorrectly?",
    options: ["Respiratory disease", "Cut to the hand or body", "Electric shock", "Eye injury from flying dust"],
    correctAnswer: "Cut to the hand or body",
    explanation: "Incorrect chisel use commonly results in cuts when not cutting away from the body."
  },
  {
    id: 'joinery-l2-health-safety24',
    question: "What is meant by the term 'competent person' in health and safety regulations?",
    options: ["Someone who is physically strong enough to perform manual tasks", "Someone who has worked in the industry for at least 10 years", "Someone who has the necessary skills, knowledge, experience, and training to perform a task safely", "Only a formally qualified health and safety professional"],
    correctAnswer: "Someone who has the necessary skills, knowledge, experience, and training to perform a task safely",
    explanation: "Competent persons have appropriate skills, knowledge, experience and training for specific tasks."
  },
  {
    id: 'joinery-l2-health-safety25',
    question: "In terms of the 'hierarchy of control' for managing health and safety risks, which of these is the most preferable control measure?",
    options: ["Engineering controls such as dust extraction", "Eliminating the hazard entirely", "Providing personal protective equipment", "Administrative controls such as job rotation"],
    correctAnswer: "Eliminating the hazard entirely",
    explanation: "Elimination is the most effective control measure as it completely removes the hazard."
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
