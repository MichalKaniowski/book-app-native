import React, { useState } from "react";
import { Appearance } from "react-native";
import { ThemeType, ActualThemeType } from "../types/theme";

interface ThemeContextInterface {
  themeValue: ThemeType;
  actualTheme: ActualThemeType;
  theme: {
    background: string;
    text: string;
    secondary: string;
    accent: string;
  };
  onThemeChange: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  themeValue: "light",
  actualTheme: "light",
  theme: {
    background: "#f5f5f5",
    text: "#000",
    secondary: "grey",
    accent: "lightgreen",
  },
  onThemeChange: (theme: ThemeType) => {},
});

const themeColors = {
  light: {
    background: "#f5f5f5",
    text: "#000",
    secondary: "#404040",
    accent: "#5fa85f",
  },
  dark: {
    background: "#000",
    text: "#fff",
    secondary: "grey",
    accent: "lightgreen",
  },
};

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>(
    Appearance.getColorScheme() ?? "light"
  );

  function handleThemeChange(theme: ThemeType) {
    setTheme(theme);
  }

  const systemTheme = Appearance.getColorScheme() ?? "light";
  const activeTheme =
    theme === "system" ? systemTheme : theme === "light" ? "light" : "dark";

  const themeObject =
    activeTheme === "light" ? themeColors.light : themeColors.dark;

  const value = {
    themeValue: theme,
    actualTheme: activeTheme,
    theme: themeObject,
    onThemeChange: handleThemeChange,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
