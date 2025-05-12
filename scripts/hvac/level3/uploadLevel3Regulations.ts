// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Regulations.ts

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

// ✅ HVAC Level 3 Environmental Regulations Questions
const questions = [
  {
    id: 'hvac-l3-regulations1',
    question: "Under the Environmental Protection Act 1990, what is the 'Duty of Care' requirement for businesses handling controlled waste?",
    options: ["To recycle at least 50% of all waste", "To prevent the escape of waste, ensure transfer to an authorized person, and maintain proper documentation", "To report all waste generation to the Environment Agency monthly", "To eliminate all hazardous waste production within 5 years"],
    correctAnswer: "To prevent the escape of waste, ensure transfer to an authorized person, and maintain proper documentation",
    explanation: "The 'Duty of Care' under Section 34 of the Environmental Protection Act 1990 requires businesses to prevent the escape of waste, ensure waste is only transferred to authorized persons, and maintain proper documentation (waste transfer notes) for at least 2 years. This applies to all controlled waste, which includes commercial, industrial, and household waste. HVAC contractors must comply with these requirements when disposing of waste refrigerants, oils, packaging, and equipment components."
  },
  {
    id: 'hvac-l3-regulations2',
    question: "What is the primary purpose of the EU Ecodesign Directive as it applies to HVAC equipment in the UK?",
    options: ["To reduce the overall cost of HVAC equipment", "To set maximum noise levels for all HVAC systems", "To establish minimum energy efficiency requirements for energy-related products", "To standardize equipment dimensions across all manufacturers"],
    correctAnswer: "To establish minimum energy efficiency requirements for energy-related products",
    explanation: "The EU Ecodesign Directive (2009/125/EC), which is retained in UK law post-Brexit, establishes minimum energy efficiency requirements for energy-related products. For HVAC systems, this includes minimum efficiency standards for heat pumps, air conditioners, ventilation units, boilers, and water heaters. The directive aims to eliminate the least efficient products from the market, driving continual improvement in energy performance while reducing greenhouse gas emissions and energy consumption across the product lifecycle."
  },
  {
    id: 'hvac-l3-regulations3',
    question: "Under the UK's F-Gas Regulations, what is the global warming potential (GWP) threshold beyond which stationary refrigeration equipment will be banned from using certain HFCs from January 2025?",
    options: ["150", "750", "1500", "2500"],
    correctAnswer: "2500",
    explanation: "Under the UK's F-Gas Regulations, stationary refrigeration equipment with a GWP threshold of 2500 or higher will be banned from January 2025. This affects common refrigerants like R404A (GWP 3922) and R507 (GWP 3985). The regulations implement a phased approach to refrigerant restrictions, with progressively stricter GWP limits over time to reduce environmental impact. HVAC professionals must plan for system retrofits or replacements with lower-GWP alternatives like R448A, R449A, or natural refrigerants."
  },
  {
    id: 'hvac-l3-regulations4',
    question: "What does the Medium Combustion Plant Directive (MCPD) regulate in the UK?",
    options: ["CO2 emissions from industrial refrigeration", "F-Gas use in heat pumps", "Emissions from combustion plants with a rated thermal input between 1 and 50 MW", "Wastewater discharge from cooling towers"],
    correctAnswer: "Emissions from combustion plants with a rated thermal input between 1 and 50 MW",
    explanation: "The Medium Combustion Plant Directive (MCPD) regulates emissions (particularly NOx, SO2, and dust) from combustion plants with a rated thermal input between 1 and 50 MW. This includes many industrial boilers, engines, and turbines used in larger HVAC applications. The MCPD requires these plants to be registered or permitted, sets emission limit values, and mandates regular emissions monitoring. For HVAC professionals, this requires consideration of emission controls and monitoring equipment when designing, installing, or maintaining affected systems."
  },
  {
    id: 'hvac-l3-regulations5',
    question: "Under the Environmental Permitting Regulations (England and Wales), which of the following HVAC activities might require an environmental permit?",
    options: ["Installing a domestic air conditioner", "Servicing a commercial refrigeration system", "Operating a large-scale cooling tower system", "Replacing an air filter in an air handling unit"],
    correctAnswer: "Operating a large-scale cooling tower system",
    explanation: "Under the Environmental Permitting Regulations (England and Wales), operating a large-scale cooling tower system might require an environmental permit due to potential water discharge issues and legionella risk. These regulations control activities that could pollute air, water, or land. Cooling towers can create aerosols and discharge water containing treatment chemicals and microbiological contaminants. Permits typically set conditions for operation, maintenance regimes, water treatment, monitoring requirements, and discharge limits to prevent environmental harm."
  },
  {
    id: 'hvac-l3-regulations6',
    question: "What is the main purpose of the Energy Performance of Buildings Directive (EPBD) in relation to HVAC systems?",
    options: ["To set minimum acoustic performance standards", "To improve the energy performance of buildings through requirements for HVAC system efficiency, inspections, and energy certification", "To establish construction standards for HVAC equipment", "To standardize HVAC maintenance procedures"],
    correctAnswer: "To improve the energy performance of buildings through requirements for HVAC system efficiency, inspections, and energy certification",
    explanation: "The Energy Performance of Buildings Directive (EPBD) aims to improve building energy performance through multiple requirements. For HVAC systems, it mandates regular inspections of heating and air conditioning systems above certain sizes (20kW for cooling, 70kW for heating), energy performance certificates when buildings are constructed, sold, or rented, and minimum energy performance standards. The directive also promotes smart technologies for building systems and requires nearly zero-energy buildings for new construction."
  },
  {
    id: 'hvac-l3-regulations7',
    question: "According to the Clean Air Act and associated regulations, what requirement applies to operators of commercial/industrial boilers above 400kW in UK smoke control areas?",
    options: ["They must get hourly readings of emissions", "They must only burn authorized fuels or use exempt appliances", "They must install ESP (electrostatic precipitator) filters", "They are exempt from all clean air regulations due to modern efficiency"],
    correctAnswer: "They must only burn authorized fuels or use exempt appliances",
    explanation: "Under the Clean Air Act and smoke control area regulations, operators of commercial/industrial boilers above 400kW in smoke control areas must only burn authorized fuels or use exempt appliances. This requirement aims to reduce particulate emissions and smoke. Authorized fuels include natural gas, LPG, and certain low-smoke solid fuels. For HVAC professionals, this influences boiler selection, fuel type recommendations, and system design in smoke control areas, which cover many urban locations throughout the UK."
  },
  {
    id: 'hvac-l3-regulations8',
    question: "What does the Ozone Depleting Substances Regulation prohibit regarding maintenance of HVAC equipment?",
    options: ["Use of ozone-depleting substances in maintaining existing equipment", "All refrigerant leak testing", "All recovery of refrigerants from any equipment", "Use of non-certified equipment in testing"],
    correctAnswer: "Use of ozone-depleting substances in maintaining existing equipment",
    explanation: "The Ozone Depleting Substances Regulation prohibits the use of ozone-depleting substances (like R12, R22) in maintaining or servicing existing HVAC equipment. This 'service ban' means that even if equipment contains these refrigerants, they cannot be topped up if leaks occur. This effectively requires system retrofit or replacement when leaks develop in systems containing ODSs. HVAC professionals must identify ODS-containing systems during service visits and advise clients on compliance options when leaks are detected."
  },
  {
    id: 'hvac-l3-regulations9',
    question: "Under the UK's Hazardous Waste Regulations, which of the following HVAC-related wastes would typically be classified as hazardous?",
    options: ["Cardboard packaging from new equipment", "Used air filters from standard ventilation systems", "Waste refrigerant oil contaminated with R410A", "Metal scrap from ductwork removal"],
    correctAnswer: "Waste refrigerant oil contaminated with R410A",
    explanation: "Under the UK's Hazardous Waste Regulations, waste refrigerant oil contaminated with R410A would typically be classified as hazardous waste due to its potential environmental impact and toxicity. This classification requires specific handling procedures including separate collection, use of authorized waste carriers, completion of hazardous waste consignment notes, and disposal at appropriately licensed facilities. HVAC contractors must register as hazardous waste producers if they generate more than 500kg of hazardous waste annually and maintain records for at least 3 years."
  },
  {
    id: 'hvac-l3-regulations10',
    question: "What is the main requirement of the Energy Savings Opportunity Scheme (ESOS) that might impact HVAC systems?",
    options: ["Mandatory energy performance certificates for all HVAC equipment", "Quarterly inspection of all cooling systems", "Energy audits including assessment of HVAC energy use for large organizations", "Installation of energy monitors on all HVAC systems"],
    correctAnswer: "Energy audits including assessment of HVAC energy use for large organizations",
    explanation: "The Energy Savings Opportunity Scheme (ESOS) requires large organizations (250+ employees or annual turnover exceeding €50 million) to conduct comprehensive energy audits every 4 years. These audits must include assessment of HVAC energy use, identifying cost-effective energy efficiency opportunities. While implementing the recommendations is not mandatory, the audits often highlight HVAC optimization potential. For HVAC professionals, ESOS creates opportunities to provide energy assessment services and implement recommended efficiency measures."
  },
  {
    id: 'hvac-l3-regulations11',
    question: "Under the Building Regulations Part L (Conservation of Fuel and Power), what is required for new non-domestic buildings regarding HVAC system efficiency?",
    options: ["All systems must use renewable energy sources only", "HVAC systems must meet minimum efficiency standards and include effective controls", "All systems must be electric with no gas options permitted", "Manual operation only with no building management systems allowed"],
    correctAnswer: "HVAC systems must meet minimum efficiency standards and include effective controls",
    explanation: "Building Regulations Part L requires HVAC systems in new non-domestic buildings to meet minimum efficiency standards and include effective controls. The specific requirements are detailed in the Non-Domestic Building Services Compliance Guide, which specifies minimum seasonal efficiencies for heating and cooling equipment, maximum SFPs (Specific Fan Powers) for ventilation systems, and mandatory control features such as zone controls, time controls, and weather compensation. These requirements aim to reduce operational energy consumption and associated carbon emissions."
  },
  {
    id: 'hvac-l3-regulations12',
    question: "What is the primary focus of the Control of Substances Hazardous to Health (COSHH) Regulations as they apply to HVAC work?",
    options: ["Setting standards for indoor air quality only", "Controlling exposure to hazardous substances encountered during installation, maintenance, and repair", "Regulating refrigerant gas emissions only", "Establishing design parameters for ventilation systems"],
    correctAnswer: "Controlling exposure to hazardous substances encountered during installation, maintenance, and repair",
    explanation: "The COSHH Regulations primarily focus on controlling exposure to hazardous substances encountered during HVAC installation, maintenance, and repair. This includes refrigerants, cleaning chemicals, solvents, welding fumes, and biological hazards like legionella. HVAC employers must assess risks, implement control measures (following the hierarchy of controls), provide information and training, conduct health surveillance where required, and plan for emergencies. Specific measures might include engineering controls, PPE, and safe work procedures for handling potentially harmful substances."
  },
  {
    id: 'hvac-l3-regulations13',
    question: "What are the requirements for leak detection under the UK's F-Gas Regulations for a system containing 20kg of R410A (GWP 2088)?",
    options: ["No leak checks required as R410A is exempt", "Annual leak checks required", "Leak checks at least every 6 months required", "Leak checks at least every 3 months required"],
    correctAnswer: "Leak checks at least every 6 months required",
    explanation: "Under the UK's F-Gas Regulations, leak detection requirements are based on CO2 equivalent tonnage. For R410A with a GWP of 2088, a system containing 20kg equals 41.76 tonnes CO2e (20 × 2088 ÷ 1000). Systems containing between 5 and 50 tonnes CO2e require leak checks at least every 12 months. However, if a fixed leak detection system is not installed (which is typical), this frequency doubles to at least every 6 months. Proper records of all leak checks must be maintained for 5 years."
  },
  {
    id: 'hvac-l3-regulations14',
    question: "Under the Fluorinated Greenhouse Gases Regulations, what is the requirement for record-keeping regarding F-gas recovery?",
    options: ["No records are required for recovered F-gases", "Records must be kept for 1 year", "Records must be kept for 3 years", "Records must be kept for 5 years"],
    correctAnswer: "Records must be kept for 5 years",
    explanation: "Under the Fluorinated Greenhouse Gases Regulations, records relating to F-gas recovery must be kept for 5 years. These records must include information about the quantity recovered, the type of refrigerant, the equipment it was recovered from, and details about its subsequent destination (recycling, reclamation, or destruction). This requirement applies to all HVAC contractors recovering F-gases from equipment during servicing, maintenance, or decommissioning and is essential for demonstrating compliance during regulatory inspections."
  },
  {
    id: 'hvac-l3-regulations15',
    question: "What does the Montreal Protocol, as implemented in UK regulations, primarily aim to control?",
    options: ["Carbon dioxide emissions only", "Substances that deplete the ozone layer", "Nitrogen oxide emissions only", "Water vapor from cooling towers"],
    correctAnswer: "Substances that deplete the ozone layer",
    explanation: "The Montreal Protocol, as implemented in UK regulations through the Ozone-Depleting Substances Regulations, primarily aims to control substances that deplete the ozone layer. These include chlorofluorocarbons (CFCs), hydrochlorofluorocarbons (HCFCs), halons, and other chemicals containing chlorine and bromine that damage the stratospheric ozone layer. For HVAC professionals, this has meant the phase-out of refrigerants like R12 and R22, with prohibitions on their production, import, and use in equipment maintenance, driving the industry toward ozone-friendly alternatives."
  },
  {
    id: 'hvac-l3-regulations16',
    question: "According to the Waste Electrical and Electronic Equipment (WEEE) Regulations, who is responsible for the proper disposal of commercial air conditioning units at end-of-life?",
    options: ["Always the original equipment manufacturer", "Always the building owner", "The producer (manufacturer or importer) for equipment placed on the market after August 2005", "The local authority in all cases"],
    correctAnswer: "The producer (manufacturer or importer) for equipment placed on the market after August 2005",
    explanation: "Under the WEEE Regulations, for commercial air conditioning units placed on the market after August 13, 2005, the producer (manufacturer or importer) is responsible for financing the environmentally sound disposal of the equipment at end-of-life. For equipment placed on the market before that date, the responsibility falls to the end-user. HVAC contractors should advise clients about these responsibilities and provide information about WEEE-compliant disposal routes when replacing equipment, including producer take-back schemes where available."
  },
  {
    id: 'hvac-l3-regulations17',
    question: "What is the primary purpose of the Climate Change Levy (CCL) in the UK?",
    options: ["To tax the installation of air conditioning systems", "To encourage reduced energy consumption and improved energy efficiency in non-domestic sectors", "To provide grants for renewable technology adoption", "To fund climate research only"],
    correctAnswer: "To encourage reduced energy consumption and improved energy efficiency in non-domestic sectors",
    explanation: "The Climate Change Levy (CCL) is a tax on energy supplied to non-domestic users, designed to encourage reduced energy consumption and improved energy efficiency in business and public sectors. It applies to electricity, gas, solid fuels, and LPG used for heating. For HVAC professionals, the CCL creates financial incentives for clients to invest in more energy-efficient systems, as more efficient equipment reduces ongoing energy costs including the CCL. Some energy-intensive businesses can receive discounts through Climate Change Agreements (CCAs) if they meet energy efficiency or carbon reduction targets."
  },
  {
    id: 'hvac-l3-regulations18',
    question: "Under the Pressure Equipment Regulations, which HVAC components would typically require CE/UKCA marking?",
    options: ["Only domestic refrigerators", "All ductwork regardless of pressure", "Air conditioning systems operating below 0.5 bar", "Refrigeration pressure vessels and assemblies above specified pressure and volume thresholds"],
    correctAnswer: "Refrigeration pressure vessels and assemblies above specified pressure and volume thresholds",
    explanation: "Under the Pressure Equipment Regulations, refrigeration pressure vessels and assemblies above specified pressure and volume thresholds require CE/UKCA marking. The specific requirements depend on the fluid group, pressure, and volume/size. For most refrigeration equipment, this applies to items operating above 0.5 bar pressure with a significant volume. Compliance involves design assessment, manufacturing quality assurance, and safety system verification. HVAC professionals should verify that installed pressure equipment carries appropriate marking and is accompanied by the required documentation."
  },
  {
    id: 'hvac-l3-regulations19',
    question: "What regulatory framework governs the control of legionella risk in water systems including cooling towers?",
    options: ["Only the Building Regulations Part F", "The Control of Substances Hazardous to Health (COSHH) Regulations and HSE Approved Code of Practice L8", "Only the Water Supply Regulations", "Only the Environmental Protection Act"],
    correctAnswer: "The Control of Substances Hazardous to Health (COSHH) Regulations and HSE Approved Code of Practice L8",
    explanation: "The control of legionella risk in water systems, including cooling towers, is governed primarily by the Control of Substances Hazardous to Health (COSHH) Regulations and the HSE's Approved Code of Practice L8 'Legionnaires' disease: The control of legionella bacteria in water systems'. These frameworks require risk assessment, implementation of control measures, monitoring, record-keeping, and appropriate management procedures. For cooling towers specifically, there are additional notification requirements to local authorities under the Notification of Cooling Towers and Evaporative Condensers Regulations."
  },
  {
    id: 'hvac-l3-regulations20',
    question: "What is required by the Energy Performance of Buildings Regulations regarding inspection of air conditioning systems?",
    options: ["Daily inspection by the building operator", "Inspections are optional and recommended only", "Mandatory inspection every 5 years for systems with a combined cooling output over 12kW", "Annual inspection by the manufacturer only"],
    correctAnswer: "Mandatory inspection every 5 years for systems with a combined cooling output over 12kW",
    explanation: "The Energy Performance of Buildings Regulations require mandatory inspection every 5 years for air conditioning systems with a combined cooling output over 12kW. These inspections must be conducted by an accredited air conditioning energy assessor who evaluates the system's efficiency and sizing compared to the cooling requirements. The inspection produces a report with recommendations for improving energy efficiency. Building owners/managers must obtain and keep these reports, which may be checked by local authorities who can issue penalties for non-compliance."
  },
  {
    id: 'hvac-l3-regulations21',
    question: "How does the Carbon Reduction Commitment (CRC) Energy Efficiency Scheme (before its closure) influence HVAC system management?",
    options: ["It banned the use of certain refrigerants only", "It required large organizations to measure, report, and purchase allowances for their carbon emissions, including those from HVAC energy use", "It mandated specific HVAC technologies", "It only applied to residential buildings"],
    correctAnswer: "It required large organizations to measure, report, and purchase allowances for their carbon emissions, including those from HVAC energy use",
    explanation: "The Carbon Reduction Commitment (CRC) Energy Efficiency Scheme, before its closure in 2019, required large organizations to measure, report, and purchase allowances for their carbon emissions, including those from HVAC energy use. This created financial incentives to reduce HVAC energy consumption through system optimization, control improvements, and equipment upgrades. While the CRC has been replaced by increases in the Climate Change Levy, its legacy continues in organizations' enhanced energy monitoring systems and carbon management strategies that were developed for compliance."
  },
  {
    id: 'hvac-l3-regulations22',
    question: "What is the key requirement of the Construction Products Regulation (CPR) that affects HVAC equipment and components sold in the UK?",
    options: ["All products must be manufactured in the UK", "Products must have a Declaration of Performance and UKCA/CE marking when covered by a harmonized standard or UK designated standard", "All components must be approved by local building authorities individually", "HVAC equipment is exempt from the CPR"],
    correctAnswer: "Products must have a Declaration of Performance and UKCA/CE marking when covered by a harmonized standard or UK designated standard",
    explanation: "The Construction Products Regulation (CPR) requires HVAC equipment and components sold in the UK to have a Declaration of Performance (DoP) and UKCA/CE marking when they are covered by a harmonized standard or UK designated standard. The DoP details the product's performance characteristics, while the marking indicates compliance with applicable requirements. This applies to products such as ventilation ducts, fire dampers, and associated controls. HVAC professionals should verify that installed products have appropriate documentation and marking to ensure regulatory compliance."
  },
  {
    id: 'hvac-l3-regulations23',
    question: "What does the Ecodesign for Energy-Related Products Regulations require for ventilation units from 2018 onwards?",
    options: ["Use of only DC motors in all applications", "Minimum energy efficiency requirements including heat recovery efficiency and specific fan power", "Complete elimination of all mechanical ventilation", "Use of only natural ventilation in all new buildings"],
    correctAnswer: "Minimum energy efficiency requirements including heat recovery efficiency and specific fan power",
    explanation: "The Ecodesign for Energy-Related Products Regulations require ventilation units to meet minimum energy efficiency requirements including heat recovery efficiency and specific fan power (SFP) from 2018 onwards. For non-residential ventilation units, this includes minimum thermal efficiency of heat recovery (typically 67-73% depending on type), maximum SFP internal (specific fan power internal, measuring the efficiency of moving air), and mandatory variable speed or multi-speed drives. These requirements have driven significant technological improvements in the ventilation industry, increasing energy efficiency."
  },
  {
    id: 'hvac-l3-regulations24',
    question: "Under the Environmental Noise Regulations, what requirement could affect the installation of external HVAC equipment?",
    options: ["All equipment must operate below 30 dB regardless of location", "External units can only operate during daylight hours", "Local authorities must develop noise action plans that may restrict HVAC installations in certain areas", "All external units must be painted specific colors for visibility"],
    correctAnswer: "Local authorities must develop noise action plans that may restrict HVAC installations in certain areas",
    explanation: "Under the Environmental Noise Regulations, local authorities must develop noise action plans for major urban areas, which may restrict HVAC installations in certain noise-sensitive locations. These regulations require noise mapping and action planning to manage environmental noise. For HVAC installations, this may translate into specific planning conditions, local noise limits, restrictions on operating times, or requirements for acoustic enclosures for external equipment. HVAC designers should consult local noise action plans and environmental health requirements when selecting and positioning external equipment."
  },
  {
    id: 'hvac-l3-regulations25',
    question: "What is the scope of the Medium Combustion Plant Directive (MCPD) in terms of equipment size?",
    options: ["Under 1 MW thermal input only", "Between 1 MW and 50 MW thermal input", "Over 50 MW thermal input only", "Only applies to equipment under 500 kW"],
    correctAnswer: "Between 1 MW and 50 MW thermal input",
    explanation: "The Medium Combustion Plant Directive (MCPD) applies to combustion plants with a rated thermal input between 1 MW and 50 MW. This includes many commercial and industrial boilers, CHP units, and generators used in larger HVAC applications. Plants over 50 MW are covered by the Industrial Emissions Directive (IED), while those under 1 MW are generally subject to less stringent national regulations. The MCPD implementation includes different timelines for permitting: new plants require permits from December 2018, while existing plants have longer transition periods based on their size."
  },
  {
    id: 'hvac-l3-regulations26',
    question: "Under the Environmental Protection Act, what must operators of prescribed processes (including some larger HVAC systems) do to comply with Integrated Pollution Prevention and Control (IPPC) requirements?",
    options: ["Nothing, as HVAC systems are exempt", "Simply register the equipment online without any operational requirements", "Apply for a permit and use Best Available Techniques (BAT) to prevent or minimize pollution", "Only report if a pollution incident occurs"],
    correctAnswer: "Apply for a permit and use Best Available Techniques (BAT) to prevent or minimize pollution",
    explanation: "Under the Environmental Protection Act's Integrated Pollution Prevention and Control (IPPC) requirements, operators of prescribed processes must apply for a permit and use Best Available Techniques (BAT) to prevent or minimize pollution. For larger HVAC systems that fall under regulated activities (typically in industrial settings), this means demonstrating that energy efficiency, emissions control, and resource management meet BAT standards. The permit will specify emission limits, monitoring requirements, and reporting obligations, with operators required to regularly review and update their techniques as BAT evolves."
  },
  {
    id: 'hvac-l3-regulations27',
    question: "What requirement does the Energy Labelling Regulation impose on HVAC equipment suppliers?",
    options: ["Providing energy labels only for residential equipment", "Providing standardized energy labels showing efficiency classes and consumption data for products covered by product-specific regulations", "Submitting all technical specifications to a central European database only", "Only labeling equipment manufactured within the UK"],
    correctAnswer: "Providing standardized energy labels showing efficiency classes and consumption data for products covered by product-specific regulations",
    explanation: "The Energy Labelling Regulation requires HVAC equipment suppliers to provide standardized energy labels showing efficiency classes and consumption data for products covered by product-specific regulations. This includes space heaters, water heaters, air conditioners, and ventilation units. The labels must display a consistent format with energy efficiency ratings (typically A+++ to G), annual energy consumption, noise levels, and other performance data relevant to each product type. This enables customers to compare products based on energy performance and encourages manufacturers to develop more efficient equipment."
  },
  {
    id: 'hvac-l3-regulations28',
    question: "What does the Producer Responsibility Obligations (Packaging Waste) Regulations require from businesses handling significant amounts of packaging (including HVAC equipment suppliers)?",
    options: ["Only using biodegradable packaging", "Registering with a compliance scheme and meeting recovery and recycling obligations", "Eliminating all packaging by 2025", "Returning all packaging to the original manufacturer"],
    correctAnswer: "Registering with a compliance scheme and meeting recovery and recycling obligations",
    explanation: "The Producer Responsibility Obligations (Packaging Waste) Regulations require businesses that handle significant amounts of packaging and meet certain thresholds (handling over 50 tonnes of packaging annually and having a turnover over £2 million) to register with a compliance scheme and meet recovery and recycling obligations. These businesses, which include larger HVAC equipment suppliers, must pay fees that contribute to the cost of packaging waste collection and recycling. They must also provide data on packaging handled and demonstrate that specific percentages of packaging waste have been recovered and recycled."
  },
  {
    id: 'hvac-l3-regulations29',
    question: "How does the Building Regulations Part F (Ventilation) impact HVAC system design?",
    options: ["It has no impact on HVAC systems", "It only applies to residential properties", "It sets requirements for adequate means of ventilation for buildings, including minimum ventilation rates", "It only regulates maximum noise levels"],
    correctAnswer: "It sets requirements for adequate means of ventilation for buildings, including minimum ventilation rates",
    explanation: "Building Regulations Part F (Ventilation) sets requirements for adequate means of ventilation for buildings, including minimum ventilation rates for different space types. It specifies provisions for fresh air supply, extract ventilation, purge ventilation, and indoor air quality. HVAC system designers must demonstrate compliance with these requirements through appropriate system sizing, control strategies, and component selection. The regulations also address aspects such as prevention of condensation, commissioning of ventilation systems, and provision of information to building occupants."
  },
  {
    id: 'hvac-l3-regulations30',
    question: "Under the Clean Air Strategy, what is the UK's approach to reducing ammonia emissions that might affect certain HVAC technologies?",
    options: ["Banning all ammonia-based refrigeration systems immediately", "Requiring emissions monitoring for ammonia refrigeration systems above certain sizes", "Focusing primarily on agricultural sources rather than HVAC applications", "Mandating specific filtration for all ammonia-based systems"],
    correctAnswer: "Focusing primarily on agricultural sources rather than HVAC applications",
    explanation: "Under the Clean Air Strategy, the UK's approach to reducing ammonia emissions focuses primarily on agricultural sources rather than HVAC applications. While ammonia is used as a refrigerant in some industrial refrigeration systems, the strategy recognizes that over 85% of ammonia emissions come from agriculture. For HVAC applications using ammonia (R717), existing regulations under COSHH and pressure systems safety already provide a framework for safe management. The strategy does not introduce significant new restrictions on ammonia as an industrial refrigerant, supporting its continued use as a low-GWP option."
  },
  {
    id: 'hvac-l3-regulations31',
    question: "What impact does the Energy Performance Certificate (EPC) requirement have on commercial buildings with HVAC systems?",
    options: ["It has no impact on existing buildings", "It requires replacement of all HVAC systems every 10 years", "Buildings with poor ratings (F or G) cannot be leased without improvements, potentially requiring HVAC upgrades", "It only applies to residential properties"],
    correctAnswer: "Buildings with poor ratings (F or G) cannot be leased without improvements, potentially requiring HVAC upgrades",
    explanation: "The Energy Performance Certificate (EPC) requirement impacts commercial buildings by prohibiting the lease of properties with poor ratings (F or G) without improvements, under the Minimum Energy Efficiency Standards (MEES). This often necessitates HVAC upgrades as heating, cooling, and ventilation typically account for a significant portion of building energy consumption. Building owners may need to invest in more efficient HVAC equipment, improved controls, or better distribution systems to achieve the minimum E rating required. This creates opportunities for HVAC professionals to provide upgrade solutions and advice on compliance options."
  },
  {
    id: 'hvac-l3-regulations32',
    question: "What does the Non-Road Mobile Machinery (NRMM) Emission of Gaseous and Particulate Pollutants Regulations govern that might affect HVAC installations?",
    options: ["Only emissions from installation vehicles", "Emissions from non-road diesel engines, including those in generators and mobile HVAC units", "Only refrigerant emissions during installation", "Only noise emissions from outdoor HVAC equipment"],
    correctAnswer: "Emissions from non-road diesel engines, including those in generators and mobile HVAC units",
    explanation: "The NRMM Regulations govern emissions from non-road diesel engines, including those in generators and mobile HVAC units. They set increasingly stringent emission standards (Stages I through V) for pollutants including NOx, CO, hydrocarbons, and particulate matter. This affects diesel-powered generators used for backup power in HVAC systems and mobile refrigeration/air conditioning units. HVAC professionals must ensure specified equipment complies with current emission stage requirements, particularly in low emission zones where additional restrictions may apply."
  },
  {
    id: 'hvac-l3-regulations33',
    question: "Under the Energy Performance of Buildings Regulations, what information must be included in an air conditioning inspection report?",
    options: ["Only the system manufacturer and installation date", "Only refrigerant charge and type", "Assessment of efficiency, sizing, and recommendations for improvement", "Only maintenance records for the previous 12 months"],
    correctAnswer: "Assessment of efficiency, sizing, and recommendations for improvement",
    explanation: "Under the Energy Performance of Buildings Regulations, an air conditioning inspection report must include an assessment of efficiency, sizing, and recommendations for improvement. This covers evaluation of system controls, maintenance status, current efficiency compared to modern equivalents, appropriateness of the system for the current cooling load, and suggestions for improvements or alternative solutions. The report should provide practical advice on reducing energy consumption without compromising indoor comfort, and may include cost-effective upgrade opportunities or management improvements."
  },
  {
    id: 'hvac-l3-regulations34',
    question: "What is the significance of the UK's Net Zero target by 2050 for the HVAC industry?",
    options: ["It only affects residential heating systems", "It has no legal implications for HVAC installations", "It drives regulations promoting decarbonization of heating, cooling, and ventilation systems", "It only impacts public sector buildings"],
    correctAnswer: "It drives regulations promoting decarbonization of heating, cooling, and ventilation systems",
    explanation: "The UK's legally binding Net Zero target by 2050 drives regulations promoting decarbonization of heating, cooling, and ventilation systems. This includes phase-outs of fossil fuel heating in new buildings, incentives for heat pumps and other low-carbon technologies, stricter efficiency standards, and carbon reporting requirements. For HVAC professionals, this means increasing focus on heat pumps, heat networks, hydrogen-ready systems, heat recovery, renewable integration, and advanced controls that minimize environmental impact while maintaining or improving indoor environmental quality."
  },
  {
    id: 'hvac-l3-regulations35',
    question: "What certification is required under the Fluorinated Greenhouse Gases Regulations for a technician working with stationary refrigeration and air conditioning equipment?",
    options: ["No certification is required", "A building services engineering degree only", "F-Gas Category I, II, III, or IV certification depending on activities performed", "Only manufacturer-specific training"],
    correctAnswer: "F-Gas Category I, II, III, or IV certification depending on activities performed",
    explanation: "Under the Fluorinated Greenhouse Gases Regulations, technicians working with stationary refrigeration and air conditioning equipment must hold appropriate F-Gas certification: Category I (all activities), Category II (installation, leak checking for systems containing less than 3kg, recovery), Category III (recovery only), or Category IV (leak checking only). These certifications ensure technicians have the necessary competence to minimize emissions when handling F-gases. Companies must also hold company certification, employ appropriately certified personnel, and maintain proper equipment for refrigerant handling."
  },
  {
    id: 'hvac-l3-regulations36',
    question: "What does the Control of Pollution Act require regarding noise from HVAC equipment during installation and operation?",
    options: ["No specific requirements exist", "Only applies to equipment over 50kW cooling capacity", "Local authorities can serve noise abatement notices and restrict construction work to certain hours", "Only applies to equipment installed before 2015"],
    correctAnswer: "Local authorities can serve noise abatement notices and restrict construction work to certain hours",
    explanation: "The Control of Pollution Act gives local authorities powers regarding noise from HVAC equipment during both installation and operation. They can restrict construction work (including HVAC installations) to certain hours through Section 60 notices, and serve noise abatement notices under Section 80 if operational equipment causes a statutory nuisance. HVAC designers and installers must consider noise impact through appropriate equipment selection, acoustic enclosures, vibration isolation, and careful placement of external units, particularly in noise-sensitive areas or near residential properties."
  },
  {
    id: 'hvac-l3-regulations37',
    question: "Under the Environmental Permitting Regulations, which industrial cooling systems typically require permits?",
    options: ["All commercial air conditioning systems regardless of size", "Only systems using ammonia as a refrigerant", "Cooling systems with a capacity below 1MW", "Systems with water discharge or that use potentially polluting treatments, particularly in industrial applications"],
    correctAnswer: "Systems with water discharge or that use potentially polluting treatments, particularly in industrial applications",
    explanation: "Under the Environmental Permitting Regulations, industrial cooling systems that have water discharge or use potentially polluting treatments typically require permits. This includes cooling towers and evaporative condensers in industrial settings, particularly those with significant water use, chemical treatments for biological control (biocides), or potential for contaminated discharge. The permits specify conditions for operation, monitoring requirements, and discharge limits to prevent environmental harm. Operators must demonstrate use of best available techniques for water efficiency, chemical usage, and pollution prevention."
  },
  {
    id: 'hvac-l3-regulations38',
    question: "What requirements does the Building Safety Act 2022 introduce that may affect HVAC systems in high-rise residential buildings?",
    options: ["No impact on HVAC systems", "Only aesthetical requirements for outdoor units", "Stringent safety, documentation, and compliance requirements including consideration of how HVAC systems interact with fire safety", "Only applies to new construction after 2030"],
    correctAnswer: "Stringent safety, documentation, and compliance requirements including consideration of how HVAC systems interact with fire safety",
    explanation: "The Building Safety Act 2022 introduces stringent safety, documentation, and compliance requirements for high-rise residential buildings, including consideration of how HVAC systems interact with fire safety. This includes requirements for ventilation fire dampers, smoke control systems, compartmentation integrity where services penetrate fire barriers, and emergency system shutdown. The Act establishes a 'golden thread' of information documenting design decisions, risk assessments, and maintenance requirements throughout a building's lifecycle, with specific duties for designers, installers, and operators of building systems including HVAC."
  },
  {
    id: 'hvac-l3-regulations39',
    question: "What is the purpose of the Pollution Prevention and Control (PPC) Regulations as they relate to HVAC systems?",
    options: ["They only apply to residential systems", "They have no application to HVAC systems", "They regulate emissions from industrial processes, including larger combustion plants used for heating", "They only regulate refrigerant selection"],
    correctAnswer: "They regulate emissions from industrial processes, including larger combustion plants used for heating",
    explanation: "The Pollution Prevention and Control (PPC) Regulations regulate emissions from industrial processes, including larger combustion plants used for heating. They implement the Industrial Emissions Directive for larger installations and require operators to obtain permits with emission limit values based on Best Available Techniques (BAT). For HVAC applications, this affects larger boiler systems, CHP plants, and industrial heating installations. Operators must monitor emissions, maintain records, report results, and demonstrate that their equipment and operating procedures align with current BAT reference documents (BREFs)."
  },
  {
    id: 'hvac-l3-regulations40',
    question: "What is the primary requirement of the Heat Network (Metering and Billing) Regulations?",
    options: ["They only apply to domestic heating systems", "Installation of meters or heat cost allocators to measure consumption in multi-occupancy buildings with communal heating", "They regulate the temperature of heating systems only", "They only apply to cooling systems"],
    correctAnswer: "Installation of meters or heat cost allocators to measure consumption in multi-occupancy buildings with communal heating",
    explanation: "The Heat Network (Metering and Billing) Regulations primarily require the installation of meters or heat cost allocators to measure consumption in multi-occupancy buildings with communal heating. Heat suppliers must install point-of-use meters in new buildings and existing buildings undergoing major renovation, and where technically feasible and cost-effective in existing buildings. Building-level meters must be installed at the heat exchanger or entry point of multi-apartment/purpose buildings. The regulations also mandate accurate billing based on actual consumption to encourage energy efficiency through user awareness."
  },
  {
    id: 'hvac-l3-regulations41',
    question: "How does the Energy Savings Opportunity Scheme (ESOS) impact HVAC assessments in qualifying organizations?",
    options: ["It has no impact on HVAC systems", "It requires daily energy monitoring of all HVAC equipment", "It requires comprehensive energy audits including HVAC systems as significant energy consumers", "It only applies to cooling systems in data centers"],
    correctAnswer: "It requires comprehensive energy audits including HVAC systems as significant energy consumers",
    explanation: "The Energy Savings Opportunity Scheme (ESOS) requires qualifying organizations (large enterprises) to conduct comprehensive energy audits every 4 years, with HVAC systems typically examined as significant energy consumers. These audits must analyze energy consumption profiles, identify inefficiencies, and recommend cost-effective improvements. For HVAC, this might include assessment of equipment efficiency, control optimization, heat recovery opportunities, maintenance procedures, and operating patterns. While implementing recommendations is not mandatory, the detailed analysis often builds the business case for HVAC upgrades and optimization."
  },
  {
    id: 'hvac-l3-regulations42',
    question: "What requirement does the Energy Related Products Directive impose on circulators in HVAC systems from 2013 onwards?",
    options: ["They must be manufactured in Europe only", "No specific requirements exist", "They must use only specific materials approved by the Environment Agency", "They must meet minimum efficiency requirements, effectively requiring high-efficiency electronically commutated motors for most applications"],
    correctAnswer: "They must meet minimum efficiency requirements, effectively requiring high-efficiency electronically commutated motors for most applications",
    explanation: "The Energy Related Products Directive, implemented in the UK as the Ecodesign for Energy-Related Products Regulations, imposes minimum efficiency requirements on circulators in HVAC systems from 2013 onwards. This effectively mandates high-efficiency electronically commutated motors (ECMs) for most applications. The regulation specifically targets standalone circulators and those integrated into products, requiring a minimum Energy Efficiency Index (EEI). This has driven a shift from traditional fixed-speed pumps to variable-speed, high-efficiency models that can reduce pumping energy consumption by 60-80% in typical applications."
  },
  {
    id: 'hvac-l3-regulations43',
    question: "What are the Streamlined Energy and Carbon Reporting (SECR) requirements for large UK companies that might affect HVAC system management?",
    options: ["They only apply to manufacturing companies", "There are no specific requirements related to energy use", "Annual reporting of energy use, greenhouse gas emissions, and energy efficiency actions in the directors' report", "They only apply to public sector organizations"],
    correctAnswer: "Annual reporting of energy use, greenhouse gas emissions, and energy efficiency actions in the directors' report",
    explanation: "The Streamlined Energy and Carbon Reporting (SECR) requirements mandate that large UK companies must include annual reporting of energy use, greenhouse gas emissions, and energy efficiency actions in their directors' report. Since HVAC systems typically account for a significant portion of building energy consumption (often 40-60%), they receive particular attention in energy efficiency actions. This regulatory reporting requirement drives organizations to implement HVAC optimization, monitoring, and improvement programs to demonstrate progress in emissions reduction and energy management to shareholders and stakeholders."
  },
  {
    id: 'hvac-l3-regulations44',
    question: "What is required under the Building Regulations Part O (Overheating) that impacts HVAC system design?",
    options: ["It only applies to industrial buildings", "Only applies to buildings constructed before 1990", "Residential buildings must meet requirements to prevent overheating, potentially affecting cooling system specifications", "Has no requirements related to temperature control"],
    correctAnswer: "Residential buildings must meet requirements to prevent overheating, potentially affecting cooling system specifications",
    explanation: "Building Regulations Part O (Overheating) requires residential buildings to meet specific requirements to prevent overheating, directly impacting HVAC design decisions. Introduced in 2021, these regulations require designers to demonstrate that dwellings won't experience dangerous overheating conditions, particularly in summer. This can be achieved through a simplified method (limiting glazing area, providing shading, etc.) or dynamic thermal modeling. The regulations favor passive cooling strategies but may necessitate mechanical cooling in some circumstances, with implications for system sizing, energy efficiency, and control strategies."
  },
  {
    id: 'hvac-l3-regulations45',
    question: "What is the Future Buildings Standard proposing regarding the decarbonization of heating in new non-domestic buildings?",
    options: ["No changes to current requirements", "Only applicable to residential buildings", "New non-domestic buildings must have low-carbon heating with no new natural gas connections from 2025", "Only affects buildings over 10,000 m²"],
    correctAnswer: "New non-domestic buildings must have low-carbon heating with no new natural gas connections from 2025",
    explanation: "The Future Buildings Standard proposes that new non-domestic buildings must have low-carbon heating with no new natural gas connections from 2025. This represents a significant shift for HVAC design, promoting heat pumps, heat networks, direct electric heating, and potentially hydrogen systems (where available) instead of traditional gas boilers. The standard aims to ensure new buildings are 'zero carbon ready' with very high fabric standards and low-carbon heating systems that can operate with zero carbon emissions as the electricity grid continues to decarbonize."
  },
  {
    id: 'hvac-l3-regulations46',
    question: "Under the Renewable Heat Incentive (RHI) regulations, which of the following technologies qualified for support?",
    options: ["Gas boilers with high efficiency", "Air conditioning systems using R410A", "Ground source heat pumps, biomass boilers, and solar thermal systems", "Only direct electric heating"],
    correctAnswer: "Ground source heat pumps, biomass boilers, and solar thermal systems",
    explanation: "Under the Renewable Heat Incentive (RHI) regulations, ground source heat pumps, biomass boilers, and solar thermal systems qualified for support, along with air source heat pumps, biomethane injection, and some forms of biogas combustion. The RHI provided long-term financial incentives (typically 7-20 years of quarterly payments) based on renewable heat generated. While the RHI closed to new applications in 2022, the technologies it supported remain important for decarbonizing heating, with successor schemes like the Boiler Upgrade Scheme continuing to promote low-carbon heating technologies."
  },
  {
    id: 'hvac-l3-regulations47',
    question: "What requirements does the Building Regulations Approved Document J place on combustion appliances that might be part of HVAC systems?",
    options: ["Only applies to wood-burning stoves", "No requirements for commercial buildings", "Requirements for air supply, discharge of combustion products, and carbon monoxide alarms", "Only aesthetic requirements for visible flues"],
    correctAnswer: "Requirements for air supply, discharge of combustion products, and carbon monoxide alarms",
    explanation: "Building Regulations Approved Document J places requirements on combustion appliances that might be part of HVAC systems, including provisions for air supply, discharge of combustion products, and carbon monoxide alarms. This covers gas boilers, oil-fired equipment, biomass systems, and other fuel-burning appliances. The regulations specify minimum air vent sizes for combustion, flue sizing and routing requirements, proximity to openings and boundaries, and protection measures including mandatory CO alarms for solid fuel appliances and recommended for others."
  },
  {
    id: 'hvac-l3-regulations48',
    question: "What is the main purpose of the Climate Change Act 2008 (as amended) that influences regulations affecting HVAC systems?",
    options: ["It only regulates refrigerant use", "It only applies to government buildings", "It provides the legal framework for the UK's emissions reduction targets, driving policies for building energy efficiency and heating decarbonization", "It only addresses transport emissions"],
    correctAnswer: "It provides the legal framework for the UK's emissions reduction targets, driving policies for building energy efficiency and heating decarbonization",
    explanation: "The Climate Change Act 2008 (as amended) provides the legal framework for the UK's emissions reduction targets, mandating a 100% reduction (net zero) by 2050 compared to 1990 levels. This overarching legislation drives numerous policies and regulations affecting HVAC systems, including building regulations updates, energy efficiency standards, phase-out timelines for high-carbon heating, support schemes for low-carbon technologies, and carbon reporting requirements. It establishes carbon budgets to ensure progressive emissions reductions and requires regular climate risk assessments that influence adaptation measures in building services."
  },
  {
    id: 'hvac-l3-regulations49',
    question: "What are the key requirements of the Noise at Work Regulations that apply to HVAC installers and maintenance technicians?",
    options: ["They only apply to equipment manufacturers, not installers", "No special requirements exist for HVAC work", "Employers must assess noise risks, provide hearing protection and health surveillance where necessary, and implement noise control measures", "They only apply to work performed after 10 PM"],
    correctAnswer: "Employers must assess noise risks, provide hearing protection and health surveillance where necessary, and implement noise control measures",
    explanation: "The Noise at Work Regulations require employers of HVAC installers and maintenance technicians to assess noise risks, provide hearing protection and health surveillance where necessary, and implement noise control measures. When exposure reaches the lower action value (80 dB(A) daily or weekly average), employers must provide information and training and make hearing protection available. At the upper action value (85 dB(A)), hearing protection becomes mandatory and hearing protection zones must be designated. HVAC work involving drilling, cutting, testing of equipment, and working in plant rooms often generates significant noise requiring these protective measures."
  },
  {
    id: 'hvac-l3-regulations50',
    question: "What does the Lifting Operations and Lifting Equipment Regulations (LOLER) require for HVAC installation activities involving cranes or hoists?",
    options: ["The regulations don't apply to HVAC equipment installation", "Only annual visual inspection of lifting equipment", "Planning, supervision, and thorough examination of lifting equipment by competent persons", "Only applies to equipment over 2 tonnes"],
    correctAnswer: "Planning, supervision, and thorough examination of lifting equipment by competent persons",
    explanation: "The Lifting Operations and Lifting Equipment Regulations (LOLER) require HVAC installation activities involving cranes or hoists to be properly planned, supervised, and performed safely by competent persons. Additionally, all lifting equipment must undergo thorough examination by a competent person: before first use, after assembly at a new location, periodically (typically 6-12 months depending on equipment type and usage), and following exceptional circumstances that might affect safety. This applies to all lifting equipment used in HVAC installations, including mobile cranes, hoists, and lifting accessories used for positioning heavy components like chillers, air handling units, and cooling towers."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-regulations', 'items', q.id), {
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
