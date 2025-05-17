// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3FaultFinding.ts

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

// ✅ HVAC Level 3 Fault Diagnosis & Rectification Questions
const questions = [
  {
    id: 'hvac-l3-fault1',
    question: "What is the likely cause of an air conditioning unit tripping its high-pressure switch in summer?",
    options: ["Low refrigerant level", "Blocked condenser coil", "Loose fan belt", "Dirty evaporator coil"],
    correctAnswer: "Blocked condenser coil",
    explanation: "A blocked condenser coil reduces heat rejection, causing pressure to rise above safe limits and trip the high-pressure switch."
  },
  {
    id: 'hvac-l3-fault2',
    question: "Which symptom indicates a stuck-open expansion valve?",
    options: ["Low superheat", "High discharge pressure", "Low suction pressure", "Short cycling"],
    correctAnswer: "Low superheat",
    explanation: "A stuck-open valve allows too much refrigerant through, lowering superheat and risking liquid floodback to the compressor."
  },
  {
    id: 'hvac-l3-fault3',
    question: "What would cause a VRF indoor unit to blow warm air in cooling mode?",
    options: ["Low outdoor airflow", "Reversing valve failure", "Sensor drift", "Incorrect dip switch"],
    correctAnswer: "Reversing valve failure",
    explanation: "If the reversing valve is stuck, the system may remain in heating mode, causing warm air during cooling operation."
  },
  {
    id: 'hvac-l3-fault4',
    question: "What does a gurgling noise in a suction line usually suggest?",
    options: ["Overcharged system", "Moisture in the system", "Air ingress", "Low refrigerant level"],
    correctAnswer: "Low refrigerant level",
    explanation: "A low refrigerant level causes flashing of liquid and vapour, producing a gurgling noise in the suction line."
  },
  {
    id: 'hvac-l3-fault5',
    question: "What fault does continuous compressor cycling every few minutes suggest?",
    options: ["Oversized system", "Fan failure", "Low refrigerant", "Clogged filters"],
    correctAnswer: "Oversized system",
    explanation: "An oversized system meets the load too quickly, causing rapid cycling which reduces efficiency and component life."
  },
  {
    id: 'hvac-l3-fault6',
    question: "What is the result of poor air balancing in a multi-zone system?",
    options: ["Low suction pressure", "Uneven temperatures", "Low head pressure", "Coil frosting"],
    correctAnswer: "Uneven temperatures",
    explanation: "Poor air balancing causes some zones to overheat or overcool while others are not conditioned adequately."
  },
  {
    id: 'hvac-l3-fault7',
    question: "Which issue leads to low water pressure alarms on chilled water pumps?",
    options: ["Airlock", "Valve bypass", "Motor failure", "Dirty strainers"],
    correctAnswer: "Airlock",
    explanation: "Air trapped in the pipework prevents full water flow, triggering low pressure alarms on the pump control."
  },
  {
    id: 'hvac-l3-fault8',
    question: "What is the main sign of a refrigerant undercharge?",
    options: ["Low superheat", "Low suction pressure", "Low subcooling", "High head pressure"],
    correctAnswer: "Low suction pressure",
    explanation: "An undercharged system has reduced refrigerant mass, leading to low suction pressure and poor cooling."
  },
  {
    id: 'hvac-l3-fault9',
    question: "What fault may occur if return air filters are fully blocked?",
    options: ["Reduced airflow", "High suction pressure", "Flooded compressor", "Oil dilution"],
    correctAnswer: "Reduced airflow",
    explanation: "Blocked return filters prevent sufficient air from reaching the evaporator, reducing system efficiency and capacity."
  },
  {
    id: 'hvac-l3-fault10',
    question: "Which condition causes a cooling coil to freeze during operation?",
    options: ["High ambient heat", "High airflow", "Low airflow", "Correct superheat"],
    correctAnswer: "Low airflow",
    explanation: "Low airflow prevents warm air from heating the coil, allowing it to drop below freezing and accumulate ice."
  },
  {
    id: 'hvac-l3-fault11',
    question: "What does a rising discharge temperature often indicate?",
    options: ["Flooded evaporator", "Low superheat", "Restricted condenser", "Overfeeding TXV"],
    correctAnswer: "Restricted condenser",
    explanation: "Restricted condensers reduce heat rejection, causing discharge temperature to rise as the compressor works harder."
  },
  {
    id: 'hvac-l3-fault12',
    question: "What is the most likely cause of water overflowing from an AHU drain pan?",
    options: ["Cold coil", "Failed fan", "Clogged drain line", "Leaking valve"],
    correctAnswer: "Clogged drain line",
    explanation: "A blocked drain line prevents condensate from exiting the unit, causing the tray to fill and overflow."
  },
  {
    id: 'hvac-l3-fault13',
    question: "Why would a three-phase fan motor rotate in the wrong direction after service?",
    options: ["Wrong capacitor", "Wiring reversed", "Voltage drop", "Loose belt"],
    correctAnswer: "Wiring reversed",
    explanation: "Swapping two of the three phase connections causes the motor to reverse rotation, affecting fan performance."
  },
  {
    id: 'hvac-l3-fault14',
    question: "What would a low pressure and low current draw from a compressor suggest?",
    options: ["Overcharge", "Expansion valve fault", "Short circuit", "Undercharge"],
    correctAnswer: "Undercharge",
    explanation: "With insufficient refrigerant, both suction pressure and compressor load drop, resulting in low current draw."
  },
  {
    id: 'hvac-l3-fault15',
    question: "Which of the following faults causes high head pressure and high subcooling?",
    options: ["Low refrigerant", "Overcharged system", "Undersized coil", "Low airflow"],
    correctAnswer: "Overcharged system",
    explanation: "Excess refrigerant fills the condenser, reducing space for vapour condensation and increasing pressure and subcooling."
  },
  {
    id: 'hvac-l3-fault16',
    question: "What is the likely cause of flashing at the sight glass during steady operation?",
    options: ["Overcharge", "TXV overshoot", "Air in the system", "Low refrigerant"],
    correctAnswer: "Low refrigerant",
    explanation: "Flashing in the sight glass indicates vapour bubbles in the liquid line, a common sign of low refrigerant."
  },
  {
    id: 'hvac-l3-fault17',
    question: "What fault may occur from failing to insulate the sensing bulb of a TXV?",
    options: ["High head pressure", "Liquid floodback", "Poor superheat control", "Low subcooling"],
    correctAnswer: "Poor superheat control",
    explanation: "Uninsulated bulbs are influenced by ambient temperature, leading to erratic valve operation and superheat instability."
  },
  {
    id: 'hvac-l3-fault18',
    question: "What is the likely cause of reduced cooling and a dry evaporator coil?",
    options: ["Excess charge", "Dirty filters", "Blocked expansion valve", "High humidity"],
    correctAnswer: "Blocked expansion valve",
    explanation: "A blocked valve restricts refrigerant flow into the coil, resulting in poor cooling and little or no condensation."
  },
  {
    id: 'hvac-l3-fault19',
    question: "Which fault leads to oil return problems in long refrigerant lines?",
    options: ["Low superheat", "High velocity", "Improper pipe slope", "Large pipe radius"],
    correctAnswer: "Improper pipe slope",
    explanation: "Incorrect slope prevents oil from returning to the compressor, leading to lubrication issues over time."
  },
  {
    id: 'hvac-l3-fault20',
    question: "What is the likely cause of frequent high-pressure trips in winter on an air-cooled condenser?",
    options: ["Low outdoor airflow", "Low ambient control fault", "Short circuit", "Undercharged system"],
    correctAnswer: "Low ambient control fault",
    explanation: "In winter, the condenser fans may over-restrict airflow if ambient controls are not properly adjusted, causing high pressure."
  },
  {
    id: 'hvac-l3-fault21',
    question: "What does a noisy expansion valve during operation usually indicate?",
    options: ["Normal function", "Refrigerant slugging", "Low pressure", "Moisture in system"],
    correctAnswer: "Moisture in system",
    explanation: "Moisture freezes in the valve, causing erratic expansion and noise as flow is interrupted and restored repeatedly."
  },
  {
    id: 'hvac-l3-fault22',
    question: "What is the likely cause of excessive vibration on startup of a scroll compressor?",
    options: ["Low voltage", "Floodback", "Incorrect mounting", "Oil migration"],
    correctAnswer: "Incorrect mounting",
    explanation: "Poor mounting causes the compressor body to shake during startup due to torque and internal pressure changes."
  },
  {
    id: 'hvac-l3-fault23',
    question: "What causes frost to form on refrigerant pipework near an evaporator?",
    options: ["Overcharge", "Poor insulation", "Low airflow", "Liquid refrigerant leaving coil"],
    correctAnswer: "Liquid refrigerant leaving coil",
    explanation: "If refrigerant doesn't fully evaporate in the coil, it continues to expand along the suction line, causing frost."
  },
  {
    id: 'hvac-l3-fault24',
    question: "What causes water hammer in HVAC pipework?",
    options: ["Low velocity", "Air pockets", "Rapid valve closure", "Worn bearings"],
    correctAnswer: "Rapid valve closure",
    explanation: "Water hammer occurs when a valve closes quickly, causing a pressure wave that travels through the fluid column."
  },
  {
    id: 'hvac-l3-fault25',
    question: "What does a continuous low oil pressure warning in a chiller suggest?",
    options: ["High refrigerant pressure", "Dirty condenser", "Refrigerant mixing with oil", "Failed fan contactor"],
    correctAnswer: "Refrigerant mixing with oil",
    explanation: "Refrigerant can dilute the oil, reducing its viscosity and pressure, triggering oil safety controls in the compressor."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-fault-finding', 'items', q.id), {
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
