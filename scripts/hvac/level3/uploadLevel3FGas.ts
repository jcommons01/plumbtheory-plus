// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3FGas.ts

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

// ✅ HVAC Level 3 F-Gas Regulations Questions
const questions = [
  {
    id: 'hvac-l3-f-gas1',
    question: "Following the Brexit transition period, which regulation governs F-gas usage in the UK?",
    options: ["EU Regulation 517/2014 in its original form", "The F-gas Regulation (EU) 517/2014, as retained in UK law and amended by The Ozone-Depleting Substances and Fluorinated Greenhouse Gases (Amendment etc.) (EU Exit) Regulations 2019", "The Montreal Protocol only", "UK-specific legislation that completely replaces EU regulations"],
    correctAnswer: "The F-gas Regulation (EU) 517/2014, as retained in UK law and amended by The Ozone-Depleting Substances and Fluorinated Greenhouse Gases (Amendment etc.) (EU Exit) Regulations 2019",
    explanation: "After Brexit, F-gas usage in the UK is governed by the F-gas Regulation (EU) 517/2014, as retained in UK law and amended by The Ozone-Depleting Substances and Fluorinated Greenhouse Gases (Amendment etc.) (EU Exit) Regulations 2019. This essentially maintains the same core requirements as the EU regulation but transfers administrative functions from EU institutions to UK authorities and creates a separate UK HFC quota system."
  },
  {
    id: 'hvac-l3-f-gas2',
    question: "What is the current UK phase-down schedule for HFCs as a percentage of the 2015 baseline?",
    options: ["93% by 2025", "63% by 2025", "45% by 2025", "31% by 2025"],
    correctAnswer: "45% by 2025",
    explanation: "The current UK phase-down schedule for HFCs requires a reduction to 45% of the 2015 baseline by 2025. This follows the same schedule as the original EU F-gas Regulation, with previous steps of 93% (2016-2017), 63% (2018-2020), and 45% (2021-2023), further reducing to 24% by 2029 and 21% from 2030 onwards. This schedule is designed to gradually reduce HFC usage while allowing time for industry adaptation."
  },
  {
    id: 'hvac-l3-f-gas3',
    question: "What qualification must a person hold to legally recover F-gas refrigerants from stationary refrigeration systems in the UK?",
    options: ["No qualification is needed for systems under 3kg charge", "City & Guilds 2079-11 or other qualification meeting the F-gas Regulation requirements", "Any general HVAC qualification", "Only the system owner's permission"],
    correctAnswer: "City & Guilds 2079-11 or other qualification meeting the F-gas Regulation requirements",
    explanation: "To legally recover F-gas refrigerants from stationary refrigeration systems in the UK, a person must hold a City & Guilds 2079-11 qualification or another certification that meets F-gas Regulation requirements (such as BESA F-Gas certification). This Category I qualification covers refrigerant recovery, installation, maintenance, and leak checking of systems containing any quantity of F-gas refrigerant."
  },
  {
    id: 'hvac-l3-f-gas4',
    question: "What is the leak checking frequency requirement for a stationary refrigeration system containing 10 kg of R-410A (GWP 2088) with no leak detection system installed?",
    options: ["No leak checks required", "Annual leak checks", "Every six months", "Quarterly leak checks"],
    correctAnswer: "Every six months",
    explanation: "A stationary refrigeration system containing 10 kg of R-410A (GWP 2088) without a leak detection system requires leak checking every six months. This is because the system contains between 5 and 50 tonnes of CO₂ equivalent (10 kg × 2088 GWP = 20.88 tonnes CO₂e). Systems containing 5-50 tonnes CO₂e must be checked every 12 months, but this frequency is doubled (to every 6 months) when no leak detection system is installed."
  },
  {
    id: 'hvac-l3-f-gas5',
    question: "What is the legal threshold above which records must be kept for F-gas equipment?",
    options: ["Systems containing more than 3kg of F-gas", "Systems containing more than 5 tonnes of CO₂ equivalent", "All systems regardless of charge size", "Only systems above 500 tonnes of CO₂ equivalent"],
    correctAnswer: "Systems containing more than 5 tonnes of CO₂ equivalent",
    explanation: "Under the F-gas Regulations, records must be kept for all equipment containing 5 tonnes of CO₂ equivalent or more of F-gases. These records must include quantity and type of F-gas installed, quantities added during installation, maintenance or service, whether the F-gases used have been recycled or reclaimed, identifications of the company/technician, dates and results of leak checks, and recovery activity information."
  },
  {
    id: 'hvac-l3-f-gas6',
    question: "What is the GWP threshold above which single-split air conditioning systems with less than 3kg of refrigerant will be banned in the UK from January 1, 2025?",
    options: ["GWP of 750", "GWP of 1500", "GWP of 2500", "No ban is scheduled"],
    correctAnswer: "GWP of 750",
    explanation: "From January 1, 2025, single-split air conditioning systems containing less than 3kg of HFCs with a GWP of 750 or more will be banned in the UK. This affects popular refrigerants like R-410A (GWP 2088) but allows for the use of alternatives like R-32 (GWP 675). This prohibition aims to encourage the adoption of lower-GWP alternatives in smaller air conditioning systems while allowing reasonable time for technology transition."
  },
  {
    id: 'hvac-l3-f-gas7',
    question: "Which UK organisation is responsible for administering the F-gas certification of companies and individuals?",
    options: ["DEFRA", "Environment Agency", "REFCOM and other certification bodies", "Health and Safety Executive"],
    correctAnswer: "REFCOM and other certification bodies",
    explanation: "In the UK, REFCOM and other appointed certification bodies (like BUREAU VERITAS, QUIDOS, and Sterling) are responsible for administering the F-gas certification of companies and individuals. These bodies are approved by the Secretary of State to issue certificates to companies and individuals who meet the F-gas Regulation requirements for handling refrigerants, while overall regulation is overseen by government agencies like the Environment Agency."
  },
  {
    id: 'hvac-l3-f-gas8',
    question: "What is the CO₂ equivalent of 2.5kg of R-404A with a GWP of 3922?",
    options: ["6.25 tonnes CO₂e", "9.81 tonnes CO₂e", "1.57 tonnes CO₂e", "3.92 tonnes CO₂e"],
    correctAnswer: "9.81 tonnes CO₂e",
    explanation: "The CO₂ equivalent is calculated by multiplying the refrigerant charge in tonnes by its GWP: 2.5kg of R-404A = 0.0025 tonnes × 3922 GWP = 9.81 tonnes CO₂e. This calculation is essential for determining leak checking frequencies, record-keeping requirements, and other regulatory obligations under the F-gas Regulations."
  },
  {
    id: 'hvac-l3-f-gas9',
    question: "What is the minimum qualification requirement to sell F-gas refrigerants to a third party in the UK?",
    options: ["No qualification needed as long as the buyer is qualified", "The seller must hold an F-gas handling qualification", "The seller must employ at least one F-gas qualified person", "Only wholesale distributors need qualifications"],
    correctAnswer: "The seller must employ at least one F-gas qualified person",
    explanation: "Under the F-gas Regulations, companies selling F-gas refrigerants to third parties who will use them (end-users) must employ at least one person with an F-gas qualification covering the relevant sector and maintain records of refrigerant sales. This ensures technical knowledge is available when supplying refrigerants and helps monitor and control the distribution of these controlled substances."
  },
  {
    id: 'hvac-l3-f-gas10',
    question: "In a hermetically sealed system, what is the maximum quantity of HFCs with a GWP of 2500 or more that can be used after January 1, 2020 under the F-gas Regulations?",
    options: ["10 tonnes CO₂e", "40 tonnes CO₂e", "100 tonnes CO₂e", "There is no restriction for hermetically sealed systems"],
    correctAnswer: "10 tonnes CO₂e",
    explanation: "After January 1, 2020, hermetically sealed systems can contain HFCs with a GWP of 2500 or more only if the quantity is less than 10 tonnes CO₂e. This restriction, from Article 13(3) of the F-gas Regulation, targets high-GWP refrigerants like R-404A and R-507A, encouraging the transition to lower-GWP alternatives in new equipment while allowing small hermetically sealed systems to continue using higher-GWP refrigerants."
  },
  {
    id: 'hvac-l3-f-gas11',
    question: "What is the leak checking frequency requirement for a stationary system containing 100 tonnes of CO₂ equivalent of F-gas with an automatic leak detection system installed?",
    options: ["No leak checks required if automatic detection is installed", "Every 12 months", "Every 6 months", "Every 3 months"],
    correctAnswer: "Every 6 months",
    explanation: "A stationary system containing 100 tonnes of CO₂ equivalent with an automatic leak detection system installed requires leak checking every 6 months. The standard frequency for systems containing 50-500 tonnes CO₂e is every 3 months, but this is reduced to every 6 months when a properly functioning automatic leak detection system is installed."
  },
  {
    id: 'hvac-l3-f-gas12',
    question: "Under the F-gas Regulations, what is the requirement for automatic leak detection on stationary refrigeration equipment?",
    options: ["Required for all systems regardless of charge", "Required for systems containing 5 tonnes CO₂e or more", "Required for systems containing 50 tonnes CO₂e or more", "Required for systems containing 500 tonnes CO₂e or more"],
    correctAnswer: "Required for systems containing 500 tonnes CO₂e or more",
    explanation: "Under the F-gas Regulations, automatic leak detection is required for stationary refrigeration equipment containing 500 tonnes CO₂e or more. For systems between 50-500 tonnes CO₂e, automatic leak detection is not mandatory but installing it reduces the required frequency of manual leak checks, providing both regulatory benefits and potential leak reduction."
  },
  {
    id: 'hvac-l3-f-gas13',
    question: "What is the maximum allowable annual leakage rate for stationary refrigeration equipment according to the F-gas Regulations?",
    options: ["1% of the total charge", "5% of the total charge", "10% of the total charge", "No specific maximum is defined in the regulations"],
    correctAnswer: "No specific maximum is defined in the regulations",
    explanation: "The F-gas Regulations do not define a specific maximum allowable annual leakage rate as a percentage of charge. Instead, they require that all detected leaks be repaired 'without undue delay' and verified within 30 days. The regulations focus on leak prevention, detection, and timely repair rather than setting an allowable leakage threshold, taking a zero-tolerance approach to refrigerant leakage."
  },
  {
    id: 'hvac-l3-f-gas14',
    question: "Under the F-gas Regulations, what is required following the repair of a leak on a system containing more than 5 tonnes CO₂e?",
    options: ["No further action is needed once the leak is fixed", "A full refrigerant replacement within 30 days", "A follow-up leak check within one month", "Notification to local authorities"],
    correctAnswer: "A follow-up leak check within one month",
    explanation: "Under the F-gas Regulations, after repairing a leak on a system containing more than 5 tonnes CO₂e, a follow-up leak check must be conducted within one month of the repair. This follow-up check focuses specifically on the repaired area(s) to ensure the effectiveness of the repair and to confirm no further leakage is occurring."
  },
  {
    id: 'hvac-l3-f-gas15',
    question: "When is the recovery of F-gases from refrigeration circuits and equipment required by the F-gas Regulations?",
    options: ["Only when the equipment is being permanently decommissioned", "Only during major repairs", "During maintenance or servicing and before final disposal of equipment", "Only when changing to a different refrigerant type"],
    correctAnswer: "During maintenance or servicing and before final disposal of equipment",
    explanation: "The F-gas Regulations require recovery of F-gases during maintenance or servicing (when the refrigerant circuit is opened) and before final disposal of equipment, unless technically not feasible or involving disproportionate cost. This ensures F-gases are not released to the atmosphere during any operation and can be reused (after reclamation if necessary) or properly destroyed."
  },
  {
    id: 'hvac-l3-f-gas16',
    question: "Which of the following refrigerants is NOT classified as an F-gas under the regulations?",
    options: ["R-134a (HFC-134a)", "R-404A (HFC blend)", "R-32 (HFC-32)", "R-717 (Ammonia)"],
    correctAnswer: "R-717 (Ammonia)",
    explanation: "R-717 (Ammonia) is NOT classified as an F-gas under the regulations. F-gases are fluorinated greenhouse gases containing fluorine, such as HFCs, PFCs, and SF6. R-134a, R-404A, and R-32 are all HFCs (hydrofluorocarbons) and therefore regulated as F-gases. Ammonia (R-717) is a natural refrigerant without fluorine and is not subject to the F-gas Regulations, though it has its own safety requirements."
  },
  {
    id: 'hvac-l3-f-gas17',
    question: "What information must be included on the label of equipment containing F-gases according to the regulations?",
    options: ["Only the type of refrigerant", "Type of refrigerant, quantity in kg and CO₂ equivalent, and whether the F-gas is recycled or reclaimed", "Only the GWP value of the refrigerant", "Only the name of the installation company"],
    correctAnswer: "Type of refrigerant, quantity in kg and CO₂ equivalent, and whether the F-gas is recycled or reclaimed",
    explanation: "According to the F-gas Regulations, labels on equipment containing F-gases must include the type of refrigerant (industrial designation), quantity expressed in weight (kg) and CO₂ equivalent (tonnes), and whether the F-gas is recycled or reclaimed (if applicable). From 2017, this labeling became mandatory for all equipment, providing clear information about the F-gas content for operators and service personnel."
  },
  {
    id: 'hvac-l3-f-gas18',
    question: "Which of the following refrigerants has been banned for use in new commercial refrigeration equipment since January 1, 2020?",
    options: ["R-134a (GWP 1430)", "R-32 (GWP 675)", "R-404A (GWP 3922)", "R-1234ze (GWP <10)"],
    correctAnswer: "R-404A (GWP 3922)",
    explanation: "R-404A (GWP 3922) has been banned for use in new commercial refrigeration equipment since January 1, 2020, under the F-gas Regulation's prohibition on new equipment using refrigerants with GWP of 2500 or more. This high-GWP refrigerant was commonly used in commercial refrigeration but is being phased out in favor of lower-GWP alternatives like R-448A, R-449A, or natural refrigerants."
  },
  {
    id: 'hvac-l3-f-gas19',
    question: "What level of F-gas certification is required to install, commission and maintain a split air conditioning system?",
    options: ["Category I", "Category II", "Category III", "Category IV"],
    correctAnswer: "Category I",
    explanation: "Category I F-gas certification is required to install, commission, and maintain split air conditioning systems. This highest level certification covers all activities related to F-gases including installation, leak checking, refrigerant recovery, and maintenance on any size of equipment. Category I is required for all stationary refrigeration, air conditioning, and heat pump equipment without restrictions on activities or system size."
  },
  {
    id: 'hvac-l3-f-gas20',
    question: "What is the maximum CO₂ equivalent threshold below which the ban on servicing refrigeration equipment with virgin HFCs of GWP 2500 or more does not apply?",
    options: ["5 tonnes CO₂e", "10 tonnes CO₂e", "40 tonnes CO₂e", "100 tonnes CO₂e"],
    correctAnswer: "40 tonnes CO₂e",
    explanation: "The ban on servicing refrigeration equipment with virgin HFCs of GWP 2500 or more (like R-404A) does not apply to equipment with a charge size of less than 40 tonnes CO₂e. This exemption, introduced from January 1, 2020, allows smaller systems to continue using virgin high-GWP refrigerants for maintenance, while larger systems must use recycled/reclaimed refrigerants or transition to lower-GWP alternatives."
  },
  {
    id: 'hvac-l3-f-gas21',
    question: "What qualifications are required to recover refrigerant from domestic refrigerators and freezers under the F-gas Regulations?",
    options: ["Category I F-gas certification", "Category III F-gas certification", "No specific qualification is required", "Waste Management License only"],
    correctAnswer: "Category III F-gas certification",
    explanation: "Category III F-gas certification is specifically required for recovering refrigerant from domestic refrigerators and freezers. This category covers recovery operations only on equipment containing less than 3kg of F-gases (or less than 6kg for hermetically sealed systems). This requirement ensures that even when disposing of smaller equipment, refrigerant is properly recovered by qualified personnel to prevent atmospheric releases."
  },
  {
    id: 'hvac-l3-f-gas22',
    question: "Under the UK F-gas Regulations, what is the requirement for checking automatic leak detection systems installed on equipment containing 500 tonnes CO₂e or more?",
    options: ["Testing is not required after installation", "Annual testing required", "Testing required every two years", "Monthly testing required"],
    correctAnswer: "Annual testing required",
    explanation: "Under the UK F-gas Regulations, automatic leak detection systems installed on equipment containing 500 tonnes CO₂e or more must be tested at least once every 12 months (annually) to ensure proper functioning. This testing verifies that the system will effectively detect refrigerant leaks and provide appropriate notification, maintaining the safety and compliance benefits of automatic leak detection."
  },
  {
    id: 'hvac-l3-f-gas23',
    question: "What action is required under the F-gas Regulations if a leak is found during a routine check?",
    options: ["Simply top up the system with additional refrigerant", "Repair the leak within 7 days in all cases", "Repair the leak without undue delay and conduct a follow-up check within one month", "Immediately decommission the system and report to authorities"],
    correctAnswer: "Repair the leak without undue delay and conduct a follow-up check within one month",
    explanation: "If a leak is found during a routine check, the F-gas Regulations require that the leak be repaired 'without undue delay' followed by a leak check within one month of the repair to verify its effectiveness. While the regulations don't specify an exact timeframe for 'without undue delay,' it implies addressing the issue as soon as reasonably practicable, based on the nature and severity of the leak."
  },
  {
    id: 'hvac-l3-f-gas24',
    question: "What is the main purpose of the UK's HFC quota system under the post-Brexit F-gas regime?",
    options: ["To generate revenue for environmental projects", "To gradually reduce the quantity of HFCs placed on the UK market", "To restrict imports from non-EU countries only", "To ensure only UK manufacturers can supply HFCs"],
    correctAnswer: "To gradually reduce the quantity of HFCs placed on the UK market",
    explanation: "The main purpose of the UK's HFC quota system under the post-Brexit F-gas regime is to gradually reduce the quantity of HFCs placed on the UK market, matching the phase-down schedule that was previously part of the EU system. This separate UK quota system, administered by the Environment Agency, requires UK importers and manufacturers of bulk HFCs to hold sufficient quota allocation or quota authorizations to legally place HFCs on the UK market."
  },
  {
    id: 'hvac-l3-f-gas25',
    question: "What is the definition of 'placing on the market' under the F-gas Regulations?",
    options: ["Only the first import of F-gases into the UK", "Only the final sale to an end-user", "The first time making F-gases available to another party in the UK, whether for payment or free of charge", "Only sales of new equipment containing F-gases"],
    correctAnswer: "The first time making F-gases available to another party in the UK, whether for payment or free of charge",
    explanation: "'Placing on the market' under the F-gas Regulations means supplying or making available to another party in the UK for the first time, whether for payment or free of charge. This includes importing into the UK, manufacturing in the UK for the UK market, using HFCs in equipment manufactured in the UK, and first use of HFCs produced in the UK. This definition is crucial for understanding when quota requirements apply."
  },
  {
    id: 'hvac-l3-f-gas26',
    question: "For equipment containing F-gases, what specific record must be maintained regarding leak checks?",
    options: ["Only the equipment location", "Only the quantity of F-gas added", "Dates and results of leak checks including the cause of any leaks detected", "Only the company name performing maintenance"],
    correctAnswer: "Dates and results of leak checks including the cause of any leaks detected",
    explanation: "For equipment containing F-gases, operators must maintain records of the dates and results of leak checks, including the cause of any leaks detected. These records must also include details of the company and technician performing the checks, quantities of F-gas added or recovered, and whether the equipment was checked after repair. These comprehensive records enable tracking of the equipment's leak history and compliance verification."
  },
  {
    id: 'hvac-l3-f-gas27',
    question: "What exemption to the service ban applies for military equipment containing HFCs with GWP of 2500 or above?",
    options: ["No exemption applies to military equipment", "Military equipment is exempt until 2030", "Military equipment is permanently exempt", "Military equipment is exempt until 2025 only"],
    correctAnswer: "Military equipment is permanently exempt",
    explanation: "Military equipment is permanently exempt from the service ban on HFCs with GWP of 2500 or above. This exemption recognizes the specialized requirements and extended development cycles of military equipment, where immediate transitions to alternative refrigerants might not be feasible. However, the military is still encouraged to adopt lower-GWP alternatives when equipment is replaced or new systems are developed."
  },
  {
    id: 'hvac-l3-f-gas28',
    question: "What is the definition of a 'stationary application' under the F-gas Regulations?",
    options: ["Only large industrial refrigeration plants", "Applications that are not in transit during operation", "Only applications with refrigerant charge above 10kg", "Any application installed by a qualified technician"],
    correctAnswer: "Applications that are not in transit during operation",
    explanation: "Under the F-gas Regulations, a 'stationary application' is defined as an application that is not in transit during operation. This includes all fixed refrigeration, air conditioning, and heat pump equipment, as well as fixed fire protection systems, regardless of size. This definition distinguishes these applications from mobile applications like refrigerated transport and mobile air conditioning, which have separate regulatory provisions."
  },
  {
    id: 'hvac-l3-f-gas29',
    question: "What type of F-gas certification is required to install a refrigeration system with a charge above 3kg?",
    options: ["Category I", "Category II", "Category III", "Category IV"],
    correctAnswer: "Category I",
    explanation: "Category I F-gas certification is required to install a refrigeration system with a charge above 3kg. This highest level certification covers all activities (installation, servicing, maintenance, leak checking, recovery) on any size of stationary refrigeration, air conditioning, or heat pump equipment, without restrictions. Category II certification would only be sufficient for systems with less than 3kg."
  },
  {
    id: 'hvac-l3-f-gas30',
    question: "Which of the following activities is NOT covered by F-gas regulations?",
    options: ["Installation of equipment containing F-gases", "Maintenance of equipment containing F-gases", "Manufacturing of equipment that will contain F-gases", "Setting the temperature on equipment containing F-gases"],
    correctAnswer: "Setting the temperature on equipment containing F-gases",
    explanation: "Setting the temperature on equipment containing F-gases is NOT covered by F-gas regulations, as it doesn't involve handling refrigerant or accessing the refrigerant circuit. The F-gas regulations specifically cover activities that might lead to emissions, including installation, maintenance, servicing, leak checking, recovery, and decommissioning. Simple user operations like temperature adjustment don't require F-gas certification."
  },
  {
    id: 'hvac-l3-f-gas31',
    question: "What is the deadline for using virgin R-404A (GWP 3922) in new stationary refrigeration equipment in the UK?",
    options: ["January 1, 2020", "January 1, 2022", "January 1, 2025", "This refrigerant is already banned for new equipment"],
    correctAnswer: "This refrigerant is already banned for new equipment",
    explanation: "Virgin R-404A (GWP 3922) is already banned for use in new stationary refrigeration equipment in the UK and has been since January 1, 2020. This prohibition applies to all new refrigeration equipment using refrigerants with GWP of 2500 or more, effectively eliminating high-GWP refrigerants like R-404A and R-507A from new installations, encouraging transition to lower-GWP alternatives."
  },
  {
    id: 'hvac-l3-f-gas32',
    question: "What is the CO₂ equivalent of 5kg of R-134a with a GWP of 1430?",
    options: ["5 tonnes CO₂e", "7.15 tonnes CO₂e", "14.3 tonnes CO₂e", "143 tonnes CO₂e"],
    correctAnswer: "7.15 tonnes CO₂e",
    explanation: "The CO₂ equivalent is calculated by multiplying the refrigerant charge in tonnes by its GWP value: 5kg of R-134a = 0.005 tonnes × 1430 GWP = 7.15 tonnes CO₂e. This calculation is fundamental for determining regulatory requirements like leak checking frequency and record-keeping obligations under the F-gas Regulations."
  },
  {
    id: 'hvac-l3-f-gas33',
    question: "Which of the following refrigerants is allowed for use in new multi-split air conditioning systems with a charge above 3kg from January 1, 2025?",
    options: ["R-410A (GWP 2088)", "R-32 (GWP 675)", "R-407C (GWP 1774)", "None of these will be allowed"],
    correctAnswer: "R-32 (GWP 675)",
    explanation: "From January 1, 2025, only R-32 (GWP 675) from the listed options will be allowed for use in new multi-split air conditioning systems with a charge above 3kg. This is because the F-gas Regulations prohibit using refrigerants with GWP of 750 or more in multi-split systems from that date. R-410A and R-407C both exceed this threshold and will not be permitted for these new installations."
  },
  {
    id: 'hvac-l3-f-gas34',
    question: "What is the minimum qualification required to leak-check a system containing 10 tonnes CO₂e of F-gas without breaking into the refrigerant circuit?",
    options: ["No qualification is required", "Category I or Category II F-gas certification", "Category III F-gas certification", "Category IV F-gas certification"],
    correctAnswer: "Category I or Category II F-gas certification",
    explanation: "To leak-check a system containing 10 tonnes CO₂e of F-gas without breaking into the refrigerant circuit requires either Category I or Category II F-gas certification. Category II certification covers leak checking without breaking into the refrigerant circuit (plus recovery, installation, and maintenance for systems under 3kg), while Category I covers all activities including those involving breaking into the circuit."
  },
  {
    id: 'hvac-l3-f-gas35',
    question: "What regulatory requirements apply to the use of R-290 (propane) in refrigeration systems?",
    options: ["The same F-gas requirements as for HFCs", "No regulatory requirements as it's a natural refrigerant", "F-gas requirements for leak checking, but not for certification", "Not covered by F-gas Regulations, but subject to DSEAR and other safety regulations"],
    correctAnswer: "Not covered by F-gas Regulations, but subject to DSEAR and other safety regulations",
    explanation: "R-290 (propane) is not covered by F-gas Regulations as it's not a fluorinated gas, but its use is subject to other important regulations including the Dangerous Substances and Explosive Atmospheres Regulations (DSEAR), Pressure Equipment Regulations, and general health and safety legislation. These address the flammability risks associated with hydrocarbon refrigerants through appropriate design, installation, and maintenance requirements."
  },
  {
    id: 'hvac-l3-f-gas36',
    question: "What is the requirement for a company installing equipment containing F-gases in the UK?",
    options: ["Only individual technicians need certification", "The company must hold a company certificate and employ appropriately certified personnel", "No company certification is needed if technicians are certified", "Only an F-gas log is required"],
    correctAnswer: "The company must hold a company certificate and employ appropriately certified personnel",
    explanation: "Companies installing equipment containing F-gases in the UK must hold a valid Company Certificate issued by an approved certification body (like REFCOM) AND employ sufficient personnel with appropriate individual F-gas handling certificates to cover the activities undertaken. This dual certification system ensures both organizational compliance and individual competence in handling F-gases."
  },
  {
    id: 'hvac-l3-f-gas37',
    question: "What is the correct procedure for disposing of recovered F-gas refrigerant that is contaminated and unsuitable for reclamation?",
    options: ["Release to atmosphere in small quantities", "Mix with clean refrigerant to dilute contaminants", "Send to an authorized waste facility for destruction", "Store indefinitely on company premises"],
    correctAnswer: "Send to an authorized waste facility for destruction",
    explanation: "Contaminated F-gas refrigerant that is unsuitable for reclamation must be sent to an authorized waste facility for destruction. Under the F-gas Regulations and waste management laws, refrigerants are classified as hazardous waste and must be properly processed by licensed facilities using approved destruction technologies. Releasing refrigerant to atmosphere is illegal, and mixing contaminated with clean refrigerant would contaminate the good refrigerant."
  },
  {
    id: 'hvac-l3-f-gas38',
    question: "What is the definition of 'hermetically sealed equipment' under the F-gas Regulations?",
    options: ["Any equipment containing less than 3kg of refrigerant", "Equipment where all refrigerant-containing parts are sealed by welding, brazing or similar permanent connection", "Any equipment with a GWP less than 2500", "Equipment that cannot leak under any circumstances"],
    correctAnswer: "Equipment where all refrigerant-containing parts are sealed by welding, brazing or similar permanent connection",
    explanation: "Under the F-gas Regulations, 'hermetically sealed equipment' is defined as equipment where all refrigerant-containing parts are sealed by welding, brazing, or similar permanent connection, which may include sealed access points for service or disposal. This definition is important as certain regulatory thresholds differ for hermetically sealed systems, including leak checking requirements applying at 10 tonnes CO₂e instead of 5 tonnes for non-hermetically sealed equipment."
  },
  {
    id: 'hvac-l3-f-gas39',
    question: "What is the threshold at which leak detection systems become mandatory for hermetically sealed equipment?",
    options: ["5 tonnes CO₂e", "10 tonnes CO₂e", "50 tonnes CO₂e", "500 tonnes CO₂e"],
    correctAnswer: "500 tonnes CO₂e",
    explanation: "For hermetically sealed equipment, as with other stationary refrigeration equipment, leak detection systems become mandatory at 500 tonnes CO₂e. The F-gas Regulations make no distinction between hermetically sealed and non-hermetically sealed equipment for this particular requirement, although they do differ for other requirements like the initial threshold for leak checking."
  },
  {
    id: 'hvac-l3-f-gas40',
    question: "Under the F-gas Regulations, which of the following R-410A (GWP 2088) systems would require quarterly leak checks without a leak detection system?",
    options: ["A system containing 2kg of R-410A", "A system containing 5kg of R-410A", "A system containing 10kg of R-410A", "A system containing 25kg of R-410A"],
    correctAnswer: "A system containing 25kg of R-410A",
    explanation: "A system containing 25kg of R-410A would require quarterly leak checks without a leak detection system. This is calculated as 25kg × 2088 GWP = 52.2 tonnes CO₂e, which exceeds the 50 tonnes CO₂e threshold for quarterly leak checks. Systems containing between 5-50 tonnes CO₂e require checks every 12 months, and those between 50-500 tonnes CO₂e require checks every 3 months (quarterly) if no leak detection system is installed."
  },
  {
    id: 'hvac-l3-f-gas41',
    question: "What is the legal requirement for record keeping duration for F-gas equipment?",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: "5 years",
    explanation: "The legal requirement for record keeping duration under the F-gas Regulations is 5 years. Operators of equipment containing F-gases must keep records for at least 5 years, and make them available on request to the competent authority or the European Commission. These records document activities like installation, maintenance, leak checking, and recovery, providing a trail of compliance with regulatory requirements."
  },
  {
    id: 'hvac-l3-f-gas42',
    question: "Which government authority is responsible for enforcing the F-gas Regulations in England?",
    options: ["Health and Safety Executive", "Environment Agency", "Department for Environment, Food and Rural Affairs (DEFRA)", "Local Council Environmental Health Departments"],
    correctAnswer: "Environment Agency",
    explanation: "The Environment Agency is responsible for enforcing the F-gas Regulations in England. In devolved administrations, enforcement is handled by Natural Resources Wales, the Scottish Environment Protection Agency (SEPA), and the Northern Ireland Environment Agency respectively. These agencies conduct inspections, investigate potential breaches, and can take enforcement action including prohibition notices and prosecution for non-compliance."
  },
  {
    id: 'hvac-l3-f-gas43',
    question: "What category of F-gas certification is specifically for leak checking without breaking into the refrigeration circuit?",
    options: ["Category I only", "Category II only", "Category IV", "Both Category I and Category II"],
    correctAnswer: "Both Category I and Category II",
    explanation: "Both Category I and Category II F-gas certifications cover leak checking without breaking into the refrigeration circuit. Category II specifically covers leak checking (without breaking into the circuit), recovery, installation, and maintenance of systems containing less than 3kg of F-gases, while Category I covers these activities plus leak checking involving breaking into the circuit and for any size of equipment."
  },
  {
    id: 'hvac-l3-f-gas44',
    question: "Which refrigerants will be subject to a new service ban from January 1, 2030 under current F-gas Regulations?",
    options: ["Refrigerants with GWP of 1500 or more", "Refrigerants with GWP of 2500 or more", "All HFC refrigerants regardless of GWP", "Only R-404A specifically"],
    correctAnswer: "Refrigerants with GWP of 1500 or more",
    explanation: "According to the revised F-gas Regulations, from January 1, 2030, the use of virgin HFCs with a GWP of 1500 or more will be prohibited for service and maintenance of refrigeration equipment. This extends the current ban (on refrigerants with GWP of 2500+) to include medium-GWP refrigerants like R-134a (GWP 1430), though recycled/reclaimed refrigerants may still be used, similar to the existing provisions for higher-GWP refrigerants."
  },
  {
    id: 'hvac-l3-f-gas45',
    question: "Under current UK regulations, what is the requirement for importing equipment pre-charged with HFCs?",
    options: ["Importers need F-gas certification", "Pre-charged equipment is exempt from all regulations", "Importers must ensure the HFCs are covered by the quota system", "Import of pre-charged equipment is completely banned"],
    correctAnswer: "Importers must ensure the HFCs are covered by the quota system",
    explanation: "Under current UK regulations, importers of equipment pre-charged with HFCs must ensure the HFCs are covered by the quota system. This is typically done through a declaration of conformity confirming that the HFCs in the equipment are accounted for within the UK quota system. This requirement ensures pre-charged equipment imports don't circumvent the phase-down schedule for HFCs."
  },
  {
    id: 'hvac-l3-f-gas46',
    question: "What is the definition of 'operator' under the F-gas Regulations?",
    options: ["Only the owner of the equipment", "Only the company that installed the equipment", "The person exercising actual power over the technical functioning of the equipment", "Only the technician who services the equipment"],
    correctAnswer: "The person exercising actual power over the technical functioning of the equipment",
    explanation: "Under the F-gas Regulations, the 'operator' is defined as the person (individual or company) exercising actual power over the technical functioning of the equipment. This may be the owner, but could also be a facilities management company or tenant with the responsibility for operating the equipment. The operator bears the legal responsibilities for compliance with requirements like leak checking, record keeping, and ensuring proper maintenance."
  },
  {
    id: 'hvac-l3-f-gas47',
    question: "What is meant by 'reclaimed' refrigerant under the F-gas Regulations?",
    options: ["Any refrigerant recovered from equipment", "Refrigerant that has been cleaned on-site during maintenance", "Recovered refrigerant that has been processed to a specified standard by a specialist facility", "Refrigerant that has been mixed with new refrigerant"],
    correctAnswer: "Recovered refrigerant that has been processed to a specified standard by a specialist facility",
    explanation: "Under the F-gas Regulations, 'reclaimed' refrigerant refers to recovered refrigerant that has been processed to a specified standard (typically equivalent to virgin refrigerant specifications) by a specialist reclamation facility. This processing involves laboratory testing and removal of contaminants to restore the refrigerant to a specified standard. Reclaimed refrigerant is distinct from 'recycled' refrigerant, which undergoes basic cleaning for reuse without meeting virgin-equivalent standards."
  },
  {
    id: 'hvac-l3-f-gas48',
    question: "What certification is required to recover F-gas from a decommissioned commercial refrigeration system with 20kg charge?",
    options: ["Category I only", "Either Category I or Category II", "Category III only", "Category IV only"],
    correctAnswer: "Category I only",
    explanation: "Category I certification is required to recover F-gas from a decommissioned commercial refrigeration system with a 20kg charge. This is because Category II certification only covers recovery from systems containing less than 3kg of F-gases, while Category I has no restriction on system size. Categories III and IV are not applicable as they cover specific limited activities (domestic appliance recovery and leak checking only, respectively)."
  },
  {
    id: 'hvac-l3-f-gas49',
    question: "What is the restriction on non-refillable containers under the F-gas Regulations?",
    options: ["They can only be used for specific refrigerants", "They can only be used by Category I certified technicians", "Their use is prohibited for containing F-gases", "They can only be used for quantities less than 1kg"],
    correctAnswer: "Their use is prohibited for containing F-gases",
    explanation: "Under the F-gas Regulations, the use of non-refillable containers (disposable cylinders) for F-gases is prohibited. This ban was introduced to prevent releases of residual gas from disposed containers and to encourage better control and tracking of F-gases through the use of refillable containers that are returned to suppliers. All F-gas refrigerants must be supplied and handled in refillable containers only."
  },
  {
    id: 'hvac-l3-f-gas50',
    question: "When must a leak detection system be tested to ensure proper functioning?",
    options: ["Only during installation", "Only when equipment is showing signs of leakage", "At least once every 12 months", "Every time the equipment is serviced"],
    correctAnswer: "At least once every 12 months",
    explanation: "Under the F-gas Regulations, a leak detection system must be tested to ensure proper functioning at least once every 12 months. This annual testing requirement ensures that automatic systems remain effective at detecting leaks and providing notification, maintaining their role in reducing refrigerant emissions and potentially extending the period between mandatory manual leak checks for systems in the 50-500 tonnes CO₂e range."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-f-gas', 'items', q.id), {
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
