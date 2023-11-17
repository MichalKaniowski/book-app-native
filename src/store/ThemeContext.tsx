import React, { useState, useEffect } from "react";
import { Appearance } from "react-native";
import { ThemeType } from "../types/shared";

interface ThemeContextInterface {
  themeValue: ThemeType;
  theme: {
    background: string;
    text: string;
    secondary: string;
    lightSecondary: string;
    accent: string;
  };
  onThemeChange: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  themeValue: "light",
  theme: {
    background: "#fff",
    text: "#000",
    secondary: "grey",
    lightSecondary: "#d3d3d3",
    accent: "green",
  },
  onThemeChange: (theme: ThemeType) => {},
});

const themeColors = {
  light: {
    background: "#fff",
    text: "#000",
    secondary: "grey",
    lightSecondary: "#d3d3d3",
    accent: "green",
  },
  dark: {
    background: "#000",
    text: "#fff",
    secondary: "grey",
    lightSecondary: "#222",
    accent: "green",
  },
};

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>(
    // Appearance.getColorScheme() ?? "light"
    "dark"
  );

  const themeObject = theme === "light" ? themeColors.light : themeColors.dark;

  function handleThemeChange(theme: ThemeType) {
    setTheme(theme);
  }

  const value = {
    themeValue: theme,
    theme: themeObject,
    onThemeChange: handleThemeChange,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
