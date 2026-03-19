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
    const allNotes = await NoteModel.find({ user: req.userId });

    return res.json({ success: true, message: "All Notes", allNotes });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updatePin = async (req, res) => {
  try {

    const { noteid } = req.params;

    const userId = req.userId;

    if (!noteid) {
      return res.json({ success: false, message: "Note Id is Required!" });
    }

    const note = await NoteModel.findOne({_id: noteid, user: userId});

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    note.pin = !note.pin;

    await note.save();

    return res.json({ success: true, message: "Note Pin Updated", note });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {

    const {noteid} = req.params;

    const userId = req.userId

    if(!noteid){
      return res.json({success: false, message: "Note Id Is Required!"})
    }

    const {title, content, tags} = req.body;

    if(!title || !content || !title.trim() || !content.trim()){
      return res.json({success:false, message: "Title & Content is Mandatory!"})
    }

     if (tags && !Array.isArray(tags)) {
      return res.json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const updatedNote = await NoteModel.findOneAndUpdate(
      {_id: noteid, user: userId},
      {
        title: title.trim(),
        content: content.trim(),
        tags: tags || []
      },
      { new: true, runValidators: true }
    );

    if(!updatedNote){
      return res.json({success: false, message: "Note not found or unauthorized"})
    }

    return res.json({success: true, message: "Note Updated", updatedNote})

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const deleteNote = async (req, res) => {
  try {

    const {noteid} = req.params;

    const userId = req.userId;

    if(!noteid){
      return res.json({success: false, message: "Note Id Is Required!"})
    }

    const deletedNote = await NoteModel.findOneAndDelete({_id: noteid, user: userId});

    if(!deletedNote){
      return res.json({success: false, message: "Note not found or unauthorized"})
    }

    return res.json({success: true, message: "Note Deleted", deletedNote})

  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}