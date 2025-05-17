// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3SystemDesign.ts

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

// ✅ HVAC Level 3 System Design – 25 Regenerated Questions
const questions = [
  {
    id: 'hvac-l3-system-design-001',
    question: "Which factor most influences the required ventilation rate in a commercial kitchen?",
    options: ["Staff number", "Appliance type", "Ceiling height", "Room size"],
    correctAnswer: "Appliance type",
    explanation: "The duty and type of cooking equipment determine ventilation requirements due to varying heat and contaminant output."
  },
  {
    id: 'hvac-l3-system-design-002',
    question: "What is the recommended summer design temperature for UK offices according to CIBSE Guide A?",
    options: ["22–24°C", "23–25°C", "20–22°C", "25–27°C"],
    correctAnswer: "23–25°C",
    explanation: "This range balances occupant comfort and energy performance in typical UK conditions."
  },
  {
    id: 'hvac-l3-system-design-003',
    question: "Which strategy helps reduce energy use in a variable air volume (VAV) system?",
    options: ["Oversizing ducts", "Constant fan speed", "Modulating terminal units", "Running fans overnight"],
    correctAnswer: "Modulating terminal units",
    explanation: "Modulation enables the system to respond to actual demand, reducing energy consumption."
  },
  {
    id: 'hvac-l3-system-design-004',
    question: "Why is a differential pressure sensor used in a VAV system?",
    options: ["To measure humidity", "To regulate heating", "To balance duct pressure", "To control temperature"],
    correctAnswer: "To balance duct pressure",
    explanation: "It maintains stable static pressure in the supply duct as VAV boxes modulate."
  },
  {
    id: 'hvac-l3-system-design-005',
    question: "What is the typical air velocity range for main supply ducts in office buildings?",
    options: ["1–2 m/s", "3–5 m/s", "5–8 m/s", "9–12 m/s"],
    correctAnswer: "5–8 m/s",
    explanation: "This velocity balances energy use, noise, and space requirements in duct design."
  },
  {
    id: 'hvac-l3-system-design-006',
    question: "Which method improves chilled water system energy efficiency?",
    options: ["Using undersized pipes", "Running fixed-speed pumps", "Increasing delta T", "Raising flow rate"],
    correctAnswer: "Increasing delta T",
    explanation: "A larger temperature difference reduces flow demand and pump energy usage."
  },
  {
    id: 'hvac-l3-system-design-007',
    question: "What does a 2-port control valve do in a fan coil unit?",
    options: ["Stops noise", "Adjusts air flow", "Modulates water flow", "Monitors pressure"],
    correctAnswer: "Modulates water flow",
    explanation: "It regulates coil output by controlling water flow based on room conditions."
  },
  {
    id: 'hvac-l3-system-design-008',
    question: "What is the most effective way to prevent chilled beam condensation?",
    options: ["Lowering water flow", "Using a fan", "Maintaining water above dew point", "Raising humidity"],
    correctAnswer: "Maintaining water above dew point",
    explanation: "Keeping chilled water above the space dew point avoids surface condensation."
  },
  {
    id: 'hvac-l3-system-design-009',
    question: "Which UK document outlines control strategies to reduce HVAC energy demand?",
    options: ["BS 7671", "CIBSE TM54", "Part G", "HSE L8"],
    correctAnswer: "CIBSE TM54",
    explanation: "TM54 focuses on predicting operational energy use through detailed analysis."
  },
  {
    id: 'hvac-l3-system-design-010',
    question: "What is the correct ventilation rate for UK offices per person?",
    options: ["6 l/s", "8 l/s", "10 l/s", "12 l/s"],
    correctAnswer: "10 l/s",
    explanation: "Part F and CIBSE Guide B recommend 10 l/s per person to maintain indoor air quality."
  },
  {
    id: 'hvac-l3-system-design-011',
    question: "Which material offers the best corrosion resistance for a poolside ventilation coil?",
    options: ["Mild steel", "Copper", "Galvanised steel", "Stainless steel"],
    correctAnswer: "Stainless steel",
    explanation: "Chlorinated air requires corrosion-resistant materials like stainless steel for durability."
  },
  {
    id: 'hvac-l3-system-design-012',
    question: "What is the minimum SEER for comfort cooling units >12kW in UK new builds?",
    options: ["3.2", "4.5", "5.1", "6.0"],
    correctAnswer: "4.5",
    explanation: "UK Building Regulations Part L sets the minimum SEER at 4.5 for systems above 12kW."
  },
  {
    id: 'hvac-l3-system-design-013',
    question: "Why are diversity factors used in central plant sizing?",
    options: ["To oversize plant", "For noise reduction", "To match fuse ratings", "To reflect actual usage"],
    correctAnswer: "To reflect actual usage",
    explanation: "They prevent oversizing by accounting for the likelihood of simultaneous peak demand."
  },
  {
    id: 'hvac-l3-system-design-014',
    question: "What is a benefit of displacement ventilation in auditoriums?",
    options: ["Mixes warm air", "Cools ceiling first", "Removes pollutants efficiently", "Uses ceiling diffusers"],
    correctAnswer: "Removes pollutants efficiently",
    explanation: "It supplies cool air low down, pushing warm air and contaminants upwards to extract."
  },
  {
    id: 'hvac-l3-system-design-015',
    question: "How should primary duct sizing begin in a VAV system?",
    options: ["Using constant velocity", "Using equal friction", "Using static regain", "Using noise levels"],
    correctAnswer: "Using equal friction",
    explanation: "Equal friction is often used for main ducts, balancing pressure drop and airflow."
  },
  {
    id: 'hvac-l3-system-design-016',
    question: "What is the UK standard chilled water ΔT for energy-efficient systems?",
    options: ["3°C", "6°C", "9°C", "12°C"],
    correctAnswer: "6°C",
    explanation: "A 6°C temperature difference provides effective heat transfer with reduced pumping energy."
  },
  {
    id: 'hvac-l3-system-design-017',
    question: "Which air filtration type meets cleanroom ISO class 5 standards?",
    options: ["Panel filters", "HEPA filters", "Bag filters", "G4 filters"],
    correctAnswer: "HEPA filters",
    explanation: "High Efficiency Particulate Air (HEPA) filters are needed for ISO class 5 environments."
  },
  {
    id: 'hvac-l3-system-design-018',
    question: "What causes system inefficiency in VRF pipework design?",
    options: ["High humidity", "Short pipe runs", "Oversized cables", "Excessive pipe length"],
    correctAnswer: "Excessive pipe length",
    explanation: "Long refrigerant pipes lead to pressure drops and oil return problems, reducing efficiency."
  },
  {
    id: 'hvac-l3-system-design-019',
    question: "Which component removes dissolved air in closed systems?",
    options: ["Pump", "Air separator", "Flow switch", "Strainer"],
    correctAnswer: "Air separator",
    explanation: "Air separators remove both entrained and dissolved air to improve efficiency and prevent corrosion."
  },
  {
    id: 'hvac-l3-system-design-020',
    question: "How should the pressure drop in ductwork be calculated?",
    options: ["Only using length", "Assume 1 Pa/m", "Using fittings only", "Sum of friction and dynamic losses"],
    correctAnswer: "Sum of friction and dynamic losses",
    explanation: "Both straight duct resistance and fitting losses must be included to size the fan correctly."
  },
  {
    id: 'hvac-l3-system-design-021',
    question: "What is the primary benefit of variable speed drives on pumps?",
    options: ["Increase heat loss", "Save floor space", "Reduce motor lifespan", "Improve energy efficiency"],
    correctAnswer: "Improve energy efficiency",
    explanation: "By matching flow to demand, VSDs reduce energy consumption and extend system life."
  },
  {
    id: 'hvac-l3-system-design-022',
    question: "How is heat pump efficiency improved in system design?",
    options: ["Higher flow temperature", "Shorter pipework", "Low return water temp", "Fixed speed pumps"],
    correctAnswer: "Low return water temp",
    explanation: "Lower return temperatures increase the heat pump’s Coefficient of Performance (COP)."
  },
  {
    id: 'hvac-l3-system-design-023',
    question: "What does a dirt separator do in LTHW systems?",
    options: ["Reduce temperature", "Remove noise", "Eliminate air", "Capture debris"],
    correctAnswer: "Capture debris",
    explanation: "Dirt separators protect equipment by removing particulates from circulating water."
  },
  {
    id: 'hvac-l3-system-design-024',
    question: "Where should sensors be placed in a VAV zone?",
    options: ["Near heat source", "In ductwork", "By supply diffuser", "Away from air movement and sunlight"],
    correctAnswer: "Away from air movement and sunlight",
    explanation: "Sensor placement must avoid heat or air interference to give accurate room readings."
  },
  {
    id: 'hvac-l3-system-design-025',
    question: "What defines the optimum SFP for new UK ventilation systems with cooling?",
    options: ["1.6 W/l/s", "1.8 W/l/s", "2.0 W/l/s", "2.5 W/l/s"],
    correctAnswer: "2.0 W/l/s",
    explanation: "UK regulations set a maximum of 2.0 W/l/s for central mechanical systems with heating/cooling."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-system-design', 'items', q.id), {
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
