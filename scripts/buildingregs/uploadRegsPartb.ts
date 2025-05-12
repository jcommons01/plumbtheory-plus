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

// ✅ Building Regulations Part B - Fire Safety Questions
const questions = [
  {
    id: 'regs-part-b-1',
    question: "What are the main sections of Approved Document B?",
    options: ["Means of escape, fire alarms, compartmentation, external fire spread", "Fire resistance, means of warning, automatic suppression, access for fire service", "Volume 1 (Dwellings) and Volume 2 (Buildings other than dwellings)", "Early, middle, and late stage fire precautions"],
    correctAnswer: "Volume 1 (Dwellings) and Volume 2 (Buildings other than dwellings)",
    explanation: "Approved Document B is divided into two main sections: Volume 1 covering dwellings and Volume 2 covering buildings other than dwellings. This division recognizes the different fire safety requirements and approaches needed for residential occupancies compared to other building types. Each volume provides specific guidance on means of warning and escape, internal fire spread (linings and structure), external fire spread, and access/facilities for fire services."
  },
  {
    id: 'regs-part-b-2',
    question: "What is a 'protected stairway' according to Approved Document B?",
    options: ["A stairway with non-combustible materials", "A stairway with a fire-resistant enclosure serving as a protected escape route", "Any stairway built after 2006", "A stairway with sprinkler protection"],
    correctAnswer: "A stairway with a fire-resistant enclosure serving as a protected escape route",
    explanation: "A protected stairway according to Approved Document B is a stairway with a fire-resistant enclosure that serves as a protected escape route. The enclosure typically provides 30 or 60 minutes fire resistance, depending on the building type and height. Protected stairways create a safe path for occupants during evacuation and prevent fire and smoke spread between floors. All doors leading to protected stairways must be fire-resisting and often self-closing to maintain the integrity of the enclosure."
  },
  {
    id: 'regs-part-b-3',
    question: "What type of system is typically required in new dwellings according to Approved Document B?",
    options: ["Grade D category LD2 fire alarm system", "Sprinkler system throughout", "Emergency lighting on all escape routes", "Smoke ventilation system"],
    correctAnswer: "Grade D category LD2 fire alarm system",
    explanation: "According to Approved Document B (Fire Safety) Volume 1, new dwellings typically require a Grade D category LD2 fire alarm system. This consists of mains-powered smoke alarms with battery backup, interconnected so when one detects fire, all alarms sound. LD2 coverage includes all circulation spaces that form part of escape routes (hallways, landings) plus high-risk areas like kitchens and living rooms. The specification ensures early fire detection and warning for occupants regardless of where a fire originates."
  },
  {
    id: 'regs-part-b-4',
    question: "What is the maximum travel distance in a dead-end corridor for offices according to Approved Document B?",
    options: ["9m", "12m", "18m", "25m"],
    correctAnswer: "18m",
    explanation: "According to Approved Document B Volume 2, the maximum travel distance in a dead-end corridor for offices is 18m. A dead-end corridor provides escape in one direction only until a point is reached where alternative escape routes become available. This distance limitation recognizes the increased risk when occupants have only one direction of escape. Different building types and risk profiles have different maximum travel distances specified in the regulations."
  },
  {
    id: 'regs-part-b-5',
    question: "What is a 'cavity barrier' in the context of Approved Document B?",
    options: ["A physical barrier that prevents water entering a cavity wall", "A construction element that closes a cavity to form a barrier to the spread of fire", "An insulation type used in cavities", "A damp-proof barrier in cavity walls"],
    correctAnswer: "A construction element that closes a cavity to form a barrier to the spread of fire",
    explanation: "A cavity barrier, as defined in Approved Document B, is a construction element that closes a cavity to form a barrier to the spread of fire. These are used to prevent hidden fire spread within concealed spaces like cavity walls, suspended ceilings, or floor voids. Cavity barriers must be properly positioned at junctions, around openings, and at specified intervals in extensive cavities. They must be constructed of fire-resistant materials and correctly installed to maintain compartmentation integrity."
  },
  {
    id: 'regs-part-b-6',
    question: "When are sprinklers required in blocks of flats according to current Approved Document B?",
    options: ["In all new blocks of flats regardless of height", "Only in blocks over 30m in height", "In blocks with a floor over 11m above ground level", "Only in the common areas of all blocks of flats"],
    correctAnswer: "In blocks with a floor over 11m above ground level",
    explanation: "According to current Approved Document B, sprinklers are required in blocks of flats where there is a floor more than 11m above ground level. This height threshold was reduced from the previous 30m following the Grenfell Tower tragedy review. The sprinkler system must cover all areas within the flats themselves, not just common areas. This requirement aims to provide an additional layer of fire protection in taller residential buildings where evacuation may be more challenging."
  },
  {
    id: 'regs-part-b-7',
    question: "What is meant by 'compartmentation' in fire safety design?",
    options: ["Dividing the building into separate commercial units", "Organizing firefighting equipment into compartments", "Subdividing a building into fire-resisting compartments", "The arrangement of furniture to prevent fire spread"],
    correctAnswer: "Subdividing a building into fire-resisting compartments",
    explanation: "Compartmentation means subdividing a building into fire-resisting compartments. These compartments are separated from one another by fire-resistant walls and floors (compartment walls/floors) to contain fire spread for a specified period, typically 30, 60, or 90 minutes depending on building type and size. Effective compartmentation limits fire damage, prevents rapid fire spread through a building, provides protected escape routes, and gives more time for evacuation and firefighting operations."
  },
  {
    id: 'regs-part-b-8',
    question: "What is the maximum permitted unprotected area for an external wall 1m from the boundary for residential buildings?",
    options: ["No limit applies", "14% of the wall area", "24% of the wall area", "Unprotected areas are not permitted at 1m from the boundary"],
    correctAnswer: "Unprotected areas are not permitted at 1m from the boundary",
    explanation: "According to Approved Document B, unprotected areas are generally not permitted in external walls 1m or less from the relevant boundary for residential buildings. This strict limitation prevents fire spread to neighboring buildings through radiation or direct flame contact. Unprotected areas include windows, doors, or parts of the wall with insufficient fire resistance. As the distance from the boundary increases, the permitted percentage of unprotected area also increases based on tables or calculations provided in the guidance."
  },
  {
    id: 'regs-part-b-9',
    question: "What is a 'fire door' according to the Building Regulations?",
    options: ["Any door leading to a fire exit", "A door made entirely of non-combustible materials", "A door that provides fire resistance and limits smoke spread", "Any door fitted with a push bar panic exit device"],
    correctAnswer: "A door that provides fire resistance and limits smoke spread",
    explanation: "A fire door according to Building Regulations is a door that provides fire resistance and limits smoke spread. Fire doors are rated by how long they can resist fire (typically FD30 for 30 minutes or FD60 for 60 minutes). They must be fitted with self-closing devices, appropriate intumescent strips and cold smoke seals, and correct fire-resistant hardware. Fire doors are a crucial part of compartmentation, protecting escape routes and preventing fire spread between different areas of a building."
  },
  {
    id: 'regs-part-b-10',
    question: "What is the standard minimum fire resistance period for a compartment wall separating flats?",
    options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
    correctAnswer: "60 minutes",
    explanation: "The standard minimum fire resistance period for a compartment wall separating flats is 60 minutes according to Approved Document B. This requirement ensures that fire is contained within the flat of origin for at least one hour, providing sufficient time for occupants to evacuate and for fire services to respond. The compartment walls must resist fire from either side and extend from the floor to the underside of the floor above, forming a complete fire-resistant barrier between adjacent flats."
  },
  {
    id: 'regs-part-b-11',
    question: "What is the purpose of 'fire stopping' in building construction?",
    options: ["To completely prevent any fires from starting", "To seal gaps around penetrations through fire-resisting elements", "To stop construction work during high fire risk periods", "To provide clearly marked fire exits"],
    correctAnswer: "To seal gaps around penetrations through fire-resisting elements",
    explanation: "Fire stopping is used to seal gaps around penetrations through fire-resisting elements such as pipes, cables, and ducts passing through compartment walls or floors. Its purpose is to maintain the fire resistance of the element being penetrated, preventing fire and smoke from spreading through these openings. Proper fire stopping must be made of appropriate fire-resistant materials suitable for the specific application and maintain the same fire resistance rating as the wall or floor it's installed in."
  },
  {
    id: 'regs-part-b-12',
    question: "What are 'reaction to fire' classifications for construction products in the European system?",
    options: ["Classes A1, A2, B, C, D, E and F", "Classes 0, 1, 2, 3 and 4", "Types I, II, III, IV and V", "Ratings High, Medium, Low and Very Low"],
    correctAnswer: "Classes A1, A2, B, C, D, E and F",
    explanation: "The European system classifies construction products' reaction to fire using classes A1, A2, B, C, D, E, and F. A1 represents the highest performance (non-combustible) and F the lowest. Additional classifications for smoke production (s1, s2, s3) and flaming droplets/particles (d0, d1, d2) are often added (e.g., B-s1, d0). Approved Document B uses these Euroclass ratings to specify the appropriate fire performance for materials used in different applications and locations within buildings."
  },
  {
    id: 'regs-part-b-13',
    question: "What is the meaning of 'simultaneous evacuation' in relation to fire safety?",
    options: ["All building occupants evacuate independently", "Fire wardens evacuate before other occupants", "All building occupants evacuate at the same time when the alarm sounds", "Occupants evacuate in pre-determined stages"],
    correctAnswer: "All building occupants evacuate at the same time when the alarm sounds",
    explanation: "Simultaneous evacuation means all building occupants evacuate at the same time when the alarm sounds. This is the default evacuation strategy for most buildings, where upon detection of fire or activation of the alarm, everyone immediately proceeds to exits and leaves the building. Approved Document B bases most of its guidance on this approach, with escape routes designed to accommodate the full building population evacuating simultaneously. Alternative strategies like phased evacuation require specific design considerations and approval."
  },
  {
    id: 'regs-part-b-14',
    question: "What is the minimum category of emergency lighting required for a non-domestic building according to BS 5266?",
    options: ["Category A - cinemas and theaters only", "Category B - sleeping accommodations", "Category C - non-residential buildings with public access", "The standard doesn't specify minimum categories for building types"],
    correctAnswer: "The standard doesn't specify minimum categories for building types",
    explanation: "BS 5266 and Approved Document B don't specify minimum categories of emergency lighting by building type in the way suggested. Instead, the requirements depend on factors like building use, size, complexity, and risk assessment. Emergency lighting must be provided on escape routes, in open areas (>60m²), high-risk areas, and to illuminate safety equipment and exit signs. The system must provide sufficient light for occupants to evacuate safely during power failure, with specific illumination levels and durations specified in the standards."
  },
  {
    id: 'regs-part-b-15',
    question: "What is the purpose of a 'firefighting shaft' in a tall building?",
    options: ["A ventilation shaft to extract smoke", "A protected shaft containing a firefighting stair, lobby and firefighting lift", "A rubbish chute designed to contain fires", "A shaft for dropping fire hoses between floors"],
    correctAnswer: "A protected shaft containing a firefighting stair, lobby and firefighting lift",
    explanation: "A firefighting shaft is a protected shaft containing a firefighting stair, lobby, and in buildings over 18m tall, a firefighting lift. It provides a protected route for firefighters to access all floors of a tall building while remaining protected from the effects of fire. The shaft must have appropriate fire resistance, smoke control measures, and dedicated access. Buildings over certain heights or floor areas require firefighting shafts at specified maximum distances from any point on each floor."
  },
  {
    id: 'regs-part-b-16',
    question: "What is a 'place of reasonable safety' according to Approved Document B?",
    options: ["The final exit from a building", "A protected staircase", "A location inside a building where people can wait for evacuation", "Any point more than 50m from a fire"],
    correctAnswer: "A location inside a building where people can wait for evacuation",
    explanation: "A place of reasonable safety, according to Approved Document B, is a location inside a building where occupants can wait temporarily with some protection before proceeding to a place of ultimate safety (outside the building). Examples include protected lobbies, corridors, or stairways with appropriate fire resistance. This concept is particularly important for phased evacuation strategies and for buildings where some occupants may need assistance or have reduced mobility, requiring them to wait safely for help."
  },
  {
    id: 'regs-part-b-17',
    question: "In which circumstances would a fire-resisting ceiling be required below a timber floor?",
    options: ["In all buildings over 3 storeys", "Where the floor separates different occupancies", "When the floor is part of a loft conversion in a house", "In any room used as a kitchen"],
    correctAnswer: "Where the floor separates different occupancies",
    explanation: "A fire-resisting ceiling would be required below a timber floor where the floor separates different occupancies (e.g., separate flats or a flat above commercial premises). This creates a compartment floor with appropriate fire resistance. The ceiling contributes significantly to the floor's overall fire resistance by protecting the timber structure from fire from below. Other situations requiring fire-resisting ceilings include floors forming part of compartmentation, protecting escape routes, or as specified for certain building types and uses."
  },
  {
    id: 'regs-part-b-18',
    question: "What is the typical minimum width requirement for a protected escape corridor in a non-domestic building?",
    options: ["750mm", "850mm", "1000mm", "1200mm"],
    correctAnswer: "1000mm",
    explanation: "The typical minimum width requirement for a protected escape corridor in a non-domestic building is 1000mm. This width ensures adequate capacity for occupants during evacuation, including those with mobility impairments. Wider corridors (1200mm or more) may be required for healthcare buildings, in areas with a higher occupancy, or where bed/wheelchair evacuation might be necessary. For small buildings with few occupants, a minimum width of 750mm may be acceptable in some circumstances."
  },
  {
    id: 'regs-part-b-19',
    question: "What is the purpose of an automatic fire detection and alarm system according to Approved Document B?",
    options: ["To automatically extinguish fires", "To detect fires and warn occupants", "To alert the fire service directly", "To prevent fires from starting"],
    correctAnswer: "To detect fires and warn occupants",
    explanation: "According to Approved Document B, the purpose of an automatic fire detection and alarm system is to detect fires and warn occupants, providing early notification so evacuation can begin promptly. These systems detect fire through heat or smoke detectors and then activate audible and sometimes visual alarm devices throughout the building. The type and coverage of system required depends on the building use, size, and risk level. In some cases, the system may also trigger other fire safety measures such as door releases or smoke control systems."
  },
  {
    id: 'regs-part-b-20',
    question: "Under which circumstances are sprinklers or other fire suppression systems required in warehouses?",
    options: ["In all warehouses regardless of size", "In warehouses exceeding 20,000m³ compartment size", "Only in warehouses storing hazardous materials", "In multi-story warehouses only"],
    correctAnswer: "In warehouses exceeding 20,000m³ compartment size",
    explanation: "According to Approved Document B, sprinklers or other appropriate fire suppression systems are required in warehouses exceeding 20,000m³ compartment size. This threshold represents the point at which passive fire protection measures alone are deemed insufficient to control fire spread in large storage buildings. With sprinklers installed, the allowable compartment size can be significantly increased. The exact requirements may vary based on the specific storage use, height, and fire load of the warehouse."
  },
  {
    id: 'regs-part-b-21',
    question: "What is meant by 'inner room' arrangement and what restriction applies to it?",
    options: ["A room with no windows; limited to 9m travel distance", "A room accessed through another room; generally not allowed as sleeping accommodation", "A room in the center of a building; must have two exits", "A room smaller than 6.5m²; limited to storage use only"],
    correctAnswer: "A room accessed through another room; generally not allowed as sleeping accommodation",
    explanation: "An inner room is one accessed through another room (the access room). The key restriction is that inner rooms generally shouldn't be used as sleeping accommodation because occupants could be trapped if fire starts in the access room. Other restrictions include maximum occupancy limits, travel distance limitations, and requirements for fire detection in the access room. Solutions include providing alternative exits, lobbies, or vision panels to allow occupants to see fire in the access room before escape routes become compromised."
  },
  {
    id: 'regs-part-b-22',
    question: "What requirements apply to external escape stairs according to Approved Document B?",
    options: ["They must be constructed of non-combustible materials only", "They must be protected from fire breaking out from the building", "They can only serve buildings up to 2 stories high", "They must always have a secondary escape route"],
    correctAnswer: "They must be protected from fire breaking out from the building",
    explanation: "According to Approved Document B, external escape stairs must be protected from fire breaking out from the building. This typically means providing fire-resisting construction (minimum 30 minutes) for any part of the building (including doors and windows) within specific distances of the stair. This protection ensures that occupants using the stair during a fire remain safe from flames and smoke emerging from the building. Additional requirements include protection from the weather, appropriate guardrails, and slip-resistant surfaces."
  },
  {
    id: 'regs-part-b-23',
    question: "What is a 'fire-fighting lift' as defined in Approved Document B?",
    options: ["Any lift in a building over 18m tall", "A lift that can be operated during a fire by firefighters", "A hoist used to lift firefighting equipment", "A specially designed evacuation lift"],
    correctAnswer: "A lift that can be operated during a fire by firefighters",
    explanation: "A fire-fighting lift is a lift that can be operated during a fire by firefighters. It must meet specific requirements in terms of size, load capacity, power supply, control systems, and protection. These lifts are enclosed in a fire-fighting shaft with a protected lobby at each level and must have a secondary power supply. They are required in buildings with floors over 18m above or 10m below fire service access level to enable firefighters to quickly reach upper/lower floors with their equipment."
  },
  {
    id: 'regs-part-b-24',
    question: "What requirements apply to hotels regarding fire detection and alarm systems?",
    options: ["A manual system is sufficient regardless of size", "An L1 automatic fire detection system covering all areas", "Category L2 system covering escape routes and high-risk areas", "Only corridor smoke detection is required"],
    correctAnswer: "An L1 automatic fire detection system covering all areas",
    explanation: "Hotels require an L1 automatic fire detection system covering all areas according to Approved Document B and BS 5839-1. This comprehensive coverage is necessary because hotels have sleeping occupants unfamiliar with the building layout. The L1 system provides detectors in all areas (including bedrooms, corridors, storage areas, and service spaces) to ensure the earliest possible fire detection and warning. This high level of protection reflects the vulnerability of sleeping occupants and the need for prompt evacuation in these occupancies."
  },
  {
    id: 'regs-part-b-25',
    question: "What is the standard minimum width requirement for a door on an escape route serving more than 60 people?",
    options: ["750mm", "800mm", "850mm", "1050mm"],
    correctAnswer: "850mm",
    explanation: "The standard minimum width requirement for a door on an escape route serving more than 60 people is 850mm according to Approved Document B. This increased width (compared to the standard 750mm minimum for doors serving fewer people) ensures adequate capacity for efficient evacuation of larger numbers of occupants. For doors serving more than 110 people, the required width increases further, calculated based on the number of occupants. These dimensions refer to the clear width when the door is open, not the structural opening size."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-b', 'items', q.id), {
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
