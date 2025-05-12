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

// ✅ CSCS Behavioural Case Studies Questions
const questions = [
    {
      id: 'cscs-behaviour-1',
      question: "You notice a colleague working at height without the correct fall protection equipment. What should you do?",
      options: ["Mind your own business - it's their choice", "Report them to the authorities after work", "Intervene immediately, pointing out the danger and ensuring they use correct equipment", "Take a photo as evidence"],
      correctAnswer: "Intervene immediately, pointing out the danger and ensuring they use correct equipment",
      explanation: "You should intervene immediately to prevent a potentially fatal accident. Falls from height are a leading cause of workplace fatalities, and everyone has responsibility to address unsafe behaviors."
    },
    {
      id: 'cscs-behaviour-2',
      question: "You discover a small oil leak from a machine. What should you do?",
      options: ["Ignore it as it's only small", "Put some sand over it to absorb it", "Report it immediately and use a spill kit if trained to do so", "Wait until your break to report it"],
      correctAnswer: "Report it immediately and use a spill kit if trained to do so",
      explanation: "Report oil leaks immediately and use appropriate spill containment if trained. Even small leaks can cause environmental harm, safety hazards, and potentially indicate larger mechanical problems that need addressing."
    },
    {
      id: 'cscs-behaviour-3',
      question: "Your site requires face masks for certain tasks, but you find them uncomfortable. What should you do?",
      options: ["Only wear the mask when the supervisor is watching", "Decide for yourself when it's really necessary", "Wear the required mask as specified - discomfort doesn't outweigh health risks", "Use a different type of mask that's more comfortable but not approved"],
      correctAnswer: "Wear the required mask as specified - discomfort doesn't outweigh health risks",
      explanation: "Always wear specified PPE regardless of comfort issues. The respiratory protection requirements exist to prevent serious lung diseases, and the short-term discomfort doesn't compare to potential long-term health consequences."
    },
    {
      id: 'cscs-behaviour-4',
      question: "You notice the guard on a circular saw has been removed. What should you do?",
      options: ["Use the saw carefully without the guard", "Replace the guard before using the saw or report it if you can't fix it", "Use the saw but stand to one side", "Find another saw to use and leave this one for someone else"],
      correctAnswer: "Replace the guard before using the saw or report it if you can't fix it",
      explanation: "Never use machinery with missing guards. Either replace the guard before use or report the equipment as defective if you can't fix it, ensuring it's taken out of service until properly repaired."
    },
    {
      id: 'cscs-behaviour-5',
      question: "During site induction, you realize you haven't understood some important safety information. What should you do?",
      options: ["Say nothing to avoid looking foolish", "Ask questions until you fully understand the safety information", "Check with a friend later", "Assume it's not really important"],
      correctAnswer: "Ask questions until you fully understand the safety information",
      explanation: "Always ask questions if you don't understand safety information. Site inductions provide critical knowledge needed to work safely, and misunderstandings could lead to accidents affecting you and others."
    },
    {
      id: 'cscs-behaviour-6',
      question: "You see a colleague about to lift a heavy object with poor technique. What should you do?",
      options: ["Wait to see if they hurt themselves", "Offer to help and suggest a better lifting technique", "Tell them they're doing it wrong and walk away", "Report them to management"],
      correctAnswer: "Offer to help and suggest a better lifting technique",
      explanation: "Offer help and suggest better technique immediately before injury occurs. Back injuries can be debilitating and long-lasting, but a positive intervention focuses on helping rather than criticizing."
    },
    {
      id: 'cscs-behaviour-7',
      question: "You see water leaking onto electrical equipment. What should you do?",
      options: ["Quickly unplug the equipment if safe to do so, then report it", "Ignore it as it's probably not dangerous", "Wipe up the water but leave the equipment running", "Touch the equipment to see if it's giving a shock"],
      correctAnswer: "Quickly unplug the equipment if safe to do so, then report it",
      explanation: "Isolate electrical equipment from water immediately if safe to do so by disconnecting power, then report the situation. Water and electricity create serious electrocution risks requiring immediate action."
    },
    {
      id: 'cscs-behaviour-8',
      question: "You are asked to use a piece of equipment you haven't been trained on. What should you do?",
      options: ["Give it a try - it looks simple enough", "Explain you haven't been trained and refuse to use it until properly trained", "Ask a colleague to quickly show you the basics", "Use it but very carefully"],
      correctAnswer: "Explain you haven't been trained and refuse to use it until properly trained",
      explanation: "Never use equipment you haven't been trained on - politely refuse and explain your reasons. Using equipment without proper training risks injury to yourself and others, and may also breach regulations."
    },
    {
      id: 'cscs-behaviour-9',
      question: "You witness a near miss incident where no one was hurt. What should you do?",
      options: ["Ignore it as no one was harmed", "Tell colleagues about it but don't bother reporting it formally", "Report it through the proper channels", "Only report it if someone else saw it too"],
      correctAnswer: "Report it through the proper channels",
      explanation: "Always report near misses through proper channels. Near misses are warnings of potential future accidents, and reporting them allows preventive measures to be implemented before someone gets hurt."
    },
    {
      id: 'cscs-behaviour-10',
      question: "A delivery driver asks you to sign for materials that look damaged. What should you do?",
      options: ["Sign anyway to avoid delaying the driver", "Refuse to sign and report the damaged materials to your supervisor", "Sign but write 'damaged' on the paperwork", "Tell the driver to find someone else to sign"],
      correctAnswer: "Refuse to sign and report the damaged materials to your supervisor",
      explanation: "Don't accept damaged materials - refuse to sign and report to your supervisor immediately. Damaged materials could be unsafe to use and may not meet specifications, potentially compromising building quality and safety."
    },
    {
      id: 'cscs-behaviour-11',
      question: "You notice a colleague seems drowsy after taking medication at lunch. They're about to operate machinery. What should you do?",
      options: ["Say nothing as it's not your business", "Speak to them privately about your concerns and suggest they inform the supervisor", "Make jokes about them being sleepy", "Operate the machinery for them"],
      correctAnswer: "Speak to them privately about your concerns and suggest they inform the supervisor",
      explanation: "Speak privately with your colleague about safety concerns and suggest reporting to the supervisor. Medication that causes drowsiness severely impairs ability to safely operate machinery, creating serious accident risks."
    },
    {
      id: 'cscs-behaviour-12',
      question: "A shortcut between work areas requires crossing a road where vehicles operate. The proper crossing is further away. What should you do?",
      options: ["Use the shortcut but look carefully for vehicles", "Always use the designated crossing point", "Use the shortcut only when no one is watching", "Use the shortcut only if you're in a hurry"],
      correctAnswer: "Always use the designated crossing point",
      explanation: "Always use designated crossing points regardless of convenience. Workplace traffic routes are designed for safety, and taking shortcuts around vehicles is a common cause of serious accidents and fatalities."
    },
    {
      id: 'cscs-behaviour-13',
      question: "You smell gas on site. What should you do?",
      options: ["Ignore it - it will probably disperse", "Light a match to try to find the source", "Raise the alarm, evacuate the area, and report it immediately", "Open windows and doors but continue working"],
      correctAnswer: "Raise the alarm, evacuate the area, and report it immediately",
      explanation: "For gas smells, raise the alarm, evacuate, and report immediately. Gas leaks present serious fire and explosion risks that require emergency response and should never be investigated by unqualified persons."
    },
    {
      id: 'cscs-behaviour-14',
      question: "It's a hot day and your colleague wants to remove their hard hat because they're too warm. What should you advise?",
      options: ["It's fine to remove it as long as there's no risk of falling objects", "Take it off but put it back on if the supervisor comes around", "Keep the hard hat on - head protection is essential on site regardless of temperature", "Remove it for short periods when in shade"],
      correctAnswer: "Keep the hard hat on - head protection is essential on site regardless of temperature",
      explanation: "Hard hats must be worn regardless of temperature in designated areas. Head injuries can be fatal, and the temporary discomfort from heat doesn't justify the significant risk of head injury from unexpected falling objects."
    },
    {
      id: 'cscs-behaviour-15',
      question: "You notice that the fire exit is blocked by stored materials. What should you do?",
      options: ["Ignore it - it's not your responsibility", "Move the materials yourself if safe to do so, or report it immediately if not", "Mention it to someone at the end of the day", "Only clear it if there's actually a fire"],
      correctAnswer: "Move the materials yourself if safe to do so, or report it immediately if not",
      explanation: "Clear blocked fire exits immediately if safe to do so, or report them for immediate action. Blocked fire exits can be deadly during emergencies, preventing escape and potentially violating fire safety regulations."
    }
  ];
  
  // ✅ Upload function
  async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'cscs-behaviour', 'items', q.id), {
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