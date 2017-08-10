// src/models/Score.js
var mongoose = require('mongoose');

module.exports = function() {
	var scoreSchema = mongoose.Schema({
		student_id: String,
		lesson_id: String,
		score: Number,
		isCompleted: Boolean,
		completedAt: Date,
		certificate: String,
		created_at: Date,
    	updated_at: Date,
	});

	 scoreSchema.pre('save', function(next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;

		// if created_at doesn't exist, add to that field
		if (!this.created_at)
			this.created_at = currentDate;

		next();
	});

	mongoose.model('Score', scoreSchema);
}