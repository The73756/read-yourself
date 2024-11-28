"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LoginDialog } from "./login-dialog";
import { CustomDialog } from "./custom-dialog";
import { CreateRequestForm } from "./create-request-form";
import { useUserStore } from "@/store/user-store";
import { DialogClose } from "./ui/dialog";
import { useBookStore } from "@/store/book-store";

export const Header = () => {
  const auth = useUserStore((state) => state.isAuth);
  const user = useUserStore((state) => state.user);
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);

  const books = useBookStore((state) => state.books);

  const logout = () => {
    setUser({});
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  return (
    <header className="container">
      <div className="flex max-md:flex-wrap justify-between items-center gap-3 py-4 border-b-2 border-brown">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Логотип Читай Сам"
            width={154}
            height={33}
          />
        </Link>
        <nav className="flex max-sm:flex-wrap gap-3 sm:gap-6">
          <Button asChild size="sm" variant="ghost">
            {auth ? <Link href="profile">Профиль</Link> : <LoginDialog />}
          </Button>
          {auth && (
            <>
              <CustomDialog
                trigger={
                  <Button size="sm" variant="ghost">
                    Создать заявку
                  </Button>
                }
                title="Заявка на бронь книг"
              >
                <CreateRequestForm books={books} />
              </CustomDialog>
              <CustomDialog
                trigger={
                  <Button size="sm" variant="ghost">
                    Выйти
                  </Button>
                }
                title="Выйти из аккаунта"
              >
                <div className="flex gap-5 md:gap-8">
                  <Button onClick={logout} className="w-full">
                    Выйти
                  </Button>
                  <DialogClose asChild>
                    <Button className="w-full" variant="outline">
                      Отмена
                    </Button>
                  </DialogClose>
                </div>
              </CustomDialog>
            </>
          )}
          {user && user?.role === "ADMIN" && (
            <Button asChild size="sm" variant="ghost">
              <Link href="admin">Администраторам</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
