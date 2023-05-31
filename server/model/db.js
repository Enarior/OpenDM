const mongoose = require("mongoose");
const PORT = 27017;
const DB_NAME = "kmn";
var connection = mongoose.connect(`mongodb://localhost:${PORT}/${DB_NAME}`);

//Debug mongoose
function mongooseStatus() {
	switch (mongoose.connection.readyState) {
		case 0: console.log("Mongo : disconnected"); break;
		case 1: console.log("Mongo : connected"); break;
		case 2: console.log("Mongo : connecting"); break;
		case 3: console.log("Mongo : disconnecting"); break;
	}
}

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

const sheetSchema = new mongoose.Schema({
	name: String,
	hp: Number,
	mana: Number
});


const UserModel = mongoose.model('User', userSchema, 'users');
const SheetModel = mongoose.model('Sheet', sheetSchema, 'sheets');

mongooseStatus();

module.exports = connection, UserModel, SheetModel;
