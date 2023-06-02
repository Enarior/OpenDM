const User = require('./user.js');
const Sheet = require('./sheet.js');
//const { db, User, Sheet } = require('./db.js');

//const SHA2 = require("sha2");
// OLD DEPRECATED USELESSE FILE LUL


module.exports = {

	addUser: async function (name, pass, callback) {
		var user = new User({ username: name, password: pass });
		console.log("Adding user : " + user.username + " " + user.password);

		await user.save();
	},

	addSheet: async function (name, hp, mana, callback) {
		var sheet = new Sheet({ name: name, hp: hp, mana: mana });
		console.log("Adding sheet : " + sheet.name + " " + sheet.hp + " " + sheet.mana);
		
		await sheet.save();
	},

	getUser: async function (name, callback) {
		const user = await User.findOne({ username: name });

		if(user){
			res.json(user);
		}
	},


	//---------------------------------------------

	addDemande: function (login, texte, callback) {
		db.query('SELECT iduser from demande WHERE iduser = (SELECT iduser FROM users WHERE login = ?) and done = TRUE', login, function (err, results) {
			if (err) throw err;
			if (!results[0]) {

				db.query("INSERT INTO demande(typedemande, iduser) VALUES(?, (SELECT iduser FROM users WHERE login = ?))", [texte, login], function (err, results) {
					if (err) throw err;
					callback(true);
				});
			} else {
				callback(false);
			}
		});
	},


	areValid: function (password, email, callback) {
		sql = "SELECT password FROM users WHERE email = ? OR login = ?"
		db.query(sql, [email, email], function (err, results) {
			if (err) throw err;
			if (results[0].password && results[0].password === SHA2.SHA224(password).toString("hex")) {
				callback(true)
			} else {
				callback(false);
			}
		});
	},

	duplicateEmail: function (email, callback) {
		db.query("SELECT email FROM users WHERE email = ?", email, function (err, results) {
			if (err) throw err;
			if (results[0]) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	duplicateLogin: function (login, callback) {
		db.query("SELECT login FROM users WHERE login = ?", login, function (err, results) {
			if (err) throw err;
			if (results[0].login) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	editProfile: function (name, firstname, coverLetter, city, description, login, callback) {
		console.log(name, firstname, coverLetter, city, description, email);
		sql = "UPDATE users SET name = ?, firstname = ?, coverLetter = ?, idCity = ?, description = ? WHERE login = ?"
		db.query(sql, [name, firstname, coverLetter, city, description, login], function (err, results) {
			if (err) throw err;
			callback(true);
		});
	},

	getCities: function (callback) {
		db.query("select idCity, cityName from city", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	getOffers: function (callback) {
		db.query("select idoffer, title, description, publishdate, name from offer natural join organization", function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	getOfferInfo: function (idOffer, callback) {
		db.query("select title, description, publishdate, name from offer natural join organization where idoffer = ?", idOffer, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},
	getOfferByName: function (name, callback) {
		db.query("select title, description, publishdate, name, typecontract from offer natural join contract natural join organization where title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%',?,'%') OR name LIKE CONCAT('%',?,'%')", [name, name, name], function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},


	getUserType: function (email, callback) {
		db.query("SELECT login, label as type FROM users NATURAL JOIN typeuser WHERE email = ? OR login = ?", [email, email], function (err, results) {
			if (err) throw err;
			if (results[0]) {
				callback(results[0]);
			} else {
				callback(false);
			}
		});
	},

	getDemande: function (login, callback) {
		db.query("SELECT typedemande, login FROM users NATURAL JOIN demande WHERE login = ? AND done = FALSE", [login], function (err, results) {
			if (err) throw err;
			return results;
		});
	},

	getName: function (login, callback) {
		sql = "SELECT name, firstname, picture, email, cityName, description, coverLetter FROM users NATURAL JOIN city WHERE login = ?"
		db.query(sql, login, function (err, results) {
			if (err) throw err;
			callback(results[0]);
		});
	},

	getDocuments: function (login, callback) {
		sql = "SELECT documentname, documentpath FROM users NATURAL JOIN documentuser WHERE login = ?"
		db.query(sql, login, function (err, results) {
			if (err) throw err;
			callback(results);
		});
	},

	getPicture: function (login, callback) {
		sql = "SELECT picture FROM users WHERE login = ?"
		db.query(sql, login, function (err, results) {
			if (err) throw err;
			callback(results[0]);
		});
	},

	viewFile: function (login, file, callback) {
		sql = "SELECT documentname FROM users NATURAL JOIN documentuser WHERE login = ? AND documentpath = ?"
		db.query(sql, [login, file], function (err, results) {
			if (err) throw err;
			if (results[0]) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}