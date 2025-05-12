import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// ✅ This assumes this script is saved at: scripts/joinery/uploadAllJoineryQuestions.ts
const level2Dir = path.resolve(__dirname, 'level2');
const level3Dir = path.resolve(__dirname, 'level3');

function getUploadScripts(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file =>
    file.startsWith('uploadLevel2') || file.startsWith('uploadLevel3')
  );
}

const level2Scripts = getUploadScripts(level2Dir).map(f => ({
  name: f,
  path: path.join(level2Dir, f),
}));

const level3Scripts = getUploadScripts(level3Dir).map(f => ({
  name: f,
  path: path.join(level3Dir, f),
}));

const allScripts = [...level2Scripts, ...level3Scripts];

if (allScripts.length === 0) {
  console.log('No Level 2 or Level 3 joinery upload scripts found.');
  process.exit(1);
}

console.log(`Running ${allScripts.length} joinery upload scripts...\n`);

for (const { name, path: fullPath } of allScripts) {
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
