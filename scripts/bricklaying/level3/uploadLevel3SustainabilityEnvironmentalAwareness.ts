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
    id: 'bricklaying-l3-sustainability-001',
    question: 'What does the term "embodied carbon" refer to in construction?',
    options: [
      'Emissions from materials during their entire life cycle',
      'Carbon emitted by site vehicles and machinery',
      'Energy used in heating a completed building',
      'The amount of insulation used in a structure'
    ],
    correctAnswer: 'Emissions from materials during their entire life cycle',
    explanation: 'Embodied carbon includes emissions from extraction, manufacture, transport, and installation of materials used in construction.'
  },
  {
    id: 'bricklaying-l3-sustainability-002',
    question: 'Why is lime mortar considered more sustainable than cement mortar?',
    options: [
      'It requires less water for mixing',
      'It has a lower carbon footprint and allows brick reuse',
      'It dries faster in cold weather',
      'It makes walls easier to decorate'
    ],
    correctAnswer: 'It has a lower carbon footprint and allows brick reuse',
    explanation: 'Lime mortar produces less CO₂ during manufacture and can be removed to reclaim bricks, supporting reuse.'
  },
  {
    id: 'bricklaying-l3-sustainability-003',
    question: 'What is a key benefit of using reclaimed bricks?',
    options: [
      'They are available in more colours',
      'They are easier to lay',
      'They reduce the need for new production',
      'They absorb more sound'
    ],
    correctAnswer: 'They reduce the need for new production',
    explanation: 'Reclaimed bricks avoid the environmental impacts of manufacturing new materials, lowering embodied carbon.'
  },
  {
    id: 'bricklaying-l3-sustainability-004',
    question: 'What does "thermal mass" in masonry refer to?',
    options: [
      'The insulation level of external walls',
      'The heat stored and released by dense materials',
      'The cooling provided by ventilation',
      'The thickness of plaster layers'
    ],
    correctAnswer: 'The heat stored and released by dense materials',
    explanation: 'High thermal mass materials help regulate indoor temperature by absorbing and releasing heat slowly.'
  },
  {
    id: 'bricklaying-l3-sustainability-005',
    question: 'What is the purpose of an Environmental Product Declaration (EPD)?',
    options: [
      'It lists the safety risks of materials',
      'It confirms a product is made in the UK',
      'It shows the carbon and environmental impacts',
      'It grants permission to sell materials abroad'
    ],
    correctAnswer: 'It shows the carbon and environmental impacts',
    explanation: 'An EPD is a verified document outlining the environmental performance of a product across its lifecycle.'
  },
  {
    id: 'bricklaying-l3-sustainability-006',
    question: 'How can "local sourcing" benefit sustainable construction?',
    options: [
      'It ensures workers are local',
      'It reduces transport emissions and supports local jobs',
      'It guarantees British Standards compliance',
      'It makes site deliveries faster'
    ],
    correctAnswer: 'It reduces transport emissions and supports local jobs',
    explanation: 'Using nearby suppliers cuts fuel use and boosts the local economy, reducing a project’s carbon footprint.'
  },
  {
    id: 'bricklaying-l3-sustainability-007',
    question: 'Which waste management option ranks highest in the waste hierarchy?',
    options: [
      'Recycling materials onsite',
      'Avoiding waste altogether',
      'Sending waste to landfill',
      'Burning waste for energy'
    ],
    correctAnswer: 'Avoiding waste altogether',
    explanation: 'Prevention is the most sustainable option, followed by reuse and recycling in the waste hierarchy.'
  },
  {
    id: 'bricklaying-l3-sustainability-008',
    question: 'What is a primary reason for using rainwater harvesting systems?',
    options: [
      'To reduce the need for insulation',
      'To meet health and safety laws',
      'To lower mains water use and improve sustainability',
      'To make building services easier to manage'
    ],
    correctAnswer: 'To lower mains water use and improve sustainability',
    explanation: 'Rainwater harvesting reduces demand on mains supplies and supports water conservation efforts.'
  },
  {
    id: 'bricklaying-l3-sustainability-009',
    question: 'What does BREEAM assess in a construction project?',
    options: [
      'Labour safety procedures',
      'Speed of completion',
      'Building sustainability performance',
      'Brick compressive strength'
    ],
    correctAnswer: 'Building sustainability performance',
    explanation: 'BREEAM evaluates environmental, social, and economic sustainability across construction projects.'
  },
  {
    id: 'bricklaying-l3-sustainability-010',
    question: 'What is meant by "responsible sourcing" of materials?',
    options: [
      'Buying only recycled products',
      'Sourcing from approved architects',
      'Following ethical and sustainable supply chains',
      'Choosing the cheapest option available'
    ],
    correctAnswer: 'Following ethical and sustainable supply chains',
    explanation: 'Responsible sourcing involves considering environmental impact and fair labour practices during procurement.'
  },
  {
    id: 'bricklaying-l3-sustainability-011',
    question: 'Which property makes masonry materials ideal for passive solar design?',
    options: [
      'Low weight',
      'High thermal mass',
      'Flexibility',
      'Sound reflection'
    ],
    correctAnswer: 'High thermal mass',
    explanation: 'Masonry can absorb heat during the day and release it at night, helping regulate building temperatures.'
  },
  {
    id: 'bricklaying-l3-sustainability-012',
    question: 'What is the main environmental benefit of using recycled aggregates?',
    options: [
      'They are more durable',
      'They reduce the need for quarrying',
      'They help control dust',
      'They weigh less than natural aggregates'
    ],
    correctAnswer: 'They reduce the need for quarrying',
    explanation: 'Recycled aggregates lower environmental impact by replacing virgin materials and reducing landfill waste.'
  },
  {
    id: 'bricklaying-l3-sustainability-013',
    question: 'Which of the following best defines "circular economy"?',
    options: [
      'A system of reusing materials to minimise waste',
      'Only using materials made in circular forms',
      'A building technique for round structures',
      'A method for rotating building staff'
    ],
    correctAnswer: 'A system of reusing materials to minimise waste',
    explanation: 'The circular economy keeps resources in use as long as possible through reuse, repair, and recycling.'
  },
  {
    id: 'bricklaying-l3-sustainability-014',
    question: 'What does airtightness help achieve in a building?',
    options: [
      'Better sound insulation',
      'Improved ventilation',
      'Reduced energy loss',
      'Faster construction speed'
    ],
    correctAnswer: 'Reduced energy loss',
    explanation: 'Airtight buildings prevent unwanted air leakage, reducing heat loss and improving energy efficiency.'
  },
  {
    id: 'bricklaying-l3-sustainability-015',
    question: 'Why are low-carbon cements used in sustainable construction?',
    options: [
      'They set more slowly',
      'They cost less to manufacture',
      'They produce fewer CO₂ emissions',
      'They are easier to mix on site'
    ],
    correctAnswer: 'They produce fewer CO₂ emissions',
    explanation: 'Low-carbon cements reduce emissions compared to Portland cement by using alternative binders.'
  },
  {
    id: 'bricklaying-l3-sustainability-016',
    question: 'What is the key feature of a green roof?',
    options: [
      'It is built using timber only',
      'It is covered with waterproof sheets',
      'It supports plant growth and absorbs rainwater',
      'It is always sloped for drainage'
    ],
    correctAnswer: 'It supports plant growth and absorbs rainwater',
    explanation: 'Green roofs reduce runoff, improve insulation, and increase biodiversity in urban settings.'
  },
  {
    id: 'bricklaying-l3-sustainability-017',
    question: 'What is the purpose of a Site Waste Management Plan (SWMP)?',
    options: [
      'To record materials tested onsite',
      'To monitor staff health and safety',
      'To control and reduce construction waste',
      'To plan concrete deliveries'
    ],
    correctAnswer: 'To control and reduce construction waste',
    explanation: 'SWMPs are used to organise, track, and reduce waste, improving site efficiency and sustainability.'
  },
  {
    id: 'bricklaying-l3-sustainability-018',
    question: 'What is one benefit of using hempcrete in construction?',
    options: [
      'It dries in cold weather',
      'It is fully waterproof',
      'It stores carbon within the structure',
      'It hardens faster than concrete'
    ],
    correctAnswer: 'It stores carbon within the structure',
    explanation: 'Hempcrete sequesters CO₂ during growth and curing, helping reduce the building’s overall emissions.'
  },
  {
    id: 'bricklaying-l3-sustainability-019',
    question: 'What is the primary goal of sustainable procurement?',
    options: [
      'Ordering all materials online',
      'Reducing time spent on delivery',
      'Balancing cost with environmental impact',
      'Using only recycled items'
    ],
    correctAnswer: 'Balancing cost with environmental impact',
    explanation: 'Sustainable procurement considers environmental, economic, and social factors during purchasing.'
  },
  {
    id: 'bricklaying-l3-sustainability-020',
    question: 'What does "future-proofing" a building involve?',
    options: [
      'Adding smart lighting systems',
      'Making it easy to adapt to changes over time',
      'Using more cement in the foundations',
      'Installing larger windows'
    ],
    correctAnswer: 'Making it easy to adapt to changes over time',
    explanation: 'Future-proofing ensures the building can adapt to changes in use, regulation, and climate.'
  },
  {
    id: 'bricklaying-l3-sustainability-021',
    question: 'What does "whole life carbon" include?',
    options: [
      'Only emissions during construction',
      'Only emissions from daily use',
      'Embodied and operational carbon combined',
      'Waste removal at end of life only'
    ],
    correctAnswer: 'Embodied and operational carbon combined',
    explanation: 'Whole life carbon covers all emissions from manufacture to demolition, including use phase impacts.'
  },
  {
    id: 'bricklaying-l3-sustainability-022',
    question: 'Which of these is a key feature of a demountable structure?',
    options: [
      'Lightweight timber cladding',
      'Precast concrete panels',
      'Designed for easy disassembly and reuse',
      'Covered with breathable membranes'
    ],
    correctAnswer: 'Designed for easy disassembly and reuse',
    explanation: 'Demountable designs support the circular economy by allowing future reuse of components.'
  },
  {
    id: 'bricklaying-l3-sustainability-023',
    question: 'Why are high-albedo finishes useful in urban masonry design?',
    options: [
      'They absorb moisture quickly',
      'They prevent freezing in winter',
      'They reflect sunlight and reduce heat build-up',
      'They blend better with greenery'
    ],
    correctAnswer: 'They reflect sunlight and reduce heat build-up',
    explanation: 'High-albedo surfaces help combat the urban heat island effect by reflecting solar energy.'
  },
  {
    id: 'bricklaying-l3-sustainability-024',
    question: 'What does FSC certification guarantee in timber products?',
    options: [
      'They are waterproof',
      'They were produced without chemicals',
      'They come from responsibly managed forests',
      'They are always made in the UK'
    ],
    correctAnswer: 'They come from responsibly managed forests',
    explanation: 'FSC-certified timber ensures that materials are sourced sustainably with minimal environmental impact.'
  },
  {
    id: 'bricklaying-l3-sustainability-025',
    question: 'What does the term "social sustainability" mean in construction?',
    options: [
      'Supporting fair labour and community wellbeing',
      'Providing weekly social events onsite',
      'Hiring only local workers',
      'Reducing delivery times'
    ],
    correctAnswer: 'Supporting fair labour and community wellbeing',
    explanation: 'Social sustainability ensures construction benefits society through ethical practices and inclusivity.'
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-sustainability', 'items', q.id), {
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
