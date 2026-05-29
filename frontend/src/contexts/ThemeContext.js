import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const themes = [
  { id: 'light', name: 'Light', bg: 'bg-white', text: 'text-gray-900', accent: '#3B82F6' },
  { id: 'dark', name: 'Dark', bg: 'bg-gray-900', text: 'text-white', accent: '#60A5FA' },
  { id: 'minimal', name: 'Minimal', bg: 'bg-gray-50', text: 'text-gray-800', accent: '#4B5563' },
  { id: 'warm', name: 'Warm', bg: 'bg-orange-50', text: 'text-orange-900', accent: '#F97316' }
];

const defaultTokens = {
  spacing: { sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  borderRadius: { sm: '6px', md: '8px', lg: '12px' },
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
    textMuted: '#9ca3af',
    border: '#e5e7eb',
    primary: '#2563EB',
    primaryLight: '#DBEAFE',
    success: '#059669',
    successLight: '#D1FAE5',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2'
  },
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.08)'
  }
};

export const getSafeTheme = (theme) => ({
  spacing: theme?.spacing || defaultTokens.spacing,
  borderRadius: theme?.borderRadius || defaultTokens.borderRadius,
  colors: theme?.colors || defaultTokens.colors,
  shadows: theme?.shadows || defaultTokens.shadows,
  selectedTheme: theme?.selectedTheme || themes[0],
  setSelectedTheme: theme?.setSelectedTheme || (() => { }),
  primaryColor: theme?.primaryColor || themes[0].accent,
  setPrimaryColor: theme?.setPrimaryColor || (() => { }),
  fontSize: theme?.fontSize || 'medium',
  setFontSize: theme?.setFontSize || (() => { }),
  themes: theme?.themes || themes,
  themeId: theme?.selectedTheme?.id || themes[0].id
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return getSafeTheme(context);
};

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('themeSettings'));
      const theme = themes.find(t => t.id === stored?.selectedThemeId);
      return theme || themes[0];
    } catch {
      return themes[0];
    }
  };

  const getInitialColor = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('themeSettings'));
      return stored?.primaryColor || themes[0].accent;
    } catch {
      return themes[0].accent;
    }
  };

  const getInitialFontSize = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('themeSettings'));
      return stored?.fontSize || 'medium';
    } catch {
      return 'medium';
    }
  };

  const [selectedTheme, setSelectedTheme] = useState(getInitialTheme);
  const [primaryColor, setPrimaryColor] = useState(getInitialColor);
  const [fontSize, setFontSize] = useState(getInitialFontSize);

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify({
      selectedThemeId: selectedTheme.id,
      primaryColor,
      fontSize
    }));
  }, [selectedTheme, primaryColor, fontSize]);

  useEffect(() => {
    document.body.className = `${selectedTheme.bg} ${selectedTheme.text}`;
    document.documentElement.style.setProperty('--accent-color', primaryColor);
    document.documentElement.style.setProperty('--font-size',
      fontSize === 'small' ? '14px' :
        fontSize === 'large' ? '18px' : '16px'
    );
  }, [selectedTheme, primaryColor, fontSize]);

  const value = {
    selectedTheme,
    setSelectedTheme,
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
    themes,
    themeId: selectedTheme.id,
    ...defaultTokens
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };