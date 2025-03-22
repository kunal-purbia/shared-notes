/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toaster, setToaster] = useState<any>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setToaster({
        open: true,
        message: "Invalid email format",
        onClose: () => setToaster(null),
      });
      return;
    }

    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await result.json();
      if (res.token && res.message === "Account login successfull") {
        localStorage.setItem("token", res.token);
        setToaster({
          open: true,
          message: res.message,
          onClose: () => setToaster(null),
        });
        router.push("/dashboard");
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log("Error while login", error);
      setToaster({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        onClose: () => setToaster(null),
      });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography>Email</Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Typography>Password</Typography>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={handleLogin}>Login</Button>
      </Box>

      {toaster && (
        <Toaster
          open={toaster.open}
          message={toaster.message}
          onClose={toaster.onClose}
        />
      )}
    </>
  );
};

export default Login;
