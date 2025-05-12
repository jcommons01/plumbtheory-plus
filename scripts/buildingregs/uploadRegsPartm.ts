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

// ✅ Building Regulations Part M - Access & Use Questions
const questions = [
  {
    id: 'regs-part-m-1',
    question: "What is the primary purpose of Approved Document M of the Building Regulations?",
    options: ["To ensure structural integrity", "To provide access to and use of buildings for everyone, including people with disabilities", "To regulate minimum room sizes", "To specify fire safety requirements"],
    correctAnswer: "To provide access to and use of buildings for everyone, including people with disabilities",
    explanation: "The primary purpose of Approved Document M is to ensure that buildings are designed and constructed to provide reasonable access to and use of buildings for everyone, including people with disabilities. It sets out minimum standards for accessibility in both new buildings and when changes are made to existing buildings. This covers aspects such as approach routes, entrances, internal circulation, facilities, and sanitary accommodations. The document aims to create an inclusive built environment where all people, regardless of age, size, disability, or ability, can access and use buildings comfortably and safely."
  },
  {
    id: 'regs-part-m-2',
    question: "How many volumes does the current Approved Document M consist of?",
    options: ["One volume covering all buildings", "Two volumes: one for dwellings and one for buildings other than dwellings", "Three volumes organized by building size", "Four volumes organized by building function"],
    correctAnswer: "Two volumes: one for dwellings and one for buildings other than dwellings",
    explanation: "The current Approved Document M consists of two volumes: Volume 1 covers dwellings (residential buildings), and Volume 2 covers buildings other than dwellings (such as commercial, industrial, and public buildings). This division allows for specific guidance tailored to the different accessibility needs and usage patterns of residential versus non-residential buildings. Volume 1 was introduced in the 2015 edition, bringing a significant change with the categorization of dwellings into three types based on accessibility levels, while Volume 2 maintains and updates the previous guidance for non-residential buildings."
  },
  {
    id: 'regs-part-m-3',
    question: "In Volume 1 of Approved Document M, what are the three categories of dwellings specified?",
    options: ["Small, medium, and large", "Basic, standard, and premium", "Category 1: visitable dwellings, Category 2: accessible and adaptable dwellings, Category 3: wheelchair user dwellings", "Low, medium, and high accessibility"],
    correctAnswer: "Category 1: visitable dwellings, Category 2: accessible and adaptable dwellings, Category 3: wheelchair user dwellings",
    explanation: "Volume 1 of Approved Document M specifies three categories of dwellings: Category 1 (M4(1)): Visitable dwellings, which is the minimum standard required for all new dwellings; Category 2 (M4(2)): Accessible and adaptable dwellings, which provide a higher level of accessibility and include features that make homes adaptable for changing needs; and Category 3 (M4(3)): Wheelchair user dwellings, designed to be wheelchair accessible from the outset or easily adaptable for wheelchair users. Categories 2 and 3 are optional standards that only apply when required by local planning policies through planning conditions."
  },
  {
    id: 'regs-part-m-4',
    question: "Which category of dwelling is mandatory for all new homes under Part M?",
    options: ["Category 1: Visitable dwellings", "Category 2: Accessible and adaptable dwellings", "Category 3: Wheelchair user dwellings", "All three categories are mandatory"],
    correctAnswer: "Category 1: Visitable dwellings",
    explanation: "Category 1: Visitable dwellings (M4(1)) is the mandatory minimum requirement for all new homes under Part M. This baseline standard ensures that dwellings include certain accessibility features such as level access to the main entrance where reasonably practicable, adequately sized doorways and circulation spaces, and a WC at entrance level. Categories 2 and 3 are optional higher standards that only apply when imposed as a planning condition by the local planning authority. This approach allows local authorities to require higher accessibility standards based on local needs and demographics."
  },
  {
    id: 'regs-part-m-5',
    question: "What does Category 2: Accessible and adaptable dwellings (M4(2)) require that goes beyond Category 1 requirements?",
    options: ["Full wheelchair accessibility throughout", "Step-free access to all floors and rooms", "Features that make the dwelling more easily adaptable for changing needs", "Specialized equipment such as stair lifts and hoists"],
    correctAnswer: "Features that make the dwelling more easily adaptable for changing needs",
    explanation: "Category 2: Accessible and adaptable dwellings (M4(2)) requires features that make the dwelling more easily adaptable for changing needs and potential occupancy by people with disabilities. This includes step-free access, sufficient space for turning wheelchairs in key areas, potential for stair lift installation, wall reinforcements for grab rails in toilets/bathrooms, space for future shower installation on the entrance level, and potential for future installation of a through-floor lift. These dwellings are designed to be flexible and allow for cost-effective adaptations to accommodate changing needs over time, making them suitable for a wide range of occupants including older people, families with young children, and those with temporary or permanent injuries or disabilities."
  },
  {
    id: 'regs-part-m-6',
    question: "What are the two types of Category 3 wheelchair user dwellings specified in Part M?",
    options: ["Indoor and outdoor wheelchair dwellings", "Fully accessible and partially accessible", "Wheelchair adaptable and wheelchair accessible dwellings", "Short-term and long-term wheelchair accommodation"],
    correctAnswer: "Wheelchair adaptable and wheelchair accessible dwellings",
    explanation: "Part M specifies two types of Category 3 wheelchair user dwellings: 'wheelchair adaptable' and 'wheelchair accessible'. Wheelchair adaptable dwellings are designed to be easily modified to meet the needs of wheelchair users in the future, with features like provision for accessible bathrooms and kitchens that can be fitted out later. Wheelchair accessible dwellings are designed to be immediately suitable for wheelchair users from completion, with fully fitted accessible bathrooms, kitchens, and other specific features already installed. This distinction allows for flexibility in housing provision while ensuring that the basic spatial and structural requirements for wheelchair users are incorporated from the outset."
  },
  {
    id: 'regs-part-m-7',
    question: "What does Part M require regarding the approach to dwellings in Category 1?",
    options: ["A level approach is always required", "A ramped approach is always required", "Access by steps is acceptable in all situations", "A level or gently sloping approach where reasonable; steps acceptable in some situations"],
    correctAnswer: "A level or gently sloping approach where reasonable; steps acceptable in some situations",
    explanation: "For Category 1 (Visitable) dwellings, Part M requires a level or gently sloping approach where reasonable, but access by steps is acceptable in some situations where site constraints make level access impractical. The regulations recognize that achieving level access might not always be possible due to site topography or other constraints. When steps are provided, they should comply with specified dimensions for rise, going, and handrails to maximize accessibility. This requirement ensures a balance between promoting accessibility and recognizing practical constraints, while still ensuring that new dwellings have a reasonable approach that as many people as possible can use."
  },
  {
    id: 'regs-part-m-8',
    question: "What is required for sanitary facilities in Category 1 dwellings under Part M?",
    options: ["A fully accessible shower room", "A wheelchair-accessible toilet and basin", "A WC compartment at entrance level with specific minimum dimensions", "A bathroom with a level-access shower"],
    correctAnswer: "A WC compartment at entrance level with specific minimum dimensions",
    explanation: "Part M requires Category 1 (Visitable) dwellings to have a WC compartment at entrance level with specific minimum dimensions. This should include a WC and a basin, with sufficient space for people to use the facilities, including some wheelchair users with assistance. The door must open outward to maximize internal usable space, and the layout must allow for an approach to the WC from both sides. This provision ensures that visitors with mobility impairments can use toilet facilities during visits without having to navigate stairs, making homes more inclusive and 'visitable' for all members of the community."
  },
  {
    id: 'regs-part-m-9',
    question: "In Category 2 dwellings, what is the minimum clear opening width required for doorways?",
    options: ["750mm", "775mm", "800mm", "900mm"],
    correctAnswer: "775mm",
    explanation: "In Category 2 (Accessible and Adaptable) dwellings, the minimum clear opening width required for doorways is 775mm. This dimension allows comfortable passage for most wheelchair users and people using mobility aids. The measurement is taken from the face of the door to the face of the door stop with the door open at 90 degrees, and excludes projecting door handles. This requirement applies to all doorways within the dwelling, including those to habitable and non-habitable rooms, ensuring that people can move freely throughout the home regardless of mobility impairment. Wider doorways not only benefit wheelchair users but also assist people carrying large items, parents with pushchairs, and anyone using walking aids."
  },
  {
    id: 'regs-part-m-10',
    question: "What is the minimum width requirement for corridors in Category 2 dwellings?",
    options: ["850mm", "900mm", "1000mm", "1200mm"],
    correctAnswer: "900mm",
    explanation: "The minimum width requirement for corridors in Category 2 (Accessible and Adaptable) dwellings is 900mm. This width accommodates most wheelchair users and people using mobility aids such as walkers, while also allowing passage for people carrying items. The regulations also specify that this width should be maintained throughout the corridor's length, with no obstructions. Where there are doorways along the corridor, sufficient space must be provided for maneuverability. In areas where a change of direction is required or in front of doors, wider turning spaces are needed. These dimensions ensure that residents and visitors can move comfortably throughout the dwelling regardless of mobility impairments."
  },
  {
    id: 'regs-part-m-11',
    question: "What provision does Category 2 (M4(2)) make for the future installation of a stair lift?",
    options: ["A stair lift must be pre-installed", "Stairs must be wide enough to accommodate a future stair lift", "A space for a platform lift must be allocated", "No specific provision is required"],
    correctAnswer: "Stairs must be wide enough to accommodate a future stair lift",
    explanation: "Category 2 (M4(2)) requires that stairs must be wide enough to accommodate a future stair lift installation. This typically means a minimum stair width of 850mm, with no obstructions such as radiators that would prevent a stair lift being fitted later. The staircase should have a clear headroom of at least 2m, and the design should consider the potential need for a charging point at the top or bottom of the stairs. This forward-thinking requirement ensures that dwellings can be easily adapted if a resident develops mobility impairments in the future, allowing them to remain in their home rather than having to relocate, which aligns with the 'lifetime homes' concept."
  },
  {
    id: 'regs-part-m-12',
    question: "What does Part M Volume 2 require regarding accessible toilet provision in buildings other than dwellings?",
    options: ["Accessible toilets are only required in public buildings", "All toilets must be fully wheelchair accessible", "At least one wheelchair-accessible unisex toilet must be provided where toilet facilities are available", "Accessible toilets are only required on ground floors"],
    correctAnswer: "At least one wheelchair-accessible unisex toilet must be provided where toilet facilities are available",
    explanation: "Part M Volume 2 requires that at least one wheelchair-accessible unisex toilet must be provided where toilet facilities are available in buildings other than dwellings. This should be in addition to standard toilet facilities and located as close as possible to the entrance and/or waiting area. For larger buildings, additional accessible toilets should be provided so that a wheelchair user does not have to travel more than 40m on the same floor, or more than one floor up or down where vertical circulation is provided. These facilities must meet specific dimension requirements to allow wheelchair users to approach, transfer to, and use the sanitary facilities both independently and with assistance."
  },
  {
    id: 'regs-part-m-13',
    question: "What major addition to toilet facilities was introduced in the 2020 amendment to Part M Volume 2?",
    options: ["Gender-neutral toilets", "Changing Places toilets", "Baby changing facilities", "Showers in all toilet blocks"],
    correctAnswer: "Changing Places toilets",
    explanation: "The 2020 amendment to Part M Volume 2 introduced the requirement for Changing Places toilets in certain buildings. Changing Places toilets provide enhanced facilities beyond standard accessible toilets, including extra space (minimum 3m x 4m), an adult-sized changing bench, a ceiling track hoist, and a peninsular toilet. They are designed for people with profound and multiple learning disabilities, motor neurone disease, multiple sclerosis, cerebral palsy, and older people who need assistance. The amendment mandates these facilities in new public buildings with a capacity for 350+ people or 2,000+ square meters, including shopping centers, entertainment venues, hospitals, and motorway services, significantly improving inclusion for people with complex care needs."
  },
  {
    id: 'regs-part-m-14',
    question: "What is the maximum height for light switches in accessible buildings according to Part M?",
    options: ["900mm from the floor", "1000mm from the floor", "1200mm from the floor", "1400mm from the floor"],
    correctAnswer: "1200mm from the floor",
    explanation: "According to Part M, the maximum height for light switches in accessible buildings is 1200mm from the floor. This height is specified to ensure that controls are within reach of wheelchair users and people of short stature. Part M generally recommends that all switches, sockets, and controls should be positioned between 450mm and 1200mm from the floor to be accessible to the widest range of users. This 'accessible zone' allows most people to reach and operate controls without excessive stretching or bending, whether standing or seated. The guidance also recommends that switches should be easy to grip and operate, with sufficient visual contrast with their backgrounds to assist people with visual impairments."
  },
  {
    id: 'regs-part-m-15',
    question: "What does Part M require regarding the visual contrast of critical surfaces in buildings?",
    options: ["Only door handles need to contrast with doors", "No specific requirements for visual contrast", "Critical surfaces such as doors, walls, floors, and controls should visually contrast with their surroundings", "Visual contrast is only required in emergency exit routes"],
    correctAnswer: "Critical surfaces such as doors, walls, floors, and controls should visually contrast with their surroundings",
    explanation: "Part M requires that critical surfaces such as doors, walls, floors, and controls should visually contrast with their surroundings to assist people with visual impairments. This means, for example, that door faces or frames should contrast with surrounding walls, door handles should contrast with door faces, sanitary fittings should contrast with background surfaces, and floors should contrast with walls. The guidance recommends a minimum 30-point difference in Light Reflectance Value (LRV) between contrasting surfaces. Visual contrast helps people with visual impairments to navigate buildings safely and independently by making key features more easily identifiable, reducing the risk of collisions and falls, and making controls and facilities easier to locate and use."
  },
  {
    id: 'regs-part-m-16',
    question: "What does Part M specify regarding the provision of hearing enhancement systems in public buildings?",
    options: ["They are always optional", "They are required in rooms and spaces designed for meetings, performances, and spectator sports", "They are only required in government buildings", "They are only required if the building is specifically for deaf users"],
    correctAnswer: "They are required in rooms and spaces designed for meetings, performances, and spectator sports",
    explanation: "Part M requires hearing enhancement systems in rooms and spaces designed for meetings, performances, and spectator sports in public buildings. This includes meeting/conference facilities, entertainment spaces, auditoria, and ticket/information counters where background noise may interfere with hearing. Acceptable systems include induction loops, infrared, and radio systems. The guidance emphasizes that the type of system should be appropriate for the intended use and users of the space. Appropriate signage should also indicate the availability of these systems. This requirement ensures that people with hearing impairments can participate fully in public activities and access information and entertainment on an equal basis with others."
  },
  {
    id: 'regs-part-m-17',
    question: "What are the requirements for steps and stairs in public buildings under Part M?",
    options: ["Steps are not permitted in accessible routes", "Steps should always be accompanied by a ramp", "Steps should have visual contrast, tactile warnings, and handrails on both sides", "Steps should always be replaced with lifts"],
    correctAnswer: "Steps should have visual contrast, tactile warnings, and handrails on both sides",
    explanation: "Under Part M, steps and stairs in public buildings should have visual contrast, tactile warnings, and handrails on both sides. The nosings (front edges) of steps should be visually conspicuous through contrasting material or color. Tactile warning surfaces should be provided at the top and bottom of stairs to alert people with visual impairments. Handrails should be provided on both sides of the stairs, be easy to grip, and extend 300mm beyond the top and bottom steps. The regulations also specify dimensions for rise and going, with consistent dimensions throughout a flight. These features combine to make stairs safer and more navigable for people with various impairments, including visual, mobility, and balance issues."
  },
  {
    id: 'regs-part-m-18',
    question: "What is the maximum gradient permitted for a ramp in an accessible route according to Part M?",
    options: ["1:10 (10%)", "1:12 (8.33%)", "1:15 (6.67%)", "1:20 (5%)"],
    correctAnswer: "1:12 (8.33%)",
    explanation: "According to Part M, the maximum gradient permitted for a ramp in an accessible route is 1:12 (8.33%). This gradient represents a rise of one unit for every 12 units of horizontal distance, which is generally considered the steepest gradient that most wheelchair users can negotiate independently. For longer ramps, shallower gradients are recommended: 1:15 for lengths of 5-10m and 1:20 for lengths exceeding 10m. The regulations also require level landings at the top and bottom of each ramp and at maximum intervals of 10m along the ramp. These landings should be at least 1500mm long, clear of any obstructions, and not form part of another route. Handrails should be provided on both sides of the ramp for support and guidance."
  },
  {
    id: 'regs-part-m-19',
    question: "What does Part M require regarding the provision of accessible hotel bedrooms?",
    options: ["All hotel bedrooms must be fully accessible", "Hotels do not need to provide any accessible rooms", "A proportion of bedrooms must be accessible, with the number depending on the total number of rooms", "Only hotels with more than 100 rooms need to provide accessible bedrooms"],
    correctAnswer: "A proportion of bedrooms must be accessible, with the number depending on the total number of rooms",
    explanation: "Part M requires that a proportion of hotel bedrooms must be accessible, with the number depending on the total number of rooms in the establishment. For small hotels (up to 20 rooms), at least one accessible bedroom is required. For larger hotels, the guidance recommends that 5% of bedrooms should be accessible to wheelchair users, with additional rooms being adaptable for other accessibility needs. These accessible rooms should be distributed across different price points and room types. Accessible bedrooms must include specific features such as adequate circulation space, accessible bathroom facilities, emergency assistance alarms, and appropriate fixtures and fittings at accessible heights. This graduated approach ensures reasonable provision while acknowledging the varying scales of hotel developments."
  },
  {
    id: 'regs-part-m-20',
    question: "What does Part M require regarding assistance dog relief areas in public buildings?",
    options: ["They are required in all public buildings", "They are only required in government buildings", "They are recommended but not required", "Part M does not address assistance dog relief areas"],
    correctAnswer: "Part M does not address assistance dog relief areas",
    explanation: "Part M does not specifically address requirements for assistance dog relief areas in public buildings. While the regulations cover many aspects of accessibility for people with disabilities, including those who use assistance dogs (by ensuring adequate circulation space and accessible routes), they do not contain specific provisions for assistance dog relief areas. This is an example of an area where accessibility considerations extend beyond the current Building Regulations. Best practice guidance from organizations representing assistance dog users often recommends providing designated relief areas in large public buildings and complexes, but this is not currently a regulatory requirement under Part M."
  },
  {
    id: 'regs-part-m-21',
    question: "What is a 'pocket door' in the context of Part M, and why might it be recommended?",
    options: ["A small door within a larger door for easier access", "A door that folds into a compact unit when open", "A sliding door that disappears into a wall cavity when open", "A door with a pocket for holding accessibility information"],
    correctAnswer: "A sliding door that disappears into a wall cavity when open",
    explanation: "A 'pocket door' in the context of Part M is a sliding door that disappears into a wall cavity when open. While not specifically mandated, pocket doors are often recommended in accessible design because they eliminate the swing arc of conventional doors, which can be an obstacle in limited spaces, particularly for wheelchair users. By sliding into the wall, pocket doors maximize usable space and reduce maneuvering clearances needed, making them particularly valuable in smaller rooms like bathrooms and en-suites in Category 2 and 3 dwellings. They can help achieve compliance with the space requirements for accessible facilities while optimizing the overall spatial efficiency of the dwelling or building."
  },
  {
    id: 'regs-part-m-22',
    question: "What does Part M require regarding accessible car parking provision?",
    options: ["No specific requirements for car parking", "All parking spaces must be suitable for disabled users", "A minimum number of wider designated accessible spaces based on overall parking provision", "Accessible parking is only required for public buildings"],
    correctAnswer: "A minimum number of wider designated accessible spaces based on overall parking provision",
    explanation: "Part M requires a minimum number of wider designated accessible spaces based on the overall parking provision. For small car parks (up to 10 spaces), at least one space should be designated for disabled people. For larger car parks, 5% of spaces should be designated (with a minimum of 1 space). Designated spaces should be at least 3.6m wide (or 2.4m wide with a 1.2m side transfer zone) and 6.0m long to accommodate wheelchair transfers. They should be located as close as possible to the building entrance, clearly marked with the International Symbol of Access, and connected to the building by an accessible route. This ensures that people with mobility impairments have equitable access to buildings from parking areas."
  },
  {
    id: 'regs-part-m-23',
    question: "What is the minimum width requirement for an accessible entrance door according to Part M?",
    options: ["775mm clear opening width", "800mm clear opening width", "850mm clear opening width", "1000mm clear opening width"],
    correctAnswer: "800mm clear opening width",
    explanation: "According to Part M, the minimum width requirement for an accessible entrance door is 800mm clear opening width. This measurement refers to the actual usable width when the door is open at 90 degrees, measured from the face of the door to the door stop on the opposite frame, and excluding any projecting door handles or other hardware. This dimension ensures that most wheelchair users can comfortably pass through the entrance without requiring assistance. The regulations also stipulate that the accessible entrance should be clearly identifiable, well-lit, and protected from the weather. Any door entry systems should be accessible to people with various impairments, including vision, hearing, or dexterity limitations."
  },
  {
    id: 'regs-part-m-24',
    question: "What is the minimum turning circle diameter required for wheelchair users in accessible buildings?",
    options: ["1200mm", "1350mm", "1500mm", "1800mm"],
    correctAnswer: "1500mm",
    explanation: "The minimum turning circle diameter required for wheelchair users in accessible buildings according to Part M is 1500mm. This dimension allows sufficient space for most wheelchair users to make a complete 180-degree turn, which is essential for independent navigation through buildings. This turning space should be available in entrances, at corridor junctions, in accessible bedrooms, and in sanitary facilities. Where a full circle cannot be accommodated, a turning ellipse of 1700mm x 1400mm may be acceptable. These dimensions are based on research into the space requirements of wheelchair users with different types of wheelchairs, including larger powered chairs, ensuring that buildings are practically usable by people with mobility impairments."
  },
  {
    id: 'regs-part-m-25',
    question: "What does Part M require for buildings that undergo material alterations?",
    options: ["No accessibility improvements are required for existing buildings", "The entire building must be upgraded to current standards", "The altered part must comply with Part M, and the accessibility of the building must not be worsened", "Only new extensions need to comply with Part M"],
    correctAnswer: "The altered part must comply with Part M, and the accessibility of the building must not be worsened",
    explanation: "For buildings undergoing material alterations, Part M requires that the altered part must comply with the current accessibility standards, and the accessibility of the building as a whole must not be worsened by the work. This balanced approach recognizes the practical and financial constraints of upgrading existing buildings while still improving accessibility over time. The regulations also introduce the concept of 'access strategies' for complex buildings, where a holistic approach to accessibility can be developed. In some cases, where full compliance would be unreasonable due to physical constraints or other limitations, alternative provisions might be accepted if they still achieve the objectives of providing reasonable access and use for all potential users."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-m', 'items', q.id), {
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
