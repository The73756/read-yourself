import { AuthorGenre } from "@/types/author-genre";
import { create } from "zustand";

interface AuthorState {
  authors: AuthorGenre[];
  searchAuthorId: string | undefined;
  setAuthors: (authors: AuthorGenre[]) => void;
  setSearchAuthorId: (authorId: string | undefined) => void;
}

export const useAuthorStore = create<AuthorState>()((set) => ({
  authors: [],
  searchAuthorId: undefined,
  setAuthors: (authors) => set({ authors }),
  setSearchAuthorId: (authorId) => set({ searchAuthorId: authorId }),
}));
