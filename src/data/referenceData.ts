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
      isPro: false,
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
      isPro: false,
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
      isPro: true, // 🔒 Pro only
      stats: [
        { label: 'Copper', value: '1.2m horizontal, 1.8m vertical' },
        { label: 'Plastic', value: '0.8m horizontal, 1.2m vertical' },
        { label: 'Soil', value: '1.0m spacing, all directions' },
      ],
    },
    {
      id: 'copper',
      title: 'Copper Pipe',
      description: 'Used for hot/cold water, central heating, and gas.',
      isPro: false,
      stats: [
        { label: 'Sizes', value: '15mm, 22mm, 28mm, 35mm, 42mm, 54mm' },
        { label: 'Clipping', value: '1.2m horizontal, 1.8m vertical' },
        { label: 'Fitting', value: 'Solder, compression, push-fit' },
      ],
    },
    {
      id: 'plastic',
      title: 'Plastic Pipe',
      description: 'Flexible piping used in domestic plumbing.',
      isPro: true,
      stats: [
        { label: 'Sizes', value: '15mm, 22mm, 28mm' },
        { label: 'Clipping', value: '0.8m horizontal, 1.2m vertical' },
      ],
    },
    {
      id: 'mdpe',
      title: 'MDPE Pipe',
      description: 'Used for underground mains water.',
      isPro: true,
      stats: [
        { label: 'Sizes', value: '20mm to 63mm' },
        { label: 'Use', value: 'Underground cold mains' },
      ],
    },
    {
      id: 'waste-soil',
      title: 'Waste & Soil Pipes',
      description: 'Drainage and soil systems.',
      isPro: true,
      stats: [
        { label: 'Sizes', value: '32mm, 40mm, 110mm' },
        { label: 'Clipping', value: '0.5m (waste), 1.0m (soil)' },
      ],
    },
    {
      id: 'overflow',
      title: 'Overflow Pipe',
      description: 'Discharges excess water from systems.',
      isPro: true,
      stats: [
        { label: 'Size', value: '21.5mm' },
        { label: 'Clipping', value: '0.5m spacing' },
      ],
    },
  ];
  