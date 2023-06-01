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
  
//var queries = require('./model/queries.js');


app.post('/api/login', function (req, res) {
  //QUERIES DB POUR TESTER LE REQ.BODY.USERNAME ET REQ.BODY.PASSWORD sont OK dans la DB

  //Ensuite si cest ok on renvoie un res.json({logged : true})

  //Sinon on renvoie un res.json({logged : false})

  res.json({ logged : true });
  //queries.addUser("salut", "salut");

});
app.get("/api/homeUser", function (req, res) {
  res.send("homeUser");
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


module.exports = app;