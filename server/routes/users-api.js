var users = require('../controllers/users'),
	auth = require('../config/auth');

module.exports = function(app) {
	// var users = [
	// 	{id: 1, name: 'Preston Lamb'},
	// 	{id: 2, name: 'Amanda Lamb'}
	// ];

	app.get('/api/user-list', auth.authCheck, function(req, res) {
		res.send(users.getUsers());
	});
}