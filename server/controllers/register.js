// src/controllers/register.js
var mongoose = require('mongoose'),
	Tutor = mongoose.model('Tutor'),
	encrypt = require('../utilities/encryption');

exports.addNewTutor = function(req, res) {
	res.send({data: "add Tutor"});
}
