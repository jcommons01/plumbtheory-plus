const plumbingContent = {
    "pipe-sizes": {
      title: "Pipe Sizes & Clipping Distances",
      table: {
        headers: ["Material", "Size", "Horizontal Clipping (m)", "Vertical Clipping (m)"],
        rows: [
          // Divider: Copper
          ["DIVIDER", "Copper Pipework"],
  
          ["Copper", "6mm", "0.6", "0.9"],
          ["Copper", "8mm", "0.6", "0.9"],
          ["Copper", "10mm", "0.8", "1.2"],
          ["Copper", "15mm", "1.2", "1.8"],
          ["Copper", "22mm", "1.8", "2.4"],
          ["Copper", "28mm", "1.8", "2.4"],
          ["Copper", "35mm", "2.0", "2.5"],
          ["Copper", "42mm", "2.0", "2.5"],
          ["Copper", "54mm", "2.0", "2.5"],
          ["Copper", "67mm", "2.5", "3.0"],
          ["Copper", "76mm", "2.5", "3.0"],
          ["Copper", "108mm", "2.5", "3.0"],
  
          // Divider: Plastic
          ["DIVIDER", "Plastic Pipe (Polybutylene / PEX)"],
  
          ["Plastic", "10mm", "0.3", "0.5"],
          ["Plastic", "15mm", "0.3", "0.5"],
          ["Plastic", "22mm", "0.5", "0.8"],
          ["Plastic", "28mm", "0.5", "1.0"],
  
          // Divider: MDPE
          ["DIVIDER", "MDPE Pipework"],
  
          ["MDPE", "20mm", "0.5", "0.8"],
          ["MDPE", "25mm", "0.6", "1.0"],
          ["MDPE", "32mm", "0.7", "1.2"],
          ["MDPE", "50mm", "0.8", "1.5"],
          ["MDPE", "63mm", "1.0", "1.5"],
  
          // Divider: Steel / LCS
          ["DIVIDER", "Steel (LCS) Pipework"],
  
          ["Steel (LCS)", "½\" (15mm)", "1.2", "1.8"],
          ["Steel (LCS)", "¾\" (20mm)", "1.8", "2.4"],
          ["Steel (LCS)", "1\" (25mm)", "2.0", "2.4"],
          ["Steel (LCS)", "1¼\"", "2.0", "2.5"],
          ["Steel (LCS)", "1½\"", "2.0", "2.5"],
          ["Steel (LCS)", "2\"", "2.5", "3.0"],
  
          // Divider: Push-fit Waste
          ["DIVIDER", "Push-fit Waste Pipework"],
  
          ["Push-fit Waste", "32mm", "0.4", "0.6"],
          ["Push-fit Waste", "40mm", "0.5", "0.8"],
          ["Push-fit Waste", "50mm", "0.6", "1.0"],
  
          // Divider: Solvent Weld Waste
          ["DIVIDER", "Solvent Weld Waste Pipework"],
  
          ["Solvent Weld", "32mm", "0.4", "0.6"],
          ["Solvent Weld", "40mm", "0.5", "0.8"],
          ["Solvent Weld", "50mm", "0.6", "1.0"]
        ]
      }
    },
  
  
    "fitting-types": {
  title: "Fitting Types & Identification",
  table: {
    headers: [
      "Fitting Type",
      "Materials Used",
      "Sealing Method",
      "Installation Method",
      "Tools Required",
      "Common Uses"
    ],
    rows: [
      ["Compression", "Brass, copper", "Mechanical (olive compression)", "Manual tightening", "2 spanners", "Maintenance work, accessible pipe joints"],
      ["Push-fit", "Plastic, brass", "O-ring with grab ring", "Push onto pipe", "Pipe cutter, insert", "Quick installs, no heat, tight spaces"],
      ["Solder End Feed", "Copper", "Capillary with external solder", "Heat and apply solder manually", "Blowtorch, flux, wire wool", "Slim profile, permanent joints"],
      ["Solder Ring (Yorkshire)", "Copper", "Preloaded solder ring", "Heat until solder melts", "Blowtorch", "Consistent seal, no added solder"],
      ["Solvent Weld", "PVC, ABS", "Chemical solvent bond", "Clean, apply solvent and insert", "Pipe cutter, cleaning fluid, cement", "Waste systems, strong permanent joints"],
      ["Press-fit", "Copper, stainless steel", "O-ring with mechanical crimp", "Pressed using tool", "Press gun with jaws", "Commercial jobs, no heat, fast installs"],
      ["Threaded (BSP)", "Brass, iron, gunmetal", "PTFE tape or paste", "Screw into mating part", "Wrench, thread sealant", "Valves, pumps, temporary joints"],
      ["Flare/Manipulative", "Copper", "Flared metal-to-metal seal", "Pipe flaring tool, nut tightening", "Flaring kit, spanner", "High-pressure systems, fuel lines"],
      ["Compression with O-ring", "Brass, plastic", "O-ring + mechanical", "Tighten nut onto pipe", "Spanner", "Enhanced seal in plastic systems"],
      ["Push-fit (Metal)", "Brass, stainless", "O-ring + grab ring", "Push fit", "Deburrer, pipe cutter", "Strong connections for plastic/copper"]
    ]
  }
},

"heating-systems": {
  title: "Heating System Types",
  table: {
    headers: [
      "System Type",
      "Key Components",
      "Operation",
      "Typical Use Case"
    ],
    rows: [
      ["S-Plan", "Two 2-port motorised valves, cylinder stat, room stat, programmer", "Independent control of heating and hot water", "Larger or zoned properties"],
      ["Y-Plan", "Single 3-port mid-position valve, cylinder stat, room stat, programmer", "Mid-position valve switches flow between CH and HW", "Smaller homes, cost-effective"],
      ["W-Plan", "Single diverter valve, simple programmer", "Switches between CH and HW — never both simultaneously", "Basic systems with low hot water demand"],
      ["Fully Pumped", "Pump circulates water to both HW and CH", "Efficient and faster heat-up compared to gravity systems", "Modern systems standard"],
      ["Gravity-Fed", "Hot water rises via convection, no pump for HW", "Slow heating, relies on pipe gradients", "Older systems, requires large pipework"],
      ["Underfloor Heating", "Manifold, thermostats, mixing valve", "Low-temp flow through floor loops", "Efficient and discreet heating in modern builds"]
    ]
  }
},

"hot-cold-components": {
  title: "Hot & Cold Water System Components",
  table: {
    headers: [
      "Component",
      "Function",
      "Key Features"
    ],
    rows: [
      ["Unvented Cylinder", "Pressurised hot water storage from mains", "Includes TPRV, expansion vessel, tundish, PRV; G3 regulation"],
      ["Vented Cylinder", "Gravity-fed hot water from CWSC", "Low pressure, loft-based storage, simpler systems"],
      ["Expansion Vessel", "Absorbs thermal expansion in sealed systems", "Diaphragm chamber pre-charged to system pressure"],
      ["Tundish", "Visible fault indicator for discharge", "Open pipe fitting, installed between TPRV and waste"],
      ["TPRV", "Releases water if pressure/temp exceed limits", "Activates at ~90–95°C or 6–7 bar"],
      ["PRV (Pressure Reducing Valve)", "Controls mains pressure into system", "Typically set at 3 bar, combined with check valve"],
      ["TMV (Thermostatic Mixing Valve)", "Blends hot and cold to safe delivery temp", "TMV2/3 rated for domestic/commercial"]
    ]
  }
},

"pipework-guidelines": {
  title: "Pipework Installation Guidelines",
  table: {
    headers: [
      "Aspect",
      "Best Practice"
    ],
    rows: [
      ["Burial Depths", "MDPE mains buried 750mm (900mm under roads), sand bed + warning tape"],
      ["Wall Penetrations", "Sleeve 2× pipe diameter, seal both ends, fire-resistant if needed"],
      ["Support Spacing", "Copper: 1.2–2.4m, Plastic: 0.3–0.8m based on size and orientation"],
      ["Thermal Expansion", "Copper ~1mm/m/100°C, Plastic ~15× more — allow for movement"],
      ["Insulation", "Hot pipes: 25–35mm, Cold pipes: 9–25mm depending on zone"],
      ["Identification", "Label all pipes, provide drawings for concealed routes"]
    ]
  }
},

"water-regulations": {
  title: "Water Regulations",
  table: {
    headers: ["Regulation Area", "Details"],
    rows: [
      ["Fluid Categories", "Cat 1 to Cat 5 — defines contamination risk from potable to pathogenic"],
      ["Backflow Prevention", "Cat 5: AA/AB air gap, Cat 4: RPZ, Cat 3: DCV, Cat 2: SCV"],
      ["Notifiable Work", "Unvented cylinders, bidets with spray, rainwater harvest, irrigation"],
      ["Cisterns", "WRAS materials, lid, insect screen, insulation, correct float setup"],
      ["Temperature Control", "Cold <20°C, HW stored ≥60°C, safe delivery 41–46°C"],
      ["Water Efficiency", "≤125L/day per person (110L in water-stressed areas) per Part G"]
    ]
  }
},

"flow-sizing": {
  title: "Flow Rates & Sizing",
  table: {
    headers: [
      "Appliance",
      "Typical Flow (L/min)",
      "Loading Unit (LU)",
      "Notes"
    ],
    rows: [
      ["Basin Tap", "4–8", "0.1", "Standard washbasin"],
      ["Kitchen Tap", "8–12", "0.3", "Higher use"],
      ["Shower", "9–15", "0.2", "Mixer or thermostatic"],
      ["Bath Tap", "12–18", "0.3", "Fast fill"],
      ["Pipe Velocity Limit", "—", "—", "≤1.5 m/s (copper), ≤3 m/s (plastic)"],
      ["Pressure Requirement", "1.0–2.0+ bar", "—", "Depends on appliance and layout"]
    ]
  }
},

"faults-fixes": {
  title: "Common Faults & Fixes",
  table: {
    headers: ["Fault", "Likely Causes", "Fixes"],
    rows: [
      ["No Hot Water", "Programmer, thermostat, valve, immersion", "Check timer, stat (~60°C), motor valve lever, continuity test"],
      ["Poor Flow", "Blockages, PRV setting, scale", "Clean filters, verify PRV (3 bar), check pipe sizing"],
      ["Unvented Issues", "Expansion vessel, pressure", "Check pre-charge, vessel diaphragm, TPRV discharge"],
      ["Airlocks", "Post-drain system", "Connect taps with hose, increase pump speed, bleed radiators"],
      ["Boiler Faults", "Ignition, pressure, PCB", "Check error codes, 1–1.5 bar, isolate before working"],
      ["Leaks", "Joints, cylinders", "Visual test, dye test, pressure test, thermal imaging"]
    ]
  }
},

"pipe-identification": {
  title: "Color Coding & Pipe Identification",
  table: {
    headers: ["Type", "Color/Label", "Notes"],
    rows: [
      ["Cold Water", "Blue (BS 4800:10-E-53)", "All visible sections"],
      ["Hot Water", "Red (BS 4800:04-E-53)", "Insulated pipes must be labeled"],
      ["Gas", "Yellow/Ochre (BS 4800:08-E-51)", "Clearly marked on visible runs"],
      ["Rain/Greywater", "Green / Black w/ Green Bands", "Especially in eco systems"],
      ["Flow / Return", "Red/Orange = Flow, Blue = Return", "For heating circuits"],
      ["Warning Tape", "250mm above buried services", "Avoids excavation damage"],
      ["Valve Labels", "Service + Area", "Printed tags for all isolation valves"]
    ]
  }
},

"conversion-tables": {
  title: "Conversion Tables",
  table: {
    headers: ["Measurement", "Conversion"],
    rows: [
      ["Pressure", "1 bar = 14.5 psi = 10.2m head = 100 kPa = 0.1 MPa"],
      ["Flow", "1 L/s = 60 L/min = 3.6 m³/h = 13.2 gal/min"],
      ["Length", "25mm = 0.984 in (≈1”), 1m = 3.28 ft = 39.37 in"],
      ["Temperature", "°C to °F = (°C × 9/5) + 32"],
      ["Power", "1 kW = 3412 BTU/h = 860 kcal/h"],
      ["Volume", "1L = 0.22 UK gal = 0.26 US gal = 0.001 m³"]
    ]
  }
},

"boiler-types": {
  title: "Boiler Types & Best Uses",
  table: {
    headers: ["Boiler Type", "Key Features", "Best For"],
    rows: [
      ["Combi", "Instant HW/CH, no tanks or cylinder", "Small–medium homes, 1 bathroom"],
      ["System", "Works with unvented cylinder, sealed system", "Multiple bathrooms, balanced supply"],
      ["Heat-only", "Requires F&E tanks and cylinder", "Older systems, retrofit"],
      ["Condensing", "90–94% efficient, flue gas heat recovery", "All modern boiler types (legal requirement)"],
      ["Electric", "No flue/gas, easy install, costly to run", "Flats, off-grid"],
      ["Biomass", "Burns pellets/logs, carbon-neutral", "Rural, eco homes, needs thermal store"]
    ]
  }
}

  };
  
  export default plumbingContent;
  