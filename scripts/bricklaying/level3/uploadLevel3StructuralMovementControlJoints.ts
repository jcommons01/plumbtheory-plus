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

// ✅ Bricklaying Level 3 Structural Movement & Control Joints – 25 Updated Questions
const questions = [
  {
    id: 'bricklaying-l3-structural-1',
    question: "What is the main purpose of a movement joint in masonry?",
    options: ["Reduce material cost", "Allow structural movement", "Improve insulation", "Prevent rainwater entry"],
    correctAnswer: "Allow structural movement",
    explanation: "Movement joints accommodate expansion, contraction, or differential movement in masonry without causing cracking or structural failure."
  },
  {
    id: 'bricklaying-l3-structural-2',
    question: "Which movement type is most associated with temperature changes in masonry?",
    options: ["Wind pressure", "Load bearing", "Thermal expansion", "Moisture transfer"],
    correctAnswer: "Thermal expansion",
    explanation: "Thermal expansion occurs when materials heat up and expand. In masonry, it must be managed to prevent cracking."
  },
  {
    id: 'bricklaying-l3-structural-3',
    question: "What is a common spacing range for vertical movement joints in clay brickwork?",
    options: ["3–5m", "6–9m", "12–15m", "18–20m"],
    correctAnswer: "12–15m",
    explanation: "Clay brick walls typically require movement joints at intervals of 12 to 15 metres to prevent damage from expansion."
  },
  {
    id: 'bricklaying-l3-structural-4',
    question: "What type of material is typically used as a compressible filler in a movement joint?",
    options: ["Timber strip", "Plastic pipe", "Foam backing", "Rigid metal"],
    correctAnswer: "Foam backing",
    explanation: "Compressible foam backing, such as polyethylene, allows sealant movement and maintains joint flexibility."
  },
  {
    id: 'bricklaying-l3-structural-5',
    question: "Which type of movement is usually permanent in clay bricks?",
    options: ["Drying shrinkage", "Vibration movement", "Irreversible moisture expansion", "Air pressure changes"],
    correctAnswer: "Irreversible moisture expansion",
    explanation: "Clay bricks expand slightly over time as they absorb atmospheric moisture — this change is irreversible."
  },
  {
    id: 'bricklaying-l3-structural-6',
    question: "What effect does restrained expansion have on a masonry wall?",
    options: ["Increased fire resistance", "Cracking or distortion", "Stronger structure", "Faster drying"],
    correctAnswer: "Cracking or distortion",
    explanation: "When masonry is prevented from expanding naturally, stress builds up, leading to cracks or bowing."
  },
  {
    id: 'bricklaying-l3-structural-7',
    question: "What is a sliding anchor designed to do?",
    options: ["Support vertical load only", "Allow vertical movement", "Fix wall ties rigidly", "Seal the cavity"],
    correctAnswer: "Allow vertical movement",
    explanation: "Sliding anchors allow for vertical movement while still restraining lateral forces, essential in differential movement situations."
  },
  {
    id: 'bricklaying-l3-structural-8',
    question: "What type of joint should be installed near structural columns in masonry?",
    options: ["Flush joint", "Rigid joint", "Movement joint", "Air void"],
    correctAnswer: "Movement joint",
    explanation: "Movement joints near columns accommodate differential movement and prevent stress-related cracking."
  },
  {
    id: 'bricklaying-l3-structural-9',
    question: "What is the main movement concern in concrete block walls?",
    options: ["Drying shrinkage", "Rapid expansion", "Colour fading", "Increased thickness"],
    correctAnswer: "Drying shrinkage",
    explanation: "Concrete blocks typically shrink as they cure and dry, requiring closer joint spacing than clay bricks."
  },
  {
    id: 'bricklaying-l3-structural-10',
    question: "What allows a wall tie to cross a movement joint?",
    options: ["Mortar pocket", "Cavity sleeve", "Debonded tie", "Rubber gasket"],
    correctAnswer: "Debonded tie",
    explanation: "Debonded wall ties can slide within a sleeve, maintaining stability without restraining movement."
  },
  {
    id: 'bricklaying-l3-structural-11',
    question: "Where should movement joints be placed in relation to wall openings?",
    options: ["Across the centre", "Far from openings", "Near the corners", "Only above lintels"],
    correctAnswer: "Near the corners",
    explanation: "Openings create stress points in masonry, so joints should be located close to the corners to prevent cracking."
  },
  {
    id: 'bricklaying-l3-structural-12',
    question: "Why must movement joints continue through external finishes like render?",
    options: ["To assist drainage", "To hide cracks", "To maintain flexibility", "To improve texture"],
    correctAnswer: "To maintain flexibility",
    explanation: "Movement joints must continue through all finishes to ensure unrestrained movement and prevent surface cracking."
  },
  {
    id: 'bricklaying-l3-structural-13',
    question: "What is the usual sealant used in a movement joint?",
    options: ["Portland cement", "Silicone", "Lime putty", "Tile grout"],
    correctAnswer: "Silicone",
    explanation: "Flexible sealants like silicone or polyurethane accommodate joint movement and provide weather resistance."
  },
  {
    id: 'bricklaying-l3-structural-14',
    question: "Which force typically causes horizontal restraint cracks in masonry?",
    options: ["Freeze-thaw", "Foundation uplift", "Thermal expansion", "Lateral wind"],
    correctAnswer: "Thermal expansion",
    explanation: "When expansion is restrained at the top or base of walls, thermal forces cause horizontal bed joint cracking."
  },
  {
    id: 'bricklaying-l3-structural-15',
    question: "What is the purpose of debonded sleeves around reinforcement crossing joints?",
    options: ["Reduce weight", "Allow slip", "Prevent moisture", "Add insulation"],
    correctAnswer: "Allow slip",
    explanation: "Debonded sleeves let the bar move within the joint, ensuring it doesn’t restrain movement while still providing support."
  },
  {
    id: 'bricklaying-l3-structural-16',
    question: "How does a shelf angle assist with movement control?",
    options: ["Improves drainage", "Supports cladding", "Prevents settlement", "Seals the cavity"],
    correctAnswer: "Supports cladding",
    explanation: "Shelf angles support brickwork and create horizontal breaks where vertical movement can be absorbed."
  },
  {
    id: 'bricklaying-l3-structural-17',
    question: "Which type of brick usually requires closer joint spacing due to shrinkage?",
    options: ["Engineering", "Facing", "Concrete", "Handmade"],
    correctAnswer: "Concrete",
    explanation: "Concrete bricks tend to shrink more over time and therefore need more frequent movement joints."
  },
  {
    id: 'bricklaying-l3-structural-18',
    question: "What should be done when new masonry meets old construction?",
    options: ["Use double bricks", "Leave a gap", "Install a movement joint", "Add reinforcement"],
    correctAnswer: "Install a movement joint",
    explanation: "New and old walls often move differently. A joint prevents cracking caused by this differential behaviour."
  },
  {
    id: 'bricklaying-l3-structural-19',
    question: "What is the role of bed joint reinforcement?",
    options: ["Prevent collapse", "Increase bonding", "Limit cracking", "Act as insulation"],
    correctAnswer: "Limit cracking",
    explanation: "Bed joint reinforcement helps control cracking by distributing stress over a wider area in the wall."
  },
  {
    id: 'bricklaying-l3-structural-20',
    question: "Where should horizontal movement joints be placed in tall buildings?",
    options: ["At roof level only", "Every third floor", "At each floor or alternate floor", "Only on the ground floor"],
    correctAnswer: "At each floor or alternate floor",
    explanation: "Tall buildings experience vertical frame deflection, requiring horizontal joints in the brickwork to avoid cracking."
  },
  {
    id: 'bricklaying-l3-structural-21',
    question: "What is the effect of sulphate attack on mortar?",
    options: ["Colour fading", "Improved bonding", "Expansion and cracking", "Hardening"],
    correctAnswer: "Expansion and cracking",
    explanation: "Sulphates react with cement in mortar, causing expansion that leads to cracking and loss of strength."
  },
  {
    id: 'bricklaying-l3-structural-22',
    question: "What is differential movement?",
    options: ["Equal movement", "Movement of timber only", "Uneven movement between materials", "Lateral wall shift"],
    correctAnswer: "Uneven movement between materials",
    explanation: "Differential movement occurs when materials expand, shrink or settle at different rates, creating stress at junctions."
  },
  {
    id: 'bricklaying-l3-structural-23',
    question: "What is the best way to accommodate movement at the top of a freestanding wall?",
    options: ["Add a DPC", "Use coping joints", "Increase wall height", "Add wall ties"],
    correctAnswer: "Use coping joints",
    explanation: "Movement joints should extend through coping stones to prevent failure due to differential movement."
  },
  {
    id: 'bricklaying-l3-structural-24',
    question: "What is the function of articulation joints?",
    options: ["Add decoration", "Create fixed points", "Divide panels", "Support rendering"],
    correctAnswer: "Divide panels",
    explanation: "Articulation joints divide long masonry runs into smaller sections to reduce stress and control cracking."
  },
  {
    id: 'bricklaying-l3-structural-25',
    question: "What is the usual effect of foundation settlement on rigid masonry?",
    options: ["No effect", "Improves strength", "Causes cracking", "Prevents expansion"],
    correctAnswer: "Causes cracking",
    explanation: "Rigid masonry does not tolerate uneven foundation movement well, and differential settlement causes cracks."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-structural-movement', 'items', q.id), {
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
