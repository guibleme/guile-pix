import fs from 'node:fs';
const src = fs.readFileSync('scripts/batches/game_icons_32_batch1.ts', 'utf8');
const gridRe = /grid:\s*\[([\s\S]*?)\]/g;
const idRe = /id:\s*'([^']+)'/g;
const ids = [];
let m;
while ((m = idRe.exec(src)) != null) ids.push(m[1]);
let gi = 0;
let totalErr = 0;
while ((m = gridRe.exec(src)) != null) {
  const rows = (m[1].match(/'([^']+)'/g) || []).map(function(x) { return x.slice(1, -1); });
  let e = 0;
  if (rows.length != 32) { console.log('ROWS ' + ids[gi] + ' ' + rows.length); e++; }
  for (let j = 0; j < rows.length; j++) {
    if (rows[j].length != 32) { console.log('LEN ' + ids[gi] + ' r' + j + ' ' + rows[j].length + ' [' + rows[j] + ']'); e++; }
  }
  let o = 0;
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] == '.') continue;
      let n = 0;
      if (y > 0 && rows[y-1] && rows[y-1][x] != '.') n++;
      if (y+1 < rows.length && rows[y+1] && rows[y+1][x] != '.') n++;
      if (x > 0 && rows[y][x-1] != '.') n++;
      if (x+1 < rows[y].length && rows[y][x+1] != '.') n++;
      if (n == 0) { console.log('ORP ' + ids[gi] + ' ' + x + ',' + y + '=' + rows[y][x]); o++; }
    }
  }
  const px = rows.reduce(function(s, r) { return s + r.replace(/\./g, '').length; }, 0);
  console.log(ids[gi] + ' r=' + rows.length + ' px=' + px + ' o=' + o + (e ? ' ERR=' + e : ' OK'));
  totalErr += e + o;
  gi++;
}
console.log('---');
console.log('Templates: ' + ids.length);
console.log('Errors: ' + totalErr);
