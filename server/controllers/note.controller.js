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

    const note = await NoteModel.findById(noteid);

    if (!note) {
      return res.json({
        success: false,
        message: "No Note found",
      });
    }

    if (note.user.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    note.pin = !note.pin;

    await note.save();

    return res.json({ success: true, message: "Note Updated", note });
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
      return res.json({success:false, message: "Title & Content is mnadatory!"})
    }

     if (tags && !Array.isArray(tags)) {
      return res.json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const note = await NoteModel.findById(noteid);

    if(note.user.toString() !== userId){
      return res.json({success : false, message: "Unauthorized"})
    }

    const updateNote = await NoteModel.findByIdAndUpdate({_id: noteid}, {title, content, tags}, {new: true});

    if(!updateNote){
      return res.json({success: false, message: "Note Not Found!"})
    }

    return res.json({success: true, message: "Note Updated", updateNote})

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
