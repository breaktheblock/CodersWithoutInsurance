/**
 * Simple storage using blockchain
 */
const _ = require('lodash');

module.exports = {
	create: {
		path: '/v1/insurance',
		method: 'put',
		params: {
			attendieAddress: 'string',
			contractAddress: 'string',
			pricePaid: 'string',
			pricePayout: 'string'
		},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			let Insurance = req.models.Insurance;

			// should check if contract exist
			// should check if contract has insurance
			
			Insurance
				.create(params)
				.then((insurance) => resp.ok(insurance))
				.catch((error) => {
					console.error('error', error);
					resp.error(error);
				});
		}
	},
	listForOrganiser: {
		path: '/v1/user/:organiserAddress/insurance',
		method: 'get',
		fn: function (req, resp, next) {
			let organiserAddress = req.params.organiserAddress;
			let Insurance = req.models.Insurance;

			Insurance
				.getForOrganiserAddress(organiserAddress)
				.then((results) => resp.ok(results))
				.catch((error) => resp.error(error));
		}
	}
};
