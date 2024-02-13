import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Book } from "../../../types/database";
import FeatherIcon from "react-native-vector-icons/Feather";
import StyledView from "../../ui/StyledView";
import StyledText from "../../ui/StyledText";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../store/ThemeContext";
import { firebaseAuth } from "../../../../FirebaseConfig";
import useFetchUser from "../../../hooks/useFetchUser";
import RatingModal from "../../modal/RatingModal/RatingModal";
import BookDetailsRow from "./BookDetailsRow";
import DiscussionTopics from "./DiscussionTopics";
import CreditsSection from "./CreditsSection";
import BookInfo from "./BookInfo";

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
  const userId = firebaseAuth?.currentUser?.uid;

  const { data: user, refetch } = useFetchUser(userId!);

  const hasRatedTheBook =
    user?.ratedBooks.find((bookId) => bookId.toString() === _id) !== undefined;

  return (
    <>
      {isRatingModalOpen && (
        <RatingModal
          onRatingAdd={() => refetch(userId || "")}
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
          <BookInfo
            keywords={keywords}
            title={title}
            userFirebaseId={userId}
            book={book}
            onReadingModeEnter={onReadingModeEnter}
          />

          <View style={styles.border} />

          <BookDetailsRow
            estimatedReadingTime={estimatedReadingTime}
            rating={rating}
            age={age}
            hasRatedTheBook={hasRatedTheBook}
            onSetIsRatingModalOpen={setIsRatingModalOpen}
          />

          <View style={styles.border} />

          <StyledText style={styles.description}>{description}</StyledText>

          <DiscussionTopics discussionTopics={discussionTopics} />

          <CreditsSection
            author={author}
            illustrator={illustrator}
            translator={translator}
          />
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
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
  description: {
    lineHeight: 18,
    marginBottom: 20,
  },
});
