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
import { Book } from "@/types/book";
import { DeleteBook } from "./delete-book";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

const formSchema = z.object({
  book: z.string({required_error: 'Это обязательное поле'}),
});

const books = [
  {
    id: 1,
    title: "Ddfg fgsfdgfhgklkj; l;l';;;oilukyjh tryui",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
  {
    id: 2,
    title: "Ddfg fgsfdgfhgklkj; l;l';;;oiluki",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
  {
    id: 3,
    title: "Ddfg fgsh tryui",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
  {
    id: 4,
    title: "Ddfg fgsfdgfhgklkryui",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
  {
    id: 5,
    title: "Ddfg ftryui",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
  {
    id: 6,
    title: "Ddfg fgsfdgfhgklkj;ryui",
    author: { id: 1, name: "klsdfjls erthfj drg" },
    img: "/book-1.png",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perferendis ad, laborum nihil, quod iure et natus provident excepturi soluta cum, unde beatae optio laboriosam voluptatibus! Quod, facere. Cupiditate, odit.",
    year: 2000,
    genre: { id: 1, name: "Ddfhr" },
  },
];

export const DeleteBookList = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [deleteBook, setDeleteBook] = useState<Book>();

  useEffect(() => {
    const selectedBook = books.find(
      (book) => book.title === form.getValues("book")
    );
    setDeleteBook(selectedBook);
  }, [form.watch("book")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setDeleteBook(books.find((book) => book.title === values.book));
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
      {!deleteBook && (
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      )}
      {deleteBook && <DeleteBook key={deleteBook.id} book={deleteBook} />}
    </>
  );
};
