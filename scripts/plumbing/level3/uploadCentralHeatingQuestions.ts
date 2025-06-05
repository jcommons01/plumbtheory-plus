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

const centralHeatingQuestions = [
  {
    id: 'centralHeatingQ1',
    topic: 'central-heating',
    question: 'What type of boiler is most suitable for a property with low water pressure and no loft space?',
    options: ['System boiler', 'Open-vented boiler', 'Back boiler', 'Combi boiler'],
    correctAnswer: 'Combi boiler',
    explanation: 'Combi boilers do not require tanks in the loft and are suitable for mains-fed cold water systems.'
  },
  {
    id: 'centralHeatingQ2',
    topic: 'central-heating',
    question: 'Which component is used to automatically release trapped air from a central heating system?',
    options: ['Pressure relief valve', 'Automatic air vent', 'Expansion vessel', 'Diverter valve'],
    correctAnswer: 'Automatic air vent',
    explanation: 'This vent continuously releases air that accumulates in the system to maintain efficiency.'
  },
  {
    id: 'centralHeatingQ3',
    topic: 'central-heating',
    question: 'What is the typical pressure range for a sealed central heating system when cold?',
    options: ['0.2–0.5 bar', '0.5–1.0 bar', '1.0–1.5 bar', '2.5–3.0 bar'],
    correctAnswer: '1.0–1.5 bar',
    explanation: 'Most sealed systems operate between 1.0 and 1.5 bar when cold to allow for expansion.'
  },
  {
    id: 'centralHeatingQ4',
    topic: 'central-heating',
    question: 'In a Y-plan central heating system, what controls the flow of hot water between heating and hot water circuits?',
    options: ['Zone valve', '3-port motorised valve', 'Diverter valve', 'Pump overrun thermostat'],
    correctAnswer: '3-port motorised valve',
    explanation: 'A Y-plan system uses a single 3-port valve to divert flow between circuits.'
  },
  {
    id: 'centralHeatingQ5',
    topic: 'central-heating',
    question: 'Which regulation covers energy efficiency requirements for central heating installations?',
    options: ['Part P', 'Part G', 'Part L', 'Part H'],
    correctAnswer: 'Part L',
    explanation: 'Part L of the Building Regulations covers conservation of fuel and power, including boiler efficiencies.'
  },
  {
    id: 'centralHeatingQ6',
    topic: 'central-heating',
    question: 'What is the function of a bypass valve in a sealed central heating system?',
    options: ['To reduce air locks', 'To increase flow to radiators', 'To maintain flow when all TRVs are closed', 'To balance cold water supply'],
    correctAnswer: 'To maintain flow when all TRVs are closed',
    explanation: 'A bypass prevents pump damage and maintains circulation when radiator valves are shut.'
  },
  {
    id: 'centralHeatingQ7',
    topic: 'central-heating',
    question: 'What is a common cause of gurgling sounds in radiators?',
    options: ['Low pressure', 'Sludge build-up', 'Trapped air', 'Faulty thermostat'],
    correctAnswer: 'Trapped air',
    explanation: 'Air trapped at the top of radiators prevents full water flow and causes gurgling.'
  },
  {
    id: 'centralHeatingQ8',
    topic: 'central-heating',
    question: 'Which component in a sealed system allows for thermal expansion of water?',
    options: ['Header tank', 'Magnetic filter', 'Expansion vessel', 'Auto air vent'],
    correctAnswer: 'Expansion vessel',
    explanation: 'The expansion vessel absorbs excess pressure when water expands during heating.'
  },
  {
    id: 'centralHeatingQ9',
    topic: 'central-heating',
    question: 'What type of valve is fitted to the return pipe of each radiator to control flow and balance the system?',
    options: ['Lockshield valve', 'Zone valve', 'Gate valve', 'Thermostatic valve'],
    correctAnswer: 'Lockshield valve',
    explanation: 'Lockshield valves are used to balance the flow across the heating system for even temperature distribution.'
  },
  {
    id: 'centralHeatingQ10',
    topic: 'central-heating',
    question: 'What is the effect of sludge buildup in a central heating system?',
    options: ['Improves boiler performance', 'Prevents airlocks', 'Reduces efficiency and causes cold spots', 'Raises system pressure'],
    correctAnswer: 'Reduces efficiency and causes cold spots',
    explanation: 'Sludge restricts water flow and heat transfer, leading to cold areas in radiators and reduced efficiency.'
  },
  {
    id: 'centralHeatingQ11',
    topic: 'central-heating',
    question: 'What is the primary role of a magnetic filter in a heating system?',
    options: ['Reduce water hardness', 'Filter out air bubbles', 'Collect metallic debris and sludge', 'Balance water flow'],
    correctAnswer: 'Collect metallic debris and sludge',
    explanation: 'Magnetic filters trap magnetite (sludge), preventing damage to pumps and boilers.'
  },
  {
    id: 'centralHeatingQ12',
    topic: 'central-heating',
    question: 'Which test is carried out before commissioning a central heating system?',
    options: ['Acoustic test', 'Gas tightness test', 'Electrical insulation test', 'Pressure test'],
    correctAnswer: 'Pressure test',
    explanation: 'Pressure testing ensures the system is sealed and leak-free before being filled and operated.'
  },
  {
    id: 'centralHeatingQ13',
    topic: 'central-heating',
    question: 'Which British Standard provides guidance on the design of central heating systems?',
    options: ['BS 5449', 'BS 7671', 'BS EN 806', 'BS 6700'],
    correctAnswer: 'BS 5449',
    explanation: 'BS 5449 details design and installation for low-pressure hot water central heating systems.'
  },
  {
    id: 'centralHeatingQ14',
    topic: 'central-heating',
    question: 'How is a room thermostat correctly positioned for efficiency?',
    options: ['Above a radiator', 'Near a window', 'On an internal wall away from heat sources', 'Inside a cupboard'],
    correctAnswer: 'On an internal wall away from heat sources',
    explanation: 'This ensures accurate readings and prevents false temperature signals from local heat sources.'
  },
  {
    id: 'centralHeatingQ15',
    topic: 'central-heating',
    question: 'What component maintains a constant flow rate in each heating zone?',
    options: ['Check valve', 'Flow restrictor', 'Zone valve', 'Balancing valve'],
    correctAnswer: 'Balancing valve',
    explanation: 'Balancing valves are used to adjust flow so all emitters receive equal heat.'
  },
  {
    id: 'centralHeatingQ16',
    topic: 'central-heating',
    question: 'Which of the following indicates an undersized pump in a heating system?',
    options: ['High pressure', 'Boiler overrun', 'Slow circulation and cold radiators', 'Low energy usage'],
    correctAnswer: 'Slow circulation and cold radiators',
    explanation: 'Undersized pumps can’t maintain proper circulation, resulting in uneven heat distribution.'
  },
  {
    id: 'centralHeatingQ17',
    topic: 'central-heating',
    question: 'What is the purpose of a two-port zone valve in a heating system?',
    options: ['Relieve excess pressure', 'Control water level', 'Isolate heating zones', 'Vent trapped air'],
    correctAnswer: 'Isolate heating zones',
    explanation: 'Two-port valves control individual zones for greater efficiency and zoning.'
  },
  {
    id: 'centralHeatingQ18',
    topic: 'central-heating',
    question: 'What fault may cause kettling noises in a central heating boiler?',
    options: ['Trapped air in pipework', 'Incorrect thermostat setting', 'Limescale on heat exchanger', 'Low fuel pressure'],
    correctAnswer: 'Limescale on heat exchanger',
    explanation: 'Limescale causes hotspots and boiling, leading to loud banging or kettling noises.'
  },
  {
    id: 'centralHeatingQ19',
    topic: 'central-heating',
    question: 'Which component would you adjust to increase system pressure in a sealed system?',
    options: ['Thermostat', 'Auto air vent', 'Filling loop', 'Bypass valve'],
    correctAnswer: 'Filling loop',
    explanation: 'The filling loop is used to top up the pressure in sealed systems via mains water.'
  },
  {
    id: 'centralHeatingQ20',
    topic: 'central-heating',
    question: 'Which component prevents heat being pumped into the cold feed or expansion pipe in an open-vented system?',
    options: ['Gate valve', 'Automatic bypass valve', 'Pump overrun control', 'Gravity check valve'],
    correctAnswer: 'Gravity check valve',
    explanation: 'A gravity or anti-gravity valve prevents reverse flow of hot water into the cold feed in open-vented systems.'
  },
  {
    id: 'centralHeatingQ21',
    topic: 'central-heating',
    question: 'How often should inhibitor levels be checked in a central heating system?',
    options: ['Weekly', 'Monthly', 'Annually', 'Every 5 years'],
    correctAnswer: 'Annually',
    explanation: 'Annual testing ensures corrosion and scale protection is maintained.'
  },
  {
    id: 'centralHeatingQ22',
    topic: 'central-heating',
    question: 'Which heating system type uses both radiators and underfloor heating?',
    options: ['Combination system', 'Zoned system', 'Mixed system', 'Cascaded system'],
    correctAnswer: 'Mixed system',
    explanation: 'A mixed system combines different emitters, often with separate controls and flow temperatures.'
  },
  {
    id: 'centralHeatingQ23',
    topic: 'central-heating',
    question: 'Why is a system flushed before adding inhibitor?',
    options: ['To warm the water', 'To lower pressure', 'To remove contaminants and sludge', 'To lubricate joints'],
    correctAnswer: 'To remove contaminants and sludge',
    explanation: 'Flushing ensures clean system water, preventing future blockages or corrosion.'
  },
  {
    id: 'centralHeatingQ24',
    topic: 'central-heating',
    question: 'What is the key purpose of a low loss header in a large heating installation?',
    options: ['Reduce noise', 'Improve combustion', 'Hydraulic separation', 'Filter sediment'],
    correctAnswer: 'Hydraulic separation',
    explanation: 'It separates the boiler circuit from heating zones to ensure stable flow and pressure.'
  },
  {
    id: 'centralHeatingQ25',
    topic: 'central-heating',
    question: 'Which of the following will result from air trapped in a sealed heating system?',
    options: ['Improved circulation', 'Increased pressure', 'Unstable flow and cold spots', 'Pump overheating'],
    correctAnswer: 'Unstable flow and cold spots',
    explanation: 'Air blocks water flow, leading to poor performance and uneven radiator temperatures.'
  },
  {
    id: 'centralHeatingQ26',
    topic: 'central-heating',
    question: 'Which type of pipework configuration allows every radiator to receive the same temperature water simultaneously?',
    options: ['Two-pipe system', 'One-pipe system', 'Series loop', 'Spur layout'],
    correctAnswer: 'Two-pipe system',
    explanation: 'In a two-pipe system, flow and return are separate, delivering equal temperature water to each radiator.'
  },
  {
    id: 'centralHeatingQ27',
    topic: 'central-heating',
    question: 'What is the minimum required insulation for exposed heating pipework in unheated areas?',
    options: ['9mm', '13mm', '19mm', '25mm'],
    correctAnswer: '25mm',
    explanation: 'Part L recommends at least 25mm insulation to minimise heat loss in unheated spaces.'
  },
  {
    id: 'centralHeatingQ28',
    topic: 'central-heating',
    question: 'Why might a radiator remain cold at the bottom despite a hot top section?',
    options: ['Air lock', 'Faulty TRV', 'Sludge buildup', 'Incorrect pipe size'],
    correctAnswer: 'Sludge buildup',
    explanation: 'Sludge collects at the base of radiators, preventing heat transfer at the bottom.'
  },
  {
    id: 'centralHeatingQ29',
    topic: 'central-heating',
    question: 'What does a room thermostat typically control in a heating system?',
    options: ['Pump speed', 'Zone valve', 'Boiler firing', 'Flow temperature'],
    correctAnswer: 'Boiler firing',
    explanation: 'Room thermostats send signals to the boiler to switch on/off based on room temperature.'
  },
  {
    id: 'centralHeatingQ30',
    topic: 'central-heating',
    question: 'What is the main benefit of weather compensation controls on a modern boiler?',
    options: ['Increased pressure', 'Reduced water usage', 'Improved combustion', 'Better efficiency and comfort'],
    correctAnswer: 'Better efficiency and comfort',
    explanation: 'Weather compensation adjusts boiler output based on external temperature.'
  },
  {
    id: 'centralHeatingQ31',
    topic: 'central-heating',
    question: 'Which valve automatically adjusts to prevent over-pumping in TRV-equipped systems?',
    options: ['Zone valve', 'Pressure reducing valve', 'Automatic bypass valve', 'Lockshield valve'],
    correctAnswer: 'Automatic bypass valve',
    explanation: 'It ensures continued flow if TRVs close, preventing pressure build-up.'
  },
  {
    id: 'centralHeatingQ32',
    topic: 'central-heating',
    question: 'Why is it important to slope heating pipes slightly upwards towards radiators?',
    options: ['To reduce noise', 'To improve flow rate', 'To allow air to escape to vents', 'To assist filling'],
    correctAnswer: 'To allow air to escape to vents',
    explanation: 'Proper slope ensures trapped air naturally flows toward automatic or manual vents.'
  },
  {
    id: 'centralHeatingQ33',
    topic: 'central-heating',
    question: 'Where is the system pressure gauge usually located in a sealed heating system?',
    options: ['Expansion vessel', 'Boiler control panel', 'Filling loop', 'Bypass circuit'],
    correctAnswer: 'Boiler control panel',
    explanation: 'The pressure gauge is commonly found on the boiler panel to monitor system pressure, especially when filling via the loop.'
  },
  {
    id: 'centralHeatingQ34',
    topic: 'central-heating',
    question: 'What happens if the expansion vessel in a sealed system fails?',
    options: ['System loses heat', 'Pressure remains constant', 'Pressure rises rapidly and PRV discharges', 'Pump stops'],
    correctAnswer: 'Pressure rises rapidly and PRV discharges',
    explanation: 'Without expansion capacity, pressure spikes and the safety valve will discharge.'
  },
  {
    id: 'centralHeatingQ35',
    topic: 'central-heating',
    question: 'Which control component allows the boiler to run briefly after the thermostat stops calling for heat?',
    options: ['Timeclock', 'Pump overrun thermostat', 'Lockout relay', 'Room stat'],
    correctAnswer: 'Pump overrun thermostat',
    explanation: 'This prevents overheating by allowing excess heat to dissipate through the circuit.'
  },
  {
    id: 'centralHeatingQ36',
    topic: 'central-heating',
    question: 'Which valve is typically fitted to the flow pipe of a radiator for manual temperature control?',
    options: ['Ball valve', 'Zone valve', 'Thermostatic radiator valve (TRV)', 'Stopcock'],
    correctAnswer: 'Thermostatic radiator valve (TRV)',
    explanation: 'TRVs regulate radiator output based on local room temperature.'
  },
  {
    id: 'centralHeatingQ37',
    topic: 'central-heating',
    question: 'What pressure setting is a typical pressure relief valve (PRV) rated at in domestic sealed systems?',
    options: ['0.5 bar', '1.5 bar', '2.0 bar', '3.0 bar'],
    correctAnswer: '3.0 bar',
    explanation: 'PRVs open at 3.0 bar to protect against overpressure in sealed systems.'
  },
  {
    id: 'centralHeatingQ38',
    topic: 'central-heating',
    question: 'Which regulation requires pipework insulation to reduce carbon emissions?',
    options: ['Part P', 'Part L', 'Part G', 'Part H'],
    correctAnswer: 'Part L',
    explanation: 'Part L focuses on energy conservation and requires insulating heating pipework.'
  },
  {
    id: 'centralHeatingQ39',
    topic: 'central-heating',
    question: 'How can you confirm effective balancing of a radiator circuit?',
    options: ['All radiators are hot at the top only', 'Return pipes are cooler than flow', 'No noise in system', 'Radiators heat evenly and simultaneously'],
    correctAnswer: 'Radiators heat evenly and simultaneously',
    explanation: 'Balanced systems distribute heat equally, making all radiators warm at the same time.'
  },
  {
    id: 'centralHeatingQ40',
    topic: 'central-heating',
    question: 'Which test confirms that the system water quality is within acceptable parameters?',
    options: ['pH and inhibitor test', 'Temperature test', 'Visual flow test', 'Drain pressure test'],
    correctAnswer: 'pH and inhibitor test',
    explanation: 'Testing ensures corrosion protection is sufficient and pH remains neutral.'
  },
  {
    id: 'centralHeatingQ41',
    topic: 'central-heating',
    question: 'What precaution should be taken when using the filling loop on a sealed system?',
    options: ['Leave it open for continuous topping up', 'Ensure the system is cold before opening the loop', 'Connect it to the hot water pipe', 'Bleed all radiators first'],
    correctAnswer: 'Ensure the system is cold before opening the loop',
    explanation: 'Filling a hot system can cause incorrect pressure readings and risks overpressurising due to expansion.'
  },
  {
    id: 'centralHeatingQ42',
    topic: 'central-heating',
    question: 'Which component detects system pressure in a combi boiler?',
    options: ['Pressure sensor', 'Diverter valve', 'Flow switch', 'Thermistor'],
    correctAnswer: 'Pressure sensor',
    explanation: 'The sensor monitors pressure and prevents operation outside safe ranges.'
  },
  {
    id: 'centralHeatingQ43',
    topic: 'central-heating',
    question: 'What is the recommended minimum system design temperature difference (∆T) between flow and return for condensing boilers?',
    options: ['2°C', '5°C', '10°C', '20°C'],
    correctAnswer: '20°C',
    explanation: 'Modern condensing boilers are most efficient when operating with a ∆T of 20°C between flow and return.'
  },
  {
    id: 'centralHeatingQ44',
    topic: 'central-heating',
    question: 'What does a programmer allow the user to control?',
    options: ['Boiler pump speed only', 'Hot water temperature only', 'Time settings for heating and hot water', 'Weather compensation only'],
    correctAnswer: 'Time settings for heating and hot water',
    explanation: 'A programmer sets on/off times for both circuits to improve comfort and reduce costs.'
  },
  {
    id: 'centralHeatingQ45',
    topic: 'central-heating',
    question: 'What may cause radiators to heat upstairs but not downstairs?',
    options: ['Sludge', 'Air lock', 'Unbalanced system or pump issue', 'Faulty boiler stat'],
    correctAnswer: 'Unbalanced system or pump issue',
    explanation: 'Poor circulation or an unbalanced system can result in insufficient flow to lower radiators.'
  },
  {
    id: 'centralHeatingQ46',
    topic: 'central-heating',
    question: 'Which method is used to test for air tightness in a new sealed heating installation?',
    options: ['Smoke test', 'Flue gas analysis', 'Pressure decay test', 'Fan test'],
    correctAnswer: 'Pressure decay test',
    explanation: 'The system is pressurised and monitored for pressure drop indicating leaks.'
  },
  {
    id: 'centralHeatingQ47',
    topic: 'central-heating',
    question: 'How does a condensing boiler recover heat from flue gases?',
    options: ['By increasing flow rate', 'Using a secondary heat exchanger', 'Pre-heating return water', 'Reducing system pressure'],
    correctAnswer: 'Using a secondary heat exchanger',
    explanation: 'Condensing boilers extract latent heat from flue gases to improve efficiency.'
  },
  {
    id: 'centralHeatingQ48',
    topic: 'central-heating',
    question: 'Which component prevents air entry during system depressurisation?',
    options: ['Double check valve', 'Vacuum breaker', 'Air admittance valve', 'Zone valve'],
    correctAnswer: 'Vacuum breaker',
    explanation: 'It prevents back-siphonage and air entry when pressure drops.'
  },
  {
    id: 'centralHeatingQ49',
    topic: 'central-heating',
    question: 'What is the maximum allowable working pressure for most domestic sealed systems?',
    options: ['1 bar', '2 bar', '2.5 bar', '3 bar'],
    correctAnswer: '3 bar',
    explanation: 'Domestic sealed systems should not exceed 3 bar — the typical PRV setting.'
  },
  {
    id: 'centralHeatingQ50',
    topic: 'central-heating',
    question: 'Where should the automatic air vent be installed in a heating system?',
    options: ['Below the pump', 'At the base of the boiler', 'At the highest point of the system', 'On the cold feed'],
    correctAnswer: 'At the highest point of the system',
    explanation: 'Air rises, so the highest point is ideal for effective air removal.'
  },


];

async function upload() {
    for (const question of centralHeatingQuestions) {
      try {
        const ref = doc(db, 'questions', 'central-heating', 'items', question.id);
        await setDoc(ref, question);
        console.log(`✅ Uploaded: ${question.id}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${question.id}:`, err);
      }
    }
  }
  
  upload();
