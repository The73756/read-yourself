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
import { useUserStore } from "@/store/user-store";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { registrate } from "@/api";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  surname: z
    .string({ required_error: "Это обязательное поле" })
    .min(1, { message: "Это обязательное поле" }),
  name: z
    .string({ required_error: "Это обязательное поле" })
    .min(1, { message: "Это обязательное поле" }),
  patronymic: z
    .string({ required_error: "Это обязательное поле" })
    .min(1, { message: "Это обязательное поле" }),
  login: z
    .string()
    .min(4, { message: "Слишком короткий логин" })
    .max(50, { message: "Слишком длинный логин" }),
  phone: z
    .string()
    .min(10, { message: "Некорректный номер телефона" })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Некорректный номер телефона",
    }),
  email: z
    .string({ required_error: "Это обязательное поле" })
    .email({ message: "Некорректный e-mail" }),
  password: z
    .string({ required_error: "Это обязательное поле" })
    .min(8)
    .max(50),
});

interface RegFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const RegForm = ({ setOpen }: RegFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const authUser = await registrate(values);
      if (authUser) {
        form.reset();
        setUser(authUser);
        setIsAuth(true);
        setOpen(false);
      } else {
        toast({
          title: "Ошибка регистрации",
          description: "Такой логин уже используется",
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
        className="flex flex-col gap-4 h-full"
      >
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patronymic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Отчество" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Телефон" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Электронная почта" {...field} />
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
