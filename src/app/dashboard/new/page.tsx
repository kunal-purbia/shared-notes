/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toaster, setToaster] = useState<any>(null);
  const router = useRouter();
  const handleSaveNote = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const token = localStorage.getItem("token");
      const result = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, sharedWith: [] }),
      });
      const res = await result.json();
      setToaster({
        open: true,
        message: res.message,
        onClose: () => setToaster(null),
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("Error while registration", error);
      setToaster({
        open: true,
        message: "Error while creating note",
        onClose: () => setToaster(null),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Box>LOADING...</Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography>Title</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="string"
          />
          <Typography>Content</Typography>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="string"
          />
          <Button onClick={handleSaveNote}>Save Note</Button>
        </Box>
      )}
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

export default CreateNote;
