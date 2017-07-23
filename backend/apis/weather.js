/**
 * Simple storage using blockchain
 */
const clout = require('clout-js');
const _ = require('lodash');
const request = require('request');

module.exports = {
	get: {
		path: '/v1/weather',
		method: 'get',
		params: {
			location: 'string',
			date: 'string'
		},
		fn: function (req, resp, next) {
			let location = req.query.location;
			let time = req.query.date;
			let uri = 'http://api.wolframalpha.com/v2/query?output=JSON&appid=' + clout.config.wolframAlpha.appId + '&input=' + encodeURIComponent(`will it rain in ${location} on timestamp ${time}`);
			console.log(uri);
			request({
				uri,
				json: true
			}, function (err, response) {
				if (err) { return resp.error(err); }
				resp.ok(response.body.queryresult);
			});
		}
	},
};
