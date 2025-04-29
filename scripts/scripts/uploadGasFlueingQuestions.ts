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

const gasFlueingQuestions = [
  {
    id: 'gasFlueingQ1',
    topic: 'gas-flueing-requirements',
    question: 'What is the primary function of a flue in a gas appliance installation?',
    options: ['Provide combustion air', 'Circulate heat', 'Remove combustion products', 'Supply gas to the burner'],
    correctAnswer: 'Remove combustion products',
    explanation: 'Flues safely remove combustion gases like CO and CO₂ from the building.',
  },
  {
    id: 'gasFlueingQ2',
    topic: 'gas-flueing-requirements',
    question: 'Which regulation covers flueing safety for gas appliances in the UK?',
    options: ['WRAS', 'Part P', 'GSIUR', 'Gas Metering Code'],
    correctAnswer: 'GSIUR',
    explanation: 'The Gas Safety (Installation and Use) Regulations govern appliance and flue safety.',
  },
  {
    id: 'gasFlueingQ3',
    topic: 'gas-flueing-requirements',
    question: 'A flue should terminate a minimum of how far above a flat roof?',
    options: ['100mm', '300mm', '600mm', '1 metre'],
    correctAnswer: '600mm',
    explanation: 'According to Part J, balanced flue terminals must be at least 600mm above flat roofs.',
  },
  {
    id: 'gasFlueingQ4',
    topic: 'gas-flueing-requirements',
    question: 'What is the minimum distance from a flue terminal to a boundary line?',
    options: ['150mm', '300mm', '600mm', '1200mm'],
    correctAnswer: '600mm',
    explanation: 'Flues must be at least 600mm from boundaries to avoid nuisance and re-entry of gases.',
  },
  {
    id: 'gasFlueingQ5',
    topic: 'gas-flueing-requirements',
    question: 'Which type of flue draws combustion air and expels waste through concentric pipes?',
    options: ['Open flue', 'Room-sealed', 'Balanced flue', 'Fan-assisted open flue'],
    correctAnswer: 'Balanced flue',
    explanation: 'Balanced flues are room-sealed systems using concentric pipes for air in and flue out.',
  },
  {
    id: 'gasFlueingQ6',
    topic: 'gas-flueing-requirements',
    question: 'What is the typical minimum length of vertical flue pipe above a boiler before bends?',
    options: ['100mm', '300mm', '600mm', '1 metre'],
    correctAnswer: '300mm',
    explanation: 'A vertical rise of at least 300mm is typically required to aid natural draught.',
  },
  {
    id: 'gasFlueingQ7',
    topic: 'gas-flueing-requirements',
    question: 'Which flue system is considered "room-sealed"?',
    options: ['Open flue', 'Chimney flue', 'Balanced flue', 'None'],
    correctAnswer: 'Balanced flue',
    explanation: 'Room-sealed appliances draw combustion air and vent waste gases externally through a sealed flue.',
  },
  {
    id: 'gasFlueingQ8',
    topic: 'gas-flueing-requirements',
    question: 'What device is used to check for flue gas spillage?',
    options: ['Manometer', 'CO alarm', 'Smoke match', 'Pressure tester'],
    correctAnswer: 'Smoke match',
    explanation: 'A smoke match or smoke pellet is used to detect flue pull and spillage.',
  },
  {
    id: 'gasFlueingQ9',
    topic: 'gas-flueing-requirements',
    question: 'What should be done if a flue terminal is damaged or obstructed?',
    options: ['Leave it if gas is still flowing', 'Advise homeowner only', 'Immediately make safe and label', 'Use a smaller flue pipe'],
    correctAnswer: 'Immediately make safe and label',
    explanation: 'A blocked flue is dangerous — the system must be shut down and labeled unsafe.',
  },
  {
    id: 'gasFlueingQ10',
    topic: 'gas-flueing-requirements',
    question: 'A plume deflector is fitted to:',
    options: ['Increase boiler pressure', 'Reduce CO', 'Redirect flue gases safely', 'Strengthen the terminal'],
    correctAnswer: 'Redirect flue gases safely',
    explanation: 'Plume deflectors redirect flue products away from windows or boundaries.',
  },
  {
    id: 'gasFlueingQ11',
    topic: 'gas-flueing-requirements',
    question: 'Flue gases contain which dangerous substance?',
    options: ['Nitrogen', 'Ozone', 'Carbon monoxide', 'Helium'],
    correctAnswer: 'Carbon monoxide',
    explanation: 'Carbon monoxide (CO) is produced during incomplete combustion and is highly toxic.',
  },
  {
    id: 'gasFlueingQ12',
    topic: 'gas-flueing-requirements',
    question: 'What’s the minimum distance from a flue terminal to an opening window?',
    options: ['150mm', '300mm', '600mm', '1 metre'],
    correctAnswer: '300mm',
    explanation: 'Balanced flue terminals must be at least 300mm from opening windows or doors.',
  },
  {
    id: 'gasFlueingQ13',
    topic: 'gas-flueing-requirements',
    question: 'What is "spillage" in relation to flues?',
    options: ['Gas escaping from pipework', 'Water leaking from appliance', 'Combustion gases leaking into the room', 'Condensation from flue'],
    correctAnswer: 'Combustion gases leaking into the room',
    explanation: 'Spillage is the escape of combustion products back into the property.',
  },
  {
    id: 'gasFlueingQ14',
    topic: 'gas-flueing-requirements',
    question: 'What does an "open flue" rely on for operation?',
    options: ['Electric fan', 'Natural draught', 'Flue pump', 'Balanced chamber'],
    correctAnswer: 'Natural draught',
    explanation: 'Open flues work via natural air pressure and buoyancy to remove gases.',
  },
  {
    id: 'gasFlueingQ15',
    topic: 'gas-flueing-requirements',
    question: 'A fan flued boiler uses a fan to:',
    options: ['Control water flow', 'Draw combustion air', 'Expel combustion gases', 'Improve efficiency'],
    correctAnswer: 'Expel combustion gases',
    explanation: 'Fan flues force exhaust gases through the terminal rather than relying on natural draught.',
  },
  {
    id: 'gasFlueingQ16',
    topic: 'gas-flueing-requirements',
    question: 'If a flue is installed incorrectly, what classification does it fall under?',
    options: ['Not to current standards', 'At Risk or Immediately Dangerous', 'Service due soon', 'Report only'],
    correctAnswer: 'At Risk or Immediately Dangerous',
    explanation: 'Incorrect flue installation can lead to ID or AR classification under GIUSP.',
  },
  {
    id: 'gasFlueingQ17',
    topic: 'gas-flueing-requirements',
    question: 'A flue terminal should never be positioned:',
    options: ['Above a window', 'In a loft', 'At roof ridge', 'Under eaves without clearance'],
    correctAnswer: 'Under eaves without clearance',
    explanation: 'Terminals must have required clearance to prevent gas build-up under eaves.',
  },
  {
    id: 'gasFlueingQ18',
    topic: 'gas-flueing-requirements',
    question: 'Part J of the Building Regulations covers:',
    options: ['Electrical bonding', 'Water safety', 'Combustion appliances and flue systems', 'Roofing tiles'],
    correctAnswer: 'Combustion appliances and flue systems',
    explanation: 'Part J outlines safe installation of flues, chimneys, and combustion systems.',
  },
  {
    id: 'gasFlueingQ19',
    topic: 'gas-flueing-requirements',
    question: 'What must be done before reusing an existing flue?',
    options: ['Paint it', 'Flush it with water', 'Inspect for soundness and blockage', 'Use a smaller liner'],
    correctAnswer: 'Inspect for soundness and blockage',
    explanation: 'Flues must be checked for integrity and clear airflow before reuse.',
  },
  {
    id: 'gasFlueingQ20',
    topic: 'gas-flueing-requirements',
    question: 'Twin wall flue systems are used to:',
    options: ['Improve gas flow', 'Reduce gas usage', 'Enable safe external routing', 'Speed up heating'],
    correctAnswer: 'Enable safe external routing',
    explanation: 'Twin wall systems insulate flues for external or long runs.',
  },
  {
    id: 'gasFlueingQ21',
    topic: 'gas-flueing-requirements',
    question: 'Which method detects poor flue pull?',
    options: ['Pressure drop test', 'Flow rate test', 'Spillage test with smoke match', 'CO alarm test'],
    correctAnswer: 'Spillage test with smoke match',
    explanation: 'Smoke tests show whether flue gases are drawing correctly.',
  },
  {
    id: 'gasFlueingQ22',
    topic: 'gas-flueing-requirements',
    question: 'Minimum clearance from a flue to plastic guttering is:',
    options: ['75mm', '150mm', '300mm', '500mm'],
    correctAnswer: '75mm',
    explanation: 'Plastic materials must be protected from hot exhaust — minimum clearance is 75mm.',
  },
  {
    id: 'gasFlueingQ23',
    topic: 'gas-flueing-requirements',
    question: 'A flue terminal that discharges toward a neighbor’s boundary should be:',
    options: ['Painted red', 'Repositioned or deflected', 'Labelled', 'Covered with mesh'],
    correctAnswer: 'Repositioned or deflected',
    explanation: 'Terminals must not cause nuisance — repositioning or a plume deflector may be required.',
  },
  {
    id: 'gasFlueingQ24',
    topic: 'gas-flueing-requirements',
    question: 'Flues should terminate:',
    options: ['Inside the loft', 'Outside the building', 'In ceiling voids', 'In basements'],
    correctAnswer: 'Outside the building',
    explanation: 'Flue products must be expelled safely to atmosphere outside the building.',
  },
  {
    id: 'gasFlueingQ25',
    topic: 'gas-flueing-requirements',
    question: 'Condensing boilers may produce:',
    options: ['Dust', 'Vapour plume', 'Noise', 'Smell'],
    correctAnswer: 'Vapour plume',
    explanation: 'Condensing flues discharge water vapour, often visible as a plume.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-flueing-requirements');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasFlueingQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
