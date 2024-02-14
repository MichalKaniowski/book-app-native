import { View, StyleSheet } from "react-native";
import { Book } from "../../types/database";
import hasBeenPublishedInSpecifiedTime from "../../utils/hasBeenPublishedInSpecifiedTime";
import StyledText from "../ui/StyledText";
import BookCard from "./cards/BookCard";
import { useContext } from "react";
import { BookContext } from "../../store/BookContext";
import { TabsContext } from "../../store/TabsContext";

export default function BooksPublishedInPeriod({
  books,
  lastDaysStart,
  lastDaysEnd,
  headingText,
}: {
  books: Book[];
  lastDaysStart: number;
  lastDaysEnd: number;
  headingText: string;
}) {
  const { onTabsVisibilityChange } = useContext(TabsContext);
  const { onBookDetailsEnter } = useContext(BookContext);

  const booksPublishedInLastWeek = books?.filter((book) =>
    hasBeenPublishedInSpecifiedTime(
      book?._createdAt,
      lastDaysStart,
      lastDaysEnd
    )
  );

  function handleBookOpen(book: Book) {
    onTabsVisibilityChange(false);
    onBookDetailsEnter(book);
  }

  return (
    booksPublishedInLastWeek?.length !== 0 && (
      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>{headingText}</StyledText>
        {booksPublishedInLastWeek?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
