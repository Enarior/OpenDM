const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
	name: String,
	level: Number,
	classe: String,
	race: String,
	hp : Number,
	ca : Number,
	sorts : Number,
	STR : Number,
	DEX : Number,
	CON : Number,
	INT : Number,
	WIS : Number,
	CHA : Number,
	user : String
});

//const sheetModel = mongoose.model('Sheet', sheetSchema);

module.exports = sheetSchema;