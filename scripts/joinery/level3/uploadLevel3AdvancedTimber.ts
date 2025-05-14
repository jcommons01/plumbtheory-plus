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
    options: ["A finishing technique using multiple coats of varnish", "The process of cutting timber into thin strips for veneers", "A method for artificially ageing timber for aesthetic purposes", "Bonding multiple layers of timber together for stability and strength"],
    correctAnswer: "Bonding multiple layers of timber together for stability and strength",
    explanation: "Lamination bonds timber layers to create more stable components that resist movement and withstand greater loads."
  },
  {
    id: 'joinery-l3-advanced-timber2',
    question: "What is the fibre saturation point (FSP) in timber?",
    options: ["The maximum amount of fibre a tree can produce annually", "The moisture content when cell walls remain saturated but free water is gone", "The point at which timber becomes structurally unsound due to decay", "The maximum amount of adhesive timber can absorb during manufacturing"],
    correctAnswer: "The moisture content when cell walls remain saturated but free water is gone",
    explanation: "FSP occurs at 25-30% moisture content and marks when timber begins to shrink as it dries."
  },
  {
    id: 'joinery-l3-advanced-timber3',
    question: "What is the difference between tangential and radial shrinkage in timber?",
    options: ["Tangential is caused artificially, while radial occurs naturally during seasoning", "Tangential shrinkage occurs in summer, radial in winter months", "Tangential occurs parallel to growth rings, radial occurs perpendicular to them", "Tangential affects hardwoods exclusively, while radial affects only softwoods"],
    correctAnswer: "Tangential occurs parallel to growth rings, radial occurs perpendicular to them",
    explanation: "Tangential shrinkage is greater than radial, causing timber to cup away from the tree's centre when drying."
  },
  {
    id: 'joinery-l3-advanced-timber4',
    question: "What is the role of lignin in timber?",
    options: ["It binds cellulose fibres together, providing compression strength", "It provides the distinctive colour to different timber species", "It is a natural preservative that prevents fungal decay", "It is a component that reduces as timber seasons and dries"],
    correctAnswer: "It binds cellulose fibres together, providing compression strength",
    explanation: "Lignin works as nature's adhesive, filling spaces between cellulose to provide rigidity and compression resistance."
  },
  {
    id: 'joinery-l3-advanced-timber5',
    question: "What causes reaction wood in timber and how does it affect its properties?",
    options: ["It appears only in timber that has been dried too quickly", "It forms in response to chemical treatments during processing", "It forms when trees grow under stress, causing abnormal growth patterns", "It is caused by sudden temperature changes during kiln drying"],
    correctAnswer: "It forms when trees grow under stress, causing abnormal growth patterns",
    explanation: "Trees on slopes or exposed to prevailing winds develop reaction wood with high shrinkage and warping tendencies."
  },
  {
    id: 'joinery-l3-advanced-timber6',
    question: "What is the significance of equilibrium moisture content (EMC) in timber joinery?",
    options: ["It represents the moisture level at which timber stops growing", "It determines the maximum load timber can structurally support", "It is only relevant for exterior joinery applications", "It is the moisture content timber naturally achieves in its environment"],
    correctAnswer: "It is the moisture content timber naturally achieves in its environment",
    explanation: "EMC varies with humidity and temperature, crucial for predicting dimensional stability in specific environments."
  },
  {
    id: 'joinery-l3-advanced-timber7',
    question: "What is thermal modification of timber?",
    options: ["A high-temperature treatment that alters wood's chemical structure", "Warming timber before machining to improve workability", "Using heat to darken timber surfaces for decorative effects", "Applying heat to bend timber into curved shapes permanently"],
    correctAnswer: "A high-temperature treatment that alters wood's chemical structure",
    explanation: "Heating timber at 160-240°C improves durability and stability by degrading hemicelluloses without chemicals."
  },
  {
    id: 'joinery-l3-advanced-timber8',
    question: "What are the characteristics and joinery applications of European oak (Quercus robur)?",
    options: ["A lightweight, non-durable timber used mainly for interior trim", "A dense, durable hardwood suitable for exterior joinery", "A moderately durable timber that requires preservative treatment for external use", "A highly resinous timber primarily used for painted joinery work"],
    correctAnswer: "A dense, durable hardwood suitable for exterior joinery",
    explanation: "European oak offers Class 2 durability, high tannin content, and is valued for windows, doors and furniture."
  },
  {
    id: 'joinery-l3-advanced-timber9',
    question: "What is finger jointing in timber technology?",
    options: ["A joinery technique for creating finger pulls in cabinet doors", "A hand-cutting method used for traditional timber connections", "An end-to-end jointing method using interlocking profiles", "A timber grading system based on the quality of board ends"],
    correctAnswer: "An end-to-end jointing method using interlocking profiles",
    explanation: "Interlocking 'fingers' provide large gluing surface area, creating strong joints from shorter timber pieces."
  },
  {
    id: 'joinery-l3-advanced-timber10',
    question: "What is the difference between softwood and hardwood in botanical terms?",
    options: ["Softwoods have lower density while hardwoods always have higher density", "Softwoods are less expensive and more commonly available than hardwoods", "Softwoods grow significantly faster than hardwoods in all conditions", "Softwoods come from coniferous trees, hardwoods from broadleaf trees"],
    correctAnswer: "Softwoods come from coniferous trees, hardwoods from broadleaf trees",
    explanation: "Botanical classification: softwoods are gymnosperms (conifers) and hardwoods are angiosperms (broadleaf trees)."
  },
  {
    id: 'joinery-l3-advanced-timber11',
    question: "What is the purpose of quarter sawing timber?",
    options: ["To produce timber with growth rings at 45-90° to the face", "To reduce waste by producing boards of exactly one-quarter the log's diameter", "To increase yield by optimizing the cutting pattern through the log", "To ensure timber weighs exactly one-quarter of its original green weight"],
    correctAnswer: "To produce timber with growth rings at 45-90° to the face",
    explanation: "Quarter sawing minimizes tangential movement and displays attractive ray figure in some species."
  },
  {
    id: 'joinery-l3-advanced-timber12',
    question: "What is meant by 'case hardening' in kiln-dried timber?",
    options: ["The application of a hardener to the surface of soft timbers", "A surface treatment to prevent damage during handling and transport", "The deliberate hardening of the timber's surface to improve wear resistance", "A drying defect where outer fibres are in compression, inner in tension"],
    correctAnswer: "A drying defect where outer fibres are in compression, inner in tension",
    explanation: "Occurs when timber's exterior dries too quickly, creating internal stresses that cause machining problems."
  },
  {
    id: 'joinery-l3-advanced-timber13',
    question: "What is the primary reason for using cross-laminated timber (CLT) in construction?",
    options: ["It is completely waterproof unlike other timber products", "It provides strength and stability due to alternating grain orientations", "It is significantly less expensive than traditional building materials", "It creates a rustic aesthetic impossible to achieve with other materials"],
    correctAnswer: "It provides strength and stability due to alternating grain orientations",
    explanation: "Perpendicular layers create strong, rigid panels with minimal movement for walls, floors and roofs."
  },
  {
    id: 'joinery-l3-advanced-timber14',
    question: "What is the main difference between air drying and kiln drying of timber?",
    options: ["Air drying is a modern technique while kiln drying is traditional", "Air drying is only suitable for softwoods while kiln drying is for hardwoods", "Air drying uses natural airflow over a longer period than kiln drying", "Air drying produces darker timber while kiln drying produces lighter coloured timber"],
    correctAnswer: "Air drying uses natural airflow over a longer period than kiln drying",
    explanation: "Air drying takes months or years, while kiln drying uses controlled conditions for days or weeks."
  },
  {
    id: 'joinery-l3-advanced-timber15',
    question: "What is the significance of the 'durability class' rating system for timber?",
    options: ["It classifies timber based on its density and hardness only", "It indicates resistance to decay and insect attack for different applications", "It rates how long timber has been stored before sale to consumers", "It refers exclusively to resistance to mechanical wear and abrasion"],
    correctAnswer: "It indicates resistance to decay and insect attack for different applications",
    explanation: "BS EN 350 classifies timbers from Class 1 (very durable) to Class 5 (not durable)."
  },
  {
    id: 'joinery-l3-advanced-timber16',
    question: "What are the characteristics and joinery applications of American black walnut (Juglans nigra)?",
    options: ["A highly resinous timber suitable only for painted joinery", "A softwood with distinctive grain used mainly for exterior cladding", "A pale, lightweight timber used primarily for economy furniture", "A chocolate-brown hardwood used for high-end furniture"],
    correctAnswer: "A chocolate-brown hardwood used for high-end furniture",
    explanation: "Medium-density with excellent stability, prized for furniture, decorative joinery, and architectural features."
  },
  {
    id: 'joinery-l3-advanced-timber17',
    question: "What is the purpose of the European Standard EN 942 in joinery?",
    options: ["It governs workplace safety when processing timber products", "It defines quality requirements for timber used in joinery", "It regulates timber harvesting methods across European forests", "It applies exclusively to engineered wood products manufacturing"],
    correctAnswer: "It defines quality requirements for timber used in joinery",
    explanation: "Classifies joinery timber into appearance grades based on permissible features like knots and splits."
  },
  {
    id: 'joinery-l3-advanced-timber18',
    question: "What is the relationship between timber density and its strength properties?",
    options: ["Density affects colour and appearance but not strength", "There is no consistent relationship between density and strength", "Higher density timber typically has greater strength properties", "Lower density timber is always stronger than high-density timber"],
    correctAnswer: "Higher density timber typically has greater strength properties",
    explanation: "Denser woods have thicker cell walls, resulting in higher compression and bending strength."
  },
  {
    id: 'joinery-l3-advanced-timber19',
    question: "What is acetylation in the context of timber modification?",
    options: ["A method of artificially ageing timber for antique reproduction", "A paint preparation technique for better finish adhesion", "A surface treatment to improve resistance to scratching", "A chemical process replacing hydroxyl groups with acetyl groups"],
    correctAnswer: "A chemical process replacing hydroxyl groups with acetyl groups",
    explanation: "Non-toxic modification creates stable, decay-resistant timber by reducing water absorption capacity."
  },
  {
    id: 'joinery-l3-advanced-timber20',
    question: "What is the difference between sapwood and heartwood in timber?",
    options: ["Sapwood comes from younger trees; heartwood from mature trees", "Sapwood is the outer, living part; heartwood is the inner core", "Sapwood is artificially coloured; heartwood has natural colouration", "Sapwood is stronger; heartwood is more flexible and workable"],
    correctAnswer: "Sapwood is the outer, living part; heartwood is the inner core",
    explanation: "Heartwood contains extractives making it more durable and differently coloured than sapwood."
  },
  {
    id: 'joinery-l3-advanced-timber21',
    question: "What is the purpose of checking moisture content of timber before joinery operations?",
    options: ["To calculate the appropriate pricing for the timber", "To check if chemical preservation treatment is necessary", "To verify moisture is appropriate for intended use", "To determine the age and origin of the timber"],
    correctAnswer: "To verify moisture is appropriate for intended use",
    explanation: "Ensures timber has been properly seasoned to prevent post-manufacturing movement and joint failure."
  },
  {
    id: 'joinery-l3-advanced-timber22',
    question: "What is 'timber stress grading' and what is its purpose?",
    options: ["The process of subjecting timber to pressure during manufacturing", "A method to release internal stresses in kiln-dried timber", "Testing timber by applying stress until failure to determine strength", "Evaluation of timber's structural properties for strength classification"],
    correctAnswer: "Evaluation of timber's structural properties for strength classification",
    explanation: "Assesses characteristics like knots and grain slope to assign grades indicating safe working stresses."
  },
  {
    id: 'joinery-l3-advanced-timber23',
    question: "What is the difference between a traditional solid timber panel and an engineered timber panel?",
    options: ["Solid panels are imported; engineered panels are domestically produced", "Solid panels are made from single species; engineered panels combine materials", "Solid panels are thicker; engineered panels are always thinner", "Solid panels are used in modern buildings; engineered in traditional"],
    correctAnswer: "Solid panels are made from single species; engineered panels combine materials",
    explanation: "Engineered panels offer better stability, efficient material use and larger available sizes."
  },
  {
    id: 'joinery-l3-advanced-timber24',
    question: "What is the purpose of applying end grain sealer to freshly sawn timber?",
    options: ["To mark the timber grade and quality for identification", "To protect against insect attack during initial storage", "To prevent moisture loss through end grain, reducing splitting", "To improve the timber's appearance and enhance grain patterns"],
    correctAnswer: "To prevent moisture loss through end grain, reducing splitting",
    explanation: "Slows moisture movement through end grain, which dries 10-12 times faster than side grain."
  },
  {
    id: 'joinery-l3-advanced-timber25',
    question: "What is the principle behind the 'lamello' jointing system in timber joinery?",
    options: ["Using dovetail joints cut by specialised lamello machinery", "Using compressed wooden biscuits that expand when glued", "Using laminated timber pieces for decorative joint effects", "Using metal brackets that are concealed with veneer"],
    correctAnswer: "Using compressed wooden biscuits that expand when glued",
    explanation: "Oval beech 'biscuits' expand with moisture from glue to create tight, perfectly aligned connections."
  },
  {
    id: 'joinery-l3-advanced-timber26',
    question: "What is meant by the term 'hygroscopic' when describing timber?",
    options: ["Timber that is particularly easy to clean and maintain", "Timber that has been treated with hygiene-improving chemicals", "Timber that absorbs and releases moisture with environment", "Timber that repels water due to natural oils"],
    correctAnswer: "Timber that absorbs and releases moisture with environment",
    explanation: "Timber equilibrates with surroundings, absorbing moisture in humid conditions and releasing in dry ones."
  },
  {
    id: 'joinery-l3-advanced-timber27',
    question: "What are the characteristics and applications of European redwood (Pinus sylvestris) in joinery?",
    options: ["A non-durable softwood used only for interior mouldings", "A tropical hardwood primarily used for outdoor decking", "A highly figured decorative timber used mainly for veneers", "A moderately durable softwood used for windows and doors"],
    correctAnswer: "A moderately durable softwood used for windows and doors",
    explanation: "Straight-grained with moderate movement, good workability, and accepts preservative treatment well."
  },
  {
    id: 'joinery-l3-advanced-timber28',
    question: "What is meant by 'figured timber' and how does it affect its use in joinery?",
    options: ["Timber priced using a complex calculation method", "Timber with distinctive decorative grain patterns", "Timber that has mathematical calculations marked on it", "Timber that has been shaped into specific figures"],
    correctAnswer: "Timber with distinctive decorative grain patterns",
    explanation: "Unusual growth produces decorative patterns valued for aesthetics but can present working challenges."
  },
  {
    id: 'joinery-l3-advanced-timber29',
    question: "What is the primary difference between MDF and particleboard in composition and joinery applications?",
    options: ["MDF is natural timber; particleboard contains synthetic materials", "MDF is for exterior use; particleboard is for interior only", "MDF is always thicker than particleboard in standard sheet sizes", "MDF uses wood fibres; particleboard uses wood chips and particles"],
    correctAnswer: "MDF uses wood fibres; particleboard uses wood chips and particles",
    explanation: "MDF's uniform texture allows detailed machining while particleboard is typically less expensive."
  },
  {
    id: 'joinery-l3-advanced-timber30',
    question: "What is the purpose of a moisture meter in joinery work?",
    options: ["To detect hidden metal in reclaimed timber before machining", "To measure moisture levels in adhesives and finishes", "To measure timber's moisture content for appropriate use", "To determine the age and source of timber"],
    correctAnswer: "To measure timber's moisture content for appropriate use",
    explanation: "Verifies timber has been properly seasoned and matches the intended installation environment."
  },
  {
    id: 'joinery-l3-advanced-timber31',
    question: "What causes blue stain in timber and how does it affect its properties?",
    options: ["A reaction to ultraviolet light exposure during storage", "A deliberate treatment applied to enhance timber appearance", "A chemical reaction with metal fasteners or fittings", "A fungal infection that causes discoloration but not structural damage"],
    correctAnswer: "A fungal infection that causes discoloration but not structural damage",
    explanation: "Fungi feed on sapwood nutrients, causing blue-grey discoloration without affecting mechanical properties."
  },
  {
    id: 'joinery-l3-advanced-timber32',
    question: "What is the primary advantage of using LVL (Laminated Veneer Lumber) in structural joinery applications?",
    options: ["It is made exclusively from sustainable plantation sources", "Consistent structural properties with high strength-to-weight ratio", "It is always less expensive than equivalent solid timber", "It is completely waterproof unlike traditional timber"],
    correctAnswer: "Consistent structural properties with high strength-to-weight ratio",
    explanation: "Parallel veneers create dimensionally stable, defect-free products with predictable engineering values."
  },
  {
    id: 'joinery-l3-advanced-timber33',
    question: "What is wood polymer composite (WPC) and what are its applications in joinery?",
    options: ["Pure hardwood with no additives or modifications", "A finish that creates a plastic-like surface on timber", "A material combining wood fibres and thermoplastic polymers", "A type of MDF with special heat-resistant resins"],
    correctAnswer: "A material combining wood fibres and thermoplastic polymers",
    explanation: "Offers improved moisture resistance for decking, cladding and outdoor applications."
  },
  {
    id: 'joinery-l3-advanced-timber34',
    question: "What is the significance of growth rate (ring width) in softwood timber quality for joinery?",
    options: ["Growth rings affect only the decorative appearance of timber", "Medium to narrow growth rings typically provide better stability", "Extremely fast growth produces the highest quality timber", "Growth rings have no impact on timber quality whatsoever"],
    correctAnswer: "Medium to narrow growth rings typically provide better stability",
    explanation: "Slower growth creates denser latewood bands relative to earlywood, improving strength and workability."
  },
  {
    id: 'joinery-l3-advanced-timber35',
    question: "What is the purpose of incorporating moisture buffers in timber building construction?",
    options: ["To filter out airborne pollutants from the building", "To create a waterproof barrier preventing any moisture entry", "To prevent all wood movement due to moisture changes", "To absorb and release moisture, moderating humidity fluctuations"],
    correctAnswer: "To absorb and release moisture, moderating humidity fluctuations",
    explanation: "Hygroscopic materials help maintain stable indoor humidity without mechanical systems."
  },
  {
    id: 'joinery-l3-advanced-timber36',
    question: "What is meant by the 'movement class' of timber and why is it important in joinery design?",
    options: ["How readily timber can be moved around the workshop", "Classification of timber's tendency to shrink and swell", "How quickly timber can be transported to site", "Classification of how fungi move through timber"],
    correctAnswer: "Classification of timber's tendency to shrink and swell",
    explanation: "Small, medium, or large movement classifications help select appropriate timber for specific applications."
  },
  {
    id: 'joinery-l3-advanced-timber37',
    question: "What is the difference between slash-sawn and rift-sawn timber?",
    options: ["Slash-sawn uses a slashing motion; rift-sawn uses rifting", "Slash-sawn is structural; rift-sawn is decorative only", "Growth rings at 30-60° vs 60-90° to the face", "Slash-sawn is cut at an angle; rift-sawn parallel to growth"],
    correctAnswer: "Growth rings at 30-60° vs 60-90° to the face",
    explanation: "Rift-sawn produces more stable timber with straight, consistent grain appearance."
  },
  {
    id: 'joinery-l3-advanced-timber38',
    question: "What is the purpose of vacuum kiln drying for timber?",
    options: ["To strengthen the timber's cell structure", "To create decorative patterns in the timber", "To remove insects from infected timber", "To dry timber faster at lower temperatures"],
    correctAnswer: "To dry timber faster at lower temperatures",
    explanation: "Reduced pressure lowers water's boiling point, allowing drying at 30-50°C instead of 70-90°C."
  },
  {
    id: 'joinery-l3-advanced-timber39',
    question: "What is 'reaction wood' in timber and how does it affect joinery applications?",
    options: ["Wood that has been chemically treated for reactivity", "Wood that changes colour when exposed to light", "Wood that reacts chemically with certain adhesives", "Wood formed due to stress in growing trees"],
    correctAnswer: "Wood formed due to stress in growing trees",
    explanation: "Exhibits abnormal shrinkage during drying, causing warping, joint failure and machining difficulties."
  },
  {
    id: 'joinery-l3-advanced-timber40',
    question: "What is the significance of the 'modulus of elasticity' (MOE) in timber selection for joinery?",
    options: ["It measures resistance to insect attack", "It measures how easily timber can bend before breaking", "It measures stiffness or resistance to deflection under load", "It measures the timber's resistance to fungal decay"],
    correctAnswer: "It measures stiffness or resistance to deflection under load",
    explanation: "Higher MOE values indicate stiffer timber, important where minimal deflection is required."
  },
  {
    id: 'joinery-l3-advanced-timber41',
    question: "What causes honeycomb checks in timber and how do they affect its use?",
    options: ["A fungal decay that creates hexagonal patterns", "Small holes created by insects, affecting appearance only", "A distinctive grain pattern valued for decoration", "Internal cracks that form during drying, weakening timber"],
    correctAnswer: "Internal cracks that form during drying, weakening timber",
    explanation: "Internal failures occur when core dries too quickly, compromising structural integrity."
  },
  {
    id: 'joinery-l3-advanced-timber42',
    question: "What are the characteristics and applications of iroko (Milicia excelsa) in joinery?",
    options: ["A highly figured timber used exclusively for veneers", "A durable hardwood suitable for external joinery", "A hardwood with poor durability used only indoors", "A softwood used primarily for interior trim work"],
    correctAnswer: "A durable hardwood suitable for external joinery",
    explanation: "Class 1-2 durability, moderate movement, and good weathering make it valuable for exterior applications."
  },
  {
    id: 'joinery-l3-advanced-timber43',
    question: "What is the purpose of end-matching in timber flooring?",
    options: ["Applying decorative treatment to board ends only", "Ensuring boards are the same length at installation", "Creating tongue and groove joints on board ends", "Ensuring boards match in colour at ends"],
    correctAnswer: "Creating tongue and groove joints on board ends",
    explanation: "Allows joining away from joists while maintaining vertical alignment and structural integrity."
  },
  {
    id: 'joinery-l3-advanced-timber44',
    question: "What is the purpose of a moisture barrier in timber frame construction?",
    options: ["To strengthen the timber frame structure", "To provide additional thermal insulation properties", "To completely prevent air movement through the wall", "To prevent vapour reaching cold surfaces where condensation may occur"],
    correctAnswer: "To prevent vapour reaching cold surfaces where condensation may occur",
    explanation: "Limits water vapour diffusion, preventing interstitial condensation that could cause decay."
  },
  {
    id: 'joinery-l3-advanced-timber45',
    question: "What is meant by the term 'cell collapse' in timber drying?",
    options: ["A controlled process to increase timber density", "Biological breakdown of cells by bacteria", "The normal shrinkage process in all timber", "Physical collapse of cell walls causing excessive shrinkage"],
    correctAnswer: "Physical collapse of cell walls causing excessive shrinkage",
    explanation: "Capillary tension forces crush cell structure, resulting in corrugated surface appearance."
  },
  {
    id: 'joinery-l3-advanced-timber46',
    question: "What are the advantages of specifying FSC or PEFC certified timber for joinery projects?",
    options: ["These timbers are always less expensive than alternatives", "These timbers are always kiln-dried to exacting standards", "Guarantee the timber is stronger than non-certified timber", "Assurance timber comes from responsibly managed forests"],
    correctAnswer: "Assurance timber comes from responsibly managed forests",
    explanation: "Certification ensures sustainable forest management with verified chain of custody tracking."
  },
  {
    id: 'joinery-l3-advanced-timber47',
    question: "What is the structural grading system used for softwood in the UK and what does it indicate?",
    options: ["A-B-C system indicating aesthetic appearance only", "The 1-2-3 system indicating timber age categories", "Red-yellow-green system indicating ease of working", "C16, C24, TR26 system indicating strength classes"],
    correctAnswer: "C16, C24, TR26 system indicating strength classes",
    explanation: "Numbers indicate characteristic bending strength in N/mm² for appropriate engineering use."
  },
  {
    id: 'joinery-l3-advanced-timber48',
    question: "What is 'polymer timber composite' and how does it differ from natural timber?",
    options: ["Natural timber with a protective polymer coating", "Solid timber with polymer insertions for decoration", "Another name for MDF or particleboard products", "A material combining wood fibre with thermoplastic polymer"],
    correctAnswer: "A material combining wood fibre with thermoplastic polymer",
    explanation: "Resists moisture movement, decay and insects without preservatives, requiring minimal maintenance."
  },
  {
    id: 'joinery-l3-advanced-timber49',
    question: "What is meant by 'timber conditioning' prior to joinery manufacturing?",
    options: ["A special finishing technique for high-end work", "Allowing timber to reach equilibrium with environment", "Applying conditioning oil to the timber surface", "Treating timber with preservative chemicals"],
    correctAnswer: "Allowing timber to reach equilibrium with environment",
    explanation: "Storing timber in workshop conditions before manufacturing reduces post-production movement."
  },
  {
    id: 'joinery-l3-advanced-timber50',
    question: "What causes 'shake' defects in timber and how do they affect its use in joinery?",
    options: ["A fungal infection affecting the timber's structure", "Excessive vibration during machining operations", "Separation of wood fibres along the grain", "Rapid moisture loss causing surface checking only"],
    correctAnswer: "Separation of wood fibres along the grain",
    explanation: "Significantly weakens timber structurally, affecting joint integrity and water resistance."
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
