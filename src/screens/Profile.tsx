import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import StyledText from "../components/ui/StyledText";
import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import Icon from "react-native-vector-icons/Fontisto";

export default function Profile() {
  const { theme } = useContext(ThemeContext);

  // mocked data
  const stats: string[] = [];
  const badges: string[] = [];

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 10 }}>
      <View style={styles.header}>
        <StyledText style={styles.mainHeading}>Profile</StyledText>
        <TouchableOpacity style={styles.buyButton}>
          <Icon name="locked" size={18} />
          <Text style={styles.buyButtonText}>Odblokuj wszystkie bajki</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Twoje statystyki</StyledText>
        <View>
          {!stats || stats.length === 0 ? (
            <StyledText>Nie masz jeszcze żadnych statystyk.</StyledText>
          ) : (
            <View></View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Twoje odznaki</StyledText>
        {!badges || badges.length === 0 ? (
          <StyledText>Nie masz jeszcze żadnych odznak.</StyledText>
        ) : (
          <View></View>
        )}
      </View>

      <View style={styles.profileSettingsContainer}>
        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zrecenzuj naszą aplikację
          </StyledText>
        </View>

        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Skonaktuj się z nami
          </StyledText>
        </View>

        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zmień język
          </StyledText>
        </View>
        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zmień motyw kolorów
          </StyledText>
        </View>
        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <View style={styles.boxWithTextAndIcon}>
            <StyledText style={styles.profileSettingsText}>
              Odblokuj wszystkie książki
            </StyledText>
            <Icon name="locked" size={16} color="gold" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "yellow",
    width: 105,
    padding: 5,
    borderRadius: 10,
  },
  buyButtonText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionHeading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  profileSettingsContainer: {},
  profileSettingsBox: {},
  profileSettingsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boxWithTextAndIcon: {
    flexDirection: "row",
    gap: 10,
  },
  border: {
    borderTopWidth: 0.5,
    marginVertical: 10,
  },
});
