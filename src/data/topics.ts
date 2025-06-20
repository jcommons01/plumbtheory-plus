// This file exports all topics exactly as on your topics page, for use in the comparison table.
// You can import this in both your topics page and subscribe page for consistency.

import { Topic } from '@/components/ComparisonTable';

export const topics: Topic[] = [
  // Plumbing Level 2
  { id: 'level2-cold-water', title: 'Cold Water', icon: '💧', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Identifying mains-fed and tank-fed systems.',
    'Understanding stop valves, service valves, and water meters.',
    'Water pressure, flow rate, and system testing.',
    'Water regulations (e.g. backflow protection, contamination prevention).',
    'Installation best practices for cold water supply systems.'
  ] },
  { id: 'level2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'PPE use and site safety signage.',
    'Risk assessments and method statements.',
    'Manual handling, working at height, and COSHH.',
    'Common plumbing site hazards.',
    'Emergency procedures and fire safety.'
  ] },
  { id: 'level2-common-principles', title: 'Common Principles', icon: '🔧', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Water cycle and sources of supply.',
    'Basic fluid mechanics (pressure, head, flow).',
    'Temperature effects on water.',
    'Pipe materials and compatibility.',
    'Jointing techniques and corrosion prevention.'
  ] },
  { id: 'level2-central-heating', title: 'Central Heating', icon: '🔥', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'System types: open vent, sealed, combi boilers.',
    'Boiler components and function.',
    'Heat emitters (radiators, underfloor heating).',
    'Pump settings, balancing, and commissioning.',
    'Basic heating controls and fault identification.'
  ] },
  { id: 'level2-drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚽', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Pipe gradients, trap types, and venting.',
    'Foul water vs surface water systems.',
    'Soil stacks, inspection chambers, and gully traps.',
    'Common defects and blockages.',
    'Building Regs: Part H drainage compliance.'
  ] },
  { id: 'level2-hot-water', title: 'Hot Water', icon: '♨️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Difference between vented and unvented systems.',
    'Understanding cylinders, expansion vessels, and immersion heaters.',
    'Thermostatic controls, safety devices (e.g. TPRV).',
    'Scalding prevention and temperature regulation.',
    'G3 Building Regulation requirements.'
  ] },
  { id: 'level2-electrical', title: 'Electrical', icon: '⚡', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Safe isolation procedures.',
    'Bonding and earthing (e.g. BS 7671 requirements).',
    'Electrical testing tools and symbols.',
    'Safe distances from electrical supplies.',
    'Understanding boiler and control wiring basics.'
  ] },
  { id: 'level2-rainwater', title: 'Rainwater', icon: '🌧️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Guttering types and sizes.',
    'Calculating rainfall capacity and roof area.',
    'Downpipes, hopper heads, and drainage outlets.',
    'Maintenance and blockage prevention.',
    'Sustainability considerations (e.g. rainwater harvesting).'
  ] },
  { id: 'level2-real-life-scenarios', title: 'Real Life Scenarios', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Diagnosing low pressure and leaks.',
    'Planning safe routes for pipework.',
    'Communicating with customers.',
    'Responding to emergency callouts.',
    'Applying knowledge in realistic work-based problems.'
  ] },
  { id: 'level2-scientific-principles', title: 'Scientific Principles', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing', whatYoullLearn: [
    'Heat transfer and energy principles.',
    'Basic chemistry of water.',
    'Pressure, flow, and temperature relationships.',
    'Material science for plumbing.',
    'Practical application of scientific concepts.'
  ] },

  // Plumbing Level 3
  { id: 'cold-water', title: 'Cold Water', icon: '💧', isPro: false, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Design and installation of advanced cold water systems.',
    'Backflow prevention and water quality assurance.',
    'Troubleshooting and maintenance of large-scale cold water supplies.',
    'Compliance with water regulations and standards.',
    'System commissioning and performance testing.'
  ] },
  { id: 'drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚿', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Advanced drainage system design and installation.',
    'Sanitation standards and compliance.',
    'Inspection, testing, and maintenance of drainage systems.',
    'Problem-solving for complex drainage issues.',
    'Integration with other building services.'
  ] },
  { id: 'rainwater', title: 'Rainwater', icon: '☔', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Design and installation of rainwater harvesting systems.',
    'Sizing and selection of rainwater components.',
    'Maintenance and troubleshooting of rainwater systems.',
    'Sustainable water management practices.',
    'Regulatory compliance for rainwater systems.'
  ] },
  { id: 'environmental-technologies', title: 'Environmental Technologies', icon: '🌱', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Overview of renewable energy technologies for plumbing.',
    'Solar thermal, heat pumps, and greywater recycling.',
    'Environmental impact and sustainability.',
    'Installation and maintenance of green technologies.',
    'Regulations and incentives for environmental tech.'
  ] },
  { id: 'hot-water', title: 'Hot Water', icon: '🔥', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Advanced hot water system design and installation.',
    'Unvented and vented hot water systems.',
    'Safety devices and temperature control.',
    'Troubleshooting and maintenance.',
    'Compliance with Building Regulations G3.'
  ] },
  { id: 'central-heating', title: 'Central Heating', icon: '🔥', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Design and installation of complex heating systems.',
    'System balancing and commissioning.',
    'Controls and zoning for efficiency.',
    'Fault finding and rectification.',
    'Integration with renewable heating sources.'
  ] },
  { id: 'electrical', title: 'Electrical', icon: '⚡', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Advanced electrical safety for plumbers.',
    'Wiring and controls for plumbing systems.',
    'Testing and fault finding.',
    'Regulatory compliance (BS 7671).',
    'Integration with smart controls.'
  ] },
  { id: 'domestic-fuels', title: 'Domestic Fuels', icon: '⛽', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Types of domestic fuels and their properties.',
    'Safe storage and handling of fuels.',
    'Fuel supply systems and components.',
    'Regulations for fuel installations.',
    'Environmental considerations.'
  ] },
  { id: 'calculation-questions', title: 'Calculation Questions', icon: '🧮', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing', whatYoullLearn: [
    'Advanced plumbing calculations.',
    'Pipe sizing and flow rate calculations.',
    'Heat loss and energy calculations.',
    'Practical application of mathematical concepts.',
    'Problem-solving for real-world scenarios.'
  ] },

  // Gas Topics
  { id: 'gas-domestic-safety', title: 'Domestic Gas Safety', icon: '🏠', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Gas safety legislation and standards.',
    'Safe installation and use of gas appliances.',
    'Recognizing and responding to unsafe situations.',
    'Gas emergency procedures and reporting.',
    'Responsibilities of gas engineers.'
  ] },
  { id: 'gas-pipe-sizing', title: 'Gas Pipe Sizing', icon: '📏', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Calculating pipe sizes for various gas appliances.',
    'Understanding pressure drop and flow rates.',
    'Selecting appropriate materials and fittings.',
    'Installation best practices for gas pipework.',
    'Compliance with pipe sizing regulations.'
  ] },
  { id: 'gas-ventilation-requirements', title: 'Ventilation Requirements', icon: '🌬️', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Importance of ventilation for gas safety.',
    'Types of ventilation and their applications.',
    'Calculating ventilation requirements.',
    'Identifying inadequate ventilation risks.',
    'Regulatory requirements for ventilation.'
  ] },
  { id: 'gas-flueing-requirements', title: 'Flueing Requirements', icon: '🏭', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Principles of safe flueing for gas appliances.',
    'Types of flue systems and their installation.',
    'Testing and inspecting flue systems.',
    'Recognizing flue faults and hazards.',
    'Flueing regulations and compliance.'
  ] },
  { id: 'gas-appliance-types', title: 'Gas Appliance Types', icon: '🔥', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Overview of domestic gas appliance categories.',
    'Key features and functions of each type.',
    'Installation and commissioning requirements.',
    'Maintenance and servicing procedures.',
    'Identifying faults and unsafe appliances.'
  ] },
  { id: 'gas-tightness-purging', title: 'Tightness Testing & Purging', icon: '🧪', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Procedures for tightness testing of gas systems.',
    'Safe purging of air and gas from pipework.',
    'Use of test equipment and interpretation of results.',
    'Dealing with test failures and leaks.',
    'Documentation and regulatory requirements.'
  ] },
  { id: 'gas-combustion-analysis', title: 'Combustion Analysis', icon: '🧯', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Principles of combustion and gas burning.',
    'Use of combustion analyzers and test equipment.',
    'Interpreting combustion test results.',
    'Adjusting appliances for safe combustion.',
    'Troubleshooting combustion problems.'
  ] },
  { id: 'gas-building-regulations', title: 'Building Regulations (Part J)', icon: '🏢', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Key requirements of Building Regulations Part J.',
    'Application to gas installations and appliances.',
    'Documentation and compliance checks.',
    'Common issues and how to avoid them.',
    'Integration with other building services.'
  ] },
  { id: 'gas-unsafe-situations', title: 'Unsafe Situations', icon: '⚠️', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Identifying and classifying unsafe gas situations.',
    'Immediate actions and reporting procedures.',
    'Use of warning labels and notices.',
    'Legal responsibilities and record keeping.',
    'Case studies of real unsafe situations.'
  ] },
  { id: 'gas-emergency-procedures', title: 'Emergency Procedures', icon: '🚨', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas', whatYoullLearn: [
    'Steps to take in a gas emergency.',
    'Evacuation and isolation procedures.',
    'Communication with emergency services.',
    'Restoring safety after an incident.',
    'Reviewing and learning from emergencies.'
  ] },

  // Electrical Level 2
  { id: 'electrical-l2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Electrical safety regulations and best practices.',
    'Personal protective equipment (PPE) for electrical work.',
    'Safe isolation procedures and risk assessment.',
    'Hazard identification and accident prevention.',
    'Emergency procedures and first aid for electrical incidents.'
  ] },
  { id: 'electrical-l2-science-principles', title: 'Electrical Science & Principles', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Basic electrical theory: voltage, current, resistance.',
    'Ohm’s Law and simple circuit calculations.',
    'Series and parallel circuits.',
    'Electrical units and measurement.',
    'Practical applications of electrical science.'
  ] },
  { id: 'electrical-l2-installation-techniques', title: 'Installation Methods & Techniques', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Safe installation of electrical wiring and equipment.',
    'Correct use of hand and power tools for electrical work.',
    'Techniques for terminating and connecting cables.',
    'Mounting and fixing electrical accessories and enclosures.',
    'Testing, inspection, and commissioning of installed circuits.'
  ] },
  { id: 'electrical-l2-wiring-systems', title: 'Wiring Systems & Enclosures', icon: '📦', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Types of wiring systems and their applications.',
    'Selection and installation of enclosures.',
    'Cable routing and containment.',
    'Protection against mechanical damage.',
    'Compliance with wiring regulations.'
  ] },
  { id: 'electrical-l2-building-regs', title: 'Building Regulations (Part P)', icon: '🏠', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Overview of Part P of the Building Regulations.',
    'Requirements for electrical safety in dwellings.',
    'Notification and certification procedures.',
    'Inspection and testing for compliance.',
    'Common issues and how to avoid them.'
  ] },
  { id: 'electrical-l2-circuit-design', title: 'Basic Circuit Design', icon: '💡', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Principles of basic circuit design.',
    'Selection of protective devices.',
    'Cable sizing and load calculations.',
    'Designing for safety and efficiency.',
    'Practical circuit layout and documentation.'
  ] },
  { id: 'electrical-l2-tools-materials', title: 'Tools & Materials', icon: '🔧', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Identification and use of electrical tools.',
    'Selection of materials for installations.',
    'Safe storage and handling of tools and materials.',
    'Maintenance and care of equipment.',
    'Environmental considerations.'
  ] },
  { id: 'electrical-l2-cables-containment', title: 'Cables & Containment', icon: '🧵', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Types of cables and their uses.',
    'Cable containment systems (trunking, conduit, tray).',
    'Installation techniques for cable containment.',
    'Fire stopping and penetration sealing.',
    'Inspection and testing of cable systems.'
  ] },
  { id: 'electrical-l2-testing', title: 'Initial Verification & Testing', icon: '✅', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Procedures for initial verification of installations.',
    'Testing for continuity, insulation resistance, and polarity.',
    'Earth fault loop impedance and RCD testing.',
    'Recording and interpreting test results.',
    'Certification and documentation.'
  ] },

  // Electrical Level 3
  { id: 'electrical-l3-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Advanced electrical safety practices.',
    'Risk assessment and method statements.',
    'Safe working procedures for complex systems.',
    'Accident investigation and reporting.',
    'Legal responsibilities and compliance.'
  ] },
  { id: 'electrical-l3-design', title: 'Installation Design', icon: '🧠', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Principles of electrical installation design.',
    'Load assessment and diversity.',
    'Selection of equipment and protective devices.',
    'Cable sizing and voltage drop calculations.',
    'Design for energy efficiency and safety.'
  ] },
  { id: 'electrical-l3-science-principles', title: 'Electrical Science & Principles', icon: '📘', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Advanced electrical theory and calculations.',
    'Three-phase systems and power factor.',
    'Electromagnetic effects and applications.',
    'Testing and measurement techniques.',
    'Application of science in real installations.'
  ] },
  { id: 'electrical-l3-fault-diagnosis', title: 'Fault Diagnosis & Rectification', icon: '🔧', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Systematic fault-finding techniques.',
    'Use of test equipment for diagnosis.',
    'Rectification of faults in complex systems.',
    'Documentation and reporting of faults.',
    'Preventative maintenance strategies.'
  ] },
  { id: 'electrical-l3-inspection-testing', title: 'Inspection & Testing', icon: '✅', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Procedures for periodic inspection and testing.',
    'Testing for safety and compliance.',
    'Interpretation of test results.',
    'Certification and reporting.',
    'Remedial actions for non-compliance.'
  ] },
  { id: 'electrical-l3-bs7671', title: 'BS 7671 (18th Edition)', icon: '📖', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Key requirements of BS 7671 (18th Edition).',
    'Application of regulations to installations.',
    'Inspection and testing for compliance.',
    'Recent amendments and updates.',
    'Practical scenarios and case studies.'
  ] },
  { id: 'electrical-l3-earthing-bonding', title: 'Earthing & Bonding', icon: '🌐', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Principles of earthing and bonding.',
    'Types of earthing systems.',
    'Testing and verification of earthing.',
    'Protection against electric shock.',
    'Regulatory requirements.'
  ] },
  { id: 'electrical-l3-three-phase', title: 'Three-Phase Systems & Motors', icon: '⚙️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Operation of three-phase systems.',
    'Motor types and control methods.',
    'Testing and commissioning of motors.',
    'Fault finding in three-phase systems.',
    'Applications in industry.'
  ] },
  { id: 'electrical-l3-circuit-calcs', title: 'Circuit Design & Calculations', icon: '➗', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Advanced circuit design principles.',
    'Load and diversity calculations.',
    'Cable selection and protection.',
    'Voltage drop and earth fault calculations.',
    'Design documentation.'
  ] },
  { id: 'electrical-l3-building-regs', title: 'Building Regulations & Legal Compliance', icon: '🏠', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Legal requirements for electrical installations.',
    'Building Regulations and compliance.',
    'Certification and notification procedures.',
    'Common compliance issues.',
    'Integration with other building services.'
  ] },
  { id: 'electrical-l3-renewables', title: 'Renewables & Microgeneration', icon: '☀️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Overview of renewable energy systems.',
    'Solar PV, wind, and microgeneration technologies.',
    'Grid connection and safety.',
    'Installation and maintenance of renewables.',
    'Regulations and incentives.'
  ] },
  { id: 'electrical-l3-ev-charging', title: 'EV Charging Installations', icon: '🚗', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Types of EV charging systems.',
    'Installation requirements and safety.',
    'Testing and commissioning of EV chargers.',
    'Regulatory compliance for EV installations.',
    'Troubleshooting and maintenance.'
  ] },
  { id: 'electrical-l3-smart-tech', title: 'Smart Technology Integration', icon: '📲', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical', whatYoullLearn: [
    'Integration of smart technologies in electrical systems.',
    'Home automation and control systems.',
    'Networking and communication protocols.',
    'Installation and configuration of smart devices.',
    'Troubleshooting smart technology issues.'
  ] },

  // HVAC Level 2
  { id: 'hvac-l2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Health and safety regulations for HVAC work.',
    'Risk assessment and safe working practices.',
    'Personal protective equipment (PPE) for HVAC.',
    'Hazard identification and accident prevention.',
    'Emergency procedures and first aid.'
  ] },
  { id: 'hvac-l2-refrigeration', title: 'Basic Refrigeration Principles', icon: '❄️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Principles of refrigeration cycles.',
    'Key components of refrigeration systems.',
    'Refrigerants and their properties.',
    'Heat transfer and thermodynamics.',
    'Basic troubleshooting of refrigeration systems.'
  ] },
  { id: 'hvac-l2-ventilation', title: 'Ventilation Fundamentals', icon: '🌬️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Types of ventilation systems and their uses.',
    'Airflow principles and calculations.',
    'Indoor air quality and filtration.',
    'Installation and maintenance of ventilation systems.',
    'Regulatory requirements for ventilation.'
  ] },
  { id: 'hvac-l2-controls', title: 'Controls & Instrumentation', icon: '🎛️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Types of HVAC controls and sensors.',
    'Basic control system operation.',
    'Installation and calibration of controls.',
    'Troubleshooting control issues.',
    'Integration with building management systems.'
  ] },
  { id: 'hvac-l2-pipework', title: 'Pipework & Insulation', icon: '🧵', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Types of pipework used in HVAC systems.',
    'Pipe sizing and installation techniques.',
    'Insulation materials and methods.',
    'Preventing heat loss and condensation.',
    'Maintenance and repair of pipework.'
  ] },
  { id: 'hvac-l2-regulations', title: 'Building Regulations', icon: '🏢', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Overview of building regulations for HVAC.',
    'Key compliance requirements.',
    'Documentation and certification.',
    'Inspection and testing for compliance.',
    'Common regulatory issues.'
  ] },

  // HVAC Level 3
  { id: 'hvac-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Advanced risk assessment for HVAC projects.',
    'Safe working procedures for complex systems.',
    'Accident investigation and reporting.',
    'Legal responsibilities and compliance.',
    'Emergency planning and response.'
  ] },
  { id: 'hvac-l3-system-design', title: 'System Design & Planning', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Principles of HVAC system design.',
    'Load calculations and equipment selection.',
    'Ductwork and pipework design.',
    'Energy efficiency and sustainability.',
    'Project planning and documentation.'
  ] },
  { id: 'hvac-l3-f-gas', title: 'F-Gas Regulations', icon: '🧪', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Overview of F-Gas regulations and compliance.',
    'Handling and record-keeping for refrigerants.',
    'Leak detection and prevention.',
    'Environmental impact of F-Gases.',
    'Certification and legal responsibilities.'
  ] },
  { id: 'hvac-l3-commissioning', title: 'Commissioning & Testing', icon: '✅', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Procedures for commissioning HVAC systems.',
    'Testing for performance and safety.',
    'Balancing and adjustment of systems.',
    'Documentation and reporting.',
    'Troubleshooting during commissioning.'
  ] },
  { id: 'hvac-l3-fault-finding', title: 'Fault Diagnosis & Rectification', icon: '🔍', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Systematic fault-finding techniques for HVAC.',
    'Use of diagnostic tools and equipment.',
    'Rectification of faults in complex systems.',
    'Preventative maintenance strategies.',
    'Reporting and documentation of faults.'
  ] },
  { id: 'hvac-l3-efficiency', title: 'Energy Efficiency & Controls', icon: '⚙️', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Principles of energy efficiency in HVAC.',
    'Control strategies for energy savings.',
    'Monitoring and optimizing system performance.',
    'Integration with smart controls.',
    'Regulatory requirements for efficiency.'
  ] },
  { id: 'hvac-l3-regulations', title: 'Environmental Regulations', icon: '📜', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC', whatYoullLearn: [
    'Key environmental regulations for HVAC.',
    'Compliance and documentation.',
    'Waste management and recycling.',
    'Sustainable practices in HVAC.',
    'Legal responsibilities and penalties.'
  ] },

  // Joinery Level 2
  { id: 'joinery-l2-health-safety', title: 'Health & Safety in Construction', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Health and safety regulations for joinery work.',
    'Risk assessment and safe working practices.',
    'Use of PPE and accident prevention.',
    'Manual handling and working at height.',
    'Emergency procedures and first aid.'
  ] },
  { id: 'joinery-l2-building-construction', title: 'Building Construction Principles', icon: '🏗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Principles of building construction and structure.',
    'Materials used in joinery and construction.',
    'Reading and interpreting construction drawings.',
    'Site preparation and layout.',
    'Building regulations and compliance.'
  ] },
  { id: 'joinery-l2-communication', title: 'Communication & Documentation', icon: '📋', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Effective communication on site.',
    'Understanding and using technical documentation.',
    'Reporting and record keeping.',
    'Teamwork and collaboration.',
    'Dealing with clients and stakeholders.'
  ] },
  { id: 'joinery-l2-timber-technology', title: 'Timber Technology', icon: '🌲', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Types and properties of timber.',
    'Timber processing and preservation.',
    'Selection of timber for joinery tasks.',
    'Defects in timber and their prevention.',
    'Sustainable sourcing of timber.'
  ] },
  { id: 'joinery-l2-tools-equipment', title: 'Tools & Equipment', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Identification and use of joinery tools.',
    'Safe operation and maintenance of equipment.',
    'Selection of tools for specific tasks.',
    'Storage and care of tools.',
    'Innovations in joinery equipment.'
  ] },
  { id: 'joinery-l2-materials', title: 'Materials Knowledge', icon: '🔩', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Types of materials used in joinery.',
    'Properties and uses of metals, plastics, and composites.',
    'Material selection for durability and aesthetics.',
    'Environmental impact of materials.',
    'Handling and storage of materials.'
  ] },
  { id: 'joinery-l2-work-planning', title: 'Work Planning & Preparation', icon: '📆', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Planning joinery tasks and workflow.',
    'Preparation of work areas and materials.',
    'Time management and scheduling.',
    'Coordination with other trades.',
    'Quality assurance and checks.'
  ] },

  // Joinery Level 3
  { id: 'joinery-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Advanced risk assessment for joinery projects.',
    'Safe working procedures for complex joinery tasks.',
    'Accident investigation and reporting.',
    'Legal responsibilities and compliance.',
    'Emergency planning and response.'
  ] },
  { id: 'joinery-l3-planning', title: 'Planning & Organising Work', icon: '📋', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Advanced work planning and scheduling.',
    'Resource allocation and management.',
    'Coordination with multiple trades.',
    'Problem-solving and decision making.',
    'Documentation and reporting.'
  ] },
  { id: 'joinery-l3-building-tech', title: 'Advanced Building Technology', icon: '🏗️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Modern building technologies in joinery.',
    'Integration of new materials and methods.',
    'Sustainable construction practices.',
    'Building information modeling (BIM).',
    'Compliance with advanced building regulations.'
  ] },
  { id: 'joinery-l3-advanced-timber', title: 'Advanced Timber Technology', icon: '🌳', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Properties and uses of engineered timber.',
    'Advanced timber processing techniques.',
    'Innovations in timber construction.',
    'Sustainability in timber sourcing.',
    'Defect prevention and quality control.'
  ] },
  { id: 'joinery-l3-surveying', title: 'Site Surveying & Setting Out', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Principles of site surveying for joinery.',
    'Use of surveying instruments and tools.',
    'Setting out for complex joinery projects.',
    'Accuracy and error prevention.',
    'Survey documentation and records.'
  ] },
  { id: 'joinery-l3-joints-fixings', title: 'Complex Joints & Fixings', icon: '🔩', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Types of complex joinery joints.',
    'Selection and use of fixings and fasteners.',
    'Techniques for strong and durable joints.',
    'Quality assurance in joint construction.',
    'Innovative jointing methods.'
  ] },
  { id: 'joinery-l3-building-regs', title: 'Building Regulations & Standards', icon: '🏛️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Key building regulations for joinery.',
    'Compliance and documentation.',
    'Quality standards in joinery work.',
    'Inspection and certification.',
    'Legal responsibilities.'
  ] },
  { id: 'joinery-l3-technical-communication', title: 'Technical Communication', icon: '📑', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Effective technical communication on site.',
    'Preparation and interpretation of technical drawings.',
    'Reporting and record keeping.',
    'Collaboration with other professionals.',
    'Use of digital communication tools.'
  ] },
  { id: 'joinery-l3-sustainability', title: 'Environmental & Sustainability Awareness', icon: '🌱', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery', whatYoullLearn: [
    'Sustainable practices in joinery.',
    'Environmental impact of materials and processes.',
    'Waste management and recycling.',
    'Energy efficiency in joinery projects.',
    'Compliance with environmental regulations.'
  ] },

  // Bricklaying Level 2
  { id: 'bricklaying-l2-health-safety', title: 'Health & Safety in Construction', icon: '⚠️', isPro: false, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Health and safety regulations for bricklaying.',
    'Risk assessment and safe working practices.',
    'Use of PPE and accident prevention.',
    'Manual handling and working at height.',
    'Emergency procedures and first aid.'
  ] },
  { id: 'bricklaying-l2-building-construction', title: 'Building Construction Principles', icon: '🏗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Principles of building construction and structure.',
    'Materials used in bricklaying and construction.',
    'Reading and interpreting construction drawings.',
    'Site preparation and layout.',
    'Building regulations and compliance.'
  ] },
  { id: 'bricklaying-l2-communication', title: 'Communication & Documentation', icon: '📋', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Effective communication on site.',
    'Understanding and using technical documentation.',
    'Reporting and record keeping.',
    'Teamwork and collaboration.',
    'Dealing with clients and stakeholders.'
  ] },
  { id: 'bricklaying-l2-materials', title: 'Materials Science & Properties', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Types and properties of materials used in bricklaying.',
    'Material selection for durability and strength.',
    'Environmental impact of materials.',
    'Handling and storage of materials.',
    'Innovations in bricklaying materials.'
  ] },
  { id: 'bricklaying-l2-blockwork-cavity', title: 'Blockwork, Brickwork & Cavity Walls', icon: '🧱', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Construction of blockwork and brickwork walls.',
    'Cavity wall principles and construction.',
    'Damp-proofing and insulation techniques.',
    'Quality assurance in wall construction.',
    'Common defects and their prevention.'
  ] },
  { id: 'bricklaying-l2-setting-out', title: 'Setting Out Masonry Structures', icon: '📐', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Principles of setting out masonry structures.',
    'Use of setting out tools and equipment.',
    'Accuracy and error prevention.',
    'Coordination with other trades.',
    'Documentation and records.'
  ] },
  { id: 'bricklaying-l2-mortars', title: 'Mixing & Using Mortars', icon: '⚗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Types of mortars and their uses.',
    'Mixing techniques and quality control.',
    'Application of mortars in bricklaying.',
    'Curing and protection of mortars.',
    'Health and safety in mortar use.'
  ] },
  { id: 'bricklaying-l2-tools-equipment', title: 'Tools & Equipment', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Identification and use of bricklaying tools.',
    'Safe operation and maintenance of equipment.',
    'Selection of tools for specific tasks.',
    'Storage and care of tools.',
    'Innovations in bricklaying equipment.'
  ] },
  { id: 'bricklaying-l2-building-regs', title: 'Building Regulations & Damp-Proofing', icon: '🏠', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Key building regulations for bricklaying.',
    'Damp-proofing techniques and compliance.',
    'Inspection and certification.',
    'Quality standards in bricklaying work.',
    'Legal responsibilities.'
  ] },
  { id: 'bricklaying-l2-scaffolding', title: 'Scaffolding Safety & Access Equipment', icon: '🪜', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Scaffolding types and safe erection.',
    'Inspection and maintenance of scaffolding.',
    'Use of access equipment.',
    'Health and safety in working at height.',
    'Regulatory compliance.'
  ] },

  // Bricklaying Level 3
  { id: 'bricklaying-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Advanced risk assessment for bricklaying projects.',
    'Safe working procedures for complex masonry tasks.',
    'Accident investigation and reporting.',
    'Legal responsibilities and compliance.',
    'Emergency planning and response.'
  ] },
  { id: 'bricklaying-l3-masonry-structures', title: 'Complex Masonry Structures', icon: '🧱', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Design and construction of complex masonry structures.',
    'Selection of materials for advanced projects.',
    'Quality assurance and defect prevention.',
    'Coordination with other trades.',
    'Compliance with building regulations.'
  ] },
  { id: 'bricklaying-l3-planning', title: 'Planning & Organising Work', icon: '📋', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Advanced work planning and scheduling.',
    'Resource allocation and management.',
    'Coordination with multiple trades.',
    'Problem-solving and decision making.',
    'Documentation and reporting.'
  ] },
  { id: 'bricklaying-l3-building-tech', title: 'Advanced Building Technology', icon: '🏗️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Modern building technologies in bricklaying.',
    'Integration of new materials and methods.',
    'Sustainable construction practices.',
    'Building information modeling (BIM).',
    'Compliance with advanced building regulations.'
  ] },
  { id: 'bricklaying-l3-setting-out', title: 'Setting Out for Complex Projects', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Principles of setting out for advanced masonry.',
    'Use of advanced setting out tools and equipment.',
    'Accuracy and error prevention.',
    'Coordination with other trades.',
    'Documentation and records.'
  ] },
  { id: 'bricklaying-l3-structural-movement', title: 'Structural Movement & Control Joints', icon: '🏚️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Understanding structural movement in masonry.',
    'Design and installation of control joints.',
    'Prevention of cracking and defects.',
    'Inspection and maintenance of joints.',
    'Compliance with regulations.'
  ] },
  { id: 'bricklaying-l3-conservation', title: 'Conservation & Restoration Techniques', icon: '🏛️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Principles of conservation in bricklaying.',
    'Restoration techniques for historic masonry.',
    'Material selection for conservation.',
    'Documentation and compliance.',
    'Case studies of restoration projects.'
  ] },
  { id: 'bricklaying-l3-building-regs', title: 'Building Regulations & Compliance', icon: '📜', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Key building regulations for advanced bricklaying.',
    'Compliance and documentation.',
    'Quality standards in masonry work.',
    'Inspection and certification.',
    'Legal responsibilities.'
  ] },
  { id: 'bricklaying-l3-thermal-moisture', title: 'Thermal & Moisture Protection Systems', icon: '💧', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Principles of thermal and moisture protection.',
    'Installation of protection systems.',
    'Inspection and maintenance.',
    'Defect prevention and quality control.',
    'Compliance with regulations.'
  ] },
  { id: 'bricklaying-l3-sustainability', title: 'Sustainability & Environmental Awareness', icon: '🌱', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying', whatYoullLearn: [
    'Sustainable practices in bricklaying.',
    'Environmental impact of materials and processes.',
    'Waste management and recycling.',
    'Energy efficiency in masonry projects.',
    'Compliance with environmental regulations.'
  ] },

  // Building Regulations
  { id: 'regs-part-a', title: 'Part A – Structure', icon: '🏗️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Structural requirements for buildings.',
    'Load-bearing walls and foundations.',
    'Prevention of structural failure.',
    'Compliance with structural standards.',
    'Inspection and certification.'
  ] },
  { id: 'regs-part-b', title: 'Part B – Fire Safety', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Fire prevention and protection measures.',
    'Means of escape and evacuation routes.',
    'Fire detection and alarm systems.',
    'Fire resistance of materials and structures.',
    'Legal requirements for fire safety.'
  ] },
  { id: 'regs-part-c', title: 'Part C – Site Preparation & Moisture', icon: '🌧️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Site assessment and preparation.',
    'Prevention of moisture ingress.',
    'Damp-proofing and drainage systems.',
    'Soil contamination and remediation.',
    'Compliance with moisture control standards.'
  ] },
  { id: 'regs-part-e', title: 'Part E – Sound Insulation', icon: '🎧', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Sound insulation requirements for buildings.',
    'Design and installation of soundproofing.',
    'Testing and certification of sound insulation.',
    'Dealing with noise complaints.',
    'Legal standards for sound insulation.'
  ] },
  { id: 'regs-part-f', title: 'Part F – Ventilation', icon: '🌬️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Ventilation requirements for buildings.',
    'Types of ventilation systems.',
    'Installation and maintenance of ventilation.',
    'Indoor air quality standards.',
    'Compliance with ventilation regulations.'
  ] },
  { id: 'regs-part-g', title: 'Part G – Sanitation & Hot Water', icon: '🚿', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Sanitation and hot water supply requirements.',
    'Design and installation of sanitary systems.',
    'Water efficiency and conservation.',
    'Prevention of contamination.',
    'Legal standards for sanitation.'
  ] },
  { id: 'regs-part-h', title: 'Part H – Drainage & Waste', icon: '🚽', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Drainage and waste disposal requirements.',
    'Design and installation of drainage systems.',
    'Prevention of blockages and flooding.',
    'Inspection and maintenance of drainage.',
    'Compliance with waste regulations.'
  ] },
  { id: 'regs-part-j', title: 'Part J – Combustion Appliances', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Requirements for combustion appliances.',
    'Flueing and ventilation for appliances.',
    'Prevention of carbon monoxide poisoning.',
    'Installation and maintenance standards.',
    'Legal responsibilities for combustion safety.'
  ] },
  { id: 'regs-part-k', title: 'Part K – Protection from Falling', icon: '🧱', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Protection from falling, collision, and impact.',
    'Design of stairs, ramps, and balustrades.',
    'Safety glazing and barriers.',
    'Prevention of accidents in buildings.',
    'Compliance with safety standards.'
  ] },
  { id: 'regs-part-l', title: 'Part L – Conservation of Power', icon: '♻️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Energy efficiency requirements for buildings.',
    'Thermal insulation and air tightness.',
    'Low carbon technologies.',
    'Compliance with energy conservation standards.',
    'Certification and documentation.'
  ] },
  { id: 'regs-part-m', title: 'Part M – Access & Use', icon: '♿', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Access and use requirements for buildings.',
    'Design for disabled access.',
    'Provision of facilities for all users.',
    'Compliance with accessibility standards.',
    'Legal responsibilities for access.'
  ] },
  { id: 'regs-part-p', title: 'Part P – Electrical Safety', icon: '⚡', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Electrical safety requirements for dwellings.',
    'Design and installation of safe electrical systems.',
    'Inspection, testing, and certification.',
    'Notification procedures.',
    'Compliance with Part P regulations.'
  ] },
  { id: 'regs-part-q', title: 'Part Q – Security', icon: '🔐', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Security requirements for new dwellings.',
    'Design and installation of secure doors and windows.',
    'Prevention of unauthorized access.',
    'Testing and certification of security measures.',
    'Legal standards for building security.'
  ] },
  { id: 'regs-part-r', title: 'Part R – Communications Infrastructure', icon: '📡', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Requirements for electronic communications infrastructure.',
    'Provision of high-speed networks in buildings.',
    'Design and installation of communication systems.',
    'Testing and certification.',
    'Compliance with Part R regulations.'
  ] },
  { id: 'regs-part-s', title: 'Part S – EV Charging', icon: '🚗', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations', whatYoullLearn: [
    'Requirements for electric vehicle charging points.',
    'Design and installation of EV charging infrastructure.',
    'Safety and accessibility considerations.',
    'Compliance with Part S standards.',
    'Certification and documentation.'
  ] },

  // CSCS
  { id: 'cscs-hs-environment', title: 'Health, Safety & Environment', icon: '⚠️', isPro: false, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Core health and safety principles for construction sites.',
    'Environmental awareness and sustainability.',
    'Hazard identification and risk assessment.',
    'Safe working practices and accident prevention.',
    'Legal responsibilities and site rules.'
  ] },
  { id: 'cscs-fire-prevention', title: 'Fire Prevention & Control', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Fire hazards and prevention methods.',
    'Use of fire extinguishers and alarms.',
    'Evacuation procedures and fire drills.',
    'Legal requirements for fire safety.',
    'Reporting and responding to fire incidents.'
  ] },
  { id: 'cscs-manual-handling', title: 'Manual Handling', icon: '💪', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Safe manual handling techniques.',
    'Risk assessment for lifting and carrying.',
    'Use of mechanical aids and equipment.',
    'Prevention of musculoskeletal injuries.',
    'Legal requirements for manual handling.'
  ] },
  { id: 'cscs-hazardous-substances', title: 'Hazardous Substances (COSHH)', icon: '☣️', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Identification of hazardous substances on site.',
    'Safe storage and handling of chemicals.',
    'Use of personal protective equipment (PPE).',
    'COSHH regulations and compliance.',
    'Emergency procedures for spills and exposure.'
  ] },
  { id: 'cscs-working-height', title: 'Working at Height', icon: '🪜', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Risks associated with working at height.',
    'Use of ladders, scaffolding, and access equipment.',
    'Fall prevention and protection systems.',
    'Inspection and maintenance of equipment.',
    'Legal requirements for working at height.'
  ] },
  { id: 'cscs-ppe', title: 'Personal Protective Equipment (PPE)', icon: '🦺', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Types of PPE used in construction.',
    'Correct selection and use of PPE.',
    'Inspection and maintenance of PPE.',
    'Legal requirements for PPE.',
    'Responsibilities of employers and employees.'
  ] },
  { id: 'cscs-signage', title: 'Safety Signs & Symbols', icon: '🚧', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Types and meanings of safety signs.',
    'Use of symbols and color codes.',
    'Placement and visibility of signs.',
    'Legal requirements for signage.',
    'Responding to safety signs on site.'
  ] },
  { id: 'cscs-first-aid', title: 'First Aid & Emergency Procedures', icon: '🚑', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Basic first aid procedures for construction sites.',
    'Dealing with common injuries and emergencies.',
    'Reporting and recording incidents.',
    'Location and use of first aid equipment.',
    'Legal requirements for first aid provision.'
  ] },
  { id: 'cscs-environmental-awareness', title: 'Environmental Awareness', icon: '🌱', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Environmental risks and impacts of construction.',
    'Waste management and recycling.',
    'Pollution prevention and control.',
    'Sustainable construction practices.',
    'Legal requirements for environmental protection.'
  ] },
  { id: 'cscs-behaviour', title: 'Behavioural Case Studies', icon: '🧠', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS', whatYoullLearn: [
    'Understanding safe and unsafe behaviours.',
    'Case studies of real site incidents.',
    'Promoting a positive safety culture.',
    'Reporting and challenging unsafe behaviour.',
    'Learning from behavioural examples.'
  ] },
];
