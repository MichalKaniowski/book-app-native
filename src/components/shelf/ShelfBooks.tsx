import { View, StyleSheet, RefreshControl } from "react-native";
import StyledText from "../../components/ui/StyledText";
import SmallBookCard from "../../components/book/cards/SmallBookCard";
import { Book, User } from "../../types/database";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext } from "react";
import { BookContext } from "../../store/BookContext";

interface ShelfBooksProps {
  books: Book[];
  user: User | null;
  isShowingOnlyUnreadBooks: boolean;
  isLoading: boolean;
  refreshing: boolean;
  error: Error | null;
}

export default function ShelfBooks({
  books,
  user,
  isShowingOnlyUnreadBooks,
  isLoading,
  refreshing,
  error,
}: ShelfBooksProps) {
  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);

  const unreadBooks = books.filter((book) => {
    const bookInFinishedBooks = user?.finishedBooks.find(
      (bookId) => bookId.toString() == book._id
    );
    if (!bookInFinishedBooks) {
      return book;
    }
  });

  const booksToDisplay = isShowingOnlyUnreadBooks ? unreadBooks : books;

  return (
    <View>
      {isShowingOnlyUnreadBooks && (
        <View style={styles.showingUnreadBooksBox}>
          <StyledText style={styles.showingUnreadBooksText}>
            Obecnie pokazywane są tylko nieprzeczytane książki.
          </StyledText>
        </View>
      )}

      {booksToDisplay?.map((book) => (
        <SmallBookCard
          key={book._id}
          book={book as Book}
          onBookDetailsEnter={onBookDetailsEnter}
          onReadingModeEnter={onReadingModeEnter}
        />
      ))}
      {books?.length === 0 && !isLoading && (
        <StyledText style={styles.noBooksAddedText}>
          Nie masz jeszcze dodanych książek
        </StyledText>
      )}
      {books.length === 0 && isShowingOnlyUnreadBooks && (
        <StyledText style={styles.noBooksAddedText}>
          Nie masz nieprzeczytanych książek w bibliotece
        </StyledText>
      )}
      <Spinner visible={isLoading && !refreshing} />
      {error && <StyledText>{error.message}</StyledText>}
    </View>
  );
}

const styles = StyleSheet.create({
  showingUnreadBooksBox: {
    backgroundColor: "grey",
    padding: 8,
    marginBottom: 15,
  },
  showingUnreadBooksText: {
    textAlign: "center",
  },
  noBooksAddedText: {
    fontSize: 16,
  },
});
