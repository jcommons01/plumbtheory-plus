// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Commissioning.ts

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

// ✅ HVAC Level 3 Commissioning & Testing Questions
const questions = [
  {
    id: 'hvac-l3-commissioning1',
    question: "According to CIBSE Code M, what is the primary purpose of commissioning HVAC systems?",
    options: ["To test equipment under maximum load conditions only", "To verify compliance with Building Regulations only", "To ensure systems operate as intended in accordance with design specifications and client requirements", "To reduce the contractor's liability"],
    correctAnswer: "To ensure systems operate as intended in accordance with design specifications and client requirements",
    explanation: "According to CIBSE Code M, the primary purpose of commissioning is to ensure systems operate as intended in accordance with design specifications and client requirements. This process verifies that equipment and systems perform correctly, are energy efficient, maintain proper environmental conditions, and can be effectively controlled, thereby delivering the intended functionality and performance to the client."
  },
  {
    id: 'hvac-l3-commissioning2',
    question: "When should planning for commissioning activities begin in a construction project?",
    options: ["During the design phase", "When equipment is being installed", "After installation is complete", "One week before handover"],
    correctAnswer: "During the design phase",
    explanation: "Planning for commissioning should begin during the design phase of a construction project. CIBSE and BSRIA guidance emphasize that effective commissioning requires early planning to identify requirements, allocate resources, establish schedules, and ensure design documentation includes necessary provisions for commissioning. This early integration allows for commissioning considerations to influence system design and installation methodology."
  },
  {
    id: 'hvac-l3-commissioning3',
    question: "According to BSRIA guidance, what is a 'static pressure test' used for in ductwork commissioning?",
    options: ["Measuring air velocity in the ducts", "Testing fan performance at different speeds", "Verifying the structural integrity and air-tightness of the ductwork", "Measuring noise levels in the ducts"],
    correctAnswer: "Verifying the structural integrity and air-tightness of the ductwork",
    explanation: "According to BSRIA guidance, a static pressure test is used for verifying the structural integrity and air-tightness of ductwork. The test involves sealing the ductwork system, pressurizing it to a specified test pressure, and monitoring pressure loss over a set period. This identifies any leaks that would waste energy, reduce system efficiency, and potentially affect building air quality or pressure regimes."
  },
  {
    id: 'hvac-l3-commissioning4',
    question: "What is the purpose of proportional balancing in a water distribution system?",
    options: ["To ensure equal flow rates through all terminals", "To adjust flows to match the design requirements while maintaining the proportional relationship between branches", "To confirm pump performance against the manufacturer's data", "To test the operation of control valves only"],
    correctAnswer: "To adjust flows to match the design requirements while maintaining the proportional relationship between branches",
    explanation: "Proportional balancing in water distribution systems aims to adjust flows to match design requirements while maintaining the proportional relationship between branches. This methodical approach, typically using the proportional method described in CIBSE Commissioning Code W, ensures that the ratio of actual to design flow remains consistent across the system as adjustments are made, achieving design flows with minimum energy consumption."
  },
  {
    id: 'hvac-l3-commissioning5',
    question: "What is the correct sequence for commissioning a chilled water system?",
    options: ["Start with terminal units, then work back to the chiller", "Start with the chiller, then commission the distribution system and finally the terminal units", "Commission all components simultaneously", "The sequence is not important as long as all components are tested"],
    correctAnswer: "Start with terminal units, then work back to the chiller",
    explanation: "The correct sequence for commissioning a chilled water system is to start with terminal units, then work back to the chiller. This approach, recommended by CIBSE and BSRIA, allows for balancing the system from the most remote points back toward the source, ensuring that each branch and component is properly adjusted before testing the main distribution and generation equipment, resulting in an effectively balanced and controlled system."
  },
  {
    id: 'hvac-l3-commissioning6',
    question: "When testing a pressure-independent control valve during commissioning, what is the key parameter to verify?",
    options: ["Only the valve actuator operation", "Only the maximum flow capacity", "That the valve maintains the designed flow rate regardless of pressure fluctuations", "Only the valve's physical installation is correct"],
    correctAnswer: "That the valve maintains the designed flow rate regardless of pressure fluctuations",
    explanation: "When testing pressure-independent control valves, the key parameter to verify is that the valve maintains the designed flow rate regardless of pressure fluctuations. Unlike conventional valves, these valves incorporate a pressure regulator that maintains a constant differential pressure across the control component, ensuring design flow is maintained despite system pressure variations, which should be verified through measurement under varying pressure conditions."
  },
  {
    id: 'hvac-l3-commissioning7',
    question: "According to CIBSE guidance, what is the acceptable tolerance for air flow measurements during commissioning of a VAV system?",
    options: ["±5% of design flow", "±10% of design flow", "±15% of design flow", "±25% of design flow"],
    correctAnswer: "±10% of design flow",
    explanation: "According to CIBSE guidance (specifically CIBSE Commissioning Code A), the acceptable tolerance for air flow measurements during commissioning of a VAV system is typically ±10% of design flow. This tolerance recognizes the practical challenges in achieving exact design flows while ensuring the system provides adequate ventilation, cooling, or heating to maintain the required internal environment conditions."
  },
  {
    id: 'hvac-l3-commissioning8',
    question: "What information should be recorded when measuring the performance of a fan during commissioning?",
    options: ["Only the fan speed", "Only the power consumption", "Fan speed, flow rate, pressure, power consumption and motor current", "Only whether the fan turns on or off"],
    correctAnswer: "Fan speed, flow rate, pressure, power consumption and motor current",
    explanation: "When measuring fan performance during commissioning, you should record fan speed, flow rate, pressure (both static and total), power consumption, and motor current. This comprehensive data allows comparison against design specifications and manufacturer's performance curves, verification of system operation at the design duty point, and confirmation that the fan is operating within its efficient range without overloading the motor."
  },
  {
    id: 'hvac-l3-commissioning9',
    question: "What is the purpose of a 'capacity test' during chiller commissioning?",
    options: ["To test refrigerant charge levels only", "To measure the maximum electrical load", "To verify the chiller can achieve the specified cooling capacity under design conditions", "To determine the physical size of the chiller"],
    correctAnswer: "To verify the chiller can achieve the specified cooling capacity under design conditions",
    explanation: "A capacity test during chiller commissioning verifies that the chiller can achieve the specified cooling capacity under design conditions. This test measures the actual cooling output (typically by measuring water flow rates and temperature differentials), comparing it against manufacturer's specifications to confirm the chiller delivers the required capacity to meet building cooling loads under the design operating conditions."
  },
  {
    id: 'hvac-l3-commissioning10',
    question: "What is the primary purpose of flushing a water system prior to commissioning?",
    options: ["To test for leaks", "To remove debris and contaminants that could damage components or reduce system efficiency", "To test pump operation", "To add glycol to the system"],
    correctAnswer: "To remove debris and contaminants that could damage components or reduce system efficiency",
    explanation: "The primary purpose of flushing a water system prior to commissioning is to remove debris and contaminants that could damage components or reduce system efficiency. Flushing eliminates construction debris, pipe scale, welding slag, and other contaminants that could cause blockages, erosion, or corrosion in valves, pumps, heat exchangers, and control devices, ensuring reliable operation and preventing premature system failure."
  },
  {
    id: 'hvac-l3-commissioning11',
    question: "According to the Water Supply (Water Fittings) Regulations, what test pressure should be applied when pressure testing a cold water system?",
    options: ["1.5 times the maximum operating pressure", "Exactly the operating pressure", "0.5 bar above operating pressure", "10 bar in all cases"],
    correctAnswer: "1.5 times the maximum operating pressure",
    explanation: "According to the Water Supply (Water Fittings) Regulations, a cold water system should be pressure tested at 1.5 times the maximum operating pressure. This test verifies the system's integrity under pressure higher than normal operating conditions, helping identify any weaknesses in pipes, joints, or fittings before the system is put into service, with the test typically maintained for at least one hour."
  },
  {
    id: 'hvac-l3-commissioning12',
    question: "What method is most appropriate for balancing a variable flow hydronic system with pressure-independent control valves?",
    options: ["Proportional balancing method", "No balancing is required with pressure-independent valves", "Compensated balancing method", "Manual adjustment of all valves to fully open position"],
    correctAnswer: "No balancing is required with pressure-independent valves",
    explanation: "With properly selected and commissioned pressure-independent control valves (PICVs), no traditional hydronic balancing is required. PICVs automatically control flow to the design rate regardless of pressure fluctuations in the system. Commissioning focuses on verifying each PICV is set to the correct design flow limit, properly installed, and functioning correctly, rather than performing system-wide proportional or compensated balancing procedures."
  },
  {
    id: 'hvac-l3-commissioning13',
    question: "What is the purpose of an 'overnight temperature pull-down test' in the commissioning of an air conditioning system?",
    options: ["To measure the noise level when the building is unoccupied", "To verify the system can cool the building from ambient to operating temperature within the specified time", "To ensure the system cycles off correctly when temperature setpoints are reached", "To test the emergency shutdown procedures"],
    correctAnswer: "To verify the system can cool the building from ambient to operating temperature within the specified time",
    explanation: "An overnight temperature pull-down test verifies that the air conditioning system can cool the building from ambient to operating temperature within the specified time, typically before occupancy begins. This test confirms the system has sufficient capacity to overcome the building's thermal mass and heat gains after a period of shutdown (like weekends or nights), ensuring comfort conditions are achieved before occupants arrive."
  },
  {
    id: 'hvac-l3-commissioning14',
    question: "According to BSRIA guidance, what is the main purpose of witnessing factory acceptance tests (FATs) for major HVAC equipment?",
    options: ["To delay delivery of equipment", "To verify equipment meets specifications before shipment to site", "To train the commissioning engineers", "To reduce site testing requirements only"],
    correctAnswer: "To verify equipment meets specifications before shipment to site",
    explanation: "According to BSRIA guidance, the main purpose of witnessing factory acceptance tests (FATs) for major HVAC equipment is to verify equipment meets specifications before shipment to site. FATs allow early identification of non-compliance or performance issues in a controlled environment, reducing the risk of discovering problems during site installation or commissioning, when rectification would be more costly and cause project delays."
  },
  {
    id: 'hvac-l3-commissioning15',
    question: "What is the correct method for setting a proportional plus integral (PI) controller during commissioning?",
    options: ["Set both proportional band and integral time to their minimum values", "Set a narrow proportional band and long integral time then adjust based on system response", "Set only the setpoint and ignore other parameters", "Disable the controller and use manual control"],
    correctAnswer: "Set a narrow proportional band and long integral time then adjust based on system response",
    explanation: "The correct method for setting a PI controller during commissioning is to start with a narrow proportional band and long integral time, then adjust based on system response. This approach allows for observing the initial proportional response, then gradually widening the proportional band to prevent oscillation and shortening the integral time to improve response, with adjustments made until stable control with minimal overshoot and acceptable settling time is achieved."
  },
  {
    id: 'hvac-l3-commissioning16',
    question: "According to CIBSE guidance, what is the acceptable tolerance for water flow measurements during commissioning?",
    options: ["±5% of design flow", "±10% of design flow", "±15% of design flow", "±30% of design flow"],
    correctAnswer: "±10% of design flow",
    explanation: "According to CIBSE guidance (specifically CIBSE Commissioning Code W), the acceptable tolerance for water flow measurements during commissioning is typically ±10% of design flow. This tolerance recognizes practical measurement limitations while ensuring flows are sufficiently close to design values to maintain system performance, with terminal units often permitted a slightly wider tolerance of ±15% in some circumstances."
  },
  {
    id: 'hvac-l3-commissioning17',
    question: "What is the appropriate test pressure for a refrigeration system containing R-410A with a high-side design pressure of 40 bar?",
    options: ["40 bar on both high and low sides", "44 bar on high side, 25 bar on low side", "1.1 × design pressure on both sides (44 bar high side, 28.6 bar low side assuming 26 bar low-side design)", "80 bar on high side, 40 bar on low side"],
    correctAnswer: "1.1 × design pressure on both sides (44 bar high side, 28.6 bar low side assuming 26 bar low-side design)",
    explanation: "The appropriate test pressure for a refrigeration system is 1.1 times the design pressure on both high and low sides. For an R-410A system with a high-side design pressure of 40 bar and typically a low-side design pressure of 26 bar, the test pressures would be 44 bar (high side) and 28.6 bar (low side). This test verifies system integrity under pressures exceeding normal operating conditions while staying within safe limits."
  },
  {
    id: 'hvac-l3-commissioning18',
    question: "What is the recommended method for achieving dehydration of a refrigeration system during commissioning?",
    options: ["Flushing with water", "Triple evacuation to below 500 microns", "Filling with dry nitrogen only", "Adding liquid refrigerant and then recovering it"],
    correctAnswer: "Triple evacuation to below 500 microns",
    explanation: "The recommended method for achieving dehydration of a refrigeration system during commissioning is triple evacuation to below 500 microns. This process involves drawing a deep vacuum (below 500 microns), breaking it with dry nitrogen, then repeating this cycle three times. This method effectively removes moisture and non-condensable gases, which would otherwise cause system issues including acid formation, oil breakdown, and copper plating."
  },
  {
    id: 'hvac-l3-commissioning19',
    question: "What is the purpose of a 'handover' in the commissioning process?",
    options: ["To transfer legal ownership of the equipment", "To complete the payment process", "To formally transfer responsibility for the system to the client/end-user with necessary documentation and training", "To terminate the contractor's involvement with the project"],
    correctAnswer: "To formally transfer responsibility for the system to the client/end-user with necessary documentation and training",
    explanation: "The purpose of handover in the commissioning process is to formally transfer responsibility for the system to the client/end-user with necessary documentation and training. This includes providing operational manuals, record drawings, commissioning data, maintenance requirements, demonstrations of system functionality, and training for operators, ensuring the client can safely and effectively operate and maintain the systems to achieve optimum performance."
  },
  {
    id: 'hvac-l3-commissioning20',
    question: "What does seasonal commissioning involve?",
    options: ["Commissioning that can only be done in summer", "Commissioning that can only be done in winter", "Testing systems under both heating and cooling conditions during their respective seasons", "Commissioning that occurs four times per year"],
    correctAnswer: "Testing systems under both heating and cooling conditions during their respective seasons",
    explanation: "Seasonal commissioning involves testing systems under both heating and cooling conditions during their respective seasons. This extended commissioning process recognizes that certain systems cannot be fully tested at handover due to seasonal conditions (e.g., testing cooling in winter or heating in summer). It includes revisiting the building in different seasons to verify and fine-tune performance under actual seasonal loads and conditions."
  },
  {
    id: 'hvac-l3-commissioning21',
    question: "According to BSRIA guidance, what is the correct sequence for pre-commissioning checks on an air handling unit?",
    options: ["Start with functional testing of controls then check mechanical components", "Begin with full capacity testing then check individual components", "Inspect for proper installation and connection before powering the system", "The sequence is not important"],
    correctAnswer: "Inspect for proper installation and connection before powering the system",
    explanation: "According to BSRIA guidance, pre-commissioning checks on an air handling unit should begin with inspecting for proper installation and connection before powering the system. This includes verifying correct installation, checking for proper service access, confirming ductwork connections, inspecting dampers, confirming electrical connections, checking belt tension, and ensuring drain connections, all before applying power to prevent damage to improperly installed equipment."
  },
  {
    id: 'hvac-l3-commissioning22',
    question: "What document provides the baseline for commissioning activities and acceptance criteria?",
    options: ["Installation manual", "Commissioning specification", "Building log book", "Operation and maintenance manual"],
    correctAnswer: "Commissioning specification",
    explanation: "The commissioning specification provides the baseline for commissioning activities and acceptance criteria. This document, developed during the design phase, details the required commissioning processes, responsibilities, schedules, testing procedures, and performance criteria for each system. It serves as the reference standard against which the success of commissioning is measured and should be aligned with the client's requirements and design intent."
  },
  {
    id: 'hvac-l3-commissioning23',
    question: "What is the most appropriate method for measuring air flow rate in a large supply air duct?",
    options: ["Smoke pencil observation", "Single-point anemometer reading", "Pitot tube traverse", "Feeling the air velocity by hand"],
    correctAnswer: "Pitot tube traverse",
    explanation: "A Pitot tube traverse is the most appropriate method for measuring air flow rate in a large supply duct. This method involves taking multiple measurements across the duct cross-section in a prescribed pattern (typically log-Tchebycheff or log-linear) to account for the velocity profile variations. The readings are averaged and combined with the duct area to calculate accurate volumetric flow, providing results within the required ±10% tolerance."
  },
  {
    id: 'hvac-l3-commissioning24',
    question: "What is the purpose of 'trend logging' during the commissioning of a BMS-controlled HVAC system?",
    options: ["To record historical energy usage only", "To monitor and record system performance over time to verify proper operation and control stability", "To create a log of maintenance activities", "To track occupant complaints"],
    correctAnswer: "To monitor and record system performance over time to verify proper operation and control stability",
    explanation: "The purpose of trend logging during BMS commissioning is to monitor and record system performance over time to verify proper operation and control stability. This continuous data collection reveals how the system responds to varying conditions, whether setpoints are maintained, if control loops are stable without hunting or overshoot, and if equipment cycles appropriately, identifying issues that point-in-time testing might miss."
  },
  {
    id: 'hvac-l3-commissioning25',
    question: "According to CIBSE Code A, what is the minimum stabilization time required before taking temperature readings in a room for air system commissioning?",
    options: ["5 minutes", "10 minutes", "30 minutes", "60 minutes"],
    correctAnswer: "30 minutes",
    explanation: "According to CIBSE Code A, the minimum stabilization time required before taking temperature readings in a room for air system commissioning is 30 minutes. This allows the system and space to reach steady-state conditions after any adjustments, ensuring that temperature stratification has stabilized and that the measurements taken represent the actual performance of the system rather than transient conditions."
  },
  {
    id: 'hvac-l3-commissioning26',
    question: "What is the most appropriate time to conduct a sound survey for an HVAC system?",
    options: ["During normal working hours with occupants present", "During a weekend when the building is empty", "During normal operating hours but before occupation", "The time doesn't matter as long as the system is running"],
    correctAnswer: "During normal operating hours but before occupation",
    explanation: "The most appropriate time to conduct a sound survey for an HVAC system is during normal operating hours but before occupation. This ensures the system is running under typical conditions with all equipment operating as designed, but without background noise from occupants that would interfere with measurements. The survey should follow procedures in CIBSE Guide B and use calibrated sound level meters at specified positions."
  },
  {
    id: 'hvac-l3-commissioning27',
    question: "What is the purpose of a 'pressure independent balancing and control valve' (PIBCV) in hydronic systems?",
    options: ["To increase system pressure", "To reduce flow in all conditions", "To maintain constant flow regardless of pressure fluctuations", "To allow manual adjustment of flow only"],
    correctAnswer: "To maintain constant flow regardless of pressure fluctuations",
    explanation: "The purpose of a pressure independent balancing and control valve (PIBCV) is to maintain constant flow regardless of pressure fluctuations in the system. These valves combine a differential pressure regulator with a control valve and flow limiter, ensuring that the designed flow rate is maintained despite changes in system pressure, simplifying commissioning and improving control performance by eliminating the impact of pressure fluctuations."
  },
  {
    id: 'hvac-l3-commissioning28',
    question: "What is the correct approach to commissioning a system that has been designed with diversity factors?",
    options: ["Test the system with all terminal units at 100% demand simultaneously", "Test only a sample of terminal units", "Test terminal units in a pattern that reflects the expected diversity", "Diversity means commissioning is not required"],
    correctAnswer: "Test terminal units in a pattern that reflects the expected diversity",
    explanation: "The correct approach to commissioning a system designed with diversity factors is to test terminal units in a pattern that reflects the expected diversity. This might involve testing different zones or combinations of terminal units to verify that the central plant and distribution system can handle various load patterns. Additionally, individual terminals should be checked at full capacity to ensure they can meet peak local demands when required."
  },
  {
    id: 'hvac-l3-commissioning29',
    question: "What is the purpose of filling a chilled water system with glycol solution?",
    options: ["To increase system efficiency", "To provide freeze protection and/or corrosion inhibition", "To reduce water treatment requirements", "To increase the specific heat capacity of the fluid"],
    correctAnswer: "To provide freeze protection and/or corrosion inhibition",
    explanation: "The purpose of filling a chilled water system with glycol solution is to provide freeze protection and/or corrosion inhibition. In applications where the fluid temperature might drop below freezing (such as in low-temperature chillers, outdoor pipework, or during system shutdown in winter), glycol prevents freezing and potential system damage. Additionally, inhibited glycol solutions provide corrosion protection for system components."
  },
  {
    id: 'hvac-l3-commissioning30',
    question: "When commissioning a VRF (Variable Refrigerant Flow) system, what specific check is required regarding refrigerant pipe sizing?",
    options: ["That all pipes are the same diameter for simplified installation", "That pipes match the manufacturer's design software output for the specific system configuration", "That all pipes are at their minimum permitted size to save cost", "That pipe sizes match other similar installations"],
    correctAnswer: "That pipes match the manufacturer's design software output for the specific system configuration",
    explanation: "When commissioning a VRF system, a critical check is verifying that installed pipes match the manufacturer's design software output for the specific system configuration. VRF systems have complex piping requirements with varying diameters based on capacity, length, and branch configuration. Incorrect pipe sizing can cause oil return issues, capacity loss, compressor damage, and system failure, so verification against manufacturer's specific design is essential."
  },
  {
    id: 'hvac-l3-commissioning31',
    question: "According to BSRIA, what does 'pre-commissioning' involve?",
    options: ["The same as full commissioning but done earlier", "Activities that prepare the system for commissioning, including inspections, cleaning, and static tests", "Testing performed before installation", "Commissioning performed by a separate contractor before the main commissioning team arrives"],
    correctAnswer: "Activities that prepare the system for commissioning, including inspections, cleaning, and static tests",
    explanation: "According to BSRIA, pre-commissioning involves activities that prepare the system for commissioning, including inspections, cleaning, and static tests. This phase includes checking installations for completeness, verifying access for servicing, flushing water systems, cleaning ductwork, pressure testing, ensuring controls are connected correctly, and confirming electrical safety. These preparations ensure systems are ready for the dynamic testing phase of commissioning."
  },
  {
    id: 'hvac-l3-commissioning32',
    question: "What is the correct method for verifying a differential pressure transmitter's calibration during commissioning?",
    options: ["Accepting the factory calibration without testing", "Applying known pressures to the transmitter and verifying the output signal matches the expected value", "Measuring the physical dimensions of the transmitter", "Comparing voltage at the power supply only"],
    correctAnswer: "Applying known pressures to the transmitter and verifying the output signal matches the expected value",
    explanation: "The correct method for verifying a differential pressure transmitter's calibration is applying known pressures to the transmitter and verifying the output signal matches the expected value. This is typically done using a calibrated pressure source (like a hand pump with gauge) to apply specific pressure differentials across the transmitter's ports while measuring the output signal (typically 4-20mA or 0-10V) to confirm it corresponds to the specified pressure range."
  },
  {
    id: 'hvac-l3-commissioning33',
    question: "What is the purpose of commissioning domestic hot water systems to 60°C?",
    options: ["To increase user comfort", "To reduce energy consumption", "To prevent the risk of Legionella bacteria growth", "To extend the life of the boiler"],
    correctAnswer: "To prevent the risk of Legionella bacteria growth",
    explanation: "Domestic hot water systems are commissioned to 60°C to prevent the risk of Legionella bacteria growth. This temperature is specified in HSE's ACOP L8 guidance because Legionella bacteria are killed rapidly at temperatures above 60°C. The commissioning process verifies that storage cylinders maintain this temperature, while distribution temperatures (minimum 50°C) and return temperatures in circulation systems (minimum 55°C) are also checked."
  },
  {
    id: 'hvac-l3-commissioning34',
    question: "What is the purpose of 'functional performance testing' in the commissioning process?",
    options: ["To verify only that equipment turns on", "To check that systems operate correctly and respond appropriately to changes in conditions and control inputs", "To test individual components in isolation only", "To measure only the energy consumption"],
    correctAnswer: "To check that systems operate correctly and respond appropriately to changes in conditions and control inputs",
    explanation: "Functional performance testing verifies that systems operate correctly and respond appropriately to changes in conditions and control inputs. This dynamic testing examines integrated system operation under various conditions, including normal operation, setpoint changes, failure modes, and transitions between modes (e.g., heating to cooling). It confirms that the entire system works together to deliver the required performance and responds correctly to all control inputs."
  },
  {
    id: 'hvac-l3-commissioning35',
    question: "According to CIBSE and BSRIA guidance, what is the recommended method for documenting identified issues during commissioning?",
    options: ["Verbal notification only", "A formal commissioning issues log with assigned responsibilities and resolution tracking", "General notes in site diary only", "Waiting until all issues are found before documenting them"],
    correctAnswer: "A formal commissioning issues log with assigned responsibilities and resolution tracking",
    explanation: "CIBSE and BSRIA recommend documenting identified issues during commissioning in a formal commissioning issues log with assigned responsibilities and resolution tracking. This structured approach ensures that all issues are recorded, categorized by severity, assigned to responsible parties, given target resolution dates, and tracked to closure. This documentation provides an audit trail and ensures that no issues are overlooked during the commissioning process."
  },
  {
    id: 'hvac-l3-commissioning36',
    question: "What is the primary purpose of conducting proving tests for firefighting systems and smoke control systems?",
    options: ["To test the maximum capacity of fans", "To demonstrate compliance with building control requirements and life safety regulations", "To increase system performance beyond design requirements", "To find the minimum acceptable performance level"],
    correctAnswer: "To demonstrate compliance with building control requirements and life safety regulations",
    explanation: "The primary purpose of conducting proving tests for firefighting and smoke control systems is to demonstrate compliance with building control requirements and life safety regulations. These tests, witnessed by appropriate authorities (building control, fire officers), verify that systems function as designed in fire scenarios, including fan operation, damper actuation, pressurization, smoke extraction, and integration with fire detection and alarm systems."
  },
  {
    id: 'hvac-l3-commissioning37',
    question: "What information should be included in the 'schedule of commissioning documentation' for handover?",
    options: ["Only equipment manufacturer details", "Only the commissioning engineer's name", "Comprehensive test results, operating parameters, setpoints, and control strategies", "Only warranty information"],
    correctAnswer: "Comprehensive test results, operating parameters, setpoints, and control strategies",
    explanation: "The schedule of commissioning documentation for handover should include comprehensive test results, operating parameters, setpoints, and control strategies. This documentation package should also contain record drawings, design data, commissioning procedures, measurement results, control sequences, operational instructions, maintenance requirements, and defects/resolution records, providing a complete reference for the system's intended operation and maintenance."
  },
  {
    id: 'hvac-l3-commissioning38',
    question: "What is the key requirement for commissioning measurement instruments according to CIBSE Code C?",
    options: ["They must be the newest models available", "They must be properly calibrated and have a valid calibration certificate", "They must be digital rather than analog", "They must be owned by the commissioning company"],
    correctAnswer: "They must be properly calibrated and have a valid calibration certificate",
    explanation: "According to CIBSE Code C, the key requirement for commissioning measurement instruments is that they must be properly calibrated and have a valid calibration certificate. Instruments should be calibrated by accredited facilities, with certificates showing traceability to national standards. This ensures measurement accuracy and reliability, with recommended calibration intervals typically being 12 months or as specified by the manufacturer."
  },
  {
    id: 'hvac-l3-commissioning39',
    question: "When commissioning a refrigeration system, what is the purpose of measuring the superheat at the compressor suction?",
    options: ["To optimize system efficiency only", "To determine refrigerant charge level only", "To ensure liquid refrigerant doesn't enter the compressor", "To reduce the discharge temperature"],
    correctAnswer: "To ensure liquid refrigerant doesn't enter the compressor",
    explanation: "When commissioning a refrigeration system, measuring superheat at the compressor suction ensures liquid refrigerant doesn't enter the compressor. Adequate superheat (typically 5-10K) indicates that the refrigerant is completely vaporized before reaching the compressor, preventing liquid slugging that could cause mechanical damage. This measurement is critical for verifying both proper system operation and protecting the compressor from potential damage."
  },
  {
    id: 'hvac-l3-commissioning40',
    question: "According to BS 6880, what is the appropriate test pressure for a low-temperature hot water heating system with a maximum operating pressure of 3.5 bar?",
    options: ["3.5 bar", "5.25 bar", "7 bar", "10 bar"],
    correctAnswer: "7 bar",
    explanation: "According to BS 6880, the appropriate test pressure for a low-temperature hot water heating system is twice the maximum operating pressure. For a system with a maximum operating pressure of 3.5 bar, the test pressure would be 7 bar. This hydraulic pressure test verifies the integrity of the pipework, joints, and components under pressure significantly higher than normal operating conditions to ensure safety and reliability."
  },
  {
    id: 'hvac-l3-commissioning41',
    question: "When commissioning a variable air volume (VAV) system, what specific check must be performed on the minimum outdoor air damper?",
    options: ["Only that the damper fully closes", "Only that the damper fully opens", "That the damper maintains the minimum position required for ventilation under varying system conditions", "That the damper is painted the correct color"],
    correctAnswer: "That the damper maintains the minimum position required for ventilation under varying system conditions",
    explanation: "When commissioning a VAV system, a critical check is verifying that the minimum outdoor air damper maintains the required position under varying system conditions. This ensures adequate fresh air is provided for ventilation regardless of system demand variations. The check should include verifying correct damper position at minimum and maximum system airflow conditions and confirming the damper control responds appropriately to system pressure changes."
  },
  {
    id: 'hvac-l3-commissioning42',
    question: "What is the correct method for verifying thermal comfort conditions during commissioning?",
    options: ["Measuring only air temperature at the thermostat", "Measuring air temperature, radiant temperature, humidity, and air velocity at occupant locations", "Asking the building manager if it feels comfortable", "Checking only that equipment is operating"],
    correctAnswer: "Measuring air temperature, radiant temperature, humidity, and air velocity at occupant locations",
    explanation: "The correct method for verifying thermal comfort conditions is measuring air temperature, radiant temperature, humidity, and air velocity at occupant locations. These parameters, which align with the factors in CIBSE Guide A and ISO 7730, should be measured at representative locations within the occupied zone (typically 0.6m height for seated occupants, 1.1m for standing) to verify that the system creates comfortable conditions throughout the space."
  },
  {
    id: 'hvac-l3-commissioning43',
    question: "What is the purpose of 'water treatment' prior to commissioning a closed water system?",
    options: ["To improve water taste", "To reduce water consumption", "To prevent corrosion, scale formation, and microbial growth", "To increase water viscosity"],
    correctAnswer: "To prevent corrosion, scale formation, and microbial growth",
    explanation: "The purpose of water treatment prior to commissioning a closed water system is to prevent corrosion, scale formation, and microbial growth. Appropriate chemical treatment typically includes inhibitors to prevent corrosion of different metals in the system, scale inhibitors to prevent mineral deposits on heat exchange surfaces, and biocides to prevent biological fouling. These treatments protect system components and maintain efficient heat transfer throughout the system's lifecycle."
  },
  {
    id: 'hvac-l3-commissioning44',
    question: "What is the most appropriate method for testing a building management system (BMS) interface with a fire alarm system during commissioning?",
    options: ["Visual inspection only", "Activating a real fire alarm", "Using a test signal from the fire alarm panel to simulate alarm conditions", "No testing is required as these are separate systems"],
    correctAnswer: "Using a test signal from the fire alarm panel to simulate alarm conditions",
    explanation: "The most appropriate method for testing a BMS interface with a fire alarm system is using a test signal from the fire alarm panel to simulate alarm conditions. This approach safely verifies that the BMS correctly receives and responds to fire alarm signals by implementing programmed actions such as shutting down air handling units, closing fire dampers, or activating smoke extraction, without the disruption and potential hazards of activating an actual fire alarm."
  },
  {
    id: 'hvac-l3-commissioning45',
    question: "According to BSRIA guidance, who should witness and sign off the commissioning results for major HVAC systems?",
    options: ["Only the installing contractor", "Only the building owner", "Only the commissioning engineer", "A representative from the design team and the client"],
    correctAnswer: "A representative from the design team and the client",
    explanation: "According to BSRIA guidance, commissioning results for major HVAC systems should be witnessed and signed off by a representative from the design team and the client. This dual verification ensures that the systems meet both the technical design specifications and the client's operational requirements. The witnessing process typically involves observing key tests, reviewing results, and formally acknowledging system acceptance through signatures on commissioning documentation."
  },
  {
    id: 'hvac-l3-commissioning46',
    question: "What is the purpose of 'building flush out' prior to occupancy?",
    options: ["To test fire evacuation procedures", "To clean the building aesthetically", "To remove VOCs and contaminants from construction materials", "To test the water supply pressure"],
    correctAnswer: "To remove VOCs and contaminants from construction materials",
    explanation: "Building flush out prior to occupancy aims to remove volatile organic compounds (VOCs) and contaminants from construction materials. This process, recommended by BREEAM and other sustainability standards, involves running ventilation systems continuously with maximum outdoor air for a specified period (typically 1-2 weeks) to dilute and remove pollutants off-gassed from new materials, improving indoor air quality before occupants move in."
  },
  {
    id: 'hvac-l3-commissioning47',
    question: "What is the correct procedure for testing automatic air vents during hot water system commissioning?",
    options: ["No testing is required once installed", "Visual inspection for leaks only", "Verify operation by bleeding air from high points while filling the system", "Test at maximum system temperature only"],
    correctAnswer: "Verify operation by bleeding air from high points while filling the system",
    explanation: "The correct procedure for testing automatic air vents during commissioning is verifying operation by bleeding air from high points while filling the system. This involves initially opening manual air vents during filling to release trapped air, then observing automatic air vents to confirm they expel air and seal against water. Final verification should occur again when the system reaches normal operating temperature, as additional air may be released."
  },
  {
    id: 'hvac-l3-commissioning48',
    question: "What is the purpose of measuring the indoor-outdoor temperature difference (ΔT) during heating system commissioning?",
    options: ["To calculate energy consumption only", "To verify the system can maintain design internal temperatures under design external conditions", "To determine fan speed only", "To set the clock on the time control"],
    correctAnswer: "To verify the system can maintain design internal temperatures under design external conditions",
    explanation: "Measuring indoor-outdoor temperature difference (ΔT) during heating system commissioning verifies the system can maintain design internal temperatures under design external conditions. This test confirms the heating system's capacity is sufficient to overcome heat losses at the design temperature differential. If the outdoor temperature during commissioning differs from design conditions, the measured performance can be extrapolated to predict performance at design conditions."
  },
  {
    id: 'hvac-l3-commissioning49',
    question: "According to best practice, what should be included in operator training during the commissioning handover process?",
    options: ["Only written instructions for emergency procedures", "Only a demonstration of routine maintenance", "Comprehensive training including normal operation, emergency procedures, maintenance requirements, and system optimization", "Only contact details for the maintenance contractor"],
    correctAnswer: "Comprehensive training including normal operation, emergency procedures, maintenance requirements, and system optimization",
    explanation: "Best practice for operator training during commissioning handover includes comprehensive training covering normal operation, emergency procedures, maintenance requirements, and system optimization. This training should involve both classroom and hands-on components, be tailored to the operators' technical background, include documentation for future reference, and ideally be recorded for training future staff, ensuring operators can effectively manage the systems for optimum performance and reliability."
  },
  {
    id: 'hvac-l3-commissioning50',
    question: "What is the primary purpose of a 'black building test' during commissioning of backup power systems for critical HVAC equipment?",
    options: ["To measure energy consumption when the building is unoccupied", "To verify that essential systems function correctly during a mains power failure", "To test the building's aesthetics at night", "To verify that all lights can be switched off simultaneously"],
    correctAnswer: "To verify that essential systems function correctly during a mains power failure",
    explanation: "The primary purpose of a 'black building test' is to verify that essential systems function correctly during a mains power failure. This test simulates a complete power outage to confirm that backup power systems (generators, UPS) start appropriately, power is transferred to critical HVAC equipment, systems restart in the correct sequence, and proper operation is maintained. This ensures life safety and critical functions are preserved during actual power failures."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-commissioning', 'items', q.id), {
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
