import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import StyledText from "../components/ui/StyledText";
import { useContext, useCallback } from "react";
import { ThemeContext } from "../store/ThemeContext";
import Icon from "react-native-vector-icons/Fontisto";
import { ThemeType } from "../types/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import { firebaseAuth } from "../../FirebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import useFetchUser from "../hooks/useFetchUser";

export default function Profile() {
  const { theme, onThemeChange, themeValue } = useContext(ThemeContext);

  const {
    data: user,
    isLoading,
    refetch,
  } = useFetchUser(firebaseAuth.currentUser!.uid);

  useFocusEffect(
    useCallback(() => {
      refetch(firebaseAuth.currentUser!.uid);
    }, [])
  );

  function getTimeSpentText(timeInSeconds: number = 0) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    if (minutes === 0) {
      return "<1 min";
    }

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }

    return `${minutes}min`;
  }

  function handleThemeChange(theme: ThemeType) {
    onThemeChange(theme);
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 10 }}>
      <Spinner visible={isLoading} />
      <View style={styles.header}>
        <StyledText style={styles.mainHeading}>Profil</StyledText>
      </View>

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Twoje statystyki</StyledText>
        <View style={styles.statisticsContainer}>
          <View style={styles.statisticsBox}>
            <View
              style={{
                ...styles.statisticsImageContainer,
                backgroundColor: "gold",
              }}
            >
              <FeatherIcon name="clock" size={26} color="#fff" />
            </View>
            <StyledText style={styles.statisticsOutlinedText}>
              {getTimeSpentText(user?.spentTime)}
            </StyledText>
            <StyledText>Czas czytania</StyledText>
          </View>
          <View style={styles.statisticsBox}>
            <View
              style={{
                ...styles.statisticsImageContainer,
                backgroundColor: "blue",
              }}
            >
              <FeatherIcon name="book" size={26} color="#fff" />
            </View>
            <StyledText style={styles.statisticsOutlinedText}>
              {user?.finishedBooks.length}
            </StyledText>
            <StyledText>Przeczytane bajki</StyledText>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=host.exp.exponent"
            )
          }
        >
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zrecenzuj naszą aplikację
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@expo.dev")}
        >
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Skonaktuj się z nami
          </StyledText>
        </TouchableOpacity>
        <View>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
          <StyledText style={styles.profileSettingsText}>
            Zmień język
          </StyledText>
        </View>
        <View>
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
        <View>
          <View style={{ ...styles.border, borderColor: theme.secondary }} />
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
  statisticsContainer: { flexDirection: "row" },
  statisticsBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    gap: 2,
  },
  statisticsImageContainer: { padding: 8, borderRadius: 100 },
  statisticsOutlinedText: { fontSize: 16, fontWeight: "bold" },
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
