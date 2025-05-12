// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BuildingRegs.ts

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

// ✅ Bricklaying Level 2 Building Regulations & Damp-Proofing Questions
const questions = [
  {
    id: 'bricklaying-l2-building-regs1',
    question: "What is the main purpose of the Building Regulations in the UK?",
    options: ["To control architectural styles in different regions", "To restrict the height of buildings in rural areas", "To set minimum standards for the design, construction, and alterations to buildings for health, safety, welfare, and convenience", "To determine which companies can work on construction projects"],
    correctAnswer: "To set minimum standards for the design, construction, and alterations to buildings for health, safety, welfare, and convenience",
    explanation: "The main purpose of the Building Regulations in the UK is to set minimum standards for the design, construction, and alterations to buildings for health, safety, welfare, and convenience. These statutory instruments cover various aspects of building work including structural integrity, fire safety, ventilation, energy efficiency, accessibility, and damp prevention. The regulations ensure buildings are safe, healthy, and efficient, regardless of who designs or constructs them. All new buildings, most extensions, and certain types of alterations and renovations must comply with these regulations, which are periodically updated to incorporate new standards and technologies."
  },
  {
    id: 'bricklaying-l2-building-regs2',
    question: "What is the minimum height that a damp-proof course (DPC) should be positioned above external ground level?",
    options: ["50mm", "100mm", "150mm", "200mm"],
    correctAnswer: "150mm",
    explanation: "The minimum height that a damp-proof course (DPC) should be positioned above external ground level is 150mm. This height requirement is specified in the Building Regulations to ensure that splashing rainwater and minor fluctuations in ground level won't bridge the DPC. Maintaining this minimum height prevents moisture from bypassing the DPC and rising into the wall, which could lead to dampness inside the building. In situations where it's impossible to maintain this clearance (such as at doorways), special measures like drain channels must be provided to prevent water ingress."
  },
  {
    id: 'bricklaying-l2-building-regs3',
    question: "Which part of the Building Regulations deals primarily with the resistance to the passage of moisture?",
    options: ["Part A", "Part B", "Part C", "Part L"],
    correctAnswer: "Part C",
    explanation: "Part C of the Building Regulations deals primarily with the resistance to the passage of moisture. Specifically, this section (titled 'Site preparation and resistance to contaminants and moisture') sets out requirements related to ground conditions, groundwater, contaminants, and weather-tightness. For bricklayers, Part C includes crucial regulations about damp-proofing measures, including damp-proof courses, cavity trays, and tanking systems. It aims to ensure that buildings remain free from moisture that could damage the building fabric or create unhealthy conditions for occupants through requirements for walls, floors, and roofs to adequately resist the passage of moisture."
  },
  {
    id: 'bricklaying-l2-building-regs4',
    question: "What is the primary purpose of a damp-proof course (DPC) in masonry walls?",
    options: ["To strengthen the wall structure", "To provide thermal insulation", "To prevent ground moisture from rising up through the wall", "To prevent lateral movement of the wall"],
    correctAnswer: "To prevent ground moisture from rising up through the wall",
    explanation: "The primary purpose of a damp-proof course (DPC) in masonry walls is to prevent ground moisture from rising up through the wall by capillary action, a phenomenon known as 'rising damp.' The DPC creates a horizontal barrier, typically formed from materials impervious to water such as polyethylene, bitumen, or special polymers. Properly installed DPCs block the upward movement of moisture that could otherwise damage interior finishes, create unhealthy living conditions, and deteriorate the building fabric. Building Regulations require DPCs in all new buildings to ensure long-term protection against this form of moisture ingress."
  },
  {
    id: 'bricklaying-l2-building-regs5',
    question: "What is the purpose of a cavity tray in brick cavity wall construction?",
    options: ["To collect mortar droppings during construction", "To provide additional insulation", "To direct water that penetrates the outer leaf to the exterior via weep holes", "To prevent movement between the two leaves of the wall"],
    correctAnswer: "To direct water that penetrates the outer leaf to the exterior via weep holes",
    explanation: "The purpose of a cavity tray in brick cavity wall construction is to direct water that penetrates the outer leaf to the exterior via weep holes. Cavity trays are impermeable flashings installed where there's an interruption to the cavity, such as above openings (doors, windows) or where items bridge the cavity. They prevent water running down within the cavity from crossing to the inner leaf at vulnerable points. The tray incorporates an upstand against the inner leaf, a slope toward the outer leaf, and stop ends to prevent water running off the sides. Without properly installed cavity trays, water penetration can lead to damp problems internally."
  },
  {
    id: 'bricklaying-l2-building-regs6',
    question: "According to current Building Regulations, what is the minimum cavity width for a new external cavity wall in the UK?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "According to current Building Regulations, the minimum cavity width for a new external cavity wall in the UK is 50mm. This minimum width applies to the clear cavity space in both partial-fill and clear cavity constructions. The 50mm minimum ensures sufficient space to prevent moisture bridging from the outer to inner leaf while allowing for building tolerances. For partial-fill insulation systems, there must still be at least a 50mm residual cavity between the insulation and the outer leaf. While 50mm is the absolute minimum, wider cavities (75-100mm) are increasingly common to accommodate additional insulation for improved thermal performance."
  },
  {
    id: 'bricklaying-l2-building-regs7',
    question: "What is a 'cold bridge' in relation to building construction?",
    options: ["A bridge built in cold climates", "A structural element built during winter", "A path where heat can escape more easily through the building envelope", "A walkway connecting two buildings"],
    correctAnswer: "A path where heat can escape more easily through the building envelope",
    explanation: "A cold bridge (or thermal bridge) is a path where heat can escape more easily through the building envelope. It occurs where there is a break in the insulation layer or where materials with higher thermal conductivity create a path for heat loss. Common cold bridges include lintels, floor-wall junctions, window reveals, and wall ties. Building Regulations Part L (Conservation of Fuel and Power) requires minimizing cold bridging to reduce energy consumption and prevent condensation issues that can lead to mold growth. Solutions include thermally broken lintels, insulated cavity closers, and consideration of junction details in construction."
  },
  {
    id: 'bricklaying-l2-building-regs8',
    question: "What is the main requirement of Part A of the Building Regulations that affects bricklaying work?",
    options: ["Fire safety", "Ventilation", "Structural safety and stability", "Sound insulation"],
    correctAnswer: "Structural safety and stability",
    explanation: "The main requirement of Part A of the Building Regulations that affects bricklaying work is structural safety and stability. This part ensures that buildings are constructed so they can safely sustain and transmit dead, imposed, and wind loads to the ground. For bricklayers, Part A influences wall thickness requirements, reinforcement details, maximum heights for various wall types, lateral restraint specifications, and foundation designs. It also covers the use of appropriate materials and workmanship to ensure structural integrity. Compliance with Part A is essential for ensuring that brickwork is not only aesthetically pleasing but structurally sound and safe throughout its lifetime."
  },
  {
    id: 'bricklaying-l2-building-regs9',
    question: "What is the main purpose of providing weep holes in brickwork?",
    options: ["To allow air circulation in the cavity", "To drain water that enters the cavity to the outside", "To equalize pressure on both sides of the wall", "To provide ventilation to the interior"],
    correctAnswer: "To drain water that enters the cavity to the outside",
    explanation: "The main purpose of providing weep holes in brickwork is to drain water that enters the cavity to the outside. These small openings are placed at the base of cavity walls and above all cavity trays (such as those over windows and doors). When water penetrates the outer leaf of brickwork, it runs down the inside face of that leaf and is directed out through the weep holes, preventing it from accumulating in the cavity or bridging to the inner leaf. Building Regulations require adequate provision for moisture drainage from cavities. Weep holes are typically formed by leaving perpendicular joints open or using proprietary products, spaced at approximately 450-900mm intervals."
  },
  {
    id: 'bricklaying-l2-building-regs10',
    question: "According to Building Regulations, what material is acceptable for a damp-proof course (DPC)?",
    options: ["Standard mortar", "Plain concrete", "Bitumen polymer or polyethylene", "Ordinary clay bricks"],
    correctAnswer: "Bitumen polymer or polyethylene",
    explanation: "According to Building Regulations, bitumen polymer or polyethylene are acceptable materials for a damp-proof course (DPC), along with other materials like engineering bricks to BS 3921, slate, or pitch-polymer DPCs. These materials are suitable because they are impervious to water and durable enough to remain effective for the life of the building. The chosen DPC material must be compatible with adjacent materials and able to withstand both construction stresses and in-service conditions without compromising its water-resistant properties. Standard mortar, plain concrete, and ordinary clay bricks are not acceptable as DPCs because they allow water transmission through capillary action."
  },
  {
    id: 'bricklaying-l2-building-regs11',
    question: "What is the primary purpose of Part E of the Building Regulations?",
    options: ["To ensure adequate structural stability", "To provide fire safety measures", "To ensure adequate resistance to the passage of sound", "To ensure energy efficiency"],
    correctAnswer: "To ensure adequate resistance to the passage of sound",
    explanation: "The primary purpose of Part E of the Building Regulations is to ensure adequate resistance to the passage of sound. This part sets minimum performance standards for sound insulation between dwellings and rooms within buildings. For bricklayers, Part E influences construction details of separating walls and floors between dwellings, requiring specific masonry types, densities, and construction methods to achieve the required sound insulation. Proper workmanship is essential, as poorly executed details can create acoustic weak points. These regulations aim to provide reasonable conditions for occupants by preventing excessive noise transmission that could affect health and quality of life."
  },
  {
    id: 'bricklaying-l2-building-regs12',
    question: "What type of damp-proof course (DPC) is typically used at a window or door opening in a brick wall?",
    options: ["Horizontal DPC only", "Vertical DPC only", "Both horizontal and vertical DPC", "No DPC is required at openings"],
    correctAnswer: "Both horizontal and vertical DPC",
    explanation: "At a window or door opening in a brick wall, both horizontal and vertical DPC are typically used. The horizontal DPC (cavity tray) is installed above the opening to divert any water that may enter the cavity outward via weep holes. Vertical DPCs are installed at the jambs (sides) of the opening to prevent water passing sideways from the cavity into the reveal or to the window/door frame. Together, these form a continuous waterproof envelope around the opening. Building Regulations require effective moisture control at all openings, as these are vulnerable points for water penetration. Proper installation of these DPCs is critical for preventing damp problems around windows and doors."
  },
  {
    id: 'bricklaying-l2-building-regs13',
    question: "What is the primary concern of Part B of the Building Regulations that affects bricklaying work?",
    options: ["Structural stability", "Fire safety", "Ventilation", "Energy efficiency"],
    correctAnswer: "Fire safety",
    explanation: "The primary concern of Part B of the Building Regulations that affects bricklaying work is fire safety. This part specifies requirements for means of warning and escape, internal fire spread (linings and structure), external fire spread, and access and facilities for the fire service. For bricklayers, Part B influences the choice of materials, construction of compartment walls, fire stopping, cavity barriers, and the fire resistance periods required for different elements of the building. Proper execution of brickwork details around fire compartmentation is essential for containing fires and preventing their spread through the building, giving occupants time to escape and limiting damage to property."
  },
  {
    id: 'bricklaying-l2-building-regs14',
    question: "What is the requirement for cavity barriers in cavity walls according to Building Regulations?",
    options: ["They are required at all window and door openings", "They are required at the top of each wall", "They are required around openings and at junctions with compartment walls and floors", "They are only required in timber-framed buildings"],
    correctAnswer: "They are required around openings and at junctions with compartment walls and floors",
    explanation: "According to Building Regulations, cavity barriers in cavity walls are required around openings and at junctions with compartment walls and floors. They're also needed at the junction between walls and roofs and at set intervals in extensive cavities. These barriers prevent fire and smoke from spreading unseen through the concealed cavity space, buying crucial time for evacuation and firefighting. They're typically made from fire-resistant materials like mineral wool or specific fire barrier products. Building Regulations Part B specifies the locations, materials, and installation requirements for cavity barriers, which are essential for maintaining the fire compartmentation strategy of the building."
  },
  {
    id: 'bricklaying-l2-building-regs15',
    question: "What is the minimum mortar designation (mix) recommended for brickwork below DPC level according to UK building standards?",
    options: ["Designation (i) - strongest mix", "Designation (iii) - medium mix", "Designation (iv) - weak mix", "Designation (v) - weakest mix"],
    correctAnswer: "Designation (i) - strongest mix",
    explanation: "The minimum mortar designation recommended for brickwork below DPC level according to UK building standards is Designation (i) - the strongest mix. This typically corresponds to a 1:¼:3 cement:lime:sand ratio or a 1:3 cement:sand with plasticizer mix. The strong mix is specified because below-DPC brickwork is exposed to challenging conditions including ground moisture, potential frost action, and higher structural loads from the building above. The higher cement content creates a stronger, more durable mortar better able to resist moisture penetration and physical stresses. In sulfate-rich soils, sulfate-resisting cement may also be specified to prevent chemical attack on the mortar."
  },
  {
    id: 'bricklaying-l2-building-regs16',
    question: "What is the main purpose of a cavity tray over a lintel in a cavity wall?",
    options: ["To support the weight of the brickwork above", "To provide additional thermal insulation", "To prevent water that enters the cavity from reaching the lintel and entering the building", "To strengthen the connection between the inner and outer leaves"],
    correctAnswer: "To prevent water that enters the cavity from reaching the lintel and entering the building",
    explanation: "The main purpose of a cavity tray over a lintel in a cavity wall is to prevent water that enters the cavity from reaching the lintel and entering the building. When rainwater penetrates the outer leaf of brickwork, it runs down inside the cavity. Without a cavity tray, this water could track across the lintel (which bridges the cavity) and enter the internal structure. The cavity tray forms a waterproof barrier that collects this water and directs it to the exterior through weep holes. Building Regulations require effective moisture management at all cavity interruptions, with lintels being particularly critical points due to the structural opening beneath them."
  },
  {
    id: 'bricklaying-l2-building-regs17',
    question: "According to Building Regulations Part L, what is a requirement for limiting thermal bridging in cavity walls?",
    options: ["Using only engineering bricks", "Using stainless steel wall ties with low thermal conductivity", "Adding more mortar to each joint", "Increasing the cavity width to at least 200mm"],
    correctAnswer: "Using stainless steel wall ties with low thermal conductivity",
    explanation: "According to Building Regulations Part L (Conservation of Fuel and Power), using stainless steel wall ties with low thermal conductivity is a requirement for limiting thermal bridging in cavity walls. Traditional galvanized steel ties conduct significant heat across the cavity, reducing the wall's overall thermal performance. Modern wall ties are designed specifically to minimize this heat transfer while maintaining structural integrity. Part L aims to improve energy efficiency in buildings, and reducing thermal bridging is a key strategy. Other measures to limit thermal bridging include insulated cavity closers around openings, thermally broken lintels, and careful detailing at wall-floor junctions."
  },
  {
    id: 'bricklaying-l2-building-regs18',
    question: "What is 'rising damp' and how is it prevented in modern construction?",
    options: ["Water leaking through the roof; prevented by proper flashing", "Groundwater rising up through walls by capillary action; prevented by a damp-proof course (DPC)", "Condensation on walls; prevented by adequate ventilation", "Water entering through windows; prevented by sealants"],
    correctAnswer: "Groundwater rising up through walls by capillary action; prevented by a damp-proof course (DPC)",
    explanation: "Rising damp is groundwater rising up through walls by capillary action, where moisture from the ground is drawn up through the microscopic pores in building materials. In modern construction, this is prevented by installing a damp-proof course (DPC) - a horizontal barrier of water-impermeable material positioned in all walls just above ground level (minimum 150mm). The DPC blocks the upward movement of moisture, protecting the structure above from water damage. Building Regulations require DPCs in all new buildings, with the material typically being polyethylene, bitumen polymer, or engineering bricks. Proper installation and maintaining the 150mm clearance above ground level are essential for long-term effectiveness."
  },
  {
    id: 'bricklaying-l2-building-regs19',
    question: "What requirements does Part K of the Building Regulations cover that might affect bricklaying work?",
    options: ["Fire safety", "Protection from falling, collision and impact", "Electrical safety", "Drainage and waste disposal"],
    correctAnswer: "Protection from falling, collision and impact",
    explanation: "Part K of the Building Regulations covers protection from falling, collision, and impact, which can affect bricklaying work in several ways. This part includes requirements for the design and construction of stairs, ramps, guards, and barriers, as well as glazing safety. For bricklayers, Part K influences the construction of parapets, balustrades, and protective barriers, specifying minimum heights and loadbearing capabilities. It also covers requirements for safe access during construction and maintenance. Proper implementation of these regulations helps ensure that completed brickwork elements like boundary walls, retaining walls, and balustrades are safe for users and meet the necessary standards for impact resistance and fall prevention."
  },
  {
    id: 'bricklaying-l2-building-regs20',
    question: "What is 'tanking' in damp-proofing and when is it typically used?",
    options: ["A method of storing water; used in water conservation systems", "A waterproof coating applied externally; used for all external walls", "A continuous waterproof membrane applied to walls and floors; used in basements or where the external ground level is above the internal floor level", "A treatment for timber; used in roof structures"],
    correctAnswer: "A continuous waterproof membrane applied to walls and floors; used in basements or where the external ground level is above the internal floor level",
    explanation: "Tanking is a continuous waterproof membrane applied to walls and floors, typically used in basements or where the external ground level is above the internal floor level. Unlike standard damp-proof courses that only block rising damp, tanking creates a complete waterproof envelope to resist hydrostatic pressure from groundwater. It may be applied as a cementitious slurry, bitumen coating, or membrane system, either to the interior surface (negative side tanking) or exterior surface (positive side tanking). Building Regulations require effective waterproofing for any structure below ground level. Proper preparation, application, and detailing are essential for effective tanking to prevent water ingress in these challenging conditions."
  },
  {
    id: 'bricklaying-l2-building-regs21',
    question: "According to Building Regulations, how should a damp-proof course (DPC) in a cavity wall relate to the damp-proof membrane (DPM) in a solid floor?",
    options: ["They should be separated by at least 150mm", "They should be at least 150mm below the DPM", "They should connect or overlap to form a continuous barrier", "The DPC should always be above the level of the DPM"],
    correctAnswer: "They should connect or overlap to form a continuous barrier",
    explanation: "According to Building Regulations, a damp-proof course (DPC) in a cavity wall should connect or overlap with the damp-proof membrane (DPM) in a solid floor to form a continuous barrier against moisture. This connection prevents any gaps in the damp-proofing that could allow moisture to bypass either barrier. Typically, the floor DPM extends beyond the floor edge and is lapped with the wall DPC, or specialized accessories are used to join them. This continuous barrier is essential for preventing moisture ingress at the vulnerable wall-floor junction. Building Regulations emphasize the importance of this detail to ensure comprehensive protection against ground moisture throughout the building."
  },
  {
    id: 'bricklaying-l2-building-regs22',
    question: "What is the purpose of a 'cavity closer' in masonry construction?",
    options: ["To completely seal the cavity at the top of the wall", "To fill the cavity with insulation throughout the wall", "To close and insulate the cavity at window and door openings", "To join two separate sections of cavity wall"],
    correctAnswer: "To close and insulate the cavity at window and door openings",
    explanation: "The purpose of a cavity closer in masonry construction is to close and insulate the cavity at window and door openings. Cavity closers typically consist of a rigid insulation material within a plastic carrier that fits the width of the cavity. They serve multiple functions: preventing cold bridging around openings (meeting Part L requirements for thermal efficiency), providing fire resistance at these junctions (satisfying Part B requirements), supporting the window or door frame, and preventing moisture penetration into the reveal. Building Regulations require effective cavity closing around all openings, making these components essential in modern cavity wall construction for both performance and compliance reasons."
  },
  {
    id: 'bricklaying-l2-building-regs23',
    question: "What is the minimum thickness of a cavity wall (total thickness including both leaves and the cavity) permitted under Building Regulations for a two-story house in the UK?",
    options: ["150mm", "190mm", "225mm", "250mm"],
    correctAnswer: "250mm",
    explanation: "The minimum thickness of a cavity wall permitted under Building Regulations for a two-story house in the UK is 250mm. This typically consists of a 102.5mm outer leaf of brickwork, a minimum 50mm cavity (which may contain insulation), and an inner leaf of blockwork (typically 100mm or more depending on structural requirements). This minimum thickness ensures adequate structural stability, thermal performance, and weather resistance. The regulations specify different requirements based on the building height, exposure conditions, and applied loads. As energy efficiency requirements have increased, cavity widths have often been increased beyond the minimum to accommodate more insulation."
  },
  {
    id: 'bricklaying-l2-building-regs24',
    question: "What is the purpose of 'weep vents' in a cavity wall?",
    options: ["To allow rising damp to escape", "To provide ventilation to the building interior", "To ventilate the cavity and allow moisture to escape", "To allow installation of electrical wiring within the cavity"],
    correctAnswer: "To ventilate the cavity and allow moisture to escape",
    explanation: "The purpose of weep vents in a cavity wall is to ventilate the cavity and allow moisture to escape. Unlike standard weep holes that primarily provide drainage, weep vents incorporate a ventilation component, typically featuring a perforated or slotted insert. These vents are particularly important in certain wall designs that require cavity ventilation, such as walls with timber frame inner leaves or where specific cladding materials are used. Building Regulations require proper ventilation of cavities in such situations to prevent moisture buildup that could lead to decay or other problems. Weep vents are typically installed at regular intervals along the base of walls and above openings."
  },
  {
    id: 'bricklaying-l2-building-regs25',
    question: "According to Building Regulations, what requirements must be met for a wall to act as a fire compartment wall between dwellings?",
    options: ["It must be at least 100mm thick", "It must contain a steel frame", "It must provide at least 60 minutes fire resistance and extend to the underside of the roof", "It only needs to reach ceiling height with standard fire-resistant paint"],
    correctAnswer: "It must provide at least 60 minutes fire resistance and extend to the underside of the roof",
    explanation: "According to Building Regulations Part B (Fire Safety), a wall acting as a fire compartment wall between dwellings must provide at least 60 minutes fire resistance and extend to the underside of the roof. This creates a complete barrier that prevents fire spreading from one dwelling to another, giving occupants time to escape and firefighters time to control the blaze. The wall must be continuous and have appropriate fire-stopping at any junctions with other building elements. Masonry walls meeting this requirement typically use solid blockwork or brick construction with appropriate thicknesses and materials. Cavity barriers are also required where any cavities pass through or along the compartment wall."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-building-regs', 'items', q.id), {
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
