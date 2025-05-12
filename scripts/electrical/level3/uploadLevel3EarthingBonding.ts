// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3EarthingBonding.ts

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

// ✅ Level 3 Earthing & Bonding Questions
const questions = [
  {
    id: 'level3earthbond01',
    question: "What is the primary purpose of the main equipotential bonding in a TN-C-S (PME) earthing system?",
    options: ["To provide a path for fault current only", "To create an equipotential zone and limit touch voltages under earth fault conditions", "To ensure all metal parts are at the same potential as the MET", "To provide a path for lightning current"],
    correctAnswer: "To create an equipotential zone and limit touch voltages under earth fault conditions",
    explanation: "The primary purpose of main equipotential bonding in a TN-C-S (PME) system is to connect extraneous-conductive-parts to the main earthing terminal, creating an equipotential zone that limits touch voltages between simultaneously accessible conductive parts during earth fault conditions, particularly important with PME due to the risk of PEN conductor failures."
  },
  {
    id: 'level3earthbond02',
    question: "According to BS 7671, which of the following earthing systems provides the most reliable protection in the event of a broken PEN conductor in the supply?",
    options: ["TN-C-S system", "TN-S system", "TT system", "IT system"],
    correctAnswer: "TT system",
    explanation: "A TT system, with its installation earth electrode completely independent of the supply earth, provides the most reliable protection in the event of a broken PEN conductor. Unlike TN-C-S (PME) systems, where a broken PEN conductor can result in dangerous voltages appearing on exposed-conductive-parts, a TT system remains safe as it doesn't rely on the supplier's earthing."
  },
  {
    id: 'level3earthbond03',
    question: "When designing a TT earthing system for an installation, what is the maximum permitted earth electrode resistance (RA) if a 100mA RCD is used for fault protection?",
    options: ["17Ω", "167Ω", "500Ω", "1667Ω"],
    correctAnswer: "500Ω",
    explanation: "For a TT system using an RCD for fault protection, RA × IΔn ≤ 50V must be satisfied. With a 100mA RCD: RA ≤ 50V/0.1A = 500Ω. This ensures that under earth fault conditions, the touch voltage will not exceed the conventional maximum safe value of 50V."
  },
  {
    id: 'level3earthbond04',
    question: "What is the main advantage of an IT earthing system in critical installations?",
    options: ["Lower installation cost", "Simplified design requirements", "Continuity of supply after a single fault to earth", "Reduced earthing requirements"],
    correctAnswer: "Continuity of supply after a single fault to earth",
    explanation: "The main advantage of an IT system is continuity of supply after a single fault to earth. Since the system is either isolated from earth or connected via a high impedance, a first fault results in minimal fault current, allowing continued operation while the fault is located and resolved. This makes IT systems ideal for critical installations like hospital operating theaters."
  },
  {
    id: 'level3earthbond05',
    question: "When installing a 3-pole isolator in a single-phase IT system, what special consideration must be given to the neutral conductor?",
    options: ["The neutral must be connected to earth", "The neutral must not be connected to earth", "The neutral conductor must not be switched", "The neutral conductor must be switched"],
    correctAnswer: "The neutral conductor must be switched",
    explanation: "In an IT system, the neutral conductor must be switched (isolated) along with the line conductor(s). This is because the neutral is not reliably at earth potential in an IT system, and could become energized relative to earth under fault conditions. Therefore, a 3-pole isolator is required for single-phase IT systems to switch both line and neutral."
  },
  {
    id: 'level3earthbond06',
    question: "According to BS 7671, what is the minimum cross-sectional area for a copper main equipotential bonding conductor when the installation's supply neutral conductor is 95mm²?",
    options: ["6mm²", "16mm²", "25mm²", "50mm²"],
    correctAnswer: "25mm²",
    explanation: "When the installation's supply neutral conductor is 95mm², the minimum cross-sectional area for a copper main equipotential bonding conductor is 25mm². According to BS 7671 Table 54.8, for neutrals larger than 35mm², the main bonding conductor should be half the cross-sectional area of the neutral, with a maximum requirement of 25mm²."
  },
  {
    id: 'level3earthbond07',
    question: "When should functional earthing (FE) be used instead of protective earthing (PE)?",
    options: ["When enhanced shock protection is required", "When the installation is supplied by a PME system", "When earthing is required for proper functioning of equipment rather than for safety purposes", "When supplementary bonding is inadequate"],
    correctAnswer: "When earthing is required for proper functioning of equipment rather than for safety purposes",
    explanation: "Functional earthing (FE) should be used when earthing is required for the proper functioning of electrical equipment (e.g., reducing electrical noise in data systems or providing a reference point for electronic circuits) rather than for safety purposes. Unlike protective earthing, functional earthing is not primarily intended to protect against electric shock."
  },
  {
    id: 'level3earthbond08',
    question: "What is the most appropriate method to determine the actual resistance of an earth electrode in a TT system?",
    options: ["Calculation based on soil resistivity", "Measurement using standard continuity tester", "Measurement using the slope method or 3-point method", "Dividing the circuit voltage by the fault current"],
    correctAnswer: "Measurement using the slope method or 3-point method",
    explanation: "The most appropriate method to determine the actual resistance of an earth electrode is by direct measurement using either the slope method or 3-point method (fall-of-potential method). These methods use specialized earth testers to accurately measure electrode resistance by placing auxiliary test spikes at specific distances from the electrode under test."
  },
  {
    id: 'level3earthbond09',
    question: "What is the primary purpose of high-frequency earthing in data centers?",
    options: ["To minimize earth loop impedance", "To reduce earth fault currents", "To provide a low-impedance path for high-frequency noise", "To minimize voltage drop"],
    correctAnswer: "To provide a low-impedance path for high-frequency noise",
    explanation: "High-frequency earthing in data centers provides a low-impedance path for high-frequency noise generated by digital equipment. Unlike power-frequency (50Hz) earthing, high-frequency earthing must account for skin effect and inductance, often requiring wider, shorter conductors or braided straps to effectively redirect electromagnetic interference away from sensitive equipment."
  },
  {
    id: 'level3earthbond10',
    question: "According to BS 7671, what is required for the earthing of electrical equipment in a Zone 1 area of a swimming pool?",
    options: ["Standard protective earthing only", "Supplementary equipotential bonding only", "Both protective earthing and supplementary equipotential bonding", "Functional earthing only"],
    correctAnswer: "Both protective earthing and supplementary equipotential bonding",
    explanation: "For electrical equipment in Zone 1 of a swimming pool, BS 7671 Section 702 requires both standard protective earthing (connecting exposed-conductive-parts to the protective conductor) and supplementary equipotential bonding (connecting all extraneous-conductive-parts together and to exposed-conductive-parts). This dual approach ensures minimal potential differences even under fault conditions."
  },
  {
    id: 'level3earthbond11',
    question: "What is the key difference between protective equipotential bonding and supplementary equipotential bonding?",
    options: ["The conductor size used", "The installation location", "The purpose and extent of the bonding", "The connection method"],
    correctAnswer: "The purpose and extent of the bonding",
    explanation: "The key difference is in purpose and extent: protective (main) equipotential bonding connects extraneous-conductive-parts to the main earthing terminal at the installation level, while supplementary equipotential bonding provides additional protection in higher-risk locations by bonding both exposed and extraneous-conductive-parts together locally, reducing potential differences in a specific area."
  },
  {
    id: 'level3earthbond12',
    question: "What design consideration is most important when installing earth electrodes in an earthing system?",
    options: ["Minimizing the number of electrodes used", "Ensuring electrodes are always visible for inspection", "Spacing electrodes at least at a distance equal to their driven length", "Using only copper electrodes"],
    correctAnswer: "Spacing electrodes at least at a distance equal to their driven length",
    explanation: "When installing multiple earth electrodes, they should be spaced at least at a distance equal to their driven length to ensure their resistance areas don't significantly overlap. This maximizes the effective contact with soil and ensures the parallel connection of electrodes actually reduces the overall earth resistance as intended."
  },
  {
    id: 'level3earthbond13',
    question: "In a high-integrity earthing system for a medical location, what is the maximum permitted resistance between exposed-conductive-parts and the protective conductor terminal of a socket outlet?",
    options: ["0.1Ω", "0.2Ω", "0.5Ω", "1.0Ω"],
    correctAnswer: "0.2Ω",
    explanation: "For medical locations (specifically Group 2 locations like operating theaters), the maximum permitted resistance between any exposed-conductive-part and the protective conductor terminal at the distribution board is 0.2Ω according to BS 7671 Section 710, reflecting the critical safety requirements in these environments."
  },
  {
    id: 'level3earthbond14',
    question: "What is the main consideration when determining the cross-sectional area of a protective conductor using the adiabatic equation?",
    options: ["The insulation type", "The fault duration and prospective fault current", "The ambient temperature only", "The voltage rating"],
    correctAnswer: "The fault duration and prospective fault current",
    explanation: "When using the adiabatic equation (k√I²t) to determine protective conductor size, the main considerations are the fault duration (t) and prospective fault current (I) which determine the thermal energy the conductor must withstand without excessive temperature rise. The material constant (k) is also factored in, accounting for the conductor material and insulation type."
  },
  {
    id: 'level3earthbond15',
    question: "When earthing an installation with significant harmonic currents, what special consideration must be given to the earthing conductor?",
    options: ["Reducing its length only", "Using only Class 2 insulation", "Potentially increasing its size beyond standard calculations", "Ensuring it's always installed in plastic conduit"],
    correctAnswer: "Potentially increasing its size beyond standard calculations",
    explanation: "With significant harmonic currents, the earthing conductor size may need to be increased beyond standard calculations. Harmonics, particularly triplen harmonics (3rd, 9th, etc.), can circulate in the earthing system causing additional heating. Standard calculations based on fundamental frequency (50Hz) current may not adequately account for this additional thermal stress."
  },
  {
    id: 'level3earthbond16',
    question: "What special earthing requirement applies to lightning protection systems according to BS EN 62305?",
    options: ["They must use a completely separate earthing system from the main electrical installation", "They should be bonded to the main earthing terminal of the installation", "Lightning protection must only use copper electrodes", "Main equipotential bonding is not required"],
    correctAnswer: "They should be bonded to the main earthing terminal of the installation",
    explanation: "BS EN 62305 requires that lightning protection system earthing be bonded to the main earthing terminal of the installation. This prevents dangerous potential differences between the two systems during a lightning strike. Having completely separate earthing systems would create a significant safety hazard during lightning events."
  },
  {
    id: 'level3earthbond17',
    question: "What is the purpose of a 'clean earth' in a data center environment?",
    options: ["To ensure the earth is visibly clean and free from corrosion", "To provide an earth connection free from electrical noise for sensitive electronic equipment", "To separate protective earthing from functional earthing", "To bypass the main earthing system"],
    correctAnswer: "To provide an earth connection free from electrical noise for sensitive electronic equipment",
    explanation: "A 'clean earth' (sometimes called a technical or instrumentation earth) provides a low-noise reference point for sensitive electronic equipment, designed to be relatively free from electrical noise that may be present on the main protective earthing system. It should still be bonded to the main earthing system but often uses star configuration wiring and dedicated electrodes to minimize noise coupling."
  },
  {
    id: 'level3earthbond18',
    question: "What is the primary concern regarding earthing arrangements when supplying outdoor equipment from a PME (TN-C-S) installation?",
    options: ["Excessive earth pit depth requirements", "The risk of neutral-earth voltage rise in the event of PEN conductor failure", "Higher lightning strike probability", "Higher installation costs"],
    correctAnswer: "The risk of neutral-earth voltage rise in the event of PEN conductor failure",
    explanation: "The primary concern with PME supplies to outdoor equipment is the risk of the PEN conductor failing between the supply transformer and the installation. This could cause the metalwork of outdoor equipment to rise to line voltage relative to the general mass of earth, creating a significant shock risk to anyone touching the equipment while in contact with the general mass of earth."
  },
  {
    id: 'level3earthbond19',
    question: "When would an earth-free local equipotential bonding zone be appropriate?",
    options: ["In normal domestic premises", "In a bathroom with a plastic bath", "In an operating theater", "In specialized medical electrical applications with monitoring systems"],
    correctAnswer: "In specialized medical electrical applications with monitoring systems",
    explanation: "Earth-free local equipotential bonding zones are appropriate in specialized medical applications, particularly where sensitive monitoring equipment (e.g., ECG, EEG) is used. By creating a zone where all conductive parts are bonded together but isolated from earth, the risk of microshock to patients with invasive connections is reduced, as is electrical interference in monitoring signals."
  },
  {
    id: 'level3earthbond20',
    question: "What factor most significantly affects the resistance of an earth electrode?",
    options: ["The electrode material", "The electrode diameter", "The soil resistivity", "The ambient temperature"],
    correctAnswer: "The soil resistivity",
    explanation: "Soil resistivity is the most significant factor affecting earth electrode resistance. The same electrode can have dramatically different resistance values in different soil conditions. Soil resistivity varies with soil type, moisture content, mineral content, and temperature, and can range from 5 Ωm for wet, marshy ground to 10,000 Ωm for dry, rocky terrain."
  },
  {
    id: 'level3earthbond21',
    question: "What is the primary purpose of using an insulation monitoring device (IMD) in an IT system?",
    options: ["To disconnect the supply automatically on first fault", "To measure the insulation resistance between live parts and earth", "To replace the need for earthing", "To monitor neutral-earth voltage"],
    correctAnswer: "To measure the insulation resistance between live parts and earth",
    explanation: "In an IT system, where there is no direct connection between live parts and earth, an insulation monitoring device continuously measures the insulation resistance between all live parts and earth. It provides an alert when the first fault occurs, allowing maintenance before a second fault could create a dangerous situation, while maintaining continuity of supply."
  },
  {
    id: 'level3earthbond22',
    question: "In a TN-S system, why is it important to confirm that there is no inadvertent connection between neutral and earth beyond the supply point?",
    options: ["To maximize the earth fault current", "To ensure a lower earth resistance value", "To prevent circulating currents and potential EMC issues", "To reduce the risk of electric shock"],
    correctAnswer: "To prevent circulating currents and potential EMC issues",
    explanation: "In a TN-S system, the neutral and protective conductors are separate throughout the installation. Inadvertent connections between neutral and earth beyond the supply point would create parallel paths for neutral current, causing circulating currents that can lead to overheating, electromagnetic interference (EMC) issues, and potentially defeat RCD protection."
  },
  {
    id: 'level3earthbond23',
    question: "What is the most appropriate method for verifying the effectiveness of the main equipotential bonding in an installation?",
    options: ["Visual inspection only", "Measurement of continuity using a high current test instrument", "Measurement of earth loop impedance", "Measurement of prospective fault current"],
    correctAnswer: "Measurement of continuity using a high current test instrument",
    explanation: "The most appropriate method for verifying main equipotential bonding effectiveness is measuring continuity with a high-current test instrument (typically minimum 200mA). This confirms the integrity of the bonding connections and identifies any high-resistance joints that might compromise the equipotential zone during a fault condition."
  },
  {
    id: 'level3earthbond24',
    question: "Which of the following statements about combined protective and functional earthing (PEN) conductors is correct?",
    options: ["They are permitted throughout the installation in all cases", "They are only permitted in fixed installations with conductors having a cross-sectional area not less than 10mm² copper", "They must always be insulated", "They must always be bare conductors"],
    correctAnswer: "They are only permitted in fixed installations with conductors having a cross-sectional area not less than 10mm² copper",
    explanation: "According to BS 7671 Regulation 543.4.1, combined protective and functional earthing (PEN) conductors are only permitted in fixed installations and must have a cross-sectional area not less than 10mm² copper or 16mm² aluminum. This requirement ensures adequate mechanical strength and current-carrying capacity for the dual function."
  },
  {
    id: 'level3earthbond25',
    question: "What is the purpose of a 'caravan hook-up point' earth electrode in the context of a PME supply?",
    options: ["To replace the need for an RCD", "To improve the power quality for sensitive caravan appliances", "To provide an earth reference point separate from the PME earth", "To comply with aesthetic requirements"],
    correctAnswer: "To provide an earth reference point separate from the PME earth",
    explanation: "A caravan hook-up point should have a separate earth electrode where supplied from a PME system. This provides an earth reference independent of the PME earth, reducing the risks associated with potential PEN conductor failures in the supply network, which could otherwise cause the caravan's metalwork to rise to a dangerous potential."
  },
  {
    id: 'level3earthbond26',
    question: "What is the maximum resistance value typically specified for supplementary bonding conductors in a bathroom?",
    options: ["0.05Ω", "0.1Ω", "0.5Ω", "1.0Ω"],
    correctAnswer: "0.1Ω",
    explanation: "BS 7671 specifies that the resistance of supplementary bonding conductors between simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts must not exceed 0.1Ω. This low resistance ensures minimal potential difference between these parts during a fault, reducing shock risk in these higher-risk locations."
  },
  {
    id: 'level3earthbond27',
    question: "What is the primary reason for using meshed equipotential bonding in high-tech facilities like data centers?",
    options: ["To reduce installation cost", "To minimize earth loop impedance for power frequency (50Hz) faults", "To provide multiple low-impedance paths for high-frequency currents", "To eliminate the need for surge protection"],
    correctAnswer: "To provide multiple low-impedance paths for high-frequency currents",
    explanation: "Meshed equipotential bonding (common mesh bonding network or MESH-BN) provides multiple parallel paths for high-frequency currents, reducing the impedance at higher frequencies where standard bonding methods may be ineffective due to inductance. This is particularly important in data centers to minimize 'ground bounce' and electromagnetic interference between systems."
  },
  {
    id: 'level3earthbond28',
    question: "According to ENA recommendations, what is the maximum permitted earth electrode resistance for HV/LV distribution substations?",
    options: ["10Ω", "5Ω", "1Ω", "0.5Ω"],
    correctAnswer: "1Ω",
    explanation: "The Energy Networks Association (ENA) recommends a maximum earth electrode resistance of 1Ω for high voltage/low voltage distribution substations. This low resistance is necessary to ensure safe dispersal of fault currents at the higher voltages involved, minimizing touch and step potential hazards during fault conditions."
  },
  {
    id: 'level3earthbond29',
    question: "When is earth-free equipotential bonding allowed as a protective measure?",
    options: ["In any domestic installation", "In swimming pool areas", "In special installations under effective supervision", "In all commercial installations"],
    correctAnswer: "In special installations under effective supervision",
    explanation: "Earth-free equipotential bonding is permitted as a protective measure only in special installations under effective supervision (e.g., some medical locations, laboratories). BS 7671 Regulation 418.2 specifies this is not for general application, requires verification by skilled persons, and must ensure all equipment within the zone is within reach of a person so all relevant conductive parts can be simultaneously bonded."
  },
  {
    id: 'level3earthbond30',
    question: "What is the purpose of functional bonding in relation to electromagnetic compatibility (EMC)?",
    options: ["To provide shock protection", "To ensure adequate cross-sectional area of conductors", "To reduce electromagnetic interference", "To replace the need for protective earthing"],
    correctAnswer: "To reduce electromagnetic interference",
    explanation: "Functional bonding for EMC purposes provides low-impedance paths for high-frequency currents to minimize electromagnetic interference between systems. Unlike protective bonding, which focuses on safety and fault current paths, functional bonding for EMC is specifically designed to control unwanted electromagnetic emissions and improve immunity to external interference."
  },
  {
    id: 'level3earthbond31',
    question: "In an IT medical system, what device must be installed to monitor the insulation from earth?",
    options: ["RCD", "Automatic disconnection device", "Line isolation monitor (LIM)", "Earth leakage circuit breaker"],
    correctAnswer: "Line isolation monitor (LIM)",
    explanation: "In medical IT systems (particularly in Group 2 medical locations), a line isolation monitor must be installed to continuously monitor the insulation resistance between the system and earth. This device provides visual and audible warnings if the first fault occurs, without disconnecting supply, allowing continued operation until the fault can be repaired."
  },
  {
    id: 'level3earthbond32',
    question: "What is the key requirement for earthing of a high-voltage cathode ray tube (CRT) monitor according to BS 7671?",
    options: ["It must have double insulation", "It should have reinforced insulation only", "Anti-static measures only", "Metalwork must be connected to protective earthing without a switch or fuse in the earth path"],
    correctAnswer: "Metalwork must be connected to protective earthing without a switch or fuse in the earth path",
    explanation: "Equipment containing high-voltage components, such as CRT monitors, must have its metalwork directly connected to the protective earthing system without any switch, overcurrent protective device (fuse/MCB), or means of interruption in the earth conductor. This ensures continuous protection against the high voltages (typically 25kV+) present in such devices."
  },
  {
    id: 'level3earthbond33',
    question: "What property of soil has the most significant effect on reducing earth electrode resistance?",
    options: ["Soil temperature", "Soil particle size", "Soil moisture content", "Soil color"],
    correctAnswer: "Soil moisture content",
    explanation: "Soil moisture content has the most significant effect on reducing earth electrode resistance. Damp or wet soil has considerably lower resistivity than dry soil, as water with dissolved minerals provides conductive paths between soil particles. This is why earth resistance often varies seasonally and why electrode systems may be treated with materials to retain moisture."
  },
  {
    id: 'level3earthbond34',
    question: "What is the primary reason for bonding metal gas pipes at their point of entry to a building?",
    options: ["To prevent leakage of gas", "To prevent electrolytic corrosion of the pipe", "To prevent the pipe becoming live due to a fault in electrical equipment or installation", "To comply with gas regulations only"],
    correctAnswer: "To prevent the pipe becoming live due to a fault in electrical equipment or installation",
    explanation: "Metal gas pipes are bonded at their point of entry to a building primarily to prevent them becoming live (rising to a dangerous potential) in the event of an electrical fault within the building or from external sources. This main equipotential bonding ensures any fault current would cause protective devices to operate quickly while minimizing touch voltage hazards."
  },
  {
    id: 'level3earthbond35',
    question: "What earthing arrangement is required for a standby generator that can operate in parallel with the public supply network?",
    options: ["The generator neutral must remain isolated from earth", "The generator must have its own earth electrode only", "The generator neutral must be connected to the installation main earthing terminal", "The generator neutral earthing arrangement must ensure no parallel earth paths are created"],
    correctAnswer: "The generator neutral earthing arrangement must ensure no parallel earth paths are created",
    explanation: "For generators operating in parallel with the public supply, the neutral earthing arrangement must ensure no parallel earth paths are created between the generator star point and the supply neutral-earth connection. This typically requires specialized changeover arrangements and potentially a neutral earthing switch that operates depending on whether the generator is in isolated or parallel mode."
  },
  {
    id: 'level3earthbond36',
    question: "What is the significance of the term 'prospective touch voltage' in earthing system design?",
    options: ["The voltage measured at the main earth terminal", "The voltage that could appear between simultaneously accessible conductive parts during an earth fault", "The voltage applied during insulation resistance testing", "The voltage drop in the circuit protective conductor under normal load conditions"],
    correctAnswer: "The voltage that could appear between simultaneously accessible conductive parts during an earth fault",
    explanation: "Prospective touch voltage is the voltage that could appear between simultaneously accessible conductive parts during an earth fault. This is a critical safety parameter, as it determines the potential risk of electric shock. Earthing system design aims to limit this voltage to safe levels (typically ≤50V AC) or ensure rapid disconnection before injury can occur."
  },
  {
    id: 'level3earthbond37',
    question: "What is meant by the term 'global earthing system' in the context of large interconnected installations?",
    options: ["An earthing system connected to all countries worldwide", "The requirement to use international earthing standards", "An earthing system with interconnected earth electrodes forming a quasi-equipotential mesh", "A system using all types of earthing arrangements simultaneously"],
    correctAnswer: "An earthing system with interconnected earth electrodes forming a quasi-equipotential mesh",
    explanation: "A global earthing system refers to an interconnected network of local earthing systems (typically in urban areas or large industrial sites) that, through proximity and interconnection of earthing systems and underground conductive structures, forms a quasi-equipotential mesh. This effectively reduces earth potential rise during faults and distributes fault currents across multiple paths."
  },
  {
    id: 'level3earthbond38',
    question: "What is the primary purpose of high-integrity earthing in a hospital operating theater (Group 2 medical location)?",
    options: ["To minimize earth resistance values only", "To provide lightning protection", "To control electromagnetic interference only", "To minimize touch voltage and ensure the integrity of the earth connection"],
    correctAnswer: "To minimize touch voltage and ensure the integrity of the earth connection",
    explanation: "High-integrity earthing in operating theaters aims to minimize touch voltage and ensure absolute integrity of earth connections. This is critical because patients may have compromised body resistance and direct connections to their heart, making even small leakage currents potentially lethal. The system must ensure extremely low resistance between all exposed conductive parts and supplementary equipotential bonding."
  },
  {
    id: 'level3earthbond39',
    question: "What would be the earth resistance requirement for a TT system where a 30mA RCD is used for fault protection, assuming a maximum touch voltage of 50V?",
    options: ["167Ω or less", "1667Ω or less", "5Ω or less", "833Ω or less"],
    correctAnswer: "1667Ω or less",
    explanation: "For a TT system with a 30mA RCD for fault protection, the earth resistance (RA) requirement is calculated from RA × IΔn ≤ UL, where IΔn is the rated residual operating current of the RCD and UL is the maximum permissible touch voltage (typically 50V). Therefore, RA ≤ 50V/0.03A = 1667Ω."
  },
  {
    id: 'level3earthbond40',
    question: "What is the purpose of anti-corrosion measures for earth electrodes?",
    options: ["To improve appearance only", "To prevent loss of mechanical strength", "To maintain low earth resistance over the installation lifetime", "To comply with environmental regulations only"],
    correctAnswer: "To maintain low earth resistance over the installation lifetime",
    explanation: "Anti-corrosion measures for earth electrodes (such as copper-bonded electrodes, non-corrosive couplings, and electrode compounds) aim to maintain low earth resistance over the entire installation lifetime. Corrosion would increase contact resistance between the electrode and soil, potentially compromising the effectiveness of the earthing system and safety of the installation."
  },
  {
    id: 'level3earthbond41',
    question: "In an IT system earthing arrangement, what condition must be monitored to ensure safety?",
    options: ["The first fault to earth only", "The neutral-earth voltage only", "The quality of the supply", "The electromagnetic compatibility"],
    correctAnswer: "The first fault to earth only",
    explanation: "In an IT system, where live parts are isolated from earth or connected through high impedance, the first fault to earth must be continuously monitored using an insulation monitoring device. This fault produces minimal current and doesn't require immediate disconnection, but must be detected and repaired before a second fault could create a dangerous situation."
  },
  {
    id: 'level3earthbond42',
    question: "What is the most appropriate action if the measured earth electrode resistance of a TT system exceeds the calculated maximum value?",
    options: ["Change to a TN-C-S system", "Ignore the result if all other tests are satisfactory", "Insert additional electrodes in parallel to reduce the overall resistance", "Increase the rating of the overcurrent protective device"],
    correctAnswer: "Insert additional electrodes in parallel to reduce the overall resistance",
    explanation: "If the measured earth electrode resistance in a TT system exceeds the calculated maximum value, the most appropriate action is to insert additional earth electrodes in parallel, which will reduce the overall earth resistance. These should be properly spaced (typically at least as far apart as their depth) to ensure effectiveness. Alternative solutions could include using RCDs with lower trip ratings."
  },
  {
    id: 'level3earthbond43',
    question: "What would be the effect of installing two earth electrodes too close to each other?",
    options: ["No effect on the combined resistance", "The overall resistance would be less than calculated", "The overall resistance would be higher than calculated", "The electrodes would show negative resistance"],
    correctAnswer: "The overall resistance would be higher than calculated",
    explanation: "Installing earth electrodes too close to each other causes their resistance areas (spheres of influence) to overlap. This means they compete for the same soil volume, reducing their effectiveness in parallel. The overall resistance would be higher than calculated using the standard parallel resistance formula, potentially compromising the earthing system's performance."
  },
  {
    id: 'level3earthbond44',
    question: "What is the main reason for using exothermic welding rather than mechanical clamps for earth electrode connections?",
    options: ["Lower initial cost", "Faster installation time", "Lower long-term resistance and higher corrosion resistance", "Easier to disconnect for testing"],
    correctAnswer: "Lower long-term resistance and higher corrosion resistance",
    explanation: "Exothermic welding (e.g., CADWELD) creates a molecular bond between conductors with resistance lower than the parent metals, and excellent corrosion resistance as there are no dissimilar metals or crevices where corrosion can start. This provides superior long-term performance compared to mechanical clamps, which can deteriorate over time, especially in buried or inaccessible locations."
  },
  {
    id: 'level3earthbond45',
    question: "According to BS 7671, what is the maximum operating temperature permitted for protective conductors during earth fault conditions?",
    options: ["70°C at all times", "90°C for thermoplastic insulation", "The same temperature as for line conductors", "Dependent on the insulation type and conductor material as specified in Table 54.2-54.3"],
    correctAnswer: "Dependent on the insulation type and conductor material as specified in Table 54.2-54.3",
    explanation: "BS 7671 specifies that the maximum operating temperature of protective conductors during earth fault conditions depends on the insulation type and conductor material, as detailed in Tables 54.2-54.3. For example, PVC-insulated copper can reach 160°C during faults, while if embedded in thermoplastic, the limit would be 90°C."
  },
  {
    id: 'level3earthbond46',
    question: "What is the most appropriate method to verify the continuity of protective conductors in a ring final circuit?",
    options: ["Standard continuity testing only", "End-to-end testing of the protective conductor with test current applied from a controlled source", "Insulation resistance testing", "Voltage drop testing"],
    correctAnswer: "End-to-end testing of the protective conductor with test current applied from a controlled source",
    explanation: "To verify the continuity of protective conductors in a ring final circuit, end-to-end testing must be performed with a test current from a controlled source. This checks both the continuity around the ring and identifies any interconnections or breaks, ensuring the integrity of the protective path in all parts of the ring circuit."
  },
  {
    id: 'level3earthbond47',
    question: "What is the minimum cross-sectional area of an earthing conductor connecting an earth electrode to the main earthing terminal in a TT system?",
    options: ["6mm² copper with mechanical protection", "16mm² copper in all cases", "25mm² copper with mechanical protection", "The same size as the main incoming protective conductor"],
    correctAnswer: "16mm² copper in all cases",
    explanation: "BS 7671 Regulation 542.3.1 requires that the earthing conductor connecting an earth electrode to the main earthing terminal in a TT system shall be not less than 16mm² copper in all cases. This ensures adequate mechanical strength and current-carrying capacity even when subject to corrosion or mechanical damage."
  },
  {
    id: 'level3earthbond48',
    question: "What consideration must be given to the impedance of an earth fault path for high-frequency protective conductor currents compared to 50Hz currents?",
    options: ["High-frequency impedance is always lower", "High-frequency impedance is always the same", "High-frequency impedance can be significantly higher due to inductive reactance", "No special consideration is needed"],
    correctAnswer: "High-frequency impedance can be significantly higher due to inductive reactance",
    explanation: "For high-frequency currents, the impedance of the earth fault path can be significantly higher than at 50Hz due to increased inductive reactance and skin effect. This is particularly important in installations with high-frequency equipment or harmonics, as it may require larger or specialized protective conductors (e.g., braided straps) to maintain effective protection."
  },
  {
    id: 'level3earthbond49',
    question: "According to BS 7671, what would be the minimum cross-sectional area required for a main equipotential bonding conductor connecting the main earthing terminal to the water service pipe in an installation with a 35mm² supply neutral conductor?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctAnswer: "10mm²",
    explanation: "According to BS 7671 Table 54.8, for supply neutral conductors between 25mm² and 35mm², the minimum cross-sectional area of the main equipotential bonding conductor is 10mm². This ensures the bonding conductor can handle fault currents without excessive temperature rise while maintaining mechanical strength."
  },
  {
    id: 'level3earthbond50',
    question: "What is the most appropriate method for bonding metal window frames on the second floor of a building?",
    options: ["No bonding is necessary as they are not extraneous-conductive-parts", "Connect a protective bonding conductor to every frame", "Connect to the lightning protection system only", "Connect to main equipotential bonding only if they are in contact with structural metalwork"],
    correctAnswer: "No bonding is necessary as they are not extraneous-conductive-parts",
    explanation: "Metal window frames on upper floors are typically not extraneous-conductive-parts as they are not in contact with earth (ground) and do not introduce a potential from earth. Unless they connect to structural steelwork that is bonded or another bonded service, they do not require protective bonding. This approach is consistent with BS 7671 definition of extraneous-conductive-parts."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-earthing-bonding', 'items', q.id), {
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
