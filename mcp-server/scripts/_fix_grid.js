import { readFileSync, writeFileSync } from 'fs';

const filePath = 'scripts/batches/game_icons_32_batch5.ts';
const content = readFileSync(filePath, 'utf8');

// Fix all grid rows: pad or trim to exactly 32 chars
const fixed = content.replace(/grid:\s*\[([\s\S]*?)\]/g, (match, gridBlock) => {
  const rows = [];
  const lines = gridBlock.split('\n');
  for (const line of lines) {
    const m = line.match(/^(\s*)'([^']*)'(.*)/);
    if (m) {
      let row = m[2];
      if (row.length < 32) {
        // Insert dots before trailing dots at end to reach 32
        // Find the last non-dot char position
        let lastContent = -1;
        for (let i = row.length - 1; i >= 0; i--) {
          if (row[i] !== '.') { lastContent = i; break; }
        }
        // Pad with dots at the end
        while (row.length < 32) row += '.';
      } else if (row.length > 32) {
        // Trim trailing dots
        row = row.substring(0, 32);
      }
      rows.push(m[1] + "'" + row + "'" + m[3]);
    } else {
      rows.push(line);
    }
  }
  return 'grid: [\n' + rows.join('\n') + ']';
});

writeFileSync(filePath, fixed);
console.log('Fixed grid rows in ' + filePath);
