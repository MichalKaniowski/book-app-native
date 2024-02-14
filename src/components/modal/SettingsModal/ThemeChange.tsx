import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeContext";
import { ThemeType } from "../../../types/theme";

export default function ThemeChange() {
  const { theme, onThemeChange, themeValue, actualTheme } =
    useContext(ThemeContext);

  function handleThemeChange(theme: ThemeType) {
    onThemeChange(theme);
  }

  return (
    <View style={styles.themeContainer}>
      <TouchableOpacity
        onPress={() => handleThemeChange("light")}
        style={{
          ...styles.themeButton,
          borderWidth: themeValue === "light" ? 2 : 0,
          borderColor: theme.accent,
        }}
      />
      <TouchableOpacity
        onPress={() => handleThemeChange("dark")}
        style={{
          ...styles.themeButton,
          backgroundColor: "#000",
          borderWidth: themeValue === "dark" ? 2 : 0,
          borderColor: theme.accent,
        }}
      />
      <TouchableOpacity
        onPress={() => handleThemeChange("system")}
        style={{
          ...styles.themeButton,
          transform: [{ rotate: "-45deg" }],
          borderWidth: themeValue === "system" ? 2 : 0,
          borderColor: theme.accent,
        }}
      >
        <View style={{ ...styles.systemThemeHalf, backgroundColor: "white" }}>
          <Icon name="sun" />
        </View>
        <View style={{ ...styles.systemThemeHalf, backgroundColor: "#000" }}>
          <Icon name="moon" color="#fff" style={styles.moonIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 25,
  },
  themeButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden",
  },
  systemThemeHalf: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  moonIcon: { transform: [{ rotate: "45deg" }] },
});
