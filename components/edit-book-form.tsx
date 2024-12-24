"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book } from "@/types/book";
import { DialogClose } from "./ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { useAuthorStore } from "@/store/author-store";
import { useBookStore } from "@/store/book-store";
import { useGenreStore } from "@/store/genre-store";
import { useToast } from "@/hooks/use-toast";
import { editBook } from "@/api";

export const formSchema = z.object({
  title: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
  author: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
  genre: z.string({ required_error: "Это обязательное поле" }).min(1).max(20),
  year: z.coerce.number(),
  desc: z.string({ required_error: "Это обязательное поле" }),
  image: z.string({ required_error: "Это обязательное поле" }),
});

interface EditBookFormProps {
  book: Book;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditBookForm = ({ book, setOpen }: EditBookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: book.author.name,
      genre: book.genre.name,
      year: book.year,
      desc: book.desc,
      image: book.image,
    },
  });
  const authors = useAuthorStore((state) => state.authors);
  const genres = useGenreStore((state) => state.genres);
  const setAllBooks = useBookStore((state) => state.setAllBooks);
  const allBooks = useBookStore((state) => state.allBooks);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const updatedBook = await editBook({
        id: book.id,
        title: values.title,
        authorId: authors.find((author) => author.name === values.author).id,
        genreId: genres.find((genre) => genre.name === values.genre).id,
        image: values.image,
        year: values.year,
        desc: values.desc,
      });
      if (updatedBook) {
        form.reset();
        setAllBooks(allBooks.map((b) => (b.id === book.id ? updatedBook : b)));
        setOpen(false);
        toast({
          title: "Книга успешно изменена",
        });
      } else {
        toast({
          title: "Ошибка редактирования",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Автор" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.name}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Жанр" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Год издания" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ссылка на изображение" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 md:gap-5 mt-8">
          <Button className="w-full" type="submit">
            Сохранить
          </Button>
          <DialogClose asChild>
            <Button className="w-full" variant="outline">
              Отмена
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
