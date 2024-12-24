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
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGenreStore } from "@/store/genre-store";
import { addGenre } from "@/api";

const formSchema = z.object({
  name: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
});

interface AddGenreFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddGenreForm = ({ setOpen }: AddGenreFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const genres = useGenreStore((state) => state.genres);
  const setGenres = useGenreStore((state) => state.setGenres);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const newGenre = await addGenre(values);
      if (newGenre) {
        form.reset();
        setGenres([...genres, newGenre]);
        setOpen(false);
        toast({
          title: "Жанр успешно добавлен",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Жанр" {...field} />
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
