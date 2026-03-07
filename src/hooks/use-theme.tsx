import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage on initialization
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("catalyst-theme") as Theme;
      // Ensure saved theme is valid (light or dark only)
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }
    return defaultTheme;
  });

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark");
    
    // Add the appropriate theme class
    root.classList.add(theme);
    
    // Save theme to localStorage
    localStorage.setItem("catalyst-theme", theme);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
    actualTheme: theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}