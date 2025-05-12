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

// ✅ CSCS Fire Prevention & Control Questions
const questions = [
  {
    id: 'cscs-fire-prevention-1',
    question: "What color is a CO2 fire extinguisher?",
    options: ["Red with a blue band", "Red with a black band", "Red with a cream band", "Red with a yellow band"],
    correctAnswer: "Red with a black band",
    explanation: "CO2 extinguishers are red with a black band and primarily used for electrical fires. They don't leave residue which makes them suitable for electrical equipment."
  },
  {
    id: 'cscs-fire-prevention-2',
    question: "What type of fire extinguisher should NEVER be used on electrical fires?",
    options: ["Dry powder", "CO2", "Foam", "Water"],
    correctAnswer: "Water",
    explanation: "Water extinguishers should never be used on electrical fires as water conducts electricity. This could result in electric shock to the user."
  },
  {
    id: 'cscs-fire-prevention-3',
    question: "What action should you take first if you discover a fire on site?",
    options: ["Try to put the fire out yourself", "Call the fire brigade directly", "Raise the alarm and follow site emergency procedures", "Evacuate the building immediately"],
    correctAnswer: "Raise the alarm and follow site emergency procedures",
    explanation: "Your first action should be to raise the alarm to alert everyone to the danger. Then follow the site's emergency procedures which will specify evacuation routes and responsibilities."
  },
  {
    id: 'cscs-fire-prevention-4',
    question: "What does the fire triangle represent?",
    options: ["The three types of fire extinguishers", "The three common causes of fire", "The three elements needed for a fire to exist", "The three stages of fire development"],
    correctAnswer: "The three elements needed for a fire to exist",
    explanation: "The fire triangle represents fuel, heat, and oxygen - the three elements needed for fire to exist. Remove any one element and the fire will be extinguished."
  },
  {
    id: 'cscs-fire-prevention-5',
    question: "How would you identify the correct type of fire extinguisher to use?",
    options: ["By the color of the entire extinguisher", "By the color coding band on the extinguisher", "By the size of the extinguisher", "By the location of the extinguisher"],
    correctAnswer: "By the color coding band on the extinguisher",
    explanation: "Fire extinguishers are identified by their color-coded bands: water (red), foam (cream), powder (blue), CO2 (black), and wet chemical (yellow). These standardized colors help quick identification in emergencies."
  },
  {
    id: 'cscs-fire-prevention-6',
    question: "What is the primary purpose of a fire assembly point?",
    options: ["A place to store fire extinguishers", "A location to wait for the fire brigade", "A safe gathering location to account for everyone after evacuation", "The point where a fire is most likely to start"],
    correctAnswer: "A safe gathering location to account for everyone after evacuation",
    explanation: "A fire assembly point provides a safe location where everyone can be accounted for after evacuation. These points are positioned away from the building and from access routes needed by emergency services."
  },
  {
    id: 'cscs-fire-prevention-7',
    question: "Which of these is NOT a typical cause of fires on construction sites?",
    options: ["Hot work such as welding or cutting", "Electrical faults or misuse", "Improper storage of combustible materials", "Using water near electrical equipment"],
    correctAnswer: "Using water near electrical equipment",
    explanation: "Using water near electrical equipment is a safety hazard that could cause electric shock, not typically a cause of fires. Common fire causes include hot work, electrical faults, improper storage of flammable materials, and smoking in prohibited areas."
  },
  {
    id: 'cscs-fire-prevention-8',
    question: "What does a 'hot work permit' control?",
    options: ["Working in hot weather conditions", "Operation of heating systems", "Activities like welding that could cause fires", "Temperature in enclosed spaces"],
    correctAnswer: "Activities like welding that could cause fires",
    explanation: "A hot work permit controls activities that generate heat or sparks and could potentially cause fires. This includes welding, cutting, grinding, and soldering."
  },
  {
    id: 'cscs-fire-prevention-9',
    question: "What type of fire extinguisher would be suitable for a Class A fire involving solid materials like wood or paper?",
    options: ["CO2 only", "Water or foam", "Dry powder only", "Wet chemical only"],
    correctAnswer: "Water or foam",
    explanation: "Water or foam extinguishers are suitable for Class A fires involving solid materials like wood or paper. Water cools the fire while foam forms a barrier between fuel and oxygen."
  },
  {
    id: 'cscs-fire-prevention-10',
    question: "How long should a fire watch be maintained after completion of hot work?",
    options: ["At least 10 minutes", "At least 30 minutes", "At least 60 minutes", "At least 2 hours"],
    correctAnswer: "At least 60 minutes",
    explanation: "A fire watch should be maintained for at least 60 minutes after hot work completion. This period is crucial because fires can smolder undetected before developing into visible flames."
  },
  {
    id: 'cscs-fire-prevention-11',
    question: "What is the purpose of a fire damper in a ventilation system?",
    options: ["To increase airflow during a fire", "To prevent smoke from entering the system", "To automatically close and block the spread of fire through ductwork", "To extract smoke from the building"],
    correctAnswer: "To automatically close and block the spread of fire through ductwork",
    explanation: "Fire dampers automatically close to block fire spread through ventilation ductwork. They help maintain the fire resistance rating of compartment walls and floors that are penetrated by ducts."
  },
  {
    id: 'cscs-fire-prevention-12',
    question: "What is the recommended method for tackling a fire with an extinguisher?",
    options: ["PLAN: Position, Locate, Aim, Neutralize", "RACE: Remove, Alarm, Confine, Extinguish", "PASS: Pull, Aim, Squeeze, Sweep", "FIRE: Find, Identify, Release, Evacuate"],
    correctAnswer: "PASS: Pull, Aim, Squeeze, Sweep",
    explanation: "PASS stands for: Pull the pin, Aim at the base of the fire, Squeeze the handles together, and Sweep from side to side. This technique ensures the extinguishing agent is directed at the fuel source."
  },
  {
    id: 'cscs-fire-prevention-13',
    question: "What is the purpose of a fire-resistant door?",
    options: ["To provide privacy in office areas", "To improve building aesthetics", "To compartmentalize a building and prevent fire spread", "To secure valuable equipment"],
    correctAnswer: "To compartmentalize a building and prevent fire spread",
    explanation: "Fire-resistant doors compartmentalize buildings to prevent fire and smoke spread. They provide time for evacuation and firefighting by containing fire to its origin area for a specified period."
  },
  {
    id: 'cscs-fire-prevention-14',
    question: "When should you attempt to fight a fire with an extinguisher?",
    options: ["Always, regardless of the size of the fire", "Only after the fire brigade has arrived", "Only if you're trained, the fire is small, and it's safe to do so", "Never, as it's too dangerous"],
    correctAnswer: "Only if you're trained, the fire is small, and it's safe to do so",
    explanation: "Only attempt to fight a fire if you're trained, the fire is small (ideally no larger than a waste paper basket), and it's safe to do so. Always ensure you have a clear escape route and have raised the alarm first."
  },
  {
    id: 'cscs-fire-prevention-15',
    question: "What does a blue and white safety sign showing a flame symbol indicate?",
    options: ["No smoking area", "Fire alarm call point", "Fire assembly point", "Flammable materials"],
    correctAnswer: "Flammable materials",
    explanation: "A blue and white safety sign with a flame symbol indicates flammable materials. This mandatory sign provides essential information about hazards that require specific precautions in the area."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-fire-prevention', 'items', q.id), {
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