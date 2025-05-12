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

const coldWaterQuestions = [
  {
    id: 'coldWaterQ1',
    topic: 'cold-water',
    question: 'What is the minimum pressure required for mains cold water in the UK?',
    options: ['1.0 bar', '2.0 bar', '1.5 bar', '0.5 bar'],
    correctAnswer: '1.5 bar',
    explanation: 'The minimum legal and functional requirement is 1.5 bar to ensure reliable flow.'
  },
  {
    id: 'coldWaterQ2',
    topic: 'cold-water',
    question: 'Which material is most commonly used for underground cold water mains?',
    options: ['Copper', 'MDPE', 'Lead', 'Stainless Steel'],
    correctAnswer: 'MDPE',
    explanation: 'MDPE is flexible, durable and corrosion-resistant.'
  },
  {
    id: 'coldWaterQ3',
    topic: 'cold-water',
    question: 'What device prevents backflow in a cold water system?',
    options: ['Gate valve', 'Double check valve', 'Ball valve', 'Stop valve'],
    correctAnswer: 'Double check valve',
    explanation: 'Backflow prevention is a legal requirement to protect potable supply.'
  },
  {
    id: 'coldWaterQ4',
    topic: 'cold-water',
    question: 'A borehole supply for a remote home must follow which regulation?',
    options: ['Private Water Supplies Regulations 2009', 'Part G', 'Building Regs Part H', 'Water Bylaws 1985'],
    correctAnswer: 'Private Water Supplies Regulations 2009',
    explanation: 'The Private Water Supplies Regs ensure safety of non-mains sources.'
  },
  {
    id: 'coldWaterQ5',
    topic: 'cold-water',
    question: 'What is the purpose of a pressure vessel in a pumped cold water system?',
    options: ['Prevent water hammer', 'Ensure air gap separation', 'Aid pressure boosting during low supply', 'Monitor flow rate'],
    correctAnswer: 'Aid pressure boosting during low supply',
    explanation: 'It helps maintain constant pressure by storing energy.'
  },
  {
    id: 'coldWaterQ6',
    topic: 'cold-water',
    question: 'A CWSC over 1000L must include which of the following?',
    options: ['Separate overflow and warning pipes', 'A UV treatment system', 'Filter before the outlet', 'Minimum two outlets'],
    correctAnswer: 'Separate overflow and warning pipes',
    explanation: 'This alerts occupants to high levels without immediate spillage.'
  },
  {
    id: 'coldWaterQ7',
    topic: 'cold-water',
    question: 'What is the minimum separation between overflow and warning pipes in a CWSC?',
    options: ['50mm', '100mm', '10mm', '75mm'],
    correctAnswer: '50mm',
    explanation: 'The warning pipe should activate before the overflow is used.'
  },
  {
    id: 'coldWaterQ8',
    topic: 'cold-water',
    question: 'What is the most suitable method of boosting cold water supply where mains is unreliable?',
    options: ['Additional storage cistern', 'Break tank and booster set', 'Loft-fed supply', 'Tankless heater'],
    correctAnswer: 'Break tank and booster set',
    explanation: 'Provides consistent pressure when mains is weak or inconsistent.'
  },
  {
    id: 'coldWaterQ9',
    topic: 'cold-water',
    question: 'What British Standard outlines appliance-to-occupant ratios?',
    options: ['BS EN 806', 'BS 6700', 'BS 7671', 'BS 5536'],
    correctAnswer: 'BS 6700',
    explanation: 'BS 6700 provides plumbing design criteria and guidance.'
  },
  {
    id: 'coldWaterQ10',
    topic: 'cold-water',
    question: 'What is a risk of locating a borehole near a garden centre?',
    options: ['High pH levels', 'Fertiliser contamination', 'Sediment buildup', 'Iron deposits'],
    correctAnswer: 'Fertiliser contamination',
    explanation: 'Fertilisers can leach nitrates into boreholes near surface.'
  },
  {
    id: 'coldWaterQ11',
    topic: 'cold-water',
    question: 'What is the minimum pipe size used to supply a bath with cold water?',
    options: ['10mm', '28mm', '22mm', '15mm'],
    correctAnswer: '22mm',
    explanation: 'Ensures sufficient flow to fill a bath in a reasonable time.'
  },
  {
    id: 'coldWaterQ12',
    topic: 'cold-water',
    question: 'Which of the following must be done when commissioning a new cold water system?',
    options: ['Connect warning pipes', 'Add water softener', 'Flush and disinfect', 'Fit expansion loop'],
    correctAnswer: 'Flush and disinfect',
    explanation: 'Required under Water Regulations for public safety.'
  },
  {
    id: 'coldWaterQ13',
    topic: 'cold-water',
    question: 'What is the danger zone distance for crossflow at a WC connection?',
    options: ['200mm', '300mm', '150mm', '100mm'],
    correctAnswer: '200mm',
    explanation: 'Prevents back contamination.'
  },
  {
    id: 'coldWaterQ14',
    topic: 'cold-water',
    question: 'Which Building Reg covers hygiene, water efficiency, and hot/cold supply?',
    options: ['Part G', 'Part L', 'Part F', 'Part P'],
    correctAnswer: 'Part G',
    explanation: 'Part G is specific to water systems.'
  },
  {
    id: 'coldWaterQ15',
    topic: 'cold-water',
    question: 'What must be done before drawing water from a private borehole?',
    options: ['Notify Gas Safe', 'Notify building control', 'Risk assessment and water quality test', 'Fit water meter'],
    correctAnswer: 'Risk assessment and water quality test',
    explanation: 'You must ensure it\'s safe for consumption.'
  },
  {
    id: 'coldWaterQ16',
    topic: 'cold-water',
    question: 'Which component would you use to isolate cold water to an appliance?',
    options: ['Tundish', 'Expansion valve', 'Drain cock', 'Service valve'],
    correctAnswer: 'Service valve',
    explanation: 'Service valves allow local isolation.'
  },
  {
    id: 'coldWaterQ17',
    topic: 'cold-water',
    question: 'What is a Type AA air gap used for?',
    options: ['Prevent backflow', 'Reduce noise', 'Reduce pipe size', 'Boost pressure'],
    correctAnswer: 'Prevent backflow',
    explanation: 'Creates a physical break between contaminated and potable sources.'
  },
  {
    id: 'coldWaterQ18',
    topic: 'cold-water',
    question: 'Which of the following would most likely cause cold water hammer?',
    options: ['Sudden closing of a valve', 'Scale buildup', 'Low flow', 'Water metering'],
    correctAnswer: 'Sudden closing of a valve',
    explanation: 'Pressure spike from abrupt stopping of water flow.'
  },
  {
    id: 'coldWaterQ19',
    topic: 'cold-water',
    question: 'What is the typical minimum burial depth for a cold service pipe?',
    options: ['750mm', '1m', '300mm', '500mm'],
    correctAnswer: '750mm',
    explanation: 'Prevents freezing and physical damage.'
  },
  {
    id: 'coldWaterQ20',
    topic: 'cold-water',
    question: 'Which method is suitable for connecting MDPE pipes underground?',
    options: ['Threaded brass', 'Electrofusion or compression fittings', 'Solder', 'PVC solvent weld'],
    correctAnswer: 'Electrofusion or compression fittings',
    explanation: 'Only approved fittings for MDPE ensure secure joins.'
  },
  {
    id: 'coldWaterQ21',
    topic: 'cold-water',
    question: 'When is a cold water pipe at risk of microbial growth?',
    options: ['When laid too close to a heat source', 'When installed vertically', 'When pressure is too high', 'When flow rate is too fast'],
    correctAnswer: 'When laid too close to a heat source',
    explanation: 'Can allow Legionella to multiply if temperature rises above safe level.'
  },
  {
    id: 'coldWaterQ22',
    topic: 'cold-water',
    question: 'What body enforces Water Supply (Water Fittings) Regulations?',
    options: ['WRAS', 'Ofwat', 'Local Water Authority', 'Building Control'],
    correctAnswer: 'Local Water Authority',
    explanation: 'Water suppliers are responsible for enforcement.'
  },
  {
    id: 'coldWaterQ23',
    topic: 'cold-water',
    question: 'In a multi-storey flat where pressure varies, what system gives best performance?',
    options: ['Break tank with pressurised manifold', 'Gravity feed', 'Shared mains', 'Open vented cylinder'],
    correctAnswer: 'Break tank with pressurised manifold',
    explanation: 'Prevents pressure drop across units.'
  },
  {
    id: 'coldWaterQ24',
    topic: 'cold-water',
    question: 'What type of system supplies cold water via a cistern in the loft?',
    options: ['Boosted mains', 'Indirect', 'Pressurised sealed', 'Direct'],
    correctAnswer: 'Indirect',
    explanation: 'Common in older homes to isolate from main.'
  },
  {
    id: 'coldWaterQ25',
    topic: 'cold-water',
    question: 'What is the most important action when installing cold water in a food prep area?',
    options: ['Avoid u-bends', 'Use lead-free solder', 'Prevent contamination from other services', 'Label pipes clearly'],
    correctAnswer: 'Prevent contamination from other services',
    explanation: 'Prevents cross-connection or bacterial ingress.'
  },
  {
    id: 'coldWaterQ26',
    topic: 'cold-water',
    question: 'Which component prevents contamination by maintaining a physical break in a supply system?',
    options: ['Tundish', 'Stop tap', 'Double check valve', 'Air gap'],
    correctAnswer: 'Air gap',
    explanation: 'Air gaps prevent backflow contamination from connected fixtures.'
  },
  {
    id: 'coldWaterQ27',
    topic: 'cold-water',
    question: 'When installing a new cistern, which item is required to prevent insects and debris?',
    options: ['Overflow pipe', 'Lid with screen', 'Stop valve', 'Insulation mat'],
    correctAnswer: 'Lid with screen',
    explanation: 'A screened lid protects the cistern from contamination.'
  },
  {
    id: 'coldWaterQ28',
    topic: 'cold-water',
    question: 'Which type of water system receives water directly from the mains?',
    options: ['Vented', 'Indirect', 'Pressurised', 'Direct'],
    correctAnswer: 'Direct',
    explanation: 'Direct systems take cold water straight from the mains to all outlets.'
  },
  {
    id: 'coldWaterQ29',
    topic: 'cold-water',
    question: 'What is the main reason for installing a service valve on pipework?',
    options: ['Backflow prevention', 'Water hammer reduction', 'Pressure boosting', 'Local isolation'],
    correctAnswer: 'Local isolation',
    explanation: 'Service valves are used to isolate parts of the system for maintenance.'
  },
  {
    id: 'coldWaterQ30',
    topic: 'cold-water',
    question: 'What should be fitted to the end of an overflow pipe from a cistern?',
    options: ['U-bend', 'Warning label', 'Fly screen', 'Double check valve'],
    correctAnswer: 'Fly screen',
    explanation: 'Fly screens prevent insects from entering overflow pipes.'
  },
  {
    id: 'coldWaterQ31',
    topic: 'cold-water',
    question: 'Which of the following is NOT a suitable material for drinking water pipework?',
    options: ['Copper', 'MDPE', 'Lead', 'Polybutylene'],
    correctAnswer: 'Lead',
    explanation: 'Lead is no longer permitted due to health hazards.'
  },
  {
    id: 'coldWaterQ32',
    topic: 'cold-water',
    question: 'A customer reports cloudy cold water at their kitchen tap. What is the most likely cause?',
    options: ['Bacterial growth', 'High air content', 'Rust', 'Low pressure'],
    correctAnswer: 'High air content',
    explanation: 'Air bubbles can cause temporary cloudiness in water.'
  },
  {
    id: 'coldWaterQ33',
    topic: 'cold-water',
    question: 'Which regulation governs the design and installation of domestic plumbing systems in the UK?',
    options: ['Gas Safety Regulations', 'Part G of Building Regs', 'Health and Safety Act', 'Water Pressure Act'],
    correctAnswer: 'Part G of Building Regs',
    explanation: 'Part G covers cold/hot water supply, hygiene, and efficiency.'
  },
  {
    id: 'coldWaterQ34',
    topic: 'cold-water',
    question: 'What is the function of a stop tap?',
    options: ['Increase pressure', 'Drain pipework', 'Prevent siphonage', 'Shut off the supply'],
    correctAnswer: 'Shut off the supply',
    explanation: 'Stop taps allow isolation of the entire system.'
  },
  {
    id: 'coldWaterQ35',
    topic: 'cold-water',
    question: 'What is required when cold water pipework passes through a wall?',
    options: ['Colour marking', 'Sleeving', 'Clip support', 'Lagging only'],
    correctAnswer: 'Sleeving',
    explanation: 'Sleeving prevents wear and protects pipework through structures.'
  },
  {
    id: 'coldWaterQ36',
    topic: 'cold-water',
    question: 'What should be used to insulate external cold water pipework?',
    options: ['Felt insulation', 'Foam pipe lagging', 'Electrical tape', 'Mineral wool'],
    correctAnswer: 'Foam pipe lagging',
    explanation: 'Foam lagging is waterproof and helps prevent freezing.'
  },
  {
    id: 'coldWaterQ37',
    topic: 'cold-water',
    question: 'Which of these fittings must be WRAS approved for use with potable water?',
    options: ['Radiator valve', 'Double check valve', 'Drain cock', 'Float valve'],
    correctAnswer: 'Float valve',
    explanation: 'Float valves in cisterns must be WRAS approved to ensure safety.'
  },
  {
    id: 'coldWaterQ38',
    topic: 'cold-water',
    question: 'Cold water cisterns should be cleaned how frequently?',
    options: ['Every 10 years', 'Every 6 months', 'As required, typically every year', 'Every 5 years'],
    correctAnswer: 'As required, typically every year',
    explanation: 'Inspection and cleaning depend on condition but should be regular.'
  },
  {
    id: 'coldWaterQ39',
    topic: 'cold-water',
    question: 'Which type of valve can be operated without tools in an emergency?',
    options: ['Gate valve', 'Ball valve with lever', 'Service valve', 'Double check valve'],
    correctAnswer: 'Ball valve with lever',
    explanation: 'Levers allow fast manual operation during emergencies.'
  },
  {
    id: 'coldWaterQ40',
    topic: 'cold-water',
    question: 'What should be done before drilling into a wall to secure pipework?',
    options: ['Mark with permanent pen', 'Turn on water', 'Check for hidden services', 'Check paint colour'],
    correctAnswer: 'Check for hidden services',
    explanation: 'Avoiding electrical or gas lines is critical when fixing pipe clips.'
  },
  {
    id: 'coldWaterQ41',
    topic: 'cold-water',
    question: 'A plumber finds greenish corrosion on a copper pipe. What\'s the cause?',
    options: ['Overheating', 'Chemical exposure', 'Oxidation', 'Excess pressure'],
    correctAnswer: 'Oxidation',
    explanation: 'Greenish corrosion is caused by copper reacting with air/moisture.'
  },
  {
    id: 'coldWaterQ42',
    topic: 'cold-water',
    question: 'In a home with variable pressure, what solution provides consistent cold water flow?',
    options: ['Extra stop taps', 'Expansion tank', 'Pressure reducing valve', 'Break tank and pump'],
    correctAnswer: 'Break tank and pump',
    explanation: 'These maintain constant pressure regardless of mains fluctuations.'
  },
  {
    id: 'coldWaterQ43',
    topic: 'cold-water',
    question: 'A backflow protection device for a hose union tap is typically what type?',
    options: ['Double check valve', 'Gate valve', 'Non-return valve', 'Ball cock'],
    correctAnswer: 'Double check valve',
    explanation: 'Hose taps must be fitted with double check valves to prevent contamination.'
  },
  {
    id: 'coldWaterQ44',
    topic: 'cold-water',
    question: 'What type of fitting must be used where copper meets plastic pipe?',
    options: ['Compression or pushfit with insert', 'Soldered brass', 'Solvent weld', 'Threaded iron'],
    correctAnswer: 'Compression or pushfit with insert',
    explanation: 'Inserts keep the plastic pipe rigid for leak-free connections.'
  },
  {
    id: 'coldWaterQ45',
    topic: 'cold-water',
    question: 'Why should cold and hot water pipes not touch in pipe runs?',
    options: ['Aesthetic reasons', 'To allow movement', 'To prevent heat transfer', 'To stop freezing'],
    correctAnswer: 'To prevent heat transfer',
    explanation: 'Cold pipes should stay cold to prevent bacterial growth or condensation.'
  },
  {
    id: 'coldWaterQ46',
    topic: 'cold-water',
    question: 'Which document outlines the calculation method for pipe sizing in cold water services?',
    options: ['BS 8558', 'BS 7671', 'WRAS Guide', 'Part H of Building Regs'],
    correctAnswer: 'BS 8558',
    explanation: 'BS 8558 gives guidance on design, installation, testing, and maintenance of services including pipe sizing.'
  },
  {
    id: 'coldWaterQ47',
    topic: 'cold-water',
    question: 'What is the maximum velocity recommended in cold water pipework to reduce noise and erosion?',
    options: ['3 m/s', '2 m/s', '4.5 m/s', '1 m/s'],
    correctAnswer: '3 m/s',
    explanation: 'To prevent pipe erosion and water hammer, cold water flow velocity is typically limited to 3 m/s.'
  },
  {
    id: 'coldWaterQ48',
    topic: 'cold-water',
    question: 'Which control method ensures that cold water storage tanks in high-rise buildings do not overflow under variable demand?',
    options: ['Ball valve only', 'Float switch linked to pump', 'Pressure-reducing valve', 'Overflow standpipe'],
    correctAnswer: 'Float switch linked to pump',
    explanation: 'Float switches integrated with booster pumps ensure demand-based refilling and prevent overflow.'
  },
  {
    id: 'coldWaterQ49',
    topic: 'cold-water',
    question: 'When designing a cold water riser in a multi-storey building, what is the primary reason for using a break tank and booster set?',
    options: ['To comply with WRAS', 'To avoid airlocks', 'To manage pressure zones and prevent overpressurisation', 'To eliminate backflow risk'],
    correctAnswer: 'To manage pressure zones and prevent overpressurisation',
    explanation: 'Break tanks allow zoned distribution systems in high-rise buildings where mains pressure is insufficient or over-pressurised.'
  },
  {
    id: 'coldWaterQ50',
    topic: 'cold-water',
    question: 'What is the function of a Type BA device in cold water backflow protection?',
    options: ['Double check valve', 'Air break unit', 'Reduced pressure zone valve', 'Hose bibb vacuum breaker'],
    correctAnswer: 'Reduced pressure zone valve',
    explanation: 'A Type BA device is a reduced pressure zone valve used to protect against high-risk (Fluid Category 4) contamination in potable water systems.'
  },

];

async function upload() {
  for (const q of coldWaterQuestions) {
    try {
        await setDoc(doc(db, 'questions', q.id), q);
      console.log(`✅ Uploaded: ${q.id}`);
    } catch (err) {
      console.error(`❌ Error uploading ${q.id}:`, err);
    }
  }
}

upload();
