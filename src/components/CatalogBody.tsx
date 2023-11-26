import { useState, useContext } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BookRecommendation from "./book/BookRecommendation";
import StyledText from "./ui/StyledText";
import { Book as BookType } from "../types/database";
import SearchResults from "../components/SearchResults";
import Categories from "./Categories";
import { ThemeContext } from "../store/ThemeContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CatalogBody({ navigation }: any) {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasPressed, setHasPressed] = useState(false);

  const bookRecommendations = useQuery(api.books.getBookRecommendations);

  const { theme, actualTheme } = useContext(ThemeContext);

  const catalogBody = (
    <>
      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Redakcja poleca</StyledText>
        <ScrollView style={styles.recommendations} horizontal={true}>
          {bookRecommendations?.map((book: BookType) => (
            <BookRecommendation key={book._id} book={book} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Kategorie</StyledText>
        <Categories navigation={navigation} />
      </View>
    </>
  );

  const body =
    hasSearched && searchText !== "" ? (
      <SearchResults text={searchText} />
    ) : (
      catalogBody
    );

  const componentBody = (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Katalog</StyledText>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(txt) => setSearchText(txt)}
          value={searchText}
          style={{
            ...styles.textInput,
            color: theme.text,
            backgroundColor: actualTheme === "light" ? "lightgrey" : "#222",
          }}
          onSubmitEditing={() => setHasSearched(true)}
          onPressIn={() => setHasPressed(true)}
          onBlur={() => setHasPressed(false)}
          placeholder="Szukaj"
          placeholderTextColor={theme.secondary}
        />

        {hasPressed && (
          <TouchableOpacity onPress={() => setHasPressed(false)}>
            <StyledText style={styles.cancelSearchButton}>Anuluj</StyledText>
          </TouchableOpacity>
        )}
      </View>
      {body}
    </ScrollView>
  );

  return componentBody;
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
  textInput: {
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 20,
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
  recommendations: {
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
  },
  cancelSearchButton: {
    marginLeft: 10,
    fontSize: 15,
    marginTop: 2,
  },
});
