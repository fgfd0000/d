const fs = require('fs');
const path = require('path');

const oldPath = path.join(__dirname, 'i18n.js');
const newPath = path.join(__dirname, 'i18n_new.js');
const backupPath = path.join(__dirname, 'i18n_old.js');

try {
  // Read the new file
  const newContent = fs.readFileSync(newPath, 'utf8');
  
  // Write to the old location
  fs.writeFileSync(oldPath, newContent, 'utf8');
  
  console.log('✓ Successfully updated i18n.js');
  
  // Clean up
  if (fs.existsSync(newPath)) {
    fs.unlinkSync(newPath);
    console.log('✓ Cleaned up temporary file');
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
