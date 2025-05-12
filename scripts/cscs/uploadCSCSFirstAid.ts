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

// ✅ CSCS First Aid & Emergency Procedures Questions
const questions = [
  {
    id: 'cscs-first-aid-1',
    question: "How would you recognize a first aider on a construction site?",
    options: ["They wear a yellow hard hat", "They carry a first aid kit at all times", "Their name is displayed on the first aid notices", "They wear a special first aid uniform"],
    correctAnswer: "Their name is displayed on the first aid notices",
    explanation: "First aiders are identified by having their names displayed on first aid notices posted around the site. These notices typically show the names and locations of first aiders, first aid facilities, and emergency contact information."
  },
  {
    id: 'cscs-first-aid-2',
    question: "What is the correct order of priority when dealing with an emergency situation?",
    options: ["Treat the casualty, call for help, assess the situation", "Call for help, treat the casualty, assess the situation", "Assess the situation, call for help, treat the casualty", "Assess the situation, treat the casualty, call for help"],
    correctAnswer: "Assess the situation, call for help, treat the casualty",
    explanation: "The correct priority is: assess the situation for dangers, call for help, then treat the casualty. Always ensure your own safety first, then get appropriate assistance before providing treatment to prevent the situation worsening."
  },
  {
    id: 'cscs-first-aid-3',
    question: "What is the emergency telephone number in the UK?",
    options: ["911", "112 or 999", "101", "111"],
    correctAnswer: "112 or 999",
    explanation: "The UK emergency telephone numbers are 999 or 112. Both connect to emergency services (police, fire, ambulance) and work from mobile phones even without signal from your provider."
  },
  {
    id: 'cscs-first-aid-4',
    question: "What is the recovery position used for?",
    options: ["To help someone recover from a fall", "To maintain an open airway for an unconscious person who is breathing", "To prepare someone for CPR", "To help someone with a broken leg"],
    correctAnswer: "To maintain an open airway for an unconscious person who is breathing",
    explanation: "The recovery position keeps an unconscious breathing person's airway open and prevents choking on fluids or vomit. It involves positioning them on their side with the head tilted back and supported by the hand."
  },
  {
    id: 'cscs-first-aid-5',
    question: "What is the main purpose of CPR (Cardiopulmonary Resuscitation)?",
    options: ["To restart a stopped heart", "To maintain blood circulation and breathing until advanced help arrives", "To clear a blocked airway", "To wake an unconscious person"],
    correctAnswer: "To maintain blood circulation and breathing until advanced help arrives",
    explanation: "CPR maintains blood circulation and oxygenation when someone's heart has stopped. It keeps oxygen flowing to vital organs until advanced medical help can provide definitive treatment like defibrillation."
  },
  {
    id: 'cscs-first-aid-6',
    question: "What is the first step when dealing with someone suffering from an electric shock?",
    options: ["Pour water over them", "Begin CPR immediately", "Make sure the power source is turned off before approaching", "Pull them away from the electrical source by hand"],
    correctAnswer: "Make sure the power source is turned off before approaching",
    explanation: "Always ensure the power source is off before approaching an electric shock victim. Never touch them while they're still in contact with electricity as you could also be electrocuted."
  },
  {
    id: 'cscs-first-aid-7',
    question: "What should you do if someone has a severe cut with significant bleeding?",
    options: ["Apply a tourniquet immediately", "Run it under cold water", "Apply direct pressure to the wound and elevate if possible", "Cover with a plaster"],
    correctAnswer: "Apply direct pressure to the wound and elevate if possible",
    explanation: "For severe bleeding, apply direct pressure to the wound with a clean pad and elevate the injured part if possible. This helps slow blood loss while waiting for emergency services."
  },
  {
    id: 'cscs-first-aid-8',
    question: "What color is the gas used in oxygen therapy?",
    options: ["Blue", "Yellow", "Black", "White"],
    correctAnswer: "White",
    explanation: "Oxygen cylinders are white (with white shoulders in the UK) according to standard color coding for medical gases. This standardized coloring helps identify gases quickly in emergency situations."
  },
  {
    id: 'cscs-first-aid-9',
    question: "What is the recommended treatment for a minor burn?",
    options: ["Apply butter or oil", "Burst any blisters that form", "Cool the burn under cold running water for at least 10 minutes", "Apply heat to draw out the burning sensation"],
    correctAnswer: "Cool the burn under cold running water for at least 10 minutes",
    explanation: "Cool minor burns under cold running water for at least 10 minutes to stop the burning process and reduce pain. Never use butter, oil, or creams, which can trap heat and worsen the injury."
  },
  {
    id: 'cscs-first-aid-10',
    question: "What does an AED do?",
    options: ["Restart a stopped heart", "Measure blood pressure", "Provide oxygen therapy", "Analyze blood samples"],
    correctAnswer: "Restart a stopped heart",
    explanation: "An Automated External Defibrillator (AED) can restart a heart that's in certain abnormal rhythms. It analyzes the heart's rhythm and, if needed, delivers an electric shock to restore normal beating."
  },
  {
    id: 'cscs-first-aid-11',
    question: "What information should you provide when calling emergency services?",
    options: ["Just the location is sufficient", "Location, nature of emergency, number of casualties, your name", "Only your name and the casualty's name", "Your work shift pattern and supervisor's name"],
    correctAnswer: "Location, nature of emergency, number of casualties, your name",
    explanation: "When calling emergency services, provide clear information about location (exact address/landmarks), nature of emergency, number and condition of casualties, and your name. Stay on the line until instructed to hang up."
  },
  {
    id: 'cscs-first-aid-12',
    question: "What are the signs of shock?",
    options: ["Red face and hot skin", "Pale, cold, clammy skin and rapid, shallow breathing", "Slow breathing and decreased heart rate", "Extreme thirst and sweating"],
    correctAnswer: "Pale, cold, clammy skin and rapid, shallow breathing",
    explanation: "Signs of shock include pale, cold, clammy skin, rapid shallow breathing, increased pulse rate, and confusion or anxiety. Shock is a life-threatening condition requiring immediate medical attention."
  },
  {
    id: 'cscs-first-aid-13',
    question: "What should you do if someone is choking but can still speak, cough, or breathe?",
    options: ["Perform abdominal thrusts immediately", "Encourage them to continue coughing", "Slap them firmly on the back", "Lay them down flat"],
    correctAnswer: "Encourage them to continue coughing",
    explanation: "If someone is choking but can still speak, cough or breathe, encourage them to keep coughing to clear the blockage themselves. Only intervene with back blows if their coughing becomes ineffective."
  },
  {
    id: 'cscs-first-aid-14',
    question: "What information should be recorded in a workplace accident book?",
    options: ["Only serious injuries that require hospital treatment", "Only accidents involving visitors to site", "All accidents, incidents, and near misses regardless of severity", "Only accidents that result in more than 3 days off work"],
    correctAnswer: "All accidents, incidents, and near misses regardless of severity",
    explanation: "All accidents, incidents and near misses should be recorded regardless of severity. This helps identify hazard patterns, meets legal requirements, and ensures small incidents don't develop into more serious problems later."
  },
  {
    id: 'cscs-first-aid-15',
    question: "What is the main purpose of an emergency evacuation procedure?",
    options: ["To prevent unauthorized site access", "To ensure the safe evacuation of everyone from the building or site in an emergency", "To test the fire alarm system", "To identify who is responsible for calling emergency services"],
    correctAnswer: "To ensure the safe evacuation of everyone from the building or site in an emergency",
    explanation: "Emergency evacuation procedures ensure everyone can safely exit a building or site during emergencies like fires. They include evacuation routes, assembly points, and methods for accounting for all personnel."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'cscs-first-aid', 'items', q.id), {
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