// ✅ COMPLETE: npx ts-node scripts/joinery/level2/uploadLevel2Materials.ts

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

// ✅ Joinery Level 2 Materials Knowledge Questions
const questions = [
  {
    id: 'joinery-l2-materials1',
    question: "What is the difference between exterior grade plywood and interior grade plywood?",
    options: ["There is no difference except the price", "Exterior grade is always made from hardwood while interior grade uses softwood", "Exterior grade uses waterproof adhesives while interior grade uses moisture-resistant adhesives", "Exterior grade is always thicker than interior grade"],
    correctAnswer: "Exterior grade uses waterproof adhesives while interior grade uses moisture-resistant adhesives",
    explanation: "Exterior grade uses waterproof phenol-formaldehyde adhesives, while interior grade uses moisture-resistant urea-formaldehyde adhesives."
  },
  {
    id: 'joinery-l2-materials2',
    question: "Which of the following adhesives is most appropriate for exterior joinery applications?",
    options: ["PU (Polyurethane)", "PVA (Polyvinyl Acetate)", "UF (Urea Formaldehyde)", "Animal hide glue"],
    correctAnswer: "PU (Polyurethane)",
    explanation: "Polyurethane creates waterproof bonds that withstand outdoor conditions and remain flexible after curing."
  },
  {
    id: 'joinery-l2-materials3',
    question: "What is MDF (Medium Density Fibreboard) made from?",
    options: ["Plastic and wood composite", "Solid timber compressed under high pressure", "Resin-bonded wood fibres", "Layers of veneer glued together"],
    correctAnswer: "Resin-bonded wood fibres",
    explanation: "MDF consists of wood fibres broken down and bonded with resin under heat and pressure."
  },
  {
    id: 'joinery-l2-materials4',
    question: "What is the purpose of a wood hardener product in joinery?",
    options: ["To accelerate the natural hardening process of freshly cut timber", "To create a protective barrier against UV damage", "To make all timber harder and more durable", "To strengthen softened or decayed wood by penetrating and reinforcing the wood fibres"],
    correctAnswer: "To strengthen softened or decayed wood by penetrating and reinforcing the wood fibres",
    explanation: "Wood hardeners penetrate decayed areas to stabilize and reinforce weakened timber fibres."
  },
  {
    id: 'joinery-l2-materials5',
    question: "Which of the following sheet materials has the highest moisture resistance?",
    options: ["Marine plywood", "Standard MDF", "Chipboard", "OSB (Oriented Strand Board)"],
    correctAnswer: "Marine plywood",
    explanation: "Marine plywood uses WBP adhesives and high-quality veneers throughout for superior moisture resistance."
  },
  {
    id: 'joinery-l2-materials6',
    question: "What is the main advantage of using laminated timber components over solid timber in joinery?",
    options: ["They are always less expensive", "They can only be used in decorative applications", "Greater dimensional stability and reduced movement", "They are lighter and easier to transport"],
    correctAnswer: "Greater dimensional stability and reduced movement",
    explanation: "Laminated timber's alternating grain directions counteract natural movement, providing greater dimensional stability."
  },
  {
    id: 'joinery-l2-materials7',
    question: "What type of glass should be used in a door panel below 800mm from floor level according to UK Building Regulations?",
    options: ["Standard float glass", "Wired glass", "Textured obscured glass", "Toughened or laminated safety glass"],
    correctAnswer: "Toughened or laminated safety glass",
    explanation: "Safety glass is required in critical locations to reduce injury risk if broken."
  },
  {
    id: 'joinery-l2-materials8',
    question: "What is 'finger-jointed' timber and what is its primary advantage?",
    options: ["Short lengths of timber joined together using interlocking 'fingers' to create longer pieces, providing stability and efficient use of material", "Timber with special grooves cut for improved grip", "A special timber species with naturally interlocking grain", "Timber that has been shaped to provide a finger-grip profile"],
    correctAnswer: "Short lengths of timber joined together using interlocking 'fingers' to create longer pieces, providing stability and efficient use of material",
    explanation: "Finger-jointed timber joins short lengths with interlocking cuts, creating stable longer pieces from offcuts."
  },
  {
    id: 'joinery-l2-materials9',
    question: "What type of timber preservative treatment provides the deepest penetration?",
    options: ["Spray application", "Brush-applied preservative", "Pressure treatment", "Dip treatment"],
    correctAnswer: "Pressure treatment",
    explanation: "Pressure treatment forces preservative deep into wood using vacuum and pressure cycles."
  },
  {
    id: 'joinery-l2-materials10',
    question: "Which of the following is a suitable material for exterior window cills (sills)?",
    options: ["Untreated pine", "Beech", "Standard MDF", "Oak"],
    correctAnswer: "Oak",
    explanation: "Oak's natural durability and decay resistance make it suitable for exposed exterior applications."
  },
  {
    id: 'joinery-l2-materials11',
    question: "What is the benefit of using intumescent seals in fire door assemblies?",
    options: ["They improve soundproofing only", "They expand when exposed to heat, sealing gaps to prevent fire and smoke spread", "They prevent drafts only", "They make the door easier to open in an emergency"],
    correctAnswer: "They expand when exposed to heat, sealing gaps to prevent fire and smoke spread",
    explanation: "Intumescent seals expand when heated, creating a char that blocks flame and smoke passage."
  },
  {
    id: 'joinery-l2-materials12',
    question: "What is the primary reason for using concealed door closers rather than overhead closers in some joinery applications?",
    options: ["They require less maintenance", "They are always less expensive", "Aesthetic reasons - they are hidden when the door is closed", "They provide greater closing force"],
    correctAnswer: "Aesthetic reasons - they are hidden when the door is closed",
    explanation: "Concealed closers provide cleaner appearance by hiding the mechanism within door or frame."
  },
  {
    id: 'joinery-l2-materials13',
    question: "Which material is commonly used as a core material in flush doors to provide fire resistance?",
    options: ["Solid timber", "Expanded polystyrene", "Particleboard", "Honeycomb paper"],
    correctAnswer: "Particleboard",
    explanation: "Particleboard's dense structure provides good fire resistance in flush fire doors."
  },
  {
    id: 'joinery-l2-materials14',
    question: "What is the purpose of a DPC (Damp Proof Course) in relation to timber door and window frames?",
    options: ["To reduce noise transmission", "To make the frames more resistant to impact damage", "To prevent moisture transfer from masonry into timber", "To improve thermal insulation"],
    correctAnswer: "To prevent moisture transfer from masonry into timber",
    explanation: "DPCs create waterproof barriers preventing moisture migration from masonry into timber components."
  },
  {
    id: 'joinery-l2-materials15',
    question: "What is the primary reason for specifying toughened glass rather than laminated glass in certain applications?",
    options: ["Toughened glass is always cheaper", "Toughened glass blocks more UV radiation", "Toughened glass has greater impact resistance and breaks into small cubes rather than sharp shards", "Toughened glass provides better thermal insulation"],
    correctAnswer: "Toughened glass has greater impact resistance and breaks into small cubes rather than sharp shards",
    explanation: "Toughened glass offers higher impact strength and breaks into small, relatively harmless fragments."
  },
  {
    id: 'joinery-l2-materials16',
    question: "What type of material is most commonly used for modern window weatherseals in the UK?",
    options: ["Cotton wool", "Cork", "Felt", "EPDM or silicone rubber"],
    correctAnswer: "EPDM or silicone rubber",
    explanation: "Synthetic rubbers offer excellent weathering properties, UV resistance and long-term flexibility."
  },
  {
    id: 'joinery-l2-materials17',
    question: "What is the advantage of using engineered flooring over solid timber flooring?",
    options: ["It is more resistant to fire", "It offers greater dimensional stability with less expansion and contraction", "It is always less expensive", "It is always made from sustainable sources"],
    correctAnswer: "It offers greater dimensional stability with less expansion and contraction",
    explanation: "Engineered flooring's cross-ply construction reduces expansion and contraction with moisture changes."
  },
  {
    id: 'joinery-l2-materials18',
    question: "Which of the following door core constructions provides the best acoustic performance?",
    options: ["Hollow core", "Solid particleboard core", "Honeycomb core", "Lock block construction (solid timber rails and stiles with hollow centers)"],
    correctAnswer: "Solid particleboard core",
    explanation: "Solid particleboard's dense structure blocks sound transmission better than doors with hollow spaces."
  },
  {
    id: 'joinery-l2-materials19',
    question: "What is the purpose of primer on exterior joinery?",
    options: ["To improve the wood's strength", "To prevent insects from attacking the wood", "To add color only", "To seal the timber, improve coating adhesion, and provide initial protection"],
    correctAnswer: "To seal the timber, improve coating adhesion, and provide initial protection",
    explanation: "Primers seal timber, improve topcoat adhesion and provide initial weather protection."
  },
  {
    id: 'joinery-l2-materials20',
    question: "What is the purpose of a shadow gap in joinery design?",
    options: ["To allow for structural movement and prevent visible cracks at material junctions", "To create interesting shadow effects purely for decoration", "To reduce the amount of material needed", "To improve sound insulation"],
    correctAnswer: "To allow for structural movement and prevent visible cracks at material junctions",
    explanation: "Shadow gaps accommodate structural movement and material expansion/contraction while creating visual separation."
  },
  {
    id: 'joinery-l2-materials21',
    question: "Which type of hinge is most appropriate for hanging a heavy hardwood entrance door?",
    options: ["Piano hinge", "Butt hinges", "Concealed hinges", "Rising butt hinges"],
    correctAnswer: "Butt hinges",
    explanation: "Butt hinges provide the strength and durability needed for heavy external doors."
  },
  {
    id: 'joinery-l2-materials22',
    question: "What is the primary advantage of using water-based polyurethane finishes rather than traditional oil-based varnishes?",
    options: ["They penetrate deeper into the timber", "Lower VOC emissions, faster drying, and easier clean-up", "They are always more glossy", "They are always cheaper than oil-based products"],
    correctAnswer: "Lower VOC emissions, faster drying, and easier clean-up",
    explanation: "Water-based finishes offer environmental benefits, faster drying times and simpler soap-and-water cleanup."
  },
  {
    id: 'joinery-l2-materials23',
    question: "What material is typically used to create a fire-resistant glazing seal in a fire-rated door or screen?",
    options: ["Acrylic gap filler", "Natural rubber gasket", "Intumescent mastic or tape", "Standard silicone sealant"],
    correctAnswer: "Intumescent mastic or tape",
    explanation: "Intumescent materials expand when heated, sealing gaps around glazing to maintain fire resistance."
  },
  {
    id: 'joinery-l2-materials24',
    question: "What type of adhesive is most appropriate for bonding timber to metal?",
    options: ["Animal hide glue", "PVA (Polyvinyl Acetate)", "Epoxy", "Urea formaldehyde"],
    correctAnswer: "Epoxy",
    explanation: "Epoxy creates strong bonds between dissimilar materials with excellent gap-filling properties."
  },
  {
    id: 'joinery-l2-materials25',
    question: "What is the main advantage of using multipoint locking systems on external doors?",
    options: ["They eliminate the need for a handle", "They are always less expensive than traditional locks", "They are easier to install than traditional locks", "They provide improved security by engaging the door at multiple points around the frame"],
    correctAnswer: "They provide improved security by engaging the door at multiple points around the frame",
    explanation: "Multipoint locks secure doors at multiple locations around the frame, enhancing security and weather sealing."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l2-materials', 'items', q.id), {
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
