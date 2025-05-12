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

const electricalQuestions = [
  {
    id: 'electricalQ1',
    topic: 'electrical',
    question: 'What colour is the earth wire in modern UK electrical systems?',
    options: ['Green and yellow', 'Blue', 'Brown', 'Black'],
    correctAnswer: 'Green and yellow',
    explanation: 'In the UK, the earth wire is coloured green and yellow for identification and safety.'
  },
  {
    id: 'electricalQ2',
    topic: 'electrical',
    question: 'Which regulation covers electrical safety in plumbing installations?',
    options: ['Part P of Building Regulations', 'Part G', 'Part L', 'Part M'],
    correctAnswer: 'Part P of Building Regulations',
    explanation: 'Part P ensures electrical installations in homes are safe and fit for use.'
  },
  {
    id: 'electricalQ3',
    topic: 'electrical',
    question: 'What is the purpose of bonding in plumbing systems?',
    options: ['To prevent electrocution', 'To improve flow rate', 'To reduce corrosion', 'To increase resistance'],
    correctAnswer: 'To prevent electrocution',
    explanation: 'Bonding ensures all metal pipework is at the same electrical potential, reducing shock risk.'
  },
  {
    id: 'electricalQ4',
    topic: 'electrical',
    question: 'What voltage is the UK domestic electricity supply?',
    options: ['230V', '110V', '400V', '12V'],
    correctAnswer: '230V',
    explanation: 'Standard domestic voltage in the UK is 230 volts AC.'
  },
  {
    id: 'electricalQ5',
    topic: 'electrical',
    question: 'Which device quickly disconnects electricity if a fault occurs to earth?',
    options: ['RCD', 'MCB', 'Fuse', 'Transformer'],
    correctAnswer: 'RCD',
    explanation: 'A Residual Current Device (RCD) protects against electric shock by breaking the circuit during earth faults.'
  },
  {
    id: 'electricalQ6',
    topic: 'electrical',
    question: 'What colour is the live wire in UK wiring?',
    options: ['Brown', 'Green and yellow', 'Blue', 'Grey'],
    correctAnswer: 'Brown',
    explanation: 'Brown is the live wire in single-phase UK installations.'
  },
  {
    id: 'electricalQ7',
    topic: 'electrical',
    question: 'Why should metal pipework be earthed in domestic systems?',
    options: ['To ensure safety', 'To improve aesthetics', 'To prevent freezing', 'To increase pressure'],
    correctAnswer: 'To ensure safety',
    explanation: 'Earthing prevents dangerous voltages building up on exposed metal parts.'
  },
  {
    id: 'electricalQ8',
    topic: 'electrical',
    question: 'Which of these is a legal requirement before electrical work in bathrooms?',
    options: ['Compliance with Part P', 'Use of armoured cable', 'Consulting Gas Safe', 'Painting wires'],
    correctAnswer: 'Compliance with Part P',
    explanation: 'Part P ensures any electrical work in bathrooms is safe and certified.'
  },
  {
    id: 'electricalQ9',
    topic: 'electrical',
    question: 'What is the main hazard of installing electric showers incorrectly?',
    options: ['Electric shock', 'Overheating pipes', 'Clogging', 'High water pressure'],
    correctAnswer: 'Electric shock',
    explanation: 'Improper installation of electric showers can result in electrocution.'
  },
  {
    id: 'electricalQ10',
    topic: 'electrical',
    question: 'What type of wiring should be used in high moisture areas like bathrooms?',
    options: ['Low voltage cabling', 'PVC twin and earth', 'Armoured cable', 'Specialist moisture-rated fittings'],
    correctAnswer: 'Specialist moisture-rated fittings',
    explanation: 'Moisture-rated electrical fittings are designed for safe use in damp conditions.'
  },
  {
    id: 'electricalQ11',
    topic: 'electrical',
    question: 'What tool is used to safely check for voltage presence before working on a system?',
    options: ['Voltage tester', 'Multimeter', 'RCD', 'Fuse box'],
    correctAnswer: 'Voltage tester',
    explanation: 'A voltage tester confirms that circuits are isolated before work begins.'
  },
  {
    id: 'electricalQ12',
    topic: 'electrical',
    question: 'Which of these is a safe location to place a pull cord switch for a bathroom?',
    options: ['Ceiling mounted', 'Wall beside the basin', 'Behind the door', 'Inside the shower enclosure'],
    correctAnswer: 'Ceiling mounted',
    explanation: 'Ceiling-mounted pull cords are safer in wet environments like bathrooms.'
  },
  {
    id: 'electricalQ13',
    topic: 'electrical',
    question: 'Which regulation limits electrical socket placement near water sources?',
    options: ['IEE Wiring Regulations', 'Gas Safety Regulations', 'WRAS Standards', 'BS 6700'],
    correctAnswer: 'IEE Wiring Regulations',
    explanation: 'IEE Wiring Regulations (BS 7671) control socket locations near water to reduce shock risk.'
  },
  {
    id: 'electricalQ14',
    topic: 'electrical',
    question: 'Why must all circuits be isolated before working on them?',
    options: ['To prevent electric shock', 'To avoid pipe pressure loss', 'To allow insulation', 'To prevent gas leaks'],
    correctAnswer: 'To prevent electric shock',
    explanation: 'Isolating ensures that the circuit is not live, protecting the person doing the work.'
  },
  {
    id: 'electricalQ15',
    topic: 'electrical',
    question: 'What rating of RCD is typically used for domestic installations?',
    options: ['30mA', '100mA', '300mA', '10mA'],
    correctAnswer: '30mA',
    explanation: '30mA is the standard sensitivity for RCDs in domestic dwellings to protect against electric shock.'
  },
  {
    id: 'electricalQ16',
    topic: 'electrical',
    question: 'What IP rating is required for electrical accessories installed in Zone 1 of a bathroom?',
    options: ['IP20', 'IP44', 'IP65', 'IP67'],
    correctAnswer: 'IP44',
    explanation: 'IPX4 = splash-proof. IP44 meets this and is commonly accepted for Zone 1 in bathrooms.'
  },
  {
    id: 'electricalQ17',
    topic: 'electrical',
    question: 'What colour is the earth conductor in modern twin and earth cable?',
    options: ['Green', 'Green/yellow', 'Bare copper', 'Black'],
    correctAnswer: 'Green/yellow',
    explanation: 'The earth conductor is always green and yellow in accordance with UK wiring regulations.'
  },
  {
    id: 'electricalQ18',
    topic: 'electrical',
    question: 'Which regulation outlines safety around electrical work in dwellings?',
    options: ['Part P', 'Part G', 'Part L', 'Part F'],
    correctAnswer: 'Part P',
    explanation: 'Part P of the Building Regulations covers electrical safety in residential properties.'
  },
  {
    id: 'electricalQ19',
    topic: 'electrical',
    question: 'What device is designed to trip when a current imbalance is detected between live and neutral?',
    options: ['MCB', 'RCD', 'Isolator', 'Contactor'],
    correctAnswer: 'RCD',
    explanation: 'RCDs protect against electric shock by detecting imbalance and disconnecting the supply.'
  },
  {
    id: 'electricalQ20',
    topic: 'electrical',
    question: 'What is the typical supply voltage in domestic UK installations?',
    options: ['230V', '110V', '400V', '240V'],
    correctAnswer: '230V',
    explanation: 'The UK nominal voltage is 230V AC for domestic installations.'
  },
  {
    id: 'electricalQ21',
    topic: 'electrical',
    question: 'What is the purpose of equipotential bonding?',
    options: ['Improve conductivity', 'Reduce voltage drops', 'Prevent pipe corrosion', 'Equalise electrical potential'],
    correctAnswer: 'Equalise electrical potential',
    explanation: 'Bonding ensures all metal parts are at the same potential, reducing shock risk.'
  },
  {
    id: 'electricalQ22',
    topic: 'electrical',
    question: 'Which cable type is commonly used for fixed electrical wiring in homes?',
    options: ['Armoured cable', 'Twin and earth', 'Flexible flex', 'Coaxial'],
    correctAnswer: 'Twin and earth',
    explanation: 'Twin and earth is the standard cable for domestic fixed wiring.'
  },
  {
    id: 'electricalQ23',
    topic: 'electrical',
    question: 'When must an electrician be registered with a competent person scheme?',
    options: ['Always', 'For gas work', 'For Part P notifiable work', 'For PAT testing'],
    correctAnswer: 'For Part P notifiable work',
    explanation: 'Only Part P notifiable work requires registration under a competent scheme like NICEIC.'
  },
  {
    id: 'electricalQ24',
    topic: 'electrical',
    question: 'Which tool is used to check for the presence of voltage before working on a circuit?',
    options: ['Multimeter', 'Test lamp', 'Proximity tester', 'Voltage tester'],
    correctAnswer: 'Voltage tester',
    explanation: 'A voltage tester confirms a circuit is dead before beginning work.'
  },
  {
    id: 'electricalQ25',
    topic: 'electrical',
    question: 'What regulation governs electrical safety at work?',
    options: ['PUWER', 'BS 7671', 'EAWR 1989', 'CDM Regulations'],
    correctAnswer: 'EAWR 1989',
    explanation: 'The Electricity at Work Regulations 1989 ensure safe working practices.'
  },
  {
    id: 'electricalQ26',
    topic: 'electrical',
    question: 'Which of the following would require supplementary bonding?',
    options: ['Boiler flue', 'Copper pipes in bathroom', 'Lighting circuit', 'Shower screen'],
    correctAnswer: 'Copper pipes in bathroom',
    explanation: 'All exposed conductive parts in bathrooms must be bonded together.'
  },
  {
    id: 'electricalQ27',
    topic: 'electrical',
    question: 'What is the correct circuit protection for a 3kW electric shower?',
    options: ['16A', '32A', '13A', '40A'],
    correctAnswer: '16A',
    explanation: 'A 3kW load draws ~13A, so a 16A MCB is used, not a 13A plug fuse. Showers must be on dedicated circuits.'
  },
  {
    id: 'electricalQ28',
    topic: 'electrical',
    question: 'Which document outlines wiring colours in UK electrical systems?',
    options: ['IEE Wiring Regs', 'Building Regs Part P', 'Wiring Matters', 'BS 7671'],
    correctAnswer: 'BS 7671',
    explanation: 'BS 7671 (IET Wiring Regulations) defines colour coding and installation standards.'
  },
  {
    id: 'electricalQ29',
    topic: 'electrical',
    question: 'What is the resistance of a good earth connection?',
    options: ['Less than 1 ohm', '10 ohms', '100 ohms', 'Greater than 200 ohms'],
    correctAnswer: 'Less than 1 ohm',
    explanation: 'A resistance under 1 ohm ensures quick disconnection during faults.'
  },
  {
    id: 'electricalQ30',
    topic: 'electrical',
    question: 'What happens if a neutral wire becomes disconnected in a ring circuit?',
    options: ['Appliances stop working', 'Fuse blows', 'Overheating occurs', 'Voltage imbalance and shock risk'],
    correctAnswer: 'Voltage imbalance and shock risk',
    explanation: 'A broken neutral can cause serious voltage fluctuations and safety issues.'
  },
  {
    id: 'electricalQ31',
    topic: 'electrical',
    question: 'Which colour is used for the live conductor in modern UK wiring?',
    options: ['Brown', 'Blue', 'Black', 'Grey'],
    correctAnswer: 'Brown',
    explanation: 'Brown is the standard colour for live conductors under BS 7671.'
  },
  {
    id: 'electricalQ32',
    topic: 'electrical',
    question: 'Why should flexible cords not be used for fixed wiring?',
    options: ['They’re too expensive', 'They’re uninsulated', 'They’re prone to overheating', 'They’re not mechanically protected'],
    correctAnswer: 'They’re not mechanically protected',
    explanation: 'Flexible cords are vulnerable to damage and unsuitable for permanent installations.'
  },
  {
    id: 'electricalQ33',
    topic: 'electrical',
    question: 'What is the main purpose of an MCB?',
    options: ['Detect voltage', 'Prevent electric shock', 'Limit current flow', 'Control lighting'],
    correctAnswer: 'Limit current flow',
    explanation: 'MCBs trip when a circuit exceeds its rated current, protecting wiring.'
  },
  {
    id: 'electricalQ34',
    topic: 'electrical',
    question: 'Which standard governs electrical installation testing?',
    options: ['BS 1363', 'BS 7671', 'Part L', 'EN 12492'],
    correctAnswer: 'BS 7671',
    explanation: 'BS 7671 (IET Wiring Regulations) includes detailed testing and inspection rules.'
  },
  {
    id: 'electricalQ35',
    topic: 'electrical',
    question: 'What is the maximum disconnection time for a final circuit in a TN system?',
    options: ['1 second', '4 seconds', '0.4 seconds', '5 seconds'],
    correctAnswer: '0.4 seconds',
    explanation: 'To protect against indirect contact, disconnection must occur within 0.4 seconds.'
  },
  {
    id: 'electricalQ36',
    topic: 'electrical',
    question: 'Which conductor must always be longer in flex cable connections?',
    options: ['Live', 'Neutral', 'Earth', 'Return'],
    correctAnswer: 'Earth',
    explanation: 'Earth conductors are made longer so they disconnect last for safety.'
  },
  {
    id: 'electricalQ37',
    topic: 'electrical',
    question: 'Why is it important to isolate electrical supplies before plumbing work?',
    options: ['To prevent pipe noise', 'To avoid electrical shock or fire', 'To comply with gas regulations', 'To stop water flow'],
    correctAnswer: 'To avoid electrical shock or fire',
    explanation: 'Live circuits near pipework pose serious hazards if not isolated.'
  },
  {
    id: 'electricalQ38',
    topic: 'electrical',
    question: 'Which type of earthing is commonly used in UK homes?',
    options: ['TT', 'TN-S', 'TN-C-S', 'IT'],
    correctAnswer: 'TN-C-S',
    explanation: 'Most UK homes use TN-C-S systems where neutral and earth are combined at the supply.'
  },
  {
    id: 'electricalQ39',
    topic: 'electrical',
    question: 'Where should bonding clamps be placed on copper pipework?',
    options: ['On painted surface', 'Near appliance joints', 'On clean metal, accessible and secure', 'Anywhere near insulation'],
    correctAnswer: 'On clean metal, accessible and secure',
    explanation: 'Bonding clamps must contact bare metal for continuity and be visible.'
  },
  {
    id: 'electricalQ40',
    topic: 'electrical',
    question: 'What is the safe isolation procedure order?',
    options: ['Check voltage, isolate, test again', 'Switch off, test, isolate', 'Identify, isolate, verify dead', 'Isolate, earth, switch on'],
    correctAnswer: 'Identify, isolate, verify dead',
    explanation: 'Always identify the source, isolate it, and confirm it’s dead before work.'
  },
  {
    id: 'electricalQ41',
    topic: 'electrical',
    question: 'What class of electrical equipment is allowed in Zone 0 of a bathroom (e.g. inside a bath or shower)?',
    options: ['Class I', 'Class II', 'Class III', 'Class IV'],
    correctAnswer: 'Class III',
    explanation: 'Only SELV (Safety Extra Low Voltage) equipment is allowed in Zone 0, as it operates at very low voltage and is safe for use in wet areas.'
  },
  {
    id: 'electricalQ42',
    topic: 'electrical',
    question: 'Which conductor is never switched in a single-pole switch?',
    options: ['Live', 'Neutral', 'Earth', 'CPC'],
    correctAnswer: 'Neutral',
    explanation: 'Neutral must remain continuous; only the live is switched for isolation.'
  },
  {
    id: 'electricalQ43',
    topic: 'electrical',
    question: 'What rating fuse is commonly used in a standard 13A plug?',
    options: ['5A', '10A', '13A', '3A'],
    correctAnswer: '13A',
    explanation: 'UK plugs are typically fused at 13A to protect the appliance and cable.'
  },
  {
    id: 'electricalQ44',
    topic: 'electrical',
    question: 'What is the correct action when a fuse keeps blowing in a heating circuit?',
    options: ['Replace with higher rated fuse', 'Call an electrician', 'Use a bypass cable', 'Insulate the wires'],
    correctAnswer: 'Call an electrician',
    explanation: 'Persistent fuse blowing indicates a fault requiring professional diagnosis.'
  },
  {
    id: 'electricalQ45',
    topic: 'electrical',
    question: 'What is the main risk of poorly earthed electrical equipment?',
    options: ['Loss of power', 'Electrical noise', 'Shock hazard', 'Short circuit'],
    correctAnswer: 'Shock hazard',
    explanation: 'A faulty earth can allow exposed parts to become live, posing danger.'
  },
  {
    id: 'electricalQ46',
    topic: 'electrical',
    question: 'What does the “CPC” stand for in electrical wiring?',
    options: ['Circuit Power Connector', 'Conductor Protective Component', 'Circuit Protective Conductor', 'Current Pulse Control'],
    correctAnswer: 'Circuit Protective Conductor',
    explanation: 'CPC is the earth wire that ensures fault current is safely diverted.'
  },
  {
    id: 'electricalQ47',
    topic: 'electrical',
    question: 'Why are isolation switches needed for immersion heaters?',
    options: ['Prevent thermostat failure', 'Provide safe maintenance access', 'Prevent scalding', 'Reduce electric bills'],
    correctAnswer: 'Provide safe maintenance access',
    explanation: 'They allow work to be carried out safely by disconnecting power at source.'
  },
  {
    id: 'electricalQ48',
    topic: 'electrical',
    question: 'How should cables be run through timber joists in floors?',
    options: ['Surface-mounted only', 'Drilled at mid-height with protection', 'Stapled to top surface', 'Drilled at base of joist'],
    correctAnswer: 'Drilled at mid-height with protection',
    explanation: 'Minimises structural weakening and reduces risk of nails/screws striking the cable.'
  },
  {
    id: 'electricalQ49',
    topic: 'electrical',
    question: 'When should supplementary bonding be omitted in a bathroom?',
    options: ['When using copper pipes', 'If all circuits are RCD protected', 'If an electric shower is used', 'When the boiler is isolated'],
    correctAnswer: 'If all circuits are RCD protected',
    explanation: 'Modern regs allow omission of bonding if RCDs and equipotential bonding are in place.'
  },
  {
    id: 'electricalQ50',
    topic: 'electrical',
    question: 'What is the minimum cable size for a 10kW electric shower?',
    options: ['4mm²', '6mm²', '10mm²', '2.5mm²'],
    correctAnswer: '10mm²',
    explanation: 'A 10kW shower requires 10mm² cable to safely carry the high current load.'
  },


];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'electrical');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of electricalQuestions) {
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
      const questionDocRef = doc(db, 'questions', 'electrical', 'items', q.id);
      await setDoc(questionDocRef, q);
      console.log(`✅ Uploaded question: ${q.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${q.id}:`, err);
    }
  }
}

upload();
