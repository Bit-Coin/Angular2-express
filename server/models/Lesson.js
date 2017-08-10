// src/models/Lesson.js
var mongoose = require('mongoose');

module.exports = function() {
	var lessonSchema = mongoose.Schema({
		name: String,
		description: String,
		course_id: String,
		contentIds: String,	
		created_at: Date,
    	updated_at: Date,
	});

	 lessonSchema.pre('save', function(next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;

		// if created_at doesn't exist, add to that field
		if (!this.created_at)
			this.created_at = currentDate;

		next();
	});


	mongoose.model('Lesson', lessonSchema);
}