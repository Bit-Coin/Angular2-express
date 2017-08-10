var auth = require('../config/auth');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index');
	});

	require('./users-api')(app);
	require('./admin-course')(app);
	require('./admin-login')(app);
	require('./admin-tutor')(app);
	require('./login')(app);
	require('./register')(app);
	require('./student-course')(app);
	require('./tutor-course')(app);
	require('./tutor-student')(app);
}