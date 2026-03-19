import express from "express";
import { addNote, getAllNotes } from "../controllers/note.controller.js";
import { auth } from "../middleware/auth.js";

const noteRoute = express.Router();

noteRoute.post("/addnote", auth, addNote);
noteRoute.get("/getnotes", auth, getAllNotes);

export default noteRoute;