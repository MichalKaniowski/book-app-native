import { useContext } from "react";
import { useQuery } from "convex/react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { api } from "../../convex/_generated/api";
import { Book } from "../types/database";
import Icon from "react-native-vector-icons/Feather";
import SmallBookCard from "../components/SmallBookCard";
import { ThemeContext } from "../store/ThemeContext";
import { BookContext } from "../store/BookContext";
import ReadingModeBook from "../components/ReadingModeBook";
import BookDetails from "../components/BookDetails";

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
    onReadingModeExit,
    onBookDetailsExit,
  } = useContext(BookContext);

  const books: Book[] | undefined = useQuery(api.books.getFilteredBooks, {
    filterCriteria: category as CategoryType,
  });

  if (openedBook && isInReadingMode) {
    return (
      <ReadingModeBook
        book={openedBook!}
        onReadingModeExit={onReadingModeExit}
      />
    );
  }

  if (openedBook) {
    return (
      <BookDetails
        book={openedBook}
        onExit={onBookDetailsExit}
        onReadingModeEnter={onReadingModeEnter}
      />
    );
  }

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={18} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="filter" size={18} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ ...styles.mainHeading, color: theme.text }}>
          {categoryTitle}
        </Text>

        <View style={styles.booksContainer}>
          {books?.map((book) => (
            <SmallBookCard
              key={book._id}
              book={book}
              onBookDetailsEnter={onBookDetailsEnter}
              onReadingModeEnter={onReadingModeEnter}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  booksContainer: {},
});
