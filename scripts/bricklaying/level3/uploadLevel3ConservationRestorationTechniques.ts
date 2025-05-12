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

// ✅ Bricklaying Level 3 Conservation & Restoration Techniques Questions
const questions = [
  {
    id: 'bricklaying-l3-topic7-1',
    question: "What is the 'principle of minimum intervention' in conservation work?",
    options: ["Using the smallest possible team to carry out the work", "Doing as little work as possible to reduce costs", "Carrying out only the minimum work necessary to conserve a historic structure", "Intervening only on the smallest parts of the building"],
    correctAnswer: "Carrying out only the minimum work necessary to conserve a historic structure",
    explanation: "The principle of minimum intervention advocates doing only what is necessary to conserve a historic structure and prevent further deterioration. This approach preserves the maximum amount of original fabric and maintains historical integrity and authenticity. Conservation professionals aim to stabilize and repair rather than replace, intervening only when essential for preserving the structure's cultural significance and avoiding unnecessary work that might diminish its historical value."
  },
  {
    id: 'bricklaying-l3-topic7-2',
    question: "What is the difference between 'conservation' and 'restoration' in heritage masonry?",
    options: ["They are exactly the same thing", "Conservation costs less than restoration", "Conservation preserves existing fabric while restoration returns a building to a previous state", "Conservation is for old buildings while restoration is for newer ones"],
    correctAnswer: "Conservation preserves existing fabric while restoration returns a building to a previous state",
    explanation: "Conservation preserves existing fabric, focusing on maintaining and protecting what remains without necessarily reinstating lost elements. Restoration, however, returns a building to a previous state by recreating missing features or removing later additions. Both approaches have their place in heritage masonry, with conservation generally preferred when original fabric survives, while restoration might be appropriate when substantial evidence exists of important missing elements that contribute to the building's significance."
  },
  {
    id: 'bricklaying-l3-topic7-3',
    question: "Why is it important to use lime mortar rather than cement mortar when repointing traditional masonry?",
    options: ["Lime mortar is always cheaper than cement", "Lime mortar sets faster than cement mortar", "Lime mortar is softer and more breathable, preventing damage to historic masonry", "Lime mortar is more colorful and decorative"],
    correctAnswer: "Lime mortar is softer and more breathable, preventing damage to historic masonry",
    explanation: "Lime mortar is essential for traditional masonry because it's softer and more breathable than cement mortar. Its porosity allows moisture to evaporate from the wall rather than becoming trapped, preventing freeze-thaw damage and salt crystallization. The softer nature of lime mortar allows slight building movement without cracking the masonry units themselves. Cement mortar is too hard and impermeable for historic buildings, causing accelerated deterioration of softer masonry as stresses and moisture become concentrated in the bricks or stones rather than the mortar."
  },
  {
    id: 'bricklaying-l3-topic7-4',
    question: "What is a 'sacrificial render' in conservation work?",
    options: ["A render that requires replacement every few years", "A render that contains animal sacrifices for traditional purposes", "A render specifically designed to weather and deteriorate instead of the underlying masonry", "A render applied only during religious ceremonies"],
    correctAnswer: "A render specifically designed to weather and deteriorate instead of the underlying masonry",
    explanation: "A sacrificial render is specifically designed to weather and deteriorate instead of the underlying masonry. Applied to historic walls suffering from weathering or salt contamination, these renders (typically lime-based) draw out salts and moisture from the wall and take the brunt of weathering processes. As the name suggests, the render sacrifices itself to protect the historic fabric beneath. When deteriorated, the render is replaced with a fresh application, continuing the protective cycle without damaging the original masonry."
  },
  {
    id: 'bricklaying-l3-topic7-5',
    question: "What is 'like-for-like' replacement in conservation masonry?",
    options: ["Trading one brick for another of equal value", "Replacing materials with others that look similar but are more modern", "Replacing materials with the same type, composition, and appearance as the original", "Replacing two bricks with two bricks, rather than one larger one"],
    correctAnswer: "Replacing materials with the same type, composition, and appearance as the original",
    explanation: "Like-for-like replacement involves replacing materials with the same type, composition, and appearance as the original. This conservation principle ensures authenticity and technical compatibility. When original masonry units must be replaced, matching the historical materials in size, composition, color, texture, and manufacturing method maintains the building's character and ensures similar weathering and movement characteristics. This approach preserves the building's historic integrity while ensuring the new materials will perform similarly to the originals over time."
  },
  {
    id: 'bricklaying-l3-topic7-6',
    question: "What is 'consolidation' in masonry conservation?",
    options: ["Combining several buildings into one", "Strengthening deteriorated masonry by introducing compatible materials into its structure", "Removing multiple layers of paint", "Replacing several small stones with one large one"],
    correctAnswer: "Strengthening deteriorated masonry by introducing compatible materials into its structure",
    explanation: "Consolidation strengthens deteriorated masonry by introducing compatible materials into its structure. This technique addresses friable or crumbling masonry by applying consolidants (often silicates or lime-based) that penetrate the material and restore cohesion without changing appearance. Consolidation preserves original fabric that would otherwise be too damaged to save, adhering to the conservation principle of retaining authentic material. The process requires careful material selection to ensure compatibility with the historic substrate."
  },
  {
    id: 'bricklaying-l3-topic7-7',
    question: "What is meant by 'reversibility' in conservation work?",
    options: ["The ability to work on both sides of a wall", "The practice of changing the design during the project", "The principle that conservation treatments should be removable without damaging original fabric", "Changing the orientation of bricks to the opposite direction"],
    correctAnswer: "The principle that conservation treatments should be removable without damaging original fabric",
    explanation: "Reversibility means conservation treatments should be removable without damaging original fabric. This principle ensures that future conservators can undo current interventions if better techniques develop or if treatments prove harmful over time. While complete reversibility is often idealistic, conservators strive for maximum reversibility by using removable fixings, mechanical rather than chemical bonds where possible, and carefully documenting all interventions so future practitioners understand what was done and how it might be reversed."
  },
  {
    id: 'bricklaying-l3-topic7-8',
    question: "What is a 'heritage statement' in relation to conservation projects?",
    options: ["A financial statement about the heritage value", "A document assessing the significance of a heritage asset and the impact of proposed works", "A statement declaring a building to be heritage", "A press statement about heritage work"],
    correctAnswer: "A document assessing the significance of a heritage asset and the impact of proposed works",
    explanation: "A heritage statement assesses the significance of a heritage asset and the impact of proposed works. This critical document identifies what makes the building historically or architecturally important, analyzes how proposed work might affect this significance, and justifies the approach taken. For masonry conservation, it might detail significant original features, materials, construction techniques, and explain how conservation methods will preserve these values. Heritage statements are typically required for planning applications and listed building consent."
  },
  {
    id: 'bricklaying-l3-topic7-9',
    question: "What is meant by 'breathability' in traditional masonry construction?",
    options: ["The ability to provide ventilation to interiors", "The porosity that allows moisture to move through walls and evaporate", "The spacing between bricks that allows air flow", "A special breathing technique used by masons when working with dusty materials"],
    correctAnswer: "The porosity that allows moisture to move through walls and evaporate",
    explanation: "Breathability refers to the porosity that allows moisture to move through walls and evaporate. Traditional masonry buildings manage moisture through vapor-permeable materials like lime mortar and natural stone that allow walls to absorb and release moisture without damage. This 'breathing' quality prevents trapped moisture that could cause deterioration. Conservation work must maintain this breathability by using compatible permeable materials rather than impermeable modern substitutes that would interrupt the moisture equilibrium and potentially accelerate decay."
  },
  {
    id: 'bricklaying-l3-topic7-10',
    question: "What is the purpose of 'recording and documentation' before and during conservation works?",
    options: ["Only to fulfill legal requirements", "Only to justify the cost to clients", "To create a comprehensive record of the asset and interventions for future reference and understanding", "Only to produce marketing materials"],
    correctAnswer: "To create a comprehensive record of the asset and interventions for future reference and understanding",
    explanation: "Recording and documentation creates a comprehensive record of the asset and interventions for future reference. This practice documents the building's condition before work, details discovered during the process, and records all conservation treatments applied. Documentation typically includes photographs, drawings, written descriptions, and material analysis. This information guides current work, informs future maintenance and interventions, contributes to wider understanding of historic construction techniques, and provides accountability for the conservation approach taken."
  },
  {
    id: 'bricklaying-l3-topic7-11',
    question: "What is 'tuckpointing' in historic brickwork?",
    options: ["A modern repointing technique using cement", "A decorative technique creating an illusion of fine joints on irregular brickwork", "The process of completely removing all mortar from joints", "A type of brick made for conservation projects"],
    correctAnswer: "A decorative technique creating an illusion of fine joints on irregular brickwork",
    explanation: "Tuckpointing is a decorative technique creating an illusion of fine joints on irregular brickwork. It involves filling brick joints with mortar matching the brick color, then applying a thin line of contrasting (usually white) lime putty to create the appearance of precise, narrow joints. This historically significant technique was used on superior quality facades to simulate the appearance of gauged brickwork with rubbed bricks and fine joints. Conservation of tuckpointing requires specialized skills to maintain this distinctive historic finish."
  },
  {
    id: 'bricklaying-l3-topic7-12',
    question: "What does 'lime slaking' refer to in traditional mortar preparation?",
    options: ["Adding water to quicklime to produce lime putty or hydrated lime", "Mixing lime with sand", "Drying out lime mortar", "Adding cement to lime"],
    correctAnswer: "Adding water to quicklime to produce lime putty or hydrated lime",
    explanation: "Lime slaking refers to adding water to quicklime (calcium oxide) to produce lime putty or hydrated lime (calcium hydroxide). This chemical reaction generates considerable heat. In traditional methods, quicklime is slaked with excess water to form lime putty, which is then matured for weeks or months to improve workability and performance. For conservation masonry, properly slaked and matured lime produces superior mortars with better workability, flexibility, and self-healing properties than those made with dry hydrated lime."
  },
  {
    id: 'bricklaying-l3-topic7-13',
    question: "What is meant by 'carbonation' in lime mortars?",
    options: ["Adding carbon dioxide to the mix", "The hardening process where lime putty converts back to limestone by absorbing carbon dioxide", "Burning of the lime during mixing", "Adding carbonated water to make mixing easier"],
    correctAnswer: "The hardening process where lime putty converts back to limestone by absorbing carbon dioxide",
    explanation: "Carbonation is the hardening process where lime putty converts back to limestone by absorbing carbon dioxide. This chemical reaction completes the 'lime cycle' – limestone (calcium carbonate) is burned to create quicklime, then slaked to form lime putty, which slowly absorbs CO₂ from the air to revert to calcium carbonate. Unlike cement, which sets through hydration, lime mortar requires exposure to air for carbonation. This slow hardening process allows for movement and self-healing in historic masonry and contributes to lime's breathable, flexible properties."
  },
  {
    id: 'bricklaying-l3-topic7-14',
    question: "What is a 'hot mixed lime mortar'?",
    options: ["Any mortar mixed in hot weather", "Mortar mixed at high speed", "Mortar made by mixing quicklime directly with sand and water", "Mortar that has been heated after mixing"],
    correctAnswer: "Mortar made by mixing quicklime directly with sand and water",
    explanation: "Hot mixed lime mortar is made by mixing quicklime directly with sand and water. This traditional technique, where the slaking reaction occurs simultaneously with mixing, produces distinctive properties increasingly valued in conservation. The heat generated helps bind clay particles in impure sands, while quicklime particles create a microporous structure beneficial for moisture management. Recent research shows many historic mortars were hot-mixed, making this method appropriate for authentic repairs to pre-20th century buildings rather than using pre-slaked lime putty."
  },
  {
    id: 'bricklaying-l3-topic7-15',
    question: "What is 'grouting' in masonry conservation?",
    options: ["Cleaning masonry with abrasives", "Injecting fluid mortar into voids and cracks to consolidate masonry", "Applying a decorative finish to the surface", "A technique for removing old mortar"],
    correctAnswer: "Injecting fluid mortar into voids and cracks to consolidate masonry",
    explanation: "Grouting in masonry conservation involves injecting fluid mortar into voids and cracks to consolidate masonry. This minimally invasive technique stabilizes walls where inner cores have deteriorated or where structural cracks have formed, without dismantling the masonry. Conservation grouting typically uses lime-based grouts with carefully controlled flow properties, particle size, and setting characteristics. The process requires careful assessment of the void structure and injection pressures to ensure complete filling without damaging the historic fabric."
  },
  {
    id: 'bricklaying-l3-topic7-16',
    question: "What is 'NHL' in the context of conservation mortars?",
    options: ["National Heritage Listing", "Natural Hockey League", "Natural Hydraulic Lime", "New Historic Lime"],
    correctAnswer: "Natural Hydraulic Lime",
    explanation: "NHL stands for Natural Hydraulic Lime, a binder commonly used in conservation mortars. Unlike non-hydraulic lime (CL), which sets only through carbonation, NHL contains natural impurities that give it hydraulic properties, allowing it to set partially through reaction with water. This provides faster initial set while maintaining breathability and flexibility. NHL is classified by strength (NHL 2, 3.5, 5) with lower numbers being softer and more appropriate for the most sensitive historic masonry. It's valued for its compatibility with traditional buildings while offering practical advantages over pure lime putty."
  },
  {
    id: 'bricklaying-l3-topic7-17',
    question: "What is 'sympathetic repair' in heritage conservation?",
    options: ["Feeling sorry for damaged buildings", "Using the cheapest repair method available", "Repairs that match and respect the character, materials, and techniques of the historic building", "Only repairing the most visible damage"],
    correctAnswer: "Repairs that match and respect the character, materials, and techniques of the historic building",
    explanation: "Sympathetic repair involves methods that match and respect the character, materials, and techniques of the historic building. This approach ensures interventions blend harmoniously with the original fabric in appearance, composition, and behavior. For masonry, this means using compatible materials (often traditional ones) that don't damage the existing structure, maintaining similar appearance, and employing traditional craft techniques where appropriate. Sympathetic repairs maintain the building's authenticity and integrity while addressing necessary conservation needs."
  },
  {
    id: 'bricklaying-l3-topic7-18',
    question: "What is 'rising damp' in historic masonry and how does it differ from other forms of dampness?",
    options: ["Dampness from poor roof drainage", "Ground moisture rising up through the wall through capillary action", "Condensation on cold wall surfaces", "Water leaking through cracks"],
    correctAnswer: "Ground moisture rising up through the wall through capillary action",
    explanation: "Rising damp is ground moisture traveling up through the wall via capillary action. Unlike penetrating damp (from rainfall) or condensation (from humidity), rising damp moves upward from the ground, carrying dissolved salts that can damage masonry and finishes. In historic buildings, rising damp is often managed through traditional breathable materials rather than modern barriers. Appropriate conservation addresses the cause while using compatible materials that allow the building to manage moisture as originally intended, rather than forcing modern waterproofing solutions that may cause harm."
  },
  {
    id: 'bricklaying-l3-topic7-19',
    question: "What is 'spalling' in brick masonry?",
    options: ["A decorative brick pattern", "The flaking or fragmentation of the brick surface", "The process of cleaning bricks", "A method of laying bricks in arches"],
    correctAnswer: "The flaking or fragmentation of the brick surface",
    explanation: "Spalling is the flaking or fragmentation of the brick surface due to pressure within the material. Common causes include freeze-thaw cycles where trapped moisture expands when frozen, salt crystallization where salts carried in water crystallize within the pores, and inappropriate repairs like cement pointing that prevents breathability. Conservation approaches include addressing moisture problems, removing incompatible materials, and sometimes consolidation of spalling surfaces or carefully matched replacement where the damage is severe."
  },
  {
    id: 'bricklaying-l3-topic7-20',
    question: "What is meant by 'lime bleeding' in new pointing work?",
    options: ["Lime mortar running down the face of masonry as streaks or stains", "The process of lime hardening", "Adding extra lime to a mortar mix", "A technique for coloring lime mortar"],
    correctAnswer: "Lime mortar running down the face of masonry as streaks or stains",
    explanation: "Lime bleeding refers to lime mortar running down the face of masonry as streaks or stains. This occurs when excess water carries lime particles over the face of the masonry during or after pointing work. In conservation, bleeding can stain historic masonry and is prevented through proper mortar consistency (stiff enough to avoid excess moisture), appropriate protection during curing, careful application techniques, and thorough cleaning of excess mortar before it can be washed down the face by rain."
  },
  {
    id: 'bricklaying-l3-topic7-21',
    question: "What is 'plastic repair' in masonry conservation?",
    options: ["Using plastic materials to repair masonry", "Repairing plastic components", "Using a moldable mortar mix to rebuild damaged masonry in situ", "Covering masonry with plastic sheeting for protection"],
    correctAnswer: "Using a moldable mortar mix to rebuild damaged masonry in situ",
    explanation: "Plastic repair involves using a moldable mortar mix to rebuild damaged masonry in situ. This technique repairs localized damage without replacing entire masonry units, conserving original fabric. The repair mortar, typically lime-based with appropriate aggregates and sometimes stone dust from the original material, is applied to the prepared damaged area and shaped to match the surrounding masonry. Skilled craftspeople can match color, texture, and profile, providing a durable, visually integrated repair that preserves maximum historic material."
  },
  {
    id: 'bricklaying-l3-topic7-22',
    question: "What is meant by 'weathering' in the context of masonry repairs?",
    options: ["Natural deterioration of stone over time", "Protection of masonry from weather", "Shaping repairs to shed water and match surrounding erosion patterns", "A method of artificially aging new masonry"],
    correctAnswer: "Shaping repairs to shed water and match surrounding erosion patterns",
    explanation: "In masonry repairs, weathering refers to shaping repairs to shed water and match surrounding erosion patterns. When replacing damaged sections or making plastic repairs, conservators carefully form the new surface to ensure water runs off efficiently while blending with the weathered appearance of adjacent original material. This skilled finishing technique ensures repairs don't stand out as obviously new, maintain the character of the aged building, and function properly in managing water movement across the façade."
  },
  {
    id: 'bricklaying-l3-topic7-23',
    question: "What is 'repointing' in masonry conservation?",
    options: ["Redirecting visitors to another entrance", "The process of removing deteriorated mortar and replacing it", "Reshaping stone elements to a point", "A survey technique for identifying settlement"],
    correctAnswer: "The process of removing deteriorated mortar and replacing it",
    explanation: "Repointing is the process of removing deteriorated mortar from joints and replacing it with new mortar. This conservation treatment addresses deteriorated pointing that no longer protects the masonry while maintaining the building's appearance and technical performance. In conservation, appropriate repointing uses compatible materials (typically lime-based), matches the original joint profile and finish, and employs non-damaging removal techniques. Proper repointing extends the life of masonry walls by preventing water ingress while maintaining historic character and breathability."
  },
  {
    id: 'bricklaying-l3-topic7-24',
    question: "What is 'dutchman repair' in stone conservation?",
    options: ["A repair technique developed in the Netherlands", "Importing Dutch stone for repairs", "Inserting a new piece of stone into a cutout section of damaged stone", "A method using Dutch cement"],
    correctAnswer: "Inserting a new piece of stone into a cutout section of damaged stone",
    explanation: "Dutchman repair involves inserting a new piece of stone into a cutout section of damaged stone. This precise technique removes only the deteriorated portion of a stone unit and replaces it with a carefully matched new stone insert, preserving the majority of the original material. The repair requires skilled craftsmanship to achieve tight, nearly invisible joints between the original stone and the insert. Dutchman repairs are particularly valuable for conserving carved or molded elements where limited damage would otherwise require complete replacement."
  },
  {
    id: 'bricklaying-l3-topic7-25',
    question: "What is 'lime putty' and why is it preferred in some conservation projects over hydraulic lime?",
    options: ["A modern synthetic material", "Pure non-hydraulic lime matured under water, preferred for its workability and compatibility with the softest historic mortars", "A type of cement", "A filling material used only for decorative purposes"],
    correctAnswer: "Pure non-hydraulic lime matured under water, preferred for its workability and compatibility with the softest historic mortars",
    explanation: "Lime putty is pure non-hydraulic lime (calcium hydroxide) matured under water. It's preferred in some conservation projects because of its exceptional workability, plasticity, and compatibility with the softest historic mortars. Lime putty hardens solely through carbonation (absorption of carbon dioxide), producing very flexible mortars ideal for the most sensitive historic buildings with significant movement. While slower setting than hydraulic limes, mature lime putty (aged 3+ months) produces mortars with superior handling properties and the closest match to many pre-industrial original mortars."
  },
  {
    id: 'bricklaying-l3-topic7-26',
    question: "What is meant by 'honest repair' in conservation philosophy?",
    options: ["Always telling the client exactly what work was done", "Repairs that don't attempt to disguise or falsify the building's history", "Using only the most expensive materials", "Repairs certified by a regulatory authority"],
    correctAnswer: "Repairs that don't attempt to disguise or falsify the building's history",
    explanation: "Honest repair refers to interventions that don't attempt to disguise or falsify the building's history. This philosophical approach acknowledges the building as a historical document and accepts that repairs can be identifiable under close inspection, though they should be visually harmonious. Honest repairs might be subtly differentiated from original material through minor variations in technique or using clear documentation rather than artificial aging. This avoids creating a false impression of the building's evolution while still achieving visual coherence."
  },
  {
    id: 'bricklaying-l3-topic7-27',
    question: "What is a 'sacrificial mortar joint' in conservation work?",
    options: ["A joint that is intentionally designed to fail quickly", "A mortar joint that contains religious artifacts", "A joint that is softer than the masonry units to protect them from weathering and movement", "A joint that requires extra sacrifice in terms of labor"],
    correctAnswer: "A joint that is softer than the masonry units to protect them from weathering and movement",
    explanation: "A sacrificial mortar joint is softer than the masonry units to protect them from weathering and movement. This conservation approach uses lime mortars formulated to be the 'weak point' in the masonry system, absorbing stresses and deteriorating preferentially to the historic masonry units. When movement or weathering affects the wall, the joints crack or erode rather than the irreplaceable historic bricks or stones. These joints can be periodically renewed, 'sacrificing' themselves to preserve the original masonry units."
  },
  {
    id: 'bricklaying-l3-topic7-28',
    question: "What is 'delamination' in stone masonry?",
    options: ["Adding a new layer of stone", "Cleaning stone with laminates", "The splitting of stone along bedding planes", "A technique for bonding different stones together"],
    correctAnswer: "The splitting of stone along bedding planes",
    explanation: "Delamination is the splitting of stone along bedding planes. This deterioration occurs when layers of sedimentary stone separate due to weathering, freeze-thaw cycles, salt crystallization, or improper installation ignoring the natural bedding orientation. In conservation, addressing delamination may involve consolidation treatments for early-stage problems, or insertion repairs (like dutchman repairs or pinning) for more advanced cases. Prevention includes proper stone selection, correct bedding orientation during installation, and appropriate moisture management to prevent the stresses that cause separation."
  },
  {
    id: 'bricklaying-l3-topic7-29',
    question: "What does 'patination' refer to in historic masonry?",
    options: ["A method of cutting stone", "The natural aging and weathering that creates a characteristic surface on old masonry", "A type of stone disease", "Application of patterns to brickwork"],
    correctAnswer: "The natural aging and weathering that creates a characteristic surface on old masonry",
    explanation: "Patination refers to the natural aging and weathering that creates a characteristic surface on old masonry. This includes color changes, the development of biological growths like lichens, slight surface erosion, and the general mellowing of appearance that comes with age. Conservation philosophy generally values this patina as part of the building's authentic character and historical value. While harmful deterioration requires intervention, benign patination is typically preserved rather than cleaned away, maintaining the building's sense of age and historical continuity."
  },
  {
    id: 'bricklaying-l3-topic7-30',
    question: "What is 'indent repair' in stone masonry conservation?",
    options: ["Making decorative indentations in stone surfaces", "A technique of pressing into soft stones", "Cutting out damaged stone and replacing it with new stone", "A specific spacing between stones"],
    correctAnswer: "Cutting out damaged stone and replacing it with new stone",
    explanation: "Indent repair involves cutting out damaged stone and replacing it with new stone. This conservation technique removes only deteriorated sections, creating a pocket (or indent) into which a new piece of matching stone is fitted and secured with lime mortar or occasionally structural adhesives. Indent repairs preserve more original material than full replacement while addressing sections that are too damaged for surface repairs. Skilled masons ensure the new stone matches the original in type, color, texture, and tooling marks."
  },
  {
    id: 'bricklaying-l3-topic7-31',
    question: "What is 'mortar analysis' in conservation projects?",
    options: ["Checking if mortar is strong enough", "Laboratory examination of historic mortar to determine its composition", "Financial analysis of mortar costs", "Testing how quickly mortar sets"],
    correctAnswer: "Laboratory examination of historic mortar to determine its composition",
    explanation: "Mortar analysis is laboratory examination of historic mortar to determine its composition. This scientific process identifies the original binder type, aggregate composition, proportions, and sometimes additives or colorants. For conservation projects, this information guides the formulation of compatible repair mortars that match the original in appearance, strength, and performance characteristics. Analysis might include techniques like acid digestion, petrographic examination, and various forms of microscopy and chemical testing to provide a comprehensive understanding of the historic material."
  },
  {
    id: 'bricklaying-l3-topic7-32',
    question: "What is a 'lime cycle' in traditional building materials?",
    options: ["The seasonal timing for lime application", "The process of manufacturing, using, and deterioration of lime-based materials", "A bicycle made of limestone", "The daily routine of a lime plasterer"],
    correctAnswer: "The process of manufacturing, using, and deterioration of lime-based materials",
    explanation: "The lime cycle refers to the process of manufacturing, using, and deterioration of lime-based materials. This cycle begins with limestone (calcium carbonate), which is burned (calcined) to produce quicklime (calcium oxide), then slaked with water to form lime putty or hydrated lime (calcium hydroxide). When used in mortar or plaster, the calcium hydroxide slowly absorbs carbon dioxide from the air and converts back to calcium carbonate – effectively returning to limestone. Understanding this cycle is fundamental to conservation masonry as it explains the behavior and compatibility of traditional lime materials."
  },
  {
    id: 'bricklaying-l3-topic7-33',
    question: "What is 'cutting out' in the context of masonry conservation?",
    options: ["Eliminating parts of a conservation plan", "Carefully removing deteriorated mortar or damaged masonry units", "Cutting decorative patterns into stone", "Removing a building from a conservation area"],
    correctAnswer: "Carefully removing deteriorated mortar or damaged masonry units",
    explanation: "Cutting out in masonry conservation refers to carefully removing deteriorated mortar or damaged masonry units. This preparatory process creates clean surfaces for repairs or repointing. Conservation practice emphasizes non-damaging removal techniques that protect the surrounding historic fabric – typically using hand tools rather than power tools that might damage masonry edges. Proper cutting out removes only deteriorated material to the necessary depth while preserving as much original fabric as possible and avoiding damage to sound masonry."
  },
  {
    id: 'bricklaying-l3-topic7-34',
    question: "What are 'Roman cement' and 'Parker's cement' in historic buildings?",
    options: ["Modern Portland cement made to look old", "Types of plaster", "Natural cements used in the 18th-19th centuries that set quickly and were water-resistant", "Cement imported from Rome"],
    correctAnswer: "Natural cements used in the 18th-19th centuries that set quickly and were water-resistant",
    explanation: "Roman cement and Parker's cement are natural cements used in the 18th-19th centuries that set quickly and were water-resistant. Despite the name, Roman cement was not Roman but a natural hydraulic cement patented by James Parker in 1796 (hence also called Parker's cement). Made by burning specific clayey limestones, these materials were widely used before Portland cement for stucco, rendering, and water-resistant applications. Conservation of buildings from this period often requires matching these distinctive historical materials rather than using modern equivalents."
  },
  {
    id: 'bricklaying-l3-topic7-35',
    question: "What is 'gauged brickwork' in historic masonry?",
    options: ["Brickwork measured with special gauges", "Highly precise brickwork using rubbed and cut bricks with very fine joints", "Brickwork with mortar gauged with cement", "Brickwork laid to standard gauge measurements"],
    correctAnswer: "Highly precise brickwork using rubbed and cut bricks with very fine joints",
    explanation: "Gauged brickwork is highly precise work using rubbed and cut bricks with very fine joints. This high-status historic technique features specially made soft bricks that are rubbed or cut to exact dimensions and laid with joints as thin as 1mm. Often used for arches, decorative features, and prestigious facades, gauged work requires exceptional skill. Conservation of gauged brickwork demands specialized knowledge of traditional methods, appropriate brick selection, and the ability to mix and apply the fine lime putty mortar traditionally used with this technique."
  },
  {
    id: 'bricklaying-l3-topic7-36',
    question: "What is 'brick matching' in conservation work?",
    options: ["Pairing bricklayers with similar skills", "A game played with bricks during breaks", "The process of finding or manufacturing bricks to match historic ones for repairs", "Organizing bricks in matching pairs"],
    correctAnswer: "The process of finding or manufacturing bricks to match historic ones for repairs",
    explanation: "Brick matching is the process of finding or manufacturing bricks to match historic ones for repairs. This involves matching dimensions, color, texture, porosity, and composition of original bricks to ensure visual compatibility and similar weathering characteristics. Conservation specialists may source salvaged period bricks, identify appropriate handmade replacements, or commission custom bricks from specialist manufacturers. Proper matching considers not just initial appearance but how the bricks will age and weather alongside the originals over time."
  },
  {
    id: 'bricklaying-l3-topic7-37',
    question: "What is 'dry rot' and how does it affect historic timber elements in masonry buildings?",
    options: ["Normal drying of timber over time", "A fungal decay that can spread through masonry to attack timber", "Rot that occurs only in very dry conditions", "A type of stone deterioration"],
    correctAnswer: "A fungal decay that can spread through masonry to attack timber",
    explanation: "Dry rot is a fungal decay that can spread through masonry to attack timber. Despite its name, it requires moisture to develop (typically 20-30% moisture content in wood). The fungus (Serpula lacrymans) can spread through masonry, behind plaster, and under floors to reach timber elements like beams, joists, and lintels embedded in walls. In historic buildings, conservation approaches favor targeted treatments and addressing moisture sources rather than wholesale replacement, recognizing the value of original timber elements within masonry structures."
  },
  {
    id: 'bricklaying-l3-topic7-38',
    question: "What is 'descaling' in masonry conservation?",
    options: ["Removing limescale from stonework", "Reducing the scale of a conservation project", "Carefully removing loose, deteriorated material from a masonry surface", "Measuring and drawing a building at a smaller scale"],
    correctAnswer: "Carefully removing loose, deteriorated material from a masonry surface",
    explanation: "Descaling involves carefully removing loose, deteriorated material from a masonry surface. This conservation process eliminates unstable material that might continue to detach and cause further damage, creating a sound substrate for repairs. Unlike aggressive cleaning, descaling is selective and targeted, removing only material that is already failing while preserving sound historic fabric. Tools typically include soft brushes, wooden scrapers, or similar non-damaging implements to ensure only loose material is removed without harming the underlying sound masonry."
  },
  {
    id: 'bricklaying-l3-topic7-39',
    question: "What is 'coring out' in brick repair?",
    options: ["Taking core samples for testing", "Removing the entire brick", "Hollowing out the center of a brick for decorative purposes", "Removing deteriorated material from the face of a brick while leaving the brick in place"],
    correctAnswer: "Removing deteriorated material from the face of a brick while leaving the brick in place",
    explanation: "Coring out in brick repair involves removing deteriorated material from the face of a brick while leaving the brick in place. This conservation technique addresses surface deterioration without requiring complete brick replacement, preserving the structural core and rear portion of the original brick. After coring, the void is filled with a matching brick slip or repair mortar. This approach maintains more original fabric and avoids the disruption of removing entire bricks, which can damage surrounding mortars and bricks."
  },
  {
    id: 'bricklaying-l3-topic7-40',
    question: "What is the 'National Heritage List for England' (NHLE)?",
    options: ["A list of tradespeople qualified to work on heritage projects", "A comprehensive database of England's historic buildings, monuments, and sites that have legal protection", "A directory of conservation materials suppliers", "A publication about historic sites to visit"],
    correctAnswer: "A comprehensive database of England's historic buildings, monuments, and sites that have legal protection",
    explanation: "The National Heritage List for England is a comprehensive database of England's historic buildings, monuments, and sites that have legal protection. Maintained by Historic England, it records all nationally designated heritage assets including listed buildings, scheduled monuments, registered parks and gardens, and protected wrecks. For masonry conservation, the NHLE provides essential information about a building's designated status, grade, and special architectural or historic interest, informing appropriate conservation approaches and legal requirements for consent."
  },
  {
    id: 'bricklaying-l3-topic7-41',
    question: "What are 'listed building consent' and 'scheduled monument consent'?",
    options: ["Tax exemptions for historic buildings", "Special insurance policies", "Legal permissions required before making changes to protected historic structures", "Construction warranties for historic buildings"],
    correctAnswer: "Legal permissions required before making changes to protected historic structures",
    explanation: "Listed building consent and scheduled monument consent are legal permissions required before making changes to protected historic structures. These consents ensure that work to significant heritage assets is appropriate and doesn't damage their special interest. For masonry conservation, obtaining the relevant consent before undertaking repairs or alterations is a legal requirement. Applications typically require detailed specifications of conservation methods, materials, and justification for the proposed approach, demonstrating how the work will preserve or enhance the building's significance."
  },
  {
    id: 'bricklaying-l3-topic7-42',
    question: "What is 'nondestructive testing' in masonry conservation?",
    options: ["Testing that causes minimal damage to buildings", "Testing that doesn't destroy test equipment", "Evaluation methods that don't damage historic fabric", "Testing only visual characteristics"],
    correctAnswer: "Evaluation methods that don't damage historic fabric",
    explanation: "Nondestructive testing in masonry conservation refers to evaluation methods that don't damage historic fabric. These techniques assess condition without removing samples or causing harm, preserving original material. Methods include thermal imaging to detect moisture or voids, ground-penetrating radar to identify internal structures, ultrasonic testing to find cracks, and endoscopic cameras to examine cavities. These approaches provide valuable diagnostic information for conservation decisions while adhering to the principle of minimal intervention by avoiding damage to the historic fabric being investigated."
  },
  {
    id: 'bricklaying-l3-topic7-43',
    question: "What is a 'conservation management plan'?",
    options: ["A financial plan for conservation budgets", "A document that identifies the significance of a historic asset and policies for maintaining its significance", "A schedule for conservator visits to a site", "A plan showing conservation areas in a town"],
    correctAnswer: "A document that identifies the significance of a historic asset and policies for maintaining its significance",
    explanation: "A conservation management plan identifies the significance of a historic asset and policies for maintaining its significance. This comprehensive document analyzes the heritage values of a building or site, assesses its condition, identifies vulnerabilities, and establishes policies and strategies for its long-term conservation. For historic masonry buildings, the plan guides appropriate maintenance regimes, repair approaches, and future interventions to preserve significant fabric and character, providing a framework for consistent decision-making over time."
  },
  {
    id: 'bricklaying-l3-topic7-44',
    question: "What is 'salt extraction' in conservation of masonry?",
    options: ["Mining salt from historic quarries", "Adding salt to mortars for strength", "Processes for removing damaging soluble salts from masonry", "Using salt as a cleaning agent"],
    correctAnswer: "Processes for removing damaging soluble salts from masonry",
    explanation: "Salt extraction involves processes for removing damaging soluble salts from masonry. These techniques address salt contamination that causes efflorescence, spalling, and powdering through crystallization cycles. Methods include poulticing (applying absorbent materials that draw out salts as they dry), sacrificial renders that extract salts over time, controlled washing regimes, and in some cases electro-osmotic treatments. Effective salt management is critical in conservation as salts can cause progressive deterioration of historic masonry if not addressed."
  },
  {
    id: 'bricklaying-l3-topic7-45',
    question: "What is 'pinning' in stone conservation?",
    options: ["Marking stones with pins", "Securing cracked or separated stones with concealed stainless steel or carbon fiber rods", "Using pins to mark areas needing work", "A traditional stone carving technique"],
    correctAnswer: "Securing cracked or separated stones with concealed stainless steel or carbon fiber rods",
    explanation: "Pinning involves securing cracked or separated stones with concealed stainless steel or carbon fiber rods. This minimal intervention technique stabilizes fractured masonry without replacement by inserting rods across the crack or delamination, bonded with compatible grout or resin. The pins provide structural integrity while remaining invisible on the surface. For historic masonry, pinning preserves original material that might otherwise need replacement, maintaining authenticity while addressing structural issues in deteriorated stone elements."
  },
  {
    id: 'bricklaying-l3-topic7-46',
    question: "What is 'erosion' in the context of historic stonework?",
    options: ["Financial devaluation of stone buildings", "The gradual wearing away of the stone surface by weather and pollution", "The process of selecting stone for replacement", "A carving technique to create textured surfaces"],
    correctAnswer: "The gradual wearing away of the stone surface by weather and pollution",
    explanation: "Erosion in historic stonework is the gradual wearing away of the stone surface by weather and pollution. This natural weathering process occurs through rainfall, wind abrasion, freeze-thaw cycles, and chemical reactions with atmospheric pollutants. Conservation approaches to erosion balance acceptance of natural weathering as part of a building's history against intervention when loss threatens structural integrity or significant detail. Treatments may include consolidation, shelter coats, or selective replacement when erosion becomes detrimental to the building's significance or stability."
  },
  {
    id: 'bricklaying-l3-topic7-47',
    question: "What is 'soiling' on historic masonry and how is it different from 'patina'?",
    options: ["Soiling is deliberate while patina is accidental", "Soiling is harmful surface deposits while patina is beneficial aging", "Soiling affects only stone while patina affects only brick", "Soiling is modern while patina is only found on ancient buildings"],
    correctAnswer: "Soiling is harmful surface deposits while patina is beneficial aging",
    explanation: "Soiling consists of harmful surface deposits while patina is beneficial aging. Soiling includes potentially damaging accumulations like black crusts, bird droppings, or pollutant residues that can accelerate deterioration. Patina, conversely, represents benign aging that contributes to historical character. Conservation decisions involve carefully distinguishing between harmful soiling that requires removal and valuable patina worth preserving. Cleaning approaches for soiling removal must be carefully selected to remove detrimental deposits without damaging the underlying masonry or its protective patina."
  },
  {
    id: 'bricklaying-l3-topic7-48',
    question: "What is 'shelter coating' in masonry conservation?",
    options: ["Installing a roof over masonry", "Covering a building with tarpaulins", "Applying a sacrificial lime wash or very thin lime plaster to protect vulnerable masonry", "Building shelters for workers"],
    correctAnswer: "Applying a sacrificial lime wash or very thin lime plaster to protect vulnerable masonry",
    explanation: "Shelter coating involves applying a sacrificial lime wash or very thin lime plaster to protect vulnerable masonry. This traditional conservation technique creates a protective sacrificial layer over stonework or brickwork that has become vulnerable to weathering. The coating shields the historic fabric from direct exposure to rain and pollutants while remaining breathable. Made from lime putty often with small additions of aggregate or additives, shelter coats require periodic renewal as they gradually erode, but this sacrificial nature preserves the underlying historic masonry."
  },
  {
    id: 'bricklaying-l3-topic7-49',
    question: "What does 'quarry rights' refer to in stone conservation?",
    options: ["Legal permissions to open new quarries", "The practice of securing access to original quarry sources for matching stone", "Workers' rights in quarrying industries", "The right side of a quarried stone"],
    correctAnswer: "The practice of securing access to original quarry sources for matching stone",
    explanation: "Quarry rights refers to securing access to original quarry sources for matching stone. For significant historic buildings, arrangements might be made to reopen original quarries or reserve stone from still-active quarries to ensure perfect matching for future repairs. This forward-thinking conservation approach recognizes the importance of material matching and the challenges of finding identical stone once quarries close. For buildings constructed with stone from now-defunct quarries, these rights can be invaluable for ensuring appropriate conservation materials remain available."
  },
  {
    id: 'bricklaying-l3-topic7-50',
    question: "What is 'lime blowing' in traditional mortars and how does it affect conservation?",
    options: ["A technique for applying lime with compressed air", "Expansion and weakening of mortar due to incomplete slaking of lime particles", "Using fans to dry lime mortar quickly", "A finishing technique to texture lime plaster"],
    correctAnswer: "Expansion and weakening of mortar due to incomplete slaking of lime particles",
    explanation: "Lime blowing is expansion and weakening of mortar due to incomplete slaking of lime particles. When quicklime particles remain in mortar without being fully slaked, they can later react with moisture, expanding and creating popouts or weaknesses. In conservation, understanding this phenomenon helps when analyzing historic failure patterns and emphasizes the importance of proper lime slaking and maturation. Conservation mortars must use properly slaked lime and appropriate maturation periods to avoid introducing this defect into repair work."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-conservation-restoration-techniques', 'items', q.id), {
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