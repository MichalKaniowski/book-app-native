import { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import StyledText from "../ui/StyledText";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../../store/ThemeContext";

interface InputSectionProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export default function InputSection({
  searchText,
  onSearchTextChange,
}: InputSectionProps) {
  const [hasPressed, setHasPressed] = useState(false);

  const { theme, actualTheme } = useContext(ThemeContext);

  return (
    <View style={styles.inputContainer}>
      <View
        style={{ width: hasPressed ? "85%" : "100%", position: "relative" }}
      >
        <TextInput
          onChangeText={(txt) => onSearchTextChange(txt)}
          value={searchText}
          style={{
            ...styles.textInput,
            color: theme.text,
            backgroundColor: actualTheme === "light" ? "lightgrey" : "#222",
          }}
          onPressIn={() => setHasPressed(true)}
          onBlur={() => setHasPressed(false)}
          placeholder="Szukaj"
          placeholderTextColor={theme.secondary}
        />
        {hasPressed && (
          <TouchableOpacity
            onPress={() => {
              onSearchTextChange("");
            }}
            style={styles.eraseSearchBarButton}
          >
            <FeatherIcon name="x" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {hasPressed && (
        <TouchableOpacity
          onPress={() => {
            setHasPressed(false);
            Keyboard.dismiss();
          }}
        >
          <StyledText style={styles.cancelSearchButton}>Anuluj</StyledText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 2 : 8,
    marginBottom: 20,
    height: 34,
  },
  eraseSearchBarButton: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 5,
    top: 7,
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
  },
  cancelSearchButton: {
    marginLeft: 10,
    fontSize: 15,
    marginTop: 7,
  },
});
