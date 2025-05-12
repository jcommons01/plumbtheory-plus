// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2Materials.ts

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

// ✅ Joinery Level 2 Materials Knowledge Questions
const questions = [
  {
    id: 'joinery-l2-materials1',
    question: "What is the difference between exterior grade plywood and interior grade plywood?",
    options: ["Exterior grade is always thicker than interior grade", "Exterior grade uses waterproof adhesives while interior grade uses moisture-resistant adhesives", "Exterior grade is always made from hardwood while interior grade uses softwood", "There is no difference except the price"],
    correctAnswer: "Exterior grade uses waterproof adhesives while interior grade uses moisture-resistant adhesives",
    explanation: "The key difference between exterior and interior grade plywood is that exterior grade uses waterproof adhesives (typically phenol-formaldehyde) while interior grade uses moisture-resistant adhesives (typically urea-formaldehyde). This makes exterior grade suitable for conditions where it may be exposed to weather or high humidity. In the UK, plywood is graded according to BS EN 636, with designations including EN 636-1 (dry conditions), EN 636-2 (humid conditions), and EN 636-3 (exterior conditions). Exterior grade plywood also typically uses higher quality veneers with fewer defects and may incorporate fungicides for additional protection. For joiners, selecting the appropriate grade is crucial for ensuring longevity of the finished work, particularly for applications like external doors, window components, or joinery in high-moisture environments like bathrooms."
  },
  {
    id: 'joinery-l2-materials2',
    question: "Which of the following adhesives is most appropriate for exterior joinery applications?",
    options: ["PVA (Polyvinyl Acetate)", "UF (Urea Formaldehyde)", "PU (Polyurethane)", "Animal hide glue"],
    correctAnswer: "PU (Polyurethane)",
    explanation: "Polyurethane (PU) adhesive is most appropriate for exterior joinery applications. It creates a strong, waterproof bond that can withstand outdoor conditions and temperature fluctuations. PU adhesives cure through reaction with moisture, actually benefitting from slightly damp conditions, and maintain flexibility after curing which helps accommodate the natural movement of timber outdoors. Standard PVA is not waterproof and will fail in exterior applications, though exterior-rated PVA variants offer some water resistance. Urea Formaldehyde (UF) offers good water resistance but becomes brittle when cured, potentially cracking with timber movement. Animal hide glue has poor water resistance and is primarily used in furniture restoration. UK joiners typically select PU adhesives for exterior doors, windows, and outdoor furniture to ensure long-term durability in the British climate."
  },
  {
    id: 'joinery-l2-materials3',
    question: "What is MDF (Medium Density Fibreboard) made from?",
    options: ["Solid timber compressed under high pressure", "Resin-bonded wood fibres", "Layers of veneer glued together", "Plastic and wood composite"],
    correctAnswer: "Resin-bonded wood fibres",
    explanation: "MDF (Medium Density Fibreboard) is made from resin-bonded wood fibres. The manufacturing process involves breaking down softwood into wood fibres, which are then mixed with wax and a resin binder, typically urea-formaldehyde. This mixture is formed into panels using heat and pressure. The result is a consistent, stable sheet material with no grain pattern, knots, or natural defects. In UK joinery, MDF is widely used for components requiring a smooth, uniform surface for painting, such as cabinet doors, architectural mouldings, and wall panelling. It's available in various grades including standard, moisture-resistant (MR-MDF), and fire-retardant versions. While offering excellent machinability and surface quality, joiners should be aware that MDF creates fine dust during cutting which requires effective extraction, and standard MDF has poor moisture resistance unless properly sealed on all surfaces including edges."
  },
  {
    id: 'joinery-l2-materials4',
    question: "What is the purpose of a wood hardener product in joinery?",
    options: ["To make all timber harder and more durable", "To strengthen softened or decayed wood by penetrating and reinforcing the wood fibres", "To accelerate the natural hardening process of freshly cut timber", "To create a protective barrier against UV damage"],
    correctAnswer: "To strengthen softened or decayed wood by penetrating and reinforcing the wood fibres",
    explanation: "Wood hardener products are designed to strengthen softened or decayed wood by penetrating and reinforcing the wood fibres. These low-viscosity resin solutions soak into deteriorated areas and cure to form a solid matrix that stabilizes the wood structure. In UK joinery practice, wood hardeners are typically used in restoration and repair work, particularly for treating localised areas of decay in timber window frames, door frames, or exterior joinery where replacement would be impractical or undesirable. They're often used as a preparatory treatment before applying wood fillers to ensure the filler has a sound base. Most commercial wood hardeners are based on epoxy or acrylic resins and should be applied to clean, dry wood. While effective for reinforcing weakened timber, hardeners cannot restore severely decayed wood where structural integrity has been completely compromised."
  },
  {
    id: 'joinery-l2-materials5',
    question: "Which of the following sheet materials has the highest moisture resistance?",
    options: ["Standard MDF", "Chipboard", "OSB (Oriented Strand Board)", "Marine plywood"],
    correctAnswer: "Marine plywood",
    explanation: "Marine plywood has the highest moisture resistance among the listed sheet materials. Manufactured specifically for high-humidity and wet environments, it uses exclusively WBP (Weather and Boil Proof) adhesives and higher-grade veneers throughout all plies, not just the face veneers. In the UK, genuine marine plywood should comply with BS1088, which specifies high-quality face and core veneers of durable timber species (often tropical hardwoods like okoume or meranti) with minimal defects and gaps between plies. This construction makes it highly resistant to delamination even in consistently wet conditions. While significantly more expensive than standard sheet materials, marine plywood is essential for joinery applications involving direct water exposure, such as exterior door thresholds, window components, bathroom installations, or garden structures. Standard MDF and chipboard have poor water resistance, while OSB has moderate moisture resistance but will deteriorate with prolonged exposure."
  },
  {
    id: 'joinery-l2-materials6',
    question: "What is the main advantage of using laminated timber components over solid timber in joinery?",
    options: ["They are always less expensive", "Greater dimensional stability and reduced movement", "They are lighter and easier to transport", "They can only be used in decorative applications"],
    correctAnswer: "Greater dimensional stability and reduced movement",
    explanation: "The main advantage of using laminated timber components over solid timber in joinery is greater dimensional stability and reduced movement. By bonding multiple layers of timber with opposing or alternating grain directions, the tendency of wood to expand, contract, and warp with moisture changes is significantly neutralized, as movement in one layer is constrained by differently oriented adjacent layers. For UK joiners, laminated components (such as door stiles, window jambs, and structural beams) provide consistent performance in the variable British climate. Additional benefits include: the ability to create larger sections than available in solid timber; reduced tendency to split or check; efficient use of timber resources by utilizing smaller sections; and the option to select higher-grade timber for visible faces while using lower grades internally. Laminated components have become standard in high-performance joinery, particularly for exterior applications where stability is crucial."
  },
  {
    id: 'joinery-l2-materials7',
    question: "What type of glass should be used in a door panel below 800mm from floor level according to UK Building Regulations?",
    options: ["Standard float glass", "Toughened or laminated safety glass", "Wired glass", "Textured obscured glass"],
    correctAnswer: "Toughened or laminated safety glass",
    explanation: "According to UK Building Regulations Approved Document K, toughened or laminated safety glass must be used in door panels below 800mm from floor level. This requirement exists because these areas are considered 'critical locations' with high risk of human impact. Safety glass is designed to reduce injury risk by either breaking into small, relatively harmless pieces (toughened) or holding together when broken (laminated). The specific requirement is for the glass to achieve at least Class 2B impact performance to BS EN 12600. Similar requirements apply to glazing in windows below 800mm from floor level and in panels adjacent to doors where the glazing is within 300mm of the door edge and less than 1500mm from floor level. For joiners manufacturing or installing glazed doors, compliance with these regulations is mandatory, and the safety glass should be permanently marked to indicate its type."
  },
  {
    id: 'joinery-l2-materials8',
    question: "What is 'finger-jointed' timber and what is its primary advantage?",
    options: ["Timber with special grooves cut for improved grip", "Short lengths of timber joined together using interlocking 'fingers' to create longer pieces, providing stability and efficient use of material", "A special timber species with naturally interlocking grain", "Timber that has been shaped to provide a finger-grip profile"],
    correctAnswer: "Short lengths of timber joined together using interlocking 'fingers' to create longer pieces, providing stability and efficient use of material",
    explanation: "Finger-jointed timber consists of short lengths of timber joined together using interlocking 'fingers' to create longer pieces, providing stability and efficient use of material. The finger joints provide substantial surface area for adhesive, creating connections that are often stronger than the timber itself. In UK joinery, finger-jointed timber is widely used for painted components like architraves, skirting boards, door linings, and window components. Its primary advantages include: greater dimensional stability as the alternating grain directions counteract warping tendencies; efficient use of timber resources by utilizing shorter lengths that would otherwise be waste; reduced defects as knots and other imperfections can be removed before jointing; and typically straighter components than equivalent solid timber. While generally not suitable for clear finishes (as joints remain visible), finger-jointed timber has become a standard material for painted joinery due to its performance and sustainability benefits."
  },
  {
    id: 'joinery-l2-materials9',
    question: "What type of timber preservative treatment provides the deepest penetration?",
    options: ["Brush-applied preservative", "Dip treatment", "Spray application", "Pressure treatment"],
    correctAnswer: "Pressure treatment",
    explanation: "Pressure treatment provides the deepest and most thorough penetration of timber preservative. This industrial process uses vacuum and pressure cycles in sealed vessels to force preservative deep into the wood structure. The timber is placed in a treatment cylinder, and initial vacuum removes air from the wood cells. Preservative is then introduced and pressure applied (typically 10-14 bar) to drive it deep into the timber. In the UK, pressure-treated timber is identified by its greenish or brownish tint, though colourless treatments are also available. This treatment method is essential for timber used in high-risk applications such as ground contact, exterior construction, or damp conditions. For joiners, understanding preservative treatments is important when selecting materials - pressure treatment provides significantly longer protection than surface applications, with expected service lives of 15-60 years depending on the preservative type and treatment schedule used."
  },
  {
    id: 'joinery-l2-materials10',
    question: "Which of the following is a suitable material for exterior window cills (sills)?",
    options: ["Standard MDF", "Oak", "Untreated pine", "Beech"],
    correctAnswer: "Oak",
    explanation: "Oak is a suitable material for exterior window cills (sills) due to its excellent natural durability and resistance to decay when exposed to weather. European oak (Quercus robur) contains high levels of natural tannins and tyloses that make its heartwood naturally resistant to fungal attack and insect infestation, achieving a Class 2 durability rating (durable) according to BS EN 350. For UK joinery, oak window cills offer a traditional aesthetic combined with long service life, even in the damp British climate. Standard MDF has very poor water resistance and will quickly deteriorate when exposed to moisture. Untreated pine (unless it's a highly durable species like pitch pine) lacks adequate natural durability for this exposed application. Beech, despite being a hardwood, has poor natural durability (Class 5 - not durable) and is unsuitable for exterior use unless thoroughly treated with preservatives."
  },
  {
    id: 'joinery-l2-materials11',
    question: "What is the benefit of using intumescent seals in fire door assemblies?",
    options: ["They improve soundproofing only", "They prevent drafts only", "They expand when exposed to heat, sealing gaps to prevent fire and smoke spread", "They make the door easier to open in an emergency"],
    correctAnswer: "They expand when exposed to heat, sealing gaps to prevent fire and smoke spread",
    explanation: "Intumescent seals in fire door assemblies expand when exposed to heat, sealing gaps to prevent fire and smoke spread. These specialized seals remain dormant under normal conditions but rapidly expand to many times their original volume when temperatures reach approximately 200°C. This expansion creates a carbonaceous char that fills the gaps around the door edges, blocking the passage of hot gases and flames. In UK fire door installations, intumescent seals are a critical component required by Building Regulations to maintain the door's fire resistance rating. They are typically installed in grooves in the door frame or door leaf (or both) at the head and jambs, and sometimes combined with smoke seals that prevent cold smoke penetration. For joiners, understanding the correct specification, positioning, and installation of these seals is essential for compliant fire door installation, as improper sealing can compromise the entire fire resistance performance."
  },
  {
    id: 'joinery-l2-materials12',
    question: "What is the primary reason for using concealed door closers rather than overhead closers in some joinery applications?",
    options: ["They are always less expensive", "They provide greater closing force", "Aesthetic reasons - they are hidden when the door is closed", "They require less maintenance"],
    correctAnswer: "Aesthetic reasons - they are hidden when the door is closed",
    explanation: "The primary reason for using concealed door closers rather than overhead closers is aesthetic - they are hidden when the door is closed, providing a cleaner, more minimal appearance. Concealed closers are typically installed within the door leaf itself or recessed into the frame, making them invisible when the door is closed and minimally visible when open. In UK joinery, concealed closers are often specified for high-end residential properties, heritage buildings, or design-focused commercial interiors where the visual impact of conventional overhead closers would be undesirable. While providing aesthetic benefits, concealed closers generally offer lower closing forces than overhead models, may require more complex installation (including precise mortising), and are typically more expensive. Joiners need to carefully coordinate door thickness requirements and frame preparation when working with concealed closers, as they require specific dimension tolerances for proper operation."
  },
  {
    id: 'joinery-l2-materials13',
    question: "Which material is commonly used as a core material in flush doors to provide fire resistance?",
    options: ["Expanded polystyrene", "Honeycomb paper", "Solid timber", "Particleboard"],
    correctAnswer: "Particleboard",
    explanation: "Particleboard is commonly used as a core material in flush doors to provide fire resistance. Its dense, consistent structure provides good fire resistance properties compared to hollow cores or lightweight alternatives. In UK fire-rated flush doors, particleboard (or chipboard) cores are typically used in conjunction with timber lippings on all edges and facing materials bonded with fire-resistant adhesives. The particleboard core helps the door achieve the required fire resistance period (typically 30 or 60 minutes) by slowing heat transfer and maintaining structural integrity during a fire. For FD30 (30-minute) rated doors, a minimum 32mm thickness is typically required. Joiners should note that fire doors require compatible components throughout - the core, lippings, facings, glazing (if any), intumescent seals, and ironmongery must all be appropriate for the required rating and installed correctly according to the door's certification to ensure compliant performance."
  },
  {
    id: 'joinery-l2-materials14',
    question: "What is the purpose of a DPC (Damp Proof Course) in relation to timber door and window frames?",
    options: ["To make the frames more resistant to impact damage", "To improve thermal insulation", "To prevent moisture transfer from masonry into timber", "To reduce noise transmission"],
    correctAnswer: "To prevent moisture transfer from masonry into timber",
    explanation: "The purpose of a DPC (Damp Proof Course) in relation to timber door and window frames is to prevent moisture transfer from masonry into timber. When timber frames are in direct contact with brickwork, stone, or concrete, moisture can migrate from these porous materials into the wood, leading to decay over time. A DPC creates a waterproof barrier that interrupts this capillary action. In UK joinery practice, DPCs for door and window frames are typically made from materials such as polyethylene, bitumen-polymer, or EPDM, and are installed around the perimeter of the frame where it interfaces with the building structure. Proper DPC installation is particularly important in traditional brick openings or where frames are directly fixed to masonry rather than within a cavity. For joiners, ensuring correct DPC detail is essential for long-term durability of exterior joinery, particularly given the UK's damp climate."
  },
  {
    id: 'joinery-l2-materials15',
    question: "What is the primary reason for specifying toughened glass rather than laminated glass in certain applications?",
    options: ["Toughened glass is always cheaper", "Toughened glass provides better thermal insulation", "Toughened glass has greater impact resistance and breaks into small cubes rather than sharp shards", "Toughened glass blocks more UV radiation"],
    correctAnswer: "Toughened glass has greater impact resistance and breaks into small cubes rather than sharp shards",
    explanation: "The primary reason for specifying toughened glass rather than laminated glass in certain applications is that toughened glass has greater impact resistance and breaks into small cubes rather than sharp shards. Thermally toughened to BS EN 12150, this safety glass is approximately 4-5 times stronger than annealed glass of the same thickness, making it suitable for applications with higher risk of impact or thermal stress. When broken, it disintegrates into small, relatively harmless cubes rather than dangerous shards. In UK joinery, toughened glass is commonly specified for fully glazed doors, low-level glazing, shower screens, and glass balustrades. Unlike laminated glass, toughened glass cannot be cut or processed after toughening, requiring all cutting, drilling, and shaping to be completed beforehand. While both toughened and laminated glass meet safety requirements for critical locations, toughened offers better impact resistance while laminated provides better security as it holds together when broken."
  },
  {
    id: 'joinery-l2-materials16',
    question: "What type of material is most commonly used for modern window weatherseals in the UK?",
    options: ["Cotton wool", "Felt", "EPDM or silicone rubber", "Cork"],
    correctAnswer: "EPDM or silicone rubber",
    explanation: "EPDM (Ethylene Propylene Diene Monomer) or silicone rubber are the most commonly used materials for modern window weatherseals in the UK. These synthetic rubber compounds offer excellent weathering properties, UV resistance, and durability, maintaining their flexibility and sealing performance through years of compression cycles and weather exposure. They're typically available in various profiles including compression seals, wiper seals, and bubble gaskets to suit different joinery designs. In contemporary UK window manufacturing, these materials have largely replaced traditional weathersealing methods like felt or brush seals due to their superior performance and longevity. EPDM tends to be more economical and commonly used in standard applications, while silicone offers enhanced temperature resistance and longevity for premium applications. For joiners, correct selection and installation of appropriate weatherseals is critical for achieving the air permeability and weather resistance performance required by Building Regulations for new windows."
  },
  {
    id: 'joinery-l2-materials17',
    question: "What is the advantage of using engineered flooring over solid timber flooring?",
    options: ["It is always less expensive", "It is more resistant to fire", "It offers greater dimensional stability with less expansion and contraction", "It is always made from sustainable sources"],
    correctAnswer: "It offers greater dimensional stability with less expansion and contraction",
    explanation: "The primary advantage of engineered flooring over solid timber flooring is that it offers greater dimensional stability with less expansion and contraction. Engineered flooring consists of multiple layers of wood constructed in a cross-ply configuration, with each layer oriented perpendicular to adjacent layers. This structure significantly reduces the floor's tendency to expand and contract with moisture and temperature changes. For UK joiners and their clients, this stability brings several benefits: engineered flooring can be used in environments where solid timber might be problematic, such as with underfloor heating systems or in areas with variable humidity; wider boards are possible without excessive movement issues; and there's less risk of gaps forming between boards or cupping/crowning during seasonal changes. While premium engineered flooring can approach the cost of solid timber, its performance advantages have made it increasingly popular in UK residential and commercial installations."
  },
  {
    id: 'joinery-l2-materials18',
    question: "Which of the following door core constructions provides the best acoustic performance?",
    options: ["Hollow core", "Honeycomb core", "Solid particleboard core", "Lock block construction (solid timber rails and stiles with hollow centers)"],
    correctAnswer: "Solid particleboard core",
    explanation: "A solid particleboard core provides the best acoustic performance among the listed door constructions. The dense, consistent structure of particleboard effectively blocks sound transmission due to its mass and lack of hollow spaces that could resonate. In UK joinery specifications, doors designed for acoustic performance (measured in decibel reduction, dB) typically use solid cores like particleboard or specialized acoustic cores with added sound-damping materials. Hollow core and honeycomb core doors have air spaces that allow sound to transfer more easily, while lock block construction with hollow centers performs better than fully hollow doors but lacks the consistent density of a solid core. For acoustic-rated doors, additional features like perimeter seals, drop seals at the threshold, and careful attention to the gap between door and frame are also essential. Joiners should note that fire-rated particleboard core doors often provide good acoustic performance as well, making them suitable for applications requiring both properties."
  },
  {
    id: 'joinery-l2-materials19',
    question: "What is the purpose of primer on exterior joinery?",
    options: ["To add color only", "To improve the wood's strength", "To seal the timber, improve coating adhesion, and provide initial protection", "To prevent insects from attacking the wood"],
    correctAnswer: "To seal the timber, improve coating adhesion, and provide initial protection",
    explanation: "The purpose of primer on exterior joinery is to seal the timber, improve coating adhesion, and provide initial protection. A good quality primer penetrates the wood surface, sealing the porous structure to control moisture absorption and prevent extractives (like tannins) from bleeding through subsequent finish coats. It creates a suitable surface for topcoats to adhere to, ensuring better bonding and longer coating life. In UK joinery practice, primers for exterior work are typically oil-based or high-performance water-based formulations specifically designed for the challenges of the British climate. They often contain additives to prevent mold and fungal growth. For joiners, proper timber preparation and priming is a critical first step in the finishing process - inadequate priming is a common cause of premature coating failure on exterior joinery, particularly on resinous softwoods like pine that require specialized primers to prevent resin migration through the finish system."
  },
  {
    id: 'joinery-l2-materials20',
    question: "What is the purpose of a shadow gap in joinery design?",
    options: ["To create interesting shadow effects purely for decoration", "To allow for structural movement and prevent visible cracks at material junctions", "To reduce the amount of material needed", "To improve sound insulation"],
    correctAnswer: "To allow for structural movement and prevent visible cracks at material junctions",
    explanation: "The primary purpose of a shadow gap in joinery design is to allow for structural movement and prevent visible cracks at material junctions. This deliberate small gap or recess is incorporated where different materials or components meet, particularly between joinery and adjacent surfaces like plasterwork. As buildings settle and materials expand or contract with temperature and humidity changes, the shadow gap accommodates this movement without causing visible cracking or distortion. In UK architectural joinery, shadow gaps are commonly used where fitted furniture meets walls, at skirting board junctions, around door frames, and in wall panelling systems. Beyond their functional role, shadow gaps have also become an aesthetic detail in contemporary design, creating clean lines and visual separation between elements. For joiners, understanding how to correctly detail and execute shadow gaps is important for both the technical performance and visual quality of high-end installations."
  },
  {
    id: 'joinery-l2-materials21',
    question: "Which type of hinge is most appropriate for hanging a heavy hardwood entrance door?",
    options: ["Butt hinges", "Piano hinge", "Concealed hinges", "Rising butt hinges"],
    correctAnswer: "Butt hinges",
    explanation: "Butt hinges are most appropriate for hanging a heavy hardwood entrance door. These robust hinges consist of two plates joined by a pin, with one plate mortised into the door edge and the other into the frame. For heavy external doors in UK joinery, brass, stainless steel, or steel butt hinges are typically specified, with three or four hinges required to distribute the weight properly. Standard butt hinges for entrance doors are typically 100-125mm in height, chosen to provide adequate strength and prevent the door from dropping over time. While piano hinges are too light for entrance doors, concealed hinges lack the weight-bearing capacity for heavy external doors, and rising butt hinges (which lift the door slightly when opened) are specialty items primarily used where floor clearance is needed. For joiners, correct hinge specification, positioning, and installation is critical for the long-term performance of entrance doors, with particular attention needed to screw selection and mortise accuracy."
  },
  {
    id: 'joinery-l2-materials22',
    question: "What is the primary advantage of using water-based polyurethane finishes rather than traditional oil-based varnishes?",
    options: ["They are always more glossy", "Lower VOC emissions, faster drying, and easier clean-up", "They penetrate deeper into the timber", "They are always cheaper than oil-based products"],
    correctAnswer: "Lower VOC emissions, faster drying, and easier clean-up",
    explanation: "The primary advantage of using water-based polyurethane finishes rather than traditional oil-based varnishes is their lower VOC (Volatile Organic Compound) emissions, faster drying, and easier clean-up. These environmental and practical benefits have made water-based finishes increasingly popular in UK joinery. Water-based polyurethanes typically dry in 2-3 hours compared to 8-24 hours for oil-based products, allowing multiple coats to be applied in a single day. They emit fewer harmful fumes during application and drying, making them safer to use in occupied buildings and better for indoor air quality. Clean-up requires only soap and water rather than chemical solvents. Modern water-based formulations have overcome many of the performance limitations of early products, with premium versions now offering durability comparable to oil-based finishes. For interior joinery, water-based polyurethanes provide a clear finish that resists yellowing over time, though they may not impart the same depth or warmth to the timber as traditional oil-based products."
  },
  {
    id: 'joinery-l2-materials23',
    question: "What material is typically used to create a fire-resistant glazing seal in a fire-rated door or screen?",
    options: ["Standard silicone sealant", "Intumescent mastic or tape", "Acrylic gap filler", "Natural rubber gasket"],
    correctAnswer: "Intumescent mastic or tape",
    explanation: "Intumescent mastic or tape is typically used to create a fire-resistant glazing seal in a fire-rated door or screen. These specialized materials expand when exposed to heat, creating a carbonaceous char that seals gaps and prevents the passage of fire and hot gases. In UK fire-rated joinery, intumescent glazing seals are essential components that work alongside fire-resistant glass to maintain the integrity of the fire barrier. The specific type and dimensions of intumescent material must correspond to the fire rating required (typically 30 or 60 minutes) and be installed strictly according to tested and certified details. For joiners undertaking fire-rated glazing work, it's crucial to use the correct intumescent materials as specified in the fire test evidence or third-party certification for the particular system. Standard sealants, gap fillers, or conventional gaskets lack the expansion properties needed for fire protection and would compromise the fire resistance of the installation."
  },
  {
    id: 'joinery-l2-materials24',
    question: "What type of adhesive is most appropriate for bonding timber to metal?",
    options: ["PVA (Polyvinyl Acetate)", "Epoxy", "Animal hide glue", "Urea formaldehyde"],
    correctAnswer: "Epoxy",
    explanation: "Epoxy adhesive is most appropriate for bonding timber to metal. This two-part adhesive (resin and hardener) creates strong bonds between dissimilar materials, adhering well to both the organic structure of wood and the smooth surface of metal. Epoxy provides excellent gap-filling properties, moisture resistance, and durability under various environmental conditions. In UK joinery applications involving wood-to-metal connections (such as furniture with metal frames, decorative inlays, or structural reinforcements), epoxy is the preferred adhesive due to its superior strength and durability. PVA is designed primarily for wood-to-wood bonding and provides poor adhesion to metal surfaces. Animal hide glue lacks the moisture resistance and strength needed for structural wood-to-metal bonds. Urea formaldehyde, while strong, is primarily used for wood veneering and lacks the flexibility and gap-filling properties that make epoxy suitable for joining dissimilar materials with different expansion characteristics."
  },
  {
    id: 'joinery-l2-materials25',
    question: "What is the main advantage of using multipoint locking systems on external doors?",
    options: ["They are always less expensive than traditional locks", "They provide improved security by engaging the door at multiple points around the frame", "They eliminate the need for a handle", "They are easier to install than traditional locks"],
    correctAnswer: "They provide improved security by engaging the door at multiple points around the frame",
    explanation: "The main advantage of using multipoint locking systems on external doors is that they provide improved security by engaging the door at multiple points around the frame. Unlike traditional single-point locks that secure the door only at the latch/deadbolt position, multipoint systems typically feature additional bolts that extend into the frame at the top and bottom of the door when the handle is lifted and the key turned. This distributed locking creates greater resistance to forced entry attempts and helps prevent door warping by maintaining even pressure around the perimeter. In UK joinery, multipoint locks have become standard for external doors, particularly composite and uPVC doors, but also for timber doors where enhanced security is required. They contribute significantly to achieving Secured by Design certification and meeting the security requirements of Building Regulations Approved Document Q. For joiners, installing multipoint locks requires precise routing and preparation but provides customers with significantly improved door security and weather sealing performance."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-materials', 'items', q.id), {
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
