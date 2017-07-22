/**
 * User Model
 */
const clout = require('clout-js');
const mongoose = clout.mongoose;

const REQUIRED_PARAMS = ['address', 'firstName', 'lastName'];

let User = mongoose.model('User', {
	address: String,
	firstName: String,
	lastName: String
});

module.exports = User;

User.getForAddress = function (address) {
	return User.findOne({ address: address }).exec();
};

User.create = function (params) {
	let missingParams;

	REQUIRED_PARAMS.forEach((key) => {
		if (typeof params[key] === 'undefined') {
			missingParams = true;
		}
	});

	if (missingParams) {
		return Promise.reject('Parameters are missing');
	}

	let user = new User(params);
	return user.save();
};
