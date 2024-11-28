"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { Button } from "./ui/button";
import { useState } from "react";
import { RegForm } from "./reg-form";

export const LoginDialog = () => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [reg, setReg] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-12 max-sm:h-dvh max-h-dvh overflow-y-auto">
        <DialogHeader className="pb-3 border-b-2 border-brown">
          <DialogTitle className="flex gap-8 text-2xl text-brown md:text-3xl">
            <button
              onClick={() => {
                setLogin(true);
                setReg(false);
              }}
              className={reg ? "opacity-50" : ""}
            >
              Вход
            </button>
            <button
              onClick={() => {
                setLogin(false);
                setReg(true);
              }}
              className={login ? "opacity-50" : ""}
            >
              Регистрация
            </button>
          </DialogTitle>
        </DialogHeader>
        {login ? (
          <LoginForm setOpen={setOpen} />
        ) : (
          <RegForm setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};
