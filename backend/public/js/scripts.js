(function (global) {
	var timeoutForWeb3 = 1000;
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

	app.factory('WeatherAPI', function ($http) {
		return {
			get: function (location, date) {
				return $http.get('/api/v1/weather?location=' + location + '&date=' + date);
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
			var eventData = $scope.event;
			var date = String(parseInt(new Date(eventData.date).getTime() / 1000), 10);
			var currentAccount = web3.eth.accounts[0];

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

	app.controller('viewEventsController', function ($scope, ContractModel) {
		$scope.events = [];
		$scope.isLoading = true;

		setTimeout(function () {
			var currentAccount = web3.eth.accounts[0];

			ContractModel
				.list(currentAccount)
				.then(function (_data) {
					var events = _data.data.data;
					$scope.events = events;
					for (var i = 0, l = events.length; i < l; ++i) {
						$scope.events[i].date = new Date($scope.events[i].date * 1000);
					}
 				})
 				.finally(function () {
					$scope.isLoading = false;
 				});
		}, timeoutForWeb3);
	});

	app.controller('shareController', function ($scope) {
		var parts = window.location.href.split('/');
		var contractHash = window.location.href.split('?contract=')[1].replace('#', '');
		$scope.shareLink =  'http://' + parts[2] + '/UserContractPage?contract=' + contractHash;
	});

	app.controller('createInsuranceController', function ($scope, WeatherAPI) {
		var contractHash = window.location.href.split('?contract=')[1].replace('#', '');
		var rainProbability = 0.2;
		var locationAux = '';
		var dateAux = 0;
		var etherProbToken = 1;

		$scope.event = {};
		$scope.etherPrice = 1;

		setTimeout(function () {
			Contract.at(contractHash).organizer(function (err, organizerHash) {
				if (err) { return console.log(err); }
				$scope.event.organizerHash = organizerHash;
				$scope.$apply();
			});
			Contract.at(contractHash).eventName(function (err, name) {
				if (err) { return console.log(err); }
				$scope.event.name = name;
				$scope.$apply();
			});
			Contract.at(contractHash).phoneNumber(function (err, number) {
				if (err) { return console.log(err); }
				$scope.event.number = number;
				$scope.$apply();
			});
			Contract.at(contractHash).location(function (err, location) {
				if (err) { return console.log(err); }
				$scope.event.location = location;
				locationAux = location;
				$scope.$apply();

				$scope.updateRainProbability();
			});
			Contract.at(contractHash).date(function (err, date) {
				if (err) { return console.log(err); }
				$scope.event.date = new Date(date * 1000);
				dateAux = date * 1000;
				$scope.$apply();

				$scope.updateRainProbability();
			});
		}, timeoutForWeb3);
		

		$scope.updateConvertedValue = function () {
			
			if (etherProbToken > 0) {
				var prizeEther = parseFloat($scope.etherPrice) + etherProbToken * rainProbability;
				$scope.etherPrize = prizeEther;
			} else {
				$scope.etherPrize = 0;
			}
		};

		$scope.updateRainProbability = function () {
			if (locationAux !== '' && dateAux !== 0) {
				WeatherAPI
					.get(locationAux, dateAux)
					.then(function (_data) {
						var data = _data.data.data;
						var strData = JSON.stringify(data).split('rain:');
						var probability = strData[1]
											.trim()
											.split(' ')[0]
											.slice(0, -1);
						probability = 1 - (probability / 100);

						etherProbToken = Math.ceil(((dateAux - Date.now()) / 1000) / 60 / 60 / 24);

						if (data.success) {
							$scope.updateConvertedValue();
						}
					});
			}
		}
	});

	function buyInsuranceUser() {
		return true;
	}

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
		timeoutForWeb3 = 0;
	}, timeoutForWeb3);
}(window));
