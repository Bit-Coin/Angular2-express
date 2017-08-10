var adminlogin = require('../controllers/adminlogin');

module.exports = function(app) {
	app.post('/api/admin/login', function(req, res) {
		res.send(users.confirmLogin());
	});
}