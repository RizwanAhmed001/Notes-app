import express from "express";
import { addNote, deleteNote, getAllNotes, updateNote, updatePin } from "../controllers/note.controller.js";
import { auth } from "../middleware/auth.js";

const noteRoute = express.Router();

noteRoute.post("/addnote", auth, addNote);
noteRoute.get("/getnotes", auth, getAllNotes);
noteRoute.put("/updatepin/:noteid", auth, updatePin);
noteRoute.put("/updatenote/:noteid", auth, updateNote);
noteRoute.delete("/deletenote/:noteid", auth, deleteNote);

export default noteRoute;