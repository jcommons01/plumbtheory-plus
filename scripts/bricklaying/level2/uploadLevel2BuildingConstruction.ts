// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BuildingConstruction.ts

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

// ✅ Bricklaying Level 2 Building Construction Principles Questions
const questions = [
  {
    id: 'bricklaying-l2-building-construction1',
    question: "What is the primary purpose of a foundation in a building?",
    options: ["To provide a level surface for setting out walls", "To prevent groundwater from entering the building", "To transfer and distribute the building loads to the ground", "To provide an aesthetic base for the building"],
    correctAnswer: "To transfer and distribute the building loads to the ground",
    explanation: "The primary purpose of a foundation is to transfer and distribute the building loads (dead, live, and environmental loads) to the ground. It spreads the weight of the structure across a larger area, preventing settlement or movement that could cause structural damage. Foundations must be designed based on the bearing capacity of the soil, the weight of the building, and local conditions to ensure long-term stability of the structure."
  },
  {
    id: 'bricklaying-l2-building-construction2',
    question: "What is a strip foundation?",
    options: ["A foundation made of strips of metal", "A continuous strip of concrete that runs under load-bearing walls", "A foundation that is stripped and rebuilt annually", "A foundation only used for temporary structures"],
    correctAnswer: "A continuous strip of concrete that runs under load-bearing walls",
    explanation: "A strip foundation is a continuous strip of concrete that runs under load-bearing walls. It is the most common type of foundation for domestic buildings and smaller structures with relatively light loads. Strip foundations are typically wider than the wall they support (usually extending 150-300mm on each side) and deep enough to reach stable soil below the frost line, distributing the wall's weight evenly to the ground beneath."
  },
  {
    id: 'bricklaying-l2-building-construction3',
    question: "What is the purpose of a cavity in a cavity wall?",
    options: ["To create a space for electrical wiring", "To reduce the amount of materials used", "To provide thermal insulation and prevent moisture penetration", "To make the wall more resistant to earthquake damage"],
    correctAnswer: "To provide thermal insulation and prevent moisture penetration",
    explanation: "The purpose of a cavity in a cavity wall is to provide thermal insulation and prevent moisture penetration. The air gap between the inner and outer leaves acts as a thermal barrier, reducing heat transfer. Any moisture that penetrates the outer leaf typically runs down the inside face of that leaf and is directed out of the building via weep holes. Modern cavity walls usually include additional insulation materials within the cavity to further improve thermal performance."
  },
  {
    id: 'bricklaying-l2-building-construction4',
    question: "What is the minimum cavity width generally recommended in modern cavity wall construction in the UK?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "The minimum cavity width generally recommended in modern cavity wall construction in the UK is 50mm. This provides sufficient space to prevent moisture bridging across the cavity while allowing for building tolerances. When partial-fill insulation is used, a minimum residual cavity of 50mm should still be maintained between the insulation and the outer leaf. For full-fill insulation systems, the manufacturer's specifications should be followed for the appropriate cavity width."
  },
  {
    id: 'bricklaying-l2-building-construction5',
    question: "What is the purpose of a damp-proof course (DPC) in a wall?",
    options: ["To provide structural support", "To prevent ground moisture from rising up through the wall", "To strengthen the mortar joints", "To prevent frost damage"],
    correctAnswer: "To prevent ground moisture from rising up through the wall",
    explanation: "The purpose of a damp-proof course (DPC) is to prevent ground moisture from rising up through the wall by capillary action, known as 'rising damp.' The DPC creates a horizontal barrier, typically placed at least 150mm above ground level. In modern construction, DPCs are commonly made of polythene, bitumen, or polymer materials. They are crucial for preventing moisture damage to the building fabric and maintaining healthy internal environments."
  },
  {
    id: 'bricklaying-l2-building-construction6',
    question: "What is the purpose of wall ties in a cavity wall?",
    options: ["To join the two leaves together structurally while allowing them to function independently", "To tie the roof to the walls", "To strengthen individual bricks", "To create an aesthetic pattern on the wall"],
    correctAnswer: "To join the two leaves together structurally while allowing them to function independently",
    explanation: "Wall ties in a cavity wall join the two leaves together structurally while allowing them to function independently. They transfer lateral loads (typically wind loads) between the leaves, ensuring the wall acts as a composite structure while maintaining the separation needed for the cavity to function properly. Modern wall ties include features to prevent water crossing the cavity and are typically made from stainless steel or non-ferrous metals to prevent corrosion."
  },
  {
    id: 'bricklaying-l2-building-construction7',
    question: "At what vertical spacing are wall ties typically placed in standard cavity wall construction?",
    options: ["Every course", "Every 3-4 courses (225-300mm)", "Every 750mm", "Every 1.5 meters"],
    correctAnswer: "Every 3-4 courses (225-300mm)",
    explanation: "Wall ties are typically placed every 3-4 courses (225-300mm) vertically in standard cavity wall construction. Horizontally, they are usually spaced at 900mm centers, with this reduced to 600mm around openings and at movement joints. The spacing may be adjusted based on the building's exposure rating, wall tie type, and structural requirements, but these standard spacings apply to most residential and commercial buildings under normal conditions."
  },
  {
    id: 'bricklaying-l2-building-construction8',
    question: "What does the term 'cold bridge' or 'thermal bridge' refer to in building construction?",
    options: ["A connection between buildings across a cold climate area", "A structural support designed for cold environments", "A path of high thermal conductivity allowing heat to bypass insulation", "A bridge constructed with special cold-resistant materials"],
    correctAnswer: "A path of high thermal conductivity allowing heat to bypass insulation",
    explanation: "A 'cold bridge' or 'thermal bridge' refers to a path of high thermal conductivity that allows heat to bypass insulation. This typically occurs where there's a break in the insulation layer or where materials with higher thermal conductivity (like metal) pass through the insulation. Common thermal bridges include lintels, floor-wall junctions, and wall ties. They can lead to increased heat loss, higher energy consumption, cold spots, and potential condensation issues leading to mold growth."
  },
  {
    id: 'bricklaying-l2-building-construction9',
    question: "What is the purpose of a lintel above a door or window opening?",
    options: ["To improve the appearance of the opening", "To support the brickwork or masonry above the opening", "To attach the door or window frame", "To provide additional thermal insulation"],
    correctAnswer: "To support the brickwork or masonry above the opening",
    explanation: "The purpose of a lintel is to support the brickwork or masonry above a door or window opening. It transfers the load from the wall above the opening to the structure on either side. Lintels can be made of various materials including reinforced concrete, steel, timber, or stone depending on the span, loading conditions, and aesthetic requirements. Proper bearing length (how far the lintel extends into the wall on each side) is critical for structural stability."
  },
  {
    id: 'bricklaying-l2-building-construction10',
    question: "What is the minimum bearing (end support) typically required for a standard steel lintel in residential construction?",
    options: ["50mm on each end", "100mm on each end", "150mm on each end", "200mm on each end"],
    correctAnswer: "150mm on each end",
    explanation: "The minimum bearing (end support) typically required for a standard steel lintel in residential construction is 150mm on each end. This ensures adequate support and distribution of loads to the masonry on either side of the opening. For larger openings or heavier loads, the bearing length may need to be increased. Always refer to the structural engineer's specifications or manufacturer's guidelines for the specific lintel being installed."
  },
  {
    id: 'bricklaying-l2-building-construction11',
    question: "What is meant by the term 'honeycomb brick work'?",
    options: ["Brickwork with a decorative hexagonal pattern", "Brickwork where mortar has been degraded by bees", "Brickwork constructed with bricks containing hexagonal holes", "Brickwork with deliberate gaps for ventilation purposes"],
    correctAnswer: "Brickwork with deliberate gaps for ventilation purposes",
    explanation: "Honeycomb brickwork refers to a construction technique where bricks are deliberately laid with gaps between them to provide ventilation. This type of brickwork is commonly used in areas where air circulation is needed, such as subfloor vents, garden walls, or certain industrial buildings. The gaps are typically one-half to one full brick width and are created by leaving out selected bricks in a regular pattern while maintaining structural integrity."
  },
  {
    id: 'bricklaying-l2-building-construction12',
    question: "What is a 'soldier course' in brickwork?",
    options: ["A course laid on a military building", "Bricks laid vertically with the narrow end facing out", "The first course of bricks in a wall", "A course of bricks laid in a straight line for setting out"],
    correctAnswer: "Bricks laid vertically with the narrow end facing out",
    explanation: "A 'soldier course' is a row of bricks laid vertically with the narrow end (header) facing out and the long sides (stretchers) running vertically. The name comes from the bricks' resemblance to soldiers standing at attention. Soldier courses are primarily used as decorative features above windows and doors, as capping on walls, or to create visual separation between different parts of a building. They require proper support such as a lintel when used above openings."
  },
  {
    id: 'bricklaying-l2-building-construction13',
    question: "In brick bonding, what is meant by the term 'perpend'?",
    options: ["A brick cut perpendicular to its length", "The slope or angle of a brick wall", "The vertical joint between two bricks in the same course", "A brick placed perpendicular to the wall face"],
    correctAnswer: "The vertical joint between two bricks in the same course",
    explanation: "In brick bonding, a 'perpend' (or perpendicular joint) refers to the vertical joint between two bricks in the same course. Proper alignment of perpends is important both structurally and aesthetically. In most bonding patterns, perpends in consecutive courses are staggered to avoid creating a continuous vertical joint which would weaken the wall. In good bricklaying practice, perpends should be consistent in width (typically 10mm) and fully filled with mortar."
  },
  {
    id: 'bricklaying-l2-building-construction14',
    question: "What is the main purpose of an expansion joint in brickwork?",
    options: ["To join new brickwork to existing structures", "To allow for thermal expansion and contraction without cracking", "To improve the wall's appearance with a contrasting material", "To increase the load-bearing capacity of the wall"],
    correctAnswer: "To allow for thermal expansion and contraction without cracking",
    explanation: "The main purpose of an expansion joint (also called a movement joint) in brickwork is to allow for thermal expansion and contraction without cracking. These joints create intentional breaks in the brickwork where movement can occur safely. They are typically filled with a compressible material and sealed with a flexible sealant. Expansion joints are necessary because clay bricks expand over time due to moisture absorption, and all building materials expand and contract with temperature changes."
  },
  {
    id: 'bricklaying-l2-building-construction15',
    question: "What is the recommended maximum distance between vertical expansion joints in a straight brick wall?",
    options: ["6-8 meters", "9-12 meters", "15-20 meters", "25-30 meters"],
    correctAnswer: "9-12 meters",
    explanation: "The recommended maximum distance between vertical expansion joints in a straight brick wall is typically 9-12 meters. However, this can vary based on factors such as brick type, mortar composition, wall orientation, and local climate conditions. Expansion joints should also be placed at changes in wall height or direction, at junctions with other structural elements, and near corners (typically within 3 meters). Always follow the project specifications or structural engineer's recommendations for specific requirements."
  },
  {
    id: 'bricklaying-l2-building-construction16',
    question: "What is a 'sleeper wall' in construction?",
    options: ["A wall where construction workers can rest", "A low wall built to support floor joists", "A wall built while construction workers are sleeping", "A temporary wall erected during construction"],
    correctAnswer: "A low wall built to support floor joists",
    explanation: "A sleeper wall is a low wall built to support floor joists in suspended timber floors. These walls are typically built on the foundation or concrete slab and are spaced at intervals across the building's width. Sleeper walls reduce the necessary span for the floor joists, allowing for smaller timber sections to be used. They typically include ventilation gaps (honeycomb brickwork) to allow air circulation beneath the floor, helping to prevent damp and timber decay."
  },
  {
    id: 'bricklaying-l2-building-construction17',
    question: "What is meant by the term 'curing' in relation to concrete and mortar?",
    options: ["Treating the material to prevent future cracking", "The process of mixing the ingredients together", "The process of removing excess water from the mixture", "Maintaining adequate moisture and temperature conditions to allow proper hardening"],
    correctAnswer: "Maintaining adequate moisture and temperature conditions to allow proper hardening",
    explanation: "Curing refers to maintaining adequate moisture and temperature conditions to allow proper hardening of concrete or mortar. This process allows the cement to hydrate fully, developing its maximum strength and durability. Proper curing prevents premature drying, which can lead to shrinkage cracks and reduced strength. Curing typically involves keeping the material damp for several days after placement, often by covering with plastic sheeting, damp hessian, or applying curing compounds."
  },
  {
    id: 'bricklaying-l2-building-construction18',
    question: "What is the purpose of a wall plate in traditional house construction?",
    options: ["A decorative plate hung on the wall", "A metal plate reinforcing damaged brickwork", "A horizontal timber fixed to the top of a wall to support roof structures", "A ceramic plate inserted in walls for electrical outlets"],
    correctAnswer: "A horizontal timber fixed to the top of a wall to support roof structures",
    explanation: "A wall plate is a horizontal timber fixed to the top of a wall to support roof structures. It distributes the roof load evenly along the wall and provides a fixing point for roof trusses, rafters, or ceiling joists. The wall plate is typically secured to the wall using anchor bolts or straps to resist wind uplift forces. In traditional construction, it's usually treated softwood, sized according to the loads it will bear and the spacing of fixing points."
  },
  {
    id: 'bricklaying-l2-building-construction19',
    question: "What is the purpose of 'weep holes' in a cavity wall?",
    options: ["To allow for wall movement during settlement", "To drain water that penetrates the outer leaf of the wall", "To release moisture from inside the building", "To equalize air pressure on both sides of the wall"],
    correctAnswer: "To drain water that penetrates the outer leaf of the wall",
    explanation: "Weep holes are small openings placed at the base of cavity walls and above openings to drain water that penetrates the outer leaf of the wall. They allow moisture that collects in the cavity to escape rather than being trapped, which could cause damp issues. Weep holes are typically formed by leaving perpendicular joints open or using specialized plastic inserts, and are generally spaced at 450mm to 900mm intervals. They are essential components in a properly functioning cavity wall system."
  },
  {
    id: 'bricklaying-l2-building-construction20',
    question: "What is a 'corbel' in brickwork?",
    options: ["A decorative brick pattern", "A projection of brick courses where each course extends beyond the one below", "A type of brick specially designed for corners", "A tool used for finishing mortar joints"],
    correctAnswer: "A projection of brick courses where each course extends beyond the one below",
    explanation: "A corbel in brickwork is a projection of brick courses where each course extends beyond the one below, creating a step-like profile that projects outward from the main wall face. Corbelling is a traditional technique used to support weight or create decorative features without requiring additional support structures. Building regulations typically limit the projection of each course to no more than one-quarter of a brick's length to maintain structural stability, with the overall projection not exceeding the wall thickness."
  },
  {
    id: 'bricklaying-l2-building-construction21',
    question: "What is the purpose of a 'reveal' in a brick wall opening?",
    options: ["To create a decorative feature around windows", "To expose the internal structure of the wall", "To provide the exposed internal surface between the outer face of the wall and the window or door frame", "To reveal the quality of the brickwork to inspectors"],
    correctAnswer: "To provide the exposed internal surface between the outer face of the wall and the window or door frame",
    explanation: "A reveal is the exposed internal surface between the outer face of the wall and the window or door frame. It is formed by the thickness of the wall at an opening and may be finished with brick, render, timber, or other materials. Reveals serve both practical and aesthetic purposes: they transition between the wall and the frame, provide weather protection, and can be detailed to enhance a building's appearance. The depth of a reveal is determined by the wall thickness and the position of the window or door within the opening."
  },
  {
    id: 'bricklaying-l2-building-construction22',
    question: "What does the term 'efflorescence' refer to in brickwork?",
    options: ["A type of moss that grows on bricks in damp conditions", "A white powdery deposit on the brick surface caused by soluble salts", "The process of bricks becoming stronger over time", "A technique for finishing exposed brickwork"],
    correctAnswer: "A white powdery deposit on the brick surface caused by soluble salts",
    explanation: "Efflorescence refers to a white powdery deposit on the brick surface caused by soluble salts. These salts are present in the masonry materials and dissolve when water moves through the wall. When the water evaporates on the surface, it leaves the crystallized salts behind. While generally a cosmetic issue rather than structural, efflorescence indicates the presence of moisture movement through the wall. It can often be removed by dry brushing and proper attention to moisture control can prevent recurrence."
  },
  {
    id: 'bricklaying-l2-building-construction23',
    question: "What is a 'quoin' in brickwork?",
    options: ["A specially shaped brick used for decorative purposes", "The external angle or corner of a wall", "A crack that appears in aging brickwork", "A type of mortar used for exterior walls"],
    correctAnswer: "The external angle or corner of a wall",
    explanation: "A quoin (pronounced 'coin') is the external angle or corner of a wall. In traditional brickwork, quoins are often emphasized as a decorative feature using different colored bricks, stone, or a different bonding pattern from the main wall. Structurally, quoins can reinforce the corner of a building. Special attention is needed when constructing quoins to ensure proper bonding between the two intersecting walls and to maintain accurate vertical alignment."
  },
  {
    id: 'bricklaying-l2-building-construction24',
    question: "What is the purpose of 'brick ties' in thin brick veneer applications?",
    options: ["To tie bricks together during transportation", "To secure the thin brick facing to the backing structure", "To tie scaffolding to the building during construction", "To secure roof tiles to brickwork"],
    correctAnswer: "To secure the thin brick facing to the backing structure",
    explanation: "Brick ties in thin brick veneer applications are used to secure the thin brick facing to the backing structure. Unlike traditional cavity wall ties, these specialized ties are designed for the lighter loads and different installation methods of thin brick systems. Typically made of galvanized or stainless steel, they provide mechanical attachment while allowing for some movement between the veneer and substrate. Proper tie spacing and installation are critical to prevent the veneer from detaching due to thermal movement or other forces."
  },
  {
    id: 'bricklaying-l2-building-construction25',
    question: "What is the function of an 'airbrick' in building construction?",
    options: ["To reduce the weight of a brick wall", "To improve the acoustic properties of a room", "To provide ventilation to underfloor spaces or cavity walls", "To allow for thermal expansion in brickwork"],
    correctAnswer: "To provide ventilation to underfloor spaces or cavity walls",
    explanation: "An airbrick is a perforated brick designed to provide ventilation to underfloor spaces or cavity walls. They allow air circulation to prevent the buildup of moisture and harmful gases like radon, while still maintaining the structural and aesthetic continuity of the brickwork. Airbricks are typically installed at regular intervals in walls near ground level for suspended timber floors, or higher up when ventilating roof spaces. Modern airbricks often include features to prevent pest entry while maintaining adequate airflow."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-building-construction', 'items', q.id), {
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
