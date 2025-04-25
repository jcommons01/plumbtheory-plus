// ✅ COMPLETE: scripts/uploadLevel2Electrical.ts with 25 Level 2 questions
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
    id: 'level2elec1',
    topic: 'level2-electrical',
    question: "What is the primary risk of working near electrical systems?",
    options: ["Explosion", "Electrocution", "Overheating", "Fire spread"],
    correctAnswer: "Electrocution",
    explanation: "Contact with live conductors can cause serious or fatal electric shocks."
  },
  {
    id: 'level2elec2',
    topic: 'level2-electrical',
    question: "Which regulation must be followed for electrical work in UK dwellings?",
    options: ["BS 7671", "Part G", "WRAS", "Gas Safe"],
    correctAnswer: "BS 7671",
    explanation: "BS 7671 is the IET Wiring Regulations used in UK domestic installations."
  },
  {
    id: 'level2elec3',
    topic: 'level2-electrical',
    question: "What does a double pole isolator do?",
    options: ["Isolates live only", "Isolates neutral only", "Isolates live and neutral", "Isolates ground"],
    correctAnswer: "Isolates live and neutral",
    explanation: "Double pole isolators ensure complete circuit disconnection for safe maintenance."
  },
  {
    id: 'level2elec4',
    topic: 'level2-electrical',
    question: "Which colour is used for the live conductor in new UK wiring?",
    options: ["Red", "Black", "Brown", "Blue"],
    correctAnswer: "Brown",
    explanation: "Brown is the standard colour for live conductors in UK wiring post-2006."
  },
  {
    id: 'level2elec5',
    topic: 'level2-electrical',
    question: "What is the function of an RCD?",
    options: ["Limit water pressure", "Isolate water supply", "Prevent pipe freezing", "Detect earth leakage and cut power"],
    correctAnswer: "Detect earth leakage and cut power",
    explanation: "RCDs trip the circuit when leakage to earth exceeds safe levels, protecting life."
  },
  {
    id: 'level2elec6',
    topic: 'level2-electrical',
    question: "Which type of switch is used for electric showers?",
    options: ["Single pole", "Fused spur", "Pull cord isolator", "Dimmer switch"],
    correctAnswer: "Pull cord isolator",
    explanation: "Ceiling-mounted pull cords provide safe, local isolation for bathroom circuits."
  },
  {
    id: 'level2elec7',
    topic: 'level2-electrical',
    question: "What zone is directly inside a shower or bath?",
    options: ["Zone 0", "Zone 1", "Zone 2", "Zone 3"],
    correctAnswer: "Zone 0",
    explanation: "Zone 0 is inside the bath or shower tray where electrical equipment must be extra low voltage (SELV)."
  },
  {
    id: 'level2elec8',
    topic: 'level2-electrical',
    question: "Which of the following is a safe method to test for live voltage?",
    options: ["Multimeter", "Hammer", "Wire strippers", "Pipe bender"],
    correctAnswer: "Multimeter",
    explanation: "Multimeters and voltage testers are used to detect the presence of voltage."
  },
  {
    id: 'level2elec9',
    topic: 'level2-electrical',
    question: "What is bonding in plumbing and electrical systems?",
    options: ["Joining plastic pipes", "Insulating metal", "Connecting conductive parts to earth", "Fusing circuits"],
    correctAnswer: "Connecting conductive parts to earth",
    explanation: "Bonding ensures all exposed conductive parts are at the same potential."
  },
  {
    id: 'level2elec10',
    topic: 'level2-electrical',
    question: "Which test is done to ensure earth continuity in a circuit?",
    options: ["Insulation resistance test", "Voltage drop test", "Continuity test", "RCD trip test"],
    correctAnswer: "Continuity test",
    explanation: "Continuity testing confirms that earth connections are complete and effective."
  },
  {
    id: 'level2elec11',
    topic: 'level2-electrical',
    question: "What is the minimum IP rating for electrical equipment in Zone 1 of a bathroom?",
    options: ["IPX1", "IPX4", "IPX7", "IP44"],
    correctAnswer: "IPX4",
    explanation: "Zone 1 equipment must be at least IPX4 to resist water splashes."
  },
  {
    id: 'level2elec12',
    topic: 'level2-electrical',
    question: "Which tool is used to safely strip insulation from electrical wire?",
    options: ["Screwdriver", "Side cutters", "Pipe cutter", "Wire stripper"],
    correctAnswer: "Wire stripper",
    explanation: "Wire strippers remove insulation without damaging the conductor."
  },
  {
    id: 'level2elec13',
    topic: 'level2-electrical',
    question: "What is the usual fuse rating for a 3kW immersion heater?",
    options: ["5A", "13A", "16A", "32A"],
    correctAnswer: "13A",
    explanation: "A 3kW load at 240V draws 12.5A, so a 13A fuse is appropriate."
  },
  {
    id: 'level2elec14',
    topic: 'level2-electrical',
    question: "Which document must be issued after completing electrical work?",
    options: ["BSI Certificate", "Gas Safe Certificate", "Electrical Installation Certificate", "Part L certificate"],
    correctAnswer: "Electrical Installation Certificate",
    explanation: "This confirms the work complies with BS 7671."
  },
  {
    id: 'level2elec15',
    topic: 'level2-electrical',
    question: "Why should flexible cords not be used for fixed wiring?",
    options: ["They are too long", "They lack earth continuity", "They are not mechanically protected", "They use incorrect colours"],
    correctAnswer: "They are not mechanically protected",
    explanation: "Flexible cords are vulnerable to damage in permanent installations."
  },
  {
    id: 'level2elec16',
    topic: 'level2-electrical',
    question: "Which regulation part applies to electrical safety in dwellings?",
    options: ["Part G", "Part P", "Part F", "Part H"],
    correctAnswer: "Part P",
    explanation: "Part P covers electrical safety in domestic installations."
  },
  {
    id: 'level2elec17',
    topic: 'level2-electrical',
    question: "How can electricians ensure a safe isolation?",
    options: ["Switch off and unplug", "Use RCD only", "Lock off and verify dead", "Use a resistor"],
    correctAnswer: "Lock off and verify dead",
    explanation: "Locking off and confirming isolation is the correct procedure."
  },
  {
    id: 'level2elec18',
    topic: 'level2-electrical',
    question: "What type of protective device disconnects a circuit in overload conditions?",
    options: ["RCD", "RCBO", "MCB", "Bond"],
    correctAnswer: "MCB",
    explanation: "Miniature Circuit Breakers trip when current exceeds safe limits."
  },
  {
    id: 'level2elec19',
    topic: 'level2-electrical',
    question: "Where should main bonding conductors be connected?",
    options: ["To socket faceplates", "To incoming gas/water pipes", "To every radiator", "To extractor fans"],
    correctAnswer: "To incoming gas/water pipes",
    explanation: "Bonding connects services at the point of entry to earth."
  },
  {
    id: 'level2elec20',
    topic: 'level2-electrical',
    question: "Which tool is used to safely cut electrical cables?",
    options: ["Pliers", "Side cutters", "Pipe wrench", "Allen key"],
    correctAnswer: "Side cutters",
    explanation: "Side cutters are designed to cut through cable neatly and safely."
  },
  {
    id: 'level2elec21',
    topic: 'level2-electrical',
    question: "What is the purpose of a fused connection unit (FCU)?",
    options: ["Provide light", "Reduce voltage", "Safely isolate appliances", "Detect leaks"],
    correctAnswer: "Safely isolate appliances",
    explanation: "FCUs allow local isolation and provide fuse protection."
  },
  {
    id: 'level2elec22',
    topic: 'level2-electrical',
    question: "Which test ensures a circuit has no short circuits or damage to insulation?",
    options: ["Voltage test", "Insulation resistance test", "Continuity test", "RCD test"],
    correctAnswer: "Insulation resistance test",
    explanation: "This test verifies insulation integrity between conductors."
  },
  {
    id: 'level2elec23',
    topic: 'level2-electrical',
    question: "Which zone in a bathroom allows SELV equipment only?",
    options: ["Zone 0", "Zone 1", "Zone 2", "Zone 3"],
    correctAnswer: "Zone 0",
    explanation: "Only SELV-rated equipment is allowed inside bath/shower spaces."
  },
  {
    id: 'level2elec24',
    topic: 'level2-electrical',
    question: "Which conductor is identified by blue insulation in new UK wiring?",
    options: ["Live", "Earth", "Neutral", "Bond"],
    correctAnswer: "Neutral",
    explanation: "Blue indicates the neutral conductor in modern wiring."
  },
  {
    id: 'level2elec25',
    topic: 'level2-electrical',
    question: "Which item is used to safely lock off a circuit breaker?",
    options: ["Padlock and tag", "Insulation tape", "Marker pen", "Switchboard"],
    correctAnswer: "Padlock and tag",
    explanation: "Lockout devices with tags are used for safe isolation and legal compliance."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-electrical', 'items', q.id), {
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
