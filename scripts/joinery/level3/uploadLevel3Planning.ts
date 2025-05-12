// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Planning.ts

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

// ✅ Joinery Level 3 Planning & Organising Work Questions
const questions = [
  {
    id: 'joinery-l3-planning1',
    question: "What is the primary purpose of a Critical Path Method (CPM) in joinery project planning?",
    options: ["To create the most visually attractive schedule", "To ensure all costs are minimized", "To identify the sequence of dependent tasks that determines the minimum project duration", "To maximize resource usage on all days"],
    correctAnswer: "To identify the sequence of dependent tasks that determines the minimum project duration",
    explanation: "CPM identifies the sequence of tasks that directly affects the project's completion date, where any delay extends the overall timeline. This helps project managers prioritize resources, identify schedule risks, and determine which tasks have float (can be delayed) and which are critical."
  },
  {
    id: 'joinery-l3-planning2',
    question: "What is the purpose of a 'float' calculation in joinery project scheduling?",
    options: ["To determine the buoyancy of timber in water", "To calculate the amount of adhesive needed", "To identify the time period a task can be delayed without affecting the project completion date", "To estimate how long finishes will take to dry"],
    correctAnswer: "To identify the time period a task can be delayed without affecting the project completion date",
    explanation: "Float (or slack) calculations identify how much a task can be delayed without affecting the project end date. This helps in resource allocation, allowing flexibility for non-critical tasks while ensuring critical path activities receive priority attention."
  },
  {
    id: 'joinery-l3-planning3',
    question: "What is a key advantage of using a Gantt chart for planning joinery projects?",
    options: ["They only work for projects lasting less than one week", "They provide a visual representation of the project schedule showing task durations and dependencies", "They automatically order materials for the project", "They eliminate the need for project supervision"],
    correctAnswer: "They provide a visual representation of the project schedule showing task durations and dependencies",
    explanation: "Gantt charts visually display the project timeline, clearly showing task durations, start and end dates, dependencies, milestones, and progress. This format makes it easy to communicate the schedule to clients and team members and quickly identify scheduling conflicts or resource issues."
  },
  {
    id: 'joinery-l3-planning4',
    question: "What is the purpose of resource leveling in joinery project planning?",
    options: ["To ensure all materials are at the same height in storage", "To adjust the project schedule to address over-allocation or under-allocation of resources", "To make sure all workers receive equal pay", "To level concrete foundations before installation begins"],
    correctAnswer: "To adjust the project schedule to address over-allocation or under-allocation of resources",
    explanation: "Resource leveling adjusts the schedule to resolve resource conflicts, preventing overallocation (when resources are assigned more work than their capacity) or underutilization. This technique optimizes resource use while minimizing project duration impacts, often by utilizing float in non-critical activities."
  },
  {
    id: 'joinery-l3-planning5',
    question: "What is a Work Breakdown Structure (WBS) in joinery project planning?",
    options: ["A list of broken tools that need replacement", "A hierarchical decomposition of the project into smaller, more manageable components", "A schedule of coffee breaks for workers", "The process of demolishing existing structures"],
    correctAnswer: "A hierarchical decomposition of the project into smaller, more manageable components",
    explanation: "A WBS breaks down the project scope into hierarchical, manageable components, starting with major deliverables and decomposing to work packages. This creates a comprehensive framework for planning, estimating, scheduling, assigning responsibilities, and tracking progress."
  },
  {
    id: 'joinery-l3-planning6',
    question: "What is the primary purpose of a pre-contract meeting for a joinery project?",
    options: ["Only to sign the contract", "Only to meet the client socially", "To clarify project requirements, scope, specifications, and contractual terms before work begins", "Only to collect the deposit payment"],
    correctAnswer: "To clarify project requirements, scope, specifications, and contractual terms before work begins",
    explanation: "Pre-contract meetings clarify project requirements, specifications, and contractual terms before work begins. This ensures all parties have the same understanding of scope, quality standards, timeline, payment terms, and change management processes, preventing misunderstandings that could lead to disputes."
  },
  {
    id: 'joinery-l3-planning7',
    question: "What information should be included in a resource allocation plan for a joinery project?",
    options: ["Only the names of workers", "The resources required for each task, their availability, and how they will be distributed across the project timeline", "Only the cost of materials", "Only the location of the project"],
    correctAnswer: "The resources required for each task, their availability, and how they will be distributed across the project timeline",
    explanation: "A resource allocation plan details what resources (labor, equipment, materials) are required for each task, when they're needed, their availability, and how they'll be distributed across the project timeline. This ensures efficient resource utilization, prevents bottlenecks, and supports accurate cost projections."
  },
  {
    id: 'joinery-l3-planning8',
    question: "What is the purpose of a quality control plan in joinery project management?",
    options: ["Only to check materials on delivery", "Only to conduct final inspection", "To define the standards, inspection methods, responsibilities, and verification procedures to ensure quality requirements are met", "Only to document quality problems after they occur"],
    correctAnswer: "To define the standards, inspection methods, responsibilities, and verification procedures to ensure quality requirements are met",
    explanation: "A quality control plan defines standards, inspection methods, responsibilities, and verification procedures for ensuring quality requirements are met throughout the project. It establishes checkpoints, testing methods, acceptance criteria, and documentation requirements to prevent defects rather than just detecting them."
  },
  {
    id: 'joinery-l3-planning9',
    question: "What is the purpose of calculating earned value in a joinery project?",
    options: ["To determine what bonuses to pay workers", "To measure project performance by comparing planned work to actual completed work and costs", "To calculate the profit margin only", "To determine the market value of joinery products"],
    correctAnswer: "To measure project performance by comparing planned work to actual completed work and costs",
    explanation: "Earned value calculations measure project performance by comparing planned work to actual completed work and costs at a specific point in time. This technique integrates scope, schedule, and cost metrics to provide objective assessment of progress and forecast final costs and completion dates."
  },
  {
    id: 'joinery-l3-planning10',
    question: "What is the purpose of a scope statement in joinery project planning?",
    options: ["To determine how far workers can travel to the site", "To clearly define what is included and excluded from the project", "To identify how many periscopes are needed", "To measure the building dimensions only"],
    correctAnswer: "To clearly define what is included and excluded from the project",
    explanation: "A scope statement clearly defines what is included and excluded from the project, describing deliverables, acceptance criteria, constraints, and assumptions. This document establishes boundaries, prevents scope creep, and serves as a reference point for evaluating change requests."
  },
  {
    id: 'joinery-l3-planning11',
    question: "What is the purpose of a procurement plan in joinery project management?",
    options: ["Only to find the cheapest suppliers", "Only to order materials", "To define what resources need to be purchased, when they are needed, and the processes for acquiring them", "Only to determine delivery dates"],
    correctAnswer: "To define what resources need to be purchased, when they are needed, and the processes for acquiring them",
    explanation: "A procurement plan defines what resources must be purchased, when they're needed, and the processes for acquiring them. It addresses make-or-buy decisions, supplier selection criteria, contract types, lead times, quality requirements, and risk management strategies for procurement activities."
  },
  {
    id: 'joinery-l3-planning12',
    question: "What is a milestone in joinery project scheduling?",
    options: ["The distance from the workshop to the installation site", "A significant stone found during excavation", "A significant point or event in the project often marking the completion of a major deliverable", "The heaviest material used in the project"],
    correctAnswer: "A significant point or event in the project often marking the completion of a major deliverable",
    explanation: "A milestone is a significant point or event in the project marking completion of a major deliverable or phase. Unlike tasks, milestones have zero duration and serve as checkpoints to monitor progress, evaluate performance, make go/no-go decisions, and often trigger payments or formal reviews."
  },
  {
    id: 'joinery-l3-planning13',
    question: "What is the purpose of a communication plan in joinery project management?",
    options: ["Only to set up phone lines at the site", "Only to create an emergency contact list", "To define who needs what information, when they need it, how it will be delivered, and by whom", "Only to establish internet connectivity"],
    correctAnswer: "To define who needs what information, when they need it, how it will be delivered, and by whom",
    explanation: "A communication plan defines who needs what information, when they need it, how it will be delivered, and by whom. It establishes protocols for regular updates, meeting schedules, reporting formats, escalation procedures, and stakeholder communication preferences to ensure effective information flow."
  },
  {
    id: 'joinery-l3-planning14',
    question: "What is the purpose of a risk management plan in joinery projects?",
    options: ["Only to arrange insurance coverage", "Only to comply with health and safety regulations", "To identify potential risks, assess their impact, and develop strategies to manage them", "Only to identify risks without planning responses"],
    correctAnswer: "To identify potential risks, assess their impact, and develop strategies to manage them",
    explanation: "A risk management plan identifies potential risks, assesses their probability and impact, and develops strategies to manage them. It includes risk identification, qualitative/quantitative analysis, response planning (avoid/transfer/mitigate/accept), contingency planning, and monitoring procedures to proactively address uncertainties."
  },
  {
    id: 'joinery-l3-planning15',
    question: "What is a key benefit of using project management software for joinery projects?",
    options: ["It automatically builds the joinery items", "It eliminates the need for project managers", "It integrates planning, scheduling, resource management, and tracking functions in one system", "It guarantees the project will be profitable"],
    correctAnswer: "It integrates planning, scheduling, resource management, and tracking functions in one system",
    explanation: "Project management software integrates planning, scheduling, resource management, and tracking functions in one system. This provides real-time visibility of progress, automatic schedule updates, resource utilization analytics, document management, and collaboration tools that improve coordination and decision-making."
  },
  {
    id: 'joinery-l3-planning16',
    question: "What is the purpose of a change control process in joinery projects?",
    options: ["To prevent any changes from being made", "Only to increase the final invoice amount", "To formally evaluate, approve, and implement changes to project scope, schedule, or budget", "Only to document changes after they've been implemented"],
    correctAnswer: "To formally evaluate, approve, and implement changes to project scope, schedule, or budget",
    explanation: "A change control process formally evaluates, approves, and implements changes to project scope, schedule, or budget. It includes change request documentation, impact assessment, approval procedures, and implementation planning to ensure changes are properly evaluated and integrated while maintaining project control."
  },
  {
    id: 'joinery-l3-planning17',
    question: "What is the purpose of a stakeholder analysis in joinery project planning?",
    options: ["Only to identify who will pay for the project", "Only to determine who will use the finished product", "To identify and analyze the needs and expectations of all parties who may affect or be affected by the project", "Only to find potential investors"],
    correctAnswer: "To identify and analyze the needs and expectations of all parties who may affect or be affected by the project",
    explanation: "Stakeholder analysis identifies and analyzes the needs, expectations, influence, and interests of all parties who may affect or be affected by the project. This enables development of appropriate engagement strategies for each stakeholder group, prioritizing communication efforts based on influence and interest levels."
  },
  {
    id: 'joinery-l3-planning18',
    question: "What is the purpose of a work authorization system in joinery project management?",
    options: ["Only to assign tasks to workers", "Only to track working hours", "To formally initiate work on specific project phases or activities at the appropriate time", "Only to authorize overtime work"],
    correctAnswer: "To formally initiate work on specific project phases or activities at the appropriate time",
    explanation: "A work authorization system formally initiates work on specific phases or activities at the appropriate time. It ensures prerequisites are completed, required resources are available, and necessary approvals are obtained before work begins, preventing premature starts that could lead to rework."
  },
  {
    id: 'joinery-l3-planning19',
    question: "What is a key purpose of conducting a post-project review for joinery work?",
    options: ["Only to assign blame for problems", "Only to calculate the final profit", "To evaluate project performance, document lessons learned, and identify improvement opportunities for future projects", "Only to close the financial accounts"],
    correctAnswer: "To evaluate project performance, document lessons learned, and identify improvement opportunities for future projects",
    explanation: "Post-project reviews evaluate performance, document lessons learned, and identify improvement opportunities for future projects. They analyze successes and failures, compare planned vs. actual metrics, gather feedback from stakeholders, and capture insights that can be applied to enhance processes and outcomes in subsequent projects."
  },
  {
    id: 'joinery-l3-planning20',
    question: "What is the purpose of creating a resource histogram in joinery project planning?",
    options: ["To create a historical record of past projects", "To graphically display resource requirements over time, highlighting periods of over-allocation or under-utilization", "To determine the age distribution of the workforce", "To calculate material wastage only"],
    correctAnswer: "To graphically display resource requirements over time, highlighting periods of over-allocation or under-utilization",
    explanation: "Resource histograms graphically display resource requirements over time, highlighting periods of over-allocation or under-utilization. This visual representation helps identify resource conflicts, plan hiring or equipment rental timing, and adjust schedules to balance resource needs across the project timeline."
  },
  {
    id: 'joinery-l3-planning21',
    question: "What is fast tracking in joinery project scheduling?",
    options: ["Rushing workers to complete tasks quickly", "Skipping quality control steps to save time", "Compressing the schedule by performing normally sequential activities in parallel", "Using faster transportation for materials"],
    correctAnswer: "Compressing the schedule by performing normally sequential activities in parallel",
    explanation: "Fast tracking compresses the schedule by performing normally sequential activities in parallel or partially overlapping them. This technique can reduce project duration but typically increases risk and complexity, requiring careful coordination and possibly additional resources to manage dependencies."
  },
  {
    id: 'joinery-l3-planning22',
    question: "What is the purpose of a responsibility assignment matrix (RAM) in joinery project management?",
    options: ["To assign blame when problems occur", "To document which positions must work overtime", "To clearly define and communicate who is responsible for each project task or deliverable", "To determine pay grades for each position"],
    correctAnswer: "To clearly define and communicate who is responsible for each project task or deliverable",
    explanation: "A responsibility assignment matrix (RAM) clearly defines and communicates who is responsible for each project task or deliverable. Formats like RACI (Responsible, Accountable, Consulted, Informed) clarify different levels of involvement, reducing confusion, preventing tasks from being overlooked, and establishing clear accountability."
  },
  {
    id: 'joinery-l3-planning23',
    question: "What is the purpose of a project charter in joinery project initiation?",
    options: ["Only to establish the company's right to operate", "Only to set quality standards", "To formally authorize the project, define its purpose, objectives, scope, and key stakeholders", "Only to secure project funding"],
    correctAnswer: "To formally authorize the project, define its purpose, objectives, scope, and key stakeholders",
    explanation: "A project charter formally authorizes the project, defines its purpose, objectives, scope, key stakeholders, and high-level requirements. It establishes the project manager's authority, identifies success criteria, outlines known constraints, and provides the foundation for detailed planning activities."
  },
  {
    id: 'joinery-l3-planning24',
    question: "What is the purpose of a precedence diagram in joinery project scheduling?",
    options: ["To determine which contracts take legal precedence", "To establish which workers have seniority", "To graphically represent tasks and their logical relationships/dependencies", "To identify which tasks have highest quality standards"],
    correctAnswer: "To graphically represent tasks and their logical relationships/dependencies",
    explanation: "Precedence diagrams graphically represent tasks and their logical relationships/dependencies using nodes and connecting arrows. This network diagram visualizes workflow sequences, showing which tasks must finish before others can start, which can run in parallel, and the critical path through the network."
  },
  {
    id: 'joinery-l3-planning25',
    question: "What does the term 'crashing' refer to in joinery project scheduling?",
    options: ["When a project fails completely", "When a computer system stops working", "Adding resources to critical path activities to reduce their duration and overall project time", "Reducing project quality to save time"],
    correctAnswer: "Adding resources to critical path activities to reduce their duration and overall project time",
    explanation: "Crashing involves adding resources to critical path activities to reduce their duration and the overall project timeline. This time-cost trade-off technique involves analyzing which activities will provide the greatest schedule reduction for the least additional cost and selectively accelerating them."
  },
  {
    id: 'joinery-l3-planning26',
    question: "What is the primary purpose of a progress meeting during a joinery project?",
    options: ["Only to socialize with the team", "Only to assign blame for delays", "To review completed work, discuss issues, update schedules, and coordinate upcoming activities", "Only to record attendance"],
    correctAnswer: "To review completed work, discuss issues, update schedules, and coordinate upcoming activities",
    explanation: "Progress meetings review completed work, discuss issues and risks, update schedules, coordinate upcoming activities, and align stakeholder expectations. These regular check-ins enable timely decision-making, facilitate information sharing, identify potential problems early, and maintain team alignment on project goals."
  },
  {
    id: 'joinery-l3-planning27',
    question: "What is the purpose of developing a project quality plan for joinery work?",
    options: ["Only to satisfy ISO certification requirements", "Only to impress clients during sales meetings", "To define quality standards, responsibilities, control processes, and verification methods for the project", "Only to test materials"],
    correctAnswer: "To define quality standards, responsibilities, control processes, and verification methods for the project",
    explanation: "A project quality plan defines quality standards, responsibilities, control processes, and verification methods. It identifies applicable regulations and standards, establishes inspection points, describes testing procedures, outlines documentation requirements, and specifies measures to prevent defects through proper planning and execution."
  },
  {
    id: 'joinery-l3-planning28',
    question: "What is the purpose of a contingency budget in joinery project planning?",
    options: ["To pay for employee social events", "To cover travel expenses", "To provide funds for identified risks and unexpected events or scope changes", "To increase profit margins"],
    correctAnswer: "To provide funds for identified risks and unexpected events or scope changes",
    explanation: "A contingency budget provides funds for identified risks, unexpected events, and authorized scope changes. It's typically calculated based on risk assessment and historical performance data, providing financial flexibility to address uncertainties without compromising the project's financial viability."
  },
  {
    id: 'joinery-l3-planning29',
    question: "What is the primary purpose of conducting a site survey before creating a joinery installation plan?",
    options: ["Only to meet the client", "Only to determine travel time to site", "To gather accurate information about site conditions, dimensions, access, and constraints that will affect installation", "Only to take photographs for marketing"],
    correctAnswer: "To gather accurate information about site conditions, dimensions, access, and constraints that will affect installation",
    explanation: "Site surveys gather accurate information about conditions, dimensions, access, and constraints affecting installation. This ensures joinery items are manufactured to the correct specifications, appropriate installation methods are planned, potential problems are identified early, and resources are properly allocated."
  },
  {
    id: 'joinery-l3-planning30',
    question: "What is the purpose of using SMART objectives in joinery project planning?",
    options: ["To incorporate smartphone technology into planning", "Only to use the latest planning software", "To ensure objectives are Specific, Measurable, Achievable, Relevant, and Time-bound", "Only to simplify complex plans"],
    correctAnswer: "To ensure objectives are Specific, Measurable, Achievable, Relevant, and Time-bound",
    explanation: "SMART objectives ensure goals are Specific (clearly defined), Measurable (quantifiable), Achievable (realistic), Relevant (aligned with broader aims), and Time-bound (with deadlines). This framework creates clarity about what success looks like, enables objective progress assessment, and increases the likelihood of achieving desired outcomes."
  },
  {
    id: 'joinery-l3-planning31',
    question: "What is the purpose of a material take-off in joinery project planning?",
    options: ["To remove excess material from the site", "To quantify the exact materials needed based on project drawings and specifications", "To determine which materials cannot be used", "To schedule material delivery trucks"],
    correctAnswer: "To quantify the exact materials needed based on project drawings and specifications",
    explanation: "A material take-off quantifies materials needed based on drawings and specifications. This detailed inventory identifies types, dimensions, quantities, and grades required, allowing accurate cost estimation, efficient procurement planning, and waste minimization through optimal purchasing and cutting plans."
  },
  {
    id: 'joinery-l3-planning32',
    question: "What is the primary purpose of a pre-installation meeting for joinery work?",
    options: ["Only to meet other trades", "Only to check if payment has been received", "To coordinate site access, sequence of work, protection requirements, and interfaces with other trades", "Only to promote additional services"],
    correctAnswer: "To coordinate site access, sequence of work, protection requirements, and interfaces with other trades",
    explanation: "Pre-installation meetings coordinate site access, work sequencing, protection requirements, and interfaces with other trades. They confirm site readiness, establish communication protocols, review critical requirements, coordinate logistics, and align everyone's understanding of the installation process before work begins."
  },
  {
    id: 'joinery-l3-planning33',
    question: "What is value engineering in joinery project planning?",
    options: ["Increasing the price to increase profit margins", "Making everything at the lowest possible cost regardless of quality", "A systematic approach to providing the necessary functions at the lowest total cost while maintaining performance requirements", "Adding decorative elements to increase perceived value"],
    correctAnswer: "A systematic approach to providing the necessary functions at the lowest total cost while maintaining performance requirements",
    explanation: "Value engineering is a systematic approach to providing necessary functions at the lowest total cost while maintaining performance requirements. It analyzes design, materials, and methods to optimize value by enhancing function or reducing cost without sacrificing quality, durability, or appearance requirements."
  },
  {
    id: 'joinery-l3-planning34',
    question: "What is the purpose of a logistics plan for joinery installation?",
    options: ["Only to hire vehicles", "Only to determine parking locations", "To coordinate the movement of materials, equipment, and personnel to and around the site efficiently and safely", "Only to calculate fuel costs"],
    correctAnswer: "To coordinate the movement of materials, equipment, and personnel to and around the site efficiently and safely",
    explanation: "A logistics plan coordinates movement of materials, equipment, and personnel to and around the site efficiently and safely. It addresses transportation, delivery scheduling, storage requirements, material handling methods, access routes, lifting equipment needs, and waste management to ensure smooth operations."
  },
  {
    id: 'joinery-l3-planning35',
    question: "What is the purpose of a handover plan for completed joinery work?",
    options: ["Only to collect final payment", "Only to take photographs of the finished work", "To ensure a smooth transition from the installation team to the client or end-user", "Only to have the client sign a completion certificate"],
    correctAnswer: "To ensure a smooth transition from the installation team to the client or end-user",
    explanation: "A handover plan ensures smooth transition from the installation team to the client or end-user. It details inspection procedures, documentation requirements, training to be provided, demonstration of features, warranty information, maintenance guidance, and formal acceptance processes."
  },
  {
    id: 'joinery-l3-planning36',
    question: "What is the purpose of a staged completion strategy for large joinery projects?",
    options: ["Only to get earlier payment", "Only to have multiple opening ceremonies", "To divide the project into manageable phases that can be completed and handed over sequentially", "Only to extend the project timeline"],
    correctAnswer: "To divide the project into manageable phases that can be completed and handed over sequentially",
    explanation: "Staged completion divides large projects into manageable phases that can be completed and handed over sequentially. This approach allows partial occupation or use, spreads resource requirements more evenly, facilitates earlier revenue generation, simplifies quality control, and reduces risk through incremental delivery."
  },
  {
    id: 'joinery-l3-planning37',
    question: "What is the purpose of a resource smoothing technique in joinery project planning?",
    options: ["To make resources more physically smooth", "To reduce the quality of resources", "To adjust the project schedule to create a more consistent level of resource usage without extending the end date", "To replace human resources with machines"],
    correctAnswer: "To adjust the project schedule to create a more consistent level of resource usage without extending the end date",
    explanation: "Resource smoothing adjusts the project schedule to create more consistent resource usage without extending the end date. It utilizes float in non-critical activities to reduce resource peaks and valleys, creating more uniform resource utilization and avoiding inefficient fluctuations in staffing or equipment needs."
  },
  {
    id: 'joinery-l3-planning38',
    question: "What is a key benefit of using standardized templates for joinery project documentation?",
    options: ["They eliminate the need for project management software", "They make all projects look identical", "They improve efficiency, ensure consistency, and help capture all necessary information", "They prevent customization for specific client needs"],
    correctAnswer: "They improve efficiency, ensure consistency, and help capture all necessary information",
    explanation: "Standardized templates improve efficiency, ensure consistency, and help capture all necessary information. They reduce document creation time, establish common formats that facilitate communication, incorporate best practices and lessons learned, and help prevent important details from being overlooked."
  },
  {
    id: 'joinery-l3-planning39',
    question: "What is the primary purpose of a pre-manufacturing review meeting for joinery projects?",
    options: ["Only to assign workers to machines", "Only to schedule overtime if needed", "To verify that designs, specifications, and production plans are complete and aligned before manufacturing begins", "Only to determine material costs"],
    correctAnswer: "To verify that designs, specifications, and production plans are complete and aligned before manufacturing begins",
    explanation: "Pre-manufacturing review meetings verify that designs, specifications, and production plans are complete and aligned before manufacturing begins. They confirm all technical details are finalized, identify potential manufacturing issues, ensure required resources are available, and establish clear quality standards and inspection points."
  },
  {
    id: 'joinery-l3-planning40',
    question: "What is the purpose of a phased procurement strategy for joinery materials?",
    options: ["To always buy materials from different suppliers", "To confuse suppliers about the total order volume", "To schedule material purchases and deliveries in alignment with the production sequence, reducing storage requirements and capital tied up in inventory", "To always order in small quantities regardless of economics"],
    correctAnswer: "To schedule material purchases and deliveries in alignment with the production sequence, reducing storage requirements and capital tied up in inventory",
    explanation: "Phased procurement schedules material purchases and deliveries in alignment with the production sequence. This reduces storage requirements, minimizes capital tied up in inventory, decreases risk of damage to stored materials, and provides flexibility to accommodate design or specification changes for later phases."
  },
  {
    id: 'joinery-l3-planning41',
    question: "What is the purpose of a project kickoff meeting for a joinery project?",
    options: ["Only to celebrate winning the contract", "Only to distribute project documents", "To introduce team members, review project objectives and plans, clarify roles, and establish working relationships", "Only to set up email distribution lists"],
    correctAnswer: "To introduce team members, review project objectives and plans, clarify roles, and establish working relationships",
    explanation: "Project kickoff meetings introduce team members, review objectives and plans, clarify roles, and establish working relationships. They create shared understanding of the project's purpose, scope, and success criteria; establish communication protocols; identify initial concerns; and build team cohesion."
  },
  {
    id: 'joinery-l3-planning42',
    question: "What is the purpose of a risk register in joinery project management?",
    options: ["Only to comply with insurance requirements", "Only to document accidents after they happen", "To document identified risks, their probability and impact, planned responses, and current status", "Only to record health and safety risks"],
    correctAnswer: "To document identified risks, their probability and impact, planned responses, and current status",
    explanation: "A risk register documents identified risks, their probability and impact, planned responses, and current status. This living document serves as a central repository for risk information, tracks mitigation actions, facilitates regular risk reviews, and provides historical data to inform future risk assessments."
  },
  {
    id: 'joinery-l3-planning43',
    question: "What is the purpose of a progressive elaboration approach to joinery project planning?",
    options: ["To deliberately make plans more complicated", "To continuously add new project objectives", "To iteratively develop plans in increasing detail as more information becomes available", "To progressively eliminate tasks from the project scope"],
    correctAnswer: "To iteratively develop plans in increasing detail as more information becomes available",
    explanation: "Progressive elaboration iteratively develops plans in increasing detail as more information becomes available. This approach recognizes that complete information is rarely available at project initiation, allowing planning to evolve through successive stages, from high-level frameworks to detailed implementation plans."
  },
  {
    id: 'joinery-l3-planning44',
    question: "What is the purpose of buffer time in critical chain project management for joinery?",
    options: ["To allow workers to take longer breaks", "To compensate for poor productivity", "To protect the project completion date from uncertainty by aggregating contingency time at strategic points", "To extend the project timeline unnecessarily"],
    correctAnswer: "To protect the project completion date from uncertainty by aggregating contingency time at strategic points",
    explanation: "Buffer time protects the project completion date from uncertainty by aggregating contingency time at strategic points. Rather than padding individual task estimates, critical chain methodology places buffers at the end of task chains and the project, creating more realistic schedules while maintaining protection against variations."
  },
  {
    id: 'joinery-l3-planning45',
    question: "What is the purpose of a project management information system (PMIS) for joinery projects?",
    options: ["Only to create pretty charts for clients", "Only to track employee attendance", "To provide integrated tools for planning, tracking, communicating, and storing project information", "Only to calculate project costs"],
    correctAnswer: "To provide integrated tools for planning, tracking, communicating, and storing project information",
    explanation: "A PMIS provides integrated tools for planning, tracking, communicating, and storing project information. These systems typically include scheduling, resource management, cost control, document management, communication, and reporting capabilities to support informed decision-making and effective project execution."
  },
  {
    id: 'joinery-l3-planning46',
    question: "What is the primary purpose of a closeout report for a joinery project?",
    options: ["Only to announce the project is finished", "Only to calculate final costs", "To document final performance, administrative closure information, lessons learned, and archived project information", "Only to list team members who worked on the project"],
    correctAnswer: "To document final performance, administrative closure information, lessons learned, and archived project information",
    explanation: "A closeout report documents final performance, administrative closure information, lessons learned, and archived project information. It provides a comprehensive record of project accomplishments and challenges, ensuring organizational knowledge retention, facilitating project evaluation, and supporting future improvement efforts."
  },
  {
    id: 'joinery-l3-planning47',
    question: "What is the purpose of developing a capacity plan for a joinery workshop?",
    options: ["Only to determine how many people can physically fit in the workshop", "Only to plan lunch break schedules", "To ensure sufficient production capacity is available to meet projected demand across multiple projects", "Only to determine maximum material storage volume"],
    correctAnswer: "To ensure sufficient production capacity is available to meet projected demand across multiple projects",
    explanation: "Capacity planning ensures sufficient production capacity is available to meet projected demand across multiple projects. It balances available resources (labor, equipment, space) against workload requirements, identifies potential bottlenecks, and informs decisions about resource acquisition, overtime, subcontracting, or schedule adjustments."
  },
  {
    id: 'joinery-l3-planning48',
    question: "What is the purpose of a decision log in joinery project management?",
    options: ["Only to record who attended meetings", "Only to document client indecisiveness", "To maintain a record of significant decisions, including their context, rationale, and implications", "Only to track financial decisions"],
    correctAnswer: "To maintain a record of significant decisions, including their context, rationale, and implications",
    explanation: "A decision log maintains a record of significant decisions, including their context, rationale, and implications. This provides project history, accountability, and traceability; prevents revisiting closed issues; supports communication of decisions to stakeholders; and serves as a reference when questions arise about past choices."
  },
  {
    id: 'joinery-l3-planning49',
    question: "What is the purpose of a production sequencing plan in joinery manufacturing?",
    options: ["Only to determine which employees work which shifts", "Only to decide which machines to purchase", "To determine the optimal order for manufacturing components to maximize efficiency and meet deadlines", "Only to sequence coffee breaks"],
    correctAnswer: "To determine the optimal order for manufacturing components to maximize efficiency and meet deadlines",
    explanation: "Production sequencing determines the optimal order for manufacturing components to maximize efficiency and meet deadlines. It considers machine setup requirements, material characteristics, processing times, tool availability, and interdependencies between components to minimize production time and resource conflicts."
  },
  {
    id: 'joinery-l3-planning50',
    question: "What is the purpose of an issue management process in joinery project planning?",
    options: ["Only to document complaints", "Only to track worker disputes", "To identify, document, analyze, and resolve problems that might impact project objectives", "Only to comply with ISO certification"],
    correctAnswer: "To identify, document, analyze, and resolve problems that might impact project objectives",
    explanation: "An issue management process identifies, documents, analyzes, and resolves problems that might impact project objectives. It provides a structured approach to capturing issues when they arise, assigning responsibility for resolution, tracking progress, and ensuring issues are addressed before they become critical problems."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-planning', 'items', q.id), {
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