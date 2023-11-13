import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Book } from "../types/database";
import FeatherIcon from "react-native-vector-icons/Feather";

interface BookProps {
  book: Book;
  onExit: () => void;
  onReadingModeEnter: () => void;
}

export default function BookDetails({
  book,
  onExit,
  onReadingModeEnter,
}: BookProps) {
  const keywordsString = book?.keywords.join(", ");

  return (
    <ScrollView>
      <Image
        source={require("../../assets/elephant22.webp")}
        style={styles.bookImage}
        alt="elephant image"
      />
      <TouchableOpacity style={styles.exitBookButton} onPress={onExit}>
        <FeatherIcon name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={{ color: "#666", fontSize: 14 }}>{keywordsString}</Text>
        <TouchableOpacity
          style={styles.readBookButton}
          onPress={onReadingModeEnter}
        >
          <Text style={{ fontWeight: "bold" }}>Czytaj</Text>
        </TouchableOpacity>

        <View style={styles.border} />

        <View style={styles.bookDetails}>
          <View style={styles.iconContainer}>
            <FeatherIcon name="clock" size={15} color="white" />
            <Text style={styles.bookDetailsText}>
              {book?.estimatedReadingTime} min
            </Text>
          </View>
          <View style={styles.bookDetailsRightColumn}>
            <View style={{ ...styles.iconContainer, marginRight: 10 }}>
              <FeatherIcon name="star" size={15} color="white" />
              <Text style={styles.bookDetailsText}>
                {book?.estimatedReadingTime.toFixed(2)}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <FeatherIcon name="smile" size={15} color="white" />
              <Text style={styles.bookDetailsText}>{book?.age}+</Text>
            </View>
          </View>
        </View>

        <View style={styles.border} />

        <Text style={styles.description}>{book.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Tematy do dyskusji</Text>
          {book.discussionTopics.map((topic) => (
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ color: "#fff", marginRight: 5 }}>{`\u2022`}</Text>
              <Text style={{ color: "#fff" }}>{topic}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Twórcy</Text>
          <View>
            <View style={styles.authorRow}>
              <Text style={styles.authorRowLeftColumnText}>Bajka</Text>
              <Text style={styles.authorRowRightColumnText}>{book.author}</Text>
            </View>
            {book.illustrator && (
              <View style={styles.authorRow}>
                <Text style={styles.authorRowLeftColumnText}>Ilustracje</Text>
                <Text style={styles.authorRowRightColumnText}>
                  {book.illustrator}
                </Text>
              </View>
            )}
            {book.translator && (
              <View style={styles.authorRow}>
                <Text style={styles.authorRowLeftColumnText}>Translacja</Text>
                <Text style={styles.authorRowRightColumnText}>
                  {book.translator}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  exitBookButton: {
    backgroundColor: "#000",
    position: "absolute",
    left: 15,
    top: 15,
    padding: 5,
    borderRadius: 100,
  },
  bookImage: {
    width: "100%",
  },
  bookInfo: {
    padding: 10,
    backgroundColor: "#000",
  },
  bookTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  readBookButton: {
    backgroundColor: "lightgreen",
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
  bookDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookDetailsRightColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bookDetailsText: {
    color: "white",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  description: {
    color: "#fff",
    lineHeight: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionHeading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  authorRow: {
    flexDirection: "row",
    gap: 30,
  },
  authorRowLeftColumnText: {
    color: "grey",
  },
  authorRowRightColumnText: {
    color: "#fff",
  },
});
