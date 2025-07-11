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
    primary: '#3C8C7E',
    primarySoft: '#D9EDE7',
    accent: '#C9A76D',
    background: '#F8FAF9',
    surface: '#FFFFFF',
    muted: '#9BA4A6',
    textPrimary: '#1C2B2D',
    textSecondary: '#5B6C70',
    textMuted: '#889396',
    textOnDark: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FBC02D',
    danger: '#E03E3E',
    overlay: 'rgba(0,0,0,0.5)',
    
    // Devotional gradient colors
    devotionalGradientStart: '#8B4A6B',
    devotionalGradientEnd: '#4A2C3A',
  },
  fonts: {
    heading: 'Merriweather_700Bold',
    body: 'Merriweather_400Regular',
    mono: 'Courier',
  },
  fontSizes: {
    caption: 12,
    small: 14,
    body: 16,
    subtitle: 16,
    title: 20,
    h3: 18,
    h2: 22,
    h1: 28,
    reflectionBody: 18,
  },
  lineHeights: {
    caption: 16,
    small: 20,
    body: 22,
    subtitle: 22,
    title: 28,
    h3: 24,
    h2: 30,
    h1: 36,
    reflectionBody: 28,
  },
  typography: {
    fontFamily: 'Merriweather_400Regular',
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
    title: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
    subtitle: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    small: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    '2xl': 48,
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 999,
    full: 9999, // Keep for backward compatibility
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
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