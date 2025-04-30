// ✅ scripts/uploadReferences.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// Safely initialize Firebase app
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

// ✅ Reference entries (expanded with more categories)
const references = [
  // ✅ Clipping Distances
  {
    id: 'copper-horizontal-clipping',
    category: 'pipe-clipping-distances',
    title: 'Copper Pipe Clipping - Horizontal',
    content: 'Copper pipes should be clipped every 1.2m horizontally to prevent sagging.',
  },
  {
    id: 'copper-vertical-clipping',
    category: 'pipe-clipping-distances',
    title: 'Copper Pipe Clipping - Vertical',
    content: 'Copper pipes should be clipped every 1.8m vertically.',
  },
  {
    id: 'plastic-horizontal-clipping',
    category: 'pipe-clipping-distances',
    title: 'Plastic Pipe Clipping - Horizontal',
    content: 'Plastic pipes should be clipped every 0.8m horizontally due to flexibility.',
  },
  {
    id: 'plastic-vertical-clipping',
    category: 'pipe-clipping-distances',
    title: 'Plastic Pipe Clipping - Vertical',
    content: 'Plastic pipes should be clipped every 1.0m vertically.',
  },

  // ✅ Fluid Categories
  {
    id: 'fluid-category-1',
    category: 'fluid-categories',
    title: 'Fluid Category 1',
    content: 'Potable water intended for human consumption from a wholesome supply.',
  },
  {
    id: 'fluid-category-2',
    category: 'fluid-categories',
    title: 'Fluid Category 2',
    content: 'Water with slight changes in taste, odour, temperature (e.g., heated water not above 25°C).',
  },
  {
    id: 'fluid-category-3',
    category: 'fluid-categories',
    title: 'Fluid Category 3',
    content: 'Substances of low toxicity (e.g., disinfectants, food-grade materials).',
  },
  {
    id: 'fluid-category-4',
    category: 'fluid-categories',
    title: 'Fluid Category 4',
    content: 'Significant health hazard due to concentrations of toxic substances (e.g., pesticides).',
  },
  {
    id: 'fluid-category-5',
    category: 'fluid-categories',
    title: 'Fluid Category 5',
    content: 'Serious health hazard, e.g., human waste, pathogens, garden taps without backflow protection.',
  },

  // ✅ Pipe Sizes
  {
    id: 'standard-waste-sizes',
    category: 'pipe-sizes',
    title: 'Standard Waste Pipe Sizes',
    content: '32mm (basins), 40mm (sinks, baths), 50mm (showers, multiple outlets).',
  },
  {
    id: 'overflow-pipe-sizes',
    category: 'pipe-sizes',
    title: 'Overflow Pipe Sizes',
    content: 'Typically 21.5mm for cisterns, tanks, and safety overflows.',
  },
  {
    id: 'rainwater-pipe-sizes',
    category: 'pipe-sizes',
    title: 'Rainwater Pipe Sizes',
    content: 'Typically 68mm downpipes and 112mm gutters for domestic properties.',
  },

  // ✅ Conversion Tables
  {
    id: 'bar-to-psi',
    category: 'conversion-tables',
    title: 'Pressure Conversion: Bar to PSI',
    content: '1 bar = 14.5 PSI.',
  },
  {
    id: 'litres-to-gallons',
    category: 'conversion-tables',
    title: 'Litres to Gallons (UK)',
    content: '1 litre = 0.22 UK gallons.',
  },
  {
    id: 'mm-to-inches',
    category: 'conversion-tables',
    title: 'Millimetres to Inches',
    content: '25.4mm = 1 inch.',
  },
  {
    id: 'celsius-to-fahrenheit',
    category: 'conversion-tables',
    title: 'Celsius to Fahrenheit',
    content: '°F = (°C × 1.8) + 32.',
  },

  // ✅ Water Regulations
  {
    id: 'type-aa-air-gap',
    category: 'water-regulations',
    title: 'Type AA Air Gap',
    content: 'Prevents backflow. Complete air break above spillover level, used where high risk exists.',
  },
  {
    id: 'type-ab-air-gap',
    category: 'water-regulations',
    title: 'Type AB Air Gap',
    content: 'Backflow prevention device with an air gap and non-return valves, for category 5 fluids.',
  },
  {
    id: 'double-check-valve',
    category: 'water-regulations',
    title: 'Double Check Valve (DC)',
    content: 'Used for low-risk backflow prevention. Not suitable for Fluid Category 5.',
  },
  {
    id: 'pipework-insulation',
    category: 'water-regulations',
    title: 'Pipework Insulation Requirements',
    content: 'Pipes in unheated spaces must be insulated to prevent freezing, minimum thickness varies.',
  },

  // ✅ Boiler Fault Codes
  {
    id: 'vaillant-f75',
    category: 'boiler-fault-codes',
    title: 'Vaillant F75',
    content: 'Pressure sensor or pump fault. Check pump operation and pressure sensor.',
  },
  {
    id: 'worcester-e9',
    category: 'boiler-fault-codes',
    title: 'Worcester E9',
    content: 'Overheat protection activated. Common causes include faulty pump or blockage.',
  },
  {
    id: 'ideal-f2',
    category: 'boiler-fault-codes',
    title: 'Ideal F2',
    content: 'Flame loss during operation. Check ignition and gas supply.',
  },
  {
    id: 'baxi-e119',
    category: 'boiler-fault-codes',
    title: 'Baxi E119',
    content: 'Low water pressure. Check system pressure and refill if necessary.',
  },

  // ✅ Heating Systems
  {
    id: 's-plan-system',
    category: 'heating-systems',
    title: 'S-Plan Heating System',
    content: 'Uses two 2-port motorised valves for separate heating and hot water control.',
  },
  {
    id: 'y-plan-system',
    category: 'heating-systems',
    title: 'Y-Plan Heating System',
    content: 'Uses a single 3-port valve to divert water between heating and hot water circuits.',
  },
  {
    id: 'w-plan-system',
    category: 'heating-systems',
    title: 'W-Plan Heating System',
    content: 'Two-port valves on heating and hot water circuits, allows better zoning control.',
  },

  // ✅ Testing Pressures
  {
    id: 'water-testing-pressure',
    category: 'testing-requirements',
    title: 'Water Testing Pressure',
    content: 'Water pipes should be tested at 1.5 × working pressure, typically around 6 bar for 1 hour.',
  },
  {
    id: 'gas-tightness-test',
    category: 'testing-requirements',
    title: 'Gas Tightness Test',
    content: 'Domestic gas pipework should hold pressure with no drop over 2 minutes at 20mbar.',
  },
  {
    id: 'gas-strength-test',
    category: 'testing-requirements',
    title: 'Gas Strength Test',
    content: 'Strength test at 1.5 times working pressure (usually 40mbar) for at least 1 minute.',
  },

  // ✅ Pipe Label Colours
  {
    id: 'pipe-labelling-colours',
    category: 'pipe-labelling',
    title: 'Pipe Labelling Colours',
    content: 'Gas = Yellow, Cold Water = Blue, Hot Water = Red, Heating Flow = Orange, Heating Return = Brown.',
  },

  // ✅ Installation Minimums
  {
    id: 'gas-meter-distance',
    category: 'installation-guidelines',
    title: 'Gas Meter Clearance',
    content: 'Minimum 150mm clearance required around gas meters for maintenance access.',
  },
  {
    id: 'trench-depth-water-pipe',
    category: 'installation-guidelines',
    title: 'Water Pipe Trench Depth',
    content: 'Minimum 750mm deep to protect from freezing and damage.',
  },
  {
    id: 'minimum-vent-pipe-length',
    category: 'installation-guidelines',
    title: 'Minimum Vent Pipe Length',
    content: 'Vent pipe must rise at least 450mm above the cold water cistern.',
  },

  // ✅ Cylinder Safety (G3 Regs)
  {
    id: 'tundish-fall-requirement',
    category: 'cylinder-safety',
    title: 'Tundish Fall Requirement',
    content: 'Pipe must fall at least 1:200 gradient from tundish to outlet.',
  },
  {
    id: 'discharge-pipe-vertical-length',
    category: 'cylinder-safety',
    title: 'Vertical Discharge Pipe Length',
    content: 'No more than 300mm vertical pipe below tundish before going horizontal.',
  },
  {
    id: 'discharge-pipe-sizing',
    category: 'cylinder-safety',
    title: 'Discharge Pipe Sizing',
    content: 'Minimum 22mm pipe for discharge pipes up to 9m length. Increase to 28mm if longer.',
  },
    // ✅ Toilets
  {
    id: 'close-coupled-toilet',
    category: 'toilets',
    title: 'Close-Coupled Toilet',
    content: 'Common in modern homes, cistern sits directly on the toilet pan.',
  },
  {
    id: 'back-to-wall-toilet',
    category: 'toilets',
    title: 'Back-to-Wall Toilet',
    content: 'Cistern concealed inside the wall or unit for a cleaner look.',
  },
  {
    id: 'wall-hung-toilet',
    category: 'toilets',
    title: 'Wall-Hung Toilet',
    content: 'Mounted on the wall with concealed cistern and floating appearance.',
  },
  {
    id: 'high-level-toilet',
    category: 'toilets',
    title: 'High-Level Toilet',
    content: 'Cistern mounted high up with a pull chain, found in traditional styles.',
  },

  // ✅ Taps
  {
    id: 'pillar-tap',
    category: 'taps',
    title: 'Pillar Tap',
    content: 'Separate hot and cold taps, commonly found on basins.',
  },
  {
    id: 'mixer-tap',
    category: 'taps',
    title: 'Mixer Tap',
    content: 'Combines hot and cold water in a single spout.',
  },
  {
    id: 'monobloc-tap',
    category: 'taps',
    title: 'Monobloc Tap',
    content: 'Single spout tap with one or two levers for mixing, requires 1 tap hole.',
  },
  {
    id: 'non-concussive-tap',
    category: 'taps',
    title: 'Non-Concussive Tap',
    content: 'Self-closing tap used in commercial or public washrooms.',
  },
  {
    id: 'sensor-tap',
    category: 'taps',
    title: 'Sensor Tap',
    content: 'Activated by motion sensors to improve hygiene and conserve water.',
  },

  // ✅ Boiler Types
  {
    id: 'combi-boiler',
    category: 'boiler-types',
    title: 'Combi Boiler',
    content: 'Provides hot water on demand and central heating without needing tanks.',
  },
  {
    id: 'system-boiler',
    category: 'boiler-types',
    title: 'System Boiler',
    content: 'Requires a cylinder for hot water but no cold water tank. Ideal for larger homes.',
  },
  {
    id: 'regular-boiler',
    category: 'boiler-types',
    title: 'Regular (Heat-Only) Boiler',
    content: 'Works with hot water cylinder and cold water storage tank. Good for homes with traditional setups.',
  },
  {
    id: 'electric-boiler',
    category: 'boiler-types',
    title: 'Electric Boiler',
    content: 'Uses electricity for heating water. Suitable for homes without a gas supply.',
  },

  // ✅ Pipe Clips
  {
    id: 'saddle-clip',
    category: 'pipe-clips',
    title: 'Saddle Clip',
    content: 'Simple clip for securing pipes to walls or joists.',
  },
  {
    id: 'hinged-clip',
    category: 'pipe-clips',
    title: 'Hinged Clip',
    content: 'Clip with a hinge and snap-on cover for secure pipe fixing.',
  },
  {
    id: 'munsen-ring',
    category: 'pipe-clips',
    title: 'Munsen Ring',
    content: 'Metal ring bracket that clamps around the pipe, often used for copper and steel.',
  },
    // ✅ Toilets
    {
      id: 'close-coupled-toilet',
      category: 'toilets',
      title: 'Close-Coupled Toilet',
      content: 'Common in modern homes, cistern sits directly on the toilet pan.',
    },
    {
      id: 'back-to-wall-toilet',
      category: 'toilets',
      title: 'Back-to-Wall Toilet',
      content: 'Cistern concealed inside the wall or unit for a cleaner look.',
    },
    {
      id: 'wall-hung-toilet',
      category: 'toilets',
      title: 'Wall-Hung Toilet',
      content: 'Mounted on the wall with concealed cistern and floating appearance.',
    },
    {
      id: 'high-level-toilet',
      category: 'toilets',
      title: 'High-Level Toilet',
      content: 'Cistern mounted high up with a pull chain, found in traditional styles.',
    },
  
    // ✅ Taps
    {
      id: 'pillar-tap',
      category: 'taps',
      title: 'Pillar Tap',
      content: 'Separate hot and cold taps, commonly found on basins.',
    },
    {
      id: 'mixer-tap',
      category: 'taps',
      title: 'Mixer Tap',
      content: 'Combines hot and cold water in a single spout.',
    },
    {
      id: 'monobloc-tap',
      category: 'taps',
      title: 'Monobloc Tap',
      content: 'Single spout tap with one or two levers for mixing, requires 1 tap hole.',
    },
    {
      id: 'non-concussive-tap',
      category: 'taps',
      title: 'Non-Concussive Tap',
      content: 'Self-closing tap used in commercial or public washrooms.',
    },
    {
      id: 'sensor-tap',
      category: 'taps',
      title: 'Sensor Tap',
      content: 'Activated by motion sensors to improve hygiene and conserve water.',
    },
  
    // ✅ Boiler Types
    {
      id: 'combi-boiler',
      category: 'boiler-types',
      title: 'Combi Boiler',
      content: 'Provides hot water on demand and central heating without needing tanks.',
    },
    {
      id: 'system-boiler',
      category: 'boiler-types',
      title: 'System Boiler',
      content: 'Requires a cylinder for hot water but no cold water tank. Ideal for larger homes.',
    },
    {
      id: 'regular-boiler',
      category: 'boiler-types',
      title: 'Regular (Heat-Only) Boiler',
      content: 'Works with hot water cylinder and cold water storage tank. Good for homes with traditional setups.',
    },
    {
      id: 'electric-boiler',
      category: 'boiler-types',
      title: 'Electric Boiler',
      content: 'Uses electricity for heating water. Suitable for homes without a gas supply.',
    },
  
    // ✅ Pipe Clips
    {
      id: 'saddle-clip',
      category: 'pipe-clips',
      title: 'Saddle Clip',
      content: 'Simple clip for securing pipes to walls or joists.',
    },
    {
      id: 'hinged-clip',
      category: 'pipe-clips',
      title: 'Hinged Clip',
      content: 'Clip with a hinge and snap-on cover for secure pipe fixing.',
    },
    {
      id: 'munsen-ring',
      category: 'pipe-clips',
      title: 'Munsen Ring',
      content: 'Metal ring bracket that clamps around the pipe, often used for copper and steel.',
    },
  

];

async function uploadReferences() {
  try {
    for (const ref of references) {
      const refPath = doc(db, 'references', ref.category, 'items', ref.id);
      await setDoc(refPath, {
        title: ref.title,
        content: ref.content,
        category: ref.category
      });
      console.log(`✅ Uploaded reference: ${ref.title}`);
    }
    console.log('✅✅✅ All references uploaded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Upload failed:', err);
    process.exit(1);
  }
}

uploadReferences();
