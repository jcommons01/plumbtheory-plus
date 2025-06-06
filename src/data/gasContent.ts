const gasContent = {
  "ventilation-requirements": {
    title: "Ventilation Requirements",
    table: {
      headers: ["Appliance Type", "Location", "Minimum Ventilation Required", "Notes"],
      rows: [
        ["Open Flue", "Internal", "Permanent 100cm² per kW input over 7kW", "To comply with BS 5440-2"],
        ["Room Sealed", "Internal", "None", "Air drawn externally via flue system"],
        ["Flueless", "Internal", "100cm² per kW input", "Also requires CO alarm & minimum room volume"],
        ["Open Flue", "Compartment", "Permanent: 50cm² per kW (top & bottom)", "Ventilation to outside must be provided"],
        ["Boiler in Cupboard", "Internal Wall", "Grills top & bottom", "If not room-sealed, treat as open flue"]
      ]
    }
  },

  "flueing-requirements": {
    title: "Flueing Requirements",
    table: {
      headers: ["Flue Type", "Minimum Distance", "Requirement", "Notes"],
      rows: [
        ["Balanced (Room-Sealed)", "300mm", "From opening windows, doors, vents", "Horizontal measure from flue terminal"],
        ["Open Flue", "600mm", "From any opening", "Avoid flue gas re-entry"],
        ["Vertical Flue", "1000mm", "Above pitched roof", "500mm above flat roof or parapet"],
        ["Terminal Guards", "If ≤2m", "Required", "Protect if near walkway or access"],
        ["Inspection", "Required", "All flue joints must be accessible", "Use access hatches or panels as per BS 5440-1"]
      ]
    }
  },

  "tightness-testing": {
    title: "Tightness Testing & Purging",
    table: {
      headers: ["Step", "Action", "Acceptable Result", "Notes"],
      rows: [
        ["Let-by Test", "2 mins at working pressure", "≤1 mbar drop", "Confirms closed ECV integrity"],
        ["Stabilisation", "Allow pressure to settle", "Stable reading", "Usually 1 minute"],
        ["Tightness Test", "2 mins at working pressure", "≤1 mbar drop", "No smell or audible leak"],
        ["Purge", "Open pipe/appliance end", "Air displaced", "Vent externally in safe area"],
        ["Re-test", "Post-ignition check", "Stable pressure", "Ensures no in-use leaks"]
      ]
    }
  },

  "combustion-analysis": {
    title: "Combustion Analysis",
    table: {
      headers: ["Parameter", "Acceptable Range", "Test Location", "Notes"],
      rows: [
        ["CO/CO₂ Ratio", "<0.0040", "Flue sampling point", "0.004–0.008 = AR, >0.008 = ID"],
        ["CO ppm", "<200 ppm", "Products of combustion", "Must follow MI; >350 ppm = ID"],
        ["O₂ Level", "5–9%", "In flue gases", "Indicates proper combustion mix"],
        ["Flue Temp", "Varies", "40–80°C above ambient", "Lower for condensing boilers"],
        ["Ambient CO", "0 ppm", "Around appliance", "Any presence = immediate investigation"]
      ]
    }
  },

  "gas-appliance-types": {
    title: "Gas Appliance Types",
    table: {
      headers: ["Type", "Flue Type", "Use Case", "Notes"],
      rows: [
        ["Open Flue", "Conventional flue", "Older boilers/fires", "Relies on draught and room air"],
        ["Room Sealed", "Balanced flue", "Modern appliances", "Combustion air sealed from room"],
        ["Flueless", "None", "Cookers, space heaters", "Strict ventilation & room size limits"],
        ["Fan Flued", "Powered flue", "Condensing boilers", "Enables longer/flatter flue runs"],
        ["Back Boiler Unit", "Behind fire", "Retrofit heating", "Now obsolete and discouraged"],
        ["Combination Boiler", "Room-sealed", "Hot water & heating", "No hot water storage needed"]
      ]
    }
  },

  "unsafe-situations": {
    title: "Unsafe Situations (ID/AR)",
    table: {
      headers: ["Category", "Definition", "Required Action", "Example"],
      rows: [
        ["Immediately Dangerous (ID)", "Immediate danger to life/property", "Turn off gas, label, inform user", "CO leak, open flue in sealed room"],
        ["At Risk (AR)", "Could become dangerous", "Turn off, label, advise user", "Obstructed ventilation or flue"],
        ["Not to Current Standards (NCS)", "Safe but non-compliant", "Advise only", "No equipotential bonding"],
        ["Reportable", "Landlord-related ID/AR", "Report to Gas Safe", "Rental property hazard"],
        ["Labeling", "ID or AR", "Apply ‘Warning Notice’ label", "Include GSR number, date, and details"]
      ]
    }
  },

  "pipe-sizing-gas": {
    title: "Gas Pipe Sizing",
    table: {
      headers: ["Pipe Size", "Max Length (m)", "Max kW Load", "Notes"],
      rows: [
        ["15mm", "Up to 6m", "≤10 kW", "Subject to layout & pressure drop"],
        ["22mm", "6–15m", "Up to 30 kW", "Often used for boilers/multiple loads"],
        ["28mm", "15–25m", "Up to 50 kW", "Longer runs or higher loads"],
        ["Calculation", "Use BS 6891 tables", "1m = 1m, bends = 0.5–0.8m", "Total EFL = pipe length + fittings"],
        ["Pressure Drop", "≤1 mbar", "From meter to appliance", "Essential for combustion performance"]
      ]
    }
  },

  "working-pressure-checks": {
    title: "Working Pressure & Operating Pressure",
    table: {
      headers: ["Check Point", "Expected Pressure", "Acceptable Tolerance", "Notes"],
      rows: [
        ["Meter Outlet", "20–21 mbar", "±2 mbar", "Measured with appliances operating"],
        ["Appliance Inlet", "18–21 mbar", "≥1 mbar drop from meter", "Use manufacturer spec if tighter"],
        ["Static Pressure", "Pre-use reading", "Stable", "Indicates system integrity"],
        ["Operating Pressure", "In use", "Within appliance spec", "No major fluctuation"],
        ["Fluctuation", "Minimal", "≤1 mbar", "Excess may indicate undersized pipe"]
      ]
    }
  },

  "tightness-drop-limits": {
    title: "Allowable Pressure Drops",
    table: {
      headers: ["Meter Type", "Max Drop (mbar)", "Test Duration", "Notes"],
      rows: [
        ["U6 (Diaphragm)", "≤1 mbar", "2 mins", "Standard for domestic"],
        ["G4", "≤1 mbar", "2 mins", "Identical criteria"],
        ["No Appliances", "0 mbar", "Best case", "Only settling drop allowed"],
        ["With Appliances", "≤1 mbar", "With open ECV", "May settle slightly"],
        ["Let-by", "≤1 mbar", "2 mins", "Confirms ECV is tight"]
      ]
    }
  },

  "installation-defects": {
    title: "Installation Defects",
    table: {
      headers: ["Defect", "Description", "Action Required", "Risk Level"],
      rows: [
        ["No Bonding", "No main earth bonding at gas meter", "Install 10mm² within 600mm of entry", "AR or ID depending on situation"],
        ["No Test Point", "Missing at meter or appliance", "Install appropriate fitting", "NCS or AR"],
        ["Undersized Pipework", "Inadequate supply capacity", "Recalculate and upgrade", "AR"],
        ["No Ventilation", "Inadequate for appliance type", "Install compliant vents", "AR or ID based on severity"],
        ["Uncapped Pipe", "Unused gas line open", "Seal with approved cap", "ID"],
        ["Incorrect Flue Termination", "Too close to window/opening", "Re-route flue to meet clearance regs", "ID if spilling"]
      ]
    }
  }
};

export default gasContent;
