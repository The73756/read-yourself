"use client";
import { Book } from "@/types/book";
import { BookCard } from "./book-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";

interface BookListProps {
  data: Book[];
}

export const BookList = ({ data }: BookListProps) => {
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);

  useEffect(() => {
    setBooks(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-14 mt-16">
      <div className="gap-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="" />
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === 2} href="">
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
