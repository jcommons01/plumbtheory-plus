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

// ✅ Building Regulations Part R - Communications Infrastructure Questions
const questions = [
  {
    id: 'regs-part-r-1',
    question: "What is the primary purpose of Approved Document R of the Building Regulations?",
    options: ["To regulate radio and television broadcasting", "To provide guidance on telecommunications infrastructure in buildings", "To set standards for internet service providers", "To control radio frequency emissions from buildings"],
    correctAnswer: "To provide guidance on telecommunications infrastructure in buildings",
    explanation: "The primary purpose of Approved Document R is to provide guidance on telecommunications infrastructure in buildings. It focuses on ensuring that new buildings and major renovations incorporate the necessary physical infrastructure to support high-speed electronic communications networks. Introduced to facilitate better broadband connectivity throughout the UK, Part R aims to future-proof buildings by requiring appropriate ducting, cable routes, and termination points that can accommodate high-speed data connections. This reflects the increasing importance of digital connectivity in modern life and aligns with broader government objectives to enhance digital infrastructure across the country."
  },
  {
    id: 'regs-part-r-2',
    question: "When did the 2022 edition of Approved Document R come into force?",
    options: ["January 1, 2022", "June 15, 2022", "October 1, 2022", "December 26, 2022"],
    correctAnswer: "December 26, 2022",
    explanation: "The 2022 edition of Approved Document R came into force on December 26, 2022. This updated version significantly expanded the requirements from the previous edition, particularly by introducing the obligation for developers to install gigabit-capable connections in new dwellings where reasonably practicable. Transitional provisions allowed projects where building notices or full plans were submitted before this date to follow the previous requirements, provided work commenced within 12 months. This date marked an important milestone in the UK's approach to ensuring digital connectivity in new buildings, representing a shift from merely providing the physical infrastructure for future connections to actually requiring the connections themselves in most cases."
  },
  {
    id: 'regs-part-r-3',
    question: "How many volumes does the 2022 edition of Approved Document R consist of?",
    options: ["One volume covering all buildings", "Two volumes: one for dwellings and one for other buildings", "Three volumes organized by building type", "Four volumes organized by network type"],
    correctAnswer: "Two volumes: one for dwellings and one for other buildings",
    explanation: "The 2022 edition of Approved Document R consists of two volumes: Volume 1 covers 'Physical infrastructure and network connection for new dwellings,' while Volume 2 addresses 'Physical infrastructure for high-speed electronic communications networks' in buildings other than dwellings and major renovations to existing buildings (including dwellings). This division reflects the different requirements for these building types. Volume 1 contains the more comprehensive requirements, including the obligation to install actual connections to gigabit-capable networks in new dwellings where reasonably practicable, whereas Volume 2 focuses primarily on ensuring appropriate physical infrastructure is in place to facilitate future connections."
  },
  {
    id: 'regs-part-r-4',
    question: "Which of the following building types is covered by Volume 1 of Approved Document R (2022)?",
    options: ["Existing commercial buildings", "New office buildings", "New dwellings", "Hotels and guest houses"],
    correctAnswer: "New dwellings",
    explanation: "Volume 1 of Approved Document R (2022) specifically covers new dwellings. It applies to the erection of new houses, flats, and other residential units. This volume contains more extensive requirements, including the obligation to install both gigabit-ready physical infrastructure and, where reasonably practicable, an actual connection to a gigabit-capable public electronic communications network. The focus on new dwellings reflects the government's priority to ensure that new homes are built with future-proof connectivity, recognizing the importance of high-speed internet access for residential users. Other building types, including commercial buildings, offices, and hotels, are covered under Volume 2 of the document."
  },
  {
    id: 'regs-part-r-5',
    question: "What does RA1 in Approved Document R (Volume 1) require for new dwellings?",
    options: ["Smart home automation systems", "Solar panel infrastructure", "Gigabit-ready physical infrastructure", "Satellite dish mounting points"],
    correctAnswer: "Gigabit-ready physical infrastructure",
    explanation: "Requirement RA1 in Approved Document R (Volume 1) mandates that new dwellings must be equipped with gigabit-ready physical infrastructure. This includes the installation of appropriate ducting, chambers, cable routes, and network termination points that are capable of supporting gigabit-speed data connections. The physical infrastructure must extend from the dwelling to the property boundary or another suitable access point for connection to a public network. This requirement ensures that even if a gigabit connection isn't immediately installed, the necessary physical pathway exists to facilitate such a connection in the future without requiring significant structural modifications to the property."
  },
  {
    id: 'regs-part-r-6',
    question: "What does RA2 in Approved Document R (Volume 1) require for new dwellings?",
    options: ["5G mobile capabilities", "Wireless access points", "Connection to a gigabit-capable public electronic communications network", "Telephone landline connections"],
    correctAnswer: "Connection to a gigabit-capable public electronic communications network",
    explanation: "Requirement RA2 in Approved Document R (Volume 1) mandates that new dwellings must be provided with a connection to a gigabit-capable public electronic communications network. This represents a significant advancement from previous regulations, as it requires not just the infrastructure for potential future connections, but the actual installation of a gigabit-capable connection at the time of construction. This connection must be 'gigabit-capable,' meaning it can deliver data download speeds of at least 1 gigabit per second. The requirement aims to ensure that new homes are immediately equipped with high-speed internet capability, reflecting the essential nature of good connectivity in modern life."
  },
  {
    id: 'regs-part-r-7',
    question: "Under what circumstances might the requirement to install a gigabit-capable connection (RA2) be modified?",
    options: ["When the building is more than 5 stories high", "When the building will be used as a holiday home", "When the cost exceeds £2,000 or there's no network available", "When the property is not expected to have internet access"],
    correctAnswer: "When the cost exceeds £2,000 or there's no network available",
    explanation: "The requirement to install a gigabit-capable connection (RA2) may be modified when the cost exceeds £2,000 or when there is no gigabit-capable public electronic communications network available. If the cost of connection exceeds £2,000, only the first £2,000 must be committed, and alternative arrangements can be made for the remainder. If no gigabit-capable network is available, the developer must install the highest speed connection that wouldn't exceed £2,000 and also install gigabit-ready infrastructure for future upgrading. These conditions recognize practical limitations while still ensuring that reasonable efforts are made to provide the best possible connectivity, with provisions for future improvement when full gigabit capability becomes available."
  },
  {
    id: 'regs-part-r-8',
    question: "What does Approved Document R mean by a 'Network Termination Point'?",
    options: ["The place where the telephone company's service ends", "The router provided by the internet service provider", "The point where the in-building network connects to the public network", "The central distribution hub in an apartment building"],
    correctAnswer: "The point where the in-building network connects to the public network",
    explanation: "In Approved Document R, a 'Network Termination Point' refers to the point where the in-building network connects to the public network. It's essentially where the building's internal telecommunications infrastructure interfaces with the external service provider's network. The Network Termination Point typically includes a socket or other connection facility that allows telecommunications equipment (like routers or modems) to be connected to the service. The regulations require that this termination point be properly installed and positioned to facilitate connection to a gigabit-capable network. For individual dwellings, this is usually located in a convenient, accessible position within the property, while in multi-dwelling buildings, there might be both individual termination points in each unit and a common point where the building connects to the external network."
  },
  {
    id: 'regs-part-r-9',
    question: "What is a 'gigabit-capable network' as defined in Approved Document R?",
    options: ["Any network using fiber optic cable", "A network capable of delivering at least 1 gigabit per second download speed", "Any network installed after 2020", "A network with less than 10ms latency"],
    correctAnswer: "A network capable of delivering at least 1 gigabit per second download speed",
    explanation: "A 'gigabit-capable network' as defined in Approved Document R is a network capable of delivering at least 1 gigabit per second download speed to the premises. This refers to the theoretical maximum capacity of the connection rather than the actual service speed a resident might subscribe to. While fiber optic connections are commonly used to deliver gigabit speeds, the regulations are technology-neutral and don't specify the physical medium, focusing instead on the performance capability. This allows for future technological developments and different solutions that can meet the gigabit threshold. The definition ensures that the infrastructure installed has the capacity to support very high-speed data transfer, future-proofing properties for increasingly data-intensive applications and services."
  },
  {
    id: 'regs-part-r-10',
    question: "Which of the following scenarios would NOT trigger the requirements of Volume 2 of Approved Document R?",
    options: ["Construction of a new office building", "Major renovation of a shopping center", "Constructing an extension to an existing house", "Converting a warehouse into multiple commercial units"],
    correctAnswer: "Constructing an extension to an existing house",
    explanation: "Constructing an extension to an existing house would NOT trigger the requirements of Volume 2 of Approved Document R. Volume 2 applies to the construction of new buildings other than dwellings (such as commercial or industrial buildings) and to major renovation works to existing buildings (including dwellings). However, minor works such as extensions to existing houses are generally not considered 'major renovation works' unless they significantly affect the building's structure and systems. The regulations aim to focus on substantial projects where incorporating communications infrastructure is practical and proportionate, rather than smaller residential alterations where retrofitting such infrastructure might be disproportionately disruptive or expensive relative to the scale of the work."
  },
  {
    id: 'regs-part-r-11',
    question: "What does Approved Document R define as 'major renovation works'?",
    options: ["Any construction work exceeding £100,000 in value", "Any work requiring planning permission", "Works including renovation of more than 25% of the surface of the building envelope", "Any work that changes the use class of a building"],
    correctAnswer: "Works including renovation of more than 25% of the surface of the building envelope",
    explanation: "Approved Document R defines 'major renovation works' as those which include renovation of more than 25% of the surface of the building envelope. The 'building envelope' refers to the entire external structure of the building, including walls, roof, windows, and doors that separate the internal environment from the external environment. This definition aligns with European standards for identifying substantial renovations. When renovations exceed this 25% threshold, it's considered a significant enough modification to warrant upgrading the building's communications infrastructure as part of the work. This approach targets projects that involve substantial reconstruction or refurbishment, where incorporating new infrastructure elements is more practical than in minor alterations."
  },
  {
    id: 'regs-part-r-12',
    question: "What is the purpose of a 'Connectivity Plan' under Part R?",
    options: ["To design the Wi-Fi network within a building", "To document how the building will comply with requirements RA1 and RA2", "To calculate the bandwidth needs of future occupants", "To establish service agreements with internet providers"],
    correctAnswer: "To document how the building will comply with requirements RA1 and RA2",
    explanation: "A 'Connectivity Plan' under Part R is a document that outlines how a development will comply with requirements RA1 and RA2. It serves as evidence for building control bodies to verify compliance with the regulations. The plan typically includes details of the physical infrastructure to be installed (such as ducting, chambers, and termination points), the proposed connection to a gigabit-capable network (or justification for any modified approach if applicable), and confirmation that appropriate consultation with network operators has taken place. It may also include site plans showing infrastructure routes, specifications of components to be used, and contact information for network operators. The Connectivity Plan ensures a systematic approach to planning and implementing the communications infrastructure, helping to prevent oversights and facilitating approval of the building work."
  },
  {
    id: 'regs-part-r-13',
    question: "Who should developers typically consult with when planning to meet Part R requirements?",
    options: ["Only the local planning authority", "Only the eventual building occupants", "Public electronic communications network operators", "Just their in-house IT department"],
    correctAnswer: "Public electronic communications network operators",
    explanation: "When planning to meet Part R requirements, developers should typically consult with public electronic communications network operators. These are the telecommunications companies that provide services in the area where the development is located. Early consultation with these operators is essential to determine: what networks are available in the area; the feasibility and cost of connecting to gigabit-capable networks; the operators' specific requirements for in-building infrastructure; and the optimal routes and specifications for ducting and cabling. This consultation ensures that the infrastructure installed will be compatible with the available services and meets industry standards. It also helps to identify potential challenges early in the design process, avoiding costly modifications later. The guidance recommends consulting multiple operators to ensure competitive provision of services to occupants."
  },
  {
    id: 'regs-part-r-14',
    question: "What does Part R require regarding the positioning of the Network Termination Point in a dwelling?",
    options: ["It must be in the main living room", "It must be in a communications cupboard", "It must be accessible and enable connection to the gigabit-ready infrastructure", "It must be at least 1.5m above floor level"],
    correctAnswer: "It must be accessible and enable connection to the gigabit-ready infrastructure",
    explanation: "Part R requires that the Network Termination Point in a dwelling must be accessible and enable connection to the gigabit-ready infrastructure. While the regulations don't mandate a specific room or height for placement, they emphasize that the termination point should be situated where it can be easily accessed for installation, maintenance, and connection of equipment such as routers. It should also be positioned in a location that facilitates effective distribution of the signal throughout the dwelling. Typically, this might be near the main living space or in a central location within the home. The guidance acknowledges that optimal positioning may vary depending on the dwelling's layout and the occupants' needs, but prioritizes accessibility and functional connectivity over prescriptive location requirements."
  },
  {
    id: 'regs-part-r-15',
    question: "What are the minimum specifications for underground ducting for communications infrastructure according to Part R?",
    options: ["50mm diameter PVC ducting", "Twin 100mm diameter ducting", "Any size flexible plastic conduit", "The document doesn't specify minimum duct sizes"],
    correctAnswer: "The document doesn't specify minimum duct sizes",
    explanation: "Part R doesn't specify minimum duct sizes for communications infrastructure in the explicit terms of numerical dimensions. Instead, it takes a performance-based approach, requiring that ducting should be 'sufficient' to accommodate gigabit-capable connections and be installed following industry best practices. This approach allows flexibility to adapt to different situations and evolving technologies. However, the guidance does recommend consulting with network operators who may have specific requirements for duct dimensions. In practice, many developments use 90-100mm diameter ducting for external routes as this has become an industry standard that accommodates current and anticipated future cabling needs. The regulations focus on ensuring the ducting is fit for purpose rather than mandating universal dimensions that might not be appropriate in all contexts."
  },
  {
    id: 'regs-part-r-16',
    question: "In a building containing multiple dwellings, what approach does Part R recommend for communications infrastructure?",
    options: ["Each dwelling should have its own independent connection to the property boundary", "A central hub with a single connection to the external network", "A shared infrastructure with individual connections to each dwelling from a common access point", "Wireless-only solutions to avoid cabling complexity"],
    correctAnswer: "A shared infrastructure with individual connections to each dwelling from a common access point",
    explanation: "For buildings containing multiple dwellings, Part R recommends a shared infrastructure approach with individual connections to each dwelling from a common access point. This typically involves installing a common vertical riser pathway (in multi-story buildings) with horizontal distribution routes to each dwelling. A communal equipment room or cabinet often serves as the central connection point where the building connects to the external network. From this point, individual cables run to each dwelling's Network Termination Point. This approach is more efficient than providing separate external connections for each dwelling, reducing redundancy in infrastructure while still ensuring each dwelling has its own dedicated connection. The shared pathways should be designed with sufficient capacity to accommodate multiple service providers, allowing occupants choice in their communications provider."
  },
  {
    id: 'regs-part-r-17',
    question: "What is a 'spine pathway' as referenced in Part R?",
    options: ["A central nervous system for smart buildings", "The main distribution route for communications infrastructure in larger developments", "A backup network pathway for redundancy", "A pathway designed for future spinal column cabling"],
    correctAnswer: "The main distribution route for communications infrastructure in larger developments",
    explanation: "A 'spine pathway' as referenced in Part R is the main distribution route for communications infrastructure in larger developments. It serves as the primary pathway from the site entrance or boundary to individual buildings or groups of buildings within the development. In multi-building developments, the spine pathway typically follows the main access routes, with branches leading to each building. It includes the ducts, chambers, and other infrastructure components needed to route cables across the site. The spine pathway must be designed with sufficient capacity to accommodate multiple service providers and future expansion needs. Proper planning of the spine pathway is critical in larger developments to ensure efficient network distribution while minimizing the need for disruptive civil works once the development is occupied."
  },
  {
    id: 'regs-part-r-18',
    question: "What aspect of telecommunications infrastructure does Part R NOT specifically address?",
    options: ["Physical pathways for cables", "Connection to public networks", "Wireless access points within buildings", "In-building cabling routes"],
    correctAnswer: "Wireless access points within buildings",
    explanation: "Part R does NOT specifically address wireless access points within buildings. The regulations focus primarily on the physical infrastructure for wired connections, including ducting, chambers, cable routes, and termination points. While the installed infrastructure would support the deployment of wireless networks (as the wired connection can feed into wireless routers or access points), the specific requirements for wireless coverage, access point positioning, or wireless networking standards are not covered by the regulations. This approach recognizes that wireless network design is often specific to the building's use and occupant needs, and technology in this area evolves rapidly. The regulations instead concentrate on ensuring the foundational physical infrastructure is in place to support whatever networking solutions (wired or wireless) the occupants choose to implement."
  },
  {
    id: 'regs-part-r-19',
    question: "What evidence might building control bodies typically request to demonstrate compliance with Part R?",
    options: ["Internet speed test results", "Network coverage guarantees from service providers", "Connectivity Plans and as-built documentation", "Customer satisfaction surveys"],
    correctAnswer: "Connectivity Plans and as-built documentation",
    explanation: "Building control bodies typically request Connectivity Plans and as-built documentation to demonstrate compliance with Part R. A Connectivity Plan outlines the proposed approach to meeting the requirements, including details of the physical infrastructure and network connections to be installed. As-built documentation provides evidence that the work has been completed as planned, including drawings showing the installed infrastructure, specifications of components used, and confirmation that connections have been established or provisions made for future connections. Other acceptable evidence might include certificates from network operators confirming connection arrangements, photographs of installed infrastructure, or site inspection by building control officers. The focus is on verifying that the physical elements required by the regulations have been properly installed and are capable of supporting gigabit-speed connections."
  },
  {
    id: 'regs-part-r-20',
    question: "Under Part R, what should happen if no gigabit-capable network is available to connect to during construction?",
    options: ["The building is exempt from all Part R requirements", "Only wireless infrastructure needs to be installed", "The highest-speed available connection should be installed, plus gigabit-ready infrastructure", "Construction must be delayed until a gigabit-capable network becomes available"],
    correctAnswer: "The highest-speed available connection should be installed, plus gigabit-ready infrastructure",
    explanation: "Under Part R, if no gigabit-capable network is available to connect to during construction, the developer should install the highest-speed connection that is available (up to the £2,000 cost cap) and also install gigabit-ready infrastructure. This dual approach ensures that the dwelling has the best currently available connectivity while being future-proofed for upgrading when gigabit-capable networks become available. The gigabit-ready infrastructure includes appropriate ducting, termination points, and access points that will facilitate a straightforward upgrade without major structural work. This requirement recognizes that while gigabit coverage is expanding, there are still areas without such networks, but it ensures that new buildings won't face barriers to upgrading when the networks do reach their location."
  },
  {
    id: 'regs-part-r-21',
    question: "What is the relationship between Part R and the Electronic Communications Code?",
    options: ["Part R replaces the Electronic Communications Code", "They are completely unrelated regulations", "The Electronic Communications Code governs service providers' access rights to installed infrastructure", "Part R is a subset of the Electronic Communications Code"],
    correctAnswer: "The Electronic Communications Code governs service providers' access rights to installed infrastructure",
    explanation: "The Electronic Communications Code governs service providers' access rights to the infrastructure installed under Part R requirements. While Part R ensures that new buildings have the physical infrastructure for high-speed connections, the Electronic Communications Code sets out the legal framework for how telecommunications operators can access, install, and maintain their equipment on public and private land and buildings. The Code gives network operators certain rights, including the ability to install and maintain equipment on properties, subject to various conditions and potential compensation to property owners. This complementary relationship means that Part R mandates the installation of suitable infrastructure, while the Electronic Communications Code facilitates service providers' ability to connect to and utilize that infrastructure, ensuring a comprehensive approach to expanding digital connectivity."
  },
  {
    id: 'regs-part-r-22',
    question: "What is meant by 'building envelope' in the context of Part R when determining if works constitute 'major renovation'?",
    options: ["The building's heating and cooling system", "The financial budget for the project", "The external walls, roof, ground floor, windows, and doors", "The timeline for completing construction"],
    correctAnswer: "The external walls, roof, ground floor, windows, and doors",
    explanation: "In the context of Part R, when determining if works constitute 'major renovation,' the 'building envelope' refers to the external walls, roof, ground floor, windows, and doors of a building - essentially all the elements that separate the interior environment from the exterior. Major renovation is defined as works that include renovation of more than 25% of the surface area of this building envelope. This definition helps establish a clear threshold for when the requirements of Part R apply to renovation projects. By focusing on the envelope, the regulations target projects that involve significant external works where integration of communications infrastructure would be most practical, as such projects often already include substantial interventions in the building fabric that could accommodate new ducting and cabling pathways."
  },
  {
    id: 'regs-part-r-23',
    question: "What are the transitional arrangements for the 2022 edition of Approved Document R?",
    options: ["All buildings must comply immediately regardless of planning stage", "Only buildings over 10 units must comply with the new requirements", "Buildings with notices submitted before December 26, 2022, are exempt if work starts within 12 months", "The requirements are optional until 2025"],
    correctAnswer: "Buildings with notices submitted before December 26, 2022, are exempt if work starts within 12 months",
    explanation: "The transitional arrangements for the 2022 edition of Approved Document R state that buildings with building notices or full plans submitted before December 26, 2022, are exempt from the new requirements, provided work starts within 12 months of that date. This means that projects already in the planning pipeline when the new regulations came into force would not need to be redesigned to incorporate the additional requirements, recognizing that such retrospective changes could be disruptive and costly. For developments consisting of multiple buildings, it's the commencement of work on the first building that determines whether the transitional provisions apply to the entire development. These arrangements provide a reasonable grace period for the industry to adapt to the new standards while ensuring timely implementation for new projects."
  },
  {
    id: 'regs-part-r-24',
    question: "Which of the following statements is TRUE regarding the costs of meeting Part R requirements?",
    options: ["Developers must cover all costs regardless of the amount", "A connection costing more than £2,000 is completely exempt from the requirements", "The cost cap of £2,000 applies only to the connection, not to the in-building infrastructure", "All costs must be shared equally with service providers"],
    correctAnswer: "The cost cap of £2,000 applies only to the connection, not to the in-building infrastructure",
    explanation: "It is TRUE that the cost cap of £2,000 applies only to the connection to the public network, not to the in-building infrastructure. Developers must install all necessary in-building gigabit-ready infrastructure regardless of cost, as this is a fundamental requirement with no cost cap. However, for the external connection to a gigabit-capable public network, developers are required to commit up to £2,000 per dwelling. If the connection would cost more than this threshold, developers can either choose to pay the additional costs or implement alternative arrangements (such as installing the highest-speed connection available within the £2,000 limit). This balanced approach ensures that basic infrastructure is always provided while recognizing that external connection costs can vary significantly depending on location and existing network proximity."
  },
  {
    id: 'regs-part-r-25',
    question: "What is the primary difference between the requirements in Volume 1 and Volume 2 of Approved Document R (2022)?",
    options: ["Volume 1 covers wireless connections while Volume 2 covers wired connections", "Volume 1 applies to residential buildings while Volume 2 applies to commercial buildings", "Volume 1 requires both infrastructure and connections, while Volume 2 only requires infrastructure", "Volume 1 is mandatory while Volume 2 is advisory"],
    correctAnswer: "Volume 1 requires both infrastructure and connections, while Volume 2 only requires infrastructure",
    explanation: "The primary difference between Volumes 1 and 2 of Approved Document R (2022) is that Volume 1 requires both gigabit-ready infrastructure and, where reasonably practicable, connections to gigabit-capable networks for new dwellings, while Volume 2 only requires the installation of physical infrastructure for high-speed networks in non-dwelling buildings and major renovations. This distinction reflects the different priorities for residential versus other buildings. For homes, immediate connectivity is considered essential for residents, justifying the more comprehensive requirements. For commercial and other buildings, the regulations focus on ensuring the physical pathways for future connections are in place, but leave the actual connections to be arranged according to the specific needs of the eventual occupants. This approach recognizes the diverse and potentially specialized connectivity requirements of different business and institutional users."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-r', 'items', q.id), {
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
