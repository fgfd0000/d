/**
 * Enterprise Theme Configuration
 * Dark Mode Primary | Dark Blue Branding
 * Comprehensive color palette and design tokens
 */

export const colors = {
  // Primary Colors (Dark Blue Branding)
  primary: {
    50: '#f0f5ff',
    100: '#e0ebff',
    200: '#c7d9ff',
    300: '#a8c5ff',
    400: '#8ab0ff',
    500: '#6b99ff',
    600: '#5577ff',
    700: '#4460e8',
    800: '#3850d0',
    900: '#2d3fb0',
    950: '#1a2563', // Very dark blue (primary)
  },

  // Secondary Colors (Neutral Palette)
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic Colors
  success: {
    light: '#d1fae5',
    main: '#10b981',
    dark: '#047857',
  },
  warning: {
    light: '#fef3c7',
    main: '#f59e0b',
    dark: '#d97706',
  },
  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#dbeafe',
    main: '#3b82f6',
    dark: '#1d4ed8',
  },
};

// Dark Mode (Primary)
export const darkTheme = {
  name: 'dark',
  background: {
    primary: '#030712',      // Very dark (page background)
    secondary: '#111827',    // Dark (cards, surfaces)
    tertiary: '#1f2937',     // Slightly lighter (hover states)
    elevated: '#2d3f50',     // Input fields, modals
  },
  text: {
    primary: '#f9fafb',      // Almost white
    secondary: '#d1d5db',    // Light gray
    tertiary: '#9ca3af',     // Medium gray
    disabled: '#6b7280',     // Disabled state
  },
  border: {
    light: '#374151',        // Subtle borders
    medium: '#4b5563',       // Default borders
    dark: '#6b7280',         // Prominent borders
  },
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  primary: colors.primary[600],
  primaryDark: colors.primary[950],
  success: colors.success.main,
  warning: colors.warning.main,
  error: colors.error.main,
  info: colors.info.main,
};

// Light Mode
export const lightTheme = {
  name: 'light',
  background: {
    primary: '#ffffff',      // White
    secondary: '#f9fafb',    // Very light gray
    tertiary: '#f3f4f6',     // Light gray
    elevated: '#eff6ff',     // Light blue tint
  },
  text: {
    primary: '#030712',      // Almost black
    secondary: '#4b5563',    // Dark gray
    tertiary: '#9ca3af',     // Medium gray
    disabled: '#d1d5db',     // Disabled state
  },
  border: {
    light: '#e5e7eb',        // Light borders
    medium: '#d1d5db',       // Default borders
    dark: '#9ca3af',         // Prominent borders
  },
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.2)',
  primary: colors.primary[600],
  primaryDark: colors.primary[950],
  success: colors.success.main,
  warning: colors.warning.main,
  error: colors.error.main,
  info: colors.info.main,
};

// Typography
export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"Roboto Mono", "Monaco", "Courier New", monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

// Spacing
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
};

// Transitions & Animations
export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
};

export const animations = {
  fadeIn: 'fadeIn 300ms ease-in-out',
  slideIn: 'slideIn 300ms ease-out',
  slideDown: 'slideDown 200ms ease-out',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  shimmer: 'shimmer 2s infinite',
};

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

// Breakpoints
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultrawide: '1536px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  tooltip: 1070,
};

export default {
  darkTheme,
  lightTheme,
  colors,
  typography,
  spacing,
  borderRadius,
  transitions,
  animations,
  shadows,
  breakpoints,
  zIndex,
};
