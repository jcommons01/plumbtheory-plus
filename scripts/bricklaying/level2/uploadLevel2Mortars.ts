// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Mortars.ts

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

// ✅ Bricklaying Level 2 Mixing & Using Mortars Questions
const questions = [
  {
    id: 'bricklaying-l2-mortars1',
    question: "What are the four main ingredients of traditional mortar?",
    options: ["Cement, sand, lime, and water", "Cement, gravel, ash, and lime", "Gypsum, sand, lime, and clay", "Cement, chalk, water, and lime"],
    correctAnswer: "Cement, sand, lime, and water",
    explanation: "The four main ingredients of traditional mortar are cement, sand, lime, and water. Cement acts as the primary binder, developing strength through hydration. Sand provides bulk, dimensional stability, and texture. Lime improves workability, flexibility, and self-healing properties for minor cracks. Water activates the chemical reactions in cement and lime while providing the necessary consistency for application."
  },
  {
    id: 'bricklaying-l2-mortars2',
    question: "What does the term 'designation' mean in relation to mortar mixes?",
    options: ["The final color of hardened mortar", "The brand name of bagged mortar", "The numeric mix ratio of components", "The tools used to lay bricks"],
    correctAnswer: "The numeric mix ratio of components",
    explanation: "In mortar mixes, 'designation' refers to the specific numeric mixture ratio of cement, lime, and sand used, like 1:1:6 or 1:2:9. These ratios define strength and application."
  },
  {
    id: 'bricklaying-l2-mortars3',
    question: "Which mortar mix is used for chimney stacks above roof level?",
    options: ["Designation (v) for light loads", "Designation (iv) for interior walls", "Designation (iii) for low weather", "Designation (i) for exposed areas"],
    correctAnswer: "Designation (i) for exposed areas",
    explanation: "Designation (i) is the strongest mix and is used where high strength and durability are needed, such as chimney stacks exposed to weather."
  },
  {
    id: 'bricklaying-l2-mortars4',
    question: "What property does lime add when used in mortar mixes?",
    options: ["Fast curing and high strength", "Better water resistance", "Workability and flexibility", "Hardness and shrinkage control"],
    correctAnswer: "Workability and flexibility",
    explanation: "Lime makes mortar more workable and flexible, allowing it to accommodate movement and improving water retention during application."
  },
  {
    id: 'bricklaying-l2-mortars5',
    question: "What is the recommended time limit for using mixed mortar?",
    options: ["30 minutes after mixing", "2 hours after mixing", "4 hours after mixing", "As long as it stays moist"],
    correctAnswer: "2 hours after mixing",
    explanation: "Mortar should be used within 2 hours to avoid losing workability and strength as hydration starts soon after mixing."
  },
  {
    id: 'bricklaying-l2-mortars6',
    question: "What effect does cold weather below 4°C have on mortar?",
    options: ["It improves curing strength", "It helps slow down cracking", "It prevents proper setting", "It increases water retention"],
    correctAnswer: "It prevents proper setting",
    explanation: "Below 4°C, mortar struggles to set as hydration slows. Freezing can damage its internal structure before curing completes."
  },
  {
    id: 'bricklaying-l2-mortars7',
    question: "What is the purpose of 'pointing' in brickwork construction?",
    options: ["Lining bricks during build", "Joining cavity ties securely", "Finishing joints for durability", "Marking where to drill vents"],
    correctAnswer: "Finishing joints for durability",
    explanation: "Pointing is the process of shaping mortar joints to improve appearance and help shed water, increasing the wall's resistance."
  },
  {
    id: 'bricklaying-l2-mortars8',
    question: "Why is using the correct sand type important in mortar?",
    options: ["To reduce the cost of materials", "To increase mix setting speed", "To boost strength and workability", "To match brick colour perfectly"],
    correctAnswer: "To boost strength and workability",
    explanation: "Correct sand ensures strength, durability, and workability. Sharp sand is strong; soft sand improves spreadability."
  },
  {
    id: 'bricklaying-l2-mortars9',
    question: "What does a plasticizer do in a mortar mix?",
    options: ["Adds water resistance", "Improves flexibility", "Reduces water needed", "Stops air bubbles forming"],
    correctAnswer: "Reduces water needed",
    explanation: "Plasticizers improve mortar workability so less water is needed, which helps maintain strength while improving usability."
  },
  {
    id: 'bricklaying-l2-mortars10',
    question: "What should you do if mortar begins to stiffen during use?",
    options: ["Add lots of water quickly", "Mix in more dry sand", "Briefly remix with minimal water", "Start a completely new batch"],
    correctAnswer: "Briefly remix with minimal water",
    explanation: "Retempering by lightly remixing can extend the mortar's life within its 2-hour window. Too much water ruins strength."
  },
  {
    id: 'bricklaying-l2-mortars11',
    question: "Why are mortar joints 'struck' during brickwork? ",
    options: ["To remove all excess mortar", "To give texture to the wall", "To shape joints for strength", "To seal cracks on the surface"],
    correctAnswer: "To shape joints for strength",
    explanation: "Striking compresses mortar and creates a weatherproof profile. It strengthens the joint and helps shed water effectively."
  },
  {
    id: 'bricklaying-l2-mortars12',
    question: "Which mortar mix suits internal, non-loadbearing walls?",
    options: ["Designation (v) weak mix", "Designation (i) strong mix", "Designation (ii) durable mix", "Sand-only base mix"],
    correctAnswer: "Designation (v) weak mix",
    explanation: "Internal non-loadbearing walls don't require high strength, so weaker, lime-rich mixes like (iv) or (v) are suitable."
  },
  {
    id: 'bricklaying-l2-mortars13',
    question: "How should mortar be mixed by hand?",
    options: ["Wet first, then dry mix", "Mix dry first, then add water", "Sand then cement, then water", "Layer and stir in water directly"],
    correctAnswer: "Mix dry first, then add water",
    explanation: "The correct way is to thoroughly mix dry components first, then gradually add water to control consistency."
  },
  {
    id: 'bricklaying-l2-mortars14',
    question: "Why include hydrated lime in cement mortar?",
    options: ["To colour the mix", "To reduce shrinkage", "To add strength only", "To improve flexibility"],
    correctAnswer: "To improve flexibility",
    explanation: "Lime improves plasticity and flexibility, helping prevent cracks and making the mix easier to use."
  },
  {
    id: 'bricklaying-l2-mortars15',
    question: "What is the typical mortar joint thickness in UK brickwork?",
    options: ["5mm average size", "8mm joint width", "10mm joint thickness", "12mm spacing between bricks"],
    correctAnswer: "10mm joint thickness",
    explanation: "UK bricks use 10mm mortar joints to allow alignment, strength, and expansion within the standard 225mm length."
  },
  {
    id: 'bricklaying-l2-mortars16',
    question: "How does water content influence mortar strength?",
    options: ["More water increases strength", "No water affects strength", "Less water increases strength", "Water only changes texture"],
    correctAnswer: "Less water increases strength",
    explanation: "Mortar with lower water-to-cement ratio is stronger. Too much water makes it weak and porous after drying."
  },
  {
    id: 'bricklaying-l2-mortars17',
    question: "Which mix suits brickwork below the damp-proof course (DPC)?",
    options: ["Designation (iii) base mix", "Designation (ii) floor mix", "Designation (i) strong mix", "Designation (v) internal use"],
    correctAnswer: "Designation (i) strong mix",
    explanation: "Below DPC, strength and resistance to water are crucial, so designation (i) mixes are recommended."
  },
  {
    id: 'bricklaying-l2-mortars18',
    question: "What weather conditions are most problematic for laying mortar?",
    options: ["Cool overcast weather", "Mild and dry weather", "Hot dry windy conditions", "Rain with low humidity"],
    correctAnswer: "Hot dry windy conditions",
    explanation: "Heat and wind cause fast evaporation, which prevents proper curing and results in weak mortar joints."
  },
  {
    id: 'bricklaying-l2-mortars19',
    question: "How should fresh brickwork be protected from rain?",
    options: ["Apply water-repellent spray", "Brush joints after rain", "Cover top and faces with sheeting", "Leave it exposed to dry naturally"],
    correctAnswer: "Cover top and faces with sheeting",
    explanation: "Use waterproof sheets to prevent rain from washing away unset mortar, especially in early stages of curing."
  },
  {
    id: 'bricklaying-l2-mortars20',
    question: "What is efflorescence in brickwork and mortar?",
    options: ["Growth of green moss", "Rust staining from wall ties", "White salt deposits on the surface", "Hardened mortar flakes"],
    correctAnswer: "White salt deposits on the surface",
    explanation: "Efflorescence is caused by water carrying salts to the surface. It’s mostly cosmetic but shows moisture movement."
  },
  {
    id: 'bricklaying-l2-mortars21',
    question: "Why is lime mortar sometimes 'gauged' with cement?",
    options: ["To make mortar whiter", "To delay setting times", "To increase speed and strength", "To improve colour matching"],
    correctAnswer: "To increase speed and strength",
    explanation: "Gauging lime mortar with cement speeds up setting and improves strength without losing workability benefits."
  },
  {
    id: 'bricklaying-l2-mortars22',
    question: "What causes mortar to crack and fail early?",
    options: ["Too much coarse sand", "Too much lime added", "Too much water or poor curing", "Too little cement content"],
    correctAnswer: "Too much water or poor curing",
    explanation: "Excess water weakens mortar and increases shrinkage, while improper curing prevents full strength from developing."
  },
  {
    id: 'bricklaying-l2-mortars23',
    question: "Why use a 'bucket handle' joint finish in external brickwork?",
    options: ["For historic restoration", "To hold more mortar", "For better water resistance and appearance", "To create a smooth flush wall"],
    correctAnswer: "For better water resistance and appearance",
    explanation: "The curved joint sheds water efficiently and gives a clean, durable finish, common in modern exposed walls."
  },
  {
    id: 'bricklaying-l2-mortars24',
    question: "What is a 'fat mortar' commonly known for?",
    options: ["Excess cement content", "Extra dry texture", "High lime making it soft and creamy", "Mortar with added pigments"],
    correctAnswer: "High lime making it soft and creamy",
    explanation: "'Fat mortar' has a high lime content, making it buttery, pliable, and ideal for fine finishing or pointing."
  },
  {
    id: 'bricklaying-l2-mortars25',
    question: "What is the proper method to mix coloured mortar?",
    options: ["Mix cement with wall paint", "Add dye to wet mortar", "Use approved pigment mixed dry", "Use factory-prepared bags only"],
    correctAnswer: "Use approved pigment mixed dry",
    explanation: "Colour pigments should be blended with dry ingredients to ensure even distribution before water is added to the mix."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-mortars', 'items', q.id), {
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
