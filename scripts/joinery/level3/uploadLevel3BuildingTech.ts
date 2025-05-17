// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3BuildingTech.ts

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

// ✅ Joinery Level 3 Advanced Building Technology Questions
const questions = [
  {
    id: 'joinery-l3-building-tech1',
    question: "What is the main function of a damp-proof course (DPC)?",
    options: ["To support roof loads", "To allow vapour to escape", "To stop moisture rising", "To improve insulation"],
    correctAnswer: "To stop moisture rising",
    explanation: "A DPC prevents ground moisture from rising through walls via capillary action, protecting building materials from damp-related damage."
  },
  {
    id: 'joinery-l3-building-tech2',
    question: "What is a sole plate used for in timber frame construction?",
    options: ["To fix roof tiles", "To sit under joists", "To anchor wall studs", "To support ceiling battens"],
    correctAnswer: "To anchor wall studs",
    explanation: "The sole plate is the horizontal base timber onto which vertical studs are fixed, forming the base of a timber wall frame."
  },
  {
    id: 'joinery-l3-building-tech3',
    question: "What is the purpose of cross-bracing in timber structures?",
    options: ["To improve airflow", "To carry roof loads", "To reduce lateral sway", "To insulate cavities"],
    correctAnswer: "To reduce lateral sway",
    explanation: "Cross-bracing stabilises timber frames by preventing racking from wind or structural movement."
  },
  {
    id: 'joinery-l3-building-tech4',
    question: "Which component is typically installed between a cavity wall's leaves above openings?",
    options: ["Sill tray", "Lintel", "Weep vent", "Wall tie"],
    correctAnswer: "Lintel",
    explanation: "Lintels are structural elements that span openings and transfer loads to the surrounding masonry."
  },
  {
    id: 'joinery-l3-building-tech5',
    question: "Which insulation type is most suitable for stud wall cavities?",
    options: ["Vapour film", "Glass wool", "Plywood sheet", "Expanded mesh"],
    correctAnswer: "Glass wool",
    explanation: "Glass wool is lightweight and flexible, making it ideal for fitting between studs to reduce heat loss and sound."
  },
  {
    id: 'joinery-l3-building-tech6',
    question: "What is the key reason for ventilating roof voids in cold roof construction?",
    options: ["To heat loft space", "To reduce noise", "To stop condensation", "To trap heat"],
    correctAnswer: "To stop condensation",
    explanation: "Ventilation in cold roofs helps carry away moist air, preventing damp and timber decay."
  },
  {
    id: 'joinery-l3-building-tech7',
    question: "What does a U-value represent in building design?",
    options: ["Moisture content", "Air pressure", "Heat loss rate", "Wind resistance"],
    correctAnswer: "Heat loss rate",
    explanation: "U-values measure how well parts of a building transfer heat. Lower values indicate better insulation."
  },
  {
    id: 'joinery-l3-building-tech8',
    question: "What is a noggin in a timber frame?",
    options: ["A bolt type", "An angled brace", "A short horizontal timber", "A ceiling strap"],
    correctAnswer: "A short horizontal timber",
    explanation: "Noggins are short timbers fitted between studs or joists to reduce twisting and provide fixing points."
  },
  {
    id: 'joinery-l3-building-tech9',
    question: "Why are cavity wall ties important?",
    options: ["They insulate walls", "They support windows", "They join wall layers", "They prevent leaks"],
    correctAnswer: "They join wall layers",
    explanation: "Wall ties connect the inner and outer leaves of a cavity wall, ensuring stability and structural performance."
  },
  {
    id: 'joinery-l3-building-tech10',
    question: "Which British Standard covers workmanship for timber structures?",
    options: ["BS 8103", "BS 8210", "BS 8000-5", "BS 7671"],
    correctAnswer: "BS 8000-5",
    explanation: "BS 8000-5 provides best practice guidelines for the installation and workmanship of timber components."
  },
  {
    id: 'joinery-l3-building-tech11',
    question: "What is the purpose of breather membrane in timber frame walls?",
    options: ["To block all air", "To reflect sunlight", "To allow vapour out while stopping rain", "To replace insulation"],
    correctAnswer: "To allow vapour out while stopping rain",
    explanation: "Breather membranes are vapour-permeable but water-resistant, helping to keep walls dry while allowing moisture to escape."
  },
  {
    id: 'joinery-l3-building-tech12',
    question: "What is the primary function of an eaves vent in roofing?",
    options: ["To drain rainwater", "To support guttering", "To allow airflow", "To block sunlight"],
    correctAnswer: "To allow airflow",
    explanation: "Eaves vents allow fresh air into roof voids to maintain ventilation and prevent condensation."
  },
  {
    id: 'joinery-l3-building-tech13',
    question: "Why is OSB (Oriented Strand Board) used in timber frame walls?",
    options: ["It looks decorative", "It's flexible", "It adds shear strength", "It's waterproof"],
    correctAnswer: "It adds shear strength",
    explanation: "OSB sheathing resists lateral forces and strengthens the wall structure against wind and racking."
  },
  {
    id: 'joinery-l3-building-tech14',
    question: "What causes interstitial condensation?",
    options: ["Cold weather only", "Poor flashing", "Moisture inside walls", "Nails penetrating foil"],
    correctAnswer: "Moisture inside walls",
    explanation: "It occurs when water vapour condenses within the structure, usually where warm moist air meets cold surfaces inside a wall or roof."
  },
  {
    id: 'joinery-l3-building-tech15',
    question: "What is the purpose of a thermal break?",
    options: ["To ventilate the wall", "To reflect sunlight", "To reduce heat transfer", "To drain water"],
    correctAnswer: "To reduce heat transfer",
    explanation: "Thermal breaks are insulating materials that prevent heat transfer across components like window frames or steelwork."
  },
  {
    id: 'joinery-l3-building-tech16',
    question: "What does a joist hanger do?",
    options: ["Supports ceilings", "Connects walls", "Holds joists in place", "Stops water flow"],
    correctAnswer: "Holds joists in place",
    explanation: "Joist hangers are metal brackets that secure floor or ceiling joists to beams or walls, ensuring safe load support."
  },
  {
    id: 'joinery-l3-building-tech17',
    question: "What is a cold bridge?",
    options: ["Insulated timber joint", "Gap in sheathing", "Path of heat loss", "Fault in vapour barrier"],
    correctAnswer: "Path of heat loss",
    explanation: "A cold bridge is an area in the building envelope where heat escapes more rapidly, often due to poor insulation or design flaws."
  },
  {
    id: 'joinery-l3-building-tech18',
    question: "What is the role of a vapour control layer (VCL)?",
    options: ["To add soundproofing", "To allow airflow", "To reduce water vapour entering insulation", "To block insects"],
    correctAnswer: "To reduce water vapour entering insulation",
    explanation: "VCLs limit the movement of water vapour from inside the building into insulated areas, reducing the risk of condensation."
  },
  {
    id: 'joinery-l3-building-tech19',
    question: "Which insulation type is often used under concrete floors?",
    options: ["Foil wrap", "Glass wool", "Rigid foam", "Mineral board"],
    correctAnswer: "Rigid foam",
    explanation: "Rigid foam boards provide high compressive strength and thermal performance, ideal for use below concrete floor slabs."
  },
  {
    id: 'joinery-l3-building-tech20',
    question: "What is the main purpose of a weep vent in brickwork?",
    options: ["To allow insects in", "To improve grip", "To let water out", "To fix ties"],
    correctAnswer: "To let water out",
    explanation: "Weep vents allow moisture within the cavity to drain out, helping to prevent damp and protect the internal wall structure."
  },
  {
    id: 'joinery-l3-building-tech21',
    question: "What type of joinery is most common in prefabricated floor cassettes?",
    options: ["Dovetail joints", "Bridle joints", "Mechanical fixings", "Half lap joints"],
    correctAnswer: "Mechanical fixings",
    explanation: "Prefabricated components are commonly joined using mechanical fixings like nails, screws, and metal plates for speed and strength."
  },
  {
    id: 'joinery-l3-building-tech22',
    question: "Which of the following best describes a warm roof?",
    options: ["No insulation", "Roof with internal cladding", "Insulation above rafters", "Roof with vents"],
    correctAnswer: "Insulation above rafters",
    explanation: "Warm roof construction places insulation above or between rafters, keeping the structure warm and reducing condensation risk."
  },
  {
    id: 'joinery-l3-building-tech23',
    question: "Why are fire stops required in concealed cavities?",
    options: ["To prevent damp", "To slow fire spread", "To support insulation", "To aid airflow"],
    correctAnswer: "To slow fire spread",
    explanation: "Fire stops block concealed paths within cavities, helping to contain fire and reduce the speed of flame and smoke spread."
  },
  {
    id: 'joinery-l3-building-tech24',
    question: "What is a common use for I-joists in floor systems?",
    options: ["Decorative trim", "Drainage paths", "Long-span support", "Fire barriers"],
    correctAnswer: "Long-span support",
    explanation: "I-joists offer strength over long spans with reduced material use, making them ideal for large open floor plans."
  },
  {
    id: 'joinery-l3-building-tech25',
    question: "What is a ledger plate used for in timber floors?",
    options: ["Decorative finish", "Holding insulation", "Supporting joists", "Fixing plasterboard"],
    correctAnswer: "Supporting joists",
    explanation: "A ledger plate is a horizontal timber fixed to a wall to support the ends of floor joists in timber-framed structures."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-building-tech', 'items', q.id), {
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

// Execute the upload function
uploadQuestions();
