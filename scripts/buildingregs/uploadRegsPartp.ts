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

// ✅ Building Regulations Part P - Electrical Safety Questions
const questions = [
  {
    id: 'regs-part-p-1',
    question: "What is the primary purpose of Part P of the Building Regulations?",
    options: ["To reduce the cost of electrical installations", "To ensure consistency in electrical installation designs", "To protect people from fire and electric shock hazards in dwellings", "To promote the use of renewable energy sources"],
    correctAnswer: "To protect people from fire and electric shock hazards in dwellings",
    explanation: "The primary purpose of Part P of the Building Regulations is to protect people from fire and electric shock hazards in dwellings. It was introduced in 2005 to improve the safety of electrical installations in homes, as faulty electrical work can lead to serious injury or death from electric shock, fires caused by electrical faults, and property damage. Part P ensures that electrical work in homes is designed and installed to protect occupants from these dangers by setting safety standards and requiring that certain types of electrical work are either carried out by qualified professionals or inspected and certified before completion."
  },
  {
    id: 'regs-part-p-2',
    question: "Which types of buildings does Part P of the Building Regulations apply to?",
    options: ["All buildings including commercial and industrial", "Only new build properties", "Dwellings only (houses, flats, etc.)", "Listed buildings only"],
    correctAnswer: "Dwellings only (houses, flats, etc.)",
    explanation: "Part P of the Building Regulations applies only to dwellings, which includes houses, flats, apartments, bungalows, maisonettes, and other residential properties. It does not apply to commercial or industrial buildings, which are covered by different regulations and standards. The focus on dwellings reflects the recognition that homeowners and domestic occupants are particularly vulnerable to electrical hazards, as they may not have the technical knowledge to assess the safety of electrical installations in their homes. Commercial and industrial electrical installations are typically designed, installed, and maintained by qualified professionals under different regulatory frameworks."
  },
  {
    id: 'regs-part-p-3',
    question: "What is the maximum voltage that Part P applies to for electrical installations in dwellings?",
    options: ["230V", "400V", "1000V AC", "No voltage limit is specified"],
    correctAnswer: "1000V AC",
    explanation: "Part P applies to electrical installations in dwellings that operate at voltages not exceeding 1000V AC (alternating current). This covers all standard domestic electrical installations, which typically operate at 230V single-phase or 400V three-phase in the UK. The 1000V limit encompasses the vast majority of electrical installations that would ever be installed in domestic properties, while excluding very high voltage installations that would typically only be found in industrial or utility contexts. This voltage limit is consistent with other electrical standards such as BS 7671 (the IET Wiring Regulations), which also sets 1000V AC as its upper limit for low voltage installations."
  },
  {
    id: 'regs-part-p-4',
    question: "Which of the following is a 'notifiable' type of electrical work under Part P?",
    options: ["Replacing a damaged socket with a like-for-like replacement", "Installing a new circuit in a kitchen", "Changing a light bulb", "Replacing a damaged fuse in a plug"],
    correctAnswer: "Installing a new circuit in a kitchen",
    explanation: "Installing a new circuit in a kitchen is notifiable work under Part P. Notifiable work includes the installation of new circuits anywhere in a dwelling, as well as work in what the regulations define as 'special locations' such as kitchens, bathrooms, and outdoors. The installation of a new circuit represents significant electrical work that could pose safety risks if not properly designed and installed. Non-notifiable work typically includes like-for-like replacements of damaged accessories, repairs to cables (but not complete rewiring), and minor works such as adding an additional socket to an existing circuit in a non-special location. Simple maintenance tasks like changing light bulbs or fuses are not covered by Part P at all."
  },
  {
    id: 'regs-part-p-5',
    question: "Which of these areas is considered a 'special location' under Part P where most electrical work is notifiable?",
    options: ["Living room", "Hallway", "Bedroom", "Bathroom"],
    correctAnswer: "Bathroom",
    explanation: "A bathroom is considered a 'special location' under Part P where most electrical work is notifiable. Special locations are areas where there is an increased risk of electric shock due to environmental conditions. In bathrooms, the presence of water and wet surfaces significantly increases the risk of electric shock, as water is a conductor of electricity. Other special locations include kitchens, swimming pools, saunas, and outdoor areas. These locations require additional safety measures and expertise during electrical installation, which is why work in these areas generally requires notification to building control or installation by a competent person registered with a Part P scheme, even for relatively minor electrical work."
  },
  {
    id: 'regs-part-p-6',
    question: "Who can legally carry out notifiable electrical work under Part P?",
    options: ["Only electricians with a Part P qualification", "Any DIY enthusiast with basic electrical knowledge", "A registered competent person or someone whose work is checked by a building control body", "Only electrical contractors approved by the local authority"],
    correctAnswer: "A registered competent person or someone whose work is checked by a building control body",
    explanation: "Under Part P, notifiable electrical work can be legally carried out by either a registered competent person (an electrician registered with a competent person scheme such as NICEIC, ELECSA, or others) or by someone whose work is checked and certified by a building control body. Registered competent persons are qualified to self-certify their work, meaning they can issue certificates confirming compliance with the regulations without needing additional inspection. If the work is done by someone who is not a registered competent person (such as a DIY homeowner or an unregistered electrician), it must be notified to the local building control body before work begins, and they will typically arrange for an inspection before issuing a compliance certificate, often at additional cost."
  },
  {
    id: 'regs-part-p-7',
    question: "What certificate should be issued upon completion of notifiable electrical work by a registered competent person?",
    options: ["Building Compliance Notice", "Electrical Warning Certificate", "Electrical Installation Certificate", "Property Improvement Notice"],
    correctAnswer: "Electrical Installation Certificate",
    explanation: "Upon completion of notifiable electrical work, a registered competent person should issue an Electrical Installation Certificate (EIC). This certificate confirms that the installation has been designed, built, inspected, and tested in accordance with BS 7671 (the IET Wiring Regulations) and therefore meets the requirements of Part P. The EIC includes important details about the installation, test results, and a declaration of compliance. For smaller modifications to existing installations, a Minor Electrical Installation Works Certificate (MEIWC) might be appropriate instead. Additionally, the registered competent person must notify their scheme provider, who will then issue a Building Regulations Compliance Certificate to the customer and notify the local authority of the completed work."
  },
  {
    id: 'regs-part-p-8',
    question: "What is the relationship between Part P and BS 7671 (the IET Wiring Regulations)?",
    options: ["They are completely separate and unrelated regulations", "BS 7671 is a legally binding document that replaces Part P", "Part P is a section within BS 7671", "Part P requires compliance with BS 7671 as a means of meeting safety requirements"],
    correctAnswer: "Part P requires compliance with BS 7671 as a means of meeting safety requirements",
    explanation: "Part P of the Building Regulations requires compliance with BS 7671 (the IET Wiring Regulations) as a means of meeting its safety requirements. While Part P is a legal requirement enforceable under the Building Regulations, BS 7671 itself is not directly a legal document but rather a British Standard containing detailed technical specifications. Part P is more concerned with the regulatory framework (who can do the work, notification requirements, etc.), while BS 7671 provides the comprehensive technical standards for how electrical installations should be designed, installed, inspected, and tested. Compliance with the current edition of BS 7671 is regarded as demonstrating compliance with the safety requirements of Part P."
  },
  {
    id: 'regs-part-p-9',
    question: "What can happen if electrical work does not comply with Part P regulations?",
    options: ["Nothing, as Part P is only advisory", "A verbal warning from the local authority", "The local authority can require work to be removed or altered, and penalties may be imposed", "Only a small administrative fee will be charged"],
    correctAnswer: "The local authority can require work to be removed or altered, and penalties may be imposed",
    explanation: "If electrical work does not comply with Part P regulations, the local authority has the power to require that the work be removed or altered to make it compliant, potentially at significant cost to the homeowner. Additionally, failure to comply with the Building Regulations, including Part P, is a criminal offense that can result in prosecution, with fines of up to £5,000 per breach. Non-compliant work can also invalidate home insurance policies, potentially leaving homeowners financially vulnerable in the event of an electrical fire or other incident. Furthermore, when selling a property, any notifiable electrical work that lacks proper certification may be identified during the conveyancing process, potentially impacting the sale or requiring retrospective certification."
  },
  {
    id: 'regs-part-p-10',
    question: "When was Part P of the Building Regulations first introduced in England and Wales?",
    options: ["1990", "2000", "2005", "2013"],
    correctAnswer: "2005",
    explanation: "Part P of the Building Regulations was first introduced in England and Wales in January 2005. It represented a significant change in the regulation of domestic electrical work, bringing such work under the scope of building regulations for the first time. Prior to 2005, there was no specific legal requirement for electrical work in dwellings to be carried out by qualified electricians or to be inspected by building control, which had led to concerns about the safety of domestic electrical installations. The regulations were later amended in 2013 to reduce the types of work that require notification, but the fundamental requirement for all electrical work to be safe remains unchanged."
  },
  {
    id: 'regs-part-p-11',
    question: "What is the purpose of a 'Minor Electrical Installation Works Certificate' (MEIWC)?",
    options: ["To document non-compliant work that needs upgrading", "To certify small alterations to existing circuits that don't include the addition of new circuits", "To exempt certain types of work from Part P requirements", "To register a new property with the local authority"],
    correctAnswer: "To certify small alterations to existing circuits that don't include the addition of new circuits",
    explanation: "A Minor Electrical Installation Works Certificate (MEIWC) is used to certify small alterations to existing circuits that don't include the addition of new circuits. It's a simplified form of certification appropriate for minor works such as adding a socket to an existing circuit, replacing a damaged accessory, or rewiring a single circuit. The MEIWC confirms that the work has been designed, installed, inspected, and tested in accordance with BS 7671, but it contains less detailed information than a full Electrical Installation Certificate (EIC). Even though the work might be 'minor,' if it's notifiable under Part P, it still requires proper certification, and the MEIWC fulfills this requirement for smaller jobs, ensuring that safety standards are maintained while reducing the administrative burden for simple works."
  },
  {
    id: 'regs-part-p-12',
    question: "Which of the following electrical works is NOT typically notifiable under Part P?",
    options: ["Installing a new circuit in a bedroom", "Adding an outdoor security light", "Complete rewiring of a house", "Like-for-like replacement of a damaged light switch"],
    correctAnswer: "Like-for-like replacement of a damaged light switch",
    explanation: "A like-for-like replacement of a damaged light switch is typically NOT notifiable under Part P. Repairs and replacements of damaged electrical items on a like-for-like basis are generally considered non-notifiable, as they maintain the existing design and don't introduce new risks when properly executed. In contrast, installing a new circuit (even in a non-special location like a bedroom), adding outdoor electrical installations, and complete house rewiring are all notifiable works that require either a registered competent person to do the work or notification to building control. The 2013 amendments to Part P reduced the scope of notifiable work, but significant installations and work in special locations remain notifiable to ensure safety standards are maintained."
  },
  {
    id: 'regs-part-p-13',
    question: "What is a 'Competent Person Scheme' in the context of Part P?",
    options: ["A training program for DIY enthusiasts", "A government assessment of individual electricians", "A self-certification scheme allowing registered members to certify their own notifiable work", "A theoretical examination for electrical apprentices"],
    correctAnswer: "A self-certification scheme allowing registered members to certify their own notifiable work",
    explanation: "A 'Competent Person Scheme' in the context of Part P is a self-certification scheme that allows registered members to certify that their notifiable electrical work complies with the Building Regulations without needing additional inspection by building control. Organizations such as NICEIC, ELECSA, and NAPIT operate these government-authorized schemes, which assess and register electricians who have demonstrated competence and the right technical knowledge. Members must meet rigorous qualification requirements, maintain technical standards, undergo regular reassessments, and have appropriate insurance. This system simplifies the compliance process, as scheme members can issue certificates directly to customers, notify the local authority electronically, and provide a warranty for their work, all while maintaining high safety standards."
  },
  {
    id: 'regs-part-p-14',
    question: "In what circumstances would electrical work in a garage require notification under Part P?",
    options: ["Only if the garage is attached to the dwelling", "If the garage contains a consumer unit regardless of attachment", "All garage electrical work requires notification", "Garage electrical work is never notifiable"],
    correctAnswer: "Only if the garage is attached to the dwelling",
    explanation: "Electrical work in a garage requires notification under Part P only if the garage is attached to the dwelling and shares the same electrical supply. In this case, the garage is considered part of the dwelling, and notifiable electrical work such as installing new circuits would require certification by a registered competent person or notification to building control. If the garage is detached from the dwelling with its own separate electrical supply or consumer unit, it's generally not considered part of the dwelling for Part P purposes, even if it's on the same property. However, regardless of whether the work is notifiable, all electrical installations must comply with the technical standards in BS 7671 to ensure safety."
  },
  {
    id: 'regs-part-p-15',
    question: "What obligation does a registered competent person have after completing notifiable electrical work?",
    options: ["No obligations beyond issuing a certificate to the customer", "They must notify the local authority and their scheme provider of the completed work", "They must arrange for a building control inspection", "They must notify the electricity supplier"],
    correctAnswer: "They must notify the local authority and their scheme provider of the completed work",
    explanation: "After completing notifiable electrical work, a registered competent person must notify both their scheme provider and, through them, the local authority of the completed work. This is typically done electronically through their competent person scheme's notification system. They must also provide appropriate certification to the customer (an Electrical Installation Certificate or Minor Electrical Installation Works Certificate), complete with test results. The notification to the local authority is a legal requirement and creates an official record that the work was carried out in compliance with the Building Regulations. This notification is crucial for property records, future property sales, and for demonstrating that the legal requirements of Part P have been met."
  },
  {
    id: 'regs-part-p-16',
    question: "What testing is required to certify electrical work under Part P?",
    options: ["Visual inspection only", "Basic continuity testing", "Full testing as required by BS 7671, including insulation resistance and earth continuity tests", "Testing is optional for minor works"],
    correctAnswer: "Full testing as required by BS 7671, including insulation resistance and earth continuity tests",
    explanation: "To certify electrical work under Part P, full testing as required by BS 7671 (the IET Wiring Regulations) must be conducted, including insulation resistance tests, earth continuity tests, polarity checks, earth fault loop impedance measurements, and RCD operation tests where applicable. These tests verify that the installation is safe and compliant with technical standards. Both visual inspection and testing are essential components of the certification process. The extent of testing depends on the nature of the work, but even minor works require appropriate verification. Test results must be recorded on the certification documents (EIC or MEIWC), providing evidence that the installation has been properly verified and is safe for use."
  },
  {
    id: 'regs-part-p-17',
    question: "What is the purpose of the 'Building Regulations Compliance Certificate' issued by competent person schemes?",
    options: ["To register the property for council tax", "To confirm that building work complies with all Building Regulations", "To provide evidence that notifiable electrical work complies with Part P", "To exempt the property from future electrical inspections"],
    correctAnswer: "To provide evidence that notifiable electrical work complies with Part P",
    explanation: "The 'Building Regulations Compliance Certificate' issued by competent person schemes provides evidence that notifiable electrical work complies with Part P of the Building Regulations. This certificate is issued by the competent person scheme (not the electrician directly) to the customer after the scheme has been notified of the completed work by the registered installer. It serves as official confirmation that the work meets safety standards and building regulations requirements. This document is important for property records, insurance purposes, and when selling a property, as it proves the electrical work was properly certified. Unlike the Electrical Installation Certificate (which details the technical aspects of the installation), the Building Regulations Compliance Certificate specifically addresses compliance with the legal requirements of the Building Regulations."
  },
  {
    id: 'regs-part-p-18',
    question: "What is the recommended procedure if a homeowner wants to carry out notifiable electrical work themselves?",
    options: ["They cannot legally do the work themselves under any circumstances", "They can do the work but must attend a short course first", "They can do the work but must notify building control before starting and arrange for inspection/testing", "They can do the work without notification if they feel confident"],
    correctAnswer: "They can do the work but must notify building control before starting and arrange for inspection/testing",
    explanation: "If a homeowner wants to carry out notifiable electrical work themselves, they can legally do so, but they must notify their local building control body before starting the work and arrange for inspection and testing. The building control body will typically inspect the work during installation and again upon completion to verify compliance with the regulations. The homeowner will need to pay a fee for this service, which is often more expensive than using a registered competent person. After satisfactory inspection, the building control body will issue a completion certificate. This approach ensures that while DIY electrical work is permitted, it still meets the necessary safety standards through independent verification, protecting both the current occupants and future owners of the property."
  },
  {
    id: 'regs-part-p-19',
    question: "Which of the following statements about Part P certification is correct?",
    options: ["Certificates are optional and only needed when selling a property", "Certificates expire after 5 years and installations must be recertified", "Certificates should be retained for the life of the installation as proof of compliance", "Only electricians need to keep copies of certificates"],
    correctAnswer: "Certificates should be retained for the life of the installation as proof of compliance",
    explanation: "Certificates should be retained for the life of the installation as proof of compliance with Part P. These documents are important legal records that demonstrate the work was carried out in compliance with Building Regulations. They should be kept safe along with other property documents and passed on to future owners when selling the property. Unlike electrical condition reports (which involve periodic safety inspections and have a recommended renewal period), installation certificates do not expire or require renewal unless the installation is modified. Both the installer and the homeowner should retain copies of these certificates. In addition to being a legal requirement, having proper certification can be essential for insurance validity and when selling the property."
  },
  {
    id: 'regs-part-p-20',
    question: "Which of these electrical works would likely require notification under Part P?",
    options: ["Replacing a light fitting in a living room", "Installing a new electric shower in a bathroom", "Replacing a damaged electrical outlet with the same type", "Changing a light bulb"],
    correctAnswer: "Installing a new electric shower in a bathroom",
    explanation: "Installing a new electric shower in a bathroom would likely require notification under Part P for two significant reasons. First, it typically involves installing a new circuit, which is notifiable work regardless of location. Second, bathrooms are designated as 'special locations' due to the increased risk of electric shock in wet areas, making most electrical work in bathrooms notifiable. Electric showers also typically require high-power connections (often 7-10kW), creating additional safety considerations. This installation would need to be either carried out by a registered competent person who can self-certify the work or notified to building control before commencement. The other options listed generally involve like-for-like replacements or simple maintenance, which are typically non-notifiable."
  },
  {
    id: 'regs-part-p-21',
    question: "What specific safety requirements apply to electrical installations in bathrooms under Part P and BS 7671?",
    options: ["No electrical installations are permitted in bathrooms", "Only lighting is permitted in bathrooms", "Special zones with specific requirements for equipment location and protection", "Only battery-operated devices are allowed"],
    correctAnswer: "Special zones with specific requirements for equipment location and protection",
    explanation: "Electrical installations in bathrooms under Part P and BS 7671 must comply with special zones with specific requirements for equipment location and protection. These zones are defined based on proximity to water sources: Zone 0 (inside the bath or shower), Zone 1 (directly above bath/shower up to 2.25m), Zone 2 (area extending 0.6m beyond Zone 1), and outside zones. Each zone has strict requirements about what electrical equipment can be installed and what protection is needed. For example, in Zones 0 and 1, only SELV (Safety Extra-Low Voltage) equipment at 12V maximum is generally permitted. All circuits in bathrooms must be protected by RCDs with a trip sensitivity of no more than 30mA. These requirements recognize the significantly increased risk of electric shock in wet environments."
  },
  {
    id: 'regs-part-p-22',
    question: "What is the primary purpose of a Residual Current Device (RCD) in domestic electrical installations?",
    options: ["To prevent power surges during lightning strikes", "To quickly disconnect the supply when a current leakage is detected, reducing shock risk", "To regulate voltage fluctuations", "To prevent overloading of circuits"],
    correctAnswer: "To quickly disconnect the supply when a current leakage is detected, reducing shock risk",
    explanation: "The primary purpose of a Residual Current Device (RCD) in domestic electrical installations is to quickly disconnect the supply when a current leakage is detected, significantly reducing the risk of electric shock. RCDs work by monitoring the balance of current flowing between live and neutral conductors - if current leaks to earth (such as through a person receiving an electric shock), the RCD detects the imbalance and trips rapidly, typically within 30-40 milliseconds. Part P and BS 7671 require RCD protection for certain circuits, particularly those serving special locations like bathrooms and outdoor sockets, and for all socket outlets that may reasonably be expected to supply portable equipment for use outdoors. This protection is essential for preventing fatal electric shocks and is a key safety feature in modern electrical installations."
  },
  {
    id: 'regs-part-p-23',
    question: "Under Part P, what must be done if notifiable electrical work has been carried out without prior notification?",
    options: ["The work must be completely removed and redone", "Nothing, as retrospective notification is not possible", "The homeowner must apply for regularization from the local authority", "The work is automatically exempt after 6 months"],
    correctAnswer: "The homeowner must apply for regularization from the local authority",
    explanation: "If notifiable electrical work has been carried out without prior notification under Part P, the homeowner must apply for regularization from the local authority. Regularization is a retrospective application process that seeks to legitimize unauthorized work after it has been completed. The local authority will typically require the installation to be inspected and tested by a qualified electrician to verify its safety and compliance with standards. This process usually incurs higher fees than standard notification and may require exposure of concealed parts of the installation. If the work is found to be non-compliant, remedial work will be required before regularization is granted. This process is important for ensuring safety, insurance validity, and avoiding problems when selling the property in the future."
  },
  {
    id: 'regs-part-p-24',
    question: "What is the recommended qualification for someone to become registered with a Part P competent person scheme?",
    options: ["No formal qualifications are required", "A short online electrical safety course", "Level 3 NVQ in Electrical Installation or equivalent recognized qualification", "Any construction-related qualification"],
    correctAnswer: "Level 3 NVQ in Electrical Installation or equivalent recognized qualification",
    explanation: "The recommended qualification for someone to become registered with a Part P competent person scheme is a Level 3 NVQ in Electrical Installation or an equivalent recognized qualification. This typically represents the minimum standard of competence required by most schemes. Applicants usually need to demonstrate both theoretical knowledge and practical experience in electrical installation work. Many schemes also require evidence of understanding the current edition of BS 7671 (the IET Wiring Regulations) and related building regulations. Additionally, applicants generally need to show they have appropriate test equipment, insurance coverage, and ongoing commitment to continuing professional development. These requirements ensure that registered competent persons have the necessary skills and knowledge to carry out electrical work safely and in compliance with regulations."
  },
  {
    id: 'regs-part-p-25',
    question: "How did the 2013 amendments to Part P change the requirements for electrical work in dwellings?",
    options: ["They increased the range of notifiable work to include all electrical modifications", "They removed all requirements for notification", "They reduced the types of work requiring notification while maintaining the requirement for all work to be safe", "They introduced mandatory licensing for all electricians"],
    correctAnswer: "They reduced the types of work requiring notification while maintaining the requirement for all work to be safe",
    explanation: "The 2013 amendments to Part P reduced the types of work requiring notification while maintaining the fundamental requirement for all electrical work to be safe. Prior to 2013, more types of electrical work required notification, including additions to circuits in all locations. The 2013 changes limited notifiable work primarily to new circuit installations, complete rewiring, and work in special locations such as bathrooms, kitchens, and outdoors. This change was intended to reduce regulatory burden on homeowners and the industry while maintaining safety standards. Importantly, although fewer types of work now require notification, all electrical work in dwellings still must comply with safety standards, typically by adhering to BS 7671. The amendments represented a balanced approach to ensuring safety while reducing unnecessary administrative requirements."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-p', 'items', q.id), {
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
