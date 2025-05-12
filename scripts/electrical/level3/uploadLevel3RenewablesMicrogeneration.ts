// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3RenewablesMicrogeneration.ts

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

// ✅ Level 3 Renewables and Microgeneration Questions
const questions = [
  {
    id: 'level3renewmicro1',
    question: "According to the MCS standards, what is the maximum capacity for a microgeneration installation to be classified as 'small-scale'?",
    options: ["10kW", "30kW", "50kW", "100kW"],
    correctAnswer: "50kW",
    explanation: "Under the Microgeneration Certification Scheme (MCS) standards, small-scale installations are defined as those with a capacity up to 50kW for electricity generation (such as solar PV and wind turbines) and 45kW for heat generation (such as heat pumps)."
  },
  {
    id: 'level3renewmicro2',
    question: "Which document must be provided to the customer after the installation of a grid-connected solar PV system according to MCS requirements?",
    options: ["Only a verbal explanation of system operation", "Installation certificate with commissioning checklist and system performance estimate", "Just the manufacturer's warranty information", "Only the DNO notification form"],
    correctAnswer: "Installation certificate with commissioning checklist and system performance estimate",
    explanation: "The MCS requirements mandate that after installation, the customer must be provided with an installation certificate that includes a commissioning checklist and system performance estimate. This documentation is essential for MCS compliance and for the customer to access schemes like the Smart Export Guarantee."
  },
  {
    id: 'level3renewmicro3',
    question: "Which Engineering Recommendation applies to the connection of small-scale generating units up to and including 16A per phase?",
    options: ["G99", "G59", "G100", "G98"],
    correctAnswer: "G98",
    explanation: "Engineering Recommendation G98 specifically applies to the connection of Fully Type Tested Micro-generators up to and including 16A per phase (approximately 3.68kW on a single-phase supply). G99 applies to generators above this threshold."
  },
  {
    id: 'level3renewmicro4',
    question: "What is the maximum allowable voltage rise at the point of connection for a grid-connected microgeneration system according to UK standards?",
    options: ["1.5%", "2.5%", "3.5%", "5%"],
    correctAnswer: "3.5%",
    explanation: "According to UK grid connection standards, the maximum allowable voltage rise at the point of connection for a microgeneration system is 3.5% above nominal. This is to ensure grid stability and prevent issues with other connected equipment."
  },
  {
    id: 'level3renewmicro5',
    question: "Which of the following protection features must be included in a grid-connected solar PV installation according to the IET Code of Practice?",
    options: ["Only DC overvoltage protection", "Only AC overcurrent protection", "Loss of mains protection, over/under voltage protection, and over/under frequency protection", "Only lightning protection"],
    correctAnswer: "Loss of mains protection, over/under voltage protection, and over/under frequency protection",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems requires the inclusion of loss of mains protection (G98/G99 compliant), over/under voltage protection, and over/under frequency protection to ensure safe operation and prevent islanding when the grid supply is lost."
  },
  {
    id: 'level3renewmicro6',
    question: "What is the maximum disconnection time required for fault protection in a PV array according to BS 7671?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "300 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "BS 7671 requires a maximum disconnection time of 0.4 seconds for fault protection in a PV array for systems up to 230/400V in TN systems, ensuring rapid isolation in the event of a fault to prevent electric shock hazards."
  },
  {
    id: 'level3renewmicro7',
    question: "Which type of inverter is required for a grid-connected solar PV system to allow operation during a power cut when paired with battery storage?",
    options: ["Standard grid-tied inverter", "Hybrid inverter with grid-forming capability", "Micro-inverter", "Any inverter with G98 approval"],
    correctAnswer: "Hybrid inverter with grid-forming capability",
    explanation: "A hybrid inverter with grid-forming capability is required to allow a grid-connected solar PV system to operate during a power cut when paired with battery storage. This type of inverter can switch to island mode, forming a stable grid to supply protected circuits while being isolated from the main grid."
  },
  {
    id: 'level3renewmicro8',
    question: "According to MCS standards, what is the minimum acceptable annual Solar Resource (irradiance) measurement accuracy for Solar PV system design?",
    options: ["±10%", "±20%", "±30%", "±50%"],
    correctAnswer: "±20%",
    explanation: "The MCS standards require that Solar Resource (irradiance) data used for PV system design and annual energy yield calculations must have a measurement accuracy of at least ±20% to ensure reasonably accurate performance estimates are provided to customers."
  },
  {
    id: 'level3renewmicro9',
    question: "What is the minimum separation distance required between parallel DC cables from separate strings in a PV array to reduce the risk of induced current loops?",
    options: ["0.1m", "0.2m", "0.3m", "0.5m"],
    correctAnswer: "0.3m",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems recommends a minimum separation distance of 0.3m between parallel DC cables from separate strings to reduce the risk of induced current loops and associated electromagnetic interference."
  },
  {
    id: 'level3renewmicro10',
    question: "Which document must be consulted to determine the wind classification for a small wind turbine installation site in the UK?",
    options: ["MCS 010", "MCS 003", "MCS 006", "MCS 012"],
    correctAnswer: "MCS 010",
    explanation: "MCS 010 is the Reference Standard that must be consulted to determine the wind classification for a small wind turbine installation site in the UK. It provides the methodology for site wind speed assessment and classification essential for proper turbine selection."
  },
  {
    id: 'level3renewmicro11',
    question: "What is the maximum voltage drop permitted between a PV array and inverter according to the IET Code of Practice?",
    options: ["1%", "3%", "5%", "7%"],
    correctAnswer: "3%",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems specifies that the maximum voltage drop between a PV array and inverter should not exceed 3% under standard test conditions to minimize energy losses and ensure system efficiency."
  },
  {
    id: 'level3renewmicro12',
    question: "Which of the following is a key consideration when selecting the location for a battery storage system in a domestic installation?",
    options: ["Aesthetic appearance only", "Proximity to water sources", "Temperature-controlled environment with adequate ventilation", "Must be installed outside only"],
    correctAnswer: "Temperature-controlled environment with adequate ventilation",
    explanation: "According to the IET Code of Practice for Electrical Energy Storage Systems, battery storage systems should be installed in a temperature-controlled environment with adequate ventilation to ensure optimal performance, longevity, and safety, particularly for lithium-ion battery systems which are sensitive to temperature extremes."
  },
  {
    id: 'level3renewmicro13',
    question: "According to G98 requirements, within what timeframe must the DNO be notified after the commissioning of a grid-connected microgeneration system?",
    options: ["7 days", "28 days", "30 days", "90 days"],
    correctAnswer: "28 days",
    explanation: "Under the G98 requirements, the Distribution Network Operator (DNO) must be notified within 28 days after the commissioning of a grid-connected microgeneration system. This notification is typically done by submitting a commissioning form with installation details."
  },
  {
    id: 'level3renewmicro14',
    question: "What is the minimum required IP rating for an external electrical enclosure containing PV DC components according to the IET Code of Practice?",
    options: ["IP44", "IP54", "IP55", "IP65"],
    correctAnswer: "IP54",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems specifies that external electrical enclosures containing PV DC components must have a minimum IP rating of IP54 to provide adequate protection against dust and water ingress in outdoor environments."
  },
  {
    id: 'level3renewmicro15',
    question: "Which type of loss of mains protection is specified in G98/G99 for inverter-connected generation?",
    options: ["Rate of Change of Frequency (RoCoF) only", "Vector Shift only", "RoCoF with specific settings defined in G98/G99", "Only current-based detection"],
    correctAnswer: "RoCoF with specific settings defined in G98/G99",
    explanation: "G98/G99 specifies Rate of Change of Frequency (RoCoF) with specific settings as the required loss of mains protection method for inverter-connected generation. Vector Shift was previously used but has been phased out due to grid stability concerns."
  },
  {
    id: 'level3renewmicro16',
    question: "What is the primary function of an optimiser in a solar PV system?",
    options: ["To increase the voltage only", "To track the maximum power point of each module individually", "To convert DC to AC", "To provide surge protection only"],
    correctAnswer: "To track the maximum power point of each module individually",
    explanation: "The primary function of an optimiser in a solar PV system is to track the maximum power point of each module individually, allowing for better performance in partially shaded conditions and when modules are installed at different orientations or inclinations."
  },
  {
    id: 'level3renewmicro17',
    question: "According to MCS standards, what is the minimum design coefficient of performance (CoP) required for an air source heat pump at rating conditions?",
    options: ["2.5", "3.5", "4.5", "5.5"],
    correctAnswer: "3.5",
    explanation: "The MCS standards require that air source heat pumps must have a minimum design coefficient of performance (CoP) of 3.5 at rating conditions to ensure acceptable energy efficiency and to qualify for various government incentive schemes."
  },
  {
    id: 'level3renewmicro18',
    question: "What is the maximum permitted AC current that a single-phase grid connection can export under G98 rules without requiring G99 application?",
    options: ["13A", "16A", "32A", "100A"],
    correctAnswer: "16A",
    explanation: "Under G98 rules, the maximum permitted AC current that a single-phase grid connection can export is 16A (approximately 3.68kW at 230V). Systems capable of exporting more than this require a G99 application to the DNO."
  },
  {
    id: 'level3renewmicro19',
    question: "Which of the following protection devices is required on the DC side of a grid-connected PV system according to the IET Code of Practice?",
    options: ["AC circuit breaker only", "DC-side disconnection means (isolator) rated for DC use", "RCD only", "AC isolator only"],
    correctAnswer: "DC-side disconnection means (isolator) rated for DC use",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems requires a disconnection means (isolator) rated for DC use on the DC side of a PV system to allow safe isolation during maintenance or emergency situations."
  },
  {
    id: 'level3renewmicro20',
    question: "What is the minimum recommended clearance distance from the edge of a roof for solar PV installations according to MCS standards?",
    options: ["0.3m", "0.5m", "0.8m", "1.0m"],
    correctAnswer: "0.5m",
    explanation: "MCS standards recommend a minimum clearance distance of 0.5m from the edge of a roof for solar PV installations to reduce wind uplift forces and provide safe access for maintenance, although this may vary depending on specific roof construction and local wind conditions."
  },
  {
    id: 'level3renewmicro21',
    question: "What is the recommended maximum height for a freestanding wind turbine tower without requiring planning permission in England under permitted development rights?",
    options: ["10m", "11.1m", "15m", "20m"],
    correctAnswer: "11.1m",
    explanation: "Under permitted development rights in England, the recommended maximum height for a freestanding wind turbine tower without requiring planning permission is 11.1m, including the blade length. This is subject to other conditions and may vary in different local authorities and other parts of the UK."
  },
  {
    id: 'level3renewmicro22',
    question: "According to the IET Code of Practice for Electrical Energy Storage Systems, what is the maximum State of Charge (SoC) recommended for lithium-ion batteries during long-term storage?",
    options: ["30-40%", "50-60%", "70-80%", "100%"],
    correctAnswer: "50-60%",
    explanation: "The IET Code of Practice for Electrical Energy Storage Systems recommends that lithium-ion batteries should be maintained at a State of Charge (SoC) of approximately 50-60% during long-term storage to prevent degradation while maintaining sufficient charge for battery health."
  },
  {
    id: 'level3renewmicro23',
    question: "What is the key advantage of a 3-phase connection for larger microgeneration systems compared to single-phase?",
    options: ["Lower voltage only", "Lower total system cost", "More balanced loading and higher export capacity", "Simplified installation process"],
    correctAnswer: "More balanced loading and higher export capacity",
    explanation: "A 3-phase connection for larger microgeneration systems provides more balanced loading across the phases and higher export capacity (up to 16A per phase under G98, or 48A total). This reduces network unbalance issues and allows for larger system capacities without triggering G99 requirements."
  },
  {
    id: 'level3renewmicro24',
    question: "Which of the following is a key requirement for the installation of a ground source heat pump system according to MCS standards?",
    options: ["Ground loop must always be horizontal only", "Ground loop pressure testing at 1.5 times operating pressure", "Maximum ground loop temperature of 15°C", "Ground loop antifreeze must always be glycol-based"],
    correctAnswer: "Ground loop pressure testing at 1.5 times operating pressure",
    explanation: "MCS standards require that ground source heat pump ground loops must undergo pressure testing at 1.5 times the operating pressure for a minimum duration specified by the manufacturer to ensure system integrity and detect any leaks prior to commissioning."
  },
  {
    id: 'level3renewmicro25',
    question: "According to the Smart Export Guarantee (SEG) requirements, what type of meter must be installed to measure exported electricity?",
    options: ["Any standard meter", "Economy 7 meter", "Smart meter or export meter with half-hourly readings capability", "Import-only smart meter"],
    correctAnswer: "Smart meter or export meter with half-hourly readings capability",
    explanation: "Under the Smart Export Guarantee (SEG) requirements, a smart meter or export meter capable of providing half-hourly readings must be installed to accurately measure the electricity exported to the grid, enabling proper payment for exported energy."
  },
  {
    id: 'level3renewmicro26',
    question: "What is the maximum permitted voltage deviation at the point of connection for microgeneration systems according to ESQCR (Electricity Safety, Quality and Continuity Regulations)?",
    options: ["±5%", "±6%", "±10%", "±15%"],
    correctAnswer: "±10%",
    explanation: "According to the ESQCR (Electricity Safety, Quality and Continuity Regulations), the maximum permitted voltage deviation at the point of connection for microgeneration systems is ±10% of the nominal voltage (207V to 253V for a 230V system) to ensure safe and reliable operation."
  },
  {
    id: 'level3renewmicro27',
    question: "Which of the following represents the correct sequence for safely shutting down a grid-connected PV system?",
    options: ["AC isolator off, DC isolator off", "DC isolator off, AC isolator off", "Both isolators simultaneously", "The sequence is not important"],
    correctAnswer: "AC isolator off, DC isolator off",
    explanation: "The correct sequence for safely shutting down a grid-connected PV system is to first switch off the AC isolator followed by the DC isolator. This sequence prevents the inverter from attempting to start up under load when DC power is still present."
  },
  {
    id: 'level3renewmicro28',
    question: "According to G99, what is the required frequency protection setting range for over-frequency protection?",
    options: ["50.5 Hz to 52.0 Hz", "51.5 Hz to 52.0 Hz", "47.0 Hz to 47.5 Hz", "49.5 Hz to 50.0 Hz"],
    correctAnswer: "51.5 Hz to 52.0 Hz",
    explanation: "According to G99, the required frequency protection setting range for over-frequency protection is 51.5 Hz to 52.0 Hz. The generating unit must disconnect if the frequency rises above this range to protect both the generator and the grid."
  },
  {
    id: 'level3renewmicro29',
    question: "What is the recommended DC voltage range for most string inverters used in grid-connected PV systems?",
    options: ["12V to 48V", "120V to 200V", "350V to 600V", "1000V to 1500V"],
    correctAnswer: "350V to 600V",
    explanation: "Most string inverters used in residential and small commercial grid-connected PV systems have a recommended DC operating voltage range of approximately 350V to 600V, though this can vary by manufacturer and model. This range offers the best balance of efficiency and safety for smaller installations."
  },
  {
    id: 'level3renewmicro30',
    question: "According to MCS standards, what is the minimum distance required between an air source heat pump outdoor unit and a property boundary to comply with permitted development rights in England?",
    options: ["0.5m", "1m", "3m", "5m"],
    correctAnswer: "1m",
    explanation: "Under MCS standards and permitted development rights in England, air source heat pump outdoor units must be installed at least 1m from the property boundary to minimize noise impact on neighboring properties and comply with planning regulations."
  },
  {
    id: 'level3renewmicro31',
    question: "What is the primary purpose of the Functional Safety requirement in G98/G99 for inverter-based generation?",
    options: ["To provide surge protection only", "To prevent islanding operation when the grid supply is lost", "To maximize power output", "To protect against lightning strikes only"],
    correctAnswer: "To prevent islanding operation when the grid supply is lost",
    explanation: "The primary purpose of the Functional Safety requirement in G98/G99 for inverter-based generation is to prevent islanding operation when the grid supply is lost, ensuring that the generator disconnects promptly to protect network personnel and prevent damage to equipment."
  },
  {
    id: 'level3renewmicro32',
    question: "Which of the following statements regarding earthing arrangements for grid-connected PV systems is correct according to the IET Code of Practice?",
    options: ["All PV systems must use TT earthing regardless of existing arrangements", "PV systems should adopt the same earthing arrangement as the existing electrical installation", "PV systems must always have a separate earth electrode", "All metallic components can be connected to the main earthing terminal via standard circuit conductors"],
    correctAnswer: "PV systems should adopt the same earthing arrangement as the existing electrical installation",
    explanation: "According to the IET Code of Practice for Grid-Connected Solar Photovoltaic Systems, PV systems should adopt the same earthing arrangement as the existing electrical installation to ensure compatibility and proper fault protection in accordance with BS 7671."
  },
  {
    id: 'level3renewmicro33',
    question: "What is the maximum combined capacity of microgeneration allowed on a single-phase connection under G98 in the UK?",
    options: ["3.68kW", "5.5kW", "7kW", "11kW"],
    correctAnswer: "3.68kW",
    explanation: "Under G98 in the UK, the maximum combined capacity of microgeneration allowed on a single-phase connection is 3.68kW (16A at 230V). Any system with a higher capacity would require a G99 application and possibly a three-phase connection."
  },
  {
    id: 'level3renewmicro34',
    question: "What is the primary function of the G100 standard in relation to microgeneration systems?",
    options: ["To specify requirements for off-grid systems", "To establish export limitation schemes to prevent network constraints", "To define battery storage requirements", "To specify heat pump installation standards"],
    correctAnswer: "To establish export limitation schemes to prevent network constraints",
    explanation: "The G100 standard establishes the technical requirements for export limitation schemes, which allow systems larger than would normally be permitted to connect to the network by actively limiting the amount of power exported to prevent network constraints."
  },
  {
    id: 'level3renewmicro35',
    question: "According to MCS standards, what is the minimum information that must be recorded when commissioning a heat pump system?",
    options: ["Only the installation date", "Only the heat pump model", "Flow rates, temperatures, pressure drops, and electrical measurements", "Only the installer's details"],
    correctAnswer: "Flow rates, temperatures, pressure drops, and electrical measurements",
    explanation: "MCS standards require that when commissioning a heat pump system, the installer must record comprehensive data including flow rates, temperatures, pressure drops, and electrical measurements to verify system performance and compliance with design parameters."
  },
  {
    id: 'level3renewmicro36',
    question: "What is the recommended minimum angle of inclination for a solar PV array in the UK to facilitate self-cleaning by rainfall?",
    options: ["5°", "10°", "15°", "20°"],
    correctAnswer: "15°",
    explanation: "The recommended minimum angle of inclination for a solar PV array in the UK to facilitate effective self-cleaning by rainfall is 15°. Arrays installed at lower angles may require more frequent cleaning to maintain optimal performance."
  },
  {
    id: 'level3renewmicro37',
    question: "Which of the following statements regarding battery storage system installation in domestic premises is correct according to the IET Code of Practice?",
    options: ["Batteries can be installed in any location without restrictions", "Lithium batteries must have a fire-rated enclosure or be installed in a separate location from living spaces", "All batteries must be installed outdoors only", "Battery systems do not require ventilation in any circumstance"],
    correctAnswer: "Lithium batteries must have a fire-rated enclosure or be installed in a separate location from living spaces",
    explanation: "According to the IET Code of Practice for Electrical Energy Storage Systems, lithium batteries installed in domestic premises must have a fire-rated enclosure or be installed in a separate location from living spaces to mitigate fire risks, and adequate ventilation must be provided."
  },
  {
    id: 'level3renewmicro38',
    question: "What is the typical power output range for micro wind turbines that can be installed under permitted development rights in the UK?",
    options: ["Up to 1kW", "Up to 5kW", "Up to 15kW", "Up to 50kW"],
    correctAnswer: "Up to 5kW",
    explanation: "Micro wind turbines that can typically be installed under permitted development rights in the UK have a power output range of up to 5kW, though specific planning requirements may vary by location and turbine type."
  },
  {
    id: 'level3renewmicro39',
    question: "According to MCS installation standards, what is the recommended procedure for pressure testing a solar thermal system?",
    options: ["Test at operating pressure for 10 minutes", "Test at 1.5 times operating pressure for 30 minutes with no pressure drop", "Test at twice the operating pressure for 5 minutes", "No pressure testing is required for solar thermal systems"],
    correctAnswer: "Test at 1.5 times operating pressure for 30 minutes with no pressure drop",
    explanation: "MCS installation standards recommend pressure testing solar thermal systems at 1.5 times the maximum operating pressure for a minimum of 30 minutes with no appreciable pressure drop to ensure system integrity and leak-free operation."
  },
  {
    id: 'level3renewmicro40',
    question: "What is the maximum permitted DC voltage for a PV system in a domestic installation according to BS 7671?",
    options: ["400V", "600V", "1000V", "1500V"],
    correctAnswer: "1000V",
    explanation: "According to BS 7671, the maximum permitted DC voltage for a PV system in a domestic installation is 1000V. Systems with higher voltages require additional safety measures and are typically only used in commercial or utility-scale installations."
  },
  {
    id: 'level3renewmicro41',
    question: "What is the minimum documentation required for a small wind turbine installation to comply with MCS standards?",
    options: ["Only manufacturer's warranty", "Commissioning record, user manual, and maintenance schedule", "Only a verbal explanation to the client", "Only planning permission documents"],
    correctAnswer: "Commissioning record, user manual, and maintenance schedule",
    explanation: "To comply with MCS standards, a small wind turbine installation must be accompanied by a minimum documentation package including a commissioning record, user manual with system specification, and a maintenance schedule to ensure safe and effective operation."
  },
  {
    id: 'level3renewmicro42',
    question: "What is the purpose of a phase lock loop in a grid-connected inverter?",
    options: ["To maintain DC voltage at a constant level", "To physically lock the inverter to prevent theft", "To synchronize the inverter output with the grid frequency and phase", "To protect against lightning strikes"],
    correctAnswer: "To synchronize the inverter output with the grid frequency and phase",
    explanation: "A phase lock loop in a grid-connected inverter synchronizes the inverter's output with the grid frequency and phase, ensuring that the power is exported in accordance with grid requirements and enabling stable parallel operation with the utility supply."
  },
  {
    id: 'level3renewmicro43',
    question: "According to G98, what is the maximum permitted neutral-earth voltage under normal operating conditions?",
    options: ["0V", "5V", "10V", "25V"],
    correctAnswer: "10V",
    explanation: "According to G98, the maximum permitted neutral-earth voltage under normal operating conditions is 10V. Higher voltages may indicate a fault condition or neutral shifting issues that require investigation and resolution."
  },
  {
    id: 'level3renewmicro44',
    question: "What is the requirement for emergency shutdown procedures for battery storage systems according to the IET Code of Practice?",
    options: ["No special procedures are required", "Instructions must be provided for emergency services only", "Clear shutdown instructions must be permanently displayed at the installation", "Emergency shutdown is only required for systems over 10kWh"],
    correctAnswer: "Clear shutdown instructions must be permanently displayed at the installation",
    explanation: "The IET Code of Practice for Electrical Energy Storage Systems requires that clear emergency shutdown instructions must be permanently displayed at the installation to allow for safe isolation in emergency situations, both for occupants and emergency services."
  },
  {
    id: 'level3renewmicro45',
    question: "What is the primary function of Maximum Power Point Tracking (MPPT) in a solar PV inverter?",
    options: ["To detect earth faults only", "To adjust the inverter's operating point to extract maximum power from PV arrays", "To provide surge protection only", "To maintain constant voltage regardless of solar conditions"],
    correctAnswer: "To adjust the inverter's operating point to extract maximum power from PV arrays",
    explanation: "The primary function of Maximum Power Point Tracking (MPPT) in a solar PV inverter is to continuously adjust the inverter's operating point to extract maximum power from PV arrays under varying temperature, irradiance, and partial shading conditions."
  },
  {
    id: 'level3renewmicro46',
    question: "According to the IET Code of Practice, what is the minimum required separation between DC cables of opposite polarity in a PV system to reduce the risk of faults?",
    options: ["No separation required", "10mm", "20mm", "50mm"],
    correctAnswer: "20mm",
    explanation: "The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems specifies a minimum separation of 20mm between DC cables of opposite polarity to reduce the risk of faults due to insulation damage, especially important in DC circuits where faults can sustain arcs."
  },
  {
    id: 'level3renewmicro47',
    question: "What is the maximum permitted external noise level for an air source heat pump installation to comply with MCS standards in a residential area?",
    options: ["32 dBA", "42 dBA", "52 dBA", "62 dBA"],
    correctAnswer: "42 dBA",
    explanation: "To comply with MCS standards, an air source heat pump installation in a residential area must not exceed a noise level of 42 dBA when measured at the nearest neighboring property to minimize noise disturbance, though local planning authorities may impose stricter limits."
  },
  {
    id: 'level3renewmicro48',
    question: "Which of the following is a mandatory requirement for battery storage systems installed in domestic premises according to the IET Code of Practice?",
    options: ["Battery management system (BMS) only", "Isolation device only", "Overcurrent protection only", "All of these: BMS, isolation device, and overcurrent protection"],
    correctAnswer: "All of these: BMS, isolation device, and overcurrent protection",
    explanation: "The IET Code of Practice for Electrical Energy Storage Systems mandates that battery storage systems installed in domestic premises must include a battery management system (BMS) to prevent over/undercharging, an isolation device for maintenance, and overcurrent protection to prevent damage during fault conditions."
  },
  {
    id: 'level3renewmicro49',
    question: "According to G98/G99, what is the required disconnection time for the loss of mains protection if the grid frequency falls below 47.5Hz?",
    options: ["20 seconds", "5 seconds", "1 second", "0.5 seconds"],
    correctAnswer: "0.5 seconds",
    explanation: "According to G98/G99, if the grid frequency falls below 47.5Hz (indicating a significant grid disturbance), the loss of mains protection must disconnect the generator within 0.5 seconds to prevent damage and ensure safety."
  },
  {
    id: 'level3renewmicro50',
    question: "What is the purpose of the MCS certificate provided after the installation of a microgeneration system?",
    options: ["Only to comply with Building Regulations", "Only to provide warranty protection", "To demonstrate compliance with standards and enable access to incentive schemes", "Only to satisfy insurance requirements"],
    correctAnswer: "To demonstrate compliance with standards and enable access to incentive schemes",
    explanation: "The MCS certificate provided after installation demonstrates that the microgeneration system complies with relevant standards and has been installed by a competent installer. This certificate is essential for accessing government incentive schemes such as the Smart Export Guarantee and proves the system meets required quality standards."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-renewables', 'items', q.id), {
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
