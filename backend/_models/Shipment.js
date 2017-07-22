const CONTRACT_NAME = 'Shipment';

const clout = require('clout-js');
const mongoose = clout.mongoose;
const web3 = clout.module.web3;
const fs = require("fs");
const path = require('path');
const solc = require('solc');

let contractSource = fs.readFileSync(path.join(__dirname, `solidity/${CONTRACT_NAME}.sol`), 'utf8');
let contractCompiled = solc.compile(contractSource, 1);
let abi = contractCompiled.contracts[CONTRACT_NAME].interface;
let bytecode = '0x' + contractCompiled.contracts[CONTRACT_NAME].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let Contract = web3.eth.contract(JSON.parse(abi));

console.log('abi:', abi);
console.log('bytecode:', bytecode);
console.log('gasEstimate:', gasEstimate);

let ShipmentModel = mongoose.model('Shipment', {
	transactionHash: String,
	address: String
});

console.log('gasLimit:', web3.eth.getBlock("pending").gasLimit);

module.exports = ShipmentModel;

ShipmentModel.Contract = Contract;

ShipmentModel.create = function (params, walletId) {
	let name = params.name;
	let company = params.company;
	let location = params.location;
	let cargo_name = params.cargo_name;
	let description = params.description;
	let quantity = parseInt(params.quantity, 10);
	let weight = parseInt(params.weight, 10);
	let price = parseInt(params.price, 10);
	let hash = params.hash;
	let gasPrice = params.gasPrice || 0;

	return new Promise((resolve, reject) => {
		Contract.new(name, company, location, cargo_name, description, quantity, weight, price, hash, {
			   from: walletId,
			   data: bytecode,
			   gas: gasEstimate,
			   gasPrice: 0
		}, function (err, newContract) {
			if (err) {
				reject(err);
				return console.error(err);
			}

			console.log(newContract);
			resolve(newContract);
		});
	});
};

ShipmentModel.buy = function (hash, params, walletId) {
	return new Promise((resolve, reject) => {
		Contract.at(hash).buy(params.name, params.company, params.location, {
		   from: walletId,
		   data: bytecode,
		   gas: gasEstimate,
		   gasPrice: 0
		}, function(err, newContract) {
			if (err) {
				reject(err);
				return console.error(err);
			}

			console.log(newContract);
			resolve(newContract);
		});
	});
}

ShipmentModel.addTravelLeg = function (hash, params, walletId) {
	return new Promise((resolve, reject) => {
		Contact.at(hash).buy(params.origin, params.destination, params.active, params.is_delivered, {
		   from: walletId,
		   data: bytecode,
		   gas: gasEstimate,
		   gasPrice: 0
		}, function(err, newContract) {
			if (err) {
				reject(err);
				return console.error(err);
			}

			console.log(newContract);
			resolve(newContract);
		});
	});
};
