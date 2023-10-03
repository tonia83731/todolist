import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import exphbs from 'express-handlebars'

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

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', hbs)

app.get('/', (req, res) => {
  // res.send('hello world')
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})