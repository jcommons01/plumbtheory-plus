// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2HealthSafety.ts

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

// ✅ Level 2 Electrical Health & Safety Questions
const questions = [
  {
    id: 'level2elechs1',
    question: "Under the Electricity at Work Regulations 1989, who has responsibility for electrical safety in the workplace?",
    options: ["Only qualified electricians", "The Health and Safety Executive only", "All employees and employers", "Only the person in charge of the building"],
    correctAnswer: "All employees and employers",
    explanation: "Under the Electricity at Work Regulations 1989, both employers and employees have a duty to comply with the provisions of the regulations."
  },
  {
    id: 'level2elechs2',
    question: "What does PPE stand for in electrical work?",
    options: ["Pre-Planned Equipment", "Personal Protection Enforcement", "Personal Protective Equipment", "Proper Precautionary Elements"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE refers to Personal Protective Equipment, which includes items like gloves, eye protection, and flame-resistant clothing that protect against electrical hazards."
  },
  {
    id: 'level2elechs3',
    question: "What is the main purpose of a Residual Current Device (RCD)?",
    options: ["To prevent electric shock", "To prevent overloading", "To increase power supply", "To measure voltage"],
    correctAnswer: "To prevent electric shock",
    explanation: "RCDs monitor the balance of current and quickly disconnect the circuit if an imbalance is detected, protecting against electric shock."
  },
  {
    id: 'level2elechs4',
    question: "Which document confirms that electrical installations meet BS 7671 requirements?",
    options: ["Safety guarantee", "Test certificate", "Electrical Installation Certificate", "Building regulation approval"],
    correctAnswer: "Electrical Installation Certificate",
    explanation: "An Electrical Installation Certificate is issued upon completion of a new installation, confirming compliance with BS 7671 (IET Wiring Regulations)."
  },
  {
    id: 'level2elechs5',
    question: "What is the maximum DC voltage considered 'extra-low voltage' under BS 7671?",
    options: ["50V", "110V", "120V", "230V"],
    correctAnswer: "50V",
    explanation: "According to BS 7671, extra-low voltage is defined as not exceeding 50V AC or 120V ripple-free DC. However, 50V is the widely used safety limit."
  },  
  {
    id: 'level2elechs6',
    question: "What should you do before working on an electrical installation?",
    options: ["Inform your supervisor only", "Isolate and secure the supply", "Test your tools", "Put up warning signs only"],
    correctAnswer: "Isolate and secure the supply",
    explanation: "Always isolate and secure the electrical supply before beginning work to prevent accidental energization."
  },
  {
    id: 'level2elechs7',
    question: "Which is the correct sequence for safe isolation?",
    options: ["Identify circuit, test meter, isolate, test circuit", "Isolate, test meter, identify circuit, test circuit", "Identify circuit, isolate, test meter, test circuit", "Test circuit, identify circuit, isolate, test meter"],
    correctAnswer: "Identify circuit, isolate, test meter, test circuit",
    explanation: "The correct safe isolation procedure: identify the circuit to be worked on, isolate it, verify your voltage tester works, then test that the circuit is dead."
  },
  {
    id: 'level2elechs8',
    question: "What does the IP rating on electrical equipment indicate?",
    options: ["Internal Protection", "Ingress Protection", "Inherent Performance", "Installation Potential"],
    correctAnswer: "Ingress Protection",
    explanation: "IP (Ingress Protection) ratings specify the environmental protection provided by enclosures for electrical equipment against solids and liquids."
  },
  {
    id: 'level2elechs9',
    question: "What is the maximum voltage for reduced low voltage tools on construction sites in the UK?",
    options: ["55V", "110V", "230V", "400V"],
    correctAnswer: "110V",
    explanation: "On UK construction sites, 110V (center-tapped to earth giving 55V to earth) is the standard for portable tools to reduce shock risk."
  },
  {
    id: 'level2elechs10',
    question: "What does the Construction (Design and Management) Regulations 2015 (CDM 2015) require regarding electrical safety?",
    options: ["Annual testing only", "No specific electrical requirements", "Safe design, installation and maintenance of electrical systems", "Only applies to new buildings"],
    correctAnswer: "Safe design, installation and maintenance of electrical systems",
    explanation: "CDM 2015 requires that electrical systems be designed, installed and maintained to prevent danger, with considerations throughout a project's lifecycle."
  },
  {
    id: 'level2elechs11',
    question: "Which of the following is the most appropriate way to verify that an electrical circuit is dead?",
    options: ["Use a multimeter", "Use a non-contact voltage tester only", "Use an approved voltage indicator and proving unit", "Touch the conductors carefully"],
    correctAnswer: "Use an approved voltage indicator and proving unit",
    explanation: "An approved voltage indicator that has been checked on a proving unit is the safe and proper way to verify a circuit is dead."
  },
  {
    id: 'level2elechs12',
    question: "What is the primary purpose of earthing an electrical installation?",
    options: ["To complete the circuit", "To prevent shock and provide a path for fault current", "To increase efficiency", "To reduce energy consumption"],
    correctAnswer: "To prevent shock and provide a path for fault current",
    explanation: "Earthing provides a path of low impedance to allow fault current to flow, enabling protective devices to operate and prevent electric shock."
  },
  {
    id: 'level2elechs13',
    question: "Under the Health and Safety at Work Act 1974, what must employers do regarding electrical equipment?",
    options: ["Replace it every 5 years", "Test it daily", "Maintain it in a safe condition", "Employ qualified electricians only"],
    correctAnswer: "Maintain it in a safe condition",
    explanation: "The Act requires employers to ensure electrical systems are maintained to prevent danger, including regular inspection and testing."
  },
  {
    id: 'level2elechs14',
    question: "What is the minimum IP rating required for electrical accessories in a bathroom Zone 2?",
    options: ["IPX0", "IPX4", "IPX7", "IPX8"],
    correctAnswer: "IPX4",
    explanation: "In bathroom Zone 2, electrical accessories must be rated at least IPX4 (protected against water splashing from any direction)."
  },
  {
    id: 'level2elechs15',
    question: "Which type of fire extinguisher should be used on electrical fires?",
    options: ["Water extinguisher", "Foam extinguisher", "CO₂ extinguisher", "Dry powder extinguisher"],
    correctAnswer: "CO₂ extinguisher",
    explanation: "CO₂ extinguishers are suitable for electrical fires as they do not conduct electricity and leave no residue."
  },  
  {
    id: 'level2elechs16',
    question: "What does the CE mark on electrical equipment indicate?",
    options: ["Chief Engineer approved", "Completely Electric", "Conforms to European standards", "Certification of Excellence"],
    correctAnswer: "Conforms to European standards",
    explanation: "CE marking indicates that a product conforms with relevant EU directives and can be sold throughout the European Economic Area."
  },
  {
    id: 'level2elechs17',
    question: "What is the main purpose of a lock-off kit in electrical work?",
    options: ["Securing tools", "Preventing theft", "Ensuring circuits remain isolated", "Restricting access to control panels"],
    correctAnswer: "Ensuring circuits remain isolated",
    explanation: "Lock-off kits physically prevent the re-energization of circuits during maintenance, ensuring they remain safely isolated."
  },
  {
    id: 'level2elechs18',
    question: "Under BS 7671, what is the maximum disconnection time for a 32A circuit on a TN system?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "0.8 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "For a 32A final circuit on a TN system, the maximum disconnection time is 0.4 seconds according to BS 7671."
  },
  {
    id: 'level2elechs19',
    question: "What is the purpose of PAT testing?",
    options: ["To test the power capacity", "To ensure electrical appliances are safe to use", "To check energy efficiency", "To verify voltage output"],
    correctAnswer: "To ensure electrical appliances are safe to use",
    explanation: "Portable Appliance Testing (PAT) is the examination of electrical appliances to ensure they are safe for continued use."
  },
  {
    id: 'level2elechs20',
    question: "Which regulation requires that all electrical work in domestic properties must meet certain safety standards?",
    options: ["Part L", "Part P", "Part F", "Part M"],
    correctAnswer: "Part P",
    explanation: "Part P of the Building Regulations requires that electrical installations in dwellings are safe and installed by competent persons."
  },
  {
    id: 'level2elechs21',
    question: "What is the purpose of a Minor Electrical Installation Works Certificate?",
    options: ["For alterations that don't need a full certificate", "For work by unqualified people", "For temporary installations only", "For installations under £1000"],
    correctAnswer: "For alterations that don't need a full certificate",
    explanation: "This certificate is for minor alterations and additions that don't require a new circuit or distribution board, where testing is limited."
  },
  {
    id: 'level2elechs22',
    question: "What information must be displayed on a distribution board according to BS 7671?",
    options: ["Manufacturer's name only", "Warning notice about RCDs", "Dates of installation", "Warning notice about isolation"],
    correctAnswer: "Warning notice about isolation",
    explanation: "BS 7671 requires a warning notice at the origin of every installation indicating how to isolate the supply in an emergency."
  },
  {
    id: 'level2elechs23',
    question: "What is the primary risk when working near buried electrical cables?",
    options: ["Cable theft", "Signal interference", "Striking and damaging cables", "Radiation exposure"],
    correctAnswer: "Striking and damaging cables",
    explanation: "The main risk is striking and damaging buried cables during excavation work, which can cause serious injury or death."
  },
  {
    id: 'level2elechs24',
    question: "What is the minimum safe working distance from overhead power lines for general construction work?",
    options: ["1 meter", "3 meters", "6 meters", "15 meters"],
    correctAnswer: "6 meters",
    explanation: "HSE guidance states a minimum clearance of 6 meters for construction work near overhead lines, though this may vary depending on voltage."
  },
  {
    id: 'level2elechs25',
    question: "What is the reporting timeframe under RIDDOR for major injuries caused by electrical accidents?",
    options: ["Immediately", "Within 24 hours", "Within 10 days", "Within 15 days"],
    correctAnswer: "Within 10 days",
    explanation: "RIDDOR requires that major injuries be reported as soon as possible, with a formal report submitted within 10 days."
  },  
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l2-health-safety', 'items', q.id), {
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
