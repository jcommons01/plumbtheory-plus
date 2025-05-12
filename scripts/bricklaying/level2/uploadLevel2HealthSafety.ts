// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2HealthSafety.ts

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

// ✅ Bricklaying Level 2 Health & Safety in Construction Questions
const questions = [
  {
    id: 'bricklaying-l2-health-safety1',
    question: "What is the main purpose of the Construction (Design and Management) Regulations 2015 (CDM 2015)?",
    options: ["To regulate working hours on construction sites", "To manage health, safety and welfare throughout all stages of a construction project", "To control wages in the construction industry", "To regulate the quality of building materials"],
    correctAnswer: "To manage health, safety and welfare throughout all stages of a construction project",
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM 2015) are the primary regulations for managing health, safety and welfare throughout all stages of a construction project. They apply to all building and construction work and place legal duties on virtually everyone involved in construction projects, from clients and designers to contractors and workers, ensuring health and safety is considered throughout the project lifecycle."
  },
  {
    id: 'bricklaying-l2-health-safety2',
    question: "Which of these is the correct definition of a 'near miss' on a construction site?",
    options: ["An incident that resulted in a minor injury", "An incident where someone nearly arrived late for work", "An unplanned event that did not result in injury or damage but had the potential to do so", "A close working relationship between trades"],
    correctAnswer: "An unplanned event that did not result in injury or damage but had the potential to do so",
    explanation: "A 'near miss' is an unplanned event that did not result in injury or damage but had the potential to do so. Near misses are important warning signs that something is wrong and needs to be addressed before a more serious incident occurs. Reporting near misses allows for investigation and implementation of preventative measures to avoid future accidents."
  },
  {
    id: 'bricklaying-l2-health-safety3',
    question: "What is the primary purpose of a risk assessment in bricklaying?",
    options: ["To calculate project costs", "To identify hazards and evaluate the level of risk they pose", "To determine how many workers are needed", "To estimate how long a job will take"],
    correctAnswer: "To identify hazards and evaluate the level of risk they pose",
    explanation: "The primary purpose of a risk assessment in bricklaying is to identify hazards and evaluate the level of risk they pose. This systematic process examines what could cause harm to people, allowing appropriate control measures to be implemented to eliminate or reduce risks. Risk assessments are a legal requirement under the Management of Health and Safety at Work Regulations and must be suitable and sufficient."
  },
  {
    id: 'bricklaying-l2-health-safety4',
    question: "What does PPE stand for in construction?",
    options: ["Personal Protection Equipment", "Permanent Protective Equipment", "Personal Protective Equipment", "Professional Protective Equipment"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE stands for Personal Protective Equipment. This refers to protective clothing, helmets, goggles, gloves, respiratory protective equipment, safety footwear, high-visibility clothing, and other equipment designed to protect the wearer from injury or infection. In bricklaying, common PPE includes hard hats, eye protection, gloves, dust masks, and safety footwear."
  },
  {
    id: 'bricklaying-l2-health-safety5',
    question: "Which of the following is a common hazard associated specifically with bricklaying work?",
    options: ["Electrical shocks from power tools", "Exposure to silica dust from cutting bricks and blocks", "Falls from roofs", "Injuries from operating cranes"],
    correctAnswer: "Exposure to silica dust from cutting bricks and blocks",
    explanation: "Exposure to silica dust is a significant hazard specifically associated with bricklaying work. Cutting, grinding, or drilling bricks, blocks, and mortar releases respirable crystalline silica, which can cause serious lung diseases including silicosis, COPD, and lung cancer. Control measures include using water suppression or dust extraction systems, suitable RPE (Respiratory Protective Equipment), and proper work practices to minimize dust creation."
  },
  {
    id: 'bricklaying-l2-health-safety6',
    question: "What is the purpose of a Method Statement in construction?",
    options: ["To list the materials needed for a job", "To document how a task will be carried out safely", "To record hours worked by employees", "To calculate the cost of a project"],
    correctAnswer: "To document how a task will be carried out safely",
    explanation: "A Method Statement documents how a task will be carried out safely. It is a step-by-step guide that outlines the hazards involved and the controls needed to ensure worker safety. Method Statements are particularly important for high-risk activities in bricklaying, such as working at height or demolition work, and complement risk assessments by providing specific procedural information."
  },
  {
    id: 'bricklaying-l2-health-safety7',
    question: "What is the recommended maximum weight that a male bricklayer should lift in ideal conditions?",
    options: ["10kg", "15kg", "20kg", "25kg"],
    correctAnswer: "25kg",
    explanation: "The recommended maximum weight that a male should lift in ideal conditions is 25kg. This guideline comes from the Manual Handling Operations Regulations. Ideal conditions mean the load is held close to the body at waist height with a good grip in a stable body position. However, in bricklaying, conditions are rarely ideal, and mechanical aids or team lifting should be used for heavier materials like blocks."
  },
  {
    id: 'bricklaying-l2-health-safety8',
    question: "What should you do if you discover damaged or defective equipment on a construction site?",
    options: ["Try to repair it yourself", "Continue to use it carefully", "Remove it from use, report it to your supervisor, and tag it as defective", "Ignore it if it still works"],
    correctAnswer: "Remove it from use, report it to your supervisor, and tag it as defective",
    explanation: "If you discover damaged or defective equipment, you should immediately remove it from use, report it to your supervisor, and tag it as defective. This prevents others from using potentially dangerous equipment and ensures it gets properly repaired or replaced. This approach is required under the Provision and Use of Work Equipment Regulations (PUWER) and is essential for maintaining site safety."
  },
  {
    id: 'bricklaying-l2-health-safety9',
    question: "Which of these is a sign of Hand-Arm Vibration Syndrome (HAVS), a condition bricklayers might develop from using power tools?",
    options: ["Increased hand strength", "Fingers turning white and numb when cold", "Improved dexterity", "Weight loss"],
    correctAnswer: "Fingers turning white and numb when cold",
    explanation: "Fingers turning white and numb when cold (also known as 'vibration white finger') is a sign of Hand-Arm Vibration Syndrome (HAVS). This condition can develop from regular use of vibrating power tools like disc cutters and breakers, which bricklayers may use to cut materials. HAVS can cause permanent damage including numbness, tingling, pain, and reduced grip strength. Control measures include limiting exposure time, using low-vibration tools, and proper maintenance of equipment."
  },
  {
    id: 'bricklaying-l2-health-safety10',
    question: "What is the main purpose of a toolbox talk in construction?",
    options: ["To demonstrate new tools", "To discuss work schedules", "To inform workers about specific health and safety issues", "To negotiate pay rates"],
    correctAnswer: "To inform workers about specific health and safety issues",
    explanation: "The main purpose of a toolbox talk is to inform workers about specific health and safety issues relevant to their work. These short, informal team discussions focus on particular safety aspects of a construction site or task and help maintain safety awareness among workers. For bricklayers, toolbox talks might cover topics like manual handling, working at height, dust control, or proper use of PPE."
  },
  {
    id: 'bricklaying-l2-health-safety11',
    question: "What should be your first action if you witness a serious accident on site?",
    options: ["Call the site manager", "Take photos for evidence", "Make the area safe and call for emergency help", "Fill out an accident report"],
    correctAnswer: "Make the area safe and call for emergency help",
    explanation: "Your first action if you witness a serious accident should be to make the area safe to prevent further injuries and immediately call for emergency help. This might involve removing any immediate dangers if safe to do so and alerting first aiders or emergency services. Only after the situation is under control should you report to site management and document what happened in an accident report."
  },
  {
    id: 'bricklaying-l2-health-safety12',
    question: "Under the Control of Substances Hazardous to Health (COSHH) Regulations, what should you do before using a chemical product on site?",
    options: ["Check its country of origin", "Read and understand the safety data sheet and relevant risk assessment", "Mix it with water to dilute it", "Check its price against alternatives"],
    correctAnswer: "Read and understand the safety data sheet and relevant risk assessment",
    explanation: "Before using any chemical product on site, you should read and understand both the safety data sheet (SDS) and the relevant COSHH risk assessment. These documents provide crucial information about hazards, precautions, emergency measures, and required control methods. For bricklayers, this is particularly important when handling cement and mortar additives, which can cause skin burns and respiratory issues if mishandled."
  },
  {
    id: 'bricklaying-l2-health-safety13',
    question: "What is the main purpose of an accident book on a construction site?",
    options: ["To record details of all accidents and incidents for legal and improvement purposes", "To identify workers who are accident-prone", "To calculate insurance premiums", "To track how many days have passed without accidents"],
    correctAnswer: "To record details of all accidents and incidents for legal and improvement purposes",
    explanation: "The main purpose of an accident book is to record details of all accidents and incidents for both legal compliance and safety improvement purposes. It provides a formal record required by law under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), helps identify patterns or trends in accidents, and provides evidence if compensation claims arise. All accidents, no matter how minor, should be recorded."
  },
  {
    id: 'bricklaying-l2-health-safety14',
    question: "What does HAVS stand for in construction health and safety?",
    options: ["Heavy Apparatus Verification System", "Hand-Arm Vibration Syndrome", "Hazardous Area Ventilation Standard", "Height And Velocity Standard"],
    correctAnswer: "Hand-Arm Vibration Syndrome",
    explanation: "HAVS stands for Hand-Arm Vibration Syndrome. This is a serious and permanent condition affecting nerves, blood vessels, muscles, and joints of the hand, wrist, and arm. It is caused by prolonged use of vibrating tools and equipment, which bricklayers might use for cutting materials. Employers must assess the risk and take measures to reduce exposure through tool selection, maintenance, work rotation, and health surveillance."
  },
  {
    id: 'bricklaying-l2-health-safety15',
    question: "When working in hot weather, which of these is NOT an appropriate measure to prevent heat stress?",
    options: ["Taking regular breaks in the shade", "Drinking caffeinated energy drinks instead of water", "Wearing light, loose-fitting clothing where safe", "Scheduling heavy work during cooler parts of the day"],
    correctAnswer: "Drinking caffeinated energy drinks instead of water",
    explanation: "Drinking caffeinated energy drinks instead of water is NOT an appropriate measure to prevent heat stress. Caffeine can actually contribute to dehydration. Bricklayers working in hot conditions should drink plenty of water (not waiting until they feel thirsty), take regular breaks in shaded areas, wear appropriate clothing that provides sun protection while allowing sweat evaporation, and reschedule strenuous tasks to cooler periods where possible."
  },
  {
    id: 'bricklaying-l2-health-safety16',
    question: "What type of fire extinguisher should be used on electrical fires?",
    options: ["Water extinguisher", "Foam extinguisher", "Carbon dioxide (CO2) extinguisher", "Wet chemical extinguisher"],
    correctAnswer: "Carbon dioxide (CO2) extinguisher",
    explanation: "Carbon dioxide (CO2) extinguishers should be used on electrical fires. They don't leave residue and are safe for use on electrical equipment. Water and foam extinguishers should never be used on electrical fires due to the risk of electric shock. On construction sites where electrical equipment is present, it's important to know the correct extinguisher type and location as part of site fire safety procedures."
  },
  {
    id: 'bricklaying-l2-health-safety17',
    question: "What is the purpose of a safety harness when working at height?",
    options: ["To make the worker more visible", "To carry tools", "To arrest the fall if the person slips or falls", "To protect against electric shocks"],
    correctAnswer: "To arrest the fall if the person slips or falls",
    explanation: "The purpose of a safety harness is to arrest the fall if a person slips or falls when working at height. It is part of a fall arrest system that connects the worker to a secure anchor point, limiting the distance and impact of a potential fall. While scaffolding is the primary safety measure for bricklayers working at height, harnesses may be required in certain situations where other fall protection methods are not practical."
  },
  {
    id: 'bricklaying-l2-health-safety18',
    question: "Under the RIDDOR regulations, if a worker suffers a broken arm due to an accident at work, how soon must this be reported to the HSE?",
    options: ["Within 24 hours", "Within 10 days", "Without delay", "Within 7 days"],
    correctAnswer: "Without delay",
    explanation: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR), a broken arm is classified as a 'specified injury' which must be reported to the Health and Safety Executive (HSE) without delay. The formal report must be submitted within 10 days of the incident. RIDDOR reporting is a legal obligation that helps authorities identify where and how risks arise so they can be investigated and prevented."
  },
  {
    id: 'bricklaying-l2-health-safety19',
    question: "What is the primary health risk associated with prolonged exposure to wet cement or mortar?",
    options: ["Respiratory infection", "Skin burns and dermatitis", "Kidney damage", "Eye infections"],
    correctAnswer: "Skin burns and dermatitis",
    explanation: "The primary health risk associated with prolonged exposure to wet cement or mortar is skin burns and dermatitis. Cement is highly alkaline (pH 12-13) and can cause both irritant contact dermatitis from its drying effect and alkaline burns from prolonged contact. It can also cause allergic contact dermatitis in sensitized individuals. Bricklayers should wear appropriate gloves, clean PPE, use barrier creams, and wash skin promptly if contact occurs."
  },
  {
    id: 'bricklaying-l2-health-safety20',
    question: "What is the main purpose of a permit-to-work system on a construction site?",
    options: ["To control access to the site", "To monitor working hours", "To formally control high-risk activities", "To authorize overtime payment"],
    correctAnswer: "To formally control high-risk activities",
    explanation: "The main purpose of a permit-to-work system is to formally control high-risk activities. It is a documented procedure that authorizes certain people to carry out specific work within a specified time frame. It details the work to be done and precautions required. For bricklayers, permits might be required when working in confined spaces, doing hot work near flammable materials, or working where there's potential for structural collapse."
  },
  {
    id: 'bricklaying-l2-health-safety21',
    question: "Which of these is NOT a legal responsibility of employees under the Health and Safety at Work Act?",
    options: ["Taking reasonable care of their own health and safety", "Taking reasonable care of others who may be affected by their acts or omissions", "Cooperating with employers on health and safety matters", "Purchasing their own personal protective equipment (PPE)"],
    correctAnswer: "Purchasing their own personal protective equipment (PPE)",
    explanation: "Purchasing their own personal protective equipment (PPE) is NOT a legal responsibility of employees. Under the Personal Protective Equipment at Work Regulations, employers must provide appropriate PPE free of charge when risks cannot be adequately controlled by other means. Employees do have legal duties to take reasonable care of themselves and others, cooperate with employers on safety matters, and correctly use equipment provided, including PPE."
  },
  {
    id: 'bricklaying-l2-health-safety22',
    question: "What should you check before using a ladder on a construction site?",
    options: ["Only that it reaches the required height", "That it is clean and looks nice", "That it is the right type for the job, in good condition, secured properly, and positioned at the correct angle", "That it belongs to your employer"],
    correctAnswer: "That it is the right type for the job, in good condition, secured properly, and positioned at the correct angle",
    explanation: "Before using a ladder, you should check that it is the right type for the job, in good condition with no defects, secured to prevent movement, and positioned at the correct angle (75 degrees or the 1:4 ratio - 1 unit out for every 4 units up). Ladders should only be used for light work of short duration where a more suitable access method isn't reasonably practicable. Regular pre-use checks are essential for preventing falls from height."
  },
  {
    id: 'bricklaying-l2-health-safety23',
    question: "What is the primary purpose of a site induction for new workers?",
    options: ["To introduce workers to their colleagues", "To explain payment procedures", "To inform workers about site-specific hazards, rules, and emergency procedures", "To test workers' construction knowledge"],
    correctAnswer: "To inform workers about site-specific hazards, rules, and emergency procedures",
    explanation: "The primary purpose of a site induction is to inform workers about site-specific hazards, rules, and emergency procedures. This mandatory briefing ensures all workers understand the particular risks of the site, know site rules and safety protocols, can recognize warning signs and signals, and know what to do in an emergency. No one should be allowed to work on site without first receiving an appropriate induction."
  },
  {
    id: 'bricklaying-l2-health-safety24',
    question: "Which of these is the correct action if you discover asbestos while working on a pre-2000 building?",
    options: ["Remove it carefully wearing a dust mask", "Seal it with paint to make it safe", "Stop work immediately, secure the area, and report it to your supervisor", "Continue working but try not to disturb it"],
    correctAnswer: "Stop work immediately, secure the area, and report it to your supervisor",
    explanation: "If you discover suspected asbestos, you should stop work immediately, secure the area to prevent access, and report it to your supervisor. Asbestos is extremely dangerous when disturbed, and only licensed contractors should handle it. It requires specialist survey, removal, and disposal procedures. Bricklayers working on pre-2000 buildings should be particularly vigilant as asbestos may be present in various building materials and may not have been identified in advance."
  },
  {
    id: 'bricklaying-l2-health-safety25',
    question: "What is the purpose of the Construction Phase Plan under CDM 2015 regulations?",
    options: ["To outline how the project will be paid for", "To schedule delivery of materials", "To detail how health and safety risks will be managed during the construction phase", "To assign workers to different tasks"],
    correctAnswer: "To detail how health and safety risks will be managed during the construction phase",
    explanation: "The Construction Phase Plan details how health and safety risks will be managed during the construction phase of a project. Required under the Construction (Design and Management) Regulations 2015 for all construction projects, it must be prepared by the principal contractor (or the contractor on single-contractor projects). The plan identifies major site risks and explains how they will be controlled, with arrangements for monitoring, cooperation between contractors, and site rules."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-health-safety', 'items', q.id), {
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
