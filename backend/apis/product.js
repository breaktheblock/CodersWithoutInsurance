/**
 * 
 */

module.exports = {
	getProductById: {
		path: '/v1/product/barcode/:id',
		method: 'get',
		fn (req, resp) {
			resp.ok('mo@this.ru');
		}
	}
};
