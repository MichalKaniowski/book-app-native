import { useState, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import StyledText from "../ui/StyledText";
import SearchResults from "./SearchResults";
import Categories from "./Categories";
import { ThemeContext } from "../../store/ThemeContext";
import { useDebounce } from "../../hooks/useDebounce";
import BookRecommendations from "../book/BookRecommendations";
import InputSection from "./InputSections";

export default function CatalogBody({ navigation }: any) {
  const [searchText, setSearchText] = useState("");

  const debouncedText = useDebounce(searchText, 500);

  const { theme } = useContext(ThemeContext);

  const catalogBody = (
    <>
      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Polecane</StyledText>
        <BookRecommendations />
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Kategorie</StyledText>
        <Categories navigation={navigation} />
      </View>
    </>
  );

  const catalogContent =
    debouncedText !== "" ? <SearchResults text={debouncedText} /> : catalogBody;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Katalog</StyledText>
      <InputSection
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />
      {catalogContent}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
