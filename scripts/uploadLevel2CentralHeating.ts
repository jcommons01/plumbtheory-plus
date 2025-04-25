// ✅ COMPLETE: scripts/uploadLevel2CentralHeating.ts with 25 questions
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
    id: 'level2heat1',
    topic: 'level2-central-heating',
    question: "What is the main purpose of a central heating system?",
    options: ["Provide hot water", "Cool rooms", "Provide space heating", "Ventilate rooms"],
    correctAnswer: "Provide space heating",
    explanation: "Central heating systems distribute heat to warm up indoor spaces."
  },
  {
    id: 'level2heat2',
    topic: 'level2-central-heating',
    question: "Which type of boiler heats water instantly and has no storage cylinder?",
    options: ["Regular boiler", "System boiler", "Combination boiler", "Condensing boiler"],
    correctAnswer: "Combination boiler",
    explanation: "Combi boilers provide hot water and heating on demand without storage."
  },
  {
    id: 'level2heat3',
    topic: 'level2-central-heating',
    question: "What is the role of a room thermostat in a heating system?",
    options: ["Heat water", "Circulate water", "Control room temperature", "Store energy"],
    correctAnswer: "Control room temperature",
    explanation: "Room thermostats maintain a set temperature by switching heating on/off."
  },
  {
    id: 'level2heat4',
    topic: 'level2-central-heating',
    question: "Which layout has a single pipe loop with radiators in sequence?",
    options: ["Two-pipe", "Microbore", "Single-pipe", "Gravity-fed"],
    correctAnswer: "Single-pipe",
    explanation: "Single-pipe systems feed water through one loop, reducing efficiency."
  },
  {
    id: 'level2heat5',
    topic: 'level2-central-heating',
    question: "What does TRV stand for?",
    options: ["Thermal radiator valve", "Temperature regulating valve", "Thermostatic radiator valve", "Timed radiator valve"],
    correctAnswer: "Thermostatic radiator valve",
    explanation: "TRVs allow room-by-room temperature control on individual radiators."
  },
  {
    id: 'level2heat6',
    topic: 'level2-central-heating',
    question: "Where is the F&E tank usually installed in an open-vented system?",
    options: ["Basement", "Roof space", "Kitchen", "Garage"],
    correctAnswer: "Roof space",
    explanation: "The feed and expansion tank is positioned above the system to maintain pressure."
  },
  {
    id: 'level2heat7',
    topic: 'level2-central-heating',
    question: "Which component removes air from a sealed central heating system?",
    options: ["TRV", "Auto air vent", "Pump", "Drain valve"],
    correctAnswer: "Auto air vent",
    explanation: "Automatic air vents release trapped air from the system."
  },
  {
    id: 'level2heat8',
    topic: 'level2-central-heating',
    question: "What causes radiator cold spots at the top?",
    options: ["Low pressure", "Air trapped", "Dirty water", "Poor circulation"],
    correctAnswer: "Air trapped",
    explanation: "Air collects at the top and prevents hot water from circulating."
  },
  {
    id: 'level2heat9',
    topic: 'level2-central-heating',
    question: "Which component allows system draining during maintenance?",
    options: ["TRV", "Pressure relief valve", "Drain-off valve", "Room stat"],
    correctAnswer: "Drain-off valve",
    explanation: "Drain valves allow full or partial draining of the heating circuit."
  },
  {
    id: 'level2heat10',
    topic: 'level2-central-heating',
    question: "Which type of system has separate motorised valves for heating and hot water?",
    options: ["Y-Plan", "S-Plan", "Gravity-fed", "Combi boiler"],
    correctAnswer: "S-Plan",
    explanation: "S-plan systems use individual motorised valves for each heating zone."
  },
  {
    id: 'level2heat11',
    topic: 'level2-central-heating',
    question: "What is the typical flow temperature in a central heating system?",
    options: ["45°C", "60°C", "75°C", "90°C"],
    correctAnswer: "75°C",
    explanation: "Central heating flow temperatures are generally set between 70–75°C."
  },
  {
    id: 'level2heat12',
    topic: 'level2-central-heating',
    question: "Why is inhibitor added to a heating system?",
    options: ["Improve pump speed", "Increase heat output", "Prevent corrosion and scale", "Boost pressure"],
    correctAnswer: "Prevent corrosion and scale",
    explanation: "Inhibitor chemicals protect pipework, radiators, and boiler components."
  },
  {
    id: 'level2heat13',
    topic: 'level2-central-heating',
    question: "Which device controls heating based on outside weather?",
    options: ["Programmer", "Smart valve", "Weather compensator", "Thermostat"],
    correctAnswer: "Weather compensator",
    explanation: "Weather compensation adjusts heating flow according to external temperatures."
  },
  {
    id: 'level2heat14',
    topic: 'level2-central-heating',
    question: "What does a bypass valve do in a sealed system?",
    options: ["Stops airlocks", "Reduces scale", "Maintains flow when zones close", "Adds inhibitor"],
    correctAnswer: "Maintains flow when zones close",
    explanation: "Bypass valves protect pumps and boilers by allowing minimum circulation."
  },
  {
    id: 'level2heat15',
    topic: 'level2-central-heating',
    question: "What is the minimum expansion vessel pressure before filling?",
    options: ["0.3 bar", "0.5 bar", "1.0 bar", "1.5 bar"],
    correctAnswer: "1.0 bar",
    explanation: "Expansion vessels are typically pre-charged to 1.0 bar."
  },
  {
    id: 'level2heat16',
    topic: 'level2-central-heating',
    question: "What is a power flush?",
    options: ["Pipe freezing", "System insulation", "High-pressure cleaning", "Cylinder fitting"],
    correctAnswer: "High-pressure cleaning",
    explanation: "Power flushing removes sludge, rust, and debris from heating circuits."
  },
  {
    id: 'level2heat17',
    topic: 'level2-central-heating',
    question: "Which test checks for hidden water leaks in a sealed system?",
    options: ["Polarity test", "Pressure test", "Resistance test", "Gas tightness test"],
    correctAnswer: "Pressure test",
    explanation: "Pressurising the system and monitoring drop detects hidden leaks."
  },
  {
    id: 'level2heat18',
    topic: 'level2-central-heating',
    question: "Which part of a radiator gets hot first when working correctly?",
    options: ["Top left", "Top right", "Bottom right", "Bottom left"],
    correctAnswer: "Bottom right",
    explanation: "Hot water enters the radiator from the bottom and rises with circulation."
  },
  {
    id: 'level2heat19',
    topic: 'level2-central-heating',
    question: "What is the function of the programmer in a heating system?",
    options: ["Store heat", "Measure pressure", "Control timing of heating and hot water", "Prevent backflow"],
    correctAnswer: "Control timing of heating and hot water",
    explanation: "Programmers automate on/off times for heating and water."
  },
  {
    id: 'level2heat20',
    topic: 'level2-central-heating',
    question: "What could be a cause of kettling in a boiler?",
    options: ["Low pressure", "Scale buildup", "Wrong thermostat", "Fast pump"],
    correctAnswer: "Scale buildup",
    explanation: "Limescale causes hotspots in the heat exchanger, leading to kettling."
  },
  {
    id: 'level2heat21',
    topic: 'level2-central-heating',
    question: "Which system layout allows equal flow and return lengths?",
    options: ["Radial", "Y-plan", "Two-pipe", "Manifold"],
    correctAnswer: "Manifold",
    explanation: "Manifold layouts supply each radiator with equal-length pipe runs."
  },
  {
    id: 'level2heat22',
    topic: 'level2-central-heating',
    question: "What pipe size is typically used for radiator tails?",
    options: ["10mm", "15mm", "22mm", "28mm"],
    correctAnswer: "15mm",
    explanation: "15mm is standard for most radiator connections."
  },
  {
    id: 'level2heat23',
    topic: 'level2-central-heating',
    question: "Which gauge shows sealed system pressure on a boiler?",
    options: ["Flow meter", "Thermostat", "Pressure gauge", "Pump selector"],
    correctAnswer: "Pressure gauge",
    explanation: "Pressure gauges show operating pressure and help with diagnostics."
  },
  {
    id: 'level2heat24',
    topic: 'level2-central-heating',
    question: "What does a zone valve do?",
    options: ["Adds inhibitor", "Controls heat to parts of the system", "Balances radiators", "Reduces noise"],
    correctAnswer: "Controls heat to parts of the system",
    explanation: "Zone valves open or close based on demand in heating circuits."
  },
  {
    id: 'level2heat25',
    topic: 'level2-central-heating',
    question: "Which regulation sets design and energy standards for heating systems?",
    options: ["Part G", "Part L", "Part F", "Part P"],
    correctAnswer: "Part L",
    explanation: "Part L focuses on energy efficiency in building services, including heating."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-central-heating', 'items', q.id), {
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
