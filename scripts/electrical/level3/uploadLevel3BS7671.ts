// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3BS7671.ts

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

// ✅ Level 3 BS 7671 (18th Edition) Questions
const questions = [
  {
    id: 'level3bs767101',
    question: "According to BS 7671 18th Edition, what is the minimum cross-sectional area for a circuit protective conductor that is not incorporated in a cable or enclosed in a wiring system?",
    options: ["1.0 mm² (copper) with mechanical protection", "1.5 mm² (copper) with mechanical protection", "2.5 mm² (copper) with mechanical protection", "4.0 mm² (copper) with mechanical protection"],
    correctAnswer: "2.5 mm² (copper) with mechanical protection",
    explanation: "According to BS 7671 Regulation 543.3.1, a circuit protective conductor not incorporated in a cable or enclosed in a wiring system must have a minimum cross-sectional area of 2.5 mm² if copper and provided with mechanical protection, or 4.0 mm² if copper but not provided with mechanical protection."
  },
  {
    id: 'level3bs767102',
    question: "BS 7671 18th Edition specifies that socket outlets rated at not more than 20A in installations in dwellings must be protected by an RCD with a rated residual operating current not exceeding what value?",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctAnswer: "30mA",
    explanation: "Regulation 411.3.3 of BS 7671 18th Edition requires that socket outlets rated at not more than 20A for general use by ordinary persons in installations in dwellings must be protected by an RCD with a rated residual operating current not exceeding 30mA."
  },
  {
    id: 'level3bs767103',
    question: "According to the 18th Edition, what is the maximum disconnection time permitted for a 400V TN system final circuit not exceeding 32A supplying hand-held equipment?",
    options: ["0.1 seconds", "0.2 seconds", "0.4 seconds", "5.0 seconds"],
    correctAnswer: "0.2 seconds",
    explanation: "According to Table 41.1 of BS 7671 18th Edition, the maximum disconnection time for a 400V TN system final circuit not exceeding 32A supplying hand-held equipment is 0.2 seconds. This is more stringent than the standard 0.4 seconds for other fixed equipment due to the increased risk associated with hand-held equipment."
  },
  {
    id: 'level3bs767104',
    question: "Which section of BS 7671 18th Edition deals specifically with protection against thermal effects?",
    options: ["Section 410", "Section 420", "Section 430", "Section 440"],
    correctAnswer: "Section 420",
    explanation: "Section 420 of BS 7671 18th Edition specifically deals with protection against thermal effects, covering requirements for protection against fire caused by electrical equipment, protection against burns, and protection against overheating."
  },
  {
    id: 'level3bs767105',
    question: "In the 18th Edition, what is the maximum value of earth fault loop impedance (Zs) for a 16A Type B circuit breaker in a 230V system with a maximum disconnection time of 0.4 seconds?",
    options: ["1.44Ω", "1.80Ω", "2.88Ω", "3.00Ω"],
    correctAnswer: "2.88Ω",
    explanation: "For a 16A Type B circuit breaker with a 0.4 second disconnection time in a 230V system, the maximum Zs is 2.88Ω. This is calculated using Zs = Uo/Ia where Uo = 230V and Ia = 5 × 16A = 80A for a Type B device."
  },
  {
    id: 'level3bs767106',
    question: "According to BS 7671 18th Edition, which type of RCD is required for protection of socket-outlets that may supply outdoor equipment?",
    options: ["Type AC", "Type A", "Type F", "Type B"],
    correctAnswer: "Type A",
    explanation: "Regulation 722.531.2.101 requires that RCDs for protection of socket-outlets that may supply outdoor equipment must be at least Type A (responds to AC and pulsating DC fault currents), as Type AC devices may not provide adequate protection for equipment used outdoors that may include electronic components."
  },
  {
    id: 'level3bs767107',
    question: "According to the 18th Edition, what is the minimum IP rating required for an enclosure containing live parts in a location accessible to ordinary persons?",
    options: ["IP1X", "IP2X", "IP3X", "IP4X"],
    correctAnswer: "IP2X",
    explanation: "Regulation 416.2.1 requires that enclosures containing live parts in a location accessible to ordinary persons must provide a degree of protection of at least IP2X or IPXXB, meaning protection against finger contact with live parts."
  },
  {
    id: 'level3bs767108',
    question: "According to the 18th Edition, when should an Electrical Installation Condition Report (EICR) be issued instead of an Electrical Installation Certificate?",
    options: ["For all new installations", "For alterations to existing installations", "For additions to existing installations", "For periodic inspection and testing of an existing installation"],
    correctAnswer: "For periodic inspection and testing of an existing installation",
    explanation: "An Electrical Installation Condition Report (EICR) should be issued following periodic inspection and testing of an existing installation, not for new installations or alterations/additions, which would require an Electrical Installation Certificate or Minor Electrical Installation Works Certificate as appropriate."
  },
  {
    id: 'level3bs767109',
    question: "According to BS 7671 18th Edition, what is the minimum number of points that must be fed from a ring final circuit?",
    options: ["There is no minimum", "2 points", "3 points", "4 points"],
    correctAnswer: "There is no minimum",
    explanation: "BS 7671 does not specify a minimum number of points that must be fed from a ring final circuit. While ring circuits are typically used to supply multiple socket outlets, there is no regulatory minimum number of points required."
  },
  {
    id: 'level3bs767110',
    question: "BS 7671 18th Edition requires that, in locations containing a bath or shower, what is the minimum height above the floor at which a shaver supply unit conforming to BS EN 61558-2-5 may be installed in Zone 2?",
    options: ["No restriction", "1.2 metres", "1.6 metres", "2.25 metres"],
    correctAnswer: "No restriction",
    explanation: "Regulation 701.512.3 permits shaver supply units conforming to BS EN 61558-2-5 to be installed in Zone 2 without a height restriction, as these units have built-in isolation transformers providing the necessary additional protection."
  },
  {
    id: 'level3bs767111',
    question: "According to the 18th Edition, which of the following circuits in a single-family dwelling must be protected by an RCD not exceeding 30mA?",
    options: ["Only socket outlet circuits not exceeding 32A", "Only lighting circuits", "All circuits except for specific exemptions such as life safety equipment", "Only circuits supplying equipment outside the dwelling"],
    correctAnswer: "All circuits except for specific exemptions such as life safety equipment",
    explanation: "Regulation 411.3.4 of the 18th Edition requires that all final circuits in a dwelling (including lighting) must be protected by an RCD not exceeding 30mA, with specific exemptions permitted for equipment where interruption could cause greater danger (like life safety systems) or for specific non-readily accessible fixed equipment where other methods are employed."
  },
  {
    id: 'level3bs767112',
    question: "According to BS 7671 18th Edition, what is meant by the term 'skilled person (electrically)'?",
    options: ["Any person who is qualified to NVQ Level 3", "A person with sufficient qualification and experience", "Any registered electrician", "A person certified by the IET"],
    correctAnswer: "A person with sufficient qualification and experience",
    explanation: "BS 7671 defines a 'skilled person (electrically)' as a person with sufficient technical knowledge, qualification and experience to enable them to avoid the dangers which electricity may create. It is not tied to any specific qualification but rather to adequate knowledge and experience."
  },
  {
    id: 'level3bs767113',
    question: "According to BS 7671 18th Edition, which of the following is required for the design of an electrical installation?",
    options: ["Always using 2.5mm² cable for socket circuits", "Ensuring that protective measures are independent of any other measure", "All installations must have main protective bonding", "Ensuring appropriate devices are provided for isolation and switching"],
    correctAnswer: "Ensuring appropriate devices are provided for isolation and switching",
    explanation: "Regulation 132.15.202 requires that appropriate devices shall be provided for isolation and switching for the installation, circuits or individual items of equipment as required for operation, maintenance, fault detection, emergency switching and functional switching. This is a fundamental design requirement."
  },
  {
    id: 'level3bs767114',
    question: "In BS 7671 18th Edition, what is the minimum value of the insulation resistance between live conductors and the protective conductor connected to the earthing arrangement for a 230V circuit?",
    options: ["0.25 MΩ", "0.5 MΩ", "1.0 MΩ", "2.0 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "According to Table 61 in BS 7671, for circuits with a nominal voltage up to 500V (including 230V), the minimum insulation resistance between live conductors and the protective conductor connected to the earthing arrangement must be 1.0 MΩ when tested at 500V DC."
  },
  {
    id: 'level3bs767115',
    question: "BS 7671 18th Edition requires that devices for fault protection shall operate at values of fault current less than or equal to what?",
    options: ["The design current of the circuit", "The rated current of the protective device", "The prospective fault current", "The rated residual operating current of an RCD"],
    correctAnswer: "The prospective fault current",
    explanation: "Regulation 434.5.1 requires that protective devices shall be capable of breaking any fault current up to and including the prospective fault current at the point where the device is installed. This ensures the device can safely clear any fault that might occur in the protected circuit."
  },
  {
    id: 'level3bs767116',
    question: "According to BS 7671 18th Edition, in a TT system with an RCD for fault protection, what is the maximum permitted value of earth electrode resistance (RA) if a 300mA RCD is used?",
    options: ["167Ω", "83Ω", "40Ω", "5Ω"],
    correctAnswer: "167Ω",
    explanation: "In a TT system with an RCD, the maximum permitted value of RA is calculated using RA × IΔn ≤ 50V. For a 300mA RCD, RA ≤ 50V/0.3A = 167Ω. This ensures that the touch voltage under earth fault conditions does not exceed the conventional maximum safe touch voltage of 50V."
  },
  {
    id: 'level3bs767117',
    question: "BS 7671 18th Edition specifies that protection by obstacles is only permitted in installations that are:",
    options: ["Accessible to ordinary persons", "Accessible to skilled persons only", "Accessible to instructed persons only", "Accessible to skilled or instructed persons only"],
    correctAnswer: "Accessible to skilled or instructed persons only",
    explanation: "Regulation 417.2.1 specifies that protection by obstacles is only permitted in installations restricted to access by skilled persons (electrically) or instructed persons (electrically). It is not permitted in installations accessible to ordinary persons due to its limited protective capability."
  },
  {
    id: 'level3bs767118',
    question: "According to BS 7671 18th Edition, what is the maximum permitted voltage drop from the origin of an installation to the current-using equipment under normal service conditions?",
    options: ["2.5% of the nominal voltage", "3% of the nominal voltage", "4% of the nominal voltage", "5% of the nominal voltage"],
    correctAnswer: "3% of the nominal voltage",
    explanation: "Appendix 4 of BS 7671 recommends that the voltage drop from the origin of the installation to the current-using equipment should not exceed 3% of the nominal voltage for lighting and 5% for other uses. For lighting, this is the more stringent requirement at 3%."
  },
  {
    id: 'level3bs767119',
    question: "In BS 7671 18th Edition, which method of shock protection would be classified as a recognized exception to the requirements for automatic disconnection of supply?",
    options: ["Use of RCDs", "Double insulation", "Protection by earth-free local equipotential bonding", "Use of metal conduit"],
    correctAnswer: "Protection by earth-free local equipotential bonding",
    explanation: "Regulation 411.3.2.5 recognizes protection by earth-free local equipotential bonding as one of the exceptions to the requirements for automatic disconnection of supply. This method does not rely on disconnection but creates a zone where no dangerous potential differences can exist."
  },
  {
    id: 'level3bs767120',
    question: "According to BS 7671 18th Edition, what additional requirement applies to socket outlets in consumer units and distribution boards intended for use by ordinary persons?",
    options: ["They must be RCD protected", "They must be located within the consumer unit enclosure", "Socket outlets shall not be incorporated", "They must be of industrial specification"],
    correctAnswer: "Socket outlets shall not be incorporated",
    explanation: "Regulation 553.1.100 specifies that consumer units and distribution boards intended for use by ordinary persons shall not incorporate socket outlets. This is to prevent unqualified persons from using power directly from these enclosures, which could present safety risks."
  },
  {
    id: 'level3bs767121',
    question: "According to BS 7671 18th Edition, what is the maximum nominal current for reduced low voltage systems?",
    options: ["16A", "20A", "32A", "63A"],
    correctAnswer: "63A",
    explanation: "Regulation 411.8.3 states that reduced low voltage systems shall not exceed 63A nominal current. This applies to SELV, PELV, and other reduced voltage systems designed to provide increased protection against electric shock."
  },
  {
    id: 'level3bs767122',
    question: "BS 7671 18th Edition includes a specific requirement for fire protection where wiring systems pass through elements of building construction. What should be restored after installation?",
    options: ["Only the aesthetics of the building", "Only the structural integrity", "Only the waterproofing", "The fire rating of the construction element"],
    correctAnswer: "The fire rating of the construction element",
    explanation: "Regulation 527.2.1 requires that where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance of the element concerned."
  },
  {
    id: 'level3bs767123',
    question: "According to BS 7671 18th Edition, which of the following requires protection by a 30mA RCD in a household unattended sauna?",
    options: ["Only the heating circuits", "All circuits within the sauna", "Only lighting circuits", "No RCD protection is required"],
    correctAnswer: "All circuits within the sauna",
    explanation: "Regulation 703.411.3.3 requires that for household unattended saunas, additional protection shall be provided for all circuits of the sauna by the use of one or more RCDs having a rated residual operating current not exceeding 30mA."
  },
  {
    id: 'level3bs767124',
    question: "According to BS 7671 18th Edition, when can a protective conductor have a cross-sectional area less than 16mm² copper without calculation?",
    options: ["When it forms part of a multicore cable", "When it is protected against mechanical damage", "When it is buried in the ground", "When it supplies fixed equipment only"],
    correctAnswer: "When it forms part of a multicore cable",
    explanation: "Regulation 543.1.1 states that where a protective conductor forms part of a multicore cable, its cross-sectional area can be determined without calculation using the simplifications in Table 54.7. Otherwise, for separate protective conductors less than 16mm² copper, calculation using the adiabatic equation or verification by tables is required."
  },
  {
    id: 'level3bs767125',
    question: "BS 7671 18th Edition requires that where PME conditions apply, what special consideration must be given to the installation of a socket outlet intended to supply mobile equipment for use outdoors?",
    options: ["The socket outlet must have at least IP44 rating", "The circuit must be protected by a 30mA RCD", "Special earthing arrangements are required", "The socket outlet must be lockable"],
    correctAnswer: "Special earthing arrangements are required",
    explanation: "Regulation 411.4.3 requires that where a PME earthing facility is used, due consideration shall be given to the installed protective conductor from the PME terminal back to the source to minimize the risk of a break. For outdoor socket outlets under PME, this often requires special earthing arrangements such as a local electrode or alternative protection."
  },
  {
    id: 'level3bs767126',
    question: "According to BS 7671 18th Edition, what is the required designation for a cable laid in an area with rodent infestation?",
    options: ["No special requirement", "Only armoured cables", "Cables with additional mechanical protection or suitable for the environment (AG2)", "Only mineral insulated cables"],
    correctAnswer: "Cables with additional mechanical protection or suitable for the environment (AG2)",
    explanation: "According to Table 51 of BS 7671, an area with rodent infestation is classified as AG2 (medium severity). Regulation 522.10.2 requires that cables in such areas shall either have additional mechanical protection or be selected to be suitable for this environment, such as armoured cables or installation in metal conduit."
  },
  {
    id: 'level3bs767127',
    question: "According to BS 7671 18th Edition, what is the maximum permitted operating temperature for PVC insulated cables (70°C thermoplastic) under normal load conditions?",
    options: ["60°C", "70°C", "90°C", "105°C"],
    correctAnswer: "70°C",
    explanation: "According to Table 4A2 of BS 7671, the maximum permitted operating temperature for PVC insulated cables (70°C thermoplastic) under normal load conditions is 70°C. This ensures the insulation maintains its integrity and electrical properties during operation."
  },
  {
    id: 'level3bs767128',
    question: "According to BS 7671 18th Edition, what is the minimum voltage rating for cables used in low voltage installations (e.g., 230/400V)?",
    options: ["300/300V", "300/500V", "450/750V", "600/1000V"],
    correctAnswer: "450/750V",
    explanation: "For fixed cables in low voltage installations (e.g., 230/400V), the minimum voltage rating is generally 450/750V according to BS 7671. This provides adequate insulation strength for the operating voltage with a suitable safety margin."
  },
  {
    id: 'level3bs767129',
    question: "Under BS 7671 18th Edition, what is the minimum cross-sectional area permitted for flexible cables having more than 4 cores?",
    options: ["0.1mm²", "0.5mm²", "0.75mm²", "1.0mm²"],
    correctAnswer: "0.75mm²",
    explanation: "According to Regulation 524.2, flexible cables with more than 4 cores shall have conductors with a minimum cross-sectional area of 0.75mm². This ensures adequate mechanical strength and current-carrying capacity for these cables."
  },
  {
    id: 'level3bs767130',
    question: "According to BS 7671 18th Edition, what is the minimum degree of protection required for an enclosure containing switching equipment accessible to ordinary persons in a construction site?",
    options: ["IP2X", "IP44", "IPXXB", "IP33"],
    correctAnswer: "IP44",
    explanation: "Regulation 704.522.3.1 requires that equipment on construction sites accessible to ordinary persons shall have a degree of protection of at least IP44. This protects against solid objects over 1mm and splashing water from any direction, appropriate for the construction environment."
  },
  {
    id: 'level3bs767131',
    question: "Under BS 7671 18th Edition, where AFDDs (Arc Fault Detection Devices) are installed, what must be recorded on completion?",
    options: ["Only the location", "Only the serial number", "Only the type", "The location and specific details of the AFDD protection"],
    correctAnswer: "The location and specific details of the AFDD protection",
    explanation: "Regulation 421.1.7 requires that where AFDDs are installed, details of their location and the circuits protected shall be recorded in the appropriate schedule of the electrical installation certificate or condition report. This allows proper maintenance and verification during future inspections."
  },
  {
    id: 'level3bs767132',
    question: "BS 7671 18th Edition requires that emergency lighting circuits shall be supplied using what type of wiring system?",
    options: ["Standard non-flame propagating PVC cable", "Fire-resistant cables where required to operate in a fire", "Mineral insulated cables only", "Any cable with mechanical protection"],
    correctAnswer: "Fire-resistant cables where required to operate in a fire",
    explanation: "Regulation 560.8.1 requires that safety services that need to operate during a fire (which includes emergency lighting) shall be provided with fire-resistant cables meeting the relevant standards, ensuring continued operation during fire conditions for the required duration."
  },
  {
    id: 'level3bs767133',
    question: "According to BS 7671 18th Edition, which of the following is a recognized protective measure for an installation or location with increased risk?",
    options: ["Basic protection only", "Class II equipment only", "SELV (Safety Extra-Low Voltage)", "Class 0 equipment"],
    correctAnswer: "SELV (Safety Extra-Low Voltage)",
    explanation: "Regulation 410.3.3 recognizes SELV as an appropriate protective measure for installations or locations with increased risk. By limiting the voltage to extra-low levels and providing separation from other circuits, SELV offers enhanced protection against electric shock."
  },
  {
    id: 'level3bs767134',
    question: "BS 7671 18th Edition requires a specific symbol on the installation documentation when surge protection measures have been installed. What is this to indicate?",
    options: ["The location of the SPDs", "The type of SPDs installed", "The level of protection provided by the SPDs (e.g., Type 1, 2, or 3)", "The AQ level (lightning protection level) for which protection measures for the electrical installation have been designed"],
    correctAnswer: "The AQ level (lightning protection level) for which protection measures for the electrical installation have been designed",
    explanation: "Regulation 443.4.2 requires that where protection measures against transient overvoltages are provided, the AQ level (lightning protection level) for which the protective measures for the electrical installation have been designed shall be indicated on or adjacent to the electrical installation certificate."
  },
  {
    id: 'level3bs767135',
    question: "According to BS 7671 18th Edition, in a location containing a bath or shower, where a 30mA RCD is used for fault protection with overcurrent protection, what maximum value is permitted for Zs to ensure disconnection within 0.4 seconds for a 230V circuit protected by a 40A Type B MCB?",
    options: ["0.53Ω", "1.15Ω", "1.44Ω", "1.84Ω"],
    correctAnswer: "1.15Ω",
    explanation: "For a 40A Type B MCB in a 230V circuit, we first calculate the current needed for a 0.4s disconnection: Ia = 5 × 40A = 200A. The maximum earth fault loop impedance is then calculated as Zs = Uo/Ia = 230V/200A = 1.15Ω. This ensures the automatic disconnection of supply within the required time."
  },
  {
    id: 'level3bs767136',
    question: "BS 7671 18th Edition specifies that the electrical installation of a mobile or transportable unit shall be inspected and tested after each time the unit is connected on a new site. What is the maximum interval permitted between such inspections?",
    options: ["1 year", "2 years", "3 months", "No maximum is specified if it remains on the same site"],
    correctAnswer: "1 year",
    explanation: "Regulation 717.514 requires that the electrical installation of a mobile or transportable unit shall be inspected and tested after connection on a new site, and at least once a year. This ensures regular verification of safety regardless of whether the unit is relocated."
  },
  {
    id: 'level3bs767137',
    question: "According to BS 7671 18th Edition, what is the required condition for a protective conductor for supplementary bonding in locations containing a bath or shower?",
    options: ["It must always be covered with green/yellow insulation", "It must be copper and at least 4mm² if not mechanically protected", "It must be at least 10mm² regardless of mechanical protection", "It must only connect to the earth terminal of the distribution board"],
    correctAnswer: "It must be copper and at least 4mm² if not mechanically protected",
    explanation: "Regulation 701.415.2 requires that for supplementary bonding in bathrooms, if the conductor is not mechanically protected or incorporated in a cable, it shall be copper and have a minimum cross-sectional area of 4mm². This ensures adequate mechanical strength and current-carrying capacity."
  },
  {
    id: 'level3bs767138',
    question: "BS 7671 18th Edition requires certain precautions when electrical equipment is installed in locations with increased fire risk. Which of the following is NOT one of these required precautions?",
    options: ["Limiting the temperature of exposed parts of equipment", "Installing RCDs with a rated residual operating current not exceeding 300mA", "Insulating combustible construction elements from electrical equipment that may produce high temperatures", "Using only Class II equipment"],
    correctAnswer: "Using only Class II equipment",
    explanation: "Regulation 422.3 outlines various precautions for locations with fire risk, including limiting surface temperatures, installing RCDs and insulating combustible materials from hot equipment. However, using only Class II equipment is not specifically required, as this relates to shock protection rather than fire protection."
  },
  {
    id: 'level3bs767139',
    question: "According to BS 7671 18th Edition, what is specifically required for circuits supplying electric vehicle charging equipment?",
    options: ["They must be on a separate distribution board", "They must be protected by a Type B RCD in all cases", "Each charging point must be supplied by an individual final circuit", "They must be supplied by overhead systems only"],
    correctAnswer: "Each charging point must be supplied by an individual final circuit",
    explanation: "Regulation 722.531.2.1.1 requires that each connection point shall be supplied by an individual final circuit protected by an overcurrent protective device and appropriate RCD protection. This individualizes protection and prevents multiple charging points being affected by a single fault."
  },
  {
    id: 'level3bs767140',
    question: "BS 7671 18th Edition requires specific marking for wiring in escape routes. What colour must be used for identification of wiring for safety services?",
    options: ["Red", "Orange", "Yellow", "Green"],
    correctAnswer: "Orange",
    explanation: "Regulation 560.7.10 requires that wiring systems for safety services (e.g., emergency lighting, fire alarms) shall be identifiable. Appendix 7 indicates that orange is the colour designated for safety services, allowing quick identification during emergency situations or maintenance."
  },
  {
    id: 'level3bs767141',
    question: "According to BS 7671 18th Edition, where cables are buried in soil at a depth less than 0.45m, what additional protection is required?",
    options: ["No additional protection is required", "A warning tape", "Cable tiles or suitable mechanical protection", "Only armoured cables may be used"],
    correctAnswer: "Cable tiles or suitable mechanical protection",
    explanation: "Regulation 522.8.10 requires that where cables are buried at a depth less than 0.45m, they shall be provided with additional protection (e.g., cable tiles, ducts) against mechanical damage. This is to protect against damage from shallow digging operations."
  },
  {
    id: 'level3bs767142',
    question: "Under BS 7671 18th Edition, in installations where protecting against the effects of undervoltage is needed, what delay is permitted in the operation of the undervoltage protective device?",
    options: ["No delay is permitted", "A delay is permitted if the nature of the equipment allows safe restart", "A fixed 5-second delay is required", "Only momentary delays of less than 0.5 seconds are permitted"],
    correctAnswer: "A delay is permitted if the nature of the equipment allows safe restart",
    explanation: "Regulation 445.1.1 permits a delay in the operation of the undervoltage protective device if the operation of the equipment allows a safe restart. This balances protection against nuisance tripping due to brief voltage dips while maintaining safety."
  },
  {
    id: 'level3bs767143',
    question: "BS 7671 18th Edition requires that socket outlets in a household unattended sauna be installed at a minimum height above floor level. What is this minimum height?",
    options: ["0.8m", "1.0m", "1.7m", "2.25m"],
    correctAnswer: "1.0m",
    explanation: "Regulation 703.512.2 requires that socket outlets shall be installed at a height of at least 1m above the floor in household unattended saunas. This requirement is intended to minimize the risk of water ingress into socket outlets from cleaning or condensation."
  },
  {
    id: 'level3bs767144',
    question: "According to BS 7671 18th Edition, what defines an 'Ordinary Person' in terms of electrical safety?",
    options: ["A person without electrical qualification but with basic knowledge", "A person who is neither skilled nor instructed", "A person who has been instructed in electrical safety", "Any person who is not a qualified electrician"],
    correctAnswer: "A person who is neither skilled nor instructed",
    explanation: "BS 7671 defines an 'Ordinary Person' as a person who is neither skilled nor instructed in electrical matters. This definition is important for determining appropriate protective measures, as ordinary persons require higher levels of protection due to their lack of electrical knowledge."
  },
  {
    id: 'level3bs767145',
    question: "BS 7671 18th Edition requires that cables concealed in a wall or partition at a depth of less than 50mm from the surface must have additional protection or follow specific installation methods. What protection characteristic must be provided for this scenario?",
    options: ["30mA RCD protection only", "Additional mechanical protection", "The appropriate level of protection (i.e., RCD or mechanical protection)", "A warning tape placed above the cable"],
    correctAnswer: "The appropriate level of protection (i.e., RCD or mechanical protection)",
    explanation: "Regulation 522.6.202 requires that cables concealed at a depth less than 50mm must either have 30mA RCD protection, be installed within earthed metallic covering, be mechanically protected against penetration by nails etc., or be run in prescribed 'safe zones'. The appropriate method depends on the specific situation."
  },
  {
    id: 'level3bs767146',
    question: "According to BS 7671 18th Edition, what is the maximum permitted voltage for a SELV circuit?",
    options: ["12V AC / 30V DC", "25V AC / 60V DC", "50V AC / 120V DC", "110V AC / 230V DC"],
    correctAnswer: "50V AC / 120V DC",
    explanation: "Regulation 414.3.1 defines SELV (Safety Extra-Low Voltage) as not exceeding 50V AC or 120V ripple-free DC between conductors or between any conductor and earth. These voltage limits are considered safe even in direct contact situations."
  },
  {
    id: 'level3bs767147',
    question: "BS 7671 18th Edition imposes specific requirements for electrical installations in agricultural premises. What special requirement applies to socket outlets in these locations?",
    options: ["They must all be IP56 rated", "They must all have isolating transformers", "They must be at least 1.5m above the floor", "They must incorporate a residual current device not exceeding 30mA"],
    correctAnswer: "They must incorporate a residual current device not exceeding 30mA",
    explanation: "Regulation 705.411.1 requires that in agricultural premises, additional protection by an RCD with a rated residual operating current not exceeding 30mA shall be provided for all socket outlets. This is due to the increased risks in these environments from moisture, dust, and animals."
  },
  {
    id: 'level3bs767148',
    question: "According to BS 7671 18th Edition, which type of circuit always requires mechanical protection when installed in locations with risk of mechanical damage (AG3)?",
    options: ["Only lighting circuits", "Only power circuits", "Safety circuits", "All data circuits"],
    correctAnswer: "Safety circuits",
    explanation: "Regulation 522.6.1 requires that in locations with risk of mechanical damage (AG3), safety circuits (emergency lighting, alarm systems, etc.) must always have appropriate mechanical protection, regardless of whether they would otherwise qualify for any of the exceptions available to standard circuits."
  },
  {
    id: 'level3bs767149',
    question: "Under BS 7671 18th Edition, what is the maximum current rating permitted for an industrial plug and socket-outlet to standard BS EN 60309-2?",
    options: ["32A", "63A", "125A", "800A"],
    correctAnswer: "125A",
    explanation: "According to BS 7671 (referencing BS EN 60309-2), the maximum current rating for a standardized industrial plug and socket-outlet is 125A. Above this rating, other connection methods must be used due to the physical handling limitations and safety concerns with larger current-carrying connectors."
  },
  {
    id: 'level3bs767150',
    question: "According to BS 7671 18th Edition, which of the following is a permitted exception to the requirement for all socket outlets in a dwelling to have 30mA RCD protection?",
    options: ["Sockets located more than 2.5m above floor level", "A specific labelled socket outlet for a particular appliance, where a documented risk assessment indicates that RCD protection is not necessary", "All sockets in utility rooms", "Sockets on dedicated ring circuits"],
    correctAnswer: "A specific labelled socket outlet for a particular appliance, where a documented risk assessment indicates that RCD protection is not necessary",
    explanation: "Regulation 411.3.3 allows an exception where, in a dwelling, a specific labelled socket-outlet is for connection of a particular item of equipment, and a documented risk assessment determines that RCD protection is not necessary. This might apply to refrigerators or freezers where nuisance tripping could cause food spoilage."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-bs7671', 'items', q.id), {
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
