// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Communication.ts

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

// ✅ Bricklaying Level 2 Communication & Documentation Questions
const questions = [
  {
    id: 'bricklaying-l2-communication1',
    question: "What is the primary purpose of construction drawings in bricklaying projects?",
    options: ["To satisfy insurance requirements", "To provide a record of completed work", "To communicate design intent and construction details", "To establish the market value of the building"],
    correctAnswer: "To communicate design intent and construction details",
    explanation: "The primary purpose of construction drawings is to communicate design intent and construction details. These drawings provide essential visual information that allows bricklayers to understand what needs to be built, including dimensions, materials, and specific construction techniques. They serve as the key reference documents that translate the designer's vision into physical reality and ensure all parties share the same understanding of the project requirements."
  },
  {
    id: 'bricklaying-l2-communication2',
    question: "What does the scale '1:50' on a construction drawing mean?",
    options: ["The drawing is 50 times larger than the actual building", "1 unit on the drawing represents 50 of the same units on the actual building", "The drawing shows 50% of the building details", "The drawing must be viewed from 50 meters away"],
    correctAnswer: "1 unit on the drawing represents 50 of the same units on the actual building",
    explanation: "A scale of '1:50' means that 1 unit on the drawing represents 50 of the same units on the actual building. For example, 1 centimeter on the drawing would represent 50 centimeters in real life. This scale is commonly used for general arrangement drawings showing floor plans or elevations. Understanding drawing scales is essential for bricklayers to correctly interpret dimensions and proportions when setting out and constructing masonry elements."
  },
  {
    id: 'bricklaying-l2-communication3',
    question: "What would you typically find on a site plan drawing?",
    options: ["Detailed brick bonding patterns", "The location of the building on the site, site boundaries, and access points", "Structural calculations for foundations", "Interior finishes and fixtures"],
    correctAnswer: "The location of the building on the site, site boundaries, and access points",
    explanation: "A site plan drawing typically shows the location of the building on the site, site boundaries, and access points. It also often includes information about site orientation, existing and proposed ground levels, drainage, landscaping, and relationships to neighboring properties or structures. For bricklayers, site plans provide context for the work and may indicate important factors like material storage areas, site access, and external works such as boundary walls or paved areas."
  },
  {
    id: 'bricklaying-l2-communication4',
    question: "Which type of drawing would most likely show the vertical layers of a wall construction including brick, insulation, and interior finishes?",
    options: ["Floor plan", "Elevation", "Section", "Site plan"],
    correctAnswer: "Section",
    explanation: "A section drawing would most likely show the vertical layers of a wall construction. Section drawings cut through the building vertically to reveal the internal composition of elements that would otherwise be hidden. For wall construction, this includes the various layers such as external brick, cavity, insulation, blockwork, and interior finishes. Sections are essential for bricklayers to understand the complete wall build-up, position of damp-proof courses, lintels, wall ties, and other critical components."
  },
  {
    id: 'bricklaying-l2-communication5',
    question: "What information does an elevation drawing primarily show?",
    options: ["The internal layout of rooms", "The external faces of the building as viewed from different sides", "The structural load calculations", "The plumbing and electrical systems"],
    correctAnswer: "The external faces of the building as viewed from different sides",
    explanation: "An elevation drawing primarily shows the external faces of the building as viewed from different sides (typically north, south, east, and west elevations). Elevations depict the appearance, proportions, and composition of facades, showing features such as windows, doors, external materials, and decorative elements. For bricklayers, elevations provide critical information about brick patterns, openings, decorative features, and the vertical relationships between different elements of the facade."
  },
  {
    id: 'bricklaying-l2-communication6',
    question: "What information would you typically find in a specification document for brickwork?",
    options: ["Only the color of bricks to be used", "Only the dimensions of the building", "Detailed descriptions of materials, quality standards, and construction methods", "Only the schedule for completing the work"],
    correctAnswer: "Detailed descriptions of materials, quality standards, and construction methods",
    explanation: "A specification document for brickwork typically contains detailed descriptions of materials, quality standards, and construction methods. This includes information about the type, size, and quality of bricks; mortar mix proportions and composition; construction techniques; bonding patterns; joint finishing; tolerances; and quality control requirements. Specifications complement drawings by providing information that cannot be easily conveyed graphically and establish the standards that the completed work must meet."
  },
  {
    id: 'bricklaying-l2-communication7',
    question: "What is the purpose of a 'Request for Information' (RFI) in construction communication?",
    options: ["To request additional payment for extra work", "To formally ask for clarification about design details or specifications", "To inform the client about work progress", "To request additional time to complete a project"],
    correctAnswer: "To formally ask for clarification about design details or specifications",
    explanation: "A Request for Information (RFI) is used to formally ask for clarification about design details or specifications. When bricklayers encounter unclear, conflicting, or missing information in the project documents, an RFI provides a structured method to seek the necessary information from architects, engineers, or project managers. This documented approach ensures that questions are properly addressed and that the responses become part of the project record, helping to prevent errors and disputes."
  },
  {
    id: 'bricklaying-l2-communication8',
    question: "What is the main purpose of maintaining a daily work record or site diary?",
    options: ["To record personal thoughts about the project", "To document site conditions, work completed, deliveries, and significant events each day", "To plan lunch breaks for the team", "To calculate wages for workers"],
    correctAnswer: "To document site conditions, work completed, deliveries, and significant events each day",
    explanation: "The main purpose of maintaining a daily work record or site diary is to document site conditions, work completed, deliveries, and significant events each day. This creates a contemporaneous record of what happened on site, including weather conditions, workforce numbers, visitors, instructions received, delays encountered, and progress achieved. This documentation can be valuable for planning, progress tracking, resolving disputes, supporting claims, and providing evidence if conflicts arise later."
  },
  {
    id: 'bricklaying-l2-communication9',
    question: "What information should be recorded when receiving a delivery of bricks on site?",
    options: ["Only the delivery driver's name", "Only the number of bricks delivered", "Type and quantity of bricks, supplier details, delivery date, batch numbers, and condition upon arrival", "Only the cost of the delivery"],
    correctAnswer: "Type and quantity of bricks, supplier details, delivery date, batch numbers, and condition upon arrival",
    explanation: "When receiving a brick delivery, you should record the type and quantity of bricks, supplier details, delivery date, batch numbers, and condition upon arrival. You should also check that the delivered materials match the order and specification requirements, noting any discrepancies, damage, or quality issues. This documentation is important for inventory management, quality control, and potential future reference if issues arise with the materials after installation."
  },
  {
    id: 'bricklaying-l2-communication10',
    question: "What is a 'schedule' in construction documentation?",
    options: ["Only a timeline for completing work", "A list of workers assigned to the project", "A document that presents information about repetitive elements in a tabular format", "A list of penalty charges for late completion"],
    correctAnswer: "A document that presents information about repetitive elements in a tabular format",
    explanation: "In construction documentation, a 'schedule' is a document that presents information about repetitive elements in a tabular format. For bricklaying, this might include a door schedule, window schedule, or brick types schedule. Schedules efficiently organize information about similar items that would be cumbersome to include on drawings or in specifications. They typically include reference numbers, locations, dimensions, types, and other relevant details for each instance of the element being scheduled."
  },
  {
    id: 'bricklaying-l2-communication11',
    question: "What does 'NTS' mean when noted on a construction drawing?",
    options: ["New Technical Standard", "Not To Scale", "Need To Survey", "Northern Technical Specification"],
    correctAnswer: "Not To Scale",
    explanation: "NTS stands for 'Not To Scale' when noted on a construction drawing. This indicates that the drawing or detail cannot be measured directly using a scale rule to determine actual dimensions. When a drawing is marked NTS, bricklayers must rely entirely on the written dimensions provided on the drawing rather than scaling from it. This notation is often used for schematic diagrams or when a drawing has been reduced or enlarged for printing purposes."
  },
  {
    id: 'bricklaying-l2-communication12',
    question: "What is meant by 'setting out' in bricklaying?",
    options: ["Arranging bricks neatly before beginning work", "The process of establishing the correct positions and lines for the brickwork", "Setting a completion date for the project", "Displaying sample bricks for client approval"],
    correctAnswer: "The process of establishing the correct positions and lines for the brickwork",
    explanation: "In bricklaying, 'setting out' refers to the process of establishing the correct positions and lines for the brickwork. This involves transferring dimensions from drawings to the actual site, establishing level and plumb references, determining the layout of walls, openings, and feature elements, and marking these positions accurately. Proper setting out is critical to ensure the brickwork is positioned correctly and that dimensions, alignments, and levels match the design requirements."
  },
  {
    id: 'bricklaying-l2-communication13',
    question: "What should you do if you find a discrepancy between two different construction drawings?",
    options: ["Ignore the issue and continue working based on your best guess", "Make your own decision about which drawing to follow", "Stop work immediately and wait for clarification", "Submit a formal Request for Information (RFI) to seek clarification"],
    correctAnswer: "Submit a formal Request for Information (RFI) to seek clarification",
    explanation: "If you find a discrepancy between construction drawings, you should submit a formal Request for Information (RFI) to seek clarification. Continuing to work based on assumptions could result in costly errors and rework. The RFI process ensures the discrepancy is brought to the attention of the design team for resolution, provides an official response that becomes part of the project documentation, and protects all parties by creating a record of the issue and its resolution."
  },
  {
    id: 'bricklaying-l2-communication14',
    question: "Why is it important to understand and use standard construction terminology when communicating on site?",
    options: ["To sound more professional", "To be able to use technical jargon to confuse clients", "To ensure clear, precise communication and avoid misunderstandings", "To comply with legal requirements for construction language"],
    correctAnswer: "To ensure clear, precise communication and avoid misunderstandings",
    explanation: "Understanding and using standard construction terminology is important to ensure clear, precise communication and avoid misunderstandings. Construction has a specific technical vocabulary where terms have exact meanings. Using these terms correctly ensures that all parties interpret information the same way, reducing errors and confusion. For bricklayers, accurate communication about materials, techniques, and requirements is essential for quality workmanship and safe, efficient collaboration with other trades."
  },
  {
    id: 'bricklaying-l2-communication15',
    question: "What is a 'variation order' in construction projects?",
    options: ["A change in the color variation of bricks", "A formal document instructing a change to the original scope, design, or specification", "An order to vary the number of workers on site", "A delivery order for various materials"],
    correctAnswer: "A formal document instructing a change to the original scope, design, or specification",
    explanation: "A 'variation order' is a formal document instructing a change to the original scope, design, or specification of a construction project. Variations may involve additional or reduced work, changes to materials or methods, or alterations to the design. Proper documentation of variations is important for contract administration, cost control, and preventing disputes. Bricklayers should ensure they receive proper variation orders before undertaking work that differs from the original specifications."
  },
  {
    id: 'bricklaying-l2-communication16',
    question: "What information should be included when taking measurements on site?",
    options: ["Only the person who took the measurements", "Only the main dimensions", "Dimensions, date, location, what was measured, who took the measurements, and reference points used", "Only a rough sketch of what was measured"],
    correctAnswer: "Dimensions, date, location, what was measured, who took the measurements, and reference points used",
    explanation: "When taking measurements on site, you should record dimensions, date, location, what was measured, who took the measurements, and reference points used. This comprehensive documentation ensures measurements can be verified later if needed and provides context for interpreting the information. Accurate and well-documented measurements are essential for bricklayers when setting out work, ordering materials, resolving discrepancies, or verifying compliance with specifications and tolerances."
  },
  {
    id: 'bricklaying-l2-communication17',
    question: "What type of drawing would typically show the brick bonding pattern to be used?",
    options: ["Foundation plan", "Site plan", "Elevation drawing or brick detailing drawing", "Electrical layout plan"],
    correctAnswer: "Elevation drawing or brick detailing drawing",
    explanation: "Elevation drawings or specific brick detailing drawings would typically show the brick bonding pattern to be used. Elevations show the external faces of walls where the bonding pattern is visible, while dedicated brick detailing drawings may provide more specific information about special bonding arrangements, decorative features, or complex brickwork elements. These drawings are essential references for bricklayers to understand the required appearance and construction technique for the visible masonry work."
  },
  {
    id: 'bricklaying-l2-communication18',
    question: "What does 'TBC' commonly mean when noted on construction documentation?",
    options: ["Total Brick Count", "To Be Constructed", "To Be Confirmed", "Timber Brick Combination"],
    correctAnswer: "To Be Confirmed",
    explanation: "TBC commonly means 'To Be Confirmed' when noted on construction documentation. This indicates that the information is provisional or pending final decision. For bricklayers, elements marked TBC require clarification before proceeding with work. It's important to submit queries about TBC items well in advance of needing the information, as resolving these uncertainties may involve design decisions or coordination with other aspects of the project that require time to finalize."
  },
  {
    id: 'bricklaying-l2-communication19',
    question: "What is the purpose of 'snagging' in construction projects?",
    options: ["Removing site waste at the end of a project", "Identifying and listing minor defects or unfinished elements that need to be addressed", "Securing materials to prevent theft", "Testing the strength of brickwork joints"],
    correctAnswer: "Identifying and listing minor defects or unfinished elements that need to be addressed",
    explanation: "Snagging involves identifying and listing minor defects or unfinished elements that need to be addressed before a project is considered complete. This process typically occurs toward the end of construction when the main work is finished. For bricklayers, snagging might identify issues like mortar smears, inconsistent joint finishing, chipped bricks, or incomplete pointing. Creating a comprehensive snagging list helps ensure all defects are systematically addressed to achieve the required quality standard."
  },
  {
    id: 'bricklaying-l2-communication20',
    question: "What is the primary purpose of 'toolbox talks' on a construction site?",
    options: ["To distribute new tools to workers", "To discuss how tools should be stored", "To deliver short, focused safety or work practice information to workers", "To schedule maintenance for power tools"],
    correctAnswer: "To deliver short, focused safety or work practice information to workers",
    explanation: "The primary purpose of toolbox talks is to deliver short, focused safety or work practice information to workers. These informal briefings typically last 5-15 minutes and address specific topics relevant to the current work, site conditions, or recent incidents. For bricklayers, toolbox talks might cover topics such as safe manual handling, working at height, silica dust control, or proper scaffolding use. Regular toolbox talks help maintain safety awareness and reinforce good practices."
  },
  {
    id: 'bricklaying-l2-communication21',
    question: "When communicating with clients about brickwork, why is it important to avoid excessive technical jargon?",
    options: ["Because technical terms are always incorrect", "To hide information from the client", "To ensure the client understands the information and can make informed decisions", "Because clients are never interested in technical details"],
    correctAnswer: "To ensure the client understands the information and can make informed decisions",
    explanation: "When communicating with clients, it's important to avoid excessive technical jargon to ensure they understand the information and can make informed decisions. While construction professionals communicate efficiently using technical terminology, clients may not share this specialized vocabulary. Using plain language, visual aids, and careful explanations of necessary technical terms helps bridge this knowledge gap, ensuring clients comprehend important information about their project and can participate meaningfully in decisions."
  },
  {
    id: 'bricklaying-l2-communication22',
    question: "What information should be included in a handover document for completed brickwork?",
    options: ["Only the final cost", "Only photographs of the work", "Information on materials used, construction methods, maintenance requirements, warranties, and any special considerations", "Only the names of the bricklayers who did the work"],
    correctAnswer: "Information on materials used, construction methods, maintenance requirements, warranties, and any special considerations",
    explanation: "Handover documents for completed brickwork should include information on materials used, construction methods, maintenance requirements, warranties, and any special considerations. This comprehensive information package ensures the client or building owner understands how to properly maintain the brickwork, what guarantees apply, and any specific care instructions. Well-prepared handover documentation demonstrates professionalism, supports long-term performance of the brickwork, and provides a valuable reference for future maintenance or modifications."
  },
  {
    id: 'bricklaying-l2-communication23',
    question: "What is the purpose of a 'pre-start meeting' for a bricklaying project?",
    options: ["To negotiate wages for the bricklayers", "To meet socially before work begins", "To discuss and agree on project requirements, methods, standards, and logistics before work begins", "To interview potential workers"],
    correctAnswer: "To discuss and agree on project requirements, methods, standards, and logistics before work begins",
    explanation: "A pre-start meeting for a bricklaying project brings together key stakeholders to discuss and agree on project requirements, methods, standards, and logistics before work begins. This meeting aligns everyone's understanding of the specification, quality expectations, program, and practical arrangements. Discussion topics typically include material approvals, setting out, sample panels, access arrangements, storage areas, coordination with other trades, and reporting procedures, establishing clear expectations before work commences."
  },
  {
    id: 'bricklaying-l2-communication24',
    question: "What is meant by the term 'as-built drawings' in construction documentation?",
    options: ["The original design drawings", "Drawings that show how the building was actually constructed, including any variations from the design drawings", "Drawings used during the building process", "Artistic impressions of the building"],
    correctAnswer: "Drawings that show how the building was actually constructed, including any variations from the design drawings",
    explanation: "As-built drawings show how the building was actually constructed, including any variations from the design drawings. They reflect the final reality of the construction rather than the initial design intent. These documents record the exact locations, dimensions, and specifications of completed elements, including any approved changes made during construction. As-built drawings provide valuable reference information for future maintenance, renovations, or problem-solving, ensuring those working on the building later have accurate information about its construction."
  },
  {
    id: 'bricklaying-l2-communication25',
    question: "Why is it important to promptly report any issues or concerns about brickwork specifications or drawings?",
    options: ["To assign blame to the designers", "To delay the project", "To prevent errors, delays, and costly rework by resolving issues early", "To create extra paperwork"],
    correctAnswer: "To prevent errors, delays, and costly rework by resolving issues early",
    explanation: "It's important to promptly report issues or concerns about brickwork specifications or drawings to prevent errors, delays, and costly rework by resolving issues early. Identifying and addressing problems during the planning phase or early in construction is far more efficient than discovering them after work has been completed incorrectly. Prompt reporting demonstrates professionalism and proactive problem-solving, contributing to better project outcomes, maintaining schedules, and preserving working relationships with other project stakeholders."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-communication', 'items', q.id), {
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
