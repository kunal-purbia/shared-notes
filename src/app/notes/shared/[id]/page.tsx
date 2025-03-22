import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShareNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState();

  const fetchNote = async () => {
    const result = await fetch(`/api/notes/shared/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    setNote(res);
  };

  useEffect(() => {
    fetchNote();
  }, []);
  return (
    <Box>
      <Typography>Title: {note.title}</Typography>
      <Typography>Content: {note.content}</Typography>
    </Box>
  );
};

export default ShareNote;
