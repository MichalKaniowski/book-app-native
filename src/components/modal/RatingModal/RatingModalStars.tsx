import { View, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

interface RatingModalStarsProps {
  numberOfStars: number;
  onNumberOfStarsChange: (number: number) => void;
}

export default function RatingModalStars({
  numberOfStars,
  onNumberOfStarsChange,
}: RatingModalStarsProps) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <FeatherIcon
          key={rating}
          name="star"
          onPress={() => onNumberOfStarsChange(rating)}
          style={{
            color: numberOfStars >= rating ? "orange" : "#fff",
          }}
          size={30}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
  },
});
