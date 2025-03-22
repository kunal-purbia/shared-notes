"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditNote = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toaster, setToaster] = useState<any>(null);
  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch(`/api/notes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const res = await result.json();
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      console.log("Error while fetching notes", error);
      setToaster({
        open: true,
        message: "Error while fetching notes",
        onClose: () => setToaster(null),
      });
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const handleSaveNote = async (e: any) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const result = await fetch(`/api/notes/${id}`, {
        method: "PUT",
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
    }
  };


  return (
    <>
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

export default EditNote;
