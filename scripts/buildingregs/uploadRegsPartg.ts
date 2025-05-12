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

// ✅ Building Regulations Part G - Sanitation & Hot Water Questions
const questions = [
  {
    id: 'regs-part-g-1',
    question: "What are the main areas covered by Approved Document G?",
    options: ["Only bathroom design requirements", "Sanitary facilities, hot water safety, and water efficiency", "Only water conservation measures", "Drainage systems and sewage treatment"],
    correctAnswer: "Sanitary facilities, hot water safety, and water efficiency",
    explanation: "Approved Document G covers three main areas: sanitary facilities, hot water safety, and water efficiency. It includes requirements for bathroom provision, hot water systems (including safety features to prevent scalding), and water consumption limits for new dwellings. The document provides practical guidance for meeting the requirements of Part G of the Building Regulations, ensuring buildings have adequate and safe sanitation and hot water facilities while promoting water conservation."
  },
  {
    id: 'regs-part-g-2',
    question: "What is the maximum water consumption target for new dwellings according to Approved Document G?",
    options: ["110 litres per person per day", "125 litres per person per day", "150 litres per person per day", "There is no maximum target"],
    correctAnswer: "125 litres per person per day",
    explanation: "The maximum water consumption target for new dwellings according to Approved Document G is 125 litres per person per day. This target applies to potable (drinking) water use and aims to promote water efficiency. The calculation is based on the water consumption of installed fittings and appliances using a methodology called the 'Water Efficiency Calculator'. In some areas with water scarcity, local planning authorities may set more stringent targets of 110 litres per person per day through planning conditions."
  },
  {
    id: 'regs-part-g-3',
    question: "What is the minimum requirement for sanitary provision in a dwelling according to Approved Document G?",
    options: ["At least one bathroom with toilet for every two bedrooms", "At least one toilet and one wash basin per dwelling", "At least one bathroom with WC, basin, and bath or shower per dwelling", "At least two toilets in every dwelling"],
    correctAnswer: "At least one bathroom with WC, basin, and bath or shower per dwelling",
    explanation: "According to Approved Document G, the minimum requirement for sanitary provision in a dwelling is at least one bathroom with a WC, basin, and bath or shower. This bathroom should be accessible without having to pass through another habitable room (though exceptions apply for certain small dwellings). This requirement ensures basic sanitation facilities are available within each home. For dwellings with more than 5 occupants, additional sanitary facilities are recommended but not mandated by the regulations."
  },
  {
    id: 'regs-part-g-4',
    question: "What temperature requirement does Approved Document G specify for hot water at terminal fittings in order to prevent scalding?",
    options: ["No more than 38°C", "No more than 41°C", "No more than 48°C", "No more than 60°C"],
    correctAnswer: "No more than 48°C",
    explanation: "To prevent scalding, Approved Document G specifies that hot water delivered to terminal fittings in baths should be no more than 48°C. This temperature requirement applies specifically to baths in all buildings and to showers and basins in new residential buildings including care homes, schools, and certain other buildings. The purpose is to prevent serious injury from hot water, particularly to vulnerable users like children, older people, and those with sensory impairments who might not react quickly enough to excessive temperatures."
  },
  {
    id: 'regs-part-g-5',
    question: "What is the minimum requirement for sanitary conveniences (toilets) in a workplace according to Approved Document G?",
    options: ["One toilet per 10 employees regardless of gender", "Separate toilets for men and women, with the number depending on how many employees of each gender", "One toilet, provided it has wheelchair access", "No specific requirements; it's at the employer's discretion"],
    correctAnswer: "Separate toilets for men and women, with the number depending on how many employees of each gender",
    explanation: "Approved Document G requires workplaces to have separate toilets for men and women, with the number depending on how many employees of each gender. The document includes a scale showing the minimum provision based on staff numbers. For example, for up to 5 employees of one gender, one toilet is required; for 6-25 employees, two toilets, and so on. Small businesses with no more than 10 employees may provide a single unisex toilet instead of separate facilities, provided it's in a separate room with a door that can be locked from inside."
  },
  {
    id: 'regs-part-g-6',
    question: "According to Approved Document G, what must be provided to indicate that a hot water system has reached its intended operating temperature?",
    options: ["An audible alarm", "A visual indicator", "Either a visual indicator or an audible alarm", "Temperature monitoring is not required"],
    correctAnswer: "A visual indicator",
    explanation: "According to Approved Document G, a visual indicator must be provided to show when a hot water system has reached its intended operating temperature. This applies to unvented hot water systems and is important for safe operation. The indicator helps users know when the system is up to temperature and functioning correctly. This visual indication is typically integrated into the control panel or thermostat of the hot water system and serves as both a safety feature and a means of confirming normal operation."
  },
  {
    id: 'regs-part-g-7',
    question: "Which of the following bathroom layouts would NOT meet the requirements of Approved Document G?",
    options: ["A bathroom with WC, basin, and shower on the ground floor", "A WC and basin on the ground floor with a shower room on the first floor", "A bathroom accessed only by passing through a bedroom, in a one-bedroom flat", "A bathroom accessed only by passing through a bedroom, in a three-bedroom house"],
    correctAnswer: "A bathroom accessed only by passing through a bedroom, in a three-bedroom house",
    explanation: "A bathroom accessed only by passing through a bedroom in a three-bedroom house would NOT meet the requirements of Approved Document G. The regulations specify that a bathroom containing the home's only toilet must be accessible without having to pass through another room (other than a hallway, landing, or other circulation space). There's an exception for one-bedroom dwellings, where the bathroom can be accessed through the bedroom. This requirement ensures that all household members have reasonable access to sanitary facilities without compromising the privacy of bedroom occupants."
  },
  {
    id: 'regs-part-g-8',
    question: "What requirement does Approved Document G specify for the provision of washbasins in rooms containing toilets?",
    options: ["Washbasins are only required in bathrooms, not in separate toilet rooms", "A washbasin should be provided in the same room as the toilet, or in an adjacent room providing the sole access to the toilet", "A washbasin is only required if the toilet is more than 1.5m from the nearest bathroom", "At least two washbasins must be provided for each toilet"],
    correctAnswer: "A washbasin should be provided in the same room as the toilet, or in an adjacent room providing the sole access to the toilet",
    explanation: "Approved Document G specifies that a washbasin should be provided in the same room as the toilet, or in an adjacent room providing the sole access to the toilet. This requirement helps ensure proper hand hygiene after using the toilet. The washbasin should be reasonably accessible to the toilet, and if in a separate room, that room must be the only access route to the toilet (preventing someone from bypassing the handwashing facility). The regulations also specify minimum dimensions for washbasins to ensure they're practical for handwashing."
  },
  {
    id: 'regs-part-g-9',
    question: "What is an 'unvented hot water system' as referred to in Approved Document G?",
    options: ["Any hot water system without passive ventilation", "A hot water system not connected to a cold water supply", "A sealed hot water storage system without an open vent pipe", "A system that doesn't vent steam during operation"],
    correctAnswer: "A sealed hot water storage system without an open vent pipe",
    explanation: "An unvented hot water system is a sealed hot water storage system without an open vent pipe. Unlike traditional vented systems that manage expansion through a vent pipe to a cold water storage tank, unvented systems are directly connected to the mains and operate under pressure. They have special safety features to manage expansion and prevent dangerous over-pressurization. Due to their potential hazards if incorrectly installed, Approved Document G imposes specific requirements on unvented systems, including installation by appropriately qualified persons and inclusion of multiple safety devices."
  },
  {
    id: 'regs-part-g-10',
    question: "What does Approved Document G require in terms of water efficiency labelling?",
    options: ["All water fittings must have the European Water Label", "Water efficiency labels must be left in place after installation for inspection", "New toilets must have a water efficiency label showing they use no more than 6 litres per flush", "There is no specific requirement for water efficiency labelling"],
    correctAnswer: "There is no specific requirement for water efficiency labelling",
    explanation: "Approved Document G does not contain a specific requirement for water efficiency labelling of products. While the document encourages water efficiency and sets overall consumption targets for dwellings (125 litres per person per day), it doesn't mandate specific labelling schemes. Water consumption is controlled through the performance requirements of individual fittings (e.g., maximum flush volumes for toilets) and the overall calculated consumption of the dwelling, rather than through a labelling requirement. Manufacturers may voluntarily use water efficiency labels as a way to demonstrate compliance."
  },
  {
    id: 'regs-part-g-11',
    question: "According to Approved Document G, what is required for hot water storage vessels in terms of insulation?",
    options: ["No insulation is required", "All vessels must have factory-applied insulation only", "All vessels must have insulation limiting heat loss to no more than 1.6 kWh per 24 hours per 100 litres", "Insulation is only required if the vessel capacity exceeds 100 litres"],
    correctAnswer: "All vessels must have insulation limiting heat loss to no more than 1.6 kWh per 24 hours per 100 litres",
    explanation: "According to Approved Document G, hot water storage vessels must have insulation limiting heat loss to no more than 1.6 kWh per 24 hours per 100 litres of storage volume. This requirement aims to improve energy efficiency by reducing standing heat losses from stored hot water. The insulation can be either factory-applied or installed during installation, provided it meets the thermal performance standard. This requirement applies to primary as well as secondary storage vessels, and helps both to reduce energy consumption and to maintain water temperature for user comfort."
  },
  {
    id: 'regs-part-g-12',
    question: "What is the minimum capacity for a bath as specified in Approved Document G?",
    options: ["No minimum capacity is specified", "150 litres to overflow level", "120 litres below overflow level", "40 litres drawn through the taps"],
    correctAnswer: "40 litres drawn through the taps",
    explanation: "The minimum capacity for a bath as specified in Approved Document G is 40 litres drawn through the taps. Rather than specifying the physical dimensions or total volume of the bath, the regulations focus on the usable volume of water that can be drawn into the bath. This practical approach ensures that baths provide adequate capacity for their intended use while still allowing flexibility in bath design. This minimum capacity requirement applies to dwellings and buildings containing rooms for residential purposes."
  },
  {
    id: 'regs-part-g-13',
    question: "What does Approved Document G require regarding the temperature of stored hot water to control legionella bacteria?",
    options: ["Hot water must be stored at temperatures above 60°C", "Stored hot water must not exceed 43°C", "No temperature requirement is specified for legionella control", "Hot water must be treated with chlorine"],
    correctAnswer: "Hot water must be stored at temperatures above 60°C",
    explanation: "Approved Document G requires that hot water must be stored at temperatures above 60°C to control legionella bacteria. This temperature is high enough to kill legionella bacteria, which can cause Legionnaires' disease. The document balances this requirement with anti-scalding provisions by requiring that hot water is stored at high temperature for safety against bacteria but delivered to outlets at lower temperatures (typically max 48°C for baths) to prevent scalding. This is typically achieved through thermostatic mixing valves or similar temperature control devices."
  },
  {
    id: 'regs-part-g-14',
    question: "What is the maximum permitted consumption for WCs with a full flush according to the Water Efficiency Calculator referenced in Approved Document G?",
    options: ["4 litres", "6 litres", "8 litres", "10 litres"],
    correctAnswer: "6 litres",
    explanation: "The maximum permitted consumption for WCs with a full flush according to the Water Efficiency Calculator referenced in Approved Document G is 6 litres. This limit helps reduce water consumption in new dwellings. Many modern toilets are dual-flush, with a reduced flush option (typically 4 litres or less) for liquid waste. The Water Efficiency Calculator takes the lower consumption of dual-flush toilets into account when calculating overall water use, making them advantageous for meeting the 125 litres per person per day maximum consumption target."
  },
  {
    id: 'regs-part-g-15',
    question: "According to Approved Document G, what provisions must be made for servicing and maintenance of systems requiring regular maintenance?",
    options: ["A maintenance manual must be left with the building owner", "A maintenance contract must be in place before occupation", "No specific provisions are required", "Only provisions for professional servicing access are required"],
    correctAnswer: "No specific provisions are required",
    explanation: "Approved Document G does not specify particular provisions for servicing and maintenance of systems requiring regular maintenance. While good practice would certainly include providing information to building owners and ensuring systems are accessible for maintenance, the document doesn't include explicit regulatory requirements in this area. Other parts of the Building Regulations (particularly Part L) do have requirements relating to the provision of operating and maintenance instructions for heating and hot water systems, but these are not detailed in Part G itself."
  },
  {
    id: 'regs-part-g-16',
    question: "What does Approved Document G require regarding facilities for washing food and washing dishes?",
    options: ["Every dwelling must have both a dishwasher and a kitchen sink", "Every dwelling must have a sink for food washing and dishwashing", "Food washing facilities are only required in commercial buildings", "No specific requirement is made for food washing facilities"],
    correctAnswer: "Every dwelling must have a sink for food washing and dishwashing",
    explanation: "Approved Document G requires that every dwelling must have a sink for food washing and dishwashing. This requirement ensures basic food hygiene capabilities in all homes. The sink should be provided with a supply of hot and cold water for food preparation and washing up. The document doesn't specify a dishwasher as an alternative or additional requirement - a standard kitchen sink with appropriate water supplies meets the minimum requirement. This is part of the fundamental sanitary conveniences that all dwellings must provide."
  },
  {
    id: 'regs-part-g-17',
    question: "What safety devices are required for unvented hot water storage systems under Approved Document G?",
    options: ["Only a pressure relief valve", "Only a temperature relief valve", "Both pressure and temperature relief valves, plus additional safety devices", "No safety devices are specifically required"],
    correctAnswer: "Both pressure and temperature relief valves, plus additional safety devices",
    explanation: "Unvented hot water storage systems under Approved Document G require both pressure and temperature relief valves, plus additional safety devices. These typically include an expansion vessel to accommodate water expansion, a check valve to prevent backflow, a cut-out device to stop heating if the thermostat fails, and appropriate discharge arrangements for the relief valves. These multiple layers of protection are essential because unvented systems operate under pressure and could pose significant hazards if they were to fail catastrophically. Installation must be carried out by appropriately qualified persons."
  },
  {
    id: 'regs-part-g-18',
    question: "According to Approved Document G, what is required for a hot water system in terms of design and installation?",
    options: ["It must be designed and installed to only provide hot water at exactly 45°C", "It must be designed and installed to prevent danger from any discharge from safety devices", "It must be designed and installed by a registered plumber only", "It must be designed and installed with at least two separate hot water cylinders"],
    correctAnswer: "It must be designed and installed to prevent danger from any discharge from safety devices",
    explanation: "According to Approved Document G, a hot water system must be designed and installed to prevent danger from any discharge from safety devices. Safety devices like temperature and pressure relief valves must have appropriate discharge pipes that safely convey hot water and steam away from the building's occupants in case of activation. The discharge must be visible but positioned so it cannot endanger people nearby. This requirement applies to all hot water systems with safety devices, not just unvented systems, though it's particularly important for the latter."
  },
  {
    id: 'regs-part-g-19',
    question: "What are the requirements for sanitary conveniences in buildings other than dwellings according to Approved Document G?",
    options: ["There are no specific requirements for non-dwellings", "There must be at least one toilet for every 50m² of floor area", "The number and type of conveniences depends on the nature of the building and the needs of its occupants", "All toilets must be wheelchair accessible"],
    correctAnswer: "The number and type of conveniences depends on the nature of the building and the needs of its occupants",
    explanation: "For buildings other than dwellings, Approved Document G states that the number and type of sanitary conveniences depends on the nature of the building and the needs of its occupants. The document provides scales of provision for different building types (workplaces, shopping centers, schools, etc.) and occupant numbers. It also addresses gender distribution, accessible facilities, and special provisions for certain building types. This flexible approach recognizes that different buildings have different sanitary requirements based on their function, occupancy patterns, and user needs."
  },
  {
    id: 'regs-part-g-20',
    question: "What is the maximum flow rate allowed for taps in new dwellings to meet the water efficiency calculation?",
    options: ["No maximum is specified", "4 litres per minute", "6 litres per minute", "8 litres per minute"],
    correctAnswer: "No maximum is specified",
    explanation: "Approved Document G does not specify a maximum flow rate for taps in new dwellings. Instead, the document uses an overall approach to water efficiency, with the 125 litres per person per day target applied to the whole dwelling. The calculation method assesses the combined water use of all fittings and appliances. While lower flow taps will help meet this target, there is no specific regulatory maximum for tap flow rates. Designers have flexibility in how they meet the overall target, potentially using higher flow rates in some fittings if balanced by greater efficiency elsewhere."
  },
  {
    id: 'regs-part-g-21',
    question: "According to Approved Document G, what is required when installing temperature control devices to prevent scalding?",
    options: ["They must be preset at the factory and tamper-proof", "They must be installed at the hot water storage vessel only", "They should not restrict the flow rate by more than 30%", "They must ensure the water temperature is controlled before it reaches the terminal fitting"],
    correctAnswer: "They must ensure the water temperature is controlled before it reaches the terminal fitting",
    explanation: "When installing temperature control devices to prevent scalding, Approved Document G requires that they must ensure the water temperature is controlled before it reaches the terminal fitting. This typically means installing thermostatic mixing valves (TMVs) or similar devices at or near the outlets they serve. The requirement applies particularly to baths in all buildings and to showers/basins in specified buildings. These devices mix hot and cold water to deliver a safe temperature (max 48°C for baths), protecting users from scalding while still allowing water to be stored at higher temperatures for legionella control."
  },
  {
    id: 'regs-part-g-22',
    question: "What does Approved Document G specify regarding water calculations for new dwellings?",
    options: ["Calculations must be done by the water supplier", "A water efficiency calculation must be submitted as part of the building regulation application", "Water calculations are only required for dwellings larger than 100m²", "No water calculations are required if water-efficient fittings are used"],
    correctAnswer: "A water efficiency calculation must be submitted as part of the building regulation application",
    explanation: "Approved Document G specifies that a water efficiency calculation must be submitted as part of the building regulation application for new dwellings. This calculation demonstrates compliance with the maximum water consumption target of 125 litres per person per day (or a lower target if required by the local planning authority). The calculation uses the Water Efficiency Calculator methodology, accounting for all installed fittings and appliances. Building control bodies will check this calculation before approving the application and may verify the installed fittings during site inspections."
  },
  {
    id: 'regs-part-g-23',
    question: "What requirement does Approved Document G make regarding the provision of drinking water?",
    options: ["All dwellings must have at least one tap providing drinking water", "Drinking water must be available only in the kitchen", "No specific requirement is made for drinking water provision", "Drinking water must be filtered at point of use"],
    correctAnswer: "All dwellings must have at least one tap providing drinking water",
    explanation: "Approved Document G requires that all dwellings must have at least one tap providing drinking water, typically in the kitchen. This ensures that occupants have access to potable water for drinking and food preparation without having to use bottled water or other sources. The requirement can be met by providing suitable quality water to a kitchen tap or another dedicated drinking water tap. In most UK properties, this is achieved by connecting appropriate taps directly to the mains water supply rather than to stored water systems."
  },
  {
    id: 'regs-part-g-24',
    question: "What does Approved Document G state about the use of non-potable water (like rainwater or greywater) in buildings?",
    options: ["Non-potable water systems are not permitted in dwellings", "Non-potable water can only be used for toilet flushing", "Non-potable water systems are permitted but must be designed to minimize the risk of contaminating potable water", "All new dwellings must include a non-potable water system"],
    correctAnswer: "Non-potable water systems are permitted but must be designed to minimize the risk of contaminating potable water",
    explanation: "Approved Document G states that non-potable water systems (like rainwater or greywater) are permitted but must be designed to minimize the risk of contaminating potable water. This typically requires appropriate backflow prevention, clear labeling of non-potable water pipes and outlets, and ensuring no cross-connections with the potable water system. Non-potable systems can be a good way to reduce potable water consumption, contributing to meeting water efficiency targets. The document also notes that such systems should be designed and installed in accordance with relevant standards and best practice guidance."
  },
  {
    id: 'regs-part-g-25',
    question: "What requirements does Approved Document G make regarding wholesome water supply to sanitary conveniences?",
    options: ["All sanitary conveniences must be supplied with wholesome water", "Only basin taps require wholesome water", "WC flushing requires wholesome water only", "There is no requirement for wholesome water to sanitary conveniences"],
    correctAnswer: "There is no requirement for wholesome water to sanitary conveniences",
    explanation: "Approved Document G does not require that sanitary conveniences (toilets, etc.) be supplied with wholesome (potable) water. While washbasins should be provided with wholesome water for handwashing, WC flushing and similar uses can be supplied with water of a lower quality than drinking water. This allows for the use of rainwater harvesting or greywater recycling systems for toilet flushing, which can significantly reduce potable water consumption. However, any alternative water systems must be designed to prevent contamination of the potable water supply through proper separation and backflow prevention."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-g', 'items', q.id), {
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
