// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3FaultDiagnosisRectification.ts

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
    id: 'faultdiagnosis01',
    question: "A lighting circuit keeps tripping the MCB when switched on. What is the most likely cause?",
    options: ["High resistance joint", "Short circuit", "Open circuit", "Loose neutral"],
    correctAnswer: "Short circuit",
    explanation: "A short circuit between live conductors will cause an overcurrent that trips the MCB immediately when switched on."
  },
  {
    id: 'faultdiagnosis02',
    question: "What is the correct instrument for detecting a high resistance joint in a ring final circuit?",
    options: ["RCD tester", "Voltage tester", "Low ohm continuity tester", "Earth loop tester"],
    correctAnswer: "Low ohm continuity tester",
    explanation: "High resistance joints can be found using low ohm continuity testing, comparing resistance values around the ring."
  },
  {
    id: 'faultdiagnosis03',
    question: "A socket outlet shows reversed polarity. What is the likely fault?",
    options: ["CPC open", "Live and neutral reversed", "RCD fault", "Ring not completed"],
    correctAnswer: "Live and neutral reversed",
    explanation: "Reversed polarity typically results from live and neutral conductors being swapped at a connection point."
  },
  {
    id: 'faultdiagnosis04',
    question: "Which test would identify a break in the CPC of a ring final circuit?",
    options: ["Polarity test", "Continuity of CPC", "Insulation resistance", "Zs test"],
    correctAnswer: "Continuity of CPC",
    explanation: "A continuity test confirms the presence and integrity of the circuit protective conductor throughout the ring."
  },
  {
    id: 'faultdiagnosis05',
    question: "What is the first step before carrying out fault diagnosis on a circuit?",
    options: ["Remove MCB", "Check documentation", "Isolate the circuit", "Disconnect all loads"],
    correctAnswer: "Isolate the circuit",
    explanation: "For safety, circuits must always be isolated and proven dead before fault finding begins."
  },
  {
    id: 'faultdiagnosis06',
    question: "What is a symptom of a neutral-earth fault on a TN system?",
    options: ["Lights dimming", "MCB trips on load", "RCD tripping", "Voltage drop at board"],
    correctAnswer: "RCD tripping",
    explanation: "Neutral-to-earth faults bypass the RCD, causing imbalance between live and neutral, triggering a trip."
  },
  {
    id: 'faultdiagnosis07',
    question: "During fault finding, a circuit reads 0Ω between live and neutral. What does this indicate?",
    options: ["High resistance fault", "No fault", "Short circuit", "RCD operation"],
    correctAnswer: "Short circuit",
    explanation: "A 0Ω reading between live and neutral typically indicates a dead short, causing protective device operation."
  },
  {
    id: 'faultdiagnosis08',
    question: "Which fault is most likely if a consumer reports frequent bulb failures in one room?",
    options: ["Overvoltage", "Loose neutral", "CPC disconnection", "MCB too large"],
    correctAnswer: "Overvoltage",
    explanation: "Sustained overvoltage can reduce lamp life significantly, especially in filament or halogen lamps."
  },
  {
    id: 'faultdiagnosis09',
    question: "What fault is indicated by a Zs reading significantly above expected values?",
    options: ["Open circuit CPC", "High loop impedance", "MCB failure", "Reverse polarity"],
    correctAnswer: "High loop impedance",
    explanation: "A high Zs indicates a possible high resistance in the line or CPC path, affecting disconnection times."
  },
  {
    id: 'faultdiagnosis10',
    question: "What would cause an MCB to trip immediately after connecting an appliance?",
    options: ["Excessive voltage", "Loose terminal", "Earth leakage", "Short circuit in appliance"],
    correctAnswer: "Short circuit in appliance",
    explanation: "If the appliance has internal shorting, it can cause an overcurrent trip as soon as it's energised."
  },
  {
    id: 'faultdiagnosis11',
    question: "What is the most appropriate test to confirm an insulation breakdown between live and earth?",
    options: ["Continuity test", "Polarity test", "Insulation resistance test", "Loop impedance test"],
    correctAnswer: "Insulation resistance test",
    explanation: "Insulation resistance tests measure the resistance between conductors and earth, highlighting breakdowns."
  },
  {
    id: 'faultdiagnosis12',
    question: "A ring final circuit has low resistance on one leg only. What does this suggest?",
    options: ["Short circuit", "Open ring", "Reverse polarity", "CPC fault"],
    correctAnswer: "Open ring",
    explanation: "A reading from only one leg of a ring indicates that the ring is not complete—an open ring fault."
  },
  {
    id: 'faultdiagnosis13',
    question: "What is a common cause of overheating at a switch connection?",
    options: ["Low voltage", "Loose terminal", "CPC disconnection", "Undersized cable"],
    correctAnswer: "Loose terminal",
    explanation: "Loose connections cause increased resistance, generating heat under load."
  },
  {
    id: 'faultdiagnosis14',
    question: "What result would a high resistance reading between neutral and earth indicate?",
    options: ["Normal condition", "Short circuit", "Reverse polarity", "Earth fault"],
    correctAnswer: "Normal condition",
    explanation: "There should be high resistance between neutral and earth unless a fault is present."
  },
  {
    id: 'faultdiagnosis15',
    question: "Which test helps verify polarity in a completed circuit?",
    options: ["Insulation resistance", "Continuity", "Voltage between line and CPC", "Zs test"],
    correctAnswer: "Voltage between line and CPC",
    explanation: "A correct polarity will show 230V between live and CPC; reversed connections may show anomalies."
  },
  {
    id: 'faultdiagnosis16',
    question: "A consumer unit RCD trips at random. What is the likely cause?",
    options: ["Incorrect fuse rating", "Earth leakage from an appliance", "Open neutral", "Blown lamp"],
    correctAnswer: "Earth leakage from an appliance",
    explanation: "Intermittent leakage from faulty appliances can trigger RCDs randomly."
  },
  {
    id: 'faultdiagnosis17',
    question: "Why might a radial circuit's MCB trip only under load?",
    options: ["High resistance fault", "Shorted CPC", "Overloaded circuit", "Open neutral"],
    correctAnswer: "Overloaded circuit",
    explanation: "Overcurrent protection responds to sustained loads exceeding the rated current of the MCB."
  },
  {
    id: 'faultdiagnosis18',
    question: "What is indicated by fluctuating voltage at a socket outlet?",
    options: ["Loose connection", "Correct operation", "Earth fault", "Underrated MCB"],
    correctAnswer: "Loose connection",
    explanation: "Intermittent contact from loose terminals causes unstable voltage output."
  },
  {
    id: 'faultdiagnosis19',
    question: "What does a reading of 0V between neutral and earth at a socket mean?",
    options: ["Normal condition", "Open neutral", "RCD fault", "Reversed polarity"],
    correctAnswer: "Normal condition",
    explanation: "In a properly functioning system, the potential difference between neutral and earth should be minimal."
  },
  {
    id: 'faultdiagnosis20',
    question: "What tool can detect a loose terminal connection during inspection?",
    options: ["Clamp meter", "Insulation tester", "Infrared thermometer", "Multifunction tester"],
    correctAnswer: "Infrared thermometer",
    explanation: "Loose terminals generate heat, which can be detected with an infrared thermometer before failure."
  },
  {
    id: 'faultdiagnosis21',
    question: "A cooker trips the RCD after a few minutes of use. What is the likely fault?",
    options: ["Short circuit", "Loose live", "Earth leakage when heated", "Incorrect fuse"],
    correctAnswer: "Earth leakage when heated",
    explanation: "Moisture or breakdown in heating elements can cause leakage current after warming up."
  },
  {
    id: 'faultdiagnosis22',
    question: "What would cause low insulation resistance readings across conductors?",
    options: ["Wet conditions", "Incorrect polarity", "High Zs", "Undersized CPC"],
    correctAnswer: "Wet conditions",
    explanation: "Moisture reduces the insulation resistance between conductors, possibly leading to earth faults."
  },
  {
    id: 'faultdiagnosis23',
    question: "A distribution board has frequent nuisance tripping. What is the first step in diagnosing the issue?",
    options: ["Replace MCB", "Isolate circuits individually", "Replace RCD", "Install surge protection"],
    correctAnswer: "Isolate circuits individually",
    explanation: "Isolating circuits one-by-one helps identify which is responsible for the nuisance tripping."
  },
  {
    id: 'faultdiagnosis24',
    question: "A socket circuit has a high Zs reading but all connections appear sound. What next?",
    options: ["Increase MCB rating", "Check for broken conductor strands", "Install new CPC", "Replace socket faceplate"],
    correctAnswer: "Check for broken conductor strands",
    explanation: "Damaged conductors inside insulation may not be visible but cause increased impedance."
  },
  {
    id: 'faultdiagnosis25',
    question: "What does a polarity test confirm?",
    options: ["Continuity of CPC", "Correct conductor termination", "Zs compliance", "RCD operation"],
    correctAnswer: "Correct conductor termination",
    explanation: "Polarity testing ensures line, neutral, and CPC conductors are connected to the correct terminals throughout."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-fault-diagnosis', 'items', q.id), {
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
