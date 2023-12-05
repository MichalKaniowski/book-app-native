import { useContext } from "react";
import Category from "./Category";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../store/ThemeContext";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Categories({ navigation }: any) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Category
        name="od 3 lat"
        icon={<Icon name="looks-3" size={20} color={theme.text} />}
        onPress={() =>
          navigation.navigate("FilteredCatalog", {
            categoryTitle: "od 3 lat",
            category: "3+",
          })
        }
      />
      <Category
        name="od 5 lat"
        icon={<Icon name="looks-5" size={20} color={theme.text} />}
        onPress={() =>
          navigation.navigate("FilteredCatalog", {
            categoryTitle: "od 5 lat",
            category: "5+",
          })
        }
      />
      <Category
        name="od 8 lat"
        icon={
          <MaterialCommunityIcon
            name="numeric-8"
            size={30}
            color={theme.text}
            style={{ marginLeft: -5 }}
          />
        }
        onPress={() =>
          navigation.navigate("FilteredCatalog", {
            categoryTitle: "od 8 lat",
            category: "8+",
          })
        }
      />
      <Category
        name="Bajki na dobranoc"
        icon={
          <MaterialCommunityIcon name="sleep" size={20} color={theme.text} />
        }
        onPress={() =>
          navigation.navigate("FilteredCatalog", {
            categoryTitle: "Bajki na dobranoc",
            category: "sleep",
          })
        }
      />
      <Category
        name="Nauka"
        icon={<Icon name="science" size={20} color={theme.text} />}
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
        icon={<Icon name="nature" size={20} color={theme.text} />}
        onPress={() =>
          navigation.navigate("FilteredCatalog", {
            categoryTitle: "Przyroda",
            category: "nature",
          })
        }
      />
    </>
  );
}
