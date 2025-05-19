// ✅ REGENERATED: npx ts-node scripts/electrical/level3/uploadLevel3SmartTechnologyIntegration.ts

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

const questions = [
  {
    id: 'smarttech01',
    question: "What communication protocol is most commonly used in UK smart home lighting systems?",
    options: ["Zigbee", "RS-232", "Ethernet", "Coaxial"],
    correctAnswer: "Zigbee",
    explanation: "Zigbee is a popular wireless protocol for smart home devices, especially lighting due to its mesh network capability and low power consumption."
  },
  {
    id: 'smarttech02',
    question: "Which of the following is a key requirement when integrating smart thermostats into an existing heating system?",
    options: ["Dedicated fibre connection", "Smartphone pairing only", "Compatible boiler interface", "Solar panel support"],
    correctAnswer: "Compatible boiler interface",
    explanation: "Smart thermostats must be compatible with the boiler system they control, using standard interfaces like OpenTherm or relay control."
  },
  {
    id: 'smarttech03',
    question: "Which type of cabling is typically used in structured smart home wiring for data and control?",
    options: ["Twin and earth", "Cat 6", "T&E flex", "SY cable"],
    correctAnswer: "Cat 6",
    explanation: "Category 6 (Cat 6) cables are commonly used for data and control networks in smart homes due to their high-speed capabilities and reliability."
  },
  {
    id: 'smarttech04',
    question: "What is the primary advantage of a mesh network in smart home systems?",
    options: ["Higher voltage", "Redundant power", "Improved coverage", "Faster charging"],
    correctAnswer: "Improved coverage",
    explanation: "Mesh networks allow devices to relay signals through one another, improving coverage and system reliability throughout a property."
  },
  {
    id: 'smarttech05',
    question: "Which smart home protocol is designed for low-power devices and interoperability?",
    options: ["KNX", "DALI", "Thread", "DMX"],
    correctAnswer: "Thread",
    explanation: "Thread is a low-power, IPv6-based wireless protocol designed for secure, reliable communication between smart devices."
  },
  {
    id: 'smarttech06',
    question: "Which British Standard applies to general requirements for electrical installations including smart technology?",
    options: ["BS 5839", "BS 7671", "BS EN 61439", "BS 5266"],
    correctAnswer: "BS 7671",
    explanation: "BS 7671 (IET Wiring Regulations) provides general requirements for electrical installations, including those with smart technologies."
  },
  {
    id: 'smarttech07',
    question: "What type of system allows remote control of appliances using smartphone apps?",
    options: ["DALI system", "Z-wave control", "Smart home automation", "RCBO protection"],
    correctAnswer: "Smart home automation",
    explanation: "Smart home automation systems enable users to control lights, heating, and appliances remotely via smartphone apps."
  },
  {
    id: 'smarttech08',
    question: "Which feature is typically associated with smart energy meters?",
    options: ["USB ports", "Gas boiler control", "Real-time usage monitoring", "Dimmer switches"],
    correctAnswer: "Real-time usage monitoring",
    explanation: "Smart meters provide live electricity and gas usage data to users and suppliers, helping with energy management."
  },
  {
    id: 'smarttech09',
    question: "What is the purpose of a smart relay in an automation system?",
    options: ["Increase voltage", "Provide overcurrent protection", "Enable remote switching", "Convert AC to DC"],
    correctAnswer: "Enable remote switching",
    explanation: "Smart relays allow appliances or circuits to be switched remotely, often as part of a larger smart automation system."
  },
  {
    id: 'smarttech10',
    question: "Which system allows room-by-room heating control via smart valves?",
    options: ["Underfloor only", "OpenTherm", "Zoned heating", "Load compensation"],
    correctAnswer: "Zoned heating",
    explanation: "Zoned heating uses smart radiator valves or multiple thermostats to control temperatures independently in different rooms or zones."
  },
  {
    id: 'smarttech11',
    question: "Which voice assistant is compatible with most smart lighting systems?",
    options: ["Siri only", "Cortana", "Alexa", "Bixby"],
    correctAnswer: "Alexa",
    explanation: "Amazon Alexa is widely supported by smart lighting systems, allowing voice control and integration with routines."
  },
  {
    id: 'smarttech12',
    question: "How are firmware updates typically applied to smart home devices?",
    options: ["Via USB stick", "Via OTA (over-the-air)", "Manually with switches", "By power cycling"],
    correctAnswer: "Via OTA (over-the-air)",
    explanation: "Most smart devices receive updates wirelessly via over-the-air (OTA) methods, ensuring they remain secure and up to date."
  },
  {
    id: 'smarttech13',
    question: "Which feature enhances energy efficiency in smart lighting systems?",
    options: ["High wattage bulbs", "Always-on relays", "Motion sensors", "Larger transformers"],
    correctAnswer: "Motion sensors",
    explanation: "Motion sensors reduce energy usage by turning lights on only when movement is detected and off when not needed."
  },
  {
    id: 'smarttech14',
    question: "What is the primary role of a smart hub in home automation?",
    options: ["Boost Wi-Fi", "Protect against surges", "Control and coordinate devices", "Provide backup power"],
    correctAnswer: "Control and coordinate devices",
    explanation: "A smart hub connects and manages communication between smart devices, enabling automation and user control from a central point."
  },
  {
    id: 'smarttech15',
    question: "Which wireless standard offers the highest data rate for video streaming in smart homes?",
    options: ["Zigbee", "Wi-Fi 6", "Z-wave", "Bluetooth"],
    correctAnswer: "Wi-Fi 6",
    explanation: "Wi-Fi 6 offers high-speed, low-latency connections suitable for streaming high-definition video and supporting multiple devices."
  },
  {
    id: 'smarttech16',
    question: "What is a benefit of integrating smart security systems with lighting?",
    options: ["Faster heating", "Improved visual comfort", "Deterrence of intruders", "Higher energy use"],
    correctAnswer: "Deterrence of intruders",
    explanation: "Smart security systems can trigger lights when motion is detected, providing a deterrent to potential intruders."
  },
  {
    id: 'smarttech17',
    question: "Which of the following is a common UK platform used to integrate multiple smart home devices?",
    options: ["Ring", "Matter", "X10", "Xiaomi"],
    correctAnswer: "Matter",
    explanation: "Matter is a unifying smart home standard supported by major manufacturers, aiming for interoperability across devices."
  },
  {
    id: 'smarttech18',
    question: "What safety consideration is important when installing smart switches into existing UK wiring?",
    options: ["Voltage drop", "Neutral at the switch", "Use of metal backboxes", "Separate earths"],
    correctAnswer: "Neutral at the switch",
    explanation: "Many smart switches require a neutral wire at the switch position, which may not be present in older UK installations."
  },
  {
    id: 'smarttech19',
    question: "Which standard governs the safety of electrical equipment used in smart installations?",
    options: ["BS 5839", "BS EN 60335", "BS 5266", "BS EN 61008"],
    correctAnswer: "BS EN 60335",
    explanation: "BS EN 60335 outlines safety requirements for electrical appliances, including many smart-enabled devices."
  },
  {
    id: 'smarttech20',
    question: "What does geofencing enable in a smart home system?",
    options: ["Track energy bills", "Connect to local Wi-Fi", "Trigger actions based on user location", "Improve signal strength"],
    correctAnswer: "Trigger actions based on user location",
    explanation: "Geofencing allows a smart system to perform actions (like turning off lights or adjusting heating) based on a user entering or leaving a predefined area."
  },
  {
    id: 'smarttech21',
    question: "Which standard applies to radio equipment and wireless communication used in smart homes?",
    options: ["BS 7671", "EN 61000", "BS EN 301 489", "BS EN 61439"],
    correctAnswer: "BS EN 301 489",
    explanation: "BS EN 301 489 covers electromagnetic compatibility and essential requirements for radio and wireless equipment."
  },
  {
    id: 'smarttech22',
    question: "What is a common issue when integrating multiple smart devices from different brands?",
    options: ["Too much power usage", "Incompatible protocols", "Excessive noise", "Short battery life"],
    correctAnswer: "Incompatible protocols",
    explanation: "Devices from different brands may not work together unless they support a common protocol such as Matter or Zigbee."
  },
  {
    id: 'smarttech23',
    question: "Which method is often used to secure communication between smart devices?",
    options: ["WEP encryption", "PIN-only security", "End-to-end encryption", "MAC filtering"],
    correctAnswer: "End-to-end encryption",
    explanation: "End-to-end encryption secures data transfer between smart devices, reducing the risk of unauthorised access or tampering."
  },
  {
    id: 'smarttech24',
    question: "Why is firmware security important in smart technology integration?",
    options: ["Improves battery life", "Enables faster downloads", "Prevents hacking and vulnerabilities", "Reduces Wi-Fi usage"],
    correctAnswer: "Prevents hacking and vulnerabilities",
    explanation: "Firmware security prevents cyber threats and ensures devices remain protected against exploits and malware."
  },
  {
    id: 'smarttech25',
    question: "Which organisation in the UK oversees smart metering standards and rollouts?",
    options: ["OFGEM", "BSI", "NICEIC", "HSE"],
    correctAnswer: "OFGEM",
    explanation: "OFGEM regulates electricity and gas markets and oversees the rollout of smart meters across the UK."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'electrical-l3-smart-tech', 'items', q.id), {
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
