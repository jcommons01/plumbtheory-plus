// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3HealthSafetyAdvanced.ts

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

// ✅ Level 3 Health & Safety Advanced Questions
const questions = [
  {
    id: 'level3healthsafety1',
    question: "Under the Electricity at Work Regulations 1989, what is meant by the term 'duty holder'?",
    options: ["Only qualified electricians", "Only the company director", "The person designated as responsible for electrical safety", "Any person who may have control over electrical systems"],
    correctAnswer: "Any person who may have control over electrical systems",
    explanation: "A 'duty holder' under the Electricity at Work Regulations 1989 is any person who may have control over all or part of an electrical system. This includes employers, employees, self-employed persons, and those in control of premises."
  },
  {
    id: 'level3healthsafety2',
    question: "What does the Management of Health and Safety at Work Regulations 1999 require specifically regarding electrical risks?",
    options: ["Annual PAT testing only", "Only that electrical work is performed by qualified persons", "That suitable and sufficient risk assessments are carried out", "Only that electrical equipment is CE marked"],
    correctAnswer: "That suitable and sufficient risk assessments are carried out",
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments for all workplace hazards, including electrical risks, to identify necessary precautions and controls."
  },
  {
    id: 'level3healthsafety3',
    question: "Under Section 2 of the Health and Safety at Work Act 1974, what is the duty of an employer regarding electrical safety?",
    options: ["To maintain equipment only if financially viable", "To ensure safety 'so far as is reasonably practicable'", "To provide safety only for qualified staff", "To ensure zero risk at all times"],
    correctAnswer: "To ensure safety 'so far as is reasonably practicable'",
    explanation: "Section 2 of the Health and Safety at Work Act 1974 places a duty on employers to ensure the health, safety and welfare of employees 'so far as is reasonably practicable', which includes all aspects of electrical safety."
  },
  {
    id: 'level3healthsafety4',
    question: "Which of the following best describes the hierarchy of risk control measures as recommended by the HSE?",
    options: ["Eliminate, Substitute, Engineering controls, Administrative controls, PPE", "PPE, Administrative controls, Engineering controls, Substitute, Eliminate", "Substitute, Eliminate, PPE, Engineering controls, Administrative controls", "Engineering controls, Administrative controls, Eliminate, Substitute, PPE"],
    correctAnswer: "Eliminate, Substitute, Engineering controls, Administrative controls, PPE",
    explanation: "The HSE hierarchy of risk control measures, in order of effectiveness, is: Eliminate the hazard, Substitute with less hazardous alternative, Apply engineering controls, Implement administrative controls, and as a last resort, Use Personal Protective Equipment (PPE)."
  },
  {
    id: 'level3healthsafety5',
    question: "What are the specific requirements under Regulation 4(3) of the Electricity at Work Regulations 1989?",
    options: ["All work must be carried out by qualified electricians", "All electrical systems must be constructed to prevent danger", "All work must be notified to the HSE", "All circuits must have RCD protection"],
    correctAnswer: "All electrical systems must be constructed to prevent danger",
    explanation: "Regulation 4(3) of the Electricity at Work Regulations 1989 requires that all electrical systems shall be constructed as to prevent danger, so far as is reasonably practicable."
  },
  {
    id: 'level3healthsafety6',
    question: "Under the Construction (Design and Management) Regulations 2015, who is responsible for planning, managing, and monitoring electrical safety during the construction phase?",
    options: ["The client only", "The principal designer only", "The principal contractor", "The local authority"],
    correctAnswer: "The principal contractor",
    explanation: "Under CDM 2015, the principal contractor is responsible for planning, managing, and monitoring the construction phase, which includes ensuring electrical safety during construction activities."
  },
  {
    id: 'level3healthsafety7',
    question: "What specific guidance document does the HSE publish regarding electrical safety in construction?",
    options: ["HSG85", "HSG47", "HSG107", "HSG150"],
    correctAnswer: "HSG85",
    explanation: "HSG85 'Electricity at Work: Safe Working Practices' is the HSE guidance document specifically focused on electrical safety. HSG150 covers health and safety in construction more broadly."
  },
  {
    id: 'level3healthsafety8',
    question: "Which regulation specifically covers work near overhead power lines?",
    options: ["The Work at Height Regulations 2005", "GS6 from the HSE (guidance note)", "The Electricity Safety, Quality and Continuity Regulations 2002", "The Management of Health and Safety at Work Regulations 1999"],
    correctAnswer: "GS6 from the HSE (guidance note)",
    explanation: "GS6 'Avoiding Danger from Overhead Power Lines' is the specific HSE guidance that covers work near overhead power lines, though this work is also generally covered by the Electricity at Work Regulations 1989."
  },
  {
    id: 'level3healthsafety9',
    question: "What is the safe distance for general construction work from overhead lines operating at 132kV according to HSE guidance?",
    options: ["3 metres", "6 metres", "10 metres", "15 metres"],
    correctAnswer: "10 metres",
    explanation: "HSE guidance recommends a minimum clearance distance of 10 metres for general work near overhead lines operating at 132kV. This distance increases for higher voltages."
  },
  {
    id: 'level3healthsafety10',
    question: "Under the Provision and Use of Work Equipment Regulations 1998 (PUWER), what specific requirement applies to electrical work equipment?",
    options: ["It must be tested annually", "It must be suitable for its intended use and properly maintained", "It must only be used by persons over 18", "It must be double insulated"],
    correctAnswer: "It must be suitable for its intended use and properly maintained",
    explanation: "PUWER requires that all work equipment, including electrical equipment, must be suitable for its intended use, maintained in a safe condition, and in certain cases, inspected to ensure it remains safe."
  },
  {
    id: 'level3healthsafety11',
    question: "What is the maximum safe operating voltage for hand-held tools on construction sites according to BS 7375?",
    options: ["55V", "110V", "230V", "400V"],
    correctAnswer: "110V",
    explanation: "BS 7375 recommends a maximum of 110V (center-tapped to earth to give 55V-0-55V) for hand-held tools on construction sites to reduce the risk of serious electric shock."
  },
  {
    id: 'level3healthsafety12',
    question: "What standard defines the safety requirements for electrical installations in potentially explosive atmospheres?",
    options: ["BS 7671", "BS EN 60079", "BS 5266", "BS EN 61537"],
    correctAnswer: "BS EN 60079",
    explanation: "BS EN 60079 series of standards define the requirements for electrical equipment and installations in explosive atmospheres (ATEX areas)."
  },
  {
    id: 'level3healthsafety13',
    question: "Under BS EN 60079, which zone classification represents an area where an explosive gas atmosphere is not likely to occur in normal operation but, if it does occur, will persist for a short period only?",
    options: ["Zone 0", "Zone 1", "Zone 2", "Zone 20"],
    correctAnswer: "Zone 2",
    explanation: "Zone 2 is defined as an area in which an explosive gas atmosphere is not likely to occur in normal operation but, if it does occur, will persist for a short period only."
  },
  {
    id: 'level3healthsafety14',
    question: "What is the primary purpose of a Permit to Work system for electrical work?",
    options: ["To allocate work to qualified persons only", "To record hours worked", "To ensure safe isolation procedures are followed", "To comply with payment regulations"],
    correctAnswer: "To ensure safe isolation procedures are followed",
    explanation: "A Permit to Work system provides a formal documented process to control hazardous activities, including electrical work, ensuring proper risk assessment, safe isolation, and communication procedures are followed."
  },
  {
    id: 'level3healthsafety15',
    question: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), which of the following electrical incidents must be reported?",
    options: ["Any electric shock however minor", "Electric shock requiring first aid only", "Any electrical fire, however small", "Electrical short circuit or overload attended by the fire service"],
    correctAnswer: "Electrical short circuit or overload attended by the fire service",
    explanation: "RIDDOR requires the reporting of electrical short circuits or overloads that result in fire or explosion which causes stoppage of plant for 24 hours or more, or when attended by the fire service."
  },
  {
    id: 'level3healthsafety16',
    question: "What is the legal requirement for competence assessment of those working on electrical systems under the Electricity at Work Regulations 1989?",
    options: ["All workers must hold City & Guilds qualifications", "All workers must have NVQ Level 3 in electrical installation", "There is no specific qualification requirement, but persons must possess adequate technical knowledge or experience", "All workers must be registered with the NICEIC"],
    correctAnswer: "There is no specific qualification requirement, but persons must possess adequate technical knowledge or experience",
    explanation: "Regulation 16 of the Electricity at Work Regulations 1989 requires that persons must possess adequate technical knowledge or experience, or be under appropriate supervision, relative to the nature of the work."
  },
  {
    id: 'level3healthsafety17',
    question: "What is specifically required under HSG85 regarding the application of test probes or voltage indicators on live electrical equipment?",
    options: ["They must be used with rubber gloves only", "They must be fused", "They must be adequately insulated and have suitable finger guards", "They must only be used by qualified electricians"],
    correctAnswer: "They must be adequately insulated and have suitable finger guards",
    explanation: "HSG85 specifies that test probes and voltage indicators used on live equipment should be adequately insulated, incorporate fused leads, have fingerguards, and comply with the HSE Guidance Note GS38."
  },
  {
    id: 'level3healthsafety18',
    question: "Under the Personal Protective Equipment at Work Regulations 2022, what is the employer's primary responsibility regarding electrical safety PPE?",
    options: ["To provide PPE free of charge", "To ensure PPE is used as a primary control measure", "To provide training on PPE use once per year", "To record all PPE in a register"],
    correctAnswer: "To provide PPE free of charge",
    explanation: "The Personal Protective Equipment at Work Regulations 2022 require employers to provide suitable PPE free of charge wherever there are risks to health and safety that cannot be adequately controlled by other means."
  },
  {
    id: 'level3healthsafety19',
    question: "Which specific standard defines requirements for protective clothing for electrical workers against the thermal hazards of an electric arc?",
    options: ["BS 7671", "BS EN 50110", "BS EN 61482", "BS EN 60079"],
    correctAnswer: "BS EN 61482",
    explanation: "BS EN 61482 specifies requirements and test methods for protective clothing for electrical workers against the thermal hazards of an electric arc."
  },
  {
    id: 'level3healthsafety20',
    question: "Under the Work at Height Regulations 2005, what specific requirement applies to electrical work at height?",
    options: ["All ladders must be made of non-conductive material", "Work must be carried out from ground level where practicable", "Only cherry pickers can be used", "Work must be supervised by two qualified persons"],
    correctAnswer: "Work must be carried out from ground level where practicable",
    explanation: "The Work at Height Regulations 2005 require that work at height (including electrical work) should be avoided where possible and carried out from ground level where practicable. If not practicable, suitable work equipment must be used to prevent falls."
  },
  {
    id: 'level3healthsafety21',
    question: "What does HTM 06-02 specifically cover in relation to electrical safety?",
    options: ["Electrical safety in schools", "Electrical safety in hospitals and healthcare premises", "Electrical safety in railway applications", "Electrical safety in potentially explosive atmospheres"],
    correctAnswer: "Electrical safety in hospitals and healthcare premises",
    explanation: "Health Technical Memorandum (HTM) 06-02 provides specific guidance on electrical safety in hospitals and healthcare premises, including requirements for medical locations."
  },
  {
    id: 'level3healthsafety22',
    question: "What are the specific statutory inspection requirements for a lightning protection system according to BS EN 62305?",
    options: ["Monthly testing", "Visual inspections annually, complete testing every 2-4 years", "Every 5 years only", "Only after a lightning strike"],
    correctAnswer: "Visual inspections annually, complete testing every 2-4 years",
    explanation: "BS EN 62305 recommends visual inspections annually and complete testing at intervals of 2-4 years depending on the protection level and environmental factors."
  },
  {
    id: 'level3healthsafety23',
    question: "What specific risk assessment guidance does the HSE provide for work on or near dead electrical equipment?",
    options: ["LOLER assessment", "Safe systems of work assessment", "COSHH assessment", "Working dead risk assessment"],
    correctAnswer: "Safe systems of work assessment",
    explanation: "The HSE requires a safe system of work assessment for working on or near dead electrical equipment, which should include proper isolation procedures, proving dead, and security against re-energisation."
  },
  {
    id: 'level3healthsafety24',
    question: "Under the Control of Electromagnetic Fields at Work Regulations 2016, what are employers required to do regarding electrical systems that generate electromagnetic fields?",
    options: ["Ban all equipment that generates electromagnetic fields", "Allow only specified workers to operate such equipment", "Assess employee exposure and take action if above action levels", "Only operate such equipment during specific hours"],
    correctAnswer: "Assess employee exposure and take action if above action levels",
    explanation: "The Control of Electromagnetic Fields at Work Regulations 2016 require employers to assess employee exposure to electromagnetic fields, take action if exposure exceeds specified action levels, and implement protective measures."
  },
  {
    id: 'level3healthsafety25',
    question: "What specific standard applies to the safety of power transformers according to BS EN standards?",
    options: ["BS EN 60076", "BS EN 60204", "BS EN 60309", "BS EN 60947"],
    correctAnswer: "BS EN 60076",
    explanation: "BS EN 60076 series covers the safety requirements and tests for power transformers, including aspects relevant to electrical safety."
  },
  {
    id: 'level3healthsafety26',
    question: "According to HSG85, what is the recommended procedure for confirming a circuit is dead when working on high voltage systems?",
    options: ["Using a multimeter", "Using a voltage indicator without a proving unit", "Using an approved HV voltage indicator that has been proven on a known live source", "Any method is acceptable if carried out by a competent person"],
    correctAnswer: "Using an approved HV voltage indicator that has been proven on a known live source",
    explanation: "HSG85 recommends using an approved high voltage indicator that has been tested on a known live source immediately before and after use to confirm circuits are dead before working on HV systems."
  },
  {
    id: 'level3healthsafety27',
    question: "Under the Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR), what specific requirement applies to electrical equipment in zoned areas?",
    options: ["All equipment must be double insulated", "Equipment must be suitable for use in the specified ATEX zone", "Only battery-powered equipment can be used", "All equipment must be inspected weekly"],
    correctAnswer: "Equipment must be suitable for use in the specified ATEX zone",
    explanation: "DSEAR requires that electrical equipment used in zoned areas must be appropriately certified for use in the relevant ATEX zone to prevent ignition risks."
  },
  {
    id: 'level3healthsafety28',
    question: "What action is required after a person has suffered an electric shock according to HSE guidance?",
    options: ["Return to work if they feel well", "Medical examination even if they appear well", "First aid treatment only if visible injuries are present", "Record the incident only if the person is hospitalized"],
    correctAnswer: "Medical examination even if they appear well",
    explanation: "HSE guidance recommends that anyone who has received an electric shock should be seen by a doctor, even if they appear well, as there may be delayed effects or internal injuries not immediately apparent."
  },
  {
    id: 'level3healthsafety29',
    question: "What is the specific purpose of Category 3 safety tools according to BS EN 60900?",
    options: ["For use in all electrical work", "For use in live working", "For use on systems up to 500V AC", "For general construction work"],
    correctAnswer: "For use in live working",
    explanation: "BS EN 60900 specifies requirements for hand tools for live working up to 1000V AC and 1500V DC. Category 3 specifically refers to tools suitable for live working."
  },
  {
    id: 'level3healthsafety30',
    question: "What does 'arc flash hazard analysis' specifically assess in electrical safety?",
    options: ["The brightness of electric arcs", "The potential thermal energy of an electric arc and required PPE", "The electromagnetic interference from arcs", "The noise level from electric arcs"],
    correctAnswer: "The potential thermal energy of an electric arc and required PPE",
    explanation: "Arc flash hazard analysis assesses the potential incident energy of an electric arc fault to determine safe working distances and appropriate PPE requirements to protect workers."
  },
  {
    id: 'level3healthsafety31',
    question: "What is the specific legal status of HSE Approved Codes of Practice (ACOPs) in the UK?",
    options: ["They are merely suggestions", "They have the same legal status as regulations", "They have special legal status - a court will accept compliance with them as proof of compliance with the law", "They only apply to companies with more than 50 employees"],
    correctAnswer: "They have special legal status - a court will accept compliance with them as proof of compliance with the law",
    explanation: "ACOPs have special legal status. If prosecuted for a breach of health and safety law, and it is proven that relevant ACOP guidance was not followed, a court will accept this as proof that the law was broken, unless it can be shown that legal compliance was achieved in another way."
  },
  {
    id: 'level3healthsafety32',
    question: "What is specifically required for electrical safety under the Confined Spaces Regulations 1997?",
    options: ["All electrical equipment must be 12V", "Electrical equipment must be suitable for the confined space environment, considering factors such as atmosphere and presence of water", "Electrical work is prohibited in confined spaces", "Only wireless equipment can be used"],
    correctAnswer: "Electrical equipment must be suitable for the confined space environment, considering factors such as atmosphere and presence of water",
    explanation: "The Confined Spaces Regulations 1997 require all equipment, including electrical equipment, to be suitable for the environment in which it is used, considering factors such as potentially explosive atmospheres, presence of water, or conductive dusts."
  },
  {
    id: 'level3healthsafety33',
    question: "Under the Health and Safety (First-Aid) Regulations 1981, what specific provision should be considered for workplaces with electrical risks?",
    options: ["A burns kit is recommended", "There are no special requirements for electrical risks", "All first aiders must be qualified electricians", "Defibrillators are mandatory"],
    correctAnswer: "A burns kit is recommended",
    explanation: "For workplaces with electrical risks, the HSE recommends additional first aid equipment appropriate to the risks, which typically includes burns kits suitable for treating electrical burns."
  },
  {
    id: 'level3healthsafety34',
    question: "What specific measure is recommended by the HSE to control risks when digging near buried electrical cables?",
    options: ["Always use mechanical excavators", "Use cable avoidance tools (CAT) before and during excavation", "Only dig to a maximum depth of 150mm", "Always cut power to the entire area"],
    correctAnswer: "Use cable avoidance tools (CAT) before and during excavation",
    explanation: "HSE guidance HSG47 recommends using cable avoidance tools (CAT) and following safe digging practices (including hand digging trial holes) to detect and avoid buried electrical cables."
  },
  {
    id: 'level3healthsafety35',
    question: "In terms of electrical safety, what is specifically required for temporary installations on construction sites according to BS 7375?",
    options: ["All equipment must be IP68 rated", "Inspection at least every three months, or more frequently in harsh conditions", "Only permanent installations are permitted", "All work must be done by the main contractor"],
    correctAnswer: "Inspection at least every three months, or more frequently in harsh conditions",
    explanation: "BS 7375 requires that temporary electrical installations on construction sites should be inspected at intervals not exceeding three months, or more frequently in harsh environments or where there is a high risk of damage."
  },
  {
    id: 'level3healthsafety36',
    question: "What is specifically required under the CDM Regulations 2015 regarding electrical supply to a construction site?",
    options: ["All sites must use a temporary builder's supply", "The supply must be planned and designed before construction begins", "Only diesel generators can be used", "Only the principal contractor can manage the electrical supply"],
    correctAnswer: "The supply must be planned and designed before construction begins",
    explanation: "Under CDM 2015, electrical supplies to construction sites must be planned and designed before construction begins, considering factors such as capacity, distribution, protection, and emergency procedures."
  },
  {
    id: 'level3healthsafety37',
    question: "What specific guidance is provided in ENA-TS 43-8 regarding work on underground cables?",
    options: ["It recommends techniques for laying cables", "It specifies earthing requirements", "It specifies safe working practices for joining cables", "It provides guidance on the safe cutting of cables"],
    correctAnswer: "It provides guidance on the safe cutting of cables",
    explanation: "Energy Networks Association Technical Specification ENA-TS 43-8 provides specific guidance on safe procedures for cutting or working on underground cables, including identification and spiking procedures."
  },
  {
    id: 'level3healthsafety38',
    question: "Under the Provision and Use of Work Equipment Regulations 1998, what specific checks are required before using electrical equipment on site?",
    options: ["PAT testing only", "Visual inspection and functional checks", "Only voltage testing", "Only earth loop impedance testing"],
    correctAnswer: "Visual inspection and functional checks",
    explanation: "PUWER requires that equipment is checked before use, which for electrical equipment typically involves visual inspection for damage and functional checks to ensure operation is as expected."
  },
  {
    id: 'level3healthsafety39',
    question: "What specific arc flash PPE standard is referenced in the Energy Networks Association's guidance document AMBPS 01?",
    options: ["BS EN 61482", "BS EN 10819", "BS EN 20471", "BS 13688"],
    correctAnswer: "BS EN 61482",
    explanation: "The Energy Networks Association's guidance AMBPS 01 references BS EN 61482 as the standard for protective clothing against the thermal hazards of an electric arc."
  },
  {
    id: 'level3healthsafety40',
    question: "What is the correct safety control measure for working on photovoltaic installations according to IET Code of Practice?",
    options: ["Working at night only", "Covering panels with opaque material to prevent DC generation", "Turning off the AC inverter is sufficient", "Using only insulated tools"],
    correctAnswer: "Covering panels with opaque material to prevent DC generation",
    explanation: "The IET Code of Practice for Grid Connected Solar Photovoltaic Systems recommends covering panels with opaque material during installation or maintenance to prevent DC generation, as PV panels generate electricity when exposed to light even when isolated from the grid."
  },
  {
    id: 'level3healthsafety41',
    question: "What is the specific requirement for electrical equipment operating in potentially explosive dust atmospheres (Zone 22) according to ATEX regulations?",
    options: ["Equipment must be Category 3D or better", "Only non-electrical equipment can be used", "Equipment must be fully enclosed", "Only battery-operated equipment can be used"],
    correctAnswer: "Equipment must be Category 3D or better",
    explanation: "For Zone 22 areas (where explosive dust atmospheres are not likely to occur in normal operation, and if they do, will persist for a short period only), equipment must be at least Category 3D according to ATEX regulations."
  },
  {
    id: 'level3healthsafety42',
    question: "What specific clearance does the HSE's guidance document GS6 recommend for work near overhead lines operating at 33kV?",
    options: ["3 metres", "6 metres", "9 metres", "12 metres"],
    correctAnswer: "9 metres",
    explanation: "HSE guidance document GS6 'Avoiding danger from overhead power lines' recommends a minimum clearance of 9 metres for work near overhead lines operating at 33kV."
  },
  {
    id: 'level3healthsafety43',
    question: "Under the Construction (Design and Management) Regulations 2015, who is specifically responsible for ensuring information about existing electrical services is provided to contractors?",
    options: ["The client only", "The principal designer", "The principal contractor", "The local utility company"],
    correctAnswer: "The principal designer",
    explanation: "Under CDM 2015, the principal designer is responsible for ensuring that pre-construction information, including information about existing services such as electrical installations, is identified, obtained, and provided to those who need it (including the principal contractor)."
  },
  {
    id: 'level3healthsafety44',
    question: "What is the specific legal requirement for reporting electrical incidents under RIDDOR where a person suffers an electric shock?",
    options: ["All electric shocks must be reported", "Only shocks resulting in unconsciousness must be reported", "Only shocks from equipment over 400V must be reported", "Shocks must be reported if they result in death, specified injury, or incapacity for more than 7 days"],
    correctAnswer: "Shocks must be reported if they result in death, specified injury, or incapacity for more than 7 days",
    explanation: "Under RIDDOR, electric shocks must be reported if they result in death, a specified injury (e.g., burns, unconsciousness), or incapacity for normal work for more than 7 days. Not all electric shocks need to be reported."
  },
  {
    id: 'level3healthsafety45',
    question: "What specific respiratory protection may be required when working with electrical equipment containing Sulphur Hexafluoride (SF6) according to HSE guidance?",
    options: ["Standard dust mask", "Self-contained breathing apparatus", "No respiratory protection is required", "Protection is only required in case of a leak"],
    correctAnswer: "Self-contained breathing apparatus",
    explanation: "HSE guidance recommends self-contained breathing apparatus when there is a risk of significant SF6 release, such as during maintenance of switchgear containing SF6, due to its asphyxiant properties and the potential for toxic decomposition products."
  },
  {
    id: 'level3healthsafety46',
    question: "What specific document should be completed when modifying an existing electrical installation according to BS 7671?",
    options: ["Only the Electrical Installation Certificate", "Only a Minor Works Certificate", "Either an Electrical Installation Certificate or a Minor Works Certificate depending on the extent of the work", "No documentation is required for modifications"],
    correctAnswer: "Either an Electrical Installation Certificate or a Minor Works Certificate depending on the extent of the work",
    explanation: "BS 7671 requires that either an Electrical Installation Certificate (for new circuits or major alterations) or a Minor Works Certificate (for minor works on a single circuit) be completed when modifying an existing installation."
  },
  {
    id: 'level3healthsafety47',
    question: "What specific safety function does an 'earth monitoring device' perform on reduced low voltage systems?",
    options: ["It measures earth resistance only", "It prevents operation if the earth connection is lost", "It regulates the voltage supply", "It measures current leakage only"],
    correctAnswer: "It prevents operation if the earth connection is lost",
    explanation: "Earth monitoring devices, commonly used on reduced low voltage systems (e.g., 110V center-tapped to earth), continuously monitor the integrity of the earth connection and prevent operation if the earth connection is compromised."
  },
  {
    id: 'level3healthsafety48',
    question: "What specific safety role does a Senior Authorised Person (SAP) fulfill in high voltage electrical systems according to UK safe systems of work?",
    options: ["They are only responsible for issuing permits to work", "They oversee all aspects of the safety management system for HV networks", "They only conduct risk assessments", "They only test electrical equipment"],
    correctAnswer: "They oversee all aspects of the safety management system for HV networks",
    explanation: "A Senior Authorised Person oversees all aspects of the safety management system for high voltage networks, including issuing safety documents (permits, sanctions, etc.), coordinating switching operations, and ensuring overall compliance with safety procedures."
  },
  {
    id: 'level3healthsafety49',
    question: "What specific fire risk is associated with lithium-ion battery installations according to IET guidance?",
    options: ["Thermal runaway", "Only standard electrical fire risks", "Only risks during charging", "Fire risks only apply to damaged batteries"],
    correctAnswer: "Thermal runaway",
    explanation: "IET guidance highlights thermal runaway as a specific fire risk with lithium-ion battery installations, where internal failure can lead to rapidly increasing temperature, gas release, and potentially fire or explosion."
  },
  {
    id: 'level3healthsafety50',
    question: "Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), what specific requirement applies to working platforms used for electrical work at height?",
    options: ["They must be inspected every 3 years", "They must be thoroughly examined at intervals not exceeding 6 months", "They can only be used by qualified electricians", "They must be made of non-conductive material"],
    correctAnswer: "They must be thoroughly examined at intervals not exceeding 6 months",
    explanation: "LOLER requires that lifting equipment used for lifting persons (including mobile elevated work platforms used for electrical work) must be thoroughly examined at intervals not exceeding 6 months."
  }
];

// ✅ Upload function
// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'electrical-l3-health-safety', 'items', q.id), {
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
  