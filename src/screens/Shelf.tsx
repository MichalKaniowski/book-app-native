import { useContext } from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";
import SmallBookCard from "../components/book/SmallBookCard";
import { BookContext } from "../store/BookContext";
import Icon from "react-native-vector-icons/Feather";
import Book from "../components/book/Book";
import { firebaseAuth } from "../../FirebaseConfig";
import { Book as BookType } from "../types/database";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";

export default function Shelf() {
  const userFirebaseId = firebaseAuth.currentUser?.uid;

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<BookType[]>(
    `${DOMAIN}/api/books/getShelfBooks/${userFirebaseId}`,
    []
  );

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
          key={book._id}
          book={book as BookType}
          onBookDetailsEnter={onBookDetailsEnter}
          onReadingModeEnter={onReadingModeEnter}
        />
      ))}
      {books?.length === 0 && (
        <StyledText style={styles.noBooksAddedText}>
          Nie masz jeszcze dodanych książek
        </StyledText>
      )}
      {isLoading && <StyledText>Loading...</StyledText>}
      {error && <StyledText>{error.message}</StyledText>}
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
  noBooksAddedText: {
    fontSize: 16,
  },
});
