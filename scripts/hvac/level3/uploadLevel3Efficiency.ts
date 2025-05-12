// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Efficiency.ts

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

// ✅ HVAC Level 3 Energy Efficiency & Controls Questions
const questions = [
  {
    id: 'hvac-l3-efficiency1',
    question: "According to the UK's Building Regulations Part L2, what is the primary metric used to demonstrate compliance for new non-domestic buildings?",
    options: ["U-values of building elements", "Total energy consumption in kWh/m²", "Target CO₂ Emission Rate (TER) versus Building CO₂ Emission Rate (BER)", "Specific Fan Power (SFP)"],
    correctAnswer: "Target CO₂ Emission Rate (TER) versus Building CO₂ Emission Rate (BER)",
    explanation: "Part L2 of the UK Building Regulations uses the Target CO₂ Emission Rate (TER) versus Building CO₂ Emission Rate (BER) as the primary compliance metric for new non-domestic buildings. The BER must not exceed the TER, which is calculated based on a notional building of the same size and shape but with specified reference values for building fabric and services. This approach focuses on overall carbon emissions rather than prescribing specific technologies."
  },
  {
    id: 'hvac-l3-efficiency2',
    question: "What is the minimum Coefficient of Performance (COP) required for an air-to-water heat pump under the Non-Domestic Building Services Compliance Guide?",
    options: ["2.5", "2.7", "3.2", "3.8"],
    correctAnswer: "2.7",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum Coefficient of Performance (COP) of 2.7 for air-to-water heat pumps. This value represents the ratio of heat output to electrical input under standard test conditions and serves as a benchmark for minimum acceptable efficiency. Higher efficiency equipment would contribute more favorably toward meeting the Target CO₂ Emission Rate (TER) in the Building Regulations compliance calculation."
  },
  {
    id: 'hvac-l3-efficiency3',
    question: "What control strategy would provide the most energy-efficient operation for a variable flow chilled water system?",
    options: ["Maintaining constant differential pressure regardless of flow rate", "Modulating differential pressure setpoint based on valve positions", "Operating all pumps at constant speed", "Maintaining maximum flow at all times"],
    correctAnswer: "Modulating differential pressure setpoint based on valve positions",
    explanation: "Modulating the differential pressure setpoint based on valve positions provides the most energy-efficient control strategy for variable flow chilled water systems. This approach, known as pressure reset control, reduces the setpoint when valves are partially closed (indicating excess pressure), saving significant pumping energy. When the most open valve reaches a predetermined threshold (typically 90-95% open), the setpoint increases slightly to ensure adequate flow to all terminals."
  },
  {
    id: 'hvac-l3-efficiency4',
    question: "What is Specific Fan Power (SFP) and what are its units?",
    options: ["The total power used by fans, measured in kW", "The efficiency of fan motors, measured as a percentage", "The power required to move air, measured in Watts per litre per second (W/(l/s))", "The speed of a fan, measured in revolutions per minute (rpm)"],
    correctAnswer: "The power required to move air, measured in Watts per litre per second (W/(l/s))",
    explanation: "Specific Fan Power (SFP) is the power required to move air through a ventilation system, measured in Watts per litre per second (W/(l/s)). It represents the electrical power consumed by all fans in the system divided by the total airflow rate. Lower SFP values indicate more efficient systems. UK Building Regulations specify maximum SFP values for different ventilation system types to ensure energy-efficient operation."
  },
  {
    id: 'hvac-l3-efficiency5',
    question: "According to CIBSE Guide F, what is the most effective control strategy for optimizing boiler efficiency in a multiple-boiler installation?",
    options: ["Running all boilers simultaneously at part load", "Sequence control with weather compensation", "Maintaining constant flow temperature year-round", "Turning boilers on and off based on fixed time schedules"],
    correctAnswer: "Sequence control with weather compensation",
    explanation: "According to CIBSE Guide F, sequence control with weather compensation is the most effective control strategy for optimizing boiler efficiency in multiple-boiler installations. This approach stages boilers to match the load (bringing additional boilers online only when needed) while adjusting the flow temperature based on outdoor conditions. This maximizes condensing operation in condensing boilers and minimizes standing losses, potentially saving 10-15% of energy compared to simpler control strategies."
  },
  {
    id: 'hvac-l3-efficiency6',
    question: "What is the purpose of an economizer in an air handling unit?",
    options: ["To reduce fan energy consumption only", "To recover heat from extract air", "To use outdoor air for 'free cooling' when conditions are suitable", "To filter recirculated air more effectively"],
    correctAnswer: "To use outdoor air for 'free cooling' when conditions are suitable",
    explanation: "An economizer in an air handling unit uses outdoor air for 'free cooling' when conditions are suitable. When the outdoor air temperature and humidity are favorable (cooler than return air), the economizer increases the proportion of fresh air and reduces recirculated air, providing cooling without mechanical refrigeration. This strategy can significantly reduce cooling energy consumption during mild weather conditions, particularly in buildings with high internal heat gains."
  },
  {
    id: 'hvac-l3-efficiency7',
    question: "Which of the following variable speed drive (VSD) control strategies for pumps saves the most energy?",
    options: ["Constant differential pressure control", "Constant flow control", "Proportional differential pressure control", "Manual speed adjustment"],
    correctAnswer: "Proportional differential pressure control",
    explanation: "Proportional differential pressure control for pumps with VSDs saves the most energy. This strategy reduces the pressure setpoint as flow decreases, recognizing that at lower flows, the system requires less pressure to overcome reduced friction losses. The control algorithm typically sets pressure proportional to flow squared, following the pump affinity laws. This approach saves significantly more energy than constant differential pressure control, often yielding additional 10-15% energy savings."
  },
  {
    id: 'hvac-l3-efficiency8',
    question: "What is the minimum seasonal efficiency (SEER) required for comfort cooling systems with a cooling capacity > 12kW according to the Non-Domestic Building Services Compliance Guide?",
    options: ["3.5", "4.5", "5.6", "6.5"],
    correctAnswer: "4.5",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum Seasonal Energy Efficiency Ratio (SEER) of 4.5 for comfort cooling systems with a cooling capacity greater than 12kW. This value represents the ratio of cooling output to electrical input over a typical cooling season and serves as a benchmark for minimum acceptable efficiency. Systems with higher SEER values contribute more favorably toward meeting the Target CO₂ Emission Rate (TER)."
  },
  {
    id: 'hvac-l3-efficiency9',
    question: "What is 'demand-controlled ventilation' and where is it most appropriately applied?",
    options: ["Ventilation that runs continuously at maximum capacity, applied in clean rooms", "Ventilation that adjusts airflow based on occupancy or air quality parameters, applied in spaces with variable occupancy", "Ventilation that only operates at night, applied in server rooms", "Ventilation that is manually controlled, applied in residential settings"],
    correctAnswer: "Ventilation that adjusts airflow based on occupancy or air quality parameters, applied in spaces with variable occupancy",
    explanation: "Demand-controlled ventilation adjusts airflow based on occupancy or air quality parameters and is most appropriately applied in spaces with variable occupancy. This control strategy typically uses CO₂ sensors (as an indicator of occupancy) or other pollutant sensors to modulate ventilation rates. It's particularly effective in meeting rooms, classrooms, theaters, retail spaces, and other areas where occupancy fluctuates significantly, potentially reducing ventilation energy by 20-30% compared to constant flow systems."
  },
  {
    id: 'hvac-l3-efficiency10',
    question: "What is the key benefit of a variable refrigerant flow (VRF) system compared to a conventional split system in terms of energy efficiency?",
    options: ["Lower installation cost", "Ability to provide simultaneous heating and cooling to different zones", "Simpler controls", "Lower maintenance requirements"],
    correctAnswer: "Ability to provide simultaneous heating and cooling to different zones",
    explanation: "The key energy efficiency benefit of VRF systems is their ability to provide simultaneous heating and cooling to different zones. By varying refrigerant flow to multiple indoor units from a single outdoor unit, VRF systems can transfer heat between spaces that require cooling and those requiring heating, rather than rejecting all heat outdoors. This heat recovery function significantly improves overall system efficiency, potentially reducing energy consumption by 30% compared to conventional systems."
  },
  {
    id: 'hvac-l3-efficiency11',
    question: "What is the maximum specific fan power (SFP) allowed for a central mechanical ventilation system with heating and cooling according to the current Building Regulations?",
    options: ["1.6 W/(l/s)", "2.0 W/(l/s)", "2.5 W/(l/s)", "3.0 W/(l/s)"],
    correctAnswer: "2.0 W/(l/s)",
    explanation: "According to current Building Regulations, the maximum specific fan power (SFP) allowed for a central mechanical ventilation system with heating and cooling is 2.0 W/(l/s). This limit balances the need for adequate ventilation with energy efficiency objectives. Lower values indicate more efficient systems, with reduced fan energy consumption. Design strategies to achieve this include selecting efficient fans, minimizing pressure drop through careful ductwork design, and proper system sizing."
  },
  {
    id: 'hvac-l3-efficiency12',
    question: "What is 'optimum start control' in HVAC systems?",
    options: ["Starting all equipment simultaneously for maximum efficiency", "A control strategy that uses multiple start signals to prevent electrical surges", "A control strategy that calculates the latest possible start time to achieve setpoint conditions by occupancy time", "A method to ensure systems never operate during peak electricity tariff periods"],
    correctAnswer: "A control strategy that calculates the latest possible start time to achieve setpoint conditions by occupancy time",
    explanation: "Optimum start control is a strategy that calculates the latest possible start time to achieve setpoint conditions by occupancy time. This algorithm learns the thermal response of the building and considers outdoor and indoor temperatures to determine when to start heating or cooling systems. By delaying the start of HVAC equipment until absolutely necessary while still ensuring comfort by occupancy time, it eliminates unnecessary running hours and typically saves 10-15% of energy compared to fixed-time scheduling."
  },
  {
    id: 'hvac-l3-efficiency13',
    question: "What is the minimum thermal efficiency required for a direct-fired natural gas boiler according to the Non-Domestic Building Services Compliance Guide?",
    options: ["70%", "82%", "91%", "97%"],
    correctAnswer: "91%",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum thermal efficiency of 91% for direct-fired natural gas boilers. This efficiency level effectively mandates condensing boiler technology, which recovers latent heat from flue gases through condensation. Condensing boilers achieve higher efficiency by operating with lower return water temperatures, typically below 55°C, allowing water vapor in the flue gas to condense and release additional heat."
  },
  {
    id: 'hvac-l3-efficiency14',
    question: "What is the most energy-efficient method for humidity control in air handling systems?",
    options: ["Steam humidification followed by cooling and reheating", "Desiccant dehumidification with resistive electric humidification", "Use of heat recovery with dew point control", "Constant volume cooling with proportional reheat"],
    correctAnswer: "Use of heat recovery with dew point control",
    explanation: "The most energy-efficient method for humidity control is using heat recovery with dew point control. This approach manages humidity by controlling the cooling coil surface temperature to maintain a specific dew point, while using heat recovery to reheat the air to the desired supply temperature. This avoids the energy waste of overcooling and reheating, or the high energy consumption of desiccant regeneration, potentially reducing energy use by 30-40% compared to conventional dehumidification methods."
  },
  {
    id: 'hvac-l3-efficiency15',
    question: "What is the minimum heat recovery efficiency required for air handling units with heat recovery according to the Non-Domestic Building Services Compliance Guide?",
    options: ["47%", "57%", "67%", "73%"],
    correctAnswer: "73%",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum heat recovery efficiency of 73% for air handling units with heat recovery. This efficiency represents the percentage of heat from the extract air stream that is transferred to the supply air stream. Higher efficiency heat recovery systems, such as counterflow plate heat exchangers or thermal wheels with efficiencies of 80-90%, can provide significant energy savings beyond this minimum requirement."
  },
  {
    id: 'hvac-l3-efficiency16',
    question: "Which of the following represents the correct calculation for Coefficient of Performance (COP) for a heat pump?",
    options: ["Electrical energy input ÷ Heating energy output", "Heating energy output ÷ Electrical energy input", "Cooling energy output ÷ Heating energy input", "Heating energy input ÷ Cooling energy output"],
    correctAnswer: "Heating energy output ÷ Electrical energy input",
    explanation: "The Coefficient of Performance (COP) for a heat pump is calculated as heating energy output divided by electrical energy input. This dimensionless ratio indicates how efficiently the heat pump converts electricity into useful heat. For example, a COP of 3.0 means that for every 1 kWh of electricity consumed, the heat pump delivers 3 kWh of heat to the building, with the additional energy extracted from the external heat source (air, ground, or water)."
  },
  {
    id: 'hvac-l3-efficiency17',
    question: "What is the purpose of 'free cooling' in a chilled water system?",
    options: ["To provide cooling at no financial cost", "To use ambient conditions to provide cooling with reduced mechanical refrigeration", "To eliminate the need for pumps", "To provide cooling using renewable energy only"],
    correctAnswer: "To use ambient conditions to provide cooling with reduced mechanical refrigeration",
    explanation: "The purpose of 'free cooling' in chilled water systems is to use ambient conditions to provide cooling with reduced mechanical refrigeration. When outdoor temperatures are sufficiently low (typically below 12-15°C), cooling can be provided by rejecting heat directly to the outside air through a heat exchanger or waterside economizer, bypassing energy-intensive compressors. This approach can reduce cooling energy consumption by 40-70% during suitable weather conditions."
  },
  {
    id: 'hvac-l3-efficiency18',
    question: "According to the UK's Building Regulations Part L2, what is the maximum allowable specific fan power (SFP) for a central mechanical ventilation system incorporating heating, cooling and heat recovery?",
    options: ["1.8 W/(l/s)", "2.2 W/(l/s)", "2.6 W/(l/s)", "3.0 W/(l/s)"],
    correctAnswer: "2.6 W/(l/s)",
    explanation: "According to the UK's Building Regulations Part L2, the maximum allowable specific fan power (SFP) for a central mechanical ventilation system incorporating heating, cooling, and heat recovery is 2.6 W/(l/s). This higher allowance (compared to 2.0 W/(l/s) for systems with heating and cooling only) recognizes the additional pressure drop introduced by heat recovery devices while still promoting energy-efficient fan selection and system design."
  },
  {
    id: 'hvac-l3-efficiency19',
    question: "What is the primary purpose of a Building Energy Management System (BEMS)?",
    options: ["To record energy consumption for billing purposes only", "To automatically control, monitor and optimize building services to reduce energy consumption while maintaining comfort", "To restrict occupant control of the indoor environment", "To provide maintenance alerts only"],
    correctAnswer: "To automatically control, monitor and optimize building services to reduce energy consumption while maintaining comfort",
    explanation: "The primary purpose of a Building Energy Management System (BEMS) is to automatically control, monitor and optimize building services to reduce energy consumption while maintaining comfort. A BEMS integrates control of HVAC, lighting, and other building systems, implementing advanced strategies like optimum start/stop, weather compensation, load shedding, and trend analysis. Properly implemented BEMS typically reduce building energy consumption by 15-30% compared to conventional controls."
  },
  {
    id: 'hvac-l3-efficiency20',
    question: "What is the most energy-efficient method for controlling multiple chillers in a chilled water system?",
    options: ["Running all chillers at equal part load", "Sequence control with load-based staging and dedicated primary pumps", "Equal run-time sharing regardless of efficiency", "Manual rotation on a weekly schedule"],
    correctAnswer: "Sequence control with load-based staging and dedicated primary pumps",
    explanation: "The most energy-efficient method for controlling multiple chillers is sequence control with load-based staging and dedicated primary pumps. This approach runs the minimum number of chillers needed to meet the load, stages them based on efficiency (running the most efficient chillers first), and uses dedicated primary pumps to ensure flow through operating chillers only. This strategy maximizes part-load efficiency, eliminates unnecessary pumping energy, and can reduce energy consumption by 15-30% compared to simpler control strategies."
  },
  {
    id: 'hvac-l3-efficiency21',
    question: "What is the energy efficiency advantage of a thermal wheel (rotary heat exchanger) compared to a plate heat exchanger?",
    options: ["Lower initial cost", "Higher heat recovery efficiency and potential for humidity recovery", "Elimination of cross-contamination risk", "Lower maintenance requirements"],
    correctAnswer: "Higher heat recovery efficiency and potential for humidity recovery",
    explanation: "The energy efficiency advantage of a thermal wheel compared to a plate heat exchanger is its higher heat recovery efficiency (typically 70-85% versus 50-70% for plates) and potential for humidity recovery. Thermal wheels can transfer both sensible and latent heat when equipped with desiccant coating, recovering moisture in winter and removing it in summer. This can significantly reduce heating, cooling, and humidification/dehumidification energy consumption in appropriate applications."
  },
  {
    id: 'hvac-l3-efficiency22',
    question: "According to CIBSE, what is the most appropriate control strategy for a variable air volume (VAV) system to maximize energy efficiency?",
    options: ["Constant static pressure control", "Supply air temperature reset based on outdoor temperature", "Static pressure reset based on VAV damper positions", "Constant air volume with temperature variation"],
    correctAnswer: "Static pressure reset based on VAV damper positions",
    explanation: "According to CIBSE, the most appropriate energy-efficient control strategy for VAV systems is static pressure reset based on VAV damper positions. This approach reduces the duct static pressure setpoint when VAV dampers are less open (indicating excess pressure), then increases it only when needed to satisfy the most demanding zone. This strategy potentially reduces fan energy consumption by 30-50% compared to constant static pressure control by eliminating unnecessary pressure and associated fan power."
  },
  {
    id: 'hvac-l3-efficiency23',
    question: "What is 'weather compensation control' in heating systems and how does it save energy?",
    options: ["Adjusting indoor temperature setpoints based on wind speed", "Turning heating off during rain or snow", "Varying the flow temperature of heating systems based on outdoor temperature", "Scheduling heating operation based on weather forecasts"],
    correctAnswer: "Varying the flow temperature of heating systems based on outdoor temperature",
    explanation: "Weather compensation control adjusts the flow temperature of heating systems based on outdoor temperature. As outdoor temperatures rise, the system reduces the heating water temperature while still meeting the building's heat loss requirements. This approach improves boiler efficiency (particularly for condensing boilers), reduces distribution losses, and improves control stability. Weather compensation typically saves 10-15% of heating energy compared to fixed-temperature operation."
  },
  {
    id: 'hvac-l3-efficiency24',
    question: "What is the primary energy efficiency benefit of variable speed drives (VSDs) for fans and pumps?",
    options: ["Extending equipment life only", "Enabling soft-start to reduce mechanical stress only", "Reducing energy consumption at part-load conditions according to the cube law relationship", "Eliminating the need for control valves and dampers"],
    correctAnswer: "Reducing energy consumption at part-load conditions according to the cube law relationship",
    explanation: "The primary energy efficiency benefit of VSDs for fans and pumps is reducing energy consumption at part-load conditions according to the cube law relationship. This fundamental principle states that power consumption is proportional to the cube of speed, meaning a 20% reduction in speed yields approximately 50% energy savings. Since HVAC systems operate at part-load conditions for most of their operating hours, VSDs typically save 30-50% of fan and pump energy compared to conventional control methods."
  },
  {
    id: 'hvac-l3-efficiency25',
    question: "According to the Non-Domestic Building Services Compliance Guide, what is the minimum Seasonal Energy Efficiency Ratio (SEER) required for a single-split air conditioner with cooling capacity less than 12kW?",
    options: ["3.9", "4.0", "5.1", "6.1"],
    correctAnswer: "5.1",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum Seasonal Energy Efficiency Ratio (SEER) of 5.1 for single-split air conditioners with cooling capacity less than 12kW. This relatively high efficiency requirement reflects the availability of high-efficiency equipment in this size range and the drive to reduce carbon emissions from small air conditioning systems, which are installed in large numbers across the commercial building stock."
  },
  {
    id: 'hvac-l3-efficiency26',
    question: "What is a 'dead band' in HVAC control and how does it contribute to energy efficiency?",
    options: ["A period when all systems are shut down", "A fault condition where controls are unresponsive", "A temperature range within which neither heating nor cooling systems operate", "A control zone where manual operation is required"],
    correctAnswer: "A temperature range within which neither heating nor cooling systems operate",
    explanation: "A 'dead band' in HVAC control is a temperature range within which neither heating nor cooling systems operate. For example, with a heating setpoint of 20°C and cooling setpoint of 24°C, there's a 4°C dead band. This prevents energy-wasting simultaneous heating and cooling or rapid cycling between modes, and allows for a 'floating' range where the building naturally maintains comfortable conditions without mechanical intervention, typically saving 5-10% in energy consumption."
  },
  {
    id: 'hvac-l3-efficiency27',
    question: "What is the most energy-efficient pump configuration for a large variable flow hydronic system?",
    options: ["Multiple equally-sized pumps in parallel with variable speed drives", "A single large pump with a bypass valve", "Multiple pumps arranged in series", "A primary-secondary arrangement with constant speed primary pumps"],
    correctAnswer: "Multiple equally-sized pumps in parallel with variable speed drives",
    explanation: "The most energy-efficient pump configuration for large variable flow hydronic systems is multiple equally-sized pumps in parallel with variable speed drives. This arrangement allows pumps to be staged based on demand, keeping each operating pump near its best efficiency point while accommodating wide flow variations. This approach typically saves 30-40% in pumping energy compared to traditional arrangements and provides redundancy for critical applications."
  },
  {
    id: 'hvac-l3-efficiency28',
    question: "What does the term 'part load ratio' (PLR) refer to in chiller efficiency analysis?",
    options: ["The ratio of chiller cooling capacity to the building's total cooling load", "The percentage of full load at which a chiller is operating", "The ratio of chiller energy input to cooling output", "The ratio of cooling to heating provided simultaneously"],
    correctAnswer: "The percentage of full load at which a chiller is operating",
    explanation: "Part load ratio (PLR) refers to the percentage of full load at which a chiller is operating. Since chillers typically operate at 40-70% of their capacity for most of their running hours, part-load efficiency is often more important than full-load efficiency for annual energy consumption. Modern chillers with variable speed drives can maintain high efficiency across a wide PLR range, while older fixed-speed chillers experience significant efficiency degradation at lower PLRs."
  },
  {
    id: 'hvac-l3-efficiency29',
    question: "Which of the following control strategies is most effective for optimizing the efficiency of cooling towers?",
    options: ["Maintaining a constant leaving water temperature setpoint year-round", "Varying the leaving water temperature setpoint based on ambient wet-bulb temperature and chiller load", "Running tower fans at constant speed", "Cycling fans on and off based on fixed temperature settings"],
    correctAnswer: "Varying the leaving water temperature setpoint based on ambient wet-bulb temperature and chiller load",
    explanation: "Varying the cooling tower leaving water temperature setpoint based on ambient wet-bulb temperature and chiller load is most effective for optimizing efficiency. This approach, known as 'floating condenser water temperature' control, lowers the setpoint when conditions permit (cooler, drier ambient conditions), improving chiller efficiency, while raising it during challenging conditions to minimize fan energy. The strategy balances chiller and tower fan energy consumption to minimize total system energy, typically saving 3-5% of annual cooling energy."
  },
  {
    id: 'hvac-l3-efficiency30',
    question: "According to CIBSE TM54, what is the most accurate method for estimating operational energy use in buildings?",
    options: ["Using Building Regulations compliance calculations", "Using benchmarks based on building type", "Detailed modeling including actual operating hours, equipment, and operational profiles", "Comparing to similar buildings in the same location"],
    correctAnswer: "Detailed modeling including actual operating hours, equipment, and operational profiles",
    explanation: "According to CIBSE TM54, the most accurate method for estimating operational energy use is detailed modeling including actual operating hours, equipment, and operational profiles. This methodology addresses the 'performance gap' between design and actual energy use by considering realistic operational patterns rather than standardized assumptions used in compliance calculations. The approach includes sensitivity analysis and allows for 'what-if' scenario testing to optimize operational efficiency."
  },
  {
    id: 'hvac-l3-efficiency31',
    question: "What is the minimum seasonal space heating energy efficiency required for a direct gas-fired warm air heater according to the Non-Domestic Building Services Compliance Guide?",
    options: ["73%", "86%", "91%", "93%"],
    correctAnswer: "91%",
    explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum seasonal space heating energy efficiency of 91% for direct gas-fired warm air heaters. This efficiency level reflects the use of condensing technology and proper control systems. Direct-fired heaters can achieve high efficiency because combustion products mix directly with the airstream, eliminating heat exchanger losses, though they require adequate ventilation to remove combustion byproducts."
  },
  {
    id: 'hvac-l3-efficiency32',
    question: "What is the primary purpose of a heat meter in a heating system?",
    options: ["To control heat output", "To measure and record energy used for heating to enable accurate billing and performance monitoring", "To prevent overheating", "To control pump speed"],
    correctAnswer: "To measure and record energy used for heating to enable accurate billing and performance monitoring",
    explanation: "The primary purpose of a heat meter is to measure and record energy used for heating to enable accurate billing and performance monitoring. Heat meters typically measure flow rate and temperature differential to calculate energy consumption in kilowatt-hours (kWh). They are essential for heat networks, performance contracting, and energy management systems. Modern meters often include communication capabilities for remote reading, facilitating ongoing performance optimization."
  },
  {
    id: 'hvac-l3-efficiency33',
    question: "What is the energy efficiency advantage of an electronically commutated (EC) motor compared to a standard AC induction motor?",
    options: ["Lower initial cost", "Higher efficiency, particularly at part load", "Simpler wiring requirements", "Higher maximum speed"],
    correctAnswer: "Higher efficiency, particularly at part load",
    explanation: "The energy efficiency advantage of EC motors is their higher efficiency, particularly at part load. EC motors can maintain 70-80% efficiency across their operating range, while AC induction motors typically drop to 40-60% efficiency at part load. Additionally, EC motors have built-in variable speed capability without requiring external VSDs, making them ideal for applications like fan coil units and air handling units, where they can reduce energy consumption by 30-70% compared to AC motors with conventional controls."
  },
  {
    id: 'hvac-l3-efficiency34',
    question: "What is 'thermal mass activation' in building services design and how does it contribute to energy efficiency?",
    options: ["A method to increase the structural strength of buildings", "Using the building's structure to store and release thermal energy, reducing peak loads and enabling use of lower-grade heat sources", "A method to eliminate thermal bridging in the building envelope", "A system to automatically adjust U-values based on outdoor temperature"],
    correctAnswer: "Using the building's structure to store and release thermal energy, reducing peak loads and enabling use of lower-grade heat sources",
    explanation: "Thermal mass activation uses the building's structure (typically concrete floors or ceilings) to store and release thermal energy through embedded pipes carrying water for heating or cooling. This strategy provides several efficiency benefits: it reduces peak loads by distributing heating/cooling over longer periods, enables use of lower-grade heat sources (like heat pumps operating at lower temperatures), and takes advantage of off-peak electricity or free cooling. It can reduce cooling plant capacity by 20-50% and annual energy consumption by 10-30%."
  },
  {
    id: 'hvac-l3-efficiency35',
    question: "What is the definition of 'Seasonal Coefficient of Performance' (SCOP) for a heat pump?",
    options: ["The ratio of heating output to electrical input at maximum capacity", "The ratio of cooling output to electrical input over a year", "The ratio of heating output to electrical input across a defined heating season, accounting for varying conditions", "The efficiency of the heat pump at its lowest operating temperature"],
    correctAnswer: "The ratio of heating output to electrical input across a defined heating season, accounting for varying conditions",
    explanation: "Seasonal Coefficient of Performance (SCOP) is the ratio of heating output to electrical input across a defined heating season, accounting for varying conditions. Unlike the standard COP measured at specific test conditions, SCOP considers actual operating conditions, including temperature variations, part-load operation, defrost cycles, and auxiliary energy use. This provides a more realistic efficiency measure for comparing heat pump systems under typical UK climate conditions."
  },
  {
    id: 'hvac-l3-efficiency36',
    question: "According to CIBSE Guide F, what is the recommended control strategy for optimum energy efficiency in a chilled water system with multiple chillers of different efficiencies?",
    options: ["Running all chillers at equal part load", "Sequence control based on chiller efficiency, running the most efficient chillers first", "Random rotation to equalize wear", "Always prioritizing the newest chiller regardless of efficiency"],
    correctAnswer: "Sequence control based on chiller efficiency, running the most efficient chillers first",
    explanation: "CIBSE Guide F recommends sequence control based on chiller efficiency, running the most efficient chillers first for optimum energy efficiency in systems with multiple chillers of different efficiencies. This strategy prioritizes chillers with the highest COP/SEER for base loads, bringing less efficient units online only when necessary. This approach can reduce energy consumption by 10-20% compared to equal load sharing or simple sequential operation based solely on capacity or age."
  },
  {
    
        id: 'hvac-l3-efficiency37',
        question: "What is the maximum specific fan power (SFP) allowed for local ventilation units with heat recovery in the UK?",
        options: ["0.8 W/(l/s)", "1.2 W/(l/s)", "1.5 W/(l/s)", "2.0 W/(l/s)"],
        correctAnswer: "1.5 W/(l/s)",
        explanation: "According to the UK's Building Regulations Non-Domestic Building Services Compliance Guide, the maximum specific fan power (SFP) allowed for local ventilation units with heat recovery is 1.5 W/(l/s). This limit is lower than for central systems, reflecting the typically lower pressure drops in local units. Manufacturers must demonstrate compliance through standardized testing, with the SFP calculation including all fan power consumption divided by the design airflow rate."
      },
      {
        id: 'hvac-l3-efficiency38',
        question: "What are 'Tri-generation' systems in building services engineering?",
        options: ["Systems that provide three different temperature levels", "Systems that use three separate fuel sources", "Systems that simultaneously produce electricity, heating and cooling", "Systems that combine three different types of renewable energy"],
        correctAnswer: "Systems that simultaneously produce electricity, heating and cooling",
        explanation: "Tri-generation systems simultaneously produce electricity, heating, and cooling from a single fuel source. This is typically achieved using a Combined Heat and Power (CHP) engine with an absorption chiller that uses the heat output to generate cooling. By utilizing what would otherwise be waste heat for both heating and cooling applications, tri-generation can achieve overall system efficiencies of 80-85%, significantly higher than separate generation of electricity, heating, and cooling."
      },
      {
        id: 'hvac-l3-efficiency39',
        question: "What is the maximum U-value requirement for new windows in non-domestic buildings according to current UK Building Regulations Part L2A?",
        options: ["1.8 W/m²K", "2.2 W/m²K", "2.7 W/m²K", "3.0 W/m²K"],
        correctAnswer: "1.8 W/m²K",
        explanation: "The maximum U-value requirement for new windows in non-domestic buildings according to current UK Building Regulations Part L2A is 1.8 W/m²K. This represents the limiting fabric parameter for commercial glazing and typically requires double glazing with low-emissivity coating and inert gas filling. Lower U-values reduce heat loss in winter and heat gain in summer, improving energy efficiency and helping to meet the Target CO₂ Emission Rate (TER)."
      },
      {
        id: 'hvac-l3-efficiency40',
        question: "What is the primary benefit of a variable primary flow (VPF) chilled water system compared to a primary-secondary arrangement?",
        options: ["Lower initial cost", "Simplified controls", "Elimination of the energy waste from primary-secondary decoupling", "Improved chiller sequencing"],
        correctAnswer: "Elimination of the energy waste from primary-secondary decoupling",
        explanation: "The primary benefit of variable primary flow (VPF) chilled water systems is the elimination of energy waste from primary-secondary decoupling. Traditional primary-secondary systems maintain constant flow through chillers while varying flow to loads, which can waste pumping energy and reduce overall system efficiency. VPF systems directly vary flow through both chillers and loads, typically reducing pumping energy by 30-50% while maintaining stable chiller operation through careful control of minimum flow rates."
      },
      {
        id: 'hvac-l3-efficiency41',
        question: "According to CIBSE Guide L, what is the recommended control strategy for optimising ventilation in car parks?",
        options: ["Continuous operation at full capacity 24/7", "Time-scheduled operation regardless of air quality", "CO and NO₂ sensor-based demand control with variable speed fans", "Motion sensors only"],
        correctAnswer: "CO and NO₂ sensor-based demand control with variable speed fans",
        explanation: "CIBSE Guide L recommends CO and NO₂ sensor-based demand control with variable speed fans for car park ventilation. This strategy modulates ventilation rates based on actual pollutant levels, maintaining air quality while minimizing energy consumption. Fan speeds increase when pollutant concentrations rise above setpoints and decrease when levels fall. This approach can reduce ventilation energy consumption by 50-70% compared to continuous operation while ensuring safety standards are met."
      },
      {
        id: 'hvac-l3-efficiency42',
        question: "What is the purpose of the 'Building Emission Rate' (BER) in Part L2A of the Building Regulations?",
        options: ["To measure actual emissions during building operation", "To calculate carbon offset payments", "To compare the designed building's CO₂ emissions against the Target Emission Rate for compliance verification", "To determine ventilation requirements"],
        correctAnswer: "To compare the designed building's CO₂ emissions against the Target Emission Rate for compliance verification",
        explanation: "The Building Emission Rate (BER) in Part L2A is used to compare the designed building's CO₂ emissions against the Target Emission Rate (TER) for compliance verification. The BER must not exceed the TER for a building to comply with regulations. The BER is calculated using approved software (typically SBEM or DSM) and accounts for the building's fabric, services efficiency, controls, and renewable energy systems. This approach allows design flexibility while ensuring minimum energy performance standards are met."
      },
      {
        id: 'hvac-l3-efficiency43',
        question: "What is 'night purge ventilation' and how does it improve energy efficiency?",
        options: ["Running ventilation only at night to save on daytime electricity costs", "A strategy to use cool night air to pre-cool the building fabric, reducing daytime cooling loads", "A method for removing contaminated air at the end of each day", "A backup ventilation system that only operates during power outages"],
        correctAnswer: "A strategy to use cool night air to pre-cool the building fabric, reducing daytime cooling loads",
        explanation: "Night purge ventilation uses cool night air to pre-cool the building fabric, reducing daytime cooling loads. This strategy is particularly effective in buildings with significant thermal mass and in climates with large diurnal temperature swings. By removing heat accumulated during the day and cooling the structure overnight, night purge can reduce peak cooling loads by 20-30% and shift cooling energy demand away from peak utility periods, potentially saving 5-15% of annual cooling energy."
      },
      {
        id: 'hvac-l3-efficiency44',
        question: "What is the minimum requirement for zoning controls in heating and cooling systems according to the Non-Domestic Building Services Compliance Guide?",
        options: ["One zone per floor regardless of size or usage", "One zone per building", "Separate zones for areas with different occupancy patterns, solar gain, or functional requirements", "Maximum zone size of 200m²"],
        correctAnswer: "Separate zones for areas with different occupancy patterns, solar gain, or functional requirements",
        explanation: "The Non-Domestic Building Services Compliance Guide requires separate control zones for areas with different occupancy patterns, solar gain, or functional requirements. This ensures areas receive heating or cooling only when needed and at appropriate temperatures. For example, perimeter zones with solar gain require different treatment than interior zones, and spaces with different operating hours should be separately controlled. Proper zoning typically reduces energy consumption by 10-20% compared to whole-building control."
      },
      {
        id: 'hvac-l3-efficiency45',
        question: "What is 'chiller sequencing' and how does it improve system efficiency?",
        options: ["A maintenance schedule for rotating chiller usage", "The physical arrangement of chillers in the plant room", "A control strategy to stage multiple chillers to maintain optimal part-load efficiencies", "A method for balancing water flow through chillers"],
        correctAnswer: "A control strategy to stage multiple chillers to maintain optimal part-load efficiencies",
        explanation: "Chiller sequencing is a control strategy to stage multiple chillers to maintain optimal part-load efficiencies. Instead of running multiple chillers at low loads (where efficiency drops), sequencing runs the minimum number of chillers needed at higher loads where they operate more efficiently. Advanced sequencing considers real-time efficiency curves, loading characteristics, and energy costs to determine the most efficient combination of chillers to meet the current load, potentially reducing chiller energy consumption by 15-25%."
      },
      {
        id: 'hvac-l3-efficiency46',
        question: "What is the recommended approach for humidity control in spaces requiring tight humidity control according to CIBSE Guide B?",
        options: ["Simple on/off control of steam humidifiers", "Using building occupants to generate required humidity", "Dedicated systems with dew point control and zoning to minimize the volume of air requiring treatment", "Constant volume reheat systems only"],
        correctAnswer: "Dedicated systems with dew point control and zoning to minimize the volume of air requiring treatment",
        explanation: "CIBSE Guide B recommends dedicated systems with dew point control and zoning to minimize the volume of air requiring tight humidity control. This approach recognizes that humidity control is energy-intensive, so containing it to only areas with specific requirements reduces energy consumption. Dew point control manages humidity more precisely than relative humidity control, while strategic zoning prevents unnecessary humidification/dehumidification of spaces without strict requirements, potentially saving 30-50% compared to building-wide humidity control."
      },
      {
        id: 'hvac-l3-efficiency47',
        question: "According to BS EN 15232, what is the definition of Building Automation and Control System (BACS) efficiency class A?",
        options: ["Standard controls meeting minimum regulatory requirements", "Advanced controls with some energy-efficient functionality", "High energy performance BACS with comprehensive energy management functions", "Basic manually operated controls"],
        correctAnswer: "High energy performance BACS with comprehensive energy management functions",
        explanation: "According to BS EN 15232, BACS efficiency class A represents 'High energy performance BACS with comprehensive energy management functions.' This classification includes advanced features such as demand-based control, historical trending, fault detection and diagnostics, and integrated energy management across all building systems. Class A systems can reduce HVAC energy consumption by 30-50% compared to class D (basic) systems, while maintaining or improving occupant comfort."
      },
      {
        id: 'hvac-l3-efficiency48',
        question: "What is 'hydronic balancing' and why is it important for energy efficiency?",
        options: ["A method for maintaining equal water levels in system components", "The process of achieving design flow rates to each terminal unit in a hydronic system", "A technique for maintaining water quality in closed systems", "A method for equalizing pressures in expansion vessels"],
        correctAnswer: "The process of achieving design flow rates to each terminal unit in a hydronic system",
        explanation: "Hydronic balancing is the process of achieving design flow rates to each terminal unit in a hydronic system. Properly balanced systems ensure all areas receive the intended heating or cooling, prevent overflow to paths of least resistance, and avoid temperature disparities. Unbalanced systems typically require higher pump pressure and flow rates to satisfy underserved areas, wasting pumping energy and impairing temperature control. Proper balancing can reduce pumping energy by 15-30% and overall system energy by 5-15%."
      },
      {
        id: 'hvac-l3-efficiency49',
        question: "What is the primary purpose of Automatic Monitoring and Targeting (aM&T) systems in building energy management?",
        options: ["To control HVAC equipment directly", "To automatically generate compliance certificates", "To collect, analyze and report energy consumption data to identify inefficiencies and verify savings", "To replace building management systems entirely"],
        correctAnswer: "To collect, analyze and report energy consumption data to identify inefficiencies and verify savings",
        explanation: "The primary purpose of Automatic Monitoring and Targeting (aM&T) systems is to collect, analyze and report energy consumption data to identify inefficiencies and verify savings. Unlike control systems that directly operate equipment, aM&T systems focus on performance analysis, benchmarking, and exception reporting. They typically combine sub-metering, data analysis tools, and reporting capabilities to enable ongoing energy management. Properly implemented aM&T systems typically identify 10-15% energy savings opportunities and are crucial for maintaining efficiency over time."
      },
      {
        id: 'hvac-l3-efficiency50',
        question: "What is the minimum heating seasonal performance factor (HSPF) required for an air-to-air heat pump according to the Non-Domestic Building Services Compliance Guide?",
        options: ["2.5", "2.7", "3.0", "3.2"],
        correctAnswer: "2.7",
        explanation: "The Non-Domestic Building Services Compliance Guide requires a minimum heating seasonal performance factor (HSPF) of 2.7 for air-to-air heat pumps. This seasonal efficiency metric accounts for the variation in performance across the heating season as outdoor temperatures fluctuate. The requirement ensures that installed heat pumps deliver acceptable efficiency under UK climate conditions, where performance can drop significantly during colder periods compared to standard rating conditions."
      }
    ];
    
    // ✅ Upload function
    async function uploadQuestions() {
      for (const q of questions) {
        try {
          await setDoc(doc(db, 'questions', 'hvac-l3-efficiency', 'items', q.id), {
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