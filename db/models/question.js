var mongoose = require('mongoose');

module.exports = mongoose.model('Question', {
	groupId: String,
	question: String,
	description: String,
	user: {
		userId: String,
		firstName: String,
		lastName: String
	},
	date: Number,
	comments: [{
		comment: String,
		date: Number,
		userId: String
	}]
});