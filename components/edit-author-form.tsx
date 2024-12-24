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
import { DialogClose } from "./ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { editAuthor } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useAuthorStore } from "@/store/author-store";
import { AuthorGenre } from "@/types/author-genre";

const formSchema = z.object({
  name: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
});

interface EditAuthorFormProps {
  author: AuthorGenre;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditAuthorForm = ({ author, setOpen }: EditAuthorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: author.name,
    },
  });
  const authors = useAuthorStore((state) => state.authors);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const updatedAuthor = await editAuthor({
        id: author.id,
        ...values,
      });
      if (updatedAuthor) {
        form.reset();
        setAuthors(
          authors.map((a) => (a.id === author.id ? updatedAuthor : a))
        );
        setOpen(false);
        toast({
          title: "Автор успешно изменен",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ФИО или псевдоним" {...field} />
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
