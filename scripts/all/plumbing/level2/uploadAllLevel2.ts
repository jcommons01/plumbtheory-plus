// scripts/all/plumbing/level2/uploadAllLevel2.ts

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// FIXED PATH: Go to scripts/plumbing/level2
const scriptsDir = path.resolve(__dirname, '../../../plumbing/level2');
const files = fs.readdirSync(scriptsDir);

// Match: uploadLevel2*.ts (e.g., uploadLevel2HotWater.ts)
const level2UploadScripts = files.filter(f =>
  /^uploadLevel2.*\.ts$/.test(f)
);

if (level2UploadScripts.length === 0) {
  console.log('No Level 2 upload scripts found.');
  process.exit(1);
}

console.log(`Running ${level2UploadScripts.length} Level 2 upload scripts...\n`);

for (const script of level2UploadScripts) {
  const fullPath = path.join(scriptsDir, script);
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
