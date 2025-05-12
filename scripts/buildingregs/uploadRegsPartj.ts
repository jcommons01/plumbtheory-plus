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

// ✅ Building Regulations Part J - Combustion Appliances Questions
const questions = [
  {
    id: 'regs-part-j-1',
    question: "What are the main areas covered by Approved Document J?",
    options: ["Only flue design and chimney construction", "Only fire safety for boilers and stoves", "Air supply, discharge of combustion products, and protection from heat", "Only servicing requirements for gas appliances"],
    correctAnswer: "Air supply, discharge of combustion products, and protection from heat",
    explanation: "Approved Document J covers three main areas: air supply for combustion appliances, discharge of combustion products (flues and chimneys), and protection of the building from heat produced by appliances. It provides guidance for safe installation of boilers, stoves, fireplaces, and other heat-producing appliances that burn fuel. The document ensures sufficient air is provided for proper combustion, that combustion products are safely removed from the building, and that the heat from appliances doesn't cause fire risks to surrounding building elements."
  },
  {
    id: 'regs-part-j-2',
    question: "What type of carbon monoxide alarm is required for a new solid fuel appliance installation?",
    options: ["Mains-powered with battery backup", "Battery-powered only", "Interconnected with smoke alarms", "Carbon monoxide alarms are not required"],
    correctAnswer: "Mains-powered with battery backup",
    explanation: "Approved Document J requires that when a new solid fuel appliance (such as a wood-burning stove) is installed, a carbon monoxide alarm must be provided, and it should be mains-powered with battery backup. This requirement helps protect occupants from the serious health risks posed by carbon monoxide, which is colorless, odorless, and potentially fatal. The alarm should be permanently installed, located in the same room as the appliance, positioned in accordance with manufacturer's instructions, and comply with BS EN 50291."
  },
  {
    id: 'regs-part-j-3',
    question: "What is the main purpose of providing permanent ventilation for a room containing an open-flued combustion appliance?",
    options: ["To keep the room cool", "To provide sufficient air for proper combustion and prevent the spillage of combustion products", "To reduce humidity in the room", "To comply with fire escape requirements"],
    correctAnswer: "To provide sufficient air for proper combustion and prevent the spillage of combustion products",
    explanation: "The main purpose of providing permanent ventilation for a room containing an open-flued combustion appliance is to provide sufficient air for proper combustion and prevent the spillage of combustion products. Open-flued appliances draw combustion air from the room, so adequate ventilation is essential for safe operation. Without sufficient ventilation, incomplete combustion can occur, potentially producing carbon monoxide, and negative pressure can cause combustion products to spill back into the room rather than going up the flue. The required ventilation area depends on the appliance type and rated output."
  },
  {
    id: 'regs-part-j-4',
    question: "According to Approved Document J, what is the minimum height for a flue outlet position above a flat roof where people have access?",
    options: ["1.0 meter", "1.8 meters", "2.3 meters", "3.0 meters"],
    correctAnswer: "2.3 meters",
    explanation: "According to Approved Document J, the minimum height for a flue outlet position above a flat roof where people have access is 2.3 meters. This height requirement helps ensure that people on the roof aren't exposed to harmful combustion products and helps prevent contact with hot surfaces. For pitched roofs (not used by people except for maintenance), lower heights may be acceptable depending on the position relative to the ridge. These flue termination positions are designed to ensure the safe dispersal of combustion products away from building openings and areas where people might be present."
  },
  {
    id: 'regs-part-j-5',
    question: "What is the requirement for a hearth under a solid fuel appliance like a wood-burning stove?",
    options: ["Only required if the floor is combustible", "Must project at least 500mm from the front of the appliance and be made of non-combustible material", "Must be at least 50mm thick concrete", "Only decorative hearths are required for modern stoves"],
    correctAnswer: "Must project at least 500mm from the front of the appliance and be made of non-combustible material",
    explanation: "Approved Document J requires a hearth under a solid fuel appliance to project at least 500mm from the front of the appliance and be made of non-combustible material. The hearth must also extend at least 150mm to each side of the appliance (or to a wall if closer). The purpose is to protect combustible floor materials from heat and hot embers. The hearth typically needs to be at least 125mm thick (including at least 25mm of non-combustible material) if built on a combustible floor. These requirements ensure that the high temperatures associated with solid fuel appliances don't create fire risks."
  },
  {
    id: 'regs-part-j-6',
    question: "What is a 'balanced flue' appliance as referenced in Approved Document J?",
    options: ["An appliance where the flue is balanced on the roof to prevent wind damage", "An appliance that balances the use of different fuel types", "An appliance where combustion air intake and combustion products outlet are in close proximity and both communicate with the external air", "An appliance with two separate flues to balance the draft"],
    correctAnswer: "An appliance where combustion air intake and combustion products outlet are in close proximity and both communicate with the external air",
    explanation: "A balanced flue appliance is one where the combustion air intake and combustion products outlet are in close proximity and both communicate with the external air. This design, often implemented as concentric pipes (one pipe inside another), draws combustion air directly from outside and vents combustion products directly outside, without using room air for combustion. Balanced flue appliances typically require no additional room ventilation because they're effectively sealed from the room air. They're commonly found in modern gas boilers and fires, providing energy efficiency and reducing draft problems."
  },
  {
    id: 'regs-part-j-7',
    question: "What is the purpose of a 'flue liner' in a chimney?",
    options: ["Purely decorative element", "To provide a smooth surface for easier cleaning", "To contain combustion products and protect the chimney structure", "To increase the draft in the chimney"],
    correctAnswer: "To contain combustion products and protect the chimney structure",
    explanation: "The purpose of a flue liner in a chimney is to contain combustion products and protect the chimney structure. Liners provide a smooth, continuous inner surface that resists the corrosive effects of combustion products and prevents them from penetrating the chimney structure, which could cause heat damage or allow harmful gases to escape into the building. Liners also help maintain correct flue sizing for efficient operation and reduce cooling of combustion products (which helps prevent condensation). Materials for liners vary depending on the fuel being burned, with options including clay/ceramic, concrete, metal, and flexible liners for relining existing chimneys."
  },
  {
    id: 'regs-part-j-8',
    question: "According to Approved Document J, what is the recommended minimum distance between a hearth and any combustible material?",
    options: ["25mm", "150mm", "500mm", "There is no minimum if fire-resistant board is used"],
    correctAnswer: "150mm",
    explanation: "According to Approved Document J, the recommended minimum distance between a hearth and any combustible material is 150mm. This applies to combustible materials placed beneath or around the edges of the hearth. For example, if a hearth sits on a combustible floor, the combustible material should be at least 150mm below the top surface of the hearth. Alternatively, a layer of non-combustible material at least 250mm thick can separate the hearth from combustible material. These precautions prevent the heat transferred through the hearth from igniting nearby combustible materials."
  },
  {
    id: 'regs-part-j-9',
    question: "What is a 'flue restrictor' and when might it be required?",
    options: ["A device to prevent birds entering the flue", "A device to reduce the flue diameter to increase efficiency for some heating appliances", "A cap to prevent rain entering when the appliance is not in use", "A filter to reduce pollutants from the appliance"],
    correctAnswer: "A device to reduce the flue diameter to increase efficiency for some heating appliances",
    explanation: "A flue restrictor is a device to reduce the flue diameter to increase efficiency for some heating appliances. It's sometimes required when a flue is larger than the optimum size for a particular appliance. Without a restrictor, an oversized flue can cause excessive draft, making the appliance burn too quickly and reducing efficiency. Restrictors must be carefully sized according to manufacturer's instructions and should be fixed in position to prevent them becoming dislodged and potentially blocking the flue, which could be dangerous. They're most commonly used with gas fires installed in existing chimneys designed for larger solid fuel appliances."
  },
  {
    id: 'regs-part-j-10',
    question: "What is the minimum distance recommended between a combustion appliance and combustible materials for a typical domestic solid fuel stove?",
    options: ["No minimum distance is specified", "100mm", "At least as specified by the appliance manufacturer", "At least 1 meter in all cases"],
    correctAnswer: "At least as specified by the appliance manufacturer",
    explanation: "For a typical domestic solid fuel stove, the minimum distance between the appliance and combustible materials should be at least as specified by the appliance manufacturer. Approved Document J recognizes that different appliances have different external temperature characteristics and heat outputs, so the safe distance can vary significantly. Manufacturer's instructions take precedence as they've tested their specific appliance. If no manufacturer's guidance is available, the document provides default minimum distances based on appliance type and whether heat shields are used. This approach ensures appropriate fire safety for each specific installation."
  },
  {
    id: 'regs-part-j-11',
    question: "What does Approved Document J specify regarding carbon monoxide alarms in a room with a gas fire?",
    options: ["They are required for all gas fires", "They are only required for flueless gas fires", "They are required for all new or replacement fixed solid fuel appliances", "Carbon monoxide alarms are optional for all gas appliances"],
    correctAnswer: "They are required for all new or replacement fixed solid fuel appliances",
    explanation: "Approved Document J specifies that carbon monoxide alarms are required for all new or replacement fixed solid fuel appliances. At the time of the 2010 edition with 2013 amendments, there was no specific requirement in Part J for carbon monoxide alarms with gas fires (though this has changed with subsequent building regulations updates). The document has historically focused the CO alarm requirement on solid fuel appliances because they present a higher risk of carbon monoxide production than properly maintained gas appliances. However, current best practice and updated regulations now often recommend CO alarms for all fuel-burning appliances."
  },
  {
    id: 'regs-part-j-12',
    question: "According to Approved Document J, what should be the minimum flue size for a gas fire with a rated input not exceeding 7kW?",
    options: ["125mm diameter or equivalent", "90mm diameter or equivalent", "150mm diameter or equivalent", "As specified by the appliance manufacturer"],
    correctAnswer: "90mm diameter or equivalent",
    explanation: "According to Approved Document J, the minimum flue size for a gas fire with a rated input not exceeding 7kW should be 90mm diameter or equivalent. This smaller flue size (compared to solid fuel appliances) is appropriate because gas burns more cleanly, producing less soot and particulates that could accumulate in the flue. The document provides tables of minimum flue sizes for different appliance types and outputs. For gas fires with higher outputs or other gas appliances like boilers, larger flue sizes may be required. As always, manufacturer's specific instructions should be followed if they specify larger dimensions."
  },
  {
    id: 'regs-part-j-13',
    question: "What is the primary purpose of a 'spillage test' for a gas appliance?",
    options: ["To check for gas leaks around the appliance", "To ensure that combustion products are safely removed by the flue and do not spill back into the room", "To verify the efficiency rating of the appliance", "To test if the gas supply pressure is correct"],
    correctAnswer: "To ensure that combustion products are safely removed by the flue and do not spill back into the room",
    explanation: "The primary purpose of a spillage test for a gas appliance is to ensure that combustion products are safely removed by the flue and do not spill back into the room. This test, performed with smoke matches or electronic analyzers, checks whether negative pressure conditions (caused by factors like extract fans, wind conditions, or blocked flues) might cause combustion gases to enter the living space rather than exit through the flue. Approved Document J references these tests particularly when mechanical extract ventilation is installed in a room with an open-flued appliance, as the extract fan could potentially overcome the flue draft."
  },
  {
    id: 'regs-part-j-14',
    question: "What is a 'flue box' as referred to in Approved Document J?",
    options: ["A decorative cover that hides the flue pipe", "A prefabricated factory-made chimney receiver for gas appliances", "A clean-out access point for the flue", "A heat-resistant storage container for fuel"],
    correctAnswer: "A prefabricated factory-made chimney receiver for gas appliances",
    explanation: "A flue box, as referred to in Approved Document J, is a prefabricated factory-made chimney receiver for gas appliances. It's typically used for gas fires being installed into existing fireplaces, providing a ready-made gathering space that collects combustion products from the appliance and channels them into the flue pipe or chimney above. Flue boxes must be installed in accordance with manufacturer's instructions and may incorporate features like debris collection spaces, flue restrictors, and connections for both the appliance and the chimney. They simplify installation and help ensure correct flue function."
  },
  {
    id: 'regs-part-j-15',
    question: "What is the required free air ventilation area for a room containing an open-flued solid fuel appliance with a rated output of 5kW?",
    options: ["No permanent ventilation is required", "550mm²", "5500mm²", "50cm²"],
    correctAnswer: "5500mm²",
    explanation: "For a room containing an open-flued solid fuel appliance with a rated output of 5kW, Approved Document J requires a permanent free air ventilation area of 5500mm². This is calculated using the formula of 550mm² per kW of appliance rated output above 5kW, plus a fixed 5500mm². Since this example is exactly 5kW, no additional ventilation beyond the base 5500mm² is needed. This ventilation ensures sufficient oxygen for proper combustion and helps prevent carbon monoxide production due to oxygen-starved burning. The ventilation must be permanent and non-adjustable, typically provided through air bricks or purpose-designed ventilators."
  },
  {
    id: 'regs-part-j-16',
    question: "What is the minimum height requirement for a flue serving a gas appliance?",
    options: ["0.6 meters above any roof within 2.3 meters", "1.0 meter above any roof junction within 2.5 meters", "4.5 meters from the ground regardless of roof height", "At least 3 meters in total flue height"],
    correctAnswer: "0.6 meters above any roof within 2.3 meters",
    explanation: "The minimum height requirement for a flue serving a gas appliance is typically 0.6 meters above any roof within 2.3 meters horizontally from the flue. This height requirement helps ensure that combustion gases are discharged safely away from the building and that wind pressure zones around roof features don't cause down-drafting or affect appliance performance. Approved Document J provides detailed diagrams showing various termination positions depending on roof configuration, nearby structures, and openings. Different requirements may apply to different appliance types and locations."
  },
  {
    id: 'regs-part-j-17',
    question: "What does Approved Document J specify about carbon monoxide alarms for solid fuel appliances?",
    options: ["They must be located on the ceiling in the room containing the appliance", "They should be located at high level on a wall in the same room as the appliance", "They should be mounted outside the room containing the appliance", "They must be interconnected with smoke alarms"],
    correctAnswer: "They should be located at high level on a wall in the same room as the appliance",
    explanation: "Approved Document J specifies that carbon monoxide alarms for solid fuel appliances should be located at high level on a wall in the same room as the appliance. The recommended position is between 1-3 meters horizontally from the appliance, and preferably at head height and away from windows, doors, or air vents. This positioning ensures the alarm can detect any carbon monoxide that might be produced while remaining clear of the direct influence of normal combustion products. The document requires these alarms to comply with BS EN 50291 and to be permanently installed (not battery-only for new installations)."
  },
  {
    id: 'regs-part-j-18',
    question: "What is the recommended inspection schedule for chimneys serving solid fuel appliances according to Approved Document J?",
    options: ["Annual inspection", "Once every two years", "Monthly inspection", "Only when problems are suspected"],
    correctAnswer: "Annual inspection",
    explanation: "Approved Document J recommends annual inspection for chimneys serving solid fuel appliances. Regular sweeping and inspection is essential because solid fuel combustion produces soot and tar deposits that can accumulate in the flue, potentially leading to chimney fires or blockages that could cause carbon monoxide to enter the building. The frequency may need to be increased depending on the type of fuel used, the appliance design, and usage patterns. While not a direct regulatory requirement, this maintenance recommendation is included to support continued safe operation of the installation."
  },
  {
    id: 'regs-part-j-19',
    question: "What does Approved Document J require regarding the maintenance of a hearth for a solid fuel appliance?",
    options: ["It must be swept clean daily", "No specific maintenance is required once installed", "It must be lined with heat-resistant paint annually", "It must be kept clear of combustible materials"],
    correctAnswer: "It must be kept clear of combustible materials",
    explanation: "Approved Document J requires that a hearth for a solid fuel appliance must be kept clear of combustible materials. This ongoing requirement ensures the fire safety of the installation is maintained throughout its use. Combustible items like rugs, papers, or furniture placed too close to the appliance or on the hearth could be ignited by radiant heat, sparks, or embers. While the document doesn't specify detailed maintenance regimes for hearths, this basic safety requirement is emphasized. Hearths should be constructed of non-combustible materials and remain free of combustible items during appliance operation."
  },
  {
    id: 'regs-part-j-20',
    question: "What does Approved Document J recommend regarding the installation of a decorative fuel effect (DFE) gas fire in a bedroom?",
    options: ["They should never be installed in bedrooms", "They must be room-sealed (balanced flue) appliances", "They must be fitted with a 100% shut-off valve", "They can only be installed if the bedroom is larger than 30m³"],
    correctAnswer: "They must be room-sealed (balanced flue) appliances",
    explanation: "Approved Document J recommends that decorative fuel effect (DFE) gas fires installed in bedrooms must be room-sealed (balanced flue) appliances. This requirement exists because occupants may be asleep and less aware of potential problems with open-flued appliances, which draw air from the room. Room-sealed appliances are safer in bedrooms because they take combustion air directly from outside and vent combustion products directly outside, with no interaction with the room air. This significantly reduces the risk of carbon monoxide entering the sleeping area if something goes wrong with the appliance or its ventilation."
  },
  {
    id: 'regs-part-j-21',
    question: "What does Approved Document J specify about the permitted materials for a flue serving a solid fuel appliance?",
    options: ["Only factory-made insulated chimneys with specific designations", "Any non-combustible material is acceptable", "Only traditional clay liners in masonry chimneys", "Only stainless steel flue liners may be used"],
    correctAnswer: "Only factory-made insulated chimneys with specific designations",
    explanation: "Approved Document J specifies that flues serving solid fuel appliances should be constructed from factory-made insulated chimneys with specific designations appropriate for the fuel being used. For solid fuel, these must be designated with the prefix 'T' followed by the operating temperature (e.g., T450 for most domestic solid fuel applications). The chimney must also be designated 'G' for resistance to chimney fires. Other designations indicate soot fire resistance, corrosion resistance, and distance to combustibles. These requirements ensure the flue can withstand the high temperatures and corrosive compounds produced by solid fuel combustion."
  },
  {
    id: 'regs-part-j-22',
    question: "What is the purpose of an 'explosion relief panel' in the construction of a masonry chimney?",
    options: ["To prevent the chimney exploding in high winds", "To allow for easy access for chimney sweeping", "To provide a deliberately weaker section that would safely fail in the event of a chimney fire or explosion", "To equalize pressure differences in the chimney"],
    correctAnswer: "To provide a deliberately weaker section that would safely fail in the event of a chimney fire or explosion",
    explanation: "An explosion relief panel provides a deliberately weaker section of a masonry chimney that would safely fail in the event of a chimney fire or explosion. These panels are typically located in the smallest face of the chimney breast, away from where people would normally be, and are designed to blow outward rather than allowing more significant structural damage to the chimney or building. The panel should be of suitable construction to minimize the risk of injury from flying debris. While modern chimney design and regular maintenance reduce explosion risks, these safety features provide an important failsafe mechanism."
  },
  {
    id: 'regs-part-j-23',
    question: "According to Approved Document J, what should be done with an existing fireplace opening that is no longer in use?",
    options: ["It must be filled in completely with solid material", "It should be fitted with a permanent ventilator with at least 10,000mm² free area", "It can be left open if a prominent sign warning against its use is displayed", "It must have the chimney removed entirely above roof level"],
    correctAnswer: "It should be fitted with a permanent ventilator with at least 10,000mm² free area",
    explanation: "According to Approved Document J, an existing fireplace opening that is no longer in use should be fitted with a permanent ventilator with at least 10,000mm² free area. This ventilation prevents the buildup of damp in the chimney and allows some air movement to help prevent condensation problems. The ventilator could be incorporated into a register plate or blocking-off plate used to seal the opening. If the chimney is permanently decommissioned, the flue should also be vented at the top. This approach preserves the chimney structure while making it safe when not in use for a combustion appliance."
  },
  {
    id: 'regs-part-j-24',
    question: "What does Approved Document J require regarding the provision of inspection hatches for concealed flues?",
    options: ["Inspection hatches are not required for concealed flues", "At least one inspection hatch must be provided for each concealed flue", "Inspection hatches are only required for flues serving solid fuel appliances", "Inspection hatches must be provided at each change of direction and at maximum intervals of 1.5m"],
    correctAnswer: "Inspection hatches must be provided at each change of direction and at maximum intervals of 1.5m",
    explanation: "Approved Document J requires that for concealed flues (those running within voids, behind dry lining, or within boxing), inspection hatches must be provided at each change of direction and at maximum intervals of 1.5m. These hatches enable the flue to be visually inspected to check for damage or blockages during installation and future maintenance. They should be at least 300mm × 300mm or equivalent in size to allow meaningful inspection and should not compromise any fire resistance requirements of the surrounding construction. This requirement helps ensure that hidden flues remain safe throughout their service life."
  },
  {
    id: 'regs-part-j-25',
    question: "What is the requirement for hearths beneath a freestanding solid fuel stove according to Approved Document J?",
    options: ["A constructional hearth at least 125mm thick", "A hearth of any thickness made of non-combustible material", "A 12mm thick hearth is sufficient if the appliance has legs raising it 100mm or more", "The appliance manufacturer's instructions always take precedence over Building Regulations"],
    correctAnswer: "A constructional hearth at least 125mm thick",
    explanation: "Approved Document J requires a constructional hearth at least 125mm thick beneath a freestanding solid fuel stove. This typically comprises a 25mm non-combustible top surface and 100mm of concrete or other suitable non-combustible material. The hearth must extend at least 150mm to the sides and rear of the appliance and at least 500mm to the front (the superimposed hearth). This substantial construction protects the building from the high temperatures and potential ember spillage associated with solid fuel appliances. Any combustible material must be at least 150mm below the top surface of the hearth to prevent ignition through heat conduction."
  }
];

// ✅ Upload function
async function uploadQuestions() {
  for (const q of questions) {
    try {
      await setDoc(doc(db, 'questions', 'regs-part-j', 'items', q.id), {
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
