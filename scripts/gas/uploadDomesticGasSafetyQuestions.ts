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

const gasDomesticSafetyQuestions = [
  {
    id: 'gasDomesticSafetyQ1',
    topic: 'gas-domestic-safety',
    question: 'What is the typical operating pressure at a domestic gas meter outlet?',
    options: ['17 mbar', '21 mbar', '23 mbar', '28 mbar'],
    correctAnswer: '21 mbar',
    explanation: 'Domestic appliances are designed to operate at 21 mbar at the meter outlet.',
  },
  {
    id: 'gasDomesticSafetyQ2',
    topic: 'gas-domestic-safety',
    question: 'Who is legally allowed to carry out gas work in the UK?',
    options: ['Anyone', 'Qualified plumber', 'Gas Safe registered engineer', 'Certified builder'],
    correctAnswer: 'Gas Safe registered engineer',
    explanation: 'Only Gas Safe registered engineers are legally permitted to work on gas installations.',
  },
  {
    id: 'gasDomesticSafetyQ3',
    topic: 'gas-domestic-safety',
    question: 'Which gas is commonly used for domestic supply in the UK?',
    options: ['Butane', 'Propane', 'Natural Gas (Methane)', 'Hydrogen'],
    correctAnswer: 'Natural Gas (Methane)',
    explanation: 'Natural gas (methane) is the main fuel used in homes connected to the mains supply.',
  },
  {
    id: 'gasDomesticSafetyQ4',
    topic: 'gas-domestic-safety',
    question: 'What should be carried out before working on a gas appliance?',
    options: ['Visual inspection', 'Tightness test', 'Ventilation check', 'Flue inspection'],
    correctAnswer: 'Tightness test',
    explanation: 'A tightness test ensures no leaks exist before any work begins.',
  },
  {
    id: 'gasDomesticSafetyQ5',
    topic: 'gas-domestic-safety',
    question: 'Where must a Gas Safety Certificate be provided by law?',
    options: ['New build houses', 'All domestic homes', 'Rental properties', 'Commercial kitchens'],
    correctAnswer: 'Rental properties',
    explanation: 'Landlords are required to provide Gas Safety Certificates for rental properties.',
  },
  {
    id: 'gasDomesticSafetyQ6',
    topic: 'gas-domestic-safety',
    question: 'What organization manages the official register of gas engineers in the UK?',
    options: ['CORGI', 'Gas Safe Register', 'Ofgem', 'Building Control'],
    correctAnswer: 'Gas Safe Register',
    explanation: 'The Gas Safe Register replaced CORGI as the UK’s official gas registration body.',
  },
  {
    id: 'gasDomesticSafetyQ7',
    topic: 'gas-domestic-safety',
    question: 'What color is typically associated with underground gas pipes?',
    options: ['Blue', 'Red', 'Yellow', 'Green'],
    correctAnswer: 'Yellow',
    explanation: 'Yellow indicates the presence of gas pipes in underground and above ground markers.',
  },
  {
    id: 'gasDomesticSafetyQ8',
    topic: 'gas-domestic-safety',
    question: 'What does "Immediately Dangerous" (ID) mean regarding gas appliances?',
    options: ['Safe but requires monitoring', 'Immediate danger to life', 'Minor defect', 'Needs servicing soon'],
    correctAnswer: 'Immediate danger to life',
    explanation: 'An ID situation poses immediate risk and must be dealt with urgently.',
  },
  {
    id: 'gasDomesticSafetyQ9',
    topic: 'gas-domestic-safety',
    question: 'Which test ensures a gas system is leak-free after installation?',
    options: ['Visual inspection', 'Flue analysis', 'Tightness test', 'Purge test'],
    correctAnswer: 'Tightness test',
    explanation: 'A tightness test confirms no leaks exist in a gas installation.',
  },
  {
    id: 'gasDomesticSafetyQ10',
    topic: 'gas-domestic-safety',
    question: 'What should be checked before commissioning a new gas appliance?',
    options: ['Warranty registration', 'Installer’s ID', 'Ventilation and flue systems', 'Pipe color coding'],
    correctAnswer: 'Ventilation and flue systems',
    explanation: 'Proper ventilation and safe flue arrangements must be confirmed before commissioning.',
  },
  {
    id: 'gasDomesticSafetyQ11',
    topic: 'gas-domestic-safety',
    question: 'Which regulation governs landlord duties for gas safety?',
    options: [
      'Health and Safety at Work Act',
      'Building Regulations Part J',
      'Gas Safety (Installation and Use) Regulations',
      'Water Regulations'
    ],
    correctAnswer: 'Gas Safety (Installation and Use) Regulations',
    explanation: 'These regulations place clear legal duties on landlords regarding gas safety.',
  },
  {
    id: 'gasDomesticSafetyQ12',
    topic: 'gas-domestic-safety',
    question: 'What is required when purging air from a new gas pipe installation?',
    options: ['Visual inspection', 'CO2 monitor', 'Proper ventilation', 'Seal the system'],
    correctAnswer: 'Proper ventilation',
    explanation: 'Adequate ventilation must be provided during purging to prevent gas buildup.',
  },
  {
    id: 'gasDomesticSafetyQ13',
    topic: 'gas-domestic-safety',
    question: 'Who is responsible for enforcing gas safety law in the UK?',
    options: ['Gas Safe Register', 'HSE', 'Local authority', 'Building Control'],
    correctAnswer: 'HSE',
    explanation: 'The Health and Safety Executive enforces gas safety laws and prosecutes breaches.',
  },
  {
    id: 'gasDomesticSafetyQ14',
    topic: 'gas-domestic-safety',
    question: 'What type of appliance would most likely need a flue gas analyzer check?',
    options: ['Radiator', 'Boiler', 'Water tank', 'Washing machine'],
    correctAnswer: 'Boiler',
    explanation: 'Boilers require flue gas analysis to confirm correct combustion.',
  },
  {
    id: 'gasDomesticSafetyQ15',
    topic: 'gas-domestic-safety',
    question: 'When should a Let-By Test be carried out?',
    options: ['Before a tightness test', 'After a tightness test', 'After commissioning', 'During appliance servicing'],
    correctAnswer: 'Before a tightness test',
    explanation: 'A Let-By Test is done first to confirm no meter/control valve leakage.',
  },
  {
    id: 'gasDomesticSafetyQ16',
    topic: 'gas-domestic-safety',
    question: 'In an emergency gas escape situation indoors, you should first:',
    options: [
      'Evacuate the building immediately',
      'Turn off the gas supply',
      'Open doors and windows',
      'Call the emergency services'
    ],
    correctAnswer: 'Turn off the gas supply',
    explanation: 'If safe to do so, immediately isolate the gas supply to prevent escalation.',
  },
  {
    id: 'gasDomesticSafetyQ17',
    topic: 'gas-domestic-safety',
    question: 'The typical minimum size of a domestic gas installation pipe is:',
    options: ['8 mm', '10 mm', '15 mm', '22 mm'],
    correctAnswer: '15 mm',
    explanation: '15 mm is commonly the minimum size for domestic gas pipework unless smaller is permitted by manufacturers.',
  },
  {
    id: 'gasDomesticSafetyQ18',
    topic: 'gas-domestic-safety',
    question: 'What must be provided for room-sealed appliances?',
    options: ['Extractor fan', 'Permanent ventilation', 'Flue system', 'Open chimney'],
    correctAnswer: 'Flue system',
    explanation: 'Room-sealed appliances must have a dedicated flue to discharge combustion products safely.',
  },
  {
    id: 'gasDomesticSafetyQ19',
    topic: 'gas-domestic-safety',
    question: 'How often must rental properties have a Gas Safety inspection?',
    options: ['Every 5 years', 'Every 3 years', 'Every year', 'Every 2 years'],
    correctAnswer: 'Every year',
    explanation: 'Rental properties must undergo a gas safety inspection at least once every 12 months.',
  },
  {
    id: 'gasDomesticSafetyQ20',
    topic: 'gas-domestic-safety',
    question: 'What is a telltale sign of incomplete combustion?',
    options: ['Strong blue flame', 'Lack of noise', 'Yellow or sooty flame', 'Low temperature'],
    correctAnswer: 'Yellow or sooty flame',
    explanation: 'Yellow flames and soot indicate incomplete combustion and possible CO production.',
  },
  {
    id: 'gasDomesticSafetyQ21',
    topic: 'gas-domestic-safety',
    question: 'What device measures carbon monoxide levels in flue gases?',
    options: ['Tightness gauge', 'Manometer', 'Flue gas analyser', 'Pressure relief valve'],
    correctAnswer: 'Flue gas analyser',
    explanation: 'A flue gas analyser checks combustion efficiency and CO output.',
  },
  {
    id: 'gasDomesticSafetyQ22',
    topic: 'gas-domestic-safety',
    question: 'Natural gas is lighter than air and will:',
    options: ['Fall to the floor', 'Mix evenly', 'Rise to the ceiling', 'Explode on contact'],
    correctAnswer: 'Rise to the ceiling',
    explanation: 'Natural gas is lighter than air and tends to rise, accumulating at higher points.',
  },
  {
    id: 'gasDomesticSafetyQ23',
    topic: 'gas-domestic-safety',
    question: 'CO alarms must be located:',
    options: ['Next to kitchen sink', 'Near ceiling, close to appliances', 'Inside cupboards', 'At floor level'],
    correctAnswer: 'Near ceiling, close to appliances',
    explanation: 'CO alarms must be installed high up on a wall, near gas appliances for early detection.',
  },
  {
    id: 'gasDomesticSafetyQ24',
    topic: 'gas-domestic-safety',
    question: 'An emergency control valve for gas should be:',
    options: ['Painted red', 'Readily accessible', 'Located outside', 'Hidden in a cupboard'],
    correctAnswer: 'Readily accessible',
    explanation: 'Emergency control valves must be easily accessible in an emergency situation.',
  },
  {
    id: 'gasDomesticSafetyQ25',
    topic: 'gas-domestic-safety',
    question: 'Who should be contacted after a serious gas incident?',
    options: ['Gas Safe Register', 'HSE', 'Local police', 'Building Control'],
    correctAnswer: 'HSE',
    explanation: 'Serious gas incidents must be reported to the HSE under RIDDOR regulations.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-domestic-safety');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasDomesticSafetyQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
