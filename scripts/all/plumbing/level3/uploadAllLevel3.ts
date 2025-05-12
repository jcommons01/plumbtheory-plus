// scripts/all/plumbing/level3/uploadAllLevel3.ts

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// FIXED PATH: Points to actual upload scripts in scripts/plumbing/level3
const scriptsDir = path.resolve(__dirname, '../../../plumbing/level3');

const files = fs.readdirSync(scriptsDir);

// Match files like uploadHotWaterQuestions.ts, uploadCalculationQuestions.ts, etc.
const level3UploadScripts = files.filter(f =>
  /^upload.*Questions\.ts$/.test(f)
);

if (level3UploadScripts.length === 0) {
  console.log('No Level 3 upload scripts found.');
  process.exit(1);
}

console.log(`Running ${level3UploadScripts.length} Level 3 upload scripts...\n`);

for (const script of level3UploadScripts) {
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
