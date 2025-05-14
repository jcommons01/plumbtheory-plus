// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2ToolsEquipment.ts

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

// ✅ Joinery Level 2 Tools & Equipment Questions
const questions = [
  {
    id: 'joinery-l2-tools-equipment1',
    question: "What is the primary purpose of a marking gauge in joinery?",
    options: ["To mark parallel lines at a set distance from an edge", "To measure the moisture content of timber", "To check if a surface is level", "To measure the hardness of timber"],
    correctAnswer: "To mark parallel lines at a set distance from an edge",
    explanation: "Marking gauges scribe consistent parallel lines from an edge for accurate joint layout."
  },
  {
    id: 'joinery-l2-tools-equipment2',
    question: "Which of the following saws is designed specifically for cutting across the grain of timber?",
    options: ["Tenon saw", "Cross-cut saw", "Rip saw", "Bow saw"],
    correctAnswer: "Cross-cut saw",
    explanation: "Cross-cut saws have knife-like teeth arranged to cleanly sever wood fibres when cutting across grain."
  },
  {
    id: 'joinery-l2-tools-equipment3',
    question: "What is the primary purpose of a router in joinery work?",
    options: ["To connect to the internet", "To create decorative or functional cuts, grooves, and profiles", "To smooth rough timber surfaces", "To drive screws into timber"],
    correctAnswer: "To create decorative or functional cuts, grooves, and profiles",
    explanation: "Routers use spinning bits to create precise cuts, grooves, rebates, profiles and decorative details."
  },
  {
    id: 'joinery-l2-tools-equipment4',
    question: "What is the correct name for the tool used to create a smooth, flat surface on timber by removing thin shavings?",
    options: ["Chisel", "Screwdriver", "File", "Plane"],
    correctAnswer: "Plane",
    explanation: "Planes remove thin, controlled shavings to create flat, smooth surfaces on timber."
  },
  {
    id: 'joinery-l2-tools-equipment5',
    question: "What is the primary purpose of a mortise gauge compared to a standard marking gauge?",
    options: ["It can mark two parallel lines simultaneously for mortise and tenon joints", "It can only mark softwoods", "It is used exclusively for measuring angles", "It automatically cuts mortises rather than just marking them"],
    correctAnswer: "It can mark two parallel lines simultaneously for mortise and tenon joints",
    explanation: "Mortise gauges have two adjustable pins/knives to mark both sides of a mortise simultaneously."
  },
  {
    id: 'joinery-l2-tools-equipment6',
    question: "Which type of chisel is specifically designed for accessing tight corners and cleaning out waste in joints?",
    options: ["Mortise chisel", "Corner chisel", "Firmer chisel", "Bevel-edged chisel"],
    correctAnswer: "Corner chisel",
    explanation: "Corner chisels have 90-degree blades that clean and square corners with a single strike."
  },
  {
    id: 'joinery-l2-tools-equipment7',
    question: "What is the correct function of a biscuit jointer in modern joinery?",
    options: ["To create decorative biscuit-shaped patterns on timber surfaces", "To heat up and shape plastic components", "To cut perfectly round holes for dowels", "To cut slots for flat oval wooden biscuits that align and strengthen joints"],
    correctAnswer: "To cut slots for flat oval wooden biscuits that align and strengthen joints",
    explanation: "Biscuit jointers cut precise slots for compressed wooden inserts that expand with glue, providing alignment."
  },
  {
    id: 'joinery-l2-tools-equipment8',
    question: "When using a hand-held circular saw, which way should the good face of the timber be oriented?",
    options: ["Always good face up", "Good face up when cutting sheet materials, good face down when cutting solid timber", "It makes no difference", "Always good face down"],
    correctAnswer: "Good face up when cutting sheet materials, good face down when cutting solid timber",
    explanation: "Orientation prevents tear-out on the finished face based on the upward cutting action."
  },
  {
    id: 'joinery-l2-tools-equipment9',
    question: "What is the main purpose of a try square in joinery?",
    options: ["To measure the hardness of timber", "To create curves and circles", "To check if timber is dry enough to use", "To check and mark right angles (90 degrees)"],
    correctAnswer: "To check and mark right angles (90 degrees)",
    explanation: "Try squares verify and mark perfect 90-degree angles between edges and faces."
  },
  {
    id: 'joinery-l2-tools-equipment10',
    question: "Which power tool is most appropriate for cutting curved shapes in sheet materials?",
    options: ["Jigsaw", "Circular saw", "Router", "Plane"],
    correctAnswer: "Jigsaw",
    explanation: "Jigsaws have narrow, reciprocating blades that can follow curved lines and create internal cutouts."
  },
  {
    id: 'joinery-l2-tools-equipment11',
    question: "What is the purpose of a block plane in joinery?",
    options: ["To cut blocks of wood into smaller pieces", "To shape large curves", "To smooth end grain and make small adjustments to components", "To hold workpieces securely"],
    correctAnswer: "To smooth end grain and make small adjustments to components",
    explanation: "Block planes have low blade angles ideal for smoothing end grain and fine trimming."
  },
  {
    id: 'joinery-l2-tools-equipment12',
    question: "Which of the following is the most appropriate tool for cutting a housing joint by hand?",
    options: ["Coping saw", "Brace and bit", "Spokeshave", "Tenon saw and chisel"],
    correctAnswer: "Tenon saw and chisel",
    explanation: "Tenon saws cut the sides of housings while chisels remove waste to create flat-bottomed recesses."
  },
  {
    id: 'joinery-l2-tools-equipment13',
    question: "What is the purpose of a combination square in joinery?",
    options: ["It can only be used to check if timber is dry enough", "It can only be used to draw squares and rectangles", "It is used exclusively for combining different timber species", "It combines several functions including checking 45° and 90° angles, marking depths, and acting as a basic level"],
    correctAnswer: "It combines several functions including checking 45° and 90° angles, marking depths, and acting as a basic level",
    explanation: "Combination squares offer multiple layout functions with adjustable rules, angles and often level bubbles."
  },
  {
    id: 'joinery-l2-tools-equipment14',
    question: "Which of the following tools is most appropriate for creating mortises in modern joinery practice?",
    options: ["Belt sander", "Hollow chisel mortiser", "Pillar drill", "Bandsaw"],
    correctAnswer: "Hollow chisel mortiser",
    explanation: "Hollow chisel mortisers combine drilling and squaring actions to create precise rectangular mortises efficiently."
  },
  {
    id: 'joinery-l2-tools-equipment15',
    question: "What is the correct procedure for adjusting a bench plane for fine shavings?",
    options: ["Remove the cap iron completely for the finest cuts", "Adjust only the lateral adjustment lever, never the depth", "Retract the blade fully and then extend it until it just begins to cut", "Extend the blade as far as possible from the sole"],
    correctAnswer: "Retract the blade fully and then extend it until it just begins to cut",
    explanation: "Proper adjustment starts with a fully retracted blade that's gradually extended until just cutting."
  },
  {
    id: 'joinery-l2-tools-equipment16',
    question: "What is the purpose of a panel saw in joinery?",
    options: ["To cut perfect circles", "To smooth panel surfaces", "To cut very small pieces of timber", "To cut large panels and make initial dimensioning cuts in timber"],
    correctAnswer: "To cut large panels and make initial dimensioning cuts in timber",
    explanation: "Panel saws have long blades for initial breakdown of large timber sections and sheet materials."
  },
  {
    id: 'joinery-l2-tools-equipment17',
    question: "What is the primary purpose of a belt sander in joinery?",
    options: ["To mix adhesives", "To drive screws into timber", "To rapidly remove material and level surfaces", "To cut precise joints"],
    correctAnswer: "To rapidly remove material and level surfaces",
    explanation: "Belt sanders use continuous abrasive belts for fast material removal and surface levelling."
  },
  {
    id: 'joinery-l2-tools-equipment18',
    question: "Which of the following tools would be most appropriate for planing a curved or shaped surface?",
    options: ["Spokeshave", "Jack plane", "Try plane", "Mortise chisel"],
    correctAnswer: "Spokeshave",
    explanation: "Spokeshaves have short soles and handles that provide control when working curved surfaces."
  },
  {
    id: 'joinery-l2-tools-equipment19',
    question: "What does PAT testing ensure about electrical tools used in joinery?",
    options: ["It checks the power consumption only", "It measures the tool's cutting efficiency", "It ensures the tool is electrically safe to use", "It tests that the tool meets quality standards for professional work"],
    correctAnswer: "It ensures the tool is electrically safe to use",
    explanation: "PAT testing verifies electrical tools are safe by checking for damage and electrical integrity."
  },
  {
    id: 'joinery-l2-tools-equipment20',
    question: "Which type of saw is most appropriate for cutting tenon cheeks?",
    options: ["Bow saw", "Coping saw", "Hacksaw", "Tenon saw"],
    correctAnswer: "Tenon saw",
    explanation: "Tenon saws have fine teeth and stiff back spines providing precision for accurate joinery cuts."
  },
  {
    id: 'joinery-l2-tools-equipment21',
    question: "What is the primary purpose of a random orbital sander in joinery?",
    options: ["To sand only end grain", "To remove large amounts of material quickly", "To cut accurate circles", "To provide a fine, swirl-free finish in preparation for applying finishes"],
    correctAnswer: "To provide a fine, swirl-free finish in preparation for applying finishes",
    explanation: "Random orbital sanders combine spinning and elliptical movements to create swirl-free sanding patterns."
  },
  {
    id: 'joinery-l2-tools-equipment22',
    question: "What is the primary advantage of a domino jointer over a biscuit jointer?",
    options: ["It is much cheaper to purchase", "It creates oval slots for stronger floating tenons that resist rotation", "It can only be used on softwoods", "It creates round dowel holes"],
    correctAnswer: "It creates oval slots for stronger floating tenons that resist rotation",
    explanation: "Domino jointers create slots for substantial tenons that provide structural strength and resist rotation."
  },
  {
    id: 'joinery-l2-tools-equipment23',
    question: "Which tool would be most appropriate for accurately measuring internal angles when fitting joinery?",
    options: ["Try square", "Tape measure", "Sliding bevel", "Steel rule"],
    correctAnswer: "Sliding bevel",
    explanation: "Sliding bevels capture and transfer exact angles with an adjustable blade that locks in position."
  },
  {
    id: 'joinery-l2-tools-equipment24',
    question: "What is the primary purpose of a router table in joinery?",
    options: ["To provide internet connectivity in the workshop", "To hold a portable router upside down, providing more control for certain operations", "To route electrical cables safely", "To store router bits only"],
    correctAnswer: "To hold a portable router upside down, providing more control for certain operations",
    explanation: "Router tables mount routers upside-down, providing stability when working with smaller components."
  },
  {
    id: 'joinery-l2-tools-equipment25',
    question: "What is the purpose of a featherboard in woodworking machinery setup?",
    options: ["To measure the thickness of timber before cutting", "To create decorative feather patterns on timber", "To sweep away sawdust from the cutting area", "To hold timber securely against fences or tables during machining"],
    correctAnswer: "To hold timber securely against fences or tables during machining",
    explanation: "Featherboards have flexible fingers that maintain pressure against workpieces while allowing forward movement."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-tools-equipment', 'items', q.id), {
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
