import { View, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import { TextSizeChangeAction } from "../types/book";
import * as Brightness from "expo-brightness";
import StyledText from "./ui/StyledText";
import { useContext, useState } from "react";
import { ThemeContext } from "../store/ThemeContext";
import { ThemeType } from "../types/theme";

interface SettingsModalProps {
  brightness: number;
  onTextSizeChange: (action: TextSizeChangeAction) => void;
}

export default function SettingsModal({
  brightness,
  onTextSizeChange,
}: SettingsModalProps) {
  const { theme, onThemeChange, themeValue, actualTheme } =
    useContext(ThemeContext);

  async function handleBrightnessChange(value: number) {
    const { status } = await Brightness.requestPermissionsAsync();

    if (status === "granted") {
      await Brightness.setSystemBrightnessAsync(value);
    }
  }

  function handleThemeChange(theme: ThemeType) {
    onThemeChange(theme);
  }

  return (
    <View
      style={{
        ...styles.modal,
        backgroundColor: actualTheme === "light" ? "#d3d3d3" : "#222",
      }}
    >
      <View style={styles.brightnessContainer}>
        <Icon name="sun" color={theme.secondary} size={16} />
        <Slider
          value={brightness}
          style={styles.brightnessSlider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={theme.accent}
          maximumTrackTintColor={theme.secondary}
          thumbTintColor="#fff"
          onValueChange={handleBrightnessChange}
        />
        <Icon name="moon" color={theme.secondary} size={16} />
      </View>

      <View style={styles.bottomBorder} />

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
          <View style={styles.systemThemeHalf}>
            <Icon name="sun" />
          </View>
          <View style={styles.systemThemeHalf}>
            <Icon name="moon" color="#fff" style={styles.moonIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBorder} />

      <View style={styles.textSizeContainer}>
        <TouchableOpacity
          style={styles.textSizeButton}
          onPress={() => onTextSizeChange("decrease")}
        >
          <StyledText style={styles.smallLetterA}>A</StyledText>
        </TouchableOpacity>

        <View style={styles.rightBorder}></View>

        <TouchableOpacity
          style={styles.textSizeButton}
          onPress={() => onTextSizeChange("increase")}
        >
          <StyledText style={styles.largeLetterA}>A</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "grey",
  },
  modal: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 100,
    borderRadius: 10,
  },
  brightnessContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 5,
  },
  brightnessSlider: {
    width: 200,
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  themeButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden",
  },
  moonIcon: { transform: [{ rotate: "45deg" }] },
  systemThemeHalf: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  textSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textSizeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  smallLetterA: {
    fontSize: 20,
    fontWeight: "500",
  },
  largeLetterA: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
