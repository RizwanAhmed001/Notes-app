import express from "express";
import { addNote } from "../controllers/note.controller.js";

const noteRoute = express.Router();

noteRoute.post("/addnote", addNote);

export default noteRoute;