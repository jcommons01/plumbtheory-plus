// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2CablesContainment.ts

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

// ✅ Level 2 Cables & Containment Questions
const questions = [
  {
    id: 'level2cables1',
    question: "What does the cable code 'Twin and Earth' typically refer to in UK domestic installations?",
    options: ["A cable with two cores and a circuit protective conductor", "A cable with two separate earth wires", "A cable with twin insulation layers", "A cable with two separate cables in one sheath"],
    correctAnswer: "A cable with two cores and a circuit protective conductor",
    explanation: "Twin and Earth cable consists of insulated line and neutral cores plus a bare circuit protective conductor (earth), all contained within a PVC outer sheath, commonly used for power circuits in UK domestic installations."
  },
  {
    id: 'level2cables2',
    question: "What is the minimum depth below ground for burying SWA cable under a garden with no vehicle access?",
    options: ["150mm", "300mm", "450mm", "600mm"],
    correctAnswer: "450mm",
    explanation: "For areas with no vehicular access, such as domestic gardens, steel wire armoured (SWA) cables should be buried at a minimum depth of 450mm below ground level according to BS 7671."
  },
  {
    id: 'level2cables3',
    question: "What is the purpose of steel wire armour in an SWA cable?",
    options: ["To carry current", "To provide mechanical protection", "To increase current rating", "To reduce voltage drop"],
    correctAnswer: "To provide mechanical protection",
    explanation: "Steel wire armour provides mechanical protection for the cable against damage, making it suitable for direct burial, outdoor use, and other areas where physical protection is required."
  },
  {
    id: 'level2cables4',
    question: "What type of cable is specifically designed to maintain circuit integrity during a fire?",
    options: ["PVC twin and earth", "Standard SWA cable", "MICC (mineral insulated copper clad) cable", "XLPE insulated cable"],
    correctAnswer: "MICC (mineral insulated copper clad) cable",
    explanation: "MICC cable, with its mineral insulation and copper sheath, maintains circuit integrity during a fire, making it suitable for fire alarm systems, emergency lighting, and other critical circuits."
  },
  {
    id: 'level2cables5',
    question: "What is the primary advantage of metal trunking over PVC trunking?",
    options: ["Lower cost", "Easier installation", "Greater mechanical strength", "Better electrical insulation"],
    correctAnswer: "Greater mechanical strength",
    explanation: "Metal trunking provides greater mechanical strength and better protection against physical damage than PVC trunking, making it more suitable for industrial environments or areas with risk of impact."
  },
  {
    id: 'level2cables6',
    question: "What is the minimum recommended bending radius for a flexible cable with a diameter of 10mm?",
    options: ["3 times the overall diameter", "6 times the overall diameter", "8 times the overall diameter", "10 times the overall diameter"],
    correctAnswer: "6 times the overall diameter",
    explanation: "For flexible cables, the minimum bending radius is typically 6 times the overall diameter, which would be 60mm for a 10mm cable. This prevents damage to the insulation and conductors."
  },
  {
    id: 'level2cables7',
    question: "What type of cable is commonly used for domestic lighting circuits in the UK?",
    options: ["1.0mm² or 1.5mm² twin and earth", "2.5mm² twin and earth", "4.0mm² twin and earth", "6.0mm² twin and earth"],
    correctAnswer: "1.0mm² or 1.5mm² twin and earth",
    explanation: "Domestic lighting circuits typically use 1.0mm² or 1.5mm² twin and earth cable, which has sufficient current-carrying capacity for the relatively low loads of lighting circuits."
  },
  {
    id: 'level2cables8',
    question: "What is the primary purpose of cable trunking?",
    options: ["To protect cables from water damage", "To provide mechanical protection and support for multiple cables", "To increase the current-carrying capacity of cables", "To provide earthing continuity"],
    correctAnswer: "To provide mechanical protection and support for multiple cables",
    explanation: "Cable trunking provides mechanical protection and organized support for multiple cables, making installation and future maintenance easier, while maintaining separation between different circuit types if required."
  },
  {
    id: 'level2cables9',
    question: "According to BS 7671, what is the correct color for the neutral conductor in a fixed power cable?",
    options: ["Blue", "Black", "Brown", "Grey"],
    correctAnswer: "Blue",
    explanation: "In fixed power installations following BS 7671, the neutral conductor should be blue. This has been the standard since the harmonization with European color codes in 2004."
  },
  {
    id: 'level2cables10',
    question: "What is the advantage of using basket tray/wire mesh tray for cable containment?",
    options: ["Higher current rating for cables", "Improved cable insulation", "Better heat dissipation and ventilation", "Lower installation cost"],
    correctAnswer: "Better heat dissipation and ventilation",
    explanation: "Basket tray/wire mesh tray allows for better heat dissipation and ventilation around cables due to its open structure, reducing the need for cable derating compared to solid containment systems."
  },
  {
    id: 'level2cables11',
    question: "What is the typical voltage rating for standard domestic wiring cables in the UK?",
    options: ["230/400V", "300/500V", "450/750V", "600/1000V"],
    correctAnswer: "450/750V",
    explanation: "Standard domestic wiring cables in the UK, such as flat twin and earth, typically have a voltage rating of 450/750V (450V to earth, 750V between conductors)."
  },
  {
    id: 'level2cables12',
    question: "What is the maximum number of cables that should be installed in a conduit?",
    options: ["As many as will physically fit", "No specific limit", "Depends on the cable factor and space factor calculation", "No more than 4 cables"],
    correctAnswer: "Depends on the cable factor and space factor calculation",
    explanation: "The maximum number of cables in a conduit is determined by cable factor and space factor calculations to ensure cables can be drawn in without damage and to prevent overheating. The conduit fill should generally not exceed 40% of the internal cross-sectional area."
  },
  {
    id: 'level2cables13',
    question: "What type of cable containment system is most suitable for areas requiring frequent changes or additions to the cabling?",
    options: ["Conduit", "Cable basket", "Dado trunking", "Embedded in walls"],
    correctAnswer: "Dado trunking",
    explanation: "Dado trunking is particularly suitable for areas requiring frequent changes or additions to cabling, such as offices or laboratories, as it provides easy access for modifications without the need for structural work."
  },
  {
    id: 'level2cables14',
    question: "What is the purpose of a fire barrier in cable trunking that passes through a fire compartment wall?",
    options: ["To support the cables", "To provide earthing continuity", "To prevent the spread of fire through the trunking", "To identify the trunking as containing electrical cables"],
    correctAnswer: "To prevent the spread of fire through the trunking",
    explanation: "Fire barriers are installed in trunking where it passes through fire compartment walls to maintain the fire resistance of the wall by preventing fire and smoke from spreading through the trunking opening."
  },
  {
    id: 'level2cables15',
    question: "What does 'LSF' stand for in relation to cable specification?",
    options: ["Low Smoke and Fume", "Light Secure Fixing", "Long Service Factor", "Linear System Function"],
    correctAnswer: "Low Smoke and Fume",
    explanation: "LSF (Low Smoke and Fume) cables are designed to emit minimal smoke and toxic fumes when exposed to fire, making them safer in areas where people may need to evacuate during a fire."
  },
  {
    id: 'level2cables16',
    question: "What type of cable is recommended for underground external lighting circuits?",
    options: ["Standard twin and earth", "SWA (Steel Wire Armoured) cable", "FP200 cable", "MICC cable"],
    correctAnswer: "SWA (Steel Wire Armoured) cable",
    explanation: "SWA cable is recommended for underground external lighting circuits due to its mechanical protection, resistance to moisture, and suitability for direct burial with appropriate depth."
  },
  {
    id: 'level2cables17',
    question: "What is the primary purpose of a cable ladder system?",
    options: ["For domestic installations only", "For supporting large and heavy cables", "For temporary installations", "For internal lighting circuits only"],
    correctAnswer: "For supporting large and heavy cables",
    explanation: "Cable ladder systems are designed to support large and heavy cables, typically in industrial and commercial installations, providing high mechanical strength and large capacity."
  },
  {
    id: 'level2cables18',
    question: "What is the primary consideration when selecting a cable for a circuit?",
    options: ["Cost only", "Colour of the outer sheath", "Current-carrying capacity and environment", "Length only"],
    correctAnswer: "Current-carrying capacity and environment",
    explanation: "The primary considerations when selecting a cable are its current-carrying capacity (based on the circuit load) and the environment it will be installed in (temperature, presence of water, risk of mechanical damage, etc.)."
  },
  {
    id: 'level2cables19',
    question: "Which cable type is most suitable for wiring a domestic immersion heater?",
    options: ["1.0mm² twin and earth", "1.5mm² 3-core flex", "2.5mm² twin and earth", "Heat-resistant flexible cord"],
    correctAnswer: "Heat-resistant flexible cord",
    explanation: "Immersion heaters should be wired with heat-resistant flexible cord (often 2.5mm²) suitable for the high temperatures encountered, typically rated at 85°C or higher."
  },
  {
    id: 'level2cables20',
    question: "What is the maximum spacing recommended between supports for a horizontal run of 20mm metal conduit?",
    options: ["1.2 meters", "1.5 meters", "2.0 meters", "2.5 meters"],
    correctAnswer: "2.0 meters",
    explanation: "For 20mm metal conduit installed horizontally, the maximum spacing between supports should not exceed 2.0 meters to provide adequate support and prevent sagging."
  },
  {
    id: 'level2cables21',
    question: "What does the designation 'H07V-R' indicate on a cable?",
    options: ["High voltage cable for residential use", "Harmonized cable with 750V rating and rigid conductor", "Heat resistant cable with 7mm diameter", "Halogen-free cable with 7 cores"],
    correctAnswer: "Harmonized cable with 750V rating and rigid conductor",
    explanation: "H07V-R indicates a harmonized (H) cable rated at 700V (07) with PVC insulation (V) and a rigid (R) Class 2 conductor, commonly used for general purpose building wiring."
  },
  {
    id: 'level2cables22',
    question: "What is the primary purpose of cable cleats on a cable tray system?",
    options: ["To identify different circuits", "To secure cables in position", "To provide electrical insulation", "To join sections of cable tray"],
    correctAnswer: "To secure cables in position",
    explanation: "Cable cleats are used to secure cables in position on cable trays, preventing movement and ensuring cables remain organized, particularly important where forces from short-circuit currents could displace cables."
  },
  {
    id: 'level2cables23',
    question: "What is the benefit of metal conduit compared to PVC conduit?",
    options: ["Lower cost", "Easier installation", "Can act as an additional CPC if properly installed", "Lighter weight"],
    correctAnswer: "Can act as an additional CPC if properly installed",
    explanation: "Metal conduit, when properly installed with appropriate fittings and good electrical continuity, can serve as an additional circuit protective conductor (CPC) in the event of a fault."
  },
  {
    id: 'level2cables24',
    question: "When would fire-resistant cable (such as FP200) be required?",
    options: ["For all domestic circuits", "For outdoor installations", "For emergency lighting and fire alarm systems", "For bathroom installations"],
    correctAnswer: "For emergency lighting and fire alarm systems",
    explanation: "Fire-resistant cables like FP200 are required for emergency lighting, fire alarm systems, and other safety-critical circuits that must continue to function during a fire for a specified duration."
  },
  {
    id: 'level2cables25',
    question: "What should be installed where cables pass through a metal enclosure to prevent damage?",
    options: ["Insulation tape", "Additional earth wire", "Grommet or bush", "Fire barrier"],
    correctAnswer: "Grommet or bush",
    explanation: "A grommet or bush should be installed where cables pass through metal enclosures to protect the cable insulation from damage on the potentially sharp edges of the metal."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l2-cables-containment', 'items', q.id), {
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
