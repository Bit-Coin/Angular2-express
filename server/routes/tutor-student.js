var tutorstudent = require('../controllers/tutorstudent');


module.exports = function(app) {
	app.post('/api/tutor/students', function(req, res) {
		tutorstudent.getAllStudents(req, res);
	});

	app.post('/api/tutor/courses', function(req, res) {
		tutorstudent.getAllCourses(req, res);
	});

	app.post('/api/tutor/student', function(req, res) {
		tutorstudent.addStudent(req, res);
	});

	app.post('/api/tutor/studentcsv', function(req, res) {
		tutorstudent.addStudentCSV(req, res);
	});	

	app.put('/api/tutor/student', function(req, res) {
		tutorstudent.editStudent(req, res);
	});

	app.post('/api/tutor/setstudentbycourse', function(req, res) {
		console.log(req.body);
		tutorstudent.setStudentByCourse(req, res);
	});

	app.post('/api/tutor/getCoursesByStudentId', function(req, res) {
		tutorstudent.getCoursesByStudentId(req, res);
	});	

	app.post('/api/tutor/getStudentsByCourseId', function(req, res) {
		tutorstudent.getStudentsByCourseId(req, res);
	});	
}