import { query } from "./_generated/server";
import { v } from "convex/values";

export const getBooks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

export const getFilteredBooksByCategory = query({
  args: {
    filterCriteria: v.union(
      v.literal("3+"),
      v.literal("5+"),
      v.literal("8+"),
      v.literal("science"),
      v.literal("nature"),
      v.literal("sleep"),
      v.literal("pets")
    ),
  },
  handler: async (ctx, args) => {
    const filterCriteria = args.filterCriteria;
    let books = await ctx.db.query("books").collect();

    if (
      filterCriteria === "3+" ||
      filterCriteria === "5+" ||
      filterCriteria === "8+"
    ) {
      books = books.filter((book) => book.age <= Number(filterCriteria[0]));
    } else {
      books = books.filter((book) => book.category === filterCriteria);
    }

    return books;
  },
});

export const getBookRecommendations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

export const getBooksFilteredByName = query({
  args: { searchText: v.string() },
  handler: async (ctx, args) => {
    const books = await ctx.db.query("books").collect();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(args.searchText.trim().toLowerCase())
    );

    return filteredBooks;
  },
});
