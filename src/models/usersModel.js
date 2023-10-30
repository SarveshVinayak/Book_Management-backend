import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);

export { Users };
