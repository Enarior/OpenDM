/*
Backend principal de l'application
Chaque endpoint fait une requête à la base de données en utilisant le fichier queries.js
*/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./model/queries.js');
const cors = require("cors");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//
//ADD
//

// Jamais utilisé puisque react redirige vers /api/register
app.post("/", function (req, res) {
  console.log("Hello World!");
});

//Ajout d'un utilisateur
app.post('/api/register', async function (req, res) {

  console.log(req.body);

  await queries.addUser(req.body.pseudo, req.body.password);
  res.send({ logged : true });
});

//Ajout d'une feuille de personnage
app.post('/api/sheets/add', async function (req, res) {

  console.log("ADDING SHEET");
  //use queries.addsheet()
  await queries.addSheet(req.body.name, req.body.level, req.body.classe, req.body.race,
    req.body.hp, req.body.ca, req.body.sorts, req.body.STR, req.body.DEX,
    req.body.CON, req.body.INT, req.body.WIS, req.body.CHA, req.body.username);
  res.json({ logged: true });
});


//
//GET
//
//Connexion
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

//Récupération des données d'un utilisateur
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

//Récupération de toutes les feuilles de personnage d'un utilisateur
app.post('/api/sheets', async function (req, res) {

  console.log("GET SHEETS");

  const data = await queries.getSheets(req.body.username);

  if (data) {
    res.json(data);
  } else {
    console.log("Erreur lors de la récupération des sheets");
  };
});

//Récupération du nombre de fiches de personnage d'un utilisateur
app.post('/api/sheets/count', async function (req, res) {
  console.log("COUNT SHEETS");

  const data = await queries.countSheets(req.body.username);
  if (data) {
    res.json(data);
  } else {
    console.log("Erreur lors du décompte des sheets");
  };
});

//
//UPDATE
//

//Modification d'une feuille de personnage
app.post('/api/sheets/update', async function (req, res) {

  res.json({ logged: true });
  console.log("UPDATE SHEET");
  //use queries.addsheet()
  
  await queries.addSheet(req.body.name, req.body.level, req.body.classe, req.body.race,
                        req.body.hp, req.body.ca, req.body.sorts, req.body.STR, req.body.DEX,
                        req.body.CON, req.body.INT, req.body.WIS, req.body.CHA, req.body.username);
});

//
//DELETE
//

//Suppression d'une feuille de personnage
app.post('/api/sheets/delete', async function (req, res) {
  console.log(req.body.name);
  await queries.deleteSheet(req.body.name);
  res.json({ deleted: true });
});

//Lancement du serveur
app.listen(3001, function () {
  console.log("Express server is running");
});

module.exports = app;