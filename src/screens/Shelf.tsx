import { useContext, useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import StyledText from "../components/ui/StyledText";
import { ThemeContext } from "../store/ThemeContext";
import { BookContext } from "../store/BookContext";
import Icon from "react-native-vector-icons/Feather";
import Book from "../components/book/Book";
import { firebaseAuth } from "../../FirebaseConfig";
import { Book as BookType, User } from "../types/database";
import useQuery from "../hooks/useQuery";
import { DOMAIN } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import ShelfBooks from "../components/shelf/ShelfBooks";

interface PostRequest {
  books: BookType[];
  user: User | null;
}

export default function Shelf() {
  const [isShowingOnlyUnreadBooks, setIsShowingOnlyUnreadBooks] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const userFirebaseId = firebaseAuth.currentUser?.uid;

  const url = `${DOMAIN}/api/books/getShelfBooks/${userFirebaseId}`;
  const { data, isLoading, error, refetch } = useQuery<PostRequest>(url, {
    books: [],
    user: null,
  });

  useFocusEffect(
    useCallback(() => {
      refetch(url);
    }, [])
  );

  const { books: fetchedBooks, user } = data;

  const { theme } = useContext(ThemeContext);
  const { openedBook, onBookDetailsExit } = useContext(BookContext);

  const shelfBody = (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch(url)?.then(() => setRefreshing(false));
          }}
        />
      }
      style={{ ...styles.shelfContainer, backgroundColor: theme.background }}
    >
      <View style={styles.header}>
        <Icon
          onPress={() => setIsShowingOnlyUnreadBooks((prevValue) => !prevValue)}
          name="filter"
          size={18}
          color={isShowingOnlyUnreadBooks ? theme.accent : theme.text}
        />
      </View>

      <StyledText style={styles.mainHeading}>Półka</StyledText>

      <ShelfBooks
        books={fetchedBooks}
        user={user}
        isShowingOnlyUnreadBooks={isShowingOnlyUnreadBooks}
        isLoading={isLoading}
        refreshing={refreshing}
        error={error}
      />
    </ScrollView>
  );

  return openedBook ? (
    <Book book={openedBook} onExit={onBookDetailsExit} />
  ) : (
    shelfBody
  );
}

const styles = StyleSheet.create({
  shelfContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
