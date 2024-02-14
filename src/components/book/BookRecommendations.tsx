import { Book } from "../../types/database";
import BookRecommendation from "./BookRecommendation";
import useQuery from "../../hooks/useQuery";
import { DOMAIN } from "@env";
import { ScrollView, StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import StyledText from "../ui/StyledText";

export default function BookRecommendations() {
  const {
    data: bookRecommendations,
    isLoading,
    error,
  } = useQuery<Book[]>(`${DOMAIN}/api/books/getBookRecommendations`, []);

  return (
    <View>
      <Spinner visible={isLoading} />
      {error && <StyledText>Wystąpił błąd {error?.message}</StyledText>}
      <ScrollView style={styles.recommendations} horizontal={true}>
        {bookRecommendations?.map((book: Book) => (
          <BookRecommendation key={book._id} book={book} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeading: {},
  recommendations: {},
});
