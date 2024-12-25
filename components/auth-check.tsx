"use client";
import {ReactNode, useEffect, useState} from "react";
import {useUserStore} from "@/store/user-store";

interface AuthCheckProps {
  children: ReactNode;
}

export const AuthCheck = ({children}: AuthCheckProps) => {
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
        setIsAuth(true);
      }
      setChecked(true);

    }
  }, []);

  return checked ? children : null;
};
