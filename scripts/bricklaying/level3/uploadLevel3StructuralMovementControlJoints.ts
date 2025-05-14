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

// ✅ Bricklaying Level 3 Structural Movement & Control Joints Questions
const questions = [
  {
    id: 'bricklaying-l3-topic6-1',
    question: "What is the primary purpose of movement joints in masonry construction?",
    options: ["To allow different tradespeople to work independently", "To create decorative features in brickwork", "To accommodate movement in the structure without causing damage", "To make future extensions easier"],
    correctAnswer: "To accommodate movement in the structure without causing damage",
    explanation: "Movement joints accommodate structural movement without causing damage. They create predetermined break points where movement can occur safely, preventing random cracking that would otherwise result from thermal expansion, moisture movement, settlement, or deflection. Properly designed movement joints allow the masonry to adjust to these natural forces while maintaining structural integrity and aesthetic appearance."
  },
  {
    id: 'bricklaying-l3-topic6-2',
    question: "What is 'thermal movement' in masonry walls?",
    options: ["The transfer of heat through walls", "The expansion and contraction of materials due to temperature changes", "The warming of bricks in sunlight", "The cooling effect of cavity insulation"],
    correctAnswer: "The expansion and contraction of materials due to temperature changes",
    explanation: "Thermal movement is the expansion and contraction of materials due to temperature changes. All building materials expand when heated and contract when cooled, though at different rates. In masonry, this movement can be significant – a 30-meter long clay brick wall might expand by 10-15mm between winter and summer. Without proper accommodation through movement joints, this expansion and contraction can cause cracking, bulging, or displacement."
  },
  {
    id: 'bricklaying-l3-topic6-3',
    question: "What is the typical maximum spacing for vertical movement joints in clay brick walls in the UK?",
    options: ["6-8 meters", "12-15 meters", "20-25 meters", "30-35 meters"],
    correctAnswer: "12-15 meters",
    explanation: "The typical maximum spacing for vertical movement joints in clay brick walls in the UK is 12-15 meters. This spacing accounts for the thermal and moisture movement characteristics of clay bricks. Joints may need to be closer in areas of significant movement stress, such as near corners or where walls change direction. This guidance is based on industry standards including those from the Brick Development Association and reflects practical experience in UK climate conditions."
  },
  {
    id: 'bricklaying-l3-topic6-4',
    question: "Where should movement joints typically be placed in a long masonry wall?",
    options: ["Only in the middle of the wall", "At regular intervals and at points of structural change or stress concentration", "Only at both ends", "Randomly throughout the structure"],
    correctAnswer: "At regular intervals and at points of structural change or stress concentration",
    explanation: "Movement joints should be placed at regular intervals and at points of structural change or stress concentration. These critical locations include wall corners, changes in wall height or thickness, alongside large openings, at junctions with other structural elements, and where different materials meet. Strategic placement at these positions accommodates movement where it's most likely to cause stress, while regular spacing along long walls prevents excessive movement accumulation between joints."
  },
  {
    id: 'bricklaying-l3-topic6-5',
    question: "What is 'irreversible moisture expansion' in clay brickwork?",
    options: ["Water damage that cannot be repaired", "The permanent slight expansion of clay bricks due to absorption of moisture from the atmosphere", "Dampness that cannot be removed", "Expansion of mortar when it gets wet"],
    correctAnswer: "The permanent slight expansion of clay bricks due to absorption of moisture from the atmosphere",
    explanation: "Irreversible moisture expansion is the permanent slight expansion of clay bricks due to absorption of atmospheric moisture. This chemical reaction between the fired clay and ambient moisture causes a small but significant increase in brick dimensions that continues throughout the material's life, though most occurs in the first few months after firing. Unlike reversible moisture movements, this expansion doesn't reverse with drying and must be accommodated in the design of movement joints."
  },
  {
    id: 'bricklaying-l3-topic6-6',
    question: "What is the function of compressible filler in a movement joint?",
    options: ["To strengthen the joint", "To provide a base for sealant and allow compression as the joint closes", "To keep the joint waterproof", "To make the joint more visible"],
    correctAnswer: "To provide a base for sealant and allow compression as the joint closes",
    explanation: "Compressible filler provides a base for sealant and allows compression as the joint closes. Typically made of closed-cell polyethylene foam or similar materials, it creates a backStop against which sealant can be applied while remaining flexible enough to compress when thermal expansion pushes joint faces together. The filler prevents three-sided adhesion of the sealant, allowing proper elongation and compression while maintaining the joint's ability to accommodate movement."
  },
  {
    id: 'bricklaying-l3-topic6-7',
    question: "Why are movement joints in concrete blockwork typically spaced closer than in clay brickwork?",
    options: ["Concrete blocks are less expensive", "Concrete blocks have greater shrinkage potential than clay bricks", "Concrete blocks are usually larger units", "Concrete blocks have lower structural strength"],
    correctAnswer: "Concrete blocks have greater shrinkage potential than clay bricks",
    explanation: "Movement joints in concrete blockwork are typically spaced closer than in clay brickwork because concrete blocks have greater shrinkage potential. While clay bricks tend to expand slightly over time, concrete blocks typically shrink as they cure and dry. This shrinkage can be significant and continues over several months. Industry guidance generally recommends movement joints at 6-9 meter intervals for concrete blockwork, compared to 12-15 meters for clay brickwork."
  },
  {
    id: 'bricklaying-l3-topic6-8',
    question: "What is a 'sliding anchor' in masonry movement control?",
    options: ["A type of foundation that can move", "A wall tie that allows vertical movement while maintaining lateral restraint", "A tool used to test wall movement", "A mechanism for adjusting scaffolding"],
    correctAnswer: "A wall tie that allows vertical movement while maintaining lateral restraint",
    explanation: "A sliding anchor is a wall tie that allows vertical movement while maintaining lateral restraint. These specialized ties have a slot that permits vertical movement between leaves of masonry or between masonry and frame, accommodating differential movement. The tie still transfers lateral loads between elements, maintaining structural integrity while preventing stress from differential vertical movement that could cause cracking or displacement."
  },
  {
    id: 'bricklaying-l3-topic6-9',
    question: "What is 'carbonation shrinkage' in concrete blocks?",
    options: ["The erosion of blocks by carbon dioxide", "Compression due to carbon fiber reinforcement", "Shrinkage caused by the reaction of cement with atmospheric carbon dioxide", "A reduction in blocks' carbon footprint over time"],
    correctAnswer: "Shrinkage caused by the reaction of cement with atmospheric carbon dioxide",
    explanation: "Carbonation shrinkage is shrinkage caused by the reaction of cement with atmospheric carbon dioxide. This chemical process, where cement compounds react with CO₂ to form calcium carbonate, causes a reduction in volume. In concrete blocks, carbonation shrinkage is one of several shrinkage mechanisms that continue long after manufacturing. It's particularly significant in calcium silicate bricks and contributes to the greater movement joint requirements in concrete masonry compared to clay."
  },
  {
    id: 'bricklaying-l3-topic6-10',
    question: "What can happen if movement joints are not provided in long masonry walls?",
    options: ["Nothing significant, they're mostly cosmetic", "The wall will expand upward only", "Cracking, distortion, or displacement of the masonry", "The mortar will change color"],
    correctAnswer: "Cracking, distortion, or displacement of the masonry",
    explanation: "Without movement joints in long masonry walls, cracking, distortion, or displacement of the masonry can occur. As walls expand and contract with temperature changes or moisture movement, stresses build up without a designated relief point. This eventually leads to failure at the weakest points, typically resulting in diagonal cracks, bulging, crushing at abutments with rigid structures, or displacement of sections. These failures compromise both structural integrity and weather resistance."
  },
  {
    id: 'bricklaying-l3-topic6-11',
    question: "What is the typical expansion coefficient of clay brickwork?",
    options: ["0.5-1.0 mm/m/100°C", "4-8 mm/m/100°C", "10-15 mm/m/100°C", "20-25 mm/m/100°C"],
    correctAnswer: "4-8 mm/m/100°C",
    explanation: "The typical expansion coefficient of clay brickwork is 4-8 mm/m/100°C. This means for every meter length and every 100°C temperature increase, the brickwork will expand by 4-8mm. In practical terms, considering typical UK temperature fluctuations, this might mean expansion of approximately 5mm over a 10-meter wall length between seasonal extremes. This coefficient varies depending on the specific clay and firing process, with engineering bricks typically having different values than facing bricks."
  },
  {
    id: 'bricklaying-l3-topic6-12',
    question: "What is a 'bed joint reinforcement' and how does it relate to movement control?",
    options: ["Extra mortar in horizontal joints", "Steel mesh or bars embedded in horizontal mortar joints to control cracking", "A type of movement joint in the beds", "A foundation reinforcement technique"],
    correctAnswer: "Steel mesh or bars embedded in horizontal mortar joints to control cracking",
    explanation: "Bed joint reinforcement is steel mesh or bars embedded in horizontal mortar joints to control cracking. While not replacing movement joints, it helps distribute movement stresses over larger areas, minimizing visible cracking between planned movement joints. Typically placed in specific courses (like every 3rd course in vulnerable areas), this reinforcement is particularly useful around openings, at changes in wall thickness, and in locations with concentrated stress."
  },
  {
    id: 'bricklaying-l3-topic6-13',
    question: "Why should movement joints extend through the full thickness of walls including any renders or finishes?",
    options: ["To make the joints more visible", "To save on construction materials", "To ensure that movement can occur without restraint and prevent cracking in finishes", "Movement joints only need to go through the brick, not finishes"],
    correctAnswer: "To ensure that movement can occur without restraint and prevent cracking in finishes",
    explanation: "Movement joints should extend through the full thickness of walls and all finishes to ensure movement can occur without restraint and prevent cracking in finishes. If renders, plasters, or other finishes bridge across a movement joint, they will restrict the intended movement and likely crack in an uncontrolled manner. Proper joint design includes continuous separation through all layers with appropriate treatment (flexible sealants, cover strips, etc.) at each surface."
  },
  {
    id: 'bricklaying-l3-topic6-14',
    question: "What is 'differential movement' in building structures?",
    options: ["When different structural elements move by different amounts or in different ways", "When movement varies throughout the day", "When the building moves differently than the ground", "When one side of a building moves differently than the other"],
    correctAnswer: "When different structural elements move by different amounts or in different ways",
    explanation: "Differential movement occurs when different structural elements move by different amounts or in different ways. This commonly happens between dissimilar materials (like masonry and concrete frame), between elements experiencing different temperature conditions (like an external wall and internal column), or between components carrying different loads. Movement joints and flexible connections are essential at these interfaces to accommodate the differences without causing damage."
  },
  {
    id: 'bricklaying-l3-topic6-15',
    question: "What is typically used to seal the outer face of a movement joint?",
    options: ["Cement mortar", "Flexible sealant that can accommodate movement", "Rigid plastic strip", "Another layer of bricks"],
    correctAnswer: "Flexible sealant that can accommodate movement",
    explanation: "Flexible sealant that can accommodate movement is typically used to seal the outer face of movement joints. These elastic materials (such as polysulfide, polyurethane, or silicone sealants) can stretch and compress as the joint width changes while maintaining a weathertight seal. The sealant must adhere to the joint faces, have appropriate movement capability for the expected range, and resist weathering and UV degradation for long-term performance."
  },
  {
    id: 'bricklaying-l3-topic6-16',
    question: "Where should movement joints typically be positioned relative to openings in a masonry wall?",
    options: ["Directly through the center of windows or doors", "Movement joints shouldn't be near openings", "Adjacent to openings where possible, particularly at points of stress concentration", "Only below openings, never above"],
    correctAnswer: "Adjacent to openings where possible, particularly at points of stress concentration",
    explanation: "Movement joints should be positioned adjacent to openings where possible, particularly at points of stress concentration. Openings create weak points and stress concentrations in masonry walls, making them natural locations for movement and potential cracking. Placing joints near the corners of windows and doors takes advantage of these natural stress points. This positioning is more effective than mid-span placement and helps disguise the joint aesthetically by aligning it with an existing visual break in the wall."
  },
  {
    id: 'bricklaying-l3-topic6-17',
    question: "What is 'foundation settlement' and how does it affect masonry structures?",
    options: ["The financial arrangement for paying for foundations", "The process of compacting foundation materials", "Vertical movement of foundations due to soil compression under load", "The time taken for foundations to dry completely"],
    correctAnswer: "Vertical movement of foundations due to soil compression under load",
    explanation: "Foundation settlement is vertical movement of foundations due to soil compression under load. All buildings experience some settlement as the weight compresses underlying soil, but problems arise when settlement is excessive or differential (uneven). In masonry structures, which are relatively rigid, differential settlement can cause step cracks, distortion of openings, and structural damage. Movement joints and flexible details at key locations help accommodate some settlement without damage."
  },
  {
    id: 'bricklaying-l3-topic6-18',
    question: "What is a 'slip plane' in masonry construction?",
    options: ["A slippery surface that is a safety hazard", "A layer that allows horizontal movement between two parts of a structure", "A plane where bricks might slip out of position", "The surface where mortar is applied"],
    correctAnswer: "A layer that allows horizontal movement between two parts of a structure",
    explanation: "A slip plane is a layer that allows horizontal movement between two parts of a structure. Typically created using materials with low friction coefficients (like polythene sheets or bitumen-coated materials) placed between building elements, slip planes permit sliding movement while still transferring vertical loads. They're commonly used at the tops of walls where they meet roof structures, at shelf angles supporting brickwork, or between elements expected to experience differential horizontal movement."
  },
  {
    id: 'bricklaying-l3-topic6-19',
    question: "What type of movement joint is typically required where new masonry meets existing construction?",
    options: ["No joint is required at this junction", "A temporary joint only", "A vertical movement joint", "A horizontal slip joint"],
    correctAnswer: "A vertical movement joint",
    explanation: "A vertical movement joint is typically required where new masonry meets existing construction. This accommodates differential movement between the new work (which will undergo initial settlement and moisture movements) and the existing structure (which has already experienced these initial movements). Without this joint, stresses from the different movement characteristics would likely cause cracking or distortion at the junction. The joint width and details depend on the specific materials and conditions involved."
  },
  {
    id: 'bricklaying-l3-topic6-20',
    question: "How are movement joints typically formed in brick-faced reinforced concrete?",
    options: ["By leaving gaps in the concrete", "By creating a continuous vertical joint through both the concrete and brickwork", "Movement joints are not required in this type of construction", "By using flexible concrete only"],
    correctAnswer: "By creating a continuous vertical joint through both the concrete and brickwork",
    explanation: "Movement joints in brick-faced reinforced concrete are formed by creating a continuous vertical joint through both the concrete and brickwork. The joint must align in both materials to function properly. This typically involves casting a rebate or chase in the concrete during construction, which is then maintained as a clear gap when the brick facing is applied. Proper detailing includes compressible fillers, appropriate ties allowing movement, and flexible weatherproof sealing at the external face."
  },
  {
    id: 'bricklaying-l3-topic6-21',
    question: "What is the purpose of 'debonding' one side of a movement joint during construction?",
    options: ["To weaken the structure", "To allow moisture penetration", "To create a clean, straight joint with proper spacing", "It serves no practical purpose"],
    correctAnswer: "To create a clean, straight joint with proper spacing",
    explanation: "Debonding one side of a movement joint during construction creates a clean, straight joint with proper spacing. This technique involves applying a bond-breaking material (like a polyethylene strip) to the face of the completed section before building the adjacent masonry. This prevents mortar adhesion and ensures the specified joint width is maintained. The resulting clean, straight joint allows proper installation of compressible fillers and sealants, ensuring the joint functions as intended."
  },
  {
    id: 'bricklaying-l3-topic6-22',
    question: "What is a 'shelf angle' and how does it relate to movement control?",
    options: ["A special angle tool used by bricklayers", "An angled shelf inside the cavity", "A steel angle supporting masonry cladding that incorporates movement allowance", "A sloped mortar joint"],
    correctAnswer: "A steel angle supporting masonry cladding that incorporates movement allowance",
    explanation: "A shelf angle is a steel angle supporting masonry cladding that incorporates movement allowance. Typically attached to the primary structure, it provides support for masonry (often at floor levels) while accommodating differential movement between the frame and cladding. Proper movement details include vertical movement joints below the angle, properly sized gaps between angle sections to allow thermal expansion, and slotted connections to the structure that permit some movement."
  },
  {
    id: 'bricklaying-l3-topic6-23',
    question: "What is the purpose of 'soft joints' where masonry meets rigid structural elements?",
    options: ["To create a less visible joint", "To allow the wall to be disassembled later", "To absorb sound transmission", "To accommodate differential movement between the materials"],
    correctAnswer: "To accommodate differential movement between the materials",
    explanation: "Soft joints accommodate differential movement between masonry and rigid structural elements like concrete columns or steel frames. These flexible joints typically use compressible materials or sealants to allow movement while maintaining weather resistance. Without soft joints at these material interfaces, the different movement characteristics (thermal, moisture, deflection) would cause stress concentrations, resulting in cracking or crushing of the masonry where it meets the less flexible element."
  },
  {
    id: 'bricklaying-l3-topic6-24',
    question: "Why might calcium silicate bricks require different movement joint spacing than clay bricks?",
    options: ["They are usually a different color", "They have different movement characteristics, typically exhibiting shrinkage rather than expansion", "They are more expensive and require less maintenance", "They are only used for interior walls"],
    correctAnswer: "They have different movement characteristics, typically exhibiting shrinkage rather than expansion",
    explanation: "Calcium silicate bricks require different movement joint spacing than clay bricks because they have different movement characteristics, typically exhibiting shrinkage rather than expansion. While clay bricks generally expand slightly over time, calcium silicate bricks tend to shrink due to carbonation and drying. Industry guidance typically recommends closer spacing of movement joints in calcium silicate brickwork (around 7.5-9 meters) compared to clay brickwork (12-15 meters)."
  },
  {
    id: 'bricklaying-l3-topic6-25',
    question: "What is a 'movement joint schedule' in construction documentation?",
    options: ["A timeline for when joints will move", "A document specifying the locations, types, and details of all movement joints in a project", "A maintenance schedule for checking joints", "A record of which joints have already moved"],
    correctAnswer: "A document specifying the locations, types, and details of all movement joints in a project",
    explanation: "A movement joint schedule is a document specifying the locations, types, and details of all movement joints in a project. This comprehensive reference typically includes plan references showing joint positions, joint widths, construction details, sealant specifications, and any special requirements. The schedule ensures all movement accommodation is coordinated across design documents and construction teams, preventing omissions or inconsistencies that could lead to movement-related failures."
  },
  {
    id: 'bricklaying-l3-topic6-26',
    question: "What is 'restraint cracking' in masonry walls?",
    options: ["Cracking due to excessive physical impact", "Cracking due to poor quality restraint ties", "Cracking caused when natural masonry movement is prevented by rigid restraints", "A technique for deliberately creating cracks for aesthetic purposes"],
    correctAnswer: "Cracking caused when natural masonry movement is prevented by rigid restraints",
    explanation: "Restraint cracking is caused when natural masonry movement is prevented by rigid restraints. When masonry attempts to expand or contract due to temperature or moisture changes but is prevented from moving by rigid connections to other elements, stresses build up until cracking occurs. Common locations include where walls meet rigid concrete frames, at stiff corner junctions, or where walls are rigidly connected to foundations. Proper movement joints, flexible connections, and slip planes help prevent restraint cracking."
  },
  {
    id: 'bricklaying-l3-topic6-27',
    question: "What is the purpose of 'articulation joints' in masonry?",
    options: ["To allow walls to be folded", "To create a point where the building can bend during earthquakes", "Control joints that divide large masonry elements into smaller panels to control cracking", "Joints that make a clicking sound when they move"],
    correctAnswer: "Control joints that divide large masonry elements into smaller panels to control cracking",
    explanation: "Articulation joints are control joints that divide large masonry elements into smaller panels to control cracking. While similar to movement joints, articulation joints specifically focus on creating intentional weak planes where movement stresses can be relieved in a controlled manner. They effectively break a large expanse of masonry into smaller, more stable panels, each able to move slightly independently. This reduces the buildup of stresses that might otherwise cause random cracking across the masonry."
  },
  {
    id: 'bricklaying-l3-topic6-28',
    question: "What is a 'flexible anchor' in masonry movement control?",
    options: ["An anchor that can bend without breaking", "An anchor that can be easily removed", "A connection that accommodates movement while providing support", "An anchor made of rubber"],
    correctAnswer: "A connection that accommodates movement while providing support",
    explanation: "A flexible anchor is a connection that accommodates movement while providing support. These specialized fixings allow controlled movement in specific directions while still transferring loads and providing restraint in other directions. Examples include slotted channels, flexible wall ties, and spring-loaded anchors. They're used in locations where complete separation (a movement joint) isn't appropriate, but some differential movement between connected elements must be accommodated to prevent damage."
  },
  {
    id: 'bricklaying-l3-topic6-29',
    question: "Where would 'cavity wall movement ties' typically be used?",
    options: ["Only at the top of walls", "Across movement joints in cavity walls to maintain lateral stability while allowing in-plane movement", "To tie cavity walls to foundations", "Inside the cavity to hold insulation in place"],
    correctAnswer: "Across movement joints in cavity walls to maintain lateral stability while allowing in-plane movement",
    explanation: "Cavity wall movement ties are used across movement joints in cavity walls to maintain lateral stability while allowing in-plane movement. These specialized ties bridge the joint but incorporate features like slots or flexible sections that permit the joint to open and close. They ensure the separate sections of masonry on either side of the joint remain tied together for lateral stability (preventing outward collapse) while allowing the intended vertical movement at the joint."
  },
  {
    id: 'bricklaying-l3-topic6-30',
    question: "What is 'creep' in the context of structural movement?",
    options: ["The gradual movement of bricklayers across a site", "The slow growth of moss on masonry", "The gradual deformation of materials under sustained load", "A type of foundation movement"],
    correctAnswer: "The gradual deformation of materials under sustained load",
    explanation: "Creep is the gradual deformation of materials under sustained load. In construction, it refers to the tendency of certain materials to slowly deform (strain) over time even under constant stress. Concrete and masonry structures experience creep, which can cause long-term deflection in beams and slabs. Movement accommodation in masonry must consider not just initial movements but this ongoing, time-dependent deformation, particularly where masonry interfaces with structural frames that may experience significant creep."
  },
  {
    id: 'bricklaying-l3-topic6-31',
    question: "What is 'subsidence' and how does it affect masonry structures?",
    options: ["The gradual sinking of a building due to ground movement or soil compression", "A type of foundation designed to move", "The expansion of clay soil", "A technique for lowering buildings"],
    correctAnswer: "The gradual sinking of a building due to ground movement or soil compression",
    explanation: "Subsidence is the gradual sinking of a building due to ground movement or soil compression. Unlike normal settlement, subsidence often involves uneven movement caused by factors like mining activity, drought shrinkage of clay soils, or washout from leaking drains. In masonry structures, subsidence typically causes diagonal cracking, distorted openings, and separation at joints. While normal settlement can be accommodated in design, significant subsidence usually requires foundation remediation."
  },
  {
    id: 'bricklaying-l3-topic6-32',
    question: "What type of movement joint is required at the junction of a masonry wall and concrete frame?",
    options: ["No joint is required at this junction", "A filled joint with rigid mortar", "A movement joint that allows for differential movement between the materials", "A joint filled with standard mortar"],
    correctAnswer: "A movement joint that allows for differential movement between the materials",
    explanation: "At the junction of masonry wall and concrete frame, a movement joint that allows for differential movement between the materials is required. The concrete frame and masonry have different movement characteristics – the concrete experiences creep and shrinkage while masonry may expand or contract with temperature and moisture changes. This joint typically includes compressible fillers, flexible anchors that maintain position while allowing movement, and suitable weatherproofing details at exposed faces."
  },
  {
    id: 'bricklaying-l3-topic6-33',
    question: "What is 'sulfate attack' and how does it relate to structural movement?",
    options: ["A chemical assault on brickwork from acid rain", "Erosion of mortar by sulfuric acid in industrial areas", "Expansion and deterioration of mortar due to chemical reaction with sulfates", "A method for removing sulfate-based staining"],
    correctAnswer: "Expansion and deterioration of mortar due to chemical reaction with sulfates",
    explanation: "Sulfate attack is expansion and deterioration of mortar due to chemical reaction with sulfates. When soluble sulfates (from soil, groundwater, or the masonry units themselves) react with components in cement-based mortars, the resulting compounds expand. This expansion can cause cracking, spalling, and progressive deterioration of mortar joints. While not a typical movement that joints are designed for, this chemical expansion can create stresses that affect the performance of movement joints or create additional movement needs."
  },
  {
    id: 'bricklaying-l3-topic6-34',
    question: "What is a 'damp-proof course' (DPC) used for in relation to movement control?",
    options: ["Only to prevent moisture rising into the wall", "As a slip plane to accommodate horizontal movement while still transferring vertical loads", "To control rainwater", "To prevent movement entirely"],
    correctAnswer: "As a slip plane to accommodate horizontal movement while still transferring vertical loads",
    explanation: "In relation to movement control, a damp-proof course can function as a slip plane to accommodate horizontal movement while still transferring vertical loads. Beyond its primary moisture-control purpose, the low-friction surface of materials like polyethylene or bitumen DPCs allows some horizontal sliding movement between the masonry above and below. This characteristic is particularly useful at the base of walls or where horizontal movement needs to be accommodated without compromising vertical load transfer."
  },
  {
    id: 'bricklaying-l3-topic6-35',
    question: "What is a 'compression seal' in movement joints?",
    options: ["A seal designed to prevent compression", "A preformed flexible strip that is compressed into the joint and provides weather protection", "A type of mortar with high compressive strength", "A seal that compresses the bricks together"],
    correctAnswer: "A preformed flexible strip that is compressed into the joint and provides weather protection",
    explanation: "A compression seal is a preformed flexible strip that is compressed into the joint and provides weather protection. Made from materials like neoprene or EPDM, these seals work by being inserted into the joint under compression (typically installed at 25-30% compression). Their elasticity creates constant pressure against the joint faces, maintaining a weathertight seal as the joint width changes. They're particularly effective for joints with moderate movement and provide good durability with minimal maintenance."
  },
  {
    id: 'bricklaying-l3-topic6-36',
    question: "What is the primary difference between an expansion joint and a control joint?",
    options: ["There is no difference; the terms are interchangeable", "Expansion joints accommodate growth while control joints only handle shrinkage", "Expansion joints are wider than control joints", "Expansion joints are horizontal while control joints are vertical"],
    correctAnswer: "Expansion joints accommodate growth while control joints only handle shrinkage",
    explanation: "The primary difference is that expansion joints accommodate growth while control joints only handle shrinkage. Expansion joints are complete separations through the structure, designed to close up as materials expand. Control joints, however, are planned weakened sections (often formed by creating a thin plane in the masonry) that direct where cracking will occur due to shrinkage forces, but don't necessarily provide for expansion. Control joints are common in concrete masonry, which primarily experiences shrinkage rather than expansion over time."
  },
  {
    id: 'bricklaying-l3-topic6-37',
    question: "What is 'contraction' in masonry walls and how does it differ from thermal movement?",
    options: ["Contraction is only vertical shrinkage; thermal movement can be in any direction", "Contraction is the natural shrinkage of materials as they age and cure, while thermal movement is related to temperature changes", "Contraction only happens in winter; thermal movement happens year-round", "There is no difference; they're the same thing"],
    correctAnswer: "Contraction is the natural shrinkage of materials as they age and cure, while thermal movement is related to temperature changes",
    explanation: "Contraction is the natural shrinkage of materials as they age and cure, while thermal movement is related to temperature changes. Material contraction, prominent in concrete products, is largely irreversible and occurs as cement hydrates and dries. Thermal movement, conversely, is cyclical – expanding in heat and contracting in cold. Movement joints must accommodate both types, but contraction is particularly important when designing joints for new concrete masonry, which will experience significant initial shrinkage."
  },
  {
    id: 'bricklaying-l3-topic6-38',
    question: "What is a 'day work joint' and how does it relate to movement control?",
    options: ["A joint created between work done on different days", "A joint designed to be built in a single day", "A temporary movement joint that will be filled later", "A joint that only moves during daylight hours"],
    correctAnswer: "A joint created between work done on different days",
    explanation: "A day work joint is created between work done on different days. While primarily a construction convenience, these joints can affect movement behavior if not properly executed. Poorly bonded day work joints may become unintended movement planes, leading to cracking along these lines. Conversely, well-executed toothing or proper keying at day work joints ensures structural continuity. In some cases, planned movement joints might be coordinated with day work breaks for construction efficiency."
  },
  {
    id: 'bricklaying-l3-topic6-39',
    question: "What is 'moisture movement' in masonry?",
    options: ["The flow of water through masonry", "Movement of masonry due to changing moisture content", "The technique of moving masonry using water lubrication", "The rate at which masonry dries after construction"],
    correctAnswer: "Movement of masonry due to changing moisture content",
    explanation: "Moisture movement is the movement of masonry due to changing moisture content. Most masonry materials expand slightly when they absorb moisture and contract when they dry. In clay bricks, this is in addition to irreversible moisture expansion. Concrete and calcium silicate products typically experience reversible moisture movement plus initial drying shrinkage. Movement joints must accommodate these dimensional changes to prevent cracking, particularly in climates with significant wet/dry cycling."
  },
  {
    id: 'bricklaying-l3-topic6-40',
    question: "What is a 'bound movement joint' in masonry construction?",
    options: ["A joint tied with string", "A joint with mechanical key and reinforcement crossing it", "A joint that cannot move", "A joint bound by contract requirements"],
    correctAnswer: "A joint with mechanical key and reinforcement crossing it",
    explanation: "A bound movement joint has a mechanical key and reinforcement crossing it. Unlike complete separation joints, bound joints maintain some structural continuity across the joint through interlocking keys or reinforcement, while still allowing limited movement. They provide somewhat restricted movement capability but maintain greater structural integrity. This joint type is useful in situations requiring some movement accommodation while maintaining stronger structural connection than would be possible with a complete separation joint."
  },
  {
    id: 'bricklaying-l3-topic6-41',
    question: "What is the purpose of 'debonded sleeves' around reinforcement crossing movement joints?",
    options: ["To strengthen the reinforcement", "To make the reinforcement more visible", "To allow the reinforcement to slide through the joint without restricting movement", "To protect reinforcement from moisture"],
    correctAnswer: "To allow the reinforcement to slide through the joint without restricting movement",
    explanation: "Debonded sleeves allow reinforcement to slide through the joint without restricting movement. When reinforcement must cross movement joints (for structural reasons), it's enclosed in a smooth sleeve that prevents bond with the surrounding masonry. This permits the reinforcement to slide back and forth within the sleeve as the joint opens and closes, maintaining structural continuity without preventing the intended movement. Without sleeves, reinforcement would bond to masonry on both sides, restraining movement and defeating the joint's purpose."
  },
  {
    id: 'bricklaying-l3-topic6-42',
    question: "How do 'coping stones' on freestanding walls relate to movement control?",
    options: ["They are too heavy to move", "They require their own movement joints to accommodate wall movement", "They prevent all movement in the wall", "Movement is not a consideration for coping stones"],
    correctAnswer: "They require their own movement joints to accommodate wall movement",
    explanation: "Coping stones require their own movement joints to accommodate wall movement. Since freestanding walls experience significant thermal and moisture movement, the rigid coping stones on top must include appropriately spaced movement joints aligned with those in the wall below. Without these joints, differential movement between coping and wall can cause displacement, cracking, or failure of the coping stones. Properly designed coping movement joints include flexible sealant and often a concealed metal support system."
  },
  {
    id: 'bricklaying-l3-topic6-43',
    question: "What is 'horizontal restraint cracking' in masonry walls?",
    options: ["Cracking caused by horizontal earthquake forces", "Cracking in bed joints caused by excessive vertical loads", "Horizontal cracking where walls are restrained against vertical movement", "Cracking in horizontal reinforcement"],
    correctAnswer: "Horizontal cracking where walls are restrained against vertical movement",
    explanation: "Horizontal restraint cracking occurs where walls are restrained against vertical movement. This typically appears as horizontal cracks along mortar beds near the restraint point. Common locations include where masonry walls meet rigid concrete soffits or structural frames that prevent natural vertical expansion of the brickwork. Prevention involves proper vertical movement joints or compressible materials at these junctions, allowing the masonry to move without building up stresses that lead to cracking."
  },
  {
    id: 'bricklaying-l3-topic6-44',
    question: "What is a 'continuity bond' in relation to movement joints?",
    options: ["A financial guarantee for continuous work", "A requirement that all bricks be continuously bonded", "Reinforcement that crosses movement joints to maintain structural continuity while allowing movement", "A special mortar mix"],
    correctAnswer: "Reinforcement that crosses movement joints to maintain structural continuity while allowing movement",
    explanation: "A continuity bond is reinforcement that crosses movement joints to maintain structural continuity while allowing movement. This typically involves reinforcement bars or mesh that extends across the joint but includes debonded sections (sleeves) at the joint location. The reinforcement maintains structural integrity and load transfer capabilities while the debonded portion allows the joint to open and close with building movement. This approach is used where complete separation would compromise structural performance but movement accommodation remains necessary."
  },
  {
    id: 'bricklaying-l3-topic6-45',
    question: "What is 'arching action' in relation to masonry movement?",
    options: ["The formation of arch shapes in brickwork", "The tendency of restrained masonry to bow outward when attempting to expand", "A construction technique for building arches", "The movement pattern of arch structures"],
    correctAnswer: "The tendency of restrained masonry to bow outward when attempting to expand",
    explanation: "Arching action is the tendency of restrained masonry to bow outward when attempting to expand. When a masonry wall is prevented from expanding horizontally at its ends (e.g., by rigid restraints), the expansion forces cause the wall to bow outward in the middle, similar to an arch under compression. This action can lead to significant lateral displacement and even collapse in severe cases. Proper movement joints at appropriate intervals prevent excessive arching action by accommodating expansion safely."
  },
  {
    id: 'bricklaying-l3-topic6-46',
    question: "What is the role of 'cover strips' in movement joint design?",
    options: ["To hide movement joints from view", "To cover reinforcement in the joint", "To provide aesthetic cover while allowing joint movement", "To protect joint fillers from UV damage"],
    correctAnswer: "To provide aesthetic cover while allowing joint movement",
    explanation: "Cover strips provide aesthetic cover while allowing joint movement. Typically made of metal, plastic, or elastomeric materials, these strips span across movement joints to conceal the gap while flexing or sliding to accommodate movement. They're commonly used in interior applications or where the appearance of an open joint would be objectionable. Proper installation ensures the cover strip is fixed to only one side of the joint, allowing it to slide over or flex with the underlying movement."
  },
  {
    id: 'bricklaying-l3-topic6-47',
    question: "How does the building's height affect movement joint requirements in masonry cladding?",
    options: ["Height has no effect on movement requirements", "Taller buildings require fewer movement joints", "Taller buildings generally require more frequent horizontal movement joints", "Movement joints are only needed at ground level"],
    correctAnswer: "Taller buildings generally require more frequent horizontal movement joints",
    explanation: "Taller buildings generally require more frequent horizontal movement joints in masonry cladding. With increased height comes greater differential movement between the structural frame and the masonry, more significant thermal gradients, and increased exposure to elements. Horizontal movement joints (often at floor levels) become particularly important to accommodate differential movement between the frame and cladding. Industry guidance typically recommends horizontal movement joints at every floor or alternate floor level in taller buildings."
  },
  {
    id: 'bricklaying-l3-topic6-48',
    question: "What is 'creep deflection' in structural frames and how does it affect attached masonry?",
    options: ["The slow downward movement of masonry over time", "Gradual lowering of a structural frame under sustained load that can cause stress in attached masonry", "A special deflection calculation method", "A type of foundation settlement"],
    correctAnswer: "Gradual lowering of a structural frame under sustained load that can cause stress in attached masonry",
    explanation: "Creep deflection is the gradual lowering of a structural frame under sustained load. Concrete and composite structures continue to deflect over time due to creep, beyond their initial elastic deflection. This progressive movement can cause significant stress in attached masonry, which is less flexible. Without proper accommodation through movement joints, sliding supports, or flexible connections, the masonry may crack or become load-bearing when not designed to be. Movement provisions must account for both initial and long-term creep deflection."
  },
  {
    id: 'bricklaying-l3-topic6-49',
    question: "What is the purpose of 'castellated bed joint reinforcement' in masonry movement control?",
    options: ["To create a castle-like appearance", "To allow vertical movement while controlling cracking", "To completely prevent all movement", "To strengthen the foundation only"],
    correctAnswer: "To allow vertical movement while controlling cracking",
    explanation: "Castellated bed joint reinforcement allows vertical movement while controlling cracking. The zigzag or castle-like pattern creates expansion capacity within the reinforcement itself. Unlike straight reinforcement that might restrain movement and cause cracking, castellated reinforcement can extend slightly under tension. It's particularly useful in long walls where complete movement joints are impractical or too widely spaced, helping distribute inevitable movement stresses to prevent concentrated cracking while still allowing some controlled movement."
  },
  {
    id: 'bricklaying-l3-topic6-50',
    question: "What is 'movement joint mapping' in construction planning?",
    options: ["Creating a physical map of the construction site", "Drawing arrows showing how a building will move", "A comprehensive plan showing the position, type and details of all movement joints", "A technique for measuring existing movement"],
    correctAnswer: "A comprehensive plan showing the position, type and details of all movement joints",
    explanation: "Movement joint mapping is a comprehensive plan showing the position, type, and details of all movement joints. This critical construction planning document identifies every required movement joint on plans and elevations, specifying their width, treatment, and construction details. Proper mapping ensures joints are correctly positioned relative to structural elements, openings, and each other, creating a coordinated system of movement accommodation. This planning prevents omissions or inconsistencies that could lead to movement-related failures."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'bricklaying-l3-structural-movement', 'items', q.id), {
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
  
  uploadQuestions();
  