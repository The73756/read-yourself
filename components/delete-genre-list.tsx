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
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DeleteGenre } from "./delete-genre";
import { AuthorGenre } from "@/types/author-genre";
import { useGenreStore } from "@/store/genre-store";

const formSchema = z.object({
  genre: z.string({ required_error: "Это обязательное поле" }),
});

interface DeleteGenreListProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteGenreList = ({ setOpen }: DeleteGenreListProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [editGenre, setEditGenre] = useState<AuthorGenre>();
  const genres = useGenreStore((state) => state.genres);

  useEffect(() => {
    const selected = genres.find(
      (genre) => genre.name === form.getValues("genre")
    );
    setEditGenre(selected);
  }, [form.watch("genre")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="genre"
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
                      <SelectValue placeholder="Выберите жанр" />
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
        </form>
      </Form>
      {!editGenre && (
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      )}
      {editGenre && (
        <DeleteGenre key={editGenre.id} genre={editGenre} setOpen={setOpen} />
      )}
    </>
  );
};
