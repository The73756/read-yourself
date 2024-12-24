"use client";
import { ChangeEvent, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "./shared/arrow-down-icon";
import { CustomDialog } from "./custom-dialog";
import { FiltersForm } from "./filters-form";
import { getBooks } from "@/api";
import { useBookStore } from "@/store/book-store";
import { GetBooksResponse } from "@/types/book";
import { AuthorGenre } from "@/types/author-genre";
import { useAuthorStore } from "@/store/author-store";
import { useGenreStore } from "@/store/genre-store";

interface FiltersProps {
  data: {
    authors: AuthorGenre[];
    genres: AuthorGenre[];
  };
}

export const Filters = ({ data }: FiltersProps) => {
  const search = useBookStore((state) => state.search);
  const sort = useBookStore((state) => state.sort);
  const setSort = useBookStore((state) => state.setSort);
  const setBooks = useBookStore((state) => state.setBooks);
  const setSearch = useBookStore((state) => state.setSearch);
  const setCurrentPage = useBookStore((state) => state.setCurrentPage);
  const setPages = useBookStore((state) => state.setPages);

  const authors = useAuthorStore((state) => state.authors);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const searchAuthorId = useAuthorStore((state) => state.searchAuthorId);

  const genres = useGenreStore((state) => state.genres);
  const setGenres = useGenreStore((state) => state.setGenres);
  const searchGenreId = useGenreStore((state) => state.searchGenreId);

  useEffect(() => {
    setAuthors(data.authors);
    setGenres(data.genres);
  }, [data.authors, data.genres]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const { books, totalCount } = (await getBooks(
      e.target.value,
      1,
      ...sort.split(" "),
      searchAuthorId,
      searchGenreId
    )) as GetBooksResponse;
    setBooks(books);
    setCurrentPage(1);
    setPages(totalCount);
  };

  const sortHandler = async (value: string) => {
    setSort(value);
    const { books } = (await getBooks(
      search,
      1,
      ...value.split(" ")
    )) as GetBooksResponse;
    setBooks(books);
    setCurrentPage(1);
  };

  return (
    <div className="flex max-sm:flex-wrap justify-between items-center gap-4">
      <Input
        className="w-full sm:w-[calc(50%-32px)]"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e)}
      />
      <div className="flex items-center gap-8">
        <CustomDialog
          trigger={
            <Button size="sm" variant="ghost">
              Фильтры
            </Button>
          }
          title="Фильтры"
        >
          <FiltersForm authors={authors} genres={genres} />
        </CustomDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              Сортировка
              <ArrowDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-max">
            <DropdownMenuRadioGroup
              value={sort}
              onValueChange={(value) => sortHandler(value)}
            >
              <DropdownMenuRadioItem value="title asc">
                По алфавиту А-Я
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title desc">
                По алфавиту Я-А
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="year asc">
                Сначала старые
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="year desc">
                Сначала новые
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
