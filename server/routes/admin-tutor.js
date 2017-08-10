var admintutor = require('../controllers/admintutor');

module.exports = function(app) {
	app.get('/api/admin/tutors', function(req, res) {
		admintutor.getAllTutors(req, res);
	});

	app.post('/api/admin/tutor', function(req, res) {
		admintutor.addTutor(req, res);
	});

	app.put('/api/admin/tutor', function(req, res) {
		admintutor.editTutor(req, res);
	});

	app.post('/api/admin/removetutor', function(req, res) {
		admintutor.deleteTutor(req, res);
	});

}