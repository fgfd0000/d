import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

(async () => {
  try {
    // Run the fix i18n script
    await execAsync('node fix_i18n.js', { cwd: 'h:\\LogiConnect\\frontend' });
    console.log('✓ Fixed i18n.js');

    // Install npm dependencies
    console.log('\nInstalling npm dependencies...');
    const result = await execAsync('npm install', { cwd: 'h:\\LogiConnect\\frontend' });
    console.log(result.stdout);
    if (result.stderr && !result.stderr.includes('warning')) {
      console.error(result.stderr);
    }
    console.log('✓ npm install completed!');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
