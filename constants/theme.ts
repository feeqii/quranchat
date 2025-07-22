/**
 * QURAN CHAT DESIGN SYSTEM THEME
 * 
 * Production-ready theme supporting the entire app:
 * - Chat UI (bubbles, toolbars, modals)
 * - Cards and surfaces (history, verse, category)
 * - Elevation and shadows
 * - Typography scales
 * - Consistent spacing and radii
 * 
 * USAGE EXAMPLES:
 * 
 * Colors:
 * - backgroundColor: theme.colors.surface
 * - color: theme.colors.textPrimary
 * - borderColor: theme.colors.primarySoft
 * 
 * Shadows:
 * - ...theme.shadows.sm (subtle cards)
 * - ...theme.shadows.md (prominent cards)
 * - ...theme.shadows.lg (modals, overlays)
 * 
 * Typography:
 * - <Typography variant="h1" /> (large headings)
 * - <Typography variant="title" /> (section titles)
 * - <Typography variant="body" /> (regular text)
 * - <Typography variant="caption" /> (small labels)
 * 
 * Spacing:
 * - padding: theme.spacing.md
 * - marginHorizontal: theme.spacing.lg
 * - gap: theme.spacing.sm
 * 
 * Z-Index:
 * - zIndex: theme.zIndex.modal
 * - zIndex: theme.zIndex.overlay
 */

export const theme = {
  colors: {
    // Enhanced primary palette
    primary: '#3C8C7E',
    primarySoft: '#D9EDE7',
    primaryLight: '#E8F4F1',
    primaryDark: '#2A6B5D',
    
    // Enhanced accent palette
    accent: '#C9A76D',
    accentSoft: '#F2E8D5',
    accentLight: '#F7F0E5',
    accentDark: '#A08552',
    
    // Enhanced neutral palette
    background: '#F8FAF9',
    backgroundSecondary: '#F2F6F5',
    backgroundTertiary: '#F5F8F7', // Additional subtle variation
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceTinted: '#FDFEFE', // Very slight tint for depth
    muted: '#9BA4A6',
    
    // Soft supporting colors for variety
    rose: '#E8C4C4', // Soft rose - for special occasions
    roseSoft: '#F5EEEE',
    lavender: '#D4C8E8', // Soft lavender - for spiritual content
    lavenderSoft: '#F0EEEF',
    sage: '#C4D4C8', // Soft sage - for nature/growth themes
    sageSoft: '#EEEEF0',
    
    // Enhanced text hierarchy
    textPrimary: '#1C2B2D',
    textSecondary: '#5B6C70',
    textMuted: '#889396',
    textOnDark: '#FFFFFF',
    textOnPrimary: '#FFFFFF',
    textOnAccent: '#FFFFFF',
    
    // Harmonious pastel status colors
    success: '#7FB069', // Soft sage green - complements our teal
    successSoft: '#EDF7EA',
    warning: '#E8B86D', // Warm peachy - complements our accent gold
    warningSoft: '#FDF4E7', 
    danger: '#D47B7B', // Soft dusty rose - gentle, not harsh
    dangerSoft: '#F7EAEA',
    info: '#8BB5C7', // Soft blue-gray - harmonious with our palette
    infoSoft: '#EDF5F7',
    
    // Enhanced utility colors
    overlay: 'rgba(0,0,0,0.5)',
    overlayLight: 'rgba(0,0,0,0.2)',
    overlayDark: 'rgba(0,0,0,0.7)',
    border: '#E5E9EA',
    borderSoft: '#F0F3F4',
    divider: '#EAEAEA',
    
    // Soft spiritual gradient colors
    devotionalGradientStart: '#C8A8D4', // Soft lavender - spiritual and calming
    devotionalGradientEnd: '#B8C5D1', // Soft blue-gray - peaceful transition
    welcomeGradientStart: '#F8FAF9',
    welcomeGradientEnd: '#E8F4F1',
    // Additional harmonious gradients
    peaceGradientStart: '#E8F4F1', // Our primary light
    peaceGradientEnd: '#F7F0E5', // Our accent light
    serenityGradientStart: '#EDF7EA', // Success soft
    serenityGradientEnd: '#EDF5F7', // Info soft
  },
  fonts: {
    heading: 'Merriweather_700Bold',
    body: 'Merriweather_400Regular',
    mono: 'Courier',
  },
  fontSizes: {
    // Enhanced font scale
    xs: 10,
    caption: 12,
    small: 14,
    body: 16,
    subtitle: 16,
    title: 20,
    h3: 18,
    h2: 22,
    h1: 28,
    hero: 32,
    display: 36,
    reflectionBody: 18,
  },
  lineHeights: {
    // Enhanced line height scale
    xs: 14,
    caption: 16,
    small: 20,
    body: 24,
    subtitle: 24,
    title: 28,
    h3: 26,
    h2: 30,
    h1: 36,
    hero: 40,
    display: 44,
    reflectionBody: 28,
  },
  typography: {
    fontFamily: 'Merriweather_400Regular',
    // Hero typography for welcome screens
    hero: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    display: { fontSize: 36, fontWeight: '700', lineHeight: 44 },
    
    // Enhanced heading hierarchy
    h1: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
    h2: { fontSize: 22, fontWeight: '700', lineHeight: 30 },
    h3: { fontSize: 18, fontWeight: '700', lineHeight: 26 },
    title: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
    
    // Enhanced body hierarchy
    subtitle: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    subtitleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodyMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    
    // Enhanced small text
    caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    captionMedium: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    small: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    smallMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
    xs: { fontSize: 10, fontWeight: '400', lineHeight: 14 },
  },
  spacing: {
    // Enhanced spacing scale
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    '2xl': 48,
    '3xl': 64,
    '4xl': 80,
  },
  radii: {
    // Enhanced radius scale
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
    pill: 999,
    full: 9999, // Keep for backward compatibility
  },
  shadows: {
    // Enhanced shadow system - flat but elegant
    none: {
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#3C8C7E',
      shadowOpacity: 0.03,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 1,
      elevation: 1,
    },
    sm: {
      shadowColor: '#3C8C7E',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#3C8C7E',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#3C8C7E',
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
    },
    xl: {
      shadowColor: '#3C8C7E',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 8,
      elevation: 8,
    },
  },
  zIndex: {
    base: 1,
    dropdown: 10,
    modal: 100,
    overlay: 999,
  },
} as const;

// Type for the theme object
export type Theme = typeof theme;

// Helper types for accessing theme values
export type ThemeColor = keyof typeof theme.colors;
export type ThemeFont = keyof typeof theme.fonts;
export type ThemeFontSize = keyof typeof theme.fontSizes;
export type ThemeLineHeight = keyof typeof theme.lineHeights;
export type ThemeTypography = keyof typeof theme.typography;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeRadius = keyof typeof theme.radii;
export type ThemeShadow = keyof typeof theme.shadows;
export type ThemeZIndex = keyof typeof theme.zIndex; 