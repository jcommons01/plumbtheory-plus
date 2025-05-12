// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3JointsFixings.ts

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

// ✅ Joinery Level 3 Complex Joints & Fixings Questions
const questions = [
  {
    id: 'joinery-l3-joints-fixings1',
    question: "What is the primary advantage of a twin tenon joint over a standard mortise and tenon?",
    options: ["It requires less timber material", "It is faster to cut", "It provides greater resistance to twisting and racking", "It only works with softwood"],
    correctAnswer: "It provides greater resistance to twisting and racking",
    explanation: "A twin tenon joint provides greater resistance to twisting and racking compared to a standard mortise and tenon. By using two separate tenons side by side, the joint distributes load over a larger area and significantly increases resistance to rotational forces, making it particularly valuable for wide components like door stiles."
  },
  {
    id: 'joinery-l3-joints-fixings2',
    question: "What is the purpose of a bridle joint in timber joinery?",
    options: ["To secure metal hardware to timber", "To join timber at right angles, similar to a mortise and tenon but with the mortise open on one side", "To join thin sheets of veneer", "To repair damaged timber sections"],
    correctAnswer: "To join timber at right angles, similar to a mortise and tenon but with the mortise open on one side",
    explanation: "A bridle joint joins timber at right angles, similar to a mortise and tenon but with the mortise open on one side. The open nature makes it easier to cut than a traditional mortise and tenon while providing good mechanical strength and glue surface. It's commonly used for frame corners where its exposed nature is acceptable or desirable."
  },
  {
    id: 'joinery-l3-joints-fixings3',
    question: "What is a housed dovetail joint used for?",
    options: ["Purely decorative applications", "Joining drawer sides to fronts", "Connecting floor joists to beam supports", "Joining thin veneers"],
    correctAnswer: "Connecting floor joists to beam supports",
    explanation: "A housed dovetail joint is primarily used for connecting floor joists to beam supports. This specialized joint combines a housing (dado) with a dovetail, allowing the joist to rest on and be supported by the housing while the dovetail prevents it from pulling away. This creates a secure connection that resists both vertical loads and lateral forces."
  },
  {
    id: 'joinery-l3-joints-fixings4',
    question: "Which joint is most appropriate for joining wide boards edge-to-edge to create solid panels?",
    options: ["Dovetail joint", "Halving joint", "Tongue and groove or loose tongue", "Bridle joint"],
    correctAnswer: "Tongue and groove or loose tongue",
    explanation: "Tongue and groove (or loose tongue) joints are most appropriate for joining wide boards edge-to-edge to create solid panels. These joints provide alignment for creating flat surfaces, increase gluing area, and help prevent boards from warping relative to each other. The loose tongue version allows for easier machining while providing the same benefits."
  },
  {
    id: 'joinery-l3-joints-fixings5',
    question: "What is the primary advantage of a finger joint (also known as a box joint) compared to a dovetail joint?",
    options: ["It is stronger than a dovetail", "It is easier and faster to machine with modern equipment", "It is more water-resistant", "It uses less material"],
    correctAnswer: "It is easier and faster to machine with modern equipment",
    explanation: "The primary advantage of a finger joint compared to a dovetail is that it's easier and faster to machine with modern equipment. While not as mechanically resistant to pulling apart as dovetails, finger joints provide sufficient strength for many applications, good gluing surface, and can be cut quickly with specialized tooling, making them efficient for production environments."
  },
  {
    id: 'joinery-l3-joints-fixings6',
    question: "What is a Domino joint and what is its advantage in modern joinery?",
    options: ["A traditional Japanese jointing technique", "A joint formed using a specialized loose tenon system that offers speed, strength, and accuracy", "A joint only used in boatbuilding", "A joint that can only be hand-cut with chisels"],
    correctAnswer: "A joint formed using a specialized loose tenon system that offers speed, strength, and accuracy",
    explanation: "A Domino joint is formed using a specialized loose tenon system (Festool Domino) that offers speed, strength, and accuracy. It creates oval mortises in both components, which are then connected using pre-manufactured floating tenons. This system combines the strength of traditional mortise and tenon joints with the speed and ease of biscuit jointing."
  },
  {
    id: 'joinery-l3-joints-fixings7',
    question: "What is a coopered joint primarily used for?",
    options: ["Joining timber at right angles", "Creating curved door panels", "Forming cylindrical or curved surfaces from straight boards", "Repairing cracked timber"],
    correctAnswer: "Forming cylindrical or curved surfaces from straight boards",
    explanation: "Coopered joints are primarily used for forming cylindrical or curved surfaces from straight boards. This technique involves cutting beveled edges on multiple narrow boards so they fit together to create a curved surface. Most commonly used for curved doors, bar fronts, and cylindrical items, coopering creates smooth curves from flat stock without bending or laminating."
  },
  {
    id: 'joinery-l3-joints-fixings8',
    question: "What is the primary advantage of a secret dovetail joint?",
    options: ["It is stronger than a standard dovetail", "It is easier to cut", "It conceals the joint from one face, providing a clean appearance from the visible side", "It requires no glue"],
    correctAnswer: "It conceals the joint from one face, providing a clean appearance from the visible side",
    explanation: "The primary advantage of a secret dovetail joint is that it conceals the joint from one face, providing a clean appearance from the visible side. Also called a blind or half-blind dovetail, this joint combines the mechanical strength of a dovetail while only being visible from one side. It's commonly used in drawer construction where the joint is visible from the sides but not from the drawer front."
  },
  {
    id: 'joinery-l3-joints-fixings9',
    question: "What is a mason's miter joint?",
    options: ["A specialized joint for stone construction", "A joint combining a miter and a butt joint to create a clean miter appearance with better gluing surface", "A joint used only in window frames", "A special joint for connecting marble to timber"],
    correctAnswer: "A joint combining a miter and a butt joint to create a clean miter appearance with better gluing surface",
    explanation: "A mason's miter joint combines a miter and a butt joint to create a clean miter appearance with better gluing surface. The visible edge is mitered (typically at 45°) while the majority of the joint is butt-jointed. This provides the attractive appearance of a mitered corner with enhanced mechanical strength and greater gluing area, commonly used in casework and molding applications."
  },
  {
    id: 'joinery-l3-joints-fixings10',
    question: "What is the purpose of drawboring a mortise and tenon joint?",
    options: ["To create a decorative feature", "To allow the joint to be easily disassembled", "To strengthen the joint by using offset holes and pegs to pull and hold the joint tightly together", "To reduce the amount of glue needed"],
    correctAnswer: "To strengthen the joint by using offset holes and pegs to pull and hold the joint tightly together",
    explanation: "Drawboring strengthens a mortise and tenon joint by using offset holes and pegs to pull and hold the joint tightly together. In this technique, the hole through the mortise and the hole through the tenon are deliberately offset, so when the peg is driven through, it pulls the tenon tightly into the mortise. This creates a mechanical lock that maintains tightness even if the glue fails."
  },
  {
    id: 'joinery-l3-joints-fixings11',
    question: "What is a lapped dovetail joint?",
    options: ["A simplified version of a dovetail using lap joint principles", "A dovetail joint with limited material thickness", "A variant of a dovetail where one piece overlaps the other but dovetails secure the joint", "A version that is glued and wrapped with fiber"],
    correctAnswer: "A variant of a dovetail where one piece overlaps the other but dovetails secure the joint",
    explanation: "A lapped dovetail joint is a variant where one piece overlaps the other but dovetails secure the joint. This hybrid joint combines features of a lap joint and a dovetail, with the dovetail elements preventing the overlapping section from being pulled away. It's often used in casework where full dovetails aren't possible or when one piece needs to continue past the joint."
  },
  {
    id: 'joinery-l3-joints-fixings12',
    question: "What is a barefaced tenon joint?",
    options: ["A tenon with decorative face cuts", "A tenon without shoulders on one side", "A joint made without using machinery", "A joint specifically for door frames"],
    correctAnswer: "A tenon without shoulders on one side",
    explanation: "A barefaced tenon is a tenon without shoulders on one side. This joint variant is particularly useful when joining timbers of different thicknesses, as the absence of a shoulder on one face allows the tenon's timber to sit flush with the face of the mortised member. It provides good mechanical strength while accommodating the transition between different thicknesses."
  },
  {
    id: 'joinery-l3-joints-fixings13',
    question: "What is the purpose of a mitered bridle joint?",
    options: ["To create a decorative feature only", "To join timber at right angles with the structural advantages of a bridle joint but the appearance of a miter joint", "To improve the strength of standard miter joints using metal brackets", "A specialized joint only used in traditional Japanese woodworking"],
    correctAnswer: "To join timber at right angles with the structural advantages of a bridle joint but the appearance of a miter joint",
    explanation: "A mitered bridle joint joins timber at right angles with the structural advantages of a bridle joint but the appearance of a miter joint. This combination joint has a 45° miter on the visible corner, but internally uses a bridle joint structure for mechanical strength. It offers a clean, seamless appearance on the outside while providing better structural integrity than a simple miter."
  },
  {
    id: 'joinery-l3-joints-fixings14',
    question: "What is a tusk tenon joint primarily used for?",
    options: ["Decorative door panels", "Joining timber at right angles where disassembly might be required", "Cabinet back panels", "Curved work only"],
    correctAnswer: "Joining timber at right angles where disassembly might be required",
    explanation: "A tusk tenon joint is primarily used for joining timber at right angles where disassembly might be required. This traditional joint passes the tenon through the mortised member, with a wedge (tusk) inserted through a slot in the projecting tenon to lock the joint. It creates a strong mechanical connection that can be taken apart by removing the wedge, making it ideal for frames that may need disassembly."
  },
  {
    id: 'joinery-l3-joints-fixings15',
    question: "What is the advantage of using a double housing joint compared to a single housing joint?",
    options: ["It provides a decorative feature", "It allows for easier disassembly", "It increases resistance to racking and provides greater mechanical strength", "It reduces the amount of timber needed"],
    correctAnswer: "It increases resistance to racking and provides greater mechanical strength",
    explanation: "A double housing joint increases resistance to racking and provides greater mechanical strength compared to a single housing. By using two parallel housings to receive the inserted member, the joint creates additional support and resistance to twisting or lateral forces. This makes it particularly valuable for shelving or structural connections that must resist significant loads."
  },
  {
    id: 'joinery-l3-joints-fixings16',
    question: "What is a keyed miter joint?",
    options: ["A miter joint that uses a door key for locking", "A miter joint reinforced with a spline, key, or butterfly to increase strength", "A joint used only in window construction", "A joint held together with a metal key"],
    correctAnswer: "A miter joint reinforced with a spline, key, or butterfly to increase strength",
    explanation: "A keyed miter joint is a miter joint reinforced with a spline, key, or butterfly to increase strength. This technique addresses the inherent weakness of standard miter joints by adding a reinforcing element across the joint line. These keys provide mechanical strength, additional glue surface, and help maintain alignment, while still preserving the clean appearance of the miter on the external corner."
  },
  {
    id: 'joinery-l3-joints-fixings17',
    question: "What is the purpose of a scribed joint in joinery?",
    options: ["To create decorative writing on timber", "To allow one molded or shaped component to fit perfectly against an irregular surface or another molded component", "To date and sign furniture pieces", "To join veneers together"],
    correctAnswer: "To allow one molded or shaped component to fit perfectly against an irregular surface or another molded component",
    explanation: "A scribed joint allows one molded or shaped component to fit perfectly against an irregular surface or another molded component. The technique involves transferring the exact profile of one surface to the mating piece, then cutting along this line to create a perfect fit. Commonly used where moldings meet at corners or where joinery meets irregular walls, scribing creates seamless transitions and tight-fitting joints."
  },
  {
    id: 'joinery-l3-joints-fixings18',
    question: "What is a knuckle joint in timber joinery?",
    options: ["A joint designed to look like human knuckles", "A reinforced butt joint for thin materials", "A joint consisting of interlocking semi-circular sections allowing controlled movement, similar to a hinge", "A joint used only in bent lamination work"],
    correctAnswer: "A joint consisting of interlocking semi-circular sections allowing controlled movement, similar to a hinge",
    explanation: "A knuckle joint consists of interlocking semi-circular sections allowing controlled movement, similar to a hinge. This specialized joint creates a pivot point between components, typically used for folding or adjustable furniture elements. The alternating projections on each piece interlock to allow rotation while maintaining a strong connection, functioning essentially as a wooden hinge system."
  },
  {
    id: 'joinery-l3-joints-fixings19',
    question: "What is the primary advantage of lamello biscuit joints in modern joinery?",
    options: ["They are completely waterproof", "They provide speed and accuracy for alignment while creating a strong joint when glued", "They are more decorative than traditional joints", "They don't require any specialized tools"],
    correctAnswer: "They provide speed and accuracy for alignment while creating a strong joint when glued",
    explanation: "Lamello biscuit joints provide speed and accuracy for alignment while creating a strong joint when glued. These compressed wooden biscuits fit into matching slots cut by a biscuit joiner, expanding slightly when they absorb moisture from the glue. They ensure perfect alignment of components while adding significant strength to edge and corner joints, making assembly faster and more precise than many traditional methods."
  },
  {
    id: 'joinery-l3-joints-fixings20',
    question: "What does the term 'housing joint' refer to?",
    options: ["Any joint used in residential construction", "A trench or groove cut across the grain that receives another component", "A temporary joint used during construction", "A joint specifically for joining roof components"],
    correctAnswer: "A trench or groove cut across the grain that receives another component",
    explanation: "A housing joint refers to a trench or groove cut across the grain that receives another component. This recessed channel (also called a dado in some regions) provides both mechanical support and alignment for the inserted piece. Housing joints are commonly used for shelving, cabinet dividers, and anywhere one component needs to join to another at a right angle with good support."
  },
  {
    id: 'joinery-l3-joints-fixings21',
    question: "What is the purpose of a sliding dovetail joint?",
    options: ["To allow for movement during seasonal changes", "To join components at right angles where one component needs to slide into position along a dovetailed groove", "For decorative effects only", "To reduce the visibility of the joint"],
    correctAnswer: "To join components at right angles where one component needs to slide into position along a dovetailed groove",
    explanation: "A sliding dovetail joins components at right angles where one component needs to slide into position along a dovetailed groove. This joint combines the strength of a dovetail with the support of a housing, preventing the inserted piece from pulling away while also supporting it from below. It's commonly used for cabinet dividers, drawer supports, and joining cabinet sides to shelves where strength is critical."
  },
  {
    id: 'joinery-l3-joints-fixings22',
    question: "What is a birds-mouth joint primarily used for?",
    options: ["Decorative effects in furniture", "Architectural moldings", "Joining rafters to wall plates in roof construction", "Cabinet door frames"],
    correctAnswer: "Joining rafters to wall plates in roof construction",
    explanation: "A birds-mouth joint is primarily used for joining rafters to wall plates in roof construction. This specialized notch cut into the rafter creates two surfaces: a horizontal seat cut that rests on the wall plate, and a vertical plumb cut that butts against the side of the plate. This joint transfers roof loads safely to the supporting wall while maintaining the correct rafter angle."
  },
  {
    id: 'joinery-l3-joints-fixings23',
    question: "What is the primary advantage of a comb joint (also known as a box comb or finger joint) in box construction?",
    options: ["It requires very little glue", "It can be assembled without tools", "It provides a large gluing surface and good mechanical strength", "It is completely invisible when assembled"],
    correctAnswer: "It provides a large gluing surface and good mechanical strength",
    explanation: "The primary advantage of a comb joint in box construction is that it provides a large gluing surface and good mechanical strength. The interlocking fingers create significant surface area for adhesive, while also providing mechanical resistance to pulling apart. This joint is particularly effective for box corners where the end grain would otherwise create a weak glue joint."
  },
  {
    id: 'joinery-l3-joints-fixings24',
    question: "What is the appropriate application for a loose tongue joint?",
    options: ["End grain to end grain connections only", "Edge-to-edge board joining to create wider panels", "Purely decorative features", "Temporary fixing during construction"],
    correctAnswer: "Edge-to-edge board joining to create wider panels",
    explanation: "A loose tongue joint is appropriate for edge-to-edge board joining to create wider panels. This joint uses a separate strip of wood inserted into matching grooves in the edges of boards being joined. The loose tongue provides alignment and increased gluing surface without requiring the edges to have integrated tongues and grooves, making it easier to machine the workpieces."
  },
  {
    id: 'joinery-l3-joints-fixings25',
    question: "What is the difference between a through dovetail joint and a half-blind dovetail joint?",
    options: ["Through dovetails are twice the size of half-blind dovetails", "Through dovetails are visible from both sides, while half-blind dovetails are only visible from one side", "Through dovetails can only be hand-cut, half-blind dovetails can only be machine-cut", "Through dovetails use less material than half-blind dovetails"],
    correctAnswer: "Through dovetails are visible from both sides, while half-blind dovetails are only visible from one side",
    explanation: "The key difference is that through dovetails are visible from both sides, while half-blind dovetails are only visible from one side. In a through dovetail, the joint shows on both faces of the corner, while a half-blind (or blind) dovetail has tails that don't extend completely through the pin board, concealing the joint from one face. Half-blind dovetails are typically used for drawer fronts, where the joint should not be visible from the front."
  },
  {
    id: 'joinery-l3-joints-fixings26',
    question: "What is a dowel joint and what are its primary applications in joinery?",
    options: ["A decorative joint used only in period furniture", "A joint using wooden pegs inserted into matching holes to align and strengthen the connection", "A joint that can only be used in softwoods", "A temporary joint used during construction"],
    correctAnswer: "A joint using wooden pegs inserted into matching holes to align and strengthen the connection",
    explanation: "A dowel joint uses wooden pegs inserted into matching holes to align and strengthen the connection. These cylindrical pegs provide alignment and increased mechanical strength when glued in place. Commonly used for edge-to-edge panel glue-ups, frame corners, case construction, and reinforcing other joints, dowels offer a strong, relatively simple jointing method with good holding power."
  },
  {
    id: 'joinery-l3-joints-fixings27',
    question: "What is a cogged joint used for in timber framing?",
    options: ["Decorative effects only", "Joining glazing bars in windows", "Joining beams where one must rest on top of another while resisting lateral movement", "A specialized joint for curved work"],
    correctAnswer: "Joining beams where one must rest on top of another while resisting lateral movement",
    explanation: "A cogged joint is used for joining beams where one must rest on top of another while resisting lateral movement. This joint involves cutting a notch (cog) in the lower beam and a corresponding projection on the upper beam. The resulting mechanical interlock allows the upper beam to rest securely on the lower one while preventing sideways movement, commonly used in traditional heavy timber frame construction."
  },
  {
    id: 'joinery-l3-joints-fixings28',
    question: "What is the primary purpose of using threaded inserts in joinery?",
    options: ["To create decorative patterns", "To repair damaged timber", "To provide strong, reusable threads in timber for bolts or screws, particularly for knock-down fittings", "To attach metal brackets permanently"],
    correctAnswer: "To provide strong, reusable threads in timber for bolts or screws, particularly for knock-down fittings",
    explanation: "Threaded inserts provide strong, reusable threads in timber for bolts or screws, particularly for knock-down fittings. These metal components are installed in pre-drilled holes, creating durable threading that won't strip out like threads cut directly into wood. They're especially valuable for furniture that requires occasional disassembly, or joints subject to repeated tightening and loosening."
  },
  {
    id: 'joinery-l3-joints-fixings29',
    question: "What is a splined miter joint?",
    options: ["A basic miter joint cut at 45 degrees", "A miter joint reinforced with a thin strip of wood or other material inserted across the joint line", "A joint used only in picture frames", "A joint that can only be cut by hand"],
    correctAnswer: "A miter joint reinforced with a thin strip of wood or other material inserted across the joint line",
    explanation: "A splined miter joint is a miter joint reinforced with a thin strip of wood or other material inserted across the joint line. This spline adds significant strength to what would otherwise be a relatively weak end-grain to end-grain connection, while also helping with alignment during assembly. The spline can be visible as a decorative feature or hidden within the joint for a clean external appearance."
  },
  {
    id: 'joinery-l3-joints-fixings30',
    question: "What is the advantage of a wedged through-tenon joint?",
    options: ["It is easier to cut than a standard tenon", "It can be completely concealed", "It creates a mechanical lock that prevents the tenon from pulling out, even if glue fails", "It allows for seasonal movement"],
    correctAnswer: "It creates a mechanical lock that prevents the tenon from pulling out, even if glue fails",
    explanation: "A wedged through-tenon joint creates a mechanical lock that prevents the tenon from pulling out, even if glue fails. In this variation, the tenon extends through the mortised piece, and wedges are driven into kerfs (slots) cut in the tenon, causing it to flare outward on the far side. This creates a dovetail-like effect that physically prevents withdrawal of the tenon without disassembling the wedges."
  },
  {
    id: 'joinery-l3-joints-fixings31',
    question: "What is a secret mitered dovetail joint used for?",
    options: ["Joining drawer sides to fronts", "High-end casework where both strength and clean aesthetics are required", "Temporary construction joints", "Structural timber framing"],
    correctAnswer: "High-end casework where both strength and clean aesthetics are required",
    explanation: "A secret mitered dovetail joint is used for high-end casework where both strength and clean aesthetics are required. This sophisticated joint combines the mechanical strength of a dovetail with the clean appearance of a miter, showing only a miter line on the outside corner while containing concealed dovetails internally. It's particularly valued for fine furniture where both structural integrity and seamless appearance are essential."
  },
  {
    id: 'joinery-l3-joints-fixings32',
    question: "What are confirmat screws designed for?",
    options: ["General woodworking in solid timber", "Specifically for joining panel products like particleboard and MDF", "Outdoor applications only", "Decorative exposed fixings"],
    correctAnswer: "Specifically for joining panel products like particleboard and MDF",
    explanation: "Confirmat screws are designed specifically for joining panel products like particleboard and MDF. These specialized fasteners feature a high thread-to-shaft ratio, sharp cutting threads, and a cylindrical head that sits in a precisely drilled clearance hole. They create strong joints in engineered panels without the splitting concerns of traditional woodscrews, making them ideal for modern cabinet construction."
  },
  {
    id: 'joinery-l3-joints-fixings33',
    question: "What is a free tenon joint (also known as a floating tenon)?",
    options: ["A joint that does not require any adhesive", "A joint where the tenon is not fixed to either piece but rather inserted into mortises in both joining components", "A joint that allows the timber to expand and contract", "A joint that hangs freely without support"],
    correctAnswer: "A joint where the tenon is not fixed to either piece but rather inserted into mortises in both joining components",
    explanation: "A free tenon joint (floating tenon) is where the tenon is not fixed to either piece but rather inserted into mortises in both joining components. Instead of cutting a tenon on one piece, matching mortises are cut in both pieces, and a separate piece of wood forms the tenon. This approach simplifies machining while providing the strength of a traditional mortise and tenon, and is the principle behind systems like Domino joinery."
  },
  {
    id: 'joinery-l3-joints-fixings34',
    question: "What is a pinned joint in traditional joinery?",
    options: ["A joint using small metal pins for decoration", "Any joint held together with adhesive", "A joint where additional strength is provided by wooden or metal pins driven through the assembled components", "A joint designed to rotate"],
    correctAnswer: "A joint where additional strength is provided by wooden or metal pins driven through the assembled components",
    explanation: "A pinned joint in traditional joinery is one where additional strength is provided by wooden or metal pins driven through the assembled components. These pins provide reinforcement to other joints like mortise and tenon or dovetails, offering insurance against glue failure and additional mechanical strength. Historically, pins were often used in lieu of glue, while modern applications typically use both for maximum durability."
  },
  {
    id: 'joinery-l3-joints-fixings35',
    question: "What is the advantage of using a cam lock fixing in cabinet construction?",
    options: ["They are cheaper than screws", "They allow for quick assembly and disassembly without tools", "They create permanent, non-removable joints", "They are completely invisible when installed"],
    correctAnswer: "They allow for quick assembly and disassembly without tools",
    explanation: "Cam lock fixings allow for quick assembly and disassembly without tools in cabinet construction. These two-part fittings consist of a dowel or bolt with a specialized head that engages a rotating cam. When the cam is turned, it locks onto the head of the bolt, drawing the components tightly together. This system is particularly valuable for knock-down furniture that requires occasional disassembly for transport or storage."
  },
  {
    id: 'joinery-l3-joints-fixings36',
    question: "What is a stub tenon joint?",
    options: ["A tenon that has been damaged or cut too short", "A deliberately short tenon used where a full-length tenon is unnecessary or impossible", "A tenon used only in door construction", "A technique for joining thin materials"],
    correctAnswer: "A deliberately short tenon used where a full-length tenon is unnecessary or impossible",
    explanation: "A stub tenon is a deliberately short tenon used where a full-length tenon is unnecessary or impossible. Typically 1/3 the thickness of the mortised piece (compared to 1/2 or more for a standard tenon), stub tenons provide adequate strength for many applications while requiring less material removal for the mortise. They're commonly used in situations where a deeper mortise would weaken the receiving piece or break through to the other side."
  },
  {
    id: 'joinery-l3-joints-fixings37',
    question: "What is the purpose of a Z-dowel joint?",
    options: ["To create a decorative Z pattern", "To join timbers at right angles", "To join face frames to cabinet sides while concealing the dowels from both visible faces", "A type of joint used only in Eastern European furniture"],
    correctAnswer: "To join face frames to cabinet sides while concealing the dowels from both visible faces",
    explanation: "A Z-dowel joint joins face frames to cabinet sides while concealing the dowels from both visible faces. This specialized technique involves drilling angled holes from the back side of the face frame and from the inside face of the cabinet side, creating a Z-shaped dowel path that's hidden from view. The result is a strong mechanical connection without visible fasteners on either external surface."
  },
  {
    id: 'joinery-l3-joints-fixings38',
    question: "What is a butterfly joint (also known as a bow tie joint) used for in joinery?",
    options: ["Purely decorative effects", "Reinforcing areas with cracks or splits, or joining two boards while allowing for movement", "Joining metals to timber", "Creating curved components"],
    correctAnswer: "Reinforcing areas with cracks or splits, or joining two boards while allowing for movement",
    explanation: "A butterfly joint (bow tie) is used for reinforcing areas with cracks or splits, or joining two boards while allowing for movement. These bow tie shaped inlays are inserted across cracks or joining lines, with the wider ends resisting the tendency of the wood to separate further. While functionally stabilizing the wood, they often become a decorative feature highlighting the repair rather than concealing it."
  },
  {
    id: 'joinery-l3-joints-fixings39',
    question: "What is a cross halving joint used for?",
    options: ["Curved work only", "Joining timber of different species", "Joining timbers crossing at right angles where maintaining a flush surface is important", "A joint used only in flooring"],
    correctAnswer: "Joining timbers crossing at right angles where maintaining a flush surface is important",
    explanation: "A cross halving joint is used for joining timbers crossing at right angles where maintaining a flush surface is important. This joint involves cutting away half the depth of each piece at the intersection, allowing them to fit together while maintaining a consistent overall thickness. It's commonly used in frame construction, lattice work, and wherever timbers need to cross while keeping a flat surface."
  },
  {
    id: 'joinery-l3-joints-fixings40',
    question: "What is the purpose of expansion bolts in joinery?",
    options: ["To allow timber to expand naturally", "To join two pieces of timber end to end", "To securely fix joinery components to masonry or concrete", "To create decorative patterns"],
    correctAnswer: "To securely fix joinery components to masonry or concrete",
    explanation: "Expansion bolts securely fix joinery components to masonry or concrete. When tightened, these specialized fasteners expand within the drilled hole, creating a mechanical grip against the hole walls. They provide high holding strength for securing heavy joinery items like cabinets, handrails, or structural elements to solid masonry substrates where standard fixings would be inadequate."
  },
  {
    id: 'joinery-l3-joints-fixings41',
    question: "What is a haunched tenon joint and why is it used?",
    options: ["A tenon with decorative cuts, used for aesthetic purposes", "A tenon with a small projection above the main tenon, used to fill the groove in a rail while maintaining strength", "A tenon that has been damaged, used only as a repair technique", "A tenon with a curved shape, used in Art Nouveau furniture"],
    correctAnswer: "A tenon with a small projection above the main tenon, used to fill the groove in a rail while maintaining strength",
    explanation: "A haunched tenon is a tenon with a small projection above the main tenon, used to fill the groove in a rail while maintaining strength. Commonly used in frame construction where the rails have a continuous groove (like for panel doors), the haunch fills what would otherwise be an unsightly and weakening gap where the groove meets the stile, while the main tenon provides the joint's strength."
  },
  {
    id: 'joinery-l3-joints-fixings42',
    question: "What are 'bed bolts' primarily used for in furniture construction?",
    options: ["Attaching headboards to bed frames", "Joining the rails and posts of beds in a way that allows for disassembly", "Securing mattresses to bed frames", "A specialized bolt only used in antique four-poster beds"],
    correctAnswer: "Joining the rails and posts of beds in a way that allows for disassembly",
    explanation: "Bed bolts are primarily used for joining the rails and posts of beds in a way that allows for disassembly. These specialized fasteners consist of a long bolt inserted through the post that engages with a threaded barrel nut in the rail. This creates a strong, tight-fitting joint that can be disassembled when needed, making beds easier to transport while maintaining a solid feel when assembled."
  },
  {
    id: 'joinery-l3-joints-fixings43',
    question: "What is a bridle scarf joint used for?",
    options: ["Joining timber end to end while maintaining strength", "Creating decorative features in exposed timber", "Joining thin sheets of veneer", "A specialized joint for door frames only"],
    correctAnswer: "Joining timber end to end while maintaining strength",
    explanation: "A bridle scarf joint is used for joining timber end to end while maintaining strength. This specialized joint creates a structural connection between timbers aligned in the same direction, particularly valuable in restoration work where timbers need extending. The interlocking nature of the joint provides resistance to bending in multiple directions while maintaining a significant portion of the original timber's strength."
  },
  {
    id: 'joinery-l3-joints-fixings44',
    question: "What is a 'French dovetail' joint used for?",
    options: ["A standard dovetail joint developed in France", "Joining drawer sides to fronts where the joint should be concealed from the front", "A special joint only used in French furniture", "A stronger version of traditional dovetails"],
    correctAnswer: "Joining drawer sides to fronts where the joint should be concealed from the front",
    explanation: "A French dovetail (also called a French rebated dovetail) is used for joining drawer sides to fronts where the joint should be concealed from the front. The joint combines elements of a dovetail with a rebate along the top edge, allowing the drawer front to overlay the sides and top edge while maintaining the strength of a dovetail joint. This technique creates a clean appearance from the front while retaining mechanical strength."
  },
  {
    id: 'joinery-l3-joints-fixings45',
    question: "What is a 'chase mortise and tenon' joint?",
    options: ["A mortise and tenon that requires pursuing (chasing) to align properly", "A simplified mortise and tenon used only in rustic furniture", "A joint where the mortise is cut through the face of the timber rather than the edge", "A joint developed for door frames only"],
    correctAnswer: "A joint where the mortise is cut through the face of the timber rather than the edge",
    explanation: "A chase mortise and tenon is a joint where the mortise is cut through the face of the timber rather than the edge. This approach is used when access to the edge is difficult or impossible, or for aesthetic reasons. The mortise is typically cut as a stopped channel from the face, and the tenon slides in from the exposed end. This technique is particularly useful for installing cross-members between existing posts or adding supports to assembled structures."
  },
  {
    id: 'joinery-l3-joints-fixings46',
    question: "What is the purpose of a 'mitered shoulder' on a tenon joint?",
    options: ["To make the joint easier to cut", "To provide a decorative feature only", "To create a clean appearance by concealing the joint line at external corners", "To weaken the joint deliberately for controlled breaking points"],
    correctAnswer: "To create a clean appearance by concealing the joint line at external corners",
    explanation: "A mitered shoulder on a tenon joint creates a clean appearance by concealing the joint line at external corners. This modification to a standard mortise and tenon features a 45° miter cut on the shoulder that meets a corresponding miter on the mortised piece. The result is a clean external corner that appears to be a simple miter joint, while internally maintaining the structural strength of a mortise and tenon connection."
  },
  {
    id: 'joinery-l3-joints-fixings47',
    question: "What is the advantage of using pocket hole joinery?",
    options: ["It is stronger than traditional joinery", "It allows joints to be created quickly without visible fasteners on the primary face", "It eliminates the need for measuring", "It is completely waterproof"],
    correctAnswer: "It allows joints to be created quickly without visible fasteners on the primary face",
    explanation: "The advantage of pocket hole joinery is that it allows joints to be created quickly without visible fasteners on the primary face. This technique involves drilling angled holes that enable screws to connect pieces from the inside or rear of the assembly. While not as strong as traditional joinery methods, it offers efficiency, ease of use, and clean appearance from the front, making it popular for production environments and projects where speed is prioritized."
  },
  {
    id: 'joinery-l3-joints-fixings48',
    question: "What is the purpose of a 'loose tongue slipper joint'?",
    options: ["To create a decorative effect resembling a slipper", "To join wide boards at an angle, particularly in hoppers or tapered boxes", "A joint that can be easily disassembled", "A joint developed for boat building only"],
    correctAnswer: "To join wide boards at an angle, particularly in hoppers or tapered boxes",
    explanation: "A loose tongue slipper joint is used to join wide boards at an angle, particularly in hoppers or tapered boxes. This specialized joint uses a loose tongue inserted into corresponding grooves cut in the joining boards, but with the twist that the groove angles match the taper angle. This creates a strong connection between angled boards, preventing them from pulling apart when under tension, while the loose tongue provides significant glue surface."
  },
  {
    id: 'joinery-l3-joints-fixings49',
    question: "What is a 'Pastry Dove' joint and where is it typically used?",
    options: ["A simplified dovetail joint used in kitchen cabinetry", "A joint specifically designed for pastry boards", "A decorative variant of a dovetail using a different angle", "A variant of dovetails with vertical sides on the pins used in carcass construction"],
    correctAnswer: "A variant of dovetails with vertical sides on the pins used in carcass construction",
    explanation: "A Pastry Dove joint is a variant of dovetails with vertical sides on the pins, typically used in carcass construction. Unlike standard dovetails where both the pins and tails are angled, the pins in a Pastry Dove have vertical sides while the sockets maintain the traditional dovetail angle. This creates a joint that's easier to cut by machine but still provides the mechanical interlocking and aesthetic benefits of dovetail construction."
  },
  {
    id: 'joinery-l3-joints-fixings50',
    question: "What is a 'saddle joint' used for in timber construction?",
    options: ["Joining timber in a decorative pattern resembling a saddle", "Connecting timber elements at right angles where one piece sits on top of the other", "A joint specifically used in equestrian equipment", "A reinforced miter joint"],
    correctAnswer: "Connecting timber elements at right angles where one piece sits on top of the other",
    explanation: "A saddle joint connects timber elements at right angles where one piece sits on top of the other. This joint involves cutting a concave notch in the upper piece that fits over a convex surface on the lower piece, creating a secure connection that resists sideways movement. Commonly used in log construction and timber framing, the saddle joint provides good load transfer for vertical members while maintaining alignment between the connected pieces."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-joints-fixings', 'items', q.id), {
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