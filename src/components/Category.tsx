import { View, StyleSheet, TouchableOpacity } from "react-native";
import StyledText from "./ui/StyledText";
import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

interface CategoryProps {
  name: string;
  icon: any;
  onPress: () => void;
}

export default function Category({ name, icon: Icon, onPress }: CategoryProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.categoryBody}>
        <View style={styles.icon}>{Icon}</View>
        <View style={styles.contentContainer}>
          <View style={styles.titleAndArrowContainer}>
            <StyledText style={styles.categoryTitle}>{name}</StyledText>
            <AntDesignIcon
              name="arrowright"
              size={18}
              style={{ color: theme.secondary }}
            />
          </View>
          <View style={styles.bottomBorder} />
        </View>
      </View>
    </TouchableOpacity>
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
  icon: { marginRight: 10 },
  contentContainer: { flex: 1 },
  titleAndArrowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  bottomBorder: { borderBottomWidth: 0.5, borderBottomColor: "#222" },
});
