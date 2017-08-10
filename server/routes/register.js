var register = require('../controllers/register');

module.exports = function(app) {
	app.post('/api/newtutor', function(req, res) {
		res.send(login.addNewTutor());
	});
}