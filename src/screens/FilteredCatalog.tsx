import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../store/ThemeContext";
import { BookContext } from "../store/BookContext";
import ReadingModeBook from "../components/book/ReadingMode/ReadingModeBook";
import BookDetails from "../components/book/BookDetails/BookDetails";
import { TabsContext } from "../store/TabsContext";
import StyledText from "../components/ui/StyledText";
import FeatherIcon from "react-native-vector-icons/Feather";
import FilteredCatalogBooks from "../components/filteredCatalog/FilteredCatalogBooks";

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
  const { onReadingModeEnter, openedBook, isInReadingMode, onBookDetailsExit } =
    useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  function handleBookDetailsExit() {
    onBookDetailsExit();
    onTabsVisibilityChange(true);
  }

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

        <FilteredCatalogBooks category={category} />
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
});
