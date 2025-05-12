// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Materials.ts

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

// ✅ Bricklaying Level 2 Materials Science & Properties Questions
const questions = [
  {
    id: 'bricklaying-l2-materials1',
    question: "What is the main difference between clay bricks and calcium silicate bricks?",
    options: ["Clay bricks are always red, calcium silicate bricks are always white", "Clay bricks are made from fired clay, calcium silicate bricks from sand and lime", "Clay bricks are only used outdoors, calcium silicate indoors", "Clay bricks are stronger than calcium silicate bricks"],
    correctAnswer: "Clay bricks are made from fired clay, calcium silicate bricks from sand and lime",
    explanation: "The main difference between clay bricks and calcium silicate bricks is their composition and manufacturing process. Clay bricks are made from clay that is molded and fired in kilns at high temperatures (typically 1000-1200°C). Calcium silicate bricks are manufactured from a mixture of sand (approximately 90%) and lime (approximately 10%) that is pressed and cured using steam under pressure, not fired. These different compositions give the bricks distinct properties, with clay bricks generally having better resistance to frost and harsh weather conditions."
  },
  {
    id: 'bricklaying-l2-materials2',
    question: "What property of brick is being tested when it is measured for water absorption?",
    options: ["Compressive strength", "Porosity", "Thermal conductivity", "Density"],
    correctAnswer: "Porosity",
    explanation: "When a brick is tested for water absorption, its porosity is being measured. Porosity refers to the volume of pores (empty spaces) within the material. Higher water absorption indicates greater porosity. This property is important because it affects several performance characteristics including frost resistance (more porous bricks can be more susceptible to frost damage), the bond with mortar, thermal insulation properties, and the tendency to develop efflorescence. Water absorption testing typically involves drying, weighing, soaking, and reweighing bricks to calculate the percentage of water absorbed."
  },
  {
    id: 'bricklaying-l2-materials3',
    question: "What causes the various colors in clay bricks?",
    options: ["Only artificial dyes added during manufacturing", "Only the temperature at which they are fired", "The mineral content of the clay and the firing conditions", "Only the age of the clay used"],
    correctAnswer: "The mineral content of the clay and the firing conditions",
    explanation: "The various colors in clay bricks are caused by the mineral content of the clay and the firing conditions. Iron compounds in the clay are particularly influential - when fully oxidized they produce red or brown colors, while reduced iron compounds create blue, grey, or black hues. Other minerals like calcium can produce cream or buff colors. The kiln atmosphere (oxidizing or reducing), firing temperature, and duration also significantly affect the final color. While some manufacturers may add pigments to achieve specific colors, the natural variation in clay brick colors primarily comes from these natural factors."
  },
  {
    id: 'bricklaying-l2-materials4',
    question: "What is the standard coordinating size of a brick in the UK?",
    options: ["215mm × 102.5mm × 65mm", "225mm × 112.5mm × 75mm", "200mm × 100mm × 60mm", "250mm × 125mm × 75mm"],
    correctAnswer: "225mm × 112.5mm × 75mm",
    explanation: "The standard coordinating size of a brick in the UK is 225mm × 112.5mm × 75mm. This is the modular size used for planning purposes and includes allowance for a 10mm mortar joint. The actual work size of the brick (the physical dimensions of the brick itself) is typically 215mm × 102.5mm × 65mm, which allows for the standard 10mm mortar joints between bricks. This standardization helps with setting out and ensures compatibility between different manufacturers' products."
  },
  {
    id: 'bricklaying-l2-materials5',
    question: "What is efflorescence in brickwork?",
    options: ["A type of lichen that grows on bricks", "A white powdery deposit caused by soluble salts", "The process of bricks weathering over time", "A special finish applied to decorative bricks"],
    correctAnswer: "A white powdery deposit caused by soluble salts",
    explanation: "Efflorescence is a white powdery deposit caused by soluble salts that migrate to the surface of brickwork. It occurs when water moves through the masonry, dissolving salts present in the bricks, mortar, or adjacent materials. When the water evaporates at the surface, it leaves these salts behind as a crystalline deposit. Though generally considered a cosmetic issue rather than structural, efflorescence indicates moisture movement through the wall. It can often be removed by dry brushing once the brickwork has dried, but addressing the source of moisture is important to prevent recurrence."
  },
  {
    id: 'bricklaying-l2-materials6',
    question: "What is the primary component of Portland cement?",
    options: ["Sand", "Calcium silicates", "Water", "Clay"],
    correctAnswer: "Calcium silicates",
    explanation: "The primary components of Portland cement are calcium silicates, specifically tricalcium silicate (C₃S) and dicalcium silicate (C₂S). Portland cement is made by heating limestone (calcium carbonate) with clay (containing silica, alumina, and iron) in a kiln to form clinker, which is then ground with a small amount of gypsum to create the finished cement. When mixed with water, these calcium silicates undergo hydration reactions to form calcium silicate hydrate gel, which is responsible for the strength and binding properties of cement-based products including mortar and concrete."
  },
  {
    id: 'bricklaying-l2-materials7',
    question: "What is the difference between Class A and Class B engineering bricks?",
    options: ["Class A are red, Class B are blue", "Class A bricks have higher compressive strength and lower water absorption than Class B", "Class A are machine-made, Class B are handmade", "Class A are solid, Class B have perforations"],
    correctAnswer: "Class A bricks have higher compressive strength and lower water absorption than Class B",
    explanation: "The difference between Class A and Class B engineering bricks is in their performance specifications. Class A engineering bricks must have a minimum compressive strength of 125 N/mm² and maximum water absorption of 4.5%. Class B engineering bricks have lower requirements: minimum compressive strength of 75 N/mm² and maximum water absorption of 7%. Both types are dense, strong bricks used where high strength or low water absorption is required, such as damp-proof courses, manholes, retaining walls, or foundations. The color (red or blue) is not specified by the classification."
  },
  {
    id: 'bricklaying-l2-materials8',
    question: "What does the term 'flash point' refer to when discussing building materials?",
    options: ["The temperature at which a material begins to melt", "The point at which a material becomes dangerously radioactive", "The lowest temperature at which vapors of a volatile material will ignite", "The point at which a material changes color when exposed to light"],
    correctAnswer: "The lowest temperature at which vapors of a volatile material will ignite",
    explanation: "Flash point refers to the lowest temperature at which vapors of a volatile material will ignite when exposed to an ignition source. This property is particularly important for flammable liquids used in construction, such as solvents, adhesives, and certain coatings. Materials with lower flash points present greater fire hazards during storage and use. Safety measures, including proper storage, ventilation, and avoiding ignition sources, should be implemented when working with low flash point materials. For bricklayers, this might be relevant when using certain cleaning agents, sealants, or additives."
  },
  {
    id: 'bricklaying-l2-materials9',
    question: "What is the purpose of adding hydrated lime to mortar?",
    options: ["To make the mortar set faster", "To improve workability and water retention", "To reduce the cost of the mortar", "To increase the compressive strength"],
    correctAnswer: "To improve workability and water retention",
    explanation: "Hydrated lime is added to mortar to improve workability and water retention. These properties make the mortar more plastic and easier to spread, improving the bricklayer's efficiency and the quality of the work. The increased water retention helps prevent the mortar from drying out too quickly, giving more time for proper brick placement and adjustment. Additionally, lime increases the mortar's flexibility and self-healing capabilities for small cracks, enhances bond strength with the masonry units, and improves freeze-thaw durability. However, lime typically reduces the early strength of the mortar compared to cement-only mixes."
  },
  {
    id: 'bricklaying-l2-materials10',
    question: "What is the primary advantage of using lightweight concrete blocks in construction?",
    options: ["They are less expensive than standard blocks", "They provide better thermal insulation and reduce structural loading", "They are more water-resistant", "They have higher compressive strength"],
    correctAnswer: "They provide better thermal insulation and reduce structural loading",
    explanation: "The primary advantage of lightweight concrete blocks is that they provide better thermal insulation and reduce structural loading. These blocks are manufactured using lightweight aggregates (such as expanded clay, pumice, or industrial by-products) or by introducing air into the concrete mix. The resulting lower density improves thermal performance by reducing heat transfer through the wall, contributing to better energy efficiency. The reduced weight also decreases the dead load on the structure and foundations, potentially allowing for more economical structural designs and easier handling during construction."
  },
  {
    id: 'bricklaying-l2-materials11',
    question: "What is the significance of the 'designation' of mortar (e.g., designation (i), (ii), (iii), etc.)?",
    options: ["It indicates the color of the mortar", "It indicates the mixing ratio of the ingredients", "It indicates the manufacturer of the mortar", "It indicates the price category of the mortar"],
    correctAnswer: "It indicates the mixing ratio of the ingredients",
    explanation: "The designation of mortar indicates the mixing ratio of the ingredients (cement:lime:sand). In the UK, mortar designations range from (i) to (v), with lower numbers indicating higher cement content and therefore stronger mixes. For example, designation (i) might be 1:0-¼:3 (cement:lime:sand), while designation (v) might be 1:2:8-9. Stronger mixes are used where higher strength is required (e.g., below DPC or for engineering applications), while weaker, more flexible mixes are often preferred for normal brickwork. The appropriate designation depends on the specific application and exposure conditions."
  },
  {
    id: 'bricklaying-l2-materials12',
    question: "What property of building materials does the 'U-value' measure?",
    options: ["Ultraviolet resistance", "Compressive strength", "Rate of heat transfer (thermal transmittance)", "Sound insulation"],
    correctAnswer: "Rate of heat transfer (thermal transmittance)",
    explanation: "The U-value measures the rate of heat transfer (thermal transmittance) through a building element such as a wall, floor, or roof. It is expressed in watts per square meter per degree Kelvin (W/m²K) and indicates how well the element conducts heat - lower U-values indicate better thermal insulation properties. For bricklayers, understanding U-values is important when constructing walls to meet energy efficiency requirements. The overall U-value of a wall depends on all materials used in the construction, including bricks, blocks, insulation, and any finishes."
  },
  {
    id: 'bricklaying-l2-materials13',
    question: "What is 'sharp sand' and what is it used for in construction?",
    options: ["Sand with jagged edges, used primarily for decorative finishes", "Sand with sharp edges that can cut skin, requiring special handling", "Coarse, angular sand with minimal fine particles, used in concrete and some mortars", "Very fine sand used for jointing paving"],
    correctAnswer: "Coarse, angular sand with minimal fine particles, used in concrete and some mortars",
    explanation: "Sharp sand (also called concrete sand or grit sand) is coarse, angular sand with minimal fine particles. The angular particles create mechanical interlocking that contributes to strength when used in mixes. It is primarily used in concrete production and sometimes in mortars where higher strength is required. The coarser texture provides less workability than finer sands but creates stronger bonds. For standard bricklaying mortar, a mixture of sharp sand and softer building sand is often used to balance workability and strength, with the exact ratio depending on the specific application requirements."
  },
  {
    id: 'bricklaying-l2-materials14',
    question: "What is the difference between an aggregate and a binder in construction materials?",
    options: ["Aggregates are expensive, binders are cheap", "Aggregates provide bulk and structure, binders hold the components together", "Aggregates are always stone, binders are always metal", "Aggregates are used outdoors, binders are used indoors"],
    correctAnswer: "Aggregates provide bulk and structure, binders hold the components together",
    explanation: "The difference between aggregates and binders is their function in construction materials. Aggregates (such as sand, gravel, and crushed stone) provide bulk, structure, and dimensional stability, making up the majority of the volume in materials like concrete and mortar. Binders (such as cement, lime, and gypsum) are the active ingredients that chemically react to form a paste that hardens over time, binding the aggregates together into a cohesive mass. In mortar for brickwork, sand is the aggregate while cement and/or lime serve as the binder."
  },
  {
    id: 'bricklaying-l2-materials15',
    question: "What is meant by the term 'frost susceptibility' in relation to building materials?",
    options: ["The ability of a material to withstand cold temperatures", "The tendency of a material to become slippery in frosty conditions", "The likelihood of a material suffering damage due to freeze-thaw cycles", "The rate at which a material conducts cold temperature"],
    correctAnswer: "The likelihood of a material suffering damage due to freeze-thaw cycles",
    explanation: "Frost susceptibility refers to the likelihood of a material suffering damage due to freeze-thaw cycles. When water within porous materials freezes, it expands by approximately 9% in volume, creating internal pressures that can crack or spall the material if it cannot accommodate this expansion. Materials with high water absorption and certain pore structures are particularly susceptible to this damage. For bricks, those with high porosity but with pores that are either very fine or disconnected tend to be more frost resistant. The frost resistance of masonry materials is especially important for external walls in cold climates."
  },
  {
    id: 'bricklaying-l2-materials16',
    question: "What is the primary ingredient in gypsum plaster?",
    options: ["Portland cement", "Lime", "Calcium sulfate hemihydrate", "Silica sand"],
    correctAnswer: "Calcium sulfate hemihydrate",
    explanation: "The primary ingredient in gypsum plaster is calcium sulfate hemihydrate (CaSO₄·½H₂O), commonly known as plaster of Paris. It is produced by heating gypsum (calcium sulfate dihydrate, CaSO₄·2H₂O) to drive off some of the chemically bound water. When water is added back to gypsum plaster, it rehydrates to form gypsum again, creating a solid matrix as it sets. For bricklayers, understanding the properties of gypsum plaster is relevant when working alongside plasterers or when considering how various wall construction materials will interact with subsequent internal finishes."
  },
  {
    id: 'bricklaying-l2-materials17',
    question: "What is meant by the 'initial setting time' of cement?",
    options: ["The total time required for cement to fully harden", "The time when concrete becomes too stiff to be properly placed and compacted", "The time when cement is manufactured", "The time when cement is delivered to the construction site"],
    correctAnswer: "The time when concrete becomes too stiff to be properly placed and compacted",
    explanation: "The initial setting time of cement refers to the point at which the cement paste changes from a fluid state to a plastic state and becomes too stiff to be properly placed and compacted. This is an important property because it indicates how long workers have to mix, transport, place, and finish cement-based products like mortar before they become unworkable. The initial setting time for ordinary Portland cement is typically 45-60 minutes under normal conditions, though this can vary with temperature, humidity, and the presence of additives. Final setting, when the cement has hardened significantly, occurs later."
  },
  {
    id: 'bricklaying-l2-materials18',
    question: "What does the term 'hygroscopic' mean when applied to building materials?",
    options: ["The material repels water", "The material is easily cleaned", "The material attracts and holds water molecules from the surrounding environment", "The material has antibacterial properties"],
    correctAnswer: "The material attracts and holds water molecules from the surrounding environment",
    explanation: "When a material is described as hygroscopic, it means it attracts and holds water molecules from the surrounding environment, particularly from humid air. This property affects how the material behaves in different humidity conditions and its susceptibility to moisture-related problems. For bricklaying, understanding the hygroscopic properties of materials is important because excessive moisture absorption can lead to issues like dimensional changes, reduced strength, increased thermal conductivity, and susceptibility to frost damage or biological growth. Materials like wood, gypsum, and certain salts are notably hygroscopic."
  },
  {
    id: 'bricklaying-l2-materials19',
    question: "What is the primary advantage of using air-entrained mortar?",
    options: ["Increased compressive strength", "Improved workability and freeze-thaw resistance", "Faster setting time", "Lower material cost"],
    correctAnswer: "Improved workability and freeze-thaw resistance",
    explanation: "The primary advantage of using air-entrained mortar is improved workability and freeze-thaw resistance. Air-entraining admixtures create billions of microscopic air bubbles in the mortar, which act as stress relievers during freezing conditions by providing space for water to expand into as it freezes. This significantly improves durability in freeze-thaw cycles. Additionally, the air bubbles improve workability by acting like tiny ball bearings between the sand particles, making the mortar more plastic and easier to spread. However, air entrainment typically reduces the mortar's compressive strength slightly."
  },
  {
    id: 'bricklaying-l2-materials20',
    question: "What is the difference between fired clay bricks and unfired clay bricks?",
    options: ["Fired bricks are always red, unfired bricks are always brown", "Fired bricks are solid, unfired bricks are perforated", "Fired bricks have undergone a heat treatment process, making them more durable and water-resistant", "Fired bricks are used for decorative purposes, unfired for structural purposes"],
    correctAnswer: "Fired bricks have undergone a heat treatment process, making them more durable and water-resistant",
    explanation: "The key difference between fired and unfired clay bricks is that fired bricks have undergone a heat treatment process (typically at 1000-1200°C), making them more durable and water-resistant. This firing process causes permanent chemical and physical changes in the clay, transforming it into a ceramic material that will not revert to clay when wet. Unfired clay bricks (also called adobe, cob, or mud bricks) are air-dried and remain vulnerable to water damage and erosion. While traditional in many parts of the world and valued for their low environmental impact, unfired clay bricks are generally only suitable for specific applications in dry climates or protected internal walls."
  },
  {
    id: 'bricklaying-l2-materials21',
    question: "What is the purpose of a plasticizer in mortar mix?",
    options: ["To make the mortar waterproof", "To speed up the setting time", "To improve workability while reducing water content", "To increase the compressive strength"],
    correctAnswer: "To improve workability while reducing water content",
    explanation: "The purpose of a plasticizer in mortar mix is to improve workability while reducing water content. These chemical admixtures work by reducing the surface tension of water and dispersing cement particles more effectively, allowing the same level of workability with less water. This is beneficial because excess water in mortar weakens it and increases shrinkage as it dries. Plasticizers (sometimes called water reducers) enable bricklayers to work with a more cohesive, butter-like mortar that spreads easily without compromising strength, adhesion, or durability. They are particularly valuable in cold weather when workability can be an issue."
  },
  {
    id: 'bricklaying-l2-materials22',
    question: "What property of bricks is being tested with the 'saturation coefficient'?",
    options: ["Compressive strength", "Color consistency", "Freeze-thaw durability", "Fire resistance"],
    correctAnswer: "Freeze-thaw durability",
    explanation: "The saturation coefficient, also known as the C/B ratio, tests a brick's freeze-thaw durability by measuring its pore structure characteristics. The test compares water absorption under two conditions: cold water immersion for 24 hours (C value) versus 5-hour boiling water immersion (B value). The ratio C/B indicates how much of the brick's total potential pore space fills under normal conditions. Bricks with lower saturation coefficients (typically under 0.78) tend to have better freeze-thaw resistance because they have more available pore space to accommodate expanding ice, reducing the likelihood of damage during freeze-thaw cycles."
  },
  {
    id: 'bricklaying-l2-materials23',
    question: "What is the primary benefit of using natural hydraulic lime (NHL) in mortar instead of ordinary Portland cement?",
    options: ["NHL mortars are always stronger", "NHL sets much faster than cement", "NHL allows better moisture movement and accommodation of building movement", "NHL is more water-resistant than cement"],
    correctAnswer: "NHL allows better moisture movement and accommodation of building movement",
    explanation: "The primary benefit of using natural hydraulic lime (NHL) in mortar instead of ordinary Portland cement is that NHL allows better moisture movement and accommodation of building movement. NHL mortars are more permeable, allowing walls to 'breathe' by facilitating the movement of water vapor through the masonry, which helps prevent trapped moisture issues. They are also more flexible and can accommodate minor structural movements without cracking. These properties make NHL particularly suitable for historic building restoration and traditional constructions. However, NHL mortars typically develop strength more slowly than cement mortars and may have lower ultimate compressive strength."
  },
  {
    id: 'bricklaying-l2-materials24',
    question: "What does the compressive strength of a brick or block indicate?",
    options: ["How well it resists compression perpendicular to the bed face", "How quickly it absorbs water", "How much it will expand when wet", "How well it conducts heat"],
    correctAnswer: "How well it resists compression perpendicular to the bed face",
    explanation: "The compressive strength of a brick or block indicates how well it resists compression perpendicular to the bed face (the face on which it is typically laid). It is measured in Newtons per square millimeter (N/mm²) or Megapascals (MPa) and represents the maximum load the unit can bear before failing when pressure is applied to the bed faces. This property is crucial for load-bearing applications and typically ranges from 5-10 N/mm² for common facing bricks to over 100 N/mm² for engineering bricks. The required compressive strength depends on the specific application and loading conditions."
  },
  {
    id: 'bricklaying-l2-materials25',
    question: "What is an 'accelerator' when added to mortar or concrete?",
    options: ["A component that increases the material's final strength", "A substance that speeds up the setting or curing time", "An additive that makes the mix more workable", "A compound that prevents water penetration"],
    correctAnswer: "A substance that speeds up the setting or curing time",
    explanation: "An accelerator is a substance that speeds up the setting or curing time of mortar or concrete. These admixtures are particularly useful in cold weather conditions when normal setting times would be significantly extended, or when rapid strength development is required for practical or scheduling reasons. Common accelerators include calcium chloride (though its use is restricted in some applications due to corrosion concerns), calcium nitrate, and various proprietary formulations. When using accelerators, careful attention must be paid to the manufacturer's instructions, as improper use can adversely affect workability, durability, or other properties of the hardened material."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-materials', 'items', q.id), {
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
