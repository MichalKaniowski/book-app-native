import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Book } from "../types/database";
import { ThemeContext } from "../store/ThemeContext";
import Icon from "react-native-vector-icons/Feather";
import { BookContext } from "../store/BookContext";

type SmallBookCardProps = {
  book: Book;
  onBookDetailsEnter: (book: Book) => void;
  onReadingModeEnter: (book: Book) => void;
};

export default function SmallBookCard({ book }: SmallBookCardProps) {
  const { keywords, title, estimatedReadingTime } = book;

  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);
  const { theme } = useContext(ThemeContext);

  const keywordsString = keywords.join(", ");

  return (
    <TouchableOpacity
      onPress={() => onBookDetailsEnter(book)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/elephant22.webp")}
          style={styles.bookImage}
          alt="elephant image"
        />
      </View>
      <View style={styles.bookInfo}>
        <View>
          <Text style={{ ...styles.bookTitle, color: theme.text }}>
            {title}
          </Text>
          <Text style={{ color: theme.secondary }}>{keywordsString}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={styles.readBookButton}
            onPress={() => onReadingModeEnter(book)}
          >
            <Text>Czytaj</Text>
          </TouchableOpacity>
          <Icon name="clock" size={16} color={theme.secondary} />
          <Text style={{ color: theme.secondary, marginLeft: 3 }}>
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
  readBookButton: {
    backgroundColor: "lightgreen",
    padding: 5,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
});
