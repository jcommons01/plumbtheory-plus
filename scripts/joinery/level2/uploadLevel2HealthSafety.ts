// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2HealthSafety.ts

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

// ✅ Joinery Level 2 Health & Safety in Construction Questions
const questions = [
  {
    id: 'joinery-l2-health-safety1',
    question: "According to the Health and Safety at Work Act, who is primarily responsible for ensuring health and safety on a construction site?",
    options: ["Only the site manager", "Only the health and safety officer", "Only individual workers", "Employers and employees, with the employer having the main responsibility"],
    correctAnswer: "Employers and employees, with the employer having the main responsibility",
    explanation: "Under the Health and Safety at Work Act 1974, both employers and employees have responsibilities for workplace safety, but employers have the primary duty to ensure health and safety. Employers must provide a safe working environment, safe equipment, proper training, and adequate supervision. Employees must cooperate with employers on safety matters, correctly use equipment provided, and not endanger themselves or others. This shared responsibility approach is fundamental to UK health and safety legislation in construction."
  },
  {
    id: 'joinery-l2-health-safety2',
    question: "What is the purpose of a risk assessment in joinery work?",
    options: ["To calculate insurance premiums", "To identify hazards and determine appropriate control measures", "To assign blame after an accident occurs", "To determine how fast work can be completed"],
    correctAnswer: "To identify hazards and determine appropriate control measures",
    explanation: "The purpose of a risk assessment in joinery work is to identify potential hazards and determine appropriate control measures to minimize risks. This systematic process involves identifying what could cause harm (hazards), evaluating the likelihood and severity of harm occurring (risk), and implementing reasonable control measures. For joiners, this might include assessing risks from power tools, dust exposure, manual handling, and working at height. Risk assessments must be documented when there are five or more employees and should be regularly reviewed."
  },
  {
    id: 'joinery-l2-health-safety3',
    question: "What does PPE stand for in construction health and safety?",
    options: ["Personal Protection Equipment", "Powered Processing Equipment", "Personal Protective Equipment", "Preventative Project Evaluation"],
    correctAnswer: "Personal Protective Equipment",
    explanation: "PPE stands for Personal Protective Equipment. In joinery, this typically includes safety footwear, gloves, eye protection, hearing protection, respiratory protection (dust masks or respirators), and sometimes hard hats. PPE should be used as a last resort in the hierarchy of control measures, after elimination, substitution, engineering controls, and administrative controls have been considered. Under the Personal Protective Equipment at Work Regulations, employers must provide suitable PPE free of charge where risks cannot be adequately controlled by other means."
  },
  {
    id: 'joinery-l2-health-safety4',
    question: "What colour is a prohibition safety sign (e.g., 'No Entry') according to UK regulations?",
    options: ["Green circle with white symbol", "Blue circle with white symbol", "Yellow triangle with black border and symbol", "Red circle with diagonal line and black symbol on white background"],
    correctAnswer: "Red circle with diagonal line and black symbol on white background",
    explanation: "According to the Health and Safety (Safety Signs and Signals) Regulations 1996, prohibition signs in the UK have a red circular band with a diagonal line descending from left to right across the symbol, on a white background. The symbol itself is black. These signs indicate activities or actions that are not permitted, such as 'No Smoking', 'No Access', or 'Do Not Use'. This standardized format helps ensure that safety signs are immediately recognizable regardless of language barriers."
  },
  {
    id: 'joinery-l2-health-safety5',
    question: "Which of these is a critical control measure for managing wood dust exposure?",
    options: ["Using louder machinery to drown out noise concerns", "Using local exhaust ventilation (dust extraction)", "Working faster to reduce exposure time", "Using water on electrical tools"],
    correctAnswer: "Using local exhaust ventilation (dust extraction)",
    explanation: "Using local exhaust ventilation (dust extraction) is a critical control measure for managing wood dust exposure in joinery work. Wood dust is a known carcinogen and can cause serious respiratory problems including asthma. The Control of Substances Hazardous to Health (COSHH) Regulations require employers to prevent or control exposure to hazardous substances. For wood dust, local exhaust ventilation (LEV) systems capture dust at source before it can be inhaled. LEV systems must be properly designed, regularly tested (at least every 14 months), and maintained to remain effective."
  },
  {
    id: 'joinery-l2-health-safety6',
    question: "What is the recommended maximum weight for a male to lift at waist height according to HSE manual handling guidelines?",
    options: ["5kg", "10kg", "20kg", "25kg"],
    correctAnswer: "20kg",
    explanation: "According to the Health and Safety Executive (HSE) manual handling guidelines, the recommended maximum weight for a male to lift at waist height is 20kg. This guideline forms part of the Manual Handling Operations Regulations, which aim to reduce the risk of injury from moving and handling loads. The actual safe weight varies depending on circumstances such as how high/low the load is being moved from/to, how far it is carried, how often lifts are performed, and individual capacity. Proper training in lifting techniques is essential for all joinery workers who perform manual handling tasks."
  },
  {
    id: 'joinery-l2-health-safety7',
    question: "What document must be consulted before using a hazardous substance such as a wood treatment chemical?",
    options: ["Building regulations", "COSHH safety data sheet", "Tool manufacturer's warranty", "Invoice for the materials"],
    correctAnswer: "COSHH safety data sheet",
    explanation: "Before using a hazardous substance such as a wood treatment chemical, a COSHH (Control of Substances Hazardous to Health) safety data sheet must be consulted. This document provides essential information about the hazards of a substance, appropriate handling procedures, storage requirements, emergency measures in case of accidents, and disposal considerations. Under COSHH Regulations, employers must assess and control the risks from hazardous substances. Safety data sheets, provided by manufacturers, are a key source of information for these assessments and for training workers in safe use of substances."
  },
  {
    id: 'joinery-l2-health-safety8',
    question: "What does RIDDOR stand for?",
    options: ["Risk Identification and Danger Detection on Request", "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regulation of Internal Development and Directional Operational Requirements", "Regional Inspection of Directives and Daily Operational Reviews"],
    correctAnswer: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. These regulations require employers, the self-employed, and those in control of premises to report specified workplace incidents. This includes certain types of work-related accidents, occupational diseases, and dangerous occurrences. In joinery, reportable incidents might include serious injuries from machinery, diagnosed cases of occupational asthma from wood dust exposure, or dangerous occurrences such as the collapse of lifting equipment. Reports must be made to the HSE within specified timeframes."
  },
  {
    id: 'joinery-l2-health-safety9',
    question: "What is the primary purpose of a Method Statement in joinery work?",
    options: ["To calculate project costs", "To detail how a task will be carried out safely", "To record employee working hours", "To advertise services to potential clients"],
    correctAnswer: "To detail how a task will be carried out safely",
    explanation: "The primary purpose of a Method Statement in joinery work is to detail how a task will be carried out safely. It is a document that outlines the step-by-step process for completing a specific task, identifying the hazards involved and control measures required. Method Statements are typically used for high-risk activities and complement risk assessments. They provide clear instructions for workers, helping to ensure consistent safe working practices. While not explicitly required by law, Method Statements are often required by clients and principal contractors as evidence of safe systems of work."
  },
  {
    id: 'joinery-l2-health-safety10',
    question: "Which of these is a common cause of fires in joinery workshops?",
    options: ["Excessive ventilation", "Wood dust accumulation near electrical equipment", "Using hand tools", "Storing timber in vertical racks"],
    correctAnswer: "Wood dust accumulation near electrical equipment",
    explanation: "Wood dust accumulation near electrical equipment is a common cause of fires in joinery workshops. Wood dust is highly combustible and can be ignited by heat, sparks, or electrical faults from machinery. Under the Regulatory Reform (Fire Safety) Order, workshop managers must conduct fire risk assessments and implement appropriate control measures. These include regular cleaning to prevent dust build-up, proper maintenance of electrical equipment, appropriate waste disposal, suitable fire detection systems, clear escape routes, and staff training in fire prevention and emergency procedures."
  },
  {
    id: 'joinery-l2-health-safety11',
    question: "What is the minimum first aid provision required for a small joinery workshop with 10 employees?",
    options: ["A trained doctor on site", "A fully equipped medical room", "An appointed person and a basic first aid kit", "No provision is legally required"],
    correctAnswer: "An appointed person and a basic first aid kit",
    explanation: "For a small joinery workshop with 10 employees, the minimum first aid provision required under the Health and Safety (First Aid) Regulations is an appointed person and a basic first aid kit. An appointed person is responsible for maintaining first aid equipment and calling emergency services when required. However, given the higher risk nature of joinery work involving sharp tools and machinery, it is recommended to have at least one trained first aider on site. Employers must assess their specific first aid needs based on workplace hazards, workforce size, distribution, and access to emergency services."
  },
  {
    id: 'joinery-l2-health-safety12',
    question: "What document outlines the main health and safety requirements for a construction project with multiple contractors?",
    options: ["Building regulations approval", "Planning permission", "Construction Phase Plan", "Architect's specification"],
    correctAnswer: "Construction Phase Plan",
    explanation: "The Construction Phase Plan outlines the main health and safety requirements for a construction project with multiple contractors. Under the Construction (Design and Management) Regulations 2015 (CDM 2015), this document is required for all construction projects involving more than one contractor. It sets out the health and safety arrangements and site rules, taking account of any design risk assessments. For projects with a principal contractor, they will develop the plan, while on smaller projects with multiple contractors, the contractors must agree who will prepare it."
  },
  {
    id: 'joinery-l2-health-safety13',
    question: "What is the main hazard associated with using a circular saw in joinery work?",
    options: ["Electrocution from water contact", "Contact with the moving blade", "Excessive noise only", "Overheating of the motor"],
    correctAnswer: "Contact with the moving blade",
    explanation: "The main hazard associated with using a circular saw in joinery work is contact with the moving blade, which can cause severe cuts, amputations, or entanglement. To control this risk, circular saws should have appropriate guarding, including a riving knife and crown guard. Push sticks should be used for cutting smaller pieces, and operators must be properly trained and supervised. Other hazards include kickback (when the wood is thrown back toward the operator), exposure to wood dust, noise, and vibration, each requiring specific control measures in accordance with the Provision and Use of Work Equipment Regulations (PUWER)."
  },
  {
    id: 'joinery-l2-health-safety14',
    question: "Which of the following is NOT a typical requirement when working at height as a joiner?",
    options: ["Using appropriate access equipment such as ladders or platforms", "Ensuring adequate edge protection where there is a risk of falling", "Conducting a risk assessment before starting work", "Working alone without supervision whenever possible"],
    correctAnswer: "Working alone without supervision whenever possible",
    explanation: "Working alone without supervision whenever possible is NOT a typical requirement when working at height as a joiner - in fact, it's often explicitly discouraged for high-risk activities. The Work at Height Regulations 2005 require employers to ensure that work at height is properly planned, supervised, and carried out by competent people. This includes avoiding work at height where possible, using appropriate equipment to prevent falls, minimizing the distance and consequences of potential falls, and providing adequate training. Lone working at height should be avoided where the risk assessment indicates significant hazards."
  },
  {
    id: 'joinery-l2-health-safety15',
    question: "What should you do if you discover damaged electrical equipment in a joinery workshop?",
    options: ["Try to fix it yourself immediately", "Continue using it but with extra caution", "Remove it from use, label it as defective, and report it to your supervisor", "Ignore it as long as it still functions"],
    correctAnswer: "Remove it from use, label it as defective, and report it to your supervisor",
    explanation: "If you discover damaged electrical equipment in a joinery workshop, you should remove it from use, label it as defective, and report it to your supervisor. The Electricity at Work Regulations 1989 require that electrical equipment is maintained in a safe condition. Damaged equipment poses risks of electric shock, burns, or fire, particularly in a workshop environment with conductive dust. A competent person should inspect equipment before it's returned to service. Regular inspection and testing of electrical equipment (PAT testing) should be part of the workshop's health and safety procedures."
  },
  {
    id: 'joinery-l2-health-safety16',
    question: "Which type of dust mask is appropriate for protection against wood dust during machine sanding?",
    options: ["FFP1 disposable mask", "FFP3 disposable mask", "A simple cloth face covering", "Any dust mask is sufficient"],
    correctAnswer: "FFP3 disposable mask",
    explanation: "An FFP3 disposable mask is appropriate for protection against wood dust during machine sanding. Wood dust is classified as a carcinogen and can cause serious respiratory conditions including asthma and nasal cancer. FFP3 masks filter at least 99% of airborne particles and provide the highest level of protection among disposable masks. They must be correctly fitted (fit-tested) to be effective. Under COSHH Regulations, respiratory protective equipment should be used alongside engineering controls like dust extraction, not as the sole control measure. Some hardwoods and MDF require particularly careful control due to their higher health risks."
  },
  {
    id: 'joinery-l2-health-safety17',
    question: "What is the purpose of a CSCS (Construction Skills Certification Scheme) card in the UK construction industry?",
    options: ["To provide vehicle parking permissions on construction sites", "To prove identity when collecting materials from suppliers", "To prove the holder has the training and qualifications required for their job", "To track working hours on construction projects"],
    correctAnswer: "To prove the holder has the training and qualifications required for their job",
    explanation: "The purpose of a CSCS (Construction Skills Certification Scheme) card is to prove that the holder has the training and qualifications required for their job in the construction industry. For joiners, this typically requires a relevant NVQ or equivalent qualification plus passing the CITB Health, Safety and Environment Test. The card helps employers meet their obligations to ensure a competent workforce and is often required for access to commercial construction sites. Different card colors indicate different levels of qualification, from trainee to skilled worker to supervisor or manager."
  },
  {
    id: 'joinery-l2-health-safety18',
    question: "What is the most appropriate action when a job requires working in an awkward position that might cause back strain?",
    options: ["Complete the job quickly to minimize exposure time", "Ignore any discomfort as it's part of the job", "Take regular breaks and rotate tasks", "Use painkillers before starting work"],
    correctAnswer: "Take regular breaks and rotate tasks",
    explanation: "When a job requires working in an awkward position that might cause back strain, the most appropriate action is to take regular breaks and rotate tasks. This is part of the ergonomic approach required under the Manual Handling Operations Regulations. Other control measures should include redesigning the task where possible, using mechanical aids, ensuring proper training in manual handling techniques, and potentially sharing the task among workers. Persistent work in awkward positions can lead to musculoskeletal disorders, which are among the most common occupational health issues for joiners."
  },
  {
    id: 'joinery-l2-health-safety19',
    question: "Under UK regulations, what is the maximum sound level above which hearing protection must be worn?",
    options: ["70 decibels", "75 decibels", "80 decibels", "85 decibels"],
    correctAnswer: "85 decibels",
    explanation: "Under the Control of Noise at Work Regulations 2005, hearing protection must be worn when exposure reaches or exceeds the upper exposure action value of 85 decibels (daily or weekly average exposure). At this level, employers must provide hearing protection and ensure it is used correctly. At the lower exposure action value of 80 decibels, employers must make hearing protection available upon request. Many joinery operations, including using circular saws, routers, and planers, typically exceed these levels, making hearing protection essential. Regular noise assessments should be conducted in joinery workshops."
  },
  {
    id: 'joinery-l2-health-safety20',
    question: "What information should be included on a safety sign indicating the presence of a trip hazard?",
    options: ["Only written text explaining the hazard", "Only the company logo", "A warning symbol (black exclamation mark in a yellow triangle) plus text if necessary", "Just a verbal warning is sufficient"],
    correctAnswer: "A warning symbol (black exclamation mark in a yellow triangle) plus text if necessary",
    explanation: "A safety sign indicating a trip hazard should include a warning symbol - specifically a black exclamation mark in a yellow triangle with a black border - plus text if necessary. According to the Health and Safety (Safety Signs and Signals) Regulations 1996, warning signs must have this triangular format. Adding text such as 'Mind the step' or 'Trip hazard' can provide additional clarity, but the symbol ensures the warning is understood regardless of language. Trip hazards should ideally be eliminated or controlled by other means, with warning signs being an additional rather than primary control measure."
  },
  {
    id: 'joinery-l2-health-safety21',
    question: "When installing a fire door, what is the primary safety consideration?",
    options: ["The appearance of the door", "The cost of materials", "Ensuring it meets fire resistance specifications and is properly fitted", "Making sure it matches other doors in the building"],
    correctAnswer: "Ensuring it meets fire resistance specifications and is properly fitted",
    explanation: "When installing a fire door, the primary safety consideration is ensuring it meets fire resistance specifications and is properly fitted. Fire doors must be installed according to manufacturer's instructions and appropriate standards (BS 8214 and Approved Document B of Building Regulations). This includes using the correct fire-resistant components (door, frame, intumescent strips, self-closing device, and appropriate hardware), maintaining the correct gaps around the door (typically 2-4mm), and ensuring proper certification. A properly installed fire door will contain fire and smoke for its rated time period, protecting escape routes and saving lives."
  },
  {
    id: 'joinery-l2-health-safety22',
    question: "What should a joiner do before operating an unfamiliar power tool on a construction site?",
    options: ["Test it briefly without supervision", "Ask a colleague to demonstrate while watching from a distance", "Receive proper training and read the manufacturer's instructions", "Make adjustments to suit personal preferences"],
    correctAnswer: "Receive proper training and read the manufacturer's instructions",
    explanation: "Before operating an unfamiliar power tool on a construction site, a joiner should receive proper training and read the manufacturer's instructions. The Provision and Use of Work Equipment Regulations (PUWER) require that all workers who use work equipment have adequate health and safety information and, where appropriate, written instructions and training for the equipment they use. This includes understanding how to use the tool safely, what PPE is required, how to check for defects, what the safety features are, and appropriate operating procedures. Competence with tools is a fundamental requirement for safe joinery work."
  },
  {
    id: 'joinery-l2-health-safety23',
    question: "What type of accident is most likely to occur when using a chisel incorrectly?",
    options: ["Respiratory disease", "Electric shock", "Eye injury from flying dust", "Cut to the hand or body"],
    correctAnswer: "Cut to the hand or body",
    explanation: "When using a chisel incorrectly, the most likely accident is a cut to the hand or body. Common unsafe practices include chiseling towards the body, holding the workpiece in the hand rather than securing it in a vice, using a blunt chisel that requires excessive force, or using a chisel without a properly fitted handle. To prevent such injuries, joiners should always cut away from the body, secure workpieces properly, keep chisels sharp, use appropriate PPE including cut-resistant gloves where suitable, and ensure they are properly trained in safe hand tool use as required by the Provision and Use of Work Equipment Regulations."
  },
  {
    id: 'joinery-l2-health-safety24',
    question: "What is meant by the term 'competent person' in health and safety regulations?",
    options: ["Someone who has worked in the industry for at least 10 years", "Someone who has the necessary skills, knowledge, experience, and training to perform a task safely", "Someone who is physically strong enough to perform manual tasks", "Only a formally qualified health and safety professional"],
    correctAnswer: "Someone who has the necessary skills, knowledge, experience, and training to perform a task safely",
    explanation: "A 'competent person' in health and safety regulations refers to someone who has the necessary skills, knowledge, experience, and training to perform a task safely. This definition appears in various regulations including the Management of Health and Safety at Work Regulations. For joiners, competence might relate to safely operating specific machinery, working at height, or carrying out specific installation procedures. Competence isn't just about formal qualifications - it combines practical experience, understanding of risks and limitations, appropriate training, and familiarity with current best practices and regulations relevant to the task."
  },
  {
    id: 'joinery-l2-health-safety25',
    question: "In terms of the 'hierarchy of control' for managing health and safety risks, which of these is the most preferable control measure?",
    options: ["Providing personal protective equipment", "Administrative controls such as job rotation", "Engineering controls such as dust extraction", "Eliminating the hazard entirely"],
    correctAnswer: "Eliminating the hazard entirely",
    explanation: "In the hierarchy of control for managing health and safety risks, eliminating the hazard entirely is the most preferable control measure. The hierarchy, from most to least effective, is: 1) Elimination (remove the hazard), 2) Substitution (replace with something less hazardous), 3) Engineering controls (isolate people from the hazard), 4) Administrative controls (change working procedures), and 5) Personal protective equipment (last resort). For joiners, examples of elimination might include designing out the need for work at height, or using pre-finished materials to eliminate on-site wood dust generation. This approach is fundamental to effective risk management as required by the Management of Health and Safety at Work Regulations."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-health-safety', 'items', q.id), {
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
