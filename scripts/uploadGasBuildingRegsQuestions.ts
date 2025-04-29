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

const gasBuildingRegsQuestions = [
  {
    id: 'gasBuildingRegsQ1',
    topic: 'gas-building-regulations',
    question: 'Which Building Regulation deals specifically with combustion appliances and flue systems?',
    options: ['Part A', 'Part B', 'Part J', 'Part L'],
    correctAnswer: 'Part J',
    explanation: 'Part J covers combustion appliances, flue systems, and ventilation.',
  },
  {
    id: 'gasBuildingRegsQ2',
    topic: 'gas-building-regulations',
    question: 'What is the minimum distance between a flue terminal and an opening window?',
    options: ['150mm', '300mm', '600mm', '1 metre'],
    correctAnswer: '300mm',
    explanation: 'Flue terminals must be at least 300mm from openings such as windows or doors.',
  },
  {
    id: 'gasBuildingRegsQ3',
    topic: 'gas-building-regulations',
    question: 'According to Part J, air for combustion must:',
    options: ['Be recirculated', 'Be filtered', 'Come from outside or a ventilated space', 'Be heated'],
    correctAnswer: 'Come from outside or a ventilated space',
    explanation: 'Part J requires adequate permanent air supply from a suitable location.',
  },
  {
    id: 'gasBuildingRegsQ4',
    topic: 'gas-building-regulations',
    question: 'What should be installed around a flue where it passes through a wall?',
    options: ['Duct tape', 'Firestop collar or sleeve', 'Plastic bracket', 'Expanding foam only'],
    correctAnswer: 'Firestop collar or sleeve',
    explanation: 'Part J requires fire protection where flues penetrate walls or floors.',
  },
  {
    id: 'gasBuildingRegsQ5',
    topic: 'gas-building-regulations',
    question: 'A flue terminal must not discharge into:',
    options: ['An open carport', 'A passageway with restricted air movement', 'An open balcony', 'A vented attic'],
    correctAnswer: 'A passageway with restricted air movement',
    explanation: 'Part J prohibits flue discharge into enclosed or restricted spaces.',
  },
  {
    id: 'gasBuildingRegsQ6',
    topic: 'gas-building-regulations',
    question: 'If a boiler is installed in a compartment, Part J requires:',
    options: ['The door be kept locked', 'Fire-resistant lining', 'Adequate permanent ventilation', 'Only a metal flue be used'],
    correctAnswer: 'Adequate permanent ventilation',
    explanation: 'Compartment installations require sufficient air for combustion and cooling.',
  },
  {
    id: 'gasBuildingRegsQ7',
    topic: 'gas-building-regulations',
    question: 'What is the minimum vertical clearance of a flue terminal above a flat roof?',
    options: ['150mm', '300mm', '600mm', '900mm'],
    correctAnswer: '600mm',
    explanation: 'Terminals must be at least 600mm above the point where they exit a flat roof.',
  },
  {
    id: 'gasBuildingRegsQ8',
    topic: 'gas-building-regulations',
    question: 'Combustion air inlets should not be located:',
    options: ['On side walls', 'Below the appliance', 'In bathrooms', 'In mechanical rooms'],
    correctAnswer: 'In bathrooms',
    explanation: 'Combustion air from bathrooms is prohibited due to moisture and safety risks.',
  },
  {
    id: 'gasBuildingRegsQ9',
    topic: 'gas-building-regulations',
    question: 'What material is typically used for fire-sealing flue penetrations?',
    options: ['PVC', 'Foam tape', 'Intumescent sealant', 'Rubber gasket'],
    correctAnswer: 'Intumescent sealant',
    explanation: 'Intumescent materials expand when heated and seal gaps during a fire.',
  },
  {
    id: 'gasBuildingRegsQ10',
    topic: 'gas-building-regulations',
    question: 'If a flue runs through a loft, Part J recommends:',
    options: ['Leaving it uncovered', 'Wrapping it in insulation', 'Enclosing it in a fire-resistant chase', 'Painting it red'],
    correctAnswer: 'Enclosing it in a fire-resistant chase',
    explanation: 'Loft flue runs should be boxed with fire-resistant materials for protection.',
  },
  {
    id: 'gasBuildingRegsQ11',
    topic: 'gas-building-regulations',
    question: 'Part J prohibits appliance installation where:',
    options: ['Ceiling height is under 2.4m', 'Ventilation is permanent', 'There is risk of flue gas recirculation', 'There is natural light'],
    correctAnswer: 'There is risk of flue gas recirculation',
    explanation: 'Flue gases must not be able to re-enter the building or affect combustion.',
  },
  {
    id: 'gasBuildingRegsQ12',
    topic: 'gas-building-regulations',
    question: 'Flue pipes passing through a cavity wall must:',
    options: ['Be encased in timber', 'Be supported by metal straps', 'Have a cavity tray fitted', 'Include an airbrick'],
    correctAnswer: 'Have a cavity tray fitted',
    explanation: 'To prevent water ingress, cavity trays are used where flues penetrate cavity walls.',
  },
  {
    id: 'gasBuildingRegsQ13',
    topic: 'gas-building-regulations',
    question: 'Can a flue terminal be located directly beneath a window?',
    options: ['Yes', 'Only if window is fixed shut', 'No', 'Yes with CO alarm'],
    correctAnswer: 'No',
    explanation: 'Part J does not permit terminal discharge under or within 300mm of windows.',
  },
  {
    id: 'gasBuildingRegsQ14',
    topic: 'gas-building-regulations',
    question: 'Part J requires that all flue joints be:',
    options: ['Welded', 'Fully accessible for inspection', 'Decorated', 'Flexible'],
    correctAnswer: 'Fully accessible for inspection',
    explanation: 'Flue joints must be accessible to check for leaks or deterioration.',
  },
  {
    id: 'gasBuildingRegsQ15',
    topic: 'gas-building-regulations',
    question: 'If flue products enter a habitable room, this is:',
    options: ['Compliant', 'Service required', 'Immediately Dangerous', 'At Risk'],
    correctAnswer: 'Immediately Dangerous',
    explanation: 'Gas entering occupied spaces is a serious safety hazard.',
  },
  {
    id: 'gasBuildingRegsQ16',
    topic: 'gas-building-regulations',
    question: 'A chimney used for a gas appliance must:',
    options: ['Be open-flued', 'Be metal only', 'Be lined or suitable for use', 'Contain a drain'],
    correctAnswer: 'Be lined or suitable for use',
    explanation: 'Unlined chimneys may not safely handle combustion gases.',
  },
  {
    id: 'gasBuildingRegsQ17',
    topic: 'gas-building-regulations',
    question: 'Flue terminals must be positioned to:',
    options: ['Be hidden from view', 'Prevent blockage or restriction', 'Be easily removed', 'Avoid heat gain'],
    correctAnswer: 'Prevent blockage or restriction',
    explanation: 'Blocked flues can cause spillage or incomplete combustion.',
  },
  {
    id: 'gasBuildingRegsQ18',
    topic: 'gas-building-regulations',
    question: 'Can an appliance be installed in a garage under Part J?',
    options: ['No', 'Yes with suitable flue and protection', 'Only with landlord permission', 'Only if LPG is used'],
    correctAnswer: 'Yes with suitable flue and protection',
    explanation: 'Appliances can be installed if flued safely and protected from damage.',
  },
  {
    id: 'gasBuildingRegsQ19',
    topic: 'gas-building-regulations',
    question: 'What is the role of a flue terminal guard?',
    options: ['Aesthetic purpose', 'Prevent rain entry', 'Protect from debris and contact', 'Strengthen pipework'],
    correctAnswer: 'Protect from debris and contact',
    explanation: 'Guards protect flue terminals from accidental contact and blockages.',
  },
  {
    id: 'gasBuildingRegsQ20',
    topic: 'gas-building-regulations',
    question: 'A high-level terminal should be:',
    options: ['Above the ridge', 'Within 150mm of a fascia', 'Kept at least 600mm from obstructions', 'Facing north'],
    correctAnswer: 'Kept at least 600mm from obstructions',
    explanation: 'Obstructions near terminals can deflect or trap flue gases.',
  },
  {
    id: 'gasBuildingRegsQ21',
    topic: 'gas-building-regulations',
    question: 'Part J requires all combustion appliances to have:',
    options: ['Fire-rated stickers', 'A condensate pump', 'Adequate air supply', 'Mechanical extract fans'],
    correctAnswer: 'Adequate air supply',
    explanation: 'All appliances need sufficient air for combustion and cooling.',
  },
  {
    id: 'gasBuildingRegsQ22',
    topic: 'gas-building-regulations',
    question: 'Combustion air vents should be:',
    options: ['Adjustable', 'Closable by the user', 'Fixed and permanent', 'Covered at night'],
    correctAnswer: 'Fixed and permanent',
    explanation: 'Air vents must not be blocked or closable, to ensure permanent airflow.',
  },
  {
    id: 'gasBuildingRegsQ23',
    topic: 'gas-building-regulations',
    question: 'A gas appliance installed in a bedroom must:',
    options: ['Be LPG only', 'Be open-flued', 'Be room-sealed', 'Be above head height'],
    correctAnswer: 'Be room-sealed',
    explanation: 'Room-sealed appliances are allowed in bedrooms because they don’t use room air.',
  },
  {
    id: 'gasBuildingRegsQ24',
    topic: 'gas-building-regulations',
    question: 'The minimum flue distance to a boundary is:',
    options: ['150mm', '300mm', '600mm', '1 metre'],
    correctAnswer: '600mm',
    explanation: 'This prevents nuisance and allows gases to disperse safely.',
  },
  {
    id: 'gasBuildingRegsQ25',
    topic: 'gas-building-regulations',
    question: 'Flue access panels are required so that:',
    options: ['The boiler can be removed', 'CO alarms can be reset', 'Joints can be inspected and tested', 'Gas rates can be adjusted'],
    correctAnswer: 'Joints can be inspected and tested',
    explanation: 'Access is required for visual inspection of all flue joints.',
  },
];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'gas-building-regulations');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of gasBuildingRegsQuestions) {
    const questionDocRef = doc(db, 'questions', q.topic, 'items', q.id);
    await setDoc(questionDocRef, q);
    console.log(`✅ Uploaded: ${q.id}`);
  }
}

upload();
