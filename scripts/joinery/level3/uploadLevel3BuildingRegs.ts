// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3BuildingRegs.ts

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

// ✅ Joinery Level 3 Building Regulations & Standards Questions
const questions = [
  {
    id: 'joinery-l3-building-regs1',
    question: "According to UK Building Regulations, what is the minimum clear width required for entrance doors in new dwellings to allow wheelchair access?",
    options: ["600mm", "725mm", "775mm", "900mm"],
    correctAnswer: "775mm",
    explanation: "According to Approved Document M of the UK Building Regulations, the minimum clear width required for entrance doors in new dwellings to allow wheelchair access is 775mm. This ensures sufficient clearance for wheelchair users to pass through the doorway comfortably and is measured when the door is open at 90 degrees, from the face of the door to the opposing stop."
  },
  {
    id: 'joinery-l3-building-regs2',
    question: "Under UK Building Regulations, what is the primary purpose of Approved Document B?",
    options: ["Ventilation requirements", "Sound insulation between properties", "Fire safety", "Conservation of fuel and power"],
    correctAnswer: "Fire safety",
    explanation: "Approved Document B of the UK Building Regulations addresses fire safety. It provides practical guidance on meeting the fire safety requirements of the Building Regulations, covering topics such as means of escape, fire detection and alarm systems, internal fire spread (linings and structure), external fire spread, and access facilities for the fire service."
  },
  {
    id: 'joinery-l3-building-regs3',
    question: "What is the maximum rise (height) permitted for a single step in a domestic staircase under UK Building Regulations?",
    options: ["150mm", "190mm", "220mm", "250mm"],
    correctAnswer: "220mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the maximum rise (height) permitted for a single step in a domestic staircase is 220mm. This regulation ensures safe and comfortable stair designs. The regulations also specify a minimum going (tread depth) of 220mm and require consistent dimensions throughout the flight."
  },
  {
    id: 'joinery-l3-building-regs4',
    question: "Under UK Building Regulations, what is the minimum requirement for toughened or laminated safety glass in 'critical locations'?",
    options: ["Only in public buildings", "Only in glazed doors", "In windows below 800mm from floor level and in doors/sidepanels below 1500mm from floor level", "Only in bathrooms"],
    correctAnswer: "In windows below 800mm from floor level and in doors/sidepanels below 1500mm from floor level",
    explanation: "UK Building Regulations (Approved Document K) require toughened or laminated safety glass in 'critical locations' which include windows below 800mm from floor level and in doors/sidepanels below 1500mm from floor level. These areas have higher risk of human impact, and safety glass reduces injury risk by breaking safely if impacted."
  },
  {
    id: 'joinery-l3-building-regs5',
    question: "What is the maximum allowable U-value for replacement windows in existing dwellings in England according to current Building Regulations?",
    options: ["1.0 W/m²K", "1.4 W/m²K", "1.6 W/m²K", "2.0 W/m²K"],
    correctAnswer: "1.4 W/m²K",
    explanation: "According to Approved Document L1B of the UK Building Regulations, the maximum allowable U-value for replacement windows in existing dwellings in England is 1.4 W/m²K. This thermal performance standard aims to improve energy efficiency in existing buildings. Windows must be certified to meet this standard, and the requirement applies to the whole window assembly including frame and glass."
  },
  {
    id: 'joinery-l3-building-regs6',
    question: "According to UK Building Regulations, what is the minimum height requirement for guarding (balustrades) on stairs, landings, and edges of floors where there is a drop of more than 600mm?",
    options: ["600mm", "800mm", "900mm", "1100mm"],
    correctAnswer: "900mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the minimum height requirement for guarding (balustrades) on stairs, landings, and edges of floors where there is a drop of more than 600mm is 900mm. This height increases to 1100mm in buildings with anticipated crowds. The guarding must be designed to prevent children from readily climbing it and to withstand specified loads."
  },
  {
    id: 'joinery-l3-building-regs7',
    question: "Under UK Building Regulations, what is the minimum clear opening height required for escape windows in habitable rooms not on the ground floor?",
    options: ["450mm", "600mm", "800mm", "900mm"],
    correctAnswer: "600mm",
    explanation: "According to Approved Document B of the UK Building Regulations, the minimum clear opening height required for escape windows in habitable rooms not on the ground floor is 600mm. Additionally, the minimum clear opening width must be 450mm, and the total clear openable area must be at least 0.33m². These dimensions ensure adequate size for emergency egress."
  },
  {
    id: 'joinery-l3-building-regs8',
    question: "What does BS 8213 primarily provide guidance on?",
    options: ["Timber quality", "Installation of windows and doors", "Structural calculations", "Fire protection systems"],
    correctAnswer: "Installation of windows and doors",
    explanation: "BS 8213 primarily provides guidance on the installation of windows and doors. This British Standard offers detailed specifications and best practices for survey, installation, and maintenance of windows and doors, including safety considerations during installation, weathertightness, security features, and general performance requirements."
  },
  {
    id: 'joinery-l3-building-regs9',
    question: "According to UK Building Regulations Approved Document M, what is the minimum corridor width required for wheelchair accessibility in non-domestic buildings?",
    options: ["800mm", "900mm", "1200mm", "1500mm"],
    correctAnswer: "1200mm",
    explanation: "According to UK Building Regulations Approved Document M (Access to and use of buildings), the minimum corridor width required for wheelchair accessibility in non-domestic buildings is 1200mm. This width ensures adequate space for wheelchair users to maneuver, including passing through corridors and turning where necessary."
  },
  {
    id: 'joinery-l3-building-regs10',
    question: "Under the Building Regulations, what is the maximum permitted distance between a habitable room and the exit door from a flat?",
    options: ["7.5 meters", "9 meters", "18 meters", "35 meters"],
    correctAnswer: "9 meters",
    explanation: "Under the Building Regulations Approved Document B (Fire Safety), the maximum permitted distance between a habitable room and the exit door from a flat is 9 meters. This travel distance restriction is designed to ensure occupants can evacuate quickly in case of fire, limiting exposure to potential hazards during escape."
  },
  {
    id: 'joinery-l3-building-regs11',
    question: "What is the purpose of BS 6375 in relation to joinery?",
    options: ["It specifies timber quality grades", "It defines performance requirements for windows and doors", "It provides guidelines for staircase construction", "It covers fire resistance of timber structures"],
    correctAnswer: "It defines performance requirements for windows and doors",
    explanation: "BS 6375 defines performance requirements for windows and doors. This British Standard is divided into parts covering weather tightness, operational and strength characteristics, and additional performance features. It sets the testing methods and classification systems for factors like air permeability, water tightness, wind resistance, and operating forces."
  },
  {
    id: 'joinery-l3-building-regs12',
    question: "According to UK Building Regulations, what is a 'protected stairway'?",
    options: ["A stairway with a handrail", "A stairway made of non-combustible materials", "A stairway that is enclosed with fire-resisting construction", "A stairway designed for disabled access only"],
    correctAnswer: "A stairway that is enclosed with fire-resisting construction",
    explanation: "According to UK Building Regulations Approved Document B, a 'protected stairway' is a stairway that is enclosed with fire-resisting construction. This creates a protected escape route from upper floors, designed to remain safe for occupants to use in the event of a fire. Protected stairways form a crucial part of a building's fire safety strategy by providing both means of escape and compartmentation."
  },
  {
    id: 'joinery-l3-building-regs13',
    question: "What is the minimum dimension required for the going (tread depth) of steps in a private staircase according to UK Building Regulations?",
    options: ["200mm", "220mm", "250mm", "300mm"],
    correctAnswer: "220mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the minimum dimension required for the going (tread depth) of steps in a private staircase is 220mm. This minimum ensures steps are deep enough to safely place a foot while ascending or descending. The regulations also specify a maximum rise of 220mm and that dimensions should be consistent throughout the flight."
  },
  {
    id: 'joinery-l3-building-regs14',
    question: "Under the Building Regulations, what is the minimum requirements for fire doors in a domestic dwelling?",
    options: ["Only required in commercial buildings", "FD20 fire doors between a dwelling and an integral garage", "FD30 fire doors between a dwelling and an integral garage", "All internal doors must be fire doors"],
    correctAnswer: "FD30 fire doors between a dwelling and an integral garage",
    explanation: "Under UK Building Regulations Approved Document B, FD30 fire doors (providing 30 minutes fire resistance) are required between a dwelling and an integral garage. Additionally, fire doors are required for doors opening onto protected escape routes in three-storey homes. These doors help prevent fire spread, compartmentalizing the building to protect escape routes and contain fires."
  },
  {
    id: 'joinery-l3-building-regs15',
    question: "Which British Standard (BS) relates to the dimensional coordination of kitchen fittings?",
    options: ["BS 4040", "BS 6222", "BS 8213", "BS 5395"],
    correctAnswer: "BS 6222",
    explanation: "BS 6222 relates to the dimensional coordination of kitchen fittings. This British Standard provides specifications for domestic kitchen equipment, covering the design, installation, coordination, and performance requirements of kitchen furniture. It helps ensure proper fitting and functional operation of kitchen components through standardized dimensions and performance criteria."
  },
  {
    id: 'joinery-l3-building-regs16',
    question: "What is the primary purpose of Approved Document E of the Building Regulations?",
    options: ["Fire safety", "Ventilation", "Resistance to the passage of sound", "Conservation of fuel and power"],
    correctAnswer: "Resistance to the passage of sound",
    explanation: "The primary purpose of Approved Document E of the Building Regulations is 'Resistance to the passage of sound'. This document provides guidance on meeting requirements for sound insulation between spaces, covering aspects such as airborne and impact sound transmission between dwellings, rooms within dwellings, and in schools, ensuring adequate acoustic privacy and comfort for occupants."
  },
  {
    id: 'joinery-l3-building-regs17',
    question: "What is the minimum headroom clearance required for the full width of a staircase in a dwelling according to UK Building Regulations?",
    options: ["1.8 meters", "1.9 meters", "2.0 meters", "2.1 meters"],
    correctAnswer: "2.0 meters",
    explanation: "According to Approved Document K of the UK Building Regulations, the minimum headroom clearance required for the full width of a staircase in a dwelling is 2.0 meters, measured vertically from the pitch line. This requirement ensures sufficient head clearance for users ascending or descending the stairs, preventing injuries from overhead obstructions."
  },
  {
    id: 'joinery-l3-building-regs18',
    question: "Under the Building Regulations, what is the meaning of the term 'protected route'?",
    options: ["A route only to be used by emergency services", "A route suitable for disabled access", "A route that is protected from the weather", "A designated escape route that has fire-resisting construction and protection"],
    correctAnswer: "A designated escape route that has fire-resisting construction and protection",
    explanation: "Under the Building Regulations, a 'protected route' is a designated escape route that has fire-resisting construction and protection. These routes (corridors, hallways, stairways) are designed to remain usable for evacuation during a fire, with fire-resistant walls, floors, and doors preventing fire and smoke spread for a specified period, allowing occupants to evacuate safely."
  },
  {
    id: 'joinery-l3-building-regs19',
    question: "What does the Secured by Design (SBD) scheme primarily address in joinery elements?",
    options: ["Energy efficiency", "Security and crime prevention", "Structural stability", "Sound insulation"],
    correctAnswer: "Security and crime prevention",
    explanation: "The Secured by Design (SBD) scheme primarily addresses security and crime prevention in joinery elements. This UK police initiative focuses on designing out crime through physical security measures. For joinery, it specifies standards for doors, windows, and locks that resist forced entry, requiring products to meet specific security testing standards to receive certification."
  },
  {
    id: 'joinery-l3-building-regs20',
    question: "According to UK Building Regulations, what is required to demonstrate compliance with energy efficiency requirements when replacing windows in existing dwellings?",
    options: ["No compliance evidence is required", "Self-certification through a FENSA registered installer or Building Control approval", "Energy efficiency is only relevant for new buildings", "Only windows in conservation areas need to comply"],
    correctAnswer: "Self-certification through a FENSA registered installer or Building Control approval",
    explanation: "According to UK Building Regulations, compliance with energy efficiency requirements when replacing windows in existing dwellings can be demonstrated through self-certification by a FENSA registered installer (or equivalent competent person scheme) or through Building Control approval. This ensures replacement windows meet minimum thermal performance standards (U-values) and are properly installed."
  },
  {
    id: 'joinery-l3-building-regs21',
    question: "What is the maximum opening permitted in guarding (balustrades) to prevent children from falling through, according to UK Building Regulations?",
    options: ["50mm", "75mm", "100mm", "125mm"],
    correctAnswer: "100mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the maximum opening permitted in guarding (balustrades) to prevent children from falling through is 100mm. This requirement applies to any openings in the guarding system, ensuring a sphere of 100mm diameter cannot pass through any part of the guarding, protecting children from falling through gaps."
  },
  {
    id: 'joinery-l3-building-regs22',
    question: "Under UK regulations, what is the minimum door width required for accessible WC facilities in non-domestic buildings?",
    options: ["725mm", "775mm", "800mm", "900mm"],
    correctAnswer: "800mm",
    explanation: "Under UK Building Regulations Approved Document M, the minimum door width required for accessible WC facilities in non-domestic buildings is 800mm clear opening width. This dimension ensures adequate access for wheelchair users and others with mobility impairments, providing sufficient clearance to maneuver through the doorway comfortably."
  },
  {
    id: 'joinery-l3-building-regs23',
    question: "What type of glass is required for doors and low-level glazing in locations subject to human impact?",
    options: ["Single glazing only", "Double glazing only", "Safety glass complying with BS EN 12600", "Obscured glass only"],
    correctAnswer: "Safety glass complying with BS EN 12600",
    explanation: "For doors and low-level glazing in locations subject to human impact, safety glass complying with BS EN 12600 is required according to UK Building Regulations Approved Document K. This includes toughened or laminated safety glass designed to break safely or remain intact when broken, reducing injury risk. Critical locations include glazing in doors and adjacent panels below 1500mm from floor level."
  },
  {
    id: 'joinery-l3-building-regs24',
    question: "What does PAS 24 specify for joinery products?",
    options: ["Energy efficiency ratings", "Fire resistance", "Enhanced security requirements", "Moisture resistance"],
    correctAnswer: "Enhanced security requirements",
    explanation: "PAS 24 (Publicly Available Specification) specifies enhanced security requirements for doorsets and windows. This British Standard sets test methods and criteria for the enhanced security performance of these products to resist burglary attempts. PAS 24 compliant products are commonly specified for Secured by Design certification and are increasingly required by Building Regulations for new builds."
  },
  {
    id: 'joinery-l3-building-regs25',
    question: "According to Approved Document M of the Building Regulations, what is the maximum height for door thresholds to be considered accessible?",
    options: ["Zero - level access only", "15mm", "25mm", "50mm"],
    correctAnswer: "15mm",
    explanation: "According to Approved Document M of the UK Building Regulations, the maximum height for door thresholds to be considered accessible is 15mm. For fully accessible entrances, level thresholds are preferred, but where a small upstand is unavoidable (such as for weather protection), it should not exceed 15mm, with the edges chamfered if over 5mm to assist wheelchair users."
  },
  {
    id: 'joinery-l3-building-regs26',
    question: "What is the minimum width requirement for a main entrance door to a dwelling according to UK Building Regulations?",
    options: ["725mm clear opening width", "775mm clear opening width", "800mm clear opening width", "900mm clear opening width"],
    correctAnswer: "775mm clear opening width",
    explanation: "According to Approved Document M of the UK Building Regulations, the minimum width requirement for a main entrance door to a dwelling is 775mm clear opening width. This dimension ensures adequate access for occupants, including those using mobility aids such as wheelchairs, and is measured as the actual clear passage width when the door is open 90 degrees."
  },
  {
    id: 'joinery-l3-building-regs27',
    question: "Which British Standard provides guidance on fire doors and fire doorsets?",
    options: ["BS 8213", "BS 5839", "BS 476", "BS 6262"],
    correctAnswer: "BS 476",
    explanation: "BS 476 (particularly Parts 22 and 31) provides guidance on fire doors and fire doorsets. This British Standard includes test methods and performance criteria for determining the fire resistance of doors, shutters, and other elements of construction. It specifies how to measure and classify the fire resistance periods of these elements, forming the basis for fire door certification."
  },
  {
    id: 'joinery-l3-building-regs28',
    question: "Under UK Building Regulations, what is the minimum size for an escape window in a habitable room to comply with fire safety requirements?",
    options: ["Any opening window is sufficient", "At least 0.33m² area, minimum 450mm height and width", "At least 0.74m² area, minimum 850mm height and width", "Only rooms on the ground floor require escape windows"],
    correctAnswer: "At least 0.33m² area, minimum 450mm height and width",
    explanation: "Under UK Building Regulations Approved Document B, the minimum size for an escape window in a habitable room is at least 0.33m² area with minimum 450mm height and width. The bottom of the openable area must be no more than 1100mm above the floor. These dimensions ensure the window provides a viable emergency escape route in case of fire."
  },
  {
    id: 'joinery-l3-building-regs29',
    question: "Under the Building Regulations, what is the minimum internal floor area required for a habitable room in a dwelling?",
    options: ["There is no minimum requirement", "6.5 square meters", "7.5 square meters", "10 square meters"],
    correctAnswer: "6.5 square meters",
    explanation: "Under the UK Building Regulations (specifically in planning standards adopted in many local authorities), the minimum internal floor area required for a habitable room in a dwelling is 6.5 square meters. For a single bedroom, 7.5 square meters is typically the minimum. These requirements ensure rooms provide adequate space for their intended function and occupant wellbeing."
  },
  {
    id: 'joinery-l3-building-regs30',
    question: "According to UK Building Regulations, what is the minimum window area required for natural lighting in a habitable room?",
    options: ["No minimum requirement", "5% of the floor area", "10% of the floor area", "20% of the floor area"],
    correctAnswer: "10% of the floor area",
    explanation: "According to Approved Document F of the UK Building Regulations, the minimum window area required for natural lighting in a habitable room is generally 10% of the floor area. This ensures adequate natural light for the health and comfort of occupants, with at least half of this glazing area (5% of floor area) being openable for ventilation purposes."
  },
  {
    id: 'joinery-l3-building-regs31',
    question: "What is the maximum distance permitted between spindles (balusters) in a staircase balustrade according to UK Building Regulations?",
    options: ["50mm", "75mm", "100mm", "125mm"],
    correctAnswer: "100mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the maximum distance permitted between spindles (balusters) in a staircase balustrade is 100mm. This requirement ensures that a 100mm sphere cannot pass through any opening in the guarding, designed specifically to prevent young children from falling through or becoming trapped between the spindles."
  },
  {
    id: 'joinery-l3-building-regs32',
    question: "Under the Building Regulations, what does the term 'self-closing device' refer to in the context of fire doors?",
    options: ["A door with an automatic locking mechanism", "A device that ensures a door closes automatically after being opened", "A door that can only be opened from one side", "A spring-loaded hinge used on cabinet doors"],
    correctAnswer: "A device that ensures a door closes automatically after being opened",
    explanation: "Under the Building Regulations, a 'self-closing device' refers to a device that ensures a door closes automatically after being opened. For fire doors, these devices (such as overhead closers or spring hinges) are essential to ensure the door returns to its fully closed position after use, maintaining compartmentation and preventing fire/smoke spread through what would otherwise be an open doorway."
  },
  {
    id: 'joinery-l3-building-regs33',
    question: "According to UK Building Regulations Approved Document K, what is the maximum number of risers permitted in a single flight of stairs in a domestic setting?",
    options: ["12 risers", "16 risers", "18 risers", "20 risers"],
    correctAnswer: "16 risers",
    explanation: "According to UK Building Regulations Approved Document K, the maximum number of risers permitted in a single flight of stairs in a domestic setting is 16. This limitation helps reduce the risk of accidents from falls by breaking longer staircases into separate flights with landings, providing rest points and limiting the distance someone might fall."
  },
  {
    id: 'joinery-l3-building-regs34',
    question: "What does BS 8206 provide guidance on in relation to joinery?",
    options: ["Fire resistance of timber structures", "Daylight and window design", "Preservation of timber", "Acoustic performance of doors"],
    correctAnswer: "Daylight and window design",
    explanation: "BS 8206 provides guidance on daylight and window design. This British Standard covers the code of practice for daylighting, including recommendations for window sizing, positioning, and design to achieve appropriate levels of natural light in buildings. It influences joinery specifications for windows by establishing criteria for effective daylighting design."
  },
  {
    id: 'joinery-l3-building-regs35',
    question: "According to UK Building Regulations, what is required for a fire doorset to comply with fire resistance standards?",
    options: ["Just a thicker door leaf", "The complete assembly including door leaf, frame, ironmongery, and seals must meet the required fire resistance when tested as a complete unit", "Only the hinges need to be fire-rated", "Any solid timber door will provide sufficient fire resistance"],
    correctAnswer: "The complete assembly including door leaf, frame, ironmongery, and seals must meet the required fire resistance when tested as a complete unit",
    explanation: "According to UK Building Regulations, for a fire doorset to comply with fire resistance standards, the complete assembly including door leaf, frame, ironmongery, and seals must meet the required fire resistance when tested as a complete unit. This is known as the 'whole doorset approach' - all components must work together to provide the required fire and smoke resistance period."
  },
  {
    id: 'joinery-l3-building-regs36',
    question: "What information must be included on the mandatory CE/UKCA marking for joinery products covered by a harmonized European standard?",
    options: ["Only the manufacturer's logo", "Only the product's dimensions", "Identification details, performance characteristics, and reference to the relevant standard", "Only the country of manufacture"],
    correctAnswer: "Identification details, performance characteristics, and reference to the relevant standard",
    explanation: "CE/UKCA marking for joinery products covered by a harmonized European standard must include identification details, performance characteristics, and reference to the relevant standard. This includes manufacturer information, year of marking, reference to the applicable standard, intended use, and declared performance against essential characteristics defined in the standard, providing evidence of compliance with relevant regulations."
  },
  {
    id: 'joinery-l3-building-regs37',
    question: "Under UK Building Regulations, what does Approved Document L primarily address?",
    options: ["Fire safety", "Ventilation", "Sound insulation", "Conservation of fuel and power"],
    correctAnswer: "Conservation of fuel and power",
    explanation: "Approved Document L of the UK Building Regulations primarily addresses conservation of fuel and power. It sets standards for the energy performance of buildings, including thermal insulation, air permeability, and the energy efficiency of building services. For joinery, it particularly affects the specification of windows and doors, establishing minimum thermal performance (U-value) requirements."
  },
  {
    id: 'joinery-l3-building-regs38',
    question: "According to UK Building Regulations, what is the minimum height requirement for window sill heights in rooms where there is a risk of falls from windows?",
    options: ["450mm from the floor", "800mm from the floor", "900mm from the floor", "1100mm from the floor"],
    correctAnswer: "800mm from the floor",
    explanation: "According to Approved Document K of the UK Building Regulations, the minimum height requirement for window sill heights in rooms where there is a risk of falls from windows is 800mm from the floor. For openable windows where the drop outside is greater than 600mm, protective guarding must be provided if the sill height is less than 800mm, designed to prevent falls particularly in buildings likely to be used by children."
  },
  {
    id: 'joinery-l3-building-regs39',
    question: "What is the purpose of BS 644 in relation to joinery?",
    options: ["It specifies requirements for timber stairs", "It specifies requirements for timber doors", "It specifies requirements for timber windows", "It specifies requirements for timber floors"],
    correctAnswer: "It specifies requirements for timber windows",
    explanation: "BS 644 specifies requirements for timber windows. This British Standard establishes the materials, construction, weathertightness, operation, strength, and security requirements for timber windows. It covers factory-made, fully-finished and partly-finished windows, establishing both performance criteria and testing methods to ensure quality and consistency in timber window production."
  },
  {
    id: 'joinery-l3-building-regs40',
    question: "According to UK Building Regulations Approved Document M, what is the minimum corridor width where a corridor or passageway is used by wheelchair users?",
    options: ["900mm", "1050mm", "1200mm", "1500mm"],
    correctAnswer: "1200mm",
    explanation: "According to UK Building Regulations Approved Document M, the minimum corridor width where a corridor or passageway is used by wheelchair users is 1200mm. This width ensures adequate space for wheelchair navigation. The regulations permit a reduction to 1050mm for short distances (e.g., at doorways), but the general minimum width must be maintained at 1200mm for accessibility."
  },
  {
    id: 'joinery-l3-building-regs41',
    question: "What is the primary purpose of intumescent seals on fire doors?",
    options: ["To provide draft proofing", "To enhance sound insulation", "To expand when heated, sealing gaps around the door to prevent fire spread", "To make the door self-closing"],
    correctAnswer: "To expand when heated, sealing gaps around the door to prevent fire spread",
    explanation: "The primary purpose of intumescent seals on fire doors is to expand when heated, sealing gaps around the door to prevent fire spread. These strips (typically installed in the door frame or edge) remain dormant under normal conditions but expand significantly when exposed to heat, creating a pressure-tight seal that blocks the passage of fire and hot gases, maintaining compartmentation for the door's rated period."
  },
  {
    id: 'joinery-l3-building-regs42',
    question: "Under the UK Building Regulations, what is the meaning of the term 'notifiable work'?",
    options: ["Work that must be reported to the Health and Safety Executive", "Work that requires planning permission", "Work that must be certified by Building Control or registered under a Competent Person Scheme", "Work that must be carried out by a registered tradesperson"],
    correctAnswer: "Work that must be certified by Building Control or registered under a Competent Person Scheme",
    explanation: "Under the UK Building Regulations, 'notifiable work' refers to work that must be certified by Building Control or registered under a Competent Person Scheme. This includes most structural alterations, extensions, and work affecting fire safety or access. For joinery, this often includes replacement windows, structural alterations, and installation of controlled services. Such work must comply with regulations and be properly certified."
  },
  {
    id: 'joinery-l3-building-regs43',
    question: "Which British Standard gives recommendations for the installation of domestic timber staircases?",
    options: ["BS 5395", "BS 4787", "BS 8213", "BS 6262"],
    correctAnswer: "BS 5395",
    explanation: "BS 5395 gives recommendations for the installation of domestic timber staircases. This British Standard (specifically Part 1) provides guidance on the design, construction, and installation of straight and winding stairs for residential use. It covers aspects such as dimensions, structural performance, balustrades, and overall staircase safety, establishing best practice beyond the minimum requirements of Building Regulations."
  },
  {
    id: 'joinery-l3-building-regs44',
    question: "Under UK Building Regulations, what is the maximum U-value permitted for replacement doors in existing dwellings?",
    options: ["1.0 W/m²K", "1.4 W/m²K", "1.8 W/m²K", "2.0 W/m²K"],
    correctAnswer: "1.8 W/m²K",
    explanation: "Under UK Building Regulations Approved Document L1B, the maximum U-value permitted for replacement doors in existing dwellings is 1.8 W/m²K. This thermal performance standard aims to improve energy efficiency in existing buildings. The requirement applies to the whole door assembly including frame and panel, with a slightly higher U-value permitted for doors than windows due to practical constraints."
  },
  {
    id: 'joinery-l3-building-regs45',
    question: "What is the minimum requirement for protected escape routes in residential buildings of three or more storeys according to Approved Document B?",
    options: ["No special requirements apply", "All doors opening onto the stairway must be fire doors", "Only the front entrance door needs to be a fire door", "Only stairs require protection, not doors"],
    correctAnswer: "All doors opening onto the stairway must be fire doors",
    explanation: "According to Approved Document B of the UK Building Regulations, in residential buildings of three or more storeys, all doors opening onto the protected stairway (escape route) must be fire doors. These doors (typically FD30 - providing 30 minutes fire resistance) create a protected escape route by preventing fire spread into the stairway, which serves as the primary means of escape from upper floors."
  },
  {
    id: 'joinery-l3-building-regs46',
    question: "According to UK Building Regulations, what is the maximum individual riser height variation permitted within a flight of stairs?",
    options: ["No variation is permitted", "5mm", "10mm", "15mm"],
    correctAnswer: "5mm",
    explanation: "According to Approved Document K of the UK Building Regulations, the maximum individual riser height variation permitted within a flight of stairs is 5mm. Additionally, the maximum deviation in going (tread depth) is 10mm. These tolerances ensure consistency in step dimensions throughout the flight, reducing trip hazards that could occur if step heights or depths varied significantly."
  },
  {
    id: 'joinery-l3-building-regs47',
    question: "What is the primary focus of BS 8000 Part 5 in relation to joinery?",
    options: ["Timber quality grading", "Code of practice for installation of windows and doors", "Fire resistance of timber elements", "Preservation of timber"],
    correctAnswer: "Code of practice for installation of windows and doors",
    explanation: "BS 8000 Part 5 focuses on the code of practice for installation of windows and doors. This British Standard provides guidance on the proper installation of various joinery components, ensuring they are fitted correctly to perform as designed. It covers preparatory work, positioning, fixing, sealing, and finishing requirements to achieve satisfactory results in line with manufacturers' specifications."
  },
  {
    id: 'joinery-l3-building-regs48',
    question: "According to UK Building Regulations, what is the minimum ventilation requirement for a habitable room?",
    options: ["No specific requirement", "A window opening equivalent to 1/20th of the floor area", "A window opening equivalent to 1/30th of the floor area", "A window opening equivalent to 1/10th of the floor area"],
    correctAnswer: "A window opening equivalent to 1/20th of the floor area",
    explanation: "According to Approved Document F of the UK Building Regulations, the minimum ventilation requirement for a habitable room is a window opening equivalent to 1/20th of the floor area. This purge ventilation requirement ensures adequate air exchange to rapidly dilute pollutants and remove moisture, supplementing background ventilation systems in providing healthy indoor air quality."
  },
  {
    id: 'joinery-l3-building-regs49',
    question: "Under the UK Building Regulations, what is the definition of a 'habitable room'?",
    options: ["Any room with a window", "Any room with a door", "A room used for dwelling purposes but not a kitchen, utility room, bathroom, or WC", "Any room in a building except storage spaces"],
    correctAnswer: "A room used for dwelling purposes but not a kitchen, utility room, bathroom, or WC",
    explanation: "Under the UK Building Regulations, a 'habitable room' is defined as a room used for dwelling purposes but not a kitchen, utility room, bathroom, or WC. Habitable rooms typically include living rooms, dining rooms, and bedrooms - spaces where people spend significant time for living, sleeping, or recreational activities rather than utility purposes. This distinction affects ventilation, lighting, and spatial requirements."
  },
  {
    id: 'joinery-l3-building-regs50',
    question: "What British Standard provides the specification for hardware for fire and escape doors?",
    options: ["BS 3621", "BS 4787", "BS 7352", "BS 8300"],
    correctAnswer: "BS 7352",
    explanation: "BS 7352 provides the specification for hardware for fire and escape doors. This British Standard details the performance requirements and test methods for ironmongery used on fire doors and escape doors, ensuring these critical components (hinges, closers, locks, latches) function properly during a fire. Compliance with this standard is essential for fire door hardware to ensure doors perform their intended safety function."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-building-regs', 'items', q.id), {
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