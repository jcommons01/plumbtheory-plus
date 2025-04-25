// ✅ FINAL: scripts/uploadLevel2ColdWater.ts — Full 25 Level 2 Cold Water Questions
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
    id: 'level2cold1',
    topic: 'level2-cold-water',
    question: 'What is the typical incoming mains pressure in a UK domestic cold water system?',
    options: ['1 bar', '3 bar', '5 bar', '8 bar'],
    correctAnswer: '3 bar',
    explanation: 'UK mains cold water pressure typically averages around 3 bar.'
  },
  {
    id: 'level2cold2',
    topic: 'level2-cold-water',
    question: 'What colour is used to identify cold water pipework?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Blue',
    explanation: 'Blue is the standard colour used to mark cold water pipes in the UK.'
  },
  {
    id: 'level2cold3',
    topic: 'level2-cold-water',
    question: 'What is the minimum internal diameter for a rising main in a domestic property?',
    options: ['15mm', '22mm', '28mm', '32mm'],
    correctAnswer: '15mm',
    explanation: '15mm is the minimum commonly accepted diameter for a rising main.'
  },
  {
    id: 'level2cold4',
    topic: 'level2-cold-water',
    question: 'Which type of valve prevents backflow in a cold water system?',
    options: ['Gate valve', 'Check valve', 'Ball valve', 'Drain valve'],
    correctAnswer: 'Check valve',
    explanation: 'A check valve allows water to flow in one direction, preventing backflow.'
  },
  {
    id: 'level2cold5',
    topic: 'level2-cold-water',
    question: 'What is the name of the tank commonly used in cold water storage systems?',
    options: ['Boiler tank', 'Header tank', 'Expansion tank', 'F&E tank'],
    correctAnswer: 'Header tank',
    explanation: 'A header tank stores cold water and is usually located in a loft space.'
  },
  {
    id: 'level2cold6',
    topic: 'level2-cold-water',
    question: 'What is the most suitable method of boosting cold water supply where mains is unreliable?',
    options: ['Break tank and booster set', 'Additional cistern', 'Tankless heater', 'Open vented cylinder'],
    correctAnswer: 'Break tank and booster set',
    explanation: 'This combination helps maintain consistent pressure when mains is weak.'
  },
  {
    id: 'level2cold7',
    topic: 'level2-cold-water',
    question: 'Which regulation governs the design and installation of domestic plumbing systems in the UK?',
    options: ['Gas Safety Regulations', 'Part G of Building Regs', 'Water Supply Regs', 'Part P'],
    correctAnswer: 'Part G of Building Regs',
    explanation: 'Part G covers hygiene, water efficiency, and hot/cold supply.'
  },
  {
    id: 'level2cold8',
    topic: 'level2-cold-water',
    question: 'Which of the following materials is not suitable for potable cold water?',
    options: ['MDPE', 'Lead', 'Copper', 'Polybutylene'],
    correctAnswer: 'Lead',
    explanation: 'Lead is no longer allowed for drinking water due to health risks.'
  },
  {
    id: 'level2cold9',
    topic: 'level2-cold-water',
    question: 'What is the function of a service valve?',
    options: ['Boost pressure', 'Stop flow locally', 'Prevent backflow', 'Allow venting'],
    correctAnswer: 'Stop flow locally',
    explanation: 'Service valves allow for local isolation of fixtures.'
  },
  {
    id: 'level2cold10',
    topic: 'level2-cold-water',
    question: 'What must be done when commissioning a new cold water system?',
    options: ['Disinfect and flush', 'Install expansion tank', 'Apply heat wrap', 'Test electrics'],
    correctAnswer: 'Disinfect and flush',
    explanation: 'Disinfection and flushing are legal requirements under water regs.'
  },
  {
    id: 'level2cold11',
    topic: 'level2-cold-water',
    question: 'What is the typical minimum burial depth for a cold water service pipe?',
    options: ['300mm', '500mm', '750mm', '1000mm'],
    correctAnswer: '750mm',
    explanation: 'To prevent freezing and physical damage, 750mm is standard.'
  },
  {
    id: 'level2cold12',
    topic: 'level2-cold-water',
    question: 'Which valve can prevent backflow in a hose union tap?',
    options: ['Gate valve', 'Ball valve', 'Double check valve', 'Float valve'],
    correctAnswer: 'Double check valve',
    explanation: 'These are legally required on external taps to prevent contamination.'
  },
  {
    id: 'level2cold13',
    topic: 'level2-cold-water',
    question: 'What is the danger of cold water pipework laid close to heat sources?',
    options: ['Noise', 'Pressure loss', 'Microbial growth', 'Bursting'],
    correctAnswer: 'Microbial growth',
    explanation: 'Warm temperatures can allow bacteria like Legionella to grow.'
  },
  {
    id: 'level2cold14',
    topic: 'level2-cold-water',
    question: 'What must be done before drilling near pipes?',
    options: ['Paint the area', 'Notify the council', 'Check for hidden services', 'Turn off water'],
    correctAnswer: 'Check for hidden services',
    explanation: 'You must avoid damaging hidden electrical or water systems.'
  },
  {
    id: 'level2cold15',
    topic: 'level2-cold-water',
    question: 'What is used to insulate external cold water pipework?',
    options: ['Felt', 'Mineral wool', 'Foam lagging', 'Bubble wrap'],
    correctAnswer: 'Foam lagging',
    explanation: 'Foam lagging is waterproof and helps prevent freezing.'
  },
  {
    id: 'level2cold16',
    topic: 'level2-cold-water',
    question: 'What is the maximum spacing for pipe clips on horizontal copper runs?',
    options: ['0.5m', '1.2m', '1.8m', '2.0m'],
    correctAnswer: '1.2m',
    explanation: '1.2 metres is the standard for horizontal copper pipes.'
  },
  {
    id: 'level2cold17',
    topic: 'level2-cold-water',
    question: 'What is a WRAS-approved fitting?',
    options: ['One approved for central heating', 'Approved for drinking water', 'Has a pressure rating', 'Always made of brass'],
    correctAnswer: 'Approved for drinking water',
    explanation: 'WRAS approval is required for fittings used with potable supplies.'
  },
  {
    id: 'level2cold18',
    topic: 'level2-cold-water',
    question: 'What does a Type AA air gap prevent?',
    options: ['Noise', 'Freezing', 'Backflow', 'Pressure loss'],
    correctAnswer: 'Backflow',
    explanation: 'Air gaps protect against backflow contamination.'
  },
  {
    id: 'level2cold19',
    topic: 'level2-cold-water',
    question: 'What is the purpose of sleeving pipework through a wall?',
    options: ['Labeling', 'Prevention of wear', 'Insulation', 'Aesthetics'],
    correctAnswer: 'Prevention of wear',
    explanation: 'Sleeving avoids damage where pipes pass through structures.'
  },
  {
    id: 'level2cold20',
    topic: 'level2-cold-water',
    question: 'What colour is used for identifying cold water pipes?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctAnswer: 'Blue',
    explanation: 'Blue denotes cold water pipework for identification.'
  },
  {
    id: 'level2cold21',
    topic: 'level2-cold-water',
    question: 'What is the recommended minimum separation of clips from a fitting?',
    options: ['20mm', '60mm', '100mm', '150mm'],
    correctAnswer: '60mm',
    explanation: 'Clips must be spaced a minimum of 60mm from any fitting.'
  },
  {
    id: 'level2cold22',
    topic: 'level2-cold-water',
    question: 'What is the typical size of overflow pipe used on a cold water cistern?',
    options: ['15mm', '21.5mm', '28mm', '32mm'],
    correctAnswer: '21.5mm',
    explanation: '21.5mm is the standard overflow pipe size in domestic setups.'
  },
  {
    id: 'level2cold23',
    topic: 'level2-cold-water',
    question: 'What is the purpose of a fly screen on overflow pipes?',
    options: ['Prevent overpressure', 'Block insects', 'Seal pipe ends', 'Block UV light'],
    correctAnswer: 'Block insects',
    explanation: 'Fly screens stop bugs from entering cisterns through the overflow.'
  },
  {
    id: 'level2cold24',
    topic: 'level2-cold-water',
    question: 'Why should cold pipes not run alongside hot pipes?',
    options: ['They will corrode', 'They look messy', 'To prevent heat transfer', 'They will crack'],
    correctAnswer: 'To prevent heat transfer',
    explanation: 'Heat from hot pipes can cause issues in cold pipe systems.'
  },
  {
    id: 'level2cold25',
    topic: 'level2-cold-water',
    question: 'Which regulation must be followed when using a private water source?',
    options: ['Part H', 'WRAS Guide', 'Private Water Supplies Regs', 'BS 6700'],
    correctAnswer: 'Private Water Supplies Regs',
    explanation: 'This ensures the water source is safe and regularly tested.'
  },
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-cold-water', 'items', q.id), {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      });
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

uploadQuestions();