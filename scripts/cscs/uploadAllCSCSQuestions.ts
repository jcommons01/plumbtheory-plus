import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// ✅ Assumes this script is saved in: scripts/CSCS/uploadAllCSCSQuestions.ts
const cscsDir = path.resolve(__dirname);

function getUploadScripts(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file =>
    file.startsWith('uploadCSCS') && file.endsWith('.ts')
  );
}

const uploadScripts = getUploadScripts(cscsDir).map(f => ({
  name: f,
  path: path.join(cscsDir, f),
}));

if (uploadScripts.length === 0) {
  console.log('No CSCS upload scripts found.');
  process.exit(1);
}

console.log(`Running ${uploadScripts.length} CSCS upload scripts...\n`);

for (const { name, path: fullPath } of uploadScripts) {
  console.log(`▶️ Running: ${name}`);

  const child = spawn('npx', ['tsx', fullPath], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Failed: ${name} (exit code ${code})`);
    } else {
      console.log(`✅ Finished: ${name}\n`);
    }
  });
}
