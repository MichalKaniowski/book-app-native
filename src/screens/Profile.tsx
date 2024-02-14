import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import StyledText from "../components/ui/StyledText";
import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import ProfileStatistics from "../components/profile/ProfileStatistics";
import ProfileSettings from "../components/profile/ProfileSettings";

export default function Profile() {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <View style={styles.header}>
        <StyledText style={styles.mainHeading}>Profil</StyledText>
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Twoje statystyki</StyledText>
        <ProfileStatistics />
      </View>

      <ProfileSettings />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionHeading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
  },
});
