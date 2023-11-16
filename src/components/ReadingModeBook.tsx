import { useState, useEffect } from "react";
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
    <ScrollView style={{ flex: 1 }}>
      {isTextSettingsModalOpen && (
        <SettingsModal
          brightness={startingBrightnessValue}
          onTextSizeChange={handleTextSizeChange}
        />
      )}
      <View style={styles.header}>
        <View style={styles.leftColumnHeader}>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 100,
            }}
            onPress={onReadingModeExit}
          >
            <FeatherIcon name="arrow-left" size={20} color="grey" />
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
            <Text style={{ color: "grey" }}>A</Text>
            <Text style={{ color: "grey", fontSize: 20 }}>A</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={{ ...styles.body, fontSize: fontSize }}>{bookText}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
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
    backgroundColor: "#000",
    flex: 1,
    padding: 15,
  },
  body: {
    color: "#fff",
    lineHeight: 24,
  },
});
