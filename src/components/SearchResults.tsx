import { useContext } from "react";
import { View } from "react-native";
import SmallBookCard from "./book/SmallBookCard";
import { BookContext } from "../store/BookContext";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import { Book } from "../types/database";
import StyledText from "./ui/StyledText";
import Spinner from "react-native-loading-spinner-overlay";
import React from "react";

export default function SearchResults({ text }: { text: string }) {
  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>(
    `${DOMAIN}/api/books/getBooksFilteredByName/${text}`,
    []
  );

  const results = books?.map((book) => (
    <SmallBookCard
      key={book._id}
      book={book}
      onBookDetailsEnter={onBookDetailsEnter}
      onReadingModeEnter={onReadingModeEnter}
    />
  ));

  return (
    <View>
      <Spinner visible={isLoading} />
      {error && <StyledText>An error occured: {error.message}</StyledText>}
      {results}
      {(!books || books.length === 0) && (
        <StyledText style={{ fontSize: 16 }}>
          Nie ma książek z tą nazwą.
        </StyledText>
      )}
    </View>
  );
}
