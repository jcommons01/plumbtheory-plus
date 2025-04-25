// ✅ COMPLETE: scripts/uploadLevel2ScientificPrinciples.ts with 25 Level 2 questions
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
    id: 'level2sci1',
    topic: 'level2-scientific-principles',
    question: "What is the unit of force in the metric system?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correctAnswer: "Newton",
    explanation: "The Newton (N) is the unit of force in the International System of Units (SI)."
  },
  {
    id: 'level2sci2',
    topic: 'level2-scientific-principles',
    question: "What is the formula to calculate pressure?",
    options: ["Force × Area", "Force ÷ Area", "Area ÷ Force", "Force + Area"],
    correctAnswer: "Force ÷ Area",
    explanation: "Pressure = Force / Area and is measured in Pascals (Pa)."
  },
  {
    id: 'level2sci3',
    topic: 'level2-scientific-principles',
    question: "Which state of matter has a fixed volume but no fixed shape?",
    options: ["Solid", "Liquid", "Gas", "Plasma"],
    correctAnswer: "Liquid",
    explanation: "Liquids have a fixed volume but take the shape of their container."
  },
  {
    id: 'level2sci4',
    topic: 'level2-scientific-principles',
    question: "What property of water allows it to change from liquid to gas when heated?",
    options: ["Condensation", "Evaporation", "Melting", "Sublimation"],
    correctAnswer: "Evaporation",
    explanation: "Evaporation is the process where water changes from liquid to gas."
  },
  {
    id: 'level2sci5',
    topic: 'level2-scientific-principles',
    question: "Which unit measures energy?",
    options: ["Watt", "Amp", "Joule", "Ohm"],
    correctAnswer: "Joule",
    explanation: "The Joule is the standard SI unit for energy."
  },
  {
    id: 'level2sci6',
    topic: 'level2-scientific-principles',
    question: "What is the boiling point of water in Kelvin?",
    options: ["100K", "212K", "373K", "273K"],
    correctAnswer: "373K",
    explanation: "0°C = 273K, so 100°C (boiling point) = 373K."
  },
  {
    id: 'level2sci7',
    topic: 'level2-scientific-principles',
    question: "What is the density formula?",
    options: ["Mass × Volume", "Mass ÷ Volume", "Volume ÷ Mass", "Volume + Mass"],
    correctAnswer: "Mass ÷ Volume",
    explanation: "Density = Mass / Volume, measured in kg/m³ or g/cm³."
  },
  {
    id: 'level2sci8',
    topic: 'level2-scientific-principles',
    question: "What type of energy is stored in hot water?",
    options: ["Kinetic", "Potential", "Thermal", "Mechanical"],
    correctAnswer: "Thermal",
    explanation: "Thermal energy is stored in the form of heat."
  },
  {
    id: 'level2sci9',
    topic: 'level2-scientific-principles',
    question: "What does resistance in an electrical circuit do?",
    options: ["Increase voltage", "Allow flow", "Limit current", "Generate water flow"],
    correctAnswer: "Limit current",
    explanation: "Resistance limits the flow of electrical current and is measured in ohms."
  },
  {
    id: 'level2sci10',
    topic: 'level2-scientific-principles',
    question: "Which law states that pressure increases with depth in a fluid?",
    options: ["Newton's Law", "Pascal's Law", "Boyle's Law", "Hooke's Law"],
    correctAnswer: "Pascal's Law",
    explanation: "Pascal’s Law states that pressure in a fluid increases with depth."
  },
  {
    id: 'level2sci11',
    topic: 'level2-scientific-principles',
    question: "Which property of copper makes it suitable for plumbing?",
    options: ["High resistance", "Non-conductive", "Ductility", "Low density"],
    correctAnswer: "Ductility",
    explanation: "Copper is ductile, allowing it to be easily bent and shaped without breaking."
  },
  {
    id: 'level2sci12',
    topic: 'level2-scientific-principles',
    question: "Which gas law states that pressure and volume are inversely related?",
    options: ["Boyle's Law", "Pascal's Law", "Charles' Law", "Newton's Law"],
    correctAnswer: "Boyle's Law",
    explanation: "Boyle's Law: When temperature is constant, pressure × volume = constant."
  },
  {
    id: 'level2sci13',
    topic: 'level2-scientific-principles',
    question: "What is the SI unit for electrical current?",
    options: ["Watt", "Volt", "Ampere", "Ohm"],
    correctAnswer: "Ampere",
    explanation: "Current is measured in amperes (amps)."
  },
  {
    id: 'level2sci14',
    topic: 'level2-scientific-principles',
    question: "What does a thermometer measure?",
    options: ["Humidity", "Temperature", "Pressure", "Viscosity"],
    correctAnswer: "Temperature",
    explanation: "Thermometers are used to measure the heat level of substances."
  },
  {
    id: 'level2sci15',
    topic: 'level2-scientific-principles',
    question: "What does an increase in temperature do to a liquid’s viscosity?",
    options: ["Increases it", "Has no effect", "Decreases it", "Turns it solid"],
    correctAnswer: "Decreases it",
    explanation: "Heating a liquid reduces its viscosity, making it flow more easily."
  },
  {
    id: 'level2sci16',
    topic: 'level2-scientific-principles',
    question: "Which metal has the highest thermal conductivity?",
    options: ["Copper", "Steel", "Aluminium", "Lead"],
    correctAnswer: "Copper",
    explanation: "Copper is an excellent conductor of heat, ideal for heating systems."
  },
  {
    id: 'level2sci17',
    topic: 'level2-scientific-principles',
    question: "What causes convection currents in water systems?",
    options: ["Wind", "Friction", "Pressure", "Temperature differences"],
    correctAnswer: "Temperature differences",
    explanation: "Warm water rises and cool water sinks, creating movement called convection."
  },
  {
    id: 'level2sci18',
    topic: 'level2-scientific-principles',
    question: "What type of heat transfer occurs through direct contact?",
    options: ["Radiation", "Convection", "Insulation", "Conduction"],
    correctAnswer: "Conduction",
    explanation: "Conduction transfers heat through solid materials by contact."
  },
  {
    id: 'level2sci19',
    topic: 'level2-scientific-principles',
    question: "What is a typical unit used for pressure in plumbing?",
    options: ["Amps", "Ohms", "Pascals", "Watts"],
    correctAnswer: "Pascals",
    explanation: "Pressure is measured in Pascals (Pa), or commonly in bar for plumbing."
  },
  {
    id: 'level2sci20',
    topic: 'level2-scientific-principles',
    question: "Which form of heat transfer occurs in a radiator?",
    options: ["Conduction", "Convection", "Reflection", "Evaporation"],
    correctAnswer: "Convection",
    explanation: "Radiators heat the surrounding air by convection."
  },
  {
    id: 'level2sci21',
    topic: 'level2-scientific-principles',
    question: "What is meant by thermal expansion?",
    options: ["Volume decrease with cooling", "Volume increase with heating", "Mass increase with heating", "Weight increase under pressure"],
    correctAnswer: "Volume increase with heating",
    explanation: "Materials expand in volume as they are heated."
  },
  {
    id: 'level2sci22',
    topic: 'level2-scientific-principles',
    question: "Which material expands the most when heated?",
    options: ["Steel", "Copper", "Plastic", "Water"],
    correctAnswer: "Plastic",
    explanation: "Plastics generally expand more than metals when heated."
  },
  {
    id: 'level2sci23',
    topic: 'level2-scientific-principles',
    question: "What happens to the density of water as it freezes?",
    options: ["It increases", "It stays the same", "It decreases", "It doubles"],
    correctAnswer: "It decreases",
    explanation: "Frozen water (ice) is less dense, which is why it floats."
  },
  {
    id: 'level2sci24',
    topic: 'level2-scientific-principles',
    question: "What does voltage represent in an electrical system?",
    options: ["Flow of electrons", "Amount of resistance", "Potential difference", "Type of wire"],
    correctAnswer: "Potential difference",
    explanation: "Voltage is the potential difference that drives current through a circuit."
  },
  {
    id: 'level2sci25',
    topic: 'level2-scientific-principles',
    question: "What is the effect of increasing pipe length on flow rate?",
    options: ["Increases it", "Decreases it", "No effect", "Doubles it"],
    correctAnswer: "Decreases it",
    explanation: "Longer pipes create more friction, which reduces flow rate."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-scientific-principles', 'items', q.id), {
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
