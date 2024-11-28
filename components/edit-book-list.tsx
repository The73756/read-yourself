"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { EditBookForm } from "./edit-book-form";
import { Book } from "@/types/book";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

const formSchema = z.object({
  book: z.string({required_error: 'Это обязательное поле'}),
});

const books = [
  {
    "id": 1,
    "title": "Война и мир",
    "author": {
      "id": 1,
      "name": "Л. Н. Толстой"
    },
    "genre": {
      "id": 1,
      "name": "Исторический роман"
    },
    "image": "https://imo10.labirint.ru/books/488632/cover.jpg/242-0",
    "year": 1861,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  },
  {
    "id": 2,
    "title": "Мастер и Маргарита",
    "author": {
      "id": 2,
      "name": "М. А. Булгаков"
    },
    "genre": {
      "id": 2,
      "name": "Сатира"
    },
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSFVTlEpt-SI4H8xv7rioc64RBomsIDbkiQ&s",
    "year": 1900,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  },
  {
    "id": 3,
    "title": "Книга",
    "author":{
      "id": 3,
      "name": "Автор"
    },
    "genre": {
      "id": 3,
      "name": "Драма"
    },
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvHyNRzw3L738PKTjLMfeE42x0oDAxbV8JEg&s",
    "year": 2006,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  },
  {
    "id": 4,
    "title": "Тест",
    "author": {
      "id": 1,
      "name": "Л. Н. Толстой"
    },
    "genre": {
      "id": 3,
      "name": "Драма"
    },
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1COK5-zcBc9_nzM3bl7ik6_fhbn4WoDv5g&s",
    "year": 1890,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  },
  {
    "id": 5,
    "title": "Гав",
    "author": {
      "id": 3,
      "name": "Автор"
    },
    "genre": {
      "id": 1,
      "name": "Исторический роман"
    },
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZnyCUc2aFMTTAEts8xgsxXVqNY7F_Ac0dw&s",
    "year": 1690,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  },
  {
    "id": 6,
    "title": "Аа книга",
    "author": {
      "id": 1,
      "name": "Л. Н. Толстой"
    },
    "genre":{
      "id": 2,
      "name": "Сатира"
    },
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2I25kwJtb4oSuDVKRRO_AxyHycCD758-Aw&s",
    "year": 2023,
    "desc": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure."
  }
];

export const EditBookList = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [editBook, setEditBook] = useState<Book>();

  useEffect(() => {
    const selectedBook = books.find(
      (book) => book.title === form.getValues("book")
    );
    console.log(selectedBook);

    setEditBook(selectedBook);
    console.log(form.getValues("book"));
  }, [form.watch("book")]);

  useEffect(() => {
    console.log(editBook);
  }, [editBook]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setEditBook(books.find((book) => book.title === values.book));
    form.reset({
      book: "",
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="book"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите книгу" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.title}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {!editBook && (
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      )}
      {editBook && <EditBookForm key={editBook.id} book={editBook} />}
    </>
  );
};
