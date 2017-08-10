var tutorcourse = require('../controllers/tutorcourse');

module.exports = function(app) {
	app.post('/api/tutor/assign', function(req, res) {
		res.send(tutorcourse.assignStudents());
	});

	app.post('/api/tutor/course', function(req, res) {
		res.send(tutorcourse.tutorCourse());
	});
}