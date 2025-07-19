#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
// Use a simple camelCase implementation instead of the package
function camelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .split(/\s+/) // Split on whitespace
    .filter(word => word.length > 0)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

// Configuration
const SCAN_PATTERNS = [
  './components/**/*.tsx',
  './screens/**/*.tsx', 
  './navigation/**/*.tsx',
  './App.tsx'
];

const OUTPUT_PATH = './localization/en.json';

// Utility functions
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function generateKey(text) {
  // Clean the text: remove extra whitespace, newlines, etc.
  const cleanText = text.trim().replace(/\s+/g, ' ');
  
  // Skip very short strings, numbers, or single characters
  if (cleanText.length <= 2 || /^\d+$/.test(cleanText)) {
    return null;
  }

  // Skip technical strings that shouldn't be translated
  const technicalPatterns = [
    /^[.\/]/,                    // File paths (./components, ../utils)
    /^@/,                        // Package names (@expo/something)
    /^#[0-9a-fA-F]/,            // Hex colors (#3C8C7E)
    /\.(tsx?|js|json|png|jpg)$/, // File extensions
    /^[a-z]+:[a-z]/,            // URLs (http:, mailto:)
    /^[A-Z_]+$/,                // Constants (SCREEN_NAME)
    /^use[A-Z]/,                // Hook names (useState, useEffect)
    /Store$/,                   // Store names (useDataStore)
    /^on[A-Z]/,                 // Event handlers (onPress, onClick)
    /Navigation$/,              // Navigation files
    /^\w+\.\w+$/,               // Object.property patterns
  ];

  if (technicalPatterns.some(pattern => pattern.test(cleanText))) {
    return null;
  }

  // Skip if it looks like it's already a translation key
  if (/^[a-z][a-zA-Z0-9]*$/.test(cleanText) && cleanText.length < 30) {
    return null;
  }

  // Generate camelCase key from the text
  let key = camelCase(cleanText);
  
  // Fallback: if camelCase doesn't work well, create a simpler key
  if (!key || key.length < 3) {
    key = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0)
      .slice(0, 4) // Take first 4 words max
      .join('');
    
    if (!key || key.length < 3) {
      return null;
    }
  }

  // Ensure key starts with lowercase letter
  if (key && /^[A-Z]/.test(key)) {
    key = key.charAt(0).toLowerCase() + key.slice(1);
  }

  return key;
}

function isStringLiteral(node) {
  return node && node.type === 'StringLiteral' && typeof node.value === 'string';
}

function isTemplateLiteral(node) {
  return node && node.type === 'TemplateLiteral';
}

function extractStringsFromFile(filePath) {
  const extractedStrings = new Set();
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Parse with Babel
    const ast = parse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'classProperties',
        'objectRestSpread'
      ]
    });

    // Traverse the AST
    traverse(ast, {
      // Extract JSXText nodes (text between JSX tags)
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && text.length > 2) {
          extractedStrings.add(text);
        }
      },

      // Extract string literals in JSX attributes
      JSXAttribute(path) {
        const { value } = path.node;
        if (isStringLiteral(value)) {
          const text = value.value.trim();
          if (text && text.length > 2) {
            extractedStrings.add(text);
          }
        }
      },

      // Extract strings from Alert.alert calls
      CallExpression(path) {
        const { node } = path;
        
        // Check for Alert.alert calls
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object &&
          node.callee.object.name === 'Alert' &&
          node.callee.property &&
          node.callee.property.name === 'alert'
        ) {
          // Extract string arguments from Alert.alert
          node.arguments.forEach(arg => {
            if (isStringLiteral(arg)) {
              const text = arg.value.trim();
              if (text && text.length > 2) {
                extractedStrings.add(text);
              }
            }
          });
        }

        // Also check for console.log, console.warn, etc. (optional)
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object &&
          node.callee.object.name === 'console'
        ) {
          node.arguments.forEach(arg => {
            if (isStringLiteral(arg)) {
              const text = arg.value.trim();
              if (text && text.length > 5 && !text.includes('===')) {
                extractedStrings.add(text);
              }
            }
          });
        }
      },

      // Extract standalone string literals (like button labels passed as props)
      StringLiteral(path) {
        // Only extract if it's not already captured by JSX or function calls
        const parent = path.parent;
        const grandParent = path.parentPath?.parent;
        
        // Skip if it's already handled by JSXAttribute or CallExpression
        if (
          parent?.type === 'JSXAttribute' ||
          parent?.type === 'CallExpression' ||
          grandParent?.type === 'CallExpression'
        ) {
          return;
        }

        const text = path.node.value.trim();
        if (text && text.length > 2) {
          // Only add if it looks like user-facing text
          if (!/^[\w.-]+$/.test(text) && !/^#[0-9a-fA-F]+$/.test(text)) {
            extractedStrings.add(text);
          }
        }
      }
    });

  } catch (error) {
    console.warn(`⚠️  Failed to parse ${filePath}: ${error.message}`);
  }

  return Array.from(extractedStrings);
}

function main() {
  console.log('🔍 Starting string extraction...\n');

  let allFiles = [];
  let scannedFileCount = 0;

  // Collect all .tsx files from specified patterns
  SCAN_PATTERNS.forEach(pattern => {
    if (pattern.endsWith('.tsx') && !pattern.includes('**')) {
      // Single file (like App.tsx)
      if (fs.existsSync(pattern)) {
        allFiles.push(pattern);
      }
    } else {
      // Directory pattern (like ./components/**/*.tsx)
      const dirPath = pattern.replace('/**/*.tsx', '');
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const files = getAllFiles(dirPath);
        allFiles = allFiles.concat(files);
      }
    }
  });

  console.log(`📁 Found ${allFiles.length} .tsx files to scan`);

  // Extract strings from all files
  const allStrings = new Map(); // key -> original string
  const stringCounts = new Map(); // string -> count (for debugging)

  allFiles.forEach(filePath => {
    console.log(`📖 Scanning: ${filePath}`);
    const strings = extractStringsFromFile(filePath);
    scannedFileCount++;

    strings.forEach(str => {
      const key = generateKey(str);
      if (key) {
        allStrings.set(key, str);
        stringCounts.set(str, (stringCounts.get(str) || 0) + 1);
      }
    });
  });

  // Convert to sorted object
  const sortedKeys = Array.from(allStrings.keys()).sort();
  const result = {};
  sortedKeys.forEach(key => {
    result[key] = allStrings.get(key);
  });

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf8');

  // Results
  console.log('\n✅ String extraction completed!');
  console.log(`📊 Results:`);
  console.log(`   • Files scanned: ${scannedFileCount}`);
  console.log(`   • Unique strings extracted: ${Object.keys(result).length}`);
  console.log(`   • Output written to: ${OUTPUT_PATH}`);

  // Show some sample extractions
  if (Object.keys(result).length > 0) {
    console.log('\n📝 Sample extractions:');
    Object.entries(result).slice(0, 5).forEach(([key, value]) => {
      console.log(`   ${key}: "${value}"`);
    });
    
    if (Object.keys(result).length > 5) {
      console.log(`   ... and ${Object.keys(result).length - 5} more`);
    }
  }

  console.log('\n🎯 Next steps:');
  console.log('   1. Review the generated en.json file');
  console.log('   2. Clean up any unwanted extractions');
  console.log('   3. Create corresponding ar.json with Arabic translations');
  console.log('   4. Run the replacement script to update your .tsx files');
}

// Run the script
if (require.main === module) {
  main();
} 