import { useContext } from "react";
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
import { ThemeContext } from "../store/ThemeContext";
import StyledText from "./ui/StyledText";

interface BookCardProps {
  book: Book;
  onBookOpen: (book: Book) => void;
}

export default function BookCard({ book, onBookOpen }: BookCardProps) {
  const { theme } = useContext(ThemeContext);
  const keywordsString = book?.keywords.join(", ");

  return (
    <TouchableOpacity
      style={{ ...styles.book, backgroundColor: theme.accent }}
      onPress={() => onBookOpen(book)}
    >
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
        <StyledText>{keywordsString}</StyledText>
        <StyledText style={styles.bookTitle}>{book?.title}</StyledText>
        <View style={styles.bookInfo}>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="clock" size={20} color={theme.text} />
            <StyledText style={styles.bookInfoColumnText}>
              {book?.estimatedReadingTime} min
            </StyledText>
          </View>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="smile" size={20} color={theme.text} />
            <StyledText style={styles.bookInfoColumnText}>
              {book?.age}+
            </StyledText>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  book: {
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
  bookTitle: {
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
  bookInfoColumnText: { fontSize: 16 },
});
