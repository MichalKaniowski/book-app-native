import { useState, useContext } from "react";
import {
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import StyledText from "../components/ui/StyledText";
import { firebaseAuth } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../store/ThemeContext";
import { DOMAIN } from "@env";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState<"signup" | "login">("signup");

  const { theme } = useContext(ThemeContext);

  function getModifiedErrorMessage(message: string) {
    // Firebase: Error (auth/email-already-in-use) => email-already-in-use
    const modifiedErrorMessage = message.slice(
      message.indexOf("/") + 1,
      message.length - 2
    );

    return modifiedErrorMessage;
  }

  function handleFormModeChange() {
    setFormMode((prevMode) => {
      if (prevMode === "signup") {
        return "login";
      }
      return "signup";
    });
  }

  async function signUp() {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      await axios.post(`${DOMAIN}/api/users/createUser`, {
        username,
        email,
        firebaseId: firebaseAuth.currentUser?.uid,
      });
    } catch (error: any) {
      const modifiedErrorMessage = getModifiedErrorMessage(error.message);
      alert("Sign up failed: " + modifiedErrorMessage);
    }
  }

  async function signIn() {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: any) {
      const modifiedErrorMessage = getModifiedErrorMessage(error.message);
      alert("Sign in failed: " + modifiedErrorMessage);
    }
  }

  async function handleFormSubmit() {
    setIsLoading(true);
    if (formMode === "signup") {
      await signUp();
    } else {
      await signIn();
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <Image
        source={require("../../assets/elephant22.webp")}
        style={styles.bookImage}
        alt="elephant image"
      />
      <StyledText style={styles.mainHeading}>Readly</StyledText>
      {formMode === "signup" && (
        <TextInput
          placeholder="Username"
          onChangeText={(text: string) => setUsername(text)}
          style={{ ...styles.input, color: theme.text }}
          placeholderTextColor={theme.secondary}
        />
      )}
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        style={{ ...styles.input, color: theme.text }}
        placeholderTextColor={theme.secondary}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
        style={{ ...styles.input, color: theme.text }}
        placeholderTextColor={theme.secondary}
      />
      <TouchableOpacity
        onPress={handleFormSubmit}
        disabled={isLoading}
        style={{
          ...styles.loginButton,
          backgroundColor: theme.text,
        }}
      >
        <StyledText
          style={{ ...styles.loginButtonText, color: theme.background }}
        >
          {formMode === "signup" ? "Sign up" : "Sign in"}
        </StyledText>
      </TouchableOpacity>
      <View style={styles.changeFormTypeContainer}>
        <StyledText style={{ fontSize: 14 }}>
          {formMode === "signup"
            ? "Want to sign in?"
            : "Don't have an account?"}
        </StyledText>
        <TouchableOpacity onPress={handleFormModeChange}>
          <StyledText style={{ fontSize: 14, fontWeight: "600" }}>
            {formMode === "signup" ? "Sign in" : "Sign up"}
          </StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 40,
    height: "100%",
  },
  bookImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 15,
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: "500",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    marginBottom: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  loginButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 7,
  },
  loginButtonText: {},
  changeFormTypeContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
