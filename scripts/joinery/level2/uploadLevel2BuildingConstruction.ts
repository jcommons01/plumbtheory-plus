// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2BuildingConstruction.ts

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

// ✅ Joinery Level 2 Building Construction Principles Questions
const questions = [
  {
    id: 'joinery-l2-building-construction1',
    question: "What is the primary purpose of a damp-proof course (DPC) in a building?",
    options: ["To provide thermal insulation to the structure", "To strengthen the foundation and improve stability", "To prevent moisture rising from the ground into walls", "To provide a level surface for brickwork and blocks"],
    correctAnswer: "To prevent moisture rising from the ground into walls",
    explanation: "DPCs create a horizontal barrier in walls to stop rising damp through capillary action."
  },
  {
    id: 'joinery-l2-building-construction2',
    question: "Which of the following best describes a 'cavity wall' construction?",
    options: ["A wall with internal cavities filled with acoustic insulation materials", "A single-thickness wall with an air gap between interior panels", "A wall with alternating materials to improve insulation properties", "Two separate walls with a gap between them, connected with wall ties"],
    correctAnswer: "Two separate walls with a gap between them, connected with wall ties",
    explanation: "Cavity walls consist of two separate leaves with a gap between, connected with wall ties for structural integrity."
  },
  {
    id: 'joinery-l2-building-construction3',
    question: "What is the standard thickness of plasterboard typically used for wall linings in UK domestic construction?",
    options: ["18mm for improved sound and fire resistance", "9.5mm or 12.5mm depending on requirements", "6mm for all standard applications", "25mm for external wall insulation systems"],
    correctAnswer: "9.5mm or 12.5mm depending on requirements",
    explanation: "9.5mm or 12.5mm boards are standard, with thicker boards used for additional fire resistance or sound insulation."
  },
  {
    id: 'joinery-l2-building-construction4',
    question: "What is the minimum depth of foundations typically required for a two-storey house in normal ground conditions in the UK?",
    options: ["1.5m for all residential construction projects", "150mm for standard soil conditions", "450mm to ensure stability and load bearing", "900mm to reach below the frost line"],
    correctAnswer: "900mm to reach below the frost line",
    explanation: "900mm depth ensures foundations extend below the frost line and reach stable soil with adequate bearing capacity."
  },
  {
    id: 'joinery-l2-building-construction5',
    question: "Which of the following roof structures consists of factory-made triangular frames?",
    options: ["Trussed rafter roof with nail plates", "Traditional cut roof with ridge boards", "Flat roof with timber joists", "Mansard roof with dormer windows"],
    correctAnswer: "Trussed rafter roof with nail plates",
    explanation: "Trussed rafter roofs use factory-made triangular frames connected with nail plates for efficient installation."
  },
  {
    id: 'joinery-l2-building-construction6',
    question: "What is the purpose of a wall plate in traditional timber roof construction?",
    options: ["To seal gaps between wall and ceiling surfaces", "To distribute roof weight evenly across the wall", "To provide fixing for decorative timber elements", "To create a waterproof barrier at wall junctions"],
    correctAnswer: "To distribute roof weight evenly across the wall",
    explanation: "Wall plates distribute roof loads evenly across walls and provide secure fixing points for rafters."
  },
  {
    id: 'joinery-l2-building-construction7',
    question: "In a domestic timber floor construction, what is the primary purpose of noggins between joists?",
    options: ["To improve thermal and acoustic insulation properties", "To create a secure fixing point for floorboards", "To prevent joist twisting and provide lateral stability", "To support concentrated loads from heavy furniture"],
    correctAnswer: "To prevent joist twisting and provide lateral stability",
    explanation: "Noggins prevent joists from twisting and provide lateral stability to the floor structure."
  },
  {
    id: 'joinery-l2-building-construction8',
    question: "What is the recommended minimum clear height between a stair tread and the ceiling according to UK Building Regulations?",
    options: ["2.4m for all public access staircases", "2.0m measured from the pitch line", "1.5m for limited space situations", "1.8m for loft conversion staircases"],
    correctAnswer: "2.0m measured from the pitch line",
    explanation: "2.0m minimum headroom ensures safe passage without risk of head injury."
  },
  {
    id: 'joinery-l2-building-construction9',
    question: "What is the purpose of a lintel in building construction?",
    options: ["To join two wall sections at corner junctions", "To provide thermal breaks in continuous masonry", "To create a waterproof barrier on flat surfaces", "To support loads above door and window openings"],
    correctAnswer: "To support loads above door and window openings",
    explanation: "Lintels span openings and transfer structure weight to adjacent supporting walls."
  },
  {
    id: 'joinery-l2-building-construction10',
    question: "What is the term for the vertical distance between consecutive steps in a staircase?",
    options: ["Pitch - the staircase angle degree", "Nosing - the step edge projection", "Rise - the vertical step height", "Going - the horizontal step measurement"],
    correctAnswer: "Rise - the vertical step height",
    explanation: "Rise is the vertical height between consecutive steps, limited to 220mm maximum in domestic stairs."
  },
  {
    id: 'joinery-l2-building-construction11',
    question: "Which of the following best describes the function of a purlin in a traditional cut roof?",
    options: ["The central ridge beam at the roof apex", "A diagonal brace providing wind resistance", "A vertical post supporting the ridge beam", "A horizontal beam supporting rafters along their length"],
    correctAnswer: "A horizontal beam supporting rafters along their length",
    explanation: "Purlins are horizontal beams that support rafters along their length, reducing effective rafter span."
  },
  {
    id: 'joinery-l2-building-construction12',
    question: "What is the minimum width for a domestic staircase according to UK Building Regulations?",
    options: ["1000mm for multi-occupancy buildings", "850mm between walls or balustrades", "600mm for secondary access routes", "800mm for small residential dwellings"],
    correctAnswer: "850mm between walls or balustrades",
    explanation: "850mm minimum width ensures safe passage and space for furniture movement in domestic settings."
  },
  {
    id: 'joinery-l2-building-construction13',
    question: "In timber frame construction, what is the purpose of the breather membrane installed on the outside of the frame?",
    options: ["To create an airtight construction envelope", "To increase fire resistance rating", "To allow vapour escape while preventing water ingress", "To provide additional thermal insulation"],
    correctAnswer: "To allow vapour escape while preventing water ingress",
    explanation: "Breather membranes prevent water penetration while allowing water vapour to escape from the structure."
  },
  {
    id: 'joinery-l2-building-construction14',
    question: "What is the typical thickness of mortar joints in UK brickwork?",
    options: ["15mm for irregular reclaimed bricks", "20mm for thermal block construction", "5mm for precision engineering brick", "10mm for standard brick construction"],
    correctAnswer: "10mm for standard brick construction",
    explanation: "10mm is standard for mortar joints, giving 75mm course height with standard 65mm bricks."
  },
  {
    id: 'joinery-l2-building-construction15',
    question: "What is the purpose of a cavity tray in building construction?",
    options: ["To enhance insulation at thermal bridges", "To distribute loads across different wall sections", "To channel rainwater that penetrates the outer wall", "To route services through cavity wall structures"],
    correctAnswer: "To channel rainwater that penetrates the outer wall",
    explanation: "Cavity trays collect and direct penetrating rainwater back outside through weep holes."
  },
  {
    id: 'joinery-l2-building-construction16',
    question: "In a traditional cut roof, what is the name of the triangular framework at the gable end?",
    options: ["Verge construction with extended tiles", "Truss arrangement with vertical ties", "Gable ladder with horizontal supports", "Gable end frame with exterior fixing points"],
    correctAnswer: "Gable end frame with exterior fixing points",
    explanation: "The gable end frame provides support for roof covering and may support the gable wall above ceiling level."
  },
  {
    id: 'joinery-l2-building-construction17',
    question: "What is the purpose of a screed layer in a concrete floor construction?",
    options: ["To create a smooth, level surface for flooring", "To provide essential thermal insulation properties", "To increase the structural strength capacity", "To prevent moisture penetration from ground"],
    correctAnswer: "To create a smooth, level surface for flooring",
    explanation: "Screed creates a level surface for floor finishes, typically 50-75mm thick."
  },
  {
    id: 'joinery-l2-building-construction18',
    question: "What is the minimum depth (going) of a stair tread in a private domestic staircase according to UK Building Regulations?",
    options: ["300mm for accessible stair designs", "180mm for space-saving designs", "250mm including the nosing projection", "220mm measured from nosing to nosing"],
    correctAnswer: "220mm measured from nosing to nosing",
    explanation: "220mm minimum going provides adequate foot support on domestic stairs."
  },
  {
    id: 'joinery-l2-building-construction19',
    question: "What is the main advantage of engineered timber I-joists over traditional solid timber joists in floor construction?",
    options: ["Simplified handling and installation process", "Superior acoustic isolation properties", "Greater span capability with less material", "Lower production and material costs"],
    correctAnswer: "Greater span capability with less material",
    explanation: "I-joists use material efficiently to span longer distances with less deflection than solid timber."
  },
  {
    id: 'joinery-l2-building-construction20',
    question: "In building construction, what is meant by the term 'U-value'?",
    options: ["The universal building material standard", "The ultraviolet radiation transmission rate", "The underground service access rating", "The heat transfer rate through materials"],
    correctAnswer: "The heat transfer rate through materials",
    explanation: "U-value measures heat transfer through materials, with lower values indicating better insulation."
  },
  {
    id: 'joinery-l2-building-construction21',
    question: "What is the purpose of a wall tie in cavity wall construction?",
    options: ["To connect inner and outer wall leaves", "To enhance thermal insulation properties", "To provide support for ceiling components", "To reinforce corners in brick structures"],
    correctAnswer: "To connect inner and outer wall leaves",
    explanation: "Wall ties connect the inner and outer leaves while maintaining the cavity between them."
  },
  {
    id: 'joinery-l2-building-construction22',
    question: "What is the primary purpose of a damp-proof membrane (DPM) in a ground floor construction?",
    options: ["To create a smooth surface for finishing", "To add structural integrity to concrete", "To improve floor thermal efficiency", "To prevent ground moisture rising into floors"],
    correctAnswer: "To prevent ground moisture rising into floors",
    explanation: "DPMs block ground moisture and gases from penetrating into the floor structure."
  },
  {
    id: 'joinery-l2-building-construction23',
    question: "What is the name of the horizontal timber member at the base of a partition wall to which vertical studs are fixed?",
    options: ["Joist supporting the structure", "Head plate at the upper section", "Sole plate at the bottom edge", "Noggin between vertical supports"],
    correctAnswer: "Sole plate at the bottom edge",
    explanation: "The sole plate forms the base of stud walls and provides fixing for vertical studs."
  },
  {
    id: 'joinery-l2-building-construction24',
    question: "In timber frame construction, what is the typical spacing of vertical studs in load-bearing walls?",
    options: ["1200mm centres with reinforced sections", "900mm centres for light partition walls", "400mm or 600mm centres as standard", "300mm centres for heavy load areas"],
    correctAnswer: "400mm or 600mm centres as standard",
    explanation: "Studs are typically spaced at 400mm or 600mm centres to align with standard sheet materials."
  },
  {
    id: 'joinery-l2-building-construction25',
    question: "What is the purpose of a trimmer joist in floor or roof construction?",
    options: ["To provide additional acoustic insulation", "To support shortened joists around openings", "To create decorative ceiling frameworks", "To strengthen wall-floor connections"],
    correctAnswer: "To support shortened joists around openings",
    explanation: "Trimmers support shortened joists around openings such as stairwells or rooflights."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-building-construction', 'items', q.id), {
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
