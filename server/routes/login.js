var login = require('../controllers/login');

module.exports = function(app) {
	app.post('/api/login', function(req, res) {
		var data = req.body,
			id = data.username;

		var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(emailRegexp.test(id)){
			login.login(req, res);
		}else{
			return login.studentLogin(req, res);
		}		
	});
}