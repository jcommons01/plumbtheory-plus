// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3HealthSafety.ts

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

// ✅ Joinery Level 3 Advanced Health & Safety Questions
const questions = [
  {
    id: 'joinery-l3-health-safety1',
    question: "Under the Construction (Design and Management) Regulations 2015 (CDM 2015), what are the duties of a joinery contractor when acting as a 'contractor'?",
    options: ["Only to provide PPE to employees", "Only to complete the health and safety file", "To plan, manage and monitor their own work and that of workers; provide appropriate supervision, information and instructions; and ensure the site is secure", "Only to appoint a health and safety coordinator"],
    correctAnswer: "To plan, manage and monitor their own work and that of workers; provide appropriate supervision, information and instructions; and ensure the site is secure",
    explanation: "Under CDM 2015, contractors must plan and manage their work safely, provide appropriate supervision and instructions to workers, and ensure the site is secure. They must also coordinate activities with others, comply with directions from principal designers/contractors, and apply the principles of prevention."
  },
  {
    id: 'joinery-l3-health-safety2',
    question: "Which of the following is the correct hierarchy of risk control measures according to the Health and Safety Executive (HSE)?",
    options: ["1. PPE 2. Engineering controls 3. Elimination 4. Substitution 5. Administrative controls", "1. Elimination 2. Substitution 3. Engineering controls 4. Administrative controls 5. PPE", "1. Engineering controls 2. Elimination 3. Substitution 4. PPE 5. Administrative controls", "1. Substitution 2. Elimination 3. PPE 4. Engineering controls 5. Administrative controls"],
    correctAnswer: "1. Elimination 2. Substitution 3. Engineering controls 4. Administrative controls 5. PPE",
    explanation: "The correct hierarchy is: 1. Elimination (removing the hazard) 2. Substitution (replacing with something less hazardous) 3. Engineering controls (isolation/guarding) 4. Administrative controls (safe working procedures) 5. PPE (last resort). This approach prioritizes controlling risks at source rather than relying on behavior or protection."
  },
  {
    id: 'joinery-l3-health-safety3',
    question: "What are the legal responsibilities of a joinery company regarding wood dust exposure under the Control of Substances Hazardous to Health Regulations (COSHH)?",
    options: ["Only to provide dust masks to workers", "Only to have a written health and safety policy", "Only to ensure workers clean up dust at the end of each day", "To assess risks, implement adequate control measures, provide information, instruction and training, and conduct health surveillance where appropriate"],
    correctAnswer: "To assess risks, implement adequate control measures, provide information, instruction and training, and conduct health surveillance where appropriate",
    explanation: "Under COSHH, employers must assess wood dust risks, implement controls (primarily engineering controls like extraction systems), provide training on safe practices, and conduct health surveillance for at-risk workers. Wood dust is classified as a carcinogen, requiring stringent controls to prevent serious health conditions."
  },
  {
    id: 'joinery-l3-health-safety4',
    question: "What is a Principal Contractor's duty regarding the Construction Phase Plan under CDM 2015?",
    options: ["They must only ensure subcontractors have copies", "They must prepare the plan, review, update and revise it as the project progresses", "They need only verbally communicate the plan to workers", "They have no specific duties regarding the Construction Phase Plan"],
    correctAnswer: "They must prepare the plan, review, update and revise it as the project progresses",
    explanation: "Under CDM 2015, the Principal Contractor must prepare the Construction Phase Plan before setting up the site, then review and update it as work progresses. The plan must detail health and safety arrangements, site rules, and specific measures for high-risk work to ensure safe management of the construction phase."
  },
  {
    id: 'joinery-l3-health-safety5',
    question: "What is meant by the term 'competent person' in UK health and safety legislation?",
    options: ["Anyone who has been working in the industry for at least five years", "Someone who has the necessary training, experience, knowledge, and other qualities to perform a particular task safely", "Only someone with formal health and safety qualifications", "Any person appointed by management regardless of their qualifications"],
    correctAnswer: "Someone who has the necessary training, experience, knowledge, and other qualities to perform a particular task safely",
    explanation: "A 'competent person' has sufficient training, experience, knowledge, and other qualities to safely perform specific tasks. Competence is task-specific and requires both theoretical knowledge and practical ability. The person must understand their limitations and when to seek additional expertise."
  },
  {
    id: 'joinery-l3-health-safety6',
    question: "Under what circumstances must accidents and incidents be reported under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR)?",
    options: ["Only when someone is killed", "Only when property is damaged", "When specified workplace accidents, occupational diseases, and dangerous occurrences occur", "Only when a member of the public is injured"],
    correctAnswer: "When specified workplace accidents, occupational diseases, and dangerous occurrences occur",
    explanation: "RIDDOR requires reporting of: work-related deaths; specified injuries (fractures, amputations); over-seven-day injuries; diagnosed occupational diseases (like occupational asthma); and dangerous occurrences with potential for serious harm. Reports must be made within specific timeframes to the HSE."
  },
  {
    id: 'joinery-l3-health-safety7',
    question: "What type of fire extinguisher should NOT be used on electrical equipment fires?",
    options: ["CO2 extinguishers", "Dry powder extinguishers", "Water extinguishers", "Fire blankets"],
    correctAnswer: "Water extinguishers",
    explanation: "Water extinguishers should never be used on electrical fires as water conducts electricity, creating a serious electrocution risk to the user. For electrical equipment fires, CO2 extinguishers are preferred as they leave no residue, while dry powder extinguishers are also suitable but leave residue that may damage equipment."
  },
  {
    id: 'joinery-l3-health-safety8',
    question: "What are the main requirements for a thorough examination of lifting equipment under the Lifting Operations and Lifting Equipment Regulations (LOLER)?",
    options: ["Visual inspection by any employee is sufficient", "Inspection only after equipment has failed", "Examination by a competent person at specified intervals, with appropriate reports and records kept", "Examination only when purchasing new equipment"],
    correctAnswer: "Examination by a competent person at specified intervals, with appropriate reports and records kept",
    explanation: "LOLER requires lifting equipment to be thoroughly examined by a competent person: before first use; at 6-month intervals for equipment lifting people or accessories; at 12-month intervals for other lifting equipment; and after exceptional circumstances. Detailed reports must be kept and defects reported to the employer and enforcing authority."
  },
  {
    id: 'joinery-l3-health-safety9',
    question: "Which of the following is a requirement under the Work at Height Regulations 2005?",
    options: ["Work at height should always be avoided in all circumstances", "Collective protection measures (like scaffolds or guardrails) should be given priority over personal protection measures (like harnesses)", "Ladders must never be used for any work at height", "Risk assessments are only required for work above 2 meters"],
    correctAnswer: "Collective protection measures (like scaffolds or guardrails) should be given priority over personal protection measures (like harnesses)",
    explanation: "The Work at Height Regulations establish a hierarchy: avoid work at height where possible; use collective protection (guardrails, scaffolds) when work at height is necessary; and use personal protection only when collective measures aren't feasible. Risk assessments are required for all work at height regardless of distance."
  },
  {
    id: 'joinery-l3-health-safety10',
    question: "What are the employer's duties regarding health surveillance for employees exposed to hand-arm vibration?",
    options: ["Only to provide anti-vibration gloves", "Only to limit tool usage to 30-minute periods", "To assess risks, implement control measures, provide health surveillance for at-risk workers, and take action on results", "Only to purchase low-vibration tools"],
    correctAnswer: "To assess risks, implement control measures, provide health surveillance for at-risk workers, and take action on results",
    explanation: "Employers must assess hand-arm vibration risks, implement controls to reduce exposure, provide health surveillance for workers exposed above the action value (2.5 m/s² A(8)), and act on surveillance results. Control measures should include low-vibration tools, job rotation, and proper training on safe use."
  },
  {
    id: 'joinery-l3-health-safety11',
    question: "Under the Provision and Use of Work Equipment Regulations (PUWER), what are the key requirements for woodworking machinery?",
    options: ["Only that it has a CE mark", "Only that it is inspected once when purchased", "That it is suitable for the intended use, maintained, inspected, accompanied by appropriate safety measures, and used only by trained and authorized persons", "Only that it is used by employees over 18 years of age"],
    correctAnswer: "That it is suitable for the intended use, maintained, inspected, accompanied by appropriate safety measures, and used only by trained and authorized persons",
    explanation: "PUWER requires woodworking machinery to be: suitable for its purpose; maintained in safe condition; properly guarded with emergency stops; inspected regularly; and used only by trained, authorized persons. Additional requirements are detailed in the Approved Code of Practice 'Safe use of woodworking machinery'."
  },
  {
    id: 'joinery-l3-health-safety12',
    question: "What is the purpose of a Permit to Work system in high-risk joinery operations?",
    options: ["Only to satisfy insurance requirements", "Only to record working hours", "To provide a formal, documented system ensuring hazardous work is properly planned, assessed, authorized and controlled", "Only to allocate blame after an accident"],
    correctAnswer: "To provide a formal, documented system ensuring hazardous work is properly planned, assessed, authorized and controlled",
    explanation: "A Permit to Work system provides formal documentation and control for high-risk activities like hot works or work in confined spaces. It specifies hazards, precautions, time limitations, and competent persons, requiring formal authorization before work begins and sign-off when complete, creating accountability and ensuring proper risk management."
  },
  {
    id: 'joinery-l3-health-safety13',
    question: "What are an employer's duties under the Health and Safety (First Aid) Regulations regarding the provision of first aid in a joinery workshop?",
    options: ["Only to provide a basic first aid kit", "Only to appoint one trained first aider regardless of workshop size", "To assess first aid needs, provide appropriate equipment, facilities and personnel, and inform employees of arrangements", "Only to display a first aid poster"],
    correctAnswer: "To assess first aid needs, provide appropriate equipment, facilities and personnel, and inform employees of arrangements",
    explanation: "Employers must assess first aid needs considering workplace hazards, workforce size and distribution, and proximity to emergency services. They must provide appropriate first aid equipment, facilities, and trained personnel based on this assessment, and ensure all employees know the arrangements."
  },
  {
    id: 'joinery-l3-health-safety14',
    question: "What are the legal requirements for managing asbestos risks when joinery work might disturb existing building materials?",
    options: ["Only a visual inspection is required before work begins", "There are no specific requirements unless the building was constructed before 1970", "Determine if asbestos is present through appropriate surveys, conduct risk assessment, and implement proper controls if asbestos-containing materials might be disturbed", "Only specialist contractors need to consider asbestos risks"],
    correctAnswer: "Determine if asbestos is present through appropriate surveys, conduct risk assessment, and implement proper controls if asbestos-containing materials might be disturbed",
    explanation: "For pre-2000 buildings, contractors must check the asbestos register or commission a survey if necessary, conduct risk assessment if asbestos might be present, avoid disturbing it when possible, and use appropriate controls or licensed contractors when disturbance is unavoidable. All workers must have asbestos awareness training."
  },
  {
    id: 'joinery-l3-health-safety15',
    question: "What are the legal requirements regarding young persons (under 18) working in joinery operations?",
    options: ["Young persons cannot work in joinery under any circumstances", "The only requirement is parental consent", "Specific risk assessment considering physical and psychological capabilities, implementation of appropriate controls, and restrictions on certain high-risk activities", "There are no special requirements beyond those applying to all workers"],
    correctAnswer: "Specific risk assessment considering physical and psychological capabilities, implementation of appropriate controls, and restrictions on certain high-risk activities",
    explanation: "A specific risk assessment must consider young persons' physical and psychological capabilities and lack of experience. Additional controls like enhanced supervision must be implemented, with restrictions on exposure to certain hazards and dangerous machinery. Working time restrictions also apply to young workers."
  },
  {
    id: 'joinery-l3-health-safety16',
    question: "What are the main duties of a joinery contractor under the Construction (Design and Management) Regulations 2015 when working on a domestic client's property?",
    options: ["There are no duties as the regulations don't apply to domestic properties", "Only to wear PPE while on site", "To comply with directions from the principal designer and principal contractor, cooperate with others, and report dangers", "Only to ensure noise is kept to a minimum"],
    correctAnswer: "To comply with directions from the principal designer and principal contractor, cooperate with others, and report dangers",
    explanation: "CDM 2015 applies to domestic projects, with contractors required to plan, manage and monitor their work; ensure workers have appropriate skills; provide supervision; prevent unauthorized access; cooperate with others; and follow site rules. When they're the only contractor, they effectively take on the client's duties as well."
  },
  {
    id: 'joinery-l3-health-safety17',
    question: "What are the requirements for local exhaust ventilation (LEV) systems used to control wood dust in joinery workshops?",
    options: ["Visual inspection once a year is sufficient", "They only need to be switched on when an inspector visits", "They must be properly designed for the specific application, adequately maintained, and thoroughly examined and tested at least every 14 months", "There are no specific legal requirements beyond having some form of dust extraction"],
    correctAnswer: "They must be properly designed for the specific application, adequately maintained, and thoroughly examined and tested at least every 14 months",
    explanation: "LEV systems must be designed by competent persons with appropriate capture capabilities for wood dust, include indicators showing they're functioning correctly, be subject to regular maintenance, and undergo thorough examination and testing by a competent person at least every 14 months, with records kept for 5 years."
  },
  {
    id: 'joinery-l3-health-safety18',
    question: "What are the key requirements for manual handling risk assessments in joinery operations?",
    options: ["They're only required for loads over 25kg", "They only need to consider the weight of the load", "They must consider the task, individual capability, load, and environment (TILE)", "They're not required if mechanical handling equipment is available on site"],
    correctAnswer: "They must consider the task, individual capability, load, and environment (TILE)",
    explanation: "Manual handling assessments must consider the Task (postures, distances), Individual (physical capability, training), Load (weight, stability, sharp edges), and Environment (space constraints, floor conditions). The assessment should lead to specific control measures to reduce injury risk."
  },
  {
    id: 'joinery-l3-health-safety19',
    question: "Under the Personal Protective Equipment at Work Regulations, what are an employer's duties regarding PPE for joinery operations?",
    options: ["Only to make PPE available for purchase by employees", "Only to provide basic items like safety boots and gloves", "To assess risks and provide suitable PPE free of charge where risks cannot be controlled by other means, along with information, instruction, and training on its use", "Only to recommend what PPE should be used"],
    correctAnswer: "To assess risks and provide suitable PPE free of charge where risks cannot be controlled by other means, along with information, instruction, and training on its use",
    explanation: "Employers must provide suitable PPE free of charge when risks can't be adequately controlled by other means, ensure it's maintained, replaced when damaged, and stored properly when not in use. They must also provide training on correct use and ensure compatibility between different PPE items."
  },
  {
    id: 'joinery-l3-health-safety20',
    question: "What are the requirements for maintaining a health and safety policy in a joinery business with five or more employees?",
    options: ["Only a verbal policy is required", "Only a standard template needs to be purchased and displayed", "A written policy that includes a general statement of intent, organization details (responsibilities), and arrangements for implementation", "There are no specific requirements for small businesses"],
    correctAnswer: "A written policy that includes a general statement of intent, organization details (responsibilities), and arrangements for implementation",
    explanation: "A written policy is legally required, comprising a statement expressing commitment to health and safety, clearly defined responsibilities at all levels, and detailed arrangements for implementation. It must be specific to the business, reviewed regularly, and communicated to all employees."
  },
  {
    id: 'joinery-l3-health-safety21',
    question: "What are a joinery employer's duties regarding noise exposure under the Control of Noise at Work Regulations?",
    options: ["Only to provide hearing protection to employees", "Only to conduct an annual hearing test", "To assess risks, take action to reduce exposure, provide hearing protection, ensure legal limits aren't exceeded, provide information and training, and conduct health surveillance where appropriate", "Only to purchase quieter machinery"],
    correctAnswer: "To assess risks, take action to reduce exposure, provide hearing protection, ensure legal limits aren't exceeded, provide information and training, and conduct health surveillance where appropriate",
    explanation: "Employers must assess noise risks, reduce exposure through engineering and organizational controls, provide hearing protection when noise exceeds 85 dB(A), ensure exposure doesn't exceed legal limits, provide training on risks and protection, and conduct health surveillance where there's a risk to health."
  },
  {
    id: 'joinery-l3-health-safety22',
    question: "What is required to comply with the Regulatory Reform (Fire Safety) Order in a joinery workshop?",
    options: ["Only installing a fire alarm system", "Only providing fire extinguishers", "Conducting a fire risk assessment, implementing appropriate precautions, having an emergency plan, providing training, and regular maintenance of fire safety equipment", "Only having fire insurance"],
    correctAnswer: "Conducting a fire risk assessment, implementing appropriate precautions, having an emergency plan, providing training, and regular maintenance of fire safety equipment",
    explanation: "The responsible person must conduct a fire risk assessment considering the specific risks in joinery workshops, implement appropriate prevention measures, provide detection systems, ensure adequate escape routes, install appropriate firefighting equipment, establish emergency procedures, provide staff training, and maintain all fire safety equipment."
  },
  {
    id: 'joinery-l3-health-safety23',
    question: "What must be considered in a COSHH assessment for wood finishes and adhesives used in joinery?",
    options: ["Only the cost of the products", "Only whether the products are water-based or solvent-based", "The hazardous properties, exposure routes, control measures required, health surveillance needs, and emergency procedures", "Only whether appropriate PPE is available"],
    correctAnswer: "The hazardous properties, exposure routes, control measures required, health surveillance needs, and emergency procedures",
    explanation: "COSHH assessments must consider each product's hazardous properties from Safety Data Sheets, routes of exposure, appropriate control measures following the hierarchy of controls, health surveillance requirements (particularly for sensitizers), storage requirements, and emergency procedures for spills or accidents."
  },
  {
    id: 'joinery-l3-health-safety24',
    question: "What are the legal requirements for monitoring employees' exposure to wood dust in a joinery workshop?",
    options: ["No monitoring is required as long as dust extraction is installed", "Monitoring is only required if employees complain about dust", "Monitoring may be required to determine the effectiveness of control measures and ensure workplace exposure limits are not exceeded", "Monitoring is only required in workshops with more than 50 employees"],
    correctAnswer: "Monitoring may be required to determine the effectiveness of control measures and ensure workplace exposure limits are not exceeded",
    explanation: "Monitoring is necessary when there's uncertainty about whether exposure limits are being breached, to evaluate control measure effectiveness, or where control failure could result in serious health effects. For wood dust (WEL of 5 mg/m³), monitoring typically involves personal air sampling analyzed by accredited laboratories."
  },
  {
    id: 'joinery-l3-health-safety25',
    question: "What are an employer's duties under the Control of Substances Hazardous to Health (COSHH) Regulations regarding health surveillance for joinery workers?",
    options: ["Health surveillance is only required if employees request it", "Health surveillance is only necessary for workers over 50", "To determine if health surveillance is needed based on risk assessment, implement appropriate surveillance where required, keep records, and act on results", "Health surveillance is only required for apprentices"],
    correctAnswer: "To determine if health surveillance is needed based on risk assessment, implement appropriate surveillance where required, keep records, and act on results",
    explanation: "Health surveillance is required where there's an identifiable disease related to the exposure, valid detection techniques exist, and disease occurrence is reasonably likely. For joinery workers, this typically includes respiratory monitoring for wood dust exposure, skin checks, and lung function tests, with records kept for at least 40 years for carcinogen exposure."
  },
  {
    id: 'joinery-l3-health-safety26',
    question: "Under the Provision and Use of Work Equipment Regulations (PUWER), what are the requirements for maintenance of woodworking machinery?",
    options: ["Maintenance is only required when machinery breaks down", "Visual inspection once a year is sufficient", "Machinery must be maintained in efficient working order, good repair, and appropriate records kept", "There are no specific maintenance requirements beyond manufacturer recommendations"],
    correctAnswer: "Machinery must be maintained in efficient working order, good repair, and appropriate records kept",
    explanation: "Machinery must be maintained in safe working condition with regular preventative maintenance following manufacturer's recommendations, regular checks of safety features, prompt repair of defects, formal inspections by competent persons, and proper maintenance records, particularly for high-risk equipment."
  },
  {
    id: 'joinery-l3-health-safety27',
    question: "What information must be included in a written risk assessment for joinery operations to comply with the Management of Health and Safety at Work Regulations?",
    options: ["Only the signatures of all employees", "Only the cost of implementing safety measures", "Identification of hazards, people at risk, evaluation of risks, control measures, and review arrangements", "Only details of previous accidents"],
    correctAnswer: "Identification of hazards, people at risk, evaluation of risks, control measures, and review arrangements",
    explanation: "A written risk assessment must identify significant hazards, who might be harmed and how, existing control measures, residual risk evaluation, additional controls required, responsibility for implementation, monitoring arrangements, and review plans. It must be suitable and sufficient for the specific workplace."
  },
  {
    id: 'joinery-l3-health-safety28',
    question: "What are the specific requirements for reporting injuries under RIDDOR in a joinery business?",
    options: ["Only fatalities need to be reported", "All injuries, no matter how minor, must be reported", "Specified injuries, over-seven-day injuries, diagnosed occupational diseases, and dangerous occurrences must be reported to the HSE", "Only injuries to members of the public need to be reported"],
    correctAnswer: "Specified injuries, over-seven-day injuries, diagnosed occupational diseases, and dangerous occurrences must be reported to the HSE",
    explanation: "RIDDOR requires reporting of fatalities (immediately), specified injuries like fractures or amputations (without delay), injuries preventing normal work for over seven days (within 15 days), diagnosed occupational diseases, and dangerous occurrences like equipment failure. Reports must be made to the HSE through their online system."
  },
  {
    id: 'joinery-l3-health-safety29',
    question: "What are the legal requirements regarding safety signs in a joinery workshop under the Health and Safety (Safety Signs and Signals) Regulations?",
    options: ["Safety signs are optional and at the employer's discretion", "Only fire exit signs are required by law", "Appropriate safety signs must be provided where risks cannot be avoided or adequately reduced by other means", "Only machine-specific warning signs are required"],
    correctAnswer: "Appropriate safety signs must be provided where risks cannot be avoided or adequately reduced by other means",
    explanation: "Safety signs must be provided where risks remain after other controls are implemented. Signs must follow standardized formats (colors, shapes, pictograms), be maintained in good condition, and employees must be trained on their meaning. Signs are not a substitute for other risk controls."
  },
  {
    id: 'joinery-l3-health-safety30',
    question: "What are the requirements for electrical safety in a joinery workshop under the Electricity at Work Regulations?",
    options: ["Only ensuring RCD protection on all circuits", "Only conducting a PAT test once every five years", "Ensuring electrical systems are safely constructed, maintained, and inspected, with formal inspection and testing by competent persons at appropriate intervals", "Only providing employee training on electrical hazards"],
    correctAnswer: "Ensuring electrical systems are safely constructed, maintained, and inspected, with formal inspection and testing by competent persons at appropriate intervals",
    explanation: "Electrical systems must be safely constructed and maintained, with regular user checks, formal PAT testing at appropriate intervals (typically annual for workshop tools), and fixed installation testing every 3-5 years. Only competent persons should work on electrical installations, and particular attention must be paid to dust ingress in joinery environments."
  },
  {
    id: 'joinery-l3-health-safety31',
    question: "What are the legal requirements regarding workplace temperature in a joinery workshop?",
    options: ["There are no legal requirements regarding workplace temperature", "Temperature must always be at least 25°C", "Temperature must be reasonable and at least 16°C (or 13°C for strenuous work)", "Air conditioning must be provided if temperature exceeds 30°C"],
    correctAnswer: "Temperature must be reasonable and at least 16°C (or 13°C for strenuous work)",
    explanation: "Workplace temperature must be reasonable, with minimum temperatures of 16°C generally or 13°C for strenuous physical work. While there's no specified maximum, employers must provide adequate thermometers, local heating where needed, and consider the effects of extraction systems on temperature."
  },
  {
    id: 'joinery-l3-health-safety32',
    question: "Under the Working at Height Regulations, what are the requirements when selecting equipment for installing joinery at height?",
    options: ["Always use ladders as they are the most cost-effective option", "Always use scaffolding regardless of the task duration", "Select the most suitable equipment based on risk assessment, considering the task, duration, frequency, and height of the work", "Only consider the initial cost of the equipment"],
    correctAnswer: "Select the most suitable equipment based on risk assessment, considering the task, duration, frequency, and height of the work",
    explanation: "Equipment selection must be based on risk assessment considering the nature, duration, and frequency of the task. Collective protection should be prioritized over personal protection, and ladders only used for low-risk, short-duration tasks where alternatives aren't reasonably practicable."
  },
  {
    id: 'joinery-l3-health-safety33',
    question: "What are an employer's duties regarding workplace welfare facilities in a joinery workshop?",
    options: ["Only to provide a toilet", "Only to provide drinking water", "To provide adequate toilets, washing facilities, drinking water, rest facilities, changing rooms where necessary, and facilities for eating meals", "Only to provide a first aid kit"],
    correctAnswer: "To provide adequate toilets, washing facilities, drinking water, rest facilities, changing rooms where necessary, and facilities for eating meals",
    explanation: "Employers must provide clean toilets; washing facilities with hot/cold water, soap and drying means; drinking water; rest facilities for breaks; changing facilities where special work clothes are needed; and eating facilities away from the work area to avoid contamination from wood dust."
  },
  {
    id: 'joinery-l3-health-safety34',
    question: "What are the requirements regarding health and safety training for joinery workers?",
    options: ["Training is optional and at the employer's discretion", "Only apprentices require training", "Employers must provide adequate health and safety training on recruitment, when exposed to new risks, and periodically as needed", "Only a general induction is required with no specific training for individual tasks"],
    correctAnswer: "Employers must provide adequate health and safety training on recruitment, when exposed to new risks, and periodically as needed",
    explanation: "Employers must provide induction training, job-specific training for machinery and equipment, instruction on hazards and controls, training on PPE use, and additional training when new equipment or procedures are introduced. Training must be during working hours and at no cost to employees."
  },
  {
    id: 'joinery-l3-health-safety35',
    question: "What information must be displayed on the Health and Safety Law poster in a joinery business?",
    options: ["Only the company's health and safety policy", "Only the name of the first aider", "Basic health and safety information including employer and employee duties, and details of who workers can contact about health and safety matters", "Only the fire evacuation procedure"],
    correctAnswer: "Basic health and safety information including employer and employee duties, and details of who workers can contact about health and safety matters",
    explanation: "The poster must display a summary of workers' and employers' health and safety duties, guidance on what to do if there's a problem, and have completed fields showing contact details for health and safety representatives and advisors. It must be displayed where all workers can see it."
  },
  {
    id: 'joinery-l3-health-safety36',
    question: "What are the legal requirements for managing contractors who perform maintenance or installation work in a joinery business?",
    options: ["There are no legal requirements beyond basic site induction", "Only ensuring contractors have their own insurance", "Selecting competent contractors, exchanging health and safety information, providing site rules and induction, coordination of activities, and monitoring performance", "Only checking contractors' qualifications"],
    correctAnswer: "Selecting competent contractors, exchanging health and safety information, providing site rules and induction, coordination of activities, and monitoring performance",
    explanation: "Businesses must select competent contractors, exchange health and safety information, coordinate activities to avoid conflicting risks, provide site induction, establish communication channels, monitor contractor performance, and review on completion. Particular attention is needed for contractors working on electrical systems or machinery maintenance."
  },
  {
    id: 'joinery-l3-health-safety37',
    question: "What are the requirements regarding emergency procedures in a joinery workshop?",
    options: ["Only fire evacuation procedures are needed", "Only first aid procedures are needed", "Procedures must cover all foreseeable emergencies including fire, serious injuries, hazardous substance spills, and power failures", "There are no specific requirements for emergency procedures"],
    correctAnswer: "Procedures must cover all foreseeable emergencies including fire, serious injuries, hazardous substance spills, and power failures",
    explanation: "Emergency procedures must cover all foreseeable emergencies, establishing evacuation routes, assembly points, responsible persons, communication systems, arrangements for contacting emergency services, and specific procedures for hazards like dust explosions or chemical spills. Procedures must be communicated to all workers and regularly tested."
  },
  {
    id: 'joinery-l3-health-safety38',
    question: "What are the key requirements of the Construction (Design and Management) Regulations 2015 regarding health and safety information for a joinery project?",
    options: ["Information is only required for projects lasting more than 500 person-days", "Only verbal briefings are needed for small projects", "Pre-construction information provided to contractors, construction phase plans for all projects, and health and safety files for projects with more than one contractor", "Information is only required for projects worth over £1 million"],
    correctAnswer: "Pre-construction information provided to contractors, construction phase plans for all projects, and health and safety files for projects with more than one contractor",
    explanation: "CDM 2015 requires pre-construction information to be provided to contractors during tendering, construction phase plans for ALL projects regardless of size setting out health and safety arrangements, and health and safety files for projects with more than one contractor containing information needed for future maintenance or renovation."
  },
  {
    id: 'joinery-l3-health-safety39',
    question: "What are the legal requirements for risk assessment documentation in a joinery business?",
    options: ["There are no requirements to document risk assessments", "Only assessments for machinery need to be documented", "Written risk assessments are required if the business has five or more employees", "Risk assessments only need to be documented for apprentices"],
    correctAnswer: "Written risk assessments are required if the business has five or more employees",
    explanation: "All employers must conduct suitable and sufficient risk assessments, but only those with five or more employees must record the significant findings. Records should include identified hazards, existing controls, who might be affected, conclusions about risk level, and additional controls required."
  },
  {
    id: 'joinery-l3-health-safety40',
    question: "Under UK regulations, what are the requirements for securing loads of joinery products during transport?",
    options: ["There are no specific requirements as long as the driver is careful", "Only items over 100kg need to be secured", "Loads must be secured to prevent them falling or moving in a way that could affect vehicle handling or cause injury", "Only high-value items need to be secured"],
    correctAnswer: "Loads must be secured to prevent them falling or moving in a way that could affect vehicle handling or cause injury",
    explanation: "The Road Traffic Act and Road Vehicles Regulations require that loads are secured to prevent danger to any person or property. This involves using appropriate restraint systems, distributing weight evenly, protecting edges to prevent strap damage, and ensuring restraints are checked before and during journeys."
  },
  {
    id: 'joinery-l3-health-safety41',
    question: "What is the definition of a 'dangerous occurrence' that must be reported under RIDDOR?",
    options: ["Any accident resulting in a minor injury", "Any near miss, however minor", "Specified near-miss events with high potential for serious injury, even if no one was actually harmed", "Only events that result in property damage"],
    correctAnswer: "Specified near-miss events with high potential for serious injury, even if no one was actually harmed",
    explanation: "RIDDOR defines dangerous occurrences as specific incidents with high potential for harm, even when no injury occurs. These include equipment collapse, hazardous substance release, electrical incidents causing fire or explosion, and structural collapses. These events must be reported to the HSE even without injury."
  },
  {
    id: 'joinery-l3-health-safety42',
    question: "What are the requirements for ensuring workers' competence to use woodworking machinery safely?",
    options: ["Only written authorization is required", "There are no specific requirements as long as the worker is over 18", "Provision of information, instruction, training, and supervision, with authorization only when demonstrated competence is achieved", "Only manufacturer's instructions need to be provided"],
    correctAnswer: "Provision of information, instruction, training, and supervision, with authorization only when demonstrated competence is achieved",
    explanation: "Workers must receive adequate training on specific machines, instruction on precautions, supervised practical experience, and be formally authorized in writing only after demonstrating competence. Young persons have additional restrictions and must be properly supervised during training."
  },
  {
    id: 'joinery-l3-health-safety43',
    question: "What are the legal responsibilities of joinery workers under the Health and Safety at Work Act?",
    options: ["Workers have no legal responsibilities, only employers do", "Workers are only responsible for their own health and safety but not others", "Workers must take reasonable care of their own and others' safety, cooperate with employers, and not interfere with safety provisions", "Workers are only responsible for following written procedures"],
    correctAnswer: "Workers must take reasonable care of their own and others' safety, cooperate with employers, and not interfere with safety provisions",
    explanation: "Under Section 7 of the Act, workers must take reasonable care of themselves and others, and cooperate with employers on safety matters. Section 8 makes it an offense to intentionally interfere with safety provisions. Workers can be personally prosecuted for deliberately disregarding safety requirements."
  },
  {
    id: 'joinery-l3-health-safety44',
    question: "What are an employer's duties regarding consultation with employees on health and safety matters?",
    options: ["Consultation is optional and at the employer's discretion", "Only consulting with a health and safety professional is required", "To consult employees or their representatives on matters affecting their health and safety", "Only providing information with no requirement for consultation"],
    correctAnswer: "To consult employees or their representatives on matters affecting their health and safety",
    explanation: "Employers must consult on: measures affecting health and safety; competent person appointments; health and safety information; training planning; and consequences of new technology. This can be through trade union representatives, elected representatives, or direct consultation, improving awareness and creating a positive safety culture."
  },
  {
    id: 'joinery-l3-health-safety45',
    question: "What are the legal requirements for managing the risks of using hand-held power tools in joinery operations?",
    options: ["There are no specific legal requirements beyond general risk assessment", "Only providing suitable gloves is required", "Assess risks, implement appropriate controls including selection, maintenance and proper use of tools, and provide information, instruction, and training", "Only purchasing tools with a CE mark is required"],
    correctAnswer: "Assess risks, implement appropriate controls including selection, maintenance and proper use of tools, and provide information, instruction, and training",
    explanation: "Employers must assess risks from hand-held power tools, select appropriate tools for the task, implement control measures for hazards like dust and vibration, maintain tools in good working order, provide training on safe use, and ensure proper PPE is available and used correctly."
  },
  {
    id: 'joinery-l3-health-safety46',
    question: "What does a health and safety audit in a joinery business involve?",
    options: ["Only checking that PPE is being worn", "Only reviewing accident records", "A structured, documented examination of the entire health and safety management system to verify compliance and effectiveness", "Only inspecting machinery guards"],
    correctAnswer: "A structured, documented examination of the entire health and safety management system to verify compliance and effectiveness",
    explanation: "A health and safety audit involves systematic examination of the entire safety management system, reviewing documentation, observing workplace practices, interviewing staff, checking compliance with regulations, and assessing risk control effectiveness. Findings form the basis for improvement actions with assigned responsibilities and timelines."
  },
  {
    id: 'joinery-l3-health-safety47',
    question: "What are the requirements for providing health and safety information to employees in a joinery business?",
    options: ["Information is only required when employees request it", "Only a health and safety poster is required", "Comprehensive information on risks, control measures, emergency procedures, and health surveillance results must be provided in an understandable form", "Only verbal instructions are needed"],
    correctAnswer: "Comprehensive information on risks, control measures, emergency procedures, and health surveillance results must be provided in an understandable form",
    explanation: "Employers must provide comprehensive information about workplace risks, preventive measures, emergency procedures, safe working methods, and health surveillance results. This must be in a form that's understandable to all workers, considering language abilities and literacy levels."
  },
  {
    id: 'joinery-l3-health-safety48',
    question: "What is the purpose of a toolbox talk in joinery health and safety management?",
    options: ["Only to discuss which tools are needed for a job", "Only to introduce new equipment", "To provide brief, focused safety discussions on specific topics relevant to current work activities", "Only to reprimand workers for safety violations"],
    correctAnswer: "To provide brief, focused safety discussions on specific topics relevant to current work activities",
    explanation: "Toolbox talks are brief, focused discussions on specific safety topics relevant to current work. They reinforce key safety messages, highlight particular hazards, remind workers of control measures, and maintain safety awareness through regular, informal communication sessions typically delivered at the workplace."
  },
  {
    id: 'joinery-l3-health-safety49',
    question: "What are the requirements for preventing falls from height during installation of joinery at height?",
    options: ["Only telling workers to be careful", "Only providing a hard hat", "Conducting a risk assessment and implementing a hierarchy of control measures with collective protection prioritized over personal protection", "Only using ladders"],
    correctAnswer: "Conducting a risk assessment and implementing a hierarchy of control measures with collective protection prioritized over personal protection",
    explanation: "A risk assessment must identify fall hazards and implement controls following the hierarchy: avoid work at height where possible; prevent falls using edge protection, scaffolds, or MEWPs; mitigate fall consequences using fall arrest systems if prevention isn't feasible; and ensure all equipment is inspected and workers are trained."
  },
  {
    id: 'joinery-l3-health-safety50',
    question: "What are an employer's duties regarding occupational health surveillance for joinery workers potentially exposed to wood dust?",
    options: ["Health surveillance is optional at the employer's discretion", "Only a questionnaire needs to be completed annually", "Risk-based health surveillance program including lung function tests and health questionnaires carried out by competent persons with appropriate record keeping", "Health surveillance is only required if a worker shows symptoms"],
    correctAnswer: "Risk-based health surveillance program including lung function tests and health questionnaires carried out by competent persons with appropriate record keeping",
    explanation: "For wood dust exposure, employers must implement a health surveillance program including baseline assessments, periodic lung function tests, health questionnaires, and clinical examinations by occupational health professionals. Records must be kept for at least 40 years for carcinogen exposure, and results must guide control measure improvements."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-health-safety', 'items', q.id), {
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
