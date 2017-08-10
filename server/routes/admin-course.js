var admincourse = require('../controllers/admincourse'),
	auth = require('../config/auth');

module.exports = function(app) {
	app.get('/api/admin/courses', function(req, res) {
		admincourse.getAllCourse(req, res);
	});

	app.post('/api/admin/courses/edit', function(req, res) {
		admincourse.getEditCourses(req, res);
	});

	app.get('/api/admin/courses/contents', function(req, res) {
		admincourse.getAllContent(req, res);
	});

	app.post('/api/admin/course', function(req, res) {
		admincourse.addCourse(req, res);
	});

	app.put('/api/admin/course', function(req, res) {
		admincourse.updateCourse(req, res);
	});

	app.delete('/api/admin/course', function(req, res) {
		admincourse.deleteCourse(req, res);
	});
}