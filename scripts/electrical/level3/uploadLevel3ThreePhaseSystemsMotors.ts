// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3ThreePhaseSystemsMotors.ts

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
    id: 'threephase01',
    question: "What is the line voltage of a 400V three-phase system?",
    options: ["400V", "230V", "690V", "115V"],
    correctAnswer: "400V",
    explanation: "In a standard UK three-phase system, the line voltage (between any two phases) is 400V, and the phase voltage (between phase and neutral) is 230V."
  },
  {
    id: 'threephase02',
    question: "What is the phase voltage in a 400V three-phase system?",
    options: ["230V", "400V", "115V", "690V"],
    correctAnswer: "230V",
    explanation: "The phase voltage is the voltage between one phase and neutral, which is 230V in a 400V three-phase system (400 ÷ √3)."
  },
  {
    id: 'threephase03',
    question: "How many degrees apart are the phases in a balanced three-phase system?",
    options: ["90°", "120°", "180°", "60°"],
    correctAnswer: "120°",
    explanation: "In a balanced three-phase system, each phase is separated by 120 electrical degrees to maintain consistent power delivery."
  },
  {
    id: 'threephase04',
    question: "What type of motor is most commonly used in industrial three-phase applications?",
    options: ["Split-phase motor", "Synchronous motor", "Three-phase induction motor", "Universal motor"],
    correctAnswer: "Three-phase induction motor",
    explanation: "Three-phase induction motors are widely used in industry due to their robustness, efficiency, and simple construction."
  },
  {
    id: 'threephase05',
    question: "Which formula is used to calculate power in a balanced three-phase system?",
    options: ["P = V × I", "P = √3 × V × I × cosφ", "P = V² ÷ R", "P = I² × R"],
    correctAnswer: "P = √3 × V × I × cosφ",
    explanation: "The total power in a balanced three-phase system is given by: P = √3 × line voltage × line current × power factor."
  },
  {
    id: 'threephase06',
    question: "What happens if the phase sequence is reversed on a three-phase motor?",
    options: ["Motor will stop", "Motor will not start", "Motor will rotate in reverse", "Motor will overheat"],
    correctAnswer: "Motor will rotate in reverse",
    explanation: "Reversing the phase sequence causes the rotating magnetic field to reverse direction, which makes the motor run in the opposite direction."
  },
  {
    id: 'threephase07',
    question: "Why are three-phase motors more efficient than single-phase motors?",
    options: ["They use more copper", "They operate at lower voltage", "They produce a rotating magnetic field", "They have fewer windings"],
    correctAnswer: "They produce a rotating magnetic field",
    explanation: "Three-phase motors naturally produce a rotating magnetic field, allowing for smoother operation and higher efficiency compared to single-phase motors."
  },
  {
    id: 'threephase08',
    question: "Which starting method reduces inrush current for large motors?",
    options: ["DOL", "Star-delta", "Reversing starter", "Contactor-only"],
    correctAnswer: "Star-delta",
    explanation: "Star-delta starters reduce inrush current during motor startup by initially connecting windings in star, then switching to delta."
  },
  {
    id: 'threephase09',
    question: "What device is used to protect a three-phase motor from overload?",
    options: ["RCD", "Isolator", "Thermal overload relay", "Contactor"],
    correctAnswer: "Thermal overload relay",
    explanation: "A thermal overload relay protects motors by detecting excess current over time, preventing overheating and damage."
  },
  {
    id: 'threephase10',
    question: "What is the typical supply frequency for three-phase systems in the UK?",
    options: ["50 Hz", "60 Hz", "100 Hz", "25 Hz"],
    correctAnswer: "50 Hz",
    explanation: "The standard frequency for mains electricity in the UK, including three-phase systems, is 50 Hz."
  },
  {
    id: 'threephase11',
    question: "Which component initiates motor contactor operation in an automatic control circuit?",
    options: ["RCD", "Thermal trip", "Start button", "Overload relay"],
    correctAnswer: "Start button",
    explanation: "Pressing the start button energises the contactor coil, closing the main contacts and starting the motor."
  },
  {
    id: 'threephase12',
    question: "In star connection, the line voltage is related to phase voltage by which factor?",
    options: ["Equal", "Double", "√3", "Half"],
    correctAnswer: "√3",
    explanation: "In a star configuration, line voltage = √3 × phase voltage (e.g., 400V line = 230V phase)."
  },
  {
    id: 'threephase13',
    question: "What happens if one phase is lost in a three-phase motor during operation?",
    options: ["Motor increases speed", "Motor continues normally", "Motor runs on two phases and overheats", "Motor stops instantly"],
    correctAnswer: "Motor runs on two phases and overheats",
    explanation: "Loss of one phase (single phasing) causes the motor to draw higher current through the remaining phases, leading to overheating and damage."
  },
  {
    id: 'threephase14',
    question: "Which instrument is used to check phase rotation in a three-phase supply?",
    options: ["Insulation tester", "Loop impedance tester", "Phase rotation tester", "Multimeter"],
    correctAnswer: "Phase rotation tester",
    explanation: "A phase rotation tester indicates the order of phases to ensure correct motor rotation and system operation."
  },
  {
    id: 'threephase15',
    question: "Why is it important to check phase rotation before connecting a three-phase motor?",
    options: ["To avoid electric shock", "To ensure it runs quietly", "To ensure correct rotation direction", "To reduce voltage drop"],
    correctAnswer: "To ensure correct rotation direction",
    explanation: "Incorrect phase rotation causes motors to run in reverse, which may damage driven equipment or create safety hazards."
  },
  {
    id: 'threephase16',
    question: "Which type of motor offers constant speed regardless of load changes?",
    options: ["Squirrel cage induction motor", "Universal motor", "Series wound motor", "Synchronous motor"],
    correctAnswer: "Synchronous motor",
    explanation: "Synchronous motors rotate at a fixed speed determined by supply frequency and pole number, regardless of load."
  },
  {
    id: 'threephase17',
    question: "What effect does a poor power factor have on three-phase motor systems?",
    options: ["Reduces motor speed", "Increases efficiency", "Increases current draw", "Improves voltage regulation"],
    correctAnswer: "Increases current draw",
    explanation: "Poor power factor leads to higher current for the same power, increasing losses and reducing efficiency."
  },
  {
    id: 'threephase18',
    question: "Which part of an induction motor generates the rotating magnetic field?",
    options: ["Rotor", "Stator", "Commutator", "Brushes"],
    correctAnswer: "Stator",
    explanation: "The stator of an induction motor generates the rotating magnetic field that induces current in the rotor."
  },
  {
    id: 'threephase19',
    question: "How is the direction of rotation of a three-phase motor changed?",
    options: ["Change voltage", "Change load", "Swap two phases", "Change frequency"],
    correctAnswer: "Swap two phases",
    explanation: "Swapping any two of the three supply phases reverses the direction of the rotating magnetic field and motor rotation."
  },
  {
    id: 'threephase20',
    question: "What is the typical number of supply phases in an industrial motor circuit?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: "Three",
    explanation: "Industrial motor circuits typically use a three-phase supply to provide higher efficiency and balanced power."
  },
  {
    id: 'threephase21',
    question: "What is the main advantage of delta connection in motor windings?",
    options: ["Lower voltage", "Reduced torque", "Higher starting current", "Full line voltage across each winding"],
    correctAnswer: "Full line voltage across each winding",
    explanation: "In a delta connection, each winding receives the full line voltage, producing more torque than a star connection."
  },
  {
    id: 'threephase22',
    question: "Which method is used to vary the speed of a three-phase motor efficiently?",
    options: ["Star-delta", "Inverter drive", "Capacitor bank", "Contactor"],
    correctAnswer: "Inverter drive",
    explanation: "Inverter drives (variable frequency drives) adjust the frequency of supply to control motor speed efficiently."
  },
  {
    id: 'threephase23',
    question: "In motor circuits, what function does the contactor perform?",
    options: ["Reduce voltage", "Overcurrent protection", "Remote switching", "Speed control"],
    correctAnswer: "Remote switching",
    explanation: "Contactors allow motors to be switched on or off remotely using control circuits, often with start/stop buttons."
  },
  {
    id: 'threephase24',
    question: "Why must motors be protected against phase failure?",
    options: ["To prevent short circuits", "To ensure neutral balance", "To avoid undercurrent", "To prevent overheating and damage"],
    correctAnswer: "To prevent overheating and damage",
    explanation: "Phase failure can cause unbalanced currents, overloading the remaining phases and damaging the motor."
  },
  {
    id: 'threephase25',
    question: "Which component is often used to monitor the thermal condition of a motor winding?",
    options: ["RCD", "PTC thermistor", "Contactor", "Current transformer"],
    correctAnswer: "PTC thermistor",
    explanation: "PTC thermistors increase resistance as temperature rises and are used to detect overheating in motor windings."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-three-phase-motors', 'items', q.id), {
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
