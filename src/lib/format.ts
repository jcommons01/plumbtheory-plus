export function formatTopicTitle(slug: string): string {
  const replacements: Record<string, string> = {
    l2: 'Level 2',
    l3: 'Level 3',
    health: 'Health',
    safety: '& Safety',
    regs: 'Regulations',
    cscs: 'CSCS',
  };

  return slug
    .split('-')
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (replacements[lower]) return replacements[lower];
      return idx === 0 ? capitalize(word) : word;
    })
    .join(' ')
    .replace('Health & Safety', 'Health & Safety') // just to ensure order
    .trim();
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
