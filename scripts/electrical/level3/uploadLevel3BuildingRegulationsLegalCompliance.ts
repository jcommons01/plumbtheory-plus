// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3BuildingRegulationsLegalCompliance.ts

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

// ✅ Level 3 Building Regulations & Legal Compliance Questions
const questions = [
  {
    id: 'level3buildreg01',
    question: "Under the Building Regulations Part P (2013 as amended), which of the following is classified as 'notifiable work' in a dwelling?",
    options: ["Installing a new lighting circuit", "Replacing a damaged socket outlet", "Installing an additional socket outlet on an existing circuit in the living room", "Installing a new consumer unit"],
    correctAnswer: "Installing a new consumer unit",
    explanation: "Under Part P, notifiable work includes installing a new consumer unit, as this is considered a significant alteration to the existing installation. Other notifiable work includes new circuits, alterations in special locations (bathrooms, etc.), and consumer unit replacements. Simple additions to existing circuits in non-special locations are non-notifiable."
  },
  {
    id: 'level3buildreg02',
    question: "What is the legal status of an Approved Document in relation to the Building Regulations?",
    options: ["It is the law itself", "It is guidance that must be followed exactly", "It provides practical guidance on meeting the requirements of the Building Regulations", "It is optional advice that can be ignored if preferred"],
    correctAnswer: "It provides practical guidance on meeting the requirements of the Building Regulations",
    explanation: "Approved Documents provide practical guidance on ways to comply with the Building Regulations but are not themselves the law. They outline common methods of achieving compliance, but alternative approaches can be used if they also meet the functional requirements of the regulations. This is known as following the 'functional approach' rather than the 'prescriptive approach'."
  },
  {
    id: 'level3buildreg03',
    question: "Under the Electricity at Work Regulations 1989, what is the duty of care required from a 'competent person'?",
    options: ["To hold specific qualifications only", "To carry out work in accordance with recognized procedures", "To possess adequate technical knowledge or experience to prevent danger and injury", "To be registered with a government scheme"],
    correctAnswer: "To possess adequate technical knowledge or experience to prevent danger and injury",
    explanation: "Regulation 16 of the Electricity at Work Regulations 1989 defines competence as having adequate technical knowledge or experience (or being under appropriate supervision) to prevent danger and injury. This is a functional definition focused on outcomes rather than specific qualifications, though in practice, formal qualifications are often used as evidence of competence."
  },
  {
    id: 'level3buildreg04',
    question: "What is the primary responsibility of the client under the Construction (Design and Management) Regulations 2015 (CDM 2015)?",
    options: ["To design all aspects of the work", "To directly supervise workers", "To make arrangements for managing a project, including allocation of sufficient time and resources", "To inspect all work personally"],
    correctAnswer: "To make arrangements for managing a project, including allocation of sufficient time and resources",
    explanation: "Under CDM 2015, the client's primary responsibility is to make suitable arrangements for managing a project, including the allocation of sufficient time and resources. This includes appointing the principal designer and principal contractor, ensuring relevant information is prepared and provided to other duty-holders, and ensuring the principal designer and principal contractor carry out their duties."
  },
  {
    id: 'level3buildreg05',
    question: "What is the specific legal purpose of the Electrical Installation Certificate required under BS 7671?",
    options: ["It provides a guarantee of the installation quality", "It certifies the installation complies with the current edition of the Wiring Regulations", "It is merely an advisory document with no legal standing", "It transfers all liability to the certifying person"],
    correctAnswer: "It certifies the installation complies with the current edition of the Wiring Regulations",
    explanation: "The Electrical Installation Certificate formally certifies that the design, construction, inspection, and testing of the electrical installation complies with BS 7671 (the current edition of the Wiring Regulations). It serves as documentary evidence of compliance and is a critical document for building control approval, insurance purposes, and potential legal proceedings."
  },
  {
    id: 'level3buildreg06',
    question: "Under the Health and Safety at Work etc. Act 1974, which statement best describes the responsibility of an employer toward their employees?",
    options: ["Only applies when employing more than five workers", "Only responsible for providing safety equipment", "Must ensure health, safety and welfare at work, so far as is reasonably practicable", "Only applies to permanent employees, not contractors"],
    correctAnswer: "Must ensure health, safety and welfare at work, so far as is reasonably practicable",
    explanation: "Section 2(1) of the Health and Safety at Work etc. Act 1974 places a duty on every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This includes provision of safe systems of work, safe equipment, training, supervision, and a safe working environment. This duty applies regardless of the number of employees."
  },
  {
    id: 'level3buildreg07',
    question: "What defines a 'competent person scheme' in relation to Building Regulations Part P?",
    options: ["Any person with City & Guilds qualifications", "An organization that trains electricians", "A government-authorized certification scheme that allows registered members to self-certify compliance with Building Regulations", "Any certified electrician with 5+ years of experience"],
    correctAnswer: "A government-authorized certification scheme that allows registered members to self-certify compliance with Building Regulations",
    explanation: "A competent person scheme is a government-authorized certification scheme that allows members who have demonstrated competence to self-certify that their work complies with the Building Regulations, without the need for additional Building Control inspection. Examples include NICEIC, ELECSA, and NAPIT for electrical work under Part P."
  },
  {
    id: 'level3buildreg08',
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, what is the requirement regarding electrical installations in commercial premises?",
    options: ["Annual testing by fire authorities", "No specific requirements related to electrical installations", "Installations must be regularly inspected and maintained to prevent them becoming a source of ignition", "Testing only required during property sale"],
    correctAnswer: "Installations must be regularly inspected and maintained to prevent them becoming a source of ignition",
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires that electrical installations in commercial premises must be regularly inspected and maintained to prevent them becoming a source of ignition. This forms part of the overall fire risk assessment requirements, where the 'responsible person' must identify and manage fire risks, including those from electrical sources."
  },
  {
    id: 'level3buildreg09',
    question: "What are the potential legal consequences for an electrical contractor who completes notifiable work under Building Regulations Part P without appropriate notification or certification?",
    options: ["No consequences if the work is technically sound", "Only a verbal warning from building control", "Removal from competent person register only", "Enforcement notice, requirement to rectify work, and possible prosecution with unlimited fines"],
    correctAnswer: "Enforcement notice, requirement to rectify work, and possible prosecution with unlimited fines",
    explanation: "Failing to properly notify or certify notifiable work under Part P can result in an enforcement notice from the local authority requiring the work to be rectified or exposed for inspection. Non-compliance with this notice is a criminal offense that can lead to prosecution with potentially unlimited fines. The contractor may also face professional consequences including removal from competent person schemes."
  },
  {
    id: 'level3buildreg10',
    question: "Which regulation specifically requires that 'all systems shall, so far as is reasonably practicable, be constructed, installed and maintained to prevent danger'?",
    options: ["The Building Regulations", "Electricity Safety, Quality and Continuity Regulations 2002", "Electricity at Work Regulations 1989, Regulation 4(1)", "Regulatory Reform (Fire Safety) Order 2005"],
    correctAnswer: "Electricity at Work Regulations 1989, Regulation 4(1)",
    explanation: "Regulation 4(1) of the Electricity at Work Regulations 1989 specifically states: 'All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger.' This is a fundamental requirement that underpins electrical safety in all workplaces and applies to both permanent and temporary installations."
  },
  {
    id: 'level3buildreg11',
    question: "What does the 'duty of care' under Section 3 of the Health and Safety at Work Act 1974 require of an electrical contractor?",
    options: ["Only applies to employees, not the general public", "Only provides care for the immediate customer", "Ensures the safety of both employees and persons not in their employment, including the public", "Only applies to commercial premises"],
    correctAnswer: "Ensures the safety of both employees and persons not in their employment, including the public",
    explanation: "Section 3 of the Health and Safety at Work Act 1974 places a duty on employers and self-employed persons to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment (including the general public and clients) are not exposed to risks to their health or safety. This extends the duty beyond just employees."
  },
  {
    id: 'level3buildreg12',
    question: "Under the Construction (Design and Management) Regulations 2015, when must a project be notified to the Health and Safety Executive?",
    options: ["Only for commercial projects", "When the construction work is expected to last longer than 30 working days and have more than 20 workers simultaneously, or exceed 500 person days", "Only when the project value exceeds £100,000", "All projects must be notified"],
    correctAnswer: "When the construction work is expected to last longer than 30 working days and have more than 20 workers simultaneously, or exceed 500 person days",
    explanation: "Under CDM 2015, a project must be notified to the HSE if the construction work is scheduled to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or if it exceeds 500 person days of construction work. Notification must be done using the F10 form before construction begins."
  },
  {
    id: 'level3buildreg13',
    question: "What is the specific function of an Electrical Installation Condition Report (EICR)?",
    options: ["To certify a new installation", "To record alterations to an existing installation", "To assess the condition of an existing installation and identify departures from requirements", "To provide a guarantee for electrical work"],
    correctAnswer: "To assess the condition of an existing installation and identify departures from requirements",
    explanation: "An EICR is specifically designed to assess the condition of an existing electrical installation, identifying any deterioration, damage, defects, or dangerous conditions, along with recording any departures from current regulatory requirements. It does not certify compliance like an EIC would for new work but instead provides condition codes (C1, C2, C3, etc.) to classify the urgency of remedial work needed."
  },
  {
    id: 'level3buildreg14',
    question: "Under which circumstances is a Minor Electrical Installation Works Certificate permitted to be used instead of an Electrical Installation Certificate?",
    options: ["For all domestic work regardless of scope", "For additions and alterations that do not include a new circuit", "For any work under £500 in value", "For all work in commercial premises"],
    correctAnswer: "For additions and alterations that do not include a new circuit",
    explanation: "A Minor Electrical Installation Works Certificate can be used for additions and alterations to an existing installation that do not include the provision of a new circuit. Examples include adding a socket to an existing circuit or replacing a damaged accessory. It provides a simplified documentation process while still confirming that the work meets BS 7671 requirements."
  },
  {
    id: 'level3buildreg15',
    question: "According to the Provision and Use of Work Equipment Regulations 1998 (PUWER), what is the primary duty of an employer regarding electrical test equipment?",
    options: ["To ensure it is the newest model available", "To ensure it is suitable for the intended use, maintained in a safe condition, and used only by trained persons", "To ensure it has been imported from the EU", "To ensure it is borrowed rather than owned"],
    correctAnswer: "To ensure it is suitable for the intended use, maintained in a safe condition, and used only by trained persons",
    explanation: "PUWER requires that work equipment, including electrical test equipment, must be suitable for its intended use, maintained in a safe condition, inspected regularly to ensure safety, and used only by people who have received adequate information, instruction, and training. This includes calibration of test equipment to ensure accurate results."
  },
  {
    id: 'level3buildreg16',
    question: "Under the Electricity Safety, Quality and Continuity Regulations 2002 (as amended), what is the maximum permitted voltage for low voltage electrical supplies to consumers in the UK?",
    options: ["230V +10%/-6%", "230V ±5%", "230V ±10%", "400V ±10%"],
    correctAnswer: "230V +10%/-6%",
    explanation: "The Electricity Safety, Quality and Continuity Regulations 2002 (as amended) specify that low voltage supplies to consumers in the UK must be maintained at 230V with a permitted tolerance of +10%/-6% (216.2V to 253V). This harmonized European standard replaced the previous UK standard of 240V ±6%, though many UK supplies still operate closer to 240V."
  },
  {
    id: 'level3buildreg17',
    question: "What is the specific role of the Electrical Certification Board (ECA) in the UK electrical industry?",
    options: ["Government enforcement agency", "Trade association representing electrotechnical and engineering services contractors", "Manufacturer certification body", "Part of the Health and Safety Executive"],
    correctAnswer: "Trade association representing electrotechnical and engineering services contractors",
    explanation: "The Electrical Contractors' Association (ECA) is a trade association that represents electrotechnical and engineering services contractors in the UK. It provides industry representation, technical guidance, business support, and training to its members. It is not a regulatory body but works with government and regulatory bodies to influence policy affecting the electrical industry."
  },
  {
    id: 'level3buildreg18',
    question: "Under the Building Regulations, what is the specific requirement for emergency lighting in a non-domestic building?",
    options: ["All buildings must have it regardless of use", "Required only in buildings over 3 stories", "Must comply with the recommendations of BS 5266", "Only required in buildings open after dark"],
    correctAnswer: "Must comply with the recommendations of BS 5266",
    explanation: "The Building Regulations require that emergency lighting in non-domestic buildings must comply with the recommendations of BS 5266 (Emergency lighting - Code of practice for the emergency lighting of premises). This standard specifies the illumination levels, positioning, and duration requirements for emergency lighting systems to ensure safe evacuation in the event of normal lighting failure."
  },
  {
    id: 'level3buildreg19',
    question: "What is the legal requirement regarding documentation that must be provided to the client upon completion of electrical installation work under BS 7671?",
    options: ["No documentation is legally required", "Only a verbal explanation of the work", "Appropriate certification (EIC, MEIWC, or EICR) plus schedules of inspections, test results, and operation/maintenance instructions", "Just an invoice detailing the work"],
    correctAnswer: "Appropriate certification (EIC, MEIWC, or EICR) plus schedules of inspections, test results, and operation/maintenance instructions",
    explanation: "BS 7671 requires that upon completion of electrical installation work, the appropriate certification must be provided to the client. This includes an Electrical Installation Certificate (EIC), Minor Electrical Installation Works Certificate (MEIWC), or Electrical Installation Condition Report (EICR) as appropriate, plus schedules of inspections, test results, and operation/maintenance instructions."
  },
  {
    id: 'level3buildreg20',
    question: "What are the specific notification requirements when electrical work in a dwelling is not carried out by a registered competent person?",
    options: ["No notification necessary", "Must apply for a waiver from Building Control", "Must notify Building Control before work begins, pay the appropriate fee, and have the work inspected", "Can notify up to 6 months after completion"],
    correctAnswer: "Must notify Building Control before work begins, pay the appropriate fee, and have the work inspected",
    explanation: "When notifiable electrical work in a dwelling is not carried out by a registered competent person, Building Control must be notified before work begins. A building notice or full plans application must be submitted with the appropriate fee, and the work must be inspected by Building Control to verify compliance with Building Regulations before it can be signed off."
  },
  {
    id: 'level3buildreg21',
    question: "Which legal requirement specifies that all electrical equipment used in the workplace must be maintained in a safe condition?",
    options: ["The Building Regulations", "The Electricity at Work Regulations 1989", "The Town and Country Planning Act", "Environmental Protection Act"],
    correctAnswer: "The Electricity at Work Regulations 1989",
    explanation: "Regulation 4(2) of the Electricity at Work Regulations 1989 specifically requires that 'As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger.' This places a legal duty on employers to ensure that all electrical equipment and systems used in the workplace are maintained in a safe condition."
  },
  {
    id: 'level3buildreg22',
    question: "Under the Building Regulations Part P, what are the specific requirements for someone undertaking electrical work in a bathroom of a dwelling?",
    options: ["The work can be done by anyone with basic electrical knowledge", "The work must be done by a registered competent person or notified to Building Control", "Only voltage exceeding 230V needs to be certified", "Only new installations need to be notified, not modifications"],
    correctAnswer: "The work must be done by a registered competent person or notified to Building Control",
    explanation: "Under Building Regulations Part P, electrical work in bathrooms is classified as work in a 'special location' and is therefore notifiable. It must either be carried out by a registered competent person (who can self-certify) or be notified to Building Control before work commences. This applies to both new installations and alterations or additions to existing installations."
  },
  {
    id: 'level3buildreg23',
    question: "What is the legal status of the IET Wiring Regulations (BS 7671) in the UK?",
    options: ["It is statutory law directly enforceable by government authorities", "It is a British Standard that is not legally binding but is the recognized standard for electrical installations", "It is purely advisory with no legal implications", "It only applies to new buildings"],
    correctAnswer: "It is a British Standard that is not legally binding but is the recognized standard for electrical installations",
    explanation: "BS 7671 (IET Wiring Regulations) is a British Standard, not statutory law. However, it is widely recognized as the standard that electrical installations should meet to satisfy safety legislation such as the Electricity at Work Regulations 1989. Compliance with BS 7671 is often used as evidence of compliance with these legal requirements, and in some contexts (like Building Regulations Part P) it becomes effectively mandatory."
  },
  {
    id: 'level3buildreg24',
    question: "What specific legal document is required to show compliance with Part P of the Building Regulations for notifiable electrical work in dwellings?",
    options: ["A detailed invoice showing all work completed", "A Building Regulations Compliance Certificate issued by a competent person scheme or Building Control", "A letter from the electrician stating compliance", "An electrical safety certificate from the local authority"],
    correctAnswer: "A Building Regulations Compliance Certificate issued by a competent person scheme or Building Control",
    explanation: "A Building Regulations Compliance Certificate is the specific legal document required to demonstrate compliance with Part P. This is issued either by a registered competent person through their scheme provider or by Building Control following inspection of work that was notified to them. This certificate confirms that the work complies with the relevant requirements of the Building Regulations."
  },
  {
    id: 'level3buildreg25',
    question: "Under the requirements of the Construction (Design and Management) Regulations 2015, which document must the principal contractor develop for projects involving electrical installations?",
    options: ["Electrical testing schedule", "Building Control notification", "Construction phase plan", "Wiring diagram only"],
    correctAnswer: "Construction phase plan",
    explanation: "The CDM Regulations 2015 require the principal contractor to develop a construction phase plan for all projects, regardless of size. This plan must set out the health and safety arrangements for the construction phase, including specific measures concerning electrical safety where relevant. For smaller projects, the plan can be simple but proportionate to the risks involved."
  },
  {
    id: 'level3buildreg26',
    question: "Under the Electricity at Work Regulations 1989, what is the legal requirement regarding working on or near live electrical systems?",
    options: ["It is prohibited in all circumstances", "It is permitted provided the worker is experienced", "It is permitted only if dead working is not reasonably practicable, suitable precautions are taken, and appropriate PPE is used", "It is permitted for systems below 50V only"],
    correctAnswer: "It is permitted only if dead working is not reasonably practicable, suitable precautions are taken, and appropriate PPE is used",
    explanation: "Regulation 14 of the Electricity at Work Regulations 1989 permits live working only if: (a) it is unreasonable in all the circumstances for the conductor to be dead; and (b) it is reasonable in all the circumstances for the person to be at work on or near that conductor while it is live; and (c) suitable precautions (including PPE) are taken to prevent injury."
  },
  {
    id: 'level3buildreg27',
    question: "What is the specific legal purpose of the 'Schedule of Inspections' that accompanies an Electrical Installation Certificate?",
    options: ["It is optional documentation with no legal significance", "It provides detailed design information only", "It provides evidence that specified inspection tasks were undertaken to verify compliance", "It is only required for commercial premises"],
    correctAnswer: "It provides evidence that specified inspection tasks were undertaken to verify compliance",
    explanation: "The Schedule of Inspections provides documented evidence that all required inspection tasks were undertaken to verify compliance with BS 7671. It is a mandatory part of certification and forms part of the legal record that inspection has been properly carried out. It must be completed accurately to demonstrate that visual inspection has been conducted thoroughly before testing."
  },
  {
    id: 'level3buildreg28',
    question: "What enforcement action can local authorities take if electrical work in a dwelling does not comply with Building Regulations Part P?",
    options: ["Only verbal warnings can be issued", "No action if the installation works correctly", "Issue an enforcement notice requiring rectification, potential prosecution with unlimited fines, or require removal/alteration of non-compliant work", "Only action if a fire occurs"],
    correctAnswer: "Issue an enforcement notice requiring rectification, potential prosecution with unlimited fines, or require removal/alteration of non-compliant work",
    explanation: "Local authorities have significant enforcement powers for non-compliant electrical work. They can issue enforcement notices requiring rectification, prosecute for non-compliance (which can result in unlimited fines), and/or issue a notice requiring the removal or alteration of non-compliant work. These powers extend for up to 12 months after completion of the work."
  },
  {
    id: 'level3buildreg29',
    question: "What is the specific legal responsibility of a 'duty holder' under the Electricity at Work Regulations 1989?",
    options: ["Only applies to business owners", "Only refers to qualified electricians", "Every person who may have control over all or part of an electrical system has a duty to comply with the regulations", "Only applies to system designers"],
    correctAnswer: "Every person who may have control over all or part of an electrical system has a duty to comply with the regulations",
    explanation: "Under the Electricity at Work Regulations 1989, a 'duty holder' is any person who may have control over all or part of an electrical system, including employers, employees, self-employed persons, and those in control of premises. Each duty holder has a responsibility to comply with the regulations to the extent of their control. This creates a network of responsibility throughout organizations."
  },
  {
    id: 'level3buildreg30',
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, what is the requirement for emergency lighting in non-domestic premises?",
    options: ["Only required in buildings over 3 stories", "Only required if occupancy exceeds 50 people", "Must be provided if needed to safely evacuate the premises in the event of a power failure", "Only required in buildings constructed after 2005"],
    correctAnswer: "Must be provided if needed to safely evacuate the premises in the event of a power failure",
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires that non-domestic premises must have emergency lighting provided if it is needed for people to safely evacuate the premises in the event of a power failure. This is determined through fire risk assessment, which must consider factors such as building layout, occupancy, and natural light availability."
  },
  {
    id: 'level3buildreg31',
    question: "What is the legal requirement regarding the provision of RCD protection for socket outlets in a commercial premises under BS 7671?",
    options: ["Not required for commercial premises", "Required only for outdoor socket outlets", "Required for socket outlets rated up to 32A that may reasonably be expected to supply portable equipment for use outdoors", "Required only if the building was constructed after 2008"],
    correctAnswer: "Required for socket outlets rated up to 32A that may reasonably be expected to supply portable equipment for use outdoors",
    explanation: "BS 7671 requires that, in all installations, socket outlets rated up to 32A that may reasonably be expected to supply portable equipment for use outdoors must be protected by an RCD with a rated residual operating current not exceeding 30mA. This applies to both domestic and commercial premises to provide protection against electric shock when using portable equipment."
  },
  {
    id: 'level3buildreg32',
    question: "Under the Health and Safety at Work etc. Act 1974, what is the legal obligation of an employee regarding electrical safety?",
    options: ["No specific obligations apply to employees", "Only to follow instructions when directly supervised", "To take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions", "Only responsible for reporting major incidents"],
    correctAnswer: "To take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions",
    explanation: "Section 7 of the Health and Safety at Work etc. Act 1974 places a legal duty on every employee to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work. They must also cooperate with their employer to enable the employer to comply with their own statutory duties."
  },
  {
    id: 'level3buildreg33',
    question: "What specific requirement does The Management of Health and Safety at Work Regulations 1999 place on employers regarding risk assessment for electrical work?",
    options: ["Only applies to work over 230V", "Must conduct suitable and sufficient risk assessment of all electrical work", "Only required for work in hazardous locations", "Only applies to commercial premises"],
    correctAnswer: "Must conduct suitable and sufficient risk assessment of all electrical work",
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to make a suitable and sufficient assessment of the risks to the health and safety of employees and others who may be affected by their work. This includes all electrical work, regardless of voltage level or location, to identify necessary preventive and protective measures."
  },
  {
    id: 'level3buildreg34',
    question: "What is the specific requirement under the Building Regulations for new electrical installations in commercial kitchens?",
    options: ["All electrical equipment must be stainless steel", "Socket outlets must be at least 300mm above worktop level", "No specific requirements beyond general regulations", "All lighting must be recessed"],
    correctAnswer: "Socket outlets must be at least 300mm above worktop level",
    explanation: "The Building Regulations, through reference to BS 7671, require that in commercial kitchens, socket outlets should be installed at least 300mm above worktop level. This reduces the risk of water ingress and damage during cleaning and food preparation activities, which could create safety hazards in these environments."
  },
  {
    id: 'level3buildreg35',
    question: "Under the Electricity at Work Regulations 1989, what is the requirement for the maintenance of electrical systems in the workplace?",
    options: ["Annual testing is always sufficient", "Maintenance only required after a fault occurs", "All systems shall be maintained, as necessary to prevent danger", "Only applies to systems installed after 1989"],
    correctAnswer: "All systems shall be maintained, as necessary to prevent danger",
    explanation: "Regulation 4(2) of the Electricity at Work Regulations 1989 states that: 'As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger.' The regulations do not specify fixed maintenance intervals but require a risk-based approach to determine appropriate maintenance frequency and scope."
  },
  {
    id: 'level3buildreg36',
    question: "What is the legal status of the Institution of Engineering and Technology (IET) Guidance Notes in relation to BS 7671?",
    options: ["They have no legal standing", "They are statutory requirements", "They provide authoritative guidance on interpreting and applying BS 7671", "They only apply to IET members"],
    correctAnswer: "They provide authoritative guidance on interpreting and applying BS 7671",
    explanation: "The IET Guidance Notes do not have direct legal status but provide authoritative guidance on interpreting and applying BS 7671. They represent industry best practice and are widely respected by professionals and authorities. Following them demonstrates due diligence in applying the Wiring Regulations, which may be important in demonstrating compliance with legal requirements in cases of dispute or investigation."
  },
  {
    id: 'level3buildreg37',
    question: "Under the Building Regulations Part P, what is the requirement for electrical work in a kitchen of a dwelling?",
    options: ["All electrical work must be notified to Building Control", "Only new circuit work is notifiable", "Kitchens are not considered 'special locations' so work is non-notifiable", "Only work exceeding £500 in value is notifiable"],
    correctAnswer: "Only new circuit work is notifiable",
    explanation: "Under the current version of Building Regulations Part P, kitchens are no longer classified as 'special locations' (this changed in the 2013 amendment). Therefore, only the installation of a new circuit or replacement of a consumer unit in a kitchen is notifiable, whereas additions and alterations to existing circuits are not notifiable unless they are in special locations like bathrooms or swimming pools."
  },
  {
    id: 'level3buildreg38',
    question: "Under the Construction (Design and Management) Regulations 2015, what is the primary duty of the principal designer regarding electrical safety?",
    options: ["To personally install all electrical systems", "To supervise all electrical work directly", "To plan, manage, and coordinate health and safety in the pre-construction phase, including identification of electrical risks", "To provide all electrical materials"],
    correctAnswer: "To plan, manage, and coordinate health and safety in the pre-construction phase, including identification of electrical risks",
    explanation: "Under CDM 2015, the principal designer must plan, manage, and coordinate health and safety in the pre-construction phase. This includes identifying and eliminating or controlling foreseeable electrical risks, ensuring designers carry out their duties, and preparing and providing relevant information to other duty holders, including information about electrical safety considerations."
  },
  {
    id: 'level3buildreg39',
    question: "What does the Control of Substances Hazardous to Health Regulations 2002 (COSHH) require regarding electrical installation work involving hazardous substances?",
    options: ["Only applies to work in industrial settings", "No specific requirements for electrical work", "Requires risk assessment and appropriate control measures for substances that may be hazardous to health", "Only applies to substances used in quantities greater than 5 liters"],
    correctAnswer: "Requires risk assessment and appropriate control measures for substances that may be hazardous to health",
    explanation: "COSHH requires employers to assess risks to health from hazardous substances and implement appropriate control measures. For electrical work, this includes assessing risks from substances like solvents in cable cleaning products, flux and solder fumes, dust from drilling, and materials encountered in specific environments like asbestos. Appropriate controls must then be implemented."
  },
  {
    id: 'level3buildreg40',
    question: "What is the maximum fine that can be imposed in the Magistrates' Court for a breach of the Building Regulations in England?",
    options: ["£1,000", "£5,000", "£20,000", "Unlimited"],
    correctAnswer: "Unlimited",
    explanation: "Since March 2015, the maximum fine that can be imposed in the Magistrates' Court for a breach of the Building Regulations in England is unlimited. Previously it was limited to £5,000. This change was made under the Legal Aid, Sentencing and Punishment of Offenders Act 2012, which removed the cap on certain fines, reflecting the potentially serious consequences of non-compliance."
  },
  {
    id: 'level3buildreg41',
    question: "Under the Electricity Safety, Quality and Continuity Regulations 2002 (as amended), what is the legal requirement regarding the earthing of customer installations connected to the public supply network?",
    options: ["All installations must have their own earth electrode", "Distributor must provide a connection to their earthing terminal if requested, unless unreasonable", "Earthing arrangements are entirely the customer's responsibility", "Only TT systems are legally permitted"],
    correctAnswer: "Distributor must provide a connection to their earthing terminal if requested, unless unreasonable",
    explanation: "Regulation 27 of the ESQCR requires that the distributor must, if requested, provide a connection to their earthing terminal, unless it would be unreasonable to do so. This underpins the provision of TN-S and TN-C-S (PME) earthing arrangements for customer installations connected to the public supply network."
  },
  {
    id: 'level3buildreg42',
    question: "What legal obligation does the Occupiers' Liability Act 1957 place on property owners regarding electrical installations?",
    options: ["No specific obligations regarding electrical installations", "Only applies to commercial premises", "Duty to take reasonable care that visitors are reasonably safe, including from electrical hazards", "Only applies to installations completed after 1957"],
    correctAnswer: "Duty to take reasonable care that visitors are reasonably safe, including from electrical hazards",
    explanation: "The Occupiers' Liability Act 1957 places a duty on occupiers (including property owners) to take reasonable care to ensure visitors are reasonably safe for the purposes for which they are invited to the premises. This includes ensuring electrical installations do not present hazards to visitors, with regular inspection and maintenance being part of this duty of care."
  },
  {
    id: 'level3buildreg43',
    question: "Under the Work at Height Regulations 2005, what is the specific requirement for electrical work involving ladders?",
    options: ["Ladders prohibited for all electrical work", "Ladders only permitted for work below 2 meters", "Ladders permitted only when risk assessment shows they are appropriate for the low risk, short duration task", "Only fiberglass ladders may be used"],
    correctAnswer: "Ladders permitted only when risk assessment shows they are appropriate for the low risk, short duration task",
    explanation: "The Work at Height Regulations 2005 do not ban ladders but require that they are only used when a risk assessment has shown that using more suitable work equipment is not justified because of the low risk and short duration of use, or existing features at the place of work that cannot be altered. This applies to all work at height, including electrical work."
  },
  {
    id: 'level3buildreg44',
    question: "What is the legal responsibility of a principal contractor under CDM 2015 regarding electrical safety on a construction site?",
    options: ["Only responsible for their own direct employees", "Responsible only if electrical work is the main activity", "Must ensure electrical safety for the entire construction phase through proper planning, management, and coordination", "Only responsible if specifically stated in contract"],
    correctAnswer: "Must ensure electrical safety for the entire construction phase through proper planning, management, and coordination",
    explanation: "Under CDM 2015, the principal contractor must plan, manage, monitor and coordinate the construction phase, including all aspects of electrical safety. This includes ensuring suitable site inductions, securing the site, providing welfare facilities, coordinating contractors, ensuring appropriate supervision, and applying the principles of prevention to electrical safety matters."
  },
  {
    id: 'level3buildreg45',
    question: "What is the specific purpose of the Electrical Equipment (Safety) Regulations 2016?",
    options: ["To regulate the work of electricians", "To ensure that electrical equipment placed on the market is safe", "To control the import of electrical goods only", "To set standards for electrical installations"],
    correctAnswer: "To ensure that electrical equipment placed on the market is safe",
    explanation: "The Electrical Equipment (Safety) Regulations 2016 ensure that electrical equipment placed on the UK market is safe. They set safety objectives that must be met before equipment can be sold, covering design, manufacture, and protective measures. These regulations apply to manufacturers, importers, and distributors, placing legal obligations on them regarding product safety."
  },
  {
    id: 'level3buildreg46',
    question: "Under the Electricity at Work Regulations 1989, what is the legal requirement for the competence of persons undertaking electrical test and inspection work?",
    options: ["Must hold City & Guilds 2391", "Must be over 21 years of age", "Must possess appropriate technical knowledge or experience to prevent danger and injury", "Must be registered with a government scheme"],
    correctAnswer: "Must possess appropriate technical knowledge or experience to prevent danger and injury",
    explanation: "Regulation 16 of the Electricity at Work Regulations 1989 requires that persons undertaking electrical work, including testing and inspection, must have appropriate technical knowledge or experience (or be under such supervision as appropriate) to prevent danger and injury. While formal qualifications like City & Guilds 2391 may demonstrate competence, the legal requirement focuses on actual capability rather than specific qualifications."
  },
  {
    id: 'level3buildreg47',
    question: "What is the specific legal requirement under the Provision and Use of Work Equipment Regulations 1998 (PUWER) regarding electrical isolation?",
    options: ["Only applies to equipment over 400V", "Requires all work equipment to be provided with suitable means to isolate it from all energy sources", "Only applies to permanently installed equipment", "Only applies to equipment installed after 1998"],
    correctAnswer: "Requires all work equipment to be provided with suitable means to isolate it from all energy sources",
    explanation: "Regulation 19 of PUWER requires that all work equipment must be provided with suitable means to isolate it from all sources of energy. These isolators must be clearly identifiable and readily accessible. This requirement applies to all work equipment regardless of voltage, installation date, or whether it is permanently installed or portable."
  },
  {
    id: 'level3buildreg48',
    question: "What is the legal status of the Memorandum of Guidance on the Electricity at Work Regulations 1989 published by the HSE?",
    options: ["It is the law itself", "It has no legal standing", "It provides guidance on meeting legal requirements and indicates standards of compliance", "It only applies to HSE inspectors"],
    correctAnswer: "It provides guidance on meeting legal requirements and indicates standards of compliance",
    explanation: "The Memorandum of Guidance is not the law itself and does not have legal force, but it provides authoritative guidance on interpreting and meeting the requirements of the Electricity at Work Regulations 1989. Courts may regard it as evidence of what is reasonably practicable, and it indicates the standards the HSE expects for compliance with the legal duties in the Regulations."
  },
  {
    id: 'level3buildreg49',
    question: "Under the Building Regulations, what is the specific requirement for emergency lighting in escape routes?",
    options: ["Must be maintained type only", "Must provide illumination for a minimum of 1 hour after power failure", "No specific requirement beyond general lighting", "Only applies to buildings over 4 stories"],
    correctAnswer: "Must provide illumination for a minimum of 1 hour after power failure",
    explanation: "The Building Regulations, through reference to BS 5266, require that emergency lighting in escape routes must provide illumination for a minimum of 1 hour after power failure. This ensures sufficient time for safe evacuation of the building in an emergency situation. The system must also achieve specified illumination levels and reach those levels within 5 seconds of power failure."
  },
  {
    id: 'level3buildreg50',
    question: "What is the specific requirement under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) regarding electrical accidents?",
    options: ["Only electrical fatalities need to be reported", "All electric shocks must be reported regardless of severity", "Electrical accidents resulting in death, specified injuries, or over 7-day incapacitation must be reported", "Only accidents involving equipment over 1000V must be reported"],
    correctAnswer: "Electrical accidents resulting in death, specified injuries, or over 7-day incapacitation must be reported",
    explanation: "RIDDOR requires reporting of any electrical accident that results in death, a specified injury (such as electrical burns, unconsciousness, etc.), or incapacitation for more than 7 days. Additionally, certain dangerous occurrences involving electricity (such as electrical short circuits or overloads that result in fire or explosion) must be reported regardless of whether injury occurs."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-building-regs', 'items', q.id), {
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

// 🔴 THIS LINE WAS MISSING
uploadQuestions();
