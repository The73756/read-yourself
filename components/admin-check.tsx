"use client";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AdminCheckProps {
  children: ReactNode;
}

export const AdminCheck = ({ children }: AdminCheckProps) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, router]);

  if (user?.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};
