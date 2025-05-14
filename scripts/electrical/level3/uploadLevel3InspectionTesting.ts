// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3InspectionTesting.ts

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
    id: 'inspecttest01',
    question: "Which document must be completed after carrying out an initial verification of a new electrical installation?",
    options: [
      "Condition Report",
      "Minor Works Certificate",
      "Electrical Installation Certificate",
      "Risk Assessment Form"
    ],
    correctAnswer: "Electrical Installation Certificate",
    explanation: "An Electrical Installation Certificate is issued following initial verification of a new installation, confirming compliance with BS 7671."
  },
  {
    id: 'inspecttest02',
    question: "What is the purpose of the continuity of protective conductors test?",
    options: ["To check polarity", "To confirm earthing paths are intact", "To measure loop impedance", "To test insulation"],
    correctAnswer: "To confirm earthing paths are intact",
    explanation: "This test ensures protective conductors are correctly connected and capable of carrying fault current safely."
  },
  {
    id: 'inspecttest03',
    question: "Which instrument is typically used to perform an insulation resistance test?",
    options: ["Multimeter", "RCD tester", "Loop tester", "Insulation resistance tester"],
    correctAnswer: "Insulation resistance tester",
    explanation: "An insulation resistance tester applies a high DC voltage and measures resistance between conductors to check for deterioration."
  },
  {
    id: 'inspecttest04',
    question: "What minimum insulation resistance value is acceptable for a 230V circuit?",
    options: ["0.25 MΩ", "0.5 MΩ", "1.0 MΩ", "2.0 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "BS 7671 requires at least 1.0 MΩ for circuits up to 500V when tested at 500V DC."
  },
  {
    id: 'inspecttest05',
    question: "Which test verifies that conductors are correctly connected to their intended terminals?",
    options: ["Continuity", "Earth fault loop impedance", "Polarity", "RCD operation"],
    correctAnswer: "Polarity",
    explanation: "Polarity checks confirm that live, neutral, and earth conductors are connected in the correct terminals."
  },
  {
    id: 'inspecttest06',
    question: "What does a Zs test measure?",
    options: ["Impedance of protective bonding", "Voltage drop", "Earth fault loop impedance", "Circuit resistance"],
    correctAnswer: "Earth fault loop impedance",
    explanation: "Zs represents the total earth fault loop impedance of a circuit and is used to confirm disconnection times."
  },
  {
    id: 'inspecttest07',
    question: "What type of RCD test must be conducted to confirm disconnection within 40ms?",
    options: ["Half rated current", "Full rated current", "5x rated current", "0.5x rated current"],
    correctAnswer: "5x rated current",
    explanation: "At 5 times the rated residual current, the RCD must disconnect in ≤40ms to ensure safety against electric shock."
  },
  {
    id: 'inspecttest08',
    question: "What does a ring final circuit continuity test confirm?",
    options: [
      "Correct phase rotation",
      "Presence of supplementary bonding",
      "Integrity and layout of the ring",
      "Correct circuit identification"
    ],
    correctAnswer: "Integrity and layout of the ring",
    explanation: "This test ensures the ring is continuous, correctly wired, and balanced across the legs."
  },
  {
    id: 'inspecttest09',
    question: "What test voltage is used for insulation resistance testing of a 230V final circuit?",
    options: ["250V DC", "230V AC", "500V DC", "1000V DC"],
    correctAnswer: "500V DC",
    explanation: "According to BS 7671, 500V DC is used for insulation testing of most circuits up to 500V."
  },
  {
    id: 'inspecttest10',
    question: "Which instrument is used to measure prospective short-circuit current (PSCC)?",
    options: ["Continuity tester", "Insulation tester", "Multifunction tester", "Clamp meter"],
    correctAnswer: "Multifunction tester",
    explanation: "Multifunction testers include PSCC testing by measuring impedance and calculating the fault current."
  },
  {
    id: 'inspecttest11',
    question: "What is the purpose of a functional test on an RCD?",
    options: [
      "To test tripping at high current",
      "To verify disconnection time",
      "To confirm mechanical operation",
      "To measure insulation resistance"
    ],
    correctAnswer: "To confirm mechanical operation",
    explanation: "The test button checks the mechanical tripping function and should be used monthly."
  },
  {
    id: 'inspecttest12',
    question: "What must be done before performing an insulation resistance test on a live installation?",
    options: ["Disconnect neutral only", "Disconnect bonding", "Isolate the supply and remove sensitive equipment", "Turn off lights"],
    correctAnswer: "Isolate the supply and remove sensitive equipment",
    explanation: "Testing requires complete isolation to prevent damage to equipment and ensure accurate results."
  },
  {
    id: 'inspecttest13',
    question: "Why is it necessary to test continuity of ring circuit conductors?",
    options: ["To verify voltage drop", "To ensure no parallel paths exist", "To confirm ring is complete and continuous", "To test earth fault loop"],
    correctAnswer: "To confirm ring is complete and continuous",
    explanation: "Continuity tests verify that each conductor in the ring forms a complete loop without breaks."
  },
  {
    id: 'inspecttest14',
    question: "What value should a Zs reading not exceed for a 32A Type B MCB?",
    options: ["1.44Ω", "1.15Ω", "1.82Ω", "2.87Ω"],
    correctAnswer: "1.44Ω",
    explanation: "Based on disconnection time requirements, a 32A Type B MCB should have Zs ≤ 1.44Ω to disconnect in 0.4s."
  },
  {
    id: 'inspecttest15',
    question: "Which schedule must be attached to an Electrical Installation Certificate?",
    options: [
      "Certificate of Conformity",
      "Periodic Inspection Form",
      "Schedule of Test Results",
      "Client Consent Form"
    ],
    correctAnswer: "Schedule of Test Results",
    explanation: "The test schedule documents all measurements and test outcomes as required by BS 7671."
  },
  {
    id: 'inspecttest16',
    question: "Which test verifies the resistance between exposed-conductive-parts and the main earthing terminal?",
    options: ["Bonding test", "R1+R2 test", "Continuity of CPC", "Earth electrode resistance"],
    correctAnswer: "Continuity of CPC",
    explanation: "This confirms that the circuit protective conductor provides a reliable path to earth."
  },
  {
    id: 'inspecttest17',
    question: "What is the maximum disconnection time for a socket-outlet circuit under fault conditions?",
    options: ["5 seconds", "1 second", "0.4 seconds", "0.1 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "BS 7671 requires socket-outlet circuits to disconnect within 0.4s to ensure safety under fault conditions."
  },
  {
    id: 'inspecttest18',
    question: "When performing insulation resistance testing between line and neutral conductors, what should be done?",
    options: ["Leave lamps connected", "Link line and neutral together", "Apply 250V test voltage", "Disconnect CPC"],
    correctAnswer: "Link line and neutral together",
    explanation: "Linking line and neutral tests the combined insulation resistance to earth or CPC."
  },
  {
    id: 'inspecttest19',
    question: "How is a polarity test carried out on a radial circuit?",
    options: ["Measure voltage between earth and neutral", "Test continuity between CPC and phase", "Check continuity from line conductor to each outlet terminal", "Use loop impedance tester on each circuit"],
    correctAnswer: "Check continuity from line conductor to each outlet terminal",
    explanation: "Polarity ensures the line conductor is connected to the correct terminal at each outlet."
  },
  {
    id: 'inspecttest20',
    question: "Which regulation requires initial verification of new electrical installations?",
    options: ["EAWR 1989", "PUWER 1998", "BS 7671 Regulation 610.1", "CDM 2015"],
    correctAnswer: "BS 7671 Regulation 610.1",
    explanation: "Regulation 610.1 states that all new installations must be verified before being energised."
  },
  {
    id: 'inspecttest21',
    question: "What should the reading be on a continuity test of a main protective bonding conductor?",
    options: ["More than 1Ω", "Less than 0.05Ω", "Between 0.5–1.0Ω", "Overload"],
    correctAnswer: "Less than 0.05Ω",
    explanation: "To confirm a reliable connection, the resistance of bonding conductors should be very low—ideally below 0.05Ω."
  },
  {
    id: 'inspecttest22',
    question: "What is a ‘dead test’ in inspection and testing?",
    options: ["Live testing with covers removed", "Functional testing", "Testing while isolated", "Using high current injection"],
    correctAnswer: "Testing while isolated",
    explanation: "Dead testing is performed with the circuit isolated from all sources of electricity."
  },
  {
    id: 'inspecttest23',
    question: "Which fault is likely present if a Zs value is too high?",
    options: ["Short circuit", "Open circuit CPC", "Incorrect polarity", "Overvoltage"],
    correctAnswer: "Open circuit CPC",
    explanation: "A broken or disconnected CPC increases Zs and compromises fault disconnection."
  },
  {
    id: 'inspecttest24',
    question: "What is the minimum insulation resistance required between live conductors in a new single-phase circuit?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "BS 7671 mandates 1.0 MΩ minimum between line and neutral in new circuits."
  },
  {
    id: 'inspecttest25',
    question: "What test must be performed before re-energising an installation?",
    options: ["Functional test", "RCD ramp test", "Insulation resistance test", "Earth electrode test"],
    correctAnswer: "Insulation resistance test",
    explanation: "Insulation testing ensures the system is safe from faults before being energised."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-inspection-testing', 'items', q.id), {
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
