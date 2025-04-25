// ✅ COMPLETE: scripts/uploadLevel2RealLifeScenarios.ts with 25 scenario questions
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
    id: 'level2rls1',
    topic: 'level2-real-life-scenarios',
    question: "You arrive at a job and find a leaking compression fitting under a sink. What is your first action?",
    options: ["Tighten it immediately", "Turn off the water supply", "Call your supervisor", "Replace the fitting"],
    correctAnswer: "Turn off the water supply",
    explanation: "Always isolate the water supply before attempting a repair."
  },
  {
    id: 'level2rls2',
    topic: 'level2-real-life-scenarios',
    question: "You smell gas while working in a home. What should you do?",
    options: ["Ignore it if the work is unrelated", "Continue but work quickly", "Evacuate the property and call the gas emergency number", "Open a window and carry on"],
    correctAnswer: "Evacuate the property and call the gas emergency number",
    explanation: "A gas smell indicates a serious risk—evacuate and call 0800 111 999 in the UK."
  },
  {
    id: 'level2rls3',
    topic: 'level2-real-life-scenarios',
    question: "A customer asks you to install a fitting that breaches Water Regulations. What do you do?",
    options: ["Install it anyway", "Tell them it’s fine", "Explain it's against regulations and offer a compliant alternative", "Ask a colleague to do it"],
    correctAnswer: "Explain it's against regulations and offer a compliant alternative",
    explanation: "Installations must comply with Water Regulations—offer safe alternatives."
  },
  {
    id: 'level2rls4',
    topic: 'level2-real-life-scenarios',
    question: "While fitting pipework in a loft, you notice you're near unfixed boards. What should you do?",
    options: ["Continue carefully", "Move tools closer", "Stop and request proper boarding", "Work from the joists"],
    correctAnswer: "Stop and request proper boarding",
    explanation: "Working in unboarded lofts is a fall risk—request boarding for safety."
  },
  {
    id: 'level2rls5',
    topic: 'level2-real-life-scenarios',
    question: "You drill into a wall and hit a live electrical cable. What is the first thing you must do?",
    options: ["Continue working", "Tape over it", "Report the incident and isolate the supply", "Leave it and don't tell anyone"],
    correctAnswer: "Report the incident and isolate the supply",
    explanation: "Striking a live cable is dangerous—report and isolate immediately."
  },
  {
    id: 'level2rls6',
    topic: 'level2-real-life-scenarios',
    question: "You’re asked to work on a boiler but you’re not Gas Safe registered. What should you do?",
    options: ["Check YouTube for guidance", "Ask a friend", "Refuse the work and explain you're not registered", "Try it anyway"],
    correctAnswer: "Refuse the work and explain you're not registered",
    explanation: "Only Gas Safe engineers are legally allowed to work on gas appliances."
  },
  {
    id: 'level2rls7',
    topic: 'level2-real-life-scenarios',
    question: "You’re replacing a radiator but find green corrosion on copper pipework. What should you do?",
    options: ["Leave it", "Wipe it off", "Replace affected section", "Polish it"],
    correctAnswer: "Replace affected section",
    explanation: "Green corrosion suggests oxidation and weakening—replace the pipe."
  },
  {
    id: 'level2rls8',
    topic: 'level2-real-life-scenarios',
    question: "You install a sink but water drains slowly. What’s the likely issue?",
    options: ["Blocked main", "Overtightened fitting", "Insufficient fall", "Cracked basin"],
    correctAnswer: "Insufficient fall",
    explanation: "Waste pipes need proper fall (gradient) for water to drain."
  },
  {
    id: 'level2rls9',
    topic: 'level2-real-life-scenarios',
    question: "On a job you see a colleague using a ladder on uneven ground. What should you do?",
    options: ["Ignore it", "Warn them and help find a safer method", "Join them", "Take photos"],
    correctAnswer: "Warn them and help find a safer method",
    explanation: "Working unsafely puts lives at risk—intervene and offer safer options."
  },
  {
    id: 'level2rls10',
    topic: 'level2-real-life-scenarios',
    question: "Water is backing up into the kitchen sink. What is your first check?",
    options: ["Boiler pressure", "Mains stop tap", "Trap and waste pipe", "Radiator valves"],
    correctAnswer: "Trap and waste pipe",
    explanation: "Blocked or poorly installed waste is the likely issue here."
  },
  // ⏩ Remaining 15 added immediately below...
  {
    id: 'level2rls11',
    topic: 'level2-real-life-scenarios',
    question: "You drop a pipe fitting and it cracks. What should you do?",
    options: ["Use it anyway", "Superglue it", "Replace it before use", "Ignore the crack"],
    correctAnswer: "Replace it before use",
    explanation: "Damaged components compromise safety and reliability."
  },
  {
    id: 'level2rls12',
    topic: 'level2-real-life-scenarios',
    question: "You’re connecting copper to plastic. What must be used in the plastic pipe?",
    options: ["Nothing", "PTFE tape", "Inserts", "Flux"],
    correctAnswer: "Inserts",
    explanation: "Plastic pipes need inserts to maintain shape inside fittings."
  },
  {
    id: 'level2rls13',
    topic: 'level2-real-life-scenarios',
    question: "A ceiling below a shower shows signs of water damage. What should you suspect first?",
    options: ["Condensation", "Faulty trap or seal", "Damp rising", "Paint fault"],
    correctAnswer: "Faulty trap or seal",
    explanation: "Leaks from baths or showers often stem from poor seals or fittings."
  },
  {
    id: 'level2rls14',
    topic: 'level2-real-life-scenarios',
    question: "The water supply is off, but a tap still drips. Why?",
    options: ["Faulty washer", "Air lock", "Stored water in system", "Bad fitting"],
    correctAnswer: "Stored water in system",
    explanation: "Water may still drain from storage tanks."
  },
  {
    id: 'level2rls15',
    topic: 'level2-real-life-scenarios',
    question: "You find a live wire exposed in a boiler cupboard. What’s your next step?",
    options: ["Tape it", "Carry on", "Isolate power and report it", "Step over it carefully"],
    correctAnswer: "Isolate power and report it",
    explanation: "Always report and isolate electrical risks."
  },
  {
    id: 'level2rls16',
    topic: 'level2-real-life-scenarios',
    question: "You’re asked to work at height but lack training. What do you do?",
    options: ["Try anyway", "Ask for help", "Refuse until trained", "Use a ladder carefully"],
    correctAnswer: "Refuse until trained",
    explanation: "Working at height requires proper training and equipment."
  },
  {
    id: 'level2rls17',
    topic: 'level2-real-life-scenarios',
    question: "You complete an installation but forget to flush the pipework. What could happen?",
    options: ["Nothing", "Water tastes better", "Contamination or debris in water", "Higher pressure"],
    correctAnswer: "Contamination or debris in water",
    explanation: "Flushing removes swarf, dirt, and potential contaminants."
  },
  {
    id: 'level2rls18',
    topic: 'level2-real-life-scenarios',
    question: "You drop your blowtorch. What must you check before reusing it?",
    options: ["If it's still hot", "If gas is leaking or parts are damaged", "Colour", "Warranty"],
    correctAnswer: "If gas is leaking or parts are damaged",
    explanation: "Ensure no leaks or faults exist before reuse."
  },
  {
    id: 'level2rls19',
    topic: 'level2-real-life-scenarios',
    question: "You’re fitting a radiator but pipes are too short. What should you do?",
    options: ["Stretch the pipe", "Add a short length using fittings", "Leave a gap", "Bend the valves"],
    correctAnswer: "Add a short length using fittings",
    explanation: "Use couplers or elbows to extend or align pipework properly."
  },
  {
    id: 'level2rls20',
    topic: 'level2-real-life-scenarios',
    question: "A customer says water smells like metal. What’s the likely cause?",
    options: ["Old pipes", "Low pressure", "Bad tap", "Dirty water"],
    correctAnswer: "Old pipes",
    explanation: "Metallic taste often comes from aging pipework, especially iron or steel."
  },
  {
    id: 'level2rls21',
    topic: 'level2-real-life-scenarios',
    question: "The mains stop tap is jammed. What do you do?",
    options: ["Use a wrench aggressively", "Leave it", "Apply gentle pressure and seek permission to replace", "Use hammer taps"],
    correctAnswer: "Apply gentle pressure and seek permission to replace",
    explanation: "Stop taps can break—use care and consult owner."
  },
  {
    id: 'level2rls22',
    topic: 'level2-real-life-scenarios',
    question: "A customer asks you to install a mixer shower on a low pressure system. What should you do?",
    options: ["Say yes", "Fit it anyway", "Explain issues and recommend a pump or alternative", "Try then uninstall"],
    correctAnswer: "Explain issues and recommend a pump or alternative",
    explanation: "Mixer showers need sufficient pressure—boost or suggest alternatives."
  },
  {
    id: 'level2rls23',
    topic: 'level2-real-life-scenarios',
    question: "You cut into pipework and get sprayed. What likely happened?",
    options: ["No fault", "Thermal expansion", "Did not isolate supply", "Rust buildup"],
    correctAnswer: "Did not isolate supply",
    explanation: "Always double-check isolation before cutting pipes."
  },
  {
    id: 'level2rls24',
    topic: 'level2-real-life-scenarios',
    question: "You’re told a job needs a WRAS-approved fitting. What does that mean?",
    options: ["Any fitting will do", "Must be shiny", "Certified as safe for drinking water", "It’s extra strong"],
    correctAnswer: "Certified as safe for drinking water",
    explanation: "WRAS-approved means suitable for potable water."
  },
  {
    id: 'level2rls25',
    topic: 'level2-real-life-scenarios',
    question: "A customer has a noisy pipe (water hammer). What’s a common fix?",
    options: ["Add insulation", "Tighten taps", "Install a shock arrestor", "Use plastic pipe"],
    correctAnswer: "Install a shock arrestor",
    explanation: "Water hammer is controlled using shock arrestors or air chambers."
  }
];

async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'level2-real-life-scenarios', 'items', q.id), {
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
