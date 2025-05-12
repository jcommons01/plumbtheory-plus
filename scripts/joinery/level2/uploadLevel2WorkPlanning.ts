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
    options: ["To calculate the project cost only", "To determine how many people will be needed for the job", "To record the exact dimensions of each component and optimize material usage", "To estimate how long the project will take to complete"],
    correctAnswer: "To record the exact dimensions of each component and optimize material usage",
    explanation: "The primary purpose of creating a cutting list for a joinery project is to record the exact dimensions of each component and optimize material usage. A comprehensive cutting list typically includes component names, quantities, finished dimensions (length, width, thickness), material specifications, and sometimes cutting allowances for machining. This detailed inventory serves multiple essential functions: it ensures all required components are accounted for; enables efficient material ordering with minimal waste; facilitates organized production; and provides a reference document for quality control. In UK joinery workshops, cutting lists are typically derived from technical drawings and form a critical link between design and production. Accurate cutting lists help prevent costly material shortages or errors during manufacturing and contribute significantly to project profitability through optimized material usage."
  },
  {
    id: 'joinery-l2-work-planning2',
    question: "When setting out a staircase, which of the following regulations must be adhered to?",
    options: ["The staircase must always be made of hardwood", "The rise and going measurements must comply with Building Regulations", "The staircase must always include a half landing", "The width must always be at least 1.2 meters"],
    correctAnswer: "The rise and going measurements must comply with Building Regulations",
    explanation: "When setting out a staircase, the rise and going measurements must comply with Building Regulations. In the UK, Approved Document K provides specific requirements: for private stairs, the maximum rise is 220mm and minimum going is 220mm; the relationship 2R + G (twice the rise plus the going) should be between 550mm and 700mm; and risers and goings should be consistent throughout the flight. Additionally, regulations specify minimum width (usually 850mm for primary stairs), maximum pitch (42°), and minimum headroom (2m). These dimensional constraints ensure stairs are safe and comfortable to use. When planning staircase work, UK joiners must carefully work within these parameters while accommodating the available floor-to-floor height and plan space. Accurate setting out is critical, as even small errors in rise or going dimensions can compound over the complete flight, potentially resulting in non-compliant stairs."
  },
  {
    id: 'joinery-l2-work-planning3',
    question: "Which of the following factors would NOT typically be considered when estimating the time required for a joinery installation?",
    options: ["Complexity of the work", "Required drying time for adhesives and finishes", "The brand of tools being used", "Access restrictions at the site"],
    correctAnswer: "The brand of tools being used",
    explanation: "The brand of tools being used would NOT typically be considered when estimating the time required for a joinery installation. While tool quality can influence efficiency, professional joiners are expected to use appropriate tools regardless of brand. The other factors are essential considerations: complexity directly affects time required; drying times for adhesives and finishes create necessary pauses in the workflow that must be scheduled; and access restrictions may slow material handling and create logistical challenges. When preparing time estimates for UK joinery installations, professionals typically consider: the nature and complexity of the work; quantity and size of components; site conditions and access; required setting-out and preparation; any specialised operations; experience level of available staff; drying/curing periods; and potential contingencies or complications. Accurate time estimation is crucial for efficient resource allocation, realistic client expectations, and profitable project management."
  },
  {
    id: 'joinery-l2-work-planning4',
    question: "What is the purpose of a pre-installation site survey for joinery work?",
    options: ["Only to meet health and safety requirements", "Only to introduce yourself to the client", "To identify potential issues, verify dimensions, and assess site conditions before manufacturing", "Only to determine what tools will be needed"],
    correctAnswer: "To identify potential issues, verify dimensions, and assess site conditions before manufacturing",
    explanation: "The purpose of a pre-installation site survey for joinery work is to identify potential issues, verify dimensions, and assess site conditions before manufacturing. This critical step in project planning allows joiners to gather first-hand information that affects both production and installation. A thorough UK joinery site survey typically includes: precise measurement verification (rather than relying solely on drawings); assessment of access routes for material delivery; evaluation of fixing substrates; identification of services (pipes, cables) that might affect installation; checking floor and wall levels/squareness; moisture assessment; and noting any special site requirements or restrictions. This information enables accurate production of components that will fit correctly first time, appropriate selection of fixings and installation methods, identification of any preparatory work needed, and realistic scheduling. Comprehensive site surveys significantly reduce the risk of costly modifications or delays during installation."
  },
  {
    id: 'joinery-l2-work-planning5',
    question: "What information does a risk assessment provide when planning joinery work?",
    options: ["Only the cost implications of potential accidents", "Only the insurance requirements for the job", "Identification of hazards, who might be harmed, and control measures needed", "Only the personal protective equipment required"],
    correctAnswer: "Identification of hazards, who might be harmed, and control measures needed",
    explanation: "A risk assessment provides identification of hazards, who might be harmed, and control measures needed when planning joinery work. This systematic process, required under the Management of Health and Safety at Work Regulations 1999, evaluates potential risks and establishes appropriate safeguards. For UK joinery operations, a comprehensive risk assessment typically follows five steps: identifying hazards (e.g., machinery use, manual handling, dust exposure); determining who might be harmed (workers, site visitors, public); evaluating risks and deciding on precautions; recording significant findings; and reviewing/updating as necessary. The assessment should be specific to the particular job, considering both workshop and site activities. While PPE requirements form part of the control measures, a proper risk assessment follows the hierarchy of controls, prioritizing hazard elimination or substitution before relying on protective equipment. Effective risk assessment is fundamental to safe work planning and legally required for businesses with five or more employees."
  },
  {
    id: 'joinery-l2-work-planning6',
    question: "When preparing a material order for a project, which of the following should be included as a contingency for waste and errors?",
    options: ["No additional material is ever needed", "5-10% extra material for solid timber, more for natural materials with defects", "At least 50% more than calculated", "Exactly double the calculated amount"],
    correctAnswer: "5-10% extra material for solid timber, more for natural materials with defects",
    explanation: "When preparing a material order for a project, 5-10% extra material for solid timber (more for natural materials with defects) should be included as a contingency for waste and errors. This industry-standard approach allows for inevitable waste from machining, cutting, defects, and potential mistakes without significantly inflating costs. In UK joinery practice, different materials typically have different wastage allowances: manufactured sheet materials like MDF or plywood might need only 5-7% extra; straight-grained softwood approximately 10%; hardwoods with unpredictable grain patterns or higher defect rates 15-20% or more. The exact contingency depends on various factors including material quality, complexity of components, cutting method, and machining requirements. Experienced joiners adjust these percentages based on the specific project requirements and material characteristics, balancing adequate contingency against unnecessary expense. Accurate estimation of waste allowances is a key skill in efficient project planning and cost control."
  },
  {
    id: 'joinery-l2-work-planning7',
    question: "Which of the following is the correct sequence for manufacturing a traditional frame and panel door?",
    options: ["Machine the panels, assemble the frame, sand and finish", "Assemble the complete door, machine rebates, cut panels to fit", "Prepare and machine all components, dry-assemble to check fit, disassemble and finish, final assembly", "Machine the frame components, assemble with glue, make panels later to fit openings"],
    correctAnswer: "Prepare and machine all components, dry-assemble to check fit, disassemble and finish, final assembly",
    explanation: "The correct sequence for manufacturing a traditional frame and panel door is to prepare and machine all components, dry-assemble to check fit, disassemble and finish, final assembly. This methodical approach ensures quality and efficiency. In UK joinery workshops, the typical process involves: first preparing timber to thickness and width; machining rails and stiles including tenons, mortises, and panel grooves; preparing panels to correct size with shaped edges to fit grooves; checking all components in a dry assembly; addressing any fitting issues before committing to glue; applying finishes to components (particularly important for panels to prevent unfinished edges being exposed with seasonal movement); and finally assembling with appropriate adhesive, ensuring the frame is square and flat during clamping. This sequence allows access to all surfaces for finishing and ensures panels are free to move within their grooves after assembly, accommodating natural timber movement with humidity changes."
  },
  {
    id: 'joinery-l2-work-planning8',
    question: "What is the purpose of creating a work schedule for a joinery project?",
    options: ["Only to satisfy legal requirements", "Only to determine how much to charge the client", "To allocate resources efficiently, establish a logical sequence of operations, and set timelines", "Only to decide which employees will work on the project"],
    correctAnswer: "To allocate resources efficiently, establish a logical sequence of operations, and set timelines",
    explanation: "The purpose of creating a work schedule for a joinery project is to allocate resources efficiently, establish a logical sequence of operations, and set timelines. This planning tool provides structure to the project and serves multiple functions in professional UK joinery operations: it identifies critical path activities and dependencies (tasks that must be completed before others can begin); enables appropriate allocation of staff, machinery, and workspace; establishes realistic deadlines and milestones; facilitates coordination with other trades on construction projects; allows for identification of potential bottlenecks; and provides a baseline for progress monitoring. An effective joinery work schedule typically breaks the project into distinct phases (material preparation, component fabrication, assembly, finishing, installation) with time estimates for each. While the schedule may be adjusted as work progresses, having this structured plan is essential for efficient workshop management, client communication, and timely project completion."
  },
  {
    id: 'joinery-l2-work-planning9',
    question: "When planning the sequence of machining operations for solid timber components, which operation should typically be performed first?",
    options: ["Cutting to final length", "Sanding", "Planing one face and one edge to create reference surfaces", "Drilling holes for fixings"],
    correctAnswer: "Planing one face and one edge to create reference surfaces",
    explanation: "When planning the sequence of machining operations for solid timber components, planing one face and one edge to create reference surfaces should typically be performed first. This fundamental approach, known in UK joinery as 'face side and face edge' preparation, establishes flat, straight reference surfaces from which all subsequent machining operations are measured. The typical sequence in UK workshop practice is: 1) Surface plane one face flat (face side); 2) Plane one edge square to the face side (face edge); 3) Thickness plane to bring the opposite face parallel to the face side; 4) Plane or rip the fourth edge to width parallel to the face edge; 5) Cut components to length; 6) Complete any further operations (rebates, mouldings, joints, etc.). This sequence ensures components are flat, square, and accurate before jointing operations begin. Starting with reference surfaces is particularly important with solid timber, which may have natural distortion that must be corrected early in the machining process."
  },
  {
    id: 'joinery-l2-work-planning10',
    question: "What would be the most appropriate order of work when fitting a new timber door lining and door?",
    options: ["Hang the door first, then fit the lining around it", "Install the lining, check it's plumb and square, then hang the door", "Install the lining and door as a single pre-assembled unit", "Fit hinges to both door and lining before installation"],
    correctAnswer: "Install the lining, check it's plumb and square, then hang the door",
    explanation: "The most appropriate order of work when fitting a new timber door lining and door is to install the lining, check it's plumb and square, then hang the door. This sequence ensures the structural frame is correctly positioned before the moving component is fitted to it. In UK joinery practice, the typical process involves: preparing the opening; assembling the lining with appropriate joints (typically mortise and tenon or housing joints); installing the lining using packers to achieve plumb and square positioning; securing the lining to the structure; checking diagonals to confirm squareness; fitting architraves; marking and cutting hinge recesses in both lining and door; hanging the door and adjusting for correct operation; fitting the latch/lock and other ironmongery; and making final adjustments to ensure proper clearances and operation. This methodical approach prevents issues such as binding doors or misaligned hardware that can occur when the fundamental framework isn't correctly established before door hanging."
  },
  {
    id: 'joinery-l2-work-planning11',
    question: "When planning timber material requirements for a project, why is it important to consider the moisture content of the timber?",
    options: ["It only affects the weight for transport purposes", "It only affects the price of the timber", "It affects dimensional stability, machining properties, and finishing results", "It only affects the colour of the finished product"],
    correctAnswer: "It affects dimensional stability, machining properties, and finishing results",
    explanation: "When planning timber material requirements, it's important to consider moisture content because it affects dimensional stability, machining properties, and finishing results. Timber's moisture content significantly impacts various aspects of joinery work. For UK interior joinery, timber should be acclimatized to 8-12% moisture content to match typical indoor environments, while 14-16% is appropriate for exterior applications. Using timber with incorrect moisture content can lead to numerous problems: excessive shrinkage or swelling after installation; joint failure as components change dimension; machining difficulties (too wet timber can cause tearout, while overly dry timber may be brittle); and finishing issues (moisture trapped under finishes can cause adhesion failure). For critical applications, joiners should verify moisture content with a meter and allow timber to acclimatize to the installation environment before manufacturing. Understanding and managing moisture content is fundamental to producing stable, durable joinery work suitable for specific end-use conditions."
  },
  {
    id: 'joinery-l2-work-planning12',
    question: "What is the purpose of creating a 'setting out rod' in traditional joinery?",
    options: ["It's a measuring tool used to check timber straightness", "It's a full-size drawing used to determine exact dimensions and joint positions", "It's only used to mark the position of door hinges", "It's a rod used to mix different finishing products"],
    correctAnswer: "It's a full-size drawing used to determine exact dimensions and joint positions",
    explanation: "A setting out rod in traditional joinery is a full-size drawing used to determine exact dimensions and joint positions. This time-honoured technique involves creating a 1:1 scale layout on a straight piece of timber or sheet material, showing the exact sizes and positions of all components and joints. In UK joinery practice, setting out rods are particularly valuable for complex items like doors, windows, staircases, and fitted furniture. The rod serves multiple functions: providing precise dimensions that can be transferred directly to the workpiece; ensuring all components will fit together correctly; allowing visualization of proportions before cutting expensive material; enabling identification of potential problems; and serving as a reference throughout the manufacturing process. While CAD systems have replaced rods in some workshops, many joiners still value this traditional technique, especially for complex or one-off items where the ability to directly mark components from the rod ensures accuracy and consistency."
  },
  {
    id: 'joinery-l2-work-planning13',
    question: "When setting out for a fitted kitchen installation, what would be the most important first step?",
    options: ["Ordering the appliances", "Establishing a level datum line around the room", "Installing the wall cabinets", "Fitting the worktop"],
    correctAnswer: "Establishing a level datum line around the room",
    explanation: "When setting out for a fitted kitchen installation, the most important first step would be establishing a level datum line around the room. This reference line, typically marked at a consistent height (often 1000mm above the finished floor level), provides a crucial baseline from which all vertical measurements can be taken. In UK kitchen fitting, this datum is essential because floors and ceilings in most buildings aren't perfectly level, particularly in older properties. The datum line enables accurate positioning of base units, wall cabinets, and worktops relative to a true horizontal reference, rather than the potentially uneven floor. Using a laser level or water level to create this reference around the entire room ensures all components will align correctly. Without an accurate datum, issues such as sloping worktops, misaligned cabinet doors, and visible gaps between units and walls are likely to occur, compromising both functionality and appearance of the finished installation."
  },
  {
    id: 'joinery-l2-work-planning14',
    question: "What information would you need to determine the quantity of skirting board required for a room?",
    options: ["Only the floor area of the room", "Only the ceiling height", "The perimeter of the room, accounting for doorways and other openings", "Only the number of corners in the room"],
    correctAnswer: "The perimeter of the room, accounting for doorways and other openings",
    explanation: "To determine the quantity of skirting board required for a room, you need to know the perimeter of the room, accounting for doorways and other openings. The calculation process involves measuring the total length of all walls where skirting will be installed, subtracting the width of doorways or other breaks where skirting won't be needed, and adding a wastage allowance for cutting and fitting (typically 10-15%). In UK joinery practice, additional material should be allowed for corners: external mitres require extra length to account for the angled cut, while internal mitres can sometimes be scribed rather than mitred. When ordering pre-finished skirting, additional material should be included to allow for selecting the best sections for prominent areas. Accurate quantity estimation is important to avoid costly return trips for additional material or unnecessary expense and storage of excessive leftover material. Skirting height and profile complexity don't affect the linear quantity required but will influence installation time."
  },
  {
    id: 'joinery-l2-work-planning15',
    question: "Which of the following best describes the role of a method statement in planning joinery installation work?",
    options: ["It only outlines the cost of each step", "It only lists the tools required", "It describes the specific sequence of work, techniques to be used, and safety measures", "It only details which employees will work on each task"],
    correctAnswer: "It describes the specific sequence of work, techniques to be used, and safety measures",
    explanation: "A method statement describes the specific sequence of work, techniques to be used, and safety measures for joinery installation work. This detailed document provides a step-by-step explanation of how the task will be carried out safely and effectively. In UK construction and joinery, method statements are particularly important for complex, high-risk, or unusual installations. A comprehensive joinery method statement typically includes: a description of the work; the sequence of operations; specific techniques and procedures to be followed; plant, tools, and equipment to be used; control measures for identified hazards; PPE requirements; names of competent persons performing key roles; and emergency procedures. Method statements work alongside risk assessments to create a safe system of work and are often required by principal contractors or clients before work can begin on commercial sites. For joiners, creating clear method statements demonstrates professional competence and ensures all workers understand the correct approach to the installation."
  },
  {
    id: 'joinery-l2-work-planning16',
    question: "When planning the construction of a traditional timber staircase, which component should be manufactured first?",
    options: ["The balusters", "The newel posts", "The treads and risers", "The strings"],
    correctAnswer: "The strings",
    explanation: "When planning the construction of a traditional timber staircase, the strings should be manufactured first. These critical structural components establish the entire geometry of the staircase and provide the housing (or fixing points) for treads and risers. In UK staircase manufacturing, the typical sequence begins with careful setting out of the strings, marking the precise positions for each tread and riser based on the calculated rise and going measurements. After the strings are cut (including housings for treads and risers in a closed string design), they serve as the template and structural framework around which all other components are fitted. Following string manufacture, the typical sequence would be: preparing treads and risers; assembling these into the strings; fitting newel posts; and finally adding balusters and handrails. Beginning with the strings ensures that the fundamental geometry of the staircase is correct, providing the framework that determines the position and angle of all subsequent components."
  },
  {
    id: 'joinery-l2-work-planning17',
    question: "Which of the following should be considered when planning the workspace layout for a joinery project?",
    options: ["Only the availability of power sources", "Only the size of the largest component", "Material flow, machine sequence, assembly space, and access requirements", "Only the number of people working on the project"],
    correctAnswer: "Material flow, machine sequence, assembly space, and access requirements",
    explanation: "When planning the workspace layout for a joinery project, material flow, machine sequence, assembly space, and access requirements should be considered. Effective workspace planning in UK joinery operations optimizes efficiency and safety through thoughtful organization of the manufacturing process. Key considerations include: logical arrangement of machines to minimize material handling distances; appropriate workflow from material storage through preparation, machining, assembly, finishing, and loading; adequate space around equipment for safe operation; sufficient assembly areas for larger components; access routes for material handling equipment; location of services (electricity, dust extraction); and storage for tools, jigs, and hardware. For larger projects, temporary dedicated workstations might be established for repetitive operations. While power availability, component size, and staffing levels are factors within this planning, they're part of the broader consideration of creating an efficient, safe workflow rather than the sole considerations. Proper workspace planning reduces wasted motion, prevents bottlenecks, and minimizes the risk of damage to partially completed work."
  },
  {
    id: 'joinery-l2-work-planning18',
    question: "What is the primary purpose of creating a 'cutting plan' for sheet materials?",
    options: ["To determine which type of saw to use", "To calculate how many sheets to purchase", "To optimize material usage and minimize waste", "To decide the order in which parts should be assembled"],
    correctAnswer: "To optimize material usage and minimize waste",
    explanation: "The primary purpose of creating a cutting plan for sheet materials is to optimize material usage and minimize waste. This planning process involves strategically arranging all required components on standard sheet sizes to achieve maximum yield from each sheet. In UK joinery workshops, cutting plans are particularly important for expensive sheet materials like hardwood-faced plywood or specialty laminates. Effective cutting plans account for numerous factors: the dimensions of all required components; grain direction requirements; the need for edging or lipping allowances; saw kerf width; and additional material for handling or machining. Modern workshops often use specialized software to generate optimized cutting plans, but the principle remains the same whether done manually or digitally. A well-developed cutting plan typically reduces material costs by 10-20% compared to unplanned cutting, while also improving productivity by establishing an efficient cutting sequence. This planning step is fundamental to cost-effective production and responsible resource usage."
  },
  {
    id: 'joinery-l2-work-planning19',
    question: "When planning a site installation, what is the purpose of a 'pre-start meeting'?",
    options: ["Only to meet the client socially", "Only to check if payment has been made", "To discuss and coordinate schedule, access, site requirements, and interfaces with other trades", "Only to deliver materials to site"],
    correctAnswer: "To discuss and coordinate schedule, access, site requirements, and interfaces with other trades",
    explanation: "The purpose of a pre-start meeting when planning a site installation is to discuss and coordinate schedule, access, site requirements, and interfaces with other trades. This important planning meeting typically occurs shortly before work commences on site and brings together key stakeholders including the joiner, client or main contractor, and potentially other relevant trades. In UK construction practice, pre-start meetings cover crucial logistical and practical aspects: confirming start and completion dates; establishing working hours and site rules; arranging access, parking, and material delivery/storage areas; discussing any special site requirements (security procedures, noise restrictions); coordinating with other trades whose work interfaces with the joinery installation; clarifying any technical queries; and confirming communication protocols. For joiners, these meetings provide an opportunity to identify and resolve potential issues before they impact the installation, ensuring smoother on-site operations. Effective pre-start coordination is particularly important on larger construction sites where multiple trades work in close proximity."
  },
  {
    id: 'joinery-l2-work-planning20',
    question: "What is the most important consideration when scheduling the delivery of joinery materials to a construction site?",
    options: ["Ensuring delivery occurs during normal working hours only", "Coordinating delivery timing with installation sequence and available storage space", "Always delivering all materials at once regardless of installation schedule", "Ensuring materials are delivered on the cheapest day for transport"],
    correctAnswer: "Coordinating delivery timing with installation sequence and available storage space",
    explanation: "The most important consideration when scheduling delivery of joinery materials to a construction site is coordinating delivery timing with installation sequence and available storage space. This strategic approach aligns material availability with work progression while accounting for practical site constraints. In UK construction logistics, poorly planned deliveries can cause significant problems: materials delivered too early may deteriorate from exposure, get damaged by other trades, create storage problems, or obstruct other work; materials delivered too late cause installation delays and workforce inefficiency. Effective delivery scheduling requires consideration of: the logical installation sequence; site storage capabilities (security, weather protection); site access restrictions (vehicle size, delivery hours, unloading facilities); protection requirements for finished joinery items; and coordination with other scheduled site activities. For high-value or bespoke joinery, just-in-time delivery may be optimal, while standard materials with longer lead times might require earlier delivery with appropriate on-site storage arrangements."
  },
  {
    id: 'joinery-l2-work-planning21',
    question: "What specific information should be included in a risk assessment for using a circular saw on site?",
    options: ["Only the cost of the machine", "Only the brand of the saw", "Hazards, control measures, PPE requirements, and emergency procedures", "Only the name of the person using the saw"],
    correctAnswer: "Hazards, control measures, PPE requirements, and emergency procedures",
    explanation: "A risk assessment for using a circular saw on site should include hazards, control measures, PPE requirements, and emergency procedures. This comprehensive approach ensures all significant risks are identified and properly managed. For UK joinery site work, a circular saw risk assessment would typically identify specific hazards including: contact with the moving blade; kickback; dust inhalation; noise exposure; vibration; and electrical risks. For each hazard, appropriate control measures should be detailed, such as: ensuring guards are functional; using riving knives; proper material support; correct blade selection; implementation of safe cutting techniques; maintenance of stable work positions; and use of RCD protection. The assessment should specify required PPE (typically eye protection, hearing protection, dust mask, and potentially gloves for material handling). Emergency procedures would include first aid provisions and reporting processes for any incidents. This systematic assessment fulfills legal obligations under the Management of Health and Safety at Work Regulations and forms part of a safe system of work for potentially dangerous power tools."
  },
  {
    id: 'joinery-l2-work-planning22',
    question: "When planning a project timeline, which of the following would most likely represent a 'critical path' activity in joinery work?",
    options: ["Ordering standard fixings that are readily available", "Taking site measurements before components can be manufactured", "Deciding on the tool storage arrangement", "Selecting which employee will make tea during breaks"],
    correctAnswer: "Taking site measurements before components can be manufactured",
    explanation: "Taking site measurements before components can be manufactured would most likely represent a 'critical path' activity in joinery work. The critical path consists of tasks that directly affect the project completion date, where any delay will extend the overall timeline. Site measurement is typically a critical path activity because manufacturing cannot begin without accurate dimensions, making it a dependency that controls subsequent activities. In UK joinery project planning, other common critical path activities include: obtaining client approval of designs; ordering materials with long lead times; completing manufacturing before installation can commence; and coordinating with other trades for preparatory work. Understanding the critical path helps joiners prioritize resources appropriately, focusing attention on activities where delays would impact the entire project. While ordering standard fixings and organizing tools are necessary tasks, they can typically be done in parallel with other work and have float time available, meaning they don't directly control the project timeline unless unusually complex circumstances exist."
  },
  {
    id: 'joinery-l2-work-planning23',
    question: "What is the purpose of a 'snagging list' in joinery installation projects?",
    options: ["To list all the nails and screws required", "To identify and document minor defects or incomplete items needing resolution before project completion", "To record which employees worked on each task", "To list all the tools needed for the job"],
    correctAnswer: "To identify and document minor defects or incomplete items needing resolution before project completion",
    explanation: "The purpose of a snagging list in joinery installation projects is to identify and document minor defects or incomplete items needing resolution before project completion. This quality control process typically occurs during the final stages of installation, when the majority of work is complete but small issues remain. In UK construction and joinery practice, a thorough snagging list details each issue, its precise location, and the remedial action required. Common joinery snags include: minor damage requiring touching up; gaps or misalignments requiring adjustment; incomplete hardware installation; doors or drawers requiring adjustment; unfinished edges; and areas needing final cleaning. The snagging process serves multiple purposes: it ensures all contractual requirements are fully met; provides a systematic approach to achieving the required quality standard; creates a record of agreed items to be addressed; and establishes a timeline for completing these final tasks. Proper snagging and defect resolution is essential for client satisfaction and often linked to final payment release."
  },
  {
    id: 'joinery-l2-work-planning24',
    question: "What is the primary reason for creating a detailed specification for bespoke joinery items?",
    options: ["Only to calculate the weight for transport", "Only to determine what tools will be needed", "To clearly communicate all material, construction, and finish requirements to ensure the client's expectations are met", "Only to comply with health and safety regulations"],
    correctAnswer: "To clearly communicate all material, construction, and finish requirements to ensure the client's expectations are met",
    explanation: "The primary reason for creating a detailed specification for bespoke joinery items is to clearly communicate all material, construction, and finish requirements to ensure the client's expectations are met. This comprehensive document serves as the definitive reference for what is to be produced, eliminating ambiguity and providing clarity for all parties involved. In UK bespoke joinery practice, a thorough specification typically includes: precise dimensions and tolerances; materials to be used (species, grade, finish); construction methods and jointing techniques; hardware requirements (type, finish, positioning); surface treatments and finishes; performance requirements (such as fire rating or acoustic properties); and quality standards to be achieved. The specification becomes a contractual document that protects both client and joiner by clearly establishing the agreed deliverables, providing a reference point for quality assessment, and reducing the risk of disputes or misunderstandings. It also serves as the foundation for accurate costing, material procurement, and production planning."
  },
  {
    id: 'joinery-l2-work-planning25',
    question: "When planning the finishing process for joinery items, why is it important to consider the sequence of operations?",
    options: ["It only affects the appearance of the finished product", "It only affects how quickly the job can be completed", "The sequence impacts efficiency, quality, and practical aspects like access to all surfaces", "It only affects the cost of materials"],
    correctAnswer: "The sequence impacts efficiency, quality, and practical aspects like access to all surfaces",
    explanation: "When planning the finishing process for joinery items, considering the operation sequence is important because it impacts efficiency, quality, and practical aspects like access to all surfaces. In professional UK joinery, finishing sequence planning incorporates multiple considerations for optimal results. A well-planned sequence typically addresses: accessibility (finishing components before assembly where surfaces might become inaccessible later); protection (finishing less visible areas first so minor damage during handling won't affect visible surfaces); process compatibility (ensuring each step properly prepares for subsequent operations); drying/curing times (scheduling appropriate intervals between coats); and practical workshop flow (organizing to minimize handling of wet/tacky surfaces). For example, drawer components might be finished before assembly, while frames might have initial coats applied before fitting panels, with final coats applied after assembly. Proper sequence planning prevents problems like unfinished areas being exposed with seasonal movement, finish build-up in corners, or incompatible processes affecting adhesion."
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
