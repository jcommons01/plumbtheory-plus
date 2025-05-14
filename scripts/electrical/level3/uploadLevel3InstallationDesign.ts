// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3InstallationDesign.ts

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
    id: 'installationdesign01',
    question: "What is the first step in the electrical installation design process?",
    options: ["Select cable sizes", "Choose protective devices", "Assess client requirements", "Calculate Zs values"],
    correctAnswer: "Assess client requirements",
    explanation: "Understanding the client's needs and installation purpose is essential before any technical calculations or component selection."
  },
  {
    id: 'installationdesign02',
    question: "Which document provides guidance on energy efficiency in electrical installations?",
    options: ["Part P Building Regulations", "BS 7671 Section 8", "Wiring Matters", "IET CoP for Electricians"],
    correctAnswer: "BS 7671 Section 8",
    explanation: "Section 8 of BS 7671 introduces recommendations for improving the energy efficiency of electrical designs."
  },
  {
    id: 'installationdesign03',
    question: "What factor determines the selection of a protective device rating?",
    options: ["Voltage drop", "Cable armouring", "Design current (Ib)", "Maximum demand"],
    correctAnswer: "Design current (Ib)",
    explanation: "The protective device rating must be at least equal to the design current and less than or equal to the cable’s current capacity."
  },
  {
    id: 'installationdesign04',
    question: "Which factor has the greatest impact on voltage drop over long cable runs?",
    options: ["Insulation type", "Cable resistance", "Cable reactance", "Circuit breaker type"],
    correctAnswer: "Cable resistance",
    explanation: "Cable resistance increases with length and has the most significant effect on voltage drop, especially in single-phase circuits."
  },
  {
    id: 'installationdesign05',
    question: "What is the purpose of applying diversity in design calculations?",
    options: ["To reduce costs", "To allow future load expansion", "To account for non-simultaneous loads", "To improve Zs readings"],
    correctAnswer: "To account for non-simultaneous loads",
    explanation: "Diversity considers that not all loads operate at full capacity simultaneously, allowing for more realistic current calculations."
  },
  {
    id: 'installationdesign06',
    question: "Which formula is used to calculate the total power of a three-phase load?",
    options: ["P = V × I", "P = √3 × V × I × cos φ", "P = I²R", "P = V × I × sin φ"],
    correctAnswer: "P = √3 × V × I × cos φ",
    explanation: "This is the standard formula for three-phase power with a non-unity power factor."
  },
  {
    id: 'installationdesign07',
    question: "What is the maximum allowable voltage drop for lighting circuits in the UK?",
    options: ["2%", "3%", "4%", "5%"],
    correctAnswer: "3%",
    explanation: "BS 7671 recommends that lighting circuits should not exceed 3% voltage drop to maintain safe and reliable operation."
  },
  {
    id: 'installationdesign08',
    question: "Which BS 7671 regulation requires protection against overload current?",
    options: ["Reg 433.1.1", "Reg 411.3.1.1", "Reg 521.10.202", "Reg 131.8"],
    correctAnswer: "Reg 433.1.1",
    explanation: "Regulation 433.1.1 requires circuits to be protected against overload currents under normal conditions."
  },
  {
    id: 'installationdesign09',
    question: "What is the standard utilisation factor for a socket outlet circuit?",
    options: ["0.5", "0.8", "1.0", "0.3"],
    correctAnswer: "1.0",
    explanation: "A utilisation factor of 1.0 is commonly used for socket circuits, assuming full potential use by the end user."
  },
  {
    id: 'installationdesign10',
    question: "When designing for external influences, which code represents water ingress protection?",
    options: ["AD", "AE", "BD", "IP"],
    correctAnswer: "IP",
    explanation: "The IP (Ingress Protection) code classifies degrees of protection against solid objects and water penetration."
  },
  {
    id: 'installationdesign11',
    question: "What must be considered when designing for future electrical load expansion?",
    options: ["Temporary load", "Cable colour", "Spare capacity", "Supply earthing system"],
    correctAnswer: "Spare capacity",
    explanation: "Allowing for spare capacity ensures the system can safely support future additional loads without major redesign."
  },
  {
    id: 'installationdesign12',
    question: "What is the maximum demand of a 100A, 230V single-phase installation with a diversity factor of 0.8?",
    options: ["18.4 kW", "23.0 kW", "16.0 kW", "20.7 kW"],
    correctAnswer: "18.4 kW",
    explanation: "Using P = VI × diversity = 100A × 230V × 0.8 = 18,400W = 18.4 kW."
  },
  {
    id: 'installationdesign13',
    question: "Which component ensures automatic disconnection of supply in the event of a fault?",
    options: ["Main switch", "SPD", "Overcurrent device", "RCD"],
    correctAnswer: "RCD",
    explanation: "RCDs detect earth leakage and disconnect supply quickly to prevent electric shock."
  },
  {
    id: 'installationdesign14',
    question: "In a three-phase system, what does the term 'balanced load' mean?",
    options: ["Equal power factor on all lines", "Equal voltage on all phases", "Equal current in each phase", "Load is distributed randomly"],
    correctAnswer: "Equal current in each phase",
    explanation: "A balanced load means that all three phases carry equal current, reducing neutral conductor stress."
  },
  {
    id: 'installationdesign15',
    question: "Which test confirms the suitability of a circuit for operation under normal load?",
    options: ["R1+R2", "Voltage drop", "Prospective fault current", "Zs test"],
    correctAnswer: "Voltage drop",
    explanation: "Voltage drop tests confirm that circuits can operate under full load without excessive voltage loss."
  },
  {
    id: 'installationdesign16',
    question: "When must a surge protective device (SPD) be installed?",
    options: [
      "In all installations over 25A",
      "Where interruption would cause danger to life",
      "If the building has a metal roof",
      "Only in outdoor installations"
    ],
    correctAnswer: "Where interruption would cause danger to life",
    explanation: "BS 7671 requires SPDs where failure of equipment could impact safety, human life, or public services."
  },
  {
    id: 'installationdesign17',
    question: "Which regulation defines requirements for circuit arrangement and division?",
    options: ["Reg 314.1", "Reg 433.3.1", "Reg 536.4.203", "Reg 411.4.4"],
    correctAnswer: "Reg 314.1",
    explanation: "Reg 314.1 addresses proper arrangement to minimise inconvenience and prevent danger during faults or maintenance."
  },
  {
    id: 'installationdesign18',
    question: "What is the purpose of correction factors (e.g. Ca, Cg) in cable sizing?",
    options: ["To adjust for installation method", "To increase diversity", "To improve power factor", "To lower Zs values"],
    correctAnswer: "To adjust for installation method",
    explanation: "Correction factors compensate for environmental or grouping conditions that affect a cable’s current-carrying capacity."
  },
  {
    id: 'installationdesign19',
    question: "How is the final circuit protective device rated?",
    options: ["Greater than cable capacity", "Equal to design current", "Less than design current", "Between Ib and Iz"],
    correctAnswer: "Between Ib and Iz",
    explanation: "The protective device must be rated above Ib (design current) but not exceed Iz (cable capacity)."
  },
  {
    id: 'installationdesign20',
    question: "What does a cos φ of 0.85 indicate?",
    options: ["High resistance", "High harmonics", "Poor earthing", "Low power factor"],
    correctAnswer: "Low power factor",
    explanation: "A power factor of 0.85 indicates that only 85% of the current is used for useful work, leading to higher current draw."
  },
  {
    id: 'installationdesign21',
    question: "What is the main benefit of segregating safety circuits from general power circuits?",
    options: ["Reduces voltage drop", "Improves bonding", "Minimises EMC", "Prevents mutual interference"],
    correctAnswer: "Prevents mutual interference",
    explanation: "Segregation helps avoid electromagnetic interference and ensures integrity of emergency or safety-related circuits."
  },
  {
    id: 'installationdesign22',
    question: "Which installation type requires extra consideration for voltage drop and earth loop impedance?",
    options: ["Industrial", "Domestic", "TT system", "Long rural circuits"],
    correctAnswer: "Long rural circuits",
    explanation: "Long circuits can suffer from excessive volt drop and high Zs, which affect protection and functionality."
  },
  {
    id: 'installationdesign23',
    question: "What is the recommended minimum IP rating for accessories installed outdoors?",
    options: ["IP33", "IP44", "IP54", "IP65"],
    correctAnswer: "IP65",
    explanation: "IP65 offers dust-tight and water jet resistance, suitable for general external environments."
  },
  {
    id: 'installationdesign24',
    question: "Which BS 7671 regulation requires consideration of external influences in design?",
    options: ["Reg 421.1.201", "Reg 132.5.1", "Reg 411.3.2", "Reg 433.1.1"],
    correctAnswer: "Reg 132.5.1",
    explanation: "Regulation 132.5.1 requires designers to assess environmental and external conditions when selecting components."
  },
  {
    id: 'installationdesign25',
    question: "How is maximum demand generally calculated in a small commercial installation?",
    options: ["Sum of Ib values", "Full load of main fuse", "Ib × diversity factor", "Using R1+R2 values"],
    correctAnswer: "Ib × diversity factor",
    explanation: "Maximum demand is estimated using the total design currents with appropriate diversity factors applied."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-installation-design', 'items', q.id), {
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
