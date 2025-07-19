# RTL Codemod Usage Guide

## Installation

First, install jscodeshift globally:
```bash
npm install -g jscodeshift
```

## Usage Commands

### 🧪 Dry Run (Preview Changes)
See what changes would be made without applying them:
```bash
npx jscodeshift -t scripts/rtl-codemod.js "**/*.tsx" --dry --print
```

### ✅ Apply Changes
Apply the RTL transformations to all TypeScript React files:
```bash
npx jscodeshift -t scripts/rtl-codemod.js "**/*.tsx"
```

### 🎯 Target Specific Directories
Apply changes only to specific directories:
```bash
npx jscodeshift -t scripts/rtl-codemod.js "components/**/*.tsx" "screens/**/*.tsx"
```

### 📋 Verbose Output
Get detailed information about the transformation process:
```bash
npx jscodeshift -t scripts/rtl-codemod.js "**/*.tsx" --verbose
```

## What the Codemod Does

### Automatic Transformations
- `marginLeft` → `marginStart`
- `marginRight` → `marginEnd`
- `paddingLeft` → `paddingStart`
- `paddingRight` → `paddingEnd`

### Marked for Manual Review
- `textAlign: 'left'` → Adds TODO comment
- `textAlign: 'right'` → Adds TODO comment
- `alignItems: 'flex-start'` → Adds TODO comment
- `alignItems: 'flex-end'` → Adds TODO comment

### Manual Review Required
- Absolute positioning properties (`left:`, `right:`)
- Row flex directions (`flexDirection: 'row'`)

## After Running the Codemod

1. Review all TODO comments added to your code
2. Import RTL utilities where needed:
   ```typescript
   import { textAlign, alignItems, flexDirection } from '../utils/rtl';
   ```
3. Replace hardcoded alignments with RTL-aware functions
4. Test the app with Arabic locale

## Example Before/After

### Before:
```typescript
const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    paddingRight: 12,
    textAlign: 'left',
    alignItems: 'flex-start',
  }
});
```

### After:
```typescript
const styles = StyleSheet.create({
  container: {
    marginStart: 16,
    paddingEnd: 12,
    textAlign: 'left', // TODO: Convert to RTL-aware alignment using textAlign()
    alignItems: 'flex-start', // TODO: Consider RTL flex alignment using alignItems(true)
  }
});
``` 