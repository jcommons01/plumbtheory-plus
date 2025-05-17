// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Sustainability.ts

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

// ✅ Joinery Level 3 Sustainability Questions
const questions = [
  {
    id: 'joinery-l3-sustainability1',
    question: "Why is FSC certification important for timber used in joinery?",
    options: ["It ensures wood is waterproof", "It confirms timber is responsibly sourced", "It makes timber fire resistant", "It increases timber strength"],
    correctAnswer: "It confirms timber is responsibly sourced",
    explanation: "FSC certification verifies that timber comes from forests managed with environmental and social responsibility."
  },
  {
    id: 'joinery-l3-sustainability2',
    question: "What is the main benefit of using reclaimed timber?",
    options: ["It reduces waste", "It cuts faster", "It is always cheaper", "It has no knots"],
    correctAnswer: "It reduces waste",
    explanation: "Reclaimed timber reduces the need for new materials and prevents usable wood from being discarded."
  },
  {
    id: 'joinery-l3-sustainability3',
    question: "What does 'embodied carbon' refer to?",
    options: ["Carbon stored in finished furniture", "Emissions from the entire lifecycle of a product", "Carbon removed from the air by trees", "Carbon used in heating timber"],
    correctAnswer: "Emissions from the entire lifecycle of a product",
    explanation: "Embodied carbon includes all emissions from raw material extraction to end-of-life disposal."
  },
  {
    id: 'joinery-l3-sustainability4',
    question: "Why are water-based finishes more sustainable than solvent-based?",
    options: ["They are cheaper", "They dry quicker", "They contain fewer harmful emissions", "They make wood darker"],
    correctAnswer: "They contain fewer harmful emissions",
    explanation: "Water-based finishes release fewer VOCs, making them safer for workers and the environment."
  },
  {
    id: 'joinery-l3-sustainability5',
    question: "What is the aim of a circular economy in joinery?",
    options: ["To produce round furniture", "To minimise resource waste", "To speed up cutting times", "To avoid corners"],
    correctAnswer: "To minimise resource waste",
    explanation: "Circular economy principles focus on reuse, repair, and recycling to extend material life."
  },
  {
    id: 'joinery-l3-sustainability6',
    question: "Why is sourcing local timber considered sustainable?",
    options: ["It is always stronger", "It avoids import taxes", "It reduces transport emissions", "It grows taller"],
    correctAnswer: "It reduces transport emissions",
    explanation: "Using local timber cuts down on fuel use and supports nearby forestry industries."
  },
  {
    id: 'joinery-l3-sustainability7',
    question: "What is a key feature of sustainable forestry?",
    options: ["Fast harvesting", "Clear-cutting", "Maintaining biodiversity", "Using only pine"],
    correctAnswer: "Maintaining biodiversity",
    explanation: "Sustainable forestry protects ecosystems while allowing responsible timber production."
  },
  {
    id: 'joinery-l3-sustainability8',
    question: "What does ISO 14001 relate to?",
    options: ["Joinery qualifications", "Environmental management systems", "Moisture content in wood", "Workplace safety"],
    correctAnswer: "Environmental management systems",
    explanation: "ISO 14001 is a standard for managing and reducing environmental impact in businesses."
  },
  {
    id: 'joinery-l3-sustainability9',
    question: "How does a waste hierarchy support sustainability?",
    options: ["By storing all waste", "By burning all offcuts", "By promoting reuse over disposal", "By banning all materials"],
    correctAnswer: "By promoting reuse over disposal",
    explanation: "A waste hierarchy prioritises prevention, reuse, and recycling before landfill disposal."
  },
  {
    id: 'joinery-l3-sustainability10',
    question: "Why is timber considered a renewable resource?",
    options: ["It grows back over time", "It is made in factories", "It doesn’t burn", "It contains water"],
    correctAnswer: "It grows back over time",
    explanation: "Timber can be regrown when forests are managed sustainably, unlike finite resources."
  },
  {
    id: 'joinery-l3-sustainability11',
    question: "What is a key benefit of designing joinery for disassembly?",
    options: ["Faster installation", "Reduced lifespan", "Easier recycling", "Less dust"],
    correctAnswer: "Easier recycling",
    explanation: "Disassembly allows parts to be reused or recycled instead of being thrown away."
  },
  {
    id: 'joinery-l3-sustainability12',
    question: "What is the purpose of an Environmental Product Declaration (EPD)?",
    options: ["To promote sales", "To hide emissions", "To provide verified environmental data", "To show timber colour"],
    correctAnswer: "To provide verified environmental data",
    explanation: "EPDs offer factual, third-party assessed information about a product’s environmental impact."
  },
  {
    id: 'joinery-l3-sustainability13',
    question: "Why are VOCs a concern in joinery products?",
    options: ["They improve paint flow", "They lower product weight", "They pollute indoor air", "They help bonding"],
    correctAnswer: "They pollute indoor air",
    explanation: "Volatile Organic Compounds can harm health and air quality when released indoors."
  },
  {
    id: 'joinery-l3-sustainability14',
    question: "What is meant by 'material efficiency'?",
    options: ["Using thicker timber", "Wasting fewer materials", "Buying more stock", "Storing wood outside"],
    correctAnswer: "Wasting fewer materials",
    explanation: "Material efficiency is about using less while achieving the same purpose, reducing waste."
  },
  {
    id: 'joinery-l3-sustainability15',
    question: "How does timber help store carbon?",
    options: ["It absorbs paint", "It holds moisture", "It locks in CO₂ absorbed during growth", "It reflects heat"],
    correctAnswer: "It locks in CO₂ absorbed during growth",
    explanation: "Trees absorb CO₂ as they grow, and this carbon remains stored in timber products."
  },
  {
    id: 'joinery-l3-sustainability16',
    question: "What is the goal of upcycling in joinery?",
    options: ["To use new wood", "To create energy", "To add value to waste materials", "To increase labour costs"],
    correctAnswer: "To add value to waste materials",
    explanation: "Upcycling turns unwanted or leftover materials into higher-quality or creative items."
  },
  {
    id: 'joinery-l3-sustainability17',
    question: "What is carbon footprint in a joinery context?",
    options: ["The shape of floor pads", "Total greenhouse gas emissions from activities", "Wood texture variation", "Weight of timber"],
    correctAnswer: "Total greenhouse gas emissions from activities",
    explanation: "Carbon footprint measures emissions from sourcing, production, transport, and use."
  },
  {
    id: 'joinery-l3-sustainability18',
    question: "How does modular design support sustainability?",
    options: ["It uses softwood only", "It fits in any home", "It allows easy repair or upgrade", "It removes the need for glue"],
    correctAnswer: "It allows easy repair or upgrade",
    explanation: "Modular designs can be taken apart and adapted, extending product life and reducing waste."
  },
  {
    id: 'joinery-l3-sustainability19',
    question: "What is the benefit of a 'chain-of-custody' certification?",
    options: ["It tracks cost history", "It ensures wood legality and sustainability", "It prevents theft", "It reduces shipping time"],
    correctAnswer: "It ensures wood legality and sustainability",
    explanation: "Chain-of-custody proves that timber is traceable through a certified and legal supply chain."
  },
  {
    id: 'joinery-l3-sustainability20',
    question: "Why is energy-efficient lighting used in workshops?",
    options: ["It brightens wood", "It reduces glare", "It lowers energy use and cost", "It adds colour tones"],
    correctAnswer: "It lowers energy use and cost",
    explanation: "Efficient lighting uses less electricity, reducing both bills and carbon emissions."
  },
  {
    id: 'joinery-l3-sustainability21',
    question: "What is the role of a sustainability policy in a joinery firm?",
    options: ["To set design rules", "To reduce wages", "To guide environmental decisions", "To plan delivery routes"],
    correctAnswer: "To guide environmental decisions",
    explanation: "A sustainability policy outlines a company’s approach to reducing environmental impact."
  },
  {
    id: 'joinery-l3-sustainability22',
    question: "How does better storage reduce timber waste?",
    options: ["It improves timber smell", "It reduces shrinkage and damage", "It blocks sunlight", "It makes wood heavier"],
    correctAnswer: "It reduces shrinkage and damage",
    explanation: "Proper storage prevents warping, moisture damage, and spoilage of usable timber."
  },
  {
    id: 'joinery-l3-sustainability23',
    question: "What makes engineered timber products more resource-efficient?",
    options: ["They are waterproof", "They look better", "They use smaller wood pieces", "They are machine made"],
    correctAnswer: "They use smaller wood pieces",
    explanation: "Engineered timber combines offcuts or fibres to create strong boards with minimal waste."
  },
  {
    id: 'joinery-l3-sustainability24',
    question: "What does a 'low embodied energy' material mean?",
    options: ["It feels light", "It took little energy to produce", "It has no carbon", "It never breaks"],
    correctAnswer: "It took little energy to produce",
    explanation: "Materials with low embodied energy require less processing and transport, reducing emissions."
  },
  {
    id: 'joinery-l3-sustainability25',
    question: "What is a key benefit of 'designing out waste'?",
    options: ["It uses thicker timber", "It increases labour", "It reduces offcuts and surplus", "It delays delivery"],
    correctAnswer: "It reduces offcuts and surplus",
    explanation: "Designing with efficiency in mind helps cut down on unnecessary material waste and costs."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-sustainability', 'items', q.id), {
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
