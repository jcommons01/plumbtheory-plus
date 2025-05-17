// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3FGas.ts

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

// ✅ HVAC Level 3 F-Gas Questions (25 total)
const questions = [
  {
    id: 'hvac-l3-f-gas1',
    question: 'What does the UK F-Gas Regulation aim to reduce over time?',
    options: ['Import costs', 'CO₂ emissions', 'Water usage', 'Noise pollution'],
    correctAnswer: 'CO₂ emissions',
    explanation: 'The F-Gas Regulation is designed to reduce emissions of fluorinated gases, which are powerful greenhouse gases with high global warming potential.'
  },
  {
    id: 'hvac-l3-f-gas2',
    question: 'Which refrigerant is classified as a natural alternative to F-gases?',
    options: ['R-134a', 'R-410A', 'R-290', 'R-404A'],
    correctAnswer: 'R-290',
    explanation: 'R-290 (propane) is a hydrocarbon refrigerant that does not fall under the F-Gas Regulation, making it a natural alternative to high-GWP HFCs.'
  },
  {
    id: 'hvac-l3-f-gas3',
    question: 'What is the main UK certification body for F-Gas registration?',
    options: ['DEFRA', 'HSE', 'REFCOM', 'Gas Safe'],
    correctAnswer: 'REFCOM',
    explanation: 'REFCOM is an officially recognised certification body that manages company and technician registration for F-Gas compliance in the UK.'
  },
  {
    id: 'hvac-l3-f-gas4',
    question: 'Which gas is not subject to the F-Gas Regulations?',
    options: ['R-32', 'R-717', 'R-404A', 'R-134a'],
    correctAnswer: 'R-717',
    explanation: 'R-717 (ammonia) is a natural refrigerant and is not a fluorinated greenhouse gas, so it falls outside the scope of the F-Gas Regulations.'
  },
  {
    id: 'hvac-l3-f-gas5',
    question: 'What type of system must have leak checks every 3 months without a detector?',
    options: ['3kg R-32 split system', '50 tonnes CO₂e chiller', 'Domestic freezer', 'Portable air cooler'],
    correctAnswer: '50 tonnes CO₂e chiller',
    explanation: 'Systems above 50 tonnes CO₂e must be leak-checked quarterly unless fitted with a certified automatic leak detection system.'
  },
  {
    id: 'hvac-l3-f-gas6',
    question: 'What is the CO₂ equivalent of 10kg of R-410A (GWP 2088)?',
    options: ['5.2 tonnes', '10.4 tonnes', '20.9 tonnes', '30.8 tonnes'],
    correctAnswer: '20.9 tonnes',
    explanation: '10kg × 2088 = 20,880kg CO₂e, or 20.9 tonnes CO₂e. This figure determines regulatory obligations like leak checks.'
  },
  {
    id: 'hvac-l3-f-gas7',
    question: 'Which category allows recovery of refrigerant from small appliances only?',
    options: ['Category I', 'Category III', 'Category IV', 'Category II'],
    correctAnswer: 'Category III',
    explanation: 'Category III certification covers recovery from small equipment like domestic fridges but not installation or maintenance.'
  },
  {
    id: 'hvac-l3-f-gas8',
    question: 'What is the UK GWP limit for new single-split air conditioning under 3kg from 2025?',
    options: ['150', '750', '1000', '2500'],
    correctAnswer: '750',
    explanation: 'From 2025, single-split systems under 3kg must use refrigerants with a GWP under 750 to encourage low-emission alternatives.'
  },
  {
    id: 'hvac-l3-f-gas9',
    question: 'Which of these requires both company and individual F-Gas certification?',
    options: ['Service on ammonia systems', 'Installing R-32 air con units', 'Boiler repair work', 'Water leak detection'],
    correctAnswer: 'Installing R-32 air con units',
    explanation: 'Installing systems with F-Gas refrigerants like R-32 requires both certified personnel and a certified business.'
  },
  {
    id: 'hvac-l3-f-gas10',
    question: 'Which gas has a GWP of approximately 3922?',
    options: ['R-134a', 'R-404A', 'R-1234yf', 'R-290'],
    correctAnswer: 'R-404A',
    explanation: 'R-404A has a high GWP of about 3922 and is being phased down under F-Gas rules.'
  },
  {
    id: 'hvac-l3-f-gas11',
    question: 'Who enforces F-Gas compliance in England?',
    options: ['Health and Safety Executive', 'REFCOM', 'Environment Agency', 'Ofgem'],
    correctAnswer: 'Environment Agency',
    explanation: 'The Environment Agency is responsible for enforcement and ensuring compliance with UK F-Gas legislation.'
  },
  {
    id: 'hvac-l3-f-gas12',
    question: 'When must refrigerant recovery be carried out?',
    options: ['Only when systems are over 3kg', 'At every maintenance visit', 'Before disposal or major service', 'Only when pressure is low'],
    correctAnswer: 'Before disposal or major service',
    explanation: 'Refrigerant must be recovered during servicing that opens the circuit or when decommissioning equipment.'
  },
  {
    id: 'hvac-l3-f-gas13',
    question: 'Which document must be maintained for systems over 5 tonnes CO₂e?',
    options: ['Leak log sheet', 'F-Gas usage invoice', 'Warranty record', 'Service contract'],
    correctAnswer: 'Leak log sheet',
    explanation: 'Operators must keep detailed leak records for systems above 5 tonnes CO₂e, including checks and quantities added or removed.'
  },
  {
    id: 'hvac-l3-f-gas14',
    question: 'Which refrigerant is most suitable for use in a domestic heat pump post-2025?',
    options: ['R-410A', 'R-134a', 'R-32', 'R-404A'],
    correctAnswer: 'R-32',
    explanation: 'R-32 has a low GWP and meets future legal limits, making it a popular replacement in newer heat pumps and air conditioners.'
  },
  {
    id: 'hvac-l3-f-gas15',
    question: 'Why are non-refillable F-Gas cylinders banned?',
    options: ['They cost more', 'They are hard to store', 'They increase emissions risk', 'They are rarely used'],
    correctAnswer: 'They increase emissions risk',
    explanation: 'Disposable cylinders often retain residual gas that can escape after use, contributing to atmospheric pollution.'
  },
  {
    id: 'hvac-l3-f-gas16',
    question: 'What must be done after repairing a leak on a system over 5 tonnes CO₂e?',
    options: ['Nothing further', 'Add pressure', 'Check again within one month', 'Replace the gas'],
    correctAnswer: 'Check again within one month',
    explanation: 'A follow-up leak test must be carried out within 30 days of repair to confirm it has been resolved.'
  },
  {
    id: 'hvac-l3-f-gas17',
    question: 'Which system requires automatic detection by law?',
    options: ['10kg domestic unit', '500 tonnes CO₂e chiller', 'Split AC with 2kg', 'Mini chiller with R-32'],
    correctAnswer: '500 tonnes CO₂e chiller',
    explanation: 'Systems exceeding 500 tonnes CO₂e must be fitted with automatic leak detection under F-Gas regulations.'
  },
  {
    id: 'hvac-l3-f-gas18',
    question: 'What GWP limit applies to service bans for virgin gas after 2030?',
    options: ['1500', '750', '1000', '2500'],
    correctAnswer: '1500',
    explanation: 'From 2030, virgin refrigerants with GWP above 1500 cannot be used to service existing equipment.'
  },
  {
    id: 'hvac-l3-f-gas19',
    question: 'What is required before importing pre-charged HFC equipment?',
    options: ['An F-Gas logbook', 'A DEFRA licence', 'Quota compliance proof', 'REFCOM inspection'],
    correctAnswer: 'Quota compliance proof',
    explanation: 'Importers must show the HFC charge is covered under the UK’s HFC quota scheme.'
  },
  {
    id: 'hvac-l3-f-gas20',
    question: 'Which certification allows leak checks without opening the system?',
    options: ['Category I', 'Category IV', 'Category III', 'Category II'],
    correctAnswer: 'Category II',
    explanation: 'Category II covers leak checking without opening the refrigerant circuit, and work on systems under 3kg.'
  },
  {
    id: 'hvac-l3-f-gas21',
    question: 'What must be done with contaminated refrigerant that cannot be reused?',
    options: ['Store it on site', 'Flush it', 'Destroy at a licensed site', 'Sell to another firm'],
    correctAnswer: 'Destroy at a licensed site',
    explanation: 'Contaminated refrigerant that cannot be reclaimed must be safely destroyed by authorised waste facilities.'
  },
  {
    id: 'hvac-l3-f-gas22',
    question: 'What does GWP stand for?',
    options: ['Gas Working Pressure', 'Global Warning Policy', 'Greenhouse Warming Potential', 'Global Warming Potential'],
    correctAnswer: 'Global Warming Potential',
    explanation: 'GWP (Global Warming Potential) represents how much heat a gas traps in the atmosphere compared to CO₂.'
  },
  {
    id: 'hvac-l3-f-gas23',
    question: 'Which refrigerant has a GWP below 10?',
    options: ['R-404A', 'R-32', 'R-1234yf', 'R-134a'],
    correctAnswer: 'R-1234yf',
    explanation: 'R-1234yf has a very low GWP under 10, making it a future-proof option under tightening regulations.'
  },
  {
    id: 'hvac-l3-f-gas24',
    question: 'When must automatic leak detectors be tested?',
    options: ['Every 2 years', 'When the system trips', 'Every 12 months', 'When the refrigerant is changed'],
    correctAnswer: 'Every 12 months',
    explanation: 'Leak detection systems must be tested annually to confirm they function correctly and trigger alerts.'
  },
  {
    id: 'hvac-l3-f-gas25',
    question: 'Which of these is a legal duty of the equipment operator?',
    options: ['Choosing refrigerant type', 'Designing pipe layout', 'Ensuring leak checks', 'Charging cylinders'],
    correctAnswer: 'Ensuring leak checks',
    explanation: 'The operator is legally responsible for ensuring systems are leak checked at the required intervals.'
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-f-gas', 'items', q.id), {
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
