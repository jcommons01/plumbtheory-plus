// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Controls.ts

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

// ✅ HVAC Level 2 Controls & Instrumentation Questions
const questions = [
  {
    id: 'hvac-l2-controls1',
    question: "What is the function of a thermostat in an HVAC system?",
    options: ["To regulate system pressure", "To control airflow volume", "To control temperature by switching heating or cooling on and off", "To measure humidity levels"],
    correctAnswer: "To control temperature by switching heating or cooling on and off",
    explanation: "A thermostat functions as a temperature-sensitive switch that controls an HVAC system by turning heating or cooling equipment on or off in response to the sensed temperature. When the temperature deviates from the setpoint, the thermostat signals the appropriate equipment to run until the desired temperature is achieved."
  },
  {
    id: 'hvac-l2-controls2',
    question: "What type of controller uses a proportional control algorithm that automatically adjusts its output based on the difference between setpoint and measured value?",
    options: ["On/off controller", "PID controller", "Manual controller", "Digital timer"],
    correctAnswer: "PID controller",
    explanation: "A PID (Proportional-Integral-Derivative) controller uses a control algorithm that continuously calculates an error value as the difference between the desired setpoint and measured process variable. It applies a correction based on proportional, integral, and derivative terms, allowing for precise control with minimal overshoot and oscillation."
  },
  {
    id: 'hvac-l2-controls3',
    question: "What is the purpose of a pressure switch in a refrigeration system?",
    options: ["To regulate refrigerant flow", "To monitor and protect against abnormal pressure conditions", "To control the speed of the compressor", "To measure the temperature of the refrigerant"],
    correctAnswer: "To monitor and protect against abnormal pressure conditions",
    explanation: "A pressure switch in a refrigeration system monitors system pressure and protects against abnormal conditions. It can shut down the compressor if high-pressure conditions occur (which could damage components) or if low-pressure conditions occur (which might indicate refrigerant leakage or other issues). This safety device helps prevent system damage and failure."
  },
  {
    id: 'hvac-l2-controls4',
    question: "What is the advantage of a Building Management System (BMS) in HVAC control?",
    options: ["Lower installation costs compared to standalone controls", "Elimination of the need for mechanical components", "Centralized monitoring and control of multiple building systems", "Reduced need for regular maintenance"],
    correctAnswer: "Centralized monitoring and control of multiple building systems",
    explanation: "The primary advantage of a Building Management System (BMS) is centralized monitoring and control of multiple building systems. A BMS can integrate HVAC, lighting, security, fire safety, and other systems into a single interface, allowing efficient management, scheduling, fault detection, energy optimization, and remote access capabilities."
  },
  {
    id: 'hvac-l2-controls5',
    question: "What is a thermostatic radiator valve (TRV) used for?",
    options: ["To control boiler water temperature", "To balance water flow in a heating system", "To control room temperature by regulating hot water flow through a radiator", "To measure the efficiency of the heating system"],
    correctAnswer: "To control room temperature by regulating hot water flow through a radiator",
    explanation: "A thermostatic radiator valve (TRV) is used to control room temperature by regulating hot water flow through a radiator. It contains a temperature-sensing element that expands and contracts with ambient temperature changes, adjusting the valve opening to allow more or less hot water into the radiator, thereby maintaining the desired room temperature without affecting other spaces."
  },
  {
    id: 'hvac-l2-controls6',
    question: "What is a typical application for a humidistat in an HVAC system?",
    options: ["Controlling fan speed based on air temperature", "Controlling heating output based on outdoor temperature", "Controlling humidification or dehumidification equipment based on relative humidity", "Measuring air velocity in ductwork"],
    correctAnswer: "Controlling humidification or dehumidification equipment based on relative humidity",
    explanation: "A humidistat is typically used for controlling humidification or dehumidification equipment based on relative humidity. It measures the moisture content in the air and activates or deactivates equipment (such as humidifiers, dehumidifiers, or dedicated outdoor air systems) to maintain humidity levels within a desired range for comfort, process requirements, or to prevent issues like mold growth."
  },
  {
    id: 'hvac-l2-controls7',
    question: "What is the function of an air proving switch in a ventilation system?",
    options: ["To measure air temperature", "To verify that air is flowing before allowing heating elements to operate", "To control fan speed", "To filter the air"],
    correctAnswer: "To verify that air is flowing before allowing heating elements to operate",
    explanation: "An air proving switch (also called a flow switch or sail switch) verifies that air is flowing in a ventilation system before allowing heating elements to operate. This safety device prevents the activation of electric heating elements or gas burners when there is inadequate airflow, which could lead to overheating, damage, or fire hazards."
  },
  {
    id: 'hvac-l2-controls8',
    question: "What type of sensor would typically be used to measure carbon dioxide (CO2) levels for demand-controlled ventilation?",
    options: ["Thermistor", "Pitot tube", "Infrared sensor", "Smoke detector"],
    correctAnswer: "Infrared sensor",
    explanation: "CO2 levels for demand-controlled ventilation are typically measured using infrared sensors. These work on the principle of non-dispersive infrared (NDIR) detection, where CO2 absorbs infrared radiation at specific wavelengths. The sensor measures this absorption to determine CO2 concentration, providing an accurate indication of occupancy levels to adjust ventilation rates accordingly."
  },
  {
    id: 'hvac-l2-controls9',
    question: "What is the purpose of a motorized damper in an HVAC system?",
    options: ["To filter the air", "To heat the air stream", "To control airflow in ductwork", "To reduce noise"],
    correctAnswer: "To control airflow in ductwork",
    explanation: "A motorized damper controls airflow in ductwork by adjusting the position of blades or plates that restrict or allow air passage. These can be used for zone control (directing air to specific areas), economizer functions (mixing return and outside air), fire/smoke control, or as part of variable air volume (VAV) systems to modulate airflow based on heating, cooling, or ventilation demands."
  },
  {
    id: 'hvac-l2-controls10',
    question: "What is a two-port valve used for in an HVAC hydronic system?",
    options: ["Mixing water flows", "Diverting water flow", "Controlling flow rate by opening or closing", "Regulating pressure in the system"],
    correctAnswer: "Controlling flow rate by opening or closing",
    explanation: "A two-port valve in an HVAC hydronic system is used for controlling flow rate by opening or closing. It functions as an on/off or modulating valve that regulates the amount of water flowing through a particular circuit or terminal unit (such as a radiator or fan coil). When closed, it stops flow entirely; when open or partially open, it allows proportional flow."
  },
  {
    id: 'hvac-l2-controls11',
    question: "What is the purpose of an anti-cycling control on a compressor?",
    options: ["To prevent the compressor from rotating backwards", "To prevent frequent starting and stopping of the compressor", "To reduce compressor noise", "To increase compressor speed"],
    correctAnswer: "To prevent frequent starting and stopping of the compressor",
    explanation: "An anti-cycling control prevents frequent starting and stopping of the compressor, which is known as 'short-cycling.' This protection is important because compressors experience high inrush current and mechanical stress during startup. Short-cycling can lead to excessive wear, reduced efficiency, and premature failure. Anti-cycling controls enforce a minimum off-time between cycles to protect the equipment."
  },
  {
    id: 'hvac-l2-controls12',
    question: "What type of controller would be best suited for a simple domestic hot water cylinder?",
    options: ["PID controller", "BMS controller", "On/off thermostat", "Variable speed drive"],
    correctAnswer: "On/off thermostat",
    explanation: "An on/off thermostat is best suited for a simple domestic hot water cylinder. This type of controller activates the heating element or boiler when the water temperature falls below the setpoint and deactivates it when the desired temperature is reached. The relatively large thermal mass of water means that the simple on/off control provides adequate temperature regulation without the complexity of more sophisticated controls."
  },
  {
    id: 'hvac-l2-controls13',
    question: "What is the function of a variable speed drive (VSD) in an HVAC system?",
    options: ["To maintain constant fan or pump speed regardless of load", "To control the temperature of the air or water", "To vary the speed of motors to match system demand", "To automatically switch between heating and cooling modes"],
    correctAnswer: "To vary the speed of motors to match system demand",
    explanation: "A variable speed drive (VSD), also known as a variable frequency drive (VFD), varies the speed of motors to match system demand. By adjusting the frequency and voltage supplied to motors that drive fans or pumps, VSDs allow HVAC equipment to operate at reduced speeds when full capacity isn't needed, resulting in significant energy savings compared to traditional on/off or constant-speed operation."
  },
  {
    id: 'hvac-l2-controls14',
    question: "What is 'hunting' in a control system?",
    options: ["The process of finding system leaks", "Oscillation around the setpoint due to over-responsive control", "The automatic search for optimal operating parameters", "A method of quickly reaching the setpoint"],
    correctAnswer: "Oscillation around the setpoint due to over-responsive control",
    explanation: "In control systems, 'hunting' refers to oscillation around the setpoint due to over-responsive control. This occurs when the controller's response to an error is too aggressive, causing it to repeatedly overshoot and undershoot the target value. Hunting can lead to system instability, excessive wear on components (especially modulating valves or dampers), energy waste, and comfort issues."
  },
  {
    id: 'hvac-l2-controls15',
    question: "What standard protocol is commonly used for building automation and control networks in the UK?",
    options: ["USB", "HDMI", "BACnet", "Bluetooth"],
    correctAnswer: "BACnet",
    explanation: "BACnet (Building Automation and Control network) is a standard protocol commonly used for building automation and control networks in the UK and internationally. It was designed specifically for HVAC, lighting, access control, and fire detection systems to communicate with each other regardless of manufacturer, allowing different building systems to interoperate through a standardized communication method."
  },
  {
    id: 'hvac-l2-controls16',
    question: "What is the purpose of a frost thermostat in an air handling unit?",
    options: ["To measure the temperature of supply air", "To protect the heating coil from freezing", "To create frost for humidity control", "To detect snow accumulation on outdoor units"],
    correctAnswer: "To protect the heating coil from freezing",
    explanation: "A frost thermostat in an air handling unit protects the heating coil from freezing. It monitors the temperature at the heating coil (typically water or water/glycol) and activates protective measures if temperatures approach freezing. These measures may include opening heating valves fully, stopping the supply fan, closing outdoor air dampers, or activating alarms to prevent damage from frozen and burst coils."
  },
  {
    id: 'hvac-l2-controls17',
    question: "What is the function of a differential pressure switch in a fan system?",
    options: ["To measure the difference in temperature between supply and return air", "To detect clogged filters or fan failure", "To control the fan speed based on air temperature", "To measure humidity differences"],
    correctAnswer: "To detect clogged filters or fan failure",
    explanation: "A differential pressure switch in a fan system detects clogged filters or fan failure by monitoring the pressure difference across a component. When filters become clogged, the pressure drop increases; when a fan fails, the pressure difference decreases. The switch can trigger alarms or shutdown sequences when readings fall outside acceptable ranges, protecting equipment and alerting maintenance personnel."
  },
  {
    id: 'hvac-l2-controls18',
    question: "What is a 'compensated' control strategy in heating systems?",
    options: ["A system that automatically calculates energy usage costs", "A control that adjusts flow temperature based on outside temperature", "A method to balance uneven heat distribution", "A system that compensates for pressure variations"],
    correctAnswer: "A control that adjusts flow temperature based on outside temperature",
    explanation: "A 'compensated' control strategy in heating systems adjusts the flow temperature based on outside temperature. As outdoor temperatures fall, the system increases the heating water temperature; as outdoor temperatures rise, it reduces the heating water temperature. This weather compensation optimizes comfort and efficiency by providing only the heat output necessary for the current weather conditions."
  },
  {
    id: 'hvac-l2-controls19',
    question: "What is the purpose of a high-pressure cutout switch in a refrigeration system?",
    options: ["To increase system pressure when needed", "To bypass the compressor during startup", "To shut down the compressor if discharge pressure exceeds safe limits", "To regulate refrigerant flow into the evaporator"],
    correctAnswer: "To shut down the compressor if discharge pressure exceeds safe limits",
    explanation: "A high-pressure cutout switch shuts down the compressor if discharge pressure exceeds safe limits. This safety device protects the system from damage that could occur from excessive pressure, which might result from condenser fan failure, blocked condenser coils, non-condensable gases in the system, or overcharge of refrigerant. It typically requires manual reset after triggering."
  },
  {
    id: 'hvac-l2-controls20',
    question: "What does DDC stand for in building controls?",
    options: ["Digital Display Control", "Direct Digital Control", "Demand Driven Cycling", "Dynamic Distribution Control"],
    correctAnswer: "Direct Digital Control",
    explanation: "DDC stands for Direct Digital Control, which refers to automated control systems where digital computers or microprocessors are used to directly control building equipment. DDC systems process input signals from sensors, apply control algorithms, and output signals to actuators without intermediate mechanical devices. They offer more precise control, flexibility, and integration capabilities than pneumatic or electric controls."
  },
  {
    id: 'hvac-l2-controls21',
    question: "What is the purpose of a solenoid valve in a refrigeration system?",
    options: ["To control oil flow to the compressor", "To measure refrigerant pressure", "To control refrigerant flow", "To regulate compressor speed"],
    correctAnswer: "To control refrigerant flow",
    explanation: "A solenoid valve in a refrigeration system controls refrigerant flow. This electrically operated valve opens and closes in response to signals from the control system, allowing or stopping refrigerant flow through a particular circuit. Common applications include controlling refrigerant to multiple evaporators, liquid line solenoids for pump-down cycles, or hot gas bypass for capacity control."
  },
  {
    id: 'hvac-l2-controls22',
    question: "What type of sensor is typically used to measure air temperature in HVAC systems?",
    options: ["Pressure transducer", "Humidity sensor", "Thermistor or RTD", "CO2 sensor"],
    correctAnswer: "Thermistor or RTD",
    explanation: "Air temperature in HVAC systems is typically measured using thermistors or RTDs (Resistance Temperature Detectors). Both devices change their electrical resistance in response to temperature changes. Thermistors (usually NTC - Negative Temperature Coefficient) are more common in commercial systems due to their lower cost and good sensitivity, while RTDs offer better accuracy and stability for more demanding applications."
  },
  {
    id: 'hvac-l2-controls23',
    question: "What is the purpose of an economizer control in an air handling unit?",
    options: ["To reduce fan energy consumption", "To use outdoor air for 'free cooling' when conditions are suitable", "To minimize water consumption", "To reduce heating energy by lowering indoor temperatures"],
    correctAnswer: "To use outdoor air for 'free cooling' when conditions are suitable",
    explanation: "The purpose of an economizer control in an air handling unit is to use outdoor air for 'free cooling' when conditions are suitable. When outdoor air temperature and humidity are favorable (typically cooler than return air), the economizer increases outdoor air intake instead of recirculating and mechanically cooling indoor air, reducing or eliminating compressor energy use while still meeting cooling demands."
  },
  {
    id: 'hvac-l2-controls24',
    question: "What does a manometer measure in HVAC systems?",
    options: ["Temperature", "Humidity", "Pressure", "Airflow velocity"],
    correctAnswer: "Pressure",
    explanation: "A manometer measures pressure in HVAC systems. It can be used to measure the pressure of air in ductwork, the pressure drop across filters or coils, gas pressure in burners, or water pressure in hydronic systems. Manometers can be analog (U-tube or inclined) or digital, and are essential tools for commissioning, balancing, and troubleshooting HVAC systems."
  },
  {
    id: 'hvac-l2-controls25',
    question: "What is 'optimum start control' in a building management system?",
    options: ["A method to optimize energy usage by running equipment at peak efficiency", "A strategy that starts the HVAC system at the earliest possible time", "A control algorithm that delays system startup until the last possible moment", "A control strategy that calculates the latest time to start heating/cooling while still achieving setpoint by occupancy time"],
    correctAnswer: "A control strategy that calculates the latest time to start heating/cooling while still achieving setpoint by occupancy time",
    explanation: "Optimum start control is a strategy that calculates the latest time to start heating/cooling while still achieving the desired temperature by the time the building is occupied. It considers factors like outdoor temperature, building thermal characteristics, and historical performance to determine the startup time, avoiding unnecessary energy use from starting too early while ensuring comfort conditions are met when occupants arrive."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-controls', 'items', q.id), {
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
