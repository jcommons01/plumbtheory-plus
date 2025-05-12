// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3InstallationDesign.ts

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

// ✅ Level 3 Installation Design Questions
const questions = [
  {
    id: 'level3installdesign1',
    question: "When calculating the maximum demand for a commercial installation, which of the following must be considered?",
    options: ["Only the maximum load of each circuit", "Only the total connected load", "The total connected load with diversity factors applied", "The sum of all circuit breaker ratings"],
    correctAnswer: "The total connected load with diversity factors applied",
    explanation: "Maximum demand calculations must consider the total connected load with appropriate diversity factors applied, as specified in BS 7671, to account for the fact that not all equipment will operate simultaneously at full load."
  },
  {
    id: 'level3installdesign2',
    question: "What is the primary consideration when determining the location of the main distribution board in a large commercial building?",
    options: ["Proximity to the incoming supply", "Aesthetic appearance", "Easy access for unqualified persons", "Lowest cost location"],
    correctAnswer: "Proximity to the incoming supply",
    explanation: "The main distribution board should ideally be located as close as possible to the incoming supply to minimize voltage drop and cable costs, while also considering accessibility for maintenance and emergency access."
  },
  {
    id: 'level3installdesign3',
    question: "What is the advantage of a TN-S earthing system over a TN-C-S system?",
    options: ["Lower installation cost", "No need for circuit protective conductors", "Elimination of the risk of neutral conductor faults affecting the protective conductor", "Reduced earthing requirements"],
    correctAnswer: "Elimination of the risk of neutral conductor faults affecting the protective conductor",
    explanation: "A TN-S system has separate neutral and protective conductors throughout, eliminating the risk that a broken neutral conductor (which can occur in TN-C-S systems where PEN conductors are used) will affect the operation of the protective conductor."
  },
  {
    id: 'level3installdesign4',
    question: "What is the maximum recommended voltage drop for a low voltage installation from the origin to the furthest point of utilization according to BS 7671?",
    options: ["2%", "3%", "4%", "5%"],
    correctAnswer: "4%",
    explanation: "BS 7671 recommends that the maximum voltage drop from the origin of the installation to any final circuit should not exceed 4% of the nominal voltage for a low voltage installation (i.e., 9.2V for a 230V supply)."
  },
  {
    id: 'level3installdesign5',
    question: "When designing an installation for a data center, which of the following power supply arrangements would provide the highest level of resilience?",
    options: ["Dual redundant UPS systems with separate distribution paths", "Single large UPS with maintenance bypass", "Generator backup only", "Multiple small UPS units connected in parallel"],
    correctAnswer: "Dual redundant UPS systems with separate distribution paths",
    explanation: "Dual redundant UPS systems with separate distribution paths (often referred to as 2N configuration) provides the highest level of resilience for critical facilities like data centers, ensuring power availability even during maintenance or component failure."
  },
  {
    id: 'level3installdesign6',
    question: "What special consideration must be made when designing an electrical installation in a medical location classified as Group 2 according to BS 7671 Section 710?",
    options: ["Using only plastic enclosures", "Providing an isolated power supply (medical IT system) for critical equipment", "Using only three-phase supplies", "Installing all wiring at high level"],
    correctAnswer: "Providing an isolated power supply (medical IT system) for critical equipment",
    explanation: "Group 2 medical locations (e.g., operating theaters) require an isolated power supply (medical IT system) with insulation monitoring to prevent the first fault from causing an interruption to the power supply to critical life-supporting equipment."
  },
  {
    id: 'level3installdesign7',
    question: "What is a key feature of a busbar trunking distribution system compared to traditional cable distribution?",
    options: ["Lower installation cost in all cases", "Ability to add or relocate tap-off units without de-energizing the system", "Reduced fire risk", "Lower current ratings"],
    correctAnswer: "Ability to add or relocate tap-off units without de-energizing the system",
    explanation: "Busbar trunking systems allow flexibility by enabling the addition or relocation of tap-off units without de-energizing the entire system, making them ideal for installations where load positions may change, such as industrial facilities or retail spaces."
  },
  {
    id: 'level3installdesign8',
    question: "When designing an electrical installation for a Zone 1 hazardous area, which protection concept is acceptable?",
    options: ["Non-sparking (Ex n)", "Increased safety (Ex e)", "Simple apparatus", "General industrial equipment"],
    correctAnswer: "Increased safety (Ex e)",
    explanation: "For Zone 1 hazardous areas, where an explosive atmosphere is likely to occur in normal operation, equipment with protection concept 'increased safety' (Ex e) is acceptable, as it is designed to prevent the possibility of excessive temperatures and the occurrence of arcs or sparks."
  },
  {
    id: 'level3installdesign9',
    question: "Which of the following is a key factor in determining the prospective short-circuit current at a distribution board?",
    options: ["The rating of the largest circuit breaker", "The impedance of the supply transformer and distribution cables", "The total connected load", "The operating voltage"],
    correctAnswer: "The impedance of the supply transformer and distribution cables",
    explanation: "The prospective short-circuit current at a distribution board is primarily determined by the impedance of the supply transformer and the impedance of the distribution cables from the supply to the point of installation."
  },
  {
    id: 'level3installdesign10',
    question: "When designing a power distribution system with harmonic-generating loads, what specific issue must be addressed regarding the neutral conductor?",
    options: ["The neutral can be sized smaller than the phase conductors", "The neutral can be shared between circuits to save cost", "The neutral may need to be oversized to handle triplen harmonics", "The neutral requires less insulation than phase conductors"],
    correctAnswer: "The neutral may need to be oversized to handle triplen harmonics",
    explanation: "With harmonic-generating loads, particularly those producing triplen harmonics (3rd, 9th, 15th, etc.), the neutral conductor may need to be oversized because these harmonics add in the neutral rather than cancelling, potentially causing the neutral current to exceed the phase current."
  },
  {
    id: 'level3installdesign11',
    question: "What is the purpose of a discriminating RCD arrangement in a distribution system?",
    options: ["To provide multiple independent earth paths", "To achieve selective operation where the RCD closest to the fault operates first", "To reduce the sensitivity of the RCD protection", "To comply with special location requirements only"],
    correctAnswer: "To achieve selective operation where the RCD closest to the fault operates first",
    explanation: "A discriminating (or selective) RCD arrangement ensures that in the event of a fault, the RCD closest to the fault operates first, minimizing disruption to other circuits and making fault location easier. This is typically achieved using time-delayed RCDs upstream and instantaneous RCDs downstream."
  },
  {
    id: 'level3installdesign12',
    question: "Which of the following best describes the 'design current' (Ib) of a circuit?",
    options: ["The rating of the protective device", "The current-carrying capacity of the cable", "The total connected load divided by the supply voltage", "The current intended to be carried by the circuit under normal conditions"],
    correctAnswer: "The current intended to be carried by the circuit under normal conditions",
    explanation: "The design current (Ib) is the current intended to be carried by the circuit under normal conditions, calculated based on the power requirements of the connected load, taking into account power factor and diversity factors where applicable."
  },
  {
    id: 'level3installdesign13',
    question: "When designing a high-integrity earthing system for an installation supplied at 11kV, what is the maximum permitted earth electrode resistance according to ENA recommendations?",
    options: ["1 ohm", "2 ohms", "5 ohms", "10 ohms"],
    correctAnswer: "1 ohm",
    explanation: "For high voltage installations (such as 11kV), Energy Networks Association (ENA) recommendations typically specify a maximum earth electrode resistance of 1 ohm to ensure effective operation of protective devices and minimize touch and step potentials."
  },
  {
    id: 'level3installdesign14',
    question: "Which factor would most significantly affect the choice between armoured cables and a conduit/trunking system in a commercial installation?",
    options: ["Cable size only", "Installation flexibility and future modifications", "Cable colour", "Ambient temperature only"],
    correctAnswer: "Installation flexibility and future modifications",
    explanation: "The choice between armoured cables and conduit/trunking systems is significantly influenced by the need for installation flexibility and future modifications. Conduit and trunking systems generally offer greater flexibility for future changes, while armoured cables may be more suitable for fixed installations with limited future expansion."
  },
  {
    id: 'level3installdesign15',
    question: "When calculating the size of a power factor correction capacitor bank, what information is essential?",
    options: ["Only the total connected load", "The existing power factor and the desired power factor", "Only the maximum demand", "Only the supply voltage"],
    correctAnswer: "The existing power factor and the desired power factor",
    explanation: "To size a power factor correction capacitor bank, it is essential to know both the existing power factor (typically measured) and the desired power factor (typically 0.95-0.98), along with the maximum demand or apparent power of the installation."
  },
  {
    id: 'level3installdesign16',
    question: "What is the primary reason for segregating different categories of cables in trunking systems according to BS 7671?",
    options: ["To improve appearance", "To satisfy the client's preferences", "To prevent electromagnetic interference between systems", "To reduce installation costs"],
    correctAnswer: "To prevent electromagnetic interference between systems",
    explanation: "BS 7671 requires segregation of different categories of cables (such as power, data, and control) in trunking to prevent electromagnetic interference, which could affect signal integrity and potentially cause malfunctions or data errors."
  },
  {
    id: 'level3installdesign17',
    question: "In a large installation, what is the purpose of providing multiple distribution boards rather than a single larger board?",
    options: ["Only to reduce cable costs", "Only to make the installation look more complex", "To improve discrimination, reduce fault levels, and minimize the effects of a fault", "Only to satisfy regulatory requirements"],
    correctAnswer: "To improve discrimination, reduce fault levels, and minimize the effects of a fault",
    explanation: "Using multiple distribution boards in large installations improves discrimination (selective operation of protective devices), reduces fault levels at final circuits, minimizes the effects of a fault (limiting disruption to specific areas), and typically reduces cable sizes and costs for final circuits."
  },
  {
    id: 'level3installdesign18',
    question: "What type of metering arrangement would be most appropriate for a multi-tenant commercial building where each tenant is separately billed for electricity?",
    options: ["A single meter for the entire building", "Multiple meters located within each tenant's space", "Sub-metering with a main meter for billing", "Multi-function CT-operated meters at a central location"],
    correctAnswer: "Multi-function CT-operated meters at a central location",
    explanation: "For multi-tenant commercial buildings with separate billing, multi-function CT-operated meters at a central location (often in a dedicated meter room) provide accurate billing, easy reading access without disturbing tenants, and advanced features like remote reading and power quality monitoring."
  },
  {
    id: 'level3installdesign19',
    question: "When designing an electrical installation for an industrial bakery, which of the following areas would be classified as a special location requiring additional protection?",
    options: ["General office areas", "Staff canteen", "Flour storage and handling areas (potentially explosive dust atmosphere)", "External car park"],
    correctAnswer: "Flour storage and handling areas (potentially explosive dust atmosphere)",
    explanation: "Flour storage and handling areas in bakeries must be treated as potentially explosive dust atmospheres (ATEX classified areas), requiring specially designed electrical equipment and installation techniques to prevent ignition risks."
  },
  {
    id: 'level3installdesign20',
    question: "What is the primary consideration when selecting protective devices for an installation with high harmonic content?",
    options: ["Only the nominal current rating", "True RMS current measurement capability", "Operating time only", "Physical size of the device"],
    correctAnswer: "True RMS current measurement capability",
    explanation: "For installations with high harmonic content, protective devices must have true RMS current measurement capability, as average-sensing devices may not accurately respond to distorted waveforms, potentially leading to nuisance tripping or failure to trip when required."
  },
  {
    id: 'level3installdesign21',
    question: "What is the key advantage of installing a combined Type 1+2 surge protective device (SPD) rather than separate devices?",
    options: ["Lower cost in all cases", "Simplified coordination and reduced voltage protection level", "Higher maximum discharge current", "Reduced physical space only"],
    correctAnswer: "Simplified coordination and reduced voltage protection level",
    explanation: "Combined Type 1+2 SPDs offer simplified coordination (eliminating the need to calculate separation distances between separate devices) and typically provide a lower overall voltage protection level, enhancing protection for sensitive equipment."
  },
  {
    id: 'level3installdesign22',
    question: "Which method provides the most accurate assessment of cable sizing for motor circuits with frequent starting?",
    options: ["Using standard tabulated current values", "Using the motor nameplate full load current", "Calculation based on starting current and thermal capacity of cables", "Using minimum cable size based on device rating"],
    correctAnswer: "Calculation based on starting current and thermal capacity of cables",
    explanation: "For motor circuits with frequent starting, cable sizing should be based on detailed calculations considering the starting current, starting frequency, and thermal capacity (time/current characteristics) of the cables to prevent premature aging due to thermal stress."
  },
  {
    id: 'level3installdesign23',
    question: "When designing electrical distribution for a critical system requiring high availability, which busbar arrangement provides the highest level of resilience?",
    options: ["Single busbar", "Single busbar with bus section", "Double busbar", "Ring busbar"],
    correctAnswer: "Double busbar",
    explanation: "A double busbar arrangement provides the highest level of resilience as it allows for complete isolation of one busbar for maintenance while maintaining supply through the second busbar, and provides better segregation of faults."
  },
  {
    id: 'level3installdesign24',
    question: "What is the primary consideration when locating sub-distribution boards in a multi-story commercial building?",
    options: ["Only the lowest installation cost", "Positioning at load centers to minimize cable runs", "Only the aesthetic appearance", "Only the preference of the building owner"],
    correctAnswer: "Positioning at load centers to minimize cable runs",
    explanation: "Sub-distribution boards should ideally be positioned at load centers to minimize cable runs, reducing voltage drop, power losses, and material costs, while also considering accessibility for maintenance and emergency access."
  },
  {
    id: 'level3installdesign25',
    question: "Which of the following protection methods is most appropriate for an electrical installation in a location with high risk of mechanical damage?",
    options: ["Standard PVC conduit", "Heavy-duty galvanized steel conduit", "Surface mounted trunking", "Flat twin and earth cable clipped directly"],
    correctAnswer: "Heavy-duty galvanized steel conduit",
    explanation: "Heavy-duty galvanized steel conduit provides superior protection against mechanical damage and is therefore the most appropriate choice for installations in areas with high risk of impact or other mechanical damage."
  },
  {
    id: 'level3installdesign26',
    question: "When designing the wiring system for final circuits in a data center, what is the primary reason for using raised access flooring?",
    options: ["Only to improve appearance", "Only to reduce cable lengths", "To provide flexible cable management while maintaining cooling efficiency", "Only to satisfy client preference"],
    correctAnswer: "To provide flexible cable management while maintaining cooling efficiency",
    explanation: "Raised access flooring in data centers provides flexible cable management for frequent changes, while also facilitating the efficient distribution of cooling air to IT equipment, which is critical for maintaining operating temperatures."
  },
  {
    id: 'level3installdesign27',
    question: "What is the primary consideration when determining the cross-sectional area of a main equipotential bonding conductor?",
    options: ["It must always be the same as the main earthing conductor", "It must be calculated based on the supply neutral conductor", "It is determined by the consumer unit rating", "It can be any size as long as it is insulated"],
    correctAnswer: "It must be calculated based on the supply neutral conductor",
    explanation: "According to BS 7671, the cross-sectional area of a main equipotential bonding conductor is determined in relation to the supply neutral conductor, with a minimum size of 6mm² and typically half the cross-sectional area of the supply neutral (but no larger than 25mm²)."
  },
  {
    id: 'level3installdesign28',
    question: "When designing an electrical installation for a temporary structure (such as an exhibition stand), what is a key requirement according to BS 7671 Section 717?",
    options: ["All circuits must use armoured cable", "Protection by automatic disconnection of supply must operate within 0.2 seconds", "All cables must be installed in conduit", "Only 3-phase supplies can be used"],
    correctAnswer: "Protection by automatic disconnection of supply must operate within 0.2 seconds",
    explanation: "BS 7671 Section 717 covering temporary structures requires that for final circuits not exceeding 32A, the disconnection time for fault protection shall not exceed 0.2 seconds, which is more stringent than the standard 0.4 seconds for normal installations."
  },
  {
    id: 'level3installdesign29',
    question: "Which of the following is the most critical factor when selecting distribution equipment for a dusty industrial environment?",
    options: ["Colour of enclosures", "IP rating of enclosures", "Brand of equipment", "Country of manufacture"],
    correctAnswer: "IP rating of enclosures",
    explanation: "The IP (Ingress Protection) rating is the most critical factor when selecting distribution equipment for dusty environments, as it defines the degree of protection against solid particles. For dusty environments, a minimum of IP5X (dust protected) or IP6X (dust tight) would typically be required."
  },
  {
    id: 'level3installdesign30',
    question: "What is the primary purpose of providing discrimination (selectivity) between overcurrent protective devices in a distribution system?",
    options: ["To reduce the cost of protective devices", "To ensure that only the protective device closest to a fault operates", "To increase the fault level capacity", "To reduce the size of cables required"],
    correctAnswer: "To ensure that only the protective device closest to a fault operates",
    explanation: "Discrimination (selectivity) ensures that only the protective device closest to a fault operates, minimizing the extent of the power outage and making fault location easier, which is particularly important in critical installations where continuity of supply is essential."
  },
  {
    id: 'level3installdesign31',
    question: "When designing for high levels of harmonic currents in a three-phase system, which of the following is a key consideration?",
    options: ["Using smaller cables to save cost", "Derating transformers and cables to account for additional heating", "Eliminating the neutral conductor", "Using only single-phase distribution"],
    correctAnswer: "Derating transformers and cables to account for additional heating",
    explanation: "High levels of harmonics cause additional heating in transformers and cables beyond what would be expected from the fundamental current alone. Derating these components is necessary to prevent premature aging and potential failure due to overheating."
  },
  {
    id: 'level3installdesign32',
    question: "What is the primary advantage of a double-conversion UPS system compared to a line-interactive UPS?",
    options: ["Lower cost", "Smaller size", "Complete isolation from input power problems", "Lower heat output"],
    correctAnswer: "Complete isolation from input power problems",
    explanation: "A double-conversion UPS provides complete isolation from input power problems (voltage variations, frequency deviations, harmonics) by converting AC to DC and back to AC, making it ideal for critical applications requiring the highest level of power quality."
  },
  {
    id: 'level3installdesign33',
    question: "Which of the following is a key advantage of metallic cable management systems over non-metallic systems in an installation requiring EMC (Electromagnetic Compatibility)?",
    options: ["Lower cost", "Easier installation", "Provision of screening to reduce electromagnetic interference", "Reduced weight"],
    correctAnswer: "Provision of screening to reduce electromagnetic interference",
    explanation: "Metallic cable management systems (conduit, trunking, etc.) provide electromagnetic screening when properly installed and earthed, reducing the emission and reception of electromagnetic interference, which is critical in installations requiring good EMC performance."
  },
  {
    id: 'level3installdesign34',
    question: "What is the main purpose of providing a lightning protection system to BS EN 62305 for a building?",
    options: ["To prevent lightning strikes", "To protect against power surges from the utility", "To safely conduct lightning current to earth, protecting the structure and occupants", "To improve the building's energy efficiency"],
    correctAnswer: "To safely conduct lightning current to earth, protecting the structure and occupants",
    explanation: "A lightning protection system designed to BS EN 62305 does not prevent lightning strikes but provides a preferred path for lightning current to safely flow to earth, protecting the building structure, electrical systems, and occupants from the effects of a direct strike."
  },
  {
    id: 'level3installdesign35',
    question: "When designing an installation in a building with exposed structural metalwork, what is the primary reason for bonding the metalwork to the main earthing terminal?",
    options: ["To comply with planning requirements", "To prevent the possibility of dangerous potential differences", "To improve the appearance of the installation", "To reduce installation costs"],
    correctAnswer: "To prevent the possibility of dangerous potential differences",
    explanation: "Bonding exposed structural metalwork to the main earthing terminal prevents the possibility of dangerous potential differences arising between the metalwork and other earthed parts or exposed conductive parts during a fault condition, reducing electric shock risk."
  },
  {
    id: 'level3installdesign36',
    question: "Which of the following is the most appropriate method for providing standby power to a hospital operating theater?",
    options: ["General purpose standby generator with manual changeover", "Standby generator with automatic changeover and UPS for critical equipment", "Battery backup only", "Dual supply from the same transformer"],
    correctAnswer: "Standby generator with automatic changeover and UPS for critical equipment",
    explanation: "A hospital operating theater requires highly reliable power with minimal interruption. A combination of standby generator with automatic changeover (typically activating within 15 seconds) and UPS for critical equipment (providing instantaneous backup) offers the most appropriate solution."
  },
  {
    id: 'level3installdesign37',
    question: "When designing electrical distribution for a commercial kitchen, what specific requirement applies to socket outlets?",
    options: ["They must be stainless steel", "They must be located at least 300mm above worktop level", "They must have mechanical interlocks", "They must all be 3-phase"],
    correctAnswer: "They must be located at least 300mm above worktop level",
    explanation: "In commercial kitchens, socket outlets should be located at least 300mm above worktop level to reduce the risk of water ingress during cleaning and food preparation activities, as specified in BS 7671 requirements for special installations or locations."
  },
  {
    id: 'level3installdesign38',
    question: "What is the primary consideration when designing an electrical installation in a petrol filling station?",
    options: ["Using only overhead distribution", "Zoning areas according to explosion risk", "Using only 3-phase supplies", "Using only plastic enclosures"],
    correctAnswer: "Zoning areas according to explosion risk",
    explanation: "Petrol filling stations require careful zoning according to explosion risk (following DSEAR regulations and BS EN 60079), with appropriate selection of explosion-protected electrical equipment for each zone to prevent ignition of potentially explosive atmospheres."
  },
  {
    id: 'level3installdesign39',
    question: "What is a key advantage of a Form 4 Type 6 distribution board over a Form 2 Type 2 distribution board?",
    options: ["Lower cost", "Smaller physical size", "Higher degree of separation between functional units and terminations", "Higher current rating"],
    correctAnswer: "Higher degree of separation between functional units and terminations",
    explanation: "Form 4 Type 6 distribution boards provide a higher degree of separation, with barriers between all functional units, separate compartments for terminals, and separate termination compartments for each functional unit, enhancing safety during maintenance and reducing the risk of accidental contact."
  },
  {
    id: 'level3installdesign40',
    question: "When designing the main switchgear for a large commercial building, what is the advantage of using withdrawable circuit breakers compared to fixed pattern devices?",
    options: ["Lower initial cost", "Smaller space requirements", "Simplified maintenance and reduced downtime", "Lower fault level rating"],
    correctAnswer: "Simplified maintenance and reduced downtime",
    explanation: "Withdrawable circuit breakers can be removed and replaced without de-energizing the entire switchboard, simplifying maintenance and significantly reducing downtime, which is particularly valuable in applications where continuity of supply is critical."
  },
  {
    id: 'level3installdesign41',
    question: "Which factor most significantly influences the selection of MCCB (Moulded Case Circuit Breaker) frame sizes in a distribution system?",
    options: ["Only the normal operating current", "The prospective short circuit current at the point of installation", "Only the size of the enclosure available", "Only the client's budget"],
    correctAnswer: "The prospective short circuit current at the point of installation",
    explanation: "The frame size of an MCCB must be selected primarily based on its short circuit breaking capacity, which must be greater than or equal to the prospective short circuit current at the point of installation to ensure safe operation under fault conditions."
  },
  {
    id: 'level3installdesign42',
    question: "What is the primary consideration when determining the cross-sectional area of circuit protective conductors within an installation?",
    options: ["They must all be the same size as phase conductors", "They must be sized according to the adiabatic equation or using standard tables", "They must all be a minimum of 16mm²", "They must all be green and yellow"],
    correctAnswer: "They must be sized according to the adiabatic equation or using standard tables",
    explanation: "Circuit protective conductors must be sized either by calculation using the adiabatic equation (considering fault current, disconnection time, and conductor material) or using the standard tables in BS 7671, to ensure they can safely carry fault current without excessive temperature rise."
  },
  {
    id: 'level3installdesign43',
    question: "What is the primary purpose of providing AFDD (Arc Fault Detection Device) protection in an electrical installation?",
    options: ["To provide surge protection", "To prevent electric shock", "To detect and disconnect series or parallel arc faults", "To prevent overload conditions"],
    correctAnswer: "To detect and disconnect series or parallel arc faults",
    explanation: "AFDDs are designed to detect and disconnect both series arcs (from broken conductors) and parallel arcs (between live conductors or live to earth), which may not be detected by conventional MCBs or RCDs but can be a significant fire hazard."
  },
  {
    id: 'level3installdesign44',
    question: "When designing a power distribution system for a building with multiple voltage systems (e.g., 400V, 230V, and 110V), what is a key requirement?",
    options: ["All systems must use the same colour coding", "All systems must originate from the same distribution board", "Different voltage systems must be clearly identified and segregated", "All systems must use the same type of circuit protection"],
    correctAnswer: "Different voltage systems must be clearly identified and segregated",
    explanation: "Different voltage systems must be clearly identified (by appropriate labelling) and segregated (by using separate enclosures or physical barriers within enclosures) to prevent confusion and reduce the risk of accidents during maintenance or modifications."
  },
  {
    id: 'level3installdesign45',
    question: "What is the purpose of providing a 'clean earth' in a data center or telecommunications facility?",
    options: ["To comply with aesthetic requirements", "To reduce the earth resistance", "To provide a low-noise reference for sensitive electronic equipment", "To satisfy insurance requirements"],
    correctAnswer: "To provide a low-noise reference for sensitive electronic equipment",
    explanation: "A 'clean earth' (sometimes called a technical earth or telecommunications earth) provides a low-noise, low-impedance reference point for sensitive electronic equipment, helping to reduce electromagnetic interference and improve signal integrity in data and telecommunications systems."
  },
  {
    id: 'level3installdesign46',
    question: "When designing electrical services for a fire-fighting lift, what is a key requirement according to BS 9999 and BS 7671?",
    options: ["Supply from a central battery system only", "Supply from a separate main distribution board reserved for safety services", "Standard supply arrangements are sufficient", "Supply directly from the utility company"],
    correctAnswer: "Supply from a separate main distribution board reserved for safety services",
    explanation: "Fire-fighting lifts must be supplied from a separate main distribution board reserved for safety services, with fire-protected supply cables and preferably an alternative supply source (e.g., generator) to maintain operation during a fire emergency."
  },
  {
    id: 'level3installdesign47',
    question: "Which of the following is a key consideration when designing the electrical installation for a swimming pool according to BS 7671 Section 702?",
    options: ["Using only overhead distribution", "Avoiding establishing equipotential zones", "Using only plastic enclosures", "Establishing supplementary equipotential bonding for all exposed conductive parts in zones 0, 1, and 2"],
    correctAnswer: "Establishing supplementary equipotential bonding for all exposed conductive parts in zones 0, 1, and 2",
    explanation: "BS 7671 Section 702 requires supplementary equipotential bonding of all exposed conductive parts in zones 0, 1, and 2 of swimming pools to prevent dangerous potential differences, including fixed metal parts like ladders, handrails, and metal window frames."
  },
  {
    id: 'level3installdesign48',
    question: "What is the primary method for mitigating harmonics in an electrical installation with significant non-linear loads?",
    options: ["Increasing the size of the neutral conductor only", "Using only three-phase loads", "Installing passive or active harmonic filters", "Reducing the supply voltage"],
    correctAnswer: "Installing passive or active harmonic filters",
    explanation: "Harmonic filters (either passive tuned filters or active harmonic conditioners) are the primary method for mitigating harmonics, reducing distortion at the source before it affects the wider distribution system, improving power quality and reducing losses."
  },
  {
    id: 'level3installdesign49',
    question: "When designing electrical services for a building with multiple tenants, what is the key advantage of using SMETS (Smart Metering Equipment Technical Specifications) compliant meters?",
    options: ["Lower installation cost", "Remote reading capability without tenant access", "Smaller physical size", "Simplified wiring requirements"],
    correctAnswer: "Remote reading capability without tenant access",
    explanation: "SMETS compliant smart meters provide remote reading capability without requiring physical access to tenant spaces, offering advantages for billing, monitoring consumption patterns, and detecting potential issues, while also enabling tenants to monitor their own usage."
  },
  {
    id: 'level3installdesign50',
    question: "What is the primary consideration when designing the main incoming power supply capacity for a large commercial building?",
    options: ["The sum of all individual circuit breaker ratings", "The total connected load with appropriate diversity factors applied", "The size of the building in square meters", "The number of distribution boards"],
    correctAnswer: "The total connected load with appropriate diversity factors applied",
    explanation: "The main incoming supply capacity should be based on the total connected load with appropriate diversity factors applied, considering the realistic maximum demand rather than the theoretical maximum if all equipment operated simultaneously."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-design', 'items', q.id), {
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
