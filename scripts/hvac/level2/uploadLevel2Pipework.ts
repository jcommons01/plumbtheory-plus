// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Pipework.ts

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

// ✅ HVAC Level 2 Pipework & Insulation Questions
const questions = [
  {
    id: 'hvac-l2-pipework1',
    question: "Which type of valve is used to remove air from a heating system?",
    options: ["Check valve", "Air vent", "Ball valve", "Gate valve"],
    correctAnswer: "Air vent",
    explanation: "An air vent is fitted at high points to automatically release trapped air and prevent circulation issues."
  },
  {
    id: 'hvac-l2-pipework2',
    question: "Which material is typically used for refrigerant pipework?",
    options: ["Copper", "Steel", "PVC", "Brass"],
    correctAnswer: "Copper",
    explanation: "Copper is widely used due to its pressure resistance, thermal conductivity, and joint reliability."
  },
  {
    id: 'hvac-l2-pipework3',
    question: "Why is pipe insulation used on chilled water lines?",
    options: ["To prevent leaks", "To prevent condensation", "To stop vibration", "To increase pressure"],
    correctAnswer: "To prevent condensation",
    explanation: "Chilled water pipes can drop below dew point; insulation prevents moisture forming and protects finishes."
  },
  {
    id: 'hvac-l2-pipework4',
    question: "Which colour is used to mark chilled water pipework?",
    options: ["Yellow", "Red", "Green", "Orange"],
    correctAnswer: "Green",
    explanation: "Under BS 1710, green identifies chilled water lines to ensure consistent pipework identification."
  },
  {
    id: 'hvac-l2-pipework5',
    question: "What is the purpose of a pipe clip with rubber insert?",
    options: ["To reduce heat", "To prevent corrosion", "To reduce noise", "To stop leaks"],
    correctAnswer: "To reduce noise",
    explanation: "Rubber inserts in pipe clips isolate vibration, reducing transmission of noise through structures."
  },
  {
    id: 'hvac-l2-pipework6',
    question: "What fitting connects two pipes of different sizes?",
    options: ["Reducer", "Elbow", "Coupler", "Union"],
    correctAnswer: "Reducer",
    explanation: "A reducer changes pipe size while maintaining flow direction and system continuity."
  },
  {
    id: 'hvac-l2-pipework7',
    question: "Which tool gives the cleanest cut on plastic pipe?",
    options: ["Pipe cutter", "Saw blade", "Tin snips", "Chisel"],
    correctAnswer: "Pipe cutter",
    explanation: "Pipe cutters designed for plastic create smooth, square cuts ideal for solvent welding or push-fit."
  },
  {
    id: 'hvac-l2-pipework8',
    question: "What component protects a pump from debris?",
    options: ["Strainer", "Valve", "Trap", "Nozzle"],
    correctAnswer: "Strainer",
    explanation: "A strainer catches solids and particles, preventing damage to pumps and regulating devices."
  },
  {
    id: 'hvac-l2-pipework9',
    question: "What is the UK standard method to test refrigerant pipework?",
    options: ["Pressurise with air", "Fill with water", "Use nitrogen and leak spray", "Test with oxygen"],
    correctAnswer: "Use nitrogen and leak spray",
    explanation: "OFN is used for pressurisation; leak spray or detectors confirm system tightness before charging."
  },
  {
    id: 'hvac-l2-pipework10',
    question: "Why are flexible connections used at air handling units?",
    options: ["To reduce vibration", "To speed up install", "To cut cost", "To add flow"],
    correctAnswer: "To reduce vibration",
    explanation: "Flexible joints absorb movement and prevent transmission of vibrations to pipework or structure."
  },
  {
    id: 'hvac-l2-pipework11',
    question: "What is the main function of a drain cock?",
    options: ["To filter air", "To isolate water", "To empty a section", "To measure flow"],
    correctAnswer: "To empty a section",
    explanation: "Drain cocks allow controlled release of fluid for maintenance or system shutdowns."
  },
  {
    id: 'hvac-l2-pipework12',
    question: "Which pipe material must not be used with R-410A?",
    options: ["Steel", "PVC", "Copper", "Aluminium"],
    correctAnswer: "PVC",
    explanation: "PVC is unsuitable for high-pressure refrigerants like R-410A due to brittleness and low temperature limits."
  },
  {
    id: 'hvac-l2-pipework13',
    question: "What device prevents air entering a condensate drain?",
    options: ["Trap", "Elbow", "Valve", "Clamp"],
    correctAnswer: "Trap",
    explanation: "The water seal in a trap blocks air movement while still allowing condensate to discharge properly."
  },
  {
    id: 'hvac-l2-pipework14',
    question: "Where should pipework cross a fire-rated wall?",
    options: ["At any height", "With a fire sleeve", "Near the ceiling", "Through insulation only"],
    correctAnswer: "With a fire sleeve",
    explanation: "Fire sleeves preserve the wall's fire resistance and prevent spread of smoke and flame."
  },
  {
    id: 'hvac-l2-pipework15',
    question: "What does a pipe expansion loop prevent?",
    options: ["Rust", "Condensation", "Strain", "Noise"],
    correctAnswer: "Strain",
    explanation: "Expansion loops absorb thermal expansion to prevent mechanical stress on fixed supports and joints."
  },
  {
    id: 'hvac-l2-pipework16',
    question: "What pipe size typically follows 22mm in UK systems?",
    options: ["32mm", "28mm", "18mm", "35mm"],
    correctAnswer: "28mm",
    explanation: "The common UK copper pipe sizes progress in a standard sequence, such as 15mm, 22mm, and 28mm."
  },
  {
    id: 'hvac-l2-pipework17',
    question: "What does a vapour barrier prevent?",
    options: ["Corrosion", "Heat loss", "Moisture ingress", "Flow imbalance"],
    correctAnswer: "Moisture ingress",
    explanation: "Vapour barriers stop moisture from passing into insulation where it can condense and reduce performance."
  },
  {
    id: 'hvac-l2-pipework18',
    question: "Why are isolation valves fitted either side of a pump?",
    options: ["To boost flow", "To reduce heat", "To allow pump removal", "To clean the filter"],
    correctAnswer: "To allow pump removal",
    explanation: "Isolation valves let you service or replace the pump without draining the full system."
  },
  {
    id: 'hvac-l2-pipework19',
    question: "Which insulation material suits hot water pipes?",
    options: ["EPS", "PVC", "Fibreglass", "Rubber foam"],
    correctAnswer: "Fibreglass",
    explanation: "Fibreglass offers good thermal resistance and fire safety, and is approved under BS 5422."
  },
  {
    id: 'hvac-l2-pipework20',
    question: "What separation should hot pipes have from cables?",
    options: ["50mm", "No limit", "150mm", "300mm"],
    correctAnswer: "150mm",
    explanation: "BS 7671 recommends 150mm to prevent heat affecting cable insulation and performance."
  },
  {
    id: 'hvac-l2-pipework21',
    question: "How should copper pipework be supported?",
    options: ["With cable ties", "With adhesive pads", "With rubber-lined clips", "With loose loops"],
    correctAnswer: "With rubber-lined clips",
    explanation: "Rubber-lined clips prevent vibration and movement while supporting the pipe at regular intervals."
  },
  {
    id: 'hvac-l2-pipework22',
    question: "What does BS 1710 ensure for pipework?",
    options: ["Insulation", "Colour coding", "Flow rate", "Flame resistance"],
    correctAnswer: "Colour coding",
    explanation: "BS 1710 sets colour codes and direction marking standards for safe identification of pipe contents."
  },
  {
    id: 'hvac-l2-pipework23',
    question: "What is the minimum slope for a condensate pipe?",
    options: ["1:50", "1:20", "1:200", "1:100"],
    correctAnswer: "1:50",
    explanation: "A 1:50 gradient ensures gravity carries condensate to the drain without pooling or blockage."
  },
  {
    id: 'hvac-l2-pipework24',
    question: "How much headroom is needed above pipework in a plantroom?",
    options: ["200mm", "300mm", "500mm", "No minimum"],
    correctAnswer: "500mm",
    explanation: "CIBSE guidelines recommend 500mm to allow safe access for inspections and repairs."
  },
  {
    id: 'hvac-l2-pipework25',
    question: "What is the best material for underground chilled water?",
    options: ["Steel", "Cast iron", "Copper", "Pre-insulated pipe"],
    correctAnswer: "Pre-insulated pipe",
    explanation: "Pre-insulated polymer pipes resist moisture and heat gain, making them ideal for buried chilled water lines."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-pipework', 'items', q.id), {
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
