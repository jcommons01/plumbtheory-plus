// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Surveying.ts

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

// ✅ Joinery Level 3 Site Surveying & Setting Out Questions
const questions = [
  {
    id: 'joinery-l3-surveying1',
    question: "Why is a datum point established during a site survey?",
    options: ["To locate water sources", "To provide a consistent reference level", "To mark delivery areas", "To measure door heights"],
    correctAnswer: "To provide a consistent reference level",
    explanation: "A datum point offers a fixed level from which all vertical measurements are made, ensuring joinery items align accurately throughout the space."
  },
  {
    id: 'joinery-l3-surveying2',
    question: "Which tool is best for checking a wall’s vertical alignment?",
    options: ["Chalk line", "Spirit level", "Sliding bevel", "Mitre saw"],
    correctAnswer: "Spirit level",
    explanation: "A spirit level provides a quick and accurate check to ensure a surface is plumb, critical for vertical joinery elements."
  },
  {
    id: 'joinery-l3-surveying3',
    question: "Why should diagonal measurements be taken when measuring a room?",
    options: ["To check for moisture", "To calculate paint quantity", "To confirm the room is square", "To locate joists"],
    correctAnswer: "To confirm the room is square",
    explanation: "Equal diagonals indicate square corners, which is essential for the accurate fitting of joinery items like cabinets or flooring."
  },
  {
    id: 'joinery-l3-surveying4',
    question: "What is the function of a laser level in joinery surveying?",
    options: ["To scan for damp", "To set vertical lines", "To measure angles", "To project straight level lines"],
    correctAnswer: "To project straight level lines",
    explanation: "Laser levels are used to cast accurate horizontal or vertical lines, ideal for setting out reference lines during installation."
  },
  {
    id: 'joinery-l3-surveying5',
    question: "Why should moisture content be checked before installing timber joinery?",
    options: ["To prevent timber from fading", "To reduce paint drying time", "To avoid shrinkage or warping", "To aid varnish adhesion"],
    correctAnswer: "To avoid shrinkage or warping",
    explanation: "High moisture content in timber can lead to distortion after installation. Surveying helps assess if materials need conditioning."
  },
  {
    id: 'joinery-l3-surveying6',
    question: "What is the purpose of a trammel in setting out joinery?",
    options: ["To cut angles", "To align joints", "To draw large arcs", "To fix brackets"],
    correctAnswer: "To draw large arcs",
    explanation: "A trammel allows precise marking of large curves or circles, especially useful in curved staircases or furniture fronts."
  },
  {
    id: 'joinery-l3-surveying7',
    question: "Why are photos useful during a site survey?",
    options: ["They replace drawings", "They show staff locations", "They provide visual references", "They assist with deliveries"],
    correctAnswer: "They provide visual references",
    explanation: "Photographs supplement notes by capturing site conditions, architectural details, or obstructions that impact joinery design."
  },
  {
    id: 'joinery-l3-surveying8',
    question: "Why should ceiling height be measured at several points?",
    options: ["To estimate materials", "To find light fittings", "To identify variations", "To check floor insulation"],
    correctAnswer: "To identify variations",
    explanation: "Ceilings are rarely level across a room; checking height at multiple points ensures joinery fits evenly and neatly."
  },
  {
    id: 'joinery-l3-surveying9',
    question: "What does a setting out line ensure during installation?",
    options: ["Security", "Alignment", "Speed", "Colour match"],
    correctAnswer: "Alignment",
    explanation: "A setting out line serves as a reference from which measurements and placements are taken, ensuring precise alignment."
  },
  {
    id: 'joinery-l3-surveying10',
    question: "When surveying for wall units, why is wall composition noted?",
    options: ["For acoustic testing", "For painting", "To choose fixings", "To identify damp zones"],
    correctAnswer: "To choose fixings",
    explanation: "Knowing if a wall is masonry, timber, or plasterboard helps determine the correct fixings for securely mounting joinery."
  },
  {
    id: 'joinery-l3-surveying11',
    question: "What is the purpose of a story rod?",
    options: ["To check plumbing lines", "To level floors", "To transfer repeated measurements", "To mark power outlets"],
    correctAnswer: "To transfer repeated measurements",
    explanation: "A story rod contains key dimensions and is used to transfer consistent measurements across multiple units or rooms."
  },
  {
    id: 'joinery-l3-surveying12',
    question: "What is the 3-4-5 rule used for?",
    options: ["Timber grading", "Estimating costs", "Establishing square corners", "Plumb checking"],
    correctAnswer: "Establishing square corners",
    explanation: "The 3-4-5 rule uses right-angle triangle measurements to form 90° angles when setting out layouts accurately."
  },
  {
    id: 'joinery-l3-surveying13',
    question: "Why check door swing during a survey?",
    options: ["To position flooring", "To select timber", "To avoid joinery obstruction", "To adjust window seals"],
    correctAnswer: "To avoid joinery obstruction",
    explanation: "Knowing the direction and arc of door swings ensures that installed joinery won’t block movement or collide with doors."
  },
  {
    id: 'joinery-l3-surveying14',
    question: "Why would a flexible curve be used on site?",
    options: ["To draw logos", "To measure pipes", "To copy irregular shapes", "To sharpen chisels"],
    correctAnswer: "To copy irregular shapes",
    explanation: "Flexible curves can be moulded to match irregular edges and transferred to templates or boards for cutting."
  },
  {
    id: 'joinery-l3-surveying15',
    question: "Which tool best measures long internal spans quickly?",
    options: ["Steel square", "Laser measure", "Sliding bevel", "Spanner"],
    correctAnswer: "Laser measure",
    explanation: "Laser distance meters measure internal spans accurately and quickly, especially where tape measures are impractical."
  },
  {
    id: 'joinery-l3-surveying16',
    question: "Why might a surveyor note radiator positions?",
    options: ["To clean them", "To install sockets", "To plan around obstructions", "To test plumbing"],
    correctAnswer: "To plan around obstructions",
    explanation: "Joinery designs must account for items like radiators that may obstruct installations or require allowances for heat."
  },
  {
    id: 'joinery-l3-surveying17',
    question: "What is checked first before cutting into an internal wall?",
    options: ["Window alignment", "Door position", "Load bearing status", "Skirting type"],
    correctAnswer: "Load bearing status",
    explanation: "Identifying whether a wall is load-bearing is crucial, as structural alterations require supports and possibly approval."
  },
  {
    id: 'joinery-l3-surveying18',
    question: "Why is headroom checked for stair installation?",
    options: ["To fit furniture", "To install lighting", "To meet building rules", "To paint ceilings"],
    correctAnswer: "To meet building rules",
    explanation: "Building Regulations require minimum headroom above stairs to ensure safety and comfort when using the staircase."
  },
  {
    id: 'joinery-l3-surveying19',
    question: "Why are templates sometimes made on site?",
    options: ["To speed up delivery", "To reduce paperwork", "To match awkward shapes", "To colour-match surfaces"],
    correctAnswer: "To match awkward shapes",
    explanation: "Templates are used to replicate complex or curved surfaces, ensuring the final joinery is cut to fit precisely."
  },
  {
    id: 'joinery-l3-surveying20',
    question: "Why measure floor level differences between rooms?",
    options: ["To match curtain height", "To balance heating", "To align units", "To install carpet grippers"],
    correctAnswer: "To align units",
    explanation: "Floor level differences affect the alignment of joinery items like counters, which may run across multiple rooms."
  },
  {
    id: 'joinery-l3-surveying21',
    question: "Why record window sizes during joinery surveys?",
    options: ["To plan cleaning", "To arrange glazing", "To align furniture designs", "To order carpets"],
    correctAnswer: "To align furniture designs",
    explanation: "Window locations influence the positioning and size of fitted furniture such as desks, seating or wardrobes."
  },
  {
    id: 'joinery-l3-surveying22',
    question: "Why is ‘making good’ noted in a survey?",
    options: ["To reduce skips", "To simplify joinery", "To plan repair works", "To order screws"],
    correctAnswer: "To plan repair works",
    explanation: "‘Making good’ refers to minor building repairs needed after joinery is fitted, and should be planned and costed in advance."
  },
  {
    id: 'joinery-l3-surveying23',
    question: "Why are obstructions like sockets recorded in surveys?",
    options: ["To test them", "To paint them", "To avoid clashes", "To change their colour"],
    correctAnswer: "To avoid clashes",
    explanation: "Sockets and switches must remain accessible; noting them prevents designs that obscure or block access."
  },
  {
    id: 'joinery-l3-surveying24',
    question: "What would be used to copy an ornate skirting profile?",
    options: ["Tape", "Compass", "Profile gauge", "Plumb bob"],
    correctAnswer: "Profile gauge",
    explanation: "A profile gauge captures the outline of mouldings, allowing joiners to reproduce or match the shape precisely."
  },
  {
    id: 'joinery-l3-surveying25',
    question: "What is the purpose of acclimatising timber before installation?",
    options: ["To change its colour", "To match the site smell", "To stabilise moisture content", "To improve finish quality"],
    correctAnswer: "To stabilise moisture content",
    explanation: "Acclimatisation allows timber to adjust to site humidity and temperature, helping prevent distortion after fitting."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-surveying', 'items', q.id), {
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
