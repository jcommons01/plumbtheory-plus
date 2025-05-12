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

// ✅ Building Regulations Part K - Protection from Falling Questions
const questions = [
  {
    id: 'regs-part-k-1',
    question: "What are the main areas covered by Approved Document K?",
    options: ["Only protection from falling", "Stairs, ladders, and barriers only", "Protection from falling, collision, and impact", "Only window safety and vehicle barriers"],
    correctAnswer: "Protection from falling, collision, and impact",
    explanation: "Approved Document K covers three main areas: protection from falling, collision, and impact. This includes guidance on the design of stairs, ladders, and ramps; provision of barriers to prevent falls; protection from collision with open windows, skylights, and ventilators; and protection from impact with glazing. The document aims to minimize the risk of accidents in and around buildings through appropriate design of these elements, ensuring safe movement for building users."
  },
  {
    id: 'regs-part-k-2',
    question: "What is the minimum height requirement for a guarding barrier on a staircase in a residential building?",
    options: ["600mm", "900mm", "1100mm", "1800mm"],
    correctAnswer: "900mm",
    explanation: "The minimum height requirement for a guarding barrier on a staircase in a residential building is 900mm, measured from the pitch line of the stairs to the top of the guarding. This height requirement balances safety against falls with practical considerations of visibility and aesthetics in residential settings. For stairs wider than 1000mm, the height is measured 500mm from the center. In non-residential buildings where stairs serve as escape routes or in public buildings with high traffic, higher guarding of 1100mm may be required."
  },
  {
    id: 'regs-part-k-3',
    question: "What is the maximum permitted gap in guarding to prevent a child from becoming trapped or falling through?",
    options: ["50mm", "75mm", "100mm", "125mm"],
    correctAnswer: "100mm",
    explanation: "The maximum permitted gap in guarding to prevent a child from becoming trapped or falling through is 100mm. This dimension is based on the size of a small child and aims to prevent a child from being able to pass through or get their head stuck in the guarding. The 100mm maximum applies to all gaps within the guarding, including between vertical balusters, ornamental patterns, or any openings. This requirement is particularly important in residential buildings and other locations where children are likely to be present."
  },
  {
    id: 'regs-part-k-4',
    question: "According to Approved Document K, what is the maximum height of a single riser in a private stair?",
    options: ["150mm", "220mm", "250mm", "No maximum is specified"],
    correctAnswer: "220mm",
    explanation: "According to Approved Document K, the maximum height of a single riser in a private stair (such as in a dwelling) is 220mm. This maximum height is designed to ensure that stairs are comfortable and safe to use, reducing the risk of trips and falls. The document also specifies a minimum riser height of 150mm for private stairs, as very low risers can also present a trip hazard. These dimensions are slightly more relaxed than those for public stairs, reflecting the different use patterns and familiarity of users with residential stairs."
  },
  {
    id: 'regs-part-k-5',
    question: "What is the minimum going (tread depth) for a step in a private stair according to Approved Document K?",
    options: ["220mm", "250mm", "300mm", "350mm"],
    correctAnswer: "220mm",
    explanation: "The minimum going (tread depth) for a step in a private stair is 220mm according to Approved Document K. This minimum dimension ensures that the step is deep enough to accommodate a typical adult foot safely. In combination with the maximum riser height, these dimensions create stairs that are comfortable and safe for regular use. For tapered treads (e.g., in spiral or winder stairs), the minimum going is measured at specific points as outlined in the document, with minimum 50mm at the narrow end."
  },
  {
    id: 'regs-part-k-6',
    question: "What does Approved Document K specify regarding handrails on stairs?",
    options: ["Handrails are optional for private stairs with less than 5 steps", "Handrails should be between 900mm and 1000mm above the pitch line", "Handrails are only required on one side regardless of stair width", "Handrails must always be made of wood for domestic properties"],
    correctAnswer: "Handrails should be between 900mm and 1000mm above the pitch line",
    explanation: "Approved Document K specifies that handrails should be between 900mm and 1000mm above the pitch line of the stairs. This height range provides appropriate support for most adults using the stairs. Handrails should be provided on at least one side if the stairs are less than 1000mm wide, and on both sides if wider. The document also advises that handrails should give firm support and allow a firm grip, be securely fixed, and be positioned so they don't obstruct the stair width. Additional lower handrails may be appropriate in buildings used by children."
  },
  {
    id: 'regs-part-k-7',
    question: "What is the '2000mm headroom rule' in Approved Document K referring to?",
    options: ["The minimum ceiling height in habitable rooms", "The minimum height for doors in escape routes", "The minimum clear headroom required over the full width of a stairway", "The minimum height of guarding in public buildings"],
    correctAnswer: "The minimum clear headroom required over the full width of a stairway",
    explanation: "The '2000mm headroom rule' refers to the minimum clear headroom required over the full width of a stairway. This measurement is taken vertically from the pitch line of the stairs and ensures that users don't risk head injury when using the stairs. For loft conversions in existing dwellings, where space may be constrained, this can be reduced to 1800mm at the center of the stair width and 1600mm at the side. Adequate headroom is essential for safe stair use, particularly for taller individuals and in emergency situations."
  },
  {
    id: 'regs-part-k-8',
    question: "According to Approved Document K, what is required for stairs with more than 36 risers in consecutive flights?",
    options: ["They must have a mechanical lift installed alongside", "They must have a change in direction of at least 30°", "They must have landings at least every 12 risers", "They must have additional emergency lighting"],
    correctAnswer: "They must have a change in direction of at least 30°",
    explanation: "According to Approved Document K, stairs with more than 36 risers in consecutive flights must have a change in direction of at least 30°. This requirement prevents excessively long straight stairs that can be disorienting and dangerous if someone falls. The change in direction helps break the fall if someone trips and provides a visual and psychological break in a long stair run. This change is typically achieved by incorporating a landing that changes the direction of travel, and also provides a resting point for users, particularly beneficial for elderly or less mobile individuals."
  },
  {
    id: 'regs-part-k-9',
    question: "What is the maximum pitch for a domestic stair according to Approved Document K?",
    options: ["35 degrees", "38 degrees", "42 degrees", "45 degrees"],
    correctAnswer: "42 degrees",
    explanation: "The maximum pitch for a domestic stair according to Approved Document K is 42 degrees. This limit ensures that stairs are not too steep, which would make them difficult and dangerous to use. The pitch is determined by the relationship between the riser height and going (tread depth). Steeper stairs require more effort to climb and present a greater fall hazard, particularly for elderly or mobility-impaired users. For public buildings and common access areas, a shallower maximum pitch of 38 degrees typically applies to accommodate a wider range of users."
  },
  {
    id: 'regs-part-k-10',
    question: "What does Approved Document K specify regarding window restrictors in buildings?",
    options: ["All opening windows above ground floor must have restrictors", "Restrictors are required on windows with sills less than 800mm above floor level where the drop outside exceeds 600mm", "Restrictors must limit opening to maximum 50mm in all cases", "Window restrictors are only required in buildings used by children"],
    correctAnswer: "Restrictors are required on windows with sills less than 800mm above floor level where the drop outside exceeds 600mm",
    explanation: "Approved Document K specifies that window restrictors are required on windows with sills less than 800mm above floor level where the drop outside exceeds 600mm. These restrictors should limit the window opening to 100mm or less to prevent children from falling out. The requirement aims to protect children from falling from height while still allowing windows to provide ventilation. The restrictors should be designed to be child-resistant but can have a release mechanism to allow the window to be fully opened by adults when necessary, for example for cleaning or emergency escape."
  },
  {
    id: 'regs-part-k-11',
    question: "What is the purpose of a lantern light or rooflight upstand according to Approved Document K?",
    options: ["To improve the thermal performance of the rooflight", "To prevent falls through the rooflight when walking on the roof", "To improve the waterproofing of the rooflight junction", "Only for aesthetic purposes"],
    correctAnswer: "To prevent falls through the rooflight when walking on the roof",
    explanation: "The purpose of a lantern light or rooflight upstand according to Approved Document K is to prevent falls through the rooflight when walking on the roof. The document specifies that rooflights should be designed to project sufficiently above the roof surface to prevent someone accidentally stepping on them. This is typically achieved with an upstand of at least 150mm. Without such protection, rooflights may not be immediately visible to someone on the roof, creating a serious fall hazard. This requirement is particularly important for flat roofs that might be accessed for maintenance."
  },
  {
    id: 'regs-part-k-12',
    question: "What does Approved Document K require for the maximum height of the first step of an external flight of stairs?",
    options: ["The same as internal stairs", "No more than 150mm from ground level", "No more than the height of subsequent risers plus 18mm", "No specific requirement for external stairs"],
    correctAnswer: "No more than the height of subsequent risers plus 18mm",
    explanation: "Approved Document K requires that the maximum height of the first step of an external flight of stairs should be no more than the height of subsequent risers plus 18mm. This allowance recognizes that external ground levels may change slightly over time due to settlement or landscaping changes. The small tolerance helps ensure that even with minor ground level changes, the difference between the first and subsequent steps won't become so great as to create a significant trip hazard. Regular maintenance should still be carried out to keep external step heights consistent."
  },
  {
    id: 'regs-part-k-13',
    question: "According to Approved Document K, what is the minimum width requirement for a private stair in a typical dwelling?",
    options: ["600mm", "800mm", "900mm", "1000mm"],
    correctAnswer: "800mm",
    explanation: "According to Approved Document K, the minimum width requirement for a private stair in a typical dwelling is 800mm. This width provides sufficient space for normal household traffic and moving furniture between floors while balancing space efficiency in home design. The width is measured between the walls or balustrades if the stair is open on one or both sides. For loft conversions in existing dwellings where space may be limited, this can be reduced to 600mm. Wider stairs would be recommended for homes designed for wheelchair users or with specific accessibility requirements."
  },
  {
    id: 'regs-part-k-14',
    question: "What is the minimum length for a landing on a private stair?",
    options: ["The same width as the stair", "At least 400mm long", "At least 900mm long", "Equal to the width of the widest door opening onto it"],
    correctAnswer: "At least 400mm long",
    explanation: "The minimum length for a landing on a private stair is at least 400mm long, measured from the nosing of the top step, according to Approved Document K. This provides sufficient space for users to regain balance and control before changing direction or passing through a door. Landings should be at least as wide as the stair and clear of any door swing (except for a door to a cupboard or duct). For public stairs or in common areas of buildings containing flats, longer landings of at least 800mm are typically required to accommodate higher traffic and improve accessibility."
  },
  {
    id: 'regs-part-k-15',
    question: "What does Approved Document K state about the use of spiral and helical stairs as a primary route in a home?",
    options: ["They are not permitted as a primary route", "They must have a central column at least 200mm in diameter", "They are permitted if they comply with specified minimum dimensions", "They can only be used for loft conversions"],
    correctAnswer: "They are permitted if they comply with specified minimum dimensions",
    explanation: "Approved Document K states that spiral and helical stairs are permitted as a primary route in a home if they comply with specified minimum dimensions. These include minimum going of 220mm measured at 270mm from the inside of the central column or handrail, a consistent rise between 150-220mm, and minimum headroom of 2000mm. Spiral stairs require particular attention to design details to ensure safety, including appropriate handrails and consideration of tread dimensions. They may not be suitable for all users, particularly those with mobility limitations, and alternative access should be considered in inclusive design."
  },
  {
    id: 'regs-part-k-16',
    question: "What does Approved Document K state about alternating tread stairs in dwellings?",
    options: ["They are not permitted in any circumstances", "They are only permitted for access to a single habitable room", "They are acceptable for any stair in a private dwelling", "They are only permitted for loft conversions"],
    correctAnswer: "They are only permitted for access to a single habitable room",
    explanation: "Approved Document K states that alternating tread stairs are only permitted for access to a single habitable room. These space-saving stairs, where each tread accommodates only one foot (either left or right), are not considered suitable as the primary means of access between floors in a dwelling due to their reduced safety compared to conventional stairs. They may be acceptable for loft conversions or similar situations where space is limited and only one room is being accessed. The document specifies minimum going, maximum rise, and other dimensional requirements to ensure they are as safe as possible."
  },
  {
    id: 'regs-part-k-17',
    question: "What is the minimum height for guarding at the edge of a flat roof that may be accessed for maintenance?",
    options: ["600mm", "900mm", "1100mm", "No guarding is required for maintenance-only access"],
    correctAnswer: "1100mm",
    explanation: "The minimum height for guarding at the edge of a flat roof that may be accessed for maintenance is 1100mm according to Approved Document K. This greater height (compared to residential stair guarding) reflects the increased risk associated with roof edges and the potentially fatal consequences of falls from roof level. The guarding should be designed to withstand the loads specified in BS EN 1991-1-1 and its UK National Annex. For roofs that are routinely accessed for purposes other than maintenance (e.g., roof gardens or terraces), the same 1100mm minimum applies, with additional design considerations for regular use."
  },
  {
    id: 'regs-part-k-18',
    question: "According to Approved Document K, what is required for fixed ladders providing access to areas not frequently used?",
    options: ["They must have hoops starting at 2000mm from the ground", "They must have a minimum width of 600mm", "They must have a pitch between 75° and 90° and foot and hand holds", "Fixed ladders are not permitted under Building Regulations"],
    correctAnswer: "They must have a pitch between 75° and 90° and foot and hand holds",
    explanation: "According to Approved Document K, fixed ladders providing access to areas not frequently used must have a pitch between 75° and 90° and foot and hand holds. For ladders with pitches greater than 75°, additional safety measures are recommended, such as safety hoops or fall arrest systems, particularly for longer ladders. The document recognizes that ladders can be appropriate for infrequently accessed areas like plant rooms or roof spaces, balancing practicality with safety. Fixed ladders should be secure, properly maintained, and designed to minimize the risk of falls."
  },
  {
    id: 'regs-part-k-19',
    question: "What does Approved Document K specify regarding vehicle barriers in car parks?",
    options: ["They are only required for multi-story car parks", "They must be at least 375mm high and able to resist force applied by a vehicle", "They are optional if warning signs are provided", "They must be at least 1100mm high like pedestrian barriers"],
    correctAnswer: "They must be at least 375mm high and able to resist force applied by a vehicle",
    explanation: "Approved Document K specifies that vehicle barriers in car parks must be at least 375mm high and able to resist force applied by a vehicle. This requirement applies to any edge where vehicles might fall one floor level or more, or into water. The design resistance depends on the vehicle gross mass and speed, with the document providing minimum design resistance values for different locations. Where there's also a pedestrian risk, a separate pedestrian guarding of 1100mm height may be required above or behind the vehicle barrier, or a single barrier meeting both requirements could be installed."
  },
  {
    id: 'regs-part-k-20',
    question: "What does Approved Document K require regarding the relationship between consecutive risers in a flight of stairs?",
    options: ["They must all be of exactly equal height", "The difference between the largest and smallest riser should not exceed 5mm", "Alternate risers must be of different heights for visual contrast", "The sum of two consecutive risers must not exceed 400mm"],
    correctAnswer: "The difference between the largest and smallest riser should not exceed 5mm",
    explanation: "Approved Document K requires that the difference between the largest and smallest riser in a flight of stairs should not exceed 5mm. This small tolerance ensures consistency in the stair flight, which is crucial for safety as people develop a rhythm when climbing or descending stairs and even small inconsistencies can cause trips or falls. Maintaining this close tolerance requires careful setting out and construction of the stair. The document also specifies that all risers within a flight should be of uniform height, though there are specific provisions for the relationship between separate flights."
  },
  {
    id: 'regs-part-k-21',
    question: "What is the 'overlap' on a stair and what minimum dimension does Approved Document K specify for it?",
    options: ["The amount one step overhangs the one below; minimum 16mm", "The minimum distance between consecutive handrails; minimum 100mm", "The projection of the nosing beyond the face of the riser; minimum 25mm", "The distance the balustrade must overlap the edge of the floor; minimum 50mm"],
    correctAnswer: "The projection of the nosing beyond the face of the riser; minimum 25mm",
    explanation: "The 'overlap' on a stair refers to the projection of the nosing beyond the face of the riser below, and Approved Document K specifies a minimum dimension of 25mm. This overlap increases the effective going (tread depth) of the stair without increasing its overall run length. However, the document also limits this projection, stating that any projection over the tread below should be no more than 25mm to prevent trip hazards. The overlap and nosing design can significantly affect both the safety and the visual appearance of a staircase."
  },
  {
    id: 'regs-part-k-22',
    question: "What is the minimum required height for guarding around a light well or basement area immediately outside a building?",
    options: ["600mm", "800mm", "900mm", "1100mm"],
    correctAnswer: "1100mm",
    explanation: "The minimum required height for guarding around a light well or basement area immediately outside a building is 1100mm according to Approved Document K. This higher guarding requirement (compared to internal stairs in dwellings) reflects the increased risk associated with falling into a basement area, which could involve a significant drop. The guarding should be designed to prevent falls and to withstand appropriate horizontal forces. This requirement applies to any area where the depth of the basement below outside ground level creates a significant fall hazard, particularly in publicly accessible areas."
  },
  {
    id: 'regs-part-k-23',
    question: "According to Approved Document K, what provision must be made when a door opens directly onto a stair (not a landing)?",
    options: ["This arrangement is never permitted", "A landing at least 400mm deep must be provided", "The door must open away from the stairs", "An electronic lock with delayed opening must be fitted"],
    correctAnswer: "A landing at least 400mm deep must be provided",
    explanation: "According to Approved Document K, when a door opens directly onto a stair (not a landing), a landing at least 400mm deep must be provided, measured from the door in its fully open position. This provides a safe standing area for users while operating the door, preventing the risk of falling down the stairs while opening or closing the door. The requirement applies to doors at the top of flights of stairs. In existing buildings where providing a landing may be impractical, other safety measures might be considered, though these would typically require justification as a departure from the guidance."
  },
  {
    id: 'regs-part-k-24',
    question: "What does Approved Document K specify about the projection of windows, ventilators, and similar features into areas of circulation?",
    options: ["They must not project into circulation areas at all", "They must not project more than 100mm into areas where people might walk", "They are permitted to project any distance if clearly marked", "They must be at least 2100mm above floor level if they project more than 100mm"],
    correctAnswer: "They must be at least 2100mm above floor level if they project more than 100mm",
    explanation: "Approved Document K specifies that windows, ventilators, and similar features must be at least 2100mm above floor level if they project more than 100mm into areas where people might walk. This requirement aims to prevent head injuries from collisions with projecting elements. For projections at lower levels (below 2100mm), the maximum projection is limited to 100mm to minimize collision hazards. These requirements are particularly important in circulation spaces like corridors, lobbies, and passageways where people are moving through and may not be focused on potential overhead or side hazards."
  },
  {
    id: 'regs-part-k-25',
    question: "What does Approved Document K specify about the installation of manual controls for powered doors and gates?",
    options: ["They must be located at least 1400mm above floor level", "They must be located where users can see the door or gate when operating them", "They are only permitted for emergency use", "They must be operable by a key only"],
    correctAnswer: "They must be located where users can see the door or gate when operating them",
    explanation: "Approved Document K specifies that manual controls for powered doors and gates must be located where users can see the door or gate when operating them. This requirement ensures that operators can verify that the movement of the door or gate won't cause injury to people in its path. The document also requires that powered doors and gates incorporate safety features to prevent injury, such as force limitation, presence detection, or safe edges. These provisions are particularly important for larger or heavier doors and gates that could cause significant injury if they strike someone during operation."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-k', 'items', q.id), {
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
