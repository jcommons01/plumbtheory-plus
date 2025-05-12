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

// ✅ Building Regulations Part A - Structure Questions
const questions = [
  {
    id: 'regs-part-a-1',
    question: "What is the primary purpose of Approved Document A?",
    options: ["To provide fire safety guidance", "To provide guidance on loading, ground movement, and disproportionate collapse", "To regulate conservation of fuel and power", "To ensure accessibility for disabled people"],
    correctAnswer: "To provide guidance on loading, ground movement, and disproportionate collapse",
    explanation: "Approved Document A provides guidance on meeting the Building Regulations' requirements for structure, covering loading, ground movement and disproportionate collapse. It aims to ensure buildings are designed and constructed so they can withstand all loads acting upon them during construction and use, remain stable and have adequate resistance to the effects of ground movement or accidental loading."
  },
  {
    id: 'regs-part-a-2',
    question: "What does 'disproportionate collapse' refer to in Approved Document A?",
    options: ["When a building collapses due to poor design", "When the collapse of a building is disproportionate to its height", "When a small event causes a much larger collapse than would be expected", "When different parts of a building collapse unevenly"],
    correctAnswer: "When a small event causes a much larger collapse than would be expected",
    explanation: "Disproportionate collapse refers to a situation where a relatively small triggering event causes collapse to an extent disproportionate to the original cause. Approved Document A provides requirements to ensure buildings have sufficient robustness that, in the event of an accident, the structure will not be damaged to an extent disproportionate to the cause. This is achieved through tying elements together, providing alternative load paths, or designing key elements to resist accidental loads."
  },
  {
    id: 'regs-part-a-3',
    question: "Under Approved Document A, what are Consequence Classes used for?",
    options: ["To determine financial penalties for structural failures", "To categorize the consequences of structural failure based on building type and size", "To classify different types of building materials", "To determine the frequency of structural inspections"],
    correctAnswer: "To categorize the consequences of structural failure based on building type and size",
    explanation: "Consequence Classes in Approved Document A categorize buildings based on the consequences of structural failure. They range from Class 1 (lowest risk, like small residential buildings) to Class 3 (highest risk, like major public buildings). The classification determines the level of robustness required in the design to prevent disproportionate collapse. Higher Consequence Classes require more stringent robustness provisions, including horizontal and vertical tying, notional element removal checks, or key element design."
  },
  {
    id: 'regs-part-a-4',
    question: "What is the minimum thickness for a solid wall in a residential building of not more than 3 storeys according to Approved Document A?",
    options: ["90mm", "190mm", "215mm", "290mm"],
    correctAnswer: "190mm",
    explanation: "According to Approved Document A, the minimum thickness for a solid wall in a residential building of not more than 3 storeys is 190mm. This thickness is specified to ensure adequate structural stability for typical loadbearing walls in domestic construction. Thinner walls may be acceptable in certain circumstances with appropriate structural design calculations, while thicker walls may be required for taller buildings, those with higher loads, or when using weaker masonry units."
  },
  {
    id: 'regs-part-a-5',
    question: "What does Approved Document A specify about lateral restraint at roof level?",
    options: ["It is not required for buildings under 2 storeys", "Gable walls must be strapped to roofs at a maximum of 2m intervals", "Only timber roofs need lateral restraint", "Lateral restraint is only required for buildings in high wind areas"],
    correctAnswer: "Gable walls must be strapped to roofs at a maximum of 2m intervals",
    explanation: "Approved Document A specifies that gable walls must be strapped to roofs at a maximum of 2m intervals to provide lateral restraint. This requirement ensures that gable walls (which are particularly vulnerable to lateral forces) are adequately tied to the roof structure to prevent outward collapse. The straps, typically galvanized steel, must be properly secured to both the wall and structural timbers of the roof to create an effective restraint system."
  },
  {
    id: 'regs-part-a-6',
    question: "According to Approved Document A, what is the maximum height for a free-standing wall built with 100mm thick brickwork?",
    options: ["450mm", "600mm", "1.15m", "2.4m"],
    correctAnswer: "450mm",
    explanation: "According to Approved Document A, the maximum height for a free-standing wall built with 100mm thick brickwork is 450mm. This height limitation is specified to ensure stability of slender free-standing walls that are not supported by piers or returns. Taller free-standing walls require greater thickness, the addition of piers, returns, or other stabilizing features to prevent collapse due to wind loading or accidental impact forces."
  },
  {
    id: 'regs-part-a-7',
    question: "What ground condition would typically require a site investigation according to Approved Document A?",
    options: ["Clay soil", "Sandy soil", "Where trees are present near the proposed building", "All ground conditions require a site investigation"],
    correctAnswer: "Where trees are present near the proposed building",
    explanation: "According to Approved Document A, a site investigation would typically be required where trees are present near the proposed building. Trees can cause significant ground movement by extracting moisture from the soil (particularly in clay soils), leading to shrinkage and potential foundation movement. The investigation would assess the soil type, tree species, their distance from the building, and potential influence zone to determine appropriate foundation design to resist the effects of ground movement."
  },
  {
    id: 'regs-part-a-8',
    question: "What is the minimum imposed floor load for residential buildings according to Approved Document A?",
    options: ["1.0 kN/m²", "1.5 kN/m²", "2.0 kN/m²", "3.0 kN/m²"],
    correctAnswer: "1.5 kN/m²",
    explanation: "The minimum imposed floor load for residential buildings according to Approved Document A is 1.5 kN/m². This distributed load allowance accounts for the weight of occupants, furniture, and typical residential activities. For certain areas like corridors, landings, and some communal spaces, higher loads of 2.0 kN/m² may be required. These minimum values ensure floors have adequate strength to support expected loads without excessive deflection or risk of failure."
  },
  {
    id: 'regs-part-a-9',
    question: "What is the purpose of a 'cavity barrier' as mentioned in Approved Document A?",
    options: ["To prevent moisture penetration in cavity walls", "To improve thermal insulation", "To prevent the spread of fire and smoke through concealed spaces", "To provide structural support between inner and outer leaves of cavity walls"],
    correctAnswer: "To prevent the spread of fire and smoke through concealed spaces",
    explanation: "While cavity barriers are mentioned in Approved Document A in relation to masonry construction, their primary purpose is to prevent the spread of fire and smoke through concealed spaces, which is more fully covered in Approved Document B (Fire Safety). These barriers are required at specific locations in cavity walls to compartmentalize the cavity and prevent it from acting as a route for fire spread. This contributes to the overall structural fire protection strategy of the building."
  },
  {
    id: 'regs-part-a-10',
    question: "What is the purpose of a padstone in structural masonry?",
    options: ["To create a level surface for starting brickwork", "To distribute concentrated loads from beams or lintels", "To provide a damp-proof barrier", "To create a decorative feature in the masonry"],
    correctAnswer: "To distribute concentrated loads from beams or lintels",
    explanation: "A padstone distributes concentrated loads from beams or lintels over a wider area of supporting masonry. Approved Document A requires concentrated loads to be adequately distributed to prevent local failure. Padstones, typically made of concrete or stone with higher compressive strength than the surrounding masonry, spread point loads from structural elements like steel beams, preventing crushing of the masonry beneath. The size of the padstone depends on the magnitude of the load and the strength of the supporting wall."
  },
  {
    id: 'regs-part-a-11',
    question: "What does Approved Document A specify about the maximum unsupported height of a loadbearing masonry wall?",
    options: ["It must not exceed 12 times its thickness", "It must not exceed 16 times its thickness", "It must not exceed 20 times its thickness", "It must not exceed 24 times its thickness"],
    correctAnswer: "It must not exceed 20 times its thickness",
    explanation: "Approved Document A specifies that the maximum unsupported height of a loadbearing masonry wall generally must not exceed 20 times its thickness. This slenderness ratio ensures walls have adequate stability under vertical and lateral loads. For walls with greater heights or reduced thickness, additional lateral support through returns, piers, buttresses or other means would be required, or specific structural calculations would need to demonstrate the wall's adequacy for its specific loading and boundary conditions."
  },
  {
    id: 'regs-part-a-12',
    question: "Which document sets out the design loads for dead loads, imposed loads, and wind loads?",
    options: ["BS 8110", "BS 5950", "BS 6399 (replaced by BS EN 1991)", "BS 5628 (replaced by BS EN 1996)"],
    correctAnswer: "BS 6399 (replaced by BS EN 1991)",
    explanation: "BS 6399 (now replaced by BS EN 1991 Eurocode 1) sets out the design loads for dead loads, imposed loads, and wind loads. Approved Document A references these standards for determining appropriate design loads for structural calculations. Dead loads include the weight of the structure itself, imposed loads cover occupancy loads and movable items, and wind loads account for the forces exerted by wind on the building. Proper assessment of these loads is essential for compliant structural design."
  },
  {
    id: 'regs-part-a-13',
    question: "What type of floor construction would require lateral restraint straps according to Approved Document A?",
    options: ["Only concrete floors", "Only timber floors", "Only suspended floors", "Both timber and concrete floors where they meet loadbearing walls"],
    correctAnswer: "Both timber and concrete floors where they meet loadbearing walls",
    explanation: "According to Approved Document A, both timber and concrete floors where they meet loadbearing walls require lateral restraint straps. These straps tie the floor structure to the walls, providing restraint against lateral forces that might cause the wall to bow or collapse outward. For timber floors, the straps are typically fixed to joists, while in concrete floors they are cast in or fixed with expanding anchors. This restraint is particularly important at floor/wall junctions to create a tied structure."
  },
  {
    id: 'regs-part-a-14',
    question: "According to Approved Document A, what is the recommended minimum thickness for a retaining wall retaining more than 600mm of ground?",
    options: ["The wall should be designed by an engineer regardless of thickness", "190mm with proper drainage", "215mm with proper drainage", "At least 325mm with proper drainage"],
    correctAnswer: "The wall should be designed by an engineer regardless of thickness",
    explanation: "According to Approved Document A, a retaining wall supporting more than 600mm of ground should be properly designed by an engineer regardless of its thickness. This is because retaining walls are subject to significant lateral earth pressures that increase with height, requiring specific structural design rather than simply following prescriptive thickness rules. The design must account for soil type, groundwater conditions, surcharge loads, and appropriate drainage provisions to ensure long-term stability."
  },
  {
    id: 'regs-part-a-15',
    question: "What does Approved Document A require regarding the movement of foundations on clay soils?",
    options: ["All clay soils must have piled foundations", "Foundations must be designed to accommodate ground movement", "Clay soils must be removed and replaced before building", "Only raft foundations can be used on clay soils"],
    correctAnswer: "Foundations must be designed to accommodate ground movement",
    explanation: "Approved Document A requires that foundations on clay soils must be designed to accommodate ground movement. Clay soils are particularly susceptible to volume changes due to moisture variation, especially when affected by trees or seasonal factors. The foundation design must account for potential heave or shrinkage, typically by ensuring adequate foundation depth, appropriate foundation type (such as trench fill or piles in severe cases), and sometimes incorporating features like compressible materials to accommodate movement."
  },
  {
    id: 'regs-part-a-16',
    question: "What is the minimum depth of strip foundations in stable ground conditions according to Approved Document A?",
    options: ["450mm", "600mm", "750mm", "900mm"],
    correctAnswer: "450mm",
    explanation: "The minimum depth of strip foundations in stable ground conditions according to Approved Document A is 450mm. This depth is specified to ensure foundations are below the zone affected by frost heave and surface influences. In practice, the actual required depth may be greater depending on ground conditions, nearby structures, services, trees, or if the ground slopes. The foundation must always bear on suitable stable ground with adequate bearing capacity for the imposed loads."
  },
  {
    id: 'regs-part-a-17',
    question: "What percentage of the floor area can be removed to form openings in an upper floor without requiring special provisions for disproportionate collapse?",
    options: ["10%", "15%", "25%", "35%"],
    correctAnswer: "15%",
    explanation: "According to Approved Document A, up to 15% of the floor area can be removed to form openings in an upper floor without requiring special provisions for disproportionate collapse. This allowance permits reasonable-sized openings for stairs, services, or other features while maintaining sufficient floor diaphragm action for structural stability. Larger openings may require additional structural measures like trimming beams or enhanced tying to ensure the robustness of the structure is not compromised."
  },
  {
    id: 'regs-part-a-18',
    question: "What does Approved Document A specify about the lateral restraint of internal loadbearing walls?",
    options: ["Internal loadbearing walls do not require lateral restraint", "They must be tied to floors at maximum 2m intervals", "Only walls over 3m high need lateral restraint", "Lateral restraint is only required at roof level"],
    correctAnswer: "They must be tied to floors at maximum 2m intervals",
    explanation: "Approved Document A specifies that internal loadbearing walls must be tied to floors at maximum 2m intervals to provide lateral restraint. This restraint prevents the wall from buckling under vertical load and ensures the overall stability of the structure. The connections can be achieved through metal straps, joist hangers, or direct bearing of floor elements, depending on the construction type. Proper lateral restraint at these key junctions is essential for structural integrity and resistance to disproportionate collapse."
  },
  {
    id: 'regs-part-a-19',
    question: "According to Approved Document A, what is the typical required thickness of a cavity wall for a building not exceeding 3 storeys?",
    options: ["At least 75mm for each leaf", "At least 90mm for each leaf", "At least 100mm for the outer leaf and 100mm for the inner leaf", "At least 105mm for the outer leaf and 100mm for the inner leaf"],
    correctAnswer: "At least 90mm for each leaf",
    explanation: "According to Approved Document A, for a cavity wall in a building not exceeding 3 storeys, each leaf should typically be at least 90mm thick. This minimum thickness ensures adequate structural strength and stability for both the inner and outer leaves. The cavity width is additional to these leaf thicknesses. For higher buildings or those subject to greater loads, increased wall thickness or specific structural design may be required to meet the loading requirements."
  },
  {
    id: 'regs-part-a-20',
    question: "What is the maximum area of openings permitted in a section of wall between vertical supports according to Approved Document A?",
    options: ["25% of the wall area", "30% of the wall area", "45% of the wall area", "50% of the wall area"],
    correctAnswer: "50% of the wall area",
    explanation: "According to Approved Document A, the maximum area of openings permitted in a section of wall between vertical supports is generally 50% of the wall area. This limitation ensures sufficient solid wall remains to maintain structural integrity and stability. Walls with larger opening percentages require specific structural design to provide adequate strength and stability through alternative means such as additional supports, reinforcement, or frame structures incorporated within the wall construction."
  },
  {
    id: 'regs-part-a-21',
    question: "What does Approved Document A require regarding the use of wall ties in cavity walls?",
    options: ["Wall ties are optional for cavities less than 50mm wide", "Wall ties must be spaced at maximum 900mm horizontally and 450mm vertically", "Wall ties are only required at the top of the wall", "Wall ties are only required around openings"],
    correctAnswer: "Wall ties must be spaced at maximum 900mm horizontally and 450mm vertically",
    explanation: "Approved Document A requires that wall ties in cavity walls must be spaced at maximum 900mm horizontally and 450mm vertically. This creates a staggered pattern with approximately 2.5 ties per square meter. Additional ties are required around openings and at movement joints. The type and material of ties must be appropriate for the cavity width and wall type, with corrosion-resistant materials specified. Wall ties are essential for ensuring the two leaves of a cavity wall act together to resist lateral loads."
  },
  {
    id: 'regs-part-a-22',
    question: "What is the required overlap for laps in reinforcement bars according to Approved Document A?",
    options: ["At least 15 bar diameters", "At least 25 bar diameters", "At least 35 bar diameters", "At least 45 bar diameters"],
    correctAnswer: "At least 25 bar diameters",
    explanation: "According to Approved Document A and referenced standards, laps in reinforcement bars should generally be at least 25 bar diameters. This length ensures adequate force transfer between bars through bond with the surrounding concrete. Proper lapping of reinforcement is essential to maintain structural continuity and strength. In some situations involving larger bars or specific design conditions, engineers may specify different lap lengths based on detailed structural calculations."
  },
  {
    id: 'regs-part-a-23',
    question: "What does Approved Document A specify about the structural fire resistance of elements protecting against disproportionate collapse?",
    options: ["No specific fire resistance is required", "15 minutes minimum fire resistance", "30 minutes minimum fire resistance", "The same fire resistance as required for life safety"],
    correctAnswer: "The same fire resistance as required for life safety",
    explanation: "Approved Document A specifies that elements protecting against disproportionate collapse should have the same fire resistance as required for life safety (as detailed in Approved Document B). This ensures that structural elements critical to preventing progressive collapse maintain their integrity during a fire scenario. The requirement recognizes that elements key to structural robustness must retain their function during fire to prevent a fire-induced local failure from propagating into a disproportionate collapse situation."
  },
  {
    id: 'regs-part-a-24',
    question: "According to Approved Document A, what provision must be made when building over or near drains?",
    options: ["Drains must always be diverted around the building", "The building must be constructed so that loads are not transferred to the drain", "Drains can be built over without any special measures", "Only surface water drains can be built over"],
    correctAnswer: "The building must be constructed so that loads are not transferred to the drain",
    explanation: "According to Approved Document A, when building over or near drains, the building must be constructed so that loads are not transferred to the drain. This typically involves creating a protective arch or lintel over the drain, ensuring foundation loads bypass the drain, or using pier and beam foundations to bridge over it. The goal is to prevent damage to the drain from building loads, which could lead to leakage, subsidence, or structural problems. Building Control approval and often Water Authority consent are required for building over drains."
  },
  {
    id: 'regs-part-a-25',
    question: "What minimum width is specified for strip foundations under a residential cavity wall according to Approved Document A?",
    options: ["The same width as the wall", "The width of the wall plus 100mm", "The width of the wall plus 150mm on each side", "A fixed width of 600mm regardless of wall width"],
    correctAnswer: "The width of the wall plus 150mm on each side",
    explanation: "According to Approved Document A, the minimum width for strip foundations under a residential cavity wall should be the width of the wall plus 150mm on each side. For a typical 300mm cavity wall, this would result in a 600mm wide foundation. This width ensures adequate bearing on the soil and provides sufficient edge distance to properly support both leaves of the cavity wall. Wider foundations may be required in weaker soils or for heavily loaded walls."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-a', 'items', q.id), {
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
