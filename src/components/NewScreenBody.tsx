import { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import BookCard from "../components/book/BookCard";
import StyledText from "../components/ui/StyledText";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeContext } from "../store/ThemeContext";
import useQuery from "../hooks/useQuery";
import { Book as BookType } from "../types/database";
import { DOMAIN } from "@env";
import { TabsContext } from "../store/TabsContext";
import { BookContext } from "../store/BookContext";
import hasBeenPublishedInSpecifiedTime from "../utils/hasBeenPublishedInSpecifiedTime";

export default function NewScreenBody() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery<BookType[]>(`${DOMAIN}/api/books/getBooks`, []);

  const { theme } = useContext(ThemeContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);
  const { onBookDetailsEnter } = useContext(BookContext);

  const booksPublishedInThisWeek = books?.filter((book) =>
    hasBeenPublishedInSpecifiedTime(book?._createdAt, 0, 7)
  );

  const booksPublishedInLastWeek = books?.filter((book) =>
    hasBeenPublishedInSpecifiedTime(book?._createdAt, 7, 14)
  );

  const booksPublishedEarlier = books?.filter((book) =>
    hasBeenPublishedInSpecifiedTime(book._createdAt, 14, Infinity)
  );

  function handleBookOpen(book: BookType) {
    onTabsVisibilityChange(false);
    onBookDetailsEnter(book);
  }

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Usypianie z bajką?</StyledText>
      <StyledText style={styles.mainHeading}>
        Bezcenne! <EntypoIcon name="open-book" size={30} />
      </StyledText>

      <Spinner visible={isLoading} />
      {error && <StyledText>Wystąpił błąd: {error.message}</StyledText>}

      <View style={styles.contentContainer}>
        <StyledText style={styles.date} secondary>
          niedziela, 5 listopada
        </StyledText>

        {booksPublishedInThisWeek?.length !== 0 && (
          <View style={styles.section}>
            <StyledText style={styles.sectionHeading}>Nowe bajki</StyledText>
            {booksPublishedInThisWeek?.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onBookOpen={handleBookOpen}
              />
            ))}
          </View>
        )}

        {booksPublishedInLastWeek?.length !== 0 && (
          <View style={styles.section}>
            <StyledText style={styles.sectionHeading}>
              Opublikowane w ostatnim tygodniu
            </StyledText>
            {booksPublishedInLastWeek?.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onBookOpen={handleBookOpen}
              />
            ))}
          </View>
        )}
        {booksPublishedEarlier?.length !== 0 && (
          <View style={styles.section}>
            <StyledText style={styles.sectionHeading}>
              Opublikowane dawniej
            </StyledText>
            {booksPublishedEarlier?.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onBookOpen={handleBookOpen}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  mainHeading: {
    fontSize: 34,
    fontWeight: "bold",
  },
  contentContainer: { paddingHorizontal: 10 },
  date: {
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
