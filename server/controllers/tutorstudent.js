// src/controllers/tutorstudent.js
var mongoose = require('mongoose'),
	Tutor = mongoose.model('Tutor'),
	Student = mongoose.model('Student'),
	Course = mongoose.model('Course'),
	Take = mongoose.model('Take'),
	encrypt = require('../utilities/encryption'),
	csv = require('fast-csv');


exports.getAllStudents = function(req, res) {
	var data = req.body, tutor_id = data.tutor_id;
	console.log(tutor_id);

  	Student.find({tutor_id: tutor_id}, function(err, students){
  		if(err) return console.error(err)
  		var students_copy = [];

  		students.forEach(function (student) {
  			var s = {
  				student_id: student._id,
  				username: student.username,
  				firstName: student.firstName,
  				lastName: student.lastName,
  				DOB: student.DOB,
  				hashed_pwd: student.hashed_pwd,
  				isSelected: false,
  				tutor_id: tutor_id,
  			};
  			students_copy.push(s);
  		});

  		res.send(students_copy);
  	})
}

exports.getAllCourses = function(req, res) {
	var tutor_id = req.body.tutor_id;
	console.log("tutor id" + tutor_id);
  	Course.find({}, function(err, courses){
  		if(err) return console.error(err)

  		var main_data = [];
  		courses.forEach(function (course) {
  			var data = {
					course_id: course._id,
					coursetitle: course.name,
					enrolled: 0,
					coursedescription: course.description
				}

			main_data.push(data);

			if(main_data.length == courses.length){
				res.send(main_data);
			}	
  	// 		Take.find({course_id: course.id}, function(err, takes){
  	// 			if(err) return console.error(err)
  				
  	// 			var count = 0, i=0;
  	// 			takes.forEach(function(take){
  	// 				Student.findOne({_id: take.student_id, tutor_id: tutor_id}, function(err, student){
  	// 					if(err) return console.error(err);
  						
  	// 					i++;
  	// 					console.log(i);
  	// 					console.log(takes.length);
  	// 					if(student != null) count++;

  	// 					if(i == takes.length){
  	// 						console.log(course);
  	// 						var data = {
			// 					course_id: course._id,
			// 					coursetitle: course.name,
			// 					enrolled: count,
			// 					coursedescription: course.description
			// 				}
			// 				main_data.push(data);

			// 				if(main_data.length == courses.length){
			// 					res.send(main_data);
			// 				}
  	// 					}
  	// 				})
  	// 			})				
			// })
  		});
  		
  	})
}

exports.addStudent = function(req, res) {
	var student = req.body;

	student["created_at"] = new Date();

	Student.create(student, function(err, student){
		if(err) return console.error(err);

		res.send({success: true});
	})	
}

exports.addStudentCSV = function(req, res) {
  	var students = req.body.result, tutor_id=req.body.tutor_id, count=false;
  	console.log(students);

  	students.forEach(function (studentcsv) {
  		csv.fromString(studentcsv[0], {header: true})
  			.on("data", function(data){
  				var student = {
  					firstName: data[0],
  					lastName: data[1],
  					DOB: data[2],
  					username: data[4],
  					hashed_pwd: data[5],
  					tutor_id: tutor_id,
  				}

  				Student.find({}, function(err, sCollection){
  					if(err) throw err;

  					i = 0;
  					sCollection.forEach(function (s) {
  						if(s.username.includes(data[4])) i++;
  					});
  					if(i != 0) student.username = data[4] + i;
  					Student.create(student, function(err, std){
  						if(err) return console.log(err);
  						count=true;
  						// res.send({success: true});
  					})
  				})
  			})
  	});
  	// console.log(count)
  	// console.log(students.length)
  	// if(count){
  	// 	Student.find({}, function(err, stds){
	  // 		if(err) return console.error(err)
	  // 		var students_copy = [];

	  // 		stds.forEach(function (st) {
	  // 			var s = {
	  // 				student_id: st._id,
	  // 				username: st.username,
	  // 				firstName: st.firstName,
	  // 				lastName: st.lastName,
	  // 				DOB: st.DOB,
	  // 				hashed_pwd: st.hashed_pwd,
	  // 				isSelected: false,
	  // 			};
	  // 			students_copy.push(s);
	  // 		});

	  // 		res.send(students_copy);
	  // 	})
  	// }
  	res.send({success: true});
}

exports.editStudent = function(req, res) {
  var student = req.body;

	student["updated_at"] = new Date();

	Student.update({_id: student._id}, student, function(err, student){
		if(err) return console.error(err);
		
		res.send({success: true});
	})	
}

exports.deleteStudent = function(req, res) {
  res.send({data: "add Tutor"});
}

exports.setStudentByCourse = function(req, res){
	var course_id = req.body.course_id, 
		students_ids = req.body.ids;

	console.log("course_id");
	console.log(course_id);
	console.log(students_ids);

	students_ids.map(function(id){
		Take.find({student_id: id}, function(err, takes){
			if(err) return console.log(err);

			var confirm = takes.filter((x)=> x.course_id == course_id);

			console.log(confirm);
			
			if(confirm.length == 0){
				var data = {
					student_id: id,
					course_id: course_id,
					score: 0,
					isCompleted: false,
					completedAt: '',
					certificate: ''
				}
				console.log(data);
				Take.create(data, function(err, take){
					if(err) return console.log(err);

					console.log(take);
				});
			}
		})
	})
	res.send({success: true});
}

exports.getCoursesByStudentId = function(req, res){
	var id = req.body.student_id, tutor_id = req.body.tutor_id;

	Take.find({student_id: id}, function(err, takes){
		if(err) return console.log(err);
		var courses = [];
		var count = 0, i=0;
		takes.forEach(function(take){
			Course.findOne({_id: take.course_id}, function(err, course){
				if(err) return console.error(err);
				
				i++;

				if(course != null){
					var data = {
						coursetitle: course.name,
						isCompleted: take.isCompleted,
						score: take.score,
						completedAt: take.completedAt,
						certificate: take.certificate,
					}			
					courses.push(data);		
				}
				if(i == takes.length){
					res.send(courses);
				}
			})
		})
	})
}

exports.getStudentsByCourseId = function(req, res){
	var id = req.body.course_id, tutor_id = req.body.tutor_id;
	console.log(id);

	// Take.find({course_id: id}, function(err, takes){
	// 	if(err) return console.log(err);
	// 	var courses = [];

	// 	takes.forEach(function(take){
	// 		Student.findOne({_id: take.student_id, tutor_id: tutor_id}, function(err, student){
	// 			if(err) return console.error(err);

	// 			if(student != null){
	// 				var data = {
	// 					firstName: student.firstName,
	// 					lastName: student.lastName,
	// 					isCompleted: take.isCompleted,
	// 					score: take.score,
	// 					completedAt: take.completedAt,
	// 					certificate: take.certificate,
	// 				}
	// 				courses.push(data);
	
	// 				if(courses.length == takes.length){
	// 					res.send(courses);
	// 				}
	// 			}
	// 		})
	// 	})
	// })	


	Take.find({course_id: id}, function(err, takes){
		if(err) return console.error(err)
		var courses = [];
			
		var count = 0, i=0;
		takes.forEach(function(take){
			Student.findOne({_id: take.student_id, tutor_id: tutor_id}, function(err, student){
				if(err) return console.error(err);
				i++;

				if(student != null){
					var data = {
						firstName: student.firstName,
						lastName: student.lastName,
						isCompleted: take.isCompleted,
						score: take.score,
						completedAt: take.completedAt,
						certificate: take.certificate,
					}			
					courses.push(data);		
				}
				if(i == takes.length){
					res.send(courses);
				}
			})
		})				
	})
}