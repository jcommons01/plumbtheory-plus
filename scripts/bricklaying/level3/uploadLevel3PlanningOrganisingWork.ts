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

// ✅ Bricklaying Level 3 Planning & Organising Work Questions
const questions = [
  {
    id: 'bricklaying-l3-topic3-1',
    question: "What is the primary purpose of a construction project programme?",
    options: ["To calculate material costs", "To record workers' attendance", "To establish the sequence and timing of construction activities", "To document health and safety incidents"],
    correctAnswer: "To establish the sequence and timing of construction activities",
    explanation: "A construction project programme establishes the sequence and timing of construction activities. It defines start and finish dates, identifies critical path tasks, allocates resources appropriately, and enables effective coordination between trades. The programme serves as a roadmap for the entire project, allowing for monitoring progress and identifying potential delays early."
  },
  {
    id: 'bricklaying-l3-topic3-2',
    question: "What is the 'critical path' in a construction schedule?",
    options: ["The most expensive sequence of tasks", "The sequence of tasks with the highest safety risks", "The shortest possible construction timeframe", "The sequence of activities that determines the minimum project duration"],
    correctAnswer: "The sequence of activities that determines the minimum project duration",
    explanation: "The critical path is the sequence of activities that determines the minimum project duration. Any delay to tasks on this path directly delays project completion. Critical path tasks have zero float time and must be prioritized and closely monitored. Identifying the critical path helps project managers focus resources where they most impact the overall schedule."
  },
  {
    id: 'bricklaying-l3-topic3-3',
    question: "What is the purpose of a 'method statement' in bricklaying project planning?",
    options: ["To list all materials needed", "To calculate the project budget", "To describe in detail how a specific task will be carried out safely", "To record daily work progress"],
    correctAnswer: "To describe in detail how a specific task will be carried out safely",
    explanation: "A method statement describes in detail how a specific task will be carried out safely. It provides step-by-step procedures, identifies hazards and control measures, specifies required resources and competencies, and establishes quality standards. For complex bricklaying operations, method statements ensure consistency, safety, and proper execution of specialized techniques."
  },
  {
    id: 'bricklaying-l3-topic3-4',
    question: "What does the term 'float time' refer to in construction scheduling?",
    options: ["The time spent mixing mortar", "The flexibility in start and finish times for non-critical activities", "The time allocated for site inspections", "The break time allocated to workers"],
    correctAnswer: "The flexibility in start and finish times for non-critical activities",
    explanation: "Float time refers to the flexibility in start and finish times for non-critical activities. It represents how much an activity can be delayed without affecting the project completion date. Activities with float can be rescheduled to optimize resource use or accommodate delays in other areas without impacting the overall project timeline."
  },
  {
    id: 'bricklaying-l3-topic3-5',
    question: "What information should be included in a bricklaying work package?",
    options: ["Only material requirements", "Only labor allocation", "Scope, specifications, quality requirements, schedule, and resources needed", "Only health and safety requirements"],
    correctAnswer: "Scope, specifications, quality requirements, schedule, and resources needed",
    explanation: "A bricklaying work package should include scope, specifications, quality requirements, schedule, and resources needed. It defines exactly what work is to be done, how it should be done, when it must be completed, and what resources are required. This comprehensive document ensures all aspects of the work are clearly defined for proper execution and monitoring."
  },
  {
    id: 'bricklaying-l3-topic3-6',
    question: "What is the purpose of a pre-start meeting for a bricklaying project?",
    options: ["To negotiate wages with workers", "To finalize the project budget", "To review the scope, schedule, safety requirements, and quality expectations before work begins", "To interview new staff members"],
    correctAnswer: "To review the scope, schedule, safety requirements, and quality expectations before work begins",
    explanation: "A pre-start meeting reviews the scope, schedule, safety requirements, and quality expectations before work begins. It ensures all team members understand their responsibilities, clarifies procedures, addresses potential issues, and establishes communication protocols. This meeting aligns everyone's understanding of the project goals and requirements before bricklaying operations commence."
  },
  {
    id: 'bricklaying-l3-topic3-7',
    question: "What is meant by 'sequencing' in bricklaying works?",
    options: ["Numbering each brick before installation", "Arranging bricks by size before use", "Determining the logical order of construction activities", "Recording the order in which workers arrive on site"],
    correctAnswer: "Determining the logical order of construction activities",
    explanation: "Sequencing means determining the logical order of construction activities. In bricklaying, proper sequencing ensures that prerequisite tasks (foundations, DPCs) are completed before dependent tasks (wall construction, installation of lintels). Good sequencing improves efficiency, prevents rework, maintains quality, and optimizes the use of labor, materials, and equipment on site."
  },
  {
    id: 'bricklaying-l3-topic3-8',
    question: "What is a 'lead time' in construction material procurement?",
    options: ["The time it takes to deliver materials once on site", "The time a foreman spends supervising a project", "The time between ordering materials and their delivery to site", "The warranty period for construction materials"],
    correctAnswer: "The time between ordering materials and their delivery to site",
    explanation: "Lead time is the period between ordering materials and their delivery to site. Understanding lead times is crucial for proper scheduling to ensure materials arrive when needed without causing delays. For specialized brickwork items like custom-shaped bricks or architectural features, lead times can be substantial and must be factored into the project timeline early."
  },
  {
    id: 'bricklaying-l3-topic3-9',
    question: "What is the purpose of a construction phase plan in project planning?",
    options: ["To list the workers assigned to each phase", "To document how health and safety will be managed during the construction work", "To calculate payment schedules", "To record weather conditions during construction"],
    correctAnswer: "To document how health and safety will be managed during the construction work",
    explanation: "A construction phase plan documents how health and safety will be managed during the work. Required under the CDM Regulations, it identifies major risks and specifies control measures, site rules, emergency procedures, and welfare arrangements. For bricklaying operations, it addresses specific hazards like working at height, manual handling, and exposure to hazardous substances."
  },
  {
    id: 'bricklaying-l3-topic3-10',
    question: "When planning material deliveries for bricklaying works, what is the primary consideration?",
    options: ["Ordering the lowest-cost materials only", "Ensuring the materials arrive just before they're needed", "Ordering all materials at the start of the project", "Selecting materials based only on appearance"],
    correctAnswer: "Ensuring the materials arrive just before they're needed",
    explanation: "When planning material deliveries, ensuring materials arrive just before they're needed is the primary consideration. This just-in-time approach minimizes storage requirements, reduces damage risk, prevents theft, and improves cash flow. However, it requires accurate scheduling and understanding of lead times to prevent delays while balancing against potential supply chain disruptions."
  },
  {
    id: 'bricklaying-l3-topic3-11',
    question: "What is the purpose of a 'resources histogram' in construction planning?",
    options: ["To track the age profile of the workforce", "To compare material costs from different suppliers", "To visually display resource requirements over the project timeline", "To record daily temperature changes on site"],
    correctAnswer: "To visually display resource requirements over the project timeline",
    explanation: "A resources histogram visually displays resource requirements over the project timeline. This chart shows labor, equipment, or material needs across the project duration, helping identify periods of peak demand or underutilization. For bricklaying operations, it helps plan adequate staffing, equipment allocation, and material deliveries to maintain steady workflow and avoid bottlenecks."
  },
  {
    id: 'bricklaying-l3-topic3-12',
    question: "What does 'buildability' refer to in construction planning?",
    options: ["The strength of the completed structure", "The ease with which a design can be constructed effectively and safely", "The cost of the building materials", "The speed at which a structure can be demolished"],
    correctAnswer: "The ease with which a design can be constructed effectively and safely",
    explanation: "Buildability refers to the ease with which a design can be constructed effectively and safely. It considers practicality of construction methods, material availability, worker skills required, access conditions, and efficiency. For complex brickwork, assessing buildability early helps identify potential challenges, alternative approaches, and necessary resources before construction begins."
  },
  {
    id: 'bricklaying-l3-topic3-13',
    question: "What is a Gang Chart (or Squad Chart) used for in bricklaying projects?",
    options: ["Recording disciplinary issues among workers", "Tracking the movement of worker gangs between different sites", "Planning and visualizing the allocation of work gangs to different areas or tasks", "Calculating bonus payments for teams"],
    correctAnswer: "Planning and visualizing the allocation of work gangs to different areas or tasks",
    explanation: "A Gang Chart plans and visualizes the allocation of work gangs to different areas or tasks. It shows which teams work where and when, helping optimize workforce distribution and preventing trade stacking. For bricklaying operations, it ensures proper sequencing of work areas, maintains productivity, and helps coordinate with other trades."
  },
  {
    id: 'bricklaying-l3-topic3-14',
    question: "What is the purpose of a 'handover plan' in a construction project?",
    options: ["To document the process for transferring the completed work to the client", "To assign different workers to hold different tools", "To plan how to physically hand materials up scaffolding", "To determine which tasks to subcontract"],
    correctAnswer: "To document the process for transferring the completed work to the client",
    explanation: "A handover plan documents the process for transferring the completed work to the client. It establishes the requirements, documentation, inspections, and procedures needed for formal project completion and acceptance. For bricklaying works, this includes quality checks, addressing defects, providing maintenance information, and ensuring compliance with specifications before client acceptance."
  },
  {
    id: 'bricklaying-l3-topic3-15',
    question: "What is meant by the term 'front-loading' in construction planning?",
    options: ["Placing heavier materials at the front of the site", "Scheduling more activities at the beginning of the project", "Allocating more workers to morning shifts", "Positioning materials at the front of scaffolding platforms"],
    correctAnswer: "Scheduling more activities at the beginning of the project",
    explanation: "Front-loading means scheduling more activities at the beginning of the project. This approach creates float time later in the project, allows early identification of issues, and provides buffer against future delays. In bricklaying projects, front-loading may involve prioritizing critical material procurement, mock-ups, or establishing work standards early to benefit later project stages."
  },
  {
    id: 'bricklaying-l3-topic3-16',
    question: "What is a 'variation order' in construction project management?",
    options: ["A document describing different brick patterns", "A formal instruction to change the scope, design, or specifications of the work", "An order to vary the working hours of the site", "A method of arranging bricks in different colors"],
    correctAnswer: "A formal instruction to change the scope, design, or specifications of the work",
    explanation: "A variation order is a formal instruction to change the scope, design, or specifications of the work. It documents agreed modifications to the original contract, including any adjustments to time, cost, or resources. For bricklaying works, variations might include changes to brick types, bond patterns, additional features, or altered dimensions requiring proper documentation and approval."
  },
  {
    id: 'bricklaying-l3-topic3-17',
    question: "What is the purpose of a 'look-ahead schedule' in project planning?",
    options: ["To plan for future projects after the current one is complete", "To anticipate weather conditions", "To detail and focus on activities in the immediate future (typically 2-6 weeks)", "To schedule site inspections by regulatory authorities"],
    correctAnswer: "To detail and focus on activities in the immediate future (typically 2-6 weeks)",
    explanation: "A look-ahead schedule details activities in the immediate future (typically 2-6 weeks). It's more detailed than the master schedule, identifying specific tasks, resources, and constraints for the coming weeks. For bricklaying operations, it helps coordinate material deliveries, labor allocation, equipment needs, and interfaces with other trades to ensure smooth workflow."
  },
  {
    id: 'bricklaying-l3-topic3-18',
    question: "What is a 'snag list' in construction project management?",
    options: ["A list of materials that pose snagging hazards to workers' clothing", "A list of defects or incomplete items that need to be addressed", "A list of problematic workers on site", "A list of tools that require repair"],
    correctAnswer: "A list of defects or incomplete items that need to be addressed",
    explanation: "A snag list documents defects or incomplete items that need to be addressed before project completion. Created during inspections near project end, it ensures all work meets required quality standards before handover. For bricklaying, typical snags include mortar smears, damaged bricks, incorrect joint finishes, or alignment issues that must be remedied before client acceptance."
  },
  {
    id: 'bricklaying-l3-topic3-19',
    question: "What is the purpose of 'resource leveling' in construction scheduling?",
    options: ["Ensuring all workers have equal skill levels", "Making sure materials are stored on level surfaces", "Adjusting the project schedule to optimize resource utilization and avoid peaks and troughs", "Leveling the ground before construction begins"],
    correctAnswer: "Adjusting the project schedule to optimize resource utilization and avoid peaks and troughs",
    explanation: "Resource leveling adjusts the project schedule to optimize resource utilization and avoid peaks and troughs. It aims to create a more consistent demand for resources by shifting non-critical activities within their float periods. For bricklaying operations, this prevents situations where too many or too few bricklayers are needed at different project stages."
  },
  {
    id: 'bricklaying-l3-topic3-20',
    question: "What is the benefit of using Work Breakdown Structure (WBS) in planning bricklaying operations?",
    options: ["It specifies which bricks will break during transport", "It divides the project into smaller, manageable components", "It determines which workers should take breaks at different times", "It calculates how to break down the cost for each client"],
    correctAnswer: "It divides the project into smaller, manageable components",
    explanation: "A Work Breakdown Structure divides the project into smaller, manageable components. It creates a hierarchical decomposition of the total scope, organizing work into logical sections and subsections. For bricklaying projects, a WBS might separate work by building sections, floor levels, or construction elements, making planning, estimating, and monitoring more accurate and focused."
  },
  {
    id: 'bricklaying-l3-topic3-21',
    question: "When determining the quantity of bricks needed for a project, what allowance should typically be added for waste and breakages?",
    options: ["2-3%", "5-10%", "15-20%", "25-30%"],
    correctAnswer: "5-10%",
    explanation: "A 5-10% allowance for waste and breakages is typically added when calculating brick quantities. This accounts for cutting waste, damaged bricks, and minor design adjustments. The exact percentage depends on the complexity of the brickwork, with higher allowances for projects involving numerous cuts, complex bonds, or curved walls that generate more waste."
  },
  {
    id: 'bricklaying-l3-topic3-22',
    question: "What is a 'milestone' in a construction program?",
    options: ["A marker placed every 1000 meters on site", "A significant achievement or event marking the completion of a major deliverable", "A payment point in the contract", "A stone used to mark the site boundary"],
    correctAnswer: "A significant achievement or event marking the completion of a major deliverable",
    explanation: "A milestone is a significant achievement marking the completion of a major deliverable. These key checkpoints in the schedule indicate important transitions, completions, or decision points. For bricklaying projects, milestones might include completion of foundations, reaching DPC level, topping out walls, or finishing specific building sections, providing clear progress indicators."
  },
  {
    id: 'bricklaying-l3-topic3-23',
    question: "What is the primary purpose of a 'site layout plan' in construction planning?",
    options: ["To show the interior layout of the building", "To record where employees should park", "To optimize the arrangement of temporary facilities, access routes, material storage, and plant", "To identify locations of historical interest on the site"],
    correctAnswer: "To optimize the arrangement of temporary facilities, access routes, material storage, and plant",
    explanation: "A site layout plan optimizes the arrangement of temporary facilities, access routes, material storage areas, and plant locations. It maximizes efficiency by reducing unnecessary movement and ensuring logical positioning of elements. For bricklaying operations, it establishes convenient locations for brick and mortar storage, mixing stations, cutting areas, and waste management to minimize carrying distances and enhance productivity."
  },
  {
    id: 'bricklaying-l3-topic3-24',
    question: "What information would a 'labor histogram' provide for a bricklaying project?",
    options: ["Worker age distribution", "Worker height distribution", "The number of workers required at different stages of the project", "The historical employment record of each bricklayer"],
    correctAnswer: "The number of workers required at different stages of the project",
    explanation: "A labor histogram shows the number of workers required at different stages of the project. This graphical representation displays workforce needs over time, helping identify peaks and troughs in labor demand. For bricklaying projects, it enables better planning of crew sizes, recruitment timing, and resource allocation to maintain consistent workflow and avoid bottlenecks or excessive labor costs."
  },
  {
    id: 'bricklaying-l3-topic3-25',
    question: "What is the purpose of a 'procurement schedule' in construction planning?",
    options: ["To record the cost of all purchases", "To plan and track the timely ordering, delivery, and storage of materials and equipment", "To establish which workers will procure tools", "To determine which suppliers to exclude from future projects"],
    correctAnswer: "To plan and track the timely ordering, delivery, and storage of materials and equipment",
    explanation: "A procurement schedule plans and tracks the timely ordering, delivery, and storage of materials and equipment. It identifies what needs to be procured, when orders must be placed considering lead times, and when materials should arrive on site. For bricklaying projects, it ensures critical items like special bricks, lintels, and DPC materials are available when needed without causing delays."
  },
  {
    id: 'bricklaying-l3-topic3-26',
    question: "What is a 'trade package' in construction project planning?",
    options: ["A gift presented to workers upon project completion", "A bundle of tools provided to each worker", "A defined scope of work for a specific trade or subcontractor", "A package of trade magazines for site reference"],
    correctAnswer: "A defined scope of work for a specific trade or subcontractor",
    explanation: "A trade package is a defined scope of work for a specific trade or subcontractor. It clearly identifies the responsibilities, specifications, schedule, and deliverables for that trade. For bricklaying, a trade package would detail all masonry work required, including wall types, bonds, special features, quality standards, and interfaces with other trades to ensure comprehensive understanding of requirements."
  },
  {
    id: 'bricklaying-l3-topic3-27',
    question: "What is a 'short-term look-ahead program' typically used for?",
    options: ["Planning work after project completion", "Detailed planning of activities in the next 2-4 weeks", "Predicting long-term weather patterns", "Arranging short breaks for workers"],
    correctAnswer: "Detailed planning of activities in the next 2-4 weeks",
    explanation: "A short-term look-ahead program provides detailed planning of activities for the next 2-4 weeks. More specific than the master schedule, it identifies daily tasks, resource requirements, and constraints. For bricklaying operations, it coordinates material deliveries, crew assignments, equipment needs, and interactions with other trades to ensure efficient workflow and prevent delays."
  },
  {
    id: 'bricklaying-l3-topic3-28',
    question: "What is meant by 'fast-tracking' in construction scheduling?",
    options: ["Using accelerated mortar additives", "Hiring the fastest workers available", "Overlapping phases that would normally be done in sequence", "Reducing the quality requirements to save time"],
    correctAnswer: "Overlapping phases that would normally be done in sequence",
    explanation: "Fast-tracking means overlapping phases that would normally be done in sequence. This technique compresses the schedule by starting activities before their predecessors are completely finished. In bricklaying projects, it might involve beginning upper-floor masonry before lower floors are entirely complete, requiring careful coordination to ensure prerequisites (structural support, services) are sufficiently advanced to support the accelerated timeline."
  },
  {
    id: 'bricklaying-l3-topic3-29',
    question: "What is a 'progress curve' (S-curve) used for in construction projects?",
    options: ["Measuring the curvature of arched brickwork", "Tracking and forecasting project progress against planned progress", "Determining the learning rate of new workers", "Designing curved walls"],
    correctAnswer: "Tracking and forecasting project progress against planned progress",
    explanation: "A progress curve (S-curve) tracks and forecasts project progress against planned progress. This graphical tool plots cumulative progress over time, typically showing an S-shaped curve with slower progress at start and end, faster in the middle. For bricklaying projects, it helps visualize actual versus planned progress in terms of wall area completed, materials used, or value of work done."
  },
  {
    id: 'bricklaying-l3-topic3-30',
    question: "What is the primary purpose of a 'pre-construction risk assessment'?",
    options: ["To identify potential structural failures", "To identify and mitigate health and safety risks before work begins", "To prevent financial losses", "To assess worker competence"],
    correctAnswer: "To identify and mitigate health and safety risks before work begins",
    explanation: "A pre-construction risk assessment identifies and mitigates health and safety risks before work begins. It analyzes hazards specific to the planned construction activities and site conditions, evaluating their likelihood and potential severity. For bricklaying operations, it addresses risks like working at height, manual handling, exposure to cement, noise from cutting, and site-specific hazards, establishing control measures before work commences."
  },
  {
    id: 'bricklaying-l3-topic3-31',
    question: "What is a 'bill of quantities' in construction planning?",
    options: ["A list of workers' qualifications", "A list of regulations applicable to the project", "A detailed list of materials, labor, and costs for each element of construction", "A record of material quality issues"],
    correctAnswer: "A detailed list of materials, labor, and costs for each element of construction",
    explanation: "A bill of quantities provides a detailed list of materials, labor, and costs for each construction element. It quantifies all aspects of the project in a structured format, serving as a basis for estimating, tendering, and cost control. For bricklaying, it specifies wall areas, brick types and quantities, mortar requirements, and associated elements like lintels and DPCs, enabling accurate pricing and resource planning."
  },
  {
    id: 'bricklaying-l3-topic3-32',
    question: "What is the purpose of 'value engineering' in construction planning?",
    options: ["Calculating the financial value of the building", "Analyzing and optimizing the relationship between function, quality, and cost", "Determining the most valuable materials to use", "Identifying which elements should be built first"],
    correctAnswer: "Analyzing and optimizing the relationship between function, quality, and cost",
    explanation: "Value engineering analyzes and optimizes the relationship between function, quality, and cost. It seeks to maximize value by achieving essential functions at the lowest total cost without sacrificing quality. For bricklaying projects, it might involve evaluating alternative brick types, bond patterns, or construction methods that maintain design intent and performance while reducing cost or improving constructability."
  },
  {
    id: 'bricklaying-l3-topic3-33',
    question: "What is 'resource aggregation' in construction planning?",
    options: ["Combining different types of cement aggregates", "Summing up the total resources required across the entire project", "Gathering all workers in one area", "Storing all materials in a central location"],
    correctAnswer: "Summing up the total resources required across the entire project",
    explanation: "Resource aggregation involves summing up the total resources required across the entire project. This process identifies overall resource needs and demand patterns over time. For bricklaying projects, aggregating requirements for bricklayers, laborers, materials, and equipment helps determine peak demands, plan recruitment, schedule deliveries, and negotiate bulk purchasing to optimize costs and ensure adequate resource availability."
  },
  {
    id: 'bricklaying-l3-topic3-34',
    question: "What is 'productivity tracking' used for in bricklaying projects?",
    options: ["Monitoring worker attendance", "Measuring and analyzing work output rates to improve efficiency and forecasting", "Tracking brick production at manufacturing plants", "Monitoring the speed of mortar curing"],
    correctAnswer: "Measuring and analyzing work output rates to improve efficiency and forecasting",
    explanation: "Productivity tracking measures and analyzes work output rates to improve efficiency and forecasting. It monitors metrics like bricks laid per day or square meters completed per labor-hour. This data helps identify factors affecting productivity, set realistic targets, assess performance, improve scheduling accuracy, and implement efficiency improvements through better methods, materials, or equipment."
  },
  {
    id: 'bricklaying-l3-topic3-35',
    question: "What does 'sequential liability' refer to in construction contracts?",
    options: ["The order in which different parties can be sued", "A payment arrangement where subcontractors are paid after the main contractor receives payment", "A sequence of liability insurance policies", "The liability for sequential building failures"],
    correctAnswer: "A payment arrangement where subcontractors are paid after the main contractor receives payment",
    explanation: "Sequential liability refers to a payment arrangement where subcontractors are paid after the main contractor receives payment from the client. This 'pay when paid' approach affects cash flow planning for bricklaying subcontractors, who must manage finances to cover wages and material costs before receiving payment. Modern contracts often prohibit or limit such clauses, but understanding payment terms remains crucial for proper financial planning."
  },
  {
    id: 'bricklaying-l3-topic3-36',
    question: "What is a 'schedule of rates' in construction contracting?",
    options: ["A list of hourly wages for different workers", "A document listing pre-agreed rates for specified items or units of work", "A schedule showing when rates of work should increase", "A timetable for rate negotiations"],
    correctAnswer: "A document listing pre-agreed rates for specified items or units of work",
    explanation: "A schedule of rates lists pre-agreed rates for specified items or units of work. It establishes fixed prices for standard work elements that can be applied to variable quantities. For bricklaying, it might specify rates per square meter of different wall types, linear meter of features like copings, or per-unit rates for special elements, providing a clear basis for valuing work and variations."
  },
  {
    id: 'bricklaying-l3-topic3-37',
    question: "What is the purpose of 'earned value analysis' in project management?",
    options: ["Calculating worker bonuses", "Tracking actual costs only", "Measuring project performance and progress in an objective manner", "Determining the value of materials left on site"],
    correctAnswer: "Measuring project performance and progress in an objective manner",
    explanation: "Earned value analysis measures project performance and progress objectively. It integrates scope, schedule, and cost metrics to evaluate progress against the plan. For bricklaying projects, it compares the planned value of work scheduled with the earned value of work completed and the actual cost incurred, providing early warning of performance issues and enabling corrective actions before problems escalate."
  },
  {
    id: 'bricklaying-l3-topic3-38',
    question: "What is the primary purpose of a 'quality control plan' for bricklaying works?",
    options: ["To maximize profit margins", "To establish procedures for inspecting and ensuring work meets required standards", "To record employee qualifications", "To control the quantity of bricks used"],
    correctAnswer: "To establish procedures for inspecting and ensuring work meets required standards",
    explanation: "A quality control plan establishes procedures for inspecting and ensuring work meets required standards. It defines quality criteria, testing methods, inspection frequencies, documentation requirements, and remedial procedures. For bricklaying, it typically includes checkpoints for line, level, plumb, joint consistency, bonding pattern, and material compliance, establishing a systematic approach to achieving and verifying quality workmanship."
  },
  {
    id: 'bricklaying-l3-topic3-39',
    question: "What are 'holding points' in a quality inspection process?",
    options: ["Points where materials are held in storage", "Stages where work must stop until an inspection has been completed and approved", "Points in the structure that hold the most weight", "Financial reserves held until project completion"],
    correctAnswer: "Stages where work must stop until an inspection has been completed and approved",
    explanation: "Holding points are stages where work must stop until an inspection has been completed and approved. They represent critical quality checkpoints where independent verification is required before proceeding. For bricklaying, common holding points include foundation level inspection, DPC installation, cavity wall ties placement, and structural openings formation, ensuring that crucial elements are correct before they're concealed by subsequent work."
  },
  {
    id: 'bricklaying-l3-topic3-40',
    question: "What is the purpose of a 'lessons learned register' in construction management?",
    options: ["To document training sessions conducted", "To record worker certifications", "To capture experiences and insights from the project that can be applied to future work", "To list educational requirements for advancement"],
    correctAnswer: "To capture experiences and insights from the project that can be applied to future work",
    explanation: "A lessons learned register captures experiences and insights from the project that can be applied to future work. It documents what went well, what didn't, and recommendations for improvement. For bricklaying operations, this might include effective techniques for complex details, material performance observations, productivity factors, or coordination strategies with other trades, creating an organizational knowledge base that prevents repeating mistakes."
  },
  {
    id: 'bricklaying-l3-topic3-41',
    question: "What is 'task allocation' in managing a bricklaying team?",
    options: ["Distributing lunch breaks among workers", "Assigning specific responsibilities to team members based on their skills and experience", "Allocating tools to workers", "Distributing safety equipment"],
    correctAnswer: "Assigning specific responsibilities to team members based on their skills and experience",
    explanation: "Task allocation involves assigning specific responsibilities to team members based on their skills and experience. Effective allocation matches tasks to abilities, distributes work fairly, promotes skill development, and maximizes efficiency. For bricklaying teams, this might involve assigning more experienced bricklayers to complex features while allocating straightforward sections to less experienced members with appropriate supervision."
  },
  {
    id: 'bricklaying-l3-topic3-42',
    question: "What is meant by 'interfaces' in construction planning?",
    options: ["Computer systems used on site", "The points where different trades or work packages meet and interact", "The different faces of a brick", "Communication devices between workers"],
    correctAnswer: "The points where different trades or work packages meet and interact",
    explanation: "Interfaces are points where different trades or work packages meet and interact. These critical junctions require careful coordination to ensure compatibility and continuity. For bricklaying, interfaces include connections with structural elements, window and door installations, service penetrations, and junctions with other wall types, requiring clear communication and planning to avoid conflicts and rework."
  },
  {
    id: 'bricklaying-l3-topic3-43',
    question: "What is a GANTT chart used for in construction planning?",
    options: ["Analyzing soil conditions", "Visually representing the project schedule showing tasks, durations, and dependencies", "Calculating material quantities", "Creating architectural drawings"],
    correctAnswer: "Visually representing the project schedule showing tasks, durations, and dependencies",
    explanation: "A GANTT chart visually represents the project schedule showing tasks, durations, and dependencies on a timeline. This bar chart format makes it easy to see what work is scheduled when, how long activities will take, and how they relate to each other. For bricklaying projects, GANTT charts help visualize the sequence of activities, identify critical paths, and show interfaces with other trades."
  },
  {
    id: 'bricklaying-l3-topic3-44',
    question: "What does 'resource smoothing' aim to achieve in project planning?",
    options: ["Making cement mixes smoother", "Reducing the total project duration", "Minimizing fluctuations in resource usage while maintaining the project end date", "Ensuring all materials have smooth surfaces"],
    correctAnswer: "Minimizing fluctuations in resource usage while maintaining the project end date",
    explanation: "Resource smoothing aims to minimize fluctuations in resource usage while maintaining the project end date. Unlike resource leveling, it doesn't extend the schedule but adjusts activities within their float to create a more consistent resource demand pattern. For bricklaying operations, smoothing helps maintain stable crew sizes and equipment needs, avoiding inefficient peaks and troughs in resource requirements."
  },
  {
    id: 'bricklaying-l3-topic3-45',
    question: "What is a 'progress meeting' in construction project management?",
    options: ["A meeting to discuss progressive political views", "A meeting to evaluate worker advancement opportunities", "A regular meeting to review project status, address issues, and coordinate upcoming work", "A meeting only held when progress is unsatisfactory"],
    correctAnswer: "A regular meeting to review project status, address issues, and coordinate upcoming work",
    explanation: "A progress meeting is a regular gathering to review project status, address issues, and coordinate upcoming work. Typically held weekly or biweekly, these meetings bring together key stakeholders to discuss completed work, current activities, schedule adherence, resource issues, and upcoming challenges. For bricklaying operations, progress meetings ensure coordination with other trades, timely resolution of technical questions, and alignment on quality expectations."
  },
  {
    id: 'bricklaying-l3-topic3-46',
    question: "What is meant by 'mobilization' in the construction planning process?",
    options: ["Moving materials around the site", "The process of assembling resources and preparing to begin construction work on site", "Making the building walls mobile", "Organizing transportation for workers"],
    correctAnswer: "The process of assembling resources and preparing to begin construction work on site",
    explanation: "Mobilization is the process of assembling resources and preparing to begin construction work on site. It includes establishing site facilities, bringing in equipment and materials, setting up storage areas, and organizing workforce. For bricklaying operations, mobilization involves bringing mortar mixing equipment, scaffold systems, material handling aids, secure storage for bricks, and ensuring adequate welfare facilities before productive work begins."
  },
  {
    id: 'bricklaying-l3-topic3-47',
    question: "What is a 'program of works' in construction planning?",
    options: ["A list of entertainment events for workers", "A television show about construction", "A document detailing the sequence, timing, and duration of construction activities", "A software program used for design"],
    correctAnswer: "A document detailing the sequence, timing, and duration of construction activities",
    explanation: "A program of works documents the sequence, timing, and duration of construction activities. It establishes when different elements will be built, forming the backbone of project planning and control. For bricklaying operations, the program sets milestone dates for foundation completion, wall construction phases, and finishing elements, enabling coordinated planning of labor, material deliveries, and dependencies with other trades."
  },
  {
    id: 'bricklaying-l3-topic3-48',
    question: "What is the purpose of a 'procurement strategy' in construction project planning?",
    options: ["To find the cheapest materials only", "To define the approach for acquiring all goods and services needed for the project", "To identify which suppliers to avoid", "To determine which items to procure first"],
    correctAnswer: "To define the approach for acquiring all goods and services needed for the project",
    explanation: "A procurement strategy defines the approach for acquiring all goods and services needed for the project. It establishes sourcing methods, supplier selection criteria, contract types, and purchasing procedures. For bricklaying projects, it might address strategies for bulk brick purchasing, special order items, equipment rental versus purchase decisions, and subcontracting arrangements for specialized masonry elements."
  },
  {
    id: 'bricklaying-l3-topic3-49',
    question: "What is 'demobilization' in the construction process?",
    options: ["Removing temporary facilities and resources from site upon completion", "Demolishing mobilization structures", "Discharging workers at project end", "Reducing mobility on site for safety reasons"],
    correctAnswer: "Removing temporary facilities and resources from site upon completion",
    explanation: "Demobilization involves removing temporary facilities and resources from site upon completion. This planned process includes clearing equipment, temporary structures, surplus materials, and waste while restoring any temporary modifications. For bricklaying operations, it includes removing mixing equipment, scaffold systems, storage facilities, and unused materials, followed by final cleaning to leave the site in appropriate condition for handover."
  },
  {
    id: 'bricklaying-l3-topic3-50',
    question: "What is the purpose of 'cost loading' a construction schedule?",
    options: ["Adding extra costs to increase profit", "Distributing the project budget across scheduled activities", "Calculating the heaviest loads in the structure", "Charging clients for schedule delays"],
    correctAnswer: "Distributing the project budget across scheduled activities",
    explanation: "Cost loading involves distributing the project budget across scheduled activities. This process assigns monetary values to each task in the timeline, enabling financial progress tracking, cash flow forecasting, and earned value analysis. For bricklaying projects, cost loading helps monitor financial performance against physical progress, identifying cost variances early and providing data for accurate monthly valuations and payment applications."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-planning-organising-work', 'items', q.id), {
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