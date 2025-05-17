// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Efficiency.ts

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

// ✅ HVAC Level 3 Energy Efficiency & Controls – 25 REGENERATED QUESTIONS
const questions = [
  {
    id: 'hvac-l3-efficiency-1',
    question: "Which control strategy helps avoid simultaneous heating and cooling in HVAC systems?",
    options: ["Fixed setpoint control", "Deadband control", "Override control", "Timed output control"],
    correctAnswer: "Deadband control",
    explanation: "Deadband control introduces a neutral zone between heating and cooling setpoints, preventing both systems from running at once and saving energy during stable conditions."
  },
  {
    id: 'hvac-l3-efficiency-2',
    question: "What does a Specific Fan Power (SFP) of 1.5 W/(l/s) indicate?",
    options: ["High fan efficiency", "High airflow rate", "Low fan power use", "Low fan pressure"],
    correctAnswer: "Low fan power use",
    explanation: "A lower SFP indicates reduced energy used per unit of airflow, which reflects a more efficient ventilation system design."
  },
  {
    id: 'hvac-l3-efficiency-3',
    question: "What is the main energy benefit of demand-controlled ventilation?",
    options: ["Higher airflow", "Reduced fan maintenance", "Lower ventilation energy", "Faster warm-up time"],
    correctAnswer: "Lower ventilation energy",
    explanation: "Demand-controlled ventilation adjusts airflow based on actual needs, reducing unnecessary energy use in under-occupied spaces."
  },
  {
    id: 'hvac-l3-efficiency-4',
    question: "Which control method improves the part-load efficiency of chillers?",
    options: ["Constant load cycling", "Fixed temperature reset", "Variable speed drives", "Manual setpoint change"],
    correctAnswer: "Variable speed drives",
    explanation: "VSDs allow chillers to modulate output efficiently under partial loads, avoiding frequent starts and stops that waste energy."
  },
  {
    id: 'hvac-l3-efficiency-5',
    question: "Why are plate heat exchangers used in ventilation systems?",
    options: ["To humidify air", "To recover heat", "To cool air faster", "To raise pressure"],
    correctAnswer: "To recover heat",
    explanation: "Plate heat exchangers transfer heat from outgoing stale air to incoming fresh air, improving energy efficiency."
  },
  {
    id: 'hvac-l3-efficiency-6',
    question: "What is the purpose of optimum start in HVAC controls?",
    options: ["Reduce maintenance", "Speed up heating", "Minimise run time", "Balance humidity"],
    correctAnswer: "Minimise run time",
    explanation: "Optimum start reduces running hours by calculating the latest time to start the system to meet the temperature setpoint by occupancy."
  },
  {
    id: 'hvac-l3-efficiency-7',
    question: "What is a Building Energy Management System (BEMS) designed to do?",
    options: ["Monitor occupancy", "Lower noise", "Reduce energy use", "Increase lighting"],
    correctAnswer: "Reduce energy use",
    explanation: "A BEMS controls and monitors systems like heating, cooling and lighting to reduce energy consumption and maintain comfort."
  },
  {
    id: 'hvac-l3-efficiency-8',
    question: "What is the function of weather compensation in heating systems?",
    options: ["Adjust flow rate", "Switch to backup", "Change supply temperature", "Measure humidity"],
    correctAnswer: "Change supply temperature",
    explanation: "Weather compensation adjusts the heating water temperature according to outdoor conditions, improving efficiency and comfort."
  },
  {
    id: 'hvac-l3-efficiency-9',
    question: "Why are heat recovery ventilators effective in UK climates?",
    options: ["They boost pressure", "They remove CO₂", "They reduce heating demand", "They improve lighting"],
    correctAnswer: "They reduce heating demand",
    explanation: "Heat recovery ventilators transfer warmth from extract air to fresh air, reducing the energy required for heating during colder months."
  },
  {
    id: 'hvac-l3-efficiency-10',
    question: "Which method helps reduce chiller energy use during cooler weather?",
    options: ["Night purge", "Humidity boost", "Free cooling", "Heat injection"],
    correctAnswer: "Free cooling",
    explanation: "Free cooling uses low external temperatures to provide cooling without mechanical chillers, saving significant energy."
  },
  {
    id: 'hvac-l3-efficiency-11',
    question: "What does SEER stand for in HVAC efficiency ratings?",
    options: ["Seasonal Energy Efficient Ratio", "Secondary Efficiency Entry Rating", "Standard Energy Exchange Rate", "System Energy Equal Ratio"],
    correctAnswer: "Seasonal Energy Efficient Ratio",
    explanation: "SEER measures air conditioner efficiency across an entire cooling season, helping compare energy performance."
  },
  {
    id: 'hvac-l3-efficiency-12',
    question: "What is the main energy benefit of using multiple boilers in sequence?",
    options: ["Lower pump costs", "More frequent cycling", "Better zoning", "Load matching"],
    correctAnswer: "Load matching",
    explanation: "Sequencing boilers ensures only the capacity needed is used, improving efficiency and reducing fuel consumption."
  },
  {
    id: 'hvac-l3-efficiency-13',
    question: "Which setting reduces simultaneous heating and cooling in a VAV system?",
    options: ["No deadband", "Separate ducting", "Zone overlap", "Setpoint spacing"],
    correctAnswer: "Setpoint spacing",
    explanation: "Keeping heating and cooling setpoints far enough apart reduces overlap, preventing energy waste from opposing actions."
  },
  {
    id: 'hvac-l3-efficiency-14',
    question: "How does variable air volume (VAV) save energy?",
    options: ["Uses smaller ducts", "Runs at full speed", "Reduces fan power", "Increases resistance"],
    correctAnswer: "Reduces fan power",
    explanation: "VAV systems adjust airflow based on demand, allowing fans to slow down and use less energy."
  },
  {
    id: 'hvac-l3-efficiency-15',
    question: "What is the role of a CO₂ sensor in a demand-controlled ventilation system?",
    options: ["Measure flow rate", "Adjust pressure", "Indicate occupancy", "Control noise"],
    correctAnswer: "Indicate occupancy",
    explanation: "CO₂ levels reflect how many people are present, helping the system increase or decrease ventilation accordingly."
  },
  {
    id: 'hvac-l3-efficiency-16',
    question: "What is the key feature of an inverter-driven compressor?",
    options: ["Fixed speed", "Modulating output", "High noise", "Quick start-up"],
    correctAnswer: "Modulating output",
    explanation: "Inverter compressors vary their output to match cooling demand, improving part-load efficiency and comfort."
  },
  {
    id: 'hvac-l3-efficiency-17',
    question: "What does SCOP measure?",
    options: ["Maximum heating", "Cooling loss", "Seasonal heat efficiency", "Startup load"],
    correctAnswer: "Seasonal heat efficiency",
    explanation: "SCOP indicates the average heating efficiency of a heat pump over a season, including real weather conditions."
  },
  {
    id: 'hvac-l3-efficiency-18',
    question: "What is the primary energy-saving feature of thermal wheels?",
    options: ["Heat rejection", "Humidity removal", "Energy recovery", "Pressure drop"],
    correctAnswer: "Energy recovery",
    explanation: "Thermal wheels recover both heat and moisture from exhaust air, reducing energy needed for air conditioning."
  },
  {
    id: 'hvac-l3-efficiency-19',
    question: "What control strategy adjusts static pressure in VAV systems?",
    options: ["Fixed setpoint", "Manual dial", "Damper tracking", "Occupancy override"],
    correctAnswer: "Damper tracking",
    explanation: "Tracking the position of VAV dampers allows pressure setpoints to adjust dynamically, reducing fan energy use."
  },
  {
    id: 'hvac-l3-efficiency-20',
    question: "What is the most effective way to reduce heating demand in a building?",
    options: ["Add humidifiers", "Raise thermostat", "Insulate envelope", "Use larger pumps"],
    correctAnswer: "Insulate envelope",
    explanation: "Improved insulation reduces heat loss through walls, roofs, and windows, directly lowering energy use for heating."
  },
  {
    id: 'hvac-l3-efficiency-21',
    question: "Which equipment uses the cube law for energy savings?",
    options: ["Chillers", "Fans", "Lights", "Meters"],
    correctAnswer: "Fans",
    explanation: "Fan power varies with the cube of speed, so slowing a fan by 20% can cut energy use by nearly 50%."
  },
  {
    id: 'hvac-l3-efficiency-22',
    question: "What does a heat pump's COP of 4.0 mean?",
    options: ["4 units in, 1 out", "4°C outlet temp", "4 times more output than input", "4-hour cycle time"],
    correctAnswer: "4 times more output than input",
    explanation: "A COP of 4.0 means the system delivers four units of heat for every unit of electricity consumed."
  },
  {
    id: 'hvac-l3-efficiency-23',
    question: "What is night purge used for in buildings?",
    options: ["Lighting reset", "Fan balancing", "Pre-cooling fabric", "Reducing sound"],
    correctAnswer: "Pre-cooling fabric",
    explanation: "Night purge uses cooler outside air to lower internal temperatures overnight, reducing the following day's cooling load."
  },
  {
    id: 'hvac-l3-efficiency-24',
    question: "What is the purpose of thermal mass in energy-efficient buildings?",
    options: ["Reduce noise", "Boost air change", "Store heat", "Limit pressure"],
    correctAnswer: "Store heat",
    explanation: "Thermal mass stores heat during the day and releases it later, helping to maintain temperature stability and reduce energy use."
  },
  {
    id: 'hvac-l3-efficiency-25',
    question: "Which system type benefits most from zoning controls?",
    options: ["Single duct", "Open loop", "Heating and cooling", "Supply only"],
    correctAnswer: "Heating and cooling",
    explanation: "Zoning in heating and cooling systems ensures energy is directed only where and when it’s needed, improving efficiency."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-efficiency', 'items', q.id), {
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
