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
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeContext";

type ReadingModeBookProps = Book & {
  onExit: () => void;
  onReadingModeEnter: (book?: Book) => void;
};

export default function BookDetails({
  title,
  keywords,
  author,
  description,
  discussionTopics,
  estimatedReadingTime,
  age,
  translator,
  illustrator,
  onExit,
  onReadingModeEnter,
}: ReadingModeBookProps) {
  const keywordsString = keywords.join(", ");

  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <Image
        source={require("../../../assets/elephant22.webp")}
        style={styles.bookImage}
        alt="elephant image"
      />
      <TouchableOpacity
        style={{ ...styles.exitBookButton, backgroundColor: theme.background }}
        onPress={onExit}
      >
        <FeatherIcon name="arrow-left" size={20} color={theme.text} />
      </TouchableOpacity>

      <StyledView style={styles.bookInfo}>
        <StyledText style={styles.bookTitle}>{title}</StyledText>
        <Text style={{ color: theme.secondary, fontSize: 14 }}>
          {keywordsString}
        </Text>
        <TouchableOpacity
          style={styles.readBookButton}
          onPress={() => onReadingModeEnter()}
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
            <View style={{ ...styles.iconContainer, marginRight: 10 }}>
              <FeatherIcon name="star" size={15} color={theme.text} />
              <StyledText style={styles.bookDetailsText}>
                {estimatedReadingTime.toFixed(2)}
              </StyledText>
            </View>
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
            <View key={topic} style={{ flexDirection: "row", marginBottom: 5 }}>
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
              <StyledText>{author}</StyledText>
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
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
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