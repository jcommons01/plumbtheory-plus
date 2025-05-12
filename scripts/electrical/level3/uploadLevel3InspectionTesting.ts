// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3InspectionTesting.ts

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

// ✅ Level 3 Inspection & Testing Questions
const questions = [
  {
    id: 'level3inspect1',
    question: "When conducting periodic inspection and testing of an industrial installation, what is the most appropriate sampling approach for final circuits?",
    options: ["Test every circuit regardless of circumstances", "Use statistical sampling based on the client's budget", "Select a sample based on condition, environment, and previous test results", "Only test circuits that show visible damage"],
    correctAnswer: "Select a sample based on condition, environment, and previous test results",
    explanation: "For periodic inspection in industrial settings, appropriate sampling involves selecting circuits based on their condition, operating environment (e.g., high-risk areas tested more thoroughly), and results from previous inspections. This risk-based approach ensures efficient use of resources while maintaining safety."
  },
  {
    id: 'level3inspect2',
    question: "What is the minimum value of insulation resistance for a 400V three-phase circuit according to BS 7671?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "0.25 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "According to BS 7671, for circuits with a nominal voltage up to 500V (including 400V three-phase systems), the minimum acceptable insulation resistance value is 1.0 MΩ when tested with a 500V DC test voltage."
  },
  {
    id: 'level3inspect3',
    question: "When measuring the prospective fault current (PFC) at a distribution board, what does a reading significantly higher than calculated indicate?",
    options: ["The installation is safer than expected", "The measuring instrument is faulty", "The calculation did not account for all impedance factors", "The source impedance is lower than anticipated"],
    correctAnswer: "The source impedance is lower than anticipated",
    explanation: "A PFC reading significantly higher than calculated indicates the source impedance is lower than anticipated. This could be due to changes in the supply network, incorrect assumptions about cable parameters, or transformer replacements. This higher value must be used to verify protective device ratings are adequate."
  },
  {
    id: 'level3inspect4',
    question: "What is the significance of a polarization index (PI) test when assessing the condition of large motor insulation?",
    options: ["It measures the winding temperature only", "It measures the ratio of insulation resistance at different time intervals, indicating insulation quality and moisture content", "It checks for phase imbalance", "It only measures the starting current"],
    correctAnswer: "It measures the ratio of insulation resistance at different time intervals, indicating insulation quality and moisture content",
    explanation: "The polarization index (PI) test measures the ratio of insulation resistance values at different time intervals (typically 10 minutes/1 minute). A good insulation system shows increasing resistance over time as polarization occurs, while contaminated or deteriorated insulation shows little change, providing valuable diagnostic information about insulation condition."
  },
  {
    id: 'level3inspect5',
    question: "When performing earth fault loop impedance tests in an installation protected by RCDs, what approach should be used to prevent unwanted tripping?",
    options: ["Disable all RCDs before testing", "Use a non-tripping loop tester at 15mA or less", "Connect test leads to the line conductor only", "Add a temporary bypass to all RCDs"],
    correctAnswer: "Use a non-tripping loop tester at 15mA or less",
    explanation: "To prevent unwanted tripping of RCDs during earth fault loop impedance testing, a non-tripping loop tester should be used that operates at 15mA or less (below the tripping threshold of standard 30mA RCDs). These testers use low test currents or specialized test methods to measure impedance without triggering RCD operation."
  },
  {
    id: 'level3inspect6',
    question: "What test should be performed to verify the correct operation of RCDs with DC components (Type B) in an installation with inverter-driven equipment?",
    options: ["Standard AC RCD test only", "Test with smooth DC fault current only", "Comprehensive testing with AC, pulsating DC, and smooth DC test currents", "No testing required for Type B RCDs"],
    correctAnswer: "Comprehensive testing with AC, pulsating DC, and smooth DC test currents",
    explanation: "Type B RCDs, required for installations with inverter-driven equipment, need comprehensive testing with AC, pulsating DC, and smooth DC test currents to verify proper operation for all fault current types. Specialized test equipment capable of producing and measuring responses to these different current types must be used."
  },
  {
    id: 'level3inspect7',
    question: "When conducting a detailed inspection of a busbar chamber, what particular aspect requires careful scrutiny?",
    options: ["Only the colour of the busbars", "Only the ventilation", "The torque settings of bolted connections", "Only the busbar material"],
    correctAnswer: "The torque settings of bolted connections",
    explanation: "During detailed inspection of busbar chambers, the torque settings of bolted connections require particular scrutiny. Incorrect torque can lead to high-resistance joints, overheating, and potential failure under load. Correctly tightened bolted connections are critical for safe current transfer between conductors."
  },
  {
    id: 'level3inspect8',
    question: "What effect does the presence of third harmonic currents have on neutral conductor testing in a three-phase system?",
    options: ["No effect on testing requirements", "Reduces the importance of neutral testing", "Requires special attention to neutral sizing and connections", "Eliminates the need for testing"],
    correctAnswer: "Requires special attention to neutral sizing and connections",
    explanation: "Third harmonic currents (and other triplen harmonics) add in the neutral rather than canceling out, potentially causing the neutral current to exceed phase currents in three-phase systems. This requires special attention during testing to ensure neutral conductors and connections are adequately sized and in good condition."
  },
  {
    id: 'level3inspect9',
    question: "When testing a high-integrity earthing system for a medical location, what maximum earth electrode resistance would be acceptable?",
    options: ["10 ohms", "5 ohms", "1 ohm", "0.5 ohms"],
    correctAnswer: "0.5 ohms",
    explanation: "For high-integrity earthing systems in medical locations (particularly Group 2 medical locations like operating theaters), the maximum acceptable earth electrode resistance is typically 0.5 ohms. This stringent requirement ensures minimal potential differences during fault conditions in these safety-critical environments."
  },
  {
    id: 'level3inspect10',
    question: "What is the primary purpose of Z2 measurement when testing an installation?",
    options: ["To measure the earth electrode resistance", "To measure the earth fault path impedance from the origin of the installation", "To verify RCD operation", "To test Phase-Neutral impedance"],
    correctAnswer: "To measure the earth fault path impedance from the origin of the installation",
    explanation: "The Z2 measurement (also known as Ze) measures the earth fault path impedance from the origin of the installation. This value is critical for calculating the total earth fault loop impedance and verifying that protective devices will operate within required disconnection times under fault conditions."
  },
  {
    id: 'level3inspect11',
    question: "What is the correct safe sequence for proving test instruments on an electrical installation?",
    options: ["Test on known supply, test on circuit to be tested, then test on known supply again", "Test on circuit to be tested only", "Test on known supply only", "Test on circuit to be tested, then on known supply only"],
    correctAnswer: "Test on known supply, test on circuit to be tested, then test on known supply again",
    explanation: "The correct sequence for proving test instruments is: first test on a known live supply, then test on the circuit to be tested, and finally test on a known supply again. This 'live-dead-live' approach verifies the instrument is working before and after the test, ensuring reliable results."
  },
  {
    id: 'level3inspect12',
    question: "When performing earth loop impedance tests where the measured value exceeds the maximum permitted in BS 7671, but all other tests are satisfactory, what is the most appropriate action?",
    options: ["Ignore the result as all other tests passed", "Issue a compliance certificate with no comments", "Issue a certificate noting the non-compliance as a departure requiring improvement", "Condemn the entire installation"],
    correctAnswer: "Issue a certificate noting the non-compliance as a departure requiring improvement",
    explanation: "When earth loop impedance exceeds maximum permitted values, but other tests are satisfactory, the appropriate action is to issue a certificate noting the non-compliance as a departure requiring improvement. This transparently documents the deficiency while acknowledging that immediate danger may not be present."
  },
  {
    id: 'level3inspect13',
    question: "When inspecting a power factor correction capacitor bank, what specific aspect should be verified?",
    options: ["Only the physical dimensions", "The operation of discharge devices", "Only the manufacturer's name", "Only the colour of the capacitors"],
    correctAnswer: "The operation of discharge devices",
    explanation: "When inspecting power factor correction capacitor banks, the operation of discharge devices is particularly important. These devices safely discharge the stored energy in capacitors after disconnection from the supply, preventing shock hazards during maintenance. Their proper function must be verified according to BS 7671."
  },
  {
    id: 'level3inspect14',
    question: "What is the most appropriate method for measuring the earth fault loop impedance of a final circuit protected by a 300mA time-delayed RCD?",
    options: ["Standard loop impedance test at full current", "Bypassing the RCD", "Using Zs = Ze + (R1 + R2) calculation method", "No testing is required"],
    correctAnswer: "Using Zs = Ze + (R1 + R2) calculation method",
    explanation: "For circuits protected by 300mA time-delayed RCDs, the Zs = Ze + (R1 + R2) calculation method is most appropriate. This involves measuring the external earth fault loop impedance (Ze) at the origin and adding the measured resistance of the circuit conductors (R1 + R2), avoiding RCD tripping during testing."
  },
  {
    id: 'level3inspect15',
    question: "What is the appropriate test voltage for measuring insulation resistance of SELV circuits under BS 7671?",
    options: ["250V DC", "500V DC", "1000V DC", "50V DC"],
    correctAnswer: "250V DC",
    explanation: "For SELV (Safety Extra-Low Voltage) circuits, the appropriate test voltage for insulation resistance measurement is 250V DC according to BS 7671. This applies to circuits with a nominal voltage up to 50V AC or 120V DC."
  },
  {
    id: 'level3inspect16',
    question: "When measuring prospective fault current at a distribution board, what is the significance of the value measured between line conductors being higher than between line and neutral?",
    options: ["The test instrument is faulty", "This is normal due to the phase angle difference in a three-phase system", "The neutral conductor is undersized", "There is an earth fault"],
    correctAnswer: "This is normal due to the phase angle difference in a three-phase system",
    explanation: "In a three-phase system, the prospective fault current between line conductors (phase-to-phase) being higher than between line and neutral (phase-to-neutral) is normal. This is due to the 120° phase angle difference between phases, resulting in a higher voltage (by a factor of √3) and consequently higher fault current."
  },
  {
    id: 'level3inspect17',
    question: "What is the most appropriate method for testing the operation of an insulation monitoring device (IMD) in a medical IT system?",
    options: ["Standard insulation resistance test", "Creating a controlled first fault condition", "Measuring earth loop impedance only", "Pressing the test button only without verification"],
    correctAnswer: "Creating a controlled first fault condition",
    explanation: "The most appropriate method for testing an IMD in a medical IT system is creating a controlled first fault condition (typically through a test resistor) to verify the device correctly detects the fault, provides appropriate alarms, and continues to monitor for a second fault, as required in medical Group 2 locations."
  },
  {
    id: 'level3inspect18',
    question: "When testing continuity of protective conductors in a large industrial installation, why is it important to test at both ends of long cable runs?",
    options: ["To get an average reading", "To verify connection and identify high-resistance joints", "To determine the cable length", "It is not important; one end is sufficient"],
    correctAnswer: "To verify connection and identify high-resistance joints",
    explanation: "Testing continuity of protective conductors at both ends of long cable runs is important to verify the connection is complete throughout and to identify high-resistance joints that might not be apparent from a single-end test. This is particularly important for safety in industrial installations with long cable runs."
  },
  {
    id: 'level3inspect19',
    question: "What is the maximum disconnection time for a 400V circuit supplying mobile equipment according to BS 7671?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "0.1 seconds"],
    correctAnswer: "0.2 seconds",
    explanation: "For a circuit supplying mobile equipment operating at 400V, the maximum disconnection time for fault protection is 0.2 seconds according to BS 7671, which is more stringent than the standard 0.4 seconds for fixed equipment above 230V, reflecting the increased risk associated with mobile equipment."
  },
  {
    id: 'level3inspect20',
    question: "When testing a new installation with RCDs protecting multiple circuits, what specific test should be performed in addition to standard RCD tests?",
    options: ["Verify that all circuit protective conductors are connected to the correct terminals at the RCD", "Test every socket on every circuit", "Only test the most convenient circuit", "No additional tests are required"],
    correctAnswer: "Verify that all circuit protective conductors are connected to the correct terminals at the RCD",
    explanation: "In addition to standard RCD tests, it's essential to verify that all circuit protective conductors are connected to the correct terminals at the RCD. This ensures the RCD can detect earth leakage currents from all protected circuits, preventing dangerous situations where an incorrectly connected CPC could bypass RCD protection."
  },
  {
    id: 'level3inspect21',
    question: "What type of inspection should be performed on electrical equipment in a hazardous area (ATEX) installation?",
    options: ["Standard visual inspection only", "Inspection by competent person in accordance with IEC 60079-17", "No inspection required if correctly installed", "Inspection by any electrician"],
    correctAnswer: "Inspection by competent person in accordance with IEC 60079-17",
    explanation: "Equipment in hazardous (ATEX) areas requires inspection by a competent person in accordance with IEC 60079-17, which specifies detailed inspection regimes (initial, periodic, visual, close, detailed) for different protection concepts and zones. This specialized knowledge is essential for safety in potentially explosive atmospheres."
  },
  {
    id: 'level3inspect22',
    question: "When performing periodic inspection of emergency lighting systems, what additional verification should be conducted beyond basic functional testing?",
    options: ["Only check that the batteries are present", "Measure illuminance levels at critical locations and compare to design requirements", "Simply press the test button", "Only check that the lights turn on"],
    correctAnswer: "Measure illuminance levels at critical locations and compare to design requirements",
    explanation: "During periodic inspection of emergency lighting, illuminance levels should be measured at critical locations (exit routes, exit signs, fire equipment) and compared to design requirements (typically 1 lux minimum on centerline of escape routes). This verifies the system will provide adequate lighting during an emergency."
  },
  {
    id: 'level3inspect23',
    question: "What is the correct circuit classification for a circuit supplying both emergency and normal lighting in the same area?",
    options: ["Non-essential circuit", "Essential circuit", "Safety services circuit", "Critical circuit"],
    correctAnswer: "Safety services circuit",
    explanation: "A circuit supplying both emergency and normal lighting in the same area should be classified as a safety services circuit, requiring appropriate separation from other circuits, fire protection, enhanced testing requirements, and reliable supply arrangements in accordance with BS 7671 Section 560."
  },
  {
    id: 'level3inspect24',
    question: "What is the maximum value of earth fault loop impedance (Zs) for a 20A Type C circuit breaker providing fault protection?",
    options: ["0.92Ω", "1.84Ω", "2.3Ω", "3.68Ω"],
    correctAnswer: "1.84Ω",
    explanation: "For a 20A Type C circuit breaker, the maximum earth fault loop impedance (Zs) is 1.84Ω. This is calculated from the formula Zs ≤ Uo/Ia, where Uo is 230V and Ia is 5 × In (5 × 20A = 100A) for Type C devices, allowing for a 0.4s disconnection time in standard installations."
  },
  {
    id: 'level3inspect25',
    question: "What impedance value should be used when verifying the adequacy of prospective short circuit current (PSCC) for a circuit breaker?",
    options: ["The phase-earth impedance", "The phase-neutral impedance", "Whichever is higher between phase-phase and phase-neutral", "Whichever is lower between phase-phase and phase-neutral"],
    correctAnswer: "Whichever is lower between phase-phase and phase-neutral",
    explanation: "The lower impedance value between phase-phase and phase-neutral should be used when verifying PSCC adequacy, as this will give the higher (worst-case) fault current value that the protective device must be capable of interrupting safely without damage."
  },
  {
    id: 'level3inspect26',
    question: "What specific test verifies the continuity of ring final circuit conductors?",
    options: ["Standard two-lead continuity test", "End-to-end and cross-connection testing", "Earth fault loop impedance test", "Insulation resistance test"],
    correctAnswer: "End-to-end and cross-connection testing",
    explanation: "Ring final circuits require specific continuity verification through end-to-end testing (measuring resistance of each conductor around the ring) and cross-connection testing (measuring from line to neutral at various points). This confirms the ring is complete and identifies any interconnections or breaks."
  },
  {
    id: 'level3inspect27',
    question: "When performing protective conductor continuity tests, what is the minimum test current recommended in BS 7671?",
    options: ["1mA", "10mA", "200mA", "25A"],
    correctAnswer: "200mA",
    explanation: "BS 7671 recommends a minimum test current of 200mA for protective conductor continuity testing. This relatively high current helps identify high-resistance connections that might not be apparent with lower test currents but could be dangerous under fault conditions."
  },
  {
    id: 'level3inspect28',
    question: "What is the recommended test voltage for insulation resistance testing of a 630V motor?",
    options: ["250V DC", "500V DC", "1000V DC", "2500V DC"],
    correctAnswer: "1000V DC",
    explanation: "For equipment rated between 500V and 1000V (such as a 630V motor), the recommended test voltage for insulation resistance testing is 1000V DC. This follows the standard practice of using a test voltage that exceeds the operational voltage without overstressing the insulation."
  },
  {
    id: 'level3inspect29',
    question: "What should be verified during testing of an earthing system of a TT installation?",
    options: ["Only that an earth rod is present", "The resistance of the earth electrode is less than 200Ω", "Only that the electrode is connected", "Only the cross-sectional area of the earthing conductor"],
    correctAnswer: "The resistance of the earth electrode is less than 200Ω",
    explanation: "In a TT system, the resistance of the earth electrode should be verified to be less than 200Ω when used with a 30mA RCD. This ensures that a fault to earth will generate sufficient current to operate the RCD within the required time, providing effective fault protection."
  },
  {
    id: 'level3inspect30',
    question: "What test method should be used to check the electrical separation of circuits in a construction site transformer?",
    options: ["Standard insulation resistance test", "Earth loop impedance test", "Insulation resistance measurement between primary and secondary windings", "Current measurement only"],
    correctAnswer: "Insulation resistance measurement between primary and secondary windings",
    explanation: "Electrical separation in a construction site transformer should be verified by measuring insulation resistance between primary and secondary windings. This confirms adequate isolation between the windings, ensuring the safety of the separated (reduced voltage) circuit on the secondary side."
  },
  {
    id: 'level3inspect31',
    question: "What is the primary purpose of the 'R2 test' when inspecting and testing an installation?",
    options: ["To measure earth electrode resistance", "To verify the continuity of protective conductors", "To check insulation resistance", "To test RCD operation"],
    correctAnswer: "To verify the continuity of protective conductors",
    explanation: "The R2 test specifically verifies the continuity of protective conductors (CPCs) between the main earthing terminal and the furthest point of each circuit. This confirms that the protective conductors provide a continuous path for fault current, ensuring effective operation of protective devices."
  },
  {
    id: 'level3inspect32',
    question: "When testing the earth electrode resistance of a TT installation, why should the test current be AC rather than DC?",
    options: ["AC is safer than DC", "To match the supply frequency characteristics", "To prevent polarization effects at the electrode-soil interface", "DC testing is equally acceptable"],
    correctAnswer: "To prevent polarization effects at the electrode-soil interface",
    explanation: "AC test current should be used for earth electrode resistance testing to prevent polarization effects at the electrode-soil interface. DC testing can cause electrochemical polarization that leads to inaccurate (typically lower) resistance measurements that don't reflect true performance under fault conditions."
  },
  {
    id: 'level3inspect33',
    question: "What test should be performed to verify the operation of AFDDs (Arc Fault Detection Devices)?",
    options: ["Same as RCD test", "Press the test button only", "Create an actual arc fault", "Use the manufacturer's specific test equipment"],
    correctAnswer: "Use the manufacturer's specific test equipment",
    explanation: "AFDD testing should be performed using the manufacturer's specific test equipment. Unlike RCDs, there is no standardized test method across all manufacturers, and creating actual arc faults would be dangerous. Most AFDDs have test buttons, but manufacturer-specific test equipment provides more comprehensive verification."
  },
  {
    id: 'level3inspect34',
    question: "What is the maximum disconnection time for a TN system circuit supplying fixed equipment operating at 400V as stated in BS 7671?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "1 second"],
    correctAnswer: "0.4 seconds",
    explanation: "According to BS 7671, the maximum disconnection time for a circuit supplying fixed equipment operating at 400V in a TN system is 0.4 seconds. This requirement ensures rapid disconnection to minimize the risk of electric shock from indirect contact."
  },
  {
    id: 'level3inspect35',
    question: "When testing an installation with surge protection devices (SPDs), what specific verification must be performed?",
    options: ["No specific testing required", "Visual inspection only", "Verification of correct installation, selection, and coordination", "Current injection test at full rating"],
    correctAnswer: "Verification of correct installation, selection, and coordination",
    explanation: "For surge protection devices, verification must include checking correct installation (connection method, conductor lengths), selection (appropriate Type 1/2/3 for the location), and coordination between different SPD stages. Unlike some protective devices, SPDs are not typically tested with applied test currents during inspection."
  },
  {
    id: 'level3inspect36',
    question: "What is the maximum resistance value of supplementary bonding conductors between simultaneously accessible exposed conductive parts in a special location?",
    options: ["0.05Ω", "0.1Ω", "0.2Ω", "1.0Ω"],
    correctAnswer: "0.1Ω",
    explanation: "The maximum resistance value for supplementary bonding conductors between simultaneously accessible exposed conductive parts in special locations (like bathrooms) is 0.1Ω according to BS 7671. This ensures potential differences between exposed parts during a fault are limited to safe levels."
  },
  {
    id: 'level3inspect37',
    question: "When conducting periodic inspection of an installation where no previous records exist, what is the most appropriate approach?",
    options: ["Skip the inspection due to lack of records", "Replace the entire installation", "Conduct a comprehensive inspection and testing regime as if it were an initial verification", "Only perform a limited visual inspection"],
    correctAnswer: "Conduct a comprehensive inspection and testing regime as if it were an initial verification",
    explanation: "When no previous records exist, the most appropriate approach is to conduct a comprehensive inspection and testing regime similar to an initial verification. This establishes a baseline for the installation's condition and compliance, allowing for appropriate recommendations and future periodic inspection planning."
  },
  {
    id: 'level3inspect38',
    question: "What specific test verifies the correct wiring of an unswitched single-phase socket outlet?",
    options: ["Polarity test", "Earth loop impedance test", "RCD test", "Insulation resistance test"],
    correctAnswer: "Polarity test",
    explanation: "A polarity test specifically verifies the correct wiring of a socket outlet, ensuring that the line conductor connects to the correct terminal (usually right-hand side or marked L), the neutral to the left/N terminal, and the earth to the earth terminal. This prevents dangerous reversed polarity situations."
  },
  {
    id: 'level3inspect39',
    question: "What is the correct classification for a non-conformance that is not an immediate danger but should be improved?",
    options: ["C1 - Danger present", "C2 - Potentially dangerous", "C3 - Improvement recommended", "FI - Further investigation required"],
    correctAnswer: "C3 - Improvement recommended",
    explanation: "A non-conformance that is not an immediate danger but should be improved is classified as C3 (Improvement recommended) on an Electrical Installation Condition Report (EICR). This indicates the installation does not comply with regulations but is not considered dangerous."
  },
  {
    id: 'level3inspect40',
    question: "What specific check must be performed on RCDs protecting circuits in special locations such as swimming pools?",
    options: ["Annual testing only", "Only checking the test button operates", "Measurement of trip time at both 50% and 100% of rated residual operating current", "No special requirements beyond standard testing"],
    correctAnswer: "Measurement of trip time at both 50% and 100% of rated residual operating current",
    explanation: "RCDs in special locations such as swimming pools require verification of non-operation at 50% of rated residual current and operation within specified times at 100% of rated residual current. This comprehensive testing is essential due to the increased risks in such locations."
  },
  {
    id: 'level3inspect41',
    question: "What is the maximum earth-loop impedance (Zs) for a 32A Type B circuit breaker ensuring a 0.4 second disconnection time?",
    options: ["0.54Ω", "1.08Ω", "1.44Ω", "2.88Ω"],
    correctAnswer: "1.44Ω",
    explanation: "For a 32A Type B circuit breaker with a 0.4 second disconnection time, the maximum earth-loop impedance (Zs) is 1.44Ω. This is calculated from Zs = Uo/Ia, where Uo = 230V and Ia = 5 × In for Type B devices (5 × 32A = 160A)."
  },
  {
    id: 'level3inspect42',
    question: "What is the most appropriate tool for measuring the cross-sectional area of existing conductors during an inspection?",
    options: ["Standard rulers", "Micrometer", "Wire gauge (SWG) tool or digital caliper", "Insulation resistance tester"],
    correctAnswer: "Wire gauge (SWG) tool or digital caliper",
    explanation: "A wire gauge tool (Standard Wire Gauge) or digital caliper is the most appropriate tool for measuring conductor cross-sectional area during inspection. These tools allow accurate measurement of conductor diameter, which can be converted to cross-sectional area for verification against requirements."
  },
  {
    id: 'level3inspect43',
    question: "What is the correct test for confirming 'double-pole switching' is present in a circuit where required?",
    options: ["Polarity test", "Continuity test", "Voltage measurements in various switch positions", "Visual inspection only"],
    correctAnswer: "Voltage measurements in various switch positions",
    explanation: "To confirm double-pole switching is correctly implemented, voltage measurements should be taken in various switch positions to verify that both line and neutral conductors are disconnected when the switch is in the off position, ensuring complete isolation of the circuit."
  },
  {
    id: 'level3inspect44',
    question: "When verifying protective conductor sizing during inspection, what specific calculation must be performed for circuit lengths exceeding 50m?",
    options: ["No special calculation required", "The adiabatic equation (k-factor method)", "R1+R2 measurement only", "Voltage drop calculation only"],
    correctAnswer: "The adiabatic equation (k-factor method)",
    explanation: "For circuit lengths exceeding 50m, the adiabatic equation (k-factor method) should be used to verify protective conductor sizing, as the simplified method in BS 7671 tables only applies to shorter circuits. This calculation ensures the conductor can withstand fault currents without excessive temperature rise."
  },
  {
    id: 'level3inspect45',
    question: "What specific aspect should be verified when inspecting a supply to an electric vehicle charging point?",
    options: ["Only the cable type", "Only the earthing arrangement", "Correct RCD type (Type A or Type B) based on the charging equipment", "Only the voltage level"],
    correctAnswer: "Correct RCD type (Type A or Type B) based on the charging equipment",
    explanation: "When inspecting EV charging points, verification of the correct RCD type is critical. BS 7671 requires Type B RCD protection where the charging equipment may produce DC fault currents, or Type A where the equipment includes appropriate DC fault protection."
  },
  {
    id: 'level3inspect46',
    question: "What is the correct interpretation of a measured value of 0.00Ω during a continuity test?",
    options: ["Perfect continuity with zero resistance", "Test leads not in contact with the circuit", "Probable short-circuit between test leads", "Battery in tester is depleted"],
    correctAnswer: "Probable short-circuit between test leads",
    explanation: "A reading of exactly 0.00Ω during continuity testing typically indicates a short-circuit between test leads rather than actual circuit measurement. All conductors have some resistance, however small, so a true zero reading is physically impossible and suggests an error in the test setup."
  },
  {
    id: 'level3inspect47',
    question: "What inspection regime should be applied to electrical equipment in a Zone 1 hazardous area according to IEC 60079-17?",
    options: ["Annual visual inspection only", "Close inspection every 6 months", "Detailed inspection at least every 3 years, with more frequent visual and close inspections", "No specific regime required"],
    correctAnswer: "Detailed inspection at least every 3 years, with more frequent visual and close inspections",
    explanation: "For Zone 1 hazardous areas, IEC 60079-17 recommends a detailed inspection at least every 3 years, combined with more frequent visual and close inspections (typically annually and every 6-12 months respectively). This tiered approach ensures comprehensive safety monitoring for these high-risk areas."
  },
  {
    id: 'level3inspect48',
    question: "What is the correct procedure when measuring the insulation resistance of a circuit with electronic devices that could be damaged by the test voltage?",
    options: ["Test the entire circuit at a reduced test voltage", "Skip the test entirely", "Disconnect sensitive electronic devices before testing at the standard voltage", "Test only non-electronic portions of the circuit"],
    correctAnswer: "Disconnect sensitive electronic devices before testing at the standard voltage",
    explanation: "When a circuit contains sensitive electronic devices, they should be disconnected before applying the standard insulation resistance test voltage. This protects the electronic devices from potential damage while still allowing proper testing of the circuit wiring insulation at the required test voltage."
  },
  {
    id: 'level3inspect49',
    question: "What specialized test equipment is needed when verifying the effectiveness of lightning protection systems?",
    options: ["Standard multimeter", "High-current earth tester with long test leads for fall-of-potential testing", "Standard RCD tester", "Normal insulation resistance tester"],
    correctAnswer: "High-current earth tester with long test leads for fall-of-potential testing",
    explanation: "Lightning protection system verification requires a high-current earth tester with long test leads for fall-of-potential (3-point) testing. This equipment allows accurate measurement of earth electrode resistance, which is critical for ensuring the system can safely dissipate lightning energy to ground."
  },
  {
    id: 'level3inspect50',
    question: "What is the primary factor affecting the test results when measuring insulation resistance of long cable runs?",
    options: ["Cable color", "Ambient temperature", "Cable manufacturer", "Time of day"],
    correctAnswer: "Ambient temperature",
    explanation: "Ambient temperature is the primary factor affecting insulation resistance measurements of long cable runs. Insulation resistance decreases as temperature increases, so temperature correction factors must be applied when comparing measurements taken at different temperatures to ensure valid assessment of insulation condition."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-inspection-testing', 'items', q.id), {
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
