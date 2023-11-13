export interface Book {
  _creationTime: number;
  _id: string;
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
  ratings: any[];
  title: string;
  translator: string | null;
}
