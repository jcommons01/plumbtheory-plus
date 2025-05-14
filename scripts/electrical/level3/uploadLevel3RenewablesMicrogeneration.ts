// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3RenewablesMicrogeneration.ts

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
    id: 'renewables01',
    question: "What is the typical voltage output of a single photovoltaic (PV) panel under standard test conditions?",
    options: ["5V", "12V", "18V", "36V"],
    correctAnswer: "18V",
    explanation: "Most single PV panels produce around 18V DC under standard test conditions, suitable for charging 12V battery systems."
  },
  {
    id: 'renewables02',
    question: "Which component is essential in a grid-connected PV system to match output to mains supply?",
    options: ["Charge controller", "Battery inverter", "Grid-tied inverter", "Isolator switch"],
    correctAnswer: "Grid-tied inverter",
    explanation: "A grid-tied inverter converts DC to AC and synchronises it with the grid’s voltage and frequency."
  },
  {
    id: 'renewables03',
    question: "What does MCS stand for in the context of UK microgeneration systems?",
    options: ["Microgeneration Compliance Scheme", "Minimum Certification Standards", "Microgeneration Certification Scheme", "Modular Current System"],
    correctAnswer: "Microgeneration Certification Scheme",
    explanation: "MCS certifies products and installers of renewable energy systems to ensure quality and compliance."
  },
  {
    id: 'renewables04',
    question: "Which standard applies to electrical safety of grid-connected PV systems in the UK?",
    options: ["BS 7430", "BS EN 61439", "IEC 62109", "EN 50549-1"],
    correctAnswer: "EN 50549-1",
    explanation: "EN 50549-1 sets requirements for interface protection of energy sources connected to the public grid."
  },
  {
    id: 'renewables05',
    question: "What does the term 'array' refer to in a solar PV installation?",
    options: ["The mounting system", "A group of panels", "The inverter unit", "A type of wiring method"],
    correctAnswer: "A group of panels",
    explanation: "An array refers to a collection of photovoltaic modules connected together to form one system."
  },
  {
    id: 'renewables06',
    question: "What is the typical output of a domestic wind turbine in the UK?",
    options: ["100W", "1kW", "5kW", "15kW"],
    correctAnswer: "5kW",
    explanation: "Small-scale wind turbines for domestic use typically range from 2kW to 6kW, with 5kW being common."
  },
  {
    id: 'renewables07',
    question: "What does 'feed-in tariff' (FiT) refer to in renewable systems?",
    options: ["A tax on exported power", "A charge for equipment installation", "A government payment for generated energy", "An inverter efficiency rating"],
    correctAnswer: "A government payment for generated energy",
    explanation: "FiTs were payments made to producers of renewable energy based on generation and export rates."
  },
  {
    id: 'renewables08',
    question: "What is the purpose of an isolation switch in a PV installation?",
    options: ["To store energy", "To regulate voltage", "To disconnect supply for maintenance", "To increase current"],
    correctAnswer: "To disconnect supply for maintenance",
    explanation: "Isolators are used to safely disconnect PV arrays or inverters during installation or maintenance."
  },
  {
    id: 'renewables09',
    question: "Which renewable technology uses ground loops to transfer heat?",
    options: ["Air source heat pump", "Biomass boiler", "Ground source heat pump", "Solar thermal system"],
    correctAnswer: "Ground source heat pump",
    explanation: "GSHPs use buried loops to extract low-grade heat from the earth, which is then compressed to useful levels."
  },
  {
    id: 'renewables10',
    question: "What type of current is produced by most renewable generation sources like PV or wind turbines?",
    options: ["AC", "DC", "Pulsed DC", "3-phase AC"],
    correctAnswer: "DC",
    explanation: "PV panels and wind turbines generally produce DC power, which must be converted to AC for grid use."
  },
  {
    id: 'renewables11',
    question: "What is the primary function of a charge controller in an off-grid solar system?",
    options: ["Converts AC to DC", "Prevents battery overcharging", "Measures energy generation", "Stabilises grid voltage"],
    correctAnswer: "Prevents battery overcharging",
    explanation: "Charge controllers regulate the charging process to protect batteries from overvoltage and extend their life."
  },
  {
    id: 'renewables12',
    question: "What does the term 'Net metering' refer to?",
    options: ["Selling energy back at a fixed rate", "Zero energy billing", "Billing based on the net energy exported", "Eliminating the need for an inverter"],
    correctAnswer: "Billing based on the net energy exported",
    explanation: "Net metering credits customers for the excess energy they supply to the grid, reducing their bills."
  },
  {
    id: 'renewables13',
    question: "Which renewable system captures heat directly from the sun to heat water?",
    options: ["Photovoltaic system", "Solar thermal system", "Air source heat pump", "Biomass stove"],
    correctAnswer: "Solar thermal system",
    explanation: "Solar thermal systems use collectors to absorb solar radiation and transfer it to a water storage cylinder."
  },
  {
    id: 'renewables14',
    question: "What is the typical lifespan of a modern solar PV panel?",
    options: ["5 years", "10 years", "25 years", "40 years"],
    correctAnswer: "25 years",
    explanation: "Most manufacturers guarantee solar panels for 20–25 years, although they may continue producing power beyond that."
  },
  {
    id: 'renewables15',
    question: "What safety measure is required when installing DC cabling for PV systems?",
    options: ["Double pole switching", "Metal conduit only", "Mechanical interlock", "Correct polarity marking"],
    correctAnswer: "Correct polarity marking",
    explanation: "DC cables must be clearly marked for polarity to prevent incorrect connections that could damage equipment or cause harm."
  },
  {
    id: 'renewables16',
    question: "Which type of inverter is used when panels are installed in different orientations?",
    options: ["String inverter", "Central inverter", "Microinverter", "Battery inverter"],
    correctAnswer: "Microinverter",
    explanation: "Microinverters are installed per panel, allowing independent optimisation, especially useful for varying orientations."
  },
  {
    id: 'renewables17',
    question: "In a PV system, what is the main hazard associated with DC circuits?",
    options: ["Electric shock", "Induction heating", "Arcing", "Low voltage drop"],
    correctAnswer: "Arcing",
    explanation: "DC arcs are continuous and more difficult to extinguish than AC, posing a greater fire risk if not safely managed."
  },
  {
    id: 'renewables18',
    question: "What is the purpose of MPPT in solar charge controllers?",
    options: ["Maximum panel tracking test", "Power protection technique", "Maximum power point tracking", "Monitoring panel temperature"],
    correctAnswer: "Maximum power point tracking",
    explanation: "MPPT optimises power output by continuously adjusting the operating voltage to match the panel’s peak efficiency."
  },
  {
    id: 'renewables19',
    question: "Which regulation in BS 7671 specifically addresses prosumer installations?",
    options: ["Reg 712", "Reg 544", "Reg 551", "Reg 722"],
    correctAnswer: "Reg 712",
    explanation: "Regulation 712 in BS 7671 covers requirements for PV supply systems and integration with electrical installations."
  },
  {
    id: 'renewables20',
    question: "How are PV arrays typically protected against overcurrent?",
    options: ["Surge protectors", "Fused isolators", "Overcurrent protective devices (OCPD)", "SPD breakers"],
    correctAnswer: "Overcurrent protective devices (OCPD)",
    explanation: "OCPDs are used to protect PV strings and prevent cable damage during faults or short circuits."
  },
  {
    id: 'renewables21',
    question: "Which parameter is used to rate solar panel efficiency?",
    options: ["Temperature", "Voltage", "Watt peak (Wp)", "Insulation thickness"],
    correctAnswer: "Watt peak (Wp)",
    explanation: "Watt peak represents the maximum rated output under standard test conditions (1000 W/m², 25°C)."
  },
  {
    id: 'renewables22',
    question: "What must be included in documentation after a renewable system installation?",
    options: ["Load current logs", "Environmental statement", "Handover certificate and test results", "Grid stability report"],
    correctAnswer: "Handover certificate and test results",
    explanation: "Test certificates and documentation must be provided to confirm system safety, commissioning, and compliance."
  },
  {
    id: 'renewables23',
    question: "Why are bypass diodes used in PV modules?",
    options: ["Increase voltage", "Reduce shading effects", "Improve cooling", "Lower impedance"],
    correctAnswer: "Reduce shading effects",
    explanation: "Bypass diodes allow current to flow around shaded or damaged cells, maintaining output and protecting the module."
  },
  {
    id: 'renewables24',
    question: "Which factor most affects wind turbine efficiency?",
    options: ["Blade colour", "Mounting height", "Weight of generator", "Battery size"],
    correctAnswer: "Mounting height",
    explanation: "Higher mounting increases access to stronger, less turbulent wind, greatly improving performance and efficiency."
  },
  {
    id: 'renewables25',
    question: "What type of meter is used to measure electricity exported back to the grid?",
    options: ["Smart meter", "Energy analyser", "Data logger", "Transformer meter"],
    correctAnswer: "Smart meter",
    explanation: "Smart meters monitor both import and export of electricity, enabling accurate billing and grid data collection."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-renewables-microgeneration', 'items', q.id), {
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
