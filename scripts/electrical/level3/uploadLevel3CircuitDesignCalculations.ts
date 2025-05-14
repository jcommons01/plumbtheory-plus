// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3CircuitDesignCalculations.ts

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
    id: 'level3-circuit-01',
    question: "What is the formula for calculating power in a three-phase balanced load?",
    options: ["P = V × I × √3 × PF", "P = V × I / PF", "P = V × I × PF", "P = V × I × √3"],
    correctAnswer: "P = V × I × √3 × PF",
    explanation: "The correct formula for power in a three-phase system is P = √3 × V × I × power factor."
  },
  {
    id: 'level3-circuit-02',
    question: "What is the power factor of a purely resistive load?",
    options: ["0.85", "0.5", "1.0", "0"],
    correctAnswer: "1.0",
    explanation: "Purely resistive loads have no reactive component, so the power factor is 1.0."
  },
  {
    id: 'level3-circuit-03',
    question: "A 40A circuit is protected by a Type C MCB. What is the maximum Zs for 230V supply?",
    options: ["1.44Ω", "2.88Ω", "0.57Ω", "1.15Ω"],
    correctAnswer: "1.44Ω",
    explanation: "Zs = 230 / (10 × In) = 230 / 400 = 1.44Ω for a Type C device."
  },
  {
    id: 'level3-circuit-04',
    question: "Which table in BS 7671 gives voltage drop values for twin and earth cable?",
    options: ["Table 4D2A", "Table 4F3B", "Table 4B1", "Table 54.7"],
    correctAnswer: "Table 4D2A",
    explanation: "Table 4D2A in Appendix 4 provides voltage drop data for thermoplastic twin and earth cable."
  },
  {
    id: 'level3-circuit-05',
    question: "What is the maximum permitted voltage drop for lighting circuits?",
    options: ["3%", "4%", "5%", "2%"],
    correctAnswer: "3%",
    explanation: "BS 7671 recommends a maximum voltage drop of 3% for lighting circuits."
  },
  {
    id: 'level3-circuit-06',
    question: "What is the purpose of a diversity factor in design?",
    options: ["Reduce cable cost", "Account for total connected load", "Allow use of smaller fuses", "Allow realistic load assumptions"],
    correctAnswer: "Allow realistic load assumptions",
    explanation: "Diversity factors adjust for the fact not all equipment runs at full load simultaneously."
  },
  {
    id: 'level3-circuit-07',
    question: "How many amps does a 7.2kW single-phase shower draw at 230V?",
    options: ["31.3A", "28.4A", "36.7A", "25.6A"],
    correctAnswer: "31.3A",
    explanation: "I = P / V = 7200 / 230 = 31.3A."
  },
  {
    id: 'level3-circuit-08',
    question: "What type of MCB is most suitable for circuits with high inrush currents?",
    options: ["Type A", "Type B", "Type C", "Type D"],
    correctAnswer: "Type D",
    explanation: "Type D MCBs allow higher inrush current before tripping, suitable for motors or transformers."
  },
  {
    id: 'level3-circuit-09',
    question: "What does the symbol 'X' represent in voltage drop formulas?",
    options: ["Reactance", "Current", "Resistance", "Power factor"],
    correctAnswer: "Reactance",
    explanation: "X represents the cable's inductive reactance per metre."
  },
  {
    id: 'level3-circuit-10',
    question: "What is the required correction factor for grouping of three circuits?",
    options: ["0.85", "0.95", "0.75", "1.0"],
    correctAnswer: "0.75",
    explanation: "BS 7671 Appendix 4 gives a grouping factor of 0.75 for 3 circuits."
  },
  {
    id: 'level3-circuit-11',
    question: "What is the standard conductor temperature for PVC insulation in volt drop calculations?",
    options: ["70°C", "85°C", "90°C", "60°C"],
    correctAnswer: "70°C",
    explanation: "PVC insulation is rated at 70°C for design purposes."
  },
  {
    id: 'level3-circuit-12',
    question: "What value of R1+R2 is acceptable for a 6A lighting circuit on a 230V TN system?",
    options: ["6.67Ω", "9.58Ω", "7.67Ω", "8.33Ω"],
    correctAnswer: "7.67Ω",
    explanation: "Zs = Uo / Ia = 230 / 30 = 7.67Ω for a 6A Type B breaker (Ia = 5 × In)."
  },
  {
    id: 'level3-circuit-13',
    question: "What cable size is required for a 32A ring final circuit using thermoplastic twin & earth?",
    options: ["4mm²", "2.5mm²", "6mm²", "1.5mm²"],
    correctAnswer: "2.5mm²",
    explanation: "Standard 32A ring final circuits use 2.5mm² twin & earth with 1.5mm² CPC."
  },
  {
    id: 'level3-circuit-14',
    question: "What is the maximum length of a 1.5mm² lighting circuit protected by a 6A MCB before exceeding 3% volt drop?",
    options: ["21m", "34m", "41m", "47m"],
    correctAnswer: "34m",
    explanation: "Volt drop = 6A × 34m × 29mV/A/m = 5.9V, which is near the 3% limit of 6.9V."
  },
  {
    id: 'level3-circuit-15',
    question: "How is volt drop calculated for a single-phase circuit?",
    options: ["Vd = 2 × L × I × mV/A/m", "Vd = L × I / R", "Vd = L × mV", "Vd = I × V"],
    correctAnswer: "Vd = 2 × L × I × mV/A/m",
    explanation: "The formula includes both phase and return path, so length is doubled."
  },
  {
    id: 'level3-circuit-16',
    question: "Which protective device ensures selectivity in a distribution system?",
    options: ["RCD", "Main switch", "Fuse", "MCB with time delay"],
    correctAnswer: "MCB with time delay",
    explanation: "Selectivity (discrimination) is achieved using devices with differing time/current curves."
  },
  {
    id: 'level3-circuit-17',
    question: "Which part of BS 7671 covers design current and cable selection?",
    options: ["Part 4", "Part 2", "Part 6", "Part 5"],
    correctAnswer: "Part 4",
    explanation: "Part 4 of BS 7671 covers protection for safety and circuit design."
  },
  {
    id: 'level3-circuit-18',
    question: "In the adiabatic equation, what does the variable 'k' represent?",
    options: ["Cable length", "Fault duration", "Material constant", "Loop impedance"],
    correctAnswer: "Material constant",
    explanation: "The constant 'k' reflects thermal properties of the conductor and insulation."
  },
  {
    id: 'level3-circuit-19',
    question: "What is the design current (Ib) for a load of 4.6kW at 230V and 0.95 power factor?",
    options: ["21.1A", "20.1A", "19.7A", "18.3A"],
    correctAnswer: "21.1A",
    explanation: "Ib = P / (V × PF) = 4600 / (230 × 0.95) = 21.1A."
  },
  {
    id: 'level3-circuit-20',
    question: "What is the correct location for a switch disconnector in a submain circuit?",
    options: ["At origin only", "At both ends", "At end only", "Not required"],
    correctAnswer: "At both ends",
    explanation: "A switch disconnector must be installed at both ends for isolation and maintenance."
  },
  {
    id: 'level3-circuit-21',
    question: "How many cores are in a standard SWA cable used for a 3-phase + neutral circuit?",
    options: ["3", "4", "2", "5"],
    correctAnswer: "4",
    explanation: "Three phase conductors plus neutral = 4 cores (earth in the armour or separate CPC)."
  },
  {
    id: 'level3-circuit-22',
    question: "What does the abbreviation 'VD' stand for in cable sizing?",
    options: ["Voltage drift", "Voltage demand", "Voltage drop", "Volt discrepancy"],
    correctAnswer: "Voltage drop",
    explanation: "'VD' in calculations always refers to voltage drop along the cable."
  },
  {
    id: 'level3-circuit-23',
    question: "What is the minimum conductor size for 63A submain in XLPE SWA buried direct?",
    options: ["10mm²", "16mm²", "25mm²", "35mm²"],
    correctAnswer: "16mm²",
    explanation: "Under standard conditions, 16mm² XLPE SWA is adequate for a 63A submain."
  },
  {
    id: 'level3-circuit-24',
    question: "What standard correction factor is applied for ambient temperature of 40°C with PVC?",
    options: ["0.91", "0.87", "0.75", "1.0"],
    correctAnswer: "0.87",
    explanation: "From BS 7671 Table 4B1, PVC cables at 40°C require a 0.87 correction factor."
  },
  {
    id: 'level3-circuit-25',
    question: "What value of k is used for copper with PVC insulation in the adiabatic equation?",
    options: ["143", "115", "225", "203"],
    correctAnswer: "115",
    explanation: "BS 7671 states a value of k = 115 for copper conductors with PVC insulation."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-circuit-calcs', 'items', q.id), {
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
