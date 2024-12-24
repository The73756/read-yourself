"use client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Dispatch, SetStateAction} from "react";
import {useToast} from "@/hooks/use-toast";
import {useUserStore} from "@/store/user-store";
import {editUser} from "@/api/user-api";

const formSchema = z.object({
  surname: z
    .string({required_error: "Это обязательное поле"})
    .min(1, {message: "Это обязательное поле"}),
  name: z
    .string({required_error: "Это обязательное поле"})
    .min(1, {message: "Это обязательное поле"}),
  patronymic: z
    .string({required_error: "Это обязательное поле"})
    .min(1, {message: "Это обязательное поле"}),
  phone: z
    .string()
    .min(10, {message: "Некорректный номер телефона"})
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Некорректный номер телефона",
    }),
  email: z
    .string({required_error: "Это обязательное поле"})
    .email({message: "Некорректный e-mail"}),
  password: z
    .string({required_error: "Это обязательное поле"})
    .min(8)
    .max(50),
});

interface EditUserFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditUserForm = ({setOpen}: EditUserFormProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      phone: user.phone,
      email: user.email,
      password: user.password
    }
  });
  const {toast} = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const editedUser = await editUser({id: user.id, ...values});
      if (editedUser) {
        form.reset();
        setUser(editedUser);
        setOpen(false);
        toast({
          title: "Профиль успешно изменен",
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
        className="flex flex-col gap-4 h-full"
      >
        <FormField
          control={form.control}
          name="surname"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patronymic"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Отчество" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Телефон" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Электронная почта" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button className="mt-auto" type="submit">
          Изменить
        </Button>
      </form>
    </Form>
  );
};
