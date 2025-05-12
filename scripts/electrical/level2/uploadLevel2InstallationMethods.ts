// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2InstallationMethodsTechniques.ts

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

// ✅ Level 2 Installation Methods & Techniques Questions
const questions = [
  {
    id: 'level2install1',
    question: "What is the minimum depth below ground level for burying electrical cables in areas with no vehicular access?",
    options: ["150mm", "450mm", "600mm", "1000mm"],
    correctAnswer: "450mm",
    explanation: "For areas with no vehicular access, electrical cables should be buried at a minimum depth of 450mm below ground level according to BS 7671."
  },
  {
    id: 'level2install2',
    question: "What type of cable is typically used for domestic ring final circuits in the UK?",
    options: ["1.5mm² twin and earth", "2.5mm² twin and earth", "6mm² twin and earth", "10mm² three-core"],
    correctAnswer: "2.5mm² twin and earth",
    explanation: "2.5mm² twin and earth cable is the standard for domestic ring final circuits in the UK, providing suitable current-carrying capacity for 32A ring circuits."
  },
  {
    id: 'level2install3',
    question: "What is the maximum recommended spacing between clips for horizontal runs of 2.5mm² flat twin and earth cable?",
    options: ["150mm", "250mm", "400mm", "600mm"],
    correctAnswer: "400mm",
    explanation: "For horizontal runs of 2.5mm² flat twin and earth cable, the maximum recommended spacing between clips is 400mm."
  },
  {
    id: 'level2install4',
    question: "When installing a cable through a joist, which method is acceptable according to UK regulations?",
    options: ["Diagonally through the center", "Through a hole in the middle third of the joist's depth", "Through a notch on the top of the joist", "Any method is acceptable as long as the cable is protected"],
    correctAnswer: "Through a hole in the middle third of the joist's depth",
    explanation: "Cables should be installed through holes drilled in the middle third of the joist's depth to minimize structural weakening, in accordance with BS 7671 and building regulations."
  },
  {
    id: 'level2install5',
    question: "What distance should be maintained between electrical and gas services when run in parallel?",
    options: ["25mm", "50mm", "150mm", "300mm"],
    correctAnswer: "150mm",
    explanation: "A minimum separation of 150mm should be maintained between electrical and gas services when running in parallel to prevent potential hazards."
  },
  {
    id: 'level2install6',
    question: "What type of cable fixings should be used in a fire escape route?",
    options: ["Plastic cable clips", "Non-combustible fixings", "Standard staples", "Self-adhesive clips"],
    correctAnswer: "Non-combustible fixings",
    explanation: "Fire escape routes require non-combustible fixings to ensure that cables remain secured in the event of a fire, preventing them from falling and impeding escape."
  },
  {
    id: 'level2install7',
    question: "When installing cables in stud walls, what is the minimum distance they should be from the surface?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "Cables should be at least 50mm from the surface in stud walls to reduce the risk of damage from screws or nails when fixing items to the wall."
  },
  {
    id: 'level2install8',
    question: "What is the maximum temperature that PVC-insulated cables should operate at under normal conditions?",
    options: ["60°C", "70°C", "85°C", "90°C"],
    correctAnswer: "70°C",
    explanation: "PVC-insulated cables are designed to operate at a maximum temperature of 70°C under normal conditions to prevent degradation of the insulation."
  },
  {
    id: 'level2install9',
    question: "What is the minimum bending radius for a multicore armoured cable with a diameter of 20mm?",
    options: ["6 times the diameter", "8 times the diameter", "10 times the diameter", "12 times the diameter"],
    correctAnswer: "8 times the diameter",
    explanation: "For multicore armoured cables, the minimum bending radius is 8 times the overall diameter, which would be 160mm for a 20mm cable."
  },
  {
    id: 'level2install10',
    question: "When installing a socket outlet, what is the recommended height from finished floor level in a standard domestic setting?",
    options: ["150mm", "250mm", "450mm", "1200mm"],
    correctAnswer: "450mm",
    explanation: "The standard height for socket outlets in domestic properties is 450mm from finished floor level to the center of the socket, though this may be adapted for accessibility needs."
  },
  {
    id: 'level2install11',
    question: "Which method should be used when joining two lengths of conduit together?",
    options: ["Soldering", "Coupler and locknut", "Heat welding", "Adhesive tape"],
    correctAnswer: "Coupler and locknut",
    explanation: "A coupler with a locknut is the appropriate method for joining two lengths of conduit, ensuring a secure and electrically continuous connection."
  },
  {
    id: 'level2install12',
    question: "What is the purpose of cable management systems in electrical installations?",
    options: ["To increase cable resistance", "To protect and support cables", "To increase cable voltage rating", "To make cables waterproof"],
    correctAnswer: "To protect and support cables",
    explanation: "Cable management systems provide mechanical protection, support for cables, and organized routing, protecting cables from damage and facilitating future maintenance or modifications."
  },
  {
    id: 'level2install13',
    question: "What is the correct method for terminating an SWA (Steel Wire Armoured) cable using a gland?",
    options: ["Connect armour to neutral", "Connect armour to line conductor", "Connect armour to earth", "Leave armour disconnected"],
    correctAnswer: "Connect armour to earth",
    explanation: "The steel wire armour of an SWA cable should be properly terminated and connected to earth using appropriate glands to provide earthing continuity and protection."
  },
  {
    id: 'level2install14',
    question: "What type of conduit is most suitable for outdoor installations exposed to weather?",
    options: ["Light gauge PVC", "Heavy gauge PVC", "Galvanized steel", "Aluminum"],
    correctAnswer: "Galvanized steel",
    explanation: "Galvanized steel conduit offers superior mechanical protection and weather resistance for outdoor installations exposed to the elements."
  },
  {
    id: 'level2install15',
  question: "When installing a flush switch in a solid wall, what should be used to house the accessory?",
  options: ["Pattress box", "Surface box", "Dry lining box", "Metal back box"],
  correctAnswer: "Pattress box",
  explanation: "A pattress box (sometimes spelled 'patress') is designed for flush mounting switches and sockets in solid walls, providing a secure housing for the accessory."
  },
  {
    id: 'level2install16',
    question: "What is the purpose of a draw wire in conduit installations?",
    options: ["To earth the conduit", "To pull cables through the conduit", "To strengthen the conduit", "To measure the conduit length"],
    correctAnswer: "To pull cables through the conduit",
    explanation: "A draw wire is installed in empty conduit to facilitate the future pulling of cables through the conduit system."
  },
  {
    id: 'level2install17',
    question: "Which type of trunking should be used in areas with high levels of corrosive substances?",
    options: ["Steel trunking", "Aluminium trunking", "PVC trunking", "Copper trunking"],
    correctAnswer: "PVC trunking",
    explanation: "PVC trunking is resistant to corrosion and is therefore suitable for installations in areas with corrosive substances that would damage metal trunking."
  },
  {
    id: 'level2install18',
    question: "What is the recommended installation method for cables in suspended ceilings?",
    options: ["Laid directly on ceiling tiles", "Supported by cable ties to pipes", "Supported by appropriate fixings or cable management systems", "Taped to ceiling grid"],
    correctAnswer: "Supported by appropriate fixings or cable management systems",
    explanation: "Cables in suspended ceilings should be properly supported using appropriate fixings or contained within suitable cable management systems, not laid directly on ceiling tiles."
  },
  {
    id: 'level2install19',
    question: "What is the purpose of 'derating factors' when sizing cables?",
    options: ["To increase cable capacity", "To account for conditions that reduce current-carrying capacity", "To determine voltage drop", "To calculate installation time"],
    correctAnswer: "To account for conditions that reduce current-carrying capacity",
    explanation: "Derating factors are applied when cables are grouped together, installed in high ambient temperatures, or in thermal insulation, as these conditions reduce current-carrying capacity."
  },
  {
    id: 'level2install20',
    question: "According to BS 7671, what color is used for protective conductors in fixed wiring?",
    options: ["Brown", "Blue", "Black", "Green and yellow"],
    correctAnswer: "Green and yellow",
    explanation: "Green and yellow striped insulation is the designated color for protective conductors (earth) in fixed wiring according to BS 7671."
  },
  {
    id: 'level2install21',
    question: "What type of box should be used for electrical connections that need to remain accessible?",
    options: ["Dry lining box", "Maintenance-free enclosure", "Junction box with removable lid", "Terminal block housing"],
    correctAnswer: "Junction box with removable lid",
    explanation: "A junction box with a removable lid should be used for connections that need to remain accessible for inspection, testing, or maintenance."
  },
  {
    id: 'level2install22',
    question: "When installing cables in an unheated loft space, what additional consideration is necessary?",
    options: ["Using higher rated voltage cables", "Derating for higher temperatures", "Accounting for ambient temperature during winter", "Installing only armoured cables"],
    correctAnswer: "Accounting for ambient temperature during winter",
    explanation: "In unheated loft spaces, consideration must be given to potential low temperatures in winter which can affect cable flexibility and increase risk of damage during installation."
  },
  {
    id: 'level2install23',
    question: "What is the correct method for installing cables through metal studs or partitions?",
    options: ["Drill a hole and pull cable through", "Use rubber grommets or bushings in the holes", "Wrap cables with insulation tape", "No special requirements needed"],
    correctAnswer: "Use rubber grommets or bushings in the holes",
    explanation: "When passing cables through metal studs or partitions, rubber grommets or bushings must be used to protect the cable insulation from damage on sharp metal edges."
  },
  {
    id: 'level2install24',
    question: "What is the maximum recommended number of cables that should be installed in a single-gang back box?",
    options: ["As many as will physically fit", "No more than 2", "No more than 4", "Dependent on cable size and box volume"],
    correctAnswer: "Dependent on cable size and box volume",
    explanation: "The number of cables that can be installed in a back box depends on the cable sizes and the box volume, to prevent overcrowding and overheating."
  },
  {
    id: 'level2install25',
    question: "When installing electrical equipment, which of these fixing methods is suitable for hollow walls?",
    options: ["Wood screws", "Cavity wall anchors", "Rawl plugs", "Concrete screws"],
    correctAnswer: "Cavity wall anchors",
    explanation: "Cavity wall anchors (such as toggle bolts or expansion anchors) are designed specifically for secure fixing to hollow walls and partitions."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l2-installation-techniques', 'items', q.id), {
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
