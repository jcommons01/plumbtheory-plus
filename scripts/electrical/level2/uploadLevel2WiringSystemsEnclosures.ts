// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2WiringSystemsEnclosures.ts

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

// ✅ Level 2 Wiring Systems & Enclosures Questions
const questions = [
  {
    id: 'level2wire1',
    question: "What is the IP rating that indicates an enclosure is dust-tight and protected against immersion in water?",
    options: ["IP44", "IP55", "IP65", "IP67"],
    correctAnswer: "IP67",
    explanation: "IP67 indicates the enclosure is totally protected against dust (6) and protected against the effects of temporary immersion in water (7)."
  },
  {
    id: 'level2wire2',
    question: "Which wiring system is commonly used in domestic installations with PVC insulated and sheathed cables installed in walls and ceilings?",
    options: ["Conduit system", "Trunking system", "Busbar system", "Embedded system"],
    correctAnswer: "Embedded system",
    explanation: "Embedded systems involve cables directly installed (embedded) within the building structure, commonly used in domestic installations with cables concealed in walls and ceilings."
  },
  {
    id: 'level2wire3',
    question: "What type of metal conduit offers the best protection against corrosion in wet environments?",
    options: ["Galvanized steel conduit", "Black enamelled conduit", "Aluminum conduit", "Brass conduit"],
    correctAnswer: "Galvanized steel conduit",
    explanation: "Galvanized steel conduit has a zinc coating that provides superior corrosion resistance, making it suitable for wet environments."
  },
  {
    id: 'level2wire4',
    question: "When joining PVC conduit, what is the recommended method?",
    options: ["Using adhesive designed for PVC conduit", "Heat welding", "Using threaded connectors", "Compression fittings only"],
    correctAnswer: "Using adhesive designed for PVC conduit",
    explanation: "PVC conduit sections should be joined using special adhesive (cement) designed for PVC conduit to create a secure, watertight bond."
  },
  {
    id: 'level2wire5',
    question: "What is the minimum size of copper earthing conductor required for a 32A circuit in a PVC conduit system?",
    options: ["1.0mm²", "1.5mm²", "2.5mm²", "4.0mm²"],
    correctAnswer: "2.5mm²",
    explanation: "For a 32A circuit in a conduit system, the minimum size of copper earthing conductor should be 2.5mm² according to BS 7671."
  },
  {
    id: 'level2wire6',
    question: "What is the primary purpose of cable trunking?",
    options: ["To provide electrical insulation", "To provide mechanical protection and support for cables", "To increase cable current rating", "To reduce electromagnetic interference"],
    correctAnswer: "To provide mechanical protection and support for cables",
    explanation: "Cable trunking provides mechanical protection and organized support for multiple cables, making installation and future maintenance easier."
  },
  {
    id: 'level2wire7',
    question: "Which type of wiring enclosure would be most appropriate for areas subjected to heavy impacts?",
    options: ["Light-gauge steel conduit", "Heavy-gauge steel conduit", "PVC trunking", "Plastic conduit"],
    correctAnswer: "Heavy-gauge steel conduit",
    explanation: "Heavy-gauge steel conduit provides superior mechanical protection in areas subject to heavy impacts or physical damage."
  },
  {
    id: 'level2wire8',
    question: "What does the first digit in an IP rating indicate?",
    options: ["Resistance to moisture", "Resistance to dust and solid objects", "Impact resistance", "Resistance to chemicals"],
    correctAnswer: "Resistance to dust and solid objects",
    explanation: "The first digit in an IP rating (0-6) indicates the level of protection against solid objects and dust, with 6 being the highest level of protection."
  },
  {
    id: 'level2wire9',
    question: "What is the main advantage of metal trunking over PVC trunking?",
    options: ["Better electrical insulation", "Lower cost", "Greater mechanical strength", "Lighter weight"],
    correctAnswer: "Greater mechanical strength",
    explanation: "Metal trunking provides greater mechanical strength than PVC trunking, making it more suitable for areas where physical protection is important."
  },
  {
    id: 'level2wire10',
    question: "Which of the following is a requirement for consumer unit enclosures according to BS 7671?",
    options: ["Must be made of metal", "Must be IP55 rated", "Must provide protection against fire spread", "Must be earthed via the neutral bar"],
    correctAnswer: "Must provide protection against fire spread",
    explanation: "Consumer unit enclosures must be constructed to contain or prevent the spread of fire, typically requiring non-combustible or fire-resistant materials."
  },
  {
    id: 'level2wire11',
    question: "What is the minimum IP rating required for an enclosure in a bathroom Zone 1?",
    options: ["IPX1", "IPX4", "IPX7", "IPX8"],
    correctAnswer: "IPX4",
    explanation: "Bathroom Zone 1 requires enclosures to be at least IPX4 rated (protection against water splashing from any direction)."
  },
  {
    id: 'level2wire12',
    question: "What is the advantage of metal-clad (steel) surface wiring compared to PVC surface wiring?",
    options: ["Easier to install", "Better electrical insulation", "Greater mechanical strength", "Lower cost"],
    correctAnswer: "Greater mechanical strength",
    explanation: "Metal-clad surface wiring offers greater mechanical strength and protection against physical damage compared to PVC surface wiring."
  },
  {
    id: 'level2wire13',
    question: "What is the purpose of a busbar chamber in electrical installations?",
    options: ["To house circuit breakers", "To provide a connection point for multiple circuits", "To transform voltage levels", "To store electrical energy"],
    correctAnswer: "To provide a connection point for multiple circuits",
    explanation: "Busbar chambers provide a secure enclosure containing busbars that serve as connection points for multiple circuits, often used in distribution systems."
  },
  {
    id: 'level2wire14',
    question: "What is required for trunking containing low voltage circuits (e.g., mains) and extra-low voltage circuits (e.g., data)?",
    options: ["They must be in separate trunking systems", "They must use different colored cables", "They must have a physical partition between them", "They must be on opposite sides of the room"],
    correctAnswer: "They must have a physical partition between them",
    explanation: "When low voltage and extra-low voltage circuits share the same trunking, they must be separated by a physical partition to prevent electrical interference and safety hazards."
  },
  {
    id: 'level2wire15',
    question: "What is the maximum recommended fill ratio for a cable conduit?",
    options: ["20%", "35%", "45%", "60%"],
    correctAnswer: "45%",
    explanation: "The recommended maximum fill ratio for a conduit is 45% of its cross-sectional area to ensure cables can be drawn in without damage and allow for adequate cooling."
  },
  {
    id: 'level2wire16',
    question: "Which wiring system is best suited for frequent alterations and extensions?",
    options: ["Embedded system", "Conduit system", "Cable tray system", "Armoured cable system"],
    correctAnswer: "Conduit system",
    explanation: "Conduit systems allow cables to be withdrawn and replaced, making them ideal for installations that may require frequent alterations or extensions."
  },
  {
    id: 'level2wire17',
    question: "What is the main purpose of an earth bonding bar in an enclosure?",
    options: ["To connect phase conductors", "To provide a neutral point", "To terminate circuit protective conductors", "To attach the enclosure to the wall"],
    correctAnswer: "To terminate circuit protective conductors",
    explanation: "An earth bonding bar provides a secure connection point for multiple circuit protective conductors (earth wires) within an enclosure."
  },
  {
    id: 'level2wire18',
    question: "What type of enclosure is required for electrical equipment in a location subject to rain or water spray?",
    options: ["IP2X", "IP3X", "IP44 or higher", "Any enclosure with a door"],
    correctAnswer: "IP44 or higher",
    explanation: "IP44 or higher enclosures provide protection against water splashing from any direction, making them suitable for locations exposed to rain or water spray."
  },
  {
    id: 'level2wire19',
    question: "What is the purpose of cable basket (wire mesh tray) in wiring systems?",
    options: ["To provide electrical isolation", "To support cables while allowing ventilation", "To shield cables from electromagnetic interference", "To replace the need for cable insulation"],
    correctAnswer: "To support cables while allowing ventilation",
    explanation: "Cable basket/wire mesh tray provides mechanical support for cables while allowing airflow around them for better heat dissipation, particularly useful in data centers and commercial installations."
  },
  {
    id: 'level2wire20',
    question: "When using PVC trunking, what must be considered at building expansion joints?",
    options: ["The trunking must be terminated either side of the joint", "Extra fixings must be used", "Larger trunking must be used", "Metal trunking must be used instead"],
    correctAnswer: "The trunking must be terminated either side of the joint",
    explanation: "At building expansion joints, trunking should be terminated on either side to accommodate building movement, with flexible connections used to cross the joint if necessary."
  },
  {
    id: 'level2wire21',
    question: "Which of the following is a requirement for metallic conduit systems?",
    options: ["Must be painted", "Must be electrically continuous and properly earthed", "Must be filled with insulating oil", "Must be at least 25mm in diameter"],
    correctAnswer: "Must be electrically continuous and properly earthed",
    explanation: "Metallic conduit systems must maintain electrical continuity throughout and be properly connected to the earthing system to ensure safety."
  },
  {
    id: 'level2wire22',
    question: "What is the maximum number of 90° bends allowed between draw points in a conduit run?",
    options: ["Two", "Three", "Four", "No limit"],
    correctAnswer: "Two",
    explanation: "A maximum of two 90° bends (or equivalent) should be used between draw points in a conduit run to ensure cables can be pulled through without damage."
  },
  {
    id: 'level2wire23',
    question: "What is the minimum degree of protection required for an enclosure in an agricultural location where livestock is housed?",
    options: ["IP2X", "IP4X", "IP44", "IP55"],
    correctAnswer: "IP44",
    explanation: "For agricultural locations housing livestock, enclosures must be at least IP44 rated to protect against solid objects and water splashing from any direction."
  },
  {
    id: 'level2wire24',
    question: "Which type of wiring system would be most appropriate for a temporary installation on a construction site?",
    options: ["PVC conduit", "Steel conduit", "Embedded cables", "Armoured cables with mechanical protection"],
    correctAnswer: "Armoured cables with mechanical protection",
    explanation: "Armoured cables with additional mechanical protection are suitable for temporary installations on construction sites due to their durability and resistance to damage."
  },
  {
    id: 'level2wire25',
    question: "What is required when a metal enclosure houses a protective device that could produce an arc during operation?",
    options: ["The enclosure must be ventilated", "The enclosure must be double-insulated", "The enclosure must be at least 5mm thick", "The enclosure must be made of arc-resistant material"],
    correctAnswer: "The enclosure must be made of arc-resistant material",
    explanation: "Metal enclosures containing protective devices that could produce arcs must be made of arc-resistant material to contain the arc safely and prevent fire or injury."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l2-wiring-systems', 'items', q.id), {
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
