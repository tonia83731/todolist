import mongoose from "mongoose";
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Todo', todoSchema)