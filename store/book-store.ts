import { Book } from "@/types/book";
import { create } from "zustand";

interface BookState {
  books: Book[];
  allBooks: Book[];
  pages: number;
  currentPage: number;
  search: string;
  sort: string;
  setBooks: (books: Book[]) => void;
  setAllBooks: (books: Book[]) => void;
  setPages: (totalCount: number) => void;
  setCurrentPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
}

export const useBookStore = create<BookState>()((set) => ({
  books: [],
  allBooks: [],
  pages: 1,
  currentPage: 1,
  search: "",
  sort: "title asc",
  setBooks: (books) => set({ books: books }),
  setAllBooks: (books) => set({ allBooks: books }),
  setPages: (totalCount) => set({ pages: Math.ceil(totalCount / 4) }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearch: (search) => set({ search: search }),
  setSort: (sort) => set({ sort: sort }),
}));
