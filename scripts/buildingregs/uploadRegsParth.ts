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

// ✅ Building Regulations Part H - Drainage & Waste Questions
const questions = [
  {
    id: 'regs-part-h-1',
    question: "What are the main areas covered by Approved Document H?",
    options: ["Only drainage systems for rainwater", "Only foul water drainage systems", "Foul water drainage, wastewater treatment, rainwater drainage, and solid waste storage", "Only waste disposal units and solid waste treatment"],
    correctAnswer: "Foul water drainage, wastewater treatment, rainwater drainage, and solid waste storage",
    explanation: "Approved Document H covers four main areas: foul water drainage (from toilets, sinks, etc.), wastewater treatment systems (like septic tanks and cesspools), rainwater drainage (gutters, downpipes, etc.), and solid waste storage (bins and refuse storage areas). The document provides practical guidance on complying with Part H of the Building Regulations, ensuring buildings have adequate drainage systems to safely dispose of wastewater and rainfall, and appropriate facilities for storing solid waste."
  },
  {
    id: 'regs-part-h-2',
    question: "What is the minimum diameter for a foul drainage pipe serving a single WC according to Approved Document H?",
    options: ["32mm", "50mm", "75mm", "100mm"],
    correctAnswer: "100mm",
    explanation: "According to Approved Document H, the minimum diameter for a foul drainage pipe serving a single WC is 100mm. This relatively large diameter is necessary to adequately transport solid waste without blockages. Smaller diameter pipes are permitted for other sanitary appliances (sinks, showers, etc.) as they typically only carry liquid waste and small particles, but WCs require the full 100mm to function properly. This requirement applies to both internal soil stacks and underground drainage pipes."
  },
  {
    id: 'regs-part-h-3',
    question: "What is the minimum gradient recommended for a 100mm foul water drainage pipe?",
    options: ["1:10", "1:40", "1:80", "1:100"],
    correctAnswer: "1:40",
    explanation: "The minimum gradient recommended for a 100mm foul water drainage pipe is 1:40. This means a fall of 1 unit for every 40 units of horizontal distance (e.g., 25mm drop for every 1m of pipe). This gradient ensures adequate flow velocity to carry solid waste while preventing excessive velocity that could lead to siphonage of traps. For smaller pipes serving sinks and basins, a steeper gradient is recommended, while for larger pipes serving multiple WCs, a slightly shallower gradient may be acceptable."
  },
  {
    id: 'regs-part-h-4',
    question: "What is the purpose of a trap in sanitary pipework?",
    options: ["To catch solid waste and prevent blockages", "To maintain a water seal that prevents foul air entering the building", "To reduce water consumption", "To slow down the flow of water in the pipework"],
    correctAnswer: "To maintain a water seal that prevents foul air entering the building",
    explanation: "The purpose of a trap in sanitary pipework is to maintain a water seal that prevents foul air entering the building. Traps create a water barrier (typically 50-75mm deep) between the drainage system and the interior of the building, preventing sewer gases and odors from coming back up through fixtures like sinks, baths, and toilets. They are required for all sanitary appliances connecting to the drainage system. Common trap types include P-traps, S-traps, and bottle traps, each suited to different applications but all serving this essential function."
  },
  {
    id: 'regs-part-h-5',
    question: "According to Approved Document H, what is the recommended minimum depth of cover for a drainage pipe laid in a field or garden with no vehicular access?",
    options: ["300mm", "600mm", "900mm", "1200mm"],
    correctAnswer: "600mm",
    explanation: "According to Approved Document H, the recommended minimum depth of cover for a drainage pipe laid in a field or garden with no vehicular access is 600mm. This depth protects the pipe from damage from typical gardening activities, frost penetration, and minor surface disturbances. For areas with vehicular access, a greater cover of 900mm or more is recommended. These depths may be reduced if special protection (such as concrete encasement) is provided or if the pipe material has particularly high strength."
  },
  {
    id: 'regs-part-h-6',
    question: "What is the minimum distance recommended in Approved Document H between a new building and an existing cesspool, septic tank, or settlement tank?",
    options: ["3 meters", "7 meters", "10 meters", "15 meters"],
    correctAnswer: "7 meters",
    explanation: "Approved Document H recommends a minimum distance of 7 meters between a new building and an existing cesspool, septic tank, or settlement tank. This separation helps prevent structural damage to the building from potential leakage, reduces odor nuisance, and allows access for emptying and maintenance of the tank. The document also recommends that wastewater treatment systems should be at least 10 meters from any watercourse or permeable drain and 50 meters from any water source used for domestic consumption."
  },
  {
    id: 'regs-part-h-7',
    question: "What is the purpose of an 'access point' in a drainage system?",
    options: ["To provide an entry point for rainwater", "To allow inspection, rodding, or similar maintenance operations", "To connect different types of pipework materials", "To provide an outlet for water in case of flooding"],
    correctAnswer: "To allow inspection, rodding, or similar maintenance operations",
    explanation: "An access point in a drainage system allows inspection, rodding, or similar maintenance operations. These access points (such as rodding eyes, inspection chambers, and manholes) provide essential entry points for cleaning equipment and inspection cameras, enabling blockages to be cleared and the condition of the drainage to be assessed. Approved Document H specifies where access points should be provided (e.g., at changes of direction, pipe junctions, and at specific intervals on straight runs) and what types are appropriate in different situations."
  },
  {
    id: 'regs-part-h-8',
    question: "What is the minimum capacity required for a septic tank serving a single house with 4 bedrooms according to Approved Document H?",
    options: ["1500 liters", "2500 liters", "4000 liters", "There is no specific minimum capacity"],
    correctAnswer: "2500 liters",
    explanation: "For a septic tank serving a single house with 4 bedrooms, Approved Document H requires a minimum capacity of 2500 liters. This calculation is based on the likely number of occupants, with an allowance of 180 liters per person plus 2000 liters for sludge storage. For larger houses, the capacity should be increased accordingly. This sizing ensures adequate retention time for proper settlement of solids and sufficient sludge storage between emptying operations, typically recommended annually. Undersized tanks may require more frequent emptying and can lead to pollution problems."
  },
  {
    id: 'regs-part-h-9',
    question: "What does Approved Document H recommend regarding the provision of rodent control in drainage systems?",
    options: ["No specific provisions are required", "All drainage systems must include mechanical rodent barriers", "Access points should have sealed covers and drainage should be designed to prevent rodent entry", "Only rural properties need rodent control measures"],
    correctAnswer: "Access points should have sealed covers and drainage should be designed to prevent rodent entry",
    explanation: "Approved Document H recommends that access points should have sealed covers and drainage should be designed to prevent rodent entry. This typically means using access covers with proper seals and ensuring that any unused drainage connections are properly sealed. In areas with known rodent problems, additional measures may be needed, such as intercepting traps at strategic locations. The document recognizes that drainage systems can potentially provide routes for rodents to enter buildings if not properly designed and maintained, posing health risks and damage to infrastructure."
  },
  {
    id: 'regs-part-h-10',
    question: "According to Approved Document H, how should a soil pipe be terminated if it passes through a wall to connect to an external drain?",
    options: ["With a ventilated end cap", "With an inspection chamber within 750mm of the wall", "With mechanical protection against rodents", "With a 90-degree bend pointing downward"],
    correctAnswer: "With an inspection chamber within 750mm of the wall",
    explanation: "According to Approved Document H, when a soil pipe passes through a wall to connect to an external drain, it should be terminated with an inspection chamber within 750mm of the wall. This access point provides a crucial maintenance location at the interface between the internal and external drainage systems, allowing any blockages at this critical junction to be cleared easily. The inspection chamber also provides flexibility for any future modifications and helps prevent potential damage to the building fabric if problems occur at the connection point."
  },
  {
    id: 'regs-part-h-11',
    question: "What is the minimum recommended internal diameter for a rainwater gutter on a typical domestic pitched roof?",
    options: ["50mm", "75mm", "100mm", "150mm"],
    correctAnswer: "75mm",
    explanation: "The minimum recommended internal diameter for a rainwater gutter on a typical domestic pitched roof is 75mm according to Approved Document H. This size is suitable for a roof area up to about 18m² with a flow rate of 0.38 liters/second. Larger roof areas require bigger gutters or additional downpipes to prevent overflow. The document provides tables relating gutter size, roof area, and rainfall intensity to help designers specify appropriate guttering systems. For especially large roofs or in areas with particularly high rainfall intensity, larger gutters would be required."
  },
  {
    id: 'regs-part-h-12',
    question: "What is the primary purpose of a soakaway for rainwater drainage?",
    options: ["To filter rainwater for reuse in the building", "To store rainwater for garden use during dry periods", "To allow collected rainwater to percolate into the ground", "To slow down rainwater before it enters the main drainage system"],
    correctAnswer: "To allow collected rainwater to percolate into the ground",
    explanation: "The primary purpose of a soakaway for rainwater drainage is to allow collected rainwater to percolate into the ground. This sustainable drainage approach reduces the load on public sewers and watercourses by dealing with rainwater locally, mimicking natural processes. Approved Document H provides guidance on soakaway design, including percolation tests to assess soil suitability, sizing calculations based on rainfall intensity and roof area, and minimum distances from buildings (5m) to prevent potential foundation problems. Soakaways are particularly important in areas prone to surface water flooding."
  },
  {
    id: 'regs-part-h-13',
    question: "What does Approved Document H specify regarding the ventilation of the main drainage stack?",
    options: ["All stacks must terminate at least 3m above any openable window", "Ventilation is only required for stacks serving more than one dwelling", "The stack should normally terminate at least 900mm above any opening into the building within 3m", "Ventilation is not required if anti-siphon valves are fitted to all branches"],
    correctAnswer: "The stack should normally terminate at least 900mm above any opening into the building within 3m",
    explanation: "Approved Document H specifies that the main drainage stack should normally terminate at least 900mm above any opening into the building within 3m. This requirement ensures that foul air from the ventilated stack doesn't enter the building through windows, doors, or other openings. The stack ventilation is essential for maintaining atmospheric pressure within the drainage system, preventing trap seal loss through siphonage or compression. Alternative approaches, such as air admittance valves, may be acceptable in some situations but must be properly designed and installed."
  },
  {
    id: 'regs-part-h-14',
    question: "What is the minimum recommended distance between a new soakaway and the foundations of a building?",
    options: ["1 meter", "3 meters", "5 meters", "10 meters"],
    correctAnswer: "5 meters",
    explanation: "The minimum recommended distance between a new soakaway and the foundations of a building is 5 meters according to Approved Document H. This separation distance helps prevent water from the soakaway affecting the building's foundations, which could lead to settlement or dampness problems. The required distance may need to be increased in certain soil conditions, particularly in shrinkable clay soils where water infiltration can cause significant ground movement. For small soakaways serving single rainwater pipes, a shorter distance may sometimes be acceptable if there is no risk to the foundations."
  },
  {
    id: 'regs-part-h-15',
    question: "What does Approved Document H recommend regarding solid waste storage for a development of houses?",
    options: ["Each house should have individual storage capacity for a minimum of two weeks' waste", "Communal storage areas should always be used", "The location should enable containers to be moved to the collection point without being taken through a building", "Storage areas must always be provided with water supplies for washing down"],
    correctAnswer: "The location should enable containers to be moved to the collection point without being taken through a building",
    explanation: "Approved Document H recommends that for houses, the waste storage location should enable containers to be moved to the collection point without being taken through a building. This is to prevent hygiene issues and inconvenience associated with moving waste containers through living spaces. The guidance also states that storage areas should be accessible to the occupants, durable, sited so as not to be a nuisance to occupants or neighbors, and provide sufficient capacity based on the building's occupancy and local collection patterns. Specific capacity requirements depend on local authority collection frequencies."
  },
  {
    id: 'regs-part-h-16',
    question: "What is the maximum distance permitted between access points in a 100mm diameter drain according to Approved Document H?",
    options: ["12 meters", "22 meters", "45 meters", "No maximum is specified"],
    correctAnswer: "45 meters",
    explanation: "According to Approved Document H, the maximum distance permitted between access points in a 100mm diameter drain is 45 meters. This maximum spacing ensures that any section of drain can be reached with standard rodding or jetting equipment from access points. For larger diameter drains, the maximum distance increases (e.g., 90 meters for 150mm drains) as they are less prone to blockages and easier to clear. The type of access point (rodding eye, inspection chamber, or manhole) depends on the pipe depth and location, with more substantial access required for deeper drains."
  },
  {
    id: 'regs-part-h-17',
    question: "What is the purpose of a 'trapped gully' in a drainage system?",
    options: ["To collect leaves and prevent them entering the drain", "To maintain a water seal preventing foul air escaping", "To trap rainwater for reuse", "To avoid flooding during heavy rainfall"],
    correctAnswer: "To maintain a water seal preventing foul air escaping",
    explanation: "A trapped gully in a drainage system maintains a water seal preventing foul air escaping. Similar to the trap under a sink, the water in the gully forms a barrier that blocks sewer gases and odors from rising to the surface. Trapped gullies are used where surface water connects to a foul water system or where there is a risk of foul air causing a nuisance, such as near buildings. They are typically designed with a water seal of at least 50mm depth. The gully may also provide some basic filtration by trapping larger debris that might otherwise cause blockages."
  },
  {
    id: 'regs-part-h-18',
    question: "What does Approved Document H state about the use of pumping installations in drainage systems?",
    options: ["Pumping installations should not be used under any circumstances", "Pumping installations should only be used where gravity drainage is unfeasible", "Pumping installations must be used for all basement drainage", "Pumping installations should be used even when gravity drainage is possible"],
    correctAnswer: "Pumping installations should only be used where gravity drainage is unfeasible",
    explanation: "Approved Document H states that pumping installations should only be used where gravity drainage is unfeasible. The document emphasizes that gravity drainage is preferable wherever possible due to its greater reliability and lower maintenance requirements. Where pumping is necessary (e.g., for basements or low-lying sites), the system should be designed with appropriate safeguards including duplicate pumps, high-level alarms, and backup power supplies to ensure reliability. The document also provides guidance on pump chamber sizing, the provision of a rising main, and requirements for granular bedding and surround."
  },
  {
    id: 'regs-part-h-19',
    question: "What type of test is required for new drainage systems before they are put into use?",
    options: ["A visual inspection only", "An air test or water test", "A pressure test at 5 bar", "A flow rate test using maximum expected loading"],
    correctAnswer: "An air test or water test",
    explanation: "New drainage systems must undergo an air test or water test before being put into use, as specified in Approved Document H. These tests verify the system's watertightness and identify any defects or leaks that need to be fixed. For air tests, the system is pressurized to a specific low pressure (typically 100mm water gauge) and must maintain that pressure for a set period. For water tests, the system is filled with water and must maintain the water level. Both tests ensure the drainage system won't leak foul water into the surrounding ground or allow groundwater infiltration."
  },
  {
    id: 'regs-part-h-20',
    question: "What protection is required when a drain passes through a building structure like a wall or foundation?",
    options: ["A 100mm concrete surround", "A protective sleeve or lintelled opening to prevent damage to the pipe", "Replacement with cast iron pipe at the penetration point", "Additional access points on both sides of the structure"],
    correctAnswer: "A protective sleeve or lintelled opening to prevent damage to the pipe",
    explanation: "When a drain passes through a building structure like a wall or foundation, Approved Document H requires a protective sleeve or lintelled opening to prevent damage to the pipe. This protection allows for some movement of the structure without transferring stress to the pipe, which could cause breakage or leaks. A lintel creates a bridge over the pipe, while a sleeve provides space around it. The sleeve or opening should be large enough to allow for pipe movement and should be filled with a compressible material. This detail is particularly important as structural movement at these rigid points is a common cause of drainage problems."
  },
  {
    id: 'regs-part-h-21',
    question: "According to Approved Document H, what is the maximum recommended distance between a rainwater downpipe and the drainage gully it serves?",
    options: ["0.5 meters", "1.5 meters", "3 meters", "5 meters"],
    correctAnswer: "0.5 meters",
    explanation: "According to Approved Document H, the maximum recommended distance between a rainwater downpipe and the drainage gully it serves is 0.5 meters. This short distance minimizes splashing and ensures water effectively enters the drainage system rather than causing localized flooding or damage to the building. For distances greater than 0.5m, a purpose-made shoe or channel should be used to direct the water to the gully. This guidance aims to prevent water accumulation around foundations, which could lead to damp problems, while also reducing splash erosion on nearby surfaces."
  },
  {
    id: 'regs-part-h-22',
    question: "What does Approved Document H state about the connection of underground drainage to rising stacks?",
    options: ["Connections must always be made with a 135° bend", "Connections should be made with long radius bends or 45° bends", "Connections must always include a rodding eye", "Only vertical connections from a manhole are permitted"],
    correctAnswer: "Connections should be made with long radius bends or 45° bends",
    explanation: "Approved Document H states that connections of underground drainage to rising stacks should be made with long radius bends or 45° bends. These gradual bends reduce resistance to flow and are less prone to blockages than tight 90° bends. The connection should allow for movement due to settlement without damaging the pipework. The document also recommends providing access for rodding at these junctions to address potential blockages. This detail is important because the transition from horizontal to vertical drainage is a critical point in the system where flow characteristics change significantly."
  },
  {
    id: 'regs-part-h-23',
    question: "What is a 'percolation test' in the context of Approved Document H?",
    options: ["A test to determine the rate at which coffee passes through a filter", "A test to measure how quickly water drains through soil for designing drainage fields", "A test to check the porosity of concrete used in drainage construction", "A test to measure the speed of water flow in existing drains"],
    correctAnswer: "A test to measure how quickly water drains through soil for designing drainage fields",
    explanation: "A percolation test in the context of Approved Document H is a test to measure how quickly water drains through soil, used for designing drainage fields for septic tanks and similar systems. The test involves excavating trial holes, filling them with water, and measuring the time taken for the water level to drop by a specific amount. The results determine the soil's infiltration rate, expressed as seconds per millimeter (s/mm), which directly influences the required size of the drainage field. Soils with very fast or very slow percolation rates may be unsuitable for traditional drainage fields and require alternative approaches."
  },
  {
    id: 'regs-part-h-24',
    question: "What is the required minimum capacity for refuse storage for a building containing 12 single-bedroom flats?",
    options: ["The same as 6 houses", "The same as 8 houses", "The same as 12 houses", "Approved Document H does not specify exact capacities for flats"],
    correctAnswer: "Approved Document H does not specify exact capacities for flats",
    explanation: "Approved Document H does not specify exact capacities for refuse storage for flats. Instead, it notes that the capacity should be determined in consultation with the local authority, as collection arrangements and frequencies vary significantly between different areas. The document provides general principles, such as ensuring adequate capacity based on the building's occupancy and local collection patterns, but recognizes that specific requirements need to be determined locally. For buildings containing flats, communal storage areas are often provided, with design considerations including accessibility, noise, odor control, and visual impact."
  },
  {
    id: 'regs-part-h-25',
    question: "What recommendations does Approved Document H make regarding the positioning of inspection chambers in private gardens?",
    options: ["They should always be positioned at least 3m from the building", "They should be avoided in favor of rodding eyes wherever possible", "They should be positioned in the front garden only", "They must always have recessed covers filled with the same material as the surrounding surface"],
    correctAnswer: "They should be avoided in favor of rodding eyes wherever possible",
    explanation: "Approved Document H recommends that inspection chambers in private gardens should be avoided in favor of rodding eyes wherever possible. This guidance recognizes that inspection chambers can be visually intrusive and may cause inconvenience for garden use. Rodding eyes are smaller and less obtrusive while still providing necessary access for drainage maintenance. Where inspection chambers are unavoidable, the document suggests they should be located near boundaries or in other positions where they will cause minimum inconvenience. This approach balances the need for drainage access with the practical and aesthetic considerations of garden use."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-h', 'items', q.id), {
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
