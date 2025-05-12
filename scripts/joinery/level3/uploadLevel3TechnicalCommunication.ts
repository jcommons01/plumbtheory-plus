// ✅ COMPLETE: npx ts-node scripts/joinery/level3/uploadLevel3TechnicalCommunication.ts

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

// ✅ Joinery Level 3 Technical Communication Questions
const questions = [
  {
    id: 'joinery-l3-technical-communication1',
    question: "What is the primary purpose of a detailed specification document in joinery contracts?",
    options: ["Only to estimate project time", "Only to satisfy legal requirements", "To communicate exact requirements for materials, construction methods, and finishes", "Only to calculate costs"],
    correctAnswer: "To communicate exact requirements for materials, construction methods, and finishes",
    explanation: "A detailed specification document communicates exact requirements for materials, construction methods, and finishes. This comprehensive document provides precise information on quality standards, technical requirements, and performance criteria that drawings alone cannot convey, ensuring all parties share the same understanding of what is to be delivered."
  },
  {
    id: 'joinery-l3-technical-communication2',
    question: "What type of technical drawing shows the internal structure of an object as if it had been cut along a specific plane?",
    options: ["Elevation", "Plan", "Section", "Isometric"],
    correctAnswer: "Section",
    explanation: "A section drawing shows the internal structure of an object as if it had been cut along a specific plane. This view reveals interior details and construction methods that would otherwise be hidden, indicated by a cutting plane line on other views. Sections are vital for understanding complex joinery components and how different elements interact."
  },
  {
    id: 'joinery-l3-technical-communication3',
    question: "What does scale 1:5 on a technical drawing indicate?",
    options: ["The drawing is 5 times larger than the actual object", "The drawing is one-fifth the size of the actual object", "The drawing has 5 millimeters accuracy", "The drawing has 5 different views"],
    correctAnswer: "The drawing is one-fifth the size of the actual object",
    explanation: "Scale 1:5 indicates the drawing is one-fifth the size of the actual object. This means that 1 unit on the drawing represents 5 units on the actual object. In practical terms, 10mm on the drawing would represent 50mm on the actual object, allowing larger items to be represented on manageable sheet sizes while maintaining accurate proportions."
  },
  {
    id: 'joinery-l3-technical-communication4',
    question: "What is the purpose of using 'line weights' (varying line thicknesses) in joinery technical drawings?",
    options: ["Only to make the drawing more attractive", "Only to compensate for different pencil types", "To create visual hierarchy, distinguish different elements, and improve readability", "Line weights have no specific purpose in technical drawings"],
    correctAnswer: "To create visual hierarchy, distinguish different elements, and improve readability",
    explanation: "Line weights create visual hierarchy, distinguish different elements, and improve drawing readability. Thicker lines typically show cut surfaces or outlines, while thinner lines indicate hidden features, dimensions, or hatching. This convention helps viewers quickly understand the drawing's structure and importance of various elements, making complex technical information more accessible."
  },
  {
    id: 'joinery-l3-technical-communication5',
    question: "What does a drawing title block typically contain?",
    options: ["Only the drafter's name", "Only the scale information", "Project name, drawing title, date, scale, drafter details, revision information, and drawing number", "Only the client's address"],
    correctAnswer: "Project name, drawing title, date, scale, drafter details, revision information, and drawing number",
    explanation: "A drawing title block typically contains project name, drawing title, date, scale, drafter details, revision information, and drawing number. This standardized information block, usually positioned in the bottom right corner, provides essential reference information for identifying, tracking, and managing technical drawings throughout a project's lifecycle."
  },
  {
    id: 'joinery-l3-technical-communication6',
    question: "What is the difference between a general arrangement drawing and a detailed component drawing in joinery?",
    options: ["There is no difference", "General arrangement drawings are always hand-drawn; detailed component drawings are always CAD-produced", "General arrangement drawings show overall layouts and dimensions; detailed component drawings focus on specific parts with manufacturing details", "General arrangement drawings are only used for kitchens; detailed component drawings are used for all other joinery"],
    correctAnswer: "General arrangement drawings show overall layouts and dimensions; detailed component drawings focus on specific parts with manufacturing details",
    explanation: "General arrangement drawings show overall layouts and dimensions while detailed component drawings focus on specific parts with manufacturing details. GA drawings provide context, showing how components fit together in the complete assembly, while detailed drawings provide precise information for manufacturing individual components, including specific dimensions, joints, and material specifications."
  },
  {
    id: 'joinery-l3-technical-communication7',
    question: "What is the primary purpose of an 'exploded view' drawing in joinery documentation?",
    options: ["To show defective parts", "To illustrate how components fit together by displaying them separated but in alignment", "Only to calculate material quantities", "To display items that have been damaged"],
    correctAnswer: "To illustrate how components fit together by displaying them separated but in alignment",
    explanation: "An exploded view drawing illustrates how components fit together by displaying them separated but in alignment along an axis. This technique shows the relationship between parts while revealing surfaces that would normally be hidden in the assembled state. Exploded views are particularly valuable for explaining assembly sequences and visualizing how complex joinery components interact."
  },
  {
    id: 'joinery-l3-technical-communication8',
    question: "What information should be included in a cutting list for joinery components?",
    options: ["Only the name of each component", "Only the total quantity of timber required", "Component names, dimensions, quantities, materials, and any special processing requirements", "Only the tools required for each cut"],
    correctAnswer: "Component names, dimensions, quantities, materials, and any special processing requirements",
    explanation: "A cutting list for joinery components should include component names, dimensions, quantities, materials, and any special processing requirements. This comprehensive document provides a complete inventory of all parts needed for the project, typically listing finished sizes (after machining), allowing for efficient material ordering, optimization of cutting layouts, and tracking of production progress."
  },
  {
    id: 'joinery-l3-technical-communication9',
    question: "What is the primary purpose of a schedule in technical communication for joinery?",
    options: ["To indicate when payments are due", "To show when each component should be completed", "To present information about repeated elements in a tabular format", "To list the tools required for the project"],
    correctAnswer: "To present information about repeated elements in a tabular format",
    explanation: "In technical communication for joinery, a schedule presents information about repeated elements in a tabular format. This efficient documentation method lists components with the same function but different specifications or locations (like doors, windows, or hardware) in organized columns, making it easier to reference specific items while avoiding repetition in the main drawings or specifications."
  },
  {
    id: 'joinery-l3-technical-communication10',
    question: "What does a 'revision cloud' on a technical drawing indicate?",
    options: ["Areas where rain might affect the installation", "Areas where the drawing is unclear", "Areas that have been changed since a previous version of the drawing", "Areas that need to be checked by a supervisor"],
    correctAnswer: "Areas that have been changed since a previous version of the drawing",
    explanation: "A revision cloud on a technical drawing indicates areas that have been changed since a previous version. This cloud-shaped outline (usually drawn as a series of semicircular arcs) highlights modifications, ensuring they're easily noticed by anyone familiar with earlier versions. Revision clouds are typically accompanied by revision numbers and descriptions in the title block to track the drawing's evolution."
  },
  {
    id: 'joinery-l3-technical-communication11',
    question: "What is the purpose of a 'request for information' (RFI) in joinery projects?",
    options: ["To request additional payment", "To request more time to complete the work", "To formally request clarification or additional details about designs, specifications, or requirements", "To request information about other competitors"],
    correctAnswer: "To formally request clarification or additional details about designs, specifications, or requirements",
    explanation: "A request for information (RFI) formally requests clarification or additional details about designs, specifications, or requirements. This documented communication process helps resolve ambiguities or information gaps in project documentation, ensuring accurate execution. RFIs typically include specific questions, reference relevant documents, suggest potential solutions, and require formal responses to maintain clear communication records."
  },
  {
    id: 'joinery-l3-technical-communication12',
    question: "What is the purpose of dimensioning standards in technical drawings?",
    options: ["To make drawings look more professional", "To use up empty space on the drawing", "To ensure consistency, clarity, and accuracy in communicating measurements", "Dimensioning standards only apply to architectural drawings, not joinery"],
    correctAnswer: "To ensure consistency, clarity, and accuracy in communicating measurements",
    explanation: "Dimensioning standards ensure consistency, clarity, and accuracy in communicating measurements. These conventions specify how dimensions should be presented, including line types, arrowheads, text placement, and notation methods. Following established standards reduces misinterpretation, ensures measurements are unambiguous, and maintains professionalism across all project documentation."
  },
  {
    id: 'joinery-l3-technical-communication13',
    question: "What does 'NTS' mean when noted on a technical drawing?",
    options: ["New Technical Standard", "Not To Scale", "Needs Technical Supervision", "National Technical Specification"],
    correctAnswer: "Not To Scale",
    explanation: "NTS means Not To Scale when noted on a technical drawing. This notation indicates that the drawing or detail cannot be measured using a scale rule, and dimensions must be taken only from the dimension figures provided. This is often used for schematic diagrams or when a drawing has been resized without maintaining true scale proportions."
  },
  {
    id: 'joinery-l3-technical-communication14',
    question: "What is a 'shop drawing' in joinery projects?",
    options: ["A drawing of the workshop layout", "A sketch made while shopping for materials", "A detailed fabrication drawing prepared by the joiner based on design intent drawings", "A drawing used only in retail settings"],
    correctAnswer: "A detailed fabrication drawing prepared by the joiner based on design intent drawings",
    explanation: "A shop drawing is a detailed fabrication drawing prepared by the joiner based on design intent drawings. These production-focused documents translate conceptual or architectural designs into precise manufacturing instructions, including exact dimensions, materials, construction methods, and hardware requirements. Shop drawings require approval before fabrication to ensure they accurately interpret the design intent."
  },
  {
    id: 'joinery-l3-technical-communication15',
    question: "What does a broken line consisting of one long dash followed by two short dashes typically represent on a joinery drawing?",
    options: ["Material to be removed", "Hidden or concealed edges", "Centerlines", "Cutting plane lines"],
    correctAnswer: "Centerlines",
    explanation: "A broken line consisting of one long dash followed by two short dashes typically represents centerlines on a joinery drawing. This line convention marks axes of symmetry, centers of circles or arcs, and reference lines for positioning features. Centerlines are a fundamental element of technical drawing standards, helping to locate features precisely and indicate symmetrical relationships."
  },
  {
    id: 'joinery-l3-technical-communication16',
    question: "What is the primary purpose of a 'transmittal' document in joinery project communications?",
    options: ["To transmit radio signals on site", "To formally record what information has been sent, when, and to whom", "To request payment", "To transmit design changes only"],
    correctAnswer: "To formally record what information has been sent, when, and to whom",
    explanation: "A transmittal document formally records what information has been sent, when, and to whom. This administrative document creates a paper trail of information exchange, listing all items transmitted (drawings, specifications, samples), their revision levels, the purpose of transmission, and often requesting acknowledgment of receipt. Transmittals help track document flow and establish accountability throughout the project."
  },
  {
    id: 'joinery-l3-technical-communication17',
    question: "Why are isometric projections useful in joinery technical drawings?",
    options: ["They show objects exactly as they appear to the human eye", "They allow for precise measurements to be taken directly from the drawing", "They provide a three-dimensional representation while maintaining true scale along each axis", "They are only useful for metal components, not timber"],
    correctAnswer: "They provide a three-dimensional representation while maintaining true scale along each axis",
    explanation: "Isometric projections provide a three-dimensional representation while maintaining true scale along each axis. Unlike perspective drawings, these projections show all three dimensions without distortion of scale, making them valuable for visualizing complex joinery components while still allowing measurements along the principal axes. This combination of visual clarity and dimensional accuracy makes isometrics particularly useful for explaining complex assemblies."
  },
  {
    id: 'joinery-l3-technical-communication18',
    question: "What is the purpose of a 'submittal' in joinery project communication?",
    options: ["Only to submit time sheets", "Only to request additional payment", "To formally present materials, product data, or shop drawings for approval before proceeding", "Only to submit complaints about design changes"],
    correctAnswer: "To formally present materials, product data, or shop drawings for approval before proceeding",
    explanation: "A submittal formally presents materials, product data, or shop drawings for approval before proceeding. This quality control process ensures proposed materials and fabrication details meet design intent and specifications before commitment to purchase or manufacture. The submittal workflow typically includes submission, review, approval (or revision requests), and final documentation, creating a record of agreed-upon standards."
  },
  {
    id: 'joinery-l3-technical-communication19',
    question: "What is a sectional elevation in joinery technical drawing?",
    options: ["A drawing showing only the top view of an object", "A drawing that combines the features of an elevation with a cutting plane to show both exterior and interior details", "A drawing showing only measurements", "A drawing focusing only on decorative elements"],
    correctAnswer: "A drawing that combines the features of an elevation with a cutting plane to show both exterior and interior details",
    explanation: "A sectional elevation combines the features of an elevation with a cutting plane to show both exterior and interior details. This specialized drawing type presents a view of the object's face while also revealing internal construction through a sectional cut, providing comprehensive information about both appearance and structure. Sectional elevations are particularly valuable for complex joinery with important internal details."
  },
  {
    id: 'joinery-l3-technical-communication20',
    question: "What is the purpose of an 'as-built drawing' in joinery projects?",
    options: ["A rough sketch made during the building process", "A drawing showing what was originally planned", "A drawing that documents the actual constructed state, including any deviations from the original design", "A drawing showing only the building exterior"],
    correctAnswer: "A drawing that documents the actual constructed state, including any deviations from the original design",
    explanation: "An as-built drawing documents the actual constructed state, including any deviations from the original design. Created after completion, these records capture the reality of what was built rather than what was planned, including field modifications, adjusted dimensions, and installation details. As-built drawings provide accurate reference for future maintenance, modifications, or renovations by showing exactly what exists."
  },
  {
    id: 'joinery-l3-technical-communication21',
    question: "What does the abbreviation 'TYP.' or 'TYPICAL' mean on a joinery drawing?",
    options: ["The element is temporary", "The highlighted feature applies to all similar instances, even if not individually marked", "The most expensive option available", "The preferred version, but alternatives are acceptable"],
    correctAnswer: "The highlighted feature applies to all similar instances, even if not individually marked",
    explanation: "TYP. or TYPICAL on a joinery drawing means the highlighted feature applies to all similar instances, even if not individually marked. This notation avoids cluttering drawings with repetitive information, indicating that a dimension, detail, or specification applies uniformly to multiple identical elements. The notation streamlines documentation while ensuring consistent application of requirements."
  },
  {
    id: 'joinery-l3-technical-communication22',
    question: "What is the purpose of hatching patterns in section views of joinery drawings?",
    options: ["Only for decorative purposes", "To indicate different materials using standardized patterns", "To show areas that need painting", "To indicate measurements only"],
    correctAnswer: "To indicate different materials using standardized patterns",
    explanation: "Hatching patterns in section views indicate different materials using standardized patterns. These distinct line patterns follow industry conventions to represent specific materials (e.g., different patterns for solid wood, plywood, glass, metal, or concrete), allowing quick visual identification of material types in cut sections without requiring written notes for each material change."
  },
  {
    id: 'joinery-l3-technical-communication23',
    question: "What information should be included in a 'method statement' for joinery installation?",
    options: ["Only the names of workers involved", "Only the tools required", "A detailed description of how work will be carried out, including sequence, techniques, equipment, and safety measures", "Only the total cost breakdown"],
    correctAnswer: "A detailed description of how work will be carried out, including sequence, techniques, equipment, and safety measures",
    explanation: "A method statement includes a detailed description of how work will be carried out, including sequence, techniques, equipment, and safety measures. This document explains the practical approach to executing joinery installation, specifying work procedures, required resources, risk control measures, and quality control checks. Method statements ensure all parties understand the installation process and safety protocols before work begins."
  },
  {
    id: 'joinery-l3-technical-communication24',
    question: "What is the purpose of a 'tolerance' specification in joinery documentation?",
    options: ["To indicate which materials can tolerate moisture", "To specify acceptable deviation limits from stated dimensions or positions", "To show which design elements can be modified by the joiner", "To indicate which aspects of the design the client will tolerate"],
    correctAnswer: "To specify acceptable deviation limits from stated dimensions or positions",
    explanation: "A tolerance specification defines acceptable deviation limits from stated dimensions or positions. This practical acknowledgment that perfect precision is impossible establishes the allowable margin of error for fabrication and installation while ensuring functional and aesthetic requirements are met. Tolerances might be expressed as ±X mm for dimensions or degrees for angles, providing clear acceptance criteria."
  },
  {
    id: 'joinery-l3-technical-communication25',
    question: "What is the main purpose of using BIM (Building Information Modeling) in joinery projects?",
    options: ["To create basic 2D drawings only", "To integrate joinery into a collaborative 3D model containing comprehensive building information", "To replace the need for physical samples", "To eliminate the need for written specifications"],
    correctAnswer: "To integrate joinery into a collaborative 3D model containing comprehensive building information",
    explanation: "BIM integrates joinery into a collaborative 3D model containing comprehensive building information. This approach embeds joinery components within a data-rich virtual representation of the entire building, allowing detection of clashes with other building elements, extraction of accurate quantities, coordination between trades, and simulation of construction sequencing. BIM enhances visualization while maintaining a central information repository for all project stakeholders."
  },
  {
    id: 'joinery-l3-technical-communication26',
    question: "What does the abbreviation 'EQ.' or 'EQUAL' typically indicate on a joinery drawing?",
    options: ["Components that cost the same amount", "Elements that must be exactly level", "Spaces or components that should be divided into equal parts", "Items that can be substituted with alternatives"],
    correctAnswer: "Spaces or components that should be divided into equal parts",
    explanation: "EQ. or EQUAL on joinery drawings indicates spaces or components that should be divided into equal parts. Rather than specifying exact dimensions for each division, this notation instructs that the available space should be evenly divided, regardless of the total dimension. This approach accommodates minor variations in overall dimensions while maintaining visual balance through equal spacing."
  },
  {
    id: 'joinery-l3-technical-communication27',
    question: "What is a 'legend' in technical drawings for joinery?",
    options: ["A mythical story about the origin of joinery", "A list of previous joiners who worked on similar projects", "A key that explains symbols, abbreviations, line types, or hatching patterns used in the drawing", "A prediction about how long the joinery will last"],
    correctAnswer: "A key that explains symbols, abbreviations, line types, or hatching patterns used in the drawing",
    explanation: "A legend in technical drawings is a key that explains symbols, abbreviations, line types, or hatching patterns used in the drawing. This reference guide helps readers interpret and understand drawing conventions that might otherwise be ambiguous, ensuring consistent interpretation of graphical elements. A comprehensive legend promotes clear communication across the project team."
  },
  {
    id: 'joinery-l3-technical-communication28',
    question: "What information should a 'handover document' for completed joinery work include?",
    options: ["Only warranty details", "Only a list of materials used", "Comprehensive information including as-built documentation, maintenance instructions, warranty information, and operating guidance", "Only the final invoice"],
    correctAnswer: "Comprehensive information including as-built documentation, maintenance instructions, warranty information, and operating guidance",
    explanation: "A handover document for completed joinery should include comprehensive information including as-built documentation, maintenance instructions, warranty information, and operating guidance. This package provides clients with everything needed to properly use, maintain, and service the joinery items throughout their lifecycle. Complete documentation ensures proper care and establishes clear warranty conditions."
  },
  {
    id: 'joinery-l3-technical-communication29',
    question: "What is the purpose of a 'datum line' or 'datum point' in joinery setting out drawings?",
    options: ["To indicate the date the drawing was created", "To establish a fixed reference point from which all measurements are taken", "To mark the center of the drawing", "To indicate areas that need special attention"],
    correctAnswer: "To establish a fixed reference point from which all measurements are taken",
    explanation: "A datum line or datum point establishes a fixed reference from which all measurements are taken. This consistent baseline ensures all dimensions relate to the same reference, reducing accumulated errors and providing a common starting point for setting out work. Datum references are particularly important for complex joinery where multiple components must align precisely."
  },
  {
    id: 'joinery-l3-technical-communication30',
    question: "What does a 'reflected ceiling plan' show that would be relevant to joinery work?",
    options: ["The view of the floor from above", "The construction details of the ceiling structure", "The ceiling as viewed from below, showing ceiling-mounted elements", "A mirror image of the floor plan"],
    correctAnswer: "The ceiling as viewed from below, showing ceiling-mounted elements",
    explanation: "A reflected ceiling plan shows the ceiling as viewed from below, displaying ceiling-mounted elements. For joinery, this specialized plan view reveals the relationship between ceiling features and joinery elements like tall cabinets, indicating ceiling-mounted lighting positions relative to joinery, revealing soffits or bulkheads interfacing with cabinetry, and showing ceiling details affecting installation methods."
  },
  {
    id: 'joinery-l3-technical-communication31',
    question: "What is the primary purpose of using standardized drawing conventions in joinery communication?",
    options: ["To make drawings more artistic", "To use up excess paper space", "To ensure consistent interpretation and understanding across different parties", "To make the drawing process more difficult"],
    correctAnswer: "To ensure consistent interpretation and understanding across different parties",
    explanation: "Standardized drawing conventions ensure consistent interpretation and understanding across different parties. These agreed-upon systems for line types, symbols, notation methods, and layout create a universal graphic language, reducing misunderstandings and errors in translation from design to manufacture. When everyone follows the same conventions, technical information is communicated clearly regardless of individual drawing styles."
  },
  {
    id: 'joinery-l3-technical-communication32',
    question: "What does a 'coordination drawing' show in relation to joinery work?",
    options: ["Only the sequence of work for a single trade", "Only the payment schedule", "The relationship and interface between joinery elements and other building components or services", "Only the color coordination of different joinery elements"],
    correctAnswer: "The relationship and interface between joinery elements and other building components or services",
    explanation: "A coordination drawing shows the relationship and interface between joinery elements and other building components or services. These specialized drawings identify potential conflicts before installation, revealing where joinery interacts with mechanical systems, electrical services, structural elements, or other trades' work. By detecting clashes early, coordination drawings prevent costly on-site modifications and installation delays."
  },
  {
    id: 'joinery-l3-technical-communication33',
    question: "What is the main purpose of a 'variation order' in joinery contracts?",
    options: ["To vary the working hours", "To formally document and authorize changes to the original scope, specifications, or drawings", "To vary payment terms only", "To request variations in material without changing the design"],
    correctAnswer: "To formally document and authorize changes to the original scope, specifications, or drawings",
    explanation: "A variation order formally documents and authorizes changes to the original scope, specifications, or drawings. This contractual document captures modifications requested after the initial agreement, describing the change, establishing cost implications, and confirming approval by relevant parties. Variation orders provide a clear record of authorized modifications and form the basis for any adjustments to the contract price or timeline."
  },
  {
    id: 'joinery-l3-technical-communication34',
    question: "What specific information would a door schedule typically contain?",
    options: ["Only door heights", "Only the opening direction", "Door reference numbers, locations, dimensions, materials, hardware requirements, fire ratings, and finishes", "Only installation dates"],
    correctAnswer: "Door reference numbers, locations, dimensions, materials, hardware requirements, fire ratings, and finishes",
    explanation: "A door schedule contains door reference numbers, locations, dimensions, materials, hardware requirements, fire ratings, and finishes. This comprehensive tabular document provides all necessary information for manufacturing and installing doors in a systematic format. The schedule correlates with door marks on floor plans, ensuring each unique door type is correctly specified, manufactured, and installed."
  },
  {
    id: 'joinery-l3-technical-communication35',
    question: "What is the purpose of a 'snagging list' in joinery project documentation?",
    options: ["To list the names of all site workers", "To record items still requiring attention, correction, or completion before the project can be considered finished", "To snag additional work beyond the contract", "To list the tools needed for the project"],
    correctAnswer: "To record items still requiring attention, correction, or completion before the project can be considered finished",
    explanation: "A snagging list records items still requiring attention, correction, or completion before the project can be considered finished. This quality control document identifies minor defects, incomplete elements, or finishing details that need addressing before final handover. The list typically specifies the location, issue description, responsible party, and completion deadline for each item."
  },
  {
    id: 'joinery-l3-technical-communication36',
    question: "What is cross-referencing in technical documentation for joinery?",
    options: ["Checking references from previous employers", "Drawing a cross on important notes", "Making clear connections between related information in different documents", "Only referring to religious symbols in designs"],
    correctAnswer: "Making clear connections between related information in different documents",
    explanation: "Cross-referencing makes clear connections between related information in different documents. This organizational technique links detailed information across drawings, specifications, schedules, and other documentation through reference numbers, tags, or notations. Effective cross-referencing guides readers to relevant supplementary information, ensuring the complete picture is accessible without duplicating information across multiple documents."
  },
  {
    id: 'joinery-l3-technical-communication37',
    question: "What is the purpose of a 'project directory' in joinery project documentation?",
    options: ["Only to list material suppliers", "Only to list tool requirements", "To provide contact information for all key project participants including clients, designers, contractors, and consultants", "Only to list regulations that apply"],
    correctAnswer: "To provide contact information for all key project participants including clients, designers, contractors, and consultants",
    explanation: "A project directory provides contact information for all key project participants including clients, designers, contractors, and consultants. This reference document contains names, roles, organizations, phone numbers, email addresses, and responsibility areas for everyone involved in the project. An up-to-date directory ensures efficient communication by identifying the appropriate contacts for different project aspects."
  },
  {
    id: 'joinery-l3-technical-communication38',
    question: "What is the purpose of using different line weights (thicknesses) in joinery technical drawings?",
    options: ["Only to make the drawing look more artistic", "To indicate different types of timber", "To create visual hierarchy and distinguish between different types of information", "Line weights have no specific purpose"],
    correctAnswer: "To create visual hierarchy and distinguish between different types of information",
    explanation: "Different line weights create visual hierarchy and distinguish between different types of information. This conventional technique uses heavier lines for outlines and cut sections, medium lines for important features and dimensions, and lighter lines for hatching and secondary information. The resulting visual prioritization improves drawing readability by emphasizing the most important elements."
  },
  {
    id: 'joinery-l3-technical-communication39',
    question: "What does the acronym 'TBC' typically mean in joinery technical documentation?",
    options: ["Timber Being Cut", "Totally Below Cost", "To Be Confirmed", "Technical Building Compliance"],
    correctAnswer: "To Be Confirmed",
    explanation: "TBC in joinery technical documentation typically means To Be Confirmed. This notation indicates information that is provisional or pending final decision, alerting readers that the marked details might change. TBC flags elements requiring further clarification, verification, or approval before proceeding with manufacture or installation, preventing work based on uncertain specifications."
  },
  {
    id: 'joinery-l3-technical-communication40',
    question: "What is the primary purpose of a 'technical submittal' in joinery projects?",
    options: ["To request changes to the contract", "To submit time sheets for payment", "To provide detailed product information, shop drawings, or samples for approval before proceeding", "To report problems with the design"],
    correctAnswer: "To provide detailed product information, shop drawings, or samples for approval before proceeding",
    explanation: "A technical submittal provides detailed product information, shop drawings, or samples for approval before proceeding. This quality assurance process allows designers or clients to verify that proposed materials, fabrication details, and aesthetics meet requirements before commitment to manufacture. The submittal review cycle creates a formal approval record, confirming acceptance of specific products and execution methods."
  },
  {
    id: 'joinery-l3-technical-communication41',
    question: "What is the purpose of a 'quality control checklist' in joinery fabrication?",
    options: ["Only to record employee performance", "Only to estimate project costs", "To provide a systematic method for verifying that products meet specified requirements at various stages", "Only to create additional paperwork"],
    correctAnswer: "To provide a systematic method for verifying that products meet specified requirements at various stages",
    explanation: "A quality control checklist provides a systematic method for verifying that products meet specified requirements at various stages. This structured inspection tool lists specific quality criteria to be checked during manufacture and installation, ensuring consistent evaluation against standards. Regular use of comprehensive checklists helps identify issues early, maintain quality standards, and document that proper inspection procedures were followed."
  },
  {
    id: 'joinery-l3-technical-communication42',
    question: "What does a 'reflected plan' show in joinery drawing?",
    options: ["A mirror image of the standard plan", "The plan view as seen from above", "A view of an element as if reflected in a mirror placed beneath it, typically used for ceiling details", "A plan that has been rejected and returned"],
    correctAnswer: "A view of an element as if reflected in a mirror placed beneath it, typically used for ceiling details",
    explanation: "A reflected plan shows a view of an element as if reflected in a mirror placed beneath it, typically used for ceiling details. This specialized drawing convention presents ceiling features as viewed from below (as if reflected in a mirror on the floor), showing ceiling-mounted elements, bulkheads, coffers, or ceiling details that interface with tall joinery items while maintaining the same orientation as floor plans."
  },
  {
    id: 'joinery-l3-technical-communication43',
    question: "What is the main purpose of a 'production schedule' in joinery manufacturing?",
    options: ["Only to determine delivery dates", "Only to calculate material costs", "To plan and allocate resources by establishing when each component will be manufactured", "Only to assign workers to tasks"],
    correctAnswer: "To plan and allocate resources by establishing when each component will be manufactured",
    explanation: "A production schedule plans and allocates resources by establishing when each component will be manufactured. This timeline-based planning tool organizes the workflow sequence, assigns machine and labor resources, establishes production priorities, and coordinates interdependent activities. Effective scheduling optimizes workshop efficiency while ensuring on-time completion to meet installation deadlines."
  },
  {
    id: 'joinery-l3-technical-communication44',
    question: "What is the purpose of 'version control' in technical documentation for joinery?",
    options: ["To restrict who can view documents", "To track the evolution of documents through different revisions", "To control the printing of documents", "To limit the size of documents"],
    correctAnswer: "To track the evolution of documents through different revisions",
    explanation: "Version control tracks the evolution of documents through different revisions. This systematic management approach maintains a history of changes, clearly identifying the most current version while preserving the ability to reference earlier versions when needed. Proper version control prevents confusion about which document version should be used and provides an audit trail of how documentation evolved throughout the project."
  },
  {
    id: 'joinery-l3-technical-communication45',
    question: "What is the primary purpose of a 'material approval sample' in joinery projects?",
    options: ["Only to test manufacturing techniques", "Only to satisfy contractual requirements", "To provide a physical reference standard for the approved appearance and quality", "Only to test finishing products"],
    correctAnswer: "To provide a physical reference standard for the approved appearance and quality",
    explanation: "A material approval sample provides a physical reference standard for the approved appearance and quality. This tangible example establishes the benchmark for acceptable materials, finishes, colors, grain patterns, or construction details. The approved sample becomes the contractual standard against which subsequent production is judged, ensuring the final product meets client expectations for appearance and quality."
  },
  {
    id: 'joinery-l3-technical-communication46',
    question: "What information is typically included in a 'construction phase plan' that would affect joinery installation?",
    options: ["Only delivery routes to site", "Only payment schedules", "Site logistics, working restrictions, welfare facilities, and health and safety arrangements", "Only architectural details"],
    correctAnswer: "Site logistics, working restrictions, welfare facilities, and health and safety arrangements",
    explanation: "A construction phase plan typically includes site logistics, working restrictions, welfare facilities, and health and safety arrangements. For joinery installation, this document provides critical information about site access, material delivery protocols, storage areas, working hours, noise restrictions, security requirements, first aid provisions, and safety procedures. Understanding these site-specific arrangements is essential for planning efficient and compliant installation activities."
  },
  {
    id: 'joinery-l3-technical-communication47',
    question: "What is the purpose of an 'operations and maintenance manual' for joinery installations?",
    options: ["Only to meet building regulations", "Only to provide warranty information", "To provide comprehensive information about maintaining, operating, and caring for the installed joinery", "Only to list replacement parts"],
    correctAnswer: "To provide comprehensive information about maintaining, operating, and caring for the installed joinery",
    explanation: "An operations and maintenance manual provides comprehensive information about maintaining, operating, and caring for installed joinery. This reference document includes cleaning instructions, maintenance schedules, operating guidelines for movable components, adjustment procedures, finish touch-up recommendations, and troubleshooting advice. A complete manual ensures proper long-term care, potentially extending product lifespan while maintaining warranty validity."
  },
  {
    id: 'joinery-l3-technical-communication48',
    question: "What is the primary purpose of using CAD (Computer-Aided Design) for joinery technical communication?",
    options: ["Only to make drawings look more professional", "Only because it is required by regulations", "To enhance accuracy, enable easy revision, facilitate sharing, and potentially integrate with CNC production", "Only to reduce drawing time"],
    correctAnswer: "To enhance accuracy, enable easy revision, facilitate sharing, and potentially integrate with CNC production",
    explanation: "CAD enhances accuracy, enables easy revision, facilitates sharing, and potentially integrates with CNC production. These digital drawing systems provide precision beyond hand drafting, allow efficient modifications without redrawing, support electronic distribution and collaboration, and can directly generate machine instructions for computer-controlled manufacturing equipment. CAD significantly improves both drawing quality and production workflow efficiency."
  },
  {
    id: 'joinery-l3-technical-communication49',
    question: "What is the purpose of using 'layering' in CAD drawings for joinery?",
    options: ["Only to make the drawing more colorful", "Only to meet software requirements", "To organize different types of information in separate layers that can be displayed or hidden as needed", "Only to create 3D effects"],
    correctAnswer: "To organize different types of information in separate layers that can be displayed or hidden as needed",
    explanation: "Layering in CAD organizes different information types in separate layers that can be displayed or hidden as needed. This organizational technique groups related elements (dimensions, text, different components, etc.) on specific layers, allowing users to control which information is visible at any time. Proper layering simplifies drawing management, reduces visual clutter, and enables creation of different drawing views from a single file."
  },
  {
    id: 'joinery-l3-technical-communication50',
    question: "What is the primary purpose of 'technical liaison' between joinery manufacturers and other construction professionals?",
    options: ["Only to schedule social events", "Only to negotiate prices", "To ensure effective communication and coordination of technical requirements between different specialists", "Only to assign blame for problems"],
    correctAnswer: "To ensure effective communication and coordination of technical requirements between different specialists",
    explanation: "Technical liaison ensures effective communication and coordination of technical requirements between different specialists. This professional interaction facilitates information exchange between joinery manufacturers and other construction professionals (architects, interior designers, contractors, MEP engineers), ensuring joinery elements properly integrate with the overall building. Effective liaison resolves technical conflicts, coordinates interfaces, and ensures all parties share a clear understanding of requirements and constraints."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'joinery-l3-technical-communication', 'items', q.id), {
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