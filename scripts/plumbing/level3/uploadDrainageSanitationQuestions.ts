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

// ⚠️ Replace this with however many questions you want to upload
const drainageSanitationQuestions = [
  {
    id: 'drainageSanitationQ1',
    topic: 'drainage-sanitation',
    question: 'What is the minimum gradient required for a 100mm foul water drainage pipe under Building Regulations?',
    options: ['1:10', '1:40', '1:80', '1:100'],
    correctAnswer: '1:40',
    explanation: 'A 1:40 fall ensures self-cleansing flow in 100mm horizontal drainage pipes.'
  },
  {
    id: 'drainageSanitationQ2',
    topic: 'drainage-sanitation',
    question: 'What is the maximum distance a 32mm waste pipe can run without additional venting?',
    options: ['1.0m', '1.7m', '2.5m', '3.0m'],
    correctAnswer: '1.7m',
    explanation: '32mm pipes should not exceed 1.7m in length without supplementary ventilation.'
  },
  {
    id: 'drainageSanitationQ3',
    topic: 'drainage-sanitation',
    question: 'Which part of the Building Regulations covers sanitation, hot water safety, and water efficiency?',
    options: ['Part G', 'Part H', 'Part L', 'Part E'],
    correctAnswer: 'Part G',
    explanation: 'Part G addresses hygiene, including sanitation systems and hot water safety.'
  },
  {
    id: 'drainageSanitationQ4',
    topic: 'drainage-sanitation',
    question: 'What is the purpose of a rodding eye in a drainage system?',
    options: ['Pressure reduction', 'Odour control', 'Pipe connection', 'Access for cleaning and maintenance'],
    correctAnswer: 'Access for cleaning and maintenance',
    explanation: 'Rodding eyes allow access to clear blockages without dismantling the system.'
  },
  {
    id: 'drainageSanitationQ5',
    topic: 'drainage-sanitation',
    question: 'Which type of trap retains the largest water seal to prevent foul air from entering the building?',
    options: ['Bottle trap', 'P-trap', 'S-trap', 'Floor gully trap'],
    correctAnswer: 'Floor gully trap',
    explanation: 'Floor gullies often have deep traps with seals of 75mm or more for protection.'
  },
  {
    id: 'drainageSanitationQ6',
    topic: 'drainage-sanitation',
    question: 'Why are air admittance valves (AAVs) used in internal soil stacks?',
    options: ['Control backpressure', 'Prevent freezing', 'Allow venting without external pipework', 'Increase water flow'],
    correctAnswer: 'Allow venting without external pipework',
    explanation: 'AAVs allow air into the system to prevent trap siphonage while avoiding roof penetrations.'
  },
  {
    id: 'drainageSanitationQ7',
    topic: 'drainage-sanitation',
    question: 'Which document provides guidance on the correct installation of domestic drainage systems?',
    options: ['Approved Document F', 'Approved Document G', 'Approved Document H', 'Water Supply Regulations 1999'],
    correctAnswer: 'Approved Document H',
    explanation: 'Part H covers drainage and waste disposal, including pipe sizing and gradients.'
  },
  {
    id: 'drainageSanitationQ8',
    topic: 'drainage-sanitation',
    question: 'Which material is commonly used for underground foul water drainage systems?',
    options: ['Copper', 'Cast iron', 'PVCu', 'Galvanised steel'],
    correctAnswer: 'PVCu',
    explanation: 'PVCu (unplasticised PVC) is lightweight, cost-effective, and resistant to corrosion.'
  },
  {
    id: 'drainageSanitationQ9',
    topic: 'drainage-sanitation',
    question: 'What is the purpose of a trap seal in waste and drainage systems?',
    options: ['Increase water flow', 'Balance air pressure', 'Prevent rodent ingress', 'Prevent foul air re-entering property'],
    correctAnswer: 'Prevent foul air re-entering property',
    explanation: 'Trap seals block sewer gases from entering the building.'
  },
  {
    id: 'drainageSanitationQ10',
    topic: 'drainage-sanitation',
    question: 'What is the standard minimum water seal depth for a domestic appliance trap?',
    options: ['25mm', '32mm', '50mm', '75mm'],
    correctAnswer: '50mm',
    explanation: '50mm is the minimum required seal depth for traps serving sinks, basins, and appliances.'
  },
  {
    id: 'drainageSanitationQ11',
    topic: 'drainage-sanitation',
    question: 'What is the main function of a vent pipe in a drainage system?',
    options: ['Increase water flow', 'Allow sewer gases to escape', 'Filter waste water', 'Connect to greywater system'],
    correctAnswer: 'Allow sewer gases to escape',
    explanation: 'Vent pipes release gases and maintain air pressure to prevent siphoning.'
  },
  {
    id: 'drainageSanitationQ12',
    topic: 'drainage-sanitation',
    question: 'What does a "trap weir" refer to?',
    options: ['Overflow edge of the trap', 'The outlet of the soil pipe', 'The base of the trap', 'The inspection point in the trap'],
    correctAnswer: 'Overflow edge of the trap',
    explanation: 'The trap weir is the highest point of water in a trap, critical in preventing loss of seal.'
  },
  {
    id: 'drainageSanitationQ13',
    topic: 'drainage-sanitation',
    question: 'What is the usual cause of a gurgling sound when a sink or bath drains?',
    options: ['Incorrect pipe slope', 'Blocked overflow', 'Trap seal loss due to negative pressure', 'Loose pipe fittings'],
    correctAnswer: 'Trap seal loss due to negative pressure',
    explanation: 'Gurgling indicates air being pulled through a trap, often due to inadequate venting.'
  },
  {
    id: 'drainageSanitationQ14',
    topic: 'drainage-sanitation',
    question: 'What is the primary cause of smells from a floor drain?',
    options: ['Pipe too short', 'Incorrect water temperature', 'Evaporated water seal', 'Too much flow'],
    correctAnswer: 'Evaporated water seal',
    explanation: 'If the trap dries out, foul air can rise through the drain.'
  },
  {
    id: 'drainageSanitationQ15',
    topic: 'drainage-sanitation',
    question: 'What minimum clearance should be left around a rodding eye for access?',
    options: ['75mm', '100mm', '150mm', '300mm'],
    correctAnswer: '300mm',
    explanation: 'A minimum of 300mm is required for effective rodding access and clearance.'
  },
  {
    id: 'drainageSanitationQ16',
    topic: 'drainage-sanitation',
    question: 'Which type of waste system combines water from sinks, baths, and appliances?',
    options: ['Foul drainage', 'Surface water drainage', 'Combined waste system', 'Separate greywater system'],
    correctAnswer: 'Combined waste system',
    explanation: 'A combined waste system merges greywater from multiple sources into a single pipe.'
  },
  {
    id: 'drainageSanitationQ17',
    topic: 'drainage-sanitation',
    question: 'What should be done if a soil pipe runs within 900mm of an opening window?',
    options: ['Fit an AAV', 'Install a sealant', 'Move the window', 'Insulate the pipe'],
    correctAnswer: 'Extend vent above window head',
    explanation: 'Soil vents within 900mm of an opening window must terminate at least 900mm above the opening, per Building Regs Part H.'
  },
  {
    id: 'drainageSanitationQ18',
    topic: 'drainage-sanitation',
    question: 'What does "self-cleansing velocity" mean in drainage design?',
    options: ['The rate of water treatment', 'The flow speed that removes solids from pipe walls', 'The angle of pipe installation', 'The speed of pipe blockage'],
    correctAnswer: 'The flow speed that removes solids from pipe walls',
    explanation: 'Achieving self-cleansing velocity prevents sediment accumulation and blockages.'
  },
  {
    id: 'drainageSanitationQ19',
    topic: 'drainage-sanitation',
    question: 'Which tool is best for clearing a blocked soil stack?',
    options: ['Auger', 'Jet wash', 'Rodding tool', 'Chemical cleaner'],
    correctAnswer: 'Rodding tool',
    explanation: 'Rodding allows manual removal of blockages from access points such as rodding eyes.'
  },
  {
    id: 'drainageSanitationQ20',
    topic: 'drainage-sanitation',
    question: 'What is the minimum gradient for a 40mm waste pipe under Building Regulations?',
    options: ['1:80', '1:60', '1:40', '1:20'],
    correctAnswer: '1:40',
    explanation: 'This gradient ensures flow velocity is sufficient for self-cleansing without causing siphonage.'
  },
  {
    id: 'drainageSanitationQ21',
    topic: 'drainage-sanitation',
    question: 'Which material is most resistant to chemical erosion in drainage systems?',
    options: ['Cast iron', 'Clay', 'Lead', 'uPVC'],
    correctAnswer: 'uPVC',
    explanation: 'uPVC is corrosion-resistant and highly durable under chemical exposure.'
  },
  {
    id: 'drainageSanitationQ22',
    topic: 'drainage-sanitation',
    question: 'What device prevents sewer gases from escaping through an overflow or appliance?',
    options: ['Stopcock', 'Trap', 'Vent pipe', 'Drain cock'],
    correctAnswer: 'Trap',
    explanation: 'Traps retain a water seal that acts as a barrier against foul gases.'
  },
  {
    id: 'drainageSanitationQ23',
    topic: 'drainage-sanitation',
    question: 'What is the main reason for installing a gully trap externally?',
    options: ['To prevent backflow', 'To collect rainwater', 'To trap debris before entering drainage', 'To vent the system'],
    correctAnswer: 'To trap debris before entering drainage',
    explanation: 'Gully traps collect waste water and filter solids to protect below-ground pipework.'
  },
  {
    id: 'drainageSanitationQ24',
    topic: 'drainage-sanitation',
    question: 'What’s the maximum length for a 40mm waste pipe before additional ventilation is needed?',
    options: ['2m', '3m', '4m', '5m'],
    correctAnswer: '3m',
    explanation: 'According to Approved Doc H, 40mm pipework should not exceed 3m without extra venting.'
  },
  {
    id: 'drainageSanitationQ25',
    topic: 'drainage-sanitation',
    question: 'What is the required depth of cover for private foul drainage pipes in gardens or pathways?',
    options: ['150mm', '300mm', '450mm', '600mm'],
    correctAnswer: '450mm',
    explanation: 'Pipes in domestic gardens and paths must have a minimum 450mm cover to avoid damage.'
  },
  {
    id: 'drainageSanitationQ26',
    topic: 'drainage-sanitation',
    question: 'Which fitting is used to connect a WC to a soil pipe?',
    options: ['Compression waste fitting', 'Flexible tap connector', 'Pan connector', 'Boss adaptor'],
    correctAnswer: 'Pan connector',
    explanation: 'A pan connector joins the WC spigot to the soil pipe using a push-fit or flexible seal.'
  },
  {
    id: 'drainageSanitationQ27',
    topic: 'drainage-sanitation',
    question: 'What is the risk of an undersized branch waste pipe?',
    options: ['Reduced pressure', 'Air admittance failure', 'Blockages and slow drainage', 'Increased noise only'],
    correctAnswer: 'Blockages and slow drainage',
    explanation: 'Too small a pipe restricts flow and leads to frequent clogs.'
  },
  {
    id: 'drainageSanitationQ28',
    topic: 'drainage-sanitation',
    question: 'What purpose does a back-inlet gully serve?',
    options: ['Acts as an access point for rodding', 'Prevents water hammer', 'Connects stormwater from roof drainage', 'Prevents backflow and includes a trap'],
    correctAnswer: 'Prevents backflow and includes a trap',
    explanation: 'Back-inlet gullies protect internal pipework and maintain a water seal.'
  },
  {
    id: 'drainageSanitationQ29',
    topic: 'drainage-sanitation',
    question: 'Which regulation covers the sizing of internal drainage and waste systems?',
    options: ['WRAS Guidelines', 'Part G', 'BS EN 12056', 'BS 1710'],
    correctAnswer: 'BS EN 12056',
    explanation: 'BS EN 12056 outlines principles for gravity drainage inside buildings.'
  },
  {
    id: 'drainageSanitationQ30',
    topic: 'drainage-sanitation',
    question: 'What component in a gully prevents vermin ingress?',
    options: ['Rodding eye', 'Grating', 'Vent terminal', 'Interceptor trap'],
    correctAnswer: 'Grating',
    explanation: 'A grating stops large objects and vermin from entering the drainage system.'
  },
  {
    id: 'drainageSanitationQ31',
    topic: 'drainage-sanitation',
    question: 'Which pipe system allows both wastewater and surface water into a shared pipe?',
    options: ['Separate drainage system', 'Combined system', 'Open system', 'Ventilated system'],
    correctAnswer: 'Combined system',
    explanation: 'A combined system transports foul and stormwater together, common in older networks.'
  },
  {
    id: 'drainageSanitationQ32',
    topic: 'drainage-sanitation',
    question: 'Which tool is used to pressure test a new drainage installation?',
    options: ['Bore gauge', 'Test plug and U-gauge manometer', 'Flow restrictor', 'Vernier calliper'],
    correctAnswer: 'Test plug and U-gauge manometer',
    explanation: 'This setup tests the pipe for pressure loss over time, indicating leaks.'
  },
  {
    id: 'drainageSanitationQ33',
    topic: 'drainage-sanitation',
    question: 'What should be the minimum water seal depth on a bath trap?',
    options: ['25mm', '32mm', '50mm', '75mm'],
    correctAnswer: '50mm',
    explanation: 'Bath traps must retain a 50mm seal to block foul odours.'
  },
  {
    id: 'drainageSanitationQ34',
    topic: 'drainage-sanitation',
    question: 'What is the danger zone distance when connecting a WC to a soil stack?',
    options: ['150mm', '200mm', '250mm', '300mm'],
    correctAnswer: '200mm',
    explanation: 'To avoid crossflow and preserve trap seals, other branch connections should be at least 200mm from the WC connection.'
  },
  {
    id: 'drainageSanitationQ35',
    topic: 'drainage-sanitation',
    question: 'Why should long waste pipe runs avoid sharp bends?',
    options: ['To save cost on fittings', 'To speed up installation', 'To prevent airlocks and blockages', 'To improve insulation'],
    correctAnswer: 'To prevent airlocks and blockages',
    explanation: 'Gentle bends maintain smooth water flow and reduce the risk of blockage.'
  },
  {
    id: 'drainageSanitationQ36',
    topic: 'drainage-sanitation',
    question: 'What type of system uses vacuum pressure to transport waste water?',
    options: ['Pneumatic drainage', 'Siphonic system', 'Gravity-fed drainage', 'Vacuum drainage'],
    correctAnswer: 'Vacuum drainage',
    explanation: 'Vacuum systems use negative pressure to move waste, ideal for complex layouts.'
  },
  {
    id: 'drainageSanitationQ37',
    topic: 'drainage-sanitation',
    question: 'Why are combined sewer systems discouraged in new installations?',
    options: ['They cost more to install', 'They require thicker pipes', 'They increase flood and pollution risks', 'They require fewer vents'],
    correctAnswer: 'They increase flood and pollution risks',
    explanation: 'Combined systems can overload treatment plants and cause environmental harm during storms.'
  },
  {
    id: 'drainageSanitationQ38',
    topic: 'drainage-sanitation',
    question: 'Which device prevents a foul smell when a waste pipe is rarely used?',
    options: ['Condensate trap', 'Heated coil', 'Air admittance valve', 'Waterless trap with seal'],
    correctAnswer: 'Waterless trap with seal',
    explanation: 'Waterless traps use one-way valves or membranes to block odours in dry conditions.'
  },
  {
    id: 'drainageSanitationQ39',
    topic: 'drainage-sanitation',
    question: 'What’s the purpose of a stub stack?',
    options: ['Carry surface water', 'Replace full-height soil vent pipes', 'Act as overflow', 'Test drain gradient'],
    correctAnswer: 'Replace full-height soil vent pipes',
    explanation: 'Stub stacks serve as short stacks with AAVs where a full stack isn’t practical.'
  },
  {
    id: 'drainageSanitationQ40',
    topic: 'drainage-sanitation',
    question: 'How far should a gully be placed from the building wall?',
    options: ['Not less than 75mm', 'Minimum 150mm', 'Exactly 100mm', 'At least 250mm'],
    correctAnswer: 'Minimum 150mm',
    explanation: 'Gullies should be spaced at least 150mm from walls to avoid water ingress.'
  },
  {
    id: 'drainageSanitationQ41',
    topic: 'drainage-sanitation',
    question: 'What’s the recommended minimum fall for a horizontal soil pipe?',
    options: ['1:10', '1:20', '1:40', '1:80'],
    correctAnswer: '1:40',
    explanation: 'A 1:40 gradient provides sufficient flow for solids and liquids in soil pipes.'
  },
  {
    id: 'drainageSanitationQ42',
    topic: 'drainage-sanitation',
    question: 'What type of drainage system is used for large commercial buildings with flat roofs?',
    options: ['Ventilated drainage', 'Vacuum drainage', 'Siphonic drainage', 'Separate waste system'],
    correctAnswer: 'Siphonic drainage',
    explanation: 'Siphonic systems provide high-capacity drainage without large pipes or gradients.'
  },
  {
    id: 'drainageSanitationQ43',
    topic: 'drainage-sanitation',
    question: 'What is the minimum cover for foul water drainage pipes under driveways?',
    options: ['450mm', '600mm', '750mm', '900mm'],
    correctAnswer: '600mm',
    explanation: 'To protect from vehicle loads, pipes must be buried at least 600mm deep.'
  },
  {
    id: 'drainageSanitationQ44',
    topic: 'drainage-sanitation',
    question: 'Which symbol on drainage plans indicates a rodding eye?',
    options: ['RE', 'V', 'IC', 'TR'],
    correctAnswer: 'RE',
    explanation: 'RE is used to label a rodding eye on architectural and plumbing plans.'
  },
  {
    id: 'drainageSanitationQ45',
    topic: 'drainage-sanitation',
    question: 'What causes the siphonage of a trap?',
    options: ['Positive pressure', 'Slow water flow', 'Sudden vacuum in pipework', 'Incorrect pipe insulation'],
    correctAnswer: 'Sudden vacuum in pipework',
    explanation: 'Negative pressure pulls water from traps, breaking the seal.'
  },
  {
    id: 'drainageSanitationQ46',
    topic: 'drainage-sanitation',
    question: 'Which system separates foul and surface water at the source?',
    options: ['Ventilated system', 'Combined drainage', 'Separate drainage', 'Backfall system'],
    correctAnswer: 'Separate drainage',
    explanation: 'Separate drainage reduces treatment loads by isolating clean rainwater from foul waste.'
  },
  {
    id: 'drainageSanitationQ47',
    topic: 'drainage-sanitation',
    question: 'What component can be fitted to a gully to prevent rodent access?',
    options: ['Anti-flood flap', 'Rodent barrier grid', 'Waterless trap', 'Sealed lid'],
    correctAnswer: 'Rodent barrier grid',
    explanation: 'These grids are installed in gullies or terminals to stop vermin entry.'
  },
  {
    id: 'drainageSanitationQ48',
    topic: 'drainage-sanitation',
    question: 'Which part of the drainage system allows pressure equalisation?',
    options: ['Soil pipe', 'Trap', 'Air admittance valve', 'Waste branch'],
    correctAnswer: 'Air admittance valve',
    explanation: 'AAVs open to admit air during negative pressure, stabilising trap seals.'
  },
  {
    id: 'drainageSanitationQ49',
    topic: 'drainage-sanitation',
    question: 'Which of the following best describes the term "hydraulic jump"?',
    options: ['Sudden water flow increase at a trap', 'Rapid pressure drop', 'Abrupt rise in water level in partially full pipe', 'Water hammer effect'],
    correctAnswer: 'Abrupt rise in water level in partially full pipe',
    explanation: 'Hydraulic jumps occur where flow changes from fast and shallow to slow and deep.'
  },
  {
    id: 'drainageSanitationQ50',
    topic: 'drainage-sanitation',
    question: 'What is the purpose of a grease trap in commercial kitchens?',
    options: ['Prevent rodents', 'Prevent trap siphonage', 'Separate fats and oils from wastewater', 'Dilute chemicals'],
    correctAnswer: 'Separate fats and oils from wastewater',
    explanation: 'Grease traps prevent blockages in sewers by collecting FOG (fats, oils, and grease).'
  }
];


async function upload() {
  const topicDocRef = doc(db, 'questions', 'drainage-sanitation');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() }); // Optional metadata

  for (const q of drainageSanitationQuestions) {
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
      const questionDocRef = doc(db, 'questions', 'drainage-sanitation', 'items', q.id);
      await setDoc(questionDocRef, q);
      console.log(`✅ Uploaded question: ${q.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${q.id}:`, err);
    }
  }
}

upload();

