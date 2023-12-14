import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
} from "react-native";
import { Book } from "../../types/database";
import FeatherIcon from "react-native-vector-icons/Feather";
import SettingsModal from "../SettingsModal";
import { TextSizeChangeAction } from "../../types/book";
import * as Brightness from "expo-brightness";
import StyledText from "../ui/StyledText";
import StyledView from "../ui/StyledView";
import { ThemeContext } from "../../store/ThemeContext";
import { DOMAIN } from "@env";
import axios from "axios";
import { firebaseAuth } from "../../../FirebaseConfig";

type ReadingModeBookProps = Book & {
  onReadingModeExit: () => void;
};

export default function ReadingModeBook({
  _id,
  body,
  onReadingModeExit,
}: ReadingModeBookProps) {
  const [isTextSettingsModalOpen, setIsTextSettingsModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [startingBrightnessValue, setStartingBrightnessValue] = useState(100);

  // this ref is used, because onScroll event is firing a lot of times
  // and we want to send only one request if user reached the bottom of the View
  const hasFunctionRun = useRef(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();

      if (status === "granted") {
        const brightness = await Brightness.getBrightnessAsync();
        setStartingBrightnessValue(brightness);
      }
    })();
  }, []);

  const bookText = body.replaceAll("/n", "\n\n");

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  async function handleScroll({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) {
    if (isCloseToBottom(nativeEvent)) {
      if (hasFunctionRun.current === false) {
        hasFunctionRun.current = true;
        await axios.post(`${DOMAIN}/api/books/addBookToFinishedBooks`, {
          userFirebaseId: firebaseAuth.currentUser?.uid,
          bookId: _id,
        });
      }
    }
  }

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
      onScroll={handleScroll}
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {isTextSettingsModalOpen && (
        <SettingsModal
          brightness={startingBrightnessValue}
          onTextSizeChange={handleTextSizeChange}
        />
      )}
      <StyledView style={{ ...styles.header }}>
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
