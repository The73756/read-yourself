import { Book } from "./book";

export interface Request {
  id: number;
  returnDate: string;
  createDate: string;
  books: Book[];
}
