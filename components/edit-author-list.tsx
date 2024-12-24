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
import { EditAuthorForm } from "./edit-author-form";
import { useAuthorStore } from "@/store/author-store";
import { AuthorGenre } from "@/types/author-genre";

const formSchema = z.object({
  author: z.string({ required_error: "Это обязательное поле" }),
});

interface EditAuthorListProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditAuthorList = ({ setOpen }: EditAuthorListProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [editAuthor, setEditAuthor] = useState<AuthorGenre>();
  const authors = useAuthorStore((state) => state.authors);

  useEffect(() => {
    const selected = authors.find(
      (author) => author.name === form.getValues("author")
    );
    setEditAuthor(selected);
  }, [form.watch("author")]);

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
            name="author"
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
                      <SelectValue placeholder="Выберите автора" />
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
        </form>
      </Form>
      {!editAuthor && (
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      )}
      {editAuthor && (
        <EditAuthorForm
          key={editAuthor.id}
          author={editAuthor}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
