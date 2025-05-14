// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3ElectricalSciencePrinciples.ts

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
    id: 'electricalscience01',
    question: "What is the unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: "Ohm",
    explanation: "Resistance is measured in ohms (Ω), representing the opposition to current flow in a circuit."
  },
  {
    id: 'electricalscience02',
    question: "What is the formula for calculating current using Ohm’s Law?",
    options: ["I = V × R", "I = V ÷ R", "I = R ÷ V", "I = V + R"],
    correctAnswer: "I = V ÷ R",
    explanation: "Ohm’s Law states that current (I) equals voltage (V) divided by resistance (R)."
  },
  {
    id: 'electricalscience03',
    question: "Which subatomic particle carries a negative charge?",
    options: ["Proton", "Electron", "Neutron", "Positron"],
    correctAnswer: "Electron",
    explanation: "Electrons are negatively charged and flow through conductors to form electric current."
  },
  {
    id: 'electricalscience04',
    question: "What is the effect of increasing resistance in a circuit with constant voltage?",
    options: ["Current increases", "Power increases", "Current decreases", "Voltage drops"],
    correctAnswer: "Current decreases",
    explanation: "According to Ohm’s Law, as resistance increases, current decreases when voltage is constant."
  },
  {
    id: 'electricalscience05',
    question: "What does the symbol ‘μF’ stand for in electrical terms?",
    options: ["Millifarads", "Megafarads", "Microfarads", "Minifarads"],
    correctAnswer: "Microfarads",
    explanation: "μF stands for microfarads, a unit of capacitance equal to one millionth of a farad."
  },
  {
    id: 'electricalscience06',
    question: "What is the frequency of the UK mains electricity supply?",
    options: ["50 Hz", "60 Hz", "100 Hz", "240 Hz"],
    correctAnswer: "50 Hz",
    explanation: "The UK standard mains frequency is 50 hertz, meaning the AC supply changes direction 50 times per second."
  },
  {
    id: 'electricalscience07',
    question: "What happens to the power if both current and voltage are doubled in a resistive load?",
    options: ["Power stays the same", "Power doubles", "Power increases four times", "Power halves"],
    correctAnswer: "Power increases four times",
    explanation: "Power = V × I, so doubling both results in 2V × 2I = 4 × original power."
  },
  {
    id: 'electricalscience08',
    question: "Which material is commonly used as an electrical conductor?",
    options: ["Glass", "Copper", "Rubber", "PVC"],
    correctAnswer: "Copper",
    explanation: "Copper is a highly conductive metal widely used in electrical wiring and components."
  },
  {
    id: 'electricalscience09',
    question: "What is the effect of connecting batteries in series?",
    options: ["Voltage adds, current stays the same", "Current adds, voltage stays the same", "Both add", "Both decrease"],
    correctAnswer: "Voltage adds, current stays the same",
    explanation: "In series, voltages are additive while current remains limited by load resistance."
  },
  {
    id: 'electricalscience10',
    question: "What type of current constantly changes direction?",
    options: ["Direct current", "Alternating current", "Static current", "Resistive current"],
    correctAnswer: "Alternating current",
    explanation: "Alternating current (AC) reverses direction periodically, used in mains electricity."
  },
  {
    id: 'electricalscience11',
    question: "Which law states that the total current entering a junction equals the current leaving?",
    options: ["Ohm’s Law", "Kirchhoff’s Current Law", "Faraday’s Law", "Lenz’s Law"],
    correctAnswer: "Kirchhoff’s Current Law",
    explanation: "KCL states that current entering a node equals the current leaving, maintaining charge conservation."
  },
  {
    id: 'electricalscience12',
    question: "What does power factor measure in an AC circuit?",
    options: ["Apparent power", "Voltage drop", "Efficiency of current usage", "Resistance"],
    correctAnswer: "Efficiency of current usage",
    explanation: "Power factor shows how effectively current is converted into useful work. A PF of 1 is ideal."
  },
  {
    id: 'electricalscience13',
    question: "What unit is used to measure electrical energy consumption?",
    options: ["Watt", "Kilowatt-hour", "Ohm", "Ampere"],
    correctAnswer: "Kilowatt-hour",
    explanation: "Kilowatt-hours (kWh) measure the total energy used over time, common in electricity billing."
  },
  {
    id: 'electricalscience14',
    question: "What is the reactance of a capacitor in an AC circuit?",
    options: ["Opposes voltage", "Constant resistance", "Opposes change in current", "Opposes AC current flow"],
    correctAnswer: "Opposes AC current flow",
    explanation: "Capacitive reactance restricts the flow of alternating current, depending on frequency and capacitance."
  },
  {
    id: 'electricalscience15',
    question: "Which formula calculates power in terms of voltage and resistance?",
    options: ["P = V² ÷ R", "P = V × R", "P = V + R", "P = R ÷ V²"],
    correctAnswer: "P = V² ÷ R",
    explanation: "This rearranged power formula derives from combining Ohm’s Law with P = VI."
  },
  {
    id: 'electricalscience16',
    question: "What happens to current when inductance is introduced to an AC circuit?",
    options: ["Current increases", "Voltage drops", "Current lags voltage", "Current leads voltage"],
    correctAnswer: "Current lags voltage",
    explanation: "Inductive reactance causes current to lag behind voltage in an AC circuit."
  },
  {
    id: 'electricalscience17',
    question: "What is the typical speed of electrical energy through a copper conductor?",
    options: ["10 m/s", "100 m/s", "Close to light speed", "Depends on frequency"],
    correctAnswer: "Close to light speed",
    explanation: "While electrons move slowly, the energy transfer in conductors occurs nearly at the speed of light."
  },
  {
    id: 'electricalscience18',
    question: "Which effect describes voltage induced by changing magnetic fields?",
    options: ["Joule’s effect", "Faraday’s law", "Kirchhoff’s voltage law", "Thermal effect"],
    correctAnswer: "Faraday’s law",
    explanation: "Faraday’s law explains electromagnetic induction—voltage induced in conductors by changing magnetic fields."
  },
  {
    id: 'electricalscience19',
    question: "What is the total resistance of three 4Ω resistors in series?",
    options: ["4Ω", "8Ω", "12Ω", "1.33Ω"],
    correctAnswer: "12Ω",
    explanation: "Resistances in series add directly: 4Ω + 4Ω + 4Ω = 12Ω."
  },
  {
    id: 'electricalscience20',
    question: "What component stores energy in an electric field?",
    options: ["Inductor", "Resistor", "Diode", "Capacitor"],
    correctAnswer: "Capacitor",
    explanation: "Capacitors store energy in the form of an electric field between their plates."
  },
  {
    id: 'electricalscience21',
    question: "Which component opposes changes in current?",
    options: ["Resistor", "Inductor", "Capacitor", "Relay"],
    correctAnswer: "Inductor",
    explanation: "Inductors resist sudden changes in current due to the energy stored in their magnetic field."
  },
  {
    id: 'electricalscience22',
    question: "What does EMF stand for in electrical terms?",
    options: ["Electric Magnetic Flow", "Electron Mass Factor", "Electromotive Force", "Energy Motor Flux"],
    correctAnswer: "Electromotive Force",
    explanation: "EMF refers to the voltage generated by a source such as a battery or generator."
  },
  {
    id: 'electricalscience23',
    question: "What is the unit of inductance?",
    options: ["Henry", "Farad", "Coulomb", "Joule"],
    correctAnswer: "Henry",
    explanation: "Inductance is measured in henries (H), which represents the opposition to changes in current."
  },
  {
    id: 'electricalscience24',
    question: "Which law states the induced EMF in a coil is proportional to rate of flux change?",
    options: ["Ohm’s Law", "Lenz’s Law", "Faraday’s Law", "Coulomb’s Law"],
    correctAnswer: "Faraday’s Law",
    explanation: "Faraday’s Law states EMF is induced proportional to the rate of change of magnetic flux."
  },
  {
    id: 'electricalscience25',
    question: "What type of power is dissipated as heat in resistors?",
    options: ["Reactive power", "Apparent power", "True power", "Harmonic power"],
    correctAnswer: "True power",
    explanation: "True power (P = VI × cosφ) represents real energy consumed by a resistive load and is dissipated as heat."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-science-principles', 'items', q.id), {
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
