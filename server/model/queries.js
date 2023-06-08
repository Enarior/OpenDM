const userSchema = require('./user.js');
const sheetSchema = require('./sheet.js');

const mongoose = require("mongoose");
const PORT = 27017;
const DB_NAME = "kmn";
var connection = mongoose.createConnection(`mongodb://localhost:${PORT}/${DB_NAME}`);

const User = connection.model('User', userSchema);
const Sheet = connection.model('Sheet', sheetSchema);

//Debug mongoose
function mongooseStatus() {
	switch (mongoose.connection.readyState) {
		case 0: console.log("Mongo : disconnected"); break;
		case 1: console.log("Mongo : connected"); break;
		case 2: console.log("Mongo : connecting"); break;
		case 3: console.log("Mongo : disconnecting"); break;
	}
}

module.exports = {
	//
	// ADD
	//
	addUser: async function (name, pass) {
		var user = new User({ username: name, password: pass });
		console.log("Adding user : " + user.username + " " + user.password);

		await user.save();
	},

	addSheet: async function (name, level, classe, race, hp, ca, sorts, STR, DEX, CON, INT, WIS, CHA, username) {
		var sheet = new Sheet({
			name : name,
			level : level,
			classe : classe,
			race : race,
			hp : hp,
			ca : ca,
			sorts : sorts,
			STR : STR,
			DEX : DEX,
			CON : CON,
			INT : INT,
			WIS : WIS,
			CHA : CHA,
			user : username})
		console.log("Adding sheet : " + sheet.name + " " + sheet.hp + " " + sheet.mana + " for user : " + sheet.user);
		
		await sheet.save();
	},

	//
	// GET
	//
	getUser: async function (username) {
		const user = await User.findOne({ username: username });

		if(user){
			console.log("Found user : " + user.username + " " + user.password);
			return user;
		}
	},
	getSheet: async function (name) {
		const sheet = await Sheet.findOne({ name : name });

		if(sheet){
			console.log("Found sheet : " + user);
			return sheet;
		}
	},

	getSheets: async function (username){
		const sheets = Sheet.find({user : username});
		return(sheets);
	},
	
	countSheets: async function (username){
		const count = Sheet.count({user : username});

		return(count);
	},

	//
	// UPDATE
	//
	updateUser: async function (username, newUsername, newPassword) {
		const res = await Person.updateOne({ username: username}, { username: newUsername, password: newPassword });

		console.log("Updated user : " + res);
	},
	updateSheet: async function (name, level, classe, race, hp, ca, sorts, STR, DEX, CON, INT, WIS, CHA, username) {
		console.log("Adding sheet : " + sheet.name + " " + sheet.hp + " " + sheet.mana + " for user : " + sheet.user);
		const res = await Sheet.updateOne({name : name},{
			name : name,
			level : level,
			classe : classe,
			race : race,
			hp : hp,
			ca : ca,
			sorts : sorts,
			STR : STR,
			DEX : DEX,
			CON : CON,
			INT : INT,
			WIS : WIS,
			CHA : CHA,
			user : username});
	},

	//
	//REMOVE
	//
	removeUser: async function (username) {
		const res = await User.deleteOne({ username: username });
		console.log("Removed user, response : " + res);
	},
	removeSheet: async function (name) {
		const res = await Sheet.deleteOne({ name : name });
		console.log("Removed sheet, response : " + res);
	}
}