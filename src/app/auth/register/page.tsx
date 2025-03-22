/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toaster, setToaster] = useState<any>(null);

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();
      const result = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await result.json();
      setToaster({
        open: true,
        message: res.message,
        onClose: () => setToaster(null),
      });
      router.push("/auth/login");
    } catch (error) {
      console.log("Error while registration", error);
      setToaster({
        open: true,
        message: "Error while registration",
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
        <Button onClick={handleRegister}>Register</Button>
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

export default Register;
