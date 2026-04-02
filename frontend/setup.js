#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

async function main() {
  try {
    // First, update i18n files
    const srcDir = path.join(__dirname, 'src');
    const newPath = path.join(srcDir, 'i18n_new.js');
    const oldPath = path.join(srcDir, 'i18n.js');
    
    if (fs.existsSync(newPath) && fs.existsSync(oldPath)) {
      const newContent = fs.readFileSync(newPath, 'utf8');
      fs.writeFileSync(oldPath, newContent, 'utf8');
      fs.unlinkSync(newPath);
      console.log('✓ Updated i18n.js with correct translation keys');
    }
    
    // Install npm dependencies
    console.log('Installing npm dependencies...');
    const { stdout, stderr } = await execPromise('npm install', { cwd: __dirname });
    
    if (stderr) {
      console.log('npm output:', stderr);
    }
    
    console.log('✓ npm install completed successfully');
    console.log('\nNext steps:');
    console.log('1. Run: npm start');
    console.log('2. Test the app in your browser');
    console.log('3. Try switching languages (EN/Arabic)');
    console.log('4. Verify RTL layout works with Arabic');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
