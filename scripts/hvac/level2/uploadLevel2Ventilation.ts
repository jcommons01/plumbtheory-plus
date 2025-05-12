// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Ventilation.ts

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

// ✅ HVAC Level 2 Ventilation Fundamentals Questions
const questions = [
  {
    id: 'hvac-l2-ventilation1',
    question: "What is the minimum ventilation rate required for a domestic kitchen in the UK according to Building Regulations Part F?",
    options: ["15 l/s", "30 l/s", "60 l/s", "90 l/s"],
    correctAnswer: "30 l/s",
    explanation: "According to UK Building Regulations Part F (Ventilation), the minimum extract ventilation rate required for a domestic kitchen is 30 litres per second (l/s) adjacent to a hob with intermittent extraction, or 60 l/s elsewhere or if using continuous extraction, to ensure adequate removal of moisture and cooking odours."
  },
  {
    id: 'hvac-l2-ventilation2',
    question: "What is the purpose of a heat recovery ventilation (HRV) system?",
    options: ["To increase the humidity in a space", "To recover heat from exhaust air and transfer it to incoming fresh air", "To filter out all contaminants", "To increase the pressure in ventilated spaces"],
    correctAnswer: "To recover heat from exhaust air and transfer it to incoming fresh air",
    explanation: "The purpose of a heat recovery ventilation (HRV) system is to recover heat from exhaust air and transfer it to incoming fresh air. This reduces energy consumption by pre-heating the incoming fresh air using the thermal energy that would otherwise be lost with the exhaust air, while still providing adequate ventilation for good indoor air quality."
  },
  {
    id: 'hvac-l2-ventilation3',
    question: "Which of the following is a mechanical ventilation system that provides both supply and extract ventilation?",
    options: ["Extract fan only", "Positive input ventilation", "Balanced mechanical ventilation", "Passive stack ventilation"],
    correctAnswer: "Balanced mechanical ventilation",
    explanation: "Balanced mechanical ventilation is a system that provides both supply and extract ventilation. It uses fans to both introduce fresh air into the building and extract stale air, typically at equal rates to maintain neutral pressure. This type of system offers the greatest control over ventilation rates and is often combined with heat recovery."
  },
  {
    id: 'hvac-l2-ventilation4',
    question: "What is the definition of 'air changes per hour' (ACH)?",
    options: ["The volume of air supplied to a space in one hour", "The number of times the air volume in a space is replaced in one hour", "The speed at which air moves through a ventilation system", "The amount of fresh air introduced into a space per occupant"],
    correctAnswer: "The number of times the air volume in a space is replaced in one hour",
    explanation: "Air changes per hour (ACH) is defined as the number of times the air volume in a space is completely replaced in one hour. It is calculated by dividing the ventilation rate (in m³/h) by the volume of the space (in m³). For example, a room with a volume of 30m³ and a ventilation rate of 60m³/h has an ACH of 2."
  },
  {
    id: 'hvac-l2-ventilation5',
    question: "What is the typical minimum efficiency rating for filters used in commercial ventilation systems in the UK?",
    options: ["G1", "G4", "F7", "H13"],
    correctAnswer: "G4",
    explanation: "The typical minimum efficiency rating for filters used in commercial ventilation systems in the UK is G4 (according to the older EN779 standard, now approximately equivalent to ISO Coarse 65% under ISO 16890). This provides basic protection against larger particles and helps keep ventilation components clean, while more efficient filters (F7/ePM1 50% or higher) might be used for better indoor air quality."
  },
  {
    id: 'hvac-l2-ventilation6',
    question: "What is the purpose of a damper in a ventilation system?",
    options: ["To increase air velocity", "To reduce noise", "To control airflow", "To heat the air"],
    correctAnswer: "To control airflow",
    explanation: "The purpose of a damper in a ventilation system is to control airflow. Dampers are adjustable plates or blades that can be positioned to regulate the volume of air passing through a duct, grille, or other air handling equipment. They may be manually operated, motorized, or automated as part of a building management system."
  },
  {
    id: 'hvac-l2-ventilation7',
    question: "What is the recommended maximum air velocity in a main supply duct for a commercial ventilation system to minimize noise?",
    options: ["2-3 m/s", "5-8 m/s", "10-12 m/s", "15-20 m/s"],
    correctAnswer: "5-8 m/s",
    explanation: "The recommended maximum air velocity in a main supply duct for commercial ventilation systems typically ranges from 5-8 m/s. This balance keeps the duct size reasonable while limiting noise generation and minimizing pressure loss. Higher velocities can cause excessive noise and vibration, while lower velocities would require impractically large ducts."
  },
  {
    id: 'hvac-l2-ventilation8',
    question: "What is the main purpose of a Mechanical Ventilation with Heat Recovery (MVHR) system in a domestic setting?",
    options: ["To increase humidity levels", "To provide ventilation while minimizing heat loss", "To heat the property", "To maximize air conditioning efficiency"],
    correctAnswer: "To provide ventilation while minimizing heat loss",
    explanation: "The main purpose of a Mechanical Ventilation with Heat Recovery (MVHR) system in a domestic setting is to provide ventilation while minimizing heat loss. It extracts stale, moist air from wet rooms (kitchens, bathrooms) and supplies fresh air to habitable rooms, while transferring heat from the outgoing air to the incoming air through a heat exchanger, typically recovering 80-90% of the heat that would otherwise be lost."
  },
  {
    id: 'hvac-l2-ventilation9',
    question: "What is the definition of 'dead zone' in ventilation?",
    options: ["An area where air velocity is highest", "The space directly in front of an extract fan", "An area where there is little or no air movement", "The internal space of a ventilation duct"],
    correctAnswer: "An area where there is little or no air movement",
    explanation: "A 'dead zone' in ventilation refers to an area where there is little or no air movement. These spaces can develop in corners, behind furniture, or other locations where the ventilation system's airflow patterns don't effectively reach. Dead zones can lead to poor air quality, potential moisture problems, and thermal discomfort if they coincide with occupied areas."
  },
  {
    id: 'hvac-l2-ventilation10',
    question: "According to Building Regulations, what is the minimum required background ventilation for a habitable room in a dwelling?",
    options: ["2500 mm²", "5000 mm²", "8000 mm²", "10000 mm²"],
    correctAnswer: "8000 mm²",
    explanation: "According to UK Building Regulations Part F, the minimum required background ventilation (typically provided by trickle vents) for a habitable room in a dwelling is 8000 mm² (8000 square millimeters, equivalent to 80 cm²). This requirement ensures adequate fresh air supply to maintain indoor air quality even when windows are closed."
  },
  {
    id: 'hvac-l2-ventilation11',
    question: "What type of ventilation system operates by creating a positive pressure inside the building?",
    options: ["Balanced mechanical ventilation", "Mechanical extract ventilation", "Positive input ventilation (PIV)", "Passive stack ventilation"],
    correctAnswer: "Positive input ventilation (PIV)",
    explanation: "Positive input ventilation (PIV) operates by creating a positive pressure inside the building. It typically uses a fan mounted in the loft or central area to continuously supply filtered air into the property, creating a slight positive pressure that forces stale air out through natural leakage points, ventilation openings, or background vents. This approach helps reduce condensation and associated mold problems."
  },
  {
    id: 'hvac-l2-ventilation12',
    question: "What is the function of a volume control damper in a ventilation system?",
    options: ["To prevent backflow", "To regulate the amount of airflow", "To filter the air", "To reduce fire spread"],
    correctAnswer: "To regulate the amount of airflow",
    explanation: "The function of a volume control damper is to regulate the amount of airflow through a particular section of a ventilation system. These dampers can be adjusted during system balancing to ensure that the correct amount of air reaches each area or zone, helping to achieve design airflow rates throughout the building."
  },
  {
    id: 'hvac-l2-ventilation13',
    question: "What is the main difference between axial and centrifugal fans?",
    options: ["Axial fans are always larger", "Centrifugal fans create more noise", "Axial fans move air parallel to the shaft, while centrifugal fans move air perpendicular to the shaft", "Centrifugal fans are always more energy-efficient"],
    correctAnswer: "Axial fans move air parallel to the shaft, while centrifugal fans move air perpendicular to the shaft",
    explanation: "The main difference between axial and centrifugal fans is the direction of airflow relative to the fan shaft. Axial fans move air parallel to the shaft (like a propeller), making them suitable for applications with low resistance but high volume requirements. Centrifugal fans move air perpendicular to the shaft, creating higher pressure capabilities suitable for overcoming system resistance in ductwork."
  },
  {
    id: 'hvac-l2-ventilation14',
    question: "What is the purpose of a fire damper in a ventilation system?",
    options: ["To control smoke", "To regulate temperature", "To prevent fire spread through ductwork", "To increase ventilation during a fire"],
    correctAnswer: "To prevent fire spread through ductwork",
    explanation: "The purpose of a fire damper is to prevent fire spread through ductwork. These safety devices are installed where ducts penetrate fire-rated walls, floors, or partitions. They are designed to close automatically when detecting heat, typically using a fusible link that melts at a specific temperature, thus maintaining the fire resistance rating of the penetrated fire separation element."
  },
  {
    id: 'hvac-l2-ventilation15',
    question: "According to CIBSE guidelines, what is an acceptable noise rating (NR) level for bedrooms in residential buildings?",
    options: ["NR 20-25", "NR 30-35", "NR 40-45", "NR 50-55"],
    correctAnswer: "NR 20-25",
    explanation: "According to CIBSE guidelines, the acceptable noise rating (NR) level for bedrooms in residential buildings is NR 20-25. This relatively low level is recommended to ensure undisturbed sleep and comfort. Higher NR values would be acceptable in other spaces, such as living rooms (NR 30-35) or kitchen areas (NR 35-40)."
  },
  {
    id: 'hvac-l2-ventilation16',
    question: "What is the purpose of a pressure independent VAV (Variable Air Volume) terminal in a ventilation system?",
    options: ["To maintain constant air temperature regardless of pressure", "To maintain constant airflow regardless of pressure changes in the duct system", "To reduce fan energy consumption", "To filter air at the point of delivery"],
    correctAnswer: "To maintain constant airflow regardless of pressure changes in the duct system",
    explanation: "The purpose of a pressure independent VAV (Variable Air Volume) terminal is to maintain constant airflow regardless of pressure changes in the duct system. These terminals incorporate a flow measuring device and controller that automatically adjust the damper position to maintain the desired airflow rate despite variations in system pressure, ensuring proper ventilation to each space."
  },
  {
    id: 'hvac-l2-ventilation17',
    question: "What does SFP stand for in ventilation system design, and what does it measure?",
    options: ["Special Fan Power; measures fan noise levels", "Specific Fan Power; measures energy efficiency of fans", "System Flow Performance; measures air distribution uniformity", "Standard Fan Pressure; measures resistance in ductwork"],
    correctAnswer: "Specific Fan Power; measures energy efficiency of fans",
    explanation: "SFP stands for Specific Fan Power and measures the energy efficiency of fans in ventilation systems. It is expressed in watts per litre per second (W/(l/s)) and represents the power consumed by the fan to move a given volume of air. UK Building Regulations set maximum SFP values for various system types to ensure energy-efficient ventilation design."
  },
  {
    id: 'hvac-l2-ventilation18',
    question: "What is the primary purpose of commissioning a ventilation system?",
    options: ["To determine the system's installation cost", "To verify the system operates as designed", "To clean the ductwork", "To change the filters"],
    correctAnswer: "To verify the system operates as designed",
    explanation: "The primary purpose of commissioning a ventilation system is to verify the system operates as designed. This process includes testing, adjusting, and balancing the system to ensure it delivers the correct airflow rates to each space, operates at the expected efficiency, meets noise criteria, and functions according to the design specifications and building regulations requirements."
  },
  {
    id: 'hvac-l2-ventilation19',
    question: "What is the minimum fresh air requirement per person in a typical office space according to CIBSE guidelines?",
    options: ["5 l/s per person", "10 l/s per person", "15 l/s per person", "20 l/s per person"],
    correctAnswer: "10 l/s per person",
    explanation: "According to CIBSE guidelines, the minimum fresh air requirement for a typical office space is 10 litres per second per person. This rate is recommended to maintain acceptable indoor air quality by diluting and removing contaminants produced by occupants and their activities, as well as emissions from building materials and furnishings."
  },
  {
    id: 'hvac-l2-ventilation20',
    question: "What is the purpose of a thermal wheel (rotary heat exchanger) in a ventilation system?",
    options: ["To increase the air velocity", "To recover heat energy between supply and extract air streams", "To filter the air", "To reduce the humidity"],
    correctAnswer: "To recover heat energy between supply and extract air streams",
    explanation: "The purpose of a thermal wheel (rotary heat exchanger) in a ventilation system is to recover heat energy between supply and extract air streams. The wheel rotates between the exhaust and supply airstreams, absorbing heat from the warmer airstream and releasing it to the cooler one. Some designs can also transfer moisture (enthalpy wheels), helping to maintain comfortable humidity levels while saving energy."
  },
  {
    id: 'hvac-l2-ventilation21',
    question: "Which of the following is the correct definition of 'infiltration' in building ventilation?",
    options: ["The purposeful introduction of outdoor air through mechanical means", "The uncontrolled entry of outdoor air through cracks, gaps and openings in the building fabric", "The movement of air between different rooms within a building", "The removal of stale air from a building"],
    correctAnswer: "The uncontrolled entry of outdoor air through cracks, gaps and openings in the building fabric",
    explanation: "Infiltration in building ventilation refers to the uncontrolled entry of outdoor air through cracks, gaps, and openings in the building fabric. This natural air leakage is driven by pressure differences caused by wind, temperature differences, or mechanical systems. While some infiltration provides ventilation, excessive infiltration can lead to energy waste, drafts, and moisture problems."
  },
  {
    id: 'hvac-l2-ventilation22',
    question: "What does the term 'demand-controlled ventilation' refer to?",
    options: ["Ventilation that can only be manually controlled by occupants", "Ventilation that operates at a constant rate regardless of occupancy", "Ventilation that automatically adjusts based on indicators like occupancy or air quality", "Ventilation that only operates during peak electricity demand periods"],
    correctAnswer: "Ventilation that automatically adjusts based on indicators like occupancy or air quality",
    explanation: "Demand-controlled ventilation refers to systems that automatically adjust ventilation rates based on indicators like occupancy, CO2 levels, humidity, or other air quality parameters. This approach provides appropriate ventilation when and where needed, thereby improving indoor air quality while reducing energy consumption compared to constant-volume systems that operate at fixed rates regardless of actual requirements."
  },
  {
    id: 'hvac-l2-ventilation23',
    question: "What is the purpose of 'night purge' ventilation?",
    options: ["To prevent condensation forming overnight", "To cool the building structure using cooler night air", "To increase humidity levels", "To reduce noise pollution at night"],
    correctAnswer: "To cool the building structure using cooler night air",
    explanation: "The purpose of 'night purge' ventilation is to cool the building structure using cooler night air. This strategy uses mechanical or natural ventilation to remove heat accumulated in the building's thermal mass during the day by flushing it with cooler outdoor air at night. This reduces the cooling load for the following day, particularly in commercial buildings with high internal heat gains."
  },
  {
    id: 'hvac-l2-ventilation24',
    question: "What type of ventilation system would be most appropriate for a commercial kitchen with heavy cooking loads?",
    options: ["Natural ventilation", "Balanced mechanical ventilation", "Mechanical extract ventilation with make-up air provision", "Positive input ventilation"],
    correctAnswer: "Mechanical extract ventilation with make-up air provision",
    explanation: "For a commercial kitchen with heavy cooking loads, mechanical extract ventilation with make-up air provision is most appropriate. This involves powerful extraction hoods over cooking equipment to remove heat, moisture, grease, and odors, coupled with a dedicated supply air system to replace the extracted air. Without proper make-up air, excessive negative pressure could affect appliance operation and door operation."
  },
  {
    id: 'hvac-l2-ventilation25',
    question: "According to UK Building Regulations, what is the minimum required background ventilation for a utility room?",
    options: ["No background ventilation required", "4000 mm²", "8000 mm²", "Extract ventilation only is required"],
    correctAnswer: "Extract ventilation only is required",
    explanation: "According to UK Building Regulations Part F, utility rooms typically require extract ventilation only, with a minimum rate of 30 l/s with intermittent extract fans or 8 l/s with continuous extraction. Background ventilators (trickle vents) are not specifically required for utility rooms as they are for habitable rooms, as the extract ventilation is deemed sufficient to control moisture and odors."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-ventilation', 'items', q.id), {
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
