const clout = require('clout-js');
const mongoose = clout.mongoose;

let User = mongoose.model('User', {
	name: String,
	email: String,
	walletId: String
});

module.exports = User;

module.exports.findUserByEmail = function (email) {
	return new Promise((resolve, reject) => {
		User.find({ email: email }, (err, user) => {
			if (err) {
				return reject(err);
			}
			return resolve(user && user[0]);
		});
	});
}