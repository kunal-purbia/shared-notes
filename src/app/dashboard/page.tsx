"use client";
import { Toaster } from "@/components/Toaster";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [toaster, setToaster] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
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
      setNotes(res.notes);
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
    fetchNotes();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <TextField
          label="Search Notes"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Box>
          {notes &&
            notes.length > 0 &&
            notes.filter((note) =>
              note?.title
                .toLowerCase()
                .includes(searchValue.toLowerCase())
                .map((note, index) => (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <Typography>note.title</Typography>
                    <Box>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </Box>
                  </Box>
                ))
            )}
        </Box>
        <Button onClick={() => router.push("/dashboard/new")}>
          Create Notes
        </Button>
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

export default Dashboard;
