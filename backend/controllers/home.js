/*!
 * blockudocs
 * Copyright(c) 2016 Muhammad Dadu
 * MIT Licensed
 */
'use strict';
 
module.exports = {
	path: '/:pageName?',
	description: 'Example application',
	fn (req, resp, next) {
		let pageName = req.params.pageName || 'home';
		if (!req.session.user) {
			pageName = 'login';
		}

		resp.render(pageName);
	}
};
