export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  },
  neutral: {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  }
};

export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem'
};

export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    serif: ['Crimson Text', 'Georgia', 'Times New Roman', 'serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
  },
  fontSize: {
    xs: ['0.6875rem', { lineHeight: '0.875rem' }],
    sm: ['0.75rem', { lineHeight: '1rem' }],
    base: ['0.875rem', { lineHeight: '1.25rem' }],
    lg: ['1rem', { lineHeight: '1.5rem' }],
    xl: ['1.125rem', { lineHeight: '1.5rem' }],
    '2xl': ['1.25rem', { lineHeight: '1.75rem' }],
    '3xl': ['1.5rem', { lineHeight: '2rem' }],
    '4xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '5xl': ['2.25rem', { lineHeight: '1' }],
    '6xl': ['2.5rem', { lineHeight: '1' }],
    '7xl': ['3rem', { lineHeight: '1' }],
    '8xl': ['4rem', { lineHeight: '1' }],
    '9xl': ['5rem', { lineHeight: '1' }]
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  }
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  neumorphic: {
    light: '8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9fb',
    dark: '8px 8px 16px #1a1a1a, -8px -8px 16px #2a2a2a'
  },
  glass: {
    light: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    dark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  }
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
};

export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};

export const componentStates = {
  hover: 'hover',
  focus: 'focus',
  active: 'active',
  disabled: 'disabled',
  loading: 'loading'
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const themeVariants = {
  light: {
    id: 'light',
    name: 'Light',
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: colors.primary[500]
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    bg: 'bg-gray-900',
    text: 'text-white',
    accent: colors.primary[300]
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    accent: colors.neutral[600]
  },
  warm: {
    id: 'warm',
    name: 'Warm',
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: colors.warning[500]
  }
};

export const fontSizes = {
  small: '14px',
  medium: '16px',
  large: '18px'
};

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
  zIndex,
  componentStates,
  breakpoints,
  themeVariants,
  fontSizes
};

export default theme;