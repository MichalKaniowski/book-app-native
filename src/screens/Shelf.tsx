import { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import SmallBookCard from "../components/book/SmallBookCard";
import { BookContext } from "../store/BookContext";
import Icon from "react-native-vector-icons/Feather";
import Book from "../components/book/Book";

export default function Shelf() {
  const books = useQuery(api.books.getShelfBooks);

  const { theme } = useContext(ThemeContext);
  const {
    openedBook,
    onBookDetailsEnter,
    onReadingModeEnter,
    onBookDetailsExit,
  } = useContext(BookContext);

  const shelfBody = (
    <ScrollView
      style={{ ...styles.shelfContainer, backgroundColor: theme.background }}
    >
      <View style={styles.header}>
        <Icon name="filter" size={18} color={theme.text} />
      </View>
      <StyledText style={styles.mainHeading}>Półka</StyledText>
      {books?.map((book) => (
        <SmallBookCard
          book={book}
          onBookDetailsEnter={onBookDetailsEnter}
          onReadingModeEnter={onReadingModeEnter}
        />
      ))}
    </ScrollView>
  );

  return openedBook ? (
    <Book book={openedBook} onExit={onBookDetailsExit} />
  ) : (
    shelfBody
  );
}

const styles = StyleSheet.create({
  shelfContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
