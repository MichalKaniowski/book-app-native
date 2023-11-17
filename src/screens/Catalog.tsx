import { useContext } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import SmallBookCard from "../components/SmallBookCard";
import Category from "../components/Category";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";

export default function Catalog() {
  const [text, setText] = useState("");

  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StyledText style={styles.mainHeading}>Katalog</StyledText>
      <TextInput
        onChangeText={(txt) => setText(txt)}
        value={text}
        style={{
          ...styles.textInput,
          color: theme.text,
          backgroundColor: theme.lightSecondary,
        }}
        placeholder="Szukaj"
        placeholderTextColor={theme.text}
      />

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Redakcja poleca</StyledText>
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
    padding: 10,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    // backgroundColor: "#222",
    // color: "#fff",
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recommendations: {
    gap: 10,
  },
});
