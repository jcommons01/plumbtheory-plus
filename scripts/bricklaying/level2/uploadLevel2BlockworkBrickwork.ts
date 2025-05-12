// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2BlockworkBrickwork.ts

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

// ✅ Bricklaying Level 2 Blockwork, Brickwork & Cavity Walls Questions
const questions = [
  {
    id: 'bricklaying-l2-blockwork-cavity1',
    question: "What is the main purpose of a cavity wall construction?",
    options: ["To reduce the amount of materials used", "To make walls more decorative", "To provide thermal insulation and prevent moisture penetration", "To simplify the construction process"],
    correctAnswer: "To provide thermal insulation and prevent moisture penetration",
    explanation: "The main purpose of cavity wall construction is to provide thermal insulation and prevent moisture penetration. The air gap between the inner and outer leaves acts as a thermal barrier, reducing heat transfer through the wall. Any water that penetrates the outer leaf runs down the inside face of that leaf and is directed out of the building via weep holes. Modern cavity walls typically incorporate additional insulation materials within the cavity to further improve thermal performance while maintaining the moisture control benefits."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity2',
    question: "In cavity wall construction, what is the primary purpose of wall ties?",
    options: ["To prevent the outer leaf from collapsing inward", "To provide decoration to the wall", "To structurally connect the inner and outer leaves while allowing them to function independently", "To seal the cavity against air infiltration"],
    correctAnswer: "To structurally connect the inner and outer leaves while allowing them to function independently",
    explanation: "The primary purpose of wall ties is to structurally connect the inner and outer leaves while allowing them to function independently. The ties transfer lateral loads (typically wind loads) across the cavity, ensuring the wall acts as a composite structure while maintaining the separation needed for the cavity to function properly. Modern wall ties include features such as drips to prevent water crossing the cavity. Wall ties are essential structural elements - without them, the outer leaf would be unstable and prone to failure, particularly under wind loading."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity3',
    question: "What is the typical minimum width of a cavity in modern UK domestic construction?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "The typical minimum width of a cavity in modern UK domestic construction is 50mm. This provides sufficient space to prevent moisture bridging across the cavity while allowing for building tolerances. When partial-fill insulation is used, a residual cavity of at least 50mm should be maintained between the insulation and the outer leaf. For full-fill insulation systems, manufacturer's specifications should be followed for the appropriate cavity width, but 50mm is generally the minimum acceptable width. Building regulations and warranty providers may specify different minimum requirements in some circumstances."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity4',
    question: "What is a 'cold bridge' or 'thermal bridge' in cavity wall construction?",
    options: ["A special insulated wall tie", "A path where heat can transfer across the cavity more easily than through the surrounding areas", "A technique for ventilating the cavity in cold weather", "A type of cavity closer used in cold climates"],
    correctAnswer: "A path where heat can transfer across the cavity more easily than through the surrounding areas",
    explanation: "A 'cold bridge' or 'thermal bridge' is a path where heat can transfer across the cavity more easily than through the surrounding areas. These typically occur at junctions, corners, or where the cavity is bridged by materials with higher thermal conductivity. Common thermal bridges include metal wall ties, lintels, window and door reveals, floor junctions, and any point where insulation is discontinued. Thermal bridges can lead to increased heat loss, higher energy consumption, cold spots on internal surfaces, and potential condensation issues that may result in mold growth."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity5',
    question: "What is the purpose of weep holes in a cavity wall?",
    options: ["To allow air circulation within the cavity", "To allow the wall to flex without cracking", "To drain water that penetrates the outer leaf", "To permit inspection of the cavity"],
    correctAnswer: "To drain water that penetrates the outer leaf",
    explanation: "Weep holes are small openings placed at the base of cavity walls and above openings to drain water that penetrates the outer leaf. They allow moisture that collects in the cavity or on the cavity face of the outer leaf to escape rather than being trapped, which could cause damp issues. Weep holes are typically formed by leaving perpendicular joints open or using specialized plastic inserts, and are generally spaced at approximately 450mm to 900mm intervals. They are essential for proper moisture management in cavity wall systems."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity6',
    question: "How should vertical DPC (damp-proof course) be installed at window or door openings in cavity walls?",
    options: ["In line with the window frame", "25mm behind the face of the window frame", "Flush with the external brick face", "It isn't required at openings"],
    correctAnswer: "25mm behind the face of the window frame",
    explanation: "Vertical DPC at window or door openings in cavity walls should be installed approximately 25mm behind the face of the window frame. This position allows the DPC to direct water away from the frame and back into the cavity. The DPC should extend beyond the ends of the lintel, be turned into the cavity at each jamb, and overlap with the cavity tray above the opening. At the sill, the DPC should be laid to direct water outward. Proper installation prevents water penetration around openings, which are particularly vulnerable areas in cavity wall construction."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity7',
    question: "What is the correct spacing for wall ties in standard cavity wall construction?",
    options: ["225mm horizontally, 150mm vertically", "450mm horizontally, 150mm vertically", "900mm horizontally, 450mm vertically", "50mm horizontally, 75mm vertically"],
    correctAnswer: "900mm horizontally, 450mm vertically",
    explanation: "The correct spacing for wall ties in standard cavity wall construction is 900mm horizontally and 450mm vertically (equivalent to every sixth brick course for standard UK bricks). This creates a staggered pattern. At openings, movement joints, and within 225mm of unbonded edges, this spacing should be reduced to 300mm vertically. Additional ties are required at intervals not exceeding 300mm around the perimeter of openings. These spacings ensure adequate structural connection between the leaves while allowing the cavity to function properly."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity8',
    question: "What material is typically used for the inner leaf of a cavity wall in modern UK house construction?",
    options: ["Engineering bricks", "Concrete blocks", "Limestone blocks", "Clay bricks identical to the outer leaf"],
    correctAnswer: "Concrete blocks",
    explanation: "Concrete blocks are typically used for the inner leaf of a cavity wall in modern UK house construction. These blocks offer good structural performance, can be manufactured in various densities for different thermal properties, and provide a suitable substrate for internal finishes. The most common types include medium-density blocks (1300-1900 kg/m³) for general purposes and lightweight blocks (600-1500 kg/m³) where better thermal insulation is required. Concrete blocks are generally more economical than bricks for the inner leaf, which is not visible in the finished building."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity9',
    question: "What is a cavity barrier in cavity wall construction?",
    options: ["Another term for wall insulation", "A physical barrier that closes the cavity to prevent water penetration", "A fire-resistant material used to seal the cavity to prevent fire spreading", "A type of wall tie with enhanced durability"],
    correctAnswer: "A fire-resistant material used to seal the cavity to prevent fire spreading",
    explanation: "A cavity barrier is a fire-resistant material used to seal the cavity to prevent fire and smoke from spreading through the concealed space. Building regulations require cavity barriers at specific locations including around openings, at junctions with compartment walls and floors, at junctions between roofs and walls, and at set intervals in extensive cavities. These barriers are typically made from rock fiber, mineral wool, or other fire-resistant materials and must provide adequate fire resistance (typically 30 minutes integrity and 15 minutes insulation) while being securely fixed to prevent displacement."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity10',
    question: "What is a cavity tray and where is it required in cavity wall construction?",
    options: ["A tool for cleaning cavities, required on all sites", "A waterproof barrier that directs water across the cavity and out through weep holes, required above openings and at other interruptions to the cavity", "A tray for mixing mortar, required on all cavity wall projects", "A type of cavity insulation, required in all external walls"],
    correctAnswer: "A waterproof barrier that directs water across the cavity and out through weep holes, required above openings and at other interruptions to the cavity",
    explanation: "A cavity tray is a waterproof barrier that directs water across the cavity and out through weep holes. It is required above openings (doors, windows) and at other points where the cavity is interrupted, such as at abutments with roofs, where the inner leaf steps, at changes in wall height, and where items bridge the cavity. Cavity trays prevent water that runs down within the cavity from penetrating to the inner leaf at vulnerable points. They typically incorporate a stop end at each side to prevent water running off the ends and are accompanied by weep holes to allow drainage."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity11',
    question: "What is the difference between stretcher bond and English bond in brickwork?",
    options: ["Stretcher bond uses only stretchers, English bond alternates courses of headers and stretchers", "Stretcher bond is only used in England, English bond is used internationally", "Stretcher bond is stronger, English bond is more decorative", "Stretcher bond is for interior walls, English bond for exterior walls"],
    correctAnswer: "Stretcher bond uses only stretchers, English bond alternates courses of headers and stretchers",
    explanation: "The difference between stretcher bond and English bond is in their arrangement of bricks. Stretcher bond (also called running bond) shows only stretchers (the long face of bricks) in each course, with each stretcher centered over the joint below. This is the most common bond for modern cavity walls as it's economical and simple. English bond alternates entire courses of stretchers with courses of headers (the short end of bricks), creating a strong, interlocking pattern. English bond is typically used for solid walls requiring maximum strength and was common in traditional construction before cavity walls became standard."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity12',
    question: "Which type of bond would most likely be used for the outer leaf of a modern cavity wall?",
    options: ["English bond", "Flemish bond", "Stretcher bond", "Stack bond"],
    correctAnswer: "Stretcher bond",
    explanation: "Stretcher bond would most likely be used for the outer leaf of a modern cavity wall. Since the outer leaf is typically only half a brick thick (102.5mm), stretcher bond is the most practical and economical option, showing only the long faces (stretchers) of the bricks on the external face. This bond requires fewer bricks than more complex patterns and creates a continuous cavity face without brick ends projecting into the cavity, which would complicate insulation installation and increase the risk of moisture transmission across the cavity."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity13',
    question: "What is the purpose of using 'snap headers' (half bricks) in stretcher bond brickwork?",
    options: ["To create a decorative pattern", "To maintain bond at corners and at stop ends", "To reduce the weight of the wall", "To improve the insulation value of the wall"],
    correctAnswer: "To maintain bond at corners and at stop ends",
    explanation: "Snap headers (half bricks) are used in stretcher bond brickwork to maintain bond at corners and at stop ends. When a wall needs to turn a corner or terminate, full bricks alone cannot maintain the proper staggered joint pattern that is essential for structural integrity and appearance. By using half bricks (typically created by cutting a whole brick in half), the bricklayer can maintain the correct bonding pattern where a wall changes direction or terminates, ensuring joints don't align vertically which would create a weak point and poor appearance."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity14',
    question: "What is a 'perpend joint' in brickwork?",
    options: ["A joint running at a right angle to the wall face", "The vertical joint between bricks in the same course", "A joint reinforced with metal perpend ties", "A joint where the wall meets a perpendicular wall"],
    correctAnswer: "The vertical joint between bricks in the same course",
    explanation: "A perpend joint (also called a cross joint or head joint) is the vertical joint between adjacent bricks in the same course. These joints are typically 10mm wide and should be fully filled with mortar to ensure weather resistance and structural integrity. In proper bonding, perpend joints in consecutive courses should not align, as this would create a continuous vertical joint that would weaken the wall. The arrangement of perpend joints is a defining characteristic of different bonding patterns in brickwork."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity15',
    question: "What is the purpose of a 'slip brick' in blockwork?",
    options: ["A brick with a slippery surface for decorative effect", "A brick cut to a thin section to face concrete", "A brick used to create slip joints for movement", "A brick used to compensate for slipping foundations"],
    correctAnswer: "A brick cut to a thin section to face concrete",
    explanation: "A slip brick (or brick slip) is a brick cut to a thin section (typically 20-25mm thick) used to face concrete or other structural substrates. These provide the appearance of traditional brickwork while allowing the structural element to be constructed of another material. Slip bricks are commonly used for facing concrete lintels and columns, cladding existing buildings, or in areas where full brick depth would be impractical. They are fixed using special adhesives, mechanical fixings, or cast into the concrete and maintain the visual appearance of traditional brickwork."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity16',
    question: "What is the primary reason concrete blocks are typically used for the inner leaf rather than bricks?",
    options: ["They are more fire-resistant", "They provide better sound insulation", "They are quicker to lay and more cost-effective", "They are lighter and easier to transport"],
    correctAnswer: "They are quicker to lay and more cost-effective",
    explanation: "The primary reason concrete blocks are typically used for the inner leaf rather than bricks is that they are quicker to lay and more cost-effective. Being significantly larger than bricks (typically 440mm × 215mm × 100mm), blocks cover approximately 10 times the area of a single brick, drastically reducing labor time and mortar usage. As the inner leaf is usually concealed by internal finishes, the aesthetic advantages of bricks are unnecessary. Additionally, blocks are available in various densities offering different thermal, acoustic, and structural properties to suit specific requirements of the inner leaf."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity17',
    question: "What is the correct way to terminate a DPC in a cavity wall?",
    options: ["Cut it flush with the outer face of brickwork", "Extend it 5mm beyond the brick face", "Turn it up within the cavity at least 25mm", "Terminate it at the center of the cavity"],
    correctAnswer: "Turn it up within the cavity at least 25mm",
    explanation: "The correct way to terminate a DPC in a cavity wall is to turn it up within the cavity at least 25mm. This upstand creates a physical barrier that prevents water from tracking across the DPC and reaching the inner leaf. The turned-up section should be held against the inner leaf or insulation. At stop ends (such as at door or window openings), the DPC should also be formed with corners that prevent water from running off the end of the DPC. This careful detailing at DPC terminations is essential for effective moisture control in cavity wall construction."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity18',
    question: "When constructing a cavity wall, what is the correct sequence for building up the leaves?",
    options: ["Build the outer leaf to full height, then the inner leaf", "Build the inner leaf to full height, then the outer leaf", "Build both leaves simultaneously, keeping them at approximately the same height", "Build the corner sections first, then fill in between"],
    correctAnswer: "Build both leaves simultaneously, keeping them at approximately the same height",
    explanation: "When constructing a cavity wall, the correct sequence is to build both leaves simultaneously, keeping them at approximately the same height (typically within 3-5 courses of each other). This allows for proper installation of wall ties as work progresses, ensures accurate alignment between the leaves, and maintains stability during construction. Building one leaf significantly higher than the other could cause it to lean or collapse, particularly if it's the outer leaf which has less restraint. This synchronous construction also facilitates proper installation of cavity trays, DPCs, and insulation at the appropriate heights."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity19',
    question: "What is the purpose of a cavity closer in cavity wall construction?",
    options: ["To permanently seal the top of the cavity", "To close the cavity during construction breaks", "To close the cavity around openings while providing thermal insulation", "To create access points for inspecting the cavity"],
    correctAnswer: "To close the cavity around openings while providing thermal insulation",
    explanation: "A cavity closer is used to close the cavity around openings (doors and windows) while providing thermal insulation. It creates a continuous thermal break around the opening, preventing cold bridging at the junction between the frame and masonry, while also supporting the frame and maintaining fire resistance. Cavity closers typically consist of rigid insulation with a DPC, often within a plastic carrier, that fits the cavity width. They must be installed correctly to ensure weathertightness, thermal performance, and proper support for the window or door frame."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity20',
    question: "What problem can occur if mortar droppings are allowed to accumulate in the cavity of a wall?",
    options: ["They will add unwanted weight to the structure", "They can create a path for moisture to cross the cavity (cold bridge)", "They will react with the wall ties causing corrosion", "They will harden and strengthen the wall"],
    correctAnswer: "They can create a path for moisture to cross the cavity (cold bridge)",
    explanation: "If mortar droppings are allowed to accumulate in the cavity, they can create a path for moisture to cross from the outer leaf to the inner leaf, known as a cold bridge or thermal bridge. These mortar bridges compromise the cavity's primary purpose of preventing water penetration to the inner leaf and can lead to damp patches on internal walls. Additionally, mortar bridges can reduce thermal insulation by creating paths of higher thermal conductivity. Good practice includes using a cavity board during construction and cleaning out the cavity bottom regularly to prevent mortar accumulation."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity21',
    question: "What type of blockwork would typically be used below the DPC level in domestic construction?",
    options: ["Lightweight thermal blocks", "Dense concrete blocks", "Aerated concrete blocks", "Clay facing blocks"],
    correctAnswer: "Dense concrete blocks",
    explanation: "Dense concrete blocks would typically be used below the DPC level in domestic construction. These blocks have high compressive strength (7-10+ N/mm²) and low water absorption, making them suitable for foundation walls that may be exposed to ground moisture, frost, and higher compressive loads. Lightweight or aerated blocks are generally not recommended below DPC level as they typically have higher water absorption and lower strength. Using appropriate blocks below DPC is crucial for the long-term structural integrity of the building and for preventing rising damp issues."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity22',
    question: "What is the minimum overlap (lap) required for vertical DPCs at door and window jambs in cavity walls?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "100mm",
    explanation: "The minimum overlap (lap) required for vertical DPCs at door and window jambs in cavity walls is 100mm. This ensures that the vertical DPC at the jamb adequately overlaps with the horizontal DPC (cavity tray) above the opening and with the main DPC lower in the wall, creating a continuous moisture barrier. Proper lapping of DPCs is essential to prevent water penetration at these vulnerable junctions. The vertical DPC should be turned into the cavity by at least 25mm to direct any moisture back into the cavity rather than toward the frame or inner leaf."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity23',
    question: "What is the typical block size used for the inner leaf of a cavity wall in UK construction?",
    options: ["215mm × 102.5mm × 65mm (standard brick size)", "300mm × 200mm × 100mm", "440mm × 215mm × 100mm", "600mm × 300mm × 100mm"],
    correctAnswer: "440mm × 215mm × 100mm",
    explanation: "The typical block size used for the inner leaf of a cavity wall in UK construction is 440mm × 215mm × 100mm. This standard metric modular size coordinates with brick dimensions (215mm × 102.5mm × 65mm) and the standard 10mm mortar joints, allowing for proper alignment between the leaves. These blocks cover approximately the same area as 10 standard bricks, significantly reducing labor time and mortar usage. Blocks may be available in other thicknesses (e.g., 140mm) depending on specific requirements for structural capacity, sound insulation, or thermal performance."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity24',
    question: "What is 'toothing' in brickwork and blockwork?",
    options: ["A type of decorative finish on brick faces", "A defect caused by incorrect mortar mixing", "Leaving temporary steps in the end of a wall to allow for bonding with future work", "A method of repairing damaged brickwork"],
    correctAnswer: "Leaving temporary steps in the end of a wall to allow for bonding with future work",
    explanation: "Toothing refers to leaving temporary steps in the end of a wall to allow for bonding with future work. This technique creates a zigzag pattern at the wall end, with alternating courses projecting further than the ones above and below. When construction continues later, new bricks or blocks can be bonded into these steps, creating proper structural connection between the existing and new work. While historically common, toothing has largely been replaced by creating movement joints or using specialized connectors for joining new work to existing masonry, as toothing can be prone to cracking from differential settlement."
  },
  {
    id: 'bricklaying-l2-blockwork-cavity25',
    question: "What is the purpose of a 'mastiek pointing' or 'bell-cast pointing' detail at the base of a cavity wall?",
    options: ["To create a decorative feature", "To shed water away from the wall base and foundation", "To strengthen the mortar joints at the base", "To indicate where the cavity begins"],
    correctAnswer: "To shed water away from the wall base and foundation",
    explanation: "A mastiek pointing or bell-cast pointing detail at the base of a cavity wall is designed to shed water away from the wall base and foundation. This specialized pointing profile projects slightly from the wall face and features a sloping lower edge that directs rainwater outward, preventing it from running down the face of the foundation. This detail is typically created in the first few courses above ground level and helps protect the foundation from excessive water exposure, reducing the risk of saturation, frost damage, and associated problems with ground moisture affecting the building's base."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-blockwork-cavity', 'items', q.id), {
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
