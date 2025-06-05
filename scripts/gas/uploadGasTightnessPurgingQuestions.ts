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

const gasTightnessPurgingQuestions = [
  {
    id: 'gasTightnessQ1',
    topic: 'gas-tightness-purging',
    question: 'According to IGE/UP/1B, what is the acceptable pressure drop during a tightness test on a new or existing domestic natural gas installation, when no smell of gas is present?',
    options: ['0 mbar', '1 mbar', '2 mbar', 'Up to 4 mbar'],
    correctAnswer: '0 mbar',
    explanation: 'IGE/UP/1B specifies that for both new and existing domestic gas installations, there should be no pressure drop after the stabilisation period if no smell of gas is present.',
  },
  {
    id: 'gasTightnessQ2',
    topic: 'gas-tightness-purging',
    question: 'What is the purpose of a let-by test?',
    options: ['To detect leaks in appliances', 'To test for regulator leakage', 'To purge air from pipework', 'To test gas meter accuracy'],
    correctAnswer: 'To test for regulator leakage',
    explanation: 'The let-by test checks for gas passing through a closed control valve.',
  },
  {
    id: 'gasTightnessQ3',
    topic: 'gas-tightness-purging',
    question: 'What equipment is required for a tightness test?',
    options: ['Pressure gauge or manometer', 'CO2 monitor', 'Smoke match', 'Clamp meter'],
    correctAnswer: 'Pressure gauge or manometer',
    explanation: 'Tightness tests are measured using an approved pressure gauge.',
  },
  {
    id: 'gasTightnessQ4',
    topic: 'gas-tightness-purging',
    question: 'What pressure is a domestic tightness test carried out at (natural gas)?',
    options: ['0.5 mbar', '10 mbar', '21 mbar', '20 mbar'],
    correctAnswer: '21 mbar',
    explanation: 'Domestic natural gas tightness tests are done at operating pressure of 21 mbar.',
  },
  {
    id: 'gasTightnessQ5',
    topic: 'gas-tightness-purging',
    question: 'Before purging gas pipework, what should you always do?',
    options: ['Close all windows', 'Turn on appliances', 'Ensure a tightness test has passed', 'Vent the property'],
    correctAnswer: 'Ensure a tightness test has passed',
    explanation: 'Purge must not be performed on systems with suspected leakage.',
  },
  {
    id: 'gasTightnessQ6',
    topic: 'gas-tightness-purging',
    question: 'What gas is commonly used to strength test new installations?',
    options: ['Oxygen', 'Nitrogen', 'CO2', 'Air'],
    correctAnswer: 'Nitrogen',
    explanation: 'Inert nitrogen is used to pressure-test pipework before gas is introduced.',
  },
  {
    id: 'gasTightnessQ7',
    topic: 'gas-tightness-purging',
    question: 'The strength test pressure for domestic pipework is typically:',
    options: ['10 mbar', '21 mbar', '50 mbar', '100 mbar'],
    correctAnswer: '100 mbar',
    explanation: 'Strength tests are done at higher pressures, typically 100 mbar for domestic copper pipe.',
  },
  {
    id: 'gasTightnessQ8',
    topic: 'gas-tightness-purging',
    question: 'When should a tightness test be carried out?',
    options: ['Before installing the meter', 'Before and after gas work', 'During flue installation', 'Only if a leak is suspected'],
    correctAnswer: 'Before and after gas work',
    explanation: 'A tightness test must be done both before and after working on a gas system.',
  },
  {
    id: 'gasTightnessQ9',
    topic: 'gas-tightness-purging',
    question: 'What is the typical duration for a domestic tightness test?',
    options: ['30 seconds', '1 minute', '2 minutes', '5 minutes'],
    correctAnswer: '2 minutes',
    explanation: 'Domestic tightness tests are held for 2 minutes to observe any pressure drop after stabilization.',
  },
  {
    id: 'gasTightnessQ10',
    topic: 'gas-tightness-purging',
    question: 'When purging a gas pipe, what is the goal?',
    options: ['Release pressure', 'Remove air or inert gases', 'Test combustion', 'Increase temperature'],
    correctAnswer: 'Remove air or inert gases',
    explanation: 'Purging ensures that only natural gas is present in the pipework before use.',
  },
  {
    id: 'gasTightnessQ11',
    topic: 'gas-tightness-purging',
    question: 'After a failed tightness test with a smell of gas, what classification is applied?',
    options: ['ID (Immediately Dangerous)', 'AR (At Risk)', 'NCS (Not to Current Standards)', 'Service required'],
    correctAnswer: 'ID (Immediately Dangerous)',
    explanation: 'Leaks with gas smell are immediately dangerous and must be rectified immediately.',
  },
  {
    id: 'gasTightnessQ12',
    topic: 'gas-tightness-purging',
    question: 'What type of valve is used to isolate gas during testing?',
    options: ['Drain valve', 'Zone valve', 'Emergency control valve (ECV)', 'Pump valve'],
    correctAnswer: 'Emergency control valve (ECV)',
    explanation: 'The ECV is used to shut off gas during testing and emergency situations.',
  },
  {
    id: 'gasTightnessQ13',
    topic: 'gas-tightness-purging',
    question: 'How should a system be purged after repair?',
    options: ['By opening the appliance valves', 'With ignition source on', 'Slowly and in a controlled manner', 'By blowing into pipework'],
    correctAnswer: 'Slowly and in a controlled manner',
    explanation: 'Gas must be introduced carefully to avoid creating an explosive mixture.',
  },
  {
    id: 'gasTightnessQ14',
    topic: 'gas-tightness-purging',
    question: 'Which of the following would cause a failed let-by test?',
    options: ['Loose appliance seal', 'Leaking regulator', 'Low pressure', 'CO alarm trigger'],
    correctAnswer: 'Leaking regulator',
    explanation: 'Let-by failure suggests the regulator is not holding back gas flow when shut.',
  },
  {
    id: 'gasTightnessQ15',
    topic: 'gas-tightness-purging',
    question: 'Which substance must never be used to test for gas leaks?',
    options: ['Leak detection spray', 'Soapy water', 'Naked flame', 'Electronic sniffer'],
    correctAnswer: 'Naked flame',
    explanation: 'It is extremely dangerous to use a flame for detecting leaks.',
  },
  {
    id: 'gasTightnessQ16',
    topic: 'gas-tightness-purging',
    question: 'What should you do if the pressure falls during a tightness test with no smell of gas?',
    options: ['Continue use', 'Classify as NCS', 'Investigate and retest', 'Purge immediately'],
    correctAnswer: 'Investigate and retest',
    explanation: 'Any pressure drop must be investigated even if gas is not smelled.',
  },
  {
    id: 'gasTightnessQ17',
    topic: 'gas-tightness-purging',
    question: 'What is the first step before performing a tightness test?',
    options: ['Purge the system', 'Switch off all appliances', 'Inform the customer', 'Increase meter pressure'],
    correctAnswer: 'Switch off all appliances',
    explanation: 'All appliances must be off or isolated to ensure an accurate test.',
  },
  {
    id: 'gasTightnessQ18',
    topic: 'gas-tightness-purging',
    question: 'During a purge, the gas should be released:',
    options: ['Directly into the appliance', 'Out of an open burner', 'Outside to open air', 'Into the meter case'],
    correctAnswer: 'Outside to open air',
    explanation: 'Gas must be safely vented outside to avoid hazardous buildup.',
  },
  {
    id: 'gasTightnessQ19',
    topic: 'gas-tightness-purging',
    question: 'What type of gas is used in new pipework before gas is connected?',
    options: ['CO2', 'Compressed air', 'Inert gas like nitrogen', 'Methane'],
    correctAnswer: 'Inert gas like nitrogen',
    explanation: 'To prevent combustion, inert gas is used for strength tests.',
  },
  {
    id: 'gasTightnessQ20',
    topic: 'gas-tightness-purging',
    question: 'When should a purge be carried out?',
    options: ['After tightness test and before lighting', 'Before a tightness test', 'During spillage test', 'After completion certificate'],
    correctAnswer: 'After tightness test and before lighting',
    explanation: 'Purging is done between tightness testing and appliance commissioning.',
  },
  {
    id: 'gasTightnessQ21',
    topic: 'gas-tightness-purging',
    question: 'How is purge volume estimated in small systems?',
    options: ['With pressure drop formula', 'By pipe diameter and length', 'By burner rating', 'Using temperature sensors'],
    correctAnswer: 'By pipe diameter and length',
    explanation: 'Purge volume is based on internal pipe size and total length.',
  },
  {
    id: 'gasTightnessQ22',
    topic: 'gas-tightness-purging',
    question: 'Tightness testing a domestic LPG system differs from natural gas in that:',
    options: ['Test pressure is lower', 'Test time is shorter', 'You must allow pressure drop', 'The pressure must be adjusted for vaporisation'],
    correctAnswer: 'The pressure must be adjusted for vaporisation',
    explanation: 'LPG pressure readings are affected by temperature/vaporisation rates.',
  },
  {
    id: 'gasTightnessQ23',
    topic: 'gas-tightness-purging',
    question: 'Which of the following is classed as a strength test only?',
    options: ['Using air under 20 mbar', 'Using nitrogen at 100 mbar', 'Using gas with meter on', 'Purging with appliances open'],
    correctAnswer: 'Using nitrogen at 100 mbar',
    explanation: 'Strength tests use inert gas at higher pressures to test pipework before connection.',
  },
  {
    id: 'gasTightnessQ24',
    topic: 'gas-tightness-purging',
    question: 'What is the risk if air remains in the pipe after purge?',
    options: ['Pressure increase', 'CO2 buildup', 'Risk of explosion on ignition', 'Incorrect meter reading'],
    correctAnswer: 'Risk of explosion on ignition',
    explanation: 'A mix of air and gas can form an explosive atmosphere if lit.',
  },
  {
    id: 'gasTightnessQ25',
    topic: 'gas-tightness-purging',
    question: 'Why must a tightness test be documented?',
    options: ['To check regulator flow rate', 'To prove workmanship and safety', 'To get customer approval', 'To prevent air in the system'],
    correctAnswer: 'To prove workmanship and safety',
    explanation: 'Testing and recording protects the installer and proves gas safety standards are met.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-tightness-purging');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasTightnessPurgingQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
