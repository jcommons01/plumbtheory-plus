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

// ✅ Bricklaying Level 3 Advanced Health & Safety Questions
const questions = [
  {
    id: 'bricklaying-l3-topic1-1',
    question: "What is the primary purpose of a site-specific Construction Phase Health and Safety Plan?",
    options: ["To calculate project costs accurately", "To establish a timeline for construction activities", "To identify and mitigate specific health and safety risks for the project", "To assign specific workers to different construction tasks"],
    correctAnswer: "To identify and mitigate specific health and safety risks for the project",
    explanation: "A site-specific Construction Phase Health and Safety Plan is required under the Construction (Design and Management) Regulations 2015 (CDM 2015) to identify and mitigate specific health and safety risks for the project. The plan documents the arrangements for managing significant risks on site, including hazard identification, control measures, emergency procedures, and welfare facilities. It must be tailored to the specific conditions and activities of the project rather than using generic templates. The principal contractor develops this plan before construction begins, and it must be regularly reviewed and updated as the project progresses to address changing risks and conditions."
  },
  {
    id: 'bricklaying-l3-topic1-2',
    question: "Which regulation specifically requires a competent person to inspect scaffolding before first use, after substantial alteration, and at regular intervals?",
    options: ["Manual Handling Operations Regulations 1992", "Work at Height Regulations 2005", "Control of Substances Hazardous to Health Regulations 2002", "Personal Protective Equipment at Work Regulations 1992"],
    correctAnswer: "Work at Height Regulations 2005",
    explanation: "The Work at Height Regulations 2005 specifically requires that scaffolding be inspected by a competent person before first use, after substantial alteration, after any event likely to affect its stability, and at regular intervals not exceeding 7 days. These regulations place legal duties on employers, the self-employed, and anyone who controls the work of others to ensure all work at height is properly planned, supervised, and carried out by competent people. The regulations require that equipment used for work at height is properly inspected and maintained to prevent falls and resulting injuries. Records of these inspections must be kept and made available to relevant authorities if requested."
  },
  {
    id: 'bricklaying-l3-topic1-3',
    question: "Under the Control of Substances Hazardous to Health (COSHH) Regulations, what is the correct hierarchical approach to controlling exposure to silica dust when cutting masonry?",
    options: ["Provide dust masks to all workers as the primary control measure", "Substitute with non-silica materials, apply engineering controls, use administrative controls, and finally PPE if necessary", "Use water suppression techniques only", "Issue disciplinary action to workers who don't follow safety procedures"],
    correctAnswer: "Substitute with non-silica materials, apply engineering controls, use administrative controls, and finally PPE if necessary",
    explanation: "Under the COSHH Regulations, the correct hierarchical approach to controlling exposure to silica dust follows a specific order of priority. First, consider eliminating or substituting the hazard with non-silica materials where possible. If substitution isn't feasible, implement engineering controls such as local exhaust ventilation or water suppression systems to minimize dust generation. Then apply administrative controls like job rotation or limiting exposure time. Only after these measures should Personal Protective Equipment (PPE) be relied upon as the final layer of protection. This hierarchy ensures that collective protection measures and control systems are prioritized over individual protection, providing more reliable safeguards against respiratory diseases like silicosis."
  },
  {
    id: 'bricklaying-l3-topic1-4',
    question: "What is a 'Permit to Work' system and when should it be implemented on a construction site?",
    options: ["A document allowing foreign workers to work legally; implemented for all non-UK workers", "A system allowing workers to take authorized breaks; implemented during hot weather", "A formal documented procedure for controlling high-risk activities; implemented for tasks like hot work or confined space entry", "A payment authorization system; implemented for overtime work"],
    correctAnswer: "A formal documented procedure for controlling high-risk activities; implemented for tasks like hot work or confined space entry",
    explanation: "A 'Permit to Work' system is a formal documented procedure for controlling high-risk activities on construction sites. It's essentially a document that specifies the work to be done, the hazards involved, precautions required, and who is authorized to perform and sign off the work. This system should be implemented for particularly hazardous activities such as hot work (welding, cutting), work in confined spaces, work on live electrical systems, excavation work, and working at height in complex situations. The permit ensures that risks have been properly assessed, appropriate controls are in place, all involved parties are aware of the hazards, and that formal authorization has been given before work commences."
  },
  {
    id: 'bricklaying-l3-topic1-5',
    question: "When conducting a quantitative risk assessment for silica exposure during brick cutting, what exposure limit value must not be exceeded according to current UK regulations?",
    options: ["0.1 mg/m³ averaged over an 8-hour period", "0.4 mg/m³ averaged over an 8-hour period", "1.0 mg/m³ averaged over an 8-hour period", "5.0 mg/m³ averaged over an 8-hour period"],
    correctAnswer: "0.1 mg/m³ averaged over an 8-hour period",
    explanation: "According to current UK regulations, specifically the Control of Substances Hazardous to Health Regulations (COSHH), the Workplace Exposure Limit (WEL) for respirable crystalline silica is 0.1 mg/m³, averaged over an 8-hour period. This limit represents the maximum concentration of silica dust that a worker can be exposed to during a working day. Employers must ensure that exposure is reduced to as low as reasonably practicable below this limit. Compliance requires proper risk assessment, implementation of control measures, and often air monitoring to quantify exposure levels. Exceeding this limit can lead to serious respiratory diseases including silicosis, chronic obstructive pulmonary disease, and lung cancer."
  },
  {
    id: 'bricklaying-l3-topic1-6',
    question: "Which of the following best describes the concept of 'ALARP' (As Low As Reasonably Practicable) in risk management?",
    options: ["Eliminating all possible risks regardless of cost", "Reducing risks only if they can be completely eliminated", "Balancing risk reduction against time, trouble, difficulty and cost", "Accepting all risks as part of construction work"],
    correctAnswer: "Balancing risk reduction against time, trouble, difficulty and cost",
    explanation: "The concept of 'ALARP' (As Low As Reasonably Practicable) in risk management involves balancing risk reduction against time, trouble, difficulty, and cost. It recognizes that it's often impossible to eliminate all risks, but requires employers to implement safety measures up to the point where the cost (in time, money, or effort) becomes grossly disproportionate to the risk reduction achieved. This principle is fundamental to UK health and safety legislation and requires continuous assessment and improvement of safety measures. ALARP does not mean simply implementing the cheapest option, but rather conducting a proper assessment to determine what controls are reasonably practicable given the specific risks and circumstances."
  },
  {
    id: 'bricklaying-l3-topic1-7',
    question: "What key information must be included in a COSHH assessment for mortar containing cement?",
    options: ["Only the brand name and color of the mortar", "Only the emergency procedures in case of an accident", "Hazard identification, exposure assessment, control measures, and health surveillance requirements", "Only the cost and quantity of mortar to be used"],
    correctAnswer: "Hazard identification, exposure assessment, control measures, and health surveillance requirements",
    explanation: "A COSHH assessment for mortar containing cement must include hazard identification, exposure assessment, control measures, and health surveillance requirements. The assessment should identify that cement is hazardous due to its caustic nature, potential for causing burns, dermatitis, and respiratory issues from dust. It should evaluate how workers might be exposed during mixing, application, and cleaning activities. Control measures must be detailed, including engineering controls, work methods, and appropriate PPE. The assessment should also specify any health surveillance requirements for workers regularly exposed to cement, such as skin checks for dermatitis. Additional elements include emergency procedures, information about safe storage, and waste disposal arrangements."
  },
  {
    id: 'bricklaying-l3-topic1-8',
    question: "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR), which of the following incidents must be reported to the Health and Safety Executive?",
    options: ["A bricklayer spraining their ankle and taking one day off work", "A minor cut requiring basic first aid treatment", "The collapse of a scaffold during construction activities, even if no one is injured", "A non-work-related illness causing a worker to take sick leave"],
    correctAnswer: "The collapse of a scaffold during construction activities, even if no one is injured",
    explanation: "Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), the collapse of a scaffold during construction activities must be reported to the Health and Safety Executive (HSE), even if no one is injured. This is classified as a 'dangerous occurrence' - an incident with potential to cause serious injury. Other reportable events include specified injuries (fractures, amputations, etc.), fatalities, occupational diseases, and injuries resulting in over seven days of incapacity for work. The reporting requirement exists because such incidents indicate serious safety failings that could lead to future accidents. Reports must be made within specific timeframes, with dangerous occurrences requiring notification within 10 days via the HSE website."
  },
  {
    id: 'bricklaying-l3-topic1-9',
    question: "When is a detailed method statement legally required for bricklaying activities?",
    options: ["For all bricklaying activities regardless of risk level", "Only when working on listed buildings", "When the risk assessment identifies significant risks that need to be controlled through a specific sequence of work", "Only when required by the client's specification"],
    correctAnswer: "When the risk assessment identifies significant risks that need to be controlled through a specific sequence of work",
    explanation: "A detailed method statement is legally required for bricklaying activities when the risk assessment identifies significant risks that need to be controlled through a specific sequence of work. While method statements aren't explicitly mandated by a specific regulation, they fulfill the legal duty under the Health and Safety at Work Act and Management of Health and Safety at Work Regulations to provide safe systems of work. They're especially important for high-risk bricklaying activities such as constructing free-standing walls, working at height, or operations involving unusual structural loads. The method statement complements the risk assessment by providing step-by-step instructions on how to perform the task safely, including specific control measures, equipment requirements, and emergency procedures."
  },
  {
    id: 'bricklaying-l3-topic1-10',
    question: "What is the legal requirement for face fit testing of respiratory protective equipment (RPE) under COSHH regulations?",
    options: ["Face fit testing is optional and at the discretion of the employer", "Face fit testing must be conducted once when RPE is first issued to a worker", "Face fit testing must be conducted annually for all RPE users", "Face fit testing must be conducted initially and repeated if there are changes to the user's face shape or RPE type"],
    correctAnswer: "Face fit testing must be conducted initially and repeated if there are changes to the user's face shape or RPE type",
    explanation: "Under COSHH regulations, face fit testing for tight-fitting respiratory protective equipment (RPE) must be conducted initially when first issued and repeated if there are changes to the user's face shape (weight change, dental work, scarring) or if a different RPE type or model is introduced. This testing ensures that the mask forms an adequate seal on the individual's face, preventing exposure to hazardous substances like silica dust. The HSE guidance document HSG53 specifies that qualitative or quantitative testing methods can be used depending on the type of RPE. Facial hair in the seal area, even stubble, compromises protection and requires alternatives like powered respirators with loose-fitting headtops for affected workers."
  },
  {
    id: 'bricklaying-l3-topic1-11',
    question: "What is the purpose of a site-specific health and safety 'toolbox talk' for bricklaying operations?",
    options: ["To distribute new tools to the bricklaying team", "To discuss technical bricklaying techniques only", "To sell new safety equipment to workers", "To communicate specific hazards, control measures, and safe working methods to workers"],
    correctAnswer: "To communicate specific hazards, control measures, and safe working methods to workers",
    explanation: "The purpose of a site-specific health and safety 'toolbox talk' for bricklaying operations is to communicate specific hazards, control measures, and safe working methods to workers. These short, focused discussions typically last 10-15 minutes and address particular safety topics relevant to current or upcoming bricklaying tasks. They serve as a practical way to reinforce formal training, introduce site-specific procedures, and remind workers about key safety issues like silica dust control, manual handling techniques, or scaffold safety. For legal compliance, records should be kept of each talk, including the topic covered, date, attendees, and key points discussed. Regular toolbox talks help fulfill the employer's duty to provide information, instruction, and training under health and safety legislation."
  },
  {
    id: 'bricklaying-l3-topic1-12',
    question: "In the context of the Construction (Design and Management) Regulations 2015, what is the role of the Principal Designer regarding health and safety?",
    options: ["To supervise workers directly on site", "To plan, manage, monitor and coordinate health and safety during the pre-construction phase", "To provide first aid to injured workers", "To organize social events to promote team building"],
    correctAnswer: "To plan, manage, monitor and coordinate health and safety during the pre-construction phase",
    explanation: "Under the Construction (Design and Management) Regulations 2015 (CDM 2015), the Principal Designer's role regarding health and safety is to plan, manage, monitor and coordinate health and safety during the pre-construction phase. This includes identifying, eliminating or controlling foreseeable risks, ensuring designers carry out their duties, and preparing and providing relevant health and safety information to other duty holders. The Principal Designer must have the skills, knowledge, experience, and organizational capability to fulfill this role. They must also liaise with the Principal Contractor to help in the planning, management, and monitoring of the construction phase and coordinate health and safety matters during the pre-construction phase to ensure the project is carried out without risks to health or safety."
  },
  {
    id: 'bricklaying-l3-topic1-13',
    question: "What is the primary purpose of conducting health surveillance for bricklayers exposed to respirable crystalline silica?",
    options: ["To comply with employment contract requirements", "To detect early signs of work-related ill health and take action to prevent further harm", "To provide data for research purposes only", "To determine which workers qualify for overtime pay"],
    correctAnswer: "To detect early signs of work-related ill health and take action to prevent further harm",
    explanation: "The primary purpose of conducting health surveillance for bricklayers exposed to respirable crystalline silica is to detect early signs of work-related ill health and take action to prevent further harm. Health surveillance is a system of ongoing health checks required under COSHH regulations for workers exposed to hazards like silica dust that may cause identifiable diseases. For bricklayers, this typically includes baseline and periodic lung function tests and chest X-rays to detect early signs of silicosis or other respiratory conditions before they become severe. The program also helps evaluate the effectiveness of control measures, identify improper work practices, provide data on the accuracy of risk assessments, and reinforce training on control measures and safe working practices."
  },
  {
    id: 'bricklaying-l3-topic1-14',
    question: "Under the Management of Health and Safety at Work Regulations, what is the minimum frequency at which risk assessments should be reviewed for ongoing bricklaying operations?",
    options: ["Never, once completed they remain valid indefinitely", "Only when an accident occurs", "Annually, regardless of changes in working conditions", "Regularly and whenever there are significant changes to working practices or conditions"],
    correctAnswer: "Regularly and whenever there are significant changes to working practices or conditions",
    explanation: "Under the Management of Health and Safety at Work Regulations, risk assessments for ongoing bricklaying operations should be reviewed regularly and whenever there are significant changes to working practices or conditions. While no specific review period is mandated by law, the HSE recommends that risk assessments be reviewed at least annually as good practice. However, more frequent reviews are necessary when there are changes that could introduce new hazards, such as new equipment, materials, or processes; alterations to site conditions; following accidents or near misses; or when new information about hazards becomes available. The review ensures that control measures remain effective and appropriate, addressing any changes in risk levels or working conditions."
  },
  {
    id: 'bricklaying-l3-topic1-15',
    question: "What is the legal requirement for emergency procedures when working with hazardous substances like cement and mortar additives?",
    options: ["There is no legal requirement for emergency procedures for these common materials", "Emergency procedures are only required for uncommon additives", "Documented emergency procedures must be in place, communicated to workers, and tested regularly", "Emergency procedures are only the responsibility of the site first aider"],
    correctAnswer: "Documented emergency procedures must be in place, communicated to workers, and tested regularly",
    explanation: "The legal requirement under the Control of Substances Hazardous to Health (COSHH) Regulations is that documented emergency procedures must be in place, communicated to workers, and tested regularly when working with hazardous substances like cement and mortar additives. These procedures must outline the actions to take in case of accidental exposure, such as cement burns to skin or eyes, inhalation of dust, or ingestion of chemicals. The procedures should include first aid measures, evacuation protocols if necessary, reporting requirements, and access to further medical treatment. All workers must be trained in these procedures, and the necessary equipment (emergency eyewash stations, first aid kits) must be readily available. Regular testing ensures the procedures work effectively and identifies any improvements needed."
  },
  {
    id: 'bricklaying-l3-topic1-16',
    question: "What is meant by the term 'residual risk' in the context of a construction risk assessment?",
    options: ["The risk that existed before any control measures were put in place", "The risk that remains after all identified control measures have been implemented", "The risk of financial loss on a construction project", "The risk associated with using residual materials"],
    correctAnswer: "The risk that remains after all identified control measures have been implemented",
    explanation: "In the context of a construction risk assessment, 'residual risk' refers to the risk that remains after all identified control measures have been implemented. Even with robust controls in place, it's often impossible to eliminate all risks entirely from construction activities like bricklaying. Residual risks must be clearly documented in the risk assessment and communicated to workers so they understand what hazards still exist despite controls. The level of residual risk determines whether the activity can proceed safely or whether additional controls are required. For instance, after implementing dust suppression measures for brick cutting, there may still be some minimal exposure risk requiring respiratory protection as a final control measure."
  },
  {
    id: 'bricklaying-l3-topic1-17',
    question: "Under UK regulations, when is it mandatory to appoint a Site Safety Coordinator for a bricklaying project?",
    options: ["On all construction projects regardless of size", "Only on projects lasting more than 30 days with more than 20 workers simultaneously, or exceeding 500 person-days", "Only when specifically requested by the Health and Safety Executive", "When a project involves more than 5 bricklayers working together"],
    correctAnswer: "Only on projects lasting more than 30 days with more than 20 workers simultaneously, or exceeding 500 person-days",
    explanation: "Under UK regulations, specifically the Construction (Design and Management) Regulations 2015 (CDM 2015), it's mandatory to appoint a Principal Contractor (who has overall responsibility for site safety) on projects with more than one contractor. However, the role specifically called 'Site Safety Coordinator' is not defined in legislation. The requirement for notification to the HSE (previously associated with the appointment of a CDM Coordinator under older regulations) applies to projects lasting more than 30 days with more than 20 workers simultaneously, or exceeding 500 person-days. On these notifiable projects, the roles and responsibilities for safety coordination are fulfilled by the Principal Designer and Principal Contractor, rather than a dedicated Site Safety Coordinator."
  },
  {
    id: 'bricklaying-l3-topic1-18',
    question: "What is the primary purpose of a 'Safety Method Statement' for complex bricklaying operations?",
    options: ["To provide a quotation for clients", "To detail the quality standards required", "To provide a step-by-step process for completing work safely", "To assign blame if an accident occurs"],
    correctAnswer: "To provide a step-by-step process for completing work safely",
    explanation: "The primary purpose of a Safety Method Statement for complex bricklaying operations is to provide a step-by-step process for completing work safely. It serves as a detailed work instruction document that outlines the hazards involved in a task and specifies the precise sequence of activities required to complete the work while minimizing risks. The statement typically includes information on required competencies, equipment specifications, control measures, emergency procedures, and specific precautions for each step. Unlike a risk assessment that identifies hazards and controls, the method statement focuses on how the work will be carried out safely. It's particularly important for high-risk activities such as constructing complex structural elements, working at height, or when special lifting operations are required."
  },
  {
    id: 'bricklaying-l3-topic1-19',
    question: "When implementing a health monitoring program for bricklayers, what is the minimum retention period for health records under the COSHH Regulations?",
    options: ["3 years after the last entry", "5 years after the last entry", "10 years after the last entry", "40 years after the last entry"],
    correctAnswer: "40 years after the last entry",
    explanation: "Under the COSHH Regulations, when implementing a health monitoring program for bricklayers, the minimum retention period for health records is 40 years after the last entry. This extended retention period is necessary because occupational diseases like silicosis may take decades to develop following exposure to hazards like respirable crystalline silica in construction dust. The records must contain personal details of the employee, the date surveillance was carried out, who carried it out, and the outcome or conclusions. These records are confidential medical information but must be made available to employees if requested. If a company ceases trading, the records should be offered to the HSE. This long retention period ensures accountability and enables proper diagnosis and compensation if work-related diseases develop in later life."
  },
  {
    id: 'bricklaying-l3-topic1-20',
    question: "Under the Work at Height Regulations, what is the key requirement when planning bricklaying activities that involve the use of edge protection?",
    options: ["Edge protection must be at least 2 meters high in all cases", "Edge protection must only be installed for work above 3 meters", "Edge protection must include guardrails, toe boards and any intermediate barriers, with gaps not exceeding 470mm", "Edge protection is only required on one side of a scaffold"],
    correctAnswer: "Edge protection must include guardrails, toe boards and any intermediate barriers, with gaps not exceeding 470mm",
    explanation: "Under the Work at Height Regulations, when planning bricklaying activities that involve edge protection, the key requirement is that the edge protection must include guardrails, toe boards and any intermediate barriers, with gaps not exceeding 470mm. Specifically, the top guardrail must be at least 950mm above the working platform, toe boards must be sufficient to prevent people and materials from falling (typically at least 150mm high), and any gap between the top rail and toe board must be protected by intermediate barriers if it exceeds 470mm. These specifications ensure that the edge protection system prevents both personnel and materials from falling. The regulations stipulate that edge protection is the preferred collective measure for preventing falls and should be properly designed, installed, and maintained by competent persons."
  },
  {
    id: 'bricklaying-l3-topic1-21',
    question: "What is the recommended wind speed at which work on an exposed brickwork structure at height should cease?",
    options: ["13 mph (20 km/h)", "17 mph (27 km/h)", "23 mph (37 km/h)", "30 mph (48 km/h)"],
    correctAnswer: "23 mph (37 km/h)",
    explanation: "The recommended wind speed at which work on an exposed brickwork structure at height should cease is generally 23 mph (37 km/h), which equates to a strong breeze or Force 5-6 on the Beaufort scale. At this wind speed, there are significant safety risks including instability of materials, difficulty controlling mortar boards, reduced worker stability, and increased forces on temporary structures. This guideline is referenced in industry standards and scaffold safety guidance, though specific values may vary depending on the particular site conditions, the nature of the work, and risk assessment findings. The Construction (Design and Management) Regulations require that weather conditions be considered when planning work at height. Wind speed monitoring equipment should be available on site for accurate assessment rather than relying on subjective judgment."
  },
  {
    id: 'bricklaying-l3-topic1-22',
    question: "When conducting a noise assessment for mechanical brick cutting, what level of daily personal noise exposure (LEP,d) would require the implementation of a hearing protection zone?",
    options: ["Above 80 dB(A)", "Above 85 dB(A)", "Above 90 dB(A)", "Above 95 dB(A)"],
    correctAnswer: "Above 85 dB(A)",
    explanation: "Under the Control of Noise at Work Regulations 2005, when conducting a noise assessment for mechanical brick cutting, a hearing protection zone must be implemented when the daily personal noise exposure (LEP,d) exceeds 85 dB(A). This is the upper exposure action value specified in the regulations. Hearing protection zones must be demarcated with appropriate signage, and all workers entering these zones must wear adequate hearing protection regardless of their individual exposure duration. Within these zones, employers must ensure that hearing protection is worn correctly, maintained properly, and is suitable for the specific noise conditions. Typically, brick cutting with power tools exceeds this threshold, often reaching 95-100 dB(A), making hearing protection zones a common requirement for these operations."
  },
  {
    id: 'bricklaying-l3-topic1-23',
    question: "Under the Construction (Design and Management) Regulations 2015, which duty holder is primarily responsible for coordinating health and safety matters during the construction phase of a project?",
    options: ["The Principal Designer", "The Principal Contractor", "The Client", "The Health and Safety Executive"],
    correctAnswer: "The Principal Contractor",
    explanation: "Under the Construction (Design and Management) Regulations 2015 (CDM 2015), the Principal Contractor is primarily responsible for coordinating health and safety matters during the construction phase of a project. Their duties include planning, managing, monitoring, and coordinating health and safety while construction work is taking place. They must liaise with the Principal Designer regarding ongoing design matters, ensure that suitable welfare facilities are provided, draw up site rules as necessary, and ensure suitable site inductions are provided. They must also prevent unauthorized access to the site, ensure workers are consulted and engaged on health and safety matters, and ensure all workers are properly informed, trained, and supervised. This role is mandatory on all projects with more than one contractor, regardless of whether the project is notifiable to the HSE."
  },
  {
    id: 'bricklaying-l3-topic1-24',
    question: "What is the primary purpose of a 'hot works permit' system on a construction site where bricklaying operations are taking place?",
    options: ["To ensure workers take regular breaks during hot weather", "To control high-risk activities involving sources of ignition near flammable materials", "To restrict bricklaying work to cooler times of day", "To monitor the temperature of mortar mixtures"],
    correctAnswer: "To control high-risk activities involving sources of ignition near flammable materials",
    explanation: "The primary purpose of a 'hot works permit' system on a construction site is to control high-risk activities involving sources of ignition near flammable materials. Hot works include activities like cutting with abrasive wheels, welding, soldering, and using open flames, which could pose fire risks when conducted near combustible materials, especially during building renovation or where bricklaying operations interface with other trades. The permit system ensures that hazards are identified, appropriate precautions are taken, fire detection systems are managed appropriately, fire watches are established, and work is formally authorized by a responsible person. After completion, the area must be monitored for a specified period (typically 1-2 hours) to ensure no smoldering materials could cause a delayed fire outbreak."
  },
  {
    id: 'bricklaying-l3-topic1-25',
    question: "What is the legal requirement regarding the provision of information for hazardous materials like cement and mortar additives on a construction site?",
    options: ["Information is only required for unusual or rare additives", "Safety data sheets must be available on request from the manufacturer only", "Safety data sheets must be available on site for all hazardous substances, and information from them communicated to workers", "Information is only required if an accident has previously occurred with the material"],
    correctAnswer: "Safety data sheets must be available on site for all hazardous substances, and information from them communicated to workers",
    explanation: "The legal requirement under the Control of Substances Hazardous to Health (COSHH) Regulations regarding hazardous materials like cement and mortar additives is that safety data sheets must be available on site for all hazardous substances, and the relevant information from them must be communicated to workers. Suppliers are legally required to provide up-to-date safety data sheets, and employers must ensure these are accessible to workers who use or may be exposed to the substances. The key information from these sheets should be extracted and incorporated into COSHH assessments and tool box talks in a format that is easily understood by workers. This includes hazard information, control measures, emergency procedures, and first aid requirements. Safety data sheets alone are not sufficient; the information must be effectively communicated to those at risk."
  },
  {
    id: 'bricklaying-l3-topic1-26',
    question: "What is the primary purpose of an 'F10 notification' under the Construction (Design and Management) Regulations 2015?",
    options: ["To register a new construction company with Companies House", "To notify the Health and Safety Executive of a notifiable construction project", "To apply for planning permission for bricklaying works", "To request approval for specialized bricklaying techniques"],
    correctAnswer: "To notify the Health and Safety Executive of a notifiable construction project",
    explanation: "The primary purpose of an 'F10 notification' under the Construction (Design and Management) Regulations 2015 is to notify the Health and Safety Executive (HSE) of a notifiable construction project. A project becomes notifiable when it is scheduled to last longer than 30 working days and have more than 20 workers simultaneously on site at any point, or exceed 500 person-days of construction work. The client (or the Principal Designer or Principal Contractor on their behalf) must submit the F10 form to the HSE before construction work begins. The notification must include specific project details, information about duty holders, and the nature of the work. A copy must be displayed on site where workers can read it, and it must be updated if information changes substantially."
  },
  {
    id: 'bricklaying-l3-topic1-27',
    question: "What are the legal requirements for providing welfare facilities on a construction site where bricklaying operations are taking place?",
    options: ["Facilities are only required on sites with more than 10 workers", "Only drinking water and hand washing facilities are legally required", "Suitable toilets, washing facilities, drinking water, rest facilities, and changing areas must be provided", "Welfare facilities are only required if the site operates for more than one week"],
    correctAnswer: "Suitable toilets, washing facilities, drinking water, rest facilities, and changing areas must be provided",
    explanation: "Under the Construction (Design and Management) Regulations 2015 and the Workplace (Health, Safety and Welfare) Regulations 1992, the legal requirements for providing welfare facilities on construction sites include suitable toilets, washing facilities with hot and cold running water, drinking water, rest facilities, and changing areas. These must be available from the start of the construction phase before workers begin on site. For bricklayers specifically, adequate washing facilities are particularly important due to exposure to cement and other skin irritants. The Principal Contractor is responsible for ensuring these facilities are provided, though on smaller sites the facilities may be shared by arrangement. Regular cleaning and maintenance of these facilities is also a legal requirement."
  },
  {
    id: 'bricklaying-l3-topic1-28',
    question: "What is the maximum weight a competent male bricklayer should lift at waist height according to HSE guidance on manual handling?",
    options: ["10 kg", "20 kg", "25 kg", "35 kg"],
    correctAnswer: "25 kg",
    explanation: "According to HSE guidance on manual handling (specifically the Manual Handling Operations Regulations 1992), the guideline maximum weight a competent male bricklayer should lift at waist height is 25 kg. This figure assumes ideal handling conditions including a stable load, adequate grip, and good posture. The guidance provides different values based on height of lifting (from floor level: 10 kg, waist height: 25 kg, shoulder height: 20 kg, above shoulder: 10 kg). For female workers, these values are reduced by approximately one-third. These are not absolute limits but guidelines to trigger risk assessment. For bricklayers, whose work involves repetitive lifting throughout the day, the actual safe working load should be further reduced through risk assessment considering frequency, duration, environmental factors, and individual capability."
  },
  {
    id: 'bricklaying-l3-topic1-29',
    question: "What is the purpose of a 'near miss' reporting system on a construction site?",
    options: ["To record incidents where workers nearly completed a task on time", "To identify and address potential hazards before they cause injury or damage", "To report workers who miss their shift", "To track projects that nearly went over budget"],
    correctAnswer: "To identify and address potential hazards before they cause injury or damage",
    explanation: "The purpose of a 'near miss' reporting system on a construction site is to identify and address potential hazards before they cause injury or damage. A near miss is an unplanned event that did not result in injury, illness, or damage but had the potential to do so. These incidents serve as warnings or precursors to potentially serious accidents. By systematically collecting and analyzing near miss data, patterns and trends can be identified, allowing preventive measures to be implemented. The HSE's guidance emphasizes that for every major injury, there are approximately 90 near misses, making them valuable indicators of system weaknesses. An effective near miss reporting system should be non-punitive, simple to use, provide feedback to reporters, and lead to visible improvements in workplace safety."
  },
  {
    id: 'bricklaying-l3-topic1-30',
    question: "Under the Control of Vibration at Work Regulations, what is the Exposure Action Value (EAV) for hand-arm vibration that triggers specific control requirements?",
    options: ["2.0 m/s² A(8)", "2.5 m/s² A(8)", "5.0 m/s² A(8)", "10.0 m/s² A(8)"],
    correctAnswer: "2.5 m/s² A(8)",
    explanation: "Under the Control of Vibration at Work Regulations 2005, the Exposure Action Value (EAV) for hand-arm vibration that triggers specific control requirements is 2.5 m/s² A(8). When exposure reaches this daily value, employers must implement a program of controls to eliminate risk or reduce exposure to as low as reasonably practicable. This includes providing information and training to workers, health surveillance, alternative work methods or equipment with lower vibration levels, maintenance programs for equipment, limitation of exposure duration, and appropriate work schedules with adequate breaks. For bricklayers, this is particularly relevant when using power tools like cut-off saws for brick cutting, which can exceed this value relatively quickly. There is also an Exposure Limit Value of 5.0 m/s² A(8), above which work must not continue."
  },
  {
    id: 'bricklaying-l3-topic1-31',
    question: "What is the significance of a RAMS document in relation to advanced bricklaying operations?",
    options: ["Random Allocation of Materials and Supplies", "Risk Assessment Method Statement - a document combining hazard identification and safe work procedures", "Regulatory Approval for Masonry Structures", "Regular Assessment of Material Strength"],
    correctAnswer: "Risk Assessment Method Statement - a document combining hazard identification and safe work procedures",
    explanation: "A RAMS (Risk Assessment Method Statement) document is significant for advanced bricklaying operations as it combines hazard identification and safe work procedures in a single integrated approach to managing health and safety risks. The Risk Assessment portion identifies hazards, evaluates risks, and determines control measures, while the Method Statement provides a step-by-step guide to safely completing the work. For complex bricklaying operations like constructing arches, curved walls, or working at significant heights, a detailed RAMS document ensures that specific technical risks are properly controlled. These documents are often contractually required and may need client approval before work commences. They must be communicated to all workers involved in the task, typically through briefings where workers sign to confirm understanding and agreement to follow the specified procedures."
  },
  {
    id: 'bricklaying-l3-topic1-32',
    question: "What is the recommended approach when designing safe systems of work for bricklaying activities?",
    options: ["Focus solely on providing personal protective equipment", "Rely exclusively on worker training and awareness", "Follow the hierarchy of control measures: eliminate, reduce, isolate, control, PPE, discipline", "Implement controls only after accidents have occurred"],
    correctAnswer: "Follow the hierarchy of control measures: eliminate, reduce, isolate, control, PPE, discipline",
    explanation: "The recommended approach when designing safe systems of work for bricklaying activities is to follow the hierarchy of control measures, often summarized as: eliminate, reduce, isolate, control, PPE, and discipline. This systematic approach starts with trying to eliminate the hazard completely (e.g., using precut blocks instead of cutting on site). If elimination isn't possible, reduce the risk (e.g., using wet cutting to minimize dust). Next, isolate the hazard from workers (e.g., dedicated cutting stations away from other activities). Then implement engineering controls and safe systems of work (e.g., rotation of tasks, mechanical lifting aids). Personal protective equipment should be used only as a last resort when residual risks remain. Finally, disciplinary procedures may be necessary to ensure compliance with the controls. This hierarchy ensures that collective protective measures are prioritized over individual protection."
  },
  {
    id: 'bricklaying-l3-topic1-33',
    question: "Under the Provision and Use of Work Equipment Regulations (PUWER), what requirement applies to brick cutting equipment?",
    options: ["It must be painted a specific color for identification", "It must be suitable for the intended use, maintained in good repair, and only used by competent, trained persons", "It must be replaced every 12 months regardless of condition", "It must only be operated by workers with more than 5 years of experience"],
    correctAnswer: "It must be suitable for the intended use, maintained in good repair, and only used by competent, trained persons",
    explanation: "Under the Provision and Use of Work Equipment Regulations 1998 (PUWER), brick cutting equipment must be suitable for the intended use, maintained in good repair, and only used by competent, trained persons. PUWER requires that all work equipment is selected appropriately for the conditions of use, properly maintained according to manufacturers' schedules, inspected regularly to ensure safety features are functioning correctly, and only operated by people who have received adequate information, instruction, and training. For brick cutting equipment specifically, this would include selection of appropriate blades for the material being cut, guarding to prevent access to dangerous parts, emergency stop controls, dust suppression features, and regular maintenance checks. Training must cover safe operation, limitations of the equipment, and procedures for reporting defects."
  },
  {
    id: 'bricklaying-l3-topic1-34',
    question: "When implementing a health surveillance program for silica exposure among bricklayers, what is the recommended frequency for lung function tests?",
    options: ["Only once when first employed", "Every 5 years regardless of exposure", "Before employment and then annually for those with significant exposure", "Only following a respiratory illness"],
    correctAnswer: "Before employment and then annually for those with significant exposure",
    explanation: "When implementing a health surveillance program for silica exposure among bricklayers, the recommended frequency for lung function tests is before employment (to establish a baseline) and then annually for those with significant exposure. This schedule is based on HSE guidance for respirable crystalline silica (RCS) health surveillance. The program should include a baseline health assessment including a detailed respiratory questionnaire and lung function test (spirometry), followed by annual reviews. The health surveillance should be conducted under the supervision of an occupational health professional. For workers showing early signs of respiratory issues, more frequent monitoring may be required. This surveillance is crucial for detecting the early stages of silicosis or other occupational lung diseases, when interventions can prevent progression and before significant lung damage occurs."
  },
  {
    id: 'bricklaying-l3-topic1-35',
    question: "What is a Section 2 Safety Inspection under the Health and Safety at Work Act, and who typically conducts it?",
    options: ["An informal site check conducted by the client", "A routine inspection conducted jointly by management and worker representatives to identify hazards and ensure legal compliance", "A specialized inspection only for scaffolding", "An inspection that only occurs after a serious accident"],
    correctAnswer: "A routine inspection conducted jointly by management and worker representatives to identify hazards and ensure legal compliance",
    explanation: "A Section 2 Safety Inspection under the Health and Safety at Work Act 1974 is a routine inspection conducted jointly by management and worker representatives to identify hazards and ensure legal compliance. The name refers to Section 2 of the Act, which places a general duty on employers to ensure the health, safety, and welfare of their employees. These inspections typically involve a documented walkthrough of the workplace to identify hazards, assess control measures, and verify compliance with health and safety standards. Having both management and worker representatives (often safety representatives appointed under the Safety Representatives and Safety Committees Regulations) ensures different perspectives are considered. The findings should be recorded, with identified issues assigned corrective actions, responsible persons, and completion deadlines. Regular Section 2 inspections demonstrate proactive safety management and help fulfill legal obligations."
  },
  {
    id: 'bricklaying-l3-topic1-36',
    question: "What is the main purpose of a 'Permit to Dig' system on a construction site?",
    options: ["To allocate excavation tasks to specific workers", "To prevent damage to underground services and ensure excavation safety", "To record the volume of soil removed from site", "To obtain local authority permission for excavation work"],
    correctAnswer: "To prevent damage to underground services and ensure excavation safety",
    explanation: "The main purpose of a 'Permit to Dig' system on a construction site is to prevent damage to underground services and ensure excavation safety. Before any excavation work begins, the permit system requires a formal assessment of the excavation location to identify any buried services like electric cables, gas pipes, water mains, or telecommunications lines. The process typically involves reviewing service drawings, using cable detection equipment, and sometimes trial holes to verify service locations. The permit documents the hazards identified, control measures required, and authorizes specific workers to conduct the excavation within defined parameters. This system prevents potentially fatal accidents from striking live electricity cables or gas pipes, as well as addressing other excavation hazards like ground collapse. Under the Construction (Design and Management) Regulations 2015, such systems help fulfill the duty to prevent risks to health and safety from underground services."
  },
  {
    id: 'bricklaying-l3-topic1-37',
    question: "What is the primary requirement for ensuring safety when bricklaying activities must take place in a confined space?",
    options: ["Working alone to minimize the number of people at risk", "Conducting the work as quickly as possible", "Implementing a safe system of work based on a specific risk assessment for confined space entry", "Using only battery-powered tools"],
    correctAnswer: "Implementing a safe system of work based on a specific risk assessment for confined space entry",
    explanation: "The primary requirement for ensuring safety when bricklaying activities must take place in a confined space is implementing a safe system of work based on a specific risk assessment for confined space entry. The Confined Spaces Regulations 1997 require that entry into a confined space is avoided where possible. If entry is necessary, a specific confined space risk assessment must be conducted, addressing hazards like oxygen depletion, toxic gases (including those from mortar or adhesives), flooding risks, and limited access/egress. The resulting safe system of work typically includes atmospheric testing, ventilation arrangements, emergency rescue procedures, communication systems, and a permit-to-work process. Workers must be specifically trained for confined space work, and a dedicated standby person positioned outside the space is required to monitor operations and initiate emergency procedures if necessary."
  },
  {
    id: 'bricklaying-l3-topic1-38',
    question: "What is the purpose of a 'proprietary fall arrest system' when working at height during bricklaying operations?",
    options: ["To catch falling masonry materials", "To prevent falls by restricting worker movement to safe areas", "To catch a person if they fall, reducing the risk of injury", "To automatically alert supervisors if someone falls"],
    correctAnswer: "To catch a person if they fall, reducing the risk of injury",
    explanation: "The purpose of a proprietary fall arrest system when working at height during bricklaying operations is to catch a person if they fall, reducing the risk of injury. Unlike fall prevention systems (like guardrails) that stop falls from occurring, fall arrest systems allow the fall to happen but stop it before the person hits the ground. These systems typically include an anchor point, a lanyard or lifeline, and a full-body harness. When correctly specified and used, they limit the forces on the body and bring the person to a safe stop. The Work at Height Regulations 2005 specify that fall arrest systems should only be used when collective protection measures like scaffolding with proper guardrails are not feasible, and must be properly maintained, inspected, and used by trained workers. Users must also be trained in suspension trauma prevention and rescue procedures must be in place."
  },
  {
    id: 'bricklaying-l3-topic1-39',
    question: "What blood test is specifically recommended as part of health surveillance for bricklayers with significant exposure to lead-containing materials?",
    options: ["Complete blood count (CBC)", "Blood lead level test", "Liver function test", "Kidney function test"],
    correctAnswer: "Blood lead level test",
    explanation: "For bricklayers with significant exposure to lead-containing materials, a blood lead level test is specifically recommended as part of health surveillance. This test measures the concentration of lead in the blood, providing a direct indicator of recent lead exposure. Under the Control of Lead at Work Regulations 2002, medical surveillance is mandatory when workers are exposed to significant levels of lead. Bricklayers may encounter lead in older buildings during renovation or demolition work (from lead flashing, old pipes, or lead-based paints). The frequency of testing depends on exposure levels, with higher exposures requiring more frequent monitoring. If blood lead levels exceed action thresholds (typically 30 μg/dl for men), the employer must investigate work practices, improve controls, and may need to remove the worker from lead exposure temporarily. This surveillance helps prevent chronic lead poisoning, which can cause neurological damage, kidney problems, and other serious health issues."
  },
  {
    id: 'bricklaying-l3-topic1-40',
    question: "Under the Work at Height Regulations, what is the primary requirement before using ladders for bricklaying tasks?",
    options: ["Ladders must be made of wood, not metal", "Ladders should only be used for short-duration work after a risk assessment justifies their use over safer alternatives", "At least two workers must be present when using any ladder", "Ladders must be painted in high-visibility colors"],
    correctAnswer: "Ladders should only be used for short-duration work after a risk assessment justifies their use over safer alternatives",
    explanation: "Under the Work at Height Regulations 2005, the primary requirement before using ladders for bricklaying tasks is that ladders should only be used for short-duration work after a risk assessment justifies their use over safer alternatives. The regulations establish a hierarchy of control measures, with ladders ranking low as they provide no fall protection. Ladders may be justified for low-risk, short-duration tasks (typically less than 30 minutes in one position) where more substantial platforms are not reasonably practicable. The risk assessment must consider the work height, duration, frequency, and the specific tasks involved. For bricklaying, ladders are rarely appropriate for extended work periods as they don't provide a stable platform for handling heavy materials and don't allow the bricklayer to position themselves correctly for accurate work. Proper ladder use includes secure positioning, appropriate angle (1:4 ratio), extending above landing points, and regular inspection."
  },
  {
    id: 'bricklaying-l3-topic1-41',
    question: "What is the legal requirement for information, instruction, and training regarding hazardous substances used in bricklaying under COSHH Regulations?",
    options: ["Training is only required for new employees", "A generic annual training session covering all substances is sufficient", "Substance-specific information, instruction, and training must be provided in a way workers understand, covering health risks, precautions, and emergency procedures", "Information must only be provided if requested by workers"],
    correctAnswer: "Substance-specific information, instruction, and training must be provided in a way workers understand, covering health risks, precautions, and emergency procedures",
    explanation: "Under the Control of Substances Hazardous to Health (COSHH) Regulations, the legal requirement for information, instruction, and training regarding hazardous substances used in bricklaying is that substance-specific information, instruction, and training must be provided in a way workers understand, covering health risks, precautions, and emergency procedures. This must include the specific hazards of substances like cement, mortar additives, and cleaning chemicals; the control measures implemented; how to use and maintain these controls correctly; any monitoring or health surveillance requirements; and emergency procedures for spillages or accidents. The training must be provided before exposure occurs, repeated periodically, updated when processes or substances change, and delivered in a format and language that workers can understand. Records of training should be maintained, and effectiveness should be verified through workplace observations and refresher sessions."
  },
  {
    id: 'bricklaying-l3-topic1-42',
    question: "What is meant by the term 'danger zone' in relation to masonry cutting operations?",
    options: ["The area where the blade contacts the material", "The entire job site where cutting takes place", "The area where a worker could potentially contact a moving blade or be hit by flying debris", "The storage area for cutting equipment"],
    correctAnswer: "The area where a worker could potentially contact a moving blade or be hit by flying debris",
    explanation: "The term 'danger zone' in relation to masonry cutting operations refers to the area where a worker could potentially contact a moving blade or be hit by flying debris. This includes the immediate vicinity around the blade where accidental contact could occur, as well as the area that could be affected by kickback, material ejection, or flying fragments and dust. The Provision and Use of Work Equipment Regulations 1998 (PUWER) requires that access to danger zones must be prevented or restricted while the equipment is in motion or use. This is typically achieved through guarding systems, designated exclusion zones during cutting operations, and safe positioning of the operator. For masonry cutting, water suppression not only controls dust but also reduces the risk of flying debris. Risk assessments for cutting operations should specifically identify the extent of danger zones and implement appropriate controls to prevent unauthorized access."
  },
  {
    id: 'bricklaying-l3-topic1-43',
    question: "Under current UK regulations, what is the main requirement for managing asbestos risks during renovation work on buildings constructed before 2000?",
    options: ["Assuming asbestos is present and proceeding with caution", "Checking the building's age and avoiding all pre-2000 structures", "Obtaining an asbestos survey before work begins and implementing appropriate controls based on the findings", "Only testing for asbestos if workers report respiratory symptoms"],
    correctAnswer: "Obtaining an asbestos survey before work begins and implementing appropriate controls based on the findings",
    explanation: "Under current UK regulations, specifically the Control of Asbestos Regulations 2012, the main requirement for managing asbestos risks during renovation work on buildings constructed before 2000 is obtaining an asbestos survey before work begins and implementing appropriate controls based on the findings. This typically requires a 'Refurbishment and Demolition' asbestos survey for areas that will be disturbed. The survey identifies asbestos-containing materials (ACMs) that may be present in structures like pipe insulation, ceiling tiles, textured coatings, and certain cement products relevant to bricklayers. If asbestos is identified, work must be planned accordingly - either by avoiding disturbance, employing licensed contractors for removal, or implementing specific controls for lower-risk materials. Bricklayers must not disturb suspected ACMs without proper assessment, as even limited exposure to asbestos fibers can cause serious diseases decades later."
  },
  {
    id: 'bricklaying-l3-topic1-44',
    question: "What is the key requirement for managing on-site traffic risks where bricklaying operations interact with vehicle movements?",
    options: ["All bricklayers must hold a driving license", "Only allowing vehicle movements outside working hours", "Implementing a traffic management plan with separated pedestrian and vehicle routes where possible", "Restricting site vehicles to a maximum speed of 5 mph"],
    correctAnswer: "Implementing a traffic management plan with separated pedestrian and vehicle routes where possible",
    explanation: "The key requirement for managing on-site traffic risks where bricklaying operations interact with vehicle movements is implementing a traffic management plan with separated pedestrian and vehicle routes where possible. Under the Construction (Design and Management) Regulations 2015, there is a specific duty to organize construction sites to ensure that pedestrians and vehicles can move safely. The traffic management plan should include clearly marked pedestrian pathways separated from vehicle routes by physical barriers where practical, designated crossing points with good visibility, one-way systems to minimize reversing, speed limits appropriate to site conditions, management of delivery areas, and safe unloading zones. For bricklaying operations specifically, material storage and work areas should be positioned to minimize crossing vehicle routes, and the movement of heavy materials like pallets of bricks should be carefully planned to avoid unnecessary transport risks."
  },
  {
    id: 'bricklaying-l3-topic1-45',
    question: "When is Face Fit Testing required to be repeated for respiratory protective equipment (RPE) used by bricklayers?",
    options: ["Only once when the mask is first issued", "Every 5 years regardless of circumstances", "When there's a change in the wearer's facial features, weight, or if different RPE is to be used", "Only when the worker reports breathing difficulties"],
    correctAnswer: "When there's a change in the wearer's facial features, weight, or if different RPE is to be used",
    explanation: "Face Fit Testing for respiratory protective equipment (RPE) used by bricklayers must be repeated when there's a change in the wearer's facial features, weight, or if different RPE is to be used. Changes that require retesting include significant weight loss or gain, dental work, facial surgery, scarring, or growth or removal of facial hair in the seal area. Testing is also required when switching to a different model or size of mask, even from the same manufacturer. While there's no specific legal timeframe for routine retesting, HSE guidance suggests good practice is to repeat testing regularly (typically annually), especially in high-risk environments like those with significant silica dust exposure. The Approved Code of Practice for the Control of Substances Hazardous to Health (COSHH) emphasizes that tight-fitting RPE must be fit tested for each individual wearer to provide effective protection."
  },
  {
    id: 'bricklaying-l3-topic1-46',
    question: "What is the purpose of a 'Safety Management System' in a construction company employing bricklayers?",
    options: ["Only to maintain records for regulatory compliance", "To organize company social events and team building", "To provide a comprehensive framework for managing health and safety risks systematically", "To assign blame in case of accidents"],
    correctAnswer: "To provide a comprehensive framework for managing health and safety risks systematically",
    explanation: "The purpose of a Safety Management System (SMS) in a construction company employing bricklayers is to provide a comprehensive framework for managing health and safety risks systematically. An effective SMS integrates health and safety management into the overall business operations rather than treating it as a stand-alone function. Key components typically include a health and safety policy that establishes direction and commitment; organizational responsibilities with clearly defined roles; planning and implementation procedures for risk assessment and control; performance measurement through monitoring and audits; and a review process for continuous improvement. For bricklaying operations specifically, the SMS would include trade-specific risk assessments, safe work procedures, equipment maintenance programs, training requirements, and supervision arrangements. This systematic approach helps ensure that health and safety is managed consistently across projects and that legal compliance is maintained."
  },
  {
    id: 'bricklaying-l3-topic1-47',
    question: "Under the Lifting Operations and Lifting Equipment Regulations (LOLER), what inspection regime is required for equipment used to lift pallets of bricks?",
    options: ["Visual checks by the operator only", "Inspection before first use, after assembly at a new site, and regularly during use", "Annual inspection only", "Inspection only after a lifting incident"],
    correctAnswer: "Inspection before first use, after assembly at a new site, and regularly during use",
    explanation: "Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), equipment used to lift pallets of bricks requires inspection before first use, after assembly at a new site, and regularly during use. Specifically, LOLER requires thorough examination and inspection of lifting equipment by a competent person: before first use unless the equipment has an EC declaration of conformity less than one year old; after assembly at a new site; and periodically during its life (typically 6-monthly for equipment lifting people, 12-monthly for other lifting equipment). Additionally, there should be frequent inspections based on risk assessment and manufacturer's recommendations, which might include daily pre-use checks by operators. For brick lifting equipment like forklifts, telehandlers, or crane attachments, these inspections are crucial due to the heavy loads involved and the severe consequences of equipment failure. Records of thorough examinations must be maintained and defects addressed promptly."
  },
  {
    id: 'bricklaying-l3-topic1-48',
    question: "What is the primary purpose of a 'health and safety audit' in a construction company employing bricklayers?",
    options: ["To replace the need for routine safety inspections", "To systematically examine whether health and safety management systems are effective and being properly implemented", "To focus exclusively on documenting accidents", "To ensure all employees have up-to-date training certificates"],
    correctAnswer: "To systematically examine whether health and safety management systems are effective and being properly implemented",
    explanation: "The primary purpose of a health and safety audit in a construction company employing bricklayers is to systematically examine whether health and safety management systems are effective and being properly implemented. Unlike routine inspections that focus on physical workplace conditions, audits take a broader, more in-depth look at the entire safety management system. A comprehensive audit reviews multiple elements including policy implementation, risk assessment processes, training effectiveness, procedures for high-risk activities, monitoring systems, record-keeping, and management commitment. For bricklaying operations, this might include examining whether silica exposure controls are not just in place but working effectively, if manual handling assessments are translating into actual practice, and whether near-miss reporting is leading to preventive actions. Audits should be conducted by competent individuals with sufficient independence to be objective, and findings should lead to an action plan for continuous improvement."
  },
  {
    id: 'bricklaying-l3-topic1-49',
    question: "What is the primary legal responsibility of a 'competent person' appointed under the Management of Health and Safety at Work Regulations?",
    options: ["To carry out all risk assessments personally", "To take over all health and safety responsibilities from management", "To provide advice and assistance on health and safety matters to help the employer comply with legal duties", "To liaison with the Health and Safety Executive during inspections"],
    correctAnswer: "To provide advice and assistance on health and safety matters to help the employer comply with legal duties",
    explanation: "The primary legal responsibility of a 'competent person' appointed under the Management of Health and Safety at Work Regulations 1999 is to provide advice and assistance on health and safety matters to help the employer comply with legal duties. Regulation 7 requires that employers appoint one or more competent persons to help them implement the measures needed to comply with health and safety legislation. The competent person should have sufficient training, experience, knowledge, and other qualities to properly assist the employer. In a construction company employing bricklayers, this might include advising on compliance with regulations relevant to masonry work, assisting with risk assessments for complex bricklaying operations, developing safe systems of work, and keeping the company updated on regulatory changes. The competent person provides expert guidance, but the legal responsibility for health and safety compliance remains with the employer - the competent person role is advisory rather than assuming the employer's duties."
  },
  {
    id: 'bricklaying-l3-topic1-50',
    question: "What is the best definition of the term 'reasonably practicable' as used in UK health and safety legislation?",
    options: ["Implementing all possible safety measures regardless of cost", "Balancing the level of risk against the time, trouble, difficulty and cost of taking measures to control it", "Taking only the minimum actions required to avoid prosecution", "Following exactly what other companies in the industry typically do"],
    correctAnswer: "Balancing the level of risk against the time, trouble, difficulty and cost of taking measures to control it",
    explanation: "The term 'reasonably practicable' as used in UK health and safety legislation is best defined as balancing the level of risk against the time, trouble, difficulty and cost of taking measures to control it. This concept is fundamental to much of UK safety law, including the Health and Safety at Work Act 1974. It means that duty holders must weigh the risk against the sacrifice (in terms of money, time or trouble) required to avert that risk. If there is a gross disproportion between them – the risk being insignificant relative to the sacrifice – the duty holder may not need to take the measure. This allows for a proportionate approach to safety management, recognizing that zero risk is rarely achievable. However, the courts have established that, where significant risks exist, the presumption will be in favor of safety measures unless the cost is grossly disproportionate to the risk reduction achieved."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'bricklaying-l3-health-safety', 'items', q.id), {
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
  
  uploadQuestions();
  