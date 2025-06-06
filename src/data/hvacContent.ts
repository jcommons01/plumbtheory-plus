const hvacContent = {
  "system-types": {
    title: "HVAC System Types",
    table: {
      headers: ["System Type", "Components", "Use Case", "Notes"],
      rows: [
        ["Split System", "Indoor unit + outdoor condenser", "Single room or small space", "Common in residential systems"],
        ["Multi-Split", "Multiple indoor units + one outdoor", "Flats, offices, zoned spaces", "Independent room control"],
        ["VRF / VRV", "Indoor units + inverter-driven compressor", "Large buildings", "High efficiency, scalable zones"],
        ["Packaged System", "All-in-one rooftop unit", "Shops, schools, commercial", "Requires duct network"],
        ["Chilled Water System", "Chiller, air handlers, pumps", "Hospitals, large offices", "Uses water loop instead of refrigerant"]
      ]
    }
  },

  "ventilation-rates": {
    title: "Ventilation Rates & Air Changes",
    table: {
      headers: ["Room Type", "Recommended ACH", "Purpose", "Notes"],
      rows: [
        ["Living Room", "4–6 ACH", "Comfort and IAQ", "CIBSE Guide B2 recommendation"],
        ["Kitchen", "8–15 ACH", "Grease, steam, odour removal", "Mechanical extraction preferred"],
        ["Bathroom", "6–10 ACH", "Humidity & mould control", "Extractor fan or MEV/HRV"],
        ["Office", "6–10 ACH", "Occupant health/productivity", "Based on CO₂ limits (~800ppm)"],
        ["Workshop", "10–20 ACH", "Dust, fumes", "Local extract may be required"],
        ["Classroom", "5–8 ACH", "Cognitive support", "BB101 (2022) standard"]
      ]
    }
  },

  "filters-types": {
    title: "Filter Types & MERV Ratings",
    table: {
      headers: ["Filter Grade", "Particle Size Removed", "Typical Use", "Replacement Interval"],
      rows: [
        ["G4", ">10μm", "Pre-filter / coarse dust", "3–6 months"],
        ["M5", "3–10μm", "Office/general commercial", "6 months"],
        ["F7", "1–3μm", "Healthcare, fine dust", "6–12 months"],
        ["HEPA (H13+)", "≥99.95% @ 0.3μm", "Cleanrooms, medical", "12–18 months"],
        ["Carbon", "Odours & VOCs", "Kitchens, labs, smoking areas", "6–12 months (loading dependent)"]
      ]
    }
  },

  "refrigerants": {
    title: "Refrigerants & Environmental Impact",
    table: {
      headers: ["Refrigerant", "GWP", "Applications", "Notes"],
      rows: [
        ["R32", "675", "Modern splits and heat pumps", "Low GWP, A2L mildly flammable"],
        ["R410A", "2088", "Legacy systems", "High GWP — phased out under F-Gas rules"],
        ["CO₂ (R744)", "1", "Supermarkets, cold stores", "Natural refrigerant, very high pressure"],
        ["R290 (Propane)", "3", "Small domestic units", "Efficient, A3 flammable"],
        ["R1234yf", "<1", "Automotive AC", "A2L, low-GWP replacement for R134a"]
      ]
    }
  },

  "thermostat-controls": {
    title: "Thermostat & Control Systems",
    table: {
      headers: ["Control Type", "Function", "Common Use", "Notes"],
      rows: [
        ["On/Off", "Simple temperature switching", "Fan heaters, basic HVAC", "Inefficient"],
        ["Modulating", "Variable output control", "Boilers, VRF", "Reduces energy use"],
        ["Programmable", "Timed on/off schedules", "Domestic heating", "Custom setpoints"],
        ["Smart Thermostat", "Remote & adaptive control", "Modern homes", "Integrates with apps & sensors"],
        ["BMS / BEMS", "Building-wide control", "Commercial buildings", "Monitors multiple zones"],
        ["Zoning", "Independent room control", "Larger homes or offices", "Each with dedicated actuator/stat"]
      ]
    }
  },

  "heat-pumps": {
    title: "Heat Pumps (ASHP/GSHP)",
    table: {
      headers: ["Type", "Efficiency (SCOP)", "Best Use", "Notes"],
      rows: [
        ["ASHP", "2.5–4.5", "Urban/suburban", "Lower install cost, best with insulation"],
        ["GSHP", "3.5–5.0", "Rural, space available", "High install cost, stable efficiency"],
        ["Hybrid", "Gas + heat pump", "Retrofit systems", "Reduces boiler reliance"],
        ["Air-to-Air", "2.5–4.0", "Direct room heating", "Ideal for small/medium spaces"],
        ["Air-to-Water", "2.8–4.5", "Radiators/UFH", "Lower flow temps needed (~35–45°C)"]
      ]
    }
  },

  "ductwork-guidelines": {
    title: "Ductwork Sizing & Insulation",
    table: {
      headers: ["Aspect", "Best Practice", "Notes"],
      rows: [
        ["Air Velocity", "≤4 m/s (supply), ≤3 m/s (return)", "Minimises noise & pressure drop"],
        ["Pressure Drop", "≤1 Pa/m", "Balanced across system"],
        ["Duct Size", "Based on airflow & velocity", "Use CIBSE Guide C or calculators"],
        ["Insulation", "25–50mm foil-faced", "Prevents heat gain/loss"],
        ["Vapour Barrier", "Required for cool air ducts", "Avoids condensation risk"],
        ["Sealing", "Class C (min)", "Per DW/144 for leakage control"]
      ]
    }
  },

  "commissioning": {
    title: "Commissioning Procedures",
    table: {
      headers: ["Step", "Action", "Why It Matters", "Tools/Notes"],
      rows: [
        ["Air Balancing", "Adjust diffusers/dampers", "Even air delivery", "Use anemometer or hood"],
        ["Pressure Test", "Leak check ductwork", "Efficiency & compliance", "Use pressure gauge/smoke"],
        ["Temperature Check", "Check delta-T", "Verify coil performance", "Thermometer, IR gun"],
        ["Refrigerant Check", "Check superheat/subcool", "Correct charge", "Manifold gauges"],
        ["Controls Test", "Cycle all modes", "Ensure full operation", "Verify against spec/sequence"]
      ]
    }
  },

  "energy-efficiency": {
    title: "Energy Efficiency Ratings",
    table: {
      headers: ["Metric", "Meaning", "Typical Range", "Notes"],
      rows: [
        ["SEER", "Seasonal cooling efficiency", "3.5–8.5+", "Higher = more efficient"],
        ["SCOP", "Seasonal heating efficiency", "2.5–5.5+", "Seasonally averaged COP"],
        ["ErP Label", "EU efficiency label", "A+++ to G", "Required for sales in UK"],
        ["COP", "Instant heating/cooling ratio", "2.5–4.5", "SCOP is better metric"],
        ["EER", "Rated load cooling", "Legacy metric", "Replaced by SEER"]
      ]
    }
  },

  "fault-diagnostics": {
    title: "Common Faults & Diagnostics",
    table: {
      headers: ["Symptom", "Possible Cause", "Recommended Check", "Fix"],
      rows: [
        ["No Cooling", "Low refrigerant", "Check system pressure", "Locate & seal leak, recharge"],
        ["Poor Airflow", "Dirty filters", "Inspect and measure flow", "Replace filters"],
        ["High Noise", "Fan imbalance", "Check alignment/mounts", "Rebalance or replace"],
        ["Water Leaks", "Clogged drain line", "Check trap and outlet", "Clear/flush drain"],
        ["Short Cycling", "Control issue", "Check stat location/settings", "Adjust/reposition"],
        ["High Power Use", "Dirty condenser", "Inspect coils", "Clean with appropriate tools"]
      ]
    }
  }
};

export default hvacContent;
