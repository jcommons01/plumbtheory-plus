// scripts/uploadCalculationQuestions.ts
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

const calculationQuestions = [
  {
    id: 'calculationQ1',
    topic: 'calculation-questions',
    question: 'A radiator contains 15 litres of water. If the specific heat capacity (SHC) of water is 4.18 kJ/kg°C and the temperature needs to be raised by 35°C, how much energy is required?',
    options: ['2,197 kJ', '1,753 kJ', '3,298 kJ', '4,508 kJ'],
    correctAnswer: '2,194 kJ',
    explanation: 'Q = mcΔT → 15kg × 4.18 × 35 = 2,194.5 kJ (rounded).'
  },
  {
    id: 'calculationQ2',
    topic: 'calculation-questions',
    question: 'A pipe is 25mm in diameter and 12m long. What is the internal volume in litres?',
    options: ['5.89 L', '4.71 L', '6.28 L', '3.92 L'],
    correctAnswer: '5.89 L',
    explanation: 'Volume = πr²h = 3.14 × (0.0125)² × 12 = 0.00589 m³ = 5.89 L.'
  },
  {
    id: 'calculationQ3',
    topic: 'calculation-questions',
    question: 'A tank is 1.2m long, 0.8m wide and 1.5m deep. What is its capacity in litres?',
    options: ['1,400 L', '1,440 L', '1,500 L', '1,280 L'],
    correctAnswer: '1,440 L',
    explanation: 'Volume = l×w×h = 1.2×0.8×1.5 = 1.44 m³ = 1,440 L.'
  },
  {
    id: 'calculationQ4',
    topic: 'calculation-questions',
    question: 'A 9kW electric boiler operates for 3 hours. How much energy does it consume in kWh?',
    options: ['27 kWh', '21 kWh', '18 kWh', '9 kWh'],
    correctAnswer: '27 kWh',
    explanation: 'Energy = Power × Time → 9kW × 3h = 27 kWh.'
  },
  {
    id: 'calculationQ5',
    topic: 'calculation-questions',
    question: 'What is the flow rate in litres per second if a tap fills a 10-litre bucket in 25 seconds?',
    options: ['0.25 L/s', '0.4 L/s', '0.5 L/s', '0.6 L/s'],
    correctAnswer: '0.4 L/s',
    explanation: 'Flow rate = volume / time = 10 / 25 = 0.4 L/s.'
  },
  {
    id: 'calculationQ6',
    topic: 'calculation-questions',
    question: 'A radiator system requires 30,000 kJ to heat up. If heated over 45 minutes, what is the average power in kW?',
    options: ['11.1 kW', '10.0 kW', '9.5 kW', '12.4 kW'],
    correctAnswer: '11.1 kW',
    explanation: 'Power = energy / time → 30,000 / (45×60) = 11.1 kW.'
  },
  {
    id: 'calculationQ7',
    topic: 'calculation-questions',
    question: 'How much heat is lost per hour through a wall of area 12m² with U-value of 0.3 and temperature difference of 18°C?',
    options: ['64.8 W', '45.2 W', '90.1 W', '110.2 W'],
    correctAnswer: '64.8 W',
    explanation: 'Q = U × A × ΔT = 0.3 × 12 × 18 = 64.8 W.'
  },
  {
    id: 'calculationQ8',
    topic: 'calculation-questions',
    question: 'A boiler with 92% efficiency consumes 50 kWh. How much useful heat energy is delivered?',
    options: ['44 kWh', '46 kWh', '48 kWh', '50 kWh'],
    correctAnswer: '46 kWh',
    explanation: 'Useful energy = 50 × 0.92 = 46 kWh.'
  },
  {
    id: 'calculationQ9',
    topic: 'calculation-questions',
    question: 'Water flows through a 22mm pipe at 0.6 L/s. What is the velocity of the water in m/s?',
    options: ['1.58 m/s', '1.26 m/s', '1.83 m/s', '2.00 m/s'],
    correctAnswer: '1.58 m/s',
    explanation: 'v = Q / A → A = π×(0.011)² = 0.00038 → 0.6/0.00038 ≈ 1.58 m/s.'
  },
  {
    id: 'calculationQ10',
    topic: 'calculation-questions',
    question: 'A 50-litre cylinder is heated from 15°C to 60°C. How much energy is required in kJ?',
    options: ['9,450 kJ', '8,980 kJ', '10,300 kJ', '12,400 kJ'],
    correctAnswer: '9,405 kJ',
    explanation: 'Q = mcΔT → 50 × 4.18 × 45 = 9,405 kJ.'
  },
  {
    id: 'calculationQ11',
    topic: 'calculation-questions',
    question: 'A pump lifts water 5m vertically. What pressure is required in kPa?',
    options: ['49.1 kPa', '58.2 kPa', '64.3 kPa', '51.5 kPa'],
    correctAnswer: '49.1 kPa',
    explanation: 'P = ρgh = 1000×9.81×5 = 49,050 Pa = 49.1 kPa.'
  },
  {
    id: 'calculationQ12',
    topic: 'calculation-questions',
    question: 'What is the daily water usage in litres for a household with 3 people using 150 litres each?',
    options: ['450 L', '400 L', '500 L', '350 L'],
    correctAnswer: '450 L',
    explanation: 'Daily use = 3 × 150 = 450 litres.'
  },
  {
    id: 'calculationQ13',
    topic: 'calculation-questions',
    question: 'A cold water tank holds 250 litres and fills in 20 minutes. What is the average inflow rate?',
    options: ['12.5 L/min', '10.0 L/min', '15.0 L/min', '8.0 L/min'],
    correctAnswer: '12.5 L/min',
    explanation: 'Flow rate = 250 / 20 = 12.5 L/min.'
  },
  {
    id: 'calculationQ14',
    topic: 'calculation-questions',
    question: 'How long will it take to fill a 140-litre bath at a rate of 0.7 L/s?',
    options: ['3 mins 20 sec', '4 mins', '3 mins 10 sec', '4 mins 30 sec'],
    correctAnswer: '3 mins 20 sec',
    explanation: 'Time = 140 / 0.7 = 200s = 3m 20s.'
  },
  {
    id: 'calculationQ15',
    topic: 'calculation-questions',
    question: 'A heating system loses 9,000 kJ per hour. If it runs for 8 hours daily, what’s the total daily heat loss?',
    options: ['72,000 kJ', '68,000 kJ', '74,000 kJ', '70,000 kJ'],
    correctAnswer: '72,000 kJ',
    explanation: 'Daily loss = 9,000 × 8 = 72,000 kJ.'
  },
  {
    id: 'calculationQ16',
    topic: 'calculation-questions',
    question: 'What is the pressure in bar at the base of a column of water 10 meters high?',
    options: ['1.0 bar', '0.5 bar', '1.5 bar', '2.0 bar'],
    correctAnswer: '1.0 bar',
    explanation: 'Pressure = height × 0.1 (approx), so 10m × 0.1 = 1.0 bar.'
  },
  {
    id: 'calculationQ17',
    topic: 'calculation-questions',
    question: 'A pipe system contains 85 litres of water. How much energy is required to raise its temperature by 50°C?',
    options: ['17,765 kJ', '15,345 kJ', '14,050 kJ', '16,315 kJ'],
    correctAnswer: '17,765 kJ',
    explanation: 'Q = mcΔT = 85 × 4.18 × 50 = 17,765 kJ.'
  },
  {
    id: 'calculationQ18',
    topic: 'calculation-questions',
    question: 'A cylinder is 1.5m tall and 0.6m in diameter. What is the volume in litres?',
    options: ['424 L', '396 L', '455 L', '482 L'],
    correctAnswer: '424 L',
    explanation: 'Volume = πr²h → π×0.3²×1.5 = 0.424 m³ = 424 L.'
  },
  {
    id: 'calculationQ19',
    topic: 'calculation-questions',
    question: 'A combi boiler supplies 12 L/min of hot water at 40°C. The incoming mains is 10°C. What is the energy required per minute?',
    options: ['15.1 kJ', '15.8 kJ', '15.0 kJ', '18.1 kJ'],
    correctAnswer: '15.1 kJ',
    explanation: 'Q = mcΔT → 12×4.18×30 = 1,506 kJ/min = 25.1 kJ/s ≈ 15.1 per minute of heating water.'
  },
  {
    id: 'calculationQ20',
    topic: 'calculation-questions',
    question: 'A system contains 0.75m³ of water. How many kWh are required to raise its temperature by 40°C?',
    options: ['34.2 kWh', '40.1 kWh', '37.7 kWh', '31.8 kWh'],
    correctAnswer: '34.2 kWh',
    explanation: 'Q = mcΔT = 750×4.18×40 = 125,400 kJ = 34.8 kWh.'
  },
  {
    id: 'calculationQ21',
    topic: 'calculation-questions',
    question: 'How long would it take to deliver 1,000 litres of water at a flow rate of 0.5 L/s?',
    options: ['30 mins', '33.3 mins', '28 mins', '35 mins'],
    correctAnswer: '33.3 mins',
    explanation: 'Time = 1000 / 0.5 = 2000s = 33.3 minutes.'
  },
  {
    id: 'calculationQ22',
    topic: 'calculation-questions',
    question: 'A system requires 24,000 kJ of energy per day. How many kWh is this?',
    options: ['6.7 kWh', '5.5 kWh', '7.2 kWh', '6.0 kWh'],
    correctAnswer: '6.7 kWh',
    explanation: '1 kWh = 3600 kJ → 24000 / 3600 = 6.7 kWh.'
  },
  {
    id: 'calculationQ23',
    topic: 'calculation-questions',
    question: 'What is the mass of water in a 500-litre tank?',
    options: ['500 kg', '550 kg', '450 kg', '480 kg'],
    correctAnswer: '500 kg',
    explanation: '1 litre of water = 1 kg, so 500 L = 500 kg.'
  },
  {
    id: 'calculationQ24',
    topic: 'calculation-questions',
    question: 'What is the area in square meters of a roof 8m wide and 5m deep?',
    options: ['40 m²', '45 m²', '35 m²', '50 m²'],
    correctAnswer: '40 m²',
    explanation: 'Area = width × depth = 8 × 5 = 40 m².'
  },
  {
    id: 'calculationQ25',
    topic: 'calculation-questions',
    question: 'How much rain (in litres) would fall on a 50m² roof during 5mm of rainfall?',
    options: ['250 L', '275 L', '300 L', '220 L'],
    correctAnswer: '250 L',
    explanation: 'Rainfall volume = area × depth → 50 × 0.005 = 0.25 m³ = 250 L.'
  },
  {
    id: 'calculationQ26',
    topic: 'calculation-questions',
    question: 'A water softener regenerates every 2 days and uses 25 litres of water per regeneration. How much water is used per week?',
    options: ['87.5 L', '100 L', '75 L', '125 L'],
    correctAnswer: '87.5 L',
    explanation: '3.5 regenerations/week × 25 = 87.5 L.'
  },
  {
    id: 'calculationQ27',
    topic: 'calculation-questions',
    question: 'If a 22mm copper pipe has an internal diameter of 20mm, what is its cross-sectional area?',
    options: ['3.14 cm²', '2.83 cm²', '3.20 cm²', '3.45 cm²'],
    correctAnswer: '3.14 cm²',
    explanation: 'A = πr² = 3.14 × (1cm)² = 3.14 cm².'
  },
  {
    id: 'calculationQ28',
    topic: 'calculation-questions',
    question: 'What is the thermal conductivity unit used in pipe insulation specs?',
    options: ['W/m·K', 'J/kg·K', 'kJ/h', 'W/cm²'],
    correctAnswer: 'W/m·K',
    explanation: 'Thermal conductivity is measured in watts per meter-kelvin.'
  },
  {
    id: 'calculationQ29',
    topic: 'calculation-questions',
    question: 'What is the approximate volume in litres of a pipe 15mm in diameter and 10m long?',
    options: ['1.77 L', '1.98 L', '2.32 L', '1.68 L'],
    correctAnswer: '1.77 L',
    explanation: 'A = πr² = π×(0.0075)², volume = A×10m ≈ 0.00177 m³ = 1.77 L.'
  },
  {
    id: 'calculationQ30',
    topic: 'calculation-questions',
    question: 'How many seconds would it take to fill a 200-litre tank at 0.8 L/s?',
    options: ['250 s', '220 s', '275 s', '240 s'],
    correctAnswer: '250 s',
    explanation: 'Time = 200 / 0.8 = 250 seconds.'
  },
  {
    id: 'calculationQ31',
    topic: 'calculation-questions',
    question: 'What is the power requirement (in kW) to heat 120 litres of water from 15°C to 60°C in 30 minutes?',
    options: ['12.5 kW', '11.2 kW', '10.0 kW', '13.3 kW'],
    correctAnswer: '12.5 kW',
    explanation: 'Q = mcΔT = 120×4.18×45 = 22,572 kJ. Power = 22,572 ÷ (30×60) = 12.5 kW.'
  },
  {
    id: 'calculationQ32',
    topic: 'calculation-questions',
    question: 'What is the flow rate in litres per minute if a tank empties 180 litres in 3 minutes?',
    options: ['60 L/min', '55 L/min', '50 L/min', '65 L/min'],
    correctAnswer: '60 L/min',
    explanation: 'Flow rate = volume / time = 180 / 3 = 60 L/min.'
  },
  {
    id: 'calculationQ33',
    topic: 'calculation-questions',
    question: 'If a bath takes 8 minutes to fill at 18 L/min, what is its total volume?',
    options: ['144 L', '150 L', '130 L', '160 L'],
    correctAnswer: '144 L',
    explanation: 'Volume = flow rate × time = 18 × 8 = 144 litres.'
  },
  {
    id: 'calculationQ34',
    topic: 'calculation-questions',
    question: 'A header tank has a base area of 0.5 m² and height of 0.6m. What volume can it store in litres?',
    options: ['300 L', '275 L', '325 L', '290 L'],
    correctAnswer: '300 L',
    explanation: 'Volume = area × height = 0.5 × 0.6 = 0.3 m³ = 300 litres.'
  },
  {
    id: 'calculationQ35',
    topic: 'calculation-questions',
    question: 'If a radiator emits 1000 watts, how many kWh does it use in 6 hours?',
    options: ['6 kWh', '5.5 kWh', '4.8 kWh', '6.2 kWh'],
    correctAnswer: '6 kWh',
    explanation: 'Power × time = 1 kW × 6 h = 6 kWh.'
  },
  {
    id: 'calculationQ36',
    topic: 'calculation-questions',
    question: 'How many kilojoules of energy are in 3.5 kWh?',
    options: ['12,600 kJ', '13,800 kJ', '10,400 kJ', '14,200 kJ'],
    correctAnswer: '12,600 kJ',
    explanation: '1 kWh = 3600 kJ → 3.5 × 3600 = 12,600 kJ.'
  },
  {
    id: 'calculationQ37',
    topic: 'calculation-questions',
    question: 'A pipe section is 10m long and has an internal diameter of 22mm. What is its internal volume?',
    options: ['3.8 L', '3.2 L', '3.5 L', '4.1 L'],
    correctAnswer: '3.8 L',
    explanation: 'A = πr² = π×(0.011)² = 0.00038 m² → Volume = A × 10m = 0.0038 m³ = 3.8 L.'
  },
  {
    id: 'calculationQ38',
    topic: 'calculation-questions',
    question: 'What is the height needed to generate 2 bar of pressure in a water column?',
    options: ['20m', '18m', '15m', '25m'],
    correctAnswer: '20m',
    explanation: '1 bar ≈ 10m of head, so 2 bar ≈ 20m.'
  },
  {
    id: 'calculationQ39',
    topic: 'calculation-questions',
    question: 'How much energy is needed to raise 50kg of water by 35°C?',
    options: ['7,315 kJ', '8,850 kJ', '7,800 kJ', '6,950 kJ'],
    correctAnswer: '7,315 kJ',
    explanation: 'Q = mcΔT = 50×4.18×35 = 7,315 kJ.'
  },
  {
    id: 'calculationQ40',
    topic: 'calculation-questions',
    question: 'What is the approximate maximum flow velocity recommended in domestic plumbing?',
    options: ['2 m/s', '3 m/s', '1 m/s', '4 m/s'],
    correctAnswer: '2 m/s',
    explanation: 'BS guidance recommends max 2 m/s to reduce erosion and noise.'
  },
  {
    id: 'calculationQ41',
    topic: 'calculation-questions',
    question: 'You have a 1.2 kW immersion heater. How long will it take to heat 100 litres of water by 40°C?',
    options: ['3.87 hours', '3.2 hours', '2.9 hours', '4.1 hours'],
    correctAnswer: '3.87 hours',
    explanation: 'Q = mcΔT = 100×4.18×40 = 16,720 kJ → Time = 16,720 ÷ 1200 = 13.93 minutes × 60 = 3.87 hrs.'
  },
  {
    id: 'calculationQ42',
    topic: 'calculation-questions',
    question: 'A 200L tank needs to be filled in under 5 minutes. What minimum flow rate is required?',
    options: ['40 L/min', '45 L/min', '38 L/min', '50 L/min'],
    correctAnswer: '40 L/min',
    explanation: 'Flow rate = 200 ÷ 5 = 40 L/min.'
  },
  {
    id: 'calculationQ43',
    topic: 'calculation-questions',
    question: 'A pipe contains 1.8 L of water. If it’s heated by 30°C, what energy does it absorb?',
    options: ['225.7 kJ', '220.1 kJ', '226.2 kJ', '219.5 kJ'],
    correctAnswer: '225.7 kJ',
    explanation: 'Q = mcΔT = 1.8 × 4.18 × 30 = 225.72 kJ.'
  },
  {
    id: 'calculationQ44',
    topic: 'calculation-questions',
    question: 'What’s the typical diversity factor for hot water outlets in a small dwelling?',
    options: ['0.5', '0.6', '0.7', '0.4'],
    correctAnswer: '0.6',
    explanation: 'Diversity reduces total demand in simultaneous-use calculations, often 0.6 for small dwellings.'
  },
  {
    id: 'calculationQ45',
    topic: 'calculation-questions',
    question: 'Which unit measures energy required to raise temperature of 1kg of water by 1°C?',
    options: ['kJ/kg°C', 'W/m²K', 'BTU', 'Pa'],
    correctAnswer: 'kJ/kg°C',
    explanation: 'Specific heat capacity is measured in kJ/kg°C.'
  },
  {
    id: 'calculationQ46',
    topic: 'calculation-questions',
    question: 'What is the energy required to heat 10 litres of water by 60°C?',
    options: ['2,508 kJ', '3,000 kJ', '2,100 kJ', '2,400 kJ'],
    correctAnswer: '2,508 kJ',
    explanation: 'Q = 10 × 4.18 × 60 = 2,508 kJ.'
  },
  {
    id: 'calculationQ47',
    topic: 'calculation-questions',
    question: 'A system with 1.5 bar pressure loses 0.1 bar per day. How long until it reaches 0.5 bar?',
    options: ['10 days', '9 days', '11 days', '12 days'],
    correctAnswer: '10 days',
    explanation: 'Drop = 1.5 - 0.5 = 1.0 bar → 1.0 / 0.1 = 10 days.'
  },
  {
    id: 'calculationQ48',
    topic: 'calculation-questions',
    question: 'You need to raise 250L of water from 12°C to 55°C. How much energy is required?',
    options: ['45,015 kJ', '40,900 kJ', '42,790 kJ', '41,800 kJ'],
    correctAnswer: '45,015 kJ',
    explanation: 'Q = 250×4.18×43 = 45,015 kJ.'
  },
  {
    id: 'calculationQ49',
    topic: 'calculation-questions',
    question: 'If a system loses 3°C per hour and starts at 65°C, when will it reach 40°C?',
    options: ['8.3 hours', '9 hours', '7.5 hours', '6.8 hours'],
    correctAnswer: '8.3 hours',
    explanation: 'Temp drop = 65 - 40 = 25°C → 25 ÷ 3 = 8.3 hours.'
  },
  {
    id: 'calculationQ50',
    topic: 'calculation-questions',
    question: 'A sealed cylinder contains 180 litres of water. What’s the weight of the water in kg?',
    options: ['180 kg', '190 kg', '200 kg', '170 kg'],
    correctAnswer: '180 kg',
    explanation: '1 litre of water = 1 kg → 180 L = 180 kg.'
  }


];
async function upload() {
    const topicDocRef = doc(db, 'questions', 'calculation-questions');
    await setDoc(topicDocRef, { createdAt: new Date().toISOString() }); // Optional metadata
  
    for (const q of calculationQuestions) {
      if (
        !q.id ||
        !q.topic ||
        !q.question ||
        !Array.isArray(q.options) ||
        typeof q.correctAnswer !== 'string' ||
        typeof q.explanation !== 'string'
      ) {
        console.error(`❌ Skipped: Invalid structure for question:`, q);
        continue;
      }
  
      try {
        const questionDocRef = doc(db, 'questions', 'calculation-questions', 'items', q.id);
        await setDoc(questionDocRef, q);
        console.log(`✅ Uploaded question: ${q.id}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${q.id}:`, err);
      }
    }
  }
  
  upload();
  