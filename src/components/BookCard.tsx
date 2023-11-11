import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function BookCard() {
  return (
    <View style={styles.book}>
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
        <Text style={styles.bookCategories}>Rodzina, Tradycje, Odporność</Text>
        <Text style={styles.bookTitle}>Maginczna noc</Text>
        <View style={styles.bookInfo}>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="clock" size={20} color="white" />
            <Text style={styles.bookInfoColumnText}>6min</Text>
          </View>
          <View style={styles.bookInfoColumn}>
            <FeatherIcon name="smile" size={20} color="white" />
            <Text style={styles.bookInfoColumnText}>3+</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
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
