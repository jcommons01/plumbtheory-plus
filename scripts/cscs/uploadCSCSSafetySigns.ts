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

// ✅ CSCS Safety Signs & Symbols Questions
const questions = [
    {
      id: 'cscs-signage-1',
      question: "What color are prohibition signs?",
      options: ["Red circle with a red diagonal line on a white background", "Blue circle on a white background", "Yellow triangle with a black border", "Green square or rectangle"],
      correctAnswer: "Red circle with a red diagonal line on a white background",
      explanation: "Prohibition signs use a red circle with diagonal line on white background. They indicate activities or things that are not permitted, such as 'No Smoking' or 'No Entry'."
    },
    {
      id: 'cscs-signage-2',
      question: "What do blue circular signs indicate?",
      options: ["Warning", "Prohibition", "Mandatory action", "Safe condition"],
      correctAnswer: "Mandatory action",
      explanation: "Blue circular signs indicate mandatory actions that must be followed. Examples include 'Wear Hard Hat', 'Wear Eye Protection', or 'Use Pedestrian Walkway'."
    },
    {
      id: 'cscs-signage-3',
      question: "What shape and color are warning signs?",
      options: ["Blue rectangle", "Red circle", "Yellow triangle with black border", "Green square"],
      correctAnswer: "Yellow triangle with black border",
      explanation: "Warning signs are yellow triangles with black borders and symbols. They alert workers to potential hazards such as 'Danger: High Voltage' or 'Warning: Forklift Trucks Operating'."
    },
    {
      id: 'cscs-signage-4',
      question: "What color and shape are safe condition signs?",
      options: ["Red squares", "Yellow triangles", "Blue circles", "Green rectangles or squares"],
      correctAnswer: "Green rectangles or squares",
      explanation: "Safe condition signs are green rectangles or squares with white symbols or text. They indicate emergency exits, first aid facilities, and safety equipment locations."
    },
    {
      id: 'cscs-signage-5',
      question: "What do fire equipment signs look like?",
      options: ["Green squares", "Yellow triangles", "Red squares or rectangles", "Blue circles"],
      correctAnswer: "Red squares or rectangles",
      explanation: "Fire equipment signs are red squares or rectangles with white symbols or text. They indicate the location of fire-fighting equipment such as extinguishers, hoses, or alarm call points."
    },
    {
      id: 'cscs-signage-6',
      question: "What sign shows a white figure running toward a white door on a green background?",
      options: ["First aid sign", "Fire assembly point", "Emergency exit", "Safe area"],
      correctAnswer: "Emergency exit",
      explanation: "The white figure running toward a white door on a green background indicates an emergency exit. These signs direct people to the nearest safe exit route during emergencies."
    },
    {
      id: 'cscs-signage-7',
      question: "Which type of sign would indicate that hard hats must be worn?",
      options: ["Prohibition sign", "Warning sign", "Mandatory sign", "Safe condition sign"],
      correctAnswer: "Mandatory sign",
      explanation: "A 'Hard Hats Must Be Worn' sign is a mandatory sign - blue circle with white symbol. These signs indicate actions that must be taken to comply with statutory requirements and ensure safety."
    },
    {
      id: 'cscs-signage-8',
      question: "What does a yellow triangle sign with a black exclamation mark mean?",
      options: ["Emergency exit", "First aid station", "Fire alarm", "General warning"],
      correctAnswer: "General warning",
      explanation: "A yellow triangle with black exclamation mark indicates general warning. It alerts workers to be careful and pay attention, often used where a specific hazard symbol isn't available or for multiple hazards."
    },
    {
      id: 'cscs-signage-9',
      question: "What sign indicates that an area contains flammable material?",
      options: ["Red triangle with black flame symbol", "Yellow triangle with black flame symbol", "Blue circle with white flame symbol", "Green square with white flame symbol"],
      correctAnswer: "Yellow triangle with black flame symbol",
      explanation: "A yellow triangle with black flame symbol warns of flammable materials. This warning sign alerts workers to take precautions against fire risk when working in or entering the area."
    },
    {
      id: 'cscs-signage-10',
      question: "Which sign would show the location of an eye wash station?",
      options: ["Yellow triangle with eye symbol", "Red square with eye symbol", "Blue circle with eye symbol", "Green rectangle with eye symbol"],
      correctAnswer: "Green rectangle with eye symbol",
      explanation: "An eye wash station location would be shown with a green rectangle with eye symbol. This is a safe condition sign indicating emergency first aid equipment location."
    },
    {
      id: 'cscs-signage-11',
      question: "What does a blue circle with white ear defenders symbol indicate?",
      options: ["Hearing protection is available", "Area with reduced noise levels", "Ear defenders must be worn", "Auditory testing station"],
      correctAnswer: "Ear defenders must be worn",
      explanation: "A blue circle with white ear defenders symbol indicates ear protection must be worn. This mandatory sign is used in areas where noise levels could damage hearing without proper protection."
    },
    {
      id: 'cscs-signage-12',
      question: "What does a white cross on a green background indicate?",
      options: ["Hospital direction", "First aid", "Pharmacy", "Safe meeting point"],
      correctAnswer: "First aid",
      explanation: "A white cross on green background indicates first aid facilities. This safe condition sign helps people quickly locate first aid equipment or stations in an emergency."
    },
    {
      id: 'cscs-signage-13',
      question: "What type of sign shows a red circle with a cigarette and diagonal line?",
      options: ["No smoking (prohibition)", "Smoking area (information)", "Fire risk (warning)", "Smoking materials disposal (direction)"],
      correctAnswer: "No smoking (prohibition)",
      explanation: "A red circle with cigarette and diagonal line is a 'No Smoking' prohibition sign. It indicates smoking is forbidden in the area, often due to fire risks or health regulations."
    },
    {
      id: 'cscs-signage-14',
      question: "Which hazard warning sign has a skull and crossbones symbol?",
      options: ["Radiation hazard", "Toxic material", "Biological hazard", "Explosive material"],
      correctAnswer: "Toxic material",
      explanation: "A skull and crossbones symbol on a hazard warning sign indicates toxic material. This yellow triangle warning sign alerts workers to the presence of substances that can cause serious illness or death."
    },
    {
      id: 'cscs-signage-15',
      question: "What is the purpose of supplementary text below a safety sign?",
      options: ["To translate the sign into different languages", "To provide additional information or instruction", "To indicate when the sign was installed", "To show who is responsible for the sign"],
      correctAnswer: "To provide additional information or instruction",
      explanation: "Supplementary text provides additional information or instruction relating to the sign. It helps clarify the sign's meaning, specify the hazard, or give more detailed instructions beyond what the pictogram alone can communicate."
    }
  ];

// ✅ Upload function
async function uploadCSCSSafetySigns() {
  try {
    console.log('Starting upload of CSCS Safety Signs & Symbols questions...');
    
    for (const q of questions) {
      await setDoc(doc(db, 'questions', 'cscs-signage', 'items', q.id), {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      });
      console.log(`✅ Uploaded: ${q.id}`);
    }
    
    console.log('✅ Successfully uploaded all CSCS Safety Signs & Symbols questions!');
  } catch (err) {
    console.error('❌ Error uploading CSCS Safety Signs & Symbols questions:', err);
  }
}

// Execute the upload function
uploadCSCSSafetySigns();

export {};
