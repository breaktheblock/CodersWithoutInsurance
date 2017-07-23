/**
 * 
 */
module.exports = {
	path: '/compiledcontract.js',
	method: 'get',
	fn: function (req, resp, next) {
		let ContractModel = req.models.Contract;
		console.log(ContractModel.contractCompiled);
		let contractCompiled = JSON.stringify(ContractModel.contractCompiled);

		resp.set('Content-Type', 'text/javascript');
		resp.send(`window.compiledContract = ${contractCompiled};`);
	}
};