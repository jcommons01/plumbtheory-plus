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

// ✅ Building Regulations Part C - Site Preparation & Moisture Questions
const questions = [
  {
    id: 'regs-part-c-1',
    question: "What are the main areas covered by Approved Document C?",
    options: ["Site preparation, resistance to contaminants, and resistance to moisture", "Structural safety, ground conditions, and drainage", "Construction materials, site safety, and environmental protection", "Ground investigation, foundation design, and waterproofing"],
    correctAnswer: "Site preparation, resistance to contaminants, and resistance to moisture",
    explanation: "Approved Document C covers three main areas: site preparation, resistance to contaminants, and resistance to moisture. This includes clearing and preparing the site, managing risks from ground conditions (including hazardous substances, landfill gases, and radon), and preventing moisture from entering the building from the ground, rain, and interstitial/surface condensation. The document provides practical guidance on how to meet the requirements of Part C of the Building Regulations."
  },
  {
    id: 'regs-part-c-2',
    question: "What is the minimum height a damp-proof course (DPC) should be positioned above external ground level?",
    options: ["75mm", "100mm", "150mm", "225mm"],
    correctAnswer: "150mm",
    explanation: "According to Approved Document C, a damp-proof course (DPC) should be positioned at least 150mm above external ground level. This height requirement prevents splashing rainwater and minor ground level fluctuations from bridging the DPC. The 150mm minimum clearance provides a safety margin to ensure the DPC remains effective even with normal variations in external landscaping, helping to prevent moisture from rising into the wall and causing damp problems inside the building."
  },
  {
    id: 'regs-part-c-3',
    question: "What are the three grades of waterproofing protection defined in BS 8102 for basements?",
    options: ["Low, medium, high protection", "Grade 1, Grade 2, Grade 3", "Type A, Type B, Type C", "Class I, Class II, Class III"],
    correctAnswer: "Grade 1, Grade 2, Grade 3",
    explanation: "BS 8102, referenced in Approved Document C, defines three grades of waterproofing protection for basements: Grade 1 (basic utility), Grade 2 (better utility), and Grade 3 (habitable). Grade 1 tolerates some seepage and damp areas, Grade 2 provides an essentially dry environment with possible damp areas, and Grade 3 provides a completely dry environment suitable for habitable spaces. The appropriate grade depends on the intended use of the basement, with higher grades requiring more robust waterproofing systems."
  },
  {
    id: 'regs-part-c-4',
    question: "According to Approved Document C, what should be the cross-ventilation area in a suspended timber floor per meter run of external wall?",
    options: ["500mm²", "1000mm²", "1500mm²", "2000mm²"],
    correctAnswer: "1500mm²",
    explanation: "According to Approved Document C, the cross-ventilation area in a suspended timber floor should be at least 1500mm² per meter run of external wall. This ventilation is typically provided through airbricks or similar ventilators spaced appropriately along opposite external walls. Adequate subfloor ventilation is essential to remove ground moisture vapor that could otherwise lead to condensation on floor timbers, potentially causing decay. For very large floor areas, additional intermediate ventilation may be required."
  },
  {
    id: 'regs-part-c-5',
    question: "What is a 'cold bridge' in relation to Building Regulations Part C?",
    options: ["A steel support beam that feels cold to touch", "A bridge designed for cold climates", "A part of the building with lower thermal resistance where condensation may occur", "A technical term for a damp-proof course"],
    correctAnswer: "A part of the building with lower thermal resistance where condensation may occur",
    explanation: "A cold bridge (or thermal bridge) is a part of the building with lower thermal resistance where condensation may occur. These areas, where heat can escape more readily, often result in colder internal surface temperatures that fall below the dew point of warm interior air, causing condensation. Common cold bridges include window lintels, floor-wall junctions, and wall ties in cavity walls. Approved Document C addresses cold bridges as part of managing surface and interstitial condensation risks in buildings."
  },
  {
    id: 'regs-part-c-6',
    question: "When is a site investigation required according to Approved Document C?",
    options: ["Only for developments on brownfield sites", "For all building projects regardless of size or location", "When there is known or suspected contamination or on sites with a previous industrial use", "Only when required by the local planning authority"],
    correctAnswer: "When there is known or suspected contamination or on sites with a previous industrial use",
    explanation: "According to Approved Document C, a site investigation is required when there is known or suspected contamination or on sites with a previous industrial use. This would typically include brownfield sites, landfill areas, or locations with a history of activities that might have left contaminants. The investigation assesses the presence and concentration of hazardous substances, landfill gases, or other pollutants that might affect the new building or its occupants, informing appropriate remediation or protection measures."
  },
  {
    id: 'regs-part-c-7',
    question: "What type of membrane is required under a concrete floor that is in direct contact with the ground?",
    options: ["A gas-resistant membrane only", "A damp-proof course (DPC)", "A damp-proof membrane (DPM)", "Vapor-check membrane"],
    correctAnswer: "A damp-proof membrane (DPM)",
    explanation: "Under a concrete floor that is in direct contact with the ground, a damp-proof membrane (DPM) is required according to Approved Document C. This continuous impervious layer prevents ground moisture from rising through the concrete floor. Typically, the DPM is placed either below the concrete slab, within it, or above it (but below the screed), and should be properly lapped and sealed at joints. It must also be appropriately connected to the damp-proof course in surrounding walls to create a continuous barrier against moisture."
  },
  {
    id: 'regs-part-c-8',
    question: "What does Approved Document C suggest as the minimum thickness for a damp-proof membrane (DPM) in a solid concrete floor?",
    options: ["0.2mm (200 microns)", "0.3mm (300 microns)", "0.5mm (500 microns)", "1.0mm (1000 microns)"],
    correctAnswer: "0.3mm (300 microns)",
    explanation: "Approved Document C suggests a minimum thickness of 0.3mm (300 microns) for a damp-proof membrane (DPM) in a solid concrete floor. This is typically expressed as 1200 gauge polyethylene, where 1200 gauge equals 300 microns. This minimum thickness ensures the membrane has sufficient strength and durability to maintain its integrity during the construction process and throughout the building's life, providing reliable protection against ground moisture rising through the floor structure."
  },
  {
    id: 'regs-part-c-9',
    question: "What type of construction is appropriate for a floor in a building located in an area of high radon risk?",
    options: ["Any standard construction with a DPM", "A suspended timber floor with ventilation", "A concrete floor with protective membrane and ventilation provision", "A floating floor on rigid insulation"],
    correctAnswer: "A concrete floor with protective membrane and ventilation provision",
    explanation: "In an area of high radon risk, Approved Document C recommends a concrete floor with a radon-protective membrane and ventilation provision. This typically includes a radon-resistant barrier membrane (which may be the same as or in addition to the damp-proof membrane) and a means to extract radon from below the floor, such as a sumped void or permeable sub-base with potential connection points for future active extraction if required. This approach prevents radon gas from entering the building while providing means to remove it if levels increase."
  },
  {
    id: 'regs-part-c-10',
    question: "What is 'tanking' in relation to moisture protection?",
    options: ["The process of collecting rainwater in tanks", "A continuous waterproof layer applied to walls and floors below ground", "The creation of water storage tanks within a building", "A type of drainage system around a building"],
    correctAnswer: "A continuous waterproof layer applied to walls and floors below ground",
    explanation: "Tanking refers to a continuous waterproof layer applied to walls and floors below ground to prevent water ingress. This method is commonly used in basements and other underground spaces where the structure is subjected to groundwater pressure. Tanking can be applied to the internal or external faces of walls and under floors, creating a complete waterproof envelope. Approved Document C references tanking as one approach to waterproofing below-ground structures, alongside other methods like waterproof concrete or cavity drain systems."
  },
  {
    id: 'regs-part-c-11',
    question: "What does Approved Document C require regarding drainage for solid floors in contact with the ground?",
    options: ["All floors must have drainage pipes installed beneath them", "No specific drainage requirements apply", "The ground should be effectively drained or the floor should be provided with a damp-proof membrane", "Drainage is only required for commercial buildings"],
    correctAnswer: "The ground should be effectively drained or the floor should be provided with a damp-proof membrane",
    explanation: "For solid floors in contact with the ground, Approved Document C requires that the ground should be effectively drained or the floor should be provided with a damp-proof membrane. Effective drainage might involve site grading, land drains, or granular fill layers where ground conditions permit. If effective ground drainage cannot be achieved, a damp-proof membrane becomes essential to prevent ground moisture from affecting the floor structure. In most cases, both approaches are used together for maximum protection against ground moisture."
  },
  {
    id: 'regs-part-c-12',
    question: "What is the purpose of a cavity tray in a masonry cavity wall?",
    options: ["To store rainwater that enters the cavity", "To provide insulation within the cavity", "To collect and direct moisture out of the cavity", "To reinforce the wall structure"],
    correctAnswer: "To collect and direct moisture out of the cavity",
    explanation: "The purpose of a cavity tray in a masonry cavity wall is to collect and direct moisture out of the cavity. These impermeable barriers are installed at points where the cavity is bridged (such as over openings, at abutments with roofs, or where items penetrate the cavity) to prevent water that has entered the outer leaf from crossing to the inner leaf. Cavity trays include an upstand against the inner leaf, are sloped toward the outer leaf, and incorporate weep holes to allow collected water to exit the wall."
  },
  {
    id: 'regs-part-c-13',
    question: "According to Approved Document C, what is required to prevent moisture from the ground reaching the inside of a building?",
    options: ["Only a damp-proof course in the walls", "Only a damp-proof membrane in the floor", "Either a solid floor or raised timber floor with adequate ventilation, plus a damp-proof course in the walls", "A vapor barrier on the warm side of the insulation"],
    correctAnswer: "Either a solid floor or raised timber floor with adequate ventilation, plus a damp-proof course in the walls",
    explanation: "To prevent moisture from the ground reaching the inside of a building, Approved Document C requires either a solid floor (with appropriate damp-proofing) or a raised timber floor with adequate ventilation, plus a damp-proof course in the walls. Solid floors need a damp-proof membrane while suspended timber floors require ventilation below (at least 150mm clear airspace) to prevent moisture accumulation. These measures, combined with a properly positioned damp-proof course in the walls, create a comprehensive barrier against ground moisture."
  },
  {
    id: 'regs-part-c-14',
    question: "What does Approved Document C state about using the 'cavity drain system' (Type C according to BS 8102) for basement waterproofing?",
    options: ["It should not be used in residential basements", "It is acceptable for any type of basement", "It should only be used with pump and sump systems", "It is only suitable for commercial basements"],
    correctAnswer: "It is acceptable for any type of basement",
    explanation: "Approved Document C, with reference to BS 8102, states that the cavity drain system (Type C waterproofing) is acceptable for any type of basement. This system works by managing water rather than blocking it, using membranes to create a cavity that directs water to a drainage system, typically including a sump and pump. While it must be correctly designed and installed with appropriate maintenance access, the cavity drain approach is recognized as a valid waterproofing strategy for basements of all types and uses, including both residential and commercial applications."
  },
  {
    id: 'regs-part-c-15',
    question: "Which of the following is NOT a typical Type A waterproofing system according to BS 8102?",
    options: ["Cementitious slurry coating", "Liquid-applied membrane", "Cavity drain membrane", "Bonded sheet membrane"],
    correctAnswer: "Cavity drain membrane",
    explanation: "A cavity drain membrane is NOT a Type A waterproofing system according to BS 8102. Type A (barrier) protection involves a waterproof barrier applied to the structure that physically blocks water entry, including cementitious slurry coatings, liquid-applied membranes, and bonded sheet membranes. The cavity drain membrane is instead classified as Type C (drained) protection, which manages water by providing a space for it to drain away rather than attempting to block it completely. Approved Document C references these classifications when discussing basement waterproofing approaches."
  },
  {
    id: 'regs-part-c-16',
    question: "According to Approved Document C, what is required to deal with the risk of interstitial condensation in walls, floors and roofs?",
    options: ["Insulation on the cold side of the structure only", "A continuous vapor control layer on the warm side of the insulation", "Multiple vapor control layers throughout the construction", "Ventilation only, with no vapor control layers"],
    correctAnswer: "A continuous vapor control layer on the warm side of the insulation",
    explanation: "To deal with interstitial condensation risk, Approved Document C recommends a continuous vapor control layer on the warm side of the insulation. This layer restricts the movement of warm, moist air into the cooler parts of the construction where it might condense. The document notes that interstitial condensation analysis may be carried out according to BS EN ISO 13788 or BS 5250. Proper detailing of the vapor control layer at junctions and penetrations is essential, as is consideration of the overall breathability of the construction."
  },
  {
    id: 'regs-part-c-17',
    question: "What is the main purpose of 'weep holes' in external masonry walls?",
    options: ["To allow the wall to breathe", "To provide ventilation to the interior", "To allow water collected by cavity trays to drain out", "To equalize air pressure on both sides of the wall"],
    correctAnswer: "To allow water collected by cavity trays to drain out",
    explanation: "The main purpose of weep holes in external masonry walls is to allow water collected by cavity trays to drain out. These small openings, typically formed by leaving perpendicular joints open or using special weep vents, are positioned at the base of walls and above openings like windows and doors where cavity trays are installed. They provide an exit path for any moisture that has penetrated the outer leaf and been intercepted by cavity trays, preventing it from accumulating within the cavity or finding its way to the inner leaf."
  },
  {
    id: 'regs-part-c-18',
    question: "What is the minimum clear airspace required between the underside of suspended timber floor joists and the ground according to Approved Document C?",
    options: ["75mm", "100mm", "150mm", "200mm"],
    correctAnswer: "150mm",
    explanation: "According to Approved Document C, the minimum clear airspace required between the underside of suspended timber floor joists and the ground is 150mm. This space, combined with appropriate cross-ventilation, ensures that ground moisture can evaporate and be removed before affecting the timber elements. Maintaining this minimum clearance is essential for preventing decay in the floor structure due to excessive ground moisture. The space should be measured from the highest point of the ground surface to the underside of the joists."
  },
  {
    id: 'regs-part-c-19',
    question: "What requirements does Approved Document C specify for the junctions between a damp-proof course (DPC) and a damp-proof membrane (DPM)?",
    options: ["They must be separated by at least 150mm", "No specific requirements are given", "They should be bonded together or lapped by at least 100mm", "They should be connected with a dedicated transition piece"],
    correctAnswer: "They should be bonded together or lapped by at least 100mm",
    explanation: "Approved Document C specifies that junctions between a damp-proof course (DPC) and a damp-proof membrane (DPM) should be bonded together or lapped by at least 100mm. This ensures continuity of the moisture barrier between walls and floors, preventing ground moisture from finding a path into the building at this vulnerable junction. Proper integration of these elements creates a continuous waterproof envelope around the building's lower portions, essential for effective moisture control."
  },
  {
    id: 'regs-part-c-20',
    question: "According to Approved Document C, what special provisions are required when building in areas with high radon levels?",
    options: ["No special provisions are required", "Only increased ventilation is needed", "A radon sump is always required regardless of radon levels", "Basic or full radon protection measures depending on the level of risk"],
    correctAnswer: "Basic or full radon protection measures depending on the level of risk",
    explanation: "When building in areas with high radon levels, Approved Document C requires basic or full radon protection measures depending on the level of risk. Basic radon protection typically involves a radon-resistant membrane across the ground floor with sealed joints, while full protection adds a radon sump (a dedicated void with potential for future mechanical extraction) under the floor. The required level of protection depends on the specific radon potential in the area, as identified on radon maps or through site testing."
  },
  {
    id: 'regs-part-c-21',
    question: "What does Approved Document C recommend for external rendering to prevent rain penetration?",
    options: ["All renders must include waterproofing additives", "Render should be at least 25mm thick in three coats", "Render mix should be appropriate for the exposure and backing material", "Only polymer-modified renders should be used"],
    correctAnswer: "Render mix should be appropriate for the exposure and backing material",
    explanation: "Approved Document C recommends that the render mix should be appropriate for the exposure conditions and backing material to prevent rain penetration. This means using stronger mixes (higher cement content) for more severe exposure situations and ensuring compatibility with the substrate. The document references BS EN 13914 for guidance on appropriate specifications. Proper application, adequate thickness, and suitable detailing at junctions and abutments are also emphasized to ensure effective weather resistance."
  },
  {
    id: 'regs-part-c-22',
    question: "What is the purpose of a 'gas membrane' in building construction?",
    options: ["To prevent cooking gas from entering living spaces", "To allow gas central heating systems to function", "To prevent landfill gas, radon or other ground gases from entering the building", "To enable gas exchange in breathing walls"],
    correctAnswer: "To prevent landfill gas, radon or other ground gases from entering the building",
    explanation: "A gas membrane is installed to prevent landfill gas, radon, or other ground gases from entering the building. These specialized membranes have low gas permeability and are installed within the floor construction, with careful sealing around service penetrations and at junctions with walls. Approved Document C requires gas protection measures when building on or near sites with potential gas issues, such as former landfills or in areas with naturally occurring radon. The specific design depends on the gas type, concentration, and risk level."
  },
  {
    id: 'regs-part-c-23',
    question: "What does Approved Document C recommend to prevent condensation in roof spaces?",
    options: ["Always use a vapor barrier regardless of roof type", "Ventilate the roof space and/or provide a vapor control layer depending on the roof type", "Do not insulate the roof space", "Install dehumidification equipment in all roof spaces"],
    correctAnswer: "Ventilate the roof space and/or provide a vapor control layer depending on the roof type",
    explanation: "To prevent condensation in roof spaces, Approved Document C recommends ventilating the roof space and/or providing a vapor control layer depending on the roof type. For cold roofs (insulation at ceiling level), adequate ventilation of the loft space is typically required. For warm roofs (insulation following rafter line), a vapor control layer on the warm side of the insulation may be necessary. The appropriate approach depends on the specific roof construction, with reference to BS 5250 (Management of moisture in buildings) for detailed guidance."
  },
  {
    id: 'regs-part-c-24',
    question: "What is the minimum recommended distance between a new building and any existing trees, according to Approved Document C guidance?",
    options: ["Equal to the mature height of the tree", "One meter for every meter of the tree's height", "There is no specific recommendation as it depends on soil type and tree species", "Equal to the current spread of the tree's branches"],
    correctAnswer: "There is no specific recommendation as it depends on soil type and tree species",
    explanation: "Approved Document C does not provide a single specific measurement for the minimum distance between a new building and existing trees. Instead, it acknowledges that the appropriate distance depends on soil type, tree species, and other factors. The document references guidance from NHBC and other sources that take into account the soil's shrinkage potential, tree species' water demand, and the tree's mature height. Different tree species affect soils differently, and various soil types (particularly clays) respond differently to moisture extraction by tree roots."
  },
  {
    id: 'regs-part-c-25',
    question: "According to Approved Document C, what method can be used to protect timber that is naturally durable but needs to be used in a higher risk situation?",
    options: ["It cannot be used in higher risk situations under any circumstances", "Coating with protective paint is sufficient", "Pressure treatment with preservative to an appropriate level", "Simply increasing the timber dimensions is adequate"],
    correctAnswer: "Pressure treatment with preservative to an appropriate level",
    explanation: "According to Approved Document C, naturally durable timber that needs to be used in a higher risk situation can be protected through pressure treatment with preservative to an appropriate level. The document references BS 8417 and other standards for guidance on appropriate preservative treatments based on the wood's natural durability and the intended use class. The treatment level should be specified to match the increased biological hazard of the situation, ensuring the timber's longevity and performance despite the challenging conditions."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-c', 'items', q.id), {
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
