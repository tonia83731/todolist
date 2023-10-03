import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from '../todo.js';
import db from '../../config/mongoose.js';

if (process.env.NODE_ENV !== "production") {
  // console.log("here");
  dotenv.config();
}

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("error", () => {
//   console.log("mongodb error");
// });

db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 10; i++){
    Todo.create({name: `My todo name-${i}`})
  }
  console.log('done')
});