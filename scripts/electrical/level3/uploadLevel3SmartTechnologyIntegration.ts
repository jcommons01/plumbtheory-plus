// ✅ COMPLETE: npx ts-node scripts/electrical/level3/uploadLevel3SmartTechnologyIntegration.ts

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

// ✅ Level 3 Smart Technology Integration Questions
const questions = [
  {
    id: 'level3smarttech1',
    question: "Which of the following communication protocols operates at the lowest frequency and offers the best penetration through building materials?",
    options: ["Zigbee (2.4GHz)", "Z-Wave (868-915MHz)", "Wi-Fi (2.4GHz)", "Bluetooth (2.4GHz)"],
    correctAnswer: "Z-Wave (868-915MHz)",
    explanation: "Z-Wave operates at 868-915MHz (depending on region) which is a lower frequency than the 2.4GHz used by Zigbee, Wi-Fi, and Bluetooth. Lower frequencies provide better penetration through building materials like walls and floors, offering better range and reliability in a smart home environment, particularly in UK buildings with solid walls."
  },
  {
    id: 'level3smarttech2',
    question: "According to the IET Guide to Smart Homes for Electrical Installers, what is a key consideration when planning cable infrastructure for a smart home installation?",
    options: ["Using only wireless technologies to avoid cabling", "Installing a minimum Category 5e cabling for future expandability", "Running all cables externally for easier access", "Using only proprietary cables for each system"],
    correctAnswer: "Installing a minimum Category 5e cabling for future expandability",
    explanation: "The IET Guide to Smart Homes for Electrical Installers recommends installing minimum Category 5e cabling as a futureproof infrastructure for smart home installations. This allows for higher bandwidth requirements of modern smart systems and ensures the installation will support future technologies and expansions."
  },
  {
    id: 'level3smarttech3',
    question: "What is the primary benefit of using a KNX system for building automation compared to proprietary systems?",
    options: ["Lower initial cost", "Manufacturer independence and interoperability", "Simpler installation process", "Lower power consumption"],
    correctAnswer: "Manufacturer independence and interoperability",
    explanation: "The primary benefit of a KNX system is manufacturer independence and interoperability. As an open standard (EN 50090, ISO/IEC 14543), KNX products from different manufacturers can work together in the same installation, giving greater flexibility in component selection and future expansion without being locked into a single manufacturer's ecosystem."
  },
  {
    id: 'level3smarttech4',
    question: "What is the maximum number of devices that can be theoretically addressed in a single KNX installation?",
    options: ["256 devices", "1,000 devices", "Over 65,000 devices", "100 devices"],
    correctAnswer: "Over 65,000 devices",
    explanation: "A KNX system can theoretically address over 65,000 devices (specifically 65,536) using its standard addressing scheme, which consists of area (0-15), line (0-15), and device (0-255) components. This makes it suitable for both small residential and large commercial building automation projects."
  },
  {
    id: 'level3smarttech5',
    question: "Which of the following would be the most appropriate topology for a reliable smart lighting control system in a large commercial building?",
    options: ["Star topology only", "Ring topology only", "Bus topology only", "Hierarchical topology with multiple segments and redundancy"],
    correctAnswer: "Hierarchical topology with multiple segments and redundancy",
    explanation: "A hierarchical topology with multiple segments and redundancy is most appropriate for large commercial buildings as it provides reliability through redundant paths, scalability by segmenting the network into manageable zones, and performance by reducing traffic on any single network segment. This approach also allows for easier troubleshooting and maintenance."
  },
  {
    id: 'level3smarttech6',
    question: "According to BS 7671 (IET Wiring Regulations), which of the following statements is correct regarding ELV (Extra-Low Voltage) circuits used in smart home systems?",
    options: ["They do not require any special protection measures", "They must always be installed by a specialist contractor", "They must be segregated from LV (Low Voltage) circuits", "They can share the same enclosure as mains voltage without barriers"],
    correctAnswer: "They must be segregated from LV (Low Voltage) circuits",
    explanation: "BS 7671 requires that ELV circuits (typically used in many smart home control systems) must be segregated from LV circuits to prevent the risk of higher voltages being inadvertently connected to ELV systems, which could cause equipment damage or safety hazards. This segregation may be achieved using separate conduits, trunking compartments, or adequate spacing."
  },
  {
    id: 'level3smarttech7',
    question: "What technology does a DALI lighting control system use to communicate with light fixtures?",
    options: ["Wireless radio frequency", "Powerline communication", "Dedicated digital control cables", "Infrared signals"],
    correctAnswer: "Dedicated digital control cables",
    explanation: "DALI (Digital Addressable Lighting Interface) is a wired lighting control protocol that uses dedicated digital control cables to communicate with light fixtures. DALI is specified in the international standard IEC 62386 and requires a simple two-wire, polarity-insensitive bus to connect control devices to light fixtures, allowing individual addressing and dimming control."
  },
  {
    id: 'level3smarttech8',
    question: "What is the maximum number of individually addressable devices on a single DALI line according to the DALI standard?",
    options: ["16 devices", "32 devices", "64 devices", "128 devices"],
    correctAnswer: "64 devices",
    explanation: "According to the DALI standard (IEC 62386), a single DALI line can support up to 64 individually addressable devices. This limit is based on the 6-bit addressing scheme used in the protocol. Multiple DALI lines can be connected via gateways or DALI bridges to create larger systems."
  },
  {
    id: 'level3smarttech9',
    question: "What is the primary purpose of a gateway device in a smart home installation?",
    options: ["To provide internet access only", "To convert between different communication protocols", "To block unauthorized access only", "To amplify wireless signals only"],
    correctAnswer: "To convert between different communication protocols",
    explanation: "The primary purpose of a gateway device in a smart home installation is to convert between different communication protocols, enabling interoperability between systems that use different standards (e.g., KNX to IP, Zigbee to Z-Wave, or Modbus to BACnet). This allows diverse smart devices to work together in an integrated system."
  },
  {
    id: 'level3smarttech10',
    question: "Which of the following is a key requirement for G98 compliance when integrating microgeneration with a smart home energy management system?",
    options: ["The system must have a wireless connection", "Type-tested inverter with appropriate grid protection settings", "The system must be controlled via a mobile application", "Solar panels must be south-facing only"],
    correctAnswer: "Type-tested inverter with appropriate grid protection settings",
    explanation: "G98 compliance (for microgeneration systems up to 16A per phase) requires a type-tested inverter with appropriate grid protection settings, including loss of mains protection, over/under voltage, and frequency protection. These settings ensure the system disconnects safely during grid disturbances and are essential when integrating renewable generation with smart home energy management systems."
  },
  {
    id: 'level3smarttech11',
    question: "What is the key advantage of Power over Ethernet (PoE) for smart lighting control in commercial buildings?",
    options: ["Higher power delivery than conventional lighting circuits", "Simplified installation with combined power and data on a single cable", "Compatibility with all existing light fixtures", "Lower energy consumption than LED lighting"],
    correctAnswer: "Simplified installation with combined power and data on a single cable",
    explanation: "The key advantage of Power over Ethernet (PoE) for smart lighting control is simplified installation by combining power and data transmission on a single Ethernet cable. This reduces installation complexity and cost by eliminating the need for separate power and control wiring, while enabling advanced control capabilities through data integration with IT networks according to standards like IEEE 802.3bt."
  },
  {
    id: 'level3smarttech12',
    question: "According to the UK Product Security and Telecommunications Infrastructure Act 2022, what is a mandatory security requirement for smart devices sold after April 2024?",
    options: ["All devices must have facial recognition", "Manufacturers must not use universal default passwords", "All devices must have a UK-based support center", "All smart devices must be compatible with Alexa"],
    correctAnswer: "Manufacturers must not use universal default passwords",
    explanation: "The UK Product Security and Telecommunications Infrastructure Act 2022, which came into effect on 29 April 2024, mandates that manufacturers must not use universal default passwords on smart devices. Each device must have a unique password or require users to change the password during setup, improving security against unauthorized access and cyber attacks."
  },
  {
    id: 'level3smarttech13',
    question: "What is the recommended minimum IP rating for smart control equipment installed in a bathroom according to IET regulations?",
    options: ["IP20", "IP44", "IP55", "IP68"],
    correctAnswer: "IP44",
    explanation: "According to IET regulations and BS 7671, smart control equipment installed in a bathroom must have a minimum IP rating of IP44, providing protection against water splashes from any direction. This ensures the equipment is suitable for use in humid environments with potential water exposure, maintaining both safety and reliability."
  },
  {
    id: 'level3smarttech14',
    question: "Which communication protocol is best suited for battery-powered smart home sensors where low power consumption is the primary concern?",
    options: ["Wi-Fi", "Bluetooth Classic", "KNX", "Zigbee or Z-Wave"],
    correctAnswer: "Zigbee or Z-Wave",
    explanation: "Zigbee and Z-Wave are best suited for battery-powered smart home sensors where low power consumption is critical. Both protocols are designed with low energy consumption in mind, supporting sleep modes and minimal power requirements. This allows sensors to operate for months or years on small batteries, unlike Wi-Fi or Bluetooth Classic which consume significantly more power."
  },
  {
    id: 'level3smarttech15',
    question: "What is the primary consideration when selecting cable types for a KNX installation according to KNX Association guidelines?",
    options: ["Always use Cat6 Ethernet cable", "Use only manufacturer-specific proprietary cables", "Use YCYM 2x2x0.8 (dedicated KNX cable) or alternatives meeting KNX specifications", "Any standard electrical cable is suitable"],
    correctAnswer: "Use YCYM 2x2x0.8 (dedicated KNX cable) or alternatives meeting KNX specifications",
    explanation: "According to KNX Association guidelines, the primary consideration when selecting cable types for a KNX installation is to use YCYM 2x2x0.8 (dedicated KNX cable) or alternatives that meet KNX specifications. These cables ensure proper communication characteristics, including impedance and capacitance values suitable for the KNX bus system, though other cables like J-Y(St)Y 2x2x0.8 can also be used when meeting the specifications."
  },
  {
    id: 'level3smarttech16',
    question: "When planning a smart home installation that includes renewable energy integration, what is the key advantage of using a hybrid inverter?",
    options: ["Lower installation cost compared to standard inverters", "Ability to directly feed DC power to home appliances", "Integration of solar generation with battery storage under a single control system", "Capability to generate more power than a standard inverter"],
    correctAnswer: "Integration of solar generation with battery storage under a single control system",
    explanation: "The key advantage of using a hybrid inverter in a smart home with renewable energy is the integration of solar generation with battery storage under a single control system. This allows for efficient energy management, enabling excess solar power to charge batteries and then be used when needed, all managed by one system that can optimize energy flows based on usage patterns, electricity rates, and grid conditions."
  },
  {
    id: 'level3smarttech17',
    question: "Which of the following is a key requirement for a CEDIA-compliant structured wiring installation in a smart home?",
    options: ["All cables must be wireless-enabled", "Minimum of two RJ45 outlets in each habitable room", "Using only proprietary connectors", "Installing only surface-mounted cable routes"],
    correctAnswer: "Minimum of two RJ45 outlets in each habitable room",
    explanation: "CEDIA (Custom Electronic Design & Installation Association) guidelines for structured wiring in smart homes recommend a minimum of two RJ45 outlets in each habitable room to support current and future digital connectivity needs. This ensures sufficient connection points for networked devices and services, providing flexibility for changing technology requirements."
  },
  {
    id: 'level3smarttech18',
    question: "What is the primary function of an MQTT broker in a smart home system?",
    options: ["Converting analog signals to digital", "Routing voice commands to smart speakers", "Managing publish/subscribe messaging between IoT devices", "Boosting Wi-Fi signals for better coverage"],
    correctAnswer: "Managing publish/subscribe messaging between IoT devices",
    explanation: "The primary function of an MQTT (Message Queuing Telemetry Transport) broker in a smart home system is managing publish/subscribe messaging between IoT devices. It serves as a central hub where devices can publish messages to specific topics and subscribe to receive messages from topics they're interested in, enabling efficient, lightweight communication between different components of the smart home system."
  },
  {
    id: 'level3smarttech19',
    question: "According to the IET Code of Practice for Building Automation and Control Systems, what is a key consideration for cybersecurity in networked control systems?",
    options: ["Using only wireless connections", "Physical separation from IT networks", "Implementation of appropriate access controls and authentication", "Avoiding the use of encryption"],
    correctAnswer: "Implementation of appropriate access controls and authentication",
    explanation: "The IET Code of Practice for Building Automation and Control Systems emphasizes that implementing appropriate access controls and authentication is a key cybersecurity consideration for networked control systems. This includes user authentication, role-based access control, secure remote access methods, and regular security updates to protect against unauthorized access and cyber threats."
  },
  {
    id: 'level3smarttech20',
    question: "What is the primary benefit of using Power over Ethernet (PoE) for IP security cameras in a smart building?",
    options: ["Higher resolution video than standard cameras", "Simplified installation with a single cable for both power and data", "Unlimited recording capacity", "Complete wireless operation"],
    correctAnswer: "Simplified installation with a single cable for both power and data",
    explanation: "The primary benefit of using Power over Ethernet (PoE) for IP security cameras in a smart building is simplified installation with a single cable for both power and data. This eliminates the need for separate power cabling and outlets near each camera location, reducing installation time and cost while maintaining reliable power delivery according to standards like IEEE 802.3at or 802.3bt."
  },
  {
    id: 'level3smarttech21',
    question: "What is the key difference between traditional lighting control and DALI lighting control?",
    options: ["DALI requires more wiring than traditional systems", "DALI allows individual addressing and feedback from each fixture", "DALI works only with incandescent lighting", "DALI can only be controlled manually"],
    correctAnswer: "DALI allows individual addressing and feedback from each fixture",
    explanation: "The key difference between traditional lighting control and DALI (Digital Addressable Lighting Interface) is that DALI allows individual addressing and feedback from each fixture. Each DALI ballast or driver has a unique address, enabling independent control and bidirectional communication, including status reporting and fault detection. Traditional systems typically control groups of lights without individual addressing or feedback capabilities."
  },
  {
    id: 'level3smarttech22',
    question: "What is the advantage of using a BACnet protocol for integrating HVAC systems with other building services?",
    options: ["BACnet is a proprietary system ensuring security", "BACnet is designed specifically for residential applications", "BACnet is an open standard supporting interoperability between different manufacturers", "BACnet requires less cabling than other protocols"],
    correctAnswer: "BACnet is an open standard supporting interoperability between different manufacturers",
    explanation: "The advantage of using BACnet (Building Automation and Control Networks) for integrating HVAC systems with other building services is that it's an open standard (ASHRAE/ANSI/ISO 16484-5) supporting interoperability between equipment from different manufacturers. This allows building managers to select the best components for each subsystem while ensuring they can communicate effectively within an integrated building management system."
  },
  {
    id: 'level3smarttech23',
    question: "According to the IET Code of Practice, what is a key consideration when designing user interfaces for building control systems?",
    options: ["Using only touchscreen interfaces", "Making the interface as complex as possible to show system capabilities", "Designing for appropriate accessibility and usability for the intended users", "Always requiring professional operation"],
    correctAnswer: "Designing for appropriate accessibility and usability for the intended users",
    explanation: "According to the IET Code of Practice for Building Automation and Control Systems, a key consideration when designing user interfaces is designing for appropriate accessibility and usability for the intended users. This includes considering factors such as intuitive operation, appropriate text size and contrast, consistency in layout and function, and accommodating users with varying technical abilities and potential disabilities."
  },
  {
    id: 'level3smarttech24',
    question: "What is the primary consideration when installing smart home control equipment in consumer units or electrical enclosures?",
    options: ["Aesthetic appearance only", "Heat dissipation and spacing requirements", "Using only plastic enclosures", "Placing all equipment as close together as possible"],
    correctAnswer: "Heat dissipation and spacing requirements",
    explanation: "When installing smart home control equipment in consumer units or electrical enclosures, heat dissipation and spacing requirements are the primary considerations. Smart control devices often generate heat during operation and may be sensitive to excessive temperatures. Proper spacing between devices and adequate ventilation must be maintained according to manufacturer specifications to prevent overheating, which could lead to premature failure or reduced reliability."
  },
  {
    id: 'level3smarttech25',
    question: "Which wireless communication protocol is specifically designed for smart utility metering applications in the UK?",
    options: ["Bluetooth", "Zigbee", "HAN (Home Area Network) using ZigBee SEP", "Wi-Fi"],
    correctAnswer: "HAN (Home Area Network) using ZigBee SEP",
    explanation: "In the UK smart metering implementation, HAN (Home Area Network) using ZigBee SEP (Smart Energy Profile) is specifically designed for smart utility metering applications. This protocol is part of the Smart Metering Equipment Technical Specifications (SMETS) and allows secure communication between smart meters, in-home displays, and other smart energy devices while optimizing for low power consumption and reliability."
  },
  {
    id: 'level3smarttech26',
    question: "What is the key benefit of implementing a home energy management system (HEMS) with smart meter integration?",
    options: ["Eliminating the need for electricity bills", "Real-time visibility and control of energy usage patterns", "Automatic payment of utility bills", "Free electricity during off-peak hours"],
    correctAnswer: "Real-time visibility and control of energy usage patterns",
    explanation: "The key benefit of implementing a home energy management system (HEMS) with smart meter integration is real-time visibility and control of energy usage patterns. This allows homeowners to monitor consumption, identify high-usage appliances, optimize usage based on time-of-use tariffs, and integrate with renewable energy sources or battery storage to reduce costs and environmental impact."
  },
  {
    id: 'level3smarttech27',
    question: "Which of the following statements about IP (Ingress Protection) ratings for smart devices is correct?",
    options: ["The first digit indicates liquid protection, the second digit indicates solid object protection", "IP65 offers higher water protection than IP67", "IP44 is suitable for bathroom installations where water splashes may occur", "All smart home devices require a minimum IP68 rating"],
    correctAnswer: "IP44 is suitable for bathroom installations where water splashes may occur",
    explanation: "IP44 is suitable for bathroom installations where water splashes may occur. In the IP rating system, the first digit (4) indicates protection against solid objects larger than 1mm, and the second digit (4) indicates protection against water splashes from any direction. This meets the minimum requirement for electrical equipment in splash zones of bathrooms according to BS 7671 regulations."
  },
  {
    id: 'level3smarttech28',
    question: "What is the primary function of a smart energy meter's Consumer Access Device (CAD) in a UK installation?",
    options: ["To display real-time electricity prices", "To control smart appliances directly", "To provide an interface between the smart meter and home energy management systems", "To limit the maximum power consumption"],
    correctAnswer: "To provide an interface between the smart meter and home energy management systems",
    explanation: "The primary function of a smart energy meter's Consumer Access Device (CAD) in a UK installation is to provide an interface between the smart meter and home energy management systems. It connects to the smart meter's Home Area Network (HAN) and allows authorized third-party devices and services to securely access consumption data, enabling integration with energy management systems for monitoring and optimization."
  },
  {
    id: 'level3smarttech29',
    question: "What is the maximum recommended length for a KNX bus line according to KNX Association guidelines?",
    options: ["100 meters", "400 meters", "1000 meters", "2000 meters"],
    correctAnswer: "1000 meters",
    explanation: "According to KNX Association guidelines, the maximum recommended length for a KNX bus line is 1000 meters (1 kilometer). This limit ensures signal integrity across the twisted pair cable used in KNX installations. For larger installations requiring greater distances, line repeaters or IP routers can be used to extend the network while maintaining reliable communication."
  },
  {
    id: 'level3smarttech30',
    question: "When integrating an electric vehicle charging point with a smart home system, what is a key consideration regarding load management?",
    options: ["EVs must always charge at maximum power", "Smart load management can balance EV charging with other home loads to prevent overloading", "EV charging must be on a dedicated supply separate from the house", "Load management is not necessary for residential EV chargers"],
    correctAnswer: "Smart load management can balance EV charging with other home loads to prevent overloading",
    explanation: "When integrating an electric vehicle charging point with a smart home system, a key consideration is that smart load management can balance EV charging with other home loads to prevent overloading the electrical supply. This dynamic load balancing can adjust charging rates based on other active appliances, peak/off-peak tariffs, or available renewable energy, ensuring the total demand doesn't exceed the supply capacity while optimizing charging times and costs."
  },
  {
    id: 'level3smarttech31',
    question: "According to BS 7671, what is the maximum number of socket outlets permitted on a radial circuit supplying power to smart home equipment in a residential setting?",
    options: ["An unlimited number as long as the current rating is not exceeded", "No more than 2 socket outlets", "No more than 10 socket outlets", "No more than 20 socket outlets"],
    correctAnswer: "An unlimited number as long as the current rating is not exceeded",
    explanation: "According to BS 7671 (IET Wiring Regulations), there is no specified maximum number of socket outlets permitted on a radial circuit supplying power to smart home equipment in a residential setting, as long as the current rating of the circuit is not exceeded. However, good practice suggests considering the diversity of connected loads and potential future expansion when designing these circuits."
  },
  {
    id: 'level3smarttech32',
    question: "What is the key advantage of using structured wiring with a star topology in a smart home installation?",
    options: ["Lower installation cost", "Simpler cable routing", "Improved reliability with easier fault isolation", "Compatibility with all smart home protocols"],
    correctAnswer: "Improved reliability with easier fault isolation",
    explanation: "The key advantage of using structured wiring with a star topology in a smart home installation is improved reliability with easier fault isolation. When a problem occurs, it typically affects only a single run from the central distribution point to one outlet, making troubleshooting simpler. Additionally, damaged cables can be replaced individually without affecting the rest of the network, and the centralized nature facilitates system modifications and upgrades."
  },
  {
    id: 'level3smarttech33',
    question: "Which of the following is a critical security measure when installing smart door locks in a residential setting?",
    options: ["Ensuring they can only be controlled via voice command", "Using only battery-powered models", "Implementing strong encryption and secure authentication", "Avoiding integration with other home systems"],
    correctAnswer: "Implementing strong encryption and secure authentication",
    explanation: "When installing smart door locks in a residential setting, implementing strong encryption and secure authentication is a critical security measure. This protects against unauthorized access attempts, ensures that communication between the lock and control systems cannot be easily intercepted or manipulated, and prevents credential theft that could compromise physical security of the property."
  },
  {
    id: 'level3smarttech34',
    question: "What is the key limitation of using Zigbee for home automation compared to Z-Wave?",
    options: ["Zigbee has shorter range in all conditions", "Zigbee uses more power than Z-Wave", "Zigbee operates on the same 2.4GHz band as Wi-Fi, potentially causing interference", "Zigbee supports fewer devices in a network"],
    correctAnswer: "Zigbee operates on the same 2.4GHz band as Wi-Fi, potentially causing interference",
    explanation: "A key limitation of using Zigbee for home automation compared to Z-Wave is that Zigbee operates on the 2.4GHz frequency band, which is also used by Wi-Fi networks, Bluetooth devices, and microwave ovens, potentially causing interference. Z-Wave operates at lower frequencies (868MHz in Europe), avoiding this crowded spectrum and reducing the likelihood of interference in typical residential environments."
  },
  {
    id: 'level3smarttech35',
    question: "When integrating smart lighting with occupancy sensors, what is the recommended mounting height for PIR sensors in a commercial space?",
    options: ["Below 1.5 meters", "Between 2.2 and 2.8 meters", "Above 5 meters", "Directly at eye level"],
    correctAnswer: "Between 2.2 and 2.8 meters",
    explanation: "For integrating smart lighting with occupancy sensors in commercial spaces, the recommended mounting height for PIR (Passive Infrared) sensors is typically between 2.2 and 2.8 meters. This height provides optimal coverage for detecting human movement while minimizing false triggers from small animals or floor-level air movement, balancing sensitivity with practical detection area according to most manufacturer specifications."
  },
  {
    id: 'level3smarttech36',
    question: "What type of cabling is recommended for DALI lighting control systems according to the IEC 62386 standard?",
    options: ["Coaxial cable", "Standard mains cable with no special requirements", "Low-voltage cable with minimum 0.5mm² cross-sectional area", "Fiber optic cable"],
    correctAnswer: "Low-voltage cable with minimum 0.5mm² cross-sectional area",
    explanation: "According to the IEC 62386 standard for DALI (Digital Addressable Lighting Interface), the recommended cabling is low-voltage cable with a minimum cross-sectional area of 0.5mm². The DALI bus typically operates at 16V DC and requires simple twisted pair cabling with basic insulation rated for mains voltage, as DALI cables may be run alongside mains cables. Maximum permitted voltage drop considerations may require larger conductors for longer runs."
  },
  {
    id: 'level3smarttech37',
    question: "What is the primary purpose of a smart home hub or controller?",
    options: ["To provide internet access", "To centralize control and enable automation between different devices and protocols", "To boost wireless signal strength", "To provide local data storage only"],
    correctAnswer: "To centralize control and enable automation between different devices and protocols",
    explanation: "The primary purpose of a smart home hub or controller is to centralize control and enable automation between different devices and protocols. It serves as the brain of the smart home system, allowing devices from different manufacturers using various communication standards to work together, enabling advanced automation rules, scheduled operations, and providing a unified interface for users to control their entire smart home ecosystem."
  },
  {
    id: 'level3smarttech38',
    question: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, what is a key consideration when integrating EV charging with smart home systems?",
    options: ["EV chargers cannot be integrated with home systems", "Smart chargers must prioritize vehicle charging over all other loads", "Load management capabilities to prevent supply capacity exceedance", "All EV chargers must be controlled exclusively via mobile apps"],
    correctAnswer: "Load management capabilities to prevent supply capacity exceedance",
    explanation: "According to the IET Code of Practice for Electric Vehicle Charging Equipment Installation, a key consideration when integrating EV charging with smart home systems is implementing load management capabilities to prevent supply capacity exceedance. This ensures that the total electrical demand, including the EV charger and other household loads, doesn't exceed the maximum capacity of the electrical supply, preventing overloads and potential safety issues."
  },
  {
    id: 'level3smarttech39',
    question: "What is the advantage of using Cat6 or Cat6a cabling rather than Cat5e in a smart home installation?",
    options: ["Lower installation cost", "Better support for future high-bandwidth applications", "Simplified termination process", "Reduced cable diameter"],
    correctAnswer: "Better support for future high-bandwidth applications",
    explanation: "The advantage of using Cat6 or Cat6a cabling rather than Cat5e in a smart home installation is better support for future high-bandwidth applications. While Cat5e supports up to 1 Gbps, Cat6 can support up to 10 Gbps over shorter distances, and Cat6a can support 10 Gbps over the full 100-meter range. This future-proofs the installation for increasingly demanding applications like 4K/8K video streaming, cloud gaming, and more complex IoT device networks."
  },
  {
    id: 'level3smarttech40',
    question: "Which communication protocol is used for Smart Meter HAN (Home Area Network) communications in the UK smart metering system?",
    options: ["Bluetooth Low Energy", "Wi-Fi", "ZigBee Smart Energy Profile", "Z-Wave"],
    correctAnswer: "ZigBee Smart Energy Profile",
    explanation: "In the UK smart metering system, ZigBee Smart Energy Profile is the communication protocol used for the Home Area Network (HAN) between smart meters, in-home displays, and consumer access devices. This protocol was chosen for its low power consumption, security features, and suitability for the reliable transmission of metering data within the home environment as part of the Smart Metering Equipment Technical Specifications (SMETS)."
  },
  {
    id: 'level3smarttech41',
    question: "What is a key requirement for voice control systems in smart buildings according to accessibility guidelines?",
    options: ["They must only respond to male voices", "Multiple interaction methods must be available as alternatives to voice", "They must require internet connectivity at all times", "They must operate only in English"],
    correctAnswer: "Multiple interaction methods must be available as alternatives to voice",
    explanation: "According to accessibility guidelines for smart buildings, a key requirement for voice control systems is that multiple interaction methods must be available as alternatives to voice. This ensures accessibility for users with speech impairments, in noisy environments, or in situations where voice commands are impractical. Alternative control methods might include mobile apps, physical controls, or touch interfaces."
  },
  {
    id: 'level3smarttech42',
    question: "What is the key advantage of implementing a local control system rather than cloud-dependent control for smart home automation?",
    options: ["Lower initial cost", "Continued functionality during internet outages", "Simpler setup process", "Better compatibility with all devices"],
    correctAnswer: "Continued functionality during internet outages",
    explanation: "The key advantage of implementing a local control system rather than cloud-dependent control for smart home automation is continued functionality during internet outages. Local control systems process automation rules and device commands within the home network, ensuring lights, heating, security, and other critical systems continue to function even when external internet connectivity is lost, providing greater reliability and resilience."
  },
  {
    id: 'level3smarttech43',
    question: "According to the IET Wiring Regulations, what is the required separation between power cables and data cables in a smart home installation to minimize electromagnetic interference?",
    options: ["No separation is required", "At least 50mm unless shielded cables are used", "At least 200mm in all cases", "Maximum of 10mm separation"],
    correctAnswer: "At least 50mm unless shielded cables are used",
    explanation: "According to the IET Wiring Regulations (BS 7671), a separation of at least 50mm is required between power cables and data cables in a smart home installation to minimize electromagnetic interference, unless shielded cables are used. This requirement helps prevent power cables from inducing noise in data cables, which could compromise the reliability of network communications critical for smart home systems."
  },
  {
    id: 'level3smarttech44',
    question: "What is the maximum power that can be delivered by a PoE++ (802.3bt Type 4) connection to smart devices according to the IEEE standard?",
    options: ["15.4W", "30W", "60W", "90W"],
    correctAnswer: "90W",
    explanation: "According to the IEEE 802.3bt standard (PoE++), Type 4 Power over Ethernet can deliver up to 90W of power to connected devices. This higher power delivery capability makes it suitable for powering more demanding smart building equipment such as pan-tilt-zoom security cameras, video conferencing displays, thin clients, building automation controllers, and even smart lighting panels in a commercial environment."
  },
  {
    id: 'level3smarttech45',
    question: "When designing a smart home system that integrates with a home security alarm, what is a key consideration regarding system segregation?",
    options: ["Security alarms should never be integrated with smart systems", "Primary alarm functions should remain independent of the smart home system", "All systems must be fully integrated with no separation", "Security alarms must use the same protocol as lighting control"],
    correctAnswer: "Primary alarm functions should remain independent of the smart home system",
    explanation: "When designing a smart home system that integrates with a home security alarm, a key consideration is that primary alarm functions should remain independent of the smart home system. This ensures that critical security functions continue to operate reliably even if the smart home system experiences issues. The integration should be designed so that the smart system can receive status information and possibly trigger the alarm, but not in a way that could compromise the alarm's core functionality."
  },
  {
    id: 'level3smarttech46',
    question: "What is the primary difference between Modbus RTU and Modbus TCP protocols in building automation systems?",
    options: ["Modbus RTU is wireless while Modbus TCP is wired", "Modbus RTU uses serial communication while Modbus TCP uses Ethernet networks", "Modbus RTU is for residential use while Modbus TCP is for commercial buildings only", "Modbus RTU is a UK standard while Modbus TCP is international"],
    correctAnswer: "Modbus RTU uses serial communication while Modbus TCP uses Ethernet networks",
    explanation: "The primary difference between Modbus RTU and Modbus TCP protocols is that Modbus RTU uses serial communication (typically RS-485) while Modbus TCP uses Ethernet networks and the TCP/IP protocol. Modbus RTU is an older protocol that requires specific wiring topologies and has distance limitations, while Modbus TCP can leverage existing Ethernet infrastructure, allows for longer distances, and enables easier integration with IT networks and other building systems."
  },
  {
    id: 'level3smarttech47',
    question: "What is the key benefit of implementing MQTT protocol in a smart building control system?",
    options: ["It requires more processing power than other protocols", "It's specifically designed for video transmission", "Its lightweight publish/subscribe model is efficient for IoT device communication", "It can only be used with wireless devices"],
    correctAnswer: "Its lightweight publish/subscribe model is efficient for IoT device communication",
    explanation: "The key benefit of implementing MQTT (Message Queuing Telemetry Transport) protocol in a smart building control system is its lightweight publish/subscribe model, which is efficient for IoT device communication. MQTT minimizes network bandwidth and device resource requirements while providing reliable message delivery, making it ideal for connecting numerous sensors and controllers in building automation systems, especially when dealing with devices that may have limited processing power or operate on battery power."
  },
  {
    id: 'level3smarttech48',
    question: "According to the IET Code of Practice for Building Automation and Control Systems, what is a critical factor in designing user interfaces for building controls?",
    options: ["Using only touchscreen interfaces", "Ensuring interfaces are as technical as possible", "Providing clear, intuitive controls appropriate for the intended users", "Limiting user control capabilities to prevent system changes"],
    correctAnswer: "Providing clear, intuitive controls appropriate for the intended users",
    explanation: "According to the IET Code of Practice for Building Automation and Control Systems, providing clear, intuitive controls appropriate for the intended users is a critical factor in designing user interfaces for building controls. Interfaces should be easily understood by their target users, with clear labeling, consistent layout, appropriate feedback, and consideration for accessibility needs to ensure effective system operation and user satisfaction."
  },
  {
    id: 'level3smarttech49',
    question: "What is the key advantage of using Loxone's Miniserver as a building management system in small to medium commercial buildings?",
    options: ["It works exclusively with proprietary devices", "It provides integrated control across multiple systems with standardized protocols like KNX and BACnet", "It requires less wiring than other systems", "It is only suitable for residential applications"],
    correctAnswer: "It provides integrated control across multiple systems with standardized protocols like KNX and BACnet",
    explanation: "The key advantage of using Loxone's Miniserver as a building management system in small to medium commercial buildings is that it provides integrated control across multiple systems with standardized protocols like KNX and BACnet. As a certified BACnet server, it can communicate with various building systems including HVAC, lighting, and security, enabling comprehensive building automation while maintaining compatibility with industry standards for interoperability."
  },
  {
    id: 'level3smarttech50',
    question: "When installing smart heating controls in a UK residence, what is a key requirement for compliance with Building Regulations Part L?",
    options: ["Smart controls must be voice-activated", "Time and temperature zone controls must be included", "All radiators must have smart TRVs", "Control must be exclusively via smartphone app"],
    correctAnswer: "Time and temperature zone controls must be included",
    explanation: "When installing smart heating controls in a UK residence, a key requirement for compliance with Building Regulations Part L is that time and temperature zone controls must be included. These regulations require heating systems to have separate timing and temperature controls for different zones of the building to improve energy efficiency. Smart heating controls must provide this zoning capability, allowing different areas to be heated at different times and temperatures according to usage patterns."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
        await setDoc(doc(db, 'questions', 'electrical-l3-smart-tech', 'items', q.id),        {
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
