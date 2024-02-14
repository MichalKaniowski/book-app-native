import { View, StyleSheet } from "react-native";
import { TextSizeChangeAction } from "../../../types/book";
import { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeContext";
import ThemeChange from "./ThemeChange";
import TextChange from "./TextChange";

interface SettingsModalProps {
  onTextSizeChange: (action: TextSizeChangeAction) => void;
}

export default function SettingsModal({
  onTextSizeChange,
}: SettingsModalProps) {
  const { actualTheme } = useContext(ThemeContext);

  return (
    <View
      style={{
        ...styles.modal,
        backgroundColor: actualTheme === "light" ? "#d3d3d3" : "#222",
      }}
    >
      <ThemeChange />

      <View style={styles.bottomBorder} />

      <TextChange onTextSizeChange={onTextSizeChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  modal: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 100,
    borderRadius: 10,
  },
});
