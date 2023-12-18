import { TouchableOpacity, StyleSheet, Image } from "react-native";
import StyledText from "../ui/StyledText";
import { Book } from "../../types/database";
import { useContext } from "react";
import { BookContext } from "../../store/BookContext";
import { TabsContext } from "../../store/TabsContext";

export default function BookRecommendationCard({ book }: { book: Book }) {
  const { onBookDetailsEnter } = useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  function handleBookDetailsEnter() {
    onBookDetailsEnter(book);
    onTabsVisibilityChange(false);
  }

  return (
    <TouchableOpacity onPress={handleBookDetailsEnter} style={styles.container}>
      <Image
        source={{uri: book.imageUrl}}
        style={styles.bookImage}
        alt="elephant image"
      />
      <StyledText style={styles.bookTitle}>{book.title}</StyledText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  bookImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  bookTitle: {
    fontWeight: "500",
    padding: 5,
  },
});
