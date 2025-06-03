export function formatTopicTitle(id: string): string {
  let label = id;
  let levelSuffix = '';

  // Check for level at the start
  if (id.startsWith('level2-')) {
    label = id.replace('level2-', '');
    levelSuffix = ' (Level 2)';
  } else if (id.startsWith('level3-')) {
    label = id.replace('level3-', '');
    levelSuffix = ' (Level 3)';
  } else {
    // Check for infix-based level
    const levelMatch = id.match(/-l(2|3)-/);
    if (levelMatch) {
      levelSuffix = ` (Level ${levelMatch[1]})`;
      label = id.replace(`-l${levelMatch[1]}-`, '-');
    }
  }

  // Capitalise words
  const title = label
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return `${title}${levelSuffix} Quiz`;
}
