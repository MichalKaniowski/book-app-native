import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalog from "../screens/Catalog";
import FilteredCatalog from "../screens/FilteredCatalog";

const CatalogStack = createNativeStackNavigator();

export default function CatalogNavigator() {
  return (
    <CatalogStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
      }}
    >
      <CatalogStack.Screen name="Catalog" component={Catalog} />
      <CatalogStack.Screen name="FilteredCatalog" component={FilteredCatalog} />
    </CatalogStack.Navigator>
  );
}
