// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3EarthingBonding.ts

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
    id: 'earthingbonding01',
    question: "What is the main purpose of earthing in an electrical installation?",
    options: ["To reduce energy costs", "To ensure continuity of supply", "To protect against electric shock", "To improve voltage drop"],
    correctAnswer: "To protect against electric shock",
    explanation: "Earthing ensures exposed conductive parts do not reach dangerous voltages during a fault by providing a low-resistance path to earth."
  },
  {
    id: 'earthingbonding02',
    question: "Which BS 7671 regulation covers main protective bonding conductors?",
    options: ["Regulation 411.3.1.2", "Regulation 544.1.1", "Regulation 522.6.5", "Regulation 132.16"],
    correctAnswer: "Regulation 544.1.1",
    explanation: "Regulation 544.1.1 provides requirements for the size and installation of main protective bonding conductors."
  },
  {
    id: 'earthingbonding03',
    question: "What is the minimum size of main protective bonding conductor for 25mm² meter tails?",
    options: ["10mm²", "6mm²", "16mm²", "4mm²"],
    correctAnswer: "10mm²",
    explanation: "BS 7671 Table 54.8 requires a minimum of 10mm² for bonding where line or neutral conductors are 25mm² or less."
  },
  {
    id: 'earthingbonding04',
    question: "What does ADS stand for in relation to earthing systems?",
    options: ["Automatic Demand Shutdown", "Active Device Switching", "Automatic Disconnection of Supply", "Alternative Disconnection Source"],
    correctAnswer: "Automatic Disconnection of Supply",
    explanation: "ADS ensures the supply disconnects quickly in a fault, limiting touch voltages and preventing electric shock."
  },
  {
    id: 'earthingbonding05',
    question: "What is the minimum insulation resistance for earth continuity conductors?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "Not applicable"],
    correctAnswer: "Not applicable",
    explanation: "Insulation resistance testing is for live conductors. Earth continuity conductors are tested for continuity, not insulation."
  },
  {
    id: 'earthingbonding06',
    question: "What is the main function of a circuit protective conductor (CPC)?",
    options: ["To carry load current", "To bond metalwork", "To carry fault current", "To reduce voltage drop"],
    correctAnswer: "To carry fault current",
    explanation: "The CPC provides a path for fault current to flow back to the supply, enabling protective devices to disconnect the circuit."
  },
  {
    id: 'earthingbonding07',
    question: "Which conductor links all exposed conductive parts to the main earthing terminal?",
    options: ["Bonding conductor", "Earthing conductor", "Protective conductor", "Main protective bonding conductor"],
    correctAnswer: "Earthing conductor",
    explanation: "The earthing conductor connects the installation’s main earthing terminal to the earthing arrangement (e.g., TN-C-S supply)."
  },
  {
    id: 'earthingbonding08',
    question: "What type of earthing system uses a local electrode connected to the installation?",
    options: ["TN-C-S", "TT", "TN-S", "IT"],
    correctAnswer: "TT",
    explanation: "In TT systems, the earth for the installation is provided via a local earth electrode rather than from the supply."
  },
  {
    id: 'earthingbonding09',
    question: "What is the adiabatic equation used to size?",
    options: ["Live conductors", "Earthing conductors", "Bonding clamps", "RCDs"],
    correctAnswer: "Earthing conductors",
    explanation: "The adiabatic equation ensures the earthing conductor can safely carry fault current without damage during disconnection time."
  },
  {
    id: 'earthingbonding10',
    question: "Which test confirms continuity of the main earthing conductor?",
    options: ["Insulation resistance", "Polarity", "Continuity of protective conductors", "Earth fault loop impedance"],
    correctAnswer: "Continuity of protective conductors",
    explanation: "This test checks that CPCs and bonding conductors form a complete low-resistance path back to the MET."
  },
  {
    id: 'earthingbonding11',
    question: "What must be connected by main protective bonding in TN systems?",
    options: ["Lighting points only", "Sockets only", "Extraneous-conductive parts", "Appliances"],
    correctAnswer: "Extraneous-conductive parts",
    explanation: "Main bonding connects extraneous-conductive parts such as water and gas pipes to the MET to prevent dangerous potential differences."
  },
  {
    id: 'earthingbonding12',
    question: "Which table in BS 7671 gives values for minimum bonding sizes?",
    options: ["Table 4A2", "Table 54.7", "Table 52.3", "Table 4B1"],
    correctAnswer: "Table 54.8",
    explanation: "Table 54.8 specifies minimum sizes of main protective bonding conductors based on the size of supply conductors."
  },
  {
    id: 'earthingbonding13',
    question: "In a TT system, what device provides disconnection in case of an earth fault?",
    options: ["RCD", "RCBO", "MCB", "Surge protector"],
    correctAnswer: "RCD",
    explanation: "In TT systems, an RCD is essential for fault protection, as loop impedance may be too high for ADS using MCBs alone."
  },
  {
    id: 'earthingbonding14',
    question: "What is the usual maximum disconnection time for final circuits ≤32A in TN systems?",
    options: ["0.1s", "0.4s", "1.0s", "5.0s"],
    correctAnswer: "0.4s",
    explanation: "BS 7671 requires disconnection within 0.4 seconds for final circuits not exceeding 32A in TN systems."
  },
  {
    id: 'earthingbonding15',
    question: "How is bonding different from earthing?",
    options: ["Bonding is optional", "Bonding connects exposed parts to live conductors", "Bonding equalises potential; earthing provides fault path", "Bonding is only for water pipes"],
    correctAnswer: "Bonding equalises potential; earthing provides fault path",
    explanation: "Bonding reduces voltage differences between conductive parts; earthing provides the path for fault current."
  },
  {
    id: 'earthingbonding16',
    question: "Which conductor connects the MET to the installation earth electrode in a TT system?",
    options: ["Earthing conductor", "Bonding conductor", "Neutral conductor", "Live conductor"],
    correctAnswer: "Earthing conductor",
    explanation: "The earthing conductor connects the main earth terminal to the earth electrode, completing the fault path."
  },
  {
    id: 'earthingbonding17',
    question: "Which colour identifies a protective conductor under BS 7671?",
    options: ["Brown", "Blue", "Green/yellow", "Black"],
    correctAnswer: "Green/yellow",
    explanation: "The green/yellow bi-colour is the standard identification for protective conductors (CPC, bonding, earthing)."
  },
  {
    id: 'earthingbonding18',
    question: "What type of conductor is used to connect gas and water pipes to the MET?",
    options: ["Live conductor", "Neutral conductor", "Supplementary bonding conductor", "Main protective bonding conductor"],
    correctAnswer: "Main protective bonding conductor",
    explanation: "Main bonding conductors connect extraneous-conductive parts to the MET to prevent shock hazards."
  },
  {
    id: 'earthingbonding19',
    question: "Which regulation covers disconnection times for protective devices in TN systems?",
    options: ["411.3.2.2", "421.1.1", "433.1.1", "314.1"],
    correctAnswer: "411.3.2.2",
    explanation: "Regulation 411.3.2.2 in BS 7671 defines disconnection times to ensure shock protection under fault conditions."
  },
  {
    id: 'earthingbonding20',
    question: "What type of test ensures a correct earth electrode connection in TT systems?",
    options: ["Continuity test", "RCD test", "Earth electrode resistance test", "Polarity test"],
    correctAnswer: "Earth electrode resistance test",
    explanation: "This test measures the resistance between the electrode and earth to ensure it's low enough to operate protection."
  },
  {
    id: 'earthingbonding21',
    question: "What is the purpose of supplementary bonding?",
    options: ["Protect equipment", "Reduce supply voltage", "Equalise potentials in locations like bathrooms", "Increase Zs"],
    correctAnswer: "Equalise potentials in locations like bathrooms",
    explanation: "Supplementary bonding connects conductive parts to prevent potential differences in high-risk zones."
  },
  {
    id: 'earthingbonding22',
    question: "What is the maximum disconnection time for distribution circuits in TN systems?",
    options: ["0.4s", "5s", "1s", "0.1s"],
    correctAnswer: "5s",
    explanation: "BS 7671 permits up to 5 seconds disconnection time for TN distribution circuits."
  },
  {
    id: 'earthingbonding23',
    question: "What is the minimum CPC size for a 6mm² line conductor in the same cable?",
    options: ["1mm²", "2.5mm²", "4mm²", "6mm²"],
    correctAnswer: "2.5mm²",
    explanation: "According to Table 54.7, a 6mm² line conductor requires a minimum CPC size of 2.5mm² if in the same cable."
  },
  {
    id: 'earthingbonding24',
    question: "What test instrument is used to verify CPC continuity?",
    options: ["Multimeter", "Loop tester", "Insulation tester", "Low resistance ohmmeter"],
    correctAnswer: "Low resistance ohmmeter",
    explanation: "A low resistance ohmmeter is used to confirm CPC continuity with a test current of 200mA minimum."
  },
  {
    id: 'earthingbonding25',
    question: "What is the typical earth fault loop impedance (Zs) value for a 20A Type B MCB on 230V?",
    options: ["2.3Ω", "1.15Ω", "0.73Ω", "3.83Ω"],
    correctAnswer: "2.3Ω",
    explanation: "Zs = Uo / (5 × In) = 230 / 100 = 2.3Ω for a Type B 20A MCB to trip within 0.4s."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-earthing-bonding', 'items', q.id), {
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
