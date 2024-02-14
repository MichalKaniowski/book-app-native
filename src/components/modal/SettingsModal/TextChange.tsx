import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextSizeChangeAction } from "../../../types/book";
import StyledText from "../../ui/StyledText";

interface TechChangeProps {
  onTextSizeChange: (action: TextSizeChangeAction) => void;
}

export default function TextChange({ onTextSizeChange }: TechChangeProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "grey",
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
    padding: 3,
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
