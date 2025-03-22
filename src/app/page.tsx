"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <Button onClick={() => router.push("/auth/register")}>Register</Button>
      <Button onClick={() => router.push("/auth/login")}>Login</Button>
    </Box>
  );
}
