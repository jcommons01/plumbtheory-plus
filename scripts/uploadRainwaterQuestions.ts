// scripts/uploadRainwaterQuestions.ts
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

const rainwaterQuestions = [
  {
    id: 'rainwaterQ1',
    topic: 'rainwater',
    question: 'What is the minimum recommended gradient for a horizontal rainwater pipe run?',
    options: ['1:80', '1:40', '1:100', '1:20'],
    correctAnswer: '1:80',
    explanation: 'A 1:80 gradient ensures self-cleansing velocity in rainwater systems.'
  },
  {
    id: 'rainwaterQ2',
    topic: 'rainwater',
    question: 'Which material is most commonly used for domestic above-ground rainwater pipework in the UK?',
    options: ['Cast iron', 'PVCu', 'Copper', 'Stainless steel'],
    correctAnswer: 'PVCu',
    explanation: 'PVCu is lightweight, corrosion-resistant and cost-effective for domestic use.'
  },
  {
    id: 'rainwaterQ3',
    topic: 'rainwater',
    question: 'What is the primary purpose of a rainwater downpipe?',
    options: ['To store stormwater', 'To discharge foul water', 'To collect debris from gutters', 'To convey water from gutter to drain'],
    correctAnswer: 'To convey water from gutter to drain',
    explanation: 'Downpipes channel roof water to the drainage system.'
  },
  {
    id: 'rainwaterQ4',
    topic: 'rainwater',
    question: 'Which of the following must be included at the base of a rainwater downpipe?',
    options: ['Drain cock', 'Access panel', 'Shoes or back inlet gully', 'Stop valve'],
    correctAnswer: 'Shoes or back inlet gully',
    explanation: 'These guide water safely into the underground drainage.'
  },
  {
    id: 'rainwaterQ5',
    topic: 'rainwater',
    question: 'What British Standard covers rainwater drainage design?',
    options: ['BS EN 12056', 'BS 7671', 'BS 8558', 'BS 806'],
    correctAnswer: 'BS EN 12056',
    explanation: 'BS EN 12056 governs gravity drainage systems including roof drainage.'
  },
  {
    id: 'rainwaterQ6',
    topic: 'rainwater',
    question: 'Which regulation requires rainwater to be discharged without causing nuisance?',
    options: ['Part G', 'Part H of Building Regulations', 'Part L', 'WRAS guidelines'],
    correctAnswer: 'Part H of Building Regulations',
    explanation: 'Part H covers disposal of rainwater and its impact on buildings and environment.'
  },
  {
    id: 'rainwaterQ7',
    topic: 'rainwater',
    question: 'What is the usual pipe diameter for a domestic rainwater downpipe?',
    options: ['25mm', '50mm', '68mm', '100mm'],
    correctAnswer: '68mm',
    explanation: '68mm is standard for most UK domestic installations.'
  },
  {
    id: 'rainwaterQ8',
    topic: 'rainwater',
    question: 'What should be fitted to a gutter to reduce blockage risk from leaves?',
    options: ['Drain cock', 'Mesh guard', 'Pressure valve', 'Stop end'],
    correctAnswer: 'Mesh guard',
    explanation: 'Mesh guards help prevent leaves and debris from clogging the gutter.'
  },
  {
    id: 'rainwaterQ9',
    topic: 'rainwater',
    question: 'How should rainwater be discharged when soakaways are not suitable?',
    options: ['Into the foul water drain', 'Onto the lawn', 'Into a water butt', 'To a surface water sewer'],
    correctAnswer: 'To a surface water sewer',
    explanation: 'Rainwater should ideally be diverted to a surface water sewer if soakaways aren’t feasible.'
  },
  {
    id: 'rainwaterQ10',
    topic: 'rainwater',
    question: 'What is the minimum distance a soakaway must be from a building?',
    options: ['2 metres', '3 metres', '1 metre', '5 metres'],
    correctAnswer: '5 metres',
    explanation: 'Building regulations recommend a soakaway be at least 5 metres away from structures.'
  },
  {
    id: 'rainwaterQ11',
    topic: 'rainwater',
    question: 'Which type of joint is typically used on PVCu rainwater systems?',
    options: ['Threaded', 'Push-fit with rubber seal', 'Welded', 'Compression'],
    correctAnswer: 'Push-fit with rubber seal',
    explanation: 'Push-fit joints with rubber seals are common in domestic rainwater systems for flexibility and ease.'
  },
  {
    id: 'rainwaterQ12',
    topic: 'rainwater',
    question: 'What is the main risk of undersized gutters?',
    options: ['Overheating', 'Water ingress and overflow', 'High maintenance costs', 'Reduced ventilation'],
    correctAnswer: 'Water ingress and overflow',
    explanation: 'Undersized gutters can’t handle peak flow, causing overflow and possible damage.'
  },
  {
    id: 'rainwaterQ13',
    topic: 'rainwater',
    question: 'When is a hopper head used in rainwater systems?',
    options: ['At the top of every downpipe', 'To collect water from multiple gutters', 'To prevent freezing', 'To store rainwater temporarily'],
    correctAnswer: 'To collect water from multiple gutters',
    explanation: 'Hopper heads allow two or more pipe runs to converge before entering a downpipe.'
  },
  {
    id: 'rainwaterQ14',
    topic: 'rainwater',
    question: 'What device allows for rainwater to be stored and reused domestically?',
    options: ['Gully trap', 'Rainwater diverter', 'Pressure reducing valve', 'Rodding eye'],
    correctAnswer: 'Rainwater diverter',
    explanation: 'Rainwater diverters route water from downpipes to storage systems like water butts.'
  },
  {
    id: 'rainwaterQ15',
    topic: 'rainwater',
    question: 'What factor most affects the size of a domestic gutter system?',
    options: ['Pipe insulation', 'Roof pitch and area', 'Soil conditions', 'Window placement'],
    correctAnswer: 'Roof pitch and area',
    explanation: 'The greater the roof surface and pitch, the more rainwater runoff the gutter must handle.'
  },
  {
    id: 'rainwaterQ16',
    topic: 'rainwater',
    question: 'What is the main cause of water hammer in a rainwater system?',
    options: ['Air trapped in pipes', 'Blocked gutter', 'Loose brackets', 'Sudden valve closure'],
    correctAnswer: 'Sudden valve closure',
    explanation: 'Water hammer is caused by the sudden stopping of water flow, creating pressure surges.'
  },
  {
    id: 'rainwaterQ17',
    topic: 'rainwater',
    question: 'How should downpipes be fixed to walls?',
    options: ['Only at the top', 'Using nails', 'Secure clips spaced appropriately', 'With plastic ties'],
    correctAnswer: 'Secure clips spaced appropriately',
    explanation: 'Clips should be installed at regular intervals to ensure stability and compliance.'
  },
  {
    id: 'rainwaterQ18',
    topic: 'rainwater',
    question: 'Why must rainwater drainage be separate from foul drainage?',
    options: ['To reduce treatment load', 'To increase water pressure', 'To boost flow rate', 'To heat rainwater'],
    correctAnswer: 'To reduce treatment load',
    explanation: 'Rainwater doesn’t require treatment, so separating it from foul water reduces wastewater processing.'
  },
  {
    id: 'rainwaterQ19',
    topic: 'rainwater',
    question: 'What is a key maintenance task for effective rainwater systems?',
    options: ['Painting pipes', 'Checking hot water flow', 'Clearing gutters and debris', 'Checking mains pressure'],
    correctAnswer: 'Clearing gutters and debris',
    explanation: 'Blocked gutters reduce efficiency and can cause water damage.'
  },
  {
    id: 'rainwaterQ20',
    topic: 'rainwater',
    question: 'What is the purpose of a rodding eye in rainwater systems?',
    options: ['Water storage', 'Visual inspection', 'Prevent overflow', 'Allow cleaning access'],
    correctAnswer: 'Allow cleaning access',
    explanation: 'Rodding eyes enable blockage removal with drain rods.'
  },
  {
    id: 'rainwaterQ21',
    topic: 'rainwater',
    question: 'Which part of the rainwater system is most susceptible to blockage?',
    options: ['Downpipe base', 'Gutter outlet', 'Soakaway', 'Underground drainage'],
    correctAnswer: 'Gutter outlet',
    explanation: 'Leaves and debris commonly collect at the outlet, obstructing flow.'
  },
  {
    id: 'rainwaterQ22',
    topic: 'rainwater',
    question: 'What is the recommended minimum depth for underground rainwater pipes?',
    options: ['100mm', '300mm', '600mm', '900mm'],
    correctAnswer: '600mm',
    explanation: '600mm is standard for frost protection and mechanical safety.'
  },
  {
    id: 'rainwaterQ23',
    topic: 'rainwater',
    question: 'What is the primary function of a gutter stop end?',
    options: ['Increase flow rate', 'Support pipe weight', 'Prevent water escape', 'Direct water to roof tiles'],
    correctAnswer: 'Prevent water escape',
    explanation: 'Stop ends close off the end of a gutter to retain water and direct flow properly.'
  },
  {
    id: 'rainwaterQ24',
    topic: 'rainwater',
    question: 'Why is expansion allowance necessary in rainwater pipework?',
    options: ['To prevent vibration', 'To stop UV damage', 'To allow movement due to temperature changes', 'To reduce water noise'],
    correctAnswer: 'To allow movement due to temperature changes',
    explanation: 'Materials like PVC expand with temperature, so movement must be allowed to avoid stress.'
  },
  {
    id: 'rainwaterQ25',
    topic: 'rainwater',
    question: 'What does a rainwater diverter do?',
    options: ['Redirects water to hot tank', 'Sends water to WC', 'Directs water into a soakaway', 'Channels rainwater to storage system'],
    correctAnswer: 'Channels rainwater to storage system',
    explanation: 'Diverters are used to collect rainwater for reuse in butts or tanks.'
  },
  {
    id: 'rainwaterQ26',
    topic: 'rainwater',
    question: 'Where should gutter outlets be located for best performance?',
    options: ['Centre of run', 'At low point or slope end', 'At high points', 'At every tile joint'],
    correctAnswer: 'At low point or slope end',
    explanation: 'Water naturally flows downhill, so outlets must be placed at the lowest point of a run.'
  },
  {
    id: 'rainwaterQ27',
    topic: 'rainwater',
    question: 'Which of the following is a benefit of using a soakaway?',
    options: ['Slows down water velocity', 'Disposes foul water', 'Reduces demand on sewers', 'Increases pressure in the system'],
    correctAnswer: 'Reduces demand on sewers',
    explanation: 'Soakaways allow water to drain naturally into the ground, easing the load on surface water sewers.'
  },
  {
    id: 'rainwaterQ28',
    topic: 'rainwater',
    question: 'Which material is not suitable for underground rainwater pipework?',
    options: ['Clay', 'PVC', 'Cast iron', 'Flexible MDPE'],
    correctAnswer: 'Flexible MDPE',
    explanation: 'MDPE is for water supply, not gravity drainage. Underground drainage uses rigid pipework.'
  },
  {
    id: 'rainwaterQ29',
    topic: 'rainwater',
    question: 'Why must backfall in guttering be avoided?',
    options: ['To avoid airlocks', 'To prevent water stagnation and overflow', 'To reduce pressure', 'To maintain insulation'],
    correctAnswer: 'To prevent water stagnation and overflow',
    explanation: 'Backfall causes water to collect instead of drain, leading to potential overflow.'
  },
  {
    id: 'rainwaterQ30',
    topic: 'rainwater',
    question: 'How is a rainwater gully typically protected from debris ingress?',
    options: ['Mesh screen or leaf guard', 'Ball valve', 'Tundish', 'Inspection cover'],
    correctAnswer: 'Mesh screen or leaf guard',
    explanation: 'Mesh or leaf guards prevent solid material from entering gullies and drains.'
  },
  {
    id: 'rainwaterQ31',
    topic: 'rainwater',
    question: 'What type of joint is commonly used in plastic rainwater systems?',
    options: ['Soldered joint', 'Compression fitting', 'Push-fit with rubber seal', 'Threaded fitting'],
    correctAnswer: 'Push-fit with rubber seal',
    explanation: 'Push-fit joints with rubber seals are common in plastic rainwater systems for easy installation and flexibility.'
  },
  {
    id: 'rainwaterQ32',
    topic: 'rainwater',
    question: 'What is the main risk of incorrectly sloped guttering?',
    options: ['Freezing', 'Excessive flow rate', 'Overflow and water damage', 'Backpressure'],
    correctAnswer: 'Overflow and water damage',
    explanation: 'Guttering without proper slope can trap water, causing overflow and potential damage.'
  },
  {
    id: 'rainwaterQ33',
    topic: 'rainwater',
    question: 'What Building Regulation primarily governs rainwater drainage in the UK?',
    options: ['Part P', 'Part G', 'Part H', 'Part L'],
    correctAnswer: 'Part H',
    explanation: 'Part H covers drainage and waste disposal, including rainwater systems.'
  },
  {
    id: 'rainwaterQ34',
    topic: 'rainwater',
    question: 'Which fitting is used to transition from a round downpipe to a square gutter outlet?',
    options: ['Reducer', 'Connector', 'Offset bend', 'Adapter'],
    correctAnswer: 'Adapter',
    explanation: 'Adapters connect different shapes or sizes of rainwater fittings.'
  },
  {
    id: 'rainwaterQ35',
    topic: 'rainwater',
    question: 'What is the purpose of a leaf guard in a rainwater system?',
    options: ['Reduce pipe pressure', 'Catch debris before entry to downpipe', 'Trap sediment', 'Reduce flow rate'],
    correctAnswer: 'Catch debris before entry to downpipe',
    explanation: 'Leaf guards prevent clogging by stopping leaves and debris entering the system.'
  },
  {
    id: 'rainwaterQ36',
    topic: 'rainwater',
    question: 'What gradient should guttering typically be installed at?',
    options: ['1:20', '1:100', '1:600', '1:200'],
    correctAnswer: '1:600',
    explanation: 'A fall of 1:600 allows water to drain properly without excessive slope.'
  },
  {
    id: 'rainwaterQ37',
    topic: 'rainwater',
    question: 'What is the function of a hopper head?',
    options: ['Increase water pressure', 'Connect multiple downpipes', 'Collect rainwater from several pipes', 'Discharge to soakaway'],
    correctAnswer: 'Collect rainwater from several pipes',
    explanation: 'Hopper heads receive water from gutter outlets or pipework above and feed it into a downpipe.'
  },
  {
    id: 'rainwaterQ38',
    topic: 'rainwater',
    question: 'How far should a rainwater downpipe discharge from a building if not connected to a drain?',
    options: ['2 metres', '150mm', '5 metres', '600mm'],
    correctAnswer: '600mm',
    explanation: 'To prevent water ingress or damage, downpipes must discharge away from the building’s foundations.'
  },
  {
    id: 'rainwaterQ39',
    topic: 'rainwater',
    question: 'What is one key consideration when using metal rainwater systems?',
    options: ['Electrical bonding', 'Condensation control', 'Chemical compatibility with paint', 'Lightning protection'],
    correctAnswer: 'Electrical bonding',
    explanation: 'Metal systems may require bonding to prevent electrical hazards and corrosion.'
  },
  {
    id: 'rainwaterQ40',
    topic: 'rainwater',
    question: 'How often should gutters and downpipes be inspected?',
    options: ['Annually', 'Every 10 years', 'Every 5 years', 'Only when leaking'],
    correctAnswer: 'Annually',
    explanation: 'Regular inspections, especially after autumn and winter, help maintain proper flow and avoid damage.'
  },
  {
    id: 'rainwaterQ41',
    topic: 'rainwater',
    question: 'What is a common issue when rainwater systems freeze in winter?',
    options: ['Gutter collapse', 'Pipe expansion', 'Joint melting', 'Water hammer'],
    correctAnswer: 'Gutter collapse',
    explanation: 'Water expands when frozen, potentially cracking pipes or collapsing supports.'
  },
  {
    id: 'rainwaterQ42',
    topic: 'rainwater',
    question: 'Which type of inspection fitting allows visual access to underground rainwater drainage?',
    options: ['Gully', 'Hopper head', 'Inspection chamber', 'Trap'],
    correctAnswer: 'Inspection chamber',
    explanation: 'These are used for access and maintenance of underground systems.'
  },
  {
    id: 'rainwaterQ43',
    topic: 'rainwater',
    question: 'What colour is most commonly used for residential PVC rainwater systems in the UK?',
    options: ['Black', 'White', 'Grey', 'Brown'],
    correctAnswer: 'Black',
    explanation: 'Black is the standard and widely used colour for residential systems.'
  },
  {
    id: 'rainwaterQ44',
    topic: 'rainwater',
    question: 'What is the best location for a rainwater butt connection?',
    options: ['From gutter directly', 'At bottom of drainpipe', 'Below the gully', 'Between roof tiles'],
    correctAnswer: 'At bottom of drainpipe',
    explanation: 'Butts are fed from diverters installed near the base of the downpipe.'
  },
  {
    id: 'rainwaterQ45',
    topic: 'rainwater',
    question: 'What is a key environmental benefit of rainwater harvesting?',
    options: ['Increases tap pressure', 'Boosts drain flow', 'Reduces mains water usage', 'Heats water using solar'],
    correctAnswer: 'Reduces mains water usage',
    explanation: 'Harvesting reduces reliance on treated mains supply for non-potable use.'
  },
  {
    id: 'rainwaterQ46',
    topic: 'rainwater',
    question: 'Which tool is most suitable for cutting PVC rainwater pipe?',
    options: ['Hacksaw', 'Pipe slicer', 'Reciprocating saw', 'Tubing cutter'],
    correctAnswer: 'Hacksaw',
    explanation: 'Hacksaws are commonly used to cut PVC rainwater pipework cleanly and easily.'
  },
  {
    id: 'rainwaterQ47',
    topic: 'rainwater',
    question: 'What does WRAS approval indicate for rainwater products?',
    options: ['Made in UK', 'Suitable for potable water', 'High pressure tested', 'UV resistant'],
    correctAnswer: 'Suitable for potable water',
    explanation: 'WRAS approval confirms compliance for use with drinking water systems.'
  },
  {
    id: 'rainwaterQ48',
    topic: 'rainwater',
    question: 'What is one main purpose of a rainwater system trap?',
    options: ['Increase pressure', 'Prevent odours escaping', 'Speed up flow', 'Raise outlet level'],
    correctAnswer: 'Prevent odours escaping',
    explanation: 'Traps retain water to seal against foul air entering the building.'
  },
  {
    id: 'rainwaterQ49',
    topic: 'rainwater',
    question: 'What is typically the first sign of a blocked gutter?',
    options: ['Low water pressure', 'Stained walls or fascia', 'Pipe vibration', 'Warm water flow'],
    correctAnswer: 'Stained walls or fascia',
    explanation: 'Water overflows and stains the wall/fascia boards due to gutter blockage.'
  },
  {
    id: 'rainwaterQ50',
    topic: 'rainwater',
    question: 'Why must rainwater pipes be supported at regular intervals?',
    options: ['Prevent electrical contact', 'Maintain thermal resistance', 'Avoid sagging and detachment', 'Support roof structure'],
    correctAnswer: 'Avoid sagging and detachment',
    explanation: 'Proper support ensures structural integrity and efficient flow in pipework.'
  }
];


async function upload() {
  const topicDocRef = doc(db, 'questions', 'rainwater');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() }); // Optional metadata

  for (const q of rainwaterQuestions) {
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
      const questionDocRef = doc(db, 'questions', 'rainwater', 'items', q.id);
      await setDoc(questionDocRef, q);
      console.log(`✅ Uploaded question: ${q.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${q.id}:`, err);
    }
  }
}

upload();
