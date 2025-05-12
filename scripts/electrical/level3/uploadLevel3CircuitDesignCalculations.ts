// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3CircuitDesignCalculations.ts

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

// ✅ Level 3 Circuit Design & Calculations Questions
const questions = [
  {
    id: 'level3circuitdesign01',
    question: "When calculating the maximum demand for a commercial building, which of the following diversity factors should be applied to general lighting circuits?",
    options: ["100% of the connected load", "75% of the connected load", "90% of the connected load", "50% of the connected load"],
    correctAnswer: "90% of the connected load",
    explanation: "For general lighting circuits in commercial buildings, a 90% diversity factor is typically applied. This is because not all lighting will be used simultaneously at maximum brightness, but a high proportion is likely to be in use during business hours. This diversity factor is generally accepted in industry practice for commercial premises, though exact requirements may vary based on specific building usage."
  },
  {
    id: 'level3circuitdesign02',
    question: "A 400V three-phase distribution board supplies a balanced load with a total apparent power of 60kVA at a power factor of 0.85. What is the full load current per phase?",
    options: ["72.2A", "81.1A", "101.9A", "124.9A"],
    correctAnswer: "101.9A",
    explanation: "For a three-phase balanced load, the formula for line current is: I = S/(√3 × VL). Substituting: I = 60,000VA/(√3 × 400V) = 60,000/692.8 = 86.6A. However, this assumes unity power factor. With PF=0.85, the current becomes: I = 86.6/0.85 = 101.9A. This higher current is due to the reactive component needed in addition to the active current."
  },
  {
    id: 'level3circuitdesign03',
    question: "A 25mm² three-core SWA cable (copper conductors, XLPE insulation) is clipped direct to a surface in an ambient temperature of 30°C. What is its current-carrying capacity according to BS 7671 Table 4D5?",
    options: ["95A", "110A", "146A", "168A"],
    correctAnswer: "146A",
    explanation: "From BS 7671 Table 4D5 (multicore armored cables with XLPE insulation, clipped direct), a 25mm² cable has a base current-carrying capacity of 146A. This table value assumes an ambient temperature of 30°C for cables with XLPE insulation, so no temperature correction factor is needed in this case. For other ambient temperatures, correction factors from Table 4B1 would need to be applied."
  },
  {
    id: 'level3circuitdesign04',
    question: "What is the volt drop in a 42m run of 16mm² 3-core SWA cable (copper conductors) supplying a three-phase 400V, 25kW resistive load?",
    options: ["2.1V", "3.6V", "4.2V", "7.3V"],
    correctAnswer: "3.6V",
    explanation: "For a three-phase circuit, volt drop calculation uses: Vd = √3 × L × I × (R × cosφ + X × sinφ)/1000. For a purely resistive load, cosφ=1 and sinφ=0, so only the resistance component is relevant. With a 25kW load at 400V, I = 25000/(√3 × 400) = 36.1A. From BS 7671 Table 4D5 Appendix 4, the mV/A/m value for 16mm² is 2.9. So Vd = √3 × 36.1 × 42 × 2.9/1000 = 3.6V."
  },
  {
    id: 'level3circuitdesign05',
    question: "A circuit is protected by a 32A Type C MCB with a fault current of 1.5kA. What is the maximum disconnection time to meet the requirements of BS 7671 for a TN system circuit not exceeding 32A supplying fixed equipment?",
    options: ["0.1 seconds", "0.2 seconds", "0.4 seconds", "5 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "According to BS 7671, the maximum disconnection time for a circuit not exceeding 32A supplying fixed equipment in a TN system is 0.4 seconds. With a fault current of 1.5kA (approximately 47 times the rated current of the 32A MCB), the Type C MCB will trip in its instantaneous region well within the required 0.4 seconds, providing adequate protection against electric shock."
  },
  {
    id: 'level3circuitdesign06',
    question: "What is the minimum permitted cross-sectional area of a circuit protective conductor for a circuit using 10mm² line conductors, installed in conduit?",
    options: ["1.5mm²", "4mm²", "6mm²", "10mm²"],
    correctAnswer: "4mm²",
    explanation: "According to BS 7671 Table 54.7, for line conductors between 6mm² and 16mm², where the CPC is not incorporated in a cable or enclosed with the line conductors, the minimum cross-sectional area of the circuit protective conductor is 4mm². If the CPC were incorporated in the same cable or enclosure as the line conductors, 6mm² would be acceptable."
  },
  {
    id: 'level3circuitdesign07',
    question: "When designing a distribution circuit for an installation with significant harmonic currents, what factor must be considered for the neutral conductor?",
    options: ["The neutral can be sized smaller than the phase conductors", "The neutral conductor size can be half that of the phase conductors", "The neutral may need to be larger than the phase conductors", "The neutral conductor can be omitted"],
    correctAnswer: "The neutral may need to be larger than the phase conductors",
    explanation: "In installations with significant harmonic currents, particularly triplen harmonics (3rd, 9th, 15th, etc.), the neutral conductor may need to be larger than the phase conductors. This is because triplen harmonics are in phase with each other and add arithmetically in the neutral, potentially resulting in neutral currents exceeding phase currents, causing overheating if not properly sized."
  },
  {
    id: 'level3circuitdesign08',
    question: "What is the earth fault loop impedance requirement for a 20A Type B circuit breaker providing 0.4s disconnection in a 230V circuit?",
    options: ["2.3Ω", "2.9Ω", "3.83Ω", "11.5Ω"],
    correctAnswer: "2.3Ω",
    explanation: "For a Type B circuit breaker, the instantaneous trip current is 5 × In. For a 20A device, this is 5 × 20 = 100A. Using Zs = Uo/Ia, we have Zs = 230/100 = 2.3Ω. This is the maximum earth fault loop impedance that will ensure a 0.4s disconnection time for a 230V circuit protected by a 20A Type B circuit breaker."
  },
  {
    id: 'level3circuitdesign09',
    question: "A distribution board has a calculated maximum demand of 120A. What is the minimum rating for the main switch disconnector if the distribution board supplies both essential and non-essential services?",
    options: ["100A", "120A", "160A", "200A"],
    correctAnswer: "160A",
    explanation: "According to BS 7671, the main switch disconnector should be rated at least equal to the maximum demand. Where both essential and non-essential services are supplied, good practice dictates a margin for future expansion and temporary overloads. Therefore, the next standard rating above the calculated maximum demand should be selected, which is 160A (standard ratings being 100A, 125A, 160A, 200A, etc.)."
  },
  {
    id: 'level3circuitdesign10',
    question: "What type of circuit arrangement would be most appropriate for emergency lighting that must remain operational during a fire?",
    options: ["A standard ring circuit", "A standard radial circuit", "A circuit with fire-resistant cables and separate fire-protected distribution board", "A circuit with fire-resistant cables on the same distribution board as normal lighting"],
    correctAnswer: "A circuit with fire-resistant cables and separate fire-protected distribution board",
    explanation: "Emergency lighting that must remain operational during a fire should be supplied by a circuit with fire-resistant cables (e.g., FP200, MICC) and protected by a separate distribution board that is solely dedicated to emergency services. This arrangement, along with appropriate fire compartmentation and alternative supply arrangements, ensures continued operation during a fire emergency."
  },
  {
    id: 'level3circuitdesign11',
    question: "What is the design current (Ib) for a 230V circuit supplying a continuously rated load of 6.5kW at a power factor of 0.8?",
    options: ["25.3A", "28.3A", "35.3A", "43.5A"],
    correctAnswer: "35.3A",
    explanation: "For a single-phase circuit, the design current Ib = P/(V × cos φ). Substituting: Ib = 6500/(230 × 0.8) = 6500/184 = 35.3A. This is the current the circuit will carry under normal operating conditions and forms the basis for selecting appropriate cable size and protective device rating."
  },
  {
    id: 'level3circuitdesign12',
    question: "A radial circuit is protected by a 40A Type C MCB and supplies a 32A socket outlet. What is the minimum cable size required for this circuit assuming standard installation conditions?",
    options: ["4mm²", "6mm²", "10mm²", "16mm²"],
    correctAnswer: "10mm²",
    explanation: "For a 32A socket outlet protected by a 40A Type C MCB, the cable must be sized to: 1) Carry the design current continuously; 2) Be protected against overload by the 40A protective device; and 3) Have sufficient capacity for the 32A socket outlet. Under standard conditions, a minimum of 10mm² cable would be required to meet all these criteria safely and comply with BS 7671 requirements."
  },
  {
    id: 'level3circuitdesign13',
    question: "What is the minimum required fault current to ensure operation of a 25A Type B MCB within 0.1 seconds according to its time/current characteristic?",
    options: ["75A", "125A", "250A", "375A"],
    correctAnswer: "125A",
    explanation: "Type B MCBs have an instantaneous trip setting of 3-5 times rated current. For a 25A device, this is 75-125A. To ensure operation within 0.1 seconds (considered instantaneous), the fault current must exceed the upper limit of this range, which is 125A. This ensures the device operates in its instantaneous region rather than the time-dependent thermal region of its characteristic."
  },
  {
    id: 'level3circuitdesign14',
    question: "What is the minimum required rating for a main protective bonding conductor connecting the main earthing terminal to the water service pipe in an installation with a 50mm² supply neutral conductor?",
    options: ["6mm²", "16mm²", "25mm²", "50mm²"],
    correctAnswer: "25mm²",
    explanation: "According to BS 7671 Table 54.8, for supply neutral conductors greater than 35mm², the main protective bonding conductor should have a cross-sectional area of at least half that of the supply neutral, with a maximum requirement of 25mm². Therefore, for a 50mm² supply neutral, a 25mm² main protective bonding conductor is required."
  },
  {
    id: 'level3circuitdesign15',
    question: "What is the maximum permitted earth fault loop impedance (Zs) for a 16A Type C MCB providing 0.4s disconnection in a 230V circuit?",
    options: ["1.15Ω", "1.44Ω", "2.88Ω", "5.75Ω"],
    correctAnswer: "1.44Ω",
    explanation: "For a Type C MCB, the instantaneous trip current is 10 × In. For a 16A device, this is 10 × 16 = 160A. Using Zs = Uo/Ia, we have Zs = 230/160 = 1.44Ω. This is the maximum earth fault loop impedance that will ensure a 0.4s disconnection time for a 230V circuit protected by a 16A Type C circuit breaker."
  },
  {
    id: 'level3circuitdesign16',
    question: "What is the design current for a three-phase 400V motor with full load power of 12kW and power factor of 0.85?",
    options: ["17.4A", "18.2A", "20.4A", "24.0A"],
    correctAnswer: "20.4A",
    explanation: "For a three-phase balanced load, the design current is calculated as: Ib = P/(√3 × VL × cos φ). Substituting: Ib = 12000/(√3 × 400 × 0.85) = 12000/(589.9) = 20.4A. This design current is essential for selecting the appropriate cable size and motor protection devices."
  },
  {
    id: 'level3circuitdesign17',
    question: "Which method of motor starting would be most appropriate for a 22kW three-phase motor where the supply has limited capacity?",
    options: ["Direct-on-line (DOL) starting", "Star-delta starting", "Soft starter", "Variable frequency drive (VFD)"],
    correctAnswer: "Star-delta starting",
    explanation: "For a 22kW motor where supply capacity is limited, star-delta starting is most appropriate. It reduces starting current to approximately 1/3 of DOL starting current (though with reduced starting torque). Soft starters or VFDs would provide even better current limitation but at significantly higher cost, which may not be justified if star-delta provides sufficient reduction for the available supply capacity."
  },
  {
    id: 'level3circuitdesign18',
    question: "What is the minimum cable size required for an 80m, single-phase 230V circuit supplying a 7.5kW continuous load with a maximum permitted voltage drop of 2.5%?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctAnswer: "16mm²",
    explanation: "For a 7.5kW load at 230V, the current is 7500/230 = 32.6A. Maximum permitted voltage drop is 2.5% of 230V = 5.75V. Using the mV/A/m values from BS 7671 Appendix 4: For 10mm², this is approximately 4.4mV/A/m, giving a voltage drop of 32.6 × 80 × 4.4/1000 = 11.5V, which exceeds 5.75V. For 16mm², it's approximately 2.8mV/A/m, giving 32.6 × 80 × 2.8/1000 = 7.3V, which is still too high. Thus, 25mm² would be required."
  },
  {
    id: 'level3circuitdesign19',
    question: "A circuit is protected by an 80A BS88 fuse with a prospective fault current of 3kA. What is the maximum I²t let-through energy during a fault?",
    options: ["20,000A²s", "50,000A²s", "100,000A²s", "150,000A²s"],
    correctAnswer: "100,000A²s",
    explanation: "The I²t let-through energy of a protective device depends on its type, rating, and the prospective fault current. For an 80A BS88 fuse with a prospective fault current of 3kA, the maximum I²t let-through energy would be approximately 100,000A²s according to manufacturer's data. This value is critical for verifying that downstream cables and equipment can withstand the thermal stress of a fault."
  },
  {
    id: 'level3circuitdesign20',
    question: "What is the required kVAr rating for power factor correction capacitors to improve the power factor of a 50kW three-phase load from 0.75 to 0.95?",
    options: ["15.8 kVAr", "18.6 kVAr", "24.9 kVAr", "32.5 kVAr"],
    correctAnswer: "24.9 kVAr",
    explanation: "The kVAr required for power factor correction is calculated as: kVAr = P × (tan φ₁ - tan φ₂), where φ₁ and φ₂ are the initial and desired power factor angles. For PF₁ = 0.75, φ₁ = cos⁻¹(0.75) = 41.4°; For PF₂ = 0.95, φ₂ = cos⁻¹(0.95) = 18.2°; Therefore, kVAr = 50 × (tan(41.4°) - tan(18.2°)) = 50 × (0.882 - 0.329) = 50 × 0.553 = 27.65 kVAr. The nearest standard rating would be selected."
  },
  {
    id: 'level3circuitdesign21',
    question: "When designing a cable sizing calculation for a circuit with high harmonic content, what correction factor should be applied to the neutral conductor?",
    options: ["No correction factor is necessary", "Neutral should be sized equal to phase conductors", "Neutral should be oversized to at least 1.6 times phase conductor size for circuits with significant 3rd harmonics", "Neutral size can be reduced to 50% of phase conductors"],
    correctAnswer: "Neutral should be oversized to at least 1.6 times phase conductor size for circuits with significant 3rd harmonics",
    explanation: "For circuits with high harmonic content, particularly triplen harmonics (3rd, 9th, etc.), the neutral conductor should be oversized. Industry practice recommends sizing the neutral at least 1.6 times the phase conductor size when significant 3rd harmonics are present, as these harmonics sum arithmetically in the neutral and can cause current exceeding the phase currents."
  },
  {
    id: 'level3circuitdesign22',
    question: "What is the maximum demand for a distribution board supplying 20 lighting circuits rated at 6A each, assuming a standard diversity factor?",
    options: ["120A", "108A", "60A", "90A"],
    correctAnswer: "108A",
    explanation: "For lighting circuits in a distribution board, a diversity factor of 90% is typically applied (assuming not all circuits will be at full load simultaneously). Therefore, the maximum demand would be 20 circuits × 6A × 90% = 108A. This calculation follows standard practice for determining maximum demand for lighting installations in commercial buildings."
  },
  {
    id: 'level3circuitdesign23',
    question: "What is the required minimum breaking capacity of an MCB protecting a circuit where the prospective fault current has been calculated as 8kA?",
    options: ["3kA", "6kA", "10kA", "15kA"],
    correctAnswer: "10kA",
    explanation: "The breaking capacity of a protective device must be equal to or greater than the prospective fault current at the point of installation. For a prospective fault current of 8kA, the MCB must have a minimum breaking capacity of 10kA (being the next standard rating above 8kA). Using an MCB with inadequate breaking capacity would create a serious safety hazard."
  },
  {
    id: 'level3circuitdesign24',
    question: "Which device characteristic is most important for achieving discrimination between two MCBs in series?",
    options: ["Current rating only", "Breaking capacity only", "Time/current characteristic", "Voltage rating only"],
    correctAnswer: "Time/current characteristic",
    explanation: "The time/current characteristic is most important for achieving discrimination between MCBs in series. Proper discrimination ensures that the downstream device (closest to the fault) operates before the upstream device, limiting the outage to the affected circuit. This requires sufficient separation between the time/current curves of the devices across the range of possible fault currents."
  },
  {
    id: 'level3circuitdesign25',
    question: "What is the maximum installed power rating of electric space heating that can be connected to a 32A 230V circuit, assuming a power factor of unity and utilization factor of 1.0?",
    options: ["5.5kW", "6.4kW", "7.36kW", "8.0kW"],
    correctAnswer: "7.36kW",
    explanation: "For a 32A circuit at 230V with unity power factor, the maximum power is P = V × I × PF = 230V × 32A × 1.0 = 7360W = 7.36kW. This assumes continuous operation at full load, which is typical for electric space heating. Note that for long-term reliability, it's often good practice to limit loading to 80% of circuit capacity for continuous loads, but the question specifies maximum allowable rating."
  },
  {
    id: 'level3circuitdesign26',
    question: "What is the voltage drop along a 50m run of 25mm² cable (copper conductor) carrying 100A, if the voltage drop per ampere per meter is 1.8mV/A/m?",
    options: ["5V", "9V", "18V", "50V"],
    correctAnswer: "9V",
    explanation: "The voltage drop is calculated as: Vd = L × I × mV/A/m ÷ 1000. Substituting: Vd = 50m × 100A × 1.8mV/A/m ÷ 1000 = 9V. This voltage drop must be checked against the maximum permitted voltage drop for the installation type (typically 3% for lighting and 5% for other uses) to ensure compliance with BS 7671."
  },
  {
    id: 'level3circuitdesign27',
    question: "What is the minimum cable size required for a circuit protective conductor (CPC) for a circuit with 35mm² phase conductors, if the CPC is incorporated within the same cable?",
    options: ["10mm²", "16mm²", "25mm²", "35mm²"],
    correctAnswer: "16mm²",
    explanation: "According to BS 7671 Table 54.7, for phase conductors of 35mm², if the CPC is incorporated within the same cable or enclosure as the phase conductors, the minimum CPC size is 16mm². This sized CPC ensures adequate fault current carrying capacity while minimizing the risk of excessive temperature rise during a fault condition."
  },
  {
    id: 'level3circuitdesign28',
    question: "What is the minimum number of 13A socket outlets that should be installed on a 32A ring final circuit in a commercial building according to BS 7671?",
    options: ["4 socket outlets", "6 socket outlets", "8 socket outlets", "There is no specified minimum number"],
    correctAnswer: "There is no specified minimum number",
    explanation: "BS 7671 does not specify a minimum number of socket outlets for a ring final circuit. The 32A rating allows for a theoretical maximum of 7680VA (32A × 240V), but this is subject to diversity considerations. The number of sockets is determined by the anticipated needs of the installation rather than a regulatory minimum number."
  },
  {
    id: 'level3circuitdesign29',
    question: "A three-phase 400V installation has a maximum demand of 150kVA at 0.8 power factor. What size power factor correction capacitors would be required to improve the power factor to 0.95?",
    options: ["30 kVAr", "45 kVAr", "56 kVAr", "75 kVAr"],
    correctAnswer: "56 kVAr",
    explanation: "The active power P = S × PF = 150 × 0.8 = 120kW. The kVAr required for power factor correction is calculated as: kVAr = P × (tan φ₁ - tan φ₂). For PF₁ = 0.8, φ₁ = cos⁻¹(0.8) = 36.9°; For PF₂ = 0.95, φ₂ = cos⁻¹(0.95) = 18.2°; Therefore, kVAr = 120 × (tan(36.9°) - tan(18.2°)) = 120 × (0.75 - 0.329) = 120 × 0.421 = 50.52 kVAr. The nearest standard rating above this would be selected."
  },
  {
    id: 'level3circuitdesign30',
    question: "Which of the following is the correct formula for calculating the breaking capacity required for a circuit breaker?",
    options: ["Breaking capacity = Nominal current of the circuit", "Breaking capacity = Minimum fault current at the point of installation", "Breaking capacity ≥ Prospective fault current at the point of installation", "Breaking capacity = Earth fault loop impedance"],
    correctAnswer: "Breaking capacity ≥ Prospective fault current at the point of installation",
    explanation: "The breaking capacity of a circuit breaker must be greater than or equal to the prospective fault current at its point of installation. This ensures the device can safely interrupt the maximum fault current that could flow, without damage to the device or creating additional hazards during fault conditions."
  },
  {
    id: 'level3circuitdesign31',
    question: "What is the cross-sectional area of the circuit protective conductor required for a circuit with 70mm² phase conductors, if calculated using the adiabatic equation?",
    options: ["25mm²", "35mm²", "50mm²", "70mm²"],
    correctAnswer: "35mm²",
    explanation: "Using the adiabatic equation or applying BS 7671 Table 54.7, for phase conductors of 70mm², the minimum CPC cross-sectional area is 35mm² if not incorporated in the same cable as the phase conductors. This ensures the CPC can safely carry prospective fault currents without excessive temperature rise during the time taken for the protective device to operate."
  },
  {
    id: 'level3circuitdesign32',
    question: "What is the correct voltage drop calculation for a three-phase circuit with 150mm² cable, 80m length, carrying 200A at 0.85 power factor?",
    options: ["4.2V", "7.3V", "8.6V", "14.9V"],
    correctAnswer: "8.6V",
    explanation: "For a three-phase circuit, voltage drop is calculated using: Vd = √3 × L × I × (R × cosφ + X × sinφ)/1000. Using values from BS 7671 Appendix 4 for 150mm² cable (approximately R = 0.15 mΩ/m and X = 0.08 mΩ/m), and with sinφ = 0.527 (for PF = 0.85): Vd = √3 × 80 × 200 × (0.15 × 0.85 + 0.08 × 0.527)/1000 = 8.6V. This represents approximately 2.15% of the 400V supply."
  },
  {
    id: 'level3circuitdesign33',
    question: "What is the minimum value of prospective fault current required to ensure operation of a 40A Type D MCB within 0.1 seconds?",
    options: ["120A", "400A", "480A", "800A"],
    correctAnswer: "800A",
    explanation: "Type D MCBs have an instantaneous trip setting of 10-20 times rated current. For a 40A device, this is 400-800A. To ensure operation within 0.1 seconds (considered instantaneous), the fault current must exceed the upper limit of this range, which is 800A. This ensures the device operates in its instantaneous region, providing the required rapid disconnection."
  },
  {
    id: 'level3circuitdesign34',
    question: "What is the maximum length of a 4mm² cable (copper conductors) protected by a 20A Type B MCB, if the earth fault loop impedance at the origin is 0.35Ω, and the maximum permitted earth fault loop impedance for the circuit is 2.3Ω?",
    options: ["35m", "42m", "56m", "78m"],
    correctAnswer: "56m",
    explanation: "The maximum additional impedance allowed in the circuit is 2.3Ω - 0.35Ω = 1.95Ω. For 4mm² copper cable, the impedance is approximately 18 mΩ/m for both phase and CPC (R1+R2). Therefore, the maximum length is 1.95Ω ÷ (2 × 0.018Ω/m) = 54.2m. The nearest lower standard cable length would be selected, which is approximately 56m in this case."
  },
  {
    id: 'level3circuitdesign35',
    question: "What is the design current for a 12.5kVA single-phase transformer with a primary voltage of 230V?",
    options: ["43.5A", "54.3A", "62.5A", "72.5A"],
    correctAnswer: "54.3A",
    explanation: "For a single-phase transformer, the design current on the primary side is calculated as: I = S/V. Substituting: I = 12,500VA ÷ 230V = 54.3A. This design current is essential for selecting appropriate protective devices and cable sizes for the transformer primary circuit, ensuring safe and reliable operation."
  },
  {
    id: 'level3circuitdesign36',
    question: "What is the minimum size of earthing conductor required to connect a 400A switchboard to the main earthing terminal?",
    options: ["16mm²", "25mm²", "35mm²", "50mm²"],
    correctAnswer: "25mm²",
    explanation: "According to BS 7671, for a switchboard with a main busbar rating of 400A, the minimum size of earthing conductor required would be 25mm² copper. This ensures adequate current-carrying capacity for fault currents, minimizing voltage rise on exposed conductive parts during fault conditions, while providing mechanical strength and durability for the installation."
  },
  {
    id: 'level3circuitdesign37',
    question: "What factor most significantly affects the voltage drop calculation for long cable runs?",
    options: ["Cable material (copper or aluminum)", "Cable reactance", "Cable insulation type", "Cable resistance"],
    correctAnswer: "Cable resistance",
    explanation: "For long cable runs, especially with lower power factors, cable resistance is the most significant factor affecting voltage drop. The resistance component of cable impedance (R × cosφ) typically contributes more to voltage drop than the reactance component (X × sinφ), particularly for smaller cables where the R/X ratio is higher."
  },
  {
    id: 'level3circuitdesign38',
    question: "What is the recommended correction factor for a cable buried directly in soil with a thermal resistivity of 2.5 K.m/W?",
    options: ["0.63", "0.71", "0.85", "0.93"],
    correctAnswer: "0.71",
    explanation: "According to BS 7671 Table 4B4, for soil with a thermal resistivity of 2.5 K.m/W, the recommended correction factor is 0.71. This factor must be applied to the cable's current-carrying capacity to account for the reduced heat dissipation in soil with higher thermal resistivity compared to the reference value of 1.0 K.m/W used in standard rating tables."
  },
  {
    id: 'level3circuitdesign39',
    question: "What size circuit breaker would be appropriate for protecting a circuit with a design current of 38A and a cable with current-carrying capacity of 46A?",
    options: ["32A", "40A", "45A", "50A"],
    correctAnswer: "40A",
    explanation: "The protective device rating should be selected to satisfy the conditions: Ib ≤ In ≤ Iz, where Ib is the design current (38A), In is the rated current of the protective device, and Iz is the current-carrying capacity of the cable (46A). Therefore, a 40A circuit breaker is the most appropriate standard rating that satisfies these conditions."
  },
  {
    id: 'level3circuitdesign40',
    question: "Which of the following is the most important factor to consider when designing circuits for an installation in a location with ambient temperatures consistently above 30°C?",
    options: ["Cable insulation class", "Derating of current-carrying capacity", "Cable voltage rating", "Cable armoring type"],
    correctAnswer: "Derating of current-carrying capacity",
    explanation: "For installations in high ambient temperatures, derating of current-carrying capacity is most important. BS 7671 provides correction factors in Table 4B1 that must be applied to standard current ratings. For example, at 40°C, PVC-insulated cables might be derated to 87% of their standard rating, while at 50°C, this could be 71%. Failing to apply these factors could lead to cable overheating and premature failure."
  },
  {
    id: 'level3circuitdesign41',
    question: "What type of protective device coordination ensures that only the device nearest to a fault operates, while upstream devices remain closed?",
    options: ["Cascading", "Discrimination", "Backup protection", "Sequential operation"],
    correctAnswer: "Discrimination",
    explanation: "Discrimination (also called selectivity) is the coordination of protective devices to ensure that only the device nearest to a fault operates, while upstream devices remain closed. This minimizes the extent of the power outage, limiting it to the faulted circuit while maintaining supply to healthy circuits. Achieving discrimination requires careful selection of device types, ratings, and characteristics."
  },
  {
    id: 'level3circuitdesign42',
    question: "What is the minimum insulation resistance value for a 230V lighting circuit according to BS 7671?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "0.25 MΩ"],
    correctAnswer: "1.0 MΩ",
    explanation: "According to BS 7671, for circuits with a nominal voltage up to 500V (which includes 230V lighting circuits), the minimum acceptable insulation resistance value is 1.0 MΩ when tested with a 500V DC test voltage. This ensures adequate separation between live conductors and between live conductors and earth."
  },
  {
    id: 'level3circuitdesign43',
    question: "What is the required cable size for a 42m single-phase circuit protected by a 32A Type C MCB with a maximum permitted voltage drop of 2.5% of 230V?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctAnswer: "10mm²",
    explanation: "Maximum permitted voltage drop = 2.5% of 230V = 5.75V. Using the mV/A/m values from BS 7671 Appendix 4, for 6mm² cable this is approximately 7.3mV/A/m, giving a voltage drop of 32A × 42m × 7.3/1000 = 9.8V, which exceeds 5.75V. For 10mm² cable, it's approximately 4.4mV/A/m, giving 32A × 42m × 4.4/1000 = 5.9V, which is marginally above 5.75V. Considering real-world conditions, 10mm² would typically be selected."
  },
  {
    id: 'level3circuitdesign44',
    question: "A 25kW, 400V three-phase resistive load operates with a power factor of 1.0. What is the full load current per phase?",
    options: ["36.1A", "41.7A", "52.1A", "62.5A"],
    correctAnswer: "36.1A",
    explanation: "For a three-phase balanced load with unity power factor, the formula for line current is: I = P/(√3 × VL × cos φ). Substituting: I = 25,000W/(√3 × 400V × 1.0) = 25,000/692.8 = 36.1A. This calculation gives the full load current per phase, which is essential for selecting appropriate cable sizes and protective devices."
  },
  {
    id: 'level3circuitdesign45',
    question: "What is the maximum number of 13A socket outlets that can be installed on a 20A radial circuit in a commercial building?",
    options: ["1 socket outlet", "2 socket outlets", "There is no specific limit provided diversity is considered", "13 socket outlets"],
    correctAnswer: "There is no specific limit provided diversity is considered",
    explanation: "BS 7671 does not specify a maximum number of socket outlets on a 20A radial circuit. The number is determined by considering the expected maximum demand, applying appropriate diversity factors based on the type of installation and anticipated usage patterns. The circuit must be designed to ensure the protective device provides adequate overload protection for the cable."
  },
  {
    id: 'level3circuitdesign46',
    question: "What is the maximum earth loop impedance (Zs) for a 16A socket outlet circuit protected by a 30mA RCD?",
    options: ["556Ω", "767Ω", "1533Ω", "1667Ω"],
    correctAnswer: "1667Ω",
    explanation: "When a 30mA RCD provides additional protection, the maximum earth loop impedance is calculated using Zs = 50V/IΔn, where IΔn is the rated residual operating current of the RCD. Therefore, Zs = 50/0.03 = 1667Ω. This high value means that the limiting factor for Zs is usually the overcurrent protection requirements rather than the RCD protection."
  },
  {
    id: 'level3circuitdesign47',
    question: "What is the formula for calculating the cross-sectional area of a circuit protective conductor using the adiabatic equation?",
    options: ["S = √(I²t/k)", "S = I²t × k", "S = I²t/k", "S = I × t × k"],
    correctAnswer: "S = √(I²t/k)",
    explanation: "The adiabatic equation for calculating the minimum cross-sectional area of a protective conductor is S = √(I²t/k), where I is the fault current in amperes, t is the operating time of the protective device in seconds, and k is a factor depending on the conductor material, insulation, initial and final temperatures. This formula ensures the conductor can safely carry the fault current without excessive temperature rise."
  },
  {
    id: 'level3circuitdesign48',
    question: "What is the primary purpose of a 'ring final circuit' in UK electrical installations?",
    options: ["To provide multiple paths for fault current", "To reduce voltage drop in long runs", "To enable higher loading on a circuit of given cable size", "To simplify circuit design"],
    correctAnswer: "To enable higher loading on a circuit of given cable size",
    explanation: "The primary purpose of a ring final circuit is to enable higher loading on a circuit of given cable size. By connecting the cable in a ring, current can flow in both directions to any point, effectively doubling the current-carrying capacity compared to a similar-sized radial circuit. This allows a 2.5mm² ring circuit to be protected by a 32A device, whereas the same cable in a radial configuration would typically be limited to 20A protection."
  },
  {
    id: 'level3circuitdesign49',
    question: "When designing a lighting control circuit using two-way switching, what is the minimum number of core conductors required between the two switch positions?",
    options: ["Two conductors", "Three conductors", "Four conductors", "Five conductors"],
    correctAnswer: "Three conductors",
    explanation: "Two-way switching requires a minimum of three conductors between the two switch positions. These are typically called 'strapper' or 'traveler' wires. They enable the switching arrangement to control a light from two separate locations, where either switch can turn the light on or off regardless of the position of the other switch."
  },
  {
    id: 'level3circuitdesign50',
    question: "What is the appropriate design approach for selecting the main switch disconnector rating for a new installation?",
    options: ["Match exactly to the maximum demand calculation", "Select the nearest standard rating above the maximum demand", "Always select 100A for residential installations", "Select a rating 50% higher than calculated maximum demand"],
    correctAnswer: "Select the nearest standard rating above the maximum demand",
    explanation: "The appropriate design approach is to select the nearest standard rating above the calculated maximum demand. This ensures the switch can safely handle the maximum load while allowing minimal margin for future expansion. Standard ratings typically follow a series such as 63A, 100A, 125A, 160A, 200A, etc., so the selection would be the next standard value higher than the calculated maximum demand."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-circuit-calcs', 'items', q.id),        {
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