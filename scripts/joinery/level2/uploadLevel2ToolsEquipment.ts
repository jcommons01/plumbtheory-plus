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
    options: ["To mark parallel lines", "To measure timber moisture", "To check level surfaces", "To measure timber hardness"],
    correctAnswer: "To mark parallel lines",
    explanation: "Marking gauges are used to scribe accurate parallel lines, essential for making precise cuts and joints."
  },
  {
    id: 'joinery-l2-tools-equipment2',
    question: "Which of the following saws is designed specifically for cutting across the grain of timber?",
    options: ["Tenon saw", "Cross-cut saw", "Rip saw", "Bow saw"],
    correctAnswer: "Cross-cut saw",
    explanation: "Cross-cut saws have fine teeth designed specifically for cutting across the grain of the timber."
  },
  {
    id: 'joinery-l2-tools-equipment3',
    question: "What is the primary purpose of a router in joinery work?",
    options: ["To create cuts and profiles", "To smooth rough timber", "To drill holes", "To drive screws into timber"],
    correctAnswer: "To create cuts and profiles",
    explanation: "Routers are used to create precise cuts, grooves, and decorative profiles in timber."
  },
  {
    id: 'joinery-l2-tools-equipment4',
    question: "What is the correct name for the tool used to create a smooth, flat surface on timber by removing thin shavings?",
    options: ["Chisel", "Screwdriver", "File", "Plane"],
    correctAnswer: "Plane",
    explanation: "Planes are used for smoothing and flattening timber by shaving off thin layers to create a flat surface."
  },
  {
    id: 'joinery-l2-tools-equipment5',
    question: "What is the primary purpose of a mortise gauge compared to a standard marking gauge?",
    options: ["Marks two lines for joints", "Marks only softwoods", "Measures angles", "Cuts mortises automatically"],
    correctAnswer: "Marks two lines for joints",
    explanation: "A mortise gauge marks two parallel lines simultaneously, which is useful for mortise and tenon joints."
  },
  {
    id: 'joinery-l2-tools-equipment6',
    question: "Which type of chisel is specifically designed for accessing tight corners and cleaning out waste in joints?",
    options: ["Mortise chisel", "Corner chisel", "Firmer chisel", "Bevel-edged chisel"],
    correctAnswer: "Corner chisel",
    explanation: "Corner chisels are designed for cleaning tight corners and creating precise joints."
  },
  {
    id: 'joinery-l2-tools-equipment7',
    question: "What is the correct function of a biscuit jointer in modern joinery?",
    options: ["To create patterns", "To cut slots for biscuits", "To cut dowel holes", "To heat and shape plastic"],
    correctAnswer: "To cut slots for biscuits",
    explanation: "Biscuit jointers cut slots in timber for wooden biscuits that expand when glued, helping to align and strengthen joints."
  },
  {
    id: 'joinery-l2-tools-equipment8',
    question: "When using a hand-held circular saw, which way should the good face of the timber be oriented?",
    options: ["Good face up for sheet materials", "Good face down for solid timber", "It doesn't matter", "Good face up for solid timber"],
    correctAnswer: "Good face up for sheet materials",
    explanation: "Cutting with the good face up when using a circular saw on sheet materials reduces splintering."
  },
  {
    id: 'joinery-l2-tools-equipment9',
    question: "What is the main purpose of a try square in joinery?",
    options: ["To check right angles", "To measure timber hardness", "To create curves", "To check moisture content"],
    correctAnswer: "To check right angles",
    explanation: "Try squares are used for verifying and marking 90-degree angles in timber."
  },
  {
    id: 'joinery-l2-tools-equipment10',
    question: "Which power tool is most appropriate for cutting curved shapes in sheet materials?",
    options: ["Jigsaw", "Circular saw", "Router", "Plane"],
    correctAnswer: "Jigsaw",
    explanation: "Jigsaws are best for cutting curves and irregular shapes in sheet materials, offering flexibility and control."
  },
  {
    id: 'joinery-l2-tools-equipment11',
    question: "What is the purpose of a block plane in joinery?",
    options: ["To smooth end grain", "To trim large components", "To cut blocks into smaller pieces", "To hold workpieces in place"],
    correctAnswer: "To smooth end grain",
    explanation: "Block planes are specifically designed for smoothing and trimming the end grain of timber."
  },
  {
    id: 'joinery-l2-tools-equipment12',
    question: "Which of the following is the most appropriate tool for cutting a housing joint by hand?",
    options: ["Coping saw", "Brace and bit", "Spokeshave", "Tenon saw and chisel"],
    correctAnswer: "Tenon saw and chisel",
    explanation: "A tenon saw cuts the sides of housings, while chisels are used to remove waste material and finish the joint."
  },
  {
    id: 'joinery-l2-tools-equipment13',
    question: "What is the purpose of a combination square in joinery?",
    options: ["It checks angles and depths", "It marks squares", "It checks moisture content", "It marks 45° angles only"],
    correctAnswer: "It checks angles and depths",
    explanation: "Combination squares check angles, measure depths, and can also act as a basic level tool."
  },
  {
    id: 'joinery-l2-tools-equipment14',
    question: "Which of the following tools is most appropriate for creating mortises in modern joinery practice?",
    options: ["Belt sander", "Hollow chisel mortiser", "Pillar drill", "Bandsaw"],
    correctAnswer: "Hollow chisel mortiser",
    explanation: "Hollow chisel mortisers create precise rectangular mortises with a combination of drilling and squaring actions."
  },
  {
    id: 'joinery-l2-tools-equipment15',
    question: "What is the correct procedure for adjusting a bench plane for fine shavings?",
    options: ["Retract the blade and extend it gradually", "Remove the cap iron", "Adjust the lateral lever", "Extend the blade fully"],
    correctAnswer: "Retract the blade and extend it gradually",
    explanation: "Start by retracting the blade fully and then extend it slowly to achieve fine, controlled cuts."
  },
  {
    id: 'joinery-l2-tools-equipment16',
    question: "What is the purpose of a panel saw in joinery?",
    options: ["To cut large panels", "To smooth surfaces", "To cut small pieces", "To trim edges"],
    correctAnswer: "To cut large panels",
    explanation: "Panel saws are designed to make accurate cuts in large timber panels and sheet materials."
  },
  {
    id: 'joinery-l2-tools-equipment17',
    question: "What is the primary purpose of a belt sander in joinery?",
    options: ["To remove material quickly", "To smooth joints", "To trim components", "To clean sawdust"],
    correctAnswer: "To remove material quickly",
    explanation: "Belt sanders are designed for rapid material removal and are ideal for smoothing rough surfaces."
  },
  {
    id: 'joinery-l2-tools-equipment18',
    question: "Which of the following tools would be most appropriate for planing a curved or shaped surface?",
    options: ["Spokeshave", "Jack plane", "Try plane", "Mortise chisel"],
    correctAnswer: "Spokeshave",
    explanation: "Spokeshaves are ideal for planing curved surfaces, offering better control on smaller or irregular shapes."
  },
  {
    id: 'joinery-l2-tools-equipment19',
    question: "What does PAT testing ensure about electrical tools used in joinery?",
    options: ["It ensures electrical safety", "It checks tool performance", "It measures cutting efficiency", "It tests timber hardness"],
    correctAnswer: "It ensures electrical safety",
    explanation: "PAT testing ensures that electrical tools are safe to use by checking their insulation and wiring integrity."
  },
  {
    id: 'joinery-l2-tools-equipment20',
    question: "Which type of saw is most appropriate for cutting tenon cheeks?",
    options: ["Bow saw", "Coping saw", "Hacksaw", "Tenon saw"],
    correctAnswer: "Tenon saw",
    explanation: "Tenon saws are designed for precise, clean cuts in tenon joints, including cutting the cheeks of the tenon."
  },
  {
    id: 'joinery-l2-tools-equipment21',
    question: "What is the primary purpose of a random orbital sander in joinery?",
    options: ["To sand end grain", "To remove material quickly", "To provide a fine finish", "To cut accurate circles"],
    correctAnswer: "To provide a fine finish",
    explanation: "Random orbital sanders create a smooth, swirl-free finish by combining spinning and elliptical movements."
  },
  {
    id: 'joinery-l2-tools-equipment22',
    question: "What is the primary advantage of a domino jointer over a biscuit jointer?",
    options: ["It is cheaper", "It creates stronger tenons", "It works only on softwoods", "It creates dowel holes"],
    correctAnswer: "It creates stronger tenons",
    explanation: "Domino jointers create slots for larger, stronger tenons that resist rotation, offering more structural stability."
  },
  {
    id: 'joinery-l2-tools-equipment23',
    question: "Which tool would be most appropriate for accurately measuring internal angles when fitting joinery?",
    options: ["Try square", "Tape measure", "Sliding bevel", "Steel rule"],
    correctAnswer: "Sliding bevel",
    explanation: "Sliding bevels are ideal for transferring and measuring precise internal angles during joinery."
  },
  {
    id: 'joinery-l2-tools-equipment24',
    question: "What is the primary purpose of a router table in joinery?",
    options: ["To store router bits", "To hold the router upside down", "To provide internet in the workshop", "To route cables safely"],
    correctAnswer: "To hold the router upside down",
    explanation: "Router tables provide stability when working with smaller pieces by mounting the router upside down."
  },
  {
    id: 'joinery-l2-tools-equipment25',
    question: "What is the purpose of a featherboard in woodworking machinery setup?",
    options: ["To measure timber thickness", "To create decorative patterns", "To hold timber securely", "To sweep sawdust away"],
    correctAnswer: "To hold timber securely",
    explanation: "Featherboards apply pressure to workpieces during machining, ensuring accurate cuts and safe operation."
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
