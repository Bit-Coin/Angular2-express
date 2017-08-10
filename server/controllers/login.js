// src/controllers/login.js
var mongoose = require('mongoose'),
	Student = mongoose.model('Student'),
	Tutor = mongoose.model('Tutor'),
	Admin = mongoose.model('Admin'),
	adminLogin = require('./adminlogin'),
	encrypt = require('../utilities/encryption');

exports.login = function(req, res) {
	var email = req.body.username,
		pwd = req.body.password,
		data = {action: "not-found", text: "", role: NaN, success: false, _id: ''},
		action = 0;

	data.text = "This email is not valid. Please try again.";

	Admin.findOne({email: email}, function(err, user){
		if(user == null){ 
			Tutor.findOne({email: email}, function(err, tutor){
				if(tutor == null) {
					res.send(data);
					return console.error(err);				
				}else{
					if(tutor.authenticate(pwd)){
						action = 2;
						data._id = tutor._id;
						data.action = "/home/tutor/main";
						data.role = 1;
						data.success = true;
						return res.send(data);
					}else{
						res.send(data);
					}
				}	
			})	
		}else{	
			if(user.authenticate(pwd)){
				action = 1;
				data.action = "/home/admin/main";
				data.role = 0;
				data.success = true;
				return res.send(data);
			}else{
				return res.send(data)
			}
		}
	});

	// setTimeout(function(){
	// 	if(action != 1){
	// 		Tutor.findOne({email: email}, function(err, tutor){
	// 			if(tutor == null) {
	// 				res.send(data);
	// 				return console.error(err);				
	// 			}
	// 			if(tutor.authenticate(pwd)){
	// 				action = 2;
	// 				data.action = "tutor-course";
	// 				data.role = 1;
	// 				data.success = true;
	// 				return res.send(data);
	// 			}else{
	// 				res.send(data);
	// 			}
	// 		})	
	// 	}	
	// }, 2000);
	
}

exports.studentLogin = function(req, res) {
	var userid = req.body.username,
		pwd = req.body.password,
		data = {action: "not-found", text: "This id is not valid. Please try again.", role: NaN, success: false, _id: ""};

	Student.findOne({username: userid}, function(err, student){
		if(student == null){
			res.send(data);
			return console.error(err);
		}
		if(student.authenticate(pwd)){
			data.action = "/home/student/main";
			data._id = student._id;
			data.role = 2;
			data.success = true;
			data.id = student._id;
			res.send(data)	
		}else{
			res.send(data);
		}
	})	
}

exports.resetPassword = function(req, res) {
	res.send({data: "reset password"});
}

