import { readFileSync } from 'fs';
const content = readFileSync('scripts/batches/game_icons_32_batch5.ts', 'utf8');
const gridRegex = /grid:\s*\[([\s\S]*?)\]/g;
let match;
let templateIdx = 0;
let allGood = true;
while ((match = gridRegex.exec(content)) !== null) {
  templateIdx++;
  const gridBlock = match[1];
  const rows = gridBlock.match(/'([^']*)'/g);
  if (!rows) { console.log('Template ' + templateIdx + ': no rows found'); continue; }
  if (rows.length !== 32) {
    console.log('Template ' + templateIdx + ': has ' + rows.length + ' rows (need 32)');
    allGood = false;
  }
  rows.forEach((row, i) => {
    const cleaned = row.replace(/'/g, '');
    if (cleaned.length !== 32) {
      console.log('Template ' + templateIdx + ', row ' + i + ': length=' + cleaned.length + ' |' + cleaned + '|');
      allGood = false;
    }
  });
}
console.log('Total templates found: ' + templateIdx);
if (allGood) console.log('ALL GRIDS VALID: 32 rows x 32 chars each');
