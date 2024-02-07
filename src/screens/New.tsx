import { useContext } from "react";
import Book from "../components/book/Book";
import { TabsContext } from "../store/TabsContext";
import { BookContext } from "../store/BookContext";
import NewScreenBody from "../components/NewScreenBody";

export default function New() {
  const { openedBook, onBookDetailsExit } = useContext(BookContext);
  const { onTabsVisibilityChange } = useContext(TabsContext);

  function handleOpenedBookExit() {
    onTabsVisibilityChange(true);
    onBookDetailsExit();
  }

  return !openedBook ? (
    <NewScreenBody />
  ) : (
    <Book book={openedBook} onExit={handleOpenedBookExit} />
  );
}
