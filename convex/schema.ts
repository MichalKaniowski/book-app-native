import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// you can generate the schema in convex using generate schema
const books = v.object({
  age: v.float64(),
  author: v.string(),
  body: v.string(),
  category: v.string(),
  description: v.string(),
  discussionTopics: v.array(v.string()),
  estimatedReadingTime: v.float64(),
  illustrator: v.null(),
  isPremium: v.boolean(),
  keywords: v.array(v.string()),
  questions: v.array(v.any()),
  ratings: v.array(v.any()),
  title: v.string(),
  translator: v.null(),
});

export default defineSchema(
  {
    books: defineTable(books),
    users: defineTable({
      email: v.string(),
      username: v.string(),
      readBooks: v.array(books),
      firebaseId: v.optional(v.string()),
    }),
  },
  {
    schemaValidation: true,
  }
);
