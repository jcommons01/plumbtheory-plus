// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2Communication.ts

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

// ✅ Joinery Level 2 Communication & Documentation Questions
const questions = [
  {
    id: 'joinery-l2-communication1',
    question: "What information would typically be found on a drawing title block?",
    options: ["Only the drafter's personal contact information", "Only the materials required for the project", "Project name, drawing title, scale, date, revision number, and drafter's details", "Only the cost breakdown of the project"],
    correctAnswer: "Project name, drawing title, scale, date, revision number, and drafter's details",
    explanation: "A drawing title block typically contains comprehensive project identification information including the project name, drawing title, scale, date, revision number, and drafter's details. It may also include the client's name, project number, drawing number, company logo, and approval signatures. This standardized information block, usually located in the bottom right corner of the drawing, ensures proper identification and version control of drawings. For joiners, checking the title block before starting work is essential to confirm they're working from the most current revision, understand the drawing scale, and can identify who to contact for clarifications."
  },
  {
    id: 'joinery-l2-communication2',
    question: "What does the scale 1:50 on an architectural drawing mean?",
    options: ["The drawing shows 1 meter for every 50 meters of the actual object", "The drawing is 50 times larger than the actual object", "The drawing shows 1 unit for every 50 units of the actual object", "The drawing can only be used for 50 days after issue"],
    correctAnswer: "The drawing shows 1 unit for every 50 units of the actual object",
    explanation: "A scale of 1:50 on an architectural drawing means that 1 unit on the drawing represents 50 units of the actual object. For example, 1cm on the drawing equals 50cm (0.5m) in reality. This scale is commonly used for floor plans and building sections in UK architectural drawings. Understanding drawing scales is crucial for joiners to take accurate measurements, plan materials, and ensure components will fit correctly during installation. When working from scaled drawings, joiners should always use measuring devices (scale rules) appropriate to the drawing scale or convert dimensions carefully to avoid costly errors."
  },
  {
    id: 'joinery-l2-communication3',
    question: "Which of the following is the primary purpose of a Method Statement in joinery projects?",
    options: ["To list all materials and their costs", "To provide a step-by-step procedure for carrying out specific work safely", "To record time spent on each task", "To assign blame if something goes wrong"],
    correctAnswer: "To provide a step-by-step procedure for carrying out specific work safely",
    explanation: "The primary purpose of a Method Statement in joinery projects is to provide a step-by-step procedure for carrying out specific work safely. This document outlines how a job will be executed, detailing the sequence of work, required resources, specific precautions, and control measures needed to complete the task safely and effectively. Method Statements are often used alongside Risk Assessments and form part of a safe system of work, particularly for higher-risk activities. For joiners, understanding and following Method Statements is crucial for ensuring consistent, safe working practices and demonstrates compliance with health and safety requirements to clients and site managers."
  },
  {
    id: 'joinery-l2-communication4',
    question: "What information should be recorded when there is a variation to the original specification of joinery work?",
    options: ["Only verbal agreement is needed", "Only the cost implications need to be recorded", "Description of change, reason, date, cost implications, and authorisation", "Only the client's permission is required without documentation"],
    correctAnswer: "Description of change, reason, date, cost implications, and authorisation",
    explanation: "When there is a variation to the original specification of joinery work, comprehensive documentation should record the description of the change, reason for the variation, date of approval, cost implications, and proper authorisation from the client or contract administrator. This creates a clear audit trail that protects all parties if disputes arise later. Documentation might take the form of a variation order, architect's instruction, or site instruction, depending on the contract type. Joiners should ensure all variations are properly documented and approved before proceeding with changes to avoid payment disputes or unauthorised work issues."
  },
  {
    id: 'joinery-l2-communication5',
    question: "In construction drawings, what does a broken line consisting of long dashes with intermittent dots typically represent?",
    options: ["Existing walls to remain", "Center line of an element", "Hidden or concealed features", "Items to be demolished"],
    correctAnswer: "Hidden or concealed features",
    explanation: "In construction drawings, a broken line consisting of long dashes with intermittent dots (dash-dot-dash pattern) typically represents hidden or concealed features - elements that exist but are not visible in the current view because they are behind other objects or below a cutting plane. This is a standard convention in technical drawing. Understanding drawing conventions is essential for joiners to correctly interpret construction information. For example, when installing a window, hidden lintels might be shown with this line type on an elevation drawing, indicating structural elements that need to be considered but aren't directly visible in that view."
  },
  {
    id: 'joinery-l2-communication6',
    question: "Which of the following are typically included in a project specification for joinery work?",
    options: ["Only measurements for each component", "Only the installation timeline", "Materials, workmanship standards, finishes, and fixing methods", "Only the contractor's profit margin"],
    correctAnswer: "Materials, workmanship standards, finishes, and fixing methods",
    explanation: "A project specification for joinery work typically includes detailed information about materials, workmanship standards, finishes, and fixing methods. It may also cover required quality standards, relevant British Standards to be followed, preparation methods, treatment of joints, hardware requirements, and tolerance limits. The specification complements the drawings by providing information that can't be easily conveyed graphically. For joiners, the specification is a crucial document that must be followed precisely, as it forms part of the contractual agreement and ensures the finished work meets the client's and designer's expectations for quality and performance."
  },
  {
    id: 'joinery-l2-communication7',
    question: "What is the purpose of a snagging list in joinery projects?",
    options: ["To list materials required for the job", "To identify and record defects or incomplete work that needs to be addressed", "To schedule delivery of materials", "To list employee working hours"],
    correctAnswer: "To identify and record defects or incomplete work that needs to be addressed",
    explanation: "A snagging list is used to identify and record defects or incomplete work that needs to be addressed before a joinery project can be considered complete. It's typically created during an inspection near the end of a project and serves as a checklist for final corrections and finishing touches. The list usually details each issue, its location, the required remedy, and sometimes a deadline for completion. For joiners, addressing snagging items efficiently and to a high standard is important for client satisfaction, final payment release, and professional reputation. Well-managed projects minimize snagging by implementing quality checks throughout the work rather than just at completion."
  },
  {
    id: 'joinery-l2-communication8',
    question: "What is the primary purpose of a site diary in construction projects?",
    options: ["To record personal thoughts and feelings about the job", "To keep track of daily activities, issues encountered, and decisions made", "To schedule coffee breaks and lunches", "To record only financial transactions"],
    correctAnswer: "To keep track of daily activities, issues encountered, and decisions made",
    explanation: "The primary purpose of a site diary in construction projects is to keep track of daily activities, issues encountered, and decisions made on site. It creates a chronological record of events including work completed, deliveries received, subcontractors on site, weather conditions, delays experienced, instructions received, and any other significant occurrences. This documentation can be invaluable for resolving disputes, supporting extension of time claims, and providing evidence for variations. For joiners, maintaining a site diary (or contributing to one) provides protection when circumstances beyond their control affect work progress and helps demonstrate professional project management approach."
  },
  {
    id: 'joinery-l2-communication9',
    question: "What does NBS stand for in UK construction documentation?",
    options: ["National Building Society", "New Building Standards", "National Building Specification", "Natural Building Systems"],
    correctAnswer: "National Building Specification",
    explanation: "NBS stands for National Building Specification, which is the UK's standard specification system for the construction industry. Developed by RIBA Enterprises, NBS provides a library of clauses that architects and specifiers use to create accurate, legally sound specifications for building projects. The system covers all aspects of construction, including joinery work, with standardized sections and clauses that define required materials, standards, execution methods, and quality control. For joiners, understanding how to interpret NBS specifications is important as they define the contractual requirements for joinery components and installations in a structured, consistent format across the industry."
  },
  {
    id: 'joinery-l2-communication10',
    question: "Which of the following is the most appropriate way to communicate a significant safety concern on a construction site?",
    options: ["Wait until the weekly site meeting to mention it", "Send an email and take no further action", "Verbally notify the responsible person immediately and follow up with written documentation", "Post about it on social media to raise awareness"],
    correctAnswer: "Verbally notify the responsible person immediately and follow up with written documentation",
    explanation: "The most appropriate way to communicate a significant safety concern on a construction site is to verbally notify the responsible person (supervisor, site manager, or health and safety officer) immediately and then follow up with written documentation. This approach ensures the issue is addressed without delay while also creating a formal record of the notification. Under health and safety legislation, workers have a duty to report hazards, and proper documentation can be crucial if incidents occur later. For joiners, understanding the correct communication protocols for safety concerns is essential for maintaining a safe working environment and complying with legal responsibilities under the Health and Safety at Work Act."
  },
  {
    id: 'joinery-l2-communication11',
    question: "What is the purpose of a Request for Information (RFI) in construction projects?",
    options: ["To order additional materials", "To request permission to take time off work", "To obtain clarification or additional information about project details", "To request payment for completed work"],
    correctAnswer: "To obtain clarification or additional information about project details",
    explanation: "A Request for Information (RFI) is a formal process used to obtain clarification or additional information about project details when the existing documentation is insufficient, unclear, or contains apparent contradictions. RFIs are typically submitted in writing to the architect, project manager, or client's representative, creating a documented trail of questions and responses. For joiners, properly formulated RFIs are essential when drawings or specifications are ambiguous or when unforeseen site conditions require design decisions. The RFI process helps prevent errors, delays, and disputes by ensuring all parties have a clear understanding of requirements before work proceeds."
  },
  {
    id: 'joinery-l2-communication12',
    question: "Which drawing projection shows objects as they appear to the human eye, with lines converging to vanishing points?",
    options: ["Orthographic projection", "Isometric projection", "Perspective projection", "Oblique projection"],
    correctAnswer: "Perspective projection",
    explanation: "Perspective projection shows objects as they appear to the human eye, with lines converging to vanishing points, creating a realistic three-dimensional representation. This differs from orthographic projections (which show 2D views without perspective distortion), isometric projections (which show 3D views with consistent scale), and oblique projections (which show 3D objects with parallel rather than converging lines). In joinery documentation, perspective drawings are often used to show how finished elements will look in their context, helping clients visualize the completed work. While perspective drawings are valuable for visualization, joiners typically work from orthographic projections (plans, elevations, sections) for actual construction due to their dimensional accuracy."
  },
  {
    id: 'joinery-l2-communication13',
    question: "What does the term 'elevation' refer to in architectural drawings?",
    options: ["The height of a building above sea level", "A side view showing the vertical surfaces of a building or component", "A plan view showing the layout of a floor", "A 3D projection of a structure"],
    correctAnswer: "A side view showing the vertical surfaces of a building or component",
    explanation: "In architectural drawings, an elevation refers to a side view showing the vertical surfaces of a building or component as seen from a particular direction (typically north, south, east, or west for buildings). Elevations are orthographic projections that maintain true proportions without perspective distortion. For joiners, elevations are crucial for understanding the appearance, dimensions, and positioning of elements like doors, windows, built-in furniture, and exterior finishes. When making items like custom cabinetry, joiners will often work from elevation drawings that show the front view of the unit, complete with dimensions, shelf positions, and door arrangements."
  },
  {
    id: 'joinery-l2-communication14',
    question: "Which of the following is NOT typically part of a tender document package for joinery work?",
    options: ["Drawings and specifications", "Bill of quantities or schedule of work", "Form of tender", "The joiner's personal tax return"],
    correctAnswer: "The joiner's personal tax return",
    explanation: "The joiner's personal tax return is NOT typically part of a tender document package for joinery work. A tender package generally includes drawings and specifications (detailing what is to be built and to what standard), bill of quantities or schedule of work (listing the items and quantities to be priced), form of tender (the formal offer document), contract conditions, pre-tender health and safety plan, and sometimes preliminaries (general project requirements). For joiners submitting tenders, understanding each component of the tender package is essential for accurate pricing and identifying potential risks or clarifications needed before submitting a bid."
  },
  {
    id: 'joinery-l2-communication15',
    question: "What information should be included when labeling a joinery sample or mock-up?",
    options: ["Only the joiner's personal contact information", "Only the cost of production", "Project name, date, material specifications, finish details, and manufacturer/supplier information", "Only the weight of the sample"],
    correctAnswer: "Project name, date, material specifications, finish details, and manufacturer/supplier information",
    explanation: "When labeling a joinery sample or mock-up, comprehensive information should be included: project name, date, material specifications, finish details, and manufacturer/supplier information. Additional useful information might include the specific location where the item will be used, sample reference number, approval status, and the name of the person who created it. Proper labeling ensures samples can be correctly referenced during approval processes and accurately replicated during production. For joiners, maintaining well-documented samples is crucial for quality control, especially in projects with multiple similar but slightly different elements or when work is completed over extended periods."
  },
  {
    id: 'joinery-l2-communication16',
    question: "What does a 'schedule' typically refer to in joinery documentation?",
    options: ["Only the timeline for completing work", "A table listing components of the same type with their specifications and locations", "Only the payment schedule for the project", "Only the daily working hours"],
    correctAnswer: "A table listing components of the same type with their specifications and locations",
    explanation: "In joinery documentation, a 'schedule' typically refers to a table listing components of the same type (such as doors, windows, or ironmongery) with their specifications and locations. For example, a door schedule might list each door's reference number, location, size, material, fire rating, ironmongery requirements, and finish details. Schedules complement drawings by organizing detailed information in a systematic way that would be difficult to include on the drawings themselves. For joiners, schedules are essential reference documents that ensure the correct specification is applied to each component, particularly in projects with numerous similar but slightly different elements."
  },
  {
    id: 'joinery-l2-communication17',
    question: "What is the primary purpose of a pre-start meeting in a joinery project?",
    options: ["To negotiate payment terms", "To introduce team members and clarify project requirements before work begins", "To celebrate the award of the contract", "To inspect tools and equipment only"],
    correctAnswer: "To introduce team members and clarify project requirements before work begins",
    explanation: "The primary purpose of a pre-start meeting in a joinery project is to introduce team members and clarify project requirements before work begins. This meeting typically brings together key stakeholders (client, contractor, subcontractors, designers) to review project scope, specifications, timelines, quality expectations, health and safety requirements, and communication protocols. It provides an opportunity to address any questions or concerns before work commences. For joiners, the pre-start meeting is valuable for understanding project priorities, confirming access arrangements, identifying potential challenges, and establishing relationships with other team members, setting the foundation for successful project delivery."
  },
  {
    id: 'joinery-l2-communication18',
    question: "In technical drawings, what does the abbreviation 'NTS' stand for?",
    options: ["New Technical Standard", "Not To Scale", "National Testing Service", "Notice To Supplier"],
    correctAnswer: "Not To Scale",
    explanation: "In technical drawings, the abbreviation 'NTS' stands for 'Not To Scale.' This notation indicates that the drawing or a particular detail cannot be measured directly using a scale rule, and dimensions should be taken only from the stated dimension figures. NTS might be used for schematic diagrams, concept sketches, or when a detail has been enlarged for clarity without using a standard scale. For joiners, seeing NTS on a drawing serves as an important warning not to measure directly from the drawing, as doing so could result in significant errors. When working from NTS drawings, all required dimensions must be explicitly stated on the drawing or in accompanying documentation."
  },
  {
    id: 'joinery-l2-communication19',
    question: "What would a joiner use a transmittal form for?",
    options: ["To request annual leave", "To document the transfer of drawings, documents, or samples between parties", "To order tools and equipment", "To record working hours"],
    correctAnswer: "To document the transfer of drawings, documents, or samples between parties",
    explanation: "A joiner would use a transmittal form to document the transfer of drawings, documents, or samples between parties. This form creates a record of what was sent, when it was sent, who sent it, who received it, and the purpose of the transmission. It typically includes a list of the items transmitted, their revision numbers or dates, and sometimes requires acknowledgment of receipt. Using transmittal forms is a professional practice that creates an audit trail of information exchange, which can be crucial if disputes arise about whether particular documents were received. For joiners submitting shop drawings or samples for approval, proper transmittal documentation helps track the approval process and prevent miscommunication."
  },
  {
    id: 'joinery-l2-communication20',
    question: "What is a 'shop drawing' in joinery work?",
    options: ["A drawing of the joinery workshop layout", "A detailed manufacturing drawing prepared by the joiner based on the architect's design intent", "A sketch made in a retail shop", "A drawing showing only the shop front of a building"],
    correctAnswer: "A detailed manufacturing drawing prepared by the joiner based on the architect's design intent",
    explanation: "A shop drawing in joinery work is a detailed manufacturing drawing prepared by the joiner based on the architect's design intent. These drawings translate conceptual design drawings into precise fabrication documents, showing exact dimensions, materials, construction methods, jointing details, hardware locations, and finishing specifications. Shop drawings typically require approval from the architect or designer before fabrication begins, ensuring the joiner's interpretation meets the design intent. Creating accurate shop drawings is a critical skill for joiners undertaking bespoke work, as they bridge the gap between design concept and practical manufacturing, identifying potential issues before fabrication and serving as the primary reference during production."
  },
  {
    id: 'joinery-l2-communication21',
    question: "Which of the following best describes the purpose of a Critical Path Method (CPM) in project scheduling?",
    options: ["To identify only the cheapest way to complete a project", "To identify the sequence of tasks that determines the minimum project duration", "To create a list of materials needed", "To assign blame for delays"],
    correctAnswer: "To identify the sequence of tasks that determines the minimum project duration",
    explanation: "The Critical Path Method (CPM) in project scheduling identifies the sequence of tasks that determines the minimum project duration - the 'critical path.' Any delay to tasks on this path will delay the entire project, while tasks not on the critical path have 'float' (flexibility in their start times). CPM analysis helps project managers prioritize resources, identify schedule risks, and make informed decisions when changes occur. For joiners, understanding where their work fits within the critical path helps them appreciate the wider impact of potential delays and prioritize their activities accordingly. On larger projects, joiners may need to provide accurate duration estimates for their work to contribute to CPM schedule development."
  },
  {
    id: 'joinery-l2-communication22',
    question: "What does the term 'as-built drawings' refer to?",
    options: ["Preliminary sketches made during the design phase", "Drawings that record the exact way a project was actually constructed, including any changes from the original design", "Drawings of historical buildings as they were originally built", "Artistic impressions of how a building might look"],
    correctAnswer: "Drawings that record the exact way a project was actually constructed, including any changes from the original design",
    explanation: "As-built drawings record the exact way a project was actually constructed, including any changes from the original design. These drawings reflect all the modifications, adjustments, and deviations that occurred during construction, providing an accurate record of the completed work. As-built documentation is particularly important for elements that will be concealed (such as in-wall services) and for future maintenance, alterations, or troubleshooting. For joiners, contributing to as-built documentation by recording significant changes to joinery elements (such as relocated fixings or modified dimensions due to site conditions) ensures that accurate information is available for future reference, particularly important for components that may need maintenance or replacement."
  },
  {
    id: 'joinery-l2-communication23',
    question: "What information would be typically found in a job card system for a joinery workshop?",
    options: ["Only the customer's contact details", "Only the cost of materials", "Job number, customer details, product description, materials, specifications, timeframe, and status", "Only the workshop address"],
    correctAnswer: "Job number, customer details, product description, materials, specifications, timeframe, and status",
    explanation: "A job card system for a joinery workshop typically includes comprehensive information: job number, customer details, product description, materials, specifications, timeframe, and status. Additional information might include drawings or sketches, specific machining requirements, finishing details, hardware specifications, and quality check records. Job cards create a standardized system for tracking work through the production process, ensuring consistency and accountability. For workshop joiners, the job card serves as the primary reference document for each project, containing all the information needed to manufacture items correctly and efficiently while maintaining a record of progress for management purposes."
  },
  {
    id: 'joinery-l2-communication24',
    question: "What is the primary purpose of a technical submittal in construction projects?",
    options: ["To submit a request for payment", "To propose design changes", "To provide detailed information about products or systems for approval before installation", "To report health and safety incidents"],
    correctAnswer: "To provide detailed information about products or systems for approval before installation",
    explanation: "The primary purpose of a technical submittal in construction projects is to provide detailed information about products or systems for approval before installation. Submittals typically include manufacturer's data sheets, samples, shop drawings, test certificates, warranties, and installation instructions that demonstrate compliance with the specification requirements. The approval process confirms that proposed materials and methods meet the project requirements before ordering or installation begins. For joiners, preparing comprehensive submittals for items like custom cabinetry, specialized hardware, or timber species is crucial for gaining timely approval and avoiding rework if materials are rejected later. The submittal process creates a documented approval trail that protects all parties."
  },
  {
    id: 'joinery-l2-communication25',
    question: "What is the purpose of a handover file at the completion of a joinery project?",
    options: ["To record only snags that weren't completed", "To provide sales information for future projects", "To document warranty information, maintenance instructions, and as-built information for the client", "To store payment records only"],
    correctAnswer: "To document warranty information, maintenance instructions, and as-built information for the client",
    explanation: "The purpose of a handover file at the completion of a joinery project is to document warranty information, maintenance instructions, and as-built information for the client. This comprehensive file typically includes product information, caring for wood guidance, hardware details, finish specifications, supplier contacts for replacements, cleaning recommendations, and certificates of compliance where applicable. Some projects might also include operational manuals for moving parts or mechanisms. For joiners, creating a thorough handover file demonstrates professionalism, reduces post-completion queries, and provides clients with the information needed to maintain joinery elements correctly, potentially extending their lifespan and preserving warranty validity."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-communication', 'items', q.id), {
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
