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
    id: 'hvac-l2-hs-q1',
    question: 'What is the main purpose of a risk assessment?',
    options: ['Identify hazards and control them', 'Assign workers to jobs', 'Estimate project cost', 'List equipment used'],
    correctAnswer: 'Identify hazards and control them',
    explanation: 'Risk assessments help identify potential dangers and define suitable control measures to reduce harm.'
  },
  {
    id: 'hvac-l2-hs-q2',
    question: 'Which regulation covers hazardous substances in HVAC work?',
    options: ['RIDDOR', 'COSHH', 'LOLER', 'PUWER'],
    correctAnswer: 'COSHH',
    explanation: 'The Control of Substances Hazardous to Health (COSHH) regulations ensure safe handling of harmful materials.'
  },
  {
    id: 'hvac-l2-hs-q3',
    question: 'What is required before working on live electrical parts?',
    options: ['Use of gloves only', 'Verbal permission', 'Isolate and prove dead', 'Work in daylight hours'],
    correctAnswer: 'Isolate and prove dead',
    explanation: 'Electrical safety laws require isolating the circuit and confirming it is dead using approved test equipment.'
  },
  {
    id: 'hvac-l2-hs-q4',
    question: 'What is the maximum safe weight for a man to lift at waist height?',
    options: ['10kg', '15kg', '20kg', '25kg'],
    correctAnswer: '20kg',
    explanation: 'The HSE recommends a maximum lift of 20kg at waist height under ideal conditions.'
  },
  {
    id: 'hvac-l2-hs-q5',
    question: 'What should be done if asbestos is suspected during HVAC work?',
    options: ['Cover with tape', 'Ignore it', 'Report and stop work', 'Continue with gloves on'],
    correctAnswer: 'Report and stop work',
    explanation: 'Work must stop immediately, and a licensed asbestos contractor should be contacted.'
  },
  {
    id: 'hvac-l2-hs-q6',
    question: 'What does the blue colour indicate on UK pipework?',
    options: ['Steam', 'Gas', 'Water', 'Oil'],
    correctAnswer: 'Water',
    explanation: 'According to BS 1710, blue indicates water systems such as potable or chilled water.'
  },
  {
    id: 'hvac-l2-hs-q7',
    question: 'What is the purpose of a Hot Work Permit?',
    options: ['Track attendance', 'Assign overtime', 'Allow high-risk tasks', 'Control access to roofs'],
    correctAnswer: 'Allow high-risk tasks',
    explanation: 'Hot Work Permits are used to authorise tasks that involve flames or sparks near combustibles.'
  },
  {
    id: 'hvac-l2-hs-q8',
    question: 'How should refrigerant cylinders be transported?',
    options: ['Laid flat in the van', 'Valve open', 'Secured upright', 'Without a label'],
    correctAnswer: 'Secured upright',
    explanation: 'Refrigerant cylinders must be upright and secured to prevent tipping or leaks during transit.'
  },
  {
    id: 'hvac-l2-hs-q9',
    question: 'What PPE is essential when handling refrigerants?',
    options: ['Hard hat', 'Goggles and gloves', 'Steel boots only', 'Hi-vis vest'],
    correctAnswer: 'Goggles and gloves',
    explanation: 'Refrigerants can cause frostbite or eye damage, so gloves and goggles are required.'
  },
  {
    id: 'hvac-l2-hs-q10',
    question: 'Which regulation covers work at height in the UK?',
    options: ['PUWER', 'LOLER', 'WAHR', 'RIDDOR'],
    correctAnswer: 'WAHR',
    explanation: 'The Work at Height Regulations (WAHR) ensure safety when working above ground level.'
  },
  {
    id: 'hvac-l2-hs-q11',
    question: 'What does RIDDOR require?',
    options: ['Check fire exits', 'Report serious accidents', 'Use fire wardens', 'Train all staff in first aid'],
    correctAnswer: 'Report serious accidents',
    explanation: 'RIDDOR requires that dangerous incidents and injuries are reported to the HSE.'
  },
  {
    id: 'hvac-l2-hs-q12',
    question: 'How often must PAT testing be carried out by law?',
    options: ['Every year', 'Every 6 months', 'As required by risk', 'Monthly'],
    correctAnswer: 'As required by risk',
    explanation: 'There is no fixed rule; the testing frequency should match the equipment’s risk level and usage.'
  },
  {
    id: 'hvac-l2-hs-q13',
    question: 'What class of extinguisher is used on electrical fires?',
    options: ['Class A', 'Class B', 'CO₂ type', 'Class D'],
    correctAnswer: 'CO₂ type',
    explanation: 'CO₂ extinguishers are safe for use on electrical fires and do not leave residue.'
  },
  {
    id: 'hvac-l2-hs-q14',
    question: 'What is the correct lifting technique?',
    options: ['Back bent', 'Knees straight', 'Twist and pull', 'Back straight and knees bent'],
    correctAnswer: 'Back straight and knees bent',
    explanation: 'Lifting with a straight back and bent knees reduces the risk of spinal injury.'
  },
  {
    id: 'hvac-l2-hs-q15',
    question: 'What should be included in a Method Statement?',
    options: ['Site postcode', 'Step-by-step safety plan', 'Tool price list', 'Weather forecast'],
    correctAnswer: 'Step-by-step safety plan',
    explanation: 'Method Statements outline how work will be done safely, including the order and controls.'
  },
  {
    id: 'hvac-l2-hs-q16',
    question: 'Which regulation covers safe equipment use?',
    options: ['PUWER', 'RIDDOR', 'COSHH', 'HASAWA'],
    correctAnswer: 'PUWER',
    explanation: 'The Provision and Use of Work Equipment Regulations (PUWER) ensure equipment is safe and used correctly.'
  },
  {
    id: 'hvac-l2-hs-q17',
    question: 'Why is confined space work hazardous?',
    options: ['Dust levels', 'Noise echo', 'Low oxygen', 'Dim lighting'],
    correctAnswer: 'Low oxygen',
    explanation: 'Confined spaces can lack oxygen, posing a serious risk of unconsciousness or suffocation.'
  },
  {
    id: 'hvac-l2-hs-q18',
    question: 'What does the Health and Safety Law poster show?',
    options: ['Staff birthdays', 'Fire drill dates', 'Worker rights', 'Insurance number'],
    correctAnswer: 'Worker rights',
    explanation: 'It outlines key health and safety duties and rights for employees under UK law.'
  },
  {
    id: 'hvac-l2-hs-q19',
    question: 'Who can legally work on gas appliances in the UK?',
    options: ['Any HVAC engineer', 'Electricians', 'Only Gas Safe registered', 'Managers'],
    correctAnswer: 'Only Gas Safe registered',
    explanation: 'Gas engineers must be listed on the Gas Safe Register to work legally and safely.'
  },
  {
    id: 'hvac-l2-hs-q20',
    question: 'What sign indicates a hazardous chemical?',
    options: ['Green tick', 'Red arrow', 'Hazard pictogram', 'Traffic cone'],
    correctAnswer: 'Hazard pictogram',
    explanation: 'Chemical hazards must be marked with clear symbols under UK safety sign standards.'
  },
  {
    id: 'hvac-l2-hs-q21',
    question: 'What must be worn when brazing pipework?',
    options: ['Wool jumper', 'Dust mask', 'Fume-rated respirator', 'Ear plugs only'],
    correctAnswer: 'Fume-rated respirator',
    explanation: 'Brazing produces metal fumes that require proper filtered respiratory protection.'
  },
  {
    id: 'hvac-l2-hs-q22',
    question: 'What should be done before using a ladder?',
    options: ['Paint it', 'Check for rust', 'Inspect and secure it', 'Kick the feet'],
    correctAnswer: 'Inspect and secure it',
    explanation: 'Ladders must be stable and inspected before use to prevent falls.'
  },
  {
    id: 'hvac-l2-hs-q23',
    question: 'Which refrigerant is now banned due to ozone harm?',
    options: ['R-32', 'R-410A', 'R-22', 'R-290'],
    correctAnswer: 'R-22',
    explanation: 'R-22 is banned due to its ozone-depleting effects and must be handled by trained personnel.'
  },
  {
    id: 'hvac-l2-hs-q24',
    question: 'Why must ventilation be ensured when using refrigerants?',
    options: ['To reduce odour', 'To save gas', 'To prevent asphyxiation', 'To stop noise'],
    correctAnswer: 'To prevent asphyxiation',
    explanation: 'Refrigerants can displace oxygen in confined spaces, creating a suffocation hazard.'
  },
  {
    id: 'hvac-l2-hs-q25',
    question: 'What is the first action in an emergency evacuation?',
    options: ['Turn off lights', 'Find tools', 'Raise the alarm', 'Collect paperwork'],
    correctAnswer: 'Raise the alarm',
    explanation: 'Raising the alarm ensures others are aware and evacuation procedures can begin quickly.'
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-health-safety', 'items', q.id), {
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