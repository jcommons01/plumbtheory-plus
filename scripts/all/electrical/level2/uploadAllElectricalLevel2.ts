// ✅ RUN WITH: npx tsx scripts/all/electrical/level2/uploadAllElectricalLevel2.ts

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// 📂 Path to your Level 2 electrical upload scripts
const level2ScriptsDir = path.resolve(__dirname, '../../../electrical/level2');
const files = fs.readdirSync(level2ScriptsDir);

// 📦 Filter for upload scripts
const level2UploadScripts = files.filter(f =>
  /^uploadLevel2.*\.ts$/.test(f)
);

if (level2UploadScripts.length === 0) {
  console.log('❌ No Level 2 electrical upload scripts found.');
  process.exit(1);
}

console.log(`🚀 Running ${level2UploadScripts.length} Level 2 electrical upload scripts...\n`);

for (const script of level2UploadScripts) {
  const fullPath = path.join(level2ScriptsDir, script);
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
