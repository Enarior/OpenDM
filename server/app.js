var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./model/queries.js');
const cors = require("cors");

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
//ADD
//
app.post("/", function (req, res) {
  console.log("Hello World!");
});

app.post('/api/register', async function (req, res) {

  console.log(req.body);

  await queries.addUser(req.body.pseudo, req.body.password);
  res.send({ logged : true });
});

app.post('/api/sheets/add', function (req, res) {

  res.json({ logged: true });
  console.log("REGISTER");
  queries.addSheet("salut", 10, 10);
});


//
//GET
//
app.post('/api/login', async function (req, res) {

  console.log(req.body);

  const data = await queries.getUser(req.body.username, req.body.password);
  if (data) {
    console.log("utilisateur trouvé", data.username, data.password);
    res.json({ logged: true });
  } else {
    res.json({ logged: false });
  };
});

app.get('/api/user', async function (req, res) {

  console.log(req.body);

  const data = await queries.getUser(req.body.username);
  if (data) {
    console.log("utilisateur trouvé", data.username, data.password);
    res.json(data);
  } else {
    res.json(data);
  };
});

app.get('/api/sheets', async function (req, res) {
  console.log(req.body);

  const data = await queries.getSheets(req.body.username, req.body.password);
  if (data) {
    res.json(data);
  } else {
    console.log("Erreur lors de la récupération des sheets");
  };
});

app.listen(3001, function () {
  console.log("Express server is running");
});


module.exports = app;