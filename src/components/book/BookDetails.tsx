import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Book } from "../../types/database";
import FeatherIcon from "react-native-vector-icons/Feather";
import StyledView from "../ui/StyledView";
import StyledText from "../ui/StyledText";
import { useContext, useState } from "react";
import { ThemeContext } from "../../store/ThemeContext";
import { firebaseAuth } from "../../../FirebaseConfig";
import { DOMAIN } from "@env";
import axios from "axios";
import RatingModal from "../ui/RatingModal";
import useFetchUser from "../../hooks/useFetchUser";

type ReadingModeBookProps = {
  book: Book;
  onExit: () => void;
  onReadingModeEnter: (book?: Book) => void;
};

export default function BookDetails({
  book,
  onExit,
  onReadingModeEnter,
}: ReadingModeBookProps) {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const {
    _id,
    title,
    keywords,
    author,
    description,
    discussionTopics,
    estimatedReadingTime,
    age,
    translator,
    illustrator,
    rating,
  } = book;

  const { theme } = useContext(ThemeContext);

  const keywordsString = keywords.join(", ");
  const userId = firebaseAuth?.currentUser?.uid;

  const { data: user, refetch } = useFetchUser(userId!);

  const hasRatedTheBook =
    user?.ratedBooks.find((bookId) => bookId.toString() === _id) !== undefined;

  async function handleReadingModeEnter() {
    onReadingModeEnter();

    await axios.post(`${DOMAIN}/api/books/addBookToShelfBooks`, {
      userFirebaseId: userId,
      book,
    });
  }

  return (
    <>
      {isRatingModalOpen && (
        <RatingModal
          onRatingAdd={refetch}
          onModalClose={() => setIsRatingModalOpen(false)}
          bookId={_id}
          userFirebaseId={userId!}
          hasRatedTheBook={hasRatedTheBook}
        />
      )}
      <ScrollView
        style={{
          backgroundColor: theme.background,
          opacity: isRatingModalOpen ? 0.5 : 1,
        }}
      >
        <Image
          source={{ uri: book.imageUrl }}
          style={styles.bookImage}
          alt="book image"
        />
        <TouchableOpacity
          style={{
            ...styles.exitBookButton,
            backgroundColor: theme.background,
          }}
          onPress={onExit}
        >
          <FeatherIcon name="arrow-left" size={22} color={theme.text} />
        </TouchableOpacity>

        <StyledView style={styles.bookInfo}>
          <StyledText style={styles.bookTitle}>{title}</StyledText>
          <Text style={{ color: theme.secondary, fontSize: 14 }}>
            {keywordsString}
          </Text>
          <TouchableOpacity
            style={{ ...styles.readBookButton, backgroundColor: theme.accent }}
            onPress={handleReadingModeEnter}
          >
            <Text style={{ fontWeight: "bold" }}>Czytaj</Text>
          </TouchableOpacity>

          <View style={styles.border} />

          <View style={styles.bookDetails}>
            <View style={styles.iconContainer}>
              <FeatherIcon name="clock" size={15} color={theme.text} />
              <StyledText style={styles.bookDetailsText}>
                {estimatedReadingTime} min
              </StyledText>
            </View>
            <View style={styles.bookDetailsRightColumn}>
              <TouchableOpacity
                onPress={() => setIsRatingModalOpen(true)}
                style={{ ...styles.iconContainer, marginRight: 10 }}
              >
                <FeatherIcon
                  name="star"
                  style={{
                    color: hasRatedTheBook ? "orange" : theme.text,
                  }}
                  size={15}
                />
                <StyledText style={styles.bookDetailsText}>
                  {rating.toFixed(1)}
                </StyledText>
              </TouchableOpacity>
              <View style={styles.iconContainer}>
                <FeatherIcon name="smile" size={15} color={theme.text} />
                <StyledText style={styles.bookDetailsText}>{age}+</StyledText>
              </View>
            </View>
          </View>

          <View style={styles.border} />

          <StyledText style={styles.description}>{description}</StyledText>

          <View style={styles.section}>
            <StyledText style={styles.sectionHeading}>
              Tematy do dyskusji
            </StyledText>
            {discussionTopics.map((topic) => (
              <View
                key={topic}
                style={{ flexDirection: "row", marginBottom: 5 }}
              >
                <StyledText style={{ marginRight: 5 }}>{`\u2022`}</StyledText>
                <StyledText>{topic}</StyledText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <StyledText style={styles.sectionHeading}>Twórcy</StyledText>
            <View>
              <View style={styles.authorRow}>
                <StyledText secondary>Bajka</StyledText>
                <StyledText>{author ? author : "nieznany"}</StyledText>
              </View>
              {illustrator && (
                <View style={styles.authorRow}>
                  <StyledText secondary>Ilustracje</StyledText>
                  <StyledText>{illustrator}</StyledText>
                </View>
              )}
              {translator && (
                <View style={styles.authorRow}>
                  <StyledText secondary>Translacja</StyledText>
                  <StyledText>{translator}</StyledText>
                </View>
              )}
            </View>
          </View>
        </StyledView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  exitBookButton: {
    position: "absolute",
    left: 15,
    top: 15,
    padding: 5,
    borderRadius: 100,
  },
  bookImage: {
    width: "100%",
    height: 300,
  },
  bookInfo: {
    padding: 10,
    borderRadius: 20,
    marginTop: -10,
  },
  bookTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  readBookButton: {
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
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  description: {
    lineHeight: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  authorRow: {
    flexDirection: "row",
    gap: 30,
  },
});
