const CONTRACT_NAME = 'SimpleStorage';

const clout = require('clout-js');
const web3 = clout.module.web3;
const fs = require("fs");
const path = require('path');
const solc = require('solc');

let contractSource = fs.readFileSync(path.join(__dirname, 'solidity/SimpleStorage.sol'), 'utf8');
let contractCompiled = solc.compile(contractSource, 1);
let abi = contractCompiled.contracts[CONTRACT_NAME].interface;
let bytecode = '0x' + contractCompiled.contracts[CONTRACT_NAME].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let Contract = web3.eth.contract(JSON.parse(abi));

console.log('bytecode:', bytecode);
console.log('gasEstimate:', gasEstimate);

module.exports = class SimpleStorage {
	constructor(x) {
		this.storedData = x;
	}

	static new(data) {
		let account = clout.config.web3.etherbase;
		SimpleStorage.unlockAccount(account.address, account.password);

		return new Promise((resolve, reject) => {
			try {
			Contract.new(data, {
				   from: account.address,
				   data: bytecode,
				   gas: gasEstimate
			}, function(err, newContract) {
				if (err) {
					reject(err);
					return console.error(err);
				}

				console.log(newContract);
				resolve(newContract);
			});
		} catch(e) {console.error(e);}
		});
	}

	static unlockAccount(account, password) {
		web3.personal.unlockAccount(account, password);
	}
};
