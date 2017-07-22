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
			address: '9b2021b14b8678b04886d26589d6d9378735a20d',
			password: 'password2'
		}
	},
	sendsmsapi: {
		// http://139.59.191.247/experiments/breaktheblock/claimprocess/twilio/send_sms.php?receiver_nr=+447515396849
		// replace the number at the end with recipient number
	}
};
