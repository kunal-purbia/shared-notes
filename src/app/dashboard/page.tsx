/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [toaster, setToaster] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch("/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const res = await result.json();
      if (res.message === "Unauthorized") {
        router.push("/auth/login");
      } else {
        setNotes(res.notes);
      }
    } catch (error) {
      console.log("Error while fetching notes", error);
      setToaster({
        open: true,
        message: "Error while fetching notes",
        onClose: () => setToaster(null),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const token = await localStorage.getItem("token");
      const result = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      await result.json();
      fetchNotes();
    } catch (error) {
      console.log("Error while deleting note", error);
      setToaster({
        open: true,
        message: "Error while deleting note",
        onClose: () => setToaster(null),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShareNote = async (id: string) => {
    const shareUrl = `${window.location.origin}/notes/shared/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setToaster({
      open: true,
      message: "URL copy to clipboard",
      onClose: () => setToaster(null),
    });
  };

  useEffect(() => {
    if (searchValue === "") {
      fetchNotes();
    } else {
      const newNotes = notes.filter((note: any) =>
        note?.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setNotes(newNotes);
    }
  }, [searchValue]);

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      {loading ? (
        <Box>LOADING...</Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <TextField
            label="Search Notes"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Box>
            {notes &&
              notes.length > 0 &&
              notes.map((note: any, index) => (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <Typography>{note.title}</Typography>
                  <Box>
                    <Button
                      onClick={() => router.push(`/dashboard/edit/${note._id}`)}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(note._id)}>
                      Delete
                    </Button>
                    <Button onClick={() => handleShareNote(note._id)}>
                      Share
                    </Button>
                  </Box>
                </Box>
              ))}
          </Box>
          <Button onClick={() => router.push("/dashboard/new")}>
            Create Notes
          </Button>
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

export default Dashboard;
