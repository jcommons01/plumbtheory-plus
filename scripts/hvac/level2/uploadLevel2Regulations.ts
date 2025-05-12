// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Regulations.ts

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

// ✅ HVAC Level 2 Building Regulations Questions
const questions = [
  {
    id: 'hvac-l2-regulations1',
    question: "Which part of the UK Building Regulations covers ventilation requirements for buildings?",
    options: ["Part A", "Part B", "Part F", "Part L"],
    correctAnswer: "Part F",
    explanation: "Part F of the UK Building Regulations covers ventilation requirements for buildings. This section specifies the fresh air requirements, extract ventilation rates, and overall ventilation strategies needed to maintain indoor air quality. It includes specific provisions for extract ventilation in 'wet rooms' (kitchens, bathrooms, utility rooms) and minimum whole building ventilation rates."
  },
  {
    id: 'hvac-l2-regulations2',
    question: "Which part of the UK Building Regulations addresses conservation of fuel and power?",
    options: ["Part E", "Part G", "Part L", "Part P"],
    correctAnswer: "Part L",
    explanation: "Part L of the UK Building Regulations addresses the conservation of fuel and power. It sets minimum energy performance standards for buildings, including requirements for insulation levels, airtightness, heating system efficiency, lighting efficiency, and controls. For HVAC systems, it specifies minimum efficiency standards, requirements for controls, and provisions for commissioning of building services systems."
  },
  {
    id: 'hvac-l2-regulations3',
    question: "According to UK Building Regulations Part F, what is the minimum extract ventilation rate required for a domestic kitchen with a cooker hood?",
    options: ["15 l/s", "30 l/s", "60 l/s", "90 l/s"],
    correctAnswer: "30 l/s",
    explanation: "According to UK Building Regulations Part F, the minimum extract ventilation rate required for a domestic kitchen with a cooker hood is 30 l/s. This is the required extraction rate when the hood is located adjacent to the hob. If the kitchen has an extractor fan not adjacent to the hob, then a higher rate of 60 l/s is required for intermittent extraction."
  },
  {
    id: 'hvac-l2-regulations4',
    question: "What is the typical minimum energy efficiency ratio (EER) required for comfort cooling equipment according to Building Regulations Part L?",
    options: ["1.5", "2.4", "2.7", "3.5"],
    correctAnswer: "2.7",
    explanation: "According to Building Regulations Part L (2013 onwards), the typical minimum energy efficiency ratio (EER) required for comfort cooling equipment is 2.7 for smaller systems. This value may vary depending on the specific type and size of equipment, but 2.7 represents a common minimum benchmark for smaller split or packaged air conditioning systems to meet the requirements for non-domestic buildings."
  },
  {
    id: 'hvac-l2-regulations5',
    question: "Under UK Building Regulations, what document provides detailed guidance on meeting compliance with Part L for HVAC systems?",
    options: ["Approved Document K", "Approved Document M", "Non-Domestic Building Services Compliance Guide", "Domestic Building Services Compliance Guide only"],
    correctAnswer: "Non-Domestic Building Services Compliance Guide",
    explanation: "Under UK Building Regulations, the Non-Domestic Building Services Compliance Guide provides detailed guidance on meeting compliance with Part L for HVAC systems in commercial buildings. This document specifies minimum energy efficiency standards for various HVAC equipment, control requirements, and guidance on commissioning. For residential properties, there is a separate Domestic Building Services Compliance Guide."
  },
  {
    id: 'hvac-l2-regulations6',
    question: "According to Building Regulations Part L, what is the requirement for zone controls in heating systems?",
    options: ["They are only required in buildings over 500m²", "They are required for separate floors of a building where the floor area exceeds 150m²", "They are only required for residential properties", "They are only needed if the building has multiple occupants"],
    correctAnswer: "They are required for separate floors of a building where the floor area exceeds 150m²",
    explanation: "According to Building Regulations Part L and its associated compliance guides, zone controls are required for separate floors of a building where the floor area exceeds 150m². This requirement ensures that heating can be controlled independently in different zones of the building, allowing areas with different heating requirements or occupancy patterns to be controlled separately for improved comfort and energy efficiency."
  },
  {
    id: 'hvac-l2-regulations7',
    question: "Under Building Regulations Part F, what is the minimum whole building ventilation rate for a 3-bedroom dwelling with 4 occupants?",
    options: ["13 l/s", "21 l/s", "29 l/s", "37 l/s"],
    correctAnswer: "29 l/s",
    explanation: "Under Building Regulations Part F, the minimum whole building ventilation rate is calculated based on the number of bedrooms or occupants, whichever gives the higher value. For a 3-bedroom dwelling, the base rate is 21 l/s plus 4 l/s per occupant beyond 2 people. With 4 occupants, this gives 21 + (2 × 4) = 29 l/s as the minimum required whole building ventilation rate."
  },
  {
    id: 'hvac-l2-regulations8',
    question: "According to UK Building Regulations, what is the typical maximum permissible specific fan power (SFP) for a central mechanical ventilation system with heating and cooling?",
    options: ["1.5 W/(l/s)", "2.0 W/(l/s)", "2.5 W/(l/s)", "3.0 W/(l/s)"],
    correctAnswer: "2.0 W/(l/s)",
    explanation: "According to UK Building Regulations Part L and the Non-Domestic Building Services Compliance Guide, the typical maximum permissible specific fan power (SFP) for a central mechanical ventilation system with heating and cooling is 2.0 W/(l/s). This limit applies to new buildings and represents the maximum power consumption allowed per unit of airflow to ensure energy-efficient fan operation."
  },
  {
    id: 'hvac-l2-regulations9',
    question: "Under Building Regulations Part J, what provision must be made for the supply of combustion air to a room containing a gas boiler with a net input rating of 25kW?",
    options: ["No special provision is needed", "At least 50cm² of permanent ventilation", "At least 500cm² of permanent ventilation", "The boiler must be room-sealed regardless of ventilation"],
    correctAnswer: "At least 50cm² of permanent ventilation",
    explanation: "Under Building Regulations Part J, a room containing an open-flued gas boiler with a net input rating of 25kW requires at least 50cm² (500mm²) of permanent ventilation to provide adequate combustion air. This is calculated based on the requirement of 5cm² per kW of net input rating above 7kW, or (25-7) × 5 = 90cm². However, if the boiler is room-sealed (balanced flue), no additional permanent ventilation is required."
  },
  {
    id: 'hvac-l2-regulations10',
    question: "According to Building Regulations Part L, what is the maximum permissible heat loss from hot water storage vessels?",
    options: ["1.0 kWh/24h", "1.6 kWh/24h", "2.5 kWh/24h", "3.7 kWh/24h"],
    correctAnswer: "1.6 kWh/24h",
    explanation: "According to Building Regulations Part L and its associated compliance guides, the maximum permissible heat loss from a domestic hot water storage vessel of typical size (around 120-160 liters) is approximately 1.6 kWh/24h. The specific limit may vary slightly based on the exact capacity of the vessel, but this represents a common benchmark for standard domestic installations to ensure energy-efficient hot water storage."
  },
  {
    id: 'hvac-l2-regulations11',
    question: "Under UK Building Regulations, what is the maximum permissible air permeability for new dwellings?",
    options: ["3 m³/(h.m²) at 50 Pa", "5 m³/(h.m²) at 50 Pa", "10 m³/(h.m²) at 50 Pa", "15 m³/(h.m²) at 50 Pa"],
    correctAnswer: "10 m³/(h.m²) at 50 Pa",
    explanation: "Under UK Building Regulations Part L, the maximum permissible air permeability for new dwellings is 10 m³/(h.m²) at 50 Pa. This represents the maximum allowable air leakage rate through the building fabric per square meter of envelope area when the building is pressurized to 50 Pascals. Lower (better) values are encouraged, and many new builds aim for 5-7 m³/(h.m²) or better to improve energy efficiency."
  },
  {
    id: 'hvac-l2-regulations12',
    question: "According to Building Regulations, what level of carbon monoxide (CO) protection is required for a new fixed combustion appliance installation in a dwelling?",
    options: ["No CO alarm is required", "CO alarm only in the same room as a solid fuel appliance", "CO alarm in the same room as any fuel-burning appliance", "CO alarm on every floor regardless of appliance type"],
    correctAnswer: "CO alarm in the same room as any fuel-burning appliance",
    explanation: "According to Building Regulations, a carbon monoxide alarm is required in the same room as any fuel-burning appliance (solid fuel, gas, or oil) in new installations. This requirement was expanded by the 2022 amendment to the regulations (The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022), requiring CO alarms in rooms with any fixed combustion appliance, excluding those used solely for cooking."
  },
  {
    id: 'hvac-l2-regulations13',
    question: "Which document provides practical guidance on meeting the requirements of Part F for ventilation in existing buildings undergoing energy efficiency renovations?",
    options: ["The Domestic Building Services Compliance Guide", "Approved Document L1B", "Approved Document F Volume 2", "Energy Performance of Buildings Directive"],
    correctAnswer: "Approved Document F Volume 2",
    explanation: "Approved Document F Volume 2: Existing Dwellings provides practical guidance on meeting the requirements of Part F for ventilation in existing buildings undergoing energy efficiency renovations. It addresses the ventilation requirements when performing energy efficiency upgrades that might affect air tightness, such as ensuring adequate background ventilation is maintained when replacing windows or adding insulation."
  },
  {
    id: 'hvac-l2-regulations14',
    question: "Under Building Regulations Part L, what is the maximum allowable U-value for replacement windows in existing dwellings?",
    options: ["1.0 W/m²K", "1.4 W/m²K", "1.8 W/m²K", "2.2 W/m²K"],
    correctAnswer: "1.4 W/m²K",
    explanation: "Under Building Regulations Part L1B for existing dwellings, the maximum allowable U-value for replacement windows is 1.4 W/m²K for the whole window (frame and glass combined). This requirement applies when replacing windows in existing buildings and helps ensure that replacement windows provide adequate thermal performance to reduce heat loss and improve energy efficiency."
  },
  {
    id: 'hvac-l2-regulations15',
    question: "According to UK Building Regulations, what is the requirement for control of a gas-fired central heating system?",
    options: ["Timer only", "Time and temperature control only", "Time and temperature control with thermostatic radiator valves (TRVs) on all radiators", "Time and temperature control with TRVs on all radiators except in rooms with room thermostats"],
    correctAnswer: "Time and temperature control with TRVs on all radiators except in rooms with room thermostats",
    explanation: "According to UK Building Regulations Part L and associated compliance guides, a gas-fired central heating system must have time and temperature control with thermostatic radiator valves (TRVs) on all radiators except in rooms with room thermostats. This allows for independent temperature control in each room, improving comfort and energy efficiency by preventing overheating in rooms that require less heating."
  },
  {
    id: 'hvac-l2-regulations16',
    question: "Under Building Regulations Part F, what is the minimum extract ventilation rate required for a domestic bathroom?",
    options: ["8 l/s", "15 l/s", "21 l/s", "30 l/s"],
    correctAnswer: "15 l/s",
    explanation: "Under Building Regulations Part F, the minimum extract ventilation rate required for a domestic bathroom is 15 l/s for intermittent extract ventilation, or 8 l/s for continuous extract ventilation. These rates ensure adequate removal of moisture to prevent condensation problems and the growth of mold, which could affect the health of occupants and the integrity of the building fabric."
  },
  {
    id: 'hvac-l2-regulations17',
    question: "According to Building Regulations Part L, what is the minimum seasonal coefficient of performance (SCOP) required for an air-to-water heat pump in a new dwelling?",
    options: ["2.0", "2.5", "2.7", "3.2"],
    correctAnswer: "2.7",
    explanation: "According to Building Regulations Part L and the Domestic Building Services Compliance Guide, the minimum seasonal coefficient of performance (SCOP) required for an air-to-water heat pump in a new dwelling is typically 2.7. This efficiency requirement helps ensure that heat pumps installed in new buildings contribute effectively to reducing carbon emissions and energy consumption."
  },
  {
    id: 'hvac-l2-regulations18',
    question: "Under UK Building Regulations, which document provides detailed guidance on the design and installation of mechanical ventilation with heat recovery (MVHR) systems?",
    options: ["Domestic Ventilation Compliance Guide", "The Renewable Energy Guide", "HVAC Systems Design Manual", "Building Control Fire Safety Guide"],
    correctAnswer: "Domestic Ventilation Compliance Guide",
    explanation: "The Domestic Ventilation Compliance Guide provides detailed guidance on the design and installation of mechanical ventilation with heat recovery (MVHR) systems. It includes information on sizing, ductwork design, commissioning, and testing requirements to ensure compliance with Building Regulations Part F. The guide helps installers and designers achieve adequate ventilation rates while maximizing energy efficiency."
  },
  {
    id: 'hvac-l2-regulations19',
    question: "According to Building Regulations Part L, what is the minimum insulation thickness typically required for hot water storage vessels?",
    options: ["25mm", "35mm", "50mm", "80mm"],
    correctAnswer: "50mm",
    explanation: "According to Building Regulations Part L and its associated compliance guides, the minimum insulation thickness typically required for hot water storage vessels is 50mm of factory-applied insulation (or equivalent performance). This requirement helps minimize standing heat losses from stored hot water, improving the energy efficiency of the hot water system and reducing operating costs."
  },
  {
    id: 'hvac-l2-regulations20',
    question: "Under Building Regulations Part F, what type of trickle ventilators are required for background ventilation in habitable rooms?",
    options: ["Fixed openings only", "Manually adjustable only", "Humidity-controlled only", "Either manually adjustable or humidity-controlled"],
    correctAnswer: "Either manually adjustable or humidity-controlled",
    explanation: "Under Building Regulations Part F, either manually adjustable or humidity-controlled trickle ventilators are acceptable for providing background ventilation in habitable rooms. These ventilators, typically installed in window frames or walls, provide controllable background ventilation to maintain indoor air quality. Humidity-controlled versions automatically adjust airflow based on indoor humidity levels, helping to prevent condensation."
  },
  {
    id: 'hvac-l2-regulations21',
    question: "According to Building Regulations Part L, what is required when replacing a gas boiler in an existing dwelling?",
    options: ["Any standard boiler is acceptable", "A condensing boiler with minimum 86% efficiency", "A condensing boiler with minimum 92% efficiency (ErP A-rated)", "A heat pump must be installed instead"],
    correctAnswer: "A condensing boiler with minimum 92% efficiency (ErP A-rated)",
    explanation: "According to Building Regulations Part L, when replacing a gas boiler in an existing dwelling, a condensing boiler with a minimum 92% efficiency (ErP A-rated) must be installed. This ensures that replacement heating systems meet current energy efficiency standards, reducing carbon emissions and energy consumption compared to older non-condensing boilers."
  },
  {
    id: 'hvac-l2-regulations22',
    question: "Under UK Building Regulations Part B, what is required for ventilation ductwork that passes through a fire compartment wall?",
    options: ["No special measures are needed", "The ductwork must be routed around the wall instead", "Fire dampers or fire-resisting enclosures must be provided", "Only non-combustible ductwork can be used"],
    correctAnswer: "Fire dampers or fire-resisting enclosures must be provided",
    explanation: "Under UK Building Regulations Part B (Fire Safety), when ventilation ductwork passes through a fire compartment wall, fire dampers or fire-resisting enclosures must be provided. These measures help maintain the fire separation between compartments by preventing the spread of fire and smoke through the ductwork, in accordance with BS 9999 and other relevant standards."
  },
  {
    id: 'hvac-l2-regulations23',
    question: "According to Building Regulations Part L, what is the typical maximum specific fan power (SFP) allowed for a ducted supply and extract ventilation system with heat recovery in a new dwelling?",
    options: ["0.8 W/(l/s)", "1.2 W/(l/s)", "1.5 W/(l/s)", "2.0 W/(l/s)"],
    correctAnswer: "1.5 W/(l/s)",
    explanation: "According to Building Regulations Part L and the Domestic Ventilation Compliance Guide, the typical maximum specific fan power (SFP) allowed for a ducted supply and extract ventilation system with heat recovery in a new dwelling is 1.5 W/(l/s). This limit ensures that the electrical energy used to move air through the ventilation system does not outweigh the benefits of heat recovery."
  },
  {
    id: 'hvac-l2-regulations24',
    question: "Under UK Building Regulations, what is the minimum efficiency requirement for a heat recovery device in an MVHR system?",
    options: ["45%", "55%", "67%", "73%"],
    correctAnswer: "73%",
    explanation: "Under UK Building Regulations and the Domestic Ventilation Compliance Guide, the minimum efficiency requirement for a heat recovery device in a Mechanical Ventilation with Heat Recovery (MVHR) system is 73%. This requirement ensures that the system recovers a significant proportion of the heat from the extract air, improving overall energy efficiency and helping to meet carbon reduction targets."
  },
  {
    id: 'hvac-l2-regulations25',
    question: "According to Building Regulations Part P, who can legally install a new electric shower as part of a bathroom renovation?",
    options: ["Any competent DIY enthusiast", "Only a qualified plumber", "A Part P registered electrician or someone whose work is checked by a registered third-party certifier", "Only a Gas Safe registered engineer"],
    correctAnswer: "A Part P registered electrician or someone whose work is checked by a registered third-party certifier",
    explanation: "According to Building Regulations Part P, a new electric shower (which is classified as notifiable electrical work in a special location) must be installed by a Part P registered electrician or someone whose work is checked and certified by a registered third-party certifier. This ensures that electrical installations in potentially dangerous locations like bathrooms meet safety standards and comply with regulations."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-regulations', 'items', q.id), {
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
