// ✅ COMPLETE: scripts/uploadLevel2CommonPrinciples.ts with 25 Level 2 questions
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
    id: 'level2common1',
    topic: 'level2-common-principles',
    question: "What is the main reason copper is used in plumbing systems?",
    options: ["It is flexible", "It is lightweight", "It is corrosion resistant", "It is a good insulator"],
    correctAnswer: "It is corrosion resistant",
    explanation: "Copper is durable and resists corrosion, making it ideal for plumbing."
  },
  {
    id: 'level2common2',
    topic: 'level2-common-principles',
    question: "What does heat always do in thermal transfer?",
    options: ["Rise", "Fall", "Move from cold to hot", "Move from hot to cold"],
    correctAnswer: "Move from hot to cold",
    explanation: "Heat naturally moves from hotter to cooler substances."
  },
  {
    id: 'level2common3',
    topic: 'level2-common-principles',
    question: "What unit is used to measure water pressure?",
    options: ["Litres", "Amps", "Bar", "Kelvin"],
    correctAnswer: "Bar",
    explanation: "Bar is a unit of pressure used to measure force in water systems."
  },
  {
    id: 'level2common4',
    topic: 'level2-common-principles',
    question: "What is the boiling point of water at atmospheric pressure?",
    options: ["90°C", "100°C", "110°C", "80°C"],
    correctAnswer: "100°C",
    explanation: "Water boils at 100°C under standard atmospheric pressure."
  },
  {
    id: 'level2common5',
    topic: 'level2-common-principles',
    question: "What material is commonly used for underground service pipes?",
    options: ["Copper", "MDPE", "Stainless steel", "Lead"],
    correctAnswer: "MDPE",
    explanation: "MDPE is flexible and corrosion-resistant, suitable for underground use."
  },
  {
    id: 'level2common6',
    topic: 'level2-common-principles',
    question: "Which term describes the resistance to water flow in a pipe?",
    options: ["Pressure", "Velocity", "Friction loss", "Expansion"],
    correctAnswer: "Friction loss",
    explanation: "Friction loss is the resistance water encounters when flowing through pipes."
  },
  {
    id: 'level2common7',
    topic: 'level2-common-principles',
    question: "What property of water allows it to store heat?",
    options: ["Viscosity", "Density", "Specific heat capacity", "Conductivity"],
    correctAnswer: "Specific heat capacity",
    explanation: "Water has a high specific heat capacity, allowing it to store heat efficiently."
  },
  {
    id: 'level2common8',
    topic: 'level2-common-principles',
    question: "What is used to reduce heat loss from pipes?",
    options: ["Lagging", "Painting", "Plastic sheeting", "Tiling"],
    correctAnswer: "Lagging",
    explanation: "Lagging is insulation fitted to pipework to reduce heat loss."
  },
  {
    id: 'level2common9',
    topic: 'level2-common-principles',
    question: "Which of the following expands the most when heated?",
    options: ["Water", "Copper", "Air", "Plastic"],
    correctAnswer: "Air",
    explanation: "Gases expand more than liquids or solids when heated."
  },
  {
    id: 'level2common10',
    topic: 'level2-common-principles',
    question: "Why is earthing important in plumbing systems?",
    options: ["To prevent pipe leaks", "To ensure bonding", "To reduce corrosion", "To prevent electric shock"],
    correctAnswer: "To prevent electric shock",
    explanation: "Earthing ensures any fault current is safely conducted away."
  },
  {
    id: 'level2common11',
    topic: 'level2-common-principles',
    question: "What happens to water pressure as you go lower in a vertical pipe or column?",
    options: ["It increases", "It decreases", "It stays the same", "It disappears"],
    correctAnswer: "It increases",
    explanation: "Water pressure increases with depth due to the weight of water above."
  },
  {
    id: 'level2common12',
    topic: 'level2-common-principles',
    question: "What is a major cause of noise in plumbing systems?",
    options: ["Low pressure", "Airlocks", "Thermal expansion", "Corrosion"],
    correctAnswer: "Airlocks",
    explanation: "Trapped air can cause banging or gurgling sounds in pipes."
  },
  {
    id: 'level2common13',
    topic: 'level2-common-principles',
    question: "What device measures water flow?",
    options: ["Manometer", "Thermometer", "Flow meter", "Barometer"],
    correctAnswer: "Flow meter",
    explanation: "Flow meters measure the rate of water passing through a system."
  },
  {
    id: 'level2common14',
    topic: 'level2-common-principles',
    question: "Which material is commonly used for hot water cylinder tanks?",
    options: ["Copper", "Plastic", "Lead", "Aluminium"],
    correctAnswer: "Copper",
    explanation: "Copper is used due to its thermal conductivity and corrosion resistance."
  },
  {
    id: 'level2common15',
    topic: 'level2-common-principles',
    question: "What effect does limescale have on pipework?",
    options: ["Increases flow", "Improves pressure", "Reduces efficiency", "Improves heat transfer"],
    correctAnswer: "Reduces efficiency",
    explanation: "Limescale builds up inside pipes, restricting flow and reducing heating efficiency."
  },
  {
    id: 'level2common16',
    topic: 'level2-common-principles',
    question: "Which unit is used to measure temperature?",
    options: ["Amps", "Kelvin", "Bar", "Volts"],
    correctAnswer: "Kelvin",
    explanation: "Kelvin is a standard unit of temperature in scientific contexts."
  },
  {
    id: 'level2common17',
    topic: 'level2-common-principles',
    question: "What does a tundish do in plumbing systems?",
    options: ["Prevents blockages", "Allows air release", "Provides visible discharge", "Filters sediment"],
    correctAnswer: "Provides visible discharge",
    explanation: "Tundishes allow users to see when water is discharging from a valve."
  },
  {
    id: 'level2common18',
    topic: 'level2-common-principles',
    question: "Why must pipework be clipped correctly?",
    options: ["To stop water leaks", "To reduce expansion", "To support weight and expansion", "To improve colour coding"],
    correctAnswer: "To support weight and expansion",
    explanation: "Correct clipping prevents sagging and damage from thermal expansion."
  },
  {
    id: 'level2common19',
    topic: 'level2-common-principles',
    question: "What is the role of a pressure reducing valve?",
    options: ["Increase system volume", "Prevent freezing", "Lower inlet pressure", "Filter impurities"],
    correctAnswer: "Lower inlet pressure",
    explanation: "These valves protect systems by reducing incoming mains pressure."
  },
  {
    id: 'level2common20',
    topic: 'level2-common-principles',
    question: "Which property of a fluid determines its flow resistance?",
    options: ["Viscosity", "Conductivity", "Expansion", "Volume"],
    correctAnswer: "Viscosity",
    explanation: "Viscosity describes how resistant a fluid is to flow."
  },
  {
    id: 'level2common21',
    topic: 'level2-common-principles',
    question: "Which safety device protects unvented hot water cylinders from overpressure?",
    options: ["Stop tap", "Expansion vessel", "TPR valve", "Drain cock"],
    correctAnswer: "TPR valve",
    explanation: "Temperature and Pressure Relief (TPR) valves open to release pressure if it becomes too high, protecting the system from failure."
  },
  {
    id: 'level2common22',
    topic: 'level2-common-principles',
    question: "What is the function of an air admittance valve?",
    options: ["Prevent backflow", "Reduce water hammer", "Allow air into system", "Isolate pipework"],
    correctAnswer: "Allow air into system",
    explanation: "These valves allow air in to equalise pressure and prevent siphonage."
  },
  {
    id: 'level2common23',
    topic: 'level2-common-principles',
    question: "How often should pressure in sealed systems be checked?",
    options: ["Monthly", "Annually", "Weekly", "Daily"],
    correctAnswer: "Monthly",
    explanation: "Monthly checks help identify drops that could indicate leaks."
  },
  {
    id: 'level2common24',
    topic: 'level2-common-principles',
    question: "What effect does increasing pipe diameter have on flow rate?",
    options: ["Decreases it", "Increases it", "Has no effect", "Stops it"],
    correctAnswer: "Increases it",
    explanation: "Larger pipes reduce resistance and increase the flow rate."
  },
  {
    id: 'level2common25',
    topic: 'level2-common-principles',
    question: "What happens to water as it freezes?",
    options: ["Contracts", "Stays the same", "Expands", "Becomes less dense"],
    correctAnswer: "Expands",
    explanation: "Water expands when freezing, which can cause pipe bursts."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-common-principles', 'items', q.id), {
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
