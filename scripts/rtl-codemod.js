#!/usr/bin/env node

/**
 * RTL Codemod Script for Quran Chat using jscodeshift
 * 
 * This script automatically converts RTL-problematic style properties
 * to their RTL-safe equivalents using React Native's logical properties.
 * 
 * See scripts/rtl-codemod-usage.md for detailed usage instructions.
 */

const fs = require('fs');
const path = require('path');

// Global stats for summary
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  transformations: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlignLeft: 0,
    textAlignRight: 0,
    alignItemsFlexStart: 0,
    alignItemsFlexEnd: 0,
  },
  manualReviewItems: {
    absolutePositioning: 0,
    flexDirectionRow: 0,
  }
};

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let hasModifications = false;

  stats.filesProcessed++;

  // Helper function to transform object properties in StyleSheet.create calls
  function transformStyleProperties(path) {
    const properties = path.node ? path.node.properties : path.value.properties;
    
    properties.forEach((prop, index) => {
      if ((j.Property.check(prop) || j.ObjectProperty.check(prop)) && j.Identifier.check(prop.key)) {
        const keyName = prop.key.name;
        let shouldTransform = false;
        let newKeyName = '';

        // Transform margin properties
        if (keyName === 'marginLeft') {
          newKeyName = 'marginStart';
          stats.transformations.marginLeft++;
          shouldTransform = true;
        } else if (keyName === 'marginRight') {
          newKeyName = 'marginEnd';
          stats.transformations.marginRight++;
          shouldTransform = true;
        }
        // Transform padding properties  
        else if (keyName === 'paddingLeft') {
          newKeyName = 'paddingStart';
          stats.transformations.paddingLeft++;
          shouldTransform = true;
        } else if (keyName === 'paddingRight') {
          newKeyName = 'paddingEnd';
          stats.transformations.paddingRight++;
          shouldTransform = true;
        }

        if (shouldTransform) {
          prop.key.name = newKeyName;
          hasModifications = true;
        }
      }
    });
  }

  // Helper function to transform textAlign values
  function transformTextAlign(path) {
    const prop = path.value || path;
    if ((j.Property.check(prop) || j.ObjectProperty.check(prop)) && 
        j.Identifier.check(prop.key) && 
        prop.key.name === 'textAlign') {
      
      if (j.Literal.check(prop.value)) {
        const value = prop.value.value;
        
        if (value === 'left') {
          // Add comment for manual review
          prop.value = j.literal('left');
          stats.transformations.textAlignLeft++;
          hasModifications = true;
          
          // Add a comment node
          prop.comments = prop.comments || [];
          prop.comments.push(j.commentLine(' TODO: Convert to RTL-aware alignment using textAlign()'));
          
        } else if (value === 'right') {
          prop.value = j.literal('right');
          stats.transformations.textAlignRight++;
          hasModifications = true;
          
          prop.comments = prop.comments || [];
          prop.comments.push(j.commentLine(' TODO: Convert to RTL-aware alignment using textAlignReverse()'));
        }
      }
    }
  }

  // Helper function to transform alignItems values
  function transformAlignItems(path) {
    const prop = path.value || path;
    if ((j.Property.check(prop) || j.ObjectProperty.check(prop)) && 
        j.Identifier.check(prop.key) && 
        prop.key.name === 'alignItems') {
      
      if (j.Literal.check(prop.value)) {
        const value = prop.value.value;
        
        if (value === 'flex-start') {
          stats.transformations.alignItemsFlexStart++;
          hasModifications = true;
          
          prop.comments = prop.comments || [];
          prop.comments.push(j.commentLine(' TODO: Consider RTL flex alignment using alignItems(true)'));
          
        } else if (value === 'flex-end') {
          stats.transformations.alignItemsFlexEnd++;
          hasModifications = true;
          
          prop.comments = prop.comments || [];
          prop.comments.push(j.commentLine(' TODO: Consider RTL flex alignment using alignItems(false)'));
        }
      }
    }
  }

  // Count manual review items
  function countManualReviewItems() {
    // Count absolute positioning - check both Property and ObjectProperty
    root.find(j.Property, {
      key: { name: 'left' }
    }).forEach(() => {
      stats.manualReviewItems.absolutePositioning++;
    });

    root.find(j.ObjectProperty, {
      key: { name: 'left' }
    }).forEach(() => {
      stats.manualReviewItems.absolutePositioning++;
    });

    root.find(j.Property, {
      key: { name: 'right' }
    }).forEach(() => {
      stats.manualReviewItems.absolutePositioning++;
    });

    root.find(j.ObjectProperty, {
      key: { name: 'right' }
    }).forEach(() => {
      stats.manualReviewItems.absolutePositioning++;
    });

    // Count row flex directions - check both Property and ObjectProperty
    root.find(j.Property, {
      key: { name: 'flexDirection' },
      value: { value: 'row' }
    }).forEach(() => {
      stats.manualReviewItems.flexDirectionRow++;
    });

    root.find(j.ObjectProperty, {
      key: { name: 'flexDirection' },
      value: { value: 'row' }
    }).forEach(() => {
      stats.manualReviewItems.flexDirectionRow++;
    });
  }

  // Transform StyleSheet.create calls
  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'StyleSheet' },
      property: { name: 'create' }
    }
  }).forEach(path => {
    const argument = path.value.arguments[0];
    if (j.ObjectExpression.check(argument)) {
      argument.properties.forEach(styleProp => {
        if ((j.Property.check(styleProp) || j.ObjectProperty.check(styleProp)) && j.ObjectExpression.check(styleProp.value)) {
          transformStyleProperties({ value: styleProp.value });
        }
      });
    }
  });

  // Transform inline style objects
  root.find(j.ObjectExpression).forEach(path => {
    // Check if this looks like a style object
    const hasStyleProperties = path.value.properties.some(prop => {
      if (j.Property.check(prop) && j.Identifier.check(prop.key)) {
        const keyName = prop.key.name;
        return ['marginLeft', 'marginRight', 'paddingLeft', 'paddingRight', 
                'textAlign', 'alignItems', 'flexDirection'].includes(keyName);
      }
      return false;
    });

    if (hasStyleProperties) {
      transformStyleProperties(path);
      
      // Transform textAlign and alignItems
      const properties = path.value.properties;
      properties.forEach((prop, index) => {
        transformTextAlign({ value: prop });
        transformAlignItems({ value: prop });
      });
    }
  });

  // Count manual review items
  countManualReviewItems();

  if (hasModifications) {
    stats.filesModified++;
  }

  return hasModifications ? root.toSource({ quote: 'single' }) : null;
};

// Summary function to be called after all transformations
module.exports.postProcess = function(results) {
  console.log('\n🚀 RTL Codemod Summary\n');
  console.log('📊 Transformation Results:');
  console.log(`✅ Files processed: ${stats.filesProcessed}`);
  console.log(`🔧 Files modified: ${stats.filesModified}`);
  console.log('');
  
  console.log('🔄 Automatic Transformations Applied:');
  console.log(`   marginLeft → marginStart: ${stats.transformations.marginLeft}`);
  console.log(`   marginRight → marginEnd: ${stats.transformations.marginRight}`);
  console.log(`   paddingLeft → paddingStart: ${stats.transformations.paddingLeft}`);
  console.log(`   paddingRight → paddingEnd: ${stats.transformations.paddingRight}`);
  console.log(`   textAlign: 'left' (marked for review): ${stats.transformations.textAlignLeft}`);
  console.log(`   textAlign: 'right' (marked for review): ${stats.transformations.textAlignRight}`);
  console.log(`   alignItems: 'flex-start' (marked for review): ${stats.transformations.alignItemsFlexStart}`);
  console.log(`   alignItems: 'flex-end' (marked for review): ${stats.transformations.alignItemsFlexEnd}`);
  console.log('');
  
  const totalAutoTransforms = Object.values(stats.transformations).reduce((sum, count) => sum + count, 0);
  console.log(`🎯 Total automatic transformations: ${totalAutoTransforms}`);
  console.log('');
  
  console.log('⚠️  Manual Review Required:');
  console.log(`   Absolute positioning (left/right): ${stats.manualReviewItems.absolutePositioning}`);
  console.log(`   Row flex directions: ${stats.manualReviewItems.flexDirectionRow}`);
  console.log('');
  
  console.log('📝 Next Steps:');
  console.log('1. Review TODO comments added to textAlign and alignItems');
  console.log('2. Manually review absolute positioning properties');
  console.log('3. Consider RTL-aware flex directions');
  console.log('4. Import RTL utilities: import { textAlign, alignItems } from "../utils/rtl"');
  console.log('5. Test the app with Arabic locale');
  console.log('');
  
  return results;
};

// Configure parser for TypeScript
module.exports.parser = 'tsx';

// If running standalone (not as jscodeshift transform)
if (require.main === module) {
  console.log('🚀 RTL Codemod for Quran Chat');
  console.log('');
  console.log('This script should be run with jscodeshift:');
  console.log('');
  console.log('📋 Installation:');
  console.log('npm install -g jscodeshift');
  console.log('');
  console.log('🧪 Dry run (preview changes):');
  console.log('npx jscodeshift -t scripts/rtl-codemod.js "**/*.tsx" --dry --print');
  console.log('');
  console.log('✅ Apply changes:');
  console.log('npx jscodeshift -t scripts/rtl-codemod.js "**/*.tsx"');
  console.log('');
  console.log('🎯 Target specific files:');
  console.log('npx jscodeshift -t scripts/rtl-codemod.js "components/**/*.tsx" "screens/**/*.tsx"');
  console.log('');
} 