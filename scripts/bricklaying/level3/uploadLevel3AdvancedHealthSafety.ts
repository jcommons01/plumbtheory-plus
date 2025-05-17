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

// ✅ Bricklaying Level 3 Health & Safety (First 25 Questions Only)
const questions = [
  {
    id: 'bricklaying-l3-topic1-1',
    question: "What is the main purpose of a Construction Phase Health & Safety Plan?",
    options: [
      "To track construction schedules",
      "To outline labour roles",
      "To manage project costs",
      "To identify and control risks"
    ],
    correctAnswer: "To identify and control risks",
    explanation: "The plan sets out how health and safety risks will be managed on a specific construction site."
  },
  {
    id: 'bricklaying-l3-topic1-2',
    question: "Which regulation requires scaffolding inspections by a competent person?",
    options: [
      "COSHH 2002",
      "PPE Regulations 1992",
      "Manual Handling Regs 1992",
      "Work at Height Regs 2005"
    ],
    correctAnswer: "Work at Height Regs 2005",
    explanation: "These regulations mandate scaffold inspections before first use and every 7 days after."
  },
  {
    id: 'bricklaying-l3-topic1-3',
    question: "What is the correct COSHH hierarchy for controlling silica dust?",
    options: [
      "PPE only",
      "Disciplinary measures",
      "Substitute, control, admin, PPE",
      "Use water suppression only"
    ],
    correctAnswer: "Substitute, control, admin, PPE",
    explanation: "COSHH requires eliminating or reducing exposure before relying on PPE."
  },
  {
    id: 'bricklaying-l3-topic1-4',
    question: "What is a 'Permit to Work' system used for?",
    options: [
      "Scheduling worker breaks",
      "Authorising overtime",
      "Controlling high-risk tasks",
      "Verifying material orders"
    ],
    correctAnswer: "Controlling high-risk tasks",
    explanation: "Permit systems are used for hazardous work like hot works and confined spaces."
  },
  {
    id: 'bricklaying-l3-topic1-5',
    question: "What is the UK exposure limit for silica dust?",
    options: [
      "0.1 mg/m³ (8hr average)",
      "0.4 mg/m³ (8hr average)",
      "1.0 mg/m³ (8hr average)",
      "5.0 mg/m³ (8hr average)"
    ],
    correctAnswer: "0.1 mg/m³ (8hr average)",
    explanation: "The COSHH limit for respirable crystalline silica is 0.1 mg/m³ over 8 hours."
  },
  {
    id: 'bricklaying-l3-topic1-6',
    question: "What does ALARP mean in risk management?",
    options: [
      "Avoid all possible risks",
      "Accept all construction risks",
      "Eliminate only legal risks",
      "Balance risk and practicality"
    ],
    correctAnswer: "Balance risk and practicality",
    explanation: "ALARP requires risk to be reduced unless the cost is grossly disproportionate."
  },
  {
    id: 'bricklaying-l3-topic1-7',
    question: "What must a COSHH assessment for cement include?",
    options: [
      "Only PPE advice",
      "Brand names",
      "Health risks and controls",
      "Material cost breakdown"
    ],
    correctAnswer: "Health risks and controls",
    explanation: "The assessment must include hazards, exposure risks, controls, and health monitoring."
  },
  {
    id: 'bricklaying-l3-topic1-8',
    question: "Which RIDDOR incident must be reported to the HSE?",
    options: [
      "Minor cuts",
      "One-day absence",
      "Scaffold collapse (no injury)",
      "Sick leave from flu"
    ],
    correctAnswer: "Scaffold collapse (no injury)",
    explanation: "Scaffold collapse is a 'dangerous occurrence' and must be reported under RIDDOR."
  },
  {
    id: 'bricklaying-l3-topic1-9',
    question: "When is a method statement legally required?",
    options: [
      "For listed buildings only",
      "When working in bad weather",
      "If the client requests it",
      "When high-risk work is identified"
    ],
    correctAnswer: "When high-risk work is identified",
    explanation: "Method statements are needed to manage high-risk tasks as part of safe systems of work."
  },
  {
    id: 'bricklaying-l3-topic1-10',
    question: "When must face fit testing of RPE be repeated?",
    options: [
      "Every year",
      "Only once",
      "After facial changes or new mask",
      "Every 5 years"
    ],
    correctAnswer: "After facial changes or new mask",
    explanation: "Face fit testing must be repeated if facial structure or mask type changes."
  },
  {
    id: 'bricklaying-l3-topic1-11',
    question: "What is the purpose of a site toolbox talk?",
    options: [
      "To train new managers",
      "To assign overtime",
      "To give safety instructions",
      "To sell safety gear"
    ],
    correctAnswer: "To give safety instructions",
    explanation: "Toolbox talks reinforce safety practices relevant to specific on-site tasks."
  },
  {
    id: 'bricklaying-l3-topic1-12',
    question: "What is the Principal Designer's health & safety role?",
    options: [
      "Provide first aid",
      "Design masonry layout",
      "Manage safety pre-construction",
      "Supervise site workers"
    ],
    correctAnswer: "Manage safety pre-construction",
    explanation: "The Principal Designer coordinates design-phase safety planning under CDM 2015."
  },
  {
    id: 'bricklaying-l3-topic1-13',
    question: "Why conduct health surveillance for silica exposure?",
    options: [
      "To calculate wages",
      "To identify early illness signs",
      "To qualify for overtime",
      "For insurance records"
    ],
    correctAnswer: "To identify early illness signs",
    explanation: "Health surveillance helps detect issues like silicosis before they become serious."
  },
  {
    id: 'bricklaying-l3-topic1-14',
    question: "When should a risk assessment be reviewed?",
    options: [
      "Every 10 years",
      "Only if an accident happens",
      "When site conditions change",
      "Never if initially completed"
    ],
    correctAnswer: "When site conditions change",
    explanation: "Risk assessments must be reviewed when new risks or changes occur."
  },
  {
    id: 'bricklaying-l3-topic1-15',
    question: "What is the legal requirement for emergency procedures with hazardous substances?",
    options: [
      "Only for unusual chemicals",
      "Documented and communicated to workers",
      "Only for serious incidents",
      "Not legally required"
    ],
    correctAnswer: "Documented and communicated to workers",
    explanation: "COSHH requires clear, tested emergency plans for hazardous materials like cement."
  },
  {
    id: 'bricklaying-l3-topic1-16',
    question: "What does 'residual risk' mean?",
    options: [
      "Old site risks",
      "Risks before assessment",
      "Remaining risk after controls",
      "Material storage risk"
    ],
    correctAnswer: "Remaining risk after controls",
    explanation: "Residual risk is what remains after all planned controls are in place."
  },
  {
    id: 'bricklaying-l3-topic1-17',
    question: "When must a Principal Contractor be appointed?",
    options: [
      "Any job over £10k",
      "All jobs over 30 days or 500 person-days",
      "All bricklaying jobs",
      "Only on commercial sites"
    ],
    correctAnswer: "All jobs over 30 days or 500 person-days",
    explanation: "CDM 2015 requires this role on larger or longer-duration construction projects."
  },
  {
    id: 'bricklaying-l3-topic1-18',
    question: "What is the purpose of a Safety Method Statement?",
    options: [
      "To outline emergency contacts",
      "To document materials",
      "To detail safe work steps",
      "To record equipment checks"
    ],
    correctAnswer: "To detail safe work steps",
    explanation: "Method statements explain how to safely complete specific tasks, especially risky ones."
  },
  {
    id: 'bricklaying-l3-topic1-19',
    question: "How long must health records be kept for silica-exposed workers?",
    options: [
      "5 years",
      "10 years",
      "20 years",
      "40 years"
    ],
    correctAnswer: "40 years",
    explanation: "COSHH requires records to be retained for 40 years due to long latency of diseases."
  },
  {
    id: 'bricklaying-l3-topic1-20',
    question: "What must edge protection include under Work at Height Regs?",
    options: [
      "High-vis mesh",
      "One guardrail only",
      "Guardrail, mid-rail, toe board",
      "Chains and netting"
    ],
    correctAnswer: "Guardrail, mid-rail, toe board",
    explanation: "Proper edge protection includes rails and boards to prevent falls and dropped items."
  },
  {
    id: 'bricklaying-l3-topic1-21',
    question: "At what wind speed should work at height stop?",
    options: [
      "13 mph",
      "17 mph",
      "23 mph",
      "30 mph"
    ],
    correctAnswer: "23 mph",
    explanation: "Work at height should stop when wind exceeds 23 mph due to stability and safety concerns."
  },
  {
    id: 'bricklaying-l3-topic1-22',
    question: "What noise level requires a hearing protection zone?",
    options: [
      "80 dB(A)",
      "85 dB(A)",
      "90 dB(A)",
      "95 dB(A)"
    ],
    correctAnswer: "85 dB(A)",
    explanation: "Exposure over 85 dB(A) requires action including hearing protection and signage."
  },
  {
    id: 'bricklaying-l3-topic1-23',
    question: "Who manages health and safety during the construction phase?",
    options: [
      "The Client",
      "The HSE",
      "Principal Designer",
      "Principal Contractor"
    ],
    correctAnswer: "Principal Contractor",
    explanation: "The Principal Contractor leads on-site safety and must coordinate all construction risks."
  },
  {
    id: 'bricklaying-l3-topic1-24',
    question: "What is the purpose of a 'hot works' permit?",
    options: [
      "To monitor overtime",
      "To authorise welding near flammable materials",
      "To allow weekend work",
      "To register high temperatures"
    ],
    correctAnswer: "To authorise welding near flammable materials",
    explanation: "Hot works permits control ignition risks from flame-based tasks in hazardous areas."
  },
  {
    id: 'bricklaying-l3-topic1-25',
    question: "What must be available on site for hazardous substances?",
    options: [
      "PPE manuals",
      "Manufacturer contact details",
      "Safety data sheets and summaries",
      "Signed delivery forms"
    ],
    correctAnswer: "Safety data sheets and summaries",
    explanation: "COSHH requires that SDS info is available on site and clearly explained to workers."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-health-safety', 'items', q.id), {
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
