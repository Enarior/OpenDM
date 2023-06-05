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
  queries.addUser("salut", "salut");
});


app.post('/api/login', function (req, res) {
  //QUERIES DB POUR TESTER LE REQ.BODY.USERNAME ET REQ.BODY.PASSWORD sont OK dans la DB

  //Ensuite si cest ok on renvoie un res.json({logged : true})

  //Sinon on renvoie un res.json({logged : false})

  queries.getUser(req.body.password, req.body.email, function (result) {
    if (result) {
      res.json({ logged : true });
    } else {
      res.json({ logged : false });
    }
  });

  res.json({ logged : true });
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