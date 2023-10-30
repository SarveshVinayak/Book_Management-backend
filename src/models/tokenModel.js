import mongoose from "mongoose";
import { TOKEN_TYPE, ROLE } from "../config/appConstants.js";

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    role: {
      type: String,
      enum: [...Object.values(ROLE)],
      required: true,
    },
    type: {
      type: String,
      enum: [...Object.values(TOKEN_TYPE)],
      required: true,
    },
    expires: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
    blacklisted: {
      type: Boolean,
      default: false,
      required: true,
    },
    isVerified: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("token", tokenSchema);

export { Token };
