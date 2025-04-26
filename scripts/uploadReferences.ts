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
  // 🔵 Fitting Types
  {
    id: 'compression-fittings',
    category: 'fitting-types',
    title: 'Compression Fittings',
    content: 'Use a nut and olive to form a seal. No heat or soldering required. Suitable for copper or plastic with inserts.'
  },
  {
    id: 'pushfit-fittings',
    category: 'fitting-types',
    title: 'Push-Fit Fittings',
    content: 'Quick-connect plumbing fittings ideal for plastic or copper pipes. Require pipe inserts and proper insertion depth.'
  },
  {
    id: 'solder-ring-fittings',
    category: 'fitting-types',
    title: 'Solder Ring Fittings',
    content: 'Contain pre-applied solder. Heated until solder melts to create leak-proof joint. Used with copper pipe.'
  },
  {
    id: 'end-feed-fittings',
    category: 'fitting-types',
    title: 'End Feed Fittings',
    content: 'Require external solder. Used with copper. Popular for neat installation and cost-effective bulk use.'
  },
  {
    id: 'threaded-fittings',
    category: 'fitting-types',
    title: 'Threaded Fittings',
    content: 'Screw-threaded joints for metal pipework. Often used with gas or industrial applications. Seal with PTFE or hemp.'
  },

  // 🔵 Boiler Fault Codes
  {
    id: 'vaillant-f28',
    category: 'boiler-fault-codes',
    title: 'Vaillant F28',
    content: 'Ignition fault — no gas or faulty electrode. Check gas supply, ignition cable, and spark electrode.'
  },
  {
    id: 'worcester-e9',
    category: 'boiler-fault-codes',
    title: 'Worcester E9',
    content: 'Overheat error. Usually caused by faulty pump or blocked system. Check for circulation or airlock issues.'
  },
  {
    id: 'baxi-e133',
    category: 'boiler-fault-codes',
    title: 'Baxi E133',
    content: 'No ignition. Similar to Vaillant F28. Check gas pressure and condensate trap.'
  },
  {
    id: 'ideal-l2',
    category: 'boiler-fault-codes',
    title: 'Ideal L2',
    content: 'Ignition lockout. Ensure condensate pipe isn’t frozen and electrode is clean.'
  },
  {
    id: 'glowworm-f16',
    category: 'boiler-fault-codes',
    title: 'Glow-worm F16',
    content: 'Flame detection error. Commonly caused by faulty electrode or blocked flue.'
  },

  // 🔵 Water Regulations
  {
    id: 'type-a-air-gap',
    category: 'water-regulations',
    title: 'Type AA Air Gap',
    content: 'Non-mechanical backflow prevention. Open-to-air break above spill level to protect water supply.'
  },
  {
    id: 'double-check-valve',
    category: 'water-regulations',
    title: 'Double Check Valve',
    content: 'Required where backflow risk is low. Must be WRAS-approved. Not suitable for Category 5 fluids.'
  },
  {
    id: 'fluid-category-5',
    category: 'water-regulations',
    title: 'Fluid Category 5',
    content: 'High hazard fluids. Require Type AA, AB, or DC backflow protection. Includes toilets, bidets, garden taps.'
  },
  {
    id: 'isolation-valves',
    category: 'water-regulations',
    title: 'Isolation Valves',
    content: 'Must be fitted on the supply to appliances. Enables safe servicing and maintenance.'
  },
  {
    id: 'pipe-labelling',
    category: 'pipe-labelling',
    title: 'Pipe Labelling Colours',
    content: 'Cold Water = Blue, Hot Water = Red, Gas = Yellow, Heating Flow = Orange, Return = Brown.'
  },

  // 🔵 Conversion Tables
  {
    id: 'bar-to-psi',
    category: 'conversion-tables',
    title: 'Pressure Conversion: Bar to PSI',
    content: '1 bar = 14.5 PSI. Used to compare pressure readings in domestic and commercial plumbing.'
  },
  {
    id: 'litres-to-gallons',
    category: 'conversion-tables',
    title: 'Litres to Gallons (UK)',
    content: '1 Litre = 0.22 UK Gallons. Multiply litres by 0.22 to convert to gallons.'
  },
  {
    id: 'mm-to-inches',
    category: 'conversion-tables',
    title: 'Millimetres to Inches',
    content: '25.4mm = 1 inch. Divide mm by 25.4 for imperial conversion.'
  },
  {
    id: 'flowrate-calculation',
    category: 'conversion-tables',
    title: 'Flow Rate Calculation',
    content: 'Flow (L/min) = Volume (L) ÷ Time (min). Used when testing outlets or appliances.'
  },
  {
    id: 'temperature-conversion',
    category: 'conversion-tables',
    title: 'Celsius to Fahrenheit',
    content: '°F = (°C × 1.8) + 32. Useful for comparing hot water limits or setting thermostats.'
  }
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
