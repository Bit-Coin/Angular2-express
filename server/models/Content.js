// src/models/Content.js
var mongoose = require('mongoose');
// Create a schema for the Content object
module.exports = function() {
  var contentSchema = mongoose.Schema({
    videoOrQuestion: Boolean,
    videoLabel: String,
    videoEmbedCode: String,
    singleOrMulti: Boolean,
    question: String,
    answerA: String,
    answerB: String,
    answerC: String,
    trueNumber: Number,
    answer_text: String,
    lesson_id: String, 
    created_at: Date,
    updated_at: Date,
  });

  contentSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;

    next();
  });

  mongoose.model('Content', contentSchema);
}