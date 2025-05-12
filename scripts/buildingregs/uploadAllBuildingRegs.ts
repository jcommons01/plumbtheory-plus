import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// ✅ Assumes this file is saved at: scripts/buildingregs/uploadAllBuildingRegs.ts
const regsDir = path.resolve(__dirname);

function getUploadScripts(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file =>
    file.startsWith('uploadRegsPart') && file.endsWith('.ts')
  );
}

const uploadScripts = getUploadScripts(regsDir).map(f => ({
  name: f,
  path: path.join(regsDir, f),
}));

if (uploadScripts.length === 0) {
  console.log('No Building Regs upload scripts found.');
  process.exit(1);
}

console.log(`Running ${uploadScripts.length} Building Regs upload scripts...\n`);

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
