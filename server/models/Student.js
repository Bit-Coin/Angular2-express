// src/models/Student.js
var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

module.exports = function() {
  var studentSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {type: String, required: '{PATH} is required!', unique: true},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String],
    DOB: String,
    phone: String,
    tutor_id: String,
    created_at: Date,
    updated_at: Date,
  });

  studentSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;

    next();
  });

  studentSchema.methods = {
    authenticate: function(pwdToMatch) {
      return pwdToMatch === this.hashed_pwd;
    },
    hasRole: function(role) {
      return this.roles.indexOf(role) > -1;
    }
  };

  mongoose.model('Student', studentSchema);
}