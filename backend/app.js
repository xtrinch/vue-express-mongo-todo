const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var path = require('path');

var Todo = require("./models/Todo");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var env = process.env.NODE_ENV || 'dev';
if (env == 'production') {
  app.use("/", express.static(path.join(path.dirname(__dirname), '/frontend/dist')))
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + (process.env.MONGO_NAME || 'localhost') + ':27017/todos');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/todo/:id', (req, res) => {
  Todo.findById(req.params.id, 'title description', function (error, todo) {
    if (error) { console.error(error); }
    res.send({
      todo: todo
    })
  })
})

app.put('/todo/:id', (req, res) => {
  Todo.findById(req.params.id, 'title description', function (error, todo) {
    if (error) { console.error(error) }
    todo.title = req.body.title
    todo.description = req.body.description
    todo.save(function (error) {
      if (error) { console.log(error) }
      res.send({
        success: true
      })
    })
  })
})


app.delete('/todo/:id', (req, res) => {
  Todo.remove({ _id: req.params.id }, function (error) {
    if (error) { console.error(error) }
    res.send({
      success: true,
      message: 'Todo deleted successfully!'
    })
  })
})

app.get('/todos', (req, res) => {
  Todo.find({}, 'title description', function (error, todos) {
    if (error) { console.error(error); }
    res.send({
      todos: todos
    })
  }).sort({_id:-1})
})

app.post('/todos', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_todo = new Todo({
    title: title,
    description: description
  })

  new_todo.save(function (error) {
    if (error) { console.log(error) }
    res.send({
      success: true,
      message: 'Todo saved successfully!'
    })
  })
})

app.listen(process.env.PORT || 8081)
