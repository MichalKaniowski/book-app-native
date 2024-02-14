import { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import StyledText from "../components/ui/StyledText";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeContext } from "../store/ThemeContext";
import useQuery from "../hooks/useQuery";
import { Book as BookType } from "../types/database";
import { DOMAIN } from "@env";
import BooksPublishedInPeriod from "./book/BooksPublishedInPeriod";
import getStringDate from "../utils/getStringDate";

export default function NewScreenBody() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery<BookType[]>(`${DOMAIN}/api/books/getBooks`, []);

  const { theme } = useContext(ThemeContext);

  const dateString = getStringDate();

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
          {dateString}
        </StyledText>

        <BooksPublishedInPeriod
          books={books}
          lastDaysStart={0}
          lastDaysEnd={7}
          headingText="Opublikowane ostatnio"
        />

        <BooksPublishedInPeriod
          books={books}
          lastDaysStart={7}
          lastDaysEnd={14}
          headingText="Opublikowane w ostatnim tygodniu"
        />

        <BooksPublishedInPeriod
          books={books}
          lastDaysStart={14}
          lastDaysEnd={Infinity}
          headingText="Opublikowane dawniej"
        />
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
});
