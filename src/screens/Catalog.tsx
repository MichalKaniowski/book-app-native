import { useContext } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import BookRecommendation from "../components/BookRecommendationCard";
import Category from "../components/Category";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Catalog({ navigation }: any) {
  const [text, setText] = useState("");

  const { theme, actualTheme } = useContext(ThemeContext);

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
          backgroundColor: actualTheme === "light" ? "lightgrey" : "#222",
        }}
        placeholder="Szukaj"
        placeholderTextColor={theme.secondary}
      />

      <View style={styles.section}>
        <StyledText style={styles.sectionHeading}>Redakcja poleca</StyledText>
        <ScrollView style={styles.recommendations} horizontal={true}>
          <BookRecommendation />
          <BookRecommendation />
          <BookRecommendation />
          <BookRecommendation />
          <BookRecommendation />
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Kategorie</Text>
        <Category
          name="od 3 lat"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "od 3 lat",
              category: "3+",
            })
          }
        />
        <Category
          name="od 5 lat"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "od 5 lat",
              category: "5+",
            })
          }
        />
        <Category
          name="od 8 lat"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "od 8 lat",
              category: "8+",
            })
          }
        />
        <Category
          name="Bajki na dobranoc"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "Bajki na dobranoc",
              category: "sleep",
            })
          }
        />
        <Category
          name="Nauka"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "Nauka",
              category: "science",
            })
          }
        />
        <Category
          name="O zwierzątkach"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "O zwierzątkach",
              category: "pets",
            })
          }
        />
        <Category
          name="Przyroda"
          icon={<Icon name="pets" size={20} color={theme.text} />}
          onPress={() =>
            navigation.navigate("FilteredCatalog", {
              categoryTitle: "Przyroda",
              category: "nature",
            })
          }
        />
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
