// src/models/Take.js
var mongoose = require('mongoose');

module.exports = function() {
	var takeSchema = mongoose.Schema({
		student_id: String,
		course_id: String,
		score: Number,
		isCompleted: Boolean,
		completedAt: Date,
		certificate: String,
		created_at: Date,
    	updated_at: Date,
	});

	takeSchema.pre('save', function(next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;

		// if created_at doesn't exist, add to that field
		if (!this.created_at)
			this.created_at = currentDate;

		next();
	});

	mongoose.model('Take', takeSchema);
}