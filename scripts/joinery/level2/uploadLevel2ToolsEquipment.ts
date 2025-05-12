// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2ToolsEquipment.ts

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

// ✅ Joinery Level 2 Tools & Equipment Questions
const questions = [
  {
    id: 'joinery-l2-tools-equipment1',
    question: "What is the primary purpose of a marking gauge in joinery?",
    options: ["To measure the moisture content of timber", "To mark parallel lines at a set distance from an edge", "To check if a surface is level", "To measure the hardness of timber"],
    correctAnswer: "To mark parallel lines at a set distance from an edge",
    explanation: "The primary purpose of a marking gauge in joinery is to mark parallel lines at a set distance from an edge. This essential hand tool consists of a stock (or fence) that slides along a beam and a marking pin or knife that scribes a line on the workpiece. Marking gauges are particularly important for layout work when producing joinery, enabling precise marking of shoulders for tenons, depths for housing joints, and thicknesses for rebates. While traditional marking gauges use a pin that scratches the surface, modern variants often use a knife that creates a cleaner, more precise line that's easier to follow with cutting tools. The ability to produce accurate, consistent marking is fundamental to quality joinery work."
  },
  {
    id: 'joinery-l2-tools-equipment2',
    question: "Which of the following saws is designed specifically for cutting across the grain of timber?",
    options: ["Tenon saw", "Rip saw", "Cross-cut saw", "Bow saw"],
    correctAnswer: "Cross-cut saw",
    explanation: "A cross-cut saw is designed specifically for cutting across the grain of timber. Its teeth are shaped like small knives arranged in alternating patterns, with edges filed to points that sever wood fibres cleanly when cutting perpendicular to the grain. This contrasts with a rip saw, which has chisel-shaped teeth designed to remove material when cutting parallel to the grain. In the UK, traditional joinery hand saws often have specific tooth configurations for their intended purpose: cross-cut saws typically have around 7-10 teeth per inch (TPI) with teeth filed to a 60-degree angle, while rip saws have fewer teeth (4-7 TPI) filed to a 90-degree angle. Using the correct saw for each type of cut results in cleaner, more efficient cutting with less effort."
  },
  {
    id: 'joinery-l2-tools-equipment3',
    question: "What is the primary purpose of a router in joinery work?",
    options: ["To connect to the internet", "To smooth rough timber surfaces", "To create decorative or functional cuts, grooves, and profiles", "To drive screws into timber"],
    correctAnswer: "To create decorative or functional cuts, grooves, and profiles",
    explanation: "The primary purpose of a router in joinery work is to create decorative or functional cuts, grooves, and profiles. This versatile power tool uses rapidly spinning bits to shape timber with precision. In UK joinery workshops, routers are used for numerous applications including: cutting rebates, grooves, and housings; forming decorative edge profiles and mouldings; creating mortises; trimming veneers and laminates; and pattern work using templates or jigs. Routers can be used handheld or mounted in a router table for greater control and safety with smaller workpieces. Various accessories including guide bushes, fences, and templates extend their capabilities. Modern joinery increasingly relies on routers for operations that would traditionally have required multiple specialized hand tools or dedicated machines."
  },
  {
    id: 'joinery-l2-tools-equipment4',
    question: "What is the correct name for the tool used to create a smooth, flat surface on timber by removing thin shavings?",
    options: ["Screwdriver", "Chisel", "Plane", "File"],
    correctAnswer: "Plane",
    explanation: "A plane is the tool used to create a smooth, flat surface on timber by removing thin shavings. These essential joinery tools consist of a sharp blade (iron) set in a body with a flat sole, allowing controlled removal of material. Various types of planes serve different functions in UK joinery: bench planes (like jack, try, and smoothing planes) for general flattening and smoothing; rebate planes for cutting shoulders and rebates; plough planes for cutting grooves; and specialist planes like router planes for cleaning recesses or shoulder planes for refining joint shoulders. The ability to properly set up, use, and maintain planes remains a fundamental skill for joiners, even in workshops with modern machinery, as planes often provide the final precision and surface quality that machines cannot achieve."
  },
  {
    id: 'joinery-l2-tools-equipment5',
    question: "What is the primary purpose of a mortise gauge compared to a standard marking gauge?",
    options: ["It can only mark softwoods", "It can mark two parallel lines simultaneously for mortise and tenon joints", "It is used exclusively for measuring angles", "It automatically cuts mortises rather than just marking them"],
    correctAnswer: "It can mark two parallel lines simultaneously for mortise and tenon joints",
    explanation: "A mortise gauge's primary purpose is to mark two parallel lines simultaneously for mortise and tenon joints. It is essentially a marking gauge with an additional adjustable pin or knife, allowing the joiner to set both the distance from the edge and the width between the lines. This enables consistent and accurate marking of both mortises and matching tenons, ensuring tight-fitting joints. The fence ensures both lines are parallel to the reference edge, while the adjustable pins maintain consistent spacing. For UK joiners, the mortise gauge is particularly valuable when producing traditional mortise and tenon joinery by hand, saving time and improving accuracy compared to marking each line separately. Modern variants often use two knife-edged markers rather than pins for cleaner, more precise lines."
  },
  {
    id: 'joinery-l2-tools-equipment6',
    question: "Which type of chisel is specifically designed for accessing tight corners and cleaning out waste in joints?",
    options: ["Firmer chisel", "Bevel-edged chisel", "Mortise chisel", "Corner chisel"],
    correctAnswer: "Corner chisel",
    explanation: "A corner chisel (also called a corner cleaning chisel or lock mortise chisel) is specifically designed for accessing tight corners and cleaning out waste in joints. It has a blade shaped at a 90-degree angle, making it ideal for squaring up corners in mortises, hinge recesses, and other joinery work where it's difficult to achieve a clean right angle with standard chisels. With a single strike on the handle, the corner chisel creates a perfect 90-degree corner, saving time and improving accuracy compared to using standard chisels. While less common in a joiner's toolkit than firmer, bevel-edged, or mortise chisels, the corner chisel is a specialized tool that significantly increases efficiency when working on projects requiring many squared corners, such as door lock installations or multiple mortise and tenon joints."
  },
  {
    id: 'joinery-l2-tools-equipment7',
    question: "What is the correct function of a biscuit jointer in modern joinery?",
    options: ["To cut perfectly round holes for dowels", "To cut slots for flat oval wooden biscuits that align and strengthen joints", "To create decorative biscuit-shaped patterns on timber surfaces", "To heat up and shape plastic components"],
    correctAnswer: "To cut slots for flat oval wooden biscuits that align and strengthen joints",
    explanation: "A biscuit jointer (also called a plate joiner) cuts slots for flat oval wooden biscuits that align and strengthen joints. This power tool uses a small circular blade to create precisely sized and positioned slots in mating pieces. The compressed wooden biscuits expand slightly when glue is applied, creating a tight fit that strengthens the joint while maintaining perfect alignment. In UK joinery, biscuit joiners are commonly used for edge-to-edge panel glue-ups, mitre joints, T-joints, and frame construction where traditional mortise and tenon joints might be too time-consuming. The tool has adjustable depth settings for different biscuit sizes (typically #0, #10, #20) and angle settings for various joint configurations. Biscuit jointing represents a modern approach to joinery that balances strength, speed, and ease of use."
  },
  {
    id: 'joinery-l2-tools-equipment8',
    question: "When using a hand-held circular saw, which way should the good face of the timber be oriented?",
    options: ["It makes no difference", "Good face up when cutting sheet materials, good face down when cutting solid timber", "Always good face up", "Always good face down"],
    correctAnswer: "Good face up when cutting sheet materials, good face down when cutting solid timber",
    explanation: "When using a hand-held circular saw, the good face of the timber should be oriented with the good face up when cutting sheet materials, and the good face down when cutting solid timber. This recommendation accounts for the direction the saw blade rotates and how it enters the material. Circular saw blades cut on the upward stroke, so they tend to cause tear-out or splintering on the top face of the material. By placing sheet materials good face up, any tear-out occurs on the less visible bottom face. Conversely, with solid timber, placing the good face down protects it from tear-out. UK joiners can further minimize tear-out by using zero-clearance inserts, specialist blades, or scoring the cut line before making the full cut."
  },
  {
    id: 'joinery-l2-tools-equipment9',
    question: "What is the main purpose of a try square in joinery?",
    options: ["To check if timber is dry enough to use", "To check and mark right angles (90 degrees)", "To measure the hardness of timber", "To create curves and circles"],
    correctAnswer: "To check and mark right angles (90 degrees)",
    explanation: "The main purpose of a try square in joinery is to check and mark right angles (90 degrees). This essential layout tool consists of a metal blade set perpendicular to a wooden or metal stock. Joiners use try squares for multiple purposes: checking if edges are square to faces; marking cut lines square to an edge; checking assembled components for squareness; and testing the accuracy of machined components. Traditional UK joinery try squares typically have a rosewood or ebony stock with a steel blade, though modern versions often use all-metal construction. The name 'try square' comes from its use to 'try' or test for squareness. Accuracy is essential in a try square - even a small deviation from 90 degrees will compound in joinery work, resulting in gaps in joints and assemblies that don't fit properly."
  },
  {
    id: 'joinery-l2-tools-equipment10',
    question: "Which power tool is most appropriate for cutting curved shapes in sheet materials?",
    options: ["Circular saw", "Router", "Jigsaw", "Plane"],
    correctAnswer: "Jigsaw",
    explanation: "A jigsaw is the power tool most appropriate for cutting curved shapes in sheet materials. This versatile tool uses a reciprocating blade that can follow curved lines and create internal cutouts when started from a drilled hole. Modern jigsaws feature orbital action settings (which add a forward motion to the blade's up-and-down movement for faster cutting), variable speed control, and pendulum settings to optimize cutting for different materials. For UK joiners, jigsaws are essential for cutting curved components in materials like plywood, MDF, and laminate. While bandsaws offer greater accuracy for curved cuts in a workshop setting, the portable jigsaw allows for on-site cutting of curves and shapes. Blade selection is important - fine-tooth blades for clean cuts in sheet materials, and wider blades with fewer teeth for faster, rougher cuts in thicker timber."
  },
  {
    id: 'joinery-l2-tools-equipment11',
    question: "What is the purpose of a block plane in joinery?",
    options: ["To cut blocks of wood into smaller pieces", "To smooth end grain and make small adjustments to components", "To shape large curves", "To hold workpieces securely"],
    correctAnswer: "To smooth end grain and make small adjustments to components",
    explanation: "A block plane is used to smooth end grain and make small adjustments to components. This compact hand plane is typically 150-180mm long with the blade set at a lower angle (around 12-20 degrees) than standard bench planes, making it effective for working end grain where other planes might tear the wood fibers. The low angle combined with a bevel-up blade configuration creates an effective cutting angle that slices cleanly through end grain. Block planes are also ideal for trimming and fitting components, chamfering edges, and general fine-tuning of joinery. In UK joinery practice, the block plane is often the most frequently used plane due to its versatility and convenience - small enough to be used with one hand and easily carried in a tool apron for quick adjustments during assembly and installation work."
  },
  {
    id: 'joinery-l2-tools-equipment12',
    question: "Which of the following is the most appropriate tool for cutting a housing joint by hand?",
    options: ["Coping saw", "Tenon saw and chisel", "Brace and bit", "Spokeshave"],
    correctAnswer: "Tenon saw and chisel",
    explanation: "The most appropriate tools for cutting a housing joint by hand are a tenon saw and chisel. The process involves first marking out the joint with a marking gauge and try square, then using a tenon saw to cut down to the required depth along both sides of the housing. The waste material between these saw cuts is then removed using a chisel, working gradually across the grain. The chisel is used bevel-down for controlled paring cuts to create a flat-bottomed recess that will accept the mating piece. This traditional approach remains relevant in UK joinery, particularly for site work or when modifying existing components. While routers or other power tools might be used in a workshop setting for efficiency, the hand tool method offers precision and doesn't require electricity, making it valuable for certain applications or when working in situations where power tools aren't practical."
  },
  {
    id: 'joinery-l2-tools-equipment13',
    question: "What is the purpose of a combination square in joinery?",
    options: ["It can only be used to draw squares and rectangles", "It combines several functions including checking 45° and 90° angles, marking depths, and acting as a basic level", "It is used exclusively for combining different timber species", "It can only be used to check if timber is dry enough"],
    correctAnswer: "It combines several functions including checking 45° and 90° angles, marking depths, and acting as a basic level",
    explanation: "A combination square combines several functions including checking 45° and 90° angles, marking depths, and acting as a basic level. This versatile layout tool features a metal rule with a sliding stock that can be locked at any position along the rule. The stock typically includes a 90° face, a 45° face, a spirit level, and a scriber stored in the stock. UK joiners use combination squares for multiple functions: checking and marking 90° and 45° angles; measuring and marking consistent depths or widths from an edge; checking small components for level; and using the rule independently for measuring when locked at 90°. The adjustable nature of the combination square makes it particularly useful for layout tasks requiring repeated measurements or for transferring dimensions directly from one workpiece to another, enhancing accuracy and consistency in joinery work."
  },
  {
    id: 'joinery-l2-tools-equipment14',
    question: "Which of the following tools is most appropriate for creating mortises in modern joinery practice?",
    options: ["Pillar drill", "Bandsaw", "Hollow chisel mortiser", "Belt sander"],
    correctAnswer: "Hollow chisel mortiser",
    explanation: "A hollow chisel mortiser is the most appropriate tool for creating mortises in modern joinery practice. This specialized machine combines a rotating auger bit inside a square hollow chisel, simultaneously drilling and squaring the hole in one operation. The result is a clean, square-cornered mortise produced quickly and accurately. The mortiser's fence and hold-down systems ensure consistent positioning and prevent workpiece movement. While traditional hand-cut mortises using mortise chisels remain relevant for some applications, the hollow chisel mortiser has become standard equipment in UK joinery workshops for efficiency and consistency when producing multiple mortise and tenon joints. Alternative methods include using a router with a jig (more commonly used for small-scale or site work) or CNC machinery in larger production environments, but the dedicated mortiser remains the preferred tool for general-purpose mortising in professional workshops."
  },
  {
    id: 'joinery-l2-tools-equipment15',
    question: "What is the correct procedure for adjusting a bench plane for fine shavings?",
    options: ["Extend the blade as far as possible from the sole", "Retract the blade fully and then extend it until it just begins to cut", "Adjust only the lateral adjustment lever, never the depth", "Remove the cap iron completely for the finest cuts"],
    correctAnswer: "Retract the blade fully and then extend it until it just begins to cut",
    explanation: "The correct procedure for adjusting a bench plane for fine shavings is to retract the blade fully and then extend it until it just begins to cut. This methodical approach prevents over-extending the blade, which would cause it to dig in and potentially damage the workpiece or create tear-out. Specifically, the process involves: retracting the blade using the depth adjustment wheel until it's below the sole; placing the plane on a flat piece of wood; gradually advancing the blade while sighting along the sole until the blade just barely protrudes; testing on scrap material and making further fine adjustments as needed; and using the lateral adjustment lever to ensure the blade is projecting evenly. This careful setup is essential for the fine finishing cuts required in quality UK joinery work, particularly when preparing surfaces for finishing or fitting components precisely."
  },
  {
    id: 'joinery-l2-tools-equipment16',
    question: "What is the purpose of a panel saw in joinery?",
    options: ["To cut very small pieces of timber", "To cut large panels and make initial dimensioning cuts in timber", "To cut perfect circles", "To smooth panel surfaces"],
    correctAnswer: "To cut large panels and make initial dimensioning cuts in timber",
    explanation: "A panel saw is used to cut large panels and make initial dimensioning cuts in timber. This type of hand saw features a long blade (typically 500-600mm) with relatively coarse teeth and a comfortable handle designed for two-handed use. Panel saws come in cross-cut and rip configurations, with teeth designed for cutting across or with the grain respectively. In UK joinery, panel saws are used for the initial breakdown of sheet materials and larger timber sections before more precise tools are employed for final sizing and joinery. While table saws have largely replaced panel saws for workshop dimensioning, these traditional tools remain valuable for site work or in situations where power tools aren't available. A well-set and sharpened panel saw creates a relatively smooth cut surface that may only require minimal cleaning up with a plane or sander."
  },
  {
    id: 'joinery-l2-tools-equipment17',
    question: "What is the primary purpose of a belt sander in joinery?",
    options: ["To drive screws into timber", "To cut precise joints", "To rapidly remove material and level surfaces", "To mix adhesives"],
    correctAnswer: "To rapidly remove material and level surfaces",
    explanation: "The primary purpose of a belt sander in joinery is to rapidly remove material and level surfaces. This power tool uses a continuous loop of abrasive paper moving at high speed to quickly sand down timber surfaces. Belt sanders are particularly effective for initial flattening of uneven surfaces, removing mill marks, leveling joints, and dimensioning components where a small amount of material needs to be removed. In UK joinery workshops, belt sanders are often used for preparing solid timber before finer sanding, leveling glued-up panels, or removing old finishes during restoration work. While powerful and efficient, belt sanders require skill to use effectively without creating hollows or dips. They're typically followed by finer sanding tools like random orbit sanders or hand sanding for finish-ready surfaces. Various grit sizes can be used, with coarser grits (40-80) for rapid stock removal and finer grits (100-120) for less aggressive sanding."
  },
  {
    id: 'joinery-l2-tools-equipment18',
    question: "Which of the following tools would be most appropriate for planing a curved or shaped surface?",
    options: ["Jack plane", "Try plane", "Spokeshave", "Mortise chisel"],
    correctAnswer: "Spokeshave",
    explanation: "A spokeshave would be most appropriate for planing a curved or shaped surface. This specialized hand tool features a short sole with a blade set between two handles, allowing for excellent control when working curved or irregular surfaces. Unlike standard bench planes with long, flat soles designed for creating flat surfaces, spokeshaves can follow convex or concave curves and are ideal for shaping and smoothing components like chair legs, curved rails, tool handles, and boat components. Traditional UK joinery spokeshaves come in flat-bottomed versions for gentle curves and convex-bottomed (round-soled) versions for tighter concave curves. Modern spokeshaves maintain the same basic design but often feature more precise adjustment mechanisms. The tool derives its name from its traditional use in shaping wooden spokes for wagon wheels, but remains an essential tool for any joinery work involving curved surfaces."
  },
  {
    id: 'joinery-l2-tools-equipment19',
    question: "What does PAT testing ensure about electrical tools used in joinery?",
    options: ["It checks the power consumption only", "It measures the tool's cutting efficiency", "It tests that the tool meets quality standards for professional work", "It ensures the tool is electrically safe to use"],
    correctAnswer: "It ensures the tool is electrically safe to use",
    explanation: "PAT (Portable Appliance Testing) testing ensures that electrical tools used in joinery are electrically safe to use. This formal inspection and testing procedure examines portable electrical equipment for potential electrical, mechanical, or thermal damage that could create safety hazards. In UK workshops and construction sites, PAT testing is a legal requirement under the Electricity at Work Regulations 1989, which mandates that all electrical equipment is maintained to prevent danger. The test typically includes a visual inspection for damage, insulation resistance testing, earth continuity testing, and functional checks. Equipment that passes receives a dated label, and records are kept of all tests. For joiners, ensuring tools are PAT tested and within their test period is an important part of workplace safety compliance, especially when working on commercial sites where documentation may be checked."
  },
  {
    id: 'joinery-l2-tools-equipment20',
    question: "Which type of saw is most appropriate for cutting tenon cheeks?",
    options: ["Coping saw", "Bow saw", "Tenon saw", "Hacksaw"],
    correctAnswer: "Tenon saw",
    explanation: "A tenon saw is most appropriate for cutting tenon cheeks. This specialised backsaw features a stiff blade reinforced with a rigid spine along the top edge, providing the precision and control needed for accurate joinery cuts. Tenon saws typically have fine teeth (10-14 TPI) and a blade length of 250-300mm, making them ideal for cutting the long, straight lines required for tenon cheeks. The saw's design allows for precise starting of the cut and straight tracking through the timber, while the handle position provides good control and visibility of the cut line. In UK joinery practice, cutting tenons by hand with a tenon saw remains a fundamental skill, even in workshops with machinery, as it allows for fine adjustments and custom fitting of joints. For cutting tenon shoulders (across the grain), the same saw is used but with a different cutting action appropriate for cross-grain cutting."
  },
  {
    id: 'joinery-l2-tools-equipment21',
    question: "What is the primary purpose of a random orbital sander in joinery?",
    options: ["To cut accurate circles", "To remove large amounts of material quickly", "To provide a fine, swirl-free finish in preparation for applying finishes", "To sand only end grain"],
    correctAnswer: "To provide a fine, swirl-free finish in preparation for applying finishes",
    explanation: "The primary purpose of a random orbital sander in joinery is to provide a fine, swirl-free finish in preparation for applying finishes. This power tool combines two sanding actions: a spinning motion and an elliptical movement, creating a random scratch pattern that prevents visible sanding marks. The random orbital action is particularly effective for final sanding stages, as it doesn't leave directional scratches that might become visible when stain or finish is applied. In UK joinery workshops, random orbital sanders have largely replaced traditional orbital sanders for finish sanding due to their superior results. They're typically used after initial smoothing with belt sanders or planes, working through progressively finer grit sizes (typically 120, 150, 180, and sometimes 220 or higher). The dual action makes them more versatile than standard orbital sanders, effective on both face grain and end grain, and suitable for both flat and gently curved surfaces."
  },
  {
    id: 'joinery-l2-tools-equipment22',
    question: "What is the primary advantage of a domino jointer over a biscuit jointer?",
    options: ["It is much cheaper to purchase", "It creates round dowel holes", "It creates oval slots for stronger floating tenons that resist rotation", "It can only be used on softwoods"],
    correctAnswer: "It creates oval slots for stronger floating tenons that resist rotation",
    explanation: "The primary advantage of a domino jointer over a biscuit jointer is that it creates oval slots for stronger floating tenons that resist rotation. While both tools create slots for inserting loose tenons, the Festool Domino (the main brand of domino jointer in the UK market) cuts mortises for beech tenons that are substantially thicker and longer than biscuits. These domino tenons provide significantly more gluing surface and mechanical strength, comparable to traditional mortise and tenon joints. Additionally, the oval shape prevents rotation, making dominoes suitable for structural joints, not just alignment. The machine also offers precise depth and width adjustment, and can create multiple aligned mortises using reference pins. For professional UK joiners, the domino jointer represents a significant advancement in joining technology, offering a balance of traditional joint strength with modern efficiency, particularly valuable for framework assembly, carcass construction, and on-site fitting."
  },
  {
    id: 'joinery-l2-tools-equipment23',
    question: "Which tool would be most appropriate for accurately measuring internal angles when fitting joinery?",
    options: ["Steel rule", "Try square", "Sliding bevel", "Tape measure"],
    correctAnswer: "Sliding bevel",
    explanation: "A sliding bevel (also called a bevel gauge or adjustable bevel) would be most appropriate for accurately measuring internal angles when fitting joinery. This tool consists of a handle with a metal blade that can be adjusted to any angle and locked in position, allowing angles to be transferred directly from the workpiece to the material being cut. Unlike fixed-angle measuring tools, the sliding bevel can capture exact angles in existing structures, making it invaluable for fitting joinery into non-square openings or when creating joints that aren't at standard 90° or 45° angles. In UK joinery practice, the sliding bevel is especially useful for site fitting where buildings may have settled over time, creating irregular angles that must be matched precisely. After capturing an angle, the setting can be transferred directly to a mitre saw or used to mark cutting lines, ensuring components fit perfectly against existing structures."
  },
  {
    id: 'joinery-l2-tools-equipment24',
    question: "What is the primary purpose of a router table in joinery?",
    options: ["To provide internet connectivity in the workshop", "To route electrical cables safely", "To hold a portable router upside down, providing more control for certain operations", "To store router bits only"],
    correctAnswer: "To hold a portable router upside down, providing more control for certain operations",
    explanation: "The primary purpose of a router table is to hold a portable router upside down, providing more control for certain operations. This workshop fixture converts a handheld router into a stationary tool, with the bit projecting upward through an opening in the table surface. This configuration offers several advantages: increased safety and control when working with smaller components; the ability to use larger bits that would be unwieldy in a handheld router; more precise edge forming using the fence as a guide; and easier repeat operations on multiple identical pieces. In UK joinery workshops, router tables are commonly used for edge profiling, groove cutting, template work, and small-scale moulding operations. Modern router tables often feature micro-adjustable fences, integral dust collection, and featherboards or other safety devices to help hold workpieces securely against the table and fence during cutting operations."
  },
  {
    id: 'joinery-l2-tools-equipment25',
    question: "What is the purpose of a featherboard in woodworking machinery setup?",
    options: ["To create decorative feather patterns on timber", "To hold timber securely against fences or tables during machining", "To sweep away sawdust from the cutting area", "To measure the thickness of timber before cutting"],
    correctAnswer: "To hold timber securely against fences or tables during machining",
    explanation: "The purpose of a featherboard in woodworking machinery setup is to hold timber securely against fences or tables during machining. These safety devices consist of a series of flexible 'fingers' that press against the workpiece, keeping it firmly against a reference surface while still allowing forward movement. Featherboards are particularly important on table saws, router tables, and spindle moulders to prevent kickback and ensure consistent cutting depth and alignment. In UK joinery workshops, featherboards are considered essential safety equipment, helping to maintain control of the workpiece without placing hands near cutting tools. They can be commercially purchased or workshop-made, and are typically installed using the machine's T-slots, clamps, or purpose-made jigs. Properly set featherboards apply pressure in the direction opposing any potential kickback, improving both safety and cut quality by eliminating workpiece movement or chatter during machining operations."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-tools-equipment', 'items', q.id), {
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
