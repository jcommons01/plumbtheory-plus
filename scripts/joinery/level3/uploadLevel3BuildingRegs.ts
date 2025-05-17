// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3BuildingRegs.ts

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

// ✅ Joinery Level 3 Building Regulations & Standards – 25 Questions
const questions = [
  {
    id: 'joinery-l3-building-regs-001',
    question: "What is the maximum U-value allowed for new windows in existing dwellings in England under Approved Document L?",
    options: ["1.6 W/m²K", "1.0 W/m²K", "1.4 W/m²K", "2.0 W/m²K"],
    correctAnswer: "1.4 W/m²K",
    explanation: "Approved Document L1B requires replacement windows in existing homes to meet a maximum U-value of 1.4 W/m²K to ensure sufficient thermal efficiency and reduce heat loss."
  },
  {
    id: 'joinery-l3-building-regs-002',
    question: "What is the minimum clear opening height for an escape window in a first-floor habitable room?",
    options: ["600mm", "500mm", "700mm", "800mm"],
    correctAnswer: "600mm",
    explanation: "Escape windows must provide a clear opening height of at least 600mm, with an area of at least 0.33m², to allow emergency egress."
  },
  {
    id: 'joinery-l3-building-regs-003',
    question: "What type of glass must be used in doors and adjacent panels below 1500mm from the floor level?",
    options: ["Obscured glass", "Double glazing", "Laminated or toughened glass", "Tempered glass only"],
    correctAnswer: "Laminated or toughened glass",
    explanation: "Safety glass such as laminated or toughened must be used in critical zones where the risk of human impact is higher, such as doors and low-level glazing."
  },
  {
    id: 'joinery-l3-building-regs-004',
    question: "Which British Standard gives performance guidance for doors and windows?",
    options: ["BS 5395", "BS 8213", "BS 6375", "BS 476"],
    correctAnswer: "BS 6375",
    explanation: "BS 6375 outlines performance requirements for windows and doors, including weather resistance, strength, and operation standards."
  },
  {
    id: 'joinery-l3-building-regs-005',
    question: "What is the purpose of intumescent strips on a fire door?",
    options: ["Prevent draughts", "Enhance insulation", "Seal gaps when heated", "Act as a door stop"],
    correctAnswer: "Seal gaps when heated",
    explanation: "Intumescent strips expand in high temperatures, sealing gaps around the door to prevent fire and smoke from spreading."
  },
  {
    id: 'joinery-l3-building-regs-006',
    question: "Which document in the UK Building Regulations addresses accessibility in buildings?",
    options: ["Approved Document K", "Approved Document M", "Approved Document B", "Approved Document F"],
    correctAnswer: "Approved Document M",
    explanation: "Approved Document M provides guidance on access and facilities for disabled people in both dwellings and non-domestic buildings."
  },
  {
    id: 'joinery-l3-building-regs-007',
    question: "What is the maximum gap allowed between balusters to prevent falls in domestic stairs?",
    options: ["125mm", "100mm", "75mm", "50mm"],
    correctAnswer: "100mm",
    explanation: "A sphere of 100mm diameter must not pass through any opening in stair guarding, ensuring safety for children and pets."
  },
  {
    id: 'joinery-l3-building-regs-008',
    question: "What is the minimum clear width required for a new main entrance door in a dwelling?",
    options: ["700mm", "775mm", "800mm", "900mm"],
    correctAnswer: "775mm",
    explanation: "Approved Document M states that entrance doors must have a clear width of at least 775mm to accommodate wheelchair users."
  },
  {
    id: 'joinery-l3-building-regs-009',
    question: "Which document covers fire safety provisions in UK buildings?",
    options: ["Approved Document G", "Approved Document L", "Approved Document B", "Approved Document P"],
    correctAnswer: "Approved Document B",
    explanation: "Approved Document B contains essential guidance on fire precautions, including means of escape and fire containment."
  },
  {
    id: 'joinery-l3-building-regs-010',
    question: "What is PAS 24 concerned with in the joinery sector?",
    options: ["Glass strength", "Security performance", "Fire resistance", "Ventilation design"],
    correctAnswer: "Security performance",
    explanation: "PAS 24 sets enhanced security standards for doors and windows, requiring resistance to physical attack under test conditions."
  },
  {
    id: 'joinery-l3-building-regs-011',
    question: "What is the minimum height required for stair balustrades in dwellings?",
    options: ["850mm", "900mm", "1000mm", "1100mm"],
    correctAnswer: "900mm",
    explanation: "Stair guarding must be at least 900mm high to reduce the risk of falls, as specified in Approved Document K."
  },
  {
    id: 'joinery-l3-building-regs-012',
    question: "Which document regulates sound insulation between dwellings?",
    options: ["Approved Document D", "Approved Document E", "Approved Document G", "Approved Document H"],
    correctAnswer: "Approved Document E",
    explanation: "Approved Document E addresses resistance to the passage of sound, ensuring privacy and acoustic separation in buildings."
  },
  {
    id: 'joinery-l3-building-regs-013',
    question: "What is the maximum allowable threshold height for accessible doorways?",
    options: ["10mm", "15mm", "25mm", "30mm"],
    correctAnswer: "15mm",
    explanation: "Door thresholds should be no higher than 15mm to allow smooth access for wheelchair users and comply with Approved Document M."
  },
  {
    id: 'joinery-l3-building-regs-014',
    question: "What must be included in a compliant fire doorset?",
    options: ["Thick door leaf only", "Frame and hinges only", "Entire assembly tested as one unit", "Any solid timber door"],
    correctAnswer: "Entire assembly tested as one unit",
    explanation: "Fire doorsets must be tested as a full unit including leaf, frame, seals, and hardware to ensure consistent fire resistance."
  },
  {
    id: 'joinery-l3-building-regs-015',
    question: "What British Standard sets out requirements for timber windows?",
    options: ["BS 8213", "BS 644", "BS 476", "BS 8300"],
    correctAnswer: "BS 644",
    explanation: "BS 644 specifies construction, performance, and durability requirements for timber-framed windows in domestic use."
  },
  {
    id: 'joinery-l3-building-regs-016',
    question: "What is the minimum headroom required above domestic stairs?",
    options: ["1.9m", "2.0m", "2.1m", "1.8m"],
    correctAnswer: "2.0m",
    explanation: "To ensure safe use, a minimum headroom of 2.0m must be maintained above the full width of stairs."
  },
  {
    id: 'joinery-l3-building-regs-017',
    question: "What does BS 8213 provide guidance on?",
    options: ["Fire doors", "Timber floors", "Window installation", "Brickwork ties"],
    correctAnswer: "Window installation",
    explanation: "BS 8213 offers best practice advice on the installation of windows and doors, including fixing methods and tolerances."
  },
  {
    id: 'joinery-l3-building-regs-018',
    question: "Which standard defines enhanced performance for window and door security?",
    options: ["BS 7375", "BS EN 1279", "PAS 24", "BS 8213"],
    correctAnswer: "PAS 24",
    explanation: "PAS 24 is the benchmark for security performance of external doors and windows against physical attack."
  },
  {
    id: 'joinery-l3-building-regs-019',
    question: "What does a self-closing device ensure in a fire door?",
    options: ["Quiet operation", "No smoke entry", "Automatic return", "Thermal insulation"],
    correctAnswer: "Automatic return",
    explanation: "Self-closing devices ensure the door returns to the closed position after use, critical for maintaining fire protection."
  },
  {
    id: 'joinery-l3-building-regs-020',
    question: "Which British Standard gives installation guidance for timber staircases?",
    options: ["BS 5395", "BS 8213", "BS 6375", "BS 7300"],
    correctAnswer: "BS 5395",
    explanation: "BS 5395 Part 1 provides recommendations for domestic stair construction, layout, and safety features."
  },
  {
    id: 'joinery-l3-building-regs-021',
    question: "What minimum tread depth (going) is required for stairs in dwellings?",
    options: ["200mm", "220mm", "240mm", "260mm"],
    correctAnswer: "220mm",
    explanation: "Approved Document K mandates a minimum going of 220mm for stair treads to ensure safe foot placement."
  },
  {
    id: 'joinery-l3-building-regs-022',
    question: "What is a protected stairway under Building Regulations?",
    options: ["A staircase with lighting", "Stairs with no windows", "A stair enclosed in fire-resisting construction", "A metal stairway"],
    correctAnswer: "A stair enclosed in fire-resisting construction",
    explanation: "Protected stairways are enclosed routes that maintain integrity in fire conditions, aiding safe evacuation."
  },
  {
    id: 'joinery-l3-building-regs-023',
    question: "What is the role of BS EN 12600 in glazing applications?",
    options: ["Thermal insulation", "Security rating", "Impact resistance classification", "Glass clarity rating"],
    correctAnswer: "Impact resistance classification",
    explanation: "BS EN 12600 classifies safety glass by impact performance, used to determine compliance in critical areas."
  },
  {
    id: 'joinery-l3-building-regs-024',
    question: "What is the definition of 'notifiable work' in relation to windows?",
    options: ["Only for commercial sites", "Must be declared to the police", "Requires Building Control or a competent person", "Only applicable to fire doors"],
    correctAnswer: "Requires Building Control or a competent person",
    explanation: "Replacement window installations are classed as notifiable work and must be reported to Building Control or completed by a registered installer."
  },
  {
    id: 'joinery-l3-building-regs-025',
    question: "Which regulation sets out requirements for thermal performance of buildings?",
    options: ["Approved Document C", "Approved Document L", "Approved Document M", "Approved Document P"],
    correctAnswer: "Approved Document L",
    explanation: "Approved Document L sets standards for energy efficiency, focusing on insulation, heating systems, and U-values for building elements."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-building-regs', 'items', q.id), {
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
