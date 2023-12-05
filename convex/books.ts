//@ts-nocheck

import { mutation, query } from "./_generated/server";
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

export const createUser = mutation({
  args: { email: v.string(), username: v.string(), firebaseId: v.string() },
  handler: async (ctx, { email, username, firebaseId }) => {
    const users = await ctx.db.query("users").collect();
    const userInDatabase = users.find((user) => user.email === email);

    if (!userInDatabase) {
      await ctx.db.insert("users", {
        email,
        username,
        firebaseId,
        readBooks: [],
      });
    }
  },
});

export const getShelfBooks = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const user = users.find((user) => user.firebaseId === args.userId);

    const readBooks = user?.readBooks;

    return readBooks;
  },
});
