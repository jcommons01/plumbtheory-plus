// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2ToolsMaterials.ts

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

// ✅ Level 2 Tools & Materials Questions
const questions = [
  {
    id: 'level2tools1',
    question: "What is the primary purpose of side cutters in electrical work?",
    options: ["Stripping cable insulation", "Cutting cables and wires", "Crimping terminals", "Bending conduit"],
    correctAnswer: "Cutting cables and wires",
    explanation: "Side cutters (diagonal cutting pliers) are primarily designed for cutting cables and wires. They provide a clean cut and are essential for electrical installation work."
  },
  {
    id: 'level2tools2',
    question: "Which tool is specifically designed for forming accurate bends in conduit?",
    options: ["Pipe cutter", "Conduit bender", "Hickey bar", "Bending spring"],
    correctAnswer: "Conduit bender",
    explanation: "A conduit bender is specially designed to create precise and consistent bends in metal or plastic conduit without kinking or damaging it."
  },
  {
    id: 'level2tools3',
    question: "What is the purpose of a wire stripper in electrical installations?",
    options: ["To cut wires", "To remove insulation without damaging the conductor", "To bend wires", "To test for voltage"],
    correctAnswer: "To remove insulation without damaging the conductor",
    explanation: "Wire strippers are designed to precisely remove the outer insulation from electrical cables without damaging the conductor inside."
  },
  {
    id: 'level2tools4',
    question: "Which tool is used to tighten and loosen nuts and bolts in electrical enclosures?",
    options: ["Screwdriver", "Cable cutters", "Spanners or wrenches", "Pliers"],
    correctAnswer: "Spanners or wrenches",
    explanation: "Spanners (wrenches) are used to tighten and loosen nuts and bolts in electrical enclosures, brackets, and mounting hardware."
  },
  {
    id: 'level2tools5',
    question: "What is the primary purpose of an insulation resistance tester (megger)?",
    options: ["To test for voltage", "To measure current", "To measure insulation resistance between conductors", "To test circuit breakers"],
    correctAnswer: "To measure insulation resistance between conductors",
    explanation: "An insulation resistance tester (megger) is used to verify the integrity of electrical insulation by measuring the resistance between conductors and between conductors and earth."
  },
  {
    id: 'level2tools6',
    question: "What is the purpose of a cable gland in electrical installations?",
    options: ["To join two cables together", "To terminate a cable while providing strain relief and environmental protection", "To test cable integrity", "To label cables"],
    correctAnswer: "To terminate a cable while providing strain relief and environmental protection",
    explanation: "Cable glands secure cables entering enclosures, providing strain relief, maintaining IP ratings, and ensuring proper termination. They may also provide earthing for armored cables."
  },
  {
    id: 'level2tools7',
    question: "Which of the following is used to check if an electrical circuit is dead?",
    options: ["Multimeter only", "Continuity tester", "Approved voltage indicator", "Any metal tool"],
    correctAnswer: "Approved voltage indicator",
    explanation: "An approved voltage indicator (proving unit tested) must be used to verify a circuit is dead before working on it, in accordance with safe isolation procedures."
  },
  {
    id: 'level2tools8',
    question: "What is the purpose of a fish tape (draw wire) in electrical installation?",
    options: ["To secure cables to walls", "To pull cables through conduit or cavities", "To test for cable breaks", "To measure cable length"],
    correctAnswer: "To pull cables through conduit or cavities",
    explanation: "A fish tape (draw wire) is a flexible metal tape that is pushed through conduits or wall cavities and then attached to cables to pull them through."
  },
  {
    id: 'level2tools9',
    question: "What type of screwdriver is required for terminal screws in UK consumer units?",
    options: ["Phillips", "Slotted (flat blade)", "Pozidriv", "Torx"],
    correctAnswer: "Slotted (flat blade)",
    explanation: "Most UK consumer units use slotted (flat blade) terminal screws, although specific units may vary. Always use the correct type to avoid damaging the screw heads."
  },
  {
    id: 'level2tools10',
    question: "What is the purpose of crimp terminals in electrical work?",
    options: ["To join wires without soldering", "To test wire integrity", "To extend conduit runs", "To label circuits"],
    correctAnswer: "To join wires without soldering",
    explanation: "Crimp terminals provide a secure mechanical and electrical connection between wires and terminals without the need for soldering, using compression to create a solid bond."
  },
  {
    id: 'level2tools11',
    question: "Which tool is used to bend larger diameter cables without damaging them?",
    options: ["Cable scissors", "Cable bending tool", "Conduit bender", "Cable drum"],
    correctAnswer: "Cable bending tool",
    explanation: "A cable bending tool (cable former) allows for the safe bending of larger diameter cables to the correct radius without damaging the cable's insulation or conductor."
  },
  {
    id: 'level2tools12',
    question: "What material is typically used for temporary cable protection when passing through masonry walls during installation?",
    options: ["Metal sleeve", "PVC conduit", "Rubber grommet", "Plastic gland"],
    correctAnswer: "PVC conduit",
    explanation: "Short sections of PVC conduit are typically used to protect cables passing through masonry walls, providing both physical protection and a smooth surface to prevent cable damage."
  },
  {
    id: 'level2tools13',
    question: "What is the primary purpose of a digital multimeter in electrical work?",
    options: ["To cut cables", "To bend conduit", "To measure multiple electrical parameters", "To fix cables to surfaces"],
    correctAnswer: "To measure multiple electrical parameters",
    explanation: "Digital multimeters can measure multiple electrical parameters including voltage, current, resistance, and often other values like capacitance, frequency, and temperature."
  },
  {
    id: 'level2tools14',
    question: "Which tool is essential for checking the correct operation of an RCD?",
    options: ["Voltage indicator", "RCD tester", "Continuity tester", "Cable detector"],
    correctAnswer: "RCD tester",
    explanation: "An RCD tester is specifically designed to verify the correct operation of RCDs by simulating a fault condition and measuring the trip time and current."
  },
  {
    id: 'level2tools15',
    question: "What is the purpose of connector blocks (terminal blocks) in electrical installations?",
    options: ["To protect against overcurrent", "To join wires together", "To convert voltage", "To test circuits"],
    correctAnswer: "To join wires together",
    explanation: "Connector blocks (terminal blocks) provide a secure method of joining wires together without soldering, typically using screw terminals inside an insulated housing."
  },
  {
    id: 'level2tools16',
    question: "What type of drill bit should be used when drilling through ceramic tiles for electrical installations?",
    options: ["Standard HSS bit", "Wood bit", "Diamond-tipped or tungsten carbide bit", "Flat wood spade bit"],
    correctAnswer: "Diamond-tipped or tungsten carbide bit",
    explanation: "Diamond-tipped or tungsten carbide bits are designed to drill through hard materials like ceramic tiles without cracking them. They should be used with a drill in non-hammer mode."
  },
  {
    id: 'level2tools17',
    question: "What safety device is used to prevent accidental re-energization of circuits during maintenance?",
    options: ["Fuse", "RCD", "Circuit breaker lock-off device", "Voltage tester"],
    correctAnswer: "Circuit breaker lock-off device",
    explanation: "Circuit breaker lock-off devices (lock-out/tag-out devices) physically prevent the accidental re-energization of circuits during maintenance work."
  },
  {
    id: 'level2tools18',
    question: "Which tool is used to identify the location of electrical cables hidden in walls?",
    options: ["Multimeter", "Cable detector", "Insulation tester", "RCD tester"],
    correctAnswer: "Cable detector",
    explanation: "Cable detectors (cable locators) use electromagnetic or capacitive sensing to identify the location of live or de-energized electrical cables hidden behind walls, floors, or ceilings."
  },
  {
    id: 'level2tools19',
    question: "What type of material is typically used for the installation of temporary electrical supplies on construction sites?",
    options: ["PVC insulated and sheathed cable", "Rubber insulated flexible cable", "Steel wire armoured cable", "Mineral insulated cable"],
    correctAnswer: "Rubber insulated flexible cable",
    explanation: "Rubber insulated flexible cables (like H07RN-F) are typically used for temporary electrical supplies on construction sites due to their durability and resistance to abrasion, water, and other site conditions."
  },
  {
    id: 'level2tools20',
    question: "What is the standard voltage rating for general purpose cables used in fixed installations in the UK?",
    options: ["300/500V", "450/750V", "600/1000V", "1.8/3kV"],
    correctAnswer: "450/750V",
    explanation: "The standard voltage rating for general purpose cables (like PVC insulated and sheathed flat twin and earth) used in fixed domestic and commercial installations in the UK is 450/750V."
  },
  {
    id: 'level2tools21',
    question: "What tool is used to cut large diameter cables?",
    options: ["Side cutters", "Pliers", "Junior hacksaw", "Cable cutters or ratchet cutters"],
    correctAnswer: "Cable cutters or ratchet cutters",
    explanation: "Cable cutters or ratchet cutters are specially designed to cut through larger diameter cables, providing a clean cut without crushing the cable."
  },
  {
    id: 'level2tools22',
    question: "What is the purpose of a proving unit in electrical testing?",
    options: ["To calibrate multimeters", "To test circuit breakers", "To verify voltage indicators are working correctly", "To measure earth resistance"],
    correctAnswer: "To verify voltage indicators are working correctly",
    explanation: "A proving unit is used to verify that voltage indicators are working correctly before and after use, as part of the safe isolation procedure."
  },
  {
    id: 'level2tools23',
    question: "Which material is recommended for fixing electrical accessories to plasterboard walls?",
    options: ["Wood screws", "Rawl plugs", "Plasterboard fixings (dry wall anchors)", "Concrete screws"],
    correctAnswer: "Plasterboard fixings (dry wall anchors)",
    explanation: "Plasterboard fixings (dry wall anchors) are specifically designed to provide secure attachment to plasterboard/drywall, distributing the load to prevent pulling through."
  },
  {
    id: 'level2tools24',
    question: "What is the purpose of earth sleeving in electrical installations?",
    options: ["To protect cables from damage", "To identify live conductors", "To identify earth conductors", "To provide additional insulation for neutrals"],
    correctAnswer: "To identify earth conductors",
    explanation: "Earth sleeving (green and yellow) is used to identify earth conductors, particularly at terminations where the bare copper of the earth conductor needs to be both identified and protected."
  },
  {
    id: 'level2tools25',
    question: "What is the primary purpose of a socket tester?",
    options: ["To test if a socket is live", "To check for basic wiring faults in socket outlets", "To measure the current drawn by a socket", "To identify the circuit a socket is connected to"],
    correctAnswer: "To check for basic wiring faults in socket outlets",
    explanation: "Socket testers can identify basic wiring faults in socket outlets such as reversed live/neutral, missing earth, and certain other common wiring errors. However, they should not be relied upon as a comprehensive test."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l2-tools-materials', 'items', q.id), {
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
