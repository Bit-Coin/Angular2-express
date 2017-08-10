// src/models/Course.js
var mongoose = require('mongoose');

module.exports = function() {
	var courseSchema = mongoose.Schema({
		name: {type: String,required: true},
		description: String,	
		created_at: Date,
    	updated_at: Date,
	});

	
	 courseSchema.pre('save', function(next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;

		// if created_at doesn't exist, add to that field
		if (!this.created_at)
			this.created_at = currentDate;

		next();
	});

	mongoose.model('Course', courseSchema);
}