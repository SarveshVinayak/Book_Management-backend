import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Books = mongoose.model("books", bookSchema);

export { Books };
