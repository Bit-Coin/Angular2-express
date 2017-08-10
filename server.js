var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	cors = require('cors');

var app = express();


var port = process.env.PORT || 5000;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

require('./server/config/mongoose')(config);

app.use(express.static(__dirname + '/server/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/app'));
app.set('views', './server/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

require('./server/models/User')();

require('./server/models/Admin')();

require('./server/models/Content')();

require('./server/models/Course')();

require('./server/models/Lesson')();

require('./server/models/Score')();

require('./server/models/Student')();

require('./server/models/Take')();

require('./server/models/Tutor')();



require('./server/routes/routes')(app);

app.listen(port, function(err) {
	console.log('running server on port: ' + port);
});