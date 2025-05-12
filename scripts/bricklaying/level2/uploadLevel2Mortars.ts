// ✅ COMPLETE: npx ts-node scripts/bricklaying/level2/uploadLevel2Mortars.ts

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

// ✅ Bricklaying Level 2 Mixing & Using Mortars Questions
const questions = [
  {
    id: 'bricklaying-l2-mortars1',
    question: "What are the four main ingredients of traditional mortar?",
    options: ["Cement, sand, lime, and water", "Cement, gravel, lime, and water", "Cement, sand, gypsum, and water", "Cement, crushed brick, lime, and water"],
    correctAnswer: "Cement, sand, lime, and water",
    explanation: "The four main ingredients of traditional mortar are cement, sand, lime, and water. Cement acts as the primary binder, developing strength through hydration. Sand provides bulk, dimensional stability, and texture. Lime improves workability, flexibility, and self-healing properties for minor cracks. Water activates the chemical reactions in cement and lime while providing the necessary consistency for application. The proportions of these ingredients vary depending on the mortar's intended use, with different mix ratios (designations) specified for different applications and exposure conditions."
  },
  {
    id: 'bricklaying-l2-mortars2',
    question: "What does the term 'designation' mean in relation to mortar mixes?",
    options: ["The color of the mortar", "The brand name of pre-mixed mortar", "The specific numeric mixture ratio of cement, lime, and sand", "The intended location where the mortar will be used"],
    correctAnswer: "The specific numeric mixture ratio of cement, lime, and sand",
    explanation: "In mortar mixes, 'designation' refers to the specific numeric mixture ratio of cement, lime, and sand used. In the UK, mortar designations are typically expressed as (i), (ii), (iii), (iv), or (v), where lower numbers indicate stronger mixes with higher cement content. For example, designation (i) might be a 1:¼:3 cement:lime:sand ratio by volume, while designation (v) might be 1:2:9. Each designation has specific strength and durability characteristics suitable for different applications, from highly exposed conditions requiring stronger mixes to internal or sheltered work where more flexible mixes are appropriate."
  },
  {
    id: 'bricklaying-l2-mortars3',
    question: "What mortar designation (mix) would typically be used for chimney stacks above roof level?",
    options: ["Designation (v) - weakest mix", "Designation (iv) - weak mix", "Designation (iii) - medium mix", "Designation (i) - strongest mix"],
    correctAnswer: "Designation (i) - strongest mix",
    explanation: "For chimney stacks above roof level, designation (i) - the strongest mix - would typically be used. Chimney stacks are exposed to severe weather conditions including driving rain, frost, and temperature extremes, as well as potentially corrosive flue gases. These challenging conditions require the highest strength and durability that a designation (i) mix provides. This stronger mix, typically with proportions around 1:¼:3 (cement:lime:sand), has higher cement content providing better resistance to these harsh conditions, though it does sacrifice some flexibility and may be more prone to shrinkage cracking than weaker mixes."
  },
  {
    id: 'bricklaying-l2-mortars4',
    question: "What property does lime add to mortar?",
    options: ["Increased setting speed", "Improved water resistance", "Improved workability and flexibility", "Increased compressive strength"],
    correctAnswer: "Improved workability and flexibility",
    explanation: "Lime adds improved workability and flexibility to mortar. The fine particles of lime act as a lubricant between the coarser sand particles, making the mortar more plastic and easier to spread, improving the bricklayer's efficiency. Lime increases water retention, giving more working time before the mortar stiffens. It also provides flexibility, allowing minor building movement without cracking. Additionally, lime mortars have 'self-healing' properties for small cracks through carbonation. While lime typically reduces early strength compared to cement-only mixes, its benefits for workability and long-term performance make it valuable in most mortar formulations."
  },
  {
    id: 'bricklaying-l2-mortars5',
    question: "What is the recommended maximum time that mixed mortar should be used within?",
    options: ["30 minutes", "2 hours", "4 hours", "8 hours"],
    correctAnswer: "2 hours",
    explanation: "The recommended maximum time that mixed mortar should be used within is generally 2 hours. After mixing, cement begins to hydrate and the mortar gradually stiffens as this chemical reaction progresses. Using mortar after it has begun to set can weaken the bond between mortar and masonry units. In hot weather, this usable period may be even shorter due to accelerated hydration and water evaporation. While some retempering (adding small amounts of water and remixing to restore workability) is acceptable within this timeframe, excessive retempering or using mortar beyond its initial set period significantly reduces the mortar's strength and durability."
  },
  {
    id: 'bricklaying-l2-mortars6',
    question: "What effect does cold weather (below 4°C) have on mortar?",
    options: ["It improves the bond strength", "It prevents the mortar from setting properly", "It reduces the amount of water needed in the mix", "It increases the working time of the mortar"],
    correctAnswer: "It prevents the mortar from setting properly",
    explanation: "Cold weather (below 4°C) prevents mortar from setting properly because the chemical reaction of cement hydration slows dramatically or can even stop if the mortar freezes. If water in the mix freezes before the mortar has gained sufficient strength, the expansion can damage the mortar's internal structure, leading to reduced strength, poor bonding with masonry units, and reduced durability. In cold weather conditions, special precautions are necessary, such as using warm water for mixing, adding approved accelerating admixtures, protecting materials from freezing, and covering or heating newly laid masonry to maintain adequate temperatures for proper curing."
  },
  {
    id: 'bricklaying-l2-mortars7',
    question: "What is the purpose of 'pointing' in brickwork?",
    options: ["Indicating where bricks should be placed", "Finishing the mortar joints to improve appearance and weather resistance", "Marking the position of wall ties", "Creating holes for ventilation"],
    correctAnswer: "Finishing the mortar joints to improve appearance and weather resistance",
    explanation: "Pointing refers to finishing the mortar joints to improve appearance and weather resistance. This process involves filling or finishing the face of mortar joints between masonry units, either as part of the laying process or as a separate operation after construction. Properly executed pointing creates mortar joints that shed water effectively, resist weather penetration, and enhance the visual appearance of the brickwork. Various pointing profiles (such as bucket handle, weather struck, or recessed) serve different functional and aesthetic purposes, with some being more suitable than others for exposed or severe weather conditions."
  },
  {
    id: 'bricklaying-l2-mortars8',
    question: "Why is it important to use the correct sand type in mortar?",
    options: ["Only to achieve the desired color", "Only to reduce costs", "It affects workability, strength, and durability of the mortar", "Only to meet local building code requirements"],
    correctAnswer: "It affects workability, strength, and durability of the mortar",
    explanation: "Using the correct sand type in mortar is important because it affects workability, strength, and durability of the mortar. The sand's particle size distribution (grading) significantly impacts how the mortar handles during application and its final properties. Building sand (soft sand) with rounded particles improves workability but may reduce strength, while sharp sand with angular particles increases strength but reduces workability. The appropriate type depends on the specific application, exposure conditions, and required properties. Sand should also be clean and free from contaminants like clay, salt, or organic matter that could weaken the mortar or cause defects."
  },
  {
    id: 'bricklaying-l2-mortars9',
    question: "What is the function of a plasticizer when added to mortar?",
    options: ["To make the mortar waterproof", "To improve workability while reducing water content", "To increase the setting time", "To prevent frost damage"],
    correctAnswer: "To improve workability while reducing water content",
    explanation: "The function of a plasticizer when added to mortar is to improve workability while reducing water content. These chemical admixtures work by reducing the surface tension of water and dispersing cement particles more effectively, allowing the same level of workability with less water. This is beneficial because excess water in mortar weakens it and increases shrinkage as it dries. Plasticizers enable bricklayers to work with a more cohesive, butter-like mortar that spreads easily without compromising strength, adhesion, or durability. They are particularly valuable in cold weather when workability can be more difficult to achieve."
  },
  {
    id: 'bricklaying-l2-mortars10',
    question: "What should you do if mortar begins to stiffen in the spot board during use?",
    options: ["Immediately dispose of it and mix a new batch", "Add a large amount of water to make it workable again", "Briefly remix it, adding minimal water if absolutely necessary", "Add more cement to speed up the setting process"],
    correctAnswer: "Briefly remix it, adding minimal water if absolutely necessary",
    explanation: "If mortar begins to stiffen on the spot board during use, you should briefly remix it, adding minimal water if absolutely necessary. This process, called retempering, can restore workability for a limited period. However, excessive or repeated retempering should be avoided as it can significantly reduce the mortar's strength and durability. Any retempering should be done within the mortar's recommended usable time (typically 2 hours after initial mixing). If the mortar has started to set or has been sitting for too long, it should be discarded and a fresh batch mixed to ensure proper performance."
  },
  {
    id: 'bricklaying-l2-mortars11',
    question: "What is the purpose of 'striking' mortar joints in brickwork?",
    options: ["To remove excess mortar from the face of the wall", "To compact the mortar and shape the joint profile for improved appearance and weather resistance", "To check the alignment of the bricks", "To mark joints that need to be repointed"],
    correctAnswer: "To compact the mortar and shape the joint profile for improved appearance and weather resistance",
    explanation: "Striking mortar joints serves to compact the mortar and shape the joint profile for improved appearance and weather resistance. This process involves using a jointing tool (such as a jointer or pointing trowel) to compress and shape the partially set mortar in the joint. Proper striking increases the mortar's density and improves its bond with the masonry units, while also creating a profile that sheds water effectively. Different joint profiles (like bucket handle, weather struck, or flush) offer varying degrees of weather resistance and aesthetic effects, with some being more appropriate than others for specific exposure conditions."
  },
  {
    id: 'bricklaying-l2-mortars12',
    question: "What would be the most suitable mortar mix for internal, non-loadbearing walls?",
    options: ["Designation (i) - strongest mix", "Designation (ii) - strong mix", "Designation (iv) or (v) - weaker mix", "Pure cement mortar with no lime"],
    correctAnswer: "Designation (iv) or (v) - weaker mix",
    explanation: "For internal, non-loadbearing walls, designation (iv) or (v) - weaker mixes - would be most suitable. These mixes typically have higher proportions of lime and/or sand relative to cement (e.g., 1:2:8 or 1:2:9 cement:lime:sand). Internal walls are not exposed to weather and typically bear minimal loads, so the high strength of cement-rich mixes is unnecessary. Weaker mixes offer better workability for the bricklayer and increased flexibility, allowing the wall to accommodate minor structural movements without cracking. These lime-rich mixes are also more breathable, which can be beneficial for managing internal humidity."
  },
  {
    id: 'bricklaying-l2-mortars13',
    question: "What is the correct procedure for mixing mortar by hand?",
    options: ["Add water to cement, then add sand", "Mix all dry ingredients first, then gradually add water while mixing", "Add water to sand, then add cement", "Layer sand, cement, and lime, then add water without mixing dry ingredients first"],
    correctAnswer: "Mix all dry ingredients first, then gradually add water while mixing",
    explanation: "The correct procedure for mixing mortar by hand is to mix all dry ingredients first, then gradually add water while mixing. Start by measuring the required amounts of sand, cement, and lime (if used) and mix them thoroughly until a uniform color is achieved with no streaks. This ensures even distribution of the binders throughout the mix. Then create a depression in the center of the dry mix and gradually add water while mixing from the edges inward. Adding water gradually allows better control of the mortar's consistency, preventing it from becoming too wet, which would weaken the mortar."
  },
  {
    id: 'bricklaying-l2-mortars14',
    question: "What is the main purpose of using hydrated lime in mortar rather than just cement and sand?",
    options: ["To speed up the setting time", "To improve workability and flexibility", "To strengthen the mix", "To reduce costs"],
    correctAnswer: "To improve workability and flexibility",
    explanation: "The main purpose of using hydrated lime in mortar rather than just cement and sand is to improve workability and flexibility. Lime acts as a plasticizer, making the mortar more cohesive and easier to spread, improving the bricklayer's efficiency. It increases water retention, giving more time for proper brick placement and adjustment. Lime also provides flexibility, allowing the mortar to accommodate minor building movements without cracking, and has self-healing properties for small cracks. While pure cement-sand mortars (without lime) are stronger, they are typically more brittle, less workable, and more prone to shrinkage cracking than cement-lime-sand mortars."
  },
  {
    id: 'bricklaying-l2-mortars15',
    question: "What is the recommended mortar joint thickness for standard UK brickwork?",
    options: ["5mm", "10mm", "15mm", "20mm"],
    correctAnswer: "10mm",
    explanation: "The recommended mortar joint thickness for standard UK brickwork is 10mm. This standard dimension is integral to the coordinating sizing system used in UK construction, where a standard brick's work size is 215mm × 102.5mm × 65mm and its coordinating size (including the mortar joint) is 225mm × 112.5mm × 75mm. The 10mm joint provides optimal structural performance and appearance while allowing for minor variations in brick dimensions. Significantly thicker joints can reduce wall strength and durability, while thinner joints may be difficult to fill properly and may not adequately accommodate variations in brick sizes."
  },
  {
    id: 'bricklaying-l2-mortars16',
    question: "How does the water content affect mortar strength?",
    options: ["Water content has no effect on mortar strength", "Higher water content increases mortar strength", "Lower water content increases mortar strength", "Water content only affects setting time, not strength"],
    correctAnswer: "Lower water content increases mortar strength",
    explanation: "Lower water content increases mortar strength. While sufficient water is necessary for complete cement hydration, excess water beyond that required for the chemical reaction creates voids in the mortar as it evaporates, resulting in a more porous, weaker material. The water-to-cement ratio is a critical factor in determining mortar strength - the lower this ratio (while still maintaining workability), the stronger the resulting mortar. This is why plasticizers, which allow for good workability with less water, are beneficial for mortar strength. However, insufficient water prevents proper cement hydration and bonding, also reducing strength."
  },
  {
    id: 'bricklaying-l2-mortars17',
    question: "What would be the most suitable mortar mix for brickwork below the damp-proof course (DPC)?",
    options: ["Designation (i) - strongest mix", "Designation (iii) - medium mix", "Designation (v) - weakest mix", "Any mix is suitable below DPC"],
    correctAnswer: "Designation (i) - strongest mix",
    explanation: "For brickwork below the damp-proof course (DPC), designation (i) - the strongest mix - would be most suitable. This area is subject to ground moisture, potential frost action, and higher compressive loads from the structure above. A stronger mix, typically with proportions around 1:¼:3 (cement:lime:sand), provides the necessary strength and durability to withstand these challenging conditions. The higher cement content creates a denser, less permeable mortar with greater resistance to moisture and frost damage. In some cases, sulfate-resisting cement may also be specified if the soil contains sulfates that could attack standard cement."
  },
  {
    id: 'bricklaying-l2-mortars18',
    question: "What weather conditions are most problematic when laying mortared brickwork?",
    options: ["Mild, dry conditions", "Hot, dry, windy conditions", "Light rainfall", "Overcast conditions"],
    correctAnswer: "Hot, dry, windy conditions",
    explanation: "Hot, dry, windy conditions are most problematic when laying mortared brickwork. These conditions cause rapid evaporation of water from the mortar, which can lead to rapid stiffening, poor workability, insufficient hydration of the cement, and ultimately weak bond strength. The mortar may dry before proper chemical curing can occur, resulting in reduced durability and poor adhesion to the bricks. In such conditions, special precautions should be taken, such as dampening the bricks to reduce water absorption, using water-retaining admixtures, covering materials to prevent evaporation, and potentially adjusting the mortar mix or working in shaded areas."
  },
  {
    id: 'bricklaying-l2-mortars19',
    question: "How should you protect newly laid brickwork from rain?",
    options: ["No protection is necessary", "Cover only the top of the wall", "Cover the tops and exposed faces of walls with waterproof sheets", "Apply a waterproof coating immediately"],
    correctAnswer: "Cover the tops and exposed faces of walls with waterproof sheets",
    explanation: "To protect newly laid brickwork from rain, you should cover the tops and exposed faces of walls with waterproof sheets. This protects fresh mortar from being washed out before it has adequately set, which would weaken the wall structure. The protective coverings should extend over the wall top and down the faces, secured against wind but allowing for ventilation to prevent condensation. Special attention should be paid to ensuring water cannot penetrate behind the sheeting and run down within the masonry. This protection is particularly critical in the first 24-48 hours after laying when the mortar is most vulnerable to water damage."
  },
  {
    id: 'bricklaying-l2-mortars20',
    question: "What is efflorescence in relation to mortar and brickwork?",
    options: ["The growth of moss on old mortar joints", "A specific technique for finishing mortar joints", "White salt deposits that appear on masonry surfaces", "The natural darkening of mortar as it ages"],
    correctAnswer: "White salt deposits that appear on masonry surfaces",
    explanation: "Efflorescence refers to white salt deposits that appear on masonry surfaces. It occurs when water dissolves soluble salts present in the bricks, blocks, mortar, or adjacent materials, then migrates to the surface where the water evaporates, leaving behind the crystallized salts. While primarily an aesthetic issue rather than structural, efflorescence indicates moisture movement through the wall. It can often be removed by dry brushing once the brickwork has dried out. To minimize efflorescence, use bricks with low soluble salt content, protect materials from moisture before use, ensure proper drainage, and follow good construction practices to limit water penetration."
  },
  {
    id: 'bricklaying-l2-mortars21',
    question: "What is the purpose of 'gauging' lime mortar with cement?",
    options: ["To create a decorative effect", "To measure the exact amount of materials", "To increase setting time and improve workability", "To increase strength and reduce setting time"],
    correctAnswer: "To increase strength and reduce setting time",
    explanation: "The purpose of 'gauging' lime mortar with cement is to increase strength and reduce setting time. Traditional lime mortars (without cement) set very slowly through carbonation as calcium hydroxide reacts with carbon dioxide from the air. By adding Portland cement to lime mortar (creating a 'gauged' mix), the strength development is accelerated through cement hydration, which occurs more quickly than carbonation. This produces a mortar with some of the workability and flexibility benefits of lime, but with faster setting times and higher early strength. Gauged mixes are commonly used in modern construction and for repairs where pure lime mortar would set too slowly."
  },
  {
    id: 'bricklaying-l2-mortars22',
    question: "What would cause mortar to crack and crumble prematurely?",
    options: ["Too much lime in the mix", "Too much cement in the mix", "Excessive water in the mix or improper curing", "Using fine sand instead of coarse sand"],
    correctAnswer: "Excessive water in the mix or improper curing",
    explanation: "Mortar can crack and crumble prematurely due to excessive water in the mix or improper curing. Too much water weakens mortar by increasing porosity as the excess water evaporates, leaving voids. This results in lower strength and durability. Improper curing, particularly allowing the mortar to dry too quickly without adequate hydration of the cement, prevents proper strength development. Other contributing factors can include freezing before the mortar has adequately set, use of contaminated materials, incorrect mix proportions, or excessive retempering. All these factors can lead to a weakened mortar structure that is prone to early deterioration."
  },
  {
    id: 'bricklaying-l2-mortars23',
    question: "Why would you use a 'bucket handle' joint finish in brickwork?",
    options: ["Only to create a decorative effect", "To increase the wall's load-bearing capacity", "To achieve good weather resistance and a neat appearance", "To allow for easier repointing in the future"],
    correctAnswer: "To achieve good weather resistance and a neat appearance",
    explanation: "A 'bucket handle' (or 'curved recessed') joint finish is used to achieve good weather resistance and a neat appearance. This type of joint is created by compacting and smoothing the mortar with a curved jointer tool, producing a concave profile. The compaction increases the density of the mortar, improving its durability, while the curved shape effectively sheds water away from the joint, reducing water penetration. The smooth, curved finish also creates distinct shadow lines that enhance the brickwork's appearance. This joint type provides an excellent balance between weather performance and aesthetics, making it one of the most commonly used joint profiles in exposed brickwork."
  },
  {
    id: 'bricklaying-l2-mortars24',
    question: "What is meant by the term 'fat mortar'?",
    options: ["Mortar with a high cement content", "Mortar with a high lime content", "Mortar with excessive water content", "Mortar that has been mixed with oil"],
    correctAnswer: "Mortar with a high lime content",
    explanation: "The term 'fat mortar' refers to mortar with a high lime content. The increased proportion of lime gives the mortar a rich, creamy, and highly workable consistency that bricklayers often describe as 'buttery' or 'fat.' This type of mortar spreads easily, adheres well to bricks, and allows for easy adjustment of units after placement. Fat mortars are typically more flexible and accommodating of building movement than cement-rich mixes. While they generally have lower compressive strength than 'leaner' (higher cement) mortars, their improved workability and flexibility make them preferred for many applications, particularly where the highest strength is not required."
  },
  {
    id: 'bricklaying-l2-mortars25',
    question: "What is the correct approach to mixing colored mortar?",
    options: ["Add food coloring to the water before mixing", "Add paint to the final mix", "Use pigments specifically designed for mortar and mix thoroughly with dry ingredients", "Colored mortar cannot be mixed on site, only factory-produced colored mortar should be used"],
    correctAnswer: "Use pigments specifically designed for mortar and mix thoroughly with dry ingredients",
    explanation: "The correct approach to mixing colored mortar is to use pigments specifically designed for mortar and mix them thoroughly with the dry ingredients before adding water. These specially formulated pigments are typically metal oxides that are colorfast, alkali-resistant, and won't degrade the mortar's performance. The pigment should be measured precisely as a percentage of the cement weight to ensure color consistency. Thorough mixing of the pigment with the dry cement, lime, and sand before adding water is essential to achieve uniform color without streaks. Once water is added, continued mixing ensures even distribution of the pigment throughout the wet mortar."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l2-mortars', 'items', q.id), {
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
