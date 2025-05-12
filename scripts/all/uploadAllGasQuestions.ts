import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// 🔧 FIX: Correct path to the gas upload scripts folder
const gasScriptsDir = path.resolve(__dirname, '../gas');
const files = fs.readdirSync(gasScriptsDir);

const gasUploadScripts = files.filter(f =>
  /^uploadGas.*Questions\.ts$/.test(f)
);

if (gasUploadScripts.length === 0) {
  console.log('No gas upload scripts found.');
  process.exit(1);
}

console.log(`Running ${gasUploadScripts.length} gas upload scripts...\n`);

for (const script of gasUploadScripts) {
  const fullPath = path.join(gasScriptsDir, script);
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
