const gasContent = {
    "ventilation-requirements": {
      title: "Ventilation Requirements",
      table: {
        headers: ["Appliance Type", "Location", "Minimum Ventilation Required", "Notes"],
        rows: [
          ["Open Flue", "Internal", "100cm² per kW over 7kW", "Permanent air vent required"],
          ["Room Sealed", "Internal", "None", "Combustion air drawn from outside"],
          ["Flueless", "Internal", "100cm² per kW input", "Plus CO detector and room size limits"],
          ["Open Flue", "Compartment", "Additional 50cm² top & bottom", "Ventilation to outside preferred"],
          ["Boiler in Cupboard", "Internal Wall", "Grill top & bottom", "Same as above if not room-sealed"]
        ]
      }
    },
  
    "flueing-requirements": {
      title: "Flueing Requirements",
      table: {
        headers: ["Flue Type", "Minimum Distance", "Requirement", "Notes"],
        rows: [
          ["Balanced (Room-Sealed)", "300mm", "From opening windows, doors, vents", "Measured horizontally"],
          ["Open Flue", "600mm", "From any opening", "Ensure proper draught"],
          ["Vertical Flue", "1000mm", "Above pitched roof", "Or 500mm above flat roof"],
          ["Terminal Guards", "N/A", "If within 2m of ground or walkway", "Protective cage required"],
          ["Inspection", "Accessible", "Flue joints and path must be visible", "Flue hatches or inspection panels required"]
        ]
      }
    },
  
    "tightness-testing": {
      title: "Tightness Testing & Purging",
      table: {
        headers: ["Step", "Action", "Acceptable Result", "Notes"],
        rows: [
          ["Let-by Test", "2 mins at working pressure", "≤1 mbar drop", "Confirms tight ECV"],
          ["Stabilisation", "Wait for pressure to settle", "Stable reading", "Usually 1 min"],
          ["Tightness Test", "2 mins at pressure", "No drop or ≤1 mbar", "No smell or audible leak"],
          ["Purge", "Open appliance or pipe end", "No air remaining", "Vent safely to atmosphere"],
          ["Re-test", "Check again after appliances lit", "Stable pressure", "Confirms no leaks during use"]
        ]
      }
    },
  
    "combustion-analysis": {
      title: "Combustion Analysis",
      table: {
        headers: ["Parameter", "Acceptable Range", "Test Location", "Notes"],
        rows: [
          ["CO/CO₂ Ratio", "<0.004", "Flue sampling point", "Above 0.008 = Immediately Dangerous"],
          ["CO ppm", "<200ppm", "Flue products", "Depends on boiler type"],
          ["O₂ Level", "5–9%", "In flue gases", "Shows correct combustion"],
          ["Flue Temp", "Varies", "Typically 40–80°C above ambient", "Affected by condensing"],
          ["Ambient CO", "0 ppm", "Around appliance", "Any reading indicates a fault"]
        ]
      }
    },
  
    "gas-appliance-types": {
      title: "Gas Appliance Types",
      table: {
        headers: ["Type", "Flue Type", "Use Case", "Notes"],
        rows: [
          ["Open Flue", "Conventional flue", "Older boilers, fires", "Relies on room air and draught"],
          ["Room Sealed", "Balanced flue", "Modern appliances", "No reliance on room air"],
          ["Flueless", "None", "Cookers, heaters", "Strict ventilation and size rules"],
          ["Fan Flued", "Powered flue", "Modern boilers", "Allows longer flue runs"],
          ["Back Boiler Unit", "Behind fireplace", "Retrofit heating", "Now obsolete"],
          ["Combination Boiler", "Room-sealed", "Instant hot water", "No cylinder or tanks"]
        ]
      }
    },
  
    "unsafe-situations": {
      title: "Unsafe Situations (ID/AR)",
      table: {
        headers: ["Category", "Definition", "Required Action", "Example"],
        rows: [
          ["Immediately Dangerous (ID)", "Immediate risk to life/property", "Turn off & label, report to user", "CO leakage, open flue in sealed room"],
          ["At Risk (AR)", "Potential future danger", "Turn off & label, advise user", "Lack of ventilation"],
          ["Not to Current Standards (NCS)", "Safe but not compliant", "Advise but no action required", "No bonding, undersized pipe"],
          ["Reportable", "ID or AR involving landlord", "Report to Gas Safe Register", "Rented property issue"],
          ["Labeling", "ID or AR", "Apply warning notice", "Include user info and engineer details"]
        ]
      }
    },
  
    "pipe-sizing-gas": {
      title: "Gas Pipe Sizing",
      table: {
        headers: ["Pipe Size", "Max Length (m)", "Max kW Load", "Notes"],
        rows: [
          ["15mm", "3–6m", "7–10 kW", "Dependent on pressure drop and layout"],
          ["22mm", "6–15m", "20–30 kW", "Used for larger boilers or multiple appliances"],
          ["28mm", "15–25m", "30–50 kW", "Longer runs or combined loads"],
          ["Calculation", "Use tables", "1m = 1m, bends = 0.5–0.8m each", "Add equivalent lengths"],
          ["Pressure Drop", "≤1 mbar", "From meter to appliance", "Required for correct combustion"]
        ]
      }
    },
  
    "working-pressure-checks": {
      title: "Working Pressure & Operating Pressure",
      table: {
        headers: ["Check Point", "Expected Pressure", "Acceptable Tolerance", "Notes"],
        rows: [
          ["Meter Outlet", "20–21 mbar", "±2 mbar", "Check with appliances running"],
          ["Appliance Inlet", "18–21 mbar", "Min 1 mbar less than meter", "Measure at test point if available"],
          ["Static Pressure", "Before appliance use", "Stable reading", "Confirms system pressure"],
          ["Operating Pressure", "During use", "Within spec", "Should not drop significantly"],
          ["Fluctuation", "Minimal", "≤1 mbar", "Excess = undersized pipe or fault"]
        ]
      }
    },
  
    "tightness-drop-limits": {
      title: "Allowable Pressure Drops",
      table: {
        headers: ["Meter Type", "Max Drop (mbar)", "Test Duration", "Notes"],
        rows: [
          ["U6 (Diaphragm)", "≤1 mbar", "2 mins", "Standard domestic meter"],
          ["G4", "≤1 mbar", "2 mins", "Same as above"],
          ["No Appliances", "0 mbar", "Ideal case", "Only natural stabilisation drop"],
          ["With Appliances", "≤1 mbar", "With open ECV", "Slight drop may occur"],
          ["Let-by", "≤1 mbar", "2 mins", "Before tightness test starts"]
        ]
      }
    },
  
    "installation-defects": {
      title: "Installation Defects",
      table: {
        headers: ["Defect", "Description", "Action Required", "Risk Level"],
        rows: [
          ["No Bonding", "Lack of earth bonding at meter", "Install 10mm² bonding", "ID in some cases"],
          ["No Test Point", "At appliance or meter", "Install appropriate fitting", "NCS or AR"],
          ["Undersized Pipework", "Cannot supply required gas volume", "Recalculate and upgrade", "AR"],
          ["No Ventilation", "Room-sealed assumed when not", "Provide correct vents", "ID"],
          ["Uncapped Pipe", "Open end of old supply", "Cap with suitable fitting", "ID"],
          ["Incorrect Flue Termination", "Too close to opening or vent", "Reposition to meet standards", "AR–ID depending on severity"]
        ]
      }
    }
  };
  
  export default gasContent;
  