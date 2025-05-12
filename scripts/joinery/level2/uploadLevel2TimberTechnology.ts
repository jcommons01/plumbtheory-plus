// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2TimberTechnology.ts

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

// ✅ Joinery Level 2 Timber Technology Questions
const questions = [
  {
    id: 'joinery-l2-timber-technology1',
    question: "What is the difference between softwood and hardwood?",
    options: ["Softwoods are always softer than hardwoods", "Softwoods come from coniferous (evergreen) trees, hardwoods from deciduous (broadleaved) trees", "Softwoods are always cheaper than hardwoods", "Softwoods are always lighter in colour than hardwoods"],
    correctAnswer: "Softwoods come from coniferous (evergreen) trees, hardwoods from deciduous (broadleaved) trees",
    explanation: "The distinction between softwood and hardwood is botanical rather than based on physical properties. Softwoods come from gymnosperm trees (mainly conifers) which have needle-like leaves and are usually evergreen. Hardwoods come from angiosperm trees (deciduous or broadleaved). This classification doesn't necessarily reflect actual hardness - some softwoods (like yew) are harder than some hardwoods (like balsa). In UK joinery, common softwoods include pine, spruce, and cedar, while common hardwoods include oak, beech, and maple. Each type has different working properties, appearance, and suitable applications based on their cellular structure rather than just their hardness."
  },
  {
    id: 'joinery-l2-timber-technology2',
    question: "What does the term 'moisture content' refer to in timber?",
    options: ["The amount of sap in a living tree", "The percentage of water weight compared to the timber's dry weight", "The humidity of the environment where timber is stored", "The amount of water used during timber processing"],
    correctAnswer: "The percentage of water weight compared to the timber's dry weight",
    explanation: "Moisture content in timber refers to the percentage of water weight compared to the timber's dry weight. It's calculated as: (wet weight - dry weight) ÷ dry weight × 100%. Newly felled timber can have a moisture content of over 100%, which must be reduced before use in joinery. For interior joinery in the UK, timber should be dried to 8-12% moisture content to match typical indoor conditions, while 14-16% is suitable for external joinery. Using timber with the correct moisture content is crucial to prevent problems such as shrinkage, swelling, warping, or splitting after installation. Joiners use moisture meters to verify timber has been properly seasoned before use."
  },
  {
    id: 'joinery-l2-timber-technology3',
    question: "What is meant by the term 'quarter-sawn' timber?",
    options: ["Timber that costs a quarter of the usual price", "Timber cut into four equal pieces", "Timber where the annual rings are at approximately 90° to the face of the board", "Timber that has been dried for only a quarter of the normal time"],
    correctAnswer: "Timber where the annual rings are at approximately 90° to the face of the board",
    explanation: "Quarter-sawn timber refers to boards cut so that the annual growth rings are at approximately 90° (45°-90° in practice) to the face of the board. This cutting method produces timber with distinctive grain patterns, often featuring medullary rays (particularly visible in oak). Quarter-sawn timber has several advantages over plain-sawn: greater dimensional stability with less cupping or twisting; more uniform appearance when finished; better wear resistance; and reduced likelihood of surface checking. However, it's more expensive due to greater waste during sawing and longer production time. In high-quality UK joinery, quarter-sawn timber is often preferred for components where stability is crucial, such as door stiles or table tops."
  },
  {
    id: 'joinery-l2-timber-technology4',
    question: "What is the primary purpose of kiln drying timber?",
    options: ["To kill insects in the timber", "To make the timber lighter to transport", "To reduce moisture content to a specific level in a controlled manner", "To enhance the natural colour of the timber"],
    correctAnswer: "To reduce moisture content to a specific level in a controlled manner",
    explanation: "The primary purpose of kiln drying timber is to reduce its moisture content to a specific level in a controlled manner. Unlike air drying, kiln drying provides precise control over temperature, humidity, and air circulation, allowing timber to be dried much faster (days or weeks versus months or years for air drying) and to exact moisture content specifications. In the UK, kiln-dried timber typically has a moisture content of 10-12% for interior use. While kiln drying does sterilize timber by killing insects and fungi, this is a secondary benefit. The controlled process also minimizes drying defects such as checking, splitting, or warping that can occur with too-rapid moisture loss in uncontrolled conditions."
  },
  {
    id: 'joinery-l2-timber-technology5',
    question: "Which of the following is NOT a common defect found in timber?",
    options: ["Knots", "Splits", "Shakes", "Lamination"],
    correctAnswer: "Lamination",
    explanation: "Lamination is NOT a common defect found in timber - it's actually a manufacturing process where layers of timber are glued together to create engineered wood products. Common natural timber defects include knots (where branches grew), splits (separations along the grain due to drying), shakes (separations between annual growth rings), wane (bark or lack of wood at edges), cupping (distortion across the width), bowing (distortion along the length), twisting, and insect damage. Joiners must be able to identify these defects and determine whether they affect the timber's structural integrity, appearance, or workability for specific applications. Proper timber selection and defect assessment are fundamental skills for producing high-quality joinery work."
  },
  {
    id: 'joinery-l2-timber-technology6',
    question: "What is the purpose of timber grading?",
    options: ["To sort timber by colour only", "To categorize timber by age", "To classify timber according to its strength and appearance characteristics", "To determine which forest the timber came from"],
    correctAnswer: "To classify timber according to its strength and appearance characteristics",
    explanation: "Timber grading classifies timber according to its strength and appearance characteristics, providing standardized categories that help specify appropriate timber for different applications. In the UK, structural timber is typically strength graded according to BS EN 14081 into classes like C16, C24, etc., where the number indicates the characteristic bending strength in N/mm². Non-structural timber for joinery is often appearance graded, with standards varying by timber type. For example, European oak might be graded as QPA, QBA, or QCA (indicating unselected, selected, and prime quality). Proper grading ensures timber meets the performance requirements for its intended use and helps joiners select appropriate material for specific components based on both structural needs and visual quality."
  },
  {
    id: 'joinery-l2-timber-technology7',
    question: "What is the difference between plywood and MDF (Medium Density Fibreboard)?",
    options: ["There is no difference; they are different names for the same product", "Plywood is made from thin sheets of wood veneer glued together, while MDF is made from wood fibres bonded with resin", "MDF is waterproof while plywood is not", "Plywood is always imported while MDF is always manufactured in the UK"],
    correctAnswer: "Plywood is made from thin sheets of wood veneer glued together, while MDF is made from wood fibres bonded with resin",
    explanation: "Plywood is a sheet material made from thin layers (plies) of wood veneer glued together with adjacent layers having their grain at right angles, creating a strong, stable panel. MDF (Medium Density Fibreboard) is manufactured by breaking down wood into fibres, which are then combined with resin and wax and formed into panels under heat and pressure. These products have different properties and applications in joinery: plywood offers better strength-to-weight ratio, screw-holding capacity, and moisture resistance (depending on adhesive type), while MDF provides a smooth, consistent surface ideal for painting, intricate machining, and situations requiring no visible grain. UK joiners select between these materials based on specific project requirements for strength, finish, machining characteristics, and environmental conditions."
  },
  {
    id: 'joinery-l2-timber-technology8',
    question: "Why is timber seasoning important in joinery?",
    options: ["It enhances the flavour of the wood", "It changes the colour to a more desirable shade", "It reduces moisture content to minimize movement after manufacturing", "It makes the timber more resistant to fire"],
    correctAnswer: "It reduces moisture content to minimize movement after manufacturing",
    explanation: "Timber seasoning is important in joinery because it reduces moisture content to minimize movement after manufacturing. Unseasoned (green) timber contains high moisture levels that will inevitably reduce in service, causing shrinkage, warping, splitting, and joint failure. Proper seasoning (either air drying or kiln drying) gradually reduces moisture content to levels that match the intended service environment (typically 8-12% for interior and 14-16% for exterior joinery in the UK). This pre-conditioning ensures the timber's dimensions remain relatively stable after manufacturing. Additionally, seasoned timber is easier to work, takes adhesives and finishes better, and is less susceptible to fungal decay. Using properly seasoned timber is fundamental to producing durable, high-quality joinery that maintains its appearance and functionality."
  },
  {
    id: 'joinery-l2-timber-technology9',
    question: "What does the FSC (Forest Stewardship Council) certification indicate about timber products?",
    options: ["They are completely waterproof", "They come from forests that are managed responsibly according to environmental, social, and economic standards", "They are guaranteed not to warp or twist", "They are treated with preservatives against insect attack"],
    correctAnswer: "They come from forests that are managed responsibly according to environmental, social, and economic standards",
    explanation: "FSC (Forest Stewardship Council) certification indicates that timber products come from forests that are managed responsibly according to environmental, social, and economic standards. This independent, international certification system verifies that forests are managed in ways that preserve biological diversity, benefit local communities, and ensure economic viability while meeting the needs of present and future generations. For UK joiners, using FSC-certified timber demonstrates commitment to sustainability and can be a requirement in environmentally conscious projects or public sector work. Similar certifications include PEFC (Programme for the Endorsement of Forest Certification). The EU Timber Regulation (EUTR) and UK Timber Regulation require that all timber placed on the market comes from legal sources, making chain of custody certification increasingly important."
  },
  {
    id: 'joinery-l2-timber-technology10',
    question: "What is the term for the natural movement of timber perpendicular to the grain as moisture content changes?",
    options: ["Warping", "Expansion jointing", "Seasonal adjustment", "Shrinkage and swelling"],
    correctAnswer: "Shrinkage and swelling",
    explanation: "Shrinkage and swelling refers to the natural movement of timber perpendicular to the grain as moisture content changes. Timber expands as it absorbs moisture and shrinks as it dries, with most movement occurring across the width of boards (tangential to growth rings) rather than along their length. The amount of movement varies significantly between species - generally, hardwoods move more than softwoods, and denser timbers move more than less dense ones. In UK joinery, understanding and accommodating this movement is crucial through techniques such as: allowing appropriate expansion gaps; using properly seasoned timber; designing frame-and-panel constructions where panels float freely; aligning grain direction consistently; and using engineered wood products for applications requiring exceptional stability."
  },
  {
    id: 'joinery-l2-timber-technology11',
    question: "What is meant by the term 'heartwood' in timber?",
    options: ["The middle section of a tree trunk where the strongest timber is found", "The oldest, central wood of a tree that no longer transports water", "The part of the timber with heart-shaped grain patterns", "The most expensive cut of timber from any tree"],
    correctAnswer: "The oldest, central wood of a tree that no longer transports water",
    explanation: "Heartwood is the oldest, central wood of a tree that no longer transports water or contains living cells. As sapwood (the outer layer of wood that transports water) matures, extractives are deposited in the cell cavities, changing its properties and often its colour. Heartwood is typically darker, denser, more durable, and more resistant to decay than sapwood, though this varies by species. In UK joinery, heartwood is generally preferred for its stability, durability, and aesthetic qualities, particularly for exterior applications or where distinct colouration is desired. However, some species (like beech) show little differentiation between heartwood and sapwood. Understanding the different properties of heartwood and sapwood helps joiners select appropriate material for specific applications."
  },
  {
    id: 'joinery-l2-timber-technology12',
    question: "Which of the following timber species is most commonly used for external joinery in the UK?",
    options: ["Pine", "Oak", "Beech", "Maple"],
    correctAnswer: "Oak",
    explanation: "Oak (particularly European oak, Quercus robur) is one of the most commonly used timber species for external joinery in the UK due to its excellent natural durability, strength, and attractive appearance. Its high tannin content provides natural resistance to decay and insect attack, making it suitable for exposed conditions without preservative treatment. While European redwood (Scots pine) is also widely used for external joinery, it requires preservative treatment for durability. Beech and maple are rarely used externally as they have poor natural durability and are difficult to treat with preservatives. Other durable species used for external joinery in the UK include European larch, Douglas fir, sweet chestnut, and imported species like sapele and iroko."
  },
  {
    id: 'joinery-l2-timber-technology13',
    question: "What is the purpose of a timber preservative treatment?",
    options: ["To enhance the colour of the timber", "To make the timber stronger", "To protect the timber from biological degradation such as fungal decay and insect attack", "To reduce the weight of the timber"],
    correctAnswer: "To protect the timber from biological degradation such as fungal decay and insect attack",
    explanation: "The purpose of timber preservative treatment is to protect the timber from biological degradation such as fungal decay and insect attack. Preservatives extend the service life of timber by making it toxic or repellent to wood-destroying organisms, particularly important for non-durable species used in high-risk applications. In UK joinery, preservative treatments are commonly categorized as water-based (such as copper-based micronized preservatives), solvent-based (organic preservatives in a carrier), or oil-based (like creosote, now restricted to industrial uses). The appropriate treatment depends on the timber species, end use, exposure conditions, and desired service life. BS 8417 provides guidance on preservative selection and application methods, including pressure treatment, immersion, double-vacuum, and surface application depending on the required penetration."
  },
  {
    id: 'joinery-l2-timber-technology14',
    question: "What is the main advantage of using laminated timber (glulam) over solid timber in structural applications?",
    options: ["It is always cheaper than solid timber", "It allows for longer spans and more complex shapes while reducing natural defects", "It is completely waterproof", "It does not require any protective finishes"],
    correctAnswer: "It allows for longer spans and more complex shapes while reducing natural defects",
    explanation: "The main advantage of using laminated timber (glulam) over solid timber in structural applications is that it allows for longer spans and more complex shapes while reducing natural defects. By layering smaller sections of timber with the grain running parallel and bonding them with moisture-resistant adhesives, glulam creates structural members that can exceed the dimensions available in solid timber. These engineered beams can span up to 50m in extreme cases. Additional advantages include greater dimensional stability, reduced splitting and checking, more efficient use of timber resources, and the ability to curve members during manufacturing. In UK joinery, glulam is increasingly specified for exposed structural elements in buildings where timber's aesthetic and environmental properties are valued, such as schools, public buildings, and eco-conscious residential projects."
  },
  {
    id: 'joinery-l2-timber-technology15',
    question: "Which timber conversion method produces the most stable timber for high-quality joinery?",
    options: ["Through and through (plain) sawing", "Quarter sawing", "Tangential sawing", "Boxed heart sawing"],
    correctAnswer: "Quarter sawing",
    explanation: "Quarter sawing produces the most stable timber for high-quality joinery. In this conversion method, logs are cut so that the annual growth rings are approximately perpendicular (between 45° and 90°) to the wide face of the board. Quarter-sawn timber has superior dimensional stability as it expands and contracts less across its width with moisture changes and is less prone to cupping, twisting, or surface checking than plain-sawn timber. The radial cutting also exposes distinctive grain patterns, particularly in species with pronounced medullary rays like oak. While quarter sawing produces less yield from logs and is therefore more expensive, the stability benefits make it preferred for fine joinery components where movement could cause problems, such as door stiles, cabinet doors, or solid timber panelling."
  },
  {
    id: 'joinery-l2-timber-technology16',
    question: "What does the term 'book matching' refer to in timber veneers?",
    options: ["A grading system for timber quality", "A method of matching timber to the specifications in a book", "Adjacent veneer leaves opened like a book to create a mirror-image pattern", "A technique for storing timber samples"],
    correctAnswer: "Adjacent veneer leaves opened like a book to create a mirror-image pattern",
    explanation: "Book matching refers to a technique where adjacent veneer leaves are opened like a book to create a mirror-image pattern, similar to the facing pages of an open book. These matched leaves are placed side by side, creating symmetrical grain patterns that can form distinctive designs in panels. This technique is widely used in high-quality furniture, cabinet doors, architectural panelling, and decorative joinery elements. Alternative veneer matching techniques include slip matching (leaves placed side by side without turning), random matching (no deliberate pattern), and quarter matching (four leaves arranged to create a symmetrical pattern). For joiners working with veneered panels, understanding these techniques is important for specifying, recognizing, and maintaining the intended aesthetic appearance in finished joinery work."
  },
  {
    id: 'joinery-l2-timber-technology17',
    question: "What is the purpose of using cross-grain construction methods such as frame-and-panel in timber doors?",
    options: ["Purely for decorative reasons", "To reduce the amount of timber used", "To accommodate the natural movement of timber and prevent warping", "To make the door lighter"],
    correctAnswer: "To accommodate the natural movement of timber and prevent warping",
    explanation: "The purpose of using cross-grain construction methods such as frame-and-panel in timber doors is to accommodate the natural movement of timber and prevent warping. In a frame-and-panel door, the frame (stiles and rails) has grain running along the length of each component, while the panel typically has grain running vertically. The panel floats within grooves in the frame, allowing it to expand and contract across its width without distorting the door structure. Without this accommodation for movement, solid timber doors would be prone to warping, splitting, or joint failure due to seasonal moisture changes. This traditional construction technique, developed through centuries of joinery practice, remains the preferred method for creating stable, durable timber doors in the UK, particularly for higher-quality applications."
  },
  {
    id: 'joinery-l2-timber-technology18',
    question: "What is the primary advantage of cross-laminated timber (CLT) in construction?",
    options: ["It is always the cheapest option", "It provides structural strength in multiple directions and dimensional stability", "It is completely fireproof", "It never requires additional finishes"],
    correctAnswer: "It provides structural strength in multiple directions and dimensional stability",
    explanation: "The primary advantage of cross-laminated timber (CLT) in construction is that it provides structural strength in multiple directions and exceptional dimensional stability. CLT panels consist of multiple layers (typically 3, 5, or 7) of timber boards glued perpendicular to each other, creating a product that behaves somewhat like a timber equivalent of reinforced concrete. This cross-lamination provides strength in both directions, reduces splitting, minimizes movement with moisture changes, and creates rigid panels that can function as load-bearing walls, floors, or roofs. In UK construction, CLT is increasingly used for rapid, clean construction of multi-storey buildings, providing environmental benefits through carbon sequestration and enabling offsite prefabrication for higher quality control and reduced waste compared to traditional building methods."
  },
  {
    id: 'joinery-l2-timber-technology19',
    question: "What does the term 'figured timber' refer to?",
    options: ["Timber with carved figures or sculptures", "Timber with mathematical calculations written on it", "Timber with distinctive or unusual grain patterns", "Timber that has been accurately measured"],
    correctAnswer: "Timber with distinctive or unusual grain patterns",
    explanation: "Figured timber refers to wood with distinctive or unusual grain patterns that create visually striking appearances beyond the typical straight grain. These figures result from various biological or growth factors and include: curly or wavy grain (found in maple, sycamore); bird's eye (maple); quilted figure (maple, sapele); fiddleback (sycamore, maple); burr/burl (oak, walnut, elm); and flame or crotch figure (mahogany). Figured timber is highly prized for decorative joinery, furniture making, and veneers, commanding premium prices due to its rarity and aesthetic appeal. Joiners working on high-end projects often select figured timber for feature components like cabinet doors, table tops, or decorative panels where the distinctive grain pattern becomes a key design element."
  },
  {
    id: 'joinery-l2-timber-technology20',
    question: "Which of the following is a characteristic of hardwoods that generally distinguishes them from softwoods?",
    options: ["Hardwoods always grow faster than softwoods", "Hardwoods typically have broader leaves rather than needles", "Hardwoods are always imported while softwoods are always domestic", "Hardwoods are always more expensive than softwoods"],
    correctAnswer: "Hardwoods typically have broader leaves rather than needles",
    explanation: "Hardwoods typically having broader leaves rather than needles is a characteristic that generally distinguishes them from softwoods. This reflects their botanical classification: hardwoods are angiosperms (flowering plants), while softwoods are gymnosperms (mainly conifers). Other distinguishing characteristics include: hardwoods are generally more complex in structure with vessels (pores) for water conduction which softwoods lack; hardwoods often have more variety in cell types and arrangements; and hardwoods typically have less visible annual growth rings. These structural differences affect working properties - hardwoods often require sharper tools, different cutting angles, and more power to machine. However, there's significant variation within both categories, and exceptions exist to most generalizations about their properties."
  },
  {
    id: 'joinery-l2-timber-technology21',
    question: "What is the purpose of timber conditioning before use in joinery?",
    options: ["To clean the surface of the timber", "To change the colour of the timber", "To allow timber to reach equilibrium moisture content for its intended environment", "To make the timber resistant to fire"],
    correctAnswer: "To allow timber to reach equilibrium moisture content for its intended environment",
    explanation: "The purpose of timber conditioning before use in joinery is to allow it to reach equilibrium moisture content (EMC) for its intended environment. While timber may be generally kiln-dried to an appropriate moisture content, conditioning ensures it's specifically acclimated to the exact conditions where it will be installed. This typically involves storing timber in the installation environment (or similar conditions) for a period of time (ideally 1-2 weeks) before manufacturing or installation. This process minimizes subsequent movement, reducing the risk of joint failure, warping, or gaps developing after installation. Conditioning is particularly important for high-quality joinery, precision applications, and when timber has been transported between different climatic regions or will be installed in environments with tightly controlled humidity like heated buildings."
  },
  {
    id: 'joinery-l2-timber-technology22',
    question: "Which of the following engineered wood products is most commonly used for flooring applications?",
    options: ["MDF (Medium Density Fibreboard)", "OSB (Oriented Strand Board)", "Laminated veneer lumber", "Engineered wood flooring with a hardwood wear layer"],
    correctAnswer: "Engineered wood flooring with a hardwood wear layer",
    explanation: "Engineered wood flooring with a hardwood wear layer is the engineered wood product most commonly used for flooring applications. This product typically consists of multiple layers: a surface layer of solid hardwood veneer (wear layer) bonded to a core of cross-layered timber or plywood. The construction provides greater dimensional stability than solid timber flooring, making it less susceptible to expansion and contraction with moisture and temperature changes. This stability makes it suitable for installation in situations where solid timber might be problematic, such as over underfloor heating systems or in environments with variable humidity. For UK joiners, engineered flooring offers practical advantages including pre-finishing options, wider possible board widths, and floating installation methods, while still providing the authentic appearance of a real wood floor."
  },
  {
    id: 'joinery-l2-timber-technology23',
    question: "What factor most significantly affects the durability of timber in exterior applications?",
    options: ["The density of the timber", "The colour of the timber", "The natural decay resistance of the timber species or preservative treatment", "The age of the tree when harvested"],
    correctAnswer: "The natural decay resistance of the timber species or preservative treatment",
    explanation: "The natural decay resistance of the timber species or preservative treatment most significantly affects the durability of timber in exterior applications. Timber species vary considerably in their natural resistance to fungal decay and insect attack due to the presence of toxic extractives in the heartwood. In the UK, BS EN 350 classifies timber durability from class 1 (very durable) to class 5 (not durable). For exterior joinery, joiners typically select either naturally durable species like oak, sweet chestnut, or western red cedar (classes 1-2) or less durable species that have been pressure-treated with preservatives to enhance their resistance. Other factors affecting exterior performance include design details that minimize water trapping, protective coatings, and regular maintenance, but the inherent durability of the timber provides the foundation for long-term performance."
  },
  {
    id: 'joinery-l2-timber-technology24',
    question: "What is the primary reason for applying end grain sealer to freshly cut timber?",
    options: ["To improve the appearance of the end grain", "To prevent rapid moisture loss through the end grain which can cause splitting", "To increase the strength of the timber", "To make the timber easier to glue"],
    correctAnswer: "To prevent rapid moisture loss through the end grain which can cause splitting",
    explanation: "The primary reason for applying end grain sealer to freshly cut timber is to prevent rapid moisture loss through the end grain which can cause splitting. Timber's cellular structure allows moisture to move much more rapidly through end grain than through side grain (up to 10-15 times faster). Without sealing, this can lead to the ends drying much faster than the rest of the board, causing stress that results in end splits or checks. End grain sealers (typically wax-based products, PVA glue, or specialized commercial sealants) are particularly important during air drying of green timber, but are also useful when storing or transporting seasoned timber, especially in variable environments. For joiners, applying end grain sealer is a simple preventive measure that can significantly reduce waste from end splitting in valuable timber stocks."
  },
  {
    id: 'joinery-l2-timber-technology25',
    question: "What is meant by the term 'timber stress grading'?",
    options: ["Testing timber by applying physical stress until it breaks", "Visually examining timber for signs of stress or damage", "Classifying timber according to its strength properties for structural use", "Determining how much stress a woodworker feels when using particular timber"],
    correctAnswer: "Classifying timber according to its strength properties for structural use",
    explanation: "Timber stress grading refers to classifying timber according to its strength properties for structural use. This ensures timber meets the required structural performance for a given application. In the UK, there are two main methods: visual stress grading (examining characteristics like knots, slope of grain, and rate of growth according to standards like BS 4978) and machine stress grading (using machines to measure timber stiffness, which correlates with strength). The most common grades for softwood in the UK are C16 and C24, where the number indicates the characteristic bending strength in N/mm². While joiners may not always perform stress grading themselves, understanding the system is important when selecting timber for structural components like beams, joists, or load-bearing elements in staircases or roof structures."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-timber-technology', 'items', q.id), {
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
