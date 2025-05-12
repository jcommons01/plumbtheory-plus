// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2BasicCircuitDesign.ts

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

// ✅ Level 2 Basic Circuit Design Questions
const questions = [
  {
    id: 'level2circuit1',
    question: "What is the standard rating for a domestic ring final circuit in the UK?",
    options: ["20A", "30A", "32A", "40A"],
    correctAnswer: "32A",
    explanation: "The standard rating for a ring final circuit in UK domestic installations is 32A, typically wired with 2.5mm² cable and protected by a 32A circuit breaker or fuse."
  },
  {
    id: 'level2circuit2',
    question: "What is the maximum floor area that a 32A ring final circuit should serve in a domestic installation?",
    options: ["50m²", "75m²", "100m²", "No specific limit"],
    correctAnswer: "100m²",
    explanation: "A 32A ring final circuit should serve a maximum floor area of 100m² in domestic installations according to BS 7671 guidance."
  },
  {
    id: 'level2circuit3',
    question: "What is the standard cable size for a 6kW electric shower circuit?",
    options: ["1.5mm²", "2.5mm²", "4.0mm²", "6.0mm²"],
    correctAnswer: "6.0mm²",
    explanation: "A 6kW electric shower (approximately 26A at 230V) typically requires 6.0mm² cable to ensure adequate current-carrying capacity and minimize voltage drop."
  },
  {
    id: 'level2circuit4',
  question: "What is the maximum number of 13A socket outlets permitted on a 20A radial circuit?",
  options: ["No specific limit", "13", "20", "10"],
  correctAnswer: "No specific limit",
  explanation: "There is no specific limit to the number of socket outlets on a 20A radial circuit in BS 7671, but the total load and voltage drop must be considered in the design."
  },
  {
    id: 'level2circuit5',
    question: "What is the standard circuit protection device rating for a domestic lighting circuit?",
    options: ["5A", "6A", "10A", "16A"],
    correctAnswer: "6A",
    explanation: "Domestic lighting circuits are typically protected by a 6A device, corresponding to the current-carrying capacity of the standard 1.0mm² or 1.5mm² cable used."
  },
  {
    id: 'level2circuit6',
    question: "Which circuit design allows control of a single light from three or more positions?",
    options: ["Single-way switching", "Two-way switching with intermediate switching", "Loop-in lighting circuit", "Switched fused connection unit"],
    correctAnswer: "Two-way switching with intermediate switching",
    explanation: "This setup uses two two-way switches and one or more intermediate switches, allowing control of a light from multiple locations, such as in stairwells or large rooms."
  },  
  {
    id: 'level2circuit7',
    question: "What is the maximum permitted voltage drop for a lighting circuit according to BS 7671?",
    options: ["2.5%", "3%", "4%", "5%"],
    correctAnswer: "3%",
    explanation: "The maximum permitted voltage drop for lighting circuits is 3% of the nominal voltage according to BS 7671, which equals 6.9V in a 230V installation."
  },
  {
    id: 'level2circuit8',
    question: "What is the main advantage of a ring final circuit compared to a radial circuit?",
    options: ["Lower installation cost", "Higher current-carrying capacity for the same cable size", "Simpler design", "Better protection against overload"],
    correctAnswer: "Higher current-carrying capacity for the same cable size",
    explanation: "Ring final circuits provide higher current-carrying capacity for the same cable size because current can flow in both directions around the ring to any point of use."
  },
  {
    id: 'level2circuit9',
    question: "Which type of circuit is required for fixed cooking appliances with a rating exceeding 3kW?",
    options: ["Radial circuit", "Ring circuit", "Dedicated circuit", "Any of the above"],
    correctAnswer: "Dedicated circuit",
    explanation: "Fixed cooking appliances exceeding 3kW, such as electric cookers or hobs, require a dedicated circuit appropriately sized for the specific appliance rating."
  },
  {
    id: 'level2circuit10',
    question: "What is the maximum number of points recommended on a domestic lighting circuit?",
    options: ["8", "10", "12", "No specific limit"],
    correctAnswer: "No specific limit",
    explanation: "There is no specific maximum number of lighting points on a domestic lighting circuit in the regulations, but practical considerations of load, cable sizing, and voltage drop must be considered."
  },
  {
    id: 'level2circuit11',
    question: "What is the purpose of a consumer unit's main switch?",
    options: ["To protect against earth leakage", "To protect individual circuits from overload", "To isolate the entire installation from the supply", "To prevent electric shock"],
    correctAnswer: "To isolate the entire installation from the supply",
    explanation: "The main switch in a consumer unit allows the entire electrical installation to be safely isolated from the electricity supply when necessary."
  },
  {
    id: 'level2circuit12',
    question: "What is the primary purpose of circuit separation in a consumer unit?",
    options: ["To save space", "To reduce voltage drop", "To separate circuits for aesthetic reasons", "To allow isolation of individual circuits for maintenance or safety"],
    correctAnswer: "To allow isolation of individual circuits for maintenance or safety",
    explanation: "Circuit separation in a consumer unit allows individual circuits to be isolated for maintenance, fault-finding, or safety without disrupting the entire installation."
  },
  {
    id: 'level2circuit13',
    question: "Which cable size is typically used for a 20A radial circuit supplying socket outlets?",
    options: ["1.0mm²", "1.5mm²", "2.5mm²", "4.0mm²"],
    correctAnswer: "2.5mm²",
    explanation: "A 20A radial circuit supplying socket outlets typically uses 2.5mm² cable, which has adequate current-carrying capacity for this application."
  },
  {
    id: 'level2circuit14',
    question: "What is the purpose of a two-way switching arrangement?",
    options: ["To control two separate lights", "To control one light from two different locations", "To provide backup if one switch fails", "To create decorative lighting effects"],
    correctAnswer: "To control one light from two different locations",
    explanation: "Two-way switching allows a single light or group of lights to be controlled from two different locations, commonly used for staircases, hallways, or large rooms with multiple entrances."
  },
  {
    id: 'level2circuit15',
    question: "What is the standard method of connecting lighting points in a domestic installation?",
    options: ["Radial circuit", "Ring circuit", "Junction box method", "Loop-in method"],
    correctAnswer: "Loop-in method",
    explanation: "The loop-in method is the standard approach for domestic lighting installations, where the cable loops from one ceiling rose to the next without using separate junction boxes."
  },
  {
    id: 'level2circuit16',
    question: "What is the maximum number of socket outlets permitted on a spur off a ring final circuit?",
    options: ["1", "2", "3", "No specific limit"],
    correctAnswer: "1",
    explanation: "A fused spur from a ring final circuit can supply an unlimited number of fixed equipment units but only one single or one twin socket outlet."
  },
  {
    id: 'level2circuit17',
    question: "What is the maximum cable length for a 32A ring final circuit using 2.5mm² cable before voltage drop becomes a concern?",
    options: ["50m", "70m", "100m", "It depends on the connected load"],
    correctAnswer: "It depends on the connected load",
    explanation: "The maximum length depends on the connected load. Voltage drop calculations must be performed based on the circuit load and cable characteristics to ensure the drop doesn't exceed the permitted maximum."
  },
  {
    id: 'level2circuit18',
    question: "What is the purpose of an RCBO in a circuit design?",
    options: ["Overload protection only", "Earth leakage protection only", "Both overload and earth leakage protection in one device", "Surge protection"],
    correctAnswer: "Both overload and earth leakage protection in one device",
    explanation: "An RCBO (Residual Current Circuit Breaker with Overload protection) combines the functions of an MCB and RCD, providing both overcurrent and earth leakage protection in a single device."
  },
  {
    id: 'level2circuit19',
    question: "Which circuit design feature helps prevent dangerous touch voltages in the event of a fault?",
    options: ["Using higher rated circuit breakers", "Protective equipotential bonding", "Using higher voltage equipment", "Increasing the cable size"],
    correctAnswer: "Protective equipotential bonding",
    explanation: "Protective equipotential bonding connects all exposed conductive parts to the main earthing terminal, ensuring that no dangerous potential differences can occur between touchable parts during a fault."
  },
  {
    id: 'level2circuit20',
    question: "What determines the rating of the protective device for a circuit?",
    options: ["The voltage of the supply", "The lowest current-carrying capacity in the circuit", "The highest current-carrying capacity in the circuit", "The expected load only"],
    correctAnswer: "The lowest current-carrying capacity in the circuit",
    explanation: "The protective device rating is determined by the lowest current-carrying capacity in the circuit, which is typically the cable, to ensure the circuit is protected from overcurrent throughout its length."
  },
  {
    id: 'level2circuit21',
    question: "What is diversity in circuit design?",
    options: ["Using different types of cable", "Using different circuit protection devices", "The assumption that not all equipment will be used simultaneously at full load", "Having multiple consumer units"],
    correctAnswer: "The assumption that not all equipment will be used simultaneously at full load",
    explanation: "Diversity refers to the fact that not all equipment in an installation will be used simultaneously at full load, allowing for smaller supply cables and equipment than would be needed if all loads operated at once."
  },
  {
    id: 'level2circuit22',
    question: "What type of circuit is typically used for outdoor lighting in domestic installations?",
    options: ["Ring circuit", "Dedicated radial circuit with RCD protection", "Spur from a ring circuit", "Extension of an indoor lighting circuit"],
    correctAnswer: "Dedicated radial circuit with RCD protection",
    explanation: "Outdoor lighting typically uses a dedicated radial circuit with RCD protection, usually rated at 6A or 10A, to ensure safety in the outdoor environment where water ingress is possible."
  },
  {
    id: 'level2circuit23',
    question: "What is the minimum recommended number of lighting circuits for an average 3-bedroom house?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "At least 2 lighting circuits are recommended for an average 3-bedroom house to divide the lighting load and ensure that not all lights are lost in the event of a circuit fault."
  },
  {
    id: 'level2circuit24',
    question: "What should be considered when determining the number of socket outlets required in a room?",
    options: ["Room size only", "Future needs and room usage", "Standard is always 4 per room", "Only the current number of appliances"],
    correctAnswer: "Future needs and room usage",
    explanation: "The number of socket outlets should be determined by considering both current and future needs, the room's purpose, likely appliance usage, and furniture layout to avoid the need for extension leads."
  },
  {
    id: 'level2circuit25',
    question: "What is the standard way to wire multiple socket outlets on a radial circuit?",
    options: ["Star wiring from a junction box", "Daisy chain from one socket to the next", "Individual cables from the consumer unit to each socket", "Ring circuit only"],
    correctAnswer: "Daisy chain from one socket to the next",
    explanation: "In a radial circuit, socket outlets are typically wired in a daisy chain configuration, with the cable running from one socket to the next in sequence."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l2-circuit-design', 'items', q.id), {
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
