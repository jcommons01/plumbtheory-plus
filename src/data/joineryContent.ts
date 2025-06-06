const joineryContent = {
  "timber-types": {
    title: "Timber Types & Uses",
    table: {
      headers: ["Type", "Common Species", "Properties", "Best Use"],
      rows: [
        ["Hardwood", "Oak, Ash, Beech, Mahogany", "Dense, strong, slower growth", "Doors, floors, high-end joinery"],
        ["Softwood", "Pine, Spruce, Fir, Cedar", "Lighter, easier to work, fast-growing", "Framing, skirting, general use"],
        ["Engineered Wood", "Plywood, MDF, OSB", "Stable, layered construction", "Cabinetry, sheet goods, panels"],
        ["Treated Timber", "Pressure-treated softwood", "Decay/insect resistant", "External frames, battens, fencing"],
        ["Modified Wood", "Accoya, Thermowood", "Durable, stable, eco-friendly", "Windows, cladding, decking"]
      ]
    }
  },

  "moisture-content": {
    title: "Moisture Content Standards",
    table: {
      headers: ["Condition", "Moisture Content", "Standard", "Notes"],
      rows: [
        ["Internal Joinery", "8–12%", "BS EN 942", "Ideal for doors, architraves, flooring"],
        ["External Joinery", "12–19%", "BS EN 14220", "Allows for outdoor exposure"],
        ["Kiln-Dried", "6–10%", "Controlled drying", "Accurate and consistent"],
        ["Air-Dried", "15–20%", "Weather dependent", "Less accurate, longer process"],
        ["Excess Moisture", ">20%", "Not acceptable", "Risk of movement and decay"]
      ]
    }
  },

  "fixings-and-fasteners": {
    title: "Fixings & Fasteners",
    table: {
      headers: ["Type", "Material", "Best Use", "Notes"],
      rows: [
        ["Screws", "Steel, brass, stainless", "Cabinetry, framing, hinges", "Countersunk or pan head types"],
        ["Nails", "Galvanised steel, lost-head", "Framing, trims, cladding", "Quick application, less holding power"],
        ["Bolts", "Coach, carriage", "Joist hangers, heavy joints", "Use with washers and nuts"],
        ["Adhesives", "PVA, polyurethane", "Permanent bonding", "Used with clamps"],
        ["Brackets", "Steel, plated", "Shelving, structural support", "L-brackets, joist hangers"],
        ["Dowels", "Hardwood", "Jointing panels", "Requires alignment and glue"]
      ]
    }
  },

  "door-fitting": {
    title: "Door Fitting Standards",
    table: {
      headers: ["Aspect", "Standard", "Measurement", "Notes"],
      rows: [
        ["Top Gap", "Clearance above door", "2–3mm", "Prevent binding during expansion"],
        ["Side Gaps", "Clearance each side", "2–3mm", "Even spacing for operation"],
        ["Bottom Gap", "Clearance over floor", "5–8mm (int), 10mm (ext)", "Depends on floor covering/threshold"],
        ["Hinge Position", "From top and bottom", "150mm & 225mm", "Third hinge if height >2m"],
        ["Latch Height", "From floor", "1000–1050mm", "Matches BS 8300 / Part M accessibility"],
        ["Seasonal Movement", "Allowance for swelling", "1–2mm expansion", "Leave paint off edges to prevent sticking"]
      ]
    }
  },

  "window-components": {
    title: "Window Types & Components",
    table: {
      headers: ["Type", "Operation", "Key Components", "Use Case"],
      rows: [
        ["Casement", "Side-hung, outward open", "Sash, hinges, stays", "Common in houses"],
        ["Sash", "Vertical sliding", "Weights, cords, pulleys", "Period properties"],
        ["Stormproof", "Overlap rebate", "Frame, sash, gasket", "Better weather resistance"],
        ["Tilt & Turn", "Multi-function opening", "Pivot hinges, locking points", "Modern, easy clean"],
        ["Key Terms", "Mullion, Transom, Cill", "Vertical/horizontal dividers, base", "Used in all types"]
      ]
    }
  },

  "staircase-parts": {
    title: "Staircase Components",
    table: {
      headers: ["Part", "Function", "Typical Size", "Notes"],
      rows: [
        ["Tread", "Footstep surface", "250–300mm depth", "Must support body weight"],
        ["Riser", "Vertical face between treads", "150–200mm height", "Can be open or closed"],
        ["String", "Side supports", "Varies", "Cut or closed string types"],
        ["Balustrade", "Side barrier", "900mm (min) high", "Includes handrail, spindles"],
        ["Handrail", "Hand support", "900–1000mm from pitch line", "Must be continuous"],
        ["Newel Post", "Corner/starting post", "Sturdy and anchored", "Supports handrail and structure"]
      ]
    }
  },

  "joint-types": {
    title: "Common Timber Joints",
    table: {
      headers: ["Joint Type", "Strength", "Best Use", "Notes"],
      rows: [
        ["Mortise & Tenon", "High", "Door frames, chairs", "Traditional, load-bearing, durable"],
        ["Halving Joint", "Medium", "Framing, temporary joints", "Quick and simple"],
        ["Dovetail", "Very High", "Drawers, carcasses", "Strong interlocking, load-bearing"],
        ["Biscuit", "Medium", "Panels, carcasses", "Alignment aid, needs glue"],
        ["Lap Joint", "Low–Medium", "Fences, battens", "Overlap with screws/nails"],
        ["Housing Joint", "Medium", "Shelving, carcasses", "Groove fits mating piece"]
      ]
    }
  },

  "finishes-and-treatments": {
    title: "Timber Finishes & Treatments",
    table: {
      headers: ["Finish", "Protection", "Appearance", "Use Case"],
      rows: [
        ["Oil", "Water and dirt", "Natural, enhances grain", "Interior furniture, worktops"],
        ["Wax", "Light protection", "Soft sheen", "Decorative finish over oil"],
        ["Varnish", "Hard coating", "Gloss/matt", "Floors, handrails"],
        ["Paint", "Full surface seal", "Opaque colour", "Interior and exterior"],
        ["Preservatives", "Fungus/insect protection", "Clear/green/brown", "Outdoor structures, fencing"]
      ]
    }
  },

  "site-measurements": {
    title: "Site Measuring & Scribing",
    table: {
      headers: ["Task", "Best Practice", "Tools", "Notes"],
      rows: [
        ["Measuring Openings", "Measure width at 3 points", "Tape measure", "Use smallest width"],
        ["Scribing to Walls", "Follow wall contour", "Compass, pencil", "Transfer shape to timber"],
        ["Measuring Angles", "Use protractor or angle finder", "Digital angle finder", "Vital for mitres, stairs"],
        ["Template Use", "For repeat shapes", "Cardboard/MDF", "Speeds up marking complex shapes"],
        ["Checking Levels", "Plumb and level surfaces", "Spirit level, laser", "Avoids misalignment or twist"]
      ]
    }
  },

  "building-regulations-joinery": {
    title: "Building Regs for Joinery",
    table: {
      headers: ["Regulation", "Requirement", "Standard", "Notes"],
      rows: [
        ["Document M", "Accessible door widths", "Min 775mm clear opening", "Applies to all new builds & accessible dwellings"],
        ["Fire Doors", "Fire resistance", "FD30/FD60 rated", "Must include intumescent strips and CE-marked hardware"],
        ["Handrail Height", "Stairs and ramps", "900–1000mm", "Measured from pitch line; both sides in public buildings"],
        ["Balustrade Gaps", "Safety", "≤100mm spacing", "Prevents child head entrapment"],
        ["Thresholds", "Max step height", "15mm max", "Level access preferred per Part M"],
        ["Glazing", "Safety glass", "Toughened/laminated", "Required below 800mm or in critical zones"]
      ]
    }
  }
};

export default joineryContent;
