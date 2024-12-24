"use client";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);

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
      {/*<Button variant="outline" className="max-sm:flex-grow">*/}
      {/*  Редактировать*/}
      {/*</Button>*/}
    </div>
  );
};
