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
    id: 'bricklaying-l3-topic9-q1',
    question: 'What is the main role of a cavity in a masonry wall?',
    options: ['Improve sound insulation', 'Allow for expansion gaps', 'Provide thermal and moisture protection', 'Support outer leaf stability'],
    correctAnswer: 'Provide thermal and moisture protection',
    explanation: 'A cavity helps prevent moisture from crossing to the inner wall and improves insulation by reducing heat transfer.'
  },
  {
    id: 'bricklaying-l3-topic9-q2',
    question: 'What is the typical minimum width for a wall cavity in modern UK construction?',
    options: ['35mm', '75mm', '25mm', '50mm'],
    correctAnswer: '50mm',
    explanation: 'A 50mm clear cavity is the standard to reduce moisture bridging and allow for construction tolerances.'
  },
  {
    id: 'bricklaying-l3-topic9-q3',
    question: 'What does a cavity tray prevent in a wall structure?',
    options: ['Brick movement', 'Heat loss', 'Water ingress', 'Air leakage'],
    correctAnswer: 'Water ingress',
    explanation: 'Cavity trays redirect water back outside through weep holes, protecting the inner wall.'
  },
  {
    id: 'bricklaying-l3-topic9-q4',
    question: 'What is a cold bridge in masonry construction?',
    options: ['Uninsulated area allowing heat loss', 'Gap left for future services', 'Cold air vent opening', 'Crack in the outer leaf'],
    correctAnswer: 'Uninsulated area allowing heat loss',
    explanation: 'Cold bridges occur where insulation is missing or interrupted, increasing heat loss and condensation risk.'
  },
  {
    id: 'bricklaying-l3-topic9-q5',
    question: 'Where should a vapour barrier typically be placed?',
    options: ['Inside the cavity', 'Behind the plasterboard', 'On the warm side of insulation', 'Between both wall leaves'],
    correctAnswer: 'On the warm side of insulation',
    explanation: 'Positioning the barrier on the warm side prevents moist air from condensing inside the wall.'
  },
  {
    id: 'bricklaying-l3-topic9-q6',
    question: 'What is the function of wall ties in a cavity wall?',
    options: ['Stop thermal bridging', 'Fix insulation boards', 'Link leaves while allowing movement', 'Support cladding panels'],
    correctAnswer: 'Link leaves while allowing movement',
    explanation: 'Wall ties stabilise both masonry leaves while maintaining the cavity separation.'
  },
  {
    id: 'bricklaying-l3-topic9-q7',
    question: 'What is a weep hole used for in cavity walls?',
    options: ['Drain trapped water', 'Hold cavity trays in place', 'Release air pressure', 'Secure insulation'],
    correctAnswer: 'Drain trapped water',
    explanation: 'Weep holes allow moisture caught in the cavity tray to escape externally.'
  },
  {
    id: 'bricklaying-l3-topic9-q8',
    question: 'Which insulation type has the lowest thermal conductivity?',
    options: ['Mineral wool', 'Polystyrene', 'PIR board', 'Sheep wool'],
    correctAnswer: 'PIR board',
    explanation: 'PIR boards offer excellent thermal resistance with lower thickness requirements.'
  },
  {
    id: 'bricklaying-l3-topic9-q9',
    question: 'What does a U-value represent?',
    options: ['Heat loss rate', 'Humidity index', 'Material thickness', 'Air permeability'],
    correctAnswer: 'Heat loss rate',
    explanation: 'U-value measures how much heat passes through a building element per m² for each degree difference.'
  },
  {
    id: 'bricklaying-l3-topic9-q10',
    question: 'Which of the following causes rising damp?',
    options: ['Condensation', 'Roof leaks', 'Capillary action from ground', 'Defective render'],
    correctAnswer: 'Capillary action from ground',
    explanation: 'Rising damp occurs when groundwater is drawn up through masonry via fine pores.'
  },
  {
    id: 'bricklaying-l3-topic9-q11',
    question: 'What is the main cause of efflorescence?',
    options: ['UV damage', 'Salt migration', 'Overheating', 'Rain splashback'],
    correctAnswer: 'Salt migration',
    explanation: 'Efflorescence is caused by salts dissolved in water that evaporate and crystallise on masonry surfaces.'
  },
  {
    id: 'bricklaying-l3-topic9-q12',
    question: 'What is thermal mass in building materials?',
    options: ['Resistance to rain', 'Storage of moisture', 'Ability to absorb and release heat', 'Total weight of insulation'],
    correctAnswer: 'Ability to absorb and release heat',
    explanation: 'Materials with high thermal mass help regulate indoor temperature by storing and releasing heat slowly.'
  },
  {
    id: 'bricklaying-l3-topic9-q13',
    question: 'What is interstitial condensation?',
    options: ['Moisture between bricks', 'Condensation within wall layers', 'Condensation on internal walls', 'Leaks through render'],
    correctAnswer: 'Condensation within wall layers',
    explanation: 'This occurs when moisture vapour condenses inside wall layers, potentially damaging the structure.'
  },
  {
    id: 'bricklaying-l3-topic9-q14',
    question: 'What is the purpose of a damp-proof course (DPC)?',
    options: ['Prevent heat loss', 'Prevent rising damp', 'Increase strength', 'Create cavity space'],
    correctAnswer: 'Prevent rising damp',
    explanation: 'DPCs form a barrier in walls to stop moisture from the ground moving upwards.'
  },
  {
    id: 'bricklaying-l3-topic9-q15',
    question: 'What is the standard spacing of wall ties in cavity walls?',
    options: ['600 × 600mm', '900 × 450mm', '450 × 450mm', '300 × 600mm'],
    correctAnswer: '900 × 450mm',
    explanation: 'Wall ties are typically spaced at 900mm horizontally and 450mm vertically in standard exposure zones.'
  },
  {
    id: 'bricklaying-l3-topic9-q16',
    question: 'What is the function of a ventilated cavity behind cladding?',
    options: ['Improve insulation', 'Reduce noise', 'Allow moisture to escape', 'Support wall ties'],
    correctAnswer: 'Allow moisture to escape',
    explanation: 'Ventilated cavities promote air movement and drying, helping prevent trapped moisture.'
  },
  {
    id: 'bricklaying-l3-topic9-q17',
    question: 'Which term describes heat loss at junctions like wall-to-floor areas?',
    options: ['U-value', 'Solar gain', 'Thermal bridging', 'Air leakage'],
    correctAnswer: 'Thermal bridging',
    explanation: 'Heat can bypass insulation at junctions, causing increased loss and condensation risk.'
  },
  {
    id: 'bricklaying-l3-topic9-q18',
    question: 'What does the term "breathable wall" imply?',
    options: ['Allows water to pass', 'Has no insulation', 'Permits vapour movement', 'Contains open joints'],
    correctAnswer: 'Permits vapour movement',
    explanation: 'Breathable walls allow water vapour to diffuse, reducing condensation build-up inside the structure.'
  },
  {
    id: 'bricklaying-l3-topic9-q19',
    question: 'Which part of the wall should cavity insulation be secured to?',
    options: ['Outer leaf', 'Cavity tray', 'Inner leaf', 'Wall ties'],
    correctAnswer: 'Inner leaf',
    explanation: 'Insulation is generally fixed to the inner leaf in partial fill systems, ensuring stability and maintaining a clear cavity.'
  },
  {
    id: 'bricklaying-l3-topic9-q20',
    question: 'What is the minimum overlap between horizontal and vertical DPCs?',
    options: ['100mm', '25mm', '200mm', '50mm'],
    correctAnswer: '100mm',
    explanation: 'An overlap of 100mm ensures continuity and avoids gaps where moisture could enter.'
  },
  {
    id: 'bricklaying-l3-topic9-q21',
    question: 'Which factor most influences condensation risk?',
    options: ['Wind pressure', 'Paint colour', 'Relative humidity', 'Wall thickness'],
    correctAnswer: 'Relative humidity',
    explanation: 'High relative humidity increases the likelihood of condensation on cold surfaces.'
  },
  {
    id: 'bricklaying-l3-topic9-q22',
    question: 'What does a psi-value measure in buildings?',
    options: ['Heat transfer at junctions', 'Wall thickness', 'Moisture levels', 'Surface temperature'],
    correctAnswer: 'Heat transfer at junctions',
    explanation: 'Psi-values quantify additional heat loss at junctions and are key in energy performance assessments.'
  },
  {
    id: 'bricklaying-l3-topic9-q23',
    question: 'Which condition causes summer overheating in masonry buildings?',
    options: ['Low ceiling height', 'Lack of thermal mass', 'Cold roof design', 'High humidity'],
    correctAnswer: 'Lack of thermal mass',
    explanation: 'Without thermal mass to absorb heat, internal temperatures can rise quickly in hot weather.'
  },
  {
    id: 'bricklaying-l3-topic9-q24',
    question: 'Why are airbricks used in masonry walls?',
    options: ['Support ventilation', 'Strengthen the wall', 'Act as insulation', 'Absorb sound'],
    correctAnswer: 'Support ventilation',
    explanation: 'Airbricks ensure airflow in floor voids and cavity spaces, preventing damp and stale air.'
  },
  {
    id: 'bricklaying-l3-topic9-q25',
    question: 'What does a hygroscopic material do?',
    options: ['Conducts heat quickly', 'Emits light', 'Absorbs moisture from air', 'Hardens over time'],
    correctAnswer: 'Absorbs moisture from air',
    explanation: 'Hygroscopic materials take in moisture from humid air, affecting internal conditions and surface damp.'
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-thermal-moisture', 'items', q.id), {
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
