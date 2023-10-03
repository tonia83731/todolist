import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser';
import methodOverride from 'method-override'
import Todo from './models/todo.js';
import routes from './routes'

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
app.use(methodOverride('_method'))
app.use(routes)

app.get('/', (req, res) => {
  // res.send('hello world')
  // res.render('index')
  Todo.find()
    .lean()
    .sort({_id: 'asc'})
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

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', {todo}))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
})

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const {name, isDone} = req.body
  return (
    Todo.findById(id)
      .then((todo) => {
        todo.name = name
        todo.isDone = isDone === 'on'
        return todo.save()
      })
      .then(() => {
        res.redirect(`/todos/${id}`)
      })
      .catch((error) => console.log(error))
    )
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  return (
    Todo.findById(id)
      .then((todo) => todo.deleteOne())
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error))
  );
});

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})