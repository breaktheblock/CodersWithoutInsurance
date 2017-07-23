/**
 * Simple storage using blockchain
 */
const _ = require('lodash');

module.exports = {
	create: {
		path: '/v1/pisensor',
		method: 'put',
		params: {},
		fn: function (req, resp, next) {
			let params = _.merge({}, req.params, req.body);
			
			console.log('pisensor', params);
		}
	}
};
