const mongoose = require('mongoose');

//Schéma MongoDB d'un utilisateur
const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

module.exports = userSchema;