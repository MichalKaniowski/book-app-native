import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useAuth } from "../store/AuthContext";
import { firebaseAuth } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = firebaseAuth;
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async () => {
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      alert("Sign in failed: " + error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
      alert("Signed in succesfully");
    }
  };

  const signIn = async () => {
    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert("Sign in failed: " + error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button onPress={signIn} title="Sign in" />
      <Button onPress={signUp} title="Create Account" />

      {auth.currentUser && <Text>current user: {auth.currentUser.email}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
