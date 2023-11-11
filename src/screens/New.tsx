import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import EntypoIcon from "react-native-vector-icons/Entypo";
import BookCard from "../components/BookCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "react-native-get-random-values";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export default function New({ navigation }: RouterProps) {
  const tasks = useQuery(api.tasks.get);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Usypianie z bajką?</Text>
      <Text style={styles.mainHeading}>
        Bezcenne! <EntypoIcon name="open-book" size={30} />
      </Text>

      <Text style={styles.date}>niedziela, 5 listopada</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Darmowa bajka na dziś</Text>
        <BookCard />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Nowe bajki</Text>
        <BookCard />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>W ostatnim tygodniu</Text>
        <BookCard />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Dawniej</Text>
        <BookCard />
        <BookCard />
        <BookCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "white",
    height: "100%",
    padding: 5,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    color: "grey",
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
    gap: 10,
  },
  sectionHeading: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
});
