export type ReferenceCategory = {
    id: string;
    title: string;
    description: string;
    isPro: boolean;
    stats: {
      label: string;
      value: string;
    }[];
  };
  
  export const referenceCategories: ReferenceCategory[] = [
    {
      id: 'pipe-falls',
      title: 'Minimum Pipe Falls',
      description: 'Correct falls for waste and soil pipe installations.',
      isPro: false, // ✅ Free
      stats: [
        { label: '1.25" Waste Pipe', value: 'Minimum fall 18mm/m (1:56)' },
        { label: '1.5" Waste Pipe', value: 'Minimum fall 12mm/m (1:83)' },
        { label: '4" Soil Pipe', value: 'Minimum fall 9mm/m (1:110)' },
      ],
    },
    {
      id: 'heating-systems',
      title: 'Heating Systems',
      description: 'S-Plan, S-Plan Plus, Y-Plan, W-Plan comparisons.',
      isPro: false, // ✅ Free
      stats: [
        { label: 'S-Plan', value: '2-port motorised valves for heating and hot water' },
        { label: 'Y-Plan', value: '3-port diverter valve for heating and hot water' },
        { label: 'W-Plan', value: 'Separate flow and return circuits for each zone' },
      ],
    },
    {
      id: 'clipping-distances',
      title: 'Clipping Distances',
      description: 'Typical spacing for securing various pipe types.',
      isPro: true, // 🔒 Locked behind Pro
      stats: [
        { label: 'Copper', value: '1.2m horizontal, 1.8m vertical' },
        { label: 'Plastic', value: '0.8m horizontal, 1.2m vertical' },
        { label: 'Soil', value: '1.0m spacing, all directions' },
      ],
    },
    {
      id: 'copper',
      title: 'Copper Pipe',
      description: 'Widely used for hot and cold water systems, central heating, and gas.',
      isPro: false, // ✅ Free
      stats: [
        { label: 'Typical Sizes', value: '15mm, 22mm, 28mm, 35mm, 42mm, 54mm' },
        { label: 'Clipping Distances', value: '1.2m horizontal, 1.8m vertical' },
        { label: 'Fitting Method', value: 'Soldered (capillary), compression, or push-fit' },
        { label: 'Material Type', value: 'Metal (Copper)' },
        { label: 'Suitable For', value: 'Hot water, cold water, gas' },
      ],
    },
    {
      id: 'plastic',
      title: 'Plastic Pipe (Push-Fit/Barrier)',
      description: 'Common in domestic plumbing for flexibility and ease of installation.',
      isPro: true,
      stats: [
        { label: 'Typical Sizes', value: '15mm, 22mm, 28mm' },
        { label: 'Clipping Distances', value: '0.8m horizontal, 1.2m vertical' },
        { label: 'Fitting Method', value: 'Push-fit or mechanical fitting with inserts' },
        { label: 'Material Type', value: 'Plastic (Polybutylene, PEX)' },
        { label: 'Suitable For', value: 'Hot and cold water systems' },
      ],
    },
    {
      id: 'mdpe',
      title: 'MDPE Pipe',
      description: 'Used for underground mains water supply to buildings.',
      isPro: true,
      stats: [
        { label: 'Typical Sizes', value: '20mm, 25mm, 32mm, 50mm, 63mm' },
        { label: 'Clipping Distances', value: 'Secured at key points, minimal above ground' },
        { label: 'Fitting Method', value: 'Compression fittings or electrofusion welding' },
        { label: 'Material Type', value: 'Plastic (Medium Density Polyethylene)' },
        { label: 'Suitable For', value: 'Cold water mains (below ground)' },
      ],
    },
    {
      id: 'waste-soil',
      title: 'Waste & Soil Pipes',
      description: 'Drainage and waste water systems inside and outside buildings.',
      isPro: true,
      stats: [
        { label: 'Typical Sizes', value: '32mm, 40mm (waste), 110mm (soil)' },
        { label: 'Clipping Distances', value: '0.5m waste, 1.0m soil vertical/horizontal' },
        { label: 'Fitting Method', value: 'Solvent weld, push-fit, or compression' },
        { label: 'Material Type', value: 'uPVC (Unplasticized Polyvinyl Chloride)' },
        { label: 'Suitable For', value: 'Waste water and soil systems' },
      ],
    },
    {
      id: 'overflow',
      title: 'Overflow Pipe',
      description: 'Small bore pipes for safely discharging excess water.',
      isPro: true,
      stats: [
        { label: 'Typical Sizes', value: '21.5mm' },
        { label: 'Clipping Distances', value: '0.5m spacing recommended' },
        { label: 'Fitting Method', value: 'Push-fit or solvent weld' },
        { label: 'Material Type', value: 'PVCu (Polyvinyl Chloride Unplasticized)' },
        { label: 'Suitable For', value: 'Cisterns, tanks, boilers overflow' },
      ],
    },
  ];
  