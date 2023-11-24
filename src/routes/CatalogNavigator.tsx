import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalog from "../screens/Catalog";
import FilteredCatalog from "../screens/FilteredCatalog";
import { Book } from "../types/database";

const CatalogStack = createNativeStackNavigator();

export default function CatalogNavigator() {
  // const [openedBook, setOpenedBook] = useState<Book | null>(null);
  // const [isInReadingMode, setIsInReadingMode] = useState(false);

  // function handleBookDetailsEnter(book: Book) {
  //   setOpenedBook(book);
  // }

  // function handleReadingModeEnter(book: Book) {
  //   setOpenedBook(book);
  //   setIsInReadingMode(true);
  // }

  // const screenParams = {
  //   onBookOpen: (book: Book) => setOpenedBook(book),
  //   openedBook: openedBook,
  //   isInReadingMode,
  //   onReadingModeEnter: handleReadingModeEnter,
  //   onBookDetailsEnter: handleBookDetailsEnter,
  // };

  return (
    <CatalogStack.Navigator screenOptions={{ headerShown: false }}>
      <CatalogStack.Screen
        name="Catalog"
        component={Catalog}
        // initialParams={screenParams}
      />
      <CatalogStack.Screen
        name="FilteredCatalog"
        component={FilteredCatalog}
        // initialParams={screenParams}
      />
    </CatalogStack.Navigator>
  );
}
