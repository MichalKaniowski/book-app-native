import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../../store/ThemeContext";
import axios from "axios";
import { DOMAIN } from "@env";

interface RatingModalProps {
  onModalClose: () => void;
  hasRatedTheBook: boolean;
  bookId: string;
  userFirebaseId: string;
}

export default function RatingModal({
  onModalClose,
  hasRatedTheBook,
  bookId,
  userFirebaseId,
}: RatingModalProps) {
  const [numberOfStars, setNumberOfStars] = useState(5);

  const { theme } = useContext(ThemeContext);

  async function handleRatingAdd() {
    onModalClose();
    await axios.post(`${DOMAIN}/api/books/addBookRating`, {
      bookId,
      userFirebaseId,
      number: numberOfStars,
    });
  }

  return (
    <TouchableOpacity onPress={onModalClose} style={styles.backdrop}>
      {/* modal is a button, because if it's a view every click on modal is being passed to backdrop (because of event bubbling) which closes modal */}
      <TouchableOpacity activeOpacity={1} style={styles.modal}>
        <TouchableOpacity
          onPress={onModalClose}
          style={styles.closeModalButton}
        >
          <FeatherIcon name="x" color="#fff" size={20} />
        </TouchableOpacity>
        {hasRatedTheBook && (
          <>
            <Text style={styles.infoText}>Zostawiłeś już ocenę.</Text>
            <Text style={styles.infoText}>
              Czy jesteś pewien, że chcesz zmienić swoją ocenę?
            </Text>
          </>
        )}
        <View style={styles.starsRow}>
          <FeatherIcon
            name="star"
            onPress={() => setNumberOfStars(1)}
            style={{
              color: numberOfStars >= 1 ? "orange" : "#fff",
            }}
            size={30}
          />
          <FeatherIcon
            name="star"
            onPress={() => setNumberOfStars(2)}
            style={{
              color: numberOfStars >= 2 ? "orange" : "#fff",
            }}
            size={30}
          />
          <FeatherIcon
            name="star"
            onPress={() => setNumberOfStars(3)}
            style={{
              color: numberOfStars >= 3 ? "orange" : "#fff",
            }}
            size={30}
          />
          <FeatherIcon
            name="star"
            onPress={() => setNumberOfStars(4)}
            style={{
              color: numberOfStars >= 4 ? "orange" : "#fff",
            }}
            size={30}
          />
          <FeatherIcon
            name="star"
            onPress={() => setNumberOfStars(5)}
            style={{
              color: numberOfStars >= 5 ? "orange" : "#fff",
            }}
            size={30}
          />
        </View>
        <TouchableOpacity
          onPress={handleRatingAdd}
          style={{ ...styles.submitButton, backgroundColor: theme.accent }}
        >
          <Text>zatwierdź</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#222",
    padding: 20,
    zIndex: 10000,
  },
  closeModalButton: { position: "absolute", right: 5, top: 5 },
  infoText: { color: "#fff" },
  starsRow: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
});
