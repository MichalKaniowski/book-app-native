import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalog from "../screens/Catalog";
import FilteredCatalog from "../screens/FilteredCatalog";
import { Book } from "../types/database";

const CatalogStack = createNativeStackNavigator();

export default function CatalogNavigator() {
  return (
    <CatalogStack.Navigator screenOptions={{ headerShown: false }}>
      <CatalogStack.Screen name="Catalog" component={Catalog} />
      <CatalogStack.Screen name="FilteredCatalog" component={FilteredCatalog} />
    </CatalogStack.Navigator>
  );
}
