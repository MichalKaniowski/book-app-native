import { View, Text, StyleSheet, Button } from "react-native";
import { Book } from "../types/database";

interface ReadingModeBook {
  book: Book;
  onReadingModeExit: () => void;
}

export default function ReadingModeBook({
  book,
  onReadingModeExit,
}: ReadingModeBook) {
  const bookText = book.body;

  return (
    <View>
      <View style={styles.header}>
        <Button title="exit" onPress={onReadingModeExit} />
      </View>

      <View style={styles.textContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
  },
  textContainer: {},
});
