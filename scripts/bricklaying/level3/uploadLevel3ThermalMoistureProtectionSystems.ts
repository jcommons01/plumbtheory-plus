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

// ✅ Bricklaying Level 3 Thermal & Moisture Protection Systems Questions
const questions = [
  {
    id: 'bricklaying-l3-topic9-1',
    question: "What is the purpose of a cavity in a masonry wall?",
    options: ["Only to provide space for running services", "Only to reduce the weight of the wall", "To prevent moisture from crossing from the outer leaf to the inner leaf and to provide thermal insulation", "Only for aesthetics to create shadow lines"],
    correctAnswer: "To prevent moisture from crossing from the outer leaf to the inner leaf and to provide thermal insulation",
    explanation: "A cavity in a masonry wall serves to prevent moisture from crossing from the outer leaf to the inner leaf while providing space for thermal insulation. The air gap or insulated cavity creates a barrier that interrupts the path of water, allowing it to drain down the inside face of the outer leaf while the inner leaf remains dry. Additionally, the cavity significantly improves thermal performance by reducing heat transfer through the wall, especially when filled with insulation materials."
  },
  {
    id: 'bricklaying-l3-topic9-2',
    question: "What is the minimum recommended cavity width in modern masonry construction?",
    options: ["25mm", "50mm", "75mm", "100mm"],
    correctAnswer: "50mm",
    explanation: "The minimum recommended cavity width in modern masonry construction is 50mm. This width ensures adequate protection against moisture penetration even with normal construction tolerances and some mortar protrusions. Current Building Regulations and industry standards specify this dimension as the minimum effective cavity width to prevent moisture bridging across the cavity. For partially filled cavity walls, a residual 50mm clear cavity should be maintained between the insulation and the outer leaf to provide an effective moisture barrier."
  },
  {
    id: 'bricklaying-l3-topic9-3',
    question: "What is a 'cold bridge' in masonry construction?",
    options: ["A bridge built in cold climates", "A local area where thermal insulation is reduced or bypassed", "A stone bridge that feels cold to touch", "A bridge built between two cold rooms"],
    correctAnswer: "A local area where thermal insulation is reduced or bypassed",
    explanation: "A cold bridge (thermal bridge) is a local area where thermal insulation is reduced or bypassed, creating a path of least resistance for heat transfer. In masonry construction, common cold bridges include wall ties, lintels, floor junctions, window reveals, and structural elements that penetrate the insulation layer. These areas can lead to increased heat loss, cold surface temperatures causing condensation, and potential mold growth. Proper detailing to minimize or break these thermal bridges is essential for energy efficiency and building health."
  },
  {
    id: 'bricklaying-l3-topic9-4',
    question: "What is meant by a 'warm roof' construction?",
    options: ["A roof painted in warm colors", "A roof where insulation is placed at rafter level, keeping the roof structure warm", "Any roof in a hot climate", "A roof with underfloor heating beneath it"],
    correctAnswer: "A roof where insulation is placed at rafter level, keeping the roof structure warm",
    explanation: "A 'warm roof' construction is where insulation is placed at rafter level, keeping the roof structure warm. In this configuration, the insulation follows the slope of the roof rather than being placed at ceiling level, bringing the roof space into the heated envelope of the building. This approach affects how the top of masonry walls interfaces with the roof insulation, typically requiring careful detailing at the eaves and gable wall junctions to maintain insulation continuity and prevent thermal bridging where the masonry meets the roof structure."
  },
  {
    id: 'bricklaying-l3-topic9-5',
    question: "What is a 'cavity tray'?",
    options: ["A tool for cleaning out cavities", "A device for holding insulation in cavity walls", "A waterproof barrier built into a cavity wall to direct water outward", "A tray for carrying mortar to cavity walls"],
    correctAnswer: "A waterproof barrier built into a cavity wall to direct water outward",
    explanation: "A cavity tray is a waterproof barrier built into a cavity wall to direct water outward. Typically made of plastic, lead, or other impervious materials, cavity trays intercept water that penetrates the outer leaf and redirect it to the exterior via weep holes. They're essential at points where the cavity is bridged or interrupted, such as above openings (doors and windows), at abutments with roofs, and where items penetrate the cavity. Proper installation includes upstands against the inner leaf, sloping towards the outer leaf, and stop ends to prevent water running off the sides."
  },
  {
    id: 'bricklaying-l3-topic9-6',
    question: "What is the 'U-value' of a wall and what does it measure?",
    options: ["Ultraviolet resistance, measuring how well a wall resists sun damage", "Utilization factor, measuring how efficiently a wall uses its materials", "Thermal transmittance, measuring heat flow rate through the wall", "Underground protection, measuring resistance to ground moisture"],
    correctAnswer: "Thermal transmittance, measuring heat flow rate through the wall",
    explanation: "The U-value measures thermal transmittance, which is the rate of heat flow through the wall. Expressed in Watts per square meter per Kelvin (W/m²K), it quantifies how readily a wall assembly conducts heat. Lower U-values indicate better insulation performance. In masonry construction, the U-value is affected by the thermal properties of all components: both masonry leaves, the cavity, any insulation, and surface resistances. U-values are key to demonstrating compliance with building energy efficiency regulations, with maximum allowable values specified in Building Regulations."
  },
  {
    id: 'bricklaying-l3-topic9-7',
    question: "Which insulation material has the lowest thermal conductivity?",
    options: ["Rigid polyurethane foam (PUR/PIR)", "Mineral wool", "Expanded polystyrene (EPS)", "Straw bales"],
    correctAnswer: "Rigid polyurethane foam (PUR/PIR)",
    explanation: "Rigid polyurethane foam (PUR/PIR) has the lowest thermal conductivity among common insulation materials, typically between 0.022-0.028 W/mK. This superior thermal performance means thinner insulation can achieve the same thermal resistance as thicker layers of other materials. In masonry cavity walls, this allows for narrower cavities while meeting thermal performance requirements. PIR/PUR boards are often used as partial cavity fill insulation in high-performance wall systems where space is limited but excellent thermal performance is required."
  },
  {
    id: 'bricklaying-l3-topic9-8',
    question: "What is 'interstitial condensation' in building construction?",
    options: ["Condensation forming between window panes", "Condensation forming on the interior surface of walls", "Condensation forming within the structure of the wall", "Condensation forming between buildings"],
    correctAnswer: "Condensation forming within the structure of the wall",
    explanation: "Interstitial condensation is condensation forming within the structure of the wall. This occurs when warm, moist air penetrates into the wall and reaches a point where it cools to below its dew point, causing water vapor to condense into liquid water inside the construction. In masonry walls, particularly insulated ones, interstitial condensation risks must be managed through proper vapor control, appropriate placement of materials with different vapor permeabilities, and sometimes ventilation strategies. If left unaddressed, it can cause deterioration of materials, reduced thermal performance, and structural damage over time."
  },
  {
    id: 'bricklaying-l3-topic9-9',
    question: "What is the purpose of 'weep holes' in brick veneer or cavity walls?",
    options: ["To allow the wall to 'breathe'", "To allow water trapped in the cavity to escape to the exterior", "To create a decorative pattern", "To equalize air pressure on both sides of the wall"],
    correctAnswer: "To allow water trapped in the cavity to escape to the exterior",
    explanation: "Weep holes allow water trapped in the cavity to escape to the exterior. These openings, typically formed by leaving perpendicular joints open at intervals or using proprietary products, provide drainage points for moisture that enters the cavity. Weep holes are essential at the base of cavity walls and above all cavity trays (such as over windows and doors) to allow water to exit rather than accumulate in the cavity. Without properly positioned and unobstructed weep holes, trapped moisture could eventually bridge the cavity and cause internal dampness."
  },
  {
    id: 'bricklaying-l3-topic9-10',
    question: "What is a 'vapor barrier' and where should it typically be positioned in a wall assembly in UK construction?",
    options: ["A barrier to stop water penetration, positioned on the outer face of the wall", "A material that stops all air movement, positioned in the middle of the insulation", "A material that prevents vapor diffusion, typically positioned on the warm side of the insulation", "A protective coating against chemical vapors, positioned on both sides of the wall"],
    correctAnswer: "A material that prevents vapor diffusion, typically positioned on the warm side of the insulation",
    explanation: "A vapor barrier is a material that prevents vapor diffusion through the wall. In UK construction, it's typically positioned on the warm side of the insulation (usually the internal side in heated buildings). This placement prevents warm, moist indoor air from penetrating into the wall where it could condense when it reaches colder areas. The barrier must be continuous, with sealed joints and penetrations. In masonry construction with internal insulation, the vapor barrier generally sits between the insulation and the internal finish, though specific positioning depends on the wall design and local climate conditions."
  },
  {
    id: 'bricklaying-l3-topic9-11',
    question: "What is the primary function of wall ties in a cavity wall system?",
    options: ["To support the weight of the outer leaf", "To prevent the wall from falling outward", "To hold insulation in place", "To connect the inner and outer leafs while allowing them to function independently"],
    correctAnswer: "To connect the inner and outer leafs while allowing them to function independently",
    explanation: "The primary function of wall ties is to connect the inner and outer leafs while allowing them to function independently. These metal components provide lateral restraint between the two masonry leaves, ensuring they work as a composite structure to resist wind loads while still allowing for differential movement and maintaining the cavity separation. Wall ties must be correctly specified for the cavity width, properly embedded in both leaves with a slight downward slope toward the outer leaf to prevent water transfer, and installed at the correct spacing and frequency to ensure structural stability."
  },
  {
    id: 'bricklaying-l3-topic9-12',
    question: "What is 'capillary action' in relation to moisture movement in masonry?",
    options: ["The movement of water downward due to gravity", "The absorption and movement of water through fine pores due to surface tension", "The condensation of water vapor on cold surfaces", "The pressure of water against the outer face of masonry"],
    correctAnswer: "The absorption and movement of water through fine pores due to surface tension",
    explanation: "Capillary action is the absorption and movement of water through fine pores due to surface tension. This phenomenon allows water to move in any direction (including upward against gravity) through the microscopic pores in masonry materials. In brickwork and mortar, capillary action can draw water from the ground upward (rising damp) or horizontally through walls. Damp-proof courses, cavity systems, and appropriate material selection interrupt these capillary paths to prevent moisture problems in masonry construction."
  },
  {
    id: 'bricklaying-l3-topic9-13',
    question: "What is meant by 'breathability' in relation to masonry walls?",
    options: ["The ability of the wall to flex with building movement", "The wall's capacity to allow air to pass directly through it", "The capacity of the wall to allow water vapor to diffuse through it", "The ability of the wall to withstand wind pressure"],
    correctAnswer: "The capacity of the wall to allow water vapor to diffuse through it",
    explanation: "Breathability refers to the capacity of the wall to allow water vapor to diffuse through it. Also called vapor permeability, this property allows buildings to manage moisture by permitting water vapor to pass through rather than becoming trapped within the construction. In masonry walls, breathability is affected by the porosity of materials and their arrangement. Traditional materials like lime mortar and natural stone or clay brick tend to be breathable, allowing walls to dry readily. When retrofitting insulation or applying finishes to masonry, maintaining appropriate breathability helps prevent moisture problems and material degradation."
  },
  {
    id: 'bricklaying-l3-topic9-14',
    question: "What is the purpose of a 'rainscreen' cladding system?",
    options: ["To completely prevent rain from touching the building", "To collect rainwater for reuse", "To manage water penetration through pressure equalization and drainage", "To make rain bounce off the building more effectively"],
    correctAnswer: "To manage water penetration through pressure equalization and drainage",
    explanation: "A rainscreen cladding system manages water penetration through pressure equalization and drainage. Rather than attempting to create an absolutely watertight outer skin, rainscreen systems accept that some water will penetrate the outer cladding. The system then handles this water through a combination of pressure equalization (minimizing the forces driving water inward) and providing drainage paths within a ventilated cavity behind the cladding. In masonry construction, rainscreen principles can be applied with brick slip systems or when traditional masonry serves as the outer layer of a drained and ventilated system."
  },
  {
    id: 'bricklaying-l3-topic9-15',
    question: "What is the recommended minimum overlap between a horizontal DPC and a vertical DPC at corners or wall junctions?",
    options: ["25mm", "100mm", "150mm", "225mm"],
    correctAnswer: "100mm",
    explanation: "The recommended minimum overlap between horizontal and vertical DPCs at corners or wall junctions is 100mm. This generous overlap ensures continuity of the damp-proof barrier even with normal construction tolerances. Proper bonding or sealing of the overlapped DPCs is also essential to create an effective moisture barrier. This detail is particularly important at the junction of external walls with internal walls or where stepped DPCs occur at changes in ground level, ensuring that no gaps exist in the moisture protection system."
  },
  {
    id: 'bricklaying-l3-topic9-16',
    question: "What is 'thermal mass' in building construction?",
    options: ["The total weight of insulation in a building", "The ability of materials to absorb, store, and release heat energy", "The mass of the heating system components", "The overall weight of a thermally efficient building"],
    correctAnswer: "The ability of materials to absorb, store, and release heat energy",
    explanation: "Thermal mass is the ability of materials to absorb, store, and release heat energy. Dense materials like masonry have high thermal mass, absorbing heat during warm periods and releasing it when temperatures fall. This property can help moderate internal temperature fluctuations, potentially reducing heating and cooling energy use when properly integrated into the building design. In masonry construction, the location of insulation relative to the masonry affects how the thermal mass functions – external insulation allows the masonry's thermal mass to interact with internal spaces, while internal insulation isolates it from the interior."
  },
  {
    id: 'bricklaying-l3-topic9-17',
    question: "What is the primary purpose of a damp-proof membrane (DPM) in a concrete floor?",
    options: ["To provide a smooth surface finish", "To increase the floor's structural strength", "To prevent ground moisture from rising through the floor", "To reduce noise transmission"],
    correctAnswer: "To prevent ground moisture from rising through the floor",
    explanation: "The primary purpose of a damp-proof membrane (DPM) in a concrete floor is to prevent ground moisture from rising through the floor. Typically a continuous layer of polyethylene or other impermeable material placed within the floor construction, the DPM blocks ground moisture migration into the occupied space. In masonry construction, proper integration of the floor DPM with the wall damp-proof course is essential. The floor membrane should connect to or overlap with the wall DPC to provide continuous moisture protection at this critical junction."
  },
  {
    id: 'bricklaying-l3-topic9-18',
    question: "What is 'partial fill' cavity insulation?",
    options: ["Insulation that only partially insulates the wall", "Insulation that fills only part of the cavity, maintaining a clear residual cavity", "Insulating only some walls of the building", "Insulation material made from recycled materials"],
    correctAnswer: "Insulation that fills only part of the cavity, maintaining a clear residual cavity",
    explanation: "Partial fill cavity insulation fills only part of the cavity, maintaining a clear residual cavity (typically at least 50mm) between the insulation and the outer leaf. This approach provides improved thermal performance while preserving the cavity's moisture management function. The insulation boards are fixed against the inner leaf, with the residual cavity allowing any moisture that penetrates the outer leaf to drain down unimpeded. This system requires proper installation with appropriate retaining clips or ties to keep insulation boards tight against the inner leaf."
  },
  {
    id: 'bricklaying-l3-topic9-19',
    question: "What precautions must be taken when installing full-fill cavity insulation in masonry walls?",
    options: ["No special precautions are needed", "The insulation must be water-repellent, the wall must be constructed to minimize water penetration, and the site must have low exposure rating", "Only install it on north-facing walls", "The cavity must be at least 200mm wide"],
    correctAnswer: "The insulation must be water-repellent, the wall must be constructed to minimize water penetration, and the site must have low exposure rating",
    explanation: "When installing full-fill cavity insulation, the insulation must be water-repellent, the wall must be constructed to minimize water penetration, and the site must have low exposure rating. Full-fill systems eliminate the residual cavity that normally provides drainage, increasing the risk of moisture transmission to the inner leaf. Therefore, they require careful material selection (using only insulation products tested and approved for full-fill application), higher quality construction standards to minimize water ingress, and are generally only suitable in sheltered to moderate exposure zones, not in severe exposure locations."
  },
  {
    id: 'bricklaying-l3-topic9-20',
    question: "What is the purpose of 'cavity barriers' in insulated cavity walls?",
    options: ["To prevent insulation from being installed incorrectly", "To separate different types of insulation", "To close the cavity at openings and junctions to prevent fire spread", "To support the outer leaf of the cavity wall"],
    correctAnswer: "To close the cavity at openings and junctions to prevent fire spread",
    explanation: "Cavity barriers close the cavity at openings and junctions to prevent fire spread. These fire-resistant components restrict the movement of fire and smoke through concealed spaces in the building envelope. In insulated cavity walls, cavity barriers are typically required around window and door openings, at junctions with compartment walls and floors, and at specified intervals in extensive cavities. Materials used for cavity barriers must have appropriate fire resistance properties and be correctly installed to maintain the building's fire compartmentation strategy while not compromising moisture protection."
  },
  {
    id: 'bricklaying-l3-topic9-21',
    question: "What is meant by the 'hygroscopic' behavior of building materials?",
    options: ["Their ability to grow mold and bacteria", "Their ability to clean themselves when exposed to moisture", "Their ability to absorb and release moisture from the surrounding air", "Their ability to trap dust and allergens"],
    correctAnswer: "Their ability to absorb and release moisture from the surrounding air",
    explanation: "Hygroscopic behavior refers to a material's ability to absorb and release moisture from the surrounding air. Hygroscopic materials like wood, clay bricks, and lime-based mortars naturally adjust their moisture content in response to the relative humidity of the surrounding environment. This property can help regulate internal humidity levels in buildings by absorbing excess moisture when the air is humid and releasing it when the air is dry. In masonry construction, this behavior influences how walls interact with moisture and can affect both the durability of the construction and the internal comfort conditions."
  },
  {
    id: 'bricklaying-l3-topic9-22',
    question: "What is the 'lambda value' (λ) of an insulation material?",
    options: ["Its density", "Its thermal conductivity", "Its moisture resistance rating", "Its fire resistance rating"],
    correctAnswer: "Its thermal conductivity",
    explanation: "The lambda value (λ) is the thermal conductivity of an insulation material, measured in W/mK (Watts per meter per Kelvin). It quantifies how readily heat flows through the material – lower lambda values indicate better insulating performance. When designing insulated masonry walls, the lambda value of the chosen insulation is critical for calculating the required thickness to achieve the target U-value. High-performance insulation materials like polyisocyanurate (PIR) have lambda values around 0.022-0.027 W/mK, while mineral wool typically ranges from 0.032-0.044 W/mK."
  },
  {
    id: 'bricklaying-l3-topic9-23',
    question: "What is the purpose of 'ventilated facades' in masonry construction?",
    options: ["To provide fresh air to the building interior", "To create a chimney effect that draws heat away from the building", "To allow for views through the facade", "To manage moisture, improve thermal performance, and potentially extend the life of the building envelope"],
    correctAnswer: "To manage moisture, improve thermal performance, and potentially extend the life of the building envelope",
    explanation: "Ventilated facades manage moisture, improve thermal performance, and potentially extend the life of the building envelope. These systems incorporate an air gap between the outer cladding (which may be masonry) and the inner waterproofed and insulated wall structure. The ventilation channel allows any moisture that penetrates the outer layer to evaporate and disperse, prevents solar heat gain from reaching the building, and can reduce thermal bridging. In masonry construction, ventilated facades may use thin brick slips or natural stone attached to a support system that creates the ventilated cavity."
  },
  {
    id: 'bricklaying-l3-topic9-24',
    question: "What is 'hygrothermal modeling' in building design?",
    options: ["Measuring the humidity in a building", "Computer simulation of heat and moisture movement through building components", "Modeling how humans respond to humidity", "Designing HVAC systems for humidity control"],
    correctAnswer: "Computer simulation of heat and moisture movement through building components",
    explanation: "Hygrothermal modeling is computer simulation of heat and moisture movement through building components. This advanced analysis uses software to predict how wall assemblies and other building elements will respond to temperature, humidity, and weather conditions over time. For masonry construction, particularly when integrating insulation or modern materials with traditional masonry, hygrothermal modeling helps assess condensation risks, drying capacity, and long-term moisture behavior. The results inform design decisions to create wall assemblies that manage moisture effectively while providing good thermal performance."
  },
  {
    id: 'bricklaying-l3-topic9-25',
    question: "What is 'relative humidity' and why is it significant in building moisture management?",
    options: ["The amount of water in the air compared to the temperature, significant because it affects condensation risk", "The humidity level compared to yesterday's reading, significant for weather forecasting", "The humidity in one room relative to another, significant for comfort balance", "The amount of rain relative to normal levels, significant for drainage design"],
    correctAnswer: "The amount of water in the air compared to the temperature, significant because it affects condensation risk",
    explanation: "Relative humidity is the amount of water vapor in the air compared to the maximum amount the air can hold at that temperature, expressed as a percentage. It's significant in building moisture management because it directly affects condensation risk – when warm, humid air contacts cooler surfaces and cools below its dew point, condensation occurs. In masonry construction, understanding relative humidity helps in designing appropriate ventilation strategies, selecting materials with suitable moisture properties, and detailing to avoid conditions where harmful condensation might occur on or within wall assemblies."
  },
  {
    id: 'bricklaying-l3-topic9-26',
    question: "What is 'thermal conductivity' in building materials?",
    options: ["The ability to generate heat", "The ability to conduct electricity", "The rate at which heat passes through a material", "The rate at which a material changes temperature"],
    correctAnswer: "The rate at which heat passes through a material",
    explanation: "Thermal conductivity is the rate at which heat passes through a material, typically denoted by the symbol λ (lambda) and measured in W/mK. It's an inherent property of the material that indicates how readily it conducts heat – higher values indicate better conductors, lower values indicate better insulators. In masonry construction, the thermal conductivity of each component (bricks, blocks, mortar, insulation) contributes to the overall thermal performance. Dense materials like concrete and brick typically have higher thermal conductivity (0.6-1.3 W/mK) than purpose-designed insulation materials (0.022-0.044 W/mK)."
  },
  {
    id: 'bricklaying-l3-topic9-27',
    question: "What is meant by the 'dew point' in relation to building physics?",
    options: ["The time in the morning when dew typically forms", "The point at which water starts to leak through masonry", "The temperature at which air becomes saturated and water vapor condenses into liquid", "The position in a wall where waterproofing should be installed"],
    correctAnswer: "The temperature at which air becomes saturated and water vapor condenses into liquid",
    explanation: "The dew point is the temperature at which air becomes saturated and water vapor condenses into liquid. When air containing moisture cools to or below its dew point, condensation occurs on surfaces or within materials. In masonry construction, understanding dew point is crucial for managing condensation risks. If the temperature gradient across a wall creates conditions where internal parts of the construction fall below the dew point of the air moving through the wall, interstitial condensation can result, potentially causing damage. Proper thermal and vapor control design aims to prevent these conditions."
  },
  {
    id: 'bricklaying-l3-topic9-28',
    question: "What is 'rising damp' in masonry walls?",
    options: ["Moisture rising from activities inside the building", "Ground moisture rising through the wall through capillary action", "The increasing problem of dampness over time", "Dampness that starts at the bottom of walls and works upward due to gravity"],
    correctAnswer: "Ground moisture rising through the wall through capillary action",
    explanation: "Rising damp is ground moisture rising through the wall through capillary action. This phenomenon occurs when groundwater is drawn upward through the porous structure of masonry materials, against gravity. The capillary action in the fine pores of bricks, mortar, and other masonry materials can lift water to a height typically between 0.3 and 1.5 meters, depending on the materials and conditions. Prevention is achieved through properly installed damp-proof courses (DPCs) that create a horizontal barrier impermeable to water, interrupting the capillary path."
  },
  {
    id: 'bricklaying-l3-topic9-29',
    question: "What is 'driving rain' and how does it affect masonry wall design?",
    options: ["Heavy rainfall during transportation of materials", "Normal rainfall that's blown against walls by wind", "Rain that 'drives' through any available opening", "Rain that damages vehicles"],
    correctAnswer: "Normal rainfall that's blown against walls by wind",
    explanation: "Driving rain is normal rainfall that's blown against walls by wind, creating greater risk of water penetration than rainfall in still conditions. It affects masonry wall design by determining the exposure rating of a site, which influences appropriate wall types, cavity widths, and detailing requirements. In severe exposure zones with high driving rain indices, more robust masonry solutions are needed, such as wider cavities, carefully detailed DPCs and cavity trays, high-quality workmanship, and sometimes additional protective treatments. The UK has specific maps and calculations to determine driving rain exposure levels for different locations."
  },
  {
    id: 'bricklaying-l3-topic9-30',
    question: "What is the primary purpose of 'airbricks' in masonry walls?",
    options: ["To lighten the wall construction", "To provide ventilation to underfloor spaces or cavity walls", "To improve acoustic performance", "To create a decorative feature"],
    correctAnswer: "To provide ventilation to underfloor spaces or cavity walls",
    explanation: "The primary purpose of airbricks is to provide ventilation to underfloor spaces or cavity walls. These specially designed bricks contain holes or slots that allow air movement while maintaining the appearance of the wall. In suspended timber floor constructions, airbricks prevent dampness by ventilating the underfloor void. In certain cavity wall constructions, especially those with cold voids, airbricks provide necessary ventilation to remove moisture. They're typically positioned to create cross-ventilation and may be fitted with mesh to prevent pest entry while maintaining airflow."
  },
  {
    id: 'bricklaying-l3-topic9-31',
    question: "What is the recommended minimum fall for a cavity tray to ensure proper drainage?",
    options: ["Level with no fall", "5 degrees (approximately 1:12)", "45 degrees", "90 degrees (vertical)"],
    correctAnswer: "5 degrees (approximately 1:12)",
    explanation: "The recommended minimum fall for a cavity tray is 5 degrees (approximately 1:12 slope). This slight but definite slope ensures that any water intercepted by the tray runs toward the outer leaf and weep holes rather than pooling or potentially finding its way to the inner leaf. When installing cavity trays, this fall must be maintained consistently across the entire length of the tray. Preformed cavity trays typically have this fall built into their design, while site-formed lead or other flexible cavity trays must be carefully formed and supported to maintain the correct slope."
  },
  {
    id: 'bricklaying-l3-topic9-32',
    question: "What is meant by 'cold roof' and 'warm roof' construction?",
    options: ["Roofs in cold or warm climates", "Roofs painted in cold or warm colors", "Cold roof has insulation at ceiling level with ventilated space above; warm roof has insulation at rafter level", "Terms referring to roof pitch - cold roofs are flatter"],
    correctAnswer: "Cold roof has insulation at ceiling level with ventilated space above; warm roof has insulation at rafter level",
    explanation: "Cold roof construction has insulation at ceiling level with a ventilated space above, while warm roof construction has insulation at rafter level. In a cold roof, the loft space remains outside the insulated envelope and must be ventilated to prevent condensation. In a warm roof, the insulation follows the slope of the roof, bringing the roof space into the heated envelope. The choice affects how masonry walls interface with the roof, particularly at eaves and gables, where thermal bridging must be addressed and appropriate detailing provided to maintain insulation continuity and prevent condensation issues."
  },
  {
    id: 'bricklaying-l3-topic9-33',
    question: "What is 'stack effect' in buildings and how does it affect moisture movement?",
    options: ["The way bricks are stacked, affecting stability", "The vertical airflow caused by temperature differences, which can drive moisture movement", "The effect of stacking materials on site", "The visual effect of stacked architectural elements"],
    correctAnswer: "The vertical airflow caused by temperature differences, which can drive moisture movement",
    explanation: "Stack effect is the vertical airflow caused by temperature differences between inside and outside air. Warm air rises within buildings, creating negative pressure at lower levels that draws in outdoor air and positive pressure at higher levels that pushes air out. This natural convection affects moisture movement by potentially drawing damp air into the building through lower-level gaps and cracks in the masonry envelope. It also influences how water vapor generated inside moves through the building and potentially through walls. Proper air sealing and moisture barriers in masonry construction help control these moisture movements."
  },
  {
    id: 'bricklaying-l3-topic9-34',
    question: "What is the purpose of an 'air barrier' in building construction?",
    options: ["To prevent radon gas infiltration", "To block outdoor air pollution", "To control airflow through the building envelope", "To allow more fresh air into the building"],
    correctAnswer: "To control airflow through the building envelope",
    explanation: "An air barrier controls airflow through the building envelope. This continuous system of materials prevents uncontrolled air leakage through the building fabric, which carries multiple benefits: reduced energy consumption, prevention of interstitial condensation, improved indoor air quality, and better building durability. In masonry construction, the air barrier may be formed by the internal plaster or plasterboard system, specialized membranes, or the masonry itself with properly sealed joints and penetrations. Effective air barriers must be continuous across all junctions and penetrations."
  },
  {
    id: 'bricklaying-l3-topic9-35',
    question: "What is 'efflorescence' on masonry walls?",
    options: ["A type of moss growth", "Natural aging of brickwork", "White crystalline deposits caused by water-soluble salts", "Discoloration due to UV exposure"],
    correctAnswer: "White crystalline deposits caused by water-soluble salts",
    explanation: "Efflorescence refers to white crystalline deposits caused by water-soluble salts on masonry surfaces. It occurs when water moves through masonry, dissolving salts from the masonry units, mortar, or backing materials. As the water evaporates at the surface, it leaves behind salt crystals. While often primarily an aesthetic issue, persistent efflorescence can indicate ongoing water penetration problems. Prevention includes using low-salt materials, proper moisture protection during construction, adequate cavity details, and appropriate DPCs to manage water movement through the masonry."
  },
  {
    id: 'bricklaying-l3-topic9-36',
    question: "What is a 'psi-value' in thermal calculations?",
    options: ["The measurement of water pressure in pipes", "A measurement of thermal bridging heat loss at junctions, measured in W/mK", "The total U-value of a wall including windows", "The air pressure inside a building"],
    correctAnswer: "A measurement of thermal bridging heat loss at junctions, measured in W/mK",
    explanation: "A psi-value (Ψ-value) is a measurement of thermal bridging heat loss at junctions, measured in W/mK. Unlike U-values that measure heat loss through uniform elements, psi-values quantify the additional heat flow occurring at junctions between elements (e.g., wall-floor junctions, corners, window reveals). In masonry construction, careful detailing to minimize psi-values is crucial for thermal efficiency. Thermal bridges at junctions can account for a significant proportion of the total heat loss in well-insulated buildings, making these calculations increasingly important in meeting energy efficiency standards."
  },
  {
    id: 'bricklaying-l3-topic9-37',
    question: "What is 'solar gain' and how can it be managed in masonry buildings?",
    options: ["The generation of solar power; managed with solar panels", "The use of solar energy to heat water; managed with solar collectors", "Heat buildup from sunlight entering a building; managed with shading, glazing specifications, and thermal mass", "Solar radiation damage to materials; managed with protective coatings"],
    correctAnswer: "Heat buildup from sunlight entering a building; managed with shading, glazing specifications, and thermal mass",
    explanation: "Solar gain is heat buildup from sunlight entering a building. It can be managed in masonry buildings through external shading elements (overhangs, brise-soleil), appropriate glazing specifications to control solar transmission, and utilizing the thermal mass properties of masonry. The high thermal mass of masonry can help manage solar gain by absorbing excess heat during peak sun hours and releasing it later when temperatures fall, moderating internal temperature swings. Proper orientation of the building and window placement relative to solar paths also significantly affects solar gain management."
  },
  {
    id: 'bricklaying-l3-topic9-38',
    question: "What is meant by 'moisture buffering' in relation to building materials?",
    options: ["Using waterproof materials to buffer against moisture", "The ability of materials to absorb and release moisture to help regulate indoor humidity levels", "Creating a buffer zone between wet areas and dry areas", "The process of removing humidity from a building"],
    correctAnswer: "The ability of materials to absorb and release moisture to help regulate indoor humidity levels",
    explanation: "Moisture buffering refers to the ability of materials to absorb and release moisture to help regulate indoor humidity levels. Materials with good moisture buffering capacity can absorb moisture when ambient humidity is high and release it when the air becomes drier, helping to moderate humidity fluctuations. Many traditional masonry materials like clay bricks and lime plasters have good moisture buffering properties. This characteristic contributes to more stable indoor humidity levels, potentially improving comfort, air quality, and reducing the need for mechanical humidity control systems."
  },
  {
    id: 'bricklaying-l3-topic9-39',
    question: "What is the standard spacing for wall ties in masonry cavity walls?",
    options: ["450mm horizontally × 450mm vertically", "900mm horizontally × 450mm vertically", "750mm horizontally × 450mm vertically", "225mm horizontally × 225mm vertically"],
    correctAnswer: "900mm horizontally × 450mm vertically",
    explanation: "The standard spacing for wall ties in masonry cavity walls is 900mm horizontally × 450mm vertically (equivalent to every third course for standard brick heights). This creates a staggered pattern with approximately 2.5 ties per square meter. However, this standard spacing is increased to 750mm horizontally × 450mm vertically (3 ties per square meter) in severe exposure zones or areas of high wind loading. At openings, movement joints, and building corners, additional ties are required, typically at 300mm vertical centers within 225mm of the edge, to provide enhanced lateral restraint where stresses are concentrated."
  },
  {
    id: 'bricklaying-l3-topic9-40',
    question: "What is 'thermal inertia' in building physics?",
    options: ["The tendency of a material to resist temperature changes", "The property that causes buildings to overheat", "The speed at which a building loses heat", "The measurement of insulation thickness"],
    correctAnswer: "The tendency of a material to resist temperature changes",
    explanation: "Thermal inertia is the tendency of a material to resist temperature changes. It's a product of a material's thermal mass and its resistance to heat flow, determining how quickly it responds to temperature differences. Masonry materials have high thermal inertia, meaning they heat up and cool down slowly compared to lightweight materials. This property can be beneficial in moderating temperature fluctuations, storing heat from solar gain or internal sources during the day and releasing it during cooler periods, potentially reducing heating and cooling energy requirements when properly incorporated into the overall thermal design strategy."
  },
  {
    id: 'bricklaying-l3-topic9-41',
    question: "What is a 'thermal bypass' in insulated construction?",
    options: ["A deliberate path for heat to escape to prevent overheating", "Heat flow that circumvents or short-circuits the insulation layer", "A type of heating system that bypasses normal controls", "A thermal bridge that's acceptable under building regulations"],
    correctAnswer: "Heat flow that circumvents or short-circuits the insulation layer",
    explanation: "A thermal bypass is heat flow that circumvents or short-circuits the insulation layer. Unlike thermal bridging (which occurs through solid materials), thermal bypass typically involves heat transfer via air movement around insulation, such as through gaps, cracks, or unfilled spaces. In masonry cavity wall construction, common thermal bypasses include gaps around poorly installed cavity insulation, air circulation in unfilled cavities behind partial-fill insulation, and air movement through joints between insulation boards. Preventing thermal bypass requires attention to insulation installation quality and appropriate sealing of all potential air paths."
  },
  {
    id: 'bricklaying-l3-topic9-42',
    question: "What is the role of a 'vapor check' membrane as opposed to a complete vapor barrier?",
    options: ["It only checks for the presence of vapor without stopping it", "It slows vapor diffusion rather than stopping it completely", "It's a temporary barrier used during construction", "It checks vapor levels before triggering mechanical ventilation"],
    correctAnswer: "It slows vapor diffusion rather than stopping it completely",
    explanation: "A vapor check membrane slows vapor diffusion rather than stopping it completely. Unlike vapor barriers (which aim to wholly prevent vapor transmission), vapor check membranes have moderate rather than low permeability, allowing some controlled drying in either direction. In masonry construction, particularly in renovation contexts, vapor check systems can be more appropriate than full barriers as they reduce condensation risk while still allowing some breathability. These membranes are often specified where the complete prevention of vapor movement could potentially trap moisture in the construction, causing more harm than benefit."
  },
  {
    id: 'bricklaying-l3-topic9-43',
    question: "What is 'hygrothermal performance' in building envelope design?",
    options: ["The performance of hygiene facilities within a building", "How hot and humid a building gets in summer", "The combined heat and moisture behavior of the building envelope", "The thermal performance of hygroscopic materials"],
    correctAnswer: "The combined heat and moisture behavior of the building envelope",
    explanation: "Hygrothermal performance refers to the combined heat and moisture behavior of the building envelope. This comprehensive analysis considers how temperature, air, and moisture interact within building assemblies under varying internal and external conditions. For masonry construction, understanding hygrothermal performance is essential when integrating insulation systems, managing condensation risks, and ensuring long-term durability. Effective hygrothermal design accounts for climate conditions, indoor environment, material properties, and construction details to create building envelopes that manage both thermal and moisture flows appropriately."
  },
  {
    id: 'bricklaying-l3-topic9-44',
    question: "What is meant by 'airtightness' in building construction?",
    options: ["How tightly packed insulation materials are", "How well the building's envelope prevents uncontrolled air leakage", "How much air is supplied to occupants", "How tightly windows and doors close"],
    correctAnswer: "How well the building's envelope prevents uncontrolled air leakage",
    explanation: "Airtightness refers to how well the building's envelope prevents uncontrolled air leakage. A good airtightness level minimizes unintended air movement through the building fabric, reducing energy loss, preventing drafts, and helping to avoid interstitial condensation from warm, moist air entering cold parts of the construction. In masonry construction, airtightness is achieved through continuous air barrier systems, proper sealing at junctions, service penetrations, and openings, and appropriate detailing where different elements meet. Airtightness levels are typically measured by pressure testing and expressed as air permeability in m³/(h·m²) at 50Pa pressure difference."
  },
  {
    id: 'bricklaying-l3-topic9-45',
    question: "What is 'summer overheating' in buildings and how can masonry help address it?",
    options: ["Damage to materials from extreme heat; masonry helps by being heat resistant", "Overheating of building equipment; masonry helps by being non-combustible", "Excessive indoor temperatures during warm weather; masonry helps through thermal mass", "Excessive heat in summer construction sites; masonry helps by providing shade"],
    correctAnswer: "Excessive indoor temperatures during warm weather; masonry helps through thermal mass",
    explanation: "Summer overheating refers to excessive indoor temperatures during warm weather, which can cause discomfort and health issues for occupants. Masonry can help address this through its thermal mass properties, absorbing heat during the day and slowing temperature rise. With appropriate design including night ventilation strategies, this stored heat can be released at night when external temperatures drop, creating a more stable internal environment. In well-designed masonry buildings, this thermal mass effect can reduce peak internal temperatures and potentially reduce or eliminate mechanical cooling requirements, especially when combined with appropriate shading, ventilation, and insulation strategies."
  },
  {
    id: 'bricklaying-l3-topic9-46',
    question: "What is 'condensation risk analysis' in building design?",
    options: ["Analysis of when to install condensing boilers", "Financial analysis of the risk of project condensation (reduction)", "Assessment of where and when condensation might occur within a building assembly", "Analysis of water condensation requirements for concrete curing"],
    correctAnswer: "Assessment of where and when condensation might occur within a building assembly",
    explanation: "Condensation risk analysis is the assessment of where and when condensation might occur within a building assembly. This technical evaluation uses calculation methods to predict whether the temperature at any point within a construction might fall below the dew point of the air at that location, potentially causing condensation. For masonry walls, particularly when adding insulation to existing structures or designing high-performance wall systems, condensation risk analysis is crucial to ensure the wall design manages moisture appropriately. The analysis informs material selection, layer sequencing, and vapor control strategies to create durable, moisture-safe constructions."
  },
  {
    id: 'bricklaying-l3-topic9-47',
    question: "What is 'mold growth potential' in relation to building envelope design?",
    options: ["The likelihood of mold spores being present in building materials", "The ability to grow specific decorative molds on exterior surfaces", "The risk of mold growth occurring based on temperature, humidity, and substrate conditions", "The potential for mold to spread between buildings"],
    correctAnswer: "The risk of mold growth occurring based on temperature, humidity, and substrate conditions",
    explanation: "Mold growth potential refers to the risk of mold growth occurring based on temperature, humidity, and substrate conditions. Mold typically requires sustained relative humidity above 80% at the surface, suitable temperatures (typically 5-38°C), and an appropriate nutrient source. In masonry construction, poor thermal design creating cold surfaces, thermal bridging, or interstitial condensation can create conditions favorable for mold growth. Proper thermal and moisture design, including appropriate insulation strategies, management of thermal bridges, adequate ventilation, and appropriate vapor control, helps minimize mold growth potential on or within masonry assemblies."
  },
  {
    id: 'bricklaying-l3-topic9-48',
    question: "What is 'dewpoint calculation' in moisture management?",
    options: ["Calculating when morning dew will evaporate", "Determining when to apply dewatering equipment", "Calculating the temperature at which water vapor will condense based on relative humidity", "Measuring the rate of water droplet formation"],
    correctAnswer: "Calculating the temperature at which water vapor will condense based on relative humidity",
    explanation: "Dewpoint calculation determines the temperature at which water vapor will condense based on relative humidity. This calculation is fundamental to moisture management in buildings, as it helps predict where condensation might occur within constructions. In designing masonry wall systems, particularly insulated ones, dewpoint calculations help ensure that the temperature profile through the wall keeps vulnerable materials and surfaces above their dewpoint temperature, preventing condensation. The calculation uses psychrometric principles based on air temperature and relative humidity to determine the critical temperature threshold for condensation formation."
  },
  {
    id: 'bricklaying-l3-topic9-49',
    question: "What is a 'hygroscopic salt' and why is it problematic in masonry?",
    options: ["A salt used to measure humidity; problematic because it's expensive", "A salt that absorbs moisture from the air; problematic because it causes continuing dampness and deterioration", "A salt that repels water; problematic because it prevents proper curing", "A salt used in hygiene products; problematic if it contacts masonry"],
    correctAnswer: "A salt that absorbs moisture from the air; problematic because it causes continuing dampness and deterioration",
    explanation: "A hygroscopic salt absorbs moisture from the air, causing continuing dampness and deterioration in masonry. These salts (commonly chlorides, nitrates, and some sulfates) can be drawn into masonry through groundwater, sea spray, or pollution. Once present, they absorb moisture from the air whenever the relative humidity exceeds their equilibrium relative humidity, keeping the masonry damp even without direct water contact. This persistent dampness leads to ongoing deterioration through physical damage from crystallization/dissolution cycles and by facilitating other decay mechanisms. Managing hygroscopic salt problems typically requires specialized treatments to remove or neutralize the salts, alongside addressing the original source of salt contamination."
  },
  {
    id: 'bricklaying-l3-topic9-50',
    question: "What is 'thermal bridging' and what are its consequences in building performance?",
    options: ["Adding thermal mass to create a bridge between temperature variations; consequences include improved comfort", "Using heat-conducting materials to transfer heat intentionally; consequences include better heat distribution", "Localized areas with higher heat transfer due to materials or geometries; consequences include increased heat loss and condensation risk", "The process of spanning thermal expansion gaps; consequences include structural stability"],
    correctAnswer: "Localized areas with higher heat transfer due to materials or geometries; consequences include increased heat loss and condensation risk",
    explanation: "Thermal bridging refers to localized areas with higher heat transfer due to materials or geometries that bypass or penetrate insulation. In masonry construction, common thermal bridges include wall ties, lintels, floor junctions, window reveals, and column connections. The consequences include increased overall heat loss (often 15-30% above the theoretical performance of the wall), cold internal surface temperatures leading to condensation and mold risk, and reduced occupant comfort from cold spots or radiant temperature asymmetry. Modern high-performance buildings require careful thermal bridge mitigation through material selection, geometrical optimization, and specialized thermal break products."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'bricklaying-l3-thermal-moisture', 'items', q.id), {
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
  
  uploadQuestions();
  