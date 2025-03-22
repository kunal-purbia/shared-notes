/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import verifyUser from "@/lib/verifyUser";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: any) => {
  const router = useRouter();

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth/login");
  } else {
    const user: any = verifyUser(token!);
    if (!user) {
      router.push("/auth/login");
    }
  }

  return <>{children}</>;
};

export default Layout;
