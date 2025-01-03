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
import { useAuthorStore } from "@/store/author-store";
import { useGenreStore } from "@/store/genre-store";
import { addBook } from "@/api";
import { useBookStore } from "@/store/book-store";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
  author: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
  genre: z.string({ required_error: "Это обязательное поле" }).min(1).max(20),
  year: z.coerce.number({
    required_error: "Это обязательное поле",
    invalid_type_error: "Введите год",
  }),
  desc: z.string({ required_error: "Это обязательное поле" }),
  image: z.string({ required_error: "Это обязательное поле" }).min(1),
});

interface AddBookFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddBookForm = ({ setOpen }: AddBookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const authors = useAuthorStore((state) => state.authors);
  const genres = useGenreStore((state) => state.genres);
  const setAllBooks = useBookStore((state) => state.setAllBooks);
  const allBooks = useBookStore((state) => state.allBooks);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const authorId = authors.find((author) => author.name === values.author)?.id;
    const genreId = genres.find((genre) => genre.name === values.genre)?.id;

    if (!authorId || !genreId) {
      return console.error("Author or genre not found");
    }

    try {
      const newBook = await addBook({
        title: values.title,
        authorId: authorId,
        genreId: genreId,
        image: values.image,
        year: values.year,
        desc: values.desc,
      });
      if (newBook) {
        form.reset();
        setAllBooks([...allBooks, newBook]);
        setOpen(false);
        toast({
          title: "Книга успешно добавлена",
        });
      } else {
        toast({
          title: "Ошибка добавления",
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
        <Button className="mt-8" type="submit">
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
