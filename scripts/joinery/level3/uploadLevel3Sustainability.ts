// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3Sustainability.ts

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

// ✅ Joinery Level 3 Environmental & Sustainability Awareness Questions
const questions = [
  {
    id: 'joinery-l3-sustainability1',
    question: "What is FSC certification and why is it important in joinery?",
    options: ["A furniture style certification, important for traditional designs", "A training certification for joiners", "A certification that ensures timber comes from responsibly managed forests, important for environmental sustainability", "A tool quality certification, important for precision"],
    correctAnswer: "A certification that ensures timber comes from responsibly managed forests, important for environmental sustainability",
    explanation: "FSC (Forest Stewardship Council) certification ensures timber comes from responsibly managed forests that provide environmental, social, and economic benefits. This independent, third-party certification is important in joinery as it guarantees materials are sourced legally and sustainably, helping prevent deforestation while supporting biodiversity and forest-dependent communities."
  },
  {
    id: 'joinery-l3-sustainability2',
    question: "What is meant by the term 'embodied carbon' in relation to joinery products?",
    options: ["The amount of carbon naturally stored in timber", "The carbon emissions created during the product's complete lifecycle", "Only the carbon in the manufacturing waste", "Only the carbon released when timber is burned"],
    correctAnswer: "The carbon emissions created during the product's complete lifecycle",
    explanation: "Embodied carbon refers to the total carbon emissions created during a product's complete lifecycle, including extraction, processing, manufacturing, transportation, installation, maintenance, and end-of-life disposal or recycling. In joinery, understanding embodied carbon helps identify opportunities to reduce environmental impact through material selection, local sourcing, efficient processing, and design for longevity."
  },
  {
    id: 'joinery-l3-sustainability3',
    question: "Which of the following best describes 'circular economy principles' in joinery?",
    options: ["Using only round or circular design elements", "Building only circular furniture", "Designing products for durability, repair, disassembly, and material recovery", "Using only circular saws for manufacturing"],
    correctAnswer: "Designing products for durability, repair, disassembly, and material recovery",
    explanation: "Circular economy principles in joinery involve designing products for durability, repair, disassembly, and material recovery. This approach moves away from the traditional linear 'take-make-dispose' model toward one where resources remain in use as long as possible. Joinery products following these principles are designed for longevity, easy maintenance, component replacement, and eventual recycling or repurposing."
  },
  {
    id: 'joinery-l3-sustainability4',
    question: "What is the purpose of an Environmental Product Declaration (EPD) for joinery products?",
    options: ["To advertise products as eco-friendly regardless of actual impact", "To restrict product sales to certain regions", "To provide transparent, verified information about a product's environmental impact throughout its lifecycle", "To increase product prices based on environmental features"],
    correctAnswer: "To provide transparent, verified information about a product's environmental impact throughout its lifecycle",
    explanation: "An Environmental Product Declaration provides transparent, verified information about a product's environmental impact throughout its lifecycle. These standardized documents, based on Life Cycle Assessment methodology, quantify environmental impacts including carbon footprint, resource use, and pollution potential. EPDs enable objective comparison between products, inform sustainable design decisions, and provide credible environmental performance documentation."
  },
  {
    id: 'joinery-l3-sustainability5',
    question: "What is the benefit of using timber from local sources in joinery projects?",
    options: ["Local timber is always stronger than imported timber", "It reduces transport emissions and supports local forestry", "Local timber is always less expensive", "Local timber always has better fire resistance"],
    correctAnswer: "It reduces transport emissions and supports local forestry",
    explanation: "Using locally sourced timber reduces transport emissions and supports local forestry. Shorter supply chains minimize the carbon footprint associated with transportation while supporting regional forest management and local economies. Additionally, local timber often suits local building traditions and climate conditions, potentially offering better performance while preserving regional architectural character."
  },
  {
    id: 'joinery-l3-sustainability6',
    question: "What is the primary environmental advantage of using reclaimed timber in joinery projects?",
    options: ["It is always less expensive than new timber", "It extends the life of existing materials and reduces demand for virgin timber", "It is always easier to work with than new timber", "It is always more fire-resistant than new timber"],
    correctAnswer: "It extends the life of existing materials and reduces demand for virgin timber",
    explanation: "The primary environmental advantage of using reclaimed timber is that it extends the life of existing materials and reduces demand for virgin timber. Repurposing previously used wood prevents it from becoming waste while avoiding the environmental impacts of harvesting and processing new timber. Reclaimed timber often has character and patina that cannot be replicated, adding aesthetic and historical value."
  },
  {
    id: 'joinery-l3-sustainability7',
    question: "What is the significance of the 'chain-of-custody' certification in timber products?",
    options: ["It only applies to antique furniture chains", "It documents that certified materials have been tracked from forest to final product", "It only tracks ownership history for valuable timber", "It only applies to metal chains used in joinery"],
    correctAnswer: "It documents that certified materials have been tracked from forest to final product",
    explanation: "Chain-of-custody certification documents that certified materials have been tracked from forest to final product. This verification system ensures that claims about certified timber (such as FSC or PEFC) can be substantiated throughout the supply chain. For joinery businesses, maintaining chain-of-custody certification provides credible evidence that products contain sustainably sourced timber as claimed."
  },
  {
    id: 'joinery-l3-sustainability8',
    question: "Why might a joinery company implement an ISO 14001 Environmental Management System?",
    options: ["Only to increase product prices", "Only to reduce quality control requirements", "To systematically manage environmental impacts and demonstrate commitment to continuous improvement", "Only to receive government subsidies"],
    correctAnswer: "To systematically manage environmental impacts and demonstrate commitment to continuous improvement",
    explanation: "A joinery company might implement ISO 14001 to systematically manage environmental impacts and demonstrate commitment to continuous improvement. This internationally recognized standard provides a framework for identifying environmental aspects, setting objectives, implementing controls, and monitoring performance. Certification demonstrates credible environmental management to customers, regulatory bodies, and other stakeholders."
  },
  {
    id: 'joinery-l3-sustainability9',
    question: "What does the term 'carbon sequestration' mean in relation to timber products?",
    options: ["The process of removing carbon from timber before use", "The release of carbon when timber burns", "The capture and storage of carbon dioxide in the wood, removing it from the atmosphere", "The industrial process of adding carbon to improve timber strength"],
    correctAnswer: "The capture and storage of carbon dioxide in the wood, removing it from the atmosphere",
    explanation: "Carbon sequestration refers to the capture and storage of carbon dioxide in wood, removing it from the atmosphere. Trees absorb CO₂ during growth, converting it to carbon stored in the wood. This carbon remains sequestered throughout the timber product's life, effectively serving as carbon storage. Long-lasting joinery products therefore act as carbon sinks, contributing positively to climate change mitigation."
  },
  {
    id: 'joinery-l3-sustainability10',
    question: "What environmental impact do VOCs (Volatile Organic Compounds) from finishes and adhesives have?",
    options: ["They only affect the color of the finish", "They contribute to air pollution and can cause health problems", "They only impact the adhesive strength", "They have no environmental impact"],
    correctAnswer: "They contribute to air pollution and can cause health problems",
    explanation: "VOCs from finishes and adhesives contribute to air pollution and can cause health problems. These compounds evaporate at room temperature, potentially causing indoor air quality issues including respiratory irritation and longer-term health effects. Environmentally, VOCs contribute to smog formation and atmospheric pollution. Low or zero-VOC alternatives reduce these impacts while providing safer working and living environments."
  },
  {
    id: 'joinery-l3-sustainability11',
    question: "What is meant by 'sustainable forestry' in the context of timber sourcing?",
    options: ["Using only fast-growing tree species", "Harvesting practices that maintain forest health and biodiversity while providing timber continuously", "Cutting down all trees in one area before moving to another", "Only using tropical hardwoods"],
    correctAnswer: "Harvesting practices that maintain forest health and biodiversity while providing timber continuously",
    explanation: "Sustainable forestry involves harvesting practices that maintain forest health and biodiversity while providing timber continuously. This approach balances ecological, social, and economic factors, ensuring forests regenerate and remain productive. Key principles include maintaining biodiversity, protecting soil and water quality, respecting indigenous rights, and harvesting at or below replacement rates."
  },
  {
    id: 'joinery-l3-sustainability12',
    question: "What is the concept of 'designing out waste' in sustainable joinery?",
    options: ["Hiding waste materials within joinery components", "Creating designs that minimize material waste through efficient use and cutting optimization", "Only using waste materials in joinery", "Designing products that cannot be recycled"],
    correctAnswer: "Creating designs that minimize material waste through efficient use and cutting optimization",
    explanation: "Designing out waste involves creating designs that minimize material waste through efficient use and cutting optimization. This approach considers material efficiency from the earliest design stage, using standard material dimensions, optimizing cutting layouts, and designing components to maximize yield from available materials. Thoughtful design reduces off-cuts and manufacturing waste while potentially lowering material costs."
  },
  {
    id: 'joinery-l3-sustainability13',
    question: "How does a 'material efficiency audit' contribute to sustainability in joinery operations?",
    options: ["It only reviews staff efficiency", "It identifies opportunities to reduce waste, optimize material use, and improve resource efficiency", "It only measures how quickly materials can be processed", "It only calculates material costs"],
    correctAnswer: "It identifies opportunities to reduce waste, optimize material use, and improve resource efficiency",
    explanation: "A material efficiency audit identifies opportunities to reduce waste, optimize material use, and improve resource efficiency. This systematic assessment examines material flows through the workshop, analyzing purchasing practices, storage, cutting processes, offcut management, and waste disposal. The audit identifies areas for improvement, potentially reducing environmental impact while increasing profitability through better resource utilization."
  },
  {
    id: 'joinery-l3-sustainability14',
    question: "Why is timber's thermal mass property significant for sustainable building design?",
    options: ["It makes timber heavier", "It helps regulate interior temperature, reducing heating and cooling demands", "It increases fire risk", "It only affects the timber's appearance"],
    correctAnswer: "It helps regulate interior temperature, reducing heating and cooling demands",
    explanation: "Timber's thermal mass property helps regulate interior temperature, reducing heating and cooling demands. While lower than masonry, timber's ability to absorb, store, and release heat helps moderate temperature fluctuations. When incorporated into joinery elements like wall paneling or structural components, this property contributes to passive design strategies that maintain comfortable indoor environments with reduced energy consumption."
  },
  {
    id: 'joinery-l3-sustainability15',
    question: "What is meant by the 'whole life carbon' assessment of joinery products?",
    options: ["Only measuring the carbon in the timber", "Only assessing carbon emissions during manufacturing", "Evaluating carbon impacts from raw material extraction through manufacturing, use, and end-of-life", "Only measuring carbon emissions during transportation"],
    correctAnswer: "Evaluating carbon impacts from raw material extraction through manufacturing, use, and end-of-life",
    explanation: "Whole life carbon assessment evaluates impacts from raw material extraction through manufacturing, use, and end-of-life. This comprehensive approach considers all carbon emissions throughout a product's complete lifecycle, including maintenance and eventual disposal or recycling. For joinery, this assessment helps identify which design and material choices create the lowest overall carbon footprint beyond just the initial embodied carbon."
  },
  {
    id: 'joinery-l3-sustainability16',
    question: "What environmental benefits does timber have compared to energy-intensive materials like aluminum or PVC?",
    options: ["Timber is always cheaper", "Timber requires less energy to produce and has lower embodied carbon", "Timber is always stronger", "Timber is always more durable"],
    correctAnswer: "Timber requires less energy to produce and has lower embodied carbon",
    explanation: "Timber requires less energy to produce and has lower embodied carbon compared to energy-intensive materials like aluminum or PVC. Wood products typically require significantly less energy during processing and manufacturing (primarily drying and machining) than materials requiring extraction of raw materials and energy-intensive refining or manufacturing processes. Additionally, timber sequesters carbon, further improving its environmental profile."
  },
  {
    id: 'joinery-l3-sustainability17',
    question: "What is the primary purpose of the EU Timber Regulation (EUTR) and UK Timber Regulation (UKTR)?",
    options: ["To increase timber prices", "To prohibit the use of certain timber species entirely", "To prevent illegally harvested timber from entering the market", "To standardize timber sizes across Europe"],
    correctAnswer: "To prevent illegally harvested timber from entering the market",
    explanation: "The EU Timber Regulation (EUTR) and UK Timber Regulation (UKTR) primarily aim to prevent illegally harvested timber from entering the market. These regulations prohibit placing illegally harvested timber on the market and require operators to implement a due diligence system to minimize this risk. For joinery businesses, compliance involves verifying timber sources and maintaining records documenting legal harvest and trade."
  },
  {
    id: 'joinery-l3-sustainability18',
    question: "What does the concept of 'responsible sourcing' mean in joinery?",
    options: ["Only buying the cheapest materials available", "Ensuring materials are obtained in a way that considers environmental, social, and ethical factors", "Only buying materials from local suppliers", "Only purchasing rare and exotic timber species"],
    correctAnswer: "Ensuring materials are obtained in a way that considers environmental, social, and ethical factors",
    explanation: "Responsible sourcing means ensuring materials are obtained in a way that considers environmental, social, and ethical factors. This approach looks beyond just environmental aspects to include social impacts like labor conditions, community rights, and economic sustainability throughout the supply chain. For joinery businesses, responsible sourcing involves supplier assessment, traceability systems, and procurement policies that address these broader sustainability considerations."
  },
  {
    id: 'joinery-l3-sustainability19',
    question: "How does the concept of 'designing for disassembly' contribute to sustainable joinery?",
    options: ["It makes products easier to throw away", "It makes joinery items easier to break", "It allows products to be taken apart at end-of-life, facilitating repair, component replacement, and material recycling", "It only applies to temporary structures"],
    correctAnswer: "It allows products to be taken apart at end-of-life, facilitating repair, component replacement, and material recycling",
    explanation: "Designing for disassembly allows products to be taken apart at end-of-life, facilitating repair, component replacement, and material recycling. This approach uses reversible connections (mechanical joints instead of adhesives), modular components, and easily separable materials. Such design enables future adaptation, extends product lifespan through repair and part replacement, and ensures materials can be properly sorted for recycling or reuse."
  },
  {
    id: 'joinery-l3-sustainability20',
    question: "What is the significance of a 'closed-loop' manufacturing system in joinery?",
    options: ["A system where the workshop is completely enclosed", "A system where waste materials are recaptured and reused in production", "A system that only uses round timber", "A system that only produces circular products"],
    correctAnswer: "A system where waste materials are recaptured and reused in production",
    explanation: "A closed-loop manufacturing system recaptures and reuses waste materials in production. This circular approach aims to eliminate waste by transforming by-products into resources, such as converting sawdust into compressed briquettes for heating, using offcuts for smaller components, or processing wood waste into particleboard. Closed-loop systems reduce both waste disposal and raw material requirements."
  },
  {
    id: 'joinery-l3-sustainability21',
    question: "What is the primary environmental benefit of using water-based finishes instead of solvent-based finishes?",
    options: ["Water-based finishes are always more durable", "Water-based finishes dry faster", "Water-based finishes have lower VOC emissions, reducing air pollution", "Water-based finishes are always less expensive"],
    correctAnswer: "Water-based finishes have lower VOC emissions, reducing air pollution",
    explanation: "The primary environmental benefit of water-based finishes is their lower VOC emissions, reducing air pollution. These finishes use water rather than organic solvents as the carrying agent, significantly reducing harmful emissions during application and drying. Lower VOC content improves indoor air quality, reduces photochemical smog formation, and decreases exposure risks for both applicators and building occupants."
  },
  {
    id: 'joinery-l3-sustainability22',
    question: "What is a 'carbon footprint assessment' in the context of joinery operations?",
    options: ["Measuring the physical footprint of the workshop", "Only calculating the carbon in the timber used", "Measuring the total greenhouse gas emissions associated with the business activities", "Only measuring the distance materials are transported"],
    correctAnswer: "Measuring the total greenhouse gas emissions associated with the business activities",
    explanation: "A carbon footprint assessment measures total greenhouse gas emissions associated with business activities. This evaluation quantifies emissions from energy use, transportation, materials, waste, and other sources, converted to carbon dioxide equivalent (CO₂e). For joinery operations, this assessment helps identify the most significant emission sources and prioritize reduction strategies to minimize climate impact."
  },
  {
    id: 'joinery-l3-sustainability23',
    question: "What does 'biophilic design' mean in the context of sustainable joinery?",
    options: ["Using only biologically grown timber", "Using design approaches that connect people with nature, often through the use of natural materials like timber", "Using only biological adhesives", "Designing only for outdoor use"],
    correctAnswer: "Using design approaches that connect people with nature, often through the use of natural materials like timber",
    explanation: "Biophilic design uses approaches that connect people with nature, often through natural materials like timber. This design philosophy incorporates natural elements, patterns, and experiences into built environments to satisfy humans' innate affinity with nature. In joinery, biophilic design might include showcasing natural wood grain, incorporating organic forms, or creating spaces that reflect natural environments, promoting wellbeing and environmental connection."
  },
  {
    id: 'joinery-l3-sustainability24',
    question: "What is the primary purpose of an 'environmental management policy' for a joinery business?",
    options: ["Only to comply with environmental regulations", "Only to reduce operating costs", "To establish the organization's approach to managing environmental impacts and commitments to improvement", "Only to market the business as environmentally friendly"],
    correctAnswer: "To establish the organization's approach to managing environmental impacts and commitments to improvement",
    explanation: "An environmental management policy establishes the organization's approach to managing environmental impacts and commitments to improvement. This foundational document outlines the business's environmental principles, objectives, responsibilities, and specific commitments. A well-crafted policy provides direction for operational decisions, demonstrates leadership commitment to environmental stewardship, and forms the basis for implementing systematic environmental management."
  },
  {
    id: 'joinery-l3-sustainability25',
    question: "Why is 'energy efficiency' important in sustainable joinery workshop operations?",
    options: ["It only reduces electricity bills", "It only makes machines work faster", "It reduces greenhouse gas emissions and resource consumption", "It is only important in large factories"],
    correctAnswer: "It reduces greenhouse gas emissions and resource consumption",
    explanation: "Energy efficiency is important because it reduces greenhouse gas emissions and resource consumption. Efficient equipment, optimized processes, and good maintenance practices reduce energy use in woodworking machinery, dust extraction, lighting, and heating. This lowers both environmental impact and operational costs. Energy efficiency represents a key component of sustainable workshop operations alongside material efficiency and waste reduction."
  },
  {
    id: 'joinery-l3-sustainability26',
    question: "What does 'upcycling' mean in the context of sustainable joinery?",
    options: ["Recycling materials offsite", "Only using materials from upper-level floors", "Transforming waste or low-value materials into products of higher value or quality", "Using only high-end materials"],
    correctAnswer: "Transforming waste or low-value materials into products of higher value or quality",
    explanation: "Upcycling means transforming waste or low-value materials into products of higher value or quality. This creative reuse approach takes materials that might otherwise be discarded and converts them into desirable products. In joinery, upcycling might involve creating furniture from demolition timber, repurposing architectural salvage, or transforming manufacturing offcuts into decorative objects, adding value while reducing waste."
  },
  {
    id: 'joinery-l3-sustainability27',
    question: "What is the significance of a 'life cycle assessment' (LCA) for joinery products?",
    options: ["It only measures how long products will last", "It only calculates manufacturing costs", "It evaluates environmental impacts throughout the product's entire life from raw material extraction to disposal", "It only applies to kitchen joinery"],
    correctAnswer: "It evaluates environmental impacts throughout the product's entire life from raw material extraction to disposal",
    explanation: "Life cycle assessment evaluates environmental impacts throughout a product's entire life from raw material extraction to disposal. This systematic analysis quantifies resource use and environmental emissions across all stages including raw material extraction, manufacturing, distribution, use, and end-of-life. LCA provides comprehensive understanding of a product's true environmental footprint, identifying where the greatest impacts occur and guiding improvements."
  },
  {
    id: 'joinery-l3-sustainability28',
    question: "What is the importance of proper timber storage in sustainable joinery practices?",
    options: ["It only improves workshop appearance", "Proper storage prevents warping and waste, ensuring efficient material use", "It only matters for expensive timber", "Proper storage only affects timber weight"],
    correctAnswer: "Proper storage prevents warping and waste, ensuring efficient material use",
    explanation: "Proper timber storage prevents warping and waste, ensuring efficient material use. Correct storage conditions protect timber from moisture damage, distortion, fungal attack, and other degradation that would render it unusable. By maintaining material quality until needed, good storage practices reduce replacement needs and waste, contributing to resource efficiency while potentially reducing costs."
  },
  {
    id: 'joinery-l3-sustainability29',
    question: "What is the environmental significance of using timber from 'coppiced woodlands'?",
    options: ["These woodlands produce lower quality timber", "Coppicing is a sustainable forestry practice where trees regenerate from the same stump, providing continuous harvests without replanting", "Coppiced timber always grows faster than plantation timber", "Coppiced woodlands only produce hardwoods"],
    correctAnswer: "Coppicing is a sustainable forestry practice where trees regenerate from the same stump, providing continuous harvests without replanting",
    explanation: "Using timber from coppiced woodlands supports a sustainable forestry practice where trees regenerate from the same stump, providing continuous harvests without replanting. This traditional management technique works with species like hazel, sweet chestnut, and willow that resprout after cutting. Coppicing creates diverse woodland habitats beneficial for wildlife while providing regular timber harvests, making it an environmentally positive source for appropriate joinery applications."
  },
  {
    id: 'joinery-l3-sustainability30',
    question: "What is the primary purpose of a 'waste management hierarchy' in joinery operations?",
    options: ["To determine which waste is most expensive to dispose of", "To prioritize waste management options from most to least environmentally preferable", "To identify which wastes are hazardous", "To determine which waste can be burned"],
    correctAnswer: "To prioritize waste management options from most to least environmentally preferable",
    explanation: "A waste management hierarchy prioritizes options from most to least environmentally preferable. This framework typically ranks options in descending order: prevention, minimization, reuse, recycling, energy recovery, and disposal. For joinery operations, this hierarchy guides decision-making about waste, emphasizing waste prevention through design and efficient processing before considering lesser options like recycling or disposal."
  },
  {
    id: 'joinery-l3-sustainability31',
    question: "What does the term 'biodiversity' mean in relation to timber sourcing?",
    options: ["Using only biodegradable materials", "The variety of different timber species used in a single project", "The variety of plant and animal species and ecosystems supported in forests where timber is harvested", "The biological treatment of timber"],
    correctAnswer: "The variety of plant and animal species and ecosystems supported in forests where timber is harvested",
    explanation: "Biodiversity refers to the variety of plant and animal species and ecosystems supported in forests where timber is harvested. In sustainable timber sourcing, maintaining biodiversity is crucial for forest health and resilience. Responsible forestry practices protect habitat diversity, maintain ecosystem services, and prevent single-species monocultures, ensuring forests remain ecologically functional while providing timber."
  },
  {
    id: 'joinery-l3-sustainability32',
    question: "What is meant by 'carbon leakage' in the context of timber products?",
    options: ["When timber loses its carbon content naturally", "When carbon literally leaks out of timber products", "When carbon emissions are effectively exported by sourcing high-carbon materials from regions with less stringent climate regulations", "When carbon calculations are inaccurate"],
    correctAnswer: "When carbon emissions are effectively exported by sourcing high-carbon materials from regions with less stringent climate regulations",
    explanation: "Carbon leakage occurs when emissions are effectively exported by sourcing high-carbon materials from regions with less stringent climate regulations. In joinery, this might involve using timber from destructively harvested sources in poorly regulated areas instead of certified sustainable sources. Avoiding carbon leakage requires comprehensive supply chain assessment and responsible procurement policies that consider global environmental impacts."
  },
  {
    id: 'joinery-l3-sustainability33',
    question: "What does the term 'ecosystem services' refer to in sustainable forestry for timber production?",
    options: ["Services that repair damaged forest ecosystems", "The benefits humans receive from functioning ecosystems, such as clean air, water regulation, and soil fertility", "A timber delivery service that uses eco-friendly transport", "Computer systems used to monitor forest growth"],
    correctAnswer: "The benefits humans receive from functioning ecosystems, such as clean air, water regulation, and soil fertility",
    explanation: "Ecosystem services refers to the benefits humans receive from functioning ecosystems, such as clean air, water regulation, and soil fertility. Sustainable forestry recognizes these valuable services beyond just timber production. Well-managed forests provide watershed protection, carbon sequestration, erosion control, biodiversity habitat, and recreational opportunities. Sourcing timber from forests managed to maintain these services supports broader environmental health."
  },
  {
    id: 'joinery-l3-sustainability34',
    question: "What is the primary purpose of the Waste Electrical and Electronic Equipment (WEEE) Regulations in a joinery workshop?",
    options: ["They only apply to large manufacturing companies, not joinery workshops", "To ensure the proper disposal and recycling of electrical equipment used in joinery operations", "They only regulate the sale of new electrical equipment", "They only apply to household appliances"],
    correctAnswer: "To ensure the proper disposal and recycling of electrical equipment used in joinery operations",
    explanation: "The WEEE Regulations ensure proper disposal and recycling of electrical equipment used in joinery operations. These regulations require businesses to dispose of electronic waste responsibly, separating it from general waste and ensuring it's processed by authorized treatment facilities. For joinery workshops, this covers equipment like computers, power tools, machinery controls, and lighting, preventing hazardous components from entering landfills while recovering valuable materials."
  },
  {
    id: 'joinery-l3-sustainability35',
    question: "What is the environmental significance of using 'engineered timber products' in joinery?",
    options: ["They are always less sustainable than solid timber", "They can make more efficient use of timber resources by utilizing smaller pieces and otherwise unusable material", "They have no environmental benefits compared to solid timber", "They only have aesthetic advantages over solid timber"],
    correctAnswer: "They can make more efficient use of timber resources by utilizing smaller pieces and otherwise unusable material",
    explanation: "Engineered timber products make more efficient use of timber resources by utilizing smaller pieces and otherwise unusable material. Products like glulam, LVL, and particleboard convert small-diameter trees, offcuts, and processing residues into structural and decorative materials with consistent properties. This approach maximizes resource utilization while potentially reducing waste, though adhesive content and manufacturing energy should also be considered in sustainability assessments."
  },
  {
    id: 'joinery-l3-sustainability36',
    question: "What is the primary environmental benefit of 'natural fiber insulation' in joinery applications?",
    options: ["It is always less expensive than synthetic insulation", "It is renewable, has lower embodied energy, and often biodegradable", "It is always more fire-resistant than synthetic alternatives", "It only improves acoustic properties, not thermal performance"],
    correctAnswer: "It is renewable, has lower embodied energy, and often biodegradable",
    explanation: "Natural fiber insulation is renewable, has lower embodied energy, and is often biodegradable. Materials like wool, hemp, cellulose, and wood fiber derive from renewable sources, require less energy to produce than petroleum-based alternatives, and typically decompose at end-of-life. When used in joinery applications like door cores, cabinet backing, or architectural elements, these materials reduce environmental impact while providing effective thermal and acoustic performance."
  },
  {
    id: 'joinery-l3-sustainability37',
    question: "What is the environmental importance of 'sourcing secondary materials' in joinery?",
    options: ["Secondary materials are always stronger than primary materials", "Using secondary (recycled or reclaimed) materials reduces pressure on virgin resources and avoids waste disposal impacts", "Secondary materials are always less expensive", "It only applies to metal components, not timber"],
    correctAnswer: "Using secondary (recycled or reclaimed) materials reduces pressure on virgin resources and avoids waste disposal impacts",
    explanation: "Sourcing secondary materials reduces pressure on virgin resources and avoids waste disposal impacts. Incorporating recycled or reclaimed materials like reclaimed timber, recycled metal hardware, or repurposed components diverts materials from waste streams while reducing demand for new resource extraction and processing. This approach supports circular economy principles and typically represents a lower environmental footprint than using newly produced materials."
  },
  {
    id: 'joinery-l3-sustainability38',
    question: "What is the significance of 'product warranties' in sustainable joinery?",
    options: ["They only protect against manufacturing defects", "They only limit company liability", "Longer warranties encourage design for durability and longevity, supporting sustainability through extended product life", "Warranties have no connection to sustainability"],
    correctAnswer: "Longer warranties encourage design for durability and longevity, supporting sustainability through extended product life",
    explanation: "Longer warranties encourage design for durability and longevity, supporting sustainability through extended product life. Offering substantial warranty periods motivates manufacturers to create products that withstand extended use, which inherently supports sustainability by reducing replacement frequency and associated resource consumption. Durable, long-lasting joinery products embody less carbon per year of service life than frequently replaced alternatives."
  },
  {
    id: 'joinery-l3-sustainability39',
    question: "What are 'green building rating systems' and why are they relevant to joinery businesses?",
    options: ["Rating systems only for green-colored buildings", "Systems that only focus on energy efficiency", "Frameworks that assess building environmental performance across multiple criteria, creating market demand for sustainable joinery products", "Systems that only apply to commercial buildings"],
    correctAnswer: "Frameworks that assess building environmental performance across multiple criteria, creating market demand for sustainable joinery products",
    explanation: "Green building rating systems are frameworks that assess building environmental performance across multiple criteria, creating market demand for sustainable joinery products. Programs like BREEAM, LEED, and the Home Quality Mark award points for sustainable materials, certified timber, low-emission products, and resource efficiency. Understanding these systems helps joinery businesses develop products that contribute to certification points, opening markets while supporting environmental improvements."
  },
  {
    id: 'joinery-l3-sustainability40',
    question: "What is 'value engineering' in sustainable joinery, and how does it relate to environmental impact?",
    options: ["Increasing a product's monetary value regardless of environmental impact", "Only reducing manufacturing costs", "The process of analyzing designs to maximize value by balancing function, quality, and environmental impact at optimal cost", "Only using the cheapest materials available"],
    correctAnswer: "The process of analyzing designs to maximize value by balancing function, quality, and environmental impact at optimal cost",
    explanation: "Value engineering in sustainable joinery analyzes designs to maximize value by balancing function, quality, and environmental impact at optimal cost. This systematic approach examines alternatives that maintain essential functionality while reducing unnecessary environmental impacts or costs. Effective value engineering identifies opportunities for material reduction, simplifies manufacturing processes, or substitutes lower-impact materials without compromising quality or performance."
  },
  {
    id: 'joinery-l3-sustainability41',
    question: "What does the concept of 'material transparency' mean in sustainable joinery?",
    options: ["Using only transparent materials like glass", "Only using materials that are physically see-through", "Being open and clear about the content, origin, and environmental impact of materials used", "Only using materials that are easily visible"],
    correctAnswer: "Being open and clear about the content, origin, and environmental impact of materials used",
    explanation: "Material transparency means being open and clear about the content, origin, and environmental impact of materials used. This principle involves providing comprehensive information about material composition, manufacturing processes, and supply chain practices. Transparency enables informed decision-making by clients and specifiers, supporting accountability, encouraging continuous improvement, and building trust regarding environmental claims."
  },
  {
    id: 'joinery-l3-sustainability42',
    question: "Why is 'dust extraction' important from both operational and environmental perspectives in joinery workshops?",
    options: ["It only keeps the workshop cleaner", "It only reduces fire risk", "It protects worker health, prevents environmental pollution, and enables wood waste recovery", "It is only required by regulations"],
    correctAnswer: "It protects worker health, prevents environmental pollution, and enables wood waste recovery",
    explanation: "Dust extraction protects worker health, prevents environmental pollution, and enables wood waste recovery. Effective systems remove harmful airborne particles from the workplace, preventing occupational health issues while preventing fine dust from escaping to the external environment. Additionally, collected wood waste can be consolidated for reuse applications like fuel briquettes or agricultural bedding, supporting resource efficiency."
  },
  {
    id: 'joinery-l3-sustainability43',
    question: "What is a 'sustainable procurement policy' in the context of joinery businesses?",
    options: ["A policy only focusing on buying the cheapest materials", "A policy that only buys materials in bulk", "A documented approach to purchasing that considers environmental, social, and economic factors alongside traditional criteria like price and quality", "A policy that only applies to large businesses"],
    correctAnswer: "A documented approach to purchasing that considers environmental, social, and economic factors alongside traditional criteria like price and quality",
    explanation: "A sustainable procurement policy is a documented approach to purchasing that considers environmental, social, and economic factors alongside traditional criteria like price and quality. For joinery businesses, this framework guides decisions about material sourcing, supplier selection, and purchasing processes. Well-developed policies include criteria for preferring certified timber, locally-sourced materials, reduced packaging, and suppliers with strong environmental credentials."
  },
  {
    id: 'joinery-l3-sustainability44',
    question: "What does the concept of 'designing for adaptability' mean in sustainable joinery?",
    options: ["Making products that can only be used outdoors", "Creating products that can be easily modified, reconfigured, or repurposed as needs change", "Only using adjustable-height components", "Designing products that automatically adapt to temperature changes"],
    correctAnswer: "Creating products that can be easily modified, reconfigured, or repurposed as needs change",
    explanation: "Designing for adaptability means creating products that can be easily modified, reconfigured, or repurposed as needs change. This approach anticipates future changes in user requirements through modular components, standardized dimensions, and flexible configurations. Adaptable joinery extends useful life by accommodating changing needs without complete replacement, reducing waste and resource consumption while potentially providing better long-term value."
  },
  {
    id: 'joinery-l3-sustainability45',
    question: "What environmental benefit can 'just-in-time' manufacturing provide in joinery operations?",
    options: ["It only improves delivery times", "It reduces waste from obsolete stock and minimizes storage requirements", "It only increases production speed", "It only applies to large manufacturers"],
    correctAnswer: "It reduces waste from obsolete stock and minimizes storage requirements",
    explanation: "Just-in-time manufacturing reduces waste from obsolete stock and minimizes storage requirements. This production approach manufactures components specifically for current orders rather than for inventory, reducing material deterioration in storage, preventing waste from design changes that could render stock obsolete, and minimizing the environmental footprint of warehouse space. For joinery businesses, this approach can improve resource efficiency while reducing storage costs."
  },
  {
    id: 'joinery-l3-sustainability46',
    question: "What is the environmental significance of 'specifying local species' for joinery projects?",
    options: ["Local species always have more attractive grain patterns", "Local species are always less expensive", "Using local species reduces transportation impacts and supports regional forestry adapted to local conditions", "Local species are always more durable"],
    correctAnswer: "Using local species reduces transportation impacts and supports regional forestry adapted to local conditions",
    explanation: "Specifying local species reduces transportation impacts and supports regional forestry adapted to local conditions. Using timber varieties naturally occurring in the region minimizes shipping distances, reducing fuel consumption and associated emissions. Additionally, this approach supports forest management practices suited to local ecosystems and climate conditions, potentially encouraging biodiversity while preserving regional woodland character."
  },
  {
    id: 'joinery-l3-sustainability47',
    question: "What is the concept of 'embedded energy' in joinery materials?",
    options: ["The amount of electricity needed to power joinery tools", "The potential energy stored in springs or mechanisms within joinery", "The total energy consumed throughout the material's lifecycle, from extraction or harvesting through processing and manufacturing", "Energy directly stored within the atomic structure of materials"],
    correctAnswer: "The total energy consumed throughout the material's lifecycle, from extraction or harvesting through processing and manufacturing",
    explanation: "Embedded energy refers to the total energy consumed throughout a material's lifecycle, from extraction or harvesting through processing and manufacturing. This concept quantifies the cumulative energy investments in materials before they reach the workshop. Understanding embedded energy helps joiners compare material options, potentially choosing those with lower energy footprints, such as locally-sourced timber over energy-intensive or heavily processed alternatives."
  },
  {
    id: 'joinery-l3-sustainability48',
    question: "What is the environmental benefit of 'designing for standard material dimensions' in joinery?",
    options: ["It only simplifies manufacturing", "It only reduces manufacturing time", "It reduces offcuts and material waste by maximizing yield from standard sheet and timber sizes", "Standard dimensions are always more aesthetically pleasing"],
    correctAnswer: "It reduces offcuts and material waste by maximizing yield from standard sheet and timber sizes",
    explanation: "Designing for standard material dimensions reduces offcuts and material waste by maximizing yield from standard sheet and timber sizes. By creating designs that efficiently utilize available materials without excessive trimming, this approach minimizes waste generation while potentially reducing material costs. For sheet materials especially, designing to module sizes significantly improves material utilization compared to designs requiring substantial cutting adjustments."
  },
  {
    id: 'joinery-l3-sustainability49',
    question: "What is the significance of 'third-party verification' for environmental claims about joinery products?",
    options: ["It only increases product cost", "It always guarantees a product is sustainable", "It provides independent assessment and credibility for environmental claims, reducing greenwashing", "It is only required for exported products"],
    correctAnswer: "It provides independent assessment and credibility for environmental claims, reducing greenwashing",
    explanation: "Third-party verification provides independent assessment and credibility for environmental claims, reducing greenwashing. This external validation through recognized certification bodies or testing organizations ensures claims about sustainability performance are substantiated rather than merely promotional. For joinery products, such verification might include certifications for sustainable timber sourcing, emissions testing for finished products, or environmental management system assessment."
  },
  {
    id: 'joinery-l3-sustainability50',
    question: "How does 'preventative maintenance' of joinery equipment contribute to environmental sustainability?",
    options: ["It only extends tool warranties", "It only reduces repair costs", "Regular maintenance improves energy efficiency, extends equipment life, and reduces resource consumption", "It only applies to electric equipment"],
    correctAnswer: "Regular maintenance improves energy efficiency, extends equipment life, and reduces resource consumption",
    explanation: "Preventative maintenance improves energy efficiency, extends equipment life, and reduces resource consumption. Well-maintained machinery operates more efficiently, consuming less energy while producing less waste. Regular maintenance also extends the useful life of equipment, delaying replacement and associated manufacturing impacts. This systematic approach to equipment care represents good environmental practice alongside operational benefits like improved productivity and reduced downtime."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-sustainability', 'items', q.id), {
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