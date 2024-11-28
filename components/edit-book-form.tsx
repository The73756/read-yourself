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

const formSchema = z.object({
  title: z.string({required_error: 'Это обязательное поле'}).min(1).max(50),
  author: z.string({required_error: 'Это обязательное поле'}).min(1).max(50),
  genre: z.string({required_error: 'Это обязательное поле'}).min(1).max(20),
  year: z.coerce.number(),
  desc: z.string({required_error: 'Это обязательное поле'}),
});

const genres = [
  { id: 1, name: "xfgf" },
  { id: 2, name: "dfhdfb" },
  { id: 3, name: "xsdfgsfgf" },
  { id: 4, name: "xfxcvxcvgf" },
  { id: 5, name: "xfgsdfsf" },
];

const authors = [
  { id: 1, name: "erhtsjyk" },
  { id: 2, name: "sdfg" },
  { id: 3, name: "esrht" },
];

interface EditBookFormProps {
  book: Book;
}

export const EditBookForm = ({ book }: EditBookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: authors[0].name, // заглушка
      genre: genres[0].name, // заглушка
      year: book.year,
      desc: book.desc,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
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
