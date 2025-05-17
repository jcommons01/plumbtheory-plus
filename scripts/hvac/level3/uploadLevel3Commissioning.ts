// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Commissioning.ts

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

// ✅ HVAC Level 3 – Commissioning & Testing (25 Revised Questions)
const questions = [
  {
    id: 'hvac-l3-commissioning-1',
    question: "What is the purpose of flushing a closed-loop water system before commissioning?",
    options: ["To test fan performance", "To verify system balance", "To remove debris and contaminants", "To check water temperature"],
    correctAnswer: "To remove debris and contaminants",
    explanation: "Flushing is done to clear debris and contaminants that may cause corrosion or blockages in system components."
  },
  {
    id: 'hvac-l3-commissioning-2',
    question: "When should commissioning planning begin on a construction project?",
    options: ["After installation", "During design stage", "Before final inspection", "At handover"],
    correctAnswer: "During design stage",
    explanation: "Planning should begin during the design stage to ensure commissioning is integrated into the project timeline."
  },
  {
    id: 'hvac-l3-commissioning-3',
    question: "What does a pressure test on pipework primarily check?",
    options: ["Water velocity", "Heat transfer", "Leak tightness", "Insulation thickness"],
    correctAnswer: "Leak tightness",
    explanation: "Pressure testing verifies the integrity of the pipework and identifies leaks before operation begins."
  },
  {
    id: 'hvac-l3-commissioning-4',
    question: "What type of valve maintains constant water flow despite pressure changes?",
    options: ["Ball valve", "Gate valve", "PICV", "Check valve"],
    correctAnswer: "PICV",
    explanation: "A Pressure Independent Control Valve (PICV) ensures a steady flow rate regardless of pressure variation."
  },
  {
    id: 'hvac-l3-commissioning-5',
    question: "Why is accurate balancing important in a hydronic system?",
    options: ["To reduce noise", "To control humidity", "To ensure correct flow to all terminals", "To limit energy bills"],
    correctAnswer: "To ensure correct flow to all terminals",
    explanation: "Balancing ensures that each terminal receives the correct design flow for consistent comfort and performance."
  },
  {
    id: 'hvac-l3-commissioning-6',
    question: "What should be checked first during AHU pre-commissioning?",
    options: ["Filter colour", "Fan speed", "Physical installation", "Room temperature"],
    correctAnswer: "Physical installation",
    explanation: "Installation checks must confirm the AHU is correctly fitted, level, and ready for powered testing."
  },
  {
    id: 'hvac-l3-commissioning-7',
    question: "What document defines the acceptance criteria for commissioning?",
    options: ["Drawings", "O&M manual", "Specification", "Risk assessment"],
    correctAnswer: "Specification",
    explanation: "The commissioning specification outlines performance standards and testing procedures for handover."
  },
  {
    id: 'hvac-l3-commissioning-8',
    question: "What is the correct test for checking flow rate in a duct?",
    options: ["Digital thermometer", "Pitot tube traverse", "Humidity probe", "Manometer only"],
    correctAnswer: "Pitot tube traverse",
    explanation: "A Pitot tube traverse provides accurate airflow readings by averaging pressure across the duct cross-section."
  },
  {
    id: 'hvac-l3-commissioning-9',
    question: "What unit is used to measure airflow during commissioning?",
    options: ["Watts", "Bar", "Litres per second", "Degrees Celsius"],
    correctAnswer: "Litres per second",
    explanation: "Airflow is typically measured in litres per second (l/s) to determine ventilation rates."
  },
  {
    id: 'hvac-l3-commissioning-10',
    question: "What does functional testing confirm?",
    options: ["Filter quality", "Visual appearance", "System control responses", "Pipe length"],
    correctAnswer: "System control responses",
    explanation: "Functional testing ensures the system responds properly to control inputs and environmental changes."
  },
  {
    id: 'hvac-l3-commissioning-11',
    question: "What is trend logging used for in BMS commissioning?",
    options: ["Create alarm logs", "Check cleaning schedules", "Monitor system stability", "Generate work permits"],
    correctAnswer: "Monitor system stability",
    explanation: "Trend logging helps verify stable performance over time and highlights control issues."
  },
  {
    id: 'hvac-l3-commissioning-12',
    question: "What is the benefit of seasonal commissioning?",
    options: ["Shortens project time", "Reduces paperwork", "Tests under real conditions", "Avoids using test equipment"],
    correctAnswer: "Tests under real conditions",
    explanation: "Seasonal commissioning verifies performance under both summer and winter loads."
  },
  {
    id: 'hvac-l3-commissioning-13',
    question: "Why is system documentation important at handover?",
    options: ["To decorate the office", "To provide maintenance information", "To reduce VAT", "To match receipts"],
    correctAnswer: "To provide maintenance information",
    explanation: "Good documentation supports long-term operation and maintenance of installed systems."
  },
  {
    id: 'hvac-l3-commissioning-14',
    question: "What test ensures no air is trapped in a water system?",
    options: ["Pressure test", "Temperature test", "Vent test", "Noise test"],
    correctAnswer: "Vent test",
    explanation: "Vent testing confirms that trapped air is removed to prevent circulation issues and noise."
  },
  {
    id: 'hvac-l3-commissioning-15',
    question: "What is the correct process for verifying flow at a PICV?",
    options: ["Check colour", "Check insulation", "Measure flow against setting", "Test for leaks only"],
    correctAnswer: "Measure flow against setting",
    explanation: "The flow should match the valve's design setting, ensuring it regulates flow correctly."
  },
  {
    id: 'hvac-l3-commissioning-16',
    question: "What should be done before starting live system commissioning?",
    options: ["Test smoke alarms", "Review method statement", "Send invoice", "Clean site signage"],
    correctAnswer: "Review method statement",
    explanation: "Reviewing the method statement ensures safe, planned commissioning procedures are followed."
  },
  {
    id: 'hvac-l3-commissioning-17',
    question: "What is a black building test?",
    options: ["Power shutdown simulation", "Smoke detector test", "Water leak check", "Ventilation test"],
    correctAnswer: "Power shutdown simulation",
    explanation: "Black building tests verify critical systems perform during a simulated mains power failure."
  },
  {
    id: 'hvac-l3-commissioning-18',
    question: "What tolerance is generally allowed for water flow measurements?",
    options: ["±2%", "±10%", "±25%", "None"],
    correctAnswer: "±10%",
    explanation: "CIBSE recommends ±10% tolerance for water flow to account for measurement limitations."
  },
  {
    id: 'hvac-l3-commissioning-19',
    question: "What is the main risk of not commissioning properly?",
    options: ["Higher painting costs", "Shorter duct lengths", "Poor system performance", "Increased insulation"],
    correctAnswer: "Poor system performance",
    explanation: "Uncommissioned systems may not operate as intended, leading to inefficiencies or failures."
  },
  {
    id: 'hvac-l3-commissioning-20',
    question: "What should be verified during valve commissioning?",
    options: ["Serial number", "Correct label", "Flow matches design", "Pipe paint colour"],
    correctAnswer: "Flow matches design",
    explanation: "Confirming that flow matches the design ensures each valve delivers the correct output."
  },
  {
    id: 'hvac-l3-commissioning-21',
    question: "Which test checks a chiller’s rated performance?",
    options: ["Noise test", "Capacity test", "Leak test", "Weight test"],
    correctAnswer: "Capacity test",
    explanation: "A capacity test confirms the chiller can meet its specified cooling duty under design conditions."
  },
  {
    id: 'hvac-l3-commissioning-22',
    question: "Why is water treatment needed before commissioning?",
    options: ["To colour the water", "To reduce noise", "To prevent corrosion and scale", "To remove oxygen"],
    correctAnswer: "To prevent corrosion and scale",
    explanation: "Treatment protects components from corrosion, scale, and bacterial growth."
  },
  {
    id: 'hvac-l3-commissioning-23',
    question: "What is a typical test pressure for LTHW systems (3.5 bar working pressure)?",
    options: ["3.5 bar", "5 bar", "7 bar", "10 bar"],
    correctAnswer: "7 bar",
    explanation: "BS 6880 recommends testing LTHW pipework at twice the maximum working pressure."
  },
  {
    id: 'hvac-l3-commissioning-24',
    question: "What is the final step before handover?",
    options: ["Writing invoice", "Equipment polishing", "Client training and documentation", "Label checks only"],
    correctAnswer: "Client training and documentation",
    explanation: "Operators must be trained and receive documentation to ensure the system is used correctly."
  },
  {
    id: 'hvac-l3-commissioning-25',
    question: "Why is verifying BMS response to fire alarm signals important?",
    options: ["It reduces bills", "It activates heating", "It confirms safety actions occur", "It tests smoke detection"],
    correctAnswer: "It confirms safety actions occur",
    explanation: "Testing the BMS response confirms dampers and fans react correctly in a fire situation."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-commissioning', 'items', q.id), {
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
