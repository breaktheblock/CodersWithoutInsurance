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
		provider: new Web3.providers.HttpProvider('http://blockchain-rpc.clout.tech'),
		etherbase: {
			address: '0xa964e9cb54a844f451c23a6eab20d6d96b7eab0a',
			password: 'T3st@2017'
		}
	}
};
