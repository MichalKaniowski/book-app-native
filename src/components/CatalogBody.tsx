import { useState, useContext } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import BookRecommendation from "./book/BookRecommendation";
import StyledText from "./ui/StyledText";
import { Book } from "../types/database";
import SearchResults from "./SearchResults";
import Categories from "./Categories";
import { ThemeContext } from "../store/ThemeContext";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function CatalogBody({ navigation }: any) {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasPressed, setHasPressed] = useState(false);

  const {
    data: bookRecommendations,
    isLoading,
    error,
  } = useQuery<Book[]>(`${DOMAIN}/api/books/getBookRecommendations`, []);

  const { theme, actualTheme } = useContext(ThemeContext);

  const catalogBody = (
    <>
      <View style={styles.section}>
        <Spinner visible={isLoading} />
        <StyledText style={styles.sectionHeading}>Redakcja poleca</StyledText>
        {error && <StyledText>An error occured {error?.message}</StyledText>}
        <ScrollView style={styles.recommendations} horizontal={true}>
          {bookRecommendations?.map((book: Book) => (
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
      keyboardShouldPersistTaps="handled"
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Katalog</StyledText>
      <View style={styles.inputContainer}>
        <View
          style={{ width: hasPressed ? "85%" : "100%", position: "relative" }}
        >
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
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
              }}
              style={{
                width: 20,
                height: 20,
                position: "absolute",
                right: 5,
                top: 7,
                zIndex: 1000,
              }}
            >
              <FeatherIcon name="x" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {hasPressed && (
          <TouchableOpacity
            onPress={() => {
              setHasPressed(false);
              Keyboard.dismiss();
            }}
          >
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
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 2 : 8,
    marginBottom: 20,
    height: 34,
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
    marginTop: 7,
  },
});
