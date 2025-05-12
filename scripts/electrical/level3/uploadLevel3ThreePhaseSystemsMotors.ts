// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3ThreePhaseSystemsMotors.ts

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

// ✅ Level 3 Three-Phase Systems & Motors Questions
const questions = [
  {
    id: 'level3threephase01',
    question: "In a balanced three-phase star-connected system, what is the relationship between line voltage (VL) and phase voltage (Vp)?",
    options: ["VL = Vp", "VL = Vp × √2", "VL = Vp × √3", "VL = Vp × 3"],
    correctAnswer: "VL = Vp × √3",
    explanation: "In a balanced three-phase star-connected system, the line voltage (voltage between lines) is √3 times the phase voltage (voltage between line and neutral). This relationship is due to the 120° phase shift between phases, and can be proven using vector addition."
  },
  {
    id: 'level3threephase02',
    question: "In a balanced three-phase delta-connected system, what is the relationship between line current (IL) and phase current (Ip)?",
    options: ["IL = Ip", "IL = Ip × √2", "IL = Ip × √3", "IL = Ip × 3"],
    correctAnswer: "IL = Ip × √3",
    explanation: "In a balanced three-phase delta-connected system, the line current is √3 times the phase current. This is because each line current is the vector sum of two phase currents at a 60° angle to each other, resulting in the √3 multiplication factor."
  },
  {
    id: 'level3threephase03',
    question: "What is the formula for calculating the power in a balanced three-phase system?",
    options: ["P = VI", "P = √3 × VL × IL", "P = √3 × VL × IL × cos φ", "P = 3 × VL × IL"],
    correctAnswer: "P = √3 × VL × IL × cos φ",
    explanation: "The total active power in a balanced three-phase system is P = √3 × VL × IL × cos φ, where VL is the line voltage, IL is the line current, and cos φ is the power factor. This formula works for both star and delta connections."
  },
  {
    id: 'level3threephase04',
    question: "Which parameter has the most significant impact on the starting current of a direct-on-line (DOL) three-phase induction motor?",
    options: ["Power factor", "Full load current", "Efficiency", "Motor design"],
    correctAnswer: "Motor design",
    explanation: "Motor design has the most significant impact on DOL starting current. Standard induction motors typically draw 5-7 times their full-load current during starting, but this varies considerably based on motor design factors such as rotor resistance, leakage reactance, and magnetic circuit design. Different designs (e.g., Design A, B, C, D) have different starting current characteristics."
  },
  {
    id: 'level3threephase05',
    question: "What is the primary purpose of star-delta starting for three-phase induction motors?",
    options: ["To increase starting torque", "To reduce starting current", "To improve efficiency", "To change motor speed"],
    correctAnswer: "To reduce starting current",
    explanation: "The primary purpose of star-delta starting is to reduce the starting current drawn by the motor. When initially connected in star configuration, the phase voltage is reduced to 1/√3 (approximately 58%) of line voltage, resulting in starting current approximately 1/3 of direct-on-line starting current. This reduces stress on the supply network and the motor itself."
  },
  {
    id: 'level3threephase06',
    question: "What is the effect on starting torque when using star-delta starting instead of direct-on-line starting?",
    options: ["Starting torque increases proportionally to current", "Starting torque remains the same", "Starting torque is reduced to approximately 1/3 of DOL torque", "Starting torque is reduced to approximately 2/3 of DOL torque"],
    correctAnswer: "Starting torque is reduced to approximately 1/3 of DOL torque",
    explanation: "When using star-delta starting, the starting torque is reduced to approximately 1/3 of the direct-on-line starting torque. This is because torque is proportional to the square of the voltage applied to each winding, and in star connection, each winding receives 1/√3 of the voltage it would receive in delta connection."
  },
  {
    id: 'level3threephase07',
    question: "What type of three-phase motor would be most suitable for applications requiring high starting torque and low starting current?",
    options: ["Standard squirrel cage induction motor", "Slip ring (wound rotor) induction motor", "Synchronous motor", "Permanent magnet motor"],
    correctAnswer: "Slip ring (wound rotor) induction motor",
    explanation: "A slip ring (wound rotor) induction motor is most suitable for applications requiring high starting torque with low starting current. External resistors connected to the rotor windings via slip rings provide high starting torque (2-3 times full load torque) while limiting starting current to 1.5-2.5 times full load current. The resistance is gradually reduced as the motor accelerates."
  },
  {
    id: 'level3threephase08',
    question: "What is the primary difference between soft starters and variable frequency drives for three-phase motors?",
    options: ["Soft starters are more efficient during running", "Soft starters control voltage only while VFDs control both frequency and voltage", "Soft starters can only be used with delta-connected motors", "VFDs cannot provide soft starting functionality"],
    correctAnswer: "Soft starters control voltage only while VFDs control both frequency and voltage",
    explanation: "The primary difference is that soft starters only control the voltage applied to the motor during starting and stopping, providing a smoother acceleration and deceleration by gradually increasing/decreasing voltage at fixed frequency. VFDs (variable frequency drives) control both voltage and frequency throughout operation, allowing continuous speed control and more sophisticated motor control capabilities."
  },
  {
    id: 'level3threephase09',
    question: "What is the most likely cause of high current in one phase of a three-phase induction motor?",
    options: ["Low supply voltage", "Loose connection", "Open circuit in one phase of the stator winding", "Bearing failure"],
    correctAnswer: "Open circuit in one phase of the stator winding",
    explanation: "An open circuit in one phase of the stator winding is the most likely cause of high current in the remaining phases. When one phase is open, the motor attempts to produce the same output with only two phases, causing the current in those phases to increase significantly. This condition is sometimes called 'single-phasing' and can cause severe overheating if not detected."
  },
  {
    id: 'level3threephase10',
    question: "What is the function of a thermistor in a motor protection system?",
    options: ["To measure ambient temperature", "To provide overload protection", "To directly sense winding temperature and trigger protection circuits", "To protect against short circuits"],
    correctAnswer: "To directly sense winding temperature and trigger protection circuits",
    explanation: "Thermistors embedded in motor windings directly sense the actual winding temperature (rather than inferring it from current). These positive temperature coefficient (PTC) devices change resistance dramatically at their rated temperature, triggering protection circuits when winding temperature exceeds safe limits, protecting against both overload and cooling system failures."
  },
  {
    id: 'level3threephase11',
    question: "What is the principle behind electronic soft starters for three-phase motors?",
    options: ["They reduce frequency to limit starting current", "They use thyristors to control the voltage applied to the motor", "They add external resistors to the motor circuit", "They switch between star and delta connections"],
    correctAnswer: "They use thyristors to control the voltage applied to the motor",
    explanation: "Electronic soft starters use back-to-back thyristors (SCRs) or triacs in each phase to control the voltage applied to the motor by phase angle control. By gradually increasing the conduction angle, they progressively increase the voltage applied to the motor, providing smooth acceleration and reduced starting current."
  },
  {
    id: 'level3threephase12',
    question: "What protection is specifically required for a star-delta starter to prevent damage during the switching transition?",
    options: ["Overload protection only", "Short circuit protection only", "Time delay between star and delta switching", "Phase failure protection only"],
    correctAnswer: "Time delay between star and delta switching",
    explanation: "A star-delta starter requires a specific time delay (transition period) between disconnecting the star contactor and engaging the delta contactor. This open transition period (typically 40-60ms) ensures the star contactor is fully open before the delta contactor closes, preventing a momentary short circuit between phases that would occur if both contactors were closed simultaneously."
  },
  {
    id: 'level3threephase13',
    question: "What is the primary cause of harmonics in the current waveform when using variable frequency drives?",
    options: ["Motor inefficiency", "The PWM switching technique in the inverter section", "Electromagnetic interference", "Phase imbalance"],
    correctAnswer: "The PWM switching technique in the inverter section",
    explanation: "The primary cause of harmonics when using variable frequency drives is the Pulse Width Modulation (PWM) switching technique in the inverter section. The rapid on-off switching of power semiconductors creates a non-sinusoidal current waveform containing harmonics. These harmonics can cause problems such as overheating in transformers, cables, and motors if not properly managed."
  },
  {
    id: 'level3threephase14',
    question: "What is the purpose of the DC link choke in a variable frequency drive?",
    options: ["To smooth the output voltage", "To reduce harmonics in the input current", "To protect against voltage spikes", "To improve the power factor"],
    correctAnswer: "To reduce harmonics in the input current",
    explanation: "The DC link choke (or DC bus reactor) in a VFD reduces harmonics in the input current by smoothing the DC link current and reducing the peak current drawn by the DC link capacitors. This improves the input current waveform, reduces harmonic distortion fed back to the supply, and can help the drive comply with electromagnetic compatibility (EMC) requirements."
  },
  {
    id: 'level3threephase15',
    question: "What is 'slip' in a three-phase induction motor?",
    options: ["The difference between the rotor's mechanical speed and the stator's magnetic field speed", "The mechanical losses in the bearings", "The rate of change of motor speed", "The efficiency loss in the motor"],
    correctAnswer: "The difference between the rotor's mechanical speed and the stator's magnetic field speed",
    explanation: "Slip in an induction motor is the difference between the synchronous speed (stator's rotating magnetic field speed) and the rotor's actual mechanical speed, usually expressed as a percentage of synchronous speed. Slip is essential for torque production in induction motors, as it enables current induction in the rotor. Typical slip at full load is 2-5% for standard motors."
  },
  {
    id: 'level3threephase16',
    question: "What is the relationship between slip and rotor current in a three-phase induction motor?",
    options: ["Slip decreases as rotor current increases", "Slip and rotor current are unrelated", "Rotor current is directly proportional to slip", "Rotor current is inversely proportional to slip"],
    correctAnswer: "Rotor current is directly proportional to slip",
    explanation: "Rotor current in an induction motor is directly proportional to slip. As the motor is loaded and slows down (increasing slip), the relative speed between the rotor and the rotating magnetic field increases, inducing higher voltages and currents in the rotor. This increased current produces more torque to handle the load, but also increases rotor losses (I²R)."
  },
  {
    id: 'level3threephase17',
    question: "What does the efficiency class IE3 indicate for a three-phase motor according to IEC standards?",
    options: ["Basic efficiency", "Standard efficiency", "Premium efficiency", "Super premium efficiency"],
    correctAnswer: "Premium efficiency",
    explanation: "Under the International Electrotechnical Commission (IEC) efficiency classification system, IE3 indicates 'Premium Efficiency' motors. This is the third tier in the system (above IE1 'Standard Efficiency' and IE2 'High Efficiency') and represents motors with significantly reduced energy losses, typically 15-20% less losses than IE1 motors."
  },
  {
    id: 'level3threephase18',
    question: "What is the primary purpose of a regenerative braking system in a variable frequency drive?",
    options: ["To slow the motor more quickly", "To recover energy during deceleration and feed it back to the supply", "To prevent overheating of the motor", "To protect the drive from overvoltage"],
    correctAnswer: "To recover energy during deceleration and feed it back to the supply",
    explanation: "A regenerative braking system in a VFD allows the drive to recover kinetic energy from the decelerating motor and feed it back to the supply network rather than dissipating it as heat. This improves energy efficiency, particularly in applications with frequent starting and stopping or where loads with high inertia must be rapidly decelerated."
  },
  {
    id: 'level3threephase19',
    question: "What is the primary advantage of a permanent magnet synchronous motor over a standard induction motor?",
    options: ["Lower initial cost", "Higher efficiency, especially at partial loads", "Simpler construction", "Ability to operate without a drive"],
    correctAnswer: "Higher efficiency, especially at partial loads",
    explanation: "Permanent magnet synchronous motors offer higher efficiency, especially at partial loads, because they don't require rotor current to produce magnetic flux (eliminating rotor I²R losses). They maintain synchronous speed regardless of load, have higher power density, better dynamic response, and maintain high efficiency across their speed range, making them increasingly popular despite higher initial costs."
  },
  {
    id: 'level3threephase20',
    question: "Which of the following correctly describes the phase sequence testing method using a rotating field indicator?",
    options: ["Connecting the device across any two phases to verify voltage", "Connecting the device to the three phases in turn to verify continuity", "Connecting all three phases to the device, which will rotate in a specific direction based on the phase sequence", "Using the device to measure the time delay between phases"],
    correctAnswer: "Connecting all three phases to the device, which will rotate in a specific direction based on the phase sequence",
    explanation: "A rotating field indicator (phase rotation meter) has three terminals connected to the three phases of a supply. It contains a small motor which rotates clockwise for the standard phase sequence (L1-L2-L3 or R-Y-B) and counterclockwise for reversed phase sequence. This simple test is critical to prevent motors running in reverse direction."
  },
  {
    id: 'level3threephase21',
    question: "What is the primary function of a three-phase isolator in a motor circuit?",
    options: ["To provide overload protection", "To provide short circuit protection", "To provide a means of safely disconnecting all poles of the supply for maintenance", "To control the motor speed"],
    correctAnswer: "To provide a means of safely disconnecting all poles of the supply for maintenance",
    explanation: "The primary function of a three-phase isolator is to provide a reliable, visible means of disconnecting all poles of the supply for maintenance and emergency purposes. Unlike circuit breakers or contactors, isolators are not designed to break load or fault currents but to ensure complete isolation when maintenance work needs to be performed on the circuit."
  },
  {
    id: 'level3threephase22',
    question: "What is the purpose of a phase failure relay in a three-phase motor control circuit?",
    options: ["To provide overload protection", "To detect the loss of one or more phases and disconnect the motor", "To correct power factor", "To monitor motor temperature"],
    correctAnswer: "To detect the loss of one or more phases and disconnect the motor",
    explanation: "A phase failure relay detects the loss of one or more phases (phase failure) or significant phase imbalance in a three-phase supply and disconnects the motor. This protection is critical because running a three-phase motor with a missing phase (single-phasing) causes severe overheating in the remaining windings, potentially leading to motor burnout."
  },
  {
    id: 'level3threephase23',
    question: "How does a variable frequency drive control the speed of a three-phase induction motor?",
    options: ["By changing the number of poles in the motor", "By adding resistance to the rotor circuit", "By varying the frequency and voltage applied to the motor", "By controlling the power factor"],
    correctAnswer: "By varying the frequency and voltage applied to the motor",
    explanation: "A variable frequency drive controls motor speed by simultaneously varying the frequency and voltage applied to the motor. Since synchronous speed is directly proportional to frequency (Ns = 60f/p), changing frequency directly changes the speed of the rotating magnetic field. Voltage is usually varied proportionally with frequency (V/f control) to maintain constant magnetic flux in the motor core."
  },
  {
    id: 'level3threephase24',
    question: "What is the most accurate way to determine the efficiency of a three-phase motor in an installation?",
    options: ["Reading the nameplate value", "Calculating from current measurements alone", "Direct comparison of electrical input power to mechanical output power", "Estimating based on temperature rise"],
    correctAnswer: "Direct comparison of electrical input power to mechanical output power",
    explanation: "The most accurate way to determine actual motor efficiency is direct comparison of electrical input power (measured with a power analyzer accounting for harmonics and power factor) to mechanical output power (measured with a dynamometer or calculated from torque and speed measurements). This real-world measurement accounts for installation-specific factors that affect efficiency."
  },
  {
    id: 'level3threephase25',
    question: "What is the effect of voltage unbalance on a three-phase induction motor?",
    options: ["Improved efficiency", "Reduced torque pulsations", "Significantly increased heating due to negative sequence currents", "Improved power factor"],
    correctAnswer: "Significantly increased heating due to negative sequence currents",
    explanation: "Voltage unbalance causes significant increased heating in three-phase motors due to negative sequence currents that produce a counter-rotating magnetic field. A voltage unbalance of just 3.5% can increase motor temperature by approximately 25%. This can drastically reduce insulation life and lead to premature failure if not addressed."
  },
  {
    id: 'level3threephase26',
    question: "What is the purpose of vector control (Field Oriented Control) in advanced variable frequency drives?",
    options: ["To reduce harmonics", "To protect against overcurrent", "To separately control torque and magnetic flux for improved dynamic performance", "To eliminate the need for feedback devices"],
    correctAnswer: "To separately control torque and magnetic flux for improved dynamic performance",
    explanation: "Vector control (Field Oriented Control) decomposes the stator current into magnetic flux-producing and torque-producing components, controlling them separately similar to a DC motor. This provides precise, dynamic control of both torque and speed, with rapid response to changing loads, making it ideal for high-performance applications requiring accurate positioning or rapid acceleration/deceleration."
  },
  {
    id: 'level3threephase27',
    question: "What is meant by 'derating factor' when installing a three-phase motor in high ambient temperature conditions?",
    options: ["The reduction in efficiency", "The reduction in maximum permissible load to prevent overheating", "The increased current draw", "The reduction in starting torque"],
    correctAnswer: "The reduction in maximum permissible load to prevent overheating",
    explanation: "The derating factor is the reduction in maximum permissible load (output power) applied to a motor operating in conditions outside its design parameters, such as high ambient temperature. For example, a motor rated for 40°C ambient may need to be derated to 80% of its nameplate power when operating in 50°C ambient to prevent insulation damage from excessive temperature rise."
  },
  {
    id: 'level3threephase28',
    question: "What information does the motor service factor (SF) provide?",
    options: ["The factor by which the motor's lifespan is reduced when continuously overloaded", "The efficiency of the motor at full load", "The allowable additional loading beyond the nameplate rating for short periods", "The ratio of starting current to full load current"],
    correctAnswer: "The allowable additional loading beyond the nameplate rating for short periods",
    explanation: "The service factor (SF) indicates the allowable overload capacity beyond the nameplate rating. For example, a 10kW motor with SF of 1.15 can deliver 11.5kW for short periods without damaging the motor. However, operating in the service factor range increases temperature rise and reduces motor life, so it should not be used for continuous operation."
  },
  {
    id: 'level3threephase29',
    question: "What is the relationship between motor speed and frequency in a three-phase synchronous motor?",
    options: ["Speed is independent of frequency", "Speed is inversely proportional to frequency", "Speed is directly proportional to frequency", "Speed varies with the square of frequency"],
    correctAnswer: "Speed is directly proportional to frequency",
    explanation: "In a synchronous motor, speed is directly proportional to frequency according to the formula: Ns = 120f/p, where Ns is the synchronous speed in RPM, f is the frequency in Hz, and p is the number of poles. Unlike induction motors, synchronous motors rotate exactly at synchronous speed regardless of load (assuming stable operation within rating)."
  },
  {
    id: 'level3threephase30',
    question: "Which of the following motor types is most suitable for applications requiring constant speed regardless of load variations?",
    options: ["Wound rotor induction motor", "Squirrel cage induction motor", "Synchronous motor", "Series wound motor"],
    correctAnswer: "Synchronous motor",
    explanation: "Synchronous motors maintain exact synchronous speed regardless of load variations (within their pull-out torque capacity). This makes them ideal for applications requiring precise constant speed operation, such as generators, timing devices, or process lines where multiple motors must maintain exact speed relationships. Induction motors, by contrast, experience slip that varies with load."
  },
  {
    id: 'level3threephase31',
    question: "What is the primary cause of cogging torque in permanent magnet motors?",
    options: ["Bearing friction", "Winding resistance", "The interaction between permanent magnets and stator teeth", "Eddy currents in the rotor"],
    correctAnswer: "The interaction between permanent magnets and stator teeth",
    explanation: "Cogging torque in permanent magnet motors is caused by the magnetic attraction between the permanent magnets on the rotor and the stator teeth (slots). This creates preferred rotor positions even when no current flows in the windings, resulting in torque ripple during rotation. Cogging torque can cause uneven rotation at low speeds and is particularly problematic in precision motion control applications."
  },
  {
    id: 'level3threephase32',
    question: "What effect does 'skin effect' have on motors operating at high frequencies from a variable frequency drive?",
    options: ["It improves cooling efficiency", "It increases copper losses in the windings", "It enhances torque production", "It reduces magnetic losses"],
    correctAnswer: "It increases copper losses in the windings",
    explanation: "Skin effect causes AC current to flow predominantly near the surface of conductors, effectively reducing the useful cross-sectional area as frequency increases. In motors operating at high frequencies from VFDs, this increases copper losses (I²R) in the windings, reducing efficiency and increasing heating. Motors designed specifically for VFD operation often use multiple smaller parallel conductors to mitigate this effect."
  },
  {
    id: 'level3threephase33',
    question: "What problem can occur if a three-phase motor designed for delta connection is incorrectly connected in star configuration?",
    options: ["Excessive starting current", "Overheating due to overvoltage", "Insufficient torque and overheating due to undervoltage", "Reversed rotation"],
    correctAnswer: "Insufficient torque and overheating due to undervoltage",
    explanation: "If a motor designed for delta connection (e.g., 400V delta) is incorrectly connected in star, the voltage across each winding will be reduced to 1/√3 (approximately 58%) of the rated value. This causes insufficient torque (torque is proportional to V²) and potential overheating as the motor draws higher current trying to develop required torque, potentially leading to winding failure."
  },
  {
    id: 'level3threephase34',
    question: "What is the primary purpose of a DC injection braking system for three-phase motors?",
    options: ["To prevent the motor from starting", "To rapidly bring the motor to a stop", "To prevent phase reversal", "To reduce starting current"],
    correctAnswer: "To rapidly bring the motor to a stop",
    explanation: "DC injection braking rapidly stops a motor by applying DC current to the stator windings after disconnecting the AC supply. The DC current creates a stationary magnetic field that induces currents in the rotor, generating a braking torque. This provides faster stopping than coast-to-stop methods and doesn't require additional mechanical brakes or regenerative capabilities."
  },
  {
    id: 'level3threephase35',
    question: "What is the function of a dynamic braking resistor in a variable frequency drive system?",
    options: ["To improve the power factor", "To limit starting current", "To dissipate energy during motor deceleration", "To filter out harmonics"],
    correctAnswer: "To dissipate energy during motor deceleration",
    explanation: "A dynamic braking resistor dissipates energy during rapid motor deceleration. When a motor decelerates, it acts as a generator, converting mechanical energy back to electrical energy that charges the DC bus capacitors. The braking chopper and resistor provide a controlled path to dissipate this energy as heat when capacitor voltage exceeds safe levels, preventing overvoltage trips."
  },
  {
    id: 'level3threephase36',
    question: "What is the most suitable protection device for a three-phase motor against phase failure or single phasing?",
    options: ["Thermal overload relay", "Phase failure relay", "Circuit breaker", "Earth leakage circuit breaker"],
    correctAnswer: "Phase failure relay",
    explanation: "A phase failure relay is specifically designed to detect loss of one or more phases (single phasing) or severe phase imbalance and disconnect the motor before damage occurs. While thermal overloads will eventually trip under single-phasing conditions (due to increased current in the remaining phases), they may not respond quickly enough to prevent motor damage, especially at light loads."
  },
  {
    id: 'level3threephase37',
    question: "What parameter is most important to verify when replacing a three-phase motor with one from a different manufacturer?",
    options: ["The frame size only", "The power rating only", "The starting current only", "The full load current and starting torque characteristics"],
    correctAnswer: "The full load current and starting torque characteristics",
    explanation: "When replacing a motor, full load current and starting torque characteristics are most important to verify. Motors with the same power rating from different manufacturers may have different efficiency, power factor, and particularly different starting current and torque characteristics. Ensuring these match the application and protection device settings is critical for proper operation."
  },
  {
    id: 'level3threephase38',
    question: "What is the most likely effect of a capacitor bank failure on a three-phase system with power factor correction?",
    options: ["Increased voltage", "Reduced power factor and increased supply current", "Reduced harmonic distortion", "Improved efficiency"],
    correctAnswer: "Reduced power factor and increased supply current",
    explanation: "Capacitor bank failure in a power factor correction system will result in reduced power factor and increased supply current for the same load. This leads to higher I²R losses in supply cables, potential overloading of transformers, and possibly increased electricity costs due to power factor penalties. It may also cause overheating and reduced voltage at the load."
  },
  {
    id: 'level3threephase39',
    question: "What is the primary advantage of an electronic motor protection relay over a traditional thermal overload relay?",
    options: ["Lower cost", "Simpler installation", "Comprehensive protection including phase imbalance, earth fault, and stall detection", "Less maintenance requirements"],
    correctAnswer: "Comprehensive protection including phase imbalance, earth fault, and stall detection",
    explanation: "Electronic motor protection relays offer comprehensive protection beyond simple thermal overload, including phase loss/imbalance detection, earth fault protection, stall detection, under/overvoltage protection, and phase sequence monitoring. They often feature adjustable trip classes, communication capabilities for remote monitoring, and detailed fault diagnostics, providing superior motor protection compared to traditional thermal overload relays."
  },
  {
    id: 'level3threephase40',
    question: "What is the most appropriate method to measure insulation resistance of a three-phase motor?",
    options: ["Using a standard multimeter", "Using a megohmmeter at the appropriate test voltage", "Using a clamp meter", "Using an earth fault loop impedance tester"],
    correctAnswer: "Using a megohmmeter at the appropriate test voltage",
    explanation: "Insulation resistance of motors should be measured using a megohmmeter (insulation tester) at the appropriate test voltage (typically 500V for 400V motors, 1000V for higher voltage motors). The test should be performed between each winding and earth, and between windings, with readings taken at standard intervals (e.g., 1 minute) to calculate polarization index for trending insulation condition."
  },
  {
    id: 'level3threephase41',
    question: "What phenomenon causes an unloaded three-phase induction motor to draw significant magnetizing current?",
    options: ["Bearing friction", "Windage losses", "Magnetic core losses", "The need to establish the magnetic field in the air gap"],
    correctAnswer: "The need to establish the magnetic field in the air gap",
    explanation: "An unloaded induction motor draws significant magnetizing current to establish and maintain the magnetic field in the air gap between stator and rotor. This current, predominantly reactive (lagging), is necessary even when no mechanical power is delivered. It typically ranges from 25-40% of rated full load current, which explains the poor power factor of lightly loaded induction motors."
  },
  {
    id: 'level3threephase42',
    question: "What type of motor is best suited for applications requiring high starting torque with frequent starts and stops?",
    options: ["Standard efficiency IE1 induction motor", "High slip induction motor (Design D)", "Synchronous motor", "High efficiency IE3 induction motor"],
    correctAnswer: "High slip induction motor (Design D)",
    explanation: "High slip (Design D) induction motors are specifically designed for applications requiring high starting torque (275-300% of full load torque) with frequent starts and stops. Their specially designed rotor bars provide high resistance during starting, delivering high torque while limiting current. The higher slip (7-10% at full load) also provides greater thermal capacity to absorb the heating from frequent starting."
  },
  {
    id: 'level3threephase43',
    question: "What happens to the power factor of a standard three-phase induction motor as the load decreases?",
    options: ["Power factor improves (increases)", "Power factor remains constant", "Power factor decreases", "Power factor approaches unity (1.0)"],
    correctAnswer: "Power factor decreases",
    explanation: "As load decreases on a standard induction motor, power factor decreases significantly. This occurs because the active (work-producing) component of current reduces with load, but the magnetizing (reactive) component remains relatively constant. At no load, power factor may be as low as 0.1-0.2, while at full load it typically ranges from 0.8-0.85, depending on motor design."
  },
  {
    id: 'level3threephase44',
    question: "What is the recommended method to identify the leads of an unmarked three-phase motor for correct connection?",
    options: ["Connect randomly and check rotation", "Use an insulation resistance tester to identify windings", "Use a low-voltage battery and indicator to identify winding pairs", "Always connect in a standard pattern"],
    correctAnswer: "Use a low-voltage battery and indicator to identify winding pairs",
    explanation: "For an unmarked motor, the recommended method to identify leads is using a low-voltage battery (or ohmmeter) and indicator to identify winding pairs. Once pairs are identified, standard tests can determine proper phase sequence. This systematic approach avoids potential damage from incorrect connections and ensures proper rotation direction."
  },
  {
    id: 'level3threephase45',
    question: "What phenomenon can cause motor winding failure when a three-phase motor is subjected to frequent starts?",
    options: ["Normal wear and tear", "Thermal stress from high starting currents", "Bearing wear only", "Voltage fluctuations"],
    correctAnswer: "Thermal stress from high starting currents",
    explanation: "Frequent starting subjects motor windings to thermal stress due to high starting currents (typically 5-7 times full load current). The I²R heating during starting is significant, and without sufficient cooling time between starts, heat accumulates in the windings. Motor manufacturers specify maximum starts per hour to prevent insulation breakdown from this cumulative thermal stress."
  },
  {
    id: 'level3threephase46',
    question: "What is meant by 'cogging' in variable frequency drive applications at low speeds?",
    options: ["Excessive current draw", "Uneven rotation due to harmonic distortion", "Jerky motion due to PWM switching frequency", "Motor stopping due to insufficient torque"],
    correctAnswer: "Jerky motion due to PWM switching frequency",
    explanation: "Cogging in VFD applications refers to jerky motor rotation at very low speeds, caused primarily by the interaction between the PWM switching frequency, motor characteristics, and load. It occurs because the VFD cannot maintain smooth sinusoidal current at very low frequencies, resulting in torque pulsations. Advanced VFDs minimize this effect through higher switching frequencies and sophisticated algorithms."
  },
  {
    id: 'level3threephase47',
    question: "What type of motor enclosure is most suitable for a dusty industrial environment?",
    options: ["Open Drip Proof (ODP)", "Totally Enclosed Fan Cooled (TEFC)", "Weather Protected Type I (WPI)", "Open Ventilated (OV)"],
    correctAnswer: "Totally Enclosed Fan Cooled (TEFC)",
    explanation: "Totally Enclosed Fan Cooled (TEFC) motors are most suitable for dusty environments as their enclosure prevents the free exchange of air between the inside and outside of the casing, while still providing effective cooling through an external fan. This protects windings from dust contamination which could otherwise cause insulation breakdown, overheating, and premature failure."
  },
  {
    id: 'level3threephase48',
    question: "What is the most appropriate method for controlling the speed of multiple motors that must maintain synchronization with each other?",
    options: ["Individual VFDs for each motor", "A single VFD controlling all motors", "Direct-on-line starting with mechanical gearing", "Slip ring motors with resistance control"],
    correctAnswer: "A single VFD controlling all motors",
    explanation: "For multiple motors requiring synchronized operation, a single VFD controlling all motors is most appropriate. This ensures all motors receive identical frequency and voltage, maintaining synchronization. Individual VFDs would require complex master-follower arrangements and could introduce slight speed variations. The motors should be properly sized for the application with similar characteristics."
  },
  {
    id: 'level3threephase49',
    question: "What is the maximum continuous operating temperature typically permitted for Class F insulation in a three-phase motor?",
    options: ["105°C", "130°C", "155°C", "180°C"],
    correctAnswer: "155°C",
    explanation: "Class F insulation is rated for a maximum continuous operating temperature of 155°C. This includes the ambient temperature plus the temperature rise during operation. Most manufacturers design Class F insulated motors with a Class B (130°C) temperature rise, providing a 25°C margin (or 'thermal reserve') to extend insulation life and improve reliability."
  },
  {
    id: 'level3threephase50',
    question: "What is the most likely cause of 'shaft voltages' in motors controlled by variable frequency drives?",
    options: ["Incorrect grounding", "Common mode voltage due to high-frequency PWM switching", "Phase imbalance", "Harmonics in the supply"],
    correctAnswer: "Common mode voltage due to high-frequency PWM switching",
    explanation: "Shaft voltages in VFD-controlled motors are primarily caused by common mode voltage resulting from high-frequency PWM switching. These voltages can discharge through motor bearings, causing electrical discharge machining (EDM) that erodes bearing surfaces and leads to premature failure. Mitigation methods include insulated bearings, shaft grounding rings, or common mode filters."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-three-phase', 'items', q.id), {
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
