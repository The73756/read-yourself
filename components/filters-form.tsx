import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";
import { AuthorGenre } from "@/types/author-genre";
import { useState } from "react";
import { DialogClose } from "./ui/dialog";
import { useAuthorStore } from "@/store/author-store";
import { useGenreStore } from "@/store/genre-store";
import { getBooks } from "@/api";
import { useBookStore } from "@/store/book-store";
import { GetBooksResponse } from "@/types/book";

interface FiltersFormProps {
  authors: AuthorGenre[];
  genres: AuthorGenre[];
}

export const FiltersForm = ({ authors, genres }: FiltersFormProps) => {
  const search = useBookStore((state) => state.search);
  const sort = useBookStore((state) => state.sort);
  const setBooks = useBookStore((state) => state.setBooks);
  const setCurrentPage = useBookStore((state) => state.setCurrentPage);
  const setPages = useBookStore((state) => state.setPages);

  const searchAuthorId = useAuthorStore((state) => state.searchAuthorId);
  const setSearchAuthorId = useAuthorStore((state) => state.setSearchAuthorId);

  const searchGenreId = useGenreStore((state) => state.searchGenreId);
  const setSearchGenreId = useGenreStore((state) => state.setSearchGenreId);

  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(
    searchAuthorId
  );
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    searchGenreId
  );

  const filterHandler = async () => {
    setSearchAuthorId(selectedAuthor);
    setSearchGenreId(selectedGenre);

    const { books, totalCount } = (await getBooks(
      search,
      1,
      ...sort.split(" "),
      selectedAuthor,
      selectedGenre
    )) as GetBooksResponse;
    setBooks(books);
    setCurrentPage(1);
    setPages(totalCount);
  };

  return (
    <>
      <div>
        <h3 className="mb-5 font-bold text-brown text-lg">Авторы</h3>
        <ToggleGroup
          value={selectedAuthor}
          onValueChange={(value) =>
            value === selectedAuthor
              ? setSelectedAuthor("")
              : setSelectedAuthor(value)
          }
          type="single"
        >
          {authors.map((author) => (
            <ToggleGroupItem key={author.id} value={String(author.id)}>
              {author.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div>
        <h3 className="mb-5 font-bold text-brown text-lg">Жанры</h3>
        <ToggleGroup
          value={selectedGenre}
          onValueChange={(value) =>
            value === selectedGenre
              ? setSelectedGenre("")
              : setSelectedGenre(value)
          }
          type="single"
        >
          {genres.map((genre) => (
            <ToggleGroupItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <DialogClose asChild>
        <Button onClick={filterHandler} className="w-full">
          Найти
        </Button>
      </DialogClose>
    </>
  );
};
