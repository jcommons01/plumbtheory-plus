// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3EVChargingInstallations.ts

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

// ✅ Level 3 EV Charging Installations Questions
const questions = [
  {
    id: 'level3evcharging1',
    question: "According to BS 7671:2018+A2:2022 Section 722, what is the minimum IP rating required for a socket outlet used for EV charging that is installed outdoors?",
    options: ["IP44", "IP55", "IP65", "IP40"],
    correctAnswer: "IP55",
    explanation: "According to BS 7671:2018+A2:2022 Section 722, socket outlets installed outdoors for electric vehicle charging must have a minimum IP rating of IP55. This ensures adequate protection against dust ingress and water jets from any direction, which is essential for safety and reliability in outdoor environments."
  },
  {
    id: 'level3evcharging2',
    question: "Which of the following EV charging modes involves connecting the vehicle directly to the AC supply network using standardized socket outlets?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctAnswer: "Mode 1",
    explanation: "Mode 1 charging involves connecting the electric vehicle directly to the AC supply network using standard socket outlets (such as BS 1363 in the UK) without any additional protection devices in the cable. This mode has significant safety limitations and is generally not recommended or permitted for EV charging in most installations."
  },
  {
    id: 'level3evcharging3',
    question: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, what is the recommended maximum height for mounting an EV charging point to ensure accessibility?",
    options: ["1.0 meters", "1.2 meters", "1.5 meters", "1.8 meters"],
    correctAnswer: "1.5 meters",
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends that the maximum height for mounting an EV charging point should be 1.5 meters (measured to the center of the socket outlet or connector) to ensure accessibility for all users, including those with disabilities."
  },
  {
    id: 'level3evcharging4',
    question: "Which of the following is a key requirement of BS 7671:2018+A2:2022 Section 722 regarding the supply of electric vehicle charging equipment?",
    options: ["Can be connected to a ring final circuit", "Must be supplied by a dedicated circuit", "Can share a circuit with kitchen appliances", "Can be connected to a lighting circuit"],
    correctAnswer: "Must be supplied by a dedicated circuit",
    explanation: "BS 7671:2018+A2:2022 Section 722 requires that each electric vehicle charging point must be supplied by its own dedicated final circuit. This dedicated circuit ensures that the charging equipment has adequate electrical supply without impacting other circuits and allows for proper protection arrangements specific to EV charging requirements."
  },
  {
    id: 'level3evcharging5',
    question: "What is the maximum permissible voltage drop for a circuit supplying EV charging equipment according to BS 7671?",
    options: ["2%", "3%", "4%", "5%"],
    correctAnswer: "3%",
    explanation: "According to BS 7671, the maximum permissible voltage drop for a circuit supplying EV charging equipment is 3% of the nominal voltage. This requirement ensures that the voltage at the charging equipment remains within acceptable limits to maintain efficient and safe charging operations, even when operating at full load."
  },
  {
    id: 'level3evcharging6',
    question: "Which of the following is a correct statement regarding PME (TN-C-S) earthing systems and EV charging installations according to BS 7671:2018+A2:2022?",
    options: ["PME earthing systems cannot be used for EV charging under any circumstances", "PME earthing systems can be used without additional protection measures", "PME earthing systems can be used only if specific additional protection measures are implemented", "PME earthing systems can only be used for Mode 4 charging"],
    correctAnswer: "PME earthing systems can be used only if specific additional protection measures are implemented",
    explanation: "According to BS 7671:2018+A2:2022, PME (TN-C-S) earthing systems can be used for EV charging installations only if specific additional protection measures are implemented to mitigate the risks associated with a potential open-circuit PEN conductor. These measures may include earth electrodes, earth monitoring devices, or using galvanic isolation methods as detailed in Regulation 722.411.4.1."
  },
  {
    id: 'level3evcharging7',
    question: "What type of RCD protection is required for an EV charging circuit according to BS 7671:2018+A2:2022?",
    options: ["Type AC RCD", "Type A RCD with appropriate measures for DC fault current protection", "Type B RCD only", "No RCD protection is required"],
    correctAnswer: "Type A RCD with appropriate measures for DC fault current protection",
    explanation: "BS 7671:2018+A2:2022 requires that EV charging circuits must be protected by at least a Type A RCD with appropriate measures for DC fault current protection. This can be achieved either by using a Type B RCD or a Type A RCD combined with suitable equipment that provides protection against DC fault current (e.g., RDC-DD complying with BS IEC 62955). This requirement ensures protection against AC and DC fault currents that may occur in EV charging."
  },
  {
    id: 'level3evcharging8',
    question: "What is the maximum rating of a domestic EV charging point that can typically be installed under the simplified G98 notification process to the DNO?",
    options: ["3.68 kW", "7.36 kW", "11 kW", "22 kW"],
    correctAnswer: "3.68 kW",
    explanation: "The maximum rating of a domestic EV charging point that can typically be installed under the simplified G98 notification process to the DNO (Distribution Network Operator) is 3.68 kW (16A at 230V). Installations exceeding this rating generally require prior approval from the DNO rather than just notification, as they may have a more significant impact on the local electricity network."
  },
  {
    id: 'level3evcharging9',
    question: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, which of the following is an appropriate cable type for the dedicated final circuit supplying an EV charging point?",
    options: ["Twin and earth flat cable (6242Y)", "Steel wire armored cable (SWA)", "Mineral insulated copper clad cable (MICC)", "Either SWA or MICC depending on the installation conditions"],
    correctAnswer: "Either SWA or MICC depending on the installation conditions",
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends using either steel wire armored (SWA) cable or mineral insulated copper clad (MICC) cable for the dedicated final circuit supplying an EV charging point, depending on the installation conditions. These cable types provide appropriate mechanical protection and are suitable for external or underground installations often required for EV charging points."
  },
  {
    id: 'level3evcharging10',
    question: "What is Mode 3 charging for electric vehicles?",
    options: ["Charging using a standard domestic socket with an in-cable protection device", "DC fast charging using an off-board charger", "AC charging using dedicated EV charging equipment with control and protection functions", "Charging using a commando socket with no additional protection"],
    correctAnswer: "AC charging using dedicated EV charging equipment with control and protection functions",
    explanation: "Mode 3 charging is AC charging using dedicated electric vehicle charging equipment with control and protection functions. This mode involves communication between the vehicle and charging equipment, allowing for features such as power adjustment, charging status monitoring, and safety interlocks. Mode 3 is the standard for most dedicated home and public AC charging points in the UK."
  },
  {
    id: 'level3evcharging11',
    question: "In which circumstances must the DNO be notified prior to installing an EV charging point?",
    options: ["Only for 3-phase installations", "Only for installations exceeding 7.4 kW", "When the maximum demand of the property will exceed 13.8 kVA", "For all EV charging installations regardless of rating"],
    correctAnswer: "When the maximum demand of the property will exceed 13.8 kVA",
    explanation: "The DNO (Distribution Network Operator) must be notified prior to installing an EV charging point when the maximum demand of the property will exceed 13.8 kVA (60A single-phase). This notification requirement is to ensure the local electricity network can support the additional load. For installations that don't increase the maximum demand beyond this threshold, a simple notification after installation is typically sufficient."
  },
  {
    id: 'level3evcharging12',
    question: "What is the minimum cross-sectional area for circuit protective conductors for a 32A EV charging circuit according to BS 7671?",
    options: ["1.5 mm²", "2.5 mm²", "4 mm²", "10 mm²"],
    correctAnswer: "4 mm²",
    explanation: "According to BS 7671, for a 32A circuit, the minimum cross-sectional area for circuit protective conductors would typically be 4 mm². This is based on Table 54.7 of BS 7671, which correlates the cross-sectional area of the line conductor with the minimum cross-sectional area of the corresponding protective conductor to ensure adequate fault current carrying capacity and mechanical strength."
  },
  {
    id: 'level3evcharging13',
    question: "What is the purpose of the 'charging equipment power requirement' field in the EV charging point installation certificate?",
    options: ["To record the maximum voltage of the equipment", "To record the maximum power the charging equipment can deliver", "To calculate the installer's fee", "To determine the warranty period"],
    correctAnswer: "To record the maximum power the charging equipment can deliver",
    explanation: "The 'charging equipment power requirement' field in the EV charging point installation certificate is used to record the maximum power the charging equipment can deliver. This information is important for assessing the load on the electrical installation, ensuring compliance with regulations, and for future reference regarding the capabilities of the installed equipment."
  },
  {
    id: 'level3evcharging14',
    question: "According to the requirements for smart charging, what functionality must all new home and workplace EV chargepoints have in the UK?",
    options: ["Solar power integration", "Ability to be remotely accessed and receive signals to delay or adjust charging", "Voice control capabilities", "Automatic payment processing"],
    correctAnswer: "Ability to be remotely accessed and receive signals to delay or adjust charging",
    explanation: "According to UK regulations that came into effect in 2022, all new home and workplace EV chargepoints must have smart functionality, which includes the ability to be remotely accessed and receive signals to delay or adjust charging. This requirement is designed to help manage electricity network demand, potentially reduce charging costs by shifting charging to off-peak times, and support the integration of renewable energy sources."
  },
  {
    id: 'level3evcharging15',
    question: "What type of connector is typically used for Mode 3 AC charging in the UK and Europe?",
    options: ["Type 1 (J1772)", "CHAdeMO", "Type 2 (Mennekes)", "CCS Combo 2"],
    correctAnswer: "Type 2 (Mennekes)",
    explanation: "The Type 2 (Mennekes) connector is typically used for Mode 3 AC charging in the UK and Europe. This connector type has become the standard for AC charging in Europe and is capable of single-phase or three-phase charging at various power levels. It includes communication pins that enable the control and protection functions required for Mode 3 charging."
  },
  {
    id: 'level3evcharging16',
    question: "According to BS 7671:2018+A2:2022, what is the maximum disconnection time for fault protection in an EV charging circuit with a nominal voltage to earth of 230V?",
    options: ["0.2 seconds", "0.4 seconds", "5 seconds", "10 seconds"],
    correctAnswer: "0.4 seconds",
    explanation: "According to BS 7671:2018+A2:2022, the maximum disconnection time for fault protection in an EV charging circuit with a nominal voltage to earth of 230V is 0.4 seconds. This requirement ensures that in the event of a fault, the protective device operates quickly enough to prevent dangerous touch voltages from persisting for a duration that could cause harm."
  },
  {
    id: 'level3evcharging17',
    question: "What is the purpose of an RDC-DD device in an EV charging installation?",
    options: ["To provide surge protection", "To detect and respond to DC fault currents", "To provide overcurrent protection", "To measure energy consumption"],
    correctAnswer: "To detect and respond to DC fault currents",
    explanation: "An RDC-DD (Residual Direct Current Detecting Device) in an EV charging installation is designed to detect and respond to DC fault currents that may arise during charging. These DC components can potentially 'blind' standard Type A RCDs, rendering them ineffective. The RDC-DD ensures continued protection against electric shock by either tripping in response to DC fault currents or working with the Type A RCD to maintain its functionality."
  },
  {
    id: 'level3evcharging18',
    question: "What is the recommended minimum distance between an EV charging point and a gas meter installation according to the IET Code of Practice?",
    options: ["0.5 meters", "1.0 meters", "1.5 meters", "2.0 meters"],
    correctAnswer: "1.0 meters",
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends a minimum distance of 1.0 meter between an EV charging point and a gas meter installation. This separation distance is a safety measure to reduce the risk of ignition in case of a gas leak and to provide adequate space for maintenance access to both installations."
  },
  {
    id: 'level3evcharging19',
    question: "What is dynamic load balancing in the context of EV charging installations?",
    options: ["Adjusting the physical balance of the charging unit", "Modifying the vehicle's weight distribution during charging", "Automatically adjusting charging power based on the building's current electrical load", "Equalizing the battery cells during charging"],
    correctAnswer: "Automatically adjusting charging power based on the building's current electrical load",
    explanation: "Dynamic load balancing in EV charging installations refers to the automated adjustment of charging power based on the building's current electrical load. This technology monitors the total electrical consumption of the property and modulates the power delivered to the EV charger to prevent exceeding the maximum supply capacity, avoiding potential overloads, tripped breakers, or the need for a costly supply upgrade."
  },
  {
    id: 'level3evcharging20',
    question: "Which of the following is a requirement for domestic EV chargepoints under the Electric Vehicles (Smart Charge Points) Regulations 2021?",
    options: ["Must be able to export energy back to the grid", "Must include a payment card reader", "Must not charge by default during peak hours (8am-11am and 4pm-10pm)", "Must have a minimum power output of 11 kW"],
    correctAnswer: "Must not charge by default during peak hours (8am-11am and 4pm-10pm)",
    explanation: "Under the Electric Vehicles (Smart Charge Points) Regulations 2021, domestic EV chargepoints must not charge by default during peak hours, defined as 8am-11am and 4pm-10pm. This 'default off' requirement aims to encourage charging during off-peak periods when electricity demand is lower and when there may be more renewable energy available, though users can override this setting if needed."
  },
  {
    id: 'level3evcharging21',
    question: "What is the minimum prospective short-circuit current (PSCC) that the protective devices for an EV charging installation must be rated to withstand?",
    options: ["6 kA", "10 kA", "16 kA", "The actual PSCC at the point of installation"],
    correctAnswer: "The actual PSCC at the point of installation",
    explanation: "The protective devices for an EV charging installation must be rated to withstand the actual prospective short-circuit current (PSCC) at the point of installation. This requires a PSCC test to be conducted at the supply point during installation to ensure that the selected protective devices have an adequate breaking capacity to safely interrupt fault currents that could occur."
  },
  {
    id: 'level3evcharging22',
    question: "According to the IET Code of Practice, what is the recommended inspection frequency for EV charging equipment installed in public locations?",
    options: ["Monthly", "Every 6 months", "Annually", "Every 3 years"],
    correctAnswer: "Annually",
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends that EV charging equipment installed in public locations should be inspected annually. This regular inspection ensures the continued safe operation of the equipment, identifies any deterioration, and confirms compliance with safety standards, thereby minimizing risks to users and the public."
  },
  {
    id: 'level3evcharging23',
    question: "What is Mode 4 charging for electric vehicles?",
    options: ["AC charging using a standard domestic socket", "AC charging using a dedicated charging point", "DC charging using an on-board charger", "DC charging using an off-board charger"],
    correctAnswer: "DC charging using an off-board charger",
    explanation: "Mode 4 charging for electric vehicles refers to DC charging using an off-board charger. In this mode, the AC/DC conversion occurs in the charging station rather than in the vehicle, allowing for much higher power delivery (typically 50 kW to 350 kW). Mode 4 is used for rapid DC charging at public locations and along highways to minimize charging time."
  },
  {
    id: 'level3evcharging24',
    question: "What is the purpose of the OZEV EV Chargepoint Grant?",
    options: ["To subsidize the cost of purchasing an electric vehicle", "To fund the installation of on-street public charging points", "To contribute towards the cost of installing a home charging point", "To provide free electricity for charging electric vehicles"],
    correctAnswer: "To contribute towards the cost of installing a home charging point",
    explanation: "The OZEV (Office for Zero Emission Vehicles) EV Chargepoint Grant is designed to contribute towards the cost of installing a home charging point for electric vehicle owners. The grant provides up to a specified amount (currently £350) off the cost of purchase and installation of a home charging point, helping to make the transition to electric vehicles more affordable for homeowners."
  },
  {
    id: 'level3evcharging25',
    question: "What documentation must be provided to the client upon completion of an EV charging point installation?",
    options: ["Only a verbal handover is required", "A handwritten note confirming completion", "A completed electrical installation certificate with test results and manufacturer's instructions", "Only the charging equipment warranty"],
    correctAnswer: "A completed electrical installation certificate with test results and manufacturer's instructions",
    explanation: "Upon completion of an EV charging point installation, the installer must provide the client with a completed electrical installation certificate that includes test results, a schedule of inspections, and any specific observations. Additionally, the manufacturer's instructions for the charging equipment must be provided, along with any warranties and guidance on safe operation and maintenance."
  },
  {
    id: 'level3evcharging26',
    question: "According to BS 7671:2018+A2:2022, what is the minimum height above the ground at which socket outlets for EV charging should be installed?",
    options: ["0.5 meters", "0.75 meters", "0.8 meters", "1.2 meters"],
    correctAnswer: "0.5 meters",
    explanation: "According to BS 7671:2018+A2:2022 Section 722.55.1.1, socket outlets for EV charging should be installed at a height of between 0.5 meters and 1.5 meters above ground level. The minimum height of 0.5 meters helps protect the socket outlet from potential water ingress during heavy rain or flooding and reduces the risk of mechanical damage."
  },
  {
    id: 'level3evcharging27',
    question: "What is the purpose of the 'random delay' function required in domestic EV chargepoints under UK regulations?",
    options: ["To confuse potential hackers", "To test the vehicle's response to power interruptions", "To prevent network stress from multiple chargepoints starting simultaneously after a power cut", "To ensure the battery charges evenly"],
    correctAnswer: "To prevent network stress from multiple chargepoints starting simultaneously after a power cut",
    explanation: "The 'random delay' function required in domestic EV chargepoints under UK regulations (Electric Vehicles Smart Charge Points Regulations) is designed to prevent network stress from multiple chargepoints starting simultaneously after a power cut. This feature introduces a random delay of between 0 and 10 minutes before charging resumes following a power outage, helping to avoid sudden demand surges that could potentially destabilize the electricity grid."
  },
  {
    id: 'level3evcharging28',
    question: "Under the Public Charge Point Regulations 2023, what payment method must public charge point operators ensure is available to users?",
    options: ["Contactless debit/credit card payment", "Mobile app payment only", "RFID card payment only", "Cash payment"],
    correctAnswer: "Contactless debit/credit card payment",
    explanation: "Under the Public Charge Point Regulations 2023, public charge point operators must ensure that contactless debit/credit card payment is available to users. This requirement aims to make public charging more accessible by eliminating the need for users to download specific apps or carry special RFID cards, allowing spontaneous charging with standard payment methods that most people already possess."
  },
  {
    id: 'level3evcharging29',
    question: "What is the minimum cable size typically required for a 7.4 kW (32A) single-phase EV charger installation, assuming standard installation conditions?",
    options: ["1.5 mm²", "2.5 mm²", "6 mm²", "10 mm²"],
    correctAnswer: "6 mm²",
    explanation: "For a 7.4 kW (32A) single-phase EV charger installation under standard conditions, the minimum cable size typically required is 6 mm². This size ensures the cable can safely carry the continuous full-load current, accounting for the 100% diversity factor applied to EV charging (as it's considered a continuous load), while maintaining acceptable voltage drop over typical installation distances."
  },
  {
    id: 'level3evcharging30',
    question: "What is the minimum separation distance recommended between an EV charging point and a fuel pump in a petrol station according to the IET Code of Practice?",
    options: ["2 meters", "5 meters", "10 meters", "20 meters"],
    correctAnswer: "10 meters",
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation recommends a minimum separation distance of 10 meters between an EV charging point and a fuel pump in a petrol station. This distance is a safety measure to reduce the risk of ignition in areas where flammable vapors may be present and aligns with hazardous area classification requirements for petrol stations."
  },
  {
    id: 'level3evcharging31',
    question: "According to BS 7671:2018+A2:2022, what special protection is required for an EV charging circuit where the PME earthing facility is used?",
    options: ["No special protection is required", "The charging equipment must have a Type B RCD only", "The charging equipment must incorporate an earth monitoring device or equivalent protection", "Only TT earthing can be used for EV charging"],
    correctAnswer: "The charging equipment must incorporate an earth monitoring device or equivalent protection",
    explanation: "According to BS 7671:2018+A2:2022 Regulation 722.411.4.1, where the PME earthing facility is used for an EV charging circuit, the charging equipment must incorporate an earth monitoring device or equivalent protection. This is to address the risk posed by an open-circuit PEN conductor in the supply, which could cause the exposed-conductive-parts to rise to a dangerous voltage relative to true earth."
  },
  {
    id: 'level3evcharging32',
    question: "What is the main consideration for the location of an EV charging point with regard to physical damage protection?",
    options: ["It should be located in direct sunlight", "It should be protected from or located to minimize risk of impact damage", "It should always be wall-mounted", "It should be located as far as possible from the property"],
    correctAnswer: "It should be protected from or located to minimize risk of impact damage",
    explanation: "The main consideration for the location of an EV charging point with regard to physical damage protection is that it should be protected from or located to minimize risk of impact damage. This may involve installing bollards, wheel stops, or protective barriers in areas where vehicle movement could potentially cause impact, or positioning the charging point in a location less susceptible to accidental damage."
  },
  {
    id: 'level3evcharging33',
    question: "What type of meter is required for measuring the electricity consumed by an EV charging point that is eligible for the Smart Export Guarantee (SEG) for vehicle-to-grid technologies?",
    options: ["Any standard single-phase meter", "A dual-register meter", "A smart meter capable of measuring exported electricity", "No metering is required"],
    correctAnswer: "A smart meter capable of measuring exported electricity",
    explanation: "For an EV charging point with vehicle-to-grid capability to be eligible for the Smart Export Guarantee (SEG), a smart meter capable of measuring exported electricity is required. This meter must be able to record the electricity that flows both to the vehicle (consumption) and from the vehicle back to the grid (export), providing half-hourly readings to enable appropriate payment for the exported energy."
  },
  {
    id: 'level3evcharging34',
    question: "What is the purpose of the charging equipment communication controller in Mode 3 charging?",
    options: ["To enable internet access for the vehicle", "To establish and maintain communication between the vehicle and charging equipment for safe charging", "To allow the user to make phone calls while charging", "To connect the vehicle to satellite navigation services"],
    correctAnswer: "To establish and maintain communication between the vehicle and charging equipment for safe charging",
    explanation: "The purpose of the charging equipment communication controller in Mode 3 charging is to establish and maintain communication between the vehicle and charging equipment for safe charging. This controller uses the control pilot function to verify vehicle connection, establish earth continuity, determine the maximum available charging current, and enable/disable the power flow, ensuring the charging process occurs safely and efficiently."
  },
  {
    id: 'level3evcharging35',
    question: "Under current UK regulations, what is the minimum rating for a new home EV chargepoint?",
    options: ["3.6 kW", "7 kW", "11 kW", "22 kW"],
    correctAnswer: "7 kW",
    explanation: "Under current UK regulations (specifically, The Automated and Electric Vehicles Act 2018 and subsequent legislation), new home EV chargepoints must have a minimum rating of 7 kW. This requirement ensures that home charging is sufficiently powerful to meet typical EV charging needs within a reasonable timeframe, while still being compatible with standard single-phase domestic electrical supplies."
  },
  {
    id: 'level3evcharging36',
    question: "What is the maximum current that can typically be drawn from a Type 2 socket on a single-phase supply?",
    options: ["16A", "32A", "63A", "125A"],
    correctAnswer: "32A",
    explanation: "The maximum current that can typically be drawn from a Type 2 socket on a single-phase supply is 32A (approximately 7.4 kW at 230V). While the Type 2 connector is physically capable of carrying up to 63A per phase, in single-phase domestic installations in the UK, the practical limit is typically 32A due to supply capacity constraints and standard circuit protection ratings for residential installations."
  },
  {
    id: 'level3evcharging37',
    question: "What is the primary reason for carrying out an earth electrode resistance test when installing an EV charger with a dedicated earth electrode?",
    options: ["To verify the manufacturer's warranty", "To check for buried metalwork", "To ensure the electrode provides a sufficiently low resistance path to earth", "To determine if the ground is suitable for digging"],
    correctAnswer: "To ensure the electrode provides a sufficiently low resistance path to earth",
    explanation: "The primary reason for carrying out an earth electrode resistance test when installing an EV charger with a dedicated earth electrode is to ensure the electrode provides a sufficiently low resistance path to earth. This test confirms that the electrode is capable of carrying fault currents safely to earth and maintaining touch voltages within safe limits, typically aiming for a resistance value below 200 ohms for TT systems."
  },
  {
    id: 'level3evcharging38',
    question: "According to the IET Code of Practice, what is a key consideration when installing EV charging equipment in locations accessible to the public?",
    options: ["The charging equipment must be painted a bright color", "Protection against unauthorized use or vandalism", "The charging equipment must be hidden from public view", "The charging equipment must make a warning sound during operation"],
    correctAnswer: "Protection against unauthorized use or vandalism",
    explanation: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, a key consideration when installing EV charging equipment in locations accessible to the public is protection against unauthorized use or vandalism. This may involve using robust equipment designs, secure mounting, protective enclosures, access control systems (RFID, PIN codes, apps), or surveillance, depending on the specific location and risk assessment."
  },
  {
    id: 'level3evcharging39',
    question: "What safety feature is required in Mode 2 charging cables that is not present in standard power cables?",
    options: ["A waterproof jacket", "An in-cable control and protection device (IC-CPD)", "A transparent outer sheath", "A built-in voltage indicator"],
    correctAnswer: "An in-cable control and protection device (IC-CPD)",
    explanation: "Mode 2 charging cables require an in-cable control and protection device (IC-CPD) that is not present in standard power cables. This device, often referred to as a 'smart' or 'intelligent' charging cable, includes protection functions such as overcurrent protection, earth leakage detection, plug temperature monitoring, and communication with the vehicle to control the charging process safely when using non-dedicated socket outlets."
  },
  {
    id: 'level3evcharging40',
    question: "Which of the following is a requirement for socket outlets intended for EV charging according to BS 7671:2018+A2:2022?",
    options: ["They must be unswitched", "They must incorporate mechanical interlocking", "They must be of the spring-loaded type", "They must be colored green"],
    correctAnswer: "They must incorporate mechanical interlocking",
    explanation: "According to BS 7671:2018+A2:2022 Regulation 722.55.101, socket outlets intended for EV charging must incorporate mechanical interlocking. This safety feature prevents the insertion or withdrawal of the plug when the circuit is energized, reducing the risk of arcing and potential damage or injury during connection and disconnection of the charging cable."
  },
  {
    id: 'level3evcharging41',
    question: "What is the purpose of PEN fault detection technology in certain EV charging installations?",
    options: ["To detect vehicle compatibility issues", "To monitor the charging cable condition", "To detect faults in the PME earthing arrangement", "To measure power consumption accurately"],
    correctAnswer: "To detect faults in the PME earthing arrangement",
    explanation: "The purpose of PEN fault detection technology in certain EV charging installations is to detect faults in the PME earthing arrangement, specifically open-circuit conditions in the PEN conductor. This technology monitors the relationship between the earthing terminal and true earth, disconnecting the supply if a potentially dangerous situation is detected, thereby addressing the specific risks associated with using PME earthing for EV charging without requiring installation of an earth electrode."
  },
  {
    id: 'level3evcharging42',
    question: "What is the purpose of the 'charging equipment mounting height' field in the EV charging point electrical installation certificate?",
    options: ["To calculate the cable length required", "To determine the visibility of the unit", "To record compliance with accessibility requirements", "To assess wind resistance factors"],
    correctAnswer: "To record compliance with accessibility requirements",
    explanation: "The 'charging equipment mounting height' field in the EV charging point electrical installation certificate is used to record compliance with accessibility requirements. This information confirms that the charging equipment has been installed at a height that makes it accessible to all users, including those with disabilities, as specified in standards such as BS 7671 and the IET Code of Practice, which recommend installation heights between 0.5m and 1.5m above ground level."
  },
  {
    id: 'level3evcharging43',
    question: "According to the IET Code of Practice, what is the recommended minimum distance between an EV charging point and overhead power lines?",
    options: ["1.5 meters", "5.8 meters", "9 meters", "The distance depends on the voltage of the power lines"],
    correctAnswer: "The distance depends on the voltage of the power lines",
    explanation: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, the recommended minimum distance between an EV charging point and overhead power lines depends on the voltage of the power lines. For low voltage lines, a minimum clearance of 3 meters is typically recommended, while for high voltage lines, greater distances are required based on the specific voltage level, with clearances potentially exceeding 10 meters for very high voltage lines."
  },
  {
    id: 'level3evcharging44',
    question: "What is the minimum permitted height for a socket outlet on a pedestal-mounted EV charging point according to BS 7671:2018+A2:2022?",
    options: ["0.5 meters", "0.75 meters", "0.8 meters", "1.0 meters"],
    correctAnswer: "0.8 meters",
    explanation: "According to BS 7671:2018+A2:2022 Regulation 722.55.1.1, the minimum permitted height for a socket outlet on a pedestal-mounted EV charging point is 0.8 meters above ground level. This specific height requirement for pedestal installations (as opposed to the general 0.5m minimum for wall-mounted outlets) helps to reduce the risk of impact damage, water ingress, and ensures reasonable accessibility for all users."
  },
  {
    id: 'level3evcharging45',
    question: "Under the Public Charge Point Regulations 2023, what information must be clearly displayed to users at public charging points?",
    options: ["Only the operator's contact details", "Only the total cost for a charging session", "Price information, availability status, and any applicable tariffs", "Only charging speed information"],
    correctAnswer: "Price information, availability status, and any applicable tariffs",
    explanation: "Under the Public Charge Point Regulations 2023, public charging points must clearly display price information, availability status, and any applicable tariffs to users. This information must be accessible before starting a charging session, ensuring price transparency and allowing users to make informed decisions about using the charging point based on its cost, availability, and charging capabilities."
  },
  {
    id: 'level3evcharging46',
    question: "What testing is required specifically for an earth electrode installed as part of an EV charging installation?",
    options: ["Visual inspection only", "Measurement of earth electrode resistance", "Testing with a vehicle connected only", "No testing is required for earth electrodes"],
    correctAnswer: "Measurement of earth electrode resistance",
    explanation: "For an earth electrode installed as part of an EV charging installation, measurement of earth electrode resistance is specifically required. This test, typically performed using a specialized earth electrode resistance tester (such as a fall-of-potential or stakeless tester), ensures that the electrode provides a sufficiently low-resistance path to earth to operate protective devices effectively and maintain touch voltages within safe limits."
  },
  {
    id: 'level3evcharging47',
    question: "What is the requirement for additional mechanical protection of cables supplying EV charging points when installed underground?",
    options: ["No additional protection is needed if SWA cable is used", "Additional mechanical protection is always required regardless of cable type", "Additional mechanical protection is required only for depths less than 600mm", "Only non-metallic ducting can be used"],
    correctAnswer: "Additional mechanical protection is required only for depths less than 600mm",
    explanation: "When cables supplying EV charging points are installed underground, additional mechanical protection (such as cable ducting) is required only for depths less than 600mm. According to BS 7671, cables buried at a depth of at least 600mm with suitable marking tape placed above them may not require additional mechanical protection, though this depends on the specific cable type and local risk assessment."
  },
  {
    id: 'level3evcharging48',
    question: "What is the maximum distance typically recommended between an EV charging point and the consumer unit or distribution board supplying it?",
    options: ["10 meters", "20 meters", "35 meters", "No specific maximum, but voltage drop must be considered"],
    correctAnswer: "No specific maximum, but voltage drop must be considered",
    explanation: "There is no specific maximum distance typically recommended between an EV charging point and the consumer unit or distribution board supplying it, but voltage drop must be considered. The cable length should be limited to ensure that the voltage drop does not exceed 3% of the nominal voltage under full load conditions. In practice, this often means sizing cables appropriately for longer runs rather than imposing a fixed maximum distance."
  },
  {
    id: 'level3evcharging49',
    question: "According to BS 7671:2018+A2:2022, what is the minimum current rating required for a circuit breaker protecting a dedicated final circuit for a standard 7.4 kW (32A) EV charging point?",
    options: ["32A", "40A", "45A", "63A"],
    correctAnswer: "40A",
    explanation: "According to BS 7671:2018+A2:2022, for a dedicated final circuit supplying a standard 7.4 kW (32A) EV charging point, the minimum current rating required for a circuit breaker would be 40A. This is based on the requirement to apply a continuous loading factor of 125% to the charging equipment's rated current (32A × 1.25 = 40A), as EV charging is considered a continuous load operation (exceeding 1 hour)."
  },
  {
    id: 'level3evcharging50',
    question: "What documentation must be submitted to the local Distribution Network Operator (DNO) when installing an EV charging point that has a rated current exceeding 16A per phase?",
    options: ["No documentation is required", "Only the EV charger specification sheet", "A completed EV charging installation notification form", "Only proof of the installer's qualifications"],
    correctAnswer: "A completed EV charging installation notification form",
    explanation: "When installing an EV charging point that has a rated current exceeding 16A per phase, a completed EV charging installation notification form must be submitted to the local Distribution Network Operator (DNO). This form typically includes details about the installation location, the charging equipment specifications, the maximum demand, and confirmation that the installation complies with relevant standards, allowing the DNO to assess potential impacts on the local network."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-ev-charging', 'items', q.id),        {
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
