// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Materials.ts

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
    id: 'bricklaying-l2-materials1',
    question: "How do clay bricks differ from calcium silicate bricks?",
    options: ["Clay bricks are pressed, silicate bricks are extruded", "Clay bricks are fired, silicate bricks are cured with steam", "Clay bricks are handmade, silicate bricks are machine-made", "Clay bricks are heavier than silicate bricks"],
    correctAnswer: "Clay bricks are fired, silicate bricks are cured with steam",
    explanation: "Clay bricks are kiln-fired at high temperatures, while calcium silicate bricks are steam-cured under pressure."
  },
  {
    id: 'bricklaying-l2-materials2',
    question: "What does water absorption tell you about a brick?",
    options: ["Its colour stability", "Its porosity", "Its strength grade", "Its density"],
    correctAnswer: "Its porosity",
    explanation: "Water absorption measures how porous a brick is, which affects frost resistance and durability."
  },
  {
    id: 'bricklaying-l2-materials3',
    question: "What affects the natural colour of clay bricks?",
    options: ["Brick size", "Clay type and firing conditions", "Mortar mix", "Weathering after laying"],
    correctAnswer: "Clay type and firing conditions",
    explanation: "The mineral content of the clay and the temperature in the kiln determine brick colour."
  },
  {
    id: 'bricklaying-l2-materials4',
    question: "What is the UK coordinating size for a brick including mortar?",
    options: ["215×102.5×65mm", "225×112.5×75mm", "200×100×60mm", "240×110×80mm"],
    correctAnswer: "225×112.5×75mm",
    explanation: "The coordinating size includes 10mm mortar joints: 225×112.5×75mm."
  },
  {
    id: 'bricklaying-l2-materials5',
    question: "What is efflorescence?",
    options: ["A fire-resistant coating", "A type of mould", "A surface stain caused by soluble salts", "A waterproof barrier"],
    correctAnswer: "A surface stain caused by soluble salts",
    explanation: "Efflorescence is a white deposit caused by moisture bringing salts to the surface."
  },
  {
    id: 'bricklaying-l2-materials6',
    question: "What is the main component in Portland cement?",
    options: ["Silica sand", "Calcium silicates", "Gypsum", "Hydrated lime"],
    correctAnswer: "Calcium silicates",
    explanation: "Portland cement is made mostly of calcium silicates which provide strength when hydrated."
  },
  {
    id: 'bricklaying-l2-materials7',
    question: "What sets Class A engineering bricks apart from Class B?",
    options: ["Higher frost resistance", "Smoother texture", "Larger size", "Faster laying time"],
    correctAnswer: "Higher frost resistance",
    explanation: "Class A bricks have higher strength and lower water absorption than Class B."
  },
  {
    id: 'bricklaying-l2-materials8',
    question: "What does a material’s flash point describe?",
    options: ["When it melts", "When it releases toxic fumes", "When it becomes brittle", "The lowest temp it can ignite from a flame"],
    correctAnswer: "The lowest temp it can ignite from a flame",
    explanation: "Flash point is the lowest temperature at which a material's vapour can ignite."
  },
  {
    id: 'bricklaying-l2-materials9',
    question: "Why add hydrated lime to mortar?",
    options: ["Improves flexibility and water retention", "Increases strength", "Reduces cost", "Speeds up curing"],
    correctAnswer: "Improves flexibility and water retention",
    explanation: "Lime makes mortar more workable and helps prevent it drying out too quickly."
  },
  {
    id: 'bricklaying-l2-materials10',
    question: "What’s a key benefit of lightweight concrete blocks?",
    options: ["Stronger than clay bricks", "Cheaper than insulation", "Easier to plaster", "Better thermal insulation and lower weight"],
    correctAnswer: "Better thermal insulation and lower weight",
    explanation: "They reduce structural load and offer better thermal performance."
  },
  {
    id: 'bricklaying-l2-materials11',
    question: "What does mortar designation (i), (ii), (iii), etc. indicate?",
    options: ["Colour mix", "Manufacturer", "Strength and mix ratio", "Setting time"],
    correctAnswer: "Strength and mix ratio",
    explanation: "Designation reflects the mortar’s strength based on cement-lime-sand ratio."
  },
  {
    id: 'bricklaying-l2-materials12',
    question: "What does the U-value of a material measure?",
    options: ["Fire rating", "Water resistance", "Thermal insulation", "UV protection"],
    correctAnswer: "Thermal insulation",
    explanation: "A lower U-value means better thermal insulation in building materials."
  },
  {
    id: 'bricklaying-l2-materials13',
    question: "What is sharp sand used for?",
    options: ["Brick jointing", "Floor screeds and strong mortar", "Coloured finishes", "Rendering only"],
    correctAnswer: "Floor screeds and strong mortar",
    explanation: "Sharp sand is coarse and ideal for strength in concrete and mortars."
  },
  {
    id: 'bricklaying-l2-materials14',
    question: "How do aggregates and binders differ?",
    options: ["Aggregates strengthen; binders glue the mix", "Binders insulate, aggregates absorb", "Binders are sand; aggregates are gravel", "Only binders are needed in bricklaying"],
    correctAnswer: "Aggregates strengthen; binders glue the mix",
    explanation: "Aggregates give volume; binders like cement hold it all together."
  },
  {
    id: 'bricklaying-l2-materials15',
    question: "What does ‘frost susceptibility’ mean?",
    options: ["The material discolours in frost", "It absorbs frost quickly", "It’s likely to crack due to freeze-thaw", "It gets slippery in frost"],
    correctAnswer: "It’s likely to crack due to freeze-thaw",
    explanation: "Some materials absorb water and crack when it freezes and expands."
  },
  {
    id: 'bricklaying-l2-materials16',
    question: "What is the main compound in gypsum plaster?",
    options: ["Silica", "Calcium sulfate hemihydrate", "Lime", "Alumina"],
    correctAnswer: "Calcium sulfate hemihydrate",
    explanation: "Gypsum plaster is made from calcium sulfate, which sets when mixed with water."
  },
  {
    id: 'bricklaying-l2-materials17',
    question: "What is the 'initial setting time' of cement?",
    options: ["When it’s mixed at the factory", "Time until it starts to stiffen and can’t be worked", "Time to reach full strength", "Time to mix it on site"],
    correctAnswer: "Time until it starts to stiffen and can’t be worked",
    explanation: "This is how long you have to use the mortar before it begins to set."
  },
  {
    id: 'bricklaying-l2-materials18',
    question: "What does 'hygroscopic' mean?",
    options: ["It dries quickly", "It repels water", "It attracts moisture from the air", "It dissolves in water"],
    correctAnswer: "It attracts moisture from the air",
    explanation: "Hygroscopic materials absorb moisture, which can affect stability and performance."
  },
  {
    id: 'bricklaying-l2-materials19',
    question: "What’s the main benefit of air-entrained mortar?",
    options: ["Increased cost", "Faster drying", "Improved freeze resistance and workability", "Stronger adhesion"],
    correctAnswer: "Improved freeze resistance and workability",
    explanation: "Air bubbles improve frost durability and make mortar easier to use."
  },
  {
    id: 'bricklaying-l2-materials20',
    question: "What’s the key difference between fired and unfired clay bricks?",
    options: ["Fired bricks are lighter", "Fired bricks are kiln-treated and water-resistant", "Unfired bricks are stronger", "Unfired bricks are always red"],
    correctAnswer: "Fired bricks are kiln-treated and water-resistant",
    explanation: "Firing makes bricks more durable and resistant to moisture damage."
  },
  {
    id: 'bricklaying-l2-materials21',
    question: "What does a plasticiser do in mortar?",
    options: ["Speeds up curing", "Makes mortar waterproof", "Improves workability with less water", "Makes it set harder"],
    correctAnswer: "Improves workability with less water",
    explanation: "Plasticisers allow a smoother mix without weakening it by adding too much water."
  },
  {
    id: 'bricklaying-l2-materials22',
    question: "What does the saturation coefficient test in bricks?",
    options: ["Fire resistance", "Surface finish", "Water content", "Freeze-thaw durability"],
    correctAnswer: "Freeze-thaw durability",
    explanation: "It shows how likely a brick is to crack during freeze-thaw cycles."
  },
  {
    id: 'bricklaying-l2-materials23',
    question: "Why use natural hydraulic lime (NHL) mortar?",
    options: ["Faster setting", "Better waterproofing", "Flexibility and breathability", "Higher cost"],
    correctAnswer: "Flexibility and breathability",
    explanation: "NHL allows walls to move slightly and lets moisture escape, ideal for older buildings."
  },
  {
    id: 'bricklaying-l2-materials24',
    question: "What does compressive strength measure?",
    options: ["Resistance to squashing under load", "Flexibility under movement", "Speed of drying", "Moisture content"],
    correctAnswer: "Resistance to squashing under load",
    explanation: "It shows how much pressure a brick or block can take before breaking."
  },
  {
    id: 'bricklaying-l2-materials25',
    question: "What is an accelerator in concrete or mortar?",
    options: ["A hardener", "A waterproofing agent", "A setting time reducer", "A colour additive"],
    correctAnswer: "A setting time reducer",
    explanation: "Accelerators make mixes set faster, especially useful in cold weather."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-materials', 'items', q.id), {
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
