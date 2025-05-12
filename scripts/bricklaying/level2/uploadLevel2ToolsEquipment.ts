// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2ToolsEquipment.ts

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

// ✅ Bricklaying Level 2 Tools & Equipment Questions
const questions = [
  {
    id: 'bricklaying-l2-tools-equipment1',
    question: "What is the primary purpose of a brick trowel?",
    options: ["Cutting bricks to size", "Applying and spreading mortar", "Jointing mortar in brickwork", "Checking the level of brickwork"],
    correctAnswer: "Applying and spreading mortar",
    explanation: "The primary purpose of a brick trowel is applying and spreading mortar. This essential bricklaying tool consists of a flat steel blade attached to a handle, with a shape optimized for picking up mortar from the spot board, spreading it onto the course, creating a bed joint, and applying mortar to brick ends for perpend joints. The pointed shape allows precise application in corners and tight spaces. Skilled bricklayers develop a technique that allows them to control the amount and placement of mortar for efficient, clean work. Brick trowels typically range from 250mm to 330mm in length depending on the user's preference and the type of work."
  },
  {
    id: 'bricklaying-l2-tools-equipment2',
    question: "What tool would you use to cut a brick cleanly?",
    options: ["Brick trowel", "Club hammer and bolster chisel", "Spirit level", "Builder's square"],
    correctAnswer: "Club hammer and bolster chisel",
    explanation: "To cut a brick cleanly, you would use a club hammer and bolster chisel. The bolster chisel (a wide, flat-bladed chisel typically 75-100mm wide) is positioned on the marked cutting line and struck sharply with the club hammer to score a line around all faces of the brick. Progressive tapping along this scored line will eventually split the brick cleanly along the cut. For precision cuts, especially on facing bricks, a brick cutting saw may be used instead. The hammer and bolster method requires practice to master but is the traditional and still common method for on-site brick cutting."
  },
  {
    id: 'bricklaying-l2-tools-equipment3',
    question: "What is a gauge rod used for in bricklaying?",
    options: ["Measuring the consistency of mortar", "Checking the width of mortar joints", "Marking the height of brick courses", "Testing the hardness of bricks"],
    correctAnswer: "Marking the height of brick courses",
    explanation: "A gauge rod is used for marking the height of brick courses. This tool, typically made from a straight piece of timber or metal, is marked with the cumulative heights of brick courses including mortar joints. For standard UK bricks (65mm height with 10mm joints), marks would be placed at 75mm intervals. Using a gauge rod ensures consistent course heights throughout the construction, which is particularly important around openings and when matching existing brickwork. It helps maintain accurate vertical dimensions and ensures that features like window sills and lintels align correctly with the coursing pattern."
  },
  {
    id: 'bricklaying-l2-tools-equipment4',
    question: "What is the purpose of a spirit level in bricklaying?",
    options: ["To mix mortar to the right consistency", "To check and ensure work is level, plumb, and square", "To measure the moisture content in bricks", "To test the strength of mortar"],
    correctAnswer: "To check and ensure work is level, plumb, and square",
    explanation: "The purpose of a spirit level in bricklaying is to check and ensure work is level, plumb, and square. This essential tool contains sealed tubes partially filled with liquid and an air bubble that centers between marked lines when the surface is perfectly level or plumb. Bricklayers use different length levels for different applications: longer levels (1200mm or more) for checking across multiple bricks, and shorter levels for checking individual bricks. Most professional builder's levels include vials for checking horizontal (level), vertical (plumb), and 45-degree angles. Regular checking with a spirit level is essential for achieving straight, true masonry work."
  },
  {
    id: 'bricklaying-l2-tools-equipment5',
    question: "What is a builder's line used for in bricklaying?",
    options: ["Marking cutting lines on bricks", "Creating a straight guide for laying bricks", "Measuring the length of walls", "Checking the level of the foundation"],
    correctAnswer: "Creating a straight guide for laying bricks",
    explanation: "A builder's line is used for creating a straight guide for laying bricks. It consists of a strong, tight string stretched between two line pins or profile boards to establish a perfectly straight line along which bricks are laid. The bricklayer positions each brick to just touch (but not move) the line, ensuring a straight wall face. The line is reset for each new course, positioned at the level of the top edge of the bricks being laid. This fundamental technique ensures walls are straight along their length, which would be difficult to achieve using only spirit levels between individual bricks."
  },
  {
    id: 'bricklaying-l2-tools-equipment6',
    question: "What is the function of a pointing trowel?",
    options: ["Laying bricks", "Cutting bricks to size", "Filling and finishing mortar joints", "Measuring the depth of foundations"],
    correctAnswer: "Filling and finishing mortar joints",
    explanation: "The function of a pointing trowel is filling and finishing mortar joints. This specialized trowel has a narrow blade (typically 100-150mm long and 10-15mm wide) that can fit between the courses of brickwork. It's used for pointing work, where mortar is packed into the joints and then finished to the desired profile. The pointing trowel's narrow blade allows precise application of mortar in the confined space of the joints without smearing the face of the bricks. It's particularly useful for repointing existing brickwork or for finishing joints that weren't completed during the initial laying process."
  },
  {
    id: 'bricklaying-l2-tools-equipment7',
    question: "What is a jointer used for in brickwork?",
    options: ["Joining two walls together", "Creating expansion joints", "Shaping and finishing mortar joints to specific profiles", "Measuring joint widths"],
    correctAnswer: "Shaping and finishing mortar joints to specific profiles",
    explanation: "A jointer is used for shaping and finishing mortar joints to specific profiles in brickwork. This tool, available in various shapes corresponding to different joint profiles, is drawn along the partially set mortar to compact it and create the desired finish. Common jointer types include the rounded (or bucket handle) jointer for concave joints, the Vee jointer for V-shaped joints, and the flat jointer for flush joints. Properly using a jointer compacts the mortar for better durability and creates a consistent appearance across the brickwork. The chosen joint profile affects both aesthetics and the wall's weathering characteristics."
  },
  {
    id: 'bricklaying-l2-tools-equipment8',
    question: "What is the purpose of a brick hammer?",
    options: ["General hammering tasks only", "Cutting and tapping bricks into position", "Breaking up concrete", "Driving masonry nails"],
    correctAnswer: "Cutting and tapping bricks into position",
    explanation: "The purpose of a brick hammer is cutting and tapping bricks into position. This specialized hammer has a hardened steel head with a flat striking face on one end and a tapered blade or chisel on the other. The chisel end is used for scoring and cutting bricks (though larger cuts typically use a bolster chisel), while the hammer face is used for tapping bricks to adjust their position for perfect alignment after placement. The brick hammer is lighter than a club hammer, making it suitable for the more precise work required in bricklaying. Its unique design makes it an efficient multi-purpose tool for the bricklayer."
  },
  {
    id: 'bricklaying-l2-tools-equipment9',
    question: "What is a 'spot board' in bricklaying?",
    options: ["A board used for marking the positions of bricks", "A board used to carry bricks", "A platform where mortar is placed for easy access during bricklaying", "A template for creating decorative patterns"],
    correctAnswer: "A platform where mortar is placed for easy access during bricklaying",
    explanation: "A spot board in bricklaying is a platform where mortar is placed for easy access during bricklaying. Typically made of plywood or other water-resistant material, it provides a smooth, clean surface for holding freshly mixed mortar close to the work area. This allows the bricklayer to easily load their trowel with mortar without having to reach far or bend down repeatedly. The spot board is positioned within comfortable reach, often on a stand or mortar board stand (known as a 'horse'), and is moved along as work progresses. Keeping mortar on a spot board rather than directly on the ground prevents contamination with dirt and debris."
  },
  {
    id: 'bricklaying-l2-tools-equipment10',
    question: "What is a line pin used for in bricklaying?",
    options: ["Securing builder's line at corners or ends of brickwork", "Pinning drawings to site boards", "Creating weep holes in cavity walls", "Marking the position of wall ties"],
    correctAnswer: "Securing builder's line at corners or ends of brickwork",
    explanation: "Line pins are used for securing builder's line at corners or ends of brickwork. These L-shaped metal pins are inserted into mortar joints with the short leg embedded in the mortar and the longer leg extending outward. The builder's line is then wrapped around or attached to these pins and pulled tight to create a straight guide for laying bricks. Modern corner blocks often replace traditional line pins, providing a consistent offset from the wall face and allowing the line to be easily adjusted for height. Proper tensioning of the line between pins is essential for creating straight walls."
  },
  {
    id: 'bricklaying-l2-tools-equipment11',
    question: "What is the purpose of a brick joint raker?",
    options: ["Creating decorative patterns in brickwork", "Removing excess mortar from brick faces", "Raking out old mortar from joints prior to repointing", "Measuring the depth of mortar joints"],
    correctAnswer: "Raking out old mortar from joints prior to repointing",
    explanation: "The purpose of a brick joint raker is raking out old mortar from joints prior to repointing. This tool, which may have a flat blade or wheels with cutting discs, is designed to remove deteriorated mortar to a consistent depth (typically 15-20mm) without damaging the surrounding bricks. Creating this consistent depth provides a sound base for new pointing mortar to adhere to. Manual joint rakers require significant effort, while powered versions (electric or pneumatic) are more efficient for large areas. Proper preparation of joints through raking is essential for successful repointing work and the longevity of the repair."
  },
  {
    id: 'bricklaying-l2-tools-equipment12',
    question: "What essential safety equipment should a bricklayer wear when cutting bricks?",
    options: ["Only a hard hat", "Only steel-toe boots", "Eye protection, dust mask, and gloves", "Only high-visibility clothing"],
    correctAnswer: "Eye protection, dust mask, and gloves",
    explanation: "When cutting bricks, a bricklayer should wear eye protection, dust mask, and gloves as essential safety equipment. Eye protection (safety glasses or goggles) shields against flying chips and dust that could cause eye injury. A dust mask (preferably FFP3 rated) protects the respiratory system from harmful silica dust that can cause serious lung diseases including silicosis. Gloves protect hands from abrasions, cuts, and extended contact with brick dust, which can cause skin irritation. While other PPE like steel-toe boots and hard hats are important for general site safety, these three items are specifically essential for the brick cutting task."
  },
  {
    id: 'bricklaying-l2-tools-equipment13',
    question: "What is a masonry saw used for?",
    options: ["Cutting wooden profiles for setting out", "Precision cutting of bricks, blocks, and stone", "Cutting reinforcement bars", "Sawing timber formwork"],
    correctAnswer: "Precision cutting of bricks, blocks, and stone",
    explanation: "A masonry saw is used for precision cutting of bricks, blocks, and stone. These specialized power tools use diamond-tipped or abrasive blades designed to cut through hard masonry materials with accuracy. Bench-mounted brick saws provide straight, clean cuts that are difficult to achieve with hand tools, making them ideal for facing brickwork where appearance is important, or for complex cuts like angles and curves. Hand-held masonry saws offer more portability for on-site cutting. Both types typically include water cooling systems to reduce dust and prevent blade overheating. Proper PPE including eye, ear, and respiratory protection is essential when using masonry saws."
  },
  {
    id: 'bricklaying-l2-tools-equipment14',
    question: "What is the primary purpose of a builder's square?",
    options: ["Measuring the area of a wall", "Checking and marking right angles (90 degrees)", "Determining if a wall is level", "Calculating quantities of materials"],
    correctAnswer: "Checking and marking right angles (90 degrees)",
    explanation: "The primary purpose of a builder's square is checking and marking right angles (90 degrees). This L-shaped tool, typically made of metal or heavy-duty plastic, has two arms set at exactly 90 degrees to each other. It's used during setting out to establish perpendicular lines for wall corners and junctions, ensuring structures are square. It's also useful when cutting bricks to mark perfect right angles. Builder's squares come in various sizes, with larger ones (e.g., 600mm × 400mm) used for setting out building footprints and smaller ones for more detailed work. Accurate 90-degree corners are fundamental to quality construction and proper structural performance."
  },
  {
    id: 'bricklaying-l2-tools-equipment15',
    question: "What does a profiles board consist of and what is its purpose?",
    options: ["A display board showing brick profiles; used for client presentations", "A wooden board with notches to hold a builder's line at the correct position and height; used to maintain accurate wall alignment", "A catalog of brick types; used for ordering materials", "A safety information board; used for site regulations"],
    correctAnswer: "A wooden board with notches to hold a builder's line at the correct position and height; used to maintain accurate wall alignment",
    explanation: "A profiles board consists of a wooden board with notches to hold a builder's line at the correct position and height, used to maintain accurate wall alignment. Typically set up on sturdy posts just outside the building footprint at corners and other key positions, profile boards include horizontal wooden boards with precisely positioned notches or nails that correspond to wall faces and courses. Strings stretched between matching points on different profile boards establish exact wall lines without obstructing the work area. This system maintains accurate setting out references throughout foundation and initial wall construction, ensuring walls are built in the correct position, alignment, and level."
  },
  {
    id: 'bricklaying-l2-tools-equipment16',
    question: "What is the purpose of a bolster chisel in bricklaying?",
    options: ["Mixing mortar", "Cutting and shaping bricks", "Supporting walls temporarily", "Measuring brick dimensions"],
    correctAnswer: "Cutting and shaping bricks",
    explanation: "The purpose of a bolster chisel in bricklaying is cutting and shaping bricks. This wide-bladed chisel (typically 75-100mm wide) is struck with a club hammer to score a line around the brick along the desired cutting point. Progressive tapping along this scored line will eventually split the brick cleanly. The wide blade of the bolster creates a straight, even cut when used correctly. Bolsters are also used for other tasks such as cleaning off old mortar from bricks being reused, trimming uneven edges, or cutting chases in masonry for services. For delicate facing brickwork, a brick saw may be preferred for cleaner cuts with less risk of damage."
  },
  {
    id: 'bricklaying-l2-tools-equipment17',
    question: "What type of equipment would you use to mix mortar on a large construction site?",
    options: ["Hand trowel", "Bucket and spade", "Mechanical mixer (drum or pan mixer)", "Wheelbarrow"],
    correctAnswer: "Mechanical mixer (drum or pan mixer)",
    explanation: "On a large construction site, a mechanical mixer (drum or pan mixer) would be used to mix mortar. These powered mixers ensure thorough and consistent mixing of mortar ingredients in large quantities, saving significant time and labor compared to hand mixing. Drum mixers tumble the materials inside a rotating drum with fixed paddles, while pan mixers use rotating arms in a stationary pan. Pan mixers generally produce more consistent mortar and are easier to load and unload. For very large sites, silo systems might be used where dry pre-mixed materials are stored in a silo and mixed with water on demand, further increasing efficiency."
  },
  {
    id: 'bricklaying-l2-tools-equipment18',
    question: "What is a gauge lath used for?",
    options: ["Measuring the consistency of mortar", "Marking brick cutting lines", "Measuring and marking the height of brick courses", "Checking the verticality of walls"],
    correctAnswer: "Measuring and marking the height of brick courses",
    explanation: "A gauge lath is used for measuring and marking the height of brick courses. Similar to a gauge rod, this tool is marked with the cumulative heights of brick courses including mortar joints, helping ensure consistent course heights throughout the construction. The gauge lath is typically a straight, narrow piece of wood or metal with marks at regular intervals (75mm for standard UK bricks with 10mm joints). It's particularly useful for setting out the height of features such as window and door openings, ensuring they align correctly with the coursing pattern. Maintaining consistent course heights is essential for both the structural integrity and appearance of brickwork."
  },
  {
    id: 'bricklaying-l2-tools-equipment19',
    question: "What is a 'frenchman' tool used for in bricklaying?",
    options: ["Creating decorative patterns in wet mortar", "Cutting special shapes in bricks", "Cleaning mortar from brick faces and tight spaces", "Translating building terms from French"],
    correctAnswer: "Cleaning mortar from brick faces and tight spaces",
    explanation: "A 'frenchman' tool is used for cleaning mortar from brick faces and tight spaces. This small, flat tool with a shaped, sharpened edge is ideal for removing excess or spilled mortar from brick faces without scratching them, and for cleaning out tight spaces like internal corners. The frenchman is particularly useful for removing hardened mortar smears and droppings that can't be removed with a brush. It's a finishing tool typically used after the mortar has stiffened but before it fully sets. Using a frenchman helps achieve a clean, professional appearance in the completed brickwork."
  },
  {
    id: 'bricklaying-l2-tools-equipment20',
    question: "What is the main purpose of a brick conveyor on a construction site?",
    options: ["To mix mortar automatically", "To transport bricks and materials vertically to higher working levels", "To cut bricks to size", "To compact the foundation"],
    correctAnswer: "To transport bricks and materials vertically to higher working levels",
    explanation: "The main purpose of a brick conveyor on a construction site is to transport bricks and materials vertically to higher working levels. This specialized conveyor system consists of an inclined belt or series of platforms that move building materials from ground level up to scaffolding or elevated work areas. Brick conveyors significantly improve efficiency by reducing the physical effort and time required to manually carry materials up ladders or stairs. They also improve safety by reducing the risk of injury from manual handling and the hazards associated with carrying heavy loads on ladders. Modern brick conveyors may be powered electrically or by gasoline engines and come in various lengths to reach different heights."
  },
  {
    id: 'bricklaying-l2-tools-equipment21',
    question: "Which tool is used to maintain consistent mortar joint thickness?",
    options: ["Jointing tool", "Tingle plate", "Joint spacer", "Line level"],
    correctAnswer: "Joint spacer",
    explanation: "A joint spacer is used to maintain consistent mortar joint thickness. These simple tools, typically made of plastic or metal, are placed between bricks to ensure uniform joint width (usually 10mm for standard brickwork). They come in various thicknesses to accommodate different joint requirements. Joint spacers are particularly useful for less experienced bricklayers or for complex brickwork patterns where maintaining absolutely consistent joints is critical. While experienced bricklayers often judge joint thickness by eye, spacers provide a reliable reference that eliminates guesswork and variation. Consistent joint thickness is important for both the appearance and structural performance of brickwork."
  },
  {
    id: 'bricklaying-l2-tools-equipment22',
    question: "What is a cavity batten used for in brick construction?",
    options: ["Supporting ceiling joists", "Reinforcing weak brickwork", "Maintaining consistent cavity width in cavity walls", "Creating expansion joints"],
    correctAnswer: "Maintaining consistent cavity width in cavity walls",
    explanation: "A cavity batten is used for maintaining consistent cavity width in cavity walls. This temporary guide, typically a wooden batten cut to the exact required cavity width, is inserted vertically into the cavity during construction and then removed as work progresses. By regularly checking the cavity width against this standard measure, bricklayers ensure the separation between the inner and outer leaves remains consistent throughout the wall. This is crucial for the wall's thermal performance, proper functioning of the cavity as a moisture barrier, and correct positioning of wall ties. Consistent cavity width also ensures insulation boards fit properly when partial fill insulation is specified."
  },
  {
    id: 'bricklaying-l2-tools-equipment23',
    question: "What is the primary use of a 'scutch' in bricklaying?",
    options: ["Measuring brick dimensions", "Mixing small amounts of mortar", "Removing hardened mortar and cleaning bricks for reuse", "Creating decorative finishes on the face of bricks"],
    correctAnswer: "Removing hardened mortar and cleaning bricks for reuse",
    explanation: "The primary use of a 'scutch' in bricklaying is removing hardened mortar and cleaning bricks for reuse. This tool consists of a hammer-like head that holds interchangeable combs (with teeth) or chisels. The comb attachment is used to remove old mortar from recycled bricks without damaging the brick itself, while the chisel attachment can be used for more precise cleaning of harder mortar. A scutch is particularly valuable in renovation work where existing bricks need to be cleaned for reuse, or when removing mortar smears that have hardened on brick faces. Proper use of a scutch requires care to avoid damaging the brick surfaces."
  },
  {
    id: 'bricklaying-l2-tools-equipment24',
    question: "What is a 'corner block' used for in bricklaying?",
    options: ["A special block used to construct corners", "A tool for finishing internal corners", "A device for holding builder's lines at corners", "A block placed under corners of buildings to prevent settlement"],
    correctAnswer: "A device for holding builder's lines at corners",
    explanation: "A corner block is a device used for holding builder's lines at corners in bricklaying. These plastic or metal tools clip onto the corner of a wall and have adjustable arms that hold the builder's line at a consistent distance from the wall face. Corner blocks replace traditional line pins in modern bricklaying, offering advantages such as easy adjustment of line height, consistent offset from the wall, and reduced risk of disturbing newly laid brickwork. They can be quickly moved up as courses progress, maintaining accurate alignment. Some corner blocks also incorporate spirit levels, allowing simultaneous checking of level while setting the line."
  },
  {
    id: 'bricklaying-l2-tools-equipment25',
    question: "What personal protective equipment (PPE) should a bricklayer use when mixing mortar?",
    options: ["Only gloves", "Eye protection, waterproof gloves, and suitable footwear", "Only a hard hat", "Only high-visibility clothing"],
    correctAnswer: "Eye protection, waterproof gloves, and suitable footwear",
    explanation: "When mixing mortar, a bricklayer should use eye protection, waterproof gloves, and suitable footwear as personal protective equipment. Eye protection (safety glasses or goggles) prevents cement splashes that can cause serious eye damage or burns. Waterproof gloves protect hands from cement, which is highly alkaline and can cause caustic burns and dermatitis with prolonged skin contact. Suitable footwear, typically waterproof boots with steel toecaps, protects feet from spills and dropped tools. If dust is a concern (e.g., when handling dry cement), respiratory protection should also be worn. Proper PPE is essential for preventing both immediate injuries and long-term health issues."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-tools-equipment', 'items', q.id), {
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
