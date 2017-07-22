/**
 * 
 */
const clout = require('clout-js');
const web3 = clout.module.web3;
const _ = require('lodash');

function isLoggedIn(req, resp, next) {
	console.log(req.session.user);
	if (!req.session.user) {
		return resp.error('User is not logged in');
	}
	next();
}

module.exports = {
	create: {
		path: '/v1/shipment',
		method: 'put',
		params: {
			name: ['string'],
			company: ['string'],
			location: ['string'],
			cargo_name: ['string'],
			description: ['string'],
			quantity: ['string'],
			weight: ['string'],
			price: ['string'],
			hash: ['string'],
		},
		hooks: [ isLoggedIn ],
		fn (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let Shipment = req.models.Shipment;
			params.hash = 'blahblahblah';

			Shipment
				.create(params, req.session.user.walletId)
				.then((contact) => {
					let shipment = new Shipment({
						transactionHash: contact.transactionHash,
						address: contact.address
					});
					shipment.save(function (err, data) {
						if (err) {
							console.error(err);
						}
					});
					resp.ok({
						transactionHash: contact.transactionHash,
						address: contact.address
					});
				})
				.catch((err) => {
					resp.error(String(err));
				});
		}
	},
	read: {
		path: '/v1/shipment',
		method: 'get',
		fn (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let Shipment = req.models.Shipment;

			Shipment.find({}, (err, data) => {
				if (err) { return resp.error(err); }
				let shipments = [];

				for (let i = 0, l = data.length; i < l; ++i) {
					let row = data[i];
					let transactionReceipt = web3.eth.getTransactionReceipt(row.transactionHash);
					shipments.push(transactionReceipt);
				}
				resp.ok(shipments);
			});
		}
	},
	buy: {
		path: '/v1/shipment/:hash/buy',
		method: 'put',
		params: {
			name: ['string'],
			company: ['string'],
			location: ['string'],
		},
		hooks: [ isLoggedIn ],
		fn (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let Shipment = req.models.Shipment;
			Shipment
				.buy(req.params.hash, params, req.session.user.walletId)
				.then((contact) => {
					resp.ok({
						transactionHash: contact.transactionHash,
						address: contact.address
					});
				})
				.catch(resp.error);
		}
	},
	addTravelLeg: {
		path: '/v1/shipment/:hash/addTravelLeg',
		method: 'put',
		params: {
			origin: ['string'],
			destination: ['string'],
			active: ['string'],
			is_delivered: ['string'],
		},
		hooks: [ isLoggedIn ],
		fn (req, resp) {
			let params = _.merge({}, req.params, req.body);
			let Shipment = req.models.Shipment;
			Shipment
				.addTravelLeg(req.params.hash, params, req.session.user.walletId)
				.then((contact) => {
					resp.ok({
						transactionHash: contact.transactionHash,
						address: contact.address
					});
				})
				.catch(resp.error);
		}
	}
};

