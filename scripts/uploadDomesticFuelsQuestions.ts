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

const domesticFuelsQuestions = [
  {
    id: "domesticFuelsQ1",
    topic: "domestic-fuels",
    question: "Which gas is most commonly used for domestic heating in the UK?",
    options: ["Butane", "Propane", "Natural Gas", "Biogas"],
    correctAnswer: "Natural Gas",
    explanation: "Natural gas (methane) is the standard fuel supplied to most UK homes for heating."
  },
  {
    id: "domesticFuelsQ2",
    topic: "domestic-fuels",
    question: "What is the calorific value of natural gas typically used for domestic purposes?",
    options: ["25 MJ/m³", "35 MJ/m³", "40 MJ/m³", "50 MJ/m³"],
    correctAnswer: "40 MJ/m³",
    explanation: "Natural gas has a calorific value of approximately 40 MJ/m³ in the UK."
  },
  {
    id: "domesticFuelsQ3",
    topic: "domestic-fuels",
    question: "Which colour is associated with a healthy natural gas flame?",
    options: ["Yellow", "Orange", "Blue", "White"],
    correctAnswer: "Blue",
    explanation: "A blue flame indicates complete combustion and a healthy burner."
  },
  {
    id: "domesticFuelsQ4",
    topic: "domestic-fuels",
    question: "What is the main safety concern with poorly ventilated fuel-burning appliances?",
    options: ["Gas leaks", "Carbon monoxide", "Low efficiency", "Corrosion"],
    correctAnswer: "Carbon monoxide",
    explanation: "Poor combustion due to inadequate ventilation can lead to deadly CO emissions."
  },
  {
    id: "domesticFuelsQ5",
    topic: "domestic-fuels",
    question: "Which of the following is a byproduct of complete combustion of methane?",
    options: ["Hydrogen", "Carbon monoxide", "Soot", "Carbon dioxide"],
    correctAnswer: "Carbon dioxide",
    explanation: "Complete combustion of methane (natural gas) produces CO₂ and water."
  },
  {
    id: "domesticFuelsQ6",
    topic: "domestic-fuels",
    question: "How often should a domestic gas boiler be serviced?",
    options: ["Every 2 years", "Annually", "Every 6 months", "Every 5 years"],
    correctAnswer: "Annually",
    explanation: "An annual service ensures safety, efficiency, and warranty compliance."
  },
  {
    id: "domesticFuelsQ7",
    topic: "domestic-fuels",
    question: "Which regulation governs gas safety in domestic premises?",
    options: ["Part L of Building Regs", "Gas Safety (Installation and Use) Regulations", "Water Supply Regs", "BS 7671"],
    correctAnswer: "Gas Safety (Installation and Use) Regulations",
    explanation: "These regulations ensure safe installation and maintenance of gas systems."
  },
  {
    id: "domesticFuelsQ8",
    topic: "domestic-fuels",
    question: "What device is mandatory in properties with solid fuel heating?",
    options: ["Gas meter", "CO detector", "Pressure relief valve", "Boiler thermostat"],
    correctAnswer: "CO detector",
    explanation: "Carbon monoxide detectors are required for solid fuel systems due to risk of CO exposure."
  },
  {
    id: "domesticFuelsQ9",
    topic: "domestic-fuels",
    question: "Which fuel requires a storage tank outside the building?",
    options: ["Natural gas", "Butane", "Electricity", "Oil"],
    correctAnswer: "Oil",
    explanation: "Oil-fueled heating systems store oil in tanks, usually outside for safety."
  },
  {
    id: "domesticFuelsQ10",
    topic: "domestic-fuels",
    question: "Which safety device shuts off gas when pilot flame fails?",
    options: ["Thermostat", "Gas valve", "Flame failure device", "Flow restrictor"],
    correctAnswer: "Flame failure device",
    explanation: "This device prevents unburnt gas release when flame is extinguished."
  },
  {
    id: "domesticFuelsQ11",
    topic: "domestic-fuels",
    question: "What is the typical pressure of mains gas supply in the UK?",
    options: ["8 mbar", "12 mbar", "21 mbar", "35 mbar"],
    correctAnswer: "21 mbar",
    explanation: "UK mains gas is delivered at a nominal pressure of 21 millibars."
  },
  {
    id: "domesticFuelsQ12",
    topic: "domestic-fuels",
    question: "Which test is used to detect gas leaks in a system?",
    options: ["Flow test", "Tightness test", "Pressure drop test", "Thermal test"],
    correctAnswer: "Tightness test",
    explanation: "A tightness test is performed to identify leaks in a gas system."
  },
  {
    id: "domesticFuelsQ13",
    topic: "domestic-fuels",
    question: "Which gas has the highest calorific value among domestic fuels?",
    options: ["Butane", "Natural gas", "Oil", "Propane"],
    correctAnswer: "Butane",
    explanation: "Butane delivers the highest calorific value per cubic metre among these options."
  },
  {
    id: "domesticFuelsQ14",
    topic: "domestic-fuels",
    question: "What does a yellow gas flame usually indicate?",
    options: ["Efficient combustion", "Overheating", "Incomplete combustion", "Pilot mode"],
    correctAnswer: "Incomplete combustion",
    explanation: "A yellow flame means unburnt carbon and possible CO production due to poor air mix."
  },
  {
    id: "domesticFuelsQ15",
    topic: "domestic-fuels",
    question: "Which appliance must be flued to discharge combustion gases safely?",
    options: ["Portable heater", "Combi boiler", "Gas hob", "Fan heater"],
    correctAnswer: "Combi boiler",
    explanation: "Combi boilers must be properly flued to remove flue gases outside."
  },
  {
    id: "domesticFuelsQ16",
    topic: "domestic-fuels",
    question: "Which gas is heavier than air and can accumulate at low levels if leaked?",
    options: ["Hydrogen", "Butane", "Methane", "Oxygen"],
    correctAnswer: "Butane",
    explanation: "Butane is denser than air and poses a risk of pooling near the floor during leaks."
  },
  {
    id: "domesticFuelsQ17",
    topic: "domestic-fuels",
    question: "What is the primary advantage of condensing boilers?",
    options: ["Lower installation cost", "Compact size", "Reduced fuel consumption", "Quieter operation"],
    correctAnswer: "Reduced fuel consumption",
    explanation: "Condensing boilers recover heat from flue gases, improving efficiency and saving fuel."
  },
  {
    id: "domesticFuelsQ18",
    topic: "domestic-fuels",
    question: "Which fuel is typically stored in pressurised cylinders for portable domestic use?",
    options: ["Natural gas", "Coal", "Propane", "Electricity"],
    correctAnswer: "Propane",
    explanation: "Propane is commonly stored in cylinders for heating and cooking in off-grid areas."
  },
  {
    id: "domesticFuelsQ19",
    topic: "domestic-fuels",
    question: "What colour is used to identify a gas pipe in a domestic setting?",
    options: ["Green", "Red", "Yellow", "Blue"],
    correctAnswer: "Yellow",
    explanation: "Yellow is the standard identification colour for gas pipework."
  },
  {
    id: "domesticFuelsQ20",
    topic: "domestic-fuels",
    question: "Which British Standard covers domestic gas installations?",
    options: ["BS 5839", "BS 7671", "BS 6891", "BS 6700"],
    correctAnswer: "BS 6891",
    explanation: "BS 6891 specifies the requirements for low-pressure gas pipework installations."
  },
  {
    id: "domesticFuelsQ21",
    topic: "domestic-fuels",
    question: "Which control is responsible for adjusting room temperature in gas central heating?",
    options: ["Cylinder stat", "Room thermostat", "Timer", "Flow switch"],
    correctAnswer: "Room thermostat",
    explanation: "The room thermostat controls the desired ambient temperature by regulating the boiler."
  },
  {
    id: "domesticFuelsQ22",
    topic: "domestic-fuels",
    question: "What must be provided in a room with a gas appliance over 7kW?",
    options: ["Secondary flue", "Combustion seal", "Permanent ventilation", "Fire-resistant doors"],
    correctAnswer: "Permanent ventilation",
    explanation: "To ensure safe combustion, adequate airflow is required for high-output appliances."
  },
  {
    id: "domesticFuelsQ23",
    topic: "domestic-fuels",
    question: "How are LPG and natural gas different in terms of supply pressure?",
    options: ["LPG is higher", "Natural gas is higher", "They are equal", "LPG is only used for BBQs"],
    correctAnswer: "LPG is higher",
    explanation: "LPG systems typically operate at a higher pressure than natural gas systems."
  },
  {
    id: "domesticFuelsQ24",
    topic: "domestic-fuels",
    question: "Which of the following gases is odourised for leak detection?",
    options: ["Carbon monoxide", "Methane", "Carbon dioxide", "Oxygen"],
    correctAnswer: "Methane",
    explanation: "Methane is odourless naturally but is treated with mercaptan to allow leak detection."
  },
  {
    id: "domesticFuelsQ25",
    topic: "domestic-fuels",
    question: "What is the ignition temperature of natural gas?",
    options: ["250°C", "500°C", "650°C", "900°C"],
    correctAnswer: "650°C",
    explanation: "Natural gas typically ignites at temperatures around 650°C."
  },
  {
    id: "domesticFuelsQ26",
    topic: "domestic-fuels",
    question: "What should you do if you detect a strong smell of gas in a property?",
    options: [
      "Turn on the extractor fan",
      "Switch off all lights",
      "Open windows and turn off gas at meter",
      "Evacuate and lock all doors"
    ],
    correctAnswer: "Open windows and turn off gas at meter",
    explanation: "This action ventilates the area and eliminates the gas supply to prevent ignition."
  },
  {
    id: "domesticFuelsQ27",
    topic: "domestic-fuels",
    question: "Which unit is commonly used to measure energy content of domestic fuels?",
    options: ["Celsius", "Watt", "Litre", "Kilowatt-hour"],
    correctAnswer: "Kilowatt-hour",
    explanation: "kWh is the standard unit used to measure energy usage and billing for fuels."
  },
  {
    id: "domesticFuelsQ28",
    topic: "domestic-fuels",
    question: "What effect does high moisture content have on solid fuel combustion?",
    options: ["Improves efficiency", "Lowers emissions", "Increases smoke and reduces heat", "No impact"],
    correctAnswer: "Increases smoke and reduces heat",
    explanation: "Wet fuel burns less efficiently, causing excess smoke and less usable heat."
  },
  {
    id: "domesticFuelsQ29",
    topic: "domestic-fuels",
    question: "Which document must be issued by a Gas Safe engineer after a new gas boiler install?",
    options: ["Gas certificate", "Building Control Notice", "Installation receipt", "Benchmark Certificate"],
    correctAnswer: "Benchmark Certificate",
    explanation: "This is a key document confirming commissioning and compliance of gas appliances."
  },
  {
    id: "domesticFuelsQ30",
    topic: "domestic-fuels",
    question: "Which UK body registers competent gas engineers?",
    options: ["WRAS", "HSE", "OFTEC", "Gas Safe Register"],
    correctAnswer: "Gas Safe Register",
    explanation: "Gas Safe Register is the official gas registration body replacing CORGI."
  },
  {
    id: "domesticFuelsQ31",
    topic: "domestic-fuels",
    question: "Which appliance is most likely to use LPG in a rural off-grid UK home?",
    options: ["Electric oven", "Oil boiler", "Gas hob", "Immersion heater"],
    correctAnswer: "Gas hob",
    explanation: "LPG is a common alternative fuel for gas hobs in areas without mains gas."
  },
  {
    id: "domesticFuelsQ32",
    topic: "domestic-fuels",
    question: "Which property of gas makes it dangerous in enclosed spaces?",
    options: ["Lack of colour", "High energy content", "Toxicity", "Flammability and accumulation"],
    correctAnswer: "Flammability and accumulation",
    explanation: "Gas can accumulate and ignite explosively if ventilation is poor."
  },
  {
    id: "domesticFuelsQ33",
    topic: "domestic-fuels",
    question: "Which test is used to confirm tightness of a gas installation?",
    options: ["Flow test", "Temperature test", "Let-by and tightness test", "Combustion analysis"],
    correctAnswer: "Let-by and tightness test",
    explanation: "This ensures no leaks exist and confirms the system is gas-tight."
  },
  {
    id: "domesticFuelsQ34",
    topic: "domestic-fuels",
    question: "What does a flame picture indicate during combustion analysis?",
    options: ["Heat output", "Efficiency", "Air/fuel ratio", "Appliance lifespan"],
    correctAnswer: "Air/fuel ratio",
    explanation: "The colour and stability of the flame help assess correct combustion conditions."
  },
  {
    id: "domesticFuelsQ35",
    topic: "domestic-fuels",
    question: "What is the purpose of a flue in a gas appliance?",
    options: ["Reduce noise", "Increase pressure", "Remove combustion products", "Cool the appliance"],
    correctAnswer: "Remove combustion products",
    explanation: "A flue safely vents exhaust gases such as CO₂ and water vapour outdoors."
  },
  {
    id: "domesticFuelsQ36",
    topic: "domestic-fuels",
    question: "Which gas is produced by incomplete combustion of fuel?",
    options: ["Carbon dioxide", "Oxygen", "Carbon monoxide", "Nitrogen"],
    correctAnswer: "Carbon monoxide",
    explanation: "CO is a deadly gas caused by insufficient oxygen during combustion."
  },
  {
    id: "domesticFuelsQ37",
    topic: "domestic-fuels",
    question: "What is the role of a regulator on an LPG installation?",
    options: ["Ignites the burner", "Filters impurities", "Controls gas pressure", "Detects leaks"],
    correctAnswer: "Controls gas pressure",
    explanation: "LPG regulators ensure consistent safe pressure for appliance operation."
  },
  {
    id: "domesticFuelsQ38",
    topic: "domestic-fuels",
    question: "How often should domestic gas boilers be serviced?",
    options: ["Every 6 months", "Only when faults occur", "Annually", "Every 3 years"],
    correctAnswer: "Annually",
    explanation: "Annual servicing ensures safe, efficient operation and validates warranties."
  },
  {
    id: "domesticFuelsQ39",
    topic: "domestic-fuels",
    question: "What does a blue flame in a gas appliance typically indicate?",
    options: ["Poor combustion", "Overheating", "Normal, clean combustion", "Blocked flue"],
    correctAnswer: "Normal, clean combustion",
    explanation: "A steady blue flame shows complete combustion with correct air/fuel mix."
  },
  {
    id: "domesticFuelsQ40",
    topic: "domestic-fuels",
    question: "Which type of gas is stored as a liquid under moderate pressure?",
    options: ["Natural gas", "Butane", "Methane", "Carbon dioxide"],
    correctAnswer: "Butane",
    explanation: "Butane and propane are stored in liquid form to increase volume efficiency."
  },
  {
    id: "domesticFuelsQ41",
    topic: "domestic-fuels",
    question: "What should you do before working on any gas appliance?",
    options: ["Test voltage", "Check manufacturer brand", "Isolate gas supply", "Call the fire brigade"],
    correctAnswer: "Isolate gas supply",
    explanation: "Always isolate the supply to ensure safety when servicing or repairing."
  },
  {
    id: "domesticFuelsQ42",
    topic: "domestic-fuels",
    question: "Which document provides guidance on safe installation of LPG in dwellings?",
    options: ["Gas Safety Act", "Part G of Building Regs", "BS 5482", "Water Regulations"],
    correctAnswer: "BS 5482",
    explanation: "BS 5482 covers domestic LPG installations including ventilation and appliances."
  },
  {
    id: "domesticFuelsQ43",
    topic: "domestic-fuels",
    question: "Which of the following is a symptom of carbon monoxide poisoning?",
    options: ["Nausea and headaches", "Dry skin", "Muscle cramps", "High temperature"],
    correctAnswer: "Nausea and headaches",
    explanation: "CO poisoning symptoms often mimic flu, leading to misdiagnosis if undetected."
  },
  {
    id: "domesticFuelsQ44",
    topic: "domestic-fuels",
    question: "What does the gas meter measure?",
    options: ["Voltage", "Flow rate", "Energy consumption in kWh", "Water content"],
    correctAnswer: "Energy consumption in kWh",
    explanation: "Meters calculate energy usage which is billed in kilowatt-hours."
  },
  {
    id: "domesticFuelsQ45",
    topic: "domestic-fuels",
    question: "What is the typical pressure of natural gas supplied to UK homes?",
    options: ["21 mbar", "50 mbar", "10 psi", "100 psi"],
    correctAnswer: "21 mbar",
    explanation: "Low pressure natural gas is delivered at around 21 millibar in domestic supplies."
  },
  {
    id: "domesticFuelsQ46",
    topic: "domestic-fuels",
    question: "How should gas pipework be run in a domestic property?",
    options: ["Unclipped for movement", "In plastic trunking", "Visibly marked and supported", "Hidden behind all walls"],
    correctAnswer: "Visibly marked and supported",
    explanation: "Pipework must be securely clipped and identifiable to comply with regs."
  },
  {
    id: "domesticFuelsQ47",
    topic: "domestic-fuels",
    question: "Where should a CO alarm be installed in a home with a gas boiler?",
    options: ["Above cooker", "Inside the boiler casing", "Near sleeping areas and appliance", "By the gas meter"],
    correctAnswer: "Near sleeping areas and appliance",
    explanation: "CO alarms should be placed where exposure is likely while asleep and near the source."
  },
  {
    id: "domesticFuelsQ48",
    topic: "domestic-fuels",
    question: "What does an FGA (Flue Gas Analyser) measure?",
    options: ["Water pressure", "Voltage", "Combustion efficiency", "Pipe tightness"],
    correctAnswer: "Combustion efficiency",
    explanation: "FGAs analyse flue gases to ensure clean, efficient combustion of fuel."
  },
  {
    id: "domesticFuelsQ49",
    topic: "domestic-fuels",
    question: "Which component prevents overpressurisation of a sealed gas system?",
    options: ["Thermocouple", "Expansion vessel", "Safety valve", "Isolation valve"],
    correctAnswer: "Safety valve",
    explanation: "A safety valve discharges pressure when limits are exceeded to avoid damage."
  },
  {
    id: "domesticFuelsQ50",
    topic: "domestic-fuels",
    question: "What training is legally required to carry out gas work in the UK?",
    options: ["Manual handling", "OFTEC course", "Gas Safe registration", "NVQ Level 1"],
    correctAnswer: "Gas Safe registration",
    explanation: "It is illegal to carry out gas work in the UK without Gas Safe registration."
  },


];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'domestic-fuels');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of domesticFuelsQuestions) {
    if (
      !q.id ||
      !q.topic ||
      !q.question ||
      !Array.isArray(q.options) ||
      typeof q.correctAnswer !== 'string' ||
      typeof q.explanation !== 'string'
    ) {
      console.error(`❌ Skipped: Invalid structure for question:`, q);
      continue;
    }

    try {
      const questionDocRef = doc(db, 'questions', 'domestic-fuels', 'items', q.id);
      await setDoc(questionDocRef, q);
      console.log(`✅ Uploaded question: ${q.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${q.id}:`, err);
    }
  }
}

upload();
