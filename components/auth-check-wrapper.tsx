"use client";
import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

interface AuthCheckProps {
  children: ReactNode;
}

export const AuthCheckWrapper = ({ children }: AuthCheckProps) => {
  const router = useRouter();
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
        setIsAuth(true);
        setChecked(true);
      } else {
        router.back();
      }
    }

  }, []);

  return checked ? children : null;
};
