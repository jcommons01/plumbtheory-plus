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

// ✅ Building Regulations Part S - EV Charging Questions
const questions = [
  {
    id: 'regs-part-s-1',
    question: "What is the primary purpose of Approved Document S of the Building Regulations?",
    options: ["To promote the sale of electric vehicles", "To establish standards for EV manufacturing", "To set requirements for electric vehicle charging infrastructure in buildings", "To regulate electricity prices for EV charging"],
    correctAnswer: "To set requirements for electric vehicle charging infrastructure in buildings",
    explanation: "The primary purpose of Approved Document S is to set requirements for electric vehicle charging infrastructure in buildings. Introduced in December 2021 and coming into force in June 2022, it establishes minimum standards for EV charging provisions in new buildings and those undergoing significant renovations. The regulations aim to future-proof developments by ensuring they have the necessary infrastructure to support the growing adoption of electric vehicles, in line with the UK government's commitment to phase out new petrol and diesel cars by 2030. By mandating charge points and cable routes at the construction stage, Part S significantly reduces the future costs and disruption associated with retrofitting charging infrastructure as demand increases."
  },
  {
    id: 'regs-part-s-2',
    question: "When did Approved Document S come into force?",
    options: ["January 1, 2021", "June 15, 2022", "January 1, 2023", "April 17, 2023"],
    correctAnswer: "June 15, 2022",
    explanation: "Approved Document S came into force on June 15, 2022. The document was initially published on December 15, 2021, giving the industry a six-month transition period to prepare for implementation. Transitional provisions meant that building work where a building notice, initial notice, or full plans had been submitted before June 15, 2022, would not need to comply, provided that the work commenced before June 15, 2023. This phased introduction was designed to allow developers and the construction industry time to adapt their designs and procurement processes to meet the new requirements. Since this date, all applicable new buildings and relevant renovations have been required to incorporate electric vehicle charging infrastructure as specified in the document."
  },
  {
    id: 'regs-part-s-3',
    question: "Which of the following building types does Part S apply to?",
    options: ["Only new residential buildings", "Only commercial buildings", "Only public buildings", "Both new residential and non-residential buildings, plus major renovations"],
    correctAnswer: "Both new residential and non-residential buildings, plus major renovations",
    explanation: "Part S applies to both new residential and non-residential buildings, as well as buildings undergoing major renovations. Specifically, it covers: new residential buildings; new non-residential buildings; residential buildings undergoing a material change of use to create a dwelling; residential and non-residential buildings undergoing major renovation; and mixed-use buildings that are either new or undergoing major renovation. This comprehensive scope ensures that as the building stock evolves, a growing proportion will have the necessary infrastructure to support electric vehicle charging, regardless of building type. The requirements vary depending on the building category, with different provisions for residential versus non-residential properties."
  },
  {
    id: 'regs-part-s-4',
    question: "For a new house with one associated parking space, what does Part S require?",
    options: ["Cable routes only", "A 7kW charge point", "No requirements if the house is small", "Ducting only"],
    correctAnswer: "A 7kW charge point",
    explanation: "For a new house with one associated parking space, Part S requires the installation of a 7kW charge point. This must be a dedicated charge point (not just a standard electrical outlet) capable of at least 7 kilowatts of power output, which allows for reasonable charging speeds for most electric vehicles. The charge point must be permanently fitted to a wall or structure, accessible from an associated parking space, and universally compatible with different vehicle types. The 7kW minimum ensures that most electric vehicles can be charged overnight, which is the typical pattern for home charging. This requirement applies regardless of the size of the house, and represents a key aspect of future-proofing new residential properties."
  },
  {
    id: 'regs-part-s-5',
    question: "What is the minimum power requirement for residential EV charge points under Part S?",
    options: ["3.7 kW", "7 kW", "11 kW", "22 kW"],
    correctAnswer: "7 kW",
    explanation: "The minimum power requirement for residential EV charge points under Part S is 7 kW. This specification ensures that the installed charge points provide a practical charging speed for home use. At 7 kW, most electric vehicles can be fully charged overnight (typically 8-10 hours for a complete charge from empty, depending on battery size), which aligns with typical residential charging patterns. This standard represents a balance between providing useful charging speed and avoiding unnecessary strain on local electricity networks. All charge points must be at least Mode 3 chargers with a Type 2 connector as standard, ensuring compatibility with the majority of electric vehicles on the market. The 7 kW minimum applies to all residential charge points, regardless of the size or type of dwelling."
  },
  {
    id: 'regs-part-s-6',
    question: "In a new apartment building with 25 associated parking spaces, what is the minimum number of EV charge points required under Part S?",
    options: ["1 charge point", "25 charge points", "At least one charge point for each dwelling", "None if there's a nearby public charge point"],
    correctAnswer: "At least one charge point for each dwelling",
    explanation: "In a new apartment building with associated parking spaces, Part S requires at least one charge point for each dwelling. This means that if the building has 25 apartments each with an associated parking space, then 25 charge points would be required - one for each dwelling. The requirement is based on the lower of either the number of dwellings or the number of associated parking spaces. In scenarios where there are fewer parking spaces than dwellings, each parking space should have a charge point. This approach ensures that all residents with parking have access to charging facilities. The regulations do not allow for exemptions based on nearby public charge points, as the focus is on providing convenient overnight charging where vehicles are regularly parked."
  },
  {
    id: 'regs-part-s-7',
    question: "What is the requirement for 'cable routes' under Part S?",
    options: ["Underground ducts for power cables", "Pathways for people to avoid tripping over cables", "Infrastructure to facilitate the future installation of charge points", "Routes for vehicle access to charging points"],
    correctAnswer: "Infrastructure to facilitate the future installation of charge points",
    explanation: "Under Part S, 'cable routes' refer to infrastructure to facilitate the future installation of charge points. Specifically, this means the provision of enclosed conduits, ducts, trays, or similar containment systems that can accommodate electrical cabling for EV charging, along with the necessary junction boxes, drawpits, and other electrical infrastructure. Cable routes must run from an electrical distribution board to the future location of charge points, making it straightforward to install additional charge points when needed without significant construction work or disruption. This requirement typically applies in non-residential buildings and larger residential developments where not all parking spaces initially have charge points. The purpose is to future-proof buildings by reducing the cost and complexity of adding charging infrastructure as demand increases."
  },
  {
    id: 'regs-part-s-8',
    question: "In a new non-residential building with 60 parking spaces, what are the minimum charging infrastructure requirements under Part S?",
    options: ["60 charge points", "At least one charge point, plus cable routes for one-fifth (20%) of the total spaces", "No requirements for non-residential buildings", "Cable routes only for all spaces"],
    correctAnswer: "At least one charge point, plus cable routes for one-fifth (20%) of the total spaces",
    explanation: "In a new non-residential building with 60 parking spaces, Part S requires at least one charge point, plus cable routes for one-fifth (20%) of the total spaces. In this case, that would mean one charge point plus cable routes for 12 parking spaces (20% of 60). The charge point must be accessible to occupants, visitors, or customers as appropriate. Cable routes should be provided to facilitate future installation of charge points, with appropriate containment systems, electrical capacity, and space for future equipment. This approach balances immediate needs with future expansion, recognizing that non-residential charging requirements may grow as EV adoption increases. The regulations acknowledge that non-residential charging patterns differ from residential ones, typically involving shorter stays and partial charging rather than overnight full charges."
  },
  {
    id: 'regs-part-s-9',
    question: "What is considered a 'major renovation' that would trigger Part S requirements for existing buildings?",
    options: ["Any building work requiring planning permission", "Renovation work costing more than £50,000", "Renovation covering more than 10% of the building", "Where the renovation includes the car park or the electrical infrastructure of the building and there are more than 10 parking spaces"],
    correctAnswer: "Where the renovation includes the car park or the electrical infrastructure of the building and there are more than 10 parking spaces",
    explanation: "Under Part S, a 'major renovation' that would trigger requirements for existing buildings is defined as renovation work where the renovation includes the car park or the electrical infrastructure of the building and there are more than 10 parking spaces. This definition focuses on renovations where it would be practical and cost-effective to incorporate charging infrastructure. The key factors are that the work already involves either the parking area (where physical charging infrastructure would be installed) or the electrical systems (which would need to be modified to support charging). The threshold of more than 10 parking spaces ensures that the requirements apply to larger developments where the impact and benefits would be more significant, while avoiding disproportionate burdens on smaller properties."
  },
  {
    id: 'regs-part-s-10',
    question: "What exemption exists for small and medium-sized non-residential buildings under Part S?",
    options: ["They are completely exempt from all requirements", "They only need to provide cable routes, not charge points", "If they have 10 or fewer parking spaces, they don't need to provide cable routes", "They need charge points for every space but at a lower power rating"],
    correctAnswer: "If they have 10 or fewer parking spaces, they don't need to provide cable routes",
    explanation: "Small and medium-sized non-residential buildings with 10 or fewer parking spaces are exempt from the requirement to provide cable routes under Part S. They still need to install at least one charge point, but the cable route requirement for 20% of spaces does not apply. This exemption recognizes the potentially disproportionate cost impact on smaller businesses and organizations. For buildings with just a few parking spaces, the requirement to install cable routes for 20% of spaces might involve minimal future benefit relative to the cost. The exemption helps balance the push for EV infrastructure with practical considerations for smaller premises, while still ensuring that at least one charge point is available for immediate use."
  },
  {
    id: 'regs-part-s-11',
    question: "What type of charge point connector is required by Part S?",
    options: ["Type 1 (J1772) connector only", "Type 2 (Mennekes) connector as standard", "CCS connector", "CHAdeMO connector"],
    correctAnswer: "Type 2 (Mennekes) connector as standard",
    explanation: "Part S requires charge points to have a Type 2 (Mennekes) connector as standard. This aligns with European standards and ensures compatibility with the majority of electric vehicles on the market. The Type 2 connector has become the standard in Europe for AC charging and is used by most electric vehicle manufacturers. The regulation specifies that charge points must be at least Mode 3, which allows for communication between the vehicle and charging equipment for safety and charging management. While the document acknowledges that other connector types exist, the Type 2 requirement ensures a baseline of interoperability across different vehicle makes and models, avoiding a situation where residents or visitors might be unable to use the available charging infrastructure due to incompatible connectors."
  },
  {
    id: 'regs-part-s-12',
    question: "What are the requirements for existing buildings undergoing material change of use to create a dwelling?",
    options: ["No requirements for change of use", "Cable routes only", "Same requirements as for new dwellings", "Lower power charge points are permitted"],
    correctAnswer: "Same requirements as for new dwellings",
    explanation: "Existing buildings undergoing material change of use to create a dwelling must meet the same requirements as for new dwellings under Part S. This means that if an office building, warehouse, or other non-residential structure is being converted into residential units, each unit with associated parking should have an EV charge point installed. The charge points must meet the same specifications as those for new buildings, including the 7kW minimum power output and Type 2 connector standard. This requirement recognizes that change of use projects represent significant interventions in the building fabric and services, making it a practical time to incorporate charging infrastructure. It also ensures that all new dwellings, whether newly built or created through conversion, provide comparable facilities for future occupants."
  },
  {
    id: 'regs-part-s-13',
    question: "What is the 'historic and listed buildings' exemption under Part S?",
    options: ["Historic buildings are completely exempt from all requirements", "Only charge points visible from the exterior are exempt", "Requirements can be relaxed if compliance would unacceptably alter the character or appearance of the building", "There is no exemption for historic buildings"],
    correctAnswer: "Requirements can be relaxed if compliance would unacceptably alter the character or appearance of the building",
    explanation: "Under Part S, historic and listed buildings have a specific exemption where the requirements can be relaxed if compliance would unacceptably alter the character or appearance of the building. This applies to listed buildings, buildings in conservation areas, and other buildings with special historical or architectural interest. The exemption acknowledges that installing charging infrastructure might sometimes conflict with conservation objectives. However, this is not a blanket exemption - alternative approaches should be considered that provide reasonable provision while respecting the building's character. For example, charge points might be positioned more discreetly, or cable routes might follow existing service routes. The exemption requires a balanced assessment of the need for charging infrastructure against conservation priorities, rather than automatically prioritizing one over the other."
  },
  {
    id: 'regs-part-s-14',
    question: "What does Part S require for mixed-use buildings with both residential and non-residential elements?",
    options: ["Only the residential requirements apply", "Only the non-residential requirements apply", "The respective requirements apply to the different parts of the building", "A special hybrid requirement applies"],
    correctAnswer: "The respective requirements apply to the different parts of the building",
    explanation: "For mixed-use buildings with both residential and non-residential elements, Part S requires that the respective requirements apply to the different parts of the building. This means that residential parking spaces associated with dwellings in the building must comply with the residential requirements (one charge point per dwelling), while parking associated with the non-residential portions must meet the non-residential standards (at least one charge point plus cable routes for 20% of spaces). In practice, this often requires careful planning of the parking allocation and electrical infrastructure to ensure the appropriate provision for each type of use. The regulations recognize the distinct charging needs and patterns of residential versus non-residential users, even when they share the same building, and ensure appropriate facilities for both."
  },
  {
    id: 'regs-part-s-15',
    question: "What are the requirements for residential buildings with unallocated parking under Part S?",
    options: ["No requirements apply to unallocated parking", "Every parking space must have a charge point", "Cable routes only for all spaces", "At least one charge point, plus cable routes for one-fifth of the total spaces"],
    correctAnswer: "At least one charge point, plus cable routes for one-fifth of the total spaces",
    explanation: "For residential buildings with unallocated parking (where parking spaces are not assigned to specific dwellings), Part S requires at least one charge point, plus cable routes for one-fifth (20%) of the total spaces. This approach is similar to the requirements for non-residential buildings. The regulation recognizes that unallocated parking serves multiple dwellings, with varying and potentially changing needs for charging infrastructure. The initial charge point provides immediate capability, while the cable routes allow for cost-effective expansion as demand increases. This balanced approach avoids over-provision at the outset (which might lead to underutilized charge points) while ensuring future-proofing through the cable routes, which significantly reduce the cost and disruption of adding more charge points later."
  },
  {
    id: 'regs-part-s-16',
    question: "What accessibility features does Part S recommend for charge points?",
    options: ["No specific accessibility recommendations are made", "Charge points must be color-coded for visibility", "Charge points should be at a height suitable for wheelchair users and have sufficient space for access", "All charge points must have audio guidance features"],
    correctAnswer: "Charge points should be at a height suitable for wheelchair users and have sufficient space for access",
    explanation: "Part S recommends that charge points should be at a height suitable for wheelchair users and have sufficient space for access. Specifically, it suggests that the charging connection point should be between 0.75m and 1.2m from the ground, allowing comfortable access for most users, including those in wheelchairs. The guidance also recommends ensuring adequate space around the charge point for wheelchair maneuverability and that the location and design should minimize tripping hazards from cables. There should be a clear space of at least 1.2m in front of the charge point. These recommendations reflect the importance of inclusive design principles, ensuring that electric vehicle charging is accessible to all users, including those with disabilities. While these are recommendations rather than strict requirements, they align with broader accessibility standards in the built environment."
  },
  {
    id: 'regs-part-s-17',
    question: "What requirements does Part S have for the physical protection of charge points?",
    options: ["No specific requirements for protection", "All charge points must be in locked cabinets", "The installation should minimize the risk of impact damage, for example through positioning or protective barriers", "Charge points must be installed at least 5 meters from any parking spaces"],
    correctAnswer: "The installation should minimize the risk of impact damage, for example through positioning or protective barriers",
    explanation: "Part S requires that charge point installations should minimize the risk of impact damage, for example through positioning or protective barriers. This is particularly important for charge points in parking areas where there is a risk of vehicle impact. The guidance suggests measures such as: positioning charge points away from vehicle maneuvering areas; mounting charge points on walls where they are less vulnerable to impact; installing protective bollards or barriers around charge points in vulnerable locations; and ensuring installations comply with BS EN 61851 (Electric vehicle conductive charging system) for safety. These measures recognize that charge points represent a significant investment and provide essential functionality, so protecting them from accidental damage is important for both safety and maintaining service availability."
  },
  {
    id: 'regs-part-s-18',
    question: "What does Part S require regarding the visibility of charge points to drivers?",
    options: ["Charge points must be painted bright colors", "Charge points must have illuminated signage visible at night", "Charge points should be clearly visible to drivers, or appropriate signage should be provided", "No visibility requirements are specified"],
    correctAnswer: "Charge points should be clearly visible to drivers, or appropriate signage should be provided",
    explanation: "Part S requires that charge points should be clearly visible to drivers, or appropriate signage should be provided. This ensures that users can easily locate charging facilities, particularly in larger car parks or where charge points might not be immediately obvious. The guidance does not mandate specific colors or illumination but focuses on the practical outcome of users being able to find the charge points. Appropriate signage might include standard EV charging symbols, directional signs in larger facilities, or bay markings to indicate spaces with charging provision. This requirement recognizes the practical user experience aspects of EV charging infrastructure, acknowledging that even well-installed charge points provide limited benefit if users cannot easily locate them when needed."
  },
  {
    id: 'regs-part-s-19',
    question: "What is the requirement for cable routes in terms of building electrical capacity?",
    options: ["No consideration of electrical capacity is required", "Cable routes must include fully installed electrical capacity for all future charge points", "Spaces should be provided in distribution boards for future circuit protective devices", "Only enough capacity for one additional charge point is required"],
    correctAnswer: "Spaces should be provided in distribution boards for future circuit protective devices",
    explanation: "For cable routes, Part S requires that spaces should be provided in distribution boards for future circuit protective devices. This means that while the full electrical capacity for all potential future charge points doesn't need to be installed initially, the electrical systems should be designed with expansion in mind. Specifically, distribution boards should have physical space for additional circuit breakers or other protective devices that would be needed when converting cable routes to active charge points. This approach balances immediate costs with future-proofing, recognizing that electrical demand may grow gradually as more EV charge points are installed. The requirement ensures that basic provision for expansion is incorporated during initial construction, when it's most cost-effective, without requiring the full electrical infrastructure to be installed before it's needed."
  },
  {
    id: 'regs-part-s-20',
    question: "What transitional provisions were included when Part S came into force?",
    options: ["No transitional provisions were included", "A 3-month transition period for all buildings", "Buildings where work had started before June 15, 2022 were exempt", "Work where building notices or full plans were submitted before June 15, 2022 was exempt if commenced before June 15, 2023"],
    correctAnswer: "Work where building notices or full plans were submitted before June 15, 2022 was exempt if commenced before June 15, 2023",
    explanation: "When Part S came into force, transitional provisions specified that work where building notices or full plans were submitted before June 15, 2022 was exempt from the requirements, provided that the work commenced before June 15, 2023. This one-year window allowed projects already in the planning pipeline to proceed without needing to be redesigned to incorporate EV charging provisions. The requirement to commence work within a year prevented developers from submitting plans early simply to avoid the new regulations indefinitely. For developments with multiple buildings, the commencement of work on the first building was sufficient to secure the transitional provisions for the entire development. These transitional arrangements provided a reasonable adjustment period for the industry while ensuring the regulations would apply to projects where there was still scope to incorporate the new requirements."
  },
  {
    id: 'regs-part-s-21',
    question: "What is the definition of an 'associated parking space' under Part S?",
    options: ["Any parking space within 1 mile of the building", "A parking space reserved exclusively for one dwelling", "A parking space on the same site as the building or located nearby with exclusive rights for building users", "Only parking spaces physically attached to the building"],
    correctAnswer: "A parking space on the same site as the building or located nearby with exclusive rights for building users",
    explanation: "Under Part S, an 'associated parking space' is defined as a parking space on the same site as the building or located nearby with exclusive rights for building users. This includes parking spaces that are part of the building's curtilage, in an on-site car park, or in a nearby car park where spaces are specifically allocated to the building's occupants. The key factors are the physical or rights-based connection between the parking spaces and the building. This definition ensures that the charging infrastructure requirements apply where there is a clear link between the building and parking provision, regardless of the exact arrangement. The definition is important for determining how many charge points and cable routes are required, as the regulations are based on the number of associated parking spaces rather than arbitrary factors such as building size."
  },
  {
    id: 'regs-part-s-22',
    question: "What requirements does Part S include for the inspection and testing of installed charge points?",
    options: ["No requirements for inspection and testing", "Annual testing by the local authority", "Charge points must be inspected, tested and certified as meeting relevant standards before being put into use", "Testing is only required if the charge point is publicly accessible"],
    correctAnswer: "Charge points must be inspected, tested and certified as meeting relevant standards before being put into use",
    explanation: "Part S requires that charge points must be inspected, tested, and certified as meeting relevant standards before being put into use. This includes compliance with: BS 7671 (Requirements for Electrical Installations, the IET Wiring Regulations); BS EN 61851 (Electric vehicle conductive charging system); and the Electrical Safety Quality and Continuity Regulations 2002. The installation should be carried out by a competent person, typically a qualified electrician with specific EV charging installation training. Documentation of this inspection and testing should be provided to building control bodies as evidence of compliance and to the building owner for their records. This requirement ensures that charge points are not only physically installed but are also safe and functional, minimizing the risk of electrical hazards or operational problems that could discourage EV adoption."
  },
  {
    id: 'regs-part-s-23',
    question: "What technical standard is referenced in Part S for electrical installations including EV charge points?",
    options: ["ISO 9001", "BS 7671 (IET Wiring Regulations)", "IEEE 802.11", "ETSI EN 300 220"],
    correctAnswer: "BS 7671 (IET Wiring Regulations)",
    explanation: "Part S references BS 7671, commonly known as the IET Wiring Regulations, as the key technical standard for electrical installations including EV charge points. This comprehensive standard covers all aspects of electrical installation design, selection, erection, inspection, and testing. It includes specific requirements for EV charging installations in Section 722. Compliance with BS 7671 ensures that charging installations are safe, appropriately protected against electrical faults, and designed with sufficient capacity for the intended use. The standard addresses issues such as protection against electric shock, thermal effects, overcurrent, isolation, and earthing arrangements. All electrical work, including EV charge point installation, must be carried out in accordance with this standard, and installations should be certified as compliant through appropriate documentation."
  },
  {
    id: 'regs-part-s-24',
    question: "What is the primary difference between the EV charging requirements for residential and non-residential buildings under Part S?",
    options: ["Non-residential buildings have no requirements", "Residential buildings require higher power charge points", "Residential buildings require one charge point per dwelling, while non-residential buildings require one charge point plus cable routes for 20% of spaces", "Non-residential charge points must be publicly accessible"],
    correctAnswer: "Residential buildings require one charge point per dwelling, while non-residential buildings require one charge point plus cable routes for 20% of spaces",
    explanation: "The primary difference between EV charging requirements for residential and non-residential buildings under Part S is that residential buildings require one charge point per dwelling (or one per associated parking space if fewer), while non-residential buildings require one charge point plus cable routes for 20% of spaces. This difference reflects the distinct charging patterns and needs in these different contexts. Residential charging typically involves overnight charging at home as the primary method, making individual access to a charge point important. Non-residential charging is typically supplementary or occasional, with vehicles parked for shorter periods. The non-residential approach balances immediate needs (one charge point) with future-proofing (cable routes for 20%), allowing expansion as demand grows, while the residential requirement ensures that each household with parking has immediate charging capability."
  },
  {
    id: 'regs-part-s-25',
    question: "What is the minimum technical standard for the 'cable route' requirements under Part S?",
    options: ["Cable routes can be simple surface-mounted trunking", "Cable routes must be underground ducts at least 100mm in diameter", "Cable routes should be suitable for the future installation of cable with a minimum capacity of 7kW charging", "No minimum standard is specified for cable routes"],
    correctAnswer: "Cable routes should be suitable for the future installation of cable with a minimum capacity of 7kW charging",
    explanation: "Under Part S, cable routes should be suitable for the future installation of cable with a minimum capacity of 7kW charging. This means the containment systems (ducts, conduits, trays, etc.) must be sized appropriately to accommodate cables that can deliver at least 7kW to each potential future charge point. The regulations don't prescribe specific dimensions or installation methods but focus on the functional requirement that the routes can accommodate sufficient electrical capacity. This includes considerations of route size, accessibility for future cable installation, and appropriate junction boxes or drawpits where needed. The standard ensures that when cable routes are converted to active charge points in the future, they can deliver the same minimum power level (7kW) as charge points installed during initial construction, maintaining consistency in charging capability regardless of when the charge point is installed."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-s', 'items', q.id), {
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
