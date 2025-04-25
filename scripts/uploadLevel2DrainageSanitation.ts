// ✅ COMPLETE: scripts/uploadLevel2DrainageSanitation.ts with 25 Level 2 questions
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
    id: 'level2drain1',
    topic: 'level2-drainage-sanitation',
    question: "What is the typical minimum fall for a 100mm waste pipe in domestic drainage?",
    options: ["1:10", "1:20", "1:40", "1:80"],
    correctAnswer: "1:40",
    explanation: "The standard minimum fall for 100mm pipes is 1 in 40 to ensure self-cleansing."
  },
  {
    id: 'level2drain2',
    topic: 'level2-drainage-sanitation',
    question: "What is the purpose of a trap in a plumbing system?",
    options: ["Increase pressure", "Prevent backflow", "Prevent smells", "Control flow rate"],
    correctAnswer: "Prevent smells",
    explanation: "Traps retain water to block foul air from entering the building."
  },
  {
    id: 'level2drain3',
    topic: 'level2-drainage-sanitation',
    question: "Which fitting connects a vertical soil pipe to a horizontal branch?",
    options: ["Tee junction", "Straight connector", "Long radius bend", "Boss connector"],
    correctAnswer: "Long radius bend",
    explanation: "A long radius bend reduces turbulence and blockage risk at the change of direction."
  },
  {
    id: 'level2drain4',
    topic: 'level2-drainage-sanitation',
    question: "What is the minimum diameter for a WC discharge pipe?",
    options: ["32mm", "40mm", "50mm", "100mm"],
    correctAnswer: "100mm",
    explanation: "Toilet waste requires a 100mm (4 inch) pipe to handle solid discharge."
  },
  {
    id: 'level2drain5',
    topic: 'level2-drainage-sanitation',
    question: "Which regulation covers foul drainage systems in the UK?",
    options: ["Part G", "Part H", "Part P", "Part L"],
    correctAnswer: "Part H",
    explanation: "Building Regulations Part H deals with drainage and waste disposal."
  },
  {
    id: 'level2drain6',
    topic: 'level2-drainage-sanitation',
    question: "What does a rodding eye allow?",
    options: ["Ventilation", "Inspection", "Cleaning access", "Pipe joining"],
    correctAnswer: "Cleaning access",
    explanation: "Rodding eyes provide access for clearing blockages in pipework."
  },
  {
    id: 'level2drain7',
    topic: 'level2-drainage-sanitation',
    question: "Which type of trap is built into the WC?",
    options: ["P-trap", "Bottle trap", "S-trap", "Integral trap"],
    correctAnswer: "Integral trap",
    explanation: "Most modern WCs have an integral trap formed as part of the ceramic."
  },
  {
    id: 'level2drain8',
    topic: 'level2-drainage-sanitation',
    question: "Which material is commonly used for underground drainage?",
    options: ["PVCu", "Copper", "MDPE", "ABS"],
    correctAnswer: "PVCu",
    explanation: "PVCu is durable, corrosion-resistant and ideal for below-ground use."
  },
  {
    id: 'level2drain9',
    topic: 'level2-drainage-sanitation',
    question: "How is foul water from a kitchen usually discharged?",
    options: ["Open gulley", "Direct soakaway", "Rainwater pipe", "Waste pipe to soil stack"],
    correctAnswer: "Waste pipe to soil stack",
    explanation: "Foul waste from sinks is directed to the soil stack for safe disposal."
  },
  {
    id: 'level2drain10',
    topic: 'level2-drainage-sanitation',
    question: "What does AAV stand for?",
    options: ["Air Access Valve", "Auto Air Valve", "Air Admittance Valve", "Air Absorption Valve"],
    correctAnswer: "Air Admittance Valve",
    explanation: "AAVs allow air into the system to prevent siphonage while keeping odours sealed."
  },
  {
    id: 'level2drain11',
    topic: 'level2-drainage-sanitation',
    question: "Which pipe carries greywater from a basin or bath?",
    options: ["Foul pipe", "Vent pipe", "Waste pipe", "Overflow pipe"],
    correctAnswer: "Waste pipe",
    explanation: "Waste pipes carry used water from appliances like baths and basins."
  },
  {
    id: 'level2drain12',
    topic: 'level2-drainage-sanitation',
    question: "Why should waste pipes be clipped securely?",
    options: ["Prevent freezing", "Allow ventilation", "Support weight and maintain fall", "Ease replacement"],
    correctAnswer: "Support weight and maintain fall",
    explanation: "Correct clipping ensures flow and prevents sagging or blockage."
  },
  {
    id: 'level2drain13',
    topic: 'level2-drainage-sanitation',
    question: "What is used to prevent sewer gases from entering the building?",
    options: ["Check valve", "Air break", "Trap seal", "Stopcock"],
    correctAnswer: "Trap seal",
    explanation: "The water in a trap creates a seal that stops smells from coming back."
  },
  {
    id: 'level2drain14',
    topic: 'level2-drainage-sanitation',
    question: "Which test checks a soil stack for leaks?",
    options: ["Air test", "Polarity test", "Smoke test", "Flow test"],
    correctAnswer: "Air test",
    explanation: "An air test applies pressure to detect leaks in sealed systems."
  },
  {
    id: 'level2drain15',
    topic: 'level2-drainage-sanitation',
    question: "Where should you NOT install an AAV?",
    options: ["Above WC branch", "In a sealed roof space", "In an accessible cupboard", "Inside ductwork with access"],
    correctAnswer: "In a sealed roof space",
    explanation: "AAVs must be in ventilated areas with access for maintenance."
  },
  {
    id: 'level2drain16',
    topic: 'level2-drainage-sanitation',
    question: "Which pipe is used to vent a foul drainage system to the atmosphere?",
    options: ["Overflow pipe", "Soil pipe", "Vent stack", "Condensate pipe"],
    correctAnswer: "Vent stack",
    explanation: "Vent stacks release gases and balance pressure in the drainage system."
  },
  {
    id: 'level2drain17',
    topic: 'level2-drainage-sanitation',
    question: "What’s the main risk if a trap loses its water seal?",
    options: ["Slow flow", "Freezing", "Backflow", "Foul odours"],
    correctAnswer: "Foul odours",
    explanation: "Loss of water seal allows sewer gases to enter living spaces."
  },
  {
    id: 'level2drain18',
    topic: 'level2-drainage-sanitation',
    question: "What is the usual internal diameter of a bath waste pipe?",
    options: ["21.5mm", "32mm", "40mm", "50mm"],
    correctAnswer: "40mm",
    explanation: "40mm is standard for baths to cope with higher flow rates."
  },
  {
    id: 'level2drain19',
    topic: 'level2-drainage-sanitation',
    question: "Why is a long radius bend preferred over a 90° bend in waste?",
    options: ["Reduces cost", "Improves ventilation", "Improves flow", "Lowers pressure"],
    correctAnswer: "Improves flow",
    explanation: "Long radius bends create smoother transitions and reduce blockages."
  },
  {
    id: 'level2drain20',
    topic: 'level2-drainage-sanitation',
    question: "Which component connects multiple waste pipes into a soil stack?",
    options: ["Bend", "Manifold", "Boss connector", "Junction"],
    correctAnswer: "Boss connector",
    explanation: "Boss connectors provide entry points for small bore waste pipes."
  },
  {
    id: 'level2drain21',
    topic: 'level2-drainage-sanitation',
    question: "Where should a rodding eye be positioned?",
    options: ["At every joint", "Only underground", "Near bends or changes in direction", "Only inside buildings"],
    correctAnswer: "Near bends or changes in direction",
    explanation: "This ensures blockages can be cleared from likely points of failure."
  },
  {
    id: 'level2drain22',
    topic: 'level2-drainage-sanitation',
    question: "Which of these is NOT a suitable material for underground drainage?",
    options: ["PVCu", "Clay", "Lead", "Cast iron"],
    correctAnswer: "Lead",
    explanation: "Lead is no longer used in drainage due to health and corrosion risks."
  },
  {
    id: 'level2drain23',
    topic: 'level2-drainage-sanitation',
    question: "What is the function of a gully trap?",
    options: ["Allow venting", "Catch debris", "Provide access", "Prevent sewer gases escaping"],
    correctAnswer: "Prevent sewer gases escaping",
    explanation: "Gully traps maintain a water seal to block odours from surface drainage."
  },
  {
    id: 'level2drain24',
    topic: 'level2-drainage-sanitation',
    question: "What is backfall in a drainage pipe?",
    options: ["Fall away from appliance", "Fall towards appliance", "Incorrect venting", "Overflow from traps"],
    correctAnswer: "Fall towards appliance",
    explanation: "Backfall leads to poor flow and can cause waste to back up."
  },
  {
    id: 'level2drain25',
    topic: 'level2-drainage-sanitation',
    question: "Why must plastic pipes be protected when entering masonry walls?",
    options: ["To prevent frost", "To prevent damage and expansion stress", "To stop smells", "To hold them in place"],
    correctAnswer: "To prevent damage and expansion stress",
    explanation: "Plastic pipes need sleeves to allow movement and avoid cracking."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-drainage-sanitation', 'items', q.id), {
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
