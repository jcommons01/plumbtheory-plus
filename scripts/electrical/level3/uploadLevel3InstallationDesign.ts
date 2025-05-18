// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3InstallationDesign.ts

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
    id: 'installationdesign01',
    question: 'Which factor primarily determines the rating of a protective device?',
    options: ['Cable type', 'Design current', 'Number of circuits', 'Voltage drop'],
    correctAnswer: 'Design current',
    explanation: 'Protective devices are chosen based on the design current to ensure effective protection against overload.'
  },
  {
    id: 'installationdesign02',
    question: 'What is the typical maximum voltage drop for lighting circuits in the UK?',
    options: ['5%', '3%', '1%', '7%'],
    correctAnswer: '3%',
    explanation: 'Lighting circuits should not exceed 3% voltage drop to ensure proper performance and compliance.'
  },
  {
    id: 'installationdesign03',
    question: 'What is the correct formula for power in a three-phase balanced system?',
    options: ['P = V × I', 'P = I²R', 'P = √3 × V × I × cos φ', 'P = V × I × sin φ'],
    correctAnswer: 'P = √3 × V × I × cos φ',
    explanation: 'This is the standard formula used to calculate total power in three-phase systems with a power factor.'
  },
  {
    id: 'installationdesign04',
    question: 'Which regulation relates to overload protection requirements?',
    options: ['Reg 132.5.1', 'Reg 433.1.1', 'Reg 544.1.1', 'Reg 411.3.1.2'],
    correctAnswer: 'Reg 433.1.1',
    explanation: 'Reg 433.1.1 in BS 7671 addresses the need for overload protection of circuits.'
  },
  {
    id: 'installationdesign05',
    question: 'Why are correction factors applied in cable calculations?',
    options: ['To allow for voltage fluctuations', 'To adjust for environment', 'To account for earthing', 'To lower diversity'],
    correctAnswer: 'To adjust for environment',
    explanation: 'Correction factors like Ca and Cg account for temperature, grouping, and other conditions affecting cables.'
  },
  {
    id: 'installationdesign06',
    question: 'What does a power factor of 0.85 suggest?',
    options: ['Low efficiency', 'High current draw', 'Balanced loads', 'Weak earth fault path'],
    correctAnswer: 'High current draw',
    explanation: 'A power factor below 1 means more current is needed for the same power output, reducing efficiency.'
  },
  {
    id: 'installationdesign07',
    question: 'Which system requires particular care with earth loop impedance and voltage drop?',
    options: ['Domestic', 'Industrial', 'TT', 'Long rural'],
    correctAnswer: 'Long rural',
    explanation: 'Long cable runs increase resistance, impacting both voltage drop and Zs values.'
  },
  {
    id: 'installationdesign08',
    question: 'What is the role of diversity in design calculations?',
    options: ['Improve Zs', 'Reduce costs', 'Account for load variety', 'Prevent faults'],
    correctAnswer: 'Account for load variety',
    explanation: 'Diversity accounts for the fact that not all connected loads will operate simultaneously.'
  },
  {
    id: 'installationdesign09',
    question: 'Which device is used for automatic disconnection during an earth fault?',
    options: ['SPD', 'RCD', 'MCB', 'Switch fuse'],
    correctAnswer: 'RCD',
    explanation: 'RCDs detect imbalance between live and neutral, disconnecting quickly in case of leakage.'
  },
  {
    id: 'installationdesign10',
    question: 'What does IP65 mean in electrical design?',
    options: ['Protected against dust and jets', 'Protected against immersion', 'Indoor use only', 'Low voltage only'],
    correctAnswer: 'Protected against dust and jets',
    explanation: 'IP65 means the product is dust-tight and resistant to water jets, suitable for outdoor use.'
  },
  {
    id: 'installationdesign11',
    question: 'Which document outlines UK energy efficiency guidance for installations?',
    options: ['BS 5839', 'Part L', 'BS 7671 Section 8', 'Part P'],
    correctAnswer: 'BS 7671 Section 8',
    explanation: 'Section 8 of BS 7671 provides energy efficiency guidance for electrical system design.'
  },
  {
    id: 'installationdesign12',
    question: 'What must be included when allowing for future electrical loads?',
    options: ['Larger fuses', 'Spare capacity', 'Double RCDs', 'Extra bonding'],
    correctAnswer: 'Spare capacity',
    explanation: 'Spare capacity in panels or cables helps support load increases without major changes.'
  },
  {
    id: 'installationdesign13',
    question: 'What is the standard utilisation factor for socket circuits?',
    options: ['0.6', '1.0', '0.5', '0.3'],
    correctAnswer: '1.0',
    explanation: 'Sockets are assumed to be fully utilised, so a factor of 1.0 is generally used.'
  },
  {
    id: 'installationdesign14',
    question: 'What does a balanced three-phase load achieve?',
    options: ['Lower cable cost', 'Equal phase current', 'No fault current', 'Lower Zs'],
    correctAnswer: 'Equal phase current',
    explanation: 'Balanced loads ensure all phases carry equal current, improving stability and reducing losses.'
  },
  {
    id: 'installationdesign15',
    question: 'What is typically checked using the Zs test?',
    options: ['Voltage drop', 'RCD function', 'Earth loop path', 'Load balancing'],
    correctAnswer: 'Earth loop path',
    explanation: 'Zs verifies the total earth loop impedance to ensure disconnection times are met.'
  },
  {
    id: 'installationdesign16',
    question: 'Which code classifies protection against water ingress?',
    options: ['PD', 'AD', 'IP', 'SP'],
    correctAnswer: 'IP',
    explanation: 'IP codes classify the level of protection against dust and moisture for enclosures.'
  },
  {
    id: 'installationdesign17',
    question: 'What does Reg 314.1 in BS 7671 relate to?',
    options: ['Voltage drop', 'Circuit design', 'Isolation methods', 'Arrangement and division'],
    correctAnswer: 'Arrangement and division',
    explanation: 'Regulation 314.1 ensures circuits are arranged to reduce inconvenience and improve safety.'
  },
  {
    id: 'installationdesign18',
    question: 'Which factor most affects voltage drop on a circuit?',
    options: ['Cable resistance', 'Breaker rating', 'Cable colour', 'RCD type'],
    correctAnswer: 'Cable resistance',
    explanation: 'Longer runs increase resistance, which directly increases the voltage drop.'
  },
  {
    id: 'installationdesign19',
    question: 'When is an SPD required under BS 7671?',
    options: ['In all TT systems', 'Where risk is high', 'When bonding is weak', 'On lighting circuits only'],
    correctAnswer: 'Where risk is high',
    explanation: 'SPDs must be fitted where failure of sensitive equipment could affect life or public services.'
  },
  {
    id: 'installationdesign20',
    question: 'Which unit represents power factor?',
    options: ['cos φ', 'R1+R2', 'Zs', 'kWh'],
    correctAnswer: 'cos φ',
    explanation: 'Power factor is the cosine of the phase angle between voltage and current.'
  },
  {
    id: 'installationdesign21',
    question: 'What is the benefit of separating safety circuits?',
    options: ['Improves power factor', 'Prevents EMC issues', 'Lowers R1+R2', 'Increases capacity'],
    correctAnswer: 'Prevents EMC issues',
    explanation: 'Segregating safety circuits reduces the chance of electromagnetic interference.'
  },
  {
    id: 'installationdesign22',
    question: 'What is considered when choosing protective devices?',
    options: ['RCD speed', 'Circuit type', 'Design current', 'Enclosure colour'],
    correctAnswer: 'Design current',
    explanation: 'Protective devices must be suitable for the current expected under normal operation.'
  },
  {
    id: 'installationdesign23',
    question: 'What is the typical diversity factor applied to general lighting?',
    options: ['0.9', '0.7', '1.0', '0.6'],
    correctAnswer: '0.7',
    explanation: 'Lighting loads are generally not fully used at once, so 0.7 is commonly applied.'
  },
  {
    id: 'installationdesign24',
    question: 'How is maximum demand calculated for small installations?',
    options: ['Sum of fuse ratings', 'Ib × diversity', 'Main fuse × 0.5', 'Load divided by 2'],
    correctAnswer: 'Ib × diversity',
    explanation: 'This method estimates the true expected load based on usage patterns.'
  },
  {
    id: 'installationdesign25',
    question: 'Which regulation requires designers to assess external conditions?',
    options: ['Reg 132.5.1', 'Reg 411.1', 'Reg 434.5', 'Reg 522.6'],
    correctAnswer: 'Reg 132.5.1',
    explanation: 'This regulation ensures environmental factors are considered when selecting materials and methods.'
  },
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-installation-design', 'items', q.id), {
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
