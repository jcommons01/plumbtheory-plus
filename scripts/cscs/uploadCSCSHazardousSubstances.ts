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

// ✅ CSCS Hazardous Substances (COSHH) Questions
const questions = [
    {
      id: 'cscs-hazardous-substances-1',
      question: "What does COSHH stand for?",
      options: ["Control of Substances Harmful to Health", "Containment of Seriously Hazardous Holdings", "Classification of Safety and Health Hazards", "Certification of Safe Handling and Housekeeping"],
      correctAnswer: "Control of Substances Harmful to Health",
      explanation: "COSHH stands for Control of Substances Hazardous to Health. These regulations require employers to control exposure to hazardous substances to prevent ill health."
    },
    {
      id: 'cscs-hazardous-substances-2',
      question: "Which of these would NOT be considered a hazardous substance under COSHH?",
      options: ["Cement dust", "Asbestos fibers", "Pure bottled drinking water", "Paint solvent vapors"],
      correctAnswer: "Pure bottled drinking water",
      explanation: "Pure bottled drinking water isn't hazardous under COSHH regulations. Hazardous substances are those that can cause harm to health, such as chemicals, dusts, fumes, and biological agents."
    },
    {
      id: 'cscs-hazardous-substances-3',
      question: "Where would you find information about the hazards of a chemical product?",
      options: ["In the company's annual report", "On the Safety Data Sheet (SDS)", "From asking more experienced colleagues", "In the staff handbook"],
      correctAnswer: "On the Safety Data Sheet (SDS)",
      explanation: "Safety Data Sheets (SDS) provide comprehensive information about chemical hazards, handling procedures, and emergency measures. Suppliers are legally required to provide these documents."
    },
    {
      id: 'cscs-hazardous-substances-4',
      question: "What does the hazard pictogram showing a skull and crossbones indicate?",
      options: ["Oxidizing agent", "Acute toxicity", "Corrosive", "Environmental hazard"],
      correctAnswer: "Acute toxicity",
      explanation: "The skull and crossbones pictogram indicates acute toxicity (high or extreme). It warns that substances can cause severe harm or death through short-term exposure."
    },
    {
      id: 'cscs-hazardous-substances-5',
      question: "What is the purpose of a COSHH assessment?",
      options: ["To record accidents involving hazardous substances", "To identify hazardous substances and determine appropriate control measures", "To test workers for exposure to chemicals", "To calculate how much of a substance can be used legally"],
      correctAnswer: "To identify hazardous substances and determine appropriate control measures",
      explanation: "A COSHH assessment identifies hazardous substances and determines appropriate control measures to protect workers' health. It's a systematic approach to managing workplace health risks."
    },
    {
      id: 'cscs-hazardous-substances-6',
      question: "What is the first consideration in the hierarchy of control for hazardous substances?",
      options: ["Provide personal protective equipment", "Provide training to workers", "Eliminate the hazardous substance", "Limit the number of workers exposed"],
      correctAnswer: "Eliminate the hazardous substance",
      explanation: "Elimination is the first and most effective control measure in the hierarchy. If hazardous substances can be completely removed, the risk is eliminated entirely."
    },
    {
      id: 'cscs-hazardous-substances-7',
      question: "What type of health effect might not appear until years after exposure to a substance?",
      options: ["Acute effect", "Chronic effect", "First-time effect", "Temporary effect"],
      correctAnswer: "Chronic effect",
      explanation: "Chronic effects develop slowly over time, often after repeated or long-term exposure. Examples include occupational cancers which may not appear until decades after exposure."
    },
    {
      id: 'cscs-hazardous-substances-8',
      question: "Which of these is an example of Local Exhaust Ventilation (LEV)?",
      options: ["Opening windows to let in fresh air", "Using a desk fan to circulate air", "An extraction system that removes dust at its source", "A whole building air conditioning system"],
      correctAnswer: "An extraction system that removes dust at its source",
      explanation: "Local Exhaust Ventilation (LEV) captures contaminants at source before they enter the workplace air. Examples include extraction hoods on woodworking machinery or welding fume extraction arms."
    },
    {
      id: 'cscs-hazardous-substances-9',
      question: "Which of these is a potential route of entry for hazardous substances into the body?",
      options: ["Only through cuts in the skin", "Only through breathing in", "Only through ingestion", "Through inhalation, ingestion, and skin contact"],
      correctAnswer: "Through inhalation, ingestion, and skin contact",
      explanation: "Hazardous substances can enter the body through inhalation, ingestion, and skin contact (including eye contact). Understanding these routes helps determine appropriate protective measures."
    },
    {
      id: 'cscs-hazardous-substances-10',
      question: "Which type of dust can cause silicosis?",
      options: ["Wood dust", "Silica dust", "Paper dust", "Plastic dust"],
      correctAnswer: "Silica dust",
      explanation: "Silica dust causes silicosis, a serious and progressive lung disease. It's generated when cutting or grinding materials containing crystalline silica, such as concrete, stone, or sand."
    },
    {
      id: 'cscs-hazardous-substances-11',
      question: "What does WEL stand for in relation to COSHH?",
      options: ["Work Environment Level", "Workplace Exposure Limit", "Warning Effect Level", "Water Extraction Limit"],
      correctAnswer: "Workplace Exposure Limit",
      explanation: "WEL stands for Workplace Exposure Limit - the maximum concentration of an airborne hazardous substance that workers can be exposed to. Employers must ensure WELs are not exceeded."
    },
    {
      id: 'cscs-hazardous-substances-12',
      question: "What is meant by the term 'Respiratory Protective Equipment' (RPE)?",
      options: ["Equipment that strengthens the lungs", "Protective devices worn to prevent inhalation of hazardous substances", "Ventilation systems that clean the air", "First aid equipment for respiratory emergencies"],
      correctAnswer: "Protective devices worn to prevent inhalation of hazardous substances",
      explanation: "RPE includes masks, respirators, and breathing apparatus worn to prevent inhalation of hazardous substances. It should be properly fitted and only used when other control measures aren't sufficient."
    },
    {
      id: 'cscs-hazardous-substances-13',
      question: "Why is it important not to eat or drink in areas where hazardous substances are used?",
      options: ["It's unprofessional", "To prevent contamination of food and accidental ingestion of hazardous substances", "To avoid spilling food on work materials", "To prevent distraction from work"],
      correctAnswer: "To prevent contamination of food and accidental ingestion of hazardous substances",
      explanation: "Eating or drinking where hazardous substances are used risks accidental ingestion of toxic materials. Contaminants on hands or surfaces can easily transfer to food or drinks."
    },
    {
      id: 'cscs-hazardous-substances-14',
      question: "What is the purpose of health surveillance under COSHH?",
      options: ["To check if workers are generally healthy", "To detect early signs of work-related ill health and take action", "To ensure workers don't take too much sick leave", "To screen out workers with existing health problems"],
      correctAnswer: "To detect early signs of work-related ill health and take action",
      explanation: "Health surveillance detects early signs of work-related health problems before serious harm occurs. It helps verify that control measures are working effectively and provides early intervention opportunity."
    },
    {
      id: 'cscs-hazardous-substances-15',
      question: "What action should you take if you accidentally spill a hazardous substance?",
      options: ["Quickly clean it up yourself however you can", "Ignore small spills as they're not dangerous", "Report it immediately and follow site spill procedures", "Cover it with paper towels and leave it to evaporate"],
      correctAnswer: "Report it immediately and follow site spill procedures",
      explanation: "Always report spills immediately and follow established procedures. Most workplaces have specific protocols for handling spills safely, which may require specialized equipment and training."
    }
  ];

// ✅ Upload function
async function uploadCSCSHazardousSubstances() {
  try {
    console.log('Starting upload of CSCS Hazardous Substances questions...');
    
    for (const q of questions) {
      await setDoc(doc(db, 'questions', 'cscs-hazardous-substances', 'items', q.id), {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      });
      console.log(`✅ Uploaded: ${q.id}`);
    }
    
    console.log('✅ Successfully uploaded all CSCS Hazardous Substances questions!');
  } catch (err) {
    console.error('❌ Error uploading CSCS Hazardous Substances questions:', err);
  }
}

// Execute the upload function
uploadCSCSHazardousSubstances();

export {};
