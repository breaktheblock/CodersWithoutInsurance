/**
 * Contract Model
 */
const clout = require('clout-js');
const mongoose = clout.mongoose;

const web3 = clout.module.web3;
const fs = require('fs');
const path = require('path');
const solc = require('solc');

let contractSource = fs.readFileSync(path.join(__dirname, `solidity/Contract.sol`), 'utf8');
let contractCompiled = solc.compile({
	sources: {
		'Contract.sol': contractSource,
		'github.com/oraclize/ethereum-api/oraclizeAPI.sol': fs.readFileSync(path.join(__dirname, `solidity/oracalizeAPI.sol`), 'utf8')
	}
}, 1).contracts['Contract.sol:SunshineContract'];

const REQUIRED_PARAMS = ['organiserAddress', 'contractAddress', 'eventName', 'eventLocation', 'date']

let Contract = mongoose.model('Contract', {
	organiserAddress: String,
	contractAddress: String,
	eventName: String,
	eventLocation: String,
	date: String
});

module.exports = Contract;
Contract.contractCompiled = contractCompiled;

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
