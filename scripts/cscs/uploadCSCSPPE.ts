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

// ✅ CSCS Personal Protective Equipment (PPE) Questions
const questions = [
  {
    id: 'cscs-ppe-1',
    question: "Who is responsible for providing personal protective equipment (PPE) on site?",
    options: ["Workers must provide their own", "The employer", "The client", "The Health and Safety Executive"],
    correctAnswer: "The employer",
    explanation: "Employers must provide appropriate PPE free of charge when risks cannot be adequately controlled by other means. They must also maintain it in good working order and provide proper storage when not in use."
  },
  {
    id: 'cscs-ppe-2',
    question: "What is the primary purpose of PPE?",
    options: ["To identify different trades on site", "To protect workers from residual risks when other controls are not sufficient", "To keep workers' own clothes clean", "To identify site visitors"],
    correctAnswer: "To protect workers from residual risks when other controls are not sufficient",
    explanation: "PPE protects workers from residual risks when hazards cannot be adequately controlled by other means. It should be used as a last resort in the hierarchy of control, not as a substitute for proper engineering controls or safe systems of work."
  },
  {
    id: 'cscs-ppe-3',
    question: "What does 'CE marking' on PPE indicate?",
    options: ["Chinese Export", "Construction Equipment", "Conformité Européenne (European Conformity)", "Certified for Emergencies"],
    correctAnswer: "Conformité Européenne (European Conformity)",
    explanation: "CE marking indicates that PPE meets minimum health and safety requirements of European regulations. In the UK since Brexit, many products now carry the UKCA (UK Conformity Assessed) marking alongside or instead of CE."
  },
  {
    id: 'cscs-ppe-4',
    question: "When should a hard hat be replaced?",
    options: ["Only when visibly damaged", "At least every 5 years", "When it becomes dirty", "According to the manufacturer's instructions, typically 2-5 years from manufacture date"],
    correctAnswer: "According to the manufacturer's instructions, typically 2-5 years from manufacture date",
    explanation: "Hard hats should be replaced according to manufacturer's instructions, typically 2-5 years from manufacture. They should also be replaced immediately if cracked, damaged, or subjected to significant impact, even if no damage is visible."
  },
  {
    id: 'cscs-ppe-5',
    question: "What types of eye protection are used on construction sites?",
    options: ["Only safety spectacles", "Only face shields", "Only goggles", "Safety spectacles, goggles, and face shields depending on the hazard"],
    correctAnswer: "Safety spectacles, goggles, and face shields depending on the hazard",
    explanation: "Different eye protection types suit different hazards: safety spectacles for impact protection, goggles for chemical or dust protection, and face shields for more comprehensive face protection. The correct type depends on the specific task and risk assessment."
  },
  {
    id: 'cscs-ppe-6',
    question: "What does the rating 'EN388' refer to on protective gloves?",
    options: ["Chemical resistance", "Mechanical protection", "Thermal protection", "Electrical insulation"],
    correctAnswer: "Mechanical protection",
    explanation: "EN388 is the European standard for gloves providing protection against mechanical risks. The standard uses a pictogram followed by four or five numbers indicating performance levels against different hazards including abrasion, cut, tear, and puncture resistance."
  },
  {
    id: 'cscs-ppe-7',
    question: "What does RPE stand for?",
    options: ["Recognized Protection Equipment", "Respiratory Protective Equipment", "Regulated Personal Equipment", "Required Protection Elements"],
    correctAnswer: "Respiratory Protective Equipment",
    explanation: "RPE stands for Respiratory Protective Equipment - devices worn to protect the respiratory system from harmful substances. It includes filtering face pieces (disposable masks), half and full-face respirators, and powered air purifying respirators."
  },
  {
    id: 'cscs-ppe-8',
    question: "Why should PPE be considered the last resort in protecting workers?",
    options: ["Because it's too expensive", "Because it's uncomfortable to wear", "Because it relies on the worker using it correctly and doesn't eliminate the hazard", "Because it's difficult to obtain"],
    correctAnswer: "Because it relies on the worker using it correctly and doesn't eliminate the hazard",
    explanation: "PPE is the last resort because it doesn't eliminate or reduce the hazard at source and relies entirely on proper usage. It can fail, be used incorrectly, or cause discomfort, whereas engineering controls provide protection regardless of worker behavior."
  },
  {
    id: 'cscs-ppe-9',
    question: "What is a 'face fit test' in relation to RPE?",
    options: ["A test to see if a mask is comfortable", "A check that the mask is the right color for the job", "A test to ensure a tight-fitting respirator seals adequately to the wearer's face", "A test of the respirator's filter quality"],
    correctAnswer: "A test to ensure a tight-fitting respirator seals adequately to the wearer's face",
    explanation: "A face fit test ensures that tight-fitting respirators seal properly to the wearer's face. This is crucial for effectiveness, as gaps between the face and mask allow contaminated air to bypass the filter and be inhaled."
  },
  {
    id: 'cscs-ppe-10',
    question: "What precaution should be taken regarding loose clothing when using rotating machinery?",
    options: ["Loose clothing is preferred as it's more comfortable", "Secure loose clothing or wear close-fitting alternatives", "Loose clothing should be worn with additional PPE", "There are no special requirements"],
    correctAnswer: "Secure loose clothing or wear close-fitting alternatives",
    explanation: "Loose clothing must be secured or replaced with close-fitting alternatives around rotating machinery. Loose items can be caught and pull the wearer into the machinery, causing entanglement, severe injury, or death."
  },
  {
    id: 'cscs-ppe-11',
    question: "What is high-visibility clothing designed to do?",
    options: ["Keep the wearer warm", "Protect against chemical splashes", "Make the wearer more visible to vehicle and plant operators", "Protect against falls from height"],
    correctAnswer: "Make the wearer more visible to vehicle and plant operators",
    explanation: "High-visibility clothing increases the wearer's visibility, especially in low-light conditions or around moving vehicles. It typically features fluorescent material for daytime visibility and retroreflective strips that reflect light back toward its source at night."
  },
  {
    id: 'cscs-ppe-12',
    question: "When should safety boots be worn on a construction site?",
    options: ["Only when working with concrete", "Only when specifically instructed", "Only in wet conditions", "At all times unless a specific risk assessment indicates otherwise"],
    correctAnswer: "At all times unless a specific risk assessment indicates otherwise",
    explanation: "Safety boots should generally be worn at all times on construction sites due to constant foot injury risks. They protect against falling objects, compression, punctures, and other hazards common throughout construction environments."
  },
  {
    id: 'cscs-ppe-13',
    question: "What does the 'EN166' marking on eye protection indicate?",
    options: ["The lens color", "Compliance with the European standard for eye protection", "The level of UV protection", "The year of manufacture"],
    correctAnswer: "Compliance with the European standard for eye protection",
    explanation: "EN166 indicates compliance with the European standard for personal eye protection. Additional markings will specify performance capabilities like impact resistance levels, protection against liquids, or resistance to fogging."
  },
  {
    id: 'cscs-ppe-14',
    question: "If you notice damage to your PPE, what should you do?",
    options: ["Continue working until the end of your shift", "Repair it yourself with tape", "Report it immediately and obtain a replacement", "Only report it if the damage is severe"],
    correctAnswer: "Report it immediately and obtain a replacement",
    explanation: "Damaged PPE should be reported immediately and replaced. Damaged equipment may not provide adequate protection and could create additional hazards. Employers must maintain PPE in good repair and provide replacements when necessary."
  },
  {
    id: 'cscs-ppe-15',
    question: "What type of hearing protection typically offers the highest level of noise reduction?",
    options: ["Cotton wool in ears", "Canal caps", "Earplugs", "Earmuffs"],
    correctAnswer: "Earmuffs",
    explanation: "Earmuffs (over-ear defenders) typically provide higher noise reduction than other options. For very high noise environments, earplugs and earmuffs can be worn together for maximum protection, though this should only be done based on proper risk assessment."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-ppe', 'items', q.id), {
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