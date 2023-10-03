import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";

if(process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})