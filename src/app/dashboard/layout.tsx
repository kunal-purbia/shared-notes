/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import verifyUser from "@/lib/verifyUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      const user: any = verifyUser(token);
      if (!user) {
        router.push("/auth/login");
      } else {
        setIsVerified(true);
      }
    }
  }, []);

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};

export default Layout;
