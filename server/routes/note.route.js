import express from "express";
import { addNote } from "../controllers/note.controller.js";
import { auth } from "../middleware/auth.js";

const noteRoute = express.Router();

noteRoute.post("/addnote", auth, addNote);

export default noteRoute;