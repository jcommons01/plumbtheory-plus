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

// ✅ Bricklaying Level 3 Advanced Building Technology Questions
const questions = [
  {
    id: 'bricklaying-l3-topic4-1',
    question: "What is the U-value in building construction?",
    options: ["The ultraviolet light resistance rating of a material", "The unit price value of construction materials", "The rate of heat transfer through a structure, measured in W/m²K", "The universal load value a wall can support"],
    correctAnswer: "The rate of heat transfer through a structure, measured in W/m²K",
    explanation: "The U-value measures the rate of heat transfer through a structure, expressed in Watts per square meter per Kelvin (W/m²K). Lower U-values indicate better thermal insulation. Building Regulations set maximum U-values for different building elements to ensure energy efficiency. For masonry walls, U-values are affected by brick type, cavity width, insulation type and thickness, and thermal bridging."
  },
  {
    id: 'bricklaying-l3-topic4-2',
    question: "What is a 'thermal bridge' in masonry construction?",
    options: ["A heating element installed within walls", "A path where heat can transfer more easily through the building envelope", "A special brick that conducts heat for passive heating", "A gap between insulation panels"],
    correctAnswer: "A path where heat can transfer more easily through the building envelope",
    explanation: "A thermal bridge is a path where heat transfers more easily through the building envelope. Common bridges in masonry include wall ties, lintels, floor junctions, and window reveals. These areas have higher thermal conductivity than surrounding construction, leading to increased heat loss, cold spots, and potential condensation. Modern construction minimizes thermal bridging using thermally broken components, careful detailing, and continuous insulation layers."
  },
  {
    id: 'bricklaying-l3-topic4-3',
    question: "What is the primary purpose of a vapor barrier in wall construction?",
    options: ["To prevent water penetration from outside", "To block air movement through the wall", "To control the diffusion of water vapor through the wall", "To provide additional thermal insulation"],
    correctAnswer: "To control the diffusion of water vapor through the wall",
    explanation: "A vapor barrier controls the diffusion of water vapor through the wall, preventing interstitial condensation. It's typically placed on the warm side of insulation (inside in the UK climate) to stop warm, moist indoor air from reaching cold surfaces within the wall where it could condense. In masonry construction, vapor control is achieved through proper placement of low-permeability materials and maintaining correct cavity ventilation."
  },
  {
    id: 'bricklaying-l3-topic4-4',
    question: "What is the role of 'helical ties' in modern masonry construction?",
    options: ["To create decorative spiral patterns", "To reinforce and stabilize masonry by connecting wythes or repairing cracks", "To support hanging fixtures on walls", "To allow for controlled thermal expansion"],
    correctAnswer: "To reinforce and stabilize masonry by connecting wythes or repairing cracks",
    explanation: "Helical ties reinforce and stabilize masonry by connecting wythes or repairing cracks. Made from stainless steel in a twisted, spiral form, they provide tensile strength while allowing some flexibility for thermal movement. They're used in cavity wall construction to connect leaves, for crack stitching repairs, and for tying new masonry to existing structures. Their helical design provides mechanical interlock with mortar, creating strong connections with minimal intrusion."
  },
  {
    id: 'bricklaying-l3-topic4-5',
    question: "What is 'rainscreen cladding' in modern building facades?",
    options: ["A waterproof coating applied to brickwork", "A system that includes an outer weather-resistant skin separated from the insulated wall by a ventilated cavity", "A type of roof designed to collect rainwater", "A window treatment that repels water"],
    correctAnswer: "A system that includes an outer weather-resistant skin separated from the insulated wall by a ventilated cavity",
    explanation: "Rainscreen cladding includes an outer weather-resistant skin separated from the insulated wall by a ventilated cavity. This system manages water penetration differently from traditional masonry by accepting that some water will penetrate the outer skin but will then drain down the cavity face and exit at the bottom. The ventilated cavity also allows pressure equalization, reducing water ingress, and aids moisture removal through airflow."
  },
  {
    id: 'bricklaying-l3-topic4-6',
    question: "What is a 'super-insulated cavity wall'?",
    options: ["A wall insulated with exotic, expensive materials", "A masonry cavity wall with a wider cavity that allows for thickness of insulation beyond standard construction", "A cavity wall specifically designed for sub-zero climates", "A wall with a cavity filled with super-expanding foam"],
    correctAnswer: "A masonry cavity wall with a wider cavity that allows for thickness of insulation beyond standard construction",
    explanation: "A super-insulated cavity wall is a masonry cavity wall with a wider cavity allowing for thicker insulation than standard construction. Typically featuring cavities of 150-200mm (compared to traditional 50-100mm), these walls can achieve U-values below 0.15 W/m²K, exceeding standard Building Regulations requirements. They require special longer wall ties, careful detailing at openings and junctions, and particular attention to thermal bridge mitigation."
  },
  {
    id: 'bricklaying-l3-topic4-7',
    question: "What is 'offsite construction' in relation to masonry elements?",
    options: ["Building walls away from their final position on site", "Manufacturing prefabricated masonry panels in controlled factory environments", "Designing masonry components from an offsite location", "Storing masonry materials away from the main construction site"],
    correctAnswer: "Manufacturing prefabricated masonry panels in controlled factory environments",
    explanation: "Offsite construction for masonry involves manufacturing prefabricated panels in controlled factory environments. These panels may include brick slips or facing bricks bonded to concrete or lightweight backing structures. Benefits include quality control, reduced weather dependency, faster installation, and less site waste. Precision factory processes ensure consistent appearance while specialized connection systems allow rapid site assembly, increasingly popular in modern construction for improved efficiency and performance."
  },
  {
    id: 'bricklaying-l3-topic4-8',
    question: "What is 'cross-laminated timber' (CLT) and how does it relate to modern masonry construction?",
    options: ["A wood-like finish applied to bricks", "A timber reinforcement system used within brick walls", "An engineered wood panel product that can be used as the structural element to which masonry cladding is attached", "A timber framing system that replaces masonry entirely"],
    correctAnswer: "An engineered wood panel product that can be used as the structural element to which masonry cladding is attached",
    explanation: "Cross-laminated timber (CLT) is an engineered wood panel product used as a structural element to which masonry cladding can be attached. These solid timber panels are made from layers of timber bonded perpendicular to each other. In modern construction, masonry is often used as an external cladding or veneer connected to CLT structural walls, combining the durability and appearance of brickwork with the sustainability and speed of timber construction."
  },
  {
    id: 'bricklaying-l3-topic4-9',
    question: "What is 'thin-joint masonry' technology?",
    options: ["A technique using extremely thin bricks", "A masonry system using special blocks with thinner, 2-3mm mortar joints", "A method for creating decorative thin joints on wall surfaces", "A way of cutting thin slices of stone for veneers"],
    correctAnswer: "A masonry system using special blocks with thinner, 2-3mm mortar joints",
    explanation: "Thin-joint masonry uses special blocks with thinner 2-3mm mortar joints instead of traditional 10mm joints. It employs precision-made aircrete or concrete blocks with quick-setting adhesive mortar applied with a special applicator. Benefits include faster construction (up to 3-4 times quicker), improved thermal performance due to reduced mortar thermal bridging, and greater dimensional accuracy. The system requires high precision in setting out and leveling but allows walls to reach full strength more quickly."
  },
  {
    id: 'bricklaying-l3-topic4-10',
    question: "What is the primary advantage of using autoclaved aerated concrete (AAC) blocks in modern construction?",
    options: ["Their decorative appearance", "Their high thermal insulation properties with relatively low density", "Their resistance to fire", "Their low cost compared to clay bricks"],
    correctAnswer: "Their high thermal insulation properties with relatively low density",
    explanation: "The primary advantage of AAC blocks is their high thermal insulation with relatively low density. These lightweight blocks contain millions of air pockets, providing excellent thermal resistance (lambda values around 0.11-0.16 W/mK) while remaining structurally adequate. Their light weight (typically 1/5 of concrete) reduces structural loads and eases handling. Additional benefits include good fire resistance, sound insulation, and workability (they can be easily cut or chased)."
  },
  {
    id: 'bricklaying-l3-topic4-11',
    question: "What is 'Building Information Modeling' (BIM) and how does it affect masonry construction?",
    options: ["A type of brick with embedded information chips", "A process of creating digital representations of buildings for design, construction and operation", "A method for testing building materials", "A regulatory compliance system"],
    correctAnswer: "A process of creating digital representations of buildings for design, construction and operation",
    explanation: "BIM is a process of creating digital representations of buildings for design, construction, and operation. For masonry, BIM allows virtual modeling of brick elements with precise specifications, clash detection with other building elements, accurate quantity takeoffs, and construction sequencing. Advanced BIM models can include thermal properties, cost data, and maintenance information, enhancing coordination and reducing errors before physical construction begins."
  },
  {
    id: 'bricklaying-l3-topic4-12',
    question: "What is a 'pressure equalized rainscreen' system?",
    options: ["A system for equalizing mortar pressure during application", "A facade design where the air pressure in the cavity behind the outer cladding is the same as outside, minimizing water infiltration", "A system for testing the water resistance of bricks under pressure", "A method for ensuring equal pressure on both sides of a wall"],
    correctAnswer: "A facade design where the air pressure in the cavity behind the outer cladding is the same as outside, minimizing water infiltration",
    explanation: "A pressure equalized rainscreen system equalizes air pressure in the cavity behind the cladding with external pressure, minimizing water infiltration. By compartmentalizing the cavity and including properly sized ventilation openings, wind pressure is quickly balanced across the outer skin. This neutralizes the driving force that would push water through joints, instead relying on gravity drainage for water management. Modern masonry rainscreens incorporate these pressure equalization principles for superior weatherproofing performance."
  },
  {
    id: 'bricklaying-l3-topic4-13',
    question: "What is the 'thermal mass' of a masonry wall?",
    options: ["The total weight of the heated materials", "The ability of the wall to store and gradually release heat energy", "The measurement of a wall's surface temperature", "The amount of energy needed to heat the wall"],
    correctAnswer: "The ability of the wall to store and gradually release heat energy",
    explanation: "Thermal mass refers to a masonry wall's ability to store and gradually release heat energy. Dense materials like brick and concrete absorb heat during warm periods and release it during cooler times, moderating temperature fluctuations. This property can reduce heating and cooling energy use when properly integrated with building design and HVAC systems. Exposed internal masonry offers better utilization of thermal mass effects than externally insulated walls."
  },
  {
    id: 'bricklaying-l3-topic4-14',
    question: "What is 'vacuum insulation' and how might it be used in advanced masonry construction?",
    options: ["A method of removing air from cavity walls", "A system that sucks moisture out of walls", "Ultra-thin panels with very high thermal resistance that can be used where space is limited", "A technique for drawing mortar into thin joints using vacuum pressure"],
    correctAnswer: "Ultra-thin panels with very high thermal resistance that can be used where space is limited",
    explanation: "Vacuum insulation panels (VIPs) are ultra-thin panels with very high thermal resistance used where space is limited. They achieve thermal conductivity as low as 0.004 W/mK (compared to 0.022-0.044 for conventional insulation) through a microporous core material inside a gas-tight envelope under vacuum. In masonry construction, VIPs can be used in wall cavities where traditional thickness is impossible, like retrofitting historic buildings or insulating door reveals."
  },
  {
    id: 'bricklaying-l3-topic4-15',
    question: "What is a 'phase change material' (PCM) and its potential application in masonry construction?",
    options: ["A material that changes from brick to stone over time", "A substance that changes phase (usually solid to liquid) to store and release large amounts of energy", "A type of mortar that changes color as it cures", "A material that transitions between different structural phases under stress"],
    correctAnswer: "A substance that changes phase (usually solid to liquid) to store and release large amounts of energy",
    explanation: "Phase change materials change phase (usually solid to liquid) to store and release large amounts of energy. During phase change, these materials absorb or release latent heat while maintaining a nearly constant temperature. In advanced masonry, PCMs can be incorporated into walls via microcapsules in plaster, special PCM boards, or contained units, enhancing the thermal mass effect without the weight of traditional mass. They're particularly effective for tempering daily temperature fluctuations and reducing heating/cooling energy demands."
  },
  {
    id: 'bricklaying-l3-topic4-16',
    question: "What is the 'cold bridge calculation' (psi-value) in thermal assessment of buildings?",
    options: ["A measure of how cold a bridge structure becomes in winter", "A calculation of heat loss through thermal bridges, measured in W/mK", "A method for measuring the temperature of bridges in cold weather", "A technique for calculating when bridges will form ice in freezing conditions"],
    correctAnswer: "A calculation of heat loss through thermal bridges, measured in W/mK",
    explanation: "The cold bridge calculation (psi-value) quantifies heat loss through thermal bridges, measured in W/mK (Watts per meter per Kelvin). Unlike U-values that measure heat loss through homogeneous elements, psi-values measure additional heat flow at junctions where elements meet. In masonry construction, critical junctions include wall-floor connections, window reveals, and parapet details. Lower psi-values indicate better thermal performance, achieved through careful detailing to maintain continuity of the insulation layer."
  },
  {
    id: 'bricklaying-l3-topic4-17',
    question: "What does 'hygroscopic' mean in relation to building materials?",
    options: ["Materials that repel water", "Materials that absorb and retain water in vapor form from the air", "Materials that break down when exposed to moisture", "Materials that become stronger when wet"],
    correctAnswer: "Materials that absorb and retain water in vapor form from the air",
    explanation: "Hygroscopic materials absorb and retain water vapor from the air, with moisture content changing in response to ambient relative humidity. Many masonry materials, including clay bricks, lime mortars, and timber, have hygroscopic properties. This characteristic helps regulate internal humidity levels by absorbing excess moisture when the air is humid and releasing it when the air is dry, contributing to healthier indoor environments and potentially reducing condensation risks."
  },
  {
    id: 'bricklaying-l3-topic4-18',
    question: "What is a 'hygrothermal assessment' in building design?",
    options: ["A test of how comfortable a building feels", "An assessment of a building's heating system efficiency", "A combined analysis of heat and moisture movement through building elements", "A method for measuring building ventilation rates"],
    correctAnswer: "A combined analysis of heat and moisture movement through building elements",
    explanation: "A hygrothermal assessment analyzes combined heat and moisture movement through building elements. It models how wall assemblies respond to temperature, humidity, and weather conditions over time, predicting potential condensation risks, drying capacity, and long-term moisture content. For masonry walls, this analysis helps ensure designs balance thermal performance with appropriate moisture management, preventing issues like interstitial condensation that could lead to mold, decay, or decreased insulation effectiveness."
  },
  {
    id: 'bricklaying-l3-topic4-19',
    question: "What is 'passivhaus' or 'passive house' standard and how does it affect masonry construction?",
    options: ["A standard for houses with passive cooling only", "A house design that passively follows the sun's movement", "An ultra-low energy building standard requiring minimal heating/cooling and exceptional airtightness", "A standard for houses built with passive fire resistance"],
    correctAnswer: "An ultra-low energy building standard requiring minimal heating/cooling and exceptional airtightness",
    explanation: "Passivhaus is an ultra-low energy building standard requiring minimal heating/cooling and exceptional airtightness. For masonry construction, meeting Passivhaus demands superior insulation (U-values around 0.15 W/m²K or better), elimination of thermal bridges, exceptional airtightness (≤0.6 air changes per hour at 50 Pascal pressure), and controlled ventilation with heat recovery. Masonry walls for Passivhaus typically feature wider cavities, continuous insulation layers, and meticulous detailing at junctions to maintain thermal and air barrier integrity."
  },
  {
    id: 'bricklaying-l3-topic4-20',
    question: "What is 'dynamic insulation' in building envelope design?",
    options: ["Insulation that changes thickness automatically", "A ventilated system where air passes through the insulation, recovering heat that would otherwise be lost", "Insulation that adjusts to seasonal temperature changes", "Robotic insulation that moves to where it's most needed"],
    correctAnswer: "A ventilated system where air passes through the insulation, recovering heat that would otherwise be lost",
    explanation: "Dynamic insulation is a ventilated system where air passes through the insulation, recovering heat that would otherwise be lost. As incoming air travels through the insulation layer, it captures heat flowing outward through the wall. This preheats ventilation air while reducing conductive heat loss. In advanced masonry, dynamic insulation might be incorporated through air-permeable insulation layers with carefully designed airflow paths, potentially improving both energy efficiency and indoor air quality."
  },
  {
    id: 'bricklaying-l3-topic4-21',
    question: "What is 'breathability' in relation to masonry walls?",
    options: ["The ability of walls to let air pass through for ventilation", "The capacity of a wall to allow water vapor to pass through it", "A property that allows walls to expand and contract", "The ability of walls to supply oxygen to interiors"],
    correctAnswer: "The capacity of a wall to allow water vapor to pass through it",
    explanation: "Breathability refers to a wall's capacity to allow water vapor to pass through it. Vapor-permeable materials like lime mortars and plasters permit moisture movement, preventing trapped moisture that could cause damage. In traditional masonry, this breathability managed moisture without vapor barriers, allowing walls to dry in both directions. Modern breathable construction requires careful material selection and understanding of vapor profiles to ensure moisture can escape without condensing within the wall structure."
  },
  {
    id: 'bricklaying-l3-topic4-22',
    question: "What is a 'structural insulated panel' (SIP) and how might it relate to masonry construction?",
    options: ["A panel that insulates against structural movement", "An insulated panel used only for internal partitions", "A sandwich panel with insulation core between two structural boards, often used with brick cladding", "A reinforced insulation panel used within cavity walls"],
    correctAnswer: "A sandwich panel with insulation core between two structural boards, often used with brick cladding",
    explanation: "A structural insulated panel (SIP) is a sandwich panel with an insulation core between two structural boards. In modern construction, SIPs often serve as the structural and thermal element of walls, with masonry applied as an external cladding. Special brick tie systems secure the masonry veneer to the SIP structure. This hybrid approach combines the thermal efficiency and rapid assembly of SIPs with the durability and aesthetic benefits of brick, representing an evolution in how masonry is used in high-performance buildings."
  },
  {
    id: 'bricklaying-l3-topic4-23',
    question: "What is 'Building Performance Evaluation' (BPE) in relation to masonry construction?",
    options: ["A method for testing the strength of bricks", "A process for evaluating the structural stability of masonry", "The systematic assessment of how completed buildings perform against design intentions and user needs", "A system for rating the appearance of brickwork"],
    correctAnswer: "The systematic assessment of how completed buildings perform against design intentions and user needs",
    explanation: "Building Performance Evaluation systematically assesses how completed buildings perform against design intentions and user needs. For masonry construction, BPE might include thermal imaging to identify gaps in insulation or thermal bridges, air pressure testing to locate leakage, moisture content monitoring in walls, and occupant feedback about comfort. This post-construction evaluation provides valuable data on how masonry designs perform in reality versus theoretical predictions, informing future improvements in design and construction techniques."
  },
  {
    id: 'bricklaying-l3-topic4-24',
    question: "What is 'embodied carbon' in construction materials?",
    options: ["Carbon physically contained within the material", "Carbon that's visible in the material's appearance", "The total greenhouse gas emissions associated with material extraction, manufacturing, transportation, and installation", "The carbon offset credits purchased during construction"],
    correctAnswer: "The total greenhouse gas emissions associated with material extraction, manufacturing, transportation, and installation",
    explanation: "Embodied carbon refers to the total greenhouse gas emissions associated with material extraction, manufacturing, transportation, and installation. For masonry, this includes emissions from clay extraction, brick firing (particularly energy-intensive), cement production, and transportation. Different masonry materials have varying embodied carbon - for example, concrete blocks generally have lower embodied carbon than fired clay bricks, while reclaimed bricks have minimal new embodied carbon. This consideration is increasingly important in sustainable construction."
  },
  {
    id: 'bricklaying-l3-topic4-25',
    question: "What is a 'life cycle assessment' (LCA) in building materials evaluation?",
    options: ["An assessment of how long materials will last", "A method for calculating maintenance schedules", "A cradle-to-grave analysis of environmental impacts throughout a material's life", "A test of how materials age visually"],
    correctAnswer: "A cradle-to-grave analysis of environmental impacts throughout a material's life",
    explanation: "Life cycle assessment is a cradle-to-grave analysis of environmental impacts throughout a material's life. For masonry, LCA considers extraction, manufacturing, transportation, installation, maintenance, demolition, and disposal/recycling impacts. It evaluates multiple environmental factors beyond just carbon, including resource depletion, acidification, and toxicity. Clay bricks typically show high initial impacts but long service lives and recyclability, while some alternatives may have lower initial impacts but shorter durability, illustrating the importance of whole-life thinking."
  },
  {
    id: 'bricklaying-l3-topic4-26',
    question: "What is 'thermal lag' in relation to masonry walls?",
    options: ["The delay in a wall reaching its full insulating potential", "The time delay between the outside temperature peak and when the heat reaches the interior", "The time required for mortar to fully cure", "The period when a wall loses most heat during winter"],
    correctAnswer: "The time delay between the outside temperature peak and when the heat reaches the interior",
    explanation: "Thermal lag is the time delay between outside temperature peak and when heat reaches the interior. Masonry's high thermal mass creates significant lag (6-10 hours typically), delaying heat transfer through the wall. This property can be beneficial in climates with large daily temperature swings, as daytime heat reaches the interior in the evening when needed, while nighttime coolness arrives during the following day. Properly designed masonry buildings utilize this lag effect to reduce cooling and heating energy needs."
  },
  {
    id: 'bricklaying-l3-topic4-27',
    question: "What is 'hempcrete' and how does it relate to modern masonry construction?",
    options: ["A type of mortar made with hemp fibers", "A concrete mix containing hemp seeds for texture", "A biocomposite building material made from hemp hurds and lime, often used with timber framing", "A coating applied to brickwork to prevent water penetration"],
    correctAnswer: "A biocomposite building material made from hemp hurds and lime, often used with timber framing",
    explanation: "Hempcrete is a biocomposite building material made from hemp hurds (woody core) and lime. In relation to masonry, hempcrete is often used with timber framing as an alternative to conventional masonry walls, or in hybrid constructions where masonry provides structural support while hempcrete provides insulation. It offers good thermal and acoustic properties, breathability, and carbon sequestration benefits. Unlike traditional masonry, hempcrete is not load-bearing but serves as an insulating infill material with lower embodied carbon than many conventional alternatives."
  },
  {
    id: 'bricklaying-l3-topic4-28',
    question: "What is the significance of 'air permeability rating' in building regulations?",
    options: ["A measure of how quickly air can pass through a single brick", "A rating of how well a building prevents air leakage, measured in m³/(h.m²) at 50Pa", "A value indicating how well a building allows fresh air in", "The amount of air bubbles permitted in mortar mixes"],
    correctAnswer: "A rating of how well a building prevents air leakage, measured in m³/(h.m²) at 50Pa",
    explanation: "Air permeability rating measures how well a building prevents air leakage, expressed in m³/(h.m²) at 50Pa pressure. Building Regulations set maximum allowable air permeability (typically 10 m³/h/m² in the UK, with 5 or lower for higher energy efficiency standards). In masonry construction, achieving good air permeability requires attention to wall-floor junctions, service penetrations, window/door interfaces, and ensuring continuous air barrier systems. Uncontrolled air leakage significantly impacts energy efficiency regardless of insulation levels."
  },
  {
    id: 'bricklaying-l3-topic4-29',
    question: "What is 'calcium silicate' brick and what are its distinctive properties?",
    options: ["A brick made from clay with high silica content", "A brick manufactured from sand and limestone under pressure and steam curing", "A type of engineering brick with calcium additives", "A brick with decorative silicate glazing"],
    correctAnswer: "A brick manufactured from sand and limestone under pressure and steam curing",
    explanation: "Calcium silicate brick is manufactured from sand and limestone under pressure and steam curing. Its distinctive properties include precise dimensions with sharp arrises, consistent light coloration (typically white, grey, or buff), good compressive strength, and excellent freeze-thaw resistance. Unlike clay bricks, they don't undergo firing, resulting in lower embodied energy. They're dimensionally stable with minimal moisture movement, making them suitable for precision applications. They tend to be more moisture-absorbent than clay bricks, requiring appropriate detailing for weather protection."
  },
  {
    id: 'bricklaying-l3-topic4-30',
    question: "What is 'lime mortar' and why is it important in conservation and sustainable construction?",
    options: ["Mortar containing lime-green coloring", "Mortar made with citrus fruit extracts", "Mortar made primarily with lime rather than cement", "Any mortar used in tropical climates"],
    correctAnswer: "Mortar made primarily with lime rather than cement",
    explanation: "Lime mortar is made primarily with lime rather than cement. It's important in conservation because its flexible nature accommodates movement in historic buildings without damage, while its breathability allows moisture movement, preventing trapped dampness. For sustainable construction, lime mortar offers lower embodied carbon than cement, reabsorbs CO₂ during carbonation, and enables brick reuse at end-of-life as the softer mortar can be cleaned off more easily, supporting circular economy principles."
  },
  {
    id: 'bricklaying-l3-topic4-31',
    question: "What is 'shrinkage' in relation to masonry walls and how is it controlled?",
    options: ["The visual appearance of walls seeming smaller than designed", "The compaction of mortar as it dries", "The reduction in volume of clay masonry units or concrete blocks as they dry", "The compression of walls under load"],
    correctAnswer: "The reduction in volume of clay masonry units or concrete blocks as they dry",
    explanation: "Shrinkage is the reduction in volume of masonry units as they dry. Concrete blocks are particularly susceptible, with shrinkage continuing months after manufacture. It's controlled through movement joints at specified intervals (typically 6-9m for concrete blockwork), proper curing, using mature blocks (stored for some time after manufacture), incorporating bed joint reinforcement, and proper detailing at restraints and openings. Uncontrolled shrinkage can cause cracking, especially at stress concentration points like openings."
  },
  {
    id: 'bricklaying-l3-topic4-32',
    question: "What is 'mortar designation' in the context of UK masonry standards?",
    options: ["The color coding system for different mortars", "The formal naming of special mortars for specific projects", "A numerical classification system based on the proportions of cement, lime, and sand", "The process of selecting mortar for a project"],
    correctAnswer: "A numerical classification system based on the proportions of cement, lime, and sand",
    explanation: "Mortar designation is a numerical classification system based on the proportions of cement, lime, and sand. In UK standards, mortars range from designation (i) (strongest, typically 1:0-¼:3 cement:lime:sand) to designation (v) (weakest, typically 1:2:9). Stronger mortars provide higher compressive strength but less flexibility, while weaker mortars accommodate more movement but offer less durability in severe exposures. Appropriate designation selection depends on structural requirements, exposure conditions, and masonry unit properties."
  },
  {
    id: 'bricklaying-l3-topic4-33',
    question: "What is 'brick reinforcement' and when is it typically used?",
    options: ["Steel bars placed vertically in brick columns", "Mesh or ladder-like steel incorporated in bed joints", "Additional bricks used to strengthen corners", "A coating applied to bricks to increase strength"],
    correctAnswer: "Mesh or ladder-like steel incorporated in bed joints",
    explanation: "Brick reinforcement is mesh or ladder-like steel incorporated in bed joints to enhance wall performance. It's typically used above and below openings (extending 600mm beyond), at positions where wall thickness changes, in areas subject to concentrated loads, and intermittently in long walls to control shrinkage/expansion movement. Modern reinforcement is usually stainless steel or corrosion-resistant coated steel, available in various widths to suit different wall thicknesses. It provides tensile strength to masonry that otherwise has excellent compression properties but poor tension resistance."
  },
  {
    id: 'bricklaying-l3-topic4-34',
    question: "What does 'efflorescence' indicate in new brickwork?",
    options: ["A natural aging process that improves brick appearance", "The growth of moss or lichen", "White salt deposits caused by water moving through the masonry", "Chemical contamination from groundwater"],
    correctAnswer: "White salt deposits caused by water moving through the masonry",
    explanation: "Efflorescence appears as white salt deposits caused by water moving through masonry. It indicates that soluble salts within the bricks, mortar, or backing materials are being dissolved by water and transported to the surface where they crystallize as water evaporates. While often temporary in new construction and mainly aesthetic, persistent efflorescence may signal ongoing moisture problems. Prevention includes using low-salt materials, protecting work from excessive water during construction, proper DPCs, and adequate cavity details to manage water penetration."
  },
  {
    id: 'bricklaying-l3-topic4-35',
    question: "What is the principle behind 'lime cycling' in sustainable construction?",
    options: ["Using bicycles to transport lime to construction sites", "The continuous reapplication of limewash to building exteriors", "The process where lime in buildings absorbs CO2 during carbonation, and can later be recycled through reburning", "Adding lime to mortar in cycles rather than all at once"],
    correctAnswer: "The process where lime in buildings absorbs CO2 during carbonation, and can later be recycled through reburning",
    explanation: "Lime cycling refers to lime's ability to be recycled through its lifecycle. During carbonation, lime mortars absorb CO2, converting calcium hydroxide back to calcium carbonate (the original limestone state). At building end-of-life, this carbonated lime can theoretically be reburned, driving off CO2 and creating quicklime again. This cycle represents a form of carbon sequestration and material reuse. While not yet widely practiced commercially, the principle supports sustainable construction by considering entire material lifecycles."
  },
  {
    id: 'bricklaying-l3-topic4-36',
    question: "What is 'insulating concrete formwork' (ICF) and how does it relate to masonry?",
    options: ["Insulation placed inside concrete foundations", "Formwork that insulates workers from cold concrete", "A construction system where concrete is poured between permanent insulating forms", "Formwork made from insulating concrete"],
    correctAnswer: "A construction system where concrete is poured between permanent insulating forms",
    explanation: "Insulating concrete formwork (ICF) is a construction system where concrete is poured between permanent insulating forms, typically expanded polystyrene. Though not traditional masonry, ICF relates to modern bricklaying as the external finish often includes brick slips or traditional brick cladding attached to the ICF structure. This hybrid approach provides the thermal benefits of ICF with the appearance and durability of masonry. Special brick ties designed for ICF systems attach the masonry veneer to the substrate."
  },
  {
    id: 'bricklaying-l3-topic4-37',
    question: "What is the purpose of 'continuity insulation' in advanced masonry detailing?",
    options: ["Insulation that continues without stops from one end of a building to another", "Insulation designed to conduct electricity for anti-static properties", "Careful detailing to ensure insulation remains unbroken across junctions and openings", "Insulation that provides continuous sound dampening"],
    correctAnswer: "Careful detailing to ensure insulation remains unbroken across junctions and openings",
    explanation: "Continuity insulation involves careful detailing to ensure insulation remains unbroken across junctions and openings. This eliminates thermal bridges where heat can bypass the insulation layer. In masonry construction, achieving continuity requires special attention at wall-floor junctions, around window and door openings, at roof eaves, and where internal walls meet external walls. Proper continuity may involve returning insulation along reveals, using proprietary insulated lintels, and specialized junction details to maintain the thermal barrier."
  },
  {
    id: 'bricklaying-l3-topic4-38',
    question: "What is 'interstitial condensation' and why is it a concern in highly insulated masonry walls?",
    options: ["Condensation that forms between rooms inside a building", "Condensation that occurs within the structure of the wall itself", "Condensation caused by air conditioning systems", "Condensation from high humidity interiors"],
    correctAnswer: "Condensation that occurs within the structure of the wall itself",
    explanation: "Interstitial condensation occurs within the wall structure itself when warm, moist air penetrates the wall and reaches a cold surface at or below dew point. It's a concern in highly insulated masonry walls because adding insulation creates steeper temperature gradients through the wall. Without proper vapor control, moisture can condense on cold surfaces within the wall, potentially causing unseen damage, reducing insulation effectiveness, and creating conditions for mold growth. Proper vapor control layers and consideration of the wall's hygrothermal behavior are essential in advanced insulated masonry design."
  },
  {
    id: 'bricklaying-l3-topic4-39',
    question: "What is 'thermal inertia' in relation to masonry construction?",
    options: ["The reluctance of masonry to begin warming up", "The measure of how quickly a wall conducts heat", "The resistance of masonry to cracking under thermal stress", "The ability of masonry to store heat and slow temperature fluctuations"],
    correctAnswer: "The ability of masonry to store heat and slow temperature fluctuations",
    explanation: "Thermal inertia is the ability of masonry to store heat and slow temperature fluctuations. The high thermal mass of brick and block walls means they absorb heat during warm periods and release it during cooler times, moderating internal temperature swings. In appropriate climates, this property can reduce energy consumption by dampening peak loads on HVAC systems. Effective use of thermal inertia requires consideration of insulation placement, with internal insulation reducing the benefit of thermal mass effect within the building."
  },
  {
    id: 'bricklaying-l3-topic4-40',
    question: "What is a 'hygroscopic buffer' in building physics?",
    options: ["A waterproof barrier that blocks all moisture", "A material that absorbs and releases moisture in response to relative humidity changes", "A chemical added to mortar to prevent water damage", "A gap that allows moisture to drain from a wall"],
    correctAnswer: "A material that absorbs and releases moisture in response to relative humidity changes",
    explanation: "A hygroscopic buffer is a material that absorbs and releases moisture in response to relative humidity changes. Materials like clay bricks, lime plaster, and some natural insulations act as buffers by absorbing excess moisture when humidity is high and releasing it when humidity drops. This property helps regulate internal humidity levels, potentially improving indoor air quality and reducing condensation risk. In breathable wall constructions, these materials contribute to moisture management without relying solely on vapor barriers."
  },
  {
    id: 'bricklaying-l3-topic4-41',
    question: "What is the 'stack effect' and how does it influence building design?",
    options: ["The visual effect of stacking bricks in different patterns", "The way bricks are stacked during delivery", "The vertical airflow caused by temperature differences between inside and outside air", "The stacking of floors in multi-story construction"],
    correctAnswer: "The vertical airflow caused by temperature differences between inside and outside air",
    explanation: "The stack effect is vertical airflow caused by temperature differences between inside and outside air. Warm air rises through buildings, creating pressure differences that draw in air at lower levels and expel it at higher levels. This natural phenomenon influences masonry design through careful air sealing to prevent unwanted heat loss, consideration of ventilation pathways, and detailing to prevent interstitial condensation where warm air might leak through the building envelope. In tall buildings, the stack effect is particularly significant and requires specific design responses."
  },
  {
    id: 'bricklaying-l3-topic4-42',
    question: "What is 'cold bridging' and how can it be addressed in masonry construction?",
    options: ["Building bridges in cold climates", "When cold outside temperatures affect masonry work", "Localized areas where heat flows more rapidly through the building envelope", "Using cold water in mortar mixing"],
    correctAnswer: "Localized areas where heat flows more rapidly through the building envelope",
    explanation: "Cold bridging refers to localized areas where heat flows more rapidly through the building envelope due to gaps in insulation or materials with higher thermal conductivity. In masonry, common bridges include steel lintels, window reveals, floor junctions, and wall ties. These can be addressed through thermally broken lintels, reveal insulation, careful junction detailing, and low-conductivity wall ties. Thermal imaging can identify cold bridges in existing buildings, while thermal modeling helps predict and prevent them in new designs."
  },
  {
    id: 'bricklaying-l3-topic4-43',
    question: "What is the significance of 'air changes per hour' (ACH) in building performance?",
    options: ["How often air conditioning systems cycle on and off", "A measure of building airtightness used in energy assessments", "How frequently air filters need changing", "The rate at which air circulates through a room"],
    correctAnswer: "A measure of building airtightness used in energy assessments",
    explanation: "Air changes per hour (ACH) is a measure of building airtightness used in energy assessments, typically measured at 50 Pascal pressure difference (ACH₅₀). Lower ACH values indicate better airtightness and typically lower energy consumption. Modern standards increasingly demand low air leakage - Passivhaus requires ≤0.6 ACH₅₀. In masonry construction, achieving good airtightness requires careful detailing at junctions, service penetrations, and openings, with a clear strategy for where the air barrier lies and how continuity is maintained."
  },
  {
    id: 'bricklaying-l3-topic4-44',
    question: "What is 'alkali-silica reaction' (ASR) in concrete masonry units?",
    options: ["A chemical process that strengthens concrete over time", "A reaction that gives concrete a silky finish", "A harmful reaction between alkalis in cement and silica in aggregates causing expansion and cracking", "A process that improves concrete's resistance to acids"],
    correctAnswer: "A harmful reaction between alkalis in cement and silica in aggregates causing expansion and cracking",
    explanation: "Alkali-silica reaction is a harmful reaction between alkalis in cement and silica in aggregates causing expansion and cracking. When moisture is present, alkalis react with certain siliceous aggregates to form a gel that absorbs water and expands, creating internal pressure and eventual cracking in concrete masonry units. ASR is controlled by using low-alkali cements, selecting non-reactive aggregates, incorporating specific admixtures like fly ash, or using air entrainment. Testing for potential reactivity is important when using new or unfamiliar aggregate sources."
  },
  {
    id: 'bricklaying-l3-topic4-45',
    question: "What is a 'rainscreen cavity' in modern masonry design?",
    options: ["A cavity filled with waterproof insulation", "A screen that prevents rain from hitting masonry during construction", "A ventilated space between the outer cladding and the inner weatherproof layer", "A cavity that collects rainwater for reuse"],
    correctAnswer: "A ventilated space between the outer cladding and the inner weatherproof layer",
    explanation: "A rainscreen cavity is a ventilated space between the outer cladding and inner weatherproof layer. In modern masonry design, this system acknowledges that some water will penetrate the outer brickwork but manages it through drainage and ventilation rather than attempting perfect weatherproofing. The cavity includes drainage paths, ventilation openings, and a moisture barrier on the inner leaf. This approach reduces the risk of trapped moisture, improves drying potential, and can extend the lifespan of both the cladding and supporting structure."
  },
  {
    id: 'bricklaying-l3-topic4-46',
    question: "What is a 'hygrothermal gradient' in wall design?",
    options: ["The rate at which humidity changes throughout the day", "The change in temperature and humidity through the cross-section of a wall", "The slope of a wall that optimizes water runoff", "The measurement of a wall's ability to resist water"],
    correctAnswer: "The change in temperature and humidity through the cross-section of a wall",
    explanation: "A hygrothermal gradient is the change in temperature and humidity through the cross-section of a wall. Understanding this gradient is crucial for preventing condensation within the wall structure. In highly insulated masonry walls, the temperature drop across the insulation layer creates conditions where water vapor moving through the wall might condense. Wall designs must consider this gradient, typically positioning materials with higher vapor resistance toward the warmer side of the insulation to prevent interstitial condensation while allowing appropriate drying potential."
  },
  {
    id: 'bricklaying-l3-topic4-47',
    question: "What is 'Passivation' in relation to steel components in masonry?",
    options: ["A process that makes steel completely inactive", "A treatment that improves steel's passive solar properties", "The formation of a protective oxide layer that prevents further corrosion", "A method of making steel bend more easily during installation"],
    correctAnswer: "The formation of a protective oxide layer that prevents further corrosion",
    explanation: "Passivation refers to the formation of a protective oxide layer that prevents further corrosion of steel components. In masonry, this applies to stainless steel wall ties, lintels, and reinforcement. The chromium in stainless steel creates a self-healing passive film when exposed to oxygen, protecting against corrosion even in the alkaline environment of mortar. This passive layer is what gives stainless steel its long-term durability in masonry construction, making it worth the higher initial cost compared to galvanized steel for critical structural components."
  },
  {
    id: 'bricklaying-l3-topic4-48',
    question: "What is a 'point thermal bridge' in building construction?",
    options: ["A technique for identifying the warmest point in a structure", "A localized thermal bridge that occurs at a specific point rather than along a line", "The critical temperature at which thermal bridging begins", "A point at which insulation must be doubled"],
    correctAnswer: "A localized thermal bridge that occurs at a specific point rather than along a line",
    explanation: "A point thermal bridge is a localized thermal bridge occurring at a specific point rather than along a line. Common examples in masonry include wall tie penetrations, fixings that penetrate insulation, and isolated structural elements that create heat flow paths. Unlike linear thermal bridges (at junctions), point bridges are calculated as chi-values (measured in W/K). Though individual point bridges may seem minor, their cumulative effect can significantly impact overall thermal performance. Solutions include minimizing penetrations, using thermally optimized fixings, and careful detailing where point bridges are unavoidable."
  },
  {
    id: 'bricklaying-l3-topic4-49',
    question: "What is 'carbon curing' in concrete masonry production?",
    options: ["Using charcoal to color concrete blocks", "Adding carbon fiber to strengthen concrete", "Curing concrete products with captured CO2 to reduce carbon footprint", "A traditional method of hardening concrete with coal dust"],
    correctAnswer: "Curing concrete products with captured CO2 to reduce carbon footprint",
    explanation: "Carbon curing is a process of curing concrete products with captured CO2 to reduce carbon footprint. This emerging technology injects CO2 into concrete during curing, where it reacts with calcium hydroxide to form calcium carbonate, permanently sequestering the carbon. For concrete masonry units, this process can reduce overall carbon footprint, improve strength development, and reduce curing time. The technology represents an innovative approach to reducing the environmental impact of masonry materials through carbon capture and utilization in the manufacturing process."
  },
  {
    id: 'bricklaying-l3-topic4-50',
    question: "What is 'Building Energy Modeling' (BEM) and how does it impact masonry design?",
    options: ["A method of measuring the energy stored in building materials", "Computer simulation to predict a building's energy use before construction", "A technique for modeling buildings to maximize solar gain", "A system for tracking actual energy use in completed buildings"],
    correctAnswer: "Computer simulation to predict a building's energy use before construction",
    explanation: "Building Energy Modeling is computer simulation that predicts a building's energy use before construction. For masonry design, BEM helps evaluate how wall assemblies affect overall building performance, allowing comparison of different insulation strategies, thermal mass effects, and building envelope details. This informs decisions about wall thickness, insulation type and placement, and thermal bridge mitigation. Increasingly sophisticated BEM can model dynamic performance through seasonal variations, helping optimize masonry designs for specific climates and operational patterns."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-advanced-building-technology', 'items', q.id), {
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