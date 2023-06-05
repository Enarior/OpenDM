var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./model/queries.js');
const cors = require("cors");

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/", function (req, res) {
  console.log("Hello World!");
});

app.post('/api/register', function (req, res) {

  res.json({ logged : true });
  console.log("REGISTER");
  queries.addUser("salut", "salut");
});


app.post('/api/login', function (req, res) {

  console.log(req);

  
  queries.getUser(req.body.username, req.body.password, function (result) {
    if (result) {
      console.log(result);
      res.json({ logged : true });
    } else {
      res.json({ logged : false });
    }
  });

  //res.json({ logged : true });
  //queries.addUser("salut", "salut");

});
app.get("/api/home", function (req, res) {
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