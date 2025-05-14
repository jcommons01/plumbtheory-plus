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
    options: ["Project details, drawing title, scale, date and drafter information", "Designer details, construction timeline and site access information", "Material specifications, assembly sequence and quality standards", "Contractor contact details, pricing schedule and payment terms"],
    correctAnswer: "Project details, drawing title, scale, date and drafter information",
    explanation: "Title blocks contain key project identification details for proper drawing management."
  },
  {
    id: 'joinery-l2-communication2',
    question: "What does the scale 1:50 on an architectural drawing mean?",
    options: ["The drawing must be viewed from 50 centimetres away", "The drawing uses 50 millimetre grid spacing", "One unit on drawing equals 50 units of actual object", "The object is drawn at 50% of its actual size"],
    correctAnswer: "One unit on drawing equals 50 units of actual object",
    explanation: "1:50 scale means 1cm on drawing represents 50cm in reality."
  },
  {
    id: 'joinery-l2-communication3',
    question: "Which of the following is the primary purpose of a Method Statement in joinery projects?",
    options: ["To document all material costs and quantities", "To establish payment schedules and contract terms", "To record work hours and productivity metrics", "To outline a step-by-step procedure for safe work execution"],
    correctAnswer: "To outline a step-by-step procedure for safe work execution",
    explanation: "Method Statements detail safe work procedures for specific joinery tasks."
  },
  {
    id: 'joinery-l2-communication4',
    question: "What information should be recorded when there is a variation to the original specification of joinery work?",
    options: ["Simply the client's verbal approval and updated completion date", "Change description, reasons, date, costs and proper authorisation", "Only the financial impact and additional time required", "Just verbal confirmation from the site manager"],
    correctAnswer: "Change description, reasons, date, costs and proper authorisation",
    explanation: "Variation documentation must include all critical details and proper approval."
  },
  {
    id: 'joinery-l2-communication5',
    question: "In construction drawings, what does a broken line consisting of long dashes with intermittent dots typically represent?",
    options: ["Temporary structures during construction", "Property boundary lines and easements", "Proposed new construction elements", "Hidden or concealed building features"],
    correctAnswer: "Hidden or concealed building features",
    explanation: "Dash-dot lines represent elements that exist but aren't visible in current view."
  },
  {
    id: 'joinery-l2-communication6',
    question: "Which of the following are typically included in a project specification for joinery work?",
    options: ["Health insurance details, staff training and equipment warranties", "Staff qualifications, tool requirements and workshop facilities", "Materials, workmanship standards, finishes and installation methods", "Labour costs, profit margins and payment schedules"],
    correctAnswer: "Materials, workmanship standards, finishes and installation methods",
    explanation: "Joinery specifications detail quality expectations for materials and workmanship."
  },
  {
    id: 'joinery-l2-communication7',
    question: "What is the purpose of a snagging list in joinery projects?",
    options: ["To track employee performance and productivity", "To document tools required for project completion", "To list materials ordered but not yet delivered", "To record defects or incomplete work needing correction"],
    correctAnswer: "To record defects or incomplete work needing correction",
    explanation: "Snagging lists identify issues requiring attention before project completion."
  },
  {
    id: 'joinery-l2-communication8',
    question: "What is the primary purpose of a site diary in construction projects?",
    options: ["To record daily events, issues and decisions on site", "To plan future material deliveries and labour requirements", "To calculate overtime hours and additional payments", "To schedule upcoming inspections and quality checks"],
    correctAnswer: "To record daily events, issues and decisions on site",
    explanation: "Site diaries create chronological records of all significant project events."
  },
  {
    id: 'joinery-l2-communication9',
    question: "What does NBS stand for in UK construction documentation?",
    options: ["Networked Building Solutions", "National Building Standards", "National Building Specification", "New Building Systems"],
    correctAnswer: "National Building Specification",
    explanation: "NBS is the UK's standard specification system for construction projects."
  },
  {
    id: 'joinery-l2-communication10',
    question: "Which of the following is the most appropriate way to communicate a significant safety concern on a construction site?",
    options: ["Email all project stakeholders with detailed photographs", "Contact the Health and Safety Executive directly", "Immediately notify responsible person and follow up in writing", "Document the issue and discuss at next scheduled meeting"],
    correctAnswer: "Immediately notify responsible person and follow up in writing",
    explanation: "Safety concerns require immediate verbal notification with written follow-up."
  },
  {
    id: 'joinery-l2-communication11',
    question: "What is the purpose of a Request for Information (RFI) in construction projects?",
    options: ["To schedule additional inspection appointments", "To obtain clarification on unclear project details", "To formally request additional payment for extra work", "To order replacement materials for damaged items"],
    correctAnswer: "To obtain clarification on unclear project details",
    explanation: "RFIs seek clarification when project documentation is insufficient or unclear."
  },
  {
    id: 'joinery-l2-communication12',
    question: "Which drawing projection shows objects as they appear to the human eye, with lines converging to vanishing points?",
    options: ["Isometric projection with consistent scale", "Perspective projection with converging lines", "Orthographic projection with multiple views", "Exploded projection with separated components"],
    correctAnswer: "Perspective projection with converging lines",
    explanation: "Perspective drawings show realistic views with lines converging to vanishing points."
  },
  {
    id: 'joinery-l2-communication13',
    question: "What does the term 'elevation' refer to in architectural drawings?",
    options: ["Three-dimensional representation of the structure", "Top-down view showing the building layout", "Side view showing vertical building surfaces", "Height measurement from ground level to ceiling"],
    correctAnswer: "Side view showing vertical building surfaces",
    explanation: "Elevations show side views of vertical surfaces from specific directions."
  },
  {
    id: 'joinery-l2-communication14',
    question: "Which of the following is NOT typically part of a tender document package for joinery work?",
    options: ["Contract conditions and form of tender", "The contractor's previous project portfolio", "Project drawings and detailed specifications", "Bill of quantities or schedule of work"],
    correctAnswer: "The contractor's previous project portfolio",
    explanation: "Contractor portfolios aren't standard in tender packages, unlike specifications and quantities."
  },
  {
    id: 'joinery-l2-communication15',
    question: "What information should be included when labelling a joinery sample or mock-up?",
    options: ["Workshop environmental policy and waste disposal methods", "Project details, date, materials, finishes and supplier information", "Joiner's home address and personal contact details", "Full manufacturing cost breakdown and profit margin"],
    correctAnswer: "Project details, date, materials, finishes and supplier information",
    explanation: "Sample labels should include all details needed for proper reference and replication."
  },
  {
    id: 'joinery-l2-communication16',
    question: "What does a 'schedule' typically refer to in joinery documentation?",
    options: ["Labour allocation showing worker assignments", "Project timeline showing completion deadlines", "Table listing components with specifications and locations", "Payment structure showing staged financial releases"],
    correctAnswer: "Table listing components with specifications and locations",
    explanation: "Schedules systematically tabulate similar components with their detailed specifications."
  },
  {
    id: 'joinery-l2-communication17',
    question: "What is the primary purpose of a pre-start meeting in a joinery project?",
    options: ["Negotiate final contract price adjustments", "Review previous similar projects for lessons learned", "Establish team roles and clarify project requirements", "Inspect all tools and equipment for safety"],
    correctAnswer: "Establish team roles and clarify project requirements",
    explanation: "Pre-start meetings align understanding of project requirements before work begins."
  },
  {
    id: 'joinery-l2-communication18',
    question: "In technical drawings, what does the abbreviation 'NTS' stand for?",
    options: ["National Technical Standard", "Not To Scale", "New Technical Specification", "Needs Technical Supervision"],
    correctAnswer: "Not To Scale",
    explanation: "NTS warns that drawing measurements cannot be taken with a scale rule."
  },
  {
    id: 'joinery-l2-communication19',
    question: "What would a joiner use a transmittal form for?",
    options: ["Recording material wastage percentages", "Tracking tool and equipment usage", "Requesting additional working time", "Documenting transfer of drawings or samples"],
    correctAnswer: "Documenting transfer of drawings or samples",
    explanation: "Transmittal forms record what documents were sent, when and to whom."
  },
  {
    id: 'joinery-l2-communication20',
    question: "What is a 'shop drawing' in joinery work?",
    options: ["A pricing document for custom joinery items", "A detailed manufacturing drawing based on design intent", "A sketch showing workshop layout and equipment", "A drawing showing retail joinery display units"],
    correctAnswer: "A detailed manufacturing drawing based on design intent",
    explanation: "Shop drawings translate design concepts into precise fabrication instructions."
  },
  {
    id: 'joinery-l2-communication21',
    question: "Which of the following best describes the purpose of a Critical Path Method (CPM) in project scheduling?",
    options: ["Creating risk assessment priorities for dangerous activities", "Establishing material delivery sequences from suppliers", "Identifying the most cost-effective construction route", "Determining the task sequence that defines minimum project duration"],
    correctAnswer: "Determining the task sequence that defines minimum project duration",
    explanation: "CPM identifies sequential tasks that determine the shortest possible project duration."
  },
  {
    id: 'joinery-l2-communication22',
    question: "What does the term 'as-built drawings' refer to?",
    options: ["Construction drawings with cost information added", "Original concept sketches from design phase", "Records showing how the project was actually constructed", "Historical documentation of heritage buildings"],
    correctAnswer: "Records showing how the project was actually constructed",
    explanation: "As-built drawings document the actual construction including all site modifications."
  },
  {
    id: 'joinery-l2-communication23',
    question: "What information would be typically found in a job card system for a joinery workshop?",
    options: ["Employee personal details and qualifications", "Tool inventory and replacement schedules", "Job details, customer information, specifications and status", "Only machinery maintenance schedules"],
    correctAnswer: "Job details, customer information, specifications and status",
    explanation: "Job cards contain all information needed to track and complete workshop projects."
  },
  {
    id: 'joinery-l2-communication24',
    question: "What is the primary purpose of a technical submittal in construction projects?",
    options: ["Scheduling delivery of materials to site", "Requesting additional payment for variations", "Providing product details for approval before installation", "Reporting health and safety compliance"],
    correctAnswer: "Providing product details for approval before installation",
    explanation: "Submittals seek approval by demonstrating products meet specifications before installation."
  },
  {
    id: 'joinery-l2-communication25',
    question: "What is the purpose of a handover file at the completion of a joinery project?",
    options: ["To advertise additional services to the client", "To transfer liability for defects to the client", "To request final payment from the client", "To document warranties, maintenance information and as-builts"],
    correctAnswer: "To document warranties, maintenance information and as-builts",
    explanation: "Handover files provide clients with information for proper maintenance and future reference."
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
