// ✅ COMPLETE: npx ts-node scripts/electrical/level2/uploadLevel2BuildingRegulationsPartP.ts

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

// ✅ Level 2 Building Regulations (Part P) Questions
const questions = [
  {
    id: 'level2bldgregp1',
    question: "What does Part P of the Building Regulations primarily cover?",
    options: ["Energy efficiency in dwellings", "Structure and stability of buildings", "Fire safety requirements", "Electrical safety in dwellings"],
    correctAnswer: "Electrical safety in dwellings",
    explanation: "Part P of the Building Regulations specifically covers electrical safety in dwellings in England and Wales, ensuring that domestic electrical installations are designed and installed safely."
  },
  {
    id: 'level2bldgregp2',
    question: "Which of the following work is notifiable under Part P in a kitchen?",
    options: ["Replacing a damaged socket", "Installing a new cooker circuit", "Replacing a light fitting", "Replacing a faulty consumer unit"],
    correctAnswer: "Installing a new cooker circuit",
    explanation: "Installing a new circuit, such as a cooker circuit in a kitchen, is notifiable work under Part P that requires either Building Control notification or completion by a registered competent person."
  },
  {
    id: 'level2bldgregp3',
    question: "What is the primary purpose of the Part P Building Regulations?",
    options: ["To ensure electrical work is completed quickly", "To reduce the cost of electrical installations", "To ensure reasonable provision for electrical safety in dwellings", "To standardize all electrical installations in the UK"],
    correctAnswer: "To ensure reasonable provision for electrical safety in dwellings",
    explanation: "The primary purpose of Part P is to ensure that reasonable provision is made for electrical safety in dwellings to reduce the risk of injury, fire, and fatalities caused by electrical installations."
  },
  {
    id: 'level2bldgregp4',
    question: "Which of the following is NOT a notifiable location under Part P?",
    options: ["Bathroom", "Kitchen", "Garden", "Living room"],
    correctAnswer: "Living room",
    explanation: "Living rooms are not considered special locations under Part P. Notifiable locations typically include bathrooms, kitchens, gardens, and areas with swimming pools or saunas due to increased risk."
  },
  {
    id: 'level2bldgregp5',
    question: "What is a 'Competent Person Scheme' in relation to Part P?",
    options: ["A scheme that tests electricians' competence annually", "A training program for electricians", "A self-certification scheme allowing registered members to certify their own work", "A government department that inspects electrical work"],
    correctAnswer: "A self-certification scheme allowing registered members to certify their own work",
    explanation: "Competent Person Schemes allow registered electricians to self-certify that their work complies with Building Regulations without having to submit a building notice or have the work inspected by Building Control."
  },
  {
    id: 'level2bldgregp6',
    question: "What certification must be issued upon completion of notifiable electrical work by a registered competent person?",
    options: ["Part P Compliance Certificate only", "Electrical Installation Certificate and Building Regulations Compliance Certificate", "Periodic Inspection Report", "Minor Works Certificate only"],
    correctAnswer: "Electrical Installation Certificate and Building Regulations Compliance Certificate",
    explanation: "Upon completion of notifiable work, a registered competent person must issue an Electrical Installation Certificate (or Minor Works Certificate if appropriate) and a Building Regulations Compliance Certificate."
  },
  {
    id: 'level2bldgregp7',
    question: "What is the time limit for notifying Building Control before commencing notifiable electrical work if not using a registered competent person?",
    options: ["24 hours", "48 hours", "Before work begins", "Within 30 days of completion"],
    correctAnswer: "Before work begins",
    explanation: "If not using a registered competent person, Building Control must be notified before notifiable electrical work begins by submitting a building notice or full plans application."
  },
  {
    id: 'level2bldgregp8',
    question: "Which of the following is NOT a requirement under Part P?",
    options: ["Compliance with BS 7671", "All electrical work must be carried out by qualified electricians", "Protection against fire hazards", "Protection against electric shock"],
    correctAnswer: "All electrical work must be carried out by qualified electricians",
    explanation: "Part P does not specifically require that all electrical work be carried out by qualified electricians. It requires that work is done safely and meets standards, but non-notifiable work can legally be done by non-qualified persons."
  },
  {
    id: 'level2bldgregp9',
    question: "Under Part P, who is responsible for ensuring that electrical work complies with the Building Regulations?",
    options: ["Only qualified electricians", "Only Building Control", "The building owner and the person carrying out the work", "The local authority"],
    correctAnswer: "The building owner and the person carrying out the work",
    explanation: "Under Part P, both the building owner and the person carrying out the work share responsibility for ensuring compliance with Building Regulations."
  },
  {
    id: 'level2bldgregp10',
    question: "Which of the following is notifiable work under Part P in a bathroom?",
    options: ["Replacing a light switch outside the bathroom", "Replacing an electric shower with the same type", "Adding a new lighting circuit", "Replacing a damaged shaver socket"],
    correctAnswer: "Adding a new lighting circuit",
    explanation: "Installing a new circuit, such as a lighting circuit in a bathroom (which is a special location), is notifiable work under Part P."
  },
  {
    id: 'level2bldgregp11',
    question: "What happens if notifiable electrical work is carried out without proper notification or certification?",
    options: ["A warning is issued", "The work must be redone", "Building Control can require the work to be opened up for inspection or rectified", "The property cannot be sold"],
    correctAnswer: "Building Control can require the work to be opened up for inspection or rectified",
    explanation: "If notifiable work is done without proper notification or certification, Building Control can require the work to be opened up for inspection and/or rectified if found to be non-compliant, which can be costly."
  },
  {
    id: 'level2bldgregp12',
    question: "When did Part P of the Building Regulations first come into force?",
    options: ["1990", "2005", "2013", "2018"],
    correctAnswer: "2005",
    explanation: "Part P of the Building Regulations first came into force on January 1, 2005, though it has been amended several times since then."
  },
  {
    id: 'level2bldgregp13',
    question: "Which standard must electrical work comply with to satisfy Part P requirements?",
    options: ["BS 5839", "BS 7671", "BS 5266", "BS 6004"],
    correctAnswer: "BS 7671",
    explanation: "To comply with Part P, electrical work must meet the requirements of BS 7671 (IET Wiring Regulations), which is the national standard for electrical installations in the UK."
  },
  {
    id: 'level2bldgregp14',
    question: "What is the status of Part P in Scotland?",
    options: ["It applies in the same way as England", "It applies with minor differences", "It does not apply, as Scotland has its own building standards", "It only applies to new buildings"],
    correctAnswer: "It does not apply, as Scotland has its own building standards",
    explanation: "Part P does not apply in Scotland, which has its own building standards system. In Scotland, electrical safety is covered by the Building (Scotland) Regulations."
  },
  {
    id: 'level2bldgregp15',
    question: "Which of the following is NOT a valid way to comply with Part P for notifiable work?",
    options: ["Using a registered competent person", "Submitting a building notice to Building Control", "Having the work checked by Building Control", "Getting a recommendation from a friend"],
    correctAnswer: "Getting a recommendation from a friend",
    explanation: "Getting a recommendation from a friend is not a valid way to comply with Part P. Valid methods include using a registered competent person, submitting a building notice or full plans, or having an unregistered person's work checked by Building Control."
  },
  {
    id: 'level2bldgregp16',
    question: "What does an 'Electrical Installation Condition Report' (EICR) provide under Part P?",
    options: ["Certification of new work", "Certification of the whole installation", "An assessment of an existing installation", "Registration as a competent person"],
    correctAnswer: "An assessment of an existing installation",
    explanation: "An EICR provides an assessment of the condition of an existing electrical installation, identifying any deterioration, damage, or non-compliance that may need attention."
  },
  {
    id: 'level2bldgregp17',
    question: "Which of the following is the correct definition of a 'special location' under Part P?",
    options: ["Any location that requires special tools", "Any location with a high risk of electric shock", "Locations such as bathrooms, kitchens, swimming pools, and garden installations", "Any location more than 2m above floor level"],
    correctAnswer: "Locations such as bathrooms, kitchens, swimming pools, and garden installations",
    explanation: "Special locations under Part P include bathrooms, kitchens, swimming pools, and garden installations, as these areas present increased risks of electric shock or fire."
  },
  {
    id: 'level2bldgregp18',
    question: "Under Part P, when is replacing a consumer unit considered notifiable work?",
    options: ["Only in commercial properties", "Only when increasing the number of circuits", "Always, regardless of location", "Only when adding an RCD"],
    correctAnswer: "Always, regardless of location",
    explanation: "Replacing a consumer unit is always notifiable work under Part P, regardless of its location within a dwelling, due to the safety-critical nature of this component."
  },
  {
    id: 'level2bldgregp19',
    question: "What type of certificate should be issued for minor electrical work that doesn't involve a new circuit?",
    options: ["Building Regulations Compliance Certificate only", "Electrical Installation Certificate", "Minor Electrical Installation Works Certificate", "Part P Compliance Statement"],
    correctAnswer: "Minor Electrical Installation Works Certificate",
    explanation: "A Minor Electrical Installation Works Certificate is appropriate for minor work that doesn't include the installation of a new circuit, such as adding a socket to an existing circuit."
  },
  {
    id: 'level2bldgregp20',
    question: "Which of the following work would NOT be notifiable under Part P?",
    options: ["Installing a new shower circuit", "Installing garden lighting", "Adding a socket to an existing circuit in a dining room", "Rewiring a kitchen"],
    correctAnswer: "Adding a socket to an existing circuit in a dining room",
    explanation: "Adding a socket to an existing circuit in a dining room is not notifiable, as it's neither in a special location nor involves installing a new circuit."
  },
  {
    id: 'level2bldgregp21',
    question: "What is the purpose of a Building Regulations Compliance Certificate?",
    options: ["To show the electrician is qualified", "To prove the work complies with Part P and other applicable Building Regulations", "To record the test results", "To register the property with the local authority"],
    correctAnswer: "To prove the work complies with Part P and other applicable Building Regulations",
    explanation: "A Building Regulations Compliance Certificate is issued by a registered competent person or Building Control to confirm that the work complies with Part P and other applicable Building Regulations."
  },
  {
    id: 'level2bldgregp22',
    question: "How long should records of electrical work completed under Part P be kept?",
    options: ["At least 1 year", "At least 5 years", "At least 10 years", "Indefinitely"],
    correctAnswer: "Indefinitely",
    explanation: "Records of electrical work completed under Part P should ideally be kept indefinitely as they form part of the property's documentation and may be required when selling the property or for future reference."
  },
  {
    id: 'level2bldgregp23',
    question: "Which of these extensions to a dwelling would make electrical work notifiable under Part P?",
    options: ["Only extensions including a kitchen or bathroom", "Only extensions over 30 square meters", "Any extension that requires a new circuit", "Only extensions requiring planning permission"],
    correctAnswer: "Any extension that requires a new circuit",
    explanation: "In any extension to a dwelling, the installation of a new circuit would be notifiable work under Part P, regardless of the type or size of the extension."
  },
  {
    id: 'level2bldgregp24',
    question: "What is the main difference between a 'building notice' and 'full plans' application under Building Regulations?",
    options: ["A building notice is cheaper", "A building notice doesn't require notification", "Full plans require detailed drawings and specifications to be approved before work starts", "Full plans are only required for commercial properties"],
    correctAnswer: "Full plans require detailed drawings and specifications to be approved before work starts",
    explanation: "A 'full plans' application requires detailed drawings and specifications to be submitted and approved before work starts, while a 'building notice' is simpler but provides less certainty that the work will comply with regulations."
  },
  {
    id: 'level2bldgregp25',
    question: "Under Part P, which of the following is considered a 'material alteration' to an electrical installation?",
    options: ["Changing a light bulb", "Replacing a damaged socket with the same type", "Work that would make the installation less safe than before", "Painting an electrical enclosure"],
    correctAnswer: "Work that would make the installation less safe than before",
    explanation: "A 'material alteration' under Part P is work that would make the electrical installation less safe than it was before the work was carried out, which would not comply with regulations."
  }
];

// ✅ Upload function
// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'electrical-l2-building-regs', 'items', q.id), {
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
