// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Refrigeration.ts

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

// ✅ HVAC Level 2 Basic Refrigeration Principles Questions
const questions = [
  {
    id: 'hvac-l2-refrigeration1',
    question: "What happens to the refrigerant as it passes through the expansion device in a refrigeration system?",
    options: ["It increases in temperature and pressure", "It decreases in temperature and pressure", "It increases in temperature and decreases in pressure", "It decreases in temperature and increases in pressure"],
    correctAnswer: "It decreases in temperature and pressure",
    explanation: "As refrigerant passes through the expansion device, it undergoes a pressure drop, which causes a corresponding drop in temperature according to the pressure-temperature relationship. This process converts the high-pressure liquid refrigerant to a low-pressure, low-temperature mixture of liquid and vapor before it enters the evaporator."
  },
  {
    id: 'hvac-l2-refrigeration2',
    question: "Which component in a refrigeration system is responsible for increasing the pressure of the refrigerant?",
    options: ["Evaporator", "Condenser", "Compressor", "Expansion valve"],
    correctAnswer: "Compressor",
    explanation: "The compressor is responsible for increasing the pressure of the refrigerant. It draws in low-pressure vapor refrigerant from the evaporator and compresses it, raising both its pressure and temperature. This high-pressure, high-temperature vapor then flows to the condenser where heat is rejected."
  },
  {
    id: 'hvac-l2-refrigeration3',
    question: "What is the function of the condenser in a refrigeration system?",
    options: ["To absorb heat from the refrigerated space", "To reject heat to the surrounding environment", "To reduce refrigerant pressure", "To convert liquid refrigerant to vapor"],
    correctAnswer: "To reject heat to the surrounding environment",
    explanation: "The function of the condenser is to reject heat to the surrounding environment. The hot, high-pressure refrigerant vapor enters the condenser where it releases heat and condenses into a high-pressure liquid. This process of heat rejection is essential for the refrigeration cycle to continue efficiently."
  },
  {
    id: 'hvac-l2-refrigeration4',
    question: "What state is the refrigerant in as it leaves the evaporator in a properly functioning refrigeration system?",
    options: ["High-pressure liquid", "Low-pressure liquid", "High-pressure vapor", "Low-pressure vapor"],
    correctAnswer: "Low-pressure vapor",
    explanation: "In a properly functioning refrigeration system, the refrigerant leaves the evaporator as a low-pressure vapor. The refrigerant enters the evaporator as a low-pressure liquid/vapor mixture, absorbs heat from the refrigerated space, and completely evaporates into a low-pressure vapor before entering the compressor's suction line."
  },
  {
    id: 'hvac-l2-refrigeration5',
    question: "What does the term 'superheat' refer to in refrigeration?",
    options: ["The temperature of the refrigerant in the condenser", "The temperature of the refrigerant above its boiling point at a given pressure", "The additional heat added to the compressor", "The temperature increase across the expansion valve"],
    correctAnswer: "The temperature of the refrigerant above its boiling point at a given pressure",
    explanation: "Superheat refers to the temperature of the refrigerant above its boiling (saturation) point at a given pressure. In a refrigeration system, superheat is measured at the evaporator outlet/compressor suction and ensures that all liquid refrigerant has vaporized before entering the compressor, protecting it from liquid slugging."
  },
  {
    id: 'hvac-l2-refrigeration6',
    question: "What is the purpose of subcooling in a refrigeration system?",
    options: ["To increase compressor efficiency", "To ensure complete vaporization before the compressor", "To ensure liquid refrigerant reaches the expansion valve", "To reduce evaporator temperature"],
    correctAnswer: "To ensure liquid refrigerant reaches the expansion valve",
    explanation: "The purpose of subcooling is to ensure liquid refrigerant reaches the expansion valve without premature flashing to vapor. Subcooling removes additional heat from the liquid refrigerant after condensation, cooling it below its condensing temperature. This increases system efficiency and capacity while preventing flash gas formation in the liquid line."
  },
  {
    id: 'hvac-l2-refrigeration7',
    question: "Which of the following is an azeotropic refrigerant blend?",
    options: ["R-410A", "R-404A", "R-407C", "R-502"],
    correctAnswer: "R-502",
    explanation: "R-502 is an azeotropic refrigerant blend. Azeotropic blends behave as a single substance, with components that boil at the same temperature at a given pressure and cannot be separated by simple distillation. They do not experience temperature glide during phase changes, unlike zeotropic blends such as R-407C which have varying composition in liquid and vapor phases."
  },
  {
    id: 'hvac-l2-refrigeration8',
    question: "What occurs in the refrigeration cycle during the latent heat of vaporization?",
    options: ["Refrigerant temperature increases without changing state", "Refrigerant changes from liquid to vapor at constant temperature", "Refrigerant changes from vapor to liquid at varying temperatures", "Refrigerant pressure increases without changing state"],
    correctAnswer: "Refrigerant changes from liquid to vapor at constant temperature",
    explanation: "During the latent heat of vaporization in the refrigeration cycle, the refrigerant changes from liquid to vapor at a constant temperature. This occurs in the evaporator where the refrigerant absorbs heat from the surrounding environment. The temperature remains constant during this phase change while the refrigerant absorbs the latent heat energy."
  },
  {
    id: 'hvac-l2-refrigeration9',
    question: "What property allows refrigerants to absorb heat at low temperatures and release it at higher temperatures?",
    options: ["Specific volume", "Specific heat", "Latent heat", "Thermal conductivity"],
    correctAnswer: "Latent heat",
    explanation: "Latent heat is the property that allows refrigerants to absorb heat at low temperatures and release it at higher temperatures. Refrigerants have a high latent heat of vaporization, meaning they can absorb and release large amounts of heat energy during phase changes between liquid and vapor states, which is fundamental to the refrigeration process."
  },
  {
    id: 'hvac-l2-refrigeration10',
    question: "What is the recommended method for charging a system with a zeotropic refrigerant blend?",
    options: ["Charge as a vapor into the high side", "Charge as a vapor into the low side", "Charge as a liquid into the high side", "Charge as a liquid into the low side"],
    correctAnswer: "Charge as a liquid into the low side",
    explanation: "Zeotropic refrigerant blends should be charged as a liquid into the low side of the system. This is because charging as a vapor could cause fractionation (separation of the blend components), resulting in an incorrect refrigerant composition in the system. Using a charging adapter or valve at the liquid line service valve while the compressor is running is the recommended practice."
  },
  {
    id: 'hvac-l2-refrigeration11',
    question: "What is the primary function of a filter drier in a refrigeration system?",
    options: ["To increase system pressure", "To improve oil circulation", "To remove moisture and contaminants", "To regulate refrigerant flow"],
    correctAnswer: "To remove moisture and contaminants",
    explanation: "The primary function of a filter drier in a refrigeration system is to remove moisture and contaminants. It contains desiccant materials to absorb water and filter media to trap solid particulates. This protection is crucial as moisture can react with refrigerants to form acids that damage the system, and contaminants can cause blockages or component wear."
  },
  {
    id: 'hvac-l2-refrigeration12',
    question: "What happens to the refrigerant temperature as it passes through the compressor?",
    options: ["It decreases", "It remains the same", "It increases", "It fluctuates randomly"],
    correctAnswer: "It increases",
    explanation: "As refrigerant passes through the compressor, its temperature increases significantly. This temperature rise is due to the compression process itself, which adds mechanical energy to the refrigerant, and the heat of compression, which is generated as the gas molecules are forced closer together, increasing both pressure and temperature."
  },
  {
    id: 'hvac-l2-refrigeration13',
    question: "Which of the following refrigerants has the lowest Global Warming Potential (GWP)?",
    options: ["R-410A (GWP 2088)", "R-134a (GWP 1430)", "R-32 (GWP 675)", "R-290 (GWP 3)"],
    correctAnswer: "R-290 (GWP 3)",
    explanation: "R-290 (propane) has the lowest Global Warming Potential (GWP) among the listed options, with a GWP of only 3. This makes it much more environmentally friendly in terms of direct climate impact compared to HFC refrigerants. However, being a hydrocarbon, R-290 is flammable and requires appropriate safety measures during installation and service."
  },
  {
    id: 'hvac-l2-refrigeration14',
    question: "What is the purpose of a thermostatic expansion valve (TXV) in a refrigeration system?",
    options: ["To control the flow of refrigerant based on the evaporator outlet temperature", "To increase compressor discharge pressure", "To maintain constant condenser pressure", "To regulate oil return to the compressor"],
    correctAnswer: "To control the flow of refrigerant based on the evaporator outlet temperature",
    explanation: "The purpose of a thermostatic expansion valve (TXV) is to control the flow of refrigerant based on the evaporator outlet temperature. It maintains proper superheat at the evaporator outlet by sensing the temperature and adjusting the refrigerant flow accordingly, ensuring efficient operation and preventing liquid refrigerant from entering the compressor."
  },
  {
    id: 'hvac-l2-refrigeration15',
    question: "What principle is the refrigeration cycle based on?",
    options: ["Newton's First Law", "Ohm's Law", "The Second Law of Thermodynamics", "Boyle's Law"],
    correctAnswer: "The Second Law of Thermodynamics",
    explanation: "The refrigeration cycle is based on the Second Law of Thermodynamics, which states that heat naturally flows from hot to cold. Refrigeration reverses this natural flow by using work input (via the compressor) to move heat from a colder space to a warmer one. The cycle exploits the refrigerant's properties to absorb heat at low temperatures and reject it at higher temperatures."
  },
  {
    id: 'hvac-l2-refrigeration16',
    question: "What is the function of the oil separator in a refrigeration system?",
    options: ["To cool the compressor motor", "To remove oil from the discharge gas and return it to the compressor", "To filter the refrigerant before it enters the condenser", "To separate liquid refrigerant from vapor"],
    correctAnswer: "To remove oil from the discharge gas and return it to the compressor",
    explanation: "The function of an oil separator is to remove oil from the discharge gas and return it to the compressor. During compression, some compressor lubricating oil is carried with the refrigerant into the discharge line. The oil separator captures this oil and returns it to the compressor crankcase, ensuring proper lubrication of the compressor and preventing oil circulation issues in the system."
  },
  {
    id: 'hvac-l2-refrigeration17',
    question: "What is the significance of the critical temperature of a refrigerant?",
    options: ["It is the lowest temperature at which the refrigerant can exist", "It is the temperature at which the refrigerant changes from vapor to liquid", "It is the temperature above which the refrigerant cannot be liquefied by pressure alone", "It is the temperature at which the refrigerant becomes flammable"],
    correctAnswer: "It is the temperature above which the refrigerant cannot be liquefied by pressure alone",
    explanation: "The critical temperature of a refrigerant is the temperature above which the refrigerant cannot be liquefied by pressure alone. Above this temperature, the refrigerant exists only as a gas regardless of pressure applied. The critical temperature is an important property when selecting refrigerants for specific applications, as the condensing temperature must be below the critical temperature for the refrigeration cycle to function properly."
  },
  {
    id: 'hvac-l2-refrigeration18',
    question: "What occurs at the evaporator in a refrigeration system?",
    options: ["Refrigerant rejects heat to the surrounding environment", "Refrigerant absorbs heat from the space being cooled", "Refrigerant pressure increases", "Refrigerant changes from vapor to liquid"],
    correctAnswer: "Refrigerant absorbs heat from the space being cooled",
    explanation: "At the evaporator, the refrigerant absorbs heat from the space being cooled. The low-pressure, low-temperature refrigerant enters the evaporator and absorbs heat from the surrounding air or liquid medium, causing the refrigerant to evaporate from a liquid-vapor mixture to a vapor. This heat absorption creates the cooling effect in the space being refrigerated."
  },
  {
    id: 'hvac-l2-refrigeration19',
    question: "What does the abbreviation COP stand for in refrigeration, and what does it measure?",
    options: ["Compression Output Power; it measures compressor output", "Critical Operating Pressure; it measures maximum system pressure", "Coefficient Of Performance; it measures system efficiency", "Condenser Operating Parameters; it measures heat rejection rate"],
    correctAnswer: "Coefficient Of Performance; it measures system efficiency",
    explanation: "COP stands for Coefficient Of Performance, which measures system efficiency. It is the ratio of useful refrigeration effect (heat removed) to the energy input (typically electrical energy to the compressor). A higher COP indicates a more efficient system. For example, a COP of 3 means that for every 1 kW of electrical energy input, 3 kW of cooling effect is produced."
  },
  {
    id: 'hvac-l2-refrigeration20',
    question: "What happens if liquid refrigerant enters the compressor?",
    options: ["System efficiency increases", "Compressor oil is diluted", "Compressor life is extended", "System pressure decreases"],
    correctAnswer: "Compressor oil is diluted",
    explanation: "If liquid refrigerant enters the compressor, it dilutes the compressor oil, reducing its lubricating properties. This condition, known as 'liquid slugging,' can also cause mechanical damage as liquids are incompressible. It may damage valves, connecting rods, and other mechanical components. Proper superheat at the compressor inlet is maintained to prevent this dangerous condition."
  },
  {
    id: 'hvac-l2-refrigeration21',
    question: "What is the purpose of the receiver in a refrigeration system?",
    options: ["To monitor refrigerant pressure", "To store excess refrigerant", "To filter the refrigerant", "To control compressor speed"],
    correctAnswer: "To store excess refrigerant",
    explanation: "The purpose of the receiver in a refrigeration system is to store excess refrigerant. It acts as a reservoir that accommodates variations in refrigerant volume within the system due to changing operating conditions and load variations. This ensures that there is always a sufficient supply of liquid refrigerant available to the expansion device regardless of operating conditions."
  },
  {
    id: 'hvac-l2-refrigeration22',
    question: "What is the function of a suction line accumulator in a refrigeration system?",
    options: ["To store excess refrigerant", "To protect the compressor from liquid refrigerant", "To increase system pressure", "To cool the compressor"],
    correctAnswer: "To protect the compressor from liquid refrigerant",
    explanation: "The function of a suction line accumulator is to protect the compressor from liquid refrigerant. It is installed in the suction line and acts as a temporary reservoir that catches and evaporates any liquid refrigerant before it can reach the compressor. This protection is particularly important in heat pump systems and systems with varying loads that might experience occasional liquid floodback."
  },
  {
    id: 'hvac-l2-refrigeration23',
    question: "Which of the following is a correct statement about refrigerant temperature glide?",
    options: ["It only occurs with azeotropic refrigerants", "It is the temperature change as refrigerant passes through the compressor", "It is the temperature difference between liquid and vapor phases of zeotropic blends during phase change", "It is the temperature difference between the suction and discharge of the system"],
    correctAnswer: "It is the temperature difference between liquid and vapor phases of zeotropic blends during phase change",
    explanation: "Temperature glide is the temperature difference between liquid and vapor phases of zeotropic refrigerant blends during phase change at constant pressure. Unlike azeotropic refrigerants that behave as a single substance, zeotropic blends (like R-407C) have components that boil at different temperatures, creating a temperature change or 'glide' as the mixture evaporates or condenses."
  },
  {
    id: 'hvac-l2-refrigeration24',
    question: "What is the effect of increasing the condensing pressure in a refrigeration system?",
    options: ["It decreases the power consumption of the compressor", "It increases system efficiency", "It increases the compressor discharge temperature", "It decreases the temperature lift required of the system"],
    correctAnswer: "It increases the compressor discharge temperature",
    explanation: "Increasing the condensing pressure in a refrigeration system increases the compressor discharge temperature. Higher condensing pressure means the compressor must work harder to achieve the required pressure differential, which increases power consumption, reduces system efficiency (COP), and raises the discharge temperature. This can lead to oil breakdown and compressor damage if the increase is significant."
  },
  {
    id: 'hvac-l2-refrigeration25',
    question: "According to UK F-Gas regulations, what qualification is required to handle fluorinated greenhouse gas refrigerants in stationary refrigeration systems?",
    options: ["City & Guilds 2078", "City & Guilds 2394/2395", "F-Gas Category I certification", "Gas Safe registration"],
    correctAnswer: "F-Gas Category I certification",
    explanation: "According to UK F-Gas regulations, F-Gas Category I certification is required to handle fluorinated greenhouse gas refrigerants in stationary refrigeration systems. This certification covers all activities including installation, servicing, maintenance, repair, leakage checking, and recovery. It is typically achieved through qualifications such as City & Guilds 2079-11 or equivalent certification from other awarding bodies."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-refrigeration', 'items', q.id), {
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
