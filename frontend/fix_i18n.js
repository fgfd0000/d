const fs = require('fs');

// Read the current i18n.js
const content = fs.readFileSync('h:\\LogiConnect\\frontend\\src\\i18n.js', 'utf8');
const lines = content.split('\n');

// Check lines around 52-54 and 198-200
console.log('Lines 52-55:');
for (let i = 51; i < 55; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}

console.log('\nLines 198-203:');
for (let i = 197; i < 203; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}

// Now let's add the missing keys
let newContent = content;

// Find and replace in English section
const enTarget = `       privacyPolicy: 'Privacy Policy',
       successSignup: 'Account created successfully!',`;
const enReplacement = `       privacyPolicy: 'Privacy Policy',
       by_signing_in: 'By signing in, you agree to the',
       and: 'and',
       successSignup: 'Account created successfully!',`;

newContent = newContent.replace(enTarget, enReplacement);

// Find and replace in Arabic section
const arTarget = `       privacyPolicy: 'سياسة الخصوصية',
       successSignup: 'تم إنشاء الحساب بنجاح!',`;
const arReplacement = `       privacyPolicy: 'سياسة الخصوصية',
       by_signing_in: 'بتسجيل الدخول، فإنك توافق على',
       and: 'و',
       successSignup: 'تم إنشاء الحساب بنجاح!',`;

newContent = newContent.replace(arTarget, arReplacement);

// Write back
fs.writeFileSync('h:\\LogiConnect\\frontend\\src\\i18n.js', newContent, 'utf8');
console.log('\n✓ Updated i18n.js with missing translation keys');
