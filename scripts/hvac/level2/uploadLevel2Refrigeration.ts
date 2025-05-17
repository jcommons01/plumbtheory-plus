// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Refrigeration.ts

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

// ✅ HVAC Level 2 Refrigeration Questions (UK-based)
const questions = [
  {
    id: 'hvac-l2-refrigeration-1',
    question: "What is the purpose of the compressor in a refrigeration cycle?",
    options: ["To cool the refrigerant", "To circulate the refrigerant", "To lower system pressure", "To condense the refrigerant"],
    correctAnswer: "To circulate the refrigerant",
    explanation: "The compressor moves refrigerant around the system by increasing its pressure and forcing it into the condenser."
  },
  {
    id: 'hvac-l2-refrigeration-2',
    question: "Where does the refrigerant absorb heat in the refrigeration cycle?",
    options: ["Receiver", "Condenser", "Evaporator", "Compressor"],
    correctAnswer: "Evaporator",
    explanation: "The evaporator allows the refrigerant to absorb heat from the surrounding air or space being cooled."
  },
  {
    id: 'hvac-l2-refrigeration-3',
    question: "Which component reduces the pressure of the refrigerant?",
    options: ["Condenser", "Compressor", "Expansion valve", "Dryer"],
    correctAnswer: "Expansion valve",
    explanation: "The expansion valve drops the refrigerant pressure to allow it to absorb heat effectively in the evaporator."
  },
  {
    id: 'hvac-l2-refrigeration-4',
    question: "What state is refrigerant in as it exits the condenser?",
    options: ["Low-pressure gas", "High-pressure gas", "High-pressure liquid", "Low-pressure liquid"],
    correctAnswer: "High-pressure liquid",
    explanation: "After the condenser, the refrigerant is a high-pressure liquid ready to be throttled by the expansion device."
  },
  {
    id: 'hvac-l2-refrigeration-5',
    question: "What is meant by superheat?",
    options: ["Vapour heated above boiling point", "Liquid below freezing", "Pressure above design limit", "Gas under vacuum"],
    correctAnswer: "Vapour heated above boiling point",
    explanation: "Superheat ensures the refrigerant is fully vapour before entering the compressor, protecting it from damage."
  },
  {
    id: 'hvac-l2-refrigeration-6',
    question: "What is the primary risk of liquid entering the compressor?",
    options: ["Noise", "Cooling loss", "Damage", "Increased pressure"],
    correctAnswer: "Damage",
    explanation: "Liquid cannot be compressed and may cause severe internal damage to the compressor."
  },
  {
    id: 'hvac-l2-refrigeration-7',
    question: "Which component expels heat to the environment?",
    options: ["Expansion valve", "Evaporator", "Compressor", "Condenser"],
    correctAnswer: "Condenser",
    explanation: "The condenser releases heat carried by the refrigerant to the surrounding air or water."
  },
  {
    id: 'hvac-l2-refrigeration-8',
    question: "Which refrigerant has the lowest GWP?",
    options: ["R-32", "R-410A", "R-290", "R-134a"],
    correctAnswer: "R-290",
    explanation: "R-290 (propane) has a GWP of 3, making it one of the most environmentally friendly options currently used."
  },
  {
    id: 'hvac-l2-refrigeration-9',
    question: "Why is subcooling important?",
    options: ["It adds oil to the system", "It cools the room faster", "It ensures liquid enters the expansion valve", "It increases noise"],
    correctAnswer: "It ensures liquid enters the expansion valve",
    explanation: "Subcooling confirms that no vapour enters the expansion valve, which could reduce cooling performance."
  },
  {
    id: 'hvac-l2-refrigeration-10',
    question: "What happens to pressure in the evaporator?",
    options: ["It increases", "It fluctuates", "It remains high", "It stays low"],
    correctAnswer: "It stays low",
    explanation: "Low pressure in the evaporator allows the refrigerant to boil and absorb heat efficiently."
  },
  {
    id: 'hvac-l2-refrigeration-11',
    question: "What is the correct charge method for R-407C?",
    options: ["Vapour to suction line", "Liquid to suction line", "Liquid to liquid line", "Vapour to discharge line"],
    correctAnswer: "Liquid to liquid line",
    explanation: "Zeotropic blends like R-407C must be charged as a liquid to maintain the correct component ratio."
  },
  {
    id: 'hvac-l2-refrigeration-12',
    question: "What does a filter drier do?",
    options: ["Adds oil", "Removes heat", "Traps contaminants", "Raises pressure"],
    correctAnswer: "Traps contaminants",
    explanation: "Filter driers remove moisture and dirt that could block or corrode system components."
  },
  {
    id: 'hvac-l2-refrigeration-13',
    question: "What UK qualification is required to handle fluorinated gases?",
    options: ["City & Guilds 2391", "Part P", "F-Gas Category I", "Gas Safe ID"],
    correctAnswer: "F-Gas Category I",
    explanation: "Technicians must hold an F-Gas Category I certificate to handle fluorinated gases legally in the UK."
  },
  {
    id: 'hvac-l2-refrigeration-14',
    question: "Which part separates vapour from liquid before the compressor?",
    options: ["Receiver", "Accumulator", "Condenser", "TXV"],
    correctAnswer: "Accumulator",
    explanation: "Accumulators prevent liquid slugging by ensuring only vapour reaches the compressor inlet."
  },
  {
    id: 'hvac-l2-refrigeration-15',
    question: "Which term describes refrigerant changing from liquid to gas?",
    options: ["Compression", "Sublimation", "Evaporation", "Condensation"],
    correctAnswer: "Evaporation",
    explanation: "Evaporation is the process where refrigerant absorbs heat and changes into vapour."
  },
  {
    id: 'hvac-l2-refrigeration-16',
    question: "What is the effect of high discharge pressure?",
    options: ["Lower power use", "Cooler gas", "Reduced lifespan", "Better cooling"],
    correctAnswer: "Reduced lifespan",
    explanation: "Excessive discharge pressure puts strain on system components, especially the compressor."
  },
  {
    id: 'hvac-l2-refrigeration-17',
    question: "Which property allows refrigerants to absorb heat?",
    options: ["Latent heat", "Flow rate", "Specific volume", "Conductivity"],
    correctAnswer: "Latent heat",
    explanation: "Latent heat enables refrigerants to absorb large amounts of energy during phase change."
  },
  {
    id: 'hvac-l2-refrigeration-18',
    question: "Which refrigerant is commonly used in domestic freezers?",
    options: ["R-600a", "R-404A", "R-744", "R-22"],
    correctAnswer: "R-600a",
    explanation: "R-600a (isobutane) is widely used in UK domestic fridges and freezers for its low GWP."
  },
  {
    id: 'hvac-l2-refrigeration-19',
    question: "What is meant by temperature glide?",
    options: ["Sudden pressure rise", "Phase change delay", "Variable boiling point", "Condensing at low load"],
    correctAnswer: "Variable boiling point",
    explanation: "Temperature glide occurs in zeotropic blends where components boil or condense at different temperatures."
  },
  {
    id: 'hvac-l2-refrigeration-20',
    question: "Which law governs pressure-temperature relationship in refrigerants?",
    options: ["Ohm's Law", "Boyle's Law", "Charles’ Law", "Gay-Lussac’s Law"],
    correctAnswer: "Charles’ Law",
    explanation: "Charles’ Law explains how the volume of gas changes with temperature, relevant in pressure/temperature charts."
  },
  {
    id: 'hvac-l2-refrigeration-21',
    question: "What is the main function of a sight glass?",
    options: ["Shows oil level", "Indicates refrigerant state", "Measures voltage", "Controls pressure"],
    correctAnswer: "Indicates refrigerant state",
    explanation: "A sight glass allows technicians to observe refrigerant flow and check for bubbles or moisture."
  },
  {
    id: 'hvac-l2-refrigeration-22',
    question: "What device maintains correct superheat at the evaporator outlet?",
    options: ["Condenser", "Fan motor", "Capillary tube", "TXV"],
    correctAnswer: "TXV",
    explanation: "A thermostatic expansion valve adjusts flow based on bulb temperature to maintain superheat."
  },
  {
    id: 'hvac-l2-refrigeration-23',
    question: "Why is oil return important in refrigeration systems?",
    options: ["Prevents freezing", "Controls flow rate", "Lubricates moving parts", "Reduces heat gain"],
    correctAnswer: "Lubricates moving parts",
    explanation: "Refrigerant oil must return to the compressor to maintain proper lubrication and prevent wear."
  },
  {
    id: 'hvac-l2-refrigeration-24',
    question: "Where does refrigerant pressure drop significantly?",
    options: ["Compressor", "Expansion valve", "Receiver", "Evaporator"],
    correctAnswer: "Expansion valve",
    explanation: "The expansion valve causes a pressure drop that enables refrigerant to evaporate and absorb heat."
  },
  {
    id: 'hvac-l2-refrigeration-25',
    question: "What happens to refrigerant in the condenser?",
    options: ["It freezes", "It boils", "It evaporates", "It condenses"],
    correctAnswer: "It condenses",
    explanation: "In the condenser, the refrigerant changes from gas to liquid as it releases heat to the surroundings."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-refrigeration', 'items', q.id), {
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
