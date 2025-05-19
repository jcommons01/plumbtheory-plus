import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { useAuth } from '@/contexts/AuthProvider';
import UpgradeModal from '../components/UpgradeModal';

interface Topic {
  id: string;
  title: string;
  icon: string;
  isPro: boolean;
  level: number;
  totalQuestions: number;
  trade?: string;
}

const TRADE_LEVELS = [
  { name: 'Plumbing', levels: [2, 3], color: 'bg-[#3B82F6]' },         // Blue (cold)
  { name: 'Gas', levels: [], color: 'bg-[#0EA5E9]' },                  // Sky blue
  { name: 'Electrical', levels: [2, 3], color: 'bg-[#06B6D4]' },       // Aqua
  { name: 'HVAC', levels: [2, 3], color: 'bg-[#F97316]' },             // Orange
  { name: 'Joinery', levels: [2, 3], color: 'bg-[#FB923C]' },          // Light orange
  { name: 'Bricklaying', levels: [2, 3], color: 'bg-[#EF4444]' },      // Red
  { name: 'Building Regulations', levels: [], color: 'bg-[#DC2626]' },// Deep red
  { name: 'CSCS', levels: [], color: 'bg-[#991B1B]' },                 // Dark red (hottest)
];




export default function Topics() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedTrade, setSelectedTrade] = useState('Plumbing');
  useEffect(() => {
  const savedTrade = localStorage.getItem('lastSelectedTrade');
  if (savedTrade) {
    setSelectedTrade(savedTrade);
  }
}, []);

useEffect(() => {
  localStorage.setItem('lastSelectedTrade', selectedTrade);
}, [selectedTrade]);

  const [selectedLevel, setSelectedLevel] = useState<number>(2);
  // Persist selected level per session
useEffect(() => {
  const savedLevel = localStorage.getItem('lastSelectedLevel');
  if (savedLevel) {
    setSelectedLevel(Number(savedLevel));
  }
}, []);

useEffect(() => {
  localStorage.setItem('lastSelectedLevel', selectedLevel.toString());
}, [selectedLevel]);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    const level2JoineryTopics: Topic[] = [
      { id: 'joinery-l2-health-safety', title: 'Health & Safety in Construction', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-building-construction', title: 'Building Construction Principles', icon: '🏗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-communication', title: 'Communication & Documentation', icon: '📋', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-timber-technology', title: 'Timber Technology', icon: '🌲', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-tools-equipment', title: 'Tools & Equipment', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-materials', title: 'Materials Knowledge', icon: '🔩', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l2-work-planning', title: 'Work Planning & Preparation', icon: '📆', isPro: true, level: 2, totalQuestions: 25, trade: 'Joinery' },
    ];
  
    const level3JoineryTopics: Topic[] = [
      { id: 'joinery-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-planning', title: 'Planning & Organising Work', icon: '📋', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-building-tech', title: 'Advanced Building Technology', icon: '🏗️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-advanced-timber', title: 'Advanced Timber Technology', icon: '🌳', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-surveying', title: 'Site Surveying & Setting Out', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-joints-fixings', title: 'Complex Joints & Fixings', icon: '🔩', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-building-regs', title: 'Building Regulations & Standards', icon: '🏛️', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-technical-communication', title: 'Technical Communication', icon: '📑', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
      { id: 'joinery-l3-sustainability', title: 'Environmental & Sustainability Awareness', icon: '🌱', isPro: true, level: 3, totalQuestions: 25, trade: 'Joinery' },
    ];
  
    const level2BricklayingTopics: Topic[] = [
      { id: 'bricklaying-l2-health-safety', title: 'Health & Safety in Construction', icon: '⚠️', isPro: false, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-building-construction', title: 'Building Construction Principles', icon: '🏗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-communication', title: 'Communication & Documentation', icon: '📋', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-materials', title: 'Materials Science & Properties', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-blockwork-cavity', title: 'Blockwork, Brickwork & Cavity Walls', icon: '🧱', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-setting-out', title: 'Setting Out Masonry Structures', icon: '📐', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-mortars', title: 'Mixing & Using Mortars', icon: '⚗️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-tools-equipment', title: 'Tools & Equipment', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-building-regs', title: 'Building Regulations & Damp-Proofing', icon: '🏠', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l2-scaffolding', title: 'Scaffolding Safety & Access Equipment', icon: '🪜', isPro: true, level: 2, totalQuestions: 25, trade: 'Bricklaying' },
    ];

    const level3BricklayingTopics: Topic[] = [
      { id: 'bricklaying-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-masonry-structures', title: 'Complex Masonry Structures', icon: '🧱', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-planning', title: 'Planning & Organising Work', icon: '📋', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-building-tech', title: 'Advanced Building Technology', icon: '🏗️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-setting-out', title: 'Setting Out for Complex Projects', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-structural-movement', title: 'Structural Movement & Control Joints', icon: '🏚️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-conservation', title: 'Conservation & Restoration Techniques', icon: '🏛️', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-building-regs', title: 'Building Regulations & Compliance', icon: '📜', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-thermal-moisture', title: 'Thermal & Moisture Protection Systems', icon: '💧', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
      { id: 'bricklaying-l3-sustainability', title: 'Sustainability & Environmental Awareness', icon: '🌱', isPro: true, level: 3, totalQuestions: 25, trade: 'Bricklaying' },
    ];

    const buildingRegsTopics: Topic[] = [
      { id: 'regs-part-a', title: 'Part A – Structure', icon: '🏗️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-b', title: 'Part B – Fire Safety', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-c', title: 'Part C – Site Preparation & Moisture', icon: '🌧️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-e', title: 'Part E – Sound Insulation', icon: '🎧', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-f', title: 'Part F – Ventilation', icon: '🌬️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-g', title: 'Part G – Sanitation & Hot Water', icon: '🚿', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-h', title: 'Part H – Drainage & Waste', icon: '🚽', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-j', title: 'Part J – Combustion Appliances', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-k', title: 'Part K – Protection from Falling', icon: '🧱', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-l', title: 'Part L – Conservation of Power', icon: '♻️', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-m', title: 'Part M – Access & Use', icon: '♿', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-p', title: 'Part P – Electrical Safety', icon: '⚡', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-q', title: 'Part Q – Security', icon: '🔐', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-r', title: 'Part R – Communications Infrastructure', icon: '📡', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
      { id: 'regs-part-s', title: 'Part S – EV Charging', icon: '🚗', isPro: true, level: 0, totalQuestions: 25, trade: 'Building Regulations' },
    ];
    
    const level2ElectricalTopics: Topic[] = [
      { id: 'electrical-l2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-science-principles', title: 'Electrical Science & Principles', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-installation-techniques', title: 'Installation Methods & Techniques', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-wiring-systems', title: 'Wiring Systems & Enclosures', icon: '📦', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-building-regs', title: 'Building Regulations (Part P)', icon: '🏠', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-circuit-design', title: 'Basic Circuit Design', icon: '💡', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-tools-materials', title: 'Tools & Materials', icon: '🔧', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-cables-containment', title: 'Cables & Containment', icon: '🧵', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l2-testing', title: 'Initial Verification & Testing', icon: '✅', isPro: true, level: 2, totalQuestions: 25, trade: 'Electrical' },
    ];
  
    const level3ElectricalTopics: Topic[] = [
      { id: 'electrical-l3-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-design', title: 'Installation Design', icon: '🧠', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-science-principles', title: 'Electrical Science & Principles', icon: '📘', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-fault-diagnosis', title: 'Fault Diagnosis & Rectification', icon: '🔧', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-inspection-testing', title: 'Inspection & Testing', icon: '✅', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-bs7671', title: 'BS 7671 (18th Edition)', icon: '📖', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-earthing-bonding', title: 'Earthing & Bonding', icon: '🌐', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-three-phase', title: 'Three-Phase Systems & Motors', icon: '⚙️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-circuit-calcs', title: 'Circuit Design & Calculations', icon: '➗', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-building-regs', title: 'Building Regulations & Legal Compliance', icon: '🏠', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-renewables', title: 'Renewables & Microgeneration', icon: '☀️', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-ev-charging', title: 'EV Charging Installations', icon: '🚗', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
      { id: 'electrical-l3-smart-tech', title: 'Smart Technology Integration', icon: '📲', isPro: true, level: 3, totalQuestions: 25, trade: 'Electrical' },
    ];
  
    const level2HVACTopics: Topic[] = [
      { id: 'hvac-l2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l2-refrigeration', title: 'Basic Refrigeration Principles', icon: '❄️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l2-ventilation', title: 'Ventilation Fundamentals', icon: '🌬️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l2-controls', title: 'Controls & Instrumentation', icon: '🎛️', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l2-pipework', title: 'Pipework & Insulation', icon: '🧵', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l2-regulations', title: 'Building Regulations', icon: '🏢', isPro: true, level: 2, totalQuestions: 25, trade: 'HVAC' },
    ];
  
    const level3HVACTopics: Topic[] = [
      { id: 'hvac-l3-health-safety', title: 'Advanced Health & Safety', icon: '⚠️', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-system-design', title: 'System Design & Planning', icon: '📐', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-f-gas', title: 'F-Gas Regulations', icon: '🧪', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-commissioning', title: 'Commissioning & Testing', icon: '✅', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-fault-finding', title: 'Fault Diagnosis & Rectification', icon: '🔍', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-efficiency', title: 'Energy Efficiency & Controls', icon: '⚙️', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
      { id: 'hvac-l3-regulations', title: 'Environmental Regulations', icon: '📜', isPro: true, level: 3, totalQuestions: 25, trade: 'HVAC' },
    ];
    
    const cscsTopics: Topic[] = [
      { id: 'cscs-hs-environment', title: 'Health, Safety & Environment', icon: '⚠️', isPro: false, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-fire-prevention', title: 'Fire Prevention & Control', icon: '🔥', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-manual-handling', title: 'Manual Handling', icon: '💪', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-hazardous-substances', title: 'Hazardous Substances (COSHH)', icon: '☣️', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-working-height', title: 'Working at Height', icon: '🪜', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-ppe', title: 'Personal Protective Equipment (PPE)', icon: '🦺', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-signage', title: 'Safety Signs & Symbols', icon: '🚧', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-first-aid', title: 'First Aid & Emergency Procedures', icon: '🚑', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-environmental-awareness', title: 'Environmental Awareness', icon: '🌱', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
      { id: 'cscs-behaviour', title: 'Behavioural Case Studies', icon: '🧠', isPro: true, level: 0, totalQuestions: 25, trade: 'CSCS' },
    ];
    
    const gasTopics: Topic[] = [
      { id: 'gas-domestic-safety', title: 'Domestic Gas Safety', icon: '🏠', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-pipe-sizing', title: 'Gas Pipe Sizing', icon: '📏', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-ventilation-requirements', title: 'Ventilation Requirements', icon: '🌬️', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-flueing-requirements', title: 'Flueing Requirements', icon: '🏭', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-appliance-types', title: 'Gas Appliance Types', icon: '🔥', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-tightness-purging', title: 'Tightness Testing & Purging', icon: '🧪', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-combustion-analysis', title: 'Combustion Analysis', icon: '🧯', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-building-regulations', title: 'Building Regulations (Part J)', icon: '🏢', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-unsafe-situations', title: 'Unsafe Situations', icon: '⚠️', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
      { id: 'gas-emergency-procedures', title: 'Emergency Procedures', icon: '🚨', isPro: true, level: 99, totalQuestions: 25, trade: 'Gas' },
    ];
  
    const plumbingTopics: Topic[] = [
      // Plumbing Level 2
      { id: 'level2-cold-water', title: 'Cold Water', icon: '💧', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-health-safety', title: 'Health & Safety', icon: '⚠️', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-common-principles', title: 'Common Principles', icon: '🔧', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-central-heating', title: 'Central Heating', icon: '🔥', isPro: false, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚽', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-hot-water', title: 'Hot Water', icon: '♨️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-electrical', title: 'Electrical', icon: '⚡', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-rainwater', title: 'Rainwater', icon: '🌧️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-real-life-scenarios', title: 'Real Life Scenarios', icon: '🛠️', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
      { id: 'level2-scientific-principles', title: 'Scientific Principles', icon: '🔬', isPro: true, level: 2, totalQuestions: 25, trade: 'Plumbing' },
  
      // Plumbing Level 3
      { id: 'cold-water', title: 'Cold Water', icon: '💧', isPro: false, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚿', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'rainwater', title: 'Rainwater', icon: '☔', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'environmental-technologies', title: 'Environmental Technologies', icon: '🌱', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'hot-water', title: 'Hot Water', icon: '🔥', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'central-heating', title: 'Central Heating', icon: '🔥', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'electrical', title: 'Electrical', icon: '⚡', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'domestic-fuels', title: 'Domestic Fuels', icon: '⛽', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
      { id: 'calculation-questions', title: 'Calculation Questions', icon: '🧮', isPro: true, level: 3, totalQuestions: 50, trade: 'Plumbing' },
    ];
  
    const topicsData: Topic[] = [
      ...plumbingTopics,
      ...gasTopics,
      ...level2ElectricalTopics,
      ...level3ElectricalTopics,
      ...level2HVACTopics,
      ...level3HVACTopics,
      ...level2JoineryTopics,
      ...level3JoineryTopics,
      ...level2BricklayingTopics,
      ...level3BricklayingTopics,
      ...buildingRegsTopics,
      ...cscsTopics,
    ];
  
    setTopics(topicsData);
  }, []);
  
  

  useEffect(() => {
    if (selectedTrade === 'Gas') {
      setSelectedLevel(99);
      return;
    }
  
    const tradeInfo = TRADE_LEVELS.find(t => t.name === selectedTrade);
  
    if (tradeInfo && tradeInfo.levels && tradeInfo.levels.length > 0) {
      setSelectedLevel(tradeInfo.levels[0]);
    } else {
      setSelectedLevel(0); // For trades like CSCS or Building Regs
    }
  }, [selectedTrade]);
  
  
  


  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      </Layout>
    );
  }

  const openQuizOptions = (topic: Topic) => {
    if (topic.isPro && !userData?.isPro) {
      setIsUpgradeModalOpen(true);
    } else {
      setSelectedTopic(topic);
    }
  };

  const startQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz/${selectedTopic.id}?amount=${questionCount}`);
    }
  };

  const renderTopics = () => {
  const filtered = topics
    .filter((t) =>
      selectedTrade === 'Building Regulations'
        ? t.trade === 'Building Regulations'
        : t.trade === selectedTrade && t.level === selectedLevel
    )
    .sort((a, b) => Number(a.isPro) - Number(b.isPro));


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((topic) => {
        

        const progressData = userData?.quizProgress?.[topic.id] || {};
        const lastCorrect = progressData.lastCorrect ?? null;
        const lastTotal = progressData.lastTotal ?? null;
        const seenIds = progressData.seenIds || [];

        const hasAttempted = lastCorrect !== null && lastTotal !== null;
        const percentage =
          hasAttempted && lastTotal > 0
            ? Math.round((lastCorrect / lastTotal) * 100)
            : 0;

        const caption = hasAttempted
          ? `${lastCorrect}/${lastTotal} - Last attempt\nSeen: ${seenIds.length} questions`
          : 'No attempts yet';

        return (
          <TopicCard
            key={topic.id}
            title={topic.title}
            icon={topic.icon}
            progress={percentage}
            caption={caption}
            isPro={topic.isPro}
            isUserPro={!!userData?.isPro}
            level={topic.level}
            onClick={() => openQuizOptions(topic)}
          />
        );
      })}
    </div>
  );
};
  
  

  return (
    <Layout>
      {/* Apply dark mode styles to the container */}
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">Choose Your Trade & Level</h1>
          
          {/* Trade Selection - UPDATED with consistent blue */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 px-2">
  {TRADE_LEVELS.map(({ name, color }) => (
    <button
      key={name}
      className={`w-full py-3 rounded-xl text-sm font-semibold transition text-center ${
        selectedTrade === name 
          ? `${color} text-white shadow` 
          : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500'
      }`}
      onClick={() => setSelectedTrade(name)}
    >
      {name}
    </button>
  ))}
</div>

          
          {/* Level Selection (hide for trades without levels) */}
{(() => {
  const currentTrade = TRADE_LEVELS.find((t) => t.name === selectedTrade);

const hasLevels = !!(currentTrade?.levels && currentTrade.levels.length > 0);

  return (
    <>
      {/* Show level buttons if the trade has levels */}
      {hasLevels && (
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center bg-gray-800 p-1 rounded-lg">
            {currentTrade!.levels.map((level) => (
              <button
                key={level}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedLevel === level
                    ? level === 2
                      ? 'bg-green-700 text-white shadow'
                      : 'bg-red-700 text-white shadow'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {`Level ${level}`}
              </button>
            ))}
          </div>
        </div>
      )}

    </>
  );
})()}


          
          {/* Reference Library Button - Kept the original emerald style as it's a distinct action */}
          
          
          {/* Topics Grid */}
          {renderTopics()}
          
          {/* Question Count Modal - UPDATED with consistent blue */}
          {selectedTopic && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full border border-gray-700">
                <h2 className="text-xl font-bold mb-6 text-white text-center">
                  How many questions for {selectedTopic.title}?
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {[5, 10, 15, 25, 50]
                    .filter((amount) => amount <= (selectedTopic?.totalQuestions || 50))
                    .map((amount) => (
                      <button
                        key={amount}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          questionCount === amount
                            ? 'bg-blue-600 text-white' // Changed from gradient to solid blue
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setQuestionCount(amount)}
                      >
                        {amount} Questions
                      </button>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={startQuiz}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full" // Changed from gradient to solid blue
                  >
                    Start Quiz
                  </button>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Upgrade Modal - Original component preserved */}
          <UpgradeModal
            isOpen={isUpgradeModalOpen}
            onClose={() => setIsUpgradeModalOpen(false)}
            onUpgrade={() => console.log('Upgrade action triggered')}
          />
        </div>
      </div>
    </Layout>
  );
}
