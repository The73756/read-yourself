"use client";
import {useBookStore} from "@/store/book-store";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {useEffect} from "react";
import {getBooks} from "@/api";
import {GetBooksResponse} from "@/types/book";
import {useGenreStore} from "@/store/genre-store";
import {useAuthorStore} from "@/store/author-store";

interface BookPaginationProps {
  count: number;
}

export const BookPagination = ({count}: BookPaginationProps) => {
  const pages = useBookStore((state) => state.pages);
  const search = useBookStore((state) => state.search);
  const sort = useBookStore((state) => state.sort);
  const currentPage = useBookStore((state) => state.currentPage);
  const setPages = useBookStore((state) => state.setPages);
  const setBooks = useBookStore((state) => state.setBooks);
  const setCurrentPage = useBookStore((state) => state.setCurrentPage);

  const searchAuthorId = useAuthorStore((state) => state.searchAuthorId);
  const searchGenreId = useGenreStore((state) => state.searchGenreId);

  useEffect(() => {
    setPages(count);
  }, [count]);

  const paginationHandler = async (page: number) => {
    console.log(page)
    setCurrentPage(page);
    const {books} = (await getBooks(
      search,
      page,
      ...sort.split(" "),
      searchAuthorId,
      searchGenreId
    )) as GetBooksResponse;
    setBooks(books);
  };

  if (pages)
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1 ? "opacity-30 pointer-events-none	" : ""
              }
              onClick={() => paginationHandler(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({length: pages}, (_, index) => index + 1).map(
            (page) =>
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => paginationHandler(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === pages ? "opacity-30 pointer-events-none" : ""
              }
              onClick={() => paginationHandler(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
};
