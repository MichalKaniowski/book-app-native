import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Book } from "../types/database";
import FeatherIcon from "react-native-vector-icons/Feather";
import SettingsModal from "./SettingsModal";
import { TextSizeChangeAction } from "../types/book";
import * as Brightness from "expo-brightness";
import StyledText from "./ui/StyledText";
import StyledView from "./ui/StyledView";
import { ThemeContext } from "../store/ThemeContext";

interface ReadingModeBook {
  book: Book;
  onReadingModeExit: () => void;
}

export default function ReadingModeBook({
  book,
  onReadingModeExit,
}: ReadingModeBook) {
  // const [activePageNumber, setActivePageNumber] = useState(1);
  const [isTextSettingsModalOpen, setIsTextSettingsModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [startingBrightnessValue, setStartingBrightnessValue] = useState(0);

  const { theme, actualTheme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();

      if (status === "granted") {
        const brightness = await Brightness.getBrightnessAsync();
        setStartingBrightnessValue(brightness);
      }
    })();
  }, []);

  const bookText = book.body.replaceAll("/n", "\n\n");

  function handleTextSizeChange(action: TextSizeChangeAction) {
    if (action === "decrease") {
      if (fontSize >= 16) {
        setFontSize((prevFontSize) => prevFontSize - 2);
      }
    }
    if (action === "increase") {
      if (fontSize) {
        if (fontSize <= 22) {
          setFontSize((prevFontSize) => prevFontSize + 2);
        }
      }
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      {isTextSettingsModalOpen && (
        <SettingsModal
          brightness={startingBrightnessValue}
          onTextSizeChange={handleTextSizeChange}
        />
      )}
      <StyledView
        style={{ ...styles.header, backgroundColor: theme.background }}
      >
        <View style={styles.leftColumnHeader}>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 100,
            }}
            onPress={onReadingModeExit}
          >
            <FeatherIcon name="arrow-left" size={20} color={theme.secondary} />
          </TouchableOpacity>
          {/* <Text style={{ color: "grey" }}>{activePageNumber}/13</Text> */}
        </View>

        <View>
          <TouchableOpacity
            onPress={() =>
              setIsTextSettingsModalOpen((prevValue) => !prevValue)
            }
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <StyledText secondary>A</StyledText>
            <StyledText style={{ fontSize: 20 }} secondary>
              A
            </StyledText>
          </TouchableOpacity>
        </View>
      </StyledView>

      <View
        style={{
          ...styles.textContainer,
          backgroundColor: theme.background,
        }}
      >
        <StyledText style={{ ...styles.body, fontSize: fontSize }}>
          {bookText}
        </StyledText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  leftColumnHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    padding: 15,
  },
  body: {
    lineHeight: 24,
  },
});
