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

// ✅ Building Regulations Part Q - Security Questions
const questions = [
  {
    id: 'regs-part-q-1',
    question: "What is the primary purpose of Approved Document Q of the Building Regulations?",
    options: ["To improve energy efficiency in dwellings", "To ensure fire safety in dwellings", "To provide reasonable security against unauthorized access to dwellings", "To provide adequate ventilation in dwellings"],
    correctAnswer: "To provide reasonable security against unauthorized access to dwellings",
    explanation: "The primary purpose of Approved Document Q is to provide reasonable security against unauthorized access to dwellings. It was introduced in 2015 to ensure that new homes are built with adequate security measures to resist common methods of burglary. The document outlines requirements for the physical security of doors and windows, focusing on their ability to resist force and unauthorized entry. It applies to all new dwellings and aims to reduce crime by introducing minimum security standards, ensuring that entry points are sufficiently robust and fitted with appropriate hardware to deter opportunistic burglars."
  },
  {
    id: 'regs-part-q-2',
    question: "When did Part Q of the Building Regulations come into effect?",
    options: ["2010", "2013", "2015", "2020"],
    correctAnswer: "2015",
    explanation: "Part Q of the Building Regulations came into effect on October 1, 2015. It was a new addition to the Building Regulations, introduced in response to concerns about residential security and as part of the government's effort to reduce burglary rates in new homes. The document applies to new dwellings submitted for building control approval after this date. Before 2015, there were no specific building regulations addressing security standards for doors and windows in dwellings, though security features were often incorporated through other initiatives such as Secured by Design. Part Q established mandatory minimum security standards for the first time in building regulations history."
  },
  {
    id: 'regs-part-q-3',
    question: "What types of buildings does Part Q apply to?",
    options: ["All buildings including commercial and industrial", "Only residential buildings built before 2015", "New dwellings only", "All dwellings regardless of when they were built"],
    correctAnswer: "New dwellings only",
    explanation: "Part Q applies to new dwellings only, including new houses, flats, and maisonettes. It does not apply to existing dwellings, extensions to existing dwellings, or commercial buildings. The requirements specifically cover new-build homes where a building notice or full plans application was submitted to building control on or after October 1, 2015. This includes conversions of existing buildings into new dwellings (such as an office building being converted into apartments) but does not apply to renovations or improvements to existing homes. The focus on new dwellings allows security measures to be incorporated during the design and construction phase, which is more cost-effective than retrofitting."
  },
  {
    id: 'regs-part-q-4',
    question: "What does Part Q specifically require resistance against?",
    options: ["Only forced entry with heavy equipment", "Fire spread between properties", "Unauthorized access by casual or opportunist burglars", "Sound transmission between dwellings"],
    correctAnswer: "Unauthorized access by casual or opportunist burglars",
    explanation: "Part Q specifically requires resistance against unauthorized access by casual or opportunist burglars. The regulations are designed to ensure that doors and windows can withstand the typical methods used by opportunistic burglars, such as kicking, pushing, and using basic tools. The standard aims to delay and deter entry attempts rather than making a dwelling completely impenetrable, as this would be impractical. By focusing on casual burglars, the requirements establish a reasonable baseline of security that balances protection against the most common threats with practical and cost considerations, making dwellings more secure without requiring extensive security systems or fortress-like design."
  },
  {
    id: 'regs-part-q-5',
    question: "Which of the following is the recognized standard for compliant doors and windows under Part Q?",
    options: ["ISO 14001", "PAS 24", "BS 5839", "CE marking only"],
    correctAnswer: "PAS 24",
    explanation: "PAS 24 (Publicly Available Specification 24) is the recognized standard for compliant doors and windows under Part Q. This British standard specifies the enhanced security performance requirements for doorsets and windows to resist attack methods commonly used by opportunistic burglars. PAS 24 involves testing products against methods such as manual manipulation, mechanical loading, and tool attacks to ensure they can provide adequate resistance. Doors and windows that meet PAS 24 or an equivalent standard are deemed to satisfy the requirements of Part Q. The standard has been revised several times, with PAS 24:2022 being the current version, though compliance with previous versions may still be acceptable depending on when the building was constructed."
  },
  {
    id: 'regs-part-q-6',
    question: "Which elements of a dwelling must comply with the security requirements of Part Q?",
    options: ["All windows and doors regardless of location", "Only front entrance doors", "Easily accessible doors and windows", "Interior doors between rooms"],
    correctAnswer: "Easily accessible doors and windows",
    explanation: "The security requirements of Part Q apply to easily accessible doors and windows. 'Easily accessible' refers to elements that could be vulnerable to attack from the outside, including: all entrance doors to dwellings (including front, back, and side doors); doors from a dwelling into a shared area or communal space (such as from a flat into a corridor); and windows, rooflights, and roof windows that can be reached without the use of a ladder or are within 2 meters vertically of an accessible level (such as the ground, a balcony, or a flat roof). Interior doors between rooms within a dwelling do not need to comply with Part Q, nor do windows that are not easily accessible from the outside, such as those on upper floors with no easy means of access."
  },
  {
    id: 'regs-part-q-7',
    question: "What type of testing must a door undergo to demonstrate compliance with Part Q?",
    options: ["Only weather resistance testing", "Only visual inspection by a building inspector", "Security testing to PAS 24 or equivalent standard", "Just installation by a licensed contractor"],
    correctAnswer: "Security testing to PAS 24 or equivalent standard",
    explanation: "To demonstrate compliance with Part Q, a door must undergo security testing to PAS 24 or an equivalent standard. This testing involves subjecting the door to a series of physical attacks that simulate common burglary techniques, including shoulder-barging, kicking, and attacks with basic tools. The tests assess whether the door, frame, locks, and hinges can withstand these attacks for a specified period. The entire doorset (the complete assembly including the door, frame, locks, and hardware) must be tested as a unit, rather than just the individual components. Manufacturers typically provide documentation certifying that their products have passed these tests, which can be used to demonstrate compliance to building control authorities."
  },
  {
    id: 'regs-part-q-8',
    question: "What aspect of a window's security does Part Q NOT specifically address?",
    options: ["Resistance to attack with basic tools", "Glazing security", "Frame strength", "Alarm systems"],
    correctAnswer: "Alarm systems",
    explanation: "Part Q does not specifically address alarm systems for windows. The document focuses on the physical security elements of windows, including their resistance to forced entry, the security of glazing, and the strength of frames and hardware. While alarm systems can be an important part of a dwelling's overall security strategy, they are not mandated or specified within Part Q requirements. The regulations are concerned with ensuring that the window itself can physically resist break-in attempts through appropriate design, materials, and construction, rather than detection or alert systems after a breach has occurred. Homeowners may choose to install alarm systems as an additional security measure, but this would be separate from Part Q compliance."
  },
  {
    id: 'regs-part-q-9',
    question: "What does Part Q require for letter plates in entrance doors?",
    options: ["They must be positioned at a specific height", "They must have a maximum aperture size and include a security flap", "They must be made of brass or steel only", "They are not permitted in entrance doors"],
    correctAnswer: "They must have a maximum aperture size and include a security flap",
    explanation: "Part Q requires that letter plates in entrance doors have a maximum aperture size and include a security flap or other anti-fishing device. Specifically, the maximum aperture size should not exceed 260mm x 40mm, and the flap/device should prevent items being removed from inside the dwelling or someone reaching through to manipulate door locks from inside. These requirements aim to prevent a common burglary technique known as 'fishing,' where tools are inserted through the letter plate to grab keys or valuables, or to operate the door lock from the inside. The position of the letter plate should also be considered in relation to the door locks to minimize the risk of someone reaching through to access them."
  },
  {
    id: 'regs-part-q-10',
    question: "What is the maximum size for door viewers (peepholes) according to Part Q?",
    options: ["Part Q does not specify a maximum size for door viewers", "15mm diameter", "20mm diameter", "25mm diameter"],
    correctAnswer: "Part Q does not specify a maximum size for door viewers",
    explanation: "Part Q does not specify a maximum size for door viewers (peepholes) in entrance doors. While door viewers are a common and recommended security feature that allows occupants to see who is at the door before opening it, the specific dimensions are not regulated within Part Q. The document is primarily concerned with the resistance of doors and windows to forced entry rather than the specifications of supplementary security features like viewers. However, it's worth noting that door viewers, when installed, should be of good quality and positioned at an appropriate height for the occupants. Additionally, they should not compromise the overall security or fire performance of the door."
  },
  {
    id: 'regs-part-q-11',
    question: "According to Part Q, what is required for the main locks on external doors?",
    options: ["They must be electronic with key card access", "They must have a minimum of 5 levers", "They must meet the requirements of BS 3621 or equivalent", "They must always have a mortice and rim lock combination"],
    correctAnswer: "They must meet the requirements of BS 3621 or equivalent",
    explanation: "According to Part Q, the main locks on external doors must meet the requirements of BS 3621 or an equivalent standard. BS 3621 is a British Standard for thief-resistant locks, which ensures that locks provide adequate security against common attack methods. Locks meeting this standard have undergone testing for resistance to drilling, picking, bumping, and other forms of attack. While Part Q does not specifically mandate BS 3621 by name in all cases, it requires that doorsets as a whole meet PAS 24 (or equivalent), which typically incorporates locks of this standard. The focus is on the performance of the entire doorset rather than just the lock, but high-security locks are an essential component of a secure entrance door."
  },
  {
    id: 'regs-part-q-12',
    question: "What does Part Q require regarding accessible windows?",
    options: ["All windows must have key-operated locks", "They must be resistant to unauthorized entry from outside", "They must all be restricted to a maximum opening of 100mm", "They must be triple-glazed"],
    correctAnswer: "They must be resistant to unauthorized entry from outside",
    explanation: "Part Q requires that accessible windows (those that can be reached without using a ladder or are within 2 meters vertically of an accessible level) must be resistant to unauthorized entry from outside. This means they should be designed and constructed to resist physical attack by a casual or opportunist burglar using common hand tools. Windows meeting PAS 24 or an equivalent standard are deemed to satisfy this requirement. While key-operated locks, opening restrictors, and enhanced glazing may be part of a compliant window's security features, Part Q focuses on the performance outcome (resistance to unauthorized entry) rather than mandating specific hardware or design features. The entire window assembly, including the frame, glass, and hardware, must work together to provide adequate security."
  },
  {
    id: 'regs-part-q-13',
    question: "How does Part Q define an 'easily accessible' window or door?",
    options: ["Any window or door on the ground floor", "Any window or door that can be reached without using a ladder or is within 2m vertically of an accessible level", "Any window or door visible from the street", "Any window or door that doesn't have a security alarm"],
    correctAnswer: "Any window or door that can be reached without using a ladder or is within 2m vertically of an accessible level",
    explanation: "Part Q defines an 'easily accessible' window or door as any that can be reached without using a ladder or is within 2 meters vertically of an accessible level. This includes ground floor windows and doors, basement windows with lightwells, and windows/doors that can be reached from balconies, flat roofs, or other structures. The 2-meter vertical measurement is used because this is considered the height that an average person could reasonably reach or climb without specialized equipment. This definition helps determine which elements of a dwelling require enhanced security under Part Q, focusing protection on the points most vulnerable to opportunistic burglary attempts. Windows above this height, such as upper-story windows with no easy access, generally don't need to meet the same security standards."
  },
  {
    id: 'regs-part-q-14',
    question: "What requirement does Part Q have for ground floor window glazing?",
    options: ["It must always be laminated safety glass", "It must be at least 6mm thick", "It must be either toughened or laminated glass depending on the security assessment", "Part Q has no specific requirements for glazing material"],
    correctAnswer: "Part Q has no specific requirements for glazing material",
    explanation: "Part Q does not have specific requirements for the glazing material used in ground floor windows. Instead, it focuses on the performance of the complete window assembly (including frame, glass, and hardware) in resisting unauthorized entry. Windows must meet PAS 24 or an equivalent standard, which tests the window's overall security performance rather than mandating specific types of glass. While laminated glass is often used in security applications because it's more difficult to break through than standard glass, and toughened glass provides additional strength, Part Q doesn't specifically require either. The window manufacturer or installer will typically choose appropriate glazing as part of a complete system designed to pass the required security tests."
  },
  {
    id: 'regs-part-q-15',
    question: "What alternative approach does Part Q allow instead of meeting PAS 24 standards?",
    options: ["Installing a burglar alarm system", "Having 24-hour security personnel", "Demonstrating security is achieved through a different but equivalent standard or approach", "There are no alternatives to PAS 24 allowed"],
    correctAnswer: "Demonstrating security is achieved through a different but equivalent standard or approach",
    explanation: "Part Q allows for demonstrating that security is achieved through a different but equivalent standard or approach instead of strictly meeting PAS 24. This provision recognizes that there may be multiple ways to achieve the same security outcomes, especially for specialized or bespoke door and window designs. Alternative standards that might be accepted include STS 201, LPS 1175, STS 202, LPS 2081, and other national or international standards that provide comparable security performance. The key requirement is that the alternative approach must be demonstrated to provide an equivalent level of security against unauthorized entry. This flexibility allows for innovation and different design approaches while maintaining the fundamental security objectives. Building control bodies have discretion to accept alternative solutions that they believe meet the security performance requirements."
  },
  {
    id: 'regs-part-q-16',
    question: "Which of the following buildings would NOT be covered by Part Q requirements?",
    options: ["A newly built house", "A newly built block of flats", "An office building converted into new apartments", "An extension to an existing house"],
    correctAnswer: "An extension to an existing house",
    explanation: "An extension to an existing house would NOT be covered by Part Q requirements. Part Q applies to new dwellings only, including newly built houses, flats, or buildings converted for residential use (such as an office building converted into apartments). Extensions to existing dwellings, renovations, and alterations to existing homes are excluded from Part Q requirements, even if they include new doors and windows. This distinction recognizes the practical difficulties and potential increased costs of applying the requirements to existing buildings where integration with existing structures and aesthetics may be challenging. However, while not mandatory, homeowners undertaking extensions or replacements may still choose to install doors and windows that meet Part Q standards as best practice for security."
  },
  {
    id: 'regs-part-q-17',
    question: "What documentation is typically required to demonstrate Part Q compliance to building control?",
    options: ["A personal guarantee from the builder", "Test certificates or third-party certification showing products meet PAS 24 or equivalent", "Just receipts showing purchase of security products", "A letter from the local police crime prevention officer"],
    correctAnswer: "Test certificates or third-party certification showing products meet PAS 24 or equivalent",
    explanation: "To demonstrate Part Q compliance to building control, test certificates or third-party certification showing that products meet PAS 24 or an equivalent standard are typically required. These documents are usually provided by the manufacturer or supplier of the doors and windows and should clearly state that the products conform to the relevant security standards. The certification should relate to the specific product installed, rather than just the product range. In some cases, UKAS-accredited third-party certification schemes (such as Secured by Design) may be used as evidence of compliance. Building control officers may also visually inspect installations to ensure they match the specified products and have been installed correctly. This documentation-based approach allows for efficient verification of compliance without requiring on-site testing."
  },
  {
    id: 'regs-part-q-18',
    question: "What is the relationship between Part Q and the Secured by Design (SBD) scheme?",
    options: ["They are completely unrelated standards", "SBD is a mandatory part of Part Q compliance", "SBD certification can be used to demonstrate compliance with Part Q, but is not mandatory", "Part Q has replaced SBD entirely"],
    correctAnswer: "SBD certification can be used to demonstrate compliance with Part Q, but is not mandatory",
    explanation: "SBD (Secured by Design) certification can be used to demonstrate compliance with Part Q, but it is not mandatory. Secured by Design is a police initiative that aims to improve the security of buildings and their immediate surroundings to provide safe places to live and work. Products certified under the SBD scheme meet or exceed PAS 24 standards, which means they satisfy Part Q requirements. While obtaining full SBD certification for a development involves additional requirements beyond Part Q (including layout considerations and lighting), the SBD product certification for doors and windows specifically can serve as evidence of Part Q compliance. Many manufacturers offer products that are both Part Q compliant and SBD certified, providing builders with a straightforward path to meeting the security regulations while potentially exceeding the minimum requirements."
  },
  {
    id: 'regs-part-q-19',
    question: "Which of the following is NOT one of the test methods typically used in PAS 24 testing?",
    options: ["Manual manipulation attack test", "Cylinder manipulation test", "Fire resistance test", "Tool attack test"],
    correctAnswer: "Fire resistance test",
    explanation: "Fire resistance testing is NOT one of the test methods typically used in PAS 24 testing. PAS 24 focuses specifically on security performance against burglary attempts, not fire safety. The standard test methods used in PAS 24 include: manual manipulation attack test (attempting to operate locks and hardware without tools); cylinder manipulation test (attacking the lock cylinder using picking or bumping techniques); tool attack test (using specified tools to attempt to create an opening large enough to allow access); and mechanical loading test (applying force to test the strength of components and fixings). Fire resistance is covered by different regulations and standards, typically Part B of the Building Regulations and standards such as BS 476 or EN 1634, which assess how well elements resist the spread of fire rather than unauthorized entry."
  },
  {
    id: 'regs-part-q-20',
    question: "How does Part Q approach security for dwelling entrances from shared communal areas?",
    options: ["Security is not required for these entrances", "Lower security standards apply compared to external doors", "These entrances must meet the same security standards as external entrances", "Only electronic access control is permitted"],
    correctAnswer: "These entrances must meet the same security standards as external entrances",
    explanation: "Part Q requires that dwelling entrances from shared communal areas (such as the entrance door to a flat from a communal corridor) must meet the same security standards as external entrances. This means these doors must comply with PAS 24 or an equivalent standard, just like doors that lead directly to the outside. This requirement recognizes that unauthorized access can occur not only from outside the building but also through shared internal spaces. The security of each individual dwelling unit must be maintained regardless of whether it has direct external access or is accessed through communal areas. This approach provides consistent protection for all dwellings, ensuring that residents in apartments or other shared buildings receive the same level of security as those in detached houses."
  },
  {
    id: 'regs-part-q-21',
    question: "Which of the following is NOT mentioned as a specific requirement for hinges in Part Q?",
    options: ["They should be positioned on the internal face of doors where possible", "They must include hinge bolts if exposed externally", "They must be made of stainless steel only", "They should be secured with appropriate length screws"],
    correctAnswer: "They must be made of stainless steel only",
    explanation: "The requirement that hinges must be made of stainless steel only is NOT mentioned in Part Q. While the material quality of hinges is important for durability and strength, Part Q does not mandate a specific material. Instead, it focuses on the performance and installation of hinges. The guidance suggests that hinges should ideally be positioned on the internal face of doors where possible to prevent access to them from outside. If hinges are exposed externally, they should include hinge bolts (also called dog bolts or security pins) that prevent the door from being removed even if the hinge pins are tampered with. Additionally, hinges should be secured with appropriate length screws that fix into the door frame for maximum security. These requirements focus on preventing the door from being removed or compromised via the hinges rather than specifying the exact material composition."
  },
  {
    id: 'regs-part-q-22',
    question: "What does Part Q require regarding glazing in and adjacent to doors?",
    options: ["Glazing within doors is never permitted", "Glazing must always be at least 6.4mm laminated glass", "Any glazing within 300mm of door locks must be secure against manipulation", "All glazed panels must have security grilles fitted"],
    correctAnswer: "Any glazing within 300mm of door locks must be secure against manipulation",
    explanation: "Part Q requires that any glazing within 300mm of door locks must be secure against manipulation. This is to prevent a common burglary technique where glass near locks is broken to allow the intruder to reach through and operate the lock from the inside. Security can be achieved through using laminated glass, security film, fixed internal grilles, or by positioning locks and hardware more than 300mm away from glazed areas. The specific method used to provide this security is not mandated, but the outcome (preventing access to door locks through glazed areas) must be achieved. This requirement applies both to glazing within the door itself and to glazed side panels adjacent to doors, ensuring that these potential vulnerabilities don't compromise the overall security of the entrance."
  },
  {
    id: 'regs-part-q-23',
    question: "What specific requirement does Part Q have for the frame installation of secure doorsets?",
    options: ["Frames must always be metal", "Frames must be secured to the wall with fixings no more than 600mm apart", "Frames must be a minimum of 70mm wide", "Frames must be painted a specific color for visibility"],
    correctAnswer: "Frames must be secured to the wall with fixings no more than 600mm apart",
    explanation: "Part Q requires that door frames must be secured to the wall with fixings no more than 600mm apart. This ensures the frame is robustly attached to the building structure and cannot be easily pulled away during an attack. The guidance also typically recommends that at least one fixing should be within 150mm of each corner of the frame, and on each jamb (side). Additionally, the fixings should be appropriate for the frame material and wall construction, with sufficient length to provide a secure connection into the structural opening. This requirement recognizes that even the most secure door will not provide adequate protection if its frame can be easily compromised, as the overall security of a doorset depends on all components working together, including the frame installation."
  },
  {
    id: 'regs-part-q-24',
    question: "What is the main difference between Part Q compliance and obtaining full Secured by Design (SBD) certification for a development?",
    options: ["There is no difference; they are the same standard", "Part Q only covers windows while SBD covers doors", "Part Q focuses on door and window security, while SBD includes additional requirements for the wider environment", "SBD is only for commercial buildings, while Part Q is for residential"],
    correctAnswer: "Part Q focuses on door and window security, while SBD includes additional requirements for the wider environment",
    explanation: "The main difference between Part Q compliance and obtaining full Secured by Design (SBD) certification for a development is that Part Q focuses specifically on the security of doors and windows in individual dwellings, while SBD includes additional requirements for the wider environment. SBD is a more comprehensive scheme that considers aspects such as site layout, lighting, landscape design, access routes, boundary treatments, and the creation of defensible space—all aimed at designing out crime through environmental design principles. While Part Q and SBD both require secure doors and windows (typically to PAS 24 standards), SBD goes beyond this to address the entire development. A building can be Part Q compliant without meeting all SBD requirements, but SBD-certified developments will typically exceed Part Q standards as part of their broader security approach."
  },
  {
    id: 'regs-part-q-25',
    question: "Which of the following statements about Part Q compliance for bespoke or heritage-style doors and windows is most accurate?",
    options: ["Bespoke items are automatically exempt from Part Q", "Heritage-style products must always use traditional materials only", "Alternative security solutions may be accepted if they provide equivalent performance", "Bespoke items must always exceed standard Part Q requirements"],
    correctAnswer: "Alternative security solutions may be accepted if they provide equivalent performance",
    explanation: "For bespoke or heritage-style doors and windows, alternative security solutions may be accepted if they provide equivalent performance to standard Part Q requirements. This recognizes that standard security hardware or designs might not be compatible with certain architectural styles or conservation requirements. Building control bodies have some discretion to accept alternative approaches that achieve the security outcomes of Part Q through different means. For example, a traditional-style door might use concealed multi-point locking systems, specialized security glazing, or reinforced construction while maintaining its period appearance. The key principle is that security performance should not be compromised, but there is flexibility in how it is achieved. This allows for appropriate solutions in listed buildings, conservation areas, or custom designs where standard products might not be suitable."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-q', 'items', q.id), {
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
