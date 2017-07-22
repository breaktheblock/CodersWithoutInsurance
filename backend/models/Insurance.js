/**
 * Insurance Model
 */
const clout = require('clout-js');
const mongoose = clout.mongoose;

const REQUIRED_PARAMS = ['attendieAddress', 'contractAddress', 'pricePaid', 'pricePayout'];

let Insurance = mongoose.model('Insurance', {
	attendieAddress: String,
	contractAddress: String,
	pricePaid: String,
	pricePayout: String
});

module.exports = Insurance;

Insurance.getForAttendieAddress = function (address) {
	return Insurance.find({ attendieAddress: address });
};

Insurance.getForAddress = function (address) {
	return Insurance.find({ contractAddress: address });
};

Insurance.create = function (params) {
	let missingParams;

	REQUIRED_PARAMS.forEach((key) => {
		if (typeof params[key] === 'undefined') {
			missingParams = true;
		}
	});

	if (missingParams) {
		return Promise.reject('Parameters are missing');
	}

	let insurance = new Insurance(params);
	return insurance.save();
};
