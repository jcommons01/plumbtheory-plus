import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// ✅ Firebase Initialization
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

// ✅ Level 2 Hot Water Questions
const questions = [
  {
    id: 'level2hot1',
    question: "Which UK Building Regulation covers hot water safety and system requirements?",
    options: ["Part G", "Part H", "Part L", "Part M"],
    correctAnswer: "Part G",
    explanation: "Part G outlines safety and performance standards for hot water systems."
  },
  {
    id: 'level2hot2',
    question: "What is the typical temperature setting for domestic hot water cylinders?",
    options: ["30°C", "45°C", "60°C", "80°C"],
    correctAnswer: "60°C",
    explanation: "Hot water cylinders should be set to at least 60°C to prevent Legionella."
  },
  {
    id: 'level2hot3',
    question: "Which device prevents overpressure in an unvented cylinder?",
    options: ["Expansion vessel", "Tundish", "PRV (Pressure Reducing Valve)", "T&P Valve"],
    correctAnswer: "T&P Valve",
    explanation: "The temperature and pressure relief valve prevents excessive build-up."
  },
  {
    id: 'level2hot4',
    question: "What is the purpose of a tundish in an unvented system?",
    options: ["To filter water", "To allow visual discharge", "To mix hot and cold", "To isolate flow"],
    correctAnswer: "To allow visual discharge",
    explanation: "A tundish provides visible discharge from the safety valve."
  },
  {
    id: 'level2hot5',
    question: "What is the minimum recommended pipe size for a gravity discharge pipe after a tundish in an unvented system?",
    options: ["15mm", "22mm", "28mm", "32mm"],
    correctAnswer: "22mm",
    explanation: "A 22mm discharge pipe is the minimum for gravity-fed discharge."
  },
  {
    id: 'level2hot6',
    question: "What is the minimum vertical drop after a tundish?",
    options: ["100mm", "200mm", "300mm", "400mm"],
    correctAnswer: "300mm",
    explanation: "A 300mm vertical drop prevents backflow and ensures safe discharge."
  },
  {
    id: 'level2hot7',
    question: "Which material is commonly used for hot water pipework in domestic systems?",
    options: ["MDPE", "PVC", "Copper", "Lead"],
    correctAnswer: "Copper",
    explanation: "Copper withstands high temperatures and is widely used for hot water."
  },
  {
    id: 'level2hot8',
    question: "What prevents thermal expansion from damaging hot water systems?",
    options: ["Check valve", "Expansion vessel", "Drain cock", "Stop valve"],
    correctAnswer: "Expansion vessel",
    explanation: "Expansion vessels absorb expanding water and relieve system pressure."
  },
  {
    id: 'level2hot9',
    question: "Which type of hot water system does NOT require a storage cylinder?",
    options: ["Vented", "Indirect", "Combination boiler", "Unvented"],
    correctAnswer: "Combination boiler",
    explanation: "Combi boilers heat water on demand and don’t use storage cylinders."
  },
  {
    id: 'level2hot10',
    question: "Which component mixes hot and cold water to prevent scalding?",
    options: ["Thermostatic mixing valve", "Check valve", "Gate valve", "Tundish"],
    correctAnswer: "Thermostatic mixing valve",
    explanation: "TMVs regulate outlet temperature to prevent burns."
  },
  {
    id: 'level2hot11',
    question: "How often should unvented hot water cylinders be serviced?",
    options: ["Every 2 years", "Annually", "Every 5 years", "Never"],
    correctAnswer: "Annually",
    explanation: "Annual servicing ensures safety valves and components work correctly."
  },
  {
    id: 'level2hot12',
    question: "What is the safe maximum outlet temperature for domestic hot water?",
    options: ["45°C", "50°C", "55°C", "60°C"],
    correctAnswer: "55°C",
    explanation: "Outlet temperatures over 55°C increase scalding risk."
  },
  {
    id: 'level2hot13',
    question: "What is the function of a secondary return in hot water systems?",
    options: ["To balance pressure", "To aid flow", "To maintain hot water at outlets", "To fill the cylinder"],
    correctAnswer: "To maintain hot water at outlets",
    explanation: "Secondary returns keep hot water available without waiting."
  },
  {
    id: 'level2hot14',
    question: "What does S-plan refer to in plumbing?",
    options: ["Pipe bending technique", "Hot water safety device", "Heating zone valve system", "Pump type"],
    correctAnswer: "Heating zone valve system",
    explanation: "S-plan systems use separate motorised valves for heating zones."
  },
  {
    id: 'level2hot15',
    question: "What should be fitted before a TMV to ensure its performance?",
    options: ["Double check valve", "Isolating valve", "Filter and strainer", "Tundish"],
    correctAnswer: "Filter and strainer",
    explanation: "Filters prevent debris from affecting mixing accuracy."
  },
  {
    id: 'level2hot16',
    question: "Where should a T&P valve be located on a hot water cylinder?",
    options: ["Bottom", "Side", "Top", "Any point"],
    correctAnswer: "Top",
    explanation: "It must sense the hottest water and release pressure from the top."
  },
  {
    id: 'level2hot17',
    question: "What is the minimum straight length of discharge pipe from a T&P valve before any bends?",
    options: ["100mm", "150mm", "200mm", "300mm"],
    correctAnswer: "300mm",
    explanation: "Allows visible discharge before any directional change."
  },
  {
    id: 'level2hot18',
    question: "Which test confirms a hot water cylinder is safe to pressurise?",
    options: ["Insulation test", "Polarity test", "Pressure test", "Flow test"],
    correctAnswer: "Pressure test",
    explanation: "Pressure testing ensures the system can handle expected loads."
  },
  {
    id: 'level2hot19',
    question: "What causes banging noises in hot water pipes?",
    options: ["Airlocks", "High temperature", "Water hammer", "Loose lagging"],
    correctAnswer: "Water hammer",
    explanation: "Water hammer can result from sudden pressure changes."
  },
  {
    id: 'level2hot20',
    question: "Which system allows mains-fed hot water with no vent pipes?",
    options: ["Vented", "Indirect", "Unvented", "Gravity"],
    correctAnswer: "Unvented",
    explanation: "Unvented systems connect directly to mains and require safety controls."
  },
  {
    id: 'level2hot21',
    question: "What colour is typically used to identify hot water pipework?",
    options: ["Blue", "Yellow", "Green", "Red"],
    correctAnswer: "Red",
    explanation: "Red is the standard identifier for hot water services."
  },
  {
    id: 'level2hot22',
    question: "Which safety device is NOT part of an unvented hot water system?",
    options: ["Expansion relief valve", "Tundish", "F&E tank", "T&P valve"],
    correctAnswer: "F&E tank",
    explanation: "F&E tanks are used in vented systems, not unvented."
  },
  {
    id: 'level2hot23',
    question: "Why should hot and cold pipes not be clipped together?",
    options: ["Noise transfer", "Corrosion", "Heat transfer", "Leak risk"],
    correctAnswer: "Heat transfer",
    explanation: "Keeping hot and cold apart avoids unnecessary warming."
  },
  {
    id: 'level2hot24',
    question: "What should be done before turning on a new hot water system?",
    options: ["Notify Ofwat", "Insulate pipes", "Commission and test", "Label pipes"],
    correctAnswer: "Commission and test",
    explanation: "Commissioning checks system function and safety."
  },
  {
    id: 'level2hot25',
    question: "Which regulation governs the prevention of scalding in domestic systems?",
    options: ["Part H", "Water Regulations 1999", "Part G", "Part P"],
    correctAnswer: "Part G",
    explanation: "Part G requires control of hot water temperatures to prevent scalding."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-hot-water', 'items', q.id), {
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
