import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser';
import Todo from './models/todo.js';

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

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  // res.send('hello world')
  // res.render('index')
  Todo.find()
    .lean()
    .then(todos => res.render('index', {todos}))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})