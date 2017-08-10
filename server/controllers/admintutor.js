// src/controllers/admintutor.js
var mongoose = require('mongoose'),
	Admin = mongoose.model('Admin'),
	Tutor = mongoose.model('Tutor'),
	Student = mongoose.model('Student'),
	encrypt = require('../utilities/encryption');

exports.getAllTutors = function(req, res) {
	var temp={}, i=0,data = [];

	Tutor.find({}, function(err, results){
		results.forEach(function(tutor){
			Student.count({tutor_id: tutor._id}, function(err, count){											
				i+=1;
				temp = {
					id: tutor._id,
					organization: tutor.organization,
					firstname: tutor.firstname,
					lastname: tutor.lastname,
					phone: tutor.phone,
					email: tutor.email,
					student: count,
					department: tutor.department,
					lastlogon: tutor.created_at//.toString().slice(0,10).replace(/-/g,""),
				}

				data.push(temp);	
				
				if(i == results.length){
					res.send(data)
				}
			})	
		})		
		
	})
}


exports.addTutor = function(req, res) {
	var tutor = req.body,
		salt = encrypt.createSalt();
	tutor["salt"] = salt;
	tutor["hashed_pwd"] = encrypt.hashPwd(salt, tutor["password"]);
	tutor["created_at"] = new Date();

	Tutor.create(tutor, function(err, tutor){
		if(err) {
			res.send(err);
		}else{
			var data = {action: "success", text: "", role: 1, success: true, _id: tutor._id};
			res.send(data);	
		}		
	})	

}

exports.editTutor = function(req, res) {
	var tutor = req.body,
		salt = encrypt.createSalt();
	tutor["salt"] = salt;
	tutor["hashed_pwd"] = encrypt.hashPwd(salt, tutor["password"]);
	tutor["updated_at"] = new Date();

	Tutor.update({_id: tutor._id}, tutor, function(err, tutor){
		if(err) return console.error(err);
		res.send({success: true});
	})	
}
exports.deleteTutor = function(req, res) {
	
	var list = req.body.list;
	
	list.forEach(function (l) {
		Tutor.findOneAndRemove({_id: ObjectId(l)}, function(err, removed){
			if(err) console.error(err);

			console.log(removed);
		})
	})

	res.send({success: true});

	
}
