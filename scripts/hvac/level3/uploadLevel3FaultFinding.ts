// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3FaultFinding.ts

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

// ✅ HVAC Level 3 Fault Diagnosis & Rectification Questions
const questions = [
  {
    id: 'hvac-l3-fault-finding1',
    question: "What is the most likely cause of a VRF (Variable Refrigerant Flow) system displaying a high-pressure alarm during cooling operation on a hot day?",
    options: ["Low refrigerant charge", "Oversized system", "Condenser blockage or fan failure", "Excessive subcooling"],
    correctAnswer: "Condenser blockage or fan failure",
    explanation: "A VRF system displaying a high-pressure alarm during cooling on a hot day most likely indicates condenser blockage or fan failure. This fault prevents effective heat rejection, leading to abnormally high condensing pressures and temperatures, especially in hot weather when heat rejection is already challenging. Possible specific causes include condenser coil fouling, fan motor failure, blocked filters, or nearby obstructions restricting airflow."
  },
  {
    id: 'hvac-l3-fault-finding2',
    question: "Which of the following symptoms would indicate liquid refrigerant floodback to a compressor?",
    options: ["High superheat and high discharge temperature", "Low suction pressure and normal oil level", "Abnormally high oil level and periodic liquid slugging noises", "High head pressure and low subcooling"],
    correctAnswer: "Abnormally high oil level and periodic liquid slugging noises",
    explanation: "Liquid refrigerant floodback to a compressor is characterized by abnormally high oil level (diluted with refrigerant) and periodic liquid slugging noises. Refrigerant liquid has dissolved into the compressor's oil, raising the apparent oil level. The slugging noises occur when liquid refrigerant enters the compression chamber, causing hydraulic shock that can damage valves, connecting rods, or bearings, potentially leading to catastrophic compressor failure."
  },
  {
    id: 'hvac-l3-fault-finding3',
    question: "What is the most likely cause of ice formation on the suction line of a refrigeration system, but not on the evaporator?",
    options: ["Excessive refrigerant charge", "Failed defrost mechanism", "Excessive superheat at the evaporator", "Insufficient superheat at the evaporator"],
    correctAnswer: "Insufficient superheat at the evaporator",
    explanation: "Ice formation on the suction line but not on the evaporator most likely indicates insufficient superheat at the evaporator. This means liquid refrigerant is leaving the evaporator (rather than fully vaporizing within it), causing the temperature of the suction line to drop below freezing as the liquid refrigerant continues to evaporate along it. This condition can be caused by an oversized or malfunctioning expansion device, or excessive refrigerant charge."
  },
  {
    id: 'hvac-l3-fault-finding4',
    question: "What is the most probable cause of a refrigeration system with normal suction pressure but abnormally high discharge pressure?",
    options: ["Restricted air flow across the condenser", "Restricted air flow across the evaporator", "Low refrigerant charge", "Faulty expansion valve"],
    correctAnswer: "Restricted air flow across the condenser",
    explanation: "A refrigeration system with normal suction pressure but abnormally high discharge pressure most likely has restricted airflow across the condenser. This prevents adequate heat rejection, causing refrigerant to condense at a higher temperature and pressure than normal. Common causes include dirty condenser coils, failed condenser fans, obstructions around the condenser, or high ambient temperature conditions that exceed the condenser's design specifications."
  },
  {
    id: 'hvac-l3-fault-finding5',
    question: "What would be the most likely cause of a chiller maintaining the correct chilled water temperature but with excessive energy consumption?",
    options: ["Undersized chiller", "Air in the chilled water system", "Refrigerant overcharge", "Fouled condenser"],
    correctAnswer: "Fouled condenser",
    explanation: "A chiller maintaining correct water temperature but with excessive energy consumption most likely has a fouled condenser. A dirty condenser forces the compressor to work harder, raising the condensing temperature and pressure to overcome the reduced heat transfer efficiency. This significantly increases power consumption while still achieving the setpoint. Additional signs include higher than normal discharge pressures, elevated approach temperatures, and reduced COP."
  },
  {
    id: 'hvac-l3-fault-finding6',
    question: "What is the most likely cause when a three-phase compressor motor hums but does not start?",
    options: ["Low voltage supply", "Single phasing (loss of one phase)", "Seized compressor", "Normal time delay"],
    correctAnswer: "Single phasing (loss of one phase)",
    explanation: "When a three-phase compressor motor hums but does not start, the most likely cause is single phasing (loss of one phase). With only two phases energized, the motor lacks sufficient torque to start rotating but still draws current, producing the humming sound. This condition can quickly damage the motor due to overheating. Causes include a blown fuse, loose connection, or contactor failure on one phase."
  },
  {
    id: 'hvac-l3-fault-finding7',
    question: "A chilled water system has adequate cooling capacity but excessive energy consumption. Investigation shows the chilled water return temperature is much lower than design. What is the most likely cause?",
    options: ["Chilled water pump failure", "Fouled evaporator", "Excessive water flow due to improper balancing", "Refrigerant undercharge"],
    correctAnswer: "Excessive water flow due to improper balancing",
    explanation: "The most likely cause is excessive water flow due to improper balancing. A lower than design return water temperature with adequate cooling indicates the water flow rate is too high, reducing the temperature differential across the evaporator. This forces the chiller to operate at a lower evaporating temperature than necessary, increasing compressor work and energy consumption. The solution is proper hydronic balancing to establish design flow rates."
  },
  {
    id: 'hvac-l3-fault-finding8',
    question: "What is the most likely cause of a cooling coil that is partially frosted with ice on the air inlet side only?",
    options: ["Low air flow across the entire coil", "Refrigerant distribution issue within the coil", "Insufficient refrigerant charge", "Normal operation during dehumidification"],
    correctAnswer: "Refrigerant distribution issue within the coil",
    explanation: "Ice formation on the air inlet side only of a cooling coil most likely indicates a refrigerant distribution issue within the coil. This occurs when refrigerant isn't evenly distributed among all circuits, causing some areas to operate below freezing while others remain above freezing. Possible causes include blocked distributor tubes, improper coil mounting angle, or a damaged distributor assembly within the coil."
  },
  {
    id: 'hvac-l3-fault-finding9',
    question: "A hot water heating system has adequate circulation but insufficient heat output. What is the most likely cause if the boiler is firing correctly and maintaining its setpoint temperature?",
    options: ["Air in the system", "Undersized boiler", "Pump failure", "Incorrect balancing of the system"],
    correctAnswer: "Air in the system",
    explanation: "If a hot water heating system has adequate circulation but insufficient heat output, while the boiler is firing correctly and maintaining its setpoint, the most likely cause is air in the system. Air pockets can block flow through radiators or other heat emitters, preventing effective heat transfer to spaces. Additional symptoms include gurgling noises and some radiators being partially hot. The solution is proper venting of the system."
  },
  {
    id: 'hvac-l3-fault-finding10',
    question: "What is the most likely cause if a centrifugal pump is operating but delivering significantly reduced flow rate and pressure?",
    options: ["Reversed rotation", "Normal operation", "Air lock in the pump", "Worn impeller"],
    correctAnswer: "Air lock in the pump",
    explanation: "If a centrifugal pump is operating but delivering significantly reduced flow rate and pressure, an air lock in the pump is the most likely cause. Air trapped in the pump casing disrupts the hydraulic flow path, severely reducing performance. Signs include erratic pressure gauge readings, cavitation noises, and high vibration. This commonly occurs after system draining or if air enters through a suction line leak, and requires proper venting to restore performance."
  },
  {
    id: 'hvac-l3-fault-finding11',
    question: "What fault is indicated by compressor short cycling (running for very brief periods before shutting off) on an air conditioning system?",
    options: ["Undersized system", "Oversized system", "Low refrigerant charge", "Excessive refrigerant charge"],
    correctAnswer: "Oversized system",
    explanation: "Compressor short cycling most commonly indicates an oversized system. When the cooling capacity significantly exceeds the heat load, the system quickly satisfies the thermostat, resulting in short run times. This prevents proper dehumidification, causes temperature swings, increases wear on components, and reduces efficiency. While other issues like control problems or refrigerant overcharge can cause cycling, oversizing is the most fundamental design flaw causing this symptom."
  },
  {
    id: 'hvac-l3-fault-finding12',
    question: "What is the most likely cause of water hammer occurring in steam heating pipes?",
    options: ["Insufficient steam pressure", "Inadequate pipe insulation", "Improper condensate drainage", "Oversized steam boiler"],
    correctAnswer: "Improper condensate drainage",
    explanation: "Water hammer in steam pipes is most likely caused by improper condensate drainage. This occurs when condensate accumulates in steam lines due to inadequate pipe slope, failed steam traps, or incorrect piping configuration. When steam hits these condensate slugs, it rapidly collapses, creating a vacuum that pulls the water at high velocity until it hits pipe fittings, causing the characteristic banging. This can damage pipes, fittings, and equipment if not corrected."
  },
  {
    id: 'hvac-l3-fault-finding13',
    question: "A VRF system displays an error code indicating excessive discharge temperature. What is the most likely cause?",
    options: ["Excessive refrigerant charge", "Refrigerant undercharge", "Blocked condenser", "Excessive subcooling"],
    correctAnswer: "Refrigerant undercharge",
    explanation: "An excessive discharge temperature error in a VRF system most likely indicates refrigerant undercharge. With insufficient refrigerant, the compressor operates with reduced cooling from the suction gas, leading to overheating. The undercharge causes higher superheat, lower mass flow rate, and reduced cooling of the compressor motor and bearings by the refrigerant, resulting in abnormally high discharge temperatures that trigger the system's protective controls."
  },
  {
    id: 'hvac-l3-fault-finding14',
    question: "What is the most likely cause of excessive vibration in a centrifugal fan?",
    options: ["Normal operation at high speed", "Imbalance in the rotating assembly", "Incorrect blade orientation", "Excessive airflow"],
    correctAnswer: "Imbalance in the rotating assembly",
    explanation: "Excessive vibration in a centrifugal fan is most likely caused by imbalance in the rotating assembly. This imbalance creates centrifugal forces that vary as the fan rotates, causing the vibration. Common causes include uneven dirt buildup on blades, physical damage to blades, material buildup on the impeller, bearing wear, or shaft misalignment. Severe vibration can lead to bearing failure, shaft damage, or structural damage to the fan housing or mounting."
  },
  {
    id: 'hvac-l3-fault-finding15',
    question: "What would be the most likely cause of cold spots on sections of a radiator in a hot water heating system?",
    options: ["Normal temperature stratification", "Air trapped in the radiator", "Undersized boiler", "Excessive flow rate"],
    correctAnswer: "Air trapped in the radiator",
    explanation: "Cold spots on sections of a radiator in a hot water heating system are most likely caused by air trapped in the radiator. The air blocks water flow through portions of the radiator, preventing heat transfer in those areas. Typically, the air rises to the highest points, causing the top section to remain cold while the bottom heats up. The solution is to bleed the radiator by opening the air vent valve until water appears."
  },
  {
    id: 'hvac-l3-fault-finding16',
    question: "What is the most likely cause of a domestic hot water system delivering water that is hotter than the thermostat setting?",
    options: ["Failed thermostat", "Lime scale buildup", "Undersized cylinder", "Normal operation"],
    correctAnswer: "Failed thermostat",
    explanation: "Water hotter than the thermostat setting in a domestic hot water system most likely indicates a failed thermostat. When the thermostat fails to properly sense temperature or open its contacts, it cannot cut power to the heating element at the setpoint, allowing the water to overheat. This presents a scalding hazard and may also activate the high-temperature safety cutout if temperatures rise further. The solution is to replace the thermostat."
  },
  {
    id: 'hvac-l3-fault-finding17',
    question: "What is the most likely cause of different zones in a VAV system not maintaining their setpoint temperatures, with some zones being too hot and others too cold?",
    options: ["Incorrect system balance", "Undersized central plant", "Incorrect control sequences", "Normal VAV operation"],
    correctAnswer: "Incorrect system balance",
    explanation: "Different zones in a VAV system not maintaining setpoints, with some too hot and others too cold, most likely indicates incorrect system balance. This occurs when air distribution isn't properly proportioned, with some zones receiving too much airflow while others receive too little. The issue may be due to improper commissioning, damper failures, or pressure sensor problems affecting the VAV terminal units or the system pressure control."
  },
  {
    id: 'hvac-l3-fault-finding18',
    question: "What is the most likely cause of a domestic refrigerator that runs continuously but maintains normal temperature?",
    options: ["Normal operation", "Excessive food load", "Door seal failure", "Failed defrost system"],
    correctAnswer: "Door seal failure",
    explanation: "A domestic refrigerator running continuously while maintaining normal temperature most likely has a door seal failure. The deteriorated seal allows warm air to continuously infiltrate the cabinet, increasing the thermal load and forcing the compressor to run longer cycles or continuously to maintain temperature. Additional signs include condensation around the door gasket, increased energy consumption, and possibly warm spots near the door edges."
  },
  {
    id: 'hvac-l3-fault-finding19',
    question: "What is the most likely cause of a heat pump system blowing cold air during heating mode when the outdoor temperature is 0°C?",
    options: ["Normal defrost cycle operation", "Refrigerant leak", "Reversing valve failure", "Outdoor unit fan failure"],
    correctAnswer: "Normal defrost cycle operation",
    explanation: "Cold air during heating mode at 0°C most likely indicates normal defrost cycle operation. At this temperature, frost forms on the outdoor coil, necessitating periodic defrost cycles. During defrost, the system temporarily reverses to cooling mode, causing the indoor coil to become cold and blow cool air. Modern systems typically minimize this effect using supplementary electric heat or reducing indoor fan speed during defrost."
  },
  {
    id: 'hvac-l3-fault-finding20',
    question: "What is the most likely cause of a chilled water pump that keeps tripping its motor overload protection?",
    options: ["Normal operation", "Incorrect rotation", "Cavitation", "Operating against a closed valve"],
    correctAnswer: "Operating against a closed valve",
    explanation: "A chilled water pump repeatedly tripping its overload protection most likely indicates it's operating against a closed valve. When a pump runs against a closed discharge valve (deadheading), it operates at its shutoff head, which can significantly increase power consumption and cause overheating. This typically occurs during startup if isolation valves aren't properly opened, or if an automatic valve fails closed during operation."
  },
  {
    id: 'hvac-l3-fault-finding21',
    question: "What is the most likely cause of a refrigeration system with low suction pressure, low head pressure, and warm air from the evaporator?",
    options: ["Low refrigerant charge", "Blocked expansion valve", "Low ambient temperature", "Condenser fan failure"],
    correctAnswer: "Low refrigerant charge",
    explanation: "A refrigeration system with low suction pressure, low head pressure, and warm air from the evaporator most likely has a low refrigerant charge. This reduces refrigerant flow through the evaporator, decreasing cooling capacity (warm air) and causing low suction pressure. The reduced mass flow through the compressor and condenser also results in lower-than-normal head pressure. Additional symptoms include high superheat and possible oil return issues."
  },
  {
    id: 'hvac-l3-fault-finding22',
    question: "What is the most likely cause of excessive noise from an AHU supply fan?",
    options: ["Normal high-speed operation", "Loose fan pulley", "Belt wear", "Motor bearing failure"],
    correctAnswer: "Loose fan pulley",
    explanation: "Excessive noise from an AHU supply fan is most likely caused by a loose fan pulley. When the pulley set screws loosen, the pulley can shift on the shaft or even wobble, creating distinctive vibration and noise. This condition can rapidly worsen, potentially leading to belt damage, shaft scoring, or complete pulley separation. Additional signs include visible pulley movement, marking on the shaft, or belt misalignment."
  },
  {
    id: 'hvac-l3-fault-finding23',
    question: "What is the most likely cause of water dripping from a ceiling-mounted fan coil unit with no visible pipe leaks?",
    options: ["Normal condensation", "Blocked condensate drain", "Failed cooling coil", "Excessive air filtration"],
    correctAnswer: "Blocked condensate drain",
    explanation: "Water dripping from a ceiling-mounted fan coil with no visible pipe leaks most likely indicates a blocked condensate drain. During cooling operation, condensation forms on the coil as air is dehumidified. This condensate should flow through the drain pan and drain line, but if blocked by debris, biofilm, or incorrect installation (poor slope), the condensate backs up and eventually overflows the drain pan, causing water damage to the ceiling and spaces below."
  },
  {
    id: 'hvac-l3-fault-finding24',
    question: "What is the most likely cause of a cooling system that short cycles on the low-pressure switch?",
    options: ["Overcharged system", "Refrigerant undercharge", "Blocked expansion device", "Normal operation during low load conditions"],
    correctAnswer: "Refrigerant undercharge",
    explanation: "A cooling system short cycling on the low-pressure switch most likely has a refrigerant undercharge. The reduced refrigerant quantity causes abnormally low evaporating pressure, triggering the low-pressure safety cutout. The system then cycles off, pressures equalize, the switch resets, and the system restarts, creating a repetitive short-cycling pattern. This condition stresses components, reduces efficiency, and provides poor temperature control."
  },
  {
    id: 'hvac-l3-fault-finding25',
    question: "What is the most likely cause of high suction superheat combined with normal subcooling in a refrigeration system?",
    options: ["Overcharged system", "Undercharged system", "Undersized or restricted expansion device", "Failed compressor valves"],
    correctAnswer: "Undersized or restricted expansion device",
    explanation: "High suction superheat with normal subcooling most likely indicates an undersized or restricted expansion device. The restriction limits refrigerant flow to the evaporator, causing the refrigerant to completely vaporize early in the coil with additional superheating. The flow restriction also creates a pressure drop, resulting in the high superheat. Normal subcooling confirms adequate refrigerant in the system, ruling out undercharge as the cause."
  },
  {
    id: 'hvac-l3-fault-finding26',
    question: "What is the most likely cause of uneven heating across a hydronic radiator with the bottom being warm and the top remaining cold?",
    options: ["Normal stratification", "Reversed flow connection", "Air locked in the radiator", "Incorrect radiator size"],
    correctAnswer: "Air locked in the radiator",
    explanation: "Uneven heating across a hydronic radiator with the bottom warm and top cold most likely indicates air locked in the radiator. Air rises to the highest points in the system, preventing water from circulating through the upper sections of the radiator. This creates the distinctive warmth at the bottom and cold at the top. The solution is bleeding the radiator using the air vent valve typically located at one of the top corners."
  },
  {
    id: 'hvac-l3-fault-finding27',
    question: "What is the most likely cause of a chiller that has high head pressure and high approach temperature (difference between condensing temperature and condenser water leaving temperature)?",
    options: ["Low water flow in condenser", "Low refrigerant charge", "High water flow in condenser", "Fouled condenser tubes"],
    correctAnswer: "Fouled condenser tubes",
    explanation: "A chiller with high head pressure and high approach temperature most likely has fouled condenser tubes. Scale, dirt, or biofilm on the water side of the tubes creates thermal resistance that inhibits heat transfer, forcing the refrigerant to condense at a higher temperature and pressure to overcome this resistance. This increases compressor energy consumption and reduces capacity. Additional signs include reduced condenser water temperature differential and higher-than-normal compressor current."
  },
  {
    id: 'hvac-l3-fault-finding28',
    question: "What is the most likely cause of reduced cooling capacity in a refrigeration system with normal operating pressures but abnormally high compressor discharge temperature?",
    options: ["Overcharged refrigerant", "Non-condensable gases in the system", "Air recirculation at the condenser", "High superheat at the compressor suction"],
    correctAnswer: "High superheat at the compressor suction",
    explanation: "Reduced cooling capacity with normal pressures but high discharge temperature most likely indicates high superheat at compressor suction. Excessive superheat means the refrigerant vapor absorbs more heat than intended before reaching the compressor, entering at a higher temperature. The compression process further increases this already elevated temperature, resulting in abnormally high discharge temperatures. Causes include improper expansion valve adjustment, refrigerant restriction, or partial undercharge."
  },
  {
    id: 'hvac-l3-fault-finding29',
    question: "What is the most probable cause of a heat pump system that operates properly in cooling mode but not in heating mode?",
    options: ["Failed compressor", "Reversing valve failure", "Refrigerant overcharge", "Outdoor fan failure"],
    correctAnswer: "Reversing valve failure",
    explanation: "A heat pump operating properly in cooling but not in heating most likely has a reversing valve failure. The reversing valve is responsible for changing the refrigerant flow direction between cooling and heating modes. When it fails to shift, gets stuck midway, or has internal leakage, the system may function correctly in one mode (typically cooling, the default position) but fail to operate correctly in the other mode."
  },
  {
    id: 'hvac-l3-fault-finding30',
    question: "What is the most likely cause of a cooling tower with reduced performance and white plume formation, even during warm weather conditions?",
    options: ["Excessive water flow", "Low ambient humidity", "Improper air flow", "Excessive water treatment chemicals"],
    correctAnswer: "Improper air flow",
    explanation: "A cooling tower with reduced performance and white plume formation even in warm weather most likely has improper airflow. Reduced airflow due to fan issues, blocked fills, or air intake obstructions prevents effective heat and mass transfer. This reduces the tower's ability to reject heat through evaporation, leading to higher-than-design leaving water temperatures and visible water vapor plumes as the air becomes saturated despite warmer ambient conditions."
  },
  {
    id: 'hvac-l3-fault-finding31',
    question: "What is the most common cause of a thermal expansion valve that hunts (cycles between too much and too little refrigerant flow)?",
    options: ["Incorrect superheat spring", "Oversized valve", "Incorrectly located thermal bulb", "Normal operation during varying loads"],
    correctAnswer: "Incorrectly located thermal bulb",
    explanation: "A thermal expansion valve that hunts is most commonly caused by an incorrectly located thermal bulb. If the bulb is improperly mounted (wrong position on the suction line, loose, or without insulation where needed), it won't accurately sense the suction line temperature. This causes delayed or inaccurate feedback to the valve, resulting in cyclical overfeeding and underfeeding of refrigerant as the valve continuously overcompensates."
  },
  {
    id: 'hvac-l3-fault-finding32',
    question: "What is the most likely cause of a chiller that operates normally but repeatedly trips on low oil pressure?",
    options: ["Low refrigerant charge", "Failed oil pump", "Refrigerant dilution of the oil", "Normal operation during low load"],
    correctAnswer: "Refrigerant dilution of the oil",
    explanation: "A chiller that operates normally but repeatedly trips on low oil pressure most likely has refrigerant dilution of the oil. When excessive refrigerant dissolves in the compressor oil, it reduces the oil's viscosity and effective lubricating properties. The oil pressure differential drops below the safety cutout threshold, triggering the low oil pressure switch despite normal operation. This commonly occurs in systems with inadequate crankcase heating or during extended low-load conditions."
  },
  {
    id: 'hvac-l3-fault-finding33',
    question: "What is the most likely cause of a multi-stage air conditioning system where the second stage doesn't engage, but the first stage operates normally?",
    options: ["Normal operation due to low load", "Failed second stage compressor", "Faulty staging controller", "Undersized system"],
    correctAnswer: "Faulty staging controller",
    explanation: "A multi-stage system where the second stage doesn't engage but the first operates normally most likely has a faulty staging controller. This could be a defective thermostat unable to call for second stage, a failed control board, or incorrect control wiring/settings. The problem is in the control system rather than the refrigeration components, as the system operates normally in first stage, indicating the refrigerant circuit for that stage is functioning properly."
  },
  {
    id: 'hvac-l3-fault-finding34',
    question: "What is the most likely cause of a chilled water system with normal flow rate but higher than design return water temperature?",
    options: ["Undersized cooling coils", "Excessive water flow rate", "Higher than design cooling load", "Air in the system"],
    correctAnswer: "Higher than design cooling load",
    explanation: "A chilled water system with normal flow but higher than design return temperature most likely has a higher than design cooling load. With more heat to remove than the system was designed for, the water temperature rise across the cooling coils increases, resulting in higher return temperatures. Possible causes include increased occupancy, equipment loads, solar gains, or ventilation loads beyond original design calculations."
  },
  {
    id: 'hvac-l3-fault-finding35',
    question: "What is the most likely cause of a ventilation system with reduced airflow despite the fan running at the correct speed?",
    options: ["Incorrect fan rotation", "Blocked filters", "Oversized ductwork", "Normal operation with variable airflow system"],
    correctAnswer: "Blocked filters",
    explanation: "A ventilation system with reduced airflow despite the fan running at correct speed most likely has blocked filters. As filters accumulate dust and debris, they create increasingly higher pressure drop, restricting airflow through the system. Additional symptoms include increased pressure differential across the filters, motor overload if severe, and potentially frozen cooling coils in AC systems due to the reduced airflow."
  },
  {
    id: 'hvac-l3-fault-finding36',
    question: "What is the most likely cause of bubbles visible in the sight glass of a refrigeration system during normal operation?",
    options: ["Refrigerant undercharge", "Refrigerant overcharge", "Non-condensable gases", "Normal operation under fluctuating loads"],
    correctAnswer: "Refrigerant undercharge",
    explanation: "Bubbles visible in the sight glass during normal operation most likely indicate refrigerant undercharge. With insufficient refrigerant, vapor bubbles appear as the liquid line is not completely filled with liquid refrigerant. This can lead to efficiency loss, capacity reduction, and potentially compressor damage if severe. While flash gas from restrictions or non-condensables can cause bubbles, undercharge is the most common cause during typical operation."
  },
  {
    id: 'hvac-l3-fault-finding37',
    question: "What is the most likely cause of excessive noise and vibration in the compressor discharge line of a refrigeration system?",
    options: ["Normal operation", "Liquid refrigerant slugging", "Loose pipe clamps", "Refrigerant undercharge"],
    correctAnswer: "Liquid refrigerant slugging",
    explanation: "Excessive noise and vibration in the compressor discharge line most likely indicates liquid refrigerant slugging. This occurs when liquid refrigerant enters the compression chamber, attempting to compress an incompressible fluid. The resulting hydraulic shock creates distinctive knocking noises and pulsations in the discharge line. Causes include failed crankcase heating, off-cycle migration, flooding, or liquid floodback from the evaporator."
  },
  {
    id: 'hvac-l3-fault-finding38',
    question: "What is the most likely cause of a refrigeration system that shows fluctuating suction pressure while maintaining normal condensing pressure?",
    options: ["Correct operation with varying load", "Incorrect expansion valve superheat setting", "Condenser fan cycling", "Restriction in the suction line"],
    correctAnswer: "Incorrect expansion valve superheat setting",
    explanation: "Fluctuating suction pressure with normal condensing pressure most likely indicates incorrect expansion valve superheat setting. If the superheat is set too low, the valve can hunt, alternately overfeeding and underfeeding the evaporator as it overcompensates for temperature changes. This causes cyclical fluctuations in suction pressure as the mass flow of refrigerant through the evaporator varies, while the condensing pressure remains stable."
  },
  {
    id: 'hvac-l3-fault-finding39',
    question: "A VAV system is maintaining temperature correctly but occupants complain of stuffiness and poor air quality. What is the most likely cause?",
    options: ["Normal VAV operation", "Minimum outdoor air damper stuck closed or improperly set", "Undersized cooling coil", "Thermostat set too high"],
    correctAnswer: "Minimum outdoor air damper stuck closed or improperly set",
    explanation: "Occupant complaints of stuffiness despite correct temperature control most likely indicate the minimum outdoor air damper is stuck closed or improperly set. VAV systems must maintain minimum ventilation air regardless of thermal requirements. If the outdoor air damper fails or is improperly commissioned, CO2 levels and pollutants can rise even while temperatures remain comfortable, leading to stuffiness, drowsiness, and poor indoor air quality."
  },
  {
    id: 'hvac-l3-fault-finding40',
    question: "What is the most likely cause of a heat pump system that delivers significantly reduced heating capacity in cold weather, despite the auxiliary electric heat functioning correctly?",
    options: ["Normal heat pump operation", "Refrigerant undercharge", "Defrost control failure", "Outdoor fan over-speeding"],
    correctAnswer: "Refrigerant undercharge",
    explanation: "Significantly reduced heat pump heating capacity in cold weather despite functioning auxiliary heat most likely indicates refrigerant undercharge. While all heat pumps experience some capacity reduction at lower outdoor temperatures, an undercharged system shows dramatic performance reduction beyond normal. The auxiliary heat works independently of the refrigerant circuit, so it continues functioning while the heat pump portion underperforms due to insufficient refrigerant mass flow."
  },
  {
    id: 'hvac-l3-fault-finding41',
    question: "What is the most likely cause of a cycling head pressure control valve in a refrigeration system with air-cooled condenser during low ambient conditions?",
    options: ["Normal operation", "Valve stuck in partially open position", "Incorrect valve setting", "Excessive refrigerant charge"],
    correctAnswer: "Incorrect valve setting",
    explanation: "Cycling head pressure control valve during low ambient conditions most likely indicates incorrect valve setting. Head pressure control valves should maintain stable condensing pressure by modulating condenser capacity (typically by flooding part of the condenser with liquid refrigerant). If the valve's pressure setting is too low or its differential too narrow, it will cycle between open and closed positions rather than modulating smoothly, causing fluctuating head pressure."
  },
  {
    id: 'hvac-l3-fault-finding42',
    question: "What is the most likely cause of water leaking from an indoor unit of a split air conditioning system during heating mode?",
    options: ["Normal condensate production", "Cracked drain pan", "Frozen indoor coil now defrosting", "Refrigerant leak"],
    correctAnswer: "Cracked drain pan",
    explanation: "Water leaking from an indoor unit during heating mode most likely indicates a cracked drain pan. During heating, the indoor coil acts as a condenser and should not produce condensate, unlike in cooling mode. Therefore, any water leakage is likely from a physical defect in the drain pan or condensate system. The crack may have gone unnoticed during cooling season when the drain system was actively removing condensate."
  },
  {
    id: 'hvac-l3-fault-finding43',
    question: "What is the most likely cause of insufficient cooling in specific zones of a VRF multi-split system, while other zones cool normally?",
    options: ["Low refrigerant charge", "Main system fault", "Individual indoor unit faults or incorrect branch piping", "Undersized outdoor unit"],
    correctAnswer: "Individual indoor unit faults or incorrect branch piping",
    explanation: "Insufficient cooling in specific VRF zones while others cool normally most likely indicates individual indoor unit faults or incorrect branch piping. Since some zones function properly, the main system components (outdoor unit, compressor, main refrigerant charge) must be working correctly. The problem is isolated to specific zones, suggesting local issues like indoor unit component failures, improper branch piping size/length, refrigerant distribution issues, or control problems."
  },
  {
    id: 'hvac-l3-fault-finding44',
    question: "What is the most likely cause of a chiller with reduced cooling capacity, high superheat, and low suction pressure?",
    options: ["Refrigerant overcharge", "Expansion valve problem", "Compressor inefficiency", "Condenser fouling"],
    correctAnswer: "Expansion valve problem",
    explanation: "A chiller with reduced capacity, high superheat, and low suction pressure most likely has an expansion valve problem. These symptoms indicate restricted refrigerant flow to the evaporator. The restriction causes high superheat as liquid refrigerant vaporizes early in the evaporator, low suction pressure due to reduced mass flow, and decreased cooling capacity. Possible valve issues include partial blockage, incorrectly adjusted superheat, or undersized valve."
  },
  {
    id: 'hvac-l3-fault-finding45',
    question: "What is the most likely cause of a refrigeration system where the compressor repeatedly trips its thermal overload despite normal operating pressures?",
    options: ["Normal protection during high ambient conditions", "Refrigerant migration during off cycle", "Electrical issues (voltage imbalance, loose connections, or motor winding problems)", "Incorrect overload size"],
    correctAnswer: "Electrical issues (voltage imbalance, loose connections, or motor winding problems)",
    explanation: "A compressor repeatedly tripping its thermal overload despite normal pressures most likely indicates electrical issues. While the refrigeration circuit appears normal, electrical problems like voltage imbalance (>2%), loose connections causing high resistance, or deteriorating motor windings can cause excessive current draw and motor heating without affecting pressure readings. These issues generate heat faster than the motor cooling system can remove it, triggering the thermal overload protection."
  },
  {
    id: 'hvac-l3-fault-finding46',
    question: "What is the most likely cause of coil freezing on a direct expansion air conditioning system that occurs only during low load conditions?",
    options: ["Low refrigerant charge", "Blocked air filter", "Failed compressor", "Improper refrigerant flow control at low loads"],
    correctAnswer: "Improper refrigerant flow control at low loads",
    explanation: "Coil freezing only during low load conditions most likely indicates improper refrigerant flow control at low loads. During reduced loads, many systems can't modulate refrigerant flow sufficiently, causing evaporator temperature to drop below freezing. This is common in systems with fixed-capacity compressors and basic expansion devices. Modern solutions include electronic expansion valves, compressor capacity control (e.g., digital scrolls, inverters), or hot gas bypass controls."
  },
  {
    id: 'hvac-l3-fault-finding47',
    question: "What is the most likely cause of scale formation inside a cooling tower basin and on fill material?",
    options: ["Excessive air flow", "Normal operation", "Poor water treatment or incorrect bleed rate", "Low water temperature"],
    correctAnswer: "Poor water treatment or incorrect bleed rate",
    explanation: "Scale formation inside a cooling tower basin and on fill material most likely indicates poor water treatment or incorrect bleed rate. As water evaporates, dissolved minerals concentrate in the remaining water. Without proper chemical treatment and sufficient bleed-off (intentional draining and replacement with fresh water), these minerals exceed their solubility limits and precipitate as scale, reducing heat transfer efficiency and restricting water flow."
  },
  {
    id: 'hvac-l3-fault-finding48',
    question: "What is the most likely cause of a VRF system that functions correctly in cooling mode but displays low heating capacity with low suction pressure in heating mode?",
    options: ["Refrigerant undercharge", "Outdoor unit fan failure", "Indoor unit fan failure", "Reversing valve leakage"],
    correctAnswer: "Outdoor unit fan failure",
    explanation: "A VRF system with correct cooling but low heating capacity and low suction pressure in heating mode most likely has an outdoor unit fan failure. In heating mode, the outdoor coil acts as the evaporator. A failed or underperforming outdoor fan reduces airflow across this coil, decreasing heat absorption and causing low suction pressure and reduced heating capacity. The system works in cooling because the indoor units (now evaporators) have functioning fans."
  },
  {
    id: 'hvac-l3-fault-finding49',
    question: "What is the most likely cause of a water source heat pump with correct cooling capacity but low water flow and high head pressure?",
    options: ["Normal operation", "Water-side scaling", "Refrigerant overcharge", "Excessive water temperature"],
    correctAnswer: "Water-side scaling",
    explanation: "A water source heat pump with correct cooling capacity but low water flow and high head pressure most likely has water-side scaling. Scale buildup inside the water-to-refrigerant heat exchanger creates flow restriction (reducing water flow) and thermal resistance (requiring higher condensing temperature/pressure to reject the same heat). The system maintains capacity initially but with reduced efficiency, higher operating costs, and risk of high-pressure trips during peak loads."
  },
  {
    id: 'hvac-l3-fault-finding50',
    question: "What is the most likely cause of an air handling unit delivering proper airflow volume but with reduced cooling capacity and a dry cooling coil?",
    options: ["Correct operation at low ambient conditions", "Failed cooling valve or pump", "Blocked air filter", "Incorrect fan rotation"],
    correctAnswer: "Failed cooling valve or pump",
    explanation: "An AHU delivering proper airflow but with reduced cooling and a dry cooling coil most likely has a failed cooling valve or pump. The normal airflow indicates the fan system is working correctly, but the dry coil suggests no chilled water is flowing through it despite the system calling for cooling. This points to either a stuck closed control valve, failed circulation pump, or possibly severe air lock preventing water flow through the coil."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-fault-finding', 'items', q.id), {
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
