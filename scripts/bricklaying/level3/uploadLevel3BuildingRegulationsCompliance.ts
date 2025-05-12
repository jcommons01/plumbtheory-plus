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

// ✅ Bricklaying Level 3 Building Regulations & Compliance Questions
const questions = [
  {
    id: 'bricklaying-l3-topic8-1',
    question: "What is the primary purpose of the Building Regulations in the UK?",
    options: ["To restrict construction to qualified builders only", "To set minimum standards for design, construction, and alterations to ensure safety, health, welfare, and convenience", "To control architectural styles and aesthetics", "To promote one specific construction method over others"],
    correctAnswer: "To set minimum standards for design, construction, and alterations to ensure safety, health, welfare, and convenience",
    explanation: "The primary purpose of Building Regulations is to set minimum standards for design, construction, and alterations to ensure safety, health, welfare, and convenience. These regulations establish technical performance standards covering structural stability, fire safety, ventilation, energy efficiency, accessibility, and other aspects of building performance. Unlike planning laws that control what can be built where, Building Regulations focus on how buildings are constructed to ensure they're safe and perform adequately for occupants and users."
  },
  {
    id: 'bricklaying-l3-topic8-2',
    question: "Which UK legislation contains the powers under which the Building Regulations are made?",
    options: ["The Town and Country Planning Act", "The Building Act 1984", "The Health and Safety at Work Act", "The Construction Design and Management Regulations"],
    correctAnswer: "The Building Act 1984",
    explanation: "The Building Act 1984 contains the powers under which the Building Regulations are made in England and Wales. This primary legislation provides the framework for the detailed regulations and gives authorities the power to enforce building standards. The Act defines the regulation-making powers, establishes the building control system, and provides for matters like dangerous structures and demolition. The actual Building Regulations are statutory instruments made under this Act and are periodically updated without requiring changes to the primary legislation."
  },
  {
    id: 'bricklaying-l3-topic8-3',
    question: "What is an 'Approved Document' in relation to the Building Regulations?",
    options: ["The only permitted construction method", "A legally binding document that must be followed exactly", "Practical guidance on meeting the requirements of the Building Regulations", "A document approved by a structural engineer"],
    correctAnswer: "Practical guidance on meeting the requirements of the Building Regulations",
    explanation: "An Approved Document provides practical guidance on meeting the requirements of the Building Regulations. These documents suggest ways of complying with the functional requirements set out in the regulations but aren't prescriptive – alternative approaches can be used if they demonstrably meet the regulatory requirements. For masonry work, relevant Approved Documents include Part A (Structure), Part C (Site preparation and resistance to contaminants and moisture), and Part L (Conservation of fuel and power), among others."
  },
  {
    id: 'bricklaying-l3-topic8-4',
    question: "Which part of the Building Regulations deals with fire safety?",
    options: ["Part A", "Part B", "Part C", "Part E"],
    correctAnswer: "Part B",
    explanation: "Part B of the Building Regulations deals with fire safety. It covers requirements for means of warning and escape, internal fire spread (linings and structure), external fire spread, and access and facilities for the fire service. For masonry construction, Part B is particularly relevant regarding fire resistance periods for walls, compartmentation requirements, cavity barriers, and the fire performance of materials. The associated Approved Document B provides practical guidance on meeting these critical safety requirements."
  },
  {
    id: 'bricklaying-l3-topic8-5',
    question: "What is a 'Building Regulation submission' and when is it required?",
    options: ["A material sample submitted for testing, required for novel materials", "An application for building work approval, required before starting relevant building work", "A complaint about non-compliant work, required when reporting violations", "A tax submission, required annually for construction companies"],
    correctAnswer: "An application for building work approval, required before starting relevant building work",
    explanation: "A Building Regulation submission is an application for building work approval, required before starting relevant building work. This formal notification to building control authorities (either the local authority or an approved inspector) ensures the proposed work will comply with regulations. For work involving masonry, submissions typically include plans, specifications, and construction details showing compliance. Most new buildings, extensions, alterations affecting structure, fire safety, access, or energy performance, and certain changes of use require a submission."
  },
  {
    id: 'bricklaying-l3-topic8-6',
    question: "What is the role of a 'Building Control Body' in the construction process?",
    options: ["To provide construction workers", "To check that building work complies with the Building Regulations", "To design the building", "To supply building materials"],
    correctAnswer: "To check that building work complies with the Building Regulations",
    explanation: "A Building Control Body checks that building work complies with the Building Regulations. This can be either a Local Authority Building Control department (LABC) or a private Approved Inspector. They review plans before construction, conduct site inspections at key stages, and ultimately issue completion certificates when satisfied the work meets regulatory requirements. For masonry construction, they typically check foundations, damp-proof courses, wall structures, cavity barriers, thermal elements, and other critical components of the building fabric."
  },
  {
    id: 'bricklaying-l3-topic8-7',
    question: "What is the 'functional requirement' approach used in the Building Regulations?",
    options: ["Requirements that only apply to functional buildings like factories", "Setting performance goals rather than prescribing specific construction methods", "Requirements that only address the function of a building, not its appearance", "Specifying which professionals must function in specific roles"],
    correctAnswer: "Setting performance goals rather than prescribing specific construction methods",
    explanation: "The functional requirement approach sets performance goals rather than prescribing specific construction methods. This means regulations specify what a building element must achieve (e.g., 'the wall must adequately resist the passage of moisture') rather than dictating exactly how to construct it. This performance-based approach allows for innovation and multiple ways to meet requirements as long as they achieve the required outcome. Approved Documents provide one way to meet these functional requirements, but alternative solutions that demonstrably satisfy the performance goals are also acceptable."
  },
  {
    id: 'bricklaying-l3-topic8-8',
    question: "Which Building Regulation requirement specifies that 'the building shall be designed and constructed so that there will be no undue concentration of radon gas in any part'?",
    options: ["Part A - Structure", "Part B - Fire Safety", "Part C - Site Preparation and Resistance to Contaminants and Moisture", "Part F - Ventilation"],
    correctAnswer: "Part C - Site Preparation and Resistance to Contaminants and Moisture",
    explanation: "The requirement that 'the building shall be designed and constructed so that there will be no undue concentration of radon gas in any part' is in Part C - Site Preparation and Resistance to Contaminants and Moisture. Specifically, it's requirement C3 addressing protection from toxic substances. For masonry construction in affected areas, this typically requires measures like radon barriers in ground floors, sealed service penetrations, and sometimes active extraction systems. These protective measures must be integrated with the building's overall damp-proofing strategy."
  },
  {
    id: 'bricklaying-l3-topic8-9',
    question: "What is a 'completion certificate' in the building control process?",
    options: ["A warranty for construction work", "A document certifying that building work appears to comply with the Building Regulations", "A certificate showing the building is completed to the client's satisfaction", "A document recording the completion date for tax purposes"],
    correctAnswer: "A document certifying that building work appears to comply with the Building Regulations",
    explanation: "A completion certificate is a document certifying that building work appears to comply with the Building Regulations. Issued by the Local Authority Building Control or received from an Approved Inspector at the conclusion of a project, this important document provides evidence that the work was inspected and deemed to satisfy regulatory requirements. For property owners, this certificate is valuable when selling property, obtaining mortgages, or proving work was legally executed. It's issued after final inspection when all relevant requirements have been met."
  },
  {
    id: 'bricklaying-l3-topic8-10',
    question: "What is the maximum U-value typically permitted for new external walls under current Building Regulations?",
    options: ["0.15 W/m²K", "0.18 W/m²K", "0.26 W/m²K", "0.35 W/m²K"],
    correctAnswer: "0.18 W/m²K",
    explanation: "The maximum U-value typically permitted for new external walls under current Building Regulations (as of June 2022, Part L) is 0.18 W/m²K. This thermal performance standard applies to new domestic buildings, with slightly different requirements for non-domestic buildings. Achieving this standard in masonry construction typically requires substantial insulation within cavity walls or on the inner face of solid walls. The specific requirement may vary based on the energy calculation methodology used, and the regulations are periodically updated with increasingly stringent standards."
  },
  {
    id: 'bricklaying-l3-topic8-11',
    question: "What is a 'material change of use' under Building Regulations?",
    options: ["Changing the materials used in construction", "When a building's use changes in a way that brings it under different regulatory requirements", "When materials are replaced during renovation", "When material suppliers are changed"],
    correctAnswer: "When a building's use changes in a way that brings it under different regulatory requirements",
    explanation: "A material change of use occurs when a building's use changes in a way that brings it under different regulatory requirements. Examples include converting a commercial building to residential use or creating a new dwelling within an existing building. When such changes occur, parts of the building may need to be upgraded to meet current Building Regulations, even if no physical work is planned. For masonry structures, this might require improvements to thermal performance, fire compartmentation, sound insulation, or damp-proofing to comply with the standards applicable to the new use."
  },
  {
    id: 'bricklaying-l3-topic8-12',
    question: "What is the purpose of 'Regulation 7' of the Building Regulations?",
    options: ["To regulate the maximum height of buildings", "To ensure appropriate materials are used and work is carried out in a workmanlike manner", "To regulate construction site working hours", "To establish minimum pay rates for construction workers"],
    correctAnswer: "To ensure appropriate materials are used and work is carried out in a workmanlike manner",
    explanation: "Regulation 7 ensures appropriate materials are used and work is carried out in a workmanlike manner. This fundamental requirement underpins all building work, demanding that materials are suitable for their purpose and installed correctly. For masonry, this means using appropriate bricks, blocks, mortar, ties, and other components that are fit for their intended use, and executing the work with proper skill. Since the Grenfell Tower tragedy, Regulation 7 has been amended to include specific requirements for external walls and specified attachments on certain buildings."
  },
  {
    id: 'bricklaying-l3-topic8-13',
    question: "What is a 'Full Plans' application in building control?",
    options: ["A complete set of architectural drawings", "A submission including detailed plans and specifications for approval before work starts", "A planning application with all supporting documents", "A set of plans showing the full extent of a development"],
    correctAnswer: "A submission including detailed plans and specifications for approval before work starts",
    explanation: "A Full Plans application is a submission including detailed plans and specifications for approval before work starts. This thorough building control route involves submitting comprehensive information for assessment against the Building Regulations. The Building Control Body checks the proposals and issues formal approval if they comply. For complex masonry projects, this approach provides certainty before work begins, as the approved plans indicate that the design meets regulatory requirements. It's generally preferred for larger or more complex projects where advance confirmation of compliance is valuable."
  },
  {
    id: 'bricklaying-l3-topic8-14',
    question: "What is the alternative to a 'Full Plans' application for Building Regulations approval?",
    options: ["No approval is required for small projects", "A Building Notice, where work can begin with minimal advance information", "A retrospective application made after construction", "A fast-track application for simple projects"],
    correctAnswer: "A Building Notice, where work can begin with minimal advance information",
    explanation: "The alternative to a Full Plans application is a Building Notice, where work can begin with minimal advance information. This simpler procedure requires less initial documentation but places more responsibility on the builder to ensure compliance. The Building Control Body inspects work as it progresses rather than approving detailed plans beforehand. While convenient for straightforward projects, Building Notices carry more risk for complex masonry work since problems identified during construction might require expensive remedial work that could have been identified at the design stage."
  },
  {
    id: 'bricklaying-l3-topic8-15',
    question: "What is the minimum distance a damp-proof course (DPC) should be positioned above external ground level according to Approved Document C?",
    options: ["At least 75mm", "At least 150mm", "At least 225mm", "At least 300mm"],
    correctAnswer: "At least 150mm",
    explanation: "According to Approved Document C, a damp-proof course (DPC) should be positioned at least 150mm above external ground level. This height requirement prevents splashing rainwater and minor ground level fluctuations from compromising the DPC's effectiveness. For masonry construction, this fundamental detail is critical for preventing rising damp. Special considerations apply at entrances where this height cannot be maintained, requiring alternative moisture protection measures such as drainage channels or tanking to prevent water ingress."
  },
  {
    id: 'bricklaying-l3-topic8-16',
    question: "Which of the following describes the requirement for cavity wall insulation under current Building Regulations?",
    options: ["All cavity walls must be fully filled with insulation", "Cavity walls must achieve the required U-value, typically using partial-fill, full-fill, or external/internal insulation", "Cavities must remain empty for ventilation", "Only the top half of cavity walls needs insulation"],
    correctAnswer: "Cavity walls must achieve the required U-value, typically using partial-fill, full-fill, or external/internal insulation",
    explanation: "Under current Building Regulations, cavity walls must achieve the required U-value, typically using partial-fill, full-fill, or external/internal insulation. The regulations set performance standards for thermal efficiency rather than prescribing specific insulation methods. For new masonry cavity walls, meeting the required U-value (typically 0.18 W/m²K) usually necessitates substantial insulation, either completely filling the cavity or using partial-fill with a residual cavity, or combining cavity insulation with internal or external insulation systems. The key requirement is achieving the thermal performance standard, not how it's achieved."
  },
  {
    id: 'bricklaying-l3-topic8-17',
    question: "What is a 'thermal bridge' in the context of Building Regulations compliance?",
    options: ["A bridge that expands due to heat", "A location where heat escapes more readily through the building envelope", "A device that transfers heat between rooms", "A bridge that connects thermal power stations"],
    correctAnswer: "A location where heat escapes more readily through the building envelope",
    explanation: "A thermal bridge is a location where heat escapes more readily through the building envelope. These areas of higher heat transfer occur where insulation is reduced or interrupted, such as at wall/floor junctions, around windows, or through wall ties. Building Regulations (particularly Part L) require minimizing thermal bridging because it reduces energy efficiency and can cause cold spots, condensation, and mold growth. For masonry construction, solutions include thermal break materials, optimized detailing at junctions, and thermally-efficient wall ties."
  },
  {
    id: 'bricklaying-l3-topic8-18',
    question: "Under Part E of the Building Regulations, what is the minimum airborne sound insulation requirement (DnT,w + Ctr) for new separating walls between dwellings?",
    options: ["35 dB", "45 dB", "53 dB", "60 dB"],
    correctAnswer: "45 dB",
    explanation: "Under Part E of the Building Regulations, the minimum airborne sound insulation requirement (DnT,w + Ctr) for new separating walls between dwellings is 45 dB. This standard ensures reasonable sound isolation between adjacent homes. For masonry construction, achieving this requirement typically involves using appropriate wall types described in Approved Document E, such as cavity masonry walls with specific block densities, or solid masonry walls of sufficient mass. Proper detailing at junctions and attention to potential flanking transmission paths are also critical to meeting this acoustic performance standard."
  },
  {
    id: 'bricklaying-l3-topic8-19',
    question: "What are 'Robust Details' in the context of Building Regulations compliance?",
    options: ["Exceptionally strong construction methods", "Pre-approved construction details that comply with Part E (sound insulation) without the need for pre-completion testing", "Details that have been tested for robustness against impact", "Construction methods that can withstand extreme weather"],
    correctAnswer: "Pre-approved construction details that comply with Part E (sound insulation) without the need for pre-completion testing",
    explanation: "Robust Details are pre-approved construction details that comply with Part E (sound insulation) without the need for pre-completion testing. These independently approved construction specifications and techniques have been pre-tested to demonstrate compliance with sound insulation requirements between dwellings. For masonry construction, registered Robust Details include specific cavity and solid wall constructions with precisely defined components and junction details. Using registered Robust Details and having each plot registered and inspected provides an alternative compliance path to pre-completion sound testing."
  },
  {
    id: 'bricklaying-l3-topic8-20',
    question: "What is meant by 'notifiable work' under the Building Regulations?",
    options: ["Work that needs to be noted in a building logbook", "Building work that must be notified to a Building Control Body before commencement", "Work that must be reported to the Health and Safety Executive", "Modifications that neighbors must be notified about"],
    correctAnswer: "Building work that must be notified to a Building Control Body before commencement",
    explanation: "Notifiable work refers to building work that must be notified to a Building Control Body before commencement. This includes most building projects including new buildings, extensions, alterations to load-bearing structures, installation of new thermal elements, and significant alteration of existing services or fittings. For masonry work, this typically includes new walls, structural alterations to existing walls, and rebuilding work. Notification enables inspection of the work to ensure compliance with Building Regulations, either through a Full Plans application or a Building Notice."
  },
  {
    id: 'bricklaying-l3-topic8-21',
    question: "What is 'Schedule 1' of the Building Regulations?",
    options: ["A list of approved builders", "A timetable for building inspections", "The section containing functional requirements for buildings", "A schedule of fees payable for building control services"],
    correctAnswer: "The section containing functional requirements for buildings",
    explanation: "Schedule 1 of the Building Regulations contains the functional requirements for buildings. This schedule sets out the core performance standards that buildings must meet, organized into parts (A through R) covering different aspects like structure, fire safety, ventilation, and energy efficiency. Each requirement specifies what the building must achieve in performance terms, rather than how to construct it. For masonry work, relevant sections include Part A (Structure), Part B (Fire safety), Part C (Resistance to moisture), and Part L (Conservation of fuel and power)."
  },
  {
    id: 'bricklaying-l3-topic8-22',
    question: "What is the purpose of an 'air permeability test' in relation to Building Regulations compliance?",
    options: ["To measure how much fresh air enters a building", "To check if air can permeate through masonry units", "To measure air leakage through the building fabric to verify energy efficiency standards", "To test the permeability of soils under foundations"],
    correctAnswer: "To measure air leakage through the building fabric to verify energy efficiency standards",
    explanation: "An air permeability test measures air leakage through the building fabric to verify energy efficiency standards. Required by Part L of the Building Regulations, this test quantifies uncontrolled air leakage by pressurizing the building and measuring air flow needed to maintain the pressure. Results are expressed as m³/(h.m²) at 50Pa. For masonry construction, achieving good air permeability involves careful detailing at junctions, service penetrations, and openings. Current standards typically require new dwellings to achieve 5-10 m³/(h.m²) depending on the compliance method used."
  },
  {
    id: 'bricklaying-l3-topic8-23',
    question: "Under Part K of the Building Regulations, what height restriction applies to openable windows where the drop from the window to the outside ground level exceeds 2 meters?",
    options: ["The bottom of the openable area must be at least 800mm above floor level", "The bottom of the openable area must be at least 1100mm above floor level", "The bottom of the openable area must be at least 1400mm above floor level", "The window must not be openable at all"],
    correctAnswer: "The bottom of the openable area must be at least 800mm above floor level",
    explanation: "Under Part K of the Building Regulations, where the drop from the window to the outside ground level exceeds 2 meters, the bottom of the openable area must be at least 800mm above floor level. This safety requirement helps prevent falls from windows. Alternative protection methods like restrictors that limit opening to 100mm or appropriately designed guarding can also be used. For masonry construction, this requirement affects window positioning and sometimes necessitates higher sill walls or specific window designs in multi-story buildings."
  },
  {
    id: 'bricklaying-l3-topic8-24',
    question: "What is a 'controlled service or fitting' in Building Regulations terminology?",
    options: ["Services that are regulated by utility companies", "Building services that are controlled by automated systems", "Services or fittings subject to Building Regulations requirements", "Services provided by licensed contractors only"],
    correctAnswer: "Services or fittings subject to Building Regulations requirements",
    explanation: "A controlled service or fitting refers to services or fittings subject to Building Regulations requirements. These include installations like electrical systems, heating, ventilation, sanitation, and fixed fittings like windows and doors that must comply with specific regulatory standards. For masonry work, understanding controlled services is important when creating openings, chases, or recesses for services, ensuring appropriate fire stopping where services penetrate masonry walls, and properly integrating elements like flues or ventilation ducts with the masonry structure."
  },
  {
    id: 'bricklaying-l3-topic8-25',
    question: "What is a 'Competent Person Scheme' in relation to Building Regulations compliance?",
    options: ["A training program for building control officers", "A self-certification scheme allowing registered installers to certify their own work meets regulations", "A testing scheme for construction materials", "A management qualification for construction site managers"],
    correctAnswer: "A self-certification scheme allowing registered installers to certify their own work meets regulations",
    explanation: "A Competent Person Scheme is a self-certification scheme allowing registered installers to certify their own work meets regulations. These government-approved schemes enable qualified professionals to self-certify that their work complies with Building Regulations without involving a Building Control Body for that specific work. While traditional masonry work itself is not covered by Competent Person Schemes, masonry contractors should be aware of them as they may interface with work certified under these schemes, such as cavity wall insulation, replacement windows, or electrical installations within masonry structures."
  },
  {
    id: 'bricklaying-l3-topic8-26',
    question: "What is the key requirement of Part M of the Building Regulations?",
    options: ["Materials must be sustainably sourced", "Buildings must be accessible to and usable by people regardless of age, disability or physical condition", "Masonry walls must be constructed to specific standards", "Minimum room sizes must be provided"],
    correctAnswer: "Buildings must be accessible to and usable by people regardless of age, disability or physical condition",
    explanation: "The key requirement of Part M is that buildings must be accessible to and usable by people regardless of age, disability, or physical condition. This covers access to and use of buildings, including approaches, entrances, and facilities within buildings. For masonry construction, Part M influences design elements like level thresholds, ramp gradients, door and corridor widths, and height of controls. Implementation often requires careful coordination of floor levels, exterior hardstanding, and threshold details in the masonry construction to achieve compliant accessibility."
  },
  {
    id: 'bricklaying-l3-topic8-27',
    question: "Under current Building Regulations, what is the maximum permitted width for an unprotected cavity in a masonry cavity wall?",
    options: ["Any width is permitted", "No more than 300mm", "No more than 150mm", "No more than 450mm"],
    correctAnswer: "No more than 300mm",
    explanation: "Under current Building Regulations, the maximum permitted width for an unprotected cavity in a masonry cavity wall is no more than 300mm. This limitation applies particularly to fire safety requirements in Approved Document B. Wider cavities, increasingly used to accommodate additional insulation, must incorporate cavity barriers or other fire protection measures. Additionally, wall ties in wider cavities must be specified appropriately for the increased span to maintain structural integrity. Proper detailing becomes increasingly important as cavity width increases."
  },
  {
    id: 'bricklaying-l3-topic8-28',
    question: "What is a 'Regulation 38 Fire Safety Information Package'?",
    options: ["A standard set of fire extinguishers", "Information about a building's fire safety design and provisions that must be provided to the responsible person", "A set of 38 regulations about fire safety", "A package of fire-resistant materials"],
    correctAnswer: "Information about a building's fire safety design and provisions that must be provided to the responsible person",
    explanation: "A Regulation 38 Fire Safety Information Package contains information about a building's fire safety design and provisions that must be provided to the responsible person. Required for new buildings or extensions covered by the Regulatory Reform (Fire Safety) Order, this documentation details fire safety design considerations, fire protection measures, and operational information. For masonry construction, relevant information includes fire compartmentation details, fire resistance of walls, cavity barrier locations, and penetration sealing methods. This package supports ongoing fire safety management after construction is complete."
  },
  {
    id: 'bricklaying-l3-topic8-29',
    question: "What is the 'Standard Assessment Procedure' (SAP) in relation to Building Regulations?",
    options: ["A standardized method for assessing structural stability", "The methodology for calculating a building's energy performance and compliance with Part L", "A procedure for assessing build quality", "A standard method for conducting building control inspections"],
    correctAnswer: "The methodology for calculating a building's energy performance and compliance with Part L",
    explanation: "The Standard Assessment Procedure (SAP) is the methodology for calculating a building's energy performance and compliance with Part L. This government-approved system provides a standardized way to assess the energy efficiency of dwellings, accounting for heating, hot water, lighting, and ventilation. For masonry construction, SAP calculations incorporate wall U-values, thermal bridging, and airtightness. While bricklayers may not perform SAP calculations themselves, understanding how masonry specifications affect energy performance helps ensure constructed walls meet the designed thermal performance required for regulatory compliance."
  },
  {
    id: 'bricklaying-l3-topic8-30',
    question: "What is the current threshold for U-values in existing thermal elements where renovation work would trigger an upgrade requirement under Building Regulations?",
    options: ["If the U-value is worse than 0.7 W/m²K", "If the U-value is worse than 0.5 W/m²K", "If the U-value is worse than 0.3 W/m²K", "If the U-value is worse than 0.2 W/m²K"],
    correctAnswer: "If the U-value is worse than 0.7 W/m²K",
    explanation: "The current threshold for U-values in existing thermal elements where renovation work would trigger an upgrade requirement is if the U-value is worse than 0.7 W/m²K. When renovating a thermal element (like an external wall) with a U-value worse than this threshold, Building Regulations require improving its thermal performance as part of the work. For masonry walls, this often means adding insulation when renovating or repairing walls with poor thermal performance. The improvement must achieve the best standard that is technically and functionally feasible, up to the standard for new thermal elements."
  },
  {
    id: 'bricklaying-l3-topic8-31',
    question: "What is an 'Approved Inspector' in the building control system?",
    options: ["A local authority building control officer", "A private sector building control professional licensed to verify Building Regulations compliance", "An inspector approved by the building contractor", "A clerk of works employed by the client"],
    correctAnswer: "A private sector building control professional licensed to verify Building Regulations compliance",
    explanation: "An Approved Inspector is a private sector building control professional licensed to verify Building Regulations compliance. These individuals or organizations are registered with the Construction Industry Council and provide an alternative to local authority building control services. Approved Inspectors check plans, conduct site inspections, and issue final certificates just like local authorities. They must demonstrate insurance coverage, technical competence, and organizational capability. For masonry projects, either building control route (local authority or Approved Inspector) provides the same level of regulatory oversight."
  },
  {
    id: 'bricklaying-l3-topic8-32',
    question: "What is the minimum fire resistance period required for external walls of a residential building over 18m in height from ground level?",
    options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
    correctAnswer: "120 minutes",
    explanation: "The minimum fire resistance period required for external walls of a residential building over 18m in height from ground level is 120 minutes (2 hours). This stringent requirement ensures sufficient time for evacuation and firefighting operations in tall buildings. For masonry construction, this typically requires specific wall constructions with adequate thickness and appropriate materials. Post-Grenfell regulatory changes have introduced additional requirements for external walls of high-rise residential buildings, affecting not just fire resistance but also combustibility of materials used in or attached to external walls."
  },
  {
    id: 'bricklaying-l3-topic8-33',
    question: "What does Building Regulation Part P cover?",
    options: ["Parking facilities", "Protection from falling", "Electrical safety in dwellings", "Privacy standards"],
    correctAnswer: "Electrical safety in dwellings",
    explanation: "Building Regulation Part P covers electrical safety in dwellings. It requires that electrical installations are designed and installed to protect people from fire and injury, including electric shocks and burns. While primarily relevant to electricians, masonry workers should understand Part P when creating recesses, chases, or penetrations in walls for electrical installations, or when working near existing electrical services. Certain electrical work in dwellings can only be undertaken by registered competent persons or must be inspected by building control."
  },
  {
    id: 'bricklaying-l3-topic8-34',
    question: "What is a 'cavity barrier' in the context of Building Regulations?",
    options: ["A physical barrier to block cavity wall insulation", "A construction that seals cavities to restrict the spread of smoke and flame", "A waterproof barrier in cavity walls", "A barrier preventing animals entering cavities"],
    correctAnswer: "A construction that seals cavities to restrict the spread of smoke and flame",
    explanation: "A cavity barrier is a construction that seals cavities to restrict the spread of smoke and flame. Required by Part B (Fire Safety), these barriers prevent fire and smoke from spreading unseen through concealed spaces like wall cavities. In masonry cavity walls, cavity barriers are required around openings, at junctions with compartment walls and floors, at junctions between walls and roofs, and sometimes at specific intervals in larger cavities. Proper installation of these barriers is critical for fire safety compliance in masonry cavity wall construction."
  },
  {
    id: 'bricklaying-l3-topic8-35',
    question: "What is the typical minimum damp-proof membrane (DPM) specification for solid ground floors according to Building Regulations?",
    options: ["1000g polythene sheet", "500 gauge polythene sheet (1200 gauge is 300 microns)", "300 gauge polythene sheet", "2000 gauge polythene sheet"],
    correctAnswer: "500 gauge polythene sheet (1200 gauge is 300 microns)",
    explanation: "The typical minimum damp-proof membrane (DPM) specification for solid ground floors according to Building Regulations is 500 gauge polythene sheet (1200 gauge is 300 microns). This minimum thickness ensures adequate resistance to ground moisture while maintaining durability during the construction process. The DPM must be properly lapped and sealed, especially where it connects with the damp-proof course in surrounding walls. For masonry construction, careful detailing of the wall-floor junction ensures continuity of the moisture barrier system."
  },
  {
    id: 'bricklaying-l3-topic8-36',
    question: "What are 'Parts M1, M2, and M4' of Approved Document M concerned with?",
    options: ["Material strength categories", "Different types of mortar mix", "Access to and use of dwellings, accessibility of public buildings, and adaptable dwellings", "Methods of masonry construction"],
    correctAnswer: "Access to and use of dwellings, accessibility of public buildings, and adaptable dwellings",
    explanation: "Parts M1, M2, and M4 of Approved Document M are concerned with access to and use of dwellings, accessibility of public buildings, and adaptable dwellings. M1 covers access and use of dwellings, M2 addresses accessibility of buildings other than dwellings, and M4 provides optional requirements for accessible and adaptable dwellings. For masonry construction, these requirements influence design aspects like level thresholds, step-free approaches, and dimensional requirements that must be accommodated in the construction of entrance areas, doorways, and circulation spaces."
  },
  {
    id: 'bricklaying-l3-topic8-37',
    question: "What is the purpose of Part Q of the Building Regulations?",
    options: ["To ensure proper qualifications of builders", "To set quality standards for materials", "To specify requirements for security in dwellings", "To establish quotation procedures for building work"],
    correctAnswer: "To specify requirements for security in dwellings",
    explanation: "Part Q of the Building Regulations specifies requirements for security in dwellings. Introduced in 2015, it sets standards for doors and windows to resist physical attack by a casual or opportunist burglar. For masonry construction, Part Q influences how doors and windows are secured within masonry openings and may require specific detailing to ensure frames are securely fixed to the surrounding masonry. The regulations specify that easily accessible doors and windows must be secure and meet minimum security standards."
  },
  {
    id: 'bricklaying-l3-topic8-38',
    question: "What is the definition of a 'thermal element' in Building Regulations?",
    options: ["Any heating device in a building", "Only the primary heat source", "A wall, floor or roof (but not windows) which separates the interior from the exterior or from an unheated space", "Elements of a building that generate heat"],
    correctAnswer: "A wall, floor or roof (but not windows) which separates the interior from the exterior or from an unheated space",
    explanation: "A thermal element is defined as a wall, floor, or roof (but not windows) which separates the interior from the exterior or from an unheated space. This definition from Building Regulations is particularly relevant when renovating existing buildings, as substantial renovation of thermal elements triggers requirements to upgrade thermal performance. For masonry construction, external walls are key thermal elements that must meet specific U-value requirements for new construction and must be upgraded to improved standards when substantial renovation occurs."
  },
  {
    id: 'bricklaying-l3-topic8-39',
    question: "What is the recommended minimum clear cavity width in a cavity wall to prevent mortar droppings from creating a bridge for moisture?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "The recommended minimum clear cavity width in a cavity wall to prevent mortar droppings from creating a bridge for moisture is 50mm. This width provides sufficient space to maintain a clear cavity even with some inevitable mortar protrusions. For partially filled cavity walls, this means maintaining at least 50mm clear space between the insulation and the outer leaf. Building Regulations Approved Document C references this minimum to ensure adequate moisture resistance. Good practice also includes using cavity boards during construction to prevent excessive mortar droppings from accumulating in the cavity."
  },
  {
    id: 'bricklaying-l3-topic8-40',
    question: "What is the 'Domestic Building Services Compliance Guide' in relation to Building Regulations?",
    options: ["A handbook listing certified domestic services contractors", "A supplementary document providing technical guidance for heating, hot water, lighting and ventilation systems", "A guide to domestic cleaning services", "A manual for servicing household appliances"],
    correctAnswer: "A supplementary document providing technical guidance for heating, hot water, lighting and ventilation systems",
    explanation: "The Domestic Building Services Compliance Guide is a supplementary document providing technical guidance for heating, hot water, lighting, and ventilation systems. It supports Part L of the Building Regulations by giving detailed specifications for compliant installation of building services. While primarily concerned with mechanical and electrical systems, this guide has implications for masonry work where it interfaces with services - such as locations for flues, ventilation ducts, and service penetrations through walls. Coordination between masonry and building services is essential for regulatory compliance."
  },
  {
    id: 'bricklaying-l3-topic8-41',
    question: "What are 'consequential improvements' in the context of Building Regulations Part L?",
    options: ["Improvements that happen as a consequence of regulatory changes", "Additional works required to maintain a building's character", "Energy efficiency improvements to existing buildings required when carrying out certain types of work", "Improvements that occur naturally during the aging of a building"],
    correctAnswer: "Energy efficiency improvements to existing buildings required when carrying out certain types of work",
    explanation: "Consequential improvements are energy efficiency improvements to existing buildings required when carrying out certain types of work. Under Part L, when undertaking specific building work (like extensions or installation of new fixed building services) to certain existing buildings over 1000m², additional energy efficiency measures may be required to the existing building as a consequence of the primary work. For masonry projects, this might mean that when extending or renovating a large building, upgrades to the thermal performance of the existing masonry walls may be required as consequential improvements."
  },
  {
    id: 'bricklaying-l3-topic8-42',
    question: "What type of buildings are exempt from some parts of the Building Regulations?",
    options: ["Any residential building", "Certain types of buildings including some temporary buildings, greenhouses, and agricultural buildings", "Buildings constructed before 1980", "All public buildings"],
    correctAnswer: "Certain types of buildings including some temporary buildings, greenhouses, and agricultural buildings",
    explanation: "Certain types of buildings including some temporary buildings, greenhouses, and agricultural buildings are exempt from some parts of the Building Regulations. Schedule 2 of the regulations lists specific exemptions, which include some buildings under 30m², certain conservatories and porches, some greenhouses, agricultural buildings, temporary buildings, ancillary buildings, and small detached buildings. However, exemption is often partial rather than complete, and specific conditions must be met to qualify. Even for exempt structures, masonry work should still follow good practice principles."
  },
  {
    id: 'bricklaying-l3-topic8-43',
    question: "What is meant by a 'material alteration' under the Building Regulations?",
    options: ["Changing the materials used in construction", "Any work that makes the building less compliant with the regulations", "An alteration requiring lots of materials", "Changing the appearance of external materials"],
    correctAnswer: "Any work that makes the building less compliant with the regulations",
    explanation: "A material alteration means any work that makes the building less compliant with the regulations in relation to structure, fire safety, access and facilities for disabled people, conservation of fuel and power, or ventilation. If such work is undertaken, the regulations require that the building is no more unsatisfactory in relation to these requirements after the work than before. For masonry projects, alterations like removing load-bearing walls, changing the fire compartmentation, or modifying the thermal envelope would be considered material alterations requiring Building Regulations approval."
  },
  {
    id: 'bricklaying-l3-topic8-44',
    question: "What is the purpose of a 'Regulation 7 assessment'?",
    options: ["To assess the environmental impact of materials", "To evaluate materials to ensure they're appropriate and adequately installed", "To measure the performance of installed materials", "To calculate the carbon footprint of construction"],
    correctAnswer: "To evaluate materials to ensure they're appropriate and adequately installed",
    explanation: "A Regulation 7 assessment evaluates materials to ensure they're appropriate and adequately installed. This assessment evaluates construction materials against the fundamental requirement that they be appropriate for their purpose and properly installed. Following the Grenfell Tower tragedy, Regulation 7 was amended to include specific requirements regarding the combustibility of external walls for certain buildings. For masonry construction, this assessment considers the suitability of bricks, blocks, mortars, ties, and other components for their intended use and installation method."
  },
  {
    id: 'bricklaying-l3-topic8-45',
    question: "Under Part A of the Building Regulations, what is the typical minimum thickness for a single-leaf masonry wall 2.5-3.5m high?",
    options: ["100mm", "190mm", "215mm", "325mm"],
    correctAnswer: "190mm",
    explanation: "Under Part A of the Building Regulations, the typical minimum thickness for a single-leaf masonry wall 2.5-3.5m high is 190mm. This dimension is based on structural stability requirements outlined in Approved Document A, which provides tables of wall thickness based on height, length, and loading conditions. This thickness applies to certain internal walls and partition walls where lateral support conditions are met. External walls generally have additional requirements based on exposure conditions and thermal performance needs that may result in different specifications."
  },
  {
    id: 'bricklaying-l3-topic8-46',
    question: "What is a 'cold roof' in Building Regulations terminology and how does it affect insulation requirements?",
    options: ["A roof in cold climates", "A roof with insulation at ceiling level and a ventilated space above", "A roof with a metallic reflective covering", "A flat roof construction with minimal insulation"],
    correctAnswer: "A roof with insulation at ceiling level and a ventilated space above",
    explanation: "A cold roof has insulation at ceiling level and a ventilated space above. In this configuration, the insulation follows the horizontal ceiling with the roof space above remaining unheated (cold) and ventilated to remove moisture. This affects masonry work where it interfaces with the roof, particularly at the eaves and gable walls. Thermal bridging at these junctions must be addressed, often requiring insulation to extend to the top of masonry walls. Additionally, ventilation paths at eaves must remain unobstructed, which affects how the top courses of masonry are detailed."
  },
  {
    id: 'bricklaying-l3-topic8-47',
    question: "What is a 'regularization certificate' in Building Control?",
    options: ["A certificate showing regular inspection schedules", "A certificate affirming regular maintenance will be conducted", "A retrospective certificate for unauthorized work to acknowledge Building Regulations compliance", "A certificate regulating building use"],
    correctAnswer: "A retrospective certificate for unauthorized work to acknowledge Building Regulations compliance",
    explanation: "A regularization certificate is a retrospective certificate for unauthorized work to acknowledge Building Regulations compliance. It provides a way to regularize work completed without proper building control notification. Local authorities can issue these certificates after inspecting the work and being satisfied it meets regulatory requirements. For unauthorized masonry work, obtaining regularization may require opening up sections of work for inspection or providing other evidence of compliance. This process doesn't remove any liability for having undertaken unauthorized work but helps confirm the work's regulatory compliance."
  },
  {
    id: 'bricklaying-l3-topic8-48',
    question: "What does the term 'combustible material' specifically mean in relation to Regulation 7(2) for high-rise residential buildings?",
    options: ["Any material capable of burning under normal conditions", "Any material that achieves a European Classification A2-s1, d0 or A1", "Materials with a combustibility rating of 3 or higher", "Any material that fails to meet class B fire resistance"],
    correctAnswer: "Any material that achieves a European Classification A2-s1, d0 or A1",
    explanation: "In relation to Regulation 7(2) for high-rise residential buildings, 'combustible material' specifically refers to any material that does not achieve a European Classification A2-s1, d0 or A1 when tested to BS EN 13501-1. Following the Grenfell Tower tragedy, Building Regulations were amended to prohibit combustible materials in the external walls of certain buildings over 18m in height. This affects masonry construction through limitations on materials that can be used in or attached to walls of tall residential buildings, potentially restricting some cladding systems used in conjunction with masonry structures."
  },
  {
    id: 'bricklaying-l3-topic8-49',
    question: "What does 'Purpose Group' refer to in Building Regulations?",
    options: ["A group of construction workers with a specific purpose", "The classification of buildings according to their use or purpose", "A group of buildings constructed for the same client", "The intended lifespan of a building"],
    correctAnswer: "The classification of buildings according to their use or purpose",
    explanation: "Purpose Group refers to the classification of buildings according to their use or purpose. This classification system in the Building Regulations, particularly in Approved Document B (Fire Safety), categorizes buildings to determine appropriate fire safety requirements. Different purpose groups (like residential, office, assembly, industrial) have different requirements for fire resistance, compartmentation, and means of escape. For masonry construction, the purpose group affects specifications for fire resistance of walls, compartmentation requirements, and separation distances, among other considerations."
  },
  {
    id: 'bricklaying-l3-topic8-50',
    question: "What is the 'functional requirement' of Part C2 of the Building Regulations?",
    options: ["Buildings must be structurally stable", "Buildings must be constructed so that ground moisture does not pass into the building", "Buildings must have adequate fire escapes", "Buildings must be energy efficient"],
    correctAnswer: "Buildings must be constructed so that ground moisture does not pass into the building",
    explanation: "The functional requirement of Part C2 of the Building Regulations states that buildings must be constructed so that ground moisture does not pass into the building. This fundamental performance requirement underpins regulations about damp-proofing in masonry construction. It requires appropriate measures like damp-proof courses, tanking, or other systems to prevent moisture ingress from the ground. For masonry walls, this typically means incorporating a damp-proof course at least 150mm above external ground level and ensuring proper connection between the DPC and damp-proof membrane in floors."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-building-regulations-compliance', 'items', q.id), {
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