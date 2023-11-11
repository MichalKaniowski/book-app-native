import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import SmallBookCard from "../components/SmallBookCard";
import Category from "../components/Category";

export default function Catalog() {
  const [text, setText] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Katalog</Text>
      <TextInput
        onChangeText={(txt) => setText(txt)}
        value={text}
        style={styles.textInput}
        placeholder="Szukaj"
        placeholderTextColor="#fff"
      />

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Redakcja poleca</Text>
        <ScrollView style={styles.recommendations} horizontal={true}>
          <SmallBookCard />
          <SmallBookCard />
          <SmallBookCard />
          <SmallBookCard />
          <SmallBookCard />
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Ketegorie</Text>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#222",
    borderRadius: 10,
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  recommendations: {
    gap: 10,
  },
});
