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

const gasApplianceTypesQuestions = [
  {
    id: 'gasApplianceQ1',
    topic: 'gas-appliance-types',
    question: 'Which appliance heats both hot water and central heating on demand?',
    options: ['System boiler', 'Combination boiler', 'Back boiler', 'Open flue fire'],
    correctAnswer: 'Combination boiler',
    explanation: 'Combi boilers provide hot water and heating without a hot water cylinder.',
  },
  {
    id: 'gasApplianceQ2',
    topic: 'gas-appliance-types',
    question: 'Which of the following is flueless by design?',
    options: ['Gas hob', 'Open-flue boiler', 'Balanced flue boiler', 'Decorative gas fire'],
    correctAnswer: 'Gas hob',
    explanation: 'Gas hobs do not have or require a flue system — they rely on room ventilation.',
  },
  {
    id: 'gasApplianceQ3',
    topic: 'gas-appliance-types',
    question: 'A room-sealed appliance:',
    options: ['Draws combustion air from the room', 'Relies on natural draught', 'Is open flued', 'Takes air from outside'],
    correctAnswer: 'Takes air from outside',
    explanation: 'Room-sealed appliances are fully enclosed and draw combustion air externally.',
  },
  {
    id: 'gasApplianceQ4',
    topic: 'gas-appliance-types',
    question: 'Which appliance typically has the highest input rating in a domestic home?',
    options: ['Gas fire', 'Boiler', 'Hob', 'Water heater'],
    correctAnswer: 'Boiler',
    explanation: 'Boilers require the most energy input for both space and water heating.',
  },
  {
    id: 'gasApplianceQ5',
    topic: 'gas-appliance-types',
    question: 'A DFEF (Decorative Fuel Effect Fire) is usually:',
    options: ['Room sealed', 'Flueless', 'Open flue', 'Balanced flue'],
    correctAnswer: 'Open flue',
    explanation: 'Decorative gas fires are typically open-flued and require adequate ventilation.',
  },
  {
    id: 'gasApplianceQ6',
    topic: 'gas-appliance-types',
    question: 'Which appliance includes an integral fan to aid flueing?',
    options: ['Conventional flue boiler', 'Open flue cooker', 'Fan flue boiler', 'Gas hob'],
    correctAnswer: 'Fan flue boiler',
    explanation: 'Fan flue boilers use a motorised fan to assist flue gas removal.',
  },
  {
    id: 'gasApplianceQ7',
    topic: 'gas-appliance-types',
    question: 'What does the appliance classification "C" stand for (e.g. C1, C2)?',
    options: ['Flueless', 'Room sealed', 'Decorative fire', 'Open flue'],
    correctAnswer: 'Room sealed',
    explanation: 'Appliances in class C are room-sealed, with external air intake and flue outlet.',
  },
  {
    id: 'gasApplianceQ8',
    topic: 'gas-appliance-types',
    question: 'Which of these appliances is considered "flued"?',
    options: ['Gas hob', 'Portable gas heater', 'Wall-mounted boiler', 'Butane camping stove'],
    correctAnswer: 'Wall-mounted boiler',
    explanation: 'Boilers are flued appliances, removing combustion gases via a flue system.',
  },
  {
    id: 'gasApplianceQ9',
    topic: 'gas-appliance-types',
    question: 'What appliance classification is an open-flued appliance?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'B',
    explanation: 'Class B appliances are open-flued, using room air for combustion.',
  },
  {
    id: 'gasApplianceQ10',
    topic: 'gas-appliance-types',
    question: 'Which appliance requires a heat exchanger?',
    options: ['Gas fire', 'Gas hob', 'Boiler', 'CO alarm'],
    correctAnswer: 'Boiler',
    explanation: 'Boilers use a heat exchanger to transfer combustion heat into water.',
  },
  {
    id: 'gasApplianceQ11',
    topic: 'gas-appliance-types',
    question: 'A "back boiler" is typically installed:',
    options: ['Underfloor', 'Behind a gas fire', 'Inside a kitchen unit', 'In the loft'],
    correctAnswer: 'Behind a gas fire',
    explanation: 'Back boilers sit behind gas fires and heat water via convection.',
  },
  {
    id: 'gasApplianceQ12',
    topic: 'gas-appliance-types',
    question: 'Which appliance requires the most frequent servicing due to safety risks?',
    options: ['Gas hob', 'Room-sealed boiler', 'Decorative open-flued fire', 'Cooker'],
    correctAnswer: 'Decorative open-flued fire',
    explanation: 'Open-flued decorative fires are high risk and must be serviced regularly.',
  },
  {
    id: 'gasApplianceQ13',
    topic: 'gas-appliance-types',
    question: 'A flueless fire must only be installed:',
    options: ['Anywhere', 'In a bathroom', 'In a room with adequate permanent ventilation', 'Next to extractor fans'],
    correctAnswer: 'In a room with adequate permanent ventilation',
    explanation: 'Flueless appliances need high ventilation and room volume to operate safely.',
  },
  {
    id: 'gasApplianceQ14',
    topic: 'gas-appliance-types',
    question: 'Which appliance has the greatest reliance on adequate flue pull?',
    options: ['Fan flue boiler', 'Open flued boiler', 'Gas hob', 'Room sealed combi'],
    correctAnswer: 'Open flued boiler',
    explanation: 'Open flued appliances rely entirely on natural draught — no fan assistance.',
  },
  {
    id: 'gasApplianceQ15',
    topic: 'gas-appliance-types',
    question: 'Which appliance type is typically not permanently fixed to the home?',
    options: ['Hob', 'Gas cooker', 'Gas fire', 'Portable cabinet heater'],
    correctAnswer: 'Portable cabinet heater',
    explanation: 'Cabinet heaters are mobile and often use bottled gas with no flue.',
  },
  {
    id: 'gasApplianceQ16',
    topic: 'gas-appliance-types',
    question: 'Why is a gas water heater considered high-risk in confined spaces?',
    options: ['Uses propane', 'Has no flue', 'Can quickly cause CO buildup', 'Is electric-powered'],
    correctAnswer: 'Can quickly cause CO buildup',
    explanation: 'Small water heaters can emit CO if not properly flued or ventilated.',
  },
  {
    id: 'gasApplianceQ17',
    topic: 'gas-appliance-types',
    question: 'A “system boiler” differs from a combi boiler because it:',
    options: ['Has no flue', 'Requires a hot water cylinder', 'Heats air only', 'Has no pump'],
    correctAnswer: 'Requires a hot water cylinder',
    explanation: 'System boilers use stored hot water, unlike combis which heat on demand.',
  },
  {
    id: 'gasApplianceQ18',
    topic: 'gas-appliance-types',
    question: 'Which appliance does NOT typically produce a vapour plume?',
    options: ['Condensing boiler', 'Back boiler', 'Balanced flue combi', 'Gas hob'],
    correctAnswer: 'Gas hob',
    explanation: 'Hobs are flueless and do not expel combustion gases to the outside.',
  },
  {
    id: 'gasApplianceQ19',
    topic: 'gas-appliance-types',
    question: 'Which classification would you give a room-sealed, fan flued boiler?',
    options: ['A', 'B', 'C', 'F'],
    correctAnswer: 'C',
    explanation: 'Room-sealed appliances are classified under “C” — including fan-flued types.',
  },
  {
    id: 'gasApplianceQ20',
    topic: 'gas-appliance-types',
    question: 'Which appliance type can often be installed in a bedroom with correct ventilation?',
    options: ['Gas cooker', 'Flueless gas fire', 'Room-sealed boiler', 'Open flue boiler'],
    correctAnswer: 'Room-sealed boiler',
    explanation: 'Room-sealed appliances may be installed in bedrooms under certain conditions.',
  },
  {
    id: 'gasApplianceQ21',
    topic: 'gas-appliance-types',
    question: 'The efficiency rating of a condensing boiler is usually:',
    options: ['Below 70%', 'Around 75%', 'Over 90%', 'Exactly 100%'],
    correctAnswer: 'Over 90%',
    explanation: 'Condensing boilers are over 90% efficient due to heat recovery.',
  },
  {
    id: 'gasApplianceQ22',
    topic: 'gas-appliance-types',
    question: 'Which appliance often includes a thermocouple as a safety device?',
    options: ['Gas hob', 'Portable heater', 'Boiler', 'Open flue fire'],
    correctAnswer: 'Open flue fire',
    explanation: 'Open-flued appliances often use thermocouples to shut gas if flame fails.',
  },
  {
    id: 'gasApplianceQ23',
    topic: 'gas-appliance-types',
    question: 'Which appliance is most likely to cause CO issues if not installed properly?',
    options: ['Room-sealed combi', 'Gas hob', 'DFEF open fire', 'Balanced flue boiler'],
    correctAnswer: 'DFEF open fire',
    explanation: 'Open-flued decorative fires are particularly high-risk without proper flue and air supply.',
  },
  {
    id: 'gasApplianceQ24',
    topic: 'gas-appliance-types',
    question: 'Which appliance type can typically be installed without a chimney or external wall?',
    options: ['Fan flue boiler', 'Room-sealed boiler', 'Flueless fire', 'Open flue boiler'],
    correctAnswer: 'Flueless fire',
    explanation: 'Flueless appliances burn gas cleanly and vent into the room (with strict ventilation rules).',
  },
  {
    id: 'gasApplianceQ25',
    topic: 'gas-appliance-types',
    question: 'Which appliance has no flue and vents combustion gases into the room?',
    options: ['Room-sealed boiler', 'Flueless fire', 'Fan flue boiler', 'DFEF fire'],
    correctAnswer: 'Flueless fire',
    explanation: 'Flueless appliances require large room volumes and fixed ventilation to be used safely.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-appliance-types');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasApplianceTypesQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
