// ✅ COMPLETE: npx ts-node scripts/hvac/level3/uploadLevel3Regulations.ts

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

// ✅ HVAC Level 3 Environmental Regulations - Regenerated Set
const questions = [
  {
    id: 'hvac-l3-regulations1',
    question: 'Which UK regulation controls the use of HFC refrigerants in air conditioning systems?',
    options: ['Clean Air Act', 'COSHH Regulations', 'F-Gas Regulations', 'Building Act'],
    correctAnswer: 'F-Gas Regulations',
    explanation: 'The F-Gas Regulations restrict the use of high global warming potential refrigerants like HFCs and set rules for containment, recovery, leak checking, and certification.'
  },
  {
    id: 'hvac-l3-regulations2',
    question: 'What does the WEEE Directive require for end-of-life HVAC electrical components?',
    options: ['Disposal in general waste', 'Return to local council', 'Proper recycling by authorised schemes', 'Export outside the UK'],
    correctAnswer: 'Proper recycling by authorised schemes',
    explanation: 'The WEEE Directive mandates that electrical components must be collected and processed by approved waste handling systems to reduce environmental harm.'
  },
  {
    id: 'hvac-l3-regulations3',
    question: 'Which regulation governs the use of ozone-depleting refrigerants in existing HVAC systems?',
    options: ['EPC Regulations', 'Ozone Regulations', 'Noise at Work Regulations', 'Building Part L'],
    correctAnswer: 'Ozone Regulations',
    explanation: 'The UK Ozone-Depleting Substances Regulations ban the use of certain refrigerants like R22 in maintenance of existing systems.'
  },
  {
    id: 'hvac-l3-regulations4',
    question: 'What must commercial HVAC systems using over 5 tonnes CO2e of refrigerant comply with?',
    options: ['Monthly calibration', 'Visual signage', 'Regular leak checking', 'Power factor correction'],
    correctAnswer: 'Regular leak checking',
    explanation: 'F-Gas Regulations require routine leak checks on systems containing significant quantities of fluorinated gases.'
  },
  {
    id: 'hvac-l3-regulations5',
    question: 'What type of permit might be required for operating an industrial cooling tower?',
    options: ['Health and Safety notice', 'COSHH certificate', 'Environmental permit', 'Water licence'],
    correctAnswer: 'Environmental permit',
    explanation: 'Environmental permits may be required where cooling towers pose risks of pollution or legionella dispersion.'
  },
  {
    id: 'hvac-l3-regulations6',
    question: 'What do UK Building Regulations Part F address?',
    options: ['Fire safety', 'Electrical layout', 'Ventilation requirements', 'Gas piping'],
    correctAnswer: 'Ventilation requirements',
    explanation: 'Part F ensures that buildings provide adequate fresh air for occupants through natural or mechanical ventilation.'
  },
  {
    id: 'hvac-l3-regulations7',
    question: 'Which rule applies to refrigerants with a GWP over 2500 from 2025?',
    options: ['Mandatory reuse', 'Total exemption', 'Use prohibited in new systems', 'Label update only'],
    correctAnswer: 'Use prohibited in new systems',
    explanation: 'F-Gas phase-down prohibits use of high-GWP refrigerants like R404A in new systems from 2025 onward.'
  },
  {
    id: 'hvac-l3-regulations8',
    question: 'Who must hold F-Gas certification under UK law?',
    options: ['Wholesalers', 'Delivery drivers', 'Service technicians', 'Appliance retailers'],
    correctAnswer: 'Service technicians',
    explanation: 'Anyone carrying out work on F-Gas systems must be certified to handle fluorinated refrigerants safely.'
  },
  {
    id: 'hvac-l3-regulations9',
    question: 'What is required when decommissioning a system with R410A?',
    options: ['Add water', 'Burn the gas', 'Recover the refrigerant', 'Send unit to landfill'],
    correctAnswer: 'Recover the refrigerant',
    explanation: 'F-Gas Regulations require full recovery of fluorinated gases before disposing of HVAC equipment.'
  },
  {
    id: 'hvac-l3-regulations10',
    question: 'Which document assesses energy use in non-domestic buildings?',
    options: ['MEES form', 'WEEE ticket', 'EPC certificate', 'COSHH sheet'],
    correctAnswer: 'EPC certificate',
    explanation: 'An Energy Performance Certificate (EPC) is legally required for non-domestic buildings being sold or let in the UK.'
  },
  {
    id: 'hvac-l3-regulations11',
    question: 'What is the main aim of the Ecodesign Directive in relation to HVAC products?',
    options: ['Set price limits', 'Simplify design', 'Improve energy efficiency', 'Ban imports'],
    correctAnswer: 'Improve energy efficiency',
    explanation: 'Ecodesign sets minimum energy performance requirements to ensure only efficient HVAC products are sold.'
  },
  {
    id: 'hvac-l3-regulations12',
    question: 'What does the COSHH Regulation control in HVAC work?',
    options: ['System colours', 'Electricity supply', 'Chemical exposure', 'Unit location'],
    correctAnswer: 'Chemical exposure',
    explanation: 'COSHH requires employers to manage exposure to hazardous substances like refrigerants and cleaning chemicals.'
  },
  {
    id: 'hvac-l3-regulations13',
    question: 'Which regulation covers noise from HVAC plant in urban areas?',
    options: ['Gas Safety Regulations', 'Noise Regulations 2006', 'Ecodesign Law', 'WEEE Directive'],
    correctAnswer: 'Noise Regulations 2006',
    explanation: 'Environmental noise from HVAC plant such as outdoor condensers is controlled under local authority planning and noise legislation.'
  },
  {
    id: 'hvac-l3-regulations14',
    question: 'Which waste is classed as hazardous in HVAC servicing?',
    options: ['Foam cladding', 'Plastic trays', 'Used refrigerant oil', 'Dust filters'],
    correctAnswer: 'Used refrigerant oil',
    explanation: 'Used oils contaminated with refrigerant gases are classed as hazardous and require special disposal.'
  },
  {
    id: 'hvac-l3-regulations15',
    question: 'Which regulation introduced the Energy Savings Opportunity Scheme (ESOS)?',
    options: ['Noise Act', 'F-Gas Law', 'UK Climate Act', 'Energy Act 2013'],
    correctAnswer: 'Energy Act 2013',
    explanation: 'The Energy Act 2013 introduced ESOS, which mandates energy audits for large UK organisations.'
  },
  {
    id: 'hvac-l3-regulations16',
    question: 'What documentation must be retained for refrigerant recovery?',
    options: ['Warranty card', 'Lab safety sheet', 'Service log', 'F-Gas records'],
    correctAnswer: 'F-Gas records',
    explanation: 'F-Gas regulations require accurate records of refrigerant recovery and maintenance to be held for 5 years.'
  },
  {
    id: 'hvac-l3-regulations17',
    question: 'What is the required inspection frequency for air conditioning systems over 12kW?',
    options: ['Every 3 years', 'Annually', 'Every 5 years', 'Every 10 years'],
    correctAnswer: 'Every 5 years',
    explanation: 'UK law requires regular inspections by accredited assessors every 5 years for systems over 12kW total output.'
  },
  {
    id: 'hvac-l3-regulations18',
    question: 'Which of these qualifies for support under the Boiler Upgrade Scheme?',
    options: ['Gas boiler', 'Portable cooler', 'Heat pump', 'Fan heater'],
    correctAnswer: 'Heat pump',
    explanation: 'The Boiler Upgrade Scheme provides grants for installing low-carbon heating systems like air and ground source heat pumps.'
  },
  {
    id: 'hvac-l3-regulations19',
    question: 'What do the Building Safety Act 2022 changes introduce?',
    options: ['Mandatory refrigerant logbooks', 'Fire safety reviews', 'No HVAC permits', 'Cooling tower registration'],
    correctAnswer: 'Fire safety reviews',
    explanation: 'The Act enforces stronger building safety measures, especially around fire, including systems like ventilation and smoke control.'
  },
  {
    id: 'hvac-l3-regulations20',
    question: 'What must be done before using a crane for HVAC installation?',
    options: ['Get approval from the council', 'Paint equipment yellow', 'Complete LOLER checks', 'Use only electric hoists'],
    correctAnswer: 'Complete LOLER checks',
    explanation: 'The Lifting Operations and Lifting Equipment Regulations (LOLER) require safe planning, inspection, and competent personnel.'
  },
  {
    id: 'hvac-l3-regulations21',
    question: 'Which regulation controls emissions from diesel-powered HVAC units?',
    options: ['COSHH Law', 'NRMM Regulations', 'Part P', 'MEES Act'],
    correctAnswer: 'NRMM Regulations',
    explanation: 'Non-Road Mobile Machinery (NRMM) Regulations govern emissions from diesel generators and HVAC units on construction sites.'
  },
  {
    id: 'hvac-l3-regulations22',
    question: 'What is the Energy Labelling Regulation designed to do?',
    options: ['Display system colour', 'Rate efficiency levels', 'List UK manufacturers', 'Show date of install'],
    correctAnswer: 'Rate efficiency levels',
    explanation: 'Energy labels help users compare HVAC systems by showing performance ratings and power consumption.'
  },
  {
    id: 'hvac-l3-regulations23',
    question: 'When does an HVAC system need UKCA marking?',
    options: ['If installed by a builder', 'For systems above 0.5 bar pressure', 'All fan systems', 'Only in listed buildings'],
    correctAnswer: 'For systems above 0.5 bar pressure',
    explanation: 'The Pressure Equipment Safety Regulations require UKCA marking on components operating above 0.5 bar.'
  },
  {
    id: 'hvac-l3-regulations24',
    question: 'Who is legally responsible for safe HVAC waste disposal?',
    options: ['The landlord', 'The delivery driver', 'The licensed contractor', 'The site visitor'],
    correctAnswer: 'The licensed contractor',
    explanation: 'Duty of Care laws assign waste responsibility to those who produce or transport it, such as HVAC installers.'
  },
  {
    id: 'hvac-l3-regulations25',
    question: 'What is the role of the Environment Agency in HVAC compliance?',
    options: ['Provide grants', 'Issue planning permission', 'Enforce environmental laws', 'Supply HVAC labels'],
    correctAnswer: 'Enforce environmental laws',
    explanation: 'The Environment Agency enforces regulations such as F-Gas, hazardous waste, and pollution prevention rules.'
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l3-regulations', 'items', q.id), {
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
