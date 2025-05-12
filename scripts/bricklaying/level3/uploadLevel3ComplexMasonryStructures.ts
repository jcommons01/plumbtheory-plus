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

// ✅ Bricklaying Level 3 Complex Masonry Structures Questions
const questions = [
  {
    id: 'bricklaying-l3-topic2-1',
    question: "What is the primary structural principle of a masonry arch?",
    options: ["The transfer of tensile forces through the stones", "The development of compressive forces between voussoirs", "The reinforcement provided by the mortar joints", "The binding strength of the cement used"],
    correctAnswer: "The development of compressive forces between voussoirs",
    explanation: "The primary structural principle of a masonry arch is the development of compressive forces between voussoirs (wedge-shaped stones or bricks). As the arch carries load, it converts vertical forces into diagonal compressive forces that pass through the arch ring. These forces push the voussoirs against each other, creating a self-supporting structure that works primarily in compression. This principle allows masonry arches to span openings despite masonry's poor tensile strength. The compressive force pattern creates a theoretical 'line of thrust' that must remain within the arch's middle third for optimal stability."
  },
  {
    id: 'bricklaying-l3-topic2-2',
    question: "Which geometric form results from the intersection of two barrel vaults at right angles?",
    options: ["Groin vault", "Dome", "Flying buttress", "Pendentive"],
    correctAnswer: "Groin vault",
    explanation: "A groin vault results from the intersection of two barrel vaults at right angles. This creates a distinctive cross-shaped or X-shaped ridge (called a groin) at the point where the vaults intersect. Groin vaults concentrate the load at the four corners, allowing for more open wall space between the supports. They became an important element in medieval architecture, allowing for larger window openings and greater interior light. Constructing groin vaults requires advanced bricklaying skills to properly align the two intersecting arched structures and to manage the complex geometry at the intersection points."
  },
  {
    id: 'bricklaying-l3-topic2-3',
    question: "What is the purpose of a 'centering' in arch construction?",
    options: ["To mark the center point of the arch", "To provide temporary support until the arch is self-supporting", "To create a central keystone", "To measure the arch's span during construction"],
    correctAnswer: "To provide temporary support until the arch is self-supporting",
    explanation: "A centering in arch construction provides temporary support until the arch is self-supporting. This timber or steel framework is built to the exact profile of the intended arch and supports the voussoirs or bricks during construction. Without centering, the incomplete arch would collapse before the keystone is placed. The centering must be strong enough to support the entire weight of the masonry and remain stable throughout construction. It's typically removed gradually using wedges or jacks to allow the arch to settle slowly into its final self-supporting state."
  },
  {
    id: 'bricklaying-l3-topic2-4',
    question: "What is the 'rise-to-span ratio' of a semicircular arch?",
    options: ["1:1", "1:2", "1:3", "1:4"],
    correctAnswer: "1:2",
    explanation: "The rise-to-span ratio of a semicircular arch is 1:2. This means that the height (rise) of the arch is exactly half its width (span). In a semicircular arch, the radius is half the span, so the rise equals the radius. This ratio creates a perfect semicircle above the springing line. Semicircular arches are among the strongest arch forms and distribute loads evenly to the supports. This standard proportion has been used since Roman times for its efficient load distribution and aesthetic appeal."
  },
  {
    id: 'bricklaying-l3-topic2-5',
    question: "In a masonry arch, what is the term for the bottom face of the arch ring?",
    options: ["Intrados", "Extrados", "Spandrel", "Springer"],
    correctAnswer: "Intrados",
    explanation: "In a masonry arch, the intrados is the bottom face of the arch ring. It forms the interior curve or underside of the arch that is visible when looking up at the arch from below. The opposite face, the upper curve of the arch, is called the extrados. The intrados is a critical surface in arch design as it defines the clear opening beneath the arch. The shape of the intrados determines both the architectural style and the structural behavior of the arch, influencing how forces are distributed through the masonry."
  },
  {
    id: 'bricklaying-l3-topic2-6',
    question: "What is the purpose of a skewback in arch construction?",
    options: ["To create decorative patterns in the brickwork", "To provide a sloped surface against which the arch springs", "To support the keystone at the crown", "To allow for thermal expansion"],
    correctAnswer: "To provide a sloped surface against which the arch springs",
    explanation: "A skewback in arch construction provides a sloped surface against which the arch springs. This angled cut or specially shaped brick is positioned at the springing points of the arch, where the curve begins. The angle of the skewback is determined by the tangent to the arch curve at that point. Without properly formed skewbacks, the arch would lack the correct abutment surfaces to transfer loads to the supporting walls or piers. Skewbacks are essential for proper force distribution, ensuring that thrust forces are directed into the supporting structure along the correct angles."
  },
  {
    id: 'bricklaying-l3-topic2-7',
    question: "Which bond pattern is most effective for constructing curved walls?",
    options: ["Stretcher bond", "English bond", "Flemish bond", "Header bond"],
    correctAnswer: "Header bond",
    explanation: "Header bond is most effective for constructing curved walls. Since headers present the shorter face of the brick to the exterior, they can accommodate tighter curves without creating excessively wide mortar joints on the outer face or compressed joints on the inner face. Header bond allows for more flexibility in following the curve while maintaining relatively consistent mortar joint widths. For very tight curves, special shape bricks or cut bricks may still be necessary, but header bond minimizes the need for these adjustments compared to other bond patterns."
  },
  {
    id: 'bricklaying-l3-topic2-8',
    question: "What is a 'quoin' in masonry construction?",
    options: ["A type of mortar mix", "A decorative carved stone element", "A corner stone or brick forming an exterior angle", "A tool for measuring right angles"],
    correctAnswer: "A corner stone or brick forming an exterior angle",
    explanation: "A quoin in masonry construction is a corner stone or brick forming an exterior angle. Quoins are often emphasized decoratively through size, projection, material contrast, or different bonding pattern to accentuate the building corners. Structurally, quoins reinforce the most vulnerable parts of a wall—its corners—where two walls meet. Traditionally, quoins might be made of dressed stone even in an otherwise brick building. In more complex masonry structures, quoins require careful planning and execution to ensure structural integrity while maintaining the aesthetic design intent."
  },
  {
    id: 'bricklaying-l3-topic2-9',
    question: "What is the primary purpose of a buttress in masonry construction?",
    options: ["To create a decorative feature", "To support vertical loads from the roof", "To counteract lateral thrust forces", "To separate different sections of the building"],
    correctAnswer: "To counteract lateral thrust forces",
    explanation: "The primary purpose of a buttress in masonry construction is to counteract lateral thrust forces. These projecting structures are built against walls to provide additional support against sideways pressures that might otherwise cause the wall to lean or collapse outward. Buttresses are especially important for tall walls, arched structures, and vaulted ceilings, which generate significant lateral forces. By increasing the effective thickness of the wall at strategic points, buttresses transform the horizontal thrust into vertical forces directed into the ground, ensuring the stability of the masonry structure."
  },
  {
    id: 'bricklaying-l3-topic2-10',
    question: "Which type of arch exerts the least lateral thrust on its supports?",
    options: ["Segmental arch", "Semicircular arch", "Pointed arch", "Flat arch"],
    correctAnswer: "Pointed arch",
    explanation: "The pointed arch exerts the least lateral thrust on its supports compared to semicircular and segmental arches of the same span. Its vertical emphasis redirects forces more downward than outward. This structural advantage allowed Gothic cathedral builders to create taller, lighter structures with larger window openings. The reduced lateral thrust meant that supporting walls could be thinner, buttresses smaller, and spans greater. The steeper the point of the arch, the more the forces are directed vertically rather than horizontally, further reducing the need for massive supports."
  },
  {
    id: 'bricklaying-l3-topic2-11',
    question: "In corbelled brick construction, what is the maximum recommended projection for each course?",
    options: ["One quarter of a brick's length", "One third of a brick's length", "Half of a brick's length", "Three quarters of a brick's length"],
    correctAnswer: "One quarter of a brick's length",
    explanation: "In corbelled brick construction, the maximum recommended projection for each course is one quarter of a brick's length. This limitation ensures that the center of gravity of each projecting brick remains within the supporting masonry below, preventing the corbel from tipping forward. Exceeding this projection can compromise structural stability and lead to failure. The total corbel projection is also typically limited to no more than two-thirds of the wall thickness. These rules prevent overstressing the mortar joints and ensure proper load distribution through the corbelled structure."
  },
  {
    id: 'bricklaying-l3-topic2-12',
    question: "What is the technique called when bricks are arranged in a herringbone pattern within a panel?",
    options: ["Basket weave", "Flemish bond", "Rat-trap bond", "Brick nogging"],
    correctAnswer: "Brick nogging",
    explanation: "When bricks are arranged in a herringbone pattern within a panel, the technique is typically called brick nogging. Traditionally, brick nogging refers to brickwork infill between the members of a timber frame, often arranged in decorative patterns including herringbone. In modern construction, herringbone brick panels may be used decoratively within larger masonry walls. The herringbone pattern creates visual interest through the diagonal arrangement of bricks. This technique requires precision cutting and layout to maintain consistent joint widths at the panel edges and where the diagonal bricks meet."
  },
  {
    id: 'bricklaying-l3-topic2-13',
    question: "What is a 'springer' in arch construction?",
    options: ["A tool used to measure the arch curvature", "The first voussoir or brick at each end of an arch", "The central keystone", "The temporary support structure"],
    correctAnswer: "The first voussoir or brick at each end of an arch",
    explanation: "A 'springer' in arch construction is the first voussoir or brick at each end of an arch, resting on the impost or skewback. The springer marks the transition from the vertical supporting structure to the curved arch form. Springers are critical elements as they transfer the arch's thrust to the supporting piers or walls. They must be securely bonded into the supporting masonry to prevent failure at this junction. The angle and positioning of springers establish the starting point for the arch curve and significantly influence the overall stability of the arch structure."
  },
  {
    id: 'bricklaying-l3-topic2-14',
    question: "What is the structural benefit of using a pointed (Gothic) arch rather than a semicircular arch?",
    options: ["Greater resistance to earthquakes", "Reduced lateral thrust on the supports", "Increased load-bearing capacity", "Better resistance to wind forces"],
    correctAnswer: "Reduced lateral thrust on the supports",
    explanation: "The primary structural benefit of using a pointed (Gothic) arch rather than a semicircular arch is reduced lateral thrust on the supports. The more vertical direction of force in a pointed arch redirects more of the load downward rather than outward. This reduced lateral thrust allows for taller, more slender support structures and larger openings between supports. Gothic cathedral builders exploited this advantage to create soaring interiors with extensive stained glass windows. The pointed arch's efficiency in handling loads helped revolutionize medieval architecture by enabling more lightweight, open structures than were possible with the earlier Romanesque semicircular arches."
  },
  {
    id: 'bricklaying-l3-topic2-15',
    question: "What is a 'bat' in complex brickwork construction?",
    options: ["A specialized brick-cutting tool", "A portion of a brick cut to a specific size", "A type of reinforcement used in brick walls", "A timber support used during construction"],
    correctAnswer: "A portion of a brick cut to a specific size",
    explanation: "A 'bat' in brickwork construction is a portion of a brick cut to a specific size. Common examples include half-bats (half the length of a brick), quarter-bats, and three-quarter bats. Bats are essential in complex brickwork to maintain proper bonding patterns, especially at corners, junctions, and openings. They allow masons to create strong connections between perpendicular walls while following the bonding rules. The accurate cutting of bats is crucial for maintaining consistent joint widths and proper alignment in complex masonry structures. In high-quality brickwork, machine-cut bats are often preferred for their precision."
  },
  {
    id: 'bricklaying-l3-topic2-16',
    question: "What is the primary purpose of a relieving arch in masonry construction?",
    options: ["To create a decorative feature above windows", "To reduce the weight of the wall above", "To transfer loads around an opening to adjacent supports", "To provide ventilation to the interior"],
    correctAnswer: "To transfer loads around an opening to adjacent supports",
    explanation: "The primary purpose of a relieving arch in masonry construction is to transfer loads around an opening to adjacent supports. Also known as a discharging arch, it's built into the wall above an opening such as a window or door to divert the weight of the structure above away from the opening and onto the solid masonry on either side. This prevents excessive pressure on lintels or flat arches, which might otherwise fail under the weight. Relieving arches are often hidden within the wall thickness but may be visible as a decorative element on the facade."
  },
  {
    id: 'bricklaying-l3-topic2-17',
    question: "In an arch constructed with standard bricks, what is the purpose of creating tapered mortar joints?",
    options: ["To speed up the construction process", "To accommodate the radial geometry of the arch", "To improve the arch's resistance to water penetration", "To reduce the amount of mortar used"],
    correctAnswer: "To accommodate the radial geometry of the arch",
    explanation: "In an arch constructed with standard bricks, tapered mortar joints accommodate the radial geometry of the arch. Since standard bricks have rectangular faces rather than the wedge shape ideal for arches, the mortar joints must be wider at the extrados (outer curve) than at the intrados (inner curve). This tapering allows the rectangular bricks to form the curved arch shape. Proper tapering of joints is crucial for structural integrity, ensuring forces are transmitted correctly through the arch. For very large arches or those with tight radii, specially molded voussoir bricks may be used instead to minimize excessive joint widening."
  },
  {
    id: 'bricklaying-l3-topic2-18',
    question: "What is a 'tumbling-in' technique used for in brickwork?",
    options: ["Creating decorative patterns on horizontal surfaces", "Building curved walls with standard bricks", "Constructing arches with minimal centering", "Building raking brickwork to bridge the slope of a gable"],
    correctAnswer: "Building raking brickwork to bridge the slope of a gable",
    explanation: "The 'tumbling-in' technique is used for building raking brickwork to bridge the slope of a gable. In this method, bricks are laid with their beds following the slope rather than remaining horizontal. Each course steps in (or 'tumbles in') toward the center from both sides of the gable. This creates a strong connection between the sloped gable and the horizontal courses below. Tumbling-in produces a distinctive decorative effect while providing structural integrity. It requires precise cutting of bricks and careful attention to bonding patterns to maintain strength and appearance."
  },
  {
    id: 'bricklaying-l3-topic2-19',
    question: "What is the main structural difference between a dome and a traditional arch?",
    options: ["Domes use cement while arches use lime mortar", "Domes transfer forces in three dimensions, while arches work in two dimensions", "Domes are always built with stone, never brick", "Domes require metal reinforcement, while arches don't"],
    correctAnswer: "Domes transfer forces in three dimensions, while arches work in two dimensions",
    explanation: "The main structural difference between a dome and a traditional arch is that domes transfer forces in three dimensions, while arches work in two dimensions. A dome can be considered as a rotated arch, creating a 3D surface that distributes forces in all directions around its circumference. This creates a system of meridional and hoop stresses working together. The 3D force distribution allows domes to span larger areas with less material than would be possible with a series of arches. This structural efficiency made domes popular for covering large spaces in historic architecture."
  },
  {
    id: 'bricklaying-l3-topic2-20',
    question: "What is the primary purpose of 'bonding' in masonry structures?",
    options: ["To create decorative patterns", "To make walls waterproof", "To minimize the use of mortar", "To distribute loads and prevent continuous vertical joints"],
    correctAnswer: "To distribute loads and prevent continuous vertical joints",
    explanation: "The primary purpose of bonding in masonry structures is to distribute loads and prevent continuous vertical joints. Proper bonding ensures that bricks or stones overlap in consecutive courses, avoiding aligned vertical joints that would create planes of weakness. This overlapping creates a monolithic structure where loads are evenly distributed across multiple units. Good bonding significantly increases a wall's stability, resistance to lateral forces, and overall structural integrity. Different bonding patterns (English, Flemish, etc.) provide varying degrees of strength and aesthetic appearance while maintaining this fundamental purpose."
  },
  {
    id: 'bricklaying-l3-topic2-21',
    question: "What is a 'gauged arch' in brickwork?",
    options: ["An arch with varying dimensions along its span", "An arch constructed with specially cut and shaped bricks", "An arch built with a steel measuring gauge", "An arch with evenly spaced decorative elements"],
    correctAnswer: "An arch constructed with specially cut and shaped bricks",
    explanation: "A gauged arch is constructed with specially cut and shaped bricks (or gauged bricks) that are precisely cut to a wedge shape to form voussoirs with very thin, often rubbed joints. These purpose-made voussoirs allow the arch to be constructed with joints of consistent thickness, typically 1-3mm. Gauged arches represent the highest quality of brickwork craftsmanship, requiring exceptional skill in brick cutting and setting. The resulting arch has a refined appearance with almost invisible joints and excellent structural properties due to the precision of the brick shapes and their tight fit."
  },
  {
    id: 'bricklaying-l3-topic2-22',
    question: "Which bond pattern creates the strongest masonry wall for a curved structure?",
    options: ["Stretcher bond", "English bond", "Flemish bond", "Stack bond"],
    correctAnswer: "English bond",
    explanation: "English bond creates the strongest masonry wall for a curved structure. Consisting of alternating courses of headers and stretchers, it provides superior strength through maximum overlapping of bricks both horizontally and vertically. In curved walls, the alternating header courses allow for adjustments to the curve radius while maintaining structural integrity. The header courses tie the inner and outer faces of the wall together effectively around the curve. While more challenging to execute on curves than simple stretcher bond, English bond provides substantially greater strength for complex curved structures subject to various loads."
  },
  {
    id: 'bricklaying-l3-topic2-23',
    question: "What is a 'squinch' in complex masonry construction?",
    options: ["A tool for measuring angles in brickwork", "A small decorative arch in a wall", "A structural arch built across a corner to support a dome above a square base", "A technique for reinforcing wall junctions"],
    correctAnswer: "A structural arch built across a corner to support a dome above a square base",
    explanation: "A squinch in complex masonry construction is a structural arch built across a corner to support a dome above a square base. This architectural feature solves the geometric problem of transitioning from a square plan to a circular or octagonal base needed for a dome. The squinch creates triangular sections that effectively transform the square into an octagon, which more readily supports the circular base of the dome. Squinches distribute the dome's weight to the corners of the square base and have been used since ancient times. They require advanced bricklaying skills to construct the arched forms correctly at the precise angles needed."
  },
  {
    id: 'bricklaying-l3-topic2-24',
    question: "What is a 'spandrel' in arch construction?",
    options: ["The central wedge-shaped stone at the top of an arch", "The curved underside surface of an arch", "The triangular area between the exterior curve of an arch and the rectangular framework", "The supporting structure beneath an arch"],
    correctAnswer: "The triangular area between the exterior curve of an arch and the rectangular framework",
    explanation: "A spandrel in arch construction is the triangular area between the exterior curve of an arch and the rectangular framework surrounding it. These spaces occur naturally when arches are set within rectangular structures or when multiple arches are arranged in a series. Spandrels can be solid masonry or may be decorated with panels, carvings, or other ornamental treatments. In complex structures like bridges or cathedrals, spandrels play both structural and aesthetic roles. Structurally, they help transfer loads from upper levels to the arches and their supports while providing opportunities for architectural expression."
  },
  {
    id: 'bricklaying-l3-topic2-25',
    question: "What is 'toothing' in masonry construction?",
    options: ["A decorative sawtooth pattern along the top of a wall", "Leaving brick projections at the end of a wall for future extension", "A method of cutting bricks to fit irregular spaces", "Roughening a brick surface to improve mortar adhesion"],
    correctAnswer: "Leaving brick projections at the end of a wall for future extension",
    explanation: "Toothing in masonry construction involves leaving brick projections at the end of a wall for future extension. These projections, resembling teeth, allow new brickwork to be bonded effectively to the existing wall when construction continues later. Each course has bricks projecting at alternating positions, creating a zig-zag pattern at the wall end. Toothing provides superior structural connection compared to simply butting new brickwork against a straight vertical joint. When construction resumes, the new bricks interlock with the toothed end, creating proper bonding across what would otherwise be a weak straight joint."
  },
  {
    id: 'bricklaying-l3-topic2-26',
    question: "What is a 'flying buttress' and what is its primary purpose?",
    options: ["A temporary support used during construction", "An internal wall support system", "An arched exterior support that transfers thrust from an upper wall across an intervening space", "A type of foundation reinforcement"],
    correctAnswer: "An arched exterior support that transfers thrust from an upper wall across an intervening space",
    explanation: "A flying buttress is an arched exterior support that transfers thrust from an upper wall across an intervening space to a freestanding pier. Its primary purpose is to counteract the lateral forces exerted by vaulted ceilings or roofs in Gothic architecture. Flying buttresses allowed for taller, thinner walls with larger window openings by redirecting the outward thrust forces to external supports. The arched form efficiently transmits compressive forces while the mass of the pier provides the necessary counterweight. This innovative masonry structure was crucial to the development of Gothic cathedrals, enabling their soaring, light-filled interiors."
  },
  {
    id: 'bricklaying-l3-topic2-27',
    question: "What is the term for the curved underside surface of an arch?",
    options: ["Soffit", "Intrados", "Voussoir", "Spandrel"],
    correctAnswer: "Intrados",
    explanation: "The curved underside surface of an arch is called the intrados. This is the interior curve that forms the underside of the arch visible when looking up at it from below. The intrados defines the actual opening created by the arch and is a key determinant of its appearance. The opposing curved surface on the top of the arch is called the extrados. The shape of the intrados determines the arch type (semicircular, segmental, pointed, etc.) and affects both its aesthetic character and structural behavior in distributing loads to the supports."
  },
  {
    id: 'bricklaying-l3-topic2-28',
    question: "What structural problem can occur in a masonry arch if the abutments move slightly outward?",
    options: ["The keystone will rise upward", "The arch will crack at the quarter points", "The voussoirs will compress against each other more tightly", "The mortar joints on the intrados will expand"],
    correctAnswer: "The arch will crack at the quarter points",
    explanation: "If the abutments of a masonry arch move slightly outward, the arch will typically crack at the quarter points. As the supports spread, the arch flattens, causing tension to develop at the intrados near the quarter points and at the extrados near the crown and springings. Since masonry has poor tensile strength, cracks form at these locations. This pattern creates a mechanism where the arch essentially divides into segments that hinge against each other. This characteristic cracking pattern is often used by structural engineers to diagnose spreading supports as the cause of arch distress in historic buildings."
  },
  {
    id: 'bricklaying-l3-topic2-29',
    question: "What is 'arris' in the context of brickwork?",
    options: ["A type of brick specially manufactured for arches", "The edge formed by two surfaces of a brick meeting at an angle", "A measurement tool used in setting out brickwork", "A mortar joint technique unique to decorative masonry"],
    correctAnswer: "The edge formed by two surfaces of a brick meeting at an angle",
    explanation: "In brickwork, an 'arris' is the edge formed by two surfaces of a brick meeting at an angle. These edges are particularly important in complex masonry where precision is essential, such as in arch construction or decorative brickwork. A clean, sharp arris contributes to the crisp appearance of the finished work. Damaged or rounded arrises can affect both the structural integrity and visual quality of detailed masonry. For special applications, bricks may be manufactured with specific arris treatments, such as chamfered (angled) or bullnose (rounded) edges, to achieve particular aesthetic or functional effects."
  },
  {
    id: 'bricklaying-l3-topic2-30',
    question: "What is a 'jack arch' in brickwork?",
    options: ["A small arch used to support an internal wall", "A decorative arch used above windows", "A flat arch with sloping joints transferring loads to the jambs", "An arch constructed with hydraulic jacks for support"],
    correctAnswer: "A flat arch with sloping joints transferring loads to the jambs",
    explanation: "A jack arch (also called a flat or straight arch) in brickwork is a flat arch with sloping joints transferring loads to the jambs. Despite its flat appearance, it functions as a true arch through the wedge action created by the inclined mortar joints and tapered bricks. The bricks are cut or specially molded so that the joints radiate from a theoretical center point below the arch. This arrangement creates compression between the voussoirs and transfers horizontal and vertical forces to the supports. Jack arches require precise cutting and setting to achieve proper structural action and are often used above windows and doors where headroom is limited."
  },
  {
    id: 'bricklaying-l3-topic2-31',
    question: "What is the function of a 'pendentive' in dome construction?",
    options: ["To provide decorative elements hanging from the dome", "To support the dome's weight from above", "To transition from a square base to a circular dome", "To create openings for light in the dome structure"],
    correctAnswer: "To transition from a square base to a circular dome",
    explanation: "A pendentive functions as a transitional element that allows a circular dome to be placed over a square base. It's a spherical triangle that curves both horizontally and vertically, forming a smooth transition from the corners of the square to the circular base of the dome. Unlike squinches, which create an octagonal intermediate step, pendentives create a direct transition from square to circle. The pendentive's complex spherical geometry distributes the dome's weight evenly to the corners of the square base. This technique was perfected in Byzantine architecture and requires advanced masonry skills to execute properly."
  },
  {
    id: 'bricklaying-l3-topic2-32',
    question: "What is 'crenellation' in masonry structures?",
    options: ["A pattern of alternating raised and lowered stone blocks", "A technique for reinforcing corners", "A battlemented parapet with alternating solid parts and openings", "A method of brick cutting for curved walls"],
    correctAnswer: "A battlemented parapet with alternating solid parts and openings",
    explanation: "Crenellation in masonry structures refers to a battlemented parapet with alternating solid parts (merlons) and openings (crenels). Originally designed for defensive purposes on castles and fortifications, allowing defenders to shelter behind the merlons while firing through the crenels, crenellation later became a decorative architectural feature. Constructing proper crenellation requires advanced masonry skills to ensure the structural integrity of the parapet while creating the distinctive pattern. The technique involves careful consideration of bond patterns, weatherproofing, and structural stability of the freestanding merlons, which are exposed to greater weathering and potential damage."
  },
  {
    id: 'bricklaying-l3-topic2-33',
    question: "What is a 'diaper pattern' in decorative brickwork?",
    options: ["A herringbone arrangement of bricks", "A pattern created using bricks of contrasting colors", "A technique for reinforcing weak sections of a wall", "A method for improving thermal insulation properties"],
    correctAnswer: "A pattern created using bricks of contrasting colors",
    explanation: "A diaper pattern in decorative brickwork is created using bricks of contrasting colors arranged to form a distinctive geometric design, typically a diamond (lozenge) or square pattern. Often seen in Tudor and Gothic Revival architecture, diaper patterns use darker bricks or vitrified headers against a lighter background. The contrasting bricks are carefully integrated into the bonding pattern without compromising structural integrity. Creating effective diaper patterns requires precise planning to ensure the decorative elements align correctly while maintaining proper bond throughout the wall. This technique demonstrates both technical masonry skill and artistic composition."
  },
  {
    id: 'bricklaying-l3-topic2-34',
    question: "What is a 'coping' in masonry construction?",
    options: ["A technique for joining two walls at an angle", "The top course of a wall designed to protect it from water penetration", "A method for repairing damaged brickwork", "A structural element that distributes the load at the base of a wall"],
    correctAnswer: "The top course of a wall designed to protect it from water penetration",
    explanation: "A coping in masonry construction is the top course of a wall specifically designed to protect it from water penetration. Copings typically project beyond the wall face and incorporate a drip groove or edge that prevents water from running down the wall surface. They're made from materials resistant to weathering and may have sloped upper surfaces to shed water efficiently. Common coping materials include stone, concrete, clay, and metal. Properly designed and installed copings are essential for extending the life of masonry walls by preventing water ingress that could lead to freeze-thaw damage or deterioration of mortar joints."
  },
  {
    id: 'bricklaying-l3-topic2-35',
    question: "What is 'rustication' in masonry construction?",
    options: ["A technique for weathering new stonework to look older", "A method of treating bricks to prevent moisture penetration", "A decorative treatment where joints or block faces are emphasized to create shadow and texture", "A reinforcement technique for earthquake-prone regions"],
    correctAnswer: "A decorative treatment where joints or block faces are emphasized to create shadow and texture",
    explanation: "Rustication in masonry construction is a decorative treatment where joints or block faces are emphasized to create shadow and texture. This effect is typically achieved by recessing the joints deeply, beveling the edges of blocks, or projecting the face of the masonry forward. Rustication is commonly used on lower floors or basement levels of buildings to create a visual impression of strength and solidity. While primarily an aesthetic technique dating back to classical architecture, rustication also has practical benefits as the deep joints and textured surfaces can help shed water and disguise imperfections in the masonry."
  },
  {
    id: 'bricklaying-l3-topic2-36',
    question: "What is the purpose of a 'soldier course' in brickwork?",
    options: ["To create a load-bearing section above an opening", "To form a decorative feature with bricks placed vertically on end", "To reinforce corners in tall walls", "To create a waterproof barrier at the foundation"],
    correctAnswer: "To form a decorative feature with bricks placed vertically on end",
    explanation: "A soldier course in brickwork forms a decorative feature with bricks placed vertically on end (standing on their smallest face with the longest dimension vertical). This arrangement resembles a row of standing soldiers, hence the name. Soldier courses are commonly used as decorative bands within a wall, above windows and doors, or as accents along the top of a wall. While primarily aesthetic, they can also serve as a visual break in large expanses of brickwork. Constructing a proper soldier course requires careful alignment and support during construction as these bricks have less embedment in the mortar bed than conventionally placed bricks."
  },
  {
    id: 'bricklaying-l3-topic2-37',
    question: "What is a 'barrel vault' in masonry construction?",
    options: ["A technique for storing bricks on site", "A semicircular arched ceiling or roof structure", "A circular foundation design", "A method for reinforcing curved walls"],
    correctAnswer: "A semicircular arched ceiling or roof structure",
    explanation: "A barrel vault in masonry construction is a semicircular arched ceiling or roof structure that extends along a linear space, essentially an arch extruded along a straight line. It creates a continuous curved ceiling resembling half of a hollow cylinder or barrel. Barrel vaults distribute loads to the parallel supporting walls or arcades running along their sides. Constructing a masonry barrel vault requires complex formwork or centering to support the masonry during construction until the structure is complete and self-supporting. The technique has been used since ancient Roman times for creating durable, fireproof roofing over long spaces."
  },
  {
    id: 'bricklaying-l3-topic2-38',
    question: "What is the purpose of 'perpend joints' in brickwork?",
    options: ["To allow for thermal expansion", "To connect adjacent bricks in the same course", "To increase the wall's load-bearing capacity", "To improve the wall's resistance to lateral forces"],
    correctAnswer: "To connect adjacent bricks in the same course",
    explanation: "Perpend joints in brickwork connect adjacent bricks in the same course. These vertical joints, also called head joints or cross joints, are perpendicular to the bed joints and essential for proper bonding and structural integrity. In complex masonry structures, maintaining consistent perpend joints ensures even distribution of loads and stresses. Their thickness affects both the appearance and performance of the brickwork. Properly filled perpend joints prevent water penetration and contribute to the wall's thermal and acoustic performance. In decorative brickwork, perpend joints may be emphasized or minimized to achieve specific aesthetic effects."
  },
  {
    id: 'bricklaying-l3-topic2-39',
    question: "What is a 'cramp' in masonry construction?",
    options: ["A tool used to hold bricks in place while the mortar sets", "A metal tie used to connect adjacent stones or masonry units", "A condition where mortar shrinks and cracks", "A temporary support for arches during construction"],
    correctAnswer: "A metal tie used to connect adjacent stones or masonry units",
    explanation: "A cramp in masonry construction is a metal tie used to connect adjacent stones or masonry units. Typically made of stainless steel, bronze, or galvanized iron to prevent corrosion, cramps provide additional structural connection where normal mortar bonding might be insufficient. They're commonly used in stone masonry, particularly for connecting coping stones, cornices, or large facing stones to the backing structure. Cramps are either built into the mortar joints or set into cut slots or holes in the masonry and secured with mortar, lead, or epoxy. They provide resistance against differential movement or forces that might otherwise separate the masonry units."
  },
  {
    id: 'bricklaying-l3-topic2-40',
    question: "In complex masonry, what is a 'voussoir'?",
    options: ["A specialized mortar mix for arches", "A wedge-shaped element forming part of an arch", "A tool for setting out curved brickwork", "A decorative brick used at corners"],
    correctAnswer: "A wedge-shaped element forming part of an arch",
    explanation: "In complex masonry, a voussoir is a wedge-shaped element forming part of an arch. These tapered units, wider at the top than the bottom, transmit force through the arch by creating compression between adjacent voussoirs. The shape allows them to fit precisely in the curved structure, directing forces along the arch's curve and ultimately to the supporting abutments. In brick arches, voussoirs can be purpose-made tapered bricks or created by using standard bricks with tapered mortar joints. The precise cutting and placement of voussoirs is critical to an arch's structural integrity and appearance."
  },
  {
    id: 'bricklaying-l3-topic2-41',
    question: "What is a 'pilaster' in masonry construction?",
    options: ["A type of reinforced concrete column", "A projecting rectangular column built into a wall", "A decorative capstone on top of a wall", "A brick arch support system"],
    correctAnswer: "A projecting rectangular column built into a wall",
    explanation: "A pilaster in masonry construction is a projecting rectangular column built into a wall, appearing as a flattened column attached to the wall surface. Pilasters serve both structural and decorative purposes: they provide additional support by thickening the wall at strategic points and create visual interest through shadow lines and articulation. Constructing pilasters requires careful bonding with the main wall to ensure structural integration while maintaining the distinct projecting form. Pilasters often feature decorative bases and capitals and may carry architectural entablatures or arches above. They're common elements in classical and neoclassical masonry structures."
  },
  {
    id: 'bricklaying-l3-topic2-42',
    question: "What is 'pointing' in masonry construction?",
    options: ["The process of marking layout lines before construction begins", "The technique of cutting bricks to specific angles", "The process of applying or replacing mortar in the visible portion of mortar joints", "A method for reinforcing weak sections of a wall"],
    correctAnswer: "The process of applying or replacing mortar in the visible portion of mortar joints",
    explanation: "Pointing in masonry construction is the process of applying or replacing mortar in the visible portion of mortar joints. It's both a finishing technique for new construction and a repair method for existing masonry. Proper pointing ensures weather resistance by preventing water infiltration while contributing to the visual appearance of the brickwork. In complex or historic masonry, specialized pointing profiles (flush, recessed, weatherstruck, etc.) may be used to achieve specific aesthetic effects or historical accuracy. The mortar mix used for pointing is often richer in lime content than standard mortar to allow for flexibility and minimize damage to the masonry units."
  },
  {
    id: 'bricklaying-l3-topic2-43',
    question: "What is a 'quetta bond' in brickwork?",
    options: ["A bond pattern featuring alternating courses of headers and stretchers", "An earthquake-resistant bond with reinforced concrete elements", "A special bond for curved walls", "A decorative bond used primarily for garden walls"],
    correctAnswer: "An earthquake-resistant bond with reinforced concrete elements",
    explanation: "A quetta bond in brickwork is an earthquake-resistant bond with reinforced concrete elements. Named after the city in Pakistan where it was developed following a devastating earthquake, it features horizontal bands of reinforced concrete at intervals within the brick wall. These bands, typically at sill, lintel, and roof levels, tie the structure together to resist seismic forces. The reinforcement runs continuously through the concrete bands around the building perimeter. While primarily structural, these bands also serve as aesthetic features in some designs. Quetta bond represents one of the earliest systematic approaches to earthquake-resistant masonry construction."
  },
  {
    id: 'bricklaying-l3-topic2-44',
    question: "What is the purpose of 'joggle joints' in stone masonry?",
    options: ["To create a decorative pattern in the stonework", "To allow for movement due to temperature changes", "To provide mechanical interlocking between adjacent stones", "To make repairs easier in historic buildings"],
    correctAnswer: "To provide mechanical interlocking between adjacent stones",
    explanation: "Joggle joints in stone masonry provide mechanical interlocking between adjacent stones through shaped projections and recesses. Unlike flat joints that rely solely on mortar adhesion and friction, joggle joints create a physical interlock that resists sliding and displacement. They're particularly valuable in structures subject to movement or where stones carry significant tensile or shear forces, such as lintels, arches, or copings. Creating joggle joints requires precise stone cutting to ensure the projections and corresponding recesses match perfectly. While primarily functional, the technique can also be decoratively expressed in high-quality masonry work."
  },
  {
    id: 'bricklaying-l3-topic2-45',
    question: "What is 'polychromatic brickwork'?",
    options: ["Brickwork with a polished finish", "Brickwork created using bricks of different colors arranged in patterns", "Brickwork with specially shaped bricks", "Brickwork treated with multiple waterproofing compounds"],
    correctAnswer: "Brickwork created using bricks of different colors arranged in patterns",
    explanation: "Polychromatic brickwork is created using bricks of different colors arranged in patterns to create decorative visual effects. Popular during the Victorian Gothic Revival period, this technique uses the natural color variations of clay bricks or specially colored bricks to create bands, geometric patterns, or pictorial designs within the wall. Creating successful polychromatic brickwork requires careful planning to ensure the decorative pattern works with the bonding pattern while maintaining structural integrity. The colored patterns may highlight architectural features, create horizontal bands, or form complex geometric designs, adding visual interest and artistic expression to masonry structures."
  },
  {
    id: 'bricklaying-l3-topic2-46',
    question: "What is the role of a 'keystone' in arch construction?",
    options: ["To provide a decorative focal point only", "To lock all other voussoirs in place at the center of the arch", "To provide an attachment point for centering", "To allow for expansion and contraction of the arch"],
    correctAnswer: "To lock all other voussoirs in place at the center of the arch",
    explanation: "The keystone in arch construction locks all other voussoirs in place at the center of the arch. As the final element installed at the arch's crown, it completes the structural system by providing the last component needed for the arch to be self-supporting. The wedge-shaped keystone transfers compressive forces to adjacent voussoirs and prevents them from sliding inward. While often decoratively emphasized, its primary function is structural. In brick arches, the keystone may be a specially cut stone or brick, distinguished by its central position and sometimes by material or treatment to create a visual accent at the arch's highest point."
  },
  {
    id: 'bricklaying-l3-topic2-47',
    question: "In masonry construction, what is a 'plinth'?",
    options: ["A decorative brick pattern", "The lower projecting base of a wall or column", "A tool for measuring vertical alignment", "A type of mortar mix used for foundations"],
    correctAnswer: "The lower projecting base of a wall or column",
    explanation: "In masonry construction, a plinth is the lower projecting base of a wall or column. It typically features a wider section at the bottom of the wall that extends slightly beyond the main wall face above. Plinths serve both practical and aesthetic functions: they provide a stable base for the structure, protect the wall base from splashing water and physical damage, and create a visual transition between the building and the ground. Constructing a proper plinth involves careful consideration of the projection dimensions, weathering details to shed water, and proper bonding with the wall above to ensure structural integrity."
  },
  {
    id: 'bricklaying-l3-topic2-48',
    question: "What is the purpose of 'brick corbelling' in masonry structures?",
    options: ["To create a waterproof barrier in the brickwork", "To improve insulation properties of the wall", "To project successive courses of brick progressively outward from the wall face", "To reinforce the foundation of a brick structure"],
    correctAnswer: "To project successive courses of brick progressively outward from the wall face",
    explanation: "Brick corbelling projects successive courses of brick progressively outward from the wall face. Each course extends slightly beyond the one below, creating a stepped or tiered effect. This technique allows masonry to extend horizontally beyond the wall without external support. Corbelling is commonly used to create decorative features, support projecting elements like fireplaces or bay windows, form cornices, or reduce the span of openings at their top. The projection of each course is limited (typically to one-quarter of a brick's length) to maintain stability. Corbelling demonstrates how masons can create cantilevered structures using compression-only materials."
  },
  {
    id: 'bricklaying-l3-topic2-49',
    question: "What is a 'rat-trap bond' in brickwork?",
    options: ["A bond pattern used specifically for garden walls", "A method for preventing rodent infestation in cavity walls", "A bond creating a cavity wall using bricks on edge", "A special bond for securing brick veneer to concrete structures"],
    correctAnswer: "A bond creating a cavity wall using bricks on edge",
    explanation: "Rat-trap bond is a technique for creating a cavity wall using bricks on edge instead of laid flat. The bricks are placed on edge with headers and stretchers creating a pattern similar to Flemish bond but with an internal cavity. This method uses around 25% fewer bricks than solid walls while providing better thermal insulation due to the continuous cavity. Originally developed as an economical construction method, it has gained popularity in sustainable building for its material efficiency and thermal performance. The technique requires skilled bricklaying to maintain alignment and stability since the bricks are positioned in a less stable orientation than conventional bonds."
  },
  {
    id: 'bricklaying-l3-topic2-50',
    question: "What is a 'finial' in masonry construction?",
    options: ["A tool used for finishing mortar joints", "An ornamental element at the apex of a gable, spire, or other architectural feature", "The final brick laid in a wall, often ceremonially placed", "A special mortar mix used for the final layer in brick paving"],
    correctAnswer: "An ornamental element at the apex of a gable, spire, or other architectural feature",
    explanation: "A finial in masonry construction is an ornamental element at the apex of a gable, spire, or other architectural feature. Typically made of stone, terracotta, or metal, finials provide a decorative termination to vertical architectural elements. Beyond their aesthetic purpose, they often serve practical functions such as protecting the top of a structure from water penetration or providing a termination point for flashing. Masonry finials require careful design and installation to ensure they remain secure despite exposure to weather and their elevated position. Their design often reflects the architectural style of the building, from simple geometric forms to elaborate sculptural elements."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-complex-masonry-structures', 'items', q.id), {
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