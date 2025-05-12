// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3SystemDesign.ts

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

// ✅ HVAC Level 3 System Design & Planning Questions
const questions = [
  {
    id: 'hvac-l3-system-design1',
    question: "What is the correct design consideration for determining the cooling capacity required for a commercial office space in the UK?",
    options: ["Only the floor area in square meters", "Floor area multiplied by a standard factor of 120 W/m²", "A detailed calculation considering internal heat gains, solar gain, ventilation, fabric gains/losses and diversity factors", "Match the capacity to the existing heating system"],
    correctAnswer: "A detailed calculation considering internal heat gains, solar gain, ventilation, fabric gains/losses and diversity factors",
    explanation: "The correct approach to determining cooling capacity for a commercial office requires a detailed calculation considering multiple factors: internal heat gains (from people, equipment, lighting), solar gain through glazing, ventilation requirements, fabric heat transfer, and diversity factors. CIBSE Guide A provides the methodology for these calculations, which is necessary for an accurate and efficient system design that avoids both under and over-sizing."
  },
  {
    id: 'hvac-l3-system-design2',
    question: "According to CIBSE Guide A, what is the recommended design temperature for a general office space in the UK during summer conditions?",
    options: ["19-21°C", "21-23°C", "23-25°C", "25-27°C"],
    correctAnswer: "23-25°C",
    explanation: "According to CIBSE Guide A, the recommended summer design temperature for a general office space in the UK is 23-25°C. This range balances comfort for occupants with energy efficiency. The guidance notes that temperatures at the higher end of this range may be acceptable during peak external conditions, particularly in naturally ventilated buildings, while air-conditioned spaces typically maintain the lower end of the range."
  },
  {
    id: 'hvac-l3-system-design3',
    question: "What is the primary factor for determining the required air change rate in a commercial kitchen ventilation system design?",
    options: ["Only the floor area", "Only the ceiling height", "Type and number of cooking appliances and their duty", "Only the number of kitchen staff"],
    correctAnswer: "Type and number of cooking appliances and their duty",
    explanation: "The primary factor for determining the required air change rate in a commercial kitchen ventilation system is the type and number of cooking appliances and their duty. According to CIBSE Guide B and DW/172 (The Standard for Kitchen Ventilation Systems), the heat and pollutant output from specific appliances determines the extraction requirements, with different appliances having standardized extraction rates based on their size and usage intensity."
  },
  {
    id: 'hvac-l3-system-design4',
    question: "When designing a VRF (Variable Refrigerant Flow) air conditioning system, what is the maximum recommended refrigerant pipe length between the outdoor unit and the furthest indoor unit according to typical manufacturer guidelines?",
    options: ["30 meters", "75 meters", "100-165 meters (depending on system type and manufacturer)", "200 meters in all cases"],
    correctAnswer: "100-165 meters (depending on system type and manufacturer)",
    explanation: "The maximum recommended refrigerant pipe length between the outdoor unit and the furthest indoor unit in a VRF system typically ranges from 100-165 meters, depending on the system type and manufacturer. This limitation exists due to pressure drops, oil return considerations, and system efficiency factors. Different manufacturers may specify different maximums, and the actual limitation may vary based on the specific model, refrigerant type, and system configuration."
  },
  {
    id: 'hvac-l3-system-design5',
    question: "What is the correct method for sizing the primary air ductwork in a variable air volume (VAV) system?",
    options: ["Equal friction method only", "Constant velocity method only", "Static regain method only", "A combination of methods, commonly starting with equal friction for main ducts and constant velocity for final runs"],
    correctAnswer: "A combination of methods, commonly starting with equal friction for main ducts and constant velocity for final runs",
    explanation: "The correct method for sizing primary air ductwork in a VAV system typically employs a combination of sizing methods. The equal friction method is commonly used for main ducts to ensure balanced pressure drops, while constant velocity might be used for final runs to ensure adequate air movement and proper terminal unit operation. The design should balance factors like space constraints, noise considerations, system pressure, and future flexibility."
  },
  {
    id: 'hvac-l3-system-design6',
    question: "According to the Building Regulations Part L, what is the minimum Seasonal Energy Efficiency Ratio (SEER) for a comfort cooling system with a cooling capacity greater than 12kW in a new non-domestic building?",
    options: ["2.5", "3.5", "4.5", "5.6"],
    correctAnswer: "4.5",
    explanation: "According to the Building Regulations Part L and the Non-Domestic Building Services Compliance Guide, the minimum Seasonal Energy Efficiency Ratio (SEER) for a comfort cooling system with a cooling capacity greater than 12kW in a new non-domestic building is 4.5. This minimum efficiency requirement helps ensure that new cooling installations contribute to overall building energy efficiency targets and carbon reduction goals."
  },
  {
    id: 'hvac-l3-system-design7',
    question: "What is the Psychrometric process that occurs in a cooling coil with dehumidification?",
    options: ["Sensible heating", "Sensible cooling only", "Cooling and dehumidification (sensible and latent cooling)", "Isothermal humidification"],
    correctAnswer: "Cooling and dehumidification (sensible and latent cooling)",
    explanation: "The psychrometric process that occurs in a cooling coil with dehumidification is cooling and dehumidification, which involves both sensible and latent cooling. As air passes through a cooling coil at a temperature below the air's dew point, the air temperature decreases (sensible cooling) and moisture condenses on the coil (latent cooling/dehumidification). This process appears as a diagonal line moving down and to the left on a psychrometric chart."
  },
  {
    id: 'hvac-l3-system-design8',
    question: "When designing a chilled water system, what is the typical design temperature difference (ΔT) between flow and return for optimum energy efficiency in the UK?",
    options: ["3°C", "6°C", "12°C", "20°C"],
    correctAnswer: "6°C",
    explanation: "The typical design temperature difference (ΔT) between flow and return in a chilled water system in the UK is 6°C (e.g., 6°C flow, 12°C return) for optimum energy efficiency. This differential provides a good balance between pumping energy and heat transfer effectiveness. A larger ΔT would reduce flow rates and pumping energy but might require larger heat transfer surfaces, while a smaller ΔT would increase pumping energy requirements."
  },
  {
    id: 'hvac-l3-system-design9',
    question: "What is a key consideration when designing a heat recovery ventilation system for a building with high humidity loads such as a swimming pool?",
    options: ["Using only plate heat exchangers", "Using only thermal wheels", "Ensuring the heat exchanger type can prevent moisture transfer or is resistant to corrosion", "Heat recovery should never be used in high humidity environments"],
    correctAnswer: "Ensuring the heat exchanger type can prevent moisture transfer or is resistant to corrosion",
    explanation: "When designing heat recovery ventilation for high humidity environments like swimming pools, a key consideration is ensuring the heat exchanger can either prevent moisture transfer (if cross-contamination is a concern) or is resistant to corrosion from chlorinated moisture. Plate heat exchangers with appropriate materials or run-around coil systems are often preferred over thermal wheels for these applications to avoid transferring chlorinated moisture to the supply air stream."
  },
  {
    id: 'hvac-l3-system-design10',
    question: "According to CIBSE Guide B, what is the recommended normal working range for relative humidity in general office spaces?",
    options: ["20-30%", "30-60%", "70-80%", "80-90%"],
    correctAnswer: "30-60%",
    explanation: "According to CIBSE Guide B, the recommended normal working range for relative humidity in general office spaces is 30-60%. This range balances occupant comfort with building health considerations. Below 30%, issues like static electricity and dry skin/eyes can occur, while humidity above 60% can create conditions favorable for mold growth and dust mite proliferation, potentially causing indoor air quality and health problems."
  },
  {
    id: 'hvac-l3-system-design11',
    question: "When designing a heating system for a multi-story office building, which distribution strategy provides the best efficiency and control flexibility?",
    options: ["Central plant with constant volume pumping", "Central plant with pressure-dependent variable volume pumping", "Central plant with differential pressure control and variable volume pumping", "Individual boilers on each floor"],
    correctAnswer: "Central plant with differential pressure control and variable volume pumping",
    explanation: "For a multi-story office building, a central plant with differential pressure control and variable volume pumping provides the best efficiency and control flexibility. This strategy modulates pump speed based on system demand while maintaining adequate pressure at critical points, significantly reducing pumping energy compared to constant volume systems. It allows for zone-level control while benefiting from the efficiency of a well-designed central plant."
  },
  {
    id: 'hvac-l3-system-design12',
    question: "What is the U-value requirement for new windows in non-domestic buildings according to UK Building Regulations Part L2A?",
    options: ["1.0 W/m²K", "1.4 W/m²K", "1.8 W/m²K", "2.2 W/m²K"],
    correctAnswer: "1.4 W/m²K",
    explanation: "According to UK Building Regulations Part L2A, the notional building specification requires new windows in non-domestic buildings to achieve a maximum U-value of 1.4 W/m²K. This standard applies to both curtain walling and conventional windows and helps establish the target CO2 emission rate for the proposed building. However, actual values used in designs may vary as part of the overall energy strategy to meet target emission rates."
  },
  {
    id: 'hvac-l3-system-design13',
    question: "When using the psychrometric chart for HVAC calculations, what does the wet bulb temperature line represent?",
    options: ["Constant humidity ratio", "Constant relative humidity", "Constant enthalpy", "Constant volume"],
    correctAnswer: "Constant enthalpy",
    explanation: "On a psychrometric chart, the wet bulb temperature line represents constant enthalpy (total heat content of the air). These lines run diagonally across the chart from bottom left to top right. When processes follow these lines, like evaporative cooling, the total energy content of the air remains constant, with sensible heat being converted to latent heat or vice versa."
  },
  {
    id: 'hvac-l3-system-design14',
    question: "According to the Fan Efficiency Regulations and Part L compliance, what is the minimum fan efficiency grade (N-grade) required for HVAC system fans with power above 10kW?",
    options: ["N40", "N52", "N62", "N75"],
    correctAnswer: "N62",
    explanation: "According to the Fan Efficiency Regulations (Commission Regulation (EU) No 327/2011) and UK Building Regulations Part L compliance guides, fans with power above 10kW require a minimum fan efficiency grade (N-grade) of 62 (N62). This requirement helps ensure that larger fans, which account for significant energy consumption in HVAC systems, meet minimum efficiency standards to reduce overall building energy use."
  },
  {
    id: 'hvac-l3-system-design15',
    question: "What is the correct approach for determining the heating plant capacity in a commercial building?",
    options: ["Using a fixed W/m² value based on building type", "Basing it on the cooling load plus 20%", "Calculating heat losses at design conditions plus a safety margin and warm-up capacity if appropriate", "Always using the same capacity as similar buildings"],
    correctAnswer: "Calculating heat losses at design conditions plus a safety margin and warm-up capacity if appropriate",
    explanation: "The correct approach for determining heating plant capacity involves calculating heat losses at design conditions (typically external temperature of -3°C to -5°C in most UK locations, depending on location), plus an appropriate safety margin (typically 10-20%). For intermittently heated buildings, additional capacity for warm-up should be included. This methodology, detailed in CIBSE Guide A and B, ensures adequately sized equipment without excessive oversizing."
  },
  {
    id: 'hvac-l3-system-design16',
    question: "What is the primary consideration when sizing condensate drainage pipes for air handling units with cooling coils?",
    options: ["Using the same size as the hydronic connections", "The cooling capacity and latent load", "Only the air volume flow rate", "The physical size of the AHU"],
    correctAnswer: "The cooling capacity and latent load",
    explanation: "When sizing condensate drainage pipes for AHUs with cooling coils, the primary consideration is the cooling capacity and latent load, which determine the condensate volume produced. The condensate production rate depends on the moisture removed from the air, which is directly related to the latent cooling capacity. Proper sizing ensures effective drainage, preventing overflow that could cause water damage or unhygienic conditions."
  },
  {
    id: 'hvac-l3-system-design17',
    question: "What is the recommended air velocity in a main supply duct for a commercial office air conditioning system to balance energy efficiency and noise considerations?",
    options: ["2-3 m/s", "5-8 m/s", "10-12 m/s", "15-20 m/s"],
    correctAnswer: "5-8 m/s",
    explanation: "The recommended air velocity in a main supply duct for commercial office air conditioning systems is typically 5-8 m/s. This range balances energy efficiency (lower velocities require larger ducts but less fan power) with practical space constraints and cost considerations. Higher velocities would generate excessive noise and pressure drop, while lower velocities would require impractically large and expensive ductwork."
  },
  {
    id: 'hvac-l3-system-design18',
    question: "According to Building Regulations Part F, what is the minimum extract ventilation rate required for a commercial kitchen?",
    options: ["15 l/s per person", "30 l/s per person", "40 l/s per cooking device", "10-15 air changes per hour plus specific extraction based on appliances"],
    correctAnswer: "10-15 air changes per hour plus specific extraction based on appliances",
    explanation: "According to Building Regulations Part F and industry standards such as DW/172, commercial kitchens require a general ventilation rate of 10-15 air changes per hour plus specific extraction rates based on the cooking appliances installed. The appliance-specific rates are determined by their size, type, and position, with canopy extraction designed to capture the thermal plume generated during cooking operations."
  },
  {
    id: 'hvac-l3-system-design19',
    question: "What is the correct application of diversity factors when sizing central plant for an office building HVAC system?",
    options: ["Diversity factors should never be applied for safety reasons", "Apply maximum diversity (lowest factors) to minimize plant size", "Apply appropriate diversity based on analysis of building use patterns, occupancy, and equipment operation", "Use standard diversity of 0.7 for all systems"],
    correctAnswer: "Apply appropriate diversity based on analysis of building use patterns, occupancy, and equipment operation",
    explanation: "The correct application of diversity factors requires analyzing specific building use patterns, occupancy profiles, and equipment operation schedules. For example, in an office building, not all zones require peak cooling simultaneously, and not all equipment operates at maximum capacity concurrently. Appropriate diversity factors typically range from 0.75-0.9 for central cooling plant and should be based on calculations rather than arbitrary values."
  },
  {
    id: 'hvac-l3-system-design20',
    question: "When designing a low-temperature hot water heating system for a new commercial building, what is the typical design flow/return temperature regime that balances efficiency with practical radiator sizing?",
    options: ["30/25°C", "45/35°C", "60/40°C", "82/71°C"],
    correctAnswer: "60/40°C",
    explanation: "For new commercial buildings, a flow/return temperature regime of 60/40°C for low-temperature hot water heating systems balances efficiency with practical radiator sizing. This lower temperature differential compared to traditional systems (82/71°C) improves condensing boiler efficiency and heat pump compatibility while keeping radiator sizes reasonable. Even lower temperatures like 45/35°C might be used with underfloor heating or where heat pumps are the primary heat source."
  },
  {
    id: 'hvac-l3-system-design21',
    question: "What is the recommended control strategy for a variable refrigerant flow (VRF) system serving multiple zones with different loading patterns?",
    options: ["Simple on/off control only", "A central BMS with individual zone control capability and scheduling", "Manual control by facility staff", "Fixed setpoints for all zones"],
    correctAnswer: "A central BMS with individual zone control capability and scheduling",
    explanation: "For a VRF system serving multiple zones with different loading patterns, a central BMS with individual zone control capability and scheduling is recommended. This allows each zone to maintain its optimal comfort conditions while enabling centralized monitoring, scheduling based on occupancy patterns, and system optimization. The BMS can interface with the VRF manufacturer's controls while providing overall system integration and energy management."
  },
  {
    id: 'hvac-l3-system-design22',
    question: "When calculating the fresh air requirement for a mechanically ventilated office space, what is the correct approach according to current UK standards?",
    options: ["A fixed rate of 8 l/s per person in all cases", "10 l/s per person plus an allowance for building emissions where required", "Only consider the floor area at 1 l/s per square meter", "Use a fixed 4 air changes per hour rate"],
    correctAnswer: "10 l/s per person plus an allowance for building emissions where required",
    explanation: "According to CIBSE Guide A and Building Regulations Part F, the correct approach for calculating fresh air requirements in offices is 10 l/s per person plus an allowance for building emissions where required. This ensures adequate indoor air quality by addressing both human bioeffluents and pollutants emitted from building materials and furnishings. The calculation should use realistic occupancy densities rather than theoretical maximums."
  },
  {
    id: 'hvac-l3-system-design23',
    question: "What is the primary purpose of a 2-port control valve in a fan coil unit within a variable volume water system?",
    options: ["To provide a constant flow bypass", "To modulate water flow through the coil in response to temperature demand", "To balance the water system manually", "To isolate the unit for maintenance only"],
    correctAnswer: "To modulate water flow through the coil in response to temperature demand",
    explanation: "The primary purpose of a 2-port control valve in a fan coil unit is to modulate water flow through the coil in response to temperature demand. As the space temperature approaches setpoint, the valve modulates closed, reducing water flow through the coil and thus reducing heating or cooling output. In a variable volume water system, this modulation allows pumps to reduce speed as demand decreases, saving significant pumping energy."
  },
  {
    id: 'hvac-l3-system-design24',
    question: "According to CIBSE guidance, what is the correct approach for sizing primary pumps in a chilled water system?",
    options: ["Based solely on the chiller manufacturer's minimum flow rate", "Based on the design water flow rate at the highest pressure drop circuit plus a safety factor", "Always sized 20% larger than the secondary circuit pumps", "Based on a standard 3 kPa/m pressure drop"],
    correctAnswer: "Based on the design water flow rate at the highest pressure drop circuit plus a safety factor",
    explanation: "According to CIBSE guidance, primary pumps in a chilled water system should be sized based on the design water flow rate and the pressure drop of the highest pressure drop circuit plus a safety factor (typically 10-15%). The calculation must include pressure losses through all components including chillers, pipework, valves, and heat exchangers. This approach ensures adequate flow without excessive pumping power."
  },
  {
    id: 'hvac-l3-system-design25',
    question: "What is the recommended design approach for HVAC systems in buildings targeting BREEAM Excellent certification?",
    options: ["Focus only on renewable energy sources", "Ignore energy efficiency if renewable energy is used", "Apply the energy hierarchy: Be Lean (reduce demand), Be Clean (efficient supply), Be Green (renewable sources)", "Maximize system capacity to ensure comfort under all conditions"],
    correctAnswer: "Apply the energy hierarchy: Be Lean (reduce demand), Be Clean (efficient supply), Be Green (renewable sources)",
    explanation: "For buildings targeting BREEAM Excellent certification, the recommended design approach follows the energy hierarchy: Be Lean (reduce energy demand through passive design and efficiency measures), Be Clean (supply energy efficiently with low-carbon technologies), and Be Green (use renewable energy sources). This structured approach ensures fundamental efficiency is addressed before applying renewable technologies, maximizing both carbon reduction and BREEAM credits."
  },
  {
    id: 'hvac-l3-system-design26',
    question: "What is the correct calculation method for determining the supply air volume in a commercial space using the cooling load?",
    options: ["Cooling load ÷ (specific heat capacity of air × design temperature difference × air density)", "Cooling load × (specific heat capacity of air × design temperature difference)", "Cooling load ÷ (room volume × air changes per hour)", "Cooling load × (1.2 kW per m³/s of air)"],
    correctAnswer: "Cooling load ÷ (specific heat capacity of air × design temperature difference × air density)",
    explanation: "The correct calculation method for determining supply air volume is: Cooling load ÷ (specific heat capacity of air × design temperature difference × air density). For example, with a sensible cooling load of 10kW, specific heat capacity of 1.005 kJ/kg·K, temperature difference of 8K, and density of 1.2 kg/m³, the calculation would be: 10 ÷ (1.005 × 8 × 1.2) = 1.04 m³/s. This provides the minimum supply air required to meet the sensible cooling load."
  },
  {
    id: 'hvac-l3-system-design27',
    question: "What is the primary purpose of an air separator in a closed-loop hydronic system?",
    options: ["To increase system pressure", "To remove dissolved and entrained air from the water", "To reduce water flow rate", "To filter out contaminants"],
    correctAnswer: "To remove dissolved and entrained air from the water",
    explanation: "The primary purpose of an air separator in a closed-loop hydronic system is to remove dissolved and entrained air from the water. Air in hydronic systems can cause numerous problems including corrosion, noise, reduced heat transfer efficiency, cavitation damage to pumps, and air-binding of components. An air separator typically uses principles of reduced velocity and pressure differential to release dissolved air and capture it for removal."
  },
  {
    id: 'hvac-l3-system-design28',
    question: "When designing a displacement ventilation system for an auditorium, what is the correct location for the air supply diffusers?",
    options: ["In the ceiling", "At high level on walls", "At floor level or in the lower part of walls", "Only through the seating"],
    correctAnswer: "At floor level or in the lower part of walls",
    explanation: "In a displacement ventilation system for an auditorium, air supply diffusers should be located at floor level or in the lower part of walls. Displacement ventilation works by supplying cool air at low velocity near the floor, which then rises naturally as it warms from heat sources (people, equipment), carrying contaminants upward to be extracted at ceiling level. This creates vertical temperature stratification and more efficient ventilation than mixing systems."
  },
  {
    id: 'hvac-l3-system-design29',
    question: "According to current building energy performance standards, what is the maximum permissible Specific Fan Power (SFP) for a new central mechanical ventilation system with heating and cooling?",
    options: ["1.2 W/(l/s)", "1.6 W/(l/s)", "2.0 W/(l/s)", "2.5 W/(l/s)"],
    correctAnswer: "2.0 W/(l/s)",
    explanation: "According to current building energy performance standards in the UK (Building Regulations Part L2A and the Non-Domestic Building Services Compliance Guide), the maximum permissible Specific Fan Power (SFP) for a new central mechanical ventilation system with heating and cooling is 2.0 W/(l/s). This metric represents the electrical power required to move 1 liter per second of air, and is a key factor in overall building energy performance."
  },
  {
    id: 'hvac-l3-system-design30',
    question: "What is the correct approach for determining the outside air design conditions for HVAC system sizing in the UK?",
    options: ["Always use 35°C summer and -10°C winter for all UK locations", "Use the CIBSE Test Reference Year (TRY) data for the specific location", "Use only Met Office annual average temperatures", "Add a fixed 5°C safety margin to the highest recorded temperature"],
    correctAnswer: "Use the CIBSE Test Reference Year (TRY) data for the specific location",
    explanation: "The correct approach for determining outside air design conditions for HVAC system sizing in the UK is to use the CIBSE Test Reference Year (TRY) data for the specific location. CIBSE Guide A provides design weather data for various UK locations, typically recommending the 99th percentile design values for summer cooling (exceeded 1% of time) and 1st percentile for winter heating (exceeded 99% of time). This provides a statistical basis for appropriate system sizing."
  },
  {
    id: 'hvac-l3-system-design31',
    question: "What is the recommended design approach for a water-side economizer (free cooling) system in the UK climate?",
    options: ["It's not applicable in the UK climate", "Using a plate heat exchanger between the condenser water and chilled water circuits", "Direct air-side free cooling only", "Using the cooling tower to directly cool the building"],
    correctAnswer: "Using a plate heat exchanger between the condenser water and chilled water circuits",
    explanation: "The recommended design approach for a water-side economizer in the UK climate is using a plate heat exchanger between the condenser water and chilled water circuits. This allows the cooling tower to produce chilled water when ambient conditions are favorable (typically below 5-7°C wet bulb), bypassing the chiller and saving significant energy. The UK's moderate climate makes this approach effective for much of the year, especially in data centers and other buildings with year-round cooling loads."
  },
  {
    id: 'hvac-l3-system-design32',
    question: "What is the correct method for sizing the expansion vessel in a closed hydronic heating system?",
    options: ["10% of the system volume in all cases", "Based on the system volume, initial pressure, and maximum operating pressure", "Based only on the boiler capacity", "Based only on the pump flow rate"],
    correctAnswer: "Based on the system volume, initial pressure, and maximum operating pressure",
    explanation: "The correct method for sizing an expansion vessel involves calculating the acceptance volume based on the system water volume, initial fill pressure, cold fill pressure, and maximum operating pressure. The calculation accounts for water's expansion when heated and ensures the system pressure remains within safe limits. For a typical LTHW system operating at 82/71°C, the expansion volume is approximately 3.5-4% of the system volume, adjusted by pressure factors."
  },
  {
    id: 'hvac-l3-system-design33',
    question: "When designing a ventilation system for a clean room manufacturing facility, what is the primary consideration for air filtration selection?",
    options: ["Only initial cost of filters", "Achieving the required ISO classification through appropriate filtration efficiency", "Using only the largest filter size available", "Using only washable filters"],
    correctAnswer: "Achieving the required ISO classification through appropriate filtration efficiency",
    explanation: "When designing ventilation for clean rooms, the primary consideration for air filtration is achieving the required ISO classification (e.g., ISO 14644-1 classes 5-8) through appropriate filtration efficiency. This typically involves multi-stage filtration with high-efficiency particulate air (HEPA) or ultra-low particulate air (ULPA) final filters. Selection must consider particle size requirements, air velocity, pressure drop impacts, and maintenance access."
  },
  {
    id: 'hvac-l3-system-design34',
    question: "What type of chilled water pumping arrangement offers the most energy-efficient operation for a large commercial building with variable cooling loads?",
    options: ["Constant volume primary pumping only", "Primary-secondary pumping with constant primary flow", "Primary-variable pumping with variable speed drives", "Primary-secondary-tertiary arrangement in all cases"],
    correctAnswer: "Primary-variable pumping with variable speed drives",
    explanation: "Primary-variable pumping with variable speed drives offers the most energy-efficient operation for large commercial buildings with variable cooling loads. This arrangement eliminates the energy waste of constant-flow primary pumps while maintaining minimum flow requirements through chillers. Modern chillers with electronic flow monitoring allow for variable flow through the evaporator (within manufacturer limits), eliminating the need for energy-consuming primary-secondary arrangements."
  },
  {
    id: 'hvac-l3-system-design35',
    question: "According to the carbon factor in SAP 10, what heating system typically results in the lowest carbon emissions for a new building?",
    options: ["Gas-fired condensing boiler", "Oil-fired boiler", "Direct electric heating", "Heat pump with a reasonable COP (>2.5)"],
    correctAnswer: "Heat pump with a reasonable COP (>2.5)",
    explanation: "According to SAP 10, which significantly reduced the carbon factor for grid electricity (0.136 kgCO₂/kWh) compared to natural gas (0.210 kgCO₂/kWh), a heat pump with a reasonable COP (>2.5) results in the lowest carbon emissions. For example, a heat pump with a COP of 3.0 would produce about 0.045 kgCO₂/kWh of heat delivered, significantly lower than even the most efficient gas boilers, making heat pumps the preferred option for low-carbon heating in new buildings."
  },
  {
    id: 'hvac-l3-system-design36',
    question: "What is the correct calculation method for determining the refrigerant pipe sizes in a split air conditioning system?",
    options: ["Based only on the physical distance between units", "Based on equivalent length, capacity, velocity, and pressure drop considerations", "Always using the connection sizes on the units", "Always using standard 3/8\" liquid and 5/8\" gas lines"],
    correctAnswer: "Based on equivalent length, capacity, velocity, and pressure drop considerations",
    explanation: "The correct calculation method for determining refrigerant pipe sizes involves considering equivalent length (actual length plus allowances for fittings and vertical rises), system capacity, acceptable velocity limits, and pressure drop. Undersized pipes cause excessive pressure drops and capacity loss, while oversized pipes may prevent proper oil return and increase cost. Manufacturers provide sizing charts and software that account for these factors based on specific equipment characteristics."
  },
  {
    id: 'hvac-l3-system-design37',
    question: "What is the correct approach for managing Legionella risk in a domestic hot water system design according to HSE guidance document L8?",
    options: ["Maintaining water temperatures below 20°C", "Ensuring hot water is stored at 60°C and distributed at 50°C minimum", "Using only plastic pipework", "Adding chlorine to the system weekly"],
    correctAnswer: "Ensuring hot water is stored at 60°C and distributed at 50°C minimum",
    explanation: "According to HSE guidance document L8 (The Control of Legionella Bacteria in Water Systems), the correct approach for managing Legionella risk in domestic hot water systems includes ensuring hot water is stored at 60°C and distributed at a minimum of 50°C (55°C in healthcare settings). This temperature regime prevents Legionella proliferation, as the bacteria cannot survive at temperatures above 60°C and grow slowly below 50°C."
  },
  {
    id: 'hvac-l3-system-design38',
    question: "What is the most appropriate type of cooling system for a server room with a high density of equipment and 24/7 operation requirement?",
    options: ["Natural ventilation only", "Comfort cooling split system", "Precision cooling system with N+1 redundancy", "Opening windows with portable fans"],
    correctAnswer: "Precision cooling system with N+1 redundancy",
    explanation: "A precision cooling system with N+1 redundancy is most appropriate for server rooms with high-density equipment and 24/7 operation. These systems maintain precise temperature and humidity control (typically ±1°C and ±5% RH), provide higher sensible heat ratios suited to IT equipment, include advanced monitoring and control features, and offer redundancy to ensure continuous operation even during maintenance or component failure."
  },
  {
    id: 'hvac-l3-system-design39',
    question: "When designing a wet central heating system, what is the recommended expansion vessel pre-charge pressure in relation to system static height?",
    options: ["Equal to the system static pressure", "0.5 bar below system static pressure", "0.3 bar above system static pressure", "Always set at a fixed 1.5 bar regardless of static height"],
    correctAnswer: "0.5 bar below system static pressure",
    explanation: "When designing a wet central heating system, the recommended expansion vessel pre-charge pressure should be 0.5 bar below the system static pressure (which is determined by the static height of the system). This differential ensures proper operation of the expansion vessel while maintaining adequate system pressure. The static pressure is calculated as the height in meters × 0.1 + 0.5 bar (safety margin)."
  },
  {
    id: 'hvac-l3-system-design40',
    question: "According to CIBSE TM54, what is the correct approach for predicting operational energy use in building designs?",
    options: ["Using only the Building Regulations compliance calculations", "Detailed analysis including operating hours, equipment usage patterns, and management factors", "Making assumptions based on similar buildings without calculations", "Using a fixed benchmark of 120 kWh/m²"],
    correctAnswer: "Detailed analysis including operating hours, equipment usage patterns, and management factors",
    explanation: "According to CIBSE TM54 (Evaluating Operational Energy Performance of Buildings at the Design Stage), the correct approach for predicting operational energy use involves detailed analysis including actual operating hours, realistic equipment usage patterns, and management factors. This methodology addresses the 'performance gap' between compliance calculations and actual energy use by modeling how the building will actually be used rather than using standardized assumptions."
  },
  {
    id: 'hvac-l3-system-design41',
    question: "What is the correct method for calculating the pressure drop in a ductwork system?",
    options: ["Based only on duct length", "Based on fitting losses only", "Sum of friction losses in straight ducts plus dynamic losses in fittings", "Always using 1 Pa/m for all ducts"],
    correctAnswer: "Sum of friction losses in straight ducts plus dynamic losses in fittings",
    explanation: "The correct method for calculating pressure drop in a ductwork system is to sum the friction losses in straight ducts (calculated using factors like the duct material roughness, air velocity, and hydraulic diameter) plus the dynamic losses in fittings (calculated using loss coefficients specific to each fitting type and arrangement). The total system pressure drop determines fan selection and energy consumption."
  },
  {
    id: 'hvac-l3-system-design42',
    question: "When designing a heating system using low-carbon heat pumps, what flow temperature should be targeted for optimum efficiency?",
    options: ["30-35°C", "40-45°C", "55-60°C", "70-75°C"],
    correctAnswer: "40-45°C",
    explanation: "When designing heating systems using low-carbon heat pumps, a flow temperature of 40-45°C should be targeted for optimum efficiency. Lower flow temperatures significantly improve heat pump Coefficient of Performance (COP), with each 1°C reduction typically improving efficiency by 2-3%. While even lower temperatures (30-35°C) would further improve efficiency, 40-45°C represents a practical balance for retrofit applications while still enabling efficient operation."
  },
  {
    id: 'hvac-l3-system-design43',
    question: "What is the correct approach for sizing a dirt separator in a closed water system?",
    options: ["Based on the boiler capacity only", "Always using the smallest available size to save space", "Matching the pipe size at the location of installation", "Based on the maximum flow rate and acceptable pressure drop"],
    correctAnswer: "Based on the maximum flow rate and acceptable pressure drop",
    explanation: "The correct approach for sizing a dirt separator is based on the maximum flow rate and acceptable pressure drop. The separator should be sized to handle the design flow rate while maintaining a pressure drop typically below 10 kPa. Undersizing causes excessive pressure drop and velocity, reducing separation efficiency and increasing pumping energy, while oversizing unnecessarily increases cost and space requirements."
  },
  {
    id: 'hvac-l3-system-design44',
    question: "When designing a chilled beam system, what is the primary consideration for avoiding condensation problems?",
    options: ["Using only active chilled beams", "Maintaining a minimum chilled water temperature of 14°C and controlling space dew point", "Installing drip trays under all beams", "Using only supply air at 100% relative humidity"],
    correctAnswer: "Maintaining a minimum chilled water temperature of 14°C and controlling space dew point",
    explanation: "The primary consideration for avoiding condensation in chilled beam systems is maintaining the chilled water temperature above the space dew point (typically minimum 14°C) and controlling the space dew point through dehumidification of primary air. This approach, combined with dew point sensors that can increase water temperature or shut off flow if condensation risk occurs, ensures chilled beam surfaces remain above the dew point temperature under all operating conditions."
  },
  {
    id: 'hvac-l3-system-design45',
    question: "According to BSRIA guidance, what is the best practice for the provision of maintenance access around AHUs and major HVAC equipment?",
    options: ["Minimum 300mm clearance on one side only", "Minimum 600mm clearance where regular access is required (e.g., for filter changes) and component removal clearance elsewhere", "No clearance required if equipment is robust", "Access only needed at the front of the unit"],
    correctAnswer: "Minimum 600mm clearance where regular access is required (e.g., for filter changes) and component removal clearance elsewhere",
    explanation: "According to BSRIA guidance (BG 31/2017), best practice for maintenance access includes minimum 600mm clearance where regular access is required (such as for filter changes, belt adjustments, or control servicing) and sufficient component removal space elsewhere (e.g., for coil removal). Larger clearances may be required for specific components based on manufacturer recommendations, and complete unit replacement strategy should be considered during design."
  },
  {
    id: 'hvac-l3-system-design46',
    question: "What is the appropriate chiller arrangement for a data center requiring 24/7/365 cooling reliability?",
    options: ["Single large chiller", "N+1 redundant configuration with multiple chillers", "Two 50% capacity chillers", "Air-cooled split systems as backup only"],
    correctAnswer: "N+1 redundant configuration with multiple chillers",
    explanation: "For a data center requiring 24/7/365 cooling reliability, an N+1 redundant configuration with multiple chillers is appropriate. This arrangement provides the total required capacity (N) plus one additional unit for redundancy, ensuring that full cooling capacity is maintained even if one chiller fails or is taken offline for maintenance. This approach balances reliability with capital cost, while allowing for efficient part-load operation under normal conditions."
  },
  {
    id: 'hvac-l3-system-design47',
    question: "What is the correct method for determining the required sound attenuation in HVAC systems?",
    options: ["Always using the lowest cost option", "Calculating the required insertion loss based on sound power levels, room characteristics, and background noise criteria", "Using the same standard attenuator for all projects", "Sound attenuation is not necessary for most HVAC systems"],
    correctAnswer: "Calculating the required insertion loss based on sound power levels, room characteristics, and background noise criteria",
    explanation: "The correct method for determining required sound attenuation involves calculating the necessary insertion loss based on equipment sound power levels, sound transmission paths, room acoustic characteristics, and background noise criteria (e.g., NR or NC ratings) for each space. This engineered approach ensures that noise criteria are met without over-specification, considering factors like fan sound power, duct breakout, terminal device noise, and natural attenuation in the system."
  },
  {
    id: 'hvac-l3-system-design48',
    question: "According to current UK Building Regulations, what provision is required for the zoning of heating and cooling systems in commercial buildings?",
    options: ["No zoning is required", "Single zone for each floor only", "Separate zones for areas with different solar exposures, occupancy patterns, or functions", "Zoning only required for buildings over 1000m²"],
    correctAnswer: "Separate zones for areas with different solar exposures, occupancy patterns, or functions",
    explanation: "Current UK Building Regulations (Part L2) require heating and cooling systems in commercial buildings to be divided into separate zones for areas with different solar exposures, occupancy patterns, or functions. Each zone should have independent time and temperature control. This zoning strategy prevents energy waste by heating or cooling unoccupied spaces and addresses different load requirements across the building."
  },
  {
    id: 'hvac-l3-system-design49',
    question: "What is the correct approach for determining the optimum position for temperature sensors in a VAV system?",
    options: ["Always in the return air duct", "Always on an internal wall in the occupied space", "Based on CFD analysis or detailed assessment of air movement, heat sources, and occupancy patterns", "Always at 1.5m above floor level on an external wall"],
    correctAnswer: "Based on CFD analysis or detailed assessment of air movement, heat sources, and occupancy patterns",
    explanation: "The correct approach for determining temperature sensor positions in VAV systems is using CFD analysis or detailed assessment of air movement, heat sources, and occupancy patterns. Sensors should be located where they measure representative space conditions, avoiding direct solar radiation, drafts, heat sources, or stagnant air zones. In complex spaces, CFD can identify the best locations, while simpler spaces might use general guidelines like positioning on internal walls away from supply air streams."
  },
  {
    id: 'hvac-l3-system-design50',
    question: "When designing a HVAC system to comply with WELL Building Standard requirements, what is the primary indoor air quality consideration beyond standard Building Regulations?",
    options: ["Only aesthetic considerations", "Enhanced filtration and monitoring of specific VOCs, particulates, and CO₂", "Reduced ventilation rates to save energy", "Using only natural ventilation"],
    correctAnswer: "Enhanced filtration and monitoring of specific VOCs, particulates, and CO₂",
    explanation: "When designing for WELL Building Standard compliance, the primary indoor air quality consideration beyond Building Regulations is enhanced filtration and monitoring of specific VOCs, particulates, and CO₂. WELL requires higher grade filtration (typically MERV 13/F7 or better), specific VOC limits for materials and ambient air, continuous monitoring of key parameters, and maintains stricter thresholds for numerous pollutants to optimize occupant health and cognitive function."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-system-design', 'items', q.id), {
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
