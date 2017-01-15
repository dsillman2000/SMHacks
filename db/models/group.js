var mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
	name: String,
	desc: String,
	members: [{
		id: mongoose.Schema.Types.ObjectId,
		email: String,
		firstname: String,
		lastname: String
	}],
	admins: [mongoose.Schema.Types.ObjectId],
	questions: [{
		id: mongoose.Schema.Types.ObjectId,
		question: String
	}]
});