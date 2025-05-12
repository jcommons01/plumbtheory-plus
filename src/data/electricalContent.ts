const electricalContent = {
    "circuit-types": {
      title: "Circuit Types & Applications",
      table: {
        headers: ["Circuit Type", "Description", "Typical Use", "Notes"],
        rows: [
          ["Ring Final", "Looped circuit from CU back to CU", "Sockets in domestic properties", "Requires 2.5mm² cable, protected by 32A MCB"],
          ["Radial", "One continuous circuit from CU to end point", "Small kitchens, sheds, lighting", "Simpler layout, sizing based on load"],
          ["Lighting", "1mm² or 1.5mm² cable with loop-in at ceiling rose", "Ceiling or wall lighting", "Protected by 6A MCB"],
          ["Spur", "Branch off main ring or radial", "Extra socket or FCU", "Fused at 13A max, check existing circuit loading"],
          ["Cooker Circuit", "Dedicated radial with isolation switch", "Electric cookers and hobs", "Often 6mm² cable, 32A MCB"]
        ]
      }
    },
  
    "wiring-systems": {
      title: "Wiring Systems & Enclosures",
      table: {
        headers: ["System", "IP Rating", "Where Used", "Notes"],
        rows: [
          ["Twin & Earth (T&E)", "IP20", "Internal walls and ceilings", "Flat grey PVC sheath, not UV/stress resistant"],
          ["SWA (Steel Wire Armoured)", "IP65–IP68", "Underground and external", "Mechanically protected, earthed armouring"],
          ["PVC Trunking", "IP30–IP44", "Surface internal cable runs", "Easily accessible for future work"],
          ["Conduit (PVC/Steel)", "IP40–IP67", "Exposed runs, commercial/industrial", "Steel conduit must be earthed"],
          ["Flexible Cable", "Varies", "Appliances, lighting pendants", "Check load capacity and insulation"]
        ]
      }
    },
  
    "cable-sizing": {
      title: "Cable Sizing & Current Ratings",
      table: {
        headers: ["Cable Size", "Max Current (A)", "Typical Usage", "Notes"],
        rows: [
          ["1.0mm²", "11–14A", "Lighting", "Use 6A or 10A MCB"],
          ["1.5mm²", "14–20A", "Lighting/Small radial", "Use 10A or 16A MCB"],
          ["2.5mm²", "20–27A", "Sockets (ring)", "32A MCB (ring final)"],
          ["4.0mm²", "27–36A", "Cooker/High-load radial", "Allow for de-rating factors"],
          ["6.0mm²", "32–47A", "Cookers, showers", "Use 32A or 40A MCB"],
          ["10.0mm²", "43–63A", "Electric showers, submains", "Voltage drop over distance matters"]
        ]
      }
    },
  
    "earthing-bonding": {
      title: "Earthing & Bonding",
      table: {
        headers: ["Type", "Purpose", "Cable Size", "Notes"],
        rows: [
          ["Main Earthing", "Connects installation to earth", "16mm² (typical)", "Linked at consumer unit"],
          ["Main Bonding", "Connects water/gas to earth", "10mm² (typical)", "Must be within 600mm of service entry"],
          ["Supplementary Bonding", "Links exposed conductive parts", "4mm² (min)", "Used in bathrooms where RCD not present"],
          ["TN-S", "Earth via supply sheath", "Reliable earth", "Older systems"],
          ["TN-C-S", "Combined neutral/earth (PME)", "Common modern setup", "Extra bonding needed"],
          ["TT", "Earth rod on-site", "High RCD dependency", "Used in rural or temp supplies"]
        ]
      }
    },
  
    "breaker-types": {
      title: "MCBs, RCDs & RCBOs",
      table: {
        headers: ["Device", "Function", "Typical Rating", "Use Case"],
        rows: [
          ["MCB", "Overcurrent protection", "6A–40A", "Lighting, sockets, cookers"],
          ["RCD", "Detects earth leakage", "30mA (typical)", "Whole board or circuits"],
          ["RCBO", "Combined MCB + RCD", "Various", "Individual circuit protection"],
          ["SPD", "Surge protection", "N/A", "Protects against transient voltage"],
          ["AFDD", "Arc fault detection", "N/A", "Fire protection, required in some cases"]
        ]
      }
    },
  
    "testing-procedures": {
      title: "Inspection & Testing Procedures",
      table: {
        headers: ["Test", "Purpose", "Acceptable Result", "Notes"],
        rows: [
          ["IR Test", "Insulation Resistance", ">1 MΩ", "Test between L-N, L-E, N-E"],
          ["Continuity", "Ring/earth conductors", "Low ohms, near equal", "Use low resistance ohmmeter"],
          ["Loop Impedance", "Zs total", "Within max Zs table values", "Confirms disconnection time"],
          ["RCD Test", "Trip speed", "<300ms at 1×, <40ms at 5×", "Use test button and meter"],
          ["Polarity", "Correct connections", "L to L, N to N, E to E", "Visual + test verification"]
        ]
      }
    },
  
    "voltages-frequencies": {
      title: "UK Voltage & Frequency Standards",
      table: {
        headers: ["Parameter", "Nominal Value", "Tolerance", "Notes"],
        rows: [
          ["Voltage (Single Phase)", "230V", "+10% / -6%", "198V to 253V acceptable"],
          ["Voltage (Three Phase)", "400V", "+10% / -6%", "346V to 440V acceptable"],
          ["Frequency", "50Hz", "±1%", "Stays between 49–51Hz"],
          ["Supply Type", "AC", "50Hz sinusoidal", "Via DNO"],
          ["Earthing", "TN-S / TN-C-S / TT", "Varies by location", "Must be confirmed on EICR"]
        ]
      }
    },
  
    "safety-signage": {
      title: "Electrical Safety Signage & Colours",
      table: {
        headers: ["Item", "Meaning", "Colour", "Notes"],
        rows: [
          ["Live Conductor", "Line (L)", "Brown", "Previously Red"],
          ["Neutral Conductor", "Return path", "Blue", "Previously Black"],
          ["Earth Conductor", "Safety path", "Green/Yellow", "Same as before"],
          ["Warning Sign", "Danger of death", "Yellow triangle", "High voltage signage"],
          ["Prohibition Sign", "Do not switch", "Red circle", "Used during maintenance"],
          ["Information Sign", "Important safety info", "Blue circle", "PPE or access rules"]
        ]
      }
    },
  
    "zoning-regulations": {
      title: "Bathroom & Kitchen Zoning",
      table: {
        headers: ["Zone", "Permitted Equipment", "IP Rating Required", "Notes"],
        rows: [
          ["Zone 0", "SELV ≤12V", "IPX7", "Inside bath or shower tray"],
          ["Zone 1", "Shower heads/lights", "IPX4 or IPX5", "Up to 2.25m height"],
          ["Zone 2", "Luminaires, fans", "IPX4", "0.6m beyond Zone 1"],
          ["Outside Zones", "Sockets, switches", "Standard", "RCD protection still needed"],
          ["Kitchens", "Sockets min 300mm from sink", "N/A", "Avoid splash areas"]
        ]
      }
    },
  
    "electrical-defects": {
      title: "Common Installation Defects",
      table: {
        headers: ["Defect", "Cause", "Risk", "Remedy"],
        rows: [
          ["Loose Terminals", "Improper tightening", "Overheating, arcing", "Torque test, retighten"],
          ["Overloading", "Too many appliances", "Cable overheating", "Recalculate and upgrade"],
          ["Undersized Cable", "Incorrect design", "Excessive voltage drop", "Re-wire with correct size"],
          ["Poor Enclosure", "Damaged or open box", "Electric shock risk", "Replace or seal properly"],
          ["Missing CPC", "Cut or disconnected", "No fault path", "Must be rewired"],
          ["Unlabelled Board", "Lack of ID", "User confusion", "Clearly label all MCBs/RCDs"]
        ]
      }
    }
  };
  
  export default electricalContent;
  