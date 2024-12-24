import { AuthorGenre } from "@/types/author-genre";
import { create } from "zustand";

interface GenreState {
  genres: AuthorGenre[];
  searchGenreId: string | undefined;
  setGenres: (genres: AuthorGenre[]) => void;
  setSearchGenreId: (genreId: string | undefined) => void;
}

export const useGenreStore = create<GenreState>()((set) => ({
  genres: [],
  searchGenreId: undefined,
  setGenres: (genres) => set({ genres: genres }),
  setSearchGenreId: (genreId) => set({ searchGenreId: genreId }),
}));
