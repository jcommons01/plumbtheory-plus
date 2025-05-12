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

// ✅ Building Regulations Part F - Ventilation Questions
const questions = [
  {
    id: 'regs-part-f-1',
    question: "What is the primary purpose of Approved Document F?",
    options: ["To provide guidance on fire safety", "To provide guidance on adequate means of ventilation", "To ensure structural integrity of buildings", "To provide guidance on drainage systems"],
    correctAnswer: "To provide guidance on adequate means of ventilation",
    explanation: "The primary purpose of Approved Document F is to provide guidance on adequate means of ventilation for buildings. It covers requirements for both residential and non-residential buildings to ensure adequate air quality through ventilation strategies. The document aims to provide ventilation that removes pollutants and moisture that would otherwise cause harm to the building or occupants, while being energy efficient and making reasonable provision for occupants to control their environment."
  },
  {
    id: 'regs-part-f-2',
    question: "What are the three types of ventilation provision described in Approved Document F?",
    options: ["Primary, secondary, and tertiary ventilation", "Extract, inlet, and air conditioning", "Open flue, room-sealed, and balanced flue", "Background, purge, and extract ventilation"],
    correctAnswer: "Background, purge, and extract ventilation",
    explanation: "Approved Document F describes three types of ventilation provision: background, purge, and extract ventilation. Background ventilation provides small continuous air exchange (typically through trickle vents) to remove everyday pollutants. Purge ventilation allows rapid ventilation to remove occasional high concentrations of pollutants (typically through openable windows). Extract ventilation removes moisture and pollutants from areas where they're produced (kitchen, bathrooms) either continuously or intermittently. These three types work together to provide a complete ventilation strategy."
  },
  {
    id: 'regs-part-f-3',
    question: "What is the minimum extract ventilation rate required for a kitchen according to Approved Document F?",
    options: ["30 litres/second adjacent to hob or 60 litres/second elsewhere", "15 litres/second", "8 litres/second", "6 litres/second"],
    correctAnswer: "30 litres/second adjacent to hob or 60 litres/second elsewhere",
    explanation: "According to Approved Document F, the minimum extract ventilation rate required for a kitchen is 30 litres/second if located adjacent to the hob, or 60 litres/second if located elsewhere in the kitchen. These higher rates reflect the significant moisture and pollutant generation during cooking activities. The extract can be provided by either continuous mechanical extraction or an intermittent fan activated when cooking. Cooker hoods that recirculate air rather than extracting it to outside do not meet this requirement."
  },
  {
    id: 'regs-part-f-4',
    question: "What is a 'background ventilator' as defined in Approved Document F?",
    options: ["A small extract fan running continuously at low speed", "A ventilation system that operates when occupants are away", "A small ventilation opening designed to provide air exchange while limiting noise transmission", "A ventilation system that only operates during the night"],
    correctAnswer: "A small ventilation opening designed to provide air exchange while limiting noise transmission",
    explanation: "A background ventilator is a small ventilation opening designed to provide air exchange while limiting noise transmission. These are typically trickle ventilators incorporated into window frames or through-wall ventilators. They provide continuous low-level ventilation regardless of window operation and are sized according to room type, floor area, and overall dwelling ventilation strategy. Background ventilators should be controllable, typically having open, partial, and closed positions, allowing occupants to adjust airflow rates according to conditions and preferences."
  },
  {
    id: 'regs-part-f-5',
    question: "What is 'purge ventilation' according to Approved Document F?",
    options: ["Ventilation to dilute and remove pollutants and water vapor from a room", "Ventilation specifically for removing allergenic particles", "Ventilation that operates at night to purge the building of accumulated pollutants", "A deep cleaning process for ventilation systems"],
    correctAnswer: "Ventilation to dilute and remove pollutants and water vapor from a room",
    explanation: "Purge ventilation is ventilation to rapidly dilute and remove pollutants and water vapor from a room. It provides higher ventilation rates than background ventilation, typically achieved through openable windows, doors, or dedicated vents. Purge ventilation is used occasionally to deal with specific activities that generate high levels of pollutants or moisture (like painting or accidental burning of food) or to cool the building during hot weather. The requirements specify minimum openable areas relative to floor area to ensure adequate air exchange rates."
  },
  {
    id: 'regs-part-f-6',
    question: "What is the minimum extract ventilation rate required for a bathroom according to Approved Document F?",
    options: ["8 litres/second", "15 litres/second", "30 litres/second", "6 litres/second"],
    correctAnswer: "8 litres/second",
    explanation: "According to Approved Document F, the minimum extract ventilation rate required for a bathroom is 8 litres/second. This extract provision can be achieved through either continuous mechanical extraction or an intermittent fan that operates when the bathroom is in use. The purpose of bathroom extraction is primarily to remove moisture generated from bathing and showering, which could otherwise lead to condensation problems and potential mold growth. The extract should discharge to outside air, not into another internal space or loft area."
  },
  {
    id: 'regs-part-f-7',
    question: "What does Approved Document F specify about the provision of background ventilators in habitable rooms?",
    options: ["They are not required if windows can be opened", "They should provide at least 8000mm² equivalent area per room", "They are only required in bedrooms", "They must be fitted with automatic humidity sensors"],
    correctAnswer: "They should provide at least 8000mm² equivalent area per room",
    explanation: "Approved Document F specifies that background ventilators in habitable rooms should provide at least 8000mm² equivalent area per room. This applies to living rooms, dining rooms, and bedrooms to ensure adequate continuous fresh air supply. The requirement is based on equivalent area (EA), which accounts for the airflow characteristics of the ventilator, not just its physical size. This provision is typically achieved through trickle ventilators in window frames or through-wall ventilators, and forms a key part of the whole-dwelling ventilation strategy."
  },
  {
    id: 'regs-part-f-8',
    question: "Which ventilation system described in Approved Document F uses both mechanical extract and mechanical supply?",
    options: ["System 1 - Background ventilators with intermittent extract fans", "System 2 - Passive stack ventilation", "System 3 - Continuous mechanical extract", "System 4 - Continuous mechanical supply and extract with heat recovery"],
    correctAnswer: "System 4 - Continuous mechanical supply and extract with heat recovery",
    explanation: "System 4 - Continuous mechanical supply and extract with heat recovery uses both mechanical extract and mechanical supply. This balanced system extracts air from wet rooms and supplies fresh air to habitable rooms, typically incorporating heat recovery to transfer heat from extracted air to incoming air for energy efficiency. This system provides good control over ventilation rates, works well in airtight dwellings, and can filter incoming air. It's commonly referred to as MVHR (Mechanical Ventilation with Heat Recovery) and is particularly suitable for highly energy-efficient homes."
  },
  {
    id: 'regs-part-f-9',
    question: "What requirements does Approved Document F specify for extract ventilation in utility rooms?",
    options: ["No extract ventilation is required in utility rooms", "15 litres/second extract rate", "30 litres/second extract rate", "8 litres/second extract rate"],
    correctAnswer: "30 litres/second extract rate",
    explanation: "Approved Document F specifies an extract ventilation rate of 30 litres/second for utility rooms. This relatively high extraction rate is specified because utility rooms often contain appliances like washing machines and tumble dryers that generate significant moisture. The extract can be provided by either continuous mechanical extraction or an intermittent fan that can be activated when needed. Like other extract systems, it must discharge to outside air to effectively remove moisture from the building."
  },
  {
    id: 'regs-part-f-10',
    question: "What is 'Passive Stack Ventilation' (PSV) as defined in Approved Document F?",
    options: ["A ventilation system for unoccupied buildings", "A ventilation system utilizing natural stack effect through vertical ducts", "A form of completely passive ventilation with no controllable elements", "A ventilation system that only works in cold weather"],
    correctAnswer: "A ventilation system utilizing natural stack effect through vertical ducts",
    explanation: "Passive Stack Ventilation (PSV) is a ventilation system utilizing natural stack effect through vertical ducts. It works through a combination of the stack effect (warm air rising) and wind-driven pressure differences. Extract grilles connected to near-vertical ducts in wet rooms naturally draw air out, with fresh air entering through background ventilators in habitable rooms. This System 2 approach requires no electrical power for normal operation, though some modern versions include low-power assistance fans for use in still conditions. Effective PSV requires careful design of duct routes, sizes, and terminations."
  },
  {
    id: 'regs-part-f-11',
    question: "According to Approved Document F, what should be the equivalent area of background ventilators in a kitchen?",
    options: ["2500mm²", "4000mm²", "8000mm²", "No background ventilator is required if extract ventilation is provided"],
    correctAnswer: "No background ventilator is required if extract ventilation is provided",
    explanation: "According to Approved Document F, no background ventilator is required in a kitchen if extract ventilation is provided. This is because the extract ventilation (either intermittent or continuous) creates negative pressure that draws in fresh air through background ventilators in adjacent spaces, making a dedicated background ventilator in the kitchen itself unnecessary. However, if the kitchen incorporates a habitable area (like an open-plan kitchen-diner), then background ventilation appropriate for that habitable space would be required."
  },
  {
    id: 'regs-part-f-12',
    question: "What does Approved Document F specify about purge ventilation provision in habitable rooms?",
    options: ["A minimum openable area of 1/20th of the floor area", "A minimum openable area of 1/30th of the floor area", "At least one window that opens at least 15 degrees", "Purge ventilation is not required in habitable rooms"],
    correctAnswer: "A minimum openable area of 1/20th of the floor area",
    explanation: "Approved Document F specifies that purge ventilation in habitable rooms should have a minimum openable area of 1/20th of the floor area. This is typically achieved through openable windows or external doors. The requirement ensures sufficient ventilation capacity for rapidly removing high concentrations of pollutants or for cooling the space during hot weather. The openable area refers to the free area when the window is open, not the total window area, and hinged windows opening 30° or more are considered fully effective."
  },
  {
    id: 'regs-part-f-13',
    question: "What is 'System 3' ventilation according to Approved Document F?",
    options: ["Natural ventilation with background ventilators", "Passive stack ventilation", "Continuous mechanical extract ventilation", "Mechanical ventilation with heat recovery"],
    correctAnswer: "Continuous mechanical extract ventilation",
    explanation: "System 3 ventilation according to Approved Document F is continuous mechanical extract ventilation (MEV). This system uses continuously running extract fans (typically a central fan unit with multiple extract points) to remove air from wet rooms, with fresh air entering through background ventilators in habitable rooms. It provides more consistent ventilation than intermittent systems and works well in relatively airtight dwellings. The system typically operates at a low background rate with the capability to boost when needed, such as during cooking or showering."
  },
  {
    id: 'regs-part-f-14',
    question: "What does Approved Document F specify about the location of extract ventilation in bathrooms?",
    options: ["It must be located at high level only", "It must be located at low level only", "It can be at any height, as the position doesn't significantly affect performance", "It should be located to extract air directly from the bath or shower area"],
    correctAnswer: "It can be at any height, as the position doesn't significantly affect performance",
    explanation: "Approved Document F specifies that extract ventilation in bathrooms can be at any height, as the position doesn't significantly affect performance. Unlike kitchens where positioning near the pollutant source (cooking area) is important, bathroom moisture tends to disperse throughout the room. What matters more is the extraction rate (minimum 8 litres/second) and ensuring the extract discharges to outside. The document does, however, provide guidance on optimal terminal positioning outside to prevent re-entry of extracted air and avoid nuisance to neighbors."
  },
  {
    id: 'regs-part-f-15',
    question: "What is the minimum requirement for background ventilators in an office according to Approved Document F?",
    options: ["10000mm² equivalent area per 10m² floor area", "500mm² equivalent area per 100m² floor area", "400mm² equivalent area per m² floor area", "There is no specific requirement for offices"],
    correctAnswer: "There is no specific requirement for offices",
    explanation: "According to Approved Document F (2021), there is no specific requirement for background ventilators in offices. Non-residential buildings have ventilation requirements based on occupancy levels and activity types rather than prescriptive ventilation opening sizes. For offices, ventilation is typically designed based on air change rates, fresh air requirements per person, or pollutant control requirements specified in standards like CIBSE guides. The document provides performance-based approaches rather than prescriptive solutions for most non-residential spaces."
  },
  {
    id: 'regs-part-f-16',
    question: "According to Approved Document F, what is the minimum equivalent area required for background ventilators in a dwelling with a floor area up to 90m²?",
    options: ["4000mm²", "8000mm²", "10000mm²", "40000mm²"],
    correctAnswer: "40000mm²",
    explanation: "According to Approved Document F, when using the whole dwelling ventilation approach, the minimum equivalent area required for background ventilators in a dwelling with a floor area up to 90m² is 40000mm². This total should be distributed around the dwelling with higher provision in habitable rooms than in wet rooms. This approach looks at the whole dwelling ventilation need rather than simply adding up individual room requirements. For larger dwellings beyond 90m², the minimum increases proportionally with floor area."
  },
  {
    id: 'regs-part-f-17',
    question: "What does Approved Document F state about extract ventilation in rooms with open-flued combustion appliances?",
    options: ["Extract ventilation should not be installed in these rooms", "Extract rates must be doubled in these rooms", "Spillage tests should be performed when extract ventilation exceeds certain rates", "Only natural extract ventilation is permitted"],
    correctAnswer: "Spillage tests should be performed when extract ventilation exceeds certain rates",
    explanation: "Approved Document F states that spillage tests should be performed when extract ventilation exceeds certain rates in rooms with open-flued combustion appliances. This is because extract fans can depressurize rooms, potentially causing combustion gases to spill from the appliance rather than going up the flue. The document specifies when testing is required based on the extract rates and provides a testing procedure. This requirement helps prevent dangerous situations where carbon monoxide or other combustion products could be drawn into the living space."
  },
  {
    id: 'regs-part-f-18',
    question: "What does Approved Document F specify about purge ventilation in bathrooms without windows?",
    options: ["It is not required in bathrooms", "It must be provided by a separate mechanical system", "It can be provided by the extract fan if its flow rate is higher than the minimum required extract rate", "Only natural purge ventilation is acceptable"],
    correctAnswer: "It can be provided by the extract fan if its flow rate is higher than the minimum required extract rate",
    explanation: "For bathrooms without windows, Approved Document F specifies that purge ventilation can be provided by the extract fan if its flow rate is higher than the minimum required extract rate. Specifically, the fan should be capable of extracting at least 4 air changes per hour (ACH) to be considered as providing purge ventilation. This recognizes that in internal bathrooms without windows, mechanical means must serve both everyday extract ventilation needs and occasional higher-rate purge ventilation requirements."
  },
  {
    id: 'regs-part-f-19',
    question: "What does Approved Document F specify about energy efficiency of mechanical ventilation systems?",
    options: ["No energy efficiency requirements are specified", "They should have a specific energy consumption of less than 1.5 W/l/s", "They should have a heat recovery efficiency of at least 50%", "They should be powered by renewable energy sources only"],
    correctAnswer: "They should have a specific energy consumption of less than 1.5 W/l/s",
    explanation: "Approved Document F specifies that mechanical ventilation systems should have a specific fan power (energy consumption) of less than 1.5 W/l/s for centralised systems. This efficiency requirement ensures that ventilation systems don't consume excessive energy while providing adequate ventilation. Additionally, for MVHR systems (System 4), the document specifies a minimum heat recovery efficiency. These requirements balance the need for effective ventilation with energy efficiency goals, in line with the broader building regulations approach to reducing energy consumption."
  },
  {
    id: 'regs-part-f-20',
    question: "What does Approved Document F state about air quality in ventilation intake positions?",
    options: ["Air intakes should be positioned on the roof only", "Air intakes should be at least 10m from any pollution sources", "Air intakes should be positioned to minimize the intake of external air pollutants", "Air intakes must include HEPA filtration"],
    correctAnswer: "Air intakes should be positioned to minimize the intake of external air pollutants",
    explanation: "Approved Document F states that air intakes should be positioned to minimize the intake of external air pollutants. This includes locating intakes away from sources of pollution such as exhaust outlets, busy roads, car parks, and loading bays. The document provides specific minimum separation distances between air intakes and various pollution sources. This requirement recognizes that the purpose of ventilation is to improve indoor air quality, which cannot be achieved if the incoming air is already heavily polluted."
  },
  {
    id: 'regs-part-f-21',
    question: "What is the minimum requirement for background ventilators in a sanitary accommodation (toilet) according to Approved Document F?",
    options: ["Background ventilators are not required in sanitary accommodations", "2000mm² equivalent area", "4000mm² equivalent area", "8000mm² equivalent area"],
    correctAnswer: "Background ventilators are not required in sanitary accommodations",
    explanation: "According to Approved Document F, background ventilators are not required in sanitary accommodations (toilets). Instead, these spaces require extract ventilation, either mechanical (6 litres/second intermittent extraction) or passive stack ventilation. The extract ventilation creates a slight negative pressure, drawing in fresh air from adjacent spaces through gaps under the door or transfer grilles, making dedicated background ventilators unnecessary in these typically small spaces."
  },
  {
    id: 'regs-part-f-22',
    question: "What is 'continuous operation' in the context of mechanical extract systems in dwellings?",
    options: ["The system must never be turned off under any circumstances", "The system runs constantly at the same extraction rate", "The system operates continuously at a low rate with the capability to be boosted when required", "The system must run for at least 18 hours per day"],
    correctAnswer: "The system operates continuously at a low rate with the capability to be boosted when required",
    explanation: "In the context of mechanical extract systems in dwellings, 'continuous operation' means the system operates continuously at a low rate with the capability to be boosted when required. Systems 3 and 4 in Approved Document F operate this way, providing constant background ventilation with the ability to increase extraction rates during periods of high moisture or pollutant production (such as cooking or showering). This approach ensures continuous air quality control while allowing for increased ventilation when activities demand it, offering better overall air quality than purely intermittent systems."
  },
  {
    id: 'regs-part-f-23',
    question: "What does Approved Document F require regarding ventilation systems in new dwellings?",
    options: ["Only natural ventilation systems are permitted", "Only mechanical ventilation systems are permitted", "A commissioning notice confirming the systems have been tested must be given to the Building Control Body", "Ventilation systems must be designed by a qualified engineer"],
    correctAnswer: "A commissioning notice confirming the systems have been tested must be given to the Building Control Body",
    explanation: "Approved Document F requires that for ventilation systems in new dwellings, a commissioning notice confirming the systems have been tested must be given to the Building Control Body. This notice verifies that the installed system has been properly balanced, adjusted, and tested to ensure it performs as designed and meets the regulatory requirements. Additionally, information about the ventilation system must be provided to the building owner, including operating and maintenance instructions to ensure the system continues to perform effectively throughout its lifespan."
  },
  {
    id: 'regs-part-f-24',
    question: "What does Approved Document F specify about replacing windows and the impact on ventilation?",
    options: ["Replacement windows must always include trickle ventilators", "Ventilation concerns only apply to new buildings, not window replacements", "If the original windows had trickle ventilators, the replacements should not make the ventilation worse", "Window replacement always requires a full ventilation system upgrade"],
    correctAnswer: "If the original windows had trickle ventilators, the replacements should not make the ventilation worse",
    explanation: "Approved Document F specifies that if the original windows had trickle ventilators, the replacements should not make the ventilation worse. This means that replacement windows should provide at least equivalent ventilation provision to those being replaced. If the original windows had no trickle ventilators but relied on gaps, the replacement might need trickle ventilators to compensate for the improved airtightness of modern windows. This requirement ensures that window replacements don't inadvertently reduce necessary ventilation in existing buildings."
  },
  {
    id: 'regs-part-f-25',
    question: "What does Approved Document F specify about mechanical ventilation ducts passing through fire-rated walls or floors?",
    options: ["Mechanical ventilation is never permitted to pass through fire-rated boundaries", "No special requirements are specified; standard ducting is sufficient", "Fire dampers or fire-resistant ducting should be provided to maintain the fire separation", "Mechanical ventilation must be turned off automatically in case of fire"],
    correctAnswer: "Fire dampers or fire-resistant ducting should be provided to maintain the fire separation",
    explanation: "When mechanical ventilation ducts pass through fire-rated walls or floors, Approved Document F specifies that fire dampers or fire-resistant ducting should be provided to maintain the fire separation. This requirement ensures that the ventilation system doesn't compromise the building's fire compartmentation. Fire dampers automatically close when triggered by heat to prevent fire spread through the ducting, while fire-resistant ducting maintains the fire resistance rating of the wall or floor it penetrates. These provisions should be designed in accordance with Approved Document B (Fire safety)."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-f', 'items', q.id), {
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
