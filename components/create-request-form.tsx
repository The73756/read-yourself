"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";
import { useState } from "react";
import { Book } from "@/types/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateRequestFormProps {
  books: Book[];
}

export const CreateRequestForm = ({ books }: CreateRequestFormProps) => {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [value, setValue] = useState("");

  const handleSelectItemClick = (book: Book) => {
    if (!selectedBooks.some((selectedBook) => selectedBook.id === book.id)) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const selectedBook = books.find((book) => book.title === newValue);
    if (selectedBook) {
      handleSelectItemClick(selectedBook);
    }
  };

  return (
    <>
      {selectedBooks.length > 0 && (
        <ToggleGroup type="multiple">
          {selectedBooks.map((book) => (
            <ToggleGroupItem key={book.id} value={book.title}>
              {book.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
      <div className="flex flex-col gap-4">
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue aria-label={value} placeholder="Выберите книгу">
              {books.find((book) => book.title === value)?.title}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {books.map((book) => (
              <SelectItem key={book.id} value={book.title}>
                {book.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Срок возврата" />
          </SelectTrigger>
          <SelectContent>
            {[
              "30.11.2024",
              "01.12.2024",
              "02.12.2024",
              "03.12.2024",
              "04.12.2024",
            ].map((date, index) => (
              <SelectItem key={index} value={date}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">Создать заявку</Button>
    </>
  );
};
