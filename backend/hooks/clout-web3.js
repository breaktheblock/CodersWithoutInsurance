/*!
 * clout-web3
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const
	debug = require('debug')('clout-web3:hooks/clout-web3'),
	path = require('path');

const Web3 = require('web3');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = {
	parse: {
		event: 'start',
		priority: 'MIDDLEWARE',
		fn (next) {
			if (!this.config.web3) {
				debug('configuration for web3 not found');
				console.error('configuration for web3 not found');
				return next();
			}

			!this.module && (this.module = {});
			this.module.web3 = new Web3();
			this.module.web3.setProvider(this.config.web3.provider);
			this.app.request.web3 = this.module.web3;

			debug('web3 has been initialized');

			// quick fix
			this.app.use(session({
			  store: new MongoStore({
			  	url: this.config.mongoose.uri
			  }),
			  resave: true,
			  secret: 'MySecret'
			}));
			next();
		}
	}
};
