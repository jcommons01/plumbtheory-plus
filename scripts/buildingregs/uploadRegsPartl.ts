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

// ✅ Building Regulations Part L - Conservation of Power Questions
const questions = [
  {
    id: 'regs-part-l-1',
    question: "What is the primary focus of Approved Document L of the Building Regulations?",
    options: ["Structural safety", "Fire protection", "Conservation of fuel and power", "Ventilation requirements"],
    correctAnswer: "Conservation of fuel and power",
    explanation: "Approved Document L focuses on the conservation of fuel and power in buildings. It sets standards for energy efficiency in both new and existing buildings to reduce carbon emissions and energy consumption. The document contains requirements for insulation, air tightness, heating systems, lighting efficiency, and renewable energy technologies, all aimed at improving the overall energy performance of buildings while reducing their environmental impact and operational costs."
  },
  {
    id: 'regs-part-l-2',
    question: "How many volumes does Approved Document L consist of in the 2021 edition?",
    options: ["One volume covering all buildings", "Two volumes: one for dwellings and one for non-dwellings", "Three volumes organized by building age", "Four volumes organized by building type"],
    correctAnswer: "Two volumes: one for dwellings and one for non-dwellings",
    explanation: "The 2021 edition of Approved Document L consists of two volumes: Volume 1 covers dwellings (homes, apartments, etc.), while Volume 2 covers buildings other than dwellings (commercial, industrial, public buildings, etc.). This division allows for tailored requirements that acknowledge the different energy usage patterns, occupancy schedules, and design considerations between residential and non-residential buildings. Each volume contains specific requirements and calculation methodologies appropriate to the building types it covers."
  },
  {
    id: 'regs-part-l-3',
    question: "By approximately what percentage does Part L 2021 aim to reduce carbon emissions from new dwellings compared to previous standards?",
    options: ["10%", "20%", "30%", "50%"],
    correctAnswer: "30%",
    explanation: "The 2021 edition of Part L aims to reduce carbon emissions from new dwellings by approximately 30% compared to the previous 2013 standards. This significant reduction is part of the UK government's strategy to progressively improve building energy efficiency on the path toward achieving net zero carbon buildings. The higher standard is achieved through more stringent requirements for thermal elements (walls, roofs, floors), more efficient heating systems, better controls, and the integration of low and zero carbon technologies where appropriate."
  },
  {
    id: 'regs-part-l-4',
    question: "What is a SAP calculation in the context of Part L compliance?",
    options: ["Structural Analysis Protocol", "System Approval Process", "Standard Assessment Procedure", "Sustainable Architecture Planning"],
    correctAnswer: "Standard Assessment Procedure",
    explanation: "A SAP (Standard Assessment Procedure) calculation is the methodology used to assess and compare the energy and environmental performance of dwellings in the UK. It's the government's standard method for demonstrating compliance with Part L for new dwellings. SAP calculations produce a score from 1-100+ (higher being better) that indicates the energy efficiency of a dwelling, as well as an Environmental Impact Rating. SAP calculations consider factors such as insulation levels, heating system efficiency, ventilation, solar gains, and renewable technologies to estimate annual energy consumption and CO2 emissions."
  },
  {
    id: 'regs-part-l-5',
    question: "What is the non-domestic equivalent of SAP calculations used for Part L compliance?",
    options: ["BREEAM", "SBEM", "LEED", "EPC"],
    correctAnswer: "SBEM",
    explanation: "SBEM (Simplified Building Energy Model) is the equivalent of SAP calculations used for non-domestic buildings to demonstrate compliance with Part L requirements. It's a computer modeling tool used to calculate the energy performance of non-domestic buildings by analyzing building geometry, construction, HVAC systems, lighting, and renewable energy technologies. SBEM produces reports on energy consumption, carbon dioxide emissions, and provides compliance checking against the Building Regulations requirements. For more complex buildings, Dynamic Simulation Models (DSMs) might be used as an alternative to SBEM."
  },
  {
    id: 'regs-part-l-6',
    question: "What is a 'Notional Building' in the context of Part L compliance?",
    options: ["An obsolete building scheduled for demolition", "A real reference building in the same location", "A theoretical building with the same dimensions but Part L-compliant specifications", "A hypothetical zero-carbon building"],
    correctAnswer: "A theoretical building with the same dimensions but Part L-compliant specifications",
    explanation: "A 'Notional Building' is a theoretical reference building with the same size, shape, and usage pattern as the actual proposed building, but with standardized Part L-compliant specifications for elements like insulation, glazing, and building services. The energy performance of the proposed building design is compared against this notional building to determine compliance. The notional building effectively sets a target energy performance that the actual design must meet or exceed. This approach allows flexible design solutions while ensuring minimum energy performance standards are achieved."
  },
  {
    id: 'regs-part-l-7',
    question: "What are U-values in the context of Part L?",
    options: ["Units of renewable energy production", "Measurements of usable floor space", "Measurements of heat transfer through building elements", "Underfloor heating specifications"],
    correctAnswer: "Measurements of heat transfer through building elements",
    explanation: "U-values measure the rate of heat transfer through a building element (such as a wall, floor, or roof) in watts per square meter per degree of temperature difference (W/m²K). Lower U-values indicate better insulation performance and reduced heat loss. Part L specifies maximum U-values for different building elements to ensure adequate thermal performance. For example, under Part L 2021, external walls in new dwellings typically need to achieve a U-value of 0.18 W/m²K or better, representing a significant improvement over previous standards."
  },
  {
    id: 'regs-part-l-8',
    question: "What is the 'fabric first' approach emphasized in Part L 2021?",
    options: ["Using sustainable textiles in building interiors", "Prioritizing improved insulation and air tightness before adding renewable technologies", "Selecting decorative facades based on environmental impact", "Building with natural materials like wood and stone"],
    correctAnswer: "Prioritizing improved insulation and air tightness before adding renewable technologies",
    explanation: "The 'fabric first' approach emphasized in Part L 2021 involves prioritizing improvements to the building envelope (walls, roof, floor, windows) through enhanced insulation, reduced thermal bridging, and improved air tightness before considering the addition of renewable energy technologies. This approach recognizes that reducing energy demand through better building fabric is generally more cost-effective and reliable than generating renewable energy to meet excessive demand. Part L 2021 has significantly tightened fabric performance standards to reflect this principle, ensuring buildings are fundamentally energy efficient before relying on technology solutions."
  },
  {
    id: 'regs-part-l-9',
    question: "What is thermal bridging in the context of Part L?",
    options: ["A heating system that connects multiple buildings", "Areas where heat transfers more rapidly through the building envelope", "A technique for joining different insulation materials", "A method of transferring heat from one room to another"],
    correctAnswer: "Areas where heat transfers more rapidly through the building envelope",
    explanation: "Thermal bridging refers to areas in the building envelope where heat flows more rapidly, bypassing the insulation and creating a 'bridge' for heat loss. Common thermal bridges include junctions between walls and floors, window reveals, and structural elements like steel beams that penetrate insulation. Part L requires designers to minimize thermal bridging by following accredited construction details (ACDs) or calculating specific junction details. Reducing thermal bridging is crucial because these areas can account for up to 30% of heat loss in well-insulated buildings, significantly affecting energy efficiency and potentially causing condensation and mold issues."
  },
  {
    id: 'regs-part-l-10',
    question: "What does Part L 2021 require regarding air permeability testing for new dwellings?",
    options: ["Testing is optional for small developments", "Testing of every new dwelling", "Testing of just one dwelling per development", "Testing only for buildings over three stories"],
    correctAnswer: "Testing of every new dwelling",
    explanation: "Part L 2021 requires air permeability testing of every new dwelling, a significant change from previous regulations which allowed sample testing. Air permeability testing (also called air tightness or air leakage testing) measures how much air leaks through the building fabric. The test typically involves pressurizing the building and measuring the air flow needed to maintain a pressure difference. Results are expressed in m³/(h.m²) at 50 Pascals pressure. The 2021 regulations set more stringent targets for air permeability, typically requiring a result of 5 m³/(h.m²) or better, with best practice often aiming for 3 m³/(h.m²) or lower."
  },
  {
    id: 'regs-part-l-11',
    question: "What is the 'Primary Energy Rate' introduced in Part L 2021?",
    options: ["The cost of electricity from the main supplier", "The efficiency rating of the primary heating system", "A measure of total energy use including energy used to produce and deliver energy to the building", "The energy generated from primary renewable sources"],
    correctAnswer: "A measure of total energy use including energy used to produce and deliver energy to the building",
    explanation: "The Primary Energy Rate introduced in Part L 2021 is a measure of the total energy use of a building, including both the energy consumed on-site and the energy used upstream to extract, process, and deliver that energy to the building. This provides a more comprehensive picture of environmental impact than just considering on-site energy use. For compliance, the calculated Primary Energy Rate must not exceed the Target Primary Energy Rate. This new metric aligns with international standards and emphasizes the importance of both energy efficiency and selecting energy sources with lower upstream impacts, such as renewable electricity instead of fossil fuels."
  },
  {
    id: 'regs-part-l-12',
    question: "What is the 'Target Emission Rate' (TER) in Part L?",
    options: ["The actual carbon emissions of the building once constructed", "The minimum reduction in emissions required compared to Part L 2010", "The maximum allowed carbon dioxide emission rate from a notional equivalent building", "The target for renewable energy generation on site"],
    correctAnswer: "The maximum allowed carbon dioxide emission rate from a notional equivalent building",
    explanation: "The Target Emission Rate (TER) is the maximum allowed carbon dioxide emission rate from a notional equivalent building that complies with Part L standards. It's expressed in kilograms of CO2 per square meter of floor area per year (kgCO2/m²/year). For compliance, the calculated Dwelling Emission Rate (DER) or Building Emission Rate (BER) for the actual design must not exceed the TER. The TER is calculated using standardized assumptions about the building's fabric, services, and pattern of use, providing a benchmark that allows different designs to be compared fairly while ensuring minimum performance standards are met."
  },
  {
    id: 'regs-part-l-13',
    question: "What is the purpose of an Energy Performance Certificate (EPC) in relation to Part L?",
    options: ["To provide design guidance for architects", "To demonstrate compliance with Building Regulations", "To inform potential buyers or tenants about the energy efficiency of a building", "To calculate the renewable energy potential of a site"],
    correctAnswer: "To inform potential buyers or tenants about the energy efficiency of a building",
    explanation: "An Energy Performance Certificate (EPC) informs potential buyers or tenants about the energy efficiency of a building using a rating from A (most efficient) to G (least efficient). While EPCs are related to Part L as they use similar calculation methodologies (SAP for dwellings), their primary purpose is not to demonstrate Building Regulations compliance but to provide transparency in the property market. EPCs include the energy efficiency rating, estimated energy costs, and recommendations for improvements. They are legally required when selling, renting, or constructing buildings. Under Part L 2021, new buildings are typically expected to achieve an A or B rating."
  },
  {
    id: 'regs-part-l-14',
    question: "What are the transitional arrangements for the Part L 2021 regulations?",
    options: ["They apply immediately to all construction", "They apply only to projects starting after June 2023", "They don't apply to work where building notice or full plans were submitted before June 2022, provided work starts before June 2023", "They are optional until 2025"],
    correctAnswer: "They don't apply to work where building notice or full plans were submitted before June 2022, provided work starts before June 2023",
    explanation: "The transitional arrangements for Part L 2021 state that the new regulations don't apply to building work where a building notice, initial notice, or full plans were submitted to the local authority before June 15, 2022, provided the building work commences before June 15, 2023. This one-year transition period gives the industry time to adapt to the new requirements. For phased developments, the transitional provisions apply only to individual buildings where work has commenced, not to the entire development. Once this transition period ends, all new buildings must comply with the 2021 standards regardless of when they were designed or approved."
  },
  {
    id: 'regs-part-l-15',
    question: "What is the 'as-built' SAP calculation required under Part L?",
    options: ["A design calculation using assumed values", "A calculation based on the actual constructed building, including any changes from the design", "A calculation of the building's embodied carbon", "A predicted energy usage based on occupant behavior"],
    correctAnswer: "A calculation based on the actual constructed building, including any changes from the design",
    explanation: "The 'as-built' SAP calculation is based on the actual constructed building, incorporating any changes made during construction that may differ from the original design. This final assessment is required to verify compliance with Part L and to produce the Energy Performance Certificate (EPC). It includes actual product specifications used, air permeability test results, and details of any variations from the design. The as-built assessment ensures that the completed building meets the energy performance standards, not just the design on paper. Significant discrepancies between design and as-built calculations may require remedial work to achieve compliance."
  },
  {
    id: 'regs-part-l-16',
    question: "What heating system fuel is being phased out for new homes under future building regulations following Part L 2021?",
    options: ["Electricity", "Natural gas", "Biomass", "District heating"],
    correctAnswer: "Natural gas",
    explanation: "Natural gas heating systems are being phased out for new homes under future building regulations following Part L 2021. The government has indicated that from 2025, new homes will not be permitted to install gas boilers, as part of the Future Homes Standard. Part L 2021 represents a stepping stone toward this goal, with tightened carbon emissions standards making it increasingly difficult to comply using gas heating. The regulations encourage the adoption of low-carbon alternatives such as heat pumps, which are expected to become the predominant heating technology for new homes. This transition aims to significantly reduce residential carbon emissions in line with the UK's net zero targets."
  },
  {
    id: 'regs-part-l-17',
    question: "When renovating existing buildings, what is the 'consequential improvements' requirement under Part L?",
    options: ["All improvements must be completed within 5 years", "Upgrading the entire building to current standards", "Making additional energy efficiency improvements beyond the area being renovated", "Consequential improvements are optional if the building is pre-1919"],
    correctAnswer: "Making additional energy efficiency improvements beyond the area being renovated",
    explanation: "The 'consequential improvements' requirement under Part L mandates making additional energy efficiency improvements beyond the area being renovated when certain conditions are met. This typically applies to larger non-domestic buildings (over 1000m²) when they undergo significant work such as extensions or the installation of new services. The requirement ensures that opportunities to improve the overall energy performance of existing buildings are taken when substantial work is already planned. These additional improvements might include upgrading insulation, replacing inefficient heating systems, or improving controls. The cost of consequential improvements is generally expected to be proportionate to the cost of the primary works."
  },
  {
    id: 'regs-part-l-18',
    question: "What is the minimum renewable energy contribution recommended for new non-domestic buildings under Part L 2021?",
    options: ["No specific minimum is mandated", "10% of energy demand", "15% of energy demand", "20% of energy demand"],
    correctAnswer: "No specific minimum is mandated",
    explanation: "Under Part L 2021, no specific minimum renewable energy contribution is mandated as a fixed percentage for new non-domestic buildings. Instead, the regulations take a performance-based approach where the building must meet overall energy efficiency and carbon emission targets. Renewable energy can help meet these targets, but the regulations don't prescribe how much must be used. This approach allows designers flexibility to find the most appropriate and cost-effective solutions for each project, which might include a combination of fabric improvements, efficient services, and renewable technologies based on site-specific opportunities and constraints."
  },
  {
    id: 'regs-part-l-19',
    question: "What does Part L require regarding the energy efficiency of fixed building services?",
    options: ["They must be A-rated appliances", "They must meet or exceed minimum efficiency standards specified in the Domestic or Non-Domestic Building Services Compliance Guides", "They must be from UK manufacturers", "They must have smart controls installed"],
    correctAnswer: "They must meet or exceed minimum efficiency standards specified in the Domestic or Non-Domestic Building Services Compliance Guides",
    explanation: "Part L requires that fixed building services (such as heating, cooling, ventilation, and lighting systems) must meet or exceed the minimum efficiency standards specified in the Domestic or Non-Domestic Building Services Compliance Guides. These guides provide detailed technical specifications for different types of equipment, including seasonal efficiency ratings for boilers, coefficient of performance (COP) for heat pumps, and efficacy for lighting systems. The requirements cover not just the equipment itself but also controls, sizing, and commissioning to ensure optimal performance. Regular updates to these guides progressively raise standards to reflect technological improvements and market availability of more efficient systems."
  },
  {
    id: 'regs-part-l-20',
    question: "What does Part L mean by 'thermal elements' in buildings?",
    options: ["Heating systems and radiators", "Walls, floors, and roofs that separate heated spaces from the outside or unheated areas", "Areas of the building exposed to direct sunlight", "Special materials that change phase to store heat"],
    correctAnswer: "Walls, floors, and roofs that separate heated spaces from the outside or unheated areas",
    explanation: "In Part L, 'thermal elements' refers to walls, floors, and roofs that separate heated spaces from the outside environment or from unheated areas within the building. These elements form the thermal envelope that controls heat loss and gain. Part L sets maximum U-values (heat transfer coefficients) for thermal elements in new buildings and when thermal elements are being renovated or replaced in existing buildings. For example, when renovating more than 50% of a thermal element's surface area, the entire element must be upgraded to meet specified U-values. This approach ensures that opportunities to improve thermal performance are taken during refurbishment works."
  },
  {
    id: 'regs-part-l-21',
    question: "What is the 'Dwelling Fabric Energy Efficiency (DFEE) rate' in Part L?",
    options: ["The rate at which fabrics in furnishings deteriorate", "The measure of a dwelling's energy efficiency based purely on its fabric (insulation, windows, etc.)", "The percentage of recycled materials used in construction", "The efficiency of the textile manufacturing process"],
    correctAnswer: "The measure of a dwelling's energy efficiency based purely on its fabric (insulation, windows, etc.)",
    explanation: "The Dwelling Fabric Energy Efficiency (DFEE) rate is a measure of a dwelling's energy efficiency based purely on its fabric elements - the insulation, windows, thermal bridging, and air tightness - independent of the heating system or renewable technologies. It's measured in kWh/m²/year and represents the energy needed to maintain comfortable internal conditions. For compliance, the calculated DFEE must not exceed the Target Fabric Energy Efficiency (TFEE) rate. This metric was introduced to ensure focus on creating fundamentally efficient building envelopes rather than relying on efficient services or renewable technologies to compensate for poor fabric performance, which aligns with the 'fabric first' principle."
  },
  {
    id: 'regs-part-l-22',
    question: "What is the purpose of Simplified Building Energy Models (SBEM) in Part L compliance?",
    options: ["To simplify architectural plans for planning applications", "To calculate the energy performance of non-domestic buildings", "To estimate construction costs related to energy systems", "To provide simplified training for building operators"],
    correctAnswer: "To calculate the energy performance of non-domestic buildings",
    explanation: "Simplified Building Energy Models (SBEM) are used to calculate the energy performance of non-domestic buildings for Part L compliance. SBEM is a computer-based calculation methodology that analyzes the building's geometry, construction, HVAC systems, lighting, and other energy-using features to predict energy consumption and carbon emissions. It produces the Building Emission Rate (BER) and Primary Energy Rate, which are compared against targets for compliance checking. SBEM is suitable for relatively straightforward buildings; for more complex structures with advanced features like atria or complex HVAC systems, more sophisticated Dynamic Simulation Models (DSMs) may be required instead."
  },
  {
    id: 'regs-part-l-23',
    question: "What consideration does Part L give to overheating risk in buildings?",
    options: ["None, as it focuses only on winter energy use", "It requires detailed overheating analysis for all buildings", "It requires consideration of solar gains and potential overheating, with detailed assessment in higher-risk cases", "It only addresses overheating in air-conditioned buildings"],
    correctAnswer: "It requires consideration of solar gains and potential overheating, with detailed assessment in higher-risk cases",
    explanation: "Part L requires consideration of solar gains and potential overheating risk, with more detailed assessment required in higher-risk cases. This is important because well-insulated, airtight buildings designed to minimize winter heat loss can be prone to summer overheating if not properly designed. SAP calculations include a preliminary overheating check, and buildings identified as high risk may require more detailed dynamic thermal modeling. From June 2022, this has been supplemented by the new Part O specifically addressing overheating mitigation. Good design should balance winter energy efficiency with summer comfort through appropriate glazing specification, shading, thermal mass, and ventilation strategies."
  },
  {
    id: 'regs-part-l-24',
    question: "What does Part L require regarding the commissioning of building services?",
    options: ["Commissioning is optional for residential buildings", "Services must be properly commissioned and documentation provided to the building control body", "Only heating systems require commissioning", "Commissioning is only required for buildings over 1000m²"],
    correctAnswer: "Services must be properly commissioned and documentation provided to the building control body",
    explanation: "Part L requires that all fixed building services (including heating, cooling, ventilation, and lighting systems) must be properly commissioned to ensure they operate efficiently as designed. Commissioning involves testing, adjusting, and balancing systems after installation and before handover. Documentation of the commissioning process must be provided to the building control body as evidence of compliance. This requirement recognizes that even well-designed and specified systems will not perform efficiently if not properly set up and adjusted. Poor commissioning can result in energy wastage, reduced comfort, and increased operational costs, undermining the energy efficiency goals of the regulations."
  },
  {
    id: 'regs-part-l-25',
    question: "What information must be provided to building owners/occupants under Part L requirements?",
    options: ["Only emergency contact information for services", "Operating and maintenance instructions for services plus the building's energy performance specifications", "Just the EPC certificate", "No information is required to be provided"],
    correctAnswer: "Operating and maintenance instructions for services plus the building's energy performance specifications",
    explanation: "Under Part L, building owners or occupants must be provided with operating and maintenance instructions for the building services, along with information about the building's energy performance specifications. This typically includes user manuals for heating, ventilation, and cooling systems; maintenance schedules; energy performance data; and information on how to operate controls efficiently. The goal is to ensure that building users understand how to operate the building as intended, maintaining energy efficiency throughout its life. Evidence that this information has been provided is typically required by building control bodies before issuing a completion certificate."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-l', 'items', q.id), {
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
