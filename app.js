var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var tabTasks = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var queries = require('./model/queries.js');


app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'views', 'login.ejs'));
  queries.addUser("salut", "salut");

});
app.get("/homeUser", function (req, res) {
  res.render(path.join(__dirname, 'views', 'homeUser.ejs'));
});


/*
app.post("/create", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });
 
  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
 
app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
 
app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
 
app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
*/
app.listen(3001, function () {
  console.log("Express server is running");
});