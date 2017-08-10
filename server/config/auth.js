var jwt = require('express-jwt'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	config = require('./config')[env];

// exports.authenticate = function (req, res, next) {
// 	var auth = passport.authenticate('local', function(err, user){
// 		if( err ) return next(err);
// 		if( !user ) {
// 			res.send({success: false});
// 		}
// 		req.logIn(user, function(err){
// 			if(err) return next(err);
// 			res.send({success: true, user: user});
// 		})
// 	});
// 	auth(req, res, next);
// }

// exports.requiresApiLogin = function(req, res, next) {
// 	if(!req.isAuthenticated()) {
// 		res.status(403);
// 		res.send({error: 'Must be authenticated to access this information'});
// 		res.end();
// 	} else {
// 		next();
// 	}
// }

// exports.requiresRole = function(role) {
// 	return function( req, res, next ) {
// 		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1 ){
// 			res.status(403);
// 			res.end();
// 		} else {
// 			next();
// 		}
// 	}
// }


exports.authCheck = jwt({
	secret: new Buffer(config.auth0_secret, 'base64'),
	audience: config.auth0_client_id
});
