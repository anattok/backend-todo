import mongoose from "mongoose";
const { Schema } = mongoose;

const Todo = new Schema(
  {
    text: { type: String, required: true },
    checked: { type: Boolean, required: true },
  },
  { versionKey: "_version" }
);

export default mongoose.model("todo-task", Todo);
