import { View, Text, StyleSheet } from "react-native";

export default function RatingModalInfo({
  hasRatedTheBook,
}: {
  hasRatedTheBook: boolean;
}) {
  return hasRatedTheBook ? (
    <View style={styles.modalInfoContainer}>
      <Text style={styles.modalHeading}>Zostawiłeś już ocenę.</Text>
      <Text style={styles.infoText}>
        Czy jesteś pewien, że chcesz zmienić swoją ocenę?
      </Text>
    </View>
  ) : (
    <View style={styles.modalInfoContainer}>
      <Text style={styles.modalHeading}>Oceń książkę</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalInfoContainer: { marginBottom: 10, gap: 2 },
  modalHeading: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
});
