import { useContext } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import SmallBookCard from "./book/SmallBookCard";
import { BookContext } from "../store/BookContext";

export default function SearchResults({ text }: { text: string }) {
  const { onBookDetailsEnter, onReadingModeEnter } = useContext(BookContext);

  const books = useQuery(api.books.getBooksFilteredByName, {
    searchText: text,
  });

  const results = books?.map((book) => (
    <SmallBookCard
      key={book._id}
      book={book}
      onBookDetailsEnter={onBookDetailsEnter}
      onReadingModeEnter={onReadingModeEnter}
    />
  ));

  return results;
}
