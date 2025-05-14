// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3EVChargingInstallations.ts

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
    id: 'evcharging01',
    question: "What is the most common type of connector used for AC EV charging in the UK?",
    options: ["Type 1", "Type 2", "CCS", "CHAdeMO"],
    correctAnswer: "Type 2",
    explanation: "Type 2 connectors are the standard for AC charging in the UK and Europe due to regulation and interoperability."
  },
  {
    id: 'evcharging02',
    question: "Which document provides guidance on installing EV charge points in the UK?",
    options: ["BS 7671 Section 722", "Part P of Building Regs", "BS 5839", "BS 5266"],
    correctAnswer: "BS 7671 Section 722",
    explanation: "Section 722 of BS 7671 contains specific regulations for the installation of EV charging equipment."
  },
  {
    id: 'evcharging03',
    question: "What is the primary risk when connecting EV charge points to PME supplies?",
    options: ["Excessive voltage drop", "High earth fault loop impedance", "Loss of PEN conductor", "Tripping of RCDs"],
    correctAnswer: "Loss of PEN conductor",
    explanation: "If the PEN conductor is lost, exposed conductive parts can rise to dangerous voltages, posing a serious shock risk."
  },
  {
    id: 'evcharging04',
    question: "Which solution mitigates the risk of a lost PEN conductor in PME systems?",
    options: ["Double pole MCB", "PEN fault detection device", "Double RCDs", "Voltage regulator"],
    correctAnswer: "PEN fault detection device",
    explanation: "Devices that detect PEN loss and disconnect the supply reduce the risk of dangerous touch voltages in PME systems."
  },
  {
    id: 'evcharging05',
    question: "What type of RCD is typically required for EV charge points?",
    options: ["Type AC", "Type A", "Type B", "Type C"],
    correctAnswer: "Type A",
    explanation: "Type A RCDs are generally suitable as they detect both AC and pulsating DC residual currents. Type B may be needed if DC leakage exceeds 6mA."
  },
  {
    id: 'evcharging06',
    question: "What is the maximum allowable earth resistance for a TT system used for EV charging?",
    options: ["21Ω", "100Ω", "200Ω", "500Ω"],
    correctAnswer: "200Ω",
    explanation: "BS 7671 recommends that earth resistance in TT systems should not exceed 200Ω to ensure disconnection within the required time."
  },
  {
    id: 'evcharging07',
    question: "Which regulation requires isolation of the EV charger during supply fault conditions?",
    options: ["Reg 411.3.1.2", "Reg 722.411.4.1", "Reg 131.5.1", "Reg 433.1.1"],
    correctAnswer: "Reg 722.411.4.1",
    explanation: "This regulation addresses PME risks and requires disconnection during dangerous supply conditions."
  },
  {
    id: 'evcharging08',
    question: "What is the purpose of load curtailment in EV charging systems?",
    options: ["To increase charging speed", "To share loads among chargers", "To regulate earth loop impedance", "To reduce energy bills"],
    correctAnswer: "To share loads among chargers",
    explanation: "Load curtailment allows the system to manage available supply current among multiple charge points safely."
  },
  {
    id: 'evcharging09',
    question: "What is the recommended minimum IP rating for external EV charge points?",
    options: ["IP33", "IP44", "IP65", "IP67"],
    correctAnswer: "IP44",
    explanation: "IP44 is the minimum acceptable rating for weather resistance in external EV charging equipment."
  },
  {
    id: 'evcharging10',
    question: "Why is cable selection critical for EV charger circuits?",
    options: ["To reduce installation time", "To prevent overheating", "To increase charging current", "To meet smart meter specs"],
    correctAnswer: "To prevent overheating",
    explanation: "Cables must handle continuous high loads from EV charging without exceeding temperature limits."
  },
  {
    id: 'evcharging11',
    question: "What is the typical output of a Mode 3 EV charger?",
    options: ["1.5 kW", "3.6 kW", "7.2 kW", "22 kW"],
    correctAnswer: "7.2 kW",
    explanation: "A single-phase Mode 3 charger commonly outputs 7.2 kW (230V × 32A)."
  },
  {
    id: 'evcharging12',
    question: "Which component in an EV charge point controls communication with the vehicle?",
    options: ["RCD", "Contactor", "EVSE controller", "RCBO"],
    correctAnswer: "EVSE controller",
    explanation: "The EVSE controller negotiates charging parameters and initiates charging based on signals from the vehicle."
  },
  {
    id: 'evcharging13',
    question: "What is the typical time delay for PEN fault detection disconnection?",
    options: ["Immediately", "10 ms", "500 ms", "5 seconds"],
    correctAnswer: "Immediately",
    explanation: "Disconnection must occur instantly to prevent dangerous touch voltages if PEN loss is detected."
  },
  {
    id: 'evcharging14',
    question: "Why should EV charging installations avoid using a TN-C system?",
    options: ["It’s too expensive", "It causes harmonics", "It lacks separate neutral and earth", "It requires Type B RCDs"],
    correctAnswer: "It lacks separate neutral and earth",
    explanation: "TN-C systems do not separate neutral and earth, increasing shock risks, and are prohibited for EV charge points in BS 7671."
  },
  {
    id: 'evcharging15',
    question: "What is the maximum disconnection time for an EV charger final circuit?",
    options: ["1 second", "0.4 seconds", "5 seconds", "0.2 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "Final circuits up to 32A must disconnect within 0.4 seconds under fault conditions, per BS 7671."
  },
  {
    id: 'evcharging16',
    question: "What factor must be considered when siting a charge point in a garage?",
    options: ["Type of flooring", "Proximity to lighting", "Mechanical protection", "Paint type on walls"],
    correctAnswer: "Mechanical protection",
    explanation: "Charge points in garages must be installed to prevent mechanical damage from vehicles and equipment."
  },
  {
    id: 'evcharging17',
    question: "What installation method reduces PME risks for EV charge points?",
    options: ["Installing on TN-C", "Using DC chargers only", "Creating a TT earthing arrangement", "Installing additional fuses"],
    correctAnswer: "Creating a TT earthing arrangement",
    explanation: "A TT system isolates the EV charger from PME risks by using a local earth electrode."
  },
  {
    id: 'evcharging18',
    question: "Which charger mode involves direct communication with the vehicle?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctAnswer: "Mode 3",
    explanation: "Mode 3 chargers include control and protection communication via dedicated signalling circuits."
  },
  {
    id: 'evcharging19',
    question: "What additional requirement applies to domestic EV charger installations under Part P?",
    options: ["Notification to building control", "Use of galvanised fixings", "Use of 3-phase supply", "SMART meter installation"],
    correctAnswer: "Notification to building control",
    explanation: "As notifiable works under Part P, EV charge point installations must be reported to building control."
  },
  {
    id: 'evcharging20',
    question: "What does dynamic load management (DLM) do in EV systems?",
    options: ["Boosts voltage", "Avoids PEN loss", "Prevents overload by adjusting charge rates", "Controls contactors remotely"],
    correctAnswer: "Prevents overload by adjusting charge rates",
    explanation: "DLM systems monitor load and reduce charging output when the total demand approaches supply limits."
  },
  {
    id: 'evcharging21',
    question: "What colour is typically used to identify EV charging point circuits?",
    options: ["Red", "Black", "Blue", "No specific colour"],
    correctAnswer: "No specific colour",
    explanation: "There is no specific mandated colour for EV circuits; however, proper labelling is essential for identification."
  },
  {
    id: 'evcharging22',
    question: "Which condition permits omission of a Type B RCD for EV charging?",
    options: ["When using PME", "When leakage current is <6mA DC", "When socket is locked", "When on TT system"],
    correctAnswer: "When leakage current is <6mA DC",
    explanation: "If built-in DC detection ensures leakage <6mA, a Type A RCD is permitted instead of Type B."
  },
  {
    id: 'evcharging23',
    question: "Which test confirms correct operation of PEN fault detection?",
    options: ["Insulation resistance", "Earth loop impedance", "Simulated PEN loss test", "Continuity of CPC"],
    correctAnswer: "Simulated PEN loss test",
    explanation: "PEN loss devices must be tested using simulated disconnection to verify automatic isolation works correctly."
  },
  {
    id: 'evcharging24',
    question: "What is the minimum recommended cable size for a 7.2kW EV charger on a 32A circuit?",
    options: ["2.5mm²", "4.0mm²", "6.0mm²", "10.0mm²"],
    correctAnswer: "6.0mm²",
    explanation: "6.0mm² is typically used to ensure voltage drop and thermal capacity are within limits for 32A continuous load."
  },
  {
    id: 'evcharging25',
    question: "What must an EV charger installation include to comply with BS 7671?",
    options: ["An external isolator only", "PEN fault detection, RCD, and disconnection compliance", "Only surge protection", "Internal earthing"],
    correctAnswer: "PEN fault detection, RCD, and disconnection compliance",
    explanation: "To comply with BS 7671, EV installations must include PEN protection (if PME), RCDs, and meet disconnection times."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-ev-charging-installations', 'items', q.id), {
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
