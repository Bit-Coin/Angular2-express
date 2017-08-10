// src/controllers/adminlogin.js
var mongoose = require('mongoose'),
	Admin = mongoose.model('Admin'),
	encrypt = require('../utilities/encryption');

exports.login = function(req, res) {
	res.send({data: "admin login"});
}
exports.confirmLogin = function(req, res) {
	res.send({data: "confirm Login"});
}

exports.isAdmin = function(email){
	console.log("isAdmin");
	var status = false;
	return Admin.findOne({email: email}, function(err, user){
		if(err){
			status = false;			
			return console.error(err);
		}
		if(user != null){
			console.log(user);
			status = true;
			return status;
		}
	});
}

exports.authentication = function(email, pwd){
	var status = false;
	Admin.findOne({email: email}, function(err, user){		
		if(err){
			console.error(err);
			status = false;
		}
		console.log(user.authenticate(pwd));
		status = user.authenticate(pwd);
	})
	console.log("controller")
	console.log(status);
	return status;
}