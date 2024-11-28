import { Book } from "@/types/book";
import { create } from "zustand";

interface BookState {
  books: Book[];
  setBooks: (books: Book[]) => void;
}

export const useBookStore = create<BookState>()((set) => ({
  books: [],
  setBooks: (books) => set({ books: books }),
}));
