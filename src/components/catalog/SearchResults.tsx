import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import SmallBookCard from "../book/cards/SmallBookCard";
import { BookContext } from "../../store/BookContext";
import useQuery from "../../hooks/useQuery";
import { DOMAIN } from "@env";
import { Book } from "../../types/database";
import StyledText from "../ui/StyledText";
import React from "react";

export default function SearchResults({ text }: { text: string }) {
  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);

  const url = `${DOMAIN}/api/books/getBooksFilteredByName/${text}`;
  const { data: books, isLoading, error } = useQuery<Book[]>(url, []);

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
      {error && <StyledText>Wystąpił błąd: {error.message}</StyledText>}
      {results}
      {(!books || books.length === 0) && !isLoading && (
        <StyledText style={styles.noBooksText}>
          Nie ma książek z tą nazwą.
        </StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBooksText: { fontSize: 16 },
});
