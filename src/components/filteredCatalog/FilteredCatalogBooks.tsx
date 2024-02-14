import { View, StyleSheet } from "react-native";
import SmallBookCard from "../../components/book/cards/SmallBookCard";
import StyledText from "../../components/ui/StyledText";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext } from "react";
import { BookContext } from "../../store/BookContext";
import { TabsContext } from "../../store/TabsContext";
import { Book } from "../../types/database";
import useQuery from "../../hooks/useQuery";
import { DOMAIN } from "@env";

export default function FilteredCatalogBooks({
  category,
}: {
  category: string;
}) {
  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>(
    `${DOMAIN}/api/books/getFilteredBooksByCategory/${category}`,
    []
  );

  function handleBookDetailsEnter(book: Book) {
    onBookDetailsEnter(book);
    onTabsVisibilityChange(false);
  }

  function handleReadingModeEnter(book: Book) {
    onReadingModeEnter(book);
    onTabsVisibilityChange(false);
  }

  return (
    <View>
      {books?.map((book) => (
        <SmallBookCard
          key={book._id}
          book={book}
          onBookDetailsEnter={handleBookDetailsEnter}
          onReadingModeEnter={handleReadingModeEnter}
        />
      ))}
      <Spinner visible={isLoading} />
      {error && <StyledText>Wystąpił błąd: {error.message}</StyledText>}
      {books && books?.length === 0 && !isLoading && (
        <StyledText style={styles.noBooksInTheCategoryText}>
          Nie mamy jeszcze książek z tej kategorii.
        </StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBooksInTheCategoryText: {
    fontSize: 16,
  },
});
