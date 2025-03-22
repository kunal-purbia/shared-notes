"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Register = () => {
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
      console.log(await result.json());
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
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
