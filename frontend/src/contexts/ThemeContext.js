import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [fontSize, setFontSize] = useState('medium');

  const value = {
    selectedTheme,
    setSelectedTheme,
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };