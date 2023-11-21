import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import BookCard from "../components/BookCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "react-native-get-random-values";
import { Book as BookType } from "../types/database";
import { useState } from "react";
import Book from "../components/Book";
import { ThemeContext } from "../store/ThemeContext";
import StyledText from "../components/ui/StyledText";
import { TabsContext } from "../store/TabsContext";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function hasBeenPublishedInTheSpecifiedTime(
  creationTimeMilliseconds: number,
  lastDaysStart: number,
  lastDaysEnd: number
) {
  const currentTimeMilliseconds = new Date().getTime();
  const timeDifferenceMilliseconds =
    currentTimeMilliseconds - creationTimeMilliseconds;
  const timeDifferenceDays = timeDifferenceMilliseconds / (1000 * 60 * 60 * 24);

  return (
    timeDifferenceDays <= lastDaysEnd && timeDifferenceDays >= lastDaysStart
  );
}

export default function New({ navigation }: RouterProps) {
  const [openedBook, setOpenedBook] = useState<BookType | null>(null);

  const { theme } = useContext(ThemeContext);
  const { isTabsOpen, onTabsVisibilityChange } = useContext(TabsContext);

  const books: BookType[] | undefined = useQuery(api.books.get);

  const booksPublishedInThisWeek = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book?._creationTime, 0, 7)
  );

  const booksPublishedInLastWeek = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book?._creationTime, 7, 14)
  );

  const booksPublishedEarlier = books?.filter((book) =>
    hasBeenPublishedInTheSpecifiedTime(book._creationTime, 14, Infinity)
  );

  function handleBookOpen(book: BookType) {
    onTabsVisibilityChange(false);
    setOpenedBook(book);
  }

  function handleOpenedBookExit() {
    onTabsVisibilityChange(true);
    setOpenedBook(null);
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
        niedziela, 5 listopada
      </StyledText>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Nowe bajki</StyledText>
        {booksPublishedInThisWeek?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>
          W ostatnim tygodniu
        </StyledText>
        {booksPublishedInLastWeek?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Dawniej</StyledText>
        {booksPublishedEarlier?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
    </ScrollView>
  );

  return !openedBook ? (
    NewComponent
  ) : (
    <Book book={openedBook!} onExit={handleOpenedBookExit} />
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
