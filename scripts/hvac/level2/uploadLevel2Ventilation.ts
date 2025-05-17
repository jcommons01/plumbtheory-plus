// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Ventilation.ts

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

// ✅ HVAC Level 2 – Ventilation Fundamentals
const questions = [
  {
    id: 'hvac-l2-ventilation-1',
    question: "What does MVHR stand for in a domestic ventilation system?",
    options: ["Manual Ventilation Heat Recovery", "Mechanical Ventilation Heat Recovery", "Measured Volume Heat Recirculation", "Motorised Ventilation Heating Regulation"],
    correctAnswer: "Mechanical Ventilation Heat Recovery",
    explanation: "MVHR stands for Mechanical Ventilation with Heat Recovery, a system that supplies fresh air while recovering heat from exhaust air."
  },
  {
    id: 'hvac-l2-ventilation-2',
    question: "Which UK regulation outlines ventilation requirements in new dwellings?",
    options: ["Part L", "Part B", "Part F", "Part P"],
    correctAnswer: "Part F",
    explanation: "Part F of the Building Regulations covers ventilation requirements, including extract rates and background ventilation."
  },
  {
    id: 'hvac-l2-ventilation-3',
    question: "Which type of fan is commonly used for high-pressure duct systems?",
    options: ["Axial", "Belt-drive", "Centrifugal", "Induction"],
    correctAnswer: "Centrifugal",
    explanation: "Centrifugal fans are designed to handle higher pressures and are suited for long duct runs with resistance."
  },
  {
    id: 'hvac-l2-ventilation-4',
    question: "What airflow is required for a domestic bathroom with intermittent extract?",
    options: ["8 l/s", "12 l/s", "15 l/s", "20 l/s"],
    correctAnswer: "15 l/s",
    explanation: "Part F requires 15 litres per second intermittent extract in bathrooms without openable windows."
  },
  {
    id: 'hvac-l2-ventilation-5',
    question: "What is the typical minimum area for trickle vents in habitable rooms?",
    options: ["4000 mm²", "6000 mm²", "8000 mm²", "10000 mm²"],
    correctAnswer: "8000 mm²",
    explanation: "UK regulations require at least 8000 mm² equivalent area for trickle vents in habitable rooms."
  },
  {
    id: 'hvac-l2-ventilation-6',
    question: "Which component in a duct system adjusts the flow to each room?",
    options: ["Filter", "Louvre", "Damper", "Sensor"],
    correctAnswer: "Damper",
    explanation: "Dampers regulate airflow within ductwork and help balance the system for even distribution."
  },
  {
    id: 'hvac-l2-ventilation-7',
    question: "What unit is airflow commonly measured in?",
    options: ["m/s", "kWh", "l/s", "dB"],
    correctAnswer: "l/s",
    explanation: "Airflow is measured in litres per second (l/s), the standard unit for ventilation performance."
  },
  {
    id: 'hvac-l2-ventilation-8',
    question: "Which system supplies filtered air into a property to combat condensation?",
    options: ["MEV", "MVHR", "PIV", "PSV"],
    correctAnswer: "PIV",
    explanation: "Positive Input Ventilation (PIV) introduces filtered air into the home to reduce moisture and improve air quality."
  },
  {
    id: 'hvac-l2-ventilation-9',
    question: "What is the main cause of condensation in homes?",
    options: ["Too much heating", "Lack of lighting", "Insufficient ventilation", "High ceilings"],
    correctAnswer: "Insufficient ventilation",
    explanation: "Without adequate ventilation, excess moisture cannot escape, leading to condensation and mould."
  },
  {
    id: 'hvac-l2-ventilation-10',
    question: "Where are extract fans typically installed in a home?",
    options: ["Living room", "Bedroom", "Bathroom", "Hallway"],
    correctAnswer: "Bathroom",
    explanation: "Bathrooms and kitchens produce high moisture levels and require extract fans to remove humid air."
  },
  {
    id: 'hvac-l2-ventilation-11',
    question: "What does ACH stand for?",
    options: ["Air Control Handler", "Air Changes per Hour", "Air Conductor Hub", "Average Circulation Heat"],
    correctAnswer: "Air Changes per Hour",
    explanation: "ACH measures how many times the air volume in a room is replaced in one hour."
  },
  {
    id: 'hvac-l2-ventilation-12',
    question: "What type of ventilation relies on natural air movement?",
    options: ["MEV", "MVHR", "Natural", "Mechanical extract"],
    correctAnswer: "Natural",
    explanation: "Natural ventilation uses pressure differences, wind, and buoyancy to provide air movement without fans."
  },
  {
    id: 'hvac-l2-ventilation-13',
    question: "What material is often used to insulate ventilation ducting?",
    options: ["Plastic", "Aluminium", "Glass wool", "Rubber"],
    correctAnswer: "Glass wool",
    explanation: "Glass wool is commonly used for duct insulation to prevent heat loss and reduce noise."
  },
  {
    id: 'hvac-l2-ventilation-14',
    question: "Why are flexible ducts not ideal for long runs?",
    options: ["Too loud", "Hard to bend", "Create high resistance", "Not recyclable"],
    correctAnswer: "Create high resistance",
    explanation: "Flexible ducts cause turbulence and friction, increasing pressure loss and reducing airflow."
  },
  {
    id: 'hvac-l2-ventilation-15',
    question: "Which factor affects ventilation effectiveness most?",
    options: ["Paint type", "Fan position", "Carpet thickness", "Window glass"],
    correctAnswer: "Fan position",
    explanation: "Correct fan positioning ensures efficient removal of stale air and prevents dead spots."
  },
  {
    id: 'hvac-l2-ventilation-16',
    question: "Which system uses one fan to remove air from wet rooms?",
    options: ["MVHR", "MEV", "PIV", "HVAC"],
    correctAnswer: "MEV",
    explanation: "Mechanical Extract Ventilation (MEV) uses a central fan to remove moist air from multiple rooms."
  },
  {
    id: 'hvac-l2-ventilation-17',
    question: "What is a 'dead zone' in a ventilation system?",
    options: ["High temperature area", "Low humidity area", "Low airflow area", "High noise area"],
    correctAnswer: "Low airflow area",
    explanation: "Dead zones are areas with little air movement, causing stale air and discomfort."
  },
  {
    id: 'hvac-l2-ventilation-18',
    question: "What component removes particles from the air?",
    options: ["Damper", "Filter", "Fan", "Grille"],
    correctAnswer: "Filter",
    explanation: "Filters capture dust and contaminants to improve air quality and protect equipment."
  },
  {
    id: 'hvac-l2-ventilation-19',
    question: "Which system is most efficient at retaining heat?",
    options: ["Natural", "PIV", "MEV", "MVHR"],
    correctAnswer: "MVHR",
    explanation: "MVHR systems recover heat from outgoing air to pre-warm incoming air, saving energy."
  },
  {
    id: 'hvac-l2-ventilation-20',
    question: "What controls a fan automatically based on humidity?",
    options: ["Isolator", "Humidistat", "Thermostat", "Sensor"],
    correctAnswer: "Humidistat",
    explanation: "A humidistat switches the fan on or off depending on moisture levels in the air."
  },
  {
    id: 'hvac-l2-ventilation-21',
    question: "What minimum airflow is required for a utility room?",
    options: ["8 l/s", "15 l/s", "20 l/s", "30 l/s"],
    correctAnswer: "30 l/s",
    explanation: "Utility rooms typically require 30 l/s extract due to high moisture from appliances."
  },
  {
    id: 'hvac-l2-ventilation-22',
    question: "Which method helps remove heat using cooler night air?",
    options: ["Zone control", "Overrun timer", "Night purge", "Recirculation"],
    correctAnswer: "Night purge",
    explanation: "Night purge uses cooler outdoor air to lower internal temperatures overnight."
  },
  {
    id: 'hvac-l2-ventilation-23',
    question: "What does SFP measure in ventilation?",
    options: ["Fan noise", "Filter size", "Energy used per airflow", "Supply pressure"],
    correctAnswer: "Energy used per airflow",
    explanation: "Specific Fan Power (SFP) measures energy efficiency in watts per litre per second."
  },
  {
    id: 'hvac-l2-ventilation-24',
    question: "Where is a fire damper typically installed?",
    options: ["In floors", "In ceilings", "In ductwork at fire barriers", "In radiators"],
    correctAnswer: "In ductwork at fire barriers",
    explanation: "Fire dampers prevent flames and smoke passing through ductwork in fire-rated walls."
  },
  {
    id: 'hvac-l2-ventilation-25',
    question: "What is the purpose of commissioning a ventilation system?",
    options: ["To label the ducts", "To clean the filters", "To test and balance airflow", "To paint diffusers"],
    correctAnswer: "To test and balance airflow",
    explanation: "Commissioning ensures the system delivers the correct air volumes and operates efficiently."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-ventilation', 'items', q.id), {
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
