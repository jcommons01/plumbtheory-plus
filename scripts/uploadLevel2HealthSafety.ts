// ✅ COMPLETE: scripts/uploadLevel2HealthSafety.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// Initialize Firebase App
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
    id: 'level2hs11',
    question: "What does COSHH stand for?",
    options: [
      "Control of Substances Hazardous to Health",
      "Care of Safety Hazards Handbook",
      "Code of Safety and Hazardous Handling",
      "Control of Safety Hazards at Home",
    ],
    correctAnswer: "Control of Substances Hazardous to Health",
    explanation: "COSHH regulations protect workers from hazardous substances."
  },
  {
    id: 'level2hs12',
    question: "What should you do if you discover faulty equipment on site?",
    options: [
      "Use it carefully",
      "Ignore it",
      "Report and isolate it",
      "Give it to someone else",
    ],
    correctAnswer: "Report and isolate it",
    explanation: "Faulty equipment must be reported and removed from service to prevent accidents."
  },
  {
    id: 'level2hs13',
    question: "What is the purpose of a method statement?",
    options: [
      "To reduce costs",
      "To increase productivity",
      "To describe how a task will be carried out safely",
      "To explain company policies",
    ],
    correctAnswer: "To describe how a task will be carried out safely",
    explanation: "Method statements explain safe systems of work for specific tasks."
  },
  {
    id: 'level2hs14',
    question: "Which of the following is an example of a biological hazard?",
    options: ["Trip hazard", "Noise", "Bacteria", "Dust"],
    correctAnswer: "Bacteria",
    explanation: "Biological hazards include bacteria, viruses, and fungi that can cause illness."
  },
  {
    id: 'level2hs15',
    question: "What should you do if you find a fire door wedged open?",
    options: [
      "Ignore it",
      "Close it and report it",
      "Leave it open",
      "Use it to exit",
    ],
    correctAnswer: "Close it and report it",
    explanation: "Fire doors must never be wedged open as they are vital in containing fire."
  },
  {
    id: 'level2hs16',
    question: "Which regulation requires employers to carry out risk assessments?",
    options: [
      "CDM Regulations",
      "Manual Handling Regulations",
      "RIDDOR",
      "Management of Health and Safety at Work Regulations",
    ],
    correctAnswer: "Management of Health and Safety at Work Regulations",
    explanation: "This regulation requires risk assessments to identify and control hazards."
  },
  {
    id: 'level2hs17',
    question: "What is the purpose of a permit-to-work system?",
    options: [
      "To increase paperwork",
      "To authorise dangerous work under controlled conditions",
      "To train apprentices",
      "To manage team rotations",
    ],
    correctAnswer: "To authorise dangerous work under controlled conditions",
    explanation: "Permits-to-work are used for high-risk activities like confined space entry."
  },
  {
    id: 'level2hs18',
    question: "Who is responsible for health and safety on site?",
    options: [
      "Health and Safety Executive",
      "Only the employer",
      "Everyone on site",
      "The local council",
    ],
    correctAnswer: "Everyone on site",
    explanation: "All workers share responsibility for health and safety under the law."
  },
  {
    id: 'level2hs19',
    question: "Which of the following is a symptom of HAVS (Hand-Arm Vibration Syndrome)?",
    options: ["Back pain", "Blurred vision", "White fingers", "Swollen ankles"],
    correctAnswer: "White fingers",
    explanation: "HAVS causes circulatory damage from prolonged use of vibrating tools."
  },
  {
    id: 'level2hs20',
    question: "Which regulation covers the reporting of workplace injuries and incidents?",
    options: ["COSHH", "RIDDOR", "CDM", "PPE"],
    correctAnswer: "RIDDOR",
    explanation: "RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations."
  },
  {
    id: 'level2hs21',
    question: "What is an SDS?",
    options: [
      "Safety Data Sheet",
      "Safety Detection Sensor",
      "Secure Document Storage",
      "Standard Drill Socket",
    ],
    correctAnswer: "Safety Data Sheet",
    explanation: "SDS provide information on handling and hazards of substances."
  },
  {
    id: 'level2hs22',
    question: "Why is good housekeeping important on site?",
    options: [
      "It impresses clients",
      "It increases insurance",
      "It reduces trip hazards and keeps work areas safe",
      "It saves materials",
    ],
    correctAnswer: "It reduces trip hazards and keeps work areas safe",
    explanation: "Good housekeeping reduces risks and helps maintain a tidy site."
  },
  {
    id: 'level2hs23',
    question: "Which signal colour indicates emergency escape or first aid equipment?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: "Green",
    explanation: "Green safety signs show escape routes and first aid equipment."
  },
  {
    id: 'level2hs24',
    question: "What should you do if exposed to asbestos on site?",
    options: [
      "Continue working",
      "Remove it yourself",
      "Stop work and report it immediately",
      "Spray water and sweep",
    ],
    correctAnswer: "Stop work and report it immediately",
    explanation: "Asbestos is extremely hazardous and must be handled by specialists."
  },
  {
    id: 'level2hs25',
    question: "Why is a toolbox talk important?",
    options: [
      "To meet daily targets",
      "To entertain workers",
      "To share safety info and site updates",
      "To distribute wages",
    ],
    correctAnswer: "To share safety info and site updates",
    explanation: "Toolbox talks raise awareness and help maintain safe working practices."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-health-safety', 'items', q.id), {
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
