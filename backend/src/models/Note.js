import mongoose from "mongoose";

// Create a schema
// Model base off of that

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
); // createdAt, updatedAt

const Note = mongoose.model("Note", noteSchema);
export default Note;