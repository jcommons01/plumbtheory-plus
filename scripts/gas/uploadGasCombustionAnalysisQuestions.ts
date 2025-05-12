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

const gasCombustionQuestions = [
  {
    id: 'gasCombustionQ1',
    topic: 'gas-combustion-analysis',
    question: 'What instrument is used to check flue gas composition?',
    options: ['Manometer', 'Flue Gas Analyser (FGA)', 'Smoke match', 'Thermocouple'],
    correctAnswer: 'Flue Gas Analyser (FGA)',
    explanation: 'An FGA measures combustion gases like CO and CO₂ for safety and efficiency.',
  },
  {
    id: 'gasCombustionQ2',
    topic: 'gas-combustion-analysis',
    question: 'Which gas indicates incomplete combustion if found in high levels?',
    options: ['Oxygen', 'Nitrogen', 'Carbon monoxide', 'Carbon dioxide'],
    correctAnswer: 'Carbon monoxide',
    explanation: 'CO is a product of incomplete combustion and is dangerous at elevated levels.',
  },
  {
    id: 'gasCombustionQ3',
    topic: 'gas-combustion-analysis',
    question: 'What is the typical maximum safe CO/CO₂ ratio for a domestic boiler?',
    options: ['0.0002', '0.001', '0.004', '0.008'],
    correctAnswer: '0.004',
    explanation: 'Most manufacturers specify 0.004 as the maximum CO/CO₂ ratio for safe combustion.',
  },
  {
    id: 'gasCombustionQ4',
    topic: 'gas-combustion-analysis',
    question: 'A high CO reading and low CO₂ reading indicates:',
    options: ['Efficient combustion', 'Blocked flue', 'Incomplete combustion', 'Correct ratio'],
    correctAnswer: 'Incomplete combustion',
    explanation: 'High CO and low CO₂ levels typically signal poor combustion.',
  },
  {
    id: 'gasCombustionQ5',
    topic: 'gas-combustion-analysis',
    question: 'When should you zero a flue gas analyser?',
    options: ['In the flue', 'Outside in clean air', 'Before charging it', 'After testing'],
    correctAnswer: 'Outside in clean air',
    explanation: 'FGAs must be zeroed in fresh air to calibrate the CO and O₂ sensors.',
  },
  {
    id: 'gasCombustionQ6',
    topic: 'gas-combustion-analysis',
    question: 'Which parameter is directly measured by the FGA?',
    options: ['Gas rate', 'Temperature differential', 'CO concentration', 'Water pressure'],
    correctAnswer: 'CO concentration',
    explanation: 'FGAs directly detect carbon monoxide levels in flue gases.',
  },
  {
    id: 'gasCombustionQ7',
    topic: 'gas-combustion-analysis',
    question: 'Which action is appropriate if combustion readings exceed safe limits?',
    options: ['Continue testing', 'Ignore it if flame is stable', 'Turn off the appliance', 'Replace the FGA battery'],
    correctAnswer: 'Turn off the appliance',
    explanation: 'Unsafe combustion means the appliance must be turned off and classified.',
  },
  {
    id: 'gasCombustionQ8',
    topic: 'gas-combustion-analysis',
    question: 'What is the main function of the boiler’s burner?',
    options: ['Filter gas', 'Ignite water', 'Produce combustion gases', 'Generate heat through combustion'],
    correctAnswer: 'Generate heat through combustion',
    explanation: 'The burner combusts gas to produce heat which is transferred via a heat exchanger.',
  },
  {
    id: 'gasCombustionQ9',
    topic: 'gas-combustion-analysis',
    question: 'Which flue gas reading indicates poor combustion?',
    options: ['High CO₂', 'Low CO', 'High O₂', 'High CO'],
    correctAnswer: 'High CO',
    explanation: 'High carbon monoxide indicates incomplete combustion.',
  },
  {
    id: 'gasCombustionQ10',
    topic: 'gas-combustion-analysis',
    question: 'If the CO/CO₂ ratio exceeds 0.008, the appliance is classified as:',
    options: ['Satisfactory', 'Not to current standards', 'At Risk', 'Immediately Dangerous'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Ratios above 0.008 typically require an ID classification under GIUSP.',
  },
  {
    id: 'gasCombustionQ11',
    topic: 'gas-combustion-analysis',
    question: 'The CO sensor in an FGA must be calibrated:',
    options: ['Every year', 'Every 5 years', 'Only at installation', 'Never'],
    correctAnswer: 'Every year',
    explanation: 'Manufacturers recommend annual calibration to ensure accuracy.',
  },
  {
    id: 'gasCombustionQ12',
    topic: 'gas-combustion-analysis',
    question: 'What does an unusually low O₂ reading suggest?',
    options: ['Combustion is perfect', 'Excess air supply', 'Incomplete combustion', 'Sensor fault'],
    correctAnswer: 'Incomplete combustion',
    explanation: 'Low O₂ may indicate excessive gas or poor combustion airflow.',
  },
  {
    id: 'gasCombustionQ13',
    topic: 'gas-combustion-analysis',
    question: 'Which two gases are used to calculate the CO/CO₂ ratio?',
    options: ['CO and CH₄', 'O₂ and H₂O', 'CO and CO₂', 'N₂ and CO₂'],
    correctAnswer: 'CO and CO₂',
    explanation: 'The ratio is calculated by dividing the CO level by the CO₂ level.',
  },
  {
    id: 'gasCombustionQ14',
    topic: 'gas-combustion-analysis',
    question: 'What is the result of a cracked heat exchanger during combustion?',
    options: ['High O₂', 'Stable flame', 'CO entering room air', 'Nothing unusual'],
    correctAnswer: 'CO entering room air',
    explanation: 'Damaged heat exchangers can leak combustion gases into living spaces.',
  },
  {
    id: 'gasCombustionQ15',
    topic: 'gas-combustion-analysis',
    question: 'What should you record during a combustion analysis test?',
    options: ['Customer’s address', 'O₂, CO₂, CO levels and ratio', 'Gas meter size', 'Pipe length'],
    correctAnswer: 'O₂, CO₂, CO levels and ratio',
    explanation: 'All combustion parameters should be recorded and compared to manufacturer specs.',
  },
  {
    id: 'gasCombustionQ16',
    topic: 'gas-combustion-analysis',
    question: 'Which part of the appliance is accessed to insert the FGA probe?',
    options: ['Condensate trap', 'Fan motor', 'Test point on flue adapter', 'Burner plate'],
    correctAnswer: 'Test point on flue adapter',
    explanation: 'Manufacturers provide a sealed test port for safe combustion testing.',
  },
  {
    id: 'gasCombustionQ17',
    topic: 'gas-combustion-analysis',
    question: 'How long should you allow the appliance to run before taking readings?',
    options: ['10 seconds', '30 seconds', '1 minute', 'Until readings stabilise'],
    correctAnswer: 'Until readings stabilise',
    explanation: 'Steady-state combustion is required for valid readings, usually after 1–2 minutes of full burner operation.',
  },
  {
    id: 'gasCombustionQ18',
    topic: 'gas-combustion-analysis',
    question: 'If the appliance cannot be adjusted and fails ratio limits, what should you do?',
    options: ['Leave it running', 'Classify as At Risk or ID', 'Call the manufacturer', 'Install a new flue'],
    correctAnswer: 'Classify as At Risk or ID',
    explanation: 'Failure without fix requires classification under GIUSP guidelines.',
  },
  {
    id: 'gasCombustionQ19',
    topic: 'gas-combustion-analysis',
    question: 'What is the effect of restricted airflow on combustion readings?',
    options: ['Lower CO₂', 'Higher O₂', 'Lower CO', 'Higher CO'],
    correctAnswer: 'Higher CO',
    explanation: 'Restricted airflow limits combustion oxygen, increasing CO production.',
  },
  {
    id: 'gasCombustionQ20',
    topic: 'gas-combustion-analysis',
    question: 'A proper CO/CO₂ ratio ensures:',
    options: ['Flame visibility', 'Gas savings', 'Safe and efficient combustion', 'High pressure'],
    correctAnswer: 'Safe and efficient combustion',
    explanation: 'Balanced ratios prevent CO hazards and maximise heat extraction.',
  },
  {
    id: 'gasCombustionQ21',
    topic: 'gas-combustion-analysis',
    question: 'Which gas should be lowest in a safe combustion process?',
    options: ['CO₂', 'O₂', 'N₂', 'CO'],
    correctAnswer: 'CO',
    explanation: 'Carbon monoxide should be near zero under good combustion conditions.',
  },
  {
    id: 'gasCombustionQ22',
    topic: 'gas-combustion-analysis',
    question: 'CO readings are typically shown in:',
    options: ['ppm', 'kPa', 'm³/h', 'bar'],
    correctAnswer: 'ppm',
    explanation: 'Carbon monoxide is measured in parts per million (ppm).',
  },
  {
    id: 'gasCombustionQ23',
    topic: 'gas-combustion-analysis',
    question: 'What can cause fluctuating combustion readings?',
    options: ['Unstable flame', 'Gas purity', 'Low mains water pressure', 'Electrical wiring'],
    correctAnswer: 'Unstable flame',
    explanation: 'Flame instability due to pressure or flow issues affects reading accuracy.',
  },
  {
    id: 'gasCombustionQ24',
    topic: 'gas-combustion-analysis',
    question: 'Why is excess air important in combustion?',
    options: ['Reduces NOx', 'Ensures enough O₂ is present', 'Prevents condensation', 'Speeds heating'],
    correctAnswer: 'Ensures enough O₂ is present',
    explanation: 'Excess air ensures complete combustion by supplying enough oxygen.',
  },
  {
    id: 'gasCombustionQ25',
    topic: 'gas-combustion-analysis',
    question: 'If the analyser reads zero CO, but the flame is yellow and lazy, what should you suspect?',
    options: ['Perfect combustion', 'FGA fault or sensor issue', 'High gas rate', 'Clogged condensate trap'],
    correctAnswer: 'FGA fault or sensor issue',
    explanation: 'Yellow flames indicate incomplete combustion — zero CO suggests analyser may be faulty.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-combustion-analysis');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasCombustionQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
