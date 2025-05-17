// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3JointsFixings.ts

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

// ✅ Joinery Level 3 Complex Joints & Fixings Questions
const questions = [
  {
    id: 'joinery-l3-joints-fixings1',
    question: "Which joint is best suited for edge-to-edge panel assembly in solid timber work?",
    options: ["Bridle joint", "Tongue and groove", "Mitre joint", "Lap joint"],
    correctAnswer: "Tongue and groove",
    explanation: "Tongue and groove joints align boards accurately and increase the glue surface area, making them ideal for wide panel assemblies."
  },
  {
    id: 'joinery-l3-joints-fixings2',
    question: "What is the key benefit of a twin tenon joint?",
    options: ["Reduces glue usage", "Simplifies alignment", "Increases resistance to twisting", "Requires fewer tools"],
    correctAnswer: "Increases resistance to twisting",
    explanation: "Twin tenons offer more surface area and help resist racking forces, particularly useful in wider frame components."
  },
  {
    id: 'joinery-l3-joints-fixings3',
    question: "Which joint allows for a flush connection across crossing timbers?",
    options: ["Butt joint", "Cross halving joint", "Mitre joint", "Scarf joint"],
    correctAnswer: "Cross halving joint",
    explanation: "Cross halving joints are commonly used when two members intersect, keeping the surfaces level while locking them mechanically."
  },
  {
    id: 'joinery-l3-joints-fixings4',
    question: "Why is a bridle joint chosen for open-frame corners?",
    options: ["It conceals the joint fully", "It’s fast to machine", "It offers visible grain alignment", "It provides strength with visible simplicity"],
    correctAnswer: "It provides strength with visible simplicity",
    explanation: "Bridle joints provide solid strength and are easy to inspect or shape at exposed joints in frames."
  },
  {
    id: 'joinery-l3-joints-fixings5',
    question: "What is the function of a haunch in a haunched tenon joint?",
    options: ["Acts as a decorative element", "Increases glue area", "Fills a groove in a rail", "Reduces the need for clamping"],
    correctAnswer: "Fills a groove in a rail",
    explanation: "A haunch ensures the joint fills the groove in frame rails, maintaining strength and appearance."
  },
  {
    id: 'joinery-l3-joints-fixings6',
    question: "Which joint is used where one piece must sit over another in a curved arrangement?",
    options: ["Lap joint", "Coopered joint", "Butt joint", "Finger joint"],
    correctAnswer: "Coopered joint",
    explanation: "Coopered joints create curved surfaces from flat staves, commonly seen in curved cabinet doors or barrels."
  },
  {
    id: 'joinery-l3-joints-fixings7',
    question: "What makes a housed dovetail suitable for joist work?",
    options: ["Low visibility", "Ease of disassembly", "Lateral restraint", "Minimal cutting required"],
    correctAnswer: "Lateral restraint",
    explanation: "Housed dovetails are ideal for resisting pulling forces in structural applications like floor joists."
  },
  {
    id: 'joinery-l3-joints-fixings8',
    question: "Why is a domino joint popular in modern joinery?",
    options: ["Traditional appearance", "Reduced cost", "Quick and strong joinery", "No need for clamps"],
    correctAnswer: "Quick and strong joinery",
    explanation: "Domino joints combine strength with fast machine-based cutting, making them efficient for consistent quality."
  },
  {
    id: 'joinery-l3-joints-fixings9',
    question: "Which fixing is commonly used to reinforce mitre joints?",
    options: ["Brass screw", "Domino", "Spline", "Toggle clamp"],
    correctAnswer: "Spline",
    explanation: "A spline adds strength to mitres by providing mechanical support across the angled glue line."
  },
  {
    id: 'joinery-l3-joints-fixings10',
    question: "What does a keyed mitre joint include?",
    options: ["Double shoulder", "Decorative tenon", "Inserted support strip", "Knocked-in peg"],
    correctAnswer: "Inserted support strip",
    explanation: "A keyed mitre includes a reinforcing strip (key) across the mitre to increase strength and alignment."
  },
  {
    id: 'joinery-l3-joints-fixings11',
    question: "Which joint is designed for knock-down furniture and allows repeated assembly?",
    options: ["Through tenon", "Wedge joint", "Cam lock", "Bridle"],
    correctAnswer: "Cam lock",
    explanation: "Cam locks provide a tight mechanical fastening system ideal for flat-pack furniture that’s reassembled multiple times."
  },
  {
    id: 'joinery-l3-joints-fixings12',
    question: "What is the role of a dowel in a dowel joint?",
    options: ["Closes grain gaps", "Adds visual appeal", "Aligns and strengthens", "Prevents expansion"],
    correctAnswer: "Aligns and strengthens",
    explanation: "Dowels ensure correct positioning and increase the bonding surface within glued joints."
  },
  {
    id: 'joinery-l3-joints-fixings13',
    question: "Which joint is best for connecting rafters to wall plates?",
    options: ["Birdsmouth joint", "Finger joint", "Scarf joint", "Lap joint"],
    correctAnswer: "Birdsmouth joint",
    explanation: "Birdsmouth joints allow rafters to sit securely on wall plates, transferring loads effectively in pitched roofs."
  },
  {
    id: 'joinery-l3-joints-fixings14',
    question: "What feature makes a finger joint suitable for board lengthening?",
    options: ["Self-clamping action", "Decorative pattern", "Interlocking strength", "Edge visibility"],
    correctAnswer: "Interlocking strength",
    explanation: "Finger joints maximise glue area and mechanical interlock, providing a strong bond between end grains."
  },
  {
    id: 'joinery-l3-joints-fixings15',
    question: "What type of joint uses a peg through offset holes to pull the parts together?",
    options: ["Bridle joint", "Drawbored tenon", "Barefaced tenon", "Secret dovetail"],
    correctAnswer: "Drawbored tenon",
    explanation: "Drawbored joints apply mechanical tension through offset holes, pulling components tight without relying solely on glue."
  },
  {
    id: 'joinery-l3-joints-fixings16',
    question: "What is a lapped dovetail joint used for?",
    options: ["Box sides", "Timber framing", "Shelf supports", "Curved assemblies"],
    correctAnswer: "Box sides",
    explanation: "Lapped dovetails offer good mechanical strength while concealing the joint from the front, ideal for drawer fronts."
  },
  {
    id: 'joinery-l3-joints-fixings17',
    question: "What makes a sliding dovetail stronger than a standard housing joint?",
    options: ["Decorative finish", "Angled sides lock it in place", "Easier to machine", "Wider glue surface"],
    correctAnswer: "Angled sides lock it in place",
    explanation: "Sliding dovetails resist both lateral and pulling forces due to their interlocking angled profiles."
  },
  {
    id: 'joinery-l3-joints-fixings18',
    question: "Which fixing method creates reusable thread in timber?",
    options: ["Nail plate", "Dowel", "Threaded insert", "Cam lock"],
    correctAnswer: "Threaded insert",
    explanation: "Threaded inserts allow bolts to be used repeatedly without damaging the timber fibres, ideal for dismantled joints."
  },
  {
    id: 'joinery-l3-joints-fixings19',
    question: "What is a pinned joint?",
    options: ["Relies on clamping only", "Uses a nail for decoration", "Strengthened with wooden pegs", "Designed to flex under load"],
    correctAnswer: "Strengthened with wooden pegs",
    explanation: "Pins (typically dowels) reinforce glued joints and provide extra strength by preventing separation."
  },
  {
    id: 'joinery-l3-joints-fixings20',
    question: "Why might a stub tenon be used instead of a standard tenon?",
    options: ["Requires no glue", "Reduces waste", "Avoids weakening thin members", "Easier to hand-cut"],
    correctAnswer: "Avoids weakening thin members",
    explanation: "Stub tenons maintain enough strength while allowing shorter mortises, helpful in thinner material where a deep mortise might compromise integrity."
  },
  {
    id: 'joinery-l3-joints-fixings21',
    question: "What advantage does a butterfly key provide in solid timber panels?",
    options: ["Adds visual contrast", "Stops further splitting", "Reduces movement", "Simplifies clamping"],
    correctAnswer: "Stops further splitting",
    explanation: "Butterfly keys act as mechanical locks across cracks or joins, halting further opening of splits."
  },
  {
    id: 'joinery-l3-joints-fixings22',
    question: "What does a Z-dowel joint achieve?",
    options: ["Supports angled faces", "Creates concealed alignment", "Locks curved parts", "Joins thin laminates"],
    correctAnswer: "Creates concealed alignment",
    explanation: "Z-dowels run diagonally and allow accurate concealed alignment in face frames and cabinet assemblies."
  },
  {
    id: 'joinery-l3-joints-fixings23',
    question: "What is the main advantage of using a domino over biscuits?",
    options: ["More compact", "Wider compatibility", "Greater strength", "Lower cost"],
    correctAnswer: "Greater strength",
    explanation: "Domino tenons are thicker and longer than biscuits, providing more glue surface and structural integrity."
  },
  {
    id: 'joinery-l3-joints-fixings24',
    question: "What is the purpose of a comb joint?",
    options: ["Supports heavy loads", "Allows quick repairs", "Increases glue area at corners", "Reinforces thin veneers"],
    correctAnswer: "Increases glue area at corners",
    explanation: "Comb joints (box joints) have interlocking fingers which provide excellent glue surface and corner strength."
  },
  {
    id: 'joinery-l3-joints-fixings25',
    question: "Which joint is used to prevent twist in long beam end-to-end connections?",
    options: ["Finger joint", "Scarf joint", "Bridle scarf joint", "Cross halving"],
    correctAnswer: "Bridle scarf joint",
    explanation: "A bridle scarf joint extends length while resisting twist and vertical shear, commonly used in structural timberwork."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-joints-fixings', 'items', q.id), {
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
