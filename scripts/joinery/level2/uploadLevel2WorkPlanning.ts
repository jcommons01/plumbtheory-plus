// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2WorkPlanning.ts

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

// ✅ Joinery Level 2 Work Planning & Preparation Questions
const questions = [
  {
    id: 'joinery-l2-work-planning1',
    question: "What is the primary purpose of creating a cutting list for a joinery project?",
    options: ["To record the exact dimensions of each component and optimize material usage", "To estimate how long the project will take to complete", "To calculate the project cost only", "To determine how many people will be needed for the job"],
    correctAnswer: "To record the exact dimensions of each component and optimize material usage",
    explanation: "Cutting lists record component dimensions, quantities and specifications for efficient material ordering and production."
  },
  {
    id: 'joinery-l2-work-planning2',
    question: "When setting out a staircase, which of the following regulations must be adhered to?",
    options: ["The staircase must always be made of hardwood", "The rise and going measurements must comply with Building Regulations", "The staircase must always include a half landing", "The width must always be at least 1.2 meters"],
    correctAnswer: "The rise and going measurements must comply with Building Regulations",
    explanation: "Building Regulations specify requirements for rise, going, width and other dimensional aspects of staircases."
  },
  {
    id: 'joinery-l2-work-planning3',
    question: "Which of the following factors would NOT typically be considered when estimating the time required for a joinery installation?",
    options: ["Complexity of the work", "Required drying time for adhesives and finishes", "The brand of tools being used", "Access restrictions at the site"],
    correctAnswer: "The brand of tools being used",
    explanation: "Tool brand doesn't significantly impact installation time; professionals use appropriate tools regardless of manufacturer."
  },
  {
    id: 'joinery-l2-work-planning4',
    question: "What is the purpose of a pre-installation site survey for joinery work?",
    options: ["Only to determine what tools will be needed", "Only to meet health and safety requirements", "Only to introduce yourself to the client", "To identify potential issues, verify dimensions, and assess site conditions before manufacturing"],
    correctAnswer: "To identify potential issues, verify dimensions, and assess site conditions before manufacturing",
    explanation: "Site surveys gather crucial information about dimensions, conditions and potential issues before manufacturing begins."
  },
  {
    id: 'joinery-l2-work-planning5',
    question: "What information does a risk assessment provide when planning joinery work?",
    options: ["Identification of hazards, who might be harmed, and control measures needed", "Only the personal protective equipment required", "Only the cost implications of potential accidents", "Only the insurance requirements for the job"],
    correctAnswer: "Identification of hazards, who might be harmed, and control measures needed",
    explanation: "Risk assessments systematically identify hazards, evaluate risks, and establish appropriate control measures."
  },
  {
    id: 'joinery-l2-work-planning6',
    question: "When preparing a material order for a project, which of the following should be included as a contingency for waste and errors?",
    options: ["No additional material is ever needed", "5-10% extra material for solid timber, more for natural materials with defects", "Exactly double the calculated amount", "At least 50% more than calculated"],
    correctAnswer: "5-10% extra material for solid timber, more for natural materials with defects",
    explanation: "Standard practice includes 5-10% extra for solid timber and more for materials with higher defect rates."
  },
  {
    id: 'joinery-l2-work-planning7',
    question: "Which of the following is the correct sequence for manufacturing a traditional frame and panel door?",
    options: ["Machine the panels, assemble the frame, sand and finish", "Prepare and machine all components, dry-assemble to check fit, disassemble and finish, final assembly", "Assemble the complete door, machine rebates, cut panels to fit", "Machine the frame components, assemble with glue, make panels later to fit openings"],
    correctAnswer: "Prepare and machine all components, dry-assemble to check fit, disassemble and finish, final assembly",
    explanation: "This sequence ensures proper fitting, allows access for finishing, and accommodates natural panel movement."
  },
  {
    id: 'joinery-l2-work-planning8',
    question: "What is the purpose of creating a work schedule for a joinery project?",
    options: ["Only to satisfy legal requirements", "Only to determine how much to charge the client", "To allocate resources efficiently, establish a logical sequence of operations, and set timelines", "Only to decide which employees will work on the project"],
    correctAnswer: "To allocate resources efficiently, establish a logical sequence of operations, and set timelines",
    explanation: "Work schedules organize project tasks, resource allocation and timelines for efficient project management."
  },
  {
    id: 'joinery-l2-work-planning9',
    question: "When planning the sequence of machining operations for solid timber components, which operation should typically be performed first?",
    options: ["Sanding", "Drilling holes for fixings", "Cutting to final length", "Planing one face and one edge to create reference surfaces"],
    correctAnswer: "Planing one face and one edge to create reference surfaces",
    explanation: "Creating flat reference surfaces (face side and edge) establishes bases for all subsequent machining operations."
  },
  {
    id: 'joinery-l2-work-planning10',
    question: "What would be the most appropriate order of work when fitting a new timber door lining and door?",
    options: ["Install the lining, check it's plumb and square, then hang the door", "Fit hinges to both door and lining before installation", "Install the lining and door as a single pre-assembled unit", "Hang the door first, then fit the lining around it"],
    correctAnswer: "Install the lining, check it's plumb and square, then hang the door",
    explanation: "Installing the frame first ensures proper alignment before fitting the door to it."
  },
  {
    id: 'joinery-l2-work-planning11',
    question: "When planning timber material requirements for a project, why is it important to consider the moisture content of the timber?",
    options: ["It affects dimensional stability, machining properties, and finishing results", "It only affects the weight for transport purposes", "It only affects the price of the timber", "It only affects the colour of the finished product"],
    correctAnswer: "It affects dimensional stability, machining properties, and finishing results",
    explanation: "Moisture content affects wood stability, machining quality and finish adhesion throughout the project lifecycle."
  },
  {
    id: 'joinery-l2-work-planning12',
    question: "What is the purpose of creating a 'setting out rod' in traditional joinery?",
    options: ["It's a rod used to mix different finishing products", "It's a full-size drawing used to determine exact dimensions and joint positions", "It's a measuring tool used to check timber straightness", "It's only used to mark the position of door hinges"],
    correctAnswer: "It's a full-size drawing used to determine exact dimensions and joint positions",
    explanation: "Setting out rods provide full-scale templates for precise component dimensions and joint layouts."
  },
  {
    id: 'joinery-l2-work-planning13',
    question: "When setting out for a fitted kitchen installation, what would be the most important first step?",
    options: ["Establishing a level datum line around the room", "Fitting the worktop", "Installing the wall cabinets", "Ordering the appliances"],
    correctAnswer: "Establishing a level datum line around the room",
    explanation: "A level datum line provides a true horizontal reference for accurate component positioning."
  },
  {
    id: 'joinery-l2-work-planning14',
    question: "What information would you need to determine the quantity of skirting board required for a room?",
    options: ["Only the number of corners in the room", "Only the ceiling height", "Only the floor area of the room", "The perimeter of the room, accounting for doorways and other openings"],
    correctAnswer: "The perimeter of the room, accounting for doorways and other openings",
    explanation: "Skirting quantity requires wall length measurements minus openings, plus allowance for corners and waste."
  },
  {
    id: 'joinery-l2-work-planning15',
    question: "Which of the following best describes the role of a method statement in planning joinery installation work?",
    options: ["It only outlines the cost of each step", "It describes the specific sequence of work, techniques to be used, and safety measures", "It only lists the tools required", "It only details which employees will work on each task"],
    correctAnswer: "It describes the specific sequence of work, techniques to be used, and safety measures",
    explanation: "Method statements detail step-by-step procedures, techniques and safety controls for installation work."
  },
  {
    id: 'joinery-l2-work-planning16',
    question: "When planning the construction of a traditional timber staircase, which component should be manufactured first?",
    options: ["The treads and risers", "The balusters", "The strings", "The newel posts"],
    correctAnswer: "The strings",
    explanation: "Strings establish the staircase geometry and provide mounting positions for treads and risers."
  },
  {
    id: 'joinery-l2-work-planning17',
    question: "Which of the following should be considered when planning the workspace layout for a joinery project?",
    options: ["Only the size of the largest component", "Only the number of people working on the project", "Material flow, machine sequence, assembly space, and access requirements", "Only the availability of power sources"],
    correctAnswer: "Material flow, machine sequence, assembly space, and access requirements",
    explanation: "Effective workspace planning considers workflow, equipment arrangement, material handling and assembly requirements."
  },
  {
    id: 'joinery-l2-work-planning18',
    question: "What is the primary purpose of creating a 'cutting plan' for sheet materials?",
    options: ["To optimize material usage and minimize waste", "To determine which type of saw to use", "To decide the order in which parts should be assembled", "To calculate how many sheets to purchase"],
    correctAnswer: "To optimize material usage and minimize waste",
    explanation: "Cutting plans strategically arrange components on sheets to maximize yield and minimize waste."
  },
  {
    id: 'joinery-l2-work-planning19',
    question: "When planning a site installation, what is the purpose of a 'pre-start meeting'?",
    options: ["Only to meet the client socially", "To discuss and coordinate schedule, access, site requirements, and interfaces with other trades", "Only to check if payment has been made", "Only to deliver materials to site"],
    correctAnswer: "To discuss and coordinate schedule, access, site requirements, and interfaces with other trades",
    explanation: "Pre-start meetings coordinate logistics, schedules, requirements and trade interfaces before work begins."
  },
  {
    id: 'joinery-l2-work-planning20',
    question: "What is the most important consideration when scheduling the delivery of joinery materials to a construction site?",
    options: ["Ensuring materials are delivered on the cheapest day for transport", "Coordinating delivery timing with installation sequence and available storage space", "Always delivering all materials at once regardless of installation schedule", "Ensuring delivery occurs during normal working hours only"],
    correctAnswer: "Coordinating delivery timing with installation sequence and available storage space",
    explanation: "Strategic delivery scheduling aligns material availability with work progression and site storage capacity."
  },
  {
    id: 'joinery-l2-work-planning21',
    question: "What specific information should be included in a risk assessment for using a circular saw on site?",
    options: ["Only the name of the person using the saw", "Only the cost of the machine", "Only the brand of the saw", "Hazards, control measures, PPE requirements, and emergency procedures"],
    correctAnswer: "Hazards, control measures, PPE requirements, and emergency procedures",
    explanation: "Comprehensive risk assessments identify specific hazards, control measures, PPE requirements and emergency protocols."
  },
  {
    id: 'joinery-l2-work-planning22',
    question: "When planning a project timeline, which of the following would most likely represent a 'critical path' activity in joinery work?",
    options: ["Taking site measurements before components can be manufactured", "Ordering standard fixings that are readily available", "Selecting which employee will make tea during breaks", "Deciding on the tool storage arrangement"],
    correctAnswer: "Taking site measurements before components can be manufactured",
    explanation: "Critical path activities directly affect completion dates - manufacturing cannot begin without accurate measurements."
  },
  {
    id: 'joinery-l2-work-planning23',
    question: "What is the purpose of a 'snagging list' in joinery installation projects?",
    options: ["To record which employees worked on each task", "To identify and document minor defects or incomplete items needing resolution before project completion", "To list all the nails and screws required", "To list all the tools needed for the job"],
    correctAnswer: "To identify and document minor defects or incomplete items needing resolution before project completion",
    explanation: "Snagging lists document minor defects and finishing touches needed before final project completion."
  },
  {
    id: 'joinery-l2-work-planning24',
    question: "What is the primary reason for creating a detailed specification for bespoke joinery items?",
    options: ["Only to determine what tools will be needed", "Only to comply with health and safety regulations", "To clearly communicate all material, construction, and finish requirements to ensure the client's expectations are met", "Only to calculate the weight for transport"],
    correctAnswer: "To clearly communicate all material, construction, and finish requirements to ensure the client's expectations are met",
    explanation: "Detailed specifications comprehensively document all requirements to ensure clear understanding between all parties."
  },
  {
    id: 'joinery-l2-work-planning25',
    question: "When planning the finishing process for joinery items, why is it important to consider the sequence of operations?",
    options: ["It only affects the appearance of the finished product", "It only affects the cost of materials", "It only affects how quickly the job can be completed", "The sequence impacts efficiency, quality, and practical aspects like access to all surfaces"],
    correctAnswer: "The sequence impacts efficiency, quality, and practical aspects like access to all surfaces",
    explanation: "Proper finishing sequence ensures access to all surfaces, prevents quality issues and optimizes efficiency."
  }
];

// ✅ Upload function
async function uploadQuestions() {
for (const q of questions) {
  try {
    await setDoc(doc(db, 'questions', 'joinery-l2-work-planning', 'items', q.id), {
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
