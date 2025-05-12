const bricklayingContent = {
    "brick-types": {
      title: "Brick & Block Types",
      table: {
        headers: ["Type", "Properties", "Typical Use", "Notes"],
        rows: [
          ["Common Brick", "Basic strength, irregular appearance", "Non-visible internal walls", "Not weatherproof or decorative"],
          ["Facing Brick", "Smooth or textured face", "External walls", "Available in various colours and textures"],
          ["Engineering Brick (Class A/B)", "High strength & low water absorption", "Damp courses, retaining walls", "Class A stronger than B"],
          ["Aerated Block", "Lightweight, insulating", "Internal leaf, thermal blockwork", "Easy to cut, not load-bearing"],
          ["Dense Concrete Block", "Heavy, strong", "Load-bearing walls", "Higher acoustic and thermal mass"],
          ["Lightweight Aggregate Block", "Medium weight, better insulation", "General blockwork", "Easier to handle than dense"]
        ]
      }
    },
  
    "bond-patterns": {
      title: "Brick Bonds & Patterns",
      table: {
        headers: ["Bond", "Pattern", "Best Use", "Notes"],
        rows: [
          ["Stretcher Bond", "Bricks laid with overlap of half a brick", "Modern cavity walls", "Most common bond"],
          ["English Bond", "Alternating stretcher and header courses", "Strong load-bearing walls", "High strength"],
          ["Flemish Bond", "Headers and stretchers alternate in each course", "Aesthetic heritage walls", "Weaker than English"],
          ["Header Bond", "Only headers visible", "Thick walls or curved surfaces", "Short wall lengths"],
          ["Stack Bond", "Bricks stacked directly above each other", "Non-load-bearing decorative walls", "Requires reinforcement"]
        ]
      }
    },
  
    "mortar-mixes": {
      title: "Mortar Mix Ratios",
      table: {
        headers: ["Application", "Cement:Lime:Sand", "Strength Class", "Notes"],
        rows: [
          ["General Brickwork", "1:1:6", "M4", "Good workability, moderate strength"],
          ["Strong Load-Bearing", "1:0.5:4.5", "M6", "Higher cement content"],
          ["High Exposure/Retaining", "1:0:3–4", "M12", "No lime, strongest mix"],
          ["Internal Walls", "1:2:9", "M2", "Weak mix for light loads"],
          ["Blocks (lightweight)", "1:1:5 or 1:1:6", "M4", "Adjust based on strength"]
        ]
      }
    },
  
    "dpc-requirements": {
      title: "Damp-Proof Course (DPC) Requirements",
      table: {
        headers: ["Aspect", "Requirement", "Standard", "Notes"],
        rows: [
          ["DPC Material", "Plastic, bitumen, engineering brick", "BS 8215", "Must be durable and continuous"],
          ["Minimum Height", "150mm above ground level", "Approved Doc C", "Prevents splashback"],
          ["Lap Over", "Min 100mm at joints", "BS 5628", "Ensure waterproof barrier"],
          ["Wall Integration", "Both leaves of cavity wall", "Fully bonded", "No gaps or bridging"],
          ["Weep Holes", "Every 900mm above DPC", "BS 5628", "Allows water drainage"]
        ]
      }
    },
  
    "cavity-wall-details": {
      title: "Cavity Wall Construction",
      table: {
        headers: ["Component", "Function", "Standard", "Notes"],
        rows: [
          ["Cavity Width", "Insulation space", "50–100mm", "Wider for better U-values"],
          ["Wall Ties", "Link inner/outer leaves", "Every 900mm horiz, 450mm vert", "Stainless steel or plastic"],
          ["Insulation Position", "Within cavity", "Full-fill or partial", "Prevents thermal bridging"],
          ["Weep Holes", "Drain moisture", "900mm spacing", "Above openings and DPC"],
          ["Drip on Wall Tie", "Prevents water transfer", "Required", "Faces down in cavity"]
        ]
      }
    },
  
    "tolerances": {
      title: "Brickwork Tolerances & Levels",
      table: {
        headers: ["Aspect", "Tolerance", "Standard", "Notes"],
        rows: [
          ["Vertical (plumb)", "±10mm over 2m", "NHBC / BS 8000-3", "Check with level"],
          ["Horizontal (level)", "±10mm over 10m", "NHBC / BS 8000-3", "Use long spirit level or laser"],
          ["Gauge (per course)", "75mm ±3mm", "Standard brick + mortar", "Includes 10mm mortar joint"],
          ["Overall Alignment", "±15mm", "Over full elevation", "Wavy or uneven walls fail this"],
          ["Joint Thickness", "10mm ±3mm", "Per course", "Consistency is key"]
        ]
      }
    },
  
    "movement-joints": {
      title: "Movement Joints in Brickwork",
      table: {
        headers: ["Condition", "Requirement", "Spacing", "Notes"],
        rows: [
          ["General Brickwork", "Movement joint required", "Every 10–12m", "Depends on brick type"],
          ["Clay Bricks", "Higher movement rate", "Every 7–9m", "Use compressible filler"],
          ["Vertical Joint", "Full height gap", "10–15mm wide", "Sealed with mastic"],
          ["Over Openings", "Slip joints at lintels", "Required", "Avoids cracking at stress points"],
          ["Control of Cracks", "Use of ties across joint", "At regular intervals", "Ties with sleeves allow movement"]
        ]
      }
    },
  
    "tool-names": {
      title: "Bricklaying Tools & Their Uses",
      table: {
        headers: ["Tool", "Function", "Use Notes", "Best Practice"],
        rows: [
          ["Brick Trowel", "Lays mortar and bricks", "Shape and spread mortar", "Keep clean and sharp"],
          ["Jointer", "Finishes mortar joint", "Creates weathered finish", "Improves water resistance"],
          ["Spirit Level", "Checks level/plumb", "Used constantly", "Check accuracy regularly"],
          ["Line Pins & Line", "Keeps courses straight", "Used with string", "Tension tightly"],
          ["Bolster Chisel", "Cuts bricks", "With club hammer", "Wear safety goggles"],
          ["Bucket Trowel", "Scoop mortar", "Load onto board", "Short wide blade"]
        ]
      }
    },
  
    "scaffolding": {
      title: "Scaffolding & Access Safety",
      table: {
        headers: ["Component", "Purpose", "Regulation", "Notes"],
        rows: [
          ["Base Plates", "Distribute load", "TG20", "Prevent sinking"],
          ["Guardrails", "Prevent falls", "Min 950mm high", "Double rails preferred"],
          ["Toe Boards", "Stop tools falling", "Min 150mm", "Fixed to inside edge"],
          ["Inspection Tag", "Safety sign-off", "Required before use", "Updated weekly"],
          ["Access Ladder", "Safe access", "Secure and extend 1m above platform", "Non-slip feet required"],
          ["Working Platform", "Stable work surface", "Min 600mm wide", "No gaps, full planking"]
        ]
      }
    },
  
    "construction-defects": {
      title: "Common Defects in Brickwork",
      table: {
        headers: ["Defect", "Cause", "Impact", "Remedy"],
        rows: [
          ["Efflorescence", "Salt migration", "White staining", "Dry brushing, avoid wet cleaning"],
          ["Misalignment", "Poor line use", "Wavy wall", "Use string line and level"],
          ["Poor Joint Finish", "Inadequate tooling", "Weak or rough joints", "Tool joints consistently"],
          ["Cold Bridging", "Incorrect insulation", "Heat loss, condensation", "Rebuild with proper detailing"],
          ["Cracking", "Movement without joints", "Structural risk", "Install movement joint"],
          ["Spalling", "Frost or poor brick type", "Brick face breaking off", "Use frost-resistant bricks"]
        ]
      }
    }
  };
  
  export default bricklayingContent;
  