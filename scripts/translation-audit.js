#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load translation files
const enTranslations = JSON.parse(fs.readFileSync('./localization/en.json', 'utf8'));
const arTranslations = JSON.parse(fs.readFileSync('./localization/ar.json', 'utf8'));

// Flatten nested objects to get all keys
function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(flattenKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const availableKeys = new Set(flattenKeys(enTranslations));
const usedKeys = new Set();
const missingKeys = [];
const problematicFiles = [];

// Function to extract t() calls from file content
function extractTCalls(content, filePath) {
  // Match t('key'), t("key"), and t(`key`) with potential interpolation
  const regex = /t\(['"`]([^'"`]+)['"`](?:\s*,\s*\{[^}]*\})?\)/g;
  let match;
  const fileKeys = [];
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    fileKeys.push(key);
    usedKeys.add(key);
    
    if (!availableKeys.has(key)) {
      missingKeys.push({
        key,
        file: filePath,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
  
  return fileKeys;
}

// Function to recursively scan directories
function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const keys = extractTCalls(content, filePath);
        
        if (keys.length > 0) {
          console.log(`📱 ${filePath.replace('./screens/', '')}:`);
          keys.forEach(key => {
            const exists = availableKeys.has(key);
            console.log(`  ${exists ? '✅' : '❌'} ${key}`);
          });
          console.log('');
        }
      } catch (error) {
        problematicFiles.push({ file: filePath, error: error.message });
      }
    }
  }
}

console.log('🔍 TRANSLATION KEY AUDIT REPORT\n');
console.log('=' .repeat(50));
console.log('');

// Scan all screens
console.log('📱 SCANNING SCREENS FOR t() FUNCTION CALLS:\n');
scanDirectory('./screens');

// Check components too for completeness
console.log('🧩 SCANNING COMPONENTS FOR t() FUNCTION CALLS:\n');
scanDirectory('./components');

console.log('=' .repeat(50));
console.log('📊 SUMMARY REPORT:\n');

// Missing translations
if (missingKeys.length > 0) {
  console.log('❌ MISSING TRANSLATION KEYS:');
  missingKeys.forEach(({ key, file, line }) => {
    console.log(`  • "${key}" in ${file}:${line}`);
  });
  console.log('');
} else {
  console.log('✅ No missing translation keys found!\n');
}

// Check for unused translations
const unusedKeys = [];
for (const key of availableKeys) {
  if (!usedKeys.has(key)) {
    unusedKeys.push(key);
  }
}

if (unusedKeys.length > 0) {
  console.log('🗑️  UNUSED TRANSLATION KEYS:');
  unusedKeys.forEach(key => {
    console.log(`  • "${key}"`);
  });
  console.log('');
} else {
  console.log('🎯 All translation keys are being used!\n');
}

// Problematic files
if (problematicFiles.length > 0) {
  console.log('⚠️  FILES WITH SCANNING ISSUES:');
  problematicFiles.forEach(({ file, error }) => {
    console.log(`  • ${file}: ${error}`);
  });
  console.log('');
}

// Statistics
console.log('📈 STATISTICS:');
console.log(`  • Total available keys: ${availableKeys.size}`);
console.log(`  • Total used keys: ${usedKeys.size}`);
console.log(`  • Missing keys: ${missingKeys.length}`);
console.log(`  • Unused keys: ${unusedKeys.length}`);
console.log(`  • Usage rate: ${((usedKeys.size / availableKeys.size) * 100).toFixed(1)}%`);

// Check for consistency between EN and AR
const arKeys = new Set(flattenKeys(arTranslations));
const inconsistentKeys = [];

for (const enKey of availableKeys) {
  if (!arKeys.has(enKey)) {
    inconsistentKeys.push({ key: enKey, missing: 'Arabic' });
  }
}

for (const arKey of arKeys) {
  if (!availableKeys.has(arKey)) {
    inconsistentKeys.push({ key: arKey, missing: 'English' });
  }
}

if (inconsistentKeys.length > 0) {
  console.log('\n⚠️  TRANSLATION CONSISTENCY ISSUES:');
  inconsistentKeys.forEach(({ key, missing }) => {
    console.log(`  • "${key}" missing in ${missing}`);
  });
} else {
  console.log('\n✅ English and Arabic translations are consistent!');
}

console.log('\n' + '=' .repeat(50));

// Generate specific fix recommendations
if (missingKeys.length > 0) {
  console.log('\n🔧 RECOMMENDED FIXES:\n');
  
  console.log('1. Add missing keys to localization files:');
  console.log('   Add these to both en.json and ar.json:\n');
  
  const uniqueMissingKeys = [...new Set(missingKeys.map(item => item.key))];
  uniqueMissingKeys.forEach(key => {
    console.log(`   "${key}": "TODO: Add English translation",`);
  });
  
  console.log('\n2. Or fix the t() calls if they use wrong key names:\n');
  missingKeys.forEach(({ key, file, line }) => {
    // Suggest similar existing keys
    const similarKeys = Array.from(availableKeys).filter(k => 
      k.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(k.toLowerCase())
    );
    
    if (similarKeys.length > 0) {
      console.log(`   In ${file}:${line}`);
      console.log(`   Replace "${key}" with one of: ${similarKeys.slice(0, 3).join(', ')}`);
      console.log('');
    }
  });
}

process.exit(missingKeys.length > 0 ? 1 : 0); 