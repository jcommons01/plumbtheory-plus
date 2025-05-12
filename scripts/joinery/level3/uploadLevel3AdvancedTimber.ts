// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3AdvancedTimber.ts

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

// ✅ Joinery Level 3 Advanced Timber Technology Questions
const questions = [
  {
    id: 'joinery-l3-advanced-timber1',
    question: "What is timber lamination and what is its primary advantage in joinery applications?",
    options: ["A finish application technique using multiple coats", "The process of cutting timber into thin strips", "Bonding multiple layers of timber together, resulting in greater dimensional stability and strength", "A method for artificially aging timber"],
    correctAnswer: "Bonding multiple layers of timber together, resulting in greater dimensional stability and strength",
    explanation: "Timber lamination bonds multiple layers of timber together with adhesive. The process creates components with greater dimensional stability (as opposing grain directions counteract movement), enables larger sections than solid timber, allows creation of curved forms, optimizes timber use by utilizing smaller sections, and produces members with consistent properties free from natural defects."
  },
  {
    id: 'joinery-l3-advanced-timber2',
    question: "What is the fiber saturation point (FSP) in timber?",
    options: ["The maximum amount of fiber a tree can produce", "The moisture content at which all free water is gone but cell walls remain saturated, typically 25-30%", "The point at which timber becomes structurally unsound", "The maximum amount of adhesive timber can absorb"],
    correctAnswer: "The moisture content at which all free water is gone but cell walls remain saturated, typically 25-30%",
    explanation: "The fiber saturation point is the moisture content where all free water is gone but cell walls remain saturated (typically 25-30%). This critical threshold represents the point below which timber begins to shrink as water leaves cell walls. Understanding FSP is crucial for predicting dimensional changes, as all movement occurs below this moisture content level."
  },
  {
    id: 'joinery-l3-advanced-timber3',
    question: "What is the difference between tangential and radial shrinkage in timber?",
    options: ["Tangential shrinkage occurs in summer, radial in winter", "Tangential shrinkage occurs parallel to growth rings, radial shrinkage occurs perpendicular to growth rings", "Tangential shrinkage affects hardwoods, radial affects softwoods", "Tangential shrinkage is artificial, radial is natural"],
    correctAnswer: "Tangential shrinkage occurs parallel to growth rings, radial shrinkage occurs perpendicular to growth rings",
    explanation: "Tangential shrinkage occurs parallel to growth rings (along the tangent), while radial shrinkage occurs perpendicular to growth rings (along the radius). Tangential shrinkage is typically 1.5-2.5 times greater than radial, explaining why timber tends to cup away from the center of the tree when drying and why quarter-sawn timber is more dimensionally stable."
  },
  {
    id: 'joinery-l3-advanced-timber4',
    question: "What is the role of lignin in timber?",
    options: ["It provides color only", "It is a natural preservative that prevents decay", "It acts as the binding agent between cellulose fibers, providing compressive strength and rigidity", "It is an unnecessary component that should be removed"],
    correctAnswer: "It acts as the binding agent between cellulose fibers, providing compressive strength and rigidity",
    explanation: "Lignin acts as the binding agent between cellulose fibers, providing compressive strength and rigidity. This complex polymer fills spaces between cellulose and hemicellulose in cell walls, essentially functioning as nature's adhesive. It gives timber its characteristic stiffness and enables it to withstand compression forces, complementing the tensile strength provided by cellulose."
  },
  {
    id: 'joinery-l3-advanced-timber5',
    question: "What causes reaction wood in timber and how does it affect its properties?",
    options: ["It forms in response to chemical treatments", "It forms when trees grow on slopes or are subjected to prevailing winds, causing asymmetric growth with abnormal properties", "It is caused by sudden temperature changes", "It only appears in timber that has been kiln dried too quickly"],
    correctAnswer: "It forms when trees grow on slopes or are subjected to prevailing winds, causing asymmetric growth with abnormal properties",
    explanation: "Reaction wood forms when trees grow on slopes or are subjected to prevailing winds, causing asymmetric growth with abnormal properties. In hardwoods, tension wood forms on the upper side of leaning stems (with high longitudinal shrinkage); in softwoods, compression wood forms on the lower side (denser, more brittle). Both types exhibit abnormal shrinkage, causing warping during drying."
  },
  {
    id: 'joinery-l3-advanced-timber6',
    question: "What is the significance of equilibrium moisture content (EMC) in timber joinery?",
    options: ["It determines the maximum load timber can support", "It is the moisture content at which timber stops growing", "It is the moisture content that timber will naturally achieve in a given environment", "It is only relevant for exterior joinery"],
    correctAnswer: "It is the moisture content that timber will naturally achieve in a given environment",
    explanation: "Equilibrium moisture content is the moisture content timber naturally achieves in a given environment. This balance point varies with relative humidity and temperature of the surrounding environment. Understanding EMC is crucial for joinery as it enables prediction of in-service moisture content, proper conditioning of timber, and design that accounts for inevitable dimensional changes."
  },
  {
    id: 'joinery-l3-advanced-timber7',
    question: "What is thermal modification of timber?",
    options: ["Warming timber before machining to make it easier to work", "Using heat to darken timber surface for decorative purposes only", "A high-temperature treatment process that permanently alters the chemical structure of wood, improving durability and stability", "Applying heat to bend timber into curved shapes"],
    correctAnswer: "A high-temperature treatment process that permanently alters the chemical structure of wood, improving durability and stability",
    explanation: "Thermal modification is a high-temperature treatment process that permanently alters wood's chemical structure, improving durability and stability. Performed at 160-240°C in low-oxygen conditions, it reduces wood's hygroscopicity by degrading hemicelluloses, increases dimensional stability, improves resistance to biological attack, and darkens the timber throughout, all without chemical additives."
  },
  {
    id: 'joinery-l3-advanced-timber8',
    question: "What are the characteristics and joinery applications of European oak (Quercus robur)?",
    options: ["Soft, lightweight timber primarily used for temporary formwork", "Medium-density, non-durable timber used only for interior trim", "Dense, durable hardwood with high tannin content, suitable for external joinery, furniture, and structural applications", "Highly resinous softwood used mainly for painted joinery"],
    correctAnswer: "Dense, durable hardwood with high tannin content, suitable for external joinery, furniture, and structural applications",
    explanation: "European oak is a dense, durable hardwood with high tannin content. Its Class 2 natural durability makes it suitable for external joinery without preservation. It's valued for structural timber, traditional windows and doors, high-quality furniture, flooring, and stair components. Though dimensionally moderate when seasoned, its high tannin content can cause corrosion with ferrous metals."
  },
  {
    id: 'joinery-l3-advanced-timber9',
    question: "What is finger jointing in timber technology?",
    options: ["A joinery technique for creating finger pulls in cabinet doors", "A hand signal system used between timber workers", "An end-to-end jointing method using interlocking profiles to create longer lengths", "A timber grading system based on damage to ends"],
    correctAnswer: "An end-to-end jointing method using interlocking profiles to create longer lengths",
    explanation: "Finger jointing is an end-to-end jointing method using interlocking profiles to create longer lengths from shorter pieces. The interlocking 'fingers' provide large surface area for gluing, creating strong joints that utilize timber efficiently. Commonly used for making long lengths of stable timber for painted joinery, the technique reduces waste by using what would otherwise be offcuts."
  },
  {
    id: 'joinery-l3-advanced-timber10',
    question: "What is the difference between softwood and hardwood in botanical terms?",
    options: ["Softwoods are less dense than hardwoods", "Softwoods are less expensive than hardwoods", "Softwoods come from coniferous (gymnosperm) trees, hardwoods from broadleaf (angiosperm) trees", "Softwoods grow faster than hardwoods"],
    correctAnswer: "Softwoods come from coniferous (gymnosperm) trees, hardwoods from broadleaf (angiosperm) trees",
    explanation: "Botanically, softwoods come from coniferous (gymnosperm) trees that typically have needles and produce cones, while hardwoods come from broadleaf (angiosperm) trees that typically shed their leaves annually. This scientific classification isn't based on hardness, as some softwoods (like yew) are harder than some hardwoods (like balsa)."
  },
  {
    id: 'joinery-l3-advanced-timber11',
    question: "What is the purpose of quarter sawing timber?",
    options: ["To produce boards exactly 25% of the tree's diameter", "To cut costs by reducing wastage", "To produce timber with growth rings at 45-90° to the face, improving stability and appearance", "To make timber exactly one quarter of its original weight"],
    correctAnswer: "To produce timber with growth rings at 45-90° to the face, improving stability and appearance",
    explanation: "Quarter sawing produces timber with growth rings at 45-90° to the face, improving stability and appearance. This cutting method minimizes tangential movement (reducing cupping and twisting), displays attractive ray figure (especially in oak and sycamore), provides superior wear characteristics, and reduces surface checking. The method is costlier due to lower yield and more processing time."
  },
  {
    id: 'joinery-l3-advanced-timber12',
    question: "What is meant by 'case hardening' in kiln-dried timber?",
    options: ["The process of hardening the outer case or packaging of timber", "A desirable hardening of the surface to prevent damage", "A drying defect where the outer fibers are in compression and the inner fibers in tension, causing stress", "The application of a hardener to the surface of soft timbers"],
    correctAnswer: "A drying defect where the outer fibers are in compression and the inner fibers in tension, causing stress",
    explanation: "Case hardening is a drying defect where outer fibers are in compression and inner fibers in tension, causing stress. It occurs when timber's exterior dries and shrinks too rapidly, setting in size while the interior is still wet. When the interior eventually dries, it's prevented from fully shrinking, creating internal stresses that cause machining problems and distortion when timber is resawn."
  },
  {
    id: 'joinery-l3-advanced-timber13',
    question: "What is the primary reason for using cross-laminated timber (CLT) in construction?",
    options: ["It is always less expensive than solid timber", "It provides dimensional stability and structural strength in both directions due to alternating grain orientations", "It creates a rustic aesthetic only achievable with this material", "It is completely waterproof unlike other timber products"],
    correctAnswer: "It provides dimensional stability and structural strength in both directions due to alternating grain orientations",
    explanation: "Cross-laminated timber provides dimensional stability and structural strength in both directions due to alternating grain orientations. These engineered panels consist of multiple layers of timber bonded perpendicular to each other, creating large format, strong, rigid panels with minimal movement. They enable rapid construction of walls, floors, and roofs while offering excellent environmental performance."
  },
  {
    id: 'joinery-l3-advanced-timber14',
    question: "What is the main difference between air drying and kiln drying of timber?",
    options: ["Air drying is used for softwoods, kiln drying for hardwoods only", "Air drying uses natural airflow over a longer period, while kiln drying uses controlled temperature and humidity for faster drying", "Air drying is a modern technique, kiln drying is traditional", "Air drying darkens the timber, kiln drying lightens it"],
    correctAnswer: "Air drying uses natural airflow over a longer period, while kiln drying uses controlled temperature and humidity for faster drying",
    explanation: "Air drying uses natural airflow over months or years, while kiln drying uses controlled temperature and humidity for faster drying (days or weeks). Kiln drying offers precise moisture content control, kills insects and fungi, and produces timber ready for immediate use, though at higher energy cost. Air drying is less energy-intensive but slower and limited by climate conditions."
  },
  {
    id: 'joinery-l3-advanced-timber15',
    question: "What is the significance of the 'durability class' rating system for timber?",
    options: ["It rates how long timber has been stored before sale", "It indicates resistance to natural decay and insect attack, influencing suitability for different applications", "It only applies to imported timbers", "It refers exclusively to resistance to mechanical wear"],
    correctAnswer: "It indicates resistance to natural decay and insect attack, influencing suitability for different applications",
    explanation: "Durability class rates timber's resistance to natural decay and insect attack, influencing suitability for different applications. The BS EN 350 system classifies timbers from Class 1 (very durable) to Class 5 (not durable). This classification helps specify appropriate timber for various exposure conditions, particularly important for exterior joinery or ground-contact applications."
  },
  {
    id: 'joinery-l3-advanced-timber16',
    question: "What are the characteristics and joinery applications of American black walnut (Juglans nigra)?",
    options: ["A softwood used primarily for exterior cladding", "A pale, lightweight timber used for economy furniture only", "A medium-density, chocolate-brown hardwood with excellent stability, used for high-end furniture and decorative joinery", "A timber too brittle for joinery applications"],
    correctAnswer: "A medium-density, chocolate-brown hardwood with excellent stability, used for high-end furniture and decorative joinery",
    explanation: "American black walnut is a medium-density, chocolate-brown hardwood with excellent stability. This premium timber is prized for high-end furniture, decorative joinery, architectural features, and veneers. It machines well, takes finishes beautifully, and offers good natural durability (Class 3). Its distinctive color, often with purplish or darker streaks, makes it sought after for luxury applications."
  },
  {
    id: 'joinery-l3-advanced-timber17',
    question: "What is the purpose of the European Standard EN 942 in joinery?",
    options: ["It regulates timber harvesting methods only", "It defines quality requirements for timber used in joinery, including permissible defects", "It applies only to engineered wood products", "It governs workplace safety when processing timber"],
    correctAnswer: "It defines quality requirements for timber used in joinery, including permissible defects",
    explanation: "EN 942 defines quality requirements for timber used in joinery, including permissible defects. This standard classifies joinery timber into appearance grades (J2, J5, J10, J20, J30, J40, J50) based on permissible features like knots, splits, and resin pockets. Higher classes (lower numbers) permit fewer defects, enabling specification of appropriate quality levels for different joinery applications."
  },
  {
    id: 'joinery-l3-advanced-timber18',
    question: "What is the relationship between timber density and its strength properties?",
    options: ["There is no relationship between density and strength", "Lower density timber is always stronger", "Generally, higher density timber has greater strength properties, though exceptions exist", "Density affects color but not strength"],
    correctAnswer: "Generally, higher density timber has greater strength properties, though exceptions exist",
    explanation: "Generally, higher density timber has greater strength properties, though exceptions exist. Denser woods typically have thicker cell walls and less void space, resulting in higher compression, bending, and impact strength. This correlation helps predict structural performance, though factors like grain direction, moisture content, and natural defects also significantly influence actual strength."
  },
  {
    id: 'joinery-l3-advanced-timber19',
    question: "What is acetylation in the context of timber modification?",
    options: ["A paint preparation technique", "A chemical process that replaces hydroxyl groups with acetyl groups, reducing the ability of timber to absorb water", "A method of artificially aging timber", "A surface treatment to improve adhesion of finishes"],
    correctAnswer: "A chemical process that replaces hydroxyl groups with acetyl groups, reducing the ability of timber to absorb water",
    explanation: "Acetylation is a chemical process that replaces hydroxyl groups with acetyl groups, reducing timber's ability to absorb water. This non-toxic modification creates dimensionally stable, decay-resistant timber (products like Accoya) by altering wood's chemical structure, making it less attractive to fungi and insects while reducing swelling/shrinking without sacrificing workability."
  },
  {
    id: 'joinery-l3-advanced-timber20',
    question: "What is the difference between sapwood and heartwood in timber?",
    options: ["Sapwood is artificially colored, heartwood is natural", "Sapwood comes from softwoods, heartwood from hardwoods", "Sapwood is the outer, living part of the tree conducting sap; heartwood is the inner, non-living core often more durable and differently colored", "Sapwood is stronger, heartwood is more flexible"],
    correctAnswer: "Sapwood is the outer, living part of the tree conducting sap; heartwood is the inner, non-living core often more durable and differently colored",
    explanation: "Sapwood is the outer, living part of the tree conducting sap; heartwood is the inner, non-living core often more durable and differently colored. Heartwood forms as the tree ages and extractives are deposited in the center, typically making it more decay-resistant and differently colored than sapwood. For joinery, heartwood is generally preferred for its stability and durability."
  },
  {
    id: 'joinery-l3-advanced-timber21',
    question: "What is the purpose of surface checking the moisture content of timber before joinery operations?",
    options: ["To determine the age of the timber", "To calculate the price of the timber", "To verify that moisture content is appropriate for intended use and environment, preventing post-manufacturing movement", "To check if the timber needs chemical treatment"],
    correctAnswer: "To verify that moisture content is appropriate for intended use and environment, preventing post-manufacturing movement",
    explanation: "Surface checking moisture content verifies timber is appropriate for intended use and environment. Using a moisture meter before manufacturing ensures timber has been properly seasoned (typically 8-12% for interior joinery, 14-16% for exterior), reducing the risk of dimensional changes, joint failure, and distortion after installation as the timber equilibrates with its environment."
  },
  {
    id: 'joinery-l3-advanced-timber22',
    question: "What causes 'timber stress grading' and what is its purpose?",
    options: ["The pressure applied during kiln drying, done to strengthen timber", "The characteristics of wood that indicate levels of stress in the living tree", "The evaluation of timber's structural properties using visual or machine methods, determining its strength class for structural applications", "The process of subjecting timber to stress tests during manufacturing"],
    correctAnswer: "The evaluation of timber's structural properties using visual or machine methods, determining its strength class for structural applications",
    explanation: "Timber stress grading evaluates structural properties using visual or machine methods to determine strength classes. This process assesses characteristics like knots, grain slope, and density, assigning grades (like C16, C24) that indicate safe working stresses for structural applications. While mainly used for structural timber, understanding these principles informs selection of appropriate timber for load-bearing joinery components."
  },
  {
    id: 'joinery-l3-advanced-timber23',
    question: "What is the difference between a traditional solid timber panel and an engineered timber panel?",
    options: ["Solid panels are always thicker than engineered panels", "Solid panels are made from a single piece or joined pieces of the same species; engineered panels combine different materials or configurations to improve performance", "Solid panels are only used in modern construction, engineered panels in traditional buildings", "Solid panels are made overseas, engineered panels domestically"],
    correctAnswer: "Solid panels are made from a single piece or joined pieces of the same species; engineered panels combine different materials or configurations to improve performance",
    explanation: "Solid panels are made from single pieces or joined pieces of the same species, while engineered panels combine different materials or configurations to improve performance. Engineered panels (like plywood, MDF, OSB) offer advantages including dimensional stability, efficient material use, larger available sizes, reduced movement, consistent properties, and specialized performance characteristics."
  },
  {
    id: 'joinery-l3-advanced-timber24',
    question: "What is the purpose of applying end grain sealer to freshly sawn timber?",
    options: ["To improve the timber's appearance only", "To prevent insects from attacking the timber", "To prevent rapid moisture loss through end grain, reducing splitting and checking", "To strengthen the timber structurally"],
    correctAnswer: "To prevent rapid moisture loss through end grain, reducing splitting and checking",
    explanation: "End grain sealer prevents rapid moisture loss through end grain, reducing splitting and checking. Since moisture moves 10-12 times faster through end grain than side grain, these specialized coatings create a barrier that slows moisture loss during drying, promoting more even drying throughout the board and significantly reducing end splits and checks."
  },
  {
    id: 'joinery-l3-advanced-timber25',
    question: "What is the principle behind 'lamello' jointing system in timber joinery?",
    options: ["Using laminated timber pieces to create decorative effects", "Using metal brackets covered with veneer", "Using compressed wooden biscuits that expand when glued, creating strong alignment and reinforcement", "Using dovetail joints cut by a specialized lamello machine"],
    correctAnswer: "Using compressed wooden biscuits that expand when glued, creating strong alignment and reinforcement",
    explanation: "The lamello jointing system uses compressed wooden biscuits that expand when glued. Also known as biscuit jointing, this method involves cutting matching slots in joining pieces, inserting the oval-shaped beech 'biscuits,' and applying glue. When the compressed wood contacts moisture in the glue, it expands to create tight-fitting connections that align perfectly and strengthen the joint."
  },
  {
    id: 'joinery-l3-advanced-timber26',
    question: "What is meant by the term 'hygroscopic' when describing timber?",
    options: ["Timber that is easy to clean", "Timber that repels water", "Timber that readily absorbs and releases moisture in response to environmental conditions", "Timber that has been treated with hygiene-improving chemicals"],
    correctAnswer: "Timber that readily absorbs and releases moisture in response to environmental conditions",
    explanation: "Hygroscopic describes timber's ability to readily absorb and release moisture in response to environmental conditions. This fundamental property means timber will always equilibrate with its surroundings, absorbing moisture in humid conditions and releasing it in dry conditions. This characteristic necessitates proper seasoning, design accommodations for movement, and careful consideration of in-service moisture content."
  },
  {
    id: 'joinery-l3-advanced-timber27',
    question: "What are the characteristics and applications of European redwood (Pinus sylvestris) in joinery?",
    options: ["A tropical hardwood used primarily for decking", "A non-durable softwood used only for interior trim", "A moderately durable, straight-grained softwood widely used for window and door manufacture", "A highly figured decorative timber used for veneers only"],
    correctAnswer: "A moderately durable, straight-grained softwood widely used for window and door manufacture",
    explanation: "European redwood (Scots pine) is a moderately durable, straight-grained softwood widely used in joinery. With straight grain, moderate movement, and good workability, it's commonly used for windows, doors, flooring, and general joinery. The heartwood accepts preservative treatment well, making it suitable for external applications when treated, though its natural durability is only moderate (Class 3-4)."
  },
  {
    id: 'joinery-l3-advanced-timber28',
    question: "What is meant by 'figured timber' and how does it affect its use in joinery?",
    options: ["Timber with mathematical calculations marked on it", "Timber priced by a complicated calculation method", "Timber with distinctive or decorative grain patterns caused by unusual growth", "Timber that has been shaped into a specific figure or form"],
    correctAnswer: "Timber with distinctive or decorative grain patterns caused by unusual growth",
    explanation: "Figured timber has distinctive or decorative grain patterns caused by unusual growth. These visual characteristics (like bird's eye, quilted, flame, or curl figures) result from abnormal grain deviation, providing unique aesthetic qualities. Figured timber is prized for decorative joinery and furniture but can present working challenges due to grain irregularities and is typically more expensive due to its rarity."
  },
  {
    id: 'joinery-l3-advanced-timber29',
    question: "What is the primary difference between MDF (Medium Density Fibreboard) and particleboard in composition and joinery applications?",
    options: ["MDF is always thicker than particleboard", "MDF uses wood fibers creating a uniform structure; particleboard uses wood chips and particles creating a less homogeneous panel", "MDF is always used externally, particleboard internally", "MDF is a natural timber product, particleboard is synthetic"],
    correctAnswer: "MDF uses wood fibers creating a uniform structure; particleboard uses wood chips and particles creating a less homogeneous panel",
    explanation: "MDF uses wood fibers creating a uniform structure, while particleboard uses wood chips and particles creating a less homogeneous panel. MDF's fine, consistent texture allows intricate machining, edge detailing, and superior paint finishing, making it ideal for moldings, cabinet doors, and detailed components. Particleboard is typically less expensive, suitable for applications where machined edges aren't exposed."
  },
  {
    id: 'joinery-l3-advanced-timber30',
    question: "What is the purpose of a moisture meter in joinery work?",
    options: ["To measure the moisture content of adhesives only", "To determine the age of timber", "To measure the moisture content of timber, ensuring it's appropriate for intended use", "To detect hidden metal in reclaimed timber"],
    correctAnswer: "To measure the moisture content of timber, ensuring it's appropriate for intended use",
    explanation: "Moisture meters measure timber's moisture content, ensuring it's appropriate for intended use. These instruments, using either electrical resistance or electromagnetic scanning, verify timber has been properly seasoned, is suitable for its intended environment, and matches between components being joined. This helps prevent post-manufacturing issues related to dimensional change and joint failure."
  },
  {
    id: 'joinery-l3-advanced-timber31',
    question: "What causes blue stain in timber and how does it affect its properties?",
    options: ["A chemical reaction with copper fasteners", "A fungal infection that causes discoloration but generally doesn't affect mechanical properties", "A treatment deliberately applied to enhance appearance", "A reaction to UV light exposure"],
    correctAnswer: "A fungal infection that causes discoloration but generally doesn't affect mechanical properties",
    explanation: "Blue stain is caused by a fungal infection that discolors timber but generally doesn't affect mechanical properties. These fungi feed on nutrients in sapwood rather than structural cell wall components, resulting in blue-gray discoloration without significant strength reduction. While primarily an aesthetic issue, extensive staining may indicate conditions favorable for decay fungi, warranting further investigation."
  },
  {
    id: 'joinery-l3-advanced-timber32',
    question: "What is the primary advantage of using LVL (Laminated Veneer Lumber) in structural joinery applications?",
    options: ["It is always less expensive than solid timber", "It offers consistent, predictable structural properties with higher strength-to-weight ratio than solid timber", "It is completely waterproof", "It is always made from sustainable sources"],
    correctAnswer: "It offers consistent, predictable structural properties with higher strength-to-weight ratio than solid timber",
    explanation: "LVL offers consistent, predictable structural properties with higher strength-to-weight ratio than solid timber. Created by bonding multiple layers of thin wood veneers with parallel grain orientation, LVL eliminates natural defects through defect dispersion, providing dimensional stability, high strength, and design flexibility for beams, lintels, structural framing, and other load-bearing applications."
  },
  {
    id: 'joinery-l3-advanced-timber33',
    question: "What is wood polymer composite (WPC) and what are its applications in joinery?",
    options: ["Pure hardwood with no additives", "A type of MDF with special resins", "A material combining wood fibers and thermoplastic polymers, used for decking, cladding, and outdoor applications", "A finish that creates a plastic-like surface on timber"],
    correctAnswer: "A material combining wood fibers and thermoplastic polymers, used for decking, cladding, and outdoor applications",
    explanation: "Wood polymer composite combines wood fibers and thermoplastic polymers, used for decking, cladding, and outdoor applications. This engineered material offers improved moisture resistance, reduced maintenance, consistent properties, and resistance to biological attack. Common in exterior applications like decking, cladding, and outdoor furniture, WPC provides the aesthetic of wood with enhanced durability."
  },
  {
    id: 'joinery-l3-advanced-timber34',
    question: "What is the significance of growth rate (ring width) in softwood timber quality for joinery?",
    options: ["Growth rate has no impact on timber quality", "Extremely fast growth always produces the highest quality timber", "Moderately slow-grown timber (medium to narrow growth rings) typically provides better stability and strength than very fast-grown timber", "Growth rings are purely decorative features"],
    correctAnswer: "Moderately slow-grown timber (medium to narrow growth rings) typically provides better stability and strength than very fast-grown timber",
    explanation: "Moderately slow-grown softwood (medium to narrow growth rings) typically provides better stability and strength than very fast-grown timber. Slower growth produces denser latewood bands relative to earlywood, resulting in higher strength, better nail and screw holding, improved machining characteristics, and often enhanced natural durability. This makes it preferred for high-quality joinery applications."
  },
  {
    id: 'joinery-l3-advanced-timber35',
    question: "What is the purpose of incorporating moisture buffers in timber building construction?",
    options: ["To prevent moisture from entering the building entirely", "To absorb and release moisture, moderating humidity fluctuations in the internal environment", "To create a waterproof barrier", "To prevent wood movement due to moisture change"],
    correctAnswer: "To absorb and release moisture, moderating humidity fluctuations in the internal environment",
    explanation: "Moisture buffers absorb and release moisture, moderating humidity fluctuations in the internal environment. Hygroscopic materials like exposed timber, clay plasters, or cellulose-based products help maintain more stable relative humidity by absorbing excess moisture when humidity is high and releasing it when humidity drops, promoting healthier indoor environments and reducing HVAC demands."
  },
  {
    id: 'joinery-l3-advanced-timber36',
    question: "What is meant by the 'movement class' of timber and why is it important in joinery design?",
    options: ["How quickly timber can be transported", "The classification of how fungi move through timber", "The classification of timber's tendency to shrink and swell with moisture changes", "How readily timber can be moved around the workshop"],
    correctAnswer: "The classification of timber's tendency to shrink and swell with moisture changes",
    explanation: "Movement class classifies timber's tendency to shrink and swell with moisture changes. Defined in standards like BS EN 942, these classifications (small, medium, large) indicate the dimensional stability of different species. Understanding movement class is crucial for selecting appropriate timber for specific applications and designing details that accommodate inevitable movement."
  },
  {
    id: 'joinery-l3-advanced-timber37',
    question: "What is the difference between slash-sawn and rift-sawn timber?",
    options: ["Slash-sawn is cut using a slashing motion, rift-sawn with a rifting motion", "Slash-sawn is cut at an angle to the log, rift-sawn is cut tangentially to growth rings", "Slash-sawn has growth rings at 30-60° to the face; rift-sawn has growth rings at 60-90° to the face", "Slash-sawn is for structural use, rift-sawn for decorative use only"],
    correctAnswer: "Slash-sawn has growth rings at 30-60° to the face; rift-sawn has growth rings at 60-90° to the face",
    explanation: "Slash-sawn has growth rings at 30-60° to the face, while rift-sawn has growth rings at 60-90° to the face. Rift-sawn produces the most stable timber with minimum tangential movement and straight, consistent grain appearance. It's particularly valued for quartersawn oak where it minimizes ray fleck for a cleaner appearance."
  },
  {
    id: 'joinery-l3-advanced-timber38',
    question: "What is the purpose of vacuum kiln drying for timber?",
    options: ["To remove insects by sucking them out", "To create decorative patterns in the timber", "To dry timber faster and at lower temperatures than conventional kiln drying", "To strengthen the timber structurally"],
    correctAnswer: "To dry timber faster and at lower temperatures than conventional kiln drying",
    explanation: "Vacuum kiln drying dries timber faster and at lower temperatures than conventional kiln drying. By reducing atmospheric pressure, the boiling point of water decreases, allowing moisture removal at 30-50°C instead of 70-90°C. This gentler process reduces drying defects, color changes, and case hardening while being particularly valuable for thick sections and species prone to drying defects."
  },
  {
    id: 'joinery-l3-advanced-timber39',
    question: "What is 'reaction wood' in timber and how does it affect joinery applications?",
    options: ["Wood that reacts chemically with certain adhesives", "Wood formed as a reaction to stress in the growing tree, characterized by abnormal properties and excessive distortion during drying", "Wood that changes color when exposed to light", "Wood that has been chemically treated to react with specific finishes"],
    correctAnswer: "Wood formed as a reaction to stress in the growing tree, characterized by abnormal properties and excessive distortion during drying",
    explanation: "Reaction wood forms as a response to stress in growing trees, characterized by abnormal properties and excessive distortion during drying. In hardwoods (tension wood) and softwoods (compression wood), it exhibits abnormal shrinkage, often warping significantly during drying. It should be avoided for quality joinery as it can cause joint failure, distortion, and machining difficulties."
  },
  {
    id: 'joinery-l3-advanced-timber40',
    question: "What is the significance of the 'modulus of elasticity' (MOE) in timber selection for joinery?",
    options: ["It measures the timber's resistance to decay", "It measures how easily the timber can be bent before breaking", "It measures the timber's stiffness or resistance to deflection under load", "It measures the timber's resistance to insect attack"],
    correctAnswer: "It measures the timber's stiffness or resistance to deflection under load",
    explanation: "Modulus of elasticity (MOE) measures timber's stiffness or resistance to deflection under load. This property, expressed in N/mm², indicates how much a timber member will deflect when subjected to load within its elastic range. Higher MOE values indicate stiffer timber, important when selecting species for applications where minimal deflection is required."
  },
  {
    id: 'joinery-l3-advanced-timber41',
    question: "What causes honeycomb checks in timber and how do they affect its use?",
    options: ["A distinctive grain pattern resembling honeycomb, valued for decoration", "Internal cracks that form during drying but may not be visible from the surface, weakening the timber", "Small holes created by solitary bees, affecting appearance only", "A type of fungal decay that creates hexagonal patterns"],
    correctAnswer: "Internal cracks that form during drying but may not be visible from the surface, weakening the timber",
    explanation: "Honeycomb checks are internal cracks that form during drying but may not be visible from the surface. These internal failures occur when the core dries too quickly, causing internal stress and splitting. They reduce structural integrity and may only become visible after machining, potentially compromising joint strength and stability in finished joinery."
  },
  {
    id: 'joinery-l3-advanced-timber42',
    question: "What are the characteristics and applications of iroko (Milicia excelsa) in joinery?",
    options: ["A softwood used primarily for interior trim", "A hardwood with poor durability, used only in sheltered locations", "A durable hardwood with good stability, suitable for external joinery applications", "A highly figured timber used exclusively for veneers"],
    correctAnswer: "A durable hardwood with good stability, suitable for external joinery applications",
    explanation: "Iroko is a durable hardwood with good stability, suitable for external joinery applications. This African hardwood offers Class 1-2 durability, moderate movement, and good weathering characteristics, making it valuable for exterior doors, windows, conservatories, and garden furniture. It works well though contains silica that can dull tools, and its natural oils can sometimes interfere with finishes."
  },
  {
    id: 'joinery-l3-advanced-timber43',
    question: "What is the purpose of end-matching in timber flooring?",
    options: ["Ensuring boards are arranged to match color at the ends", "Creating a tongue and groove joint on the ends of boards to allow joining away from joists", "Ensuring boards are the same length at the end of installation", "A decorative treatment applied to board ends only"],
    correctAnswer: "Creating a tongue and groove joint on the ends of boards to allow joining away from joists",
    explanation: "End-matching creates tongue and groove joints on the ends of flooring boards, allowing joining away from joists. This profile enables boards to be joined between supporting joists while maintaining vertical alignment, eliminating the traditional requirement for joints to occur over joists, reducing waste and simplifying installation while maintaining structural integrity."
  },
  {
    id: 'joinery-l3-advanced-timber44',
    question: "What is the purpose of a moisture barrier in timber frame construction?",
    options: ["To prevent any air movement through the wall", "To provide thermal insulation", "To prevent moisture vapor from reaching cold surfaces where it could condense", "To strengthen the timber frame structurally"],
    correctAnswer: "To prevent moisture vapor from reaching cold surfaces where it could condense",
    explanation: "Moisture barriers prevent water vapor from reaching cold surfaces where it could condense. Typically installed on the warm side of insulation, these membranes limit vapor diffusion through building assemblies, preventing interstitial condensation that could lead to decay, mold growth, and reduced insulation effectiveness while still allowing deliberate ventilation through other means."
  },
  {
    id: 'joinery-l3-advanced-timber45',
    question: "What is meant by the term 'cell collapse' in timber drying?",
    options: ["The normal shrinkage process in all timber", "A controlled process to increase timber density", "The physical collapse of cell walls during drying, causing excessive shrinkage and surface deformation", "The biological breakdown of cells by bacteria"],
    correctAnswer: "The physical collapse of cell walls during drying, causing excessive shrinkage and surface deformation",
    explanation: "Cell collapse is the physical collapse of cell walls during drying, causing excessive shrinkage and surface deformation. This drying defect, more common in some species (like eucalyptus), occurs when capillary tension forces during water removal crush the cell structure. It results in a corrugated surface appearance, excessive shrinkage, and can be distinguished from normal shrinkage by the possibility of recovery through re-humidification and careful re-drying."
  },
  {
    id: 'joinery-l3-advanced-timber46',
    question: "What are the advantages of specifying FSC or PEFC certified timber for joinery projects?",
    options: ["These timbers are always less expensive", "These certifications guarantee the timber is stronger than non-certified timber", "These timbers are always kiln-dried", "These certifications provide assurance that timber comes from responsibly managed forests with chain of custody verification"],
    correctAnswer: "These certifications provide assurance that timber comes from responsibly managed forests with chain of custody verification",
    explanation: "FSC and PEFC certifications provide assurance that timber comes from responsibly managed forests with chain of custody verification. These internationally recognized schemes certify that forests are managed according to environmental, social, and economic criteria, with tracking systems ensuring certified material is identified throughout the supply chain. This enables specification of legally and sustainably sourced timber, meeting environmental policies and regulations."
  },
  {
    id: 'joinery-l3-advanced-timber47',
    question: "What is the structural grading system used for softwood in the UK and what does it indicate?",
    options: ["The A-B-C system, indicating aesthetic appearance only", "The C16, C24, TR26 system, indicating strength classes based on the timber's structural properties", "The 1-2-3 system, indicating timber age only", "The red-yellow-green system, indicating ease of working only"],
    correctAnswer: "The C16, C24, TR26 system, indicating strength classes based on the timber's structural properties",
    explanation: "The UK uses the C16, C24, TR26 system, indicating strength classes based on timber's structural properties. The 'C' classes derive from European standards with numbers indicating characteristic bending strength in N/mm². This classification ensures appropriate timber selection for structural applications, with strength properly matched to engineering requirements, either through visual or machine grading processes."
  },
  {
    id: 'joinery-l3-advanced-timber48',
    question: "What is 'polymer timber composite' and how does it differ from natural timber?",
    options: ["Another name for MDF or particleboard", "Natural timber with a polymer coating only", "A material combining wood fiber with thermoplastic polymer, offering enhanced moisture stability and durability", "Solid timber with polymer insertions for decoration"],
    correctAnswer: "A material combining wood fiber with thermoplastic polymer, offering enhanced moisture stability and durability",
    explanation: "Polymer timber composite combines wood fiber with thermoplastic polymer, offering enhanced moisture stability and durability. Unlike natural timber, these materials resist moisture-related movement, decay, and insect attack without preservation treatment. They typically contain recycled content, require minimal maintenance, don't splinter, and find applications in decking, cladding, and outdoor structures where durability is paramount."
  },
  {
    id: 'joinery-l3-advanced-timber49',
    question: "What is meant by 'timber conditioning' prior to joinery manufacturing?",
    options: ["Applying conditioning oil to the surface", "Treating timber with preservatives", "Allowing timber to reach equilibrium moisture content with the environment where it will be manufactured and used", "A special finishing technique for high-end work"],
    correctAnswer: "Allowing timber to reach equilibrium moisture content with the environment where it will be manufactured and used",
    explanation: "Timber conditioning allows timber to reach equilibrium moisture content with the environment where it will be manufactured and used. This process involves storing timber in the workshop or similar conditions for a period (typically 1-2 weeks) before manufacturing, ensuring it acclimates to ambient humidity conditions. This reduces the risk of dimensional change after manufacturing, ensuring more stable finished joinery products."
  },
  {
    id: 'joinery-l3-advanced-timber50',
    question: "What causes 'shake' defects in timber and how do they affect its use in joinery?",
    options: ["Excessive vibration during machining", "A separation of wood fibers along the grain, often following growth rings", "Rapid moisture loss causing surface checking only", "A fungal infection that causes the timber to shake when handled"],
    correctAnswer: "A separation of wood fibers along the grain, often following growth rings",
    explanation: "Shake is a separation of wood fibers along the grain, often following growth rings. These defects (including ring shake, heart shake, and star shake) occur in standing trees or during felling. Shakes significantly weaken timber structurally, particularly affecting joint integrity and water resistance, making affected timber unsuitable for high-quality joinery applications, especially those requiring structural integrity or water resistance."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-advanced-timber', 'items', q.id), {
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