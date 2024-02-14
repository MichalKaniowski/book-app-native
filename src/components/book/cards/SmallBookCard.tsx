import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Book } from "../../../types/database";
import { ThemeContext } from "../../../store/ThemeContext";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
import { DOMAIN } from "@env";
import { firebaseAuth } from "../../../../FirebaseConfig";

type SmallBookCardProps = {
  book: Book;
  onBookDetailsEnter: (book: Book) => void;
  onReadingModeEnter: (book: Book) => void;
};

export default function SmallBookCard({
  book,
  onBookDetailsEnter,
  onReadingModeEnter,
}: SmallBookCardProps) {
  const { keywords, title, estimatedReadingTime } = book;

  const { theme } = useContext(ThemeContext);

  const keywordsString = keywords.join(", ");

  async function handleReadingModeEnter(book: Book) {
    onReadingModeEnter(book);
    await axios.post(`${DOMAIN}/api/books/addBookToShelfBooks`, {
      userFirebaseId: firebaseAuth.currentUser?.uid,
      book,
    });
  }

  return (
    <TouchableOpacity
      onPress={() => onBookDetailsEnter(book)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.imageUrl }}
          style={styles.bookImage}
          alt="book image"
        />
      </View>
      <View style={styles.bookInfo}>
        <View>
          <Text style={{ ...styles.bookTitle, color: theme.text }}>
            {title}
          </Text>
          <Text style={{ ...styles.keywordsString, color: theme.secondary }}>
            {keywordsString}
          </Text>
        </View>

        <View style={styles.bottomRowContainer}>
          <TouchableOpacity
            style={{
              ...styles.readBookButton,
              backgroundColor: theme.accent,
            }}
            onPress={() => handleReadingModeEnter(book)}
          >
            <Text style={{ color: theme.background }}>Czytaj</Text>
          </TouchableOpacity>
          <Icon name="clock" size={16} color={theme.secondary} />
          <Text
            style={{
              ...styles.estimatedReadingTimeText,
              color: theme.secondary,
            }}
          >
            {estimatedReadingTime} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  imageContainer: {},
  bookInfo: {},
  bookImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 20,
  },
  keywordsString: { maxWidth: "95%" },
  bottomRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  readBookButton: {
    padding: 5,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  estimatedReadingTimeText: {
    marginLeft: 3,
  },
});
