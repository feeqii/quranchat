# 🎨 Design System - Quran Chat

The Quran Chat design system ensures consistent, peaceful, and respectful visual design throughout the app. This system reflects Islamic values of simplicity, beauty, and tranquility.

---

## 🎯 **Design Philosophy**

### **Core Values**
- **Peaceful**: Calming colors and generous spacing
- **Respectful**: Dignified typography and minimal distractions  
- **Spiritual**: Elements that inspire reflection and connection
- **Accessible**: Clear hierarchy and readable text
- **Timeless**: Classical design that transcends trends

### **Visual Principles**
1. **Simplicity over complexity**
2. **Substance over style**
3. **Harmony over contrast**
4. **Clarity over decoration**
5. **Functionality over aesthetics**

---

## 🎨 **Color Palette**

### **Primary Colors**
```typescript
// Primary Teal Family - Main brand color
primary: '#3C8C7E'        // Deep, peaceful teal
primarySoft: '#D9EDE7'    // Light teal background
```

**Usage:**
- **Primary**: CTAs, active states, highlights
- **Primary Soft**: Section backgrounds, cards, subtle emphasis

### **Accent Colors**
```typescript
// Warm Gold - Used sparingly for special emphasis
accent: '#C9A76D'         // Warm, inviting gold
```

**Usage:**
- Premium features
- Special callouts
- Achievement badges
- Devotional content highlights

### **Neutral Colors**
```typescript
// Backgrounds
background: '#F8FAF9'     // Warm off-white
surface: '#FFFFFF'        // Pure white cards/surfaces

// Content Hierarchy
textPrimary: '#1C2B2D'    // Dark charcoal - main text
textSecondary: '#5B6C70'  // Medium gray - secondary text
textMuted: '#889396'      // Light gray - meta information
textOnDark: '#FFFFFF'     // White text on dark backgrounds

// Utility
muted: '#9BA4A6'          // Borders, dividers
overlay: 'rgba(0,0,0,0.5)' // Modal overlays
```

### **Semantic Colors**
```typescript
// Status Colors
success: '#4CAF50'        // Green for confirmations
warning: '#FBC02D'        // Yellow for warnings
danger: '#E03E3E'         // Red for errors, destructive actions
```

### **Devotional Gradient**
```typescript
// Special gradient for spiritual content
devotionalGradientStart: '#8B4A6B'   // Deep purple
devotionalGradientEnd: '#4A2C3A'     // Dark plum
```

---

## 📝 **Typography**

### **Font Family**
```typescript
fonts: {
  heading: 'Merriweather_700Bold',    // Serif for elegance
  body: 'Merriweather_400Regular',    // Serif for readability
  mono: 'Courier',                    // Monospace for code
}
```

**Rationale:** Merriweather is a serif font designed for optimal readability on screens, conveying warmth and tradition appropriate for spiritual content.

### **Font Sizes & Hierarchy**
```typescript
fontSizes: {
  h1: 28,                // Large headings
  h2: 22,                // Section headings
  h3: 18,                // Subsection headings
  title: 20,             // Card/component titles
  body: 16,              // Main body text
  subtitle: 16,          // Secondary body text
  small: 14,             // Small text
  caption: 12,           // Very small text, meta info
  reflectionBody: 18,    // Larger text for spiritual content
}
```

### **Line Heights**
```typescript
lineHeights: {
  h1: 36,       // 1.28 ratio
  h2: 30,       // 1.36 ratio  
  h3: 24,       // 1.33 ratio
  title: 28,    // 1.40 ratio
  body: 22,     // 1.375 ratio - optimal for reading
  subtitle: 22, // 1.375 ratio
  small: 20,    // 1.43 ratio
  caption: 16,  // 1.33 ratio
  reflectionBody: 28, // 1.56 ratio - more spacious
}
```

### **Typography Usage Guidelines**

#### **Headings (h1, h2, h3)**
- Use for page titles and major sections
- Always use `theme.fonts.heading` (Merriweather Bold)
- Maintain proper hierarchy (h1 > h2 > h3)

#### **Body Text**
- Use `body` size (16px) for main content
- Use `theme.fonts.body` (Merriweather Regular)
- Line height 22px for optimal readability

#### **UI Text**
- Use `subtitle` for secondary information
- Use `caption` for meta information (timestamps, counts)
- Use `small` for form labels and helper text

---

## 📏 **Spacing System**

### **Spacing Scale**
```typescript
spacing: {
  xs: 4,    // Tight spacing within components
  sm: 8,    // Small gaps, padding
  md: 16,   // Standard spacing (most common)
  lg: 24,   // Large spacing between sections
  xl: 32,   // Extra large spacing
  xxl: 48,  // Maximum spacing for major sections
  '2xl': 48 // Alias for xxl
}
```

### **Usage Guidelines**

#### **Component Spacing**
```typescript
// Internal component padding
padding: theme.spacing.md        // Standard: 16px

// Between related elements  
marginBottom: theme.spacing.sm   // Small gap: 8px

// Between sections
marginVertical: theme.spacing.lg // Large gap: 24px

// Screen margins
paddingHorizontal: theme.spacing.md // Standard: 16px
```

#### **Responsive Spacing**
```typescript
// Adjust spacing based on screen size
const isSmallScreen = screenWidth < 360;
const containerPadding = isSmallScreen ? theme.spacing.sm : theme.spacing.md;
```

---

## 🔲 **Layout & Structure**

### **Border Radius**
```typescript
radii: {
  sm: 4,     // Subtle rounding
  md: 8,     // Standard cards/buttons
  lg: 16,    // Large cards, modals
  xl: 24,    // Hero elements
  pill: 999, // Fully rounded (buttons, badges)
  full: 9999 // Alias for pill
}
```

### **Shadows & Elevation**
```typescript
shadows: {
  sm: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  }
}
```

**Usage:**
- **sm**: Subtle cards, list items
- **md**: Important cards, buttons
- **lg**: Modals, floating elements

---

## 🧩 **Component Patterns**

### **Cards**
```typescript
// Standard card styling
cardStyle: {
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radii.md,
  padding: theme.spacing.md,
  ...theme.shadows.sm,
}

// Elevated card for important content
elevatedCardStyle: {
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radii.lg,
  padding: theme.spacing.lg,
  ...theme.shadows.md,
}
```

### **Buttons**

#### **Primary Button**
```typescript
primaryButton: {
  backgroundColor: theme.colors.primary,
  borderRadius: theme.radii.pill,
  paddingVertical: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  minHeight: 48, // Accessibility requirement
}

primaryButtonText: {
  color: theme.colors.textOnDark,
  fontSize: theme.fontSizes.body,
  fontFamily: theme.fonts.heading,
  textAlign: 'center',
}
```

#### **Secondary Button**
```typescript
secondaryButton: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: theme.colors.primary,
  borderRadius: theme.radii.pill,
  paddingVertical: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
}

secondaryButtonText: {
  color: theme.colors.primary,
  fontSize: theme.fontSizes.body,
  fontFamily: theme.fonts.heading,
}
```

### **Form Elements**

#### **Input Fields**
```typescript
inputField: {
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.muted,
  borderRadius: theme.radii.md,
  padding: theme.spacing.md,
  fontSize: theme.fontSizes.body,
  fontFamily: theme.fonts.body,
  color: theme.colors.textPrimary,
}

// Focus state
inputFieldFocused: {
  borderColor: theme.colors.primary,
  borderWidth: 2,
}
```

---

## 🎭 **Animation & Interactions**

### **Animation Timing**
```typescript
animations: {
  fast: 150,     // Quick micro-interactions
  normal: 250,   // Standard transitions
  slow: 400,     // Page transitions, modals
}

easings: {
  ease: 'ease-in-out',
  spring: { damping: 15, stiffness: 150 },
}
```

### **Interactive States**

#### **Touch States**
```typescript
// Button press feedback
activeOpacity: 0.8

// Hover effects (for web)
hoverOpacity: 0.9

// Loading states
loadingOpacity: 0.6
```

#### **Transition Examples**
```typescript
// Fade in animation
const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: theme.animations.normal,
}

// Scale press animation  
const scalePress = {
  from: { scale: 1 },
  to: { scale: 0.95 },
  duration: theme.animations.fast,
}
```

---

## 🌍 **Accessibility Guidelines**

### **Color Contrast**
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio  
- **UI elements**: Minimum 3:1 contrast ratio

### **Touch Targets**
- **Minimum size**: 44x44 points (iOS) / 48x48 dp (Android)
- **Recommended**: 48x48 points minimum
- **Spacing**: Minimum 8 points between adjacent targets

### **Typography Accessibility**
- **Body text**: Minimum 16px font size
- **Line height**: 1.375 ratio for body text
- **Paragraph spacing**: At least 1.5x line height

---

## 📱 **Responsive Design**

### **Breakpoints**
```typescript
breakpoints: {
  small: 320,    // iPhone SE
  medium: 375,   // iPhone 12/13
  large: 414,    // iPhone 12/13 Pro Max
  tablet: 768,   // iPad
}
```

### **Responsive Patterns**
```typescript
// Responsive padding
const getResponsivePadding = (screenWidth: number) => {
  if (screenWidth < breakpoints.small) return theme.spacing.sm;
  if (screenWidth < breakpoints.medium) return theme.spacing.md;
  return theme.spacing.lg;
};

// Responsive font sizes
const getResponsiveFontSize = (screenWidth: number, baseSize: number) => {
  const scale = screenWidth < breakpoints.small ? 0.9 : 1;
  return baseSize * scale;
};
```

---

## 🎨 **Theme Implementation**

### **Using the Design System**
```typescript
// ✅ Correct usage
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.fontSizes.h2,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
});

// ❌ Incorrect usage - never hardcode values
const badStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Merriweather_700Bold',
    color: '#1C2B2D',
  },
});
```

### **Dark Mode Considerations**
While not currently implemented, the design system is structured to support dark mode:

```typescript
// Future dark mode colors
darkColors: {
  background: '#1C2B2D',
  surface: '#2A3A3D',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0C4CB',
  // ... other dark variants
}
```

---

## 🎯 **Brand Applications**

### **Logo Usage**
- **Minimum size**: 80px width
- **Clear space**: 2x logo height on all sides
- **Color variations**: Primary teal, white, or single color

### **Devotional Content Styling**
```typescript
// Special styling for Quranic verses and spiritual content
devotionalText: {
  fontSize: theme.fontSizes.reflectionBody,
  fontFamily: theme.fonts.body,
  lineHeight: theme.lineHeights.reflectionBody,
  color: theme.colors.textPrimary,
  textAlign: 'center',
  fontStyle: 'italic',
}

devotionalContainer: {
  background: `linear-gradient(135deg, ${theme.colors.devotionalGradientStart}, ${theme.colors.devotionalGradientEnd})`,
  padding: theme.spacing.xl,
  borderRadius: theme.radii.lg,
}
```

---

## 📋 **Design Checklist**

When creating new components or screens:

- [ ] **Colors**: Only use theme colors, no hardcoded values
- [ ] **Typography**: Use theme fonts and sizes
- [ ] **Spacing**: Use theme spacing scale
- [ ] **Touch targets**: Minimum 48x48 points
- [ ] **Contrast**: Meet accessibility requirements
- [ ] **Consistency**: Follow established patterns
- [ ] **Responsiveness**: Test on different screen sizes
- [ ] **Loading states**: Include appropriate feedback
- [ ] **Error states**: Provide clear error messaging
- [ ] **Empty states**: Design meaningful empty state UI

---

## 🔧 **Tools & Resources**

### **Design Tools**
- **Figma**: Design files and component library
- **ColorBox**: Contrast checking
- **Type Scale**: Typography hierarchy testing

### **Development Tools**
- **React Native Debugger**: Visual debugging
- **Flipper**: Layout inspection
- **Storybook**: Component documentation (if implemented)

---

This design system ensures that every element in Quran Chat reflects the app's spiritual purpose while maintaining modern usability standards. The peaceful color palette, readable typography, and generous spacing create an environment conducive to reflection and spiritual growth. 