const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
	name: String,
	hp: Number,
	mana: Number,
	user: String
});

//const sheetModel = mongoose.model('Sheet', sheetSchema);

module.exports = sheetSchema;