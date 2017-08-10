// src/controllers/admincourse.js
var mongoose = require('mongoose'),
	Admin = mongoose.model('Admin'),
	Course = mongoose.model('Course'),
	Lesson = mongoose.model('Lesson'),
	Content = mongoose.model('Content'),
	Take = mongoose.model('Take'),
	encrypt = require('../utilities/encryption');

exports.getAllCourse = function(req, res) {
	Course.find({}, function(err, collection) {
		if(err) {
			return console.error(err);
		}		
		var main_data = [];
		collection.forEach(function (course) {
			console.log(course);
			console.log(course._id);
			Lesson.find({course_id: course._id}, function(err, lessons){
				if (err) return console.error(err);
				console.log('============lessons====================');
				console.log(lessons);
				Take.count({course_id: course._id}, function(err, student_count){
					if (err) return console.error(err);

					var video_count = 0, i = 0;
					lessons.forEach(function (lesson) {
						Content.count({lesson_id: lesson._id, videoOrQuestion: true}, function(err, content_count){
							if (err) return console.error(err);
							i++;
							video_count += content_count;
							
							if(i == lessons.length){
								var data = {
									course_id: course._id,
									title: course.name,
									lesson: i,
									video: video_count,
									student: student_count
								}
								main_data.push(data);
							}
							console.log(main_data.length)
							console.log(collection.length)
							if(main_data.length == collection.length){
								res.send(main_data);
							}
						})
					})	
				})
			})
		});
	});
}

exports.getEditCourses = function(req, res){
	var id = req.body.id;
	
	Course.findOne({_id: id}, function(err, course){
		if (err) return console.error(err);
		console.log(course._id);

		var data = {
			course_id: course._id,
			coursetitle: course.name,
			coursedescription: course.description,
			lesson: []
		}
		Lesson.find({course_id: course._id}, function(err, lessons){
			if (err) return console.error(err);

			var lessonData = {};
			lessons.forEach(function(lesson){
				Content.find({lesson_id:lesson._id}, function(err, contents){
					if (err) return console.error(err);

					lessonData = {
						lesson_id: lesson._id,
						lessonname: lesson.name,
						lessondescription: lesson.description,
						content: contents
					}

					data.lesson.push(lessonData);
					if(lessons.length == data.lesson.length){
						res.send(data);
					}
				})
			})
		})
	})
}



exports.getAllContent = function(req, res){
	Content.find({}, function(err, collection) {
		if(err) {
			return console.error(err);
		}		
		res.send(collection);
	})
}

exports.addCourse = function(req, res) {
	var data = req.body,
		courseData = {
			name: data.coursetitle,
			description: data.coursedescription
		},
		lessonList = data.lesson;
	Course.create(courseData, function(err, course){
		if (err) return console.error(err);

		lessonList.forEach(function(lesson){
			var lessonData = {
				name: lesson.lessonname,
				description: lesson.lessondescription,
				course_id: course._id
			}
			Lesson.create(lessonData, function(err, less){
				if (err) return console.error(err);

				lesson.content.forEach(function(content){
					var contentData = {
						videoOrQuestion: content.videoOrQuestion,
					    videoLabel: content.videoLabel,
					    videoEmbedCode: content.videoEmbedCode,
					    singleOrMulti: content.singleOrMulti,
					    question: content.question,
					    answerA: content.answerA,
					    answerB: content.answerB,
					    answerC: content.answerC,
					    trueNumber: content.trueNumber,
					    answer_text: '',
					    lesson_id: less._id, 
					}
					Content.create(contentData, function(err, cont){
						if (err) return console.error(err);
					})
				})
			})
		})
	})
	res.send({success: true});
}



exports.updateCourse = function(req, res) {
	var data = req.body,
		courseData = {
			_id: data.course_id,
			name: data.coursetitle,
			description: data.coursedescription
		},
		lessonList = data.lesson;
	console.log("data");
	console.log(data);	
	console.log('courseData');
	console.log(courseData);
	console.log("lessonList");
	console.log(lessonList);

	Course.update({_id: courseData._id}, courseData, function(err, course){
		if (err) return console.error(err);

		Lesson.remove({course_id: courseData._id}, function(err){
			if (err) throw err;

			lessonList.forEach(function(lesson){
				var lessonData = {				
					name: lesson.lessonname,
					description: lesson.lessondescription,
					course_id: courseData._id
				}
				var reg = new RegExp('^[0-9]+$');
				if(reg.test(lesson.lesson_id.toString()) == false){
					lessonData["_id"] = lesson.lesson_id;				
				}

				Lesson.create(lessonData, function(err, less){
					if(err) return console.error(err);

					Content.remove({lesson_id: lesson.lesson_id}).exec();


						lesson.content.forEach(function(content){
							var contentData = {															
								videoOrQuestion: content.videoOrQuestion,
							    videoLabel: content.videoLabel,
							    videoEmbedCode: content.videoEmbedCode,
							    singleOrMulti: content.singleOrMulti,
							    question: content.question,
							    answerA: content.answerA,
							    answerB: content.answerB,
							    answerC: content.answerC,
							    trueNumber: content.trueNumber,
							    answer_text: '',
							    lesson_id: less.id, 
							}

							if(!content._content_id){
								contentData["_id"] = content._id;
							}
							Content.create(contentData, function(err, cont){
								if (err) return console.error(err);

								console.log("(((((((((((sucess)))))))))))))))))))");
								console.log(cont)
							})
						})
											
				})
			})
		})

		// lessonList.forEach(function(lesson){
		// 	var lessonData = {				
		// 		name: lesson.lessonname,
		// 		description: lesson.lessondescription,
		// 		course_id: courseData._id
		// 	}

		// 	console.log('==================course iterate=====================');
		// 	console.log(lessonList.length);
		// 	var reg = new RegExp('^[0-9]+$');
		// 	if(reg.test(lesson.lesson_id)){

		// 		console.log("create$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
		// 		Lesson.create(lessonData, function(err, less1){
		// 			if (err) return console.error(err);
					
		// 			console.log(lesson.content);
					
		// 			lesson.content.forEach(function(content){
		// 				var contentData = {
		// 					videoOrQuestion: content.videoOrQuestion,
		// 				    videoLabel: content.videoLabel,
		// 				    videoEmbedCode: content.videoEmbedCode,
		// 				    singleOrMulti: content.singleOrMulti,
		// 				    question: content.question,
		// 				    answerA: content.answerA,
		// 				    answerB: content.answerB,
		// 				    answerC: content.answerC,
		// 				    trueNumber: content.trueNumber,
		// 				    answer_text: '',
		// 				    lesson_id: less1.id, 
		// 				}
		// 				Content.create(contentData, function(err, cont){
		// 					if (err) return console.error(err);

		// 					console.log("(((((((((((sucess)))))))))))))))))))");
		// 					console.log(cont)
		// 				})
		// 			})
		// 		})
		// 	}else{
		// 		Lesson.findOne({_id: lesson.lesson_id}, function(err, less){
		// 			if (err) return console.error(err);

		// 			less.name = lesson.lessonname;
		// 			less.description = lesson.lessondescription;
		// 			less.course_id = courseData._id;

		// 			console.log('==================find less===================');
		// 			console.log(less);

		// 			less.save(function(err){
		// 				if(err) throw err;
					
		// 				lesson.content.forEach(function(content){
		// 					var contentData = {
		// 						videoOrQuestion: content.videoOrQuestion,
		// 					    videoLabel: content.videoLabel,
		// 					    videoEmbedCode: content.videoEmbedCode,
		// 					    singleOrMulti: content.singleOrMulti,
		// 					    question: content.question,
		// 					    answerA: content.answerA,
		// 					    answerB: content.answerB,
		// 					    answerC: content.answerC,
		// 					    trueNumber: content.trueNumber,
		// 					    answer_text: '',
		// 					    lesson_id: less._id, 
		// 					}

		// 					console.log(contentData);

		// 					if(content._content_id){
		// 						Content.create(contentData, function(err, content){
		// 							if (err) return console.error(err);				

		// 							console.log("!!!!!!!!!!!!!!!!!!!!!!! create !!!!!!!!!!!!!!!!!!")					
		// 						})
		// 					}else{
		// 						contentData["_id"] = content._id;
		// 						Content.update({_id: content._id},contentData, function(err, cont){
		// 							if (err) return console.error(err);

		// 							console.log("!!!!!!!!!!!!!!!!!!!!!!! update !!!!!!!!!!!!!!!!")
		// 						})
		// 					}
		// 				})
		// 			})						
		// 		})
		// 	}	
		// })
		res.send({success: true});
	})	
}

exports.deleteCourse = function(req, res) {
	res.send({data: "delete Course"});
}
