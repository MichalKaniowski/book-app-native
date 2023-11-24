import { createContext, useState } from "react";
import { Book } from "../types/database";

interface BookContextInterface {
  openedBook: Book | null;
  isInReadingMode: boolean;
  onBookDetailsEnter: (book: Book) => void;
  onReadingModeEnter: (book?: Book) => void;
  onReadingModeExit: () => void;
  onBookDetailsExit: () => void;
}

export const BookContext = createContext<BookContextInterface>({
  openedBook: null,
  isInReadingMode: false,
  onBookDetailsEnter: (book: Book) => {},
  onReadingModeEnter: (book?: Book) => {},
  onReadingModeExit: () => {},
  onBookDetailsExit: () => {},
});

export function BookContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openedBook, setOpenedBook] = useState<Book | null>(null);
  const [isInReadingMode, setIsInReadingMode] = useState(false);

  function handleBookDetailsEnter(book: Book) {
    setOpenedBook(book);
  }

  function handleBookReadingModeEnter(book?: Book) {
    if (book) {
      setOpenedBook(book);
    }
    setIsInReadingMode(true);
  }

  function exitReadingMode() {
    setIsInReadingMode(false);
  }

  function exitBookDetails() {
    setOpenedBook(null);
  }

  const value = {
    openedBook,
    isInReadingMode,
    onBookDetailsEnter: handleBookDetailsEnter,
    onReadingModeEnter: handleBookReadingModeEnter,
    onReadingModeExit: exitReadingMode,
    onBookDetailsExit: exitBookDetails,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
