// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3ElectricalSciencePrinciples.ts

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

// ✅ Level 3 Electrical Science & Principles Questions
const questions = [
  {
    id: 'level3elecsci1',
    question: "What is the relationship between magnetic flux, area, and magnetic flux density?",
    options: ["Magnetic flux equals area divided by flux density", "Magnetic flux equals flux density multiplied by area", "Magnetic flux equals flux density divided by area", "Magnetic flux equals the square root of flux density multiplied by area"],
    correctAnswer: "Magnetic flux equals flux density multiplied by area",
    explanation: "Magnetic flux (Φ) is the product of magnetic flux density (B) and the area (A) through which it passes: Φ = B × A. The unit of magnetic flux is the weber (Wb)."
  },
  {
    id: 'level3elecsci2',
    question: "According to Faraday's Law of Electromagnetic Induction, what determines the magnitude of the induced EMF in a conductor?",
    options: ["Only the resistance of the conductor", "Only the strength of the magnetic field", "The rate of change of magnetic flux linkage", "The square of the current in the conductor"],
    correctAnswer: "The rate of change of magnetic flux linkage",
    explanation: "Faraday's Law states that the magnitude of the induced EMF is proportional to the rate of change of magnetic flux linkage. The formula is E = -N(dΦ/dt), where N is the number of turns in the coil, and dΦ/dt is the rate of change of flux."
  },
  {
    id: 'level3elecsci3',
    question: "What happens to the impedance of a purely capacitive circuit when the frequency of the AC supply is doubled?",
    options: ["It doubles", "It halves", "It remains the same", "It becomes four times larger"],
    correctAnswer: "It halves",
    explanation: "The impedance of a purely capacitive circuit is given by Xc = 1/(2πfC). When frequency (f) is doubled, the capacitive reactance (Xc) is halved, meaning the impedance is reduced by half."
  },
  {
    id: 'level3elecsci4',
    question: "What is the power factor of a purely inductive circuit?",
    options: ["0 leading", "0 lagging", "1", "0.5 lagging"],
    correctAnswer: "0 lagging",
    explanation: "In a purely inductive circuit, the current lags the voltage by 90°. The power factor, which is the cosine of the phase angle between voltage and current, is cos(90°) = 0, and it is lagging because the current lags the voltage."
  },
  {
    id: 'level3elecsci5',
    question: "What is the resonant frequency of a series RLC circuit with R = 10Ω, L = 50mH, and C = 2μF?",
    options: ["159.2 Hz", "50.3 Hz", "503 Hz", "1,592 Hz"],
    correctAnswer: "503 Hz",
    explanation: "The resonant frequency of a series RLC circuit is given by f = 1/(2π√(LC)). Substituting L = 50mH = 0.05H and C = 2μF = 2 × 10^-6 F: f = 1/(2π√(0.05 × 2 × 10^-6)) = 503 Hz. Note that the resistance value doesn't affect the resonant frequency."
  },
  {
    id: 'level3elecsci6',
    question: "What effect does the skin effect have on conductors carrying high-frequency alternating current?",
    options: ["It increases the conductor's resistance", "It decreases the conductor's resistance", "It has no effect on resistance", "It only affects the insulation properties"],
    correctAnswer: "It increases the conductor's resistance",
    explanation: "Skin effect causes alternating current to flow predominantly near the surface of a conductor, effectively reducing the usable cross-sectional area. This increases the effective resistance of the conductor, particularly at high frequencies."
  },
  {
    id: 'level3elecsci7',
    question: "What is the total impedance of a circuit with a resistance of 12Ω and an inductive reactance of 5Ω connected in series?",
    options: ["7Ω", "13Ω", "17Ω", "60Ω"],
    correctAnswer: "13Ω",
    explanation: "In a series circuit, the total impedance Z is calculated using the formula Z = √(R² + X²), where R is resistance and X is reactance. Therefore, Z = √(12² + 5²) = √(144 + 25) = √169 = 13Ω."
  },
  {
    id: 'level3elecsci8',
    question: "Which semiconductor material is most commonly used in power electronic devices such as rectifiers and thyristors?",
    options: ["Germanium", "Gallium arsenide", "Silicon", "Graphene"],
    correctAnswer: "Silicon",
    explanation: "Silicon is the most commonly used semiconductor material in power electronic devices due to its excellent combination of electrical properties, thermal stability, abundance, and cost-effectiveness."
  },
  {
    id: 'level3elecsci9',
    question: "What theorem states that any complex network of voltage sources and resistors can be replaced by a single voltage source and a single resistor?",
    options: ["Kirchhoff's Law", "Ohm's Law", "Thevenin's Theorem", "Norton's Theorem"],
    correctAnswer: "Thevenin's Theorem",
    explanation: "Thevenin's Theorem states that any linear network of voltage sources and resistors can be replaced by an equivalent circuit consisting of a single voltage source (Thevenin voltage) in series with a single resistor (Thevenin resistance)."
  },
  {
    id: 'level3elecsci10',
    question: "What happens to the power in a three-phase circuit if one phase fails (becomes open-circuit)?",
    options: ["Power reduces to zero", "Power reduces to two-thirds", "Power remains the same", "Power increases"],
    correctAnswer: "Power reduces to two-thirds",
    explanation: "If one phase of a balanced three-phase system fails (open-circuit), the power reduces to approximately two-thirds of the original power, assuming the remaining two phases continue to operate normally with balanced loads."
  },
  {
    id: 'level3elecsci11',
    question: "What is meant by a 'transfer function' in electrical engineering?",
    options: ["The process of transferring energy between conductors", "A mathematical representation of the relationship between input and output of a system", "The ratio of real power to apparent power", "The efficiency of an electrical machine"],
    correctAnswer: "A mathematical representation of the relationship between input and output of a system",
    explanation: "A transfer function is a mathematical model that describes the relationship between the input and output of a system in terms of either the Laplace transform or the frequency domain, commonly used in control systems and signal processing."
  },
  {
    id: 'level3elecsci12',
    question: "In a transformer, what determines the turns ratio?",
    options: ["The physical size of the transformer", "The ratio of primary voltage to secondary voltage", "The ratio of input power to output power", "The type of core material used"],
    correctAnswer: "The ratio of primary voltage to secondary voltage",
    explanation: "The turns ratio of a transformer is determined by the ratio of primary voltage to secondary voltage, which is equal to the ratio of the number of turns in the primary winding to the number of turns in the secondary winding."
  },
  {
    id: 'level3elecsci13',
    question: "What is the key advantage of a brushless DC motor over a conventional brushed DC motor?",
    options: ["Lower cost", "Simpler construction", "Higher reliability and reduced maintenance", "Lower operating voltage"],
    correctAnswer: "Higher reliability and reduced maintenance",
    explanation: "Brushless DC motors offer higher reliability and reduced maintenance because they eliminate the brushes and commutator found in conventional DC motors, which are common wear items and sources of failure."
  },
  {
    id: 'level3elecsci14',
    question: "What is the purpose of 'commutation' in a DC motor?",
    options: ["To convert AC to DC", "To reverse the direction of current in the armature windings at appropriate times", "To regulate the speed", "To increase the torque"],
    correctAnswer: "To reverse the direction of current in the armature windings at appropriate times",
    explanation: "Commutation in a DC motor is the process of reversing the direction of current in the armature windings at appropriate times as the rotor rotates, ensuring continuous rotation in one direction by maintaining the correct magnetic field orientation."
  },
  {
    id: 'level3elecsci15',
    question: "In a balanced three-phase system, what is the relationship between line voltage (VL) and phase voltage (Vp) in a star (wye) connection?",
    options: ["VL = Vp", "VL = Vp × √3", "VL = Vp ÷ √3", "VL = 3 × Vp"],
    correctAnswer: "VL = Vp × √3",
    explanation: "In a star (wye) connected three-phase system, the line voltage (voltage between lines) is √3 times the phase voltage (voltage between line and neutral): VL = Vp × √3."
  },
  {
    id: 'level3elecsci16',
    question: "What causes 'cogging torque' in permanent magnet motors?",
    options: ["Friction in the bearings", "The interaction between the rotor magnets and stator teeth", "Inadequate lubrication", "Voltage fluctuations"],
    correctAnswer: "The interaction between the rotor magnets and stator teeth",
    explanation: "Cogging torque is caused by the interaction between the permanent magnets on the rotor and the teeth of the stator. It results in preferred rotor positions even when no current is flowing, creating a non-smooth rotation particularly at low speeds."
  },
  {
    id: 'level3elecsci17',
    question: "In a three-phase induction motor, what determines the synchronous speed?",
    options: ["The applied voltage", "The supply frequency and number of poles", "The rotor resistance", "The load torque"],
    correctAnswer: "The supply frequency and number of poles",
    explanation: "The synchronous speed of a three-phase induction motor is determined by the formula ns = 60f/p, where ns is synchronous speed in RPM, f is the supply frequency in Hz, and p is the number of pole pairs."
  },
  {
    id: 'level3elecsci18',
    question: "What is the primary cause of voltage drop in transmission lines?",
    options: ["Weather conditions", "Line inductance and resistance", "Type of insulation used", "Operating temperature only"],
    correctAnswer: "Line inductance and resistance",
    explanation: "Voltage drop in transmission lines is primarily caused by the impedance of the line (comprising resistance and inductance) interacting with the current flowing through it, as described by Ohm's Law."
  },
  {
    id: 'level3elecsci19',
    question: "What is the power triangle in AC circuits used to represent?",
    options: ["The physical layout of transmission towers", "The relationship between real power, reactive power, and apparent power", "The voltage relationship in a three-phase system", "The delta connection of transformers"],
    correctAnswer: "The relationship between real power, reactive power, and apparent power",
    explanation: "The power triangle is a graphical representation showing the relationship between real power (P), reactive power (Q), and apparent power (S) in AC circuits. The angle of the triangle represents the phase angle between voltage and current."
  },
  {
    id: 'level3elecsci20',
    question: "What is the operating principle of a Variable Frequency Drive (VFD)?",
    options: ["Changing the number of poles in a motor", "Converting fixed frequency AC to variable frequency AC to control motor speed", "Adjusting the motor slip", "Varying the supply voltage only"],
    correctAnswer: "Converting fixed frequency AC to variable frequency AC to control motor speed",
    explanation: "A Variable Frequency Drive operates by converting fixed frequency AC input to DC (rectification), then converting this DC to variable frequency AC output (inversion). By controlling both frequency and voltage, it precisely controls motor speed and torque."
  },
  {
    id: 'level3elecsci21',
    question: "What does Lenz's Law state regarding electromagnetic induction?",
    options: ["Induced current always flows in the direction of the magnetic field", "The direction of induced EMF is such that it opposes the change that produces it", "Induced current is directly proportional to the magnetic field strength", "The induced EMF enhances the change in magnetic flux"],
    correctAnswer: "The direction of induced EMF is such that it opposes the change that produces it",
    explanation: "Lenz's Law states that the direction of an induced EMF is such that it tends to produce a current which opposes the change in magnetic flux that produced it, which is a manifestation of the conservation of energy."
  },
  {
    id: 'level3elecsci22',
    question: "What is the impedance of a circuit containing a 10Ω resistor in series with a 20Ω capacitive reactance?",
    options: ["10Ω", "20Ω", "22.4Ω", "30Ω"],
    correctAnswer: "22.4Ω",
    explanation: "When a resistor (R) is in series with a capacitive reactance (Xc), the impedance is calculated as Z = √(R² + Xc²). Therefore, Z = √(10² + 20²) = √(100 + 400) = √500 ≈ 22.4Ω."
  },
  {
    id: 'level3elecsci23',
    question: "What is the phase angle between voltage and current in a purely capacitive circuit?",
    options: ["0°", "45°", "90°", "-90°"],
    correctAnswer: "-90°",
    explanation: "In a purely capacitive circuit, current leads voltage by 90°, which can be expressed as a phase angle of -90° (voltage relative to current) or +90° (current relative to voltage)."
  },
  {
    id: 'level3elecsci24',
    question: "What happens to the inductive reactance of a coil when its core material is changed from air to iron?",
    options: ["It decreases", "It increases", "It remains the same", "It becomes zero"],
    correctAnswer: "It increases",
    explanation: "Replacing an air core with an iron core increases the inductance of a coil due to the higher magnetic permeability of iron, which concentrates the magnetic flux. Since inductive reactance (XL = 2πfL) is directly proportional to inductance, the reactance increases."
  },
  {
    id: 'level3elecsci25',
    question: "What is the relationship between slip and efficiency in an induction motor?",
    options: ["Higher slip results in higher efficiency", "Lower slip generally indicates higher efficiency", "Slip and efficiency are unrelated", "Efficiency is maximum at 50% slip"],
    correctAnswer: "Lower slip generally indicates higher efficiency",
    explanation: "Lower slip in induction motors generally indicates higher efficiency because slip represents rotor copper losses. When slip is small, the rotor copper losses are reduced, resulting in higher overall efficiency."
  },
  {
    id: 'level3elecsci26',
    question: "What is meant by 'armature reaction' in a DC generator?",
    options: ["The mechanical reaction of the armature to applied torque", "The effect of armature current on the main field flux", "The chemical reaction in the armature windings", "The response of the armature to temperature changes"],
    correctAnswer: "The effect of armature current on the main field flux",
    explanation: "Armature reaction in a DC generator refers to the effect of the magnetic field produced by the armature current on the main field flux. It tends to distort and weaken the main field, affecting the generator's output."
  },
  {
    id: 'level3elecsci27',
    question: "What is the purpose of a synchroscope in power systems?",
    options: ["To measure power factor", "To indicate synchronization conditions before connecting two AC systems", "To detect harmonics", "To measure system frequency"],
    correctAnswer: "To indicate synchronization conditions before connecting two AC systems",
    explanation: "A synchroscope is used to indicate the conditions necessary for synchronization (matching voltage, frequency, and phase angle) before connecting two AC systems, such as when connecting a generator to the grid or connecting two separate parts of a power system."
  },
  {
    id: 'level3elecsci28',
    question: "What is the principle of operation of a Wheatstone bridge?",
    options: ["Electromagnetic induction", "Balanced resistances producing zero current through a galvanometer", "Rectification of AC to DC", "Power factor correction"],
    correctAnswer: "Balanced resistances producing zero current through a galvanometer",
    explanation: "A Wheatstone bridge operates on the principle that when the ratio of resistances in two parallel branches is equal, no current flows through the galvanometer connected between the branches. This balanced condition is used for precise resistance measurement."
  },
  {
    id: 'level3elecsci29',
    question: "What is the purpose of the dot notation on transformer winding diagrams?",
    options: ["To indicate the physical location of windings", "To show the turn ratio", "To indicate polarity and phase relationships", "To show the connection points to external circuits"],
    correctAnswer: "To indicate polarity and phase relationships",
    explanation: "The dot notation on transformer winding diagrams indicates the polarity and phase relationships between windings. Current entering a dotted terminal of one winding produces flux that induces voltage causing current to leave the dotted terminal of another winding."
  },
  {
    id: 'level3elecsci30',
    question: "What is the effect of connecting capacitors in series?",
    options: ["The total capacitance increases", "The total capacitance decreases", "The total capacitance remains the same", "The capacitance becomes zero"],
    correctAnswer: "The total capacitance decreases",
    explanation: "When capacitors are connected in series, their total capacitance is less than any individual capacitance. The formula for total capacitance is 1/CT = 1/C1 + 1/C2 + ... + 1/Cn, similar to the calculation for parallel resistors."
  },
  {
    id: 'level3elecsci31',
    question: "What is the formula for calculating the impedance of an RLC circuit in series?",
    options: ["Z = R + XL + XC", "Z = √(R² + (XL - XC)²)", "Z = R × XL × XC", "Z = 1/(1/R + 1/XL + 1/XC)"],
    correctAnswer: "Z = √(R² + (XL - XC)²)",
    explanation: "In a series RLC circuit, the impedance is calculated as Z = √(R² + (XL - XC)²), where R is resistance, XL is inductive reactance, and XC is capacitive reactance. The reactances are subtracted because they have opposing effects."
  },
  {
    id: 'level3elecsci32',
    question: "What does the 'Q factor' of a tuned circuit represent?",
    options: ["The charge stored in the circuit", "The ratio of reactance to resistance", "The quality of components used", "The quantity of energy dissipated"],
    correctAnswer: "The ratio of reactance to resistance",
    explanation: "The Q factor (quality factor) of a tuned circuit represents the ratio of reactance to resistance. It indicates the circuit's selectivity and is a measure of how efficiently it stores energy relative to the energy it dissipates."
  },
  {
    id: 'level3elecsci33',
    question: "What is the relationship between frequency and inductive reactance?",
    options: ["Inductive reactance is inversely proportional to frequency", "Inductive reactance is directly proportional to frequency", "Inductive reactance is proportional to the square of frequency", "Inductive reactance is independent of frequency"],
    correctAnswer: "Inductive reactance is directly proportional to frequency",
    explanation: "Inductive reactance (XL) is directly proportional to frequency (f), as given by the formula XL = 2πfL, where L is the inductance. As frequency increases, inductive reactance increases linearly."
  },
  {
    id: 'level3elecsci34',
    question: "What is the phase relationship between line currents and line voltages in a balanced delta-connected three-phase load?",
    options: ["Line current leads line voltage by 30°", "Line current lags line voltage by 30°", "Line current and line voltage are in phase", "Line current leads line voltage by 90°"],
    correctAnswer: "Line current and line voltage are in phase",
    explanation: "In a balanced delta-connected three-phase load, line currents and line voltages are in phase with each other (assuming a purely resistive load). The line current is √3 times the phase current and is 30° out of phase with its corresponding phase current."
  },
  {
    id: 'level3elecsci35',
    question: "What is the primary advantage of star-delta starting for three-phase induction motors compared to direct-on-line starting?",
    options: ["Higher starting torque", "Reduced starting current", "Faster acceleration", "Lower complexity"],
    correctAnswer: "Reduced starting current",
    explanation: "Star-delta starting reduces the starting current to approximately one-third of what would occur with direct-on-line starting, which reduces the stress on the power supply and the motor. However, this also reduces the starting torque."
  },
  {
    id: 'level3elecsci36',
    question: "What is the function of a Hall effect sensor in electrical systems?",
    options: ["To measure temperature", "To detect voltage fluctuations", "To detect magnetic fields and convert them to electrical signals", "To filter harmonics"],
    correctAnswer: "To detect magnetic fields and convert them to electrical signals",
    explanation: "Hall effect sensors detect magnetic fields and convert them to electrical signals. They are used in various applications including position sensing, current sensing, and speed detection in electrical and electronic systems."
  },
  {
    id: 'level3elecsci37',
    question: "What is the principle behind the operation of a current transformer (CT)?",
    options: ["Voltage step-up and current step-down", "Mutual inductance to produce a secondary current proportional to primary current", "Capacitive coupling between windings", "Direct magnetic coupling without windings"],
    correctAnswer: "Mutual inductance to produce a secondary current proportional to primary current",
    explanation: "A current transformer operates on the principle of mutual inductance, where the primary current induces a proportional current in the secondary winding. The secondary current is typically much smaller and is used for measurement and protection circuits."
  },
  {
    id: 'level3elecsci38',
    question: "What is the effect of adding a series capacitor to a predominantly inductive AC circuit?",
    options: ["It increases the circuit impedance", "It decreases the circuit impedance", "It has no effect on impedance", "It eliminates the inductive effect completely"],
    correctAnswer: "It decreases the circuit impedance",
    explanation: "Adding a series capacitor to a predominantly inductive AC circuit decreases the overall impedance because the capacitive reactance partially cancels out the inductive reactance, reducing the total reactive component of impedance."
  },
  {
    id: 'level3elecsci39',
    question: "What is the relationship between line currents and phase currents in a balanced star-connected three-phase system?",
    options: ["Line current = Phase current × √3", "Line current = Phase current", "Line current = Phase current ÷ √3", "Line current = 3 × Phase current"],
    correctAnswer: "Line current = Phase current",
    explanation: "In a star-connected three-phase system, line currents and phase currents are equal. The relationship IL = Iph holds true because each line is directly connected to one phase winding."
  },
  {
    id: 'level3elecsci40',
    question: "What is meant by 'synchronous reactance' in a synchronous machine?",
    options: ["The reactance that keeps the machine synchronized to the grid", "The combined effect of armature leakage reactance and armature reaction reactance", "The reactance of the field winding", "The reactance due to load variations"],
    correctAnswer: "The combined effect of armature leakage reactance and armature reaction reactance",
    explanation: "Synchronous reactance is a fictitious reactance representing the combined effect of armature leakage reactance and armature reaction reactance in a synchronous machine. It is used in the equivalent circuit to simplify analysis."
  },
  {
    id: 'level3elecsci41',
    question: "Which type of DC motor provides the highest starting torque?",
    options: ["Shunt motor", "Series motor", "Compound motor", "Permanent magnet motor"],
    correctAnswer: "Series motor",
    explanation: "A series DC motor provides the highest starting torque because the torque is proportional to the square of the armature current at low speeds. This is due to the series field winding being in series with the armature, intensifying the field strength at high currents."
  },
  {
    id: 'level3elecsci42',
    question: "What is the purpose of a damper winding in a synchronous machine?",
    options: ["To reduce noise", "To prevent hunting and assist in synchronization", "To protect against overvoltage", "To reduce copper losses"],
    correctAnswer: "To prevent hunting and assist in synchronization",
    explanation: "Damper windings in synchronous machines prevent hunting (oscillations around the synchronous speed) and assist in synchronization by developing torque that helps bring the rotor to synchronous speed. They also provide asynchronous starting torque."
  },
  {
    id: 'level3elecsci43',
    question: "What determines the frequency of the EMF induced in the secondary winding of a transformer?",
    options: ["The number of turns in the secondary winding", "The core material", "The frequency of the primary current", "The secondary load impedance"],
    correctAnswer: "The frequency of the primary current",
    explanation: "The frequency of the EMF induced in the secondary winding of a transformer is the same as the frequency of the primary current. Transformers operate on the principle of electromagnetic induction and maintain the same frequency between input and output."
  },
  {
    id: 'level3elecsci44',
    question: "What causes eddy current losses in a transformer?",
    options: ["Induced currents in the core material", "Hysteresis in the core", "Resistance in the windings", "Leakage flux in the air"],
    correctAnswer: "Induced currents in the core material",
    explanation: "Eddy current losses occur due to circulating currents induced in the core material by the alternating magnetic flux. These currents generate heat, causing energy loss. Laminated cores are used to reduce these losses by increasing the resistance to eddy current flow."
  },
  {
    id: 'level3elecsci45',
    question: "What is the significance of the load angle in a synchronous generator?",
    options: ["It represents the phase difference between stator voltage and current", "It indicates the angle between rotor axis and rotating magnetic field", "It shows the power factor of the load", "It measures the efficiency of the generator"],
    correctAnswer: "It indicates the angle between rotor axis and rotating magnetic field",
    explanation: "The load angle (or power angle) in a synchronous generator represents the angle between the rotor axis (field axis) and the rotating magnetic field (stator axis). It increases with load and is directly related to the power output of the machine."
  },
  {
    id: 'level3elecsci46',
    question: "What is the principle of superposition in electrical circuit analysis?",
    options: ["Combining multiple sources to create a more powerful circuit", "The response to multiple sources equals the sum of responses to each source acting alone", "Using multiple methods to analyze a circuit for verification", "Creating a circuit with redundant components for reliability"],
    correctAnswer: "The response to multiple sources equals the sum of responses to each source acting alone",
    explanation: "The superposition principle states that in a linear circuit with multiple sources, the response to all sources equals the sum of the responses to each source acting alone (with all other sources replaced by their internal impedances)."
  },
  {
    id: 'level3elecsci47',
    question: "What is the function of a freewheeling diode in a switching circuit with an inductive load?",
    options: ["To block reverse current flow", "To provide a path for the inductive current when the switch opens", "To increase switching speed", "To protect against overvoltage from the source"],
    correctAnswer: "To provide a path for the inductive current when the switch opens",
    explanation: "A freewheeling diode provides a path for the inductive current to continue flowing when the switch opens, preventing the high voltage spike that would otherwise occur due to the sudden change in current through the inductor (L×di/dt)."
  },
  {
    id: 'level3elecsci48',
    question: "What is meant by the term 'transconductance' in electronic circuits?",
    options: ["The reciprocal of resistance", "The ratio of output voltage to input voltage", "The ratio of output current to input voltage", "The conductance of transformers"],
    correctAnswer: "The ratio of output current to input voltage",
    explanation: "Transconductance is the ratio of output current to input voltage in a device or circuit. It is commonly associated with active devices like transistors and vacuum tubes, and is measured in siemens (S) or mho."
  },
  {
    id: 'level3elecsci49',
    question: "What is the relationship between the RMS value and peak value of a sinusoidal waveform?",
    options: ["RMS = Peak", "RMS = Peak × √2", "RMS = Peak ÷ √2", "RMS = Peak × 0.637"],
    correctAnswer: "RMS = Peak ÷ √2",
    explanation: "For a sinusoidal waveform, the RMS (Root Mean Square) value equals the peak value divided by √2, or approximately 0.707 times the peak value. Mathematically, VRMS = Vpeak ÷ √2."
  },
  {
    id: 'level3elecsci50',
    question: "What is the typical phase sequence for a three-phase system in the UK?",
    options: ["R-Y-B", "R-B-Y", "L1-L2-L3", "A-B-C"],
    correctAnswer: "L1-L2-L3",
    explanation: "The typical phase sequence notation for a three-phase system in the UK according to BS 7671 is L1-L2-L3. Historically, other notations such as R-Y-B (Red-Yellow-Blue) were used, but the modern standard uses L1, L2, and L3 for the three phases."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'electrical-l3-science-principles', 'items', q.id), {
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
  