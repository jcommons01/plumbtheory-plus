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

const gasUnsafeSituationsQuestions = [
  {
    id: 'gasUnsafeQ1',
    topic: 'gas-unsafe-situations',
    question: 'What does "ID" stand for in unsafe situations?',
    options: ['In Danger', 'Immediately Dangerous', 'Installers Decision', 'Indefinitely Dangerous'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'ID means an appliance or system poses an immediate danger to life or property.',
  },
  {
    id: 'gasUnsafeQ2',
    topic: 'gas-unsafe-situations',
    question: 'An "At Risk" (AR) situation is:',
    options: ['A minor issue with no action needed', 'A potential danger if faults develop', 'Always an emergency', 'Safe until further notice'],
    correctAnswer: 'A potential danger if faults develop',
    explanation: 'AR describes a fault that could become dangerous over time.',
  },
  {
    id: 'gasUnsafeQ3',
    topic: 'gas-unsafe-situations',
    question: 'If a tightness test reveals a pressure drop on a live installation, it is:',
    options: ['Immediately Dangerous', 'At Risk', 'Not to Current Standards', 'Normal'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Gas leaks are classified as Immediately Dangerous (ID).',
  },
  {
    id: 'gasUnsafeQ4',
    topic: 'gas-unsafe-situations',
    question: 'What must you do if an appliance is Immediately Dangerous (ID)?',
    options: ['Leave it running', 'Turn off gas and label appliance', 'Advise customer only', 'Ignore it'],
    correctAnswer: 'Turn off gas and label appliance',
    explanation: 'You must make safe, label, and complete paperwork when an ID is found.',
  },
  {
    id: 'gasUnsafeQ5',
    topic: 'gas-unsafe-situations',
    question: 'Which document must be issued after classifying an installation as ID?',
    options: ['Invoice', 'Warning Notice', 'Building Control Certificate', 'Installation Manual'],
    correctAnswer: 'Warning Notice',
    explanation: 'A Gas Industry Unsafe Situations Procedure (GIUSP) Warning Notice must be issued.',
  },
  {
    id: 'gasUnsafeQ6',
    topic: 'gas-unsafe-situations',
    question: 'An appliance with signs of spillage but still operating normally is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Service Due'],
    correctAnswer: 'At Risk',
    explanation: 'Signs of potential flue spillage are classified as At Risk (AR).',
  },
  {
    id: 'gasUnsafeQ7',
    topic: 'gas-unsafe-situations',
    question: 'If a customer refuses to allow you to make an ID situation safe, you should:',
    options: ['Leave and report', 'Advise and document refusal', 'Force entry', 'Shut off mains supply illegally'],
    correctAnswer: 'Advise and document refusal',
    explanation: 'You must explain the risks, document the refusal, and notify emergency services if necessary.',
  },
  {
    id: 'gasUnsafeQ8',
    topic: 'gas-unsafe-situations',
    question: 'A room-sealed boiler with a flue restricted by a wasp nest is classified as:',
    options: ['Immediately Dangerous', 'At Risk', 'Service Due', 'Notifiable Defect'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Flue blockage can cause CO buildup — it’s an ID situation.',
  },
  {
    id: 'gasUnsafeQ9',
    topic: 'gas-unsafe-situations',
    question: 'A missing burner seal on an open-flued appliance would be:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'No Issue'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Loss of burner sealing can allow flue gases to leak — classified as ID.',
  },
  {
    id: 'gasUnsafeQ10',
    topic: 'gas-unsafe-situations',
    question: 'A cooker installed without flame supervision in rented accommodation is:',
    options: ['Notifiable Defect', 'At Risk', 'Immediately Dangerous', 'Legal'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Cookers in rented properties must have flame supervision devices (FSD).',
  },
  {
    id: 'gasUnsafeQ11',
    topic: 'gas-unsafe-situations',
    question: 'Which of the following is NOT Immediately Dangerous?',
    options: ['Gas escape', 'Blocked flue', 'Tightness test failure', 'Slightly low working pressure'],
    correctAnswer: 'Slightly low working pressure',
    explanation: 'Low pressure may be a service issue but not automatically ID.',
  },
  {
    id: 'gasUnsafeQ12',
    topic: 'gas-unsafe-situations',
    question: 'An appliance with a faulty pressure relief valve discharging continuously is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Servicable'],
    correctAnswer: 'At Risk',
    explanation: 'Continuous discharge risks are classified as AR unless leading to immediate danger.',
  },
  {
    id: 'gasUnsafeQ13',
    topic: 'gas-unsafe-situations',
    question: 'An open-flued boiler installed in a bedroom is normally:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Perfectly acceptable'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Open-flued appliances should not be installed in sleeping rooms — ID.',
  },
  {
    id: 'gasUnsafeQ14',
    topic: 'gas-unsafe-situations',
    question: 'If an appliance cannot be isolated in an ID situation, you should:',
    options: ['Leave immediately', 'Notify Gas Emergency Service', 'Turn off water only', 'Shut down boiler'],
    correctAnswer: 'Notify Gas Emergency Service',
    explanation: '0800 111 999 must be called if unable to make the site safe yourself.',
  },
  {
    id: 'gasUnsafeQ15',
    topic: 'gas-unsafe-situations',
    question: 'A flueless appliance installed without required permanent ventilation is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Needs maintenance'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Flueless appliances without ventilation pose immediate danger — ID.',
  },
  {
    id: 'gasUnsafeQ16',
    topic: 'gas-unsafe-situations',
    question: 'What should you do after finding an At Risk installation?',
    options: ['Switch off gas immediately', 'Issue Warning Notice and advise customer', 'Replace appliance immediately', 'Call building control'],
    correctAnswer: 'Issue Warning Notice and advise customer',
    explanation: 'AR situations require advising the customer, not automatic disconnection.',
  },
  {
    id: 'gasUnsafeQ17',
    topic: 'gas-unsafe-situations',
    question: 'If CO is detected inside the property from a flue, the appliance is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Notifiable only'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'CO entering the home is an ID situation under GIUSP.',
  },
  {
    id: 'gasUnsafeQ18',
    topic: 'gas-unsafe-situations',
    question: 'Spillage from an open-flued appliance can be checked using:',
    options: ['Pressure gauge', 'CO alarm', 'Smoke match', 'Gas rate test'],
    correctAnswer: 'Smoke match',
    explanation: 'Smoke matches show whether flue gases spill back into the room.',
  },
  {
    id: 'gasUnsafeQ19',
    topic: 'gas-unsafe-situations',
    question: 'Which organization publishes the Unsafe Situations Procedure?',
    options: ['Gas Safe Register', 'HSE', 'WRAS', 'OFTEC'],
    correctAnswer: 'Gas Safe Register',
    explanation: 'Gas Safe provides guidance through GIUSP.',
  },
  {
    id: 'gasUnsafeQ20',
    topic: 'gas-unsafe-situations',
    question: 'Gas escapes indoors require:',
    options: ['Notification to customer only', 'Immediate emergency action', 'Annual servicing', 'Building regulation report'],
    correctAnswer: 'Immediate emergency action',
    explanation: 'Gas leaks indoors are an emergency.',
  },
  {
    id: 'gasUnsafeQ21',
    topic: 'gas-unsafe-situations',
    question: 'Poor flue pull detected on a test is normally:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Minor issue'],
    correctAnswer: 'At Risk',
    explanation: 'Poor flue pull is classified as At Risk unless it causes dangerous spillage, in which case it is Immediately Dangerous (ID).',
  },
  {
    id: 'gasUnsafeQ22',
    topic: 'gas-unsafe-situations',
    question: 'If a vent supplying combustion air is partially blocked, the installation is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Perfect'],
    correctAnswer: 'At Risk',
    explanation: 'Restricted air supply is an AR situation.',
  },
  {
    id: 'gasUnsafeQ23',
    topic: 'gas-unsafe-situations',
    question: 'Who should you contact if you find a dangerous meter installation?',
    options: ['Manufacturer', 'Installer', 'Gas Emergency Service Provider (ESP)', 'Local council'],
    correctAnswer: 'Gas Emergency Service Provider (ESP)',
    explanation: 'The ESP must be contacted immediately for unsafe meter work.',
  },
  {
    id: 'gasUnsafeQ24',
    topic: 'gas-unsafe-situations',
    question: 'If ventilation grilles are found to be blocked in a boiler room, the situation is:',
    options: ['Safe', 'At Risk', 'Immediately Dangerous', 'Only service due'],
    correctAnswer: 'At Risk',
    explanation: 'Vent blockage risks combustion but isn\'t automatically ID.',
  },
  {
    id: 'gasUnsafeQ25',
    topic: 'gas-unsafe-situations',
    question: 'The GIUSP is primarily designed to:',
    options: ['Make appliances more efficient', 'Protect engineers only', 'Protect lives and property', 'Assist advertising'],
    correctAnswer: 'Protect lives and property',
    explanation: 'The Gas Industry Unsafe Situations Procedure (GIUSP) aims to ensure public safety.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-unsafe-situations');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasUnsafeSituationsQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
