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
import { useUserStore } from "@/store/user-store";
import { login } from "@/api";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  login: z
    .string()
    .min(4, { message: "Слишком короткий логин" })
    .max(50, { message: "Слишком длинный логин" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" })
    .max(50),
});

interface LoginFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const LoginForm = ({ setOpen }: LoginFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const authUser = await login(values);
      if (authUser) {
        form.reset();
        setUser(authUser);
        setIsAuth(true);
        setOpen(false);
      } else {
        toast({
          title: "Ошибка авторизации",
          description: "Неверный пароль или логин",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Логин" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-auto" type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
};
