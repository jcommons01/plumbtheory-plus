// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Regulations.ts

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

// ✅ HVAC Level 2 – Building Regulations Questions
const questions = [
  {
    id: 'hvac-l2-regulations-1',
    question: "Which part of the Building Regulations covers ventilation in domestic dwellings?",
    options: ["Part F", "Part G", "Part P", "Part L"],
    correctAnswer: "Part F",
    explanation: "Part F outlines requirements for background, extract, and whole-building ventilation in domestic properties."
  },
  {
    id: 'hvac-l2-regulations-2',
    question: "What is the main focus of Building Regulations Part L?",
    options: ["Fire safety", "Electrical safety", "Energy efficiency", "Sound insulation"],
    correctAnswer: "Energy efficiency",
    explanation: "Part L focuses on reducing energy use and carbon emissions from heating, lighting, and ventilation systems."
  },
  {
    id: 'hvac-l2-regulations-3',
    question: "What is the minimum intermittent extraction rate for a domestic bathroom?",
    options: ["8 l/s", "10 l/s", "12 l/s", "15 l/s"],
    correctAnswer: "15 l/s",
    explanation: "For bathrooms with intermittent fans, 15 litres per second is the minimum extraction rate required by Part F."
  },
  {
    id: 'hvac-l2-regulations-4',
    question: "Which document supports Part L compliance for non-domestic HVAC systems?",
    options: ["Part M", "Part E", "Domestic Compliance Guide", "Non-Domestic Compliance Guide"],
    correctAnswer: "Non-Domestic Compliance Guide",
    explanation: "This guide details minimum efficiencies, control requirements, and commissioning for commercial HVAC systems."
  },
  {
    id: 'hvac-l2-regulations-5',
    question: "What is the minimum extract rate for a kitchen with a cooker hood?",
    options: ["15 l/s", "25 l/s", "30 l/s", "40 l/s"],
    correctAnswer: "30 l/s",
    explanation: "Part F requires at least 30 litres per second extraction when the fan is adjacent to the hob."
  },
  {
    id: 'hvac-l2-regulations-6',
    question: "What is the typical maximum specific fan power (SFP) for domestic MVHR systems?",
    options: ["0.8 W/l/s", "1.2 W/l/s", "1.5 W/l/s", "2.0 W/l/s"],
    correctAnswer: "1.5 W/l/s",
    explanation: "A limit of 1.5 watts per litre per second ensures the system is efficient and cost-effective to operate."
  },
  {
    id: 'hvac-l2-regulations-7',
    question: "Which part of the regulations applies to fuel-burning appliance ventilation?",
    options: ["Part J", "Part G", "Part C", "Part B"],
    correctAnswer: "Part J",
    explanation: "Part J covers combustion air, flue design, and safe operation of appliances using solid fuel, gas, or oil."
  },
  {
    id: 'hvac-l2-regulations-8',
    question: "What is required for electrical work in a bathroom?",
    options: ["Gas Safe approval", "Part F certificate", "Part P compliance", "Part B sign-off"],
    correctAnswer: "Part P compliance",
    explanation: "Electrical work in special locations like bathrooms must comply with Part P and be certified by a qualified person."
  },
  {
    id: 'hvac-l2-regulations-9',
    question: "Which control must be provided in each heating zone over 150m²?",
    options: ["Timer", "Thermostat", "Room sensor", "Zone control"],
    correctAnswer: "Zone control",
    explanation: "Separate control zones improve heating efficiency and comfort in larger buildings."
  },
  {
    id: 'hvac-l2-regulations-10',
    question: "What is the maximum air permeability for new UK dwellings?",
    options: ["3", "5", "7", "10 m³/h·m² at 50 Pa"],
    correctAnswer: "10 m³/h·m² at 50 Pa",
    explanation: "Part L requires dwellings to limit air leakage to improve energy efficiency and reduce drafts."
  },
  {
    id: 'hvac-l2-regulations-11',
    question: "What U-value must replacement windows achieve in existing dwellings?",
    options: ["1.0", "1.2", "1.4", "1.8 W/m²K"],
    correctAnswer: "1.4 W/m²K",
    explanation: "This value balances thermal performance with realistic product availability in the retrofit market."
  },
  {
    id: 'hvac-l2-regulations-12',
    question: "What SCOP must new air-to-water heat pumps achieve?",
    options: ["2.4", "2.7", "3.0", "3.5"],
    correctAnswer: "2.7",
    explanation: "The minimum efficiency ensures renewable heating systems provide good return on energy used."
  },
  {
    id: 'hvac-l2-regulations-13',
    question: "Which device is required in rooms with fuel-burning appliances?",
    options: ["Smoke alarm", "TRV", "CO alarm", "Fire sensor"],
    correctAnswer: "CO alarm",
    explanation: "Carbon monoxide alarms are mandatory to protect occupants from toxic gas leaks."
  },
  {
    id: 'hvac-l2-regulations-14',
    question: "Which system requires a heat recovery efficiency of at least 73%?",
    options: ["MEV", "MVHR", "Air source heat pump", "TRV system"],
    correctAnswer: "MVHR",
    explanation: "MVHR systems must meet this benchmark to ensure energy savings exceed the system’s operating cost."
  },
  {
    id: 'hvac-l2-regulations-15',
    question: "Which Part covers fire protection in ductwork passing through compartment walls?",
    options: ["Part F", "Part G", "Part B", "Part K"],
    correctAnswer: "Part B",
    explanation: "Part B ensures that ducts don't compromise fire compartmentation by requiring fire dampers or casings."
  },
  {
    id: 'hvac-l2-regulations-16',
    question: "What is the minimum hot water cylinder insulation thickness?",
    options: ["25mm", "35mm", "50mm", "80mm"],
    correctAnswer: "50mm",
    explanation: "Factory-applied 50mm insulation helps reduce heat losses and improves energy performance."
  },
  {
    id: 'hvac-l2-regulations-17',
    question: "What is required when replacing a gas boiler?",
    options: ["Any type is allowed", "Back boiler is preferred", "Heat pump is mandatory", "Condensing boiler rated at 92% or better"],
    correctAnswer: "Condensing boiler rated at 92% or better",
    explanation: "All replacements must meet minimum ErP 'A' ratings to reduce emissions and energy usage."
  },
  {
    id: 'hvac-l2-regulations-18',
    question: "What is the minimum background ventilation for a habitable room?",
    options: ["2,000 mm²", "4,000 mm²", "8,000 mm²", "10,000 mm²"],
    correctAnswer: "8,000 mm²",
    explanation: "Part F specifies this area to ensure continuous fresh air supply via trickle vents or similar means."
  },
  {
    id: 'hvac-l2-regulations-19',
    question: "Which guide provides detailed MVHR system guidance?",
    options: ["Part G", "Energy Code", "Ventilation Guide", "Domestic Ventilation Compliance Guide"],
    correctAnswer: "Domestic Ventilation Compliance Guide",
    explanation: "This document covers sizing, duct design, testing, and commissioning of domestic MVHR systems."
  },
  {
    id: 'hvac-l2-regulations-20',
    question: "What is the minimum extract rate for a utility room?",
    options: ["15 l/s", "20 l/s", "25 l/s", "30 l/s"],
    correctAnswer: "30 l/s",
    explanation: "This high rate prevents moisture accumulation from appliances like washing machines and dryers."
  },
  {
    id: 'hvac-l2-regulations-21',
    question: "Which Part covers the requirement for accessibility in buildings?",
    options: ["Part K", "Part M", "Part Q", "Part N"],
    correctAnswer: "Part M",
    explanation: "Part M ensures that buildings are accessible and usable by all, including those with reduced mobility."
  },
  {
    id: 'hvac-l2-regulations-22',
    question: "What efficiency must an electric heating system provide under Part L?",
    options: ["70%", "80%", "100%", "Manual override only"],
    correctAnswer: "100%",
    explanation: "Electric resistance systems convert energy directly to heat and must be used with full zone control."
  },
  {
    id: 'hvac-l2-regulations-23',
    question: "Which type of TRV is required under zoning regulations?",
    options: ["All radiators", "Only bathrooms", "Only bedrooms", "Only main rooms"],
    correctAnswer: "All radiators",
    explanation: "TRVs allow individual temperature control, essential for compliance with zoning requirements."
  },
  {
    id: 'hvac-l2-regulations-24',
    question: "What is the required U-value for new domestic roofs?",
    options: ["0.13", "0.16", "0.18", "0.20 W/m²K"],
    correctAnswer: "0.13",
    explanation: "This standard applies to pitched or flat roofs in new dwellings to reduce heat loss."
  },
  {
    id: 'hvac-l2-regulations-25',
    question: "Which Part regulates sound insulation in buildings?",
    options: ["Part B", "Part D", "Part E", "Part M"],
    correctAnswer: "Part E",
    explanation: "Part E covers sound insulation between dwellings, including walls, floors, and stairwells."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-regulations', 'items', q.id), {
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
