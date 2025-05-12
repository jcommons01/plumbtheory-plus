// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2BuildingConstruction.ts

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

// ✅ Joinery Level 2 Building Construction Principles Questions
const questions = [
  {
    id: 'joinery-l2-building-construction1',
    question: "What is the primary purpose of a damp-proof course (DPC) in a building?",
    options: ["To provide thermal insulation", "To prevent moisture rising from the ground into the walls", "To strengthen the foundation", "To provide a level surface for brickwork"],
    correctAnswer: "To prevent moisture rising from the ground into the walls",
    explanation: "A damp-proof course (DPC) is a horizontal barrier installed in walls to prevent moisture rising from the ground into the structure above through capillary action, a phenomenon known as rising damp. In modern UK construction, DPCs are typically made from materials such as polyethylene, bitumen felt, or slates. Building Regulations require a DPC to be at least 150mm above external ground level. For joinery work, understanding DPC location is crucial when installing elements like door frames, skirting boards, and timber floor structures to ensure they're protected from moisture damage."
  },
  {
    id: 'joinery-l2-building-construction2',
    question: "Which of the following best describes a 'cavity wall' construction?",
    options: ["A single-thickness wall with an air gap between plasterboard panels", "A wall with decorative recesses on the interior surface", "Two separate walls with a gap between them, tied together with wall ties", "A wall with cavities filled with acoustic insulation for soundproofing"],
    correctAnswer: "Two separate walls with a gap between them, tied together with wall ties",
    explanation: "A cavity wall consists of two separate walls (referred to as 'leaves' or 'skins') with a gap or cavity between them, tied together with wall ties. The outer leaf is typically made of brick, while the inner leaf is often blockwork. This construction method, common in UK buildings since the 1930s, provides better insulation and weather resistance than solid walls. The cavity often contains insulation material to improve thermal performance. Joiners need to understand cavity wall construction when installing fixtures and fittings, particularly when securing heavy items that may require special cavity wall fixings or when forming openings for doors and windows."
  },
  {
    id: 'joinery-l2-building-construction3',
    question: "What is the standard thickness of plasterboard typically used for wall linings in UK domestic construction?",
    options: ["6mm", "9.5mm or 12.5mm", "18mm", "25mm"],
    correctAnswer: "9.5mm or 12.5mm",
    explanation: "The standard thickness of plasterboard typically used for wall linings in UK domestic construction is 9.5mm or 12.5mm. The 9.5mm boards are generally used for dry lining walls where a plasterer will apply a skim coat finish, while 12.5mm boards are often used for ceilings or where additional fire resistance or sound insulation is required. Joiners need to be familiar with plasterboard specifications when constructing stud walls, boxing in services, or creating feature walls. They must also select appropriate fixings based on the plasterboard thickness and the weight of items to be attached."
  },
  {
    id: 'joinery-l2-building-construction4',
    question: "What is the minimum depth of foundations typically required for a two-storey house in normal ground conditions in the UK?",
    options: ["150mm", "450mm", "900mm", "1.5m"],
    correctAnswer: "900mm",
    explanation: "The minimum depth of foundations for a two-storey house in normal ground conditions in the UK is typically 900mm (or 1m in practice). This depth is specified to ensure the foundation extends below the frost line, avoids damage from seasonal ground movement, and reaches stable soil with adequate bearing capacity. However, actual foundation depths can vary significantly based on specific site conditions, soil type, nearby trees, presence of services, and local building control requirements. While joiners aren't typically responsible for foundation work, understanding basic foundation principles is important when assessing existing buildings for joinery installations or renovations."
  },
  {
    id: 'joinery-l2-building-construction5',
    question: "Which of the following roof structures consists of factory-made triangular frames?",
    options: ["Cut roof", "Flat roof", "Trussed rafter roof", "Mansard roof"],
    correctAnswer: "Trussed rafter roof",
    explanation: "A trussed rafter roof consists of factory-made triangular frames (trusses) that span the building from external wall to external wall. These prefabricated components are typically constructed using timber members connected with nail plates. Trussed rafter roofs have largely replaced traditional cut roofs in modern UK house construction due to their speed of installation and efficient use of materials. Joiners need to understand trussed rafter construction when creating or modifying roof spaces, installing loft hatches, or when determining if roof space can be modified during conversion projects. It's important to note that trussed rafters are engineered components and should not be cut or modified without structural engineering advice."
  },
  {
    id: 'joinery-l2-building-construction6',
    question: "What is the purpose of a wall plate in traditional timber roof construction?",
    options: ["To provide a decorative finish to the top of internal walls", "To distribute the weight of the roof structure evenly across the top of the wall", "To seal the gap between the wall and ceiling", "To provide a fixing point for ceiling joists only"],
    correctAnswer: "To distribute the weight of the roof structure evenly across the top of the wall",
    explanation: "A wall plate is a timber member that sits on top of the wall to distribute the weight of the roof structure evenly across the wall. Typically made from treated timber (usually 100mm x 75mm), the wall plate provides a secure fixing point for roof rafters and ceiling joists. It's usually bedded in mortar on the wall and secured with restraint straps to prevent the roof from spreading or lifting in high winds. Joiners need to understand the role of wall plates when carrying out roof work, loft conversions, or creating openings in load-bearing walls, as the integrity of the wall plate is crucial for the structural stability of the roof."
  },
  {
    id: 'joinery-l2-building-construction7',
    question: "In a domestic timber floor construction, what is the primary purpose of noggins between joists?",
    options: ["To provide a fixing for floorboards", "To prevent joists from twisting and provide lateral stability", "To support the weight of furniture", "To improve thermal insulation"],
    correctAnswer: "To prevent joists from twisting and provide lateral stability",
    explanation: "In domestic timber floor construction, noggins are short pieces of timber fixed between floor joists to prevent the joists from twisting and to provide lateral stability to the floor structure. They're typically installed in a staggered pattern to allow easier fixing. In addition to providing stability, noggins can also reduce floor deflection, minimize squeaking, and provide fixing points for elements such as ceiling edges or service pipes. Building Regulations typically require noggins in joist runs exceeding 2.5m. Joiners need to understand proper noggin installation techniques, including sizing (matching joist depth) and spacing (typically at maximum 1.5m centers)."
  },
  {
    id: 'joinery-l2-building-construction8',
    question: "What is the recommended minimum clear height between a stair tread and the ceiling or any obstruction above it according to UK Building Regulations?",
    options: ["1.5m", "1.8m", "2.0m", "2.4m"],
    correctAnswer: "2.0m",
    explanation: "According to UK Building Regulations Approved Document K, the recommended minimum clear height (headroom) between a stair tread and the ceiling or any obstruction above it is 2.0m, measured vertically from the pitch line. This requirement ensures safe passage up and down the stairs without risk of head injury. For loft conversions, the regulations allow for reduced headroom (minimum 1.8m) at the edge of the stair, recognizing the constraints of existing buildings. Joiners must be familiar with these requirements when designing, constructing, or installing staircases to ensure compliance with building regulations and to create safe, usable stairs."
  },
  {
    id: 'joinery-l2-building-construction9',
    question: "What is the purpose of a lintel in building construction?",
    options: ["To provide a waterproof barrier on flat roofs", "To support the load above door and window openings", "To join two walls at a corner", "To provide a decorative finish around windows"],
    correctAnswer: "To support the load above door and window openings",
    explanation: "A lintel is a horizontal structural element that spans the space or opening between two vertical supports (such as walls) and carries the load of the structure above door and window openings. Lintels can be made from various materials including timber, steel, concrete, or stone. They transfer the weight of the structure above the opening to the adjacent supporting walls or columns. When installing doors or windows, joiners must ensure that appropriate lintels are in place and that the opening's dimensions correspond with the lintel's load-bearing capacity. In renovation work, temporary support must be provided if lintels need to be replaced or if new openings are being formed."
  },
  {
    id: 'joinery-l2-building-construction10',
    question: "What is the term for the vertical distance between consecutive steps in a staircase?",
    options: ["Going", "Rise", "Pitch", "Nosing"],
    correctAnswer: "Rise",
    explanation: "The rise is the vertical distance between consecutive steps in a staircase. In UK Building Regulations, the maximum rise for domestic stairs is 220mm, while the minimum is typically 150mm. The rise dimension works in conjunction with the 'going' (horizontal depth of the tread) to create comfortable, safe stairs. Building Regulations specify that twice the rise plus the going (2R + G) should be between 550mm and 700mm. Joiners must accurately calculate and maintain consistent rise dimensions throughout a staircase, as variations greater than 5mm between steps can create trip hazards. Understanding these measurements is essential for designing and constructing staircases that meet both regulatory requirements and user comfort."
  },
  {
    id: 'joinery-l2-building-construction11',
    question: "Which of the following best describes the function of a purlin in a traditional cut roof?",
    options: ["A vertical support post resting on internal load-bearing walls", "A horizontal beam supporting the rafters along their length", "The main ridge beam at the apex of the roof", "A diagonal timber providing wind bracing"],
    correctAnswer: "A horizontal beam supporting the rafters along their length",
    explanation: "In a traditional cut roof, a purlin is a horizontal beam that runs parallel to the ridge and wall plates, providing intermediate support to the rafters along their length. Purlins reduce the effective span of rafters, minimizing deflection and allowing for longer rafter lengths or smaller rafter sections to be used. They typically rest on internal load-bearing walls or struts that transfer the load down to suitable support points. Joiners working on roof structures need to understand the critical structural role of purlins and ensure they are adequately supported. In older buildings, purlins are often substantial timbers, while in modern cut roofs they might be steel beams or composite engineered timber sections."
  },
  {
    id: 'joinery-l2-building-construction12',
    question: "What is the minimum width for a domestic staircase according to UK Building Regulations?",
    options: ["600mm", "800mm", "850mm", "1000mm"],
    correctAnswer: "850mm",
    explanation: "According to UK Building Regulations Approved Document K, the minimum width for a domestic staircase serving one or more habitable rooms is 850mm. This dimension is measured between the walls or balustrades. For secondary staircases, such as those serving non-habitable spaces like a utility room, the minimum width can be reduced to 600mm. The 850mm minimum width ensures safe passage for users, including sufficient space for moving furniture and allowing emergency egress. Joiners must consider this requirement when designing and constructing staircases, particularly in restricted spaces where maximum use of available width may be required to achieve compliance."
  },
  {
    id: 'joinery-l2-building-construction13',
    question: "In timber frame construction, what is the purpose of the breather membrane installed on the outside of the frame?",
    options: ["To provide fire resistance", "To prevent water penetration while allowing water vapor to escape", "To provide thermal insulation", "To strengthen the structural frame"],
    correctAnswer: "To prevent water penetration while allowing water vapor to escape",
    explanation: "In timber frame construction, a breather membrane is installed on the outside of the frame to prevent liquid water penetration while allowing water vapor to escape from inside the structure. This semi-permeable membrane protects the timber frame from external moisture (such as wind-driven rain) that might penetrate the outer cladding, while still allowing the structure to 'breathe' by letting internal moisture vapor pass outward. This helps prevent condensation within the wall structure, which could lead to timber decay or reduced insulation performance. Joiners working with timber frame construction must understand the importance of correctly installing and sealing breather membranes, with particular attention to laps, penetrations, and junctions to maintain the weather barrier integrity."
  },
  {
    id: 'joinery-l2-building-construction14',
    question: "What is the typical thickness of mortar joints in UK brickwork?",
    options: ["5mm", "10mm", "15mm", "20mm"],
    correctAnswer: "10mm",
    explanation: "The typical thickness of mortar joints in UK brickwork is 10mm. This standard dimension is important for calculating brick quantities and overall wall heights when planning openings for doors and windows. A standard UK brick is 215mm × 102.5mm × 65mm, and with 10mm mortar joints, each brick course has a height of 75mm (65mm brick + 10mm mortar). For joinery work, understanding typical brick dimensions and joint thicknesses is essential when fitting window and door frames into openings, ensuring adequate space for flashings and damp-proofing, and when preparing openings in existing walls for new joinery installations."
  },
  {
    id: 'joinery-l2-building-construction15',
    question: "What is the purpose of a cavity tray in building construction?",
    options: ["To collect and drain rainwater that penetrates the outer leaf of a cavity wall", "To provide a path for electrical cables within cavity walls", "To improve thermal insulation in wall cavities", "To support heavy fixtures mounted on cavity walls"],
    correctAnswer: "To collect and drain rainwater that penetrates the outer leaf of a cavity wall",
    explanation: "A cavity tray is a waterproof barrier installed in a cavity wall to collect and direct rainwater that penetrates the outer leaf back to the exterior through weep holes. Cavity trays are typically installed above openings (doors and windows), at the junction of a roof abutting a wall, or where any element bridges the cavity. They prevent water from crossing the cavity to the inner leaf or running down inside the cavity to the structure below. For joiners, understanding cavity tray installation is essential when fitting or replacing windows and external doors, as improper installation or damage to cavity trays can lead to water ingress and consequent damage to internal finishes and timber components."
  },
  {
    id: 'joinery-l2-building-construction16',
    question: "In a traditional cut roof, what is the name of the triangular framework at the gable end?",
    options: ["Truss", "Gable ladder", "Verge", "Gable end truss or frame"],
    correctAnswer: "Gable end truss or frame",
    explanation: "In a traditional cut roof, the triangular framework at the gable end is called a gable end truss or frame. This structure provides support for the roof covering at the gable end and may also support the gable wall above ceiling level. Unlike standard trusses or rafters that span between walls, the gable end frame typically has additional components to provide fixing points for exterior cladding or brickwork. Joiners working on roof constructions need to understand how to construct and brace gable end frames properly, as they play an important role in the stability of the roof structure and provide weather protection at the building end."
  },
  {
    id: 'joinery-l2-building-construction17',
    question: "What is the purpose of a screed layer in a concrete floor construction?",
    options: ["To provide thermal insulation", "To create a smooth, level surface for floor finishes", "To prevent damp penetration", "To provide structural strength to the floor"],
    correctAnswer: "To create a smooth, level surface for floor finishes",
    explanation: "A screed layer in concrete floor construction is a thin layer of material (typically sand and cement or a self-leveling compound) applied over the structural concrete slab to create a smooth, level surface for floor finishes. Screeds typically range from 50mm to 75mm in thickness and provide the precise levels needed for floor coverings such as tiles, timber flooring, or carpet. For joiners, understanding screeds is important when fitting skirting boards (to account for different floor finish heights), installing door frames (ensuring correct threshold heights), and when planning floor transitions between different rooms or materials. Joiners should also be aware of screed drying times, as fitting floor finishes too early can trap moisture and cause problems."
  },
  {
    id: 'joinery-l2-building-construction18',
    question: "What is the minimum depth (going) of a stair tread in a private domestic staircase according to UK Building Regulations?",
    options: ["180mm", "220mm", "250mm", "300mm"],
    correctAnswer: "220mm",
    explanation: "According to UK Building Regulations Approved Document K, the minimum depth (going) of a stair tread in a private domestic staircase is 220mm, measured from the nosing of one tread to the nosing of the next. This requirement ensures adequate foot support when ascending or descending stairs. In addition to the minimum going, the regulations also specify maximum rise (220mm), minimum headroom (2m), and a relationship between rise and going expressed as 2R + G (which should be between 550mm and 700mm). Joiners must carefully calculate stair dimensions during design to ensure regulatory compliance while fitting the staircase into the available space."
  },
  {
    id: 'joinery-l2-building-construction19',
    question: "What is the main advantage of engineered timber I-joists over traditional solid timber joists in floor construction?",
    options: ["They are cheaper to produce", "They use less material while spanning greater distances with less deflection", "They are easier to handle on site", "They provide better sound insulation"],
    correctAnswer: "They use less material while spanning greater distances with less deflection",
    explanation: "The main advantage of engineered timber I-joists over traditional solid timber joists is that they use less material while spanning greater distances with less deflection. The I-shaped profile efficiently distributes material away from the neutral axis, providing excellent strength-to-weight ratio. Additional benefits include consistent quality (free from natural defects), dimensional stability (less prone to twisting, bowing, or shrinking), and the ability to accommodate services through pre-formed holes. For joiners, working with I-joists requires understanding specific fixing requirements, support details, and notching restrictions, as their engineered nature means they cannot be modified on site in the same way as solid timber joists."
  },
  {
    id: 'joinery-l2-building-construction20',
    question: "In building construction, what is meant by the term 'U-value'?",
    options: ["The measurement of ultraviolet radiation through windows", "The rate at which heat passes through a material or structure", "The universal standard for building materials", "The underground utility service rating"],
    correctAnswer: "The rate at which heat passes through a material or structure",
    explanation: "In building construction, the 'U-value' (or thermal transmittance) measures the rate at which heat passes through a material or structure, expressed in watts per square meter per degree Kelvin (W/m²K). Lower U-values indicate better thermal insulation properties. Building Regulations set maximum U-values for different building elements such as walls, floors, roofs, and windows to ensure energy efficiency. For joiners, understanding U-values is important when selecting external doors, windows, and other components that affect a building's thermal performance. When installing such elements, proper sealing and insulation around frames is critical to maintain the designed thermal performance and comply with regulations."
  },
  {
    id: 'joinery-l2-building-construction21',
    question: "What is the purpose of a wall tie in cavity wall construction?",
    options: ["To provide additional insulation", "To connect the inner and outer leaves of the wall while maintaining the cavity", "To strengthen corners in brickwork", "To support ceiling joists"],
    correctAnswer: "To connect the inner and outer leaves of the wall while maintaining the cavity",
    explanation: "In cavity wall construction, wall ties are used to connect the inner and outer leaves (or skins) of the wall while maintaining the cavity between them. Typically made of stainless steel, galvanized steel, or non-ferrous metals, wall ties provide structural stability by transferring lateral loads (such as wind pressure) between the two leaves while allowing them to move independently due to thermal expansion or contraction. Building Regulations specify tie placement patterns (typically 450mm vertically and 900mm horizontally, with additional ties around openings). For joiners, understanding wall tie positions is relevant when cutting openings in existing walls for doors or windows, as additional ties may be required around new openings to maintain structural integrity."
  },
  {
    id: 'joinery-l2-building-construction22',
    question: "What is the primary purpose of a damp-proof membrane (DPM) in a ground floor construction?",
    options: ["To provide thermal insulation", "To prevent ground moisture from rising into the floor structure", "To provide a level surface for floor finishes", "To increase the structural strength of the concrete"],
    correctAnswer: "To prevent ground moisture from rising into the floor structure",
    explanation: "The primary purpose of a damp-proof membrane (DPM) in ground floor construction is to prevent ground moisture from rising into the floor structure. Typically made of polyethylene sheet (1000 gauge/250 micron or heavier), the DPM is installed either below or above the concrete slab, depending on the floor construction type. In addition to preventing rising damp, it also blocks ground gases such as radon where present. Building Regulations require effective damp proofing in floors to prevent moisture problems. For joiners, understanding DPM location and integrity is important when installing timber flooring, skirting boards, or timber floor structures, as any breach in the DPM can lead to moisture damage in timber components."
  },
  {
    id: 'joinery-l2-building-construction23',
    question: "What is the name of the horizontal timber member at the base of a partition wall to which vertical studs are fixed?",
    options: ["Head plate", "Noggin", "Sole plate", "Joist"],
    correctAnswer: "Sole plate",
    explanation: "The horizontal timber member at the base of a partition wall to which vertical studs are fixed is called the sole plate (or bottom plate/floor plate). This timber component forms the foundation of the stud wall, providing a fixing surface for the vertical studs and transferring the wall load to the floor structure. The sole plate is typically the same width as the studs (usually 75mm or 100mm) and is fixed to the floor using appropriate fixings for the floor material. For suspended timber floors, the sole plate should be fixed to floor joists where possible. When constructing partition walls, joiners must ensure the sole plate is level, straight, and adequately fixed to provide a stable base for the wall structure."
  },
  {
    id: 'joinery-l2-building-construction24',
    question: "In timber frame construction, what is the typical spacing of vertical studs in load-bearing walls?",
    options: ["300mm centers", "400mm or 600mm centers", "900mm centers", "1200mm centers"],
    correctAnswer: "400mm or 600mm centers",
    explanation: "In timber frame construction, the typical spacing of vertical studs in load-bearing walls is 400mm or 600mm centers. These dimensions align with standard sheet material widths (1200mm), allowing for efficient use of sheathing boards, plasterboard, and insulation. The specific spacing chosen depends on structural calculations, considering factors such as wall height, loading conditions, and stud dimensions. The 400mm spacing provides greater strength but uses more timber, while 600mm spacing is more economical but may require larger section studs for some applications. Joiners constructing timber frame walls must follow design specifications exactly, as the structural integrity depends on proper stud spacing, fixings, and bracing."
  },
  {
    id: 'joinery-l2-building-construction25',
    question: "What is the purpose of a trimmer joist in floor or roof construction?",
    options: ["To support shortened joists around an opening", "To strengthen the junction between walls and floors", "To provide additional sound insulation", "To create a decorative feature around ceiling lights"],
    correctAnswer: "To support shortened joists around an opening",
    explanation: "A trimmer joist in floor or roof construction is used to support shortened joists (known as trimmed joists) around an opening such as a stairwell, chimney breast, or rooflight. Trimmer joists run perpendicular to the main joists and are typically doubled up to carry the additional load from the trimmed joists that cannot extend to the normal bearing points. Together with the trimmed joists and the trimming joist (which runs parallel to the main joists), they form a framed opening in the structure. Joiners must understand how to correctly size and fix these components when creating or modifying floor or roof openings, as they are critical structural elements that maintain the integrity of the floor or roof while accommodating necessary openings."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-building-construction', 'items', q.id), {
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
