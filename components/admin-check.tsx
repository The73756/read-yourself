"use client";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AdminCheckProps {
  children: ReactNode;
}

export const AdminCheck = ({ children }: AdminCheckProps) => {
  const router = useRouter();
  const userData = typeof window !== "undefined" ? localStorage.getItem("user") : '';
  const user = userData ? JSON.parse(userData) : null;
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.push("/");
    } else {
      setUser(user);
      setIsAuth(true);
    }
  }, [user, router]);

  if (user?.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};
