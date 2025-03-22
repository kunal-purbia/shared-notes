Task Title: Shared Notes Collaboration App
Objective: Develop a simple collaborative notes application where users can:
Create and share notes with others via a unique link
Edit their own notes but provide view-only access to shared users
Delete notes they own
Search notes by title

Technology Stack:
Frontend: React (Next.js), Tailwind CSS or MUI (optional)
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Token (JWT)

Requirements Breakdown:
1. Backend (Node.js + Express + MongoDB)
Authentication:
Users should be able to sign up and log in.
Use JWT-based authentication.
Notes API:
Users can create a note with:
title (string, required)
content (string, required)
sharedWith (array of user emails, optional)
createdAt (timestamp, default: now)
Implement API routes:
POST /api/notes → Create a note
GET /api/notes → Get all user's notes
GET /api/notes/:id → Get a specific note
PUT /api/notes/:id → Update (only if the user is the owner)
DELETE /api/notes/:id → Delete (only if the user is the owner)
GET /api/notes/shared/:id → View a shared note (read-only access)

2. Frontend (React)
Authentication:
Login/signup page with JWT authentication.
Dashboard:
Display all user-created notes.
Search functionality (by title).
Create a new note.
Edit/delete own notes.
Copy & share note link (for view-only access).
Shared Notes Page:
Users opening a shared link should:
See the note but not edit/delete it.
See a message: "You have view-only access to this note."


Commit Guidelines
To track progress effectively, the candidate must commit their code every 30 minutes. The commit messages should be clear and describe what was done.
Bonus Features (If Time Allows)
✅ UI Enhancements using Tailwind CSS or MUI.
✅ Toast notifications for success/errors.
✅ Basic real-time updates using WebSockets (Socket.io).