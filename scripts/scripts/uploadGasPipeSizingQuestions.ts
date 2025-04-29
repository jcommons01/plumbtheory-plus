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

const gasPipeSizingQuestions = [
  {
    id: 'gasPipeSizingQ1',
    topic: 'gas-pipe-sizing',
    question: 'What is the maximum allowable pressure drop across a domestic gas installation?',
    options: ['1 mbar', '2 mbar', '4 mbar', '8 mbar'],
    correctAnswer: '1 mbar',
    explanation: 'BS 6891 specifies a maximum pressure drop of 1 mbar from meter to appliance in domestic systems.',
  },
  {
    id: 'gasPipeSizingQ2',
    topic: 'gas-pipe-sizing',
    question: 'Which factors must be considered when sizing gas pipework?',
    options: ['Pipe length and diameter only', 'Number of bends, pipe length, material', 'Meter type only', 'Appliance flue type'],
    correctAnswer: 'Number of bends, pipe length, material',
    explanation: 'Pipe length, pipe material, number of bends, and total appliance demand must be considered.',
  },
  {
    id: 'gasPipeSizingQ3',
    topic: 'gas-pipe-sizing',
    question: 'Copper pipe internal diameter is based on:',
    options: ['External diameter', 'Nominal bore', 'Actual bore size', 'Wall thickness'],
    correctAnswer: 'Nominal bore',
    explanation: 'Copper piping is referred to by its nominal bore, not outside diameter.',
  },
  {
    id: 'gasPipeSizingQ4',
    topic: 'gas-pipe-sizing',
    question: 'An increase in pipe length will cause:',
    options: ['Reduced pressure loss', 'Increased pressure loss', 'No effect', 'Increased gas speed only'],
    correctAnswer: 'Increased pressure loss',
    explanation: 'Longer pipe runs cause higher frictional losses, resulting in more pressure drop.',
  },
  {
    id: 'gasPipeSizingQ5',
    topic: 'gas-pipe-sizing',
    question: 'Why is it important to minimize the number of fittings in a gas installation?',
    options: ['It looks better', 'To reduce pressure losses', 'To make installation quicker', 'To increase gas velocity'],
    correctAnswer: 'To reduce pressure losses',
    explanation: 'Each fitting causes turbulence and resistance, increasing pressure drop.',
  },
  {
    id: 'gasPipeSizingQ6',
    topic: 'gas-pipe-sizing',
    question: 'What happens to gas flow if pipe diameter is reduced but demand remains the same?',
    options: ['Flow rate increases', 'Pressure loss increases', 'No effect', 'Appliance efficiency improves'],
    correctAnswer: 'Pressure loss increases',
    explanation: 'Smaller pipes carrying the same flow cause higher frictional pressure losses.',
  },
  {
    id: 'gasPipeSizingQ7',
    topic: 'gas-pipe-sizing',
    question: 'Which material typically offers less resistance: copper or steel?',
    options: ['Steel', 'Copper', 'Same resistance', 'Depends on gas type'],
    correctAnswer: 'Copper',
    explanation: 'Copper pipes are smoother internally and offer less resistance compared to steel.',
  },
  {
    id: 'gasPipeSizingQ8',
    topic: 'gas-pipe-sizing',
    question: 'How is the total equivalent pipe length calculated?',
    options: ['Add actual lengths only', 'Add fitting allowances to actual lengths', 'Multiply by pipe diameter', 'Ignore fittings'],
    correctAnswer: 'Add fitting allowances to actual lengths',
    explanation: 'Each bend and fitting is assigned an equivalent length which is added to the total pipe run.',
  },
  {
    id: 'gasPipeSizingQ9',
    topic: 'gas-pipe-sizing',
    question: 'For natural gas installations, what is the typical design operating pressure?',
    options: ['17 mbar', '21 mbar', '23 mbar', '28 mbar'],
    correctAnswer: '21 mbar',
    explanation: 'Domestic natural gas installations are designed to operate at 21 mbar downstream of the meter.',
  },
  {
    id: 'gasPipeSizingQ10',
    topic: 'gas-pipe-sizing',
    question: 'Which table is used when calculating copper pipe sizes in domestic gas installations?',
    options: ['Manufacturer’s table', 'BS 6891 sizing tables', 'Water regulations sizing charts', 'GSIUR tables'],
    correctAnswer: 'BS 6891 sizing tables',
    explanation: 'BS 6891 provides standard pipe sizing tables for domestic installations.',
  },
  {
    id: 'gasPipeSizingQ11',
    topic: 'gas-pipe-sizing',
    question: 'What unit is used to express gas volume flow rate?',
    options: ['Litres per minute', 'Meters cubed per hour (m³/h)', 'Watts', 'Millibar'],
    correctAnswer: 'Meters cubed per hour (m³/h)',
    explanation: 'Gas volume flow rate is typically measured in cubic meters per hour (m³/h).',
  },
  {
    id: 'gasPipeSizingQ12',
    topic: 'gas-pipe-sizing',
    question: 'When sizing pipes, which type of fittings create greater pressure drops?',
    options: ['Bends', 'Tee branches', 'Straight couplings', 'Unions'],
    correctAnswer: 'Tee branches',
    explanation: 'Branch tees create larger turbulence and pressure losses compared to straight connectors.',
  },
  {
    id: 'gasPipeSizingQ13',
    topic: 'gas-pipe-sizing',
    question: 'If two appliances are connected to the same gas supply pipe, how is pipe sizing calculated?',
    options: ['Use the larger appliance only', 'Add both appliance demands', 'Ignore the smaller appliance', 'Reduce pipe diameter'],
    correctAnswer: 'Add both appliance demands',
    explanation: 'Combined demand must be considered when multiple appliances are supplied from the same pipe.',
  },
  {
    id: 'gasPipeSizingQ14',
    topic: 'gas-pipe-sizing',
    question: 'Which section of pipework usually experiences the highest gas flow rate?',
    options: ['Near the meter', 'At the appliance', 'At the appliance isolation valve', 'After the ECV'],
    correctAnswer: 'Near the meter',
    explanation: 'The section closest to the meter supplies all appliances, so it carries the maximum flow.',
  },
  {
    id: 'gasPipeSizingQ15',
    topic: 'gas-pipe-sizing',
    question: 'Which appliance type generally has the highest gas rate?',
    options: ['Gas hob', 'Condensing boiler', 'Decorative fire', 'Wall heater'],
    correctAnswer: 'Condensing boiler',
    explanation: 'Modern condensing boilers have high gas demands compared to other domestic appliances.',
  },
  {
    id: 'gasPipeSizingQ16',
    topic: 'gas-pipe-sizing',
    question: 'What should be the primary goal when sizing a domestic gas pipe system?',
    options: ['Achieve minimal installation cost', 'Ensure pressure drop does not exceed 1 mbar', 'Minimize pipe length', 'Use smallest diameter pipe'],
    correctAnswer: 'Ensure pressure drop does not exceed 1 mbar',
    explanation: 'Maintaining a pressure drop within the 1 mbar limit is essential for safe appliance operation.',
  },
  {
    id: 'gasPipeSizingQ17',
    topic: 'gas-pipe-sizing',
    question: 'If a long run exceeds pressure drop limits, what should be done?',
    options: ['Use smaller pipe', 'Use larger diameter pipe', 'Increase appliance pressure', 'Install booster fan'],
    correctAnswer: 'Use larger diameter pipe',
    explanation: 'Increasing pipe diameter reduces resistance and minimizes pressure drop.',
  },
  {
    id: 'gasPipeSizingQ18',
    topic: 'gas-pipe-sizing',
    question: 'An undersized gas pipe may cause which problem?',
    options: ['Excessive gas consumption', 'Incomplete combustion', 'Higher appliance efficiency', 'Improved flue performance'],
    correctAnswer: 'Incomplete combustion',
    explanation: 'Low gas pressures can cause incomplete combustion and dangerous carbon monoxide production.',
  },
  {
    id: 'gasPipeSizingQ19',
    topic: 'gas-pipe-sizing',
    question: 'Pressure drop across a fitting is:',
    options: ['Always zero', 'Ignored in domestic installations', 'Added to total pipework losses', 'Only important in commercial work'],
    correctAnswer: 'Added to total pipework losses',
    explanation: 'Fittings cause friction and contribute to total installation pressure drop.',
  },
  {
    id: 'gasPipeSizingQ20',
    topic: 'gas-pipe-sizing',
    question: 'What is typically used to measure pipe lengths during gas installation planning?',
    options: ['Laser level', 'Measuring wheel', 'Tape measure', 'Flow meter'],
    correctAnswer: 'Tape measure',
    explanation: 'Tape measures are commonly used to measure actual pipe runs for sizing calculations.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-pipe-sizing');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasPipeSizingQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
