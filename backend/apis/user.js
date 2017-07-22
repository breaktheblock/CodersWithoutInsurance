/**
 * Simple storage using blockchain
 */
const _ = require('lodash');

module.exports = {
	registerUser: {
		path: '/v1/user/:address',
		method: 'put',
		params: {
			firstName: 'string',
			lastName: 'string',
		},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			let User = req.models.User;

			User
				.create(params)
				.then((contract) => resp.ok(contract))
				.catch((error) => {
					console.error('error', error);
					resp.error(error);
				});
		}
	},
	isUserRegistered: {
		path: '/v1/user/:address',
		method: 'get',
		fn: function (req, resp, next) {
			let address = req.params.address;
			let User = req.models.User;

			User
				.getForAddress(address)
				.then((results) => resp.ok(results))
				.catch((error) => resp.error(error));
		}
	}
};
