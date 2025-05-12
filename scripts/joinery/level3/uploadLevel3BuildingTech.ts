// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3BuildingTech.ts

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

// ✅ Joinery Level 3 Advanced Building Technology Questions
const questions = [
  {
    id: 'joinery-l3-building-tech1',
    question: "What is a SIP (Structural Insulated Panel) and what are its primary advantages in construction?",
    options: ["A roof panel made from corrugated steel only", "A reinforced concrete panel with no insulation", "A sandwich panel consisting of insulation core between two structural boards, offering high thermal performance and rapid construction", "A decorative panel used only in interior design"],
    correctAnswer: "A sandwich panel consisting of insulation core between two structural boards, offering high thermal performance and rapid construction",
    explanation: "SIPs are sandwich panels with an insulation core (typically rigid foam) bonded between two structural boards (usually OSB). They provide excellent thermal performance, reduce thermal bridging, enable faster construction, offer consistent quality, and create an airtight structure with fewer joints."
  },
  {
    id: 'joinery-l3-building-tech2',
    question: "What is a CLT (Cross Laminated Timber) panel and how does it differ from traditional timber frame construction?",
    options: ["A type of timber cladding that is only decorative", "A timber panel with all layers running in the same direction", "An engineered wood panel with layers of timber bonded perpendicular to each other, providing structural strength in multiple directions", "A composite panel containing no actual timber"],
    correctAnswer: "An engineered wood panel with layers of timber bonded perpendicular to each other, providing structural strength in multiple directions",
    explanation: "CLT panels consist of multiple layers of timber boards glued perpendicular to each other, creating dimensional stability and strength in both directions. Unlike traditional timber framing that uses linear members, CLT provides solid structural panels that serve as walls, floors, and roofs, enabling rapid construction and design flexibility."
  },
  {
    id: 'joinery-l3-building-tech3',
    question: "What is a curtain walling system in building construction?",
    options: ["A system of internal partitions", "A method of hanging curtains in commercial buildings", "A non-load bearing external wall system, typically consisting of a lightweight aluminum frame infilled with glass or panels", "A temporary protective screen used during construction"],
    correctAnswer: "A non-load bearing external wall system, typically consisting of a lightweight aluminum frame infilled with glass or panels",
    explanation: "Curtain walling is a non-load bearing external wall system, typically consisting of aluminum framing infilled with glass or panels. It's suspended from the building structure, forming a weathertight envelope while transferring only its self-weight and environmental loads to the primary structure, enabling façade designs with high proportions of glazing."
  },
  {
    id: 'joinery-l3-building-tech4',
    question: "What is the purpose of a capillary break in building construction?",
    options: ["To increase water flow within walls", "To prevent the passage of moisture through small gaps by interrupting capillary action", "To strengthen structural connections", "To prevent sound transmission between rooms"],
    correctAnswer: "To prevent the passage of moisture through small gaps by interrupting capillary action",
    explanation: "A capillary break prevents moisture passage through small gaps by interrupting capillary action. This is achieved through physical barriers, air gaps, or water-resistant materials that stop water migration through porous building materials, preventing moisture problems in walls, floors, and foundations."
  },
  {
    id: 'joinery-l3-building-tech5',
    question: "What is a rainscreen cladding system and what is its principal method of managing water penetration?",
    options: ["An impermeable barrier that blocks all moisture", "A system that directs all water into the building's drainage", "A cladding system with an outer layer, ventilated cavity, and inner weather-resistant barrier that manages water through pressure equalization", "A system that absorbs and holds rainwater"],
    correctAnswer: "A cladding system with an outer layer, ventilated cavity, and inner weather-resistant barrier that manages water through pressure equalization",
    explanation: "Rainscreen cladding consists of an outer layer, ventilated cavity, and inner weather-resistant barrier. It manages water through pressure equalization, which neutralizes the forces driving water inward. Any moisture penetrating the outer layer is drained or evaporated within the cavity, protecting the building structure."
  },
  {
    id: 'joinery-l3-building-tech6',
    question: "What is the function of a vapor barrier in building construction?",
    options: ["To prevent air leakage only", "To provide thermal insulation", "To prevent water vapor diffusion into building assemblies where it could condense", "To strengthen the structural frame"],
    correctAnswer: "To prevent water vapor diffusion into building assemblies where it could condense",
    explanation: "Vapor barriers prevent water vapor diffusion into building assemblies where it could condense. Typically installed on the warm side of insulation, they reduce moisture migration through building components, preventing interstitial condensation that could lead to mold growth, rotting, and reduced insulation effectiveness."
  },
  {
    id: 'joinery-l3-building-tech7',
    question: "What is a thermal bridge in building construction and why is it important to minimize them?",
    options: ["A heating element that connects different rooms", "A path of least resistance for heat transfer through building elements, which reduces energy efficiency and can cause condensation", "A connection between heating systems", "A sensor that monitors temperature differences"],
    correctAnswer: "A path of least resistance for heat transfer through building elements, which reduces energy efficiency and can cause condensation",
    explanation: "A thermal bridge is a path of least resistance for heat transfer through building elements. These areas of high thermal conductivity reduce energy efficiency, increase heating/cooling costs, and often create cold spots where condensation and mold can develop. Minimizing thermal bridges is essential for achieving high-performance building envelopes."
  },
  {
    id: 'joinery-l3-building-tech8',
    question: "What is the primary purpose of a brise soleil in building design?",
    options: ["To increase solar heat gain", "To support climbing plants", "To provide shading from direct sunlight while allowing natural light and views", "To strengthen the building facade against wind loads"],
    correctAnswer: "To provide shading from direct sunlight while allowing natural light and views",
    explanation: "A brise soleil provides shading from direct sunlight while allowing natural light and views. These external shading devices typically consist of horizontal or vertical projections that intercept high-angle summer sun while admitting lower-angle winter sun, reducing cooling loads and glare while maintaining daylighting benefits."
  },
  {
    id: 'joinery-l3-building-tech9',
    question: "What is a service void in modern timber frame construction?",
    options: ["A space left intentionally empty for aesthetic purposes", "A gap where services were forgotten during design", "A dedicated space within wall, floor, or ceiling construction for running building services without penetrating the air/vapor barrier", "A void where structural elements were omitted"],
    correctAnswer: "A dedicated space within wall, floor, or ceiling construction for running building services without penetrating the air/vapor barrier",
    explanation: "A service void is a dedicated space within wall, floor, or ceiling construction for running building services. This separate layer allows pipes, cables, and ducts to be installed without penetrating the air/vapor barrier, maintaining airtightness and reducing thermal bridging while facilitating easier maintenance and future modifications."
  },
  {
    id: 'joinery-l3-building-tech10',
    question: "What does the term 'airtightness' refer to in building construction and why is it important?",
    options: ["The ability to prevent fresh air from entering a building", "The measure of how effectively a building prevents uncontrolled air leakage, important for energy efficiency and moisture control", "A measurement of internal air quality only", "The strength of a building against wind loads"],
    correctAnswer: "The measure of how effectively a building prevents uncontrolled air leakage, important for energy efficiency and moisture control",
    explanation: "Airtightness measures how effectively a building prevents uncontrolled air leakage. Good airtightness is crucial for energy efficiency (reducing heat loss), moisture control (preventing interstitial condensation), acoustic performance, improved comfort (reducing drafts), and ensuring ventilation systems work as designed rather than relying on random infiltration."
  },
  {
    id: 'joinery-l3-building-tech11',
    question: "What is the principle behind a MVHR (Mechanical Ventilation with Heat Recovery) system?",
    options: ["It generates heat mechanically", "It draws in fresh air and exhausts stale air while transferring heat between the airstreams to minimize energy loss", "It recirculates the same air continuously", "It extracts air only with no fresh air input"],
    correctAnswer: "It draws in fresh air and exhausts stale air while transferring heat between the airstreams to minimize energy loss",
    explanation: "MVHR systems draw in fresh air and exhaust stale air while transferring heat between the airstreams. Using a heat exchanger, they recover up to 90% of heat from extracted air to pre-warm incoming fresh air, providing controlled ventilation with minimal energy loss, particularly beneficial in airtight buildings."
  },
  {
    id: 'joinery-l3-building-tech12',
    question: "What is the purpose of an expansion joint in building construction?",
    options: ["To join extension pieces to the building", "To allow building materials to naturally expand when heated", "To allow for controlled movement in building elements due to thermal expansion, moisture changes, or structural settlement", "To create a decorative feature in large buildings"],
    correctAnswer: "To allow for controlled movement in building elements due to thermal expansion, moisture changes, or structural settlement",
    explanation: "Expansion joints allow for controlled movement in building elements due to thermal expansion, moisture changes, or structural settlement. These deliberately created separations prevent stress buildup that could cause cracking, buckling, or other damage when materials expand and contract or when different building sections move independently."
  },
  {
    id: 'joinery-l3-building-tech13',
    question: "What is a green roof system and what are its primary benefits?",
    options: ["Any roof painted green for aesthetic purposes", "A roof covered with vegetation and growing medium, providing thermal insulation, stormwater management, and ecological benefits", "A roof made from recycled materials only", "A traditional roof with green-colored shingles"],
    correctAnswer: "A roof covered with vegetation and growing medium, providing thermal insulation, stormwater management, and ecological benefits",
    explanation: "A green roof is covered with vegetation and growing medium over a waterproofing membrane. Benefits include improved thermal performance, stormwater management (reducing runoff), extended roof lifespan, improved air quality, reduced urban heat island effect, enhanced biodiversity, and aesthetic/amenity value in urban environments."
  },
  {
    id: 'joinery-l3-building-tech14',
    question: "What is the purpose of a pattress in building construction?",
    options: ["To create decorative patterns on walls", "A reinforcement fixed within a wall to provide secure fixing points for attaching items", "To join roof trusses together", "A type of waterproofing membrane"],
    correctAnswer: "A reinforcement fixed within a wall to provide secure fixing points for attaching items",
    explanation: "A pattress is a reinforcement fixed within a wall to provide secure fixing points for attaching items. Typically wooden blocks or metal plates are incorporated during construction or retrofitted, creating solid anchoring points for heavy fixtures, electrical boxes, sanitary ware, or joinery items when the wall itself offers insufficient support."
  },
  {
    id: 'joinery-l3-building-tech15',
    question: "What is the difference between a cold roof and a warm roof construction?",
    options: ["The geographic location where they are built", "Their color - cold roofs are always light colored", "In a warm roof, insulation is placed above or between rafters with no ventilated space; in a cold roof, insulation is at ceiling level with a ventilated space above", "The seasons during which they are constructed"],
    correctAnswer: "In a warm roof, insulation is placed above or between rafters with no ventilated space; in a cold roof, insulation is at ceiling level with a ventilated space above",
    explanation: "In a warm roof, insulation is placed above or between rafters with no ventilated space, keeping the entire structure within the building's thermal envelope. In a cold roof, insulation is at ceiling level with a ventilated space above it, requiring ventilation to prevent condensation as the roof structure is outside the thermal envelope."
  },
  {
    id: 'joinery-l3-building-tech16',
    question: "What is a trenchless foundation system and when might it be used?",
    options: ["A foundation without proper support", "A foundation that requires no excavation", "A foundation system using minimum excavation techniques like screw piles or ground beams, used for difficult access sites or to minimize ground disturbance", "A foundation built in a military trench"],
    correctAnswer: "A foundation system using minimum excavation techniques like screw piles or ground beams, used for difficult access sites or to minimize ground disturbance",
    explanation: "Trenchless foundation systems use minimum excavation techniques like screw piles or ground beams. They're advantageous for sites with difficult access, protected trees with root protection zones, contaminated soil that's best left undisturbed, or where minimal site disruption is required, offering faster installation with reduced environmental impact."
  },
  {
    id: 'joinery-l3-building-tech17',
    question: "What is the purpose of a plenum in building services?",
    options: ["A type of roof covering", "A decorative ceiling feature", "A space that facilitates air circulation and distribution in HVAC systems", "A structural component supporting floors"],
    correctAnswer: "A space that facilitates air circulation and distribution in HVAC systems",
    explanation: "A plenum is a space that facilitates air circulation and distribution in HVAC systems. It's typically a pressurized chamber forming part of the air distribution system, such as the space above a suspended ceiling or below a raised floor, allowing air movement between equipment and outlet points."
  },
  {
    id: 'joinery-l3-building-tech18',
    question: "What is the principal advantage of using glulam beams in construction compared to solid timber?",
    options: ["They are always less expensive", "They can be manufactured in larger dimensions and longer spans than are available in solid timber", "They are completely waterproof", "They require no design calculations"],
    correctAnswer: "They can be manufactured in larger dimensions and longer spans than are available in solid timber",
    explanation: "Glulam beams can be manufactured in larger dimensions and longer spans than available in solid timber. This engineered product laminates timber layers with adhesive, creating beams that can span large distances without intermediate support, while offering design flexibility through curved forms and custom profiles not possible with solid timber."
  },
  {
    id: 'joinery-l3-building-tech19',
    question: "What is a clerestory in building design?",
    options: ["A type of floor construction", "A method of cleaning buildings", "A high section of wall containing windows above eye level, used for daylighting", "A storage area for cleaning supplies"],
    correctAnswer: "A high section of wall containing windows above eye level, used for daylighting",
    explanation: "A clerestory is a high section of wall containing windows above eye level, used for daylighting. This architectural element allows natural light deep into building interiors while maintaining privacy, reducing glare, and often providing natural ventilation through operational windows placed high in the space."
  },
  {
    id: 'joinery-l3-building-tech20',
    question: "What is the purpose of a screed layer in floor construction?",
    options: ["To provide decorative patterns", "To create a smooth, level surface for floor finishes", "To provide structural strength only", "To allow for underfloor heating only"],
    correctAnswer: "To create a smooth, level surface for floor finishes",
    explanation: "A screed layer creates a smooth, level surface for floor finishes. Applied over the structural floor or insulation, it provides the precise levels needed for floor coverings, encases underfloor heating pipes where present, and distributes loads evenly. Various types include traditional sand/cement, liquid self-leveling, and proprietary fast-drying screeds."
  },
  {
    id: 'joinery-l3-building-tech21',
    question: "What is the role of a cavity tray in masonry construction?",
    options: ["To store construction tools", "To carry electrical cables through cavity walls", "To intercept and direct water that penetrates the outer leaf of a cavity wall to the exterior", "To insulate cavity walls"],
    correctAnswer: "To intercept and direct water that penetrates the outer leaf of a cavity wall to the exterior",
    explanation: "A cavity tray intercepts and directs water that penetrates the outer leaf of a cavity wall to the exterior. These waterproof barriers are installed above openings and at other points where the cavity is bridged, preventing water from crossing to the inner leaf and causing damp problems."
  },
  {
    id: 'joinery-l3-building-tech22',
    question: "What is a mansard roof construction?",
    options: ["A flat roof with multiple drainage points", "A roof with a single slope", "A roof with two slopes on each side, the lower slope being steeper than the upper", "A conical roof found only on historic buildings"],
    correctAnswer: "A roof with two slopes on each side, the lower slope being steeper than the upper",
    explanation: "A mansard roof has two slopes on each side, with the lower slope steeper than the upper. This design maximizes usable attic space while reducing the apparent height of the building. Named after French architect François Mansart, it's characterized by almost vertical lower slopes that can incorporate windows for inhabited loft spaces."
  },
  {
    id: 'joinery-l3-building-tech23',
    question: "What is the primary purpose of a parapet wall?",
    options: ["To provide privacy between adjacent buildings", "To extend a wall above the roof level, often for fire protection, safety, or aesthetic purposes", "To support the weight of a roof structure", "To create an area for installing solar panels"],
    correctAnswer: "To extend a wall above the roof level, often for fire protection, safety, or aesthetic purposes",
    explanation: "A parapet wall extends above the roof level, serving multiple purposes: fire protection (preventing fire spread between buildings), fall protection (safety barrier at roof edges), concealing roof-mounted equipment, managing rainwater runoff, and providing architectural detail to building facades."
  },
  {
    id: 'joinery-l3-building-tech24',
    question: "What is a soakaway in building construction?",
    options: ["An area where building materials are soaked before use", "A drainage feature that allows water to drain directly into the ground rather than into sewers", "A type of foundation that absorbs ground moisture", "A method for waterlogging timber deliberately"],
    correctAnswer: "A drainage feature that allows water to drain directly into the ground rather than into sewers",
    explanation: "A soakaway is a drainage feature that allows water to drain directly into the ground rather than into sewers. This sustainable drainage solution manages surface water runoff by creating a below-ground structure filled with rubble or specialized crates that temporarily stores water while it gradually percolates into the surrounding soil."
  },
  {
    id: 'joinery-l3-building-tech25',
    question: "What is a mezzanine floor in building design?",
    options: ["A floor specifically designed for dining", "A partial intermediate floor between main floors of a building", "A floor constructed below ground level", "A floor made exclusively from timber"],
    correctAnswer: "A partial intermediate floor between main floors of a building",
    explanation: "A mezzanine is a partial intermediate floor between main floors of a building. It's typically open to the floor below, covering only a portion of the floor area, and is used to increase usable space without constructing a full-height story, often found in retail, industrial, or high-ceiling residential spaces."
  },
  {
    id: 'joinery-l3-building-tech26',
    question: "What is the purpose of a purlin in roof construction?",
    options: ["To create decorative features on the ceiling", "To provide a horizontal support for roof covering materials, running parallel to the eaves", "To connect the roof to the foundations", "To create internal roof drainage"],
    correctAnswer: "To provide a horizontal support for roof covering materials, running parallel to the eaves",
    explanation: "Purlins provide horizontal support for roof covering materials, running parallel to the eaves. These structural members span between trusses, rafters or walls, supporting the roof deck or battens to which roofing materials are attached, transferring loads to the primary roof structure."
  },
  {
    id: 'joinery-l3-building-tech27',
    question: "What is a spider connection in glazing systems?",
    options: ["A connection designed to keep spiders out of buildings", "A decorative pattern resembling a spider web", "A mechanical fitting that connects glass panels to the building structure with minimal visual intrusion", "A type of crack that can form in glass"],
    correctAnswer: "A mechanical fitting that connects glass panels to the building structure with minimal visual intrusion",
    explanation: "A spider connection is a mechanical fitting that connects glass panels to the building structure with minimal visual intrusion. These stainless steel fittings bolt through countersunk holes in the glass, with arms extending outward like a spider, enabling construction of frameless glass facades, walls, and canopies with high transparency."
  },
  {
    id: 'joinery-l3-building-tech28',
    question: "What is the purpose of a screed rail in floor construction?",
    options: ["To create decorative patterns in the screed", "To serve as a temporary guide to ensure the screed is laid to the correct level", "To strengthen a timber floor", "To create expansion joints only"],
    correctAnswer: "To serve as a temporary guide to ensure the screed is laid to the correct level",
    explanation: "Screed rails serve as temporary guides to ensure the screed is laid to the correct level. These straight edges are set at the desired screed height and used as reference points when leveling the screed material, enabling consistent thickness and flat, level finished surfaces."
  },
  {
    id: 'joinery-l3-building-tech29',
    question: "What is a balloon frame in timber construction?",
    options: ["A frame shaped like a balloon for decorative purposes", "A lightweight frame that can be lifted by balloons", "A timber framing method where wall studs run continuously from foundation to roof", "A curved timber structure only"],
    correctAnswer: "A timber framing method where wall studs run continuously from foundation to roof",
    explanation: "A balloon frame is a timber framing method where wall studs run continuously from foundation to roof. Unlike platform framing (where each floor is framed separately), balloon framing uses long studs spanning multiple stories with intermediate floors supported by ledgers attached to the studs, historically common but now less used due to fire safety concerns."
  },
  {
    id: 'joinery-l3-building-tech30',
    question: "What is the function of a cripple stud in timber frame construction?",
    options: ["A defective stud that needs replacement", "A stud that doesn't extend the full height between plates, used above or below openings", "A reinforcing stud used only in earthquake zones", "A stud installed at a 45-degree angle"],
    correctAnswer: "A stud that doesn't extend the full height between plates, used above or below openings",
    explanation: "A cripple stud doesn't extend the full height between plates, used above or below openings. These shorter studs support headers above doors and windows (cripple studs) or windowsills (sill cripple studs), transferring loads around openings while maintaining consistent spacing for fixing sheet materials."
  },
  {
    id: 'joinery-l3-building-tech31',
    question: "What is a dormer in building construction?",
    options: ["A type of door frame", "A structural column in a timber frame", "A window that projects from a sloping roof with its own roof structure", "A specialized foundation system"],
    correctAnswer: "A window that projects from a sloping roof with its own roof structure",
    explanation: "A dormer is a window that projects from a sloping roof with its own roof structure. This architectural feature creates additional headroom and natural light within loft spaces, and may take various forms including gabled, hipped, shed, or eyebrow, each with distinctive roofing details."
  },
  {
    id: 'joinery-l3-building-tech32',
    question: "What is the purpose of a sleeper wall in suspended timber floor construction?",
    options: ["A wall where building occupants can sleep", "A wall built only during the night", "A low supporting wall that provides intermediate support for floor joists", "A wall that is temporarily constructed during renovation"],
    correctAnswer: "A low supporting wall that provides intermediate support for floor joists",
    explanation: "A sleeper wall is a low supporting wall that provides intermediate support for floor joists. These masonry walls are built between the main loadbearing walls to reduce joist spans, allowing the use of smaller section joists while preventing excessive deflection in suspended timber floors."
  },
  {
    id: 'joinery-l3-building-tech33',
    question: "What is a spandrel panel in building construction?",
    options: ["A decorative panel used only in churches", "The panel between the top of a window on one story and the sill of a window on the story above", "A type of roof tile", "A panel used to create internal partitions only"],
    correctAnswer: "The panel between the top of a window on one story and the sill of a window on the story above",
    explanation: "A spandrel panel is the section between the top of a window on one story and the sill of a window on the story above. In modern construction, these non-vision areas of the façade often consist of insulated panels within a glazing system or separate cladding elements, concealing floor edges, services, or structural elements."
  },
  {
    id: 'joinery-l3-building-tech34',
    question: "What is the purpose of an accoya in timber construction?",
    options: ["A structural connection between timber elements", "A type of timber fastener", "A modified timber product with enhanced durability and dimensional stability through acetylation", "A traditional timber joint used in historic buildings"],
    correctAnswer: "A modified timber product with enhanced durability and dimensional stability through acetylation",
    explanation: "Accoya is a modified timber product with enhanced durability and dimensional stability through acetylation. This process chemically alters the wood's cell structure, creating a Class 1 durability product resistant to rot, insect attack, and moisture-related movement, making it suitable for external joinery applications without traditional preservation treatments."
  },
  {
    id: 'joinery-l3-building-tech35',
    question: "What is a ring beam in building construction?",
    options: ["A circular decorative feature", "A specialized tool for cutting circular openings", "A continuous horizontal structural member that ties walls together and distributes loads", "A round skylight"],
    correctAnswer: "A continuous horizontal structural member that ties walls together and distributes loads",
    explanation: "A ring beam is a continuous horizontal structural member that ties walls together and distributes loads. Typically reinforced concrete, this element runs around the perimeter of a structure at key points (often floor/roof levels), providing lateral stability, preventing wall spreading, and creating a level bearing surface for floor/roof elements."
  },
  {
    id: 'joinery-l3-building-tech36',
    question: "What is a raking shore in building construction?",
    options: ["A specialized digging tool", "A technique for installing roof tiles", "A temporary inclined support used to stabilize walls during construction or renovation", "A sloped drainage channel"],
    correctAnswer: "A temporary inclined support used to stabilize walls during construction or renovation",
    explanation: "A raking shore is a temporary inclined support used to stabilize walls during construction or renovation. These diagonal timber or steel props transfer lateral loads from an unstable wall to the ground at an angle, preventing movement or collapse while work such as underpinning, adjacent excavation, or structural alterations takes place."
  },
  {
    id: 'joinery-l3-building-tech37',
    question: "What is the purpose of a movement joint in brickwork?",
    options: ["To allow bricks to be removed easily for maintenance", "To improve the appearance of the wall", "To accommodate thermal expansion and contraction without causing damage", "To make the wall stronger against wind loads"],
    correctAnswer: "To accommodate thermal expansion and contraction without causing damage",
    explanation: "Movement joints accommodate thermal expansion and contraction without causing damage. These deliberate gaps in brickwork allow independent movement of different wall sections due to temperature changes, moisture movement, and structural settlement, preventing the development of cracks and structural failures in long brick walls."
  },
  {
    id: 'joinery-l3-building-tech38',
    question: "What is a king post in timber roof construction?",
    options: ["The largest post in a timber frame", "A vertical post connecting a tie beam to the apex of a roof truss", "A post installed only in royal buildings", "A horizontal timber at the roof edge"],
    correctAnswer: "A vertical post connecting a tie beam to the apex of a roof truss",
    explanation: "A king post is a vertical post connecting a tie beam to the apex of a roof truss. This central member is in tension, preventing the tie beam from sagging while supporting purlins in some designs. King post trusses are a traditional and still-utilized method for creating triangulated roof structures spanning medium distances."
  },
  {
    id: 'joinery-l3-building-tech39',
    question: "What is a fin wall in building construction?",
    options: ["A wall shaped like a fish fin for decorative purposes", "A projecting wall section that provides lateral support or creates architectural features", "A specialized wall for aquarium buildings", "A wall constructed with extremely thin materials"],
    correctAnswer: "A projecting wall section that provides lateral support or creates architectural features",
    explanation: "A fin wall is a projecting wall section that provides lateral support or creates architectural features. These short wall sections extend perpendicular to the main wall, increasing structural stability through their buttressing effect while sometimes serving to create privacy between spaces or as design elements in modern architecture."
  },
  {
    id: 'joinery-l3-building-tech40',
    question: "What is a mud sill in foundation construction?",
    options: ["A sill made from compacted earth", "A waterproofing element in basement windows", "A timber beam that rests directly on the ground or foundation, supporting the floor system", "A drainage feature around building perimeters"],
    correctAnswer: "A timber beam that rests directly on the ground or foundation, supporting the floor system",
    explanation: "A mud sill is a timber beam that rests directly on the ground or foundation, supporting the floor system. In modern construction, this bottom plate is typically pressure-treated and separated from masonry by a damp-proof course, creating the lowest horizontal member of a timber frame structure that transfers loads to the foundation."
  },
  {
    id: 'joinery-l3-building-tech41',
    question: "What is the purpose of a rising damp barrier in construction?",
    options: ["To increase humidity levels inside buildings", "To allow water to rise through the structure for cooling effects", "To prevent ground moisture from rising through porous building materials by capillary action", "To raise the height of floodwater protection only"],
    correctAnswer: "To prevent ground moisture from rising through porous building materials by capillary action",
    explanation: "A rising damp barrier prevents ground moisture from rising through porous building materials by capillary action. Implemented as a damp-proof course (DPC) or damp-proof membrane (DPM), this waterproof layer creates a physical barrier that blocks moisture migration into walls and floors, protecting the building from dampness, decay, and associated health issues."
  },
  {
    id: 'joinery-l3-building-tech42',
    question: "What is a lally column in building construction?",
    options: ["A decorative column used only for aesthetic purposes", "A column made from laminated timber sections", "A steel tube column filled with concrete used for structural support", "A specialized column used only in traditional Irish buildings"],
    correctAnswer: "A steel tube column filled with concrete used for structural support",
    explanation: "A lally column is a steel tube column filled with concrete used for structural support. This composite element combines the compression strength of concrete with the tensile strength of steel, creating an economical column with high load-bearing capacity relative to its size, commonly used to support beams in basements and other applications requiring intermediate support."
  },
  {
    id: 'joinery-l3-building-tech43',
    question: "What is a drag strut in timber frame construction?",
    options: ["A component that slows down construction deliberately", "A timber that has been damaged by dragging", "A structural member that transfers lateral forces from diaphragms to shear walls or bracing elements", "A strut designed specifically for fire escape routes"],
    correctAnswer: "A structural member that transfers lateral forces from diaphragms to shear walls or bracing elements",
    explanation: "A drag strut transfers lateral forces from diaphragms to shear walls or bracing elements. These members collect and distribute horizontal forces (from wind or seismic events) along floor or roof diaphragms to the vertical lateral force-resisting elements, ensuring loads follow a complete path to the foundation."
  },
  {
    id: 'joinery-l3-building-tech44',
    question: "What is the function of a quoin in building construction?",
    options: ["An internal angle between walls", "A decorative ceiling element", "A reinforced or distinctive corner feature on a masonry building", "An underground foundation element"],
    correctAnswer: "A reinforced or distinctive corner feature on a masonry building",
    explanation: "Quoins are reinforced or distinctive corner features on masonry buildings. Traditionally larger or differently oriented stones or bricks at building corners, they provide both structural reinforcement and decorative articulation. In modern construction, they often serve as ornamental elements replicating historical architectural details."
  },
  {
    id: 'joinery-l3-building-tech45',
    question: "What is a balloon roof in construction terminology?",
    options: ["A roof that is designed to float above the building", "A roof designed to collect rainwater", "A single-membrane roof that rises slightly in the center due to internal pressure", "A curved roof resembling a balloon shape"],
    correctAnswer: "A single-membrane roof that rises slightly in the center due to internal pressure",
    explanation: "A balloon roof is a single-membrane roof that rises slightly in the center due to internal pressure. This tensioned membrane system uses air pressure between the structural deck and the waterproof membrane to create a slightly domed shape that enhances drainage and structural performance, commonly used in large commercial or industrial applications."
  },
  {
    id: 'joinery-l3-building-tech46',
    question: "What is the purpose of a plinth in building construction?",
    options: ["A decorative internal ceiling feature only", "A base or platform that supports a column, statue, or structure, often projecting from the wall line", "A type of roof covering", "A specialized tool used in joinery"],
    correctAnswer: "A base or platform that supports a column, statue, or structure, often projecting from the wall line",
    explanation: "A plinth is a base or platform that supports a column, statue, or structure, often projecting from the wall line. In building construction, it typically refers to the bottom section of a wall that projects slightly from the main wall face, visually strengthening the building's base while offering practical protection from ground-level impact and water splashing."
  },
  {
    id: 'joinery-l3-building-tech47',
    question: "What is a trombe wall in building design?",
    options: ["A temporary wall used during construction", "A wall that contains musical instruments", "A passive solar design feature consisting of a thermal mass wall with glazing to collect and store solar energy", "A specialized wall used only in underground construction"],
    correctAnswer: "A passive solar design feature consisting of a thermal mass wall with glazing to collect and store solar energy",
    explanation: "A trombe wall is a passive solar design feature consisting of a thermal mass wall with glazing to collect and store solar energy. This system includes a high thermal mass wall (typically masonry) positioned behind south-facing glazing, absorbing solar radiation during the day and gradually releasing heat into the interior during the evening, reducing heating requirements."
  },
  {
    id: 'joinery-l3-building-tech48',
    question: "What is the purpose of a thermal break in window and door frames?",
    options: ["To allow the frame to expand when heated by sunlight", "To interrupt the thermal bridge between inside and outside, reducing heat transfer", "To provide a break point if the frame needs to be dismantled", "To create an emergency exit route in case of fire"],
    correctAnswer: "To interrupt the thermal bridge between inside and outside, reducing heat transfer",
    explanation: "A thermal break interrupts the thermal bridge between inside and outside, reducing heat transfer. In window and door frames, particularly aluminum ones, this is typically a continuous strip of low thermal conductivity material separating the interior and exterior frame components, significantly improving thermal performance and reducing condensation risk."
  },
  {
    id: 'joinery-l3-building-tech49',
    question: "What is a spaceframe in construction?",
    options: ["A frame designed for spacecraft only", "A rigid, lightweight structure constructed from interlocking struts in a geometric pattern", "A frame that creates storage space in buildings", "A frame with exceptionally wide spacing between members"],
    correctAnswer: "A rigid, lightweight structure constructed from interlocking struts in a geometric pattern",
    explanation: "A spaceframe is a rigid, lightweight structure constructed from interlocking struts in a geometric pattern. This three-dimensional truss system distributes loads through its triangulated members, providing exceptional strength-to-weight ratio and enabling large column-free spans with minimal materials, commonly used for roofs, canopies, and complex architectural forms."
  },
  {
    id: 'joinery-l3-building-tech50',
    question: "What is the primary function of a weather bar on an external door?",
    options: ["To provide decorative detail", "To reinforce the door against forced entry", "To prevent water ingress at the threshold", "To create an airtight seal when the door is open"],
    correctAnswer: "To prevent water ingress at the threshold",
    explanation: "A weather bar prevents water ingress at the threshold of an external door. Typically a raised metal or synthetic strip attached to the bottom of the door or the threshold, it directs water away from the interface while minimizing draft penetration, creating a weather-resistant barrier while still allowing the door to open and close freely."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-building-tech', 'items', q.id), {
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