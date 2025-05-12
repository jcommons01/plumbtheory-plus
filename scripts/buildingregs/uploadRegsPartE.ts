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

// ✅ Building Regulations Part E - Sound Insulation Questions
const questions = [
  {
    id: 'regs-part-e-1',
    question: "What is the main purpose of Approved Document E?",
    options: ["To ensure adequate ventilation in buildings", "To provide guidance on fire safety measures", "To ensure adequate resistance to the passage of sound", "To provide guidance on energy efficiency"],
    correctAnswer: "To ensure adequate resistance to the passage of sound",
    explanation: "The main purpose of Approved Document E is to ensure adequate resistance to the passage of sound. It provides practical guidance on meeting the sound insulation requirements specified in Part E of the Building Regulations. The document covers protection against sound from other parts of the building and adjoining buildings (airborne and impact sound transmission) as well as acoustic conditions within the building, including sound absorption in common areas and reverberation in rooms."
  },
  {
    id: 'regs-part-e-2',
    question: "What is the minimum airborne sound insulation required between new dwellings (DnT,w + Ctr)?",
    options: ["40 dB", "43 dB", "45 dB", "53 dB"],
    correctAnswer: "45 dB",
    explanation: "The minimum airborne sound insulation required between new dwellings is 45 dB (DnT,w + Ctr). This standard applies to separating walls and floors between adjacent dwellings (houses, flats, or rooms for residential purposes). The measurement DnT,w + Ctr is a weighted standardized level difference that accounts for the specific characteristics of typical domestic noise. This minimum performance standard helps ensure that occupants have reasonable sound privacy and are not unduly disturbed by normal activities in adjacent dwellings."
  },
  {
    id: 'regs-part-e-3',
    question: "What are 'Robust Details' in the context of Part E?",
    options: ["Exceptionally strong construction methods", "Pre-approved construction details that don't require pre-completion testing", "Detailed drawings showing construction techniques", "Sound insulation details that exceed minimum requirements by at least 5dB"],
    correctAnswer: "Pre-approved construction details that don't require pre-completion testing",
    explanation: "Robust Details are pre-approved construction details that don't require pre-completion testing under Part E. They are standardized construction specifications that have been independently tested and consistently shown to exceed the minimum sound insulation requirements. By using these approved details and registering each plot, developers can avoid the need for pre-completion sound testing. Robust Details Ltd maintains and administers the scheme, providing detailed specifications and conducting random site inspections to ensure compliance."
  },
  {
    id: 'regs-part-e-4',
    question: "Which of the following building types falls under the requirements of Part E?",
    options: ["Only residential buildings", "Only commercial buildings", "Only educational buildings", "Residential, educational, and some commercial buildings"],
    correctAnswer: "Residential, educational, and some commercial buildings",
    explanation: "Part E applies to residential, educational, and some commercial buildings. Specifically, it covers dwellings (houses and flats), rooms for residential purposes (including student accommodation, hotels, etc.), schools, and other educational buildings. The requirements vary according to building type, with different performance standards and approaches for different categories. For example, schools have specific requirements related to acoustic design to support teaching and learning, while the focus for dwellings is on preventing disturbance between separate units."
  },
  {
    id: 'regs-part-e-5',
    question: "What is 'impact sound' as defined in Part E?",
    options: ["Sound from impact damage to a building", "Sound from one-off loud noises like slammed doors", "Sound transmitted through a building by impacts on floors and stairs", "Sound from external impacts like vehicles hitting the building"],
    correctAnswer: "Sound transmitted through a building by impacts on floors and stairs",
    explanation: "Impact sound, as defined in Part E, is sound transmitted through a building by impacts on floors and stairs. This includes footsteps, dropped objects, furniture being moved, and similar impacts directly on the building structure. Unlike airborne sound, which travels through the air before reaching the structure, impact sound originates within the structure itself, making it particularly difficult to control. Part E sets specific requirements for impact sound insulation in separating floors to limit disturbance from these everyday activities."
  },
  {
    id: 'regs-part-e-6',
    question: "What is the maximum impact sound transmission (L'nT,w) permitted through separating floors between new dwellings?",
    options: ["48 dB", "54 dB", "62 dB", "65 dB"],
    correctAnswer: "62 dB",
    explanation: "The maximum impact sound transmission (L'nT,w) permitted through separating floors between new dwellings is 62 dB. This is a limit rather than a minimum - lower values indicate better performance. The requirement applies to separating floors between dwellings, including houses, flats, and rooms for residential purposes. Impact sound is measured by standardized impact testing that simulates footsteps and other impacts, with the resulting noise level measured in the room below. This standard helps ensure reasonable protection from overhead impact noises."
  },
  {
    id: 'regs-part-e-7',
    question: "What is 'flanking transmission' in the context of sound insulation?",
    options: ["Sound passing through windows and doors", "Sound passing around rather than directly through a separating element", "Sound from flanking buildings", "Sound that reflects off multiple surfaces"],
    correctAnswer: "Sound passing around rather than directly through a separating element",
    explanation: "Flanking transmission refers to sound passing around rather than directly through a separating element. This occurs when sound travels via connected elements such as external walls, floors, or ceilings that join to the separating wall or floor. Even with a well-insulated separating element, poor detailing at junctions can create flanking paths that significantly reduce overall sound insulation. Approved Document E emphasizes the importance of proper junction detailing to minimize flanking transmission, recognizing it as a common cause of sound insulation failure."
  },
  {
    id: 'regs-part-e-8',
    question: "What is 'pre-completion testing' in relation to Part E?",
    options: ["Testing building materials before construction begins", "Sound testing carried out between completion and occupation", "Testing acoustics before finalizing the building design", "Testing carried out on a sample of finished but unoccupied properties"],
    correctAnswer: "Testing carried out on a sample of finished but unoccupied properties",
    explanation: "Pre-completion testing involves sound tests carried out on a sample of finished but unoccupied properties to demonstrate compliance with Part E requirements. This testing must be conducted by an approved tester using standardized methods to measure airborne and impact sound insulation. Testing is required on a proportion of properties within a development unless Robust Details are used. Failed tests require remedial work and retesting. This direct performance verification approach ensures that the as-built construction meets the regulatory sound insulation standards."
  },
  {
    id: 'regs-part-e-9',
    question: "Which type of floor construction typically provides better impact sound insulation?",
    options: ["Concrete floor with soft floor covering", "Timber floor with carpet", "Concrete floor with ceramic tiles", "Timber floor with timber boards"],
    correctAnswer: "Concrete floor with soft floor covering",
    explanation: "A concrete floor with soft floor covering typically provides better impact sound insulation. The mass of concrete provides good basic sound insulation, while the soft covering (like carpet) reduces impact noise generation at source. This combination addresses both the transmission path (concrete mass) and the source (soft covering). In contrast, hard floor finishes on either concrete or timber floors generally result in higher impact sound transmission. Approved Document E recognizes this in its guidance, where concrete floors with appropriate floating floor treatments and soft coverings feature prominently."
  },
  {
    id: 'regs-part-e-10',
    question: "What is a typical method to improve sound insulation in a timber separating floor?",
    options: ["Simply increasing the thickness of floorboards", "Adding a concrete layer only", "Creating a floating floor with resilient layer and independent ceiling", "Sealing all gaps with acoustic sealant only"],
    correctAnswer: "Creating a floating floor with resilient layer and independent ceiling",
    explanation: "A typical method to improve sound insulation in a timber separating floor is creating a floating floor with a resilient layer and independent ceiling. The floating floor (timber decking on resilient layer) reduces impact sound transmission, while the independent ceiling (typically plasterboard on separate joists or resilient bars) improves airborne sound insulation. Additional improvements come from absorbent material in the cavity between joists. This multi-faceted approach addresses different sound transmission mechanisms simultaneously, creating a much better performing system than any single measure alone."
  },
  {
    id: 'regs-part-e-11',
    question: "What minimum sound absorption area is required in the common entrance halls of apartment buildings according to Part E?",
    options: ["No specific requirement is given", "At least 25% of the floor area", "Equivalent to the floor area", "Equivalent to the combined floor and ceiling area"],
    correctAnswer: "Equivalent to the floor area",
    explanation: "According to Part E, common entrance halls of apartment buildings require a minimum sound absorption area equivalent to the floor area. This sound absorption, typically provided through acoustic ceiling tiles, wall panels, or other absorbent treatments, helps reduce noise levels in these shared spaces by minimizing sound reflections. The requirement aims to create a more comfortable acoustic environment in communal areas and reduce the transmission of noise from these spaces into adjoining dwellings. Specific material specifications are provided in terms of absorption coefficients at different frequencies."
  },
  {
    id: 'regs-part-e-12',
    question: "What type of junction detail is recommended where a timber separating floor meets an external masonry cavity wall?",
    options: ["The floor should bridge the cavity", "The cavity should continue past the floor with suitable cavity barriers", "The cavity should be fully filled with mortar at the junction", "There are no specific recommendations for this junction"],
    correctAnswer: "The cavity should continue past the floor with suitable cavity barriers",
    explanation: "Where a timber separating floor meets an external masonry cavity wall, Approved Document E recommends that the cavity should continue past the floor with suitable cavity barriers. This detail helps minimize flanking transmission by preventing a direct connection between the inner and outer leaves of the cavity wall at the floor junction. Appropriate fire-resistant cavity barriers must be installed to maintain fire compartmentation while allowing the cavity to interrupt the potential flanking path. This is one of many specific junction details illustrated in the document to control flanking transmission."
  },
  {
    id: 'regs-part-e-13',
    question: "What is the purpose of staggering electrical outlets on opposite sides of a separating wall?",
    options: ["To meet electrical safety regulations", "To make wiring installation easier", "To prevent direct sound paths through the wall", "To allow for more outlets per room"],
    correctAnswer: "To prevent direct sound paths through the wall",
    explanation: "Staggering electrical outlets on opposite sides of a separating wall prevents direct sound paths through the wall. When outlets are placed directly back-to-back, they create a weakness in the wall's sound insulation by reducing the effective wall thickness at that point and potentially creating a direct air path. By offsetting the positions of outlets on opposite sides, the overall integrity of the sound-insulating wall is better maintained. This simple detail is one of many recommended in Approved Document E to maintain the designed acoustic performance of separating elements."
  },
  {
    id: 'regs-part-e-14',
    question: "Which of the following best describes the 'mass-spring-mass' principle in sound insulation?",
    options: ["Using heavyweight construction materials only", "Creating a wall with specific mathematical proportions", "Connecting two massive layers with a resonant spring structure", "Separating two massive layers with an airspace or resilient layer"],
    correctAnswer: "Separating two massive layers with an airspace or resilient layer",
    explanation: "The mass-spring-mass principle involves separating two massive layers with an airspace or resilient layer. This acoustic design approach creates a resonant system where the 'spring' (air gap or resilient material) between two 'masses' (dense layers like plasterboard, masonry, or concrete) significantly improves sound insulation compared to a single layer of equivalent total mass. Many effective sound-insulating constructions in Approved Document E utilize this principle, including cavity masonry walls, double-leaf timber constructions, and floating floors with resilient layers."
  },
  {
    id: 'regs-part-e-15',
    question: "When is sound insulation testing required for building conversions under Part E?",
    options: ["Only for conversions to flats", "For all building conversions regardless of previous use", "For material change of use to residential from another use", "Testing is never required for conversions, only for new builds"],
    correctAnswer: "For material change of use to residential from another use",
    explanation: "Sound insulation testing is required for material change of use to residential from another use under Part E. This applies when buildings are converted to create new dwellings, rooms for residential purposes, or educational buildings. The testing verifies that the converted building meets the appropriate sound insulation standards for its new use. Unlike new builds, conversions don't have the Robust Details option to avoid testing. This requirement recognizes the acoustic challenges often presented by adapting existing structures for noise-sensitive residential use."
  },
  {
    id: 'regs-part-e-16',
    question: "What is the minimum airborne sound insulation (DnT,w + Ctr) required between rooms within a dwelling, specifically between a bedroom or WC and other rooms?",
    options: ["40 dB", "43 dB", "45 dB", "There is no specific requirement for this situation"],
    correctAnswer: "40 dB",
    explanation: "The minimum airborne sound insulation (DnT,w + Ctr) required between a bedroom or WC and other rooms within a dwelling is 40 dB. This standard, introduced to provide a reasonable degree of sound privacy between rooms in the same home, applies specifically to walls between bedrooms or WCs and other rooms. It doesn't apply to walls with doors (including walls between en-suite bathrooms and bedrooms). This internal sound insulation requirement recognizes the need for privacy within dwellings while being less stringent than the standards between separate dwellings."
  },
  {
    id: 'regs-part-e-17',
    question: "What is the recommended construction for internal walls that need to provide sound insulation within a dwelling?",
    options: ["Any standard stud partition", "A masonry wall at least 100mm thick", "A cavity masonry wall only", "A single layer of plasterboard on each side of a timber or metal stud frame with absorbent material in the cavity"],
    correctAnswer: "A single layer of plasterboard on each side of a timber or metal stud frame with absorbent material in the cavity",
    explanation: "For internal walls providing sound insulation within a dwelling, Approved Document E recommends a single layer of plasterboard on each side of a timber or metal stud frame with absorbent material in the cavity. This relatively lightweight construction typically achieves the 40 dB requirement for internal walls between bedrooms or WCs and other rooms. The absorbent material (like mineral wool) in the cavity significantly improves performance compared to an empty cavity. Alternative constructions, such as masonry walls with appropriate finishes, can also meet this standard."
  },
  {
    id: 'regs-part-e-18',
    question: "What is the benefit of using resilient bars in sound insulating wall or ceiling constructions?",
    options: ["They provide additional structural reinforcement", "They create a fire barrier within the construction", "They mechanically decouple the plasterboard from the frame, reducing sound transmission", "They increase the mass of the overall construction"],
    correctAnswer: "They mechanically decouple the plasterboard from the frame, reducing sound transmission",
    explanation: "The benefit of resilient bars in sound insulating constructions is that they mechanically decouple the plasterboard from the frame, reducing sound transmission. These metal channels are fixed horizontally to studs or joists, with the plasterboard then attached to the bars rather than directly to the frame. This creates a spring-like isolation that interrupts the direct transmission path for sound vibrations. Resilient bars are a cost-effective way to significantly improve the acoustic performance of lightweight framed walls and ceilings, particularly for airborne sound insulation."
  },
  {
    id: 'regs-part-e-19',
    question: "What is the purpose of an acoustic floating floor in a separating floor construction?",
    options: ["To increase the floor height", "To create a decorative finish", "To allow for underfloor heating systems", "To reduce impact sound transmission"],
    correctAnswer: "To reduce impact sound transmission",
    explanation: "The primary purpose of an acoustic floating floor is to reduce impact sound transmission. This construction involves a walking surface (like chipboard or screed) that 'floats' on a resilient layer (such as mineral wool, foam, or rubber crumb products) without rigid connections to the structural floor or surrounding walls. When impacts occur on the surface, the resilient layer absorbs and dampens the vibrations, preventing them from transferring effectively to the structure. Floating floors are one of the most effective methods for controlling impact sound through separating floors."
  },
  {
    id: 'regs-part-e-20',
    question: "In a room for residential purposes, what is the minimum airborne sound insulation (DnT,w + Ctr) required for walls separating a kitchen or bathroom from a bedroom?",
    options: ["40 dB", "43 dB", "45 dB", "There is no specific requirement for this situation"],
    correctAnswer: "43 dB",
    explanation: "In a room for residential purposes (like student accommodation or hotels), the minimum airborne sound insulation (DnT,w + Ctr) required for walls separating a kitchen or bathroom from a bedroom is 43 dB. This requirement is more stringent than the 40 dB standard for walls between rooms within a typical dwelling but less than the 45 dB required between separate dwellings. This intermediate standard recognizes the higher potential for disturbance between these specific room types in shared accommodation where occupants may not be part of the same household."
  },
  {
    id: 'regs-part-e-21',
    question: "What proportion of new dwelling developments typically require pre-completion sound testing if not using Robust Details?",
    options: ["Every dwelling must be tested", "A minimum of one in ten dwellings of each type", "Only end-of-terrace and top-floor dwellings", "Only dwellings selected by Building Control"],
    correctAnswer: "A minimum of one in ten dwellings of each type",
    explanation: "Typically, a minimum of one in ten dwellings of each type requires pre-completion sound testing if not using Robust Details. This testing regime applies to groups of similar dwelling types, with each group (e.g., houses, flats, flats with the same construction) treated separately. The sample should include the worst-case instances where possible (e.g., rooms with large areas of flanking walls). If test results meet the requirements, the untested dwellings in that group are deemed to comply. If tests fail, remedial work and additional testing are required."
  },
  {
    id: 'regs-part-e-22',
    question: "What is a 'specified floor area' in relation to sound absorption requirements for common internal parts of buildings containing flats?",
    options: ["The total floor area of each apartment", "The floor area of shared lounges and dining rooms", "The floor area of entrance halls, corridors, and stairwells", "Any area specified by the building designer as needing acoustic treatment"],
    correctAnswer: "The floor area of entrance halls, corridors, and stairwells",
    explanation: "In relation to sound absorption requirements, a 'specified floor area' refers to the floor area of entrance halls, corridors, and stairwells in buildings containing flats. Approved Document E requires these common areas to have a sound absorption area at least equivalent to their floor area to control reverberation and reduce noise levels. This requirement helps create a more comfortable acoustic environment in these shared spaces and reduces the potential for noise to transmit from these areas into the adjoining dwellings."
  },
  {
    id: 'regs-part-e-23',
    question: "What key point does Approved Document E make about doorsets between corridors and rooms in residential buildings?",
    options: ["They must achieve the same sound insulation as the walls", "They must be self-closing", "They should have good perimeter sealing to minimize sound transmission", "There are no acoustic requirements for doorsets"],
    correctAnswer: "They should have good perimeter sealing to minimize sound transmission",
    explanation: "Approved Document E emphasizes that doorsets between corridors and rooms in residential buildings should have good perimeter sealing to minimize sound transmission. While doors are recognized as acoustically weaker than walls, proper sealing around the edges significantly improves their performance. This includes using compressible seals around the door frame and threshold seals or properly adjusted door bottoms to minimize gaps. Even well-sealed doors have limited sound insulation compared to walls, so the document doesn't set specific acoustic ratings for them."
  },
  {
    id: 'regs-part-e-24',
    question: "What additional sound insulation provision does Approved Document E recommend for rooms containing toilets that adjoin living spaces in separate dwellings?",
    options: ["Triple glazing between rooms", "At least 40 dB sound reduction", "A separate service duct or cupboard containing the WC cistern", "Solid core door with acoustic seals"],
    correctAnswer: "A separate service duct or cupboard containing the WC cistern",
    explanation: "For rooms containing toilets adjoining living spaces in separate dwellings, Approved Document E recommends providing a separate service duct or cupboard containing the WC cistern. This additional measure helps reduce the noise transmission from toilet flushing mechanisms, which can be particularly disturbing to neighbors. The service duct or cupboard creates an additional barrier that contains and attenuates these noise sources. This recommendation acknowledges that some noise sources require specific design solutions beyond the standard separating wall construction."
  },
  {
    id: 'regs-part-e-25',
    question: "What approach does Approved Document E take regarding sound insulation and ventilation requirements?",
    options: ["Ventilation should always take priority over sound insulation", "Sound insulation should always take priority over ventilation", "Both requirements should be met without compromising either", "These requirements are addressed in separate documents with no coordination"],
    correctAnswer: "Both requirements should be met without compromising either",
    explanation: "Approved Document E takes the approach that both sound insulation and ventilation requirements should be met without compromising either. The document acknowledges that these requirements can sometimes conflict, particularly when providing ventilation openings in sound-insulating structures. It emphasizes the need for appropriate solutions that maintain the integrity of sound insulation while ensuring adequate ventilation. This might involve acoustic ventilators, carefully designed air paths, or mechanical ventilation systems that avoid compromising acoustic separations, demonstrating the integrated approach needed across different Building Regulations requirements."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-e', 'items', q.id), {
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
