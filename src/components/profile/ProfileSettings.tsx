import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import StyledText from "../../components/ui/StyledText";
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeContext";
import { ThemeType } from "../../types/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";

export default function ProfileSettings() {
  const { theme, onThemeChange, themeValue } = useContext(ThemeContext);

  function handleThemeChange(theme: ThemeType) {
    onThemeChange(theme);
  }

  return (
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
        <StyledText style={styles.profileSettingsText}>Zmień język</StyledText>
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
                  themeValue === "system" ? theme.secondary : theme.background,
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
  );
}

const styles = StyleSheet.create({
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
