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
import { ThemeType } from "../types/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import { firebaseAuth } from "../../FirebaseConfig";
import { User } from "../types/database";


export default function Profile() {
  const { theme, onThemeChange, themeValue } = useContext(ThemeContext);

  const {data: user, isLoading} = useQuery<User | null>(`${DOMAIN}/api/users/getUser/${firebaseAuth.currentUser?.uid}`, null);

  function getTimeSpentText(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)

    if (minutes === 0) {
      return "<0 min"
    }

    if (hours > 0) {
      return `${hours}h ${minutes}min`
    }

    return `${minutes}min`
  }

  function handleThemeChange(theme: ThemeType) {
    onThemeChange(theme);
  }

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
        <View style={{flexDirection: "row"}}>
          <View style={{justifyContent: "center", alignItems: 'center', width: "33%", gap: 2}}>
            <View style={{backgroundColor: "gold", padding: 8, borderRadius: 100}}>
              <FeatherIcon name="clock" size={26} color="#fff" />
            </View>
            <StyledText style={{fontSize: 16, fontWeight: "bold"}}>{getTimeSpentText(7332)}</StyledText>
            <StyledText>Czas czytania</StyledText>
          </View>
          <View style={{justifyContent: "center", alignItems: 'center', width: "33%", gap: 2}}>
            <View style={{backgroundColor: "blue", padding: 8, borderRadius: 100}}>
              <FeatherIcon name="book" size={26} color="#fff" />
            </View>
            <StyledText style={{fontSize: 16, fontWeight: "bold"}}>{user?.finishedBooks.length}</StyledText>
            <StyledText>Przeczytane bajki</StyledText>
          </View>
        </View>
      </View>

      <View style={styles.profileSettingsContainer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=host.exp.exponent"
            )
          }
          style={styles.profileSettingsBox}
        >
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zrecenzuj naszą aplikację
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@expo.dev")}
          style={styles.profileSettingsBox}
        >
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Skonaktuj się z nami
          </StyledText>
        </TouchableOpacity>
        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zmień język
          </StyledText>
        </View>
        <View style={styles.profileSettingsBox}>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <View style={styles.boxWithTextAndIcon}>
            <StyledText style={styles.profileSettingsText}>
              Zmień motyw kolorów
            </StyledText>
            <View
              style={{
                ...styles.themeContainer,
                borderColor: theme.text,
              }}
            >
              <TouchableOpacity
                onPress={() => handleThemeChange("light")}
                style={{
                  ...styles.themeButton,
                  backgroundColor: themeValue === "light" ? "#BFBFBF" : "#000",
                }}
              >
                <FeatherIcon name="sun" color={theme.text} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleThemeChange("dark")}
                style={{
                  ...styles.themeButton,
                  backgroundColor:
                    themeValue === "dark" ? theme.secondary : theme.background,
                }}
              >
                <FeatherIcon name="moon" color={theme.text} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleThemeChange("system")}
                style={{
                  ...styles.themeButton,
                  backgroundColor:
                    themeValue === "system"
                      ? theme.secondary
                      : theme.background,
                }}
              >
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
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
    marginBottom: 20,
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  themeButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  border: {
    borderTopWidth: 0.5,
    marginVertical: 10,
  },
});
