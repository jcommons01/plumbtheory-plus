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

const gasVentilationQuestions = [
  {
    id: 'gasVentilationQ1',
    topic: 'gas-ventilation-requirements',
    question: 'What is the primary purpose of ventilation in a gas appliance installation?',
    options: ['To remove flue gases', 'To reduce noise', 'To provide air for combustion', 'To cool the appliance casing'],
    correctAnswer: 'To provide air for combustion',
    explanation: 'Ventilation ensures that sufficient oxygen is available for safe combustion.',
  },
  {
    id: 'gasVentilationQ2',
    topic: 'gas-ventilation-requirements',
    question: 'What is the minimum free area required for ventilation to a room sealed from outside that contains a room-sealed appliance?',
    options: ['No requirement', '10cm² per kW input', '5cm² per kW input', '1cm² per kW input'],
    correctAnswer: 'No requirement',
    explanation: 'Room-sealed appliances draw combustion air directly from outside through a balanced flue, so no ventilation to the room is required for combustion air.'
  },
  {
  id: 'gasVentilationQ3',
  topic: 'gas-ventilation-requirements',
  question: 'Where must permanent ventilation be provided from for a room containing an open-flued gas appliance?',
  options: ['From the kitchen', 'From the outside', 'From a bathroom', 'From under the floorboards'],
  correctAnswer: 'From the outside',
  explanation: 'Open-flued appliances rely on air from the room for combustion, so the room must be permanently ventilated with a direct supply of air from outside.'
  },
  {
    id: 'gasVentilationQ4',
    topic: 'gas-ventilation-requirements',
    question: 'What regulation covers ventilation for gas installations?',
    options: ['Part P', 'GSIUR', 'WRAS', 'FENSA'],
    correctAnswer: 'GSIUR',
    explanation: 'The Gas Safety (Installation and Use) Regulations set legal ventilation requirements.',
  },
  {
    id: 'gasVentilationQ5',
    topic: 'gas-ventilation-requirements',
    question: 'Which British Standard provides technical guidance on ventilation requirements for gas appliances?',
    options: ['BS 7671', 'BS 5440-2', 'GSIUR', 'Part L'],
    correctAnswer: 'BS 5440-2',
    explanation: 'BS 5440-2 gives detailed technical guidance on ventilation sizes, types, and positioning for gas appliances.',
  },
  {
    id: 'gasVentilationQ6',
    topic: 'gas-ventilation-requirements',
    question: 'Ventilation grilles must be:',
    options: ['Removable', 'Manually operated', 'Permanently open and fixed', 'Covered when not in use'],
    correctAnswer: 'Permanently open and fixed',
    explanation: 'Ventilation must not be blocked or shut off — grilles must remain open.',
  },
  {
  id: 'gasVentilationQ7',
  topic: 'gas-ventilation-requirements',
  question: 'Which appliance typically requires the most ventilation?',
  options: ['Room-sealed boiler', 'Gas hob', 'Decorative open-flued fire', 'Fan flued water heater'],
  correctAnswer: 'Decorative open-flued fire',
  explanation: 'Decorative open-flued appliances require large air volumes for safe combustion and pose a higher risk of spillage if not properly ventilated.'
  },
  {
    id: 'gasVentilationQ8',
    topic: 'gas-ventilation-requirements',
    question: 'Which room should never be used to supply ventilation to a gas appliance?',
    options: ['Lounge', 'Utility room', 'Bedroom', 'Kitchen'],
    correctAnswer: 'Bedroom',
    explanation: 'Ventilation air must never be drawn from bedrooms due to the risk of carbon monoxide exposure while sleeping. BS 5440-2 prohibits supplying combustion air from rooms intended for sleeping.',
  },
  {
    id: 'gasVentilationQ9',
    topic: 'gas-ventilation-requirements',
    question: 'What is the main risk of a blocked air vent for an open-flued appliance?',
    options: ['Excessive heat', 'Fire risk', 'CO production and incomplete combustion', 'Loss of water pressure'],
    correctAnswer: 'CO production and incomplete combustion',
    explanation: 'Blocked ventilation causes oxygen deficiency, leading to CO production.',
  },
  {
    id: 'gasVentilationQ10',
    topic: 'gas-ventilation-requirements',
    question: 'What minimum free area ventilation is required for a 10kW input open-flued appliance in a compartment?',
    options: ['10cm²', '50cm²', '100cm²', '250cm²'],
    correctAnswer: '100cm²',
    explanation: 'BS 5440-2 recommends 10cm² of free area ventilation per kW of appliance input. For a 10kW open-flued appliance in a compartment, this means 100cm² at both high and low levels.',
  },
  {
    id: 'gasVentilationQ11',
    topic: 'gas-ventilation-requirements',
    question: 'Can a boiler be installed in a compartment without ventilation?',
    options: ['Yes, if it’s room-sealed', 'Yes, if under 24kW', 'No, never', 'Only if CO alarm fitted'],
    correctAnswer: 'Yes, if it’s room-sealed',
    explanation: 'Room-sealed boilers take air from outside via a balanced flue and do not need compartment ventilation for combustion. However, always check manufacturer guidelines for possible cooling requirements.',
  },
  {
    id: 'gasVentilationQ12',
    topic: 'gas-ventilation-requirements',
    question: 'How should a compartment housing an open-flued appliance be ventilated?',
    options: ['Top only', 'Bottom only', 'Top and bottom vents', 'No vents needed'],
    correctAnswer: 'Top and bottom vents',
    explanation: 'BS 5440-2 requires both high and low level ventilation to provide adequate airflow for combustion and cooling when housing an open-flued appliance in a compartment.',
  },
  {
    id: 'gasVentilationQ13',
    topic: 'gas-ventilation-requirements',
    question: 'Which factor is NOT relevant when calculating ventilation?',
    options: ['Appliance input rating', 'Appliance type', 'Pipe diameter', 'Location of appliance'],
    correctAnswer: 'Pipe diameter',
    explanation: 'Ventilation requirements are based on the appliance’s heat input, type, and installation location. Gas pipe diameter has no impact on ventilation calculations.',
  },
  {
    id: 'gasVentilationQ14',
    topic: 'gas-ventilation-requirements',
    question: 'Can mechanical extraction affect appliance ventilation?',
    options: ['No', 'Only for hobs', 'Yes, if it creates negative pressure', 'Only for open-flued boilers'],
    correctAnswer: 'Yes, if it creates negative pressure',
    explanation: 'Mechanical extractors can cause spillage in open-flued appliances.',
  },
  {
    id: 'gasVentilationQ15',
    topic: 'gas-ventilation-requirements',
    question: 'Where should a ventilation opening not be installed?',
    options: ['Directly behind a fire', 'Through an external wall', 'In a ceiling void', 'Above a skirting board'],
    correctAnswer: 'Directly behind a fire',
    explanation: 'Placing ventilation behind an appliance can create poor airflow and backdraft.',
  },
  {
    id: 'gasVentilationQ16',
    topic: 'gas-ventilation-requirements',
    question: 'For a 20kW open-flued boiler in a compartment, how much total free area ventilation is required (high and low combined)?',
    options: ['50cm²', '100cm²', '200cm²', '400cm²'],
    correctAnswer: '400cm²',
    explanation: 'Ventilation in a compartment must be 10cm² per kW at both high and low level. For 20kW: 200cm² high + 200cm² low = 400cm² total.',
  },
  {
    id: 'gasVentilationQ17',
  topic: 'gas-ventilation-requirements',
  question: 'In a kitchen under 20m³ with a gas hob, can an openable window alone meet ventilation requirements?',
  options: ['Yes', 'No', 'Only if trickle vents are present', 'Only if no extractor fan is installed'],
  correctAnswer: 'No',
  explanation: 'In kitchens under 20m³, BS 5440-2 requires fixed ventilation in addition to an openable window. A window alone is not sufficient in small rooms.',
  },
  {
    id: 'gasVentilationQ18',
    topic: 'gas-ventilation-requirements',
    question: 'Does Building Regulations Part J cover gas appliance ventilation?',
    options: ['Yes', 'No', 'Only for commercial properties', 'Only flueing is covered'],
    correctAnswer: 'Yes',
    explanation: 'Part J includes guidance for combustion air supply and ventilation openings.',
  },
  {
    id: 'gasVentilationQ19',
  topic: 'gas-ventilation-requirements',
  question: 'Which appliance type requires the room it’s installed in to have permanent ventilation from outside air?',
  options: ['Open-flued', 'Room-sealed', 'Balanced flue', 'Fan flued'],
  correctAnswer: 'Open-flued',
  explanation: 'Open-flued appliances draw combustion air from the room, which must be permanently ventilated with fresh air from outside.',
  },
  {
    id: 'gasVentilationQ20',
    topic: 'gas-ventilation-requirements',
    question: 'What is the general requirement for ventilation grilles installed in walls for domestic gas appliances?',
    options: ['Be fire rated in all cases', 'Not be blocked or covered', 'Be made of steel', 'Be adjustable by the user'],
    correctAnswer: 'Not be blocked or covered',
    explanation: 'Ventilation grilles must allow permanent, unobstructed airflow. Fire rating may apply in some cases, but not universally.',
  },
  {
    id: 'gasVentilationQ21',
    topic: 'gas-ventilation-requirements',
    question: 'Where should low-level vents be positioned in a compartment?',
    options: ['At ceiling height', 'Above the appliance', 'Near the floor', 'Next to flue'],
    correctAnswer: 'Near the floor',
    explanation: 'Low-level vents help cool air enter and circulate from the bottom of the space.',
  },
  {
    id: 'gasVentilationQ22',
    topic: 'gas-ventilation-requirements',
    question: 'High-level vents help:',
    options: ['Prevent water leaks', 'Remove cold air', 'Exhaust combustion products', 'Allow warm air to exit'],
    correctAnswer: 'Allow warm air to exit',
    explanation: 'High-level vents let warm air escape, enabling fresh air flow through the space.',
  },
  {
    id: 'gasVentilationQ23',
    topic: 'gas-ventilation-requirements',
    question: 'Which type of property requires special attention for ventilation?',
    options: ['Ground floor flats', 'Modern airtight homes', 'Loft conversions', 'Homes with solid floors'],
    correctAnswer: 'Modern airtight homes',
    explanation: 'Modern energy-efficient homes are well sealed and may require extra ventilation.',
  },
  {
    id: 'gasVentilationQ24',
    topic: 'gas-ventilation-requirements',
    question: 'If an existing vent becomes blocked, the system should be marked as:',
    options: ['At Risk', 'ID', 'Not to Current Standards', 'Service due soon'],
    correctAnswer: 'At Risk',
    explanation: 'Blocked vents reduce air supply, making the appliance unsafe — this is classed At Risk.',
  },
  {
    id: 'gasVentilationQ25',
    topic: 'gas-ventilation-requirements',
    question: 'How is ventilation area usually measured?',
    options: ['In kW', 'In cm²', 'In °C', 'In mm'],
    correctAnswer: 'In cm²',
    explanation: 'Ventilation requirements are calculated based on cm² of free air space.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-ventilation-requirements');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasVentilationQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
