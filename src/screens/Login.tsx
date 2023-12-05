import { useState } from "react";
import { StyleSheet, TextInput, Button } from "react-native";
import { firebaseAuth } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = useMutation(api.books.createUser);

  const signUp = async () => {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      createUser({
        username: email,
        email: email,
        firebaseId: firebaseAuth.currentUser?.uid!,
      });
    } catch (error: any) {
      alert("Sign in failed: " + error.message);
    } finally {
      setIsLoading(false);
      alert("Signed in succesfully");
    }
  };

  const signIn = async () => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
      <Button onPress={signIn} title="Sign in" disabled={isLoading} />
      <Button onPress={signUp} title="Create Account" disabled={isLoading} />
    </SafeAreaView>
  );
}
