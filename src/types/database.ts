export interface Book {
  _id: string;
  _createdAt: number;
  age: number;
  author: string;
  body: string;
  category: string;
  description: string;
  discussionTopics: string[];
  estimatedReadingTime: number;
  illustrator: string | null;
  isPremium: boolean;
  keywords: string[];
  questions: string[];
  rating: number;
  title: string;
  translator: string | null;
  imageUrl: string;
  backgroundColor: string[]
}

export interface User {
  _id: string;
  email: string;
  username: string;
  firebaseId: string;
  shelfBooks: Book[];
  finishedBooks: string[];
  ratedBooks: string[];
  createdAt: Date;
  updatedAt: Date;
}
