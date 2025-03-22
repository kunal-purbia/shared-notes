"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShareNote = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [note, setNote] = useState<any>();

  const fetchNote = async () => {
    setLoading(true);
    const result = await fetch(`/api/notes/shared/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    setNote(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);
  return (
    <>
      {loading ? (
        <Box>LOADING...</Box>
      ) : (
        <Box>
          <Typography>Title: {note.title}</Typography>
          <Typography>Content: {note.content}</Typography>
        </Box>
      )}
    </>
  );
};

export default ShareNote;
