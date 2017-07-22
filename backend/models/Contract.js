/**
 * Contract Model
 */
const clout = require('clout-js');
const mongoose = clout.mongoose;

const REQUIRED_PARAMS = ['organiserAddress', 'contractAddress', 'eventName', 'eventLocation', 'date']

let Contract = mongoose.model('Contract', {
	organiserAddress: String,
	contractAddress: String,
	eventName: String,
	eventLocation: String,
	date: String
});

module.exports = Contract;

Contract.getForOrganiserAddress = function (address) {
	return Contract.find({ organiserAddress: address }).exec();
};

Contract.getForAddress = function (address) {
	return Contract.find({ contractAddress: address }).exec();
};

Contract.create = function (params) {
	let missingParams;

	REQUIRED_PARAMS.forEach((key) => {
		if (typeof params[key] === 'undefined') {
			missingParams = true;
		}
	});

	if (missingParams) {
		return Promise.reject('Parameters are missing');
	}

	let contract = new Contract(params);
	return contract.save();
};
