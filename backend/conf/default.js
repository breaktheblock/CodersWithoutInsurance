/*!
 * clout-example-angluar2-ts-scss
 * Copyright(c) 2016 Muhammad Dadu
 * MIT Licensed
 */
const Web3 = require('web3');

module.exports = {
	session: {
		secret: '5476rutyfjgho78oiu'
	},
	web3: {
		provider: new Web3.providers.HttpProvider('http://breaktheblock.thisplace.tech:8545'),
		etherbase: {
			address: '25b8e885c968dba4d5d0208879d583f60a5e2ded',
			password: 'password3'
		}
	}
};
