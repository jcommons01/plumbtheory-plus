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
    id: 'bricklaying-l3-conservation-1',
    question: "Which term describes replacing lost stone with a matching new piece?",
    options: ["Indent repair", "Core bonding", "Joint fixing", "Panel patching"],
    correctAnswer: "Indent repair",
    explanation: "This method involves cutting out a damaged area and inserting new stone that matches the original in appearance and type."
  },
  {
    id: 'bricklaying-l3-conservation-2',
    question: "Why is lime mortar preferred in older masonry repairs?",
    options: ["It breathes well", "It sets quicker", "It resists paint", "It prevents algae"],
    correctAnswer: "It breathes well",
    explanation: "Lime mortar allows moisture to evaporate through the joints, helping prevent trapped damp in historic walls."
  },
  {
    id: 'bricklaying-l3-conservation-3',
    question: "Which approach aligns with the principle of 'minimum intervention'?",
    options: ["Do only what's needed", "Rebuild whole areas", "Use modern bricks", "Replace old materials"],
    correctAnswer: "Do only what's needed",
    explanation: "Minimum intervention promotes preserving as much original fabric as possible by avoiding unnecessary work."
  },
  {
    id: 'bricklaying-l3-conservation-4',
    question: "What is the main risk of using cement mortar in conservation?",
    options: ["Traps moisture", "Fades fast", "Shifts colour", "Cures unevenly"],
    correctAnswer: "Traps moisture",
    explanation: "Cement is too dense and impermeable, which can lead to internal damp and damage to softer historic materials."
  },
  {
    id: 'bricklaying-l3-conservation-5',
    question: "What does 'like-for-like' replacement aim to preserve?",
    options: ["Material match", "Site access", "Drainage slope", "Ventilation path"],
    correctAnswer: "Material match",
    explanation: "Using similar materials ensures compatibility and maintains the building’s appearance and behaviour over time."
  },
  {
    id: 'bricklaying-l3-conservation-6',
    question: "Which tool is preferred when removing old mortar from joints?",
    options: ["Hand chisel", "Power grinder", "Hammer drill", "SDS bit"],
    correctAnswer: "Hand chisel",
    explanation: "Hand tools reduce the risk of damaging adjacent bricks or stone during the raking process."
  },
  {
    id: 'bricklaying-l3-conservation-7',
    question: "What is the purpose of a 'sacrificial render'?",
    options: ["Takes weathering", "Adds polish", "Improves grip", "Blocks water"],
    correctAnswer: "Takes weathering",
    explanation: "Sacrificial renders are designed to deteriorate instead of the historic substrate underneath."
  },
  {
    id: 'bricklaying-l3-conservation-8',
    question: "Which term describes the visual wear that shows age in stone?",
    options: ["Patina", "Efflorescence", "Blooming", "Flashing"],
    correctAnswer: "Patina",
    explanation: "This natural weathering is valued for its contribution to a building’s historic character."
  },
  {
    id: 'bricklaying-l3-conservation-9',
    question: "What is the benefit of 'reversibility' in conservation methods?",
    options: ["Future removal", "Faster drying", "Cheaper labour", "Stronger bonding"],
    correctAnswer: "Future removal",
    explanation: "Reversible techniques allow future conservation work without harming original materials."
  },
  {
    id: 'bricklaying-l3-conservation-10',
    question: "What is the purpose of a shelter coat?",
    options: ["Protect surface", "Add grip", "Hide stains", "Stop insects"],
    correctAnswer: "Protect surface",
    explanation: "A shelter coat is a sacrificial lime-based layer that helps protect vulnerable stone or brick."
  },
  {
    id: 'bricklaying-l3-conservation-11',
    question: "What is 'consolidation' in masonry conservation?",
    options: ["Strengthens weak areas", "Blocks insects", "Hides repairs", "Increases shine"],
    correctAnswer: "Strengthens weak areas",
    explanation: "Consolidation involves stabilising friable surfaces using compatible strengthening agents."
  },
  {
    id: 'bricklaying-l3-conservation-12',
    question: "Which document outlines a building’s significance and policies?",
    options: ["Management plan", "Planning brief", "Site logbook", "Design guide"],
    correctAnswer: "Management plan",
    explanation: "A conservation management plan helps guide ongoing work while respecting the site's value."
  },
  {
    id: 'bricklaying-l3-conservation-13',
    question: "Why is 'hot-mixed' lime sometimes used in repairs?",
    options: ["Better bonding", "Cooler mix", "Stronger colour", "Harder set"],
    correctAnswer: "Better bonding",
    explanation: "Hot mixing produces a more plastic, porous mortar that performs well in historic wall construction."
  },
  {
    id: 'bricklaying-l3-conservation-14',
    question: "What issue does salt crystallisation cause in brickwork?",
    options: ["Surface flaking", "Dark staining", "Loss of shape", "Weakened colour"],
    correctAnswer: "Surface flaking",
    explanation: "When salts crystallise, they expand within the pores and cause the outer layers to break away."
  },
  {
    id: 'bricklaying-l3-conservation-15',
    question: "What is 'grouting' in masonry repair?",
    options: ["Fills voids", "Binds joints", "Adds gloss", "Seals cracks"],
    correctAnswer: "Fills voids",
    explanation: "Grouting involves injecting fluid lime-based mixes into cracks or hollow cores to stabilise the structure."
  },
  {
    id: 'bricklaying-l3-conservation-16',
    question: "What does 'NHL' stand for in mortar types?",
    options: ["Natural Hydraulic Lime", "Neutral Hard Lime", "Normal Heat Lime", "Non-Hydrated Lime"],
    correctAnswer: "Natural Hydraulic Lime",
    explanation: "NHL mortars set through a combination of air carbonation and moisture-triggered reactions."
  },
  {
    id: 'bricklaying-l3-conservation-17',
    question: "What is tuckpointing used for in historic work?",
    options: ["Decorative finish", "Insulation upgrade", "Joint widening", "Waterproofing"],
    correctAnswer: "Decorative finish",
    explanation: "Tuckpointing gives the impression of narrow joints by overlaying a thin line of lime putty on coloured mortar."
  },
  {
    id: 'bricklaying-l3-conservation-18',
    question: "Which type of damp rises from ground level in walls?",
    options: ["Rising damp", "Cold bridging", "Condensation", "Penetrating damp"],
    correctAnswer: "Rising damp",
    explanation: "It occurs when moisture travels upwards from the ground through capillary action in porous masonry."
  },
  {
    id: 'bricklaying-l3-conservation-19',
    question: "Why must stone be laid on its natural bed?",
    options: ["Improves stability", "Prevents algae", "Speeds curing", "Adds drainage"],
    correctAnswer: "Improves stability",
    explanation: "Laying stone with its grain horizontal ensures better load bearing and reduces the risk of splitting."
  },
  {
    id: 'bricklaying-l3-conservation-20',
    question: "What is the aim of 'honest repair'?",
    options: ["Visible but sympathetic", "Completely hidden", "Modernised finish", "Brighter colours"],
    correctAnswer: "Visible but sympathetic",
    explanation: "This method makes repairs legible without detracting from the overall historic appearance."
  },
  {
    id: 'bricklaying-l3-conservation-21',
    question: "What is 'spalling' in conservation terms?",
    options: ["Brick surface loss", "Colour mismatch", "Cold bridging", "Salt staining"],
    correctAnswer: "Brick surface loss",
    explanation: "Spalling involves the outer layer of bricks breaking away due to moisture expansion or salt action."
  },
  {
    id: 'bricklaying-l3-conservation-22',
    question: "Which material is often used to fix cracked stone discreetly?",
    options: ["Stainless pin", "Plastic wedge", "Steel mesh", "Timber rod"],
    correctAnswer: "Stainless pin",
    explanation: "Pins help stabilise fractured stonework without changing the visible appearance."
  },
  {
    id: 'bricklaying-l3-conservation-23',
    question: "What is the primary use of a poultice in conservation?",
    options: ["Draw out salts", "Improve grip", "Seal the surface", "Add colouring"],
    correctAnswer: "Draw out salts",
    explanation: "Poultices are applied to extract damaging salts from porous materials during treatment."
  },
  {
    id: 'bricklaying-l3-conservation-24',
    question: "Why is a soft mortar joint preferred in conservation?",
    options: ["Fails first", "Cures faster", "Stays shiny", "Adds colour"],
    correctAnswer: "Fails first",
    explanation: "The joint should be weaker than the masonry so it takes the wear and can be easily replaced."
  },
  {
    id: 'bricklaying-l3-conservation-25',
    question: "Which process returns lime mortar to stone?",
    options: ["Carbonation", "Saponification", "Evaporation", "Adhesion"],
    correctAnswer: "Carbonation",
    explanation: "As lime absorbs carbon dioxide, it slowly hardens and reverts to a stable stone-like form."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-conservation', 'items', q.id), {
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
