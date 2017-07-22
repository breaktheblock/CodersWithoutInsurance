/**
 * 
 */
const clout = require('clout-js');
const web3 = clout.module.web3;
const _ = require('lodash');

let indexes = {};

module.exports = {
	trustIndex: {
		path: '/v1/user/:email/trustindex',
		mathod: 'get',
		fn (req, resp) {
			resp.ok(indexes[req.params.email] || 100);
		}
	},
	updateIndex: {
		path: '/v1/user/:email/trustindex',
		mathod: 'post',
		params: {
			index: ['string']
		},
		fn (req, resp) {
			let params = _.merge({}, req.params, req.body);
			indexes[req.params.email] = params.index;
			resp.ok();
		}
	},
	whoami: {
		path: '/v1/user/whoami',
		method: 'get',
		fn (req, resp) {
			resp.ok(req.session.user);
		}
	},
	logout: {
		path: '/v1/user/logout',
		method: 'get',
		fn (req, resp) {
			req.session.user = null;
			req.session.save();
			resp.ok();
		}
	},
	createAccount: {
		path: '/v1/user',
		method: 'put',
		params: {
			name: ['string'],
			email: ['string'],
			password: ['string']
		},
		fn: function (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let User = req.models.User;
			User.findUserByEmail(params.email)
				.then((user) => {
					if (user) {
						return resp.error('User already exists');
					}

					web3.personal.newAccount(params.password, function (error, walletId) {
						if (error) {
							console.log(err);
							return resp.error(error);
						}
						let user = new User({
							name: params.name,
							email: params.email,
							walletId,
						});
						user.save((err) => {
							if (err) {
								return resp.error(err);
							}
							return resp.ok();
						});
					});
				})
				.catch((err) => console.error(err));
		}
	},
	unlockAccount: {
		path: '/v1/user',
		method: 'post',
		params: {
			email: ['string'],
			password: ['string']
		},
		fn: function (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let User = req.models.User;
			User.findUserByEmail(params.email)
				.then((user) => {
					console.log(req.session);
					if (!user) {
						return resp.error('User does not exists');
					}
					web3.personal.unlockAccount(user.walletId, params.password, function (err, data) {
						if (err) {
							return resp.error(err);
						}

						if (data) {
							req.session.user = user;
							req.session.save();
							return resp.ok(user);
						} else  {
							return resp.error('something went wrong');
						}
					});
				});

		}
	}
};
