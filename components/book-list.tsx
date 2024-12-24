"use client";
import { Book } from "@/types/book";
import { BookCard } from "./book-card";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";

interface BookListProps {
  data: { books: Book[]; allBooks: Book[] };
}

export const BookList = ({ data }: BookListProps) => {
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const setAllBooks = useBookStore((state) => state.setAllBooks);

  useEffect(() => {
    setBooks(data.books);
    setAllBooks(data.allBooks);
  }, [data]);

  if (books.length > 0)
    return (
      <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    );
  else
    return (
      <h3 className="mt-14 font-bold text-brown text-center text-xl">
        По Вашему запросу книги не найдены
      </h3>
    );
};
