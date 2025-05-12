import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// ✅ Firebase Configuration
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

// ✅ CSCS Environmental Awareness Questions
const questions = [
  {
    id: 'cscs-environmental-awareness-1',
    question: "What is the purpose of a Site Waste Management Plan?",
    options: ["To increase the amount of waste going to landfill", "To plan how to reduce, reuse, and recycle waste", "To encourage burning waste on site", "To avoid waste segregation"],
    correctAnswer: "To plan how to reduce, reuse, and recycle waste",
    explanation: "Site Waste Management Plans document how construction waste will be reduced, reused, and recycled. They help minimize environmental impact and often reduce costs by identifying opportunities to manage resources more efficiently."
  },
  {
    id: 'cscs-environmental-awareness-2',
    question: "Which of these is NOT typically considered hazardous waste on a construction site?",
    options: ["Asbestos", "Lead-based paint", "Untreated timber", "Empty solvent containers"],
    correctAnswer: "Untreated timber",
    explanation: "Untreated timber is not typically hazardous waste and can often be recycled or reused. Asbestos, lead-based paint, and solvent containers contain or have contained substances that pose risks to human health or the environment."
  },
  {
    id: 'cscs-environmental-awareness-3',
    question: "What is meant by 'carbon footprint'?",
    options: ["The physical footprint of a building", "The mark left by muddy boots", "The total greenhouse gas emissions caused by an activity", "The area of land required for construction"],
    correctAnswer: "The total greenhouse gas emissions caused by an activity",
    explanation: "Carbon footprint refers to the total greenhouse gas emissions caused by an activity, expressed as carbon dioxide equivalent. In construction, this includes emissions from material production, transportation, site operations, and waste management."
  },
  {
    id: 'cscs-environmental-awareness-4',
    question: "What action should you take if you discover an oil or fuel spill on site?",
    options: ["Wash it away with water", "Cover it with soil", "Report it immediately and use spill kit if trained to do so", "Ignore small spills as they'll evaporate"],
    correctAnswer: "Report it immediately and use spill kit if trained to do so",
    explanation: "Oil and fuel spills should be reported immediately and contained using appropriate spill kits if you're trained. These substances can severely contaminate soil and water, requiring proper cleanup procedures to prevent environmental damage."
  },
  {
    id: 'cscs-environmental-awareness-5',
    question: "What is the best approach to dealing with construction waste?",
    options: ["Put everything in one skip for efficiency", "Bury waste on site to save disposal costs", "Reduce, reuse, recycle, then dispose", "Burn combustible waste on site"],
    correctAnswer: "Reduce, reuse, recycle, then dispose",
    explanation: "The waste hierarchy prioritizes: first reducing waste generated, then reusing materials where possible, then recycling, and finally proper disposal as a last resort. This approach minimizes environmental impact and often reduces costs."
  },
  {
    id: 'cscs-environmental-awareness-6',
    question: "Which of these activities on a construction site could cause water pollution?",
    options: ["Using low-energy lighting", "Washing paint brushes in a designated area", "Allowing concrete washout to enter drains", "Using dust suppression sprays"],
    correctAnswer: "Allowing concrete washout to enter drains",
    explanation: "Concrete washout entering drains causes serious water pollution. Concrete washwater is highly alkaline and contains heavy metals that can harm aquatic life and contaminate drinking water supplies."
  },
  {
    id: 'cscs-environmental-awareness-7',
    question: "What does 'sustainable construction' aim to achieve?",
    options: ["Building as quickly as possible", "Maximizing profits regardless of environmental impact", "Balancing environmental, social, and economic aspects of construction", "Using only traditional building methods"],
    correctAnswer: "Balancing environmental, social, and economic aspects of construction",
    explanation: "Sustainable construction balances environmental considerations (such as resource efficiency), social aspects (like community impact), and economic factors. It aims to meet present needs without compromising future generations' ability to meet their needs."
  },
  {
    id: 'cscs-environmental-awareness-8',
    question: "Why is dust control important on construction sites?",
    options: ["Only to keep the site looking clean", "Only to prevent damage to equipment", "To protect workers' health and prevent nuisance to neighbors", "Only to improve visibility for site vehicles"],
    correctAnswer: "To protect workers' health and prevent nuisance to neighbors",
    explanation: "Dust control protects worker health by preventing respiratory issues and reduces nuisance and potential health impacts on neighboring properties. Construction dust can contain hazardous substances like silica, which causes serious lung diseases."
  },
  {
    id: 'cscs-environmental-awareness-9',
    question: "What is the purpose of using a silt fence around a construction site?",
    options: ["To keep wildlife out", "To provide security", "To prevent sediment from washing into watercourses", "To mark the boundary of the site"],
    correctAnswer: "To prevent sediment from washing into watercourses",
    explanation: "Silt fences prevent sediment-laden runoff from entering watercourses during construction activities. Excessive sediment can harm aquatic ecosystems by reducing oxygen levels, smothering habitats, and carrying pollutants."
  },
  {
    id: 'cscs-environmental-awareness-10',
    question: "What action can help reduce noise pollution from construction activities?",
    options: ["Working 24 hours to complete the job quicker", "Using equipment only during agreed hours and maintaining it properly", "Playing music to mask construction noise", "Concentrating all noisy work in one day"],
    correctAnswer: "Using equipment only during agreed hours and maintaining it properly",
    explanation: "Using equipment only during agreed hours and keeping it well-maintained reduces noise pollution. Proper maintenance prevents unnecessary noise from poorly functioning equipment, while respecting working hours limits nuisance to neighbors."
  },
  {
    id: 'cscs-environmental-awareness-11',
    question: "Why might trees on a construction site need protection?",
    options: ["Only if they're rare species", "Only if they're going to be cut down", "They provide habitat, prevent erosion, and may have protection orders", "Only to maintain the appearance of the site"],
    correctAnswer: "They provide habitat, prevent erosion, and may have protection orders",
    explanation: "Trees provide wildlife habitat, prevent soil erosion, and improve air quality. Many trees have legal protection through Tree Preservation Orders, and damaging protected trees can result in significant fines."
  },
  {
    id: 'cscs-environmental-awareness-12',
    question: "What is the correct way to store fuel on a construction site?",
    options: ["In any available container", "In a secure bunded area with appropriate containment", "Underground to save space", "In multiple small containers spread around the site"],
    correctAnswer: "In a secure bunded area with appropriate containment",
    explanation: "Fuel should be stored in a secure bunded area that can contain at least 110% of the largest container's capacity. This prevents fuel spills from contaminating soil and water, complying with environmental regulations."
  },
  {
    id: 'cscs-environmental-awareness-13',
    question: "What is the purpose of an Environmental Impact Assessment?",
    options: ["To increase project costs", "To identify and assess environmental effects of a project before work begins", "To delay construction projects", "To calculate carbon emissions only"],
    correctAnswer: "To identify and assess environmental effects of a project before work begins",
    explanation: "Environmental Impact Assessments identify potential environmental effects before projects begin, allowing for mitigation measures to be incorporated into the design and construction processes. They help prevent or reduce negative environmental impacts."
  },
  {
    id: 'cscs-environmental-awareness-14',
    question: "How can construction sites reduce energy consumption?",
    options: ["Use only hand tools", "Run generators 24/7 for convenience", "Use energy-efficient equipment, plan vehicle movements, and avoid leaving equipment idle", "Work only during daylight hours"],
    correctAnswer: "Use energy-efficient equipment, plan vehicle movements, and avoid leaving equipment idle",
    explanation: "Construction sites can reduce energy use with efficient equipment, optimized vehicle movements, and preventing unnecessary idling. These practices reduce fuel consumption, emissions, and operating costs while maintaining productivity."
  },
  {
    id: 'cscs-environmental-awareness-15',
    question: "What environmental benefit does proper materials storage provide?",
    options: ["It only improves site appearance", "It prevents damage to materials, reducing waste and replacement needs", "It has no environmental benefit", "It only improves security"],
    correctAnswer: "It prevents damage to materials, reducing waste and replacement needs",
    explanation: "Proper materials storage prevents damage that would create waste and require replacement. This conserves resources, reduces waste disposal impacts, and lowers the carbon footprint associated with manufacturing and transporting replacement materials."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-environmental-awareness', 'items', q.id), {
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

// Execute the upload function
uploadQuestions();