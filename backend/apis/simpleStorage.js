/**
 * Simple storage using blockchain
 */
const _ = require('lodash');

module.exports = {
	create: {
		path: '/v1/simpleStorage',
		method: 'put',
		params: {
			data: ['string']
		},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			let SimpleStorageModel = req.models.SimpleStorage;

			SimpleStorageModel
				.new(params.data)
				.then((newContract) => resp.ok({
					transactionHash: newContract.transactionHash,
					address: newContract.address
				}))
				.catch(resp.error);
		}
	}
};
