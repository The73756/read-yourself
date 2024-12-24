"use client";
import Link from "next/link";
import {useUserStore} from "@/store/user-store";
import {Button} from "@/components/ui/button";
import {CustomDialog} from "@/components/custom-dialog";
import {useState} from "react";
import {EditUserForm} from "@/components/edit-user-form";

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-between items-center gap-6 pb-6 border-b-2 border-brown">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl text-brown sm:text-3xl">
          {user.surname} {user.name} {user.patronymic}
        </h2>
        <Link
          className="hover:opacity-70 opacity-transition"
          href={`mailto:${user.email}`}
        >
          {user.email}
        </Link>
        <Link
          className="hover:opacity-70 opacity-transition"
          href={`tel:${user.phone}`}
        >
          {user.phone}
        </Link>
      </div>
      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant="outline" className="max-sm:flex-grow">
            Редактировать
          </Button>
        }
        title="Редактирование профиля"
      >
        <EditUserForm setOpen={setOpen}/>
      </CustomDialog>
    </div>
  );
};
