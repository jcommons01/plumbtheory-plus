// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3HealthSafety.ts

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

// ✅ HVAC Level 3 Advanced Health & Safety Questions
const questions = [
  {
    id: 'hvac-l3-health-safety1',
    question: "Under the Management of Health and Safety at Work Regulations 1999, who holds the primary responsibility for conducting risk assessments?",
    options: ["Health and Safety Executive (HSE) inspectors", "Environmental health officers", "Employers", "Employee representatives"],
    correctAnswer: "Employers",
    explanation: "Under the Management of Health and Safety at Work Regulations 1999, employers hold the primary responsibility for conducting risk assessments. They must identify hazards, evaluate risks, implement control measures, and review the assessments regularly. While they may delegate the task to competent persons, the legal responsibility remains with the employer."
  },
  {
    id: 'hvac-l3-health-safety2',
    question: "What is the primary purpose of a Permit to Work system in high-risk HVAC maintenance activities?",
    options: ["To document overtime hours", "To formally authorize work and specify safety precautions for hazardous tasks", "To assign responsibility for tool maintenance", "To schedule work shifts efficiently"],
    correctAnswer: "To formally authorize work and specify safety precautions for hazardous tasks",
    explanation: "The primary purpose of a Permit to Work system is to formally authorize work and specify safety precautions for hazardous tasks. It's a documented procedure that authorizes certain people to carry out specific work within a specified timeframe, setting out the precautions required to complete the work safely, particularly for high-risk activities like working in confined spaces, hot work, or work on pressurized systems."
  },
  {
    id: 'hvac-l3-health-safety3',
    question: "Under the Control of Substances Hazardous to Health (COSHH) Regulations, what is the hierarchy of control measures for protecting workers from hazardous substances?",
    options: ["Elimination, substitution, engineering controls, administrative controls, PPE", "PPE, administrative controls, engineering controls, substitution, elimination", "Engineering controls, substitution, PPE, elimination, administrative controls", "Administrative controls, PPE, elimination, substitution, engineering controls"],
    correctAnswer: "Elimination, substitution, engineering controls, administrative controls, PPE",
    explanation: "The COSHH Regulations establish a hierarchy of control measures listed in order of effectiveness: 1) Elimination - completely remove the hazard, 2) Substitution - replace with less hazardous alternative, 3) Engineering controls - isolate people from the hazard, 4) Administrative controls - change work procedures to reduce exposure, and 5) Personal Protective Equipment (PPE) - last resort when other controls are insufficient."
  },
  {
    id: 'hvac-l3-health-safety4',
    question: "Which UK regulation specifically addresses the risks associated with working in confined spaces such as ductwork, plant rooms or tanks?",
    options: ["Work at Height Regulations 2005", "Manual Handling Operations Regulations 1992", "Confined Spaces Regulations 1997", "Construction (Design and Management) Regulations 2015"],
    correctAnswer: "Confined Spaces Regulations 1997",
    explanation: "The Confined Spaces Regulations 1997 specifically address the risks associated with working in confined spaces. These regulations require employers to avoid entry to confined spaces where possible, conduct suitable and sufficient risk assessments, implement a safe system of work, and provide adequate emergency arrangements when entry is necessary. They apply to spaces like ductwork, some plant rooms, and tanks."
  },
  {
    id: 'hvac-l3-health-safety5',
    question: "What is the legal requirement in the UK regarding respiratory protective equipment (RPE) face fit testing?",
    options: ["It's only required for disposable masks", "It's required for all tight-fitting respirators and should be repeated every 2 years or if facial features change", "It's only needed in environments with visible dust or fumes", "A single fit test is sufficient for a worker's entire career"],
    correctAnswer: "It's required for all tight-fitting respirators and should be repeated every 2 years or if facial features change",
    explanation: "In the UK, under COSHH and HSE guidance, face fit testing is legally required for all tight-fitting respirators to ensure they provide adequate protection. The test should be repeated at least every 2 years, and sooner if the wearer's facial features change significantly due to weight fluctuation, dental work, scarring, or other factors that could affect the seal between the respirator and face."
  },
  {
    id: 'hvac-l3-health-safety6',
    question: "What type of health surveillance is required for HVAC workers regularly exposed to refrigerant gases according to UK regulations?",
    options: ["No health surveillance is required for refrigerant exposure", "Annual blood tests only", "Regular lung function tests and skin examinations", "Only eye examinations are required"],
    correctAnswer: "Regular lung function tests and skin examinations",
    explanation: "HVAC workers regularly exposed to refrigerant gases should undergo health surveillance including regular lung function tests and skin examinations. This is required under COSHH Regulations when there is a valid technique for detecting adverse health effects. Refrigerants can cause respiratory issues and skin conditions through direct contact, so monitoring these potential health effects is necessary to detect problems early."
  },
  {
    id: 'hvac-l3-health-safety7',
    question: "Under the Construction (Design and Management) Regulations 2015, who is responsible for planning, managing, and monitoring the construction phase of a project that includes major HVAC installations?",
    options: ["Principal Designer", "Client", "Principal Contractor", "Subcontractor"],
    correctAnswer: "Principal Contractor",
    explanation: "Under the Construction (Design and Management) Regulations 2015 (CDM), the Principal Contractor is responsible for planning, managing, and monitoring the construction phase of a project, including major HVAC installations. They must coordinate all construction work and ensure that all contractors comply with their duties, implementing the construction phase plan and ensuring health and safety measures are in place throughout the project."
  },
  {
    id: 'hvac-l3-health-safety8',
    question: "When conducting hot work (such as brazing refrigeration pipework) near combustible materials, what is the minimum monitoring period required after work completion according to UK fire safety guidance?",
    options: ["15 minutes", "30 minutes", "60 minutes", "90 minutes"],
    correctAnswer: "60 minutes",
    explanation: "According to UK fire safety guidance (including the Hot Work Permit systems based on insurance and Fire Protection Association recommendations), the minimum monitoring period required after completion of hot work near combustible materials is 60 minutes (1 hour). This fire watch ensures that any smoldering materials or hidden ignition sources have time to become evident and can be addressed before they develop into a fire."
  },
  {
    id: 'hvac-l3-health-safety9',
    question: "What is the main purpose of a Method Statement in HVAC installation and maintenance?",
    options: ["To estimate the cost of materials", "To detail step-by-step how specific work will be carried out safely", "To record hours worked by each employee", "To document customer complaints"],
    correctAnswer: "To detail step-by-step how specific work will be carried out safely",
    explanation: "The main purpose of a Method Statement is to detail step-by-step how specific work will be carried out safely. It complements the risk assessment by providing a written document that outlines the hazards identified, the control measures to be implemented, the sequence of activities, specific equipment requirements, competencies needed, and emergency procedures. It serves as a practical guide to ensure work is carried out safely."
  },
  {
    id: 'hvac-l3-health-safety10',
    question: "Which health hazard is specifically associated with Legionella bacteria in HVAC systems?",
    options: ["Skin rashes", "Legionnaires' disease (a potentially fatal form of pneumonia)", "Joint pain", "Hearing loss"],
    correctAnswer: "Legionnaires' disease (a potentially fatal form of pneumonia)",
    explanation: "Legionella bacteria in HVAC systems are specifically associated with Legionnaires' disease, a potentially fatal form of pneumonia. These bacteria can colonize water systems (especially between 20-45°C) including cooling towers, evaporative condensers, hot and cold water systems, and humidifiers. When contaminated water aerosols are inhaled, they can cause serious respiratory infection, particularly in vulnerable individuals."
  },
  {
    id: 'hvac-l3-health-safety11',
    question: "Under the Control of Asbestos Regulations 2012, what is the requirement for HVAC engineers working in buildings constructed before 2000?",
    options: ["They must always wear full protective equipment regardless of the task", "They must have awareness training to recognize asbestos-containing materials and know the appropriate response", "They are prohibited from working in pre-2000 buildings without a licensed asbestos contractor present", "There are no special requirements as long as they don't disturb ceiling tiles"],
    correctAnswer: "They must have awareness training to recognize asbestos-containing materials and know the appropriate response",
    explanation: "Under the Control of Asbestos Regulations 2012, HVAC engineers working in buildings constructed before 2000 must have awareness training to recognize asbestos-containing materials and know the appropriate response if they encounter them. This is because many HVAC components and their surroundings in older buildings may contain asbestos. The training ensures they can identify potential asbestos materials and understand the procedures to follow to prevent exposure."
  },
  {
    id: 'hvac-l3-health-safety12',
    question: "Which of the following is a requirement of the Pressure Systems Safety Regulations 2000 (PSSR) for refrigeration systems operating above certain pressure thresholds?",
    options: ["Annual pressure testing only", "Having a written scheme of examination prepared by a competent person", "Replacement of all components every 5 years", "Registration with the local fire authority"],
    correctAnswer: "Having a written scheme of examination prepared by a competent person",
    explanation: "The Pressure Systems Safety Regulations 2000 (PSSR) require systems operating above certain pressure thresholds (typically 0.5 bar above atmospheric) to have a written scheme of examination prepared by a competent person. This scheme defines the examination procedures, frequency, and parts of the system to be examined. For refrigeration systems, this includes components such as receivers, condensers, and piping that operate at significant pressures."
  },
  {
    id: 'hvac-l3-health-safety13',
    question: "According to UK regulations, what is the maximum period that a scaffold tower used for HVAC installation work can be used without inspection?",
    options: ["24 hours", "7 days", "14 days", "30 days"],
    correctAnswer: "7 days",
    explanation: "According to the Work at Height Regulations 2005 and associated guidance, a scaffold tower used for HVAC installation work must be inspected every 7 days. Additionally, it must be inspected after substantial alteration, after any event likely to affect its stability (such as high winds), and before first use. These inspections must be carried out by a competent person and properly documented."
  },
  {
    id: 'hvac-l3-health-safety14',
    question: "What is the key requirement for working in an area classified as a Potentially Explosive Atmosphere under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations)?",
    options: ["Only battery-powered tools can be used", "Work must only be conducted during daylight hours", "Use of ATEX-rated equipment appropriate to the zone classification", "Only qualified electricians can perform work"],
    correctAnswer: "Use of ATEX-rated equipment appropriate to the zone classification",
    explanation: "Under DSEAR, when working in an area classified as a Potentially Explosive Atmosphere, the key requirement is the use of ATEX-rated equipment appropriate to the zone classification. ATEX equipment is specifically designed and certified to prevent ignition sources in explosive atmospheres. The zone classification (Zone 0, 1, 2 for gas or 20, 21, 22 for dust) determines the equipment category required to ensure safety."
  },
  {
    id: 'hvac-l3-health-safety15',
    question: "Under the Lifting Operations and Lifting Equipment Regulations (LOLER), how frequently must lifting equipment used for moving heavy HVAC components receive a thorough examination?",
    options: ["Every 3 months", "Every 6 months for equipment lifting people, every 12 months for other lifting equipment", "Every 2 years regardless of use", "Only after a major repair"],
    correctAnswer: "Every 6 months for equipment lifting people, every 12 months for other lifting equipment",
    explanation: "Under the Lifting Operations and Lifting Equipment Regulations (LOLER), lifting equipment must receive a thorough examination every 6 months if it is used to lift people, and every 12 months for all other lifting equipment. This applies to equipment used for moving heavy HVAC components, such as cranes, hoists, and lifting accessories. Additional examinations are required after significant changes or damage."
  },
  {
    id: 'hvac-l3-health-safety16',
    question: "In the context of workplace exposure limits for hazardous substances, what does the acronym STEL stand for?",
    options: ["Safe Time Exposure Level", "Short-Term Exposure Limit", "Standard Time Exposure Level", "System Technology Emission Level"],
    correctAnswer: "Short-Term Exposure Limit",
    explanation: "STEL stands for Short-Term Exposure Limit. It refers to the maximum concentration of a hazardous substance that workers can be exposed to for a short period (typically 15 minutes) without suffering adverse health effects. STELs are important for substances that can cause acute effects even after brief exposures and are published alongside 8-hour Workplace Exposure Limits (WELs) in EH40 by the HSE."
  },
  {
    id: 'hvac-l3-health-safety17',
    question: "Which of the following is a legal requirement under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR) for HVAC companies?",
    options: ["Report all workplace accidents regardless of severity", "Report specified dangerous occurrences even if they don't result in injury", "Report only accidents that result in fatality", "Report incidents only if a worker requests it"],
    correctAnswer: "Report specified dangerous occurrences even if they don't result in injury",
    explanation: "Under RIDDOR, HVAC companies must report specified dangerous occurrences even if they don't result in injury. These include incidents like the collapse of lifting equipment, accidental release of refrigerant gases above threshold quantities, or electrical incidents causing explosion or fire. This requirement helps authorities identify potential risks before they lead to serious accidents."
  },
  {
    id: 'hvac-l3-health-safety18',
    question: "What is the correct procedure for managing a refrigerant leak in a confined plant room according to safety best practices?",
    options: ["Immediately enter the room to locate the source of the leak", "Ventilate the area, use appropriate RPE, and check gas levels before entering", "Seal the room for 24 hours to allow the gas to dissipate", "Apply water to the area to neutralize the refrigerant"],
    correctAnswer: "Ventilate the area, use appropriate RPE, and check gas levels before entering",
    explanation: "When managing a refrigerant leak in a confined plant room, the correct procedure is to first ventilate the area (using mechanical ventilation if available), then use appropriate respiratory protective equipment (RPE), and check gas levels with a suitable detector before entering. This approach prevents asphyxiation risks, as refrigerants can displace oxygen in confined spaces, while also enabling safe remediation of the leak."
  },
  {
    id: 'hvac-l3-health-safety19',
    question: "Under the Control of Noise at Work Regulations 2005, what action is required when noise exposure reaches the upper exposure action value of 85 dB(A)?",
    options: ["No specific action is required", "Hearing protection must be made available but use is optional", "Hearing protection must be provided and worn by workers", "All work must cease immediately"],
    correctAnswer: "Hearing protection must be provided and worn by workers",
    explanation: "Under the Control of Noise at Work Regulations 2005, when noise exposure reaches the upper exposure action value of 85 dB(A), hearing protection must be provided and worn by workers. Additionally, employers must establish hearing protection zones (clearly marked and restricted areas), implement a program of control measures to reduce noise exposure, and provide health surveillance for affected workers."
  },
  {
    id: 'hvac-l3-health-safety20',
    question: "What type of risk assessment is specifically required before working with vibrating tools that may cause hand-arm vibration syndrome (HAVS)?",
    options: ["Environmental risk assessment", "Manual handling assessment", "Vibration risk assessment", "COSHH assessment"],
    correctAnswer: "Vibration risk assessment",
    explanation: "A vibration risk assessment is specifically required before working with vibrating tools that may cause hand-arm vibration syndrome (HAVS). This assessment is mandated by the Control of Vibration at Work Regulations 2005 and should evaluate the magnitude, duration, and frequency of exposure, compare this against exposure action and limit values, and identify necessary control measures to minimize the risk of HAVS."
  },
  {
    id: 'hvac-l3-health-safety21',
    question: "Which of the following best describes the Fire Safety Order's requirements for emergency routes and exits in plant rooms containing HVAC equipment?",
    options: ["A single exit is always sufficient regardless of room size", "Emergency routes and exits must lead directly outside the building in all cases", "Emergency routes and exits must be adequate for circumstances, unobstructed, and with appropriate signage", "Fire exits are only required in plant rooms larger than 100 square meters"],
    correctAnswer: "Emergency routes and exits must be adequate for circumstances, unobstructed, and with appropriate signage",
    explanation: "Under the Regulatory Reform (Fire Safety) Order 2005, emergency routes and exits in plant rooms must be adequate for the circumstances (considering factors like room size, occupancy, and hazards present), kept unobstructed at all times, and marked with appropriate signage. They should enable the quickest possible evacuation, with the number, distribution, and dimensions suitable for the use, equipment, and dimensions of the workplace."
  },
  {
    id: 'hvac-l3-health-safety22',
    question: "According to the Health and Safety (First-Aid) Regulations, what factors must be considered when determining first-aid provision in an HVAC business?",
    options: ["Only the total number of employees", "Only the types of injuries that have occurred in the past", "Workplace hazards, size and location of the organization, and distribution of workforce", "Only whether work is performed at height"],
    correctAnswer: "Workplace hazards, size and location of the organization, and distribution of workforce",
    explanation: "According to the Health and Safety (First-Aid) Regulations, determining first-aid provision requires consideration of workplace hazards (including specific risks in HVAC work like refrigerants, electrical work, and confined spaces), size and location of the organization (including proximity to emergency services), and distribution of the workforce (especially for field technicians working remotely). This assessment ensures appropriate first-aid arrangements are in place."
  },
  {
    id: 'hvac-l3-health-safety23',
    question: "What provision is required by the Personal Protective Equipment at Work Regulations regarding PPE for HVAC technicians?",
    options: ["Employees must purchase their own PPE", "Employers must provide suitable PPE free of charge where risks cannot be controlled by other means", "PPE is only required for apprentices", "Generic PPE is sufficient for all HVAC tasks"],
    correctAnswer: "Employers must provide suitable PPE free of charge where risks cannot be controlled by other means",
    explanation: "The Personal Protective Equipment at Work Regulations require employers to provide suitable PPE free of charge where risks cannot be adequately controlled by other means. For HVAC technicians, this may include items like safety glasses, gloves, respiratory protection, and fall protection depending on the specific hazards. Employers must also ensure the PPE is maintained, properly stored, and that employees are trained in its use."
  },
  {
    id: 'hvac-l3-health-safety24',
    question: "Under the Work at Height Regulations 2005, what is the key requirement before selecting a ladder for HVAC installation work?",
    options: ["Ladders must always be secured by a second person", "A specific risk assessment must demonstrate that using a ladder is justified", "Ladders can only be used for work lasting less than 10 minutes", "Only fiberglass ladders are permitted for HVAC work"],
    correctAnswer: "A specific risk assessment must demonstrate that using a ladder is justified",
    explanation: "Under the Work at Height Regulations 2005, before selecting a ladder for HVAC installation work, a specific risk assessment must demonstrate that using a ladder is justified. This assessment should consider the risk, duration of the task, and whether a safer alternative (like a mobile elevated work platform) would be more appropriate. Ladders should only be used for short-duration, low-risk tasks where safer alternatives are not reasonably practicable."
  },
  {
    id: 'hvac-l3-health-safety25',
    question: "What is the maximum fine that can be imposed for a serious breach of health and safety regulations by an HVAC company in the UK Crown Court?",
    options: ["£5,000", "£20,000", "£100,000", "Unlimited"],
    correctAnswer: "Unlimited",
    explanation: "Under current UK legislation, the maximum fine that can be imposed for a serious breach of health and safety regulations in the Crown Court is unlimited. This was introduced by the Health and Safety (Offences) Act 2008 and subsequently reinforced by the Legal Aid, Sentencing and Punishment of Offenders Act 2012. Sentences are determined using guidelines that consider culpability, likelihood of harm, and business turnover."
  },
  {
    id: 'hvac-l3-health-safety26',
    question: "What is the legal requirement under the Electricity at Work Regulations 1989 regarding the inspection and testing of portable electrical equipment used by HVAC technicians?",
    options: ["All equipment must be tested annually without exception", "There is no legal requirement for testing", "Equipment must be maintained to prevent danger, with the frequency of inspection determined by risk assessment", "Only tools over 3 years old require testing"],
    correctAnswer: "Equipment must be maintained to prevent danger, with the frequency of inspection determined by risk assessment",
    explanation: "Under the Electricity at Work Regulations 1989, electrical equipment must be maintained to prevent danger. While the regulations don't specify fixed testing frequencies, equipment used by HVAC technicians must be kept in a safe condition. The appropriate frequency of inspection and testing should be determined by risk assessment, considering factors like equipment type, usage environment, frequency of use, and likelihood of damage."
  },
  {
    id: 'hvac-l3-health-safety27',
    question: "According to the Control of Substances Hazardous to Health (COSHH) Regulations, what must be included in a COSHH assessment for cleaning chemicals used in HVAC maintenance?",
    options: ["Only the cost and quantity of chemicals used", "Only the storage requirements", "Hazards, exposure routes, control measures, emergency procedures, and health surveillance requirements if appropriate", "Only the brand names of approved products"],
    correctAnswer: "Hazards, exposure routes, control measures, emergency procedures, and health surveillance requirements if appropriate",
    explanation: "A COSHH assessment for cleaning chemicals must include hazards (identified from safety data sheets), exposure routes (inhalation, ingestion, skin contact), control measures to prevent or adequately control exposure, emergency procedures for spills or accidents, and health surveillance requirements if appropriate. This comprehensive approach ensures all risks are identified and properly managed when using potentially hazardous chemicals."
  },
  {
    id: 'hvac-l3-health-safety28',
    question: "What is the primary purpose of Local Exhaust Ventilation (LEV) in HVAC installation workshops?",
    options: ["To create a comfortable working temperature", "To provide general ventilation for the workspace", "To capture and remove airborne contaminants at or near their source", "To improve air circulation only"],
    correctAnswer: "To capture and remove airborne contaminants at or near their source",
    explanation: "The primary purpose of Local Exhaust Ventilation (LEV) in HVAC installation workshops is to capture and remove airborne contaminants at or near their source. This is particularly important for activities like brazing, soldering, or working with adhesives, which can produce hazardous fumes. LEV systems prevent these contaminants from entering the breathing zone of workers, reducing exposure to potentially harmful substances."
  },
  {
    id: 'hvac-l3-health-safety29',
    question: "Under UK regulations, what is the minimum frequency for examining and testing Local Exhaust Ventilation (LEV) systems used to control exposure to hazardous substances?",
    options: ["Every month", "Every 6 months", "Every 14 months", "Every 2 years"],
    correctAnswer: "Every 14 months",
    explanation: "Under COSHH Regulations (Regulation 9), Local Exhaust Ventilation (LEV) systems used to control exposure to hazardous substances must be thoroughly examined and tested at least every 14 months. For some processes like blasting in a blast cabinet, the required frequency is more frequent (every month). These examinations must be conducted by a competent person and properly documented with records kept for at least 5 years."
  },
  {
    id: 'hvac-l3-health-safety30',
    question: "According to the HSE guidance on working in confined spaces, which of the following is NOT considered a confined space that HVAC technicians might encounter?",
    options: ["A plant room with restricted space around equipment", "A fully ventilated room with a ceiling height of 3 meters", "A duct or plenum with restricted means of entry and exit", "An air handling unit being serviced internally"],
    correctAnswer: "A fully ventilated room with a ceiling height of 3 meters",
    explanation: "According to HSE guidance on confined spaces, a fully ventilated room with a ceiling height of 3 meters would NOT be considered a confined space. Confined spaces are defined as places that are substantially enclosed and where serious injury can occur from hazardous substances or conditions within the space or nearby. The other options meet the definition as they involve restricted spaces that could present hazards like restricted movement or poor air quality."
  },
  {
    id: 'hvac-l3-health-safety31',
    question: "What is the principal health risk associated with the use of solvents and adhesives in HVAC ductwork installation?",
    options: ["Hearing damage", "Respiratory irritation and damage from inhaling volatile organic compounds (VOCs)", "Musculoskeletal disorders", "Eye strain"],
    correctAnswer: "Respiratory irritation and damage from inhaling volatile organic compounds (VOCs)",
    explanation: "The principal health risk associated with solvents and adhesives in HVAC ductwork installation is respiratory irritation and damage from inhaling volatile organic compounds (VOCs). These chemicals can cause both acute effects (headaches, dizziness, eye and respiratory irritation) and chronic health problems with prolonged exposure (including occupational asthma and organ damage). Adequate ventilation and appropriate respiratory protection are essential control measures."
  },
  {
    id: 'hvac-l3-health-safety32',
    question: "Under the Provision and Use of Work Equipment Regulations (PUWER), what specific requirement applies to pressure test equipment used in HVAC systems?",
    options: ["It must be painted in high-visibility colors", "It must be calibrated annually by the manufacturer only", "It must be suitable for the intended use, maintained in a safe condition, and used only by people who have received adequate training", "It must be replaced every 2 years regardless of condition"],
    correctAnswer: "It must be suitable for the intended use, maintained in a safe condition, and used only by people who have received adequate training",
    explanation: "Under PUWER, pressure test equipment must be suitable for the intended use (appropriate pressure rating for the system being tested), maintained in a safe condition (including regular calibration and inspection), and used only by people who have received adequate training. This ensures the equipment performs accurately and safely, protecting workers from the significant hazards associated with pressure testing HVAC systems."
  },
  {
    id: 'hvac-l3-health-safety33',
    question: "What is the best practice for controlling legionella risk in cooling towers according to the HSE's Approved Code of Practice (ACOP) L8?",
    options: ["Annual inspection only", "Implementing a comprehensive water treatment program including regular monitoring, cleaning, and disinfection", "Maintaining water temperature below 5°C at all times", "Adding chlorine once per month regardless of conditions"],
    correctAnswer: "Implementing a comprehensive water treatment program including regular monitoring, cleaning, and disinfection",
    explanation: "According to HSE's ACOP L8, best practice for controlling legionella risk in cooling towers involves implementing a comprehensive water treatment program. This includes regular monitoring of water quality parameters (including microbiological testing), routine cleaning and disinfection, effective biocide treatment, managing the build-up of scale and corrosion, and maintaining good water quality. These measures must be documented in a site-specific written control scheme."
  },
  {
    id: 'hvac-l3-health-safety34',
    question: "What is the maximum period a temporary scaffold platform used for installing rooftop HVAC equipment can be used before requiring a statutory inspection?",
    options: ["24 hours", "7 days", "14 days", "30 days"],
    correctAnswer: "7 days",
    explanation: "Under the Work at Height Regulations 2005, a temporary scaffold platform used for installing rooftop HVAC equipment requires inspection every 7 days. Additionally, it requires inspection before first use, after any circumstance liable to affect its stability (such as high winds), and after substantial modification. These inspections must be conducted by a competent person with the results recorded and maintained."
  },
  {
    id: 'hvac-l3-health-safety35',
    question: "Under the Personal Protective Equipment at Work Regulations, what are the employer's duties regarding RPE (Respiratory Protective Equipment) for HVAC workers?",
    options: ["Provide RPE but employees are responsible for maintenance", "Provide suitable RPE, information, instruction, training and ensure it is properly maintained", "Only provide RPE if specifically requested by employees", "Provide the least expensive RPE that meets minimum standards"],
    correctAnswer: "Provide suitable RPE, information, instruction, training and ensure it is properly maintained",
    explanation: "Under the Personal Protective Equipment at Work Regulations, employers must provide suitable RPE, information, instruction, and training in its use, and ensure it is properly maintained. For HVAC workers who may encounter hazards like refrigerant gases, dust, and fumes, this means providing appropriate respirators matched to the hazard, ensuring they fit correctly through face-fit testing, training workers in their use, and maintaining a schedule for inspection and maintenance."
  },
  {
    id: 'hvac-l3-health-safety36',
    question: "What is the key requirement for safe isolation procedures when working on electrical components of HVAC systems?",
    options: ["Simply turning off the main power switch", "Isolation, locking off, and verification that the circuit is dead using proper test equipment", "Having a colleague watch the work area", "Working only during daylight hours"],
    correctAnswer: "Isolation, locking off, and verification that the circuit is dead using proper test equipment",
    explanation: "The key requirement for safe isolation of electrical components in HVAC systems is a proper procedure of isolation, locking off, and verification. This involves identifying the correct circuit, isolating it (switching off), securing the isolation (locking off and tagging to prevent reconnection), and verifying the circuit is dead using appropriate test equipment. This follows the 'safe isolation' procedure required by the Electricity at Work Regulations."
  },
  {
    id: 'hvac-l3-health-safety37',
    question: "What is the primary control measure for preventing falls when accessing HVAC equipment at height?",
    options: ["Relying on personal fall arrest systems", "Always working in pairs", "Hierarchy of controls: avoid work at height where possible, use collective protection before personal protection", "Using only ladders that are less than 5 years old"],
    correctAnswer: "Hierarchy of controls: avoid work at height where possible, use collective protection before personal protection",
    explanation: "The primary control measure for preventing falls when accessing HVAC equipment at height is following the hierarchy of controls established in the Work at Height Regulations 2005. This means first avoiding work at height where possible (e.g., designing systems for ground-level maintenance), then using collective protection measures (guardrails, scaffolds) before relying on personal fall arrest systems. This systematic approach provides the most effective protection."
  },
  {
    id: 'hvac-l3-health-safety38',
    question: "Which regulation specifically addresses safety requirements for pressure systems commonly found in HVAC installations?",
    options: ["Provision and Use of Work Equipment Regulations 1998", "Pressure Systems Safety Regulations 2000", "Lifting Operations and Lifting Equipment Regulations 1998", "Control of Vibration at Work Regulations 2005"],
    correctAnswer: "Pressure Systems Safety Regulations 2000",
    explanation: "The Pressure Systems Safety Regulations 2000 (PSSR) specifically addresses safety requirements for pressure systems commonly found in HVAC installations, including refrigeration systems, compressed air systems, and pressurized hot water systems. These regulations require proper design, installation, maintenance, and examination of pressure systems to prevent catastrophic failure and ensure safe operation throughout the system's lifecycle."
  },
  {
    id: 'hvac-l3-health-safety39',
    question: "What is the legal requirement for controlling exposure to welding fumes produced during HVAC installation or repair work?",
    options: ["No specific requirements exist", "General ventilation is always sufficient", "Effective engineering controls such as LEV must be provided as welding fumes are now classified as carcinogenic", "Simply provide basic dust masks"],
    correctAnswer: "Effective engineering controls such as LEV must be provided as welding fumes are now classified as carcinogenic",
    explanation: "Following the 2019 reclassification of welding fumes as carcinogenic by the International Agency for Research on Cancer (IARC) and subsequent HSE enforcement notices, there is a legal requirement to provide effective engineering controls such as Local Exhaust Ventilation (LEV) for all welding activities, regardless of duration. General ventilation alone is no longer deemed sufficient, and respiratory protective equipment may be needed as a supplementary measure."
  },
  {
    id: 'hvac-l3-health-safety40',
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, who is responsible for ensuring fire safety in plant rooms containing HVAC equipment?",
    options: ["The local fire authority", "The building's insurer", "The responsible person (usually the employer or person in control of the premises)", "The manufacturer of the HVAC equipment"],
    correctAnswer: "The responsible person (usually the employer or person in control of the premises)",
    explanation: "Under the Regulatory Reform (Fire Safety) Order 2005, the 'responsible person' (usually the employer or person in control of the premises) is responsible for ensuring fire safety in plant rooms containing HVAC equipment. Their duties include conducting fire risk assessments, implementing appropriate preventive and protective measures, maintaining fire detection/fighting equipment, providing emergency routes and exits, and ensuring staff are properly trained."
  },
  {
    id: 'hvac-l3-health-safety41',
    question: "What is the recommended approach for managing the risks of hand-arm vibration syndrome (HAVS) when HVAC technicians use power tools?",
    options: ["There are no specific requirements for HVAC work", "Simply restricting each worker to 2 hours of tool use per day", "Eliminating or reducing exposure by tool selection, maintenance, job rotation, and health surveillance", "Providing gloves as the primary control measure"],
    correctAnswer: "Eliminating or reducing exposure by tool selection, maintenance, job rotation, and health surveillance",
    explanation: "The recommended approach for managing HAVS risks is eliminating or reducing exposure through multiple controls: selecting lower-vibration tools, ensuring proper tool maintenance, limiting exposure times through job rotation or breaks, providing adequate training, and implementing health surveillance for at-risk workers. Gloves may help with comfort but are not considered effective at preventing HAVS and should not be the primary control measure."
  },
  {
    id: 'hvac-l3-health-safety42',
    question: "According to the HSE guidance, what is the recommended safe chlorine level for controlling Legionella bacteria in cooling towers?",
    options: ["0.1-0.2 mg/l", "0.5-1.0 mg/l", "3-5 mg/l", "10-15 mg/l"],
    correctAnswer: "0.5-1.0 mg/l",
    explanation: "According to HSE guidance (specifically ACOP L8 and HSG274 Part 1), the recommended safe free chlorine level for controlling Legionella bacteria in cooling towers is typically 0.5-1.0 mg/l (ppm). This concentration is effective at controlling bacterial growth while minimizing corrosion and other adverse effects. However, the exact levels may need adjustment based on water conditions, system design, and the specific biocide program being used."
  },
  {
    id: 'hvac-l3-health-safety43',
    question: "What is the primary purpose of a DSEAR (Dangerous Substances and Explosive Atmospheres Regulations) risk assessment in relation to HVAC work?",
    options: ["To estimate the cost of potential damage to equipment", "To identify and assess fire and explosion risks from dangerous substances", "To determine the life expectancy of equipment", "To assess noise levels from equipment"],
    correctAnswer: "To identify and assess fire and explosion risks from dangerous substances",
    explanation: "The primary purpose of a DSEAR risk assessment is to identify and assess fire and explosion risks from dangerous substances. For HVAC work, this includes assessing risks from flammable refrigerants (especially hydrocarbons like R290), solvents, adhesives, and other potentially flammable materials. The assessment informs classification of hazardous areas, implementation of appropriate control measures, and emergency procedures to manage these risks."
  },
  {
    id: 'hvac-l3-health-safety44',
    question: "What action is required if asbestos-containing materials are discovered during maintenance of an older HVAC system?",
    options: ["Continue work carefully to avoid disturbing the material", "Remove the material immediately using appropriate tools", "Stop work immediately, secure the area, and report the finding to the appropriate person", "Cover the material with duct tape and continue working"],
    correctAnswer: "Stop work immediately, secure the area, and report the finding to the appropriate person",
    explanation: "If asbestos-containing materials are discovered during maintenance, work must stop immediately, the area should be secured to prevent access, and the finding reported to the appropriate person (supervisor, client, building manager). Disturbing asbestos without proper controls is illegal and dangerous. Only licensed contractors can work with most asbestos materials, following strict procedures under the Control of Asbestos Regulations 2012."
  },
  {
    id: 'hvac-l3-health-safety45',
    question: "Under the Construction (Design and Management) Regulations 2015, what document must be provided to contractors before they begin installation of major HVAC systems in a commercial building?",
    options: ["Only verbal instructions are required", "Just a simple work order", "Pre-construction information including details of existing site risks", "Only the building's energy performance certificate"],
    correctAnswer: "Pre-construction information including details of existing site risks",
    explanation: "Under the CDM Regulations 2015, pre-construction information including details of existing site risks must be provided to contractors before they begin installation of major HVAC systems. This information should detail any existing hazards (such as asbestos, structural issues, services), site-specific risks, and other relevant information to enable proper planning, risk assessment, and safe execution of the installation work."
  },
  {
    id: 'hvac-l3-health-safety46',
    question: "What is the requirement for maintaining gas safety documentation for commercial HVAC systems under the Gas Safety (Installation and Use) Regulations?",
    options: ["No documentation is required for commercial systems", "Records must be kept for a minimum of 2 years", "Records must be kept for the lifetime of the appliance", "Records only need to be kept for residential installations"],
    correctAnswer: "Records must be kept for the lifetime of the appliance",
    explanation: "Under the Gas Safety (Installation and Use) Regulations, records of commercial gas appliance maintenance and safety checks must be kept for the lifetime of the appliance. These records should include details of all safety checks, servicing, and any defects identified and remedied. This requirement ensures a complete history of the appliance's safety status is maintained throughout its operational life."
  },
  {
    id: 'hvac-l3-health-safety47',
    question: "What type of health surveillance is recommended for HVAC workers regularly exposed to isocyanates in spray foam insulation?",
    options: ["No health surveillance is required", "Annual blood tests only", "Regular lung function tests and assessment for respiratory sensitization", "Only skin examinations"],
    correctAnswer: "Regular lung function tests and assessment for respiratory sensitization",
    explanation: "For HVAC workers regularly exposed to isocyanates in spray foam insulation, regular lung function tests and assessment for respiratory sensitization are recommended as health surveillance. Isocyanates are potent respiratory sensitizers that can cause occupational asthma. Health surveillance should be conducted before exposure begins (baseline), periodically during exposure, and include lung function testing, questionnaires for respiratory symptoms, and medical examination where indicated."
  },
  {
    id: 'hvac-l3-health-safety48',
    question: "According to the Workplace (Health, Safety and Welfare) Regulations 1992, what temperature range is recommended for indoor workplaces where HVAC systems are being serviced?",
    options: ["No specific temperature is recommended", "Minimum 13°C for physical work, 16°C for office work", "Maximum 30°C in all circumstances", "Exactly 21°C at all times"],
    correctAnswer: "Minimum 13°C for physical work, 16°C for office work",
    explanation: "The Workplace (Health, Safety and Welfare) Regulations 1992 recommend a minimum temperature of 13°C for physical work activities and 16°C for sedentary office work. While there is no legally specified maximum temperature, employers must provide a 'reasonable' temperature and take steps to achieve this when servicing HVAC systems that may affect building temperatures during maintenance."
  },
  {
    id: 'hvac-l3-health-safety49',
    question: "What is the purpose of the F-Gas Regulations in relation to health and safety when working with refrigeration systems?",
    options: ["They only concern environmental protection with no health and safety implications", "They prevent the sale of refrigeration systems in the UK", "They include requirements for leak prevention and proper handling to reduce exposure risks", "They only apply to systems installed before 2010"],
    correctAnswer: "They include requirements for leak prevention and proper handling to reduce exposure risks",
    explanation: "While the F-Gas Regulations primarily aim to reduce environmental impact, they include requirements for leak prevention and proper handling that directly impact health and safety. By mandating regular leak checks, proper recovery procedures, and certified handling, they reduce the risk of worker exposure to potentially harmful refrigerants that could cause asphyxiation, frostbite, or other injuries when improperly managed."
  },
  {
    id: 'hvac-l3-health-safety50',
    question: "What is the key requirement for a safe system of work when entering a confined space such as a large air handling unit or duct for maintenance?",
    options: ["Simply ensuring the space is well-lit", "Having a written procedure including risk assessment, proper training, appropriate equipment, and emergency arrangements", "Scheduling the work during normal business hours only", "Relying solely on personal protective equipment"],
    correctAnswer: "Having a written procedure including risk assessment, proper training, appropriate equipment, and emergency arrangements",
    explanation: "The key requirement for a safe system of work when entering a confined space is having a written procedure that includes a specific risk assessment, proper training for all involved personnel, appropriate equipment (including atmospheric monitoring, ventilation, and communication devices), and comprehensive emergency arrangements. This systematic approach is required by the Confined Spaces Regulations 1997 to address the significant risks associated with these environments."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-health-safety', 'items', q.id), {
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
