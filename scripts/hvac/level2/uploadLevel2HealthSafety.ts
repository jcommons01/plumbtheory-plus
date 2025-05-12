// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2HealthSafety.ts

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

// ✅ HVAC Level 2 Health & Safety Questions
const questions = [
  {
    id: 'hvac-l2-health-safety1',
    question: "Under the Health and Safety at Work Act 1974, what is the main responsibility of an employer?",
    options: ["To provide free personal protective equipment", "To ensure the health, safety and welfare of employees", "To conduct risk assessments only when necessary", "To report accidents only if they result in major injury"],
    correctAnswer: "To ensure the health, safety and welfare of employees",
    explanation: "Under the Health and Safety at Work Act 1974, the main responsibility of an employer is to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees. This includes providing safe systems of work, safe equipment, proper training, and a safe working environment."
  },
  {
    id: 'hvac-l2-health-safety2',
    question: "When working with refrigerants, which of the following personal protective equipment (PPE) is essential?",
    options: ["Hard hat only", "Safety gloves and safety goggles", "High-visibility vest only", "Steel toe-capped boots only"],
    correctAnswer: "Safety gloves and safety goggles",
    explanation: "When working with refrigerants, safety gloves and safety goggles are essential PPE items. Refrigerants can cause frostbite on contact with skin and serious eye damage. The gloves should be suitable for handling chemicals and protecting against cold temperatures, while goggles protect the eyes from splashes or release of refrigerant."
  },
  {
    id: 'hvac-l2-health-safety3',
    question: "What does COSHH stand for in relation to workplace safety?",
    options: ["Control of Substances Hazardous to Health", "Care of Systems and Harmful Hazards", "Certification of Safety in Handling Hazards", "Compliance of Standards for Health Hazards"],
    correctAnswer: "Control of Substances Hazardous to Health",
    explanation: "COSHH stands for Control of Substances Hazardous to Health. The COSHH Regulations 2002 require employers to control substances that are hazardous to health, including many chemicals and products used in HVAC work such as refrigerants, cleaning agents, solvents, and oils."
  },
  {
    id: 'hvac-l2-health-safety4',
    question: "What is the safest way to lift a heavy component in an HVAC installation?",
    options: ["Quickly, to get it over with", "Using your back muscles for maximum strength", "Bending at the knees and keeping the back straight", "Twisting at the waist for better leverage"],
    correctAnswer: "Bending at the knees and keeping the back straight",
    explanation: "The safest way to lift a heavy component is to bend at the knees while keeping the back straight. This technique engages the stronger leg muscles rather than the back, reduces strain on the spine, and helps prevent musculoskeletal injuries. For very heavy components, mechanical lifting aids should be used."
  },
  {
    id: 'hvac-l2-health-safety5',
    question: "Which regulation specifically covers the safe use of work equipment in the UK?",
    options: ["COSHH Regulations 2002", "Working at Height Regulations 2005", "Manual Handling Operations Regulations 1992", "Provision and Use of Work Equipment Regulations 1998 (PUWER)"],
    correctAnswer: "Provision and Use of Work Equipment Regulations 1998 (PUWER)",
    explanation: "The Provision and Use of Work Equipment Regulations 1998 (PUWER) specifically covers the safe use of work equipment in the UK. These regulations require that equipment provided for use at work is suitable for its intended use, properly maintained, and used only by people who have received adequate training."
  },
  {
    id: 'hvac-l2-health-safety6',
    question: "When working with refrigerants, what is the primary health risk associated with refrigerant gas displacing oxygen in a confined space?",
    options: ["Skin irritation", "Asphyxiation", "Permanent eye damage", "Hearing loss"],
    correctAnswer: "Asphyxiation",
    explanation: "The primary health risk when refrigerant gas displaces oxygen in a confined space is asphyxiation. Refrigerants are typically heavier than air and can accumulate in low-lying areas, reducing oxygen levels. This can lead to rapid unconsciousness and death if not addressed immediately with proper ventilation and rescue procedures."
  },
  {
    id: 'hvac-l2-health-safety7',
    question: "According to the Working at Height Regulations 2005, when should work at height be avoided?",
    options: ["Only during poor weather conditions", "Only if the worker is afraid of heights", "Whenever it is reasonably practicable to do so", "Only if proper safety equipment is unavailable"],
    correctAnswer: "Whenever it is reasonably practicable to do so",
    explanation: "According to the Working at Height Regulations 2005, work at height should be avoided whenever it is reasonably practicable to do so. The regulations establish a hierarchy of controls with the first step being to avoid work at height where possible. If it cannot be avoided, appropriate measures must be taken to prevent falls."
  },
  {
    id: 'hvac-l2-health-safety8',
    question: "What action should be taken if an HVAC technician discovers asbestos while working on an older system?",
    options: ["Continue working but wear a dust mask", "Remove it immediately using standard tools", "Stop work immediately and report the discovery", "Cover it with duct tape and continue working"],
    correctAnswer: "Stop work immediately and report the discovery",
    explanation: "If asbestos is discovered, work should be stopped immediately and the discovery reported to the responsible person (e.g., supervisor, client, building manager). Asbestos requires specialized handling by licensed contractors under the Control of Asbestos Regulations 2012. Attempting to handle it without proper training and equipment is illegal and dangerous."
  },
  {
    id: 'hvac-l2-health-safety9',
    question: "Under the Electricity at Work Regulations 1989, what is required before working on electrical components of HVAC systems?",
    options: ["Only verbal confirmation that power is off", "Working only with rubber gloves", "Proper isolation and proving dead with appropriate equipment", "Working only during daylight hours"],
    correctAnswer: "Proper isolation and proving dead with appropriate equipment",
    explanation: "Under the Electricity at Work Regulations 1989, proper isolation procedures must be followed before working on electrical components. This includes isolating the supply, securing the isolation (e.g., lock-off and tag procedures), and proving dead using appropriate test equipment to verify the absence of voltage before work begins."
  },
  {
    id: 'hvac-l2-health-safety10',
    question: "What does a blue HVAC pipe identification colour typically indicate according to BS 1710?",
    options: ["Flammable gas", "Electricity", "Water", "Toxic material"],
    correctAnswer: "Water",
    explanation: "According to BS 1710 (Identification of pipelines and services), blue pipe identification colour typically indicates water. Specifically, light blue indicates potable (drinking) water, while blue indicates cooling, cold water services, or compressed air. This colour coding system helps workers identify pipe contents quickly for safety purposes."
  },
  {
    id: 'hvac-l2-health-safety11',
    question: "What is the legal requirement for portable electrical equipment testing frequency in a typical commercial HVAC workplace?",
    options: ["Daily testing is required by law", "Annual testing is always required", "There is no specific legal timeframe - it depends on risk assessment", "Testing is required every three months without exception"],
    correctAnswer: "There is no specific legal timeframe - it depends on risk assessment",
    explanation: "There is no specific legal timeframe for portable appliance testing (PAT) in UK regulations. The Electricity at Work Regulations 1989 require that electrical equipment is maintained to prevent danger, but the frequency of inspection and testing should be determined by risk assessment, considering factors like equipment type, usage frequency, and environment."
  },
  {
    id: 'hvac-l2-health-safety12',
    question: "Which of the following is a requirement when transporting refrigerant cylinders?",
    options: ["They must always be transported horizontally", "They must be secured in an upright position", "Valves must be fully open during transport", "They must be completely empty"],
    correctAnswer: "They must be secured in an upright position",
    explanation: "Refrigerant cylinders must be secured in an upright position during transport to prevent damage to the valve and unintended release of contents. They should also be kept away from direct sunlight and heat sources, and transported in ventilated vehicles with appropriate hazard information displayed as required by transport regulations."
  },
  {
    id: 'hvac-l2-health-safety13',
    question: "What is the main purpose of a Method Statement in HVAC installation work?",
    options: ["To calculate the cost of the project", "To detail step-by-step how work will be carried out safely", "To list all the materials required", "To assign blame if accidents occur"],
    correctAnswer: "To detail step-by-step how work will be carried out safely",
    explanation: "A Method Statement details step-by-step how work will be carried out safely. It explains the hazards involved and how these will be controlled, specifies who is responsible for what, what equipment will be used, and the sequence of work. It's a practical document that ensures all workers understand the safe system of work to be followed."
  },
  {
    id: 'hvac-l2-health-safety14',
    question: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR), how long must an employee be off work with a work-related injury before it becomes reportable?",
    options: ["1 day", "3 days", "Over 7 days", "14 days"],
    correctAnswer: "Over 7 days",
    explanation: "Under RIDDOR, injuries that lead to a worker being incapacitated for more than 7 consecutive days must be reported to the relevant enforcing authority. The report must be made within 15 days of the accident. Incapacitation means that the worker is absent or is unable to do their normal work duties."
  },
  {
    id: 'hvac-l2-health-safety15',
    question: "What is the recommended maximum weight for a man to lift at waist height according to HSE guidance?",
    options: ["5kg", "10kg", "20kg", "25kg"],
    correctAnswer: "20kg",
    explanation: "According to HSE guidance on manual handling, the recommended maximum weight for a man to lift at waist height is 20kg under ideal conditions. This assumes the load is held close to the body, in a good posture, with a stable environment. The recommended weight reduces as lifting positions deviate from the ideal waist height position."
  },
  {
    id: 'hvac-l2-health-safety16',
    question: "What is the primary purpose of a Risk Assessment in HVAC work?",
    options: ["To create paperwork for legal compliance only", "To identify hazards and decide on precautions to take", "To calculate insurance costs", "To determine who to blame if something goes wrong"],
    correctAnswer: "To identify hazards and decide on precautions to take",
    explanation: "The primary purpose of a Risk Assessment is to identify hazards and decide on precautions to take. The Management of Health and Safety at Work Regulations 1999 require employers to carry out risk assessments to identify potential hazards, evaluate risks, and implement appropriate control measures to ensure work can be carried out safely."
  },
  {
    id: 'hvac-l2-health-safety17',
    question: "Which of the following gases might be encountered when servicing older refrigeration systems that could deplete the ozone layer?",
    options: ["R-410A", "R-32", "R-22", "R-290"],
    correctAnswer: "R-22",
    explanation: "R-22 (HCFC-22) is an ozone-depleting refrigerant that might be encountered when servicing older refrigeration systems. It has been phased out under the Montreal Protocol and EU/UK regulations, with use of virgin R-22 banned since 2010 and recycled R-22 banned since 2015. When encountered, it must be properly recovered by qualified personnel."
  },
  {
    id: 'hvac-l2-health-safety18',
    question: "What is the minimum fire rating requirement for fire extinguishers used in areas where electrical equipment is present?",
    options: ["Class A only", "Class B only", "Class E only", "Class C (or UK equivalent rating for electrical fires)"],
    correctAnswer: "Class C (or UK equivalent rating for electrical fires)",
    explanation: "In the UK, fire extinguishers suitable for electrical fires must have an appropriate electrical fire rating. Traditionally, these would be referred to as Class E (though the UK system does not officially use this designation). CO2 or dry powder extinguishers with appropriate electrical fire capability should be used for electrical equipment fires."
  },
  {
    id: 'hvac-l2-health-safety19',
    question: "What is the main legal requirement regarding the use of ladders and stepladders under UK regulations?",
    options: ["They should only be used for access, never for work", "They can be used for low-risk, short-duration work only", "They must always be secured by a second person", "They must never be used on construction sites"],
    correctAnswer: "They can be used for low-risk, short-duration work only",
    explanation: "Under the Work at Height Regulations 2005, ladders and stepladders can be used for low-risk, short-duration work only. They are appropriate when a risk assessment determines that using equipment offering a higher level of fall protection is not justified because of the low risk and short duration of use, typically taken to mean 30 minutes or less."
  },
  {
    id: 'hvac-l2-health-safety20',
    question: "What is the purpose of a Permit to Work system in HVAC maintenance?",
    options: ["To record hours worked for payment purposes", "To formally check contractor qualifications", "To provide formal permission and control for hazardous work", "To assign specific parking spaces to workers"],
    correctAnswer: "To provide formal permission and control for hazardous work",
    explanation: "A Permit to Work system provides formal permission and control for hazardous work. It is a documented procedure that authorizes certain people to carry out specific work within a specified time frame, sets out the precautions required, and helps communication between everyone involved. It's commonly used for hot work, confined space entry, and electrical work in HVAC maintenance."
  },
  {
    id: 'hvac-l2-health-safety21',
    question: "What information should be included on a safety sign indicating the presence of a hazardous substance in an HVAC plant room?",
    options: ["Only written text describing the hazard", "Only a hazard symbol with no text", "A hazard symbol, signal word, and information about the nature of the hazard", "Only the manufacturer's contact details"],
    correctAnswer: "A hazard symbol, signal word, and information about the nature of the hazard",
    explanation: "According to the Health and Safety (Safety Signs and Signals) Regulations 1996, safety signs for hazardous substances should include a hazard symbol (pictogram), a signal word (such as 'Danger' or 'Warning'), and information about the nature of the hazard. This ensures clear communication about the hazard to anyone entering the area."
  },
  {
    id: 'hvac-l2-health-safety22',
    question: "What respiratory protective equipment (RPE) would be most appropriate when brazing refrigeration pipework?",
    options: ["No respiratory protection is needed", "A simple dust mask", "A properly fitted respirator with appropriate filters for metal fumes", "A full self-contained breathing apparatus"],
    correctAnswer: "A properly fitted respirator with appropriate filters for metal fumes",
    explanation: "When brazing refrigeration pipework, a properly fitted respirator with appropriate filters for metal fumes should be worn. Brazing creates metal fumes that can cause metal fume fever and other respiratory issues. The RPE should be selected based on a risk assessment, properly face-fit tested, and have filters suitable for the specific fumes generated."
  },
  {
    id: 'hvac-l2-health-safety23',
    question: "According to the Gas Safety (Installation and Use) Regulations, what is required of anyone working on gas appliances or fittings?",
    options: ["They must be over 21 years of age", "They must be registered with Gas Safe Register", "They need only general HVAC training", "They must work in pairs at all times"],
    correctAnswer: "They must be registered with Gas Safe Register",
    explanation: "The Gas Safety (Installation and Use) Regulations 1998 require that anyone working on gas appliances or fittings must be competent and registered with Gas Safe Register (formerly CORGI). This ensures they have the appropriate training, skills, and qualifications to work safely with gas, which is essential to prevent dangerous situations arising."
  },
  {
    id: 'hvac-l2-health-safety24',
    question: "What is the legal requirement for displaying the Health and Safety Law poster in UK workplaces?",
    options: ["It must be displayed in a location with public access", "It must be displayed, or the equivalent leaflet provided to each worker", "It only needs to be displayed in high-risk workplaces", "It must be displayed only if there are more than 5 employees"],
    correctAnswer: "It must be displayed, or the equivalent leaflet provided to each worker",
    explanation: "Under the Health and Safety Information for Employees Regulations (HSIER), employers must display the approved Health and Safety Law poster in a prominent position where workers can easily read it, or provide each worker with the equivalent leaflet. This ensures all employees have access to information about their health and safety rights and responsibilities."
  },
  {
    id: 'hvac-l2-health-safety25',
    question: "What precaution should be taken before carrying out hot work (such as brazing) near combustible materials in an HVAC installation?",
    options: ["Simply having a fire extinguisher nearby is sufficient", "Having another person watch for fires for 10 minutes after completion", "Obtaining a Hot Work Permit and implementing appropriate fire prevention measures", "Wetting the area before starting work"],
    correctAnswer: "Obtaining a Hot Work Permit and implementing appropriate fire prevention measures",
    explanation: "Before carrying out hot work near combustible materials, a Hot Work Permit should be obtained through a formal system, and appropriate fire prevention measures implemented. This includes clearing combustible materials where possible, shielding what cannot be moved, having appropriate fire extinguishers ready, and maintaining a fire watch during work and for a period after completion (typically 60 minutes)."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-health-safety', 'items', q.id), {
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
