import { StyleSheet } from "react-native";
import { Book as BookType } from "../types/database";
import { useState } from "react";
import ReadingModeBook from "./ReadingModeBook";
import BookDetails from "./BookDetails";

interface BookProps {
  book: BookType;
  onExit: () => void;
}

export default function Book({ book, onExit }: BookProps) {
  const [isInReadingMode, setIsInReadingMode] = useState(false);

  return isInReadingMode ? (
    <ReadingModeBook
      book={book}
      onReadingModeExit={() => setIsInReadingMode(false)}
    />
  ) : (
    <BookDetails
      book={book}
      onExit={onExit}
      onReadingModeEnter={() => setIsInReadingMode(true)}
    />
  );
}

const styles = StyleSheet.create({});
