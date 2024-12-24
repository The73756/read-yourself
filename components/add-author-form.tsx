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
import { addAuthor } from "@/api";
import { useAuthorStore } from "@/store/author-store";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string({ required_error: "Это обязательное поле" }).min(1).max(50),
});

interface AddAuthorFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddAuthorForm = ({ setOpen }: AddAuthorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const authors = useAuthorStore((state) => state.authors);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const newAuthor = await addAuthor(values);
      if (newAuthor) {
        form.reset();
        setAuthors([...authors, newAuthor]);
        setOpen(false);
        toast({
          title: "Автор успешно добавлен",
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
                <Input placeholder="ФИО или псевдоним" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8 max-sm:mt-auto" type="submit">
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
