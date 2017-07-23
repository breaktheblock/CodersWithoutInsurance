/**
 * Simple storage using blockchain
 */
const _ = require('lodash');
const request = require('request');
const deviceValues = {};

module.exports = {
	create: {
		path: '/v1/pisensor',
		method: 'put',
		params: {},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			let Contract = req.models.Contract;

			if (deviceValues[params.deviceid]) {
				let array = deviceValues[params.deviceid];
				let difference;

				array.push(params.orientation.roll);
				if (array.length > 5) { arr.shift(); }

				// compare services
				difference = array[0] - array[array.length - 1];
				if (difference > 5 || difference < 5) {
					Contract
						.getAll()
						.then((contracts) => {
							contracts.forEach((contract) => {
								let _number = contract.number.split('');
								let number;
								if (parseInt(_number[0]) === 0 && parseInt(_number[1]) === 7) {
									_number.shift();_number.shift();
									number = '+44' + _number;
								}
								request.get('http://139.59.191.247/experiments/breaktheblock/claimprocess/twilio/send_sms.php?receiver_nr=' + number);
							});
						});
				}
				
				// trigger
				return resp.ok();
			}
			resp.ok();
		}
	},
	enableDevice: {
		path: '/v1/pisensor/:deviceid/enable',
		method: 'get',
		fn: function (req, resp, next) {
			deviceValues[req.params.deviceid] = [];
			resp.ok('enabled');
		}
	},
	enableDevice: {
		path: '/v1/pisensor/:deviceid/disable',
		method: 'get',
		fn: function (req, resp, next) {
			delete deviceValues[req.params.deviceid];
			resp.ok('enabled');
		}
	}
};
