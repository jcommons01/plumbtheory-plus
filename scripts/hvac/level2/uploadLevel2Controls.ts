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

const questions = [
  {
    id: 'hvac-l2-controls-q1',
    question: 'What does a thermostat do in a heating system?',
    options: ['Controls water flow', 'Adjusts fan speed', 'Switches heating on or off', 'Regulates pressure'],
    correctAnswer: 'Switches heating on or off',
    explanation: 'A thermostat switches heating on or off based on the room temperature compared to the desired setpoint.'
  },
  {
    id: 'hvac-l2-controls-q2',
    question: 'Which control adjusts motor speed to match system demand?',
    options: ['Relay', 'Timer', 'VSD', 'Fuse'],
    correctAnswer: 'VSD',
    explanation: 'A Variable Speed Drive (VSD) adjusts motor speed to reduce energy use and match actual demand.'
  },
  {
    id: 'hvac-l2-controls-q3',
    question: 'What is the role of a frost stat in an air handling unit?',
    options: ['Reduce humidity', 'Trigger heating to prevent freezing', 'Increase air speed', 'Open dampers'],
    correctAnswer: 'Trigger heating to prevent freezing',
    explanation: 'A frost stat protects coils by activating heating when temperatures fall near freezing.'
  },
  {
    id: 'hvac-l2-controls-q4',
    question: 'What does a TRV control?',
    options: ['Flow to radiators', 'Boiler operation', 'Fan speed', 'System pressure'],
    correctAnswer: 'Flow to radiators',
    explanation: 'A Thermostatic Radiator Valve (TRV) regulates hot water flow into a radiator to maintain room temperature.'
  },
  {
    id: 'hvac-l2-controls-q5',
    question: 'What is the main benefit of a BMS?',
    options: ['Lower maintenance', 'Cheaper installation', 'Centralised control', 'Larger equipment'],
    correctAnswer: 'Centralised control',
    explanation: 'A Building Management System allows central monitoring and control of HVAC and other services.'
  },
  {
    id: 'hvac-l2-controls-q6',
    question: 'What type of sensor measures air temperature?',
    options: ['Thermistor', 'Manometer', 'Anemometer', 'Smoke detector'],
    correctAnswer: 'Thermistor',
    explanation: 'Thermistors are widely used to measure temperature in HVAC systems due to their sensitivity.'
  },
  {
    id: 'hvac-l2-controls-q7',
    question: 'Which controller is most suited to a hot water cylinder?',
    options: ['PID controller', 'BMS controller', 'On/off thermostat', 'Speed controller'],
    correctAnswer: 'On/off thermostat',
    explanation: 'A basic on/off thermostat is sufficient to control the temperature in a domestic hot water cylinder.'
  },
  {
    id: 'hvac-l2-controls-q8',
    question: 'What does a differential pressure switch detect?',
    options: ['Water leaks', 'Blocked filters', 'High voltage', 'Low humidity'],
    correctAnswer: 'Blocked filters',
    explanation: 'It detects a rise in pressure across filters, indicating blockage or reduced airflow.'
  },
  {
    id: 'hvac-l2-controls-q9',
    question: 'Which device opens or closes to regulate air flow?',
    options: ['Damper', 'Fuse', 'Valve', 'Thermostat'],
    correctAnswer: 'Damper',
    explanation: 'Motorised dampers regulate air flow in ducts and are used for zoning or balancing.'
  },
  {
    id: 'hvac-l2-controls-q10',
    question: 'What does a CO₂ sensor control in modern HVAC systems?',
    options: ['Fire alarms', 'Heating rate', 'Ventilation level', 'Lighting'],
    correctAnswer: 'Ventilation level',
    explanation: 'CO₂ sensors help adjust ventilation rates based on occupancy to maintain air quality.'
  },
  {
    id: 'hvac-l2-controls-q11',
    question: 'What is a common use of a solenoid valve?',
    options: ['Regulate power', 'Control refrigerant flow', 'Boost air speed', 'Measure temperature'],
    correctAnswer: 'Control refrigerant flow',
    explanation: 'Solenoid valves open or close to control refrigerant flow in cooling systems.'
  },
  {
    id: 'hvac-l2-controls-q12',
    question: 'What does a humidistat measure?',
    options: ['Noise', 'Dust', 'Humidity', 'Air pressure'],
    correctAnswer: 'Humidity',
    explanation: 'A humidistat monitors humidity and controls humidifiers or dehumidifiers accordingly.'
  },
  {
    id: 'hvac-l2-controls-q13',
    question: 'What is the purpose of a time clock?',
    options: ['Speed control', 'Automatic start/stop', 'Overheat protection', 'Cooling mode'],
    correctAnswer: 'Automatic start/stop',
    explanation: 'Time clocks automate system operation based on a scheduled programme.'
  },
  {
    id: 'hvac-l2-controls-q14',
    question: 'What does PID stand for in HVAC controls?',
    options: ['Pump Isolation Device', 'Power Input Drive', 'Proportional Integral Derivative', 'Pressure Indicator Device'],
    correctAnswer: 'Proportional Integral Derivative',
    explanation: 'PID controllers fine-tune output by responding to present, past, and future error values.'
  },
  {
    id: 'hvac-l2-controls-q15',
    question: 'What function does a pressure switch perform?',
    options: ['Prevents water hammer', 'Stops fan noise', 'Protects against pressure faults', 'Increases pump flow'],
    correctAnswer: 'Protects against pressure faults',
    explanation: 'Pressure switches shut down equipment if pressure goes outside safe limits.'
  },
  {
    id: 'hvac-l2-controls-q16',
    question: 'What does BACnet enable in a building?',
    options: ['Wireless power', 'Standardised communication', 'Extra lighting', 'Water metering'],
    correctAnswer: 'Standardised communication',
    explanation: 'BACnet allows different control systems to communicate using the same protocol.'
  },
  {
    id: 'hvac-l2-controls-q17',
    question: 'What is the role of an air proving switch?',
    options: ['Measure humidity', 'Check air movement', 'Set heating mode', 'Lock doors'],
    correctAnswer: 'Check air movement',
    explanation: 'Air proving switches confirm that airflow is present before allowing heating to start.'
  },
  {
    id: 'hvac-l2-controls-q18',
    question: 'What is “hunting” in a control system?',
    options: ['Data logging', 'Overshooting repeatedly', 'Air leak testing', 'Sensor testing'],
    correctAnswer: 'Overshooting repeatedly',
    explanation: 'Hunting is repeated overshooting and undershooting of a setpoint due to aggressive control.'
  },
  {
    id: 'hvac-l2-controls-q19',
    question: 'What is an economiser used for?',
    options: ['Waste heat removal', 'Free cooling', 'Heating the return air', 'Boosting fan speed'],
    correctAnswer: 'Free cooling',
    explanation: 'Economisers use cool outdoor air to reduce the need for mechanical cooling.'
  },
  {
    id: 'hvac-l2-controls-q20',
    question: 'Which unit measures pressure in HVAC systems?',
    options: ['Voltmeter', 'Hygrometer', 'Manometer', 'Amp meter'],
    correctAnswer: 'Manometer',
    explanation: 'A manometer is used to measure pressure differences in air or fluid systems.'
  },
  {
    id: 'hvac-l2-controls-q21',
    question: 'What does DDC stand for?',
    options: ['Data Display Control', 'Direct Digital Control', 'Demand Driven Cycle', 'Duct Delivery Control'],
    correctAnswer: 'Direct Digital Control',
    explanation: 'DDC refers to control systems using digital processors for precise HVAC management.'
  },
  {
    id: 'hvac-l2-controls-q22',
    question: 'What is an anti-cycling control used for?',
    options: ['Increase power', 'Prevent short cycling', 'Boost heating', 'Reduce airflow'],
    correctAnswer: 'Prevent short cycling',
    explanation: 'Anti-cycling prevents frequent on/off switching, protecting the compressor from damage.'
  },
  {
    id: 'hvac-l2-controls-q23',
    question: 'What is a compensated control strategy?',
    options: ['Adapts to humidity', 'Adjusts heat based on outside temperature', 'Stops power loss', 'Improves airflow'],
    correctAnswer: 'Adjusts heat based on outside temperature',
    explanation: 'Compensated control reduces or increases heat output in response to external temperatures.'
  },
  {
    id: 'hvac-l2-controls-q24',
    question: 'What does an air damper modulate?',
    options: ['Lighting level', 'Airflow rate', 'System voltage', 'Fan noise'],
    correctAnswer: 'Airflow rate',
    explanation: 'Dampers regulate airflow in duct systems and help balance air delivery to different zones.'
  },
  {
    id: 'hvac-l2-controls-q25',
    question: 'What is the function of optimum start?',
    options: ['Maximise cooling output', 'Begin heating just in time', 'Switch to backup systems', 'Track room usage'],
    correctAnswer: 'Begin heating just in time',
    explanation: 'Optimum start delays system startup until the latest possible time to achieve comfort by occupancy.'
  }
];

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

uploadQuestions();
