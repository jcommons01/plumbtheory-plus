// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2SettingOut.ts

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

// ✅ Bricklaying Level 2 Setting Out Masonry Structures Questions
const questions = [
  {
    id: 'bricklaying-l2-setting-out1',
    question: "What is the primary purpose of setting out masonry structures?",
    options: ["To estimate material quantities", "To determine the construction timeline", "To establish the correct positions, dimensions, and levels for the structure", "To identify suitable storage areas for building materials"],
    correctAnswer: "To establish the correct positions, dimensions, and levels for the structure",
    explanation: "The primary purpose of setting out masonry structures is to establish the correct positions, dimensions, and levels for the structure. This process translates the design from drawings to the actual site, ensuring the building will be constructed exactly where and how it should be. Accurate setting out is fundamental to the success of the entire project, as errors at this stage will compound through the construction process. It ensures walls are straight, square, and level, and that the structure has the correct dimensions and aligns properly with other elements."
  },
  {
    id: 'bricklaying-l2-setting-out2',
    question: "What is the 3-4-5 method used for in masonry setting out?",
    options: ["Determining the correct mortar mix ratio", "Setting out the height of a wall", "Checking or creating a right angle (90°)", "Measuring the depth of foundations"],
    correctAnswer: "Checking or creating a right angle (90°)",
    explanation: "The 3-4-5 method is used for checking or creating a right angle (90°) in masonry setting out. It applies the Pythagorean theorem, which states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. By measuring 3 units along one line, 4 units along the perpendicular line, and ensuring the diagonal between these points is exactly 5 units, you can verify or establish a perfect right angle. This method is particularly useful for setting out corners of buildings and ensuring walls meet at correct angles."
  },
  {
    id: 'bricklaying-l2-setting-out3',
    question: "What setting out equipment would you use to ensure walls are plumb (perfectly vertical)?",
    options: ["Tape measure", "Spirit level or plumb bob", "String line", "Laser level"],
    correctAnswer: "Spirit level or plumb bob",
    explanation: "To ensure walls are plumb (perfectly vertical), you would use a spirit level or plumb bob. A spirit level with a vertical vial allows direct checking of wall verticality. A plumb bob, consisting of a weight on a string that hangs perfectly vertical due to gravity, provides a true vertical reference. Both tools are essential for bricklayers to check plumbness during construction. While a laser level can also be used for checking plumb, traditional spirit levels and plumb bobs remain common on-site due to their reliability, simplicity, and no need for power or calibration."
  },
  {
    id: 'bricklaying-l2-setting-out4',
    question: "What is a datum point in setting out?",
    options: ["The date when construction started", "The midpoint of a wall", "A fixed reference point from which measurements are taken", "The highest point of a structure"],
    correctAnswer: "A fixed reference point from which measurements are taken",
    explanation: "A datum point is a fixed reference point from which measurements are taken during setting out. It provides a consistent baseline for establishing levels and positions throughout the construction process. In UK construction, datum points often relate to Ordnance Datum (sea level), but temporary site datums may also be established. By working from a single datum, all levels on site can be coordinated accurately, ensuring different elements of the building are at the correct heights relative to each other and to the design specifications."
  },
  {
    id: 'bricklaying-l2-setting-out5',
    question: "When setting out a building, what does 'establishing the footprint' mean?",
    options: ["Measuring the environmental impact of construction", "Determining the size of foundation needed", "Marking out the outline of the building on the ground", "Calculating the floor area of the building"],
    correctAnswer: "Marking out the outline of the building on the ground",
    explanation: "In setting out a building, 'establishing the footprint' means marking out the outline of the building on the ground. This process involves transferring the building dimensions from the drawings to the actual site, marking the corners and wall lines of the structure. Typically, this is done using profile boards, pegs, string lines, and markers to clearly indicate where foundations and walls will be positioned. This critical first step ensures the building will be constructed in the correct location, with proper dimensions and alignment according to the design."
  },
  {
    id: 'bricklaying-l2-setting-out6',
    question: "What is the purpose of a profile board in masonry setting out?",
    options: ["To display the project schedule", "To support bricks temporarily", "To provide a template for decorative brickwork", "To hold string lines that mark wall positions"],
    correctAnswer: "To hold string lines that mark wall positions",
    explanation: "The purpose of a profile board in masonry setting out is to hold string lines that mark wall positions. Profile boards are typically set up just outside the building footprint at corners and other key points. They include horizontal boards with notches or nails at precise positions that correspond to the external and internal faces of walls. String lines stretched between matching points on different profile boards establish the exact wall lines without obstructing excavation or construction work. This system maintains accurate setting out references throughout the foundation and initial wall construction phases."
  },
  {
    id: 'bricklaying-l2-setting-out7',
    question: "Which of these is NOT typically part of the setting out process for masonry structures?",
    options: ["Establishing level datums", "Marking wall positions", "Checking for square corners", "Mixing mortar"],
    correctAnswer: "Mixing mortar",
    explanation: "Mixing mortar is NOT typically part of the setting out process for masonry structures. Setting out primarily involves measuring, marking, and establishing the positions, levels, and dimensions for the structure before construction begins. This includes establishing level datums, marking wall positions, checking for square corners, and setting up profile boards and string lines. Mixing mortar belongs to the construction phase that follows successful setting out. Setting out focuses on layout and positioning, while mortar mixing is part of the actual building process."
  },
  {
    id: 'bricklaying-l2-setting-out8',
    question: "When setting out a structure, what is the purpose of 'checking the diagonals'?",
    options: ["To ensure the walls will have the correct height", "To verify that the corners are square", "To determine the roof pitch", "To check the foundation depth"],
    correctAnswer: "To verify that the corners are square",
    explanation: "When setting out a structure, 'checking the diagonals' is done to verify that the corners are square. In a rectangular layout, if both diagonals (measured from corner to corner) are equal in length, then the corners are square (90 degrees). This check is essential because even small errors in the angles of corners can result in significant problems as construction progresses, leading to difficulties with door and window installation, roofing, and internal finishes. Checking diagonals is a simple but crucial verification that complements other methods like the 3-4-5 technique."
  },
  {
    id: 'bricklaying-l2-setting-out9',
    question: "What does 'gauging' refer to in brickwork setting out?",
    options: ["Checking the moisture content of mortar", "The process of establishing the vertical spacing of brick courses", "Measuring the length of bricks", "Determining the strength of bricks"],
    correctAnswer: "The process of establishing the vertical spacing of brick courses",
    explanation: "In brickwork setting out, 'gauging' refers to the process of establishing the vertical spacing of brick courses. This involves calculating the combined height of a brick plus a mortar joint to determine how many courses will be needed to reach a specific height. A gauge rod is often used to mark these courses, ensuring consistent vertical spacing throughout the wall. Proper gauging is essential for accurately positioning openings, meeting specific height requirements, and ensuring horizontal features (like DPCs, lintels, and string courses) align correctly with the coursing pattern."
  },
  {
    id: 'bricklaying-l2-setting-out10',
    question: "If a wall needs to be 2.4 meters high using bricks with a 65mm face height and 10mm mortar joints, how many courses of brickwork are required?",
    options: ["24 courses", "32 courses", "30 courses", "27 courses"],
    correctAnswer: "32 courses",
    explanation: "To calculate the number of courses required, divide the wall height by the combined height of one brick plus one mortar joint. Each course equals 65mm (brick height) + 10mm (mortar joint) = 75mm total height per course. For a 2.4 meter (2400mm) wall: 2400mm ÷ 75mm = 32 courses. Note that this calculation assumes a mortar joint above each brick, with the final course having a joint above it as well. In practice, consideration would also be given to how this wall meets other elements like the roof or ceiling to ensure appropriate coursing."
  },
  {
    id: 'bricklaying-l2-setting-out11',
    question: "What is the purpose of a 'gauge rod' in brickwork?",
    options: ["To measure the depth of mortar joints", "To mark the positions of doors and windows", "To mark out the height of courses to ensure consistency", "To test the quality of bricks"],
    correctAnswer: "To mark out the height of courses to ensure consistency",
    explanation: "A gauge rod is used to mark out the height of courses to ensure consistency in brickwork. Typically made from a straight piece of timber or metal, it's marked with the cumulative heights of brick courses including mortar joints. This tool allows bricklayers to quickly check course heights as the wall progresses, ensuring consistent level courses, particularly around openings or when matching existing brickwork. Using a gauge rod helps maintain accurate vertical dimensions and ensures that features like window sills and lintels align correctly with the coursing pattern."
  },
  {
    id: 'bricklaying-l2-setting-out12',
    question: "When setting out brick walls, what is the recommended minimum overlap (lap) between bricks in consecutive courses?",
    options: ["One quarter of a brick", "One half of a brick", "One third of a brick", "Three quarters of a brick"],
    correctAnswer: "One quarter of a brick",
    explanation: "When setting out brick walls, the recommended minimum overlap (lap) between bricks in consecutive courses is one quarter of a brick (about 50-60mm for standard bricks). This minimum lap ensures adequate structural bonding between courses. The most common lap used in stretcher bond is half a brick (102.5mm), which provides good structural integrity and an appealing pattern. Maintaining consistent bonding patterns with proper overlaps is essential for both the structural performance and appearance of brickwork. Laps less than a quarter brick can compromise structural integrity and are generally avoided."
  },
  {
    id: 'bricklaying-l2-setting-out13',
    question: "What setting out tool would you use to transfer levels around a building site?",
    options: ["Gauge rod", "Club hammer", "Optical or laser level", "Bolster chisel"],
    correctAnswer: "Optical or laser level",
    explanation: "To transfer levels around a building site, you would use an optical or laser level. These precision instruments project a perfectly level line or plane over distance, allowing accurate height transfer regardless of terrain variations. The optical level uses a telescopic sight and a spirit bubble to establish level sightlines, while a laser level projects a visible level beam. Both allow heights to be measured at different points relative to a fixed datum. This is essential for ensuring consistent foundation depths, floor levels, DPC heights, and other critical level features across the entire building."
  },
  {
    id: 'bricklaying-l2-setting-out14',
    question: "What is the 'perpend' in brickwork setting out?",
    options: ["The slope of a roof", "The vertical joint between bricks in a course", "The horizontal joint between courses", "The overhang of a brick beyond the course below"],
    correctAnswer: "The vertical joint between bricks in a course",
    explanation: "In brickwork, the 'perpend' is the vertical joint between bricks in a course. When setting out brickwork, careful attention must be paid to the positioning of perpends to ensure they are properly aligned according to the bond pattern being used. In most bonding patterns, perpends in consecutive courses should not align, as this would create a continuous vertical joint that would weaken the wall. Properly arranged perpends contribute significantly to both the structural integrity and visual appearance of the finished brickwork."
  },
  {
    id: 'bricklaying-l2-setting-out15',
    question: "When setting out a half-brick thick wall in stretcher bond that is 7.5 meters long, approximately how many bricks would be needed for a single course?",
    options: ["25 bricks", "35 bricks", "75 bricks", "150 bricks"],
    correctAnswer: "35 bricks",
    explanation: "To calculate the number of bricks needed for a single course of a half-brick thick wall in stretcher bond, divide the wall length by the face length of one brick plus one mortar joint. For standard UK bricks: each brick is 215mm long, and a standard mortar joint is 10mm. So, each brick plus joint occupies 225mm of wall length. For a 7.5 meter (7500mm) wall: 7500mm ÷ 225mm = 33.33 bricks. Rounding up to account for cut bricks at the end and potential waste, approximately 35 bricks would be needed for a single course."
  },
  {
    id: 'bricklaying-l2-setting-out16',
    question: "What is a 'story rod' used for in masonry setting out?",
    options: ["Recording the history of the building project", "Measuring the height of stories in multi-level buildings", "Marking the positions of windows and other openings relative to brick courses", "Testing the strength of floor structures"],
    correctAnswer: "Marking the positions of windows and other openings relative to brick courses",
    explanation: "A story rod is used for marking the positions of windows and other openings relative to brick courses. Similar to a gauge rod but typically longer, a story rod is marked with both the cumulative heights of brick courses and the positions of features like window sills, lintels, and DPCs. This tool helps ensure that openings align properly with the coursing pattern and that features are positioned at the correct heights. Using a story rod helps avoid having to cut bricks awkwardly to fit around openings and ensures consistent positioning of features around the building."
  },
  {
    id: 'bricklaying-l2-setting-out17',
    question: "What does 'breaking bond' mean in brickwork setting out?",
    options: ["Deliberately cracking defective bricks", "Arranging bricks so that vertical joints in consecutive courses do not align", "Removing mortar bonds for rebuilding work", "Stopping work due to freezing conditions"],
    correctAnswer: "Arranging bricks so that vertical joints in consecutive courses do not align",
    explanation: "In brickwork setting out, 'breaking bond' means arranging bricks so that vertical joints (perpends) in consecutive courses do not align. This creates an interlocking pattern where each brick overlaps those in the courses below and above, distributing loads and preventing continuous vertical joints that would weaken the wall. Proper bond breaking is a fundamental principle of all brick bonding patterns and is essential for structural integrity. The minimum overlap (lap) between bricks in adjacent courses should be at least a quarter of a brick length to effectively break bond."
  },
  {
    id: 'bricklaying-l2-setting-out18',
    question: "When setting out for a cavity wall, what is the standard distance maintained between the inner and outer leaves in modern UK construction?",
    options: ["50mm", "75mm", "100mm", "150mm"],
    correctAnswer: "100mm",
    explanation: "When setting out for a cavity wall in modern UK construction, the standard cavity width is typically 100mm. This width provides adequate space for insulation while maintaining sufficient separation between leaves to prevent moisture bridging. The actual cavity measurement is derived from the coordinating dimensions of the wall components including bricks, blocks, and insulation. While 50mm was once common and remains the minimum acceptable width in some circumstances, energy efficiency requirements in current building regulations typically necessitate the wider 100mm cavity to accommodate adequate insulation."
  },
  {
    id: 'bricklaying-l2-setting-out19',
    question: "What is the purpose of 'plumbing the corners' in masonry setting out?",
    options: ["Installing water pipes in corner positions", "Ensuring corner bricks are perfectly vertical", "Adding lead flashing to corner positions", "Sealing corners against water penetration"],
    correctAnswer: "Ensuring corner bricks are perfectly vertical",
    explanation: "The purpose of 'plumbing the corners' in masonry setting out is ensuring corner bricks are perfectly vertical (plumb). This is a critical step in brick laying as the corners serve as reference points for the rest of the wall. Bricklayers carefully check verticality using spirit levels or plumb bobs as they build up corner profiles (often called 'quoins'). These plumbed corners then guide the string lines for laying the courses between them. Ensuring corners are perfectly vertical is essential for wall stability, appearance, and proper integration with other building elements."
  },
  {
    id: 'bricklaying-l2-setting-out20',
    question: "When setting out a building on sloping ground, what technique can be used to establish level foundation trenches?",
    options: ["Stepped foundations", "Continuous sloping foundations", "Cantilevered foundations", "Pile foundations"],
    correctAnswer: "Stepped foundations",
    explanation: "When setting out a building on sloping ground, stepped foundations can be used to establish level foundation trenches. This technique involves creating a series of horizontal foundation sections at different heights that step down with the slope. Each section is excavated level, with vertical steps between sections. The height of these steps typically corresponds to brick or block course heights to simplify construction. Stepped foundations allow the building to have level floors while following the natural contour of the site, providing a stable base without excessive excavation or fill that would be required for a single-level foundation."
  },
  {
    id: 'bricklaying-l2-setting-out21',
    question: "What is the main purpose of 'setting out to a face' in brickwork?",
    options: ["To determine which bricks have the most attractive face", "To establish the finished face position of the wall", "To identify which direction bricks should face for weather resistance", "To decide which wall will feature decorative brickwork"],
    correctAnswer: "To establish the finished face position of the wall",
    explanation: "The main purpose of 'setting out to a face' in brickwork is to establish the finished face position of the wall. This technique involves working from the most visible or important face of the wall, ensuring that it will be straight and properly aligned, with any adjustments or cut bricks being positioned at less visible locations. By setting out to a face, bricklayers can ensure that the wall appears perfect from its most viewed aspect, with full bricks where they matter most. This approach is particularly important for external faces, feature walls, or any wall surface that will remain exposed in the completed building."
  },
  {
    id: 'bricklaying-l2-setting-out22',
    question: "What term describes the process of laying the first course of bricks on the foundation to establish the wall position?",
    options: ["Foundation coursing", "Primary setting", "Setting the line", "Establishing the footprint"],
    correctAnswer: "Setting the line",
    explanation: "The process of laying the first course of bricks on the foundation to establish the wall position is called 'setting the line.' This crucial first course establishes the exact position, alignment, and level for all subsequent brickwork. Extreme care is taken to ensure this course is perfectly level, straight, and in the correct position according to the setting-out dimensions. Bricklayers often take extra time with this course, checking measurements repeatedly, because any errors will be carried through the entire wall. Once the line is set correctly, subsequent courses can proceed more rapidly while maintaining alignment with this established base."
  },
  {
    id: 'bricklaying-l2-setting-out23',
    question: "When setting out an opening for a standard UK door in a brick wall, what typical width would you allow?",
    options: ["626mm", "726mm", "826mm", "926mm"],
    correctAnswer: "926mm",
    explanation: "When setting out an opening for a standard UK door in a brick wall, you would typically allow a width of 926mm. This accommodates a standard 838mm internal door or 826mm external door, plus the frame and a small fitting tolerance on each side. The actual structural opening must be wider than the door itself to allow for the door frame, any linings, and a small gap for installation and adjustment. When setting out the opening in brickwork, it's important to consider the brick dimensions and bond pattern to minimize brick cutting, typically aligning the opening width with full or half bricks plus mortar joints."
  },
  {
    id: 'bricklaying-l2-setting-out24',
    question: "What do bricklayers mean by 'working to the line'?",
    options: ["Working directly on the property boundary line", "Following safety guidelines", "Laying bricks to a tightly stretched string line to ensure straightness", "Working within budget constraints"],
    correctAnswer: "Laying bricks to a tightly stretched string line to ensure straightness",
    explanation: "When bricklayers refer to 'working to the line,' they mean laying bricks to a tightly stretched string line to ensure straightness. The string line is fixed between profiles or corner bricks at the exact position of the wall face and at the correct height for the current course. Bricklayers then position each brick to just touch (but not move) the line, ensuring a perfectly straight wall face. This fundamental technique is used for every course of bricks and is essential for constructing straight, professional-quality walls without undulations or deviations."
  },
  {
    id: 'bricklaying-l2-setting-out25',
    question: "When setting out a semi-circular arch, what tool would you typically use to mark the curve?",
    options: ["A tape measure", "A trammel", "A steel square", "A gauge rod"],
    correctAnswer: "A trammel",
    explanation: "When setting out a semi-circular arch, you would typically use a trammel to mark the curve. A trammel is an adjustable instrument consisting of a rigid bar with a fixed point at one end (the center of the arch) and a marking device (pencil, chalk, or scriber) at the other end. The distance between these points is set to the radius of the arch. By pivoting the bar around the fixed point, a perfect arc can be drawn. For masonry arches, this allows precise marking of the curve on formwork or templates, ensuring the arch has a mathematically correct semicircular profile when constructed."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-setting-out', 'items', q.id), {
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
