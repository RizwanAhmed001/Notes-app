import NoteModel from "../models/note.model.js";

export const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content || !title.trim() || !content.trim()) {
      return res.json({
        success: false,
        message: "Title and Content are required!",
      });
    }

    if (tags && !Array.isArray(tags)) {
      return res.json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const newNote = new NoteModel({
      user: req.userId,
      title: title.trim(),
      content: content.trim(),
      tags: tags || [],
    });

    await newNote.save();

    return res.json({ success: true, message: "Note Added", newNote });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {

    const allNotes = await NoteModel.find({user: req.userId})


    return res.json({success: true, message: "All Notes", allNotes});

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
