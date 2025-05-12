// ✅ COMPLETE: npx ts-node scripts/hvac/level2/uploadLevel2Pipework.ts

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

// ✅ HVAC Level 2 Pipework & Insulation Questions
const questions = [
  {
    id: 'hvac-l2-pipework1',
    question: "Which pipe material is commonly used for chilled water systems in commercial HVAC installations?",
    options: ["PVC-U", "Galvanized steel", "Copper", "Cast iron"],
    correctAnswer: "Copper",
    explanation: "Copper is commonly used for chilled water systems in commercial HVAC installations due to its excellent thermal conductivity, corrosion resistance, and ease of installation. It can withstand the temperatures involved in chilled water applications (typically 5-10°C), is relatively lightweight, and can be easily joined using soldering, brazing, or mechanical fittings."
  },
  {
    id: 'hvac-l2-pipework2',
    question: "According to BS 5422, what is the main purpose of insulating chilled water pipes?",
    options: ["To prevent freezing", "To prevent condensation and reduce heat gain", "To reduce noise transmission", "To protect against UV damage"],
    correctAnswer: "To prevent condensation and reduce heat gain",
    explanation: "According to BS 5422 (Method for specifying thermal insulating materials), the main purpose of insulating chilled water pipes is to prevent condensation and reduce heat gain. The cold surface of uninsulated chilled water pipes can fall below the dew point of the surrounding air, causing condensation to form, which can lead to water damage and mold growth. The insulation also reduces unwanted heat gain to the chilled water, improving system efficiency."
  },
  {
    id: 'hvac-l2-pipework3',
    question: "What is the recommended method for joining refrigeration copper pipework in the UK?",
    options: ["Compression fittings", "Push-fit connections", "Brazing with silver solder alloy", "Threaded connections"],
    correctAnswer: "Brazing with silver solder alloy",
    explanation: "The recommended method for joining refrigeration copper pipework in the UK is brazing with silver solder alloy (typically containing 2-45% silver content). This creates a strong, leak-tight joint capable of withstanding the high pressures and temperature variations in refrigeration systems. During the brazing process, it's essential to use a nitrogen purge to prevent oxide formation inside the pipes."
  },
  {
    id: 'hvac-l2-pipework4',
    question: "What type of valve would typically be installed at the highest point of a water-based heating system?",
    options: ["Pressure relief valve", "Gate valve", "Automatic air vent", "Balancing valve"],
    correctAnswer: "Automatic air vent",
    explanation: "An automatic air vent would typically be installed at the highest point of a water-based heating system. Air tends to collect at the highest points in a hydronic system, and the automatic air vent allows this air to be automatically released, preventing air locks that could restrict flow and reduce system efficiency. Proper air removal is essential for efficient operation of pumps and heat transfer."
  },
  {
    id: 'hvac-l2-pipework5',
    question: "What is the purpose of a strainer in a hydronic system?",
    options: ["To increase water pressure", "To reduce water velocity", "To remove particulates and debris from the fluid", "To add chemicals to the water"],
    correctAnswer: "To remove particulates and debris from the fluid",
    explanation: "The purpose of a strainer in a hydronic system is to remove particulates and debris from the fluid. It typically consists of a perforated or mesh screen element that catches solid contaminants while allowing water to pass through. Strainers protect downstream components such as pumps, valves, heat exchangers, and flow meters from damage or blockage caused by debris in the system."
  },
  {
    id: 'hvac-l2-pipework6',
    question: "According to industry standards, what is the recommended minimum slope for horizontal condensate drain pipes to ensure proper drainage?",
    options: ["1:50", "1:100", "1:200", "1:500"],
    correctAnswer: "1:50",
    explanation: "The recommended minimum slope for horizontal condensate drain pipes is 1:50 (20mm per meter or 1/4 inch per foot). This gradient ensures that gravity provides sufficient force for the condensate to flow freely, preventing standing water that could lead to blockages, overflow, mold growth, or bacterial buildup. Proper drainage is essential for the effective operation of air conditioning and refrigeration equipment."
  },
  {
    id: 'hvac-l2-pipework7',
    question: "Which piping material should not be used for refrigerant lines containing R-410A?",
    options: ["Copper", "Stainless steel", "Aluminum", "PVC"],
    correctAnswer: "PVC",
    explanation: "PVC (Polyvinyl Chloride) should not be used for refrigerant lines containing R-410A or any refrigerant. PVC cannot withstand the pressures and temperatures involved in refrigeration systems and is not compatible with refrigerant oils. Refrigerant lines must use materials specifically designed for refrigerant service, with copper being the most common choice due to its pressure rating, thermal conductivity, and compatibility."
  },
  {
    id: 'hvac-l2-pipework8',
    question: "What is the purpose of a vapor barrier on insulation for chilled water pipes?",
    options: ["To increase thermal resistance", "To prevent moisture from penetrating the insulation", "To protect against UV degradation", "To provide mechanical protection"],
    correctAnswer: "To prevent moisture from penetrating the insulation",
    explanation: "The purpose of a vapor barrier on insulation for chilled water pipes is to prevent moisture from penetrating the insulation. Since the pipe surface is below the dew point of the surrounding air, moisture would naturally diffuse through the insulation and condense at the cold pipe surface, reducing insulation effectiveness and potentially causing corrosion. The vapor barrier blocks this moisture migration."
  },
  {
    id: 'hvac-l2-pipework9',
    question: "According to BS 5422, what is the typical recommended minimum thickness for insulation on a 28mm diameter hot water pipe operating at 60°C in normal building conditions?",
    options: ["15mm", "20mm", "25mm", "40mm"],
    correctAnswer: "25mm",
    explanation: "According to BS 5422, for a 28mm diameter hot water pipe operating at 60°C in normal building conditions (with ambient temperature around 20°C), the typical recommended minimum insulation thickness would be approximately 25mm, assuming a standard insulation material with a thermal conductivity of 0.035-0.04 W/mK. This thickness helps minimize heat loss while maintaining energy efficiency."
  },
  {
    id: 'hvac-l2-pipework10',
    question: "Which type of fitting should be used to allow for thermal expansion in long runs of hot water pipework?",
    options: ["Union fitting", "Expansion loop or flexible connector", "90° elbow", "Reducing coupler"],
    correctAnswer: "Expansion loop or flexible connector",
    explanation: "Expansion loops or flexible connectors should be used to allow for thermal expansion in long runs of hot water pipework. As pipes heat up, they expand lengthwise, and without proper accommodation, this expansion can create stress that damages pipes, fittings, or supports. Expansion loops (U-shaped pipe sections) or proprietary flexible connectors provide the necessary flexibility to absorb this movement safely."
  },
  {
    id: 'hvac-l2-pipework11',
    question: "What is the primary reason for using press-fit copper pipe fittings in HVAC installations?",
    options: ["Lower material cost", "Faster installation without hot works", "Better pressure rating", "Improved flow characteristics"],
    correctAnswer: "Faster installation without hot works",
    explanation: "The primary reason for using press-fit copper pipe fittings in HVAC installations is faster installation without hot works. Press-fit systems use special tools to create a mechanical joint without soldering or brazing, eliminating fire risks and the need for hot work permits. This results in significant time savings, particularly in renovations, occupied buildings, or areas where flame-based joining methods would be hazardous."
  },
  {
    id: 'hvac-l2-pipework12',
    question: "What is the purpose of pipe lagging in HVAC systems?",
    options: ["To increase pipe strength", "To prevent condensation and reduce heat transfer", "To reduce water velocity", "To prevent water hammer"],
    correctAnswer: "To prevent condensation and reduce heat transfer",
    explanation: "The purpose of pipe lagging in HVAC systems is to prevent condensation and reduce heat transfer. Lagging (insulation with outer protective covering) on cold pipes prevents condensation by keeping the pipe surface above the dew point of the ambient air. On hot pipes, it reduces heat loss to improve energy efficiency. In both cases, it helps maintain the intended fluid temperature and protects surrounding areas."
  },
  {
    id: 'hvac-l2-pipework13',
    question: "Which tool should be used to cut plastic ABS or PVC condensate drainage pipes?",
    options: ["Pipe freezing kit", "Hacksaw or plastic pipe cutter", "Blowtorch", "Pipe threading machine"],
    correctAnswer: "Hacksaw or plastic pipe cutter",
    explanation: "Plastic ABS or PVC condensate drainage pipes should be cut using a hacksaw or dedicated plastic pipe cutter. These tools provide a clean, square cut without damaging the pipe. Pipe cutters designed specifically for plastic pipe are often preferred as they require less effort and produce less debris. After cutting, the pipe end should be deburred to remove any sharp edges that might restrict flow."
  },
  {
    id: 'hvac-l2-pipework14',
    question: "According to UK building standards, where should pipework penetrate a fire-rated wall or floor?",
    options: ["At any convenient location", "Only at floor level", "Only at ceiling level", "Through properly installed fire-stopping sleeves"],
    correctAnswer: "Through properly installed fire-stopping sleeves",
    explanation: "According to UK building standards (specifically Building Regulations Approved Document B), where pipework penetrates a fire-rated wall or floor, it must pass through properly installed fire-stopping sleeves. These sleeves maintain the fire-resistance rating of the structure by preventing fire and smoke spread. The fire-stopping material must be compatible with the pipe material and rated for the required fire-resistance period."
  },
  {
    id: 'hvac-l2-pipework15',
    question: "Which of the following represents the correct pipe size progression in a standard UK copper pipe system?",
    options: ["15mm, 22mm, 28mm, 35mm, 42mm", "12mm, 18mm, 25mm, 32mm, 40mm", "14mm, 20mm, 26mm, 34mm, 40mm", "16mm, 20mm, 25mm, 32mm, 38mm"],
    correctAnswer: "15mm, 22mm, 28mm, 35mm, 42mm",
    explanation: "The correct pipe size progression in a standard UK copper pipe system is 15mm, 22mm, 28mm, 35mm, 42mm (followed by 54mm, 67mm, etc.). These sizes refer to the outside diameter of the pipe and are standardized according to BS EN 1057. This standardization ensures compatibility with fittings and tools across different manufacturers and installations."
  },
  {
    id: 'hvac-l2-pipework16',
    question: "What is the recommended method for pressure testing newly installed refrigerant pipework before charging?",
    options: ["Pressure test with refrigerant gas", "Pressure test with oxygen", "Pressure test with nitrogen and electronic leak detector", "Pressure test with water"],
    correctAnswer: "Pressure test with nitrogen and electronic leak detector",
    explanation: "The recommended method for pressure testing newly installed refrigerant pipework before charging is to use dry nitrogen with an electronic leak detector. The system should be pressurized with OFN (Oxygen-Free Nitrogen) to appropriate test pressures (typically 1.1 times the maximum working pressure) and checked for leaks using electronic leak detectors, bubble solution, or pressure decay tests. Oxygen or flammable gases should never be used due to safety risks."
  },
  {
    id: 'hvac-l2-pipework17',
    question: "What is the purpose of a drain trap on a condensate drain line from an air handling unit?",
    options: ["To collect debris before it enters the drain system", "To prevent air from being drawn into or blown out of the unit through the drain", "To increase the flow rate of condensate", "To reduce noise from flowing water"],
    correctAnswer: "To prevent air from being drawn into or blown out of the unit through the drain",
    explanation: "The purpose of a drain trap on a condensate drain line from an air handling unit is to prevent air from being drawn into or blown out of the unit through the drain. By maintaining a water seal, the trap blocks airflow while allowing water to pass. This prevents loss of conditioned air, stops untreated air from entering the system, and prevents the blower from drawing air through the drain rather than the intended airpath."
  },
  {
    id: 'hvac-l2-pipework18',
    question: "What material is commonly used for insulating hot water pipes in accordance with BS 5422?",
    options: ["Fiberglass with aluminum foil facing", "Expanded polystyrene (EPS)", "PVC foam", "Polyethylene foam"],
    correctAnswer: "Fiberglass with aluminum foil facing",
    explanation: "Fiberglass with aluminum foil facing is commonly used for insulating hot water pipes in accordance with BS 5422. This material can withstand the high temperatures of hot water systems (up to 100°C), provides good thermal insulation, and the foil facing acts as a vapor barrier and protects the fiberglass. It is also fire-resistant, meeting UK fire safety regulations for building services."
  },
  {
    id: 'hvac-l2-pipework19',
    question: "What is the primary reason for installing isolation valves on both sides of an HVAC pump?",
    options: ["To regulate water flow rate", "To allow pump removal without draining the entire system", "To prevent water hammer", "To protect against over-pressure"],
    correctAnswer: "To allow pump removal without draining the entire system",
    explanation: "The primary reason for installing isolation valves on both sides of an HVAC pump is to allow pump removal without draining the entire system. These valves can be closed to isolate the pump section, enabling maintenance, repair, or replacement of the pump while the rest of the system remains filled with water. This saves time, reduces water waste, and minimizes system downtime."
  },
  {
    id: 'hvac-l2-pipework20',
    question: "According to UK standards, what is the recommended minimum separation distance between hot water pipes and electrical cables?",
    options: ["No separation is required", "50mm", "150mm", "300mm"],
    correctAnswer: "150mm",
    explanation: "According to UK standards (particularly in reference to BS 7671 IET Wiring Regulations), the recommended minimum separation distance between hot water pipes and electrical cables is generally 150mm. This separation helps prevent heat transfer from hot pipes to electrical cables, which could degrade cable insulation over time. If this separation cannot be achieved, additional thermal insulation or barriers may be required."
  },
  {
    id: 'hvac-l2-pipework21',
    question: "Which pipe material is most suitable for underground chilled water distribution between buildings in the UK?",
    options: ["Copper", "Carbon steel", "Pre-insulated polymer pipes", "Cast iron"],
    correctAnswer: "Pre-insulated polymer pipes",
    explanation: "Pre-insulated polymer pipes are most suitable for underground chilled water distribution between buildings in the UK. These pipes typically consist of a carrier pipe (often PE-Xa or similar polymer), surrounded by high-efficiency insulation and a waterproof outer casing. They provide excellent corrosion resistance, thermal efficiency, and durability in buried applications, with factory-made insulation that prevents moisture ingress."
  },
  {
    id: 'hvac-l2-pipework22',
    question: "What is the purpose of pipe identification in HVAC systems according to BS 1710?",
    options: ["Only for aesthetic purposes", "To identify the installer of the pipework", "To indicate pipe contents and flow direction", "Only required for gas pipes"],
    correctAnswer: "To indicate pipe contents and flow direction",
    explanation: "According to BS 1710, the purpose of pipe identification in HVAC systems is to indicate pipe contents and flow direction. This standard establishes a color coding system where pipes are labeled with specific colors corresponding to their contents (e.g., blue for water, green for chilled water, brown/red for heating). Direction arrows indicate flow direction, and additional text or safety information may be included where appropriate."
  },
  {
    id: 'hvac-l2-pipework23',
    question: "What is the recommended method for supporting horizontal copper pipework in HVAC installations?",
    options: ["Cable ties only", "Pipe clips with rubber inserts at manufacturer-recommended spacing", "Tape wrapped around the pipe at regular intervals", "No support is needed for pipes under 28mm"],
    correctAnswer: "Pipe clips with rubber inserts at manufacturer-recommended spacing",
    explanation: "The recommended method for supporting horizontal copper pipework is using pipe clips with rubber inserts at manufacturer-recommended spacing. The rubber inserts prevent direct metal-to-metal contact, reducing vibration transmission and preventing galvanic corrosion. Spacing depends on pipe size: typically 1.2m for 15mm, 1.8m for 22mm, and 2.4m for 28mm pipes, per industry guidelines and to prevent sagging between supports."
  },
  {
    id: 'hvac-l2-pipework24',
    question: "Which of the following correctly describes the required head clearance above pipework for maintenance access in a plant room according to CIBSE guidelines?",
    options: ["No clearance required as long as pipes are accessible from the front", "Minimum 300mm clearance", "Minimum 500mm clearance", "Minimum 2000mm clearance"],
    correctAnswer: "Minimum 500mm clearance",
    explanation: "According to CIBSE guidelines for plant rooms, a minimum 500mm head clearance should be maintained above pipework for maintenance access. This ensures that maintenance personnel have adequate space to work on valves, joints, and other components. For major plant items or frequently accessed components, even greater clearances may be recommended to provide proper working conditions."
  },
  {
    id: 'hvac-l2-pipework25',
    question: "What is the primary reason for using flexible connections where pipework connects to HVAC equipment like chillers or air handling units?",
    options: ["To allow for easy replacement of equipment", "To reduce cost of installation", "To isolate vibration and allow for thermal movement", "To provide electrical isolation"],
    correctAnswer: "To isolate vibration and allow for thermal movement",
    explanation: "The primary reason for using flexible connections where pipework connects to HVAC equipment is to isolate vibration and allow for thermal movement. Flexible connections prevent the transmission of equipment vibration to the piping system (which could cause noise or pipe damage) and accommodate thermal expansion/contraction as well as slight misalignments between the equipment and fixed pipework."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'hvac-l2-pipework', 'items', q.id), {
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
