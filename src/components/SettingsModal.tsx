import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import { TextSizeChangeAction } from "../types/book";
import * as Brightness from "expo-brightness";
import { ThemeContext } from "../store/ThemeContext";

interface SettingsModalProps {
  brightness: number;
  onTextSizeChange: (action: TextSizeChangeAction) => void;
}

export default function SettingsModal({
  brightness,
  onTextSizeChange,
}: SettingsModalProps) {
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);

  async function handleBrightnessChange(value: number) {
    const { status } = await Brightness.requestPermissionsAsync();

    if (status === "granted") {
      await Brightness.setSystemBrightnessAsync(value);
    }
  }

  return (
    <View style={styles.modal}>
      <View style={styles.brightnessContainer}>
        <Icon name="sun" color="grey" size={16} />
        <Slider
          value={brightness}
          style={styles.brightnessSlider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#444"
          thumbTintColor="#fff"
          onValueChange={handleBrightnessChange}
        />
        <Icon name="moon" color="grey" size={16} />
      </View>

      <View style={styles.bottomBorder} />

      <View style={styles.themeContainer}>
        <TouchableOpacity style={styles.themeButton} />
        <TouchableOpacity
          style={{ ...styles.themeButton, backgroundColor: "#000" }}
        />
        <TouchableOpacity style={styles.themeButton} />
      </View>

      <View style={styles.bottomBorder} />

      <View style={styles.textSizeContainer}>
        <TouchableOpacity
          style={styles.textSizeButton}
          onPress={() => onTextSizeChange("decrease")}
        >
          <Text style={styles.smallLetterA}>A</Text>
        </TouchableOpacity>

        <View style={styles.rightBorder}></View>

        <TouchableOpacity
          style={styles.textSizeButton}
          onPress={() => onTextSizeChange("increase")}
        >
          <Text style={styles.largeLetterA}>A</Text>
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
    backgroundColor: "#222",
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
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 100,
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
    color: "#fff",
    fontWeight: "500",
  },
  largeLetterA: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});
