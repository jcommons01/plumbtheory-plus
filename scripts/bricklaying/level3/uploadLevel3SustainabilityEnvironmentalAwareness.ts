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

// ✅ Bricklaying Level 3 Sustainability & Environmental Awareness Questions
const questions = [
  {
    id: 'bricklaying-l3-topic10-1',
    question: "What is 'embodied carbon' in construction materials?",
    options: ["Carbon physically contained within the material", "Carbon emissions from heating the building during use", "The total carbon emissions associated with extraction, manufacture, transport, and installation of a material", "Carbon captured and stored within the material"],
    correctAnswer: "The total carbon emissions associated with extraction, manufacture, transport, and installation of a material",
    explanation: "Embodied carbon refers to the total carbon emissions associated with extraction, manufacture, transport, and installation of a material. For masonry products, this includes emissions from clay extraction or aggregate mining, energy used in firing bricks or curing concrete blocks, transportation to site, and construction processes. Different masonry materials have varying embodied carbon profiles - fired clay bricks typically have higher embodied carbon than concrete blocks due to the high-temperature firing process. Understanding embodied carbon helps make environmentally informed material choices."
  },
  {
    id: 'bricklaying-l3-topic10-2',
    question: "What is meant by 'operational carbon' in buildings?",
    options: ["Carbon emissions from construction operations", "Carbon emissions associated with building maintenance", "Carbon emissions resulting from energy use during the building's operational life", "Carbon emissions from occupants' activities"],
    correctAnswer: "Carbon emissions resulting from energy use during the building's operational life",
    explanation: "Operational carbon refers to carbon emissions resulting from energy use during the building's operational life. This includes emissions from heating, cooling, lighting, and powering equipment throughout the building's lifespan. In masonry construction, the thermal performance of walls significantly influences operational carbon - well-insulated walls with minimal thermal bridging reduce heat loss and associated carbon emissions. When designing sustainable masonry buildings, balancing embodied carbon (in construction) with operational carbon (in use) is essential for minimizing lifetime environmental impact."
  },
  {
    id: 'bricklaying-l3-topic10-3',
    question: "What is a 'whole life carbon assessment' in construction?",
    options: ["Analyzing only the carbon footprint of materials", "Measuring carbon storage in building materials", "A comprehensive evaluation of embodied and operational carbon across a building's entire life cycle", "Calculating the carbon emissions of the construction workforce"],
    correctAnswer: "A comprehensive evaluation of embodied and operational carbon across a building's entire life cycle",
    explanation: "A whole life carbon assessment is a comprehensive evaluation of embodied and operational carbon across a building's entire life cycle. This includes carbon emissions from material production, construction, operation, maintenance, and eventual demolition or recycling. For masonry construction, this approach ensures all carbon impacts are considered - from the emissions associated with brick manufacture to the energy efficiency of the wall system during building use, to the potential for material reuse at end-of-life. It provides a complete picture rather than optimizing just embodied or operational carbon in isolation."
  },
  {
    id: 'bricklaying-l3-topic10-4',
    question: "What is 'thermal mass' and how does it contribute to sustainable building design?",
    options: ["Insulation that prevents heat loss; it reduces energy consumption", "The weight of thermal insulation; it makes buildings more stable", "The ability of materials to absorb, store and release heat; it helps stabilize internal temperatures", "A mass production technique for thermal components; it reduces costs"],
    correctAnswer: "The ability of materials to absorb, store and release heat; it helps stabilize internal temperatures",
    explanation: "Thermal mass is the ability of materials to absorb, store, and release heat, helping stabilize internal temperatures. Masonry materials like brick and concrete have high thermal mass, which contributes to sustainable design by moderating temperature fluctuations - absorbing heat during warm periods and releasing it when temperatures drop. This can reduce heating and cooling energy requirements when properly integrated with insulation and ventilation strategies. In appropriate climates, masonry's thermal mass can reduce peak cooling loads and shift heating demand to off-peak periods, enhancing energy efficiency."
  },
  {
    id: 'bricklaying-l3-topic10-5',
    question: "What is meant by 'responsible sourcing' of construction materials?",
    options: ["Purchasing the cheapest materials to remain financially responsible", "Using only materials available at local suppliers", "Sourcing materials according to ethical, environmental and sustainability principles", "Using materials only from sources recommended by architects"],
    correctAnswer: "Sourcing materials according to ethical, environmental and sustainability principles",
    explanation: "Responsible sourcing means obtaining materials according to ethical, environmental, and sustainability principles. For masonry materials, this involves considering factors like environmental management during extraction and production, ethical labor practices, responsible land management, and transparent supply chains. Various certification schemes help identify responsibly sourced materials, such as BES 6001 Responsible Sourcing of Construction Products. Responsibly sourced masonry products minimize environmental damage from extraction, reduce pollution during manufacture, and often support fair labor conditions and community benefits."
  },
  {
    id: 'bricklaying-l3-topic10-6',
    question: "What is an 'Environmental Product Declaration' (EPD)?",
    options: ["A permit allowing environmentally sensitive construction", "A document declaring a product's environmental impacts based on life cycle assessment", "A certificate exempting materials from environmental regulations", "A description of how to dispose of materials safely"],
    correctAnswer: "A document declaring a product's environmental impacts based on life cycle assessment",
    explanation: "An Environmental Product Declaration (EPD) is a document declaring a product's environmental impacts based on life cycle assessment. Similar to a nutrition label for environmental attributes, EPDs follow standardized formats (usually ISO 14025 compliant) to report impacts like global warming potential, resource depletion, and acidification. For masonry products, EPDs provide transparent, verified information about environmental performance, allowing fair comparisons between products and informed decision-making. They're increasingly required for sustainable building certifications and help quantify the environmental footprint of construction."
  },
  {
    id: 'bricklaying-l3-topic10-7',
    question: "What is the 'circular economy' approach in construction?",
    options: ["Building circular-shaped structures", "Using circular tools and equipment", "Designing for durability, reuse, recycling and waste reduction to minimize resource consumption", "Rotating workers between different construction tasks"],
    correctAnswer: "Designing for durability, reuse, recycling and waste reduction to minimize resource consumption",
    explanation: "The circular economy approach in construction involves designing for durability, reuse, recycling, and waste reduction to minimize resource consumption. This contrasts with the traditional linear 'take-make-dispose' model. For masonry, circular principles include designing for longevity, using reclaimed bricks, employing lime mortars that allow future brick recovery and reuse, minimizing construction waste, and considering eventual deconstruction rather than demolition. This approach reduces environmental impacts by keeping materials in use longer and reducing demand for virgin resources."
  },
  {
    id: 'bricklaying-l3-topic10-8',
    question: "What is meant by 'end-of-life recycling' in masonry construction?",
    options: ["Using only materials near the end of their manufacturing run", "Disposing of construction waste in recycling bins", "Planning for how materials can be recycled or reused after building demolition", "Recycling packaging materials after construction is complete"],
    correctAnswer: "Planning for how materials can be recycled or reused after building demolition",
    explanation: "End-of-life recycling in masonry construction refers to planning for how materials can be recycled or reused after building demolition. This involves considering the future recoverability of materials during design and construction. For masonry, using lime mortars rather than cement mortars facilitates brick reclamation and reuse, as bricks can be more easily separated. Crushed masonry can also be recycled as aggregate for new concrete or as fill material. Considering end-of-life scenarios during construction contributes to resource conservation and waste reduction in the broader building lifecycle."
  },
  {
    id: 'bricklaying-l3-topic10-9',
    question: "What is 'local sourcing' and how does it contribute to sustainable construction?",
    options: ["Using materials from charitable sources; it supports local communities", "Obtaining materials from nearby sources; it reduces transportation impacts and supports local economies", "Sourcing labor from the local area; it reduces worker travel", "Using locally invented construction techniques; it preserves regional traditions"],
    correctAnswer: "Obtaining materials from nearby sources; it reduces transportation impacts and supports local economies",
    explanation: "Local sourcing means obtaining materials from nearby sources, contributing to sustainable construction by reducing transportation impacts and supporting local economies. For masonry materials, which are heavy and traditionally sourced locally, shorter transportation distances mean lower fuel consumption and carbon emissions. Additionally, using local materials often results in buildings that fit regional aesthetic traditions and weather conditions. Local sourcing also supports regional businesses and economies, creates jobs, and helps maintain local skills and manufacturing capabilities."
  },
  {
    id: 'bricklaying-l3-topic10-10',
    question: "What is meant by 'thermal bridging' and why is it important in sustainable construction?",
    options: ["Creating heat paths to distribute warmth; important for even heating", "Using specialized thermal materials; important for fire protection", "Areas where insulation is compromised, creating paths for heat loss; important for energy efficiency", "Installing thermal breaks; important for expansion control"],
    correctAnswer: "Areas where insulation is compromised, creating paths for heat loss; important for energy efficiency",
    explanation: "Thermal bridging refers to areas where insulation is compromised, creating paths for heat loss. It's important in sustainable construction because these bridges can significantly reduce a building's thermal efficiency, increasing energy consumption and carbon emissions. In masonry walls, common thermal bridges include wall ties, lintels, sills, jambs, and floor junctions. Addressing these through careful detailing and appropriate materials is essential for creating energy-efficient buildings. Modern sustainable masonry design includes thermal break materials and optimized junction details to minimize these heat loss paths."
  },
  {
    id: 'bricklaying-l3-topic10-11',
    question: "What is 'BREEAM' in the context of sustainable construction?",
    options: ["A breathing membrane for walls", "A construction material recycling association", "A sustainability assessment and certification scheme for buildings", "A brick manufacturing standard"],
    correctAnswer: "A sustainability assessment and certification scheme for buildings",
    explanation: "BREEAM (Building Research Establishment Environmental Assessment Method) is a sustainability assessment and certification scheme for buildings. This widely-used UK system evaluates building performance across categories including energy, materials, waste, pollution, health, and ecology. For masonry construction, BREEAM influences material choices, encouraging responsibly sourced products with lower environmental impacts, thermal performance standards, and waste management practices. Achieving BREEAM certification (at ratings from Pass to Outstanding) demonstrates sustainability credentials and can enhance a building's value and operational performance."
  },
  {
    id: 'bricklaying-l3-topic10-12',
    question: "What is meant by 'carbon sequestration' in building materials?",
    options: ["Creating carbon fiber reinforcement", "The process of capturing and storing carbon dioxide within materials", "Measuring carbon content of materials", "Carbon emissions during construction"],
    correctAnswer: "The process of capturing and storing carbon dioxide within materials",
    explanation: "Carbon sequestration in building materials refers to the process of capturing and storing carbon dioxide within materials. Some masonry materials, particularly those based on lime, actively absorb CO₂ during their lifecycle. For example, lime mortar absorbs carbon dioxide during carbonation, effectively storing carbon in the building fabric. Other plant-based building materials like hempcrete (which combines hemp with lime binders) sequester carbon during plant growth. These carbon-storing properties can partially offset the emissions associated with material production, potentially reducing the overall carbon footprint of construction."
  },
  {
    id: 'bricklaying-l3-topic10-13',
    question: "What is 'materials efficiency' in sustainable construction?",
    options: ["Using materials with the best cost-to-performance ratio", "Using less material to achieve the same function", "Ensuring materials arrive on time", "Using the fastest materials to install"],
    correctAnswer: "Using less material to achieve the same function",
    explanation: "Materials efficiency means using less material to achieve the same function. This approach reduces resource consumption, waste, and associated environmental impacts while potentially lowering costs. In masonry construction, materials efficiency might include optimizing wall thicknesses, reducing unnecessary material use, precise ordering to minimize waste, and designing efficient structural forms. Efficient design might use engineering principles to eliminate redundant material while maintaining performance and safety. Modern materials-efficient masonry systems include thin-joint blockwork and innovative bonding patterns that maintain strength while reducing material consumption."
  },
  {
    id: 'bricklaying-l3-topic10-14',
    question: "What is the primary environmental benefit of using reclaimed bricks?",
    options: ["They are more water-resistant", "The aesthetic appeal of weathered materials", "Avoiding the environmental impacts of manufacturing new bricks", "They are generally less expensive"],
    correctAnswer: "Avoiding the environmental impacts of manufacturing new bricks",
    explanation: "The primary environmental benefit of using reclaimed bricks is avoiding the environmental impacts of manufacturing new bricks. Reclaiming and reusing existing bricks eliminates the energy consumption, resource extraction, and carbon emissions associated with producing new brick products. Brick manufacturing is energy-intensive, particularly the firing process, which typically uses fossil fuels. Using reclaimed bricks essentially eliminates this embodied energy and carbon. Additionally, reusing bricks diverts waste from landfill and preserves the character and appearance of older bricks that often cannot be replicated in modern manufacturing."
  },
  {
    id: 'bricklaying-l3-topic10-15',
    question: "What is a 'Site Waste Management Plan' (SWMP)?",
    options: ["A plan showing where to place garbage bins on site", "A document outlining how waste will be managed and minimized throughout a construction project", "A hazardous waste handling procedure", "A plan for disposing of site toilets and welfare facilities"],
    correctAnswer: "A document outlining how waste will be managed and minimized throughout a construction project",
    explanation: "A Site Waste Management Plan (SWMP) is a document outlining how waste will be managed and minimized throughout a construction project. Although no longer legally required in the UK, SWMPs remain best practice for sustainable construction, detailing strategies for waste reduction, segregation, and disposal. For masonry work, the plan might include accurate material quantity calculations to avoid over-ordering, cutting optimization to minimize waste, segregating and crushing masonry waste for recycling, and proper handling of packaging and hazardous wastes like sealants. An effective SWMP reduces landfill, saves resources, and often reduces costs."
  },
  {
    id: 'bricklaying-l3-topic10-16',
    question: "What is 'future-proofing' in sustainable building design?",
    options: ["Installing the newest technology available", "Ensuring structures can be easily adapted for changing needs and climate conditions", "Predicting future property values", "Building only with proven traditional methods"],
    correctAnswer: "Ensuring structures can be easily adapted for changing needs and climate conditions",
    explanation: "Future-proofing means ensuring structures can be easily adapted for changing needs and climate conditions. This approach anticipates future challenges like climate change impacts, changing use patterns, and evolving performance standards. In masonry construction, future-proofing might include designing walls with higher thermal performance than currently required, ensuring adaptability for additional insulation later, providing for climate resilience against increased storm events or flooding, and creating flexible spaces that can serve different functions over time. Future-proofed buildings remain functional, efficient, and valuable for longer, enhancing sustainability through extended useful life."
  },
  {
    id: 'bricklaying-l3-topic10-17',
    question: "What is the 'waste hierarchy' in construction?",
    options: ["A system for organizing different types of waste on site", "A ranking of waste management options from most to least environmentally favorable: prevention, reuse, recycling, recovery, disposal", "A chain of command for waste management decisions", "A system ranking waste by hazard level"],
    correctAnswer: "A ranking of waste management options from most to least environmentally favorable: prevention, reuse, recycling, recovery, disposal",
    explanation: "The waste hierarchy ranks waste management options from most to least environmentally favorable: prevention, reuse, recycling, recovery, and disposal. This framework prioritizes reducing waste creation first, then reusing materials where possible, followed by recycling, recovering value (e.g., energy from waste), and finally disposal as a last resort. In masonry construction, application includes designing to standard brick dimensions to minimize cuts and waste, reusing cut-offs where possible, recycling clean masonry waste as aggregate, and properly segregating non-recyclable waste for appropriate disposal."
  },
  {
    id: 'bricklaying-l3-topic10-18',
    question: "What is 'life cycle assessment' (LCA) in sustainable construction?",
    options: ["A safety assessment for the lifetime of a building", "A method of financing construction over the building's life", "A technique to evaluate environmental impacts associated with all stages of a product's life", "An assessment of how long materials will last before replacement"],
    correctAnswer: "A technique to evaluate environmental impacts associated with all stages of a product's life",
    explanation: "Life cycle assessment (LCA) is a technique to evaluate environmental impacts associated with all stages of a product's life, from raw material extraction through production, use, and disposal or recycling. In sustainable construction, LCA provides comprehensive environmental analysis beyond just energy or carbon. For masonry materials and assemblies, LCA considers impacts from clay or aggregate extraction, manufacturing, transportation, construction, maintenance, and eventual demolition/recycling. This holistic evaluation helps identify environmental hotspots and make informed decisions about material selection and building designs based on their total environmental footprint."
  },
  {
    id: 'bricklaying-l3-topic10-19',
    question: "What are 'low-carbon cements' in sustainable masonry?",
    options: ["Cements used in below-ground applications", "Cement substitutes with lower carbon footprints than traditional Portland cement", "Adhesives that set without heat curing", "Cements only used for small projects with low carbon output"],
    correctAnswer: "Cement substitutes with lower carbon footprints than traditional Portland cement",
    explanation: "Low-carbon cements are cement substitutes with lower carbon footprints than traditional Portland cement, which is responsible for approximately 8% of global CO₂ emissions. These alternatives include cements with partial replacement of clinker with supplementary cementitious materials like fly ash or ground granulated blast furnace slag, geopolymer cements, or magnesium-based cements. In sustainable masonry, using mortars and renders made with these lower-carbon binders significantly reduces the embodied carbon of masonry construction while providing similar or sometimes superior technical performance depending on the application."
  },
  {
    id: 'bricklaying-l3-topic10-20',
    question: "What is meant by 'sustainable drainage systems' (SuDS) and how might they relate to masonry construction?",
    options: ["Systems that use minimal water during construction", "Drainage systems that remain usable for many years", "Approaches to manage surface water that mimic natural processes", "Systems that drain water away from masonry to prevent damage"],
    correctAnswer: "Approaches to manage surface water that mimic natural processes",
    explanation: "Sustainable drainage systems (SuDS) are approaches to manage surface water that mimic natural processes, reducing flood risk and improving water quality. In relation to masonry construction, SuDS might include permeable paving systems using specially designed permeable concrete blocks or brick pavers with drainage joints. These allow water to infiltrate through the surface rather than running off, reducing flood risk and replenishing groundwater. Masonry also features in SuDS as boundary walls for swales or rain gardens, retaining structures for infiltration basins, or in creating water channels and flow control structures."
  },
  {
    id: 'bricklaying-l3-topic10-21',
    question: "What is 'lime mortar' and what are its environmental benefits?",
    options: ["Mortar containing lime fruit extract; benefits include pleasant aroma", "Mortar made with a base of agricultural lime; benefits include improving soil pH", "Mortar made with lime as the primary binder; benefits include lower embodied carbon and enabling brick reuse", "A fast-setting mortar; benefits include shorter construction time"],
    correctAnswer: "Mortar made with lime as the primary binder; benefits include lower embodied carbon and enabling brick reuse",
    explanation: "Lime mortar is made with lime as the primary binder rather than cement. Its environmental benefits include lower embodied carbon compared to cement mortars (lime production requires lower temperatures than cement), carbon absorption during curing through carbonation, and enabling brick reuse at end-of-life. The softer, more flexible nature of lime mortar allows bricks to be separated and cleaned for reuse, supporting circular economy principles. Additionally, lime mortars' greater permeability and flexibility can enhance building durability by accommodating movement and allowing moisture to evaporate, potentially extending the structure's useful life."
  },
  {
    id: 'bricklaying-l3-topic10-22',
    question: "What is 'FSC certification' and how might it relate to masonry construction?",
    options: ["Fire Safety Certification; relates to fire resistance of masonry", "Forest Stewardship Council certification; relates to sustainable timber elements used alongside masonry", "Formal Standards Compliance; relates to meeting building codes", "Factory Safety Control; relates to safe production of bricks"],
    correctAnswer: "Forest Stewardship Council certification; relates to sustainable timber elements used alongside masonry",
    explanation: "FSC (Forest Stewardship Council) certification verifies that wood products come from responsibly managed forests that provide environmental, social, and economic benefits. In masonry construction, FSC certification relates to sustainable timber elements used alongside masonry, such as lintels, floor joists, roof structures, formwork for foundations, and scaffolding boards. Using FSC-certified timber for these components ensures that the wood comes from forests managed according to strict environmental and social standards, contributing to the overall sustainability credentials of a masonry building project."
  },
  {
    id: 'bricklaying-l3-topic10-23',
    question: "What is 'biodiversity net gain' in construction projects?",
    options: ["Using only natural building materials", "An approach where developments leave biodiversity in a better state than before", "Creating homes for construction workers", "A financial profit from environmentally friendly buildings"],
    correctAnswer: "An approach where developments leave biodiversity in a better state than before",
    explanation: "Biodiversity net gain is an approach where developments leave biodiversity in a better state than before, delivering at least 10% improvement. For masonry construction projects, this might involve incorporating wildlife-friendly features into the building fabric (such as built-in bird or bat bricks, insect hotels in walls, or green walls supported by masonry), creating habitat-rich landscaping, or investing in off-site biodiversity improvements to offset construction impacts. This approach recognizes construction's potential environmental impact and seeks to ensure development contributes positively to nature conservation rather than depleting it."
  },
  {
    id: 'bricklaying-l3-topic10-24',
    question: "What is 'hempcrete' and how does it relate to sustainable masonry construction?",
    options: ["A mixture of cement and aggregate made from crushed hemp seeds", "A biocomposite material made from hemp shivs and lime binder, used as an eco-friendly alternative or complement to traditional masonry", "A waterproofing treatment for masonry derived from hemp oil", "A hemp-based mortar used exclusively for historical restoration work"],
    correctAnswer: "A biocomposite material made from hemp shivs and lime binder, used as an eco-friendly alternative or complement to traditional masonry",
    explanation: "Hempcrete is a biocomposite material made from hemp shivs (the woody core of the hemp plant) and a lime-based binder. It relates to sustainable masonry construction as an eco-friendly alternative or complement to traditional materials, often used as infill in timber frames or as internal insulation for masonry walls. Hempcrete offers excellent sustainability credentials: it's made from a rapidly renewable resource, sequesters carbon (as hemp captures CO₂ during growth and lime absorbs CO₂ while setting), provides good thermal and acoustic properties, and is breathable, supporting healthy building physics."
  },
  {
    id: 'bricklaying-l3-topic10-25',
    question: "What is 'airtightness' and why is it important for sustainable buildings?",
    options: ["The ability to prevent air from entering a building during storms; important for structural stability", "The measure of how well the building fabric prevents uncontrolled air leakage; important for energy efficiency", "A method of keeping air clean inside buildings; important for health", "How tightly windows and doors close; important for security"],
    correctAnswer: "The measure of how well the building fabric prevents uncontrolled air leakage; important for energy efficiency",
    explanation: "Airtightness measures how well the building fabric prevents uncontrolled air leakage. It's important for sustainable buildings because air leakage accounts for a significant portion of heat loss in buildings, increasing energy consumption and carbon emissions. In masonry construction, achieving good airtightness involves careful detailing at junctions between elements, around service penetrations, and at openings. Internal plaster or membranes typically form the airtight layer in masonry buildings. Good airtightness must be balanced with appropriate ventilation strategies to ensure fresh air and prevent moisture problems."
  },
  {
    id: 'bricklaying-l3-topic10-26',
    question: "What is 'passive solar design' and how can masonry contribute to it?",
    options: ["Using solar panels for electricity; masonry can support panel mounting", "Installing solar water heaters; masonry can house water tanks", "Designing buildings to collect and distribute solar energy naturally; masonry can provide thermal mass", "Using sunlight instead of artificial lighting; masonry can be built with larger windows"],
    correctAnswer: "Designing buildings to collect and distribute solar energy naturally; masonry can provide thermal mass",
    explanation: "Passive solar design means designing buildings to collect and distribute solar energy naturally, without mechanical systems. Masonry contributes to this approach by providing thermal mass that absorbs, stores, and gradually releases solar heat. In well-designed passive solar buildings, masonry elements like walls and floors absorb heat from sunlight during the day and release it slowly when temperatures fall, helping maintain stable internal temperatures with minimal active heating or cooling. The high thermal mass of brick and concrete is a key asset in passive solar strategies, particularly when combined with appropriate orientation, glazing, shading, and insulation."
  },
  {
    id: 'bricklaying-l3-topic10-27',
    question: "What is 'demountable construction' and how might it apply to masonry?",
    options: ["Temporary structures that can be easily removed", "Buildings designed for easy disassembly and potential material reuse", "Construction on steep hillsides", "Prefabricated buildings assembled on site"],
    correctAnswer: "Buildings designed for easy disassembly and potential material reuse",
    explanation: "Demountable construction refers to buildings designed for easy disassembly and potential material reuse. For masonry, this sustainable approach typically involves using lime mortars rather than cement-based ones, allowing bricks or blocks to be separated and reused at end-of-life. Some innovative systems use mechanical connections or dry-stacking systems rather than mortar. While traditional masonry isn't fully demountable, these approaches improve end-of-life recoverability. Designing for future demounting and material recovery supports circular economy principles by facilitating reuse, reducing waste, and preserving the embodied carbon and resources in materials."
  },
  {
    id: 'bricklaying-l3-topic10-28',
    question: "What is a 'green roof' and how might it integrate with masonry construction?",
    options: ["A roof painted green for aesthetic purposes", "A roof planted with vegetation, integrating with masonry through appropriate structural design and detailing", "A roof made from recycled materials", "A sloped roof designed to improve rainwater runoff"],
    correctAnswer: "A roof planted with vegetation, integrating with masonry through appropriate structural design and detailing",
    explanation: "A green roof is planted with vegetation, integrating with masonry through appropriate structural design and detailing. Masonry structures must be designed to support the additional weight of soil, plants, and retained water, with properly detailed waterproofing at the masonry/roof interface. Green roofs offer environmental benefits including stormwater management, urban heat island reduction, improved biodiversity, and additional insulation. In urban environments, combining durable masonry construction with green roofs creates resilient, sustainable buildings with extended lifespans and reduced environmental impacts both through the building fabric and the ecosystem services provided by the living roof."
  },
  {
    id: 'bricklaying-l3-topic10-29',
    question: "What is meant by 'ethical sourcing' of construction materials?",
    options: ["Using only the most expensive, premium materials", "Ensuring materials are obtained in ways that treat workers fairly and respect communities and the environment", "Sourcing materials directly from manufacturers without intermediaries", "Using only locally produced materials"],
    correctAnswer: "Ensuring materials are obtained in ways that treat workers fairly and respect communities and the environment",
    explanation: "Ethical sourcing ensures materials are obtained in ways that treat workers fairly and respect communities and the environment. For masonry products, this includes consideration of labor conditions in quarries and factories, fair wages, safe working environments, respect for local communities affected by extraction, and responsible environmental practices. Ethical sourcing looks beyond environmental impacts to consider the social dimension of sustainability. Certification schemes that address ethical aspects include Ethical Trading Initiative, SA8000, and aspects of ISO 26000 (social responsibility). Specifying ethically sourced materials helps ensure construction doesn't contribute to exploitation or harm."
  },
  {
    id: 'bricklaying-l3-topic10-30',
    question: "What is 'carbon neutrality' in construction?",
    options: ["Using only materials with neutral pH levels", "Achieving net-zero carbon emissions through reduction and offsetting", "Building only with carbon-fiber materials", "Constructing buildings that don't require heating"],
    correctAnswer: "Achieving net-zero carbon emissions through reduction and offsetting",
    explanation: "Carbon neutrality in construction means achieving net-zero carbon emissions through reduction and offsetting. This involves minimizing embodied carbon in materials and construction processes, designing for low operational carbon, and offsetting any remaining emissions that cannot be eliminated. For masonry construction, approaches to carbon neutrality include using reclaimed bricks, specifying lower-carbon alternatives to cement mortars, optimizing design to reduce material use, ensuring high thermal performance, and potentially offsetting remaining carbon impact through verified carbon offset schemes."
  },
  {
    id: 'bricklaying-l3-topic10-31',
    question: "What is 'resource efficiency' in construction?",
    options: ["Using the cheapest available resources", "Efficient scheduling of deliveries", "Using fewer or less environmentally damaging resources to achieve the same outcome", "Hiring the most efficient workers"],
    correctAnswer: "Using fewer or less environmentally damaging resources to achieve the same outcome",
    explanation: "Resource efficiency means using fewer or less environmentally damaging resources to achieve the same outcome. In construction, this includes minimizing material use, water consumption, energy use, and waste generation while maintaining or improving building performance. For masonry work, resource efficiency practices include optimizing design to avoid unnecessary material use, accurate quantity surveying to prevent over-ordering, cutting optimization to reduce waste, proper storage to prevent damage, efficient mixing processes to reduce water use, and reusing or recycling waste materials where possible."
  },
  {
    id: 'bricklaying-l3-topic10-32',
    question: "What is 'smart thermal mass' in sustainable building design?",
    options: ["Using electronic sensors to monitor thermal performance", "The strategic positioning and use of high thermal mass materials like masonry for optimal thermal performance", "Thermally insulated mass concrete", "Using the minimum mass required for structural stability"],
    correctAnswer: "The strategic positioning and use of high thermal mass materials like masonry for optimal thermal performance",
    explanation: "Smart thermal mass refers to the strategic positioning and use of high thermal mass materials like masonry for optimal thermal performance. Rather than simply using heavy materials throughout, smart thermal mass involves carefully locating masonry elements where they can most effectively moderate temperature fluctuations, combined with appropriate insulation and ventilation strategies. This might include exposed masonry on the interior of well-insulated walls, thermal mass floors in areas receiving direct sunlight, or masonry feature walls positioned to absorb and redistribute heat. This targeted approach optimizes the benefits of masonry's thermal capacity while avoiding potential drawbacks."
  },
  {
    id: 'bricklaying-l3-topic10-33',
    question: "What are 'EPCs' and what do they measure?",
    options: ["Environmental Protection Certificates; they measure compliance with environmental regulations", "Energy Performance Certificates; they rate the energy efficiency of buildings", "External Protection Coatings; they measure weatherproofing effectiveness", "European Product Compliance; they measure adherence to EU standards"],
    correctAnswer: "Energy Performance Certificates; they rate the energy efficiency of buildings",
    explanation: "EPCs (Energy Performance Certificates) rate the energy efficiency of buildings on a scale from A (most efficient) to G (least efficient). They measure aspects including insulation levels, heating systems, glazing, and renewable energy features, providing an overall energy performance rating and recommendations for improvements. Masonry construction significantly impacts EPC ratings through wall U-values, thermal bridging, and airtightness. Well-designed masonry with appropriate insulation can contribute to excellent energy performance, while poorly detailed or inadequately insulated masonry may result in lower ratings."
  },
  {
    id: 'bricklaying-l3-topic10-34',
    question: "What is 'Climate Emergency' in the context of construction?",
    options: ["Building techniques for extreme weather conditions", "The recognition that construction must rapidly decarbonize to address climate change", "Emergency procedures during adverse weather on construction sites", "Climate control systems for emergency situations"],
    correctAnswer: "The recognition that construction must rapidly decarbonize to address climate change",
    explanation: "Climate Emergency in construction acknowledges that the industry must rapidly decarbonize to address climate change. This recognition has accelerated efforts to reduce both embodied and operational carbon in buildings. For masonry construction, responding to the Climate Emergency involves evaluating and reducing the carbon footprint of materials, improving energy efficiency through better thermal performance, considering alternative lower-carbon binders and materials, and designing for climate resilience. Many local authorities and organizations have declared Climate Emergencies, committing to accelerated carbon reduction targets affecting construction practices."
  },
  {
    id: 'bricklaying-l3-topic10-35',
    question: "What is meant by the 'urban heat island effect' and how can masonry contribute to mitigating it?",
    options: ["Excessive heat in urban areas from solar radiation; masonry can help by providing shading", "The increased temperature in urban areas compared to surrounding rural areas; masonry can help through high-albedo finishes and green walls", "Heat generated by urban transportation; masonry can help by acting as a noise barrier", "Overheating in city centers due to overcrowding; masonry can help by providing thermal insulation"],
    correctAnswer: "The increased temperature in urban areas compared to surrounding rural areas; masonry can help through high-albedo finishes and green walls",
    explanation: "The urban heat island effect refers to increased temperatures in urban areas compared to surrounding rural areas due to concentrated human activities and built materials that absorb and retain heat. Masonry can help mitigate this through high-albedo (reflective) finishes that reduce heat absorption, green walls that provide evaporative cooling, and wall systems with appropriate thermal mass and ventilation that moderate temperature extremes. Strategic masonry design can create cooler microclimates around buildings through shading, proper orientation, and integration with landscaping, helping reduce urban overheating and associated energy use for cooling."
  },
  {
    id: 'bricklaying-l3-topic10-36',
    question: "What is 'carbon intensity' in relation to building materials?",
    options: ["How difficult it is to reduce carbon in a material", "The amount of carbon dioxide emitted per unit of material produced", "How quickly a material releases stored carbon", "The darkness of color in carbon-based materials"],
    correctAnswer: "The amount of carbon dioxide emitted per unit of material produced",
    explanation: "Carbon intensity refers to the amount of carbon dioxide emitted per unit of material produced, typically expressed as kgCO₂e per kg or per functional unit. This measurement allows comparison of the relative environmental impact of different materials. In masonry, fired clay bricks typically have higher carbon intensity than concrete blocks due to the high-temperature firing process. Understanding materials' carbon intensity helps guide sustainable material selection, sometimes leading to specifying lower-carbon alternatives or offsetting high-carbon materials with other environmental benefits like durability, thermal performance, or recyclability."
  },
  {
    id: 'bricklaying-l3-topic10-37',
    question: "What is 'water footprint' in construction?",
    options: ["The amount of water used on site for mixing mortar", "The total volume of freshwater used directly and indirectly to produce materials and construct a building", "Areas where water pools on a construction site", "Water damage caused during construction"],
    correctAnswer: "The total volume of freshwater used directly and indirectly to produce materials and construct a building",
    explanation: "Water footprint refers to the total volume of freshwater used directly and indirectly to produce materials and construct a building. This includes water used in raw material extraction, manufacturing processes, and on-site construction activities. For masonry products, water is consumed in clay or aggregate extraction, brick or block manufacturing, and on site for mixing mortars. Sustainable practices to reduce water footprint include closed-loop water systems in manufacturing, rainwater harvesting for site activities, efficient mixing methods, and proper material scheduling to avoid waste from weather damage."
  },
  {
    id: 'bricklaying-l3-topic10-38',
    question: "What is 'modern masonry' in the context of sustainable construction?",
    options: ["Only using the newest types of brick and block", "Using traditional materials in modern, innovative ways to meet sustainability challenges", "Mass-produced machine-made bricks and blocks", "Masonry designed by modern architects"],
    correctAnswer: "Using traditional materials in modern, innovative ways to meet sustainability challenges",
    explanation: "Modern masonry in sustainable construction refers to using traditional materials in modern, innovative ways to meet sustainability challenges. This approach combines the inherent benefits of masonry (durability, thermal mass, local availability) with contemporary innovations in design, specification, and construction. Examples include high-performance insulated cavity walls, thin-joint blockwork systems that reduce mortar use, specialized units for thermal bridge reduction, and integration with modern envelope technologies. Modern masonry emphasizes optimizing the sustainability benefits of masonry while addressing its limitations through innovative techniques and complementary technologies."
  },
  {
    id: 'bricklaying-l3-topic10-39',
    question: "What are 'living walls' and how do they relate to masonry construction?",
    options: ["Walls made from living organisms", "Walls in living rooms", "Vertical gardens integrated with or supported by masonry structures", "Walls designed to react to occupant behavior"],
    correctAnswer: "Vertical gardens integrated with or supported by masonry structures",
    explanation: "Living walls are vertical gardens integrated with or supported by masonry structures. These green installations can be attached to masonry walls or incorporated into specially designed masonry systems with pockets or shelves for planting. The relationship with masonry includes structural support, moisture management, and thermal interaction. Living walls offer sustainability benefits including improved biodiversity, enhanced thermal performance through shading and evaporative cooling, improved air quality, and stormwater management. Properly designed living wall systems work with the masonry substrate to ensure building protection while maximizing environmental benefits."
  },
  {
    id: 'bricklaying-l3-topic10-40',
    question: "What is meant by 'social sustainability' in construction?",
    options: ["Using social media to promote construction projects", "Holding social events for construction workers", "Ensuring construction practices and outcomes support community wellbeing, equity, and quality of life", "Building only social housing projects"],
    correctAnswer: "Ensuring construction practices and outcomes support community wellbeing, equity, and quality of life",
    explanation: "Social sustainability means ensuring construction practices and outcomes support community wellbeing, equity, and quality of life. This aspect of sustainability focuses on the social impact of construction, including fair labor practices, community engagement, inclusive design, and creating buildings that enhance human wellbeing. For masonry construction, social sustainability might involve using ethical supply chains, providing quality training and apprenticeships, engaging local labor, designing healthy buildings with appropriate thermal and acoustic comfort, and respecting local architectural heritage and community aesthetics in material selection and design."
  },
  {
    id: 'bricklaying-l3-topic10-41',
    question: "What is 'resilient construction' in the context of sustainability?",
    options: ["Using only the strongest building materials", "Building structures that can recover quickly from interference or adversity", "Construction that resists change over time", "Using resilient tools that don't break easily"],
    correctAnswer: "Building structures that can recover quickly from interference or adversity",
    explanation: "Resilient construction means building structures that can recover quickly from interference or adversity, particularly in response to climate change challenges. This approach creates buildings that withstand extreme weather events, adapt to changing conditions, and maintain functionality through disruptions. Masonry contributes to resilience through inherent durability, fire resistance, and thermal stability. Sustainable resilient masonry design might include enhanced flood resistance, superior weathering capabilities, passive survivability (maintaining habitable conditions without power), and adaptable spaces. Resilience and sustainability work together by creating long-lasting, adaptable buildings that require fewer resources over time."
  },
  {
    id: 'bricklaying-l3-topic10-42',
    question: "What is the 'fabric first' approach in sustainable building design?",
    options: ["Prioritizing decorative fabrics and finishes", "Focusing on the building envelope performance before adding renewable technologies", "Using fabric formwork for concrete elements", "Starting construction with fabric-based components"],
    correctAnswer: "Focusing on the building envelope performance before adding renewable technologies",
    explanation: "The fabric first approach focuses on optimizing the building envelope performance before adding renewable technologies. This prioritizes fundamental aspects like insulation, airtightness, thermal bridging, and appropriate material selection to minimize energy demand from the outset. For masonry construction, this means designing walls with optimal insulation values, minimal thermal bridges, good airtightness, and appropriate thermal mass utilization. Only after maximizing the performance of the building fabric should renewable energy systems be considered. This approach generally provides better long-term value, as fabric improvements typically last the building's lifetime while requiring minimal maintenance."
  },
  {
    id: 'bricklaying-l3-topic10-43',
    question: "What is 'greenwashing' in the construction industry?",
    options: ["A technique for cleaning algae from masonry", "Painting buildings green to blend with landscapes", "Misleading claims about the environmental benefits of products or practices", "Using water-based green-colored treatments on materials"],
    correctAnswer: "Misleading claims about the environmental benefits of products or practices",
    explanation: "Greenwashing refers to misleading claims about the environmental benefits of products or practices. In construction, this might include exaggerated marketing claims, vague sustainability statements without evidence, or emphasizing minor environmental benefits while ignoring significant impacts. For masonry materials, potential greenwashing includes claims about 'natural' or 'eco-friendly' products without substantiation, meaningless certification labels, or focusing on a single environmental benefit while ignoring overall lifecycle impacts. Critical evaluation of green claims, looking for specific data and recognized certifications, helps identify genuine sustainability benefits versus greenwashing."
  },
  {
    id: 'bricklaying-l3-topic10-44',
    question: "What is a 'carbon offset' in sustainable construction?",
    options: ["A reduction in a building's width to reduce its carbon footprint", "A chemical added to concrete to absorb carbon dioxide", "A reduction or removal of carbon emissions to compensate for emissions produced elsewhere", "Offsetting high-carbon materials with low-carbon materials"],
    correctAnswer: "A reduction or removal of carbon emissions to compensate for emissions produced elsewhere",
    explanation: "A carbon offset is a reduction or removal of carbon emissions to compensate for emissions produced elsewhere. In construction, after reducing embodied and operational carbon as much as practically possible, unavoidable remaining emissions can be offset through investment in projects that reduce or sequester carbon elsewhere, such as renewable energy, forestry, or carbon capture initiatives. For masonry construction, offsets might be used to compensate for the embodied carbon of materials that cannot be further reduced through specification or design. Credible offsets should be certified by recognized standards to ensure genuine climate benefit."
  },
  {
    id: 'bricklaying-l3-topic10-45',
    question: "What are 'recycled aggregates' and how do they contribute to sustainable masonry?",
    options: ["Aggregates collected from recycling centers", "Crushed construction waste used to replace virgin aggregates in new concrete blocks or mortars", "Aggregates made from recycled plastic", "Small aggregates extracted using environmentally friendly methods"],
    correctAnswer: "Crushed construction waste used to replace virgin aggregates in new concrete blocks or mortars",
    explanation: "Recycled aggregates are crushed construction waste used to replace virgin aggregates in new concrete blocks or mortars. Typically produced from demolished concrete, masonry, or other mineral construction waste, they contribute to sustainable masonry by reducing demand for newly quarried materials, decreasing waste sent to landfill, and lowering the carbon footprint of aggregate production. Concrete blocks manufactured with recycled aggregates can achieve similar performance to those made with virgin materials while offering improved sustainability credentials. Using recycled aggregates in masonry supports circular economy principles by keeping materials in productive use."
  },
  {
    id: 'bricklaying-l3-topic10-46',
    question: "What is 'rainwater harvesting' and how might it integrate with masonry construction?",
    options: ["Collecting water from cleaning masonry", "Collecting rainfall for later use, integrated through appropriate detailing where masonry connects with collection systems", "Preventing rain from penetrating masonry", "Using rain to cure mortar naturally"],
    correctAnswer: "Collecting rainfall for later use, integrated through appropriate detailing where masonry connects with collection systems",
    explanation: "Rainwater harvesting involves collecting rainfall for later use, reducing mains water consumption. It integrates with masonry construction through appropriate detailing where masonry connects with collection systems - particularly at roof-wall junctions, parapet gutters, and where pipes penetrate walls. Sustainable masonry projects might incorporate rainwater harvesting tanks concealed within masonry features, with water used for irrigation, toilet flushing, or cleaning. This integration requires careful waterproofing and penetration detailing to ensure the masonry's integrity remains uncompromised while supporting water conservation goals."
  },
  {
    id: 'bricklaying-l3-topic10-47',
    question: "What is 'Phase Change Material' (PCM) and how might it be used with masonry?",
    options: ["Material that changes color during construction phases", "Material that changes from solid to liquid at useful temperatures, storing and releasing energy", "Material that changes the construction schedule phases", "Material that changes hardness over time"],
    correctAnswer: "Material that changes from solid to liquid at useful temperatures, storing and releasing energy",
    explanation: "Phase Change Materials (PCMs) change from solid to liquid at specific temperatures, storing and releasing large amounts of energy during this phase transition. With masonry, PCMs might be incorporated into plaster or renders applied to masonry walls, included within the cores of hollow blocks, or integrated into wall systems alongside masonry. This combination enhances the natural thermal mass effect of masonry by adding thermal energy storage capacity without additional physical mass. PCMs in masonry applications help moderate temperature fluctuations, potentially reducing heating and cooling energy requirements beyond what masonry's inherent thermal mass provides alone."
  },
  {
    id: 'bricklaying-l3-topic10-48',
    question: "What is 'adaptation' in the context of climate change and construction?",
    options: ["Adapting buildings for different uses", "Changing construction techniques to suit weather conditions", "Adjusting buildings and construction practices to withstand and respond to climate change impacts", "Modifying existing buildings with modern materials"],
    correctAnswer: "Adjusting buildings and construction practices to withstand and respond to climate change impacts",
    explanation: "Adaptation in construction means adjusting buildings and practices to withstand and respond to climate change impacts. This involves designing for future climate scenarios rather than historical conditions. For masonry construction, adaptation might include enhanced resistance to more frequent extreme weather events, improved moisture management for increased rainfall, better cooling strategies for higher temperatures, or increased resilience to flooding. These adaptations might involve modified detailing, different material specifications, innovative construction techniques, or integration of masonry with complementary systems to create climate-resilient buildings."
  },
  {
    id: 'bricklaying-l3-topic10-49',
    question: "What is 'sustainable procurement' in construction?",
    options: ["Buying materials at sustainable prices that don't bankrupt the company", "A procurement process that can be maintained indefinitely", "Purchasing materials and services in ways that maximize positive environmental, social, and economic outcomes", "Procurement of only recycled materials"],
    correctAnswer: "Purchasing materials and services in ways that maximize positive environmental, social, and economic outcomes",
    explanation: "Sustainable procurement means purchasing materials and services in ways that maximize positive environmental, social, and economic outcomes. This holistic approach considers factors beyond just price and quality, including environmental impacts, ethical labor practices, local economic benefits, and long-term value. For masonry materials, sustainable procurement might involve evaluating suppliers' environmental credentials, sourcing locally to reduce transportation impacts, selecting products with appropriate certifications, considering lifecycle costs rather than just purchase price, and ensuring materials are responsibly produced under fair labor conditions."
  },
  {
    id: 'bricklaying-l3-topic10-50',
    question: "What is the 'triple bottom line' approach to sustainability?",
    options: ["Focusing on profits, productivity, and personnel", "Considering environmental, social, and economic aspects of sustainability", "Measuring sustainability at the beginning, middle, and end of a project", "Evaluating sustainability at local, national, and global levels"],
    correctAnswer: "Considering environmental, social, and economic aspects of sustainability",
    explanation: "The triple bottom line approach considers environmental, social, and economic aspects of sustainability rather than focusing solely on environmental impact. This balanced perspective recognizes that truly sustainable construction must be environmentally responsible, socially beneficial, and economically viable. For masonry projects, this might mean selecting materials with lower environmental impact but also considering durability (economic benefit through reduced lifecycle costs) and local sourcing (social benefit through community employment), creating solutions that deliver across all three sustainability dimensions rather than prioritizing just one aspect."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'bricklaying-l3-sustainability', 'items', q.id), {
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
  