import { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import BookCard from "../components/book/BookCard";
import { Book as BookType } from "../types/database";
import Book from "../components/book/Book";
import { ThemeContext } from "../store/ThemeContext";
import StyledText from "../components/ui/StyledText";
import { TabsContext } from "../store/TabsContext";
import { BookContext } from "../store/BookContext";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import Spinner from "react-native-loading-spinner-overlay";

function hasBeenPublishedInTheSpecifiedTime(
  creationTimeInSeconds: number,
  lastDaysStart: number,
  lastDaysEnd: number
) {
  const currentTimeInSeconds = new Date().getTime() / 1000;

  const timeDifferenceInSeconds = currentTimeInSeconds - creationTimeInSeconds;
  const timeDifferenceDays = timeDifferenceInSeconds / (24 * 60 * 60);

  return (
    timeDifferenceDays <= lastDaysEnd && timeDifferenceDays >= lastDaysStart
  );
}

export default function New() {
  const { openedBook, onBookDetailsEnter, onBookDetailsExit } =
    useContext(BookContext);
  const { theme } = useContext(ThemeContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);
  const {
    data: books,
    isLoading,
    error,
  } = useQuery<BookType[]>(`${DOMAIN}/api/books/getBooks`, []);

  const date = new Date();
  const month = date.toLocaleString("pl", { month: "long" });
  const dayNumber = date.getDate();
  const weekDay = date
    .toLocaleDateString("pl", { weekday: "long" })
    .split(",")[0];

  const booksPublishedInThisWeek = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book?._createdAt, 0, 7)
  );

  const booksPublishedInLastWeek = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book?._createdAt, 7, 14)
  );

  const booksPublishedEarlier = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book._createdAt, 14, Infinity)
  );

  function handleBookOpen(book: BookType) {
    onTabsVisibilityChange(false);
    onBookDetailsEnter(book);
  }

  function handleOpenedBookExit() {
    onTabsVisibilityChange(true);
    onBookDetailsExit();
  }

  const NewComponent = (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Usypianie z bajką?</StyledText>
      <StyledText style={styles.mainHeading}>
        Bezcenne! <EntypoIcon name="open-book" size={30} />
      </StyledText>

      <StyledText style={styles.date} secondary>
        {weekDay}, {dayNumber} {month}
      </StyledText>

      <Spinner visible={isLoading} />
      {error && <StyledText>An error occured: {error.message}</StyledText>}

      {booksPublishedInThisWeek?.length !== 0 && (
        <View style={styles.section}>
          <StyledText style={styles.sectionHeading}>Nowe bajki</StyledText>
          {booksPublishedInThisWeek?.map((book) => (
            <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
          ))}
        </View>
      )}

      {booksPublishedInLastWeek?.length !== 0 && (
        <View style={styles.section}>
          <StyledText style={styles.sectionHeading}>
            W ostatnim tygodniu
          </StyledText>
          {booksPublishedInLastWeek?.map((book) => (
            <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
          ))}
        </View>
      )}
      {booksPublishedEarlier?.length !== 0 && (
        <View style={styles.section}>
          <StyledText style={styles.sectionHeading}>Dawniej</StyledText>
          {booksPublishedEarlier?.map((book) => (
            <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
          ))}
        </View>
      )}
    </ScrollView>
  );

  return !openedBook ? (
    NewComponent
  ) : (
    <Book book={openedBook} onExit={handleOpenedBookExit} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
  },
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
