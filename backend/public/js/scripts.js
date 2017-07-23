(function (global) {
	var app = angular.module('application', []);

	// Models
	app.factory('ContractModel', function ($http) {
		return {
			list: function list(address) {
	            return $http({
	                method: 'GET',
	                url: '/api/v1/user/' + address + '/contracts'
	            });
			},
			create: function create(data) {
	            return $http({
	                method: 'PUT',
	                url: '/api/v1/contract',
	                data: data
	            });
			}
		}
	});

	app.factory('InsuranceModel', function ($http) {
		return {
			list: function list(address) {
	            return $http({
	                method: 'GET',
	                url: '/api/v1/user/' + address + '/insurance'
	            });
			},
			create: function create(data) {
	            return $http({
	                method: 'PUT',
	                url: '/api/v1/insurance',
	                data: data
	            });
			}
		}
	});

	app.factory('UserModel', function ($http) {
		return {
			isUserRegistered: function list(address) {
	            return $http({
	                method: 'GET',
	                url: '/api/v1/user/' + address
	            });
			},
			create: function create(data) {
	            return $http({
	                method: 'PUT',
	                url: '/api/v1/user/' + address,
	                data: data
	            });
			}
		}
	});

	// Controller
	app.controller('createEvent', function ($scope, ContractModel) {
		$scope.event = {
			name: 'Outdoor Concert',
			location: 'London',
			number: 0756565432,
			date: new Date()
		};

		$scope.isLoading = false;

		$scope.submitForm = function () {
			let eventData = $scope.event;
			let date = String(parseInt(new Date(eventData.date).getTime() / 1000), 10);
			let currentAccount = web3.eth.accounts[0];

			$scope.isLoading = true;

			console.log('estimating gas');
			web3.eth.estimateGas({data: bytecode}, function (err, gasEstimate) {
				if (err) { $scope.isLoading = false; $scope.$apply(); return console.error(err); }
				var newContractMetadata = {
					from: currentAccount,
					data: bytecode,
					gas: gasEstimate * 2,
					gasPrice: 30
				};

				console.log('create contract', eventData.name, eventData.number, eventData.location, date);
				console.log(newContractMetadata);

				Contract.new(eventData.name, eventData.number, eventData.location, date, newContractMetadata, function (err, contractInfo) {
					if (err) { $scope.isLoading = false; $scope.$apply(); return console.error(err); }

					if (contractInfo.address) {
						ContractModel
							.create({
								organiserAddress: currentAccount,
								contractAddress: contractInfo.address,
								eventName: eventData.name,
								eventLocation: eventData.location,
								date: date
							})
							.then(function () {
								window.location.href = '/EventConfirmationPage?contract=' + contractInfo.address;
							})
							.catch(function (err) {
								$scope.isLoading = false;
								$scope.$apply();
								console.error(err);
							});
					}
				});
			});
		}
	});

	function buyInsuranceUser() {
		return true;
	}

	function getRainProbability() {
		var rainProbability = 0.2;
		// connect to weather api
		return rainProbability;
	}

	function updateConvertedValue(ether) {
		var priceEther = parseFloat(ether) + parseFloat(ether) * getRainProbability();

		$('.js-input-number-user-inflated').val(priceEther);
	}
	
	function populateShareLink() {
		if ($('.js-share-link').length) {
			var path = window.location.href;
			var realPath;
			var pathParts = path.split('/');

			if (pathParts.length > 1) {
				realPath = '';

				for(var i = 0 ; i < pathParts.length - 1 ; i++) {
					realPath += pathParts[i] + '/';
				}

				realPath += 'UserContractPage';
			} else {
				realPath = path + 'UserContractPage';
			}

			$('.js-share-link')
				.attr('href', realPath)
				.text(realPath);
		}
	}

	$('.js-input-number-user').bind('keyup', function () {
		updateConvertedValue($(this).val());
	});

	$('.js-submit-button-buy-insurance').click(function () {
		var nextStep = buyInsuranceUser();

		if (nextStep) {
			var path = window.location.href;
			var realPath;
			var pathParts = path.split('/');

			if (pathParts.length > 1) {
				realPath = '';

				for(var i = 0 ; i < pathParts.length - 1 ; i++) {
					realPath += pathParts[i] + '/';
				}

				realPath += 'UserConfirmationPage';
			} else {
				realPath = path + 'UserConfirmationPage';
			}

			window.location.href = realPath;
		}
	});

	populateShareLink();
	if ($('.js-input-number-user').length) {
		updateConvertedValue($('.js-input-number-user').val());
	}

	setTimeout(function () {
		console.log('initialized contracts');
		// contract stuff
		if (typeof web3 === 'undefined') {
		  global.web3 = new Web3(new Web3.providers.HttpProvider("http://breaktheblock.thisplace.tech:8545"));
		}
		
		global.abi = global.compiledContract.interface;
		global.bytecode = '0x' + global.compiledContract.bytecode;
		if (web3) {
			global.Contract = web3.eth.contract(JSON.parse(global.abi));
		}

	}, 1000);
}(window));
