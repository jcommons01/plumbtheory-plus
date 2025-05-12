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

// ✅ CSCS Manual Handling Questions
const questions = [
  {
    id: 'cscs-manual-handling-1',
    question: "What does 'manual handling' refer to?",
    options: ["Using hand tools for construction work", "Operating machinery manually rather than automatically", "Any activity requiring lifting, carrying, pushing, or pulling", "Reading instruction manuals"],
    correctAnswer: "Any activity requiring lifting, carrying, pushing, or pulling",
    explanation: "Manual handling refers to any transporting or supporting of a load by hand or bodily force. This includes lifting, putting down, pushing, pulling, carrying or moving activities."
  },
  {
    id: 'cscs-manual-handling-2',
    question: "What is the maximum weight that should be lifted by a person under ideal conditions?",
    options: ["There is no legal maximum weight limit", "25kg for men and 16kg for women at waist height", "50kg regardless of gender", "100kg with mechanical assistance"],
    correctAnswer: "There is no legal maximum weight limit",
    explanation: "There is no legal maximum weight limit as safe lifting capacity varies between individuals. HSE guidance provides indicative figures (25kg for men, 16kg for women at waist height) as starting points for risk assessment."
  },
  {
    id: 'cscs-manual-handling-3',
    question: "What is the correct position for your feet when lifting a load from the ground?",
    options: ["Feet together to provide balance", "One foot slightly forward of the other to provide a stable base", "Feet as far apart as possible", "Feet in a line, one directly behind the other"],
    correctAnswer: "One foot slightly forward of the other to provide a stable base",
    explanation: "Position feet shoulder-width apart with one foot slightly forward to provide a stable base. This stance helps maintain balance and allows effective use of leg muscles."
  },
  {
    id: 'cscs-manual-handling-4',
    question: "What does TILE stand for in manual handling risk assessment?",
    options: ["Time, Injury, Lifting, Environment", "Task, Individual, Load, Environment", "Training, Inspection, Loading, Equipment", "Transport, Inspection, Lifting, Evaluation"],
    correctAnswer: "Task, Individual, Load, Environment",
    explanation: "TILE stands for Task, Individual, Load, Environment - the four key factors in manual handling risk assessment. These factors help identify control measures needed to reduce risks."
  },
  {
    id: 'cscs-manual-handling-5',
    question: "What should you do before attempting to lift a load?",
    options: ["Quickly lift it to test how heavy it is", "Take pain relief medication as a precaution", "Plan the lift and check the route is clear", "Always get someone else to help regardless of weight"],
    correctAnswer: "Plan the lift and check the route is clear",
    explanation: "Before lifting, plan ahead by assessing the weight, deciding grip points, and checking for clear routes. Never test a load by quick lifting as this can cause injury if it's unexpectedly heavy."
  },
  {
    id: 'cscs-manual-handling-6',
    question: "What is the preferred position of your back when lifting?",
    options: ["Bent forward to provide leverage", "Twisted slightly to the side for better grip", "Straight, maintaining its natural curves", "Arched backward to build strength"],
    correctAnswer: "Straight, maintaining its natural curves",
    explanation: "Keep your back straight, maintaining its natural curves during lifting. This position distributes load evenly across spinal discs and minimizes stress on back muscles."
  },
  {
    id: 'cscs-manual-handling-7',
    question: "Who has responsibility for manual handling safety in the workplace?",
    options: ["Only the health and safety officer", "Only supervisors and managers", "Only individual workers", "Both employers and employees have responsibilities"],
    correctAnswer: "Both employers and employees have responsibilities",
    explanation: "Both employers and employees have responsibilities for manual handling safety. Employers must provide safe systems of work while employees must follow procedures and use equipment provided properly."
  },
  {
    id: 'cscs-manual-handling-8',
    question: "What does the acronym MAC stand for in manual handling assessment?",
    options: ["Manual Activity Chart", "Movement Assessment Checklist", "Manual Assessment Chart", "Movement Activity Certification"],
    correctAnswer: "Manual Assessment Chart",
    explanation: "MAC stands for Manual Assessment Chart, an HSE tool for assessing common risk factors in lifting operations. It uses a traffic light approach to highlight risk levels for different aspects of manual handling tasks."
  },
  {
    id: 'cscs-manual-handling-9',
    question: "What type of injury is most commonly associated with poor manual handling techniques?",
    options: ["Head injuries", "Musculoskeletal disorders", "Skin irritations", "Respiratory problems"],
    correctAnswer: "Musculoskeletal disorders",
    explanation: "Musculoskeletal disorders (MSDs) are most commonly associated with poor manual handling. These include back pain, sprains, strains, and conditions affecting muscles, joints, tendons, and ligaments."
  },
  {
    id: 'cscs-manual-handling-10',
    question: "When carrying a load, where should it be positioned relative to your body?",
    options: ["At arm's length for better balance", "As close as possible to your body", "Above head height for better visibility", "Below waist level to protect your back"],
    correctAnswer: "As close as possible to your body",
    explanation: "Hold loads close to your body, around waist level where possible. This reduces strain on your back by keeping the weight near your center of gravity."
  },
  {
    id: 'cscs-manual-handling-11',
    question: "What is meant by 'mechanical aid' in the context of manual handling?",
    options: ["Using a second person to help", "Taking painkillers before lifting", "Equipment such as trolleys or hoists to assist with moving loads", "Using gloves to improve grip"],
    correctAnswer: "Equipment such as trolleys or hoists to assist with moving loads",
    explanation: "Mechanical aids are equipment like trolleys, hoists, or pallet trucks that assist with moving loads. They reduce physical effort required and minimize injury risks when manual handling cannot be avoided."
  },
  {
    id: 'cscs-manual-handling-12',
    question: "What is the main reason to avoid twisting while lifting or carrying a load?",
    options: ["It makes you look unprofessional", "It can cause damage to the spine and back muscles", "It takes more time to complete the task", "It uses more energy than necessary"],
    correctAnswer: "It can cause damage to the spine and back muscles",
    explanation: "Twisting while lifting puts asymmetrical stress on spinal discs, significantly increasing injury risk. Instead, move your feet to turn your whole body as one unit."
  },
  {
    id: 'cscs-manual-handling-13',
    question: "What should you consider about a load before attempting to lift it?",
    options: ["Only its weight", "Only its shape and size", "Its weight, shape, size, stability and grip points", "Only where it needs to be moved to"],
    correctAnswer: "Its weight, shape, size, stability and grip points",
    explanation: "Assess the load's weight, shape, size, stability, and grip points before lifting. This helps determine if you can lift safely alone or need assistance or mechanical aids."
  },
  {
    id: 'cscs-manual-handling-14',
    question: "In a team lift, what is important to ensure safety?",
    options: ["Everyone should be approximately the same height", "One person should lift more than the others", "One person should be appointed to coordinate the lift", "Each person should lift using their own preferred technique"],
    correctAnswer: "One person should be appointed to coordinate the lift",
    explanation: "One person should coordinate team lifts to ensure everyone moves simultaneously. This prevents uneven weight distribution and maintains safety throughout the lift."
  },
  {
    id: 'cscs-manual-handling-15',
    question: "What is the correct sequence for a safe lift from ground level?",
    options: ["Bend knees, keep back straight, grip load, lift with back", "Bend at waist, grip load, straighten back, lift", "Position feet, bend knees, keep back straight, secure grip, lift using leg muscles", "Grip load, jerk upward quickly, adjust grip once standing"],
    correctAnswer: "Position feet, bend knees, keep back straight, secure grip, lift using leg muscles",
    explanation: "The correct sequence is: position feet properly, bend knees (not back), keep back straight, secure grip, and lift using leg muscles. This technique uses strong leg muscles while protecting your spine."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-manual-handling', 'items', q.id), {
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