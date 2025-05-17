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

// ✅ Bricklaying Level 3 – Setting Out for Complex Projects (25 questions)
const questions = [
  {
    id: 'bricklaying-l3-setting-out-1',
    question: "Why is a datum point essential when setting out?",
    options: ["Marks the build start", "Sets the wall colour", "Ensures level reference", "Shows door width"],
    correctAnswer: "Ensures level reference",
    explanation: "The datum point provides a consistent vertical reference for transferring levels across the site."
  },
  {
    id: 'bricklaying-l3-setting-out-2',
    question: "What does a total station combine?",
    options: ["Laser and plumb bob", "Angle and distance data", "Trowel and gauge rod", "Mortar and line pins"],
    correctAnswer: "Angle and distance data",
    explanation: "Total stations measure both angles and distances, allowing precise setting out of positions and coordinates."
  },
  {
    id: 'bricklaying-l3-setting-out-3',
    question: "What is a profile board used for?",
    options: ["Check strength", "Store tools", "Hold string lines", "Measure temperature"],
    correctAnswer: "Hold string lines",
    explanation: "Profile boards support string lines to define masonry positions and heights accurately."
  },
  {
    id: 'bricklaying-l3-setting-out-4',
    question: "What does the 3-4-5 method establish?",
    options: ["Wall height", "Right angle", "Arch curve", "Door size"],
    correctAnswer: "Right angle",
    explanation: "The 3-4-5 triangle helps bricklayers create 90-degree angles using simple measurements."
  },
  {
    id: 'bricklaying-l3-setting-out-5',
    question: "What is triangulation used for?",
    options: ["Mixing mortar", "Marking colours", "Fixing positions", "Cutting bricks"],
    correctAnswer: "Fixing positions",
    explanation: "Triangulation helps determine accurate points on site using measurements from fixed locations."
  },
  {
    id: 'bricklaying-l3-setting-out-6',
    question: "What does a benchmark indicate?",
    options: ["Brick size", "Joint thickness", "Known level", "Colour finish"],
    correctAnswer: "Known level",
    explanation: "A benchmark is a fixed level used for consistent height measurements across a project."
  },
  {
    id: 'bricklaying-l3-setting-out-7',
    question: "Why use offset lines in setting out?",
    options: ["For aesthetics", "To add texture", "To preserve layout", "To mix sand"],
    correctAnswer: "To preserve layout",
    explanation: "Offset lines are placed away from the wall lines to prevent disruption during construction."
  },
  {
    id: 'bricklaying-l3-setting-out-8',
    question: "Which tool helps check level over long distances?",
    options: ["Spirit level", "Line pin", "Laser level", "Trowel"],
    correctAnswer: "Laser level",
    explanation: "Laser levels provide a straight level line across large areas for accurate elevation transfer."
  },
  {
    id: 'bricklaying-l3-setting-out-9',
    question: "What does a setting out plan show?",
    options: ["Brick colour", "Joint mix", "Position data", "Wall thickness"],
    correctAnswer: "Position data",
    explanation: "A setting out plan includes key measurements and reference lines needed to begin construction accurately."
  },
  {
    id: 'bricklaying-l3-setting-out-10',
    question: "What does 'working to face' mean?",
    options: ["Painting bricks", "Measuring backs", "Referencing visible side", "Using back wall"],
    correctAnswer: "Referencing visible side",
    explanation: "It means using the finished face of the wall as the starting point for accurate measurements."
  },
  {
    id: 'bricklaying-l3-setting-out-11',
    question: "Why use a string line gauge?",
    options: ["Check plumb", "Mark bricks", "Set course heights", "Store levels"],
    correctAnswer: "Set course heights",
    explanation: "The gauge helps mark consistent height intervals when fixing string lines between profiles."
  },
  {
    id: 'bricklaying-l3-setting-out-12',
    question: "What does a plumb bob check?",
    options: ["Wall colour", "Plumb line", "Temperature", "Curing rate"],
    correctAnswer: "Plumb line",
    explanation: "A plumb bob ensures walls are vertical by hanging directly under the point of reference."
  },
  {
    id: 'bricklaying-l3-setting-out-13',
    question: "What does 'normalising dimensions' mean?",
    options: ["Equalising brick size", "Adjusting to brickwork module", "Reducing materials", "Fixing errors"],
    correctAnswer: "Adjusting to brickwork module",
    explanation: "It ensures measurements suit whole bricks and standard joint sizes to reduce cuts and waste."
  },
  {
    id: 'bricklaying-l3-setting-out-14',
    question: "What is the radius point used for?",
    options: ["Mixing cement", "Drawing angles", "Forming curves", "Fixing drains"],
    correctAnswer: "Forming curves",
    explanation: "The radius point allows consistent curvature when marking out arched or circular walls."
  },
  {
    id: 'bricklaying-l3-setting-out-15',
    question: "What does a trammel arm help with?",
    options: ["Cleaning tools", "Drawing straight lines", "Marking circles", "Spreading mortar"],
    correctAnswer: "Marking circles",
    explanation: "Trammel arms rotate from a central point to mark out accurate circular wall layouts."
  },
  {
    id: 'bricklaying-l3-setting-out-16',
    question: "What are running dimensions?",
    options: ["Random marks", "Cumulative measures", "Wall thicknesses", "Paint lengths"],
    correctAnswer: "Cumulative measures",
    explanation: "Running dimensions are ongoing measurements from a fixed point, reducing compound errors."
  },
  {
    id: 'bricklaying-l3-setting-out-17',
    question: "What is a snap line?",
    options: ["Laser beam", "Chalked string", "Profile board", "Tape measure"],
    correctAnswer: "Chalked string",
    explanation: "A chalked snap line provides quick, straight marking for brickwork or reference points."
  },
  {
    id: 'bricklaying-l3-setting-out-18',
    question: "What is a control network?",
    options: ["Internet for site", "Work schedule", "Grid of key points", "Material plan"],
    correctAnswer: "Grid of key points",
    explanation: "A control network is a grid of accurately measured points used to guide all layout work on site."
  },
  {
    id: 'bricklaying-l3-setting-out-19',
    question: "What is a traveller in setting out?",
    options: ["Worker bag", "Spirit level", "Template tool", "Line reel"],
    correctAnswer: "Template tool",
    explanation: "Travellers are physical templates used to guide wall shape or profile during complex builds."
  },
  {
    id: 'bricklaying-l3-setting-out-20',
    question: "What is 'reduced level'?",
    options: ["Joint thickness", "Lowered slab", "Height from datum", "Offset line"],
    correctAnswer: "Height from datum",
    explanation: "Reduced level refers to a point’s height relative to a known reference, like sea level or a benchmark."
  },
  {
    id: 'bricklaying-l3-setting-out-21',
    question: "Why are gridlines used?",
    options: ["For drawing shapes", "To hang tools", "To locate features", "To colour walls"],
    correctAnswer: "To locate features",
    explanation: "Gridlines help define and reference positions for structural elements like walls and columns."
  },
  {
    id: 'bricklaying-l3-setting-out-22',
    question: "What does 'interpolation' calculate?",
    options: ["Mortar mix", "Intermediate levels", "Brick colour", "Tool sizes"],
    correctAnswer: "Intermediate levels",
    explanation: "Interpolation determines levels between known points when setting out slopes or gradients."
  },
  {
    id: 'bricklaying-l3-setting-out-23',
    question: "Why is booking dimensions important?",
    options: ["For painting walls", "For site access", "To prevent errors", "To track materials"],
    correctAnswer: "To prevent errors",
    explanation: "Recording dimensions systematically helps avoid mistakes during layout and build."
  },
  {
    id: 'bricklaying-l3-setting-out-24',
    question: "What does a story rod measure?",
    options: ["Brick weight", "Wall length", "Course heights", "Pipe depth"],
    correctAnswer: "Course heights",
    explanation: "A story rod is a marked stick used to check consistency in vertical course measurements."
  },
  {
    id: 'bricklaying-l3-setting-out-25',
    question: "What does a line and pins setup help with?",
    options: ["Mortar mixing", "Site entry", "Wall alignment", "Tool storage"],
    correctAnswer: "Wall alignment",
    explanation: "Line and pins are used to maintain a straight course during bricklaying by guiding each row."
  },
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'bricklaying-l3-setting-out', 'items', q.id), {
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
