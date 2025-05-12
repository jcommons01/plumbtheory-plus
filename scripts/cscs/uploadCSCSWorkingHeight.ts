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

// ✅ CSCS Working at Height Questions
const questions = [
  {
    id: 'cscs-working-height-1',
    question: "What is the first step that should be taken when planning work at height?",
    options: ["Order suitable PPE", "Arrange scaffolding", "Avoid work at height if possible", "Ensure workers are not afraid of heights"],
    correctAnswer: "Avoid work at height if possible",
    explanation: "The hierarchy of control approach requires first trying to avoid work at height entirely. Only when work can't be done safely from ground level should other control measures be considered."
  },
  {
    id: 'cscs-working-height-2',
    question: "What is considered 'work at height' under the regulations?",
    options: ["Only work above 2 meters", "Work where a person could fall a distance liable to cause personal injury", "Only work from ladders or scaffolding", "Only work on construction sites"],
    correctAnswer: "Work where a person could fall a distance liable to cause personal injury",
    explanation: "Work at height includes any work where a person could fall and be injured, regardless of height. This includes working above ground/floor level or near openings/excavations."
  },
  {
    id: 'cscs-working-height-3',
    question: "Who can perform inspections of scaffolding?",
    options: ["Any worker who uses the scaffold", "Only the site manager", "A competent person with appropriate training and experience", "Only HSE inspectors"],
    correctAnswer: "A competent person with appropriate training and experience",
    explanation: "Scaffold inspections must be performed by a competent person with sufficient training and knowledge. Complex scaffolding may require specific qualifications like those from CISRS."
  },
  {
    id: 'cscs-working-height-4',
    question: "What is the main advantage of a Mobile Elevating Work Platform (MEWP) over a ladder?",
    options: ["It's always cheaper to hire", "It provides a stable working platform with edge protection", "It can be set up more quickly", "It doesn't require any training to use"],
    correctAnswer: "It provides a stable working platform with edge protection",
    explanation: "MEWPs provide a stable platform with edge protection, allowing workers to use both hands for tasks. This makes them safer than ladders for many types of work at height."
  },
  {
    id: 'cscs-working-height-5',
    question: "What should you check before using a ladder?",
    options: ["Only that it's tall enough for the job", "That it's not damaged, is suitable for the task, and can be secured", "Just that it has the manufacturer's label attached", "Only that it's made of a non-conductive material"],
    correctAnswer: "That it's not damaged, is suitable for the task, and can be secured",
    explanation: "Before using a ladder, check for damage to stiles, rungs and feet, ensure it's suitable for the task, and confirm it can be secured. Damaged or improperly used ladders are a common accident cause."
  },
  {
    id: 'cscs-working-height-6',
    question: "What is the correct angle for positioning a leaning ladder?",
    options: ["One out, four up (75 degrees)", "One out, three up (72 degrees)", "One out, two up (63 degrees)", "Two out, one up (27 degrees)"],
    correctAnswer: "One out, four up (75 degrees)",
    explanation: "The correct angle is one out, four up (approximately 75 degrees). This positioning provides optimal stability and prevents the ladder from tipping backward or slipping outward."
  },
  {
    id: 'cscs-working-height-7',
    question: "What is a 'fragile surface' in the context of working at height?",
    options: ["Any painted surface that might be damaged by footprints", "A surface that cannot support the weight of a person and any loads they carry", "Any roof more than 20 years old", "A floor with a decorative finish"],
    correctAnswer: "A surface that cannot support the weight of a person and any loads they carry",
    explanation: "Fragile surfaces include materials like fiberglass roof lights or corroded metal sheets that can't support a person's weight. They present a significant fall-through hazard requiring specific safety measures."
  },
  {
    id: 'cscs-working-height-8',
    question: "What does the term 'leading edge work' refer to?",
    options: ["Working at the most advanced technological level", "Working on the edge of a structure where there is a risk of falling", "Working at the front of a team", "Working at the boundaries of a site"],
    correctAnswer: "Working on the edge of a structure where there is a risk of falling",
    explanation: "Leading edge work involves working at an unprotected edge where there's a fall risk. This commonly occurs during construction of floors or roofs before permanent edge protection is installed."
  },
  {
    id: 'cscs-working-height-9',
    question: "What is the purpose of a guardrail on scaffolding?",
    options: ["To attach advertising banners", "To increase the structural strength of the scaffold", "To prevent people and materials from falling", "To clearly mark the scaffold as being in use"],
    correctAnswer: "To prevent people and materials from falling",
    explanation: "Guardrails prevent falls of both people and materials from scaffolds. They provide collective protection for everyone on the platform without relying on individual protective equipment."
  },
  {
    id: 'cscs-working-height-10',
    question: "What is the maximum safe working load typically found on a Class 1 (Industrial) ladder?",
    options: ["100 kg", "150 kg", "175 kg", "200 kg"],
    correctAnswer: "175 kg",
    explanation: "Class 1 Industrial ladders typically have a maximum safe working load of 175 kg, including the user, tools, and materials. Never exceed this rating as it could lead to ladder failure."
  },
  {
    id: 'cscs-working-height-11',
    question: "What is a 'hop-up' platform?",
    options: ["A platform that can be easily moved by hopping it along the floor", "A low-level working platform typically used for internal work like plastering or painting", "A trampoline-like safety device", "A platform specifically for accessing scaffolding"],
    correctAnswer: "A low-level working platform typically used for internal work like plastering or painting",
    explanation: "Hop-up platforms are low-level platforms (typically 30-60cm high) used for internal finishing work. They provide a stable base for reaching higher areas while presenting lower risks than taller access equipment."
  },
  {
    id: 'cscs-working-height-12',
    question: "What does a fall arrest system do?",
    options: ["Prevents access to areas where falls could occur", "Minimizes the distance and consequences of a fall", "Provides a comfortable harness for working at height", "Automatically alerts emergency services if someone falls"],
    correctAnswer: "Minimizes the distance and consequences of a fall",
    explanation: "Fall arrest systems don't prevent falls but minimize their consequences by stopping the fall and reducing impact forces. They typically include an anchor point, harness, and connecting element like an energy-absorbing lanyard."
  },
  {
    id: 'cscs-working-height-13',
    question: "How often should scaffold inspections be performed during continued use?",
    options: ["Daily", "Every 3 days", "At least every 7 days", "Monthly"],
    correctAnswer: "At least every 7 days",
    explanation: "Scaffolds must be inspected at least every 7 days during continued use, as well as after any event likely to affect stability. Inspections must be recorded and performed by a competent person."
  },
  {
    id: 'cscs-working-height-14',
    question: "What is a 'gin wheel' used for in working at height?",
    options: ["To mix materials on a scaffold platform", "To hoist materials up to a work platform", "To secure ladders to buildings", "To measure wind speed before working at height"],
    correctAnswer: "To hoist materials up to a work platform",
    explanation: "A gin wheel (scaffold pulley) is used to hoist materials to height. This avoids manually carrying loads up ladders, reducing fall risks associated with climbing while carrying materials."
  },
  {
    id: 'cscs-working-height-15',
    question: "What does a harness inspection tag indicate?",
    options: ["The price of the harness", "The owner of the harness", "When the harness was last inspected and by whom", "The maximum weight the harness can support"],
    correctAnswer: "When the harness was last inspected and by whom",
    explanation: "Harness inspection tags show when equipment was last inspected and by whom. This helps ensure only properly inspected and maintained fall protection equipment is used."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-working-height', 'items', q.id), {
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