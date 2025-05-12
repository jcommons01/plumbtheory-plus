// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2ElectricalSciencePrinciples.ts

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

// ✅ Level 2 Electrical Science & Principles Questions
const questions = [
  {
    id: 'level2elecsci1',
    question: "What is Ohm's Law?",
    options: ["Current equals voltage divided by resistance", "Voltage equals current multiplied by resistance", "Resistance equals current divided by voltage", "Power equals voltage multiplied by current"],
    correctAnswer: "Voltage equals current multiplied by resistance",
    explanation: "Ohm's Law states that V = I × R, where V is voltage (in volts), I is current (in amperes), and R is resistance (in ohms)."
  },
  {
    id: 'level2elecsci2',
    question: "What is the unit of electrical resistance?",
    options: ["Ampere", "Volt", "Watt", "Ohm"],
    correctAnswer: "Ohm",
    explanation: "Resistance is measured in ohms (Ω), which represents how much a material opposes the flow of electric current."
  },
  {
    id: 'level2elecsci3',
    question: "What does the letter 'I' represent in electrical formulas?",
    options: ["Impedance", "Current", "Insulation", "Inductance"],
    correctAnswer: "Current",
    explanation: "In electrical formulas, 'I' traditionally represents current, measured in amperes (A)."
  },
  {
    id: 'level2elecsci4',
    question: "What is the formula for electrical power?",
    options: ["P = I × R", "P = V × I", "P = V ÷ I", "P = I² × R"],
    correctAnswer: "P = V × I",
    explanation: "Power (P) = Voltage (V) × Current (I) is the basic formula. Other valid variations, such as P = I²R and P = V²/R, are derived from Ohm’s Law."
  },  
  {
    id: 'level2elecsci5',
    question: "What is the relationship between frequency and wavelength in electromagnetic waves?",
    options: ["They are the same", "Frequency equals wavelength", "Frequency multiplied by wavelength equals the speed of light", "Frequency divided by wavelength equals the speed of light"],
    correctAnswer: "Frequency multiplied by wavelength equals the speed of light",
    explanation: "For electromagnetic waves, the speed of light equals frequency × wavelength (c = fλ)."
  },
  {
    id: 'level2elecsci6',
    question: "What is the primary difference between AC and DC electricity?",
    options: ["AC is safer than DC", "DC has higher voltage than AC", "AC periodically changes direction while DC flows in one direction", "DC is used in homes while AC is used in industry"],
    correctAnswer: "AC periodically changes direction while DC flows in one direction",
    explanation: "Alternating Current (AC) periodically changes direction, typically in a sinusoidal waveform, while Direct Current (DC) flows consistently in one direction."
  },
  {
    id: 'level2elecsci7',
    question: "What is the standard domestic supply voltage in the UK?",
    options: ["110V", "220V", "230V", "240V"],
    correctAnswer: "230V",
    explanation: "The UK standard nominal voltage is 230V AC (±10%) at 50Hz, although historically it was 240V and many installations still operate closer to 240V."
  },
  {
    id: 'level2elecsci8',
    question: "Which of these materials is the best conductor of electricity?",
    options: ["Rubber", "Copper", "Wood", "Plastic"],
    correctAnswer: "Copper",
    explanation: "Copper is an excellent electrical conductor with low resistance, which is why it's commonly used in electrical wiring."
  },
  {
    id: 'level2elecsci9',
    question: "What happens to current in a series circuit?",
    options: ["It divides between components", "It is different at each component", "It is the same throughout the circuit", "It doubles after each component"],
    correctAnswer: "It is the same throughout the circuit",
    explanation: "In a series circuit, the same current flows through each component as there is only one path for the current to follow."
  },
  {
    id: 'level2elecsci10',
    question: "What happens to voltage in a parallel circuit?",
    options: ["It is divided among the components", "It is the same across each parallel branch", "It increases with each component", "It depends on the resistance"],
    correctAnswer: "It is the same across each parallel branch",
    explanation: "In a parallel circuit, the voltage across each parallel branch is the same, regardless of the components in each branch."
  },
  {
    id: 'level2elecsci11',
    question: "What is Kirchhoff's Current Law?",
    options: ["Current equals voltage divided by resistance", "The algebraic sum of currents at any node is zero", "Voltage equals current multiplied by resistance", "The sum of voltage drops equals the supply voltage"],
    correctAnswer: "The algebraic sum of currents at any node is zero",
    explanation: "Kirchhoff's Current Law states that the sum of currents entering a node equals the sum of currents leaving it, or that the algebraic sum of all currents at a node is zero."
  },
  {
    id: 'level2elecsci12',
    question: "What is the effect of connecting resistors in series?",
    options: ["The total resistance decreases", "The total resistance is the average of all resistors", "The total resistance increases", "The total resistance remains the same"],
    correctAnswer: "The total resistance increases",
    explanation: "When resistors are connected in series, the total resistance is the sum of the individual resistances: R₁ + R₂ + R₃ + ..."
  },
  {
    id: 'level2elecsci13',
    question: "What is the effect of connecting capacitors in parallel?",
    options: ["The total capacitance decreases", "The total capacitance is the average", "The total capacitance increases", "The total capacitance remains the same"],
    correctAnswer: "The total capacitance increases",
    explanation: "When capacitors are connected in parallel, the total capacitance is the sum of the individual capacitances: C₁ + C₂ + C₃ + ..."
  },
  {
    id: 'level2elecsci14',
    question: "What is the purpose of a transformer?",
    options: ["To convert AC to DC", "To convert DC to AC", "To change voltage levels in AC circuits", "To store electrical energy"],
    correctAnswer: "To change voltage levels in AC circuits",
    explanation: "Transformers use electromagnetic induction to transfer electrical energy between circuits while changing voltage levels, but they only work with alternating current."
  },
  {
    id: 'level2elecsci15',
    question: "What is the typical frequency of the UK electrical supply?",
    options: ["50 Hz", "60 Hz", "100 Hz", "230 Hz"],
    correctAnswer: "50 Hz",
    explanation: "The standard frequency of the UK electrical supply is 50 Hertz (Hz), meaning the current completes 50 cycles per second."
  },
  {
    id: 'level2elecsci16',
    question: "What does the term 'power factor' describe?",
    options: ["The cost of electricity", "The ratio of real power to apparent power", "The efficiency of a circuit", "The maximum power output"],
    correctAnswer: "The ratio of real power to apparent power",
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA). A power factor close to 1 indicates efficient use of electrical power."
  },  
  {
    id: 'level2elecsci17',
    question: "What does impedance measure in an AC circuit?",
    options: ["Current flow only", "Opposition to current flow including resistance and reactance", "Voltage only", "Power factor"],
    correctAnswer: "Opposition to current flow including resistance and reactance",
    explanation: "Impedance (Z) measures the total opposition to current flow in an AC circuit, combining resistance (R) and reactance (X) in ohms."
  },
  {
    id: 'level2elecsci18',
    question: "What is Faraday's Law related to?",
    options: ["Resistance in circuits", "Electrical currents in solutions", "Electromagnetic induction", "Power distribution"],
    correctAnswer: "Electromagnetic induction",
    explanation: "Faraday's Law describes how a changing magnetic field induces an electromotive force (EMF) in a conductor, the principle behind generators and transformers."
  },
  {
    id: 'level2elecsci19',
    question: "What unit is used to measure electrical energy consumption?",
    options: ["Watt", "Ampere", "Kilowatt-hour", "Volt"],
    correctAnswer: "Kilowatt-hour",
    explanation: "Electrical energy consumption is measured in kilowatt-hours (kWh), representing the use of 1 kilowatt of power for 1 hour."
  },
  {
    id: 'level2elecsci20',
    question: "What is the function of a diode in a circuit?",
    options: ["To amplify signals", "To allow current to flow in one direction only", "To store electrical charge", "To increase resistance"],
    correctAnswer: "To allow current to flow in one direction only",
    explanation: "Diodes act as one-way valves for electricity, allowing current to flow in one direction (forward bias) but blocking it in the opposite direction (reverse bias)."
  },
  {
    id: 'level2elecsci21',
    question: "What is the formula for calculating the total resistance of two resistors in parallel?",
    options: ["R = R₁ + R₂", "R = R₁ × R₂", "1/R = 1/R₁ + 1/R₂", "R = (R₁ + R₂)/2"],
    correctAnswer: "1/R = 1/R₁ + 1/R₂",
    explanation: "For resistors in parallel, the reciprocal of the total resistance equals the sum of the reciprocals of the individual resistances."
  },  
  {
    id: 'level2elecsci22',
    question: "What is electrical inductance?",
    options: ["The ability to store energy in an electric field", "Opposition to current flow", "The ability to store energy in a magnetic field", "The flow of electrons"],
    correctAnswer: "The ability to store energy in a magnetic field",
    explanation: "Inductance is a property of an electrical conductor to store energy in a magnetic field when current flows through it, measured in henries (H)."
  },
  {
    id: 'level2elecsci23',
    question: "What principle explains how a transformer works?",
    options: ["Ohm's Law", "Electromagnetic induction", "Thermal conduction", "Capacitive reactance"],
    correctAnswer: "Electromagnetic induction",
    explanation: "Transformers work on the principle of electromagnetic induction, where changing current in one coil induces voltage in another coil through a shared magnetic field."
  },
  {
    id: 'level2elecsci24',
    question: "What is the relationship between voltage, current and resistance in a circuit?",
    options: ["They are independent", "Voltage equals current divided by resistance", "Current equals voltage multiplied by resistance", "Current equals voltage divided by resistance"],
    correctAnswer: "Current equals voltage divided by resistance",
    explanation: "According to Ohm's Law, current (I) = voltage (V) ÷ resistance (R), meaning current increases with higher voltage and decreases with higher resistance."
  },
  {
    id: 'level2elecsci25',
    question: "What does the term 'three-phase' refer to in electrical distribution?",
    options: ["Three different voltage levels", "Three separate earthing systems", "Three AC voltages with 120° phase difference", "Three types of current"],
    correctAnswer: "Three AC voltages with 120° phase difference",
    explanation: "Three-phase power consists of three AC voltages of equal magnitude but with phase angles separated by 120°, providing more efficient power transmission and steady power delivery."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l2-science-principles', 'items', q.id), {
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
