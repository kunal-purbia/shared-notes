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

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
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
    } catch (error) {
      console.log("Error while login", error);
      setToaster({
        open: true,
        message: `Error: ${error}`,
        onClose: () => setToaster(null),
      });
    }
  };
  return (
    <>
      <Box>
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
