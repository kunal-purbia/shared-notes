/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Toaster } from "@/components/Toaster";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [toaster, setToaster] = useState<{
    open: boolean;
    message: string;
    onClose: () => void;
  } | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();

      if (res.message === "Unauthorized") {
        router.push("/auth/login");
      } else {
        setNotes(res.notes);
        setFilteredNotes(res.notes);
      }
    } catch (error) {
      console.error("Error while fetching notes", error);
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error while deleting note", error);
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
      message: "URL copied to clipboard",
      onClose: () => setToaster(null),
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, notes]);

  return (
    <>
      {loading ? (
        <Box>LOADING...</Box>
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
        >
          <TextField
            label="Search Notes"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Box>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Box
                  key={note._id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1,
                    borderBottom: "1px solid #ddd",
                  }}
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
              ))
            ) : (
              <Typography>No notes found.</Typography>
            )}
          </Box>
          <Button
            variant="contained"
            onClick={() => router.push("/dashboard/new")}
          >
            Create Note
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
