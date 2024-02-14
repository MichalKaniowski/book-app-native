import { useContext } from "react";
import { BookContext } from "../store/BookContext";
import Book from "../components/book/Book";
import CatalogBody from "../components/catalog/CatalogBody";
import { TabsContext } from "../store/TabsContext";

export default function Catalog({ navigation }: any) {
  const { openedBook, onBookDetailsExit } = useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  function handleBookDetailsExit() {
    onTabsVisibilityChange(true);
    onBookDetailsExit();
  }

  return openedBook ? (
    <Book book={openedBook} onExit={handleBookDetailsExit} />
  ) : (
    <CatalogBody navigation={navigation} />
  );
}
