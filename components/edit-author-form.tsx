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

const formSchema = z.object({
  name: z.string({required_error: 'Это обязательное поле'}).min(1).max(50),
});

interface EditAuthorFormProps {
  author: { id: number; name: string };
}

export const EditAuthorForm = ({ author }: EditAuthorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: author.name,
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
