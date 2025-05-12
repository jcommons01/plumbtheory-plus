// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Scaffolding.ts

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

// ✅ Bricklaying Level 2 Scaffolding Safety & Access Equipment Questions
const questions = [
  {
    id: 'bricklaying-l2-scaffolding1',
    question: "Who is legally permitted to erect, alter or dismantle scaffolding on a construction site?",
    options: ["Any construction worker with basic training", "Only qualified and competent scaffolders", "Any bricklayer who will be using the scaffold", "Site managers only"],
    correctAnswer: "Only qualified and competent scaffolders",
    explanation: "Only qualified and competent scaffolders are legally permitted to erect, alter, or dismantle scaffolding on a construction site. In the UK, this typically means individuals holding a CISRS (Construction Industry Scaffolders Record Scheme) card appropriate to the complexity of the scaffold being constructed. The Work at Height Regulations 2005 require that all work at height is properly planned, supervised, and carried out by competent persons. Improper scaffold construction can lead to catastrophic failures, so the specialized knowledge and skills of trained scaffolders are essential for safety. Bricklayers and other trades must never attempt to modify scaffolding themselves."
  },
  {
    id: 'bricklaying-l2-scaffolding2',
    question: "What daily checks should a bricklayer make before using scaffolding?",
    options: ["None - only scaffolders need to check scaffolding", "Only check if the scaffold looks visibly damaged", "Visual inspection for completeness, including guardrails, toe boards, safe access, and inspection tags", "Only check the scaffold once per week"],
    correctAnswer: "Visual inspection for completeness, including guardrails, toe boards, safe access, and inspection tags",
    explanation: "Before using scaffolding, a bricklayer should conduct a visual inspection for completeness, including guardrails, toe boards, safe access, and inspection tags. This pre-use check should verify that all platforms are fully boarded, all guardrails and toe boards are in place, access ladders are secure, the scaffold appears level and plumb, and that nothing obvious is wrong. They should also check that the scaffold has a current inspection tag (typically within the last 7 days, or after adverse weather). While formal inspections are done by competent persons, all users have a responsibility to check for obvious defects before use and report any concerns immediately."
  },
  {
    id: 'bricklaying-l2-scaffolding3',
    question: "What is the primary purpose of a toe board on scaffolding?",
    options: ["To support the weight of workers' feet", "To prevent tools and materials from falling off the edge", "To provide a stepping platform for accessing higher levels", "To indicate where workers should stand"],
    correctAnswer: "To prevent tools and materials from falling off the edge",
    explanation: "The primary purpose of a toe board on scaffolding is to prevent tools and materials from falling off the edge and potentially striking someone below. Toe boards create a physical barrier at floor level around the edges of working platforms, containing debris, tools, and small materials that might otherwise be accidentally kicked or swept off. Under the Work at Height Regulations, toe boards must be at least 150mm high from the platform surface and securely fixed. Along with guardrails, toe boards are essential components of edge protection on scaffolding, helping to maintain a safe working environment both for those on the scaffold and those working below."
  },
  {
    id: 'bricklaying-l2-scaffolding4',
    question: "What do the initials 'SWL' stand for in relation to scaffolding?",
    options: ["Scaffold Width Limit", "Safe Work Location", "Safe Working Load", "Standard Weight Limit"],
    correctAnswer: "Safe Working Load",
    explanation: "SWL stands for Safe Working Load in relation to scaffolding. This is the maximum load that can be safely applied to a scaffold structure or component during normal use. SWL ratings apply to various scaffold elements including platforms, boards, beams, and the entire scaffold system. These limits must never be exceeded as overloading is a major cause of scaffold failures. Different scaffolding is designed for different loading requirements (e.g., general purpose scaffold vs. heavy-duty scaffold for masonry work with heavy materials). Bricklayers must be aware of the SWL of their scaffold and manage material quantities accordingly to avoid dangerous overloading."
  },
  {
    id: 'bricklaying-l2-scaffolding5',
    question: "How frequently must scaffolding be inspected under the Work at Height Regulations?",
    options: ["Only when it's first erected", "Every 3 months", "Before first use, after any alteration, after any event likely to affect stability, and at least every 7 days", "Only when a safety concern is raised"],
    correctAnswer: "Before first use, after any alteration, after any event likely to affect stability, and at least every 7 days",
    explanation: "Under the Work at Height Regulations, scaffolding must be inspected before first use, after any alteration, after any event likely to affect its stability (such as high winds or vehicle impact), and at least every 7 days while in place. These inspections must be carried out by a competent person with the appropriate knowledge, experience, and training for the type and complexity of scaffold. The results must be recorded and retained until the next inspection. Current inspection tags should be displayed on the scaffold, and any defects identified must be rectified before continued use. These regular inspections are critical for ensuring the ongoing safety and integrity of the scaffold structure."
  },
  {
    id: 'bricklaying-l2-scaffolding6',
    question: "What is the minimum width for a scaffold platform used for bricklaying work?",
    options: ["450mm", "600mm", "813mm", "1000mm"],
    correctAnswer: "813mm",
    explanation: "The minimum width for a scaffold platform used for bricklaying work is 813mm (2 feet 8 inches or 5 boards). This width accommodates a bricklayer's working area plus materials like brick stacks and mortar spots. Bricklaying requires a wider platform than some other trades due to the need to store and work with substantial materials close at hand. The platform must be wide enough to provide safe passage alongside stored materials. If exceptionally large quantities of materials need to be stored, an additional materials bay or platform may be required. Having sufficient width is essential for both bricklayer safety and efficient working."
  },
  {
    id: 'bricklaying-l2-scaffolding7',
    question: "What is the purpose of a gin wheel on scaffolding?",
    options: ["To brace the scaffold against the building", "To secure scaffold boards in place", "To hoist materials up to working platforms", "To provide access between different levels"],
    correctAnswer: "To hoist materials up to working platforms",
    explanation: "A gin wheel on scaffolding is used to hoist materials up to working platforms. This simple mechanical device consists of a pulley wheel mounted on a frame that attaches to the scaffold, allowing workers to manually raise materials using a rope. Gin wheels improve efficiency and safety by reducing the need to carry heavy materials up ladders or stairs. They must be properly secured to a sound part of the scaffold structure, used within their SWL (Safe Working Load), and operated with clear communication between those at the top and bottom. Modern sites often use more sophisticated hoisting equipment, but gin wheels remain common for smaller loads and sites without power access."
  },
  {
    id: 'bricklaying-l2-scaffolding8',
    question: "What is the purpose of scaffold ties in a scaffolding system?",
    options: ["To tie the scaffold boards together", "To tie different scaffold structures to each other", "To secure the scaffold to the building to prevent collapse", "To tie materials down in windy conditions"],
    correctAnswer: "To secure the scaffold to the building to prevent collapse",
    explanation: "The purpose of scaffold ties is to secure the scaffold to the building to prevent collapse. These ties provide lateral stability by connecting the scaffold to the solid structure of the building at regular intervals, preventing the scaffold from leaning, racking, or toppling. Ties are particularly crucial for taller scaffolds where wind forces can create significant loading. They must be installed according to a specified pattern (typically determined by height and bay length) and must not be removed or altered except by qualified scaffolders. Different tie types may be used depending on the building structure, including through-ties, box ties, and reveal ties."
  },
  {
    id: 'bricklaying-l2-scaffolding9',
    question: "What is the main purpose of a 'hop-up' platform in bricklaying?",
    options: ["For scaffolders to hop between platforms", "A temporary platform to provide extra height for working on upper courses of brickwork", "A platform for storing materials", "A barrier to prevent falls"],
    correctAnswer: "A temporary platform to provide extra height for working on upper courses of brickwork",
    explanation: "A 'hop-up' platform in bricklaying is a temporary platform used to provide extra height for working on upper courses of brickwork. This adjustable-height working platform sits on the main scaffold platform, allowing bricklayers to maintain an optimal working height (typically waist to chest level) as the wall grows taller. Working at the correct height reduces strain and fatigue from bending or stretching, improving both comfort and productivity. Hop-ups must be stable, correctly positioned, and used on a sound platform base. They typically feature adjustable legs and a strong working surface designed to bear both the worker's weight and some materials."
  },
  {
    id: 'bricklaying-l2-scaffolding10',
    question: "What is the maximum height you can work from a ladder according to best practice?",
    options: ["There is no maximum height", "As high as the ladder will reach", "No more than 9 meters", "For short duration, light work only, maintaining three points of contact"],
    correctAnswer: "For short duration, light work only, maintaining three points of contact",
    explanation: "According to best practice, ladders should only be used for short duration, light work while maintaining three points of contact (typically two feet and one hand). Rather than specifying a maximum height, regulations and guidance focus on the suitability of ladders for the specific task. The Work at Height Regulations require that ladders should only be used when a risk assessment has demonstrated that using equipment providing more protection is not justified because of the low risk and short duration of use, or because of existing site features that cannot be altered. For bricklaying, which involves extended periods of work with heavy materials, proper scaffolding is typically required rather than ladders."
  },
  {
    id: 'bricklaying-l2-scaffolding11',
    question: "What color tag typically indicates that a scaffold is incomplete or not ready for use?",
    options: ["Green", "Yellow", "Red", "Blue"],
    correctAnswer: "Red",
    explanation: "A red tag typically indicates that a scaffold is incomplete or not ready for use. Under the commonly used scaffold tagging system, red means 'Do Not Use' – the scaffold is either in the process of being erected, altered, dismantled, or has been identified as defective in some way. Green tags generally indicate the scaffold is complete and safe to use, while yellow tags may indicate caution and specific restrictions (such as light duty only). These color-coded tags provide an immediate visual indicator of scaffold status. All workers should be aware of this system and should never use a scaffold displaying a red tag, as doing so could result in serious injury or death."
  },
  {
    id: 'bricklaying-l2-scaffolding12',
    question: "What is the correct height for guardrails on scaffolding according to regulations?",
    options: ["At least 450mm above the platform", "At least 950mm above the platform", "Exactly 1200mm above the platform", "Between 100mm and 300mm above the platform"],
    correctAnswer: "At least 950mm above the platform",
    explanation: "According to regulations (specifically the Work at Height Regulations 2005), guardrails on scaffolding must be at least 950mm above the platform level. Additionally, there should be no unprotected gap exceeding 470mm, which typically requires an intermediate guardrail positioned roughly halfway between the main guardrail and the platform. The guardrails must be strong enough to prevent workers from falling and must be on all sides of the platform where there is a risk of falling. These specific height requirements are designed to provide protection for workers of different heights while allowing reasonable access to the work area."
  },
  {
    id: 'bricklaying-l2-scaffolding13',
    question: "What does PASMA certification relate to?",
    options: ["Ladder safety", "Scaffolding inspection", "Mobile tower scaffold assembly and use", "Personal fall arrest systems"],
    correctAnswer: "Mobile tower scaffold assembly and use",
    explanation: "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) certification relates to mobile tower scaffold assembly and use. This nationally recognized qualification demonstrates that an individual has been trained in the safe assembly, disassembly, movement, and use of mobile access towers. Unlike traditional fixed scaffolding, which must be erected by qualified scaffolders, mobile tower scaffolds can be assembled by PASMA-certified workers from any trade. The certification covers different types of towers, inspection procedures, stability requirements, and safe working practices. For bricklayers who occasionally need to use mobile access towers, this certification provides the necessary knowledge to do so safely and legally."
  },
  {
    id: 'bricklaying-l2-scaffolding14',
    question: "What is the '3T' method in relation to scaffold safety?",
    options: ["Time, Tools, Training - the three essentials of scaffold work", "Test, Tag, Track - the process for scaffold inspection", "Through, Tie, Tension - methods for securing scaffolds", "Trap, Train, Transfer - a risk assessment approach for scaffold hazards"],
    correctAnswer: "Through, Tie, Tension - methods for securing scaffolds",
    explanation: "The '3T' method in relation to scaffold safety stands for 'Through, Tie, Tension' - methods for securing scaffolds to buildings. These are the three main types of scaffold ties: Through ties pass through the building (e.g., through window openings); Box ties wrap around suitable structural elements; and Reveal ties use friction pressure against opposing surfaces (typically in window or door reveals). The appropriate selection and correct installation of ties is critical for scaffold stability, preventing movement or collapse under load or wind pressure. Ties must be installed in the pattern specified by the scaffold design, which is determined based on the height, coverage, and loading of the scaffold structure."
  },
  {
    id: 'bricklaying-l2-scaffolding15',
    question: "What is the correct angle for a ladder used to access scaffolding?",
    options: ["45 degrees from the horizontal", "60 degrees from the horizontal", "75 degrees from the horizontal (1 out for every 4 up)", "90 degrees (completely vertical)"],
    correctAnswer: "75 degrees from the horizontal (1 out for every 4 up)",
    explanation: "The correct angle for a ladder used to access scaffolding is 75 degrees from the horizontal, which equates to a ratio of 1 unit out from the base of the structure for every 4 units up (often remembered as the '1 in 4 rule'). This angle provides the optimal balance between stability and ease of climbing. A ladder set too flat may slip outward at the base, while one set too steep can tip backward or be difficult to climb. A simple way to check the angle is the 'elbow test': when standing with toes against the ladder feet and arms extended horizontally, your palms should touch the ladder. Access ladders must also extend at least 1 meter (5 rungs) above the landing place to provide a secure handhold."
  },
  {
    id: 'bricklaying-l2-scaffolding16',
    question: "Who is responsible for completing scaffold inspection reports?",
    options: ["Any worker who uses the scaffold", "Only the site manager", "A competent person with appropriate knowledge and experience", "Only the health and safety officer"],
    correctAnswer: "A competent person with appropriate knowledge and experience",
    explanation: "Scaffold inspection reports must be completed by a competent person with appropriate knowledge and experience. Under the Work at Height Regulations 2005, a 'competent person' for scaffold inspection means someone with the necessary skills, knowledge, and experience to identify existing and predictable hazards, and who has authorization to take prompt corrective measures. For basic scaffolds, this might be someone with appropriate training and experience, while for complex scaffolds, it might require a qualified scaffolder. The inspector must understand scaffold components, recognize defects, and know the legal requirements. Their completed inspection reports must be maintained on site until the next inspection occurs."
  },
  {
    id: 'bricklaying-l2-scaffolding17',
    question: "What is a 'loading bay' on a scaffold?",
    options: ["The area where scaffold materials are delivered", "A reinforced platform section designed for storing materials", "The board that displays the maximum load information", "The gap between scaffold boards"],
    correctAnswer: "A reinforced platform section designed for storing materials",
    explanation: "A 'loading bay' on a scaffold is a reinforced platform section specifically designed for storing materials. These dedicated areas are strengthened to handle heavier loads than standard working platforms and typically feature additional supports, including double standards (vertical posts), additional bracing, and sometimes special bearers or beams. Loading bays often include a gate system and may have a hoisting mechanism like a gin wheel or mechanical lift attached. They allow for efficient material delivery and storage at height without overloading standard working platforms. Loading bays must be clearly identified and marked with their maximum Safe Working Load (SWL) to prevent dangerous overloading."
  },
  {
    id: 'bricklaying-l2-scaffolding18',
    question: "Under the Work at Height Regulations, what should be considered first in the hierarchy of fall prevention measures?",
    options: ["Providing personal fall protection equipment", "Installing guard rails around work areas", "Avoiding work at height where possible", "Using a mobile elevating work platform"],
    correctAnswer: "Avoiding work at height where possible",
    explanation: "Under the Work at Height Regulations, the hierarchy of fall prevention measures places 'avoiding work at height where possible' as the first consideration. This hierarchy requires employers to first consider if the work can be done safely from ground level, perhaps by using extendable tools or bringing the work down to ground level. If work at height cannot be avoided, collective protection measures (like guardrails) should be used before personal protection measures (like harnesses). This hierarchical approach focuses on eliminating the risk first, then controlling it with physical barriers, with personal protective equipment being the last resort when other methods cannot fully control the risk."
  },
  {
    id: 'bricklaying-l2-scaffolding19',
    question: "What is the purpose of 'sole plates' (sometimes called 'sole boards') in scaffolding?",
    options: ["To create a walking surface on the scaffold platform", "To distribute the load from standards over a larger ground area", "To secure the scaffold to the building", "To provide a flat surface for leveling the work area"],
    correctAnswer: "To distribute the load from standards over a larger ground area",
    explanation: "The purpose of 'sole plates' or 'sole boards' in scaffolding is to distribute the load from standards (vertical posts) over a larger ground area. These timber or metal plates are placed under the base plates of the standards to prevent them from sinking into soft or uneven ground. By spreading the concentrated loads from the scaffold over a wider area, sole plates enhance stability and prevent uneven settlement that could cause the scaffold to tilt or become unstable. Sole plates are particularly important on soft, wet, or uncompacted ground, and their size should be appropriate to the ground conditions and the loads being imposed by the scaffold and its intended use."
  },
  {
    id: 'bricklaying-l2-scaffolding20',
    question: "What is the purpose of brick guards on scaffolding?",
    options: ["To protect bricks from rain damage", "To prevent bricks from falling through gaps between the scaffold and the building", "To count the number of bricks used", "To separate different types of bricks"],
    correctAnswer: "To prevent bricks from falling through gaps between the scaffold and the building",
    explanation: "Brick guards on scaffolding are used to prevent bricks and other materials from falling through gaps between the scaffold and the building. These mesh or solid panels are installed along the inner edge of scaffold platforms, covering the gap that exists between the platform and the wall under construction. This gap is necessary for construction work but creates a hazard where tools or materials could fall through. Brick guards are particularly important for bricklaying work, where numerous small items like cut bricks, mortar, and tools are handled near the edge. By containing these items, brick guards protect workers and the public below from falling object hazards."
  },
  {
    id: 'bricklaying-l2-scaffolding21',
    question: "What is a 'putlog' scaffold?",
    options: ["A scaffold made entirely of timber", "A scaffold where the inner ends of the transoms (putlogs) are supported by the wall being constructed", "A scaffold designed specifically for plastering work", "A scaffold that can be quickly dismantled and moved"],
    correctAnswer: "A scaffold where the inner ends of the transoms (putlogs) are supported by the wall being constructed",
    explanation: "A 'putlog' scaffold is a type where the inner ends of the transoms (putlogs) are supported by the wall being constructed, rather than by an inner row of standards (vertical posts). The putlogs are specially shaped to fit into the wall joints, with the outer ends supported by ledgers attached to the outer row of standards. This traditional scaffold type is less common in modern construction due to safety concerns and the advent of independent scaffolding. Putlog scaffolds cannot be erected until the wall is built to a sufficient height, and they generally cannot support as heavy a load as independent scaffolds. They are primarily of historical interest now, with independent scaffolding being the preferred choice for most bricklaying work."
  },
  {
    id: 'bricklaying-l2-scaffolding22',
    question: "What does TG20 refer to in scaffolding?",
    options: ["A type of guardrail fixing", "A model of mobile scaffold tower", "Technical Guidance for safe scaffold construction and use", "A weight limit for scaffold platforms"],
    correctAnswer: "Technical Guidance for safe scaffold construction and use",
    explanation: "TG20 refers to Technical Guidance for safe scaffold construction and use, specifically the 'NASC TG20 Good Practice Guidance for Tube and Fitting Scaffolding.' Published by the National Access and Scaffolding Confederation (NASC), this comprehensive guidance document has become the industry standard for scaffolding in the UK. TG20 provides practical guidance on how to comply with the Work at Height Regulations and European standards for scaffolding. It includes guidance on design, loads, ties, foundations, and typical configurations. The current version (TG20:21) includes both the printed guidance and software that allows users to produce compliant scaffold designs for standard configurations without the need for bespoke engineering calculations."
  },
  {
    id: 'bricklaying-l2-scaffolding23',
    question: "In scaffold terminology, what is a 'transom'?",
    options: ["The vertical support members of a scaffold", "The horizontal tubes that connect standards across the width of a scaffold", "The diagonal bracing elements", "The boards that form the working platform"],
    correctAnswer: "The horizontal tubes that connect standards across the width of a scaffold",
    explanation: "In scaffold terminology, a 'transom' refers to the horizontal tubes that connect standards (vertical posts) across the width of a scaffold. These transverse members run perpendicular to the face of the building and support the scaffold boards that form the working platform. Transoms transfer the load from the platform to the standards and help maintain the correct spacing between the inner and outer row of standards. They are key structural elements of the scaffold and must be correctly sized and positioned to support the anticipated loads. In some scaffold systems, specially designed transom units may incorporate boarding supports or have integrated features for securing boards."
  },
  {
    id: 'bricklaying-l2-scaffolding24',
    question: "What is meant by the term 'exclusion zone' in relation to scaffolding?",
    options: ["An area where only certain types of scaffolding are permitted", "A restricted area around a scaffold where unauthorized access is prohibited", "A zone where smoking is not allowed while on scaffolding", "A part of the scaffold that must not be used for storage"],
    correctAnswer: "A restricted area around a scaffold where unauthorized access is prohibited",
    explanation: "An 'exclusion zone' in relation to scaffolding is a restricted area around a scaffold where unauthorized access is prohibited. These zones are established for safety reasons, typically during scaffold erection, alteration, or dismantling when there is an increased risk of falling materials, or around incomplete scaffolds that are not safe for use. Exclusion zones should be clearly marked using barriers, tape, and warning signs to prevent both workers and the public from entering areas of danger. The size of the zone depends on the height of the scaffold and the potential fall radius of materials. Proper implementation of exclusion zones is essential for protecting people from the hazards associated with scaffold work."
  },
  {
    id: 'bricklaying-l2-scaffolding25',
    question: "What is a 'gin wheel' and what safety precautions should be taken when using one?",
    options: ["A wheel used to move scaffolding; ensure it's locked when not in use", "A pulley system for lifting materials; ensure it's properly secured and the SWL is not exceeded", "A device for measuring scaffold level; ensure it's calibrated regularly", "A wheel used to adjust scaffold height; ensure it's turned by a qualified person only"],
    correctAnswer: "A pulley system for lifting materials; ensure it's properly secured and the SWL is not exceeded",
    explanation: "A gin wheel is a pulley system for lifting materials up scaffolding. Essential safety precautions when using one include: ensuring it's properly secured to a sound part of the scaffold structure; confirming the Safe Working Load (SWL) is clearly marked and never exceeded; establishing a clear exclusion zone below the lifting operation; using only undamaged rope of appropriate strength; ensuring effective communication between top and bottom operators (often using a recognized system of hand signals); properly securing the load before lifting; and never leaving suspended loads unattended. Additionally, the equipment should be inspected before use, and operators should wear appropriate PPE including head protection and gloves."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-scaffolding', 'items', q.id), {
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
