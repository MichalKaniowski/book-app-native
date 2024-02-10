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
  const [isHeaderShown, setIsHeaderShown] = useState(true);

  const { theme } = useContext(ThemeContext);
  const hasFunctionRun = useRef(false);

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

  function isCloseToTop({ contentOffset }: NativeScrollEvent) {
    if (contentOffset.y <= 50) {
      return true;
    }
  }

  async function handleScroll({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) {
    if (isCloseToTop(nativeEvent)) {
      setIsHeaderShown(true);
    }

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
        ...styles.container,
        backgroundColor: theme.background,
      }}
      stickyHeaderIndices={isHeaderShown ? [0] : []}
    >
      {isTextSettingsModalOpen && (
        <SettingsModal
          brightness={startingBrightnessValue}
          onTextSizeChange={handleTextSizeChange}
        />
      )}
      {isHeaderShown && (
        <View style={styles.headerContainer}>
          <StyledView style={styles.header}>
            <View style={styles.leftColumnHeader}>
              <TouchableOpacity
                style={styles.exitReadingModeButton}
                onPress={onReadingModeExit}
              >
                <FeatherIcon
                  name="arrow-left"
                  size={22}
                  color={theme.secondary}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  setIsTextSettingsModalOpen((prevValue) => !prevValue)
                }
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
      )}

      <TouchableOpacity
        onPress={() => setIsHeaderShown((prevValue) => !prevValue)}
        activeOpacity={1}
      >
        <View style={styles.textContainer}>
          <StyledText style={{ ...styles.body, fontSize: fontSize }}>
            {bookText}
          </StyledText>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { position: "absolute", top: 0, width: "100%" },
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
  textSizeButton: { flexDirection: "row", alignItems: "center" },
  bigA: { fontSize: 20 },
  textContainer: {
    flex: 1,
    padding: 15,
  },
  body: {
    lineHeight: 24,
  },
});
