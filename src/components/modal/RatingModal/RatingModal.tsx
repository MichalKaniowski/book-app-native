import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../../../store/ThemeContext";
import axios from "axios";
import { DOMAIN } from "@env";
import Modal from "react-native-modal";
import RatingModalInfo from "./RatingModalInfo";
import RatingModalStars from "./RatingModalStars";

interface RatingModalProps {
  onRatingAdd: () => void;
  onModalClose: () => void;
  hasRatedTheBook: boolean;
  bookId: string;
  userFirebaseId: string;
}

export default function RatingModal({
  onRatingAdd,
  onModalClose,
  hasRatedTheBook,
  bookId,
  userFirebaseId,
}: RatingModalProps) {
  const [numberOfStars, setNumberOfStars] = useState(5);

  const { theme } = useContext(ThemeContext);

  async function handleRatingAdd() {
    onModalClose();
    await axios
      .post(`${DOMAIN}/api/books/addBookRating`, {
        bookId,
        userFirebaseId,
        number: numberOfStars,
      })
      .catch((error) => console.log(error));
    onRatingAdd();
  }

  return (
    <Modal isVisible={true} hasBackdrop={true} onBackdropPress={onModalClose}>
      <View style={styles.modalContentContainer}>
        <TouchableOpacity
          onPress={onModalClose}
          style={styles.closeModalButton}
        >
          <FeatherIcon name="x" color="#fff" size={22} />
        </TouchableOpacity>

        <RatingModalInfo hasRatedTheBook={hasRatedTheBook} />

        <RatingModalStars
          numberOfStars={numberOfStars}
          onNumberOfStarsChange={(number: number) => setNumberOfStars(number)}
        />

        <TouchableOpacity
          onPress={handleRatingAdd}
          style={{ ...styles.submitButton, backgroundColor: theme.accent }}
        >
          <Text style={{ fontWeight: "bold" }}>zatwierdź</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalContentContainer: { backgroundColor: "black", padding: 10 },
  modal: {
    backgroundColor: "#222",
    padding: 20,
    zIndex: 10000,
    opacity: 1,
  },
  closeModalButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  infoText: {
    color: "#fff",
  },
  starsRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
});
