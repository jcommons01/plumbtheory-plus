// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3FaultDiagnosisRectification.ts

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

// ✅ Level 3 Fault Diagnosis & Rectification Questions
const questions = [
  {
    id: 'level3faultdiag1',
    question: "When diagnosing an RCD that trips immediately on restoration, what is the most likely cause?",
    options: ["RCD is faulty", "High earth leakage current on a circuit", "Loose neutral connection", "RCD is the wrong rating"],
    correctAnswer: "High earth leakage current on a circuit",
    explanation: "An RCD that trips immediately on restoration typically indicates high earth leakage current on one or more of the protected circuits. The fault might be due to damaged insulation, moisture ingress, or a connected device with high leakage current."
  },
  {
    id: 'level3faultdiag2',
    question: "Which diagnostic method is most efficient when investigating a fault affecting multiple circuits on one phase of a three-phase distribution board?",
    options: ["Testing each circuit individually", "Isolating the main incomer", "Dividing circuits into groups and testing each group", "Checking the phase voltage only"],
    correctAnswer: "Dividing circuits into groups and testing each group",
    explanation: "When a fault affects multiple circuits on one phase, the 'divide and conquer' approach (splitting circuits into groups) is most efficient. This binary search method quickly narrows down the faulty circuit or section, saving time compared to testing each circuit individually."
  },
  {
    id: 'level3faultdiag3',
    question: "What is the most appropriate first step when diagnosing a fault in an industrial motor control circuit that fails to start?",
    options: ["Replace the motor", "Check for voltage at the motor terminals", "Dismantle the control circuit", "Check the control circuit supply and fuses/MCBs"],
    correctAnswer: "Check the control circuit supply and fuses/MCBs",
    explanation: "The most appropriate first step is to check the control circuit supply and protection devices (fuses/MCBs), as loss of control voltage is a common cause of motor starting failure. This simple check can identify basic issues before proceeding to more complex diagnostics."
  },
  {
    id: 'level3faultdiag4',
    question: "When an emergency lighting system fails its functional test, what is the most systematic approach to fault diagnosis?",
    options: ["Replace all batteries immediately", "Inspect individual luminaires, checking batteries, lamps, and circuitry in sequence", "Check only the central battery if applicable", "Replace the entire system"],
    correctAnswer: "Inspect individual luminaires, checking batteries, lamps, and circuitry in sequence",
    explanation: "A systematic approach involves inspecting individual luminaires and checking batteries, lamps, and circuitry in sequence. This identifies whether the fault is system-wide or limited to specific units, and whether it's related to power supply, batteries, lamps, or control circuits."
  },
  {
    id: 'level3faultdiag5',
    question: "When diagnosing a three-phase induction motor that draws excessive current and overheats, what is the most likely cause?",
    options: ["Single-phasing (loss of one phase)", "Low supply voltage", "Mechanical overload", "Capacitor failure"],
    correctAnswer: "Single-phasing (loss of one phase)",
    explanation: "Single-phasing (loss of one phase) will cause a three-phase motor to draw excessive current on the remaining phases and overheat, as it attempts to deliver the same power with reduced input. This condition can quickly damage the motor if not addressed."
  },
  {
    id: 'level3faultdiag6',
    question: "What is the most likely cause of flickering in LED lighting that is controlled by a standard dimmer switch?",
    options: ["Wrong type of driver/incompatible dimmer", "Loose connections", "Incorrect voltage", "LED failure"],
    correctAnswer: "Wrong type of driver/incompatible dimmer",
    explanation: "Flickering in LED lighting controlled by a standard dimmer is most commonly caused by incompatibility between the LED driver and the dimmer type. Standard dimmers designed for resistive loads may not work properly with LED drivers, requiring LED-specific or trailing-edge dimmers."
  },
  {
    id: 'level3faultdiag7',
    question: "When diagnosing a fault in a power factor correction capacitor bank, what symptom would indicate capacitor failure?",
    options: ["Increased system voltage", "Decreased system current", "Reduced power factor despite the bank being energized", "Improved power quality"],
    correctAnswer: "Reduced power factor despite the bank being energized",
    explanation: "A failed capacitor in a power factor correction bank would result in reduced power factor improvement despite the bank being energized. This is because the failed capacitors are not providing the reactive power compensation they were designed for."
  },
  {
    id: 'level3faultdiag8',
    question: "What diagnostic test would most effectively identify a high-resistance joint in a power circuit?",
    options: ["Standard insulation resistance test", "Earth fault loop impedance test", "Thermal imaging under load", "Standard continuity test with low current"],
    correctAnswer: "Thermal imaging under load",
    explanation: "Thermal imaging under load is the most effective way to identify high-resistance joints in power circuits. The high resistance causes localized heating at the joint, which is clearly visible with a thermal camera when the circuit is carrying current."
  },
  {
    id: 'level3faultdiag9',
    question: "When investigating nuisance tripping of circuit breakers in an installation with electronic equipment, what is the most likely cause?",
    options: ["Overloaded circuit", "Short circuit", "High inrush currents", "Electrical noise"],
    correctAnswer: "High inrush currents",
    explanation: "Nuisance tripping with electronic equipment is often caused by high inrush currents that occur when devices are switched on, particularly with switch-mode power supplies, motors, or capacitive loads. These momentary high currents can trip standard MCBs even though the running current is within limits."
  },
  {
    id: 'level3faultdiag10',
    question: "What is the most appropriate test instrument for diagnosing intermittent earth leakage faults that cause occasional RCD tripping?",
    options: ["Standard insulation resistance tester", "Earth fault loop impedance tester", "RCD tester", "Leakage current clamp meter/recorder"],
    correctAnswer: "Leakage current clamp meter/recorder",
    explanation: "A leakage current clamp meter/recorder is most appropriate for diagnosing intermittent earth leakage faults. It can monitor leakage current over time, capturing the intermittent events that cause RCD tripping, which might be missed by spot checks with other instruments."
  },
  {
    id: 'level3faultdiag11',
    question: "When diagnosing voltage imbalance in a three-phase supply, what is the maximum acceptable voltage imbalance according to BS 7671?",
    options: ["± 3%", "± 5%", "± 10%", "± 15%"],
    correctAnswer: "± 10%",
    explanation: "BS 7671 indicates that the voltage imbalance between phases should not exceed ±10% of the nominal voltage. Greater imbalance can cause problems with three-phase equipment, particularly motors, which may overheat even when the average voltage is correct."
  },
  {
    id: 'level3faultdiag12',
    question: "What is the most likely cause of insulation failure in cables installed near industrial process equipment?",
    options: ["Physical damage", "Moisture ingress", "Thermal damage from overloading", "Environmental factors such as excessive heat, chemicals, or UV exposure"],
    correctAnswer: "Environmental factors such as excessive heat, chemicals, or UV exposure",
    explanation: "In industrial settings, insulation failure is often caused by environmental factors such as excessive heat from process equipment, exposure to chemicals, oils, solvents, or UV radiation. These factors can degrade insulation over time even if the cable is properly rated and not overloaded."
  },
  {
    id: 'level3faultdiag13',
    question: "When a variable speed drive (VSD) displays an 'overcurrent' fault, what is the most systematic diagnostic approach?",
    options: ["Immediately replace the drive", "Check only the motor", "Check the drive parameters, then investigate load, motor, and cable conditions in sequence", "Reset the drive repeatedly until it works"],
    correctAnswer: "Check the drive parameters, then investigate load, motor, and cable conditions in sequence",
    explanation: "A systematic approach to an overcurrent fault in a VSD is to first check drive parameters (acceleration time, current limits), then investigate the mechanical load (binding, excessive load), motor condition (bearings, windings), and finally the cable integrity and connections between drive and motor."
  },
  {
    id: 'level3faultdiag14',
    question: "What is the most accurate method to identify the specific circuit causing harmonic distortion in a three-phase distribution system?",
    options: ["Standard voltage measurements", "Current measurements only", "Power quality analyzer with harmonic spectrum analysis at various points", "Visual inspection of the installation"],
    correctAnswer: "Power quality analyzer with harmonic spectrum analysis at various points",
    explanation: "A power quality analyzer with harmonic spectrum analysis capabilities, used to take measurements at various points in the system, is the most accurate method to identify the specific circuit causing harmonic distortion. It can identify both the harmonic frequencies present and their source."
  },
  {
    id: 'level3faultdiag15',
    question: "When diagnosing electromagnetic interference affecting sensitive electronic equipment, what is the most likely coupling mechanism?",
    options: ["Resistive coupling", "Capacitive coupling", "Inductive coupling", "Moisture coupling"],
    correctAnswer: "Inductive coupling",
    explanation: "Inductive coupling is the most common mechanism for electromagnetic interference in sensitive electronic equipment. It occurs when changing magnetic fields from one circuit (e.g., power cables, transformers, motors) induce currents in another circuit's conductors according to Faraday's Law."
  },
  {
    id: 'level3faultdiag16',
    question: "What is the most appropriate test for diagnosing an intermittent connection in a fire alarm circuit?",
    options: ["Standard insulation resistance test", "Continuity test with bell set", "Voltage drop test under load", "Current measurement only"],
    correctAnswer: "Continuity test with bell set",
    explanation: "A continuity test with a bell set (or buzzer continuity tester) is most appropriate for finding intermittent connections in fire alarm circuits. The audible indicator allows the technician to flex and manipulate cables while listening for momentary breaks in continuity that might not be caught with a digital meter."
  },
  {
    id: 'level3faultdiag17',
    question: "When investigating why a UPS system repeatedly transfers to battery despite normal mains presence, what is the most likely cause?",
    options: ["Faulty UPS", "Incorrect battery configuration", "Mains supply quality issues (voltage sags, spikes, or frequency variations)", "Overloaded UPS"],
    correctAnswer: "Mains supply quality issues (voltage sags, spikes, or frequency variations)",
    explanation: "UPS systems transfer to battery when they detect mains quality issues. If this happens repeatedly with normal mains presence, the most likely cause is power quality problems like voltage sags, spikes, or frequency variations that fall outside the UPS input tolerance but may not be obvious without power quality monitoring."
  },
  {
    id: 'level3faultdiag18',
    question: "What test equipment would be most suitable for diagnosing the cause of nuisance tripping on an AFDD (Arc Fault Detection Device)?",
    options: ["Standard multimeter", "Insulation resistance tester", "Power quality analyzer", "RCD tester"],
    correctAnswer: "Power quality analyzer",
    explanation: "A power quality analyzer would be most suitable for diagnosing nuisance AFDD tripping as it can capture and analyze waveform disturbances that might be interpreted as arcs by the AFDD. These could include normal arcing from switches, brushed motors, or electronic equipment that has similar characteristics to fault arcs."
  },
  {
    id: 'level3faultdiag19',
    question: "Which of the following is most likely to cause multiple electronic ballasts in fluorescent lighting to fail prematurely?",
    options: ["Low voltage", "High ambient temperature", "Transient overvoltages", "Regular switching cycles"],
    correctAnswer: "Transient overvoltages",
    explanation: "Transient overvoltages (voltage spikes) are most likely to cause premature failure of multiple electronic ballasts. These high-voltage, short-duration events can damage sensitive electronic components in ballasts, particularly in installations without adequate surge protection."
  },
  {
    id: 'level3faultdiag20',
    question: "What is the most effective diagnostic approach for an intermittent earth fault in an underground cable?",
    options: ["Standard insulation resistance testing", "Time Domain Reflectometry (TDR)", "Visual inspection", "Earth fault loop impedance testing"],
    correctAnswer: "Time Domain Reflectometry (TDR)",
    explanation: "Time Domain Reflectometry (TDR) is the most effective diagnostic tool for locating intermittent earth faults in underground cables. It works by sending a pulse down the cable and analyzing the reflections, which can identify the distance to fault locations even if the fault is not present at the time of testing."
  },
  {
    id: 'level3faultdiag21',
    question: "When investigating a transformer that is running excessively hot, what is the most likely cause if the load is within rated limits?",
    options: ["Normal operation", "Harmonic currents", "High ambient temperature", "Too many turns in the primary winding"],
    correctAnswer: "Harmonic currents",
    explanation: "If a transformer is running excessively hot despite the load being within rated limits, harmonic currents are the most likely cause. Harmonics cause additional heating in the transformer core and windings beyond what would be expected from the fundamental frequency current alone."
  },
  {
    id: 'level3faultdiag22',
    question: "When troubleshooting a data center power distribution unit (PDU) with multiple circuit breaker trips, what is the most likely cause?",
    options: ["Faulty PDU", "Excessive harmonic currents", "Unbalanced loads across phases", "High neutral current due to non-linear loads"],
    correctAnswer: "High neutral current due to non-linear loads",
    explanation: "In a data center environment with many non-linear loads (computers, servers with switch-mode power supplies), high neutral current is a common issue. Triple harmonics (3rd, 9th, 15th) add in the neutral rather than canceling, potentially causing the neutral current to exceed phase currents and trip protection devices."
  },
  {
    id: 'level3faultdiag23',
    question: "What diagnostic approach should be used to identify the cause of nuisance tripping of Type B RCDs protecting equipment with frequency converters?",
    options: ["Replace with standard Type AC RCDs", "Test the RCD with a standard RCD tester", "Measure DC leakage component and high-frequency leakage with specialized equipment", "Simply increase the RCD rating"],
    correctAnswer: "Measure DC leakage component and high-frequency leakage with specialized equipment",
    explanation: "For Type B RCDs (which protect against AC, pulsating DC, and smooth DC earth leakage) that experience nuisance tripping with frequency converters, specialized equipment should be used to measure both DC leakage components and high-frequency leakage that may be caused by the converter's switching elements."
  },
  {
    id: 'level3faultdiag24',
    question: "When diagnosing a fault on a control system that has both 230V AC and 24V DC circuits, what is the safest diagnostic procedure?",
    options: ["Test high voltage circuits first, then low voltage", "Test low voltage circuits first, then high voltage", "Test both simultaneously for efficiency", "It doesn't matter which is tested first"],
    correctAnswer: "Test low voltage circuits first, then high voltage",
    explanation: "The safest procedure is to test low voltage circuits (24V DC) first, then high voltage (230V AC). This approach minimizes risk to the technician, as the low voltage circuits are generally safer to work with and often control the higher voltage circuits, potentially identifying issues without exposure to higher voltages."
  },
  {
    id: 'level3faultdiag25',
    question: "What is the most appropriate test instrument for diagnosing issues with the starting capacitor in a single-phase motor?",
    options: ["Multimeter set to AC volts", "Insulation resistance tester", "Capacitance meter or LCR meter", "Clamp ammeter"],
    correctAnswer: "Capacitance meter or LCR meter",
    explanation: "A capacitance meter or LCR meter is the most appropriate instrument for testing a motor starting capacitor, as it can directly measure the capacitance value and compare it to the rated value. Some advanced instruments can also measure the ESR (Equivalent Series Resistance) to identify degraded capacitors."
  },
  {
    id: 'level3faultdiag26',
    question: "When investigating unacceptably high earth electrode resistance, what is the most effective solution?",
    options: ["Adding more earth rods in series", "Adding more earth rods in parallel", "Using a single longer earth rod", "Connecting to water pipes"],
    correctAnswer: "Adding more earth rods in parallel",
    explanation: "Adding more earth rods in parallel is the most effective solution for reducing earth electrode resistance. Parallel connections reduce the overall resistance according to the formula for parallel resistors. Earth rods should be spaced at least at a distance equal to their driven length to be effective."
  },
  {
    id: 'level3faultdiag27',
    question: "What is the most efficient method to detect the deterioration of insulation in electric motors before failure?",
    options: ["Visual inspection", "Measuring winding resistance", "Polarization Index (PI) testing", "Temperature measurement only"],
    correctAnswer: "Polarization Index (PI) testing",
    explanation: "Polarization Index (PI) testing is the most efficient method for detecting deteriorating insulation in motors before failure. It involves taking the ratio of insulation resistance measurements at different times (typically 1 minute and 10 minutes) during a continuous test, providing insight into insulation quality and moisture content."
  },
  {
    id: 'level3faultdiag28',
    question: "When diagnosing a sudden loss of power to a floor in a commercial building, what is the most efficient first step?",
    options: ["Test all individual circuits", "Check the distribution board supplying the floor", "Inspect each room for faults", "Call the utility company immediately"],
    correctAnswer: "Check the distribution board supplying the floor",
    explanation: "The most efficient first step is to check the distribution board supplying the floor. This quickly identifies whether the issue is with the entire floor supply (e.g., a tripped main switch or MCCB) or if it's more localized, directing further diagnostic efforts appropriately."
  },
  {
    id: 'level3faultdiag29',
    question: "When an electronic device consistently fails after a period of operation, what thermal diagnostic method would be most appropriate?",
    options: ["Single spot temperature measurement", "Continuous thermal monitoring with data logging", "Manual touch testing", "Transient thermal imaging"],
    correctAnswer: "Continuous thermal monitoring with data logging",
    explanation: "Continuous thermal monitoring with data logging is most appropriate for diagnosing failures that occur after a period of operation. This can identify components that gradually overheat before failure, thermal cycling issues, or temperature-dependent faults that might be missed with spot checks or brief inspections."
  },
  {
    id: 'level3faultdiag30',
    question: "What is the most likely cause of welded contacts in a contactor used for motor starting?",
    options: ["Normal wear and tear", "Incorrect coil voltage", "Short cycling (rapid start/stop operations)", "Loose connections"],
    correctAnswer: "Short cycling (rapid start/stop operations)",
    explanation: "Short cycling (rapid and frequent starting and stopping) is the most likely cause of welded contacts in a contactor. The repeated high inrush currents combined with insufficient time for proper arc extinction between operations causes excessive heating and eventual welding of the contact surfaces."
  },
  {
    id: 'level3faultdiag31',
    question: "When diagnosing a fault in a star-delta starter where the motor only 'kicks' but doesn't start properly, what is the most likely cause?",
    options: ["Faulty star contactor", "Faulty delta contactor", "Open circuit in one phase", "Incorrect timer setting"],
    correctAnswer: "Open circuit in one phase",
    explanation: "An open circuit in one phase would cause a three-phase motor to 'kick' but not start properly when using a star-delta starter. In star connection, the motor might create a slight movement, but it cannot develop sufficient torque with one phase missing, particularly under load."
  },
  {
    id: 'level3faultdiag32',
    question: "When diagnosing voltage quality issues in a facility with sensitive equipment, what measurement parameter is most important?",
    options: ["Voltage amplitude only", "Transient overvoltages only", "Comprehensive power quality including voltage sags, swells, transients, and harmonics", "Frequency variations only"],
    correctAnswer: "Comprehensive power quality including voltage sags, swells, transients, and harmonics",
    explanation: "Comprehensive power quality analysis is most important, examining voltage sags, swells, transients, and harmonics. Sensitive equipment may be affected by any of these parameters, and effective remediation requires identifying which specific power quality issues are present."
  },
  {
    id: 'level3faultdiag33',
    question: "What is the most reliable method for detecting partial discharge in high voltage insulation?",
    options: ["Standard insulation resistance testing", "Ultrasonic detection", "Visual inspection", "Standard earth fault loop impedance testing"],
    correctAnswer: "Ultrasonic detection",
    explanation: "Ultrasonic detection is the most reliable method for identifying partial discharge in high voltage insulation. Partial discharges emit ultrasonic sound that can be detected with specialized equipment, allowing for non-invasive detection of insulation deterioration before complete failure occurs."
  },
  {
    id: 'level3faultdiag34',
    question: "When investigating why circuit breakers serving motor loads are frequently tripping despite the motor current being within rating, what is the most likely cause?",
    options: ["Faulty circuit breaker", "Ambient temperature too high", "Harmonic content in the current", "Voltage unbalance"],
    correctAnswer: "Harmonic content in the current",
    explanation: "Harmonic content in the current is likely causing circuit breakers to trip despite the RMS current being within rating. Harmonics can cause additional heating in the breaker's thermal element beyond what would be expected from the fundamental current alone, particularly if the breaker is not designed to handle harmonic-rich loads."
  },
  {
    id: 'level3faultdiag35',
    question: "What is the most appropriate test to determine if a surge protective device (SPD) is still functional?",
    options: ["Insulation resistance test", "Continuity test", "Visual inspection of indicator only", "Specialized SPD tester with applied surge"],
    correctAnswer: "Specialized SPD tester with applied surge",
    explanation: "A specialized SPD tester that applies a controlled surge is the most appropriate test to verify SPD functionality. Simply checking continuity or visual indicators may not reveal degraded performance, while a proper tester can verify the actual clamping voltage and response time to surges."
  },
  {
    id: 'level3faultdiag36',
    question: "When a thermal overload protection device repeatedly trips in a motor circuit, but the motor current is within the rated value, what is the most likely cause?",
    options: ["Faulty overload protection device", "High ambient temperature", "Low supply voltage", "Frequent starts and stops"],
    correctAnswer: "High ambient temperature",
    explanation: "High ambient temperature is the most likely cause of nuisance tripping when the motor current is within rated value. Thermal overload devices are affected by ambient temperature and may need to be derated if installed in hot environments to prevent nuisance tripping."
  },
  {
    id: 'level3faultdiag37',
    question: "What is the most systematic approach when diagnosing a complex intermittent fault in an automated manufacturing system?",
    options: ["Replace components one by one until the fault disappears", "Monitor and log data from multiple test points over time to correlate fault occurrences with system conditions", "Restart the system repeatedly", "Call the manufacturer immediately"],
    correctAnswer: "Monitor and log data from multiple test points over time to correlate fault occurrences with system conditions",
    explanation: "For complex intermittent faults, systematic data logging from multiple test points over time is the most effective approach. This allows correlation between fault occurrences and specific system conditions (temperatures, loads, operations), helping identify patterns that point to the root cause."
  },
  {
    id: 'level3faultdiag38',
    question: "When an emergency generator fails to start automatically during a power outage, what is the most logical sequence for fault diagnosis?",
    options: ["Replace the generator", "Check fuel, battery, and control system in that order", "Call for emergency service immediately", "Check control system, battery, and mechanical systems"],
    correctAnswer: "Check control system, battery, and mechanical systems",
    explanation: "The most logical sequence is to check the control system (automatic transfer switch, start signals), then the battery (most common failure point for starting systems), and finally mechanical systems (fuel, engine condition). This follows the likely fault path from initiation to execution."
  },
  {
    id: 'level3faultdiag39',
    question: "What is the most likely cause of a distribution board showing signs of overheating at neutral busbar connections?",
    options: ["Undersized neutral conductor", "Loose connections", "Normal operation", "Excessive voltage"],
    correctAnswer: "Loose connections",
    explanation: "Loose connections at the neutral busbar are the most likely cause of overheating. Loose connections have higher resistance, causing localized heating (P = I²R) at the connection point. This is a serious fault that can lead to fire if not addressed promptly."
  },
  {
    id: 'level3faultdiag40',
    question: "What is the most appropriate diagnostic approach when LED lighting flickers only when certain appliances operate?",
    options: ["Replace all LED lights", "Add more circuits", "Investigate electromagnetic interference or voltage fluctuations caused by the appliances", "Change the light fittings only"],
    correctAnswer: "Investigate electromagnetic interference or voltage fluctuations caused by the appliances",
    explanation: "When LED lighting flickers only during operation of certain appliances, the most appropriate approach is to investigate electromagnetic interference or voltage fluctuations caused by those appliances. This could be due to inrush currents, harmonic distortion, or conducted/radiated EMI from the appliances."
  },
  {
    id: 'level3faultdiag41',
    question: "When diagnosing lighting circuits that cause miniature circuit breakers (MCBs) to trip during switch-on, what is the most likely cause with LED lighting?",
    options: ["Short circuit", "Earth fault", "High inrush current", "Incorrect cable size"],
    correctAnswer: "High inrush current",
    explanation: "High inrush current is the most likely cause of MCBs tripping when switching on LED lighting circuits. LED drivers can draw momentary inrush currents many times their operating current, especially with multiple fittings on one circuit. Type C or D MCBs may be required instead of standard Type B."
  },
  {
    id: 'level3faultdiag42',
    question: "Which test is most appropriate for diagnosing degraded insulation in motors operated in a damp environment?",
    options: ["Standard continuity test", "Insulation resistance test with temperature correction", "Standard voltage test", "Current measurement only"],
    correctAnswer: "Insulation resistance test with temperature correction",
    explanation: "Insulation resistance testing with temperature correction is most appropriate for motors in damp environments. Moisture affects insulation resistance readings, and temperature correction is essential for meaningful comparison to baseline values or minimum acceptable limits defined in standards."
  },
  {
    id: 'level3faultdiag43',
    question: "When investigating a control system where a PLC occasionally resets without apparent cause, what is the most likely reason?",
    options: ["Programming error", "Power supply noise or momentary dips", "Overheating", "Internal component failure"],
    correctAnswer: "Power supply noise or momentary dips",
    explanation: "Power supply noise or momentary voltage dips are the most likely causes of occasional PLC resets. Control systems are sensitive to power quality issues that may not affect other equipment, particularly transients or short dips that may not be obvious without specialized power quality monitoring."
  },
  {
    id: 'level3faultdiag44',
    question: "What is the most appropriate approach when diagnosing a fault in a building management system (BMS) that controls HVAC, lighting, and access controls?",
    options: ["Replace the entire system", "Check only the main controller", "Systematic isolation of subsystems to identify whether the fault is in the BMS itself or a specific controlled system", "Call the manufacturer immediately"],
    correctAnswer: "Systematic isolation of subsystems to identify whether the fault is in the BMS itself or a specific controlled system",
    explanation: "For complex BMS faults, systematic isolation of subsystems is most appropriate. This identifies whether the issue is in the central BMS control system, communication networks, field controllers, sensors/actuators, or the controlled systems themselves, efficiently directing troubleshooting efforts."
  },
  {
    id: 'level3faultdiag45',
    question: "What is the most likely cause of a three-phase UPS system shutting down with a 'bypass not available' warning?",
    options: ["Battery failure", "Overload condition", "Input supply frequency or voltage outside tolerance", "Fan failure"],
    correctAnswer: "Input supply frequency or voltage outside tolerance",
    explanation: "A 'bypass not available' warning typically indicates that the input supply parameters (voltage, frequency, phase sequence) are outside the acceptable tolerance for the bypass circuit. The UPS cannot transfer to bypass because doing so would expose the load to potentially damaging power conditions."
  },
  {
    id: 'level3faultdiag46',
    question: "When investigating damage to electronic equipment following a lightning storm, what is the most likely path of entry for the surge?",
    options: ["Power supply cables", "Water pipes", "Internal building wiring", "Direct lightning strike"],
    correctAnswer: "Power supply cables",
    explanation: "Power supply cables are the most common entry path for lightning-induced surges that damage electronic equipment. Lightning strikes near power lines can induce voltage surges that travel through the distribution system into buildings, damaging connected equipment unless proper surge protection is installed."
  },
  {
    id: 'level3faultdiag47',
    question: "What is the most efficient approach to diagnose the cause of nuisance tripping of a three-phase circuit breaker where there is no obvious fault?",
    options: ["Replace the circuit breaker immediately", "Increase the circuit breaker rating", "Install temporary recording equipment to monitor current, voltage, and temperature", "Disconnect all loads permanently"],
    correctAnswer: "Install temporary recording equipment to monitor current, voltage, and temperature",
    explanation: "Installing temporary recording equipment (power analyzer, current logger, thermal recorder) is most efficient for diagnosing nuisance tripping without obvious causes. This captures actual operating conditions during normal use and when trips occur, revealing patterns and anomalies that spot checks might miss."
  },
  {
    id: 'level3faultdiag48',
    question: "When a digital protective relay in a motor control center is giving intermittent 'communication error' messages, what is the most likely cause?",
    options: ["Faulty relay", "Electromagnetic interference affecting communication networks", "Incorrect programming", "Overheating"],
    correctAnswer: "Electromagnetic interference affecting communication networks",
    explanation: "Electromagnetic interference (EMI) affecting communication networks is the most likely cause of intermittent communication errors in digital protective relays. This EMI could come from nearby power cables, switching operations, or radio frequency sources, and often affects data communication without disturbing power circuits."
  },
  {
    id: 'level3faultdiag49',
    question: "What is the most appropriate diagnostic method for an electric motor that vibrates excessively?",
    options: ["Current measurement only", "Vibration analysis with frequency spectrum", "Temperature measurement only", "Visual inspection only"],
    correctAnswer: "Vibration analysis with frequency spectrum",
    explanation: "Vibration analysis with frequency spectrum is the most appropriate diagnostic method for excessive motor vibration. The frequency spectrum can differentiate between electrical problems (e.g., unbalanced phases, bearing currents), mechanical issues (e.g., misalignment, bearing wear), and load-related problems by identifying characteristic vibration signatures."
  },
  {
    id: 'level3faultdiag50',
    question: "When testing a lightning protection system that shows higher than acceptable resistance, what is the most likely cause?",
    options: ["Broken down-conductor", "Corroded earth termination", "Incorrect testing procedure", "Insufficient number of air terminals"],
    correctAnswer: "Corroded earth termination",
    explanation: "Corroded earth termination is the most likely cause of high resistance in a lightning protection system. The earth termination (ground connection) is particularly susceptible to corrosion due to soil chemicals and moisture, leading to increased resistance over time. Regular testing and maintenance of these connections is essential."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-fault-diagnosis', 'items', q.id), {
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
