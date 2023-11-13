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
    setOpenedBook(book);
  }

  function handleOpenedBookExit() {
    setOpenedBook(null);
  }

  const New = (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Usypianie z bajką?</Text>
      <Text style={styles.mainHeading}>
        Bezcenne! <EntypoIcon name="open-book" size={30} />
      </Text>

      <Text style={styles.date}>niedziela, 5 listopada</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Nowe bajki</Text>
        {booksPublishedInThisWeek?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>W ostatnim tygodniu</Text>
        {booksPublishedInLastWeek?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Dawniej</Text>
        {booksPublishedEarlier?.map((book) => (
          <BookCard key={book._id} book={book} onBookOpen={handleBookOpen} />
        ))}
      </View>
    </ScrollView>
  );

  return !openedBook ? (
    New
  ) : (
    <Book book={openedBook!} onExit={handleOpenedBookExit} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "white",
    height: "100%",
    padding: 5,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    color: "grey",
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
});
