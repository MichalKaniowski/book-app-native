import { Book as BookType } from "../../types/database";
import { useContext } from "react";
import ReadingModeBook from "./ReadingModeBook";
import BookDetails from "./BookDetails";
import { BookContext } from "../../store/BookContext";

interface BookProps {
  book: BookType;
  onExit: () => void;
}

export default function Book({ book, onExit }: BookProps) {
  const { isInReadingMode, onReadingModeEnter, onReadingModeExit } =
    useContext(BookContext);

  return isInReadingMode ? (
    <ReadingModeBook {...book} onReadingModeExit={onReadingModeExit} />
  ) : (
    <BookDetails
      {...book}
      onExit={onExit}
      onReadingModeEnter={onReadingModeEnter}
    />
  );
}
