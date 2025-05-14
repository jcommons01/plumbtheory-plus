// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3BuildingRegulationsLegalCompliance.ts

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

// ✅ Level 3 Building Regulations & Legal Compliance Questions
const questions = [
  {
    id: 'level3buildreg01',
    question: "What is the purpose of Part P in the Building Regulations?",
    options: [
      "To set energy efficiency targets",
      "To regulate plumbing standards in homes",
      "To ensure electrical safety in dwellings",
      "To define planning permission rules"
    ],
    correctAnswer: "To ensure electrical safety in dwellings",
    explanation: "Part P ensures domestic electrical installations are designed and installed safely to prevent fire and injury."
  },
  {
    id: 'level3buildreg02',
    question: "Which work must be notified under Part P in England?",
    options: [
      "Replacing a light fitting",
      "Installing a new consumer unit",
      "Changing a fuse in a plug",
      "Installing a socket on an existing ring circuit"
    ],
    correctAnswer: "Installing a new consumer unit",
    explanation: "Installing a consumer unit is notifiable under Part P as it significantly affects circuit protection and safety."
  },
  {
    id: 'level3buildreg03',
    question: "What is the legal status of BS 7671 (IET Wiring Regulations)?",
    options: [
      "Advisory document only",
      "Criminal law",
      "Statutory regulation",
      "Accepted standard for compliance"
    ],
    correctAnswer: "Accepted standard for compliance",
    explanation: "BS 7671 is not law but is the recognised standard for demonstrating electrical safety compliance."
  },
  {
    id: 'level3buildreg04',
    question: "What must be issued after completing notifiable electrical work?",
    options: [
      "Invoice and guarantee",
      "Building Regulations Compliance Certificate",
      "Minor Works Certificate",
      "Letter of conformity"
    ],
    correctAnswer: "Building Regulations Compliance Certificate",
    explanation: "A Compliance Certificate proves that notifiable work meets Part P of the Building Regulations."
  },
  {
    id: 'level3buildreg05',
    question: "Which Act places a general duty of care on employers and employees?",
    options: [
      "Health and Safety at Work etc. Act 1974",
      "Provision of Work Equipment Act 1998",
      "Consumer Rights Act 2015",
      "Electricity Safety Order 1999"
    ],
    correctAnswer: "Health and Safety at Work etc. Act 1974",
    explanation: "This Act requires employers and employees to ensure health and safety as far as is reasonably practicable."
  },
  {
    id: 'level3buildreg06',
    question: "Under RIDDOR, which must be reported to the HSE?",
    options: [
      "Electrical fire causing a fatality",
      "Blown fuse in an appliance",
      "Electric shock under 50V",
      "Trip hazard on site"
    ],
    correctAnswer: "Electrical fire causing a fatality",
    explanation: "RIDDOR requires reporting of work-related deaths, major injuries, and dangerous occurrences including electrical fires."
  },
  {
    id: 'level3buildreg07',
    question: "Which regulation covers working safely near live conductors?",
    options: [
      "Building Regulations Part L",
      "CDM 2015",
      "Electricity at Work Regulations 1989",
      "PUWER 1998"
    ],
    correctAnswer: "Electricity at Work Regulations 1989",
    explanation: "The EAWR 1989 governs electrical safety and prohibits live working unless absolutely necessary and safe."
  },
  {
    id: 'level3buildreg08',
    question: "What is the role of the 'responsible person' under the Fire Safety Order 2005?",
    options: [
      "To install fire alarms",
      "To carry out and review fire risk assessments",
      "To test emergency lighting monthly",
      "To notify Building Control of works"
    ],
    correctAnswer: "To carry out and review fire risk assessments",
    explanation: "The responsible person must manage fire risks, including assessing and controlling potential ignition sources like electrical systems."
  },
  {
    id: 'level3buildreg09',
    question: "When is an Electrical Installation Certificate (EIC) required?",
    options: [
      "For all new circuits or consumer units",
      "Only for minor repairs",
      "Only if requested by Building Control",
      "When replacing a broken light switch"
    ],
    correctAnswer: "For all new circuits or consumer units",
    explanation: "An EIC confirms compliance with BS 7671 for new circuits, boards or significant modifications."
  },
  {
    id: 'level3buildreg10',
    question: "What is the main purpose of the Construction Phase Plan under CDM 2015?",
    options: [
      "To estimate project costs",
      "To list all subcontractors",
      "To manage health and safety during construction",
      "To schedule inspection dates"
    ],
    correctAnswer: "To manage health and safety during construction",
    explanation: "The CPP outlines how risks will be controlled on site, including those related to electrical safety."
  },
  {
    id: 'level3buildreg11',
    question: "What is the maximum fine for breaching the Building Regulations in Magistrates' Court?",
    options: [
      "£5,000",
      "Unlimited",
      "£20,000",
      "£10,000"
    ],
    correctAnswer: "Unlimited",
    explanation: "Since 2015, Magistrates' Courts can impose unlimited fines for Building Regulations breaches."
  },
  {
    id: 'level3buildreg12',
    question: "What must be demonstrated before carrying out live electrical work legally?",
    options: [
      "Client approval has been granted",
      "Dead working is not practicable and suitable precautions are taken",
      "Risk assessment is optional",
      "Only voltages above 230V are live"
    ],
    correctAnswer: "Dead working is not practicable and suitable precautions are taken",
    explanation: "Live work is only legal if it’s unreasonable to isolate and all safety precautions are in place."
  },
  {
    id: 'level3buildreg13',
    question: "What is the purpose of a Schedule of Test Results in an EIC?",
    options: [
      "To record test values and verify compliance",
      "To plan inspection visits",
      "To summarise installation costs",
      "To list all materials used"
    ],
    correctAnswer: "To record test values and verify compliance",
    explanation: "Test results confirm the installation’s performance meets BS 7671 safety standards."
  },
  {
    id: 'level3buildreg14',
    question: "Who is responsible for checking competence under the Competent Person Scheme?",
    options: [
      "The local authority",
      "The client",
      "The scheme provider",
      "The insurance company"
    ],
    correctAnswer: "The scheme provider",
    explanation: "Approved schemes like NICEIC assess technical competence and inspection procedures of registered individuals."
  },
  {
    id: 'level3buildreg15',
    question: "What does COSHH require for substances used during electrical work?",
    options: [
      "They must be stored in locked cabinets only",
      "Risk assessments and control measures must be in place",
      "They must only be used in industrial environments",
      "No regulation applies to tradespeople"
    ],
    correctAnswer: "Risk assessments and control measures must be in place",
    explanation: "COSHH ensures workers are protected from hazardous substances like dust, fumes, or cleaning solvents."
  },
  {
    id: 'level3buildreg16',
    question: "What should emergency lighting in escape routes provide?",
    options: [
      "5 hours of backup lighting",
      "Audible alerts only",
      "1 hour of illumination after power failure",
      "Activation by light sensors"
    ],
    correctAnswer: "1 hour of illumination after power failure",
    explanation: "Emergency lighting must allow safe evacuation by staying illuminated for at least one hour during failure."
  },
  {
    id: 'level3buildreg17',
    question: "What is a legal requirement under PUWER for electrical test instruments?",
    options: [
      "They must be CE marked",
      "They must be less than 5 years old",
      "They must be suitable, maintained, and used by trained persons",
      "They must be used only during daylight"
    ],
    correctAnswer: "They must be suitable, maintained, and used by trained persons",
    explanation: "PUWER requires equipment to be safe, fit for use, and operated by competent persons."
  },
  {
    id: 'level3buildreg18',
    question: "Who is defined as a 'duty holder' under the Electricity at Work Regulations?",
    options: [
      "Only the site foreman",
      "Any person with control over part or all of an electrical system",
      "Only the main contractor",
      "Only qualified electricians"
    ],
    correctAnswer: "Any person with control over part or all of an electrical system",
    explanation: "The duty holder can be anyone responsible for the operation, maintenance, or safety of electrical systems."
  },
  {
    id: 'level3buildreg19',
    question: "Which of the following is NOT a notifiable location under Part P?",
    options: [
      "Bathroom",
      "Garden",
      "Living room",
      "New build dwelling"
    ],
    correctAnswer: "Living room",
    explanation: "Standard work in living rooms is non-notifiable unless it involves a new circuit or consumer unit."
  },
  {
    id: 'level3buildreg20',
    question: "Which document supports legal compliance with BS 7671 for design and testing procedures?",
    options: [
      "IET Guidance Notes",
      "Manufacturer brochures",
      "HSE posters",
      "NIC inspection checklist"
    ],
    correctAnswer: "IET Guidance Notes",
    explanation: "IET Guidance Notes help interpret and apply the Wiring Regulations correctly across different installation types."
  },
  {
    id: 'level3buildreg21',
    question: "When is a Minor Electrical Installation Works Certificate (MEIWC) appropriate?",
    options: [
      "Replacing a damaged consumer unit",
      "Installing a new lighting circuit",
      "Adding a socket to an existing circuit",
      "New supply to an outbuilding"
    ],
    correctAnswer: "Adding a socket to an existing circuit",
    explanation: "MEIWCs are for minor alterations that do not involve new circuits or major design work."
  },
  {
    id: 'level3buildreg22',
    question: "What is the purpose of the CDM 2015 Regulations?",
    options: [
      "To enforce planning regulations",
      "To manage design aesthetics",
      "To ensure health and safety in construction projects",
      "To supervise work quality"
    ],
    correctAnswer: "To ensure health and safety in construction projects",
    explanation: "CDM Regulations improve safety by clearly defining duties of all involved in the project lifecycle."
  },
  {
    id: 'level3buildreg23',
    question: "Which organisation publishes the Wiring Regulations in the UK?",
    options: [
      "HSE",
      "NAPIT",
      "IET",
      "City & Guilds"
    ],
    correctAnswer: "IET",
    explanation: "The IET (Institution of Engineering and Technology) publishes BS 7671 with BSI to define safe electrical practices."
  },
  {
    id: 'level3buildreg24',
    question: "What is the main purpose of the Electricity Safety, Quality and Continuity Regulations (ESQCR)?",
    options: [
      "To ensure low voltage appliances are safe",
      "To regulate electrical installers' competence",
      "To control public electricity distribution systems",
      "To register competent electricians"
    ],
    correctAnswer: "To control public electricity distribution systems",
    explanation: "ESQCR ensures public supply networks operate safely, reliably and within voltage tolerances."
  },
  {
    id: 'level3buildreg25',
    question: "What is required under CDM 2015 before construction work begins?",
    options: [
      "Detailed invoice",
      "Public notice",
      "Pre-construction information and site-specific risk assessments",
      "Health and Safety poster"
    ],
    correctAnswer: "Pre-construction information and site-specific risk assessments",
    explanation: "CDM 2015 requires safety planning documents before any construction starts, especially where electrical risks exist."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-building-regs', 'items', q.id), {
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

// 🔴 THIS LINE WAS MISSING
uploadQuestions();
