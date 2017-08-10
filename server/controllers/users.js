var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	encrypt = require('../utilities/encryption');

exports.createUser = function(req, res, next) {
	var userData = req.body;
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user) {
		if(err) {
			if(err.toString().indexOf('E11000') > -1 ) {
				err = new Error('Duplicate Email Address');
			}
			res.status(400);
			return res.send({ reason: err.toString() });
		}
		req.logIn(user, function(err) {
			if( err ) { return next(err); }
			res.send(user);
		});
	});
};

exports.updateUser = function(req, res) {
	var userUpdates = req.body;

	if( req.user._id != userUpdates._id) {
		res.status(403);
		return res.end();
	}

	req.user.firstName = userUpdates.firstName;
	req.user.lastName = userUpdates.lastName;
	req.user.username = userUpdates.username;
	if( userUpdates.password && userUpdates.password.length > 0 ) {
		req.user.salt = encrypt.createSalt();
		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password)
	}
	req.user.email = userUpdates.email;
	req.user.roles = userUpdates.roles;

	req.user.save(function(err) {
		if(err) { res.status(400); return res.send({ reason: err.toString() }); }
		res.send(req.user);
	})
};

exports.getUsers = function(req, res) {
	if(!req.user) {
		res.status(404);
		res.send({error: 'You are not logged in, and can\'t access that data.'});
	} else {
		User.find({}).exec(function(err, collection) {
			if(err) {
				res.send({error: err});
			}
			res.send(collection);
		});
	}
}

exports.getUserById = function(req, res) {
	User.findOne({_id: req.params.id}).exec(function(err, user) {
		if(err) {
			res.send({error: err});
		}
		res.send(user);
	});
}
