import NoteModel from "../models/note.model.js";


export const addNote = async (req, res) => {
  try {
    
    const {title, content, tags} = req.body;

    if(!title || !content || tags.length == 0){
      return res.json({success: false, message: "All Fields Are Mandatory!"})
    }

    const newNote = new NoteModel({title, content, tags});

    await newNote.save();

    return res.json({success: true, message: "Note Added", newNote})

  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}