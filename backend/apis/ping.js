/**
 * 
 */
const TARGET_BLOCKNUMBER = 1300000;

module.exports = {
	ping: {
		path: '/v1/healthcheck',
		method: 'all',
		fn: function (req, resp, next) {
			let web3 = req.web3;
			let coinbase = web3.eth.coinbase;
			let balance = web3.eth.getBalance(coinbase);
			let targetBlockNumber = web3.eth.syncing.highestBlock;

			let currentTime = Date.now();
			let currentBlockNumber = web3.eth.blockNumber;

			setTimeout(() => {
				let anotherTime = Date.now();
				let anotherBlockNumber = web3.eth.blockNumber;
				let differenceTime = anotherTime - currentTime;
				let differenceBlockNumber = anotherBlockNumber - currentBlockNumber;

				resp.ok({
					web3: {
						eth: { coinbase, balance }
					},
					timeLeft: differenceBlockNumber
				});
			}, 60 * 1000)
		}
	}
};
