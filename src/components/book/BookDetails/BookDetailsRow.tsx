import { View, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "../../ui/StyledText";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeContext";

interface BookDetailsRowProps {
  estimatedReadingTime: number;
  rating: number;
  age: number;
  hasRatedTheBook: boolean;
  onSetIsRatingModalOpen: (value: boolean) => void;
}

export default function BookDetailsRow({
  estimatedReadingTime,
  rating,
  age,
  hasRatedTheBook,
  onSetIsRatingModalOpen,
}: BookDetailsRowProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.bookDetailsRow}>
      <View style={styles.iconContainer}>
        <FeatherIcon name="clock" size={15} color={theme.text} />
        <StyledText style={styles.bookDetailsText}>
          {estimatedReadingTime} min
        </StyledText>
      </View>
      <View style={styles.bookDetailsRightColumn}>
        <TouchableOpacity
          onPress={() => onSetIsRatingModalOpen(true)}
          style={{ ...styles.iconContainer, ...styles.ratingButton }}
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
  );
}

const styles = StyleSheet.create({
  bookDetailsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  bookDetailsText: {
    fontSize: 16,
  },
  bookDetailsRightColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  ratingButton: { marginRight: 10 },
});
