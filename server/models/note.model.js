import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    content: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] }
  },
  {
    timestamps: true,
  },
);

const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default NoteModel;
