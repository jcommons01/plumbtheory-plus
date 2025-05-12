// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2InitialVerificationTesting.ts

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

// ✅ Level 2 Initial Verification & Testing Questions
const questions = [
  {
    id: 'level2testing1',
    question: "What is the primary purpose of conducting an insulation resistance test?",
    options: ["To measure the resistance of the earthing conductor", "To verify the circuit is dead", "To confirm adequate separation between live conductors and earth", "To test RCD operation"],
    correctAnswer: "To confirm adequate separation between live conductors and earth",
    explanation: "Insulation resistance testing confirms that there is adequate electrical separation (insulation) between live conductors and earth, ensuring the insulation is not damaged or deteriorated."
  },
  {
    id: 'level2testing2',
    question: "What minimum insulation resistance value is acceptable for a 230V circuit according to BS 7671?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10.0 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "For circuits up to 500V (including standard 230V circuits), the minimum acceptable insulation resistance value is 1.0 MΩ according to BS 7671."
  },
  {
    id: 'level2testing3',
    question: "What does the continuity test of protective conductors verify?",
    options: ["Insulation quality between live parts", "The complete circuit of live conductors", "The continuous path of protective conductors", "The operation of circuit breakers"],
    correctAnswer: "The continuous path of protective conductors",
    explanation: "The continuity test verifies that protective conductors (earth paths) provide a continuous, low-resistance path back to the main earthing terminal, ensuring they can carry fault currents safely."
  },
  {
    id: 'level2testing4',
    question: "In which order is polarity testing typically performed in the test sequence?",
    options: ["Before earth fault loop impedance testing", "After RCD testing", "Before insulation resistance testing", "After continuity testing but before insulation resistance testing"],
    correctAnswer: "After continuity testing but before insulation resistance testing",
    explanation: "Polarity testing typically follows continuity testing but precedes insulation resistance testing in the recommended test sequence to ensure connections are correct before higher voltages are applied."
  },
  {
    id: 'level2testing5',
    question: "What must be verified during visual inspection of an electrical installation?",
    options: ["Only the main earthing connections", "Only the consumer unit components", "Only socket outlet connections", "All accessible electrical components for conformity with regulations"],
    correctAnswer: "All accessible electrical components for conformity with regulations",
    explanation: "Visual inspection must check all accessible parts of the installation to verify they meet relevant safety standards, are correctly selected and erected, and show no visible damage."
  },
  {
    id: 'level2testing6',
    question: "What test instrument is used to measure earth fault loop impedance?",
    options: ["Insulation resistance tester", "Earth fault loop impedance tester", "Continuity tester", "RCD tester"],
    correctAnswer: "Earth fault loop impedance tester",
    explanation: "An earth fault loop impedance tester is specifically designed to measure the impedance of the complete earth fault current path, which is crucial for verifying that protective devices will operate within required disconnection times."
  },
  {
    id: 'level2testing7',
    question: "What is the purpose of functional testing during verification?",
    options: ["To measure voltage levels", "To verify that assemblies and equipment function correctly", "To check insulation quality", "To test earthing only"],
    correctAnswer: "To verify that assemblies and equipment function correctly",
    explanation: "Functional testing ensures that assemblies and equipment (such as switches, controls, interlocks, and RCDs) operate correctly as intended and in accordance with relevant specifications."
  },
  {
    id: 'level2testing8',
    question: "What is the correct test voltage for insulation resistance testing on a 230V installation?",
    options: ["230V", "400V", "500V", "1000V"],
    correctAnswer: "500V",
    explanation: "For low voltage installations rated up to 500V (including standard 230V systems), the test voltage for insulation resistance should be 500V DC according to BS 7671."
  },
  {
    id: 'level2testing9',
    question: "What should be disconnected before conducting insulation resistance tests?",
    options: ["Main switch only", "Electronic devices that could be damaged by the test voltage", "All circuit breakers", "Earth connections"],
    correctAnswer: "Electronic devices that could be damaged by the test voltage",
    explanation: "Electronic devices and sensitive equipment that could be damaged by the high DC test voltage should be disconnected before conducting insulation resistance tests."
  },
  {
    id: 'level2testing10',
    question: "What certificate must be issued following the initial verification of a new domestic installation?",
    options: ["Minor Works Certificate", "Electrical Installation Condition Report", "Electrical Installation Certificate", "Periodic Inspection Report"],
    correctAnswer: "Electrical Installation Certificate",
    explanation: "An Electrical Installation Certificate (EIC) must be issued following the initial verification of a new installation to certify that it meets the requirements of BS 7671."
  },
  {
    id: 'level2testing11',
    question: "What does a value of 0.00 Ω on a continuity test of a protective conductor usually indicate?",
    options: ["Perfect continuity", "Broken conductor", "Likely test meter error or short circuit", "Highly efficient conductor"],
    correctAnswer: "Likely test meter error or short circuit",
    explanation: "A reading of exactly 0.00 Ω often indicates a test meter error, a shorted test lead, or a short circuit in the wiring."
  },
  {
    id: 'level2testing12',
    question: "What is the maximum permitted value of earth fault loop impedance (Zs) for a 32A Type B MCB protecting a socket outlet circuit?",
    options: ["0.4 Ω", "0.8 Ω", "1.09 Ω", "1.44 Ω"],
    correctAnswer: "1.44 Ω",
    explanation: "For a 32A Type B MCB, the maximum permitted Zs value is 1.44 Ω, calculated based on the disconnection time requirements in BS 7671 for socket outlet circuits."
  },
  {
    id: 'level2testing13',
    question: "When measuring the continuity of a ring final circuit, what does it indicate if the end-to-end resistance of the line conductors differs significantly from the neutral conductors?",
    options: ["Normal operation", "Interconnected ring", "Reversed polarity", "Broken ring"],
    correctAnswer: "Broken ring",
    explanation: "A significant difference between line and neutral end-to-end resistance in a ring circuit typically indicates a broken ring where one of the conductors has a discontinuity."
  },
  {
    id: 'level2testing14',
    question: "What is the maximum disconnection time for a 230V circuit supplying a socket outlet in a domestic installation?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "No specific requirement"],
    correctAnswer: "0.4 seconds",
    explanation: "For socket outlet circuits in TN systems operating at 230V, the maximum disconnection time is 0.4 seconds according to BS 7671."
  },
  {
    id: 'level2testing15',
    question: "When testing an RCD with a rated residual operating current of 30 mA, what is the maximum permitted operating time at 150 mA test current (5x IΔn)?",
    options: ["30 ms", "40 ms", "150 ms", "300 ms"],
    correctAnswer: "40 ms",
    explanation: "For a general-purpose 30 mA RCD, the maximum permitted operating time when tested at 5 times its rated current (150 mA) is 40 milliseconds according to BS 7671."
  },
  {
    id: 'level2testing16',
    question: "What colour is typically used for the earth test lead on standard UK electrical test equipment?",
    options: ["Red", "Blue", "Brown", "Green or Green/Yellow"],
    correctAnswer: "Green or Green/Yellow",
    explanation: "On standard UK test equipment, the earth test lead is usually green or green/yellow, matching the colour coding for protective (earth) conductors in electrical installations."
  },
  {
    id: 'level2testing17',
    question: "What is the R1+R2 value representing in circuit testing?",
    options: ["The sum of the phase conductor and protective conductor resistances", "The residual current device rating", "The resistance of the main equipotential bonding", "The resistance of the supplier's earth"],
    correctAnswer: "The sum of the phase conductor and protective conductor resistances",
    explanation: "R1+R2 represents the sum of the phase conductor resistance (R1) and the protective conductor resistance (R2) of the circuit under test, which is a key factor in earth fault loop impedance."
  },
  {
    id: 'level2testing18',
    question: "What is the purpose of the 'prospective fault current' test?",
    options: ["To measure the maximum current that could flow under short-circuit conditions", "To test RCD sensitivity", "To check the continuity of protective conductors", "To measure insulation resistance"],
    correctAnswer: "To measure the maximum current that could flow under short-circuit conditions",
    explanation: "The prospective fault current test measures the maximum current that could flow under short-circuit or earth fault conditions, ensuring protective devices have adequate breaking capacity."
  },
  {
    id: 'level2testing19',
    question: "Which of the following tests requires the installation to be energised?",
    options: ["Insulation resistance test", "Continuity of protective conductors", "Earth fault loop impedance test", "Polarity check using continuity method"],
    correctAnswer: "Earth fault loop impedance test",
    explanation: "Earth fault loop impedance testing must be carried out on an energised installation to measure the actual impedance of the fault loop path under real voltage conditions."
  },  
  {
    id: 'level2testing20',
    question: "What should be done before carrying out the 'dead testing' phase of initial verification?",
    options: ["Complete an Electrical Installation Certificate", "Energise the installation", "Isolate the installation from the supply", "Test all RCDs"],
    correctAnswer: "Isolate the installation from the supply",
    explanation: "Before carrying out dead testing (continuity, insulation resistance, etc.), the installation must be safely isolated from the supply to prevent electric shock and ensure accurate results."
  },
  {
    id: 'level2testing21',
    question: "What does the 'R2' value specifically represent in circuit testing?",
    options: ["The resistance of the phase conductor", "The resistance of the neutral conductor", "The resistance of the protective conductor", "The resistance of the supply transformer"],
    correctAnswer: "The resistance of the protective conductor",
    explanation: "R2 specifically represents the resistance of the protective conductor (earth) from the point of test back to the source, which is essential for ensuring fault currents can flow safely."
  },
  {
    id: 'level2testing22',
    question: "When is it necessary to complete a Schedule of Inspections as part of initial verification?",
    options: ["Only for commercial installations", "Only when requested by the client", "For all electrical installations", "Only when defects are found"],
    correctAnswer: "For all electrical installations",
    explanation: "A Schedule of Inspections must be completed for all electrical installations as part of the initial verification process, documenting that all required inspection items have been checked."
  },
  {
    id: 'level2testing23',
    question: "What is the correct sequence for testing a new domestic installation?",
    options: ["Visual inspection, then any order for the other tests", "Energised tests first, then dead tests", "Dead tests first, then energised tests", "RCD tests, then all other tests"],
    correctAnswer: "Dead tests first, then energised tests",
    explanation: "The correct testing sequence is visual inspection, followed by dead tests (continuity, insulation resistance, polarity), and then energised tests (earth fault loop impedance, RCD operation, functional testing)."
  },
  {
    id: 'level2testing24',
    question: "When conducting a polarity test, what is being verified?",
    options: ["The voltage level is correct", "The connections to neutral are secure", "All switches and fuses are connected in the line conductor", "The phase sequence is correct"],
    correctAnswer: "All switches and fuses are connected in the line conductor",
    explanation: "Polarity testing verifies that all switches and fuses are connected in the line (live) conductor, single-pole devices are connected in the line not neutral, and that all socket outlets and similar accessories are correctly wired."
  },
  {
    id: 'level2testing25',
    question: "What is the minimum acceptable reading when testing the insulation resistance between interconnected live conductors and earth for a SELV circuit?",
    options: ["0.25 MΩ", "0.5 MΩ", "1.0 MΩ", "0.25 MΩ"],
    correctAnswer: "0.5 MΩ",
    explanation: "For SELV (Safety Extra-Low Voltage) circuits, the minimum acceptable insulation resistance between interconnected live conductors and earth is 0.5 MΩ according to BS 7671."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l2-testing', 'items', q.id), {
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
