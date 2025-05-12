// ✅ RUN WITH: npx tsx scripts/all/electrical/level3/uploadAllElectricalLevel3.ts

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// ✅ Correct path to where your uploadLevel3 scripts live
const level3ScriptsDir = path.resolve(__dirname, '../../../electrical/level3');
const files = fs.readdirSync(level3ScriptsDir);

// ✅ Filter only upload scripts
const level3UploadScripts = files.filter(f =>
  /^uploadLevel3.*\.ts$/.test(f)
);

if (level3UploadScripts.length === 0) {
  console.log('❌ No Level 3 electrical upload scripts found.');
  process.exit(1);
}

console.log(`🚀 Running ${level3UploadScripts.length} Level 3 upload scripts...\n`);

for (const script of level3UploadScripts) {
  const fullPath = path.join(level3ScriptsDir, script);
  console.log(`▶️ Running: ${script}`);

  const child = spawn('npx', ['tsx', fullPath], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Failed: ${script} (exit code ${code})`);
    } else {
      console.log(`✅ Finished: ${script}\n`);
    }
  });
}
