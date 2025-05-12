// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Surveying.ts

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

// ✅ Joinery Level 3 Site Surveying & Setting Out Questions
const questions = [
  {
    id: 'joinery-l3-surveying1',
    question: "What is the primary purpose of a site survey for joinery installations?",
    options: ["To meet the client and discuss payment terms", "To assess soil conditions for foundation work", "To obtain accurate measurements and identify site conditions that may affect joinery manufacture and installation", "To choose the color scheme for the joinery"],
    correctAnswer: "To obtain accurate measurements and identify site conditions that may affect joinery manufacture and installation",
    explanation: "A site survey obtains accurate measurements and identifies site conditions affecting joinery manufacture and installation. This information ensures joinery is correctly sized, designed to accommodate site conditions, and that any issues (access restrictions, uneven surfaces, moisture problems) are identified before manufacturing begins, preventing costly errors and delays."
  },
  {
    id: 'joinery-l3-surveying2',
    question: "Why is it important to check for plumb, level and square when surveying for joinery installations?",
    options: ["These checks are unnecessary as all buildings are constructed perfectly", "Only for aesthetic reasons with no practical importance", "To identify any deviations from true vertical, horizontal, and 90° angles that will affect joinery fit and function", "Only to comply with regulations, with no practical benefit"],
    correctAnswer: "To identify any deviations from true vertical, horizontal, and 90° angles that will affect joinery fit and function",
    explanation: "Checking for plumb, level and square identifies deviations from true vertical, horizontal, and 90° angles that affect joinery fit and function. Few buildings have perfectly true surfaces, so identifying these irregularities allows for adjustments in design and manufacture, ensuring joinery fits correctly while maintaining proper operation and appearance despite irregular site conditions."
  },
  {
    id: 'joinery-l3-surveying3',
    question: "What equipment would typically be used to establish a level reference line across a room for joinery installation?",
    options: ["Measuring tape only", "Plumb bob", "Laser level or water level", "Protractor"],
    correctAnswer: "Laser level or water level",
    explanation: "Laser levels or water levels establish level reference lines across rooms for joinery installation. Laser levels project perfectly level lines across surfaces, while water levels use the principle that water finds its own level between connected tubes. Both provide accurate horizontal references regardless of room size, ensuring joinery elements like kitchen units and built-in furniture are installed level."
  },
  {
    id: 'joinery-l3-surveying4',
    question: "When measuring a room for fitted joinery, why is it essential to measure the diagonals of the room?",
    options: ["To determine the center point of the room only", "To calculate the floor area", "To check if the room is square by comparing diagonal measurements", "This measurement is not essential for joinery work"],
    correctAnswer: "To check if the room is square by comparing diagonal measurements",
    explanation: "Measuring room diagonals checks if the room is square by comparing these measurements. In a perfectly rectangular room, diagonals are equal; any difference indicates the room is not square. This information is crucial for fitted joinery design, as it determines whether adjustments are needed to accommodate out-of-square conditions while maintaining a visually acceptable appearance."
  },
  {
    id: 'joinery-l3-surveying5',
    question: "What is the 3-4-5 method used for in setting out joinery work?",
    options: ["A pricing calculation method", "A method for determining material quantities", "A method for establishing a right angle (90°) using the Pythagorean theorem", "A method for determining ceiling heights"],
    correctAnswer: "A method for establishing a right angle (90°) using the Pythagorean theorem",
    explanation: "The 3-4-5 method establishes a right angle (90°) using the Pythagorean theorem. By creating a triangle with sides in the ratio 3:4:5 (or multiples like 6:8:10), a perfect right angle is formed at the corner between the 3 and 4 sides. This practical technique ensures accurate right angles when setting out joinery installations without specialized equipment."
  },
  {
    id: 'joinery-l3-surveying6',
    question: "What is the purpose of a 'datum point' in site setting out for joinery work?",
    options: ["The date when work needs to be completed", "A fixed reference point from which all measurements and levels are taken", "A point indicating where materials should be delivered", "The central point of a room"],
    correctAnswer: "A fixed reference point from which all measurements and levels are taken",
    explanation: "A datum point is a fixed reference point from which all measurements and levels are taken. This established point provides consistency throughout the project, ensuring all joinery elements relate correctly to each other and the building, even when installed in different phases. Typically, a datum is a known height like a finished floor level or a marked reference on walls."
  },
  {
    id: 'joinery-l3-surveying7',
    question: "Why is it important to check for concealed services (electrical, plumbing, etc.) when surveying for fixed joinery installations?",
    options: ["Only for cost estimation purposes", "This is the electrician's responsibility, not the joiner's", "To avoid damaging or interfering with services during installation, creating safety hazards or functionality problems", "Only if specifically requested by the client"],
    correctAnswer: "To avoid damaging or interfering with services during installation, creating safety hazards or functionality problems",
    explanation: "Checking for concealed services helps avoid damaging or interfering with them during installation, preventing safety hazards or functionality problems. Identifying electrical cables, water pipes, heating elements, and ventilation before fixing joinery to walls or floors is essential to prevent dangerous and costly incidents. Methods include using service detectors, consulting building plans, and checking visible evidence of service runs."
  },
  {
    id: 'joinery-l3-surveying8',
    question: "What should be recorded about existing architectural features during a joinery survey?",
    options: ["Only their approximate dimensions", "Only whether they will be removed", "Their position, dimensions, condition, and whether they need to be preserved or integrated with new joinery", "Their financial value only"],
    correctAnswer: "Their position, dimensions, condition, and whether they need to be preserved or integrated with new joinery",
    explanation: "During a joinery survey, record existing architectural features' position, dimensions, condition, and whether they need preservation or integration with new joinery. This includes items like decorative moldings, paneling, or built-in elements that may affect designs or installation methods. Detailed documentation ensures these features are properly considered in the joinery design and manufacturing process."
  },
  {
    id: 'joinery-l3-surveying9',
    question: "When measuring for replacement windows, why is it important to take multiple measurements of the width and height of each opening?",
    options: ["Only to double-check the initial measurement", "Only to calculate an average size", "To identify the smallest dimensions, as openings may not be perfectly rectangular", "Multiple measurements are unnecessary"],
    correctAnswer: "To identify the smallest dimensions, as openings may not be perfectly rectangular",
    explanation: "Taking multiple width and height measurements of window openings identifies the smallest dimensions, as openings are rarely perfectly rectangular. Typically, measure at the top, middle, and bottom for width and both sides and center for height. Manufacturing to the smallest dimensions ensures the window will fit the opening, with any irregularities accommodated through adjustable fitting techniques."
  },
  {
    id: 'joinery-l3-surveying10',
    question: "What information about floor levels should be recorded when surveying for fitted joinery that spans multiple rooms?",
    options: ["Only the floor covering type", "Only whether the floor is concrete or timber", "Relative height differences between rooms to ensure continuous joinery elements can be properly aligned", "Floor levels don't affect joinery installation"],
    correctAnswer: "Relative height differences between rooms to ensure continuous joinery elements can be properly aligned",
    explanation: "When surveying for fitted joinery spanning multiple rooms, record relative height differences between rooms to ensure continuous elements can be properly aligned. These variations affect design decisions for items like continuous worktops, cabinets, or built-in storage. Identifying level differences early allows for appropriate adjustments during manufacture rather than problematic modifications during installation."
  },
  {
    id: 'joinery-l3-surveying11',
    question: "What is the purpose of using a digital moisture meter during a site survey for joinery installation?",
    options: ["To measure room humidity only", "To check if timber structures are wet or dry to the touch", "To measure moisture content in existing structures, identifying potential damp issues that could affect new joinery", "This tool is not used during joinery surveys"],
    correctAnswer: "To measure moisture content in existing structures, identifying potential damp issues that could affect new joinery",
    explanation: "Digital moisture meters measure moisture content in existing structures, identifying potential damp issues that could affect new joinery. Excessive moisture in surrounding walls, floors, or existing timber can compromise new joinery through warping, decay, or finish failures. Identifying these issues during surveying allows for remediation before installation or specification of appropriate materials and treatments."
  },
  {
    id: 'joinery-l3-surveying12',
    question: "Why is it important to record the condition and construction of existing walls when surveying for wall-mounted joinery?",
    options: ["Only for decorative purposes", "Only to determine if they need painting", "To determine appropriate fixing methods and whether reinforcement is needed to support the joinery", "This information is not relevant to joinery installation"],
    correctAnswer: "To determine appropriate fixing methods and whether reinforcement is needed to support the joinery",
    explanation: "Recording wall condition and construction determines appropriate fixing methods and whether reinforcement is needed to support joinery. Different wall types (solid masonry, stud partitions, block, lath and plaster) require specific fixings. Assessing condition identifies issues like crumbling plaster or hollow areas that might compromise fixings, enabling planning for appropriate anchoring solutions or additional support structures."
  },
  {
    id: 'joinery-l3-surveying13',
    question: "What is meant by the term 'making good' in the context of a joinery installation survey?",
    options: ["Manufacturing high-quality joinery products", "Ensuring the joinery is properly secured", "Repairing or finishing the surrounding building fabric after joinery installation", "Checking that measurements are accurate"],
    correctAnswer: "Repairing or finishing the surrounding building fabric after joinery installation",
    explanation: "In joinery installation, 'making good' refers to repairing or finishing the surrounding building fabric after installation. This includes filling gaps between joinery and walls, touching up paintwork, replacing disturbed trim, and ensuring the interface between joinery and building leaves a neat, finished appearance. Surveying should identify making good requirements to include in estimates and planning."
  },
  {
    id: 'joinery-l3-surveying14',
    question: "When surveying a site for a staircase installation, which of these measurements is most critical?",
    options: ["The color of existing stairs", "The exact floor-to-floor height (total rise)", "The wall covering materials only", "The number of windows in the stairwell"],
    correctAnswer: "The exact floor-to-floor height (total rise)",
    explanation: "When surveying for staircase installation, the exact floor-to-floor height (total rise) is most critical. This fundamental dimension determines the number and size of risers, directly affecting compliance with building regulations that specify maximum riser heights and minimum tread depths. Even small errors in this measurement can result in a staircase that doesn't fit the opening or fails to meet required standards."
  },
  {
    id: 'joinery-l3-surveying15',
    question: "Why should environmental conditions be recorded during a site survey for internal joinery?",
    options: ["Only to determine if working conditions are comfortable", "Only to calculate heating requirements", "To assess if the conditions may cause timber movement or finishing problems, and whether acclimatization is needed", "Environmental conditions don't affect joinery work"],
    correctAnswer: "To assess if the conditions may cause timber movement or finishing problems, and whether acclimatization is needed",
    explanation: "Environmental conditions should be recorded to assess if they may cause timber movement or finishing problems, and whether acclimatization is needed. Factors like heating systems, humidity levels, and temperature variations affect timber's moisture content in service. Understanding these conditions helps specify appropriate materials, design details that accommodate movement, and determine if joinery should acclimatize before installation."
  },
  {
    id: 'joinery-l3-surveying16',
    question: "What tool would typically be used to check if a wall is plumb (perfectly vertical)?",
    options: ["Tape measure", "Laser square", "Spirit level or digital level with plumb function", "Trammel"],
    correctAnswer: "Spirit level or digital level with plumb function",
    explanation: "A spirit level or digital level with plumb function checks if a wall is perfectly vertical. Traditional spirit levels use a bubble in a liquid-filled vial that centers when the tool is perfectly vertical, while digital versions provide a numerical reading of deviation from plumb. For large areas or higher precision, a laser level with plumb function can project a vertical reference line."
  },
  {
    id: 'joinery-l3-surveying17',
    question: "When setting out for a fitted kitchen, what is the standard height for the top of base units in the UK?",
    options: ["600mm from floor level", "720mm from floor level", "900mm from floor level", "1200mm from floor level"],
    correctAnswer: "900mm from floor level",
    explanation: "The standard height for the top of kitchen base units in the UK is 900mm from floor level. This dimension creates a standard worktop height suitable for most adults. When setting out kitchen installations, this height is typically marked around the room as a level reference line from which base units are positioned. The height may be adjusted slightly for specific client requirements or non-standard applications."
  },
  {
    id: 'joinery-l3-surveying18',
    question: "What information about access routes should be recorded during a site survey for large joinery items?",
    options: ["Only the site address", "Only the parking arrangements", "Dimensions of doorways, corridors, staircases and any obstacles that might affect delivery of materials or completed items", "Access information isn't relevant to joinery work"],
    correctAnswer: "Dimensions of doorways, corridors, staircases and any obstacles that might affect delivery of materials or completed items",
    explanation: "During site surveys for large joinery items, record dimensions of doorways, corridors, staircases, and obstacles affecting delivery of materials or completed items. This critical information determines if large items can be delivered assembled or must be manufactured in sections and assembled on site. Identifying access limitations early prevents designing items that cannot be transported to their final location."
  },
  {
    id: 'joinery-l3-surveying19',
    question: "What is the purpose of a laser distance meter in joinery surveying?",
    options: ["Only to impress clients with technology", "Only to determine room temperature", "To quickly and accurately measure distances, particularly in large spaces or hard-to-reach areas", "This tool is not used in joinery work"],
    correctAnswer: "To quickly and accurately measure distances, particularly in large spaces or hard-to-reach areas",
    explanation: "Laser distance meters quickly and accurately measure distances, particularly in large spaces or hard-to-reach areas. These digital tools use laser beams to measure distances with precision of ±1-2mm, allowing single-person operation. They're especially valuable for measuring long distances, heights, diagonal dimensions, or calculating areas and volumes, improving surveying efficiency and accuracy."
  },
  {
    id: 'joinery-l3-surveying20',
    question: "When setting out for a new door opening in an existing wall, what should be checked first?",
    options: ["Only the paint color of the wall", "Only the thickness of the wall", "Whether the wall is load-bearing and if there are any services within the wall", "Only the existing floor covering"],
    correctAnswer: "Whether the wall is load-bearing and if there are any services within the wall",
    explanation: "When setting out a new door opening, first check whether the wall is load-bearing and if any services exist within it. Load-bearing walls require structural support above the opening (lintel), while services (electrical cables, pipes, etc.) may need rerouting. These fundamental considerations affect the feasibility, method, cost, and safety of creating the opening."
  },
  {
    id: 'joinery-l3-surveying21',
    question: "When measuring for fitted wardrobes, why is it important to check the floor to ceiling height at multiple points?",
    options: ["Only to calculate the average height", "Only to determine if the ceiling needs repainting", "To identify variations in ceiling height that will affect the fitting and appearance of the wardrobes", "Multiple measurements are unnecessary"],
    correctAnswer: "To identify variations in ceiling height that will affect the fitting and appearance of the wardrobes",
    explanation: "When measuring for fitted wardrobes, check floor to ceiling height at multiple points to identify variations that will affect fitting and appearance. Ceilings rarely maintain a perfectly level plane across a room. Identifying these variations enables design decisions about how to accommodate them—whether using a scribed top, a shadow gap, or a stepped top design to maintain clean lines while adapting to the ceiling contours."
  },
  {
    id: 'joinery-l3-surveying22',
    question: "What is the purpose of taking photographs during a site survey for joinery work?",
    options: ["Only for marketing purposes", "Only to show the client the current condition", "To provide visual reference of site conditions, features, and details that supplement written measurements and notes", "Photographs are not useful for joinery surveys"],
    correctAnswer: "To provide visual reference of site conditions, features, and details that supplement written measurements and notes",
    explanation: "Taking photographs during site surveys provides visual reference of conditions, features, and details supplementing written measurements and notes. These images document existing conditions, capture complex details that are difficult to describe, show context for measurements, help identify potential issues when designing, and provide reference during manufacturing and installation, reducing costly return visits for verification."
  },
  {
    id: 'joinery-l3-surveying23',
    question: "What is a 'trammel' and how is it used in joinery setting out?",
    options: ["A type of spirit level", "A beam compass used for marking or drawing large arcs and circles", "A specialized hammer", "A digital measuring device"],
    correctAnswer: "A beam compass used for marking or drawing large arcs and circles",
    explanation: "A trammel is a beam compass used for marking or drawing large arcs and circles. It consists of an adjustable beam with a fixed point at one end and a marking point at the other, allowing accurate drawing of curves with larger radii than possible with conventional compasses. In joinery, it's used for setting out curved components or layouts where a consistent radius is required."
  },
  {
    id: 'joinery-l3-surveying24',
    question: "When surveying for replacement skirting boards, what measurements and information should be recorded?",
    options: ["Just the length of walls", "Just the height of existing skirting", "Height, profile, thickness, and length required, noting any special cuts for existing features", "Just the color of existing skirting"],
    correctAnswer: "Height, profile, thickness, and length required, noting any special cuts for existing features",
    explanation: "When surveying for replacement skirting, record height, profile, thickness, and required length, noting special cuts for existing features. Document any profile matching requirements, corner treatments (mitered or scribed), transitions between different floor levels, and accommodations needed for features like pipes, radiators, or built-in furniture to ensure proper manufacture and installation."
  },
  {
    id: 'joinery-l3-surveying25',
    question: "What is the purpose of establishing a 'setting out line' for joinery installation?",
    options: ["To create a decorative feature", "To mark where tools should be set out", "To provide a common reference line from which multiple elements can be accurately positioned", "Setting out lines are not used in joinery work"],
    correctAnswer: "To provide a common reference line from which multiple elements can be accurately positioned",
    explanation: "Setting out lines provide common reference lines from which multiple elements can be accurately positioned. These marked lines (often using chalk line, laser, or string line) establish key positions like the face of cabinets, position of door frames, or alignment of built-in furniture. They create consistent reference points for positioning multiple components, ensuring proper alignment and spacing throughout installation."
  },
  {
    id: 'joinery-l3-surveying26',
    question: "Why is it important to check floor loadings when surveying for heavy joinery installations like large bookcases?",
    options: ["Only to determine transportation requirements", "Only to calculate installation team size", "To ensure the floor structure can safely support the weight of the joinery and its contents", "Floor loading is not relevant to joinery installation"],
    correctAnswer: "To ensure the floor structure can safely support the weight of the joinery and its contents",
    explanation: "Checking floor loadings ensures the floor structure can safely support the weight of joinery and its contents. Heavy items like large bookcases, particularly when filled with books, create significant concentrated loads. Assessing the floor construction, span direction, and support conditions determines if reinforcement is needed or if the joinery design should be modified to distribute weight more effectively."
  },
  {
    id: 'joinery-l3-surveying27',
    question: "What is the significance of checking for true horizontal and vertical when setting out for door frames?",
    options: ["It affects only the appearance but not the function", "It only matters for external doors", "It ensures the door will hang correctly without binding and will close properly without swinging open or shut", "It is unnecessary as doors can be adjusted after installation"],
    correctAnswer: "It ensures the door will hang correctly without binding and will close properly without swinging open or shut",
    explanation: "Checking for true horizontal and vertical when setting out door frames ensures doors will hang correctly without binding and close properly without swinging open or shut. A frame that isn't plumb and level will cause doors to bind against the frame, operate improperly, put stress on hinges, and potentially damage the door over time. These fundamental checks are essential for proper functioning."
  },
  {
    id: 'joinery-l3-surveying28',
    question: "What is the purpose of a profile gauge in joinery surveying?",
    options: ["To measure angles only", "To measure distances in tight spaces", "To accurately copy irregular shapes, moldings, or profiles for reproduction", "To check for level surfaces"],
    correctAnswer: "To accurately copy irregular shapes, moldings, or profiles for reproduction",
    explanation: "Profile gauges accurately copy irregular shapes, moldings, or profiles for reproduction. These tools consist of numerous small pins that conform to contours when pressed against a profile. They're invaluable for capturing the exact shape of existing moldings, complex shapes, or irregular surfaces that need matching or complementing, transferring profiles to templates or directly to material for cutting."
  },
  {
    id: 'joinery-l3-surveying29',
    question: "When surveying for kitchen worktops, why is it important to take diagonal measurements of base units?",
    options: ["Only to determine the amount of material needed", "Only to ensure the kitchen is symmetrical", "To verify that corners are square for accurate worktop cutting and proper fitting", "Diagonal measurements are not necessary for worktop installation"],
    correctAnswer: "To verify that corners are square for accurate worktop cutting and proper fitting",
    explanation: "When surveying for kitchen worktops, diagonal measurements verify corners are square for accurate cutting and proper fitting. If base units aren't perfectly rectangular (equal diagonals), worktops cut to assumed right angles won't fit correctly. These measurements enable precise templates that account for any irregularities, ensuring proper joins at corners and perfect fit against walls."
  },
  {
    id: 'joinery-l3-surveying30',
    question: "What should be considered regarding existing architectural features when surveying for fitted joinery?",
    options: ["They can always be removed if inconvenient", "They are never relevant to joinery installation", "Their position, dimensions, historical significance and whether they need to be preserved or incorporated into the design", "Only their monetary value matters"],
    correctAnswer: "Their position, dimensions, historical significance and whether they need to be preserved or incorporated into the design",
    explanation: "When surveying for fitted joinery, consider existing architectural features' position, dimensions, historical significance, and whether they need preservation or incorporation into the design. Features like decorative moldings, cornices, panels, or period features may have historical value or protection in listed buildings. Detailed documentation enables designs that respect and complement these elements."
  },
  {
    id: 'joinery-l3-surveying31',
    question: "When setting out for a built-in window seat, what is the standard seat height to use as a starting point?",
    options: ["300mm from floor level", "450mm from floor level", "750mm from floor level", "900mm from floor level"],
    correctAnswer: "450mm from floor level",
    explanation: "When setting out for a built-in window seat, 450mm from floor level is the standard seat height to use as a starting point. This dimension (approximately 18 inches) aligns with typical chair height, providing comfortable seating for most adults. The height may be adjusted based on client requirements, window sill height, or specific design factors."
  },
  {
    id: 'joinery-l3-surveying32',
    question: "When setting out a curved staircase, what special equipment might be required?",
    options: ["Only standard measuring tape", "Only a spirit level", "Flexible curve, trammel, or laser projection equipment", "No special equipment is needed for curved staircases"],
    correctAnswer: "Flexible curve, trammel, or laser projection equipment",
    explanation: "Setting out curved staircases requires specialized equipment like flexible curves, trammels, or laser projection equipment. Flexible curves create smooth, adjustable curves for drawing large radii; trammels plot consistent radius arcs; and laser projection equipment can display curved layout lines on floors and walls. These tools enable accurate transfer of curved designs from drawings to full-size setting out."
  },
  {
    id: 'joinery-l3-surveying33',
    question: "Why is it important to check the squareness of existing openings when surveying for new windows or doors?",
    options: ["It only affects the appearance but not the function", "Only for billing purposes", "To determine whether standard sized products will fit or if custom units are required", "The squareness of openings is not relevant"],
    correctAnswer: "To determine whether standard sized products will fit or if custom units are required",
    explanation: "Checking existing opening squareness determines whether standard sized products will fit or custom units are required. If openings are significantly out of square, standard rectangular windows or doors won't fit correctly without leaving uneven gaps. This assessment informs decisions about using standard products with adjustable installation techniques or manufacturing custom units specifically for the irregular opening."
  },
  {
    id: 'joinery-l3-surveying34',
    question: "What is the purpose of a 'story rod' in joinery setting out?",
    options: ["A rod used to tell the history of the building", "A measuring stick marked with critical dimensions that serves as a physical template", "A rod used to support joinery during installation", "A tool for mixing adhesives"],
    correctAnswer: "A measuring stick marked with critical dimensions that serves as a physical template",
    explanation: "A story rod is a measuring stick marked with critical dimensions that serves as a physical template. This traditional setting out tool—typically a straight wooden strip—is marked with exact measurements for key elements like shelf heights, door positions, or panel divisions. It provides a physical reference that can be held against the work area, ensuring consistent dimensions without repeated measuring."
  },
  {
    id: 'joinery-l3-surveying35',
    question: "When surveying for a replacement staircase, why is it important to check the headroom along the entire stair path?",
    options: ["Only to determine the ceiling height", "Only for aesthetic considerations", "To ensure the staircase will comply with Building Regulations for minimum headroom throughout its length", "Headroom measurements are only needed at the top of the stairs"],
    correctAnswer: "To ensure the staircase will comply with Building Regulations for minimum headroom throughout its length",
    explanation: "When surveying for replacement staircases, check headroom along the entire stair path to ensure compliance with Building Regulations for minimum headroom throughout its length. UK regulations require 2m minimum headroom measured vertically from the pitch line. Checking this dimension at multiple points identifies any overhead obstructions that might affect design or necessitate alterations to achieve compliant headroom."
  },
  {
    id: 'joinery-l3-surveying36',
    question: "What should be recorded about the existing substrate when surveying for wall paneling installation?",
    options: ["Only its color", "Only whether it's painted or wallpapered", "Its composition, condition, flatness, and suitability for fixings", "Wall substrate information is not relevant for paneling"],
    correctAnswer: "Its composition, condition, flatness, and suitability for fixings",
    explanation: "When surveying for wall paneling, record the substrate's composition, condition, flatness, and suitability for fixings. This information determines appropriate fixing methods, whether preparatory work is needed, if battening is required to create a flat surface, and how the paneling will interface with the existing structure. Different substrates (plaster, masonry, drywall) require specific fixings for secure installation."
  },
  {
    id: 'joinery-l3-surveying37',
    question: "What is the primary purpose of creating templates during site surveys for complex joinery installations?",
    options: ["Only to impress clients with thoroughness", "Only to provide entertainment for site workers", "To accurately capture irregular shapes, curves, or complex features that cannot be adequately represented by measurements alone", "Templates are never necessary in joinery work"],
    correctAnswer: "To accurately capture irregular shapes, curves, or complex features that cannot be adequately represented by measurements alone",
    explanation: "Templates accurately capture irregular shapes, curves, or complex features that cannot be adequately represented by measurements alone. Made from materials like cardboard, hardboard, or plastic sheet, templates provide exact physical representations of shapes to be reproduced, transferred directly to materials for cutting. They're invaluable for irregular wall profiles, curved surfaces, or complex interfaces between joinery and existing structures."
  },
  {
    id: 'joinery-l3-surveying38',
    question: "When surveying for a run of fitted units, what is the significance of checking for variations in the floor level?",
    options: ["Only to determine if carpet needs replacement", "Only to estimate cleaning requirements", "To determine whether adjustable legs are needed and if scribing or other accommodations will be required", "Floor level variations don't affect fitted units"],
    correctAnswer: "To determine whether adjustable legs are needed and if scribing or other accommodations will be required",
    explanation: "When surveying for fitted units, checking floor level variations determines whether adjustable legs are needed and if scribing or other accommodations will be required. Uneven floors affect how units sit, potentially causing doors and drawers to misalign. This information informs decisions about incorporating height-adjustable feet, creating a level batten framework, or designing units with allowances for scribing to the floor."
  },
  {
    id: 'joinery-l3-surveying39',
    question: "What is meant by 'making templates in situ' in joinery surveying?",
    options: ["Making measurements while sitting down", "Creating scale drawings on site", "Creating full-size patterns on site that exactly match the features or spaces to be fitted", "Checking measurements twice"],
    correctAnswer: "Creating full-size patterns on site that exactly match the features or spaces to be fitted",
    explanation: "Making templates in situ means creating full-size patterns on site that exactly match the features or spaces to be fitted. This technique involves cutting template material to precisely fit against irregular surfaces, curves, or complex junctions, creating an exact physical record of the shape. Templates made on site capture the actual dimensions and irregularities more accurately than measurements alone."
  },
  {
    id: 'joinery-l3-surveying40',
    question: "Which of these would be the most appropriate tool for measuring the exact angle of a non-standard corner when setting out for fitted joinery?",
    options: ["Tape measure", "Spirit level", "Digital angle finder or adjustable bevel", "Plumb bob"],
    correctAnswer: "Digital angle finder or adjustable bevel",
    explanation: "A digital angle finder or adjustable bevel is most appropriate for measuring exact angles of non-standard corners when setting out fitted joinery. Digital angle finders provide precise numerical readings of angles, while adjustable bevels capture the angle physically for transfer to materials. These tools accurately record non-90° corners for proper scribing, mitering, or template creation."
  },
  {
    id: 'joinery-l3-surveying41',
    question: "When setting out for bespoke shelving, what is the standard depth typically used for bookshelves as a starting point?",
    options: ["150mm", "230mm", "300mm", "450mm"],
    correctAnswer: "230mm",
    explanation: "When setting out bespoke shelving, 230mm (approximately 9 inches) is the standard depth typically used for bookshelves as a starting point. This dimension accommodates most books, including hardbacks, while not protruding too far into the room. Adjustments may be made based on specific storage requirements—deeper for large format books, shallower for paperbacks or display items."
  },
  {
    id: 'joinery-l3-surveying42',
    question: "Why is it important to record information about heating sources and ventilation when surveying for fitted joinery?",
    options: ["Only to determine working conditions during installation", "Only to plan tea breaks", "To ensure joinery doesn't obstruct airflow, heat sources, or access for maintenance", "This information is not relevant to joinery work"],
    correctAnswer: "To ensure joinery doesn't obstruct airflow, heat sources, or access for maintenance",
    explanation: "Recording information about heating sources and ventilation ensures joinery doesn't obstruct airflow, heat sources, or access for maintenance. Fitted joinery must accommodate radiators, vents, HVAC grilles, and service access points without causing overheating, poor ventilation, or preventing essential maintenance. This information influences design decisions about cutouts, clearances, and ventilation grilles within the joinery."
  },
  {
    id: 'joinery-l3-surveying43',
    question: "What should be the primary consideration when setting out for joinery that includes integrated appliances?",
    options: ["Only the brand name of appliances", "Only the color of appliances", "The exact dimensions and ventilation requirements of the specific appliance models", "Appliance considerations are the responsibility of the electrician"],
    correctAnswer: "The exact dimensions and ventilation requirements of the specific appliance models",
    explanation: "When setting out joinery with integrated appliances, the primary consideration should be the exact dimensions and ventilation requirements of specific appliance models. Each manufacturer and model has precise cutout dimensions, clearance requirements, and ventilation needs. Detailed documentation of these specifications ensures joinery will properly house appliances while meeting their operational and safety requirements."
  },
  {
    id: 'joinery-l3-surveying44',
    question: "What is the purpose of a distometer in joinery surveying?",
    options: ["To measure moisture content in timber", "To check if timber is distorted", "To measure distances using laser technology", "To calculate the area of irregular shapes"],
    correctAnswer: "To measure distances using laser technology",
    explanation: "A distometer (laser distance meter) measures distances using laser technology. This electronic device emits a laser beam that reflects off surfaces, calculating distance based on the time taken for the beam to return. Distometers provide quick, accurate measurements—especially valuable for long distances, heights, or hard-to-reach areas—with precision typically within ±1-2mm, displaying results digitally."
  },
  {
    id: 'joinery-l3-surveying45',
    question: "When setting out for a new staircase, what is the maximum rise (height) of each step permitted under UK Building Regulations?",
    options: ["150mm", "180mm", "220mm", "250mm"],
    correctAnswer: "220mm",
    explanation: "When setting out for a new staircase, the maximum rise (height) of each step permitted under UK Building Regulations is 220mm. This maximum dimension helps ensure stairs are safe and comfortable to use. During setting out, the total rise (floor-to-floor height) is divided to calculate the individual riser height, which must not exceed this maximum while maintaining consistency between all risers."
  },
  {
    id: 'joinery-l3-surveying46',
    question: "What should be recorded about doors and windows when surveying an existing building for renovation joinery work?",
    options: ["Only their color", "Only whether they will be replaced", "Their dimensions, operation direction, condition, and any period features worth preserving", "Only their approximate age"],
    correctAnswer: "Their dimensions, operation direction, condition, and any period features worth preserving",
    explanation: "When surveying for renovation joinery, record doors and windows' dimensions, operation direction, condition, and period features worth preserving. Document sizes, opening directions, frame details, hardware, glazing patterns, and historical elements. This comprehensive information guides decisions about restoration, replacement, or modification while ensuring new elements integrate appropriately with the building's character."
  },
  {
    id: 'joinery-l3-surveying47',
    question: "What is meant by 'working to face' when setting out joinery installations?",
    options: ["Working with the most attractive face of the timber", "Setting out dimensions from a fixed reference face or line", "Working directly in front of the installation area", "Focusing only on the visible surfaces"],
    correctAnswer: "Setting out dimensions from a fixed reference face or line",
    explanation: "'Working to face' means setting out dimensions from a fixed reference face or line. This technique establishes a consistent datum from which measurements are taken, rather than measuring from different points. For example, measuring cabinet positions from the face of a wall rather than the back of the cabinet ensures consistent positioning even if cabinet depths vary."
  },
  {
    id: 'joinery-l3-surveying48',
    question: "What is the purpose of checking for 'dead' level as opposed to 'visual' level when setting out horizontal joinery elements?",
    options: ["Dead level is always perfectly horizontal according to a spirit level; visual level may be slightly adjusted to appear correct to the eye", "Dead level means the installation is completely stationary", "Dead level refers to outdated leveling techniques", "There is no difference between these terms"],
    correctAnswer: "Dead level is always perfectly horizontal according to a spirit level; visual level may be slightly adjusted to appear correct to the eye",
    explanation: "Dead level is perfectly horizontal according to a spirit level; visual level may be slightly adjusted to appear correct to the eye. In some situations, particularly with uneven adjacent surfaces, a perfectly level installation might appear visually off-level. Understanding this distinction helps decisions about when to maintain true horizontal (functional situations) versus slight adjustments for visual harmony."
  },
  {
    id: 'joinery-l3-surveying49',
    question: "When setting out for a run of units against a wall, why might you offset the face of the units slightly from the wall?",
    options: ["Only to make cleaning easier", "Only to reduce material costs", "To accommodate wall irregularities while maintaining a straight run of units", "This would never be appropriate in professional joinery"],
    correctAnswer: "To accommodate wall irregularities while maintaining a straight run of units",
    explanation: "When setting out units against a wall, offsetting the face slightly accommodates wall irregularities while maintaining a straight run of units. Few walls are perfectly straight; setting units to follow wall contours would result in a visibly wavy appearance. Creating a small, consistent gap that can be scribed or filled allows units to maintain perfect alignment regardless of wall irregularities."
  },
  {
    id: 'joinery-l3-surveying50',
    question: "What should be recorded about existing ceiling details when surveying for floor-to-ceiling joinery?",
    options: ["Only the ceiling color", "Only whether the ceiling is painted or has tiles", "Height variations, coving/cornice details, and any services (lights, vents) that may affect the joinery", "Ceiling details are not relevant to joinery work"],
    correctAnswer: "Height variations, coving/cornice details, and any services (lights, vents) that may affect the joinery",
    explanation: "When surveying for floor-to-ceiling joinery, record height variations, coving/cornice details, and services (lights, vents) affecting the joinery. Document ceiling height variations, presence of decorative moldings that must be accommodated or matched, and position of lights, vents, or alarms that might need integration within the joinery. This information ensures proper fitting with appropriate allowances for interfaces."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-surveying', 'items', q.id), {
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