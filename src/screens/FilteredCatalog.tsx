import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Book } from "../types/database";
import SmallBookCard from "../components/book/cards/SmallBookCard";
import { ThemeContext } from "../store/ThemeContext";
import { BookContext } from "../store/BookContext";
import ReadingModeBook from "../components/book/ReadingMode/ReadingModeBook";
import BookDetails from "../components/book/BookDetails/BookDetails";
import { TabsContext } from "../store/TabsContext";
import StyledText from "../components/ui/StyledText";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import FeatherIcon from "react-native-vector-icons/Feather";

export type CategoryType =
  | "3+"
  | "5+"
  | "8+"
  | "science"
  | "nature"
  | "sleep"
  | "pets";

export default function FilteredCatalog({ route, navigation }: any) {
  const { categoryTitle, category } = route.params;

  const { theme } = useContext(ThemeContext);
  const {
    onBookDetailsEnter,
    onReadingModeEnter,
    openedBook,
    isInReadingMode,
    onBookDetailsExit,
  } = useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  function handleBookDetailsEnter(book: Book) {
    onBookDetailsEnter(book);
    onTabsVisibilityChange(false);
  }

  function handleReadingModeEnter(book: Book) {
    onReadingModeEnter(book);
    onTabsVisibilityChange(false);
  }

  function handleBookDetailsExit() {
    onBookDetailsExit();
    onTabsVisibilityChange(true);
  }

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>(
    `${DOMAIN}/api/books/getFilteredBooksByCategory/${category}`,
    []
  );

  if (openedBook && isInReadingMode) {
    return <ReadingModeBook {...openedBook} />;
  }

  if (openedBook) {
    return (
      <BookDetails
        book={openedBook}
        onExit={handleBookDetailsExit}
        onReadingModeEnter={onReadingModeEnter}
      />
    );
  }

  return (
    <View style={{ backgroundColor: theme.background, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FeatherIcon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <StyledText style={styles.mainHeading}>{categoryTitle}</StyledText>

        <View style={styles.booksContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  contentContainer: { padding: 10 },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  booksContainer: {},
  noBooksInTheCategoryText: {
    fontSize: 16,
  },
});
