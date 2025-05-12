export const tradeGuideData = {
    plumbing: {
      label: "Plumbing",
      description: "Explore categories like system diagrams, pipework, and regulations.",
      categories: [
        {
          id: "pipe-sizes",
          title: "Pipe Sizes & Clipping Distances",
          description: "Copper, plastic, steel pipe sizes with recommended clipping distances.",
        },
        {
          id: "fitting-types",
          title: "Fitting Types & Identification",
          description: "Compression, push-fit, solvent weld, press-fit — where and how to use them.",
          isPro: true,
        },
        {
          id: "heating-systems",
          title: "Heating System Types",
          description: "S-Plan, Y-Plan, W-Plan, Gravity-fed — system layout and component list.",
          isPro: true,
        },
        {
          id: "hot-cold-components",
          title: "Hot & Cold Water System Components",
          description: "Unvented vs vented, expansion vessels, tundish, TPRVs, and safety setups.",
          isPro: true,

        },
        {
          id: "pipework-guidelines",
          title: "Pipework Installation Guidelines",
          description: "Burial depths, wall sleeving, support spacing, and thermal movement allowances.",
          isPro: true,
        },
        {
          id: "water-regulations",
          title: "Water Regulations",
          description: "Fluid categories, backflow prevention, RPZs, and notification requirements.",
          isPro: true,
        },
        {
          id: "flow-sizing",
          title: "Flow Rates & Sizing",
          description: "Minimum flow per fixture, shower pressure rules, aerators and restrictors.",
          isPro: true,
        },
        {
          id: "faults-fixes",
          title: "Common Faults & Fixes",
          description: "Quick solutions for no hot water, poor flow, leaking tundish, and more.",
          isPro: true,
        },
        {
          id: "pipe-identification",
          title: "Color Coding & Pipe Identification",
          description: "Pipe labeling, sleeving colors, and flow vs return ID rules.",
          isPro: true,
        },
        {
          id: "conversion-tables",
          title: "Conversion Tables",
          description: "Bar to psi, litres per second to l/min, mm to inches for pipework.",
          isPro: true,
        },
        {
          id: "boiler-types",
          title: "Boiler Types & Best Uses",
          description: "Combi, system, heat-only, condensing, and electric boiler setups and use cases.",
          isPro: true,
        },
      ],
    },
  
    gas: {
      label: "Gas",
      description: "Ventilation, flues, appliance testing, ID/AR risks, and pipe sizing.",
      categories: [
        {
          id: "ventilation-requirements",
          title: "Ventilation Requirements",
          description: "Minimum ventilation free area and room sizing for different gas appliance types.",
        },
        {
          id: "flueing-requirements",
          title: "Flueing Requirements",
          description: "Types of flue systems, terminal positioning, and inspection points.",
          isPro: true,
        },
        {
          id: "tightness-testing",
          title: "Tightness Testing & Purging",
          description: "Step-by-step process for domestic gas pipework — let-by, strength, tightness.",
          isPro: true,
        },
        {
          id: "combustion-analysis",
          title: "Combustion Analysis",
          description: "Interpreting CO/CO₂ ratios, flue gas analysis tolerances, and safe operating limits.",
          isPro: true,
        },
        {
          id: "gas-appliance-types",
          title: "Gas Appliance Types",
          description: "Open flue, room-sealed, flueless — where and how each type is used.",
          isPro: true,
        },
        {
          id: "unsafe-situations",
          title: "Unsafe Situations (ID/AR)",
          description: "Definitions, warning notices, and actions for Immediately Dangerous or At Risk scenarios.",
          isPro: true,
        },
        {
          id: "pipe-sizing-gas",
          title: "Gas Pipe Sizing",
          description: "Calculating correct pipe diameter, equivalent lengths, and pressure drop allowances.",
          isPro: true,
        },
        {
          id: "working-pressure-checks",
          title: "Working Pressure & Operating Pressure",
          description: "Expected inlet/outlet readings at meters and appliances, and how to interpret results.",
          isPro: true,
        },
        {
          id: "tightness-drop-limits",
          title: "Allowable Pressure Drops",
          description: "Acceptable pressure drop limits during tightness testing for different meter types.",
          isPro: true,
        },
        {
          id: "installation-defects",
          title: "Installation Defects",
          description: "Common non-compliances like lack of bonding, missing test points, or incorrect termination.",
          isPro: true,
        },
      ],
    },
  
    electrical: {
      label: "Electrical",
      description: "Circuits, cable sizing, testing, safety signage, and zoning rules.",
      categories: [
        {
          id: "circuit-types",
          title: "Circuit Types & Applications",
          description: "Ring, radial, lighting, and spurs — where and how they are used.",
        },
        {
          id: "wiring-systems",
          title: "Wiring Systems & Enclosures",
          description: "Twin & earth, SWA, trunking, conduit — IP ratings and use cases.",
          isPro: true,
        },
        {
          id: "cable-sizing",
          title: "Cable Sizing & Current Ratings",
          description: "How to calculate conductor sizes based on load, length, and installation method.",
          isPro: true,
        },
        {
          id: "earthing-bonding",
          title: "Earthing & Bonding",
          description: "Main bonding, supplementary bonding, and types of earthing systems (TN-S, TN-C-S, TT).",
          isPro: true,
        },
        {
          id: "breaker-types",
          title: "MCBs, RCDs & RCBOs",
          description: "What each device protects against and where they should be used.",
          isPro: true,
        },
        {
          id: "testing-procedures",
          title: "Inspection & Testing Procedures",
          description: "IR testing, continuity, loop impedance, RCD tests — with acceptable limits.",
          isPro: true,
        },
        {
          id: "voltages-frequencies",
          title: "UK Voltage & Frequency Standards",
          description: "Standard UK supply parameters, tolerances, and single vs three-phase basics.",
          isPro: true,
        },
        {
          id: "safety-signage",
          title: "Electrical Safety Signage & Colours",
          description: "Meaning of common warning signs and standard cable core colours.",
          isPro: true,
        },
        {
          id: "zoning-regulations",
          title: "Bathroom & Kitchen Zoning",
          description: "IP ratings and permitted accessory placement within wet zones.",
          isPro: true,
        },
        {
          id: "electrical-defects",
          title: "Common Installation Defects",
          description: "Loose terminals, overloading, undersized cables, and poor enclosure protection.",
          isPro: true,
        },
      ],
    },
  
    hvac: {
      label: "HVAC",
      description: "System types, airflow, refrigerants, control stats, and fault diagnostics.",
      categories: [
        {
          id: "system-types",
          title: "HVAC System Types",
          description: "Split, multi-split, VRF/VRV, packaged systems — common applications and layouts.",
        },
        {
          id: "ventilation-rates",
          title: "Ventilation Rates & Air Changes",
          description: "UK recommended ACH (air changes per hour) for various room types.",
          isPro: true,
        },
        {
          id: "filters-types",
          title: "Filter Types & MERV Ratings",
          description: "G4, M5, F7, HEPA — what they filter, where they’re used, and maintenance intervals.",
          isPro: true,
        },
        {
          id: "refrigerants",
          title: "Refrigerants & Environmental Impact",
          description: "R32, R410A, CO₂ — global warming potential (GWP) and safe handling notes.",
          isPro: true,
        },
        {
          id: "thermostat-controls",
          title: "Thermostat & Control Systems",
          description: "On/off, modulating, programmable stats — plus BMS & zoning basics.",
          isPro: true,
        },
        {
          id: "heat-pumps",
          title: "Heat Pumps (ASHP/GSHP)",
          description: "How air source and ground source systems work — pros, cons, and typical efficiencies.",
          isPro: true,
        },
        {
          id: "ductwork-guidelines",
          title: "Ductwork Sizing & Insulation",
          description: "Velocity targets, pressure loss, and thermal insulation rules.",
          isPro: true,
        },
        {
          id: "commissioning",
          title: "Commissioning Procedures",
          description: "Steps for air balancing, pressure testing, and verifying performance.",
          isPro: true,
        },
        {
          id: "energy-efficiency",
          title: "Energy Efficiency Ratings",
          description: "SEER, SCOP, ErP labels — interpreting system performance.",
          isPro: true,
        },
        {
          id: "fault-diagnostics",
          title: "Common Faults & Diagnostics",
          description: "Symptoms, probable causes, and checks for underperformance or failure.",
          isPro: true,
        },
      ],
    },
  
    joinery: {
      label: "Joinery",
      description: "Timber types, doors, windows, joints, finishes, and regulations.",
      categories: [
        {
          id: "timber-types",
          title: "Timber Types & Uses",
          description: "Hardwood vs softwood, common species, and where they’re best suited.",
        },
        {
          id: "moisture-content",
          title: "Moisture Content Standards",
          description: "Acceptable % for internal joinery, kiln-drying vs air-drying, and BS tolerances.",
          isPro: true,
        },
        {
          id: "fixings-and-fasteners",
          title: "Fixings & Fasteners",
          description: "Screws, nails, bolts, adhesives — when and where to use them in joinery.",
          isPro: true,
        },
        {
          id: "door-fitting",
          title: "Door Fitting Standards",
          description: "Hinge positioning, standard gaps, and adjustments for seasonal movement.",
          isPro: true,
        },
        {
          id: "window-components",
          title: "Window Types & Components",
          description: "Casement, sash, stormproof — plus key terms like mullion, transom, cill.",
          isPro: true,
        },
        {
          id: "staircase-parts",
          title: "Staircase Components",
          description: "Tread, riser, string, balustrade — terms and typical dimensions.",
          isPro: true,
        },
        {
          id: "joint-types",
          title: "Common Timber Joints",
          description: "Mortise & tenon, halving, dovetail, biscuit — strengths and use cases.",
          isPro: true,
        },
        {
          id: "finishes-and-treatments",
          title: "Timber Finishes & Treatments",
          description: "Oil, wax, varnish, paint, preservatives — protection vs aesthetics.",
          isPro: true,
        },
        {
          id: "site-measurements",
          title: "Site Measuring & Scribing",
          description: "Best practices for accurate fitting and working around irregular surfaces.",
          isPro: true,
        },
        {
          id: "building-regulations-joinery",
          title: "Building Regs for Joinery",
          description: "Approved Document M, fire door requirements, handrail & balustrade rules.",
          isPro: true,
        },
      ],
    },
  
    bricklaying: {
      label: "Bricklaying",
      description: "Bonds, bricks, mortar, DPCs, defects, scaffolding, and cavity walls.",
      categories: [
        {
          id: "brick-types",
          title: "Brick & Block Types",
          description: "Common, facing, engineering bricks — plus aerated, dense, and lightweight blocks.",
        },
        {
          id: "bond-patterns",
          title: "Brick Bonds & Patterns",
          description: "Stretcher, English, Flemish, header, stack — where and why they’re used.",
          isPro: true,
        },
        {
          id: "mortar-mixes",
          title: "Mortar Mix Ratios",
          description: "Cement/lime/sand ratios for different strength classes and applications.",
          isPro: true,
        },
        {
          id: "dpc-requirements",
          title: "Damp-Proof Course (DPC) Requirements",
          description: "DPC types, minimum height, overlapping rules, and placement standards.",
          isPro: true,
        },
        {
          id: "cavity-wall-details",
          title: "Cavity Wall Construction",
          description: "Wall ties, insulation positioning, weep holes, and minimum cavity sizes.",
          isPro: true,
        },
        {
          id: "tolerances",
          title: "Brickwork Tolerances & Levels",
          description: "Permissible deviations in plumb, level, and gauge — per NHBC/BS standards.",
          isPro: true,
        },
        {
          id: "movement-joints",
          title: "Movement Joints in Brickwork",
          description: "When they’re required, spacing, sealant types, and joint detailing.",
          isPro: true,
        },
        {
          id: "tool-names",
          title: "Bricklaying Tools & Their Uses",
          description: "Trowel, jointer, spirit level, bolster, line pins — and what each one does.",
          isPro: true,
        },
        {
          id: "scaffolding",
          title: "Scaffolding & Access Safety",
          description: "Basic scaffold components, inspection rules, and safe working heights.",
          isPro: true,
        },
        {
          id: "construction-defects",
          title: "Common Defects in Brickwork",
          description: "Efflorescence, misalignment, poor joint finish, cold bridging — causes and fixes.",
          isPro: true,
        },
      ],
    }
  };
  