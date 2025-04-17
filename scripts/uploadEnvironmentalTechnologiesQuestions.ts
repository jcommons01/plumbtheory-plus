import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

const environmentalTechQuestions = [
  {
    id: 'environmentalQ1',
    topic: 'environmental-technologies',
    question: 'Which renewable energy system uses the heat from the ground to provide space heating and hot water?',
    options: ['Air source heat pump', 'Ground source heat pump', 'Solar thermal', 'Biomass boiler'],
    correctAnswer: 'Ground source heat pump',
    explanation: 'Ground source heat pumps extract heat from the earth through buried pipes to supply heating and hot water.'
  },
  {
    id: 'environmentalQ2',
    topic: 'environmental-technologies',
    question: 'Which solar technology directly heats water for domestic use?',
    options: ['Solar PV', 'Solar thermal', 'Wind turbine', 'Biomass boiler'],
    correctAnswer: 'Solar thermal',
    explanation: 'Solar thermal systems absorb sunlight to heat water directly, often using roof-mounted panels.'
  },
  {
    id: 'environmentalQ3',
    topic: 'environmental-technologies',
    question: 'What is the primary function of a rainwater harvesting system in a domestic building?',
    options: ['Boost water pressure', 'Filter mains water', 'Store and reuse rainwater', 'Reduce pipe corrosion'],
    correctAnswer: 'Store and reuse rainwater',
    explanation: 'Rainwater harvesting systems collect rain for use in toilets, washing machines, and garden irrigation.'
  },
  {
    id: 'environmentalQ4',
    topic: 'environmental-technologies',
    question: 'What regulation governs the use of reclaimed water systems in buildings in the UK?',
    options: ['Part G of Building Regulations', 'Part H of Building Regulations', 'WRAS Guidelines', 'BS 7671'],
    correctAnswer: 'Part G of Building Regulations',
    explanation: 'Part G covers hygiene and water supply, including the use of reclaimed water in buildings.'
  },
  {
    id: 'environmentalQ5',
    topic: 'environmental-technologies',
    question: 'What is the most common method for distributing biomass heating in residential homes?',
    options: ['Ducted air system', 'Wet radiator system', 'Direct fire heating', 'Electric panels'],
    correctAnswer: 'Wet radiator system',
    explanation: 'Biomass boilers heat water that is circulated through radiators or underfloor heating systems.'
  },
  {
    id: 'environmentalQ6',
    topic: 'environmental-technologies',
    question: 'Which low carbon technology generates electricity on-site for domestic use?',
    options: ['Solar thermal', 'Heat recovery ventilator', 'Solar PV', 'Greywater recycling'],
    correctAnswer: 'Solar PV',
    explanation: 'Photovoltaic (PV) panels convert sunlight into electricity for household consumption.'
  },
  {
    id: 'environmentalQ7',
    topic: 'environmental-technologies',
    question: 'Which of the following systems improves air quality and reduces energy loss in buildings?',
    options: ['Mechanical ventilation with heat recovery (MVHR)', 'Biomass heating', 'Solar PV', 'Wind turbine'],
    correctAnswer: 'Mechanical ventilation with heat recovery (MVHR)',
    explanation: 'MVHR systems supply fresh air and recover heat from extracted stale air to increase energy efficiency.'
  },
  {
    id: 'environmentalQ8',
    topic: 'environmental-technologies',
    question: 'Which energy label indicates the highest energy efficiency for heating appliances in the UK?',
    options: ['E', 'C', 'A++', 'B'],
    correctAnswer: 'A++',
    explanation: 'A++ rated appliances are the most energy efficient according to UK and EU standards.'
  },
  {
    id: 'environmentalQ9',
    topic: 'environmental-technologies',
    question: 'What is the purpose of greywater recycling?',
    options: ['To generate electricity', 'To reduce gas use', 'To reuse waste water from showers and basins', 'To heat domestic water'],
    correctAnswer: 'To reuse waste water from showers and basins',
    explanation: 'Greywater recycling captures lightly used water for reuse in flushing toilets and irrigation.'
  },
  {
    id: 'environmentalQ10',
    topic: 'environmental-technologies',
    question: 'Which of these technologies helps meet carbon reduction targets in the UK?',
    options: ['Oil boiler', 'Combi boiler', 'Solar PV system', 'Electric shower'],
    correctAnswer: 'Solar PV system',
    explanation: 'Solar PV systems produce renewable electricity and help lower CO2 emissions in homes.'
  },
  {
    id: 'environmentalQ11',
    topic: 'environmental-technologies',
    question: 'Which certification demonstrates that a heat pump installation meets quality standards?',
    options: ['Gas Safe', 'MCS (Microgeneration Certification Scheme)', 'Part L', 'OFTEC'],
    correctAnswer: 'MCS (Microgeneration Certification Scheme)',
    explanation: 'The MCS ensures quality assurance for renewable technology installations like heat pumps.'
  },
  {
    id: 'environmentalQ12',
    topic: 'environmental-technologies',
    question: 'What is the most efficient orientation for solar thermal collectors in the UK?',
    options: ['East-facing at 15° angle', 'South-facing at 30–40° angle', 'North-facing at 45°', 'West-facing at 20°'],
    correctAnswer: 'South-facing at 30–40° angle',
    explanation: 'South-facing collectors at 30–40° optimise solar gain in UK conditions.'
  },
  {
    id: 'environmentalQ13',
    topic: 'environmental-technologies',
    question: 'What is the main benefit of underfloor heating compared to radiators in low-temperature systems?',
    options: ['Higher installation cost', 'Slower response', 'Even heat distribution and lower flow temps', 'Faster heat up'],
    correctAnswer: 'Even heat distribution and lower flow temps',
    explanation: 'Underfloor heating provides even warmth at lower temperatures, improving efficiency.'
  },
  {
    id: 'environmentalQ14',
    topic: 'environmental-technologies',
    question: 'Which type of lighting is considered most energy-efficient for domestic use?',
    options: ['Halogen', 'LED', 'Fluorescent', 'Incandescent'],
    correctAnswer: 'LED',
    explanation: 'LEDs use less electricity and have a much longer lifespan than traditional lighting.'
  },
  {
    id: 'environmentalQ15',
    topic: 'environmental-technologies',
    question: 'What does the term "U-value" refer to in environmental building design?',
    options: ['Voltage loss in circuits', 'Air change rate', 'Thermal transmittance of a material', 'Water usage rate'],
    correctAnswer: 'Thermal transmittance of a material',
    explanation: 'U-values measure how well a building element conducts heat. Lower values mean better insulation.'
  },
  {
    id: 'envTechQ16',
    topic: 'environmental-technologies',
    question: 'What is the main advantage of greywater recycling systems in homes?',
    options: ['Increased hot water supply', 'Reduced wastewater discharge', 'Better water pressure', 'Less need for plumbing maintenance'],
    correctAnswer: 'Reduced wastewater discharge',
    explanation: 'Greywater systems reduce strain on sewers and promote reuse for flushing or irrigation.'
  },
  {
    id: 'envTechQ17',
    topic: 'environmental-technologies',
    question: 'Which UK standard applies to the installation of solar thermal systems?',
    options: ['BS 7671', 'BS 6700', 'MIS 3001', 'WRAS 2020'],
    correctAnswer: 'MIS 3001',
    explanation: 'MIS 3001 is part of the Microgeneration Certification Scheme for solar thermal installations.'
  },
  {
    id: 'envTechQ18',
    topic: 'environmental-technologies',
    question: 'Which component stores thermal energy in a solar water heating system?',
    options: ['Flat plate collector', 'Expansion vessel', 'Storage cylinder', 'Pump station'],
    correctAnswer: 'Storage cylinder',
    explanation: 'The storage cylinder holds hot water collected from the solar panels for domestic use.'
  },
  {
    id: 'envTechQ19',
    topic: 'environmental-technologies',
    question: 'How is the efficiency of a solar collector typically measured?',
    options: ['By light absorption rate', 'By flow rate of water', 'By kilowatts per square metre', 'By system cost'],
    correctAnswer: 'By kilowatts per square metre',
    explanation: 'Efficiency is rated by how much thermal energy is delivered per unit area of collector surface.'
  },
  {
    id: 'envTechQ20',
    topic: 'environmental-technologies',
    question: 'Which renewable heating system uses underground pipes to extract heat?',
    options: ['Air source heat pump', 'Biomass boiler', 'Ground source heat pump', 'Solar PV'],
    correctAnswer: 'Ground source heat pump',
    explanation: 'GSHPs use the stable temperature of the ground to heat buildings efficiently.'
  },
  {
    id: 'envTechQ21',
    topic: 'environmental-technologies',
    question: 'Why is it important to fit a UV steriliser in a rainwater harvesting system for potable use?',
    options: ['To reduce water pressure', 'To sterilise pathogens', 'To balance pH', 'To remove sediment'],
    correctAnswer: 'To sterilise pathogens',
    explanation: 'UV sterilisers kill bacteria and viruses, making rainwater safe for consumption.'
  },
  {
    id: 'envTechQ22',
    topic: 'environmental-technologies',
    question: 'What does the term "Coefficient of Performance" (COP) refer to in heat pumps?',
    options: ['Pump lifespan', 'Electrical input', 'Heating efficiency ratio', 'Installation cost'],
    correctAnswer: 'Heating efficiency ratio',
    explanation: 'COP describes the ratio of heating or cooling output to electrical input, indicating efficiency.'
  },
  {
    id: 'envTechQ23',
    topic: 'environmental-technologies',
    question: 'Which regulation outlines standards for energy efficiency in UK buildings?',
    options: ['Part G', 'Part F', 'Part L', 'Part P'],
    correctAnswer: 'Part L',
    explanation: 'Part L of the Building Regulations deals with energy conservation and performance.'
  },
  {
    id: 'envTechQ24',
    topic: 'environmental-technologies',
    question: 'In a biomass boiler system, which of the following is a common fuel type?',
    options: ['Natural gas', 'Pellets', 'Diesel', 'Solar fluid'],
    correctAnswer: 'Pellets',
    explanation: 'Biomass boilers typically use wood pellets made from compressed sawdust or other organic matter.'
  },
  {
    id: 'envTechQ25',
    topic: 'environmental-technologies',
    question: 'What must be considered when installing a heat pump in an older property?',
    options: ['Airflow control', 'Ceiling height', 'Level of insulation', 'Colour of roof tiles'],
    correctAnswer: 'Level of insulation',
    explanation: 'Good insulation is essential for heat pumps to operate efficiently, especially in older homes.'
  },
  {
    id: 'envTechQ26',
    topic: 'environmental-technologies',
    question: 'What is the purpose of antifreeze in a solar thermal system?',
    options: ['To increase pressure', 'To prevent corrosion', 'To stop freezing in winter', 'To thicken the fluid'],
    correctAnswer: 'To stop freezing in winter',
    explanation: 'Antifreeze ensures solar fluid does not freeze in cold conditions, protecting the system.'
  },
  {
    id: 'envTechQ27',
    topic: 'environmental-technologies',
    question: 'Which of the following is a benefit of using rainwater harvesting in commercial buildings?',
    options: ['Reduced roof maintenance', 'Increased energy bills', 'Reduced mains water use', 'Improved heating'],
    correctAnswer: 'Reduced mains water use',
    explanation: 'Harvested rainwater can be reused for non-potable needs, lowering mains water consumption.'
  },
  {
    id: 'envTechQ28',
    topic: 'environmental-technologies',
    question: 'What is the main role of an expansion vessel in a solar thermal system?',
    options: ['Store hot water', 'Relieve excess pressure', 'Boost circulation', 'Filter particulates'],
    correctAnswer: 'Relieve excess pressure',
    explanation: 'Expansion vessels absorb increased volume from thermal expansion, preventing damage.'
  },
  {
    id: 'envTechQ29',
    topic: 'environmental-technologies',
    question: 'Which renewable system converts sunlight directly into electricity?',
    options: ['Solar PV', 'Solar thermal', 'Wind turbine', 'GSHP'],
    correctAnswer: 'Solar PV',
    explanation: 'Photovoltaic (PV) panels generate electricity by converting sunlight using semiconductors.'
  },
  {
    id: 'envTechQ30',
    topic: 'environmental-technologies',
    question: 'What is a key benefit of underfloor heating systems when used with renewable heating sources?',
    options: ['Lower cost to install', 'Fast warm-up time', 'Low operating temperature', 'Easy zoning'],
    correctAnswer: 'Low operating temperature',
    explanation: 'Underfloor heating works well with low-temperature sources like heat pumps for greater efficiency.'
  },
  {
    id: 'envTechQ31',
    topic: 'environmental-technologies',
    question: 'Which technology uses underground pipes to provide heating or cooling based on soil temperature?',
    options: ['Solar PV', 'Air Source Heat Pump', 'Geothermal Heat Pump', 'Wind Turbine'],
    correctAnswer: 'Geothermal Heat Pump',
    explanation: 'Geothermal systems use stable underground temperatures for efficient heating and cooling.'
  },
  {
    id: 'envTechQ32',
    topic: 'environmental-technologies',
    question: 'Which regulation in the UK promotes the reduction of carbon emissions in buildings?',
    options: ['Part G', 'Part L', 'Part P', 'Part E'],
    correctAnswer: 'Part L',
    explanation: 'Part L of the Building Regulations covers energy efficiency and carbon reduction.'
  },
  {
    id: 'envTechQ33',
    topic: 'environmental-technologies',
    question: 'What is the most effective orientation for solar thermal panels in the UK?',
    options: ['East-facing', 'West-facing', 'South-facing', 'North-facing'],
    correctAnswer: 'South-facing',
    explanation: 'South-facing panels maximize sun exposure for optimal energy collection.'
  },
  {
    id: 'envTechQ34',
    topic: 'environmental-technologies',
    question: 'Which type of renewable heating system is eligible for the Boiler Upgrade Scheme (BUS) in the UK?',
    options: ['Oil Boiler', 'Gas Combi Boiler', 'Air Source Heat Pump', 'Back Boiler'],
    correctAnswer: 'Air Source Heat Pump',
    explanation: 'The Boiler Upgrade Scheme supports low-carbon heating like air and ground source heat pumps.'
  },
  {
    id: 'envTechQ35',
    topic: 'environmental-technologies',
    question: 'Which of the following can improve the efficiency of underfloor heating systems?',
    options: ['Raising boiler temp', 'Increasing floor height', 'Good floor insulation', 'Wider pipe spacing'],
    correctAnswer: 'Good floor insulation',
    explanation: 'Proper insulation reduces heat loss and enhances system performance.'
  },
  {
    id: 'envTechQ36',
    topic: 'environmental-technologies',
    question: 'What is the role of a diverter valve in a solar thermal system?',
    options: ['Boost temperature', 'Protect from freezing', 'Redirect flow to backup', 'Divert heat to DHW cylinder'],
    correctAnswer: 'Divert heat to DHW cylinder',
    explanation: 'Diverter valves control the flow of heated fluid to the appropriate destination.'
  },
  {
    id: 'envTechQ37',
    topic: 'environmental-technologies',
    question: 'Which renewable energy source has the highest consistency in the UK climate?',
    options: ['Wind Power', 'Solar PV', 'Hydroelectric', 'Biomass'],
    correctAnswer: 'Biomass',
    explanation: 'Biomass offers consistent output regardless of weather conditions.'
  },
  {
    id: 'envTechQ38',
    topic: 'environmental-technologies',
    question: 'What is the typical lifespan of a solar PV panel in domestic installations?',
    options: ['5–10 years', '10–15 years', '20–25 years', 'Over 30 years'],
    correctAnswer: '20–25 years',
    explanation: 'Most solar panels are warrantied and functional for 20–25 years or more.'
  },
  {
    id: 'envTechQ39',
    topic: 'environmental-technologies',
    question: 'Which component stores heat in a solar thermal system?',
    options: ['Expansion vessel', 'Thermal store', 'DHW cylinder', 'Header tank'],
    correctAnswer: 'Thermal store',
    explanation: 'Thermal stores act as reservoirs to hold and distribute collected heat.'
  },
  {
    id: 'envTechQ40',
    topic: 'environmental-technologies',
    question: 'What is one disadvantage of air source heat pumps in colder climates?',
    options: ['Require gas backup', 'Lower efficiency', 'Excessive noise', 'No government support'],
    correctAnswer: 'Lower efficiency',
    explanation: 'As outside air temperatures drop, air source heat pumps become less efficient.'
  },
  {
    id: 'envTechQ41',
    topic: 'environmental-technologies',
    question: 'What is the primary benefit of mechanical ventilation with heat recovery (MVHR)?',
    options: ['Reduces air pollution', 'Prevents condensation', 'Retains indoor heat while ventilating', 'Improves water pressure'],
    correctAnswer: 'Retains indoor heat while ventilating',
    explanation: 'MVHR systems extract stale air and recover heat before bringing in fresh air, improving energy efficiency.'
  },
  {
    id: 'envTechQ42',
    topic: 'environmental-technologies',
    question: 'Which fuel source is considered carbon neutral if sustainably managed?',
    options: ['Natural Gas', 'LPG', 'Biomass', 'Coal'],
    correctAnswer: 'Biomass',
    explanation: 'Biomass is renewable and carbon-neutral when sourced sustainably and burned efficiently.'
  },
  {
    id: 'envTechQ43',
    topic: 'environmental-technologies',
    question: 'Which insulation material is commonly used in eco-builds for its low environmental impact?',
    options: ['Rock wool', 'Glass wool', 'Sheep wool', 'Polystyrene'],
    correctAnswer: 'Sheep wool',
    explanation: 'Sheep wool is natural, breathable, and has a lower embodied carbon footprint than synthetic materials.'
  },
  {
    id: 'envTechQ44',
    topic: 'environmental-technologies',
    question: 'Which renewable system relies on a heat exchanger placed beneath the ground?',
    options: ['Solar thermal', 'Geothermal', 'Wind turbine', 'Hydro'],
    correctAnswer: 'Geothermal',
    explanation: 'Geothermal heat pumps extract heat using underground pipe loops and heat exchangers.'
  },
  {
    id: 'envTechQ45',
    topic: 'environmental-technologies',
    question: 'What does SAP stand for in UK building energy assessments?',
    options: ['Standard Area Performance', 'Solar Allocation Program', 'Standard Assessment Procedure', 'Sustainable Architecture Policy'],
    correctAnswer: 'Standard Assessment Procedure',
    explanation: 'SAP is used to measure energy performance and carbon emissions of residential buildings.'
  },
  {
    id: 'envTechQ46',
    topic: 'environmental-technologies',
    question: 'Which government incentive helped boost the installation of renewable heating systems in the UK?',
    options: ['Green Grant Scheme', 'Boiler Upgrade Scheme', 'EcoBoost Initiative', 'Energy Plus Program'],
    correctAnswer: 'Boiler Upgrade Scheme',
    explanation: 'The BUS offers grants to homeowners for renewable heating installations like heat pumps.'
  },
  {
    id: 'envTechQ47',
    topic: 'environmental-technologies',
    question: 'What is the main purpose of a buffer tank in a heat pump system?',
    options: ['Store hot water for taps', 'Reduce noise from pump', 'Prevent short cycling', 'Increase solar efficiency'],
    correctAnswer: 'Prevent short cycling',
    explanation: 'Buffer tanks maintain system stability and prevent frequent on/off cycling of the heat pump.'
  },
  {
    id: 'envTechQ48',
    topic: 'environmental-technologies',
    question: 'Which of the following is a passive environmental strategy for reducing energy use?',
    options: ['Solar PV', 'Mechanical ventilation', 'Thermal mass', 'Heat pump'],
    correctAnswer: 'Thermal mass',
    explanation: 'Thermal mass stores and slowly releases heat, helping to regulate indoor temperature naturally.'
  },
  {
    id: 'envTechQ49',
    topic: 'environmental-technologies',
    question: 'Which UK regulation requires CO₂ emission calculations for new buildings?',
    options: ['Part G', 'Part P', 'Part F', 'Part L'],
    correctAnswer: 'Part L',
    explanation: 'Part L sets energy performance standards including carbon emissions for new constructions.'
  },
  {
    id: 'envTechQ50',
    topic: 'environmental-technologies',
    question: 'Which system uses fans and ducts to distribute heated air from a central source?',
    options: ['Wet radiator heating', 'MVHR', 'Warm air heating system', 'Solar water heating'],
    correctAnswer: 'Warm air heating system',
    explanation: 'Warm air heating systems use ducts and blowers to distribute air heated by a central unit.'
  },



];

async function upload() {
  const topicDocRef = doc(db, 'questions', 'environmental-technologies');
  await setDoc(topicDocRef, { createdAt: new Date().toISOString() });

  for (const q of environmentalTechQuestions) {
    if (
      !q.id ||
      !q.topic ||
      !q.question ||
      !Array.isArray(q.options) ||
      typeof q.correctAnswer !== 'string' ||
      typeof q.explanation !== 'string'
    ) {
      console.error(`❌ Skipped: Invalid structure for question:`, q);
      continue;
    }

    try {
      const questionDocRef = doc(db, 'questions', 'environmental-technologies', 'items', q.id);
      await setDoc(questionDocRef, q);
      console.log(`✅ Uploaded question: ${q.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${q.id}:`, err);
    }
  }
}

upload();
