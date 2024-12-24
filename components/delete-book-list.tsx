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
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Book } from "@/types/book";
import { DeleteBook } from "./delete-book";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { useBookStore } from "@/store/book-store";

const formSchema = z.object({
  book: z.string({ required_error: "Это обязательное поле" }),
});

interface DeleteBookListProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteBookList = ({ setOpen }: DeleteBookListProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [deleteBook, setDeleteBook] = useState<Book>();
  const allBooks = useBookStore((state) => state.allBooks);

  useEffect(() => {
    const selectedBook = allBooks.find(
      (book) => book.title === form.getValues("book")
    );
    setDeleteBook(selectedBook);
  }, [form.watch("book")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setDeleteBook(allBooks.find((book) => book.title === values.book));
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
                    {allBooks.map((book) => (
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
      {deleteBook && (
        <DeleteBook key={deleteBook.id} book={deleteBook} setOpen={setOpen} />
      )}
    </>
  );
};
