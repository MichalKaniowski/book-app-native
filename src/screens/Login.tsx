import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useAuth } from "../store/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);

    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);

    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button onPress={login} title="Sign in" />
      <Button onPress={register} title="Create Account" />
    </View>
  );
}

const styles = StyleSheet.create({});
