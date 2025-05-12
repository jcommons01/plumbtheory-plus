const hvacContent = {
    "system-types": {
      title: "HVAC System Types",
      table: {
        headers: ["System Type", "Components", "Use Case", "Notes"],
        rows: [
          ["Split System", "Indoor unit + outdoor condenser", "Single room or small space", "Common in residential installs"],
          ["Multi-Split", "Multiple indoor units + one outdoor", "Small offices, multiple rooms", "Zone control possible"],
          ["VRF / VRV", "Multiple indoor units + inverter compressor", "Large buildings", "Highly efficient and scalable"],
          ["Packaged System", "All-in-one rooftop unit", "Shops, schools, commercial units", "Requires ducting"],
          ["Chilled Water System", "Chiller, air handler, pumps", "High-capacity cooling (e.g. hospitals)", "Water loop instead of refrigerant"]
        ]
      }
    },
  
    "ventilation-rates": {
      title: "Ventilation Rates & Air Changes",
      table: {
        headers: ["Room Type", "Recommended ACH", "Purpose", "Notes"],
        rows: [
          ["Living Room", "4–6 ACH", "General comfort", "Balanced fresh air"],
          ["Kitchen", "8–15 ACH", "Odour and grease removal", "Use extract hoods"],
          ["Bathroom", "6–10 ACH", "Humidity removal", "Use extract fans or MEV"],
          ["Office", "6–10 ACH", "Air quality and productivity", "Based on occupant density"],
          ["Workshop", "10–20 ACH", "Fume and dust control", "High ventilation required"],
          ["Classroom", "5–8 ACH", "Cognitive function support", "As per BB101 UK guidance"]
        ]
      }
    },
  
    "filters-types": {
      title: "Filter Types & MERV Ratings",
      table: {
        headers: ["Filter Grade", "Particle Size Removed", "Typical Use", "Replacement Interval"],
        rows: [
          ["G4", ">10μm", "Pre-filters, coarse dust", "3–6 months"],
          ["M5", "3–10μm", "Commercial systems", "6 months"],
          ["F7", "1–3μm", "Hospital and clean office", "6–12 months"],
          ["HEPA (H13+)", "0.3μm (≥99.95%)", "Cleanrooms, medical", "12–18 months"],
          ["Carbon", "Gas/odour", "Kitchens, smoking areas", "6–12 months depending on loading"]
        ]
      }
    },
  
    "refrigerants": {
      title: "Refrigerants & Environmental Impact",
      table: {
        headers: ["Refrigerant", "GWP", "Applications", "Notes"],
        rows: [
          ["R32", "675", "Modern AC and heat pumps", "Low GWP, mildly flammable (A2L)"],
          ["R410A", "2088", "Older AC units", "Being phased out"],
          ["CO₂ (R744)", "1", "Supermarkets, eco systems", "High pressure, natural refrigerant"],
          ["R290 (Propane)", "3", "Small domestic units", "High efficiency, flammable (A3)"],
          ["R1234yf", "<1", "Automotive HVAC", "Low GWP, A2L classification"]
        ]
      }
    },
  
    "thermostat-controls": {
      title: "Thermostat & Control Systems",
      table: {
        headers: ["Control Type", "Function", "Common Use", "Notes"],
        rows: [
          ["On/Off", "Simple temp-based switching", "Basic electric heaters", "Least efficient"],
          ["Modulating", "Variable output control", "Boilers, VRF, advanced HVAC", "Smoother operation"],
          ["Programmable", "Timed on/off schedules", "Domestic heating", "User-settable programs"],
          ["Smart Thermostat", "Remote & adaptive control", "Smart homes", "Uses AI or occupancy sensing"],
          ["BMS (Building Management)", "Centralized system", "Commercial buildings", "Monitors and adjusts HVAC zones"],
          ["Zoning", "Room-by-room control", "Multi-room homes", "Each zone has its own stat/actuator"]
        ]
      }
    },
  
    "heat-pumps": {
      title: "Heat Pumps (ASHP/GSHP)",
      table: {
        headers: ["Type", "Efficiency (SCOP)", "Best Use", "Notes"],
        rows: [
          ["ASHP", "2.5–4.5", "Mild to moderate climates", "Easier install, outdoor unit"],
          ["GSHP", "3.5–5.0", "Rural / land available", "High install cost, buried loops"],
          ["Hybrid", "Gas boiler + heat pump", "Retrofitting existing systems", "Best of both worlds"],
          ["Air-to-Air", "2.5–4.0", "Direct heating/cooling", "Similar to split AC"],
          ["Air-to-Water", "2.8–4.5", "Underfloor/radiator heating", "Lower flow temps preferred"]
        ]
      }
    },
  
    "ductwork-guidelines": {
      title: "Ductwork Sizing & Insulation",
      table: {
        headers: ["Aspect", "Best Practice", "Notes"],
        rows: [
          ["Air Velocity", "≤4 m/s (supply), ≤3 m/s (return)", "Reduces noise and pressure drop"],
          ["Pressure Drop", "<1 Pa/m", "Balanced design for efficiency"],
          ["Duct Size", "Based on airflow & velocity", "Use duct calculators or software"],
          ["Insulation", "25–50mm thickness", "Avoid heat loss & condensation"],
          ["Vapour Barrier", "Required for cold ducts", "Prevents moisture ingress"],
          ["Sealing", "Class C or higher", "Prevents air leakage"]
        ]
      }
    },
  
    "commissioning": {
      title: "Commissioning Procedures",
      table: {
        headers: ["Step", "Action", "Why It Matters", "Tools/Notes"],
        rows: [
          ["Air Balancing", "Adjust dampers/registers", "Ensures correct airflow per room", "Anemometer, flow hood"],
          ["Pressure Test", "Check for duct leakage", "Confirms sealing quality", "Pressure gauge, smoke test"],
          ["Temperature Check", "Verify inlet/outlet temps", "Confirms performance", "Thermometer"],
          ["Refrigerant Check", "Confirm charge levels", "Prevents over/undercharge issues", "Manifold gauges"],
          ["Controls Test", "Cycle heating/cooling", "Verifies thermostat function", "Run through all modes"]
        ]
      }
    },
  
    "energy-efficiency": {
      title: "Energy Efficiency Ratings",
      table: {
        headers: ["Metric", "Meaning", "Typical Range", "Notes"],
        rows: [
          ["SEER", "Seasonal cooling efficiency", "3.5–8.5+", "Higher = more efficient cooling"],
          ["SCOP", "Seasonal heating efficiency", "2.5–5.5+", "Measured over heating season"],
          ["ErP Label", "EU energy rating", "A+++ to G", "Must be displayed on units"],
          ["COP", "Instantaneous performance", "2.5–4.5", "SCOP is more accurate"],
          ["EER", "Cooling at rated load", "Obsolete metric", "Replaced by SEER"]
        ]
      }
    },
  
    "fault-diagnostics": {
      title: "Common Faults & Diagnostics",
      table: {
        headers: ["Symptom", "Possible Cause", "Recommended Check", "Fix"],
        rows: [
          ["No Cooling", "Low refrigerant", "Check pressure & leaks", "Recharge and seal"],
          ["Poor Airflow", "Clogged filters", "Inspect and replace", "Clean/change filters"],
          ["High Noise", "Fan imbalance", "Inspect fan blades", "Rebalance or replace"],
          ["Water Leaks", "Blocked condensate drain", "Test drainage", "Clear or replace trap"],
          ["Short Cycling", "Thermostat fault", "Test sensor and location", "Reposition or replace"],
          ["High Power Use", "Dirty coils", "Inspect evap/condenser", "Clean with coil cleaner"]
        ]
      }
    }
  };
  
  export default hvacContent;
  