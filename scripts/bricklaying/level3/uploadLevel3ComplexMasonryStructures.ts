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
    id: 'bricklaying-l3-topic2-1',
    question: "What is the structural role of voussoirs in an arch?",
    options: [
      "They resist vertical movement above the arch",
      "They provide tensile strength across the arch",
      "They direct compression forces along the arch",
      "They anchor the mortar joints in place"
    ],
    correctAnswer: "They direct compression forces along the arch",
    explanation: "Voussoirs redirect compression evenly along the arch and into the supports at each end."
  },
  {
    id: 'bricklaying-l3-topic2-2',
    question: "What is the purpose of a skewback in arch building?",
    options: [
      "To support lateral roof loads effectively",
      "To connect piers to floor structures",
      "To provide angled seating for the arch",
      "To create vertical alignment between walls"
    ],
    correctAnswer: "To provide angled seating for the arch",
    explanation: "Skewbacks provide a sloped base where arch bricks begin to spring."
  },
  {
    id: 'bricklaying-l3-topic2-3',
    question: "What is a quoin used for in complex brickwork?",
    options: [
      "To support internal wall partitions",
      "To anchor structural support columns",
      "To strengthen and define wall corners",
      "To improve ventilation between layers"
    ],
    correctAnswer: "To strengthen and define wall corners",
    explanation: "Quoins reinforce and visually frame the external corners of masonry structures."
  },
  {
    id: 'bricklaying-l3-topic2-4',
    question: "What is a relieving arch designed to achieve?",
    options: [
      "To reinforce roof-level brickwork joints",
      "To transfer loads away from openings",
      "To balance rising damp conditions",
      "To act as a damp-proof course"
    ],
    correctAnswer: "To transfer loads away from openings",
    explanation: "Relieving arches shift vertical weight around structural openings."
  },
  {
    id: 'bricklaying-l3-topic2-5',
    question: "Why are soldier courses used above window openings?",
    options: [
      "To reduce weight above windows",
      "To secure glass against impact",
      "To provide vertical decorative detail",
      "To improve water shedding ability"
    ],
    correctAnswer: "To provide vertical decorative detail",
    explanation: "Soldier courses are upright bricks used as decorative horizontal features."
  },
  {
    id: 'bricklaying-l3-topic2-6',
    question: "What is a squinch used for in masonry?",
    options: [
      "To resist vertical wall settlement",
      "To connect bricks diagonally in arches",
      "To support domes on square bases",
      "To vent moisture from domes"
    ],
    correctAnswer: "To support domes on square bases",
    explanation: "Squinches allow domes to sit securely atop square rooms."
  },
  {
    id: 'bricklaying-l3-topic2-7',
    question: "What is the purpose of a spandrel in arch design?",
    options: [
      "To transfer floor loads below arches",
      "To drain moisture from above arches",
      "To fill space above the arch curve",
      "To attach plasterboard to the arch"
    ],
    correctAnswer: "To fill space above the arch curve",
    explanation: "Spandrels occupy the triangular space between arches and the framework above."
  },
  {
    id: 'bricklaying-l3-topic2-8',
    question: "What is a jack arch designed to do structurally?",
    options: [
      "To support arch joints with plaster",
      "To bear weight using flat compression",
      "To link arch sections with rebars",
      "To anchor wooden lintel supports"
    ],
    correctAnswer: "To bear weight using flat compression",
    explanation: "Jack arches are flat but still transfer loads via angled joints."
  },
  {
    id: 'bricklaying-l3-topic2-9',
    question: "What do the terms extrados and intrados describe?",
    options: [
      "Different mortar types used in vaults",
      "Interior and exterior arch faces",
      "Brick moisture content ranges",
      "Load ratings in curved arches"
    ],
    correctAnswer: "Interior and exterior arch faces",
    explanation: "Extrados is the outer arch surface; intrados is the inner curve."
  },
  {
    id: 'bricklaying-l3-topic2-10',
    question: "What does a flying buttress primarily resist?",
    options: [
      "Frost action on lower walls",
      "Rain penetration near gables",
      "Lateral thrust from roof arches",
      "Airflow pressure behind domes"
    ],
    correctAnswer: "Lateral thrust from roof arches",
    explanation: "Flying buttresses resist sideways force from vaulted ceilings."
  },
  {
    id: 'bricklaying-l3-topic2-11',
    question: "What is the key purpose of a keystone?",
    options: [
      "To decorate the top of piers",
      "To bond wall and arch sections",
      "To lock arch bricks in place",
      "To reduce mortar use in joints"
    ],
    correctAnswer: "To lock arch bricks in place",
    explanation: "Keystones finalize the arch by pressing down on adjacent voussoirs."
  },
  {
    id: 'bricklaying-l3-topic2-12',
    question: "Which bond is best suited to curved walls?",
    options: [
      "Stack bond",
      "Stretcher bond",
      "Header bond",
      "English bond"
    ],
    correctAnswer: "Header bond",
    explanation: "Header bond uses short brick faces, ideal for curved shapes."
  },
  {
    id: 'bricklaying-l3-topic2-13',
    question: "What is the main advantage of an English bond?",
    options: [
      "Uses less mortar overall",
      "Allows tight vertical alignment",
      "Improves thermal wall resistance",
      "Maximises structural wall strength"
    ],
    correctAnswer: "Maximises structural wall strength",
    explanation: "English bond is strong due to alternating headers and stretchers."
  },
  {
    id: 'bricklaying-l3-topic2-14',
    question: "What causes arch cracking at quarter points?",
    options: [
      "Insufficient joint mortar",
      "Reinforced lintel settlement",
      "Outward spread of supports",
      "Moisture trapped in cavities"
    ],
    correctAnswer: "Outward spread of supports",
    explanation: "Abutment movement causes tension and cracking at quarter points."
  },
  {
    id: 'bricklaying-l3-topic2-15',
    question: "Why are tapered joints used in brick arches?",
    options: [
      "To reduce the need for support",
      "To resist water ingress more effectively",
      "To form the correct radial shape",
      "To reduce the number of bricks used"
    ],
    correctAnswer: "To form the correct radial shape",
    explanation: "Tapered joints let rectangular bricks form a curved arch."
  },
  {
    id: 'bricklaying-l3-topic2-16',
    question: "What does 'toothing' in masonry achieve?",
    options: [
      "Decorative zigzag patterns",
      "Ventilation through thick walls",
      "Extension bonding to existing walls",
      "Extra drainage on low-level walls"
    ],
    correctAnswer: "Extension bonding to existing walls",
    explanation: "Toothing provides staggered brick ends for future extensions."
  },
  {
    id: 'bricklaying-l3-topic2-17',
    question: "What is the function of a pilaster?",
    options: [
      "To separate window frames cleanly",
      "To decorate parapets attractively",
      "To reinforce and divide large walls",
      "To allow airflow behind walls"
    ],
    correctAnswer: "To reinforce and divide large walls",
    explanation: "Pilasters provide vertical strength and visual breaks in walls."
  },
  {
    id: 'bricklaying-l3-topic2-18',
    question: "What is the 'springer' in arch construction?",
    options: [
      "Top joint above keystones",
      "First arch brick from the base",
      "End support block for domes",
      "Transition mortar below courses"
    ],
    correctAnswer: "First arch brick from the base",
    explanation: "Springers start the curve of the arch from its supports."
  },
  {
    id: 'bricklaying-l3-topic2-19',
    question: "What does a barrel vault resemble?",
    options: [
      "A straight lintel roof",
      "A continuous semi-arched ceiling",
      "A zigzag patterned floor",
      "A layered garden terrace"
    ],
    correctAnswer: "A continuous semi-arched ceiling",
    explanation: "A barrel vault is a long tunnel-like semicircular roof."
  },
  {
    id: 'bricklaying-l3-topic2-20',
    question: "Why are joggle joints used in stone masonry?",
    options: [
      "To hold decorative panels in place",
      "To create fire-resisting cavities",
      "To interlock adjacent stone units",
      "To insulate against rising damp"
    ],
    correctAnswer: "To interlock adjacent stone units",
    explanation: "Joggle joints physically link blocks to resist movement."
  },
  {
    id: 'bricklaying-l3-topic2-21',
    question: "What is a cramp used for in masonry?",
    options: [
      "To anchor metal lintels",
      "To tie adjoining masonry securely",
      "To create arch curves",
      "To hold bricks temporarily"
    ],
    correctAnswer: "To tie adjoining masonry securely",
    explanation: "Cramps are metal ties that link masonry elements firmly."
  },
  {
    id: 'bricklaying-l3-topic2-22',
    question: "What does a 'finial' refer to?",
    options: [
      "Support under timber frames",
      "Decorative roof apex feature",
      "Mortar-drying chemical additive",
      "Waterproofing detail in lintels"
    ],
    correctAnswer: "Decorative roof apex feature",
    explanation: "Finials are decorative spire-like features on rooftops or gables."
  },
  {
    id: 'bricklaying-l3-topic2-23',
    question: "What is 'rustication' in wall design?",
    options: [
      "Weather protection layer",
      "Shadow-line block texture",
      "Lime-free pointing method",
      "Hidden cavity insulation"
    ],
    correctAnswer: "Shadow-line block texture",
    explanation: "Rustication uses deep joints or bold faces for texture."
  },
  {
    id: 'bricklaying-l3-topic2-24',
    question: "What is the function of a coping stone?",
    options: [
      "To improve drainage slopes",
      "To provide smooth plaster edges",
      "To protect wall tops from water",
      "To anchor wall ties at joints"
    ],
    correctAnswer: "To protect wall tops from water",
    explanation: "Coping stones shed rain and shield the top wall face."
  },
  {
    id: 'bricklaying-l3-topic2-25',
    question: "What is a diaper pattern in masonry?",
    options: [
      "Pattern of alternating brick colors",
      "Weave layout for reinforcing lintels",
      "Offset header bond sequence",
      "Ventilated cavity bond arrangement"
    ],
    correctAnswer: "Pattern of alternating brick colors",
    explanation: "Diaper patterns use colored bricks in decorative geometric layouts."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(
        doc(db, 'questions', 'bricklaying-l3-masonry-structures', 'items', q.id),
        {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }
      );
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

uploadQuestions();
