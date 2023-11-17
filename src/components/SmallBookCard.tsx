import { View, Text, StyleSheet, Image } from "react-native";
import StyledText from "./ui/StyledText";

export default function SmallBookCard() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/elephant22.webp")}
        style={styles.bookImage}
        alt="elephant image"
      />
      <View style={{ padding: 5 }}>
        <StyledText>Słonik</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  bookImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
});
