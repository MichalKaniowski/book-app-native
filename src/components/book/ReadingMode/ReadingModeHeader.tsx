import { View, StyleSheet, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import StyledText from "../../ui/StyledText";
import StyledView from "../../ui/StyledView";
import SettingsModal from "../../modal/SettingsModal/SettingsModal";
import { useContext, useState } from "react";
import { BookContext } from "../../../store/BookContext";
import { ThemeContext } from "../../../store/ThemeContext";
import { TextSizeChangeAction } from "../../../types/book";

interface ReadingModeHeaderProps {
  onTextSizeChange: (action: TextSizeChangeAction) => void;
}

export default function ReadingModeHeader({
  onTextSizeChange,
}: ReadingModeHeaderProps) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { onReadingModeExit } = useContext(BookContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.headerContainer}>
      {isSettingsModalOpen && (
        <SettingsModal onTextSizeChange={onTextSizeChange} />
      )}
      <StyledView style={styles.header}>
        <View style={styles.leftColumnHeader}>
          <TouchableOpacity
            style={styles.exitReadingModeButton}
            onPress={onReadingModeExit}
          >
            <FeatherIcon name="arrow-left" size={22} color={theme.secondary} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => setIsSettingsModalOpen((prevValue) => !prevValue)}
            style={styles.textSizeButton}
          >
            <StyledText secondary>A</StyledText>
            <StyledText style={styles.bigA} secondary>
              A
            </StyledText>
          </TouchableOpacity>
        </View>
      </StyledView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  leftColumnHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  exitReadingModeButton: {
    padding: 5,
    borderRadius: 100,
  },
  textSizeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  bigA: { fontSize: 20 },
  textContainer: {
    flex: 1,
    padding: 15,
  },
  body: {
    lineHeight: 24,
  },
});
