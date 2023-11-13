import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Book } from "../types/database";

interface BookCardProps {
  book: Book;
  onBookOpen: (book: Book) => void;
}

// function CustomButton() {
//   return <TouchableOpa
// }

export default function BookCard({ book, onBookOpen }: BookCardProps) {
  const keywordsString = book?.keywords.join(", ");

  return (
    <TouchableOpacity style={styles.book} onPress={() => onBookOpen(book)}>
      <Image
        source={require("../../assets/elephant22.webp")}
        style={styles.bookImage}
        alt="elephant image"
      />
      <LinearGradient
        colors={["#AFE1AF", "#097969"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        style={styles.bookGradient}
      >
        <Text style={styles.bookCategories}>{keywordsString}</Text>
        <Text style={styles.bookTitle}>{book?.title}</Text>
        <View style={styles.bookInfo}>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="clock" size={20} color="white" />
            <Text style={styles.bookInfoColumnText}>
              {book?.estimatedReadingTime} min
            </Text>
          </View>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="smile" size={20} color="white" />
            <Text style={styles.bookInfoColumnText}>{book?.age}+</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  book: {
    backgroundColor: "green",
    borderRadius: 30,
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    aspectRatio: "1/1",
    maxHeight: 450,
  },
  bookGradient: {
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  bookCategories: { color: "white" },
  bookTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bookInfoColumn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bookInfoColumnText: { color: "white", fontSize: 16 },
});
