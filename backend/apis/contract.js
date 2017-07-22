/**
 * Simple storage using blockchain
 */
const _ = require('lodash');

module.exports = {
	create: {
		path: '/v1/contract',
		method: 'put',
		params: {
			organiserAddress: 'string',
			contractAddress: 'string',
			eventName: 'string',
			eventLocation: 'string',
			date: 'string'
		},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			let Contract = req.models.Contract;
			
			Contract
				.create(params)
				.then((contract) => resp.ok(contract))
				.catch((error) => {
					console.error('error', error);
					resp.error(error);
				});
		}
	},
	listForOrganiser: {
		path: '/v1/user/:organiserAddress/contracts',
		method: 'get',
		fn: function (req, resp, next) {
			let organiserAddress = req.params.organiserAddress;
			let Contract = req.models.Contract;

			Contract
				.getForOrganiserAddress(organiserAddress)
				.then((results) => resp.ok(results))
				.catch((error) => resp.error(error));
		}
	}
};
