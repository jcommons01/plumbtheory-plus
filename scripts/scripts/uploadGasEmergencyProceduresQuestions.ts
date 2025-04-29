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

const gasEmergencyProceduresQuestions = [
  {
    id: 'gasEmergencyQ1',
    topic: 'gas-emergency-procedures',
    question: 'What is the first action if you smell gas inside a property?',
    options: ['Call a plumber', 'Turn on ventilation fans', 'Extinguish all flames and do not operate electrical switches', 'Switch on the heating'],
    correctAnswer: 'Extinguish all flames and do not operate electrical switches',
    explanation: 'Avoid anything that might ignite escaping gas, including operating electrical equipment.',
  },
  {
    id: 'gasEmergencyQ2',
    topic: 'gas-emergency-procedures',
    question: 'What number should be called to report a gas escape?',
    options: ['999', '112', '0800 111 999', '101'],
    correctAnswer: '0800 111 999',
    explanation: 'National Gas Emergency number is 0800 111 999.',
  },
  {
    id: 'gasEmergencyQ3',
    topic: 'gas-emergency-procedures',
    question: 'Where is the Emergency Control Valve (ECV) usually found?',
    options: ['Next to the boiler', 'At the gas meter', 'Outside the property', 'Near the fuse board'],
    correctAnswer: 'At the gas meter',
    explanation: 'The ECV is typically installed adjacent to the gas meter to isolate supply.',
  },
  {
    id: 'gasEmergencyQ4',
    topic: 'gas-emergency-procedures',
    question: 'If a CO alarm sounds, what is your first action?',
    options: ['Switch off CO alarm', 'Increase heating', 'Open windows and evacuate', 'Ignore it if feeling fine'],
    correctAnswer: 'Open windows and evacuate',
    explanation: 'Fresh air reduces CO buildup; leave immediately and seek professional help.',
  },
  {
    id: 'gasEmergencyQ5',
    topic: 'gas-emergency-procedures',
    question: 'Who is responsible for attending a gas escape call?',
    options: ['Plumber', 'Registered Gas Engineer', 'Gas Emergency Service Provider', 'Fire Brigade'],
    correctAnswer: 'Gas Emergency Service Provider',
    explanation: 'The Gas Emergency Service Provider will attend, make safe, and isolate supply if necessary.',
  },
  {
    id: 'gasEmergencyQ6',
    topic: 'gas-emergency-procedures',
    question: 'If you suspect a gas leak outside the property, you should:',
    options: ['Investigate yourself', 'Call the police', 'Call the Gas Emergency Service', 'Ignore it'],
    correctAnswer: 'Call the Gas Emergency Service',
    explanation: 'Outdoor gas escapes can still be hazardous and must be reported immediately.',
  },
  {
    id: 'gasEmergencyQ7',
    topic: 'gas-emergency-procedures',
    question: 'Which one is a sign of CO poisoning?',
    options: ['Dry cough', 'Headache and dizziness', 'Sore throat', 'Blocked nose'],
    correctAnswer: 'Headache and dizziness',
    explanation: 'CO poisoning symptoms include headache, dizziness, nausea, and confusion.',
  },
  {
    id: 'gasEmergencyQ8',
    topic: 'gas-emergency-procedures',
    question: 'If you find an Emergency Control Valve (ECV) seized and cannot turn it, you should:',
    options: ['Force it open', 'Ignore it', 'Evacuate and call the Gas Emergency Service', 'Spray lubricant'],
    correctAnswer: 'Evacuate and call the Gas Emergency Service',
    explanation: 'Never force a gas valve — seek emergency assistance.',
  },
  {
    id: 'gasEmergencyQ9',
    topic: 'gas-emergency-procedures',
    question: 'In case of fire due to gas leak, your priority is:',
    options: ['Extinguish fire yourself', 'Evacuate and call emergency services', 'Close internal doors', 'Open all windows'],
    correctAnswer: 'Evacuate and call emergency services',
    explanation: 'Always prioritize life safety — leave the building and call 999 immediately.',
  },
  {
    id: 'gasEmergencyQ10',
    topic: 'gas-emergency-procedures',
    question: 'Gas leaks can cause explosions because:',
    options: ['Gas reduces oxygen', 'Gas is flammable', 'Gas is toxic', 'Gas cools the room'],
    correctAnswer: 'Gas is flammable',
    explanation: 'Gas mixed with air can ignite explosively if a spark is present.',
  },
  {
    id: 'gasEmergencyQ11',
    topic: 'gas-emergency-procedures',
    question: 'What should you do with internal doors when evacuating due to gas leak?',
    options: ['Leave them open', 'Shut them if possible', 'Lock them', 'Take nothing and run'],
    correctAnswer: 'Shut them if possible',
    explanation: 'Closing doors helps contain gas buildup and reduces fire spread risk.',
  },
  {
    id: 'gasEmergencyQ12',
    topic: 'gas-emergency-procedures',
    question: 'When should you re-enter a building after reporting a gas escape?',
    options: ['After 30 minutes', 'Only when told safe by the emergency services', 'When you stop smelling gas', 'After ventilating for 5 minutes'],
    correctAnswer: 'Only when told safe by the emergency services',
    explanation: 'Never re-enter without formal clearance.',
  },
  {
    id: 'gasEmergencyQ13',
    topic: 'gas-emergency-procedures',
    question: 'Carbon monoxide is:',
    options: ['Visible', 'Coloured gas', 'Odourless and invisible', 'Smelly gas'],
    correctAnswer: 'Odourless and invisible',
    explanation: 'CO has no smell, taste, or colour — making it extremely dangerous.',
  },
  {
    id: 'gasEmergencyQ14',
    topic: 'gas-emergency-procedures',
    question: 'If you smell gas, you should NOT:',
    options: ['Turn off gas at ECV', 'Use a phone inside the building', 'Open windows and doors', 'Evacuate the building'],
    correctAnswer: 'Use a phone inside the building',
    explanation: 'Phones could create a spark, igniting gas.',
  },
  {
    id: 'gasEmergencyQ15',
    topic: 'gas-emergency-procedures',
    question: 'Which of these may indicate CO poisoning?',
    options: ['Bright lights', 'Rapid heart rate', 'Sudden stomach pain', 'Feeling sleepy'],
    correctAnswer: 'Feeling sleepy',
    explanation: 'CO poisoning symptoms often include fatigue and drowsiness.',
  },
  {
    id: 'gasEmergencyQ16',
    topic: 'gas-emergency-procedures',
    question: 'Why should you avoid switching lights on/off when gas is suspected?',
    options: ['To save electricity', 'It might trigger an explosion', 'Lights attract gas', 'Switches block ventilation'],
    correctAnswer: 'It might trigger an explosion',
    explanation: 'Electrical switching can cause sparks.',
  },
  {
    id: 'gasEmergencyQ17',
    topic: 'gas-emergency-procedures',
    question: 'If gas can be heard escaping, you should:',
    options: ['Attempt repairs', 'Evacuate and call emergency services', 'Spray water on it', 'Block the pipe temporarily'],
    correctAnswer: 'Evacuate and call emergency services',
    explanation: 'Audible gas escapes are extremely dangerous.',
  },
  {
    id: 'gasEmergencyQ18',
    topic: 'gas-emergency-procedures',
    question: 'The correct way to ventilate a building when gas is suspected is:',
    options: ['Use extractor fans', 'Open windows and doors manually', 'Run central heating', 'Switch on air conditioning'],
    correctAnswer: 'Open windows and doors manually',
    explanation: 'Manual ventilation reduces ignition risk.',
  },
  {
    id: 'gasEmergencyQ19',
    topic: 'gas-emergency-procedures',
    question: 'Which emergency services number should be dialled for fire and rescue?',
    options: ['0800 111 999', '101', '999', '112'],
    correctAnswer: '999',
    explanation: '999 is for Fire, Police, and Ambulance emergencies.',
  },
  {
    id: 'gasEmergencyQ20',
    topic: 'gas-emergency-procedures',
    question: 'Gas should be isolated at the ECV in what position?',
    options: ['Fully open', 'Half-closed', 'Fully closed', 'Tightened with a wrench'],
    correctAnswer: 'Fully closed',
    explanation: 'The valve must be fully closed to stop gas flow.',
  },
  {
    id: 'gasEmergencyQ21',
    topic: 'gas-emergency-procedures',
    question: 'After reporting a gas escape, what should the occupier NOT do?',
    options: ['Wait for engineers outside', 'Smoke cigarettes outside the building', 'Warn neighbours if appropriate', 'Follow advice given by Gas Emergency Service'],
    correctAnswer: 'Smoke cigarettes outside the building',
    explanation: 'Smoking can still ignite escaping gas.',
  },
  {
    id: 'gasEmergencyQ22',
    topic: 'gas-emergency-procedures',
    question: 'What does CO stand for?',
    options: ['Carbon Oxide', 'Carbonate', 'Carbon Monoxide', 'Calcium Oxide'],
    correctAnswer: 'Carbon Monoxide',
    explanation: 'CO is the chemical symbol for Carbon Monoxide.',
  },
  {
    id: 'gasEmergencyQ23',
    topic: 'gas-emergency-procedures',
    question: 'Why is CO called the "silent killer"?',
    options: ['It is colourful', 'It smells sweet', 'It is invisible and odourless', 'It causes no damage'],
    correctAnswer: 'It is invisible and odourless',
    explanation: 'Victims often don’t realise CO exposure until too late.',
  },
  {
    id: 'gasEmergencyQ24',
    topic: 'gas-emergency-procedures',
    question: 'When checking ventilation after a suspected leak, you should:',
    options: ['Check all permanent vents are unblocked', 'Seal all vents', 'Switch on fans', 'Only check upstairs rooms'],
    correctAnswer: 'Check all permanent vents are unblocked',
    explanation: 'Ventilation must be unobstructed to ensure gas dispersal.',
  },
  {
    id: 'gasEmergencyQ25',
    topic: 'gas-emergency-procedures',
    question: 'What is the safe procedure if there is gas but no smell?',
    options: ['Ignore it', 'Still treat it as an emergency', 'Check back after 1 hour', 'Boil water to disperse gas'],
    correctAnswer: 'Still treat it as an emergency',
    explanation: 'Odourless leaks (e.g., additive loss) still pose extreme danger.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-emergency-procedures');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasEmergencyProceduresQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
