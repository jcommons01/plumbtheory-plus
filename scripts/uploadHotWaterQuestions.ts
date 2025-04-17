import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

const hotWaterQuestions = [
    {
        id: 'hotWaterQ1',
        topic: 'hot-water',
        question: 'What is the recommended storage temperature for hot water to prevent Legionella?',
        options: ['40°C', '50°C', '60°C', '70°C'],
        correctAnswer: '60°C',
        explanation: 'Hot water should be stored at a minimum of 60°C to inhibit Legionella growth.'
      },
      {
        id: 'hotWaterQ2',
        topic: 'hot-water',
        question: 'What is the minimum temperature that hot water should be distributed at to all outlets?',
        options: ['40°C', '50°C', '55°C', '65°C'],
        correctAnswer: '55°C',
        explanation: 'Distribution temperature must not fall below 55°C to maintain safety and hygiene.'
      },
      {
        id: 'hotWaterQ3',
        topic: 'hot-water',
        question: 'Which UK Building Regulation covers hot water safety and hygiene?',
        options: ['Part F', 'Part L', 'Part G', 'Part H'],
        correctAnswer: 'Part G',
        explanation: 'Part G of the Building Regulations governs sanitation, hot water, and water efficiency.'
      },
      {
        id: 'hotWaterQ4',
        topic: 'hot-water',
        question: 'What safety device is used on unvented cylinders to prevent pressure build-up?',
        options: ['Ball valve', 'Expansion vessel', 'Tundish', 'Temperature and pressure relief valve'],
        correctAnswer: 'Temperature and pressure relief valve',
        explanation: 'The TPR valve opens if pressure or temperature exceed safe limits.'
      },
      {
        id: 'hotWaterQ5',
        topic: 'hot-water',
        question: 'In an open vented hot water system, what component maintains system pressure?',
        options: ['Feed and expansion tank', 'Tundish', 'Zone valve', 'Pressure-reducing valve'],
        correctAnswer: 'Feed and expansion tank',
        explanation: 'This tank in the loft maintains head pressure and allows expansion.'
      },
      {
        id: 'hotWaterQ6',
        topic: 'hot-water',
        question: 'What is the purpose of a tundish in a hot water installation?',
        options: ['Pressure balancing', 'Air separator', 'Visual discharge point', 'Drain-off'],
        correctAnswer: 'Visual discharge point',
        explanation: 'A tundish allows visible indication if the TPR valve activates.'
      },
      {
        id: 'hotWaterQ7',
        topic: 'hot-water',
        question: 'What is a key benefit of a combi boiler over a traditional hot water cylinder?',
        options: ['Higher flow rate', 'Lower cost to install', 'Stored hot water', 'Heats water more efficiently'],
        correctAnswer: 'Lower cost to install',
        explanation: 'Combi boilers don’t need cylinders or tanks, reducing installation costs.'
      },
      {
        id: 'hotWaterQ8',
        topic: 'hot-water',
        question: 'What should the pressure relief valve on an unvented system be rated at?',
        options: ['1.5 bar', '3 bar', '6 bar', '10 bar'],
        correctAnswer: '6 bar',
        explanation: 'Typical unvented systems have PRVs rated around 6 bar for safety.'
      },
      {
        id: 'hotWaterQ9',
        topic: 'hot-water',
        question: 'How often should unvented hot water cylinders be serviced?',
        options: ['Every 6 months', 'Annually', 'Every 2 years', 'Every 5 years'],
        correctAnswer: 'Annually',
        explanation: 'Annual servicing ensures safety devices and expansion vessels operate correctly.'
      },
      {
        id: 'hotWaterQ10',
        topic: 'hot-water',
        question: 'What is the function of a thermostatic mixing valve (TMV) in a hot water system?',
        options: ['Regulate pressure', 'Control flow rate', 'Prevent scalding', 'Increase temperature'],
        correctAnswer: 'Prevent scalding',
        explanation: 'TMVs blend hot and cold water to a safe temperature at outlets.'
      },
      {
        id: 'hotWaterQ11',
        topic: 'hot-water',
        question: 'What is the minimum storage capacity of a hot water cylinder for a 3-bedroom house with one bathroom?',
        options: ['75 litres', '100 litres', '150 litres', '200 litres'],
        correctAnswer: '150 litres',
        explanation: 'A standard 3-bedroom home typically requires 150 litres for adequate hot water supply.'
      },
      {
        id: 'hotWaterQ12',
        topic: 'hot-water',
        question: 'What safety regulation must be followed when installing an unvented cylinder?',
        options: ['Gas Safety Regulations 1998', 'Building Regulations Part P', 'G3 Building Regulations', 'WRAS Regulations'],
        correctAnswer: 'G3 Building Regulations',
        explanation: 'G3 governs installation and safety of unvented hot water systems in the UK.'
      },
      {
        id: 'hotWaterQ13',
        topic: 'hot-water',
        question: 'Where should the expansion vessel be located in an unvented system?',
        options: ['Next to the tundish', 'Downstream of the pressure-reducing valve', 'Before the cold inlet', 'Directly above the cylinder'],
        correctAnswer: 'Downstream of the pressure-reducing valve',
        explanation: 'This ensures pressure is regulated before it reaches the expansion vessel.'
      },
      {
        id: 'hotWaterQ14',
        topic: 'hot-water',
        question: 'What is the purpose of a secondary return loop in a hot water system?',
        options: ['Boost cold water flow', 'Prevent stagnation', 'Provide instant hot water at outlets', 'Equalize pressure across the system'],
        correctAnswer: 'Provide instant hot water at outlets',
        explanation: 'A secondary return loop circulates hot water to reduce wait times at distant outlets.'
      },
      {
        id: 'hotWaterQ15',
        topic: 'hot-water',
        question: 'In a solar thermal system with a twin coil cylinder, what is the lower coil typically connected to?',
        options: ['Auxiliary boiler', 'Immersion heater', 'Solar panel circuit', 'Hot water tap'],
        correctAnswer: 'Solar panel circuit',
        explanation: 'The lower coil receives heat from solar panels; the upper coil is used for backup heat.'
      },
      {
        id: 'hotWaterQ16',
        topic: 'hot-water',
        question: 'What is a key symptom of a failed pressure-reducing valve on an unvented cylinder?',
        options: ['Slow hot water flow', 'Cold water in hot taps', 'Water hammer noise', 'Discharge from tundish under normal use'],
        correctAnswer: 'Discharge from tundish under normal use',
        explanation: 'A faulty pressure-reducing valve can cause overpressure and activate the TPR valve.'
      },
      {
        id: 'hotWaterQ17',
        topic: 'hot-water',
        question: 'Which test is performed during commissioning to verify thermostat cut-out on an unvented system?',
        options: ['Immersion continuity test', 'High limit thermostat trip test', 'Tundish flow test', 'PRV opening pressure test'],
        correctAnswer: 'High limit thermostat trip test',
        explanation: 'This test ensures the safety cut-out engages if the thermostat fails.'
      },
      {
        id: 'hotWaterQ18',
        topic: 'hot-water',
        question: 'What material is most commonly used for hot water distribution pipework in domestic properties?',
        options: ['Lead', 'MDPE', 'Copper', 'ABS'],
        correctAnswer: 'Copper',
        explanation: 'Copper is durable, heat-resistant, and commonly used for domestic hot water supply.'
      },
      {
        id: 'hotWaterQ19',
        topic: 'hot-water',
        question: 'Why must a hot water cylinder be lagged in an airing cupboard?',
        options: ['Prevent cold spots', 'Increase flow rate', 'Retain heat and improve efficiency', 'Protect from condensation'],
        correctAnswer: 'Retain heat and improve efficiency',
        explanation: 'Insulation reduces heat loss and improves energy efficiency.'
      },
      {
        id: 'hotWaterQ20',
        topic: 'hot-water',
        question: 'What type of hot water system stores water at mains pressure?',
        options: ['Vented cylinder', 'Gravity-fed', 'Unvented cylinder', 'Thermal store'],
        correctAnswer: 'Unvented cylinder',
        explanation: 'Unvented systems are directly fed by the mains and provide high-pressure hot water.'
      },
      {
        id: 'hotWaterQ21',
        topic: 'hot-water',
        question: 'Which component ensures the hot water system does not backfeed into the cold water main?',
        options: ['Check valve', 'Zone valve', 'Mixing valve', 'Balancing valve'],
        correctAnswer: 'Check valve',
        explanation: 'A check valve prevents reverse flow from hot to cold supply.'
      },
      {
        id: 'hotWaterQ22',
        topic: 'hot-water',
        question: 'What is the purpose of a blending valve in a communal hot water system?',
        options: ['Improve flow rate', 'Control noise levels', 'Prevent scalding at outlets', 'Increase cylinder capacity'],
        correctAnswer: 'Prevent scalding at outlets',
        explanation: 'Blending valves mix hot and cold to deliver safe water temperatures at outlets.'
      },
      {
        id: 'hotWaterQ23',
        topic: 'hot-water',
        question: 'Which regulation governs the scald risk reduction in domestic hot water systems?',
        options: ['Part H', 'Part L', 'WRAS', 'Approved Document G'],
        correctAnswer: 'Approved Document G',
        explanation: 'Part G (Hygiene) includes measures to prevent scalding from hot water systems.'
      },
      {
        id: 'hotWaterQ24',
        topic: 'hot-water',
        question: 'In an unvented system, what does a “balanced cold” refer to?',
        options: ['Cold supply bypassing the cylinder', 'Cold water regulated to same pressure as hot', 'Cold feed to heating coil', 'Overflow control device'],
        correctAnswer: 'Cold water regulated to same pressure as hot',
        explanation: 'Balancing cold ensures equal pressure at mixers and outlets.'
      },
      {
        id: 'hotWaterQ25',
        topic: 'hot-water',
        question: 'Which safety device prevents the hot water cylinder from over-pressurising during heating?',
        options: ['Check valve', 'Zone valve', 'Expansion vessel', 'Strainer'],
        correctAnswer: 'Expansion vessel',
        explanation: 'Expansion vessels absorb excess pressure as water expands during heating.'
      },
      {
        id: 'hotWaterQ26',
        topic: 'hot-water',
        question: 'What is the main reason for fitting a service valve on the cold water inlet to a hot water cylinder?',
        options: ['To drain the hot water system', 'To balance the pressure', 'To isolate supply during maintenance', 'To improve flow rate'],
        correctAnswer: 'To isolate supply during maintenance',
        explanation: 'Service valves allow safe maintenance without shutting off the entire cold supply.'
      },
      {
        id: 'hotWaterQ27',
        topic: 'hot-water',
        question: 'In what situation would a hot water cylinder thermostat be considered faulty?',
        options: ['It heats above 60°C', 'It fails to shut off at set temperature', 'It cycles too often', 'It causes loud noises'],
        correctAnswer: 'It fails to shut off at set temperature',
        explanation: 'A thermostat that fails to shut off may cause overheating and safety risks.'
      },
      {
        id: 'hotWaterQ28',
        topic: 'hot-water',
        question: 'Why is a hot water system lagged with insulation along pipework?',
        options: ['To reduce noise', 'To increase pressure', 'To prevent heat loss and freezing', 'To avoid condensation'],
        correctAnswer: 'To prevent heat loss and freezing',
        explanation: 'Insulated pipes reduce energy loss and protect against frost in cold areas.'
      },
      {
        id: 'hotWaterQ29',
        topic: 'hot-water',
        question: 'Which component helps manage hot water delivery time in large pipe layouts?',
        options: ['Time clock', 'Secondary circulation pump', 'Zone valve', 'Thermal fuse'],
        correctAnswer: 'Secondary circulation pump',
        explanation: 'These pumps maintain hot water flow in large systems for instant delivery.'
      },
      {
        id: 'hotWaterQ30',
        topic: 'hot-water',
        question: 'What is the purpose of an immersion heater’s thermal cut-out?',
        options: ['To speed up heating', 'To prevent thermostat failure', 'To detect water levels', 'To act as a backup thermostat'],
        correctAnswer: 'To act as a backup thermostat',
        explanation: 'It shuts off the heater if the primary thermostat fails, avoiding overheating.'
      },
      {
        id: 'hotWaterQ31',
        topic: 'hot-water',
        question: 'Which standard covers installation of unvented hot water storage systems in the UK?',
        options: ['WRAS 2021', 'BS EN 806', 'BS 8558', 'G3 of Building Regulations'],
        correctAnswer: 'G3 of Building Regulations',
        explanation: 'All unvented hot water systems must comply with G3 for safety and performance.'
      },
      {
        id: 'hotWaterQ32',
        topic: 'hot-water',
        question: 'What is the typical expansion ratio of water between 10°C and 65°C?',
        options: ['2%', '4%', '7%', '10%'],
        correctAnswer: '4%',
        explanation: 'Water expands approximately 4% over that temperature range, requiring expansion control.'
      },
      {
        id: 'hotWaterQ33',
        topic: 'hot-water',
        question: 'Which test ensures a blending valve is functioning correctly during commissioning?',
        options: ['Pressure drop test', 'Temperature delivery test', 'Isolation test', 'Visual inspection'],
        correctAnswer: 'Temperature delivery test',
        explanation: 'A TMV should deliver water at a safe temperature (e.g., ≤48°C for baths).'
      },
      {
        id: 'hotWaterQ34',
        topic: 'hot-water',
        question: 'Which control would be most useful in reducing energy use in a hot water system?',
        options: ['Time clock', 'Tundish', 'Drain cock', 'Flow restrictor'],
        correctAnswer: 'Time clock',
        explanation: 'Time controls limit when water is heated, improving energy efficiency.'
      },
      {
        id: 'hotWaterQ35',
        topic: 'hot-water',
        question: 'Where should a tundish be installed in relation to the pressure relief discharge pipe?',
        options: ['After the PRV, vertically and visible', 'At the bottom of the cylinder', 'Inside the loft', 'Below the thermostat'],
        correctAnswer: 'After the PRV, vertically and visible',
        explanation: 'It must be visible and positioned vertically to detect PRV discharge.'
      },
      {
        id: 'hotWaterQ36',
        topic: 'hot-water',
        question: 'What device might be used to control temperature at individual hot water outlets in a care home?',
        options: ['Ball valve', 'Zone valve', 'TMV3 thermostatic mixing valve', 'Cold feed limiter'],
        correctAnswer: 'TMV3 thermostatic mixing valve',
        explanation: 'TMV3 valves are used in healthcare settings to meet stricter scald-prevention standards.'
      },
      {
        id: 'hotWaterQ37',
        topic: 'hot-water',
        question: 'What is a sign that air is trapped in the upper part of a vented hot water cylinder?',
        options: ['No cold water', 'Water hammer', 'Lack of flow at outlets', 'Constant discharge from tundish'],
        correctAnswer: 'Lack of flow at outlets',
        explanation: 'Airlocks prevent flow of water and must be manually vented.'
      },
      {
        id: 'hotWaterQ38',
        topic: 'hot-water',
        question: 'When sizing a hot water cylinder, which of the following is most critical?',
        options: ['Height of the cylinder', 'Thermostat range', 'Daily peak usage', 'PRV pressure rating'],
        correctAnswer: 'Daily peak usage',
        explanation: 'Cylinder size must meet the home’s hot water demand during peak periods.'
      },
      {
        id: 'hotWaterQ39',
        topic: 'hot-water',
        question: 'Which of the following cylinders allows stored hot water to mix with cold inside the same tank?',
        options: ['Thermal store', 'Unvented', 'Combi', 'Standard copper vented'],
        correctAnswer: 'Thermal store',
        explanation: 'In thermal stores, hot and cold mix inside a single volume and are drawn through a coil.'
      },
      {
        id: 'hotWaterQ40',
        topic: 'hot-water',
        question: 'What is the function of the vent pipe in a vented hot water system?',
        options: ['Discharge excess pressure', 'Introduce oxygen', 'Balance air pressure', 'Prevent airlocks'],
        correctAnswer: 'Discharge excess pressure',
        explanation: 'The vent pipe provides a safe escape route for steam or excess pressure.'
      },
      {
        id: 'hotWaterQ41',
        topic: 'hot-water',
        question: 'According to G3 regulations, what is the minimum size of the discharge pipe (D2) from a tundish?',
        options: ['15mm', '22mm', '28mm', '32mm'],
        correctAnswer: '22mm',
        explanation: 'The D2 pipe must be a minimum of 22mm and never smaller than the tundish outlet.'
      },
      {
        id: 'hotWaterQ42',
        topic: 'hot-water',
        question: 'What is the required minimum vertical pipe length below the tundish before a bend or elbow?',
        options: ['150mm', '200mm', '250mm', '300mm'],
        correctAnswer: '300mm',
        explanation: 'A vertical drop of at least 300mm below the tundish allows visual discharge and reduces backpressure.'
      },
      {
        id: 'hotWaterQ43',
        topic: 'hot-water',
        question: 'What is the minimum fall required on a discharge pipe (D2) from an unvented cylinder?',
        options: ['1 in 80', '1 in 150', '1 in 200', '1 in 300'],
        correctAnswer: '1 in 200',
        explanation: 'This fall ensures gravity drainage and prevents water from stagnating in the discharge pipe.'
      },
      {
        id: 'hotWaterQ44',
        topic: 'hot-water',
        question: 'For discharge pipes over 9m in equivalent length, what must be done?',
        options: ['Add a tundish every 3 metres', 'Increase the pipe size by two sizes', 'Add an air admittance valve', 'Use plastic pipework'],
        correctAnswer: 'Increase the pipe size by two sizes',
        explanation: 'G3 states that for longer discharge pipes, resistance must be reduced by increasing pipe size.'
      },
      {
        id: 'hotWaterQ45',
        topic: 'hot-water',
        question: 'What material is permitted for D2 discharge pipes from unvented systems?',
        options: ['Plastic only', 'Copper or steel', 'Flexible hose', 'ABS plastic'],
        correctAnswer: 'Copper or steel',
        explanation: 'Discharge pipes must be metal or suitable for high temperatures in case of fault discharge.'
      },
      {
        id: 'hotWaterQ46',
        topic: 'hot-water',
        question: 'Which valve is essential on the hot water outlet to prevent backflow into the cold supply?',
        options: ['Gate valve', 'Non-return valve', 'Zone valve', 'Ball valve'],
        correctAnswer: 'Non-return valve',
        explanation: 'Non-return valves ensure one-way flow, preventing cross-contamination or backflow.'
      },
      {
        id: 'hotWaterQ47',
        topic: 'hot-water',
        question: 'What is the correct response if water is continuously dripping from the tundish of an unvented system?',
        options: ['Ignore it unless flow increases', 'Check pressure and temperature in the system', 'Close the PRV manually', 'Flush the cylinder'],
        correctAnswer: 'Check pressure and temperature in the system',
        explanation: 'Constant discharge indicates a pressure or temperature fault — typically a faulty PRV or thermostat.'
      },
      {
        id: 'hotWaterQ48',
        topic: 'hot-water',
        question: 'Which fault is most likely if no hot water is flowing from taps in an open vented system?',
        options: ['Immersion failure', 'Thermostat wiring fault', 'Airlock in pipework', 'Incorrect boiler pressure'],
        correctAnswer: 'Airlock in pipework',
        explanation: 'Air trapped in pipework can prevent gravity-fed systems from flowing properly.'
      },
      {
        id: 'hotWaterQ49',
        topic: 'hot-water',
        question: 'Which instrument is used to verify safe hot water delivery temperatures at outlets?',
        options: ['Pressure gauge', 'Infrared thermometer', 'Spirit level', 'Multimeter'],
        correctAnswer: 'Infrared thermometer',
        explanation: 'Digital or infrared thermometers ensure hot water is delivered at safe, non-scalding temperatures.'
      },
      {
        id: 'hotWaterQ50',
        topic: 'hot-water',
        question: 'A customer reports scalding at taps despite the cylinder being correctly set. What is likely missing?',
        options: ['Zone valve', 'Tundish', 'Thermostatic mixing valve', 'Expansion vessel'],
        correctAnswer: 'Thermostatic mixing valve',
        explanation: 'A TMV blends hot and cold water at outlets to prevent scalding, especially in bathrooms.'
      },
    
    
];

async function upload() {
    for (const [i, question] of hotWaterQuestions.entries()) {
      const id = `hotWaterQ${i + 1}`;
      const updatedQuestion = { ...question, id }; // Ensure each question gets the correct ID
  
      try {
        await setDoc(doc(db, 'questions', id), updatedQuestion);
        console.log(`✅ Uploaded question: ${id}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${id}:`, err);
      }
    }
  }
  

upload();
