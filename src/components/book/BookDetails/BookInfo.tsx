import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../../ui/StyledText";
import axios from "axios";
import { DOMAIN } from "@env";
import { Book } from "../../../types/database";
import { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeContext";

interface BookInfoProps {
  keywords: string[];
  title: string;
  userFirebaseId?: string;
  book: Book;
  onReadingModeEnter: () => void;
}

export default function BookInfo({
  keywords,
  title,
  userFirebaseId,
  book,
  onReadingModeEnter,
}: BookInfoProps) {
  const { theme } = useContext(ThemeContext);

  const keywordsString = keywords.join(", ");

  async function handleReadingModeEnter() {
    onReadingModeEnter();

    await axios.post(`${DOMAIN}/api/books/addBookToShelfBooks`, {
      userFirebaseId: userFirebaseId,
      book,
    });
  }

  return (
    <View>
      <StyledText style={styles.bookTitle}>{title}</StyledText>
      <Text style={{ color: theme.secondary }}>{keywordsString}</Text>
      <TouchableOpacity
        style={{ ...styles.readBookButton, backgroundColor: theme.accent }}
        onPress={handleReadingModeEnter}
      >
        <Text style={styles.readBookText}>Czytaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  keywordsString: { fontSize: 14 },
  readBookButton: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  readBookText: {
    fontWeight: "bold",
  },
});
