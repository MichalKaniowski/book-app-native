import { useState, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
} from "react-native";
import { Book } from "../../../types/database";
import { TextSizeChangeAction } from "../../../types/book";
import StyledText from "../../ui/StyledText";
import { ThemeContext } from "../../../store/ThemeContext";
import { DOMAIN } from "@env";
import axios from "axios";
import { firebaseAuth } from "../../../../FirebaseConfig";
import { isCloseToTop, isCloseToBottom } from "../../../utils/scroll";
import ReadingModeHeader from "./ReadingModeHeader";

export default function ReadingModeBook({ _id, body }: Book) {
  const [fontSize, setFontSize] = useState(16);
  const [isHeaderShown, setIsHeaderShown] = useState(true);

  const { theme } = useContext(ThemeContext);
  const hasFunctionRun = useRef(false);

  const bookText = body.replaceAll("/n", "\n\n");

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
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      {isHeaderShown && (
        <ReadingModeHeader onTextSizeChange={handleTextSizeChange} />
      )}

      <ScrollView onScroll={handleScroll} style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: {
    flex: 1,
    padding: 15,
  },
  body: {
    lineHeight: 24,
  },
});
