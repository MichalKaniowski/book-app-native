import { useContext, useState, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";
import SmallBookCard from "../components/book/SmallBookCard";
import { BookContext } from "../store/BookContext";
import Icon from "react-native-vector-icons/Feather";
import Book from "../components/book/Book";
import { firebaseAuth } from "../../FirebaseConfig";
import { Book as BookType, User } from "../types/database";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";

interface PostRequest {
  books: BookType[];
  user: User | null;
}

export default function Shelf() {
  const [isShowingOnlyUnreadBooks, setIsShowingOnlyUnreadBooks] =
    useState(false);

  const userFirebaseId = firebaseAuth.currentUser?.uid;

  const url = `${DOMAIN}/api/books/getShelfBooks/${userFirebaseId}`;
  const { data, isLoading, error, refetch } = useQuery<PostRequest>(url, {
    books: [],
    user: null,
  });

  useFocusEffect(
    useCallback(() => {
      refetch(url);
    }, [])
  );

  const { books: fetchedBooks, user } = data;

  const { theme } = useContext(ThemeContext);
  const {
    openedBook,
    onBookDetailsEnter,
    onReadingModeEnter,
    onBookDetailsExit,
  } = useContext(BookContext);

  const unreadBooks = fetchedBooks.filter((book) => {
    const bookInFinishedBooks = user?.finishedBooks.find(
      (bookId) => bookId.toString() == book._id
    );
    if (!bookInFinishedBooks) {
      return book;
    }
  });

  const books = isShowingOnlyUnreadBooks ? unreadBooks : fetchedBooks;

  const shelfBody = (
    <ScrollView
      style={{ ...styles.shelfContainer, backgroundColor: theme.background }}
    >
      <View style={styles.header}>
        <Icon
          onPress={() => setIsShowingOnlyUnreadBooks((prevValue) => !prevValue)}
          name="filter"
          size={18}
          color={isShowingOnlyUnreadBooks ? theme.accent : theme.text}
        />
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
      {fetchedBooks?.length === 0 && !isLoading && (
        <StyledText style={styles.noBooksAddedText}>
          Nie masz jeszcze dodanych książek
        </StyledText>
      )}
      {books.length === 0 && isShowingOnlyUnreadBooks && (
        <StyledText style={styles.noBooksAddedText}>
          Nie masz nieprzeczytanych książek w bibliotece
        </StyledText>
      )}
      <Spinner visible={isLoading} />
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
