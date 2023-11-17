import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import StyledText from "./ui/StyledText";
import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";

export default function Category() {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={styles.categoryBody}>
        <View style={{ marginRight: 10 }}>
          <Icon name="heart" size={20} style={{ color: theme.text }} />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <StyledText style={styles.categoryTitle}>Category</StyledText>
            <Icon name="arrowright" size={25} style={{ color: theme.text }} />
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#222" }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  categoryBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
