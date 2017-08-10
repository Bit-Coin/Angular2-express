// src/controllers/tutorcourse.js
var mongoose = require('mongoose'),
	Tutor = mongoose.model('Tutor'),
	Course = mongoose.model('Course'),
	encrypt = require('../utilities/encryption');


exports.assignStudents = function(req, res) {
  res.send({data: "add Tutor"});
}

exports.tutorCourse = function(req, res) {
  res.send({data: "add Tutor"});
}
