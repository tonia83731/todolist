import mongoose from "mongoose";

const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false, // 預設完成狀態為 false
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;