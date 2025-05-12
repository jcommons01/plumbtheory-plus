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

// ✅ CSCS Health, Safety & Environment Questions
const questions = [
  {
    id: 'cscs-hs-environment-1',
    question: "Who has the main responsibility for health and safety on a construction site?",
    options: ["The health and safety inspector", "Everyone on site", "The site manager", "The client"],
    correctAnswer: "Everyone on site",
    explanation: "While employers have legal duties, everyone on site must take responsibility for health and safety. Each person must follow site rules, use PPE correctly, and report hazards promptly."
  },
  {
    id: 'cscs-hs-environment-2',
    question: "What should you do if you spot a hazard on site?",
    options: ["Ignore it if it doesn't affect your work", "Try to fix it yourself even if you're not qualified", "Report it immediately to your supervisor", "Wait until the end of the day to report it"],
    correctAnswer: "Report it immediately to your supervisor",
    explanation: "Hazards should be reported immediately to allow prompt action before harm occurs. Never ignore hazards or attempt to fix them unless qualified and authorized to do so."
  },
  {
    id: 'cscs-hs-environment-3',
    question: "What does RIDDOR stand for?",
    options: ["Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regulation of Industrial Duties and Operational Requirements", "Review of Incidents, Damage, Danger and Operational Risks", "Registry of Illness, Disease and Disaster Operational Records"],
    correctAnswer: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
    explanation: "RIDDOR requires reporting of specified workplace incidents to enforcing authorities. These include work-related fatalities, major injuries, over-seven-day injuries, and dangerous occurrences."
  },
  {
    id: 'cscs-hs-environment-4',
    question: "What is a risk assessment?",
    options: ["A formal document that requires signing by all workers", "A calculation of the financial costs of an accident", "A process to identify hazards and decide on precautions", "A test to assess workers' knowledge of safety procedures"],
    correctAnswer: "A process to identify hazards and decide on precautions",
    explanation: "A risk assessment is a systematic process of evaluating potential risks in work activities and determining control measures. It's a legal requirement under the Management of Health and Safety at Work Regulations."
  },
  {
    id: 'cscs-hs-environment-5',
    question: "Under the Construction (Design and Management) Regulations, what document contains information about health and safety hazards on site?",
    options: ["Method statement", "Construction phase plan", "Building regulations approval", "Work completion certificate"],
    correctAnswer: "Construction phase plan",
    explanation: "The Construction Phase Plan outlines how health and safety will be managed during construction. It includes details of site hazards, control measures, and emergency procedures."
  },
  {
    id: 'cscs-hs-environment-6',
    question: "What should you do if a machine you are operating develops a fault?",
    options: ["Try to repair it yourself", "Continue using it until the end of your shift", "Inform your supervisor immediately and stop using it", "Ask a colleague to take a look at it"],
    correctAnswer: "Inform your supervisor immediately and stop using it",
    explanation: "Faulty equipment should be stopped immediately and reported to your supervisor. Continuing to use faulty machinery could lead to accidents or further damage."
  },
  {
    id: 'cscs-hs-environment-7',
    question: "What is the purpose of a Method Statement?",
    options: ["To record accidents that have occurred on site", "To provide a step-by-step guide on how to complete a task safely", "To register new workers on site", "To document material deliveries"],
    correctAnswer: "To provide a step-by-step guide on how to complete a task safely",
    explanation: "A Method Statement details how to complete tasks safely, outlining hazards and controls. It's particularly important for high-risk activities and helps ensure all workers follow the same safe procedure."
  },
  {
    id: 'cscs-hs-environment-8',
    question: "What is meant by the term 'near miss'?",
    options: ["When a project nearly meets its deadline", "An incident that could have caused injury or damage but didn't", "When a worker almost arrives late for work", "When materials are nearly used up"],
    correctAnswer: "An incident that could have caused injury or damage but didn't",
    explanation: "A 'near miss' is an event that could have caused harm but fortunately didn't. Reporting near misses is crucial as they indicate potential hazards that could cause accidents in the future."
  },
  {
    id: 'cscs-hs-environment-9',
    question: "What is the main purpose of the Health and Safety at Work Act?",
    options: ["To provide financial compensation for injured workers", "To secure the health, safety and welfare of people at work", "To establish working hours and break times", "To set wage levels for construction workers"],
    correctAnswer: "To secure the health, safety and welfare of people at work",
    explanation: "The Health and Safety at Work Act aims to secure the health, safety and welfare of people at work. It also protects others against risks arising from work activities."
  },
  {
    id: 'cscs-hs-environment-10',
    question: "What is a Permit to Work system used for?",
    options: ["To check workers have valid visas", "To control high-risk activities", "To authorize overtime work", "To record workers' attendance"],
    correctAnswer: "To control high-risk activities",
    explanation: "A Permit to Work is a formal system for controlling high-risk activities like hot work or confined space entry. It ensures all safety measures are in place before work begins."
  },
  {
    id: 'cscs-hs-environment-11',
    question: "What should you do if you see someone working unsafely on site?",
    options: ["Ignore it as it's not your responsibility", "Take a photo to show others later", "Intervene immediately if safe to do so and report it to a supervisor", "Wait until break time to mention it"],
    correctAnswer: "Intervene immediately if safe to do so and report it to a supervisor",
    explanation: "Unsafe behavior should be addressed immediately if safe to do so, and reported to supervisors. Prompt action can prevent accidents and demonstrates a positive safety culture."
  },
  {
    id: 'cscs-hs-environment-12',
    question: "What information should be displayed on the Health and Safety Law poster?",
    options: ["List of first aiders and fire wardens", "Basic health and safety information and contact details", "Names of all site workers", "Delivery schedules and site opening hours"],
    correctAnswer: "Basic health and safety information and contact details",
    explanation: "The Health and Safety Law poster displays basic information about health and safety laws and contact details for the HSE. Employers must either display this poster or provide the equivalent leaflet to workers."
  },
  {
    id: 'cscs-hs-environment-13',
    question: "When might you need to wear a safety harness on a construction site?",
    options: ["Only during bad weather", "When working at height where there is a risk of falling", "Only when instructed by the HSE inspector", "When operating any type of machinery"],
    correctAnswer: "When working at height where there is a risk of falling",
    explanation: "Safety harnesses are required when working at height where fall risks can't be adequately controlled by other means. They must be correctly fitted, regularly inspected, and used by properly trained workers."
  },
  {
    id: 'cscs-hs-environment-14',
    question: "What is the maximum fine that can be imposed by a Magistrates' Court for a health and safety offence?",
    options: ["£5,000", "£20,000", "Unlimited", "£50,000"],
    correctAnswer: "Unlimited",
    explanation: "Since 2015, Magistrates' Courts can impose unlimited fines for health and safety offences. Individuals can also face imprisonment for serious breaches."
  },
  {
    id: 'cscs-hs-environment-15',
    question: "What does PPE stand for?",
    options: ["Personal Protection Equipment", "Primary Protective Equipment", "Personal Protective Equipment", "Proper Protective Equipment"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE (Personal Protective Equipment) includes items worn to minimize exposure to workplace hazards. This includes safety helmets, gloves, eye protection, and safety footwear."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-hs-environment', 'items', q.id), {
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