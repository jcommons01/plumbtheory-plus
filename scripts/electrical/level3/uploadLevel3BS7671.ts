// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3BS7671.ts

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

// ✅ Level 3 BS 7671 (18th Edition) - New Set of 25 Questions
const questions = [
  {
    id: 'level3bs767101',
    question: "Which regulation in BS 7671 covers basic protection against electric shock?",
    options: ["Regulation 411.3.3", "Regulation 410.3.1", "Regulation 421.1.7", "Regulation 514.9.1"],
    correctAnswer: "Regulation 410.3.1",
    explanation: "Regulation 410.3.1 states that basic protection must prevent contact with live parts under normal conditions."
  },
  {
    id: 'level3bs767102',
    question: "What is the maximum disconnection time for a TN system final circuit not exceeding 32A?",
    options: ["0.4 seconds", "1.0 second", "5 seconds", "0.2 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "Regulation 411.3.2.2 requires disconnection within 0.4s for TN system final circuits up to 32A."
  },
  {
    id: 'level3bs767103',
    question: "What is the purpose of a consumer unit main switch?",
    options: ["To limit overcurrent faults", "To disconnect all circuits in case of emergency", "To prevent earth faults", "To isolate lighting circuits only"],
    correctAnswer: "To disconnect all circuits in case of emergency",
    explanation: "The main switch allows total isolation of the installation, ensuring safety during maintenance or emergencies."
  },
  {
    id: 'level3bs767104',
    question: "According to BS 7671, what is the minimum IP rating for bathroom Zone 1 electrical equipment?",
    options: ["IP66", "IPX4", "IP55", "IPX1"],
    correctAnswer: "IPX4",
    explanation: "Regulation 701.512.2 states that equipment in Zone 1 must be at least IPX4 to protect against splashing water."
  },
  {
    id: 'level3bs767105',
    question: "Which regulation requires labelling of circuits with their purpose and protective device rating?",
    options: ["Regulation 514.9.1", "Regulation 411.3.3", "Regulation 522.6.202", "Regulation 132.15.202"],
    correctAnswer: "Regulation 514.9.1",
    explanation: "Regulation 514.9.1 requires each circuit to be clearly identified at the distribution board."
  },
  {
    id: 'level3bs767106',
    question: "What is the minimum insulation resistance value for new domestic installations?",
    options: ["2.0 MΩ", "0.5 MΩ", "1.0 MΩ", "5.0 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "According to Regulation 643.3.1, the minimum insulation resistance is 1.0 MΩ for 230V circuits."
  },
  {
    id: 'level3bs767107',
    question: "What is the primary function of a residual current device (RCD)?",
    options: ["To limit overvoltage", "To prevent fire", "To detect earth leakage", "To balance three-phase supply"],
    correctAnswer: "To detect earth leakage",
    explanation: "RCDs monitor current balance and trip when leakage to earth exceeds safe levels, typically 30mA."
  },
  {
    id: 'level3bs767108',
    question: "Which type of bonding connects metallic services to the main earthing terminal?",
    options: ["Main protective bonding", "Supplementary bonding", "Equipotential bonding", "Isolated bonding"],
    correctAnswer: "Main protective bonding",
    explanation: "Main protective bonding connects extraneous conductive parts like water and gas pipes to the earthing terminal."
  },
  {
    id: 'level3bs767109',
    question: "According to BS 7671, which test ensures the continuity of protective conductors?",
    options: ["Insulation resistance test", "Polarity test", "Continuity test", "Earth loop impedance test"],
    correctAnswer: "Continuity test",
    explanation: "The continuity test verifies all protective conductors are electrically continuous and connected."
  },
  {
    id: 'level3bs767110',
    question: "Which regulation sets the requirements for cable routes in safe zones?",
    options: ["Regulation 522.6.202", "Regulation 411.3.2.2", "Regulation 416.2.1", "Regulation 514.10.1"],
    correctAnswer: "Regulation 522.6.202",
    explanation: "Cables buried less than 50mm must be installed in prescribed safe zones or protected by RCDs."
  },
  {
    id: 'level3bs767111',
    question: "What is the maximum permitted voltage drop for a lighting circuit?",
    options: ["3%", "5%", "10%", "1%"],
    correctAnswer: "3%",
    explanation: "Appendix 4 recommends a maximum of 3% voltage drop for lighting circuits."
  },
  {
    id: 'level3bs767112',
    question: "What colour is used to identify a neutral conductor in fixed wiring?",
    options: ["Brown", "Blue", "Green/yellow", "Black"],
    correctAnswer: "Blue",
    explanation: "Blue is the standard colour for neutral conductors in UK fixed wiring."
  },
  {
    id: 'level3bs767113',
    question: "Which test is used to verify polarity in an installation?",
    options: ["Continuity test", "Polarity test", "Earth loop impedance test", "Insulation resistance test"],
    correctAnswer: "Polarity test",
    explanation: "Polarity testing ensures live, neutral, and earth conductors are correctly connected."
  },
  {
    id: 'level3bs767114',
    question: "In which situation is supplementary bonding required in a bathroom?",
    options: ["Always", "When required by a risk assessment", "Only if main bonding is absent", "Never"],
    correctAnswer: "When required by a risk assessment",
    explanation: "Supplementary bonding is only needed where disconnection times or fault paths may be insufficient."
  },
  {
    id: 'level3bs767115',
    question: "What is the function of a circuit breaker?",
    options: ["To increase voltage", "To monitor energy usage", "To protect against overcurrent", "To balance load"],
    correctAnswer: "To protect against overcurrent",
    explanation: "Circuit breakers disconnect a circuit automatically during overcurrent conditions."
  },
  {
    id: 'level3bs767116',
    question: "What is the maximum Zs for a 32A Type B MCB in a 230V TN system?",
    options: ["1.44Ω", "1.15Ω", "2.87Ω", "0.74Ω"],
    correctAnswer: "1.44Ω",
    explanation: "Zs = Uo/Ia. For 32A Type B, Ia = 160A → 230V/160A = 1.44Ω."
  },
  {
    id: 'level3bs767117',
    question: "Which regulation outlines the requirement for periodic inspection and testing?",
    options: ["Regulation 621.1", "Regulation 411.3.2.2", "Regulation 132.16", "Regulation 514.9.1"],
    correctAnswer: "Regulation 621.1",
    explanation: "Regulation 621.1 requires installations to be periodically inspected and tested."
  },
  {
    id: 'level3bs767118',
    question: "What is the rated residual operating current of an RCD used for socket protection in dwellings?",
    options: ["30mA", "100mA", "10mA", "300mA"],
    correctAnswer: "30mA",
    explanation: "RCDs for socket outlets in dwellings must trip at 30mA to protect against electric shock."
  },
  {
    id: 'level3bs767119',
    question: "Which test confirms the effectiveness of the earthing system?",
    options: ["Continuity test", "Insulation test", "Earth fault loop impedance test", "Polarity test"],
    correctAnswer: "Earth fault loop impedance test",
    explanation: "This test ensures that earth fault paths are effective enough for protective devices to operate."
  },
  {
    id: 'level3bs767120',
    question: "Where must surge protection be considered according to the 18th Edition?",
    options: ["In schools only", "Where there is risk of overvoltage", "Only in new builds", "Only with AFDDs"],
    correctAnswer: "Where there is risk of overvoltage",
    explanation: "Regulation 443 requires surge protection to be considered if overvoltage may cause damage."
  },
  {
    id: 'level3bs767121',
    question: "What is required before energising a new installation?",
    options: ["Client signature", "EIC completion", "Part P notification", "Electrical logbook"],
    correctAnswer: "EIC completion",
    explanation: "An Electrical Installation Certificate must be issued before the system is energised."
  },
  {
    id: 'level3bs767122',
    question: "Which type of RCD is sensitive to both AC and pulsating DC currents?",
    options: ["Type AC", "Type A", "Type B", "Type F"],
    correctAnswer: "Type A",
    explanation: "Type A RCDs detect alternating and pulsating DC leakage currents."
  },
  {
    id: 'level3bs767123',
    question: "Which part of BS 7671 covers fire protection?",
    options: ["Chapter 42", "Chapter 44", "Chapter 54", "Chapter 46"],
    correctAnswer: "Chapter 42",
    explanation: "Chapter 42 outlines protection against the effects of thermal damage or fire."
  },
  {
    id: 'level3bs767124',
    question: "What type of protection do AFDDs provide?",
    options: ["Overvoltage", "Earth leakage", "Arc fault", "Polarity"],
    correctAnswer: "Arc fault",
    explanation: "AFDDs detect dangerous arcing faults and disconnect the circuit before fire risk increases."
  },
  {
    id: 'level3bs767125',
    question: "When must an RCD be tested using the test button?",
    options: ["Monthly", "Annually", "Weekly", "Before installation"],
    correctAnswer: "Monthly",
    explanation: "RCDs should be tested monthly using the test button to confirm they operate correctly."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-bs7671', 'items', q.id), {
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
